---
type: integracion
tags: [integracion, google, ads, marketing]
status: idea
fase: 3
permisos_minimos: "OAuth con scope ads + developer token"
credenciales: "GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_CUSTOMER_ID"
updated: 2026-04-27
---

# Integración · Google Ads

> ⚠️ Activación en **Fase 3** y solo si valida demanda search ("CRM
> psicólogos", "automatizar consulta", etc.). Probablemente no merece
> la pena hasta tener blog SEO con tracción.

## Función potencial

- Search Ads en keywords de alta intención ("crm psicólogos", "software
  consulta psicológica")
- Performance Max si Meta Ads valida bien
- YouTube Ads si se produce VSL en formato vídeo

## Permisos mínimos

OAuth flow con scope `https://www.googleapis.com/auth/adwords`. Developer
token de Google Ads API.

## Credenciales

```
GOOGLE_ADS_DEVELOPER_TOKEN
GOOGLE_ADS_CLIENT_ID
GOOGLE_ADS_CLIENT_SECRET
GOOGLE_ADS_REFRESH_TOKEN
GOOGLE_ADS_CUSTOMER_ID
```

## Estado

`idea` — pendiente Fase 3.

## Ver también

- [[../06-MARKETING/Plan-90-Dias]]
- [[../06-MARKETING/Plan-Blog-SEO]]
