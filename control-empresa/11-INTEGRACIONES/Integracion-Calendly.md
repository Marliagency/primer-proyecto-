---
type: integracion
tags: [integracion, calendly, ventas]
status: wip
permisos_minimos: "Personal Access Token (no OAuth) si single-account"
credenciales: "CALENDLY_PAT, CALENDLY_USER_URI, CALENDLY_WEBHOOK_SIGNING_KEY"
updated: 2026-04-27
---

# Integración · Calendly

## Función

Agendado de la videollamada de cierre de 25 min (
[[../05-PROCESOS/Proceso-Venta]]).

## Configuración del evento

- Duración: 25 min
- Buffer: 10 min antes y después
- Disponibilidad: lun-vie 10:00-18:00 (ajustar a zona)
- Confirmación automática con enlace Zoom/Meet
- Recordatorio email a 24h y 1h antes
- Cuestionario de pre-llamada (3 preguntas):
  1. ¿Cuántos pacientes activos tienes?
  2. ¿Cuántas horas/sem dedicas a admin?
  3. ¿Qué te ha llamado la atención de Marli?

## Webhooks

| Evento | Acción n8n |
|---|---|
| `invitee.created` | Crear lead en CRM con status `llamada-agendada` + email confirmación enriquecido |
| `invitee.canceled` | Marcar status `cancelo-llamada`, secuencia recovery |

## Credenciales

```
CALENDLY_PAT
CALENDLY_USER_URI
CALENDLY_WEBHOOK_SIGNING_KEY
```

## Cómo se conecta

- Landing del Pack Premium incrusta widget Calendly
- Al agendar → webhook → n8n actualiza CRM y dispara email enriquecido
- Tras la llamada (cron 30 min después) → email post-llamada

## Estado

`wip` — pendiente:

- [ ] Crear cuenta Calendly Pro
- [ ] Configurar evento "Demo Marli 25 min"
- [ ] Generar PAT
- [ ] Configurar webhooks en n8n
- [ ] Embeber widget en landing

## Ver también

- [[../05-PROCESOS/Proceso-Venta]]
- [[../10-RECURSOS/Plantilla-Email-PostLlamada]]
