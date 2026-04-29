# DPA — Acuerdo de Encargado de Tratamiento (plantilla)

Cuando un cliente psicólogo te lo pida (clínicas con pacientes = casi seguro), debes firmar un Data Processing Agreement (Acuerdo de Encargado de Tratamiento) según RGPD art. 28.

**Importante**: este es plantilla orientativa basada en cláusulas modelo de la AEPD. Para clientes grandes (clínicas con >100 pacientes) o sectores regulados, validar con abogado.

---

## ACUERDO DE ENCARGADO DE TRATAMIENTO

**Entre:**

**RESPONSABLE DEL TRATAMIENTO**:  
[Nombre / Razón social del cliente psicólogo]  
CIF/NIF: [XXXXXXXX]  
Domicilio: [dirección]  
Email: [email del cliente]  
(en adelante "EL RESPONSABLE")

**ENCARGADO DEL TRATAMIENTO**:  
Marli Agency  
CIF: X-XXXXXXXX  
Domicilio: [tu domicilio fiscal]  
Email: dpo@marli.agency  
(en adelante "EL ENCARGADO" o "Marli")

**Lugar y fecha**: [ciudad], [DD/MM/YYYY]

---

### Cláusula 1 — Objeto

EL RESPONSABLE encomienda a EL ENCARGADO el tratamiento de datos personales necesarios para la prestación de los servicios contratados, en concreto:

- Servicios contratados: [Pack Premium / Pack + Instalación / Mantenimiento — especificar]
- Fecha inicio: [DD/MM/YYYY]
- Duración: [duración del contrato principal]

### Cláusula 2 — Categorías de datos y de interesados

#### 2.1. Datos tratados:
- Datos identificativos de pacientes: nombre, apellidos, DNI/NIE, email, teléfono
- Datos demográficos: fecha nacimiento, género, dirección
- Datos de contratación: fechas sesiones, importe, método pago
- **Datos clínicos** (categoría especial RGPD art. 9): notas de sesión, diagnósticos, tratamientos, evolución (solo si el cliente activa explícitamente esta funcionalidad de IA en informes)

#### 2.2. Categorías de interesados:
- Pacientes del RESPONSABLE
- Personal del RESPONSABLE (terapeutas, recepción, administración)

### Cláusula 3 — Finalidad del tratamiento

EL ENCARGADO tratará los datos personales única y exclusivamente para:

- Almacenamiento estructurado de información de pacientes en CRM
- Generación de plantillas de informes psicológicos
- Procesamiento de cobros (a través de Stripe como sub-encargado)
- Envío de recordatorios automatizados a pacientes (sólo con consentimiento del paciente)
- Análisis IA opcional para borradores de resúmenes de sesión (solo si activado por el cliente)

EL ENCARGADO **NO tratará** los datos para finalidad propia diferente, ni los cederá a terceros salvo los sub-encargados autorizados (Cláusula 5).

### Cláusula 4 — Obligaciones de EL ENCARGADO

EL ENCARGADO se compromete a:

a) Tratar los datos siguiendo únicamente las instrucciones documentadas del RESPONSABLE.

b) **Confidencialidad**: garantizar que las personas autorizadas para tratar los datos se han comprometido a respetar la confidencialidad o están sujetas a obligación legal de confidencialidad.

c) **Medidas de seguridad** apropiadas (RGPD art. 32):
   - Cifrado de datos en reposo (AES-256) y en tránsito (TLS 1.3)
   - Control de acceso con doble factor
   - Auditoría de accesos
   - Backups cifrados con redundancia geográfica
   - Plan de respuesta a incidentes documentado

d) **Sub-encargados**: notificar al RESPONSABLE cualquier cambio en la lista de sub-encargados con 30 días de antelación, dando la posibilidad al RESPONSABLE de oponerse motivadamente.

e) **Asistencia al RESPONSABLE** para:
   - Responder a solicitudes de derechos de los interesados (acceso, rectificación, supresión, etc.)
   - Cumplir obligaciones de seguridad y notificación de violaciones
   - Realizar evaluaciones de impacto si aplican

f) **Supresión o devolución** de los datos al finalizar la prestación, según elección del RESPONSABLE, salvo obligación legal de conservación.

g) **Demostrar el cumplimiento** de estas obligaciones con auditoría documental disponible al RESPONSABLE bajo solicitud.

### Cláusula 5 — Sub-encargados autorizados

EL RESPONSABLE autoriza expresamente a los siguientes sub-encargados para fines del servicio:

| Sub-encargado | Finalidad | Localización | Garantías |
|---|---|---|---|
| Notion Labs Inc. | Almacenamiento CRM | EU (Frankfurt) | DPA propio + SCC |
| Stripe Payments Europe Ltd. | Procesamiento pagos | EU (Dublin) | DPA propio + PCI-DSS Level 1 |
| Cloudflare Inc. | Email routing, DNS | EU + global | DPA propio + SCC |
| Anthropic PBC (solo si IA activada) | Generación IA de borradores | US | DPA + zero-retention |
| Google Workspace | Email transaccional | EU + global | DPA + SCC |
| MailChannels | SMTP | Global | DPA propio |

Lista actualizada en https://marli.agency/subprocessors.

### Cláusula 6 — Transferencias internacionales

Cuando algún sub-encargado implique transferencia fuera del EEE (ej. Anthropic en US):

- Se aplicarán **Cláusulas Contractuales Tipo (SCC)** aprobadas por la Comisión Europea (Decisión 2021/914)
- Se realizará **Transfer Impact Assessment (TIA)** documentado
- En caso de Anthropic: política zero-retention adicional (los datos enviados NO se conservan tras procesamiento)

### Cláusula 7 — Notificación de violaciones de seguridad

En caso de violación de seguridad de datos personales, EL ENCARGADO notificará al RESPONSABLE en un plazo **máximo de 72 horas** desde su conocimiento, incluyendo:

- Naturaleza de la violación
- Categorías y número de interesados afectados
- Medidas adoptadas para mitigar
- Contacto del DPO de Marli para más información

### Cláusula 8 — Plazo, terminación y devolución de datos

- **Plazo**: durante toda la vigencia del contrato principal de servicios
- **Terminación**: al finalizar el contrato (por la causa que sea)
- **Devolución de datos**: en los 30 días siguientes a la terminación, EL ENCARGADO:
  - Permitirá la **exportación completa** de los datos en formato estructurado (JSON/CSV)
  - O bien procederá a su **supresión segura** (incluyendo backups)
  - Según elección documentada del RESPONSABLE
- **Conservación legal**: si alguna ley exige conservar datos (fiscal, sanitaria), EL ENCARGADO los conservará el mínimo legal con seguridad reforzada

### Cláusula 9 — Auditorías

EL RESPONSABLE puede realizar auditorías al cumplimiento de este DPA:

- Una (1) vez al año máximo
- Con preaviso de 30 días
- Coste a cargo del RESPONSABLE (salvo si la auditoría revela incumplimiento grave de Marli)
- A través de auditor certificado independiente

### Cláusula 10 — Responsabilidad

Cada parte responde de los daños causados por su incumplimiento del RGPD y este DPA. Si la AEPD impone sanción a una parte por incumplimiento exclusivo de la otra, esta última asumirá la sanción y los costes legales asociados.

### Cláusula 11 — Ley aplicable y jurisdicción

Este DPA se rige por la legislación española y europea aplicable. Para resolución de controversias: Juzgados y Tribunales de [tu provincia], salvo derechos de consumidor.

---

**Firmado en [ciudad], [DD/MM/YYYY]**

| EL RESPONSABLE | EL ENCARGADO |
|---|---|
| | |
| | |
| _______________________ | _______________________ |
| [Nombre cliente] | Pablo [Apellido] |
| [Cargo] | Founder, Marli Agency |
| Fecha: ____________ | Fecha: ____________ |

---

## Cómo usar esta plantilla

1. Cuando un cliente compra Pack Premium, mandarle email con: "Si trabajas con datos clínicos, te firmo el DPA cuando quieras. Es estándar RGPD para encargados de tratamiento. ¿Lo necesitas?"

2. Si dice sí: copiar plantilla a Google Docs / PDF, rellenar [campos], enviar para firma.

3. Firma electrónica simple sirve (DocuSign trial, HelloSign free, o incluso PDF con imagen de firma).

4. Archivar firmado en Notion DB Customers (campo "DPA firmado: ✓ / fecha").

5. Si actualizas sub-encargados (Cláusula 5), notificar al cliente con 30 días.

---

## Cuando NO necesitas DPA

- Cliente compra el Pack pero NO usa la funcionalidad IA en informes (no hay datos sensibles fluyendo a Anthropic) → DPA es buena práctica pero no estrictamente obligatorio
- Cliente solo usa plantillas Word "offline" sin sync con Marli → no hay tratamiento por tu parte

Cuando SÍ necesitas DPA:
- Cliente activa IA en informes (datos clínicos a Anthropic)
- Cliente activa cobros automáticos (datos pago a Stripe)
- Cliente activa recordatorios automáticos (datos contacto pacientes)

En el 90% de clientes Pack Premium, el DPA aplica.
