---
type: nota
tags: [skills, flujos, ejecucion]
status: active
updated: 2026-04-27
---

# Skills · Flujos de ejecución

Cómo se combinan las skills para cubrir cada proceso accionable.

## Flujo 1 · Generación de Kit de inicio (lead magnet)

```
[brand-guidelines] (codifica identidad Marli)
        ↓
[docx] (genera 5 plantillas Word con paleta + tipografía)
        ↓
Plantillas guardadas en /10-RECURSOS/Plantillas-Word-Informes/
        ↓
[web-artifacts-builder] + [theme-factory] (landing del lead magnet)
        ↓
[cloudflare-email-service] (envío automático del fichero al lead)
```

Procesos cubiertos: P07, P08, P09. Ver
[[../04-AUTOMATIZACIONES/Automatizacion-Lead-Magnet]].

## Flujo 2 · Producción de carrusel (semanal)

```
Tema/dolor de la semana (input humano)
        ↓
[data-storytelling] (estructura narrativa del carrusel)
        ↓
[internal-comms] (copy slide a slide)
        ↓
[prompt-engineering-patterns] (prompt para imagen Midjourney si aplica)
        ↓
[canvas-design] + [brand-guidelines] (montaje en Canva)
        ↓
Publicación manual IG/LinkedIn
```

Procesos: P16, P17. Ver [[../06-MARKETING/Contenido-Organico]].

## Flujo 3 · Generación de informe clínico (cada sesión)

```
Trigger Notion: sesión cerrada
        ↓
n8n recoge data + transcripción (si aplica)
        ↓
[claude-api] (redacción del informe)
        ↓
[docx] (rellenar plantilla)
        ↓
[pdf] (exportar para entregar)
        ↓
n8n vuelve al CRM con enlace al fichero
```

Procesos: P02. Ver [[../04-AUTOMATIZACIONES/Automatizacion-Informes-n8n]].

## Flujo 4 · Conversación con Li (chatbot)

```
Mensaje del paciente (web/WhatsApp)
        ↓
[claude-api] (LLM principal)
        ↓
[rag-implementation] + [embedding-strategies] (consulta CRM + FAQ)
        ↓
[prompt-engineering-patterns] (sistema prompt = voz de Li)
        ↓
Acción: agendar / responder / escalar a humano
        ↓
[llm-evaluation] (eval continua de calidad)
```

Procesos: P03. Ver [[../04-AUTOMATIZACIONES/Automatizacion-Chatbot-Li]].

## Flujo 5 · Cobro de Pack Premium

```
Cierre de venta (humano)
        ↓
n8n: crear cliente en Stripe
        ↓
[stripe-integration] (cobro one-shot 498€ o 1.349€)
        ↓
Webhook Stripe → email confirmación
        ↓
[cloudflare-email-service] + [internal-comms] (email de bienvenida)
        ↓
Si Mantenimiento: [billing-automation] crea suscripción 300€/mes
        ↓
[pci-compliance] revisión del flujo
```

Procesos: P32, P34, P31. Ver [[../04-AUTOMATIZACIONES/Automatizacion-Cobro]].

## Flujo 6 · Producción de artículo blog

```
Título + ángulo (input humano)
        ↓
[claude-api] + [prompt-engineering-patterns] (artículo SEO completo)
        ↓
[internal-comms] (revisión de tono)
        ↓
Copy a WordPress (manual)
        ↓
[seo-on-page] (gap — usar prompt curado mientras tanto)
```

Procesos: P23, P24. Ver [[../06-MARKETING/Plan-Blog-SEO]].

## Ver también

- [[Skills-Database]]
- [[Skills-Automation-Layer]]
- [[../04-AUTOMATIZACIONES/_INDEX]]
