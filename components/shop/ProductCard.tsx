"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore, useCartDrawer } from "@/store/cart";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ProductWithCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: any;
  stock: number;
  images: string[];
  isCustom: boolean;
  category: Category | null;
}

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { openDrawer } = useCartDrawer();

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.isCustom) {
      // Si es personalizable, redirigir al detalle para que configure los datos
      router.push(`/producto/${product.slug}`);
    } else {
      // Si no es personalizable, agregar directo al carro
      addItem({
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.images[0] || "/placeholder-pet.png",
        price: Number(product.price),
      }, 1);
      openDrawer();
    }
  };

  return (
    <article className="bg-surface-container-lowest rounded-xl flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 relative shadow-sm border border-surface-container-highest font-['Plus_Jakarta_Sans']">
      {isLowStock && (
        <div className="absolute top-sm right-sm z-10 bg-error-container text-on-error-container font-label-md text-label-md px-sm py-xs rounded-full flex items-center gap-xs">
          <span className="material-symbols-outlined text-[14px]">warning</span>
          Poco Stock
        </div>
      )}
      {isOutOfStock && (
        <div className="absolute top-sm right-sm z-10 bg-surface-container-highest text-on-surface-variant font-label-md text-label-md px-sm py-xs rounded-full flex items-center gap-xs">
          <span className="material-symbols-outlined text-[14px]">block</span>
          Agotado
        </div>
      )}
      
      <div className="aspect-square bg-surface-container-low relative overflow-hidden group">
        <Link href={`/producto/${product.slug}`} className="absolute inset-0 z-0">
          {product.images.length > 0 ? (
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-container text-on-surface-variant">
              Sin imagen
            </div>
          )}
        </Link>
      </div>
      <div className="p-md flex flex-col flex-grow">
        <span className="font-label-md text-label-md text-secondary mb-xs">
          {product.category?.name || "General"}
        </span>
        <Link href={`/producto/${product.slug}`}>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-sm line-clamp-2 hover:text-primary transition-colors font-bold">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-primary font-bold">
            ${Number(product.price).toLocaleString('es-CL')}
          </span>
          <button 
            onClick={handleCartClick}
            aria-label="Add to cart" 
            disabled={isOutOfStock}
            className={`rounded-full w-10 h-10 flex items-center justify-center transition-colors ${
              isOutOfStock 
                ? "bg-surface-container text-outline cursor-not-allowed" 
                : "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container"
            }`}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_shopping_cart</span>
          </button>
        </div>
      </div>
    </article>
  );
}
