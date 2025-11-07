/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['@testing-library/jest-dom/vitest', './src/test/setup.ts'],
    exclude: ['**/e2e/**', '**/node_modules/**'],
    root: './',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@hive/core': path.resolve(__dirname, '../../packages/core/src'),
      '@hive/hooks': path.resolve(__dirname, '../../packages/hooks/src'),
      '@hive/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@hive/tokens': path.resolve(__dirname, '../../packages/tokens'),
      '@hive/utilities': path.resolve(__dirname, '../../packages/utilities/src'),
      '@hive/validation': path.resolve(__dirname, '../../packages/validation/src'),
      '@hive/auth-logic': path.resolve(__dirname, '../../packages/auth-logic/src'),
      'server-only': path.resolve(__dirname, './src/test/utils/server-only.ts'),
    },
  },
}); 
