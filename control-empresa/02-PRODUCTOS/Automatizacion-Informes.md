---
type: producto
tags: [producto, n8n, informes, automatizacion]
status: active
updated: 2026-04-27
precio_sin_instalacion: 199
precio_con_instalacion: 449
funcion: "Generación automática de informes clínicos."
sku: MARLI-INFO
---

# Automatización de Informes (n8n)

## Función

Convierte datos del [[CRM-Marli|CRM]] en informes profesionales en
segundos. La capa de "producción" del sistema.

## Cómo funciona

1. Trigger desde Notion (sesión cerrada / paciente nuevo).
2. n8n recoge los datos.
3. LLM (Claude API) redacta el informe siguiendo plantilla.
4. Skill `docx` rellena la plantilla Word con identidad Marli.
5. Skill `pdf` exporta para entrega.
6. Vuelve al CRM con enlace al fichero.

## Skills involucradas

- [[../03-SKILLS-SYSTEM/Skills-Database#docx|docx]]
- [[../03-SKILLS-SYSTEM/Skills-Database#pdf|pdf]]
- [[../03-SKILLS-SYSTEM/Skills-Database#claude-api|claude-api]]
- [[../03-SKILLS-SYSTEM/Skills-Database#mcp-builder|mcp-builder]]

## Automatización relacionada

[[../04-AUTOMATIZACIONES/Automatizacion-Informes-n8n]]

## Ver también

- [[../10-RECURSOS/Plantillas-Word-Informes]]
- [[../11-INTEGRACIONES/Integracion-n8n]]
