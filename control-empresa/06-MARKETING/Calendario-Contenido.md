---
type: nota
tags: [marketing, calendario, contenido]
status: active
updated: 2026-04-27
---

# Calendario de Contenido

## Cadencia mínima

| Canal | Frecuencia | Pilar |
|---|---|---|
| Instagram (carruseles) | 2-3/semana | 1, 2, 3 |
| LinkedIn (carruseles + texto) | 2/semana | 1, 3, 5 |
| Newsletter | 1/mes | 5 + casos |
| Blog (Fase 3) | 1/semana | 1 (SEO) |

## Plantilla semanal

| Día | Pieza | Pilar |
|---|---|---|
| Lunes | Carrusel IG + LinkedIn | 3 (dolor) |
| Martes | Post texto LinkedIn | 1 (educativo) |
| Miércoles | — | — |
| Jueves | Carrusel IG + LinkedIn | 2 (Li) |
| Viernes | Post texto LinkedIn | 1 o 5 |
| Sábado / Domingo | Reposo | — |

## Backlog de temas

```dataview
TABLE pilar, status
FROM "06-MARKETING"
WHERE type = "tema-contenido"
SORT status ASC, file.name
```

> Crear notas con `type: tema-contenido` para alimentar el backlog.

## Ejemplos de temas iniciales

- "8 horas a la semana es lo que pierde un psicólogo en gestión"
- "Por qué tu CRM actual te está costando pacientes"
- "Lo que Li hace mientras tú estás en sesión"
- "El error que comete el 80% de los psicólogos al cobrar"
- "Cómo hicimos el primer informe automático de Marli"
- "RGPD para psicólogos sin volverse loco"
- "Los 3 KPIs que sí debes medir en tu consulta"

## Ver también

- [[Contenido-Organico]]
- [[../05-PROCESOS/Proceso-Produccion-Contenido]]
