---
type: integracion
tags: [integracion, whatsapp, chatbot]
status: idea
fase: 2
permisos_minimos: "API key del proveedor (360dialog/MessageBird), no API directa de Meta"
credenciales: "WHATSAPP_PROVIDER, WHATSAPP_API_KEY, WHATSAPP_PHONE_NUMBER_ID"
updated: 2026-04-27
---

# Integración · WhatsApp Business

## Función

Canal principal del [[../02-PRODUCTOS/Chatbot-Li|chatbot Li]] tras la
versión web inicial.

## Por qué pasar por proveedor (no API directa de Meta)

- Aprobación más rápida del template messaging
- Onboarding del número simplificado
- Soporte humano cuando algo se rompe (importante en Fase 1-2)
- Coste similar para volumen pequeño (< 5.000 conversaciones/mes)

Proveedores recomendados: **360dialog**, **MessageBird**, **Twilio**.

## Permisos mínimos

API key del proveedor con scope:

- Send messages
- Receive webhooks (incoming messages)
- Read message status

## Credenciales

```
WHATSAPP_PROVIDER=360dialog  # o messagebird, twilio
WHATSAPP_API_KEY
WHATSAPP_PHONE_NUMBER_ID
```

## Cómo se conecta

- Webhook entrante → n8n → flow del chatbot Li
- Outbound (recordatorios, confirmaciones) → n8n → API del proveedor
- Templates pre-aprobados para cada caso (recordatorio cita,
  confirmación, reprogramación)

## Cumplimiento

- Solo enviar a pacientes que han dado opt-in al psicólogo cliente
- Cada psicólogo cliente debe tener su propia política de privacidad
  visible
- Sin marketing masivo (Meta lo penaliza)

## Estado

`idea` — pendiente Fase 2 (depende de validación del chatbot en web
primero).

## Ver también

- [[../02-PRODUCTOS/Chatbot-Li]]
- [[../04-AUTOMATIZACIONES/Automatizacion-Chatbot-Li]]
