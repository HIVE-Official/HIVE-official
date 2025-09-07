import { test, expect } from '@playwright/test';

test.use({
  baseURL: 'http://localhost:3002'
});

test.describe('HIVE Quick Auth Test', () => {
  test('Can navigate to homepage and auth page', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Take screenshot for verification
    await page.screenshot({ path: 'test-results/homepage.png' });
    
    // Check for HIVE branding or title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Look for any auth-related buttons or links
    const authLinks = await page.locator('a[href*="auth"], button:has-text("Sign"), button:has-text("Login"), button:has-text("Get Started")').all();
    console.log(`Found ${authLinks.length} auth-related elements`);
    
    // Try to navigate to auth page
    await page.goto('/auth');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of auth page
    await page.screenshot({ path: 'test-results/auth-page.png' });
    
    // Check for email input
    const emailInput = await page.locator('input[type="email"], input[placeholder*="email" i], input[name*="email" i]').first();
    const isEmailVisible = await emailInput.isVisible().catch(() => false);
    
    if (isEmailVisible) {
      console.log('Found email input field');
      // Try to fill in a test email
      await emailInput.fill('test.student@buffalo.edu');
      await page.screenshot({ path: 'test-results/auth-filled.png' });
    }
    
    // Report what we found
    const pageContent = await page.locator('body').textContent();
    console.log('Page contains:', pageContent?.substring(0, 200));
  });
});