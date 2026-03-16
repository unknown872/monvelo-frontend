"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../lib/auth-context";
import { admin as adminApi } from "../../lib/api";
import { formatPrice } from "../../lib/data";

export default function AdminDashboard() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/");
      return;
    }
    if (token && user?.role === "ADMIN") {
      adminApi.stats(token).then(setStats);
    }
  }, [user, token, authLoading, router]);

  if (authLoading || !stats) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 animate-pulse">
        <div className="h-8 w-48 bg-[var(--color-gray-light)] mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-28 bg-[var(--color-gray-light)]" />)}
        </div>
      </div>
    );
  }

  const cards = [
    { label: "Chiffre d'affaires", value: formatPrice(stats.totalRevenue), icon: "💰", bg: "bg-green-50" },
    { label: "Commandes", value: stats.totalOrders, icon: "📦", bg: "bg-blue-50" },
    { label: "Produits", value: stats.totalProducts, icon: "🚲", bg: "bg-purple-50" },
    { label: "Clients", value: stats.totalCustomers, icon: "👥", bg: "bg-orange-50" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Administration</span>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">Dashboard</h1>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Link href="/admin/products" className="px-6 py-3 bg-[var(--color-black)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300">Gérer les produits</Link>
          <Link href="/admin/orders" className="px-6 py-3 border border-gray-200 text-xs uppercase tracking-widest font-medium hover:border-[var(--color-black)] transition-colors duration-300">Gérer les commandes</Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {cards.map((card) => (
          <div key={card.label} className="border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`w-10 h-10 ${card.bg} flex items-center justify-center text-lg`}>{card.icon}</span>
            </div>
            <p className="text-xs text-[var(--color-gray)] uppercase tracking-wider">{card.label}</p>
            <p className="font-['Playfair_Display'] text-2xl font-semibold mt-1">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}