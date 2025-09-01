import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('should load landing page successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading')).toBeVisible();
    await expect(page).not.toHaveTitle(/error|404|500/i);
  });

  test('should load auth page successfully', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /send magic link/i })).toBeVisible();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.getByText(/not found|404/i)).toBeVisible();
  });

  test('should have basic SEO meta tags', async ({ page }) => {
    await page.goto('/');
    
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Should not have horizontal scrollbar
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // Allow 5px tolerance
  });

  test('should load critical resources without errors', async ({ page }) => {
    const resourceErrors: string[] = [];
    
    page.on('response', response => {
      if (response.status() >= 400 && response.url().includes('localhost:3003')) {
        resourceErrors.push(`${response.status()} - ${response.url()}`);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    if (resourceErrors.length > 0) {
      console.warn('Resource errors detected:', resourceErrors);
    }
    
    // Allow some 404s for optional resources, but no 500s
    const serverErrors = resourceErrors.filter(error => error.startsWith('5'));
    expect(serverErrors).toHaveLength(0);
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Try to find any navigation links
    const navLinks = page.locator('nav a, [role="navigation"] a').first();
    if (await navLinks.count() > 0) {
      await navLinks.click();
      // Should navigate somewhere
      await page.waitForLoadState('networkidle');
      await expect(page).not.toHaveURL('/');
    }
  });

  test('should handle JavaScript errors gracefully', async ({ page }) => {
    const jsErrors: Error[] = [];
    
    page.on('pageerror', error => {
      jsErrors.push(error);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Allow minor errors but no critical ones
    const criticalErrors = jsErrors.filter(error => 
      error.message.toLowerCase().includes('reference') ||
      error.message.toLowerCase().includes('undefined') ||
      error.message.toLowerCase().includes('null')
    );
    
    if (criticalErrors.length > 0) {
      console.warn('Critical JS errors:', criticalErrors);
    }
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have acceptable performance', async ({ page }) => {
    await page.goto('/');
    
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      };
    });
    
    // Allow generous limits for development
    expect(metrics.loadTime).toBeLessThan(10000); // 10 seconds
    expect(metrics.domContentLoaded).toBeLessThan(5000); // 5 seconds
  });
});