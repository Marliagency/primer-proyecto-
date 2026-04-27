---
type: moc
tags: [empresa, control-center, root]
status: active
updated: 2026-04-27
---

# Empresa-Core · Marli Agency

> Vault Obsidian de control operativo de Marli Agency. Punto de entrada
> único al sistema. Cada nodo enlaza con el resto via wikilinks.
> Para abrir: en Obsidian → "Open folder as vault" → seleccionar
> `control-empresa/`.

## 🎯 Acceso rápido

- **Hoy operativo** → [[12-CONTROL-CENTER/Dashboard-Operativo|📊 Dashboard]]
- **KPIs** → [[12-CONTROL-CENTER/KPIs-Principales|📈 KPIs]]
- **Alertas** → [[12-CONTROL-CENTER/Alertas-Sistema|🚨 Alertas]]
- **Pipeline ventas** → [[07-CLIENTES/CRM-Pipeline|🧲 Pipeline]]
- **Estado campañas** → [[12-CONTROL-CENTER/Estado-Campanas|📣 Campañas]]
- **Ingresos** → [[12-CONTROL-CENTER/Flujo-Dinero|💰 Dinero]]

## 🗺️ Mapa del vault

| Carpeta | MOC | Contenido |
|---|---|---|
| `00-INBOX` | [[00-INBOX/_INDEX]] | Captura rápida sin clasificar |
| `01-EMPRESA` | [[01-EMPRESA/_INDEX]] | Identidad, marca, equipo, filosofía |
| `02-PRODUCTOS` | [[02-PRODUCTOS/_INDEX]] | Catálogo, precios, fichas |
| `03-SKILLS-SYSTEM` | [[03-SKILLS-SYSTEM/Skills-Database]] | Núcleo: skills disponibles y planificadas |
| `04-AUTOMATIZACIONES` | [[04-AUTOMATIZACIONES/_INDEX]] | Workflows n8n, triggers, jobs |
| `05-PROCESOS` | [[05-PROCESOS/_INDEX]] | SOPs y flujos operativos |
| `06-MARKETING` | [[06-MARKETING/_INDEX]] | Estrategia, ads, contenido, lead magnet |
| `07-CLIENTES` | [[07-CLIENTES/_INDEX]] | CRM, personas, objeciones |
| `08-IDEAS` | [[08-IDEAS/_INDEX]] | Backlog estratégico |
| `09-LOGS` | [[09-LOGS/_INDEX]] | Decisiones, retros, journal |
| `10-RECURSOS` | [[10-RECURSOS/_INDEX]] | Plantillas, prompts, kit de marca |
| `11-INTEGRACIONES` | [[11-INTEGRACIONES/_INDEX]] | APIs, credenciales (esquema), runbooks |
| `12-CONTROL-CENTER` | [[12-CONTROL-CENTER/_INDEX]] | Dashboards y panel operativo |

## 🧭 Vistas estratégicas

- [[01-EMPRESA/Empresa-Resumen|Resumen ejecutivo]]
- [[02-PRODUCTOS/Catalogo-Productos|Catálogo y modelo de negocio]]
- [[06-MARKETING/Estrategia-Marketing|Estrategia de marketing]]
- [[06-MARKETING/Plan-90-Dias|Plan 90 días]]
- [[03-SKILLS-SYSTEM/Skills-Database|Sistema de skills]]
- [[11-INTEGRACIONES/SECURITY|Política de credenciales]]

## 🔄 Estado del sistema

```dataview
TABLE status, updated
FROM "01-EMPRESA" OR "02-PRODUCTOS" OR "12-CONTROL-CENTER"
WHERE type = "moc" OR type = "dashboard"
SORT updated DESC
```

> Si Obsidian no tiene el plugin **Dataview** activo, este bloque
> aparecerá como código. Para activarlo: Settings → Community plugins →
> Browse → "Dataview" → Install + Enable.

## 📌 Convenciones del vault

- **Frontmatter obligatorio** en cada nota: `type`, `tags`, `status`,
  `updated`.
- **Tipos válidos**: `moc`, `nota`, `proceso`, `automatizacion`, `skill`,
  `producto`, `cliente`, `campania`, `integracion`, `dashboard`, `log`,
  `idea`, `runbook`.
- **Estados válidos**: `idea`, `wip`, `active`, `paused`, `archived`.
- **Wikilinks** siempre con la forma `[[carpeta/Nombre-Nota]]` para que el
  Graph view dibuje las relaciones reales.
- **Referencia a doc maestro**: el documento original v3.0 vive en
  `marli-automation/` (mismo repo). Esta carpeta es su versión operativa.
