# HIVE Design System

*Engineered for clarity, built for speed*

## Design Philosophy

**Core Principle**: Every pixel serves the panic → relief pipeline
**Aesthetic**: Calm minimalism with intentional gold accents
**Standard**: Modern shadcn/ui patterns with physics-based motion
**Palette**: Gold, Black, White, Gray — restraint creates intelligence

---

## Foundation Rules

### The Non-Negotiables

```css
/* These rules create the calm, precise feel */
{
  border-radius: 12px;        /* Consistent roundness */
  transition: all 0.2s ease;  /* Everything animates */
  backdrop-filter: blur(10px); /* Glass morphism where applicable */
  -webkit-font-smoothing: antialiased; /* Crisp text always */
}
```

### Quality Markers (What Makes It Intelligent)

1. **Generous Whitespace**: Minimum 24px between sections, 16px between elements
2. **Subtle Shadows**: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
3. **Perfect Alignment**: Everything on an 8px grid, no exceptions
4. **Smooth Transitions**: Every state change animates (hover, focus, active)
5. **Depth Layers**: Background → Card → Elevated → Modal → Popover

---

## Color System

### The Core Palette

```typescript
const colors = {
  // Gold - Signal, not decoration
  gold: {
    primary: '#FFD700',     // Pure gold - primary actions
    hover:   '#F5CE00',     // Slightly deeper - hover state
    muted:   '#FFD70020',   // 12% opacity - subtle backgrounds
    glow:    '#FFD70040',   // 25% opacity - focus states
    shine:   '#FFD70060',   // 38% opacity - active states
  },

  // Black - Foundation
  black: {
    pure:    '#000000',     // True black - headers
    soft:    '#0A0A0A',     // Softer black - body text
    muted:   '#00000080',   // 50% opacity - overlays
    subtle:  '#00000010',   // 6% opacity - dividers
  },

  // White - Canvas
  white: {
    pure:    '#FFFFFF',     // Pure white - backgrounds
    soft:    '#FAFAFA',     // Off-white - subtle sections
    muted:   '#FFFFFF80',   // 50% opacity - glass effects
  },

  // Gray - Supporting hierarchy
  gray: {
    50:  '#FAFAFA',  // Barely there
    100: '#F5F5F5',  // Subtle backgrounds
    200: '#E5E5E5',  // Dividers
    300: '#D4D4D4',  // Borders
    400: '#A3A3A3',  // Disabled text
    500: '#737373',  // Muted text
    600: '#525252',  // Secondary text
    700: '#404040',  // Primary text
    800: '#262626',  // Dark sections
    900: '#171717',  // Near black
  }
};
```

### Semantic Patterns

```typescript
const semantics = {
  // Status communication via patterns + icons
  success: {
    icon: '✓',
    pattern: 'gold-pulse',
    animation: 'scale-success',
    background: colors.gold.muted,
    border: colors.gold.primary,
  },

  error: {
    icon: '✕',
    pattern: 'shake-horizontal',
    animation: 'shake-error',
    background: colors.black.subtle,
    border: colors.black.pure,
  },

  warning: {
    icon: '!',
    pattern: 'pulse-gentle',
    animation: 'pulse-warning',
    background: colors.gold.muted,
    border: colors.gold.primary,
    borderStyle: 'dashed',
  },

  info: {
    icon: 'i',
    pattern: 'ripple-out',
    animation: 'fade-info',
    background: colors.gray[100],
    border: colors.gray[300],
  },
};
```

### Color Usage Rules

1. **Black is primary** - Primary buttons, headers, important actions
2. **Gold is signal** - Success animations, achievements, special moments (never decoration)
3. **White is breathing room** - Most backgrounds should be white
4. **Gray handles hierarchy** - Secondary actions, text, dividers, all UI chrome
5. **Patterns over color** - Use animated patterns to differentiate, not color

---

## Typography

### Font Stack

```css
/* System fonts for performance and native feel */
font-family: -apple-system, BlinkMacSystemFont, 'Geist Sans', 'Inter',
             'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
```

### Type Scale (Mobile-First)

```typescript
const typography = {
  // Display - Hero sections only
  display: {
    fontSize: '48px',
    lineHeight: '56px',
    fontWeight: 700,
    letterSpacing: '-0.02em',
    mobile: { fontSize: '36px', lineHeight: '44px' }
  },

  // Headings - Clear hierarchy
  h1: {
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    mobile: { fontSize: '28px', lineHeight: '36px' }
  },

  h2: {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    mobile: { fontSize: '24px', lineHeight: '32px' }
  },

  h3: {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 600,
    letterSpacing: '0',
    mobile: { fontSize: '20px', lineHeight: '28px' }
  },

  // Body - Optimized for reading
  body: {
    large: {
      fontSize: '18px',
      lineHeight: '28px',
      fontWeight: 400,
    },
    base: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
    },
    small: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
    }
  },

  // UI Elements
  button: {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: '0.01em',
  },

  caption: {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    letterSpacing: '0.02em',
  }
};
```

### Typography Rules

1. **Maximum 2 font weights per page** - Usually 400 and 600
2. **Line height = fontSize × 1.5** - For body text
3. **Limit to 65-75 characters per line** - Optimal reading
4. **Increase letter-spacing for small text** - Improves legibility

---

## Spacing System (8px Grid)

### Space Scale

```typescript
const spacing = {
  px:   '1px',   // Borders only
  0.5:  '4px',   // Micro adjustments
  1:    '8px',   // Minimum spacing
  2:    '16px',  // Standard small
  3:    '24px',  // Standard medium
  4:    '32px',  // Standard large
  5:    '40px',  // Section spacing
  6:    '48px',  // Major sections
  8:    '64px',  // Hero spacing
  10:   '80px',  // Page sections
  12:   '96px',  // Major breaks
  16:   '128px', // Hero sections
};
```

### Spacing Rules

1. **Component internal spacing**: 8px, 16px, 24px
2. **Between components**: 24px minimum
3. **Section breaks**: 48px minimum
4. **Page margins**: 24px mobile, 48px tablet, 80px desktop

---

## Component Patterns

### Button Styles

```typescript
const ButtonStyles = {
  // Shared base
  base: {
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 500,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: 'none',
  },

  // Primary - Pure black
  primary: {
    background: colors.black.pure,
    color: colors.white.pure,
    fontWeight: 500,
    border: `1px solid ${colors.black.pure}`,

    '&:hover': {
      background: colors.gray[800],
      transform: 'translateY(-1px)',
    },
  },

  // Secondary - Subtle gray
  secondary: {
    background: colors.gray[100],
    color: colors.black.soft,
    border: `1px solid ${colors.gray[200]}`,

    '&:hover': {
      background: colors.gray[200],
      transform: 'translateY(-1px)',
    },
  },

  // Ghost - Invisible until interaction
  ghost: {
    background: 'transparent',
    color: colors.black.soft,
    border: '1px solid transparent',

    '&:hover': {
      background: colors.gray[50],
      borderColor: colors.gray[200],
    },
  },
};
```

### Card Styles

```typescript
const CardStyles = {
  base: {
    background: colors.white.pure,
    borderRadius: '16px',
    border: `1px solid ${colors.gray[200]}`,
    padding: '24px',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
    }
  },

  // Interactive card with gold accent
  clickable: {
    cursor: 'pointer',

    '&:active': {
      transform: 'scale(0.98)',
    },

    '&:focus-visible': {
      outline: `2px solid ${colors.gold.primary}`,
      outlineOffset: '2px',
    }
  },
};
```

---

## Motion & Animation

### Transition Principles

- **Intentional**: Every animation has purpose
- **Physics-based**: Use easing curves that feel natural
- **Performant**: Use `transform` and `opacity` only
- **Respectful**: Honor `prefers-reduced-motion`

### Standard Timing

```css
--transition-fast: 0.15s ease;
--transition-base: 0.2s ease;
--transition-slow: 0.3s ease;
```

### Easing Curves

```css
/* Smooth acceleration/deceleration */
cubic-bezier(0.4, 0, 0.2, 1)

/* Bounce effect */
cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

```typescript
const accessibility = {
  // Color contrast ratios
  contrast: {
    normal: 4.5,  // Normal text
    large: 3.0,   // Large text (18px+)
    ui: 3.0,      // UI components
  },

  // Focus indicators
  focus: {
    outline: `2px solid ${colors.gold.primary}`,
    outlineOffset: '2px',
  },

  // Interactive sizes
  minSize: {
    touch: '44px',  // Mobile touch targets
    click: '32px',  // Desktop click targets
  },

  // Motion preferences
  reducedMotion: {
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      transition: 'none',
    }
  }
};
```

---

## CSS Variables

```css
:root {
  /* Colors */
  --hive-gold: #FFD700;
  --hive-black: #000000;
  --hive-white: #FFFFFF;

  /* Backgrounds */
  --hive-bg-primary: var(--hive-black);
  --hive-bg-secondary: rgba(255, 255, 255, 0.02);

  /* Text */
  --hive-text-primary: rgba(255, 255, 255, 0.87);
  --hive-text-secondary: rgba(255, 255, 255, 0.60);

  /* Borders */
  --hive-border: rgba(255, 255, 255, 0.08);
  --hive-border-hover: rgba(255, 215, 0, 0.20);

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.1);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

---

## Implementation Checklist

### Pre-Development
- [ ] Set up CSS variables for all colors
- [ ] Configure Tailwind with custom spacing scale
- [ ] Create component library structure
- [ ] Set up responsive breakpoint system

### Component Development
- [ ] Every component has hover state
- [ ] Every component has focus state
- [ ] Every component has loading state
- [ ] Every component has error state
- [ ] Every component has disabled state

### Quality Assurance
- [ ] No text smaller than 12px
- [ ] All interactive elements ≥ 44px on mobile
- [ ] Color contrast passes WCAG AA
- [ ] Animations respect prefers-reduced-motion
- [ ] Everything aligns to 8px grid

### Performance
- [ ] Images lazy load with blur placeholder
- [ ] Fonts load with font-display: swap
- [ ] CSS is purged of unused styles
- [ ] Animations use transform/opacity only
- [ ] Critical CSS is inlined

---

**Design Principle**: If it doesn't help students go from panic → relief in <10 seconds, it doesn't belong in the design.

**Quality Bar**: Ship something Vercel would feature. Accept nothing less.
