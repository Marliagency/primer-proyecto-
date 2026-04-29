# Dashboard de Ventas — KPIs y métricas

Sistema de tracking con KPIs principales, dashboards en Notion, reporting semanal.

## North Star Metric

**MRR (Monthly Recurring Revenue)** — todo lo demás se subordina a esto.

Objetivo Fase 1 (90 días): **5.000-15.000€ MRR** = 10-30 clientes Pack Premium + 2-5 con Mantenimiento.

---

## KPIs de embudo (jerárquicos)

```
LEAD GENERATION
├── Cold list size verificada           Target W4: 10.000
├── Lista subida Custom Audience Meta   Target W4: 5.000 matched
└── LinkedIn connections nuevas/sem      Target W4: 100/sem

AWARENESS (TOFU)
├── Reach Meta Ads                      Target M2: 30k personas únicas
├── Frecuencia Meta Ads                 Target M2: 3-4 (no quemar)
├── Reach orgánico IG semana             Target M3: 8k
└── Reach orgánico LinkedIn semana       Target M3: 12k

INTEREST (MOFU)
├── Click rate cold email               Target: > 6%
├── Open rate cold email                Target: > 35%
├── Reply rate cold email               Target: > 4%
├── Click rate Meta Ads MOFU            Target: > 2%
└── DM responses LinkedIn               Target: 25-30%

LEAD CAPTURE (TRIPWIRE)
├── Tripwire opt-ins                    Target M3: 300-500
├── CPL (cost per lead) Meta            Target: < 6€
├── Conversion landing tripwire         Target: > 25%
└── Email confirmation rate             Target: > 90%

CONSIDERATION (BOFU)
├── Visit /pack-premium                 Target M3: 1.000/mes
├── Click rate "Comprar"                Target: > 18%
├── Visualizaciones Loom demo           Target M3: 500/mes
└── Loom completion rate                Target: > 60%

PURCHASE
├── InitiateCheckout Stripe              Target M3: 80/mes
├── Conversion checkout → purchase       Target: > 60%
├── Ventas Pack Premium                  Target M3: 30/mes
├── AOV (precio medio)                  Target: 600-700€
└── ROAS Meta Ads                       Target M3: > 4x

RETENTION
├── Onboarding completion D7            Target: > 80%
├── Net Promoter Score (NPS)            Target: > 50
├── Mantenimiento attach rate            Target: > 30%
└── Churn 30 días                       Target: < 5%
```

---

## Notion DB — Pipeline de Ventas

Crear DB en Notion `Sales Pipeline` con estas propiedades:

| Propiedad | Tipo | Notas |
|---|---|---|
| Email | Email | Title |
| Nombre | Text | |
| Estado | Select | cold / contactado / interesado / tripwire / propuesta / cliente / churn |
| Origen | Select | meta-ads / linkedin / cold-email / orgánico-ig / orgánico-li / partnership / referido / SEO |
| Producto interés | Select | crm / pack / pack+install / mantenimiento / chatbot |
| Valor estimado | Number (€) | LTV proyectado |
| Probabilidad cierre | Number (%) | 0-100 |
| Fecha primer contacto | Date | |
| Última interacción | Date | |
| Próxima acción | Text | |
| Notas | Text | |
| URL fuente | URL | LinkedIn, web, doctoralia... |
| UTM source | Text | Si vino de ads |
| Reply detectado | Checkbox | |

### Vistas (Views)

1. **Pipeline activo** — kanban por estado, filter ≠ cliente/churn
2. **Hot leads** — filter probabilidad > 60%
3. **Stale leads** — filter última interacción > 14 días, estado in [interesado, propuesta]
4. **Por origen** — group by origen, ver cuál convierte más
5. **Cierre próximo** — filter próxima acción este mes

---

## Notion DB — Ventas Cerradas

DB separada `Customers` (relación con Pipeline):

| Propiedad | Tipo |
|---|---|
| Cliente | Title |
| Producto | Select |
| Valor | Number (€) |
| Fecha compra | Date |
| Fuente atribuida | Select |
| Stripe customer ID | Text |
| Estado | Select: onboarding / activo / pausa / churn |
| MRR aporta | Number (€) |
| LTV proyectado | Number (€) |
| NPS último | Number |
| Días desde compra | Formula |
| Testimonio | Checkbox |
| Notas | Text |

### Vistas

1. **Activos** — filter estado = activo
2. **MRR mensual** — formula = sum MRR aporta donde estado = activo
3. **Riesgo churn** — filter actividad < D7, estado = activo
4. **Onboarding pendiente** — filter estado = onboarding

---

## Cohortes (analizar tendencias)

Agrupar customers por mes de compra:

| Cohort | M1 | M2 | M3 | M6 | M12 |
|---|---|---|---|---|---|
| Compras Abril 2026 | 5 | 5 | 4 | 3 | 2 |
| Compras Mayo 2026 | - | 8 | 7 | 6 | - |
| Compras Junio 2026 | - | - | 12 | 10 | - |

Ver retention y churn por cohort.

---

## Reporte semanal (cada lunes 9:00)

Plantilla de informe semanal en Notion:

```
### Semana W{N} — {fecha lunes a viernes}

#### Volumen
- Leads nuevos: 87 (+12 vs sem anterior)
- Tripwire opt-ins: 22 (-3)
- Demos / DMs respondidos: 15 (+2)
- Ventas: 4 Pack + 1 Pack+Install = 3.341€
- MRR nuevo: 0€ (sin Mantenimiento esta sem)

#### Conversion
- Cold email open: 38% (target > 35% ✓)
- Cold email reply: 4.5% (target > 4% ✓)
- Tripwire conversion: 28% (target > 25% ✓)
- Pack landing → purchase: 6% (target > 8% ✗)

#### Top performer
- Mejor ad: TOFU-pattern-Mar (CPL 4.20€)
- Mejor email: cold-3-storytelling-Mar (open 47%)
- Mejor canal: orgánico-LinkedIn (3 ventas atribuibles)

#### Issue / Acción
- Pack landing conversion bajó → revisar copy bloque "comparativa"
- 1 cliente solicita reembolso → analizar feedback, ajustar
- Faltan 5 días para fin sprint Q1

#### Próxima semana
- Subir secuencia post-tripwire variante B
- Lanzar Campaign 3 BOFU
- Aterrizar partnership Gestoría Mariscal
```

---

## Spreadsheet diario (paralelo a Notion)

Para trackeo rápido sin abrir Notion. Usar Google Sheets simple:

```
Fecha | Leads nuevos | Opt-ins | Ventas | Revenue | Notes
2026-04-29 | 12 | 3 | 1 (Pack) | 498 | Buen dia, Marí cerró
2026-04-30 | 8 | 1 | 0 | 0 | Bajón viernes
2026-05-01 | -- (festivo)
2026-05-02 | 15 | 4 | 2 (1 Pack + 1 Pack+Install) | 1847 | Día récord
```

5 segundos al día actualizar. 1 mes = patron clarísimo.

---

## Stripe Dashboard nativo (gratis)

Stripe te da automáticamente:
- MRR + crecimiento
- Churn rate
- LTV
- Cohort analysis
- Failed payments

Activar en Stripe Dashboard → Reports. NO requiere setup adicional.

---

## Meta Ads Reports (lunes y viernes)

Cada lunes y viernes, 15 min revisar Ads Manager:

| Métrica | Donde mirarla | Acción si fail |
|---|---|---|
| CPM | Por campaña | Si > 8€ TOFU → ad creative aburrido |
| CTR | Por ad | Si < 1% → cambiar hook visual |
| Frequency | Por ad set | Si > 5 → audiencia saturada, refrescar |
| CPL | Por campaign MOFU | Si > 8€ → revisar landing |
| ROAS | Por campaign BOFU | Si < 3 → pausar y diagnosticar |

Reglas automáticas (Meta Ads Manager → Automated Rules):
- Pausar ad si CPL > 12€ después de 50€ gastados
- Pausar ad set si ROAS < 1 después de 7 días
- Aumentar budget +20% si ROAS > 5x últimos 7 días

---

## UTM convention

Todos los links externos llevan UTMs. Convención:

```
?utm_source=meta-ads
&utm_medium=cpc
&utm_campaign=tofu-dolor
&utm_content=ad1-12h
&utm_term=psicologa-madrid
```

Sources:
- `meta-ads`, `linkedin-ads`, `cold-email`, `linkedin-organic`, `instagram-organic`, `referral`, `seo`, `direct`

Mediums:
- `cpc` (paid clicks), `email`, `social`, `organic`, `referral`

Track con Google Analytics 4 + Notion DB Pipeline (columna UTM source).

---

## Atribución

Modelo recomendado para Marli: **last-touch + first-touch**.

```
Last-touch: el canal del último touchpoint antes de comprar
First-touch: el canal donde se enteró por primera vez
```

Si Last ≠ First → ambos canales reciben crédito (el last-touch un 60%, el first-touch 40%).

Ejemplo: lead vio reel IG (first), después abrió cold email (mid), después compró desde retargeting Meta (last) → atribución 60% Meta retargeting, 40% IG orgánico.

Sin atribución limpia, no sabes qué canal escalar. Importantísimo desde día 1.

---

## North Star Decision Log

Documento `decisiones-marketing.md` donde anotar cada decisión >100€:

```
2026-04-29 — Subimos budget TOFU 15→25€/día
  Razón: ROAS últimos 7 días 4.8x, CPL 5.20€ stable.
  Riesgo: saturar audience.
  Próxima revisión: 2026-05-13.

2026-05-05 — Pausamos ad creative #2 "storytelling-Mar"
  Razón: CTR caído de 1.8% → 0.7% en 2 semanas (fatiga).
  Acción: nuevo creative con misma audiencia.
```

Sin esto, después de 6 meses no recuerdas por qué hiciste qué.

---

## Reglas de oro para reporting

1. **Una métrica reporta. Diez métricas confunden**. North Star = MRR.
2. **Comparar siempre vs período anterior** (semana, mes, trimestre).
3. **Cohort > Average**: la media oculta el churn.
4. **Acción > Análisis**: cada métrica fail = acción concreta esa semana.
5. **NPS y feedback cualitativo > KPI rígido**: las métricas mienten, los pacientes/clientes hablando contigo no.

---

## Stack de tracking final

| Tool | Para qué | Coste |
|---|---|---|
| Notion (existente) | Pipeline + Customers + Reportes | 0€ free plan |
| Google Sheets | Daily diary | 0€ |
| Stripe Dashboard | MRR + cohorts + churn | 0€ included |
| Meta Ads Manager | Ads metrics | 0€ included |
| Google Analytics 4 | Web traffic + UTMs | 0€ |
| Search Console | SEO ranking | 0€ |
| **Total** | | **0€/mes** |

Sin pagar Mixpanel, Amplitude, etc. Para 1.000 clientes y 100k revenue/mes, este stack es suficiente.
