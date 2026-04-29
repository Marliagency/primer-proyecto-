# Stripe Payment Links — setup del cierre asíncrono

Stripe Payment Links son **URLs de pago directo**. Sin codear nada. Click → Stripe checkout → pago → redirect a tu /gracias-compra. Perfecto para cierre sin call.

## Pre-requisitos

- Cuenta Stripe en modo **Live** (no Test)
- Productos creados (ver `marli-deploy/runbooks/03-setup-stripe.md`)
- KYC Stripe completo (cuenta verificada)

---

## Crear Payment Link — Pack Premium 498€

### En Stripe Dashboard

1. **Products → Marli — Pack Premium** (ya creado)
2. Click en el producto → tab **Payment links** → **Create link**

### Configuración del link

| Setting | Valor |
|---|---|
| Type | One-time payment |
| Quantity | 1 (no ajustable) |
| Price | 498€ |
| Tax behavior | Inclusive (Spain 21% IVA) |
| Tax automatic | ON |
| Invoicing | ON (genera factura) |
| Allow promo codes | ON |
| Phone number collection | Optional |
| Email collection | Required |
| Address collection | Billing address (España) |
| **After payment** | Redirect: `https://marli.agency/gracias-compra?session_id={CHECKOUT_SESSION_ID}` |
| Custom message | "¡Gracias! Recibirás email con setup en 5 min." |
| Limit purchases | OFF (sin límite, es producto digital ilimitado) |

### Custom fields (para personalizar onboarding)

Añadir campos custom en checkout:

```
Field 1:
  Type: Text
  Label: "Nombre de tu consulta (para personalizar plantillas)"
  Required: false

Field 2:
  Type: Dropdown
  Label: "Especialidad principal"
  Options: 
    - Clínica adulta
    - Clínica infantil/adolescente
    - Neuropsicología
    - Coaching/Terapia online
    - Otra
  Required: true

Field 3:
  Type: Text
  Label: "¿Cómo nos conociste? (opcional)"
  Required: false
```

Esto te da datos útiles para onboarding sin requerir call.

### Save → Copia URL

```
Resultado: https://buy.stripe.com/abc123_pack_premium
```

Guardar en variable `STRIPE_PAYMENT_LINK_PACK` en n8n.

---

## Crear Payment Link — Pack + Instalación 1.349€

Mismo proceso pero:

| Setting | Valor |
|---|---|
| Price | 1349€ |
| After payment | Redirect a `/gracias-compra-install?session_id={CHECKOUT_SESSION_ID}` |

Custom fields adicionales:

```
Field 4:
  Type: Date
  Label: "Fecha aproximada para empezar setup"
  Required: false

Field 5:
  Type: Phone
  Label: "Teléfono para coordinación instalación"
  Required: true
```

URL: `https://buy.stripe.com/xyz_pack_install` → guardar en `STRIPE_PAYMENT_LINK_PACK_INSTALL`.

---

## Crear Payment Link — Mantenimiento mensual 300€

Para upsell post-Pack:

| Setting | Valor |
|---|---|
| Type | Recurring (subscription) |
| Price | 300€/month |
| Trial period | 0 days (no trial gratuito, ya tienen Pack) |
| Allow customer to cancel from portal | ON |
| Cancel subscription at end of period | OFF (cancela inmediato si solicita) |

URL: `https://buy.stripe.com/aaa_mantenimiento` → guardar en `STRIPE_PAYMENT_LINK_MANTENIMIENTO`.

---

## Webhook handler (ya construido)

El workflow `02b-stripe-webhook-handler.json` (en `marli-deploy/n8n-workflows/`) procesa:

- `checkout.session.completed` → crear cliente en Notion + email bienvenida
- `invoice.payment_failed` → alerta + email cliente
- `customer.subscription.deleted` → marcar churn

Endpoint webhook: `${N8N_BASE_URL}/webhook/stripe-webhook`

Configurar en Stripe → Developers → Webhooks → Add endpoint con eventos arriba.

---

## URLs finales (para meter en landings y emails)

```
https://buy.stripe.com/xxx_pack_premium       498€ Pack Premium
https://buy.stripe.com/xxx_pack_install       1.349€ Pack + Instalación  
https://buy.stripe.com/xxx_mantenimiento      300€/mes Mantenimiento
https://buy.stripe.com/xxx_chatbot_basic      399€ Chatbot Li Basic
https://buy.stripe.com/xxx_chatbot_pro        999€ Chatbot Li Pro
https://buy.stripe.com/xxx_informes_basic     199€ Informes Basic
https://buy.stripe.com/xxx_informes_pro       449€ Informes Pro
https://buy.stripe.com/xxx_crm                27€ CRM standalone
```

---

## Checkout customizado (branding)

Stripe Checkout permite personalizar:

1. Stripe Dashboard → **Settings → Branding**
2. Subir logo: 256×256px PNG con fondo transparente
3. Color primario: hex de tu marca (#0F172A o el que uses)
4. Color secundario: acento (#6366F1)
5. Custom domain: si quieres `pago.marli.agency` en lugar de `buy.stripe.com` → setup DNS CNAME (5 min) — añade trust pero no es crítico

---

## Reducir abandono de carrito

Stripe envía emails automáticos de "carrito abandonado":

1. **Settings → Customer emails**
2. Activar:
   - ✅ Successful payments (siempre)
   - ✅ Refunds (siempre)
   - ✅ Failed payments
   - ✅ Reminder emails (recuperación carrito abandonado)

Esto recupera 5-10% de los abandonan checkout sin completar.

---

## Probar el flujo completo

### Test mode primero

1. Toggle Stripe a **Test mode** (top-right)
2. Replicar payment links en test
3. Comprar con tarjeta `4242 4242 4242 4242`, fecha futura, CVC 123
4. Verificar:
   - Email de Stripe llega al comprador
   - Webhook llega a n8n y procesa
   - Cliente creado en Notion
   - Email bienvenida llega
   - Redirect a /gracias-compra funciona
   - Pixel Purchase event dispara

### Pasar a Live

5. Toggle a **Live mode**
6. Crear los mismos productos en Live (otros price IDs)
7. Crear payment links Live (otras URLs)
8. Test final con tu propia tarjeta y un pago de 1€ que luego refunds

---

## Tips operativos

### Cuando alguien compra

- Email automático de Stripe llega (factura)
- Email custom tuyo llega (bienvenida con vídeo setup)
- Cliente aparece en Notion DB Clientes con status `onboarding`
- Dashboard Operativo lo ve

### Cuando alguien pide reembolso

1. Stripe Dashboard → Customer → Refund → 100%
2. Webhook actualiza Notion automáticamente
3. Email a Pablo "atención reembolso procesado"

### Cuando subscripción Mantenimiento falla pago

1. Stripe reintenta automáticamente (smart retries)
2. Email a cliente "actualiza tarjeta"
3. Si falla 3 reintentos en 14 días → suscripción cancela
4. Webhook `customer.subscription.deleted` dispara en n8n → marca cliente `churn` y manda email "podemos ayudar"

---

## Coste Stripe (recordatorio)

- Pago europeo (intra-EEE): 1.5% + 0.25€
- Subscripción: 1.5% + 0.25€ por cada cobro mensual
- Reembolsos: gratis (la comisión inicial NO se devuelve)

Pack Premium 498€ → comisión 7.72€ → neto **490.28€**.
Mantenimiento 300€/mes → comisión 4.75€/mes → neto **295.25€/mes**.

---

## Por qué esto es CLAVE para tu pivot a "vender"

Pediste **evitar las videollamadas**. Stripe Payment Links te lo da:

1. Lead lee email/landing → click "Comprar"
2. Stripe checkout → paga
3. Tu Notion + email + onboarding se disparan automáticos
4. Cliente recibe acceso en 5 min
5. **0 calls necesarias** para la transacción

Las calls quedan SOLO para:
- Soporte tras compra (incluido en Pack + Instalación)
- Casos custom (cliente con 50+ pacientes y dudas técnicas)
- Demo opcional para quien lo pide (link Calendly visible pero NO obligatorio)

Conversion async típica: **8-12% del tráfico warm** sin call. Mejor que media de SaaS B2B.
