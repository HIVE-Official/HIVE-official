/**
 * HIVE Design System
 * Campus-first design system for the HIVE platform
 *
 * Directory Structure:
 * ├── tokens/        # Color, typography, spacing, shadows, radius
 * ├── components/    # Base component re-exports with design system interface
 * │   └── base/      # Button, Input, Card, Badge, Modal, etc.
 * ├── layout/        # Grid, Container, Stack layout components
 * └── themes/        # Base, dark, accessibility themes
 */
export * from './tokens';
export * from './components/base';
export * from './layout';
export * from './themes';
export { responsiveBreakpoints, responsiveSpace, touchTargets, type ResponsiveBreakpoint, type ResponsiveSpacing, type TouchTarget } from '../lib/responsive-foundation';
export { getFormA11yProps, getInteractiveA11yProps, getTestProps } from '../lib/accessibility-foundation';
export { componentBase } from '../lib/component-foundation';
export declare const designSystem: {
    readonly name: "HIVE Design System";
    readonly version: "1.0.0";
    readonly description: "Campus-first design system for the HIVE platform";
    readonly principles: {
        readonly campusFirst: "Designed specifically for university and campus environments";
        readonly accessible: "WCAG 2.1 AA compliant with accessibility-first approach";
        readonly responsive: "Mobile-first responsive design for all screen sizes";
        readonly consistent: "Systematic approach to design tokens and component patterns";
        readonly scalable: "Built to grow with the platform and support new features";
    };
    readonly features: {
        readonly tokens: "Semantic design tokens for colors, spacing, typography";
        readonly components: "Comprehensive base component library";
        readonly layout: "Flexible grid, container, and stack layout system";
        readonly themes: "Multi-theme support including dark mode and accessibility";
        readonly responsive: "Mobile-first responsive utilities and breakpoints";
        readonly accessibility: "Built-in WCAG compliance and screen reader support";
    };
};
//# sourceMappingURL=index.d.ts.map