import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  minify: false,
  external: ['react', 'react-dom', 'firebase', 'firebase-admin', 'zod', '@hive/core'],
  esbuildOptions(options) {
    options.conditions = ['module'];
  }
});