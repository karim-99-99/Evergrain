import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // relative paths so the app works on Vercel (and any subpath)
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
