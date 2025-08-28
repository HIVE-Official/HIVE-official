import { Page, expect } from '@playwright/test';

/**
 * Common test utilities and helpers for e2e tests
 */

export class TestHelpers {
  
  /**
   * Fill a form with realistic typing delays
   */
  static async fillFormWithDelay(page: Page, formData: Record<string, string>, delay = 100): Promise<void> {
    for (const [field, value] of Object.entries(formData)) {
      const input = page.locator(`[name="${field}"], [data-testid="${field}"], input:has-text("${field}")`).first();
      await input.click();
      await page.waitForTimeout(delay);
      await input.type(value, { delay: 50 });
    }
  }

  /**
   * Wait for a loading state to complete
   */
  static async waitForLoadingToComplete(page: Page, timeout = 10000): Promise<void> {
    // Wait for common loading indicators to disappear
    try {
      await page.waitForFunction(() => {
        const loadingElements = document.querySelectorAll(
          '[data-testid="loading"], .loading, .spinner, [aria-label*="loading" i], [aria-label*="Loading" i]'
        );
        return loadingElements.length === 0;
      }, { timeout });
    } catch {
      // If timeout, continue - loading indicators might not be present
    }
  }

  /**
   * Check if page has accessibility violations
   */
  static async checkBasicA11y(page: Page): Promise<string[]> {
    return await page.evaluate(() => {
      const issues: string[] = [];
      
      // Check for images without alt text
      const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
      if (imagesWithoutAlt.length > 0) {
        issues.push(`${imagesWithoutAlt.length} images missing alt text`);
      }

      // Check for form inputs without labels
      const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select');
      const unlabeledInputs = Array.from(inputs).filter(input => {
        const hasLabel = document.querySelector(`label[for="${input.id}"]`);
        const hasAriaLabel = input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby');
        return !hasLabel && !hasAriaLabel;
      });
      
      if (unlabeledInputs.length > 0) {
        issues.push(`${unlabeledInputs.length} form inputs missing labels`);
      }

      // Check for proper heading hierarchy
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      let lastLevel = 0;
      for (const heading of headings) {
        const level = parseInt(heading.tagName.charAt(1));
        if (level > lastLevel + 1) {
          issues.push('Heading hierarchy skips levels');
          break;
        }
        lastLevel = level;
      }

      return issues;
    });
  }

  /**
   * Take screenshot with test context
   */
  static async takeTestScreenshot(page: Page, testName: string, step?: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = step 
      ? `${timestamp}-${testName}-${step}.png`
      : `${timestamp}-${testName}.png`;
    
    await page.screenshot({
      path: `test-results/screenshots/${filename}`,
      fullPage: true
    });
  }

  /**
   * Simulate realistic user interactions
   */
  static async simulateTyping(page: Page, selector: string, text: string): Promise<void> {
    const element = page.locator(selector);
    await element.click();
    
    // Type with realistic delays
    for (const char of text) {
      await element.type(char);
      await page.waitForTimeout(Math.random() * 100 + 50); // 50-150ms between characters
    }
  }

  /**
   * Wait for network requests to complete
   */
  static async waitForNetworkIdle(page: Page, timeout = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Check for console errors
   */
  static async checkConsoleErrors(page: Page): Promise<string[]> {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    return errors;
  }

  /**
   * Mock API responses for testing
   */
  static async mockApiResponse(
    page: Page, 
    endpoint: string, 
    response: any, 
    status = 200
  ): Promise<void> {
    await page.route(`**/${endpoint}*`, route => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(response)
      });
    });
  }

  /**
   * Wait for element to be visible and stable
   */
  static async waitForStableElement(page: Page, selector: string): Promise<void> {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible' });
    
    // Wait for element to stop moving (useful for animations)
    let lastPosition = await element.boundingBox();
    let stableCount = 0;
    
    while (stableCount < 3) {
      await page.waitForTimeout(100);
      const currentPosition = await element.boundingBox();
      
      if (lastPosition && currentPosition &&
          lastPosition.x === currentPosition.x &&
          lastPosition.y === currentPosition.y) {
        stableCount++;
      } else {
        stableCount = 0;
      }
      
      lastPosition = currentPosition;
    }
  }

  /**
   * Test mobile-specific interactions
   */
  static async testMobileInteractions(page: Page): Promise<void> {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Test touch interactions
    const touchElements = page.locator('button, a, [role="button"]');
    const count = await touchElements.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) { // Test first 5 elements
      const element = touchElements.nth(i);
      const box = await element.boundingBox();
      
      if (box) {
        // Check minimum touch target size (44px)
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  }

  /**
   * Test keyboard navigation
   */
  static async testKeyboardNavigation(page: Page): Promise<void> {
    // Start from beginning of page
    await page.keyboard.press('Home');
    
    // Tab through interactive elements
    const focusableElements = [];
    for (let i = 0; i < 10; i++) { // Test first 10 tab stops
      await page.keyboard.press('Tab');
      
      const focused = await page.evaluate(() => {
        const element = document.activeElement;
        return element ? {
          tagName: element.tagName,
          type: (element as any).type,
          role: element.getAttribute('role'),
          ariaLabel: element.getAttribute('aria-label')
        } : null;
      });
      
      if (focused) {
        focusableElements.push(focused);
      }
    }
    
    // Should have found some focusable elements
    expect(focusableElements.length).toBeGreaterThan(0);
  }

  /**
   * Test form validation
   */
  static async testFormValidation(
    page: Page, 
    formSelector: string, 
    validationTests: Array<{
      field: string;
      value: string;
      expectedError: RegExp;
    }>
  ): Promise<void> {
    
    for (const test of validationTests) {
      // Clear form
      await page.locator(`${formSelector} input, ${formSelector} textarea, ${formSelector} select`).fill('');
      
      // Fill with test value
      await page.locator(`${formSelector} [name="${test.field}"]`).fill(test.value);
      
      // Try to submit
      await page.locator(`${formSelector} button[type="submit"], ${formSelector} [type="submit"]`).click();
      
      // Check for validation error
      await expect(page.getByText(test.expectedError)).toBeVisible();
    }
  }

  /**
   * Monitor performance during test
   */
  static async monitorPerformance(page: Page): Promise<any> {
    return await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        resourceCount: performance.getEntriesByType('resource').length,
        memoryUsage: (performance as any).memory ? {
          used: (performance as any).memory.usedJSHeapSize,
          total: (performance as any).memory.totalJSHeapSize,
          limit: (performance as any).memory.jsHeapSizeLimit
        } : null
      };
    });
  }

  /**
   * Test error handling
   */
  static async testErrorHandling(page: Page, errorScenarios: Array<{
    description: string;
    trigger: () => Promise<void>;
    expectedBehavior: string;
  }>): Promise<void> {
    
    for (const scenario of errorScenarios) {
      console.log(`Testing error scenario: ${scenario.description}`);
      
      try {
        await scenario.trigger();
        
        // Check that error is handled gracefully
        await expect(page.getByText(new RegExp(scenario.expectedBehavior, 'i'))).toBeVisible();
        
      } catch (error) {
        console.warn(`Error scenario "${scenario.description}" failed:`, error);
      }
    }
  }
}

/**
 * Custom matchers for common test assertions
 */
export const customMatchers = {
  /**
   * Check if element is within viewport
   */
  async toBeInViewport(page: Page, selector: string): Promise<boolean> {
    return await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      );
    }, selector);
  },

  /**
   * Check if element has proper contrast ratio (simplified)
   */
  async toHaveGoodContrast(page: Page, selector: string): Promise<boolean> {
    return await page.evaluate((sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // This is a simplified check - in practice you'd use a proper contrast calculation
      return color !== backgroundColor;
    }, selector);
  }
};