# Runbook 04 — Setup Cloudflare Email Sending

**Tiempo estimado**: 30 min (incluye propagación DNS)
**Pre-requisitos**: dominio `marli.agency` en Cloudflare, cuenta Cloudflare gratuita
**Output**: SPF/DKIM/DMARC configurados + API key + capacidad de enviar emails desde `hola@marli.agency`

> **Nota**: el workflow actual usa **MailChannels** (servicio integrado con Cloudflare Workers, gratuito hasta 5.000 emails/día). Si prefieres SendGrid, AWS SES o Postmark, los conceptos son iguales (SPF/DKIM/DMARC) pero los pasos cambian.

## 1. Configurar SPF (Sender Policy Framework)

SPF dice "estos servidores tienen permiso para enviar emails desde mi dominio". Sin SPF correcto, los emails van a spam o son rechazados.

1. Ir a Cloudflare Dashboard → seleccionar `marli.agency` → **DNS → Records**
2. Add record:
   - Type: **TXT**
   - Name: `@` (raíz del dominio)
   - Content: `v=spf1 include:relay.mailchannels.net include:_spf.mx.cloudflare.net ~all`
   - TTL: Auto
   - Proxy status: DNS only (no naranja)
3. Save

Verificar después de 5 min con:

```bash
dig TXT marli.agency +short
```

Debe aparecer la línea `v=spf1 ...`.

## 2. Configurar DKIM (DomainKeys Identified Mail)

DKIM firma cada email saliente con clave privada. Receptor verifica con clave pública en DNS. Sin DKIM, Gmail/Outlook bajan prioridad o marcan spam.

### Para MailChannels:

1. Generar par de claves:

```bash
openssl genrsa -out dkim_private.key 2048
openssl rsa -in dkim_private.key -pubout -outform der 2>/dev/null \
  | openssl base64 -A > dkim_public.txt
```

2. En Cloudflare DNS → Add record:
   - Type: **TXT**
   - Name: `mailchannels._domainkey`
   - Content: `v=DKIM1; k=rsa; p=$(cat dkim_public.txt)` (sustituye con el contenido real)
   - TTL: Auto

3. Configurar MailChannels para que use esa key privada (vía endpoint `/tx/v1/send` con header `MC-DKIM-Selector` y `MC-DKIM-PrivateKey`). Alternativa más sencilla: MailChannels firma automático si el dominio tiene SPF correcto y eres customer Cloudflare.

> **Para Fase 1 simple**: si MailChannels firma automático con su propia key (validada porque tu SPF la incluye), te ahorras la generación de claves DKIM propia. Lo importante es que el receptor pase verificación DKIM, ya sea propia o delegada.

Verificar:

```bash
dig TXT mailchannels._domainkey.marli.agency +short
```

## 3. Configurar DMARC (Domain-based Message Authentication)

DMARC dice "qué hacer si SPF o DKIM fallan". Es la guinda. Configurar en modo `quarantine` (no `reject`) los primeros 30 días.

1. Cloudflare DNS → Add record:
   - Type: **TXT**
   - Name: `_dmarc`
   - Content: `v=DMARC1; p=quarantine; rua=mailto:dmarc@marli.agency; pct=100; aspf=r; adkim=r`
   - TTL: Auto

Después de 30 días sin problemas, cambiar `p=quarantine` a `p=reject` para máxima protección.

Verificar:

```bash
dig TXT _dmarc.marli.agency +short
```

## 4. Crear API Token de Cloudflare

n8n necesita un token con permisos para llamar a la API de envío de emails (en realidad para los workflows actuales no se necesita un token Cloudflare API si usamos MailChannels directo — el endpoint `api.mailchannels.net/tx/v1/send` no requiere auth con Cloudflare; valida por la IP origen).

**Si tu n8n corre en Cloudflare Workers**: el envío es free + automático.

**Si corre fuera (ej. n8n Cloud Pro)**: necesitas usar el header `Authorization: Bearer <api_key>` con tu Cloudflare API token. Crearlo así:

1. Ir a https://dash.cloudflare.com/profile/api-tokens → **Create Token**
2. Use template **Custom token**
3. Permissions:
   - Account → Email Routing → **Edit** (si usas Email Routing también)
   - Zone → Email → **Edit** para `marli.agency`
4. Account Resources: include your account
5. Zone Resources: include `marli.agency`
6. TTL: ninguno (o 1 año, rotable)
7. Continue → Create Token → copiar valor (solo se muestra UNA vez)
8. Guardar en `.env` como `CLOUDFLARE_EMAIL_API_KEY=xxx`

> **Nota**: los workflows n8n están escritos para llamar `api.mailchannels.net` directamente. Si decides cambiar a la API REST de Cloudflare Email, hay que ajustar el `url` en los nodos HTTP Request.

## 5. Test de envío

```bash
curl -X POST https://api.mailchannels.net/tx/v1/send \
  -H "Content-Type: application/json" \
  -d '{
    "personalizations":[{"to":[{"email":"tu-email@gmail.com","name":"Test"}]}],
    "from":{"email":"hola@marli.agency","name":"Marli Test"},
    "subject":"Test desde marli.agency",
    "content":[{"type":"text/plain","value":"Hola, esto es un test desde Marli."}]
  }'
```

Esperado: HTTP 202 Accepted. Email llega en < 1 min.

**Verificar en Gmail/Outlook**:
- ✅ NO está en spam
- ✅ Header "via" está vacío (no muestra dominio intermediario)
- ✅ "Show original" → SPF: PASS, DKIM: PASS, DMARC: PASS

Si alguno falla → revisar registros DNS y propagación (puede tardar hasta 48h, normalmente 5 min).

## 6. Configurar Email Routing (recibir emails)

Para que `hola@marli.agency` reciba emails (no solo envíe):

1. Cloudflare Dashboard → marli.agency → **Email → Email Routing → Get Started**
2. Add destination address: tu email personal (Gmail, etc.)
3. Add custom address: `hola@marli.agency` → forward a destination
4. Cloudflare auto-configura los MX records.
5. Verificar email destino (te llegará un email de confirmación).

Adicional: `info@`, `soporte@`, `informes@` con sus respectivos forwards.

## 7. Política de envío

- **Bounce rate target**: < 2%. Si un destinatario rebota 2 veces, marcar `Email Inválido` en Notion y dejar de enviarle.
- **Spam complaint rate**: < 0.1%. Si llega complaint, marcar `unsubscribed` y borrar.
- **Volumen**: MailChannels free tier = 5.000/día. Más allá: SendGrid (50€/mes para 100k) o AWS SES (~1€/10k).

## Troubleshooting

| Síntoma | Diagnóstico | Fix |
|---|---|---|
| Email va a spam | DKIM no firma | Verificar `MC-DKIM-Selector` o usar firma automática MailChannels |
| HTTP 500 al enviar | API key inválida | Regenerar en Cloudflare |
| HTTP 401 | Auth wrong | Verificar header format `Authorization: Bearer xxx` |
| `MX records not configured` | Email Routing no completado | Volver al paso 6 |
| Gmail "via api.mailchannels.net" visible | DKIM mal | Pausar y configurar DKIM propio |

## Próximo paso

→ `05-import-workflows.md`
