// ============================================================
// API CONFIGURATION
// ------------------------------------------------------------
// >>> BACKEND URL GOES HERE <<<
// This is the ONLY place you should need to point the frontend
// at your Node.js/Express backend.
//
// Preferred: set VITE_API_BASE_URL in a ".env" file at the project
// root (copy .env.example -> .env) so you don't hardcode secrets
// or environment-specific URLs into the source code.
//
// Fallback: if no .env value is found, we default to a local
// backend running on port 5000. Change the fallback string below
// if your backend runs somewhere else.
// ============================================================
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; // <-- BACKEND URL PLACEHOLDER

// Key used to persist the auth token (JWT) in localStorage.
export const AUTH_TOKEN_KEY =
  import.meta.env.VITE_AUTH_TOKEN_KEY || "dmalpot_auth_token";

// ------------------------------------------------------------
// API ENDPOINT MAP
// ------------------------------------------------------------
// Centralizing endpoint paths here means every service file
// (authService, landService, transferService...) stays in sync
// if your backend routes ever change. Update paths here to match
// your Express route definitions (e.g. routes/land.routes.js).
// ------------------------------------------------------------
export const ENDPOINTS = {
  // ---- Auth ----
  LOGIN: "/auth/login", // POST  { email, password }
  REGISTER: "/auth/register", // POST  { fullName, citizenshipNo, email, password }
  ME: "/auth/me", // GET   current logged-in user

  // ---- Land records ----
  LAND_RECORDS: "/land-records", // GET   ?page=&limit=&query=
  LAND_RECORD_BY_ID: (id) => `/land-records/${id}`, // GET   single record
  LAND_SEARCH: "/land-records/search", // GET   ?q=

  // ---- Verification ----
  VERIFY_DOCUMENT: "/verify", // POST  { documentId | file }

  // ---- Ownership transfer ----
  TRANSFER_REQUEST: "/transfer-request", // POST  create transfer request
  TRANSFER_STATUS: (id) => `/transfer-request/${id}`, // GET   status of a request

  // ---- Dashboard (logged-in citizen) ----
  MY_RECORDS: "/land-records/mine", // GET   records owned by current user
};
