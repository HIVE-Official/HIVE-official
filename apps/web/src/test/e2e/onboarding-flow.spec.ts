import { test, expect } from '@playwright/test';
import { TestHelpers } from './helpers/test-helpers';

test.describe('Onboarding Flow', () => {
  let testHelpers: TestHelpers;

  test.beforeEach(async ({ page }) => {
    testHelpers = new TestHelpers(page);
    await testHelpers.clearAuthState();
  });

  test.afterEach(async () => {
    await testHelpers.cleanup();
  });

  test('should complete full student onboarding flow', async ({ page }) => {
    // Start with authenticated user who needs onboarding
    await testHelpers.mockAuthenticatedUser({
      id: 'user123',
      email: 'new.student@buffalo.edu',
      onboardingCompleted: false
    });

    await page.goto('/');
    
    // Should redirect to onboarding
    await expect(page).toHaveURL('/onboarding');
    await expect(page.locator('[data-testid="welcome-step"]')).toBeVisible();

    // Step 1: Welcome step
    await expect(page.locator('h2')).toContainText('Welcome to HIVE');
    const getStartedBtn = page.locator('button:has-text("Get Started")');
    await getStartedBtn.click();

    // Step 2: User type selection
    await expect(page.locator('[data-testid="user-type-step"]')).toBeVisible();
    const studentOption = page.locator('[data-testid="user-type-student"]');
    await studentOption.click();
    
    const continueBtn = page.locator('button[data-testid="continue-button"]');
    await continueBtn.click();

    // Step 3: Name entry
    await expect(page.locator('[data-testid="name-step"]')).toBeVisible();
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await continueBtn.click();

    // Step 4: Academic information
    await expect(page.locator('[data-testid="academics-step"]')).toBeVisible();
    
    // Select major(s)
    const majorSelect = page.locator('[data-testid="major-select"]');
    await majorSelect.click();
    await page.locator('text=Computer Science').click();
    
    // Set graduation year
    const graduationYearSelect = page.locator('[data-testid="graduation-year-select"]');
    await graduationYearSelect.fill('2026');
    
    await continueBtn.click();

    // Step 5: Handle selection
    await expect(page.locator('[data-testid="handle-step"]')).toBeVisible();
    const handleInput = page.locator('input[name="handle"]');
    await handleInput.fill('johndoe2026');
    
    // Wait for handle validation
    await expect(page.locator('[data-testid="handle-availability"]')).toContainText('Available');
    await continueBtn.click();

    // Step 6: Photo upload (optional)
    await expect(page.locator('[data-testid="photo-step"]')).toBeVisible();
    // Skip photo for now
    await continueBtn.click();

    // Step 7: Interests selection (optional)
    await expect(page.locator('[data-testid="interests-step"]')).toBeVisible();
    
    // Select some interests
    await page.locator('[data-testid="interest-technology"]').click();
    await page.locator('[data-testid="interest-sports"]').click();
    await continueBtn.click();

    // Step 8: Builder requests (optional)
    await expect(page.locator('[data-testid="builder-step"]')).toBeVisible();
    
    // Select a space to request builder access
    const spaceOption = page.locator('[data-testid="space-cs-majors"]');
    if (await spaceOption.isVisible()) {
      await spaceOption.click();
    }
    await continueBtn.click();

    // Step 9: Legal agreements
    await expect(page.locator('[data-testid="legal-step"]')).toBeVisible();
    
    const termsCheckbox = page.locator('input[name="acceptedTerms"]');
    const privacyCheckbox = page.locator('input[name="acceptedPrivacy"]');
    
    await termsCheckbox.check();
    await privacyCheckbox.check();

    // Complete onboarding
    const enterHiveBtn = page.locator('button[data-testid="enter-hive-button"]');
    await enterHiveBtn.click();

    // Should show completion animation and redirect to dashboard
    await expect(page.locator('text=Welcome to HIVE, John!')).toBeVisible();
    
    await page.waitForURL('/');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    
    // Should show user profile in navigation
    const userMenu = page.locator('[data-testid="user-menu"]');
    await expect(userMenu).toContainText('John Doe');
  });

  test('should complete faculty onboarding flow (simplified)', async ({ page }) => {
    await testHelpers.mockAuthenticatedUser({
      id: 'faculty123',
      email: 'professor@buffalo.edu',
      onboardingCompleted: false
    });

    await page.goto('/onboarding');

    // Step 1: Welcome step
    const getStartedBtn = page.locator('button:has-text("Get Started")');
    await getStartedBtn.click();

    // Step 2: Select faculty user type
    const facultyOption = page.locator('[data-testid="user-type-faculty"]');
    await facultyOption.click();
    await page.locator('button[data-testid="continue-button"]').click();

    // Step 3: Faculty info (simplified step 2 for faculty)
    await expect(page.locator('[data-testid="faculty-info-step"]')).toBeVisible();
    await page.fill('input[name="firstName"]', 'Dr. Jane');
    await page.fill('input[name="lastName"]', 'Smith');
    await page.locator('button[data-testid="continue-button"]').click();

    // Step 4: Builder requests (required for faculty)
    await expect(page.locator('[data-testid="builder-step"]')).toBeVisible();
    await expect(page.locator('text=Request Management Access')).toBeVisible();
    
    // Faculty must select at least one space to manage
    const csSpaceOption = page.locator('[data-testid="space-cs-department"]');
    await csSpaceOption.click();
    await page.locator('button[data-testid="continue-button"]').click();

    // Step 5: Legal agreements
    await page.locator('input[name="acceptedTerms"]').check();
    await page.locator('input[name="acceptedPrivacy"]').check();
    
    const enterHiveBtn = page.locator('button[data-testid="enter-hive-button"]');
    await enterHiveBtn.click();

    // Should complete and redirect to dashboard
    await page.waitForURL('/');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await testHelpers.mockAuthenticatedUser({
      id: 'user123',
      email: 'test@buffalo.edu',
      onboardingCompleted: false
    });

    await page.goto('/onboarding');

    // Skip welcome step
    await page.locator('button:has-text("Get Started")').click();

    // Select student type
    await page.locator('[data-testid="user-type-student"]').click();
    await page.locator('button[data-testid="continue-button"]').click();

    // Try to continue without entering name
    const continueBtn = page.locator('button[data-testid="continue-button"]');
    await expect(continueBtn).toBeDisabled();

    // Enter only first name
    await page.fill('input[name="firstName"]', 'John');
    await expect(continueBtn).toBeDisabled();

    // Enter last name - should enable continue
    await page.fill('input[name="lastName"]', 'Doe');
    await expect(continueBtn).toBeEnabled();
  });

  test('should handle invalid graduation years', async ({ page }) => {
    await testHelpers.completeOnboardingToStep('academics');

    // Try invalid graduation year (too far in past)
    const graduationYearSelect = page.locator('[data-testid="graduation-year-select"]');
    await graduationYearSelect.fill('2000');

    const continueBtn = page.locator('button[data-testid="continue-button"]');
    await expect(continueBtn).toBeDisabled();

    // Try invalid graduation year (too far in future)
    await graduationYearSelect.fill('2050');
    await expect(continueBtn).toBeDisabled();

    // Valid graduation year should enable continue
    const currentYear = new Date().getFullYear();
    await graduationYearSelect.fill((currentYear + 2).toString());
    await expect(continueBtn).toBeEnabled();
  });

  test('should validate handle availability and format', async ({ page }) => {
    await testHelpers.completeOnboardingToStep('handle');

    const handleInput = page.locator('input[name="handle"]');
    const continueBtn = page.locator('button[data-testid="continue-button"]');
    const validationMessage = page.locator('[data-testid="handle-validation"]');

    // Test too short handle
    await handleInput.fill('ab');
    await expect(validationMessage).toContainText('at least 3 characters');
    await expect(continueBtn).toBeDisabled();

    // Test invalid characters
    await handleInput.fill('invalid@handle!');
    await expect(validationMessage).toContainText('letters, numbers');
    await expect(continueBtn).toBeDisabled();

    // Test handle starting with special character
    await handleInput.fill('_invalidstart');
    await expect(validationMessage).toContainText('start with letter or number');
    await expect(continueBtn).toBeDisabled();

    // Test valid handle
    await handleInput.fill('validhandle123');
    await expect(page.locator('[data-testid="handle-availability"]')).toContainText('Available');
    await expect(continueBtn).toBeEnabled();
  });

  test('should handle taken handles', async ({ page }) => {
    // Mock handle check API to return taken
    await page.route('**/api/profile/check-handle', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ available: false, message: 'Handle already taken' })
      });
    });

    await testHelpers.completeOnboardingToStep('handle');

    const handleInput = page.locator('input[name="handle"]');
    await handleInput.fill('takenhandle');

    await expect(page.locator('[data-testid="handle-availability"]')).toContainText('already taken');
    await expect(page.locator('button[data-testid="continue-button"]')).toBeDisabled();
  });

  test('should allow skipping optional steps', async ({ page }) => {
    await testHelpers.completeOnboardingToStep('photo');

    // Photo step should be skippable
    const continueBtn = page.locator('button[data-testid="continue-button"]');
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // Interests step should also be skippable
    await expect(page.locator('[data-testid="interests-step"]')).toBeVisible();
    await expect(continueBtn).toBeEnabled();
    await continueBtn.click();

    // Builder step should be skippable for students
    await expect(page.locator('[data-testid="builder-step"]')).toBeVisible();
    await expect(continueBtn).toBeEnabled();
  });

  test('should show progress correctly', async ({ page }) => {
    await testHelpers.mockAuthenticatedUser({
      id: 'user123',
      email: 'test@buffalo.edu',
      onboardingCompleted: false
    });

    await page.goto('/onboarding');
    
    // Should show step 1 of 9
    await expect(page.locator('[data-testid="progress-indicator"]')).toContainText('Step 1 of 9');
    
    // Complete first few steps
    await page.locator('button:has-text("Get Started")').click();
    await expect(page.locator('[data-testid="progress-indicator"]')).toContainText('Step 2 of 9');
    
    await page.locator('[data-testid="user-type-student"]').click();
    await page.locator('button[data-testid="continue-button"]').click();
    await expect(page.locator('[data-testid="progress-indicator"]')).toContainText('Step 3 of 9');
  });

  test('should handle back navigation', async ({ page }) => {
    await testHelpers.completeOnboardingToStep('name');

    // Should show back button
    const backBtn = page.locator('button[data-testid="back-button"]');
    await expect(backBtn).toBeVisible();
    await backBtn.click();

    // Should go back to user type step
    await expect(page.locator('[data-testid="user-type-step"]')).toBeVisible();
    
    // Data should be preserved
    const studentOption = page.locator('[data-testid="user-type-student"]');
    await expect(studentOption).toHaveClass(/selected|active/);
  });

  test('should prevent access to onboarding for completed users', async ({ page }) => {
    await testHelpers.mockAuthenticatedUser({
      id: 'completed123',
      email: 'completed.user@buffalo.edu',
      fullName: 'Completed User',
      onboardingCompleted: true
    });

    await page.goto('/onboarding');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
  });

  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    await testHelpers.mockAuthenticatedUser({
      id: 'mobile123',
      email: 'mobile@buffalo.edu',
      onboardingCompleted: false
    });

    await page.goto('/onboarding');
    
    // Should show mobile-optimized layout
    await expect(page.locator('[data-testid="mobile-onboarding"]')).toBeVisible();
    
    // Touch interactions should work
    const getStartedBtn = page.locator('button:has-text("Get Started")');
    await getStartedBtn.tap();
    
    const studentOption = page.locator('[data-testid="user-type-student"]');
    await studentOption.tap();
    
    await expect(page.locator('[data-testid="user-type-step"]')).toHaveClass(/active|selected/);
  });

  test('should handle network errors during onboarding completion', async ({ page }) => {
    // Mock completion API to fail
    await page.route('**/api/auth/complete-onboarding', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    await testHelpers.completeOnboardingToStep('legal');

    // Accept terms
    await page.locator('input[name="acceptedTerms"]').check();
    await page.locator('input[name="acceptedPrivacy"]').check();

    const enterHiveBtn = page.locator('button[data-testid="enter-hive-button"]');
    await enterHiveBtn.click();

    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Server error');
    
    // Button should be re-enabled for retry
    await expect(enterHiveBtn).toBeEnabled();
  });
});