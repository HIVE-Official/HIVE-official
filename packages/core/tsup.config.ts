import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  sourcemap: true,
  clean: true,
  target: 'es2020',
  treeshake: true,
  minify: true,
  external: ['firebase', 'firebase-admin', 'zustand'],
  esbuildOptions(options) {
    options.resolveExtensions = ['.ts', '.tsx', '.js', '.jsx'];
    options.platform = 'node';
    options.mainFields = ['module', 'main'];
    options.bundle = true;
    options.outdir = 'dist';
    options.keepNames = true;
    options.format = 'esm';
  },
}); 