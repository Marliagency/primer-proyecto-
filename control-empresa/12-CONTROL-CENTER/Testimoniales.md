---
type: dashboard
tags: [control-center, testimoniales, social-proof]
status: active
updated: 2026-04-27
---

# Testimoniales

## Vivos

```dataview
TABLE persona, ticket, formato, enlace
FROM "12-CONTROL-CENTER"
WHERE type = "testimonial" AND status = "publicado"
SORT fecha DESC
```

## Pedidos / pendientes

```dataview
TABLE persona, fecha_solicitud, status
FROM "12-CONTROL-CENTER"
WHERE type = "testimonial" AND status != "publicado"
SORT fecha_solicitud DESC
```

## Plantilla para nuevo testimonial

```yaml
type: testimonial
tags: [testimonial]
status: pedido | grabando | recibido | publicado | descartado
persona: Saturada | Emprendedor | Clínica
ticket: 498 | 1349 | etc.
formato: video | texto | audio
fecha_solicitud: YYYY-MM-DD
fecha_publicacion: YYYY-MM-DD
enlace: ...
```

## Cómo conseguirlos (proceso)

1. **Día 30 post-pago** → email automático solicitando testimonio
   ([[../04-AUTOMATIZACIONES/Automatizacion-Onboarding]]).
2. Si dice sí → enviar guion sugerido (3 preguntas):
   - "¿Cómo era tu día antes de Marli?"
   - "¿Qué cambió en las primeras 2 semanas?"
   - "¿A quién se lo recomendarías?"
3. Si lo manda → editar mínimo, publicar en landing.
4. Incentivo: 1 mes de Mantenimiento gratis.

## Objetivo H1

3 testimoniales documentados (Fase 1) → 8-10 (Fase 2-3).

## Ver también

- [[../05-PROCESOS/Proceso-Onboarding]]
- [[../06-MARKETING/Estrategia-Marketing]]
