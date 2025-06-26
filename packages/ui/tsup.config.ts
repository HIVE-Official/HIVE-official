import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false,
  splitting: true,
  sourcemap: true,
  clean: true,
  esbuildOptions(options, context) {
    if (context.format === 'esm') {
      options.banner = {
        js: '"use client";',
      };
    }
  },
}); 