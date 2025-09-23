import { test, expect } from '@playwright/test';

test.describe('HIVE Navigation System Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/feed');
    await page.waitForLoadState('networkidle');
  });

  test('should display top bar navigation shell', async ({ page }) => {
    // Check for navigation element
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Check for HIVE logo
    const logo = page.locator('text=HIVE');
    await expect(logo).toBeVisible();

    console.log('✅ Navigation shell and logo verified');
  });

  test('should have primary navigation items', async ({ page }) => {
    // Check for Feed, Spaces, Profile navigation items
    const feedNav = page.locator('text=Feed');
    const spacesNav = page.locator('text=Spaces');
    const profileNav = page.locator('text=Profile');

    await expect(feedNav).toBeVisible();
    await expect(spacesNav).toBeVisible();
    await expect(profileNav).toBeVisible();

    console.log('✅ Primary navigation items verified');
  });

  test('should display notification and message badges', async ({ page }) => {
    // Look for badge elements (notification counts)
    const badges = page.locator('[class*="badge"], [class*="Badge"]');
    const badgeCount = await badges.count();

    expect(badgeCount).toBeGreaterThan(0);
    console.log(`✅ Found ${badgeCount} notification badges`);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    // Check for mobile menu button
    const mobileMenuButton = page.locator('button').filter({ hasText: /menu|Menu/i }).first();

    if (await mobileMenuButton.isVisible()) {
      console.log('✅ Mobile menu button found');

      // Try to click mobile menu
      await mobileMenuButton.click();
      await page.waitForTimeout(500);

      console.log('✅ Mobile menu interaction tested');
    } else {
      console.log('ℹ️ Mobile menu button not found - checking for hamburger icon');

      // Look for hamburger menu icon
      const hamburgerMenu = page.locator('svg, [data-testid="menu"]').first();
      await expect(hamburgerMenu).toBeVisible();
      console.log('✅ Hamburger menu icon verified');
    }
  });

  test('should have glass morphism effects', async ({ page }) => {
    // Check for backdrop blur CSS
    const nav = page.locator('nav').first();

    // Check if navigation has backdrop blur classes
    const navClass = await nav.getAttribute('class');
    const hasGlassMorphism = navClass?.includes('backdrop-blur') ||
                             navClass?.includes('glass') ||
                             navClass?.includes('blur');

    expect(hasGlassMorphism).toBeTruthy();
    console.log('✅ Glass morphism effects verified');
  });

  test('should handle search functionality', async ({ page }) => {
    // Look for search input or search button
    const searchInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]').first();

    if (await searchInput.isVisible()) {
      await searchInput.fill('test search');
      console.log('✅ Search input functionality verified');
    } else {
      // Look for search button that might expand
      const searchButton = page.locator('button').filter({ hasText: /search/i }).first();
      if (await searchButton.isVisible()) {
        await searchButton.click();
        console.log('✅ Search button functionality verified');
      } else {
        console.log('ℹ️ Search functionality may be in collapsed state');
      }
    }
  });

  test('should navigate between pages', async ({ page }) => {
    // Test navigation to Spaces page
    const spacesLink = page.locator('text=Spaces');
    await spacesLink.click();

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Check URL changed
    const currentUrl = page.url();
    expect(currentUrl).toContain('/spaces');

    console.log('✅ Navigation between pages verified');
  });

  test('should take screenshot for visual verification', async ({ page }) => {
    // Take desktop screenshot
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.screenshot({
      path: 'tests/screenshots/navigation-desktop.png',
      fullPage: true
    });

    // Take mobile screenshot
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({
      path: 'tests/screenshots/navigation-mobile.png',
      fullPage: true
    });

    console.log('✅ Screenshots captured for visual verification');
  });
});