---
type: integracion
tags: [integracion, analytics, google]
status: idea
fase: 2
permisos_minimos: "Measurement Protocol API secret + Measurement ID"
credenciales: "GA4_MEASUREMENT_ID, GA4_API_SECRET"
updated: 2026-04-27
---

# Integración · Google Analytics 4

## Función

Atribución web: qué canal lleva tráfico a la landing, qué páginas
convierten, qué dispositivo usan los psicólogos.

## Eventos a configurar

| Evento | Estandar GA4 | Custom |
|---|---|---|
| `page_view` | sí | — |
| `view_item` | landing del lead magnet | — |
| `generate_lead` | sí (email capturado) | — |
| `schedule` | — | sí (videollamada agendada) |
| `purchase` | sí (Stripe webhook) | — |

## Credenciales

```
GA4_MEASUREMENT_ID
GA4_API_SECRET
```

## Cómo se conecta

- gtag.js en landing (cliente)
- Measurement Protocol desde n8n para eventos server-side (Schedule,
  Purchase)

## RGPD

- Consent mode v2 obligatorio
- IP anonimizada por defecto en GA4
- Aviso de cookies con opt-in real

## Estado

`idea` — pendiente Fase 2.

## Ver también

- [[Integracion-Meta-Ads]]
- [[../06-MARKETING/Plan-90-Dias]]
