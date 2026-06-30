"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { createOrder } from "@/app/actions/order";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  
  // Estados del formulario
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "acordar">("pickup");
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Estados de carga y flujo
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<{ whatsappUrl: string; orderNumber: number } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Tu carrito está vacío. Agrega productos antes de realizar el checkout.");
      return;
    }

    if (!buyerName.trim()) {
      setError("Por favor, ingresa tu nombre completo.");
      return;
    }

    if (!buyerEmail.trim()) {
      setError("Por favor, ingresa tu correo electrónico.");
      return;
    }

    if (!buyerPhone.trim()) {
      setError("Por favor, ingresa tu número de teléfono (WhatsApp).");
      return;
    }

    if (!acceptTerms) {
      setError("Debes aceptar los Términos y Condiciones para continuar.");
      return;
    }

    setLoading(true);

    // Llamar al Server Action
    const result = await createOrder({
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim(),
      buyerPhone: buyerPhone.trim(),
      deliveryMethod,
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        variantId: item.variantId,
        variantName: item.variantName,
        customData: item.customData
      }))
    });

    setLoading(false);

    if (result.success && result.whatsappUrl) {
      // Guardar datos de éxito
      setSuccessData({
        whatsappUrl: result.whatsappUrl,
        orderNumber: result.orderNumber!,
      });

      // Limpiar el carrito local
      clearCart();

      // Redirigir automáticamente a WhatsApp
      window.location.href = result.whatsappUrl;
    } else {
      setError(result.error || "Ocurrió un error inesperado al procesar tu pedido.");
    }
  };

  // Si el pedido fue exitoso, mostrar pantalla de confirmación y botón manual para WhatsApp
  if (successData) {
    return (
      <main className="flex-grow max-w-[600px] w-full mx-auto px-6 py-16 flex flex-col items-center justify-center text-center font-['Plus_Jakarta_Sans']">
        <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center text-primary mb-6 animate-bounce">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
        </div>
        <h1 className="font-headline-lg text-primary text-3xl mb-4 font-black">¡Pedido Registrado!</h1>
        <p className="font-body-lg text-on-surface-variant mb-2">
          Hemos guardado tu pedido como el **Nº {successData.orderNumber}** en nuestro sistema.
        </p>
        <p className="font-body-md text-on-surface-variant mb-8 text-sm">
          Ahora debes enviar los detalles del pedido a nuestro WhatsApp para coordinar el pago por transferencia y la entrega.
        </p>

        <div className="bg-surface-container-low border border-surface-container-high rounded-3xl p-6 w-full mb-8">
          <p className="font-body-sm text-xs text-outline mb-2">¿No fuiste redirigido automáticamente?</p>
          <a
            href={successData.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-label-md py-4 px-6 rounded-full shadow-md flex items-center justify-center gap-2 hover:opacity-95 transition-opacity font-bold"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.993L2 22l5.233-1.371a9.945 9.945 0 0 0 4.773 1.226h.004c5.505 0 9.99-4.478 9.99-9.985a9.97 9.97 0 0 0-2.925-7.062A9.957 9.957 0 0 0 12.012 2zm5.727 14.15c-.244.686-1.42 1.258-1.942 1.31-.476.047-.94.22-3.036-.617-2.678-1.07-4.386-3.79-4.52-3.97-.133-.18-1.07-1.423-1.07-2.71 0-1.287.674-1.92.915-2.186.241-.266.529-.33.722-.33h.482c.15 0 .363-.004.549.444.195.473.666 1.625.723 1.743.058.118.096.255.019.412-.077.156-.154.254-.309.432-.154.178-.323.297-.478.473-.169.191-.349.398-.15.74.199.34.885 1.459 1.897 2.355.828.734 1.528.961 1.901 1.147.373.186.589.15.807-.099.217-.25.932-1.084 1.182-1.458.25-.373.499-.313.831-.19.332.124 2.107 1.037 2.472 1.218.365.18.608.272.693.42.086.148.086.857-.158 1.543z"/>
            </svg>
            Enviar Pedido a WhatsApp
          </a>
        </div>

        <Link href="/" className="text-primary font-label-md hover:underline flex items-center gap-1 text-sm font-semibold">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Volver a la Tienda
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-[1200px] w-full mx-auto px-6 md:px-md py-lg font-['Plus_Jakarta_Sans']">
      <h1 className="font-headline-lg text-primary text-3xl font-extrabold mb-8 border-b border-surface-container-high pb-4">
        Finalizar Compra (Checkout)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Guest Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-error-container text-on-error-container p-4 rounded-2xl border border-error/20 flex items-start gap-2">
                <span className="material-symbols-outlined text-xl flex-shrink-0">warning</span>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Buyer Info */}
            <div className="bg-surface-container-low rounded-3xl p-6 border border-surface-container-high space-y-4">
              <h2 className="font-headline-sm text-base font-bold text-primary flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-lg">person</span>
                Tus Datos de Contacto
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="font-label-md text-xs text-on-surface block mb-1">
                    Nombre Completo <span className="text-error font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="font-label-md text-xs text-on-surface block mb-1">
                    Correo Electrónico <span className="text-error font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    placeholder="Ej. juan.perez@email.com"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="font-label-md text-xs text-on-surface block mb-1">
                    Teléfono / WhatsApp <span className="text-error font-bold">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="Ej. +56 9 1234 5678"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-outline/40"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Delivery Methods */}
            <div className="bg-surface-container-low rounded-3xl p-6 border border-surface-container-high space-y-4">
              <h2 className="font-headline-sm text-base font-bold text-primary flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-lg">local_shipping</span>
                Método de Entrega
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="cursor-pointer relative block">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === "pickup"}
                    onChange={() => setDeliveryMethod("pickup")}
                    className="peer sr-only"
                  />
                  <div className="p-4 rounded-2xl border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-sm peer-checked:bg-primary-fixed peer-checked:border-primary peer-checked:text-on-primary-fixed hover:bg-surface-container-high transition-all flex flex-col h-full justify-between">
                    <div>
                      <span className="font-bold block text-sm">Retiro en persona</span>
                      <span className="text-xs text-on-surface-variant/80 mt-1 block">
                        Retira en nuestro domicilio o punto de venta física del vendedor.
                      </span>
                    </div>
                    <span className="text-primary text-xs font-extrabold mt-4 block">Gratis</span>
                  </div>
                </label>

                <label className="cursor-pointer relative block">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="acordar"
                    checked={deliveryMethod === "acordar"}
                    onChange={() => setDeliveryMethod("acordar")}
                    className="peer sr-only"
                  />
                  <div className="p-4 rounded-2xl border border-outline-variant bg-surface-container-lowest text-on-surface font-label-md text-sm peer-checked:bg-primary-fixed peer-checked:border-primary peer-checked:text-on-primary-fixed hover:bg-surface-container-high transition-all flex flex-col h-full justify-between">
                    <div>
                      <span className="font-bold block text-sm">Punto de encuentro</span>
                      <span className="text-xs text-on-surface-variant/80 mt-1 block">
                        Nos juntamos en el metro o algún lugar conveniente para ambos.
                      </span>
                    </div>
                    <span className="text-primary text-xs font-extrabold mt-4 block">A convenir</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-3 px-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 rounded border-outline-variant text-primary focus:ring-primary w-4 h-4"
                required
              />
              <label htmlFor="terms" className="text-xs text-on-surface-variant leading-relaxed">
                Entiendo y acepto que este pedido se enviará por **WhatsApp** para coordinar el pago directo mediante transferencia bancaria y acordar la entrega con Rinconcito Mix.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full bg-primary text-on-primary font-label-md py-4 rounded-full shadow-[0_4px_12px_rgb(7,69,115,0.2)] hover:opacity-95 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:bg-surface-container disabled:text-outline disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-on-primary"></div>
                  <span>Procesando pedido...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-lg">chat</span>
                  <span>Confirmar Pedido vía WhatsApp</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-surface-container-low rounded-3xl p-6 border border-surface-container-high space-y-6 sticky top-24">
            <h2 className="font-headline-sm text-base font-bold text-primary border-b border-surface-container-high pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">shopping_basket</span>
              Resumen del Pedido
            </h2>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-on-surface-variant">No hay productos en el carrito.</p>
                <Link href="/catalogo" className="text-primary font-label-md text-xs hover:underline mt-2 inline-block">
                  Ir al catálogo
                </Link>
              </div>
            ) : (
              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 justify-between text-sm">
                    <div className="min-w-0">
                      <p className="font-bold text-on-surface line-clamp-1">{item.productName}</p>
                      {item.variantName && (
                        <p className="text-xs text-secondary">Talla/Medida: {item.variantName}</p>
                      )}
                      {item.customData?.petName && (
                        <p className="text-[11px] text-on-surface-variant/80 bg-primary-fixed/20 px-2 py-0.5 rounded mt-0.5 w-max">
                          Plaquita: {item.customData.petName}
                        </p>
                      )}
                      <p className="text-xs text-on-surface-variant mt-0.5">Cant: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-primary flex-shrink-0">
                      ${(item.price * item.quantity).toLocaleString("es-CL")}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Price breakdown */}
            <div className="border-t border-surface-container-high pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toLocaleString("es-CL")}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Despacho</span>
                <span className="text-xs font-semibold text-primary">A convenir / Gratis</span>
              </div>
              
              <div className="border-t border-surface-container-high pt-4 flex justify-between font-headline-sm text-base">
                <span className="text-on-surface font-bold">Total a Pagar</span>
                <span className="text-primary text-xl font-black">${subtotal.toLocaleString("es-CL")}</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-high text-xs text-on-surface-variant space-y-2 leading-relaxed">
              <p className="font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">info</span>
                ¿Cómo funciona el pago?
              </p>
              <p>
                Al hacer clic en el botón de confirmación, guardaremos tu compra en nuestra base de datos y te abriremos una conversación en **WhatsApp** con un mensaje pre-formateado.
              </p>
              <p>
                A través de esa conversación, coordinaremos la transferencia directa y acordaremos el día, hora y lugar de entrega del accesorio para tu mascota.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
