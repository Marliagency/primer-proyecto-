# Runbook 02 — Setup n8n

**Tiempo estimado**: 30 min (Cloud) · 2-3h (self-hosted)
**Pre-requisitos**: Notion configurado (runbook 01)
**Output**: n8n corriendo + credentials creadas + URL pública para webhooks

## Decisión: Cloud vs Self-Hosted

| Criterio | n8n Cloud Pro | Self-hosted (Render/Railway/Hetzner) |
|---|---|---|
| Coste | 50€/mes (Pro) | ~10€/mes (VPS) + tiempo setup |
| Setup | 5 min | 2-3h |
| Mantenimiento | 0 | Tú |
| URL pública | Incluida | Necesitas configurar dominio + TLS |
| SLA | 99.9% | Lo que mantengas tú |
| Backups | Automáticos | Tu responsabilidad |
| **Recomendado para Fase 1** | **✅ SÍ** | Cuando tengas > 100 clientes |

**Para Marli Fase 1, usar n8n Cloud Pro.** Migrar a self-hosted en Fase 3 cuando los costes lo justifiquen.

## A) n8n Cloud — Setup

### 1. Crear cuenta

1. Ir a https://n8n.io/cloud → Start Free Trial
2. Después del trial, plan **Pro** (50€/mes, ilimitados workflows + executions)
3. Workspace name: `marli`
4. URL del workspace: `https://marli.app.n8n.cloud` (o el dominio asignado)

### 2. Configurar variables de entorno

En n8n Cloud: `Settings → Variables` → añadir manualmente:

```
NOTION_INTEGRATION_TOKEN=secret_xxx
NOTION_INTEGRATION_TOKEN_CLIENTE=secret_xxx
NOTION_DB_LEADS_ID=xxx
NOTION_DB_CLIENTES_ID=xxx
NOTION_DB_PACIENTES_ID=xxx
NOTION_DB_SESIONES_ID=xxx
NOTION_DB_TAREAS_ID=xxx

ANTHROPIC_API_KEY_INFORMES=sk-ant-xxx
ANTHROPIC_API_KEY_CHATBOT=sk-ant-xxx

STRIPE_RESTRICTED_KEY=rk_live_xxx       # ver runbook 03
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_PACK=price_xxx
STRIPE_PRICE_PACK_INSTALL=price_xxx
STRIPE_PRICE_MANTENIMIENTO=price_xxx
STRIPE_PRICE_CRM=price_xxx
STRIPE_PRICE_INFORMES_BASIC=price_xxx
STRIPE_PRICE_INFORMES_PRO=price_xxx
STRIPE_PRICE_CHATBOT_BASIC=price_xxx
STRIPE_PRICE_CHATBOT_PRO=price_xxx

RESEND_API_KEY=re_xxx                  # ver runbook 04

N8N_BASE_URL=https://marli.app.n8n.cloud
MARLI_BASE_URL=https://marli.agency
CLIENTE_PSICOLOGO_EMAIL=psicologo@example.com
ALERTS_WEBHOOK_URL=https://hooks.slack.com/services/xxx
```

### 3. Crear credentials en n8n

`Settings → Credentials → Create New`:

#### a) `notion-marli` (Notion API)

- Tipo: **Notion API**
- Token: `{{ $env.NOTION_INTEGRATION_TOKEN }}`

#### b) `notion-cliente` (Notion API)

- Tipo: **Notion API**
- Token: `{{ $env.NOTION_INTEGRATION_TOKEN_CLIENTE }}`

#### c) `stripe-restricted-key` (HTTP Header Auth)

- Tipo: **HTTP Header Auth**
- Name: `Authorization`
- Value: `Bearer {{ $env.STRIPE_RESTRICTED_KEY }}`

### 4. Encryption key (CRÍTICO)

`Settings → Encryption Key` → muestra la clave actual.

> ⚠️ **Esta clave NO ROTA NUNCA en producción**. Si se pierde o se cambia, **se pierden todas las credenciales encriptadas almacenadas** y hay que reconfigurarlas todas.

Acción: copiar la clave a un password manager seguro como `N8N_ENCRYPTION_KEY_PROD`. Backup en otro lugar también.

### 5. Importar workflows

Sigue `05-import-workflows.md`.

## B) Self-hosted — Setup (alternativa)

Resumido. Para detalles: https://docs.n8n.io/hosting/

### Quick Docker

```bash
docker volume create n8n_data
docker run -d --restart unless-stopped \
  --name n8n \
  -p 5678:5678 \
  -e N8N_HOST=n8n.tudominio.com \
  -e N8N_PROTOCOL=https \
  -e N8N_PORT=5678 \
  -e WEBHOOK_URL=https://n8n.tudominio.com/ \
  -e N8N_ENCRYPTION_KEY=$(openssl rand -hex 32) \
  -v n8n_data:/home/node/.n8n \
  --env-file .env \
  n8nio/n8n:latest
```

Después: configurar reverse proxy (Caddy/Nginx) con TLS para `n8n.tudominio.com`.

> **Alerta**: el `N8N_ENCRYPTION_KEY` aleatorio del comando arriba debes guardarlo. Si reinicias el contenedor sin él (o con uno distinto), pierdes credenciales.

## Verificación

1. Login en n8n.
2. Crear un workflow temporal con un solo nodo `Manual Trigger → Code` que retorne `{"ok": true}`.
3. Ejecutar manual. Si retorna `{"ok": true}` → n8n está OK.

Test de variables de entorno:

```javascript
// En un Code node
return { 
  notion_token_set: !!$env.NOTION_INTEGRATION_TOKEN,
  notion_db_leads_set: !!$env.NOTION_DB_LEADS_ID,
  anthropic_set: !!$env.ANTHROPIC_API_KEY_INFORMES
};
```

Todos `true` → variables OK.

## Próximo paso

→ `03-setup-stripe.md`
