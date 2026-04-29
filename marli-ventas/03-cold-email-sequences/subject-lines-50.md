# 50 asuntos cold email testeados (banco de A/B)

Asuntos para rotar en cada email del cold sequence. Categorizados por **ángulo psicológico**.

**Reglas comunes**:
- Longitud óptima móvil: 30-45 caracteres (Gmail mobile corta a ~50)
- 0 mayúsculas tipo "PROMOCIÓN" → spam-trigger
- 0 emojis en cold (los meten Gmail Promotions)
- 0 dollar/euro signs → spam-trigger
- {{nombre_propio}} mejora open rate ~12%

---

## Categoría 1: Pregunta directa (curiosidad)

1. `{{nombre_propio}}, una pregunta rápida sobre tu consulta`
2. `Pregunta rápida, {{nombre_propio}}`
3. `{{nombre_propio}}, ¿tienes 30 segundos?`
4. `Una pregunta sobre tus informes, {{nombre_propio}}`
5. `{{nombre_propio}}, ¿esto te suena?`
6. `Pregunta de psicólogo a psicólogo, {{nombre_propio}}`
7. `{{nombre_propio}}, una duda sobre tu Excel de pacientes`
8. `Quick check, {{nombre_propio}}`

## Categoría 2: Dolor concreto (pattern interrupt)

9. `{{nombre_propio}}, ¿cuántas horas pierdes en informes?`
10. `2 horas por informe, {{nombre_propio}}?`
11. `{{nombre_propio}}, los lunes con el Excel`
12. `Persiguiendo cobros, {{nombre_propio}}?`
13. `{{nombre_propio}}, los no-shows de los miércoles`
14. `Tu agenda en post-its, {{nombre_propio}}?`
15. `{{nombre_propio}}, las 8h que se evaporan`

## Categoría 3: Beneficio + número (claridad)

16. `Cómo recuperar 8h/semana en consulta`
17. `25 min por informe (en lugar de 2h)`
18. `0 no-shows en 2 semanas, {{nombre_propio}}`
19. `Tu consulta en 1h al día (no 5)`
20. `{{nombre_propio}}, recupera tu martes por la tarde`

## Categoría 4: Caso real (storytelling)

21. `Cómo Mar pasó de Excel a 25 min/informe`
22. `Una historia de Mar (psicóloga en Valencia)`
23. `Lo que aprendí de 12 psicólogas en beta`
24. `María lo probó. Esto pasó`
25. `La psicóloga que ahorró su martes`
26. `Cómo {{ciudad}} resolvió esto (ejemplo)`

## Categoría 5: Tripwire / regalo

27. `Una plantilla gratis para ti, {{nombre_propio}}`
28. `Te dejo esto, {{nombre_propio}} (gratis)`
29. `{{nombre_propio}}, plantilla CRM Notion + 5 informes`
30. `Para tu consulta, gratis`
31. `Sin tarjeta: tu plantilla de hoy`
32. `Mejor te lo enseño, {{nombre_propio}}`

## Categoría 6: Last chance (urgencia suave)

33. `Última, lo prometo`
34. `{{nombre_propio}}, te dejo en paz`
35. `Última vez (de verdad), {{nombre_propio}}`
36. `Borrarte de la lista en 7 días`
37. `{{nombre_propio}}, ¿paso a borrarte?`

## Categoría 7: Reply al hilo (mantener context)

38. `Re: {{nombre_propio}}, una pregunta rápida`
39. `Re: tu plantilla de Marli`
40. `Re: lo que te decía la semana pasada`

## Categoría 8: Permission asking (extracción de feedback)

41. `{{nombre_propio}}, ¿te puedo hacer 1 favor?`
42. `Una pregunta antes de borrarte, {{nombre_propio}}`
43. `Solo 1 línea me ayuda, {{nombre_propio}}`

## Categoría 9: Personalización con dato visible

44. `{{nombre_propio}} de {{ciudad}}, hola`
45. `Vi tu perfil de Doctoralia, {{nombre_propio}}`
46. `{{nombre_propio}}, colega de {{especialidad}}`
47. `Para una psicóloga en {{ciudad}}`

## Categoría 10: Provocación amable (alta apertura, alta unsubscribe)

48. `Esto no te va a gustar, {{nombre_propio}}`
49. `{{nombre_propio}}, prepárate para no estar de acuerdo`
50. `Lo que ningún psicólogo me ha querido decir`

---

## Cómo testear

### Setup A/B (en Smartlead, Lemlist, o n8n manual)

- 3 asuntos por email del sequence
- Distribución: 33% / 33% / 33% del lote
- Mantener el "control" (mejor anterior) y testear 1 nuevo a la vez después de los primeros 500 envíos

### Métricas a monitorizar

| Métrica | Cálculo | Target |
|---|---|---|
| Open rate | abiertos / entregados | > 35% en cold, > 50% en post-tripwire |
| Reply rate | respondidos / entregados | > 4% cold, > 6% post-tripwire |
| Click rate | clicks / abiertos | > 15% (depende del email) |
| Bounce rate | bounces / enviados | < 3% (>4% = pausa) |
| Spam complaint | complaints / enviados | < 0.1% (>0.3% = pausa) |
| Unsubscribe rate | opt-outs / enviados | < 2% es saludable |

### Combinaciones ganadoras observadas (referencia)

- Cold email 1: combo 1+2 (pregunta directa) > combo 9 (dolor)
- Cold email 2 (bump): combo 38 (Re: hilo) > 41 (favor)
- Cold email 3 (caso real): combo 21 (storytelling) consistentemente alto
- Cold email 4 (last): combo 33 (3-4 palabras) bate combos largos
- Cold email 5 (favor): combo 41 best performer si copy es honesto

---

## Anti-spam: lo que NUNCA poner en asunto

❌ Mayúsculas: `OFERTA`, `URGENTE`, `LIMITED`
❌ Símbolos $/€/!: `Solo $99!!!`
❌ Palabras spam-trigger: `gratis`, `free`, `winner`, `urgent`
❌ Más de 1 signo exclamación
❌ "Re:" o "Fwd:" si no es realmente respuesta (Gmail penaliza)
❌ Emojis en cold (Gmail Promotions)
❌ "Hola amigo" / "Estimado señor/a" (genérico → spam)

✅ OK: nombre propio, dolor concreto, número específico, sin gritar

---

## Plantilla de spreadsheet para tracking

| Email # | Subject | Sent | Opens | Open % | Replies | Reply % | Clicks | Click % |
|---|---|---|---|---|---|---|---|---|
| 1 | A | 200 | 78 | 39% | 8 | 4% | 12 | 6% |
| 1 | B | 200 | 82 | 41% | 10 | 5% | 15 | 7.5% |
| 1 | C | 200 | 71 | 35.5% | 6 | 3% | 9 | 4.5% |
| 2 | A | 180 | 45 | 25% | 5 | 2.8% | 8 | 4.4% |

Mantener archivo `tracking-subjects.csv` actualizado semanalmente.
