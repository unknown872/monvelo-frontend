"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../lib/cart-context";
import { useAuth } from "../../lib/auth-context";
import { checkout as checkoutApi } from "../../lib/api";
import { formatPrice } from "../../lib/data";

const deliveryZones = [
  { name: "Plateau", fee: 1500, description: "Centre-ville, Place de l'Indépendance" },
  { name: "Médina", fee: 1500, description: "Marché Sandaga, Rue Blanchot" },
  { name: "Fann / Point E", fee: 1500, description: "Université, Fann Résidence" },
  { name: "Mermoz / Sacré-Cœur", fee: 2000, description: "VDN, Sacré-Cœur 3" },
  { name: "Ouakam", fee: 2000, description: "Mosquée Divinie, Mamelles" },
  { name: "Ngor / Almadies", fee: 2000, description: "Plage de Ngor, Almadies" },
  { name: "Yoff", fee: 2000, description: "Yoff Village, Aéroport LSS" },
  { name: "Liberté / Derklé", fee: 1500, description: "Liberté 5, Liberté 6" },
  { name: "Grand Dakar / HLM", fee: 1500, description: "HLM Grand Yoff, Castor" },
  { name: "Parcelles Assainies", fee: 2500, description: "Unités 1 à 26" },
  { name: "Guédiawaye", fee: 2500, description: "Golf, Sam Notaire, Wakhinane" },
  { name: "Pikine", fee: 2500, description: "Pikine Icotaf, Thiaroye" },
  { name: "Keur Massar", fee: 3000, description: "Keur Massar, Jaxaay" },
  { name: "Rufisque", fee: 3000, description: "Centre Rufisque, Bargny" },
  { name: "Diamniadio", fee: 3000, description: "Pôle urbain, CICAD" },
];

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { user, token } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    instructions: "",
  });

  const zone = deliveryZones.find((z) => z.name === selectedZone);
  const deliveryFee = zone ? zone.fee : 0;
  const total = subtotal + deliveryFee;

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-6">🔒</span>
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">Connexion requise</h1>
        <p className="text-[var(--color-gray)] mt-3">Connectez-vous pour finaliser votre commande.</p>
        <Link href="/auth" className="inline-block mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300">Se connecter</Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-6">🛒</span>
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">Votre panier est vide</h1>
        <p className="text-[var(--color-gray)] mt-3">Ajoutez des articles avant de passer commande.</p>
        <Link href="/products" className="inline-block mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300">Voir le catalogue</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedZone) {
      setError("Veuillez sélectionner un lieu de livraison");
      return;
    }
    if (!form.address) {
      setError("Veuillez entrer votre adresse précise");
      return;
    }

    setProcessing(true);
    setError("");

    try {
      const data = await checkoutApi.create(
        {
          deliveryZone: selectedZone,
          deliveryFee,
          deliveryAddress: form.address,
          instructions: form.instructions,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
        },
        token
      );

      // Rediriger vers PayTech
      window.location.href = data.paymentUrl;
    } catch (err) {
      setError(err.message || "Erreur lors de la commande");
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Finaliser</span>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">Commande</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            {/* Contact */}
            <section>
              <h2 className="font-['Playfair_Display'] text-xl font-semibold mb-6">Vos informations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Prénom</label>
                  <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Nom</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Téléphone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                </div>
              </div>
            </section>

            {/* Livraison */}
            <section>
              <h2 className="font-['Playfair_Display'] text-xl font-semibold mb-6">Lieu de livraison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {deliveryZones.map((z) => (
                  <button key={z.name} type="button" onClick={() => setSelectedZone(z.name)} className={`text-left p-4 border transition-all duration-300 ${selectedZone === z.name ? "border-[var(--color-black)] bg-[var(--color-gray-light)]" : "border-gray-200 hover:border-[var(--color-gray)]"}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{z.name}</p>
                        <p className="text-xs text-[var(--color-gray)] mt-1">{z.description}</p>
                      </div>
                      <span className={`text-sm font-semibold whitespace-nowrap ml-4 ${selectedZone === z.name ? "text-[var(--color-gold)]" : ""}`}>{formatPrice(z.fee)}</span>
                    </div>
                    {selectedZone === z.name && <div className="w-full h-0.5 bg-[var(--color-gold)] mt-3" />}
                  </button>
                ))}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Adresse précise</label>
                  <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Numéro, rue, bâtiment..." required className="w-full px-4 py-3 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Instructions (optionnel)</label>
                  <textarea name="instructions" value={form.instructions} onChange={handleChange} placeholder="Point de repère, code porte, étage..." rows={3} className="w-full px-4 py-3 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-black)] transition-colors resize-none" />
                </div>
              </div>
            </section>

            {/* Paiement */}
            <section>
              <h2 className="font-['Playfair_Display'] text-xl font-semibold mb-6">Paiement</h2>
              <div className="border border-gray-200 p-6 bg-[var(--color-gray-light)]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg">🔒</span>
                  <span className="text-sm font-medium">Paiement sécurisé par PayTech</span>
                </div>
                <p className="text-xs text-[var(--color-gray)] leading-relaxed">
                  Vous serez redirigé vers PayTech pour payer par Orange Money, Wave ou carte bancaire. Vos données sont protégées.
                </p>
              </div>
            </section>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--color-gray-light)] p-8 sticky top-24">
              <h2 className="font-['Playfair_Display'] text-xl font-semibold mb-6">Récapitulatif</h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-white overflow-hidden flex-shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-[var(--color-gray)]">Qté : {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray)]">Sous-total</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-gray)]">Livraison</span>
                  {zone ? (
                    <span className="font-medium">{formatPrice(zone.fee)}</span>
                  ) : (
                    <span className="text-xs text-[var(--color-gold)]">Sélectionnez une zone</span>
                  )}
                </div>
                {zone && (
                  <div className="text-xs text-[var(--color-gray)]">📍 Livraison à {zone.name}</div>
                )}
                <div className="border-t border-gray-300 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <button type="submit" disabled={processing || !selectedZone} className="block w-full mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300 text-center disabled:opacity-50 disabled:cursor-not-allowed">
                {processing ? "Redirection vers PayTech..." : !selectedZone ? "Sélectionnez une zone" : "Payer — " + formatPrice(total)}
              </button>

              <Link href="/cart" className="block text-center mt-4 text-xs text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors">← Retour au panier</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}