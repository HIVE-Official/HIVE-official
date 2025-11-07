import { test, expect } from '@playwright/test';

test.describe('Pre‑Onboarding UX Preview', () => {
  test('shows entry choices and renders read-only preview feed', async ({ page }) => {
    await page.goto('/ux/preboarding');

    await expect(page.getByRole('heading', { name: /Pre/i })).toBeVisible();

    await page.getByRole('button', { name: /preview feed/i }).click();
    await expect(page.getByRole('heading', { name: /Tonight at UB/i })).toBeVisible();

    const verifyLink = page.getByRole('link', { name: /Verify to post/i });
    await expect(verifyLink).toHaveAttribute('href', '/start');

    // Mock feed content from SocialFeed component
    await expect(page.getByText(/study scheduler tool/i)).toBeVisible();
  });
});

