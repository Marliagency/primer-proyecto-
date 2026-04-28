# Runbook 03 — Setup Stripe

**Tiempo estimado**: 45 min (incluyendo verificación de cuenta)
**Pre-requisitos**: cuenta Stripe activa, datos fiscales de Marli (autónomo o SL)
**Output**: 8 productos creados + restricted key + webhook secret

## 1. Activar cuenta Stripe

1. Crear cuenta en https://dashboard.stripe.com/register
2. Activar cuenta con datos fiscales reales (España: NIF, IBAN, dirección)
3. Activar **modo Live** (no solo Test) — sin esto no se cobra de verdad

## 2. Crear los productos

`Products → + Add Product`. Crear 8 productos:

### 2.1 — One-time

| Nombre | Precio | Tipo | Notas |
|---|---|---|---|
| Marli — CRM | 27€ | One time | SKU `MARLI-CRM` |
| Marli — Informes Basic | 199€ | One time | SKU `MARLI-INFORMES-BASIC` |
| Marli — Informes Pro | 449€ | One time | SKU `MARLI-INFORMES-PRO` |
| Marli — Chatbot Li Basic | 399€ | One time | SKU `MARLI-CHATBOT-BASIC` |
| Marli — Chatbot Li Pro | 999€ | One time | SKU `MARLI-CHATBOT-PRO` |
| Marli — Pack Premium | 498€ | One time | SKU `MARLI-PACK` (HERO) |
| Marli — Pack Premium + Instalación | 1.349€ | One time | SKU `MARLI-PACK-INSTALL` |

### 2.2 — Suscripción

| Nombre | Precio | Tipo | Notas |
|---|---|---|---|
| Marli — Mantenimiento | 300€/mes | Recurring · monthly | SKU `MARLI-MANTENIMIENTO` |

Para cada producto, una vez creado, copia el **Price ID** (empieza por `price_`) y guárdalo en `.env`:

```
STRIPE_PRICE_CRM=price_xxx
STRIPE_PRICE_INFORMES_BASIC=price_xxx
STRIPE_PRICE_INFORMES_PRO=price_xxx
STRIPE_PRICE_CHATBOT_BASIC=price_xxx
STRIPE_PRICE_CHATBOT_PRO=price_xxx
STRIPE_PRICE_PACK=price_xxx
STRIPE_PRICE_PACK_INSTALL=price_xxx
STRIPE_PRICE_MANTENIMIENTO=price_xxx
```

## 3. Crear Restricted API Key (mínimo privilegio)

> **Importante**: NO uses la "Secret key" del dashboard. Esa tiene permisos totales y si se filtra, controlas toda tu cuenta. Usa una **Restricted Key** con scopes mínimos.

1. `Developers → API keys → + Create restricted key`
2. Name: `n8n-marli-prod`
3. Permisos:
   - Charges: **Write**
   - Customers: **Write**
   - Checkout Sessions: **Write**
   - Subscriptions: **Write**
   - Invoices: **Read**
   - PaymentIntents: **Read**
   - **Resto**: None
4. Create → copiar key (empieza por `rk_live_xxx`).
5. Guardar en `.env` como `STRIPE_RESTRICTED_KEY=rk_live_xxx`

> **Nunca** guardes esta key en el código fuente. Solo en `.env` (git-ignored) o en n8n credentials store.

## 4. Configurar Webhook

n8n necesita recibir eventos de Stripe (`checkout.session.completed`, `invoice.payment_failed`, etc.).

1. `Developers → Webhooks → + Add endpoint`
2. Endpoint URL: `${N8N_BASE_URL}/webhook/stripe-webhook`
   - Si n8n Cloud: `https://marli.app.n8n.cloud/webhook/stripe-webhook`
   - Si self-hosted: `https://n8n.tudominio.com/webhook/stripe-webhook`
3. Events to send (suscribir solo a los que usamos):
   - ✅ `checkout.session.completed`
   - ✅ `invoice.payment_failed`
   - ✅ `customer.subscription.deleted`
   - ✅ `customer.subscription.created`
4. Add endpoint → copia el **Signing secret** (empieza por `whsec_`).
5. Guardar en `.env` como `STRIPE_WEBHOOK_SECRET=whsec_xxx`.

## 5. Configurar URLs de éxito / cancelación

Las URLs que el workflow `02-cobro-stripe` pasa al checkout son:

- Success: `${MARLI_BASE_URL}/gracias?session_id={CHECKOUT_SESSION_ID}`
- Cancel: `${MARLI_BASE_URL}/checkout-cancelado`

Estas páginas deben existir en `marli.agency`. En Fase 1 pueden ser páginas estáticas simples:

**`/gracias`**: agradecimiento + "te enviamos email con accesos en breve" + Calendly opcional para instalación asistida.

**`/checkout-cancelado`**: "no has completado el pago — ¿necesitas ayuda?" + email de soporte + posibilidad de reanudar.

## 6. Test end-to-end

### En modo Test (no real)

1. En Stripe dashboard → top derecha → toggle a **Test mode**.
2. Crear los mismos productos en Test mode (puedes copiar precios). Vas a tener distintos `price_` IDs en test.
3. Activar workflow `02-cobro-stripe` en n8n (con tus vars apuntando a test).
4. Llamar al webhook desde curl:

```bash
curl -X POST https://marli.app.n8n.cloud/webhook/marli-checkout \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","producto":"pack","con_instalacion":false}'
```

5. Esperado: response con `checkout_url`. Abrirlo en navegador, pagar con tarjeta test `4242 4242 4242 4242` (cualquier fecha futura, cualquier CVC).
6. Verificar en Notion: cliente creado en DB Clientes con status `onboarding`.
7. Verificar en email: bienvenida llega.

### Pasar a Live

Cuando el test funciona, repetir con vars apuntando a producción (Live keys, Live price IDs, Live webhook). Test final con tu propia tarjeta y un cargo de 1€ que luego refunds.

## Compliance — checklist crítico

- ✅ **PCI-DSS**: usando Stripe Checkout Session (hosted page), Marli **nunca ve** datos de tarjeta. SAQ-A nivel.
- ✅ **3DS**: Stripe lo activa automáticamente para Europa cuando aplica.
- ✅ **IVA**: configurar Tax automático en Stripe → Tax settings (España: 21% para servicios, 10% reducido si aplica para el sector).
- ✅ **Facturación**: activar **Stripe Invoicing** para emisión automática de facturas con datos fiscales del cliente.
- ✅ **GDPR**: Stripe es responsable del procesamiento de pago, Marli es responsable del CRM. Avisar en política privacidad.

## Costes Stripe

- Comisión: 1.5% + 0.25€ por pago europeo (intra-EEE)
- Sin coste fijo mensual en plan Standard
- Reembolsos: gratis (la comisión inicial NO se devuelve)

Estimación: con 5 ventas Pack 498€ → ingreso bruto 2.490€, comisión Stripe ~38€ → neto 2.452€.

## Próximo paso

→ `04-setup-cloudflare-email.md`
