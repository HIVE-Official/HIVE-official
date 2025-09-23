import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost:3003',
    trace: 'on-first-retry',
    screenshot: { mode: 'only-on-failure' },
    video: 'retain-on-failure',
    actionTimeout: 20000,
    navigationTimeout: 45000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Don't start web server, assume it's already running
  // webServer: undefined,

  // Test timeout
  timeout: 60 * 1000,

  // Expect timeout
  expect: {
    timeout: 10 * 1000,
  },

  // Output directory
  outputDir: 'test-results/',
});