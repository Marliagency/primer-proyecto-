---
type: nota
tags: [skills, automatizacion, n8n]
status: active
updated: 2026-04-27
---

# Skills · Automation Layer

Capa que conecta las skills con los triggers reales del negocio. n8n es
el orquestador por defecto.

## Mapa trigger → skill

| Trigger | Skills disparadas | Resultado |
|---|---|---|
| Email capturado en landing lead magnet | cloudflare-email-service + docx | Entrega de plantillas + email bienvenida |
| Cron 24h post-descarga | cloudflare-email-service + internal-comms | Email nurturing 1/7 |
| Cron días 3, 5, 7, 10, 14 | cloudflare-email-service + internal-comms | Emails nurturing 2-7/7 |
| Sesión Notion marcada como "cerrada" | claude-api + docx + pdf | Informe generado y subido al CRM |
| Mensaje entrante en WhatsApp/web | claude-api + rag-implementation | Respuesta de Li |
| Calendly: llamada agendada | cloudflare-email-service | Email de confirmación + recordatorio |
| Calendly: llamada finalizada | cloudflare-email-service + internal-comms | Email post-llamada con oferta |
| Stripe: pago Pack Premium | cloudflare-email-service + billing-automation | Bienvenida + activación |
| Cron día 7 post-venta | cloudflare-email-service | Check-in de onboarding |
| Cron día 30 post-venta | cloudflare-email-service + internal-comms | Solicitud de testimonio |
| Cron mensual día 1 | xlsx + kpi-dashboard-design | Reporte mensual de KPIs |

## Stack de orquestación

- **n8n** (self-hosted o cloud) como orquestador principal
- **Notion** como CRM (vía MCP server custom)
- **Stripe** para cobro
- **Cloudflare** para email transaccional
- **Calendly** para agendado
- **Anthropic API** para Claude (chatbot Li + redacción)

## Skills críticas para esta capa

- `mcp-builder` (envoltura de Notion como MCP)
- `workflow-orchestration-patterns` (patrones n8n)
- `workflow-patterns` (patrones generales)
- `incident-runbook-templates` (qué hacer cuando un workflow falla)

## Ver también

- [[../04-AUTOMATIZACIONES/_INDEX]]
- [[../11-INTEGRACIONES/Integracion-n8n]]
