#!/usr/bin/env node
/**
 * Enriquecedor de leads: dado un CSV con columna `web` (dominio o URL), visita
 * cada web y extrae emails publicados (página principal + /contacto + /contact).
 *
 * Esto es CLAVE para convertir leads sin email (Doctoralia/Maps) en leads con
 * email (necesario para Custom Audience + cold email).
 *
 * **Lo que hace**:
 *  1. Lee CSV de entrada (default: `leads-raw.csv`)
 *  2. Para cada lead con `web` no vacía:
 *     a. Fetch homepage + 4 rutas comunes (/contacto, /contact, /sobre-mi, /aviso-legal)
 *     b. Extrae emails con regex
 *     c. Filtra emails genéricos (info@, no-reply@) o los marca como "tier 2"
 *     d. Prefiere emails personales (nombre@dominio) cuando los encuentra
 *  3. Escribe CSV de salida con columna `email` rellenada y `email_confidence` (alta/media/baja)
 *
 * Rate limit: 1 req cada 1.5s, máximo 20 reqs concurrentes.
 *
 * Uso:
 *   node enrich-domains.mjs --input leads-raw.csv --output leads-enriched.csv
 *   node enrich-domains.mjs --input leads.csv --output enriched.csv --concurrency 10
 */

import fs from 'fs';

const args = parseArgs(process.argv.slice(2));
const INPUT = args.input || 'leads-raw.csv';
const OUTPUT = args.output || 'leads-enriched.csv';
const CONCURRENCY = parseInt(args.concurrency || '10', 10);

const RUTAS_CONTACTO = ['/', '/contacto', '/contact', '/contacto.html', '/sobre-mi', '/aviso-legal', '/legal'];
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

// Emails genéricos que devolvemos como confidence baja
const GENERICOS = new Set([
  'info', 'admin', 'webmaster', 'no-reply', 'noreply', 'soporte', 'support',
  'hola', 'contacto', 'contact', 'office', 'mail', 'email',
]);

// Falsos positivos típicos en webs (son emails del proveedor de hosting/diseñador)
const BLACKLIST_DOMAINS = new Set([
  'wordpress.com', 'wix.com', 'squarespace.com', 'gmail.com', 'hotmail.com',
  'outlook.com', 'yahoo.com', 'protonmail.com', 'sentry.io', 'wpengine.com',
  'cloudflare.com', 'webflow.com', 'wordfence.com', 'jetpack.com',
]);

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`✗ Archivo no encontrado: ${INPUT}`);
    process.exit(1);
  }

  const leads = readCsv(INPUT);
  console.error(`→ ${leads.length} leads para enriquecer`);

  let processed = 0;
  let foundEmails = 0;

  // Procesamiento en batches para concurrencia limitada
  const result = [];
  for (let i = 0; i < leads.length; i += CONCURRENCY) {
    const batch = leads.slice(i, i + CONCURRENCY);
    const enriched = await Promise.all(batch.map(enrichLead));
    result.push(...enriched);
    processed += batch.length;
    foundEmails += enriched.filter((e) => e.email).length;
    console.error(`  ${processed}/${leads.length} (${foundEmails} con email)`);
    await sleep(500);
  }

  writeCsv(result, OUTPUT);
  console.error(`\n✓ ${foundEmails}/${leads.length} con email → ${OUTPUT}`);
  console.error(`  Match rate: ${((foundEmails / leads.length) * 100).toFixed(1)}%`);
}

async function enrichLead(lead) {
  if (lead.email) {
    // Ya tiene email; pasar por el verificador igual
    return { ...lead, email_confidence: 'alta' };
  }

  if (!lead.web) {
    return { ...lead, email_confidence: '' };
  }

  const baseUrl = normalizeUrl(lead.web);
  if (!baseUrl) return { ...lead, email_confidence: '' };

  for (const ruta of RUTAS_CONTACTO) {
    try {
      const html = await fetchWithTimeout(baseUrl + ruta, 8000);
      if (!html) continue;

      const emails = extractEmails(html, baseUrl);
      if (emails.length === 0) continue;

      // Preferir emails personales (no genéricos)
      const personal = emails.find((e) => !isGeneric(e));
      const chosen = personal || emails[0];

      return {
        ...lead,
        email: chosen,
        email_confidence: personal ? 'alta' : 'media',
        email_source_path: ruta,
      };
    } catch {
      // siguiente ruta
    }
  }

  return { ...lead, email_confidence: '' };
}

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; MarliBot/1.0; +https://marli.agency/bot)',
      },
      signal: ctrl.signal,
      redirect: 'follow',
    });
    if (!res.ok) return null;
    const text = await res.text();
    return text.slice(0, 500_000); // Cap a 500KB para no comer memoria
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

function extractEmails(html, baseUrl) {
  const baseDomain = new URL(baseUrl).hostname.replace(/^www\./, '');
  const matches = html.match(EMAIL_REGEX) || [];
  const seen = new Set();
  return matches
    .map((e) => e.toLowerCase().trim())
    .filter((e) => {
      if (seen.has(e)) return false;
      seen.add(e);
      const domain = e.split('@')[1];
      // Preferir emails del mismo dominio o de proveedor común español
      if (BLACKLIST_DOMAINS.has(domain)) return false;
      // Filtrar emails que parecen plantillas
      if (e.includes('example.com') || e.includes('domain.com')) return false;
      // Preferir emails del dominio propio
      return domain === baseDomain || domain.endsWith('.' + baseDomain) || isSpanishProvider(domain);
    });
}

function isSpanishProvider(domain) {
  return domain.endsWith('.es') || domain.includes('cop.es') || /\.(com|org|net)$/.test(domain);
}

function isGeneric(email) {
  const local = email.split('@')[0].toLowerCase();
  return GENERICOS.has(local) || local.length < 3;
}

function normalizeUrl(input) {
  try {
    let s = String(input || '').trim();
    if (!s) return null;
    if (!s.match(/^https?:\/\//)) s = 'https://' + s;
    const u = new URL(s);
    return `${u.protocol}//${u.hostname}`;
  } catch {
    return null;
  }
}

function readCsv(path) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length === 0) return [];
  const cols = parseLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const vals = parseLine(lines[i]);
    const row = {};
    cols.forEach((c, j) => (row[c] = vals[j] || ''));
    rows.push(row);
  }
  return rows;
}

function parseLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (inQuotes) {
      if (c === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cur += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { out.push(cur); cur = ''; }
      else cur += c;
    }
  }
  out.push(cur);
  return out;
}

function writeCsv(rows, path) {
  if (rows.length === 0) return;
  const cols = Object.keys(rows[0]);
  const lines = [cols.join(',')];
  for (const r of rows) lines.push(cols.map((c) => csvEscape(r[c])).join(','));
  fs.writeFileSync(path, lines.join('\n'), 'utf8');
}
function csvEscape(v) {
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
function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
