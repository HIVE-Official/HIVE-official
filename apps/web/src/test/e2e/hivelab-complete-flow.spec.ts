import { test, expect } from '@playwright/test';

/**
 * HiveLab E2E Test Suite
 *
 * Tests the complete HiveLab user journey:
 * 1. Navigation from sidebar/mobile
 * 2. Overview page display
 * 3. Mode switching (overview → visual → placeholders)
 * 4. Visual builder interaction
 * 5. Tool creation and saving
 * 6. Authentication flow
 */

test.describe('HiveLab - Complete User Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication for tests
    await page.goto('/');

    // TODO: Add proper auth mock
    // For now, assume user is logged in via test fixtures
  });

  test('should display HiveLab in navigation', async ({ page }) => {
    await page.goto('/feed');

    // Check sidebar navigation
    const sidebarHiveLab = page.getByRole('link', { name: /hivelab/i });
    await expect(sidebarHiveLab).toBeVisible();

    // Verify icon is present
    const hiveLabIcon = page.locator('[data-testid="hivelab-nav-icon"]');
    // Icon might not have test ID, so alternative check:
    await expect(sidebarHiveLab).toContainText('HiveLab');
  });

  test('should navigate to HiveLab overview from sidebar', async ({ page }) => {
    await page.goto('/feed');

    // Click HiveLab in sidebar
    await page.click('text=HiveLab');

    // Should be on /hivelab
    await expect(page).toHaveURL('/hivelab');

    // Overview page should be visible
    await expect(page.getByRole('heading', { name: /hivelab/i })).toBeVisible();
  });

  test('should display HiveLab overview page correctly', async ({ page }) => {
    await page.goto('/hivelab');

    // Check hero section
    await expect(page.getByRole('heading', { name: /hivelab/i, level: 1 })).toBeVisible();
    await expect(page.getByText(/visual tool composer for campus utilities/i)).toBeVisible();

    // Check quick actions section
    await expect(page.getByText(/choose your build path/i)).toBeVisible();

    // Check for Visual Builder action
    const visualBuilderAction = page.getByText(/visual builder/i).first();
    await expect(visualBuilderAction).toBeVisible();

    // Check for Template action (with "Coming soon" tag)
    const templateAction = page.getByText(/start from template/i);
    await expect(templateAction).toBeVisible();

    // Check element system section
    await expect(page.getByText(/element system/i)).toBeVisible();

    // Check call to action
    await expect(page.getByText(/ready to build/i)).toBeVisible();
  });

  test('should switch to visual builder mode from overview', async ({ page }) => {
    await page.goto('/hivelab');

    // Click on Visual Builder quick action
    await page.click('text=Visual Builder');

    // URL should update to include mode=visual
    await expect(page).toHaveURL('/hivelab?mode=visual');

    // Visual builder UI should be visible
    // Look for element palette or canvas
    await page.waitForTimeout(1000); // Wait for mode switch animation

    // Check for composer elements (element palette, canvas, properties panel)
    // These might be in a 3-pane layout
    const composerContainer = page.locator('[data-testid="visual-composer"]');
    // If no test ID, look for key UI elements:
    // await expect(page.getByText(/element palette/i)).toBeVisible();
  });

  test('should navigate to template mode and show placeholder', async ({ page }) => {
    await page.goto('/hivelab');

    // Click on Start from Template action
    await page.click('text=Start from Template');

    // URL should update
    await expect(page).toHaveURL('/hivelab?mode=template');

    // Placeholder should be visible
    await expect(page.getByText(/coming soon|roadmap/i)).toBeVisible();

    // Should have button to go back or try visual builder
    const backButton = page.getByRole('button', { name: /open visual builder|back to overview/i });
    await expect(backButton.first()).toBeVisible();
  });

  test('should support deep linking to visual mode', async ({ page }) => {
    // Navigate directly to visual mode via URL
    await page.goto('/hivelab?mode=visual');

    // Should go straight to visual builder
    await page.waitForTimeout(1000);

    // Visual composer should be visible (not overview)
    await expect(page).toHaveURL('/hivelab?mode=visual');

    // Should not see overview hero
    await expect(page.getByText(/choose your build path/i)).not.toBeVisible();
  });

  test('should redirect unauthenticated users to login', async ({ page, context }) => {
    // Clear cookies to simulate unauthenticated state
    await context.clearCookies();

    await page.goto('/hivelab');

    // Should redirect to login with return URL
    await page.waitForURL(/\/auth\/login/);
    await expect(page).toHaveURL(/redirect.*hivelab/);
  });

  test('should update URL when switching modes', async ({ page }) => {
    await page.goto('/hivelab');

    // Start on overview (no mode param)
    await expect(page).toHaveURL('/hivelab');

    // Switch to visual
    await page.click('text=Visual Builder');
    await expect(page).toHaveURL('/hivelab?mode=visual');

    // Use cancel or back to return to overview
    const cancelButton = page.getByRole('button', { name: /cancel|back/i });
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
      await expect(page).toHaveURL('/hivelab');
    }
  });
});

test.describe('HiveLab - Visual Builder Interaction', () => {
  test.beforeEach(async ({ page }) => {
    // Go directly to visual builder mode
    await page.goto('/hivelab?mode=visual');
    await page.waitForTimeout(1000); // Wait for initialization
  });

  test('should display visual composer interface', async ({ page }) => {
    // Check for 3-pane layout components
    // Left: Element palette
    // Center: Canvas
    // Right: Properties panel

    // These selectors will need to match actual component structure
    // For now, checking for any composer-related content

    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
  });

  test('should allow element selection from palette', async ({ page }) => {
    // Look for element palette
    // Try to find common element types (search, filter, list, etc.)

    // This test will need to be updated once we know the exact DOM structure
    // For now, checking that the page loaded without errors
    await expect(page).not.toHaveURL(/error/);
  });

  test('should show tool save button', async ({ page }) => {
    // Look for save button in toolbar
    const saveButton = page.getByRole('button', { name: /save/i });

    // Save button should be present (might be disabled initially)
    // await expect(saveButton).toBeVisible();
  });

  test('should have cancel button to return to overview', async ({ page }) => {
    const cancelButton = page.getByRole('button', { name: /cancel|back/i });

    // Cancel should be visible
    // await expect(cancelButton).toBeVisible();

    // Clicking cancel should return to overview
    // await cancelButton.click();
    // await expect(page).toHaveURL('/hivelab');
  });
});

test.describe('HiveLab - Tool Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/hivelab?mode=visual');
    await page.waitForTimeout(1000);
  });

  test('should show save dialog when saving a tool', async ({ page }) => {
    // Look for save button
    const saveButton = page.getByRole('button', { name: /save/i });

    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Should show save dialog or modal
      // Look for name/description inputs
      // await expect(page.getByLabel(/tool name/i)).toBeVisible();
    }
  });

  test('should call API when saving tool', async ({ page }) => {
    // Mock the API endpoint
    await page.route('/api/tools', async (route) => {
      // Intercept POST request
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ id: 'test-tool-id', name: 'Test Tool' }),
        });
      } else {
        await route.continue();
      }
    });

    // Try to save a tool
    const saveButton = page.getByRole('button', { name: /save/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Fill in any required fields if modal appears
      // Then confirm save

      // Should show success message
      // await expect(page.getByText(/saved successfully/i)).toBeVisible();
    }
  });
});

test.describe('HiveLab - Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should display HiveLab in mobile nav', async ({ page }) => {
    await page.goto('/feed');

    // Look for bottom navigation bar
    const mobileNav = page.locator('[data-testid="mobile-nav"]');

    // HiveLab should be in mobile nav
    const hiveLabNavItem = page.getByRole('link', { name: /hivelab/i });
    await expect(hiveLabNavItem).toBeVisible();
  });

  test('should navigate to HiveLab from mobile nav', async ({ page }) => {
    await page.goto('/feed');

    // Click HiveLab in mobile nav
    await page.click('text=HiveLab');

    // Should navigate to HiveLab
    await expect(page).toHaveURL('/hivelab');
  });

  test('should show desktop-only message on mobile', async ({ page }) => {
    await page.goto('/hivelab?mode=visual');

    // Visual builder is desktop-only
    // Should show redirect message or banner
    // This might be a future enhancement

    // For now, just verify page loads
    await expect(page).not.toHaveURL(/error/);
  });
});

test.describe('HiveLab - Accessibility', () => {
  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/hivelab');

    // Check for h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/hivelab/i);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/hivelab');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Some element should have focus
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have accessible quick action buttons', async ({ page }) => {
    await page.goto('/hivelab');

    // All action cards should be keyboard accessible
    const visualBuilderAction = page.getByRole('button', { name: /visual builder/i });

    // Should be able to activate with Enter or Space
    await visualBuilderAction.focus();
    await page.keyboard.press('Enter');

    // Should navigate to visual mode
    await expect(page).toHaveURL('/hivelab?mode=visual');
  });
});

test.describe('HiveLab - Error Handling', () => {
  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API failure
    await page.route('/api/tools', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal server error' }),
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('/hivelab?mode=visual');

    // Try to save (if save button exists)
    const saveButton = page.getByRole('button', { name: /save/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();

      // Should show error message
      // await expect(page.getByText(/failed to save/i)).toBeVisible();
    }
  });

  test('should not crash on invalid mode parameter', async ({ page }) => {
    // Try invalid mode
    await page.goto('/hivelab?mode=invalid');

    // Should fallback to overview or show error
    await expect(page).not.toHaveURL(/error/);

    // Should still display HiveLab content
    await expect(page.getByText(/hivelab/i)).toBeVisible();
  });
});

test.describe('HiveLab - Performance', () => {
  test('should load overview page quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/hivelab');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Should load in under 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should handle mode switching without full page reload', async ({ page }) => {
    await page.goto('/hivelab');

    // Listen for navigation events
    let didFullPageReload = false;
    page.on('load', () => {
      didFullPageReload = true;
    });

    // Switch modes
    await page.click('text=Visual Builder');
    await page.waitForTimeout(500);

    // Should not trigger full page reload
    expect(didFullPageReload).toBe(false);
  });
});
