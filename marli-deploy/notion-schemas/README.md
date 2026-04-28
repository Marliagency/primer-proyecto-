# Notion Schemas — Marli

Este directorio contiene la **especificación canónica de las 5 bases de datos Notion** que necesita el sistema Marli, en formato JSON compatible con la API de Notion (`POST /v1/databases`).

## Las 5 DBs

| # | Archivo | DB Notion | Owner | Quién la usa |
|---|---|---|---|---|
| 1 | `01-leads.json` | Marli — Leads | Marli interno | Lead-Magnet, Cobro |
| 2 | `02-clientes.json` | Marli — Clientes | Marli interno | Onboarding, Mantenimiento, Testimoniales |
| 3 | `03-pacientes.json` | CRM Cliente — Pacientes | Cliente psicólogo | Producto entregable + Recordatorios |
| 4 | `04-sesiones.json` | CRM Cliente — Sesiones | Cliente psicólogo | Producto entregable + Auto-informes |
| 5 | `05-tareas.json` | CRM Cliente — Tareas | Cliente psicólogo | Producto entregable + Li |

**Importante**: las DBs 1-2 son operativas de Marli (interno). Las DBs 3-5 son el **template del producto** que cada cliente psicólogo instala en su propio Notion. Esto está alineado con las reglas RGPD: Marli no almacena datos clínicos.

## Cómo desplegarlas

### Opción A — Bootstrap automático (recomendado)

```bash
# 1. Crear internal integration en Notion
open https://www.notion.so/my-integrations

# 2. Crear una página vacía en Notion: "Marli — Workspace"
#    Compartirla con la integration creada (boton "..." > Connect to > tu integration)

# 3. Copiar el page_id (los 32 caracteres tras la última barra de la URL)

# 4. Configurar .env (en este directorio o en raíz del repo)
cat > .env <<EOF
NOTION_INTEGRATION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PARENT_PAGE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EOF

# 5. Ejecutar bootstrap
node --env-file=.env bootstrap.mjs
```

El script crea las 5 DBs en orden, resuelve las relaciones (`Sesiones.Paciente → Pacientes`, `Tareas.Paciente → Pacientes`, `Tareas.Sesion → Sesiones`) y al final imprime los `DB_IDs` listos para copiar a tu `.env` principal.

### Opción B — Manual (UI Notion)

Si prefieres crear las DBs a mano (no recomendado, pero documentado):

1. Crear cada DB con el nombre exacto del `_meta.name` del JSON.
2. Añadir cada propiedad del JSON respetando tipo y opciones (`select`, `multi_select` con sus colores).
3. Para las **relations** (Sesiones → Pacientes, Tareas → Pacientes/Sesiones), apuntar manualmente a las DBs correctas.

Tiempo estimado: ~90 min vs ~10 segundos del bootstrap.

## Política de cambios

- **Una vez en producción**, NO se renombran propiedades existentes (rompería los workflows n8n que las referencian).
- **Añadir propiedades** está OK siempre.
- **Eliminar opciones de select** que ya estén en uso → migrar primero las filas con esa opción.
- Cualquier cambio significativo va al `Log-Decisiones.md` con razonamiento (formato ADR).

## RGPD — recordatorio crítico

- DBs 3-5 **JAMÁS** almacenan diagnóstico, contenido literal de sesión, medicación, ni notas clínicas detalladas. Solo metadatos organizativos + resúmenes que el psicólogo aprueba antes de exportar.
- DB 1-2 cumplen LOPDGDD: derecho de borrado implementado vía workflow de "olvido" (TBD, post-Fase 1).
- Ver `control-empresa/11-INTEGRACIONES/SECURITY.md` para reglas inviolables.

## Esquema de relaciones

```
[Marli Leads] --(conversion)--> [Marli Clientes]
                                       |
                                       | (entrega producto)
                                       v
                          [CRM Cliente — Pacientes]
                                /        \
                               /          \
                              v            v
                     [Sesiones]<---------[Tareas]
                          \              /
                           \            /
                            v          v
                          (workflows n8n leen de aqui)
```
