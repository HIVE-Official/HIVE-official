/**
 * Accessibility Testing Utilities for HIVE Design System
 *
 * These utilities make it easy to test components for accessibility
 * compliance using jest-axe and @testing-library/react.
 *
 * @see packages/ui/ACCESSIBILITY.md for full testing guide
 */
import React from 'react';
import { RenderOptions } from '@testing-library/react';
import { JestAxeConfigureOptions } from 'jest-axe';
import '@testing-library/jest-dom';
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
export declare const defaultAxeConfig: JestAxeConfigureOptions;
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
export declare function expectNoA11yViolations(container: Element, config?: JestAxeConfigureOptions): Promise<void>;
/**
 * Wrapper component for testing with HIVE styles
 *
 * Provides the same styling context as the actual app
 */
export declare function TestWrapper({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Render component with HIVE styles and test wrapper
 *
 * @example
 * ```typescript
 * const { getByRole } = renderWithStyles(<Button>Click me</Button>);
 * ```
 */
export declare function renderWithStyles(ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>): import("@testing-library/react").RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
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
export declare function testKeyboardNavigation(element: HTMLElement, options: {
    tabFocuses?: boolean;
    enterActivates?: boolean;
    spaceActivates?: boolean;
    escapeCloses?: boolean;
    onActivate?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
}): Promise<void>;
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
export declare function expectAriaAttributes(element: HTMLElement, attributes: Record<string, string | boolean>): void;
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
export declare function testFocusIndicator(element: HTMLElement): Promise<void>;
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
export declare function expectScreenReaderAnnouncement(element: HTMLElement, options: {
    text?: RegExp | string;
    role?: string;
    ariaLive?: 'polite' | 'assertive' | 'off';
}): void;
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
export declare function checkColorContrast(foreground: string, background: string, minimumRatio?: number): boolean;
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
export declare function testComponentAccessibility(component: React.ReactElement, options: {
    role: string;
    name?: string;
    ariaAttributes?: Record<string, string | boolean>;
    keyboard?: Parameters<typeof testKeyboardNavigation>[1];
}): Promise<void>;
/**
 * Mock screen reader for testing announcements
 *
 * Captures aria-live announcements for verification
 */
export declare class MockScreenReader {
    private announcements;
    constructor();
    private setup;
    getAnnouncements(): {
        text: string;
        priority: "polite" | "assertive";
    }[];
    getLastAnnouncement(): {
        text: string;
        priority: "polite" | "assertive";
    };
    clear(): void;
}
export type { JestAxeConfigureOptions } from 'jest-axe';
//# sourceMappingURL=test-utils.d.ts.map