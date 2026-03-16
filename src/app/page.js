"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { products as productsApi } from "../lib/api";
import { formatPrice } from "../lib/data";
import VTT from "../assets/images/VTT.jpg"

export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    productsApi.list({ isNew: "true", limit: 4 }).then((data) => {
      setNewArrivals(data.products);
    });
    productsApi.list({ sort: "price-desc", limit: 4 }).then((data) => {
      setBestSellers(data.products);
    });
    productsApi.categories().then((data) => {
      setCategories(data.categories);
    });
  }, []);

  const categoryImages = {
    Route: "/images/route.jpg",
    VTT: "/images/VTT.jpg",
    Urbain: "https://images.unsplash.com/photo-1505705694340-019e0d8a2e5c?w=800",
    Gravel: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
    Électrique : "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800",
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=1600')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <span className="inline-block text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] mb-6">
            Collection 2025
          </span>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.05] max-w-3xl">
            L&apos;art du
            <br />
            cyclisme
          </h1>
          <p className="mt-6 text-gray-300 max-w-md text-lg leading-relaxed">
            Des vélos d&apos;exception, conçus pour ceux qui ne font aucun compromis sur la performance et l&apos;élégance.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/products" className="px-8 py-4 bg-white text-[var(--color-black)] text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] hover:text-white transition-colors duration-300">
              Découvrir
            </Link>
            <Link href="/products" className="px-8 py-4 border border-white/40 text-white text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-[var(--color-black)] transition-colors duration-300">
              Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { title: "Fabrication artisanale", description: "Chaque vélo est assemblé à la main par nos maîtres artisans avec une attention méticuleuse aux détails." },
            { title: "Matériaux premium", description: "Carbone haute performance, titane aérospatial et composants sélectionnés pour leur excellence." },
            { title: "Garantie à vie", description: "Nous croyons en la durabilité de nos créations. Chaque cadre est garanti à vie." },
          ].map((item) => (
            <div key={item.title} className="px-6">
              <div className="w-12 h-0.5 bg-[var(--color-gold)] mx-auto mb-6" />
              <h3 className="font-['Playfair_Display'] text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-[var(--color-gray)] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nouveautés */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Fraîchement arrivés</span>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">Nouveautés</h2>
          </div>
          <Link href="/products" className="hidden md:block text-sm uppercase tracking-wider text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors duration-300">
            Tout voir →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/products" className="text-sm uppercase tracking-wider text-[var(--color-gray)] hover:text-[var(--color-black)]">Tout voir →</Link>
        </div>
      </section>

      {/* Bannière centrale */}
      <section className="relative h-[50vh] flex items-center overflow-hidden my-16">
        <div className="absolute inset-0 bg-[url('/images/banner.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full text-center">
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Édition limitée</span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-semibold text-white mt-4 max-w-2xl mx-auto leading-tight">Repoussez vos limites</h2>
          <Link href="/products" className="inline-block mt-8 px-8 py-4 border border-white/40 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-[var(--color-black)] transition-colors duration-300">Découvrir</Link>
        </div>
      </section>

      {/* Catégories */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Explorer</span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">Nos catégories</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((cat) => (
            <Link key={cat} href={`/products?category=${cat}`} className="group relative h-80 overflow-hidden">
              <img src={categoryImages[cat] || categoryImages["Route"]} alt={cat} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="font-['Playfair_Display'] text-2xl font-semibold">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best-sellers */}
      <section className="bg-[var(--color-gray-light)]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Les plus populaires</span>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold mt-2">Best-sellers</h2>
            </div>
            <Link href="/products" className="hidden md:block text-sm uppercase tracking-wider text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors duration-300">Tout voir →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau de confiance */}
      <section className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "150+", label: "Modèles disponibles" },
            { value: "+1k", label: "Clients satisfaits" },
            { value: "98%", label: "Taux de satisfaction" },
            { value: "24h", label: "Expédition rapide" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-['Playfair_Display'] text-3xl font-semibold">{stat.value}</p>
              <p className="text-xs text-[var(--color-gray)] uppercase tracking-wider mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[var(--color-black)]">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Restez informé</span>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-semibold text-white mt-3">Rejoignez le club</h2>
          <p className="text-gray-400 mt-4 max-w-md mx-auto text-sm leading-relaxed">Recevez en avant-première nos nouveautés, offres exclusives et conseils d&apos;experts.</p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Votre adresse email" className="flex-1 px-5 py-4 bg-white/10 border border-white/20 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors" />
            <button type="submit" className="px-8 py-4 bg-[var(--color-gold)] text-white text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-[var(--color-black)] transition-colors duration-300">S&apos;inscrire</button>
          </form>
        </div>
      </section>
    </div>
  );
}