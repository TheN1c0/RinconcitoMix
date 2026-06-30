import { getProductBySlug } from "@/lib/services/product.service";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `${product.name} | Rinconcito Mix`,
    description: product.description || `Compra ${product.name} en Rinconcito Mix. Accesorios personalizados para mascotas.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 md:px-md py-lg">
      <ProductDetailClient product={product as any} />
    </main>
  );
}
