import { test, expect } from '@playwright/test';

test.describe('HIVE Control Board', () => {
  test('shows key control links', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('dev_auth_mode', 'true');
      window.localStorage.setItem('dev_user', JSON.stringify({ email: 'jwrhineh@buffalo.edu', uid: 'admin-user-1', onboardingCompleted: true }));
    });
    await page.goto('/admin/control-board');
    await expect(page.getByRole('heading', { name: /HIVE Control Board/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Onboarding Catalog/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Feature Flags/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Campus & Spaces/i })).toBeVisible();
  });
});
