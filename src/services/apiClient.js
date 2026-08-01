import axios from "axios";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "../config/api.config";

// ------------------------------------------------------------
// Shared Axios instance.
// Every service file (authService, landService, transferService)
// imports THIS client instead of calling axios directly, so
// base URL / headers / auth / error handling stay in one place.
// ------------------------------------------------------------
const apiClient = axios.create({
  baseURL: API_BASE_URL, // <-- comes from src/config/api.config.js
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Attach the JWT (if present) to every outgoing request.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normalize error responses so components can just read `err.message`.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong while talking to the server.";
    return Promise.reject({ ...error, message });
  }
);

export default apiClient;
