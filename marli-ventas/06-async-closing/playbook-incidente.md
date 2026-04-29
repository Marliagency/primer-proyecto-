# Playbook — Gestión de incidentes

Cuando algo se rompe (n8n caído, Stripe falla, email no entrega, lead clínico ve datos de otro). Procedimiento para responder en <4h y evitar daño reputacional + sanción RGPD.

---

## Clasificación de severidad

### S1 — Crítico (responde en <30 min)

- **Brecha de datos**: cliente A ve datos de paciente de cliente B
- **Caída total**: marli.agency completamente offline
- **Stripe down**: nadie puede pagar
- **Pago erróneo**: cargado X€ a cliente equivocado
- **Email masivo a lista equivocada**: enviaste cold email a tus clientes pagantes
- **Crisis Li (chatbot)**: detección crisis falló y un paciente quedó sin recursos

### S2 — Alto (responde en <2h)

- Cold email caído (no se envía pero llega luego)
- Webhook Stripe falla (cliente paga pero no recibe email)
- IA en informes devuelve resultado incorrecto a 1 cliente
- Notion DB inconsistente (lead duplicado o falta dato)
- 1 cliente concreto reporta problema bloqueante

### S3 — Medio (responde en <24h)

- Latencia alta n8n (procesamiento lento)
- Email entrega pero formato roto en algunos clientes
- Alerta Slack/Telegram falla
- Backup automático no se ejecutó

### S4 — Bajo (responde en próxima review semanal)

- Métrica trackeada incorrectamente
- Typo en email transaccional
- Optimización de performance posible

---

## Procedimiento S1 (crítico) — pasos en orden

### Paso 1 (0-5 min) — Detectar y confirmar

- Revisar mensaje (email/Slack/Telegram) que reportó
- Verificar tu mismo el problema (no asumir reporte falso)
- ¿Es real? → Si sí, escalar inmediato

### Paso 2 (5-15 min) — Contener daño

Acciones inmediatas según tipo:

| Tipo | Acción contención |
|---|---|
| Brecha datos | Pausar TODOS los workflows n8n. Cerrar acceso temporal al cliente afectado. |
| Web caída | Verificar Hostinger status, alertar al soporte si fault de proveedor. |
| Stripe down | Verificar https://status.stripe.com. Pausar marketing si va a durar. |
| Pago erróneo | Reembolsar inmediato en Stripe. Notificar cliente afectado. |
| Email masivo error | Pausar workflow. NO mandar disculpa todavía (puede empeorar). Pensar primero. |
| Crisis Li falló | Llamar al psicólogo cliente. Confirmar paciente está bien. Documentar todo. |

### Paso 3 (15-60 min) — Comunicar afectados

Plantilla email crisis:

```
Asunto: [URGENTE] Incidente Marli — acción requerida

Hola [nombre cliente],

Te escribo para informarte de un incidente que afectó a 
[descripción técnica concisa, sin pánico].

QUÉ PASÓ
[1-2 líneas claras, sin tecnicismos innecesarios]

A QUIÉN AFECTÓ
[indicar si solo a este cliente, todos, sub-grupo]

QUÉ ESTAMOS HACIENDO
[acciones que tomamos: pausar X, restaurar Y, contactar Z]

QUÉ NECESITAS HACER (si algo)
[acción concreta para el cliente, ej: "no hagas nada", o 
"verifica tus pacientes en Notion DB y avísanos discrepancias"]

CRONOLOGÍA
- [hora]: detectado
- [hora]: contenido
- [hora]: previsto resolución

Te tengo al corriente cada [N] horas hasta resolución completa. 
Si tienes preguntas: respóndeme. Si urgente, llámame al [tel].

Lamento profundamente este problema. Postmortem público en 
24-48h con todas las medidas para prevenir.

Pablo
Marli Agency
```

### Paso 4 (1-4h) — Resolver

- Trabajar el problema técnicamente
- Si es técnico complejo: postear en Stack Overflow / pedir ayuda a comunidad
- NO improvisar parches en producción que pueden empeorar

### Paso 5 (4-24h) — Verificar resolución

- Probar el fix con cuenta de test
- Confirmar con cliente afectado que ve normalidad
- Reactivar workflows pausados gradualmente (no todos a la vez)
- Monitorizar 24h

### Paso 6 (24-72h) — Postmortem

Escribir documento Notion `Postmortem-[fecha]-[problema corto].md`:

```
# Postmortem — Brecha visualización Notion entre clientes
Fecha: 2026-05-15
Severidad: S1
Duración: 1h 23 min

## Resumen ejecutivo (3 líneas)
Un cliente psicólogo pudo ver durante ~80 min la lista de 
pacientes de otro cliente debido a un error en el sharing 
de Notion. Se contuvo en 90 min. Ningún dato fue copiado 
ni descargado por el cliente afectado. AEPD notificada.

## Cronología
- 15/05 14:23 - Cliente A reporta "veo pacientes que no son míos"
- 15/05 14:25 - Pablo confirma incidente real
- 15/05 14:28 - Pausa todos los workflows n8n
- 15/05 14:35 - Identifica causa: integration con scope incorrecto
- 15/05 14:50 - Revoca acceso integration a DB compartida
- 15/05 15:46 - Restaura sharing correcto, verifica con cliente

## Causa raíz
Al crear nuevo cliente, el script setup compartió accidentalmente 
DB de pacientes con la integration de Marli (que tiene acceso a 
todos), no con la integration aislada del cliente.

## Impacto
- Clientes afectados: 1 (vio datos de 1 otro cliente)
- Pacientes expuestos: 12 nombres + DNIs
- Datos copiados/descargados: 0 (verificado en logs Notion)
- Tiempo expuesto: 1h 23min

## Acciones inmediatas
- Sharing corregido para los 23 clientes activos (auditoría completa)
- Notificación a la AEPD enviada (RGPD art. 33)
- Notificación al cliente afectado y al cliente cuyos datos se vieron

## Acciones preventivas
1. Refactorizar setup automation para usar integration aislada por cliente (deadline: 7 días)
2. Auditoría manual semanal de sharings (deadline: implementar lunes próximo)
3. Test de integración añadido para detectar futuros casos similares

## Aprendizajes
- Single integration con acceso global = single point of failure RGPD
- Necesitamos automated tests para sharing permissions
- Notificación rápida al cliente afectado mejoró confianza
```

### Paso 7 — Notificación AEPD (si brecha datos)

Si confirmaste **brecha datos personales** (especialmente clínicos):

1. **<72h desde detección**: notificar AEPD vía https://sedeagpd.gob.es
2. Formulario "Notificación de quiebra de seguridad"
3. Documentar todo lo del postmortem
4. Si afecta >250 personas O datos sensibles → notificar también a los afectados

---

## Procedimiento S2 (alto) — más simple

### Paso 1 — Detectar (vía monitoring)

Idealmente, detectado por automation (Slack alert) antes que cliente reporte.

Setup alertas básicas (cuando tengas tiempo):

```
- n8n no ejecuta workflow > 30 min → Slack
- Stripe webhook falla > 3 veces seguidas → Slack
- Cold email bounce rate > 5% en 1h → Slack
- Web responde HTTP 5xx > 3 veces → Slack
```

### Paso 2 — Investigar (15-60 min)

- Logs n8n
- Logs Stripe Dashboard
- Logs Hostinger
- Reproducir el error

### Paso 3 — Fix + comunicar a afectados

Si afecta a 1-3 clientes: email personalizado.
Si afecta a 4+: post breve en LinkedIn con transparencia.

### Paso 4 — Postmortem ligero (1 párrafo)

Solo si volverá a pasar. Si era fluke aislado, anotar y seguir.

---

## Comunicación pública (si la cosa se sabe)

Si LinkedIn / IG comments aparecen quejándose:

### NO hacer:
- Borrar comentarios negativos
- Bloquear al cliente
- Negar el problema

### SÍ hacer:
- Responder publicamente: "Tienes razón. Pasó esto. Estamos en X. Te he escrito a tu email para arreglarlo."
- Mostrar humanidad
- Mostrar acción concreta

**Ejemplo de respuesta pública positiva**:

> "@cliente_afectado tienes toda la razón. El [problema X] pasó por error 
> nuestro al [causa]. Te escribí ya por email con la solución y 
> [acción tomada, ej: reembolso, fix gratuito]. Si tienes algo más 
> que decir, mejor por DM. Lamento esto y gracias por la paciencia."

Aplaudido por la comunidad cuando es honesto. Daña tu reputación cuando intentas tapar.

---

## Recursos de emergencia

Tener guardados estos contactos accesibles:

| Recurso | Para qué | Contacto |
|---|---|---|
| Stripe support | Issues pago | https://support.stripe.com |
| Notion support | Issues sharing | https://www.notion.so/help |
| Hostinger support | Issues web | tu panel |
| Cloudflare support | DNS, email | dash.cloudflare.com → support |
| Anthropic support | API IA | support@anthropic.com |
| Tu DPO / abogado RGPD | Crisis legal | [datos despacho contratado] |
| Tu asesor fiscal | Issues facturación | [datos asesoría] |

Imprimir esta tabla y tenerla en pared al lado de pantalla. Si pasa S1, no quieres buscar contactos a las 3am.

---

## Práctica regular

1 vez al mes (lunes último mes), 30 min:

- Simular un S1 (ej: "qué pasaría si Stripe estuviera caído 4h ahora mismo?")
- Ejecutar mentalmente el playbook
- Identificar gap en preparación
- Mejorar

Sin práctica, el playbook se olvida. Con 30 min/mes, estás listo cuando pase de verdad.
