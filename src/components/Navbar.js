"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-['Playfair_Display'] text-2xl font-semibold tracking-wide">
          MON VÉLO
        </Link>

        <div className="hidden md:flex items-center gap-10 text-sm tracking-wide uppercase">
          <Link href="/products" className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors duration-300">
            Catalogue
          </Link>
          <Link href="/cart" className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors duration-300 relative">
            Panier
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-5 w-5 h-5 bg-[var(--color-gold)] text-white text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <>
              <Link href="/orders" className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors duration-300">
                Commandes
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-[var(--color-gold)] hover:text-[var(--color-black)] transition-colors duration-300">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-4">
                <span className="text-[var(--color-gray)] text-xs normal-case">
                  {user.firstName}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 border border-gray-200 text-xs tracking-widest hover:border-[var(--color-black)] transition-colors duration-300"
                >
                  Déconnexion
                </button>
              </div>
            </>
          ) : (
            <Link
              href="/auth"
              className="px-6 py-2.5 bg-[var(--color-black)] text-white text-xs tracking-widest hover:bg-[var(--color-gold)] transition-colors duration-300"
            >
              Connexion
            </Link>
          )}
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <div className="flex flex-col gap-1.5">
            <span className={`block w-6 h-0.5 bg-[var(--color-black)] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[var(--color-black)] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[var(--color-black)] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="px-6 py-8 space-y-6 border-t border-gray-100 bg-white">
          <Link href="/products" className="block text-sm uppercase tracking-wide text-[var(--color-gray)] hover:text-[var(--color-black)]" onClick={() => setMobileOpen(false)}>
            Catalogue
          </Link>
          <Link href="/cart" className="block text-sm uppercase tracking-wide text-[var(--color-gray)] hover:text-[var(--color-black)]" onClick={() => setMobileOpen(false)}>
            Panier {itemCount > 0 && `(${itemCount})`}
          </Link>
          {user ? (
            <>
              <Link href="/orders" className="block text-sm uppercase tracking-wide text-[var(--color-gray)] hover:text-[var(--color-black)]" onClick={() => setMobileOpen(false)}>
                Mes commandes
              </Link>
              {user.role === "ADMIN" && (
                <Link href="/admin" className="block text-sm uppercase tracking-wide text-[var(--color-gold)]" onClick={() => setMobileOpen(false)}>
                  Admin
                </Link>
              )}
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block text-sm uppercase tracking-wide text-red-600">
                Déconnexion
              </button>
            </>
          ) : (
            <Link href="/auth" className="block text-sm uppercase tracking-wide text-[var(--color-gray)] hover:text-[var(--color-black)]" onClick={() => setMobileOpen(false)}>
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}