# Custom Audiences — guía completa Meta + LinkedIn

Las Custom Audiences son **el motor del warm-up que pediste**: subir tu lista de 10k psicólogos, y solo a esos enseñarles los ads.

---

## En Meta (Facebook + Instagram)

### Audience 1 — Lista 10k psicólogos (subida por email)

Esta es la que pediste: que solo vean los ads quienes están en tu lista.

#### Setup

1. **Audiences** → **Create Audience** → **Custom Audience** → **Customer List**
2. Source: tu CRM / "I'll upload a customer list"
3. **Origin of data**: "Customers who interacted with my business"
4. Subir CSV con columnas:

```csv
email,fn,ln,city,zip,country
maria.garcia@ejemplo.com,maria,garcia,madrid,28001,ES
pablo.ruiz@ejemplo.com,pablo,ruiz,barcelona,08001,ES
```

Cuantas más columnas, mejor el match rate. **Email solo** = 30-40% match. **Email + nombre + ciudad** = 50-60% match.

5. Map columns → **Confirm Upload**
6. Esperar 30-60 min mientras Meta hashea y matchea
7. Result: te dice cuántos contactos matched (esos son los que verán ads)

**Tamaño esperado** con lista 10k psicólogos España:
- Email solo: 3.500-4.500 matched
- Email + nombre + ciudad: 5.500-6.500 matched

Estos son los que la lista ATA. Solo ellos verán tus ads (cuando se asocian al ad set).

#### Mantener fresca

- Subir lista cada 30 días (Meta refresca matches)
- Si añades nuevos leads del scraping → upload incremental
- Si alguien opt-out → eliminarlo de la próxima upload

### Audience 2 — Video viewers (orgánico)

Si publicas reels/vídeos en IG, los que vean ≥ 75% son una audiencia caliente.

1. **Custom Audience** → **Video** → "People who viewed at least 75% of your video"
2. Seleccionar tus reels publicados en últimos 90 días
3. Tamaño objetivo: 5.000-10.000

Esta crece sola si publicas contenido. Es **completamente gratis**, solo orgánico.

### Audience 3 — Engagement con tu cuenta IG/FB

1. **Custom Audience** → **Instagram account** → "People who engaged with your account in last 90 days"
2. Tamaño dependerá de tu actividad (target 3k-8k)

### Audience 4 — Visitantes web (Pixel)

Cuando el Pixel lleve 14 días instalado:

1. **Custom Audience** → **Website**
2. Variantes a crear:
   - **All visitors** últimos 30 días (toda la web)
   - **Tripwire visitors** (URL contiene `/crm-gratis`) últimos 60 días
   - **Pack Premium visitors** (URL contiene `/pack-premium`) últimos 30 días
   - **High intent**: visitó pack Y NO completó Purchase, últimos 14 días

**Esta última es ORO**: alguien estuvo cerca de comprar y no lo hizo. BOFU perfecto.

### Audience 5 — Lookalike de tus mejores clientes

Cuando tengas 100+ leads (tripwire) o 30+ ventas:

1. **Lookalike Audience** → seleccionar audience source
2. Source: tu lista de **compradores Pack Premium** (no leads, compradores)
3. Country: España
4. Size: 1% (más cualificada) → 2.500.000 personas similares

Esto te da audiencia **fría pero altamente cualificada** una vez tengas datos. Mes 3+.

---

## Combinaciones por nivel de embudo

### Frío (TOFU)

```
Audience: Custom Lista 10k (subida por email)
+ Lookalike 1% (cuando haya base de compradores)
+ Intereses básicos (Psicología, COP, Doctoralia)

Excluir: visitantes web últimos 30 días (ya nos conocen)
```

### Tibio (MOFU)

```
Audience: Video viewers 75% últimos 30 días
+ Engagement IG/FB últimos 90 días
+ Custom Lista 10k

Excluir: descargaron tripwire (ya son leads)
```

### Caliente (BOFU)

```
Audience: Tripwire descargado últimos 60 días
+ Pack landing visited últimos 30 días
+ High intent (visitó pack pero no compró)

Excluir: compradores
```

---

## En LinkedIn

LinkedIn Custom Audiences (Matched Audiences) similar a Meta, pero más caro y con menos volumen.

### Setup matched audience

1. Campaign Manager → **Plan** → **Audiences**
2. **Create audience** → **Upload a list**
3. Subir CSV (mínimo 300 emails, ideal 5.000+)
4. Mapping: email primario
5. Wait 24-48h

**Match rate LinkedIn España**: 35-45% para profesionales (mejor que Meta para B2B en muchos casos).

### LinkedIn audience extras (sin lista propia)

1. **Job titles** matching: `Psicólogo OR Psychologist OR Psicóloga OR Terapeuta`
2. **Industry**: `Mental Health Care` OR `Psychology` OR `Health, Wellness & Fitness`
3. **Geographic location**: Spain
4. **Function**: `Healthcare Services`

Volumen estimado en LinkedIn España: ~25-35k psicólogos con perfil activo.

### Cuándo usar LinkedIn vs Meta

- **Meta**: TOFU + MOFU (volumen, más barato)
- **LinkedIn**: BOFU exclusivamente (demos profesionales, cierre)
- LinkedIn CPM: 50-90€ (3-5x más caro que Meta) → solo retargeting

---

## Setup paso a paso (orden)

**Día 1 (hoy)**:
1. Subir lista 10k → Custom Audience Meta (procesa en 1h)
2. Pixel install verificado en marli.agency
3. Crear "All visitors" audience (vacía pero empieza a llenarse)

**Día 7**:
4. Custom Audiences de Pixel ya tienen datos
5. Lanzar Campaign 1 (TOFU) targeting Custom Lista 10k

**Día 30**:
6. Video viewers audience tiene volumen
7. Tripwire visitors tiene leads
8. Encender Campaign 2 (MOFU)

**Día 60**:
9. Pack visitors tiene volumen
10. Encender Campaign 3 (BOFU)

**Día 90**:
11. 100+ compradores → crear Lookalike 1%
12. Escalar Campaign 1 con Lookalike

---

## Errores comunes (evitar)

- **No excluir compradores de TOFU/MOFU** → desperdicias dinero mostrando ads de "compra" a quien ya compró
- **Audience demasiado pequeña** (< 1.000) → Meta no optimiza bien, CPM se dispara
- **No refrescar lista** → la lista no actualizada decae 5%/mes en match rate
- **Mismos ads frío/caliente** → mensaje TOFU (dolor) confunde al BOFU (ya conoce el producto)
- **Subir sin hashear** → Meta acepta plain pero hashea automático. **Nunca subir teléfonos sin formato E.164** (`+34`)

---

## Coste cero alternativo si presupuesto limita

Si NO puedes pagar Meta Ads ahora mismo:

1. Sube la lista igual → Meta queda preparada cuando tengas budget
2. Mientras tanto, postea contenido orgánico (carruseles) → construye audience video viewer GRATIS
3. Después de 60-90 días, tu audience video viewer + engagement será de 5k+ → ya puedes hacer retargeting orgánico

**Dato real**: una cuenta IG con 30 publicaciones consistentes en 60 días puede generar Custom Audience de 8.000 personas sin gastar 1€ en ads. Solo tiempo de creator.
