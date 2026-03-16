const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const { body, token, method = "GET" } = options;

  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("API Error:", endpoint, res.status, data);
    throw new Error(data.error || "Une erreur est survenue");
  }

  return data;
}

// Auth
export const auth = {
  register: (body) => request("/auth/register", { method: "POST", body }),
  login: (body) => request("/auth/login", { method: "POST", body }),
  me: (token) => request("/auth/me", { token }),
};

// Products
export const products = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/products?${qs}`);
  },
  get: (slug) => request(`/products/${slug}`),
  categories: () => request("/products/categories"),
};

// Cart
export const cart = {
  get: (token) => request("/cart", { token }),
  addItem: (productId, quantity, token) =>
    request("/cart/items", { method: "POST", body: { productId, quantity }, token }),
  updateItem: (productId, quantity, token) =>
    request(`/cart/items/${productId}`, { method: "PUT", body: { quantity }, token }),
  removeItem: (productId, token) =>
    request(`/cart/items/${productId}`, { method: "DELETE", token }),
  clear: (token) => request("/cart", { method: "DELETE", token }),
};

// Checkout
export const checkout = {
  create: (body, token) =>
    request("/checkout/create", { method: "POST", body, token }),
  verify: (orderId, token) =>
    request(`/checkout/verify/${orderId}`, { token }),
  confirm: (orderId, token) =>
    request(`/checkout/confirm/${orderId}`, { method: "POST", token }),
};

// Orders
export const orders = {
  list: (token) => request("/orders", { token }),
  get: (id, token) => request(`/orders/${id}`, { token }),
};

// Admin
export const admin = {
  stats: (token) => request("/admin/stats", { token }),
  products: {
    list: (params, token) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/admin/products?${qs}`, { token });
    },
    create: (body, token) =>
      request("/admin/products", { method: "POST", body, token }),
    update: (id, body, token) =>
      request(`/admin/products/${id}`, { method: "PUT", body, token }),
    delete: (id, token) =>
      request(`/admin/products/${id}`, { method: "DELETE", token }),
  },
  orders: {
    list: (params, token) => {
      const qs = new URLSearchParams(params).toString();
      return request(`/admin/orders?${qs}`, { token });
    },
    updateStatus: (id, status, token) =>
      request(`/admin/orders/${id}/status`, { method: "PUT", body: { status }, token }),
  },
  customers: (params, token) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/admin/customers?${qs}`, { token });
  },
};