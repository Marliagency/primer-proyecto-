---
type: automatizacion
tags: [automatizacion, onboarding]
status: wip
trigger: "Webhook Stripe checkout.session.completed"
last_run: never
updated: 2026-04-27
---

# Automatización · Onboarding del cliente

## Trigger

Pago confirmado de [[../02-PRODUCTOS/Pack-Premium]] (sin o con instalación).

## Pasos · Día 0 (inmediato post-pago)

1. Email de bienvenida con:
   - Acceso al template Notion
   - Vídeo paso a paso de instalación (~20 min)
   - Calendly para agendar instalación asistida (si compró 1.349€)
2. Crear ficha del cliente en CRM (status: `onboarding`).
3. Notificar al equipo de operaciones (Telegram/email).

## Día 1

- Email recordando el acceso + check-in: "¿pudiste empezar la instalación?"

## Día 3

- Si no marcó "instalado": email automático con FAQ y enlace a videollamada
  de soporte gratuita.

## Día 7

- Encuesta de satisfacción ligera (1 pregunta): "¿el sistema ya te ahorra
  tiempo?"
- Tag CRM según respuesta.

## Día 30

- Solicitud de testimonio en vídeo (incentivo: 1 mes Mantenimiento gratis).

## Día 60

- Si no tiene Mantenimiento: ofrecer Mantenimiento (script de upsell).

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#cloudflare-email-service|cloudflare-email-service]]
- [[../03-SKILLS-SYSTEM/Skills-Database#internal-comms|internal-comms]]

## Métricas

- Activation rate Día 7 (objetivo: 80%+ tienen el sistema funcionando)
- NPS Día 30 (objetivo: > 50)
- % testimoniales conseguidos (objetivo H1: 30% de los clientes)
