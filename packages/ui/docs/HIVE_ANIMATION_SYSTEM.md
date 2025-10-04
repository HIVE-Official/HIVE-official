# HIVE Animation System

**Version:** 2.0
**Last Updated:** October 2, 2025
**Philosophy:** Apple-inspired premium animations with slower, more fluid timing

---

## Overview

HIVE's animation system creates a **premium, polished experience** through deliberate, fluid motion. Every animation is slower and more luxurious, making interactions feel satisfying and refined.

### Design Philosophy

> "Premium animations create delight through careful timing"
> — Apple Human Interface Guidelines

**Principles:**
1. **Slower is more premium** - Deliberate timing creates luxurious feel
2. **Fluid and smooth** - Apple-calibrated easing curves
3. **Consistent timing** - Same duration for same interaction type
4. **Satisfying motion** - Every animation should feel good

---

## Animation Tokens

All animation values are defined in `@hive/tokens/src/hive-theme.ts`:

```typescript
import { hiveTheme } from '@hive/tokens';

// Duration in milliseconds (Apple-inspired timing)
hiveTheme.animation.duration.instant;   // 0ms
hiveTheme.animation.duration.fast;      // 250ms (was 120ms)
hiveTheme.animation.duration.normal;    // 400ms (was 200ms)
hiveTheme.animation.duration.slow;      // 600ms (was 300ms)
hiveTheme.animation.duration.slowest;   // 800ms (was 500ms)

// Easing curves (Apple-calibrated)
hiveTheme.animation.easing.smooth;      // Apple standard ease
hiveTheme.animation.easing.liquid;      // Apple ease-in-out
hiveTheme.animation.easing.bounce;      // Celebrations (kept)
hiveTheme.animation.easing.sharp;       // Quick actions (kept)
hiveTheme.animation.easing.gentle;      // Apple gentle fade
```

---

## Usage Guide

### 1. Tailwind CSS Classes

HIVE extends Tailwind with custom duration and easing utilities:

```tsx
// ✅ Using HIVE duration tokens
<button className="transition-all duration-fast hover:bg-primary">
  Quick hover response (120ms)
</button>

<div className="transition-opacity duration-smooth opacity-0 data-[open]:opacity-100">
  Standard fade (200ms)
</div>

<Modal className="transition-transform duration-slow ease-liquid">
  Smooth modal entry (300ms, liquid easing)
</Modal>

// ✅ Using HIVE easing curves
<Card className="transition-all duration-smooth ease-smooth hover:scale-105">
  Card hover with Material Design easing
</Card>

<Button className="transition-all duration-fast ease-bounce active:scale-95">
  Bouncy button press (celebratory feel)
</Button>
```

**Available Tailwind Classes:**
- `duration-fast` (250ms) - Apple-inspired quick interactions
- `duration-smooth` (400ms) - Apple-inspired standard timing
- `duration-slow` (600ms) - Apple-inspired deliberate motion
- `ease-smooth` (Apple standard ease)
- `ease-liquid` (Apple ease-in-out)
- `ease-bounce` (Celebratory, kept from v1)

---

### 2. CSS Variables

For custom animations, use CSS variables:

```css
.custom-animation {
  transition-duration: var(--hive-duration-normal);
  transition-timing-function: var(--hive-easing-smooth);
}

.loading-spinner {
  animation: spin var(--hive-duration-slow) var(--hive-easing-smooth) infinite;
}
```

---

### 3. Framer Motion

For complex animations, use Framer Motion with HIVE timing:

```tsx
import { motion } from 'framer-motion';
import { hiveTheme } from '@hive/tokens';

// ✅ Modal animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{
    duration: hiveTheme.animation.duration.normal / 1000, // Convert to seconds
    ease: hiveTheme.animation.easing.liquid.split('(')[1].replace(')', '').split(',').map(Number)
  }}
>
  Modal content
</motion.div>

// ✅ List stagger
<motion.ul
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: hiveTheme.animation.duration.fast / 1000
      }
    }
  }}
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{
        duration: hiveTheme.animation.duration.normal / 1000
      }}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>

// ✅ Success bounce
<motion.div
  animate={{ scale: [1, 1.2, 1] }}
  transition={{
    duration: hiveTheme.animation.duration.slow / 1000,
    ease: "backOut" // Maps to bounce easing
  }}
>
  ✓ Success!
</motion.div>
```

---

## Animation Patterns

### Micro-Interactions (250ms, fast)

Quick feedback for hover, focus, active states.

```tsx
// Button hover
<button className="
  transition-all duration-fast
  hover:bg-primary/10
  active:scale-95
">
  Hover me
</button>

// Input focus
<input className="
  transition-all duration-fast
  focus:border-primary
  focus:ring-2 focus:ring-primary/20
" />

// Badge appear
<Badge className="
  transition-opacity duration-fast
  opacity-0 animate-in fade-in
">
  New
</Badge>
```

**When to use:** Hover states, focus rings, button presses, badge appearances

---

### Standard Transitions (400ms, normal)

Page changes, component mounts, modal opens. Apple's signature smooth timing.

```tsx
// Page transition
<div className="
  transition-all duration-smooth ease-smooth
  opacity-0 translate-y-4
  data-[state=open]:opacity-100
  data-[state=open]:translate-y-0
">
  Page content
</div>

// Card hover
<Card className="
  transition-all duration-smooth
  hover:shadow-hive-md
  hover:border-primary/20
">
  Hover for emphasis
</Card>

// Tab switch
<TabContent className="
  transition-opacity duration-smooth
  opacity-0 data-[state=active]:opacity-100
">
  Tab content
</TabContent>
```

**When to use:** Most UI transitions, page navigation, component mounts/unmounts

---

### Deliberate Animations (600ms, slow)

Onboarding steps, success states, important confirmations.

```tsx
// Step transition
<OnboardingStep className="
  transition-all duration-slow ease-liquid
  opacity-0 translate-x-8
  data-[active]:opacity-100
  data-[active]:translate-x-0
">
  Step content
</OnboardingStep>

// Success checkmark
<CheckCircle2 className="
  transition-all duration-slow ease-bounce
  scale-0 data-[success]:scale-100
" />

// Tooltip appear
<Tooltip className="
  transition-all duration-slow
  opacity-0 scale-95
  data-[state=open]:opacity-100
  data-[state=open]:scale-100
">
  Helpful tip
</Tooltip>
```

**When to use:** Onboarding, success states, important tooltips, confirmations

---

### Special Moments (800ms, slowest)

Celebrations, completions, major achievements.

```tsx
// Confetti celebration
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{
    duration: 0.5,
    ease: "backOut"
  }}
>
  🎉 Completed!
</motion.div>

// Ritual completion
<motion.div
  animate={{
    scale: [1, 1.2, 1],
    rotate: [0, 5, -5, 0]
  }}
  transition={{
    duration: 0.5,
    ease: "easeInOut"
  }}
>
  Streak: 7 days 🔥
</motion.div>
```

**When to use:** Onboarding completion, ritual milestones, achievement unlocks

---

## Easing Curve Guide

### smooth (Material Design Standard)

**cubic-bezier(0.4, 0, 0.2, 1)**

The default for most transitions. Starts quickly, slows at the end.

```tsx
<div className="transition-all duration-smooth ease-smooth">
  Standard Material Design motion
</div>
```

**Use for:** Buttons, cards, most UI elements

---

### liquid (Arc-Inspired)

**cubic-bezier(0.25, 0.1, 0.25, 1)**

Smooth, flowing motion. Feels more natural and less mechanical.

```tsx
<Modal className="transition-transform duration-smooth ease-liquid">
  Smooth modal slide-in
</Modal>
```

**Use for:** Page transitions, modals, large surface movements

---

### bounce (Celebratory)

**cubic-bezier(0.68, -0.55, 0.265, 1.55)**

Overshoots and bounces back. Creates excitement.

```tsx
<Button className="transition-all duration-fast ease-bounce active:scale-95">
  Bouncy press
</Button>
```

**Use for:** Success states, celebrations, playful interactions

**⚠️ Use sparingly:** Too much bounce creates distraction

---

### sharp (Instant Feel)

**cubic-bezier(0.4, 0, 0.6, 1)**

Feels fast and responsive. Linear motion.

```tsx
<Drawer className="transition-transform duration-fast ease-sharp">
  Quick drawer slide
</Drawer>
```

**Use for:** Drawers, dropdowns, things that should feel instant

---

### gentle (Subtle Fades)

**cubic-bezier(0.25, 0, 0.25, 1)**

Very smooth, almost imperceptible.

```tsx
<Overlay className="transition-opacity duration-slow ease-gentle">
  Gentle fade overlay
</Overlay>
```

**Use for:** Overlays, subtle background changes, ambient effects

---

## Animation Decision Tree

```
Is this a hover/focus state?
├─ Yes → duration-fast (120ms) + ease-smooth
└─ No ↓

Is this a page/component transition?
├─ Yes → duration-smooth (200ms) + ease-liquid
└─ No ↓

Is this an important confirmation/step?
├─ Yes → duration-slow (300ms) + ease-smooth
└─ No ↓

Is this a celebration/achievement?
├─ Yes → duration-slowest (500ms) + ease-bounce
└─ No ↓

Is this loading/waiting?
└─ Use spinner (infinite) + ease-smooth
```

---

## Common Patterns

### Loading States

```tsx
// Spinner
<Loader2 className="h-4 w-4 animate-spin" />

// Skeleton pulse
<div className="animate-pulse bg-muted rounded" />

// Progress bar
<Progress
  value={progress}
  className="transition-all duration-smooth"
/>
```

---

### Page Transitions

```tsx
// Fade + slide up
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{
    duration: 0.2,
    ease: [0.25, 0.1, 0.25, 1] // liquid
  }}
>
  Page content
</motion.div>
```

---

### Modal Entry/Exit

```tsx
// Scale + fade
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.95 }}
  transition={{
    duration: 0.2,
    ease: [0.4, 0, 0.2, 1] // smooth
  }}
>
  Modal content
</motion.div>

// Slide from bottom (mobile)
<motion.div
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{
    duration: 0.3,
    ease: [0.25, 0.1, 0.25, 1] // liquid
  }}
>
  Bottom sheet
</motion.div>
```

---

### List Animations

```tsx
// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.05 // 50ms between each
      }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
      }}
      transition={{ duration: 0.2 }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

---

### Success States

```tsx
// Check mark bounce
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{
    duration: 0.3,
    ease: "backOut" // bounce
  }}
>
  <CheckCircle2 className="text-success" />
</motion.div>

// Success message fade
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
>
  Profile updated successfully!
</motion.div>
```

---

## Anti-Patterns (Avoid)

### ❌ Too Many Simultaneous Animations

```tsx
// ❌ BAD - Everything animates at once (chaos)
<div className="
  animate-pulse
  animate-bounce
  animate-spin
">
  Overwhelming!
</div>

// ✅ GOOD - One animation at a time
<div className="transition-opacity duration-smooth">
  <Loader2 className="animate-spin" /> Loading...
</div>
```

---

### ❌ Slow Interactions

```tsx
// ❌ BAD - Hover too slow (feels laggy)
<button className="transition-all duration-slow hover:bg-primary">
  Slow hover
</button>

// ✅ GOOD - Fast hover response
<button className="transition-all duration-fast hover:bg-primary">
  Instant feedback
</button>
```

---

### ❌ Inconsistent Timing

```tsx
// ❌ BAD - Random durations
<Card className="transition-all duration-[156ms]">Card 1</Card>
<Card className="transition-all duration-[241ms]">Card 2</Card>

// ✅ GOOD - Consistent tokens
<Card className="transition-all duration-smooth">Card 1</Card>
<Card className="transition-all duration-smooth">Card 2</Card>
```

---

### ❌ Animation for Animation's Sake

```tsx
// ❌ BAD - Decorative sparkle animation
<Sparkles className="animate-pulse" />
<span>Step 2 of 7</span>

// ✅ GOOD - Functional loading indicator
<Loader2 className="animate-spin" />
<span>Loading...</span>
```

---

## Accessibility

### Respect prefers-reduced-motion

```tsx
// ✅ Disable animations for users who prefer reduced motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.2
  }}
  // Framer Motion respects prefers-reduced-motion automatically
>
  Content
</motion.div>

// ✅ CSS media query
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Performance Tips

### 1. Use transform and opacity

```tsx
// ✅ GOOD - GPU-accelerated
<div className="transition-transform duration-smooth hover:scale-105">
  Fast
</div>

// ❌ BAD - Triggers layout recalculation
<div className="transition-all duration-smooth hover:w-full">
  Slow
</div>
```

---

### 2. Avoid animating layout properties

**GPU-accelerated (fast):**
- `transform`
- `opacity`
- `filter`

**Layout properties (slow):**
- `width`, `height`
- `padding`, `margin`
- `top`, `left`, `right`, `bottom`

---

### 3. Use will-change sparingly

```tsx
// ✅ GOOD - Only for complex animations
<motion.div
  style={{ willChange: 'transform' }}
  animate={{ x: 100 }}
>
  Complex animation
</motion.div>

// ❌ BAD - Don't apply to everything
<div className="will-change-transform">
  Static element
</div>
```

---

## Testing Animations

### Storybook Controls

```tsx
export const InteractiveButton: Story = {
  args: {
    children: 'Click me'
  },
  argTypes: {
    duration: {
      control: { type: 'select' },
      options: ['fast', 'smooth', 'slow']
    },
    easing: {
      control: { type: 'select' },
      options: ['smooth', 'liquid', 'bounce']
    }
  }
};
```

---

### Visual Regression

```bash
# Chromatic catches animation regressions
pnpm chromatic --project-token=<token>
```

---

## Migration Guide

### From Old System to HIVE Theme

```tsx
// ❌ BEFORE (random durations)
<div className="transition-all duration-200">Old</div>
<div className="transition-all duration-150">Also old</div>

// ✅ AFTER (HIVE tokens)
<div className="transition-all duration-smooth">Consistent</div>
<div className="transition-all duration-fast">Also consistent</div>
```

---

## Resources

- **Arc Browser Design:** https://arc.net/blog/design
- **Material Motion:** https://m3.material.io/styles/motion
- **Framer Motion:** https://www.framer.com/motion/
- **HIVE Theme Tokens:** `@hive/tokens/src/hive-theme.ts`

---

## Summary

**HIVE's animation system:**
- ✅ Uses 5 duration tokens (instant, fast, normal, slow, slowest)
- ✅ Uses 5 easing curves (smooth, liquid, bounce, sharp, gentle)
- ✅ Follows Arc Browser's "calm animations" philosophy
- ✅ Respects prefers-reduced-motion
- ✅ Optimized for performance (transform + opacity)
- ✅ Consistent across all components

**Remember:** Every animation should have a purpose. If it doesn't communicate state, relationship, or feedback, remove it.
