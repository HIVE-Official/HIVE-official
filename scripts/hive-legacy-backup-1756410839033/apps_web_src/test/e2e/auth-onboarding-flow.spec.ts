import { test, expect, Page } from '@playwright/test';

const mockUser = {
  email: 'newuser@university.edu',
  displayName: 'New Test User',
  handle: 'newtestuser',
  school: 'University of Test',
  major: 'Computer Science',
  graduationYear: '2025'
};

async function fillOnboardingStep(page: Page, stepData: Record<string, any>) {
  for (const [field, value] of Object.entries(stepData)) {
    const input = page.locator(`[data-testid="${field}-input"]`);
    await input.fill(value);
  }
}

test.describe('Authentication and Onboarding E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/landing');
  });

  test('completes full new user flow: landing → auth → onboarding → dashboard', async ({ page }) => {
    // Step 1: Landing page interaction
    await expect(page.locator('[data-testid="landing-hero"]')).toBeVisible();
    
    // Wait for any animations to complete and close any open modals
    await page.waitForTimeout(1000);
    
    // Check if there's a modal open and close it
    const modalOverlay = page.locator('.fixed.inset-0.z-50');
    if (await modalOverlay.isVisible()) {
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
    }
    
    await page.click('[data-testid="get-started-button"]', { force: true });
    
    // Wait for navigation to complete
    await page.waitForURL('/schools', { timeout: 10000 });
    
    // Should redirect to schools page
    await expect(page).toHaveURL('/schools');
    
    // Step 2: Magic link authentication
    await page.fill('[data-testid="email-input"]', mockUser.email);
    await page.click('[data-testid="send-magic-link-button"]');
    
    // Verify magic link sent confirmation
    await expect(page.locator('[data-testid="magic-link-sent"]')).toBeVisible();
    await expect(page.locator('text=Check your email')).toBeVisible();
    
    // Simulate clicking magic link (in real test, would need email service integration)
    await page.goto('/auth/verify?token=mock-verification-token&email=' + encodeURIComponent(mockUser.email));
    
    // Step 3: Onboarding flow - Welcome step
    await expect(page).toHaveURL('/onboarding');
    await expect(page.locator('[data-testid="onboarding-welcome"]')).toBeVisible();
    await expect(page.locator('text=Welcome to HIVE')).toBeVisible();
    
    await page.click('[data-testid="continue-button"]');
    
    // Step 4: Name and handle step
    await expect(page.locator('[data-testid="name-step"]')).toBeVisible();
    await fillOnboardingStep(page, {
      'display-name': mockUser.displayName,
      'handle': mockUser.handle
    });
    
    // Test handle availability check
    await expect(page.locator('[data-testid="handle-available"]')).toBeVisible();
    await page.click('[data-testid="continue-button"]');
    
    // Step 5: Academic information step
    await expect(page.locator('[data-testid="academics-step"]')).toBeVisible();
    await page.selectOption('[data-testid="school-select"]', mockUser.school);
    await page.selectOption('[data-testid="major-select"]', mockUser.major);
    await page.selectOption('[data-testid="graduation-year-select"]', mockUser.graduationYear);
    
    await page.click('[data-testid="continue-button"]');
    
    // Step 6: Profile photo step (optional)
    await expect(page.locator('[data-testid="photo-step"]')).toBeVisible();
    await page.click('[data-testid="skip-photo-button"]');
    
    // Step 7: User type selection
    await expect(page.locator('[data-testid="user-type-step"]')).toBeVisible();
    await page.click('[data-testid="student-type-button"]');
    await page.click('[data-testid="continue-button"]');
    
    // Step 8: Legal agreements
    await expect(page.locator('[data-testid="legal-step"]')).toBeVisible();
    await page.check('[data-testid="terms-checkbox"]');
    await page.check('[data-testid="privacy-checkbox"]');
    await page.click('[data-testid="complete-onboarding-button"]');
    
    // Step 9: Onboarding completion
    await expect(page.locator('[data-testid="onboarding-complete"]')).toBeVisible();
    await expect(page.locator('text=Welcome to your HIVE')).toBeVisible();
    await page.click('[data-testid="enter-hive-button"]');
    
    // Step 10: Redirected to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="dashboard-welcome"]')).toBeVisible();
    await expect(page.locator(`text=Welcome, ${mockUser.displayName}`)).toBeVisible();
    
    // Verify profile data is populated correctly
    await page.click('[data-testid="profile-menu-button"]');
    await page.click('[data-testid="view-profile-link"]');
    
    await expect(page).toHaveURL('/profile');
    await expect(page.locator(`text=${mockUser.displayName}`)).toBeVisible();
    await expect(page.locator(`text=@${mockUser.handle}`)).toBeVisible();
    await expect(page.locator(`text=${mockUser.school}`)).toBeVisible();
  });

  test('handles existing user login flow', async ({ page }) => {
    const existingUser = {
      email: 'existing@university.edu'
    };
    
    await page.goto('/auth/login');
    await page.fill('[data-testid="email-input"]', existingUser.email);
    await page.click('[data-testid="send-magic-link-button"]');
    
    // Simulate existing user verification
    await page.goto('/auth/verify?token=existing-user-token&email=' + encodeURIComponent(existingUser.email));
    
    // Should skip onboarding and go directly to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="dashboard-content"]')).toBeVisible();
  });

  test('validates email domain restrictions', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Test invalid email domain
    await page.fill('[data-testid="email-input"]', 'user@gmail.com');
    await page.click('[data-testid="send-magic-link-button"]');
    
    await expect(page.locator('[data-testid="email-error"]')).toBeVisible();
    await expect(page.locator('text=Please use your educational email')).toBeVisible();
    
    // Test valid educational domain
    await page.fill('[data-testid="email-input"]', 'user@university.edu');
    await page.click('[data-testid="send-magic-link-button"]');
    
    await expect(page.locator('[data-testid="magic-link-sent"]')).toBeVisible();
  });

  test('handles onboarding form validation', async ({ page }) => {
    // Navigate directly to onboarding (simulate authenticated state)
    await page.goto('/onboarding');
    
    // Skip to name step
    await page.click('[data-testid="continue-button"]');
    
    // Test required field validation
    await page.click('[data-testid="continue-button"]');
    await expect(page.locator('[data-testid="display-name-error"]')).toBeVisible();
    await expect(page.locator('text=Display name is required')).toBeVisible();
    
    // Test handle format validation
    await page.fill('[data-testid="display-name-input"]', 'Test User');
    await page.fill('[data-testid="handle-input"]', 'invalid handle!');
    await page.click('[data-testid="continue-button"]');
    
    await expect(page.locator('[data-testid="handle-error"]')).toBeVisible();
    await expect(page.locator('text=Handle can only contain letters, numbers, and underscores')).toBeVisible();
    
    // Test handle availability
    await page.fill('[data-testid="handle-input"]', 'taken_handle');
    await page.blur('[data-testid="handle-input"]');
    
    await expect(page.locator('[data-testid="handle-taken"]')).toBeVisible();
    await expect(page.locator('text=This handle is already taken')).toBeVisible();
  });

  test('allows onboarding step navigation', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Navigate forward through steps
    await page.click('[data-testid="continue-button"]'); // Welcome → Name
    await expect(page.locator('[data-testid="name-step"]')).toBeVisible();
    
    await fillOnboardingStep(page, {
      'display-name': 'Test User',
      'handle': 'testuser'
    });
    await page.click('[data-testid="continue-button"]'); // Name → Academics
    await expect(page.locator('[data-testid="academics-step"]')).toBeVisible();
    
    // Navigate backward
    await page.click('[data-testid="back-button"]');
    await expect(page.locator('[data-testid="name-step"]')).toBeVisible();
    
    // Verify data persistence
    await expect(page.locator('[data-testid="display-name-input"]')).toHaveValue('Test User');
    await expect(page.locator('[data-testid="handle-input"]')).toHaveValue('testuser');
  });

  test('handles onboarding progress tracking', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Verify initial progress
    await expect(page.locator('[data-testid="progress-bar"]')).toBeVisible();
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '0');
    
    // Progress through steps and verify progress updates
    await page.click('[data-testid="continue-button"]');
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '14'); // 1/7 steps
    
    await fillOnboardingStep(page, {
      'display-name': 'Test User',
      'handle': 'testuser'
    });
    await page.click('[data-testid="continue-button"]');
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '28'); // 2/7 steps
  });

  test('supports keyboard navigation throughout onboarding', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Test keyboard navigation on welcome step
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="continue-button"]')).toBeFocused();
    await page.keyboard.press('Enter');
    
    // Test form field navigation
    await expect(page.locator('[data-testid="name-step"]')).toBeVisible();
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="display-name-input"]')).toBeFocused();
    
    await page.keyboard.type('Test User');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="handle-input"]')).toBeFocused();
    
    await page.keyboard.type('testuser');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="continue-button"]')).toBeFocused();
  });

  test('handles session management during onboarding', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Simulate session expiration
    await page.evaluate(() => {
      localStorage.removeItem('auth-token');
      sessionStorage.clear();
    });
    
    // Continue onboarding - should redirect to auth
    await page.click('[data-testid="continue-button"]');
    await expect(page).toHaveURL('/auth/login');
    await expect(page.locator('[data-testid="session-expired-message"]')).toBeVisible();
  });

  test('handles onboarding interruption and resumption', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Start onboarding
    await page.click('[data-testid="continue-button"]');
    await fillOnboardingStep(page, {
      'display-name': 'Test User',
      'handle': 'testuser'
    });
    await page.click('[data-testid="continue-button"]');
    
    // Navigate away (simulate browser close/reopen)
    await page.goto('/');
    
    // Return to app - should resume onboarding
    await page.goto('/dashboard'); // Authenticated user accessing dashboard
    await expect(page).toHaveURL('/onboarding'); // Should redirect to continue onboarding
    await expect(page.locator('[data-testid="academics-step"]')).toBeVisible(); // Should be on correct step
  });

  test('provides accessibility features throughout auth flow', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Test screen reader announcements
    await expect(page.locator('[role="status"]')).toBeEmpty();
    await page.fill('[data-testid="email-input"]', mockUser.email);
    await page.click('[data-testid="send-magic-link-button"]');
    
    await expect(page.locator('[role="status"]')).toHaveText('Magic link sent to your email');
    
    // Test ARIA labels and descriptions
    await expect(page.locator('[data-testid="email-input"]')).toHaveAttribute('aria-label', 'Email address');
    await expect(page.locator('[data-testid="email-input"]')).toHaveAttribute('aria-describedby', 'email-help');
    
    // Test focus management
    await page.goto('/onboarding');
    await expect(page.locator('[data-testid="continue-button"]')).toBeFocused();
  });
});