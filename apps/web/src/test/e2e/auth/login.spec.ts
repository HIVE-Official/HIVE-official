import { test, expect } from '@playwright/test';
import { TestDataManager } from '../../utils/test-data-manager';

test.describe('Authentication Flow', () => {
  let testData: TestDataManager;

  test.beforeEach(async ({ page }) => {
    testData = new TestDataManager();
    await page.goto('/auth/login');
  });

  test.afterEach(async () => {
    await testData.cleanup();
  });

  test('should display login form with UB email validation', async ({ page }) => {
    // Check main elements are present
    await expect(page.getByRole('heading', { name: /welcome to hive/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /send magic link/i })).toBeVisible();

    // Test email validation
    const emailInput = page.getByRole('textbox', { name: /email/i });
    const continueButton = page.getByRole('button', { name: /send magic link/i });

    // Invalid email - should show validation
    await emailInput.fill('invalid@email.com');
    await continueButton.click();
    await expect(page.getByText(/buffalo\.edu email required/i)).toBeVisible();

    // Valid UB email - should proceed
    const testEmail = testData.generateUBEmail();
    await emailInput.fill(testEmail);
    await continueButton.click();

    // Should redirect to check-email page
    await expect(page).toHaveURL(/\/auth\/check-email/);
  });

  test('should handle magic link flow correctly', async ({ page }) => {
    const testEmail = testData.generateUBEmail();
    
    // Enter email and submit
    await page.getByRole('textbox', { name: /email/i }).fill(testEmail);
    await page.getByRole('button', { name: /send magic link/i }).click();

    // Should show check email page
    await expect(page).toHaveURL(/\/auth\/check-email/);
    await expect(page.getByText(/check your email/i)).toBeVisible();
    await expect(page.getByText(testEmail)).toBeVisible();

    // Should have resend option
    const resendButton = page.getByRole('button', { name: /resend/i });
    await expect(resendButton).toBeVisible();
    
    // Test resend functionality
    await resendButton.click();
    await expect(page.getByText(/email sent/i)).toBeVisible();
  });

  test('should handle magic link verification', async ({ page, context }) => {
    const testEmail = testData.generateUBEmail();
    
    // Create magic link (simulated)
    const magicToken = testData.generateMagicToken();
    const magicLinkUrl = `/auth/verify?token=${magicToken}&email=${encodeURIComponent(testEmail)}`;
    
    // Visit magic link
    await page.goto(magicLinkUrl);
    
    // Should verify and redirect to onboarding for new users
    await expect(page).toHaveURL(/\/onboarding/);
    await expect(page.getByText(/welcome to hive/i)).toBeVisible();
  });

  test('should handle existing user login', async ({ page }) => {
    // Create existing user
    const existingUser = await testData.createTestUser({
      email: testData.generateUBEmail(),
      isOnboarded: true,
      handle: 'testuser123'
    });

    const magicToken = testData.generateMagicToken();
    const magicLinkUrl = `/auth/verify?token=${magicToken}&email=${encodeURIComponent(existingUser.email)}`;
    
    await page.goto(magicLinkUrl);
    
    // Should redirect to dashboard for existing users
    await expect(page).toHaveURL('/');
    await expect(page.getByText(existingUser.handle)).toBeVisible();
  });

  test('should handle authentication errors gracefully', async ({ page }) => {
    // Test expired token
    const expiredToken = 'expired_token_123';
    await page.goto(`/auth/verify?token=${expiredToken}&email=test@buffalo.edu`);
    
    await expect(page).toHaveURL(/\/auth\/expired/);
    await expect(page.getByText(/link has expired/i)).toBeVisible();
    
    // Should provide way to request new link
    const newLinkButton = page.getByRole('button', { name: /get new link/i });
    await expect(newLinkButton).toBeVisible();
    await newLinkButton.click();
    await expect(page).toHaveURL(/\/auth\/login/);
  });

  test('should handle network errors during authentication', async ({ page }) => {
    // Simulate network failure
    await page.route('**/api/auth/send-magic-link', route => {
      route.abort('failed');
    });

    const testEmail = testData.generateUBEmail();
    await page.getByRole('textbox', { name: /email/i }).fill(testEmail);
    await page.getByRole('button', { name: /send magic link/i }).click();

    // Should show error message
    await expect(page.getByText(/something went wrong/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible();
  });

  test('should maintain auth state across page refreshes', async ({ page }) => {
    // Login user
    const user = await testData.createTestUser({
      email: testData.generateUBEmail(),
      isOnboarded: true,
      handle: 'persistentuser'
    });

    // Simulate successful authentication
    await testData.authenticateUser(page, user);
    
    // Navigate to dashboard
    await page.goto('/');
    await expect(page.getByText(user.handle)).toBeVisible();
    
    // Refresh page
    await page.reload();
    
    // Should still be authenticated
    await expect(page.getByText(user.handle)).toBeVisible();
    await expect(page).not.toHaveURL(/\/auth/);
  });

  test('should redirect to intended page after login', async ({ page }) => {
    const user = await testData.createTestUser({
      email: testData.generateUBEmail(),
      isOnboarded: true,
      handle: 'redirectuser'
    });

    // Try to access protected page while unauthenticated
    await page.goto('/profile/edit');
    
    // Should redirect to auth with return URL
    await expect(page).toHaveURL(/\/auth.*returnUrl/);
    
    // Complete authentication
    await testData.authenticateUser(page, user);
    
    // Should redirect back to intended page
    await expect(page).toHaveURL(/\/profile\/edit/);
  });

  test('should handle concurrent login attempts', async ({ context }) => {
    const testEmail = testData.generateUBEmail();
    
    // Open multiple tabs
    const page1 = await context.newPage();
    const page2 = await context.newPage();
    
    await page1.goto('/auth/login');
    await page2.goto('/auth/login');
    
    // Start login on both tabs
    await Promise.all([
      page1.getByRole('textbox', { name: /email/i }).fill(testEmail),
      page2.getByRole('textbox', { name: /email/i }).fill(testEmail)
    ]);
    
    await Promise.all([
      page1.getByRole('button', { name: /continue/i }).click(),
      page2.getByRole('button', { name: /continue/i }).click()
    ]);
    
    // Both should show check email
    await expect(page1).toHaveURL(/\/auth\/check-email/);
    await expect(page2).toHaveURL(/\/auth\/check-email/);
  });
});

test.describe('Authentication UI/UX', () => {
  test('should be mobile responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/auth/login');

    // Check layout adapts to mobile
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    // Touch targets should be accessible
    const emailInput = page.getByRole('textbox', { name: /email/i });
    const continueButton = page.getByRole('button', { name: /send magic link/i });
    
    const inputBox = await emailInput.boundingBox();
    const buttonBox = await continueButton.boundingBox();
    
    // Minimum touch target size (44px)
    expect(inputBox?.height).toBeGreaterThanOrEqual(44);
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
  });

  test('should have proper accessibility features', async ({ page }) => {
    await page.goto('/auth/login');

    // Check for proper labels and ARIA attributes
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toHaveAttribute('autocomplete', 'email');
    
    // Check focus management
    await emailInput.focus();
    await expect(emailInput).toBeFocused();
    
    // Check keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /continue/i })).toBeFocused();
  });

  test('should handle loading states appropriately', async ({ page }) => {
    // Slow down network to test loading states
    await page.route('**/api/auth/send-magic-link', async route => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.continue();
    });

    const testEmail = testData.generateUBEmail();
    await page.goto('/auth/login');
    
    await page.getByRole('textbox', { name: /email/i }).fill(testEmail);
    const continueButton = page.getByRole('button', { name: /send magic link/i });
    
    await continueButton.click();
    
    // Should show loading state
    await expect(continueButton).toBeDisabled();
    await expect(page.getByRole('button', { name: /sending/i })).toBeVisible();
    
    // Should eventually complete
    await expect(page).toHaveURL(/\/auth\/check-email/, { timeout: 10000 });
  });
});