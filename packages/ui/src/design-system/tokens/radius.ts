/**
 * HIVE Radius System
 * Semantic radius tokens for campus-first design
 */

export const radius = {
  none: 'var(--hive-radius-none)',
  xs: 'var(--hive-radius-xs)',
  sm: 'var(--hive-radius-sm)',
  md: 'var(--hive-radius-md)',
  lg: 'var(--hive-radius-lg)',
  xl: 'var(--hive-radius-xl)',
  '2xl': 'var(--hive-radius-2xl)',
  '3xl': 'var(--hive-radius-3xl)',
  full: 'var(--hive-radius-full)',
} as const;

export type RadiusToken = keyof typeof radius;