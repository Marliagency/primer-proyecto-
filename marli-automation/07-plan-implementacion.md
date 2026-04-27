# 07 · Plan de implementación · Activación de skills alineada al plan 90 días

Secuencia de instalación y activación de skills sincronizada con las tres
fases del §13 del documento maestro: Validar, Sistematizar, Escalar.

## Día 0 · Setup base

```bash
cd /home/user/primer-proyecto-

# Instalar skills de identidad y producción de contenido inmediato
npx -y skills add anthropics/skills -s docx,brand-guidelines,canvas-design,theme-factory,frontend-design,web-artifacts-builder,doc-coauthoring,internal-comms,pptx,xlsx -y

# Instalar skills de chatbot y de IA aplicada
npx -y skills add anthropics/skills -s claude-api,mcp-builder -y
npx -y skills add wshobson/agents -s prompt-engineering-patterns,rag-implementation,embedding-strategies,llm-evaluation,langchain-architecture -y

# Instalar skills de email transaccional
npx -y skills add cloudflare/skills -s cloudflare-email-service -y
```

**Resultado del Día 0**: 15 skills disponibles para empezar a producir
plantillas, landing y arrancar el chatbot.

## Fase 1 · Días 1-30 · VALIDAR

Objetivo del doc: 5 primeras ventas + 3 testimonios.

### Skills críticas que ya están en Día 0

- `docx` + `brand-guidelines` → producir las 3-5 plantillas Word del Kit
  de inicio (P07). **Bloquea el lead magnet — debe ser Día 1-3**.
- `canvas-design` + `theme-factory` → Kit de Marca en Canva con la paleta
  oficial (P19).
- `web-artifacts-builder` + `frontend-design` → landing del Kit y landing
  del Pack Premium (P08, P26).
- `cloudflare-email-service` + `internal-comms` → email automatizado de
  entrega del lead magnet (P09).
- `internal-comms` + `data-storytelling` → primeros 8-10 carruseles
  (P16, P17).
- `claude-api` + `prompt-engineering-patterns` → primer prototipo de Li
  para una demo de ventas (P03 inicial).

### Skills a añadir en Fase 1

```bash
# Compliance y cobro (necesarios antes de la primera venta)
npx -y skills add wshobson/agents -s gdpr-data-handling,pci-compliance,stripe-integration,billing-automation -y

# UX / accesibilidad de la landing
npx -y skills add wshobson/agents -s responsive-design,interaction-design,accessibility-compliance,wcag-audit-patterns -y
npx -y skills add vercel-labs/agent-skills -s web-design-guidelines -y
npx -y skills add anthropics/skills -s webapp-testing -y
```

### Construcción custom en Fase 1

- `notion-crm` (skill custom) — bloquea P01 y por tanto P02, P03 reales.
  Hay que escribirla esta fase con `skill-creator` y `mcp-builder`.

## Fase 2 · Días 31-60 · SISTEMATIZAR

Objetivo del doc: VSL grabado + Meta Ads + email post-llamada + lead
magnet a escala + iteración de oferta.

### Skills a añadir en Fase 2

```bash
# Métricas y reporting (ya hay datos para medir)
npx -y skills add wshobson/agents -s startup-metrics-framework,kpi-dashboard-design,startup-financial-modeling -y

# Workflow de operación
npx -y skills add wshobson/agents -s workflow-orchestration-patterns,workflow-patterns,incident-runbook-templates -y
```

### Acciones operativas

- Conectar Calendly (P27) por webhook al email post-llamada
  (`cloudflare-email-service` + `internal-comms`).
- Activar el dashboard de KPIs del §17 con `kpi-dashboard-design` + `xlsx`.
- Lanzar el blog (P23-P25): `claude-api` + `prompt-engineering-patterns`
  + `internal-comms` para los primeros 4-8 artículos.

### Construcción custom en Fase 2

- `meta-ads` (skill custom). Sólo si el funnel manual de Fase 1 valida
  CPA < 200€ y se justifica escalar. Si no, posponer a Fase 3.
- `seo-on-page` (skill custom) si se confirma el blog como activo.

## Fase 3 · Días 61-90 · ESCALAR

Objetivo del doc: flujo predecible mensual + LinkedIn Ads + partners +
mini-curso.

### Skills a añadir en Fase 3

```bash
# Análisis estratégico para roadmap H2/H3
npx -y skills add wshobson/agents -s market-sizing-analysis,competitive-landscape -y

# Partners
npx -y skills add wshobson/agents -s employment-contract-templates -y
```

### Acciones operativas

- Producción del mini-curso gratuito (P22) — slides con `pptx` y guion
  con `doc-coauthoring`.
- Auditoría completa de la landing con `web-design-guidelines` y
  `wcag-audit-patterns`.
- Evaluación de calidad de Li con `llm-evaluation` antes de exposición
  pública 24/7.

### Construcción custom en Fase 3

- `linkedin-ads` y/o `instagram-publish` si el volumen lo justifica.

## Tabla de skills activas por fase

| Fase   | Skills acumuladas | Procesos cubiertos ≥ 50% |
| ------ | -----------------: | -----------------------: |
| Día 0  | 15                | 18 / 38                  |
| Fase 1 | 24                | 27 / 38                  |
| Fase 2 | 30                | 32 / 38                  |
| Fase 3 | 33                | 34 / 38                  |

Los 4 procesos restantes son los gaps puros documentados en
`06-gaps-y-skills-faltantes.md`.

## Punto de control: el siguiente paso real

Según el §12.5 y §13 del doc maestro, el bloqueador inmediato es
producir el Kit de inicio. La primera acción concreta de implementación
es:

```bash
# Activar las dos skills que bloquean el Día 1
npx -y skills add anthropics/skills -s docx,brand-guidelines -y

# Después: pedir a Claude que genere las 5 plantillas con identidad Marli
```

Sin esto, el lead magnet no existe y todo el funnel de Fase 1 queda
parado. Es el ROI más alto de las primeras horas de trabajo.
