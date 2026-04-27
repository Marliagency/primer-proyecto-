---
type: integracion
tags: [integracion, notion, crm]
status: wip
permisos_minimos: "Read content, Update content, Insert content (sólo en DBs concretas)"
credenciales: "NOTION_INTEGRATION_TOKEN + DB IDs"
updated: 2026-04-27
---

# Integración · Notion

## Función

Notion es el **CRM principal** de Marli. Almacena leads, clientes,
sesiones (de los psicólogos clientes) y el catálogo operativo. Es
también el template que se entrega como producto.

## Datos a los que accede

- DBs: pacientes, sesiones, leads, clientes, tareas
- Bloques: páginas template, FAQs del psicólogo

## Acciones que ejecuta

- Read: queries con filtros (próximas 24h, leads sin contacto, etc.)
- Update: cambios de status (`nurturing → llamada-agendada`)
- Insert: nuevos leads desde [[../04-AUTOMATIZACIONES/Automatizacion-Lead-Magnet]]
- Append: comentarios automáticos de Li tras conversación

## Permisos mínimos

Crear una **Internal Integration** en
https://www.notion.so/my-integrations:

- Capabilities: Read content, Update content, Insert content
- **Compartir manualmente** sólo las DBs concretas (no el workspace
  entero — esto es clave).

## Credenciales

Ver [[credenciales.env.example]]:

```
NOTION_INTEGRATION_TOKEN
NOTION_DB_PACIENTES_ID
NOTION_DB_SESIONES_ID
NOTION_DB_LEADS_ID
NOTION_DB_CLIENTES_ID
```

## Cómo se conecta

1. n8n usa el nodo Notion oficial con `NOTION_INTEGRATION_TOKEN`.
2. Para acciones más finas (queries complejas), un MCP server custom
   envuelve la API de Notion. Ver
   [[../03-SKILLS-SYSTEM/Skills-Database#mcp-builder|skill mcp-builder]].
3. Este vault Obsidian **no se conecta directamente** a Notion: es la
   capa estratégica. Los datos operativos viven en Notion.

## RGPD

- Los datos clínicos de los pacientes del psicólogo viven en **el Notion
  del psicólogo**, no en uno central de Marli.
- Marli como vendor: solo accede al CRM de Marli (operativa propia).
- Cada cliente de Marli es responsable de su propio cumplimiento RGPD
  con sus pacientes.
- Skill: [[../03-SKILLS-SYSTEM/Skills-Database#gdpr-data-handling|gdpr-data-handling]].

## Estado

`wip` — pendiente:

- [ ] Crear integración en Notion
- [ ] Modelar las 4 DBs según
  [[../02-PRODUCTOS/CRM-Marli|especificación del CRM Marli]]
- [ ] Configurar n8n con el token
- [ ] Construir MCP server custom (gap `notion-crm`)

## Ver también

- [[../02-PRODUCTOS/CRM-Marli]]
- [[SECURITY]]
