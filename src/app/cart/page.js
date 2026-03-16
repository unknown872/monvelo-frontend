"use client";
import Link from "next/link";
import { useCart } from "../../lib/cart-context";
import { formatPrice } from "../../lib/data";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const shippingInfo = "À calculer à l'étape suivante";
  
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="text-5xl block mb-6">🛒</span>
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">
          Votre panier est vide
        </h1>
        <p className="text-[var(--color-gray)] mt-3">
          Parcourez notre catalogue et trouvez le vélo de vos rêves.
        </p>
        <Link
          href="/products"
          className="inline-block mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300"
        >
          Voir le catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">
            Votre sélection
          </span>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">
            Panier
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-sm text-[var(--color-gray)] hover:text-red-600 transition-colors duration-300"
        >
          Vider le panier
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-xs text-[var(--color-gray)] uppercase tracking-wider">
            <span className="col-span-6">Produit</span>
            <span className="col-span-2 text-center">Quantité</span>
            <span className="col-span-2 text-right">Prix</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          {items.map((item) => (
            <div
              key={item.product.slug}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-b border-gray-100 items-center"
            >
              <div className="md:col-span-6 flex gap-5">
                <Link
                  href={`/product/${item.product.slug}`}
                  className="w-24 h-24 bg-[var(--color-gray-light)] overflow-hidden flex-shrink-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em]">
                    {item.product.category}
                  </p>
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="text-sm font-medium hover:text-[var(--color-gold)] transition-colors duration-300"
                  >
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeItem(item.product.slug)}
                    className="text-xs text-[var(--color-gray)] hover:text-red-600 transition-colors duration-300 mt-2 text-left"
                  >
                    Supprimer
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-200">
                  <button
                    onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                    className="w-9 h-9 flex items-center justify-center text-sm hover:bg-[var(--color-gray-light)] transition-colors"
                  >
                    −
                  </button>
                  <span className="w-9 h-9 flex items-center justify-center text-sm font-medium border-x border-gray-200">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.product.slug,
                        Math.min(item.product.stock, item.quantity + 1)
                      )
                    }
                    className="w-9 h-9 flex items-center justify-center text-sm hover:bg-[var(--color-gray-light)] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 text-right">
                <span className="text-sm">{formatPrice(item.product.price)}</span>
                {item.product.compareAtPrice && (
                  <span className="block text-xs text-[var(--color-gray)] line-through">
                    {formatPrice(item.product.compareAtPrice)}
                  </span>
                )}
              </div>

              <div className="md:col-span-2 text-right">
                <span className="text-sm font-semibold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}

          <Link
            href="/products"
            className="inline-block mt-8 text-sm text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors duration-300"
          >
            ← Continuer mes achats
          </Link>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[var(--color-gray-light)] p-8 sticky top-24">
            <h2 className="font-['Playfair_Display'] text-xl font-semibold mb-6">
              Récapitulatif
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-gray)]">Sous-total</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-[var(--color-gray)]">Livraison</span>
                <span className="text-xs text-[var(--color-gold)]">{shippingInfo}</span>
              </div>

              <div className="border-t border-gray-300 pt-4 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold text-lg">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300 text-center"
            >
              Commander
            </Link>

            <div className="mt-6 space-y-3">
              {[
                { icon: "🔒", text: "Paiement sécurisé" },
                { icon: "🚚", text: "Livraison partout à Dakar" },
                { icon: "↩️", text: "Retours gratuits 30 jours" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <span className="text-xs text-[var(--color-gray)]">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}