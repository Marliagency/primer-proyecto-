# Budget allocation + targeting España psicólogos

## Targeting recomendado por campaña

### Campaign 1 — TOFU (frío)

```
Ubicación: España (todo el país)
Edad: 28-58 (psicólogos en consulta privada concentrados aquí)
Género: All
Idioma: Español

Detailed targeting (intereses):
✓ Psychology (interest)
✓ Psychotherapy (interest)
✓ Mental health
✓ College of Psychology of Spain (page like)
✓ Psicología y Mente (page like)
✓ Doctoralia
✓ Iván Pavlov
✓ Sigmund Freud
✓ Carl Jung
[OR] estos intereses

Detailed targeting (cargos):
✓ Job titles: Psicólogo, Psicóloga, Psychologist, Therapist, Terapeuta

[AND]

Excluir:
✗ Estudiantes (interés "psychology student" si está disponible)
✗ Visited marli.agency últimos 30 días (Pixel)
✗ Lista 10k (porque va a su propio audience)
```

**Tamaño esperado**: 80.000 - 150.000 personas. **Ad set audience deseado: 200k+** o reach se queda corto.

### Campaign 2 — MOFU (tibio)

```
Custom Audiences (cualquiera de estas):
✓ Lista 10k matched (ya viste varias veces)
✓ Video viewers 75% últimos 30 días
✓ Engagement IG/FB últimos 90 días

Excluir:
✗ Tripwire opt-in últimos 60 días (ya son leads, van a BOFU)
✗ Compradores
```

### Campaign 3 — BOFU (caliente)

```
Custom Audiences:
✓ Tripwire opt-in últimos 60 días NO compradores
✓ Pack landing visitor últimos 30 días NO compradores
✓ "High intent": vio pack + scrolled 75% NO compradores

Excluir:
✗ Compradores
```

---

## Budget allocation

### Mes 1 — Solo TOFU (warm-up audience)

| Día | Budget | Notas |
|---|---|---|
| 1-3 | 5€/día | Aprendizaje algoritmo |
| 4-14 | 15€/día | Reach normal |
| 15-30 | 20€/día | Escalar si CPM < 4€ |

**Total mes 1**: 400-450€ → reach 25k-40k personas, frecuencia 2-3.

### Mes 2 — TOFU + MOFU encendido

| Campaña | Diario | Mensual |
|---|---|---|
| TOFU | 18€ | 540€ |
| MOFU | 12€ | 360€ |
| **Total** | **30€** | **~900€** |

### Mes 3+ — Embudo completo

| Campaña | Diario | Mensual |
|---|---|---|
| TOFU | 25€ | 750€ |
| MOFU | 18€ | 540€ |
| BOFU | 12€ | 360€ |
| **Total** | **55€** | **~1.650€** |

---

## Distribución plataformas (placements)

### Recomendado (Meta auto-placements)

```
✓ Facebook Feed
✓ Facebook Stories
✓ Instagram Feed
✓ Instagram Stories
✓ Instagram Reels
✗ Audience Network (suele ser tráfico basura)
✗ Messenger (no relevante para B2B)
```

**Reels** suele ser el mejor performance ratio para psicólogos en España (60-70% del tráfico viene de ahí).

---

## Bid strategy

### TOFU
- **Optimization**: Reach o ThruPlay (3 segundos vídeo) + Frequency cap
- **Frequency**: 2-3 impresiones/persona/semana (no quemar)
- **Bid**: Auto + Cost cap = 4€ CPM target

### MOFU
- **Optimization**: Landing page views o Lead
- **Bid**: Auto + Cost cap = 8€ CPL target

### BOFU
- **Optimization**: Conversion (Purchase event)
- **Attribution window**: 7d click + 1d view
- **Bid**: Auto + Cost cap = 100€ CPA target (LTV ratio 4x)

---

## Reglas automáticas (Meta Ads Manager)

Configurar en Ads Manager → Automated Rules:

1. **Pausar ad si gasto > 2× Cost cap sin conversión**:
   ```
   IF spend (today) > 50€ AND conversions = 0 → PAUSE
   ```

2. **Aumentar budget si performance excelente**:
   ```
   IF ROAS (last 7 days) > 5 AND spend > 100€ → INCREASE budget by 20%
   ```

3. **Pausar ad con frequency > 5**:
   ```
   IF frequency (last 7 days) > 5 → PAUSE (audience saturada)
   ```

4. **Alertar si bounce rate alto**:
   ```
   IF CTR > 2% AND landing page views < CTR × clicks × 0.5 → ALERT
   ```

---

## Targeting AVANZADO (si volumen es bajo)

Si tu audience target es < 50k personas:

1. **Ampliar geografía**: añadir LATAM (México, Colombia, Argentina) si tu producto sirve allí
2. **Ampliar edad**: 25-65
3. **Más intereses**: añadir terapeutas, psiquiatras, coaches (más amplio pero relevante)
4. **Lookalike de tu lista 10k**: una vez tengas 1.000+ matches, crear Lookalike 1-3% de ellos

Si tu audience > 500k:

1. **Restringir edad**: 32-50 (sweet spot consulta establecida)
2. **Restringir geografía**: solo Madrid + Barcelona + Valencia (50% del mercado)
3. **Añadir behaviors**: "Small business owners" + "Digital activities"

---

## Naming convention de campañas

Para mantener orden cuando tengas 20+ ads:

```
[NIVEL]-[OBJETIVO]-[AUDIENCE]-[CREATIVE]-[FECHA]

Ejemplos:
TOFU-Reach-Intereses+Lista10k-AdDolor12h-2026-W18
MOFU-Lead-VideoViewers75-AdTripwire-2026-W18
BOFU-Conv-PackVisitors-AdGarantia-2026-W22
```

Esto facilita reportes y filtros en Ads Manager.

---

## Métricas semanales (revisar lunes)

| Métrica | Cálculo | Meta acción |
|---|---|---|
| CPM | Spend / Impressions × 1000 | < 5€ TOFU, < 12€ MOFU |
| CTR | Clicks / Impressions | > 1.5% TOFU, > 2.5% MOFU |
| CPL | Spend / Leads | < 6€ MOFU |
| CPA | Spend / Purchases | < 100€ BOFU |
| ROAS | Revenue / Spend | > 4x mes 3+ |
| Frequency | Impressions / Reach | 2-4 (saludable) |

Si X métrica falla 2 semanas seguidas → diagnostic + ajustar (ver `ads-troubleshooting.md`).
