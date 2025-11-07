import { test, expect } from '@playwright/test';

test.describe('UX Admin: Onboarding catalog UI', () => {
  test('edits campus catalog via UI and reflects in demo', async ({ page }) => {
    // Sign in as admin (dev magic link)
    await page.goto('/auth/login');
    await page.getByRole('button', { name: /Test University \(Development\)/i }).click();
    await page.getByTestId('email-input').fill('jwrhineh@buffalo.edu');
    await page.keyboard.press('Enter');
    await page.getByRole('button', { name: /Use Dev Magic Link/i }).click();
    await page.waitForURL(/(profile|onboarding)/);

    await page.goto('/ux/admin/onboarding-catalog');

    // set campus to ub and load
    const campusInput = page.locator('input').first();
    await campusInput.fill('ub');
    await page.getByRole('button', { name: /load/i }).click();

    // Update majors
    const majors = page.locator('textarea').first();
    await majors.fill('Computer Science\nAstrophysics');

    // Update year range
    const startYear = page.locator('input[type="number"]').first();
    const endYear = page.locator('input[type="number"]').nth(1);
    await startYear.fill('2026');
    await endYear.fill('2027');

    // Update interests block
    const interests = page.locator('textarea').nth(1);
    await interests.fill('# astro | Space & Astro\nAstro Club\nStargazing');

    await page.getByRole('button', { name: /save/i }).click();

    // Open demo and assert changes
    await page.getByRole('link', { name: /open demo/i }).click();
    await expect(page).toHaveURL(/catalog-demo\?campusId=ub/);
    await expect(page.getByTestId('catalog-majors').getByText('Astrophysics')).toBeVisible();
    await expect(page.getByTestId('catalog-years')).toHaveText(/2026–2027/);
    await expect(page.getByTestId('catalog-interests').getByText('Space & Astro')).toBeVisible();
  });
});
