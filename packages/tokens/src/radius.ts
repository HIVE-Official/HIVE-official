// Border radius design tokens - Heavy Radius Design

export const radius = {
  none: '0',                    // No radius
  sm: '0.5rem',                 // 8px - Small elements
  md: '0.75rem',                // 12px - Standard elements  
  lg: '1rem',                   // 16px - Cards, buttons
  xl: '1.5rem',                 // 24px - Large cards
  '2xl': '2rem',                // 32px - Hero elements
  full: '9999px',               // Perfect circles
} as const;

export type RadiusToken = keyof typeof radius;