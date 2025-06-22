# HIVE "Tech-Monochrome + Yellow" Color System v2

**Inspired by Geist design principles**  
**Philosophy**: 90% grayscale + ≤10% strategic yellow accents + motion-based feedback

---

## Overview

HIVE's color system is built on a foundation of **perceptual uniformity** and **semantic clarity**. We use OKLCH-generated grayscale steps with precise L\* (lightness) values, ensuring even perceived brightness differences across the interface.

### Core Principles

1. **90/10 Rule**: 90% grayscale surfaces and text, ≤10% yellow accents
2. **Motion over Color**: Error/success states use motion and iconography, not color
3. **Semantic Tokens**: Color names reflect purpose, not appearance
4. **Accessibility First**: All combinations meet WCAG 2.1 AA standards (≥4.5:1 contrast)

---

## Semantic Token System

### Canvas & Surfaces (90% of interface)

| Token          | Hex       | L\* | Usage                        | %   |
| -------------- | --------- | --- | ---------------------------- | --- |
| **bg-root**    | `#0A0A0A` | 6   | Page canvas, root background | 55% |
| **surface-01** | `#111111` | 9   | Primary cards, Feed rows     | 20% |
| **surface-02** | `#181818` | 12  | Drawers, dropdowns, modals   | 7%  |
| **surface-03** | `#1F1F1F` | 15  | Nested blocks, inputs, forms | 5%  |

### Borders & Dividers

| Token           | Hex       | L\* | Usage          |
| --------------- | --------- | --- | -------------- |
| **border-line** | `#2A2A2A` | 18  | 1px separators |

### Text Hierarchy

| Token              | Hex       | L\* | Usage                      |
| ------------------ | --------- | --- | -------------------------- |
| **text-primary**   | `#FFFFFF` | 100 | H1-H4, body text           |
| **text-secondary** | `#CFCFCF` | 82  | Metadata, captions         |
| **text-disabled**  | `#8A8A8A` | 55  | Placeholder text, disabled |

### Yellow Accent System (≤10% usage)

| Token          | Hex       | L\* | Usage                       |
| -------------- | --------- | --- | --------------------------- |
| **yellow-500** | `#FFD700` | 88  | Primary accent, focus rings |
| **yellow-600** | `#EAC200` | 80  | Hover states                |
| **yellow-700** | `#C4A500` | 68  | Pressed/selected states     |

### Overlays & Effects

| Token              | Value                            | Usage           |
| ------------------ | -------------------------------- | --------------- |
| **overlay-scrim**  | `rgba(0, 0, 0, 0.55)`            | Modal backdrop  |
| **shadow-ambient** | `0 2px 4px 0 rgba(0, 0, 0, 0.6)` | Default shadows |
| **grain-speck**    | `rgba(255, 255, 255, 0.015)`     | Subtle texture  |

---

## Interaction States

### Hover States (+3 L\* shift)

| Base Surface   | Hover State       | L\* Change |
| -------------- | ----------------- | ---------- |
| **surface-01** | `#1A1A1A` (L\*12) | +3         |
| **surface-02** | `#212121` (L\*15) | +3         |
| **surface-03** | `#282828` (L\*18) | +3         |

### Interactive Hierarchy

| State       | Background Treatment     | Text/Icon    | Border/Outline     |
| ----------- | ------------------------ | ------------ | ------------------ |
| **Rest**    | surface-01               | text-primary | border-line        |
| **Hover**   | shift +3 L\* (lighten)   | unchanged    | —                  |
| **Pressed** | yellow-700 overlay @ 10% | text-primary | outline yellow-600 |

---

## Motion-Based Feedback System

**No additional colors for states** — we use motion and iconography instead.

### Error Feedback

- **Visual**: 1px border flicker (border-line ↔ text-primary)
- **Motion**: Micro-shake animation (16ms duration)
- **Implementation**: `.feedback-error` class

### Success Feedback

- **Visual**: Scale-up animation (1.03x scale)
- **Icon**: Yellow check mark (✓) in yellow-500
- **Implementation**: `.feedback-success` class

### Ritual Moments

- **Special Case**: Conic gradient bloom (`yellow-500` → `yellow-700` → `yellow-500`)
- **Duration**: 400ms (one-shot animation)
- **Usage**: Achievement unlocks, ritual completions

---

## CSS Implementation

### CSS Custom Properties

```css
:root {
  /* Canvas & Surfaces */
  --bg-root: #0a0a0a;
  --surface-01: #111111;
  --surface-02: #181818;
  --surface-03: #1f1f1f;

  /* Borders & Text */
  --border-line: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cfcfcf;
  --text-disabled: #8a8a8a;

  /* Yellow Accents */
  --yellow-500: #ffd700;
  --yellow-600: #eac200;
  --yellow-700: #c4a500;

  /* Interaction States */
  --surface-01-hover: #1a1a1a;
  --surface-02-hover: #212121;
  --surface-03-hover: #282828;
}
```

### Common Patterns

```css
/* Default interface pattern */
background-color: var(--bg-root);
color: var(--text-primary);

/* Elevated card pattern */
background-color: var(--surface-01);
border: 1px solid var(--border-line);

/* Interactive element pattern */
background-color: var(--surface-01);
transition: all 90ms cubic-bezier(0.32, 0.72, 0, 1);

/* On hover */
background-color: var(--surface-01-hover);
transform: translateY(-1px);

/* Focus state pattern */
outline: none;
box-shadow:
  0 0 0 2px var(--bg-root),
  0 0 0 4px var(--yellow-500);
```

---

## TypeScript Integration

```typescript
import {
  getSemanticToken,
  getGrayscale,
  HIVE_SEMANTIC_TOKENS,
} from "@hive/tokens";

// Type-safe semantic token access
const backgroundColor = getSemanticToken("bg-root");
const surfaceColor = getSemanticToken("surface-01");

// Grayscale utility access
const borderColor = getGrayscale(700); // #2A2A2A

// Generate CSS variables
const cssVars = generateCSSVariables();
```

---

## Accessibility Compliance

All color combinations meet **WCAG 2.1 AA** standards:

| Combination                | Contrast Ratio | Status |
| -------------------------- | -------------- | ------ |
| **White on bg-root**       | 21:1           | ✅ AAA |
| **Secondary on bg-root**   | 8.2:1          | ✅ AA+ |
| **Yellow on bg-root**      | 10.4:1         | ✅ AAA |
| **Primary on surface-01**  | 12.5:1         | ✅ AAA |
| **Disabled on surface-01** | 4.8:1          | ✅ AA  |

### Focus Management

```css
.focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--bg-root),
    0 0 0 4px var(--yellow-500);
}
```

### High Contrast Support

```css
@media (prefers-contrast: high) {
  :root {
    --border-line: #ffffff;
    --text-secondary: #ffffff;
  }
}
```

---

## Usage Guidelines

### ✅ Correct Usage

```css
/* Primary interface (90% usage) */
background: var(--bg-root);
color: var(--text-primary);

/* Elevated surfaces */
background: var(--surface-01);
border: 1px solid var(--border-line);

/* Focus states ONLY */
border: 2px solid var(--yellow-500);

/* Error states: motion + icon */
.error-state {
  animation: border-flicker-shake 16ms ease-out;
}
.error-state::after {
  content: "⚠";
  color: var(--yellow-500);
}
```

### ❌ Incorrect Usage

```css
/* Don't use yellow for backgrounds */
background: var(--yellow-500); /* Too prominent */

/* Don't add extra colors */
color: #ff0000; /* Breaks monochrome rule */

/* Don't use color alone for states */
.error {
  color: red;
} /* Use motion instead */

/* Don't skip semantic tokens */
background: #111111; /* Use var(--surface-01) */
```

---

## Light Mode Support

Light mode uses automatic token inversions:

```css
@media (prefers-color-scheme: light) {
  :root:not(.dark) {
    --bg-root: #ffffff;
    --surface-01: #f5f5f5;
    --surface-02: #e5e5e5;
    --surface-03: #cfcfcf;
    --text-primary: #0a0a0a;
    --text-secondary: #5f5f5f;
    /* Yellow accents remain unchanged */
  }
}
```

---

## Migration from v1

### Token Mapping

| Old Token      | New Token        | Notes             |
| -------------- | ---------------- | ----------------- |
| `--hive-black` | `--bg-root`      | Semantic naming   |
| `--hive-card`  | `--surface-01`   | Better hierarchy  |
| `--hive-gold`  | `--yellow-500`   | Consistent naming |
| `--hive-white` | `--text-primary` | Purpose-based     |

### Class Updates

```css
/* Old */
.bg-hive-canvas → .bg-root
.bg-hive-card → .bg-surface-01
.text-hive-white → .text-primary
.border-hive-gold → .border-yellow-500
```

---

_**HIVE Design System v2** — December 2024_  
_Built with Geist inspiration, powered by semantic tokens_
