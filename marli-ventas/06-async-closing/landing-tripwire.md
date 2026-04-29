# Landing del Tripwire (CRM gratis) — copy completo

Página: `marli.agency/crm-gratis`

Diseñada para **converter > 25%** de tráfico cold (TOFU/MOFU) en leads opt-in.

---

## Above the fold (lo primero que ven)

### Headline (H1)

```
Plantilla CRM Notion + 5 informes Word
para tu consulta de psicología.

Gratis. Sin tarjeta. Descarga inmediata.
```

### Subhead

```
Te ahorra de media 4-6 horas a la semana en informes,
agenda y seguimiento de pacientes. Probada con 23 psicólogos en beta.
```

### Imagen hero

Mockup de la plantilla en Notion en pantalla MacBook + un .docx abierto al lado.
(Crear en Canva en 15 min con plantilla Mockup gratis.)

### Form (1 solo campo)

```
[Email profesional...........................] [Quiero la plantilla →]

🔒 Datos protegidos RGPD · Sin tarjeta · Sin email-trampa
```

**Importante**: solo email. NO pedir teléfono ni nombre. Cada campo extra = -8% conversion.

---

## Bloque 2 — ¿Qué hay dentro?

### Headline

```
Lo que descargas hoy
```

### 3 cards horizontales

**Card 1 — CRM Notion**
```
📊 Base de datos de pacientes
✓ Etapas de terapia (alta / activo / pausa / cerrado)
✓ Histórico sesiones por paciente
✓ Próxima cita destacada
✓ Notas confidenciales protegidas
```

**Card 2 — 5 informes Word**
```
📄 Plantillas listas para rellenar
✓ Informe psicológico inicial
✓ Informe neuropsicológico
✓ Informe infantil (TDAH, espectro autista)
✓ Informe de evaluación
✓ Informe de alta terapéutica
```

**Card 3 — Vídeo guía 5 min**
```
🎬 Cómo configurarlo paso a paso
✓ Setup en 5 minutos
✓ Importar tus pacientes desde Excel
✓ Personalizar plantillas con tus datos
✓ Vincular a tu calendario
```

---

## Bloque 3 — Para quién es (cualificación)

### Headline

```
Esto es para ti si:
```

```
✓ Llevas tu consulta privada (autónomo, SL, asociada en clínica)
✓ Pierdes 1-2 horas redactando cada informe
✓ Tu Excel de pacientes no escala bien
✓ Quieres dejar de perseguir cobros y confirmaciones de cita
```

```
✗ NO es para ti si:
- Ya usas un sistema que te funciona perfectamente
- Tu consulta es ocasional (< 5 pacientes/mes)
- Trabajas exclusivamente como asalariado en clínica de terceros
```

(Esta cualificación negativa **aumenta conversion**, contraintuitivamente.)

---

## Bloque 4 — Quién está detrás

### Headline

```
Hola, soy Pablo.
```

### Texto

```
Construí Marli porque, como tú, perdí demasiados martes
redactando informes a mano y persiguiendo cobros.

Marli no es un SaaS de empresa que mañana cierra. Es un kit
de plantillas y automatización que funciona dentro de
herramientas que ya conoces (Notion, Word, Stripe).

Y sí: la plantilla que descargas hoy es **literalmente la misma**
que uso yo en mi consulta. Sin versión "lite" trampa.
```

(Foto profesional del CEO, 600×600px, sonrisa amable, no de catálogo.)

---

## Bloque 5 — Testimonios (3 mini-cards)

Si todavía no tienes testimoniales reales, marcar como "alpha tester" y usar nombres reales con permiso.

```
"Pasé de 2h a 25 min por informe. La plantilla cubría el 90% de lo que necesitaba."
— Marí Sánchez, psicóloga clínica, Bilbao

"Llevaba 3 años queriendo organizar mi consulta. La plantilla me dio el atajo."
— David Ruiz, neuropsicólogo, Madrid

"Mi gestoría flipa con que ahora tengo todo conectado."
— Lucía Vega, psicóloga infantil, Valencia
```

(3 fotos profesionales de los testimoniales, cuadradas 300×300px.)

---

## Bloque 6 — FAQ (anticipar objeciones)

### 1. ¿Realmente es gratis o hay letra pequeña?

```
Es gratis 100%. Sin tarjeta, sin upgrade automático, sin
versión "Pro" trampa. Lo descargas y es tuyo.

Más adelante te enviaré algunos emails con consejos y
te contaré sobre Marli Pack Premium (la versión completa
con automatización), pero la plantilla gratis sigue siendo
tuya pase lo que pase.
```

### 2. ¿Necesito ser técnico/a?

```
No. La plantilla se abre en Notion (cuenta gratuita en notion.so)
y los informes en Word/Pages. El vídeo guía te lleva de la mano.

Si te trabas, respóndeme un email — lo leo yo.
```

### 3. ¿Y mis datos? ¿Qué hacéis con mi email?

```
Tu email queda en mi lista para enviarte la plantilla y, en las
siguientes 2 semanas, 5 emails con consejos prácticos.

Después de esos 14 días, dejas de oír de mí salvo que pidas
saber más. Puedes darte de baja en 1 click cualquier momento.

Cumplimos RGPD. Política de privacidad: marli.agency/privacidad
```

### 4. ¿La plantilla es compatible con mi Notion / Word?

```
Sí. La plantilla está en Notion (cualquier plan, incluso free).
Los informes están en .docx (Word, Pages, Google Docs, OpenOffice).
```

### 5. ¿Puedo modificarla a mi forma de trabajar?

```
Por supuesto. Es tuya, modifícala todo lo que quieras. La estructura
es punto de partida, no obligación.
```

---

## Bloque 7 — Form (segundo CTA, idéntico al de arriba)

```
[Email profesional...........................] [Quiero la plantilla →]
```

---

## Footer

```
Marli — herramientas para psicólogos en consulta privada
hola@marli.agency · Política de privacidad · Aviso legal · Cookies

© 2026 Marli Agency
```

---

## Especificaciones técnicas

### Tracking eventos Pixel

Cuando alguien:
- **Aterriza en /crm-gratis** → `PageView` (automático)
- **Submitea email form** → `Lead`:
  ```javascript
  fbq('track', 'Lead', {
    content_name: 'CRM Gratis Tripwire',
    content_category: 'lead-magnet',
    value: 0,
    currency: 'EUR'
  });
  ```
- **Llega a página gracias** → `CompleteRegistration`

### Form behavior

1. User submitea email → POST a tu webhook n8n `/webhook/marli-lead-magnet`
2. n8n:
   - Valida email (regex + DNS MX)
   - Si válido: crea row en Notion DB Leads
   - Manda email "aquí tienes tu plantilla" (workflow ya construido)
   - Redirect a `/gracias-tripwire`
3. Página /gracias-tripwire:
   - "Tu plantilla está en camino"
   - Disparar Pixel events
   - Banner: "Mientras tanto, échale un vistazo al Pack Premium"

### CTA secundario en /gracias-tripwire

```
🎉 Tu plantilla está en camino. Llegará a tu inbox en 1 minuto.

Mientras esperas:

¿Sabías que la versión completa de Marli (con cobros automáticos,
recordatorios y IA en informes) cuesta lo mismo que un mes de las
plantillas que ya tienes que comprar?

→ [Ver Pack Premium]
```

Este "bridge offer" inmediato convierte 8-15% de tripwire-takers
en compradores Pack Premium en menos de 24h.

---

## Diseño visual recomendado

- **Tipografía**: Inter (Google Fonts gratis), pesos 400, 500, 700
- **Colores**:
  - Primario: #0F172A (azul oscuro elegante)
  - Acento: #6366F1 (índigo botones)
  - Fondo: #FFFFFF + #F8FAFC bloques alternos
  - Texto secundario: #64748B
- **Iconos**: Lucide o Heroicons (gratis)
- **Mockups**: Canva tiene 200+ mockups MacBook/iPhone gratis

### En Hostinger Builder

1. Crear nueva página `/crm-gratis`
2. Usar template "Lead Magnet" o "App Landing"
3. Adaptar las 7 bloques arriba
4. Form connected to Hostinger forms o webhook custom
5. Publish + test en mobile

---

## A/B testing recomendado

### Variant tests (después de 1.000 visitas)

1. **Headline**: "Plantilla CRM..." vs "Recupera 6h/semana en tu consulta"
2. **CTA button**: "Quiero la plantilla" vs "Descargar ahora"
3. **Imagen hero**: mockup vs vídeo en bucle 6s
4. **Form fields**: solo email vs email+nombre

Ganador queda fijo, próximo test 1 cambio cada vez.

---

## Métricas

| Métrica | Target |
|---|---|
| Visit → Form view | > 95% (todo el mundo scrollea) |
| Form view → Submit | > 25% (es alta para lead magnet) |
| Submit → Email opened | > 80% |
| Submit → Tripwire descargado | > 90% |
| Submit → Pack purchased en 14 días | 5-10% |

Si conversion < 15% tras 1.000 visitas → revisar:
- ¿La promesa del headline es clara?
- ¿El form pide demasiados campos?
- ¿La velocidad de carga es < 2s? (test pagespeed.web.dev)
