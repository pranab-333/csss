import apiClient from "./apiClient";
import { ENDPOINTS, AUTH_TOKEN_KEY } from "../config/api.config";

// ------------------------------------------------------------
// Auth service — talks to your Express auth routes.
// Expected backend contract (adjust to match your API):
//   POST /auth/login    -> { token, user }
//   POST /auth/register -> { token, user }
//   GET  /auth/me        -> { user }
// ------------------------------------------------------------

export async function login({ email, password }) {
  const { data } = await apiClient.post(ENDPOINTS.LOGIN, { email, password });
  if (data?.token) {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  }
  return data;
}

export async function register({ fullName, citizenshipNo, email, password }) {
  const { data } = await apiClient.post(ENDPOINTS.REGISTER, {
    fullName,
    citizenshipNo,
    email,
    password,
  });
  if (data?.token) {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
  }
  return data;
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get(ENDPOINTS.ME);
  return data;
}

export function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(AUTH_TOKEN_KEY));
}
