---
type: moc
tags: [productos]
status: active
updated: 2026-04-27
---

# 02 · PRODUCTOS

Catálogo y fichas de cada producto de Marli Agency.

## Notas

- [[Catalogo-Productos]] · Tabla maestra y lógica de oferta
- [[CRM-Marli]] · Núcleo Notion · 27€
- [[Automatizacion-Informes]] · n8n · 199€/449€
- [[Chatbot-Li]] · IA 24/7 · 399€/999€
- [[Pack-Premium]] · Todo · 498€/1.349€
- [[Mantenimiento]] · Recurrente · 300€/mes

## Vista de catálogo

```dataview
TABLE precio_sin_instalacion as "Sin inst.", precio_con_instalacion as "Con inst.", funcion as "Función"
FROM "02-PRODUCTOS"
WHERE type = "producto"
SORT file.name
```
