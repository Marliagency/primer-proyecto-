---
type: integracion
tags: [integracion, anthropic, claude, ia]
status: wip
permisos_minimos: "Workspace owner para crear keys; las keys son por defecto scoped al workspace"
credenciales: "ANTHROPIC_API_KEY_CHATBOT, ANTHROPIC_API_KEY_INFORMES"
updated: 2026-04-27
---

# Integración · Anthropic API (Claude)

## Función

LLM para [[../02-PRODUCTOS/Chatbot-Li|chatbot Li]] y para
[[../02-PRODUCTOS/Automatizacion-Informes|redacción de informes]].

## Datos a los que accede

- Mensajes entrantes de pacientes (chatbot)
- Notas de sesión del psicólogo (informes)
- Contexto del CRM (RAG vía
  [[../03-SKILLS-SYSTEM/Skills-Database#rag-implementation|rag-implementation]])

## Modelo recomendado

- **claude-sonnet-4-6** por defecto (balance velocidad/coste)
- **claude-opus-4-7** sólo para informes complejos (calidad superior,
  más caro)
- **claude-haiku-4-5-20251001** para tareas simples (FAQs, clasificación)

## Optimizaciones obligatorias

Usar **prompt caching** desde el primer día. El system prompt de Li y
las plantillas de informes son idénticas en cada llamada → cacheables.
Ahorro estimado: 60-90% del coste.

Skill: [[../03-SKILLS-SYSTEM/Skills-Database#claude-api|claude-api]].

## Credenciales

Dos keys separadas para observabilidad y rate limiting independientes:

```
ANTHROPIC_API_KEY_CHATBOT   # Li, alto volumen, sensible a latencia
ANTHROPIC_API_KEY_INFORMES  # batch, calidad > velocidad
```

## Cómo se conecta

1. n8n llama directamente a la API REST de Anthropic con
   `ANTHROPIC_API_KEY_*`.
2. Para el chatbot Li: integración server-side (no se expone la key al
   cliente final).
3. Para los informes: trigger desde Notion → n8n → Anthropic → docx.

## Coste y observabilidad

- Logs de tokens por llamada en n8n.
- Dashboard mensual: tokens input/output, cache hit rate, coste total.
  Ver [[../12-CONTROL-CENTER/KPIs-Principales]].
- Alerta si coste mensual > 200€ sin escalado de uso.

## Salvaguardas

- **Crisis detection** en Li es obligatoria. Ver
  [[../05-PROCESOS/Proceso-QA-Chatbot]].
- Eval continua (5% sample) con
  [[../03-SKILLS-SYSTEM/Skills-Database#llm-evaluation|llm-evaluation]].

## Estado

`wip` — pendiente:

- [ ] Crear cuenta Anthropic
- [ ] Generar 2 API keys (chatbot, informes)
- [ ] Configurar billing alerts
- [ ] Implementar prompt caching desde el día 1

## Ver también

- [[../02-PRODUCTOS/Chatbot-Li]]
- [[../10-RECURSOS/Prompt-Sistema-Li]]
- [[../05-PROCESOS/Proceso-QA-Chatbot]]
