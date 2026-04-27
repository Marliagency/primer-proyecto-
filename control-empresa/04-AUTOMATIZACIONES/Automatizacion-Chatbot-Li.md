---
type: automatizacion
tags: [automatizacion, chatbot, li, ia]
status: wip
trigger: "Mensaje entrante en web/WhatsApp"
last_run: never
updated: 2026-04-27
---

# Automatización · Chatbot Li

Ver producto: [[../02-PRODUCTOS/Chatbot-Li]].

## Trigger

Mensaje entrante en uno de los canales:

- **Fase 1**: widget en la web del psicólogo
- **Fase 2**: WhatsApp Business API
- **Fase 3 (opcional)**: Instagram DMs

## Pasos

1. Recibir mensaje + contexto (canal, número/email del paciente).
2. **Recuperar contexto del paciente** del CRM (Notion) si existe.
3. **RAG**: búsqueda semántica sobre:
   - FAQs del psicólogo (documento manual)
   - Política de cancelación, precios, horarios
   - Información del propio sistema Marli
4. **Claude API** genera respuesta con system prompt = voz de Li.
5. Decidir acción:
   - Solo responder (FAQ resuelta)
   - Agendar cita (consultar huecos del calendario)
   - Reprogramar / cancelar (con confirmación)
   - **Escalar a humano** si:
     - Mensaje contiene señales de crisis
     - Tema no cubierto por la base de conocimiento
     - Paciente lo pide explícitamente
6. Registrar conversación en CRM.
7. **Eval continua** con `llm-evaluation` (sample 5% de conversaciones).

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#claude-api|claude-api]]
- [[../03-SKILLS-SYSTEM/Skills-Database#prompt-engineering-patterns|prompt-engineering-patterns]]
- [[../03-SKILLS-SYSTEM/Skills-Database#rag-implementation|rag-implementation]]
- [[../03-SKILLS-SYSTEM/Skills-Database#embedding-strategies|embedding-strategies]]
- [[../03-SKILLS-SYSTEM/Skills-Database#llm-evaluation|llm-evaluation]]

## Salvaguardas críticas

- **Crisis psicológica**: si el modelo detecta señales de riesgo
  (suicidio, autolesión, violencia), escalar **inmediatamente** a humano
  con mensaje pre-aprobado de acompañamiento. Esto es **no negociable**.
- **No diagnosticar**: Li nunca da diagnóstico clínico, solo gestiona
  agenda y FAQ.
- **Auditoría**: log completo de cada conversación accesible al psicólogo.

Ver [[../05-PROCESOS/Proceso-QA-Chatbot]].

## Métricas

- % de conversaciones resueltas sin humano (objetivo: 70%+)
- Tasa de satisfacción del paciente (objetivo: 4.5/5)
- Latencia media de respuesta (objetivo: < 5s)
- % escaladas correctas (cero falsos negativos en crisis)
