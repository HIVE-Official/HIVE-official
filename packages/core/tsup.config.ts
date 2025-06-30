import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  minify: false,
  external: ['react', 'react-dom', 'firebase', 'firebase-admin', 'zod', 'zustand'],
  esbuildOptions(options) {
    options.conditions = ['module'];
  },
  tsconfig: 'tsconfig.json',
  bundle: true,
  skipNodeModulesBundle: true,
  outDir: 'dist',
  target: 'es2020',
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
}); 