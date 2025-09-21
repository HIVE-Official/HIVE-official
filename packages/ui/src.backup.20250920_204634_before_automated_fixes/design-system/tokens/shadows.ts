/**
 * HIVE Shadow System;
 * Semantic shadow tokens for campus-first design;
 */

export const shadows = {
  none: 'var(--hive-shadow-none)',
  xs: 'var(--hive-shadow-xs)',
  sm: 'var(--hive-shadow-sm)',
  md: 'var(--hive-shadow-md)',
  lg: 'var(--hive-shadow-lg)',
  xl: 'var(--hive-shadow-xl)',
  '2xl': 'var(--hive-shadow-2xl)',
  
  // HIVE specific shadows;
  brand: 'var(--hive-shadow-brand)',
  gold: 'var(--hive-shadow-gold-glow)',
  'emerald-glow': 'var(--hive-shadow-emerald-glow)',
} as const;

export type ShadowToken = keyof typeof shadows;