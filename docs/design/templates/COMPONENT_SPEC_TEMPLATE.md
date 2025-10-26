# Component Spec — <ComponentName>

Status: Draft
Owner: <Name>
Last updated: <YYYY-MM-DD>

## Purpose
- Where it’s used and what problem it solves

## Anatomy
- Slots/parts, tokens, and states

## API
- Props (required/optional), events, ARIA roles/attributes

## States
- Idle, hover, focus, active, disabled, loading, error

## Content
- Labels, truncation rules, empty states

## Accessibility
- Keyboard, focus order, screen reader output, contrast

## Theming & Tokens
- Token hooks and supported dials (density, elevation, glass, stroke, contrast)

## Stories to Implement
- `ComponentName.stories.tsx` basic and “States” stories
- A11y-focused story if interactive

## Acceptance Checklist
- [ ] Meets STORYBOOK_CHECKLIST
- [ ] No raw hex; uses token classes
- [ ] No `@layer` outside `styles.css`
- [ ] Tested at all dial settings

