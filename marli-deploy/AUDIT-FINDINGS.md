# Auditoría de código Marli Agency — Findings

**Fecha**: 2026-05-04
**Alcance**: validación SINTÁCTICA + REVISIÓN MANUAL del código del repo (no del sistema desplegado, al que aún no tengo acceso).
**Branch**: `claude/autonomous-agent-skills-220Fs`

---

## Estado: Fase A APLICADA ✓ (commit pendiente — ver al final)

**Aplicado en este branch**:
- ✅ S1.1 — Migración MailChannels → Resend en los 5 workflows
- ✅ S1.2 — Churn ahora se registra en Notion (rama `customer.subscription.deleted` actualizada)
- ✅ S1.3 — Idempotencia en webhook Stripe (chequeo Stripe Session ID antes de crear cliente)
- ✅ S1.4 — `crypto.timingSafeEqual` en verificación de firma
- ✅ S1.5 — `rawBody` normalizado a string UTF-8 antes de HMAC
- ✅ S1.6 — Filtro `Resumen IA is empty` en informes-auto
- ✅ S2.1 — IF antes de update Notion lead (skip si lead_id null)
- ✅ S2.2 — Quitado `date: ""` que rechazaba la API Notion
- ✅ S2.3 — Reordenado: Notion update primero, email después (03-onboarding)
- ✅ S2.4 — `days >= 7` en cron checkins (no se pierde si cron falla un día)
- ✅ S2.5 — Una sola env var `ALERTS_WEBHOOK_URL` en vez de `SLACK || TELEGRAM`
- ✅ Schema Clientes actualizado con `Stripe Session ID` (rich_text) y `Motivo Churn` (rich_text)
- ✅ Runbook 04 reescrito de MailChannels → Resend
- ✅ README + runbook 02/05/06 actualizados con `RESEND_API_KEY`

**Pendiente (Fase B + C)**: S1.7 anti-bot lead capture, S1.8 multi-tenant Notion, S2.6 nombre founder, S2.7 Notion API version, todos los S3.

---

## Resumen ejecutivo

El repo contiene **código real ejecutable** (7 workflows n8n, 1 skill Notion CRM, 6 scrapers de lead-gen, 5 schemas Notion) más **plans on paper** (~150 markdowns).

**Toda la sintaxis pasa** (JSON parse + Node syntax check). Pero la auditoría manual encontró **8 bugs S1 (revenue-blocker)**, **7 bugs S2 (functional)** y **8 bugs S3 (mejoras)**.

**El más grave** y de fix obligado antes del primer cliente real: el email delivery (MailChannels) está roto en los 5 workflows que envían correo. Si activas el sistema hoy, **el cliente paga y no recibe NADA**.

---

## S1 — CRÍTICOS (bloquean revenue o exponen datos)

### S1.1 — Email delivery roto en TODOS los workflows

**Archivos afectados**:
- `marli-deploy/n8n-workflows/01-lead-magnet-capture.json:60-78`
- `marli-deploy/n8n-workflows/01b-lead-magnet-nurturing.json:84-102`
- `marli-deploy/n8n-workflows/03-onboarding.json:30-49`
- `marli-deploy/n8n-workflows/03b-onboarding-checkins.json:84-103, 124-143`
- `marli-deploy/n8n-workflows/04-informes-auto.json:104-124`

**Problema**: todos los workflows envían email a `https://api.mailchannels.net/tx/v1/send` con auth `Bearer ${CLOUDFLARE_EMAIL_API_KEY}`. **MailChannels cerró su servicio gratuito para Cloudflare Workers en 2024**. Hoy requiere su propia API key + dominio verificado por suscripción de pago. Además el auth header no es `Bearer` — usan `X-Api-Key`.

**Impacto**: cliente paga → onboarding email no sale → cliente piensa que la compra falló → pide reembolso. Esto sólo, mata el negocio en su primer intento.

**Fix recomendado** (orden de simplicidad):
1. **Resend** (https://resend.com) — free tier 3.000 emails/mes, API trivial, soporta dominios custom
2. **Mailgun** — más capacidad pero más burocracia
3. **AWS SES** — más barato a escala, configuración más compleja

Decisión: ir con **Resend**. Replace `https://api.mailchannels.net/tx/v1/send` por `https://api.resend.com/emails`, cambiar headers a `Authorization: Bearer ${RESEND_API_KEY}` (sí Bearer, pero key de Resend), ajustar shape del body (Resend usa `from`, `to`, `subject`, `html` plano, no `personalizations`).

---

### S1.2 — Webhook Stripe: churn nunca se registra en Notion

**Archivo**: `marli-deploy/n8n-workflows/02b-stripe-webhook-handler.json:160-168, 213-215`

**Problema**: la rama `customer.subscription.deleted` extrae datos del evento pero la conexión va `Extraer churn → Respond 200` directamente. **No escribe en Notion**.

**Impacto**:
- Clientes que cancelan siguen apareciendo como `activo` en el CRM
- MRR del dashboard queda inflado
- Workflow `03b-onboarding-checkins` envía testimonio D+30 a clientes que se fueron (mortifying)
- No se dispara workflow de win-back

**Fix**: añadir nodo "Notion · Marcar churn" después de "Extraer churn", igual que el patrón de `Notion · Crear cliente`.

---

### S1.3 — Webhook Stripe: sin idempotencia → cliente duplicado

**Archivo**: `marli-deploy/n8n-workflows/02b-stripe-webhook-handler.json` (global)

**Problema**: Stripe REENVÍA cada evento hasta recibir 200 OK. Si Notion tarda > 3s en responder o n8n hace timeout, Stripe reintentará. El handler **no chequea `event_id` ya procesado**, así que crea el cliente 2-3 veces en Notion y dispara onboarding 2-3 veces.

**Impacto**: cliente recibe 2-3 emails de bienvenida y aparece duplicado en CRM. Confusión + reembolso.

**Fix**: antes de procesar, query Notion DB Clientes por `Stripe Session ID|rich_text equals event.data.object.id`. Si ya existe, respond 200 sin re-procesar.

---

### S1.4 — Webhook Stripe: timing-attack en verificación de firma

**Archivo**: `marli-deploy/n8n-workflows/02b-stripe-webhook-handler.json:20`

**Problema**: `if (expected !== parts.v1)` usa comparación de strings naive. Stripe recomienda `crypto.timingSafeEqual()` para evitar leak por timing.

**Severidad**: teórica pero es práctica estándar. La doc oficial de Stripe lo dice explícitamente.

**Fix**:
```js
const expectedBuf = Buffer.from(expected);
const receivedBuf = Buffer.from(parts.v1);
if (expectedBuf.length !== receivedBuf.length || !crypto.timingSafeEqual(expectedBuf, receivedBuf)) {
  throw new Error('Firma Stripe inválida');
}
```

---

### S1.5 — Webhook Stripe: rawBody como Buffer rompe la firma

**Archivo**: `marli-deploy/n8n-workflows/02b-stripe-webhook-handler.json:20`

**Problema**: con `rawBody: true`, n8n puede pasar `$input.item.json.body` como Buffer (depende de versión). Si haces `${parts.t}.${rawBody}` → toString implícito que puede romper bytes UTF-8 si el body tiene caracteres acentuados → la firma **siempre falla en silencio**.

**Impacto**: si esto pasa en prod, ningún webhook procesa. El test manual del dashboard Stripe pasa (porque n8n a veces decodifica diferente), pero los webhooks reales fallan.

**Fix**: forzar string al recoger:
```js
const rawBody = typeof $input.item.json.body === 'string'
  ? $input.item.json.body
  : Buffer.isBuffer($input.item.json.body)
    ? $input.item.json.body.toString('utf8')
    : JSON.stringify($input.item.json.body);
```

---

### S1.6 — Workflow informes: sin filtro de "ya procesadas" → factura Claude en bucle

**Archivo**: `marli-deploy/n8n-workflows/04-informes-auto.json:24-34`

**Problema**: cron cada 15min pilla TODAS las sesiones con `Status='cerrada'`. Si Claude API timeout, parse error o cualquier paso intermedio falla, la sesión sigue en `cerrada` y se reprocesa cada 15min → coste Claude se acumula.

Además, primer run sobre histórico procesará 100+ sesiones simultáneamente → rate limit Anthropic.

**Fix**:
```json
"filters": {
  "conditions": [
    { "key": "Status|select", "condition": "equals", "selectValue": "cerrada" },
    { "key": "Resumen IA|rich_text", "condition": "is_empty" }
  ]
}
```
Y batch en lotes de 5-10 por run, no todas a la vez.

---

### S1.7 — Webhook lead-magnet: sin rate limit ni anti-bot

**Archivo**: `marli-deploy/n8n-workflows/01-lead-magnet-capture.json:5-17`

**Problema**: endpoint público sin rate limit, sin captcha, sin validación de referer. Un bot puede:
- Crear 10.000 leads basura en Notion (cuota de páginas Notion = 100k/mes en plan Plus, fácilmente saturable)
- Disparar 10.000 emails desde tu dominio → blacklist instantánea de SPF/DKIM
- Coste Notion API: 10k requests gratis pero te tumban el ratio

**Fix**: añadir Cloudflare Turnstile en el form de la landing + nodo de validación al inicio del workflow + rate limit por IP.

---

### S1.8 — DB Pacientes: marcada `is_product_template` pero el script CRM la usa con `NOTION_INTEGRATION_TOKEN_CLIENTE`

**Archivo**: `marli-deploy/notion-schemas/03-pacientes.json:8` + `notion-crm-manager.mjs:208`

**Problema**: el schema de Pacientes dice que vive en el Notion del cliente psicólogo (`owner_internal: "cliente-psicologo (NO marli)"`). Pero el script tiene `NOTION_INTEGRATION_TOKEN_CLIENTE` como segunda integración.

**Riesgo RGPD**: si Marli comparte una sola integration con todos los clientes, cualquier psicólogo podría eventualmente ver datos de pacientes de otro psicólogo (vía bug en sharing). El playbook-incidente.md ya describe este escenario como "S1 — Brecha datos" precisamente por esto.

**Fix arquitectónico** (no es 1 línea — es decisión de diseño): cada cliente psicólogo necesita SU PROPIA integration token, no compartir una global. Esto exige rediseñar el setup automation.

---

## S2 — ALTO (functional, no bloquean ingresos pero hacen que el sistema falle silencioso)

### S2.1 — `pageId` puede ser null en update Notion lead

**Archivo**: `marli-deploy/n8n-workflows/02-cobro-stripe.json:61`
**Problema**: si compra directa sin lead previo, `lead_id=null` → API error.
**Fix**: `continueOnFail` ya lo silencia, pero mejor: añadir IF antes para saltar si null.

---

### S2.2 — Empty string en campo date Notion

**Archivo**: `marli-deploy/n8n-workflows/03-onboarding.json:86`
**Problema**: `{ "key": "Fecha Onboarding Completado|date", "date": "" }` → Notion rechaza `""` en date type → workflow falla.
**Fix**: omitir el campo o pasar `null`.

---

### S2.3 — Email enviado antes de update Notion

**Archivo**: `marli-deploy/n8n-workflows/03-onboarding.json` (orden de nodos)
**Problema**: si email falla, status no se actualiza pero el flujo respondió 200.
**Fix**: update Notion primero, email después.

---

### S2.4 — Cron check-ins falla un día = cliente pierde email para siempre

**Archivo**: `marli-deploy/n8n-workflows/03b-onboarding-checkins.json:42-50`
**Problema**: `if (days === 7 && ...)` exacto. Si el cron no corre ese día (server reboot, error), `days=8` mañana → no envía nunca.
**Fix**: `if (days >= 7 && !activacionD7)` y verificar que el flag `activacionD7` se setea para evitar duplicados.

---

### S2.5 — Switch templating con `||` no funciona

**Archivo**: `marli-deploy/n8n-workflows/02b-stripe-webhook-handler.json:148`
**Problema**: `={{ $env.SLACK_WEBHOOK_ALERTS || $env.TELEGRAM_BOT_URL }}` — n8n templating no resuelve `||` a runtime; la URL queda como literal con el operador.
**Fix**: nodo IF antes que decida la URL, o set una sola env var `ALERTS_WEBHOOK_URL`.

---

### S2.6 — Inconsistencia de nombre del founder

**Problema**:
- Workflows firman como "Diego (Marli)" (`01-lead-magnet-capture.json:71`, `03-onboarding.json:41`, `03b:95,135`)
- Playbooks de `marli-ventas/06-async-closing/` y otros firman como "Pablo"

**Impacto**: si cambian de nombre, el cliente desconfía. Si dejan ambos, cuestión de credibilidad.
**Fix**: decidir nombre real y `replace_all`.

---

### S2.7 — Notion API version 2022-06-28 obsoleta

**Archivo**: `notion-crm-manager.mjs:18`
**Problema**: la versión actual de la Notion API es `2025-09-03`. La v2022-06-28 funciona pero pierdes features (data sources, query mejorada). Más importante: la Notion API ha tenido breaking changes silentes en estructura de filter para algunas property types.
**Fix**: probar migración a `2025-09-03` cuando tengamos tests.

---

## S3 — MEDIO (mejoras necesarias antes de escalar)

### S3.1 — Bootstrap Notion sin idempotencia
`bootstrap.mjs` corre dos veces → DBs duplicadas. Añadir check antes de crear.

### S3.2 — `calcular_mrr_total` no excluye churn
Filtra `Status in ['activo', 'mantenimiento']` correctamente, pero si un cliente churn no se actualizó (S1.2), entra en el cálculo. Cascade del S1.2.

### S3.3 — Modelo Claude `claude-opus-4-7` sin fecha
`04-informes-auto.json:64` — el ID exacto debería ser `claude-opus-4-7-20250414` o un alias estable confirmado. Verificar contra docs Anthropic.

### S3.4 — `informes@marli.agency` como from-address
`04-informes-auto.json:116` usa un alias distinto de `hola@`. Necesita SPF/DKIM/DMARC configurados para AMBOS subdominios o el email irá a spam.

### S3.5 — `verify-emails.mjs` puerto 25 saliente
Muchos ISPs y cloud providers (AWS, GCP, Hetzner free tier) bloquean port 25 saliente. Si corres el script en local sin VPN o en cloud restringido, todos los probes fallan con `socket-error`. Documentar: usar VPS limpio (Hetzner pagado, DigitalOcean) o desactivar SMTP probe.

### S3.6 — `verify-emails.mjs` riesgo de blacklist
SMTP probe masivo (10k+ emails) desde una IP residencial te puede meter en SpamHaus PBL. Si tu dominio `marli.agency` envía MAIL FROM en el probe, también arrastra reputación del dominio.

### S3.7 — Backoff sin Retry-After en Notion
`notion-crm-manager.mjs:34-45` usa exponential backoff fijo. Notion devuelve `Retry-After` en 429; deberíamos respetarlo.

### S3.8 — Scrapers COP sin manejo de captcha visible
`cop-colegiados.mjs` admite en comentarios que algunas web tienen captcha, pero no veo el fallback en el código. Si el captcha aparece, scrape falla silencioso → 0 leads. Logging insuficiente.

---

## Lo que NO he podido validar (necesito accesos)

- ¿La web de marli.agency está desplegada? ¿Qué tecnología?
- ¿Qué chatbot está vivo? El repo solo tiene prompts, no integración.
- ¿n8n está self-hosted o cloud? ¿En qué dominio?
- ¿Stripe tiene los price IDs que el código asume? (`price_pack_498`, `price_mantenimiento_300mo`, etc.)
- ¿Los DNS de SPF/DKIM/DMARC están configurados para `marli.agency`?
- ¿Qué sistema de emails usa José hoy? ¿Hay leads ya capturados que se perderían si migramos?
- ¿Hay clientes pagantes ya? Si sí, NO podemos romper nada en su flujo.

---

## Plan de fix recomendado (en orden)

### Fase A — Pre-launch (antes del primer cliente real)
1. **S1.1** — Migrar email delivery a Resend (o equivalente). Sin esto, **NADA funciona**. ETA: 2h.
2. **S1.4 + S1.5** — Endurecer Stripe webhook (timing-safe + rawBody handling). ETA: 30min.
3. **S1.3** — Idempotencia en webhook Stripe. ETA: 30min.
4. **S1.2** — Registrar churn en Notion. ETA: 15min.
5. **S2.1, S2.2, S2.3, S2.4, S2.5, S2.6** — Fixes pequeños. ETA combinada: 1h.

**Total Fase A: ~4h trabajo. Sistema listo para primera venta.**

### Fase B — Pre-escalado (antes del 5º cliente o lanzamiento Meta Ads)
6. **S1.6** — Idempotencia en workflow informes (filtro ya-procesadas).
7. **S1.7** — Anti-bot en lead-magnet endpoint.
8. **S1.8** — Decidir arquitectura multi-tenant Notion (integration por cliente vs sharing aislado).
9. **S3.5, S3.6** — Setup VPS limpio para verify-emails antes de scrape masivo.

### Fase C — Hardening (mes 2-3)
10. Migrar Notion API version
11. Tests de integración para workflows críticos (mock Stripe webhook events)
12. Monitoring (Sentry, BetterUptime) para n8n y endpoints

---

## ¿Y la fase de validación viva?

Cuando tengamos accesos al sistema desplegado, hay que ejecutar:

1. **End-to-end test de funnel**: comprar como cliente real con tarjeta de prueba → verificar email entrega, Notion update, onboarding email, Stripe customer creado correctamente.
2. **Test de webhook bajo presión**: Stripe CLI `stripe trigger checkout.session.completed` repetido 10 veces → verificar idempotencia.
3. **Test de chargeback**: simular dispute → verificar que el cliente queda en estado correcto.
4. **DNS audit**: validar SPF/DKIM/DMARC con `dig TXT marli.agency` y `mail-tester.com`.
5. **Pixel + analytics**: verificar Meta Pixel dispara `Lead`, `Purchase` correctamente.
6. **Chatbot inventory**: identificar qué herramienta es y auditar prompts contra crisis-detection (ya hay eval-suite.jsonl en `marli-deploy/skills/system-prompt-li/`).

---

**Próximo paso**: usuario debe enviar accesos (ver lista en chat). Mientras tanto, puedo arrancar Fase A si me da permiso para modificar los workflows con los fixes de arriba.
