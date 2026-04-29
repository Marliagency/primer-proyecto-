# WhatsApp Business — plantillas de cierre asíncrono

WhatsApp es el **canal de cierre rey** en España (95% de tasa de apertura). Lo usamos para:

1. Soporte rápido a leads del tripwire
2. Cierre suave del Pack tras 3-7 días
3. Retención de cliente actual

**Setup**: WhatsApp Business gratis (link `wa.me`) + opcional API oficial (90€ setup) si volumen >100/día.

---

## Setup básico (gratis, en 10 min)

### 1. Crear WhatsApp Business

1. Descargar app **WhatsApp Business** (no la normal)
2. Registrar con número que NO sea tu personal (puedes usar línea virtual de FONA/Cellnex/Voiped 5€/mes)
3. Configurar perfil:
   - Nombre: "Marli — Pablo"
   - Categoría: Servicios profesionales
   - Descripción: "Herramientas para psicólogos en consulta privada"
   - Web: marli.agency
   - Email: hola@marli.agency
   - Horario: Lun-Vie 9:00-18:00

### 2. Crear link `wa.me`

```
https://wa.me/34XXXXXXXXX?text=Hola%2C%20vengo%20de%20Marli%20y%20tengo%20una%20pregunta
```

Reemplazar `34XXXXXXXXX` por tu número con prefijo país.
El `?text=` pre-rellena el mensaje (ahorra al lead pensar qué decir).

### 3. Mensajes automáticos (greeting + away)

WhatsApp Business → Tools → Automated messages:

**Greeting message** (cuando alguien escribe por primera vez):
```
¡Hola! Soy Pablo de Marli 👋

Te contesto en menos de 2h en horario laboral.

Si quieres, dime qué necesitas:
1. Plantilla CRM gratis
2. Info Pack Premium  
3. Soporte producto
4. Otra duda

(Si es urgente, mejor email a hola@marli.agency)
```

**Away message** (fuera de horario):
```
Hola, fuera de horario laboral 🌙

Te contesto mañana a primera hora. Si es urgente
escribe a hola@marli.agency.

¡Buenas noches!
```

---

## Plantillas a usar (pega y ajusta)

### Plantilla 1 — Tras descarga tripwire (D+1)

```
¡Hola {nombre}! 

Te escribo porque ayer descargaste la plantilla CRM 
de Marli. ¿Pudiste echarle un vistazo?

Si te trabaste en algo o tienes dudas, dime y te
ayudo en este chat.

Pablo
```

Enviar 24h después de la descarga, solo si NO ha respondido al email de bienvenida.

### Plantilla 2 — Tras visit Pack landing sin compra (D+2)

```
{nombre}, vi que estuviste mirando el Pack Premium.
¿Te quedó alguna duda concreta?

Si me dices con 1 frase qué te frena, mejor te lo
respondo aquí que en una call. Sin compromiso.

Pablo
```

### Plantilla 3 — Cierre suave Pack Premium (D+5)

```
{nombre}, recordatorio de que el Pack Premium tiene
14 días de garantía total — si no te encaja, devuelvo
todo en 48h sin papeleo.

Llevo así 23 ventas, solo 1 reembolso. La gente lo
mantiene.

¿Te ayudo a pensarlo?

Link directo si te decides: {pack_url}
```

### Plantilla 4 — Tras compra (welcome WhatsApp)

```
🎉 ¡Bienvenido/a a Marli, {nombre}!

Te acabo de mandar el email con setup. Si te trabas
en cualquier paso, escríbeme aquí mismo. Te lo resuelvo
en menos de 30 min.

Pablo
```

### Plantilla 5 — Check-in D+7 (cliente nuevo)

```
{nombre}, ya llevas 1 semana con Marli.

¿Qué tal? ¿Hay algo que mejorar o te falta funcionalidad?

Tus comentarios son ORO, leo cada uno.

Pablo
```

### Plantilla 6 — Pedir testimonio D+30

```
{nombre}, mes 1 con Marli ✅

Si te ha sumado, ¿me ayudarías con un testimonial corto
(3-4 líneas)? Texto o vídeo de 60s, lo que prefieras.

Te paso 50% descuento en Pack Pro como agradecimiento
si quieres + tu testimonio aparece en marli.agency con
foto y enlace a tu consulta (publicidad gratis).

¿Te apuntas?
```

### Plantilla 7 — Re-engagement cliente inactivo (D+45 sin uso)

```
{nombre}, veo que llevas 2 semanas sin entrar a tu
Marli. ¿Algo no te encaja?

Si es algo técnico, lo arreglamos en 30 min.
Si es algo conceptual, hablamos.
Si es que ya no te sirve, también vale la pena saberlo.

Sin reproche, solo curiosidad.

Pablo
```

### Plantilla 8 — Upsell Mantenimiento mensual

```
{nombre}, tras 30 días de Marli. Algunos clientes
preguntan por el plan Mantenimiento (300€/mes):

✓ Soporte prioritario <2h
✓ Llamada mensual conmigo de 30 min para optimizar
✓ Actualizaciones premium ilimitadas
✓ Custom plantillas si las necesitas

¿Te interesa? Te paso link directo si sí.
```

### Plantilla 9 — Atención preocupación cliente (escalada)

Cuando un cliente dice "esto no me va" o similar:

```
{nombre}, perdón por el problema. Cuéntame:

- ¿Qué intentaste hacer?
- ¿Qué pasó (o no pasó)?
- ¿Tienes captura?

Lo soluciono YA.

Pablo
```

### Plantilla 10 — Despedida limpia (no compra tras 21 días)

```
Hola {nombre},

Llevamos 3 semanas hablando y veo que el Pack no es
para ti ahora. Sin problema.

Te dejo en paz por mi cuenta. Si en 6 meses cambias
de opinión, escríbeme, sigo aquí.

Mucho éxito con tu consulta 🤝

Pablo
```

---

## Reglas de oro

### Cuándo NO usar WhatsApp

- Lead frío que NO te dio su número (ilegal contactar)
- Primer toque (mejor email primero)
- Comunicación masiva (usa email)
- Información sensible (RGPD limitado en WhatsApp)

### Cuándo SÍ usar WhatsApp

- Lead que dejó número en form (consintió)
- Cliente actual (relación establecida)
- Soporte urgente (rápido)
- Cierre soft tras 3+ touches por email

### Volumen sostenible

- 20-30 chats activos a la vez = manejable
- 50+ = necesitas asistente o WhatsApp Business API + bot
- Tiempo medio respuesta: <2h en horario, <12h fuera

### RGPD en WhatsApp

- Pedir consentimiento explícito en form: ☐ "Quiero recibir mensajes WhatsApp de Marli"
- Almacenar consentimiento en Notion DB Leads
- Solo escribir si consintió
- Honor opt-out al primer "no quiero más mensajes"

---

## Integración con Notion

Cada conversación WhatsApp:
1. Manualmente: copiar resumen a la nota del lead en Notion
2. Mejor: usar **WhatsApp Business API** + n8n para auto-log

Setup API (si volumen >50 chats/día):
- Coste: 90€ setup + 0.06€/conversación (España)
- ROI: ahorra 5h/semana en gestión manual

---

## Métrica clave

Objetivo: **>30% de leads del tripwire que dan número compran en 14 días**.

Comparar con:
- Solo email: 8-12%
- Email + WhatsApp: 25-35%

WhatsApp **DUPLICA conversion** post-tripwire si se usa con tacto.
