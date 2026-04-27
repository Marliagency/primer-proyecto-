---
type: integracion
tags: [integracion, wordpress, blog]
status: idea
fase: 2-3
permisos_minimos: "Application Password (no contraseña admin) con rol Editor"
credenciales: "WP_BASE_URL, WP_USERNAME, WP_APPLICATION_PASSWORD"
updated: 2026-04-27
---

# Integración · WordPress

> Activación con el [[../06-MARKETING/Plan-Blog-SEO|blog SEO]] en Fase
> 2-3.

## Función

CMS para `marliagency.com/blog`. Publicación automatizada de los
artículos generados con
[[../03-SKILLS-SYSTEM/Skills-Database#claude-api|claude-api]].

## Setup

- WordPress en hosting propio (Hostinger / SiteGround) o WordPress.com
  Business
- Theme: minimalista, alineado con identidad Marli
- Plugins mínimos:
  - Yoast SEO o RankMath (SEO on-page)
  - Cache (WP Rocket o W3 Total Cache)
  - Backup (UpdraftPlus)
  - **No** plugin de social posting (manual)

## Permisos mínimos

Usuario dedicado para n8n con rol **Editor** (no Admin). Application
Password generada en el perfil del usuario, no la contraseña principal.

## Credenciales

```
WP_BASE_URL=https://marliagency.com
WP_USERNAME
WP_APPLICATION_PASSWORD
```

## Cómo se conecta

- Skill `claude-api` genera artículo en markdown
- n8n convierte markdown a HTML
- POST a la REST API de WordPress (`/wp-json/wp/v2/posts`) con auth
  básica
- Status: `draft` por defecto (revisión humana antes de publicar)

## Estado

`idea` — pendiente Fase 2-3.

## Ver también

- [[../06-MARKETING/Plan-Blog-SEO]]
