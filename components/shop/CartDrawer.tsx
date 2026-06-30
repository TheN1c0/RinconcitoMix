"use client";

import Link from "next/link";
import { useCartStore, useCartDrawer } from "@/store/cart";

export function CartDrawer() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const { isOpen, closeDrawer } = useCartDrawer();

  // Calcular subtotal
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeDrawer}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-[0_20px_40px_rgb(7,69,115,0.15)] flex flex-col border-l border-surface-container-high animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-surface-container-high flex items-center justify-between">
            <h2 className="font-headline-sm text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              Tu Carrito
            </h2>
            <button 
              onClick={closeDrawer}
              className="p-2 text-outline hover:text-primary hover:bg-surface-container-low rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <span className="material-symbols-outlined text-5xl text-outline mb-4">shopping_cart_off</span>
                <p className="font-body-lg text-on-surface font-semibold">Tu carrito está vacío</p>
                <p className="font-body-md text-on-surface-variant mt-1">Explora nuestro catálogo y agrega productos para comenzar.</p>
                <button 
                  onClick={closeDrawer}
                  className="mt-6 bg-primary text-on-primary font-label-md px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-3 bg-surface-container-low rounded-2xl border border-surface-container-high transition-all"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-surface-container-lowest rounded-xl overflow-hidden flex-shrink-0 border border-surface-container-high">
                    <img 
                      src={item.productImage} 
                      alt={item.productName} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow flex flex-col justify-between min-w-0">
                    <div>
                      <h4 className="font-headline-sm text-sm text-on-surface line-clamp-1 font-bold">
                        {item.productName}
                      </h4>
                      {item.variantName && (
                        <p className="font-body-md text-xs text-secondary mt-0.5">
                          Talla/Variante: {item.variantName}
                        </p>
                      )}
                      
                      {/* Personalización (Plaquitas) */}
                      {item.customData && (item.customData.petName || item.customData.phone) && (
                        <div className="mt-1 bg-primary-fixed/30 rounded-lg p-2 text-xs text-on-primary-container/90 space-y-0.5 border border-primary-fixed-dim">
                          {item.customData.petName && (
                            <p><strong>Mascota:</strong> {item.customData.petName}</p>
                          )}
                          {item.customData.phone && (
                            <p><strong>Fono:</strong> {item.customData.phone}</p>
                          )}
                          {item.customData.additionalInfo && (
                            <p className="italic">"{item.customData.additionalInfo}"</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Price */}
                      <span className="font-headline-sm text-sm text-primary font-extrabold">
                        ${(item.price * item.quantity).toLocaleString("es-CL")}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1 bg-surface-container-lowest rounded-full border border-surface-container-high px-1 py-0.5">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container-low transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">remove</span>
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-on-surface">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container-low transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex flex-col justify-start">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-outline hover:text-error rounded-full transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer (Checkout Actions) */}
          {items.length > 0 && (
            <div className="px-6 py-6 border-t border-surface-container-high bg-surface-container-low space-y-4">
              <div className="flex justify-between items-center font-headline-sm text-base">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="text-primary text-xl font-extrabold">${subtotal.toLocaleString("es-CL")}</span>
              </div>
              <p className="font-body-md text-xs text-on-surface-variant">
                * El despacho es gratuito (a convenir / retiro en persona).
              </p>
              <div className="grid grid-cols-1 gap-2 pt-2">
                <Link 
                  href="/checkout"
                  onClick={closeDrawer}
                  className="w-full bg-primary text-on-primary font-label-md py-4 rounded-full shadow-lg text-center hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  Proceder al Checkout
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <button 
                  onClick={closeDrawer}
                  className="w-full bg-surface-container-lowest text-on-surface-variant font-label-md py-3 rounded-full border border-outline-variant hover:bg-surface-container-low transition-colors text-center"
                >
                  Seguir Comprando
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
