# Página /baja — opt-out 1 clic (HTML completo)

Listo para copy/paste en Hostinger Builder o página estática. RGPD-compliant.

---

## HTML de la página `/baja`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex,nofollow">
  <title>Cancelar suscripción — Marli</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
      background: #F8FAFC;
      color: #0F172A;
      margin: 0;
      padding: 24px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card {
      max-width: 480px;
      width: 100%;
      background: white;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    h1 {
      font-size: 22px;
      margin: 0 0 16px;
      font-weight: 600;
    }
    p {
      color: #475569;
      line-height: 1.6;
      margin: 12px 0;
    }
    .email {
      font-family: 'SF Mono', Monaco, monospace;
      background: #F1F5F9;
      padding: 6px 10px;
      border-radius: 4px;
      font-size: 14px;
    }
    button {
      background: #DC2626;
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 16px;
      transition: background 0.15s;
    }
    button:hover { background: #B91C1C; }
    button:disabled {
      background: #94A3B8;
      cursor: not-allowed;
    }
    .secondary {
      background: transparent;
      color: #64748B;
      margin-top: 8px;
    }
    .secondary:hover { background: #F1F5F9; }
    .success {
      color: #059669;
      font-weight: 600;
      font-size: 18px;
    }
    .error {
      color: #DC2626;
    }
    a { color: #6366F1; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .footer {
      margin-top: 32px;
      font-size: 12px;
      color: #94A3B8;
    }
    .hidden { display: none; }
  </style>
</head>
<body>

  <div class="card">

    <!-- Estado inicial: pedir confirmación -->
    <div id="state-confirm">
      <h1>¿Quieres darte de baja?</h1>
      <p>Estás a punto de eliminar tu correo:</p>
      <p><span class="email" id="email-display">cargando...</span></p>
      <p>de la lista de Marli. No volverás a recibir nuestros emails.</p>

      <button id="btn-confirm">Sí, eliminar mi correo</button>
      <br>
      <button class="secondary" onclick="window.location.href='https://marli.agency'">
        He cambiado de opinión, llévame a marli.agency
      </button>
    </div>

    <!-- Estado en proceso -->
    <div id="state-processing" class="hidden">
      <h1>Procesando...</h1>
      <p>Eliminando tu correo de la lista. Esto tarda menos de 60 segundos.</p>
    </div>

    <!-- Estado éxito -->
    <div id="state-success" class="hidden">
      <h1 class="success">✓ Listo</h1>
      <p>Tu correo <span class="email" id="email-success"></span> ya está fuera de nuestra lista.</p>
      <p>No recibirás más mensajes nuestros.</p>
      <p style="margin-top: 24px; font-size: 13px;">
        Si lo hiciste por error, escríbenos a 
        <a href="mailto:hola@marli.agency">hola@marli.agency</a> 
        en los próximos 7 días y lo restauramos.
      </p>
    </div>

    <!-- Estado error -->
    <div id="state-error" class="hidden">
      <h1 class="error">Algo no fue bien</h1>
      <p id="error-message">No pudimos procesar tu solicitud automáticamente.</p>
      <p>Por favor, escríbenos a 
        <a href="mailto:dpo@marli.agency">dpo@marli.agency</a> 
        con el asunto "Baja" y procesaremos tu solicitud manualmente en menos de 24h.
      </p>
    </div>

    <div class="footer">
      Marli Agency<br>
      <a href="https://marli.agency/privacidad">Política de privacidad</a> · 
      <a href="mailto:dpo@marli.agency">dpo@marli.agency</a>
    </div>

  </div>

<script>
  // Leer parámetros URL
  const params = new URLSearchParams(window.location.search);
  const leadId = params.get('id');
  const token = params.get('token');
  const emailFromUrl = params.get('email'); // opcional, para mostrar

  // Mostrar email si venía en URL (más amigable)
  const emailDisplay = document.getElementById('email-display');
  if (emailFromUrl) {
    emailDisplay.textContent = emailFromUrl;
    document.getElementById('email-success').textContent = emailFromUrl;
  } else {
    emailDisplay.textContent = 'tu correo';
    document.getElementById('email-success').textContent = 'tu correo';
  }

  // Validar que tenemos id + token
  if (!leadId || !token) {
    showError('Link inválido o expirado.');
  }

  // Click handler
  document.getElementById('btn-confirm').addEventListener('click', async () => {
    const btn = document.getElementById('btn-confirm');
    btn.disabled = true;
    btn.textContent = 'Procesando...';

    showState('state-processing');

    try {
      const response = await fetch('https://marli.app.n8n.cloud/webhook/marli-opt-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, token: token })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        showState('state-success');
        if (data.email) {
          document.getElementById('email-success').textContent = data.email;
        }
      } else {
        showError(data.message || 'No se pudo procesar la baja.');
      }
    } catch (err) {
      console.error(err);
      showError('Error de conexión. Por favor, inténtalo de nuevo o escríbenos directamente.');
    }
  });

  function showState(stateId) {
    ['state-confirm', 'state-processing', 'state-success', 'state-error'].forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(stateId).classList.remove('hidden');
  }

  function showError(msg) {
    document.getElementById('error-message').textContent = msg;
    showState('state-error');
  }
</script>

</body>
</html>
```

---

## Endpoint n8n del opt-out

Crear workflow n8n nuevo: `marli-opt-out` con webhook `/webhook/marli-opt-out`.

### Lógica

```
1. Recibe POST { id, token }
2. Verifica token: sha256(id + SECRET_KEY).slice(0, 16) === token
3. Si NO match → return { success: false, message: "Token inválido" }
4. Si match:
   a. Buscar lead en Notion DB Sales Pipeline
   b. Update status → "opt_out"
   c. Crear row en Notion DB Opt-outs con email + fecha + origen
   d. Cancelar todas las secuencias futuras del lead
5. Return { success: true, email: "user@example.com" }
```

### Code node n8n (verificación token)

```javascript
const crypto = require('crypto');

const { id, token } = $input.first().json;
const SECRET = $env.OPT_OUT_SECRET_KEY;

const expected = crypto
  .createHash('sha256')
  .update(id + SECRET)
  .digest('hex')
  .slice(0, 16);

if (expected !== token) {
  return [{ json: { success: false, message: 'Token inválido' } }];
}

return [{ json: { id, token, valid: true } }];
```

### Generación del token (en cada email enviado)

```javascript
// En cualquier workflow que mande email cold/transaccional
const crypto = require('crypto');
const SECRET = $env.OPT_OUT_SECRET_KEY;

const leadId = $json.lead_id;
const token = crypto
  .createHash('sha256')
  .update(leadId + SECRET)
  .digest('hex')
  .slice(0, 16);

const optOutUrl = `https://marli.agency/baja?id=${leadId}&token=${token}&email=${encodeURIComponent($json.email)}`;
```

---

## SECRET_KEY (env vars)

Generar key una vez:
```bash
openssl rand -hex 32
# Resultado ejemplo: 7a8b9c0d1e2f3...
```

Guardar en n8n env: `OPT_OUT_SECRET_KEY=7a8b9c0d1e2f3...`

**Importante**: si rotas esta key, todos los opt-out URLs en emails antiguos dejan de funcionar. NO rotar salvo emergencia.

---

## Confirmación email tras opt-out

n8n manda automáticamente este email cuando opt-out exitoso:

**Asunto**: `Confirmación de baja de Marli`

**Cuerpo**:

```
Hola {{nombre_o_amigo}},

Tu correo {{email}} ya está fuera de nuestra lista. No recibirás 
más mensajes nuestros.

Si lo hiciste por error, escríbenos a hola@marli.agency en los 
próximos 7 días y lo restauramos.

Si tienes dudas sobre tus datos: dpo@marli.agency.

Pablo
Marli Agency
```

---

## Test E2E

1. Crear lead test en Notion DB Sales Pipeline manualmente
2. Calcular su token con la fórmula
3. Visitar `https://marli.agency/baja?id={lead_id}&token={token}&email=test@example.com`
4. Click en "Sí, eliminar"
5. Verificar:
   - Página muestra estado "Listo"
   - Lead en Notion cambia status a `opt_out`
   - Aparece nuevo row en Notion DB Opt-outs
   - Email confirmación llega
6. Intentar visitar mismo URL otra vez → ya está bajado, mostrar mensaje "ya estás dado de baja"

---

## Compliance check

- ✅ 1 clic (sin login, sin formularios largos)
- ✅ < 60s procesamiento
- ✅ Confirmación visual + email
- ✅ Token previene tampering
- ✅ Lista de opt-outs mantenida 5 años (Notion DB no eliminar)
- ✅ Verificación previa antes de futuros envíos (workflow cold-email-sender chequea Opt-outs DB)

Cumple LSSI Art. 21 + RGPD art. 21 (derecho oposición).
