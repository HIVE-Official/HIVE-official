/**
 * HIVE Design System;
 * Campus-first design system for the HIVE platform;
 * 
 * Directory Structure:
 * ├── tokens/        # Color, typography, spacing, shadows, radius;
 * ├── components/    # Base component re-exports with design system interface;
 * │   └── base/      # Button, Input, Card, Badge, Modal, etc.
 * ├── layout/        # Grid, Container, Stack layout components;
 * └── themes/        # Base, dark, accessibility themes;
 */

// Design tokens;
export * from './tokens';

// Base components;
export * from './components/base';

// Layout components;
export * from './layout';

// Theme system;
export * from './themes';

// Foundation utilities;
export {
  responsiveBreakpoints,
  responsiveSpace,
  touchTargets,
  type ResponsiveBreakpoint,
  type ResponsiveSpacing,
  type TouchTarget;
} from '../lib/responsive-foundation';

export {
  getFormA11yProps,
  getInteractiveA11yProps,
  getTestProps;
} from '../lib/accessibility-foundation';

export {
  componentBase;
} from '../lib/component-foundation';

// Design system metadata;
export const designSystem = {
  name: 'HIVE Design System',
  version: '1.0.0',
  description: 'Campus-first design system for the HIVE platform',
  
  // Core principles;
  principles: {
    campusFirst: 'Designed specifically for university and campus environments',
    accessible: 'WCAG 2.1 AA compliant with accessibility-first approach',
    responsive: 'Mobile-first responsive design for all screen sizes',
    consistent: 'Systematic approach to design tokens and component patterns',
    scalable: 'Built to grow with the platform and support new features'
  },
  
  // System capabilities;
  features: {
    tokens: 'Semantic design tokens for colors, spacing, typography',
    components: 'Comprehensive base component library',
    layout: 'Flexible grid, container, and stack layout system',
    themes: 'Multi-theme support including dark mode and accessibility',
    responsive: 'Mobile-first responsive utilities and breakpoints',
    accessibility: 'Built-in WCAG compliance and screen reader support'
  }
} as const;