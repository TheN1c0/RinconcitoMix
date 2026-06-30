"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteProduct } from "@/app/actions/product";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
  isCustom: boolean;
  category: Category | null;
}

export function ProductListTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar el producto "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      const result = await deleteProduct(id);
      if (result.success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        setError(result.error || "Ocurrió un error al intentar eliminar el producto.");
      }
    } catch (err) {
      console.error(err);
      setError("Error de red. Intenta nuevamente.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4 font-['Plus_Jakarta_Sans']">
      {error && (
        <div className="bg-error-container text-on-error-container p-4 rounded-2xl border border-error/20 flex items-start gap-2 text-xs">
          <span className="material-symbols-outlined text-lg flex-shrink-0">warning</span>
          <span className="font-semibold">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-stone-100 shadow-[0_4px_20px_rgb(7,69,115,0.02)] overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-outline">
            {products.length} {products.length === 1 ? "producto registrado" : "productos registrados"}
          </span>
          <Link
            href="/dashboard/productos/nuevo"
            className="bg-primary text-on-primary font-label-md px-5 py-3 rounded-full shadow-md text-xs hover:opacity-95 transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Agregar Producto
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">inventory_2</span>
            <p className="text-sm font-bold text-on-surface-variant">No hay productos en el catálogo</p>
            <Link
              href="/dashboard/productos/nuevo"
              className="text-primary font-label-md text-xs hover:underline mt-2 inline-block font-semibold"
            >
              Crea tu primer producto aquí
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-outline uppercase text-[10px] font-bold tracking-wider border-b border-stone-100 bg-stone-50/50">
                  <th className="px-6 py-4">Imagen</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Categoría</th>
                  <th className="px-6 py-4">Precio</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Personalizable</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.map((product) => (
                  <tr key={product.id} className="text-on-surface font-medium hover:bg-stone-50/30 transition-colors">
                    {/* Image */}
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 bg-stone-100 rounded-xl overflow-hidden border border-stone-200">
                        <img
                          src={product.images[0] || "/placeholder-pet.png"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    
                    {/* Name */}
                    <td className="px-6 py-3">
                      <p className="font-bold text-on-surface line-clamp-1">{product.name}</p>
                      <p className="text-[11px] text-outline truncate max-w-xs">{product.slug}</p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-3">
                      <span className="text-xs text-secondary bg-secondary-fixed px-3 py-1 rounded-full font-bold">
                        {product.category?.name || "Sin categoría"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-3 font-bold text-primary">
                      ${product.price.toLocaleString("es-CL")}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-3">
                      <span className={`font-bold ${product.stock <= 5 ? "text-error" : "text-on-surface"}`}>
                        {product.stock} u.
                      </span>
                    </td>

                    {/* Customizable */}
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                        product.isCustom 
                          ? "bg-tertiary-fixed border-tertiary-fixed-dim text-on-tertiary-fixed" 
                          : "bg-stone-50 border-stone-200 text-outline"
                      }`}>
                        {product.isCustom ? "Sí" : "No"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <Link
                          href={`/dashboard/productos/${product.id}`}
                          className="p-2 text-outline hover:text-primary hover:bg-surface-container-low rounded-xl transition-all"
                          title="Editar producto"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </Link>
                        <button
                          disabled={deletingId === product.id}
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 text-outline hover:text-error hover:bg-error-container/20 rounded-xl transition-all disabled:opacity-55"
                          title="Eliminar producto"
                        >
                          <span className="material-symbols-outlined text-lg">
                            {deletingId === product.id ? "hourglass_empty" : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
