import { test, expect } from '@playwright/test';
import { randomBytes } from 'crypto';

test.describe('HIVE Authentication and Onboarding Flow', () => {
  const testEmail = `test.student+${randomBytes(4).toString('hex')}@buffalo.edu`;
  const testHandle = `teststudent${randomBytes(4).toString('hex')}`;
  
  test('Complete auth and onboarding journey', async ({ page }) => {
    // Step 1: Navigate to homepage
    await test.step('Navigate to HIVE homepage', async () => {
      await page.goto('/');
      await expect(page).toHaveTitle(/HIVE/);
      
      // Check for main CTA
      const getStartedButton = page.getByRole('button', { name: /get started|join hive/i });
      await expect(getStartedButton).toBeVisible();
      await getStartedButton.click();
    });

    // Step 2: Start authentication flow
    await test.step('Start authentication with school email', async () => {
      // Should redirect to auth page
      await expect(page).toHaveURL(/\/auth/);
      
      // Enter email
      const emailInput = page.getByPlaceholder(/email|@buffalo.edu/i);
      await expect(emailInput).toBeVisible();
      await emailInput.fill(testEmail);
      
      // Submit email for magic link
      const submitButton = page.getByRole('button', { name: /continue|send magic link|sign in/i });
      await expect(submitButton).toBeEnabled();
      await submitButton.click();
      
      // Should show check email message
      await expect(page.getByText(/check your email|magic link sent/i)).toBeVisible({ timeout: 10000 });
    });

    // Step 3: Simulate magic link click (since we can't access real email)
    await test.step('Simulate magic link verification', async () => {
      // In real scenario, we'd click the link from email
      // For testing, we'll navigate directly to verify endpoint with mock token
      const mockToken = 'test-magic-link-token';
      await page.goto(`/auth/verify?token=${mockToken}&email=${encodeURIComponent(testEmail)}`);
      
      // Should redirect to onboarding after verification
      await expect(page).toHaveURL(/\/onboarding/, { timeout: 10000 });
    });

    // Step 4: Complete onboarding - Name step
    await test.step('Complete onboarding - Name step', async () => {
      // Check we're on name step
      await expect(page.getByText(/what.*your name|tell us your name/i)).toBeVisible();
      
      const firstNameInput = page.getByPlaceholder(/first name/i);
      const lastNameInput = page.getByPlaceholder(/last name/i);
      
      await firstNameInput.fill('Test');
      await lastNameInput.fill('Student');
      
      const nextButton = page.getByRole('button', { name: /next|continue/i });
      await nextButton.click();
    });

    // Step 5: Handle selection
    await test.step('Complete onboarding - Handle step', async () => {
      await expect(page.getByText(/choose.*handle|username|@/i)).toBeVisible();
      
      const handleInput = page.getByPlaceholder(/handle|username/i);
      await handleInput.fill(testHandle);
      
      // Wait for availability check
      await page.waitForTimeout(1000);
      
      // Check for availability indicator
      const availableIndicator = page.getByText(/available|✓/i);
      await expect(availableIndicator).toBeVisible({ timeout: 5000 });
      
      await page.getByRole('button', { name: /next|continue/i }).click();
    });

    // Step 6: User type selection
    await test.step('Complete onboarding - User type', async () => {
      await expect(page.getByText(/are you|role|student.*faculty/i)).toBeVisible();
      
      // Select student option
      const studentOption = page.getByRole('button', { name: /student/i }).or(page.getByText(/student/i).first());
      await studentOption.click();
      
      await page.getByRole('button', { name: /next|continue/i }).click();
    });

    // Step 7: Interests selection
    await test.step('Complete onboarding - Interests', async () => {
      await expect(page.getByText(/interests|passionate about|topics/i)).toBeVisible();
      
      // Select a few interests
      const interests = ['Technology', 'Science', 'Design'];
      for (const interest of interests) {
        const interestButton = page.getByRole('button', { name: interest })
          .or(page.getByText(interest).first());
        if (await interestButton.isVisible()) {
          await interestButton.click();
        }
      }
      
      await page.getByRole('button', { name: /next|continue/i }).click();
    });

    // Step 8: Photo upload (optional - usually skipped)
    await test.step('Complete onboarding - Photo step', async () => {
      // Check if photo step exists
      const photoStep = page.getByText(/profile.*photo|avatar/i);
      if (await photoStep.isVisible({ timeout: 3000 }).catch(() => false)) {
        // Skip photo for now
        const skipButton = page.getByRole('button', { name: /skip|later/i });
        if (await skipButton.isVisible()) {
          await skipButton.click();
        } else {
          await page.getByRole('button', { name: /next|continue/i }).click();
        }
      }
    });

    // Step 9: Academic information
    await test.step('Complete onboarding - Academic info', async () => {
      const academicStep = page.getByText(/major|year|academic/i);
      if (await academicStep.isVisible({ timeout: 3000 }).catch(() => false)) {
        // Select major
        const majorSelect = page.getByRole('combobox', { name: /major/i })
          .or(page.getByPlaceholder(/major/i));
        if (await majorSelect.isVisible()) {
          await majorSelect.click();
          await page.getByRole('option', { name: /computer science/i }).first().click();
        }
        
        // Select year
        const yearSelect = page.getByRole('combobox', { name: /year/i })
          .or(page.getByPlaceholder(/year/i));
        if (await yearSelect.isVisible()) {
          await yearSelect.click();
          await page.getByRole('option', { name: /junior/i }).first().click();
        }
        
        await page.getByRole('button', { name: /next|continue|complete/i }).click();
      }
    });

    // Step 10: Complete onboarding
    await test.step('Complete onboarding and redirect to dashboard', async () => {
      // Look for completion message or final button
      const completeButton = page.getByRole('button', { name: /complete|finish|get started|enter hive/i });
      if (await completeButton.isVisible({ timeout: 3000 }).catch(() => false)) {
        await completeButton.click();
      }
      
      // Should redirect to dashboard
      await expect(page).toHaveURL(/\/(dashboard|home|feed|spaces)/, { timeout: 10000 });
    });

    // Step 11: Verify successful authentication
    await test.step('Verify user is authenticated', async () => {
      // Check for user menu or profile indicator
      const profileMenu = page.getByRole('button', { name: /profile|account|menu/i })
        .or(page.getByTestId('user-menu'))
        .or(page.locator('[aria-label*="profile"]'));
      
      await expect(profileMenu).toBeVisible({ timeout: 10000 });
      
      // Check for welcome message or user name
      const userName = page.getByText(/test student|welcome/i);
      if (await userName.isVisible({ timeout: 3000 }).catch(() => false)) {
        await expect(userName).toBeVisible();
      }
    });

    // Step 12: Verify session persistence
    await test.step('Verify session persistence', async () => {
      // Reload page
      await page.reload();
      
      // Should still be authenticated
      await expect(page).not.toHaveURL(/\/(auth|login|signin)/);
      
      // Profile menu should still be visible
      const profileMenu = page.getByRole('button', { name: /profile|account|menu/i })
        .or(page.getByTestId('user-menu'));
      await expect(profileMenu).toBeVisible({ timeout: 10000 });
    });

    // Step 13: Test navigation to key authenticated pages
    await test.step('Navigate to authenticated pages', async () => {
      // Navigate to Spaces
      await page.goto('/spaces');
      await expect(page).toHaveURL('/spaces');
      await expect(page.getByText(/spaces|communities/i)).toBeVisible();
      
      // Navigate to Profile
      await page.goto('/profile');
      await expect(page).toHaveURL(/\/profile/);
      
      // Navigate to Tools
      await page.goto('/tools');
      await expect(page).toHaveURL('/tools');
    });
  });

  test('Verify auth guards and redirects', async ({ page }) => {
    // Test unauthenticated access redirects
    await test.step('Verify protected routes redirect to auth', async () => {
      // Clear cookies to simulate logged out state
      await page.context().clearCookies();
      
      // Try to access protected route
      await page.goto('/dashboard');
      
      // Should redirect to auth
      await expect(page).toHaveURL(/\/(auth|login|signin)/, { timeout: 10000 });
    });
  });

  test('Test error handling in auth flow', async ({ page }) => {
    await test.step('Test invalid email domain', async () => {
      await page.goto('/auth');
      
      // Try non-Buffalo email
      const emailInput = page.getByPlaceholder(/email/i);
      await emailInput.fill('test@gmail.com');
      
      const submitButton = page.getByRole('button', { name: /continue|send|sign in/i });
      await submitButton.click();
      
      // Should show error message
      await expect(page.getByText(/buffalo\.edu|school email|not authorized/i)).toBeVisible({ timeout: 5000 });
    });
  });
});