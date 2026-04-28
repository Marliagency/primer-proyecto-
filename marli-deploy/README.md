# Marli Deploy — Artefactos Ejecutables

Esta carpeta contiene todo lo necesario para **desplegar el sistema Marli**: schemas de bases de datos, workflows de n8n importables, custom skills, runbooks y checklists.

A diferencia de `control-empresa/` (vault Obsidian, capa estratégica/documental), **esto sí se ejecuta**.

## Estructura

```
marli-deploy/
├── notion-schemas/      ← JSONs para crear las DBs Notion via API
├── n8n-workflows/       ← workflows JSON importables en n8n (drag & drop)
├── skills/              ← custom skills (notion-crm-manager, system-prompt-li)
└── runbooks/            ← guías paso-a-paso de despliegue
```

## Orden de despliegue (Fase 1 — primeros 30 días)

1. **Notion** — `runbooks/01-setup-notion.md`
   - Crear las 5 DBs (Leads, Clientes, Pacientes, Sesiones, Tareas)
   - Configurar internal integration y obtener tokens
2. **n8n** — `runbooks/02-setup-n8n.md`
   - Crear workspace (Cloud Pro recomendado)
   - Configurar credentials (Notion, Stripe, Cloudflare, Anthropic)
3. **Stripe** — `runbooks/03-setup-stripe.md`
   - Crear los 3 productos (Pack, Pack+install, Mantenimiento)
   - Configurar webhooks
4. **Cloudflare Email** — `runbooks/04-setup-cloudflare-email.md`
   - DNS records (SPF, DKIM, DMARC)
   - API key con scope mínimo
5. **Importar workflows** — `runbooks/05-import-workflows.md`
   - Lead-Magnet, Cobro, Onboarding, Informes (orden recomendado)
6. **Pre-launch** — `runbooks/06-pre-launch-checklist.md`
   - Validación end-to-end antes de aceptar el primer cliente real

## Fase 2 (días 31-60)

- `n8n-workflows/05-chatbot-li.json` (requiere RAG + embeddings setup)
- `skills/system-prompt-li/` (packaging del system prompt)

## Fase 3 (días 61-90)

- `n8n-workflows/06-recordatorios.json` (cron WhatsApp)
- Programa de partners, blog, Meta/LinkedIn ads

## Convenciones

- **Credenciales**: NUNCA en este repo. Usar `.env` (git-ignored) según `control-empresa/11-INTEGRACIONES/credenciales.env.example`.
- **Skills**: siguen el formato Anthropic (`SKILL.md` con frontmatter `name`, `description`).
- **Workflows n8n**: exportados desde n8n con `Cmd+A → Cmd+C` o "Download JSON". Importables con drag & drop.
- **Notion schemas**: formato compatible con `POST /v1/databases` de la Notion API.

## Ver también

- `../control-empresa/` — vault Obsidian con la documentación estratégica
- `../marli-automation/` — análisis inicial de skills y mapping de procesos
