#!/usr/bin/env node
/**
 * Scraper de psicólogos colegiados — listados públicos de COP (Colegio Oficial de Psicólogos)
 *
 * Cada Colegio provincial publica su listado de colegiados con datos profesionales públicos.
 * Estos datos son legítimamente accesibles y, según la AEPD, su tratamiento bajo "interés legítimo"
 * para B2B con opt-out claro suele ser defendible. **Verificar con tu abogado**.
 *
 * Fuentes públicas integradas:
 *  - COP Madrid: https://www.copmadrid.org/web/buscador-de-colegiados
 *  - COP Catalunya (COPC): https://www.copc.cat/cercador
 *  - Andalucía Oriental: https://www.copao.com/buscador
 *  - Andalucía Occidental: https://www.copao.es/buscador
 *  - Galicia: https://www.copgalicia.gal
 *  - Valencia: https://www.cop-cv.org
 *  - País Vasco (COPPV): https://www.copbizkaia.org
 *  - Resto: https://www.cop.es (general)
 *
 * Estrategia: paginación + parsing HTML.  Algunas web tienen captchas; en ese caso, fallback
 * manual descrito en `manual-export.md`.
 *
 * Uso:
 *   node cop-colegiados.mjs --provincia madrid --output leads-madrid.csv
 *   node cop-colegiados.mjs --all --output leads-spain.csv
 *
 * Output: CSV con columnas
 *   nombre,colegiado_num,provincia,especialidad,web,email,telefono,ciudad,fuente,fecha_scrap
 */

import fs from 'fs';
import path from 'path';

const PROVINCIAS = {
  madrid: {
    url: 'https://www.copmadrid.org/web/buscador-de-colegiados',
    type: 'POST',
    parser: 'copmadrid',
  },
  catalunya: {
    url: 'https://www.copc.cat/serveis/cercador-collegiats',
    type: 'GET',
    parser: 'copc',
  },
  valencia: {
    url: 'https://www.cop-cv.org/colegiados',
    type: 'GET',
    parser: 'copcv',
  },
  galicia: {
    url: 'https://www.copgalicia.gal/buscador',
    type: 'GET',
    parser: 'copgalicia',
  },
  andalucia_occidental: {
    url: 'https://www.copao.com/colegiados',
    type: 'GET',
    parser: 'copao',
  },
  pais_vasco: {
    url: 'https://www.copbizkaia.org/colegiados',
    type: 'GET',
    parser: 'copbizkaia',
  },
};

const args = parseArgs(process.argv.slice(2));

async function main() {
  const targets = args.all
    ? Object.keys(PROVINCIAS)
    : args.provincia
    ? [args.provincia.toLowerCase()]
    : null;

  if (!targets) {
    console.error('Uso: --provincia <madrid|catalunya|...> | --all');
    console.error('Provincias disponibles:', Object.keys(PROVINCIAS).join(', '));
    process.exit(1);
  }

  const output = args.output || 'leads.csv';
  const allLeads = [];

  for (const provincia of targets) {
    console.error(`\n→ Scraping ${provincia}...`);
    try {
      const leads = await scrapeProvincia(provincia);
      console.error(`  ✓ ${leads.length} leads encontrados`);
      allLeads.push(...leads);
      // Rate limit cortés
      await sleep(3000);
    } catch (err) {
      console.error(`  ✗ Error en ${provincia}: ${err.message}`);
      console.error(`    → Probar export manual desde la web (ver manual-export.md)`);
    }
  }

  // Dedupe por colegiado_num
  const seen = new Set();
  const unique = allLeads.filter((l) => {
    const k = `${l.provincia}:${l.colegiado_num}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  writeCsv(unique, output);
  console.error(`\n✓ Total: ${unique.length} leads únicos → ${output}`);
}

async function scrapeProvincia(provincia) {
  const config = PROVINCIAS[provincia];
  if (!config) throw new Error(`Provincia no soportada: ${provincia}`);

  const html = await fetchHtml(config.url);
  return parsersFor(config.parser)(html, provincia);
}

async function fetchHtml(url, options = {}) {
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'es-ES,es;q=0.9',
      ...(options.headers || {}),
    },
    body: options.body,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const parsers = {
  copmadrid(html, provincia) {
    // El COP Madrid devuelve resultados en tablas con clase .listado-colegiados
    // Para volumen alto, hacer paginación con parametros &offset=N&limit=50
    const rows = [...html.matchAll(/<tr class="colegiado">([\s\S]*?)<\/tr>/g)];
    return rows.map((m) => {
      const row = m[1];
      return {
        nombre: extractField(row, 'td.nombre'),
        colegiado_num: extractField(row, 'td.numero'),
        provincia,
        especialidad: extractField(row, 'td.especialidad'),
        web: extractAttr(row, 'a.web', 'href') || '',
        email: extractField(row, 'td.email') || '',
        telefono: extractField(row, 'td.telefono') || '',
        ciudad: extractField(row, 'td.ciudad') || '',
        fuente: 'cop-madrid',
        fecha_scrap: new Date().toISOString().slice(0, 10),
      };
    });
  },
  copc(html, provincia) {
    // COP Catalunya — formato similar
    const rows = [...html.matchAll(/<div class="collegiat-card">([\s\S]*?)<\/div>/g)];
    return rows.map((m) => ({
      nombre: extractField(m[1], 'h3.nom'),
      colegiado_num: extractField(m[1], 'span.num'),
      provincia,
      especialidad: extractField(m[1], 'span.especialitat'),
      web: extractAttr(m[1], 'a.web', 'href') || '',
      email: '',
      telefono: '',
      ciudad: extractField(m[1], 'span.ciutat') || '',
      fuente: 'cop-catalunya',
      fecha_scrap: new Date().toISOString().slice(0, 10),
    }));
  },
  // Stubs — el resto sigue patrón similar.  En producción, abrir DevTools en cada
  // web y ajustar selectores reales.
  copcv: (html, p) => parsers.copmadrid(html, p),
  copgalicia: (html, p) => parsers.copmadrid(html, p),
  copao: (html, p) => parsers.copmadrid(html, p),
  copbizkaia: (html, p) => parsers.copmadrid(html, p),
};

function parsersFor(name) {
  return parsers[name] || parsers.copmadrid;
}

function extractField(html, selector) {
  // Selector simplificado: tag.class
  const [tag, cls] = selector.split('.');
  const re = new RegExp(`<${tag}[^>]*class="[^"]*${cls}[^"]*"[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = html.match(re);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, '').trim();
}

function extractAttr(html, selector, attr) {
  const [tag, cls] = selector.split('.');
  const re = new RegExp(
    `<${tag}[^>]*class="[^"]*${cls}[^"]*"[^>]*${attr}="([^"]+)"`,
    'i'
  );
  const m = html.match(re);
  return m ? m[1] : null;
}

function writeCsv(rows, outputPath) {
  if (rows.length === 0) {
    console.error('⚠ No hay leads para escribir');
    return;
  }
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
