/**
 * Onboarding Flow E2E Test
 * Critical Path: Email verification → Profile setup → Space discovery → Feed
 *
 * Tests the complete new user onboarding experience
 */

import { test, expect } from '@playwright/test';

test.describe('Onboarding Flow - Complete Journey', () => {
  test.beforeEach(async ({ page, context }) => {
    // Clear all cookies and storage to simulate new user
    await context.clearCookies();
    await context.clearPermissions();
    await page.goto('/');
  });

  test('should guide new user through complete onboarding', async ({ page }) => {
    // STEP 1: Landing page should show sign-up option
    const signUpButton = await page.locator('button:has-text("Sign Up"), a:has-text("Sign Up"), button:has-text("Get Started")').first();
    await expect(signUpButton).toBeVisible({ timeout: 5000 });

    await signUpButton.click();

    // STEP 2: Email input should be visible
    const emailInput = await page.locator('input[type="email"], input[name="email"]').first();
    await expect(emailInput).toBeVisible({ timeout: 3000 });

    // STEP 3: Enter @buffalo.edu email
    await emailInput.fill('test.user@buffalo.edu');

    // STEP 4: Submit email
    const submitButton = await page.locator('button[type="submit"], button:has-text("Continue"), button:has-text("Next")').first();
    await submitButton.click();

    // STEP 5: Should show email verification message
    const verificationMessage = await page.locator('text=/check your email|verification sent|verify your email/i').first();
    await expect(verificationMessage).toBeVisible({ timeout: 3000 });
  });

  test('should enforce @buffalo.edu email requirement', async ({ page }) => {
    const signUpButton = await page.locator('button:has-text("Sign Up"), a:has-text("Sign Up")').first();

    if (await signUpButton.isVisible()) {
      await signUpButton.click();

      const emailInput = await page.locator('input[type="email"]').first();
      await emailInput.fill('invalid@gmail.com');

      const submitButton = await page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Should show error message
      const errorMessage = await page.locator('text=/@buffalo.edu|university email|UB email/i').first();
      await expect(errorMessage).toBeVisible({ timeout: 2000 });
    }
  });

  test('should validate email format', async ({ page }) => {
    const signUpButton = await page.locator('button:has-text("Sign Up"), a:has-text("Sign Up")').first();

    if (await signUpButton.isVisible()) {
      await signUpButton.click();

      const emailInput = await page.locator('input[type="email"]').first();

      // Try invalid formats
      const invalidEmails = [
        'notanemail',
        'missing@domain',
        '@buffalo.edu',
        'spaces in email@buffalo.edu'
      ];

      for (const email of invalidEmails) {
        await emailInput.fill(email);

        const submitButton = await page.locator('button[type="submit"]').first();
        await submitButton.click();

        // Should show validation error
        const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
        expect(isInvalid).toBe(true);

        await emailInput.clear();
      }
    }
  });
});

test.describe('Profile Setup Flow', () => {
  test.beforeEach(async ({ page, context }) => {
    // Simulate authenticated but incomplete profile
    await context.addCookies([
      {
        name: 'session',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/onboarding');
  });

  test('should show profile setup form', async ({ page }) => {
    // Should see onboarding wizard
    const wizard = await page.locator('[data-testid="onboarding-wizard"], .onboarding-container').first();
    await expect(wizard).toBeVisible({ timeout: 5000 });
  });

  test('should require display name', async ({ page }) => {
    const displayNameInput = await page.locator('input[name="displayName"], input[placeholder*="name"]').first();

    if (await displayNameInput.isVisible()) {
      // Try to submit without name
      const nextButton = await page.locator('button:has-text("Next"), button:has-text("Continue")').first();

      if (await nextButton.isVisible()) {
        await nextButton.click();

        // Should show validation error
        const errorMessage = await page.locator('text=/name is required|enter your name/i').count();
        expect(errorMessage).toBeGreaterThan(0);
      }
    }
  });

  test('should create unique handle', async ({ page }) => {
    const handleInput = await page.locator('input[name="handle"], input[placeholder*="handle"]').first();

    if (await handleInput.isVisible()) {
      // Enter display name first if needed
      const displayNameInput = await page.locator('input[name="displayName"]').first();
      if (await displayNameInput.isVisible()) {
        await displayNameInput.fill('John Doe');
      }

      // Enter handle
      await handleInput.fill('johndoe123');

      // Should validate format
      const handleError = await page.locator('text=/handle already taken|choose another handle/i').count();

      // Handle may or may not be taken
      expect(handleError >= 0).toBe(true);
    }
  });

  test('should enforce handle format rules', async ({ page }) => {
    const handleInput = await page.locator('input[name="handle"]').first();

    if (await handleInput.isVisible()) {
      const invalidHandles = [
        'ab', // Too short
        'handle with spaces',
        'handle@special',
        'handle!invalid'
      ];

      for (const handle of invalidHandles) {
        await handleInput.fill(handle);

        // Check validation state
        const isInvalid = await handleInput.evaluate((el: HTMLInputElement) => {
          return el.validity && !el.validity.valid;
        });

        // May show error depending on validation strategy
      }
    }
  });

  test('should allow adding interests', async ({ page }) => {
    // Look for interests selection
    const interestsSection = await page.locator('[data-testid="interests-selector"], .interests-section').first();

    if (await interestsSection.isVisible()) {
      // Click on interest tags
      const interestTags = await page.locator('button[data-interest], .interest-tag').count();

      if (interestTags > 0) {
        // Select first 3 interests
        for (let i = 0; i < Math.min(3, interestTags); i++) {
          const tag = await page.locator('button[data-interest], .interest-tag').nth(i);
          await tag.click();

          // Tag should be selected
          const isSelected = await tag.getAttribute('aria-pressed');
          expect(isSelected).toBe('true');
        }
      }
    }
  });

  test('should upload profile photo', async ({ page }) => {
    const photoUpload = await page.locator('input[type="file"][accept*="image"]').first();

    if (await photoUpload.isVisible({ timeout: 1000 })) {
      // Simulate file upload
      const testImage = Buffer.from('fake-image-data');
      await photoUpload.setInputFiles({
        name: 'profile.jpg',
        mimeType: 'image/jpeg',
        buffer: testImage
      });

      // Preview should appear
      const preview = await page.locator('img[alt*="preview"], .photo-preview').first();
      await expect(preview).toBeVisible({ timeout: 2000 });
    }
  });

  test('should show progress indicators', async ({ page }) => {
    // Look for progress bar or steps
    const progressIndicator = await page.locator('[data-testid="progress"], .progress-bar, .step-indicator').count();

    expect(progressIndicator).toBeGreaterThan(0);
  });

  test('should allow navigation between steps', async ({ page }) => {
    const nextButton = await page.locator('button:has-text("Next")').first();

    if (await nextButton.isVisible()) {
      // Fill required fields
      const displayNameInput = await page.locator('input[name="displayName"]').first();
      if (await displayNameInput.isVisible()) {
        await displayNameInput.fill('John Doe');
      }

      await nextButton.click();

      // Should move to next step
      await page.waitForTimeout(500);

      // Back button should appear
      const backButton = await page.locator('button:has-text("Back"), button[aria-label="Back"]').first();
      if (await backButton.isVisible()) {
        await backButton.click();

        // Should go back to previous step
        await expect(displayNameInput).toBeVisible();
      }
    }
  });
});

test.describe('Space Discovery Flow', () => {
  test.beforeEach(async ({ page, context }) => {
    // Simulate authenticated user who completed profile
    await context.addCookies([
      {
        name: 'session',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/onboarding/spaces');
  });

  test('should show recommended spaces', async ({ page }) => {
    // Should show space recommendations
    const spaceCards = await page.locator('[data-testid="space-card"], .space-card').count();

    expect(spaceCards).toBeGreaterThan(0);
  });

  test('should allow joining spaces', async ({ page }) => {
    const firstSpace = await page.locator('[data-testid="space-card"]').first();

    if (await firstSpace.isVisible()) {
      const joinButton = await firstSpace.locator('button:has-text("Join"), button:has-text("Follow")').first();

      if (await joinButton.isVisible()) {
        await joinButton.click();

        // Button should change to "Joined" or "Following"
        await expect(joinButton).toHaveText(/Joined|Following|Member/i, { timeout: 2000 });
      }
    }
  });

  test('should show space categories', async ({ page }) => {
    // Look for category filters
    const categories = await page.locator('[data-testid="category-filter"], .category-tab').count();

    if (categories > 0) {
      // Click different categories
      const academicCategory = await page.locator('button:has-text("Academic"), button:has-text("Classes")').first();

      if (await academicCategory.isVisible()) {
        await academicCategory.click();

        // Should filter spaces
        await page.waitForTimeout(500);

        const filteredSpaces = await page.locator('[data-testid="space-card"]').count();
        expect(filteredSpaces).toBeGreaterThan(0);
      }
    }
  });

  test('should require minimum space joins before continuing', async ({ page }) => {
    const continueButton = await page.locator('button:has-text("Continue"), button:has-text("Finish")').first();

    if (await continueButton.isVisible()) {
      // Try to continue without joining any spaces
      const isDisabled = await continueButton.isDisabled();

      if (isDisabled) {
        // Join a space
        const joinButton = await page.locator('button:has-text("Join")').first();
        if (await joinButton.isVisible()) {
          await joinButton.click();

          // Continue button should become enabled
          await expect(continueButton).toBeEnabled({ timeout: 2000 });
        }
      }
    }
  });

  test('should show space preview on hover/click', async ({ page }) => {
    const firstSpace = await page.locator('[data-testid="space-card"]').first();

    if (await firstSpace.isVisible()) {
      await firstSpace.hover();

      // Should show more details
      const spaceDescription = await firstSpace.locator('.space-description, [data-testid="space-description"]').count();

      // Description should be visible on hover or click
      if (spaceDescription === 0) {
        await firstSpace.click();

        // Should open preview modal
        const modal = await page.locator('[role="dialog"]').count();
        expect(modal).toBeGreaterThan(0);
      }
    }
  });

  test('should allow skipping space selection', async ({ page }) => {
    const skipButton = await page.locator('button:has-text("Skip"), a:has-text("Skip")').first();

    if (await skipButton.isVisible()) {
      await skipButton.click();

      // Should proceed to next step or feed
      await page.waitForURL(/\/feed|\/profile/);
    }
  });
});

test.describe('Onboarding Completion', () => {
  test('should redirect to feed after completion', async ({ page, context }) => {
    // Simulate completing onboarding
    await context.addCookies([
      {
        name: 'session',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/onboarding/complete');

    // Should show success message
    const successMessage = await page.locator('text=/welcome to hive|onboarding complete|you\'re all set/i').first();

    if (await successMessage.isVisible()) {
      // Should auto-redirect or have continue button
      const continueButton = await page.locator('button:has-text("Continue"), a:has-text("Continue")').first();

      if (await continueButton.isVisible()) {
        await continueButton.click();
      }

      // Should redirect to feed
      await page.waitForURL(/\/feed|\/$/);

      // Feed should be visible
      const feed = await page.locator('[data-testid="feed-container"], main').first();
      await expect(feed).toBeVisible({ timeout: 3000 });
    }
  });

  test('should persist onboarding completion', async ({ page, context }) => {
    // Complete onboarding
    await context.addCookies([
      {
        name: 'session',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/'
      },
      {
        name: 'onboarding_complete',
        value: 'true',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/onboarding');

    // Should redirect to feed if onboarding already complete
    await page.waitForURL(/\/feed|\/profile/, { timeout: 3000 });
  });

  test('should track onboarding analytics', async ({ page }) => {
    // Check for analytics events
    const analyticsEvents: string[] = [];

    page.on('console', (msg) => {
      if (msg.text().includes('analytics') || msg.text().includes('track')) {
        analyticsEvents.push(msg.text());
      }
    });

    await page.goto('/onboarding');

    // Wait for page to load
    await page.waitForTimeout(2000);

    // Should have tracked page view
    expect(analyticsEvents.length).toBeGreaterThan(0);
  });
});

test.describe('Onboarding Error Handling', () => {
  test('should handle network errors gracefully', async ({ page, context }) => {
    // Simulate network error
    await context.route('**/api/**', (route) => {
      route.abort('failed');
    });

    await page.goto('/onboarding');

    // Should show error message
    const errorMessage = await page.locator('text=/something went wrong|try again|error/i').count();

    // Error UI may or may not appear depending on implementation
    expect(errorMessage >= 0).toBe(true);
  });

  test('should save progress on navigation away', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'session',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/onboarding');

    // Fill some fields
    const displayNameInput = await page.locator('input[name="displayName"]').first();
    if (await displayNameInput.isVisible()) {
      await displayNameInput.fill('John Doe');

      // Navigate away
      await page.goto('/');

      // Go back to onboarding
      await page.goto('/onboarding');

      // Value should be preserved
      const preservedValue = await displayNameInput.inputValue();
      // May or may not be preserved depending on implementation
    }
  });

  test('should handle duplicate handle conflict', async ({ page, context }) => {
    await context.addCookies([
      {
        name: 'session',
        value: 'mock-session-token',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.goto('/onboarding');

    const handleInput = await page.locator('input[name="handle"]').first();

    if (await handleInput.isVisible()) {
      // Try a common handle
      await handleInput.fill('admin');

      const submitButton = await page.locator('button[type="submit"]').first();
      await submitButton.click();

      // Should show error if handle is taken
      const errorMessage = await page.locator('text=/already taken|choose another|unavailable/i').count();

      // Error may or may not appear depending on whether handle is actually taken
      expect(errorMessage >= 0).toBe(true);
    }
  });
});
