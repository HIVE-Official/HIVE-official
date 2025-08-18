// Spacing design tokens - Mobile-Optimized 4px Grid System (HIVE Standard)

export const spacing = {
  // Core 4px grid - base unit is 4px (mobile-optimized)
  0: '0',                    // 0px
  1: '0.25rem',             // 4px - base unit (mobile-first)
  2: '0.5rem',              // 8px  
  3: '0.75rem',             // 12px
  4: '1rem',                // 16px
  5: '1.25rem',             // 20px
  6: '1.5rem',              // 24px
  8: '2rem',                // 32px
  10: '2.5rem',             // 40px
  12: '3rem',               // 48px
  16: '4rem',               // 64px
  20: '5rem',               // 80px
  24: '6rem',               // 96px
  32: '8rem',               // 128px
  
  // Legacy aliases for backwards compatibility (mobile-optimized)
  xs: '0.25rem',            // 4px (space-1)
  sm: '0.5rem',             // 8px (space-2)
  md: '1rem',               // 16px (space-4)
  lg: '1.5rem',             // 24px (space-6)
  xl: '2rem',               // 32px (space-8)
  '2xl': '3rem',            // 48px (space-12)
  
  // NEW: Add missing commonly used spacing gaps from audit (mobile-optimized)
  7: '1.75rem',             // 28px - common in layouts
  14: '3.5rem',             // 56px - major section gaps  
  18: '4.5rem',             // 72px - large section spacing
  28: '7rem',               // 112px - hero spacing
} as const;

// NEW: Common layout dimensions for hybrid approach (Option B)
export const layoutSizes = {
  height: {
    xs: '12.5rem',          // 200px - common arbitrary value h-[200px]
    sm: '18.75rem',         // 300px - common arbitrary value h-[300px]  
    md: '25rem',            // 400px - common arbitrary value h-[400px]
    lg: '31.25rem',         // 500px - very common arbitrary value h-[500px]
  },
  width: {
    xs: '8.75rem',          // 140px - common arbitrary value w-[140px]
    sm: '12.5rem',          // 200px - common arbitrary value w-[200px]
    md: '25rem',            // 400px - common arbitrary value w-[400px]
  }
} as const;

export type SpacingToken = keyof typeof spacing;
export type LayoutSizeToken = keyof typeof layoutSizes; 