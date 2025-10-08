import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules',
        'dist',
        '**/*.config.ts',
        '**/*.d.ts',
        '**/index.ts',
        '**/*.stories.tsx',
        '.storybook',
      ],
    },
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.storybook'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@hive/tokens': path.resolve(__dirname, '../tokens/src'),
      '@hive/core': path.resolve(__dirname, '../core/src'),
    },
  },
});
