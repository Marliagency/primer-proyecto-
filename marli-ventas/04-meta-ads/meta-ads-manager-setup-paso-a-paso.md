# Meta Ads Manager — setup paso a paso (UI)

Configurar las 3 campañas en Meta Ads Manager. Asume Pixel ya instalado (ver `pixel-install-hostinger.md`) y Custom Audiences creadas (ver `custom-audiences-setup.md`).

**Tiempo total**: 2-3h primera vez, 30 min después.

---

## Paso 1 — Configurar Meta Business Manager (si no lo tienes)

1. Ir a https://business.facebook.com → **Crear cuenta**
2. Nombre: `Marli Agency`
3. Verificar email
4. **Configuración → Información empresarial**:
   - Razón social: tu razón social real
   - CIF: tu CIF
   - Dirección: tu dirección fiscal
   - Web: marli.agency
5. **Configuración → Páginas → Añadir → Reclamar página**: añadir tu página IG/FB de Marli
6. **Configuración → Cuentas publicitarias → Crear nueva**: 
   - Moneda: EUR
   - Zona horaria: Madrid
   - Nombre: `Marli Ads ES`

---

## Paso 2 — Conectar método de pago

1. **Configuración → Pagos** → Añadir método
2. Tarjeta crédito + dirección facturación
3. **Importante**: añadir SEPA débito como respaldo (más barato si Meta acepta)
4. Configurar **Spending limit** mensual: empezar con 600€/mes (mes 1)

---

## Paso 3 — Crear Campaign 1 (TOFU)

### En Ads Manager → Crear nueva campaña

1. **Buying type**: Auction
2. **Campaign objective**: **Awareness** → **Reach** (no Engagement)
3. **Campaign name**: `TOFU-Reach-Lista10k+Intereses-2026-04`
4. **Special ad categories**: ninguna (no es vivienda/empleo/crédito)
5. **A/B test**: OFF (al principio)
6. **Campaign budget optimization (CBO)**: OFF (controlamos a nivel ad set)

Click **Next**.

### Ad Set 1A — Custom Audience Lista 10k

1. **Ad set name**: `Lista10k-Custom-Edad28-58`
2. **Optimization & delivery**:
   - Optimization for: **Reach**
   - Frequency cap: **2 impressions per 7 days** (clave: no quemar)
3. **Budget & schedule**:
   - Daily budget: **15€**
   - Start: hoy
   - End: sin fecha (continuous)
4. **Audience**:
   - **Custom Audiences** → Add → seleccionar tu **Lista 10k psicólogos**
   - **Locations**: Spain
   - **Age**: 28-58
   - **Gender**: All
   - **Languages**: Spanish
   - **Detailed targeting expansion**: OFF (queremos solo lista)
5. **Placements**:
   - **Manual placements**:
     - ✓ Facebook Feed
     - ✓ Instagram Feed
     - ✓ Instagram Stories
     - ✓ Instagram Reels
     - ✗ Audience Network
     - ✗ Messenger
     - ✗ Right Column
6. **Optimization & delivery**: 
   - Reach
   - Spending control: standard

Click **Next**.

### Ad 1A — Subir creative #1 (Dolor 12h)

1. **Ad name**: `Ad1-Dolor12h-FeedReels`
2. **Identity**: tu página Marli IG/FB
3. **Format**: Single image or video
4. **Media**: subir tu creative 1080×1350 (feed) Y 1080×1920 (stories/reels)
5. **Primary text**: copiar de `6-ad-creatives.md` (Anuncio 1)
6. **Headline**: "12h a la semana en informes"
7. **Description**: omitir (ya está en Primary text)
8. **Destination**: 
   - URL: `https://marli.agency/crm-gratis?utm_source=meta-ads&utm_medium=cpc&utm_campaign=tofu-dolor&utm_content=ad1-12h&utm_term={{adset.name}}`
9. **Call to action**: **Learn more** ("Más información")
10. **Tracking**:
    - **Pixel**: tu Marli Pixel
    - **Conversions API**: si configurada, ON
    - **Events**: PageView default

Click **Publish**.

### Repetir Ad Set 1B — Audiencia interés

Same campaign, new ad set:

1. **Ad set name**: `Intereses-Psicologia-Edad32-50`
2. **Audience**:
   - **No Custom Audience**
   - **Locations**: Spain
   - **Age**: 32-50
   - **Detailed targeting**: 
     - Interests: `Psychology`, `Psychotherapy`, `Mental health`
     - Job titles: `Psicólogo`, `Psicóloga`, `Psychologist`, `Therapist`
   - **Exclude**: tu lista 10k (para no duplicar)
3. **Daily budget**: 10€
4. Resto igual que 1A
5. **Ad**: subir creative #2 (Storytelling Mar)

Total Campaign 1 budget: 25€/día = **750€/mes**.

---

## Paso 4 — Crear Campaign 2 (MOFU) — semana 5

**Solo activar cuando** tengas Custom Audiences video viewers con > 1.000 personas (suele ser 2-3 semanas tras lanzar Campaign 1).

### Crear nueva campaña

1. **Objective**: **Traffic** (lleva a landing tripwire)
2. **Campaign name**: `MOFU-Traffic-VideoViewers+Lista10k-2026-04`

### Ad Set 2A — Video Viewers 75%

1. **Audience**: 
   - Custom Audience: **Video viewers 75% últimos 30 días**
   - + Lista 10k matched
2. **Exclude**: 
   - **Tripwire opt-in últimos 60 días** (ya son leads, van a BOFU)
3. **Optimization for**: Landing page views
4. **Daily budget**: 12€
5. **Ad**: creative #3 (Comparativa) + #4 (Tripwire)

---

## Paso 5 — Crear Campaign 3 (BOFU) — semana 7+

**Solo activar cuando** tengas Custom Audience Tripwire opt-ins con > 100 personas.

### Crear campaña

1. **Objective**: **Sales** → **Maximize conversions**
2. **Campaign name**: `BOFU-Conversion-Tripwire+PackVisitors-2026-04`

### Ad Set 3A — Tripwire-NotPurchasers

1. **Audience**:
   - Custom Audience: **Tripwire opt-in últimos 60 días**
2. **Exclude**: 
   - **Compradores** (Custom Audience: Purchase event últimos 90 días)
3. **Optimization for**: Conversions → **Purchase**
4. **Conversion location**: Website
5. **Pixel**: Marli Pixel
6. **Conversion event**: Purchase
7. **Attribution setting**: 7-day click + 1-day view (default)
8. **Daily budget**: 8€
9. **Bid strategy**: **Highest volume** + Cost per result goal: 80€ (target CAC)
10. **Ad**: creative #5 (Testimonial Marí) + #6 (Garantía/Objection)

---

## Paso 6 — Configurar Reglas Automáticas

**Ads Manager → Automated Rules → Create rule**

### Regla 1 — Pausar si CPL alto

```
Rule name: Pausar TOFU si CPL > 12€

Apply to: All active campaigns in Marli Ads ES
Action: Turn off campaigns
Conditions:
  - Spend > 30€
  - Cost per landing page view > 12€
Time range: Last 3 days

Schedule: Continuous
Notify: yes (email)
```

### Regla 2 — Aumentar budget si ROAS alto

```
Rule name: Escalar BOFU si ROAS > 5

Apply to: BOFU campaigns
Action: Increase daily budget by 20% (cap 50€/día)
Conditions:
  - Purchases ROAS > 5
  - Spend > 50€ (last 7 days)
  - Frequency < 3
Time range: Last 7 days

Schedule: Daily at 9:00
Notify: yes
```

### Regla 3 — Pausar audience saturada

```
Rule name: Pausar ad set si frequency > 5

Apply to: All ad sets
Action: Turn off ad sets
Conditions:
  - Frequency > 5
Time range: Last 7 days

Schedule: Daily
Notify: yes
```

### Regla 4 — Alertar bajo CTR

```
Rule name: Alertar si CTR < 0.8%

Apply to: All ads
Action: Send notification only (no pause)
Conditions:
  - Impressions > 1000
  - CTR (link click-through rate) < 0.8%
Time range: Last 3 days

Schedule: Daily
Notify: yes
```

---

## Paso 7 — Setup Aggregated Event Measurement (iOS 14+)

Crítico para tracking iOS sin perder atribución.

1. **Events Manager → tu Pixel → Aggregated Event Measurement → Configure**
2. Add domain: `marli.agency`
3. Priorizar 8 eventos (orden importa):
   - **Slot 1** (más prioritario): Purchase con value
   - **Slot 2**: InitiateCheckout con value
   - **Slot 3**: Lead
   - **Slot 4**: ViewContent (Pack landing)
   - **Slot 5**: AddToCart
   - **Slot 6**: CompleteRegistration
   - **Slot 7**: Subscribe (mantenimiento)
   - **Slot 8**: PageView

4. Save

iOS users solo verán los 8 prioritarios. Sin esto → 30-50% de tracking perdido en iOS.

---

## Paso 8 — Crear UTM template (autopopulate)

**Settings → URL parameters → Add template**:

```
utm_source=meta-ads
utm_medium=cpc
utm_campaign={{campaign.name}}
utm_content={{ad.name}}
utm_term={{adset.name}}
```

Aplicar a TODAS las campañas. Sin esto, tracking se hace inconsistente.

---

## Checklist activación

Antes de poner Campaign 1 en "Active":

- [ ] Pixel verificado disparando en mar marli.agency (Pixel Helper Chrome ext)
- [ ] Conversions API token configurado
- [ ] Domain marli.agency verified
- [ ] Aggregated Event Measurement priorizado 8 eventos
- [ ] Custom Audience Lista 10k subida y matched (>1.000 matches)
- [ ] Custom Audiences vacías creadas (video viewers, web visitors) listas para llenarse
- [ ] Pixel events configurados en `/gracias-tripwire` (Lead) y `/gracias-compra` (Purchase)
- [ ] Landing /crm-gratis live y tested
- [ ] Stripe Payment Links creados
- [ ] 6 ad creatives uploaded (1080×1350 + 1080×1920)
- [ ] UTM template configurado
- [ ] Reglas automáticas creadas
- [ ] Spending limit 600€/mes configurado
- [ ] Tu tarjeta funciona (Meta verifica con cargo 1€)

---

## Métricas a vigilar primera semana

Cada día (15 min):

| Métrica | Donde mirar | Si fail |
|---|---|---|
| Spending vs budget | Campaign overview | Pausar si gastas demasiado rápido |
| CPM | Por audience | Si > 8€ → audience demasiado nicha |
| CTR (link click-through) | Por ad | Si < 1% → reescribir hook visual |
| CPL | Por landing | Si > 10€ tras 50€ gastados → algo falla |
| Frequency | Por ad set | Si > 4 día 7 → audience saturada |

---

## Errores comunes (evitar)

- ❌ **Activar las 3 campañas el mismo día**: solo TOFU primero, MOFU semana 5, BOFU semana 7
- ❌ **No excluir compradores de TOFU/MOFU**: queman dinero
- ❌ **Frequency cap muy alto en TOFU**: > 5 = ruido al lead
- ❌ **Optimization para "Engagement" en TOFU**: optimiza Reach o ThruPlay, no engagement
- ❌ **Cambios mid-week**: cada cambio resetea aprendizaje 4-7 días
- ❌ **Subir creatives < 1080px**: Meta los baja de calidad y CTR cae

---

## Cuándo escalar

Escalar **solo si** durante 7+ días seguidos:
- ROAS > 4x
- CPL estable (no subiendo)
- Frequency < 3.5
- CTR > 1.5%

Escalado seguro: **+20% budget cada 4 días**, no más. Si subes +100% de golpe, Meta pierde aprendizaje.

---

## Próximo paso

Una vez Campaign 1 corriendo 14 días → revisar performance, decidir si activar Campaign 2 (MOFU).
