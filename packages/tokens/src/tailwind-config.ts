// Tailwind CSS Configuration Extension for HIVE Design Tokens
import { overlay, shadows } from './colors';
import { prdTailwindColors } from './colors-prd-aligned';
import { typography } from './typography';
import { spacing, layoutSizes } from './spacing';
import { radius } from './radius';

// Generate Tailwind color palette from design tokens
export const hiveTailwindColors = {
  // PRD-aligned semantic colors
  ...prdTailwindColors,
  // Glass/overlay effects from legacy until replaced by PRD counterparts
  glass: overlay.glass,
  'glass-medium': overlay['glass-medium'],
  'glass-strong': overlay['glass-strong'],
  'gold-subtle': overlay['gold-subtle'],
  'gold-medium': overlay['gold-medium'],
  'gold-strong': overlay['gold-strong'],
  'gold-glow': overlay['gold-glow'],
};

// Generate Tailwind spacing from design tokens
export const hiveTailwindSpacing = {
  ...spacing,
};

// Generate Tailwind font sizes from design tokens
export const hiveTailwindFontSizes = {
  ...typography.fontSize,
};

// Generate Tailwind border radius from design tokens
export const hiveTailwindBorderRadius = {
  ...radius,
};

// Generate Tailwind box shadows from design tokens
export const hiveTailwindBoxShadow = {
  'level1': shadows.level1,
  'level2': shadows.level2,
  'level3': shadows.level3,
  'level4': shadows.level4,
  'level5': shadows.level5,
  'hover': shadows.hover,
  'active': shadows.active,
  'focus': shadows.focus,
  'gold-glow': shadows['gold-glow'],
  'gold-glow-strong': shadows['gold-glow-strong'],
  'emerald-glow': shadows['emerald-glow'],
  'ruby-glow': shadows['ruby-glow'],
  'inset-deep': shadows['inset-deep'],
  'inset-soft': shadows['inset-soft'],
};

// Complete Tailwind config extension
export const hiveTailwindConfig = {
  colors: hiveTailwindColors,
  spacing: hiveTailwindSpacing,
  fontSize: hiveTailwindFontSizes,
  borderRadius: hiveTailwindBorderRadius,
  boxShadow: hiveTailwindBoxShadow,
  // NEW: Add layout dimensions for hybrid approach
  height: layoutSizes.height,
  width: layoutSizes.width,
  fontFamily: {
    sans: typography.fontFamily.sans,
    mono: typography.fontFamily.mono,
  },
  fontWeight: typography.fontWeight,
  lineHeight: typography.lineHeight,
  letterSpacing: typography.letterSpacing,
  animation: {
    'hive-glow': 'hive-glow 2s ease-in-out infinite alternate',
    'hive-float': 'hive-float 3s ease-in-out infinite',
    'hive-scale': 'hive-scale 0.3s ease-out',
  },
  transitionTimingFunction: {
    'hive-smooth': 'cubic-bezier(0.23, 1, 0.32, 1)',
  },
  keyframes: {
    'hive-glow': {
      '0%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' },
      '100%': { boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)' },
    },
    'hive-float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-10px)' },
    },
    'hive-scale': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.05)' },
      '100%': { transform: 'scale(1)' },
    },
  },
};

// Utility function to merge with existing Tailwind config
export function extendTailwindConfig(existingConfig: Record<string, unknown> = {}) {
  const existingTheme = (existingConfig.theme as Record<string, unknown>) || {};
  const existingExtend = (existingTheme.extend as Record<string, unknown>) || {};
  
  return {
    ...existingConfig,
    theme: {
      ...existingTheme,
      extend: {
        ...existingExtend,
        ...hiveTailwindConfig,
      },
    },
  };
}

export default hiveTailwindConfig;
