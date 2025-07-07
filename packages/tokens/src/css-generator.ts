/**
 * HIVE Design System - CSS Variable Generator
 * Automatically generates CSS variables from design tokens
 * Ensures platform-wide consistency
 */

import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { motion } from './motion';

/**
 * Convert hex colors to HSL for CSS variables
 */
function hexToHsl(hex: string): string {
  // Remove the hash if present
  hex = hex.replace('#', '');
  
  // Parse the hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }

    h /= 6;
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Generate CSS custom properties from design tokens
 */
export function generateCSSVariables(): string {
  const cssVars: string[] = [];

  // Header comment
  cssVars.push('/* ============================================================================');
  cssVars.push(' * HIVE DESIGN SYSTEM v2.0 - AUTO-GENERATED CSS VARIABLES');
  cssVars.push(' * Generated from packages/tokens - DO NOT EDIT MANUALLY');
  cssVars.push(' * ============================================================================ */');
  cssVars.push('');

  // Core colors
  cssVars.push('/* Core Brand Colors - Monochrome + Gold System */');
  cssVars.push(`--background: ${hexToHsl(colors.background)};`);
  cssVars.push(`--foreground: ${hexToHsl(colors.foreground)};`);
  cssVars.push(`--surface: ${hexToHsl(colors.surface)};`);
  cssVars.push(`--border: ${hexToHsl(colors.border)};`);
  cssVars.push(`--muted: ${hexToHsl(colors.muted)};`);
  cssVars.push(`--disabled: ${hexToHsl(colors.disabled)};`);
  cssVars.push('');

  // Surface hierarchy
  cssVars.push('/* Surface Hierarchy (Depth System) */');
  cssVars.push(`--surface-01: ${hexToHsl(colors["surface-01"])};`);
  cssVars.push(`--surface-02: ${hexToHsl(colors["surface-02"])};`);
  cssVars.push(`--surface-03: ${hexToHsl(colors["surface-03"])};`);
  cssVars.push('');

  // Gold accent system
  cssVars.push('/* Gold Accent System (≤10% usage) */');
  cssVars.push(`--accent: ${hexToHsl(colors.accent.DEFAULT)};`);
  cssVars.push(`--accent-hover: ${hexToHsl(colors.accent[600])};`);
  cssVars.push(`--accent-active: ${hexToHsl(colors.accent[700])};`);
  cssVars.push(`--accent-foreground: ${hexToHsl(colors.background)};`);
  cssVars.push('');

  // Focus system
  cssVars.push('/* Focus & Ring System */');
  cssVars.push(`--ring: ${hexToHsl(colors.ring)};`);
  cssVars.push(`--ring-offset: ${hexToHsl(colors["ring-offset"])};`);
  cssVars.push('');

  // Typography scale
  cssVars.push('/* Typography System */');
  cssVars.push(`--font-display: ${typography.fontFamily.display.join(', ')};`);
  cssVars.push(`--font-sans: ${typography.fontFamily.sans.join(', ')};`);
  cssVars.push(`--font-mono: ${typography.fontFamily.mono.join(', ')};`);
  cssVars.push('');

  cssVars.push('/* Typography Scale */');
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`--text-${key}: ${value.size};`);
  });
  cssVars.push('');

  // Spacing scale
  cssVars.push('/* Spacing System */');
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars.push(`--spacing-${key}: ${value};`);
  });
  cssVars.push('');

  // Motion system
  cssVars.push('/* Motion System - HIVE Brand Timing */');
  Object.entries(motion.easing).forEach(([key, value]) => {
    cssVars.push(`--motion-${key}: ${value};`);
  });
  cssVars.push('');

  Object.entries(motion.duration).forEach(([key, value]) => {
    cssVars.push(`--motion-${key}: ${value};`);
  });
  cssVars.push('');

  return cssVars.join('\n');
}

/**
 * Generate utility classes for design tokens
 */
export function generateUtilityClasses(): string {
  const utilities: string[] = [];

  utilities.push('/* ============================================================================');
  utilities.push(' * HIVE DESIGN SYSTEM UTILITY CLASSES');
  utilities.push(' * ============================================================================ */');
  utilities.push('');

  // Typography utilities
  utilities.push('/* Typography Utilities */');
  Object.keys(typography.fontSize).forEach(key => {
    utilities.push(`.text-${key} {`);
    utilities.push(`  font-size: var(--text-${key});`);
    utilities.push(`  line-height: ${typography.fontSize[key as keyof typeof typography.fontSize].lineHeight};`);
    utilities.push(`  font-weight: ${typography.fontSize[key as keyof typeof typography.fontSize].fontWeight};`);
    utilities.push('}');
    utilities.push('');
  });

  // Motion utilities
  utilities.push('/* Motion Utilities */');
  Object.keys(motion.duration).forEach(key => {
    utilities.push(`.transition-hive-${key} {`);
    utilities.push(`  transition-duration: var(--motion-${key});`);
    utilities.push(`  transition-timing-function: var(--motion-hive);`);
    utilities.push('}');
    utilities.push('');
  });

  // Surface utilities
  utilities.push('/* Surface Utilities */');
  ['01', '02', '03'].forEach(level => {
    utilities.push(`.surface-${level} {`);
    utilities.push(`  background-color: hsl(var(--surface-${level}));`);
    utilities.push('}');
    utilities.push('');
  });

  // Focus utilities
  utilities.push('/* Focus Utilities */');
  utilities.push('.focus-hive {');
  utilities.push('  outline: 2px solid hsl(var(--ring));');
  utilities.push('  outline-offset: 2px;');
  utilities.push('}');
  utilities.push('');

  return utilities.join('\n');
}

/**
 * Generate complete CSS file with variables and utilities
 */
export function generateCompleteCSS(): string {
  const sections: string[] = [];

  sections.push(':root {');
  sections.push(generateCSSVariables());
  sections.push('}');
  sections.push('');

  sections.push('.dark {');
  sections.push('/* HIVE is dark-first - same values as root */');
  sections.push(generateCSSVariables());
  sections.push('}');
  sections.push('');

  sections.push('@layer utilities {');
  sections.push(generateUtilityClasses());
  sections.push('}');

  return sections.join('\n');
}

/**
 * Validate design token consistency
 */
export function validateTokens(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check border color compliance
  if (colors.border !== '#2A2A2A') {
    errors.push(`Border color violation: Expected #2A2A2A, got ${colors.border}`);
  }

  // Check gold accent compliance
  if (colors.accent.DEFAULT !== '#FFD700') {
    errors.push(`Gold accent violation: Expected #FFD700, got ${colors.accent.DEFAULT}`);
  }

  if (colors.accent[600] !== '#EAC200') {
    errors.push(`Gold hover violation: Expected #EAC200, got ${colors.accent[600]}`);
  }

  if (colors.accent[700] !== '#C4A500') {
    errors.push(`Gold active violation: Expected #C4A500, got ${colors.accent[700]}`);
  }

  // Check motion timing compliance
  if (motion.duration.base !== '180ms') {
    errors.push(`Motion timing violation: Expected 180ms, got ${motion.duration.base}`);
  }

  if (motion.easing.hive !== 'cubic-bezier(0.33, 0.65, 0, 1)') {
    errors.push(`Motion curve violation: Expected HIVE brand curve, got ${motion.easing.hive}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export default {
  generateCSSVariables,
  generateUtilityClasses,
  generateCompleteCSS,
  validateTokens
};