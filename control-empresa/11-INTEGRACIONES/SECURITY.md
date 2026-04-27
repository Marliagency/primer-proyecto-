---
type: nota
tags: [integraciones, seguridad, credenciales]
status: active
prioridad: critica
updated: 2026-04-27
---

# Política de credenciales y seguridad · LECTURA OBLIGATORIA

Esta nota define cómo se manejan **todas** las credenciales del proyecto:
API keys, tokens, contraseñas, secretos. Aplica a Marli, n8n, Stripe,
Notion, Anthropic, Cloudflare y cualquier otra herramienta.

## Reglas inviolables

1. **NUNCA pegues una credencial en este vault.** Ni siquiera enmascarada.
   Ni en una nota privada. Ni en un comentario.
2. **NUNCA pegues una credencial en un chat de IA** (Claude, ChatGPT,
   Copilot, etc.). Las conversaciones se pueden registrar y los modelos
   no son almacenes seguros.
3. **NUNCA commits credenciales a git.** Si ocurre por accidente:
   - Rotar la credencial inmediatamente en el proveedor.
   - `git filter-repo` o BFG para limpiar el historial.
   - Forzar push y notificar al equipo.
4. **NUNCA uses la misma credencial para dev y producción.** Cuentas
   separadas, scopes separados.
5. **NUNCA des acceso "owner" cuando "scoped" alcanza.** Principio de
   mínimo privilegio.

## Dónde sí viven las credenciales

| Entorno | Almacén |
|---|---|
| Local (desarrollo) | Archivo `.env` listado en `.gitignore` |
| n8n self-hosted | n8n Credentials store (cifrado con `N8N_ENCRYPTION_KEY`) |
| n8n Cloud | n8n Credentials (gestionado por n8n) |
| CI/CD | GitHub Actions Secrets |
| Producción cloud | AWS Secrets Manager / Cloudflare Secrets / similar |
| Manual / personal | 1Password / Bitwarden / pass |

## Esquema de variables

Toda credencial referenciada en este vault aparece como `${VARIABLE_NAME}`
y está catalogada en [[credenciales.env.example]] con su descripción.
Nunca con su valor real.

## Rotación

- API keys de proveedores externos: cada **90 días** o ante cualquier
  sospecha.
- `N8N_ENCRYPTION_KEY`: nunca rotar sin migración planificada (perderías
  todas las credenciales almacenadas).
- Contraseñas humanas: cada 180 días + 2FA siempre.

## Permisos mínimos por integración

Documentado en cada `Integracion-*.md`. Si una credencial pide más
permisos de los listados, **no la concedas**: revisar primero.

## ¿Y el megaprompt que pedía credenciales por chat?

El megaprompt original solicitaba que el agente pidiera credenciales por
chat. **Esa práctica es insegura y se ha rechazado deliberadamente.** El
patrón correcto es:

1. El agente describe **qué credencial** se necesita y **con qué scopes**.
2. El operador humano la genera en el proveedor.
3. El operador la guarda en el almacén apropiado (.env, secret manager,
   n8n credentials).
4. El sistema la lee de su almacén — nunca de chat.

## Checklist antes de cada integración nueva

- [ ] Permisos solicitados son mínimos
- [ ] Credencial creada con identidad de servicio (no personal)
- [ ] Guardada en el almacén correcto (no en chat ni git)
- [ ] Nombre de variable documentado en [[credenciales.env.example]]
- [ ] Rotación programada en calendario (90 días)
- [ ] Plan de revocación listo si se compromete

## Ver también

- [[_INDEX]]
- [[credenciales.env.example]]
- [[Runbook-Incidentes]]
