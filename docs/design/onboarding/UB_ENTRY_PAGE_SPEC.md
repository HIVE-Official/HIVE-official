Status: Design spec (UB-only)
Owner: Design System Guild • App UX
Last updated: 2025-10-24

# UB‑Only Entry Page — Pre‑Onboarding (Design‑Only)

What & Why
- One fast decision, one clear action: continue to UB campus preview without auth.
- Trust‑visible and safe by default: clearly scoped to University at Buffalo; guest is read‑only.
- Motion‑light and accessible: WCAG 2.2 AA+, reduced‑motion respected, 44px targets.

Scope
- Applies to the pre‑onboarding in‑app entry (not marketing landing). UB‑only launch.
- No campus picker, no auth. Invite link is available but secondary.
- Defer all brand, tokens, and motion rules to UI_GUIDELINES.md:1.

Outcomes (Acceptance)
- First visit: user sees UB context and proceeds in ≤1 tap or via 2s auto‑continue (cancellable).
- Cancel is obvious and keyboardable; any interaction cancels countdown.
- Reduced‑motion mode shows no animated progress; numeric countdown remains.
- “Have an invite?” opens a lightweight sheet/dialog; it does not block entry.

Information Architecture
- Top Bar: Logo (left) • “Have an invite?” (right, text link).
- Hero: Headline, subcopy; UB badge for campus context.
- Primary CTA: “Continue to UB Buffalo” (gold). Disabled only if a blocking state exists (rare).
- Secondary: Optional “Browse as guest”; tiny verification note under CTA.
- Footer: Help • Accessibility • Moderation links.

Wireframe (Greyscale)

Mobile (centered column)
```
[ Logo ]                                          [Invite?]

Welcome, UB students.
Pick your campus spaces to preview and join later.
[ UB • University at Buffalo ]  ← campus badge (neutral)

[ Continue to UB Buffalo ] ← gold CTA (44px+)  ──┐
──────────────────────────────────────────────────┘ 2px neutral progress bar (timer, if active)
(Continuing to UB Buffalo in 2s • Cancel)  ← inline pill (neutral)

Browse as guest  (text link)
Guest browsing shows public info; joining may require verification. (caption)

Help • Accessibility • Moderation
```

Desktop (two‑column hero)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ Logo                                                Have an invite?         │
├─────────────────────────────────────────────────────────────────────────────┤
│ Welcome, UB students.        │ [ UB • University at Buffalo ]               │
│ Preview campus spaces and    │                                             │
│ join when you’re ready.      │ [ Continue to UB Buffalo ]  ───────────────┐│
│                              │ ────────────────────────────────────────────┘│
│                              │ (Continuing to UB Buffalo in 2s • Cancel)   │
│                              │ Browse as guest                              │
│                              │ Guest browsing shows public info…            │
└─────────────────────────────────────────────────────────────────────────────┘
Footer: Help • Accessibility • Moderation
```

Timer (Auto‑Continue)
- Default: Enabled on first visit.
  - Trigger: Page load, 800–1000ms hold, then 2s countdown.
  - UI: 2px neutral progress bar above CTA; inline pill under CTA: “Continuing to UB Buffalo in 2s • Cancel”.
  - Cancel: Text button; Esc key also cancels. Any user interaction cancels.
  - CTA press bypasses countdown immediately.
- Returning visitors: Prefer faster path (400–600ms hold, then immediate continue) unless they cancelled previously.
- Reduced‑motion: Hide progress bar; show numeric countdown only in the pill.
- Failure guard: If navigation stalls, restore CTA and show inline neutral “Still working…” with retry affordance.

States & Errors
- Default: No blocking state; CTA visible.
- Loading (sheet/dialog, minor cases): Use standard overlay elevation and tokenized motion. No page‑level shimmer.
- Error: Inline helper (neutral tone) under the relevant control; never modal‑block the main CTA.
- Offline: Show an offline banner; disable auto‑continue; CTA becomes “Retry”.
- JS disabled: No auto‑continue; CTA remains primary path; invite opens a dedicated route.

Components (consume via @hive/ui)
- TopBarMinimal: neutral surface, hairline border, logo slot, text link right.
- CampusBadge: neutral chip with campus name “University at Buffalo”.
- PrimaryCTA: `.btn-prominent` gold fill, 44px min height, visible `.focus-ring`.
- TimerPill: neutral pill, `.text-caption`; includes a text‑button “Cancel”.
- ProgressBarThin: 2px neutral bar; respects reduced‑motion.
- InviteLink: text button; opens BottomSheet (mobile) / Dialog (desktop).
- FooterLinks: small neutral links; respect safe areas.

Motion & Micro‑Interactions
- Durations: entry 150–200ms; sheet 200–250ms; button press micro‑pulse 100–150ms.
- Easing: use token easings (see UI_GUIDELINES.md:1 Motion Grammar).
- Timer: update at 1Hz; avoid continuous spinners; step updates reduce paint.
- Reduced‑motion: disable animated progress; keep copy‑only countdown.

Accessibility
- WCAG 2.2 AA+. All interactives use `.focus-ring` and are keyboardable.
- ARIA live region (polite) announces: “Continuing to UB Buffalo in N seconds” and timer cancel.
- Esc cancels active timers and closes the invite sheet; sheet traps focus.
- Targets ≥44px; high‑contrast text; no hover‑only affordances.

Copy (plain, student‑first)
- Headline: “Welcome, UB students.”
- Subcopy: “Preview campus spaces and join when you’re ready.”
- Primary CTA: “Continue to UB Buffalo”
- Timer pill: “Continuing to UB Buffalo in 2s • Cancel”
- Secondary link: “Browse as guest” (optional)
- Invite link: “Have an invite?”
- Note (caption): “Guest browsing shows public info; joining may require verification.”

Copy Variants (A/B ready)
- Headline B: “Find your UB spaces.”
- Subcopy B: “See what’s happening on campus. Join anytime.”
- CTA B: “Continue to UB Campus”
- Timer pill B: “Continuing in 2s • Cancel” (shortened; keep clarity in SR text)


Analytics (minimum events)
- `entry_view`: on page visible. Props: `{ campus: 'ub-buffalo', rm: <bool> }`.
- `entry_timer_start|cancel|complete`: include duration_ms, interaction_cancelled.
- `entry_cta_click`: props include `{ source: 'cta' | 'auto' }`.
- `entry_invite_open|submit`: include `{ success: <bool> }`.
- Guardrails: never capture PII on this page.

Experiment (optional, behind flag)
- Hypothesis: Auto‑continue reduces time‑to‑campus and bounce without harming invite CTR.
- Variants: A (auto‑continue on, 2s), B (off), C (1.5s).
- Success: ↓ time‑to‑campus, ↑ campus preview engagement; Guardrails: ≤ +2pp bounce.
- Use docs/templates/experiment-card.md to log run and results.

Verification (design handoff → implementation)
- Visual: Gold only on CTA and focus. Neutrals elsewhere; no tinted grays.
- Motion: Matches token durations/easings; reduced‑motion verified.
- Accessibility: Keyboard flow: Logo → CTA → Secondary → Invite → Footer; visible focus always.
- Behavior: Timer cancels on any interaction; CTA bypasses; failure restores CTA gracefully.
- E2E: After build, visit `/start` (or entry route) and confirm the above.

Risks & Mitigations
- Surprise auto‑nav: Provide clear Cancel; remember prior cancel to disable on return.
- Network variability: Keep CTA enabled and idempotent; provide non‑blocking feedback.
- Scope creep: No campus picker, no auth here; defer to onboarding flows.

References
- UI guidelines (tokens, motion, accessibility): UI_GUIDELINES.md:1
- Third‑party UI sourcing policy: docs/ux/THIRD_PARTY_UI_POLICY.md:1
- Patterns Library (chips, pills, sheets): docs/ux/PATTERNS_LIBRARY.md:1
- E2E mini app usage: AGENTS.md:1 (apps/e2e notes)
