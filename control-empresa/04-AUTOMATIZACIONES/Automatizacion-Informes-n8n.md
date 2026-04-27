---
type: automatizacion
tags: [automatizacion, n8n, informes, producto]
status: wip
trigger: "Notion: sesión cerrada"
last_run: never
updated: 2026-04-27
---

# Automatización · Informes Clínicos (n8n)

Producto vendido. Ver [[../02-PRODUCTOS/Automatizacion-Informes]].

## Trigger

Cambio de status `cerrada` en la tabla "Sesiones" del CRM Notion del
psicólogo (vía Notion API webhook, polling o MCP push).

## Pasos

1. n8n recoge:
   - Datos del paciente (nombre, código, sesión nº)
   - Notas estructuradas de la sesión
   - Plantilla aplicable (terapia individual / pareja / EMDR / etc.)
2. **Claude API** redacta el informe siguiendo:
   - El system prompt del psicólogo (tono, estilo)
   - La plantilla concreta
3. **Skill `docx`** rellena la plantilla Word del psicólogo con la
   identidad de su consulta.
4. **Skill `pdf`** exporta el informe.
5. n8n sube el fichero a:
   - Notion (adjunto a la sesión)
   - Drive del psicólogo (opcional, si lo conecta)
6. n8n marca la sesión como `informe-listo`.

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#claude-api|claude-api]]
- [[../03-SKILLS-SYSTEM/Skills-Database#docx|docx]]
- [[../03-SKILLS-SYSTEM/Skills-Database#pdf|pdf]]
- [[../03-SKILLS-SYSTEM/Skills-Database#mcp-builder|mcp-builder]] (Notion)

## Integraciones

- [[../11-INTEGRACIONES/Integracion-Notion]]
- [[../11-INTEGRACIONES/Integracion-Anthropic-API]]
- [[../11-INTEGRACIONES/Integracion-n8n]]

## Compliance

No se almacenan datos clínicos sensibles fuera del propio Notion del
psicólogo. Ver [[../11-INTEGRACIONES/Integracion-Notion#RGPD]].

## Métricas

- Tiempo medio de generación de informe (objetivo: < 90 segundos)
- % de informes que requieren revisión manual del psicólogo
  (objetivo H1: < 30%)
