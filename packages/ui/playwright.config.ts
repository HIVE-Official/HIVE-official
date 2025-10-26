import { defineConfig, devices } from '@playwright/test';

// Storybook base URL. Override with SB_URL env; default to localhost:6006
const SB_URL = process.env.SB_URL ?? 'http://localhost:6006';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: SB_URL,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'chromium-reduced-motion',
      use: { ...devices['Desktop Chrome'], reducedMotion: 'reduce' }
    }
  ]
});

