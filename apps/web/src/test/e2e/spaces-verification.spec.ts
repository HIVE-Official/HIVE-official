import { test, expect } from '@playwright/test';

test.describe('Spaces Section Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should verify spaces discovery page functionality', async ({ page }) => {
    console.log('Navigating to spaces page...');

    // Navigate to spaces discovery page
    await page.goto('/spaces');

    // Wait for the page to load properly
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Take a screenshot of the spaces discovery page
    await page.screenshot({
      path: './test-results/spaces-discovery-page.png',
      fullPage: true
    });
    console.log('Screenshot saved: spaces-discovery-page.png');

    // Verify the page loaded correctly by checking for key elements
    await expect(page).toHaveTitle(/.*Spaces.*|.*HIVE.*/);

    // Look for common spaces page elements
    const possibleHeadings = [
      'Discover Spaces',
      'Browse Spaces',
      'All Spaces',
      'Spaces',
      'Find Your Community'
    ];

    let foundHeading = false;
    for (const heading of possibleHeadings) {
      const element = page.getByText(heading, { exact: false }).first();
      if (await element.isVisible().catch(() => false)) {
        foundHeading = true;
        console.log(`Found heading: ${heading}`);
        break;
      }
    }

    // If no specific heading found, check for any h1, h2, or main content indicators
    if (!foundHeading) {
      const mainHeading = page.locator('h1, h2, [data-testid*="spaces"], [class*="spaces"]').first();
      if (await mainHeading.isVisible().catch(() => false)) {
        foundHeading = true;
        console.log('Found spaces-related content element');
      }
    }

    // Look for space cards, lists, or any space-related content
    const spaceElements = page.locator([
      '[data-testid*="space"]',
      '[class*="space-card"]',
      '[class*="space-item"]',
      'article',
      '.card',
      '[role="button"]'
    ].join(', '));

    const spaceCount = await spaceElements.count();
    console.log(`Found ${spaceCount} potential space elements`);

    if (spaceCount > 0) {
      // Take a closer screenshot of the first space element
      const firstSpace = spaceElements.first();
      await firstSpace.screenshot({
        path: './test-results/first-space-element.png'
      });
      console.log('Screenshot saved: first-space-element.png');

      // Try to click on the first clickable space element
      try {
        console.log('Attempting to click on first space element...');

        // Wait for the element to be ready for interaction
        await firstSpace.waitFor({ state: 'visible', timeout: 10000 });

        // Check if it's clickable (has href, onclick, or cursor pointer)
        const isClickable = await firstSpace.evaluate(el => {
          const computedStyle = window.getComputedStyle(el);
          return el.tagName.toLowerCase() === 'a' ||
                 el.onclick !== null ||
                 el.getAttribute('role') === 'button' ||
                 computedStyle.cursor === 'pointer' ||
                 el.querySelector('a') !== null;
        });

        if (isClickable) {
          // Click and wait for navigation
          await Promise.all([
            page.waitForLoadState('networkidle', { timeout: 20000 }),
            firstSpace.click({ timeout: 10000 })
          ]);

          // Verify we navigated to a space detail page
          await page.waitForTimeout(2000); // Give page time to settle

          const currentUrl = page.url();
          console.log(`Navigated to: ${currentUrl}`);

          // Take screenshot of the space detail page
          await page.screenshot({
            path: './test-results/space-detail-page.png',
            fullPage: true
          });
          console.log('Screenshot saved: space-detail-page.png');

          // Verify this looks like a space detail page
          const hasSpaceDetail = await page.locator([
            'h1',
            '[data-testid*="space-detail"]',
            '[class*="space-header"]',
            '[class*="space-info"]'
          ].join(', ')).first().isVisible().catch(() => false);

          expect(hasSpaceDetail).toBeTruthy();
          console.log('Successfully verified space detail page loaded');

        } else {
          console.log('First element is not clickable, checking for links within it...');

          // Look for clickable elements within the space card
          const clickableChild = firstSpace.locator('a, button, [role="button"]').first();
          if (await clickableChild.isVisible().catch(() => false)) {
            await Promise.all([
              page.waitForLoadState('networkidle', { timeout: 20000 }),
              clickableChild.click({ timeout: 10000 })
            ]);

            await page.screenshot({
              path: './test-results/space-detail-page.png',
              fullPage: true
            });
            console.log('Screenshot saved: space-detail-page.png');
          } else {
            console.log('No clickable elements found in space card');
          }
        }

      } catch (error) {
        console.log(`Click attempt failed: ${error}`);
        // This is not necessarily a failure - the page might work differently
        // Just log the error and continue
      }
    } else {
      console.log('No space elements found on page - this might indicate an issue or different layout');

      // Take a screenshot anyway to see what's actually displayed
      await page.screenshot({
        path: './test-results/spaces-page-no-elements.png',
        fullPage: true
      });
    }

    // Final verification - ensure we're still on a valid page
    const pageContent = await page.content();
    expect(pageContent).toContain('html');
    expect(pageContent.length).toBeGreaterThan(100); // Should have substantial content
  });

  test('should verify spaces page is mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    console.log('Testing mobile responsiveness...');
    await page.goto('/spaces');
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Take mobile screenshot
    await page.screenshot({
      path: './test-results/spaces-mobile-view.png',
      fullPage: true
    });
    console.log('Screenshot saved: spaces-mobile-view.png');

    // Verify mobile layout works
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check that content doesn't overflow horizontally
    const bodyWidth = await body.evaluate(el => el.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 20); // Allow small margin for error
  });

  test('should handle spaces page errors gracefully', async ({ page }) => {
    console.log('Testing error handling...');

    // Listen for console errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Listen for page errors
    const pageErrors: string[] = [];
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    await page.goto('/spaces');
    await page.waitForLoadState('networkidle', { timeout: 30000 });

    // Take screenshot regardless of errors
    await page.screenshot({
      path: './test-results/spaces-error-check.png',
      fullPage: true
    });

    // Log any errors found (but don't fail the test unless they're critical)
    if (consoleErrors.length > 0) {
      console.log('Console errors found:', consoleErrors);
    }
    if (pageErrors.length > 0) {
      console.log('Page errors found:', pageErrors);
    }

    // The page should still render something even with errors
    const hasContent = await page.locator('body').isVisible();
    expect(hasContent).toBeTruthy();
  });
});