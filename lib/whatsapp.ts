export function generateWhatsAppLink(
  merchantPhone: string,
  orderNumber: number,
  buyerName: string,
  buyerPhone: string,
  buyerEmail: string,
  deliveryMethod: string,
  items: any[],
  total: number
) {
  const deliveryLabel = deliveryMethod === "pickup" 
    ? "Retiro en tienda (o domicilio del vendedor)" 
    : "Punto de encuentro / Entrega a acordar";

  const itemsDetails = items.map((item) => {
    let customInfo = "";
    if (item.customData) {
      if (item.customData.petName) {
        customInfo += `  • Mascota: ${item.customData.petName}\n`;
      }
      if (item.customData.phone) {
        customInfo += `  • Fono grabado: ${item.customData.phone}\n`;
      }
      if (item.customData.additionalInfo) {
        customInfo += `  • Notas: ${item.customData.additionalInfo}\n`;
      }
    }
    return `- ${item.quantity}x ${item.productName}${item.variantName ? ` (${item.variantName})` : ""}\n${customInfo}  • Precio: $${(item.price * item.quantity).toLocaleString("es-CL")}`;
  }).join("\n\n");

  const message = `¡Hola Rinconcito Mix! 🐾
Acabo de registrar un pedido en el sitio web. Aquí tienes los detalles para coordinar:

*Pedido Nº:* ${orderNumber}
*Cliente:* ${buyerName}
*Teléfono:* ${buyerPhone}
*Email:* ${buyerEmail}
*Entrega:* ${deliveryLabel}

*Detalles del Pedido:*
${itemsDetails}

*Total a Pagar:* $${total.toLocaleString("es-CL")}

¡Quedo atento/a para realizar la transferencia y coordinar la entrega!`;

  const cleanPhone = merchantPhone.replace(/[^0-9]/g, ""); // Sólo dígitos
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
