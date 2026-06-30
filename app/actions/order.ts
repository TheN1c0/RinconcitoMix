"use server";

import { prisma } from "@/lib/prisma";
import { generateWhatsAppLink } from "@/lib/whatsapp";

interface CreateOrderInput {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  deliveryMethod: "pickup" | "acordar";
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    variantId?: string;
    variantName?: string;
    customData?: {
      petName?: string;
      phone?: string;
      additionalInfo?: string;
    };
  }[];
}

export async function createOrder(data: CreateOrderInput) {
  try {
    // 1. Obtener la configuración de la tienda para el número de WhatsApp
    const settings = await prisma.storeSettings.findUnique({
      where: { id: "main" },
    });
    
    // Si no está configurado en BD, usar número por defecto
    const merchantPhone = settings?.whatsapp || "+56912345678";

    // 2. Calcular montos
    const total = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const ivaRate = 0.19; // IVA en Chile es 19%
    const subtotal = total;
    const netAmount = subtotal / (1 + ivaRate);
    const iva = subtotal - netAmount;

    // 3. Crear la dirección de despacho simulada para cumplir con el esquema JSON de la base de datos
    const shippingAddress = {
      street: data.deliveryMethod === "pickup" ? "Retiro en persona" : "Punto de encuentro a acordar",
      city: "Santiago",
      state: "Región Metropolitana",
      zip: "99999"
    };

    // 4. Crear el registro del pedido en la base de datos
    const order = await prisma.order.create({
      data: {
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
        buyerPhone: data.buyerPhone,
        shippingAddress,
        status: "AWAITING_WHATSAPP_CONFIRMATION",
        paymentMethod: "whatsapp_mvp",
        netAmount: Number(netAmount.toFixed(2)),
        iva: Number(iva.toFixed(2)),
        subtotal: total,
        shipping: 0,
        total: total,
        items: {
          create: data.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId || null,
            quantity: item.quantity,
            unitPrice: item.price,
            variantName: item.variantName || null,
            customData: item.customData || null,
          })),
        },
      },
    });

    // 5. Generar el enlace de redirección a WhatsApp
    const whatsappUrl = generateWhatsAppLink(
      merchantPhone,
      order.orderNumber,
      data.buyerName,
      data.buyerPhone,
      data.buyerEmail,
      data.deliveryMethod,
      data.items,
      total
    );

    return {
      success: true,
      whatsappUrl,
      orderId: order.id,
      orderNumber: order.orderNumber,
    };
  } catch (error: any) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: error?.message || "Ocurrió un error al procesar el pedido.",
    };
  }
}
