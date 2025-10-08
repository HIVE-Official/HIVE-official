# HIVE Tech-Sleek Branding Guide

## Core Color Trinity

### Primary Palette
```css
--hive-gold:   #FFD700  /* Pure Gold - Premium & Achievement */
--hive-black:  #000000  /* True Black - Depth & Sophistication */
--hive-white:  #FFFFFF  /* Pure White - Clarity & Space */
```

## The Psychology of Gold + Black + White

### Why This Works for HIVE

**Gold (#FFD700)**:
- Signals premium quality without being ostentatious
- Represents achievement and success (think graduation honors)
- Creates warmth in an otherwise stark palette
- High visibility for CTAs and important UI elements

**Black (#000000)**:
- Provides infinite depth for layered interfaces
- Reduces eye strain during late-night study sessions
- Creates dramatic contrast with gold accents
- Conveys technical sophistication

**White (#FFFFFF)**:
- Ensures maximum readability for text
- Creates breathing room in dense interfaces
- Provides clean contrast against black
- Signals clarity and precision

## Technical Color System

### Extended Palette (Derived from Core)

```css
/* Gold Variations */
--hive-gold-100: #FFF9E6  /* Whisper - Subtle highlights */
--hive-gold-200: #FFECB3  /* Soft - Hover states */
--hive-gold-300: #FFE082  /* Light - Secondary accents */
--hive-gold-400: #FFD700  /* PRIMARY GOLD */
--hive-gold-500: #FFC107  /* Deep - Active states */
--hive-gold-600: #FFB300  /* Rich - Emphasis */

/* Black Variations (Using opacity) */
--hive-black-100: rgba(0,0,0,0.05)   /* Mist - Subtle backgrounds */
--hive-black-200: rgba(0,0,0,0.10)   /* Smoke - Dividers */
--hive-black-300: rgba(0,0,0,0.20)   /* Shadow - Borders */
--hive-black-400: rgba(0,0,0,0.40)   /* Graphite - Disabled text */
--hive-black-600: rgba(0,0,0,0.60)   /* Charcoal - Secondary text */
--hive-black-800: rgba(0,0,0,0.80)   /* Obsidian - Body text */
--hive-black-900: rgba(0,0,0,1.00)   /* TRUE BLACK */

/* White Variations (For dark backgrounds) */
--hive-white-100: rgba(255,255,255,0.05)  /* Ghost - Subtle overlays */
--hive-white-200: rgba(255,255,255,0.10)  /* Frost - Interactive hover */
--hive-white-300: rgba(255,255,255,0.20)  /* Mist - Borders on black */
--hive-white-600: rgba(255,255,255,0.60)  /* Cloud - Secondary text */
--hive-white-800: rgba(255,255,255,0.80)  /* Snow - Body text */
--hive-white-900: rgba(255,255,255,1.00)  /* TRUE WHITE */
```

## Application Patterns

### 1. Primary Actions (Maximum Impact)
```css
.hive-primary-button {
  background: linear-gradient(135deg, #FFD700, #FFC107);
  color: #000000;
  border: 1px solid #FFD700;
  box-shadow: 0 4px 14px rgba(255, 215, 0, 0.25);
}

.hive-primary-button:hover {
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
  transform: translateY(-2px);
}
```

### 2. Interactive Elements (Subtle Luxury)
```css
.hive-card {
  background: #000000;
  border: 1px solid rgba(255, 215, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hive-card:hover {
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.1);
}
```

### 3. Text Hierarchy (Crystal Clear)
```css
/* On Black Background */
.hive-heading-1 {
  color: #FFFFFF;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hive-heading-2 {
  color: #FFD700;  /* Gold for section headers */
  font-weight: 600;
}

.hive-body {
  color: rgba(255, 255, 255, 0.87);
  font-weight: 400;
}

.hive-caption {
  color: rgba(255, 255, 255, 0.60);
  font-weight: 400;
}
```

## UI Component Patterns

### Navigation (Sleek & Minimal)
```
┌────────────────────────────────────────────────┐
│ ■ HIVE                              ○○○  —□✕   │  <- Black bar, gold logo
├────────────────────────────────────────────────┤
│                                                 │
│  Feed   Spaces   Tools   Profile               │  <- White text, gold active
│  ____                                          │  <- Gold underline
└────────────────────────────────────────────────┘
```

### Cards (Floating Luxury)
```
Black Background
  ┌─────────────────────────┐
  │                         │ <- Subtle gold border on hover
  │  White Title Text       │
  │  Gray body text with    │
  │  important Gold accents │
  │                         │
  │  [Gold CTA Button]      │
  └─────────────────────────┘
```

### Status Indicators
```css
.status-active  { color: #FFD700; }  /* Gold = Active/Premium */
.status-default { color: #FFFFFF; }  /* White = Normal */
.status-muted   { color: rgba(255,255,255,0.4); }  /* Dimmed = Inactive */
```

## Gradient Systems

### Premium Gradients
```css
/* Gold Shine (For premium features) */
.gold-shine {
  background: linear-gradient(
    135deg,
    #FFD700 0%,
    #FFED4E 50%,
    #FFD700 100%
  );
}

/* Black Fade (For depth) */
.black-fade {
  background: linear-gradient(
    180deg,
    rgba(0,0,0,0) 0%,
    rgba(0,0,0,0.8) 100%
  );
}

/* White Glow (For emphasis) */
.white-glow {
  box-shadow:
    0 0 20px rgba(255,255,255,0.1),
    0 0 40px rgba(255,255,255,0.05);
}
```

## Animation Principles

### Gold Pulse (Attention)
```css
@keyframes gold-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.2); }
  50% { box-shadow: 0 0 30px rgba(255, 215, 0, 0.4); }
}
```

### White Fade (Transitions)
```css
@keyframes white-fade-in {
  from {
    opacity: 0;
    color: rgba(255, 255, 255, 0);
  }
  to {
    opacity: 1;
    color: rgba(255, 255, 255, 1);
  }
}
```

## Logo Variations

### Primary Logo
```
Black Background: Gold HIVE text
White Background: Black HIVE text with gold accent
Gold Background: Black HIVE text
```

### Icon Mark
```
H (Bold geometric)
├── Black version for light backgrounds
├── White version for dark backgrounds
└── Gold version for premium contexts
```

## Real-World Applications

### 1. Landing Page Hero
```css
.hero {
  background: #000000;
  color: #FFFFFF;
}

.hero-title {
  font-size: 4rem;
  color: #FFFFFF;
}

.hero-accent {
  color: #FFD700;  /* Key words in gold */
}

.hero-cta {
  background: #FFD700;
  color: #000000;
  font-weight: 700;
}
```

### 2. Dashboard Interface
```css
.dashboard {
  background: #000000;
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dashboard-card:hover {
  border-color: rgba(255, 215, 0, 0.2);
}

.dashboard-metric {
  color: #FFD700;  /* Important numbers in gold */
}
```

### 3. Mobile Interface
```css
.mobile-nav {
  background: #000000;
  border-top: 2px solid #FFD700;
}

.mobile-tab-active {
  color: #FFD700;
}

.mobile-tab-inactive {
  color: rgba(255, 255, 255, 0.4);
}
```

## Typography Pairing

### Display Font (Headlines)
```css
font-family: 'Clash Display', 'Space Grotesk', sans-serif;
font-weight: 700;
color: #FFFFFF;
```

### Body Font (Content)
```css
font-family: 'Inter', -apple-system, system-ui, sans-serif;
font-weight: 400;
color: rgba(255, 255, 255, 0.87);
```

### Code Font (Technical)
```css
font-family: 'JetBrains Mono', 'Fira Code', monospace;
color: #FFD700;  /* Code in gold for emphasis */
```

## Accessibility Considerations

### Contrast Ratios
```
Gold (#FFD700) on Black (#000000): 12.32:1 ✅ AAA
White (#FFFFFF) on Black (#000000): 21:1 ✅ AAA
Black (#000000) on Gold (#FFD700): 12.32:1 ✅ AAA
White (#FFFFFF) on Gold (#FFD700): 1.7:1 ❌ FAIL

Never use white text on gold backgrounds!
```

### Focus States
```css
.focusable:focus {
  outline: 2px solid #FFD700;
  outline-offset: 2px;
}
```

## Do's and Don'ts

### DO ✅
- Use gold sparingly for maximum impact
- Maintain high contrast for readability
- Use pure black for premium feel
- Apply gold to CTAs and important actions
- Keep interfaces clean with ample white space

### DON'T ❌
- Overuse gold (it loses impact)
- Put white text on gold backgrounds
- Use gray when black/white will work
- Mix warm golds with cool grays
- Forget accessibility contrast requirements

## Implementation CSS Variables

```css
:root {
  /* Core Palette */
  --hive-gold: #FFD700;
  --hive-black: #000000;
  --hive-white: #FFFFFF;

  /* Semantic Assignments */
  --hive-bg-primary: var(--hive-black);
  --hive-bg-secondary: rgba(255, 255, 255, 0.02);
  --hive-text-primary: rgba(255, 255, 255, 0.87);
  --hive-text-secondary: rgba(255, 255, 255, 0.60);
  --hive-accent: var(--hive-gold);
  --hive-border: rgba(255, 255, 255, 0.08);
  --hive-border-hover: rgba(255, 215, 0, 0.20);

  /* Interactive States */
  --hive-hover: rgba(255, 255, 255, 0.05);
  --hive-active: rgba(255, 215, 0, 0.10);
  --hive-focus: var(--hive-gold);
}
```

## The Premium Tech Feel

This color system creates a luxury tech aesthetic that:
1. **Feels expensive** without being inaccessible
2. **Stays readable** during marathon coding sessions
3. **Scales beautifully** from mobile to 4K displays
4. **Ages well** - these colors are timeless
5. **Prints perfectly** - crucial for university contexts

---

*HIVE: Where premium meets practical. Gold standards, black depth, white clarity.*