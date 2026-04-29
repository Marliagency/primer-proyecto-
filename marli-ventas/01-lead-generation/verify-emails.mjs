#!/usr/bin/env node
/**
 * Verificador de emails GRATIS — sin ZeroBounce/NeverBounce.
 *
 * Estrategia (en orden de coste):
 *  1. Sintaxis (regex) — descartar emails con typos obvios
 *  2. MX records (DNS lookup) — descartar dominios sin servidor de email
 *  3. SMTP probe (RCPT TO sin envío real) — verificar que el buzón existe
 *
 * **IMPORTANTE**:
 *  - SMTP probe puede ser bloqueado por servidores estrictos (Gmail, Outlook)
 *  - Si tu IP de salida está en blacklists, fallará. Considera usar VPS limpio.
 *  - Microsoft 365 usa "catch-all" (responde 250 a todo). El probe solo dice si
 *    el dominio acepta correo, no si el buzón existe → bajar confidence.
 *
 * Uso:
 *   node verify-emails.mjs --input enriched.csv --output verified.csv
 *   node verify-emails.mjs --input enriched.csv --output verified.csv --skip-smtp
 *
 * Output añade columnas: mx_valid, smtp_valid, verify_score (0-100)
 *
 * Score:
 *   100 = sintaxis OK + MX OK + SMTP 250 OK + dominio limpio
 *   80  = sintaxis OK + MX OK + SMTP catch-all (Microsoft)
 *   60  = sintaxis OK + MX OK + SMTP no probado
 *   30  = sintaxis OK pero MX falla
 *   0   = sintaxis falla
 *
 * Recomendado enviar solo a emails con score >= 60.
 */

import fs from 'fs';
import dns from 'dns/promises';
import net from 'net';

const args = parseArgs(process.argv.slice(2));
const INPUT = args.input || 'enriched.csv';
const OUTPUT = args.output || 'verified.csv';
const SKIP_SMTP = !!args['skip-smtp'];
const CONCURRENCY = parseInt(args.concurrency || '5', 10);

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`✗ ${INPUT} no existe`);
    process.exit(1);
  }

  const rows = readCsv(INPUT);
  console.error(`→ Verificando ${rows.length} emails (concurrency=${CONCURRENCY})`);

  const result = [];
  let i = 0;
  for (let chunkStart = 0; chunkStart < rows.length; chunkStart += CONCURRENCY) {
    const chunk = rows.slice(chunkStart, chunkStart + CONCURRENCY);
    const verified = await Promise.all(chunk.map(verifyOne));
    result.push(...verified);
    i += chunk.length;
    if (i % 50 === 0 || i === rows.length) {
      const validos = result.filter((r) => r.verify_score >= 60).length;
      console.error(`  ${i}/${rows.length} (${validos} válidos score ≥ 60)`);
    }
  }

  writeCsv(result, OUTPUT);
  const stats = summarize(result);
  console.error(`\n✓ Verificación completa → ${OUTPUT}`);
  console.error(`  Válidos (≥ 60): ${stats.valid}`);
  console.error(`  Inválidos (< 60): ${stats.invalid}`);
  console.error(`  Sin email: ${stats.noEmail}`);
}

const mxCache = new Map();

async function verifyOne(row) {
  const out = { ...row, mx_valid: '', smtp_valid: '', verify_score: 0 };
  const email = (row.email || '').toLowerCase().trim();

  if (!email) {
    return out;
  }

  // 1. Sintaxis
  if (!EMAIL_REGEX.test(email)) {
    out.verify_score = 0;
    return out;
  }

  // 2. MX records
  const domain = email.split('@')[1];
  let mxs;
  try {
    if (mxCache.has(domain)) {
      mxs = mxCache.get(domain);
    } else {
      mxs = await dns.resolveMx(domain);
      mxCache.set(domain, mxs);
    }
  } catch {
    out.mx_valid = 'no';
    out.verify_score = 30;
    return out;
  }

  if (!mxs || mxs.length === 0) {
    out.mx_valid = 'no';
    out.verify_score = 30;
    return out;
  }
  out.mx_valid = 'yes';

  if (SKIP_SMTP) {
    out.verify_score = 60;
    return out;
  }

  // 3. SMTP probe
  const mx = mxs.sort((a, b) => a.priority - b.priority)[0].exchange;
  const smtp = await smtpProbe(mx, email);
  out.smtp_valid = smtp.code;
  if (smtp.accepted) {
    // Detectar catch-all (Microsoft 365 / Google Workspace que acepta todo)
    out.verify_score = smtp.likelyCatchAll ? 80 : 100;
  } else {
    out.verify_score = 30;
  }

  return out;
}

function smtpProbe(mxHost, email, timeoutMs = 8000) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let buf = '';
    let stage = 0;
    let result = { accepted: false, code: '', likelyCatchAll: false };

    const fail = (reason) => {
      try { socket.destroy(); } catch {}
      resolve({ ...result, code: result.code || `error:${reason}` });
    };

    const t = setTimeout(() => fail('timeout'), timeoutMs);

    socket.connect(25, mxHost, () => {});
    socket.setEncoding('utf8');
    socket.on('data', (chunk) => {
      buf += chunk;
      const lines = buf.split('\r\n');
      buf = lines.pop() || '';

      for (const line of lines) {
        const code = line.slice(0, 3);
        if (stage === 0 && code === '220') {
          socket.write(`EHLO marli.agency\r\n`);
          stage = 1;
        } else if (stage === 1 && code.startsWith('2')) {
          socket.write(`MAIL FROM:<verify@marli.agency>\r\n`);
          stage = 2;
        } else if (stage === 2 && code === '250') {
          socket.write(`RCPT TO:<${email}>\r\n`);
          stage = 3;
        } else if (stage === 3) {
          result.code = code;
          result.accepted = code === '250';
          // Heurística catch-all: si acepta, mandar también RCPT a fake@ y ver
          if (result.accepted) {
            socket.write(`RCPT TO:<__catchall_probe_${Date.now()}@${email.split('@')[1]}>\r\n`);
            stage = 4;
          } else {
            socket.write(`QUIT\r\n`);
            socket.end();
            clearTimeout(t);
            resolve(result);
          }
        } else if (stage === 4) {
          if (code === '250') result.likelyCatchAll = true;
          socket.write(`QUIT\r\n`);
          socket.end();
          clearTimeout(t);
          resolve(result);
        }
      }
    });

    socket.on('error', () => fail('socket-error'));
    socket.on('end', () => {
      clearTimeout(t);
      resolve(result);
    });
  });
}

function summarize(rows) {
  let valid = 0, invalid = 0, noEmail = 0;
  for (const r of rows) {
    if (!r.email) noEmail++;
    else if (r.verify_score >= 60) valid++;
    else invalid++;
  }
  return { valid, invalid, noEmail };
}

function readCsv(path) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/).filter(Boolean);
  const cols = parseLine(lines[0]);
  return lines.slice(1).map((l) => {
    const vals = parseLine(l);
    const o = {};
    cols.forEach((c, i) => (o[c] = vals[i] || ''));
    return o;
  });
}
function parseLine(l) {
  const out = []; let cur = ''; let q = false;
  for (let i = 0; i < l.length; i++) {
    const c = l[i];
    if (q) {
      if (c === '"' && l[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}
function writeCsv(rows, path) {
  if (!rows.length) return;
  const cols = Object.keys(rows[0]);
  const lines = [cols.join(',')];
  for (const r of rows) lines.push(cols.map((c) => csvEsc(r[c])).join(','));
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
}
function csvEsc(v) {
  if (v == null) return '';
  const s = String(v);
  return /[,"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) args[key] = true;
      else { args[key] = next; i++; }
    }
  }
  return args;
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
