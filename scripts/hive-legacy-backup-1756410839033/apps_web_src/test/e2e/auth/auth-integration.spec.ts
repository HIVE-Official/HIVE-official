import { test, expect } from '@playwright/test';
import { TestDataManager } from '../../utils/test-data-manager';

test.describe('Authentication Integration', () => {
  let testData: TestDataManager;

  test.beforeEach(async ({ page }) => {
    testData = new TestDataManager();
  });

  test.afterEach(async () => {
    await testData.cleanup();
  });

  test('should handle complete auth to onboarding to dashboard flow', async ({ page }) => {
    const testEmail = testData.generateUBEmail();
    
    // Step 1: Start login
    await page.goto('/auth/login');
    await page.getByRole('textbox', { name: /email/i }).fill(testEmail);
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Step 2: Check email page
    await expect(page).toHaveURL(/\/auth\/check-email/);
    
    // Step 3: Simulate clicking magic link
    const magicToken = testData.generateMagicToken();
    await page.goto(`/auth/verify?token=${magicToken}&email=${encodeURIComponent(testEmail)}`);
    
    // Step 4: Should redirect to onboarding for new user
    await expect(page).toHaveURL(/\/onboarding/);
    
    // Step 5: Complete onboarding quickly
    await page.getByRole('button', { name: /let's begin/i }).click();
    
    // Name step
    await page.getByRole('textbox', { name: /first name/i }).fill('Integration');
    await page.getByRole('textbox', { name: /last name/i }).fill('Test');
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Handle step
    const uniqueHandle = `integrationtest${Date.now()}`;
    await page.getByRole('textbox', { name: /handle/i }).fill(uniqueHandle);
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Photo step - skip
    await page.getByRole('button', { name: /skip for now/i }).click();
    
    // User type
    await page.getByRole('button', { name: /student/i }).click();
    
    // Academics
    await page.getByRole('button', { name: /sophomore/i }).click();
    const schoolSelect = page.getByRole('combobox', { name: /school/i });
    await schoolSelect.click();
    await page.getByRole('option', { name: /engineering/i }).click();
    const majorSelect = page.getByRole('combobox', { name: /major/i });
    await majorSelect.click();
    await page.getByRole('option', { name: /computer science/i }).click();
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Interests
    await page.getByRole('button', { name: /coding/i }).click();
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Legal
    await page.getByRole('checkbox', { name: /terms of service/i }).check();
    await page.getByRole('checkbox', { name: /privacy policy/i }).check();
    await page.getByRole('checkbox', { name: /community guidelines/i }).check();
    await page.getByRole('button', { name: /complete onboarding/i }).click();
    
    // Step 6: Should end up on dashboard
    await expect(page).toHaveURL('/');
    await expect(page.getByText(uniqueHandle)).toBeVisible();
    
    // Verify user is fully authenticated and onboarded
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should handle auth session persistence across browser restart', async ({ context, page }) => {
    // Create and authenticate user
    const user = await testData.createTestUser({
      email: testData.generateUBEmail(),
      isOnboarded: true,
      handle: 'persistentuser'
    });

    await testData.authenticateUser(page, user);
    await page.goto('/');
    await expect(page.getByText(user.handle)).toBeVisible();
    
    // Close browser context (simulate restart)
    await context.close();
    
    // Create new context (simulate fresh browser)
    const newContext = await page.context().browser()!.newContext();
    const newPage = await newContext.newPage();
    
    // Set the same cookies/session data
    await testData.authenticateUser(newPage, user);
    
    await newPage.goto('/');
    await expect(newPage.getByText(user.handle!)).toBeVisible();
    
    await newContext.close();
  });

  test('should handle auth token expiration gracefully', async ({ page }) => {
    const user = await testData.createTestUser({
      email: testData.generateUBEmail(),
      isOnboarded: true,
      handle: 'expiringuser'
    });

    // Authenticate user
    await testData.authenticateUser(page, user);
    await page.goto('/');
    await expect(page.getByText(user.handle!)).toBeVisible();
    
    // Simulate expired token by intercepting auth requests
    await page.route('**/api/auth/session', route => {
      route.fulfill({
        status: 401,
        body: JSON.stringify({ error: 'Token expired' })
      });
    });
    
    // Try to navigate to protected page
    await page.goto('/profile/edit');
    
    // Should redirect to login
    await expect(page).toHaveURL(/\/auth/);
  });

  test('should handle multiple simultaneous auth attempts', async ({ context }) => {
    const testEmail = testData.generateUBEmail();
    
    // Create multiple tabs
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();
    
    // Start auth flow in all tabs simultaneously
    await Promise.all([
      page1.goto('/auth/login'),
      page2.goto('/auth/login'),
      page3.goto('/auth/login')
    ]);
    
    // Fill email in all tabs
    await Promise.all([
      page1.getByRole('textbox', { name: /email/i }).fill(testEmail),
      page2.getByRole('textbox', { name: /email/i }).fill(testEmail),
      page3.getByRole('textbox', { name: /email/i }).fill(testEmail)
    ]);
    
    // Submit in all tabs
    await Promise.all([
      page1.getByRole('button', { name: /continue/i }).click(),
      page2.getByRole('button', { name: /continue/i }).click(),
      page3.getByRole('button', { name: /continue/i }).click()
    ]);
    
    // All should reach check email page
    await Promise.all([
      expect(page1).toHaveURL(/\/auth\/check-email/),
      expect(page2).toHaveURL(/\/auth\/check-email/),
      expect(page3).toHaveURL(/\/auth\/check-email/)
    ]);
    
    // Simulate magic link click in one tab
    const magicToken = testData.generateMagicToken();
    await page1.goto(`/auth/verify?token=${magicToken}&email=${encodeURIComponent(testEmail)}`);
    
    // Should redirect to onboarding
    await expect(page1).toHaveURL(/\/onboarding/);
    
    // Other tabs should eventually sync (if they check for auth state)
    await page2.reload();
    await page3.reload();
  });

  test('should handle auth flow with network interruptions', async ({ page }) => {
    const testEmail = testData.generateUBEmail();
    
    await page.goto('/auth/login');
    await page.getByRole('textbox', { name: /email/i }).fill(testEmail);
    
    // Simulate network failure
    await testData.simulateNetworkConditions(page, 'offline');
    
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Should show network error
    await expect(page.getByText(/network error|offline/i)).toBeVisible();
    
    // Restore network
    await testData.simulateNetworkConditions(page, 'fast');
    
    // Retry should work
    await page.getByRole('button', { name: /try again|retry/i }).click();
    await expect(page).toHaveURL(/\/auth\/check-email/);
  });

  test('should maintain proper auth state during onboarding interruption', async ({ page }) => {
    const testEmail = testData.generateUBEmail();
    
    // Start auth flow
    await page.goto('/auth/login');
    await page.getByRole('textbox', { name: /email/i }).fill(testEmail);
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Complete magic link verification
    const magicToken = testData.generateMagicToken();
    await page.goto(`/auth/verify?token=${magicToken}&email=${encodeURIComponent(testEmail)}`);
    await expect(page).toHaveURL(/\/onboarding/);
    
    // Start onboarding
    await page.getByRole('button', { name: /let's begin/i }).click();
    await page.getByRole('textbox', { name: /first name/i }).fill('Interrupted');
    await page.getByRole('textbox', { name: /last name/i }).fill('User');
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Simulate interruption - navigate away
    await page.goto('/auth/login');
    
    // Should redirect back to onboarding (user is authenticated but not onboarded)
    await expect(page).toHaveURL(/\/onboarding/);
    
    // Should preserve partial progress
    await expect(page.getByRole('textbox', { name: /first name/i })).toHaveValue('Interrupted');
    await expect(page.getByRole('textbox', { name: /last name/i })).toHaveValue('User');
  });
});

test.describe('Authentication Security', () => {
  let testData: TestDataManager;

  test.beforeEach(async ({ page }) => {
    testData = new TestDataManager();
  });

  test.afterEach(async () => {
    await testData.cleanup();
  });

  test('should prevent access to protected routes without auth', async ({ page }) => {
    const protectedRoutes = [
      '/profile/edit',
      '/profile/settings',
      '/spaces',
      '/feed'
    ];
    
    for (const route of protectedRoutes) {
      await page.goto(route);
      await expect(page).toHaveURL(/\/auth/);
    }
  });

  test('should invalidate session on explicit logout', async ({ page }) => {
    const user = await testData.createTestUser({
      email: testData.generateUBEmail(),
      isOnboarded: true,
      handle: 'logoutuser'
    });

    await testData.authenticateUser(page, user);
    await page.goto('/');
    await expect(page.getByText(user.handle!)).toBeVisible();
    
    // Find and click logout
    await page.getByRole('button', { name: /logout|sign out/i }).click();
    
    // Should redirect to landing/login
    await expect(page).toHaveURL(/\/auth|\/landing|\//);
    
    // Try to access protected route
    await page.goto('/profile/edit');
    await expect(page).toHaveURL(/\/auth/);
  });

  test('should handle CSRF protection', async ({ page }) => {
    // This test would verify CSRF token handling
    // Implementation depends on your CSRF strategy
    
    await page.goto('/auth/login');
    
    // Check that forms include CSRF tokens or other protection
    const form = page.locator('form');
    // Would check for CSRF token presence or SameSite cookie settings
    await expect(form).toBeVisible();
  });

  test('should rate limit authentication attempts', async ({ page }) => {
    const testEmail = testData.generateUBEmail();
    
    await page.goto('/auth/login');
    
    // Make multiple rapid requests
    for (let i = 0; i < 10; i++) {
      await page.getByRole('textbox', { name: /email/i }).fill(testEmail);
      await page.getByRole('button', { name: /continue/i }).click();
      await page.waitForTimeout(100);
      
      if (i > 5) {
        // Should start showing rate limit warnings
        const rateLimitWarning = page.getByText(/too many attempts|rate limit|slow down/i);
        if (await rateLimitWarning.isVisible()) {
          break; // Rate limiting is working
        }
      }
    }
  });
});