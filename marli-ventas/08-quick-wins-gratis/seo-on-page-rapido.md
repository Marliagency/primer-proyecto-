# SEO on-page rápido — tráfico orgánico Google sin gastar

SEO toma 3-9 meses para resultados pero **es el canal más estable a largo plazo**. Con 4-6h de trabajo, tu web puede empezar a aparecer en búsquedas relevantes.

## Keywords objetivo (alta intent, baja competencia)

### Long-tail (volumen 50-500/mes, fácil rank)

```
"plantilla informe psicológico word"          → 500 búsquedas/mes
"plantilla CRM Notion psicólogos"             → 200/mes
"informe neuropsicológico modelo gratis"      → 300/mes
"como gestionar consulta privada psicólogo"   → 400/mes
"automatizar cobros consulta psicólogo"       → 100/mes
"recordatorios automáticos consulta psicólogo" → 80/mes
"software gestión psicólogos España"          → 350/mes
"crm para psicólogos gratis"                  → 250/mes
```

### Mid-tail (más volumen, más competencia)

```
"plantillas psicología"               → 1200/mes
"informes psicológicos ejemplos"      → 2400/mes
"gestión consulta privada"            → 800/mes
"productividad psicólogos"            → 600/mes
```

### Short-tail (alto volumen, difícil rank — solo apuntar mes 6+)

```
"plantilla informe"           → 5400/mes
"crm gratis"                  → 12k/mes
"software psicólogo"          → 3600/mes
```

---

## Páginas a crear (estrategia hub-and-spoke)

### Hub (homepage + landings principales)

- `/` (home, target keyword: "marli herramientas psicólogos")
- `/pack-premium` (target: "software gestión psicólogos España")
- `/crm-gratis` (target: "crm para psicólogos gratis")

### Spokes (artículos blog que linkean al hub)

Crear `/blog/` en Hostinger y publicar 1 artículo/semana × 12 semanas = 12 artículos. Cada uno target una long-tail keyword.

#### Lista de artículos a escribir

1. **"Cómo redactar un informe psicológico en 25 minutos (con plantilla)"**
   - Target: "plantilla informe psicológico word"
   - 1500 palabras + plantilla descargable + CTA tripwire

2. **"5 plantillas de informes psicológicos gratuitas (Word + PDF)"**
   - Target: "informes psicológicos ejemplos"
   - 1200 palabras + 5 plantillas embed

3. **"Cómo organizar tu consulta privada en Notion (paso a paso)"**
   - Target: "plantilla CRM Notion psicólogos"
   - 2000 palabras + screenshots + plantilla

4. **"Software de gestión para psicólogos en España: guía 2026"**
   - Target: "software gestión psicólogos España"
   - 2500 palabras comparativa + Marli posicionada

5. **"Automatizar cobros en consulta de psicología: guía Stripe"**
   - Target: "automatizar cobros consulta psicólogo"
   - 1500 palabras tutorial

6. **"Recordatorios automáticos para pacientes (WhatsApp + email)"**
   - Target: "recordatorios automáticos consulta psicólogo"
   - 1200 palabras

7. **"CRM gratis para psicólogos: las 5 mejores opciones (incluida la mía)"**
   - Target: "crm para psicólogos gratis"
   - 1800 palabras comparativa con tu producto top

8. **"Cómo facturar como psicólogo autónomo en España (paso a paso 2026)"**
   - Target: "facturar psicólogo autónomo España"
   - 2000 palabras

9. **"No-shows en consulta: cómo reducirlos del 18% al 4%"**
   - Target: "reducir no-shows pacientes"
   - 1500 palabras + datos

10. **"Burnout en psicólogos: 3 señales y cómo prevenir (sistemas)"**
    - Target: "burnout psicólogos"
    - 2000 palabras + reflexión + soluciones

11. **"Cómo subir tarifas sin perder pacientes (caso real)"**
    - Target: "como subir tarifas psicólogo"
    - 1500 palabras

12. **"Notion para psicólogos: tutorial completo (vídeo + plantilla)"**
    - Target: "notion para psicólogos"
    - 1800 palabras + plantilla

---

## Estructura SEO de cada artículo

Plantilla a copiar para cada artículo:

```html
<head>
  <title>[Keyword principal] — [Beneficio en 5 palabras] | Marli</title>
  <meta name="description" content="[Promesa específica 150 caracteres con keyword + CTA]">
  <link rel="canonical" href="https://marli.agency/blog/[slug]">
  
  <!-- OpenGraph -->
  <meta property="og:title" content="[Título]">
  <meta property="og:description" content="[Descripción]">
  <meta property="og:image" content="https://marli.agency/blog/[slug]/og.png">
  <meta property="og:type" content="article">
</head>

<body>
  <article>
    <h1>[Keyword principal exacto]</h1>
    <p class="lead">[Hook + promesa específica]</p>
    
    <!-- Tabla de contenidos clickeable -->
    <nav class="toc">
      <h2>Lo que vas a leer:</h2>
      <ul>
        <li><a href="#section-1">El problema en 60 segundos</a></li>
        <li><a href="#section-2">Solución paso a paso</a></li>
        <li><a href="#section-3">Plantilla descargable</a></li>
        <li><a href="#section-4">FAQ</a></li>
      </ul>
    </nav>
    
    <h2 id="section-1">El problema</h2>
    <p>[Keyword secundaria en primer párrafo]</p>
    
    <h2 id="section-2">Solución paso a paso</h2>
    <h3>Paso 1: ...</h3>
    <p>[H3 contienen long-tails secundarias]</p>
    
    <!-- Imagen con alt específico -->
    <img src="..." alt="[descripción con keyword]" loading="lazy">
    
    <h2 id="section-3">Plantilla descargable</h2>
    <div class="cta-box">
      <p>Descarga la plantilla mencionada GRATIS</p>
      <form>...</form>
    </div>
    
    <h2 id="section-4">Preguntas frecuentes</h2>
    <h3>¿[Pregunta long-tail 1]?</h3>
    <p>...</p>
    <h3>¿[Pregunta long-tail 2]?</h3>
    <p>...</p>
    
    <!-- Schema markup FAQ -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [...]
    }
    </script>
  </article>
  
  <!-- Related posts -->
  <aside>
    <h3>Otros artículos:</h3>
    <ul>...</ul>
  </aside>
</body>
```

---

## Optimizaciones técnicas (1h una vez)

### En Hostinger Builder o WordPress

1. **Velocidad**: comprimir imágenes con TinyPNG (<200KB cada una)
2. **Mobile responsive**: probar en pagespeed.web.dev → target >85
3. **HTTPS**: ya lo tienes con Hostinger gratis
4. **Sitemap.xml**: Hostinger lo genera auto, verificar `marli.agency/sitemap.xml` accesible
5. **robots.txt**: 
   ```
   User-agent: *
   Allow: /
   Disallow: /admin
   Sitemap: https://marli.agency/sitemap.xml
   ```
6. **Google Search Console**: registrar marli.agency, subir sitemap, ver indexación
7. **Google Analytics 4**: instalar (free) para ver tráfico SEO

---

## Backlinks (link building gratis)

Backlinks = otros sitios linkean al tuyo. Más backlinks de calidad = mejor ranking.

### Cómo conseguir backlinks gratis

1. **Guest posts en blogs de psicología España** (por ejemplo "Psicología y Mente", PsiquiatriaCom). Pitch: "puedo escribir artículo sobre X tema, dejas backlink natural a marli.agency".

2. **Listings en directorios de software**:
   - SoftwareSuggest
   - GetApp
   - Capterra (ojo: a veces de pago)
   - Crozdesk
   - Productize

3. **Mencion en tu COP** y asociaciones donde estés colegiado: "Marli, herramienta de Pablo (col. M-XXXX)" en sus sites.

4. **HARO / Help A Reporter Out**: periodistas piden expertos. Si te citan, backlink de medios potentes.

5. **Crear recurso linkeable**: "el report 2026 de psicólogos en consulta privada España" con datos propios → otros bloggers lo citarán.

### Volumen y calidad

- Mes 1-3: target 5-10 backlinks de calidad media
- Mes 4-6: target 10-20 backlinks
- Mes 12: 50+ backlinks naturales y orgánicos

---

## Métricas SEO

### Mes 1-3 (no se ve aún)

- Google Search Console: páginas indexadas
- Domain Rating (Ahrefs trial): 0 → 5
- Backlinks: 0 → 5

### Mes 3-6 (empiezan rankings)

- Posiciones long-tail: top 50 → top 20 → top 10
- Traffic orgánico: 50-200 visitas/mes
- Conversion del traffic SEO: 4-8% (tienden a ser high intent)

### Mes 6-12

- 8-15 keywords en top 10
- Tráfico orgánico: 1.000-3.000 visitas/mes
- Conversion → tripwire: 30-100 leads/mes
- Conversion → ventas Pack: 3-12 ventas/mes orgánicas

**Esto es estable, lento, compounding**. Mes 12+ el SEO supera a las ads en costo-efectividad.

---

## Ratio de prioridad

Para Marli en mes 1-3:
- 60% tiempo en Cold email + scrapers (ROI rápido)
- 25% tiempo en contenido orgánico social
- 10% tiempo en SEO blog
- 5% tiempo en partnerships

Mes 6+:
- 30% Cold email maintenance
- 20% Content social
- 30% SEO
- 20% Partnerships
- (Ads se mantienen siempre 30% del budget paid)

SEO empieza lento pero a 12 meses puede ser tu canal más rentable.
