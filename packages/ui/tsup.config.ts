import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  minify: false,
  target: 'es2020',
  esbuildOptions(options, context) {
    if (context.format === 'esm') {
      options.banner = {
        js: '"use client";',
      };
    }
  },
}); 