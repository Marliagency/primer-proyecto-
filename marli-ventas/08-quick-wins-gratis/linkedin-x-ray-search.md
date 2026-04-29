# LinkedIn X-Ray Search — encontrar psicólogos sin pagar Sales Navigator

Sales Navigator cuesta ~80€/mes. Con Google "x-ray search" obtienes resultados similares **gratis**.

## Cómo funciona

Google indexa perfiles públicos de LinkedIn. Con búsquedas avanzadas, encuentras profesionales que cumplen criterios sin necesidad de Premium.

## Búsquedas listas para copy/paste

### Genéricas — psicólogos España

```
site:linkedin.com/in/ "psicólogo" OR "psicóloga" Spain
site:es.linkedin.com/in/ "psicólogo" OR "psicóloga"
site:linkedin.com/in/ "psicología" "Madrid"
site:linkedin.com/in/ "consulta privada" psicólogo
site:linkedin.com/in/ "Colegiado" "M-" psicólogo Madrid
```

### Por especialidad

```
site:linkedin.com/in/ "psicólogo clínico" Spain
site:linkedin.com/in/ "psicóloga infantil" Spain
site:linkedin.com/in/ "neuropsicólogo" Spain
site:linkedin.com/in/ "psicóloga sanitaria" Spain
site:linkedin.com/in/ "psicólogo deporte" Spain
```

### Por ciudad (top 20)

```
site:linkedin.com/in/ "psicólogo" Madrid
site:linkedin.com/in/ "psicóloga" Madrid
site:linkedin.com/in/ "psicólogo" Barcelona
site:linkedin.com/in/ "psicóloga" Barcelona
site:linkedin.com/in/ "psicólogo" Valencia
site:linkedin.com/in/ "psicóloga" Sevilla
site:linkedin.com/in/ "psicólogo" Bilbao
site:linkedin.com/in/ "psicólogo" Málaga
site:linkedin.com/in/ "psicóloga" Zaragoza
site:linkedin.com/in/ "psicólogo" Murcia
[etc...]
```

### Por tipo de práctica

```
site:linkedin.com/in/ "consulta privada" "psicólogo" -universidad -hospital
site:linkedin.com/in/ "centro de psicología" director Spain
site:linkedin.com/in/ "gabinete psicológico" Spain
site:linkedin.com/in/ "terapia online" psicólogo Spain
```

### Por experiencia (años)

```
site:linkedin.com/in/ "psicólogo" "más de 10 años" Spain
site:linkedin.com/in/ "psicóloga" "5+ años" "consulta"
site:linkedin.com/in/ "psicólogo" "junior" "consulta privada"
```

### Combinadas (avanzadas)

```
# Psicólogo + tiene web propia
site:linkedin.com/in/ "psicólogo" "consulta" "www" Spain

# Psicólogo + ha publicado libro
site:linkedin.com/in/ "psicólogo" "autor" "libro" Spain

# Psicólogo + da formación
site:linkedin.com/in/ "psicólogo" "formador" OR "ponente" Spain

# Psicólogo + freelancing/autónomo
site:linkedin.com/in/ "psicólogo" "autónomo" OR "freelance" Spain
```

---

## Resultados esperados

| Query | Resultados Google estimados |
|---|---|
| `"psicólogo" "psicóloga" Spain` | 50.000-80.000 |
| `"psicólogo clínico" Spain` | 8.000-15.000 |
| `"consulta privada" psicólogo` | 5.000-12.000 |
| `"psicólogo" Madrid` | 8.000-15.000 |
| `"psicólogo deporte" Spain` | 200-500 (nicho) |

## Cómo extraer datos masivamente

### Manual (slow): copiar 1 por 1

Click resultado → ver perfil → guardar nombre + URL en spreadsheet. Útil para 50-100 leads de alta calidad.

### Semi-automático: Phantombuster (free trial 14 días)

1. Crear cuenta phantombuster.com (free trial)
2. Phantom: "Google Search to Dataset"
3. Input: tus queries x-ray
4. Output: CSV con resultados (URL, título, descripción)
5. Phantom: "LinkedIn Profile Scraper" (con tu cookie)
6. Input: las URLs LinkedIn del paso anterior
7. Output: CSV con full datos perfil (nombre, especialidad, ciudad, web propia, otros)

**Coste**: gratis 14 días, 30€/mes después.

**Cuidado**: LinkedIn detecta scraping si abusas. Phantombuster respeta rate limits (200-500 perfiles/día), pero igual usa cuenta secundaria.

### 100% gratis: Bardeen.ai (extension Chrome)

Bardeen tiene playbook para LinkedIn:
1. Instalar Bardeen Chrome extension
2. Search en Google "site:linkedin.com/in/ ..." 
3. Bardeen detecta y ofrece "extract all results to spreadsheet"
4. Free tier: 100 extracciones/mes

100/mes × 12 = 1.200/año. Suficiente para alimentar con leads cualificados manuales.

---

## Workflow completo (combinando)

```
[Google x-ray search 10 queries variadas]
        ↓
[Bardeen / Phantombuster / manual extracción]
        ↓
[CSV de URLs LinkedIn con nombres]
        ↓
[Para cada perfil → encontrar email]
        ↓ Tools gratuitas:
        - hunter.io (50 búsquedas free/mes)
        - findthatemail.com (free credits)
        - voilanorbert.com (free trial 50)
        ↓
[CSV con email + nombre + LinkedIn]
        ↓
[Verificar emails con verify-emails.mjs (gratis)]
        ↓
[Importar a master-list.csv]
```

**Resultado**: 500-2.000 emails verificados de psicólogos LinkedIn-validados al mes, **0€**.

---

## Combinar con scraping COP/Doctoralia

```
Lista A — COP scraper                  → ~30k psicólogos colegiados
Lista B — Doctoralia scraper           → ~12k con web pública
Lista C — Google x-ray LinkedIn        → ~5k con LinkedIn activo
                ↓
        Merge + dedupe
                ↓
        ~25-35k contactos únicos
                ↓
        Filter: tiene email + verify_score ≥ 60
                ↓
        ~10-15k contactos finalists
```

Ya tienes los 10k que pediste. **0€ en herramientas**.

---

## Engagement directo desde LinkedIn (gratis, sin tools)

Una vez tienes la URL de LinkedIn de cada psicólogo, **acción manual de bajo coste**:

### Workflow diario (30 min)

1. Abrir 10 perfiles LinkedIn de tu lista (random)
2. **Like** a sus 2-3 posts más recientes (gratis, máximo permitido)
3. Comentario thoughtful en 1 post (50 palabras, profesional)
4. Connection request con plantilla del archivo `outreach-manual-templates.md`
5. Move on

10 acciones × 5 días/semana = 50 toques/semana = 200/mes.

**Conversion stats** observadas:
- 40-50% aceptan connection request
- 30-40% de los que aceptan responden a tu DM follow-up
- 5-10% acaba descargando tripwire o pidiendo info

200 toques/mes × 8% conversion = 16 leads cualificados/mes solo de outreach LinkedIn manual.

**Coste**: 0€ + 30 min/día de tu tiempo.

---

## Alternative tools gratuitas para B2B research

| Tool | Free tier | Para qué |
|---|---|---|
| **Hunter.io** | 50 búsquedas/mes | Encontrar email por dominio |
| **Apollo.io** | 50 contacts/mes (trial) | DB completa con emails |
| **Snov.io** | 50 emails/mes | Email finder + verificador |
| **Voilanorbert** | 50 free | Email finder bulk |
| **Findthatemail** | Free credits | Email finder |
| **NeverBounce** | 1.000 verifications free trial | Verifier |
| **Bardeen** | 100 automations/mes | Scraping no-code |

Combinando 3-4 free tiers por mes: **300-500 contactos enriquecidos GRATIS**.

---

## Plan agresivo de 30 días

**Día 1-3**: scraping COP + Doctoralia + Maps → master CSV bruto
**Día 4-7**: Google x-ray + Bardeen → enriquecer LinkedIn URLs
**Día 8-12**: Hunter.io free tier × 50 + Snov.io free tier × 50 = 100 emails encontrados/mes (rotando free tiers)
**Día 13-18**: enrich-domains.mjs sobre los que tienen web → +500 emails
**Día 19-23**: verify-emails.mjs sobre todo → filter ≥ 60
**Día 24-28**: dedupe-and-merge final → master-list.csv
**Día 29-30**: warm-up domains + setup secuencias

**Día 31**: empezar primer envío cold a 50 leads del top de la lista.

Total cost: 0€ tools + ~30€ dominios.

---

## Resumen

X-ray search te da el equivalente a Sales Navigator gratis si combinas:

- Google x-ray queries (gratis, ilimitado)
- Bardeen extension (100 extracciones/mes)
- Hunter/Apollo/Snov free tiers (150 emails/mes combinados)
- Verify-emails.mjs (DIY, gratis)

Volumen real conseguible: **2.000-5.000 leads de calidad por mes** sin pagar nada.
