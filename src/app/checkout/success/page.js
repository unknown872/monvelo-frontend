"use client";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { checkout as checkoutApi } from "../../../lib/api";
import { useAuth } from "../../../lib/auth-context";
import { useCart } from "../../../lib/cart-context";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { token } = useAuth();
  const { fetchCart } = useCart();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!orderId || !token) {
      setStatus("success");
      return;
    }

    checkoutApi.confirm(orderId, token)
      .then(() => {
        setStatus("success");
        fetchCart();
      })
      .catch(() => {
        setStatus("success");
        fetchCart();
      });
  }, [orderId, token, fetchCart]);

  if (status === "loading") {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-6 animate-pulse">⏳</span>
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">Vérification du paiement...</h1>
        <p className="text-[var(--color-gray)] mt-3">Veuillez patienter quelques instants.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <span className="text-6xl block mb-8">✓</span>
      <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Confirmation</span>
      <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-3">Merci pour votre commande !</h1>
      <p className="text-[var(--color-gray)] mt-6 leading-relaxed max-w-md mx-auto">
        Votre commande a été confirmée avec succès. Vous recevrez un email de confirmation avec les détails de suivi sous peu.
      </p>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/orders" className="px-8 py-4 border border-gray-200 text-sm uppercase tracking-widest font-medium hover:border-[var(--color-black)] transition-colors duration-300">
          Voir mes commandes
        </Link>
        <Link href="/products" className="px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300">
          Continuer mes achats
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {[
          { icon: "📦", title: "Expédition", text: "Votre commande sera expédiée sous 24-48h" },
          { icon: "📧", title: "Confirmation", text: "Un email de suivi vous sera envoyé" },
          { icon: "💬", title: "Support", text: "Notre équipe reste à votre disposition" },
        ].map((item) => (
          <div key={item.title}>
            <span className="text-2xl block mb-3">{item.icon}</span>
            <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
            <p className="text-xs text-[var(--color-gray)]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-6 animate-pulse">⏳</span>
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">Chargement...</h1>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}