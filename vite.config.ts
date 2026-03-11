/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["tonetic-tristan-unfarming.ngrok-free.dev"],
  },
  test: {
    environment: "jsdom",
    globals: false,
  },
  plugins: [
    react(),
    tailwindcss(), // <-- REQUIRED FOR TAILWIND v4
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
