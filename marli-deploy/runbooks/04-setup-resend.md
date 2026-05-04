# Runbook 04 — Setup Resend (email transaccional)

**Tiempo estimado**: 25 min (incluye propagación DNS)
**Pre-requisitos**: dominio `marli.agency` con DNS gestionado (Cloudflare, Hostinger, etc.), cuenta Resend gratuita
**Output**: dominio verificado en Resend + API key + capacidad de enviar emails desde `hola@marli.agency`

> **Por qué Resend y no MailChannels**: MailChannels cerró su free tier para Cloudflare Workers en 2024. Resend es la alternativa más sencilla con free tier 3.000 emails/mes y dominio custom. Si prefieres AWS SES (más barato a escala) o Postmark, los conceptos son iguales — sólo cambian los DNS records y el endpoint API.

---

## 1. Crear cuenta y verificar dominio en Resend

1. Ir a https://resend.com → **Sign up** (free, sin tarjeta)
2. Una vez dentro: **Domains → Add Domain → `marli.agency`**
3. Resend te da 3 DNS records (TXT) que tienes que añadir a tu DNS:
   - **SPF**: `v=spf1 include:_spf.resend.com ~all` en `@`
   - **DKIM**: TXT en `resend._domainkey` con value `p=MIGfMA0GCSqGSIb3DQEBAQUAA...` (Resend te lo genera)
   - **DMARC** (opcional pero recomendado): TXT en `_dmarc` con value `v=DMARC1; p=quarantine; rua=mailto:postmaster@marli.agency`

## 2. Configurar DNS

Si tu DNS está en **Cloudflare**:
1. Cloudflare Dashboard → seleccionar `marli.agency` → **DNS → Records**
2. Add record para cada uno de los 3:
   - Type: **TXT**
   - Name: el que indique Resend (`@`, `resend._domainkey`, `_dmarc`)
   - Content: el value que indique Resend
   - TTL: Auto
   - Proxy status: DNS only (no naranja — los TXT no se proxifican)
3. Save

Si tu DNS está en **Hostinger** o similar:
- Mismo procedimiento, dentro de su panel DNS.

## 3. Verificar propagación DNS

Esperar 5-10 min y verificar:

```bash
dig TXT marli.agency +short
dig TXT resend._domainkey.marli.agency +short
dig TXT _dmarc.marli.agency +short
```

Cada query debe devolver el value que pegaste.

## 4. Validar dominio en Resend

En el panel de Resend → **Domains → marli.agency** → click **Verify DNS Records**.

Debe aparecer **Verified** en los 3 (SPF, DKIM, DMARC).

Si alguno tarda > 30 min en verificar:
- Verificar otra vez con `dig` desde fuera de tu red
- Cloudflare a veces necesita "Purge cache" desde el dashboard

## 5. Crear API Key

1. Resend → **API Keys → Create API Key**
2. Name: `marli-n8n-prod`
3. Permission: **Full access** (para Fase 1; en producción restringe a `Sending access` solo)
4. Domain: `marli.agency`
5. Copiar la API key (formato `re_xxxxxxxxxxxx`) — **no se vuelve a mostrar**

## 6. Configurar variable de entorno en n8n

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
```

En n8n self-hosted: añadir a `.env` del contenedor y reiniciar.
En n8n cloud: **Settings → Variables → Create variable**.

## 7. Test de envío

Desde terminal o desde un workflow de prueba en n8n:

```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "Marli <hola@marli.agency>",
    "to": ["tu-email@gmail.com"],
    "subject": "Test desde Resend",
    "html": "<p>Si lees esto, el setup va.</p>"
  }'
```

Respuesta esperada: 200 OK con `{ "id": "..." }`. El email debe llegar en < 30s a tu bandeja, NO a spam.

## 8. Test de SPF/DKIM/DMARC en el email recibido

Abrir el email en Gmail → **3 puntos → Show original**:

```
SPF: PASS with IP ...
DKIM: PASS with domain marli.agency
DMARC: PASS
```

Si alguno dice **FAIL** o **NEUTRAL**, no envíes en producción aún — los emails irán a spam.

Test adicional: https://www.mail-tester.com — score debe ser **9/10** o **10/10**.

---

## Volumen y coste

- **Free tier Resend**: 3.000 emails/mes, 100/día — suficiente para Fase 1.
- **Pro tier**: $20/mes por 50.000 emails/mes — cuando Marli escale a 100+ clientes.
- Alternativas si superas: AWS SES ~$0.10/1000 emails, Postmark $15/mes.

## Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| Resend dice "DNS not verified" tras 1h | Cache DNS local | `dig +trace` para ver propagación real |
| Email llega a spam | DKIM no verifica | Re-verificar TXT `resend._domainkey` exacto (sin saltos de línea) |
| 401 Unauthorized en API | API key mal copiada o sin permission Domain | Crear key nueva con scope correcto |
| Gmail muestra "via resend.com" | DKIM no firma | El record DKIM no está bien — revisar value exacto |
| Bounce rate > 5% | Lista con emails inválidos | Filtrar con `marli-ventas/01-lead-generation/verify-emails.mjs` antes |

## Migración desde MailChannels (legacy)

Si tienes workflows viejos apuntando a `api.mailchannels.net/tx/v1/send`:

1. Reemplazar URL: `https://api.resend.com/emails`
2. Cambiar header: `Authorization: Bearer ${RESEND_API_KEY}` (sí, también es Bearer)
3. Cambiar shape del body:
   - **De** `{ "personalizations": [{ "to": [...] }], "from": { "email": "...", "name": "..." }, "content": [{ "type": "text/html", "value": "..." }] }`
   - **A** `{ "from": "Name <email@domain>", "to": ["..."], "subject": "...", "html": "..." }`
4. Variable env: cambiar `CLOUDFLARE_EMAIL_API_KEY` → `RESEND_API_KEY`

Los workflows en `marli-deploy/n8n-workflows/` ya están migrados (audit Fase A, mayo 2026).
