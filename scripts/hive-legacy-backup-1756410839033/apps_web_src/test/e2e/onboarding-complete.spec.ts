import { test, expect, Page } from '@playwright/test';

const mockNewUser = {
  email: 'newuser@university.edu',
  displayName: 'Alex Johnson',
  handle: 'alexjohnson',
  school: 'University of Test',
  major: 'Computer Science',
  graduationYear: '2025',
  interests: ['Web Development', 'AI', 'Mobile Apps']
};

async function completeOnboardingStep(page: Page, stepName: string, data: Record<string, any>) {
  await page.waitForSelector(`[data-testid="${stepName}-step"]`);
  
  for (const [field, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      // Handle multi-select or tag inputs
      for (const item of value) {
        await page.fill(`[data-testid="${field}-input"]`, item);
        await page.keyboard.press('Enter');
      }
    } else if (typeof value === 'boolean') {
      if (value) {
        await page.check(`[data-testid="${field}-checkbox"]`);
      }
    } else {
      const inputType = await page.getAttribute(`[data-testid="${field}-input"]`, 'type') || 
                       (await page.getAttribute(`[data-testid="${field}-select"]`, 'data-type')) ||
                       'text';
      
      if (inputType === 'select') {
        await page.selectOption(`[data-testid="${field}-select"]`, value);
      } else {
        await page.fill(`[data-testid="${field}-input"]`, value);
      }
    }
  }
  
  await page.click('[data-testid="continue-button"]');
}

test.describe('Complete Onboarding E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('completes full new user onboarding with all features', async ({ page }) => {
    // Step 1: Landing page to authentication
    await expect(page.locator('[data-testid="landing-hero"]')).toBeVisible();
    await page.click('[data-testid="get-started-button"]');
    
    await expect(page).toHaveURL('/auth/login');
    
    // Step 2: Email authentication flow
    await page.fill('[data-testid="email-input"]', mockNewUser.email);
    await page.click('[data-testid="send-magic-link-button"]');
    
    await expect(page.locator('[data-testid="magic-link-sent"]')).toBeVisible();
    await expect(page.locator('text=Check your email')).toBeVisible();
    
    // Simulate magic link verification (new user)
    await page.goto('/auth/verify?token=new-user-token&email=' + encodeURIComponent(mockNewUser.email));
    
    // Step 3: Onboarding - Welcome
    await expect(page).toHaveURL('/onboarding');
    await expect(page.locator('[data-testid="onboarding-welcome"]')).toBeVisible();
    
    // Verify onboarding progress indicator
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '0');
    await expect(page.locator('[data-testid="step-indicator"]')).toHaveText('Step 1 of 8');
    
    await page.click('[data-testid="start-onboarding-button"]');
    
    // Step 4: Name and Handle
    await completeOnboardingStep(page, 'name', {
      'display-name': mockNewUser.displayName,
      'handle': mockNewUser.handle
    });
    
    // Verify handle availability check
    await expect(page.locator('[data-testid="handle-available"]')).toBeVisible();
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '25');
    
    // Step 5: Academic Information
    await completeOnboardingStep(page, 'academics', {
      'school': mockNewUser.school,
      'major': mockNewUser.major,
      'graduation-year': mockNewUser.graduationYear
    });
    
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '50');
    
    // Step 6: Profile Photo (test both skip and upload)
    await expect(page.locator('[data-testid="photo-step"]')).toBeVisible();
    
    // Test photo upload
    const fileInput = page.locator('[data-testid="photo-upload-input"]');
    await fileInput.setInputFiles({
      name: 'profile.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    
    await expect(page.locator('[data-testid="photo-preview"]')).toBeVisible();
    await expect(page.locator('[data-testid="crop-controls"]')).toBeVisible();
    
    // Apply photo crop and continue
    await page.click('[data-testid="apply-crop-button"]');
    await page.click('[data-testid="continue-button"]');
    
    // Step 7: Interests and Preferences
    await completeOnboardingStep(page, 'interests', {
      'interests': mockNewUser.interests,
      'content-preferences': ['tools', 'spaces', 'events'],
      'privacy-level': 'balanced'
    });
    
    // Step 8: User Type Selection
    await expect(page.locator('[data-testid="user-type-step"]')).toBeVisible();
    await page.click('[data-testid="student-type-button"]');
    
    // Verify user type specific options
    await expect(page.locator('[data-testid="student-benefits"]')).toBeVisible();
    await page.check('[data-testid="join-study-groups"]');
    await page.check('[data-testid="enable-tool-sharing"]');
    
    await page.click('[data-testid="continue-button"]');
    
    // Step 9: Notification Preferences
    await expect(page.locator('[data-testid="notifications-step"]')).toBeVisible();
    
    // Configure notification preferences
    await page.check('[data-testid="email-notifications"]');
    await page.check('[data-testid="push-notifications"]');
    await page.uncheck('[data-testid="sms-notifications"]');
    
    // Set quiet hours
    await page.check('[data-testid="enable-quiet-hours"]');
    await page.fill('[data-testid="quiet-start-time"]', '22:00');
    await page.fill('[data-testid="quiet-end-time"]', '08:00');
    
    await page.click('[data-testid="continue-button"]');
    
    // Step 10: Legal Agreements
    await expect(page.locator('[data-testid="legal-step"]')).toBeVisible();
    
    // Review and accept terms
    await page.click('[data-testid="view-terms-button"]');
    await expect(page.locator('[data-testid="terms-modal"]')).toBeVisible();
    await page.click('[data-testid="close-terms-modal"]');
    
    await page.check('[data-testid="terms-checkbox"]');
    await page.check('[data-testid="privacy-checkbox"]');
    await page.check('[data-testid="community-guidelines-checkbox"]');
    
    // Optional marketing consent
    await page.check('[data-testid="marketing-consent-checkbox"]');
    
    await page.click('[data-testid="complete-onboarding-button"]');
    
    // Step 11: Onboarding Completion
    await expect(page.locator('[data-testid="onboarding-complete"]')).toBeVisible();
    await expect(page.locator('text=Welcome to HIVE')).toBeVisible();
    await expect(page.locator(`text=Welcome, ${mockNewUser.displayName}`)).toBeVisible();
    
    // Verify completion celebration
    await expect(page.locator('[data-testid="completion-animation"]')).toBeVisible();
    await expect(page.locator('[data-testid="achievement-badge"]')).toBeVisible();
    
    // Show onboarding summary
    await expect(page.locator('[data-testid="onboarding-summary"]')).toContainText(mockNewUser.school);
    await expect(page.locator('[data-testid="onboarding-summary"]')).toContainText(mockNewUser.major);
    
    await page.click('[data-testid="enter-hive-button"]');
    
    // Step 12: First Dashboard Experience
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="dashboard-welcome"]')).toBeVisible();
    
    // Verify personalized welcome
    await expect(page.locator(`text=Welcome to HIVE, ${mockNewUser.displayName}!`)).toBeVisible();
    
    // Check new user onboarding checklist
    await expect(page.locator('[data-testid="getting-started-checklist"]')).toBeVisible();
    await expect(page.locator('[data-testid="checklist-item-profile"]')).toHaveClass(/completed/);
    await expect(page.locator('[data-testid="checklist-item-first-tool"]')).toHaveClass(/pending/);
    await expect(page.locator('[data-testid="checklist-item-join-space"]')).toHaveClass(/pending/);
    
    // Verify profile data in header
    await page.click('[data-testid="profile-menu-button"]');
    await expect(page.locator('[data-testid="profile-dropdown"]')).toContainText(mockNewUser.displayName);
    await expect(page.locator('[data-testid="profile-dropdown"]')).toContainText(`@${mockNewUser.handle}`);
    
    // Step 13: First-time user guided tour
    await expect(page.locator('[data-testid="guided-tour-start"]')).toBeVisible();
    await page.click('[data-testid="start-tour-button"]');
    
    // Tour step 1: Navigation
    await expect(page.locator('[data-testid="tour-tooltip"]')).toBeVisible();
    await expect(page.locator('[data-testid="tour-tooltip"]')).toContainText('navigation');
    await page.click('[data-testid="tour-next-button"]');
    
    // Tour step 2: Create button
    await expect(page.locator('[data-testid="tour-tooltip"]')).toContainText('create');
    await page.click('[data-testid="tour-next-button"]');
    
    // Tour step 3: Feed
    await expect(page.locator('[data-testid="tour-tooltip"]')).toContainText('feed');
    await page.click('[data-testid="tour-next-button"]');
    
    // Tour completion
    await expect(page.locator('[data-testid="tour-complete"]')).toBeVisible();
    await page.click('[data-testid="finish-tour-button"]');
    
    // Step 14: Verify complete profile setup
    await page.click('[data-testid="profile-menu-button"]');
    await page.click('[data-testid="view-profile-link"]');
    
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('[data-testid="profile-display-name"]')).toHaveText(mockNewUser.displayName);
    await expect(page.locator('[data-testid="profile-handle"]')).toHaveText(`@${mockNewUser.handle}`);
    await expect(page.locator('[data-testid="profile-school"]')).toHaveText(mockNewUser.school);
    await expect(page.locator('[data-testid="profile-major"]')).toHaveText(mockNewUser.major);
    
    // Verify interests are displayed
    for (const interest of mockNewUser.interests) {
      await expect(page.locator(`[data-testid="interest-tag"][data-interest="${interest}"]`)).toBeVisible();
    }
    
    // Verify profile completeness indicator
    await expect(page.locator('[data-testid="profile-completeness"]')).toContainText('95%');
    await expect(page.locator('[data-testid="profile-status"]')).toHaveText('Almost Complete');
    
    // Step 15: Test first content creation prompt
    await page.goto('/dashboard');
    await expect(page.locator('[data-testid="first-content-prompt"]')).toBeVisible();
    await expect(page.locator('[data-testid="suggested-actions"]')).toBeVisible();
    
    // Suggested actions should be personalized
    await expect(page.locator('[data-testid="create-first-tool"]')).toBeVisible();
    await expect(page.locator('[data-testid="join-cs-spaces"]')).toBeVisible(); // Based on major
    await expect(page.locator('[data-testid="connect-classmates"]')).toBeVisible();
  });

  test('handles onboarding interruption and resumption', async ({ page }) => {
    // Start onboarding
    await page.goto('/auth/login');
    await page.fill('[data-testid="email-input"]', mockNewUser.email);
    await page.click('[data-testid="send-magic-link-button"]');
    
    await page.goto('/auth/verify?token=new-user-token&email=' + encodeURIComponent(mockNewUser.email));
    await expect(page).toHaveURL('/onboarding');
    
    // Complete first few steps
    await page.click('[data-testid="start-onboarding-button"]');
    
    await completeOnboardingStep(page, 'name', {
      'display-name': mockNewUser.displayName,
      'handle': mockNewUser.handle
    });
    
    await completeOnboardingStep(page, 'academics', {
      'school': mockNewUser.school,
      'major': mockNewUser.major,
      'graduation-year': mockNewUser.graduationYear
    });
    
    // Simulate navigation away (browser close/tab close)
    await page.goto('/');
    
    // Simulate return to app - should resume onboarding
    await page.goto('/dashboard'); // User tries to access dashboard
    
    // Should redirect back to onboarding at correct step
    await expect(page).toHaveURL('/onboarding');
    await expect(page.locator('[data-testid="photo-step"]')).toBeVisible(); // Should be on step 3
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('aria-valuenow', '50');
    
    // Verify data persistence
    await page.click('[data-testid="back-button"]');
    await expect(page.locator('[data-testid="display-name-input"]')).toHaveValue(mockNewUser.displayName);
    await expect(page.locator('[data-testid="handle-input"]')).toHaveValue(mockNewUser.handle);
  });

  test('validates comprehensive form validation during onboarding', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Skip welcome
    await page.click('[data-testid="start-onboarding-button"]');
    
    // Test required field validation
    await page.click('[data-testid="continue-button"]');
    
    await expect(page.locator('[data-testid="display-name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="handle-error"]')).toBeVisible();
    await expect(page.locator('text=Display name is required')).toBeVisible();
    await expect(page.locator('text=Handle is required')).toBeVisible();
    
    // Test handle format validation
    await page.fill('[data-testid="display-name-input"]', mockNewUser.displayName);
    await page.fill('[data-testid="handle-input"]', 'invalid handle!');
    await page.click('[data-testid="continue-button"]');
    
    await expect(page.locator('[data-testid="handle-error"]')).toBeVisible();
    await expect(page.locator('text=Handle can only contain letters, numbers, and underscores')).toBeVisible();
    
    // Test handle availability validation
    await page.fill('[data-testid="handle-input"]', 'taken_handle');
    await page.blur('[data-testid="handle-input"]');
    
    await expect(page.locator('[data-testid="handle-taken"]')).toBeVisible();
    await expect(page.locator('text=This handle is already taken')).toBeVisible();
    
    // Test handle suggestion
    await expect(page.locator('[data-testid="handle-suggestions"]')).toBeVisible();
    await expect(page.locator('[data-testid="suggested-handle"]')).toBeVisible();
    
    // Use suggested handle
    await page.click('[data-testid="suggested-handle"]');
    await expect(page.locator('[data-testid="handle-available"]')).toBeVisible();
    
    // Test successful validation
    await page.fill('[data-testid="handle-input"]', mockNewUser.handle);
    await page.blur('[data-testid="handle-input"]');
    await expect(page.locator('[data-testid="handle-available"]')).toBeVisible();
    
    await page.click('[data-testid="continue-button"]');
    await expect(page.locator('[data-testid="academics-step"]')).toBeVisible();
  });

  test('supports accessibility throughout onboarding', async ({ page }) => {
    await page.goto('/onboarding');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="start-onboarding-button"]')).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="name-step"]')).toBeVisible();
    
    // Test form field navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="display-name-input"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="handle-input"]')).toBeFocused();
    
    // Test ARIA attributes
    await expect(page.locator('[data-testid="onboarding-form"]')).toHaveAttribute('role', 'form');
    await expect(page.locator('[data-testid="progress-bar"]')).toHaveAttribute('role', 'progressbar');
    await expect(page.locator('[data-testid="display-name-input"]')).toHaveAttribute('aria-required', 'true');
    
    // Test screen reader announcements
    await expect(page.locator('[role="status"]')).toBeEmpty(); // No errors initially
    
    await page.fill('[data-testid="display-name-input"]', mockNewUser.displayName);
    await page.fill('[data-testid="handle-input"]', mockNewUser.handle);
    await page.click('[data-testid="continue-button"]');
    
    await expect(page.locator('[role="status"]')).toHaveText('Step completed. Moving to academic information.');
    
    // Test high contrast mode compatibility
    await page.addStyleTag({
      content: `
        @media (prefers-contrast: high) {
          .hive-onboarding { border: 2px solid white; }
        }
      `
    });
    
    // Verify high contrast elements are visible
    const onboardingContainer = page.locator('[data-testid="onboarding-container"]');
    await expect(onboardingContainer).toBeVisible();
  });

  test('handles error recovery and retry mechanisms', async ({ page }) => {
    await page.goto('/onboarding');
    await page.click('[data-testid="start-onboarding-button"]');
    
    // Complete first step
    await completeOnboardingStep(page, 'name', {
      'display-name': mockNewUser.displayName,
      'handle': mockNewUser.handle
    });
    
    // Simulate network error during next step
    await page.route('**/api/onboarding/validate', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    // Try to continue with academics step
    await page.fill('[data-testid="school-select"]', mockNewUser.school);
    await page.click('[data-testid="continue-button"]');
    
    // Should show error message
    await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    await expect(page.locator('text=Something went wrong')).toBeVisible();
    
    // Verify retry functionality
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
    
    // Remove error route and retry
    await page.unroute('**/api/onboarding/validate');
    await page.click('[data-testid="retry-button"]');
    
    // Should proceed successfully
    await expect(page.locator('[data-testid="photo-step"]')).toBeVisible();
  });
});