import { test as base, Page } from '@playwright/test';
import { testUsers } from './test-data';

/**
 * HIVE Authentication Test Fixture
 * Provides authenticated page contexts for different user types
 */

type AuthFixtures = {
  authenticatedPage: Page;
  studentPage: Page;
  facultyPage: Page;
  adminPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    // Generic authenticated user
    await loginUser(page, testUsers.student.email);
    await use(page);
  },

  studentPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginUser(page, testUsers.student.email);
    await use(page);
    await context.close();
  },

  facultyPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginUser(page, testUsers.faculty.email);
    await use(page);
    await context.close();
  },

  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await loginUser(page, 'admin@hive.edu');
    await use(page);
    await context.close();
  }
});

async function loginUser(page: Page, email: string) {
  await page.goto('/auth');
  
  // Enter email
  await page.fill('input[type="email"]', email);
  await page.click('button:has-text("Send Magic Link")');
  
  // In test mode, we'll use a special bypass
  if (process.env.TEST_MODE === 'true') {
    // Navigate directly to authenticated state
    await page.goto(`/auth/verify?token=test-token-${email}`);
  } else {
    // Wait for magic link simulation in dev mode
    await page.waitForURL('/auth/check-email');
    // Simulate clicking the magic link
    await page.goto(`/auth/verify?token=dev-token-${email}`);
  }
  
  // Wait for redirect to dashboard
  await page.waitForURL('/(dashboard)', { waitUntil: 'networkidle' });
}

export { expect } from '@playwright/test';