import * as React from "react";
export interface SkipNavProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * Target element ID to skip to (without #)
     * @default "main-content"
     */
    targetId?: string;
    /**
     * Text to display when focused
     * @default "Skip to main content"
     */
    children?: React.ReactNode;
}
/**
 * SkipNav - Accessibility component for keyboard navigation
 *
 * Provides a hidden link that becomes visible when focused,
 * allowing keyboard users to skip repetitive navigation.
 *
 * WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks)
 *
 * @example
 * ```tsx
 * <SkipNav />
 * <Navigation />
 * <main id="main-content">...</main>
 * ```
 *
 * @example Custom target
 * ```tsx
 * <SkipNav targetId="dashboard" />
 * <div id="dashboard">...</div>
 * ```
 */
declare const SkipNav: React.ForwardRefExoticComponent<SkipNavProps & React.RefAttributes<HTMLAnchorElement>>;
export { SkipNav };
//# sourceMappingURL=skip-nav.d.ts.map