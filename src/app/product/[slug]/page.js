"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { products as productsApi } from "../../../lib/api";
import { formatPrice } from "../../../lib/data";
import { useCart } from "../../../lib/cart-context";
import { useNotification } from "../../../components/CartNotification";

export default function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    productsApi.get(slug).then((data) => {
      setProduct(data.product);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-[var(--color-gray-light)]" />
          <div className="space-y-4">
            <div className="h-4 w-24 bg-[var(--color-gray-light)]" />
            <div className="h-8 w-64 bg-[var(--color-gray-light)]" />
            <div className="h-6 w-32 bg-[var(--color-gray-light)]" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="font-['Playfair_Display'] text-3xl font-semibold">Produit non trouvé</h1>
        <p className="text-[var(--color-gray)] mt-3">Ce vélo n&apos;existe pas ou a été retiré du catalogue.</p>
        <Link href="/products" className="inline-block mt-8 px-8 py-4 bg-[var(--color-black)] text-white text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300">Retour au catalogue</Link>
      </div>
    );
  }

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const specs = typeof product.specs === "string" ? JSON.parse(product.specs) : product.specs;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 text-xs text-[var(--color-gray)] uppercase tracking-wider mb-10">
        <Link href="/" className="hover:text-[var(--color-black)] transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[var(--color-black)] transition-colors">Catalogue</Link>
        <span>/</span>
        <span className="text-[var(--color-black)]">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <div className="relative aspect-square bg-[var(--color-gray-light)] overflow-hidden">
            <img src={product.images[selectedImage]} alt={`${product.name} - Image ${selectedImage + 1}`} className="w-full h-full object-cover" />
            {product.isNew && (
              <span className="absolute top-6 right-6 bg-[var(--color-black)] text-white text-[10px] uppercase tracking-widest px-4 py-2">Nouveau</span>
            )}
            {hasDiscount && (
              <span className="absolute top-6 left-6 bg-[var(--color-gold)] text-white text-[10px] uppercase tracking-widest px-4 py-2">-{Math.round((1 - product.price / product.compareAtPrice) * 100)}%</span>
            )}
            {product.images.length > 1 && (
              <>
                <button onClick={() => setSelectedImage(selectedImage === 0 ? product.images.length - 1 : selectedImage - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors duration-300">‹</button>
                <button onClick={() => setSelectedImage(selectedImage === product.images.length - 1 ? 0 : selectedImage + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex items-center justify-center transition-colors duration-300">›</button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-4">
              {product.images.map((img, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`w-20 h-20 overflow-hidden border-2 transition-colors duration-300 ${selectedImage === index ? "border-[var(--color-black)]" : "border-transparent hover:border-[var(--color-gray)]"}`}>
                  <img src={img} alt={`Miniature ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.3em]">{product.category}</span>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">{product.name}</h1>

          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-lg text-[var(--color-gray)] line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>

          <p className="text-[var(--color-gray)] leading-relaxed mt-6">{product.description}</p>

          <div className="mt-6">
            {product.stock > 5 ? (
              <span className="text-sm text-green-700 font-medium">✓ En stock</span>
            ) : product.stock > 0 ? (
              <span className="text-sm text-[var(--color-gold)] font-medium">⚡ Plus que {product.stock} en stock</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Rupture de stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-200">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-lg hover:bg-[var(--color-gray-light)] transition-colors">−</button>
                <span className="w-12 h-12 flex items-center justify-center text-sm font-medium border-x border-gray-200">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-12 h-12 flex items-center justify-center text-lg hover:bg-[var(--color-gray-light)] transition-colors">+</button>
              </div>
              <button onClick={() => { addItem(product, quantity); showNotification(product); }} className="flex-1 px-8 py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300">
                Ajouter au panier
              </button>
            </div>
          )}

          <div className="mt-10 pt-8 border-t border-gray-200 space-y-4">
            {[
              { icon: "🚚", text: "Livraison partout à Dakar" },
              { icon: "↩️", text: "Retours gratuits sous 30 jours" },
              { icon: "🔒", text: "Paiement sécurisé par PayTech" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm text-[var(--color-gray)]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {specs && Array.isArray(specs) && specs.length > 0 && (
        <section className="mt-20">
          <div className="w-12 h-0.5 bg-[var(--color-gold)] mb-6" />
          <h2 className="font-['Playfair_Display'] text-2xl font-semibold mb-8">Spécifications techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-1">
            {specs.map((spec) => (
              <div key={spec.label} className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-sm text-[var(--color-gray)]">{spec.label}</span>
                <span className="text-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}