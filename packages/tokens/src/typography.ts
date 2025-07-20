// Typography design tokens

export const typography = {
  fontFamily: {
    sans: ['Geist Sans', 'system-ui', 'sans-serif'],
    display: ['Space Grotesk', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    // Display Scale (Hero/Marketing)
    'display-2xl': '4.5rem',      // 72px - Hero headlines
    'display-xl': '3.75rem',      // 60px - Large headlines
    'display-lg': '3rem',         // 48px - Section headlines
    'display-md': '2.25rem',      // 36px - Page titles
    'display-sm': '1.875rem',     // 30px - Subsection titles
    
    // Heading Scale
    'heading-xl': '1.5rem',       // 24px - Main headings
    'heading-lg': '1.25rem',      // 20px - Section headings
    'heading-md': '1.125rem',     // 18px - Subsection headings
    'heading-sm': '1rem',         // 16px - Small headings
    
    // Body Scale
    'body-lg': '1.125rem',        // 18px - Large body text
    'body-md': '1rem',            // 16px - Standard body text
    'body-sm': '0.875rem',        // 14px - Small body text
    'body-xs': '0.75rem',         // 12px - Small text
    'body-2xs': '0.625rem',       // 10px - Captions
    
    // Legacy aliases for backwards compatibility
    xs: '0.75rem',               // 12px (body-xs)
    sm: '0.875rem',              // 14px (body-sm)
    base: '1rem',                // 16px (body-md)
    lg: '1.125rem',              // 18px (body-lg)
    xl: '1.25rem',               // 20px (heading-lg)
    '2xl': '1.5rem',             // 24px (heading-xl)
  },
  fontWeight: {
    light: '300',                // Light text
    normal: '400',               // Body text
    medium: '500',               // Emphasized text
    semibold: '600',             // Headings
    bold: '700',                 // Strong emphasis
  },
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export type TypographyToken = keyof typeof typography; 