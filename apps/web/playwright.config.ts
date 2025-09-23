import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/e2e-results.json' }],
    ['junit', { outputFile: 'test-results/e2e-results.xml' }],
  ],

  use: {
    baseURL: 'http://localhost:3003', // Use a unique port for e2e tests
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 20000, // Increased for slow compilation
    navigationTimeout: 45000, // Increased to handle 13s+ compilation times
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile testing
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  webServer: {
    command: 'PORT=3003 npm run dev',
    url: 'http://localhost:3003',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes
  },

  // Global setup and teardown - commented out until files exist
  // globalSetup: './src/test/global-setup.ts',
  // globalTeardown: './src/test/global-teardown.ts',

  // Test timeout - increased for slow compilation
  timeout: 60 * 1000, // 60 seconds to handle 13s+ compilation

  // Expect timeout
  expect: {
    timeout: 10 * 1000, // 10 seconds for slower rendering
  },

  // Output directory
  outputDir: 'test-results/',
}); 