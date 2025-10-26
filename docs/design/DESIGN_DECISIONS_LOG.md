# Design Decisions Log (Append Entries Chronologically)

Purpose: Track check‑offs and decisions with lightweight context. Each entry should be created using `docs/design/CHECKOFF_TEMPLATE.md` and appended below the divider.

Index (optional)
- YYYY‑MM entries listed in reverse chronological order.

---

## 2025‑10

<!-- Paste new entries below (most recent first). Keep entries brief and link to details.) -->

### 2025‑10‑11 — Adopt vNext Tokens as Default
Owner(s): Design System Guild
Component/Pattern: Foundation — Tokens/Theming
Scope: foundation
Vertical: All (cross‑cutting)

Summary
- Promoted vNext token set (dark/light surfaces, borders, ring) to default. Keeps gold ring/CTA policy. Storybook retains toggle for regression comparisons.

Evidence
- Storybook toggle: packages/ui/.storybook/preview.tsx:1 (Tokens toolbar defaults to vNext)
- Token CSS: packages/tokens/src/styles.css:1 (vNext defaults in :root/.light)
- Build verification: packages/ui/storybook-static (local)

States Covered
- Dark/light, high‑contrast overlay compatibility; focus ring contrast verified.

Tokens & Contracts
- Background/foreground/surfaces stepped; border strength adjusted; ring unchanged.
- No API changes to components.

Risks & Mitigations
- Visual drift in some components (buttons/tabs/inputs) — plan a sweep to align against vNext; keep toggle for quick fallback during review.

Ripple Adjustments (Applied Now)
- Updated docs/design/ATOMIC_DESIGN_CHECKLIST.md:1 with status tags and vNext note.
- Follow‑ups: Tailwind preset mappings for surface levels/overlays/interactive‑*; add visually‑hidden + truncate utilities; perf budget doc.

Sign‑off
- Reviewed by: pending
- Status: Approved for default; follow‑up tasks opened in checklist.
