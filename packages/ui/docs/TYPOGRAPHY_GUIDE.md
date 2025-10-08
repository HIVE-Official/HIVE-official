# 📝 HIVE Typography Guide

**Last Updated:** 2025-10-02
**Primary Font:** Geist Sans (Vercel)
**Monospace Font:** Geist Mono (Vercel)
**Design Philosophy:** Vercel Geist-inspired monochrome, high contrast, clean hierarchy

---

## 🎯 Font System

### ✅ **Primary: Geist Sans** (UI Text)

**Package:** `geist` (v1.5.1)
**Source:** Vercel's open-source font family
**Website:** https://vercel.com/font
**Character Set:** Latin, Latin Extended, Cyrillic
**License:** SIL Open Font License

```typescript
// Next.js font loader (apps/web/src/app/layout.tsx)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

<html className={`${GeistSans.variable} ${GeistMono.variable}`}>
  <body className={GeistSans.className}>
```

**Why Geist Sans?**
- ✅ Designed for optimal screen readability
- ✅ Clean, modern aesthetic (2024 standard)
- ✅ Variable font with 9 weights (100-900)
- ✅ Excellent legibility at small sizes
- ✅ Professional, technical feel (campus platform)
- ✅ Optimized for dark backgrounds

### ✅ **Monospace: Geist Mono** (Code & Technical)

**Usage:** Code snippets, technical data, monospace UI elements

```typescript
// Use font-mono utility class
<code className="font-mono text-sm">npm install @hive/ui</code>
<kbd className="font-mono text-xs">⌘K</kbd>
```

### 🔄 **Fallback Stack**

```css
/* Defined in tailwind.config.master.ts */
font-family: {
  sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  display: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
  mono: ['var(--font-geist-mono)', 'monospace'],
}
```

**Fallback Hierarchy:**
1. Geist Sans (loaded via Next.js)
2. system-ui (native OS font)
3. sans-serif (browser default)

---

## 📏 Typography Scale

### Size System (Tailwind Classes)

Based on usage analysis across 84 components:

| Class | Size | Line Height | Usage | Purpose |
|-------|------|-------------|-------|---------|
| `text-xs` | 12px | 16px | **202×** | Metadata, timestamps, labels, captions |
| `text-sm` | 14px | 20px | **164×** | Body text, descriptions, secondary content |
| `text-base` | 16px | 24px | **11×** | Primary body text, default size |
| `text-lg` | 18px | 28px | **14×** | Emphasized text, card titles |
| `text-xl` | 20px | 28px | **10×** | Section headings, component titles |
| `text-2xl` | 24px | 32px | **8×** | Page titles, major headings |
| `text-3xl` | 30px | 36px | **4×** | Hero text, landing pages |
| `text-4xl` | 36px | 40px | **3×** | Large hero text, marketing |

### Usage Recommendations

```typescript
// ✅ Most common pattern (text-sm for body, text-xs for metadata)
<div className="text-sm">
  <p>Primary content goes here</p>
  <span className="text-xs text-muted-foreground">2 hours ago</span>
</div>

// ✅ Card header pattern
<div>
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-sm text-muted-foreground">Card description</p>
</div>

// ✅ Page header pattern
<header>
  <h1 className="text-2xl font-bold">Page Title</h1>
  <p className="text-sm text-muted-foreground">Page subtitle</p>
</header>
```

---

## ⚖️ Font Weight System

Based on usage analysis:

| Class | Weight | Usage | Purpose |
|-------|--------|-------|---------|
| `font-normal` | 400 | **3×** | Rarely used (body text defaults to normal) |
| `font-medium` | 500 | **82×** | Primary emphasis, button text, labels |
| `font-semibold` | 600 | **73×** | Headings, important UI elements |
| `font-bold` | 700 | **24×** | Strong emphasis, key metrics |

### Weight Hierarchy

```typescript
// Default (no class needed)
<p>Body text is font-normal (400) by default</p>

// Emphasis levels
<span className="font-medium">Important label</span>      // 500 - Most common
<h3 className="font-semibold">Section heading</h3>        // 600 - Headings
<h1 className="font-bold">Page title</h1>                 // 700 - Titles
```

### Common Patterns

```typescript
// ✅ Button text (most common)
<Button className="text-sm font-medium">
  Click me
</Button>

// ✅ Card header
<div>
  <h3 className="text-lg font-semibold">Card Title</h3>
  <p className="text-sm font-normal">Description text</p>
</div>

// ✅ Stat display
<div>
  <p className="text-3xl font-bold">1,234</p>
  <p className="text-xs font-medium text-muted-foreground">Total Members</p>
</div>

// ✅ Form labels
<label className="text-sm font-medium">
  Email Address
</label>
<input className="text-sm font-normal" />
```

---

## 🎨 Typography + Color Combinations

### Text Color System (Semantic)

```typescript
// Primary text (default)
<p className="text-foreground">Primary readable content</p>

// Secondary/muted text (most common for metadata)
<span className="text-muted-foreground">Secondary information</span>

// Interactive/accent text
<a className="text-primary hover:underline">Link text</a>

// Destructive/error text
<p className="text-destructive">Error message</p>

// HIVE gold accent (selective use)
<span className="text-hive-gold">Special highlight</span>
```

### Common Combinations

```typescript
// ✅ Metadata pattern (used 200+ times)
<span className="text-xs text-muted-foreground">
  Posted 2 hours ago
</span>

// ✅ Button variants
<Button variant="default" className="text-sm font-medium text-primary-foreground">
  Primary Action
</Button>

<Button variant="ghost" className="text-sm font-medium text-muted-foreground">
  Secondary Action
</Button>

// ✅ Card content hierarchy
<div className="space-y-2">
  <h3 className="text-lg font-semibold text-foreground">Title</h3>
  <p className="text-sm text-foreground">Main content</p>
  <span className="text-xs text-muted-foreground">Metadata</span>
</div>
```

---

## 📐 Line Height & Spacing

### Line Height System

Tailwind's default line heights are optimized for Geist Sans:

```typescript
// Tight (headings, single-line text)
<h1 className="text-2xl font-bold leading-tight">Page Title</h1>

// Normal (default, body text)
<p className="text-sm leading-normal">Body paragraph text...</p>

// Relaxed (long-form content)
<article className="text-base leading-relaxed">
  Long article content...
</article>
```

### Spacing Patterns

```typescript
// ✅ Vertical rhythm (space-y-*)
<div className="space-y-1">      {/* 4px - Tight grouping */}
<div className="space-y-2">      {/* 8px - Related items */}
<div className="space-y-4">      {/* 16px - Section spacing */}
<div className="space-y-6">      {/* 24px - Component spacing */}

// ✅ Common pattern: Card with hierarchy
<div className="space-y-4">
  <div className="space-y-1">
    <h3 className="text-lg font-semibold">Card Title</h3>
    <p className="text-xs text-muted-foreground">Subtitle</p>
  </div>
  <p className="text-sm">Card content paragraph...</p>
</div>
```

---

## 🎯 Component-Specific Typography

### Buttons

```typescript
// Default button text
<Button className="text-sm font-medium">
  Default Button
</Button>

// Small button
<Button size="sm" className="text-xs font-medium">
  Small Button
</Button>

// Large button
<Button size="lg" className="text-base font-medium">
  Large Button
</Button>
```

### Form Elements

```typescript
// Label + Input pattern
<div className="space-y-2">
  <Label className="text-sm font-medium">Email Address</Label>
  <Input
    placeholder="Enter email"
    className="text-sm font-normal"
  />
  <p className="text-xs text-muted-foreground">Helper text</p>
</div>
```

### Cards

```typescript
// Standard card pattern
<Card>
  <CardHeader className="space-y-1">
    <CardTitle className="text-lg font-semibold">
      Card Title
    </CardTitle>
    <CardDescription className="text-sm text-muted-foreground">
      Card description
    </CardDescription>
  </CardHeader>
  <CardContent className="text-sm">
    Card content text...
  </CardContent>
  <CardFooter className="text-xs text-muted-foreground">
    Footer metadata
  </CardFooter>
</Card>
```

### Navigation

```typescript
// Nav links
<nav>
  <a className="text-sm font-medium text-foreground hover:text-primary">
    Dashboard
  </a>
  <a className="text-sm font-medium text-muted-foreground hover:text-foreground">
    Settings
  </a>
</nav>
```

### Tables

```typescript
// Table typography
<Table>
  <TableHeader>
    <TableRow>
      <TableHead className="text-xs font-medium">Name</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="text-sm font-normal">John Doe</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## 🔧 Typography Utilities

### Text Truncation

```typescript
// Single line truncate (ellipsis)
<p className="text-sm truncate">
  Very long text that will be cut off with...
</p>

// Multi-line truncate (line-clamp)
<p className="text-sm line-clamp-2">
  Text that will be truncated after 2 lines with ellipsis...
</p>

// Common line clamps
className="line-clamp-1"  // Single line
className="line-clamp-2"  // 2 lines (most common)
className="line-clamp-3"  // 3 lines
```

### Text Alignment

```typescript
// Horizontal alignment
<p className="text-left">Left aligned (default)</p>
<p className="text-center">Centered text</p>
<p className="text-right">Right aligned</p>

// Vertical alignment (inline elements)
<span className="align-top">Top</span>
<span className="align-middle">Middle</span>
<span className="align-bottom">Bottom</span>
```

### Text Transform

```typescript
// Case transformations
<p className="uppercase">UPPERCASE TEXT</p>
<p className="lowercase">lowercase text</p>
<p className="capitalize">Capitalize Each Word</p>
<p className="normal-case">Normal case</p>
```

### Text Decoration

```typescript
// Underlines (for links)
<a className="underline hover:no-underline">Underlined Link</a>
<a className="no-underline hover:underline">Hover Underline</a>

// Line through (for discounts, removed items)
<span className="line-through text-muted-foreground">$99.99</span>
```

---

## ♿ Accessibility Best Practices

### Minimum Size Requirements (WCAG 2.1 AA)

```typescript
// ✅ Good - 14px minimum for body text
<p className="text-sm">Body text (14px)</p>

// ⚠️ Acceptable - 12px for metadata only
<span className="text-xs text-muted-foreground">Metadata (12px)</span>

// ❌ Avoid - Below 12px fails WCAG
<span className="text-[10px]">Too small!</span>
```

### Contrast Requirements

```typescript
// ✅ Good - High contrast on dark background
<p className="text-foreground">White text on black (#FFFFFF on #000000)</p>

// ✅ Good - Muted but still meets AA contrast
<span className="text-muted-foreground">Gray text (#A3A3A3 on #000000)</span>

// ⚠️ Check contrast - Gold accent
<span className="text-hive-gold">Gold text (#FFD700 on #000000)</span>
```

### Screen Reader Optimization

```typescript
// Semantic heading hierarchy
<h1 className="text-2xl font-bold">Page Title (H1)</h1>
<h2 className="text-xl font-semibold">Section Title (H2)</h2>
<h3 className="text-lg font-semibold">Subsection Title (H3)</h3>

// ✅ Always use semantic HTML with styling classes
// ❌ Never use <div> with heading classes only
```

---

## 📱 Responsive Typography

### Mobile-First Approach

```typescript
// ✅ Base size for mobile, larger on desktop
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>

// ✅ Adjust font size and line height together
<p className="text-sm md:text-base leading-normal md:leading-relaxed">
  Responsive body text
</p>

// ✅ Common responsive patterns
className="text-xs sm:text-sm"         // Metadata
className="text-sm md:text-base"       // Body text
className="text-lg md:text-xl"         // Card titles
className="text-xl md:text-2xl"        // Section headings
className="text-2xl md:text-3xl"       // Page titles
```

### Breakpoints

```typescript
// Tailwind breakpoints (defined in config)
sm:   640px   // Small tablets
md:   768px   // Tablets
lg:   1024px  // Desktops
xl:   1280px  // Large desktops
2xl:  1536px  // Extra large
```

---

## 🎨 HIVE-Specific Patterns

### Campus Social Platform Typography

```typescript
// Post card pattern (Feed)
<div className="space-y-3">
  {/* Author info */}
  <div className="flex items-center gap-2">
    <span className="text-sm font-semibold">Sarah Chen</span>
    <span className="text-xs text-muted-foreground">@sarahc</span>
  </div>

  {/* Post content */}
  <p className="text-sm leading-relaxed">Post text content...</p>

  {/* Engagement metadata */}
  <div className="flex gap-4 text-xs text-muted-foreground">
    <span>2 hours ago</span>
    <span>12 likes</span>
    <span>3 comments</span>
  </div>
</div>

// Profile header pattern
<div className="space-y-2">
  <h1 className="text-2xl font-bold">Sarah Chen</h1>
  <p className="text-sm text-muted-foreground">@sarahc</p>
  <p className="text-sm">CS Major, Class of 2025</p>
  <div className="flex gap-4 text-xs text-muted-foreground">
    <span>234 connections</span>
    <span>12 spaces</span>
  </div>
</div>

// Space card pattern
<div className="space-y-2">
  <h3 className="text-lg font-semibold">CS Study Group</h3>
  <p className="text-sm text-muted-foreground line-clamp-2">
    Description of the space...
  </p>
  <div className="flex gap-2 text-xs text-muted-foreground">
    <span>234 members</span>
    <span>•</span>
    <span>Active</span>
  </div>
</div>
```

### Stats & Metrics Pattern

```typescript
// Metric card (common in dashboards)
<div className="space-y-1">
  <p className="text-3xl font-bold">1,234</p>
  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
    Total Members
  </p>
</div>

// Inline stat
<span className="text-sm">
  <span className="font-semibold">234</span>
  <span className="text-muted-foreground"> members</span>
</span>
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Wrong Patterns

```typescript
// ❌ Inconsistent sizing
<Button className="text-base">Button</Button>  // Should be text-sm

// ❌ Missing font weight on headings
<h3 className="text-lg">Heading</h3>  // Should be font-semibold

// ❌ Too small for body text
<p className="text-xs">Body paragraph...</p>  // Should be text-sm

// ❌ Mixing font families
<p className="font-serif">Text</p>  // No serif defined, stick to sans

// ❌ Arbitrary values instead of scale
<p className="text-[15px]">Text</p>  // Use text-sm or text-base

// ❌ Using color classes for semantic meaning only
<p className="text-red-500">Error</p>  // Use text-destructive
```

### ✅ Correct Patterns

```typescript
// ✅ Use scale consistently
<Button className="text-sm font-medium">Button</Button>

// ✅ Headings always have weight
<h3 className="text-lg font-semibold">Heading</h3>

// ✅ Body text minimum 14px
<p className="text-sm">Body paragraph...</p>

// ✅ Stick to defined font families
<p className="font-sans">Text</p>

// ✅ Use scale values
<p className="text-sm">Text</p>

// ✅ Use semantic colors
<p className="text-destructive">Error</p>
```

---

## 📊 Typography Audit Results

Based on analysis of 84 active components:

### Size Distribution
```
text-xs:    202 uses (49%)  ████████████████████████  Metadata/labels
text-sm:    164 uses (40%)  ████████████████████      Body text
text-base:   11 uses (3%)   ███                       Default size
text-lg:     14 uses (3%)   ███                       Card titles
text-xl+:    21 uses (5%)   █████                     Headings
```

### Weight Distribution
```
font-medium:    82 uses (45%)  ████████████████████████  Primary emphasis
font-semibold:  73 uses (40%)  ████████████████████      Headings
font-bold:      24 uses (13%)  ███████                   Titles/metrics
font-normal:     3 uses (2%)   ██                        Explicit only
```

### Key Insights
- **text-sm (14px) is the platform default** for body content
- **text-xs (12px) dominates** for metadata, timestamps, labels
- **font-medium (500) is most common** for emphasis and buttons
- **font-semibold (600) standard** for all heading levels
- **High consistency** across components (good!)

---

## 🔗 Resources

### Documentation
- **Geist Font:** https://vercel.com/font
- **Tailwind Typography:** https://tailwindcss.com/docs/font-family
- **WCAG Contrast:** https://webaim.org/resources/contrastchecker/

### Design Tokens Location
```
packages/tokens/tailwind.config.master.ts  # Font family definitions
packages/ui/src/styles.css                 # Global typography styles
apps/web/src/app/layout.tsx                # Font loader (Next.js)
```

### Installation
```bash
# Already installed in web app
pnpm add geist  # v1.5.1
```

### Import Pattern (Next.js)
```typescript
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
```

---

## ✨ Quick Reference Card

### Standard Component Typography

| Element | Size | Weight | Example |
|---------|------|--------|---------|
| **Button** | `text-sm` | `font-medium` | `<Button className="text-sm font-medium">` |
| **Card Title** | `text-lg` | `font-semibold` | `<CardTitle className="text-lg font-semibold">` |
| **Body Text** | `text-sm` | `font-normal` | `<p className="text-sm">` |
| **Metadata** | `text-xs` | `font-normal` | `<span className="text-xs text-muted-foreground">` |
| **Page Title** | `text-2xl` | `font-bold` | `<h1 className="text-2xl font-bold">` |
| **Section Heading** | `text-xl` | `font-semibold` | `<h2 className="text-xl font-semibold">` |
| **Label** | `text-sm` | `font-medium` | `<Label className="text-sm font-medium">` |
| **Link** | `text-sm` | `font-medium` | `<a className="text-sm font-medium hover:underline">` |

### Standard Color Combinations

| Context | Text Color |
|---------|-----------|
| **Primary Text** | `text-foreground` |
| **Secondary Text** | `text-muted-foreground` |
| **Interactive** | `text-primary` |
| **Error** | `text-destructive` |
| **Success** | `text-green-600` |
| **Accent** | `text-hive-gold` |

---

**🎯 Summary: Use Geist Sans with text-sm (14px) default, font-medium for emphasis, font-semibold for headings.**

*For questions or font requests, check https://vercel.com/font or ask in #hive-design-system*
