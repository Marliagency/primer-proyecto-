# 03 · Bitácora de búsquedas con `npx skills`

## Comportamiento real del comando

`npx skills find <query>` busca **únicamente entre skills ya instaladas**
en el proyecto o globalmente. Para descubrir skills nuevas hay que listar
los registries con `npx skills add <owner/repo> -l`. Esto cambia la lógica
del megaprompt: el "loop de búsqueda" es realmente un **ciclo de listar
registries → mapear catálogos → asignar**.

## Registries explorados

Se exploraron 6 registries cubriendo el ecosistema público conocido:

| # | Registry                       | Skills | Foco                                            |
| - | ------------------------------ | ------ | ----------------------------------------------- |
| 1 | `vercel-labs/skills`           | 1      | Meta (sólo `find-skills`)                       |
| 2 | `vercel-labs/agent-skills`     | 7      | React, Next.js, Vercel deploy, web design       |
| 3 | `anthropics/skills`            | 18     | Documentos, diseño, comunicación, dev tools     |
| 4 | `obra/superpowers`             | 14     | Planificación, code review, dev workflow        |
| 5 | `wshobson/agents`              | 151    | Backend, frontend, datos, ML, business, SRE     |
| 6 | `cloudflare/skills`            | 8      | Infra Cloudflare (Workers, email, DO, etc.)     |
|   | **TOTAL**                      | **199**|                                                 |

## Comandos ejecutados

```bash
# Confirmación de comportamiento
npx -y skills --help
npx -y skills list           # → 0 skills locales
npx -y skills list -g        # → solo startup-hook-skill

# Listado de registries
npx -y skills add vercel-labs/skills -l
npx -y skills add vercel-labs/agent-skills -l
npx -y skills add anthropics/skills -l
npx -y skills add obra/superpowers -l
npx -y skills add wshobson/agents -l
npx -y skills add cloudflare/skills -l

# Búsquedas en find (devuelven 0 porque no hay skills instaladas)
npx -y skills find crm
npx -y skills find chatbot
npx -y skills find email
npx -y skills find content
# + 30 queries adicionales (informe, report, document, pdf, docx,
#   canvas, brand, presentation, slide, spreadsheet, excel, automation,
#   workflow, notion, n8n, calendar, booking, lead, marketing, instagram,
#   linkedin, social, ads, testimonial, onboarding, seo, blog,
#   newsletter, video, voiceover, image, design, poster, carousel)
```

## Skills relevantes encontradas (extracto curado)

Filtradas a las 30 que tienen relación directa o adyacente con los procesos
de Marli. La lista completa de cada registry está en los listings del comando.

### Documentos y entregables

| Skill                | Registry             | Relevancia para Marli                            |
| -------------------- | -------------------- | ------------------------------------------------ |
| `docx`               | anthropics/skills    | Plantillas de informes Word del Kit de inicio    |
| `pdf`                | anthropics/skills    | Conversión informes finales · entrega a paciente |
| `pptx`               | anthropics/skills    | Mini-curso gratuito · presentaciones venta       |
| `xlsx`               | anthropics/skills    | KPI dashboard, reporting, métricas               |
| `doc-coauthoring`    | anthropics/skills    | Estructurar documentos largos (este mismo)       |

### Diseño y marca

| Skill                  | Registry             | Relevancia                                     |
| ---------------------- | -------------------- | ---------------------------------------------- |
| `brand-guidelines`     | anthropics/skills    | Plantilla para codificar identidad Marli       |
| `canvas-design`        | anthropics/skills    | Posters, piezas estáticas IG/LinkedIn          |
| `theme-factory`        | anthropics/skills    | Aplicar tema Marli a artefactos                |
| `frontend-design`      | anthropics/skills    | Landing del Pack Premium                       |
| `web-artifacts-builder`| anthropics/skills    | Landing Kit de inicio · landing Premium        |
| `visual-design-foundations` | wshobson/agents | Bases visuales del Kit de marca              |
| `responsive-design`    | wshobson/agents      | Landing móvil first                            |
| `interaction-design`   | wshobson/agents      | UX del funnel y CTAs                           |
| `web-design-guidelines`| vercel-labs/agent-skills | Auditoría UX de la landing                |
| `accessibility-compliance` / `wcag-audit-patterns` | wshobson/agents | RGPD/legal · accesibilidad |

### Comunicación y contenido

| Skill                  | Registry             | Relevancia                                     |
| ---------------------- | -------------------- | ---------------------------------------------- |
| `internal-comms`       | anthropics/skills    | Newsletter mensual · emails internos           |
| `data-storytelling`    | wshobson/agents      | Carruseles de dolor (8h perdidas, 30%, etc.)   |

### IA, chatbot y prompts (Li)

| Skill                  | Registry             | Relevancia                                     |
| ---------------------- | -------------------- | ---------------------------------------------- |
| `claude-api`           | anthropics/skills    | Construir Li sobre Claude API con caching      |
| `prompt-engineering-patterns` | wshobson/agents | Sistema de prompts para Li y para contenido |
| `langchain-architecture` | wshobson/agents    | Orquestación de Li si se usa LangChain         |
| `rag-implementation`   | wshobson/agents      | Li conectado al CRM como RAG sobre Notion      |
| `embedding-strategies` | wshobson/agents      | Búsqueda semántica de FAQ/manuales en Li       |
| `llm-evaluation`       | wshobson/agents      | Evaluar calidad de Li tras puesta en producción|
| `evaluation-methodology` | wshobson/agents    | Framework de evals para Li                     |

### Negocio, métricas y compliance

| Skill                       | Registry             | Relevancia                                |
| --------------------------- | -------------------- | ----------------------------------------- |
| `kpi-dashboard-design`      | wshobson/agents      | Dashboards de Marli (CPA, LTV, etc.)      |
| `startup-metrics-framework` | wshobson/agents      | Framework de métricas y KPIs              |
| `startup-financial-modeling`| wshobson/agents      | Modelado financiero del negocio           |
| `market-sizing-analysis`    | wshobson/agents      | Sizing del mercado de psicólogos          |
| `competitive-landscape`     | wshobson/agents      | Análisis competidores software clínico    |
| `gdpr-data-handling`        | wshobson/agents      | Cumplimiento RGPD del CRM y chatbot       |
| `pci-compliance`            | wshobson/agents      | Compliance del cobro                      |
| `billing-automation`        | wshobson/agents      | Mantenimiento recurrente · cobros         |
| `stripe-integration`        | wshobson/agents      | Cobro de Pack Premium y Mantenimiento     |
| `paypal-integration`        | wshobson/agents      | Alternativa de cobro                      |

### Infraestructura email

| Skill                       | Registry             | Relevancia                                |
| --------------------------- | -------------------- | ----------------------------------------- |
| `cloudflare-email-service`  | cloudflare/skills    | Envío transaccional del lead magnet       |

### Orquestación y operación

| Skill                              | Registry         | Relevancia                                  |
| ---------------------------------- | ---------------- | ------------------------------------------- |
| `mcp-builder`                      | anthropics/skills| Conectar Notion, n8n, Calendly vía MCP      |
| `webapp-testing`                   | anthropics/skills| QA de la landing (Playwright)               |
| `workflow-orchestration-patterns`  | wshobson/agents  | Patrones de orquestación tipo n8n           |
| `workflow-patterns`                | wshobson/agents  | Patrones generales workflow                 |
| `incident-runbook-templates`       | wshobson/agents  | Soporte / mantenimiento                     |

### Skills de Anthropic ya cargadas en este harness

Las siguientes están disponibles directamente vía la herramienta `Skill`
de este entorno: `claude-api`, `init`, `review`, `security-review`,
`simplify`, `update-config`, `keybindings-help`, `fewer-permission-prompts`,
`loop`, `session-start-hook`. Son útiles para gestión interna del proyecto
en Claude Code, no para los procesos de negocio de Marli (excepto
`claude-api`).
