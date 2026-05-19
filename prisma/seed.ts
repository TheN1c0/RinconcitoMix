import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Categorías
  const catMascotas = await prisma.category.upsert({
    where: { slug: "accesorios-mascotas" },
    update: {},
    create: {
      name: "Accesorios para Mascotas",
      slug: "accesorios-mascotas",
      description: "Plaquitas, collares y más para tus engreídos",
    },
  });

  // Productos
  await prisma.product.upsert({
    where: { slug: "plaquita-hueso" },
    update: {},
    create: {
      name: "Plaquita de Hueso Personalizada",
      slug: "plaquita-hueso",
      description: "Plaquita de hueso con el nombre de tu mascota. Puedes elegir el color y la fuente.",
      price: 4990,
      stock: 100,
      images: ["/images/plaquita-hueso.jpg"],
      categoryId: catMascotas.id,
      isCustom: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: "collar-cuero" },
    update: {},
    create: {
      name: "Collar de Cuero Genuino",
      slug: "collar-cuero",
      description: "Collar resistente de cuero para perros de todos los tamaños.",
      price: 12990,
      stock: 50,
      images: ["/images/collar-cuero.jpg"],
      categoryId: catMascotas.id,
      isCustom: false,
      variants: {
        create: [
          { name: "Talla S", stock: 20 },
          { name: "Talla M", stock: 20 },
          { name: "Talla L", stock: 10, price: 14990 },
        ],
      },
    },
  });

  // Legal Pages
  await prisma.legalPage.upsert({
    where: { slug: "terminos" },
    update: {},
    create: {
      slug: "terminos",
      title: "Términos y Condiciones",
      content: "Contenido de términos y condiciones...",
    },
  });

  // Store Settings
  await prisma.storeSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      storeName: "Rinconcito Mix",
      storeEmail: "contacto@rinconcitomix.cl",
      storeCity: "Santiago",
      shippingMessage: "Envío gratis en RM por compras sobre $30.000",
      freeShippingMin: 30000,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
