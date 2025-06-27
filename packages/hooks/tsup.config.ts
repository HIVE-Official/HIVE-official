import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: [
    'react',
    '@hive/api-client',
    '@hive/core',
    '@hive/auth-logic',
    '@hive/validation',
    '@hive/utilities',
    '@hive/tokens',
    '@hive/analytics',
    '@hive/i18n'
  ],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  }
}) 