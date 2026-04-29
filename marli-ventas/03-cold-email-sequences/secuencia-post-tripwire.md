# Secuencia B — Post-tripwire (CRM descargado → Pack Premium 498€)

Disparada cuando un psicólogo descarga el CRM gratis (entra en Notion como `lead status=tripwire_descargado`). Convierte el lead caliente en cliente del Pack Premium en **7 días**.

**Volumen estimado**: 300-500 entradas/mes (3-5% de conversión sobre 10k cold)
**Conversion target**: 8-12% al Pack Premium (~30 ventas/mes)
**Stripe link directo, sin call**

---

## Email 1 — Inmediato (entrega + bienvenida)

Disparado al opt-in del lead magnet. NO esperar.

**Asunto**: `Tu plantilla Marli ya está dentro {{nombre_propio}} 📦`

**Cuerpo**:

```html
<p>Hola {{nombre_propio}},</p>

<p>¡Bienvenido/a! Aquí tienes tus archivos:</p>

<ul>
  <li><strong>📊 Plantilla CRM Notion</strong>: <a href="{{notion_template_url}}">Duplicar a tu Notion</a></li>
  <li><strong>📄 5 plantillas de informes Word</strong>: <a href="{{word_zip_url}}">Descargar .zip</a></li>
  <li><strong>🎬 Vídeo guía rápida (5 min)</strong>: <a href="{{loom_setup_url}}">Cómo configurar todo</a></li>
</ul>

<p>2 minutos de setup y ya estás trabajando con ello.</p>

<p>Si mañana o pasado se te atasca algo, contesta a este email. Lo leo yo (Pablo). Si me preguntas algo personal de tu consulta, te respondo en serio.</p>

<p>Pablo<br>Marli Agency</p>

<p style="font-size:11px;color:#888"><a href="{{opt_out_url}}">Borrar suscripción</a></p>
```

---

## Email 2 — D+1 (uso real + storytelling)

**Asunto**: `Cómo usar la plantilla en 15 min sin liarte`

**Cuerpo**:

```html
<p>Hola {{nombre_propio}},</p>

<p>Si ya tienes la plantilla abierta, esto te ahorra una tarde.</p>

<p>El error que veo en el 80% de los psicólogos que la usan: empiezan a meter pacientes <strong>antes</strong> de configurar las propiedades. Y luego les toca migrar.</p>

<p>El orden correcto:</p>
<ol>
  <li>Duplica la base de Pacientes (1 min)</li>
  <li>Edita las opciones del campo "Estado terapia" según tus etapas reales (3 min)</li>
  <li>Importa pacientes con CSV (5 min)</li>
  <li>Conecta plantilla de informe a un paciente: 1 click → Word con datos auto-rellenados</li>
</ol>

<p>Vídeo paso a paso (10 min): <a href="{{loom_uso_url}}">aquí</a></p>

<p>Si te trabas, respóndeme.</p>

<p>Pablo</p>

<p style="font-size:11px;color:#888"><a href="{{opt_out_url}}">Salir</a></p>
```

---

## Email 3 — D+3 (Soft pitch al Pack Premium)

**Asunto**: `{{nombre_propio}}, lo que la plantilla NO hace (todavía)`

**Cuerpo**:

```html
<p>{{nombre_propio}},</p>

<p>La plantilla gratis te ahorra 2-4 horas/semana. Bien. Pero hay 3 cosas que <strong>no resuelve</strong>:</p>

<p>1. <strong>Cobros y suscripciones recurrentes</strong> — sigues persiguiendo pagos manualmente.</p>
<p>2. <strong>Recordatorios automáticos</strong> a pacientes (WhatsApp/email "tienes sesión mañana"). Reduce no-shows del 18% al 4%.</p>
<p>3. <strong>Resumen de sesión generado por IA</strong> tras cada cita: 1 click → resumen redactado en 30s + .docx descargable.</p>

<p>Eso es el <strong>Pack Premium</strong> (498€ de pago único, instalado por nosotros si quieres).</p>

<p>Lo construí porque a mí me devolvió 8h/semana. A los psicólogos beta también.</p>

<p>👉 <a href="{{pack_landing_url}}">Ver qué incluye el Pack Premium</a></p>

<p>Si esta semana es mucho ahora, no pasa nada. La plantilla gratis sigue siendo tuya.</p>

<p>Pablo</p>

<p style="font-size:11px;color:#888"><a href="{{opt_out_url}}">Salir</a></p>
```

---

## Email 4 — D+5 (Caso de cliente + garantía)

**Asunto**: `Lo que pasó tras los primeros 30 días con Marí (testimonial)`

**Cuerpo**:

```html
<p>{{nombre_propio}},</p>

<p>Hace 30 días Marí (psicóloga, 12 años de consulta privada en Bilbao) se compró el Pack Premium con dudas. Me lo dijo claro: <em>"si no me funciona en 14 días, te pido reembolso".</em></p>

<p>Día 30: <strong>0 horas perdidas</strong> en cobros (Stripe automático). <strong>3 horas/semana</strong> recuperadas en redacción de informes (IA hace el primer borrador). <strong>0 no-shows</strong> en las últimas 2 semanas (recordatorios funcionan).</p>

<p>Ya no quiere reembolso 😄.</p>

<p>Te recuerdo que el Pack viene con <strong>garantía de 14 días</strong>: si no te encaja, devolución completa, sin preguntas.</p>

<p>👉 <a href="{{pack_buy_url}}">Comprarlo (498€, pago seguro Stripe)</a></p>

<p>O si prefieres hablar primero: <a href="{{calendly_url}}">25 min vídeo conmigo</a>.</p>

<p>Pablo</p>

<p style="font-size:11px;color:#888"><a href="{{opt_out_url}}">Salir</a></p>
```

---

## Email 5 — D+7 (Stripe link directo + objection handling)

**Asunto**: `Las 3 dudas más frecuentes — y mis respuestas`

**Cuerpo**:

```html
<p>{{nombre_propio}},</p>

<p>De las últimas 30 personas que se interesaron por el Pack, estas son las 3 dudas que aparecieron siempre:</p>

<p><strong>1. "¿Y si no soy técnico/a?"</strong><br>
La instalación tarda 1h. Si no quieres hacerlo, hay opción "Pack + Instalación" (1.349€) — lo dejamos listo nosotros en una semana, tú no tocas nada.</p>

<p><strong>2. "¿Mis datos están seguros?"</strong><br>
RGPD compliant. Notion + Stripe son tier-1 (los usan hospitales). Datos clínicos cifrados. DPA firmable si lo necesitas.</p>

<p><strong>3. "¿Y si no me funciona?"</strong><br>
14 días de garantía. Reembolso completo, sin preguntas, sin papeleo. Le ha pasado a 1 de 23 ventas hasta hoy.</p>

<p>Si las 3 dudas se resuelven, lo siguiente sería tener el Pack ya:</p>

<p>👉 <a href="{{pack_buy_url}}">Pack Premium 498€</a><br>
👉 <a href="{{pack_install_buy_url}}">Pack + Instalación 1.349€</a></p>

<p>Si tienes una 4ª duda que no he tocado, escríbeme aquí mismo. La leo yo.</p>

<p>Pablo</p>

<p style="font-size:11px;color:#888"><a href="{{opt_out_url}}">Salir</a></p>
```

---

## Email 6 — D+12 (Re-engage o despedida limpia)

Solo a quienes NO compraron y NO opt-out.

**Asunto**: `{{nombre_propio}}, paso a no escribirte más`

**Cuerpo**:

```html
<p>{{nombre_propio}},</p>

<p>Llevamos 12 días — te dejo descansar.</p>

<p>Te quedas con la plantilla gratis (es tuya, no la quito). Y si en 1 mes / 6 meses / 1 año decides que el Pack te encaja, escríbeme: <a href="mailto:hola@marli.agency">hola@marli.agency</a>.</p>

<p>Mientras tanto, si te aporta valor lo que publico, mi LinkedIn está aquí: <a href="{{linkedin_pablo}}">{{linkedin_pablo}}</a>.</p>

<p>Cuídate y mucho éxito con tu consulta,<br>Pablo</p>

<p style="font-size:11px;color:#888"><a href="{{opt_out_url}}">Salir definitivamente</a></p>
```

---

## Variables específicas de esta secuencia

```
{{notion_template_url}}     = link de "Duplicate" del template público de Notion
{{word_zip_url}}            = link de descarga del .zip con 5 plantillas Word
{{loom_setup_url}}          = vídeo Loom de 5 min "cómo empezar"
{{loom_uso_url}}            = vídeo Loom de 10 min "uso avanzado"
{{pack_landing_url}}        = https://marli.agency/pack-premium
{{pack_buy_url}}            = link Stripe Payment Link directo (Pack 498€)
{{pack_install_buy_url}}    = link Stripe Payment Link (Pack + Instalación 1.349€)
{{calendly_url}}            = https://calendly.com/marli/demo-25min
{{linkedin_pablo}}          = URL del LinkedIn personal del CEO
{{opt_out_url}}             = link único anti-spam
```

---

## Reglas de salida (exit triggers)

Ningún email más para ese lead si:

1. **Compró** (cualquier producto) → entra a secuencia onboarding
2. **Opt-out** → eliminar de lista permanentemente
3. **Bounce hard** → eliminar
4. **No abre 4 emails seguidos** → pausar 60 días, reactivar con re-engagement diferente

---

## Métrica de éxito

| Métrica | Target |
|---|---|
| Open rate emails 1-3 | > 50% (lead caliente) |
| Click rate al Pack landing | > 18% |
| Conversion a venta | 8-12% |
| Reply rate | > 6% |
| Tiempo medio descarga → compra | 5-8 días |

Si conversion < 5% tras 200 entradas → revisar:
- ¿La landing del Pack convierte? (test directo de tráfico Meta a landing sin pasar por tripwire)
- ¿El precio percibido es alto? (probar pago en 3 cuotas)
- ¿El testimonial real falta? (si no hay caso de Marí, usar caso anónimo "psicóloga clínica de 12 años")
