---
type: runbook
tags: [integraciones, incidentes, runbook]
status: active
updated: 2026-04-27
---

# Runbook · Incidentes

Qué hacer cuando algo se rompe. Skill de referencia:
[[../03-SKILLS-SYSTEM/Skills-Database#incident-runbook-templates|incident-runbook-templates]].

## Severidades

| Sev | Definición | Tiempo de respuesta | Quién |
|---|---|---|---|
| S1 | Sistema cliente caído (CRM, chatbot off) | 1h | Founder + Tech |
| S2 | Función parcial (cobro fallando) | 4h | Tech |
| S3 | Defecto menor (email mal renderizado) | 24h | Tech |
| S4 | Mejora a petición | 48h | Tech |

## Playbooks

### S1 · Chatbot Li no responde

1. Verificar latencia API Anthropic en
   https://status.anthropic.com
2. Verificar n8n: workflow chatbot está active
3. Verificar logs en n8n
4. Si Anthropic OK + n8n OK: revisar credenciales
   `ANTHROPIC_API_KEY_CHATBOT` (¿caducada? ¿revocada?)
5. Si todo OK: rollback a la versión anterior del system prompt
6. Comunicar al cliente afectado por WhatsApp/email

### S1 · Webhook Stripe falla

1. Verificar status Stripe https://status.stripe.com
2. Revisar `STRIPE_WEBHOOK_SECRET` (¿se rotó por error?)
3. Reintentar manualmente desde el dashboard Stripe
4. Si pago real está hecho pero CRM no actualizó: marcar manualmente
   y disparar onboarding
5. Documentar en [[../09-LOGS/Log-Tecnico]]

### S1 · Notion API timeout / errores

1. Verificar https://status.notion.so
2. n8n: pausar workflows que escriben en Notion para no acumular cola
3. Reanudar cuando vuelva
4. Si la pausa es > 30 min, comunicar al cliente

### S2 · Email transaccional no llega

1. Verificar bounce / spam score (mail-tester.com)
2. Verificar SPF/DKIM/DMARC siguen válidos
3. Revisar reputación del IP/dominio en blacklists
4. Si reputación baja: pausar campañas masivas, mantener solo
   transaccional

### S2 · Generación de informe falla

1. Logs en n8n del workflow `Automatizacion-Informes`
2. ¿LLM devuelve error? → revisar contexto enviado (¿demasiado largo?)
3. ¿Skill `docx` falla? → plantilla corrupta
4. Bypass: marcar sesión como `informe-pendiente-manual`, notificar al
   psicólogo

## Comunicación al cliente

| Severidad | Canal | Plantilla |
|---|---|---|
| S1 sistemas | WhatsApp + email | "Detectamos X, estamos resolviendo. ETA: Y" |
| S2 sistemas | Email | "Detectamos X, ya en curso. No requiere acción tuya." |
| S3-S4 | No proactivo | — |

## Postmortem

Tras cualquier S1: postmortem en
[[../09-LOGS/Log-Tecnico]] con:

- Qué pasó (timeline)
- Por qué (causa raíz)
- Cómo se resolvió
- Qué cambia para que no vuelva a pasar

Skill: [[../03-SKILLS-SYSTEM/Skills-Database#evaluation-methodology|evaluation-methodology]].

## Ver también

- [[SECURITY]]
- [[../12-CONTROL-CENTER/Alertas-Sistema]]
