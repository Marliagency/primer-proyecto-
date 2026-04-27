---
type: integracion
tags: [integracion, cloudflare, email]
status: wip
permisos_minimos: "API token con permiso Email Send sólo en la zona DNS del dominio"
credenciales: "CF_ACCOUNT_ID, CF_API_TOKEN_EMAIL"
updated: 2026-04-27
---

# Integración · Cloudflare Email Service

## Función

Envío transaccional para todo el sistema de email:

- Entrega del [[../06-MARKETING/Lead-Magnet|Kit de inicio]]
- Secuencia de [[../10-RECURSOS/Plantilla-Email-Nurturing|nurturing]]
- Email post-llamada de cierre
- Bienvenida y onboarding
- Solicitud de testimonio
- Newsletter mensual

## Configuración DNS obligatoria

Antes del primer envío:

- **SPF**: `v=spf1 include:_spf.mx.cloudflare.net ~all`
- **DKIM**: clave generada por Cloudflare, registrada en TXT
- **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@marliagency.com`

Sin esto, los emails caerán a spam o serán rechazados.

## Permisos mínimos

API token de Cloudflare con:

- Account: `Email Routing - Read`
- Account: `Email Sending - Write`
- Zone: `DNS - Read` (sólo para verificar config)

**No** dar `Edit Zone` ni `Account Settings`.

## Credenciales

```
CF_ACCOUNT_ID
CF_API_TOKEN_EMAIL
CF_EMAIL_FROM=hola@marliagency.com
CF_EMAIL_REPLY_TO=hola@marliagency.com
```

## Cómo se conecta

- n8n hace POST al endpoint REST de Cloudflare Email Sending
- Plantillas HTML simples (no estilos pesados — afectan deliverability)
- Cada email registra: timestamp, destinatario, plantilla, message-id

## Métricas a trackear

- Bounce rate (objetivo: < 2%)
- Spam rate (objetivo: < 0.1%)
- Open rate por plantilla (objetivo nurturing 1: > 60%)
- Click rate (objetivo CTA: > 8%)

Reportadas en [[../12-CONTROL-CENTER/KPIs-Principales]].

## Skill

[[../03-SKILLS-SYSTEM/Skills-Database#cloudflare-email-service|cloudflare-email-service]]

## Estado

`wip` — pendiente:

- [ ] Configurar Email Routing en CF para `marliagency.com`
- [ ] Configurar SPF, DKIM, DMARC
- [ ] Generar API token con scope mínimo
- [ ] Test de deliverability (mail-tester.com)
- [ ] Primer envío real con plantilla de bienvenida

## Ver también

- [[../04-AUTOMATIZACIONES/Automatizacion-Lead-Magnet]]
- [[../10-RECURSOS/Plantilla-Email-Bienvenida]]
- [[../10-RECURSOS/Plantilla-Email-PostLlamada]]
- [[../10-RECURSOS/Plantilla-Email-Nurturing]]
