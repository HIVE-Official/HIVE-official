# HIVE Design System Documentation

**Version:** 2.0 (shadcn/ui Foundation)
**Last Updated:** 2025-10-01
**Status:** ✅ Production Ready

---

## 📐 Design Philosophy

### Vercel Geist-Inspired Minimalism (2025)

**Core Principle:** "If Vercel and Linear designed a campus social app"

#### Five Design Pillars

1. **Speed as Design** - Instant transitions, zero friction, < 3s page loads
2. **Monochromatic Foundation** - True black (#000) + grayscale + single strategic accent (gold)
3. **Information Density** - Show more content, decorate less
4. **OLED Optimization** - Pure black (#000) for battery efficiency
5. **Selective Color** - Reserve color for meaning, not decoration

### Why This Approach?

- **Campus WiFi Reality:** Minimal chrome = faster loads on spotty connections
- **Mobile-First:** 80% of usage on phones - OLED black saves battery
- **Content Focus:** Social platform thrives on content, not UI decoration
- **Professional Yet Social:** Tech-grade clarity + campus warmth

---

## 🎨 Color System

### Foundation Colors

```css
/* True Black Foundation (OLED Optimized) */
--background: #000000;           /* Primary background */
--foreground: #FFFFFF;           /* Primary text */

/* Grayscale Surfaces (Subtle Elevation) */
--card: #171717;                 /* Cards, elevated surfaces */
--secondary: #262626;            /* Secondary backgrounds */
--muted: #262626;                /* Muted content areas */

/* Text Hierarchy */
--foreground: #FFFFFF;           /* Primary text (highest contrast) */
--muted-foreground: #A3A3A3;    /* Secondary text, labels */
```

### Brand Accent (Selective Use Only)

```css
/* Gold - Reserve for Calls-to-Action, Focus States */
--primary: #FFD700;              /* Gold accent */
--primary-foreground: #000000;   /* Text on gold (black for contrast) */
--ring: #FFD700;                 /* Focus ring color */
```

**When to Use Gold:**
- ✅ Primary CTA buttons
- ✅ Focus indicators (accessibility requirement)
- ✅ Active navigation states
- ✅ Interactive highlights (hover states on key elements)
- ❌ Decorative elements
- ❌ Every button
- ❌ Borders or dividers

### Status Colors

```css
/* Semantic Status (Use Sparingly) */
--destructive: #FF3737;          /* Errors, destructive actions */
--success: #00D46A;              /* Success states */
--warning: #FFB800;              /* Warnings */
```

### Borders & Overlays

```css
/* Minimal Borders (Vercel Geist Principle) */
--border: rgba(255, 255, 255, 0.08);   /* Default subtle borders */
--input: rgba(255, 255, 255, 0.12);    /* Input borders (slightly stronger) */

/* Consistent Radius */
--radius: 0.5rem;                /* 8px - consistent across all components */
```

---

## 🔤 Typography

### Font Family

```css
/* Geist Sans (UI) - Vercel's design system font */
font-family: var(--hive-font-family-sans, 'Geist Sans', system-ui, sans-serif);
```

### Type Scale

| Size | Class | Usage | Example |
|------|-------|-------|---------|
| 2xl | `text-2xl` | Page titles | Profile name |
| xl | `text-xl` | Section headers | "Your Spaces" |
| lg | `text-lg` | Card titles | Space card title |
| base | `text-base` | Body text | Post content |
| sm | `text-sm` | Secondary info | Timestamps, metadata |
| xs | `text-xs` | Labels, captions | "2 min ago" |

### Font Weights

- **semibold (600):** Titles, emphasis
- **medium (500):** Interactive elements, buttons
- **normal (400):** Body text, default

---

## 🧩 Component Library

### Architecture Overview

```
shadcn/ui primitives → HIVE wrappers → Application
     (base)         (brand + features)   (usage)
```

**Two Layers:**

1. **shadcn/ui Components** (`src/atomic/atoms/`) - Base accessible primitives
2. **HIVE Wrappers** - Brand-specific enhancements with HIVE features

### Core Components (shadcn/ui)

#### Button

**Location:** `src/atomic/atoms/button.tsx`

**Variants:**
```tsx
import { Button } from '@hive/ui';

// Gold primary (CTA)
<Button variant="default">Join Space</Button>

// Destructive
<Button variant="destructive">Delete Post</Button>

// Outline (most common for secondary actions)
<Button variant="outline">Cancel</Button>

// Secondary (subtle background)
<Button variant="secondary">Edit Profile</Button>

// Ghost (no background)
<Button variant="ghost">Show More</Button>

// Link (text-only)
<Button variant="link">Learn More</Button>
```

**Sizes:**
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

#### Card

**Location:** `src/atomic/atoms/card.tsx`

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@hive/ui';

<Card>
  <CardHeader>
    <CardTitle>Space Name</CardTitle>
    <CardDescription>123 members</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    {/* Actions */}
  </CardFooter>
</Card>
```

#### Input

**Location:** `src/atomic/atoms/input.tsx`

```tsx
import { Input } from '@hive/ui';

<Input
  type="text"
  placeholder="Search spaces..."
  className="bg-background"
/>
```

#### Avatar

**Location:** `src/atomic/atoms/avatar.tsx`

**Compound Component Pattern:**
```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@hive/ui';

<Avatar className="h-10 w-10">
  <AvatarImage src={user.avatarUrl} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

**Simple Wrapper (Convenience):**
```tsx
import { SimpleAvatar } from '@hive/ui';

<SimpleAvatar
  src={user.avatarUrl}
  fallback="JD"
  size="md"  // sm, md, lg, xl
/>
```

#### Dialog (Modal)

**Location:** `src/atomic/atoms/dialog.tsx`

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@hive/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
    <DialogFooter>
      <Button>Save</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### Select (Dropdown)

**Location:** `src/atomic/atoms/select.tsx`

```tsx
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@hive/ui';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### Other Core Components

- **Alert** - System messages, notifications
- **Badge** - Status indicators, tags
- **Checkbox** - Boolean inputs
- **Command** - Command palette, search
- **Label** - Form labels
- **Progress** - Loading indicators
- **Skeleton** - Loading placeholders
- **Slider** - Range inputs
- **Switch** - Toggle controls
- **Tabs** - Navigation tabs
- **Textarea** - Multi-line text input

**Full API:** See individual component files in `src/atomic/atoms/`

---

### HIVE-Specific Wrappers

#### HiveButton

**Location:** `src/atomic/atoms/hive-button.tsx`

**Additional Features:**
- Loading state with spinner
- Left/right icon support
- Brand gradient variant

```tsx
import { HiveButton } from '@hive/ui';

// Brand gradient (gold accent)
<HiveButton variant="brand">Join HIVE</HiveButton>

// With loading state
<HiveButton loading={isLoading}>Submit</HiveButton>

// With icons
<HiveButton
  leftIcon={<Icon />}
  rightIcon={<Icon />}
>
  Action
</HiveButton>

// Success/Warning variants
<HiveButton variant="success">Approved</HiveButton>
<HiveButton variant="warning">Pending Review</HiveButton>

// XL size (not in base Button)
<HiveButton size="xl">Large CTA</HiveButton>
```

#### HiveCard

**Location:** `src/atomic/atoms/hive-card.tsx`

**Additional Variants:**
```tsx
import { HiveCard } from '@hive/ui';

// Glassmorphism effect
<HiveCard variant="glass">Content</HiveCard>

// Brand gradient border
<HiveCard variant="brand">Content</HiveCard>

// Elevated shadow
<HiveCard variant="elevated">Content</HiveCard>

// Interactive (hover states)
<HiveCard variant="interactive">Content</HiveCard>
```

#### HiveInput

**Location:** `src/atomic/atoms/hive-input.tsx`

**Additional Features:**
- Integrated label + helper text
- Error state handling
- HIVE-specific styling variants

```tsx
import { HiveInput } from '@hive/ui';

<HiveInput
  label="Email Address"
  helperText="Use your @buffalo.edu email"
  error={errors.email}
  variant="default"  // default, destructive, success, brand, ghost
/>
```

#### HiveProgress

**Location:** `src/atomic/atoms/hive-progress.tsx`

**Additional Features:**
- Label + percentage display
- Gradient variants
- Indeterminate state

```tsx
import { HiveProgress } from '@hive/ui';

<HiveProgress
  value={75}
  max={100}
  showLabel
  showPercentage
  label="Profile Completion"
  gradient="hive"  // Gold gradient
/>

// Indeterminate loading
<HiveProgress indeterminate />
```

---

## 🎯 Usage Guidelines

### When to Use shadcn vs HIVE Wrappers

**Use shadcn Base Components When:**
- ✅ Building new features quickly
- ✅ You need standard web patterns
- ✅ Accessibility is critical (Radix UI primitives)
- ✅ You want minimal styling

**Use HIVE Wrappers When:**
- ✅ You need brand-specific features (gold gradients, glass effects)
- ✅ You want integrated label/error handling (HiveInput)
- ✅ You need loading states (HiveButton)
- ✅ Building campus-specific UI patterns

### Component Composition Pattern

**Good - Compose from shadcn:**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@hive/ui';

function SpaceCard({ space }) {
  return (
    <Card className="hover:border-primary/40 transition-colors">
      <CardHeader>
        <CardTitle>{space.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {space.description}
      </CardContent>
    </Card>
  );
}
```

**Avoid - Don't recreate primitives:**
```tsx
// ❌ Don't do this - use shadcn Card instead
function CustomCard({ children }) {
  return <div className="rounded-lg border bg-card">{children}</div>;
}
```

---

## 🎨 CSS Variables Reference

### Design Tokens

All variables defined in `packages/tokens/hive-tokens-generated.css`

**Backgrounds:**
```css
--hive-background-primary: #000000
--hive-background-secondary: #171717
--hive-background-tertiary: #262626
--hive-background-interactive: #404040
```

**Text:**
```css
--hive-text-primary: #FFFFFF
--hive-text-secondary: #D4D4D4
--hive-text-tertiary: #A3A3A3
--hive-text-disabled: #525252
```

**Brand:**
```css
--hive-brand-primary: #FFD700
--hive-brand-secondary: #FFD700
--hive-interactive-focus: #FFD700
```

**Usage in Components:**
```tsx
<div className="bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]">
  Content
</div>
```

---

## ♿ Accessibility

### Focus States

All interactive elements have **2px gold focus rings** (WCAG 2.2 compliant):

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Keyboard Navigation

- ✅ All buttons, links, inputs support keyboard focus
- ✅ Dialog/Modal traps focus
- ✅ Skip navigation links available
- ✅ ARIA labels on icon-only buttons

### Color Contrast

- ✅ **#FFFFFF on #000000** = 21:1 (exceeds WCAG AAA)
- ✅ **#FFD700 on #000000** = 13.27:1 (exceeds WCAG AAA)
- ✅ All status colors tested for minimum 4.5:1 contrast

---

## 🚀 Getting Started

### Installation

Components are in the `@hive/ui` package:

```tsx
import { Button, Card, Input } from '@hive/ui';
import { HiveButton, HiveCard } from '@hive/ui';
```

### Example: Building a Space Card

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback
} from '@hive/ui';

export function SpaceCard({ space }) {
  return (
    <Card className="hover:border-primary/20 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={space.logoUrl} />
            <AvatarFallback>{space.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{space.name}</CardTitle>
            <CardDescription>{space.memberCount} members</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {space.description}
        </p>

        <div className="flex gap-2 mt-3">
          {space.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">Join Space</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## 📦 Component Inventory

**Total Components:** 137

**Category A (shadcn replacements):** 17
- Alert, Avatar, Badge, Button, Card, Checkbox, Command, Dialog, Input, Label, Progress, Select, Skeleton, Slider, Switch, Tabs, Textarea

**Category B (HIVE wrappers):** 8
- HiveButton, HiveCard, HiveConfirmModal, HiveInput, HiveModal, HiveProgress, InputEnhanced, TextareaEnhanced

**Category C (Keep as-is):** 111+
- All molecules, organisms, templates in `src/atomic/`

**Full Export List:** `src/atomic/atoms/index.ts`

---

## 🔄 Migration Notes

### From v1.0 to v2.0 (shadcn foundation)

**Breaking Changes:** None - all exports maintained

**New Exports Added:**
- AlertTitle, AlertDescription
- AvatarImage, AvatarFallback
- CardHeader, CardFooter, CardTitle, CardDescription, CardContent
- DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger
- SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton
- TabsList, TabsTrigger, TabsContent
- CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator

**Component Composition Pattern Changed:**

**Before (v1.0):**
```tsx
<Card>
  <div className="card-header">Title</div>
</Card>
```

**After (v2.0):**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

---

## 📚 Additional Resources

- **Vercel Geist:** https://vercel.com/geist/introduction
- **shadcn/ui:** https://ui.shadcn.com
- **Radix UI:** https://www.radix-ui.com
- **Linear Design:** https://linear.app/blog/how-we-redesigned-the-linear-ui
- **Design Inspiration Doc:** `DESIGN_INSPIRATION_2025.md`

---

## 🤝 Contributing

When adding new components:

1. **Start with shadcn:** Check if shadcn/ui has a base primitive
2. **Compose, Don't Recreate:** Build on shadcn components
3. **Use Design Tokens:** Always use CSS variables from `--hive-*` or shadcn vars
4. **Document:** Add to this file with usage examples
5. **Accessibility First:** Test keyboard nav + screen readers

---

**Last Updated:** 2025-10-01
**Maintainers:** HIVE UI Team
**Questions?** Check CLAUDE.md for development guidelines
