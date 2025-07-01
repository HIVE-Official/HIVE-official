import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: false,
  minify: false,
  external: ['@hive/core', 'zod'],
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