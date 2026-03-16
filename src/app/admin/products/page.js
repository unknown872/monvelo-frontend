"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../lib/auth-context";
import { admin as adminApi } from "../../../lib/api";
import { formatPrice } from "../../../lib/data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminProductsPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [form, setForm] = useState({
    name: "", price: "", compareAtPrice: "", category: "", stock: "", description: "", isNew: false,
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "ADMIN")) {
      router.push("/");
      return;
    }
    if (token) fetchProducts();
  }, [user, token, authLoading]);

  const fetchProducts = (searchQuery) => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    adminApi.products.list(params, token).then((data) => {
      setProducts(data.products);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (token) {
      const timer = setTimeout(() => fetchProducts(search), 300);
      return () => clearTimeout(timer);
    }
  }, [search, token]);

  const resetForm = () => {
    setForm({ name: "", price: "", compareAtPrice: "", category: "", stock: "", description: "", isNew: false });
    setEditingId(null);
    setImageUrls([]);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      compareAtPrice: product.compareAtPrice?.toString() || "",
      category: product.category,
      stock: product.stock.toString(),
      description: product.description,
      isNew: product.isNew,
    });
    setImageUrls(product.images || []);
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      await adminApi.products.delete(id, token);
      fetchProducts(search);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImageUrls((prev) => [...prev, ...data.urls]);
      } else {
        alert(data.error || "Erreur lors de l'upload");
      }
    } catch (err) {
      alert("Erreur lors de l'upload");
    }
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
        category: form.category,
        stock: Number(form.stock),
        isNew: form.isNew,
        images: imageUrls,
      };

      if (editingId) {
        await adminApi.products.update(editingId, body, token);
      } else {
        await adminApi.products.create(body, token);
      }
      resetForm();
      fetchProducts(search);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/admin" className="inline-block text-xs text-[var(--color-gray)] hover:text-[var(--color-black)] uppercase tracking-wider mb-6 transition-colors">← Retour au dashboard</Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">Administration</span>
          <h1 className="font-['Playfair_Display'] text-3xl font-semibold mt-2">Produits</h1>
          <p className="text-sm text-[var(--color-gray)] mt-1">{products.length} produits</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="mt-4 md:mt-0 px-6 py-3 bg-[var(--color-black)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300">
          + Ajouter un produit
        </button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <form onSubmit={handleSubmit} className="border border-gray-200 p-8 mb-10">
          <h2 className="font-['Playfair_Display'] text-xl font-semibold mb-6">{editingId ? "Modifier le produit" : "Nouveau produit"}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Nom</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Catégorie</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors bg-white cursor-pointer">
                <option value="">Sélectionner</option>
                <option value="Route">Route</option>
                <option value="VTT">VTT</option>
                <option value="Urbain">Urbain</option>
                <option value="Gravel">Gravel</option>
                <option value="Électrique">Électrique</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Prix (FCFA)</label>
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Ancien prix (FCFA)</label>
              <input type="number" value={form.compareAtPrice} onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })} className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
            </div>
            <div>
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Stock</label>
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="w-4 h-4" />
                Marquer comme nouveau
              </label>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors resize-none" />
            </div>
          </div>

          {/* Upload d'images */}
          <div className="mt-6">
            <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-3">Images du produit</label>
            
            {/* Images existantes */}
            {imageUrls.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <div className="w-24 h-24 border border-gray-200 overflow-hidden">
                      <img src={url} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-0 left-0 right-0 bg-[var(--color-gold)] text-white text-[8px] text-center uppercase tracking-wider py-0.5">
                        Principale
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Bouton upload */}
            <label className={`inline-flex items-center gap-2 px-5 py-3 border border-dashed border-gray-300 cursor-pointer hover:border-[var(--color-black)] transition-colors ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
              <span className="text-lg">{uploading ? "⏳" : "📷"}</span>
              <span className="text-xs uppercase tracking-widest font-medium text-[var(--color-gray)]">
                {uploading ? "Upload en cours..." : "Ajouter des images"}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            <p className="text-[10px] text-[var(--color-gray)] mt-2">
              Max 5 images, 5MB chacune. La première image sera l&apos;image principale.
            </p>
          </div>

          <div className="flex gap-3 mt-8">
            <button type="submit" className="px-6 py-3 bg-[var(--color-black)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300">
              {editingId ? "Mettre à jour" : "Créer le produit"}
            </button>
            <button type="button" onClick={resetForm} className="px-6 py-3 border border-gray-200 text-xs uppercase tracking-widest font-medium hover:border-[var(--color-black)] transition-colors duration-300">Annuler</button>
          </div>
        </form>
      )}

      {/* Recherche */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Rechercher un produit..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-black)] transition-colors" />
        </div>
      </div>

      {/* Tableau */}
      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-[var(--color-gray-light)]" />)}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200 text-left">
                <th className="pb-4 font-medium text-xs text-[var(--color-gray)] uppercase tracking-wider">Produit</th>
                <th className="pb-4 font-medium text-xs text-[var(--color-gray)] uppercase tracking-wider">Catégorie</th>
                <th className="pb-4 font-medium text-xs text-[var(--color-gray)] uppercase tracking-wider">Prix</th>
                <th className="pb-4 font-medium text-xs text-[var(--color-gray)] uppercase tracking-wider">Stock</th>
                <th className="pb-4 font-medium text-xs text-[var(--color-gray)] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-[var(--color-gray-light)] transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[var(--color-gray-light)] overflow-hidden flex-shrink-0">
                        {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        {product.isNew && <span className="text-[9px] uppercase tracking-widest text-[var(--color-gold)] font-medium">Nouveau</span>}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-[var(--color-gray)]">{product.category}</td>
                  <td className="py-4 font-medium">{formatPrice(product.price)}</td>
                  <td className="py-4">
                    <span className={`text-sm font-medium ${product.stock === 0 ? "text-red-600" : product.stock <= 5 ? "text-[var(--color-gold)]" : "text-green-700"}`}>{product.stock}</span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleEdit(product)} className="px-3 py-1.5 text-xs border border-gray-200 hover:border-[var(--color-black)] transition-colors">Modifier</button>
                      <button onClick={() => handleDelete(product.id)} className="px-3 py-1.5 text-xs text-red-600 border border-red-200 hover:bg-red-50 transition-colors">Supprimer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}