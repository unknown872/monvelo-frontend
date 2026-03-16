"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../lib/auth-context";

export default function AuthPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (!isLogin && form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.firstName, form.lastName, form.email, form.phone, form.password);
      }
      router.push("/");
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    }

    setLoading(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-[80vh] flex">
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-end p-16">
          <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em] mb-4">
            Mon Vélo
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl font-semibold text-white leading-tight max-w-md">
            {isLogin ? "Heureux de vous revoir." : "Rejoignez l'aventure."}
          </h2>
          <p className="text-gray-300 mt-4 max-w-sm text-sm leading-relaxed">
            {isLogin
              ? "Connectez-vous pour accéder à votre espace personnel, vos commandes et votre panier."
              : "Créez votre compte et profitez d'une expérience d'achat sur mesure."}
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <span className="text-[var(--color-gold)] text-xs uppercase tracking-[0.3em]">
              {isLogin ? "Connexion" : "Inscription"}
            </span>
            <h1 className="font-['Playfair_Display'] text-3xl font-semibold mt-2">
              {isLogin ? "Se connecter" : "Créer un compte"}
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Prénom</label>
                    <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Nom</label>
                    <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Téléphone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="77 123 45 67" required className="w-full px-4 py-3 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-black)] transition-colors" />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="vous@exemple.com" required className="w-full px-4 py-3 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-black)] transition-colors" />
            </div>

            <div>
              <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Mot de passe</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder={isLogin ? "Votre mot de passe" : "Minimum 6 caractères"} required className="w-full px-4 py-3 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-black)] transition-colors" />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs text-[var(--color-gray)] uppercase tracking-wider mb-2">Confirmer le mot de passe</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Retapez votre mot de passe" required className="w-full px-4 py-3 border border-gray-200 text-sm placeholder:text-gray-400 focus:outline-none focus:border-[var(--color-black)] transition-colors" />
              </div>
            )}

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-xs text-[var(--color-gray)] hover:text-[var(--color-gold)] transition-colors">
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-4 bg-[var(--color-black)] text-white text-sm uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Chargement..." : isLogin ? "Se connecter" : "Créer mon compte"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-[var(--color-gray)] uppercase tracking-wider">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-sm text-center text-[var(--color-gray)]">
            {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}{" "}
            <button onClick={switchMode} className="text-[var(--color-black)] font-medium hover:text-[var(--color-gold)] transition-colors">
              {isLogin ? "S'inscrire" : "Se connecter"}
            </button>
          </p>

          <Link href="/" className="block text-center mt-6 text-xs text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}