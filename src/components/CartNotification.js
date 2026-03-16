"use client";
import Link from "next/link";
import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { formatPrice } from "../lib/data";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((product) => {
    setNotification(product);
  }, []);

  const closeNotification = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ showNotification, closeNotification }}>
      {children}

      <div
        className={`fixed top-0 right-0 z-[100] w-full sm:w-[420px] transition-all duration-500 ${
          notification
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        {notification && (
          <div className="m-4 bg-white border border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[var(--color-gray-light)]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-green-600 text-white text-xs flex items-center justify-center">
                  ✓
                </span>
                <span className="text-sm font-medium">Ajouté au panier</span>
              </div>
              <button
                onClick={closeNotification}
                className="text-[var(--color-gray)] hover:text-[var(--color-black)] transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5 flex gap-4">
              <div className="w-20 h-20 bg-[var(--color-gray-light)] overflow-hidden flex-shrink-0">
                <img
                  src={notification.images[0]}
                  alt={notification.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-[var(--color-gold)] uppercase tracking-[0.2em]">
                  {notification.category}
                </p>
                <p className="text-sm font-medium mt-1 truncate">{notification.name}</p>
                <p className="text-sm font-semibold mt-1">{formatPrice(notification.price)}</p>
              </div>
            </div>

            <div className="px-6 pb-5 flex gap-3">
              <button
                onClick={closeNotification}
                className="flex-1 py-3 border border-gray-200 text-xs uppercase tracking-widest font-medium hover:border-[var(--color-black)] transition-colors duration-300 text-center"
              >
                Continuer
              </button>
              <Link
                href="/cart"
                onClick={closeNotification}
                className="flex-1 py-3 bg-[var(--color-black)] text-white text-xs uppercase tracking-widest font-medium hover:bg-[var(--color-gold)] transition-colors duration-300 text-center"
              >
                Voir le panier
              </Link>
            </div>

            <div className="h-0.5 bg-gray-100">
              <div className="h-full bg-[var(--color-gold)] animate-[shrink_4s_linear_forwards]" />
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within NotificationProvider");
  return ctx;
}