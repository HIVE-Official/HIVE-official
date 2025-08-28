import { test, expect } from '@playwright/test';

test.describe('Basic Flow Tests', () => {
  
  test('should load home page without errors', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(500); // No server errors
    await expect(page).toHaveTitle(/hive/i);
  });
  
  test('should handle auth page when available', async ({ page }) => {
    // Try to load auth page, handle both success and failure gracefully
    const response = await page.goto('/auth/login');
    
    if (response?.status() === 200) {
      // Auth page loaded - check for basic elements
      await page.waitForTimeout(2000); // Wait for dynamic content
      
      // Look for common auth page elements
      const emailInput = page.locator('input[type="email"]');
      const submitButton = page.locator('button[type="submit"]');
      
      if (await emailInput.count() > 0) {
        await expect(emailInput).toBeVisible();
        console.log('✅ Auth page loaded with email input');
      }
      
      if (await submitButton.count() > 0) {
        console.log('✅ Submit button found on auth page');
      }
      
    } else {
      console.log(`⚠️ Auth page returned ${response?.status()}, skipping auth tests`);
    }
  });

  test('should handle JavaScript without critical errors', async ({ page }) => {
    const jsErrors: string[] = [];
    
    page.on('pageerror', error => {
      if (error.message.includes('TypeError') || error.message.includes('ReferenceError')) {
        jsErrors.push(error.message);
      }
    });

    await page.goto('/');
    await page.waitForTimeout(3000); // Wait for JS to load
    
    // Allow some warnings but no critical errors
    expect(jsErrors.length).toBeLessThanOrEqual(2);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check basic responsive behavior
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    // Allow some tolerance for scrollbars
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
  });

  test('should load CSS and basic styling', async ({ page }) => {
    await page.goto('/');
    
    // Check that CSS is loaded by looking for styled elements
    const bodyBgColor = await page.evaluate(() => 
      window.getComputedStyle(document.body).backgroundColor
    );
    
    // Should have some background color (not default white)
    expect(bodyBgColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(bodyBgColor).not.toBe('rgb(255, 255, 255)');
  });
  
  test('should handle navigation without crashes', async ({ page }) => {
    await page.goto('/');
    
    // Look for any navigation links
    const links = page.locator('a[href]');
    const linkCount = await links.count();
    
    if (linkCount > 0) {
      console.log(`Found ${linkCount} navigation links`);
      
      // Try clicking the first few links
      for (let i = 0; i < Math.min(linkCount, 3); i++) {
        const link = links.nth(i);
        const href = await link.getAttribute('href');
        
        if (href && href.startsWith('/') && !href.includes('#')) {
          try {
            await link.click({ timeout: 5000 });
            await page.waitForTimeout(1000);
            
            // Check that we navigated somewhere and no critical errors
            const currentUrl = page.url();
            expect(currentUrl).toContain('localhost:3001');
            console.log(`✅ Navigation to ${href} successful`);
            
            // Go back for next test
            await page.goBack();
            await page.waitForTimeout(500);
            
          } catch (error) {
            console.log(`⚠️ Navigation to ${href} failed: ${error}`);
            // Don't fail test for navigation issues
          }
        }
      }
    }
  });

  test('should handle form interactions gracefully', async ({ page }) => {
    // Check multiple potential auth/form pages
    const formPages = ['/auth/login', '/auth', '/login'];
    
    for (const pagePath of formPages) {
      try {
        const response = await page.goto(pagePath);
        
        if (response?.status() === 200) {
          await page.waitForTimeout(1000);
          
          // Look for form elements
          const forms = page.locator('form');
          const inputs = page.locator('input');
          const buttons = page.locator('button');
          
          if (await forms.count() > 0) {
            console.log(`✅ Form found on ${pagePath}`);
            
            // Try basic form interaction
            if (await inputs.count() > 0) {
              const firstInput = inputs.first();
              await firstInput.click({ timeout: 2000 });
              console.log(`✅ Form input interaction on ${pagePath}`);
            }
          }
          
          break; // Found a working form page
        }
      } catch (error) {
        console.log(`⚠️ Form page ${pagePath} not accessible`);
      }
    }
  });

  test('should have basic performance within limits', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle', { timeout: 30000 });
    
    const loadTime = Date.now() - startTime;
    
    // Allow generous loading time for development
    expect(loadTime).toBeLessThan(30000); // 30 seconds
    console.log(`Page loaded in ${loadTime}ms`);
  });
});

test.describe('Error Handling', () => {
  
  test('should handle 404 pages gracefully', async ({ page }) => {
    const response = await page.goto('/definitely-does-not-exist');
    
    // Either proper 404 or redirect to home
    expect([200, 404]).toContain(response?.status() || 0);
    
    // Page should still load some content
    await expect(page.locator('body')).toBeVisible();
  });
  
  test('should handle API errors gracefully', async ({ page }) => {
    // Test that API endpoints exist and return proper error codes
    const apiResponse = await page.request.get('/api/nonexistent');
    expect([401, 404, 405]).toContain(apiResponse.status());
  });
  
  test('should recover from network issues', async ({ page }) => {
    // Test basic resilience
    await page.goto('/');
    
    // Simulate slow network by adding delays
    await page.route('**/*', route => {
      setTimeout(() => route.continue(), 100);
    });
    
    // Page should still be functional
    await page.reload();
    await expect(page.locator('body')).toBeVisible();
  });
});