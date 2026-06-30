"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/actions/product";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface Variant {
  id?: string;
  name: string;
  price: any;
  stock: number;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  images: string[];
  isCustom: boolean;
  categoryId: string | null;
  variants: Variant[];
}

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

export function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!product;

  // Estados del formulario principal
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [stock, setStock] = useState(product?.stock?.toString() || "0");
  const [categoryId, setCategoryId] = useState(product?.categoryId || "");
  const [isCustom, setIsCustom] = useState(product?.isCustom || false);

  // Imágenes existentes (Modo Edición)
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);

  // Nuevas imágenes seleccionadas localmente (archivos y urls de vista previa)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Estado de variantes
  const [variants, setVariants] = useState<{ name: string; price?: string; stock: string }[]>(
    product?.variants.map(v => ({
      name: v.name,
      price: v.price !== null && v.price !== undefined ? v.price.toString() : "",
      stock: v.stock.toString()
    })) || []
  );

  // Estados de control
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Manejar cambio en selección de archivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...filesArray]);

      const urls = filesArray.map(file => URL.createObjectURL(file));
      setPreviewUrls([...previewUrls, ...urls]);
    }
  };

  // Remover vista previa de archivo seleccionado
  const removeSelectedFile = (idx: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== idx));
    // Revocar URL para no saturar memoria
    URL.revokeObjectURL(previewUrls[idx]);
    setPreviewUrls(previewUrls.filter((_, i) => i !== idx));
  };

  // Eliminar imagen del servidor (Edición)
  const removeExistingImage = (url: string) => {
    setExistingImages(existingImages.filter(img => img !== url));
  };

  // Agregar variante en blanco
  const addVariantRow = () => {
    setVariants([...variants, { name: "", price: "", stock: "0" }]);
  };

  // Modificar variante específica
  const handleVariantChange = (idx: number, field: "name" | "price" | "stock", value: string) => {
    setVariants(
      variants.map((v, i) => (i === idx ? { ...v, [field]: value } : v))
    );
  };

  // Eliminar variante de la lista
  const removeVariantRow = (idx: number) => {
    setVariants(variants.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    if (isNaN(Number(price)) || Number(price) < 0) {
      setError("Ingresa un precio base válido.");
      return;
    }

    if (isNaN(Number(stock)) || Number(stock) < 0) {
      setError("Ingresa un stock base válido.");
      return;
    }

    // Validar variantes
    for (const v of variants) {
      if (!v.name.trim()) {
        setError("Todas las variantes deben tener un nombre (ej. 'Talla M').");
        return;
      }
      if (v.price && (isNaN(Number(v.price)) || Number(v.price) < 0)) {
        setError(`El precio de la variante "${v.name}" no es válido.`);
        return;
      }
      if (isNaN(Number(v.stock)) || Number(v.stock) < 0) {
        setError(`El stock de la variante "${v.name}" debe ser un número entero válido.`);
        return;
      }
    }

    setLoading(true);

    // Preparar FormData para subir archivos
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("categoryId", categoryId);
    formData.append("isCustom", isCustom ? "true" : "false");

    // Agregar archivos de imagen
    selectedFiles.forEach(file => {
      formData.append("images", file);
    });

    // Formatear variantes
    const parsedVariants = variants.map(v => ({
      name: v.name.trim(),
      price: v.price ? Number(v.price) : undefined,
      stock: Number(v.stock)
    }));

    try {
      let result;
      if (isEditMode) {
        result = await updateProduct(product.id, formData, parsedVariants, existingImages);
      } else {
        result = await createProduct(formData, parsedVariants);
      }

      if (result.success) {
        setSuccess(true);
        // Redirigir después de un breve delay
        setTimeout(() => {
          router.push("/dashboard/productos");
          router.refresh();
        }, 1500);
      } else {
        setError(result.error || "Ocurrió un error inesperado al procesar el producto.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Error de red. Intenta nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto font-['Plus_Jakarta_Sans'] pb-12">
      <div className="flex items-center justify-between mb-6">
        <Link 
          href="/dashboard/productos" 
          className="text-xs text-outline hover:text-primary transition-colors flex items-center gap-1 font-semibold"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver a la Lista
        </Link>
        <span className="text-xs text-outline">Rinconcito Admin Form</span>
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 shadow-[0_4px_20px_rgb(7,69,115,0.02)] p-8">
        <h2 className="font-headline-sm text-xl text-primary font-extrabold border-b border-stone-100 pb-4 mb-6">
          {isEditMode ? `Editar Producto: ${product.name}` : "Agregar Nuevo Producto"}
        </h2>

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-2xl border border-error/20 flex items-start gap-2 text-xs mb-6">
            <span className="material-symbols-outlined text-lg flex-shrink-0">warning</span>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-800 p-4 rounded-2xl border border-green-200 flex items-start gap-2 text-xs mb-6">
            <span className="material-symbols-outlined text-lg flex-shrink-0">check_circle</span>
            <span className="font-semibold">¡Producto guardado exitosamente! Redirigiendo...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre y Precio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="font-label-md text-xs text-on-surface block mb-1">
                Nombre del Producto <span className="text-error font-bold">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Plaquita Hueso Rosado"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="font-label-md text-xs text-on-surface block mb-1">
                Precio Base (CLP) <span className="text-error font-bold">*</span>
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="4990"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
                required
              />
            </div>
          </div>

          {/* Stock y Categoría */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="stock" className="font-label-md text-xs text-on-surface block mb-1">
                Stock Inicial Base <span className="text-error font-bold">*</span>
              </label>
              <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="50"
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="font-label-md text-xs text-on-surface block mb-1">
                Categoría del Producto
              </label>
              <select
                id="category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label htmlFor="description" className="font-label-md text-xs text-on-surface block mb-1">
              Descripción del Producto
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Escribe los detalles del producto para los clientes..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
            />
          </div>

          {/* Personalización Toggle */}
          <div className="flex items-center gap-3 px-1">
            <input
              type="checkbox"
              id="isCustom"
              checked={isCustom}
              onChange={(e) => setIsCustom(e.target.checked)}
              className="rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
            />
            <label htmlFor="isCustom" className="text-xs text-on-surface font-semibold leading-relaxed">
              ¿Es un producto personalizable? (Habilita los campos de Nombre de Mascota y Teléfono en el detalle)
            </label>
          </div>

          {/* Images Section */}
          <div className="space-y-3 bg-surface-container-low/40 border border-stone-100 rounded-3xl p-5">
            <h3 className="font-headline-sm text-xs font-bold text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">image</span>
              Imágenes del Producto
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Existing Images */}
              {isEditMode && existingImages.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Imágenes Guardadas</p>
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((url, idx) => (
                      <div key={idx} className="relative w-20 h-20 border border-stone-200 rounded-xl overflow-hidden group">
                        <img src={url} alt={`img-${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(url)}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                          title="Eliminar imagen"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload Input */}
              <div>
                <label className="cursor-pointer inline-flex items-center justify-center gap-1 bg-surface-container-lowest hover:bg-stone-50 border border-outline-variant text-xs font-semibold px-4 py-3 rounded-full text-on-surface transition-all">
                  <span className="material-symbols-outlined text-sm">cloud_upload</span>
                  Subir Imágenes
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-[10px] text-outline mt-1.5">Puedes seleccionar múltiples archivos a la vez.</p>
              </div>

              {/* New Previews */}
              {previewUrls.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-2">Nuevas Imágenes Seleccionadas</p>
                  <div className="flex flex-wrap gap-3">
                    {previewUrls.map((url, idx) => (
                      <div key={idx} className="relative w-20 h-20 border border-stone-200 rounded-xl overflow-hidden group">
                        <img src={url} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeSelectedFile(idx)}
                          className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                          title="Eliminar de la lista"
                        >
                          <span className="material-symbols-outlined text-xs">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Variants Section */}
          <div className="space-y-4 bg-surface-container-low/40 border border-stone-100 rounded-3xl p-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <h3 className="font-headline-sm text-xs font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">tune</span>
                Medidas / Tallas (Variantes)
              </h3>
              <button
                type="button"
                onClick={addVariantRow}
                className="text-primary hover:opacity-85 text-xs font-bold flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Agregar Fila
              </button>
            </div>

            {variants.length === 0 ? (
              <p className="text-xs text-outline italic">El producto se venderá con precio y talla única. Añade variantes si tienes tallas (Ej: Talla S, M).</p>
            ) : (
              <div className="space-y-3">
                {variants.map((v, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-white p-3 rounded-xl border border-stone-100">
                    <div className="flex-grow">
                      <input
                        type="text"
                        placeholder="Nombre (ej. Talla S)"
                        value={v.name}
                        onChange={(e) => handleVariantChange(idx, "name", e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div className="w-28">
                      <input
                        type="number"
                        placeholder="Precio (opcional)"
                        value={v.price}
                        onChange={(e) => handleVariantChange(idx, "price", e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        placeholder="Stock"
                        value={v.stock}
                        onChange={(e) => handleVariantChange(idx, "stock", e.target.value)}
                        className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => removeVariantRow(idx)}
                        className="p-1.5 text-outline hover:text-error hover:bg-error-container/20 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-stone-100">
            <Link
              href="/dashboard/productos"
              className="bg-surface-container-lowest hover:bg-stone-50 border border-outline-variant text-xs font-semibold px-6 py-3 rounded-full text-on-surface-variant transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-on-primary font-label-md px-6 py-3 rounded-full text-xs shadow-md hover:opacity-95 active:scale-[0.98] transition-all flex items-center gap-1.5 disabled:bg-surface-container disabled:text-outline disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-on-primary"></div>
                  <span>Guardando...</span>
                </>
              ) : (
                <span>Guardar Producto</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
