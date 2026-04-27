---
type: integracion
tags: [integracion, n8n, automatizacion]
status: wip
permisos_minimos: "self-hosted controlado por nosotros, o cuenta n8n Cloud Pro"
credenciales: "N8N_HOST, N8N_ENCRYPTION_KEY, webhook URLs"
updated: 2026-04-27
---

# Integración · n8n

## Función

Orquestador central. Conecta Notion, Stripe, Cloudflare Email, Calendly,
Anthropic API y todos los workflows del sistema.

## Modelos de despliegue

| Modelo | Pros | Contras | Recomendado |
|---|---|---|---|
| n8n Cloud (Pro) | Sin ops, gestionado | Coste mensual, limites | Fase 1-2 |
| Self-hosted (Docker en VPS) | Coste fijo, control total | Mantenimiento | Fase 3+ |
| Self-hosted (Railway / Fly) | Bajo ops, despliegue fácil | Coste medio | Fase 1-2 alternativa |

## Workflows definidos

Ver [[../04-AUTOMATIZACIONES/_INDEX]]. Los críticos:

1. [[../04-AUTOMATIZACIONES/Automatizacion-Lead-Magnet]]
2. [[../04-AUTOMATIZACIONES/Automatizacion-Informes-n8n]]
3. [[../04-AUTOMATIZACIONES/Automatizacion-Chatbot-Li]]
4. [[../04-AUTOMATIZACIONES/Automatizacion-Cobro]]
5. [[../04-AUTOMATIZACIONES/Automatizacion-Onboarding]]

## Credenciales

```
N8N_HOST
N8N_ENCRYPTION_KEY  # crítico, no rotar nunca
N8N_WEBHOOK_URL_LEAD_MAGNET
N8N_WEBHOOK_URL_STRIPE
N8N_WEBHOOK_URL_CALENDLY
```

> ⚠️ `N8N_ENCRYPTION_KEY` cifra todas las credenciales almacenadas en n8n.
> Si la pierdes, pierdes todas. Si la rotas sin migración, lo mismo.
> Backup en gestor de secretos personal (1Password / similar).

## Versionado de workflows

- Exportar cada workflow como JSON tras cada cambio mayor.
- Almacenar en `n8n-exports/` (gitignored si contiene credenciales,
  scrubbed si no).
- Plantilla de naming: `YYYY-MM-DD-nombre-workflow-vN.json`.

## Observabilidad

- Logs en n8n (UI)
- Errores críticos → Telegram (`TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID_OPS`)
- Sentry para errores no capturados (`SENTRY_DSN`)

## Estado

`wip` — pendiente:

- [ ] Decidir hosting (Cloud vs self-hosted)
- [ ] Generar `N8N_ENCRYPTION_KEY` y guardar en gestor
- [ ] Configurar credenciales para Notion, Stripe, Cloudflare, Anthropic
- [ ] Construir primer workflow: Lead Magnet

## Ver también

- [[../03-SKILLS-SYSTEM/Skills-Automation-Layer]]
- [[../04-AUTOMATIZACIONES/_INDEX]]
- [[Runbook-Incidentes]]
