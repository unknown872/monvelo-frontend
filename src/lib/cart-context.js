"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { cart as cartApi } from "./api";
import { useAuth } from "./auth-context";

const CartContext = createContext(null);

const LOCAL_STORAGE_KEY = "monvelo_cart";

// Helpers localStorage
function getLocalCart() {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveLocalCart(items) {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
}

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const hasSynced = useRef(false);

  const formatItems = (backendItems) => {
    return backendItems.map((item) => ({
      product: item.product,
      quantity: item.quantity,
    }));
  };

  // Charger le panier
  useEffect(() => {
    if (token) {
      // Utilisateur connecté : charger depuis le backend
      setLoading(true);
      cartApi.get(token).then((data) => {
        const backendItems = formatItems(data.items || []);

        // Sync le panier local vers le backend (une seule fois)
        if (!hasSynced.current) {
          hasSynced.current = true;
          const localItems = getLocalCart();

          if (localItems.length > 0) {
            syncLocalToBackend(localItems, backendItems, token).then((mergedItems) => {
              setItems(mergedItems);
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              setLoading(false);
            });
          } else {
            setItems(backendItems);
            setLoading(false);
          }
        } else {
          setItems(backendItems);
          setLoading(false);
        }
      }).catch(() => {
        setItems(getLocalCart());
        setLoading(false);
      });
    } else {
      // Non connecté : charger depuis localStorage
      hasSynced.current = false;
      setItems(getLocalCart());
    }
  }, [token]);

  // Synchroniser le panier local vers le backend
  async function syncLocalToBackend(localItems, backendItems, authToken) {
    try {
      for (const localItem of localItems) {
        const existsInBackend = backendItems.find(
          (b) => b.product.id === localItem.product.id
        );

        if (!existsInBackend) {
          await cartApi.addItem(localItem.product.id, localItem.quantity, authToken);
        }
      }

      const data = await cartApi.get(authToken);
      return formatItems(data.items || []);
    } catch {
      return backendItems;
    }
  }

  const addItem = useCallback(
    async (product, quantity = 1) => {
      if (token) {
        // Connecté : ajouter via API
        try {
          const data = await cartApi.addItem(product.id, quantity, token);
          setItems(formatItems(data.items || []));
        } catch (err) {
          console.error("Erreur ajout panier:", err);
        }
      } else {
        // Non connecté : ajouter en local
        setItems((prev) => {
          const existing = prev.find((item) => item.product.id === product.id);
          let newItems;
          if (existing) {
            newItems = prev.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...prev, { product, quantity }];
          }
          saveLocalCart(newItems);
          return newItems;
        });
      }
    },
    [token]
  );

  const updateQuantity = useCallback(
    async (slug, quantity) => {
      if (token) {
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
      } else {
        setItems((prev) => {
          let newItems;
          if (quantity <= 0) {
            newItems = prev.filter((item) => item.product.slug !== slug);
          } else {
            newItems = prev.map((item) =>
              item.product.slug === slug ? { ...item, quantity } : item
            );
          }
          saveLocalCart(newItems);
          return newItems;
        });
      }
    },
    [token, items]
  );

  const removeItem = useCallback(
    async (slug) => {
      if (token) {
        const item = items.find((i) => i.product.slug === slug);
        if (!item) return;

        try {
          const data = await cartApi.removeItem(item.product.id, token);
          setItems(formatItems(data.items || []));
        } catch (err) {
          console.error("Erreur suppression panier:", err);
        }
      } else {
        setItems((prev) => {
          const newItems = prev.filter((item) => item.product.slug !== slug);
          saveLocalCart(newItems);
          return newItems;
        });
      }
    },
    [token, items]
  );

  const clearCart = useCallback(async () => {
    if (token) {
      try {
        await cartApi.clear(token);
      } catch (err) {
        console.error("Erreur vidage panier:", err);
      }
    }
    setItems([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, [token]);

  const fetchCart = useCallback(async () => {
    if (token) {
      try {
        const data = await cartApi.get(token);
        setItems(formatItems(data.items || []));
      } catch {
        setItems([]);
      }
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