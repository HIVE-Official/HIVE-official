import { test, expect } from '@playwright/test';
import { testUsers } from '../fixtures/test-data';

test.describe('HIVE Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display landing page with login options', async ({ page }) => {
    await expect(page).toHaveTitle(/HIVE/);
    await expect(page.locator('text=Where connections have purpose')).toBeVisible();
    await expect(page.locator('[data-testid="get-started-button"]')).toBeVisible();
  });

  test('should navigate to auth page when clicking get started', async ({ page }) => {
    await page.click('[data-testid="get-started-button"]');
    await expect(page).toHaveURL('/auth');
    await expect(page.locator('text=Welcome to HIVE')).toBeVisible();
  });

  test('should show school selection for new users', async ({ page }) => {
    await page.goto('/auth');
    await expect(page.locator('[data-testid="school-select"]')).toBeVisible();
    await page.selectOption('[data-testid="school-select"]', 'University at Buffalo');
    await expect(page.locator('text=University at Buffalo')).toBeVisible();
  });

  test('should validate email domain', async ({ page }) => {
    await page.goto('/auth');
    await page.selectOption('[data-testid="school-select"]', 'University at Buffalo');
    
    // Try invalid email domain
    await page.fill('input[type="email"]', 'test@gmail.com');
    await page.click('button:has-text("Send Magic Link")');
    await expect(page.locator('text=Please use your University at Buffalo email')).toBeVisible();
    
    // Try valid email domain
    await page.fill('input[type="email"]', testUsers.student.email);
    await page.click('button:has-text("Send Magic Link")');
    await expect(page).toHaveURL('/auth/check-email');
  });

  test('should complete onboarding flow for new student', async ({ page }) => {
    // Simulate magic link click
    await page.goto('/auth/verify?token=test-new-user-token');
    
    // Should redirect to onboarding
    await expect(page).toHaveURL('/onboarding');
    
    // Step 1: User type
    await expect(page.locator('text=Are you a student, faculty, or alumni?')).toBeVisible();
    await page.click('[data-testid="user-type-student"]');
    await page.click('[data-testid="continue-button"]');
    
    // Step 2: Name
    await page.fill('[data-testid="first-name-input"]', testUsers.student.firstName);
    await page.fill('[data-testid="last-name-input"]', testUsers.student.lastName);
    await page.click('[data-testid="continue-button"]');
    
    // Step 3: Handle
    await page.fill('[data-testid="handle-input"]', testUsers.student.handle);
    await page.click('[data-testid="check-availability"]');
    await expect(page.locator('[data-testid="handle-available"]')).toBeVisible();
    await page.click('[data-testid="continue-button"]');
    
    // Step 4: Academic info
    await page.selectOption('[data-testid="major-select"]', testUsers.student.major);
    await page.selectOption('[data-testid="year-select"]', testUsers.student.year);
    await page.click('[data-testid="continue-button"]');
    
    // Step 5: Interests
    for (const interest of testUsers.student.interests) {
      await page.click(`[data-testid="interest-${interest}"]`);
    }
    await page.click('[data-testid="continue-button"]');
    
    // Step 6: Profile photo (skip)
    await page.click('[data-testid="skip-photo"]');
    
    // Complete onboarding
    await page.click('[data-testid="complete-onboarding"]');
    await expect(page).toHaveURL('/(dashboard)');
    await expect(page.locator(`text=Welcome, ${testUsers.student.firstName}`)).toBeVisible();
  });

  test('should login existing user with magic link', async ({ page }) => {
    await page.goto('/auth');
    await page.fill('input[type="email"]', testUsers.student.email);
    await page.click('button:has-text("Send Magic Link")');
    
    await expect(page).toHaveURL('/auth/check-email');
    await expect(page.locator('text=Check your email')).toBeVisible();
    
    // Simulate clicking magic link
    await page.goto('/auth/verify?token=test-existing-user-token');
    
    // Should go directly to dashboard for existing user
    await expect(page).toHaveURL('/(dashboard)');
  });

  test('should handle invalid magic link', async ({ page }) => {
    await page.goto('/auth/verify?token=invalid-token');
    await expect(page.locator('text=Invalid or expired link')).toBeVisible();
    await expect(page.locator('[data-testid="try-again-button"]')).toBeVisible();
  });

  test('should logout user', async ({ page }) => {
    // First login
    await page.goto('/auth/verify?token=test-existing-user-token');
    await expect(page).toHaveURL('/(dashboard)');
    
    // Logout
    await page.click('[data-testid="user-menu"]');
    await page.click('[data-testid="logout-button"]');
    await expect(page).toHaveURL('/');
    
    // Try to access protected route
    await page.goto('/(dashboard)');
    await expect(page).toHaveURL('/auth');
  });

  test('should handle session expiration', async ({ page, context }) => {
    // Login
    await page.goto('/auth/verify?token=test-existing-user-token');
    await expect(page).toHaveURL('/(dashboard)');
    
    // Clear cookies to simulate session expiration
    await context.clearCookies();
    
    // Try to navigate
    await page.reload();
    await expect(page).toHaveURL('/auth');
    await expect(page.locator('text=Session expired')).toBeVisible();
  });

  test('should remember user preference for "Remember me"', async ({ page }) => {
    await page.goto('/auth');
    await page.fill('input[type="email"]', testUsers.student.email);
    await page.check('[data-testid="remember-me-checkbox"]');
    await page.click('button:has-text("Send Magic Link")');
    
    // Verify preference is stored
    await page.goto('/auth');
    await expect(page.locator('input[type="email"]')).toHaveValue(testUsers.student.email);
  });
});