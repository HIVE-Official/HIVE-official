import { test, expect, Page } from '@playwright/test';

test.describe('1️⃣ ONBOARDING & AUTH - Complete Flow Tests', () => {
  
  test.describe('Magic Link Authentication', () => {
    test('should send magic link for @buffalo.edu email', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Enter UB email
      await page.fill('input[type="email"]', 'testuser@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Verify success message
      await expect(page.locator('text=Magic link sent to testuser@buffalo.edu')).toBeVisible();
    });

    test('should reject non-UB email addresses', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Try non-UB email
      await page.fill('input[type="email"]', 'test@gmail.com');
      await page.click('button:has-text("Send Magic Link")');
      
      // Should show error
      await expect(page.locator('text=Please use your @buffalo.edu email')).toBeVisible();
    });

    test('should handle existing user login', async ({ page }) => {
      await page.goto('/auth/login');
      
      // Simulate returning user
      await page.fill('input[type="email"]', 'existing@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Should show different message for existing users
      await expect(page.locator('text=Welcome back!')).toBeVisible();
    });
  });

  test.describe('Onboarding Flow', () => {
    test('should complete full onboarding for new user', async ({ page }) => {
      // Start onboarding
      await page.goto('/onboarding');
      
      // Step 1: Academic Profile
      await page.selectOption('select[name="major"]', 'Computer Science');
      await page.selectOption('select[name="year"]', 'Junior');
      await page.selectOption('select[name="housing"]', 'Ellicott Complex');
      await page.click('button:has-text("Next")');
      
      // Step 2: Interest Selection
      await page.click('label:has-text("Tech & Programming")');
      await page.click('label:has-text("Sports & Fitness")');
      await page.click('label:has-text("Music & Arts")');
      await page.click('button:has-text("Next")');
      
      // Step 3: Space Discovery
      await expect(page.locator('text=Recommended Spaces')).toBeVisible();
      // Auto-join suggested spaces
      await page.click('button:has-text("Join All Recommended")');
      
      // Step 4: Privacy Settings
      await page.click('label:has-text("Show my profile to everyone")');
      await page.click('label:has-text("Receive event notifications")');
      await page.click('button:has-text("Complete Setup")');
      
      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard');
      await expect(page.locator('text=Welcome to HIVE!')).toBeVisible();
    });

    test('should save profile data to Firebase', async ({ page }) => {
      // Complete onboarding
      await page.goto('/onboarding');
      await page.selectOption('select[name="major"]', 'Computer Science');
      await page.selectOption('select[name="year"]', 'Junior');
      await page.click('button:has-text("Next")');
      await page.click('button:has-text("Complete Setup")');
      
      // Navigate to profile to verify saved data
      await page.goto('/profile');
      await expect(page.locator('text=Computer Science')).toBeVisible();
      await expect(page.locator('text=Junior')).toBeVisible();
    });

    test('should handle onboarding errors gracefully', async ({ page }) => {
      await page.goto('/onboarding');
      
      // Try to skip required fields
      await page.click('button:has-text("Next")');
      
      // Should show validation error
      await expect(page.locator('text=Please complete all required fields')).toBeVisible();
    });
  });

  test.describe('Authentication State Management', () => {
    test('should persist auth state across page refreshes', async ({ page }) => {
      // Login
      await page.goto('/auth/login');
      await page.fill('input[type="email"]', 'testuser@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Simulate magic link click (mock for testing)
      await page.goto('/auth/verify?token=mock-token');
      
      // Should be logged in
      await expect(page).toHaveURL('/dashboard');
      
      // Refresh page
      await page.reload();
      
      // Should still be logged in
      await expect(page).toHaveURL('/dashboard');
      await expect(page.locator('[data-testid="user-avatar"]')).toBeVisible();
    });

    test('should handle logout correctly', async ({ page }) => {
      // Assume logged in
      await page.goto('/dashboard');
      
      // Click profile menu
      await page.click('[data-testid="user-avatar"]');
      await page.click('button:has-text("Sign Out")');
      
      // Should redirect to login
      await expect(page).toHaveURL('/auth/login');
      
      // Try to access protected route
      await page.goto('/dashboard');
      
      // Should redirect back to login
      await expect(page).toHaveURL('/auth/login');
    });

    test('should handle session expiry', async ({ page }) => {
      // Login with expired session
      await page.evaluate(() => {
        localStorage.setItem('session', JSON.stringify({
          user: { id: '123', email: 'test@buffalo.edu' },
          expiresAt: Date.now() - 1000 // Expired
        }));
      });
      
      await page.goto('/dashboard');
      
      // Should redirect to login
      await expect(page).toHaveURL('/auth/login');
      await expect(page.locator('text=Session expired. Please login again.')).toBeVisible();
    });
  });

  test.describe('School Email Verification', () => {
    test('should verify @buffalo.edu domain', async ({ page }) => {
      await page.goto('/auth/login');
      
      const emailInput = page.locator('input[type="email"]');
      
      // Test valid UB email
      await emailInput.fill('student@buffalo.edu');
      await expect(page.locator('text=✓ Valid UB email')).toBeVisible();
      
      // Test invalid email
      await emailInput.clear();
      await emailInput.fill('student@gmail.com');
      await expect(page.locator('text=Please use your UB email')).toBeVisible();
    });

    test('should handle different UB email formats', async ({ page }) => {
      await page.goto('/auth/login');
      
      const validEmails = [
        'student@buffalo.edu',
        'faculty@buffalo.edu',
        'staff@buffalo.edu',
        'john.doe@buffalo.edu',
        'jd123456@buffalo.edu'
      ];
      
      for (const email of validEmails) {
        await page.fill('input[type="email"]', email);
        await page.click('button:has-text("Send Magic Link")');
        await expect(page.locator('text=Magic link sent')).toBeVisible();
        await page.reload(); // Reset for next test
      }
    });
  });

  test.describe('Privacy Settings Configuration', () => {
    test('should configure privacy settings during onboarding', async ({ page }) => {
      await page.goto('/onboarding/privacy');
      
      // Configure privacy options
      await page.click('label:has-text("Ghost Mode")');
      await page.click('label:has-text("Hide activity from non-friends")');
      await page.uncheck('label:has-text("Show online status")');
      
      await page.click('button:has-text("Save Privacy Settings")');
      
      // Verify settings saved
      await page.goto('/profile/settings');
      await expect(page.locator('input[name="ghostMode"]')).toBeChecked();
      await expect(page.locator('input[name="showOnlineStatus"]')).not.toBeChecked();
    });

    test('should apply Ghost Mode immediately', async ({ page }) => {
      // Enable Ghost Mode
      await page.goto('/profile/settings');
      await page.click('label:has-text("Ghost Mode")');
      await page.click('button:has-text("Save")');
      
      // Navigate to a space
      await page.goto('/spaces/cs-220-fall-2025');
      
      // User should appear as anonymous
      await expect(page.locator('[data-testid="user-status"]')).toContainText('Anonymous');
    });
  });

  test.describe('Initial Space Discovery & Auto-join', () => {
    test('should recommend spaces based on profile', async ({ page }) => {
      await page.goto('/onboarding');
      
      // Set profile
      await page.selectOption('select[name="major"]', 'Computer Science');
      await page.selectOption('select[name="housing"]', 'Ellicott Complex');
      await page.click('button:has-text("Next")');
      
      // Should see relevant recommendations
      await expect(page.locator('text=Computer Science Department')).toBeVisible();
      await expect(page.locator('text=Ellicott Complex')).toBeVisible();
      await expect(page.locator('text=CS Students')).toBeVisible();
    });

    test('should auto-join selected spaces', async ({ page }) => {
      await page.goto('/onboarding/spaces');
      
      // Select spaces to join
      await page.click('input[data-space-id="cs-department"]');
      await page.click('input[data-space-id="ellicott-complex"]');
      await page.click('button:has-text("Join Selected Spaces")');
      
      // Verify joined
      await page.goto('/spaces');
      await expect(page.locator('[data-testid="my-spaces"]')).toContainText('Computer Science Department');
      await expect(page.locator('[data-testid="my-spaces"]')).toContainText('Ellicott Complex');
    });
  });

  test.describe('Error Boundaries & Recovery', () => {
    test('should handle Firebase Auth errors', async ({ page }) => {
      // Simulate Firebase error
      await page.route('**/api/auth/send-magic-link', route => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Firebase Auth service unavailable' })
        });
      });
      
      await page.goto('/auth/login');
      await page.fill('input[type="email"]', 'test@buffalo.edu');
      await page.click('button:has-text("Send Magic Link")');
      
      // Should show error with retry option
      await expect(page.locator('text=Authentication service temporarily unavailable')).toBeVisible();
      await expect(page.locator('button:has-text("Try Again")')).toBeVisible();
    });

    test('should handle network errors during onboarding', async ({ page }) => {
      await page.goto('/onboarding');
      
      // Go offline during onboarding
      await page.context().setOffline(true);
      
      await page.selectOption('select[name="major"]', 'Computer Science');
      await page.click('button:has-text("Next")');
      
      // Should show offline message
      await expect(page.locator('text=You appear to be offline')).toBeVisible();
      
      // Go back online
      await page.context().setOffline(false);
      
      // Should allow retry
      await page.click('button:has-text("Retry")');
      await expect(page.locator('text=Interest Selection')).toBeVisible();
    });
  });

  test.describe('NextAuth Integration', () => {
    test('should integrate with NextAuth session', async ({ page }) => {
      await page.goto('/api/auth/session');
      
      // Check session structure
      const session = await page.textContent('body');
      const sessionData = JSON.parse(session || '{}');
      
      if (sessionData.user) {
        expect(sessionData.user).toHaveProperty('email');
        expect(sessionData.user.email).toContain('@buffalo.edu');
      }
    });

    test('should handle NextAuth callbacks', async ({ page }) => {
      // Test sign-in callback
      await page.goto('/api/auth/callback/email?token=test-token');
      
      // Should process callback and redirect
      await page.waitForURL('/dashboard');
      await expect(page.locator('[data-testid="user-avatar"]')).toBeVisible();
    });
  });
});

// Helper function to mock authentication
async function mockLogin(page: Page, email: string = 'test@buffalo.edu') {
  await page.evaluate((userEmail) => {
    localStorage.setItem('session', JSON.stringify({
      user: { 
        id: 'test-user-123',
        email: userEmail,
        name: 'Test User',
        major: 'Computer Science',
        year: 'Junior'
      },
      expiresAt: Date.now() + 3600000 // 1 hour from now
    }));
  }, email);
}