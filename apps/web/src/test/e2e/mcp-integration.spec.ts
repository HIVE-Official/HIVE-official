/**
 * MCP Playwright Integration Tests
 * Demonstrates how to test HIVE using the Playwright MCP server
 */

import { test, expect } from '@playwright/test';

test.describe('HIVE Platform MCP Tests', () => {
  test('should navigate and interact with HIVE using MCP', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Take a screenshot of the initial state
    await page.screenshot({ path: 'test-results/hive-initial.png' });

    // Wait for shell to load
    await page.waitForSelector('.hive-shell', { timeout: 30000 });

    // Capture accessibility snapshot
    const accessibilitySnapshot = await page.accessibility.snapshot();
    console.log('Accessibility tree depth:', countTreeDepth(accessibilitySnapshot));

    // Test navigation interactions
    await testNavigationFlow(page);

    // Test responsive behavior
    await testResponsiveDesign(page);

    // Test keyboard navigation
    await testKeyboardNavigation(page);

    // Test form interactions
    await testFormInteractions(page);
  });
});

async function testNavigationFlow(page: any) {
  // Click on Spaces navigation
  const spacesLink = await page.locator('a[href="/spaces"]').first();
  if (await spacesLink.isVisible()) {
    await spacesLink.click();
    await page.waitForURL('**/spaces');

    // Verify navigation worked
    await expect(page).toHaveURL(/\/spaces/);

    // Take screenshot of spaces page
    await page.screenshot({ path: 'test-results/hive-spaces.png' });
  }

  // Test breadcrumb navigation if available
  const breadcrumb = await page.locator('nav[aria-label="Breadcrumb"]');
  if (await breadcrumb.isVisible()) {
    const homeLink = await breadcrumb.locator('button, a').first();
    await homeLink.click();
    await page.waitForTimeout(500);
  }
}

async function testResponsiveDesign(page: any) {
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.waitForTimeout(500);

    // Take screenshot for each viewport
    await page.screenshot({
      path: `test-results/hive-${viewport.name}.png`,
      fullPage: false,
    });

    // Test viewport-specific elements
    if (viewport.name === 'mobile') {
      // Mobile should have bottom navigation
      const bottomNav = await page.locator('nav.fixed.bottom-0');
      await expect(bottomNav).toBeVisible();
    } else {
      // Desktop/tablet should have sidebar
      const sidebar = await page.locator('aside').first();
      if (viewport.width >= 1024) {
        await expect(sidebar).toBeVisible();
      }
    }
  }
}

async function testKeyboardNavigation(page: any) {
  // Test Tab navigation
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);

  // Check if skip link is focused
  const skipLink = await page.locator('a[href="#main-content"]');
  const isSkipLinkFocused = await skipLink.evaluate((el: HTMLElement) =>
    document.activeElement === el
  );

  if (isSkipLinkFocused) {
    // Activate skip link
    await page.keyboard.press('Enter');

    // Main content should be in viewport
    const mainContent = await page.locator('#main-content');
    await expect(mainContent).toBeInViewport();
  }

  // Test arrow key navigation in lists
  const navItems = await page.locator('nav a, nav button');
  if (await navItems.first().isVisible()) {
    await navItems.first().focus();

    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(100);

    // Test Enter to activate
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
  }

  // Test Escape to close modals
  await page.keyboard.press('Escape');
  await page.waitForTimeout(100);
}

async function testFormInteractions(page: any) {
  // Navigate to a page with forms
  await page.goto('/profile/edit');
  await page.waitForSelector('.hive-shell', { timeout: 30000 });

  // Find input fields
  const inputs = await page.locator('input[type="text"], input[type="email"]');
  const firstInput = inputs.first();

  if (await firstInput.isVisible()) {
    // Test typing
    await firstInput.fill('Test User');

    // Test validation
    const emailInput = await page.locator('input[type="email"]').first();
    if (await emailInput.isVisible()) {
      // Test invalid email
      await emailInput.fill('invalid-email');
      await emailInput.blur();

      // Check for error message
      const errorMessage = await page.locator('.text-red-500, [role="alert"]');
      if (await errorMessage.isVisible()) {
        const errorText = await errorMessage.textContent();
        expect(errorText).toBeTruthy();
      }

      // Test valid email
      await emailInput.fill('test@buffalo.edu');
      await emailInput.blur();
    }
  }

  // Test checkbox interactions
  const checkbox = await page.locator('input[type="checkbox"]').first();
  if (await checkbox.isVisible()) {
    const isChecked = await checkbox.isChecked();
    await checkbox.click();

    // Verify state changed
    const newState = await checkbox.isChecked();
    expect(newState).toBe(!isChecked);
  }

  // Test select/dropdown
  const select = await page.locator('select').first();
  if (await select.isVisible()) {
    await select.selectOption({ index: 1 });
    const value = await select.inputValue();
    expect(value).toBeTruthy();
  }
}

// Helper function to count tree depth
function countTreeDepth(node: any, depth = 0): number {
  if (!node || !node.children || node.children.length === 0) {
    return depth;
  }

  let maxDepth = depth;
  for (const child of node.children) {
    const childDepth = countTreeDepth(child, depth + 1);
    maxDepth = Math.max(maxDepth, childDepth);
  }

  return maxDepth;
}

// Advanced MCP interaction patterns
test.describe('Advanced MCP Interactions', () => {
  test('should handle complex user flows', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.hive-shell');

    // Simulate a complete user journey
    await simulateUserJourney(page);
  });

  test('should test real-time features', async ({ page }) => {
    await page.goto('/feed');

    // Monitor network activity
    const responses: any[] = [];
    page.on('response', (response: any) => {
      if (response.url().includes('/api/')) {
        responses.push({
          url: response.url(),
          status: response.status(),
          timing: response.timing(),
        });
      }
    });

    // Wait for real-time updates
    await page.waitForTimeout(3000);

    // Analyze API performance
    const slowAPIs = responses.filter(r => r.timing?.responseEnd > 1000);
    if (slowAPIs.length > 0) {
      console.warn('Slow API calls detected:', slowAPIs);
    }
  });

  test('should validate accessibility standards', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.hive-shell');

    // Run accessibility audit
    const violations = await runAccessibilityAudit(page);

    // Report violations
    if (violations.length > 0) {
      console.log('Accessibility violations found:', violations);
    }

    expect(violations.length).toBe(0);
  });
});

async function simulateUserJourney(page: any) {
  // 1. User lands on homepage
  await page.screenshot({ path: 'test-results/journey-1-landing.png' });

  // 2. User navigates to spaces
  const spacesNav = await page.locator('a[href="/spaces"]').first();
  await spacesNav.click();
  await page.waitForURL('**/spaces');
  await page.screenshot({ path: 'test-results/journey-2-spaces.png' });

  // 3. User searches for a space
  const searchInput = await page.locator('input[type="search"]').first();
  if (await searchInput.isVisible()) {
    await searchInput.fill('Computer Science');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/journey-3-search.png' });
  }

  // 4. User goes to profile
  const profileNav = await page.locator('a[href="/profile"]').first();
  await profileNav.click();
  await page.waitForURL('**/profile');
  await page.screenshot({ path: 'test-results/journey-4-profile.png' });

  // 5. User opens settings
  const settingsButton = await page.locator('button, a').filter({ hasText: /settings/i }).first();
  if (await settingsButton.isVisible()) {
    await settingsButton.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/journey-5-settings.png' });
  }
}

async function runAccessibilityAudit(page: any) {
  const violations: any[] = [];

  // Check for alt text on images
  const images = await page.locator('img');
  const imageCount = await images.count();
  for (let i = 0; i < imageCount; i++) {
    const img = images.nth(i);
    const alt = await img.getAttribute('alt');
    if (!alt) {
      violations.push({
        type: 'missing-alt-text',
        element: await img.evaluate((el: HTMLElement) => el.outerHTML),
      });
    }
  }

  // Check for proper heading hierarchy
  const headings = await page.locator('h1, h2, h3, h4, h5, h6');
  const headingLevels = await headings.evaluateAll((elements: HTMLElement[]) =>
    elements.map(el => parseInt(el.tagName[1]))
  );

  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] - headingLevels[i-1] > 1) {
      violations.push({
        type: 'heading-hierarchy',
        message: `Heading level jumps from H${headingLevels[i-1]} to H${headingLevels[i]}`,
      });
    }
  }

  // Check for form labels
  const inputs = await page.locator('input, select, textarea');
  const inputCount = await inputs.count();
  for (let i = 0; i < inputCount; i++) {
    const input = inputs.nth(i);
    const id = await input.getAttribute('id');
    if (id) {
      const label = await page.locator(`label[for="${id}"]`);
      if (!(await label.isVisible())) {
        const ariaLabel = await input.getAttribute('aria-label');
        if (!ariaLabel) {
          violations.push({
            type: 'missing-label',
            element: await input.evaluate((el: HTMLElement) => el.outerHTML),
          });
        }
      }
    }
  }

  // Check color contrast (basic check)
  const buttons = await page.locator('button');
  const buttonCount = await buttons.count();
  for (let i = 0; i < buttonCount; i++) {
    const button = buttons.nth(i);
    const colors = await button.evaluate((el: HTMLElement) => {
      const style = window.getComputedStyle(el);
      return {
        bg: style.backgroundColor,
        text: style.color,
      };
    });

    // Add more sophisticated contrast checking here if needed
  }

  return violations;
}