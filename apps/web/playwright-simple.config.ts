import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/test/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',

  use: {
    baseURL: 'http://localhost:3003',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
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

  webServer: {
    command: 'PORT=3003 npm run dev',
    url: 'http://localhost:3003',
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },

  // No global setup/teardown to avoid conflicts
  
  timeout: 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },

  outputDir: 'test-results/',
});