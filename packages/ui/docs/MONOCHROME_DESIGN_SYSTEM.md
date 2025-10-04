# HIVE Dark Monochrome Design System

## Philosophy

**Dark monochrome minimalism with strategic gold accents** creates a premium, tech-forward aesthetic optimized for OLED displays and nighttime campus scrolling.

### Core Principles

1. **True Black Foundation** - OLED-optimized #000000 backgrounds, power-efficient
2. **Gold Pops Against Dark** - #FFD700 accents are dramatic and visible on black
3. **Content Glows** - Photos, emojis, user content radiate against dark backgrounds
4. **Typographic Hierarchy** - Bold white headings, gray secondary text, high contrast
5. **Minimal Borders** - Subtle gray borders (8% opacity white) for definition without noise
6. **Breathing Room** - Generous spacing creates hierarchy without visual clutter

---

## Color Palette

### Dark Monochrome Base

```css
/* True Black (OLED optimized) */
--background: #000000;      /* Primary background, true black for OLED */
--surface: #0c0c0c;         /* Raised surfaces, cards, modals (hive-obsidian) */
--surface-elevated: #1a1a1a; /* Elevated cards, popovers */

/* Whites & Grays (from dark to light) */
--foreground: #ffffff;      /* Primary text, headings */
--foreground-secondary: #cccccc; /* Secondary text, descriptions */
--foreground-muted: #888888;     /* Tertiary text, metadata, timestamps */
--foreground-disabled: #555555;  /* Disabled states, placeholders */

/* Borders (subtle, minimal chrome) */
--border-default: #333333;  /* Default borders (20% white) */
--border-subtle: rgba(255, 255, 255, 0.08); /* Minimal borders (8% white) */
--border-input: rgba(255, 255, 255, 0.12);  /* Input borders (12% white) */
--border-hover: #ffffff;    /* Hover state borders (full white) */
```

### HIVE Gold (Strategic Use Only)

```css
/* Gold - HIVE Brand (Glows on dark) */
--gold: #FFD700;            /* Primary brand color - dramatic against black */
--gold-glow: rgba(255, 215, 0, 0.3);   /* Glowing borders, focus rings */
--gold-subtle: rgba(255, 215, 0, 0.1);  /* Backgrounds, very subtle highlights */
--gold-border: rgba(255, 215, 0, 0.5);  /* Borders for special elements */
```

### When to Use Gold

✅ **Approved Uses** (POPS against dark):
- Verification checkmarks (high visibility)
- Space Leader badges/icons (status indicator)
- HiveLab section borders (feature differentiation)
- Event indicators on calendar (attention)
- Primary CTAs (sparingly - reserved for high-intent actions)
- Star icons for leaders (hierarchy)
- Focus rings (accessibility + brand consistency)

❌ **Avoid**:
- Regular buttons (use white/gray borders)
- Body text (use white/gray for readability)
- Large background fills (only subtle 10% alpha max)
- Decorative elements without purpose

---

## Typography

### Font Stack

```css
/* System Font Stack - Fast, native */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
             'Fira Sans', 'Droid Sans', 'Helvetica Neue',
             sans-serif;
```

### Type Scale

```css
/* Headings */
--text-4xl: 2.25rem;  /* 36px - Profile name */
--text-3xl: 1.875rem; /* 30px - Section titles */
--text-2xl: 1.5rem;   /* 24px - Large stats */
--text-xl: 1.25rem;   /* 20px - Card headings */
--text-lg: 1.125rem;  /* 18px - Event titles */

/* Body */
--text-base: 1rem;    /* 16px - Bio, descriptions */
--text-sm: 0.875rem;  /* 14px - Labels, secondary */
--text-xs: 0.75rem;   /* 12px - Metadata, caps */
```

### Font Weights

```css
--font-bold: 700;     /* Headings, emphasis */
--font-semibold: 600; /* Subheadings, labels */
--font-medium: 500;   /* Button text */
--font-normal: 400;   /* Body text */
```

### Tracking (Letter Spacing)

```css
/* Use for uppercase labels */
.uppercase {
  text-transform: uppercase;
  letter-spacing: 0.05em;  /* tracking-wide */
}

/* Tight tracking for large headings */
.heading-tight {
  letter-spacing: -0.025em;
}
```

---

## Borders & Shadows

### Border System

```css
/* Primary Borders - Strong */
border: 2px solid black;  /* Default for cards, major containers */

/* Secondary Borders - Subtle */
border: 2px solid #E5E7EB;  /* gray-200 - default state */
border: 2px solid black;     /* Hover state */

/* Dashed Borders */
border: 2px dashed black;  /* CTAs like "Build New" */

/* Gold Borders (Special) */
border: 2px solid #FFD700;  /* HiveLab, special sections */
```

### Shadows

```css
/* Minimal Shadows - Mostly none */
box-shadow: none;  /* Default - rely on borders instead */

/* Subtle Shadow (rare use) */
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);  /* Photos, modals */

/* Strong Shadow (very rare) */
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);  /* Sticky carousel */
```

---

## Component Patterns

### Cards (Dark Theme)

```tsx
// Standard Card - Elevated surface on dark
<Card className="bg-[#0c0c0c] border border-white/8 shadow-none">
  {/* Content */}
</Card>

// Hover Card - Minimal borders, clean interaction
<Card className="bg-[#0c0c0c] border border-white/8 hover:border-white/50 transition-all duration-300">
  {/* Interactive content */}
</Card>

// Gold Accent Card (HiveLab) - Glows on dark
<Card className="bg-[#0c0c0c] border-2 border-[#FFD700]/50 bg-[#FFD700]/5">
  {/* Special content - gold glow effect */}
</Card>

// Clickable Card - Full white border on hover for emphasis
<Card className="bg-[#0c0c0c] border border-white/8 hover:border-white cursor-pointer transition-all">
  {/* Clickable content */}
</Card>
```

### Buttons (Dark Theme)

```tsx
// Primary - White on dark for maximum contrast
<Button className="bg-white text-black hover:bg-white/90 border border-white">
  Primary Action
</Button>

// Outline - Minimal border, inverts on hover
<Button variant="outline" className="border border-white/20 text-white hover:bg-white hover:text-black">
  Secondary Action
</Button>

// Gold Accent - Reserved for high-intent CTAs
<Button className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90 border border-[#FFD700]">
  Join Space
</Button>

// Ghost - Subtle hover, no border
<Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
  Tertiary
</Button>

// Destructive - Red on dark
<Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
  Delete
</Button>
```

### Badges (Dark Theme)

```tsx
// Gold Leader Badge - Glows on dark
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/50">
  <svg className="h-3.5 w-3.5" fill="#FFD700">{/* Star */}</svg>
  <span className="text-xs font-semibold text-white">Space Leader</span>
</div>

// Standard Badge - Minimal border
<Badge variant="outline" className="border-white/20 text-white">
  Label
</Badge>

// Verification Badge - Gold accent
<div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFD700]/10 border border-[#FFD700]/30">
  <svg className="h-3 w-3" fill="#FFD700">{/* Check */}</svg>
  <span className="text-xs font-medium text-[#FFD700]">Verified</span>
</div>
```

### Stats Display (Dark Theme)

```tsx
// Dark Monochrome Stats Grid
<div className="grid grid-cols-4 divide-x divide-white/10">
  <div className="text-center px-3">
    <p className="text-3xl font-bold text-white">234</p>
    <p className="text-xs text-white/60 uppercase tracking-wide">Connections</p>
  </div>
  {/* Repeat */}
</div>

// Stats with subtle background
<div className="bg-[#0c0c0c] border border-white/8 rounded-lg p-4">
  <p className="text-2xl font-bold text-white">1,234</p>
  <p className="text-sm text-white/70">Profile Views</p>
</div>
```

---

## Calendar Design System

### Color Coding

```tsx
// Today
className="bg-black text-white border-2 border-black"

// Event Day (Future)
className="bg-[#FFD700]/20 border border-[#FFD700]/50 text-black"

// Past Day
className="text-gray-400 border-gray-200"

// Regular Day
className="border-gray-200 hover:border-black text-black"
```

### Event Indicators

```tsx
// Dot Indicator (mini calendar)
<div className="w-1 h-1 bg-[#FFD700] rounded-full mx-auto mt-0.5" />

// Bar Indicator (large calendar)
<div className="w-full h-1 bg-[#FFD700] rounded-full" />
```

### Unified Schedule Pattern (Recommended)

**Calendar + Events in ONE Widget** - Events shown inline within calendar cells:

```tsx
// Calendar cell WITH inline event preview
<button className="aspect-square border-2 border-[#FFD700] bg-[#FFD700]/5 p-2">
  <p className="text-sm font-bold text-black">15</p>

  {/* Inline event previews */}
  <div className="space-y-1 mt-1">
    <div className="text-[10px]">
      <div className="flex items-center gap-0.5">
        <span className="text-[8px]">💻</span>
        <span className="font-semibold">6PM</span>
      </div>
      <p className="truncate font-medium text-gray-600">Hackathon</p>
    </div>
  </div>
</button>

// Today's detailed schedule below calendar
<div className="mt-6 border-t-2 border-black pt-6">
  <h4>Today's Schedule</h4>
  <div className="flex items-center gap-3 p-3 border-2 border-gray-200 hover:border-black">
    <div className="text-2xl">💻</div>
    <div className="flex-1">
      <p className="font-bold text-black">Hackathon Kickoff • 6:00 PM</p>
      <p className="text-xs text-gray-600">CSE Building</p>
    </div>
  </div>
</div>
```

**Why Unified?**
- Students see schedule at a glance (no scrolling between calendar and list)
- Events ARE the calendar, not separate
- Emoji + time + title visible directly in cells
- Gold borders highlight busy days
- Today expanded below for detail

### Event Cards (Legacy Pattern)

```tsx
<div className="flex gap-4 p-5 rounded-lg border-2 border-black hover:bg-gray-50">
  {/* Time block */}
  <div className="text-center min-w-[80px]">
    <p className="text-xs font-bold text-gray-600 uppercase">Tomorrow</p>
    <p className="text-2xl font-bold text-black">Oct 16</p>
    <p className="text-sm font-semibold text-gray-600">6:00 PM</p>
  </div>

  {/* Divider */}
  <div className="border-l-2 border-black" />

  {/* Content */}
  <div className="flex-1">
    <h4 className="text-lg font-bold text-black">Event Title</h4>
    {/* Details */}
  </div>
</div>
```

---

## Spacing System

### Padding Scale

```css
/* Cards */
p-4: 1rem (16px)     /* Compact cards */
p-6: 1.5rem (24px)   /* Standard cards */
p-8: 2rem (32px)     /* Large cards, modals */

/* Sections */
py-3: 0.75rem (12px) /* List items */
py-4: 1rem (16px)    /* Card sections */
py-6: 1.5rem (24px)  /* Major sections */
```

### Gap Scale

```css
/* Grids */
gap-1: 0.25rem (4px)   /* Calendar cells */
gap-2: 0.5rem (8px)    /* Tight grids */
gap-3: 0.75rem (12px)  /* Space cards */
gap-4: 1rem (16px)     /* Standard grid */
gap-6: 1.5rem (24px)   /* Content sections */
gap-8: 2rem (32px)     /* Major layout gaps */
```

---

## Hover & Interaction States (Dark Theme)

### Transitions

```css
/* Standard transition (Vercel-style smoothness) */
transition-all duration-300 ease-in-out

/* Smooth transition (slower, deliberate) */
transition-all duration-500 ease-out

/* Quick transition (micro-interactions) */
transition-all duration-150 ease-in-out
```

### Hover Effects

```tsx
// Card Hover - Border brighten + subtle lift
className="border border-white/8 hover:border-white/50 hover:bg-white/5 transition-all duration-300"

// Emoji/Icon Scale - Playful interaction
className="group-hover:scale-110 transition-transform duration-300"

// Photo Zoom - Subtle depth
className="group-hover:scale-105 transition-transform duration-700"

// Button Invert - High contrast flip
className="border border-white/20 text-white hover:bg-white hover:text-black transition-all"

// Gold Glow - Dramatic accent on hover
className="border border-white/8 hover:border-[#FFD700]/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.15)] transition-all"
```

---

## Responsive Breakpoints

```css
/* Mobile First */
base: 0px (default styles)

/* Tablet */
sm: 640px
md: 768px

/* Desktop */
lg: 1024px
xl: 1280px

/* Ultra Wide */
2xl: 1536px
```

### Common Patterns

```tsx
// Show on desktop only
className="hidden lg:flex"

// Stack on mobile, row on desktop
className="flex flex-col lg:flex-row"

// 2-col on tablet, 3-col on desktop
className="grid grid-cols-2 lg:grid-cols-3"

// Full width mobile, max-width desktop
className="w-full lg:max-w-7xl lg:mx-auto"
```

---

## Accessibility

### Contrast Ratios

- **Black on White**: 21:1 (AAA)
- **Gray-600 on White**: 7:1 (AA)
- **Gold on White**: 4.5:1 (AA minimum)
- **Gold on Black**: 3:1 (use white text instead)

### Focus States

```css
/* Default focus ring */
focus:ring-2 focus:ring-black focus:ring-offset-2

/* Gold focus (special cases) */
focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2
```

---

## Image Treatment

### Portrait Photos

```tsx
// Sharp monochrome frame
<div className="aspect-[3/4] rounded-2xl border-2 border-black overflow-hidden">
  <img className="h-full w-full object-cover grayscale-0" />
</div>
```

**Note**: Photos remain **full color** - the frame is monochrome, not the image. This creates visual pop.

### Emojis

- Use large emojis (text-2xl to text-4xl) for visual interest
- Emojis provide color in monochrome system
- Hover scale effect: `group-hover:scale-110`

---

## Layout Principles

### Grid Structure

```tsx
// Main profile layout
<div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8">
  {/* Carousel */}
  {/* Content */}
</div>
```

### Card Sizes

- **Full Width**: Identity, Calendar, Spaces, HiveLab
- **2-Column Split**: Stats + Completion, Activity + Events
- **3-Column Grid**: Spaces, Tools

### Sticky Behavior

```tsx
// Carousel sticky on desktop
className="lg:sticky lg:top-8"
```

---

## Component Checklist

When building a monochrome component:

- [ ] **Borders**: 2px black or gray-200
- [ ] **Shadows**: Avoid (use borders instead)
- [ ] **Text**: Black headings, gray-600 secondary
- [ ] **Hover**: Border color change + bg-gray-50
- [ ] **Gold**: Only for leaders, verification, special
- [ ] **Spacing**: Use 4/6/8 scale
- [ ] **Typography**: Bold headings, tracking on caps
- [ ] **Transitions**: 300ms standard
- [ ] **Responsive**: Mobile-first breakpoints

---

## Example Components

### Monochrome Event Card

```tsx
<div className="flex items-center gap-4 p-3 rounded-lg border-2 border-gray-200 hover:border-black transition-all cursor-pointer group">
  {/* Time */}
  <div className="text-center min-w-[60px]">
    <p className="text-xs font-semibold text-gray-600 uppercase">Tomorrow</p>
    <p className="text-lg font-bold text-black">6:00 PM</p>
  </div>

  {/* Divider */}
  <div className="border-l-2 border-black h-12" />

  {/* Content */}
  <div className="flex-1">
    <p className="font-semibold text-black group-hover:underline">Hackathon</p>
    <p className="text-xs text-gray-600">CSE Building • 45 attending</p>
  </div>

  {/* Action */}
  <Button variant="outline" className="border-black hover:bg-black hover:text-white">
    RSVP
  </Button>
</div>
```

### Monochrome Space Card

```tsx
<div className="p-4 rounded-lg border-2 border-gray-200 hover:border-black transition-all cursor-pointer group">
  {/* Emoji + Leader Badge */}
  <div className="flex items-center justify-between mb-3">
    <div className="text-4xl group-hover:scale-110 transition-transform">
      💻
    </div>
    <svg className="h-4 w-4" fill="#FFD700">{/* Star for leaders */}</svg>
  </div>

  {/* Info */}
  <p className="text-sm font-bold text-black mb-1">CS Study Group</p>
  <p className="text-xs text-gray-600">234 members</p>
</div>
```

---

## Migration from Color System

### Before (Color Gradients)

```tsx
<div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/10">
  {/* Stats card */}
</div>
```

### After (Monochrome)

```tsx
<div className="border-2 border-black">
  <p className="text-3xl font-bold text-black">234</p>
  <p className="text-xs text-gray-600 uppercase tracking-wide">Connections</p>
</div>
```

---

## Design Inspiration (2025 Dark Mode Excellence)

### Tech Platforms (Primary References)
- **Linear**: True black (#000), subtle borders (8-12% white), minimal chrome, buttery smooth animations
- **Arc Browser**: OLED-optimized dark, spatial UI, high contrast hierarchy
- **Vercel Dashboard**: Monochrome precision, gold/purple accents sparingly, fast interactions
- **Stripe Dashboard**: Clean data hierarchy, status colors that pop on dark

### Product Design
- **Apple OLED Interfaces**: True black for AMOLED, white text AAA contrast
- **Notion Dark Mode**: Clean grids, low-opacity dividers, content-first
- **GitHub Dark**: Syntax highlighting principles (strategic color on dark canvas)

### Aesthetic Principles
- **Brutalist Web Design**: Minimal decoration, strong hierarchy through type
- **Swiss Modernism**: Grid systems, whitespace (now "blackspace"), restraint

---

**Last Updated**: October 2024
**Version**: 2.0 Dark Monochrome
**Status**: Production-ready for HIVE vBETA (Dark theme canonical)
