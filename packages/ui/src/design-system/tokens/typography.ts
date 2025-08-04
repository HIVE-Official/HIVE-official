/**
 * HIVE Typography System
 * Semantic typography tokens for campus-first design
 */

export const typography = {
  // Font Families
  fontFamily: {
    body: 'var(--hive-font-body)',
    heading: 'var(--hive-font-heading)',
    mono: 'var(--hive-font-mono)',
  },

  // Font Sizes
  fontSize: {
    xs: 'var(--hive-text-xs)',
    sm: 'var(--hive-text-sm)',
    base: 'var(--hive-text-base)',
    lg: 'var(--hive-text-lg)',
    xl: 'var(--hive-text-xl)',
    '2xl': 'var(--hive-text-2xl)',
    '3xl': 'var(--hive-text-3xl)',
  },

  // Font Weights
  fontWeight: {
    normal: 'var(--hive-font-weight-normal)',
    medium: 'var(--hive-font-weight-medium)',
    semibold: 'var(--hive-font-weight-semibold)',
    bold: 'var(--hive-font-weight-bold)',
  },

  // Line Heights
  lineHeight: {
    tight: 'var(--hive-line-height-tight)',
    normal: 'var(--hive-line-height-normal)',
    relaxed: 'var(--hive-line-height-relaxed)',
  },

  // Letter Spacing
  letterSpacing: {
    tight: 'var(--hive-letter-spacing-tight)',
    normal: 'var(--hive-letter-spacing-normal)',
    wide: 'var(--hive-letter-spacing-wide)',
  },
} as const;

export type TypographyToken = keyof typeof typography;
export type FontFamily = keyof typeof typography.fontFamily;
export type FontSize = keyof typeof typography.fontSize;
export type FontWeight = keyof typeof typography.fontWeight;
export type LineHeight = keyof typeof typography.lineHeight;
export type LetterSpacing = keyof typeof typography.letterSpacing;