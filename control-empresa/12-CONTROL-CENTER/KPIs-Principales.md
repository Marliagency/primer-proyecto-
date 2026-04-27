---
type: dashboard
tags: [control-center, kpis, metricas]
status: active
updated: 2026-04-27
---

# KPIs Principales

Métricas que se miden. Skills:
[[../03-SKILLS-SYSTEM/Skills-Database#startup-metrics-framework|startup-metrics-framework]]
+ [[../03-SKILLS-SYSTEM/Skills-Database#kpi-dashboard-design|kpi-dashboard-design]].

## Tabla maestra

| KPI | Frecuencia | Objetivo H1 (90d) | Fuente |
|---|---|---:|---|
| Videollamadas agendadas | semanal | 5-10 / sem | Calendly |
| Conversión llamada → venta | mensual | ≥ 30% | CRM |
| Coste por venta (Meta Ads) | semanal | < 200€ | Meta + CRM |
| LTV (Pack + Mantenimiento) | trimestral | ≥ 1.500€ | Stripe + CRM |
| Emails captados / mes (Fase 2+) | semanal | 50-100 / mes | n8n + CRM |
| Alcance medio carrusel | semanal | tendencia ↑ | IG + LinkedIn |
| Apertura newsletter | mensual | > 35% | Cloudflare Email |
| MRR (Mantenimiento) | mensual | crecimiento m/m | Stripe |
| Churn Mantenimiento | mensual | < 5% | Stripe |
| % Pack Premium con Mantenimiento | mensual | > 30% | CRM |
| Activation rate Día 7 | semanal | > 80% | CRM |
| Cumplimiento SLA soporte | semanal | > 95% | Tickets |
| Calidad chatbot Li (eval sample) | semanal | > 95% accuracy | LLM eval |
| Crisis detection chatbot Li | continuo | **100%** | LLM eval |

## Cálculo de KPIs derivados

### CAC (Customer Acquisition Cost)

`CAC = (gasto_ads + gasto_herramientas + tiempo_humano_estimado) / ventas`

Objetivo: CAC < 1/3 LTV.

### LTV

`LTV = ticket_medio_pack + (precio_mantenimiento × meses_promedio_retencion)`

Estimación inicial: 498€ + (300 × 12) = 4.098€ si retención 12 meses.

### Payback period

Meses hasta recuperar CAC. Objetivo: < 6 meses.

## Dashboard mensual

Generado el día 1 de cada mes con
[[../03-SKILLS-SYSTEM/Skills-Database#xlsx|xlsx]] →
`reportes/YYYY-MM.xlsx`.

## Alertas asociadas

Se disparan en [[Alertas-Sistema]] si:

- Videollamadas/sem < 3 durante 2 semanas
- CPA > 250€ durante 7 días
- Churn mensual > 8%
- Crisis detection < 100% (cualquier fallo es crítico)

## Ver también

- [[Dashboard-Operativo]]
- [[Flujo-Dinero]]
- [[../05-PROCESOS/Proceso-Reporting]]
