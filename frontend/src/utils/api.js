// src/utils/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "https://intallia24-backend.onrender.com/api/contact";

const getToken = () => localStorage.getItem("intallia_token");

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const api = {
  // Auth
  login: (credentials) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),
  getMe: () => request("/auth/me"),
  logout: () => request("/auth/logout", { method: "POST" }),
  changePassword: (data) =>
    request("/auth/change-password", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Contacts
  getContacts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/contact${query ? `?${query}` : ""}`);
  },
  getContact: (id) => request(`/contact/${id}`),
  updateContactStatus: (id, status) =>
    request(`/contact/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  deleteContact: (id) => request(`/contact/${id}`, { method: "DELETE" }),
  bulkDeleteContacts: (ids) =>
    request("/contact/bulk", {
      method: "DELETE",
      body: JSON.stringify({ ids }),
    }),
};

export default api;
