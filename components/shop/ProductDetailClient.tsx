"use client";

import { useState } from "react";
import { useCartStore, useCartDrawer } from "@/store/cart";

// Definir interfaces locales para compatibilidad con Prisma
interface Variant {
  id: string;
  name: string;
  price: any; // Decimal de Prisma
  stock: number;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: any; // Decimal de Prisma
  stock: number;
  images: string[];
  isCustom: boolean;
  category: Category | null;
  variants: Variant[];
}

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const { openDrawer } = useCartDrawer();

  // Estados locales
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(
    product.variants.length > 0 ? product.variants[0] : null
  );
  const [activeImage, setActiveImage] = useState(
    product.images.length > 0 ? product.images[0] : "/placeholder-pet.png"
  );
  const [petName, setPetName] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState("");

  // Calcular precio actual
  const basePrice = Number(product.price);
  const currentPrice = selectedVariant && selectedVariant.price !== null
    ? Number(selectedVariant.price)
    : basePrice;

  // Manejar el botón "Agregar al carro"
  const handleAddToCart = () => {
    setError("");

    // Validar si el producto es personalizable
    if (product.isCustom) {
      if (!petName.trim()) {
        setError("El nombre de tu mascota es obligatorio para personalizar la plaquita.");
        return;
      }
      if (!phone.trim()) {
        setError("El teléfono de contacto es obligatorio para la seguridad de tu mascota.");
        return;
      }
    }

    // Agregar al carrito mediante el store de Zustand
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      productImage: product.images[0] || "/placeholder-pet.png",
      price: currentPrice,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      customData: product.isCustom ? {
        petName: petName.trim(),
        phone: phone.trim(),
        additionalInfo: additionalInfo.trim() || undefined
      } : undefined
    }, 1);

    // Abrir el CartDrawer para mejor UX
    openDrawer();
  };

  return (
    <div className="font-['Plus_Jakarta_Sans']">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-on-surface-variant/60 mb-8 text-xs font-semibold">
        <a href="/" className="hover:text-primary transition-colors">Inicio</a>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <a href="/catalogo" className="hover:text-primary transition-colors">Catálogo</a>
        {product.category && (
          <>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <a href={`/catalogo?category=${product.category.slug}`} className="hover:text-primary transition-colors">
              {product.category.name}
            </a>
          </>
        )}
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-on-surface font-bold">{product.name}</span>
      </nav>

      {/* Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="aspect-square bg-surface-container-low rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(7,69,115,0.04)] relative group border border-surface-container-high">
            <img 
              src={activeImage} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square bg-surface-container-low rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === img ? "border-primary" : "border-transparent hover:border-outline-variant"
                  }`}
                >
                  <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Customization & Cart Action */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="space-y-4 border-b border-surface-container-highest pb-6">
            <div className="flex flex-wrap gap-2">
              {product.category && (
                <span className="bg-secondary-fixed text-on-secondary-fixed-variant text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category.name}
                </span>
              )}
              {product.isCustom && (
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Personalizable
                </span>
              )}
            </div>
            <h1 className="font-headline-lg text-primary text-3xl md:text-4xl leading-tight font-extrabold">
              {product.name}
            </h1>
            <div className="flex items-baseline gap-3">
              <span className="font-headline-lg text-3xl text-primary font-black">
                ${currentPrice.toLocaleString("es-CL")}
              </span>
            </div>
            {product.description && (
              <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
                {product.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-primary text-xs font-semibold">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span>Listo para entrega / Retiro en persona</span>
            </div>
          </div>

          {/* Form / Interactive Customization */}
          <div className="space-y-6">
            {/* Custom fields (Optional for plaquitas) */}
            {product.isCustom && (
              <div className="bg-surface-container-low rounded-2xl p-5 border border-surface-container-high space-y-4">
                <h3 className="font-headline-sm text-sm font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">edit_note</span>
                  Personalización de la Plaquita
                </h3>

                {error && (
                  <div className="bg-error-container text-on-error-container text-xs p-3 rounded-xl border border-error/20 flex items-start gap-2">
                    <span className="material-symbols-outlined text-lg flex-shrink-0">warning</span>
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label htmlFor="petName" className="font-label-md text-xs text-on-surface block mb-1">
                      Nombre de la Mascota <span className="text-error font-bold">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="petName"
                      maxLength={15}
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="Ej. Bella, Rocky"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-outline/40"
                    />
                    <p className="text-[10px] text-outline mt-0.5">Máximo 15 caracteres para mejor legibilidad.</p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="font-label-md text-xs text-on-surface block mb-1">
                      Teléfono de Contacto <span className="text-error font-bold">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="phone"
                      maxLength={15}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej. +56 9 1234 5678"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-outline/40"
                    />
                    <p className="text-[10px] text-outline mt-0.5">Se grabará detrás de la plaquita para emergencias.</p>
                  </div>

                  <div>
                    <label htmlFor="additionalInfo" className="font-label-md text-xs text-on-surface block mb-1">
                      Información Adicional (Opcional)
                    </label>
                    <input 
                      type="text" 
                      id="additionalInfo"
                      maxLength={30}
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Ej. Tengo Chip / Dirección corta"
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-outline/40"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className="space-y-2">
                <span className="font-label-md text-xs text-on-surface block font-bold">Seleccionar Medida / Talla</span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`px-5 py-2.5 rounded-full border text-xs font-semibold transition-all ${
                        selectedVariant?.id === v.id
                          ? "bg-primary-fixed border-primary text-on-primary-fixed shadow-sm scale-105"
                          : "border-outline-variant text-on-surface hover:bg-surface-container-high"
                      }`}
                    >
                      {v.name} {v.price !== null && `($${Number(v.price).toLocaleString("es-CL")})`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-primary text-on-primary font-label-md py-4 rounded-full shadow-[0_4px_12px_rgb(7,69,115,0.2)] hover:opacity-95 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
                <span>Agregar al Carrito</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
