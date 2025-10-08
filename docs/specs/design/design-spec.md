# HIVE Design Specification
*AI-Optimized Design System for Premium Modern Implementation*

## Design Philosophy
**Core Principle**: Every pixel serves the panic → relief pipeline
**Aesthetic**: Luxury minimalism with gold accents - premium without pretension
**Standard**: Modern shadcn/ui patterns with animated sophistication
**Palette**: Gold, Black, White, Gray - restraint creates elegance

---

## 1. Foundation Rules (AI Implementation Checklist)

### The Non-Negotiables
```css
/* These rules create the premium feel - NEVER override */
{
  border-radius: 12px;        /* Consistent roundness */
  transition: all 0.2s ease;  /* Everything animates */
  backdrop-filter: blur(10px); /* Glass morphism where applicable */
  -webkit-font-smoothing: antialiased; /* Crisp text always */
}
```

### Quality Markers (What Makes It Feel Expensive)
1. **Generous Whitespace**: Minimum 24px between sections, 16px between elements
2. **Subtle Shadows**: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
3. **Perfect Alignment**: Everything on an 8px grid, no exceptions
4. **Smooth Transitions**: Every state change animates (hover, focus, active)
5. **Depth Layers**: Background → Card → Elevated → Modal → Popover

---

## 2. Color System (Luxury Restraint)

### The Four-Color Palette
```typescript
const colors = {
  // Gold - The Statement Maker
  gold: {
    primary: '#FFD700',     // Pure gold - primary actions
    hover:   '#F5CE00',     // Slightly deeper - hover state
    muted:   '#FFD70020',   // 12% opacity - subtle backgrounds
    glow:    '#FFD70040',   // 25% opacity - focus states
    shine:   '#FFD70060',   // 38% opacity - active states
  },

  // Black - The Foundation
  black: {
    pure:    '#000000',     // True black - premium headers
    soft:    '#0A0A0A',     // Softer black - body text
    muted:   '#00000080',   // 50% opacity - overlays
    subtle:  '#00000010',   // 6% opacity - dividers
  },

  // White - The Canvas
  white: {
    pure:    '#FFFFFF',     // Pure white - backgrounds
    soft:    '#FAFAFA',     // Off-white - subtle sections
    muted:   '#FFFFFF80',   // 50% opacity - glass effects
  },

  // Gray - The Supporting Actor
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

### Semantic Patterns (No Color Dependencies)
```typescript
const semantics = {
  // Status Communication via Patterns + Icons
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

  loading: {
    pattern: 'shimmer-gold',
    animation: 'shimmer-infinite',
    gradient: `linear-gradient(90deg, ${colors.white.pure} 25%, ${colors.gold.muted} 50%, ${colors.white.pure} 75%)`,
  }
};
```

### Animated Pattern Library
```typescript
const patterns = {
  // Inline Patterns with Animation
  'diagonal-gold': {
    background: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      ${colors.gold.muted} 10px,
      ${colors.gold.muted} 11px
    )`,
    animation: 'slide-diagonal 20s linear infinite',
  },

  'dot-matrix': {
    background: `radial-gradient(circle, ${colors.black.soft} 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
    animation: 'breathe 4s ease-in-out infinite',
  },

  'gold-shimmer': {
    background: `linear-gradient(
      105deg,
      transparent 40%,
      ${colors.gold.muted} 50%,
      transparent 60%
    )`,
    animation: 'shimmer 1.5s infinite',
  },

  'mesh-gradient': {
    background: `
      radial-gradient(at 40% 20%, ${colors.gold.muted} 0px, transparent 50%),
      radial-gradient(at 80% 0%, ${colors.white.soft} 0px, transparent 50%),
      radial-gradient(at 0% 50%, ${colors.gray[100]} 0px, transparent 50%)
    `,
    animation: 'mesh-move 10s ease infinite',
  }
};
```

### Space Type Visual Patterns
```typescript
const spacePatterns = {
  greek: {
    icon: 'Λ',
    pattern: patterns['diagonal-gold'],
    animation: 'float-up 0.3s ease',
  },

  academic: {
    icon: '📚',
    pattern: patterns['dot-matrix'],
    animation: 'slide-in-left 0.3s ease',
  },

  residential: {
    icon: '🏠',
    pattern: 'grid-subtle',
    animation: 'fade-in 0.3s ease',
  },

  official: {
    icon: '✓',
    badge: colors.gold.primary,
    animation: 'stamp 0.3s ease',
  }
};
```

### Usage Rules for AI
1. **Black is the new primary** - Primary buttons, headers, important actions
2. **Gold is celebration only** - Success animations, achievements, special moments
3. **White is breathing room** - Most backgrounds should be white
4. **Gray handles everything else** - Secondary actions, text, dividers, all UI chrome
5. **Patterns over color** - Use animated patterns to differentiate, not color
6. **Animation tells story** - Every state change should animate smoothly

---

## 3. Typography System

### Font Stack
```css
/* System fonts for performance and native feel */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
             'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
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

### Typography Rules for AI
1. **Maximum 2 font weights per page** - Usually 400 and 600
2. **Line height = fontSize × 1.5** - For body text
3. **Limit to 65-75 characters per line** - Optimal reading
4. **Increase letter-spacing for small text** - Improves legibility

---

## 4. Spacing System (8px Grid)

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

### Spacing Rules for AI
1. **Component internal spacing**: 8px, 16px, 24px
2. **Between components**: 24px minimum
3. **Section breaks**: 48px minimum
4. **Page margins**: 24px mobile, 48px tablet, 80px desktop

---

## 5. Component Patterns (Modern shadcn/ui Inspired)

### Card Component (shadcn Pattern)
```typescript
const CardStyles = {
  // Base card with animated border
  base: {
    background: colors.white.pure,
    borderRadius: '16px',
    border: `1px solid ${colors.gray[200]}`,
    padding: '24px',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

    // Animated border gradient on hover
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '-1px',
      borderRadius: '16px',
      padding: '1px',
      background: `linear-gradient(45deg, ${colors.gold.primary}, transparent)`,
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'exclude',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },

    '&:hover::before': {
      opacity: 1,
      animation: 'rotate-gradient 3s linear infinite',
    },

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
      transition: 'all 0.1s ease',
    },

    '&:focus-visible': {
      outline: `2px solid ${colors.gold.primary}`,
      outlineOffset: '2px',
    }
  },

  // Glass morphism card
  glass: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${colors.white.muted}`,
  },

  // Card with animated pattern
  patterned: {
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: '16px',
      opacity: 0.03,
      pointerEvents: 'none',
      background: patterns['mesh-gradient'].background,
      animation: patterns['mesh-gradient'].animation,
    }
  }
};
```

### Button Component (shadcn/ui Modern)
```typescript
const ButtonStyles = {
  // Shared base with micro-interactions
  base: {
    padding: '12px 24px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 500,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    overflow: 'hidden',
  },

  // Primary - Pure black (the new power move)
  primary: {
    background: colors.black.pure,
    color: colors.white.pure,
    fontWeight: 500,
    border: `1px solid ${colors.black.pure}`,

    '&:hover': {
      background: colors.gray[800],
      borderColor: colors.gray[800],
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },

    '&:active': {
      background: colors.gray[900],
      transform: 'translateY(0)',
    },

    '&:focus-visible': {
      outline: `2px solid ${colors.black.pure}`,
      outlineOffset: '2px',
    }
  },

  // Secondary - Subtle gray (the workhorse)
  secondary: {
    background: colors.gray[100],
    color: colors.black.soft,
    border: `1px solid ${colors.gray[200]}`,
    fontWeight: 500,

    '&:hover': {
      background: colors.gray[200],
      borderColor: colors.gray[300],
      transform: 'translateY(-1px)',
    },

    '&:active': {
      background: colors.gray[300],
      transform: 'translateY(0)',
    }
  },

  // Outline - Black border focus (the statement)
  outline: {
    background: 'transparent',
    color: colors.black.pure,
    border: `2px solid ${colors.black.pure}`,
    fontWeight: 500,

    '&:hover': {
      background: colors.black.pure,
      color: colors.white.pure,
      transform: 'translateY(-1px)',
    },

    '&:active': {
      background: colors.gray[900],
      borderColor: colors.gray[900],
      transform: 'translateY(0)',
    }
  },

  // Ghost - Invisible until interaction (the subtle)
  ghost: {
    background: 'transparent',
    color: colors.black.soft,
    border: '1px solid transparent',

    '&:hover': {
      background: colors.gray[50],
      borderColor: colors.gray[200],
    },

    '&:active': {
      background: colors.gray[100],
    }
  },

  // Link - Text only (the minimal)
  link: {
    background: 'transparent',
    color: colors.black.pure,
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
    border: 'none',
    padding: '0',

    '&:hover': {
      color: colors.gray[700],
      textDecoration: 'underline',
    },

    '&:active': {
      color: colors.gray[900],
    }
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  }
};
```

### Input Component (The Data Collector)
```typescript
const InputStyles = {
  container: {
    position: 'relative',
    width: '100%',
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px', // Prevents zoom on iOS
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    background: '#ffffff',
    transition: 'all 0.2s ease',

    '&:focus': {
      outline: 'none',
      borderColor: '#ffc107',
      boxShadow: '0 0 0 3px rgba(255, 193, 7, 0.1)',
    },

    '&:hover': {
      borderColor: '#bdbdbd',
    },

    '&::placeholder': {
      color: '#9e9e9e',
    }
  },

  label: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#616161',
    marginBottom: '8px',
    display: 'block',
  },

  error: {
    borderColor: '#ef4444',

    '&:focus': {
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    }
  },

  helperText: {
    fontSize: '12px',
    color: '#757575',
    marginTop: '4px',
  }
};
```

---

## 6. Layout Patterns

### Page Layout (The Container)
```typescript
const PageLayout = {
  // Maximum readable width
  maxWidth: '1200px',
  margin: '0 auto',
  padding: {
    mobile: '24px',
    tablet: '48px',
    desktop: '80px',
  },

  // Content width for reading
  content: {
    maxWidth: '720px', // Optimal reading width
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  }
};
```

### Grid System (The Organizer)
```typescript
const GridSystem = {
  // Standard grid
  display: 'grid',
  gap: '24px',

  // Responsive columns
  columns: {
    mobile: 'repeat(1, 1fr)',
    tablet: 'repeat(2, 1fr)',
    desktop: 'repeat(3, 1fr)',
    wide: 'repeat(4, 1fr)',
  }
};
```

### Navigation (The Wayfinder)
```typescript
const NavigationStyles = {
  // Top navigation bar
  navbar: {
    height: '64px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  // Mobile navigation
  mobileMenu: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '64px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderTop: '1px solid rgba(0, 0, 0, 0.08)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
};
```

---

## 7. Animation Patterns (Modern Motion Design)

### CSS Keyframes for Patterns
```css
@keyframes shimmer {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

@keyframes rotate-gradient {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes slide-diagonal {
  from { background-position: 0 0; }
  to { background-position: 60px 60px; }
}

@keyframes breathe {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(1.05); }
}

@keyframes mesh-move {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

@keyframes gold-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7); }
  50% { box-shadow: 0 0 0 10px rgba(255, 215, 0, 0); }
}

@keyframes shake-error {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
  20%, 40%, 60%, 80% { transform: translateX(2px); }
}

@keyframes ripple {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}

@keyframes float-up {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes stamp {
  0% { transform: scale(2) rotate(-5deg); opacity: 0; }
  50% { transform: scale(1.1) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
```

### Framer Motion Patterns
```typescript
const animations = {
  // Stagger children for lists
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },

  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },

  // Gold shimmer on success
  goldSuccess: {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [0.8, 1.1, 1],
      opacity: [0, 1, 1],
      filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)'],
    },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Smooth page transitions
  pageSlide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },

  // Card interactions
  cardHover: {
    rest: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.98 },
  },

  // Tooltip reveal
  tooltip: {
    initial: { opacity: 0, y: 10, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.9 },
    transition: { duration: 0.15 },
  },

  // Modal backdrop
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },

  // Modal content with spring
  modal: {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: 20 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};
```

### Interaction Feedback Patterns
```typescript
const feedbackPatterns = {
  // Gold glow on focus
  focusGlow: {
    boxShadow: `0 0 0 3px ${colors.gold.glow}`,
    transition: 'box-shadow 0.2s ease',
  },

  // Magnetic hover (follows cursor slightly)
  magneticHover: {
    onMouseMove: (e: MouseEvent, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    },
    onMouseLeave: (element: HTMLElement) => {
      element.style.transform = 'translate(0, 0)';
    },
  },

  // Parallax on scroll
  parallax: {
    speed: 0.5,
    transform: `translateY(calc(var(--scroll-y) * ${0.5}px))`,
  },

  // Skeleton loading with gold shimmer
  skeleton: {
    background: `linear-gradient(
      90deg,
      ${colors.gray[100]} 25%,
      ${colors.gold.muted} 50%,
      ${colors.gray[100]} 75%
    )`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },
};
```

### Loading States
```typescript
const LoadingStates = {
  // Skeleton screens
  skeleton: {
    background: 'linear-gradient(90deg, #f5f5f5 25%, #eeeeee 50%, #f5f5f5 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
  },

  // Spinner
  spinner: {
    border: '2px solid #f5f5f5',
    borderTop: '2px solid #ffc107',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },

  // Progress bar
  progress: {
    height: '4px',
    background: '#f5f5f5',
    overflow: 'hidden',

    bar: {
      background: '#ffc107',
      animation: 'progress 1s ease-in-out',
    }
  }
};
```

---

## 8. Responsive Design

### Breakpoint System
```typescript
const breakpoints = {
  // Mobile first approach
  sm: '@media (min-width: 640px)',   // Large phones
  md: '@media (min-width: 768px)',   // Tablets
  lg: '@media (min-width: 1024px)',  // Laptops
  xl: '@media (min-width: 1280px)',  // Desktops
  '2xl': '@media (min-width: 1536px)', // Large screens
};
```

### Responsive Rules for AI
1. **Design at 375px width first** (iPhone SE)
2. **Test at 768px** (iPad)
3. **Optimize at 1440px** (MacBook Pro)
4. **Never hide critical features** - Reorganize instead
5. **Touch targets minimum 44px** on mobile

---

## 9. Accessibility Standards

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
    outline: '2px solid #ffc107',
    outlineOffset: '2px',
    borderRadius: '4px',
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

## 10. Dark Mode (Future Consideration)

### Dark Palette
```typescript
const darkMode = {
  // Invert the grayscale
  background: {
    primary: '#0a0a0a',
    secondary: '#1a1a1a',
    tertiary: '#2a2a2a',
  },

  text: {
    primary: '#ffffff',
    secondary: '#e0e0e0',
    muted: '#9e9e9e',
  },

  // Brand colors stay similar
  primary: '#ffca28', // Slightly brighter

  // Adjust shadows for dark
  shadow: '0 1px 3px rgba(0,0,0,0.5)',
};
```

---

## 11. Implementation Checklist for AI

### Pre-Development
- [ ] Set up CSS variables for all colors
- [ ] Configure Tailwind with custom spacing scale
- [ ] Create component library structure
- [ ] Set up responsive breakpoint system
- [ ] Configure animation preferences

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

## 12. HIVE-Specific Component Patterns

### Feed Card (Vercel-Inspired Minimal)
```typescript
const FeedCard = {
  container: {
    background: colors.white.pure,
    borderRadius: '12px',
    border: `1px solid ${colors.gray[100]}`,
    padding: '20px',
    marginBottom: '12px',
    transition: 'all 0.2s ease',

    '&:hover': {
      borderColor: colors.gray[300],
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
    }
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },

  avatar: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: `2px solid ${colors.white.pure}`,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },

  content: {
    fontSize: '15px',
    lineHeight: '24px',
    color: colors.gray[700],
    marginBottom: '16px',
  },

  // Actions use icons only, no color
  actions: {
    display: 'flex',
    gap: '32px',
    paddingTop: '16px',
    borderTop: `1px solid ${colors.gray[100]}`,

    button: {
      color: colors.gray[500],
      transition: 'all 0.2s',

      '&:hover': {
        color: colors.black.pure,
        transform: 'scale(1.1)',
      },

      // Active state gets subtle background
      '&.active': {
        color: colors.black.pure,
        background: colors.gray[50],
        borderRadius: '8px',
        padding: '4px 8px',
      }
    }
  }
};
```

### Space Card (Pattern-Based Differentiation)
```typescript
const SpaceCard = {
  container: {
    background: colors.white.pure,
    borderRadius: '16px',
    border: `1px solid ${colors.gray[200]}`,
    padding: '24px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

    // Pattern overlay for space type
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'var(--space-pattern)', // Set based on space type
      opacity: 0.8,
    },

    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.08)',
      borderColor: colors.black.pure,
    }
  },

  // Space type indicators without color
  typeIndicator: {
    greek: {
      '--space-pattern': patterns['diagonal-gold'].background,
      icon: 'Λ',
    },
    academic: {
      '--space-pattern': patterns['dot-matrix'].background,
      icon: '📚',
    },
    residential: {
      '--space-pattern': 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)',
      icon: '🏠',
    },
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: colors.black.pure,
    marginBottom: '8px',
  },

  memberCount: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: colors.gray[600],

    // Active indicator
    '&::before': {
      content: '""',
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: colors.gray[400],
      animation: 'breathe 2s ease-in-out infinite',
    }
  }
};
```

### Success States (Gold Celebration Only)
```typescript
const SuccessPatterns = {
  // Ritual completion - gold celebration
  ritualComplete: {
    animation: 'gold-burst 0.6s ease-out',

    '&::after': {
      content: '""',
      position: 'absolute',
      inset: '-50%',
      background: `radial-gradient(circle, ${colors.gold.muted} 0%, transparent 70%)`,
      animation: 'expand-fade 0.8s ease-out',
    }
  },

  // Achievement unlocked - gold particles
  achievement: {
    position: 'relative',

    '.particles': {
      position: 'absolute',
      inset: 0,

      '& .particle': {
        position: 'absolute',
        width: '4px',
        height: '4px',
        background: colors.gold.primary,
        borderRadius: '50%',
        animation: 'float-away 1s ease-out forwards',
      }
    }
  },

  // First post celebration - subtle gold glow
  firstPost: {
    boxShadow: `0 0 0 0 ${colors.gold.glow}`,
    animation: 'gold-pulse 2s ease-out 3',
  },

  // Connection made - gold link animation
  connectionMade: {
    '& .link-line': {
      stroke: colors.gold.primary,
      strokeDasharray: '5 5',
      animation: 'dash 1s linear forwards',
    }
  }
};
```

### Event Card (Urgency Without Color)
```typescript
const EventCard = {
  container: {
    ...CardStyles.base,
    borderLeft: `4px solid ${colors.black.pure}`,

    // Urgency through animation speed
    '&[data-urgency="high"]': {
      animation: 'subtle-pulse 1s ease-in-out infinite',
    },

    '&[data-urgency="medium"]': {
      animation: 'subtle-pulse 2s ease-in-out infinite',
    },
  },

  timeIndicator: {
    // Use icons and text, not color
    urgent: {
      icon: '⚡',
      text: 'Starting soon',
      animation: 'blink 1s ease-in-out infinite',
    },
    today: {
      icon: '📍',
      text: 'Today',
    },
    upcoming: {
      icon: '📅',
      text: 'This week',
    }
  },

  attendeeList: {
    display: 'flex',
    marginLeft: '-8px',

    '& .attendee': {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: `2px solid ${colors.white.pure}`,
      marginLeft: '-8px',

      '&:hover': {
        transform: 'translateY(-4px)',
        zIndex: 10,
      }
    }
  }
};
```

### Ritual Card (Progress Without Color)
```typescript
const RitualCard = {
  container: {
    background: colors.white.pure,
    borderRadius: '16px',
    padding: '16px',
    border: `2px solid ${colors.gray[200]}`,

    // Progress through border animation
    '--progress': '0%',
    background: `conic-gradient(
      from 0deg at 50% 50%,
      ${colors.black.pure} 0deg,
      ${colors.black.pure} calc(var(--progress) * 3.6deg),
      ${colors.gray[200]} calc(var(--progress) * 3.6deg)
    )`,
    padding: '2px',

    '& .inner': {
      background: colors.white.pure,
      borderRadius: '14px',
      padding: '16px',
    }
  },

  // Milestone reached - gold burst only
  milestoneReached: {
    animation: 'gold-burst 0.5s ease-out',

    '&::after': {
      content: '"✓"',
      position: 'absolute',
      color: colors.gold.primary,
      fontSize: '24px',
      animation: 'stamp 0.3s ease-out',
    }
  }
};
```

---

## 13. Design Tokens for Development

### CSS Variables Setup (Gold/Black/White/Gray)
```css
:root {
  /* Gold Palette */
  --hive-gold: #FFD700;
  --hive-gold-hover: #F5CE00;
  --hive-gold-muted: rgba(255, 215, 0, 0.12);
  --hive-gold-glow: rgba(255, 215, 0, 0.25);
  --hive-gold-shine: rgba(255, 215, 0, 0.38);

  /* Black Palette */
  --hive-black: #000000;
  --hive-black-soft: #0A0A0A;
  --hive-black-muted: rgba(0, 0, 0, 0.5);
  --hive-black-subtle: rgba(0, 0, 0, 0.06);

  /* White Palette */
  --hive-white: #FFFFFF;
  --hive-white-soft: #FAFAFA;
  --hive-white-muted: rgba(255, 255, 255, 0.5);

  /* Gray Scale */
  --hive-gray-50: #FAFAFA;
  --hive-gray-100: #F5F5F5;
  --hive-gray-200: #E5E5E5;
  --hive-gray-300: #D4D4D4;
  --hive-gray-400: #A3A3A3;
  --hive-gray-500: #737373;
  --hive-gray-600: #525252;
  --hive-gray-700: #404040;
  --hive-gray-800: #262626;
  --hive-gray-900: #171717;

  /* Semantic Mappings */
  --hive-text-primary: var(--hive-black-soft);
  --hive-text-secondary: var(--hive-gray-700);
  --hive-text-muted: var(--hive-gray-500);
  --hive-text-disabled: var(--hive-gray-400);

  --hive-background: var(--hive-white);
  --hive-background-secondary: var(--hive-white-soft);
  --hive-background-tertiary: var(--hive-gray-50);

  --hive-border: var(--hive-gray-200);
  --hive-border-strong: var(--hive-gray-300);
  --hive-border-subtle: var(--hive-gray-100);

  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* Typography */
  --font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;

  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 40px rgba(0,0,0,0.15);

  /* Animations */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

---

## 14. Additional UI Components

### 14.1 Navigation Patterns

#### Top Navigation Bar
```typescript
const TopNav = {
  height: 64,
  background: colors.white.pure,
  borderBottom: `1px solid ${colors.gray[200]}`,
  backdropFilter: 'blur(10px)',
  position: 'sticky',
  top: 0,
  zIndex: 100,

  logo: {
    height: 32,
    marginLeft: spacing.lg,
  },

  navItems: {
    padding: `0 ${spacing.lg}`,
    fontSize: '14px',
    fontWeight: 500,
    color: colors.gray[600],
    hover: colors.black.pure,
    active: {
      color: colors.black.pure,
      borderBottom: `2px solid ${colors.black.pure}`,
    }
  },

  userMenu: {
    avatar: {
      size: 32,
      border: `2px solid ${colors.gray[200]}`,
    },
    dropdown: {
      minWidth: 200,
      background: colors.white.pure,
      border: `1px solid ${colors.gray[200]}`,
      borderRadius: radius.lg,
      boxShadow: shadows.lg,
    }
  }
}
```

#### Mobile Navigation
```typescript
const MobileNav = {
  height: 56,
  background: colors.white.pure,
  borderTop: `1px solid ${colors.gray[200]}`,
  position: 'fixed',
  bottom: 0,

  items: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${spacing.xs} 0`,

    icon: {
      size: 24,
      color: colors.gray[500],
      activeColor: colors.black.pure,
    },

    label: {
      fontSize: '10px',
      marginTop: spacing.xs,
      color: colors.gray[500],
      activeColor: colors.black.pure,
    }
  }
}
```

#### Tab Navigation
```typescript
const TabNav = {
  container: {
    borderBottom: `1px solid ${colors.gray[200]}`,
    overflowX: 'auto',
    scrollbarWidth: 'none',
  },

  tab: {
    padding: `${spacing.md} ${spacing.lg}`,
    fontSize: '14px',
    fontWeight: 500,
    color: colors.gray[600],
    borderBottom: '2px solid transparent',
    transition: transitions.fast,

    hover: {
      color: colors.gray[900],
    },

    active: {
      color: colors.black.pure,
      borderBottomColor: colors.black.pure,
    }
  }
}
```

### 14.2 Modal & Dialog Patterns

#### Modal
```typescript
const Modal = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    animation: 'fade-in 0.2s ease',
  },

  container: {
    background: colors.white.pure,
    borderRadius: radius.xl,
    boxShadow: shadows.xl,
    maxWidth: 480,
    maxHeight: '90vh',
    overflow: 'auto',
    animation: 'slide-up 0.3s ease',
  },

  header: {
    padding: spacing.xl,
    borderBottom: `1px solid ${colors.gray[200]}`,

    title: {
      fontSize: '18px',
      fontWeight: 600,
      color: colors.black.pure,
    },

    closeButton: {
      size: 32,
      color: colors.gray[500],
      hover: colors.gray[700],
    }
  },

  body: {
    padding: spacing.xl,
  },

  footer: {
    padding: spacing.xl,
    borderTop: `1px solid ${colors.gray[200]}`,
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'flex-end',
  }
}
```

#### Toast Notifications
```typescript
const Toast = {
  container: {
    position: 'fixed',
    bottom: spacing.xl,
    right: spacing.xl,
    maxWidth: 360,
    background: colors.white.pure,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.lg,
    boxShadow: shadows.lg,
    padding: spacing.lg,
    animation: 'slide-in 0.3s ease',
  },

  types: {
    success: {
      iconColor: colors.gold.primary,
      borderColor: colors.gold.primary,
    },
    error: {
      iconColor: colors.gray[900],
      animation: 'shake 0.3s ease',
    },
    info: {
      iconColor: colors.gray[600],
    },
    warning: {
      iconColor: colors.gray[700],
      animation: 'pulse 2s infinite',
    }
  },

  progressBar: {
    height: 2,
    background: colors.gray[200],
    fill: colors.black.pure,
    animation: 'shrink 5s linear',
  }
}
```

### 14.3 Loading States

#### Skeleton Loaders
```typescript
const Skeleton = {
  base: {
    background: `linear-gradient(90deg,
      ${colors.gray[100]} 25%,
      ${colors.gray[200]} 50%,
      ${colors.gray[100]} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: radius.md,
  },

  text: {
    height: 16,
    marginBottom: spacing.xs,
  },

  title: {
    height: 24,
    marginBottom: spacing.sm,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
  },

  card: {
    height: 200,
    borderRadius: radius.lg,
  }
}
```

#### Loading Spinner
```typescript
const Spinner = {
  sizes: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },

  default: {
    border: `2px solid ${colors.gray[200]}`,
    borderTop: `2px solid ${colors.black.pure}`,
    borderRadius: radius.full,
    animation: 'spin 0.6s linear infinite',
  },

  fullPage: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
}
```

### 14.4 Empty States

```typescript
const EmptyState = {
  container: {
    padding: spacing['3xl'],
    textAlign: 'center',
    maxWidth: 400,
    margin: '0 auto',
  },

  icon: {
    size: 64,
    color: colors.gray[300],
    marginBottom: spacing.xl,
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },

  description: {
    fontSize: '14px',
    color: colors.gray[600],
    marginBottom: spacing.xl,
  },

  action: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing.sm,
  }
}
```

### 14.5 Search Bar

```typescript
const SearchBar = {
  container: {
    position: 'relative',
    maxWidth: 480,
  },

  input: {
    width: '100%',
    height: 40,
    paddingLeft: 40,
    paddingRight: spacing.lg,
    background: colors.gray[50],
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.full,
    fontSize: '14px',

    focus: {
      background: colors.white.pure,
      borderColor: colors.black.pure,
      boxShadow: `0 0 0 2px ${colors.gray[100]}`,
    }
  },

  icon: {
    position: 'absolute',
    left: spacing.md,
    top: '50%',
    transform: 'translateY(-50%)',
    size: 20,
    color: colors.gray[500],
  },

  results: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    width: '100%',
    background: colors.white.pure,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.lg,
    boxShadow: shadows.lg,
    maxHeight: 400,
    overflow: 'auto',
  }
}
```

### 14.6 Onboarding Flow

```typescript
const Onboarding = {
  stepper: {
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: spacing['2xl'],
    },

    step: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.sm,

      number: {
        width: 32,
        height: 32,
        borderRadius: radius.full,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 600,

        inactive: {
          background: colors.gray[100],
          color: colors.gray[500],
        },

        active: {
          background: colors.black.pure,
          color: colors.white.pure,
        },

        completed: {
          background: colors.gold.primary,
          color: colors.white.pure,
          animation: 'celebration-pulse 0.5s ease',
        }
      },

      connector: {
        flex: 1,
        height: 2,
        background: colors.gray[200],

        active: {
          background: colors.black.pure,
        }
      }
    }
  },

  content: {
    minHeight: 400,
    animation: 'fade-slide-in 0.3s ease',
  },

  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing['2xl'],
  }
}
```

### 14.7 Privacy & Ghost Mode

```typescript
const GhostMode = {
  indicator: {
    position: 'fixed',
    top: spacing.lg,
    right: spacing.lg,
    padding: `${spacing.xs} ${spacing.md}`,
    background: colors.black.pure,
    color: colors.white.pure,
    borderRadius: radius.full,
    fontSize: '12px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    animation: 'fade-in 0.3s ease',

    icon: {
      size: 16,
      opacity: 0.8,
    }
  },

  toggle: {
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.md,
      padding: spacing.md,
      borderRadius: radius.lg,
      background: colors.gray[50],
    },

    switch: {
      width: 48,
      height: 24,
      borderRadius: radius.full,
      background: colors.gray[300],
      position: 'relative',
      transition: transitions.fast,

      active: {
        background: colors.black.pure,
      },

      thumb: {
        width: 20,
        height: 20,
        borderRadius: radius.full,
        background: colors.white.pure,
        position: 'absolute',
        top: 2,
        left: 2,
        transition: transitions.fast,

        active: {
          transform: 'translateX(24px)',
        }
      }
    }
  }
}
```

### 14.8 Error Boundaries

```typescript
const ErrorBoundary = {
  container: {
    padding: spacing['2xl'],
    textAlign: 'center',
    background: colors.gray[50],
    borderRadius: radius.lg,
    border: `1px solid ${colors.gray[200]}`,
  },

  icon: {
    size: 48,
    color: colors.gray[400],
    marginBottom: spacing.lg,
    animation: 'shake 0.3s ease',
  },

  title: {
    fontSize: '18px',
    fontWeight: 600,
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },

  message: {
    fontSize: '14px',
    color: colors.gray[600],
    marginBottom: spacing.xl,
  },

  actions: {
    display: 'flex',
    gap: spacing.md,
    justifyContent: 'center',
  },

  details: {
    marginTop: spacing.xl,
    padding: spacing.md,
    background: colors.white.pure,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.md,
    fontSize: '12px',
    fontFamily: 'monospace',
    textAlign: 'left',
    color: colors.gray[700],
  }
}
```

---

## 15. Admin Dashboard Components (Modern 2025 Patterns)

### 15.1 Data Tables (TanStack Table Integration)

```typescript
const DataTable = {
  container: {
    background: colors.white.pure,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },

  header: {
    background: colors.gray[50],
    borderBottom: `1px solid ${colors.gray[200]}`,
    padding: spacing.md,

    title: {
      fontSize: '16px',
      fontWeight: 600,
      color: colors.black.pure,
    },

    actions: {
      display: 'flex',
      gap: spacing.sm,
      marginLeft: 'auto',
    }
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',

    th: {
      padding: `${spacing.md} ${spacing.lg}`,
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: 600,
      color: colors.gray[600],
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: `1px solid ${colors.gray[200]}`,

      sortable: {
        cursor: 'pointer',
        userSelect: 'none',
        hover: {
          color: colors.black.pure,
        }
      },

      sortIcon: {
        marginLeft: spacing.xs,
        size: 14,
        color: colors.gray[400],
        activeColor: colors.black.pure,
      }
    },

    td: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: '14px',
      color: colors.gray[900],
      borderBottom: `1px solid ${colors.gray[100]}`,

      hover: {
        background: colors.gray[25],
      }
    },

    selectedRow: {
      background: `${colors.gold.primary}10`,
      borderLeft: `3px solid ${colors.gold.primary}`,
    }
  },

  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderTop: `1px solid ${colors.gray[200]}`,

    info: {
      fontSize: '14px',
      color: colors.gray[600],
    },

    controls: {
      display: 'flex',
      gap: spacing.sm,

      button: {
        padding: `${spacing.xs} ${spacing.sm}`,
        border: `1px solid ${colors.gray[300]}`,
        borderRadius: radius.md,
        background: colors.white.pure,
        color: colors.gray[700],
        fontSize: '14px',
        cursor: 'pointer',

        hover: {
          background: colors.gray[50],
          borderColor: colors.gray[400],
        },

        active: {
          background: colors.black.pure,
          color: colors.white.pure,
          borderColor: colors.black.pure,
        },

        disabled: {
          opacity: 0.5,
          cursor: 'not-allowed',
        }
      }
    }
  }
}
```

### 15.2 Admin Dashboard Layout

```typescript
const AdminDashboard = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    minHeight: '100vh',
    background: colors.gray[25],

    mobile: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr',
    }
  },

  sidebar: {
    background: colors.white.pure,
    borderRight: `1px solid ${colors.gray[200]}`,
    padding: spacing.lg,

    header: {
      marginBottom: spacing.xl,

      logo: {
        height: 32,
        marginBottom: spacing.md,
      },

      title: {
        fontSize: '14px',
        fontWeight: 600,
        color: colors.gray[600],
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }
    },

    nav: {
      list: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.xs,
      },

      item: {
        display: 'flex',
        alignItems: 'center',
        padding: `${spacing.sm} ${spacing.md}`,
        borderRadius: radius.md,
        fontSize: '14px',
        color: colors.gray[700],
        textDecoration: 'none',
        transition: transitions.fast,

        icon: {
          size: 16,
          marginRight: spacing.sm,
          color: colors.gray[500],
        },

        hover: {
          background: colors.gray[50],
          color: colors.gray[900],
          iconColor: colors.gray[700],
        },

        active: {
          background: colors.black.pure,
          color: colors.white.pure,
          iconColor: colors.white.pure,
          fontWeight: 500,
        }
      }
    }
  },

  main: {
    padding: spacing.xl,
    overflow: 'auto',

    mobile: {
      padding: spacing.lg,
    }
  }
}
```

### 15.3 Metric Cards

```typescript
const MetricCard = {
  container: {
    background: colors.white.pure,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    transition: transitions.fast,

    hover: {
      borderColor: colors.gray[300],
      transform: 'translateY(-1px)',
      boxShadow: shadows.md,
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,

    title: {
      fontSize: '14px',
      fontWeight: 500,
      color: colors.gray[600],
    },

    icon: {
      size: 20,
      color: colors.gray[400],
    }
  },

  value: {
    fontSize: '32px',
    fontWeight: 700,
    color: colors.black.pure,
    lineHeight: 1,
    marginBottom: spacing.sm,
  },

  trend: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: '14px',

    positive: {
      color: colors.gold.primary,
    },

    negative: {
      color: colors.gray[600],
    },

    icon: {
      size: 14,
    },

    text: {
      color: colors.gray[600],
    }
  }
}
```

### 15.4 Admin Controls & Actions

```typescript
const AdminControls = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
    padding: `${spacing.lg} 0`,
    borderBottom: `1px solid ${colors.gray[200]}`,

    title: {
      fontSize: '24px',
      fontWeight: 700,
      color: colors.black.pure,
    },

    actions: {
      display: 'flex',
      gap: spacing.sm,
    }
  },

  bulkActions: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    background: colors.gray[50],
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,

    selected: {
      fontSize: '14px',
      fontWeight: 500,
      color: colors.gray[700],
    },

    actions: {
      display: 'flex',
      gap: spacing.sm,
      marginLeft: 'auto',
    }
  },

  filters: {
    display: 'flex',
    gap: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.lg,
    background: colors.white.pure,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: radius.lg,

    group: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.xs,

      label: {
        fontSize: '12px',
        fontWeight: 500,
        color: colors.gray[600],
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }
    }
  }
}
```

### 15.5 Status Indicators

```typescript
const StatusIndicator = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: radius.full,
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',

    online: {
      background: `${colors.gold.primary}20`,
      color: colors.gold.primary,
      border: `1px solid ${colors.gold.primary}30`,
    },

    offline: {
      background: colors.gray[100],
      color: colors.gray[600],
      border: `1px solid ${colors.gray[200]}`,
    },

    pending: {
      background: colors.gray[100],
      color: colors.gray[700],
      border: `1px solid ${colors.gray[300]}`,
      animation: 'pulse 2s infinite',
    },

    error: {
      background: colors.gray[100],
      color: colors.gray[900],
      border: `1px solid ${colors.gray[400]}`,
      animation: 'shake 0.3s ease',
    }
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.full,
    marginRight: spacing.xs,

    online: {
      background: colors.gold.primary,
      animation: 'pulse-gold 2s infinite',
    },

    offline: {
      background: colors.gray[400],
    },

    pending: {
      background: colors.gray[500],
      animation: 'pulse 2s infinite',
    }
  }
}
```

### 15.6 Advanced Form Patterns

```typescript
const ComplexForm = {
  wizard: {
    container: {
      background: colors.white.pure,
      borderRadius: radius.xl,
      overflow: 'hidden',
      border: `1px solid ${colors.gray[200]}`,
    },

    stepper: {
      display: 'flex',
      background: colors.gray[50],
      borderBottom: `1px solid ${colors.gray[200]}`,
      padding: spacing.lg,

      step: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: spacing.sm,

        number: {
          width: 24,
          height: 24,
          borderRadius: radius.full,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 600,

          incomplete: {
            background: colors.gray[200],
            color: colors.gray[500],
          },

          current: {
            background: colors.black.pure,
            color: colors.white.pure,
          },

          complete: {
            background: colors.gold.primary,
            color: colors.white.pure,
          }
        },

        label: {
          fontSize: '14px',
          fontWeight: 500,
          color: colors.gray[700],
        },

        connector: {
          flex: 1,
          height: 2,
          background: colors.gray[200],
          marginLeft: spacing.md,

          complete: {
            background: colors.gold.primary,
          }
        }
      }
    },

    content: {
      padding: spacing.xl,
      minHeight: 400,
    },

    actions: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: spacing.xl,
      borderTop: `1px solid ${colors.gray[200]}`,
    }
  },

  fieldGroup: {
    marginBottom: spacing.xl,

    legend: {
      fontSize: '16px',
      fontWeight: 600,
      color: colors.black.pure,
      marginBottom: spacing.md,
      paddingBottom: spacing.sm,
      borderBottom: `1px solid ${colors.gray[200]}`,
    },

    description: {
      fontSize: '14px',
      color: colors.gray[600],
      marginBottom: spacing.lg,
    }
  },

  fileUpload: {
    container: {
      border: `2px dashed ${colors.gray[300]}`,
      borderRadius: radius.lg,
      padding: spacing.xl,
      textAlign: 'center',
      transition: transitions.fast,

      hover: {
        borderColor: colors.gray[400],
        background: colors.gray[25],
      },

      dragOver: {
        borderColor: colors.black.pure,
        background: colors.gray[50],
      }
    },

    content: {
      icon: {
        size: 48,
        color: colors.gray[300],
        marginBottom: spacing.lg,
      },

      text: {
        fontSize: '16px',
        fontWeight: 500,
        color: colors.gray[700],
        marginBottom: spacing.sm,
      },

      subtext: {
        fontSize: '14px',
        color: colors.gray[500],
      }
    }
  }
}
```

---

## 16. Ritual & Engagement UI Patterns

### 16.1 Ritual Progress Ring

```typescript
const RitualProgress = {
  container: {
    position: 'relative',
    width: 120,
    height: 120,
  },

  ring: {
    transform: 'rotate(-90deg)',

    background: {
      stroke: colors.gray[200],
      strokeWidth: 8,
      fill: 'none',
    },

    progress: {
      stroke: colors.gold.primary,
      strokeWidth: 8,
      fill: 'none',
      strokeLinecap: 'round',
      strokeDasharray: 'calculated', // Circumference
      strokeDashoffset: 'calculated', // Based on progress %
      transition: 'stroke-dashoffset 0.5s ease',

      animation: {
        complete: 'gold-burst 0.8s ease-out',
      }
    }
  },

  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',

    percentage: {
      fontSize: '18px',
      fontWeight: 700,
      color: colors.black.pure,
      lineHeight: 1,
    },

    label: {
      fontSize: '10px',
      color: colors.gray[600],
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      marginTop: spacing.xs,
    }
  }
}
```

### 16.2 Completion Celebrations

```typescript
const CelebrationPatterns = {
  confetti: {
    keyframes: `
      @keyframes confetti-fall {
        0% {
          transform: translateY(-100vh) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `,

    particle: {
      position: 'absolute',
      width: 8,
      height: 8,
      background: colors.gold.primary,
      animation: 'confetti-fall 3s linear',
    }
  },

  goldBurst: {
    keyframes: `
      @keyframes gold-burst {
        0% {
          transform: scale(0.8);
          box-shadow: 0 0 0 0 ${colors.gold.primary}40;
        }
        50% {
          transform: scale(1.1);
          box-shadow: 0 0 0 20px ${colors.gold.primary}00;
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 ${colors.gold.primary}00;
        }
      }
    `,
  },

  achievement: {
    container: {
      background: `linear-gradient(135deg, ${colors.gold.primary}10, ${colors.gold.primary}05)`,
      border: `2px solid ${colors.gold.primary}`,
      borderRadius: radius.xl,
      padding: spacing.xl,
      textAlign: 'center',
      animation: 'gold-burst 0.8s ease-out',
    },

    icon: {
      size: 64,
      color: colors.gold.primary,
      marginBottom: spacing.lg,
    },

    title: {
      fontSize: '20px',
      fontWeight: 700,
      color: colors.black.pure,
      marginBottom: spacing.sm,
    },

    description: {
      fontSize: '14px',
      color: colors.gray[600],
    }
  }
}
```

---

## 17. AI Implementation Guide

### Step 1: Foundation
1. Set up CSS variables exactly as specified
2. Configure base styles with system fonts
3. Implement 8px grid system
4. Add transition to all interactive elements

### Step 2: Components
1. Build each component with all 5 states (default, hover, focus, active, disabled)
2. Add loading skeletons for async content
3. Implement error boundaries with styled fallbacks
4. Ensure touch targets are 44px minimum on mobile

### Step 3: Pages
1. Start with mobile layout at 375px
2. Add tablet breakpoint at 768px
3. Optimize desktop at 1440px
4. Test on real devices, not just browser tools

### Step 4: Polish
1. Add micro-animations to all interactions
2. Implement progressive disclosure for complex features
3. Add empty states with clear CTAs
4. Ensure loading states for all async operations

### Step 5: Performance
1. Lazy load images with blur-up effect
2. Code split by route
3. Inline critical CSS
4. Preload key fonts

---

## 18. Quality Checklist

### Visual Consistency
- [ ] All border radius match (8px for small, 12px for cards)
- [ ] Shadows are consistent across similar elements
- [ ] Colors only from defined palette
- [ ] Typography follows scale exactly
- [ ] Spacing on 8px grid

### Interaction Design
- [ ] Hover states on all clickable elements
- [ ] Focus indicators for keyboard navigation
- [ ] Loading states for all async actions
- [ ] Error states with recovery options
- [ ] Success feedback for completed actions

### Responsive Behavior
- [ ] Tested on iPhone SE (375px)
- [ ] Tested on iPad (768px)
- [ ] Tested on Desktop (1440px)
- [ ] Touch targets ≥ 44px on mobile
- [ ] No horizontal scroll at any breakpoint

### Performance
- [ ] First paint < 1.5s
- [ ] Interactive < 3s
- [ ] Animations at 60fps
- [ ] Images optimized and lazy loaded
- [ ] CSS purged and minified

---

**Design Principle Reminder**: If it doesn't help students go from panic → relief in <10 seconds, it doesn't belong in the design. Every pixel serves the behavioral loop.

**Quality Bar**: Ship something Vercel would feature in their showcase. Accept nothing less.