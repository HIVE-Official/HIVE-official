/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@hive/core": path.resolve(__dirname, "../core/src"),
      "@hive/hooks": path.resolve(__dirname, "../hooks/src"),
      "@hive/ui": path.resolve(__dirname, "../ui/src"),
      "@hive/tokens": path.resolve(__dirname, "../tokens"),
      "@hive/utilities": path.resolve(__dirname, "../utilities/src"),
      "@hive/validation": path.resolve(__dirname, "../validation/src"),
    },
  },
  // Ensure vitest can find modules in the workspace root
  server: {
    fs: {
      allow: ["../.."],
    },
  },
});
