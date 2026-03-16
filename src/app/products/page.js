"use client";
import { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { products as productsApi } from "../../lib/api";

const sortOptions = [
  { value: "newest", label: "Plus récents" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "name", label: "Nom A-Z" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tous");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    productsApi.categories().then((data) => {
      setCategories(["Tous", ...data.categories]);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = { sort, limit: 20 };
    if (search) params.search = search;
    if (category !== "Tous") params.category = category;

    productsApi.list(params).then((data) => {
      setProducts(data.products);
      setLoading(false);
    });
  }, [search, category, sort]);

  return (
    <div>
      <section className="relative h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/o_banner.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Explorer</span>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-white mt-2">Notre catalogue</h1>
          <p className="text-gray-300 mt-4 max-w-lg">Découvrez notre sélection complète de vélos d&apos;exception, conçus pour tous les styles de conduite.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-6 mb-12 pb-8 border-b border-gray-200">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Rechercher un vélo..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 bg-white text-sm placeholder:text-[var(--color-gray)] focus:outline-none focus:border-[var(--color-black)] transition-colors" />
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-4 py-3 border border-gray-200 bg-white text-sm text-[var(--color-gray)] focus:outline-none focus:border-[var(--color-black)] transition-colors cursor-pointer">
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-5 cursor-pointer py-2.5 text-xs uppercase tracking-widest font-medium transition-colors duration-300 ${category === cat ? "bg-[var(--color-black)] text-white" : "border border-gray-200 text-[var(--color-gray)] hover:border-[var(--color-black)] hover:text-[var(--color-black)]"}`}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-[var(--color-gray)] uppercase tracking-wider mb-8">
          {products.length} résultat{products.length > 1 ? "s" : ""}
        </p>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-[var(--color-gray-light)]" />
                <div className="mt-4 h-3 bg-[var(--color-gray-light)] w-1/3" />
                <div className="mt-2 h-4 bg-[var(--color-gray-light)] w-2/3" />
                <div className="mt-2 h-4 bg-[var(--color-gray-light)] w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-['Playfair_Display'] text-xl text-[var(--color-gray)]">Aucun vélo trouvé</p>
            <p className="text-sm text-[var(--color-gray)] mt-2">Essayez de modifier vos filtres</p>
            <button onClick={() => { setSearch(""); setCategory("Tous"); }} className="mt-6 px-6 py-3 bg-[var(--color-black)] text-white text-xs uppercase tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300">Réinitialiser</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}