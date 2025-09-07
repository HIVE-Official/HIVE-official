# HIVE Design System Governance Rules

## 🎯 Core Principle
**Every design decision must enhance both social connection AND practical utility.**

---

## 🚨 STRICT RULES (NEVER BREAK THESE)

### 1. Token Usage Rules
```typescript
// ✅ ALWAYS USE TOKENS
color: semantic.text.primary;
background: semantic.background.secondary;

// ❌ NEVER HARDCODE
color: '#E5E5E7';
background: 'rgba(255, 255, 255, 0.05)';
```

### 2. Color System Hierarchy
- **ONLY use luxury system colors** (until migration decision)
- **NO mixing** between luxury and PRD systems
- **Gold (#FFD700)** is ONLY for primary actions and achievements
- **Status colors** are ONLY for system feedback

### 3. Component Creation Rules
1. **Check @hive/ui first** - NEVER create if it exists
2. **Extend existing** - Don't duplicate, compose
3. **Atomic hierarchy** - Atoms → Molecules → Organisms
4. **Storybook required** - No component without stories

---

## 📐 DESIGN PATTERNS

### Depth & Elevation
```typescript
// Level 1: Base surface (cards on background)
background: semantic.background.secondary;  // charcoal

// Level 2: Elevated content (modals, dropdowns)
background: semantic.background.tertiary;   // graphite

// Level 3: Interactive hover
background: overlay.glass;                  // glass morphism

// Level 4: Active/pressed
background: overlay['glass-medium'];        // stronger glass
```

### Text Hierarchy
```typescript
// Primary: Headlines, important content
color: semantic.text.primary;        // platinum
fontSize: tokens.fontSize.lg;

// Secondary: Body text, descriptions
color: semantic.text.secondary;      // silver
fontSize: tokens.fontSize.base;

// Tertiary: Metadata, timestamps
color: semantic.text.muted;          // mercury
fontSize: tokens.fontSize.sm;

// Disabled: Inactive elements
color: semantic.text.disabled;       // pewter
```

### Interactive States
```typescript
// Default
background: semantic.background.secondary;
border: border.glass;

// Hover
background: overlay.glass;
border: border['glass-strong'];
transform: 'translateY(-2px)';
transition: 'all 0.2s ease';

// Focus (accessibility)
outline: `2px solid ${colors.gold}`;
outlineOffset: '2px';

// Active
background: overlay['glass-medium'];
transform: 'translateY(0)';

// Disabled
opacity: 0.5;
cursor: 'not-allowed';
pointerEvents: 'none';
```

---

## 🎨 BRAND EXPRESSION RULES

### Gold Usage (Sacred)
Gold (#FFD700) is reserved for:
- ✅ Primary CTAs (Join Space, Create Tool)
- ✅ Achievement moments (onboarding completion)
- ✅ Special emphasis (featured content)
- ❌ NOT for decorative elements
- ❌ NOT for regular buttons
- ❌ NOT for borders (unless focus state)

### Glass Morphism
Apply glass effects for:
- ✅ Overlaying content on images
- ✅ Modal backgrounds
- ✅ Dropdown menus
- ✅ Hover states on cards
- ❌ NOT on primary backgrounds
- ❌ NOT on text elements

### Shadows
```typescript
// Subtle elevation
boxShadow: shadows.level1;  // Cards at rest

// Interactive elevation  
boxShadow: shadows.level2;  // Hoverable elements

// Modal/dropdown elevation
boxShadow: shadows.level3;  // Floating UI

// Special emphasis
boxShadow: shadows['gold-glow'];  // Achievement moments only
```

---

## 🏗 COMPONENT STANDARDS

### Naming Convention
```typescript
// Atoms
Button, Input, Badge, Icon

// Molecules  
FormField, SearchBar, CardHeader

// Organisms
SpaceCard, ProfileDashboard, ToolBuilder

// Templates
DashboardLayout, OnboardingFlow
```

### Required Props
Every component MUST accept:
```typescript
interface BaseComponentProps {
  className?: string;        // For composition
  children?: React.ReactNode; // For flexibility
  variant?: VariantType;      // For theming
  size?: SizeType;           // For responsive
}
```

### Mobile-First Design
```typescript
// Start with mobile
<div className="p-4 space-y-4">

// Enhance for tablet
<div className="p-4 md:p-6 space-y-4 md:space-y-6">

// Optimize for desktop
<div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8">
```

---

## 🚀 IMPLEMENTATION CHECKLIST

### Before Creating Any Component
- [ ] Check if it exists in @hive/ui
- [ ] Check Storybook for similar patterns
- [ ] Can you compose from existing atoms?
- [ ] Is there a molecule that does this?

### When Styling Components
- [ ] Using semantic tokens (not colors directly)?
- [ ] Following depth hierarchy?
- [ ] Hover/focus/active states defined?
- [ ] Mobile-first breakpoints?
- [ ] Accessibility considered?

### Before Committing
- [ ] No hardcoded colors?
- [ ] No inline styles?
- [ ] Storybook story created?
- [ ] TypeScript strict mode passing?
- [ ] Component documented?

---

## 🔨 ENFORCEMENT TOOLS

### 1. ESLint Rules (Coming Soon)
```javascript
// .eslintrc
{
  "rules": {
    "no-hardcoded-colors": "error",
    "use-semantic-tokens": "error",
    "require-storybook": "error"
  }
}
```

### 2. Pre-commit Hooks
```bash
# Check for hardcoded colors
grep -r "#[0-9a-fA-F]{6}" --include="*.tsx" --include="*.ts"

# Verify Storybook stories exist
find . -name "*.tsx" -not -name "*.stories.tsx" | check-stories
```

### 3. Design Review Checklist
- [ ] Follows atomic hierarchy
- [ ] Uses existing tokens
- [ ] Mobile responsive
- [ ] Accessible (keyboard, screen reader)
- [ ] Has loading states
- [ ] Has error states
- [ ] Documented in Storybook

---

## 📊 DECISION FRAMEWORK

### When to Use Luxury Colors
- Social features (Spaces, Profile, Feed)
- Emotional moments (achievements, celebrations)
- Premium features (advanced tools)

### When to Consider Simplification
- Utility features (settings, admin)
- Data-heavy interfaces (analytics, tables)
- High-frequency interactions (forms, inputs)

### When to Break Rules
1. Get explicit approval
2. Document the exception
3. Create a pattern for reuse
4. Update this document

---

## 🎯 NORTH STAR METRICS

Every design decision should improve:
1. **Time to first value** (<30 seconds)
2. **Component reuse rate** (>80%)
3. **Build time** (<3 minutes)
4. **Accessibility score** (100%)
5. **Mobile performance** (>90 Lighthouse)

---

## 🚦 QUICK REFERENCE

### DO ✅
- Use semantic tokens
- Check @hive/ui first
- Follow atomic design
- Test on mobile
- Document in Storybook

### DON'T ❌
- Hardcode colors
- Create duplicate components
- Skip accessibility
- Mix color systems
- Use gold carelessly

---

*Last Updated: January 2025*
*Next Review: After platform audit completion*