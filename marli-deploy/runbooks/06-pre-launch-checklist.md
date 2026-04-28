# Runbook 06 — Pre-Launch Checklist (Go/No-Go)

**Tiempo estimado**: 2-4h
**Pre-requisitos**: runbooks 01-05 completados
**Output**: decisión Go o No-Go para aceptar el primer cliente real con dinero real

> Este checklist es la **frontera entre prueba y producción**. Marca ✅ cada ítem cuando lo hayas verificado tú mismo (no asumir). Si CUALQUIER ítem rojo no se puede marcar → **NO LANCES**. Itera y vuelve.

---

## A. Cuestiones existenciales (no-go si fallan)

- [ ] **Encryption key n8n** está respaldada en al menos 2 sitios (password manager + ubicación física separada).
- [ ] **`.env` de producción** está fuera del repo git (verificar con `git status` y `git log --all --full-history -- .env`).
- [ ] **Stripe está en modo Live** (no Test) — verificar dashboard top-right.
- [ ] **Notion integration tokens** son distintos para Marli interno vs cliente psicólogo.
- [ ] **SECURITY.md** ha sido leído y aceptado por todos los humanos del proyecto.

---

## B. Infraestructura

### Notion

- [ ] 5 DBs creadas: Leads, Clientes, Pacientes, Sesiones, Tareas
- [ ] Schema de cada DB coincide con `/marli-deploy/notion-schemas/*.json`
- [ ] Integration `Marli — Internal CRM` tiene acceso SOLO a Leads + Clientes
- [ ] Integration `Marli — Cliente Psicólogo` tiene acceso SOLO a Pacientes + Sesiones + Tareas
- [ ] Test de conectividad: `node notion-crm-manager.mjs --op snapshot_pipeline` retorna 0 leads (DB vacía OK)

### n8n

- [ ] Plan Cloud Pro activo (o self-hosted + monitoring funcionando)
- [ ] URL pública responde en `< 1s` con TLS válido
- [ ] Variables de entorno ALL configuradas (verificar con script `check-env.mjs` de runbook 02)
- [ ] Credentials creadas: `notion-marli`, `notion-cliente`, `stripe-restricted-key`
- [ ] Encryption key respaldada (ver A)

### Stripe

- [ ] Cuenta verificada (KYC completado)
- [ ] 8 productos creados en modo Live
- [ ] Restricted Key creada con scopes mínimos (no Secret Key)
- [ ] Webhook endpoint creado apuntando a `${N8N_BASE_URL}/webhook/stripe-webhook`
- [ ] Webhook signing secret guardado en `.env`
- [ ] Test webhook desde Stripe dashboard → llega a n8n y se procesa OK
- [ ] Tax automático configurado (España: 21% servicios)
- [ ] Stripe Invoicing activado

### Email (Cloudflare/MailChannels)

- [ ] DNS SPF configurado y verificado en `mail-tester.com` (target: 10/10)
- [ ] DNS DKIM configurado y verificado
- [ ] DNS DMARC en `p=quarantine` (no `none`, no `reject` aún)
- [ ] Test envío `hola@marli.agency` → tu Gmail llega a INBOX (no spam)
- [ ] Test recepción `hola@marli.agency` → tu Gmail vía Email Routing
- [ ] Bounce monitoring configurado (alerta si > 2%)

### Anthropic

- [ ] 2 API keys distintas: una para Informes, otra para Chatbot Li (rate-limit independiente)
- [ ] Prompt caching `cache_control: ephemeral` activado en system prompts
- [ ] Modelo en producción: `claude-opus-4-7` (no Sonnet ni Haiku para producción de cara a cliente final)
- [ ] Límite de gasto mensual configurado en Anthropic dashboard (ej. 300€/mes con alerta a 80%)

---

## C. Workflows n8n

Para cada workflow, marcar SOLO si pasaste el test E2E manual del runbook 05:

- [ ] `01-lead-magnet-capture` — test con email real, lead llega a Notion, Kit llega a inbox
- [ ] `01b-lead-magnet-nurturing` — test con lead T-1 día, email D+1 enviado correctamente
- [ ] `02-cobro-stripe` — test con tarjeta real 1€, redirect Stripe funciona, refund OK
- [ ] `02b-stripe-webhook-handler` — webhook test desde Stripe → cliente creado en Notion
- [ ] `03-onboarding` — disparado tras compra real, email bienvenida llega
- [ ] `03b-onboarding-checkins` — ejecutado manual con cliente test D-7 simulado
- [ ] `04-informes-auto` — test con sesión simulada, Resumen IA generado, email a psicólogo

---

## D. Producto entregable

### Lead magnet (Kit)

- [ ] Plantilla CRM Notion duplicable disponible en URL pública
- [ ] 5 plantillas Word de informes en S3/CDN (links en email funcionan)
- [ ] Vídeo guía rápida 5 min (YouTube unlisted o Loom) disponible

### Onboarding

- [ ] Vídeo instalación 20 min disponible en URL pública
- [ ] Calendly "instalación asistida" configurado y testeado
- [ ] Página `/gracias` en marli.agency existe y se ve bien
- [ ] Página `/checkout-cancelado` existe

### Web

- [ ] Landing page del lead magnet existe y captura emails
- [ ] Landing del Pack Premium con CTA → `/checkout/pack`
- [ ] Política de privacidad publicada (RGPD)
- [ ] Términos y condiciones publicados
- [ ] Aviso de cookies funciona

---

## E. Seguridad y compliance

- [ ] Política RGPD redactada y publicada
- [ ] Aviso legal con datos fiscales reales (SL o autónomo)
- [ ] Política cookies con consentimiento granular
- [ ] DPA (Data Processing Agreement) plantilla preparada para clientes psicólogos
- [ ] Backups Notion configurados (export semanal manual o tool tipo `notion-backups`)
- [ ] Backups n8n: workflows exportados a este repo después de cualquier cambio
- [ ] Plan de Incident Response: revisar `Runbook-Incidentes.md`
- [ ] Contacto DPO público (puedes ser tú mismo en Fase 1)

---

## F. Operacional / Marketing

- [ ] Calendly "Demo Marli 25 min" configurado con 3 preguntas pre-call
- [ ] Cuenta IG activa con bio + link en bio al lead magnet
- [ ] Cuenta LinkedIn activa con perfil completo
- [ ] Mínimo 4 carruseles publicados antes de empezar a captar leads
- [ ] 3 testimoniales tempranos (puede ser de gente del beta, marcado como "alpha tester")
- [ ] Plan de outreach LinkedIn manual armado: 5-10 contactos/día, 1ª semana objetivo

---

## G. Chatbot Li (solo si va en Fase 1, normalmente Fase 2)

> Si Li está en Fase 2, saltar esta sección. Si decides incluirlo en Fase 1:

- [ ] Eval suite ejecutada → **100% en categoría Crisis** (NO ENTRA SIN ESTO)
- [ ] Eval suite ≥ 90% en otras categorías (FAQs, agendamientos, fuera-scope)
- [ ] System prompt cargado desde `system-prompt-li/prompts/system-prompt.md` con variables del psicólogo
- [ ] Tool `escalar_crisis` testeada manualmente con caso real → SMS llega al psicólogo
- [ ] Recursos crisis (024, 112, 016) memorizados y en respuestas test
- [ ] Conversaciones se almacenan cifradas
- [ ] Política retención conversaciones definida y comunicada al cliente

---

## H. Marketing / ventas

- [ ] Buyer-Persona-Saturada/Emprendedor/Clinica revisadas y vigentes
- [ ] Manejo-Objeciones.md memorizado (las 8 objeciones con sus respuestas)
- [ ] Plantilla email post-llamada lista para enviar tras cada call
- [ ] Sistema de tracking UTM configurado (Google Analytics + parámetros en links)

---

## I. Métricas y observabilidad

- [ ] Dashboard-Operativo abre cada mañana 5 min (rutina establecida)
- [ ] KPIs-Principales review cada lunes (rutina)
- [ ] Slack/Telegram webhook para alertas S1 funciona (test con webhook test)
- [ ] Notion DB de alertas activa
- [ ] Stripe Email reports activados (resumen semanal automático)

---

## J. Plan de rollback

- [ ] Si ALGO sale mal con un cliente real, sé exactamente cómo:
  - Pausar todos los workflows n8n (toggle Active → Inactive global)
  - Cancelar suscripción Stripe + refund full
  - Comunicar al cliente con plantilla pre-escrita
- [ ] Plantilla email de "lo sentimos, te devolvemos el dinero, esto fue lo que pasó" preparada
- [ ] Frase para el log: "yo soy el responsable. Postmortem en 24h."

---

## Decisión final

| Sección | Estado |
|---|---|
| A — Existenciales | ____ / 5 |
| B — Infraestructura | ____ / 18 |
| C — Workflows | ____ / 7 |
| D — Producto | ____ / 8 |
| E — Compliance | ____ / 8 |
| F — Operacional | ____ / 6 |
| G — Li (opcional Fase 1) | ____ / 7 |
| H — Marketing | ____ / 4 |
| I — Métricas | ____ / 5 |
| J — Rollback | ____ / 3 |

**Decisión**:

- ✅ **GO** — todos los ítems críticos (A, B, C, E, J) al 100% + ≥ 80% en el resto.
- ❌ **NO-GO** — cualquier ítem en A no marcado, o C < 100%.

**Si NO-GO**: documentar qué falta en `Log-Decisiones.md`, fecha estimada de re-evaluación. **Sin pillaje**.

**Si GO**: anunciar internamente. Hacer captura de pantalla de este checklist marcado. Empezar a captar leads reales. Próximo review: 7 días desde launch.

---

## Post-launch — primer review (Día +7)

- [ ] Al menos 1 lead real capturado por el funnel
- [ ] Al menos 1 venta real procesada end-to-end (lead → call → propuesta → pago → onboarding)
- [ ] 0 incidentes S1 (downtime, perdida de datos, crisis Li no detectada)
- [ ] Dashboard-Operativo abierto cada día sin saltar uno

Si pasas estos 4 → la máquina vive. Si no → diagnóstico + ajuste.
