# 01 — Lead Generation (gratis)

Scripts para construir tu lista de **10.000 psicólogos en España** sin pagar Apollo/Lusha (~99€/mes ahorrados).

## Pipeline completo

```
[scrapers] → leads-raw-*.csv
   ↓
[enrich-domains] → leads-enriched.csv  (rellena emails desde webs)
   ↓
[verify-emails] → leads-verified.csv   (DNS + SMTP probe gratis)
   ↓
[dedupe-and-merge] → master-list.csv  (lista final lista para enviar)
```

## Ejecución (orden recomendado)

### Paso 1 — Scraping (semana 1)

```bash
# COP — listados oficiales de colegiados (lo más legítimo legalmente)
node scrapers/cop-colegiados.mjs --provincia madrid --output leads-cop-madrid.csv
node scrapers/cop-colegiados.mjs --provincia catalunya --output leads-cop-catalunya.csv
node scrapers/cop-colegiados.mjs --all --output leads-cop-all.csv

# Doctoralia — perfiles públicos con web
node scrapers/doctoralia.mjs --pages 200 --output leads-doctoralia.csv

# Google Maps — clínicas con web/teléfono
# Con Places API (recomendado, ~1.25€):
node scrapers/google-maps.mjs --apikey TU_API_KEY --output leads-maps.csv
# Sin API (lento, frágil):
node scrapers/google-maps.mjs --scrape --output leads-maps.csv
```

**Volumen esperado tras scraping**: 8.000-15.000 leads brutos.

### Paso 2 — Enriquecer dominios (semana 1)

Doctoralia y Maps suelen darte web pero NO email. Este script visita cada web y extrae emails publicados.

```bash
node enrich-domains.mjs --input leads-doctoralia.csv --output enriched-doctoralia.csv
node enrich-domains.mjs --input leads-maps.csv --output enriched-maps.csv
```

**Match rate esperado**: 35-55% (las webs de psicólogos suelen publicar email en /contacto).

### Paso 3 — Verificar emails (semana 1-2)

Sin pagar ZeroBounce/NeverBounce. Hace DNS MX + SMTP probe.

```bash
node verify-emails.mjs --input enriched-doctoralia.csv --output verified-doctoralia.csv
node verify-emails.mjs --input enriched-maps.csv --output verified-maps.csv

# Si tu IP no permite SMTP (algunos VPS bloquean puerto 25), saltar SMTP:
node verify-emails.mjs --input enriched-doctoralia.csv --output verified-doctoralia.csv --skip-smtp
```

**Score por email**:
- 100 = perfecto, enviar sin miedo
- 80 = catch-all (Microsoft 365), enviar pero más bounces posibles
- 60 = MX OK pero sin SMTP probe, aceptable
- 30 = MX falla, NO enviar
- 0 = sintaxis falla, NO enviar

Filtrar para solo `verify_score >= 60` antes de enviar.

### Paso 4 — Merge final (semana 2)

```bash
node dedupe-and-merge.mjs \
  --inputs leads-cop-all.csv,verified-doctoralia.csv,verified-maps.csv \
  --output master-list.csv
```

**Volumen final esperado**: 6.000-10.000 leads únicos verificados con email.

---

## Compliance & legal

### Bases legales para procesar estos datos (RGPD)

1. **Datos profesionales públicos**: nombre, especialidad, web profesional, ciudad → tratamiento bajo **interés legítimo** (art. 6.1.f RGPD)
2. **Email profesional**: si está publicado en su web profesional o en COP/Doctoralia, también es procesable bajo interés legítimo para B2B
3. **Obligaciones**:
   - Informar en primer email cómo obtuviste el dato (`Encontré tu email en tu web/Doctoralia/COP`)
   - Opt-out claro y gratuito en cada email
   - Honor opt-out inmediato (mantener supresión list 5 años)
   - No tratar más datos que los necesarios para la finalidad

Ver `../09-rgpd-legal/` para texto legal completo y plantillas.

### Lo que NO hacer

- ❌ Comprar bases de datos de terceros sin verificar origen (multa AEPD garantizada)
- ❌ Enviar a emails personales (gmail.com, hotmail.com) sin consentimiento previo
- ❌ Ocultar quién eres o por qué les escribes
- ❌ Hacer follow-up tras opt-out (delito tipificado)

---

## Costes

| Cosa | Coste original (con tools) | Con estos scripts |
|---|---|---|
| Apollo.io 1 mes | 99€ | 0€ |
| ZeroBounce 10k | 49€ | 0€ |
| Hunter.io | 49€ | 0€ |
| Places API (opcional) | - | ~1.25€ |
| **Total** | **197€** | **~1.25€** |

Ahorro: ~195€/mes.

## Limitaciones honestas

- Los selectores HTML de COP/Doctoralia **pueden cambiar** y romper los scrapers. Si pasa, hay que abrir DevTools y ajustar el regex en cada `parsers.X` del scraper. 30 min de trabajo.
- SMTP probe puede ser **rechazado por algunos servidores** (Gmail, Outlook). Para esos, el score bajará a 60 (aceptable).
- Algunos psicólogos solo publican email en formato `info@...` — son leads de menor calidad pero válidos.

## Próximo paso

→ `../02-email-infrastructure/` — preparar infraestructura segura de envío
