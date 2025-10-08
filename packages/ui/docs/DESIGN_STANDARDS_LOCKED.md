# 🔒 HIVE Design Standards - LOCKED

**Version:** 1.0 (Apple-Inspired Monochrome)
**Last Updated:** 2025-10-02
**Status:** LOCKED - Do not deviate without approval

---

## 📐 Typography System - FINAL

### Font Family (LOCKED)

**Primary Font:** **Geist Sans** (Vercel)
**Monospace Font:** **Geist Mono** (Vercel)
**Package:** `geist` v1.5.1

```typescript
// REQUIRED font loader (apps/web/src/app/layout.tsx)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

<html className={`${GeistSans.variable} ${GeistMono.variable}`}>
  <body className={GeistSans.className}>
```

**Fallback Stack:**
```css
font-sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif']
font-mono: ['var(--font-geist-mono)', 'monospace']
```

**Why Geist Sans:**
- ✅ Designed for optimal screen readability
- ✅ Clean, modern aesthetic (2024 standard)
- ✅ Variable font with 9 weights (100-900)
- ✅ Excellent legibility at small sizes
- ✅ Professional, technical feel
- ✅ Optimized for dark backgrounds

### Typography Scale (LOCKED)

| Size Class | Pixel Size | Usage | Purpose |
|------------|------------|-------|---------|
| `text-xs` | **12px** | 49% of usage | Metadata, timestamps, labels |
| `text-sm` | **14px** | 40% of usage | **Default body text** |
| `text-base` | 16px | 3% | Emphasized body |
| `text-lg` | 18px | 3% | Card titles |
| `text-xl` | 20px | 2% | Section headings |
| `text-2xl` | 24px | 2% | Page titles |
| `text-3xl` | 30px | 1% | Hero text |
| `text-4xl` | 36px | <1% | Large hero |

**RULE:** Default to `text-sm` (14px) for ALL body text. Use `text-xs` (12px) for metadata ONLY.

### Font Weight System (LOCKED)

| Weight Class | Value | Usage | Purpose |
|--------------|-------|-------|---------|
| `font-normal` | 400 | Default | Body text (implicit) |
| `font-medium` | **500** | **45%** | **Primary emphasis, buttons, labels** |
| `font-semibold` | **600** | **40%** | **All headings** |
| `font-bold` | 700 | 13% | Titles, metrics, strong emphasis |

**RULE:** All headings MUST use `font-semibold` (600). All buttons MUST use `font-medium` (500).

### Standard Typography Patterns (REQUIRED)

```typescript
// ✅ Button (STANDARD)
<Button className="text-sm font-medium">Click Me</Button>

// ✅ Card Header (STANDARD)
<CardTitle className="text-lg font-semibold">Card Title</CardTitle>
<CardDescription className="text-sm text-muted-foreground">Description</CardDescription>

// ✅ Page Header (STANDARD)
<h1 className="text-2xl font-bold">Page Title</h1>
<p className="text-sm text-muted-foreground">Subtitle</p>

// ✅ Body Text (STANDARD)
<p className="text-sm">Body paragraph text...</p>
<span className="text-xs text-muted-foreground">Metadata</span>

// ✅ Form Label (STANDARD)
<Label className="text-sm font-medium">Field Label</Label>
```

---

## 🎨 Icon System - FINAL

### Icon Library (LOCKED)

**Primary (Required):** **Lucide React** v0.411.0
**Secondary (Legacy):** Radix UI Icons (shadcn components only)

**RULE:** ALL new components MUST use Lucide React. DO NOT use Radix UI icons except in existing shadcn atoms.

### Icon Import Pattern (REQUIRED)

```typescript
// ✅ CORRECT - Named imports from Lucide
import {
  Settings,
  User,
  Bell,
  Heart,
  MessageCircle,
  Search,
  ChevronDown,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// ❌ WRONG - Radix icons in new components
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"; // NO!

// ⚠️ LEGACY ONLY - Radix in existing shadcn atoms
import { ChevronDownIcon } from "@radix-ui/react-icons"; // Only in select.tsx, etc.
```

### Icon Sizing Standards (LOCKED)

| Size | Class | Usage |
|------|-------|-------|
| **16px** | `h-4 w-4` | **Default** - Buttons, metadata, secondary actions |
| 20px | `h-5 w-5` | Primary actions, icon buttons |
| 24px | `h-6 w-6` | Feature highlights |
| 32px | `h-8 w-8` | Empty states, placeholders |
| 48px | `h-12 w-12` | Hero sections |

**RULE:** Default icon size is `h-4 w-4` (16px). Use `h-5 w-5` (20px) for standalone icon buttons.

### Icon Usage Patterns (REQUIRED)

```typescript
// ✅ Button with icon (left) - STANDARD
<Button>
  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
  Send Email
</Button>

// ✅ Icon-only button - STANDARD
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings className="h-5 w-5" aria-hidden="true" />
</Button>

// ✅ Loading state - STANDARD
<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />

// ✅ Status icons with semantic colors - STANDARD
<CheckCircle2 className="h-4 w-4 text-green-600" />
<AlertCircle className="h-4 w-4 text-destructive" />
<InfoIcon className="h-4 w-4 text-blue-600" />

// ✅ Interactive state (like/heart) - STANDARD
<Heart
  className={cn(
    "h-5 w-5 transition-colors",
    liked ? "text-destructive fill-current" : "text-muted-foreground"
  )}
/>
```

### Standard Icon Set (USE THESE)

**Navigation & Actions:**
`Home`, `Search`, `Bell`, `Settings`, `Menu`, `X`, `ChevronDown`, `ChevronRight`, `MoreHorizontal`

**Social & Engagement:**
`Heart`, `MessageCircle`, `Share2`, `Bookmark`, `Users`, `UserPlus`, `Star`, `Send`

**Content & Media:**
`Image`, `Video`, `File`, `FileText`, `Link`, `Paperclip`, `Camera`, `Upload`, `Download`

**Status & Feedback:**
`CheckCircle2`, `AlertCircle`, `XCircle`, `Info`, `Loader2`, `Clock`

**Campus-Specific:**
`GraduationCap`, `Calendar`, `MapPin`, `Building`, `BookOpen`, `Trophy`, `Target`, `Zap`

**RULE:** Choose icons from this standard set. New icons require design approval.

---

## 🎬 Animation System - FINAL

### Animation Philosophy (LOCKED)

**Inspiration:** Apple's interface animations
**Principle:** Slower, more deliberate animations create a premium, polished feel
**Duration:** 2-4x slower than typical web animations

### Duration System (LOCKED)

| Token | Milliseconds | Usage | Tailwind Class |
|-------|--------------|-------|----------------|
| **instant** | 0ms | No animation, reduced motion | `duration-instant` |
| **fast** | **250ms** | **Micro-interactions (hover, focus)** | `duration-fast` |
| **smooth** | **400ms** | **Standard transitions (modals, pages)** | `duration-smooth` |
| **slow** | 600ms | Deliberate animations (onboarding) | `duration-slow` |
| **slowest** | 800ms | Special moments (celebrations) | `duration-slowest` |

**RULE:** Default animation duration is `400ms` (smooth). Use `250ms` (fast) for hover states only.

### Easing Curves (LOCKED)

| Token | Cubic Bezier | Usage | Tailwind Class |
|-------|--------------|-------|----------------|
| **smooth** | `cubic-bezier(0.25, 0.1, 0.25, 1)` | **Apple standard ease (default)** | `ease-smooth` |
| **liquid** | `cubic-bezier(0.42, 0, 0.58, 1)` | **Fluid movements (page transitions)** | `ease-liquid` |
| **gentle** | `cubic-bezier(0.16, 1, 0.3, 1)` | **Subtle fades (modals, tooltips)** | `ease-gentle` |
| sharp | `cubic-bezier(0.4, 0, 0.6, 1)` | Quick actions (dismiss, close) | `ease-sharp` |
| bounce | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Celebrations only | `ease-bounce` |

**RULE:** Use `ease-smooth` for all standard animations. Use `ease-liquid` for page transitions.

### Standard Animation Classes (REQUIRED)

```typescript
// ✅ Interactive element (hover, active) - STANDARD
className="transition-all duration-fast ease-smooth hover:scale-102"

// ✅ Modal entrance - STANDARD
className="animate-in fade-in-0 zoom-in-95 duration-smooth ease-gentle"

// ✅ Page transition - STANDARD
className="transition-opacity duration-smooth ease-liquid"

// ✅ Loading spinner - STANDARD
<Loader2 className="h-4 w-4 animate-spin" />

// ✅ Success celebration - STANDARD
className="animate-bounce duration-slow ease-bounce"
```

### Pre-built Animation Utilities (USE THESE)

```typescript
// Flow in (entrance animation)
className="hive-animate-flow-in"         // 400ms Apple smooth

// Magnetic entry (stagger animation)
className="hive-animate-magnetic-entry"  // 600ms Apple smooth, 250ms delay

// Liquid reveal (smooth fade-in)
className="hive-animate-liquid-reveal"   // 400ms Apple liquid, 400ms delay

// Silk emerge (gentle fade)
className="hive-animate-silk-emerge"     // 400ms Apple gentle, 600ms delay
```

**RULE:** Use pre-built utilities for entrance animations. Custom animations require approval.

---

## 🎨 Color System - FINAL

### Color Philosophy (LOCKED)

**Approach:** Monochrome with strategic gold accent (Linear 2025 evolution)
**Principle:** True black (#000) for OLED optimization, high contrast, single accent color

### Core Color Palette (LOCKED)

**Background Layers:**
- `background` (#000000) - True black, OLED optimized
- `card` (#121212) - Surface level (cards, inputs)
- `popover` (#1A1A1C) - Elevated level (modals, dropdowns)

**Text Hierarchy:**
- `foreground` (#FFFFFF) - Primary text
- `muted-foreground` (#A1A1AA) - Secondary text, metadata
- `text-tertiary` (#71717A) - Tertiary content

**Primary Accent:**
- `primary` (#FFD700) - **HIVE Gold** - Use strategically for calls-to-action
- `primary-foreground` (#09090B) - Text on gold background

**Semantic Colors:**
- `destructive` (#EF4444) - Errors, delete actions
- `success` (#22C55E) - Success states
- `warning` (#F59E0B) - Warnings
- `info` (#3B82F6) - Info messages

**Interactive States:**
- `border` (rgba(255,255,255,0.08)) - Default borders
- `hover` (rgba(255,255,255,0.05)) - Hover overlay
- `active` (rgba(255,255,255,0.08)) - Active state

### Color Usage Rules (REQUIRED)

```typescript
// ✅ Default text - ALWAYS use semantic colors
<p className="text-foreground">Primary content</p>
<span className="text-muted-foreground">Secondary info</span>

// ✅ Interactive elements
<Button variant="default">Gold Button</Button>         // primary bg
<Button variant="secondary">Monochrome Button</Button> // subtle bg
<Button variant="ghost">Minimal Button</Button>        // transparent

// ✅ Status colors
<span className="text-destructive">Error message</span>
<span className="text-green-600">Success message</span>

// ❌ WRONG - Never use arbitrary colors
<p className="text-[#FF0000]">Error</p> // NO! Use text-destructive
<div className="bg-[#FFD700]">Gold</div> // NO! Use bg-primary
```

**RULE:** ONLY use semantic color classes. NO arbitrary hex colors. Gold accent for primary CTAs ONLY.

---

## 📏 Spacing & Layout - FINAL

### Spacing Scale (LOCKED)

**Standard Scale (Tailwind):** 4px increments
- `space-y-1` = 4px - Tight grouping
- `space-y-2` = 8px - Related items
- `space-y-4` = 16px - Section spacing
- `space-y-6` = 24px - Component spacing
- `space-y-8` = 32px - Large gaps

**RULE:** Use `space-y-2` (8px) for related items. Use `space-y-4` (16px) for section spacing.

### Component Padding Standards (LOCKED)

```typescript
// Card padding - STANDARD
<Card className="p-6">          // 24px padding (default)

// Modal padding - STANDARD
<DialogContent className="p-8"> // 32px padding

// Button padding - STANDARD
<Button className="px-4 py-2">  // 16px horizontal, 8px vertical

// Input padding - STANDARD
<Input className="px-3 py-2">   // 12px horizontal, 8px vertical
```

### Touch Target Standards (LOCKED)

**Minimum Touch Target:** 44px (iOS/Android standard)

```typescript
// ✅ Button height (meets touch target)
<Button className="h-10">Button</Button> // 40px + 4px border = 44px

// ✅ Icon button (meets touch target)
<Button variant="ghost" size="icon" className="h-10 w-10">
  <Settings className="h-5 w-5" />
</Button>

// ❌ WRONG - Too small for touch
<Button className="h-6">Tiny</Button> // Fails accessibility
```

**RULE:** All interactive elements MUST be minimum 44px touch target.

---

## 🛡️ Accessibility Standards - FINAL

### WCAG 2.1 AA Compliance (REQUIRED)

**Minimum Text Sizes:**
- Body text: 14px minimum (`text-sm`)
- Metadata: 12px minimum (`text-xs`)
- NO text below 12px

**Contrast Requirements:**
- Primary text on black: 21:1 (AAA) ✅
- Muted text on black: 4.5:1 (AA) ✅
- Gold on black: 10:1 (AAA) ✅

### Icon Accessibility (REQUIRED)

```typescript
// ✅ Decorative icon (with text label)
<Button>
  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
  Send Email
</Button>

// ✅ Icon-only button (requires aria-label)
<Button variant="ghost" size="icon" aria-label="Open settings">
  <Settings className="h-5 w-5" aria-hidden="true" />
</Button>

// ❌ WRONG - Missing aria-label
<Button variant="ghost" size="icon">
  <Settings className="h-5 w-5" />
</Button>
```

**RULE:** Icon-only buttons MUST have `aria-label`. Decorative icons MUST have `aria-hidden="true"`.

### Semantic HTML (REQUIRED)

```typescript
// ✅ CORRECT - Proper heading hierarchy
<h1 className="text-2xl font-bold">Page Title</h1>
<h2 className="text-xl font-semibold">Section</h2>
<h3 className="text-lg font-semibold">Subsection</h3>

// ❌ WRONG - div with heading styles
<div className="text-2xl font-bold">Not a heading</div>
```

**RULE:** Use semantic HTML (`<h1>`, `<button>`, `<nav>`, etc.) with styling classes, not divs.

---

## ✅ Component Standards Checklist

### For ALL New Components (REQUIRED)

- [ ] Uses Geist Sans font (`font-sans` or implicit)
- [ ] Uses Lucide React icons (NOT Radix)
- [ ] Uses semantic color classes (NO arbitrary colors)
- [ ] Uses standard typography scale (`text-sm`, `font-medium`, etc.)
- [ ] Has proper icon sizing (`h-4 w-4` default)
- [ ] Has Apple-inspired animation timing (400ms default)
- [ ] Meets 44px minimum touch target
- [ ] Has proper aria-labels for icon-only buttons
- [ ] Uses semantic HTML elements
- [ ] Has loading and error states
- [ ] Is mobile-responsive
- [ ] Supports reduced motion

### Design Review Triggers (APPROVAL REQUIRED)

- ❌ New icon outside standard set
- ❌ Custom animation duration/easing
- ❌ Arbitrary color values
- ❌ Custom font sizes outside scale
- ❌ Touch targets below 44px
- ❌ Text below 12px

---

## 📦 Implementation Quick Reference

### Standard Component Imports

```typescript
// Typography (always available via Tailwind)
<p className="text-sm font-medium text-foreground">

// Icons (Lucide React)
import { Heart, Bell, Search, Settings, Loader2 } from 'lucide-react';

// Animations (pre-built utilities)
className="hive-animate-flow-in"
className="transition-all duration-smooth ease-smooth"

// Colors (semantic classes)
className="bg-card border border-border text-foreground"
className="text-muted-foreground hover:text-foreground"
```

### Standard Patterns (Copy-Paste Ready)

**Button with Icon:**
```typescript
<Button className="text-sm font-medium">
  <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
  Send Email
</Button>
```

**Card Header:**
```typescript
<CardHeader className="space-y-1">
  <CardTitle className="text-lg font-semibold">
    Card Title
  </CardTitle>
  <CardDescription className="text-sm text-muted-foreground">
    Description text
  </CardDescription>
</CardHeader>
```

**Loading State:**
```typescript
<Button disabled={isLoading} className="text-sm font-medium">
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? "Loading..." : "Submit"}
</Button>
```

---

## 🚨 Common Violations & Fixes

### ❌ WRONG → ✅ CORRECT

**Typography:**
```typescript
// ❌ Wrong size
<Button className="text-base">Button</Button>
// ✅ Correct
<Button className="text-sm font-medium">Button</Button>

// ❌ Missing weight
<h3 className="text-lg">Heading</h3>
// ✅ Correct
<h3 className="text-lg font-semibold">Heading</h3>
```

**Icons:**
```typescript
// ❌ Wrong library
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
// ✅ Correct
import { Search } from "lucide-react";

// ❌ Wrong size
<Search className="h-3 w-4" />
// ✅ Correct
<Search className="h-4 w-4" />
```

**Animation:**
```typescript
// ❌ Too fast
className="transition-all duration-100"
// ✅ Correct
className="transition-all duration-smooth ease-smooth"

// ❌ Wrong easing
className="ease-in-out"
// ✅ Correct
className="ease-smooth"
```

**Colors:**
```typescript
// ❌ Arbitrary color
<p className="text-[#666666]">Text</p>
// ✅ Correct
<p className="text-muted-foreground">Text</p>
```

---

## 📚 Documentation References

- **Typography:** `/packages/ui/TYPOGRAPHY_GUIDE.md`
- **Icons:** `/packages/ui/ICON_USAGE_GUIDE.md`
- **Animation:** `/packages/ui/HIVE_ANIMATION_SYSTEM.md`
- **Design System:** `/packages/ui/DESIGN_SYSTEM.md`
- **Tailwind Config:** `/packages/tokens/tailwind.config.master.ts`
- **Theme Config:** `/packages/tokens/src/hive-theme.ts`

---

**🔒 This document is LOCKED. All deviations require design system approval.**

**Last Review:** 2025-10-02
**Next Review:** Q1 2025
