import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ------------------------------------------------------------------
// Vite configuration
// The dev server is pinned to localhost:5173 as requested.
// `strictPort: true` means Vite will fail loudly instead of silently
// jumping to 5174 if something else is already using 5173.
// ------------------------------------------------------------------
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    open: true,
  },
  preview: {
    port: 5173,
  },
});
