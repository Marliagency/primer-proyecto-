---
type: moc
tags: [skills, database, nucleo]
status: active
updated: 2026-04-27
---

# Skills Database · Núcleo del sistema

Catálogo vivo de skills usadas o planificadas en Marli. Cada skill es
una entrada con frontmatter consultable por Dataview.

## Vista global

```dataview
TABLE registry as "Registry", categoria as "Categoría", nivel_automatizacion as "Auto%", procesos_relacionados as "Procesos"
FROM "03-SKILLS-SYSTEM"
WHERE type = "skill"
SORT categoria, file.name
```

> Mientras no esté el plugin Dataview activo, ver tabla manual abajo.

## Tabla manual (fallback)

| Skill | Registry | Categoría | Auto% | Status |
|---|---|---|---:|---|
| docx | anthropics/skills | docs | 95 | active |
| pdf | anthropics/skills | docs | 90 | active |
| pptx | anthropics/skills | docs | 80 | active |
| xlsx | anthropics/skills | docs | 90 | active |
| brand-guidelines | anthropics/skills | diseño | 90 | active |
| canvas-design | anthropics/skills | diseño | 80 | active |
| theme-factory | anthropics/skills | diseño | 85 | active |
| frontend-design | anthropics/skills | diseño | 90 | active |
| web-artifacts-builder | anthropics/skills | web | 90 | active |
| webapp-testing | anthropics/skills | qa | 80 | active |
| internal-comms | anthropics/skills | comunicación | 85 | active |
| doc-coauthoring | anthropics/skills | docs | 80 | active |
| claude-api | anthropics/skills | ia | 90 | active |
| mcp-builder | anthropics/skills | integración | 80 | active |
| prompt-engineering-patterns | wshobson/agents | ia | 90 | active |
| rag-implementation | wshobson/agents | ia | 85 | active |
| embedding-strategies | wshobson/agents | ia | 80 | active |
| llm-evaluation | wshobson/agents | ia | 85 | active |
| langchain-architecture | wshobson/agents | ia | 75 | planned |
| data-storytelling | wshobson/agents | comunicación | 85 | active |
| visual-design-foundations | wshobson/agents | diseño | 80 | active |
| responsive-design | wshobson/agents | web | 90 | active |
| interaction-design | wshobson/agents | web | 80 | active |
| accessibility-compliance | wshobson/agents | web | 85 | active |
| wcag-audit-patterns | wshobson/agents | web | 80 | active |
| web-design-guidelines | vercel-labs/agent-skills | web | 85 | active |
| kpi-dashboard-design | wshobson/agents | datos | 90 | active |
| startup-metrics-framework | wshobson/agents | datos | 90 | active |
| startup-financial-modeling | wshobson/agents | finanzas | 85 | active |
| market-sizing-analysis | wshobson/agents | estrategia | 90 | active |
| competitive-landscape | wshobson/agents | estrategia | 85 | active |
| gdpr-data-handling | wshobson/agents | compliance | 80 | active |
| pci-compliance | wshobson/agents | compliance | 80 | active |
| billing-automation | wshobson/agents | finanzas | 85 | active |
| stripe-integration | wshobson/agents | finanzas | 90 | active |
| paypal-integration | wshobson/agents | finanzas | 70 | planned |
| cloudflare-email-service | cloudflare/skills | email | 90 | active |
| workflow-orchestration-patterns | wshobson/agents | automatización | 85 | active |
| workflow-patterns | wshobson/agents | automatización | 80 | active |
| incident-runbook-templates | wshobson/agents | operaciones | 80 | active |
| employment-contract-templates | wshobson/agents | legal | 70 | active |
| **notion-crm** | _custom_ | integración | 0 | **gap** |
| **meta-ads** | _custom_ | ads | 0 | **gap** |
| **linkedin-ads** | _custom_ | ads | 0 | **gap** |
| **seo-on-page** | _custom_ | seo | 0 | **gap** |

## Notas relacionadas

- [[Skills-Categories]]
- [[Skills-Execution-Flows]]
- [[Skills-Automation-Layer]]
- Mapeo a procesos: ver `marli-automation/04-mapa-skills-asignadas.md`
- Análisis de gaps: ver `marli-automation/06-gaps-y-skills-faltantes.md`

## Comandos para activar (Día 0)

```bash
npx -y skills add anthropics/skills -s docx,brand-guidelines,canvas-design,theme-factory,frontend-design,web-artifacts-builder,doc-coauthoring,internal-comms,pptx,xlsx,claude-api,mcp-builder,webapp-testing -y
npx -y skills add wshobson/agents -s prompt-engineering-patterns,rag-implementation,embedding-strategies,llm-evaluation,data-storytelling -y
npx -y skills add cloudflare/skills -s cloudflare-email-service -y
```

Resto de instalaciones en [[../06-MARKETING/Plan-90-Dias|Plan 90 días]].
