import { test, expect } from '@playwright/test';

// Helper function to wait for schools page to load completely
async function waitForSchoolsPageLoad(page: any) {
  await page.waitForLoadState('networkidle');
  // Wait for loading state to finish and content to appear
  await page.waitForSelector('h1:has-text("Find your campus")', { timeout: 30000 });
}

// Helper function to select development test school
async function selectTestUniversity(page: any) {
  await waitForSchoolsPageLoad(page);
  // Use more specific selector that works with the school card structure
  await page.click('[data-testid="school-test-university"], h3:has-text("Test University (Development)")');
}

test.describe('Authentication Edge Cases and Error Handling', () => {
  test.beforeEach(async ({ page }) => {
    // Set up development environment
    await page.addInitScript(() => {
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

  test('handles missing school parameters gracefully', async ({ page }) => {
    // Navigate directly to login without school params
    await page.goto('/auth/login');
    
    // Should redirect to schools page (wait for redirect)
    await page.waitForURL('/schools', { timeout: 15000 });
    await waitForSchoolsPageLoad(page);
  });

  test('handles expired or invalid magic links', async ({ page }) => {
    // Mock failed verification
    await page.route('/api/auth/verify-magic-link', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid or expired magic link' }),
      });
    });

    // Navigate to verify page with invalid token
    await page.goto('/auth/verify?oobCode=invalid-token&email=test@test.edu&schoolId=test-university');
    
    // Should show error state
    await expect(page.locator('text=Verification Failed')).toBeVisible();
    await expect(page.locator('text=Invalid or expired magic link')).toBeVisible();
    
    // Should provide retry option
    const retryButton = page.locator('button:has-text("Try again")');
    await expect(retryButton).toBeVisible();
    
    // Clicking retry should go back to schools
    await retryButton.click();
    await expect(page).toHaveURL('/schools');
  });

  test('handles malformed email addresses', async ({ page }) => {
    await page.goto('/schools');
    await selectTestUniversity(page);
    
    // Test various invalid email formats
    const emailInput = page.locator('input[placeholder*="@test.edu"]');
    const sendButton = page.locator('button:has-text("Send magic link")');
    
    // Test incomplete email
    await emailInput.fill('incomplete');
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    await expect(sendButton).toBeDisabled();
    
    // Test email without @
    await emailInput.fill('no-at-symbol.com');
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    await expect(sendButton).toBeDisabled();
    
    // Test valid email format
    await emailInput.fill('valid@test.edu');
    await expect(sendButton).toBeEnabled();
  });

  test('handles domain validation for non-dev schools', async ({ page }) => {
    // Mock a non-dev school
    await page.goto('/auth/login?schoolId=ub&schoolName=University+at+Buffalo&domain=buffalo.edu');
    
    const emailInput = page.locator('input[placeholder*="@buffalo.edu"]');
    
    // Test wrong domain
    await emailInput.fill('test@gmail.com');
    await expect(page.locator('text=Please use your @buffalo.edu email address')).toBeVisible();
    
    // Test correct domain
    await emailInput.fill('test@buffalo.edu');
    await expect(page.locator('text=Please use your @buffalo.edu email address')).not.toBeVisible();
  });

  test('handles session expiration during onboarding', async ({ page }) => {
    // Start onboarding normally
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
    
    // Simulate session expiration by clearing localStorage
    await page.evaluate(() => {
      window.localStorage.clear();
    });
    
    // Try to refresh or continue
    await page.reload();
    
    // Should redirect to schools page
    await expect(page).toHaveURL('/schools');
  });

  test('handles corrupted session data', async ({ page }) => {
    // Set up corrupted session data
    await page.addInitScript(() => {
      window.localStorage.setItem('hive_session', 'invalid-json-data');
    });

    await page.goto('/onboarding');
    
    // Should handle gracefully and redirect
    await expect(page).toHaveURL('/schools');
  });

  test('handles network timeouts during magic link sending', async ({ page }) => {
    // Mock slow/timeout response
    await page.route('/api/auth/send-magic-link', async route => {
      // Simulate timeout by not responding
      await new Promise(resolve => setTimeout(resolve, 30000));
    });

    await page.goto('/schools');
    await selectTestUniversity(page);
    
    await page.fill('input[placeholder*="@test.edu"]', 'test@test.edu');
    await page.click('button:has-text("Send magic link")');
    
    // Should show loading state
    await expect(page.locator('text=Sending magic link...')).toBeVisible();
    await expect(page.locator('button:has-text("Send magic link")')).toBeDisabled();
    
    // Eventually should timeout and show error (or reset state)
    // This depends on your timeout implementation
  });

  test('handles duplicate onboarding completion', async ({ page }) => {
    // Mock onboarding already completed error
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

    await page.route('/api/auth/complete-onboarding', async route => {
      await route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Onboarding already completed' }),
      });
    });

    // Complete onboarding flow
    await page.goto('/onboarding');
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="Major"]', 'Computer Science');
    await page.fill('input[type="number"]', '2026');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="handle"]', 'janedoe');
    await page.click('button:has-text("Continue")');
    
    await page.click('button:has-text("Continue")'); // Skip photo
    await page.click('button:has-text("Continue")'); // Skip builder
    
    await page.check('input[type="checkbox"]:near(:text("Terms"))');
    await page.check('input[type="checkbox"]:near(:text("Privacy"))');
    await page.click('button:has-text("Enter HIVE")');
    
    // Should show specific error
    await expect(page.locator('text=Onboarding already completed')).toBeVisible();
  });

  test('handles handle conflicts during onboarding', async ({ page }) => {
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

    // Mock handle conflict during final submission
    await page.route('/api/auth/complete-onboarding', async route => {
      await route.fulfill({
        status: 409,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Handle is already taken' }),
      });
    });

    // Complete flow with conflicting handle
    await page.goto('/onboarding');
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="Major"]', 'Computer Science');
    await page.fill('input[type="number"]', '2026');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="handle"]', 'taken-handle');
    await page.click('button:has-text("Continue")');
    
    await page.click('button:has-text("Continue")'); // Skip photo
    await page.click('button:has-text("Continue")'); // Skip builder
    
    await page.check('input[type="checkbox"]:near(:text("Terms"))');
    await page.check('input[type="checkbox"]:near(:text("Privacy"))');
    await page.click('button:has-text("Enter HIVE")');
    
    // Should show handle conflict error
    await expect(page.locator('text=Handle is already taken')).toBeVisible();
    
    // User should be able to go back and change handle
    const backButton = page.locator('button:has-text("Back")');
    if (await backButton.isVisible()) {
      await backButton.click();
    }
  });

  test('handles invalid graduation years', async ({ page }) => {
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
    
    // Navigate to academics step
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await page.click('button:has-text("Continue")');
    
    // Fill major
    await page.fill('input[placeholder*="Major"]', 'Computer Science');
    
    // Test invalid graduation years
    const yearInput = page.locator('input[type="number"]');
    const continueButton = page.locator('button:has-text("Continue")');
    
    // Test past year
    await yearInput.fill('2020');
    // Should either show error or disable continue based on validation
    
    // Test too far future
    await yearInput.fill('2050');
    // Should either show error or disable continue
    
    // Test valid year
    const currentYear = new Date().getFullYear();
    await yearInput.fill((currentYear + 4).toString());
    await expect(continueButton).toBeEnabled();
  });

  test('handles concurrent onboarding sessions', async ({ page, context }) => {
    // Create two pages to simulate concurrent sessions
    const page2 = await context.newPage();
    
    // Mock successful login for both
    const mockLogin = async (route: any) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          dev: true,
          user: { userId: 'same-user', handle: 'testuser', role: 'student' }
        }),
      });
    };
    
    await page.route('/api/auth/send-magic-link', mockLogin);
    await page2.route('/api/auth/send-magic-link', mockLogin);
    
    // Start onboarding in both tabs
    await page.goto('/onboarding');
    await page2.goto('/onboarding');
    
    // Both should start normally
    await expect(page.locator('text=Welcome to HIVE')).toBeVisible();
    await expect(page2.locator('text=Welcome to HIVE')).toBeVisible();
    
    // Progress in first tab
    await page.click('button:has-text("Get Started")');
    
    // Try to progress in second tab - behavior depends on your session management
    await page2.click('button:has-text("Get Started")');
    
    // Both should handle this gracefully
    await expect(page.locator('text=Your Role, text=Select Your Role')).toBeVisible();
    await expect(page2.locator('text=Your Role, text=Select Your Role')).toBeVisible();
  });

  test('handles browser back/forward during onboarding', async ({ page }) => {
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
    
    // Progress through steps
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    // Fill name
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    await page.click('button:has-text("Continue")');
    
    // Use browser back button
    await page.goBack();
    
    // Should maintain state
    await expect(page.locator('input[placeholder*="First"]')).toHaveValue('Jane');
    
    // Use browser forward
    await page.goForward();
    
    // Should be at academics step
    await expect(page.locator('text=Academic Profile, text=Tell us about your studies')).toBeVisible();
  });

  test('handles page refresh during onboarding', async ({ page }) => {
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
    
    // Progress to name step and fill data
    await page.click('button:has-text("Get Started")');
    await page.click('button:has-text("Student")');
    await page.click('button:has-text("Continue")');
    
    await page.fill('input[placeholder*="First"]', 'Jane');
    await page.fill('input[placeholder*="Last"]', 'Doe');
    
    // Refresh page
    await page.reload();
    
    // Should handle gracefully - either maintain state or restart flow
    // Behavior depends on your implementation
    await expect(page.locator('text=Welcome to HIVE, text=Your Name')).toBeVisible();
  });

  test('handles localStorage quota exceeded', async ({ page }) => {
    // Fill localStorage to capacity (simulate quota exceeded)
    await page.addInitScript(() => {
      // Mock localStorage.setItem to throw quota exceeded error
      const originalSetItem = window.localStorage.setItem;
      window.localStorage.setItem = function(key: string, value: string) {
        if (key === 'hive_session') {
          throw new Error('QuotaExceededError');
        }
        return originalSetItem.call(this, key, value);
      };
    });

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

    await page.goto('/schools');
    await selectTestUniversity(page);
    
    await page.fill('input[placeholder*="@test.edu"]', 'test@test.edu');
    await page.click('button:has-text("Send magic link")');
    
    // Should handle gracefully - might show error or continue with session cookies
    // Behavior depends on your error handling implementation
  });

  test('handles authentication with disabled JavaScript', async ({ browser }) => {
    // Create context with disabled JavaScript
    const context = await browser.newContext({
      javaScriptEnabled: false,
    });
    const page = await context.newPage();
    
    await page.goto('/schools');
    
    // Should show basic HTML version or graceful degradation
    await expect(page.locator('text=Find your campus')).toBeVisible();
    
    // Form should still be functional for basic submission
    // This tests your progressive enhancement approach
    
    await context.close();
  });
});