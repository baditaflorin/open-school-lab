import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: process.env.PAGES_BASE ?? "/open-school-lab/",
  build: {
    outDir: "docs",
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    exclude: ["node_modules/**", "docs/**", "dist/**", "e2e/**"],
    setupFiles: "./src/test/setup.ts",
    globals: true,
  },
});
