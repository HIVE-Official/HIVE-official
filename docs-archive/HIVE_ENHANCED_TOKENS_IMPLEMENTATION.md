# HIVE Enhanced Tokens Implementation

## Implementation Plan - Geist Sans + Hybrid Spacing

Based on decisions:
- **All typography to Geist Sans** (replace Inter everywhere)
- **Hybrid spacing approach** (tokens for semantic, arbitrary for layouts)

---

## Enhanced Token Files

### `packages/ui/src/tokens/colors.ts`
```typescript
// Enhanced colors.ts - Add missing commonly used colors

// Keep ALL existing HIVE colors (metal theme)
export const existingColors = {
  dark: {
    void: '#000000',
    obsidian: '#0A0A0B', 
    charcoal: '#111113',
    graphite: '#1A1A1C',
    slate: '#222225',
    steel: '#2A2A2D',
  },
  light: {
    platinum: '#E5E5E7',
    silver: '#C1C1C4', 
    mercury: '#9B9B9F',
    pewter: '#6B6B70',
    smoke: '#4A4A4F',
  },
  gold: {
    primary: '#FFD700',
    champagne: '#F7E98E',
    amber: '#FFA500', 
    bronze: '#CD7F32',
  },
  status: {
    emerald: '#10B981',
    ruby: '#EF4444',
    sapphire: '#3B82F6',
    citrine: '#F59E0B',
  }
}

// NEW: Add missing colors found in audit
export const enhancedColors = {
  ...existingColors,
  
  // Missing text colors (60+ uses not tokenized)
  text: {
    mutedLight: '#A1A1AA',    // Most used non-tokenized color  
    mutedDark: '#71717A',     // Secondary muted
    subtle: '#6B6B70',        // Use existing pewter
  },
  
  // Missing border colors
  border: {
    muted: '#3F3F46',         // Subtle borders
    interactive: '#A1A1AA',   // Interactive elements
  },
  
  // Background variants (commonly used rgba patterns)
  backgrounds: {
    gold: 'rgba(255, 215, 0, 0.1)',      // rgba(255, 215, 0, 0.1) used everywhere
    success: 'rgba(16, 185, 129, 0.1)',  // Status backgrounds
    warning: 'rgba(245, 158, 11, 0.1)',
    error: 'rgba(239, 68, 68, 0.1)',
    glass: 'rgba(255, 255, 255, 0.02)',  // Glass morphism base
  }
}

export const colors = enhancedColors;
```

### `packages/ui/src/tokens/typography.ts` 
```typescript
// Enhanced typography.ts - All Geist Sans + Display sizes

export const typography = {
  fontFamily: {
    // CHANGE: All to Geist Sans (no more Inter)
    sans: ['Geist Sans', 'system-ui', 'sans-serif'],
    display: ['Space Grotesk', 'system-ui', 'sans-serif'],  
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    // Keep existing scale (already good)
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px  
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    
    // NEW: Display sizes for common arbitrary values
    'display-sm': '2.5rem',   // 40px - instead of [40px]
    'display-md': '3rem',     // 48px - instead of [48px]
    'display-lg': '3.75rem',  // 60px - instead of [60px] 
    'display-xl': '4.5rem',   // 72px - instead of [72px]
  },
  
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5', 
    relaxed: '1.625',
    loose: '2',
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  }
}
```

### `packages/ui/src/tokens/spacing.ts`
```typescript
// Enhanced spacing.ts - Hybrid Approach (Option B)

export const spacing = {
  // KEEP: Existing semantic spacing tokens (for padding, gaps, margins)
  '0': '0px',
  px: '1px', 
  '0.5': '0.125rem',    // 2px
  '1': '0.25rem',       // 4px
  '1.5': '0.375rem',    // 6px
  '2': '0.5rem',        // 8px
  '2.5': '0.625rem',    // 10px
  '3': '0.75rem',       // 12px
  '3.5': '0.875rem',    // 14px
  '4': '1rem',          // 16px
  '5': '1.25rem',       // 20px
  '6': '1.5rem',        // 24px
  '7': '1.75rem',       // 28px
  '8': '2rem',          // 32px
  '9': '2.25rem',       // 36px
  '10': '2.5rem',       // 40px
  '11': '2.75rem',      // 44px
  '12': '3rem',         // 48px
  
  // NEW: Add missing common spacing gaps found in audit
  '14': '3.5rem',       // 56px - common in layouts
  '16': '4rem',         // 64px 
  '18': '4.5rem',       // 72px - section spacing
  '20': '5rem',         // 80px
  '24': '6rem',         // 96px
  '28': '7rem',         // 112px - major gaps
  '32': '8rem',         // 128px
  '36': '9rem',         // 144px
  '40': '10rem',        // 160px
  '44': '11rem',        // 176px
  '48': '12rem',        // 192px
  '52': '13rem',        // 208px
  '56': '14rem',        // 224px
  '60': '15rem',        // 240px
  '64': '16rem',        // 256px
  '72': '18rem',        // 288px
  '80': '20rem',        // 320px
  '96': '24rem',        // 384px
}

// NEW: Common layout dimensions (for specific layout patterns)
export const layoutSizes = {
  height: {
    xs: '12.5rem',      // 200px - common arbitrary value
    sm: '18.75rem',     // 300px
    md: '25rem',        // 400px 
    lg: '31.25rem',     // 500px - very common arbitrary value
  },
  width: {
    xs: '8.75rem',      // 140px - common arbitrary value 
    sm: '12.5rem',      // 200px - common arbitrary value
    md: '25rem',        // 400px - common arbitrary value
  }
}

// Usage Guidelines for Hybrid Approach:
// 1. USE TOKENS FOR: Component padding, element gaps, consistent margins
// 2. USE ARBITRARY FOR: Hero sections, unique layouts, specific design requirements
// 3. USE LAYOUT SIZES FOR: Common height/width patterns
```

### `packages/ui/src/tokens/index.ts`
```typescript
// Main token exports
export { colors } from './colors';
export { typography } from './typography'; 
export { spacing, layoutSizes } from './spacing';

// Keep existing exports (shadows, radius, animations already good)
export { shadows } from './shadows';
export { borderRadius } from './border-radius'; 
export { animations } from './animations';
```

### `packages/ui/src/tokens/css-generator.ts`
```typescript
// Enhanced CSS custom property generation
import { colors, typography, spacing, layoutSizes } from './index';

export function generateCSSCustomProperties() {
  const cssVars: string[] = [];
  
  // Generate color custom properties
  function flattenColors(obj: any, prefix = '') {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        cssVars.push(`  --hive-${prefix}${key}: ${value};`);
      } else if (typeof value === 'object') {
        flattenColors(value, `${prefix}${key}-`);
      }
    });
  }
  
  flattenColors(colors, 'color-');
  
  // Generate typography custom properties  
  Object.entries(typography.fontFamily).forEach(([key, value]) => {
    cssVars.push(`  --hive-font-${key}: ${Array.isArray(value) ? value.join(', ') : value};`);
  });
  
  Object.entries(typography.fontSize).forEach(([key, value]) => {
    cssVars.push(`  --hive-text-${key}: ${value};`);
  });
  
  // Generate spacing custom properties
  Object.entries(spacing).forEach(([key, value]) => {
    cssVars.push(`  --hive-spacing-${key}: ${value};`);
  });
  
  // Generate layout size custom properties
  Object.entries(layoutSizes.height).forEach(([key, value]) => {
    cssVars.push(`  --hive-height-${key}: ${value};`);
  });
  
  Object.entries(layoutSizes.width).forEach(([key, value]) => {
    cssVars.push(`  --hive-width-${key}: ${value};`);
  });
  
  return `
:root {
${cssVars.join('\n')}
}
  `;
}

// Generate Tailwind config
export function generateTailwindConfig() {
  return {
    theme: {
      extend: {
        colors: {
          hive: colors,
        },
        fontFamily: typography.fontFamily,
        fontSize: typography.fontSize,
        spacing: spacing,
        height: layoutSizes.height,
        width: layoutSizes.width,
      }
    }
  };
}
```

---

## Implementation Steps

### **Step 1: Font Family Cleanup** 
Files to update (replace 'Inter' with 'Geist Sans'):
- [ ] `packages/ui/src/components/**/*.tsx` - Any hardcoded font-family
- [ ] CSS files with 'Inter' references  
- [ ] Tailwind config font family settings
- [ ] Any component defaultProps with font families

### **Step 2: Add Missing Color Tokens**
Replace these common hard-coded values:
- [ ] `#A1A1AA` → `var(--hive-color-text-muted-light)` (60+ occurrences)
- [ ] `#71717A` → `var(--hive-color-text-muted-dark)`  
- [ ] `#3F3F46` → `var(--hive-color-border-muted)`
- [ ] `rgba(255, 215, 0, 0.1)` → `var(--hive-color-backgrounds-gold)`

### **Step 3: Typography Enhancements**
Replace these arbitrary values with tokens:
- [ ] `text-[72px]` → `text-display-xl`
- [ ] `text-[60px]` → `text-display-lg` 
- [ ] `text-[48px]` → `text-display-md`
- [ ] `text-[40px]` → `text-display-sm`

### **Step 4: Spacing Strategy Implementation**

**Use Tokens For** (Semantic Spacing):
- Component padding: `p-4`, `px-6`, `py-3`
- Element gaps: `gap-4`, `space-y-6`
- Consistent margins: `mb-8`, `mt-12`

**Keep Arbitrary Values For** (Layout-Specific):
- Hero sections: `h-[500px]` (or use `h-hive-lg`)
- Unique layouts: `w-[400px]` (or use `w-hive-md`) 
- Design-specific requirements

**Add Layout Tokens For Common Patterns**:
- `h-hive-lg` instead of `h-[500px]`
- `w-hive-md` instead of `w-[400px]`
- `h-hive-xs` instead of `h-[200px]`

---

## Usage Guidelines

### **Colors**
```typescript
// Good - Use tokens
className="text-hive-color-text-muted-light"
className="bg-hive-color-backgrounds-gold" 
className="border-hive-color-border-muted"

// Avoid - Hard-coded values
className="text-[#A1A1AA]"
style={{ backgroundColor: 'rgba(255, 215, 0, 0.1)' }}
```

### **Typography** 
```typescript
// Good - Use tokens
className="font-hive-sans text-display-xl"
className="text-hive-lg leading-relaxed"

// Avoid - Hard-coded  
className="text-[72px]"
style={{ fontFamily: 'Inter' }}
```

### **Spacing (Hybrid Approach)**
```typescript
// Semantic spacing - USE TOKENS
className="p-6 gap-4 mb-8"  // Component spacing
className="space-y-4"        // Element spacing

// Layout-specific - TOKENS OR ARBITRARY
className="h-hive-lg"        // Common layout (preferred)
className="h-[500px]"        // Unique layout (acceptable)
className="w-hive-md"        // Common width (preferred) 
className="w-[400px]"        // Specific design (acceptable)
```

---

Does this enhanced token implementation look good? Ready to proceed with:

1. **Creating the enhanced token files**
2. **Font family cleanup** (Inter → Geist Sans)  
3. **Color token replacements** for common hard-coded values
4. **Hybrid spacing implementation**

Which part should we tackle first?