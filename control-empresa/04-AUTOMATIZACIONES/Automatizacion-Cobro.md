---
type: automatizacion
tags: [automatizacion, stripe, cobro]
status: wip
trigger: "Cierre de venta (manual, post-llamada)"
last_run: never
updated: 2026-04-27
---

# Automatización · Cobro Pack Premium + Mantenimiento

## Trigger

Marca manual de venta cerrada en CRM Notion (status: `cerrado-pendiente-pago`).

## Pasos

1. **Crear Customer en Stripe** con email del psicólogo.
2. **Generar Checkout Session**:
   - Pack Premium 498€ (sin instalación) o 1.349€ (con instalación)
   - Si quiere Mantenimiento: **suscripción 300€/mes** adicional
3. Enviar enlace de pago por email automático
   ([[../11-INTEGRACIONES/Integracion-Cloudflare-Email|Cloudflare Email]]).
4. **Webhook Stripe `checkout.session.completed`**:
   - Marcar lead como `cliente` en CRM
   - Disparar [[Automatizacion-Onboarding|onboarding]]
   - Generar factura PDF y enviar
5. Si suscripción Mantenimiento:
   - Activar billing recurrente
   - Webhook `invoice.payment_failed` → alerta a operaciones

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#stripe-integration|stripe-integration]]
- [[../03-SKILLS-SYSTEM/Skills-Database#billing-automation|billing-automation]]
- [[../03-SKILLS-SYSTEM/Skills-Database#pci-compliance|pci-compliance]]
- [[../03-SKILLS-SYSTEM/Skills-Database#cloudflare-email-service|cloudflare-email-service]]

## Integraciones

- [[../11-INTEGRACIONES/Integracion-Stripe]]
- [[../11-INTEGRACIONES/Integracion-Notion]]

## Compliance

- Stripe Checkout es PCI-compliant por defecto (no almacenamos PAN).
- Factura cumple requisitos AEAT (NIF, fecha, base, IVA, total).

## Métricas

- Tasa de pago tras enlace enviado (objetivo: 90%+)
- Tasa de impago en Mantenimiento (objetivo: < 3%)
- DSO medio (días desde envío de enlace a cobro)
