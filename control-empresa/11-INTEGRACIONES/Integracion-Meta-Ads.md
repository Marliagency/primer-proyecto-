---
type: integracion
tags: [integracion, meta, ads, marketing]
status: idea
fase: 2
permisos_minimos: "System User token con ads_read, ads_management, business_management"
credenciales: "META_APP_ID, META_APP_SECRET, META_SYSTEM_USER_TOKEN, META_AD_ACCOUNT_ID, META_PIXEL_ID, META_CONVERSION_API_TOKEN"
updated: 2026-04-27
---

# Integración · Meta Ads

> ⚠️ Activación en **Fase 2** del plan. Antes, validar funnel orgánico.

## Función

Ejecutar campañas pagadas en Facebook + Instagram según
[[../06-MARKETING/Meta-Ads-Plan]].

## Componentes

1. **Pixel** (cliente) — eventos web estándar (PageView, ViewContent,
   Lead, Purchase)
2. **Conversion API** (server-side) — eventos enviados desde n8n para
   evitar pérdida por adblockers
3. **Marketing API** — gestión de campañas (cuando se construya
   automatización; en Fase 2 se gestiona manual desde Ads Manager)
4. **Custom Audiences API** — subir emails capturados como público
   cálido

## Permisos mínimos

Crear:

- App en developers.facebook.com (Business)
- System User en Business Settings (no usar usuario personal)
- Token con scopes:
  - `ads_read`
  - `ads_management`
  - `business_management`

**NO** dar `pages_manage_posts` u otros no necesarios.

## Credenciales

```
META_APP_ID
META_APP_SECRET
META_SYSTEM_USER_TOKEN
META_AD_ACCOUNT_ID
META_PIXEL_ID
META_CONVERSION_API_TOKEN
```

## Eventos clave (definir en Pixel + CAPI)

| Evento | Cuándo | Dónde se dispara |
|---|---|---|
| `PageView` | carga de cualquier página | Pixel |
| `ViewContent` | landing del lead magnet visitada | Pixel |
| `Lead` | email capturado | Pixel + CAPI (n8n) |
| `Schedule` | videollamada agendada | CAPI (vía Calendly webhook) |
| `Purchase` | pago Stripe completado | CAPI (vía Stripe webhook) |

## Skill

[[../03-SKILLS-SYSTEM/Skills-Database|meta-ads]] (gap — construir custom
con `skill-creator` cuando se justifique escalar).

## RGPD

- Aviso de cookies obligatorio en la landing
- Consentimiento previo antes de disparar Pixel
- Custom Audiences: subir emails sólo de leads con opt-in explícito

## Estado

`idea` — pendiente Fase 2.

## Ver también

- [[../06-MARKETING/Meta-Ads-Plan]]
- [[../06-MARKETING/Plan-90-Dias]]
