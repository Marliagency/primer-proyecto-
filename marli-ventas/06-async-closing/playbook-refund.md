# Playbook — Reembolsos sin fricción

Garantía 14 días real, sin papeleo. Una de las cosas que **más conversion suma** en cierre asíncrono. Hay que cumplirla cuando alguien pide reembolso.

**Filosofía**: 1 reembolso fácil > 100 leads que dudan en comprar. NO discutir, NO interrogar.

---

## Trigger — cómo llegan las peticiones

| Canal | Frecuencia esperada |
|---|---|
| Email a `hola@marli.agency` con "reembolso" en asunto/cuerpo | 80% |
| Reply directo a email de Marli | 15% |
| Stripe customer portal (cancel + email) | 5% |

Todas se procesan igual.

---

## Proceso (target: < 4h en horario laboral)

### Paso 1 — Recibir email de reembolso

Cuando llega email con "reembolso" o "devolver" o "cancelar" en cuerpo:

1. Marcar email como prioritario (etiqueta "refund")
2. NO responder con "te llamo para hablarlo"
3. NO preguntar por qué (ya está mal, no insistir)

### Paso 2 — Verificar elegibilidad

Buscar en Notion DB Customers:

```
- Cliente compró: ¿menos de 14 días? → SÍ → reembolso completo
- Cliente compró: ¿más de 14 días pero < 30 días? → reembolso parcial proporcional
- Cliente compró: > 30 días → no procede reembolso (educado, ofrecer alternativa)
- Cliente Mantenimiento mensual: cancelar suscripción + reembolso pro-rata mes en curso
```

Política básica: **dentro de 14 días = reembolso completo, sin preguntas**.

### Paso 3 — Procesar reembolso en Stripe

1. Stripe Dashboard → Customers → buscar email
2. Click en payment → **Refund payment** → Full
3. Reason: "Customer requested" (default)
4. Confirm

Stripe procesa en 5-10 días naturales (depende del banco del cliente).

### Paso 4 — Notificar cliente (humano)

Responder al email original con plantilla:

```
Hola [nombre],

Reembolso completo procesado. Verás los 498€ en tu tarjeta en 
los próximos 5-10 días (depende de tu banco).

Lamento que Marli no te haya encajado. Si en algún momento 
quieres compartir qué fue lo que no funcionó (1 línea me sirve), 
me ayudaría a mejorarlo. Sin presión.

Te quedas con la plantilla básica gratis (es tuya, no la quito).

Mucho éxito con tu consulta,

Pablo
Marli Agency
```

### Paso 5 — Actualizar Notion

En Notion DB Customers:
- Estado: `reembolso`
- Fecha reembolso: hoy
- Motivo (si lo dijo): texto libre
- Aprendizaje: anotar en columna notas

### Paso 6 — Análisis (mensual)

1ª lunes del mes, revisar todos los reembolsos del mes anterior:

- Patrón común? (ej: muchos cancelan por "demasiado complicado")
- Acción: ajustar onboarding / Loom / FAQ según el patrón

---

## Casos especiales

### Cliente pide reembolso > 14 días pero < 30

```
Hola [nombre],

Veo que compraste hace [X] días, fuera de la garantía oficial 14 días. 
Aún así, voy a procesarte un reembolso parcial: 70% del valor 
([X]€) — devolvemos lo que tenga sentido.

Si me dices el motivo, mejor. Sin presión.

Pablo
```

Coste: 30% del Pack mantenido. Beneficio: cliente content + posible referral futuro. Worth it.

### Cliente pide reembolso > 30 días

```
Hola [nombre],

Has pasado de los 30 días de garantía, así que el reembolso 
formal no procede.

Si lo que pasa es que algo dejó de funcionar técnicamente o 
no te encaja una funcionalidad concreta, dime el problema y 
te lo soluciono gratis. Suelo poder.

Si lo que decides es que ya no quieres seguir usando Marli, 
te entiendo. La plantilla y todos los archivos siguen siendo 
tuyos. Y si en el futuro quieres volver, escríbeme.

Pablo
```

NO procesar reembolso > 30 días salvo que algo realmente fallara por nuestro lado.

### Cliente Mantenimiento mensual quiere cancelar

Auto-procesa via Stripe customer portal. Si llega por email:

```
Hola [nombre],

Cancelo tu suscripción Marli Mantenimiento. La cobramos hasta 
fin del mes en curso ([fecha]) y luego se detiene.

Si tu motivo es algo que se pueda resolver (precio, funcionalidad, 
soporte), dímelo y vemos. Si simplemente ya no lo necesitas, 
adelante sin problema.

Pablo
```

### Cliente Pack + Instalación dentro de 14 días

Reembolso 498€ (Pack) + 851€ (Instalación) = 1.349€ completo.

Si la instalación ya se hizo:
```
Hola [nombre],

He cancelado el contrato. Devuelvo 498€ correspondientes al 
producto, y la parte de instalación (851€) la mantengo como 
servicio prestado (ya hicimos las 8h de setup).

Esto es lo más justo dado que el trabajo se realizó. Si crees 
que no se entregó valor en la instalación, dímelo y reabrimos 
conversación.

Pablo
```

---

## Reembolsos NO permitidos

| Caso | Razón | Respuesta |
|---|---|---|
| Compra ya consumió IA mes (ej. 200 informes) | Costes API ya pagados | Reembolso = (precio - costes API ya consumidos) |
| Cliente pide reembolso 4 veces en 12 meses | Sospecha abuso | Detectar patrón, declinar amablemente |
| Cliente revendedó plantillas a otros | Violación licencia | NO reembolso, además acción legal posible |
| Cliente con disputa / chargeback abierto | Stripe ya procesa | Esperar resolución Stripe |

---

## Métricas

Trackear mensualmente en Google Sheets:

| Mes | Ventas totales | Reembolsos solicitados | Reembolso rate | Promedio días desde compra |
|---|---|---|---|---|
| 2026-04 | 8 | 0 | 0% | - |
| 2026-05 | 12 | 1 | 8.3% | 9 días |

**Target**: <8% refund rate. Si > 12% → algo está mal en producto o expectativas.

---

## Aprender de cada reembolso

Cada reembolso es feedback gratis. Categorías típicas:

1. **"No es lo que esperaba"** → ajustar landing/Loom para alinear expectativas
2. **"Demasiado complicado"** → mejorar onboarding / vídeo guía
3. **"No tengo tiempo de configurarlo"** → sugerir Pack + Instalación
4. **"Mi consulta cerró / cambia"** → fuera de tu control, ok
5. **"Encontré X gratis"** → posicionamiento más claro de qué hace Marli vs alternativas

Si patrón repetido → acción concreta. Sin patrón → caso aislado, seguir.

---

## Por qué hacer reembolso fácil

Cuesta:
- 1 reembolso = 498€ + tiempo procesamiento (15 min)

Gana:
- Reseña honesta positiva en LinkedIn ("aunque me devolvieron, la actitud fue 10/10")
- Cliente probablemente te recomienda a colega aunque no fuera para él/ella
- Reduce churn de quien estaba dudando: "veo que de verdad reembolsan"
- 0 disputas Stripe (que sí cuestan $15 + reputación)
- 0 estrés legal

ROI emocional + reputacional > coste del reembolso.

---

## Si llega chargeback / disputa Stripe

Si cliente pidió reembolso a su banco directamente (chargeback) sin avisarte:

1. Stripe te notifica (email + dashboard)
2. Tienes 7-10 días para responder
3. Aportar evidencia: email confirmación compra + Notion DB log + email entrega
4. **Stripe cobra $15 fee** independientemente del resultado
5. Si ganas: dinero vuelve. Si pierdes: dinero ya no recupera.

**Tip**: si recibes chargeback, contactar al cliente preguntando qué pasó. A veces es error del banco. Si fue intencional → no rebatir, asumir pérdida (pelearlo cuesta más que el dinero).

Para evitar chargebacks:
- Stripe Checkout descripción clara
- Email de confirmación inmediato
- FAQ de garantía visible
- Customer portal Stripe activado (que puedan cancelar suscripción ellos solos)
