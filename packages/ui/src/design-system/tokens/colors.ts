/**
 * HIVE Color System
 * Semantic color tokens for campus-first design
 */

export const colors = {
  // Brand Colors
  brand: {
    primary: 'var(--hive-brand-primary)',
    secondary: 'var(--hive-brand-secondary)',
    tertiary: 'var(--hive-brand-tertiary)',
  },

  // Background Colors
  background: {
    primary: 'var(--hive-background-primary)',
    secondary: 'var(--hive-background-secondary)',
    tertiary: 'var(--hive-background-tertiary)',
    elevated: 'var(--hive-background-elevated)',
    'elevated-strong': 'var(--hive-background-elevated-strong)',
    disabled: 'var(--hive-background-disabled)',
  },

  // Text Colors
  text: {
    primary: 'var(--hive-text-primary)',
    secondary: 'var(--hive-text-secondary)',
    tertiary: 'var(--hive-text-tertiary)',
    placeholder: 'var(--hive-text-placeholder)',
    disabled: 'var(--hive-text-disabled)',
  },

  // Border Colors
  border: {
    primary: 'var(--hive-border-primary)',
    secondary: 'var(--hive-border-secondary)',
    subtle: 'var(--hive-border-subtle)',
    disabled: 'var(--hive-border-disabled)',
  },

  // Interactive Colors
  interactive: {
    hover: 'var(--hive-interactive-hover)',
    pressed: 'var(--hive-interactive-pressed)',
    focus: 'var(--hive-interactive-focus)',
  },

  // Status Colors
  status: {
    success: 'var(--hive-status-success)',
    warning: 'var(--hive-status-warning)',
    error: 'var(--hive-status-error)',
    info: 'var(--hive-status-info)',
  },
} as const;

export type ColorToken = keyof typeof colors;
export type BrandColor = keyof typeof colors.brand;
export type BackgroundColor = keyof typeof colors.background;
export type TextColor = keyof typeof colors.text;
export type BorderColor = keyof typeof colors.border;
export type InteractiveColor = keyof typeof colors.interactive;
export type StatusColor = keyof typeof colors.status;