import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('HIVE Accessibility Tests', () => {
  test('should not have accessibility violations on landing page', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations on auth page', async ({ page }) => {
    await page.goto('/auth');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .exclude('[data-testid="third-party-iframe"]') // Exclude third-party content
      .analyze();
      
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through main navigation
    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.getAttribute('data-testid'));
    expect(firstFocused).toBeTruthy();
    
    // Navigate with arrow keys in menu
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Should open menu
    await expect(page.locator('[role="menu"]')).toBeVisible();
    
    // Navigate menu with arrow keys
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/auth');
    
    // Check form inputs have labels
    const emailInput = page.locator('input[type="email"]');
    const emailLabel = await emailInput.getAttribute('aria-label') || 
                      await page.locator(`label[for="${await emailInput.getAttribute('id')}"]`).textContent();
    expect(emailLabel).toBeTruthy();
    
    // Check buttons have accessible names
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const textContent = await button.textContent();
      expect(ariaLabel || textContent).toBeTruthy();
    }
  });

  test('should support screen reader announcements', async ({ page }) => {
    await page.goto('/');
    
    // Check for live regions
    const liveRegions = page.locator('[aria-live]');
    const liveRegionCount = await liveRegions.count();
    expect(liveRegionCount).toBeGreaterThan(0);
    
    // Test form submission announcement
    await page.goto('/auth');
    await page.fill('input[type="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    // Error should be announced
    const errorMessage = page.locator('[role="alert"]');
    await expect(errorMessage).toBeVisible();
    const ariaLive = await errorMessage.getAttribute('aria-live');
    expect(ariaLive).toBe('polite');
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag2aaa'])
      .analyze();
      
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toHaveLength(0);
  });

  test('should have focus indicators', async ({ page }) => {
    await page.goto('/');
    
    // Tab to first interactive element
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    const focusVisible = await focusedElement.evaluate(el => {
      const styles = window.getComputedStyle(el);
      return styles.outline !== 'none' || styles.boxShadow !== 'none';
    });
    
    expect(focusVisible).toBe(true);
  });

  test('should handle reduced motion preference', async ({ browser }) => {
    const context = await browser.newContext({
      reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check that animations are disabled
    const animatedElement = page.locator('[data-testid="hero-animation"]');
    if (await animatedElement.count() > 0) {
      const animationDuration = await animatedElement.evaluate(el => {
        return window.getComputedStyle(el).animationDuration;
      });
      expect(animationDuration).toBe('0s');
    }
    
    await context.close();
  });

  test('should have skip navigation link', async ({ page }) => {
    await page.goto('/');
    
    // Press tab to reveal skip link
    await page.keyboard.press('Tab');
    
    const skipLink = page.locator('a:has-text("Skip to main content")');
    await expect(skipLink).toBeVisible();
    
    // Activate skip link
    await page.keyboard.press('Enter');
    
    // Check focus moved to main content
    const mainContent = page.locator('main');
    await expect(mainContent).toBeFocused();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Get all headings
    const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', elements => 
      elements.map(el => ({
        level: parseInt(el.tagName[1]),
        text: el.textContent
      }))
    );
    
    // Check there's exactly one h1
    const h1Count = headings.filter(h => h.level === 1).length;
    expect(h1Count).toBe(1);
    
    // Check heading hierarchy doesn't skip levels
    let previousLevel = 0;
    for (const heading of headings) {
      if (previousLevel > 0) {
        expect(heading.level).toBeLessThanOrEqual(previousLevel + 1);
      }
      previousLevel = heading.level;
    }
  });
});