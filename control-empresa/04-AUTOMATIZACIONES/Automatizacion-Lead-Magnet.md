---
type: automatizacion
tags: [automatizacion, lead-magnet, captacion]
status: wip
trigger: "Email capturado en landing /kit-inicio"
last_run: never
updated: 2026-04-27
---

# Automatización · Lead Magnet (Kit de inicio)

## Trigger

POST a webhook desde la landing del Kit de inicio
(`marliagency.com/kit-inicio`) con el email del lead.

## Pasos

1. **Validar email** (regex simple, no API verification).
2. **Guardar lead en Notion** (DB: leads · status: nuevo · fuente:
   `kit-inicio` · timestamp).
3. **Enviar email de entrega** con:
   - Las 5 [[../10-RECURSOS/Plantillas-Word-Informes|plantillas Word]]
     adjuntas o enlace de descarga.
   - Acceso al CRM Notion gratuito (template duplicable).
   - CTA a la [[../06-MARKETING/Lead-Magnet|landing del Pack Premium]].
4. **Programar nurturing**: cron a 24h, 3d, 5d, 7d, 10d, 14d con los
   emails 1-7 de la secuencia.
5. **Marcar lead como `entregado`** en Notion.

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#cloudflare-email-service|cloudflare-email-service]]
- [[../03-SKILLS-SYSTEM/Skills-Database#docx|docx]] (para regenerar plantillas si cambia la marca)
- [[../03-SKILLS-SYSTEM/Skills-Database#internal-comms|internal-comms]] (copy emails)

## Integraciones

- [[../11-INTEGRACIONES/Integracion-Notion]]
- [[../11-INTEGRACIONES/Integracion-Cloudflare-Email]]

## Métricas

- Leads/día (objetivo Fase 2: 50-100/mes)
- Tasa de apertura emails 1-7
- Conversión lead → videollamada agendada (objetivo: 5-10%)

Reportadas en [[../12-CONTROL-CENTER/KPIs-Principales]].

## Plan de implementación

1. Día 1-3: producir las 5 plantillas Word con `docx` + `brand-guidelines`.
2. Día 4-5: landing simple (`web-artifacts-builder`).
3. Día 6: webhook + n8n flow.
4. Día 7: configurar `cloudflare-email-service` (DKIM, SPF, DMARC).
5. Día 8: redactar los 7 emails de nurturing.
6. Día 9-10: pruebas extremo a extremo con cuenta personal.
