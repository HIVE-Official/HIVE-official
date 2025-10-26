# Experiment Card

- Slice: Entry Page (UB‑only)
- Flag: entry.auto_continue
- Owner(s): App UX, Design System Guild
- Start → End: TBD

## Hypothesis
Auto‑continuing after a brief hold reduces time‑to‑campus and bounce without hurting invite engagement.

## Success Metric
- Primary: Median time‑to‑campus (ms) ↓; Entry bounce rate ↓.
- Guardrails: Invite link CTR stable (±2pp); Cancel rate ≤ 20%.

## Design / Variant Notes
- A: Auto‑continue ON (800–1000ms hold + 2s countdown).
- B: Auto‑continue OFF (CTA only).
- C: Auto‑continue (600ms hold + 1.5s countdown).
- Reduced‑motion: no animated bar; numeric countdown only.

## Scope & Blast Radius
- Campus: UB only.
- Affects entry route only; no impact on authenticated or marketing routes.

## Verification Plan
- Confirm events fire: `entry_view`, `entry_timer_start|cancel|complete`, `entry_cta_click`.
- Validate reduced‑motion variant emits the same events without animation.
- Ensure Cancel disables auto‑continue for the same visitor (sticky preference).

## Rollback Plan
- Flip flag off to disable auto‑continue (Variant B).
- Keep CTA and invite link unchanged.

## Results
- Outcome and next action (ship / iterate / rollback):

