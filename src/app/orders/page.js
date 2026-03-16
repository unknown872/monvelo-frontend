"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../lib/auth-context";
import { orders as ordersApi } from "../../lib/api";
import { formatPrice } from "../../lib/data";

const statusConfig = {
  PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { label: "Confirmée", color: "bg-blue-100 text-blue-800" },
  PROCESSING: { label: "En préparation", color: "bg-purple-100 text-purple-800" },
  SHIPPED: { label: "En livraison", color: "bg-indigo-100 text-indigo-800" },
  DELIVERED: { label: "Livrée", color: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Annulée", color: "bg-red-100 text-red-800" },
};

export default function OrdersPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    if (token) {
      ordersApi.list(token).then((data) => {
        setOrders(data.orders);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [token]);

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-6">🔒</span>
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">Connexion requise</h1>
        <p className="text-[var(--color-gray)] mt-3">Connectez-vous pour voir vos commandes.</p>
        <Link href="/auth" className="inline-block mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300">Se connecter</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <div className="h-4 w-24 bg-[var(--color-gray-light)] animate-pulse" />
          <div className="h-8 w-48 bg-[var(--color-gray-light)] animate-pulse mt-2" />
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-[var(--color-gray-light)] animate-pulse mb-4" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-6">📦</span>
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">Aucune commande</h1>
        <p className="text-[var(--color-gray)] mt-3">Vous n&apos;avez pas encore passé de commande.</p>
        <Link href="/products" className="inline-block mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300">Découvrir nos vélos</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Historique</span>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">Mes commandes</h1>
        <p className="text-[var(--color-gray)] mt-2 text-sm">{orders.length} commande{orders.length > 1 ? "s" : ""}</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const isExpanded = expandedOrder === order.id;
          const status = statusConfig[order.status] || statusConfig.PENDING;

          return (
            <div key={order.id} className="border border-gray-200 transition-all duration-300">
              <button
                onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                className="w-full p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left hover:bg-[var(--color-gray-light)] transition-colors duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {order.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="w-12 h-12 border-2 border-white overflow-hidden bg-[var(--color-gray-light)]" style={{ zIndex: order.items.length - i }}>
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-medium">#{order.id.slice(-8).toUpperCase()}</p>
                    <p className="text-xs text-[var(--color-gray)] mt-1">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className={`text-[10px] uppercase tracking-widest font-medium px-3 py-1.5 ${status.color}`}>{status.label}</span>
                  <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                  <span className={`text-[var(--color-gray)] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>▾</span>
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[500px]" : "max-h-0"}`}>
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="mt-5 space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-[var(--color-gray-light)] overflow-hidden flex-shrink-0">
                          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-[var(--color-gray)]">Qté : {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[var(--color-gray)]">📍 Livraison à {order.deliveryZone}</span>
                      <span>{formatPrice(order.deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}