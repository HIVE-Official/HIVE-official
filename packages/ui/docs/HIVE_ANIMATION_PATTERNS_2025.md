# HIVE Animation Patterns (2025)

**Version:** 2.0
**Last Updated:** October 2, 2025
**Status:** Production Ready

---

## 🎯 What's New in 2025

HIVE's animation system now includes cutting-edge patterns used by Linear, Apple, Stripe, and Arc Browser:

### ✨ New Capabilities

1. **Spring Physics** - Natural motion instead of easing curves
2. **Scroll-Linked Animations** - Parallax, reveals, scroll progress
3. **Gesture Interactions** - Swipe, drag, long-press with haptics
4. **Layout Animations** - Auto-animate reordering and resizing
5. **Shared Element Transitions** - iOS-style hero animations
6. **Performance-First** - 60fps guaranteed, reduced-motion support

---

## 📦 Installation & Setup

All animation utilities are centralized in `@hive/ui/lib/animations`:

```typescript
import {
  // Presets
  springs,
  fade,
  scale,
  stagger,
  micro,
  celebration,

  // Gestures
  useSwipeToDismiss,
  useLongPress,
  gesturePresets,

  // Scroll
  useScrollReveal,
  useParallax,
  useHideOnScroll,

  // Layout
  layoutProps,
  listItemProps,
  createSharedElement,

  // Components
  MotionDiv,
  AnimatePresence,
} from '@hive/ui/lib/animations';
```

---

## 🌊 1. Spring Physics (vs Easing Curves)

**Why Springs?** More natural, responsive feel compared to cubic-bezier easing.

### Available Springs

```typescript
import { springs } from '@hive/ui/lib/animations';

// Snappy (buttons, toggles)
transition: springs.snappy
// { type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }

// Smooth (cards, modals)
transition: springs.smooth
// { type: 'spring', stiffness: 300, damping: 30, mass: 1 }

// Bouncy (success states)
transition: springs.bouncy
// { type: 'spring', stiffness: 500, damping: 20, mass: 1 }

// Gentle (tooltips)
transition: springs.gentle
// { type: 'spring', stiffness: 200, damping: 25, mass: 1 }
```

### Usage Example

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  transition={springs.snappy}
>
  Click me
</motion.button>
```

**✅ When to use:**
- Micro-interactions (button press, toggle)
- Success confirmations
- Modal entrances
- Any animation that should feel "physical"

**❌ When NOT to use:**
- Infinitely looping animations (use duration-based)
- Precise timing requirements (use easing curves)

---

## 🎭 2. Scroll-Linked Animations

### 2.1 Scroll Reveal (Intersection Observer)

Reveal elements as they scroll into view:

```tsx
import { useScrollReveal } from '@hive/ui/lib/animations';

function FeatureCard() {
  const { ref, isInView } = useScrollReveal({
    threshold: 0.1,
    once: true  // Only trigger once
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={springs.smooth}
    >
      <Card>Feature content</Card>
    </motion.div>
  );
}
```

**Performance:** Uses IntersectionObserver (not scroll events)

### 2.2 Parallax Depth

Create depth with layered motion:

```tsx
import { useParallax } from '@hive/ui/lib/animations';

function HeroSection() {
  const ref = useRef(null);
  const y = useParallax(ref, {
    speed: 0.5,  // 50% scroll speed
    direction: 'up'
  });

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>
        Background layer
      </motion.div>
    </div>
  );
}
```

**Use cases:**
- Hero sections
- Background imagery
- Depth in card layouts
- Visual storytelling

### 2.3 Hide Navigation on Scroll

Auto-hide header when scrolling down:

```tsx
import { useHideOnScroll } from '@hive/ui/lib/animations';

function Header() {
  const isVisible = useHideOnScroll(10); // 10px threshold

  return (
    <motion.header
      animate={{ y: isVisible ? 0 : -100 }}
      transition={springs.smooth}
    >
      Navigation
    </motion.header>
  );
}
```

**UX benefit:** More screen space while scrolling, header reappears when needed

### 2.4 Scroll Progress Indicator

Show reading progress:

```tsx
import { useScrollProgress } from '@hive/ui/lib/animations';

function ProgressBar() {
  const { scrollYProgress } = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

---

## 🖐️ 3. Gesture Interactions

### 3.1 Swipe to Dismiss

```tsx
import { useSwipeToDismiss } from '@hive/ui/lib/animations';

function NotificationCard({ onDismiss }) {
  const swipe = useSwipeToDismiss({
    onDismiss,
    direction: 'horizontal',
    threshold: 120  // 120px to trigger
  });

  return (
    <motion.div {...swipe.props}>
      Notification content
    </motion.div>
  );
}
```

**Use cases:**
- Notification dismissal
- Tinder-style cards
- Mobile sheet close

### 3.2 Long Press (Context Menus)

```tsx
import { useLongPress } from '@hive/ui/lib/animations';

function PostCard() {
  const longPress = useLongPress({
    onLongPress: () => showContextMenu(),
    duration: 500  // Hold for 500ms
  });

  return (
    <motion.div {...longPress}>
      Long press for options
    </motion.div>
  );
}
```

### 3.3 Drag to Reorder

```tsx
import { dragToReorderProps } from '@hive/ui/lib/animations';

<motion.div {...dragToReorderProps}>
  Drag to reorder
</motion.div>
```

### 3.4 Haptic Feedback (Mobile)

```tsx
import { triggerHaptic } from '@hive/ui/lib/animations';

<Button
  onClick={() => {
    triggerHaptic('medium');  // 'light' | 'medium' | 'heavy' | 'selection'
    handleAction();
  }}
>
  Click with haptic
</Button>
```

**Supported:** iOS (via webkit), Android (Vibration API)

---

## 📐 4. Layout Animations

### 4.1 Auto-Animate Lists

Automatically animate item add/remove/reorder:

```tsx
import { listItemProps } from '@hive/ui/lib/animations';

<AnimatePresence>
  {items.map(item => (
    <motion.li key={item.id} {...listItemProps}>
      {item.content}
    </motion.li>
  ))}
</AnimatePresence>
```

**What it does:**
- Fade in new items
- Slide out removed items
- Smoothly reposition when reordered

### 4.2 Shared Element Transitions

iOS-style hero animations:

```tsx
import { createSharedElement } from '@hive/ui/lib/animations';

// List view
<motion.img
  {...createSharedElement('post-123')}
  src={post.thumbnail}
/>

// Detail view (same layoutId connects them)
<motion.img
  {...createSharedElement('post-123')}
  src={post.fullImage}
/>
```

**Magic:** Framer Motion automatically animates between the two states

### 4.3 Accordion / Collapse

```tsx
import { accordionProps } from '@hive/ui/lib/animations';

<motion.div
  {...accordionProps}
  animate={isOpen ? 'open' : 'closed'}
>
  Accordion content
</motion.div>
```

### 4.4 Tab Underline Animation

```tsx
import { tabUnderlineProps } from '@hive/ui/lib/animations';

<motion.div
  layoutId="tab-underline"  // Shared layoutId animates between tabs
  {...tabUnderlineProps}
/>
```

---

## ⚡ 5. Micro-Interactions

### 5.1 Button Press

```tsx
import { gesturePresets } from '@hive/ui/lib/animations';

<motion.button {...gesturePresets.buttonPress}>
  // Scales down to 0.95 on tap
  Press me
</motion.button>
```

### 5.2 Card Hover

```tsx
<motion.div {...gesturePresets.cardHover}>
  // Lifts up 4px on hover
  <Card>Content</Card>
</motion.div>
```

### 5.3 Checkbox Animation

```tsx
import { micro } from '@hive/ui/lib/animations';

<AnimatePresence>
  {checked && (
    <motion.div
      variants={micro.check}
      initial="initial"
      animate="animate"
    >
      ✓
    </motion.div>
  )}
</AnimatePresence>
```

### 5.4 Loading Pulse

```tsx
import { micro } from '@hive/ui/lib/animations';

<motion.div
  variants={micro.pulse}
  animate="animate"
  className="spinner"
/>
```

---

## 🎉 6. Celebration Animations

### Success Checkmark

```tsx
import { celebration } from '@hive/ui/lib/animations';

<AnimatePresence>
  {success && (
    <motion.div
      variants={celebration.checkmark}
      initial="initial"
      animate="animate"
      // Bounces in with rotation
    >
      ✓
    </motion.div>
  )}
</AnimatePresence>
```

### Streak Fire

```tsx
<motion.div
  variants={celebration.streak}
  animate="animate"
  // Scales and wobbles
>
  🔥 7 day streak!
</motion.div>
```

### Badge Earned

```tsx
<motion.div
  variants={celebration.badge}
  initial="initial"
  animate="animate"
  // Spins in with overshoot
>
  🏆 Achievement Unlocked
</motion.div>
```

---

## 🎬 7. Stagger Animations

Orchestrate multiple element entrances:

```tsx
import { stagger } from '@hive/ui/lib/animations';

<motion.div
  variants={stagger.default.container}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={stagger.default.item}
      // Each item delays by 80ms
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Available stagger patterns:**
- `stagger.fast` - 50ms delay
- `stagger.default` - 80ms delay
- `stagger.slow` - 120ms delay
- `stagger.grid` - 2D grid layout

---

## 📱 8. Mobile-Specific Patterns

### Bottom Sheet

```tsx
import { slide } from '@hive/ui/lib/animations';

<motion.div
  variants={slide.fromBottom}
  initial="initial"
  animate="animate"
  exit="exit"
  className="fixed inset-x-0 bottom-0"
>
  Sheet content
</motion.div>
```

### Pull to Refresh

```tsx
import { usePullToRefresh } from '@hive/ui/lib/animations';

const pullToRefresh = usePullToRefresh({
  onRefresh: async () => {
    await fetchNewData();
  },
  threshold: 80
});

<motion.div {...pullToRefresh.props}>
  <FeedList />
</motion.div>
```

---

## 🎨 9. Page Transitions

```tsx
import { page } from '@hive/ui/lib/animations';

<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={page.fade.initial}
    animate={page.fade.animate}
    exit={page.fade.exit}
    transition={page.fade.transition}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

**Available transitions:**
- `page.fade` - Simple crossfade
- `page.slide` - Lateral slide
- `page.stack` - Modal-style scale

---

## ⚡ Performance Best Practices

### 1. Use GPU-Accelerated Properties

```tsx
// ✅ FAST (GPU-accelerated)
<motion.div
  animate={{
    x: 100,          // transform: translateX
    y: 100,          // transform: translateY
    scale: 1.2,      // transform: scale
    rotate: 45,      // transform: rotate
    opacity: 0.5,    // opacity
  }}
/>

// ❌ SLOW (triggers layout recalculation)
<motion.div
  animate={{
    width: 200,      // Forces reflow
    height: 200,     // Forces reflow
    top: 100,        // Forces reflow
  }}
/>
```

### 2. Use `layout` for Size Changes

```tsx
// ✅ Animates size changes smoothly
<motion.div layout>
  Content that changes size
</motion.div>
```

### 3. Respect Reduced Motion

```tsx
// Framer Motion automatically respects prefers-reduced-motion
// No extra code needed!

<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  // Animation duration reduced to 0.01ms if user prefers reduced motion
/>
```

### 4. Lazy-Load Heavy Animations

```tsx
// Only load animation library when needed
const { confetti } = await import('@hive/ui/lib/animations/celebration');
```

---

## 🧪 Testing Animations

### Storybook

All animation patterns have interactive Storybook demos:

```bash
pnpm storybook
```

Navigate to **00-Design-System/Animation Showcase**

### Visual Regression

```bash
pnpm test:visual
```

Chromatic catches animation regressions automatically.

---

## 📊 Animation Decision Tree

```
Does the animation involve user interaction?
├─ YES → Use spring physics (springs.snappy, springs.smooth)
└─ NO ↓

Is it a micro-interaction (<0.3s)?
├─ YES → Use micro presets (micro.press, micro.hover)
└─ NO ↓

Is it scroll-triggered?
├─ YES → Use scroll hooks (useScrollReveal, useParallax)
└─ NO ↓

Is it a celebration?
├─ YES → Use celebration presets (celebration.checkmark, celebration.streak)
└─ NO ↓

Is it a layout change?
├─ YES → Use layout props (layout: true)
└─ Use standard fade/slide presets
```

---

## 🎯 Real-World Examples

### Feed Post Card

```tsx
import { gesturePresets, useScrollReveal } from '@hive/ui/lib/animations';

function FeedPostCard() {
  const { ref, isInView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={springs.smooth}
      {...gesturePresets.cardHover}
    >
      <Card>Post content</Card>
    </motion.div>
  );
}
```

### Space Card with Hover

```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={springs.gentle}
>
  <Card className="transition-shadow duration-smooth hover:shadow-lg">
    Space content
  </Card>
</motion.div>
```

### Ritual Check-In Button

```tsx
<motion.button
  whileTap={{ scale: 0.95 }}
  transition={springs.snappy}
  onClick={() => {
    triggerHaptic('medium');
    handleCheckIn();
  }}
>
  Check In
</motion.button>
```

### Onboarding Step Transition

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentStep}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={springs.smooth}
  >
    <OnboardingStep />
  </motion.div>
</AnimatePresence>
```

---

## 🚀 Quick Reference

| Pattern | Import | Use Case |
|---------|--------|----------|
| Spring physics | `springs.snappy` | Buttons, toggles |
| Scroll reveal | `useScrollReveal()` | Lazy-load animations |
| Parallax | `useParallax()` | Depth effects |
| Swipe dismiss | `useSwipeToDismiss()` | Notifications |
| Layout animation | `layout: true` | Reordering, resizing |
| Stagger | `stagger.default` | List entrances |
| Celebration | `celebration.checkmark` | Success states |
| Micro-interaction | `gesturePresets.buttonPress` | Tactile feedback |

---

## 📚 Additional Resources

- **Framer Motion Docs:** https://www.framer.com/motion/
- **Linear Motion Design:** https://linear.app/blog/motion
- **Apple HIG Motion:** https://developer.apple.com/design/human-interface-guidelines/motion
- **Web Animations API:** https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API

---

**Last Updated:** October 2, 2025
**Maintained by:** HIVE Design System Team
