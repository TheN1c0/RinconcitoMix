import { prisma } from "@/lib/prisma";
import { getCategories } from "@/lib/services/product.service";
import { ProductForm } from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: EditPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // Consultas paralelas a la base de datos
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        variants: true
      }
    }),
    getCategories()
  ]);

  if (!product) {
    notFound();
  }

  // Serializar tipos Decimal de Prisma a numbers para pasarlos al componente cliente
  const serializedProduct = {
    ...product,
    price: Number(product.price),
    variants: product.variants.map(v => ({
      ...v,
      price: v.price ? Number(v.price) : null
    }))
  };

  return (
    <div>
      <ProductForm product={serializedProduct as any} categories={categories} />
    </div>
  );
}
