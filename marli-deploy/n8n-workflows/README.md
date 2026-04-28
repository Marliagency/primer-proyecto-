# n8n Workflows — Marli

Workflows JSON listos para importar en n8n (drag & drop o `Import from File`).

## Inventario

| # | Workflow | Trigger | Fase | Criticidad | Dependencias clave |
|---|---|---|---|---|---|
| 01 | `01-lead-magnet-capture.json` | Webhook POST `/marli-lead-magnet` | 1 | S1 | Notion Leads, Cloudflare Email |
| 01b | `01b-lead-magnet-nurturing.json` | Cron diario 9:00 | 1 | S2 | Notion Leads, Cloudflare Email, templates HTML |
| 02 | `02-cobro-stripe.json` | Webhook POST `/marli-checkout` | 1 | S1 | Stripe restricted key, Notion Leads |
| 02b | `02b-stripe-webhook-handler.json` | Webhook POST `/stripe-webhook` | 1 | S1 | STRIPE_WEBHOOK_SECRET, Notion Clientes |
| 03 | `03-onboarding.json` | Webhook POST `/marli-onboarding` (lo dispara 02b) | 1 | S2 | Notion Clientes, Cloudflare Email |
| 03b | `03b-onboarding-checkins.json` | Cron diario 10:00 | 1 | S3 | Notion Clientes, Cloudflare Email |
| 04 | `04-informes-auto.json` | Cron 15min · poll Sesiones | 1 | S2 | Notion Sesiones, Anthropic API, Cloudflare Email |
| 05 | (TBD Fase 2) chatbot-li | Webhook POST `/li-message` | 2 | S1 | Anthropic API, RAG, embeddings |
| 06 | (TBD Fase 2) recordatorios | Cron diario 18:00 | 2 | S3 | Notion Sesiones, WhatsApp Business |

## Cómo importarlos

### Vía UI

1. Abre n8n → menú lateral → **Workflows** → botón **Add workflow** → **Import from File**.
2. Selecciona el `.json`.
3. n8n te avisará si faltan credenciales (rojo). Las creas y reasignas.
4. Marca el workflow como **Active** solo cuando hayas validado en modo manual.

### Vía CLI (n8n self-hosted)

```bash
n8n import:workflow --input=01-lead-magnet-capture.json
n8n import:workflow --input=01b-lead-magnet-nurturing.json
# ... etc
```

### Orden recomendado de import

1. **02b-stripe-webhook-handler** primero (necesario para 02)
2. **03-onboarding** (necesario para 02b lo invoque)
3. **02-cobro-stripe** (apunta a 02b vía evento Stripe)
4. **01-lead-magnet-capture**
5. **01b-lead-magnet-nurturing**
6. **03b-onboarding-checkins**
7. **04-informes-auto** (independiente, puede importar último)

## Credentials que hay que crear en n8n

Antes de importar, ten estas credentials creadas en `Settings → Credentials`:

| Credential ID (en n8n) | Tipo | Variables del entorno | Notas |
|---|---|---|---|
| `notion-marli` | Notion API | `NOTION_INTEGRATION_TOKEN` | Marli interno (DBs Leads + Clientes) |
| `notion-cliente` | Notion API | `NOTION_INTEGRATION_TOKEN_CLIENTE` | Workspace del psicólogo cliente (DBs Pacientes/Sesiones/Tareas) |
| `stripe-restricted-key` | HTTP Header Auth | `Authorization: Bearer ${STRIPE_RESTRICTED_KEY}` | Scope: charges:write, customers:write, checkout:write, subs:write |

Anthropic, Cloudflare Email y los DB IDs Notion van por **variables de entorno** (n8n los lee de `$env`). Configurar en `Settings → Environment Variables` o en el `.env` del contenedor n8n.

## Variables de entorno requeridas

Ver `control-empresa/11-INTEGRACIONES/credenciales.env.example` para el catálogo completo. Mínimo viable Fase 1:

```
NOTION_INTEGRATION_TOKEN=secret_xxxxx
NOTION_INTEGRATION_TOKEN_CLIENTE=secret_xxxxx
NOTION_DB_LEADS_ID=xxxxx
NOTION_DB_CLIENTES_ID=xxxxx
NOTION_DB_SESIONES_ID=xxxxx

ANTHROPIC_API_KEY_INFORMES=sk-ant-xxxxx

STRIPE_RESTRICTED_KEY=rk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PRICE_PACK=price_xxxxx
STRIPE_PRICE_PACK_INSTALL=price_xxxxx
STRIPE_PRICE_MANTENIMIENTO=price_xxxxx
# (otros precios Stripe ver bootstrap)

CLOUDFLARE_EMAIL_API_KEY=xxxxx

N8N_BASE_URL=https://n8n.marli.agency
MARLI_BASE_URL=https://marli.agency
CLIENTE_PSICOLOGO_EMAIL=psicologo@example.com
SLACK_WEBHOOK_ALERTS=https://hooks.slack.com/...
```

## Versionado

- **No editar workflows en producción sin exportar primero** (Cmd+A → Cmd+C → guardar JSON).
- Cada cambio relevante: re-exportar el JSON, commit en este repo, registrar en `control-empresa/09-LOGS/Log-Tecnico.md`.
- Si el cambio es estructural (nodos añadidos/borrados), incrementar `_meta.version` en el JSON.

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| Workflow falla en Notion node con 401 | Token caducado o no compartido con la DB | Reconectar credential en Settings → Credentials → Notion Marli |
| Stripe webhook 400 "invalid signature" | `rawBody=true` desactivado en webhook node | Editar webhook node → Options → activar `Raw Body` |
| Email no entrega (status 200 pero llega a spam) | SPF/DKIM/DMARC no configurados | Ver runbook 04-setup-cloudflare-email.md |
| Claude API 429 (rate limit) | Sin `cache_control` en system prompt | Verificar que el system block tiene `cache_control: ephemeral` |
| Polling Sesiones cada 15min consume mucho | Volumen alto | Migrar a Notion webhook (requiere Enterprise) |

Ver `../runbooks/05-import-workflows.md` para guía paso a paso del primer despliegue.
