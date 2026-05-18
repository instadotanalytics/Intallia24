// src/utils/api.js

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://intallia24-etk2.onrender.com/api";

const getToken = () => localStorage.getItem("intallia_token");

const request = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get("content-type");

    let data = {};

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      throw new Error("Server returned invalid response");
    }

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw new Error(
      error.message || "Network error. Please check your connection and try again.",
    );
  }
};

export const api = {
  // ───────────────── AUTH ─────────────────
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getMe: () => request("/auth/me"),

  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),

  changePassword: (data) =>
    request("/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // ───────────────── CONTACTS ─────────────────

  // Create Contact
  createContact: (data) =>
    request("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Get All Contacts
  getContacts: (params = {}) => {
    const query = new URLSearchParams(params).toString();

    return request(`/contact${query ? `?${query}` : ""}`);
  },

  // Get Single Contact
  getContact: (id) => request(`/contact/${id}`),

  // Update Status
  updateContactStatus: (id, status) =>
    request(`/contact/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  // Delete Contact
  deleteContact: (id) =>
    request(`/contact/${id}`, {
      method: "DELETE",
    }),

  // Bulk Delete
  bulkDeleteContacts: (ids) =>
    request("/contact/bulk", {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    }),
};

export default api;