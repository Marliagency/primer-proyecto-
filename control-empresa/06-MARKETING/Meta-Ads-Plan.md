---
type: campania
tags: [marketing, ads, meta]
status: idea
plataforma: Meta Ads (Facebook + Instagram)
presupuesto_dia: 0
cpa_actual: null
fase: 2
updated: 2026-04-27
---

# Meta Ads · Plan

> ⚠️ Activación en **Fase 2** (Días 31-60). Antes de eso, validar con
> orgánico + outreach.

## Estructura de campañas

| Nivel | Función |
|---|---|
| Awareness | Carruseles educativos (Pilar 1), tráfico al lead magnet |
| Consideration | Vídeo VSL + retargeting a quien vio carrusel |
| Conversion | Retargeting a quien descargó lead magnet, CTA Pack Premium |

## Públicos

- Frío: psicólogos en España (intereses: APA, COP, terapia, EMDR, etc.)
- Cálido: visitantes de la web (Pixel)
- Caliente: emails capturados (Custom Audience subido por API)
- LookAlike 1%: clientes que ya pagaron (cuando haya 100+)

## Presupuesto

- Inicio Fase 2: **15-25€/día**
- Escalado Fase 3: si CPA < 200€, subir a 50-100€/día
- Stop loss: si CPA > 350€ tras 7 días, pausar y revisar copy

## KPIs

- CPL (coste por lead): < 5€
- CPA (coste por adquisición Pack Premium): < 200€
- ROAS: > 2.5x

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database|meta-ads]] (custom — gap, ver
  análisis de gaps)
- [[../03-SKILLS-SYSTEM/Skills-Database#internal-comms|internal-comms]]
  (copy de anuncios)

## Pre-requisitos técnicos

- Pixel instalado en landing
- Conversion API server-side (vía n8n + endpoint propio)
- Eventos clave: `lead`, `videocall_booked`, `purchase`

Ver [[../11-INTEGRACIONES/Integracion-Meta-Ads]] para credenciales.

## Estado actual

`idea` — sin lanzar.

## Ver también

- [[Plan-90-Dias]]
- [[../11-INTEGRACIONES/Integracion-Meta-Ads]]
