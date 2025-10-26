# Atoms Coverage — Storybook & shadcn Alignment

Status: Active
Owner: Design System Guild
Last updated: 2025-10-14

This checklist ensures every atom exists, is sourced from shadcn where applicable, and has adequate Storybook coverage.

## Canonical Atoms (curated)
- [x] Button — shadcn — stories: `Atoms/Button`, `Button.States`
- [x] Input — shadcn — stories: `Atoms/Input`, `Input.States`
- [x] Textarea — shadcn — stories: `Atoms/Textarea`, `Textarea.States`
- [x] SelectNative — custom — stories: `Atoms/SelectNative`, `SelectNative.States`
- [x] Checkbox — shadcn — stories: `Atoms/Checkbox`, `Checkbox.States`
- [x] Radio (group) — shadcn — stories: `Atoms/Radio`, `Radio.States`
- [x] Switch — shadcn — stories: `Atoms/Switch`, `Switch.States`
- [x] Label — shadcn — stories: `Atoms/Label`
- [x] Link — custom — stories: `Atoms/Link`, `Link.States`
- [x] Badge — shadcn — stories: `Atoms/Badge`
- [x] Avatar — shadcn — stories: `Atoms/Avatar`
- [x] Card — shadcn — stories: `Atoms/Card`
- [x] Separator — shadcn — stories: `Atoms/Separator/KBD/VisuallyHidden`
- [x] Skeleton — shadcn — stories: `Atoms/Skeleton`
- [x] Spinner — custom — stories: `Atoms/Spinner/Progress`
- [x] Progress — shadcn — stories: `Atoms/Spinner/Progress`
- [x] Slider — shadcn — stories: `Atoms/Slider`
- [x] Toggle — shadcn — stories: `Atoms/Toggle`
- [x] Tooltip — shadcn — stories: `Atoms/Tooltip`
- [x] Typography — custom — stories: `Atoms/Typography`
- [x] Hive Logo — custom — stories: `Atoms/Logo`

## Planned Additions (Phase 2)
- [ ] Alert / InlineNotice — shadcn/custom — stories: `Atoms/Alert`, `Alert.States`
- [ ] ToastPrimitive — shadcn — stories: `Atoms/ToastPrimitive`
- [ ] EmptyState / Placeholder — custom — stories: `Atoms/EmptyState`
- [ ] DialogPrimitive — shadcn — stories: `Atoms/Dialog`
- [ ] Kbd / ShortcutHint — custom (kbd base in `styles.css`) — stories: `Atoms/Kbd`
- [ ] VisuallyHidden — custom — stories: `Atoms/VisuallyHidden`
- [ ] FieldText (Helper/Error) — custom — stories: `Atoms/FieldText`
- [ ] Icon / IconWrapper (lucide) — custom — stories: `Atoms/Icon`
- [ ] MotionPresence / AnimateMount — framer wrapper — stories: `Atoms/Motion`
- [ ] Surface (GlassSurface) — custom utility wrapper — stories: `Atoms/Surface`
- [ ] FocusRing / InteractiveOutline — custom utility wrapper — stories: `Atoms/FocusRing`

## Rules
- Import atoms via `@/index` (preferred) or `@/atoms/*`; do not import from `@/components/ui/*` outside of atoms.
- Stories must follow `Atoms/<Name>` with a separate `*.States` story for interactive atoms.
- No raw hex; only token utility classes.
