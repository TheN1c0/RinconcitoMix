import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Consultas paralelas a la base de datos
  const [
    totalProducts,
    lowStockProducts,
    totalOrders,
    pendingOrders,
    recentOrders
  ] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { stock: { lte: 5 } } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "AWAITING_WHATSAPP_CONFIRMATION" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    })
  ]);

  // Calcular la suma total estimada de pedidos confirmados
  const ordersSum = await prisma.order.aggregate({
    _sum: {
      total: true
    },
    where: {
      status: {
        notIn: ["CANCELLED"]
      }
    }
  });

  const totalSalesAmount = ordersSum._sum.total ? Number(ordersSum._sum.total) : 0;

  const stats = [
    {
      name: "Ventas Totales (Est.)",
      value: `$${totalSalesAmount.toLocaleString("es-CL")}`,
      icon: "attach_money",
      color: "text-green-600 bg-green-50 border-green-100",
    },
    {
      name: "Pedidos Registrados",
      value: totalOrders,
      icon: "shopping_bag",
      color: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      name: "Pedidos por WhatsApp",
      value: pendingOrders,
      icon: "chat",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    {
      name: "Stock Bajo (<= 5)",
      value: lowStockProducts,
      icon: "warning",
      color: lowStockProducts > 0 ? "text-red-600 bg-red-50 border-red-100 animate-pulse" : "text-stone-600 bg-stone-50 border-stone-100",
    },
  ];

  return (
    <div className="space-y-8 font-['Plus_Jakarta_Sans']">
      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-3xl p-6 border border-stone-100 shadow-[0_4px_20px_rgb(7,69,115,0.02)] flex items-center justify-between"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">{stat.name}</span>
              <p className="text-2xl font-black text-primary">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${stat.color}`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Orders */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-stone-100 shadow-[0_4px_20px_rgb(7,69,115,0.02)]">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-6">
            <h3 className="font-headline-sm text-sm font-bold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">receipt_long</span>
              Pedidos Recientes
            </h3>
            <span className="text-xs font-semibold text-outline">Últimas 5 compras</span>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-4xl text-outline mb-2">shopping_bag_off</span>
              <p className="text-sm font-semibold text-on-surface-variant">Aún no hay pedidos en la tienda</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-outline uppercase text-[10px] font-bold tracking-wider border-b border-stone-100">
                    <th className="pb-3">Nº Orden</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Fecha</th>
                    <th className="pb-3">Total</th>
                    <th className="pb-3">Estado</th>
                    <th className="pb-3 text-right">Contacto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="text-on-surface font-medium hover:bg-stone-50/50 transition-colors">
                      <td className="py-4">#{order.orderNumber}</td>
                      <td className="py-4 font-bold">{order.buyerName}</td>
                      <td className="py-4 text-xs text-outline">
                        {new Date(order.createdAt).toLocaleDateString("es-CL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </td>
                      <td className="py-4 font-bold text-primary">
                        ${Number(order.total).toLocaleString("es-CL")}
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          order.status === "AWAITING_WHATSAPP_CONFIRMATION"
                            ? "bg-amber-100 text-amber-800"
                            : order.status === "PAID"
                            ? "bg-green-100 text-green-800"
                            : "bg-stone-100 text-stone-800"
                        }`}>
                          {order.status === "AWAITING_WHATSAPP_CONFIRMATION" 
                            ? "Por WhatsApp" 
                            : order.status === "PAID" 
                            ? "Pagado" 
                            : order.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {order.buyerPhone && (
                          <a 
                            href={`https://wa.me/${order.buyerPhone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
                          >
                            <span className="material-symbols-outlined text-[14px]">chat</span>
                            WhatsApp
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
