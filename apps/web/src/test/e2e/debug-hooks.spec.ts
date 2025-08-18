import { test, expect } from '@playwright/test';

test.describe('Debug Hooks Error', () => {
  test('simple page load test', async ({ page }) => {
    // Just try to load the homepage
    console.log('Navigating to homepage...');
    await page.goto('/');
    
    // Wait a moment to see what happens
    await page.waitForTimeout(2000);
    
    // Check if we can see the loading message (use first() to avoid strict mode violation)
    const loadingElement = page.locator('text=Welcome to HIVE').first();
    await expect(loadingElement).toBeVisible();
    
    console.log('Test completed successfully');
  });
});