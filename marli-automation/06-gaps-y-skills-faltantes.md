# 06 · Gaps detectados · Skills que no existen aún en el ecosistema

Después de explorar 6 registries y 199 skills, hay 4 procesos sin
cobertura nativa y 16 con cobertura parcial. Esta sección documenta
exactamente qué falta, por qué, y la propuesta de cierre.

## Gaps puros (sin skill en ningún registry)

### 1 · `notion-crm` — Integración con Notion

**Procesos afectados**: P01 (núcleo CRM), parcialmente P02, P03, P34, P35
(todos los que leen/escriben en Notion).

**Por qué no existe**: ningún registry incluye una skill que documente
patrones de uso de la Notion API: bases de datos, propiedades, filtros,
plantillas, relations. Notion es un caso recurrente pero está suelto en
ejemplos de código, no codificado como skill.

**Propuesta de cierre**: construir una skill `notion-crm` con
`skill-creator` (anthropics/skills) que cubra:

- Autenticación Notion (integration token, OAuth para multi-tenant).
- Modelado del CRM Marli en Notion: pacientes, citas, sesiones, informes,
  tareas (siguiendo el §5.1 del doc maestro).
- Patrones de query/filter para obtener "próximas 24h", "pacientes
  activos", "sesiones sin informe".
- Sincronización con n8n vía webhooks.

Hasta que exista la skill, el trabajo se hace combinando `mcp-builder`
(para envolver la API de Notion como MCP server) y código a mano.

### 2 · `meta-ads` — Anuncios Facebook/Instagram Ads

**Procesos afectados**: P12 (Meta Ads en Fase 2 y 3 del plan 90 días).

**Por qué no existe**: ningún registry tiene skill de Meta Marketing API,
Pixel, Conversion API ni gestión de campañas.

**Propuesta de cierre**: priorizar baja porque la inversión inicial es
15-25 €/día y la curva manual es asumible. Si se escala (Fase 3 con CPA
< 200 €), construir una skill `meta-ads` con `skill-creator` que cubra:

- Setup del Pixel + Conversion API.
- Estructura de campañas Awareness → Consideration → Conversion.
- Públicos LookAlike a partir del CRM Notion (P01 cerrado).
- Plantillas de copy alineadas con el §9 del doc maestro.

Mientras tanto: gestión manual desde Ads Manager.

### 3 · `linkedin-ads` — Anuncios LinkedIn

**Procesos afectados**: P13 (LinkedIn Ads en Fase 3).

**Por qué no existe**: igual que P12, sin skill nativa.

**Propuesta de cierre**: posponer a Fase 3 del plan 90 días. Volumen
mucho más bajo que Meta. Construcción de skill no compensa hoy.

### 4 · `seo-on-page` — SEO técnico

**Procesos afectados**: P24 (estructura H1/H2/H3, meta, schema), parcial
P23 (los artículos).

**Por qué no existe**: hay `prompt-engineering-patterns` y `internal-comms`
para producir el contenido, pero ninguna skill que codifique reglas SEO
on-page (longitudes, densidad de keywords, schema, internal linking,
core web vitals).

**Propuesta de cierre**: aprovechar `prompt-engineering-patterns` para
crear una mega-prompt-template SEO específica para el sector psicología
(títulos del §16.5). Para auditoría técnica, usar `web-perf` de
`cloudflare/skills` (Core Web Vitals) y `webapp-testing` (estructura).

## Gaps parciales (skill cubre menos del 70%)

| ID  | Proceso                              | Cobertura | Lo que falta                                                               |
| --- | ------------------------------------ | --------- | -------------------------------------------------------------------------- |
| P05 | Instalación del sistema              | 50 %      | Grabación del vídeo de 20 min y testing en cuentas demo de psicólogos.     |
| P10 | Nurturing 5-7 emails                 | 65 %      | Lógica temporal y A/B testing — construir en n8n.                          |
| P14 | Outreach LinkedIn                    | 35 %      | Envío manual obligatorio (TOS LinkedIn). Sólo automatizable el copy.       |
| P15 | Programa de partners                 | 40 %      | Tracking de referido y atribución requiere tabla en Notion + logic n8n.    |
| P16 | Carruseles Instagram                 | 60 %      | Publicación final manual desde Canva → IG.                                  |
| P17 | Carruseles + texto LinkedIn          | 60 %      | Idem que P16.                                                               |
| P20 | VSL de la landing                    | 50 %      | Edición de vídeo y voz en off (Descript / ElevenLabs externos).             |
| P22 | Mini-curso gratuito                  | 50 %      | Grabación manual de los 3 vídeos.                                           |
| P25 | WordPress blog                       | 25 %      | Setup de WordPress, plugins, hosting fuera del ecosistema.                  |
| P27 | Calendly                             | 10 %      | Calendly se configura en su SaaS. Integración por webhooks custom.          |
| P28 | Videollamada de cierre               | 30 %      | La llamada es humana. Sólo el guion es automatizable.                       |
| P30 | Casos de éxito                       | 60 %      | Grabación del testimonial es trabajo de campo.                              |
| P31 | Upsell Mantenimiento                 | 30 %      | Ejecución verbal en llamada — sólo el script y el email se automatizan.    |
| P33 | Vídeo paso a paso instalación        | 40 %      | Grabación de pantalla manual.                                               |

## Conclusiones del análisis de gaps

1. **El ecosistema de skills cubre bien tareas técnicas y de contenido**
   (documentos, diseño, copy, KPIs, compliance, infra). Cubre mal las
   integraciones con SaaS verticales (Notion, Calendly, Meta Ads, LinkedIn
   Ads, Instagram Publishing, Stripe ya está, Mailchimp/Resend tampoco).

2. **El gap de mayor impacto es Notion (P01)** porque el CRM es el cerebro
   del producto. Es la primera skill que conviene construir custom, y
   `mcp-builder` da el camino: convertir la API de Notion en MCP server
   reutilizable por el resto del sistema.

3. **Los gaps de ads (P12, P13) no son urgentes** en Fase 1 del plan 90
   días. El presupuesto y la complejidad no justifican construir skills
   antes de validar el funnel manual.

4. **Los gaps parciales en contenido (P16, P17, P20, P22)** son inherentes
   al hecho de que IG/LinkedIn no tienen API limpia para publicar
   carruseles o vídeo de marca: parte del trabajo seguirá siendo manual
   independientemente de las skills.

5. **El nivel global de automatización alcanzable hoy** con el ecosistema
   existente es ~70% del trabajo descrito en el documento maestro v3.0.
   Subirlo al 90% requiere construir 4-5 skills custom (`notion-crm`,
   `seo-on-page`, `meta-ads`, `linkedin-ads`, opcional `instagram-publish`).
