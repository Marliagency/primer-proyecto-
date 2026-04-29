# Instalar Meta Pixel + Conversions API en Hostinger

Sin Pixel: dinero quemado, no puedes retargetear. Es lo PRIMERO que hay que hacer.

## Paso 1 — Crear el Pixel

1. Ir a https://business.facebook.com → **Events Manager**
2. **Connect Data Sources** → **Web** → **Meta Pixel** → Continue
3. Nombre: `Marli Pixel Principal`
4. Web URL: `marli.agency`
5. Continue → te genera un **Pixel ID** de 16 dígitos (anótalo)

## Paso 2 — Instalar el código en Hostinger

### Opción A — Hostinger Builder (drag & drop)

1. Login Hostinger → tu sitio → **Edit website**
2. Settings → **Custom HTML / Tracking codes**
3. **Header section** → pegar este código:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID_16_DIGITOS');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=TU_PIXEL_ID_16_DIGITOS&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

Reemplazar `TU_PIXEL_ID_16_DIGITOS` por tu ID real.

4. Save & Publish.

### Opción B — Hostinger WordPress

1. Login → Hostinger panel → **WordPress**
2. Plugins → Add new → **Insert Headers and Footers** (instalar y activar)
3. Settings → "Insert Headers and Footers"
4. **Scripts in Header**: pegar mismo código
5. Save

## Paso 3 — Verificar que el Pixel dispara

1. Instalar **Meta Pixel Helper** (extensión Chrome)
2. Abrir https://marli.agency
3. Click en el icono Pixel Helper → debería mostrar:
   - ✅ Pixel ID: tu ID
   - ✅ Event: PageView

Si NO se ve → revisar que el código está en el header (no body) y que no hay error de sintaxis.

## Paso 4 — Eventos custom (críticos para tracking del embudo)

Necesitas disparar eventos específicos en momentos clave del funnel:

### Lead (descarga tripwire)

En la página `/gracias-tripwire` (la que se ve tras opt-in):

```html
<script>
fbq('track', 'Lead', {
  content_name: 'CRM Gratis Tripwire',
  content_category: 'lead-magnet',
  value: 0,
  currency: 'EUR'
});
</script>
```

### ViewContent (visitó landing Pack Premium)

En `/pack-premium`:

```html
<script>
fbq('track', 'ViewContent', {
  content_name: 'Pack Premium 498€',
  content_category: 'product',
  value: 498,
  currency: 'EUR'
});
</script>
```

### InitiateCheckout (clicó "Comprar")

Conectar al onclick del botón "Comprar":

```html
<button onclick="fbq('track', 'InitiateCheckout', {value: 498, currency: 'EUR'});" 
        ... >Comprar Pack Premium</button>
```

### Purchase (compra completada — viene de Stripe)

En la página `/gracias-compra` que muestras tras el redirect de Stripe success:

```html
<script>
// Leer datos del query string que Stripe pasa
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('session_id');

fbq('track', 'Purchase', {
  value: 498,
  currency: 'EUR',
  content_name: 'Pack Premium',
  content_ids: ['marli-pack-premium'],
  content_type: 'product'
});
</script>
```

**Mejor aún**: dispararlo server-side via Conversions API (paso 5) para que NO dependa del navegador.

## Paso 5 — Conversions API (server-side, +30% match rate)

El Pixel falla cuando:
- El usuario tiene Adblock
- El navegador bloquea cookies de terceros (iOS 14+, Safari, Firefox)
- El usuario cierra la pestaña antes de que cargue el script

Conversions API manda los eventos **desde tu servidor a Meta**, eliminando esos fallos. **Mejora atribución 25-40%**, lo que se traduce en mejor optimización de campañas.

### Setup

1. Events Manager → tu Pixel → **Settings** → **Conversions API**
2. **Set up manually** → te da un access token
3. Anotarlo (lo usarás en n8n / código backend)

### Implementación en n8n

Cuando llegue webhook Stripe `checkout.session.completed`, además de actualizar Notion, mandar a Meta:

```javascript
// n8n Code node después del webhook handler
const access_token = $env.META_CONVERSIONS_API_TOKEN;
const pixel_id = $env.META_PIXEL_ID;

const event = {
  data: [{
    event_name: 'Purchase',
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: 'https://marli.agency/gracias-compra',
    action_source: 'website',
    user_data: {
      em: [hashSha256(stripe_email)],  // email hasheado
      ph: [hashSha256(stripe_phone)],  // teléfono si lo tienes
      // si tienes el Pixel ID del cliente (lo viste en click ID), añadirlo
      fbp: stripe_metadata.fbp,
      fbc: stripe_metadata.fbc
    },
    custom_data: {
      currency: 'EUR',
      value: 498,
      content_name: 'Pack Premium',
      content_ids: ['marli-pack-premium']
    },
    event_id: `purchase_${stripe_session_id}` // mismo ID que el Pixel client → dedupe
  }]
};

await fetch(`https://graph.facebook.com/v18.0/${pixel_id}/events?access_token=${access_token}`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(event)
});
```

**Importante**: usar el mismo `event_id` en Pixel client y Conversions API → Meta dedupe automáticamente y cuenta solo 1 evento.

## Paso 6 — Test exhaustivo

1. **Test Events**: Events Manager → Test Events → introducir tu URL → ver eventos disparándose en tiempo real al navegar
2. Probar funnel entero: home → tripwire → opt-in → pack landing → click checkout → comprar (con tarjeta test 4242…)
3. Verificar que aparecen los 5 eventos en Test Events: PageView × N, Lead, ViewContent, InitiateCheckout, Purchase

Si algún evento falta → revisar instalación. Sin todos los eventos no puedes optimizar campañas.

## Paso 7 — Configurar dominio en Apple/iOS 14+

Por las restricciones de iOS 14+, hay que verificar el dominio:

1. Events Manager → **Settings** → **Domain Verification** → introducir `marli.agency`
2. Subir un meta tag al `<head>` (te lo dan)
3. **Aggregated Event Measurement**: priorizar 8 eventos máximo. Asignar:
   - Slot 1 (más importante): Purchase (con value)
   - Slot 2: InitiateCheckout
   - Slot 3: Lead
   - Slot 4: ViewContent
   - Slots 5-8: PageView, otros

Sin esto → tracking iOS roto, atribución de ads a Apple users perdida.

---

## Checklist final

- [ ] Pixel ID creado y código instalado en Hostinger header
- [ ] PageView dispara en Pixel Helper
- [ ] Lead, ViewContent, InitiateCheckout, Purchase configurados
- [ ] Conversions API token generado y wirebobado en n8n
- [ ] Domain verified
- [ ] Aggregated Events configurado
- [ ] Test E2E pasado (5 eventos disparándose)

Tiempo total: 2-3h (más Stripe Payment Links).

Sin esto → no se puede hacer retargeting ni medir ROAS. Bloqueante.
