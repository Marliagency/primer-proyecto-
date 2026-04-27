# 04 · Mapa de skills asignadas

Tabla maestra: cada uno de los 38 procesos cruzado con la skill (o
combinación) asignada, justificación y nivel de automatización realista
expresado en porcentaje. El nivel mide cuánto del proceso queda cubierto
por la skill; el resto es trabajo manual o requiere construir lo faltante
(ver `06-gaps-y-skills-faltantes.md`).

Leyenda:

- ✅ Skill nativa exacta o casi exacta
- 🟡 Skill parcial / adaptable (el grueso del trabajo lo hace, pero hay
  parte específica de Marli a construir)
- 🔴 Sin skill nativa · gap del ecosistema (resuelto por construcción
  custom o herramienta externa, no por skill)

## A · Producto y operaciones

| ID  | Proceso                          | Skill asignada                                              | Marca | Auto. | Justificación                                                                                  |
| --- | -------------------------------- | ----------------------------------------------------------- | ----- | ----- | ---------------------------------------------------------------------------------------------- |
| P01 | CRM en Notion                    | `mcp-builder` + integración Notion MCP                       | 🔴    | 30%   | No hay skill de CRM/Notion. Se construye un MCP server sobre Notion API guiado por `mcp-builder`. |
| P02 | Informes clínicos automatizados  | `docx` + `pdf` + `claude-api` + `mcp-builder` (n8n)          | 🟡    | 70%   | `docx` rellena plantilla, `pdf` exporta, `claude-api` redacta. n8n orquesta vía MCP custom.     |
| P03 | Chatbot Li 24/7                  | `claude-api` + `prompt-engineering-patterns` + `rag-implementation` + `embedding-strategies` + `llm-evaluation` | ✅ | 85% | Cinco skills cubren build, prompts, RAG sobre CRM, evals. Falta canal (WhatsApp/web) custom.  |
| P04 | Mantenimiento mensual            | `billing-automation` + `stripe-integration` + `incident-runbook-templates` | 🟡 | 75% | Cobro recurrente cubierto. Soporte y actualizaciones requieren proceso manual + runbook.     |
| P05 | Instalación del sistema          | `doc-coauthoring` (manual) + `pptx` (vídeo) + `webapp-testing` (verificación) | 🟡 | 50% | Documentación y guion sí, pero el vídeo paso a paso de 20 min se graba aparte. |
| P06 | Cumplimiento RGPD                | `gdpr-data-handling` + `pci-compliance`                      | ✅    | 80%   | Skill cubre handling, política, derechos ARSUPL. PCI cubre el flujo de cobro.                  |

## B · Captación y lead magnet

| ID  | Proceso                              | Skill asignada                                          | Marca | Auto. | Justificación                                                                            |
| --- | ------------------------------------ | ------------------------------------------------------- | ----- | ----- | ---------------------------------------------------------------------------------------- |
| P07 | Plantillas Word del Kit              | `docx` + `brand-guidelines` (adaptado a Marli)          | ✅    | 95%   | `docx` genera 3-5 plantillas con identidad Marli. Una pasada y queda.                    |
| P08 | Landing del lead magnet              | `web-artifacts-builder` + `frontend-design` + `theme-factory` + `responsive-design` | ✅ | 90% | Landing simple con captura email cubierta extremo a extremo. |
| P09 | Email de entrega del lead magnet     | `cloudflare-email-service`                              | ✅    | 90%   | Envío transaccional Workers/REST. SPF/DKIM/DMARC en la skill.                            |
| P10 | Secuencia nurturing 5-7 emails       | `cloudflare-email-service` + `internal-comms` (copy)    | 🟡    | 65%   | Envío resuelto. Programación temporal y A/B testing requiere lógica custom (queue/cron). |
| P11 | Newsletter mensual                   | `internal-comms` + `cloudflare-email-service`           | ✅    | 85%   | Copy + entrega. Falta plataforma de gestión de listas si crece.                          |
| P12 | Anuncios Meta Ads                    | —                                                       | 🔴    | 0%    | Sin skill de Meta/Facebook Ads en ningún registry. Manual o herramienta externa.         |
| P13 | Anuncios LinkedIn Ads                | —                                                       | 🔴    | 0%    | Sin skill de LinkedIn Ads. Manual.                                                       |
| P14 | Outreach manual LinkedIn (100/mes)   | `internal-comms` (templates de mensajes)                | 🟡    | 35%   | Skill ayuda con copy de mensajes. Envío no — y no debería automatizarse (TOS LinkedIn).  |
| P15 | Programa de partners (100€/referido) | `employment-contract-templates`                          | 🟡    | 40%   | Cubre el contrato. Tracking del referido es lógica de negocio custom.                    |

## C · Contenido orgánico

| ID  | Proceso                                | Skill asignada                                            | Marca | Auto. | Justificación                                                                          |
| --- | -------------------------------------- | --------------------------------------------------------- | ----- | ----- | -------------------------------------------------------------------------------------- |
| P16 | Carruseles Instagram (2-3/sem)         | `canvas-design` + `data-storytelling` + `internal-comms`  | 🟡    | 60%   | Diseño + copy + narrativa de dolor. Publicación manual via Canva → IG.                 |
| P17 | Carruseles + texto LinkedIn (2/sem)    | `canvas-design` + `internal-comms`                        | 🟡    | 60%   | Igual que P16. LinkedIn permite mejor el formato texto largo, cubierto por la skill.   |
| P18 | Banco de 20 prompts Midjourney         | `prompt-engineering-patterns`                              | ✅    | 90%   | Skill estructura prompts reutilizables. La generación se hace en Midjourney (externo). |
| P19 | Kit de marca Canva                     | `brand-guidelines` + `theme-factory` + `visual-design-foundations` | ✅ | 90% | Tres skills cubren codificación de marca, aplicación temática y bases visuales.    |
| P20 | VSL de la landing                      | `pptx` (storyboard) + `internal-comms` (guion)            | 🟡    | 50%   | Guion y slides sí. Voz/edición vídeo es trabajo externo (Descript, ElevenLabs).        |
| P21 | Storytelling de Li                     | `internal-comms` + `prompt-engineering-patterns`          | ✅    | 85%   | Construir la voz de Li como personaje narrativo recurrente.                            |
| P22 | Mini-curso gratuito (3 vídeos)         | `pptx` + `doc-coauthoring`                                | 🟡    | 50%   | Estructura y slides. Grabación manual.                                                 |

## D · Blog y SEO

| ID  | Proceso                            | Skill asignada                                        | Marca | Auto. | Justificación                                                                  |
| --- | ---------------------------------- | ----------------------------------------------------- | ----- | ----- | ------------------------------------------------------------------------------ |
| P23 | Artículos blog SEO (1/sem)         | `claude-api` + `prompt-engineering-patterns` + `internal-comms` | ✅ | 80% | Pipeline LLM para artículos largos con prompt cacheado de tono Marli.        |
| P24 | Estructura SEO técnica             | —                                                     | 🔴    | 0%    | Sin skill SEO específica. Se cubre con prompts curados sobre LLM.              |
| P25 | WordPress en marliagency.com/blog  | `frontend-design` (tema) · resto manual               | 🟡    | 25%   | Tema y look-and-feel sí. Setup, hosting y plugins WP fuera del ecosistema.     |

## E · Ventas y conversión

| ID  | Proceso                          | Skill asignada                                                  | Marca | Auto. | Justificación                                                                  |
| --- | -------------------------------- | --------------------------------------------------------------- | ----- | ----- | ------------------------------------------------------------------------------ |
| P26 | Landing Pack Premium con VSL     | `web-artifacts-builder` + `frontend-design` + `theme-factory` + `interaction-design` + `web-design-guidelines` + `accessibility-compliance` | ✅ | 90% | Stack completo de landing premium con auditoría UX y accesibilidad. |
| P27 | Calendly                         | —                                                               | 🔴    | 10%   | Sin skill. Calendly se configura una vez, integración con email vía webhooks.  |
| P28 | Videollamada de cierre con guion | `doc-coauthoring` (guion) + `internal-comms`                    | 🟡    | 30%   | Producir el guion sí. La llamada en sí es humana, no automatizable.            |
| P29 | Email post-llamada con caducidad | `internal-comms` + `cloudflare-email-service`                   | ✅    | 75%   | Copy + envío. Trigger desde Calendly requiere webhook custom.                  |
| P30 | Casos de éxito y testimoniales   | `data-storytelling` + `internal-comms` + `web-artifacts-builder`| 🟡    | 60%   | Producir la pieza una vez tienes el material. Captura del testimonial es humana.|
| P31 | Upsell Mantenimiento             | `internal-comms` (script)                                       | 🟡    | 30%   | Script al cierre, ejecución humana en la llamada.                              |
| P32 | Cobro Pack Premium / Mantenimiento | `stripe-integration` + `billing-automation` + `pci-compliance` | ✅    | 85%   | Cobertura completa de cobro único + recurrente compliant.                      |

## F · Onboarding y postventa

| ID  | Proceso                          | Skill asignada                                  | Marca | Auto. | Justificación                                                                |
| --- | -------------------------------- | ----------------------------------------------- | ----- | ----- | ---------------------------------------------------------------------------- |
| P33 | Vídeo paso a paso instalación    | `pptx` + `doc-coauthoring`                      | 🟡    | 40%   | Estructura y guion. Grabación de pantalla manual.                            |
| P34 | Email bienvenida + 7 días        | `cloudflare-email-service` + `internal-comms`   | ✅    | 80%   | Secuencia transaccional con triggers en n8n.                                 |
| P35 | Solicitud testimonio a 30 días   | `cloudflare-email-service` + `internal-comms`   | ✅    | 80%   | Igual que P34, cron a 30 días.                                               |

## G · Estrategia, métricas e identidad

| ID  | Proceso                                  | Skill asignada                                      | Marca | Auto. | Justificación                                                          |
| --- | ---------------------------------------- | --------------------------------------------------- | ----- | ----- | ---------------------------------------------------------------------- |
| P36 | KPIs y reporting                         | `kpi-dashboard-design` + `startup-metrics-framework` + `xlsx` | ✅ | 90% | Framework de KPIs + dashboard + export. Cubre métricas del §17. |
| P37 | Análisis de mercado / sizing             | `market-sizing-analysis` + `competitive-landscape` + `startup-financial-modeling` | ✅ | 95% | Skill nativa para los tres ejes del §8. |
| P38 | Manejo de objeciones                     | `internal-comms` + `prompt-engineering-patterns`    | ✅    | 85%   | Construir biblioteca de respuestas como prompts y emails reutilizables.|

## Resumen agregado

| Marca de cobertura | Procesos | %      |
| ------------------ | -------: | -----: |
| ✅ Skill nativa    | 18       | 47,4 % |
| 🟡 Parcial         | 16       | 42,1 % |
| 🔴 Gap             | 4        | 10,5 % |

Procesos en gap puro: **P01 (Notion), P12 (Meta Ads), P13 (LinkedIn Ads),
P24 (SEO técnico)**. Más detalle y plan en `06-gaps-y-skills-faltantes.md`.
