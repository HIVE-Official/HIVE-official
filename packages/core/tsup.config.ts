import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/stores/useAppStore.ts',
    'src/stores/useUnseenCountStore.ts'
  ],
  format: ['cjs', 'esm'],
  dts: {
    entry: {
      index: 'src/index.ts',
      'stores/useAppStore': 'src/stores/useAppStore.ts',
      'stores/useUnseenCountStore': 'src/stores/useUnseenCountStore.ts'
    }
  },
  sourcemap: true,
  clean: true,
  target: 'es2020',
  outDir: 'dist',
  external: ['react'],
  noExternal: ['zustand']
}); 