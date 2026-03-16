"use client";
import Link from "next/link";
import { useCart } from "../lib/cart-context";
import { useNotification } from "./CartNotification";
import { formatPrice } from "../lib/data";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { showNotification } = useNotification();
  const [added, setAdded] = useState(false);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    showNotification(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="aspect-[3/4] bg-[var(--color-gray-light)] overflow-hidden relative">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--color-gray)]">
            Pas d&apos;image
          </div>
        )}

        {hasDiscount && (
          <span className="absolute top-4 left-4 bg-[var(--color-gold)] text-white text-[10px] uppercase tracking-widest px-3 py-1">
            -{discountPct}%
          </span>
        )}

        {product.isNew && (
          <span className="absolute top-4 right-4 bg-[var(--color-black)] text-white text-[10px] uppercase tracking-widest px-3 py-1">
            Nouveau
          </span>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

        <button
          onClick={handleAddToCart}
          className={`absolute cursor-pointer bottom-4 left-4 right-4 py-3 text-xs uppercase tracking-widest font-medium transition-all duration-300 text-center ${
            added
              ? "bg-[var(--color-gold)] text-white translate-y-0 opacity-100"
              : "bg-[var(--color-black)] text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          {added ? "✓ Ajouté" : "+ Ajouter au panier"}
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <p className="text-[10px] text-[var(--color-gray)] uppercase tracking-[0.2em]">
          {product.category}
        </p>
        <h3 className="text-sm font-medium group-hover:text-[var(--color-gold)] transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-[var(--color-gray)] line-through text-xs">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}