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

### Motion Philosophy

-   **Purposeful**: Animation should guide the user's attention, provide feedback, or smooth transitions. It should never be purely decorative.
-   **Responsive**: Interactions should have immediate haptic feedback through subtle, fast animations.
-   **Contextual**: Animate layout changes to prevent disorientation (e.g., expanding cards, list re-ordering).
-   **Performant**: All animations must be hardware-accelerated (favoring `transform` and `opacity`) and respect `prefers-reduced-motion`.

## 8. Iconography

To ensure visual consistency and a premium, technical feel, HIVE uses the **Lucide React** icon library. Lucide's clean, geometric style aligns perfectly with our Vercel-inspired aesthetic.

### Guidelines

| Rule | Value | Notes |
| :--- | :--- | :--- |
| **Default Size** | `18px` | For inline use with body text. |
| **Stroke Width** | `1.5px` | Thinner than the default for a more refined look. |
| **Color** | `foreground` or `muted` | Use `foreground` for primary icons and `muted` for secondary ones. |
| **Accent Usage** | Gold on hover/focus | Icons can take on the gold accent color during interaction states. |

## 9. Component States & Variants

Defining consistent interaction states is critical for a predictable and high-quality user experience.

### Button Variants & States

Our button strategy is updated to prioritize a clean, transparent-first aesthetic. The default button is a "ghost" or "outline" style, with solid fills used for higher-emphasis actions.

| Variant | Style | Usage |
| :--- | :--- | :--- |
| **Outline (Default)** | Transparent background with a `border` outline. | The standard button for most actions. |
| **Primary (White Fill)** | Solid `foreground` (white) fill with `background` (black) text. | The main call-to-action on a page. Use sparingly. |
| **Secondary (Black Fill)** | Solid `background` (black) fill with `foreground` (white) text. | For secondary actions that need more emphasis than an outline. |

**Interaction States for Buttons:**

| State | Visual Style (Outline) | Visual Style (Solid Fills) |
| :--- | :--- | :--- |
| **Hover** | Border color brightens to `#4A4A4A` and a subtle `surface-03` background appears. | Background lightens/darkens by ~10%. |
| **Focus** | 2px `accent` (`#FFD700`) outer ring/outline. | 2px `accent` (`#FFD700`) outer ring/outline. |
| **Pressed** | Subtle `transform: scale(0.98)` and a more prominent background. | Subtle `transform: scale(0.98)`. |
| **Disabled** | `disabled` (`#3F3F46`) text/border color; no hover or focus effects. | `disabled` (`#3F3F46`) text/fill color; no hover or focus effects. |

### Chips & Tags

To achieve an "Apple-like" feel, chips and tags should be styled as pill-shaped elements with a fully-rounded radius.

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Border Radius** | `radius-full` (`9999px`) | Creates the signature pill shape. References `Section 5`. |
| **Background** | `surface-03` (`#1F1F1F`) | A slightly elevated, dark background. |
| **Padding** | `4px 10px` | `py-1 px-2.5` in Tailwind. |
| **Text Style** | `Caption` or `Body Small` | Keep text concise and clear. |

### Data-Driven States (Cards, Lists)

To capture the Vercel-like experience for data-heavy views, we use specific, non-color-based states.

| State | Pattern | Description |
| :--- | :--- | :--- |
| **Loading** | **Skeleton Loader** | Use shimmering, animated placeholders that mimic the shape of the final content. This provides a high-quality perceived performance. |
| **Empty** | **Icon + Text** | Display a relevant Lucide icon and helpful micro-copy (e.g., "No spaces found. Why not create one?"). Can include a primary action button. |
| **Error** | **Icon + Text + Retry** | Display a warning icon (e.g., `AlertTriangle`), a clear, concise error message, and a "Try again" button. |

## 10. Layout & Grid System

To ensure responsive consistency, all page layouts adhere to a 12-column flexible grid system.

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Columns** | `12` | Standard flexible grid. |
| **Gutter** | `24px` | Space between columns. |
| **Page Margin** | `32px` (desktop), `16px` (mobile) | Outer spacing for the entire page. |
| **Max Content Width** | `1280px` | The maximum width for the main content area to ensure readability on large screens. |

## 11. Surfaces & Effects

To bring in that polished, layered feel from Apple's HIG, we will use a "frosted glass" effect for elevated, transient surfaces.

### Glassmorphism (Frosted Glass)

-   **Effect**: `backdrop-blur(12px) saturate(180%)`
-   **Background**: `rgba(17, 17, 17, 0.75)` (surface at 75% opacity)
-   **Usage**: Modals, popovers, command menus (`⌘K`), and the main navigation bar.
-   **Border**: A 1px subtle white border (`rgba(255, 255, 255, 0.1)`) is applied to the edges of glass surfaces to help them stand out from the background.

## 12. Social & Interactive Elements

To bridge the gap between a premium "company" aesthetic and a vibrant "social platform," this section defines patterns for human-centric interaction and community feel.

### Avatars & Presence

Avatars are the primary representation of users and spaces.

| Property | Value | Notes |
| :--- | :--- | :--- |
| **Shape** | `radius-full` (Circular) | Creates a friendly, approachable look. |
| **Sizes** | `24px`, `32px`, `48px`, `96px` | For use in comments, lists, profiles, and headers respectively. |
| **Fallback** | Initials on a `surface-02` background. | Ensures a consistent look when an image isn't available. |
| **Presence Indicator** | A `10px` circle at the bottom-right corner. | Green (`#22C55E`) for online, `surface-03` for offline. Has a 2px `background` border to separate it from the avatar. |

### User-Generated Content (UGC)

Text created by users should be scannable and interactive.

| Element | Style | Notes |
| :--- | :--- | :--- |
| **@mentions** | `accent` color (`#FFD700`) text, `font-medium`. | Should be interactive, opening a user profile popover on hover. |
| **#hashtags** | `foreground` color (`#FFFFFF`) text, `font-medium`. | Should be clickable to navigate to a feed of posts with that hashtag. |
| **Links** | `foreground` color, underlined. | Standard link styling for clarity. |

### Ritual & Celebration

Key moments in the user journey should be celebrated with motion and our brand accent to foster engagement and reward participation.

| Moment | Effect |
| :--- | :--- |
| **First Post / Achievement** | A glowing `accent` border on the "Complete" button, followed by a subtle burst of gold particle confetti on the next screen. |
| **New Follower / Mention** | Notification badges use the `accent` color. |
| **High-Engagement Post** | A subtle, shimmering `accent` gradient can be applied to the card's border to signify popularity. |

### Micro-interactions & Reactions

Interactive elements should provide satisfying, haptic feedback.

-   **Liking/Reacting**: A button should have a "snap" animation (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) where the icon scales up slightly and "bounces" before settling. The icon should fill with the `accent` color.
-   **Following**: A follow button should smoothly transition its state and text (e.g., "Follow" -> "Following") with a cross-fade animation.
-   **Hover States**: Interactive social elements (like avatar popovers) should appear after a short delay (`150ms`) to avoid accidental triggering. 