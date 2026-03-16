"use client";
import { useState } from "react";
import Link from "next/link";
import { formatPrice } from "../../../lib/data";

const mockOrders = [
  { id: "CMD-2025-005", customer: "Amadou Diallo", email: "amadou@email.com", phone: "+221 77 123 45 67", date: "2025-02-28", status: "processing", zone: "Mermoz / Sacré-Cœur", deliveryFee: 2000, items: [{ name: "Vélo Carbon Pro", quantity: 1, price: 1640000 }], total: 1642000 },
  { id: "CMD-2025-004", customer: "Fatou Sall", email: "fatou@email.com", phone: "+221 78 234 56 78", date: "2025-02-27", status: "shipped", zone: "Plateau", deliveryFee: 1500, items: [{ name: "Urban Glide", quantity: 1, price: 590000 }, { name: "City Comfort+", quantity: 1, price: 492000 }], total: 1083500 },
  { id: "CMD-2025-003", customer: "Moussa Ndiaye", email: "moussa@email.com", phone: "+221 76 345 67 89", date: "2025-02-26", status: "delivered", zone: "Parcelles Assainies", deliveryFee: 2500, items: [{ name: "VTT Enduro X", quantity: 1, price: 1245000 }], total: 1247500 },
  { id: "CMD-2025-002", customer: "Aïssatou Ba", email: "aissatou@email.com", phone: "+221 77 456 78 90", date: "2025-02-25", status: "delivered", zone: "Fann / Point E", deliveryFee: 1500, items: [{ name: "Urban Glide", quantity: 1, price: 590000 }], total: 591500 },
  { id: "CMD-2025-001", customer: "Ibrahima Fall", email: "ibrahima@email.com", phone: "+221 78 567 89 01", date: "2025-02-24", status: "cancelled", zone: "Almadies", deliveryFee: 2000, items: [{ name: "Speedster Aero", quantity: 1, price: 1902000 }], total: 1904000 },
];

const statusConfig = {
  pending: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmée", color: "bg-blue-100 text-blue-800" },
  processing: { label: "En préparation", color: "bg-purple-100 text-purple-800" },
  shipped: { label: "En livraison", color: "bg-indigo-100 text-indigo-800" },
  delivered: { label: "Livrée", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Annulée", color: "bg-red-100 text-red-800" },
};

const statusFlow = ["pending", "confirmed", "processing", "shipped", "delivered"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filtered = filterStatus
    ? orders.filter((o) => o.status === filterStatus)
    : orders;

  const updateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link
        href="/admin"
        className="inline-block text-xs text-[var(--color-gray)] hover:text-[var(--color-black)] uppercase tracking-wider mb-6 transition-colors"
      >
        ← Retour au dashboard
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">
            Administration
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold mt-2">
            Commandes
          </h1>
          <p className="text-sm text-[var(--color-gray)] mt-1">{orders.length} commandes</p>
        </div>

        {/* Filtre par statut */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setFilterStatus("")}
            className={`px-4 py-2 text-[10px] uppercase tracking-widest font-medium transition-colors duration-300 ${
              !filterStatus
                ? "bg-[var(--color-black)] text-white"
                : "border border-gray-200 text-[var(--color-gray)] hover:border-[var(--color-black)]"
            }`}
          >
            Toutes
          </button>
          {Object.entries(statusConfig).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                filterStatus === key
                  ? "bg-[var(--color-black)] text-white"
                  : "border border-gray-200 text-[var(--color-gray)] hover:border-[var(--color-black)]"
              }`}
            >
              {val.label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des commandes */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[var(--color-gray)]">Aucune commande trouvée</p>
          </div>
        ) : (
          filtered.map((order) => {
            const isExpanded = expandedOrder === order.id;
            const status = statusConfig[order.status];

            return (
              <div key={order.id} className="border border-gray-200">
                {/* Ligne principale */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left hover:bg-[var(--color-gray-light)] transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-medium">{order.id}</p>
                      <span className={`text-[9px] uppercase tracking-widest font-medium px-2 py-1 ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--color-gray)] mt-1">
                      {order.customer} · {new Date(order.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                    <span className={`text-[var(--color-gray)] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                      ▾
                    </span>
                  </div>
                </button>

                {/* Détails */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[600px]" : "max-h-0"}`}>
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="grid md:grid-cols-2 gap-8 mt-5">
                      {/* Infos client */}
                      <div>
                        <h3 className="text-xs text-[var(--color-gray)] uppercase tracking-wider mb-3">Client</h3>
                        <div className="space-y-2 text-sm">
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-[var(--color-gray)]">{order.email}</p>
                          <p className="text-[var(--color-gray)]">{order.phone}</p>
                          <p className="text-[var(--color-gray)]">📍 {order.zone}</p>
                        </div>
                      </div>

                      {/* Articles */}
                      <div>
                        <h3 className="text-xs text-[var(--color-gray)] uppercase tracking-wider mb-3">Articles</h3>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span>{item.name} × {item.quantity}</span>
                              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between text-sm text-[var(--color-gray)] pt-2 border-t border-gray-100">
                            <span>Livraison ({order.zone})</span>
                            <span>{formatPrice(order.deliveryFee)}</span>
                          </div>
                          <div className="flex justify-between text-sm font-semibold pt-2 border-t border-gray-100">
                            <span>Total</span>
                            <span>{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions de statut */}
                    {order.status !== "cancelled" && order.status !== "delivered" && (
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <h3 className="text-xs text-[var(--color-gray)] uppercase tracking-wider mb-3">
                          Mettre à jour le statut
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {statusFlow.map((s) => {
                            const config = statusConfig[s];
                            const isCurrent = order.status === s;
                            return (
                              <button
                                key={s}
                                onClick={() => updateStatus(order.id, s)}
                                disabled={isCurrent}
                                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                                  isCurrent
                                    ? "bg-[var(--color-black)] text-white cursor-default"
                                    : "border border-gray-200 text-[var(--color-gray)] hover:border-[var(--color-black)] hover:text-[var(--color-black)]"
                                }`}
                              >
                                {config.label}
                              </button>
                            );
                          })}
                          <button
                            onClick={() => updateStatus(order.id, "cancelled")}
                            className="px-4 py-2 text-[10px] uppercase tracking-widest font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-colors duration-300"
                          >
                            Annuler
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}