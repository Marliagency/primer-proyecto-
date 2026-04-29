#!/usr/bin/env node
/**
 * Scraper de Doctoralia España — psicólogos con perfil público.
 *
 * Doctoralia tiene ~12.000 psicólogos con perfil público (nombre, especialidad,
 * dirección, web propia frecuentemente). Estos son datos profesionales públicos
 * accesibles vía paginación normal.
 *
 * URL base: https://www.doctoralia.es/psicologo
 *
 * **IMPORTANTE**:
 *  - Respeta robots.txt (Doctoralia permite scraping moderado)
 *  - Rate limit: 1 request cada 2-3 segundos máximo
 *  - Si te detecta bot → headers normales, residential proxy si fuera necesario
 *  - El email NO suele estar en el perfil, pero la web propia sí. Posteriormente
 *    el script `enrich-domains.mjs` busca email en la web propia.
 *
 * Uso:
 *   node doctoralia.mjs --pages 100 --output doctoralia-leads.csv
 *   node doctoralia.mjs --provincia barcelona --pages 50
 *
 * Output: CSV con columnas
 *   nombre,especialidad,ciudad,provincia,web,doctoralia_url,fuente,fecha_scrap
 */

import fs from 'fs';

const BASE_URL = 'https://www.doctoralia.es/psicologo';

const args = parseArgs(process.argv.slice(2));
const MAX_PAGES = parseInt(args.pages || '50', 10);
const OUTPUT = args.output || 'doctoralia-leads.csv';
const PROVINCIA = args.provincia || null;

async function main() {
  const allLeads = [];
  const baseUrl = PROVINCIA ? `${BASE_URL}/${slug(PROVINCIA)}` : BASE_URL;

  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `${baseUrl}?page=${page}`;
    console.error(`→ Página ${page}/${MAX_PAGES}: ${url}`);

    try {
      const html = await fetchHtml(url);
      const leads = parseLeadsFromPage(html);

      if (leads.length === 0) {
        console.error(`  ✓ Sin más resultados — fin`);
        break;
      }

      console.error(`  ✓ ${leads.length} perfiles`);
      allLeads.push(...leads);

      // Rate limit obligatorio
      await sleep(2500);
    } catch (err) {
      console.error(`  ✗ Error: ${err.message}`);
      // Backoff exponencial
      await sleep(15000);
    }
  }

  // Dedupe por URL
  const seen = new Set();
  const unique = allLeads.filter((l) => {
    if (seen.has(l.doctoralia_url)) return false;
    seen.add(l.doctoralia_url);
    return true;
  });

  writeCsv(unique, OUTPUT);
  console.error(`\n✓ Total: ${unique.length} perfiles únicos → ${OUTPUT}`);
}

function parseLeadsFromPage(html) {
  // Doctoralia usa data-test-id="search-result" en cada card (verificar con DevTools)
  const cards = [...html.matchAll(
    /<div[^>]+data-test-id="search-result"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g
  )];

  return cards.map((m) => {
    const card = m[1];
    return {
      nombre: extract(card, /<h3[^>]*>([\s\S]*?)<\/h3>/) || '',
      especialidad: extract(card, /class="specialization"[^>]*>([^<]+)/) || 'Psicólogo/a',
      ciudad: extract(card, /class="address-city"[^>]*>([^<]+)/) || '',
      provincia: extract(card, /class="address-province"[^>]*>([^<]+)/) || '',
      web: extractAttr(card, /href="(https?:\/\/[^"]+)"[^>]*class="[^"]*website/) || '',
      doctoralia_url: 'https://www.doctoralia.es' + (extractAttr(card, /href="(\/psicologo\/[^"]+)"/) || ''),
      fuente: 'doctoralia',
      fecha_scrap: new Date().toISOString().slice(0, 10),
    };
  }).filter((l) => l.nombre);
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'es-ES,es;q=0.9',
      Referer: 'https://www.doctoralia.es/',
    },
  });
  if (res.status === 429) {
    throw new Error('Rate limited (429)');
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function extract(html, regex) {
  const m = html.match(regex);
  return m ? cleanText(m[1]) : '';
}
function extractAttr(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : '';
}
function cleanText(s) {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function slug(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function writeCsv(rows, outputPath) {
  if (rows.length === 0) return;
  const cols = Object.keys(rows[0]);
  const lines = [cols.join(',')];
  for (const r of rows) {
    lines.push(cols.map((c) => csvEscape(r[c])).join(','));
  }
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');
}

function csvEscape(v) {
  if (v == null) return '';
  const s = String(v);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i++;
      }
    }
  }
  return args;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
