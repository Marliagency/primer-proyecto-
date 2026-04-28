---
type: nota
tags: [setup, inicio]
status: active
updated: 2026-04-27
---

# 🚀 INICIO · Cómo abrir y usar este vault

Si es la primera vez que abres el vault, sigue estos pasos en orden.
Tiempo total: ~10 minutos.

## 1 · Instalar Obsidian (si no lo tienes)

1. Descargar desde https://obsidian.md (gratis, multiplataforma).
2. Instalar normal (siguiente, siguiente, instalar).
3. Abrir Obsidian.

## 2 · Abrir el vault

En la pantalla de bienvenida de Obsidian:

1. Click en **"Open folder as vault"**.
2. Navegar a la carpeta `control-empresa/` (esta carpeta).
3. Click en **"Open"**.

Obsidian creará una subcarpeta `.obsidian/` automáticamente con tu
configuración local. Ya viene preconfigurada en el repo con las opciones
mínimas — la respeta y añade las suyas propias.

## 3 · Activar los plugins críticos

Algunas vistas de este vault (Dashboard, KPIs, Pipeline, Estado de
clientes) usan **Dataview** para consultar el frontmatter de las notas.
Sin Dataview verás bloques de código en lugar de tablas vivas.

### Activar Dataview (obligatorio)

1. `Settings` (rueda en la parte inferior izquierda) → `Community plugins`.
2. **Si te pregunta "Turn on community plugins"**, dale a "Turn on".
3. Click en **"Browse"**.
4. Buscar **"Dataview"** (autor: Michael Brenan / blacksmithgu).
5. Click en **Install** → **Enable**.

### Plugins recomendados (opcionales)

Mismo flujo que Dataview, pero opcionales:

| Plugin | Para qué |
|---|---|
| **Templater** | Crear notas a partir de plantillas con un atajo |
| **Calendar** | Vista de calendario lateral |
| **Periodic Notes** | Notas diarias/semanales/mensuales automáticas |
| **Tag Wrangler** | Renombrar tags en masa cuando crezca el vault |
| **Excalidraw** | Diagramas a mano alzada (útil para arquitectura) |

## 4 · Activar core plugins útiles

`Settings` → `Core plugins` → activar (si no están):

- ✅ **Backlinks** (ver qué notas enlazan a la actual)
- ✅ **Outgoing links** (ver a dónde enlaza la actual)
- ✅ **Graph view** (visualización de toda la red de notas)
- ✅ **Tag pane** (ver todos los tags)
- ✅ **Templates** (insertar plantillas con `Ctrl/Cmd + P`)
- ✅ **Outline** (índice automático de la nota abierta)
- ✅ **Word count** (contador de palabras)
- ✅ **Properties view** (ver el frontmatter como propiedades)

## 5 · Tu primer recorrido (10 min)

Empieza aquí y sigue los enlaces, no leas todo de un tirón:

1. **[[Empresa-Core]]** — el mapa raíz
2. **[[01-EMPRESA/Empresa-Resumen]]** — qué es Marli en 5 líneas
3. **[[06-MARKETING/Plan-90-Dias]]** — el plan operativo a 90 días
4. **[[12-CONTROL-CENTER/Dashboard-Operativo]]** — cómo será tu día a día
5. **[[03-SKILLS-SYSTEM/Skills-Database]]** — el catálogo de skills

> Al hacer click en un enlace `[[así]]`, Obsidian lo abre. Ctrl/Cmd +
> click para abrir en panel lateral.

## 6 · Comandos esenciales (atajos)

| Acción | Atajo |
|---|---|
| Búsqueda global | `Ctrl/Cmd + Shift + F` |
| Abrir nota por nombre | `Ctrl/Cmd + O` |
| Paleta de comandos | `Ctrl/Cmd + P` |
| Toggle Graph view | `Ctrl/Cmd + G` |
| Nueva nota | `Ctrl/Cmd + N` |
| Insertar plantilla | (desde paleta) "Templates: Insert" |

## 7 · Convenciones que se respetan en este vault

- Cada nota tiene **frontmatter** con `type`, `tags`, `status`, `updated`.
  No lo borres: las consultas Dataview lo usan.
- Los enlaces son siempre `[[carpeta/Nombre-Nota]]` (con la ruta).
- Cada carpeta tiene un **`_INDEX.md`** que es su mapa.
- Las notas críticas viven a 1-2 clicks de [[Empresa-Core]].

## 8 · Antes del primer uso real

Asegúrate de:

- [ ] Has leído **[[11-INTEGRACIONES/SECURITY]]** sobre credenciales.
- [ ] Has copiado **`11-INTEGRACIONES/credenciales.env.example`** a un
  archivo `.env` local (que NO se commitea).
- [ ] Has decidido **dónde guardar las credenciales reales** (gestor
  de secretos / `.env` local / n8n credentials store).

## 9 · Sincronización

El vault vive en `control-empresa/` dentro del repo Git
`marliagency/primer-proyecto-`.

| Para... | Hacer... |
|---|---|
| Bajar cambios | `git pull origin claude/autonomous-agent-skills-220Fs` |
| Subir cambios | `git add . && git commit -m "..." && git push` |
| Sincronizar entre dispositivos | Git (recomendado) o Obsidian Sync (de pago) |

> No uses la sincronización por iCloud/Dropbox **a la vez** que Git: rompe
> los archivos `.obsidian/workspace.json`.

## 10 · Si algo se ve raro

| Síntoma | Causa probable | Solución |
|---|---|---|
| Bloque de código `dataview` no se renderiza | Plugin Dataview no instalado | Paso 3 |
| Wikilinks aparecen como texto plano | Modo Source en lugar de Live Preview | Esquina inferior derecha → cambiar |
| Tablas se ven mal | Tema oscuro sin contraste | Settings → Appearance → Light theme |
| Imágenes no cargan | Aún no has añadido las imágenes | Normal, son referencias placeholder |

---

Cuando termines este recorrido vuelve a [[Empresa-Core]] y empieza por
el siguiente paso real: [[10-RECURSOS/Plantillas-Word-Informes|las 5
plantillas Word del Kit de inicio]]. Ese es el bloqueador del lead
magnet de Fase 1.
