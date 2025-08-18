import { test, expect } from '@playwright/test';

test.describe('Debug Providers', () => {
  test('test HiveLogo specifically', async ({ page }) => {
    // Navigate to a page that uses HiveLogo
    console.log('Testing HiveLogo rendering...');
    await page.goto('/auth/login?schoolId=test&schoolName=Test');
    
    // Wait and see what happens
    await page.waitForTimeout(5000);
    
    // Check if page loaded
    const pageTitle = await page.title();
    console.log('Page title:', pageTitle);
    
    // Just verify page loaded without crashing
    await expect(page.locator('body')).toBeVisible();
  });
});