# Runbook 01 — Setup Notion

**Tiempo estimado**: 30-45 min
**Pre-requisitos**: cuenta Notion (Free o Plus es suficiente para Fase 1)
**Output**: 5 DBs creadas + 2 integration tokens + IDs en `.env`

## 1. Crear Internal Integrations (x2)

Marli usa **dos integrations separadas**:

- **Marli interno** → DBs Leads + Clientes (operativa propia)
- **Cliente psicólogo** → DBs Pacientes + Sesiones + Tareas (producto que se entrega)

Esto cumple el principio de mínimo privilegio: el chatbot Li solo puede tocar DBs del cliente, nunca el CRM interno de Marli.

### 1.1 — Integration Marli interno

1. Ir a https://www.notion.so/my-integrations
2. Click **+ New integration**
3. Name: `Marli — Internal CRM`
4. Associated workspace: tu workspace personal o de empresa
5. Type: **Internal**
6. Capabilities marcadas:
   - ✅ Read content
   - ✅ Update content
   - ✅ Insert content
   - ❌ User information (NO necesario)
7. **Submit** → copia el **Internal Integration Token** (empieza por `secret_`)
8. Guarda en `.env` como `NOTION_INTEGRATION_TOKEN=secret_xxxxx`

### 1.2 — Integration Cliente psicólogo

Repetir el proceso anterior con name `Marli — Cliente Psicólogo`. Token a `.env` como `NOTION_INTEGRATION_TOKEN_CLIENTE=secret_xxxxx`.

> **Importante**: el token cliente es por **cada cliente**. En Fase 1 (early adopter manual) usas tu propio token de pruebas. En Fase 2+ cada cliente tendrá su propio token y workspace; Marli no centraliza tokens cliente.

## 2. Crear página raíz "Marli — Workspace"

1. En Notion, crea una página vacía top-level llamada `Marli — Workspace`. Será el contenedor de las DBs.
2. Click **...** en la esquina sup. dcha. → **Connections** → **Add connections** → buscar `Marli — Internal CRM` → **Confirm**
3. Repetir paso 2 para `Marli — Cliente Psicólogo` (en Fase 1 las DBs cliente viven en el mismo workspace de pruebas, en producción cada cliente las tendrá en el suyo).
4. Copia el **Page ID** de esa página: en la URL después del último `-` hay 32 caracteres → ese es el ID. Copia a `.env` como `NOTION_PARENT_PAGE_ID=xxxxxxxx...`.

## 3. Bootstrap automático de las 5 DBs

```bash
cd marli-deploy/notion-schemas
node --env-file=../../.env bootstrap.mjs
```

Output esperado:

```
Creando 01-leads.json ... OK abc123...
Creando 02-clientes.json ... OK def456...
Creando 03-pacientes.json ... OK ghi789...
Creando 04-sesiones.json ... OK jkl012...
Creando 05-tareas.json ... OK mno345...

=== COPIAR A .env ===

NOTION_DB_LEADS_ID=abc123...
NOTION_DB_CLIENTES_ID=def456...
NOTION_DB_PACIENTES_ID=ghi789...
NOTION_DB_SESIONES_ID=jkl012...
NOTION_DB_TAREAS_ID=mno345...
```

Copia esos 5 IDs a tu `.env`.

## 4. Verificar

En Notion, abre la página `Marli — Workspace` → deberías ver 5 DBs creadas como subpáginas.

Comprobar que cada DB tiene las propiedades correctas y opciones de select con sus colores. Si alguna falla, el bootstrap es idempotente: borra la DB y vuelve a ejecutar.

## 5. Test de conectividad

```bash
cd marli-deploy/skills/notion-crm-manager/scripts
node --env-file=../../../.env notion-crm-manager.mjs --op snapshot_pipeline
```

Output esperado:

```json
{
  "capturado": 0,
  "nurturing": 0,
  "llamada-agendada": 0,
  "en-llamada": 0,
  "propuesta-enviada": 0,
  "cerrado-pendiente-pago": 0,
  "cliente": 0,
  "_total": 0,
  "_conversion_lead_to_cliente": "N/A"
}
```

Si funciona: la conexión Notion está OK.

## Troubleshooting

| Error | Causa | Fix |
|---|---|---|
| `404 object_not_found` | La integration no está conectada a la página | Volver al paso 2 — connect integration |
| `401 unauthorized` | Token mal copiado o caducado | Regenerar en my-integrations, actualizar `.env` |
| `409 conflict` (creando DB) | Ya existe una DB con ese título | Borrar la anterior o renombrar en `_meta.name` |
| `validation_error` en propiedades | Schema JSON corrupto | Verificar que el JSON es válido (`jq . file.json`) |

## Próximo paso

→ `02-setup-n8n.md`
