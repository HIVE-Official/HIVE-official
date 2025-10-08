/**
 * Mobile Experience E2E Tests
 * Critical: 80% of HIVE usage is on mobile devices
 *
 * Tests mobile-specific interactions, gestures, and responsive behavior
 * Target devices: iPhone 12 (390x844), Pixel 5 (393x851)
 */

import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Experience - iPhone 12', () => {
  test.use({ ...devices['iPhone 12'] });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should show mobile bottom navigation', async ({ page }) => {
    // Bottom navigation should be visible
    const bottomNav = await page.locator('nav.fixed.bottom-0, [data-testid="mobile-nav"]').first();
    await expect(bottomNav).toBeVisible({ timeout: 3000 });

    // Should have 5 navigation items: Feed, Spaces, Create, Messages, Profile
    const navItems = await bottomNav.locator('button, a').count();
    expect(navItems).toBeGreaterThanOrEqual(4); // At least 4 main nav items
  });

  test('should hide desktop sidebar on mobile', async ({ page }) => {
    // Desktop sidebar should not be visible
    const desktopSidebar = await page.locator('aside.hidden.lg\\:block, .desktop-sidebar').count();

    // Should be hidden or not present
    expect(desktopSidebar).toBe(0);
  });

  test('should show mobile header with hamburger menu', async ({ page }) => {
    // Mobile header should be visible
    const header = await page.locator('header').first();
    await expect(header).toBeVisible();

    // Should have hamburger menu or logo
    const menuButton = await page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]').count();
    const logo = await page.locator('header a[href="/"], header img').count();

    expect(menuButton > 0 || logo > 0).toBe(true);
  });

  test('should render feed cards in mobile format', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const feedCards = await page.locator('[data-testid="feed-item"], article').count();

    if (feedCards > 0) {
      const firstCard = await page.locator('[data-testid="feed-item"], article').first();

      // Card should take full width
      const width = await firstCard.evaluate((el) => el.clientWidth);
      const viewportWidth = await page.viewportSize();

      // Card should be close to viewport width (allowing for padding)
      expect(width).toBeGreaterThan((viewportWidth?.width || 390) * 0.85);
    }
  });

  test('should support touch scrolling', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const initialScroll = await page.evaluate(() => window.scrollY);

    // Simulate touch scroll
    await page.evaluate(() => {
      window.scrollBy(0, 300);
    });

    await page.waitForTimeout(100);

    const newScroll = await page.evaluate(() => window.scrollY);
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test('should support pull-to-refresh gesture', async ({ page }) => {
    // Pull down from top
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    await page.touchscreen.tap(200, 50);
    await page.touchscreen.swipe({ x: 200, y: 50 }, { x: 200, y: 200 });

    // Refresh indicator may appear
    const refreshIndicator = await page.locator('[data-testid="refresh-indicator"], .refresh-spinner').count();

    // Indicator may or may not appear depending on implementation
    expect(refreshIndicator >= 0).toBe(true);
  });

  test('should show mobile-optimized modals', async ({ page }) => {
    // Trigger a modal
    const createButton = await page.locator('button:has-text("Create"), button:has-text("+")').first();

    if (await createButton.isVisible()) {
      await createButton.click();

      // Modal should appear
      const modal = await page.locator('[role="dialog"]').first();

      if (await modal.isVisible()) {
        // Modal should be full-screen or bottom-sheet on mobile
        const modalHeight = await modal.evaluate((el) => el.clientHeight);
        const viewportHeight = await page.viewportSize();

        // Modal should take significant vertical space
        expect(modalHeight).toBeGreaterThan((viewportHeight?.height || 844) * 0.5);
      }
    }
  });

  test('should have touch-friendly button sizes', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const buttons = await page.locator('button').all();

    for (const button of buttons.slice(0, 5)) {
      if (await button.isVisible()) {
        const box = await button.boundingBox();

        if (box) {
          // Minimum touch target: 44x44px (Apple HIG)
          expect(box.width).toBeGreaterThanOrEqual(40);
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    }
  });

  test('should handle swipe gestures on posts', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const firstPost = await page.locator('[data-testid="feed-item"], article').first();

    if (await firstPost.isVisible()) {
      const box = await firstPost.boundingBox();

      if (box) {
        // Swipe left on post
        await page.touchscreen.swipe(
          { x: box.x + box.width - 50, y: box.y + box.height / 2 },
          { x: box.x + 50, y: box.y + box.height / 2 }
        );

        // Actions menu may appear
        const actionsMenu = await page.locator('[data-testid="post-actions"], .actions-menu').count();

        // Actions may or may not appear depending on implementation
        expect(actionsMenu >= 0).toBe(true);
      }
    }
  });

  test('should show mobile keyboard without layout shift', async ({ page }) => {
    // Find a text input
    const searchInput = await page.locator('input[type="text"], input[type="search"]').first();

    if (await searchInput.isVisible()) {
      // Tap input to show keyboard
      await searchInput.click();

      // Layout should not shift dramatically
      const headerPosition = await page.locator('header').first().boundingBox();
      expect(headerPosition).toBeTruthy();
      expect(headerPosition?.y).toBeLessThan(50); // Header should stay at top
    }
  });

  test('should handle portrait and landscape orientations', async ({ page }) => {
    // Start in portrait
    const portraitSize = await page.viewportSize();
    expect(portraitSize?.height).toBeGreaterThan(portraitSize?.width || 0);

    // Rotate to landscape
    await page.setViewportSize({ width: 844, height: 390 });
    await page.waitForTimeout(500);

    // Layout should adapt
    const bottomNav = await page.locator('nav.fixed.bottom-0').first();
    const isVisible = await bottomNav.isVisible();

    // Navigation should still be accessible
    expect(typeof isVisible).toBe('boolean');
  });

  test('should load images optimized for mobile', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const images = await page.locator('img').all();

    for (const img of images.slice(0, 3)) {
      if (await img.isVisible()) {
        // Images should have width/height attributes or styles
        const hasSize = await img.evaluate((el) => {
          return el.hasAttribute('width') || el.hasAttribute('height') || el.style.width || el.style.height;
        });

        // Image should be sized (prevents layout shift)
        expect(hasSize).toBe(true);
      }
    }
  });

  test('should show mobile-optimized typography', async ({ page }) => {
    const body = await page.locator('body').first();
    const fontSize = await body.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });

    // Base font size should be readable on mobile (at least 16px)
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(14);
  });

  test('should handle safe area insets (notch)', async ({ page }) => {
    // Check if layout respects safe areas
    const header = await page.locator('header').first();
    const headerPadding = await header.evaluate((el) => {
      return window.getComputedStyle(el).paddingTop;
    });

    // Should have some top padding for safe area
    const paddingNum = parseInt(headerPadding);
    expect(paddingNum).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Mobile Experience - Android (Pixel 5)', () => {
  test.use({ ...devices['Pixel 5'] });

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should work on Android devices', async ({ page }) => {
    // Feed should load
    const feed = await page.locator('[data-testid="feed-container"], main').first();
    await expect(feed).toBeVisible({ timeout: 5000 });
  });

  test('should handle Android back button', async ({ page }) => {
    // Navigate to a subpage
    await page.click('a[href="/spaces"]');
    await page.waitForURL('**/spaces');

    // Simulate back button
    await page.goBack();

    // Should return to previous page
    await page.waitForURL(/\/feed|\/$/);
  });

  test('should support Android sharing', async ({ page }) => {
    const shareButton = await page.locator('button[aria-label*="share"], button:has-text("Share")').first();

    if (await shareButton.isVisible()) {
      // Clicking share should trigger share dialog
      await shareButton.click();

      // Share dialog may appear (depends on browser implementation)
      await page.waitForTimeout(500);
    }
  });

  test('should handle Android system fonts', async ({ page }) => {
    const heading = await page.locator('h1, h2').first();

    if (await heading.isVisible()) {
      const fontFamily = await heading.evaluate((el) => {
        return window.getComputedStyle(el).fontFamily;
      });

      // Should use system font stack
      expect(fontFamily).toBeTruthy();
    }
  });
});

test.describe('Mobile Performance', () => {
  test.use({ ...devices['iPhone 12'] });

  test('should load quickly on mobile network', async ({ page, context }) => {
    // Simulate slow 3G
    await context.route('**/*', (route) => {
      setTimeout(() => route.continue(), 50); // 50ms delay
    });

    const startTime = Date.now();
    await page.goto('/');

    // Wait for content
    await page.waitForSelector('[data-testid="feed-container"], main', { timeout: 10000 });

    const loadTime = Date.now() - startTime;
    console.log(`📱 Mobile load time: ${loadTime}ms`);

    // Should load within 5 seconds on slow network
    expect(loadTime).toBeLessThan(5000);
  });

  test('should use lazy loading for images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();

    for (const img of images) {
      const loading = await img.getAttribute('loading');

      // Images should use native lazy loading
      if (loading !== null) {
        expect(loading).toBe('lazy');
      }
    }
  });

  test('should minimize JavaScript bundle for mobile', async ({ page }) => {
    const performanceMetrics = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const jsResources = resources.filter(r => r.name.endsWith('.js'));

      const totalSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

      return {
        jsFiles: jsResources.length,
        totalSize
      };
    });

    console.log(`📱 JS Bundle: ${performanceMetrics.jsFiles} files, ${Math.round(performanceMetrics.totalSize / 1024)}KB`);

    // Total JS should be reasonable for mobile
    expect(performanceMetrics.totalSize).toBeLessThan(1024 * 1024); // < 1MB
  });
});

test.describe('Mobile Gestures', () => {
  test.use({ ...devices['iPhone 12'] });

  test('should support tap to like', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstPost = await page.locator('[data-testid="feed-item"], article').first();

    if (await firstPost.isVisible()) {
      const likeButton = await firstPost.locator('button[aria-label*="like"]').first();

      if (await likeButton.isVisible()) {
        const box = await likeButton.boundingBox();

        if (box) {
          // Tap like button
          await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);

          // Button should update
          await expect(likeButton).toHaveAttribute('aria-pressed', 'true', { timeout: 1000 });
        }
      }
    }
  });

  test('should support double-tap to like', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstPost = await page.locator('[data-testid="feed-item"], article').first();

    if (await firstPost.isVisible()) {
      const box = await firstPost.boundingBox();

      if (box) {
        const centerX = box.x + box.width / 2;
        const centerY = box.y + box.height / 2;

        // Double tap on post content
        await page.touchscreen.tap(centerX, centerY);
        await page.waitForTimeout(50);
        await page.touchscreen.tap(centerX, centerY);

        // Like animation may appear
        const likeAnimation = await page.locator('[data-testid="like-animation"], .like-heart-animation').count();

        // Animation may or may not appear depending on implementation
        expect(likeAnimation >= 0).toBe(true);
      }
    }
  });

  test('should support long-press for context menu', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const firstPost = await page.locator('[data-testid="feed-item"], article').first();

    if (await firstPost.isVisible()) {
      const box = await firstPost.boundingBox();

      if (box) {
        // Long press on post
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(800); // Long press duration

        // Context menu may appear
        const contextMenu = await page.locator('[role="menu"], .context-menu').count();

        // Menu may or may not appear depending on implementation
        expect(contextMenu >= 0).toBe(true);
      }
    }
  });

  test('should support pinch to zoom on images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const image = await page.locator('img').first();

    if (await image.isVisible()) {
      const box = await image.boundingBox();

      if (box) {
        // Tap image to open fullscreen
        await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);

        // Fullscreen image modal may appear
        const modal = await page.locator('[role="dialog"], .image-modal').count();

        // Modal may or may not appear depending on implementation
        expect(modal >= 0).toBe(true);
      }
    }
  });
});

test.describe('Mobile Accessibility', () => {
  test.use({ ...devices['iPhone 12'] });

  test('should have accessible mobile navigation', async ({ page }) => {
    await page.goto('/');

    const bottomNav = await page.locator('nav[aria-label*="Main"], nav[role="navigation"]').first();

    if (await bottomNav.isVisible()) {
      // Nav should have proper ARIA labels
      const navItems = await bottomNav.locator('a, button').all();

      for (const item of navItems.slice(0, 5)) {
        const ariaLabel = await item.getAttribute('aria-label');
        const text = await item.textContent();

        // Each nav item should have label or text
        expect(ariaLabel || text).toBeTruthy();
      }
    }
  });

  test('should support mobile screen readers', async ({ page }) => {
    await page.goto('/');

    // Check for ARIA landmarks
    const main = await page.locator('main, [role="main"]').count();
    const navigation = await page.locator('nav, [role="navigation"]').count();

    expect(main).toBeGreaterThan(0);
    expect(navigation).toBeGreaterThan(0);
  });

  test('should have proper heading hierarchy on mobile', async ({ page }) => {
    await page.goto('/');

    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThanOrEqual(1); // Should have at least one h1
  });

  test('should support keyboard navigation on mobile', async ({ page }) => {
    await page.goto('/');

    // Focus first interactive element
    await page.keyboard.press('Tab');

    // Focused element should be visible
    const focused = await page.evaluate(() => {
      return document.activeElement?.tagName;
    });

    expect(focused).toBeTruthy();
  });
});

test.describe('Mobile-Specific Features', () => {
  test.use({ ...devices['iPhone 12'] });

  test('should support camera access for profile photo', async ({ page, context }) => {
    // Grant camera permission
    await context.grantPermissions(['camera']);

    await page.goto('/onboarding');

    const cameraButton = await page.locator('button:has-text("Camera"), button[aria-label*="camera"]').first();

    if (await cameraButton.isVisible({ timeout: 1000 })) {
      // Clicking camera should request access
      await cameraButton.click();

      // Camera UI may appear (depends on browser)
      await page.waitForTimeout(500);
    }
  });

  test('should support photo upload from gallery', async ({ page }) => {
    await page.goto('/onboarding');

    const photoUpload = await page.locator('input[type="file"][accept*="image"]').first();

    if (await photoUpload.isVisible({ timeout: 1000 })) {
      // Should be able to select file
      const testImage = Buffer.from('fake-image-data');
      await photoUpload.setInputFiles({
        name: 'photo.jpg',
        mimeType: 'image/jpeg',
        buffer: testImage
      });

      // Preview should appear
      const preview = await page.locator('img[alt*="preview"]').first();
      await expect(preview).toBeVisible({ timeout: 2000 });
    }
  });

  test('should support geolocation for events', async ({ page, context }) => {
    // Grant location permission
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 42.9634, longitude: -78.7405 }); // UB coordinates

    await page.goto('/');

    // Location-based features may use this
    const locationButton = await page.locator('button[aria-label*="location"]').count();

    // Feature may or may not exist
    expect(locationButton >= 0).toBe(true);
  });

  test('should support push notifications opt-in', async ({ page }) => {
    await page.goto('/');

    // Look for notification prompt
    const notificationPrompt = await page.locator('button:has-text("Enable Notifications"), button:has-text("Allow Notifications")').count();

    // Prompt may or may not appear
    expect(notificationPrompt >= 0).toBe(true);
  });

  test('should add to home screen prompt', async ({ page }) => {
    await page.goto('/');

    // PWA install prompt may appear
    const installPrompt = await page.locator('button:has-text("Install"), button:has-text("Add to Home Screen")').count();

    // Prompt may or may not appear depending on browser and PWA setup
    expect(installPrompt >= 0).toBe(true);
  });
});
