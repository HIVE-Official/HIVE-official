# HIVE Brand Design System & Aesthetic

## Quick Reference (For Website)

- **Palette:** Black (`#0A0A0A`), White (`#FFFFFF`), Gold accent (`#FFD700`), Greys for surfaces and borders.
- **Radius:** Use `8px` for buttons/inputs, `12px` for cards, `16px` for modals/popovers.
- **Font:** Space Grotesk Variable (headlines), Geist (body), Geist Mono (code). **S-tier Vercel feel.**
- **Gold Usage:** Only for focus rings, icon highlights, badge outlines, and ritual moments. Never as a button fill (except ritual badges).
- **Motion:** Use smooth, subtle transitions. Prefer motion over color for feedback.
- **Accessibility:** All text must meet WCAG AA contrast. Focus rings must be gold and at least 2px. Support `prefers-reduced-motion`.

---

## Component Recipe: Standard Button (React + Tailwind)

```tsx
<button
  className="bg-black text-white rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FFD700] hover:border-[#FFD700]"
>
  Continue
</button>
```

---

## Gold Accent: Do/Don't

| Do | Don't |
|----|-------|
| Use gold for focus rings | Use gold as button fill (except ritual) |
| Use gold for badge outlines | Use gold for card backgrounds |
| Use gold for icon highlights | Use gold for large surface areas |

---

## Accessibility Checklist

- All text/background pairs meet WCAG AA contrast
- Focus rings: always gold, 2px minimum
- Support `prefers-reduced-motion` for all animations
- All interactive elements are keyboard accessible

---

## Token Source (For Devs/AI)

- Colors: `packages/tokens/src/colors.ts`
- Typography: `packages/tokens/src/typography.ts`
- Spacing: `packages/tokens/src/spacing.ts`
- Motion: `packages/tokens/src/motion.ts`
- Effects (shadows, emboss): `packages/tokens/src/effects.ts`

---

This document is the single source of truth for the HIVE brand's visual identity. It is designed to help an AI agent build high-quality, brand-aligned components immediately. The aesthetic is inspired by the clean, premium feel of **Apple** and **Vercel**, prioritizing a minimalist monochrome palette with a striking gold accent.

## 1. Core Philosophy

The HIVE aesthetic is built on a foundation of premium, dark-first UI. The key principles are:

-   **Monochrome First**: The interface is strictly black and white. Color is not used for core functionality and is replaced by a strong visual hierarchy, typography, and motion.
-   **Apple & Vercel Inspired**: Clean, spacious layouts, polished interactions, and a feeling of quality are paramount.
-   **Subtle & Premium**: Interactions and visual feedback are designed to be subtle and elegant, avoiding loud or distracting elements.
-   **Gold Accents**: A distinct gold (`#FFD700`) is used sparingly for primary accents, focus states, and moments of celebration, creating a unique and recognizable brand highlight.
-   **Motion-First Feedback**: Status and feedback are communicated through motion and animation rather than a traditional palette of success/error colors.

## 2. Color Palette

The color system is strictly black and white with a single yellow accent. No traditional success (green) or error (red) colors are used.

### Primary Tokens

| Name | Hex | Usage |
| :--- | :--- | :--- |
| `background` | `#0A0A0A` | The primary, matte black canvas of the entire UI. |
| `surface` | `#111111` | Card backgrounds and primary elevated surfaces. |
| `border` | `#2A2A2A` | Dividers, component borders, and input outlines. |
| `foreground` | `#FFFFFF` | Primary text content and headlines. |
| `muted` | `#6B7280` | Secondary text, metadata, and captions. |
| `disabled` | `#3F3F46` | Disabled text and placeholder content. |

### Surface Variants

To create depth and hierarchy, use the following surface variants:

-   `surface-01`: `#111111` (Primary cards, feed rows)
-   `surface-02`: `#181818` (Drawers, dropdowns, modals)
-   `surface-03`: `#1F1F1F` (Nested blocks, input backgrounds)

### Accent System (Gold)

The gold accent (`#FFD700`) should be used for less than 10% of the UI as a subtle "hint".

| Name | Hex | Usage |
| :--- | :--- | :--- |
| `accent.DEFAULT` | `#FFD700` | Primary accent for text, borders, and focus rings. |
| `accent.600` | `#EAC200` | Hover state for gold elements. |
| `accent.700` | `#C4A500` | Pressed/active state for gold elements. |

### Button Colors

Button styles are derived from the core palette, reinforcing the monochrome aesthetic. [Buttons should use full black and white fills across the project; yellow fills should never be used and are reserved for shock/attention.][[memory:9106897991451623838]]

-   **Primary Actions**: Use solid `foreground` (`#FFFFFF`) or `background` (`#0A0A0A`) fills.
-   **Attention/Warning**: Reserve yellow (`#FFD700`) fills for critical, attention-grabbing actions only.

## 3. Typography

HIVE uses a three-font system to create a clear and versatile typographic hierarchy with **S-tier premium feel**.

### Font Families

| Family | Font Stack | Usage |
| :--- | :--- | :--- |
| **Display** | `Space Grotesk Variable` | Headlines, page titles, hero sections. |
| **Sans** | `Geist` | Body text, UI copy, paragraphs, buttons. **S-tier premium.** |
| **Mono** | `Geist Mono` | Code snippets, technical text, numerals. **S-tier premium.** |

### Type Scale

| Style | Font Size | Line Height | Weight | Font Family |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | 64px | 72px | 600 | Space Grotesk |
| **H1** | 48px | 56px | 600 | Space Grotesk |
| **H2** | 32px | 40px | 600 | Space Grotesk |
| **H3** | 24px | 32px | 600 | Space Grotesk |
| **H4** | 20px | 28px | 600 | Space Grotesk |
| **Body** | 16px | 24px | 400 | Geist |
| **Body Small** | 14px | 20px | 400 | Geist |
| **Caption** | 12px | 18px | 400 | Geist |
| **Button** | 14px | 20px | 500 | Geist |
| **Code** | 14px | 20px | 400 | Geist Mono |

## 4. Spacing & Layout

The entire UI follows a strict 8px grid system for consistency and rhythm. [Spacing system is now standardized on an 8dp grid (0,8,16,...).][[memory:4694074657568658202]]

| Unit | Value | Usage |
| :--- | :--- | :--- |
| `1` | `8px` | Small gaps, icon padding. |
| `2` | `16px` | Medium gaps, component padding. |
| `3` | `24px` | Standard component padding, layout margins. |
| `4` | `32px` | Large margins, section spacing. |
| `6` | `48px` | Extra-large section spacing. |
| `8` | `64px` | Page-level spacing. |

## 5. Border Radius

A "heavy" radius is used to give components a soft, modern, and approachable feel, aligned with the Apple and Vercel aesthetic.

| Name | Value | Usage |
| :--- | :--- | :--- |
| `sm` | `4px` | Tags, badges, small elements. |
| `md` | `8px` | **Default.** Buttons, inputs, standard components. |
| `lg` | `12px` | **Default.** Cards and medium-sized containers. |
| `xl` | `16px` | Modals, popovers, large containers. |
| `full` | `9999px`| Pills, avatars, circular elements. |

## 6. Effects & Visual Style

### Shadows (Elevation)

A Vercel-style shadow system is used to create a sense of depth and elevation for components like modals and popovers.

| Level | Value |
| :--- | :--- |
| `elevation-1` | `0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.1)` |
| `elevation-2` | `0px 2px 4px rgba(0,0,0,0.06), 0px 4px 6px rgba(0,0,0,0.1)` |
| `elevation-3` | `0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -2px rgba(0,0,0,0.05)` |
| `elevation-4` | `0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)` |

### Emboss Effect

A signature "emboss" effect is used to give surfaces a subtle, tactile feel. [This is part of the UI stack of Tailwind CSS + shadcn/ui (Radix primitives) with fully custom tokens: dark-first surfaces, subtle embossing, and gold accent states.][[memory:2945685315739620156]]
-   **Definition**: `0px 1px 1px rgba(0,0,0,0.5), inset 0px 1px 1px rgba(255,255,255,0.1)`

## 7. Motion & Animation

Motion is a core part of the HIVE brand, used to provide feedback and create a premium feel.

### Durations

| Name | Value | Usage |
| :--- | :--- | :--- |
| `fast` | `120ms`| Micro-interactions, state changes. |
| `base` | `180ms`| Content transitions, modals. |
| `slow` | `280ms`| Complex animations. |

### Easing

| Name | Value | Feeling |
| :--- | :--- | :--- |
| `smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Confident and smooth. |
| `snap` | `cubic-bezier(0.68, -0.55, 0.265, 1.55)` | Playful bounce. |
| `elegant` | `cubic-bezier(0.23, 1, 0.32, 1)` | Refined and graceful. |
| `brand` | `cubic-bezier(0.33, 0.65, 0, 1)` | Signature HIVE spring for gold accents. | 