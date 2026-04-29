#!/usr/bin/env node
/**
 * Scraper de Google Maps — clínicas/consultas de psicología en España.
 *
 * Estrategia: usar Places API o, si no quieres pagar, scraping del HTML de
 * google.com/maps con queries del tipo "psicólogo + [provincia]".
 *
 * **OPCIÓN A — Gratis (recomendada para empezar)**:
 *   Google Maps tiene listados públicos. Buscar "psicólogo Madrid" devuelve
 *   ~200 resultados con web y teléfono. Hay que iterar por provincia + ciudad.
 *
 * **OPCIÓN B — Places API (5€/1000 queries, más limpio)**:
 *   Crear API key en console.cloud.google.com → habilitar Places API.
 *   Pasar `--apikey` y el script usa la API oficial. Hasta 100 resultados/query.
 *   Para 50 provincias × 5 ciudades grandes = 250 queries = ~1.25€.
 *
 * Uso:
 *   node google-maps.mjs --apikey YOUR_KEY --output maps-leads.csv
 *   node google-maps.mjs --scrape --output maps-leads.csv  (sin API, más lento)
 *
 * Output: nombre,direccion,ciudad,provincia,web,telefono,rating,reviews,fuente,fecha_scrap
 */

import fs from 'fs';

const PROVINCIAS = [
  'Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Zaragoza', 'Málaga', 'Murcia',
  'Palma', 'Las Palmas', 'Bilbao', 'Alicante', 'Córdoba', 'Valladolid', 'Vigo',
  'Gijón', 'A Coruña', 'Granada', 'Vitoria', 'Elche', 'Santa Cruz de Tenerife',
  'Pamplona', 'Almería', 'San Sebastián', 'Burgos', 'Albacete', 'Santander',
  'Castellón', 'Logroño', 'Badajoz', 'Salamanca', 'Huelva', 'Lleida', 'Tarragona',
  'León', 'Cádiz', 'Jaén', 'Ourense', 'Girona', 'Lugo', 'Cáceres', 'Melilla',
  'Ceuta', 'Toledo', 'Pontevedra', 'Ciudad Real', 'Guadalajara', 'Huesca', 'Soria',
  'Cuenca', 'Ávila', 'Zamora', 'Palencia', 'Segovia', 'Teruel'
];

const args = parseArgs(process.argv.slice(2));
const OUTPUT = args.output || 'maps-leads.csv';

async function main() {
  const allLeads = [];

  if (args.apikey) {
    console.error('→ Modo Places API (con API key)');
    for (const provincia of PROVINCIAS) {
      const leads = await searchPlacesAPI(`psicólogo ${provincia} España`, args.apikey);
      console.error(`  ${provincia}: ${leads.length} resultados`);
      allLeads.push(...leads);
      await sleep(200);
    }
  } else if (args.scrape) {
    console.error('→ Modo scraping HTML (sin API, lento)');
    console.error('  ⚠ Google detecta scraping fácilmente. Recomendado: Places API.');
    for (const provincia of PROVINCIAS.slice(0, 10)) {  // Limitar 10 para evitar bloqueo
      const leads = await scrapeGoogleMapsHTML(`psicólogo ${provincia}`);
      console.error(`  ${provincia}: ${leads.length}`);
      allLeads.push(...leads);
      await sleep(8000);
    }
  } else {
    console.error('Uso: --apikey YOUR_KEY (recomendado) | --scrape (sin API)');
    process.exit(1);
  }

  const unique = dedupe(allLeads, (l) => `${l.nombre}|${l.direccion}`);
  writeCsv(unique, OUTPUT);
  console.error(`\n✓ Total: ${unique.length} clínicas únicas → ${OUTPUT}`);
}

async function searchPlacesAPI(query, apikey) {
  // Places API (New) — Text Search
  const url = 'https://places.googleapis.com/v1/places:searchText';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apikey,
      'X-Goog-FieldMask':
        'places.displayName,places.formattedAddress,places.websiteUri,places.nationalPhoneNumber,places.rating,places.userRatingCount,places.id',
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'es',
      regionCode: 'ES',
      maxResultCount: 20,
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Places API ${res.status}: ${txt}`);
  }

  const data = await res.json();
  const places = data.places || [];

  return places.map((p) => ({
    nombre: p.displayName?.text || '',
    direccion: p.formattedAddress || '',
    ciudad: extractCiudad(p.formattedAddress),
    provincia: extractProvincia(p.formattedAddress),
    web: p.websiteUri || '',
    telefono: p.nationalPhoneNumber || '',
    rating: p.rating || '',
    reviews: p.userRatingCount || 0,
    fuente: 'google-places-api',
    fecha_scrap: new Date().toISOString().slice(0, 10),
  }));
}

async function scrapeGoogleMapsHTML(query) {
  // Scraping HTML — fragil, último recurso. Mejor usar Places API.
  const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      'Accept-Language': 'es-ES,es;q=0.9',
    },
  });
  const html = await res.text();

  // Google Maps incrusta los datos en un blob JSON al final del HTML
  // Buscar `window.APP_INITIALIZATION_STATE` o similar
  const m = html.match(/window\.APP_INITIALIZATION_STATE\s*=\s*(\[[\s\S]*?\]);<\/script>/);
  if (!m) {
    console.error('  ⚠ No se pudo extraer datos del HTML (Google posiblemente bloqueando)');
    return [];
  }

  // Intento básico de parsing — frágil. En producción, usar la API.
  const text = m[1];
  const names = [...text.matchAll(/"([^"]{5,80} - .*?[Pp]sicolog[íi]a[^"]*)"/g)].map((x) => x[1]);
  return names.map((name) => ({
    nombre: name,
    direccion: '',
    ciudad: '',
    provincia: '',
    web: '',
    telefono: '',
    rating: '',
    reviews: 0,
    fuente: 'google-maps-scrape',
    fecha_scrap: new Date().toISOString().slice(0, 10),
  }));
}

function extractCiudad(addr) {
  if (!addr) return '';
  const parts = addr.split(',').map((s) => s.trim());
  return parts[parts.length - 3] || parts[1] || '';
}
function extractProvincia(addr) {
  if (!addr) return '';
  const m = addr.match(/(\d{5})\s+([^,]+)/);
  return m ? m[2].trim() : '';
}

function dedupe(rows, keyFn) {
  const seen = new Set();
  return rows.filter((r) => {
    const k = keyFn(r);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
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

main().catch((err) => { console.error('Fatal:', err); process.exit(1); });
