import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  splitting: true,
  sourcemap: true,
  dts: true, // Enable DTS generation
});