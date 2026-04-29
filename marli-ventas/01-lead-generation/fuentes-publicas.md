# Fuentes públicas de leads (psicólogos España) — gratis

Lista exhaustiva de sitios públicos donde encontrar psicólogos sin pagar Apollo/Lusha.

## Tier 1 — Listados oficiales de colegiados (más legítimos legalmente)

| Fuente | URL buscador | Volumen aprox. | Datos disponibles |
|---|---|---|---|
| COP General (Consejo General) | https://www.cop.es | Federación | Links a COP provinciales |
| **COP Madrid** | https://www.copmadrid.org/web/buscador-de-colegiados | ~14.000 | Nombre, num colegiado, especialidad, web |
| **COP Catalunya (COPC)** | https://www.copc.cat/serveis/cercador-collegiats | ~13.500 | Nombre, num, especialidad, ciudad |
| **COP-CV (Valencia)** | https://www.cop-cv.org/colegiados | ~6.000 | Nombre, num, especialidad |
| **COP Galicia** | https://www.copgalicia.gal | ~3.500 | Nombre, num |
| **COP Andalucía Occidental** | https://www.copao.com | ~5.500 | Nombre, num, especialidad |
| **COP Andalucía Oriental** | https://www.copao.es | ~4.000 | Idem |
| **COP Bizkaia** | https://www.copbizkaia.org | ~2.000 | Idem |
| **COP Navarra** | https://www.cop-navarra.org | ~1.500 | Idem |
| **COP Castilla y León** | https://www.copcyl.es | ~3.000 | Idem |
| **COP Asturias** | https://www.cop-asturias.org | ~1.800 | Idem |
| **COP Aragón** | https://www.coppa.es | ~2.000 | Idem |
| **COP La Rioja** | https://www.coplarioja.org | ~600 | Idem |
| **COP Cantabria** | https://www.copcantabria.es | ~800 | Idem |
| **COP Murcia** | https://www.copmurcia.es | ~2.500 | Idem |
| **COP Canarias** | https://www.copcanarias.com | ~2.500 | Idem |
| **COP Baleares** | https://www.copib.es | ~1.500 | Idem |

**Total estimado COP**: ~64.000 colegiados con datos públicos.

## Tier 2 — Directorios profesionales

| Fuente | URL | Volumen | Notas |
|---|---|---|---|
| **Doctoralia** | https://www.doctoralia.es/psicologo | ~12.000 | Web propia frecuente, sin email directo |
| **TopDoctors** | https://www.topdoctors.es | ~8.000 | Premium, perfiles más completos |
| **Psicologia-Online** | https://www.psicologia-online.com | ~5.000 | Buscador por provincia |
| **MundoPsicologos** | https://www.mundopsicologos.com | ~6.500 | España + LATAM (filtrar por país) |
| **TerapiaCentro** | https://www.terapiacentro.com | ~3.000 | Foco terapia |
| **Psicotools** | https://www.psicotools.es | ~2.000 | Más pequeño |

## Tier 3 — Plataformas de cita online

Estos sitios tienen psicólogos con perfil + web. Buenos para enriquecer.

| Fuente | URL |
|---|---|
| **Mundopsicologos.com** | https://www.mundopsicologos.com |
| **TherapyChat** | https://therapychat.com (si tienen pública) |
| **Psicología y Mente** | https://psicologiaymente.com (autores) |

## Tier 4 — Directorios B2B España

| Fuente | URL | Notas |
|---|---|---|
| **EmpresaActual** | https://www.empresaactual.com | Filtro CNAE 8690 (otras actividades sanitarias) |
| **Axesor** | https://www.axesor.es | Empresa fiscal pero útil para clínicas |
| **eInforma** | https://www.einforma.com | CNAE 8690 → ~3.000 sociedades de psicología |
| **Páginas Amarillas** | https://www.paginasamarillas.es/buscar/psicologo/espana | ~5.000 entradas |

## Tier 5 — Universidades & Asociaciones

Psicólogos colegiados suelen ser miembros de asociaciones temáticas. Excelente para targeting nicho.

| Asociación | URL | Especialidad |
|---|---|---|
| **AEPC** (Asoc. Esp. Psicología Clínica) | https://www.aepc.es | Clínica |
| **AETC** (Terapia Cognitivo-Conductual) | https://www.aetc.es | TCC |
| **EFPA** España | https://www.cop.es/efpa | Ético |
| **AEPCP** (Psicopatología) | https://www.aepcp.net | Psicopatología |
| **SEAS** (Estrés y Ansiedad) | https://www.ansiedadyestres.org | Ansiedad |
| **AEPSM** (Salud Mental) | https://www.aepsm.org | Salud mental |
| **SEPI** (Psiquiatría Infantil) | https://www.sepypna.com | Infantil |
| **AEPP** (Psicoanálisis) | https://www.aepp.es | Psicoanalítica |

Cada asociación lista sus socios públicamente. Targeting de alta calidad si tu producto encaja con esa especialidad.

## Tier 6 — LinkedIn (manual o Sales Nav)

Sin pagar Sales Navigator (~80€/mes), puedes hacer "x-ray search" en Google:

```
site:linkedin.com/in "psicólogo" Madrid
site:linkedin.com/in "psicóloga" "consulta privada"
site:linkedin.com/in "Colegiado M-" Madrid
```

Resultados: 5.000-10.000 perfiles públicos visibles desde Google sin LinkedIn login.

Ver `../08-quick-wins-gratis/linkedin-x-ray.md` para queries completas.

## Tier 7 — Redes sociales (IG, TikTok)

Buscar hashtags + bios:
- `#psicologa`, `#psicologo`, `#psicologaclinica`, `#psicologamadrid`, `#terapeuta`
- En IG: ~50.000 perfiles públicos, en TikTok: ~30.000

Para extracción a escala: scraper Apify "Instagram Hashtag Scraper" (~30€/10k posts).

---

## Estrategia recomendada para llegar a 10.000 leads únicos

**Semana 1**:
1. Scraper COP Madrid + Catalunya + Valencia (cubren 50% del país, ~33k colegiados)
2. Scraper Doctoralia páginas 1-200 (~10k psicólogos)
3. Maps API queries × 50 provincias (~5k clínicas)

**Semana 2**:
1. Enriquecer todo con `enrich-domains.mjs` (40-50% match → ~12k con email)
2. Verificar con `verify-emails.mjs` (filter score ≥ 60 → ~9-10k limpios)
3. Dedupe final → master-list.csv

Ya tienes los **10.000 contactos verificados**, sin pagar Apollo.

## Mantenimiento

- Re-scrapear cada 6 meses (los colegiados cambian poco, las webs cambian más)
- Honor opt-outs estrictamente (lista de supresión actualizada)
- No re-importar emails que ya hayan opt-out
