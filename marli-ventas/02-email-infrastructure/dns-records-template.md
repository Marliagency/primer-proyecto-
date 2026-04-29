# DNS records template — dominios cold email

Copia/pega para configurar Cloudflare DNS de tus dominios secundarios (`get-marli.com`, `marli-team.es`).

---

## Bloque 1 — SPF (autorización)

```
Type: TXT
Name: @
Content: v=spf1 include:_spf.google.com ~all
TTL: Auto
Proxy: DNS only
```

Si usas Zoho en lugar de Google:
```
Content: v=spf1 include:zoho.com ~all
```

Si combinas (Google + MailChannels para algunos automáticos):
```
Content: v=spf1 include:_spf.google.com include:relay.mailchannels.net ~all
```

**Verificar después de 5 min**:
```bash
dig TXT get-marli.com +short
```

---

## Bloque 2 — DKIM (firma)

### Para Google Workspace

1. Admin Console → Apps → Google Workspace → Gmail → Authenticate Email
2. Generate new record (selector: `google`, key length: 2048)
3. Copiar el TXT que muestra
4. Pegarlo en Cloudflare:

```
Type: TXT
Name: google._domainkey
Content: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA[...key larga...]
TTL: Auto
Proxy: DNS only
```

5. Volver al Admin Console → Start authentication

### Para Zoho

1. Mail Admin → Domains → DKIM
2. Add selector → "zoho1"
3. Copia TXT y pega:

```
Type: TXT
Name: zoho1._domainkey
Content: v=DKIM1; k=rsa; p=MIIB[...]
```

### Para Mautic / SMTP propio

Generar par de claves:
```bash
openssl genrsa -out dkim_private.key 2048
openssl rsa -in dkim_private.key -pubout -outform der 2>/dev/null | openssl base64 -A > dkim_public.txt
```

```
Type: TXT
Name: marli._domainkey
Content: v=DKIM1; k=rsa; p=<contenido de dkim_public.txt en una sola línea>
```

---

## Bloque 3 — DMARC (política)

### Semana 1-3 (modo aprendizaje, no rechaza nada)

```
Type: TXT
Name: _dmarc
Content: v=DMARC1; p=none; rua=mailto:dmarc@get-marli.com; ruf=mailto:dmarc@get-marli.com; pct=100; aspf=r; adkim=r
TTL: Auto
```

Recibirás reportes diarios en `dmarc@get-marli.com` con info de qué emails pasan/fallan.

### Semana 4+ (endurece)

```
Content: v=DMARC1; p=quarantine; rua=mailto:dmarc@get-marli.com; pct=100; aspf=r; adkim=r
```

### Mes 3+ (cuando reputación está sólida)

```
Content: v=DMARC1; p=reject; rua=mailto:dmarc@get-marli.com; pct=100; aspf=s; adkim=s
```

---

## Bloque 4 — MX records (recibir respuestas)

### Google Workspace

```
Type: MX  Priority: 1   Name: @  Content: ASPMX.L.GOOGLE.COM
Type: MX  Priority: 5   Name: @  Content: ALT1.ASPMX.L.GOOGLE.COM
Type: MX  Priority: 5   Name: @  Content: ALT2.ASPMX.L.GOOGLE.COM
Type: MX  Priority: 10  Name: @  Content: ALT3.ASPMX.L.GOOGLE.COM
Type: MX  Priority: 10  Name: @  Content: ALT4.ASPMX.L.GOOGLE.COM
```

### Zoho

```
Type: MX  Priority: 10  Name: @  Content: mx.zoho.eu
Type: MX  Priority: 20  Name: @  Content: mx2.zoho.eu
Type: MX  Priority: 50  Name: @  Content: mx3.zoho.eu
```

---

## Bloque 5 — Verificación de dominio

Cuando añadas el dominio en Google Workspace o Zoho, te pedirán verificar propiedad con un TXT:

```
Type: TXT
Name: @
Content: google-site-verification=AbCdEf123...
```

Si añades este TXT al mismo registro que SPF, **separar con líneas distintas** (no concatenar).

---

## Bloque 6 — BIMI (opcional, mejora visual en Gmail/Yahoo)

BIMI muestra tu logo al lado del email en la bandeja del receptor.

```
Type: TXT
Name: default._bimi
Content: v=BIMI1; l=https://get-marli.com/logo.svg
```

Requiere VMC (Verified Mark Certificate) de DigiCert/Entrust para que Gmail lo muestre. Coste: ~1000€/año. Skip en Fase 1.

---

## Checklist de verificación

Después de configurar todo:

```bash
# SPF
dig TXT get-marli.com +short | grep spf

# DKIM
dig TXT google._domainkey.get-marli.com +short

# DMARC
dig TXT _dmarc.get-marli.com +short

# MX
dig MX get-marli.com +short
```

Online verifiers (más rápidos):
- https://mxtoolbox.com/SuperTool.aspx
- https://www.mail-tester.com (mandar un test desde el inbox cold)
- https://dmarcian.com/dmarc-inspector

**Target**:
- mail-tester.com: 10/10
- mxtoolbox: ✅ en SPF, DKIM, DMARC, MX
- 0 blacklists detectadas

Si no llegas a 10/10, revisar el detalle del informe y arreglar antes de empezar warm-up.
