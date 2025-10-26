# HIVE Landing Page — QA Checklist (E2E)

Owner: Design System Guild • Surface: Public Landing (`/`)

Acceptance Criteria — Verify

1) State toggling
- Set `localStorage.setItem('hive.landing.flags', JSON.stringify({ state: 'prelaunch' }))` then refresh.
- Primary CTA label is “Enter your campus”. UB card shows “First Wave” badge with action “Join UB”.
- Set `localStorage.setItem('hive.landing.flags', JSON.stringify({ state: 'live' }))` then refresh.
- Primary CTA label is “Enter”. UB action becomes “Enter UB”. No code changes required.

2) UB pinned and status
- UB (University at Buffalo) appears first with First Wave badge in pre‑launch and “Enter UB” in live.

3) No product UI
- No app chrome, screenshots, or in‑product components are visible. The shell is hidden on `/`.

4) Search behavior
- Typing in “Find your campus” filters by name/alias (case‑insensitive) with ~250ms debounce.
- Empty state shows “Request my campus” if `schoolsRequestEnabled` flag is true.

5) Notify flow
- Click “Notify me” / “Join UB” opens modal.
- Email validation shows inline error when empty/invalid.
- Submitting shows success copy and logs `notify_submitted` with campus + email domain (console).
- If `referralsEnabled` is true, a light nudge appears.

6) Reduced motion
- In OS settings “Reduce motion”, ambient particles are disabled; static page remains crisp.

7) Accessibility
- Landmarks: header, main, footer are present.
- Focus order: Nav → Hero CTA → “See planned schools” → Search → First school card → …
- School cards are fully focusable with visible ring; internal button remains operable.
- Screen reader labels match: cards announce “University at Buffalo — First Wave”; buttons announce “Join UB”, “Enter UB”, “Notify me”, “Enter”.
- Countdown `aria-live` updates no more frequently than each minute.

8) Performance
- LCP under 2.5s (mobile). Run Lighthouse against `/` in dev; ensure images/assets remain minimal.

Flags & Overrides
- URL overrides (no redeploy): `?state=prelaunch|live&countdown=1&schoolsRequest=1&referrals=1`
- Local overrides: `localStorage.setItem('hive.landing.flags', JSON.stringify({ state: 'live', countdownEnabled: true }))`

Telemetry (dev console)
- nav_click (label)
- cta_click (label + state)
- notify_opened / notify_submitted (campus, email domain only)
- enter_clicked (campus) via CTA handoff
- request_opened / request_submitted

Notes
- Keep canvas black+gold, no product UI.
- All styling uses tokens/utilities from `@hive/ui`.
