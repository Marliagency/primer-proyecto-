# Disclaimers legales para emails (cold + transaccional)

Footer obligatorio en cada email. Versión corta + larga.

---

## Versión corta — para cold email (recomendado)

Cabe en 3-4 líneas, no abruma el cuerpo:

```html
<p style="font-size:11px;color:#888;border-top:1px solid #eee;padding-top:8px;margin-top:18px">
Recibes este email porque tu correo profesional aparece publicado en tu web/perfil 
COP/Doctoralia bajo régimen B2B (interés legítimo, art. 19 LOPDGDD). 
Si prefieres no recibir más mensajes, <a href="{{opt_out_url}}">pulsa aquí</a> y te 
elimino de inmediato. <a href="https://marli.agency/privacidad">Política de privacidad</a>.<br>
Marli Agency · CIF X-12345678 · Calle Ejemplo 1, 28001 Madrid · dpo@marli.agency
</p>
```

**Versión texto plano** (para emails sin HTML):

```
---
Recibes este email porque tu correo profesional aparece publicado bajo régimen B2B 
(interés legítimo). Para borrar tu suscripción inmediatamente: {{opt_out_url}}
Política de privacidad: https://marli.agency/privacidad
Marli Agency · CIF X-12345678 · Madrid · dpo@marli.agency
```

---

## Versión larga — para post-tripwire / transaccional

Cuando el lead ya ha consentido (descargó el tripwire), puedes usar versión más amigable:

```html
<p style="font-size:11px;color:#888;border-top:1px solid #eee;padding-top:8px;margin-top:18px">
Recibes este email porque te suscribiste al lead magnet de Marli el {{fecha_optin}}.
Si ya no quieres recibir más, <a href="{{opt_out_url}}">cancela aquí</a> en 1 clic.<br>
Marli Agency · CIF X-12345678 · Madrid · <a href="https://marli.agency/privacidad">Privacidad</a> · dpo@marli.agency
</p>
```

---

## Versión transaccional (post-compra)

Comunicaciones a clientes (factura, soporte, onboarding):

```html
<p style="font-size:11px;color:#888;border-top:1px solid #eee;padding-top:8px;margin-top:18px">
Este email forma parte de la relación comercial entre Marli Agency y tu cuenta. 
Si crees que es un error, contáctanos en hola@marli.agency.<br>
Marli Agency · CIF X-12345678 · Madrid
</p>
```

---

## Variables a sustituir antes de enviar

```
{{opt_out_url}} = https://marli.agency/baja?id=XXX&token=YYY
                  (id único + token firmado para anti-tampering)
{{fecha_optin}} = fecha del primer consentimiento
```

---

## Formato del opt-out

### URL del opt-out

`https://marli.agency/baja?id=<lead_id>&token=<hash_anti_tampering>`

El token previene que un tercero genere bajas de leads ajenos. Hash:

```
token = sha256(lead_id + secret_key).slice(0, 16)
```

### Página de baja (un solo botón)

```html
<h1>¿Quieres darte de baja?</h1>
<p>Estás a punto de eliminar tu correo {{email}} de la lista de Marli.</p>

<form method="POST" action="/api/unsubscribe">
  <input type="hidden" name="id" value="{{lead_id}}">
  <input type="hidden" name="token" value="{{token}}">
  <button type="submit">Sí, eliminar mi correo</button>
</form>

<p>Procesado en menos de 60 segundos.</p>
```

**1 clic, 1 confirmación, fuera**. NO hacerlo más complicado (ilegal).

### Confirmación de baja (email automático)

Tras opt-out, mandar email confirmación:

```
Asunto: Confirmación de baja de Marli

Hola {{nombre_o_amigo}},

Tu correo {{email}} ya está fuera de nuestra lista. No recibirás 
más mensajes nuestros.

Si lo hiciste por error, escríbenos a hola@marli.agency en los 
próximos 7 días y lo restauramos.

Si tienes dudas sobre tus datos, dpo@marli.agency.

Pablo
Marli Agency
```

---

## Header List-Unsubscribe (CRÍTICO para deliverability)

Gmail/Outlook penalizan emails sin este header. Añadir SIEMPRE:

```
List-Unsubscribe: <mailto:unsubscribe@marli.agency?subject=unsubscribe>, <https://marli.agency/baja?id=XXX&token=YYY>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

Esto activa el botón "Cancelar suscripción" nativo de Gmail/Outlook → mucho mejor que ir a spam.

En n8n SMTP node, añadir custom headers:

```json
{
  "headers": {
    "List-Unsubscribe": "<{{opt_out_url}}>",
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    "X-Entity-Ref-ID": "{{lead_id}}"
  }
}
```

---

## Idiomas

España multilingue. Considerar versiones:

- Español (default)
- Catalán (si lead en Catalunya)
- Euskera (si lead en País Vasco)

Para empezar: solo español, suficiente.

---

## Tracking de bajas

Notion DB `Opt-outs` con columnas:

| Columna | Tipo |
|---|---|
| Email | Email |
| Fecha baja | Date |
| Origen | Select (cold seq A, post-tripwire, etc.) |
| Motivo | Text (si dejaron comentario) |

**Mantener 5 años** mínimo (LSSI obliga a mantener supresion list).

Antes de cada nuevo envío masivo: verificar que ningún email de la batch está en Opt-outs DB.
