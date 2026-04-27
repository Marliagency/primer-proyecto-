---
type: nota
tags: [marketing, partners, afiliados]
status: idea
fase: 3
updated: 2026-04-27
---

# Programa de Partners (Afiliados)

> Activación en **Fase 3** (Días 61-90).

## Modelo

**100 € por referido cerrado** (Pack Premium pagado).

## Mecánica

1. Partner se registra → recibe enlace tracked único
2. Comparte enlace en su red
3. Lead llega con `?ref=PARTNER123`
4. n8n almacena referido en CRM con tag `partner:PARTNER123`
5. Si se cierra venta → partner cobra 100€ vía Stripe Connect (o
   transferencia)

## Quién puede ser partner

- Clientes existentes (mejor canal — ya validan)
- Coaches y formadores que trabajan con psicólogos
- Asociaciones profesionales (deal especial: 30% revenue share)

## Skills

- [[../03-SKILLS-SYSTEM/Skills-Database#employment-contract-templates|employment-contract-templates]]
  (contrato de afiliación)
- [[../03-SKILLS-SYSTEM/Skills-Database#stripe-integration|stripe-integration]]
  (Stripe Connect para pagos)

## Tracking

Tabla custom en Notion (parte del [[../02-PRODUCTOS/CRM-Marli|CRM]]):

- Partner ID, nombre, email
- Enlace tracked
- Leads generados
- Ventas cerradas
- Comisiones pagadas / pendientes

## Métricas

- Partners activos (objetivo H1: 5)
- Ventas vía partner / mes (objetivo: 20% del total a 6 meses)
- Tiempo medio de pago de comisión (objetivo: < 7 días post-cierre)

## Estado

`idea` — pendiente Fase 3.

## Ver también

- [[Plan-90-Dias]]
- [[../11-INTEGRACIONES/Integracion-Stripe]]
