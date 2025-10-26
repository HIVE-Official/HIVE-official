# Molecules & Organisms — Audit Checklist

Last updated: 2025-10-20

Purpose
- Track what we’ve reviewed, what’s left, and how to verify quickly in Storybook. Keep this paired with `docs/design/DESIGN_TODO.md`.

Key
- [x] Done (brand-consistent, motion aligned)
- [~] Partial (usable, needs polish/tests)
- [ ] Pending (audit + design pass required)

## Molecules

- [x] Select — popover surface, option states, scroll gradients
  - Code: packages/ui/src/molecules/select.tsx:1, packages/ui/src/components/ui/select.css:1
  - Verify: stories Select/Default, Select/LongList

- [x] FormField — alignment, descriptions, error state ties
  - Code: packages/ui/src/molecules/form-field.tsx:1
  - Verify: FormField stories (base + states)

- [x] AvatarCard — portrait layout, overlays, role badge
  - Code: packages/ui/src/molecules/avatar-card.tsx:1
  - Verify: AvatarCard stories (variants)

- [~] DropdownMenu — parity with Select surface/hover
  - Code: packages/ui/src/molecules/dropdown-menu.tsx:1
  - Action: add CSS skin or reuse Select tokens; add stories

- [~] InlineNotice — tone to match Alert
  - Code: packages/ui/src/molecules/inline-notice.tsx:1
  - Action: quieter background, left accent optional; add stories

- [~] Command (palette) — surface + item focus
  - Code: packages/ui/src/molecules/command.tsx:1
  - Action: align to Select list styling; add stories

- [~] Dialog/Sheet/Popover/Accordion/Tabs — motion + borders
  - Code: packages/ui/src/molecules/{dialog,sheet,popover,accordion,tabs}.tsx
  - Action: unify ease/duration; verify focus-visible rings; add stories where missing

- [ ] Banner — success/info/warning variants
  - Code: packages/ui/src/molecules/banner.tsx:1
  - Action: align colors with Alerts; add stories

- [ ] Breadcrumb — spacing, truncation
  - Code: packages/ui/src/molecules/breadcrumb.tsx:1
  - Action: verify 2+ lines collapse; add stories

- [ ] SegmentedControl — active/hover states, reduced-motion
  - Code: packages/ui/src/molecules/segmented-control.tsx:1
  - Action: align to token radii; add stories

- [ ] SearchInput — clear affordance, focus rings
  - Code: packages/ui/src/molecules/search-input.tsx:1
  - Action: placeholder fade optional; add stories

- [ ] Pagination — ellipsis + keyboard order
  - Code: packages/ui/src/molecules/pagination.tsx:1
  - Action: token borders/shadows; add stories

- [ ] TagInput/CheckboxGroup/FieldText — brand alignment
  - Code: packages/ui/src/molecules/{tag-input,checkbox-group,field-text}.tsx
  - Action: verify focus/invalid; add stories

- [ ] EmptyState — icon tone + spacing
  - Code: packages/ui/src/molecules/empty-state.tsx:1
  - Action: add stories; test dark theme contrast

## Organisms

- [x] Toaster — crest icon, quiet capsule, minimal container
  - Code: packages/ui/src/organisms/toaster.tsx:1, packages/ui/src/components/ui/toast.tsx:1
  - Verify: Feedback/Toast stories; swipe + stack motion

- [~] DashboardHeader — spacing, tokens
  - Code: packages/ui/src/organisms/dashboard-header.tsx:1
  - Action: confirm typography + avatar usage

- [~] StepperHeader — separators + motion
  - Code: packages/ui/src/organisms/stepper-header.tsx:1
  - Action: align to token borders; add stories

- [~] Auth/SignInCard — surface + CTAs
  - Code: packages/ui/src/organisms/auth/sign-in-card.tsx:1
  - Action: align to gold accents; add stories

- [~] OnboardingFrame — panel spacing + motion
  - Code: packages/ui/src/organisms/onboarding/onboarding-frame.tsx:1
  - Action: verify steps + reduced-motion

- [~] Profile (header/overview/… ) — portrait atom adoption
  - Code: packages/ui/src/organisms/profile/*.tsx
  - Action: replace circular avatars; check contrast

- [~] Spaces (header, cards, Dock, queues) — adopt updated atoms
  - Code: packages/ui/src/organisms/spaces/*.tsx
  - Action: ensure Select/Alert/InlineNotice styles apply; verify list shadows

- [ ] HiveLab canvas and rails — shell consistency
  - Code: packages/ui/src/organisms/hivelab/*.tsx
  - Action: unify borders, shadows, tokens; add stories

## Cross-Cutting Checks

- Focus rings use tokens across all overlays and menus.
- Reduced-motion honors media query on transitions and list hovers.
- Dark-mode contrast on borders, separators, scroll fades.
- No duplicate components or conflicting exports in `index.ts`.
