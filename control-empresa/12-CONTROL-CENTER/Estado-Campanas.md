---
type: dashboard
tags: [control-center, marketing, campanas]
status: active
updated: 2026-04-27
---

# Estado de Campañas

## Activas

```dataview
TABLE plataforma, presupuesto_dia, cpa_actual, status
FROM "06-MARKETING"
WHERE type = "campania" AND status = "active"
SORT plataforma ASC
```

## Pausadas / en idea

```dataview
TABLE plataforma, fase, status
FROM "06-MARKETING"
WHERE type = "campania" AND (status = "paused" OR status = "idea")
SORT fase ASC
```

## Orgánico (esta semana)

| Canal | Posts | Alcance | Engagement | Leads |
|---|---:|---:|---:|---:|
| Instagram carruseles | _ | _ | _ | _ |
| LinkedIn carruseles | _ | _ | _ | _ |
| LinkedIn texto | _ | _ | _ | _ |
| Outreach LinkedIn | _ | _ | _ | _ |

(Rellenar manualmente cada lunes en
[[../09-LOGS/Log-Retros|retro semanal]].)

## Calendario inminente

```dataview
LIST file.link
FROM "06-MARKETING"
WHERE type = "tema-contenido" AND status = "programado"
SORT fecha ASC
LIMIT 10
```

## Decisiones de presupuesto

| Plataforma | Presupuesto/día actual | Decisión próxima |
|---|---:|---|
| Meta Ads | 0 € | Activar Fase 2 con 15-25€/día |
| LinkedIn Ads | 0 € | Posponer a Fase 3 |
| Google Ads | 0 € | Solo si SEO valida demanda search |

## Ver también

- [[../06-MARKETING/_INDEX]]
- [[../06-MARKETING/Plan-90-Dias]]
- [[KPIs-Principales]]
