import { test, expect } from '@playwright/test';

test.describe('Complete HIVE User Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Set up development mode
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('dev_auth_mode', 'true');
    });
  });

  test('complete new user onboarding to active platform usage', async ({ page }) => {
    // Step 1: Landing page and school selection
    await test.step('Navigate to school selection', async () => {
      await page.goto('/');
      await expect(page.getByText('Welcome to HIVE')).toBeVisible();
      
      await page.click('text=Get Started');
      await expect(page).toHaveURL('/schools');
    });

    // Step 2: Select school and proceed to login
    await test.step('Select school and login', async () => {
      await page.click('[data-testid="school-card"]:has-text("Test University")');
      await expect(page).toHaveURL(/\/auth\/login/);
      
      // Fill email and send magic link
      await page.fill('input[type="email"]', 'newuser@test.edu');
      await page.click('button:has-text("Send magic link")');
      
      // In development mode, automatically proceed
      await expect(page).toHaveURL('/onboarding');
    });

    // Step 3: Complete onboarding wizard
    await test.step('Complete onboarding process', async () => {
      // Welcome step
      await expect(page.getByText('Welcome to HIVE')).toBeVisible();
      await page.click('button:has-text("Get Started")');

      // Name step
      await page.fill('input[placeholder*="first name"]', 'John');
      await page.fill('input[placeholder*="last name"]', 'Doe');
      await page.click('button:has-text("Continue")');

      // Handle step
      await page.fill('input[placeholder*="unique handle"]', 'johndoe2025');
      await page.click('button:has-text("Continue")');

      // Photo step (skip for now)
      await page.click('button:has-text("Skip for now")');

      // Builder step
      await expect(page.getByText('Request Management Access')).toBeVisible();
      await page.click('button:has-text("Request Builder Access")');
      await page.click('button:has-text("Continue")');

      // Legal step
      await page.check('input[type="checkbox"]:near(:text("Terms of Service"))');
      await page.check('input[type="checkbox"]:near(:text("Privacy Policy"))');
      await page.check('input[type="checkbox"]:near(:text("Community Guidelines"))');
      await page.click('button:has-text("Complete Onboarding")');

      // Should redirect to dashboard
      await expect(page).toHaveURL('/');
      await expect(page.getByText('Welcome to your HIVE dashboard')).toBeVisible();
    });

    // Step 4: Explore dashboard
    await test.step('Explore dashboard features', async () => {
      await expect(page.getByText('Campus Feed')).toBeVisible();
      await expect(page.getByText('Your Spaces')).toBeVisible();
      await expect(page.getByText('Recent Tools')).toBeVisible();
      
      // Check navigation is available
      await expect(page.getByText('Feed')).toBeVisible();
      await expect(page.getByText('Spaces')).toBeVisible();
      await expect(page.getByText('Tools')).toBeVisible();
      await expect(page.getByText('Profile')).toBeVisible();
    });

    // Step 5: Browse and join spaces
    await test.step('Browse and join spaces', async () => {
      await page.click('text=Spaces');
      await expect(page).toHaveURL('/spaces');
      
      await expect(page.getByText('Discover Spaces')).toBeVisible();
      
      // Find and join a study group
      const studyGroupCard = page.locator('[data-testid="space-card"]:has-text("Study Group")').first();
      await expect(studyGroupCard).toBeVisible();
      
      await studyGroupCard.locator('button:has-text("Join Space")').click();
      await expect(page.getByText('Successfully joined')).toBeVisible();
      
      // Navigate to the space
      await studyGroupCard.click();
      await expect(page).toHaveURL(/\/spaces\/[\w-]+/);
      await expect(page.getByText('Space Feed')).toBeVisible();
    });

    // Step 6: Create and share a tool
    await test.step('Create and share a tool', async () => {
      await page.click('text=Tools');
      await expect(page).toHaveURL('/tools');
      
      await page.click('button:has-text("Create Tool")');
      
      // Fill tool creation form
      await page.fill('input[placeholder*="tool name"]', 'Grade Calculator');
      await page.fill('textarea[placeholder*="description"]', 'A simple calculator for computing semester grades');
      
      // Select tool type
      await page.click('select[name="toolType"]');
      await page.selectOption('select[name="toolType"]', 'calculator');
      
      // Save tool
      await page.click('button:has-text("Create Tool")');
      
      await expect(page.getByText('Tool created successfully')).toBeVisible();
      await expect(page).toHaveURL(/\/tools\/[\w-]+\/edit/);
    });

    // Step 7: Update profile
    await test.step('Customize profile', async () => {
      await page.click('text=Profile');
      await expect(page).toHaveURL('/profile');
      
      await expect(page.getByText('John Doe')).toBeVisible();
      await expect(page.getByText('@johndoe2025')).toBeVisible();
      
      // Edit profile
      await page.click('button:has-text("Edit Profile")');
      
      await page.fill('textarea[placeholder*="bio"]', 'Computer Science student passionate about coding and collaborative learning.');
      await page.click('button:has-text("Save Changes")');
      
      await expect(page.getByText('Profile updated successfully')).toBeVisible();
    });

    // Step 8: Check feed activity
    await test.step('Review personalized feed', async () => {
      await page.click('text=Feed');
      await expect(page).toHaveURL('/feed');
      
      // Should show activity from joined spaces and created tools
      await expect(page.getByText('Campus Feed')).toBeVisible();
      
      // Look for activity related to our actions
      const feedItems = page.locator('[data-testid="feed-item"]');
      await expect(feedItems.first()).toBeVisible();
      
      // Check that our tool creation shows up
      await expect(page.getByText('Grade Calculator')).toBeVisible();
    });

    // Step 9: Test real-time features
    await test.step('Test real-time notifications', async () => {
      // Simulate receiving a notification
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('notification', {
          detail: {
            type: 'space_invite',
            message: 'You were invited to join Advanced Algorithms Study Group',
            from: 'alice@test.edu'
          }
        }));
      });

      // Check notification appears
      await expect(page.getByText('You were invited to join')).toBeVisible();
    });

    // Step 10: Test search and discovery
    await test.step('Test platform search', async () => {
      // Use command palette (Cmd+K)
      await page.keyboard.press('Meta+k');
      
      await expect(page.getByPlaceholder('Search spaces, tools, people...')).toBeVisible();
      
      await page.fill('input[placeholder*="Search"]', 'calculator');
      
      // Should find our created tool
      await expect(page.getByText('Grade Calculator')).toBeVisible();
      
      // Select and navigate
      await page.click('text=Grade Calculator');
      await expect(page).toHaveURL(/\/tools\/[\w-]+/);
    });
  });

  test('faculty user gets simplified onboarding flow', async ({ page }) => {
    await test.step('Faculty login and onboarding', async () => {
      await page.goto('/schools');
      await page.click('[data-testid="school-card"]:has-text("Test University")');
      
      await page.fill('input[type="email"]', 'professor@test.edu');
      await page.click('button:has-text("Send magic link")');
      
      await expect(page).toHaveURL('/onboarding');
      
      // Welcome step
      await page.click('button:has-text("Get Started")');
      
      // Should detect faculty email and show simplified flow
      await expect(page.getByText('Faculty Setup')).toBeVisible();
      await expect(page.getByText('Simplified setup for faculty members')).toBeVisible();
      
      // Name step
      await page.fill('input[placeholder*="name"]', 'Dr. Jane Smith');
      await page.fill('input[placeholder*="department"]', 'Computer Science');
      await page.click('button:has-text("Continue")');
      
      // Handle step
      await page.fill('input[placeholder*="handle"]', 'profsmith');
      await page.click('button:has-text("Continue")');
      
      // Legal step (streamlined)
      await page.check('input[type="checkbox"]:near(:text("Faculty Agreement"))');
      await page.click('button:has-text("Complete Setup")');
      
      // Should go to faculty dashboard
      await expect(page).toHaveURL('/');
      await expect(page.getByText('Faculty Dashboard')).toBeVisible();
    });
  });

  test('handles network failures gracefully', async ({ page }) => {
    await test.step('Test offline resilience', async () => {
      await page.goto('/schools');
      await page.click('[data-testid="school-card"]:has-text("Test University")');
      await page.fill('input[type="email"]', 'resilient@test.edu');
      
      // Go offline
      await page.context().setOffline(true);
      
      await page.click('button:has-text("Send magic link")');
      
      // Should show offline message
      await expect(page.getByText('Connection lost')).toBeVisible();
      await expect(page.getByText('Retrying...')).toBeVisible();
      
      // Go back online
      await page.context().setOffline(false);
      
      // Should automatically retry and succeed
      await expect(page).toHaveURL('/onboarding', { timeout: 10000 });
    });
  });

  test('maintains state during browser refresh', async ({ page }) => {
    await test.step('Test state persistence', async () => {
      // Start onboarding
      await page.goto('/schools');
      await page.click('[data-testid="school-card"]:has-text("Test University")');
      await page.fill('input[type="email"]', 'persistent@test.edu');
      await page.click('button:has-text("Send magic link")');
      
      await expect(page).toHaveURL('/onboarding');
      
      // Fill some steps
      await page.click('button:has-text("Get Started")');
      await page.fill('input[placeholder*="first name"]', 'Persistent');
      await page.fill('input[placeholder*="last name"]', 'User');
      await page.click('button:has-text("Continue")');
      
      // Refresh browser
      await page.reload();
      
      // Should maintain progress
      await expect(page.getByDisplayValue('Persistent')).toBeVisible();
      await expect(page.getByDisplayValue('User')).toBeVisible();
      
      // Should be able to continue
      await page.click('button:has-text("Continue")');
      await expect(page.getByText('Choose Handle')).toBeVisible();
    });
  });

  test('cross-browser compatibility', async ({ page, browserName }) => {
    await test.step(`Test in ${browserName}`, async () => {
      await page.goto('/');
      
      // Test basic functionality works across browsers
      await expect(page.getByText('Welcome to HIVE')).toBeVisible();
      
      await page.click('text=Get Started');
      await expect(page).toHaveURL('/schools');
      
      // Test responsive design
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await expect(page.getByText('Find Your School')).toBeVisible();
      
      await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
      await expect(page.getByText('Find Your School')).toBeVisible();
    });
  });

  test('accessibility compliance throughout journey', async ({ page }) => {
    await test.step('Test keyboard navigation', async () => {
      await page.goto('/schools');
      
      // Test tab navigation
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      
      // Should work with keyboard only
      await expect(page).toHaveURL(/\/auth\/login/);
    });

    await test.step('Test screen reader support', async () => {
      await page.goto('/onboarding');
      
      // Check for proper ARIA labels
      const nameInput = page.getByLabel(/first name/i);
      await expect(nameInput).toHaveAttribute('aria-required', 'true');
      
      const continueButton = page.getByRole('button', { name: /continue/i });
      await expect(continueButton).toBeVisible();
    });
  });

  test('performance under load', async ({ page }) => {
    await test.step('Test page load performance', async () => {
      const startTime = Date.now();
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
    });

    await test.step('Test navigation performance', async () => {
      await page.goto('/');
      
      const navigationTimes = [];
      const routes = ['/spaces', '/tools', '/profile', '/feed'];
      
      for (const route of routes) {
        const startTime = Date.now();
        await page.goto(route);
        await page.waitForLoadState('networkidle');
        const navTime = Date.now() - startTime;
        navigationTimes.push(navTime);
      }
      
      const avgNavTime = navigationTimes.reduce((a, b) => a + b, 0) / navigationTimes.length;
      expect(avgNavTime).toBeLessThan(1500); // Average navigation should be under 1.5s
    });
  });
});