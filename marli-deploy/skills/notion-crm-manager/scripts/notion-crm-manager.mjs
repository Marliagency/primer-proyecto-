#!/usr/bin/env node
/**
 * notion-crm-manager — Implementación reference del skill.
 *
 * Cubre operaciones de alto nivel sobre las 5 DBs Notion del sistema Marli.
 *
 * Uso CLI:
 *   node notion-crm-manager.mjs --op crear_lead --params '{"email":"x@y.com"}'
 *   node notion-crm-manager.mjs --op snapshot_pipeline
 *   node notion-crm-manager.mjs --op listar_clientes_en_riesgo
 *
 * Uso programático:
 *   import { crear_lead, snapshot_pipeline } from './notion-crm-manager.mjs';
 *   const lead = await crear_lead({ email: '...', fuente: 'lead-magnet-ig' });
 */

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

const headersMarli = () => ({
  "Authorization": `Bearer ${process.env.NOTION_INTEGRATION_TOKEN}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json"
});

const headersCliente = () => ({
  "Authorization": `Bearer ${process.env.NOTION_INTEGRATION_TOKEN_CLIENTE}`,
  "Notion-Version": NOTION_VERSION,
  "Content-Type": "application/json"
});

// ─── Backoff exponencial para rate limiting ───────────────────────────────

async function withBackoff(fn, attempt = 0) {
  try {
    return await fn();
  } catch (e) {
    if (e.status === 429 && attempt < 5) {
      const wait = Math.pow(2, attempt) * 500;
      await new Promise(r => setTimeout(r, wait));
      return withBackoff(fn, attempt + 1);
    }
    throw e;
  }
}

async function notionFetch(path, options = {}, useClienteToken = false) {
  const headers = useClienteToken ? headersCliente() : headersMarli();
  return withBackoff(async () => {
    const res = await fetch(`${NOTION_API}${path}`, { ...options, headers });
    if (!res.ok) {
      const err = new Error(`Notion API ${res.status}: ${await res.text()}`);
      err.status = res.status;
      throw err;
    }
    return res.json();
  });
}

// ─── DBs Marli — Leads ────────────────────────────────────────────────────

export async function crear_lead({ email, nombre = '', fuente = 'directo', persona = 'desconocido', utm_campaign = '', utm_source = '', pain_point = '' }) {
  if (!email) throw new Error('email requerido');
  const today = new Date().toISOString().split('T')[0];
  return notionFetch('/pages', {
    method: 'POST',
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_DB_LEADS_ID },
      properties: {
        Email: { title: [{ text: { content: email.toLowerCase().trim() } }] },
        Nombre: { rich_text: [{ text: { content: nombre } }] },
        Status: { select: { name: 'capturado' } },
        Fuente: { select: { name: fuente } },
        Persona: { select: { name: persona } },
        'UTM Campaign': { rich_text: [{ text: { content: utm_campaign } }] },
        'UTM Source': { rich_text: [{ text: { content: utm_source } }] },
        'Pain Point Detectado': { rich_text: [{ text: { content: pain_point } }] },
        'Fecha Captura': { date: { start: today } },
        'Fecha Proxima Accion': { date: { start: today } }
      }
    })
  });
}

const VALID_LEAD_STATUS = ['capturado', 'nurturing', 'llamada-agendada', 'en-llamada', 'propuesta-enviada', 'cerrado-pendiente-pago', 'cliente', 'no-response', 'descartado'];

export async function avanzar_status_lead(lead_id, nuevo_status) {
  if (!VALID_LEAD_STATUS.includes(nuevo_status)) {
    throw new Error(`Status inválido: ${nuevo_status}. Válidos: ${VALID_LEAD_STATUS.join(', ')}`);
  }
  return notionFetch(`/pages/${lead_id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      properties: {
        Status: { select: { name: nuevo_status } },
        'Fecha Ultima Accion': { date: { start: new Date().toISOString().split('T')[0] } }
      }
    })
  });
}

export async function buscar_lead_por_email(email) {
  const res = await notionFetch(`/databases/${process.env.NOTION_DB_LEADS_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Email', title: { equals: email.toLowerCase().trim() } },
      page_size: 1
    })
  });
  return res.results[0] || null;
}

export async function listar_leads_por_status(status, limit = 100) {
  const res = await notionFetch(`/databases/${process.env.NOTION_DB_LEADS_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Status', select: { equals: status } },
      page_size: Math.min(limit, 100)
    })
  });
  return res.results;
}

// ─── DBs Marli — Clientes ────────────────────────────────────────────────

export async function actualizar_status_cliente(cliente_id, nuevo_status) {
  const validos = ['onboarding', 'activo', 'mantenimiento', 'en-riesgo', 'churn', 'embajador'];
  if (!validos.includes(nuevo_status)) throw new Error(`Status cliente inválido: ${nuevo_status}`);
  const props = { Status: { select: { name: nuevo_status } } };
  if (nuevo_status === 'churn') {
    props['Fecha Churn'] = { date: { start: new Date().toISOString().split('T')[0] } };
  }
  return notionFetch(`/pages/${cliente_id}`, { method: 'PATCH', body: JSON.stringify({ properties: props }) });
}

export async function listar_clientes_en_riesgo() {
  const res = await notionFetch(`/databases/${process.env.NOTION_DB_CLIENTES_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Status', select: { equals: 'en-riesgo' } }
    })
  });
  return res.results;
}

export async function listar_candidatos_upsell() {
  // Clientes activos sin Mantenimiento, alto uso → candidatos upsell
  const res = await notionFetch(`/databases/${process.env.NOTION_DB_CLIENTES_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        and: [
          { property: 'Status', select: { equals: 'activo' } },
          { property: 'Tiene Mantenimiento', checkbox: { equals: false } },
          { property: 'Tags', multi_select: { contains: 'alto-uso' } }
        ]
      }
    })
  });
  return res.results;
}

export async function calcular_mrr_total() {
  let cursor = undefined;
  let mrr = 0;
  let count_activos = 0;
  do {
    const res = await notionFetch(`/databases/${process.env.NOTION_DB_CLIENTES_ID}/query`, {
      method: 'POST',
      body: JSON.stringify({
        filter: {
          or: [
            { property: 'Status', select: { equals: 'activo' } },
            { property: 'Status', select: { equals: 'mantenimiento' } }
          ]
        },
        start_cursor: cursor,
        page_size: 100
      })
    });
    for (const r of res.results) {
      const val = r.properties?.MRR?.number || 0;
      mrr += val;
      count_activos++;
    }
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);
  return { mrr_total_eur: mrr, clientes_activos: count_activos };
}

// ─── Snapshot agregado ────────────────────────────────────────────────────

export async function snapshot_pipeline() {
  const stages = ['capturado', 'nurturing', 'llamada-agendada', 'en-llamada', 'propuesta-enviada', 'cerrado-pendiente-pago', 'cliente'];
  const counts = {};
  for (const stage of stages) {
    const r = await listar_leads_por_status(stage, 100);
    counts[stage] = r.length;
  }
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const conversion_lead_to_cliente = total > 0 ? (counts.cliente / total * 100).toFixed(1) + '%' : 'N/A';
  return { ...counts, _total: total, _conversion_lead_to_cliente: conversion_lead_to_cliente };
}

// ─── DBs Cliente Psicólogo — Sesiones ────────────────────────────────────

export async function sesiones_pendientes_informe() {
  const res = await notionFetch(`/databases/${process.env.NOTION_DB_SESIONES_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: { property: 'Status', select: { equals: 'cerrada' } }
    })
  }, /*useClienteToken=*/ true);
  return res.results;
}

export async function sesiones_aprobadas_sin_pdf() {
  const res = await notionFetch(`/databases/${process.env.NOTION_DB_SESIONES_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({
      filter: {
        and: [
          { property: 'Informe Aprobado', checkbox: { equals: true } },
          { property: 'Informe PDF', files: { is_empty: true } }
        ]
      }
    })
  }, true);
  return res.results;
}

// ─── DBs Cliente Psicólogo — Tareas ──────────────────────────────────────

export async function crear_tarea({ titulo, tipo, prioridad = 'P3-normal', paciente_id, sesion_id, fecha_vencimiento, descripcion = '', origen = 'manual' }) {
  const props = {
    Tarea: { title: [{ text: { content: titulo } }] },
    Status: { select: { name: 'pendiente' } },
    Prioridad: { select: { name: prioridad } },
    Tipo: { select: { name: tipo } },
    Origen: { select: { name: origen } },
    Descripcion: { rich_text: [{ text: { content: descripcion } }] }
  };
  if (paciente_id) props['Paciente Relacionado'] = { relation: [{ id: paciente_id }] };
  if (sesion_id) props['Sesion Relacionada'] = { relation: [{ id: sesion_id }] };
  if (fecha_vencimiento) props['Fecha Vencimiento'] = { date: { start: fecha_vencimiento } };
  return notionFetch('/pages', {
    method: 'POST',
    body: JSON.stringify({ parent: { database_id: process.env.NOTION_DB_TAREAS_ID }, properties: props })
  }, true);
}

export async function listar_tareas_pendientes(prioridad) {
  const filter = prioridad
    ? {
        and: [
          { property: 'Status', select: { equals: 'pendiente' } },
          { property: 'Prioridad', select: { equals: prioridad } }
        ]
      }
    : { property: 'Status', select: { equals: 'pendiente' } };
  const res = await notionFetch(`/databases/${process.env.NOTION_DB_TAREAS_ID}/query`, {
    method: 'POST',
    body: JSON.stringify({ filter, sorts: [{ property: 'Fecha Vencimiento', direction: 'ascending' }] })
  }, true);
  return res.results;
}

// ─── CLI ─────────────────────────────────────────────────────────────────

const OPS = {
  crear_lead, avanzar_status_lead, buscar_lead_por_email, listar_leads_por_status,
  actualizar_status_cliente, listar_clientes_en_riesgo, listar_candidatos_upsell, calcular_mrr_total,
  snapshot_pipeline,
  sesiones_pendientes_informe, sesiones_aprobadas_sin_pdf,
  crear_tarea, listar_tareas_pendientes
};

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const opIdx = args.indexOf('--op');
  const paramsIdx = args.indexOf('--params');
  if (opIdx === -1) {
    console.error('Uso: node notion-crm-manager.mjs --op <name> [--params <json>]');
    console.error('Operaciones: ' + Object.keys(OPS).join(', '));
    process.exit(1);
  }
  const op = args[opIdx + 1];
  const params = paramsIdx !== -1 ? JSON.parse(args[paramsIdx + 1]) : {};
  if (!OPS[op]) {
    console.error(`Operación desconocida: ${op}`);
    process.exit(1);
  }
  OPS[op](params).then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(e.message); process.exit(2); });
}
