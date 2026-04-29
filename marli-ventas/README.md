# Marli — Ventas (sales execution kit)

Sistema completo de captación, conversión y cierre asíncrono para vender Marli a 10.000 psicólogos en España.

> **Pivote del proyecto**: ya tienes infraestructura (chatbot CRM + creador de informes + web Hostinger + Meta + LinkedIn). Esto es la capa de **vender**, no construir.

---

## Estructura

```
marli-ventas/
├── README.md                          ← este archivo (índice)
├── INSTRUCCIONES-PARA-TI.md           ← qué necesito que hagas tú
├── 00-plan-90-dias.md                 ← roadmap día por día
│
├── 01-lead-generation/                ← scrapers + email verifier (gratis)
│   ├── README.md
│   ├── fuentes-publicas.md            ← 35+ fuentes legítimas de leads
│   ├── scrapers/
│   │   ├── cop-colegiados.mjs         ← scraper Colegios oficiales
│   │   ├── doctoralia.mjs             ← scraper Doctoralia
│   │   └── google-maps.mjs            ← scraper Maps + Places API
│   ├── enrich-domains.mjs             ← encuentra emails en webs
│   ├── verify-emails.mjs              ← DNS + SMTP probe (sin pagar)
│   └── dedupe-and-merge.mjs           ← master-list.csv final
│
├── 02-email-infrastructure/           ← cold email seguro sin quemar dominios
│   ├── README.md
│   ├── dns-records-template.md        ← SPF/DKIM/DMARC plug-and-play
│   └── n8n-cold-email-workflow.json   ← workflow envío rotativo
│
├── 03-cold-email-sequences/           ← 5+6 emails listos para enviar
│   ├── README.md
│   ├── secuencia-tripwire.md          ← 5 emails cold → tripwire
│   ├── secuencia-post-tripwire.md     ← 6 emails tripwire → Pack
│   └── subject-lines-50.md            ← 50 subjects A/B-able
│
├── 04-meta-ads/                       ← ads Facebook + Instagram
│   ├── README.md
│   ├── pixel-install-hostinger.md     ← Pixel + Conversions API
│   ├── custom-audiences-setup.md      ← warm-up de tu lista 10k
│   ├── 6-ad-creatives.md              ← 6 ads con copy + brief diseño
│   └── budget-targeting.md            ← targeting + budget mes 1/2/3
│
├── 05-linkedin-ads/                   ← LinkedIn orgánico + ads (BOFU)
│   ├── README.md
│   └── outreach-manual-templates.md   ← 10 plantillas DM
│
├── 06-async-closing/                  ← cerrar SIN videollamada
│   ├── README.md
│   ├── landing-tripwire.md            ← copy /crm-gratis
│   ├── landing-pack-premium.md        ← copy /pack-premium
│   ├── faq-50.md                      ← 50 objeciones + respuestas
│   ├── loom-script-demo.md            ← script vídeo demo 5 min
│   ├── stripe-payment-links-setup.md  ← cierre 1-clic Stripe
│   └── whatsapp-templates.md          ← 10 templates WhatsApp Business
│
├── 07-content-marketing/              ← orgánico IG + LinkedIn
│   ├── README.md
│   ├── 30-carruseles-script.md        ← 30 carruseles slide-by-slide
│   ├── 15-reels-scripts.md            ← 15 reels 30-60s
│   └── calendario-90-dias.md          ← día por día publicación
│
├── 08-quick-wins-gratis/              ← canales 0€
│   ├── README.md
│   ├── linkedin-x-ray-search.md       ← Sales Nav gratis con Google
│   ├── comunidades-y-foros.md         ← Facebook, Reddit, Slack, podcasts
│   ├── partnerships-sin-coste.md      ← gestorías, influencers, universidades
│   └── seo-on-page-rapido.md          ← 12 artículos blog SEO
│
├── 09-rgpd-legal/                     ← defensa AEPD
│   ├── README.md
│   ├── checklist-rgpd-cold-email.md   ← 8 condiciones + test ponderación
│   ├── email-disclaimers.md           ← footer + opt-out
│   └── politica-privacidad-template.md ← plantilla /privacidad
│
└── 10-tracking-kpis/                  ← medición sin pagar Mixpanel
    ├── README.md
    ├── dashboard-ventas.md            ← KPIs + UTMs + reporting
    └── notion-db-schemas.json         ← 5 DBs Notion (Pipeline, Customers...)
```

---

## El plan en 1 minuto

```
[10.000 psicólogos públicos en España]
    ↓ Scrapers gratis (COP, Doctoralia, Maps)
[Lista verificada master-list.csv]
    ↓ Subir como Custom Audience Meta
[Ads warm-up: 10k psicólogos te ven 3-5 veces]
    ↓ Cold email a la lista (5 emails / 12 días)
[300-500 tripwire opt-ins (CRM gratis)]
    ↓ Email nurturing 7 días + retargeting Meta BOFU
[8-12% compran Pack Premium 498€]
    ↓ Cierre asíncrono (FAQ + Loom + Stripe Payment Link)
[30-50 ventas/mes = 15.000-25.000€/mes revenue]
    ↓ 30% upsell Mantenimiento 300€/mes
[5-15 clientes recurrentes = 1.500-4.500€ MRR]
```

**Sin videollamadas obligatorias**. Calendly visible pero no required.

---

## Costes mes 1

| Cosa | Coste |
|---|---|
| 2 dominios cold | 25€ |
| Google Workspace 5 inboxes | 30€ |
| Meta Ads (mes 1 conservador) | 450€ |
| Canva Pro (opcional) | 12€ |
| Validación legal RGPD (1h despacho) | 200€ |
| **Total mes 1** | **~720€** |

vs revenue mes 1 esperado: **0-3.000€**.
mes 2: **5-15.000€**.
mes 3: **15-30.000€**.

ROI break-even mes 2.

---

## Stack tools (todo gratis o low-cost)

- **Hostinger** (web, ya tienes)
- **Notion** (CRM + tracking, free tier)
- **Stripe** (pagos, free, % por venta)
- **Google Workspace** o **Zoho Mail** (email, 5-30€/mes)
- **Cloudflare** (DNS + Email Routing, gratis)
- **n8n** (automation, ya tienes)
- **Canva** (diseño, gratis o 12€ Pro)
- **CapCut** (vídeo, gratis)
- **Buffer** (programar posts, gratis 10/mes)
- **Loom** (vídeo demo, gratis hasta 5 min)
- **Google Analytics** (web tracking, gratis)
- **Meta Pixel** (ads tracking, gratis)
- **WhatsApp Business** (cierre, gratis)
- **Bardeen** (LinkedIn x-ray, free 100/mes)

**Total stack mensual**: ~30-50€ + ads variable.

---

## Cómo empezar HOY

1. **Lee** `INSTRUCCIONES-PARA-TI.md` (15 min)
2. **Decide** budget mes 1 (mínimo 450€ para ads o 0€ si vas todo orgánico)
3. **Compra** los 2 dominios cold + verifica Stripe Live (2h)
4. **Ejecuta** los 3 scrapers para tener master-list.csv (1 noche corriendo)
5. **Publica** landing `/crm-gratis` (4h)
6. **Activa** primer ad Meta TOFU 10€/día

7 días después: tienes pipeline corriendo. Mes 2 deberían empezar las ventas serias.

---

## Filosofía

1. **Honesto** > agresivo. Cold email respeta opt-out. Ads dicen lo que vendes claro.
2. **B2B real** > consumer trickery. Tu audiencia son profesionales, no impulse buyers.
3. **Asíncrono** > demo obligatoria. Tiempo de tu cliente vale más que tu pitch.
4. **Garantía 14 días** real, sin papeleo. Reembolsos rápidos = trust.
5. **MRR > one-shot**. Mantenimiento es el verdadero juego mes 6+.
6. **Atribución limpia** > vanity metrics. UTMs en cada link.
7. **0€ tools cuando sea posible**. Solo pagar lo que escala revenue.

---

## Próximas iteraciones (post-mes 3)

Cuando tengas 30+ clientes y MRR consolidado:

- **Marli Pro** (1.999€) para clínicas con varios psicólogos
- **API/integraciones** con software clínico existente
- **Comunidad de pago** Slack para clientes (50€/mes adicionales)
- **Cursos asincrónicos** sobre montar consulta privada (497€)
- **Conferencias / Eventos propios** (white label de tu posicionamiento)
- **Internacionalización**: Latam (México, Colombia)
- **Equipo** (VA + diseñadora freelance + customer success)

---

## Soporte

- Lee primero los README de cada subcarpeta
- Para preguntas técnicas / estratégicas: continúa esta conversación
- Para preguntas legales: pagar 1h de despacho RGPD especializado (200-400€)

---

Construido con Claude. Adaptado a tu contexto (Marli Agency, psicólogos España, infraestructura Hostinger + n8n + Stripe + Notion). 

**Activa lo que puedas, mide, itera, escala**. 🚀
