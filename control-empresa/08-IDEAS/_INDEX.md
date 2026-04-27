---
type: moc
tags: [ideas, backlog]
status: active
updated: 2026-04-27
---

# 08 · IDEAS

Backlog estratégico. Cualquier idea que no entra en el plan inmediato
vive aquí hasta decidir si se valida.

## Backlog priorizado

```dataview
TABLE prioridad, esfuerzo, impacto, status
FROM "08-IDEAS"
WHERE type = "idea"
SORT prioridad ASC, impacto DESC
```

## Ideas iniciales

- [[Idea-Marli-para-Clinicas]] · Versión enterprise para clínicas
- [[Idea-Verticales-Adyacentes]] · Nutricionistas, coaches, fisios
- [[Idea-SaaS-Subscripcion-Baja]] · Para no canibalizar Pack Premium
- [[Idea-Comunidad-Cerrada]] · Slack/Discord exclusivo de clientes
- [[Idea-Internacionalizacion-LATAM]] · México, Argentina, Colombia
- [[Idea-Marli-API]] · Exponer Marli para integradores

## Convenciones

- `prioridad`: 1 (alta), 2 (media), 3 (baja)
- `esfuerzo`: S, M, L, XL
- `impacto`: 1-5
- `status`: idea, validando, decidido, descartada
