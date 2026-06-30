import { prisma } from "@/lib/prisma";
import { ProductListTable } from "@/components/admin/ProductListTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  // Obtener los productos incluyendo categorías
  const products = await prisma.product.findMany({
    include: {
      category: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  // Convertir tipos Decimal de Prisma a numbers para componentes cliente
  const serializedProducts = products.map(product => ({
    ...product,
    price: Number(product.price),
    category: product.category 
      ? { id: product.category.id, name: product.category.name }
      : null
  }));

  return (
    <div className="space-y-6">
      <ProductListTable initialProducts={serializedProducts as any} />
    </div>
  );
}
