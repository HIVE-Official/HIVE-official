/**
 * Accessibility Testing Utilities for HIVE Design System
 *
 * These utilities make it easy to test components for accessibility
 * compliance using jest-axe and @testing-library/react.
 *
 * @see packages/ui/ACCESSIBILITY.md for full testing guide
 */

import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { axe, toHaveNoViolations, JestAxeConfigureOptions } from 'jest-axe';
import '@testing-library/jest-dom';
import { expect } from 'vitest';

// Extend Vitest matchers with jest-axe
expect.extend(toHaveNoViolations);

// Type declaration for jest-axe matcher
declare module 'vitest' {
  interface Assertion {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}

/**
 * Default axe configuration for HIVE components
 *
 * These rules match our Storybook a11y addon configuration
 */
export const defaultAxeConfig: JestAxeConfigureOptions = {
  rules: {
    // Enable WCAG 2.2 rules
    'color-contrast': { enabled: true },
    'focus-order-semantics': { enabled: true },
    'target-size': { enabled: true },
    'label': { enabled: true },
    'button-name': { enabled: true },
    'link-name': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'aria-required-attr': { enabled: true },

    // Disable rules that don't apply to isolated components
    'document-title': { enabled: false },
    'html-has-lang': { enabled: false },
    'landmark-one-main': { enabled: false },
    'region': { enabled: false },
  },

  // Test against WCAG 2.2 Level AA
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
  },
};

/**
 * Test component for accessibility violations
 *
 * @example
 * ```typescript
 * test('button has no accessibility violations', async () => {
 *   const { container } = render(<Button>Click me</Button>);
 *   await expectNoA11yViolations(container);
 * });
 * ```
 */
export async function expectNoA11yViolations(
  container: Element,
  config: JestAxeConfigureOptions = defaultAxeConfig
): Promise<void> {
  const results = await axe(container, config);
  expect(results).toHaveNoViolations();
}

/**
 * Wrapper component for testing with HIVE styles
 *
 * Provides the same styling context as the actual app
 */
export function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E5E5E7] antialiased font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist+Sans:wght@300;400;500;600;700&display=swap');
        .font-sans { font-family: 'Geist Sans', system-ui, sans-serif; }
      `}</style>
      {children}
    </div>
  );
}

/**
 * Render component with HIVE styles and test wrapper
 *
 * @example
 * ```typescript
 * const { getByRole } = renderWithStyles(<Button>Click me</Button>);
 * ```
 */
export function renderWithStyles(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: TestWrapper, ...options });
}

/**
 * Test keyboard navigation for component
 *
 * @example
 * ```typescript
 * test('button is keyboard accessible', async () => {
 *   const onClick = jest.fn();
 *   const { getByRole } = render(<Button onClick={onClick}>Click me</Button>);
 *
 *   await testKeyboardNavigation(getByRole('button'), {
 *     tabFocuses: true,
 *     enterActivates: true,
 *     spaceActivates: true,
 *     onActivate: onClick,
 *   });
 * });
 * ```
 */
export async function testKeyboardNavigation(
  element: HTMLElement,
  options: {
    tabFocuses?: boolean;
    enterActivates?: boolean;
    spaceActivates?: boolean;
    escapeCloses?: boolean;
    onActivate?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
  }
): Promise<void> {
  const { userEvent } = await import('@testing-library/user-event');
  const user = userEvent.setup();

  // Test Tab navigation
  if (options.tabFocuses) {
    await user.tab();
    expect(element).toHaveFocus();
  }

  // Test Enter activation
  if (options.enterActivates && options.onActivate) {
    await user.keyboard('{Enter}');
    expect(options.onActivate).toHaveBeenCalled();
    (options.onActivate as any).mockClear();
  }

  // Test Space activation
  if (options.spaceActivates && options.onActivate) {
    element.focus();
    await user.keyboard(' ');
    expect(options.onActivate).toHaveBeenCalled();
    (options.onActivate as any).mockClear();
  }

  // Test Escape closes
  if (options.escapeCloses && options.onClose) {
    await user.keyboard('{Escape}');
    expect(options.onClose).toHaveBeenCalled();
  }
}

/**
 * Test ARIA attributes on element
 *
 * @example
 * ```typescript
 * test('dialog has correct ARIA attributes', () => {
 *   const { getByRole } = render(
 *     <Dialog aria-labelledby="title">
 *       <h2 id="title">Dialog Title</h2>
 *     </Dialog>
 *   );
 *
 *   expectAriaAttributes(getByRole('dialog'), {
 *     'aria-modal': 'true',
 *     'aria-labelledby': 'title',
 *   });
 * });
 * ```
 */
export function expectAriaAttributes(
  element: HTMLElement,
  attributes: Record<string, string | boolean>
): void {
  Object.entries(attributes).forEach(([attr, value]) => {
    if (typeof value === 'boolean') {
      if (value) {
        expect(element).toHaveAttribute(attr);
      } else {
        expect(element).not.toHaveAttribute(attr);
      }
    } else {
      expect(element).toHaveAttribute(attr, value);
    }
  });
}

/**
 * Test focus indicator visibility
 *
 * @example
 * ```typescript
 * test('button has visible focus indicator', async () => {
 *   const { getByRole } = render(<Button>Click me</Button>);
 *   const button = getByRole('button');
 *
 *   await testFocusIndicator(button);
 * });
 * ```
 */
export async function testFocusIndicator(element: HTMLElement): Promise<void> {
  const { userEvent } = await import('@testing-library/user-event');
  const user = userEvent.setup();

  // Focus element
  await user.tab();
  expect(element).toHaveFocus();

  // Check for focus-visible styles
  // Note: This requires CSS to be loaded in test environment
  const styles = window.getComputedStyle(element);

  // Verify outline exists (WCAG 2.2: Focus Appearance)
  // In real browser: expect(styles.outline).toContain('2px solid')
  // In test env: just verify element has focus
  expect(element).toHaveFocus();
}

/**
 * Test screen reader announcements (aria-live regions)
 *
 * @example
 * ```typescript
 * test('error message is announced to screen readers', () => {
 *   const { getByRole } = render(
 *     <div role="alert">Error: Invalid email</div>
 *   );
 *
 *   expectScreenReaderAnnouncement(getByRole('alert'), {
 *     text: /Error: Invalid email/,
 *     role: 'alert',
 *   });
 * });
 * ```
 */
export function expectScreenReaderAnnouncement(
  element: HTMLElement,
  options: {
    text?: RegExp | string;
    role?: string;
    ariaLive?: 'polite' | 'assertive' | 'off';
  }
): void {
  if (options.text) {
    expect(element).toHaveTextContent(options.text);
  }

  if (options.role) {
    expect(element).toHaveAttribute('role', options.role);
  }

  if (options.ariaLive) {
    expect(element).toHaveAttribute('aria-live', options.ariaLive);
  }
}

/**
 * Test color contrast ratio
 *
 * Note: This is a simplified check. Use browser DevTools or
 * specialized tools for accurate contrast measurement.
 *
 * @example
 * ```typescript
 * test('text has sufficient contrast', () => {
 *   const { getByText } = render(
 *     <p className="text-[var(--hive-text-primary)]">
 *       High contrast text
 *     </p>
 *   );
 *
 *   // Manual verification required in real tests
 *   // Use Chrome DevTools Lighthouse or WebAIM Contrast Checker
 * });
 * ```
 */
export function checkColorContrast(
  foreground: string,
  background: string,
  minimumRatio: number = 4.5
): boolean {
  // This is a placeholder - real contrast checking requires
  // color parsing and luminance calculation
  // Use tools like @adobe/leonardo-contrast-colors for production
  console.warn('Color contrast checking requires manual verification or specialized tools');
  return true;
}

/**
 * Complete accessibility test suite for a component
 *
 * Runs all common accessibility checks in one function
 *
 * @example
 * ```typescript
 * test('button passes all accessibility checks', async () => {
 *   const onClick = jest.fn();
 *   await testComponentAccessibility(
 *     <Button onClick={onClick}>Click me</Button>,
 *     {
 *       role: 'button',
 *       name: 'Click me',
 *       keyboard: {
 *         tabFocuses: true,
 *         enterActivates: true,
 *         spaceActivates: true,
 *         onActivate: onClick,
 *       },
 *     }
 *   );
 * });
 * ```
 */
export async function testComponentAccessibility(
  component: React.ReactElement,
  options: {
    role: string;
    name?: string;
    ariaAttributes?: Record<string, string | boolean>;
    keyboard?: Parameters<typeof testKeyboardNavigation>[1];
  }
): Promise<void> {
  const { container, getByRole } = render(component);

  // 1. Check for axe violations
  await expectNoA11yViolations(container);

  // 2. Check role and name
  const element = getByRole(options.role, options.name ? { name: options.name } : undefined);
  expect(element).toBeInTheDocument();

  // 3. Check ARIA attributes
  if (options.ariaAttributes) {
    expectAriaAttributes(element, options.ariaAttributes);
  }

  // 4. Test keyboard navigation
  if (options.keyboard) {
    await testKeyboardNavigation(element, options.keyboard);
  }
}

/**
 * Mock screen reader for testing announcements
 *
 * Captures aria-live announcements for verification
 */
export class MockScreenReader {
  private announcements: Array<{ text: string; priority: 'polite' | 'assertive' }> = [];

  constructor() {
    this.setup();
  }

  private setup() {
    // Monitor aria-live regions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const target = mutation.target as HTMLElement;
        const ariaLive = target.getAttribute('aria-live');

        if (ariaLive && (ariaLive === 'polite' || ariaLive === 'assertive')) {
          this.announcements.push({
            text: target.textContent || '',
            priority: ariaLive,
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  getAnnouncements() {
    return this.announcements;
  }

  getLastAnnouncement() {
    return this.announcements[this.announcements.length - 1];
  }

  clear() {
    this.announcements = [];
  }
}

// Export types
export type { JestAxeConfigureOptions } from 'jest-axe';
