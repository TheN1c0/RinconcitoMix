# Rinconcito Mix 🐾

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC)
![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E)

Plataforma oficial de comercio electrónico para accesorios, plaquitas personalizadas y productos para mascotas en Chile. Construido con arquitectura limpia empleando Next.js, bases de datos PostgreSQL (Supabase) y Transbank para pagos.

## Características 🌟

- **Catálogo Dinámico:** Gestión completa de stock, variaciones y categorías desde un panel administrativo.
- **Páginas Legales y Desglose Tributario:** Adaptación automática a normas SERNAC (Chile) y preparado para SII con IVA detallado en cada compra.
- **Webpay Plus Integrado:** Pasarela para tarjetas de débito/crédito gestionada por Transbank.
- **Flujo de Pago Optimizado:** Carrito de estado global, notificaciones por email automatizadas vía Resend y un panel de seguimiento de compras sin registro obligatorio.

---

## Para Desarrolladores 🛠

Para correr la aplicación en ambiente de desarrollo, sigue los siguientes pasos:

### 1. Variables de Entorno
Copia el archivo base y rellena las credenciales con tu instancia de base de datos.
```bash
cp .env.example .env.local
```

### 2. Base de Datos
La aplicación usa **Prisma** para gestionar la base de datos PostgreSQL. Usa los siguientes comandos para sincronizar las tablas y poblar datos básicos:

```bash
# Push el esquema a la base de datos
npx prisma db push

# (Opcional) Generar el cliente de Prisma internamente
npx prisma generate
```

### 3. Servidor de Desarrollo
Instala todas las dependencias e inicia el cliente en `localhost:3000`:
```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador para ver los resultados iniciales.

## Apilamiento (Stack) 📚
* **Frontend:** Next.js 14, TailwindCSS v4, React Hook Form, Zustand.
* **Backend:** Server Actions (Next.js), Node.js.
* **DB & Autenticación:** PostgreSQL (Supabase), Prisma ORM, NextAuth (Auth.js v5). 
* **Servicios e-mail:** Resend, React Email.
