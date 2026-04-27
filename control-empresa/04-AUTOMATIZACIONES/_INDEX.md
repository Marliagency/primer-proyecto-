---
type: moc
tags: [automatizaciones, n8n]
status: active
updated: 2026-04-27
---

# 04 · AUTOMATIZACIONES

Workflows operativos. Cada uno es una nota con `type: automatizacion` que
define trigger, pasos, skills, integraciones y estado.

## Workflows

- [[Automatizacion-Lead-Magnet]] · Captura → entrega → nurturing
- [[Automatizacion-Informes-n8n]] · Sesión cerrada → informe Word + PDF
- [[Automatizacion-Chatbot-Li]] · Mensaje entrante → respuesta + acción
- [[Automatizacion-Cobro]] · Cierre venta → Stripe → bienvenida
- [[Automatizacion-Onboarding]] · Bienvenida + check-ins 7d, 30d
- [[Automatizacion-Recordatorios]] · Citas y cumpleaños de paciente

## Estado global

```dataview
TABLE status, trigger, last_run
FROM "04-AUTOMATIZACIONES"
WHERE type = "automatizacion"
SORT status ASC, file.name
```

## Convenciones

- Cada workflow → un fichero JSON exportado de n8n en
  `n8n-exports/<nombre>.json` (placeholder).
- Estado: `wip` antes de producción, `active` cuando corre, `paused` si
  desactivado, `archived` si retirado.
