---
type: dashboard
tags: [control-center, dashboard, daily]
status: active
updated: 2026-04-27
---

# Dashboard Operativo

Vista diaria. Abrir cada mañana, 5 minutos.

## Hoy

### Llamadas agendadas

```dataview
LIST persona + " · " + ticket
FROM "07-CLIENTES"
WHERE type = "cliente" AND status = "llamada-agendada"
  AND fecha_proxima_accion = date(today)
```

### Acciones pendientes

```dataview
LIST file.link
FROM "00-INBOX" OR "07-CLIENTES"
WHERE type = "cliente"
  AND fecha_proxima_accion <= date(today)
  AND status != "cliente"
  AND status != "churn"
SORT fecha_proxima_accion ASC
LIMIT 10
```

### Alertas activas

```dataview
TABLE severidad, abierta_desde
FROM "12-CONTROL-CENTER"
WHERE type = "alerta" AND status = "abierta"
SORT severidad ASC
```

## Esta semana

### Pipeline en movimiento

```dataview
TABLE WITHOUT ID status, length(rows) as "#"
FROM "07-CLIENTES"
WHERE type = "cliente"
GROUP BY status
SORT status ASC
```

### Métricas vs semana pasada

> Rellenar manualmente cada lunes en el Log de retros:
> [[../09-LOGS/Log-Retros]].

| KPI | Esta sem | Anterior | Δ |
|---|---:|---:|---:|
| Videollamadas agendadas | _ | _ | _ |
| Ventas cerradas | _ | _ | _ |
| Leads nuevos | _ | _ | _ |
| Alcance carruseles (suma) | _ | _ | _ |

## Atajos

- [[KPIs-Principales]]
- [[Estado-Campanas]]
- [[Estado-Automatizaciones]]
- [[Alertas-Sistema]]
- [[../07-CLIENTES/CRM-Pipeline]]
- [[../09-LOGS/Log-Retros]]
