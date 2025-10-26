# Accessibility + Motion Checklist

Page-level
- [ ] WCAG 2.2 AA+ contrast (text, icons, keylines)
- [ ] Reduced‑motion respected; no critical info conveyed only by motion
- [ ] High‑contrast mode previewed

Controls
- [ ] All interactive elements have `.focus-ring`
- [ ] Targets ≥44px; hit areas don’t overlap critical text
- [ ] Labels: visible + ARIA where needed

Keyboard Flow
- [ ] Logical tab order (LNAV → content → actions → footer)
- [ ] Esc cancels modals/timers; Enter/Space activate primary buttons
- [ ] Focus trapped in overlays; returned on close

Live Regions
- [ ] `aria-live="polite"` for async state changes (joins, timers)
- [ ] Errors summarized inline and announced

Motion
- [ ] Durations/easings match tokens; no continuous spinners where step updates suffice
- [ ] Entry/exit use CSS utilities; Framer only for conditional mounts/choreography

Performance
- [ ] No layout shift on critical actions (e.g., button label changes)
- [ ] Prefetch used judiciously; canceled on user interaction

References
- UI_GUIDELINES.md:1 (tokens, motion, focus ring)
- docs/ux/PATTERNS_LIBRARY.md:1 (components/patterns)

