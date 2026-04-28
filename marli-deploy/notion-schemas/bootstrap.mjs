#!/usr/bin/env node
/**
 * Bootstrap script — crea las 5 DBs Marli en Notion via API.
 *
 * Uso:
 *   1. Crear internal integration en https://www.notion.so/my-integrations
 *   2. Compartir una pagina raiz con la integration (tipo "Marli — Workspace")
 *   3. Copiar token y page_id en .env
 *   4. node bootstrap.mjs
 *
 * Variables .env:
 *   NOTION_INTEGRATION_TOKEN=secret_xxx
 *   NOTION_PARENT_PAGE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *
 * Crea (en orden):
 *   01-leads.json     -> "Marli — Leads"
 *   02-clientes.json  -> "Marli — Clientes"
 *   03-pacientes.json -> "CRM Cliente — Pacientes" (template)
 *   04-sesiones.json  -> "CRM Cliente — Sesiones"  (relation a Pacientes)
 *   05-tareas.json    -> "CRM Cliente — Tareas"    (relation a Pacientes + Sesiones)
 *
 * Output: imprime los DB_IDs creados, copialos a .env como
 *   NOTION_DB_LEADS_ID, NOTION_DB_CLIENTES_ID, NOTION_DB_PACIENTES_ID,
 *   NOTION_DB_SESIONES_ID, NOTION_DB_TAREAS_ID
 */

import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const TOKEN = process.env.NOTION_INTEGRATION_TOKEN;
const PARENT_PAGE = process.env.NOTION_PARENT_PAGE_ID;

if (!TOKEN || !PARENT_PAGE) {
  console.error("ERROR: Faltan NOTION_INTEGRATION_TOKEN o NOTION_PARENT_PAGE_ID en el entorno.");
  console.error("Crea un .env con estas variables. Ver control-empresa/11-INTEGRACIONES/credenciales.env.example");
  process.exit(1);
}

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

const headers = {
  "Authorization": `Bearer ${TOKEN}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json"
};

async function loadSchema(filename) {
  const path = resolve(__dirname, filename);
  const raw = await readFile(path, "utf8");
  const schema = JSON.parse(raw);
  delete schema._meta;
  for (const [key, prop] of Object.entries(schema.properties)) {
    if (prop.select?.options) prop.select.options.forEach(o => delete o._doc);
    if (prop.multi_select?.options) prop.multi_select.options.forEach(o => delete o._doc);
    delete prop._doc;
  }
  return schema;
}

async function createDatabase(schema, parentPageId) {
  schema.parent = { type: "page_id", page_id: parentPageId };
  const res = await fetch(`${NOTION_API}/databases`, {
    method: "POST",
    headers,
    body: JSON.stringify(schema)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Notion API ${res.status}: ${err}`);
  }
  const json = await res.json();
  return { id: json.id, url: json.url, title: json.title?.[0]?.plain_text };
}

function patchRelations(schema, idMap) {
  for (const prop of Object.values(schema.properties)) {
    if (prop.relation?.database_id) {
      const placeholder = prop.relation.database_id;
      if (placeholder.endsWith("_DB_ID_PLACEHOLDER")) {
        const key = placeholder.replace("_DB_ID_PLACEHOLDER", "").toLowerCase();
        if (idMap[key]) {
          prop.relation.database_id = idMap[key];
        } else {
          throw new Error(`Placeholder ${placeholder} sin resolver. idMap: ${JSON.stringify(idMap)}`);
        }
      }
    }
  }
  return schema;
}

async function main() {
  const order = [
    { file: "01-leads.json",     envVar: "NOTION_DB_LEADS_ID",     key: "leads" },
    { file: "02-clientes.json",  envVar: "NOTION_DB_CLIENTES_ID",  key: "clientes" },
    { file: "03-pacientes.json", envVar: "NOTION_DB_PACIENTES_ID", key: "pacientes" },
    { file: "04-sesiones.json",  envVar: "NOTION_DB_SESIONES_ID",  key: "sesiones" },
    { file: "05-tareas.json",    envVar: "NOTION_DB_TAREAS_ID",    key: "tareas" }
  ];

  const idMap = {};
  const out = [];

  for (const { file, envVar, key } of order) {
    process.stdout.write(`Creando ${file} ... `);
    let schema = await loadSchema(file);
    schema = patchRelations(schema, idMap);
    try {
      const db = await createDatabase(schema, PARENT_PAGE);
      idMap[key] = db.id;
      out.push({ envVar, id: db.id, url: db.url, title: db.title });
      console.log("OK", db.id);
    } catch (e) {
      console.log("FAIL");
      console.error(e.message);
      process.exit(2);
    }
  }

  console.log("\n=== COPIAR A .env ===\n");
  for (const { envVar, id } of out) {
    console.log(`${envVar}=${id}`);
  }
  console.log("\n=== URLs Notion ===\n");
  for (const { title, url } of out) {
    console.log(`${title}\n  ${url}\n`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
