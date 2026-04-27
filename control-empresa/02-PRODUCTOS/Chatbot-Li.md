---
type: producto
tags: [producto, chatbot, ia, li]
status: active
updated: 2026-04-27
precio_sin_instalacion: 399
precio_con_instalacion: 999
funcion: "Captación + agendado 24/7."
sku: MARLI-BOT
---

# Chatbot Li

## Función

La cara visible del sistema. Atiende 24/7, agenda citas y responde dudas
consultando el [[CRM-Marli|CRM]] en tiempo real.

## Storytelling oficial

> Antes de que el psicólogo empiece su jornada, Li ya está en marcha:
> confirmando citas, respondiendo a pacientes y organizando todo. Mientras
> está en sesión, Li trabaja en silencio. Y cuando el día termina, no hay
> caos ni tareas pendientes escondidas. Solo tranquilidad.

## Capacidades

- Responder dudas de pacientes potenciales (FAQ del psicólogo)
- Agendar citas leyendo huecos del CRM
- Confirmar citas el día anterior
- Reprogramar cancelaciones
- Recordatorios automáticos

## Stack técnico

- LLM: Claude API
- RAG: embeddings sobre las FAQs y manual del psicólogo
- Acceso al CRM via MCP server custom (Notion API)
- Canal inicial: web embebida + WhatsApp Business (Fase 2)

## Skills involucradas

- [[../03-SKILLS-SYSTEM/Skills-Database#claude-api|claude-api]]
- [[../03-SKILLS-SYSTEM/Skills-Database#prompt-engineering-patterns|prompt-engineering-patterns]]
- [[../03-SKILLS-SYSTEM/Skills-Database#rag-implementation|rag-implementation]]
- [[../03-SKILLS-SYSTEM/Skills-Database#embedding-strategies|embedding-strategies]]
- [[../03-SKILLS-SYSTEM/Skills-Database#llm-evaluation|llm-evaluation]]

## Evaluación

Evals obligatorias antes de exposición pública. Ver
[[../05-PROCESOS/Proceso-QA-Chatbot]].

## Ver también

- [[../06-MARKETING/Storytelling-Li]]
- [[../11-INTEGRACIONES/Integracion-Anthropic-API]]
