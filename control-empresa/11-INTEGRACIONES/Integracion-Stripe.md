---
type: integracion
tags: [integracion, stripe, cobro, finanzas]
status: wip
permisos_minimos: "Restricted API key con scope: charges:write, customers:write, subscriptions:write, checkout:write"
credenciales: "STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET"
updated: 2026-04-27
---

# Integración · Stripe

## Función

Cobro del [[../02-PRODUCTOS/Pack-Premium|Pack Premium]] (one-shot) y
suscripción [[../02-PRODUCTOS/Mantenimiento|Mantenimiento]] (recurrente).

## Productos en Stripe

| Producto | Tipo | Precio ID env var |
|---|---|---|
| Pack Premium (sin instalación) | one-time, 498€ | `STRIPE_PRICE_ID_PACK_PREMIUM` |
| Pack Premium (con instalación) | one-time, 1.349€ | `STRIPE_PRICE_ID_PACK_PREMIUM_INSTALACION` |
| Mantenimiento | recurring monthly, 300€ | `STRIPE_PRICE_ID_MANTENIMIENTO` |

## Webhooks críticos

| Evento | Acción |
|---|---|
| `checkout.session.completed` | Crear cliente en CRM, disparar [[../04-AUTOMATIZACIONES/Automatizacion-Onboarding]] |
| `invoice.payment_succeeded` | Marcar mes pagado en mantenimiento, enviar factura |
| `invoice.payment_failed` | Alerta operaciones, secuencia dunning |
| `customer.subscription.deleted` | Marcar churn, encuesta de salida |

## Permisos mínimos (Restricted Key)

- `charges`: write
- `customers`: write
- `subscriptions`: write
- `checkout sessions`: write
- `webhooks`: read (sólo lectura)

**No** dar acceso a refunds desde n8n. Reembolsos son manuales por
seguridad.

## Credenciales

```
STRIPE_PUBLISHABLE_KEY   # frontend, segura para cliente
STRIPE_SECRET_KEY         # backend, restringida (Restricted API key)
STRIPE_WEBHOOK_SECRET     # validación de firma de webhooks
```

## Cómo se conecta

- Landing del [[../02-PRODUCTOS/Pack-Premium|Pack Premium]] usa Stripe
  Checkout (sesión generada server-side).
- n8n maneja el endpoint webhook con verificación de firma vía
  `STRIPE_WEBHOOK_SECRET`.
- Mantenimiento se ofrece **al cierre** en la videollamada y se factura
  desde Stripe Billing.

## Compliance

Stripe Checkout es PCI-compliant por defecto. Marli **nunca** ve ni
almacena datos de tarjeta. Skill:
[[../03-SKILLS-SYSTEM/Skills-Database#pci-compliance|pci-compliance]].

## Facturación AEAT

Stripe Tax o configuración manual:

- NIF + dirección fiscal del psicólogo (capturados en Checkout)
- IVA 21% si en España
- Inversión del sujeto pasivo si UE-B2B con NIF-IVA válido
- Factura PDF generada por Stripe Invoicing y enviada por email

## Estado

`wip` — pendiente:

- [ ] Crear cuenta Stripe (modo test primero)
- [ ] Crear los 3 productos
- [ ] Generar Restricted API key con scope mínimo
- [ ] Configurar webhook + secret
- [ ] Configurar Stripe Tax si se confirma España como mercado principal
- [ ] Validar primer cobro en modo TEST
- [ ] Activar modo LIVE antes del primer cliente real

## Ver también

- [[../02-PRODUCTOS/Mantenimiento]]
- [[../04-AUTOMATIZACIONES/Automatizacion-Cobro]]
- [[../12-CONTROL-CENTER/Flujo-Dinero]]
