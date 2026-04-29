# 09 — RGPD + Legal

Defensa legal frente a AEPD por enviar cold email B2B en España.

## Inventario

| Archivo | Para qué |
|---|---|
| `checklist-rgpd-cold-email.md` | 8 condiciones para que cold email sea defendible + test ponderación |
| `email-disclaimers.md` | Footer obligatorio + opt-out 1-clic + List-Unsubscribe |
| `politica-privacidad-template.md` | Plantilla `marli.agency/privacidad` lista para publicar |

## Resumen pragmático

**Antes de enviar 1 cold email, tener listos**:

1. ☐ Política privacidad publicada en marli.agency/privacidad
2. ☐ Test de ponderación firmado y archivado
3. ☐ Endpoint de opt-out funcional (1 clic, <60s)
4. ☐ Footer correcto en cada email (corto + link privacidad)
5. ☐ List-Unsubscribe header en SMTP
6. ☐ DB Notion `Opt-outs` mantenida 5 años
7. ☐ DPO contact (puede ser tú mismo Fase 1)
8. ☐ Email `dpo@marli.agency` activo

Sin estos 8 → NO mandar. Multa esperada > beneficio.

## Por qué importa

- Multas medianas AEPD: 20.000-60.000€
- Multas grandes (mala fe demostrada): 100.000€+
- Bloqueo proveedor (Google Workspace, Stripe) si reputación dañada
- Daño reputacional permanente del dominio principal

## Validación legal

**Recomendado para >5.000 emails/mes**: pagar 1 hora de un despacho RGPD especializado para revisar tu setup. Coste: 100-300€. ROI: cubrirás tu culo durante años.

Despachos recomendados:
- Pintos & Salgado
- Garrigues (más caro)
- Ecija
- ECIJA Privacy
- Prodat

Pedir review puntual de "checklist + test ponderación + opt-out flow + política privacidad". 1-2 horas, 200-400€ una vez.
