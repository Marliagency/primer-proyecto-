---
type: dashboard
tags: [control-center, alertas, monitoring]
status: active
updated: 2026-04-27
---

# Alertas del Sistema

## Alertas activas

```dataview
TABLE severidad, abierta_desde, owner
FROM "12-CONTROL-CENTER"
WHERE type = "alerta" AND status = "abierta"
SORT severidad ASC
```

## Alertas resueltas (últimas 30 días)

```dataview
TABLE severidad, resuelta_el, postmortem
FROM "12-CONTROL-CENTER"
WHERE type = "alerta" AND status = "resuelta"
  AND resuelta_el >= date(today) - dur(30 days)
SORT resuelta_el DESC
```

## Reglas de alerta automática

Configuradas en n8n / observabilidad:

| Trigger | Severidad | Canal |
|---|---|---|
| Anthropic API caída > 5 min | S1 | Telegram + email |
| Webhook Stripe fallo > 3 reintentos | S1 | Telegram |
| Notion API timeout > 10 min | S2 | Telegram |
| Email bounce rate > 5% en 1h | S2 | Email |
| Crisis-detection chatbot Li falla cualquier eval | S1 | Telegram + SMS |
| n8n workflow falla 5+ veces consecutivas | S2 | Telegram |
| Stripe payment_failed (Mantenimiento) | S2 | Email |
| MRR cae > 10% mes/mes | S3 | Email semanal |

## Plantilla para crear nueva alerta manual

Crear nota con frontmatter:

```yaml
type: alerta
tags: [alerta]
status: abierta
severidad: S1 | S2 | S3 | S4
abierta_desde: YYYY-MM-DD HH:MM
owner: persona
componente: chatbot-li | stripe | notion | email | n8n
```

Cuerpo:

- **Síntoma**: ...
- **Impacto**: ...
- **Diagnóstico**: ...
- **Mitigación temporal**: ...
- **Resolución**: (al resolver)
- **Postmortem**: (si S1)

## Ver también

- [[../11-INTEGRACIONES/Runbook-Incidentes]]
- [[../09-LOGS/Log-Tecnico]]
