# Rinconcito Mix 🐾 — Plataforma E-commerce

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC)
![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E)

Plataforma oficial de comercio electrónico exclusiva para **Rinconcito Mix**, especializada en accesorios, plaquitas personalizadas y productos para mascotas en Chile. 

Este repositorio contiene el código fuente de la tienda en línea y el sistema de administración (Panel Admin), construido con una arquitectura escalable orientada a ventas, SEO y cumplimiento legal de comercio en Chile.

## Características Principales 🌟

- **Gestión de Catálogo:** Administración total de productos, categorías, niveles de stock y variaciones de precio por tallas/diseños.
- **Cumplimiento Normativo (Chile):** Integración nativa con políticas de consumidor (SERNAC), derecho a retracto de 10 días, y arquitectura de base de datos preparada para integración directa con facturación/boleta electrónica del Servicio de Impuestos Internos (SII).
- **Pasarela de Pago:** Conexión nativa con **Webpay Plus** (Transbank) respaldada en la nube para procesamiento de tarjetas bancarias.
- **Notificaciones Transaccionales:** Sistema integrado de envíos de correos electrónicos automáticos para comprobantes de pago e hitos del envío.
- **Diseño Dinámico:** UI/UX cuidadosamente diseñada con Tailwind v4.

---

## Documentación del Proyecto 📚

Toda la lógica de negocio, arquitectura y hojas de ruta están centralizadas en los documentos base. Para mantener la consistencia del desarrollo, consulta:

1. **[PLAN_RINCONCITO_MIX.md](./PLAN_RINCONCITO_MIX.md)**: El documento principal (fuente de la verdad). Detalla todos los endpoints, el modelado relacional de bases de datos, los requerimientos legales y la arquitectura en la nube.
2. **[DESIGN.md](./DESIGN.md)**: El sistema de diseño que incluye paleta de colores corporativos, tipografía y variables de componente (`globals.css`).
3. **[PROGRESO.md](./PROGRESO.md)**: *No rastreado*. Tablero de control de fases e hitos de liberación.

## Apilamiento Tecnológico (Stack) 🛠
* **Frontend:** Next.js 14 (App Router), React 19, TailwindCSS v4, React Hook Form, Zustand (Manejo global de carritos).
* **Backend:** Next.js Server Actions y Node.js.
* **Base de Datos:** PostgreSQL (Cloud Supabase) mediado por Prisma ORM.
* **Autenticación:** NextAuth v5 (Auth.js) / Google Provider.
* **Integraciones API:** Transbank SDK, Resend (Emails).
