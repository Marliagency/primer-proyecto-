---
name: notion-crm-manager
description: Gestión completa del CRM Marli en Notion (5 DBs: Leads, Clientes, Pacientes, Sesiones, Tareas). Use this skill when the user wants to create/query/update leads or clients in the Marli pipeline, generate session reports, manage client tasks, or audit the CRM state. Wraps the Notion API with domain-specific operations (advance lead status, mark client at-risk, find sessions ready for report, etc.) — higher-level than raw Notion node calls.
license: MIT
---

# notion-crm-manager — Skill

Skill custom que cubre el gap `notion-crm` del ecosistema Anthropic. Encapsula la lógica de negocio del CRM Marli sobre la Notion API, exponiendo operaciones de alto nivel en lugar de calls REST crudas.

## Cuándo usar este skill

Trigger automático cuando el usuario menciona:

- "crear lead", "registrar prospect", "nuevo contacto interesado"
- "avanzar status del lead a nurturing/llamada/propuesta/cliente"
- "marcar cliente en riesgo / churn / VIP"
- "qué sesiones están pendientes de informe"
- "tareas P1/urgentes para hoy"
- "pipeline actual de leads"
- "MRR este mes / total clientes activos"
- "buscar paciente por nombre/teléfono"

**No usar este skill** para:
- Documentos clínicos sensibles (van por workflow auto-informes con aprobación humana)
- Modificar schema de las DBs (cambio estructural → Log-Decisiones.md primero)
- Acceso desde clientes externos (este skill es interno; los clientes acceden a su propio Notion sin Marli)

## Operaciones disponibles

### Sobre Marli — Leads

```
crear_lead({ email, nombre?, fuente?, persona?, utm_*?, pain_point? })
avanzar_status_lead(lead_id, nuevo_status)  # capturado → nurturing → llamada-agendada → ...
buscar_lead_por_email(email)
listar_leads_por_status(status, limit?)
marcar_descartado(lead_id, razon)
```

### Sobre Marli — Clientes

```
crear_cliente_desde_lead(lead_id, productos_comprados, stripe_customer_id)
actualizar_status_cliente(cliente_id, nuevo_status)  # onboarding → activo → en-riesgo → churn
listar_clientes_en_riesgo()
listar_candidatos_upsell()
calcular_mrr_total()
listar_clientes_para_testimonio()
solicitar_testimonio(cliente_id)
registrar_testimonio(cliente_id, link)
```

### Sobre CRM Cliente Psicólogo — Pacientes / Sesiones / Tareas

```
crear_paciente({ nombre, email?, telefono?, modalidad, frecuencia, ... })
buscar_paciente(query)  # nombre, email, telefono
listar_pacientes_activos()
proximas_sesiones(ventana_horas=24)

crear_sesion({ paciente_id, fecha, duracion_min, modalidad, tipo? })
cerrar_sesion(sesion_id, notas, objetivos, tareas)  # → trigger workflow informes
sesiones_pendientes_informe()  # para auditar pipeline informes
sesiones_aprobadas_sin_pdf()    # para regenerar export

crear_tarea({ titulo, tipo, prioridad, paciente_id?, sesion_id?, fecha_vencimiento?, origen='manual' })
listar_tareas_pendientes(prioridad?)
cerrar_tarea(tarea_id, resultado)
```

### Operaciones agregadas / dashboards

```
snapshot_pipeline()  # cuántos leads en cada status, conversion rates
snapshot_clientes()  # MRR, churn rate, activation rate D7
top_leads_a_seguir(limit=5)  # leads con mayor scoring (proxima_accion próxima + persona alineada)
top_clientes_en_riesgo(limit=5)
```

## Arquitectura

```
+----------------------+
|   notion-crm-manager |  ← este skill
|     (lógica negocio) |
+----------+-----------+
           |
           v
+----------------------+
|     Notion API       |  ← https://api.notion.com/v1
+----------------------+
```

Internamente usa el cliente oficial `@notionhq/client` o, alternativamente, un MCP server custom (ver `scripts/mcp-server.mjs`).

## Configuración

Variables de entorno requeridas:

```
NOTION_INTEGRATION_TOKEN          # Marli interno (Leads + Clientes)
NOTION_INTEGRATION_TOKEN_CLIENTE  # Cliente psicólogo (Pacientes/Sesiones/Tareas)
NOTION_DB_LEADS_ID
NOTION_DB_CLIENTES_ID
NOTION_DB_PACIENTES_ID
NOTION_DB_SESIONES_ID
NOTION_DB_TAREAS_ID
```

## Política de seguridad

1. **Mínimo privilegio**: la integration token solo tiene acceso a las DBs explícitamente compartidas. NUNCA al workspace completo.
2. **Read-only por defecto**: las operaciones de escritura requieren confirmación explícita o que vengan de un trigger automatizado conocido.
3. **No log de PII**: los logs solo guardan IDs y operación, jamás email/teléfono/nombre completo en plano.
4. **RGPD borrado**: la operación `borrar_lead(lead_id)` ejecuta archivado lógico (status=descartado) + scrubbing de campos PII tras 24h gracia. El borrado físico real se hace mensualmente vía script aparte.

## Implementación

Ver `scripts/notion-crm-manager.mjs` para implementación reference.

```bash
cd scripts/
npm install @notionhq/client
node notion-crm-manager.mjs --op snapshot_pipeline
```

## Ejemplos de uso

### Desde n8n (Code node)

```javascript
const skill = require('/skills/notion-crm-manager/scripts/notion-crm-manager.mjs');
const result = await skill.crear_lead({
  email: 'lucia@example.com',
  fuente: 'lead-magnet-ig',
  persona: 'saturada'
});
return result;
```

### Desde Claude API (tool use)

```json
{
  "tools": [
    {
      "name": "marli_crm",
      "description": "CRM operations on Marli Notion workspace",
      "input_schema": {
        "type": "object",
        "properties": {
          "operation": { "type": "string" },
          "params": { "type": "object" }
        }
      }
    }
  ]
}
```

## Limitaciones conocidas

- Notion API rate limit: 3 req/s avg, 30 req/s burst → operaciones en bulk usan exponential backoff (implementado en cliente).
- Filtros complejos (más de 100 condiciones) requieren paginación manual.
- Properties de tipo `formula` y `rollup` son read-only (limitación API Notion).

## Referencia interna

- Schemas DBs: `../../notion-schemas/`
- Política seguridad: `control-empresa/11-INTEGRACIONES/SECURITY.md`
- Especificación CRM: `control-empresa/02-PRODUCTOS/CRM-Marli.md`
- Procesos: `control-empresa/05-PROCESOS/Proceso-Captacion.md`, `Proceso-Venta.md`
