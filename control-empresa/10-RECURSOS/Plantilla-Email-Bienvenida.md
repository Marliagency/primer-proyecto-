---
type: nota
tags: [recursos, plantilla, email]
status: active
updated: 2026-04-27
---

# Plantilla · Email de bienvenida (post-pago)

## Asunto

Bienvenida a Marli. Aquí tienes todo lo que necesitas.

## Cuerpo

```
Hola {nombre},

Acabamos de recibir tu pago. Bienvenido a Marli.

Aquí tienes lo que necesitas para empezar HOY mismo:

🟥 Tu copia del CRM Marli (Notion):
{enlace_template_notion}

🟥 Vídeo paso a paso de instalación (~20 min):
{enlace_video_instalacion}

🟥 Si compraste el Pack con instalación, agenda aquí tu sesión:
{enlace_calendly_instalacion}

Si en cualquier momento te atascas, escríbenos a {email_soporte} y te
sacamos en menos de 24h.

Bienvenido a tener tu consulta funcionando sola.

— El equipo Marli (y Li, claro)

PD: en 7 días te escribiré para preguntarte qué tal va. Sin compromiso.
```

## Trigger

Disparado por
[[../04-AUTOMATIZACIONES/Automatizacion-Onboarding|Automatización de
onboarding]] vía webhook Stripe.

## Skill

[[../03-SKILLS-SYSTEM/Skills-Database#cloudflare-email-service|cloudflare-email-service]]
