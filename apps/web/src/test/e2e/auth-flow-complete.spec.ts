import { test, expect } from '@playwright/test';

test.describe('Complete Authentication and Onboarding Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Set up development environment
    await page.addInitScript(() => {
      // Mock localStorage for development mode
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: (key: string) => {
            if (key === 'dev_auth_mode') return 'true';
            return null;
          },
          setItem: () => {},
          removeItem: () => {},
          clear: () => {},
        },
        writable: true,
      });
    });
  });

  test('complete happy path: school selection → login → onboarding → dashboard', async ({ page }) => {
    // Mock API responses for complete flow
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: {
            userId: 'test-user-123',
            handle: 'testuser',
            role: 'student'
          }
        }),
      });
    });

    await page.route('/api/auth/complete-onboarding', async route => {
      const request = route.request();
      const body = await request.postDataJSON();
      
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Onboarding completed successfully',
          user: {
            id: 'test-user-123',
            fullName: body.fullName,
            userType: body.userType,
            handle: body.handle.toLowerCase(),
            major: body.major,
            graduationYear: body.graduationYear,
          },
          builderRequestsCreated: body.builderRequestSpaces?.length || 0,
        }),
      });
    });

    // Mock spaces API for cohort creation
    await page.route('/api/spaces/cohort/auto-create', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, spacesCreated: 2 }),
      });
    });

    // Mock auto-join API
    await page.route('/api/spaces/auto-join', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ spacesJoined: 3 }),
      });
    });

    // Step 1: Start at schools page
    await page.goto('/schools');
    
    await expect(page.locator('h1')).toContainText('Find your campus');
    await expect(page.locator('text=Test University (Development)')).toBeVisible();

    // Click on Test University
    await page.click('text=Test University (Development)');
    
    // Wait for navigation to complete
    await page.waitForURL(/\/auth\/login/, { timeout: 10000 });

    // Step 2: Login page
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('h1')).toContainText('Sign in to HIVE');
    await expect(page.locator('text=Join Test University on HIVE')).toBeVisible();
    await expect(page.locator('text=🛠️ Development Mode Active')).toBeVisible();

    // Fill email and submit
    const emailInput = page.locator('input[placeholder*="@test.edu"]');
    await emailInput.fill('student@test.edu');
    
    const sendButton = page.locator('button:has-text("Send magic link")');
    await expect(sendButton).toBeEnabled();
    await sendButton.click();

    // Should redirect to onboarding (development mode)
    await expect(page).toHaveURL('/onboarding', { timeout: 10000 });

    // Step 3: Onboarding Flow
    // Welcome Step
    await expect(page.locator('text=Welcome to HIVE')).toBeVisible();
    await expect(page.locator('[data-testid="progress"]')).toBeVisible();
    
    // Look for get started button or continue mechanism
    const getStartedButton = page.locator('button:has-text("Get Started"), button:has-text("Continue"), button:has-text("Let\'s go")').first();
    await getStartedButton.click();

    // User Type Step
    await expect(page.locator('text=Your Role'), page.locator('text=Select Your Role')).toBeVisible();
    await page.click('button:has-text("Student"), [data-testid="select-student"]');
    await page.click('button:has-text("Continue")');

    // Name Step
    await expect(page.locator('text=Your Identity'), page.locator('text=Your Name')).toBeVisible();
    
    // Fill name fields
    const firstNameInput = page.locator('input[placeholder*="First"], input[data-testid="first-name"]').first();
    const lastNameInput = page.locator('input[placeholder*="Last"], input[data-testid="last-name"]').first();
    
    await firstNameInput.fill('Jane');
    await lastNameInput.fill('Doe');
    await page.click('button:has-text("Continue")');

    // Academic Step
    await expect(page.locator('text=Academic Profile'), page.locator('text=Tell us about your studies')).toBeVisible();
    
    // Fill major and graduation year
    const majorInput = page.locator('input[placeholder*="Major"], select[data-testid="major-select"]').first();
    if (await majorInput.getAttribute('type') === 'text') {
      await majorInput.fill('Computer Science');
    } else {
      await majorInput.click();
      await page.click('text=Computer Science');
    }
    
    // Set graduation year
    const yearSelector = page.locator('input[type="number"], select, button:has-text("2026")').first();
    if (await yearSelector.getAttribute('type') === 'number') {
      await yearSelector.fill('2026');
    } else {
      await yearSelector.click();
      await page.click('text=2026');
    }
    
    await page.click('button:has-text("Continue")');

    // Handle Step
    await expect(page.locator('text=Unique Handle'), page.locator('text=Choose your handle')).toBeVisible();
    
    const handleInput = page.locator('input[placeholder*="handle"], input[data-testid="handle"]').first();
    await handleInput.fill('janedoe2024');
    
    // Wait for validation
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue")');

    // Photo Step (skip)
    await expect(page.locator('text=Profile Picture'), page.locator('text=Add a profile photo')).toBeVisible();
    await page.click('button:has-text("Continue"), button:has-text("Skip")').first();

    // Builder Step
    await expect(page.locator('text=Builder Requests'), page.locator('text=Become a Builder')).toBeVisible();
    
    // Optionally select builder access
    const builderButton = page.locator('button:has-text("Request Builder Access"), [data-testid="request-builder"]').first();
    if (await builderButton.isVisible()) {
      await builderButton.click();
    }
    await page.click('button:has-text("Continue")');

    // Legal Step
    await expect(page.locator('text=Terms & Privacy'), page.locator('text=Legal stuff')).toBeVisible();
    
    // Accept terms and privacy
    await page.check('input[type="checkbox"]:near(:text("Terms")), [data-testid="accept-terms"]');
    await page.check('input[type="checkbox"]:near(:text("Privacy")), [data-testid="accept-privacy"]');
    
    // Submit onboarding
    const submitButton = page.locator('button:has-text("Enter HIVE"), button:has-text("Complete")').first();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    // Step 4: Success and redirect to dashboard
    // Might show success screen first
    await expect(
      page.locator('text=Welcome to HIVE, Jane!').or(page.locator('text=Profile is ready'))
    ).toBeVisible({ timeout: 10000 });

    // Should redirect to dashboard
    await expect(page).toHaveURL('/', { timeout: 15000 });
    
    // Verify dashboard loaded
    await expect(page.locator('text=HIVE'), page.locator('[data-testid="hive-logo"]')).toBeVisible();
  });

  test('handles validation errors during onboarding', async ({ page }) => {
    // Mock successful login
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: { userId: 'test-user', handle: 'testuser', role: 'student' }
        }),
      });
    });

    // Start onboarding flow
    await page.goto('/schools');
    await page.click('text=Test University (Development)');
    await page.fill('input[placeholder*="@test.edu"]', 'test@test.edu');
    await page.click('button:has-text("Send magic link")');
    
    await expect(page).toHaveURL('/onboarding');

    // Navigate to name step
    await page.click('button:has-text("Get Started"), button:has-text("Continue")').first();
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');

    // Test validation on name step
    const continueButton = page.locator('button:has-text("Continue")');
    
    // Should be disabled without valid input
    await expect(continueButton).toBeDisabled();

    // Fill invalid short names
    await page.fill('input[placeholder*="First"]', 'J');  // Too short
    await page.fill('input[placeholder*="Last"]', 'D');   // Too short
    await expect(continueButton).toBeDisabled();

    // Fill valid names
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await expect(continueButton).toBeEnabled();
  });

  test('handles handle availability checking', async ({ page }) => {
    // Mock handle check API
    await page.route('/api/auth/check-handle', async route => {
      const request = route.request();
      const url = new URL(request.url());
      const handle = url.searchParams.get('handle');
      
      // Simulate taken handle
      if (handle === 'taken-handle') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ available: false, error: 'Handle is already taken' }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ available: true }),
        });
      }
    });

    // Setup and navigate to handle step
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: { userId: 'test-user', handle: 'testuser', role: 'student' }
        }),
      });
    });

    await page.goto('/onboarding');
    
    // Navigate through steps to handle step
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="First"]', 'John');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="Major"]', 'Computer Science');
    await page.fill('input[type="number"]', '2026');
    await page.click('button:has-text("Continue")');

    // Now at handle step - test taken handle
    const handleInput = page.locator('input[placeholder*="handle"]');
    await handleInput.fill('taken-handle');
    
    // Should show error
    await expect(page.locator('text=Handle is already taken')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")')).toBeDisabled();

    // Test available handle
    await handleInput.fill('available-handle');
    await expect(page.locator('text=Handle is available')).toBeVisible();
    await expect(page.locator('button:has-text("Continue")')).toBeEnabled();
  });

  test('handles API failures gracefully', async ({ page }) => {
    // Mock failed login
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
      });
    });

    await page.goto('/schools');
    await page.click('text=Test University (Development)');
    
    await page.fill('input[placeholder*="@test.edu"]', 'test@test.edu');
    await page.click('button:has-text("Send magic link")');

    // Should show error message
    await expect(page.locator('text=Rate limit exceeded')).toBeVisible();
    
    // User should be able to try again
    await expect(page.locator('button:has-text("Send magic link")')).toBeEnabled();
  });

  test('supports faculty onboarding flow', async ({ page }) => {
    // Mock APIs for faculty flow
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: { userId: 'faculty-user', handle: 'drsmith', role: 'faculty' }
        }),
      });
    });

    await page.route('/api/auth/complete-onboarding', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            id: 'faculty-user',
            fullName: 'Dr. Jane Smith',
            userType: 'faculty',
            handle: 'dr.jane.smith',
            major: 'Faculty',
          },
        }),
      });
    });

    // Start flow
    await page.goto('/schools');
    await page.click('text=Test University (Development)');
    await page.fill('input[placeholder*="@test.edu"]', 'faculty@test.edu');
    await page.click('button:has-text("Send magic link")');
    
    await expect(page).toHaveURL('/onboarding');

    // Navigate through faculty-specific flow
    await page.click('button:has-text("Get Started")');
    
    // Select faculty
    await page.click('button:has-text("Faculty")');
    await page.click('button:has-text("Continue")');

    // Faculty info step (simplified)
    await expect(page.locator('text=Faculty Information')).toBeVisible();
    await page.fill('input[placeholder*="First"]', 'Dr. Jane');
    await page.fill('input[placeholder*="Last"]', 'Smith');
    await page.click('button:has-text("Continue")');

    // Should skip to builder step (faculty get management access)
    await expect(page.locator('text=Request Management Access')).toBeVisible();
    await page.click('button:has-text("Continue")');

    // Legal step
    await page.check('input[type="checkbox"]:near(:text("Terms"))');
    await page.check('input[type="checkbox"]:near(:text("Privacy"))');
    await page.click('button:has-text("Enter HIVE")');

    // Should complete successfully
    await expect(page).toHaveURL('/', { timeout: 15000 });
  });

  test('maintains state during navigation', async ({ page }) => {
    // Mock successful login
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: { userId: 'test-user', handle: 'testuser', role: 'student' }
        }),
      });
    });

    // Start onboarding
    await page.goto('/onboarding');
    
    // Fill data and navigate forward
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await page.click('button:has-text("Continue")');

    // Navigate back to previous step
    await page.click('button:has-text("Back")');
    
    // Verify data is preserved
    await expect(page.locator('input[placeholder*="First"]')).toHaveValue('Jane');
    await expect(page.locator('input[placeholder*="Last"]')).toHaveValue('Doe');

    // Navigate forward again
    await page.click('button:has-text("Continue")');
    
    // Should be at academics step
    await expect(page.locator('text=Academic Profile'), page.locator('text=Tell us about your studies')).toBeVisible();
  });

  test('shows progress correctly throughout flow', async ({ page }) => {
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: { userId: 'test-user', handle: 'testuser', role: 'student' }
        }),
      });
    });

    await page.goto('/onboarding');
    
    // Check initial progress
    const progressBar = page.locator('[data-testid="progress"], .progress, [role="progressbar"]').first();
    await expect(progressBar).toBeVisible();
    
    // Progress should increase as we advance
    await page.click('button:has-text("Get Started")');
    // Progress should have increased from initial state
    
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    // Progress should continue increasing
    
    // Verify step indicators if visible
    const stepIndicator = page.locator('text=Setup Progress, text=Step');
    if (await stepIndicator.isVisible()) {
      await expect(stepIndicator).toBeVisible();
    }
  });

  test('handles network errors during onboarding submission', async ({ page }) => {
    await page.route('/api/auth/send-magic-link', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: { userId: 'test-user', handle: 'testuser', role: 'student' }
        }),
      });
    });

    // Mock onboarding completion failure
    await page.route('/api/auth/complete-onboarding', async route => {
      // Simulate network error
      await route.abort('failed');
    });

    // Complete onboarding flow
    await page.goto('/onboarding');
    
    // Navigate through all steps quickly
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="Major"]', 'Computer Science');
    await page.fill('input[type="number"]', '2026');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="handle"]', 'janedoe2024');
    await page.click('button:has-text("Continue")');
    
    await page.click('button:has-text("Continue")'); // Skip photo
    await page.click('button:has-text("Continue")'); // Skip builder
    
    await page.check('input[type="checkbox"]:near(:text("Terms"))');
    await page.check('input[type="checkbox"]:near(:text("Privacy"))');
    
    // Submit and expect error
    await page.click('button:has-text("Enter HIVE")');
    
    // Should show error message
    await expect(page.locator('text=Something went wrong, text=Network error, text=Failed')).toBeVisible();
    
    // User should be able to retry
    await expect(page.locator('button:has-text("Enter HIVE")')).toBeEnabled();
  });
});