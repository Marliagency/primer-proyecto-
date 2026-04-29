#!/usr/bin/env node
/**
 * Une múltiples CSVs (COP, Doctoralia, Maps), deduplica y normaliza.
 *
 * Estrategia de deduplicación:
 *   1. Normalizar emails (lowercase, trim)
 *   2. Match exacto por email
 *   3. Match difuso por (nombre + provincia) cuando email falta
 *   4. Mergear datos: si un lead viene de 2 fuentes, combinar la mejor info
 *
 * Uso:
 *   node dedupe-and-merge.mjs --inputs cop.csv,doctoralia.csv,maps.csv --output master-list.csv
 *
 * Output: master CSV con columnas:
 *   email,nombre,colegiado_num,provincia,ciudad,especialidad,web,telefono,
 *   fuentes,verify_score,fecha_primer_scrap
 */

import fs from 'fs';

const args = parseArgs(process.argv.slice(2));
const INPUTS = (args.inputs || '').split(',').filter(Boolean);
const OUTPUT = args.output || 'master-list.csv';

if (INPUTS.length === 0) {
  console.error('Uso: --inputs cop.csv,doctoralia.csv,maps.csv --output master.csv');
  process.exit(1);
}

async function main() {
  const allRows = [];
  for (const inp of INPUTS) {
    if (!fs.existsSync(inp)) {
      console.error(`✗ ${inp} no existe, saltando`);
      continue;
    }
    const rows = readCsv(inp);
    console.error(`  ${inp}: ${rows.length} rows`);
    rows.forEach((r) => (r.__source_file = inp));
    allRows.push(...rows);
  }

  console.error(`→ Total bruto: ${allRows.length}`);

  // Normalizar
  for (const r of allRows) {
    r.email = (r.email || '').toLowerCase().trim();
    r.nombre = normName(r.nombre);
    r.provincia = (r.provincia || '').trim();
  }

  // Deduplicar por email
  const byEmail = new Map();
  const sinEmail = [];

  for (const r of allRows) {
    if (r.email) {
      const existing = byEmail.get(r.email);
      if (existing) {
        merge(existing, r);
      } else {
        byEmail.set(r.email, normalizeRow(r));
      }
    } else {
      sinEmail.push(normalizeRow(r));
    }
  }

  // Deduplicar sin email por nombre+provincia
  const byNombreProv = new Map();
  for (const r of sinEmail) {
    const key = `${r.nombre}|${r.provincia}`;
    if (byNombreProv.has(key)) {
      merge(byNombreProv.get(key), r);
    } else {
      byNombreProv.set(key, r);
    }
  }

  const merged = [...byEmail.values(), ...byNombreProv.values()];
  console.error(`✓ Deduplicado: ${merged.length} (${byEmail.size} con email, ${byNombreProv.size} sin email)`);

  // Sort: primero los que tienen email + verify_score alto
  merged.sort((a, b) => {
    if (!!a.email !== !!b.email) return a.email ? -1 : 1;
    return (b.verify_score || 0) - (a.verify_score || 0);
  });

  writeCsv(merged, OUTPUT);
  console.error(`✓ Master list → ${OUTPUT}`);
}

function normalizeRow(r) {
  return {
    email: r.email || '',
    nombre: r.nombre || '',
    colegiado_num: r.colegiado_num || '',
    provincia: r.provincia || '',
    ciudad: r.ciudad || '',
    especialidad: r.especialidad || 'Psicólogo/a',
    web: r.web || '',
    telefono: r.telefono || '',
    fuentes: r.fuente || r.__source_file || '',
    verify_score: r.verify_score || '',
    email_confidence: r.email_confidence || '',
    fecha_primer_scrap: r.fecha_scrap || new Date().toISOString().slice(0, 10),
  };
}

function merge(target, source) {
  // Tomar el mejor valor de cada campo
  const fields = ['nombre', 'colegiado_num', 'ciudad', 'especialidad', 'web', 'telefono'];
  for (const f of fields) {
    if (!target[f] && source[f]) target[f] = source[f];
  }
  // Acumular fuentes
  const sources = new Set((target.fuentes || '').split(';').filter(Boolean));
  if (source.fuente) sources.add(source.fuente);
  if (source.__source_file) sources.add(source.__source_file);
  target.fuentes = [...sources].join(';');

  // Verify score: tomar el más alto
  const sScore = parseInt(source.verify_score || '0', 10);
  const tScore = parseInt(target.verify_score || '0', 10);
  if (sScore > tScore) target.verify_score = sScore;
}

function normName(s) {
  if (!s) return '';
  return String(s)
    .replace(/^(D\.|Dña\.|Dr\.|Dra\.|Sr\.|Sra\.)\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function readCsv(path) {
  const text = fs.readFileSync(path, 'utf8');
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
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
