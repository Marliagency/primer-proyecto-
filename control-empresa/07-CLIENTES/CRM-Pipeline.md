---
type: nota
tags: [clientes, crm, pipeline]
status: active
updated: 2026-04-27
---

# CRM · Pipeline

> ⚠️ Este vault es la **vista estratégica** del CRM. El CRM operativo
> real vive en Notion (parte del producto Marli usado internamente).
> Sincronización vía [[../11-INTEGRACIONES/Integracion-Notion|MCP server]].

## Vista por etapa

```dataview
TABLE persona, ticket, fecha_proxima_accion
FROM "07-CLIENTES"
WHERE type = "cliente" AND status = "llamada-agendada"
SORT fecha_proxima_accion ASC
```

## Cuello de botella detectado

> Mientras no haya datos reales, este apartado queda vacío. Tras 30
> días en producción, identificar etapa con mayor caída.

## Convenciones

Cada cliente es una nota con frontmatter:

```yaml
type: cliente
status: capturado | nurturing | llamada-agendada | en-llamada |
        propuesta-enviada | cerrado-pendiente-pago | cliente |
        onboarding | activo | mantenimiento | churn
persona: Saturada | Emprendedor | Clínica
ticket: 498 | 1349 | 798 | etc.
fuente: organico | meta-ads | linkedin-ads | outreach | partner | referido
ultima_accion: YYYY-MM-DD
fecha_proxima_accion: YYYY-MM-DD
```

## Ver también

- [[../05-PROCESOS/Proceso-Venta]]
- [[../12-CONTROL-CENTER/Estado-Clientes]]
- [[../12-CONTROL-CENTER/KPIs-Principales]]
