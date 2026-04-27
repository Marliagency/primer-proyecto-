---
type: dashboard
tags: [control-center, clientes, crm]
status: active
updated: 2026-04-27
---

# Estado de Clientes

## Pipeline (snapshot vivo)

```dataview
TABLE WITHOUT ID status, length(rows) as "#"
FROM "07-CLIENTES"
WHERE type = "cliente"
GROUP BY status
SORT status ASC
```

## Clientes activos por persona

```dataview
TABLE WITHOUT ID persona, length(rows) as "#"
FROM "07-CLIENTES"
WHERE type = "cliente" AND (status = "cliente" OR status = "activo" OR status = "mantenimiento")
GROUP BY persona
```

## Cohortes (cuando haya datos)

| Cohorte (mes alta) | Clientes | Mantenimiento activo | Churn | LTV medio |
|---|---:|---:|---:|---:|
| 2026-04 | _ | _ | _ | _ |
| 2026-05 | _ | _ | _ | _ |
| 2026-06 | _ | _ | _ | _ |

## Salud de cuenta · top 5 en riesgo

```dataview
TABLE persona, ultima_accion, motivo_riesgo
FROM "07-CLIENTES"
WHERE type = "cliente" AND status = "activo" AND riesgo = true
SORT ultima_accion ASC
LIMIT 5
```

(Usar tag `riesgo: true` en frontmatter cuando se detecte señal: NPS bajo,
pago fallido, desuso > 14d.)

## Acciones de la semana

```dataview
LIST file.link
FROM "07-CLIENTES"
WHERE type = "cliente"
  AND fecha_proxima_accion >= date(today)
  AND fecha_proxima_accion <= date(today) + dur(7 days)
SORT fecha_proxima_accion ASC
```

## Ver también

- [[../07-CLIENTES/CRM-Pipeline]]
- [[../05-PROCESOS/Proceso-Mantenimiento]]
- [[KPIs-Principales]]
