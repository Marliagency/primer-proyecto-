---
type: log
tags: [logs, decisiones, adr]
status: active
updated: 2026-04-27
---

# Log de decisiones

Registro de decisiones estratégicas y técnicas. Cada entrada debe
contestar: contexto · opciones · decisión · consecuencias.

## Plantilla

```markdown
## YYYY-MM-DD · Título corto

**Contexto**: ...
**Opciones**: A · B · C
**Decisión**: X (porque ...)
**Consecuencias**: ...
**Reversible si**: ...
```

---

## 2026-04-27 · Vault Obsidian como sistema operativo

**Contexto**: Hay un documento maestro v3.0 estático. Se necesita un
sistema operativo vivo.

**Opciones**: Notion único · Obsidian vault · App custom.

**Decisión**: Obsidian vault local versionado en git, sincronización con
Notion para datos operativos (CRM real).

**Consecuencias**:

- Versionado completo via git
- Sin lock-in de Notion para documentación
- Tiene que mantenerse el sync Notion ↔ Obsidian (gap conocido)

**Reversible si**: el sync se vuelve costoso. Migrable a Notion en
horas si se decide.

---

## 2026-04-27 · No automatizar outreach LinkedIn

**Contexto**: Tentación de usar herramientas de scraping/auto-mensajes
para escalar outreach.

**Decisión**: NO usar automatización para envío. Solo para investigación
y templating del copy.

**Consecuencias**: ritmo limitado a 5-10 contactos/día manual.

**Razón**: violaría TOS de LinkedIn y arriesga la cuenta principal.

---

## 2026-04-27 · Pago único como diferenciador no negociable

**Contexto**: Algunos clientes pedirán pagar mensualmente.

**Decisión**: NO ofrecer financiación interna. Si necesitan, financiación
externa (Klarna, Stripe Capital).

**Razón**: el "pago único" es el ancla de marca. Romperlo dilye toda la
argumentación.
