# Plan 90 días — De cero a 5.000€/mes MRR

Roadmap día por día. Si lo sigues, en 90 días tienes pipeline activo, primeros clientes pagando y embudo midiendo.

**Asumiendo**: tienes ya web Hostinger + cuenta Meta + cuenta LinkedIn + chatbot CRM + creador de informes (lo que dijiste).

**Tiempo dedicado**: 4-6h/día primer mes, 2-3h/día mes 2-3 (cuando funcione solo).

---

## Fase 0 — Setup (días 1-7)

Antes de captar 1 lead. Si saltas esto, tirarás dinero después.

### Día 1 (lunes)

**Objetivo**: legal + dominios + tracking base

- [ ] Comprar 2 dominios secundarios cold (`get-marli.com` + `marli-team.es`) en Cloudflare Registrar (~25€)
- [ ] Crear cuenta Google Workspace 5 inboxes (~30€/mes) o Zoho 5 inboxes (~5€/mes)
- [ ] Publicar `marli.agency/privacidad` (usar plantilla de `09-rgpd-legal/politica-privacidad-template.md`)
- [ ] Imprimir y firmar `Test de ponderación interés legítimo` (de `09-rgpd-legal/checklist-rgpd-cold-email.md`)
- [ ] Crear las 5 DBs Notion según `10-tracking-kpis/notion-db-schemas.json`
- [ ] Instalar Meta Pixel en Hostinger (siguiendo `04-meta-ads/pixel-install-hostinger.md`)

### Día 2 (martes)

**Objetivo**: DNS + warm-up arranca + opt-out endpoint

- [ ] Configurar SPF/DKIM/DMARC en `get-marli.com` y `marli-team.es` (de `02-email-infrastructure/dns-records-template.md`)
- [ ] Test mail-tester.com → target 10/10
- [ ] Crear endpoint `/baja` en Hostinger con flow opt-out 1 clic
- [ ] Crear página `/gracias-tripwire` y `/gracias-compra` con eventos Pixel
- [ ] Empezar warm-up manual de inboxes: pedir 5 amigos / clientes existentes que envíen email + respondan

### Día 3 (miércoles)

**Objetivo**: Stripe Payment Links + landings

- [ ] Verificar Stripe en Live mode + KYC completo
- [ ] Crear Payment Links para Pack Premium 498€ y Pack+Install 1.349€ (siguiendo `06-async-closing/stripe-payment-links-setup.md`)
- [ ] Configurar Stripe Webhook → n8n (workflow ya construido en `marli-deploy/n8n-workflows/02b-stripe-webhook-handler.json`)
- [ ] Empezar copy del landing tripwire `/crm-gratis` (Hostinger Builder, copy de `06-async-closing/landing-tripwire.md`)

### Día 4 (jueves)

**Objetivo**: landing Pack Premium + setup Loom

- [ ] Terminar landing `/crm-gratis` y publicar
- [ ] Empezar landing `/pack-premium` (copy de `06-async-closing/landing-pack-premium.md`)
- [ ] Grabar primer Loom demo 5 min (script de `06-async-closing/loom-script-demo.md`)
- [ ] Publicar Loom unlisted, copiar URL

### Día 5 (viernes)

**Objetivo**: tripwire entrega automática

- [ ] Importar workflow `01-lead-magnet-capture` de marli-deploy a tu n8n
- [ ] Test E2E: form → email automático → llega plantilla
- [ ] Empezar landing `/pack-premium` continuación
- [ ] Setup WhatsApp Business + greeting message

### Día 6-7 (fin de semana)

**Objetivo**: scrapers + lista bruta

- [ ] Ejecutar `01-lead-generation/scrapers/cop-colegiados.mjs --all`
- [ ] Ejecutar `01-lead-generation/scrapers/doctoralia.mjs --pages 200`
- [ ] Resultado esperado: 8.000-12.000 leads brutos en CSV

---

## Fase 1 — Lista lista para enviar (días 8-14)

### Día 8

- [ ] Ejecutar `enrich-domains.mjs` sobre Doctoralia → ~30-50% match
- [ ] Ejecutar `verify-emails.mjs` → filter score ≥ 60
- [ ] Resultado: 4.000-7.000 emails verificados

### Día 9

- [ ] Ejecutar `dedupe-and-merge.mjs` → master-list.csv
- [ ] **Verificar contra Notion DB Opt-outs**: filtrar emails ya optados-out (vacía día 9, pero estructura para cuando crezca)
- [ ] Final: 6.000-10.000 emails master list

### Día 10

- [ ] Subir lista a Meta Custom Audience (procesa 1h)
- [ ] Crear Custom Audiences adicionales: video viewers (vacío), engagement IG, web visitors
- [ ] Bardeen extension setup para LinkedIn x-ray (gratis 100/mes)

### Día 11-12

- [ ] Crear los 6 ads en Canva (siguiendo `04-meta-ads/6-ad-creatives.md`)
- [ ] 1080×1350 + 1080×1920 cada uno
- [ ] Subir a Meta Ads Manager (todavía pausados)

### Día 13

- [ ] Configurar Campaign 1 (TOFU) con audience custom 10k
- [ ] Setup tracking + UTMs en cada ad
- [ ] Verificar Pixel events disparan

### Día 14

- [ ] Lanzar Campaign 1 con budget 10€/día (test inicial)
- [ ] Día completo de pruebas E2E del funnel:
  - Click ad → landing tripwire → opt-in → email entrega → Loom view → click "Pack" → checkout
  - Verifica cada paso

---

## Fase 2 — Awareness + warm-up audience (días 15-30)

### Semana 3 (días 15-21)

**Objetivo**: construir audience "vista 75% video" + lanzar contenido orgánico

- [ ] Ads Campaign 1: aumentar a 15€/día
- [ ] Publicar 5 piezas orgánicas (carruseles 1, 11, 16 + reel 1 + post texto)
- [ ] Linked Outreach manual: 10 connection requests/día con plantilla 1 (200/sem total)
- [ ] Empezar warm-up cold email inboxes: enviar 5/día desde cada inbox a contactos OK
- [ ] Verificar mail-tester.com semanalmente

### Semana 4 (días 22-30)

**Objetivo**: pre-launch cold email + audience MOFU lista

- [ ] Custom Audience video viewers ya tiene volumen (target 3.000+)
- [ ] Tripwire opt-ins acumulados: 30-80 (orgánico + ads)
- [ ] Ad Campaign 1 budget 20€/día
- [ ] Publicar 5 más piezas orgánicas (carruseles 2, 12, 17 + reel 2 + post)
- [ ] LinkedIn Outreach: aumentar a 15-20 acciones/día
- [ ] Cold email inboxes: warm-up 35-50/día (cerca de full capacity)

### Día 30 (revisión hito 1)

Esperado:
- 50-150 tripwire opt-ins
- 0-5 ventas Pack Premium (early)
- IG +200 followers, LinkedIn +200 conexiones
- 0-3 demos pedidas (Calendly)

Si sales > 3 → vamos bien. Si 0 → revisar landing Pack + Loom.

---

## Fase 3 — Cold email + retargeting (días 31-60)

### Semana 5

- [ ] Lanzar primer batch cold email: 50/día desde cada inbox = 250/día
- [ ] Secuencia A — Tripwire (de `03-cold-email-sequences/secuencia-tripwire.md`)
- [ ] Encender Ad Campaign 2 (MOFU) con budget 10€/día
- [ ] Tripwire opt-ins acumulados: target 100+

### Semana 6

- [ ] Cold email volumen normal: 250-300/día
- [ ] Total enviado al final semana: ~1.500 emails de la lista 10k
- [ ] Encender Ad Campaign 3 (BOFU) con budget 5€/día (audience pequeña al principio)
- [ ] Empezar contactar partnerships (3 emails/sem a gestorías + influencers)

### Semana 7

- [ ] Cold email volumen máximo: 350-400/día
- [ ] Total enviado final semana 7: ~3.500 emails
- [ ] Replys cold email: target 100-150 conversaciones
- [ ] Ventas atribuibles: target 5-12 acumuladas

### Semana 8

- [ ] Cold email volumen máximo
- [ ] Total enviado final mes 2: ~6.000 emails (60% de lista)
- [ ] Bumps automáticos secuencia (paso 2, 3, 4) ya activos para los enviados primeros
- [ ] Empezar testimoniales + casos cliente (con permisos)
- [ ] Crear el Reel 11 con primer testimonial real

### Día 60 (revisión hito 2)

Esperado:
- 200-500 tripwire opt-ins
- 8-25 ventas Pack Premium = 4.000-12.500€ revenue acumulado
- 1-3 partnerships activos
- IG/LinkedIn audiencias 1.5k-3k
- 1-3 testimoniales reales

Si revenue > 5.000€ → escalar. Si < 3.000€ → diagnosticar y ajustar (probablemente landing Pack o Loom).

---

## Fase 4 — Escalado + retención (días 61-90)

### Semana 9

- [ ] Cold email: terminar lista 10k (últimos batches)
- [ ] Ad Campaign 1 (TOFU): budget 25€/día
- [ ] Ad Campaign 2 (MOFU): budget 18€/día
- [ ] Ad Campaign 3 (BOFU): budget 12€/día
- [ ] Total ads: ~55€/día = ~1.650€/mes
- [ ] Crear Lookalike 1% sobre tus 8-25 compradores

### Semana 10

- [ ] Lookalike 1% live en Campaign 1 (audience nueva fría cualificada)
- [ ] Empujar testimoniales reales: ad creative #5 actualizado
- [ ] Pedir testimonios a clientes D+30 (plantilla 6 WhatsApp)
- [ ] Empezar masterclasses universidades / asociaciones (1 confirmada)

### Semana 11

- [ ] Reciclar contenido orgánico top performer (4 mejores piezas)
- [ ] Encender 1ª masterclass universidad → 30-80 nuevos contactos cualificadísimos
- [ ] Continuar partnership outreach: 2 cerrados acumulados

### Semana 12

- [ ] Wave de testimoniales: 3 carruseles + 3 reels + 1 carrusel data "23 ventas reales"
- [ ] Empezar promoción Mantenimiento (300€/mes) a clientes activos D+30+
- [ ] First MRR recurrente: 2-5 clientes en Mantenimiento
- [ ] Empezar SEO blog: primer artículo "Plantilla informe psicológico Word"

### Día 90 (revisión hito 3)

**Esperado realista**:
- 600-1.200 tripwire opt-ins acumulados
- 25-60 ventas Pack Premium = 12.500-30.000€ revenue acumulado
- 2-7 clientes Mantenimiento = 600-2.100€ MRR recurrente
- IG 2.5k-5k followers, LinkedIn 2k-4k conexiones
- 2-5 partnerships activos
- 5-10 testimoniales reales
- Lookalike audiences activas escalando
- Pipeline de cold email cerrado, contenido orgánico activo

**MRR proyectado mes 4-6**: 5.000-15.000€/mes consistentes.

---

## Resumen de gasto 90 días

| Concepto | Coste 90 días |
|---|---|
| Dominios cold (2) | 30€ |
| Google Workspace 5 inboxes (3 meses) | 90€ |
| Meta Ads (mes 1: 450€ + mes 2: 900€ + mes 3: 1.650€) | 3.000€ |
| Canva Pro (3 meses) | 36€ |
| Notion (free tier) | 0€ |
| Loom (free tier) | 0€ |
| Buffer (free tier) | 0€ |
| Stripe (no fixed cost, sólo % por venta) | 0€ |
| Validación legal RGPD (despacho 1h) | 200€ |
| **Total inversión 90 días** | **3.356€** |

**Revenue proyectado conservador**: 12.500€
**Revenue proyectado optimista**: 30.000€
**ROI conservador**: 3.7x · ROI optimista: 8.9x

---

## Reglas de oro

1. **Empezar pequeño**. Día 1 con 10€/día ads, no 50€.
2. **Iterar antes de escalar**. Si CPL > 8€, no aumentes budget — arregla el ad.
3. **Conversion > volumen**. 100 leads bien cualificados > 1.000 leads malos.
4. **Atribución desde día 1**. UTMs en cada link.
5. **Honor opt-outs religiosamente**. 1 multa AEPD = 6 meses de ROI perdidos.
6. **Hacer ronda de feedback semanal**. Lunes 30 min review, ajustar.
7. **Pedir testimonios pronto**. Cliente D+15 con resultado = oro.
8. **No videollamadas obligatorias**. Calendly visible pero NO required.
9. **Stripe Payment Links directos** > checkout custom (menos fricción).
10. **MRR > one-shot**. Mantenimiento es el rey en mes 6+.

---

## Si te bloqueas

| Bloqueo | Solución | Siguiente paso |
|---|---|---|
| Cold email no abre | mail-tester.com → arreglar SPF/DKIM | Pausar 1 sem, fix, retomar |
| Ads CPL > 10€ | Cambiar creative + audience | Test 3 nuevos ads en 1 sem |
| Landing tripwire < 15% conversion | Reescribir headline + simplificar form | A/B test variant nuevo |
| Pack landing < 3% conversion | Faltan testimoniales / objection handlers | Añadir 3 testimonios + FAQ extendido |
| 0 ventas tras 100 tripwire opt-ins | Loom no convierte | Regrabar Loom con focus distinto (data vs storytelling) |
| LinkedIn 0 reply tras 50 DMs | Plantilla genérica | Cambiar a plantilla 8 (encuesta abierta) |

---

## Día 91 — qué hacer después

- Revisar profundamente las 4 cohortes (mes 1, 2, 3): cuál convierte mejor, churn, NPS
- Decidir: doblar budget ads (si ROAS > 4) o re-invertir en orgánico (si ads no escalan)
- Empujar Mantenimiento mensual: el verdadero MRR engine
- Planificar Q2: ¿lanzar Marli Pro (1.999€) para clínicas con varios psicólogos?
- Considerar contratación: Virtual Assistant para LinkedIn DM (10€/h, ahorra 10h/sem)

A partir de aquí, el sistema funciona en automático. Tu trabajo cambia: de **construir** a **optimizar y escalar**.
