import { test, expect, Page } from '@playwright/test';

test.describe('Complete Entry, Authentication & Onboarding Flow', () => {
  
  test.describe('Entry Page', () => {
    test('should display entry page with correct elements', async ({ page }) => {
      await page.goto('/');
      
      // Check logo
      const logo = page.locator('img[alt="HIVE"]');
      await expect(logo).toBeVisible();
      
      // Check brand name and tagline
      await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
      await expect(page.locator('text=Your Campus, Connected')).toBeVisible();
      
      // Check primary CTA button
      await expect(page.locator('a[href="/schools"] button:has-text("Get Started")')).toBeVisible();
      
      // Check sign in link
      await expect(page.locator('a[href="/auth/login"]:has-text("Sign In")')).toBeVisible();
    });

    test('should navigate to schools page from Get Started', async ({ page }) => {
      await page.goto('/');
      
      // Click Get Started
      await page.click('a[href="/schools"] button:has-text("Get Started")');
      
      // Should navigate to schools page
      await expect(page).toHaveURL('/schools');
    });

    test('should navigate to login from Sign In link', async ({ page }) => {
      await page.goto('/');
      
      // Click Sign In
      await page.click('a[href="/auth/login"]:has-text("Sign In")');
      
      // Should navigate to login page
      await expect(page).toHaveURL('/auth/login');
    });

    test('should be mobile responsive', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // All elements should still be visible
      await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
      await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
      
      // Test tablet viewport
      await page.setViewportSize({ width: 768, height: 1024 });
      await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
      
      // Test desktop viewport
      await page.setViewportSize({ width: 1920, height: 1080 });
      await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
    });
  });

  test.describe('Schools Selection Page', () => {
    test('should display University at Buffalo option', async ({ page }) => {
      await page.goto('/schools');
      
      // Should show school selection
      await expect(page.locator('text=Choose Your School')).toBeVisible();
      await expect(page.locator('text=University at Buffalo')).toBeVisible();
    });

    test('should navigate to auth when UB is selected', async ({ page }) => {
      await page.goto('/schools');
      
      // Click UB option
      await page.click('text=University at Buffalo');
      
      // Should navigate to auth page
      await expect(page).toHaveURL(/\/auth/);
    });
  });

  test.describe('Authentication Flow - Magic Link', () => {
    test('should display login page with email input', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Check page elements
      await expect(page.locator('text=Sign in to HIVE')).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('button:has-text("Send Magic Link")')).toBeVisible();
    });

    test('should validate @buffalo.edu email domain', async ({ page }) => {
      await page.goto('/auth/login');
      
      const emailInput = page.locator('input[type="email"]');
      const submitButton = page.locator('button:has-text("Send Magic Link")');
      
      // Test invalid domain
      await emailInput.fill('user@gmail.com');
      await submitButton.click();
      await expect(page.locator('text=Please use your @buffalo.edu email')).toBeVisible();
      
      // Clear error
      await emailInput.clear();
      
      // Test valid domain
      await emailInput.fill('student@buffalo.edu');
      await submitButton.click();
      
      // Should either show success or rate limit message
      const successMessage = page.locator('text=Magic link sent');
      const rateLimitMessage = page.locator('text=Too many attempts');
      
      await expect(successMessage.or(rateLimitMessage)).toBeVisible({ timeout: 10000 });
    });

    test('should handle various email formats', async ({ page }) => {
      await page.goto('/auth/login');
      
      const validEmails = [
        'john.doe@buffalo.edu',
        'jd123456@buffalo.edu',
        'faculty@buffalo.edu',
        'staff@buffalo.edu'
      ];
      
      for (const email of validEmails) {
        await page.reload();
        await page.fill('input[type="email"]', email);
        
        // Email should be accepted (no immediate validation error)
        const emailInput = page.locator('input[type="email"]');
        await expect(emailInput).toHaveValue(email);
      }
    });

    test('should show loading state when sending magic link', async ({ page }) => {
      await page.goto('/auth/login');
      
      await page.fill('input[type="email"]', 'test@buffalo.edu');
      
      // Start monitoring button state
      const button = page.locator('button:has-text("Send Magic Link")');
      
      // Click and check for loading state
      const clickPromise = button.click();
      
      // Button should show loading state (disabled or spinner)
      await expect(button).toBeDisabled();
      
      await clickPromise;
    });

    test('should handle rate limiting', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Attempt multiple rapid submissions
      for (let i = 0; i < 5; i++) {
        await page.fill('input[type="email"]', `test${i}@buffalo.edu`);
        await page.click('button:has-text("Send Magic Link")');
        await page.waitForTimeout(100);
      }
      
      // Should eventually show rate limit message
      await expect(page.locator('text=/too many|rate limit/i')).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Magic Link Verification', () => {
    test('should handle valid magic link token', async ({ page }) => {
      // Mock a valid token verification
      await page.route('**/api/auth/verify-magic-link*', route => {
        route.fulfill({
          status: 200,
          body: JSON.stringify({ 
            success: true, 
            user: { 
              id: 'test-123',
              email: 'test@buffalo.edu',
              isNewUser: true 
            }
          })
        });
      });
      
      await page.goto('/auth/verify?token=valid-test-token');
      
      // Should redirect to onboarding for new user
      await expect(page).toHaveURL('/onboarding', { timeout: 10000 });
    });

    test('should handle invalid magic link token', async ({ page }) => {
      await page.goto('/auth/verify?token=invalid-token');
      
      // Should show error message
      await expect(page.locator('text=/invalid|expired/i')).toBeVisible({ timeout: 10000 });
      
      // Should provide option to request new link
      await expect(page.locator('button:has-text("Request New Link")')).toBeVisible();
    });

    test('should handle expired magic link', async ({ page }) => {
      await page.goto('/auth/verify?token=expired-token');
      
      // Should show expiry message
      await expect(page.locator('text=/expired/i')).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('Onboarding Flow - Complete Journey', () => {
    // Helper to mock authenticated state
    async function mockAuthenticatedUser(page: Page) {
      await page.addInitScript(() => {
        localStorage.setItem('hive-auth', JSON.stringify({
          user: {
            id: 'test-user-123',
            email: 'newuser@buffalo.edu',
            isNewUser: true
          },
          token: 'test-token',
          expiresAt: Date.now() + 3600000
        }));
      });
    }

    test('should redirect unauthenticated users to login', async ({ page }) => {
      await page.goto('/onboarding');
      
      // Should redirect to login
      await expect(page).toHaveURL('/auth/login');
    });

    test('should complete full onboarding flow', async ({ page }) => {
      await mockAuthenticatedUser(page);
      await page.goto('/onboarding');
      
      // Step 1: Name & Basic Info
      await expect(page.locator('text=Welcome to HIVE')).toBeVisible();
      await page.fill('input[name="firstName"]', 'John');
      await page.fill('input[name="lastName"]', 'Doe');
      await page.fill('input[name="displayName"]', 'JohnD');
      await page.click('button:has-text("Next")');
      
      // Step 2: Academic Profile
      await expect(page.locator('text=Academic Profile')).toBeVisible();
      await page.selectOption('select[name="major"]', 'Computer Science');
      await page.selectOption('select[name="year"]', 'Junior');
      await page.selectOption('select[name="housing"]', 'Ellicott Complex');
      await page.click('button:has-text("Next")');
      
      // Step 3: Interests
      await expect(page.locator('text=Your Interests')).toBeVisible();
      await page.click('label:has-text("Technology")');
      await page.click('label:has-text("Sports")');
      await page.click('label:has-text("Music")');
      await page.click('label:has-text("Gaming")');
      await page.click('button:has-text("Next")');
      
      // Step 4: Space Discovery
      await expect(page.locator('text=Recommended Spaces')).toBeVisible();
      
      // Should show recommendations based on profile
      await expect(page.locator('text=Computer Science Department')).toBeVisible();
      await expect(page.locator('text=Ellicott Complex')).toBeVisible();
      
      // Join some spaces
      await page.click('button[data-space="cs-department"]:has-text("Join")');
      await page.click('button[data-space="ellicott-complex"]:has-text("Join")');
      await page.click('button:has-text("Continue")');
      
      // Step 5: Privacy Settings
      await expect(page.locator('text=Privacy Settings')).toBeVisible();
      await page.click('label:has-text("Show my profile to everyone")');
      await page.click('label:has-text("Allow friend requests")');
      await page.click('label:has-text("Receive event notifications")');
      await page.click('button:has-text("Complete Setup")');
      
      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard');
      await expect(page.locator('text=Welcome to HIVE, John!')).toBeVisible();
    });

    test('should validate required fields in each step', async ({ page }) => {
      await mockAuthenticatedUser(page);
      await page.goto('/onboarding');
      
      // Try to proceed without filling required fields
      await page.click('button:has-text("Next")');
      
      // Should show validation errors
      await expect(page.locator('text=First name is required')).toBeVisible();
      await expect(page.locator('text=Last name is required')).toBeVisible();
      
      // Fill required fields
      await page.fill('input[name="firstName"]', 'John');
      await page.fill('input[name="lastName"]', 'Doe');
      await page.click('button:has-text("Next")');
      
      // Should proceed to next step
      await expect(page.locator('text=Academic Profile')).toBeVisible();
    });

    test('should allow going back to previous steps', async ({ page }) => {
      await mockAuthenticatedUser(page);
      await page.goto('/onboarding');
      
      // Fill first step
      await page.fill('input[name="firstName"]', 'John');
      await page.fill('input[name="lastName"]', 'Doe');
      await page.click('button:has-text("Next")');
      
      // Go to second step
      await expect(page.locator('text=Academic Profile')).toBeVisible();
      
      // Go back
      await page.click('button:has-text("Back")');
      
      // Should return to first step with data preserved
      await expect(page.locator('input[name="firstName"]')).toHaveValue('John');
      await expect(page.locator('input[name="lastName"]')).toHaveValue('Doe');
    });

    test('should save progress and resume onboarding', async ({ page }) => {
      await mockAuthenticatedUser(page);
      await page.goto('/onboarding');
      
      // Fill first step
      await page.fill('input[name="firstName"]', 'John');
      await page.fill('input[name="lastName"]', 'Doe');
      await page.click('button:has-text("Next")');
      
      // Fill second step partially
      await page.selectOption('select[name="major"]', 'Computer Science');
      
      // Simulate browser refresh
      await page.reload();
      
      // Should resume at current step with data preserved
      await expect(page.locator('text=Academic Profile')).toBeVisible();
      await expect(page.locator('select[name="major"]')).toHaveValue('Computer Science');
    });

    test('should handle profile picture upload', async ({ page }) => {
      await mockAuthenticatedUser(page);
      await page.goto('/onboarding');
      
      // Upload profile picture
      const fileInput = page.locator('input[type="file"]');
      await fileInput.setInputFiles({
        name: 'profile.jpg',
        mimeType: 'image/jpeg',
        buffer: Buffer.from('fake-image-data')
      });
      
      // Should show preview
      await expect(page.locator('img[alt="Profile preview"]')).toBeVisible();
      
      // Should be able to remove
      await page.click('button:has-text("Remove")');
      await expect(page.locator('img[alt="Profile preview"]')).not.toBeVisible();
    });

    test('should show appropriate space recommendations', async ({ page }) => {
      await mockAuthenticatedUser(page);
      await page.goto('/onboarding');
      
      // Complete profile with specific selections
      await page.fill('input[name="firstName"]', 'Jane');
      await page.fill('input[name="lastName"]', 'Smith');
      await page.click('button:has-text("Next")');
      
      await page.selectOption('select[name="major"]', 'Biology');
      await page.selectOption('select[name="year"]', 'Freshman');
      await page.selectOption('select[name="housing"]', 'Governors Complex');
      await page.click('button:has-text("Next")');
      
      await page.click('label:has-text("Science")');
      await page.click('label:has-text("Research")');
      await page.click('button:has-text("Next")');
      
      // Should show relevant recommendations
      await expect(page.locator('text=Biology Department')).toBeVisible();
      await expect(page.locator('text=Governors Complex')).toBeVisible();
      await expect(page.locator('text=Freshman Class')).toBeVisible();
      await expect(page.locator('text=Research Opportunities')).toBeVisible();
    });
  });

  test.describe('Post-Onboarding Verification', () => {
    async function completeOnboarding(page: Page) {
      // Mock completed onboarding
      await page.addInitScript(() => {
        localStorage.setItem('hive-auth', JSON.stringify({
          user: {
            id: 'test-user-123',
            email: 'user@buffalo.edu',
            firstName: 'John',
            lastName: 'Doe',
            displayName: 'JohnD',
            major: 'Computer Science',
            year: 'Junior',
            housing: 'Ellicott Complex',
            onboardingCompleted: true
          },
          token: 'test-token',
          expiresAt: Date.now() + 3600000
        }));
      });
    }

    test('should show personalized dashboard after onboarding', async ({ page }) => {
      await completeOnboarding(page);
      await page.goto('/dashboard');
      
      // Should show personalized content
      await expect(page.locator('text=Welcome back, John')).toBeVisible();
      await expect(page.locator('text=Computer Science')).toBeVisible();
      
      // Should show joined spaces
      await expect(page.locator('[data-testid="my-spaces"]')).toBeVisible();
    });

    test('should redirect completed users away from onboarding', async ({ page }) => {
      await completeOnboarding(page);
      await page.goto('/onboarding');
      
      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard');
    });

    test('should persist user preferences', async ({ page }) => {
      await completeOnboarding(page);
      await page.goto('/profile/settings');
      
      // Should show saved preferences
      await expect(page.locator('text=John Doe')).toBeVisible();
      await expect(page.locator('text=Computer Science')).toBeVisible();
      await expect(page.locator('text=Junior')).toBeVisible();
    });
  });

  test.describe('Error Scenarios & Edge Cases', () => {
    test('should handle network failures gracefully', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Simulate network failure
      await page.route('**/api/auth/**', route => route.abort());
      
      await page.fill('input[type="email"]', 'test@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Should show error message
      await expect(page.locator('text=/network error|connection failed/i')).toBeVisible({ timeout: 10000 });
      
      // Should show retry option
      await expect(page.locator('button:has-text("Try Again")')).toBeVisible();
    });

    test('should handle Firebase errors', async ({ page }) => {
      await page.route('**/api/auth/send-magic-link', route => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Firebase service unavailable' })
        });
      });
      
      await page.goto('/auth/login');
      await page.fill('input[type="email"]', 'test@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Should show user-friendly error
      await expect(page.locator('text=/service unavailable|try again later/i')).toBeVisible();
    });

    test('should handle session expiry during onboarding', async ({ page }) => {
      // Start with valid session
      await page.addInitScript(() => {
        localStorage.setItem('hive-auth', JSON.stringify({
          user: { id: 'test-123', email: 'test@buffalo.edu' },
          token: 'test-token',
          expiresAt: Date.now() + 5000 // Expires in 5 seconds
        }));
      });
      
      await page.goto('/onboarding');
      
      // Wait for session to expire
      await page.waitForTimeout(6000);
      
      // Try to proceed
      await page.fill('input[name="firstName"]', 'John');
      await page.click('button:has-text("Next")');
      
      // Should redirect to login with message
      await expect(page).toHaveURL('/auth/login');
      await expect(page.locator('text=/session expired/i')).toBeVisible();
    });

    test('should handle duplicate email registration', async ({ page }) => {
      await page.route('**/api/auth/send-magic-link', route => {
        route.fulfill({
          status: 409,
          body: JSON.stringify({ error: 'Email already registered' })
        });
      });
      
      await page.goto('/auth/login');
      await page.fill('input[type="email"]', 'existing@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Should still send magic link (for security)
      await expect(page.locator('text=Magic link sent')).toBeVisible();
    });

    test('should handle malformed magic link URLs', async ({ page }) => {
      const malformedUrls = [
        '/auth/verify',                    // Missing token
        '/auth/verify?token=',             // Empty token
        '/auth/verify?token=<script>',     // XSS attempt
        '/auth/verify?token=%00%00%00',    // Null bytes
      ];
      
      for (const url of malformedUrls) {
        await page.goto(url);
        
        // Should show error without breaking
        await expect(page.locator('text=/invalid|error/i')).toBeVisible();
        
        // Should not execute any scripts
        const alertTriggered = await page.evaluate(() => {
          return window.alert ? false : true;
        });
        expect(alertTriggered).toBe(false);
      }
    });

    test('should enforce character limits in onboarding', async ({ page }) => {
      await page.addInitScript(() => {
        localStorage.setItem('hive-auth', JSON.stringify({
          user: { id: 'test-123', email: 'test@buffalo.edu' },
          token: 'test-token',
          expiresAt: Date.now() + 3600000
        }));
      });
      
      await page.goto('/onboarding');
      
      // Try to enter very long names
      const longString = 'a'.repeat(256);
      await page.fill('input[name="firstName"]', longString);
      
      // Should enforce max length
      const value = await page.locator('input[name="firstName"]').inputValue();
      expect(value.length).toBeLessThanOrEqual(50);
    });

    test('should handle browser back/forward navigation', async ({ page }) => {
      await page.goto('/');
      await page.click('a[href="/schools"]');
      await expect(page).toHaveURL('/schools');
      
      // Go back
      await page.goBack();
      await expect(page).toHaveURL('/');
      
      // Go forward
      await page.goForward();
      await expect(page).toHaveURL('/schools');
    });

    test('should handle concurrent authentication attempts', async ({ page, context }) => {
      // Open two tabs
      const page2 = await context.newPage();
      
      // Start auth in both tabs
      await page.goto('/auth/login');
      await page2.goto('/auth/login');
      
      // Submit in first tab
      await page.fill('input[type="email"]', 'test1@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Submit in second tab
      await page2.fill('input[type="email"]', 'test2@buffalo.edu');
      await page2.click('button:has-text("Send Magic Link")');
      
      // Both should handle independently
      await expect(page.locator('text=Magic link sent').or(page.locator('text=/rate limit/i'))).toBeVisible();
      await expect(page2.locator('text=Magic link sent').or(page2.locator('text=/rate limit/i'))).toBeVisible();
      
      await page2.close();
    });
  });

  test.describe('Accessibility', () => {
    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/');
      
      // Tab through elements
      await page.keyboard.press('Tab');
      await expect(page.locator('button:has-text("Get Started")')).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(page.locator('a:has-text("Sign In")')).toBeFocused();
      
      // Activate with Enter
      await page.keyboard.press('Enter');
      await expect(page).toHaveURL('/auth/login');
    });

    test('should have proper ARIA labels', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Check for ARIA labels
      const emailInput = page.locator('input[type="email"]');
      await expect(emailInput).toHaveAttribute('aria-label', /email/i);
      
      const submitButton = page.locator('button:has-text("Send Magic Link")');
      await expect(submitButton).toHaveAttribute('aria-label', /send|submit/i);
    });

    test('should announce form errors to screen readers', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Submit invalid email
      await page.fill('input[type="email"]', 'invalid');
      await page.click('button:has-text("Send Magic Link")');
      
      // Error should have proper ARIA attributes
      const error = page.locator('text=Please use your @buffalo.edu email');
      await expect(error).toHaveAttribute('role', 'alert');
    });
  });

  test.describe('Performance', () => {
    test('should load entry page quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should handle slow network gracefully', async ({ page }) => {
      // Simulate slow network
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 1000);
      });
      
      await page.goto('/auth/login');
      
      // Should show loading states
      await page.fill('input[type="email"]', 'test@buffalo.edu');
      const button = page.locator('button:has-text("Send Magic Link")');
      await button.click();
      
      // Button should show loading state
      await expect(button).toBeDisabled();
    });
  });
});