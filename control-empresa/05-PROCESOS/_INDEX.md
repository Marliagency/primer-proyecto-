---
type: moc
tags: [procesos, sop]
status: active
updated: 2026-04-27
---

# 05 · PROCESOS

SOPs y flujos operativos. Cada proceso describe qué hace una persona o
sistema, paso a paso, para llevar algo al siguiente estado.

## Procesos clave

- [[Proceso-Captacion]] · De desconocido a lead capturado
- [[Proceso-Venta]] · De lead a cliente cerrado
- [[Proceso-Onboarding]] · De cliente a usuario activo
- [[Proceso-Mantenimiento]] · Soporte y atención recurrente
- [[Proceso-QA-Chatbot]] · QA y evals continuas de Li
- [[Proceso-Produccion-Contenido]] · Ciclo semanal de carruseles
- [[Proceso-Reporting]] · Cierre semanal y mensual de KPIs

## Vista global

```dataview
TABLE owner, frecuencia, status
FROM "05-PROCESOS"
WHERE type = "proceso"
SORT file.name
```
