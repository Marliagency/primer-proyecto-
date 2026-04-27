# 05 · Arquitectura final del sistema

Cómo se conectan las skills entre sí y dónde se inserta cada componente
del producto Marli. La arquitectura respeta la regla de oro del §5: **el
CRM en Notion es el cerebro, todo lo demás se conecta a él**.

## Vista de alto nivel

```
                ┌──────────────────────────────────────────────────┐
                │              CAPTACIÓN (Tofu/Mofu)               │
                │                                                  │
                │  Carruseles    Anuncios     Outreach    Blog    │
                │  IG/LinkedIn   Meta/LI      LinkedIn    SEO     │
                │     ▼              ▼            ▼         ▼     │
                │  ┌──────────────────────────────────────────┐   │
                │  │      Landing del Lead Magnet (Kit)       │   │
                │  │      web-artifacts-builder + theme       │   │
                │  └──────────────────────────────────────────┘   │
                │                     │                            │
                │                     ▼                            │
                │  ┌──────────────────────────────────────────┐   │
                │  │  Email de entrega + nurturing 5-7 emails │   │
                │  │       cloudflare-email-service           │   │
                │  └──────────────────────────────────────────┘   │
                └─────────────────────┼────────────────────────────┘
                                      │
                                      ▼
                ┌──────────────────────────────────────────────────┐
                │             CONVERSIÓN (Bofu)                    │
                │                                                  │
                │  Landing Pack Premium  →  Calendly  →  Llamada  │
                │  frontend-design          (externo)    (humana) │
                │                                                  │
                │            Stripe (cobro único)                 │
                │       stripe-integration + pci-compliance        │
                └─────────────────────┼────────────────────────────┘
                                      │
                                      ▼
        ┌─────────────────────────────────────────────────────────────┐
        │                EL SISTEMA MARLI (post-venta)                │
        │                                                             │
        │   ┌─────────────────────┐                                   │
        │   │   CRM · Notion      │ ◄────── núcleo (cerebro)          │
        │   │   mcp-builder       │                                   │
        │   │   (Notion MCP)      │                                   │
        │   └──────┬──────────────┘                                   │
        │          │                                                  │
        │          ├──────────────┐               ┌──────────────┐    │
        │          ▼              ▼               ▼              │    │
        │   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │    │
        │   │ Informes     │ │ Chatbot Li   │ │ Email/       │  │    │
        │   │ docx + pdf   │ │ claude-api + │ │ recordatorios│  │    │
        │   │ + claude-api │ │ rag + embed  │ │ cloudflare   │  │    │
        │   │ orquesta n8n │ │ + prompts    │ │ -email       │  │    │
        │   └──────────────┘ └──────────────┘ └──────────────┘  │    │
        │                                                        │    │
        │   ┌──────────────────────────────────────────────────┐ │    │
        │   │ Mantenimiento mensual (300€)                     │ │    │
        │   │ billing-automation + stripe + incident-runbook   │ │    │
        │   └──────────────────────────────────────────────────┘ │    │
        └────────────────────────────────────────────────────────┴────┘
                                      │
                                      ▼
                ┌──────────────────────────────────────────────────┐
                │           OPERACIÓN INTERNA MARLI                │
                │                                                  │
                │  KPI dashboard  ·  Compliance RGPD  ·  Soporte  │
                │  kpi-dashboard      gdpr-data-handling           │
                │  + xlsx + startup-  + pci-compliance             │
                │  metrics-framework                               │
                └──────────────────────────────────────────────────┘
```

## Cómo trabajan juntas las skills

### Capa de Identidad y Marca

`brand-guidelines` codifica los colores, tipografías y estilos del §3 del
documento maestro en un artefacto reutilizable. `theme-factory` aplica ese
tema a cada artefacto generado: landing, carrusel, plantilla docx, email
HTML. `visual-design-foundations` garantiza coherencia visual transversal.
**Resultado**: un cambio de paleta se propaga a todo en una sola edición.

### Capa de Producto · El Sistema Marli

El núcleo es Notion. No existe skill nativa de Notion en los registries;
se construye un MCP server con `mcp-builder` que expone Notion al resto
del sistema. Sobre ese MCP:

- **Informes (P02)**: `claude-api` redacta a partir de la conversación,
  `docx` rellena la plantilla con la marca, `pdf` exporta. n8n orquesta el
  trigger desde Notion (paciente nuevo / sesión cerrada).
- **Chatbot Li (P03)**: `claude-api` para el LLM. `rag-implementation` y
  `embedding-strategies` permiten que Li consulte el CRM en tiempo real
  (información del paciente, próxima cita, FAQ del psicólogo). 
  `prompt-engineering-patterns` codifica la voz humana descrita en §4.
  `llm-evaluation` verifica calidad antes de exposición a pacientes.

### Capa de Captación

`web-artifacts-builder` + `frontend-design` + `theme-factory` producen las
dos landings (lead magnet y Pack Premium) con identidad Marli aplicada.
`responsive-design`, `interaction-design` y `web-design-guidelines` dan
vuelta de calidad. `accessibility-compliance` garantiza WCAG.

`cloudflare-email-service` resuelve toda la capa email transaccional:
entrega del lead magnet, nurturing, post-llamada, bienvenida, testimonio.
`internal-comms` produce el copy. n8n se encarga de los triggers
temporales (cron de 24h, 7 días, 30 días).

### Capa de Contenido

`canvas-design` para carruseles estáticos. `prompt-engineering-patterns`
para mantener el banco de 20 prompts Midjourney como skill viva.
`data-storytelling` para los carruseles tipo "5 señales de que tu consulta
te consume" y "8 horas perdidas a la semana". `internal-comms` para el
texto largo de LinkedIn y la newsletter mensual.

### Capa de Cobro

`stripe-integration` + `pci-compliance` cubren el Pack Premium (one-shot)
y el Mantenimiento (subscription). `billing-automation` se encarga de la
recurrencia y dunning.

### Capa de Métricas

`startup-metrics-framework` define el catálogo de KPIs (videollamadas,
conversión, CPA, LTV, alcance, apertura) descritos en §17.
`kpi-dashboard-design` los materializa en dashboard. `xlsx` permite
export para reuniones. `market-sizing-analysis` y `competitive-landscape`
mantienen el contexto estratégico del §8 vivo.

## Activación recomendada en Claude Code

Comandos para instalar las skills críticas en este proyecto:

```bash
# Identidad / marca / contenido
npx -y skills add anthropics/skills -s docx,pdf,pptx,xlsx,brand-guidelines,canvas-design,theme-factory,frontend-design,web-artifacts-builder,doc-coauthoring,internal-comms,mcp-builder,webapp-testing,claude-api -y

# Negocio / métricas / compliance
npx -y skills add wshobson/agents -s startup-metrics-framework,kpi-dashboard-design,startup-financial-modeling,market-sizing-analysis,competitive-landscape,gdpr-data-handling,pci-compliance,billing-automation,stripe-integration,prompt-engineering-patterns,langchain-architecture,rag-implementation,embedding-strategies,llm-evaluation,data-storytelling,visual-design-foundations,responsive-design,interaction-design,accessibility-compliance,wcag-audit-patterns,workflow-orchestration-patterns,workflow-patterns,incident-runbook-templates,employment-contract-templates -y

# Email transaccional
npx -y skills add cloudflare/skills -s cloudflare-email-service -y

# UX/auditoría web
npx -y skills add vercel-labs/agent-skills -s web-design-guidelines -y
```

29 skills activadas, suficientes para cubrir 34 de los 38 procesos a niveles
de automatización ≥ 50%.
