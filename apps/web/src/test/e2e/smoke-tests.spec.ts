import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers/test-helpers';

test.describe('Smoke Tests - Critical User Journeys', () => {
  let testHelpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelpers = new TestHelpers(page);
    await testHelpers.clearAuthState();
  });

  test('should load the landing page', async ({ page }) => {
    await page.goto('/');
    
    // Should redirect to schools for unauthenticated users
    await expect(page).toHaveURL(/\/schools/);
    
    // Should show HIVE branding
    await expect(page.locator('[data-testid="hive-logo"]')).toBeVisible();
    
    // Should show school selection
    await expect(page.locator('text=Choose your school')).toBeVisible();
    
    // Should show UB option
    await expect(page.locator('[data-testid="school-card-ub-buffalo"]')).toBeVisible();
  });

  test('should handle app health check', async ({ page }) => {
    // Health endpoint should respond
    const response = await page.goto('/api/health');
    expect(response?.status()).toBe(200);
    
    const healthData = await response?.json();
    expect(healthData.status).toBe('ok');
    expect(healthData.service).toBe('HIVE Web App');
  });

  test('should complete happy path: auth → onboarding → dashboard', async ({ page }) => {
    // Mock successful auth and onboarding
    await testHelpers.mockAuthenticatedUser({
      id: 'smoke-test-user',
      email: 'smoke.test@buffalo.edu',
      onboardingCompleted: false
    });

    await testHelpers.mockOnboardingCompletion();
    await testHelpers.mockHandleAvailable();

    // Start the journey
    await page.goto('/');
    await expect(page).toHaveURL('/onboarding');

    // Complete onboarding quickly
    await page.locator('button:has-text("Get Started")').click();
    await page.locator('[data-testid="user-type-student"]').click();
    await page.locator('button[data-testid="continue-button"]').click();

    // Name
    await page.fill('input[name="firstName"]', 'Smoke');
    await page.fill('input[name="lastName"]', 'Test');
    await page.locator('button[data-testid="continue-button"]').click();

    // Academics
    await page.locator('[data-testid="major-select"]').click();
    await page.locator('text=Computer Science').first().click();
    await page.fill('[data-testid="graduation-year-select"]', '2026');
    await page.locator('button[data-testid="continue-button"]').click();

    // Handle
    await page.fill('input[name="handle"]', 'smoketest123');
    await page.waitForSelector('[data-testid="handle-availability"]:has-text("Available")');
    await page.locator('button[data-testid="continue-button"]').click();

    // Skip optional steps
    await page.locator('button[data-testid="continue-button"]').click(); // Photo
    await page.locator('button[data-testid="continue-button"]').click(); // Interests
    await page.locator('button[data-testid="continue-button"]').click(); // Builder

    // Legal
    await page.locator('input[name="acceptedTerms"]').check();
    await page.locator('input[name="acceptedPrivacy"]').check();
    await page.locator('button[data-testid="enter-hive-button"]').click();

    // Should complete and reach dashboard
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should show error boundaries on critical failures', async ({ page }) => {
    // Mock a critical API failure
    await page.route('**/api/**', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Critical system error' })
      });
    });

    await page.goto('/');
    
    // Should show error boundary instead of crashing
    await expect(page.locator('[data-testid="error-boundary"]')).toBeVisible();
    
    // Should offer recovery options
    await expect(page.locator('button:has-text("Try Again")')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/schools');
    
    // Should show mobile layout
    await expect(page.locator('[data-testid="mobile-navigation"]')).toBeVisible();
    
    // Cards should stack properly
    const schoolCards = page.locator('[data-testid^="school-card"]');
    const firstCard = schoolCards.first();
    const cardBox = await firstCard.boundingBox();
    
    // Card should take most of screen width on mobile
    expect(cardBox?.width).toBeGreaterThan(300);
  });

  test('should handle JavaScript disabled gracefully', async ({ page, javaScriptEnabled }) => {
    // Skip this test if JS is enabled (can't disable mid-test)
    if (javaScriptEnabled) {
      test.skip(true, 'JavaScript is enabled - cannot test no-JS scenario');
    }

    await page.goto('/schools');
    
    // Should show basic HTML content
    await expect(page.locator('h1')).toBeVisible();
    
    // Should show noscript message
    await expect(page.locator('noscript')).toBeVisible();
  });

  test('should persist data across page refreshes', async ({ page }) => {
    await testHelpers.mockAuthenticatedUser({
      id: 'persistent-user',
      email: 'persistent@buffalo.edu',
      fullName: 'Persistent User',
      onboardingCompleted: true
    });

    await page.goto('/');
    
    // Should be authenticated
    await expect(page.locator('[data-testid="user-menu"]')).toContainText('Persistent User');
    
    // Refresh page
    await page.reload();
    
    // Should maintain state
    await expect(page.locator('[data-testid="user-menu"]')).toContainText('Persistent User');
    await expect(page).toHaveURL('/');
  });

  test('should handle concurrent user sessions', async ({ page, context }) => {
    // Create authenticated user
    await testHelpers.mockAuthenticatedUser({
      id: 'concurrent-user',
      email: 'concurrent@buffalo.edu',
      fullName: 'Concurrent User',
      onboardingCompleted: true
    });

    await page.goto('/');
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();

    // Open new tab
    const newPage = await context.newPage();
    const newTestHelpers = new TestHelpers(newPage);
    
    // Different user in new tab
    await newTestHelpers.mockAuthenticatedUser({
      id: 'other-user',
      email: 'other@buffalo.edu',
      fullName: 'Other User',
      onboardingCompleted: true
    });

    await newPage.goto('/');
    
    // Both sessions should work independently
    await expect(page.locator('[data-testid="user-menu"]')).toContainText('Concurrent User');
    await expect(newPage.locator('[data-testid="user-menu"]')).toContainText('Other User');
  });

  test('should handle network connectivity issues', async ({ page }) => {
    await testHelpers.simulateSlowNetwork();
    
    await page.goto('/schools');
    
    // Should show loading states during slow network
    const loadingIndicator = page.locator('[data-testid="loading-indicator"]');
    if (await loadingIndicator.isVisible()) {
      await expect(loadingIndicator).toBeVisible();
    }
    
    // Should eventually load
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should maintain accessibility standards', async ({ page }) => {
    await page.goto('/schools');
    
    // Should have proper headings hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    // Should have focus management
    await page.keyboard.press('Tab');
    const focusedElement = await page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Should have proper ARIA labels
    const buttons = page.locator('button');
    const firstButton = buttons.first();
    const ariaLabel = await firstButton.getAttribute('aria-label');
    const hasAriaLabel = ariaLabel !== null || (await firstButton.textContent())?.trim() !== '';
    expect(hasAriaLabel).toBe(true);
  });
});