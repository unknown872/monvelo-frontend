"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { cart as cartApi } from "./api";
import { useAuth } from "./auth-context";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Transformer les items du backend au format frontend
  const formatItems = (backendItems) => {
    return backendItems.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
  };

  const fetchCart = useCallback(async () => {
    if (!token) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await cartApi.get(token);
      setItems(formatItems(data.items || []));
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(
    async (product, quantity = 1) => {
      if (!token) return;
      try {
        const data = await cartApi.addItem(product.id, quantity, token);
        setItems(formatItems(data.items || []));
      } catch (err) {
        console.error("Erreur ajout panier:", err);
      }
    },
    [token]
  );

  const updateQuantity = useCallback(
    async (slug, quantity) => {
      if (!token) return;
      const item = items.find((i) => i.product.slug === slug);
      if (!item) return;

      try {
        if (quantity <= 0) {
          const data = await cartApi.removeItem(item.product.id, token);
          setItems(formatItems(data.items || []));
        } else {
          const data = await cartApi.updateItem(item.product.id, quantity, token);
          setItems(formatItems(data.items || []));
        }
      } catch (err) {
        console.error("Erreur mise à jour panier:", err);
      }
    },
    [token, items]
  );

  const removeItem = useCallback(
    async (slug) => {
      if (!token) return;
      const item = items.find((i) => i.product.slug === slug);
      if (!item) return;

      try {
        const data = await cartApi.removeItem(item.product.id, token);
        setItems(formatItems(data.items || []));
      } catch (err) {
        console.error("Erreur suppression panier:", err);
      }
    },
    [token, items]
  );

  const clearCart = useCallback(async () => {
    if (!token) return;
    try {
      await cartApi.clear(token);
      setItems([]);
    } catch (err) {
      console.error("Erreur vidage panier:", err);
    }
  }, [token]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, loading, itemCount, subtotal, addItem, updateQuantity, removeItem, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}