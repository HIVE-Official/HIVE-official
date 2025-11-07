import { test, expect } from '@playwright/test';

test.describe('Authentication + Onboarding (dev magic link)', () => {
  test('login via magic link and land on onboarding', async ({ page, request }) => {
    await page.goto('/auth/login');

    // Choose Test University (dev)
    await page.getByRole('button', { name: /Test University \(Development\)/i }).click();

    // Enter a "new user" email to force onboarding
    await page.getByTestId('email-input').fill('new-onboarding@test.edu');

    // Submit form
    await page.keyboard.press('Enter');

    // Success modal
    await expect(page.getByText('Check your inbox!')).toBeVisible();
    await expect(page.getByText('new-onboarding@test.edu')).toBeVisible();

    // Use dev magic link
    const useLink = page.getByRole('button', { name: /Use Dev Magic Link/i });
    await expect(useLink).toBeVisible();
    await useLink.click();

    // Verify page handles magic link and routes
    await page.waitForURL(/\/auth\/verify/);
    await page.waitForURL(/\/(onboarding|profile)/, { timeout: 15000 });
    // Expect onboarding for new users
    await expect(page).toHaveURL(/\/onboarding$/);
  });

  test('complete onboarding via API and access feed', async ({ page, request }) => {
    // Assume previous test or login session persists in CI worker; if not, do quick login flow
    const url = page.url();
    if (!/\/onboarding$/.test(url)) {
      await page.goto('/auth/login');
      await page.getByRole('button', { name: /Test University \(Development\)/i }).click();
      await page.getByTestId('email-input').fill('fresh-onboarding@test.edu');
      await page.keyboard.press('Enter');
      await page.getByRole('button', { name: /Use Dev Magic Link/i }).click();
      await page.waitForURL(/\/onboarding$/);
    }

    // Call complete-onboarding API
    const currentYear = new Date().getFullYear();
    const res = await request.post('/api/auth/complete-onboarding', {
      data: {
        fullName: 'Test User',
        userType: 'student',
        major: 'Computer Science',
        graduationYear: currentYear + 4,
        handle: 'testuser',
        consentGiven: true
      }
    });
    expect(res.ok()).toBeTruthy();

    // Navigate to feed
    await page.goto('/feed');
    await expect(page.getByText(/Your Feed|Feed/i)).toBeVisible();
  });
});

