import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers/test-helpers';

test.describe('Authentication Flow', () => {
  let testHelpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelpers = new TestHelpers(page);
    await testHelpers.clearAuthState();
  });

  test.afterEach(async () => {
    await testHelpers.cleanup();
  });

  test('should complete full auth flow: school selection → login → magic link', async ({ page }) => {
    // Step 1: Start from landing page and navigate to schools
    await page.goto('/');
    
    // Should redirect to schools page for unauthenticated users
    await expect(page).toHaveURL(/\/schools/);
    await expect(page.locator('h1')).toContainText(/choose.*school/i);

    // Step 2: Select University at Buffalo
    const schoolCard = page.locator('[data-testid="school-card-ub-buffalo"]');
    await expect(schoolCard).toBeVisible();
    await schoolCard.click();

    // Should navigate to login page with school context
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('[data-testid="school-info"]')).toContainText('University at Buffalo');

    // Step 3: Enter email and request magic link
    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('test.student@buffalo.edu');
    
    const sendMagicLinkBtn = page.locator('button:has-text("Send Magic Link")');
    await sendMagicLinkBtn.click();

    // Should show magic link sent confirmation
    await expect(page.locator('[data-testid="magic-link-sent"]')).toBeVisible();
    await expect(page.locator('text=Check your email')).toBeVisible();

    // Step 4: Simulate magic link click (in real tests, we'd intercept the email)
    const magicLinkToken = await testHelpers.getMockMagicLinkToken('test.student@buffalo.edu');
    
    await page.goto(`/auth/verify?token=${magicLinkToken}&email=test.student@buffalo.edu&schoolId=ub-buffalo`);

    // Should successfully verify and redirect to onboarding (for new users) or dashboard
    await page.waitForURL(/\/onboarding|\/$/);
    
    if (page.url().includes('/onboarding')) {
      await expect(page.locator('[data-testid="welcome-step"]')).toBeVisible();
    } else {
      // Existing user, should be on dashboard
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    }
  });

  test('should handle invalid school domain', async ({ page }) => {
    await page.goto('/auth/login?schoolId=ub-buffalo&schoolName=University%20at%20Buffalo&domain=buffalo.edu');

    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('invalid@gmail.com');
    
    const sendMagicLinkBtn = page.locator('button:has-text("Send Magic Link")');
    await sendMagicLinkBtn.click();

    // Should show domain validation error
    await expect(page.locator('[data-testid="error-message"]')).toContainText('must be from buffalo.edu domain');
  });

  test('should handle expired magic links', async ({ page }) => {
    const expiredToken = 'expired-token-12345';
    
    await page.goto(`/auth/verify?token=${expiredToken}&email=test.student@buffalo.edu&schoolId=ub-buffalo`);
    
    // Should show expired link error
    await expect(page.locator('[data-testid="error-message"]')).toContainText(/expired|invalid.*link/i);
    
    // Should offer option to request new link
    const requestNewLinkBtn = page.locator('button:has-text("Request New Link")');
    await expect(requestNewLinkBtn).toBeVisible();
    await requestNewLinkBtn.click();
    
    // Should redirect back to login
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should prevent rapid magic link requests (rate limiting)', async ({ page }) => {
    await page.goto('/auth/login?schoolId=ub-buffalo&schoolName=University%20at%20Buffalo&domain=buffalo.edu');

    const emailInput = page.locator('input[type="email"]');
    const sendMagicLinkBtn = page.locator('button:has-text("Send Magic Link")');
    
    await emailInput.fill('test.student@buffalo.edu');

    // Send first request
    await sendMagicLinkBtn.click();
    await expect(page.locator('[data-testid="magic-link-sent"]')).toBeVisible();

    // Try to send another request immediately
    await page.reload();
    await emailInput.fill('test.student@buffalo.edu');
    await sendMagicLinkBtn.click();

    // Should show rate limit error
    await expect(page.locator('[data-testid="error-message"]')).toContainText(/too many.*requests/i);
  });

  test('should redirect authenticated users away from auth pages', async ({ page }) => {
    // Mock authenticated state
    await testHelpers.mockAuthenticatedUser({
      id: 'user123',
      email: 'existing.user@buffalo.edu',
      fullName: 'Existing User',
      onboardingCompleted: true
    });

    // Try to access login page while authenticated
    await page.goto('/auth/login');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // Intercept API calls and simulate network error
    await page.route('**/api/auth/send-magic-link', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Network error' })
      });
    });

    await page.goto('/auth/login?schoolId=ub-buffalo&schoolName=University%20at%20Buffalo&domain=buffalo.edu');

    const emailInput = page.locator('input[type="email"]');
    await emailInput.fill('test.student@buffalo.edu');
    
    const sendMagicLinkBtn = page.locator('button:has-text("Send Magic Link")');
    await sendMagicLinkBtn.click();

    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    
    // Should keep form interactive for retry
    await expect(sendMagicLinkBtn).toBeEnabled();
  });

  test('should work on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/schools');
    
    // Should show mobile-optimized layout
    const mobileNav = page.locator('[data-testid="mobile-navigation"]');
    await expect(mobileNav).toBeVisible();

    // Should handle touch interactions
    const schoolCard = page.locator('[data-testid="school-card-ub-buffalo"]');
    await schoolCard.tap();

    await expect(page).toHaveURL(/\/auth\/login/);
    
    // Form should be mobile-friendly
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('inputmode', 'email');
  });

  test('should persist auth state across page reloads', async ({ page }) => {
    // Complete auth flow
    await testHelpers.completeAuthFlow('test.student@buffalo.edu');
    
    // Verify authenticated state
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    
    // Reload page
    await page.reload();
    
    // Should maintain authenticated state
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('should handle logout correctly', async ({ page }) => {
    // Complete auth flow
    await testHelpers.completeAuthFlow('test.student@buffalo.edu');
    
    // Find and click logout
    const userMenu = page.locator('[data-testid="user-menu"]');
    await userMenu.click();
    
    const logoutBtn = page.locator('button:has-text("Sign Out")');
    await logoutBtn.click();
    
    // Should redirect to schools page
    await expect(page).toHaveURL(/\/schools/);
    
    // Should not be able to access protected routes
    await page.goto('/');
    await expect(page).toHaveURL(/\/schools/);
  });
});