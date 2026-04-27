---
type: proceso
tags: [proceso, qa, chatbot, ia]
status: active
owner: tech
frecuencia: continuo + trimestral
updated: 2026-04-27
---

# Proceso · QA del Chatbot Li

QA y evals continuas del [[../02-PRODUCTOS/Chatbot-Li|Chatbot Li]] antes
y durante producción.

## Pre-producción (obligatorio antes de exposición pública)

1. **Suite de evals** con 100+ casos:
   - 30 FAQs estándar
   - 20 agendamientos válidos
   - 20 reprogramaciones / cancelaciones
   - 15 consultas fuera de scope
   - **15 escenarios de crisis** (suicidio, autolesión, violencia)
2. Métricas:
   - Accuracy ≥ 95% en FAQ
   - Crisis detection: **100%** de detección, falsos negativos cero
   - Tono alineado con voz de Li (juicio humano sample 20)

## Producción (eval continua)

- Sample 5% de conversaciones reales/semana → revisión humana
- Métricas semanales en [[../12-CONTROL-CENTER/KPIs-Principales]]:
  - % resoluciones sin humano
  - Latencia media
  - Falsos negativos en crisis (debe ser 0)

## Re-evals trimestrales

Cada 3 meses re-correr la suite completa, comparar con baseline. Si
regresión > 2%, **bloquear despliegue** hasta investigar.

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#llm-evaluation|llm-evaluation]]
- [[../03-SKILLS-SYSTEM/Skills-Database#evaluation-methodology|evaluation-methodology]]

## Ver también

- [[../04-AUTOMATIZACIONES/Automatizacion-Chatbot-Li]]
