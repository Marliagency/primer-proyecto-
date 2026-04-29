# 02 — Email Infrastructure (envío seguro de cold email)

Setup técnico para enviar 10.000 emails sin quemar tu dominio principal `marli.agency` ni acabar en blacklists.

## Por qué NO usar marli.agency para cold

Si envías cold (mensajes no solicitados) desde tu dominio principal:
- Spam complaints → reputación dañada
- Gmail/Outlook empiezan a marcar emails transaccionales (facturas, recibos) como spam
- Pérdida silenciosa de comunicación con clientes reales
- Recuperar reputación tarda 3-6 meses

**Regla**: el dominio que cobra (marli.agency) **nunca** envía cold. Solo transaccionales.

## Arquitectura propuesta

```
marli.agency  ────► Solo transaccionales (cliente paga, factura, soporte)
                    SPF/DKIM/DMARC estricto, reputación protegida

get-marli.com ────► Cold email outreach (psicólogos)
                    Subdominio del CEO: pablo@get-marli.com
                    Pool de 3-4 inboxes rotando

marli-team.es ────► Cold email outreach #2 (rotación)
                    laura@marli-team.es, david@marli-team.es

[opcional]
marlilabs.com ────► Tercer dominio si volumen > 5.000/mes
```

Coste: 3 dominios × 10€/año = **30€/año** (no 30€/mes).

## Setup paso a paso

### 1. Comprar dominios secundarios

Dominios cortos, con marca asociable a Marli pero **sin ser idénticos**:

- `get-marli.com` (~12€/año en Cloudflare Registrar)
- `marli-team.es` (~10€/año)
- `marlitools.com` o `marlilabs.com` (opcional, tercer dominio)

**Importante**: comprar en Cloudflare, Namecheap o Porkbun (NO en GoDaddy → revende datos).

### 2. Configurar DNS de cada dominio cold

Para cada dominio, replicar la config de `marli.agency` pero apuntando a tu proveedor de envío.

#### 2.1 — SPF

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com include:relay.mailchannels.net ~all
```

Si usas Google Workspace para los inboxes: `include:_spf.google.com`.
Si usas Zoho Mail (más barato, ~1€/inbox/mes): `include:zoho.com`.

#### 2.2 — DKIM

Activar en el panel de tu proveedor (Google/Zoho/etc.) → te da el TXT a copiar.

```
Type: TXT
Name: google._domainkey  (o el selector que indique tu proveedor)
Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhk[...]
```

#### 2.3 — DMARC

**Empezar suave** y endurecer en semana 4:

```
# Semana 1-3 (modo learning)
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@get-marli.com; pct=100

# Semana 4+ (cuando reputación está construida)
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@get-marli.com; pct=100
```

#### 2.4 — MX records

Si Google Workspace:
```
Priority 1: ASPMX.L.GOOGLE.COM
Priority 5: ALT1.ASPMX.L.GOOGLE.COM
Priority 5: ALT2.ASPMX.L.GOOGLE.COM
```

Si Zoho:
```
Priority 10: mx.zoho.eu
Priority 20: mx2.zoho.eu
```

### 3. Crear inboxes (3-4 por dominio)

Nombres reales humanos (NO "ventas@" o "marketing@"):

**get-marli.com**:
- pablo@get-marli.com (CEO real)
- maria@get-marli.com (account manager fictícia)
- david@get-marli.com (ídem)

**marli-team.es**:
- laura@marli-team.es
- carlos@marli-team.es

**Total**: 5-6 inboxes rotando. Capacidad combinada: 250-400 emails/día seguros.

### 4. Warm-up (4 semanas obligatorias)

Un dominio nuevo enviando 100 emails día 1 = directo a spam.

**Calendario warm-up manual** (sin pagar Lemwarm/Smartlead):

| Día | Volumen/inbox | Total/día | Tipo |
|---|---|---|---|
| 1-3 | 5 | 25-30 | A amigos/familia (te respondan) |
| 4-7 | 10 | 50-60 | A tus clientes existentes |
| 8-14 | 20 | 100-120 | A red profesional (LinkedIn 1st degree) |
| 15-21 | 35 | 175-210 | Mix red + primer cold suave |
| 22-28 | 50 | 250-300 | Cold outreach normal |
| 29+ | 50-80 | 300-450 | Operación normal |

**Truco gratuito**: usa **Mailwarm.io** trial (7 días gratis) o crea pool con compañeros que también hagan warm-up.

**Truco mejor**: warm-up con tus propios contactos. Pídeles que respondan a tu email y marquen como "no es spam" si va a spam. 30 personas × 4 semanas = reputación construida sin coste.

### 5. Volumen seguro por inbox

Reglas Google Workspace:
- 500 emails/día limit técnico
- **Recomendado real**: 50/día/inbox por reputación
- 80%+ con respuesta humana > 0% reply rate (críticos para reputación)

Si bounce rate > 4% en cualquier momento → **PARAR** ese inbox 7 días.
Si spam rate > 0.3% → quemar inbox (cerrar y crear nuevo).

### 6. Software de envío

#### Opción A — Gratis (DIY con n8n)

Ver `n8n-cold-email-workflow.json` en esta carpeta. Workflow que:
1. Lee CSV de leads
2. Asigna inbox rotativamente
3. Envía vía SMTP de Google
4. Personaliza con merge tags
5. Espera 30-90s entre envíos
6. Logs a Notion DB de tracking

Limitación: no warm-up automático ni reply detection.

#### Opción B — Smartlead.ai (97€/mes, recomendado para serio)

Si los 97€/mes te encajan, es claramente lo mejor:
- Warm-up automático
- Multi-inbox rotation
- Reply detection (pausa secuencia si responde)
- Inbox health monitoring
- Bounce auto-removal

#### Opción C — Mautic self-hosted (gratis)

Mautic es la versión open-source de HubSpot. Lo puedes correr en VPS 5€/mes. Curva de aprendizaje: alta (1-2 días setup).

**Recomendación pragmática**:
- Volumen < 500 emails/día → DIY con n8n (plan gratis)
- Volumen > 500/día → Smartlead.ai (97€/mes vs ahorro de tiempo)

## Verificar que está bien configurado

Antes de mandar 1 cold email real:

1. Test en https://www.mail-tester.com (target: 10/10)
2. Test en https://www.mxtoolbox.com/SuperTool.aspx (chequear blacklists)
3. Test envío a tu Gmail personal y revisar:
   - Llega a INBOX (no spam)
   - Header "via" no muestra dominio intermediario raro
   - "Show original" → SPF: PASS, DKIM: PASS, DMARC: PASS

Si **alguno falla** → no enviar cold hasta arreglar.

## Coste total infraestructura

| Cosa | Mensual |
|---|---|
| 3 dominios | 2.5€ (30€/año / 12) |
| Google Workspace 5 inboxes | 30€ (Business Starter 6€/inbox) |
| Alternativa Zoho 5 inboxes | 5€ (1€/inbox) |
| n8n DIY workflow | 0€ |
| Smartlead opcional | 97€ |
| **Total mínimo (Zoho + n8n)** | **~7.5€/mes** |
| Total con Google + Smartlead | ~130€/mes |

**Recomendación inicial**: Zoho + n8n + warm-up manual = **~8€/mes** y cubres los 10k.

## Próximo paso

→ `../03-cold-email-sequences/` — qué escribir en los emails
