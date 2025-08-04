import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Environment and setup
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globalSetup: ['./src/test/global-setup.ts'],
    globals: true,

    // Test patterns and exclusions
    include: [
      'src/test/**/*.{test,spec}.{js,ts,jsx,tsx}',
      'src/**/*.{test,spec}.{js,ts,jsx,tsx}',
    ],
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'src/test/e2e/**/*',
    ],

    // Reporters and output
    reporters: [
      'default',
      'json',
      'html',
      ['junit', { outputFile: 'test-results/junit.xml' }],
    ],
    outputFile: {
      json: 'test-results/results.json',
      html: 'test-results/index.html',
    },

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: [
        'src/app/**/*.{js,ts,jsx,tsx}',
        'src/components/**/*.{js,ts,jsx,tsx}',
        'src/hooks/**/*.{js,ts}',
        'src/lib/**/*.{js,ts}',
      ],
      exclude: [
        'src/test/**/*',
        'src/**/*.d.ts',
        'src/**/*.config.{js,ts}',
        'src/**/types.ts',
        'src/**/*.stories.{js,ts,jsx,tsx}',
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
        './src/app/(dashboard)/**/*': {
          branches: 85,
          functions: 85,
          lines: 85,
          statements: 85,
        },
        './src/lib/**/*': {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },

    // Performance and concurrency
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        maxThreads: 4,
        minThreads: 1,
      },
    },
    testTimeout: 10000,
    hookTimeout: 10000,

    // Retry and stability
    retry: 2,
    bail: 5,

    // Watch mode configuration
    watch: false,
    watchExclude: [
      'node_modules/**',
      'dist/**',
      '.next/**',
      'coverage/**',
      'test-results/**',
    ],

    // Mock handling
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,

    // Snapshot testing
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: false,
    },
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, '../'),
      '@/components': resolve(__dirname, '../components'),
      '@/lib': resolve(__dirname, '../lib'),
      '@/hooks': resolve(__dirname, '../hooks'),
      '@/app': resolve(__dirname, '../app'),
      '@/test': resolve(__dirname, '../test'),
      '@hive/ui': resolve(__dirname, '../../../packages/ui/src'),
    },
  },

  // Define configurations
  define: {
    'process.env.NODE_ENV': '"test"',
    'process.env.NEXT_PUBLIC_NODE_ENV': '"test"',
  },
});

// Test suite configurations for different test types
export const unitTestConfig = defineConfig({
  ...defineConfig().test,
  include: ['src/test/unit/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  name: 'unit',
  testTimeout: 5000,
});

export const integrationTestConfig = defineConfig({
  ...defineConfig().test,
  include: ['src/test/integration/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  name: 'integration',
  testTimeout: 15000,
  retry: 1,
});

export const componentTestConfig = defineConfig({
  ...defineConfig().test,
  include: ['src/test/component/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  name: 'component',
  testTimeout: 8000,
  coverage: {
    ...defineConfig().test!.coverage,
    thresholds: {
      global: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
    },
  },
});

export const performanceTestConfig = defineConfig({
  ...defineConfig().test,
  include: ['src/test/performance/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  name: 'performance',
  testTimeout: 30000,
  retry: 0,
  pool: 'forks', // Use process isolation for performance tests
});

export const securityTestConfig = defineConfig({
  ...defineConfig().test,
  include: ['src/test/security/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  name: 'security',
  testTimeout: 20000,
  retry: 0,
});

// CI-specific configuration
export const ciTestConfig = defineConfig({
  ...defineConfig().test,
  coverage: {
    ...defineConfig().test!.coverage,
    enabled: true,
    reporter: ['text', 'json', 'lcov'],
    reportOnFailure: true,
  },
  reporters: [
    'default',
    'json',
    'junit',
    ['github-actions', { silent: false }],
  ],
  outputFile: {
    json: 'test-results/results.json',
    junit: 'test-results/junit.xml',
  },
  pool: 'threads',
  poolOptions: {
    threads: {
      maxThreads: 2, // Limit threads in CI
      minThreads: 1,
    },
  },
  testTimeout: 15000,
  retry: 1,
  bail: 10,
});

// Development configuration for fast feedback
export const devTestConfig = defineConfig({
  ...defineConfig().test,
  watch: true,
  coverage: {
    enabled: false, // Disable coverage in dev for speed
  },
  reporters: ['verbose'],
  testTimeout: 8000,
  retry: 0,
  pool: 'threads',
  poolOptions: {
    threads: {
      maxThreads: 8,
      minThreads: 2,
    },
  },
});