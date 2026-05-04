# Runbook 05 — Import Workflows en n8n

**Tiempo estimado**: 30 min para los 7 workflows de Fase 1
**Pre-requisitos**: runbooks 01-04 completados
**Output**: 7 workflows importados, configurados y listos para activar

## Orden de import

Importar en este orden exacto (algunos dependen de otros):

1. `02b-stripe-webhook-handler.json`  ← Stripe lo invoca
2. `03-onboarding.json`               ← 02b lo invoca
3. `02-cobro-stripe.json`             ← landing/web lo invoca
4. `01-lead-magnet-capture.json`      ← landing del lead magnet lo invoca
5. `01b-lead-magnet-nurturing.json`   ← cron, sin dependencias externas
6. `03b-onboarding-checkins.json`     ← cron
7. `04-informes-auto.json`            ← cron, depende del cliente psicólogo

## Pasos por workflow (proceso común)

Para cada `.json`:

### 1. Import

n8n UI → menú lateral **Workflows** → botón **+ Add workflow** (esquina sup. dcha.) → **Import from File** → seleccionar el `.json`.

### 2. Asignar credentials

Tras el import, los nodos que requieren credentials estarán marcados en **rojo**. Para cada uno:

- **Notion nodes** → Credential dropdown → seleccionar `notion-marli` o `notion-cliente` según indique el `_meta` del workflow.
- **HTTP Request nodes con Stripe** → seleccionar `stripe-restricted-key`.
- **HTTP Request nodes con Resend** → no requieren credential (autenticación por header desde `$env.RESEND_API_KEY`).
- **HTTP Request nodes con Anthropic** → no requieren credential (header desde `$env`).

### 3. Verificar variables de entorno

Botón "Execute Workflow" en modo **manual / test**. Si una variable falta, n8n da error claro: `Cannot read property 'XXX' of undefined`.

Comprobar todas las `$env.XXX` referencias estén configuradas según runbook 02.

### 4. Activar (al final)

Esquina sup. dcha. del workflow: toggle **Inactive → Active**.

> **No actives todos a la vez**. Activa uno, valida con un caso real, sigue con el siguiente.

## Validación end-to-end por workflow

### 02b — Stripe webhook handler

1. Activar el workflow.
2. En Stripe dashboard → **Developers → Webhooks → Send test webhook** → seleccionar evento `checkout.session.completed` → Send.
3. En n8n → ver execution log. Esperado: ✅ verde, sin errores.

### 03 — Onboarding

1. Activar.
2. Test manual con curl:

```bash
curl -X POST https://marli.app.n8n.cloud/webhook/marli-onboarding \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","nombre":"Test","producto":"pack","con_instalacion":false,"stripe_customer_id":"cus_test"}'
```

3. Verificar: email bienvenida llega + cliente actualizado en Notion.

### 02 — Cobro

1. Activar.
2. Test:

```bash
curl -X POST https://marli.app.n8n.cloud/webhook/marli-checkout \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","producto":"pack","con_instalacion":true}'
```

3. Esperado: respuesta JSON con `checkout_url`. Abrir esa URL → debe ser página Stripe Checkout con el producto correcto.

### 01 — Lead magnet capture

1. Activar.
2. Test:

```bash
curl -X POST https://marli.app.n8n.cloud/webhook/marli-lead-magnet \
  -H "Content-Type: application/json" \
  -d '{"email":"test+lead@example.com","nombre":"Test Lead","fuente":"lead-magnet-ig","utm_campaign":"test"}'
```

3. Esperado: lead creado en Notion (DB Leads, status=capturado), email de entrega del Kit recibido.

### 01b — Lead magnet nurturing

1. **No actives** hasta tener al menos 1-2 leads de prueba en Notion (con Fecha Captura > 1 día atrás).
2. Activar.
3. Espera al cron diario (9:00) o ejecuta manualmente con "Execute Workflow".
4. Verificar log: que envíe el email correcto según día desde captura.

### 03b — Onboarding check-ins

1. Solo activar después de tener clientes reales con compras > 7 días.
2. Verificación más sencilla: forzar fecha en un cliente test (D-7 = hoy - 7) y ejecutar manual.

### 04 — Informes auto

1. Solo activar cuando tengas el primer cliente psicólogo real.
2. Test: crear sesión en su Notion con status `cerrada`. Esperar < 15 min. Verificar: campo "Resumen IA" rellenado + email al psicólogo.

## Troubleshooting general

| Síntoma | Causa | Fix |
|---|---|---|
| Webhook 404 | URL pública no resuelve | Verificar que el workflow está **Active**, no solo guardado |
| `Notion API 401` en runtime | Token caducado o no compartido con la DB | Revisar credential + connections en Notion |
| Email no llega | SPF/DKIM/DMARC fallando | Test con `mail-tester.com` para diagnóstico |
| `Code node error: $('NodeName').item is undefined` | Referencia a nodo cuyo output todavía no existe | Revisar conexiones + orden de ejecución |
| Workflow se ejecuta 100% pero no actualiza Notion | Property name con typo | Notion property names son **case-sensitive** y los `|tipo` también |

## Activación gradual (recomendado)

**Día 1**: 02b + 03 + 02 + test E2E con tu propia tarjeta + 1€.
**Día 2**: 01 + 01b → captar 5 leads de prueba (amigos, familiares).
**Día 3-4**: 03b activado, observar 2-3 días sin clientes reales (no hace daño).
**Día 5+**: 04 activado cuando llegue el primer cliente psicólogo real.

## Próximo paso

→ `06-pre-launch-checklist.md`
