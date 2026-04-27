---
type: dashboard
tags: [control-center, finanzas, dinero]
status: active
updated: 2026-04-27
---

# Flujo de Dinero

Skill: [[../03-SKILLS-SYSTEM/Skills-Database#startup-financial-modeling|startup-financial-modeling]].

## Snapshot mensual

| Métrica | Mes actual | Mes anterior | YTD |
|---|---:|---:|---:|
| Ingresos Pack Premium | _ | _ | _ |
| Ingresos Mantenimiento (MRR) | _ | _ | _ |
| Ingresos otros | _ | _ | _ |
| **Total ingresos** | _ | _ | _ |
| Gasto herramientas (Anthropic, Stripe, n8n, CF, Calendly...) | _ | _ | _ |
| Gasto Meta Ads | _ | _ | _ |
| Otros gastos | _ | _ | _ |
| **Total gastos** | _ | _ | _ |
| **Margen** | _ | _ | _ |

## MRR · evolución

| Mes | MRR | Δ |
|---|---:|---:|
| 2026-04 | _ | — |
| 2026-05 | _ | _ |
| 2026-06 | _ | _ |

## Runway (si aplica)

```
runway_meses = caja_actual / quema_neta_mensual
```

Objetivo: ≥ 12 meses si hay caja externa, ≥ 6 si bootstrap.

## Coste estimado de herramientas (mensual, base)

| Herramienta | Coste/mes | Notas |
|---|---:|---|
| Anthropic API (Li + informes) | 50-200€ | Depende de uso · prompt caching obligatorio |
| n8n Cloud Pro | 50€ | O 10€ self-hosted en VPS |
| Cloudflare Email | 0-5€ | Plan free hasta 10k emails/mes |
| Calendly Pro | 12€ | Por usuario |
| Notion (workspace) | 0-10€ | Plus si crece |
| Stripe | % por transacción | 1.5% + 0.25€ EU |
| Canva Pro | 12€ | Para Kit de Marca |
| Hosting web | 5-15€ | Cuando exista |
| Dominio | 1€/mes (12€/año) | marliagency.com |
| **Base aprox.** | **~150-300€/mes** | Antes de ads |

A esto se suma Meta Ads cuando arranque (15-25€/día → 450-750€/mes Fase 2).

## Decisiones financieras pendientes

```dataview
LIST file.link
FROM "09-LOGS"
WHERE type = "log" AND tags = "decision-pendiente" AND categoria = "finanzas"
```

## Ver también

- [[KPIs-Principales]]
- [[../11-INTEGRACIONES/Integracion-Stripe]]
- [[../09-LOGS/Log-Decisiones]]
