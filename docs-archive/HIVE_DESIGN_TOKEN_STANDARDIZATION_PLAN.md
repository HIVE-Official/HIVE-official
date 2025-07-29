# HIVE Design Token Standardization Plan

## Current State Assessment

### ✅ **What's Already Excellent**
- **Comprehensive color palette** with metal-themed naming (obsidian, graphite, gold, etc.)
- **Sophisticated shadow/elevation system** (Level 1-5 + specialized glows)
- **Heavy radius design philosophy** consistently applied
- **Advanced motion system** with liquid/magnetic interactions
- **Glass morphism effects** systematically implemented

### ❌ **What Needs Standardization**
- **Missing commonly used colors**: `#A1A1AA`, `#71717A`, `#3F3F46` (60+ occurrences not tokenized)
- **Spacing inconsistencies**: Token system uses rem, but heavy arbitrary px usage (`[500px]`, `[400px]`, etc.)
- **Font family drift**: Legacy 'Inter' references mixed with 'Geist Sans'
- **Typography scale gaps**: Common sizes like `[72px]`, `[48px]` not in token system

---

## Standardization Strategy

### **Phase 1: Fill Token Gaps (Week 1)**

#### **Missing Color Tokens**
```css
/* Add to existing color system */
--hive-text-muted-light: #A1A1AA;     /* Most used non-tokenized color */
--hive-text-muted-dark: #71717A;      /* Secondary muted text */
--hive-text-subtle: #6B6B70;          /* Pewter from existing palette */
--hive-border-muted: #3F3F46;         /* Subtle borders */
--hive-border-interactive: #A1A1AA;   /* Interactive element borders */

/* Status color backgrounds */
--hive-success-bg: rgba(16, 185, 129, 0.1);
--hive-warning-bg: rgba(245, 158, 11, 0.1);  
--hive-error-bg: rgba(239, 68, 68, 0.1);
--hive-gold-bg: rgba(255, 215, 0, 0.1);      /* Already used, now tokenized */
```

#### **Spacing Token Enhancements**
```css
/* Add commonly used arbitrary values to token system */
--hive-height-xs: 12.5rem;    /* 200px */
--hive-height-sm: 18.75rem;   /* 300px */
--hive-height-md: 25rem;      /* 400px */
--hive-height-lg: 31.25rem;   /* 500px */

--hive-width-xs: 8.75rem;     /* 140px */
--hive-width-sm: 12.5rem;     /* 200px */
--hive-width-md: 25rem;       /* 400px */

/* Additional spacing for gaps found in usage */
--hive-spacing-14: 3.5rem;    /* 56px - common in layouts */
--hive-spacing-18: 4.5rem;    /* 72px - section spacing */
--hive-spacing-28: 7rem;      /* 112px - major gaps */
```

#### **Typography Scale Completion**
```css
/* Display typography for large headings */
--hive-font-size-display-sm: 2.5rem;   /* 40px */
--hive-font-size-display-md: 3rem;     /* 48px - commonly used */
--hive-font-size-display-lg: 3.75rem;  /* 60px - commonly used */
--hive-font-size-display-xl: 4.5rem;   /* 72px - hero headings */

/* Enhanced line heights */
--hive-line-height-tight: 1.25;
--hive-line-height-snug: 1.375;
--hive-line-height-normal: 1.5;
--hive-line-height-relaxed: 1.625;
```

### **Phase 2: Cleanup & Standardization (Week 1-2)**

#### **Font Family Standardization**
- [ ] Replace all 'Inter' references with 'Geist Sans'
- [ ] Audit hardcoded font-family declarations
- [ ] Ensure consistent font loading and fallbacks
- [ ] Update typography component defaults

#### **Color Usage Cleanup**
- [ ] Replace `#A1A1AA` with `var(--hive-text-muted-light)`
- [ ] Replace `#71717A` with `var(--hive-text-muted-dark)`
- [ ] Replace `rgba(255, 215, 0, 0.1)` with `var(--hive-gold-bg)`
- [ ] Standardize all rgba usage patterns

#### **Spacing Cleanup Strategy**
**Decision Point**: Keep commonly used arbitrary values or force token usage?

**Recommended Approach**:
- **Keep tokens for semantic spacing** (component padding, gaps)
- **Allow arbitrary values for specific layouts** (hero sections, unique layouts)
- **Add missing tokens for common patterns**

---

## Updated Token System Structure

### **File Organization**
```
packages/ui/src/tokens/
├── index.ts              # Main token exports
├── colors.ts             # Enhanced color system
├── typography.ts         # Complete typography scale
├── spacing.ts            # Spacing system + common arbitrary values
├── shadows.ts            # Existing shadow system (no changes needed)
├── border-radius.ts      # Existing radius system (no changes needed)
├── animations.ts         # Existing animation system (no changes needed)
└── css-generator.ts      # Enhanced CSS custom property generation
```

### **Enhanced Color System**
```typescript
// colors.ts - Enhanced with missing tokens
export const colors = {
  // Existing metal theme (keep all current tokens)
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
  
  // NEW: Missing commonly used colors
  text: {
    mutedLight: '#A1A1AA',    // Most used non-tokenized color
    mutedDark: '#71717A',     // Secondary muted
    subtle: '#6B6B70',        // Uses existing pewter
  },
  border: {
    muted: '#3F3F46',         // Subtle borders
    interactive: '#A1A1AA',   // Interactive elements
  },
  
  // NEW: Background variants for status colors
  backgrounds: {
    success: 'rgba(16, 185, 129, 0.1)',
    warning: 'rgba(245, 158, 11, 0.1)',
    error: 'rgba(239, 68, 68, 0.1)',
    gold: 'rgba(255, 215, 0, 0.1)',
  }
}
```

### **Enhanced Spacing System**
```typescript
// spacing.ts - Add missing common values
export const spacing = {
  // Existing token system (keep all)
  '1': '0.25rem',   // 4px
  '2': '0.5rem',    // 8px
  '4': '1rem',      // 16px
  '6': '1.5rem',    // 24px
  '8': '2rem',      // 32px
  
  // NEW: Fill gaps in spacing scale
  '14': '3.5rem',   // 56px - common in layouts
  '18': '4.5rem',   // 72px - section spacing
  '28': '7rem',     // 112px - major gaps
  
  // NEW: Common height/width patterns
  height: {
    xs: '12.5rem',    // 200px
    sm: '18.75rem',   // 300px
    md: '25rem',      // 400px
    lg: '31.25rem',   // 500px
  },
  width: {
    xs: '8.75rem',    // 140px
    sm: '12.5rem',    // 200px
    md: '25rem',      // 400px
  }
}
```

### **Enhanced Typography System**
```typescript
// typography.ts - Complete the scale
export const typography = {
  fontFamily: {
    sans: ['Geist Sans', 'system-ui', 'sans-serif'],    // Standardized
    display: ['Space Grotesk', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    // Existing sizes (keep all)
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    
    // NEW: Display sizes for large headings
    'display-sm': '2.5rem',   // 40px
    'display-md': '3rem',     // 48px - commonly used
    'display-lg': '3.75rem',  // 60px - commonly used
    'display-xl': '4.5rem',   // 72px - hero headings
  },
  lineHeight: {
    tight: '1.25',
    snug: '1.375', 
    normal: '1.5',
    relaxed: '1.625',
  }
}
```

---

## Implementation Checklist

### **Week 1: Token Enhancement**
- [ ] **Add missing color tokens** to existing color system
- [ ] **Enhance spacing system** with common arbitrary value patterns
- [ ] **Complete typography scale** with display sizes
- [ ] **Generate CSS custom properties** for all new tokens
- [ ] **Update Tailwind config** to include new tokens

### **Week 1-2: Standardization Cleanup**
- [ ] **Font Family Audit**: Replace 'Inter' with 'Geist Sans' across codebase
- [ ] **Color Usage Cleanup**: Replace common hard-coded colors with tokens
- [ ] **Typography Cleanup**: Replace arbitrary font sizes with display tokens where appropriate
- [ ] **Spacing Assessment**: Document where arbitrary values should stay vs use tokens

### **Week 2: Validation & Documentation**
- [ ] **Token Usage Linting**: Set up ESLint rules for token compliance
- [ ] **Storybook Documentation**: Document all tokens with usage examples
- [ ] **Design System Guidelines**: When to use tokens vs arbitrary values
- [ ] **Migration Guide**: Help developers adopt new tokens

### **Week 3: System Integration**
- [ ] **Component Audit**: Update components to use enhanced token system
- [ ] **Cross-System Consistency**: Apply standardized tokens across all 7 systems
- [ ] **Performance Validation**: Ensure token system doesn't impact performance
- [ ] **Accessibility Check**: Verify color contrast with new token usage

---

## Success Criteria

### **Immediate Success (Week 1)**
- [ ] No more `#A1A1AA`, `#71717A`, `#3F3F46` hard-coded values
- [ ] All 'Inter' font references replaced with 'Geist Sans'
- [ ] Common arbitrary spacing patterns have corresponding tokens
- [ ] Display typography tokens available for large headings

### **System Success (Week 2-3)**
- [ ] **Zero hard-coded design values** in core components
- [ ] **Consistent color usage** across all 7 systems
- [ ] **Typography hierarchy** using token system
- [ ] **Spacing consistency** with clear token vs arbitrary guidelines

### **Long-term Success**
- [ ] **Developer Experience**: Easy to find and use appropriate tokens
- [ ] **Design Consistency**: Visually cohesive experience across HIVE
- [ ] **Maintainability**: Design changes happen at token level, propagate automatically
- [ ] **Performance**: No impact on bundle size or runtime performance

---

## Next Steps

1. **Approve enhanced token structure** - Does this match your vision?
2. **Prioritize cleanup areas** - Which inconsistencies are most critical?
3. **Implementation strategy** - All at once or gradual rollout?
4. **Team coordination** - How to coordinate changes across systems?

**Ready to implement the enhanced token system?** This builds on your existing strong foundation while filling the gaps identified in the audit.