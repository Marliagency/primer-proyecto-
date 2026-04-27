---
type: proceso
tags: [proceso, mantenimiento, soporte]
status: active
owner: operaciones
frecuencia: continuo
updated: 2026-04-27
---

# Proceso · Mantenimiento y Soporte

Aplica solo a clientes con [[../02-PRODUCTOS/Mantenimiento|Mantenimiento]]
activo (300€/mes).

## Cobertura

- Soporte por email/WhatsApp en horario laboral (L-V 9:00-18:00)
- Tiempo de respuesta objetivo: < 4h hábiles
- Tiempo de resolución objetivo: < 24h hábiles para problemas estándar
- Mejoras a petición: hasta 2h/mes acumulables hasta 6h

## SLA por severidad

| Severidad | Definición | Respuesta | Resolución |
|---|---|---|---|
| S1 | Sistema caído (CRM o chatbot off) | 1h | 4h |
| S2 | Función parcial (informes fallan) | 4h | 24h |
| S3 | Defecto menor (tipografía, copy) | 24h | 5d |
| S4 | Mejora a petición | 48h | 2 sem |

## Runbook on-call

Ver [[../11-INTEGRACIONES/Runbook-Incidentes]] (skill
`incident-runbook-templates`).

## Métricas

- Tiempo medio de respuesta (objetivo: < 4h)
- Tickets/mes/cliente (objetivo: < 3)
- Churn mensual (objetivo: < 5%)
- NPS mantenimiento (objetivo: > 60)

## Ver también

- [[../12-CONTROL-CENTER/Estado-Clientes]]
- [[../12-CONTROL-CENTER/Alertas-Sistema]]
