One Design System — Foundations & Tokens (Dark‑First)

Summary
- Brand: Gold #FFD700, Black #000000, White #FFFFFF. No gold tints for fills.
- Desktop-first. Vercel/ChatGPT-inspired minimalism, speed, clarity.
- Typeface: Geist Sans (UI), with system fallbacks.
- Primitive prefix: --hive- for all tokens. Components consume semantic tokens only.

Token Taxonomy
- Background: --hive-background-{primary,secondary,tertiary,interactive}
- Text: --hive-text-{primary,secondary,tertiary,disabled}
- Brand: --hive-brand-{primary,hover,on-gold}
  - Aliases (compat): --hive-brand-secondary, --hive-brand-secondary-hover map to primary/hover
- Border: --hive-border-{default,hover,focus,strong}
- Interactive: --hive-interactive-{hover,active,focus}
- Status: --hive-status-{success,warning,error,info}
- Typography: --hive-font-family-*, --hive-font-size-*, --hive-font-weight-*
- Spacing: --hive-spacing-* (4px base), layout sizes for shell
- Radius: --hive-radius-{control,surface,pill}
- Motion: --hive-duration-*, --hive-easing-*
- Z-index: --hive-z-{nav,overlay,modal,popover,tooltip}

Dark-First Semantic Palette
- Background
  - --hive-background-primary: #000000
  - --hive-background-secondary: #171717
  - --hive-background-tertiary: #262626
  - --hive-background-interactive: #404040
- Text
  - --hive-text-primary: #FFFFFF
  - --hive-text-secondary: #D4D4D4
  - --hive-text-tertiary: #A3A3A3
  - --hive-text-disabled: #525252
- Brand
  - --hive-brand-primary: #FFD700
  - --hive-brand-hover: #FFD700
  - --hive-brand-on-gold: #000000
- Border
  - --hive-border-default: rgba(255,255,255,0.08)
  - --hive-border-hover: rgba(255,255,255,0.16)
  - --hive-border-focus: #FFD700
  - --hive-border-strong: #404040
  - Aliases (compat): --hive-border-primary ≈ default, --hive-border-secondary ≈ strong
- Interactive
  - --hive-interactive-hover: rgba(255,255,255,0.04)
  - --hive-interactive-active: rgba(255,255,255,0.08)
  - --hive-interactive-focus: #FFD700
- Status (functional, non-brand)
  - --hive-status-success: #10B981
  - --hive-status-warning: #FFB800
  - --hive-status-error: #EF4444
  - --hive-status-info: #FFFFFF (use neutral or gold for info where needed)

Typography (Geist Sans)
- Families
  - --hive-font-family-sans: "Geist Sans", system-ui, sans-serif
  - --hive-font-family-mono: ui-monospace, SFMono-Regular, Menlo, monospace
- Sizes (base 16, desktop)
  - Body: 14/16/18; Headings: 20/24/30/36; Line-height 1.4 body, 1.2–1.3 headings
- Weights
  - --hive-font-weight-normal: 400; --hive-font-weight-medium: 500; --hive-font-weight-semibold: 600

Spacing & Layout
- Scale (4px base): 0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64
- Shell sizes
  - --hive-topbar-height: 56px
  - --hive-sidenav-width-expanded: 280px
  - --hive-sidenav-width-collapsed: 72px
  - --hive-right-rail-width-default: 360px (min 280px, max 420px)
  - Content gutters: 24px; max content width target: 1440px

Motion
- Durations: 100/150/200ms primary; respect prefers-reduced-motion (collapse to 0/50ms)
- Easing: cubic-bezier(0.2, 0, 0, 1) standard; no bounce on core nav

Accessibility Guardrails
- Contrast: ≥4.5:1 text, ≥3:1 UI and focus rings
- Focus: 2–3px gold ring, 2px offset; keyboard parity for all interactive elements
- Never set large backgrounds to solid gold; gold is for focus/indicators only

Component Consumption Rules
- Use semantic tokens only (e.g., bg-[var(--hive-background-secondary)], text-[var(--hive-text-primary)])
- Never hardcode hex/rgba in components
- Avoid gold as fill; express selection/active via subtle background + 2px gold indicator

Shell Semantics (for Global Nav)
- Sidebar
  - Background: var(--hive-background-secondary)
  - Border: var(--hive-border-default)
  - Item hover: var(--hive-interactive-hover)
  - Item active: var(--hive-interactive-active)
  - Active indicator: 2px at left, var(--hive-brand-primary)
- Top bar
  - Height: var(--hive-topbar-height)
  - Surface: var(--hive-background-secondary)
  - Focus ring: var(--hive-interactive-focus)
- Right rail (context panel)
  - Width: var(--hive-right-rail-width-default)
  - Surface: var(--hive-background-tertiary)
  - Border: var(--hive-border-default)

Do/Don’t
- Do: keep surfaces monochrome; use pure gold for focus/indicators
- Do: prioritize readability and keyboard focus visibility
- Don’t: introduce gold tints/shades; don’t use gold as large-area background

Acceptance Criteria
- All new components consume --hive-* semantic tokens only
- Global nav honors shell sizes and brand usage rules
- Focus rings and active indicators always use #FFD700
- No usage of gold tints (champagne/amber/etc.) in new work

Notes
- The tokens package already contains --hive-* variables; this doc clarifies the subset and usage rules for PRD-aligned work.
