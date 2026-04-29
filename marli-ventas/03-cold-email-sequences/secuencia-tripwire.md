# Secuencia A — Tripwire (CRM gratis → Pack Premium)

5 emails enviados a lo largo de **12 días** que llevan al psicólogo desde "no me conoce" hasta "se descarga el CRM gratis". Después, secuencia post-tripwire B (ver `secuencia-post-tripwire.md`) cierra al Pack Premium.

**Volumen objetivo**: 10.000 envíos
**Open rate target**: > 35%
**Reply rate target**: > 4%
**Click rate al tripwire**: > 8%
**Conversion a tripwire (descarga)**: > 3% (300 leads en CRM)

---

## Variables de personalización (merge tags)

```
{{nombre_propio}}      = primer nombre (María, Pablo, Laura...)
{{ciudad}}             = ciudad (si está, si no, omitir línea)
{{especialidad}}       = especialidad si está (clínica, infantil, etc.)
{{opt_out_url}}        = link único anti-spam (LISI Art. 21)
{{tripwire_url}}       = https://marli.agency/crm-gratis
{{remitente_nombre}}   = nombre real del CEO (Pablo)
```

---

## Email 1 — D+0 (Hook + first impression)

**Asunto** (rotar A/B):
- A: `{{nombre_propio}}, una pregunta rápida sobre tu consulta`
- B: `Pregunta sobre tu consulta en {{ciudad}}, {{nombre_propio}}`
- C: `{{nombre_propio}}, ¿cuántas horas pierdes en informes?`

**Cuerpo (HTML)**:

```html
<p>Hola {{nombre_propio}},</p>

<p>Vi tu perfil en Doctoralia/COP{{#ciudad}} (estás en {{ciudad}}, ¿no?){{/ciudad}}. Te escribo rápido porque también soy de la profesión y entiendo el follón:</p>

<ul>
  <li>3 horas redactando un informe en Word</li>
  <li>Excel de pacientes que se rompe cada lunes</li>
  <li>Llamadas para confirmar citas que podrían ser un mensaje automático</li>
  <li>Cobros que persigues durante semanas</li>
</ul>

<p>Llevo meses construyendo una herramienta para nosotros (psicólogos) que automatiza esa parte y me devuelve ~8 horas a la semana.</p>

<p>Hoy te dejo gratis la pieza base: <strong>plantilla de CRM en Notion + 5 plantillas de informes en Word ya redactadas</strong>. Sin tarjeta, sin email-trampa, descarga directa.</p>

<p>👉 <a href="{{tripwire_url}}">{{tripwire_url}}</a></p>

<p>Si te sirve, perfecto. Si no, no me ofendo.</p>

<p>Un abrazo,<br>{{remitente_nombre}}</p>

<p style="font-size:11px;color:#888;border-top:1px solid #eee;padding-top:8px;margin-top:18px">
Te escribo porque tu correo profesional aparece en tu web/perfil COP, bajo interés legítimo B2B. Si prefieres no recibir más mensajes, <a href="{{opt_out_url}}">pulsa aquí</a> y te elimino de inmediato. Más info: <a href="https://marli.agency/privacidad">política de privacidad</a>.
</p>
```

**Versión texto plano** (anti-spam, los emails 100% HTML caen más):

```
Hola {{nombre_propio}},

Vi tu perfil en Doctoralia/COP. Te escribo porque también soy de la profesión y entiendo el follón:

- 3 horas redactando un informe en Word
- Excel de pacientes que se rompe cada lunes
- Llamadas para confirmar citas
- Cobros que persigues durante semanas

Llevo meses construyendo una herramienta que me ahorra ~8 horas a la semana en eso.

Hoy te dejo gratis: plantilla CRM Notion + 5 plantillas informes Word listas. Sin tarjeta. Aquí: {{tripwire_url}}

Si te sirve, perfecto. Si no, no me ofendo.

Un abrazo,
{{remitente_nombre}}

---
Recibes este email porque tu correo profesional está publicado bajo interés legítimo B2B. Borrar suscripción: {{opt_out_url}}
```

---

## Email 2 — D+3 (Bump si no abrió o no clicó)

Solo se envía si Email 1 NO fue abierto, o si fue abierto pero NO clicado.

**Asunto** (Reply al hilo previo, NO cambiar asunto):
- `Re: {{nombre_propio}}, una pregunta rápida sobre tu consulta`

**Cuerpo**:

```
{{nombre_propio}},

Te dejo el link otra vez por si el primer email se quedó perdido:

→ {{tripwire_url}}

Plantilla CRM en Notion + 5 informes en Word. Gratis y descarga directa.

Si no es para ti, dímelo y te dejo en paz.

{{remitente_nombre}}

---
Borrar suscripción: {{opt_out_url}}
```

---

## Email 3 — D+5 (Caso real / prueba social)

**Asunto** (NUEVO, no reply):
- A: `Una historia de Mar (psicóloga en Valencia) — 8h/semana`
- B: `Cómo Mar pasó de Excel a 25 minutos por informe`
- C: `Lo que aprendí de 12 psicólogas en beta`

**Cuerpo**:

```html
<p>Hola {{nombre_propio}},</p>

<p>Mar es psicóloga clínica en Valencia. Llevaba 4 años con su consulta, 38 pacientes en activo, y un Excel que cada lunes se le rompía o se quedaba colgado.</p>

<p>Tardaba <strong>2h por informe</strong>. Multiplicado por 6 informes/semana = 12 horas. Una jornada laboral.</p>

<p>En 3 horas pasamos su sistema a:</p>
<ul>
  <li>Notion como base de pacientes (drag &amp; drop)</li>
  <li>Plantillas Word con campos auto-rellenados</li>
  <li>Recordatorios de cita por WhatsApp automáticos</li>
</ul>

<p>Resultado en 2 semanas: <strong>25 min por informe</strong>. Recuperó 8h/semana.</p>

<p>Le dejé el sistema gratis (era beta-tester). Hoy te dejo a ti la pieza básica:</p>

<p>→ <a href="{{tripwire_url}}">Plantilla CRM Notion + 5 informes Word</a> (gratis)</p>

<p>{{remitente_nombre}}</p>

<p style="font-size:11px;color:#888"><a href="{{opt_out_url}}">Borrar suscripción</a></p>
```

---

## Email 4 — D+8 (Last chance, urgencia suave)

**Asunto**:
- A: `Última vez (de verdad), {{nombre_propio}}`
- B: `Te dejo en paz, {{nombre_propio}}`
- C: `Última, lo prometo`

**Cuerpo**:

```
{{nombre_propio}},

Este es mi 4º email — y el último.

Si no te interesa la plantilla CRM gratis, no pasa nada, te elimino de la lista (o haz clic abajo para borrarte tú).

Pero si llegaste a ver alguno y se te ha pasado:

→ {{tripwire_url}}

Te ahorra unas horas a la semana, y es literalmente gratis.

Cuídate,
{{remitente_nombre}}

---
Borrar suscripción: {{opt_out_url}}
```

---

## Email 5 — D+12 (Permiso para preguntar el "no")

Solo a quienes NO opt-out tras email 4. Última oportunidad de extraer info.

**Asunto**:
- `{{nombre_propio}}, ¿te puedo hacer 1 favor?`

**Cuerpo**:

```
Hola {{nombre_propio}},

Si me has ignorado 4 veces, lo entiendo, soy un desconocido.

Pero antes de borrarte de la lista (lo voy a hacer en 7 días), me ayudaría saber por qué no te interesó. ¿Es porque...

- ya tienes una herramienta que te funciona?
- desconfías de descargas gratis?
- no ves el problema en tu día a día?
- otro motivo?

Cualquier respuesta de 1 línea me ayuda a mejorar lo que construyo.

Si me dices algo: gracias mil. Si no, no te escribo más.

{{remitente_nombre}}

---
Borrar suscripción: {{opt_out_url}}
```

**Esperado**: 5-10% reply rate en este email. Las respuestas son ORO: te dicen exactamente por qué tu posicionamiento no funciona y cómo corregirlo.

---

## Reglas de envío (rate limiting)

- **Máximo 1 email/lead/día**: nunca dos del mismo día
- **Pausas entre envíos**: 60-90s entre cada email del mismo inbox
- **No enviar fines de semana**: lunes-jueves rendimiento mejor que viernes-domingo
- **Horario óptimo España**: 8:30-10:30 AM, 13:00-14:00, 16:00-17:30
- **Salida automática si**:
  - Lead responde (cualquier mensaje) → marcar `respondió` y pausar secuencia
  - Lead clica tripwire → entra en secuencia post-tripwire (ver siguiente archivo)
  - Lead opt-out → eliminar inmediatamente

---

## A/B testing recomendado (rotación)

- 3 asuntos por email → rotar 33% / 33% / 33%
- Después de 500 envíos, mantener el ganador (>5% mejora)
- **Métrica que importa**: reply rate, no open rate (los pixels de tracking dan datos engañosos)

---

## Checklist antes de activar

- [ ] Inboxes warm-up completado (4 semanas mínimo)
- [ ] DNS perfecto (mail-tester 10/10)
- [ ] Lista verificada (verify_score ≥ 60)
- [ ] Opt-out URL funciona (test desde lead test)
- [ ] Tripwire URL funciona y entrega
- [ ] Política de privacidad publicada
- [ ] Día 1: empezar con 30-50 envíos máximo
- [ ] Monitor diario: open, click, reply, bounce, complaint

Si **bounce > 4%** → parar todo, revisar lista.
Si **complaint > 0.3%** → parar todo, revisar copy.
