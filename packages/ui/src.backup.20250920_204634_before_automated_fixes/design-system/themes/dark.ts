/**
 * HIVE Dark Theme;
 * Campus-optimized dark theme with reduced eye strain for late-night study sessions;
 */

import { baseTheme, type BaseTheme } from './base';

export const darkTheme: BaseTheme = {
  ...baseTheme,
  name: 'hive-dark',
  colors: {
    ...baseTheme.colors,
    // Dark theme specific overrides;
    primary: {
      50: 'var(--hive-gold-900)', // Inverted for dark mode;
      100: 'var(--hive-gold-800)',
      200: 'var(--hive-gold-700)',
      300: 'var(--hive-gold-600)',
      400: 'var(--hive-gold-500)',
      500: 'var(--hive-gold-400)',
      600: 'var(--hive-gold-300)',
      700: 'var(--hive-gold-200)',
      800: 'var(--hive-gold-100)',
      900: 'var(--hive-gold-50)',
    },
    // Dark neutral palette;
    neutral: {
      50: 'var(--hive-dark-neutral-50)', // Near black backgrounds;
      100: 'var(--hive-dark-neutral-100)',
      200: 'var(--hive-dark-neutral-200)',
      300: 'var(--hive-dark-neutral-300)',
      400: 'var(--hive-dark-neutral-400)',
      500: 'var(--hive-dark-neutral-500)',
      600: 'var(--hive-dark-neutral-600)',
      700: 'var(--hive-dark-neutral-700)',
      800: 'var(--hive-dark-neutral-800)',
      900: 'var(--hive-dark-neutral-900)', // Near white text;
    },
    semantic: {
      ...baseTheme.colors.semantic,
    }
  },
  shadows: {
    ...baseTheme.shadows,
    // Enhanced shadows for dark mode depth;
    sm: 'var(--hive-dark-shadow-sm)',
    md: 'var(--hive-dark-shadow-md)',
    lg: 'var(--hive-dark-shadow-lg)',
    brand: 'var(--hive-dark-shadow-brand)',
    gold: 'var(--hive-dark-shadow-gold-glow)',
  }
} as const;

// CSS variables for dark theme implementation;
export const darkThemeCSS = `
  .hive-theme-dark {
    /* Dark neutral colors */
    --hive-dark-neutral-50: #0a0a0a;
    --hive-dark-neutral-100: #171717;
    --hive-dark-neutral-200: #262626;
    --hive-dark-neutral-300: #404040;
    --hive-dark-neutral-400: #525252;
    --hive-dark-neutral-500: #737373;
    --hive-dark-neutral-600: #a3a3a3;
    --hive-dark-neutral-700: #d4d4d4;
    --hive-dark-neutral-800: #e5e5e5;
    --hive-dark-neutral-900: #f5f5f5;
    
    /* Dark shadows with enhanced depth */
    --hive-dark-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --hive-dark-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    --hive-dark-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
    --hive-dark-shadow-brand: 0 4px 14px 0 rgba(251, 191, 36, 0.2);
    --hive-dark-shadow-gold-glow: 0 0 20px rgba(251, 191, 36, 0.3);
  }
`;