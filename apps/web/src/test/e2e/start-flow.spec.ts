import { test, expect } from '@playwright/test';

test.describe('Start Flow (Pre‑Onboarding)', () => {
  test('school → email → code → done → onboarding redirect (unauth)', async ({ page }) => {
    await page.goto('/start');

    // Search and select UB
    const search = page.getByTestId('start-school-search');
    await search.fill('UB');
    await expect(page.getByTestId('start-school-option-ub')).toBeVisible();
    await page.getByTestId('start-school-option-ub').click();

    // Continue to email
    await page.getByTestId('start-continue').click();
    await expect(page).toHaveURL(/\/start\/email/);

    // Enter email left-part and send code
    await page.getByTestId('start-email-input').fill('alex');
    await page.getByTestId('start-send-code').click();
    await expect(page).toHaveURL(/\/start\/verify/);

    // Enter wrong code first
    const otpContainer = page.getByTestId('start-otp');
    const firstSlot = otpContainer.locator('input').first();
    await firstSlot.click();
    await page.keyboard.type('000000');
    await page.getByTestId('start-verify').click();
    await expect(page.getByText(/Code incorrect/i)).toBeVisible();

    // Read actual code from sessionStorage and retry
    const realCode = await page.evaluate(() => {
      const raw = window.sessionStorage.getItem('start.otp');
      if (!raw) return null as string | null;
      try { return (JSON.parse(raw).code as string) || null; } catch { return null as string | null; }
    });

    expect(realCode && realCode.length === 6, 'Real OTP code present in sessionStorage').toBeTruthy();

    // Reload to clear inputs, then enter the real code
    await page.reload();
    await expect(page).toHaveURL(/\/start\/verify/);
    const firstSlotAfter = page.getByTestId('start-otp').locator('input').first();
    await firstSlotAfter.click();
    await page.keyboard.type(realCode!);
    await page.getByTestId('start-verify').click();

    // Arrive at Done page
    await expect(page).toHaveURL(/\/start\/done/);
    await expect(page.getByRole('heading', { name: /Welcome to HIVE/i })).toBeVisible();

    // Continue to onboarding; since unauthenticated, expect redirect to /schools
    await page.getByTestId('start-done-continue').click();
    await page.waitForURL(/\/(onboarding|schools)/);
  });
});

