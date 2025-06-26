# HIVE Design Overview

This document summarizes the core design principles used across the component library. It mirrors the guidelines found in `docs/brand-design.md` so developers can quickly reference the aesthetic when working in Storybook.

## Palette

- **Background:** `#0A0A0A`
- **Surface:** `#111111`
- **Border:** `#2A2A2A`
- **Foreground:** `#FFFFFF`
- **Muted:** `#6B7280`
- **Gold Accent:** `#FFD700`

Gold is reserved for focus rings, icon highlights and subtle accents. It should never be used as a primary button color.

## Typography

- **Display:** Space Grotesk Variable
- **Sans:** Geist
- **Mono:** Geist Mono

Headings use Space Grotesk while body text uses Geist. All text must maintain WCAG AA contrast.

## Spacing

An 8 px grid is used throughout the UI (`8, 16, 24, 32, 48, 64`).

## Border Radius

- `sm`: 4 px
- `md`: 8 px (default for buttons and inputs)
- `lg`: 12 px (cards)
- `xl`: 16 px (modals)

## Motion

Feedback is communicated through subtle motion rather than color. Respect user preferences for reduced motion.

These design foundations inform all components in `@hive/ui` and provide a consistent baseline when creating new stories in Storybook.
