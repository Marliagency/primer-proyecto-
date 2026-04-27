---
type: moc
tags: [inbox]
status: active
updated: 2026-04-27
---

# 00 · INBOX

Captura rápida sin clasificar. Todo nuevo entra aquí, se procesa y se mueve
a la carpeta definitiva. Mantener < 10 notas en cualquier momento.

## Reglas

1. Si tarda < 2 min en clasificar, hacerlo ya.
2. Si requiere decisión, mover a [[../08-IDEAS/_INDEX|Ideas]] con tag
   `decisión-pendiente`.
3. Si es accionable inmediato, mover a [[../05-PROCESOS/_INDEX|Procesos]]
   o [[../12-CONTROL-CENTER/Alertas-Sistema|Alertas]].

## Notas pendientes

```dataview
LIST
FROM "00-INBOX"
WHERE file.name != "_INDEX"
SORT file.ctime DESC
```
