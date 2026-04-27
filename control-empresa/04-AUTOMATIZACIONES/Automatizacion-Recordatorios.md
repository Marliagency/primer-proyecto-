---
type: automatizacion
tags: [automatizacion, recordatorios]
status: idea
trigger: "Cron diario 18:00"
last_run: never
updated: 2026-04-27
---

# Automatización · Recordatorios de citas

> Funcionalidad del producto (no operativa interna): el psicólogo cliente
> usa este flow para recordar citas a sus pacientes.

## Trigger

Cron diario a las 18:00 hora local del psicólogo.

## Pasos

1. Consultar Notion: citas del día siguiente.
2. Para cada cita:
   - Enviar WhatsApp con confirmación (Sí / Reprogramar / Cancelar).
   - Si "Sí" → marcar confirmada.
   - Si "Reprogramar" → escalar a Li para proponer huecos.
   - Si "Cancelar" → marcar y notificar al psicólogo.
3. Generar resumen al psicólogo: "X confirmadas, Y pendientes,
   Z canceladas".

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#claude-api|claude-api]] (Li)
- [[../03-SKILLS-SYSTEM/Skills-Database#mcp-builder|mcp-builder]]

## Estado

`idea` — pendiente de validación con primeros clientes.
