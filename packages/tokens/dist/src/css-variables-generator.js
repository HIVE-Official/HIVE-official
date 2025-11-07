// CSS VARIABLES GENERATOR
// Generates CSS custom properties from TypeScript design tokens
// This ensures single source of truth between TS and CSS
import { prdSemantic, prdCSSVariables } from './colors-prd-aligned';
import { overlay, shadows } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { radius } from './radius';
import { motion } from './motion';
/**
 * Generate CSS custom properties from design tokens
 */
export function generateCSSVariables() {
    const cssVariables = [
        '/* HIVE Design Tokens CSS Custom Properties - Auto-generated from TypeScript tokens */',
        ':root {',
    ];
    // Add the PRD-aligned CSS variables directly (skip the header :root)
    const prdCSS = prdCSSVariables.split('\n').slice(3, -2); // Skip header and remove closing }
    cssVariables.push(...prdCSS);
    // Add semantic colors with proper object handling
    cssVariables.push('\n  /* HIVE Semantic Colors */');
    // Background colors
    Object.entries(prdSemantic.background).forEach(([key, value]) => {
        cssVariables.push(`  --hive-background-${key}: ${value};`);
    });
    // Text colors
    Object.entries(prdSemantic.text).forEach(([key, value]) => {
        cssVariables.push(`  --hive-text-${key}: ${value};`);
    });
    // Brand colors
    Object.entries(prdSemantic.brand).forEach(([key, value]) => {
        cssVariables.push(`  --hive-brand-${key}: ${value};`);
    });
    // Interactive states
    Object.entries(prdSemantic.interactive).forEach(([key, value]) => {
        cssVariables.push(`  --hive-interactive-${key}: ${value};`);
    });
    // Status colors
    Object.entries(prdSemantic.status).forEach(([key, value]) => {
        cssVariables.push(`  --hive-status-${key}: ${value};`);
    });
    // Border colors
    Object.entries(prdSemantic.border).forEach(([key, value]) => {
        cssVariables.push(`  --hive-border-${key}: ${value};`);
    });
    // Legacy border aliases for compatibility with existing components
    cssVariables.push('  --hive-border-primary: var(--hive-border-default);');
    cssVariables.push('  --hive-border-secondary: var(--hive-border-strong);');
    // Overlay Colors
    cssVariables.push('\n  /* HIVE Overlay Colors */');
    Object.entries(overlay).forEach(([key, value]) => {
        cssVariables.push(`  --hive-overlay-${key}: ${value};`);
    });
    // Shadows
    cssVariables.push('\n  /* HIVE Shadows */');
    Object.entries(shadows).forEach(([key, value]) => {
        cssVariables.push(`  --hive-shadow-${key}: ${value};`);
    });
    // Spacing - Mobile-optimized
    cssVariables.push('\n  /* HIVE Spacing - Mobile-optimized */');
    Object.entries(spacing).forEach(([key, value]) => {
        cssVariables.push(`  --hive-spacing-${key}: ${value};`);
    });
    // Border Radius
    cssVariables.push('\n  /* HIVE Border Radius - Heavy Radius Design */');
    Object.entries(radius).forEach(([key, value]) => {
        cssVariables.push(`  --hive-radius-${key}: ${value};`);
    });
    // Typography
    cssVariables.push('\n  /* HIVE Typography - Mobile-optimized */');
    Object.entries(typography.fontSize).forEach(([key, value]) => {
        cssVariables.push(`  --hive-font-size-${key}: ${value};`);
    });
    // Typography families and weights
    cssVariables.push('\n  /* HIVE Typography */');
    Object.entries(typography.fontFamily).forEach(([key, value]) => {
        cssVariables.push(`  --hive-font-family-${key}: ${value};`);
    });
    Object.entries(typography.fontWeight).forEach(([key, value]) => {
        cssVariables.push(`  --hive-font-weight-${key}: ${value};`);
    });
    // Responsive System
    cssVariables.push('\n  /* HIVE Responsive System */');
    cssVariables.push('  --hive-component-density: 0.875;');
    cssVariables.push('  --hive-layout-density: 1;');
    cssVariables.push('  --hive-spacing-mobile: 0.875;');
    cssVariables.push('  --hive-spacing-tablet: 1;');
    cssVariables.push('  --hive-spacing-desktop: 1.125;');
    // Motion System
    cssVariables.push('\n  /* HIVE Motion */');
    Object.entries(motion.duration).forEach(([key, value]) => {
        cssVariables.push(`  --hive-duration-${key}: ${value};`);
    });
    Object.entries(motion.easing).forEach(([key, value]) => {
        cssVariables.push(`  --hive-easing-${key}: ${value};`);
    });
    // Transform Values
    cssVariables.push('\n  /* HIVE Transform Values */');
    Object.entries(motion.transform).forEach(([key, value]) => {
        cssVariables.push(`  --hive-transform-${key}: ${value};`);
    });
    // Design System Aliases for shadcn/ui compatibility
    cssVariables.push('\n  /* HIVE Design System - Dark Luxury Theme */');
    cssVariables.push('  --background: var(--hive-background-primary);');
    cssVariables.push('  --foreground: var(--hive-text-primary);');
    cssVariables.push('  --card: var(--hive-background-secondary);');
    cssVariables.push('  --card-foreground: var(--hive-text-primary);');
    cssVariables.push('  --popover: var(--hive-background-secondary);');
    cssVariables.push('  --popover-foreground: var(--hive-text-primary);');
    cssVariables.push('  --primary: var(--hive-brand-primary);');
    cssVariables.push('  --primary-foreground: var(--hive-background-primary);');
    cssVariables.push('  --secondary: var(--hive-background-tertiary);');
    cssVariables.push('  --secondary-foreground: var(--hive-text-primary);');
    cssVariables.push('  --muted: var(--hive-background-tertiary);');
    cssVariables.push('  --muted-foreground: var(--hive-text-muted);');
    cssVariables.push('  --accent: var(--hive-background-interactive);');
    cssVariables.push('  --accent-foreground: var(--hive-text-primary);');
    cssVariables.push('  --destructive: var(--hive-status-error);');
    cssVariables.push('  --destructive-foreground: var(--hive-text-primary);');
    cssVariables.push('  --border: var(--hive-border-primary);');
    cssVariables.push('  --input: var(--hive-border-primary);');
    cssVariables.push('  --ring: var(--hive-brand-primary);');
    cssVariables.push('  --radius: var(--hive-radius-lg);');
    cssVariables.push('}');
    return cssVariables.join('\n');
}
/**
 * Generate CSS utility classes from design tokens
 */
export function generateUtilityClasses() {
    const utilityClasses = [
        '\n/* HIVE Utility Classes - Auto-generated from design tokens */',
    ];
    // Glass morphism utilities
    utilityClasses.push(`
.hive-glass {
  background: var(--hive-overlay-glass, rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid var(--hive-border-subtle, rgba(255, 255, 255, 0.05));
}

.hive-glass-strong {
  background: var(--hive-overlay-glass-strong, rgba(255, 255, 255, 0.12));
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--hive-border-glass-strong, rgba(255, 255, 255, 0.12));
}`);
    // Interactive utilities
    utilityClasses.push(`
.hive-interactive {
  transition: all var(--hive-duration-smooth, 0.4s) var(--hive-easing, cubic-bezier(0.23, 1, 0.32, 1));
  will-change: transform, box-shadow;
  transform-origin: center;
  backface-visibility: hidden;
  transform: translateZ(0);
}

.hive-interactive:hover {
  transform: translateY(-2px) scale(var(--hive-transform-scaleHover, 1.02));
  box-shadow: var(--hive-shadow-hover, 0 8px 25px rgba(0, 0, 0, 0.3)), var(--hive-shadow-gold-glow, 0 0 20px rgba(255, 215, 0, 0.3));
}

.hive-interactive:active {
  transform: translateY(0) scale(var(--hive-transform-scaleTap, 0.98));
  transition-duration: var(--hive-duration-quick, 0.2s);
}`);
    // Typography utilities - Unified Geist Sans
    utilityClasses.push(`
.hive-font-display {
  font-family: var(--hive-font-family-sans, 'Geist Sans', system-ui, sans-serif);
  font-feature-settings: "rlig" 1, "calt" 1;
  font-weight: var(--hive-font-weight-semibold, 600);
  letter-spacing: -0.025em;
}

.hive-font-sans {
  font-family: var(--hive-font-family-sans, 'Geist Sans', system-ui, sans-serif);
  font-feature-settings: "rlig" 1, "calt" 1;
  font-weight: var(--hive-font-weight-normal, 400);
  letter-spacing: -0.01em;
}`);
    return utilityClasses.join('\n');
}
/**
 * Generate complete CSS file with variables and utilities
 */
export function generateCompleteCSS() {
    return [
        generateCSSVariables(),
        generateUtilityClasses()
    ].join('\n');
}
//# sourceMappingURL=css-variables-generator.js.map