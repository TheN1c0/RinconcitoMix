import { getCategories } from "@/lib/services/product.service";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <ProductForm categories={categories} />
    </div>
  );
}
