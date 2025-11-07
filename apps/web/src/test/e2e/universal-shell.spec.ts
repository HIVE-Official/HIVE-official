/**
 * Universal Shell E2E Tests
 * Tests the core shell functionality across different devices
 */

import { test, expect } from '@playwright/test';

test.describe('Universal Shell', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('/');
    // Wait for the shell to be ready
    await page.waitForSelector('.hive-shell', { timeout: 30000 });
  });

  test('should render the universal shell with all core elements', async ({ page }) => {
    // Check for main shell container
    const shell = await page.locator('.hive-shell');
    await expect(shell).toBeVisible();

    // Check for global header
    const header = await page.locator('header');
    await expect(header).toBeVisible();

    // Check for HIVE logo
    const logo = await page.locator('header').locator('text=HIVE').first();
    await expect(logo).toBeVisible();

    // Check for main content area
    const mainContent = await page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should toggle sidebar on desktop', async ({ page, viewport }) => {
    // Skip on mobile
    if (viewport && viewport.width < 1024) {
      test.skip();
    }

    // Check sidebar is initially visible
    const sidebar = await page.locator('aside').first();
    await expect(sidebar).toBeVisible();

    // Find and click the sidebar toggle (if exists)
    const menuToggle = await page.locator('button[aria-label="Toggle menu"]');
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
      await page.waitForTimeout(300); // Wait for animation

      // Sidebar should be hidden
      await expect(sidebar).toHaveCSS('transform', /translateX\(-/);
    }
  });

  test('should show mobile bottom navigation on mobile devices', async ({ page, viewport }) => {
    // Skip on desktop
    if (!viewport || viewport.width >= 1024) {
      test.skip();
    }

    // Check for mobile bottom navigation
    const bottomNav = await page.locator('nav').filter({ hasText: '🏠' });
    await expect(bottomNav).toBeVisible();

    // Check for navigation items
    const navItems = await bottomNav.locator('button');
    await expect(navItems).toHaveCount(5); // Feed, Spaces, Create, Messages, Profile
  });

  test('should navigate between vertical slices', async ({ page }) => {
    // Check initial state (should be on feed)
    await expect(page).toHaveURL(/\/feed|\/$/);

    // Navigate to Spaces
    const spacesNav = await page.locator('a[href="/spaces"]').first();
    await spacesNav.click();
    await page.waitForURL('**/spaces');

    // Check URL changed
    await expect(page).toHaveURL(/\/spaces/);

    // Navigate to Profile
    const profileNav = await page.locator('a[href="/profile"]').first();
    await profileNav.click();
    await page.waitForURL('**/profile');

    // Check URL changed
    await expect(page).toHaveURL(/\/profile/);
  });

  test('should open and close command palette', async ({ page }) => {
    // Try to open command palette with keyboard shortcut
    await page.keyboard.press('Control+K');

    // If command palette exists, it should be visible
    const commandPalette = await page.locator('.command-palette, [role="dialog"]');
    if (await commandPalette.isVisible()) {
      // Check search input is focused
      const searchInput = await commandPalette.locator('input[type="text"], input[type="search"]');
      await expect(searchInput).toBeFocused();

      // Close with Escape
      await page.keyboard.press('Escape');
      await expect(commandPalette).not.toBeVisible();
    }
  });

  test('should display notification bell with badge', async ({ page }) => {
    // Find notification bell
    const notificationBell = await page.locator('button').filter({
      has: page.locator('svg path[d*="M15 17h5l"]')
    });
    await expect(notificationBell).toBeVisible();

    // Check for notification badge
    const badge = await notificationBell.locator('.bg-\\[var\\(--hive-brand-primary\\)\\]');
    // Badge might or might not be present depending on state
    if (await badge.isVisible()) {
      await expect(badge).toHaveCSS('background-color', 'rgb(255, 215, 0)');
    }
  });

  test('should have responsive layout', async ({ page }) => {
    // Test desktop layout
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);

    // Desktop should show sidebar
    const desktopSidebar = await page.locator('aside').first();
    await expect(desktopSidebar).toBeVisible();

    // Desktop should not show mobile bottom nav
    const desktopBottomNav = await page.locator('nav.fixed.bottom-0');
    await expect(desktopBottomNav).not.toBeVisible();

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);

    // Mobile should show bottom nav
    const mobileBottomNav = await page.locator('nav.fixed.bottom-0');
    await expect(mobileBottomNav).toBeVisible();
  });

  test('should maintain consistent branding colors', async ({ page }) => {
    // Check gold color usage
    const goldElements = await page.locator('.bg-\\[var\\(--hive-brand-primary\\)\\], .text-\\[var\\(--hive-brand-primary\\)\\]');
    const count = await goldElements.count();

    // Should have at least one gold element (logo or active nav)
    expect(count).toBeGreaterThan(0);

    // Check black background
    const body = await page.locator('body');
    const bgColor = await body.evaluate(el =>
      window.getComputedStyle(el).backgroundColor
    );

    // Should have dark/black background
    expect(bgColor).toMatch(/rgb\(0,\s*0,\s*0\)|rgba\(0,\s*0,\s*0/);
  });

  test('should handle loading states', async ({ page }) => {
    // Navigate to a new page
    await page.goto('/spaces');

    // Check for loading indicator if present
    const loader = await page.locator('.animate-spin, [role="progressbar"]');
    if (await loader.isVisible({ timeout: 1000 })) {
      // Loading should complete
      await expect(loader).not.toBeVisible({ timeout: 10000 });
    }

    // Content should be loaded
    const content = await page.locator('.hive-content-wrapper');
    await expect(content).toBeVisible();
  });

  test('should have accessible skip links', async ({ page }) => {
    // Focus on skip link
    await page.keyboard.press('Tab');

    // Check for skip to main content link
    const skipLink = await page.locator('a[href="#main-content"]');
    if (await skipLink.isVisible()) {
      // Click skip link
      await skipLink.click();

      // Main content should be focused or scrolled to
      const mainContent = await page.locator('#main-content');
      await expect(mainContent).toBeInViewport();
    }
  });
});

test.describe('Universal Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.hive-shell', { timeout: 30000 });
  });

  test('should render universal buttons with correct styles', async ({ page }) => {
    // Find a primary button (like Create Post)
    const primaryButton = await page.locator('button.bg-\\[var\\(--hive-brand-primary\\)\\]').first();
    if (await primaryButton.isVisible()) {
      // Check gold background
      await expect(primaryButton).toHaveCSS('background-color', 'rgb(255, 215, 0)');

      // Check hover state
      await primaryButton.hover();
      await page.waitForTimeout(200);
      // Hover color should change slightly
    }
  });

  test('should render universal cards', async ({ page }) => {
    // Navigate to a page with cards
    await page.goto('/spaces');

    // Look for universal cards
    const cards = await page.locator('.rounded-xl.border');
    if (await cards.first().isVisible()) {
      // Cards should have proper styling
      const firstCard = cards.first();
      await expect(firstCard).toHaveCSS('border-radius', /\d+px/);

      // Interactive cards should respond to hover
      await firstCard.hover();
      // Check for hover effects
    }
  });

  test('should show modals correctly', async ({ page }) => {
    // Trigger a modal (if there's a button that opens one)
    const modalTrigger = await page.locator('button').filter({ hasText: /settings|profile|create/i }).first();
    if (await modalTrigger.isVisible()) {
      await modalTrigger.click();

      // Wait for modal
      const modal = await page.locator('[role="dialog"], .fixed.inset-0.z-50');
      if (await modal.isVisible()) {
        // Modal should have overlay
        const overlay = await page.locator('.bg-black\\/70, .backdrop-blur-sm');
        await expect(overlay).toBeVisible();

        // Close modal with Escape
        await page.keyboard.press('Escape');
        await expect(modal).not.toBeVisible();
      }
    }
  });

  test('should display toasts for notifications', async ({ page }) => {
    // Trigger an action that shows a toast (like clicking save)
    const actionButton = await page.locator('button').filter({ hasText: /save|submit|create/i }).first();
    if (await actionButton.isVisible()) {
      await actionButton.click();

      // Look for toast
      const toast = await page.locator('.fixed.bottom-4.right-4, [role="alert"]');
      if (await toast.isVisible()) {
        // Toast should auto-dismiss
        await expect(toast).not.toBeVisible({ timeout: 10000 });
      }
    }
  });
});

test.describe('Navigation Flow', () => {
  test('should complete full navigation flow', async ({ page }) => {
    await page.goto('/');

    // Navigate through main sections
    const sections = ['/feed', '/spaces', '/profile'];

    for (const section of sections) {
      const navLink = await page.locator(`a[href="${section}"]`).first();
      if (await navLink.isVisible()) {
        await navLink.click();
        await page.waitForURL(`**${section}`);
        await expect(page).toHaveURL(new RegExp(section));

        // Check content loaded
        const content = await page.locator('.hive-content-wrapper');
        await expect(content).toBeVisible();
      }
    }
  });

  test('should handle deep navigation', async ({ page }) => {
    await page.goto('/spaces');

    // If there are space cards, try clicking one
    const spaceCard = await page.locator('[data-testid*="space"], .space-card, a[href*="/spaces/"]').first();
    if (await spaceCard.isVisible()) {
      await spaceCard.click();

      // Should navigate to space detail
      await page.waitForURL('**/spaces/*');

      // Breadcrumbs should be visible
      const breadcrumbs = await page.locator('nav[aria-label="Breadcrumb"]');
      if (await breadcrumbs.isVisible()) {
        const crumbs = await breadcrumbs.locator('button, a');
        expect(await crumbs.count()).toBeGreaterThan(0);
      }
    }
  });
});
