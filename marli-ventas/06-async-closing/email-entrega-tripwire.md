# Email de entrega del tripwire — el que delivra el CRM

**El email que se dispara cuando alguien introduce su email en /crm-gratis**. Esto es lo que tu lead realmente espera.

**Disparado por**: workflow n8n `01-lead-magnet-capture` (ya construido en `marli-deploy/n8n-workflows/`)

**Tiempo de entrega**: < 60 segundos desde el opt-in. Si tarda más → revisar n8n.

---

## Email principal — entrega inmediata

**Asunto**: `Aquí tienes tu plantilla Marli, {{nombre_propio}} 📦`

**De**: Pablo (Marli) `<pablo@marli.agency>`

**Cuerpo HTML**:

```html
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0F172A;max-width:600px;margin:0 auto;padding:24px">

<p>Hola {{nombre_propio}},</p>

<p>¡Bienvenido/a! Aquí tienes tus archivos:</p>

<table cellpadding="12" cellspacing="0" style="width:100%;border-collapse:collapse;margin:16px 0">
  <tr>
    <td style="border:1px solid #E2E8F0;border-radius:8px;background:#F8FAFC">
      <strong>📊 Plantilla CRM en Notion</strong><br>
      Base de datos de pacientes con etapas de terapia, histórico, próxima cita.
      <br><br>
      <a href="{{notion_template_public_url}}" style="display:inline-block;background:#6366F1;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:600">
        Duplicar a tu Notion →
      </a>
    </td>
  </tr>
  <tr><td style="height:8px"></td></tr>
  <tr>
    <td style="border:1px solid #E2E8F0;border-radius:8px;background:#F8FAFC">
      <strong>📄 5 plantillas de informes (Word)</strong><br>
      Psicológico, neuropsicológico, infantil, evaluación, alta terapéutica.
      <br><br>
      <a href="{{word_zip_url}}" style="display:inline-block;background:#6366F1;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:600">
        Descargar .zip →
      </a>
    </td>
  </tr>
  <tr><td style="height:8px"></td></tr>
  <tr>
    <td style="border:1px solid #E2E8F0;border-radius:8px;background:#F8FAFC">
      <strong>🎬 Vídeo guía (5 min)</strong><br>
      Cómo configurarlo paso a paso, sin liarte.
      <br><br>
      <a href="{{loom_setup_url}}" style="display:inline-block;background:#6366F1;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;font-weight:600">
        Ver vídeo →
      </a>
    </td>
  </tr>
</table>

<p><strong>2 minutos de setup y ya estás trabajando con ello.</strong></p>

<p>Si mañana o pasado se te atasca algo, contesta a este email. Lo leo yo (Pablo). Si me preguntas algo personal de tu consulta, te respondo en serio.</p>

<p>Un abrazo y mucho éxito,<br>
<strong>Pablo</strong><br>
<span style="color:#64748B">Marli — herramientas para psicólogos en consulta privada</span></p>

<hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0">

<p style="font-size:11px;color:#94A3B8">
Recibes este email porque te suscribiste al lead magnet de Marli el {{fecha_optin}}. 
Si ya no quieres recibir más, <a href="{{opt_out_url}}" style="color:#94A3B8">cancela aquí</a> en 1 clic.<br>
Marli Agency · CIF X-XXXXXXXX · {{direccion_fiscal}} · 
<a href="https://marli.agency/privacidad" style="color:#94A3B8">Política de privacidad</a> · 
<a href="mailto:dpo@marli.agency" style="color:#94A3B8">dpo@marli.agency</a>
</p>

</body>
</html>
```

**Versión texto plano** (anti-spam, mejora deliverability):

```
Hola {{nombre_propio}},

¡Bienvenido/a! Aquí tienes tus archivos:

📊 PLANTILLA CRM EN NOTION
Duplicar a tu Notion: {{notion_template_public_url}}

📄 5 PLANTILLAS DE INFORMES (WORD)
Descargar: {{word_zip_url}}

🎬 VÍDEO GUÍA (5 MIN)
Ver: {{loom_setup_url}}

2 minutos de setup y ya estás trabajando con ello.

Si mañana o pasado se te atasca algo, contesta a este email. 
Lo leo yo (Pablo). Si me preguntas algo personal de tu consulta, 
te respondo en serio.

Un abrazo y mucho éxito,

Pablo
Marli — herramientas para psicólogos en consulta privada

---
Te suscribiste el {{fecha_optin}}. Borrarse: {{opt_out_url}}
Marli Agency · {{direccion_fiscal}} · marli.agency/privacidad
```

---

## Variables a configurar (Notion → n8n env)

```
NOTION_TEMPLATE_PUBLIC_URL   → URL pública de "Duplicate" del template Notion
                               (Share template → Get link → "Allow duplicate as template")
                               Ejemplo: https://www.notion.so/marli/CRM-Psicologos-Plantilla-abc123

WORD_ZIP_URL                 → URL pública del .zip con las 5 plantillas
                               Subir a S3, Cloudflare R2, Hostinger, o Google Drive público
                               Ejemplo: https://marli.agency/downloads/plantillas-marli.zip

LOOM_SETUP_URL               → URL del Loom de 5 min (unlisted)
                               Ejemplo: https://www.loom.com/share/abc123def456

OPT_OUT_BASE_URL             → https://marli.agency/baja
                               Concatenar con ?id={{lead_id}}&token={{token}}

DIRECCION_FISCAL_MARLI       → "Calle X, 28001 Madrid"

CIF_MARLI                    → tu CIF/NIF real
```

---

## Setup en n8n

El workflow `01-lead-magnet-capture.json` (ya existe en `marli-deploy/n8n-workflows/`) hace:

1. Recibe POST en `/webhook/marli-lead-magnet` con `{email, nombre, fuente, utm_*}`
2. Valida email (regex)
3. Crea row en Notion DB Leads (status `tripwire_descargado`)
4. Manda este email vía MailChannels / SMTP
5. Inicia secuencia post-tripwire programada (D+1, D+3, D+5, D+7, D+12)

**Nota importante**: este email se envía desde `pablo@marli.agency` (dominio principal, NO cold). Eso es correcto: es **transaccional** (consintieron al opt-in), no cold. Por eso protege la reputación del dominio principal.

---

## Test antes de activar

1. Configurar todas las variables de entorno
2. Submit form de prueba con tu Gmail
3. Verificar:
   - Email llega en < 60 segundos
   - Llega a INBOX (no Promotions, no Spam)
   - Los 3 botones (Notion, ZIP, Loom) funcionan
   - Footer + opt-out URL funcionan
4. Test con otro email distinto desde móvil
5. Click en opt-out URL → confirmar que borra el lead

Si los 5 pasos OK → activar.

---

## Métricas de éxito

| Métrica | Target |
|---|---|
| Tiempo entrega | < 60s |
| Bounce rate (email no llega) | < 1% |
| Llegada a INBOX vs Promotions/Spam | > 90% INBOX |
| Open rate | > 80% (es esperado, lo pidieron) |
| Click rate (alguno de los 3 links) | > 60% |
| Loom completion | > 50% |

Si **open rate < 70%** → email cayendo en Promotions. Revisar copy (menos botones, más texto), DKIM, IP reputation.

---

## Variantes del email (probar después)

### Variante B — más informal

Mismo contenido pero con tone más cercano: "¡Te lo dejo aquí 👇" en lugar de tabla formal. Probar en A/B después de 200 envíos para ver si conversion (clic) sube.

### Variante C — sin Loom embebido (delivery-only)

Solo entrega los 2 archivos sin Loom (más limpio). Loom se manda en email D+1 separado. Test si reduce overwhelming.

---

## Si alguien responde

Dado que el email viene de `pablo@marli.agency` (no cold inbox), las respuestas llegan a tu inbox real. Reglas:

- **Lo leo yo** (no automatizar): cada reply es lead caliente
- Responder en < 24h en horario, < 4h ideal
- Marcar manualmente status del lead en Notion: `respondio_tripwire`
- 3 respuestas posibles:
  - Pregunta producto → respuesta + CTA Pack Premium
  - Pregunta técnica/setup → resolver + reforzar valor
  - "Mil gracias, ya lo veo" → agendar follow-up D+5

---

Después de este email, secuencia post-tripwire (`secuencia-post-tripwire.md`) sigue con D+1, D+3, D+5, D+7, D+12.
