# 03 — Cold Email Sequences

Las dos secuencias listas para enviar con merge tags.

## Inventario

| Archivo | Para quién | Volumen | Conversion target |
|---|---|---|---|
| `secuencia-tripwire.md` | Lead frío de la lista 10k | 10.000 entradas | 3-5% al tripwire (300-500 leads) |
| `secuencia-post-tripwire.md` | Quien descarga el CRM gratis | 300-500/mes | 8-12% al Pack Premium (~30 ventas/mes) |
| `subject-lines-50.md` | Banco de A/B para subjects | — | — |

## Flujo completo

```
[Cold lista 10k psicólogos]
     ↓ Secuencia A (5 emails, 12 días)
     ↓ ~3-5% click + descarga
[300-500 leads tripwire]
     ↓ Secuencia B (6 emails, 12 días)
     ↓ ~8-12% compra
[~30-50 ventas/mes Pack Premium 498€]
     ↓
[≈ 15-25k€ MRR + base para upsell Mantenimiento 300€/mes]
```

## Buenas prácticas resumidas

- **No spammy**: 0 emojis cold, 0 mayúsculas, sin símbolos €/$
- **Identificable**: nombre humano real (Pablo), no "team@" o "marketing@"
- **Honesto sobre origen**: "vi tu email en tu web/Doctoralia"
- **Opt-out fácil**: 1 click en cada email
- **Pausar al responder**: detección automática de reply
- **Reglas de exit**: opt-out, hard bounce, 4 emails sin abrir

## Variables Notion necesarias

Crear en `Settings → Variables` de tu n8n estas vars (ya documentadas en `02-email-infrastructure/`):

```
TRIPWIRE_LANDING_URL=https://marli.agency/crm-gratis
PACK_LANDING_URL=https://marli.agency/pack-premium
PACK_BUY_URL=https://buy.stripe.com/xxx_pack_498
PACK_INSTALL_BUY_URL=https://buy.stripe.com/xxx_pack_install_1349
CALENDLY_URL=https://calendly.com/marli/demo-25min
LOOM_SETUP_URL=https://www.loom.com/share/xxx
LOOM_USO_URL=https://www.loom.com/share/yyy
LINKEDIN_PABLO=https://linkedin.com/in/xxx
OPT_OUT_BASE_URL=https://marli.agency/baja
NOTION_TEMPLATE_PUBLIC_URL=https://www.notion.so/xxx-public-template
WORD_ZIP_URL=https://marli.agency/downloads/plantillas-marli.zip
```

## Próximo paso

→ `../04-meta-ads/` — los anuncios para warm-up de la audiencia ANTES del cold email
