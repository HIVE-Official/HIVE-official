import { test, expect } from '@playwright/test';

test.describe('Entry CTA routing', () => {
  test('primary CTA routes to /start', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByTestId('cta-primary');
    await expect(cta).toBeVisible();
    // Click and assert navigation to /start
    await cta.click();
    await expect(page).toHaveURL(/\/start$/);
  });
});

