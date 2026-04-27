---
type: dashboard
tags: [control-center, automatizaciones, n8n]
status: active
updated: 2026-04-27
---

# Estado de Automatizaciones

## Vista global

```dataview
TABLE status, trigger, last_run
FROM "04-AUTOMATIZACIONES"
WHERE type = "automatizacion"
SORT status DESC, file.name
```

## Salud por workflow

| Workflow | Status | Última ejecución | Última error |
|---|---|---|---|
| [[../04-AUTOMATIZACIONES/Automatizacion-Lead-Magnet]] | wip | — | — |
| [[../04-AUTOMATIZACIONES/Automatizacion-Informes-n8n]] | wip | — | — |
| [[../04-AUTOMATIZACIONES/Automatizacion-Chatbot-Li]] | wip | — | — |
| [[../04-AUTOMATIZACIONES/Automatizacion-Cobro]] | wip | — | — |
| [[../04-AUTOMATIZACIONES/Automatizacion-Onboarding]] | wip | — | — |
| [[../04-AUTOMATIZACIONES/Automatizacion-Recordatorios]] | idea | — | — |

## Tasa de éxito (cuando estén en producción)

| Workflow | Ejecuciones 7d | Éxitos | Errores | % éxito |
|---|---:|---:|---:|---:|
| Lead Magnet | _ | _ | _ | _ |
| Informes | _ | _ | _ | _ |
| Chatbot Li | _ | _ | _ | _ |
| Cobro | _ | _ | _ | _ |
| Onboarding | _ | _ | _ | _ |

(Datos directos del API de n8n. Pendiente de implementar exporter a este
dashboard.)

## Ver también

- [[../04-AUTOMATIZACIONES/_INDEX]]
- [[../11-INTEGRACIONES/Integracion-n8n]]
- [[Alertas-Sistema]]
