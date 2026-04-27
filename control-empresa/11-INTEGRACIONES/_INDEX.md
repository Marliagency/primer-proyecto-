---
type: moc
tags: [integraciones]
status: active
updated: 2026-04-27
---

# 11 · INTEGRACIONES

Especificación técnica de cada integración externa: para qué sirve, qué
permisos necesita, qué credenciales requiere y cómo se conecta con el
resto del sistema.

> ⚠️ **LEE PRIMERO**: [[SECURITY]] · política obligatoria de manejo de
> credenciales. Las credenciales **nunca** se pegan en chat ni se
> commitean a este repo.

## Integraciones

| Integración | Estado | Para qué |
|---|---|---|
| [[Integracion-Notion]] | wip | CRM, datos de clientes, plantillas |
| [[Integracion-n8n]] | wip | Orquestación de todos los workflows |
| [[Integracion-Anthropic-API]] | wip | Claude para chatbot Li y redacción de informes |
| [[Integracion-Stripe]] | wip | Cobro Pack Premium + suscripción Mantenimiento |
| [[Integracion-Cloudflare-Email]] | wip | Email transaccional |
| [[Integracion-Calendly]] | wip | Agendado de videollamadas |
| [[Integracion-Meta-Ads]] | idea | Anuncios Facebook/Instagram (Fase 2) |
| [[Integracion-Google-Ads]] | idea | Anuncios Google (Fase 3, opcional) |
| [[Integracion-Google-Analytics]] | idea | Atribución web (Fase 2) |
| [[Integracion-WordPress]] | idea | Blog SEO (Fase 2-3) |
| [[Integracion-WhatsApp-Business]] | idea | Canal del chatbot Li (Fase 2) |

## Recursos transversales

- [[SECURITY]] · Política de credenciales (lectura obligatoria)
- [[credenciales.env.example]] · Esquema de variables de entorno
- [[Runbook-Incidentes]] · Qué hacer cuando algo se rompe

## Convención común

Cada integración documenta:

1. **Función**
2. **Datos a los que accede**
3. **Acciones que ejecuta**
4. **Permisos mínimos requeridos** (principio de mínimo privilegio)
5. **Variables de entorno** que necesita (sin valores reales)
6. **Cómo se conecta** con n8n / el vault
7. **Estado actual** y próximos pasos
