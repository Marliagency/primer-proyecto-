---
type: proceso
tags: [proceso, ventas]
status: active
owner: founder
frecuencia: por lead caliente
updated: 2026-04-27
---

# Proceso · Venta

## Objetivo

Convertir lead caliente en cliente cerrado con pago confirmado.

## Pipeline

| Etapa | Acción | Status CRM |
|---|---|---|
| 1 | Lead capturado y nurtured | `nurturing` |
| 2 | Solicita videollamada (Calendly) | `llamada-agendada` |
| 3 | Asiste a videollamada de cierre (25 min) | `en-llamada` |
| 4 | Llamada cerrada con interés | `propuesta-enviada` |
| 5 | Decide comprar | `cerrado-pendiente-pago` |
| 6 | Paga vía Stripe | `cliente` |

Si se pierde en etapa 4 → tag `objecion-X` (ver
[[../07-CLIENTES/Manejo-Objeciones]]) y pasa a secuencia de re-engagement.

## Guion de videollamada (25 min)

1. **Min 0-3** · Romper hielo + entender contexto del psicólogo
2. **Min 3-10** · Diagnóstico de su consulta actual (dolor)
3. **Min 10-18** · Demo del sistema Marli (CRM + chatbot Li en vivo)
4. **Min 18-22** · Presentación del Pack Premium
5. **Min 22-25** · Cierre + Mantenimiento (upsell)

## Skills de apoyo

- [[../03-SKILLS-SYSTEM/Skills-Database#internal-comms|internal-comms]]
  (script de venta + email post-llamada)

## Email post-llamada

Plantilla en [[../10-RECURSOS/Plantilla-Email-PostLlamada]]. Incluye:

- Resumen de lo hablado
- Enlace de pago Stripe (Pack Premium o Pack + Mantenimiento)
- Caducidad de la oferta de lanzamiento (48h en Fase 1)

## Métricas

- Conversión llamada → venta (objetivo: 30%+)
- Ticket medio (objetivo: 600€+ con upsell Mantenimiento)
- Tiempo medio de cierre (objetivo: < 7 días desde primera llamada)

## Ver también

- [[../07-CLIENTES/Manejo-Objeciones]]
- [[../04-AUTOMATIZACIONES/Automatizacion-Cobro]]
