# Checklist RGPD + LSSI para cold email a profesionales en España

**IMPORTANTE**: este documento es una guía operativa basada en la práctica habitual del sector B2B en España. **No sustituye consulta con abogado especializado en protección de datos**. Para volúmenes altos (10k+ contactos), validar con DPO o despacho.

---

## Marco legal aplicable

### 1. RGPD (Reglamento UE 2016/679)

Aplica al tratamiento de datos personales. Email + nombre = dato personal aunque sea profesional.

**Bases legales para procesar (art. 6.1)**:
- (a) Consentimiento → no aplica (no han consentido todavía)
- (f) **Interés legítimo** → ÉSTA es la base que usamos en cold email B2B

### 2. LSSI Art. 21 (Ley de Servicios de la Sociedad de la Información, España)

Prohíbe envío de comunicaciones comerciales por email **sin consentimiento previo**, EXCEPTO si:

> "...se trate de una comunicación comercial referente a productos o servicios **de su propia empresa que sean similares a los que inicialmente fueron objeto de contratación con el cliente**."

Para cold email puro (no son tus clientes), la única vía legal en España es la **excepción del considerando 47 RGPD + interés legítimo cualificado**, NO el LSSI directamente. La AEPD ha mantenido criterios:

> "El tratamiento de datos profesionales con finalidad B2B puede ampararse en el interés legítimo del responsable, **siempre que se respeten los derechos del interesado y se cumplan determinadas condiciones**."

### 3. Ley Orgánica 3/2018 (LOPDGDD, desarrollo RGPD España)

Refuerza la AEPD y matiza el ámbito profesional:

> Art. 19: "Salvo prueba en contrario, se presumirá amparado en lo dispuesto en el artículo 6.1.f) del Reglamento (UE) 2016/679 el tratamiento de los datos de contacto y, en su caso, los relativos a la función o puesto desempeñado de las personas físicas que presten servicios en una persona jurídica..."

Esto es **el artículo clave**: datos profesionales públicos de profesionales (psicólogos colegiados, autónomos, sociedades) se presumen amparados en interés legítimo.

---

## Las 8 condiciones para que cold email sea defendible

Si cumples las 8, tienes defensa muy sólida ante una reclamación AEPD:

### ☐ 1. Origen de los datos justificable

```
✓ Datos públicos profesionales: web propia, COP, Doctoralia, perfil LinkedIn público
✗ Comprados a tercero sin trazabilidad → NO defendible
✗ Scraping "ilegal" sin respeto a robots.txt → NO defendible
```

**Acción**: documentar origen de cada email en master-list.csv (`fuente` columna).

### ☐ 2. Identidad clara del remitente

```
✓ Nombre real + apellido + empresa
✓ NIF/CIF visible en footer
✓ Dirección física verificable
✓ Email reply-to que funciona
```

**Acción**: footer obligatorio en cada email cold (ver `email-disclaimers.md`).

### ☐ 3. Finalidad explícita y B2B

```
✓ "Te contacto porque eres profesional de psicología y mi
  herramienta puede ser relevante para tu actividad."
✗ "Hola maja te interesa esta gran oferta?" → NO defendible
```

**Acción**: cuerpo del email debe ser claramente B2B y profesional, no consumer.

### ☐ 4. Información sobre origen del dato

```
✓ "Encontré tu correo en tu web/perfil COP/Doctoralia."
✓ "Recibes este email porque tu correo está publicado en
   directorios profesionales bajo régimen B2B."
```

**Acción**: incluir esta línea en footer de cada cold email.

### ☐ 5. Opt-out gratuito y eficaz

```
✓ Link 1-clic para darse de baja
✓ Procesar opt-out en <24h
✓ Mantener supresión list 5 años (no volver a contactar)
✗ "Para darte de baja contacta con info@..." → NO suficiente
✗ Un opt-out que pide login + 6 confirmaciones → NO defendible
```

**Acción**: implementar `/baja?id=XXX` con 1 clic + email confirmación inmediata. Workflow n8n incluido.

### ☐ 6. Respetar derechos del interesado (art. 15-22 RGPD)

Si alguien pregunta:
- Derecho de acceso: enviar copia de sus datos en <30 días
- Derecho de rectificación: corregir datos erróneos
- Derecho de supresión: borrar todo en <30 días
- Derecho de oposición: no contactar más

**Acción**: tener email `dpo@marli.agency` o similar y procedimiento.

### ☐ 7. Política de privacidad accesible y comprensible

```
✓ /privacidad publicado en marli.agency
✓ Linkeado en footer de cada email
✓ Lenguaje claro, no legalese
✓ Lista las bases legales (interés legítimo)
✓ Explica derechos
✓ Indica DPO o contacto privacidad
✓ Plazo conservación datos
```

**Acción**: usar plantilla de `/09-rgpd-legal/politica-privacidad-template.md`.

### ☐ 8. Test de ponderación (interés legítimo balanceado)

Antes de empezar, hacer test de ponderación documentado:

```
Mi interés (responsable): legítimo y específico → Vender producto B2B 
relevante para audiencia profesional cualificada.

Impacto en interesado:
- Probabilidad expectativa razonable: ALTA (psicólogo en directorios
  públicos espera contactos B2B profesionales)
- Intrusividad: BAJA (1 email + opt-out fácil)
- Naturaleza datos: NO sensibles (sólo nombre + email + ciudad profesional)
- Fuente: pública

Conclusión: Interés legítimo PREVALECE sobre interés del interesado,
siempre con opt-out efectivo y derechos respetados.
```

**Acción**: archivar este test de ponderación (1 página) como evidencia, con fecha.

---

## Lista de cosas a NUNCA hacer

❌ **Comprar bases de datos** sin trazabilidad de origen → multa garantizada
❌ **Mandar email a particulares** (gmail.com, hotmail.com) sin consentimiento previo → ilegal
❌ **Ignorar opt-outs** → multa hasta 600.000€
❌ **Reusar lista para finalidad distinta** sin nueva base legal → ilegal
❌ **Mandar spam masivo desde tu dominio principal** → daña reputación + posible banned por proveedor
❌ **Esconder origen** ("hola, hablamos pronto") → engaño, ilegal
❌ **Vender o ceder datos a terceros** → ilegal sin consentimiento explícito
❌ **No tener política de privacidad** → ilegal

---

## Sanciones reales AEPD (referencias)

- 2023: Empresa B2B, 50.000 contactos sin opt-out → multa **30.000€**
- 2022: Cold email B2B sin política privacidad accesible → multa **15.000€**
- 2024: Spam B2B con mismo opt-out roto en >30 emails → multa **60.000€**
- 2024: Compra base datos LinkedIn scraping ilegal → multa **160.000€**

Promedio multas medianas: 20.000-60.000€. **Coste de NO cumplir = 30-150x el coste de cumplir bien**.

---

## Plantilla de "test de ponderación"

Guardar este documento firmado con fecha en `/09-rgpd-legal/test-ponderacion-fecha.pdf`:

```
TEST DE PONDERACIÓN — INTERÉS LEGÍTIMO B2B
Marli Agency — Pablo [Apellido] — [DNI]
Fecha: [DD/MM/YYYY]

1. Identificación del responsable
   Nombre: Marli Agency
   CIF/NIF: [tu CIF]
   Domicilio: [tu dirección fiscal]
   DPO/Contacto: dpo@marli.agency

2. Finalidad del tratamiento
   Envío de comunicaciones B2B a psicólogos profesionales con datos
   públicos relativos a productos relevantes para su actividad
   profesional (kit de gestión consulta privada).

3. Base legal invocada
   Art. 6.1.f) RGPD — Interés legítimo
   Art. 19 LOPDGDD (interés legítimo presumido para datos
   profesionales públicos)

4. Categorías de datos
   - Nombre + apellidos profesionales
   - Email profesional publicado
   - Especialidad y ciudad profesional (si publicada)
   - NUNCA: datos clínicos, salud, ideología, etc.

5. Origen de los datos
   - COP (colegios oficiales) — listados públicos
   - Doctoralia — perfiles profesionales públicos
   - Webs propias publicadas por los profesionales
   Documentado en master-list.csv columna `fuente`.

6. Test de balance:
   a) Mi interés es legítimo, real y específico ✓
   b) El tratamiento es necesario para esa finalidad (no hay
      alternativa menos intrusiva igual de eficaz para B2B) ✓
   c) Los derechos del interesado son protegidos:
      - Información transparente en cada email ✓
      - Opt-out 1 clic gratuito y eficaz ✓
      - Derechos RGPD ejercitables (privacidad linkeada) ✓
      - No se procesan más datos de los necesarios ✓
      - Conservación limitada (max 24 meses sin interacción) ✓

7. Conclusión
   El interés legítimo de Marli Agency PREVALECE sobre los derechos
   del interesado en este caso, siempre que se mantengan las
   garantías arriba listadas.

8. Revisión
   Este test se reverá cada 12 meses o ante cambio sustancial.

Firmado: ______________________________
Fecha: ______________________________
```

---

## ¿Qué hacer si recibo una reclamación AEPD?

1. **Respira**. Una reclamación NO es multa automática.
2. Tienes 10 días naturales para alegar.
3. Documentación a aportar:
   - Test de ponderación (paso 8 arriba)
   - master-list.csv con columna `fuente` y `verify_score`
   - Copia del email enviado al reclamante
   - Logs de opt-out (si dice que no podía darse de baja → mostrar contrario)
   - Política de privacidad publicada
4. Contratar despacho especializado RGPD para escribir alegaciones (~600-1.500€).
5. AEPD dicta resolución: archivo, apercibimiento, o sanción.

Con todas las medidas arriba, en 80%+ de casos: **archivo o apercibimiento** (sin multa).

---

## Resumen pragmático

Cumple los 8 puntos arriba. Documenta el test de ponderación. Tu cold email B2B es defendible.

Sin esos 8 puntos: **NO mandes 1 cold email**. Multa esperada > beneficio.
