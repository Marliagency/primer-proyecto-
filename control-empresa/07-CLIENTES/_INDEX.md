---
type: moc
tags: [clientes, crm]
status: active
updated: 2026-04-27
---

# 07 · CLIENTES

CRM, personas y manejo de objeciones.

## Notas

- [[CRM-Pipeline]] · Pipeline de ventas en vivo
- [[Buyer-Persona-Saturada]]
- [[Buyer-Persona-Emprendedor]]
- [[Buyer-Persona-Clinica]]
- [[Manejo-Objeciones]]

## Pipeline en vivo

```dataview
TABLE status, persona, ticket, ultima_accion
FROM "07-CLIENTES"
WHERE type = "cliente"
SORT status ASC, ultima_accion DESC
```

## Convenciones de status (alineadas con [[../05-PROCESOS/Proceso-Venta]])

`capturado` → `nurturing` → `llamada-agendada` → `en-llamada` →
`propuesta-enviada` → `cerrado-pendiente-pago` → `cliente` → `onboarding`
→ `activo` → `mantenimiento` (si aplica) → `churn` (si aplica)
