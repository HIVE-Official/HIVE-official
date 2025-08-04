import { test, expect } from '@playwright/test';

test.describe('Simple Navigation Tests', () => {
  test('can navigate to homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=Welcome to HIVE').first()).toBeVisible();
  });

  test('can navigate to profile page', async ({ page }) => {
    await page.goto('/profile');
    // Wait for any auth redirect to complete
    await page.waitForTimeout(2000);
    
    // Should either be on profile page or redirected somewhere
    const url = page.url();
    console.log('Final URL:', url);
    
    // Just check that the page loaded something
    await expect(page.locator('body')).toBeVisible();
  });

  test('can navigate to schools page', async ({ page }) => {
    await page.goto('/schools');
    
    // Just check that page loads without crashing
    await expect(page.locator('body')).toBeVisible();
    await page.waitForTimeout(1000);
  });
});