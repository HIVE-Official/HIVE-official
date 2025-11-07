HIVE UI/UX Checklist (Web-First)
================================

Purpose
- Provide a single, actionable checklist for UI/UX work across surfaces, aligned to our web-first, security, and performance guardrails.
- Use this before merging PRs that add or change UI.

Foundations & Tokens
- [ ] Use semantic tokens from `packages/tokens/*` and `packages/ui/src/styles.css` (no raw hex).
- [ ] Respect mode tokens in `packages/tokens/src/topology/mode-tokens.json` (calm/focus/warm/celebrate/urgent) and reduced motion.
- [ ] Include brand focus styles from `packages/ui/src/brand/brand.css`.
- [ ] Theme-safe: no hard-coded colors/spacing; prefer Tailwind token utilities.

Accessibility (WCAG 2.2 AA)
- [ ] Keyboardable: all interactive elements tabbable with visible focus ring; roving tabindex for composite controls (tabs, lists).
- [ ] Touch targets ≥ 44×44px; safe-area insets respected.
- [ ] Color contrast meets AA using token palette; verify in Storybook a11y.
- [ ] Motion honors `prefers-reduced-motion`; provide non-animated fallbacks.
- [x] Overlays: focus trap, ESC close, return-focus to trigger; screen readers announce open/close (`Sheet`, `ActionSheet`, `Popover`, `Tooltip`, `ContextMenu`, `MediaViewer`, `HiveConfirmModal`).
- [ ] Proper roles/aria for menus, tooltips, popovers; labels for inputs; Live region for ephemeral updates when needed.

Recent Updates (Nov 2025)
- ✅ Feed: Added role="main" + aria-labelledby; live region announces newly loaded items; empty state strengthened.
- ✅ Rituals: Added role="main", tablist aria-labels, list/listitem semantics for grids.
- ✅ Onboarding: Academics step now shows skeleton while catalog loads and announces loading/loaded states via aria-live.

Performance (p75 TTI ≤ 2.5s Feed/Spaces)
- [ ] Dynamic imports for heavy/low-frequency components; minimal deps.
- [ ] Blur‑up images; avoid layout thrash (use transform/opacity); memoize lists.
- [ ] Skeletons appear if load > 120ms; `loading.tsx` present for routes.
- [ ] Prefetch within same-origin; leverage caching/ISR/SSR safely.

Security & Auth (Web)
- [ ] All fetches go through `secureApiFetch` (cookies included) or server handlers wrapped by `withSecureAuth`.
- [ ] No auth tokens in localStorage for production; rely on HttpOnly session cookies.
- [ ] Admin/protected mutations include CSRF header (`X-CSRF-Token`).
- [ ] Campus isolation enforced on protected routes and queries.

Networking & Fetch
- [ ] Single fetch helper adds required headers and `credentials: 'include'` by default.
- [ ] No cross-origin calls without explicit CORS review.
- [ ] Rate limits respected on admin paths; consistent error shapes.

Interaction & UX Budgets
- [ ] One primary CTA per card; secondary actions are de-emphasized.
- [ ] Composer ≤ 6 actions; Tool ≤ 2 actions and ≤ 12 fields.
- [ ] Detail views open as sheet (`Z1`) not route; sheet-first navigation.
- [ ] Empty states are first-class (actionable, instructive).

Feature Flags & Isolation
- [ ] Gate risky/high-variance features via feature flags (`apps/web/src/lib/feature-flags.ts`).
- [ ] Respect campus scoping in UI and data access patterns.

Analytics & Observability
- [ ] Use typed analytics helper (`apps/web/src/lib/analytics/events.ts`) for UI events.
- [ ] Include campus/persona/device metadata; no PII.
- [ ] Emit required events per surface (e.g., `feed_card_action`, `feed_tab_change`, ritual events).

States & Skeletons
- [ ] Loading, empty, error, success states covered in @hive/ui and mirrored at route level.
- [ ] Skeletons visually match final layout and respect safe area.

Responsive & Layout
- [ ] Mobile remaps rail to Now card + Today drawer; bottom navigation variants where applicable.
- [ ] Grid/Stack layouts use fluid units; verify at key breakpoints.

Storybook & QA
- [ ] Stories for atoms → molecules → organisms with axe checks and realistic fixtures.
- [ ] Visual baselines for shell, discovery grids, and high-traffic views.
- [ ] Micro-components (chips/badges) documented in `10-MicroComponents` stories.
- [x] Spaces: SpaceCard story with realistic fixtures (`packages/ui/src/stories/13-Spaces-Communities/Spaces.SpaceCard.stories.tsx`).

Duplication & Legacy Cleanup (Required)
---------------------------------------
When building or wiring any UI, audit for duplicates and clean up legacy code as part of the work. Prefer promoting components into `@hive/ui` and removing ad‑hoc app copies.

- Canonical locations
  - [ ] Shared components live under `packages/ui/*`; apps should import from `@hive/ui`.
  - [ ] Feature flags, secure fetch, and middleware live under `apps/web/src/lib/*`.
  - [ ] Validation and topology live under `packages/validation/*` and `packages/tokens/*`.

- Audit commands (run before opening PR)
  - [ ] `rg -n "PostCard\W|FeedCard|EventCard|RecapCard"` to find duplicate card implementations.
  - [ ] `rg -n "ToastProvider|ToastManager|showToast\(|notification-toast|modal-toast-system"` to find duplicate toast systems.
  - [ ] `rg -n "secureApiFetch|withSecureAuth|credentials:\\s*'include'"` to verify fetch usage consistency.
  - [ ] `rg -n "RitualStrip|EventSheet|ExplainabilityChip"` to ensure single source per organism/micro.

- Known duplicate hotspots (migrate to canonical)
  - [ ] PostCard: consolidate on `packages/ui/src/atomic/organisms/post-card.tsx`; remove or wrap `apps/web/src/components/social/post-card.tsx`.
  - [ ] EventCard: extract shared card to `packages/ui/src/organisms/events/EventCard.tsx` and replace `apps/web/src/components/feed/enhanced-event-card.tsx` and inline event cards in `apps/web/src/app/events/page.tsx`.
  - [x] SpaceCard: extract to `packages/ui/src/atomic/organisms/space-card.tsx`; remove inline card from `apps/web/src/app/spaces/page.tsx`.
  - [x] Admin dashboard UI: consolidate on `@hive/ui` (`AdminShell`, `AdminMetricCard`, `AuditLogList`, `ModerationQueue`); remove bespoke layout from `apps/web/src/app/admin`.
  - [ ] Toast/Notification: choose a single toast system; consolidate `packages/ui/src/systems/modal-toast-system.tsx`, `packages/ui/src/atomic/molecules/notification-toast-manager.tsx`, and `apps/web/src/hooks/use-toast.tsx` usage. Prefer `@hive/ui` provider + manager.
  - [ ] Feed service paths: ensure a single server-side feed service and consistent client usage.

- Consolidation steps (include in PR description)
  - [ ] Identify duplicate(s) and select canonical file/path.
  - [ ] Promote shared logic into `@hive/ui` (or `packages/*`), preserving props and a11y contracts.
  - [ ] Replace app imports with `@hive/ui` exports; remove dead code or add `@deprecated` header with migration note.
  - [ ] Update stories to point at canonical components; add visual/a11y checks.
  - [ ] Verify no cross-origin fetch regressions; ensure typed analytics unchanged.
  - [ ] Add a brief “Legacy Cleanup” section to PR with files removed/aliased and rationale.

Feed & Rituals Specific (when applicable)
- [ ] Explainability chip present on campus items; fairness cap ≤ 3 items/space/page enforced upstream.
- [ ] Tablist (Today/Week/Updates) uses roving tabindex; maintains scroll per tab.
- [ ] Ritual strip supports keyboard scroll and opens EventSheet overlay.
- [ ] Route-level skeleton uses shared `FeedLoadingSkeleton` (`apps/web/src/app/feed/loading.tsx` → `@hive/ui`) and has Storybook coverage (`06-Pages/Feed/Loading`).

Onboarding & Auth Specific (when applicable)
- [ ] Auth layout + status sourced from `@hive/ui`; no local copies under `apps/web/src/components/auth`.
- [ ] Magic-link verification (`/auth/verify`) shows timer + alert states from shared components; expired flow (`/auth/expired`) uses production resend timer and tokens.
- [ ] Campus selection and waitlist flows reuse shared `SchoolSelector` molecule with loading skeleton.
- [ ] Onboarding wizard composes `@hive/ui` templates for identity, academics, interests, confirm, and success.
- [ ] Interest step uses `InterestSelector` molecule; selection caps (3-6) enforced with analytics hooks.
- [ ] Photo step uses `HiveAvatarUploadWithCrop` with accessible crop controls and error states.
- [ ] `useOnboardingStep` (autosave + optimistic) integrated; Storybook stories cover success/error/retry.
- [ ] Route-level skeleton present for `/onboarding` using shared feed/auth skeleton primitives.

Profile Specific (when applicable)
- [ ] Public view uses `ProfileViewLayout`; privacy levels respected per widget.
- [ ] Ghost mode redacts data with accessible copy; presence indicators hidden.
- [ ] Route-level skeleton present (`apps/web/src/app/profile/[id]/loading.tsx`) and mirrors layout.
- [ ] Storybook parity for loading and core widgets (identity/activity/spaces/connections).
- [ ] Analytics: emit `profile_view`, primary CTA, and privacy toggles.

References
- Guardrails and taxonomy: `docs/UX-UI-TAXONOMY.md`
- Layout guide: `docs/UX-UI-LAYOUT-GUIDE.md`
- Atomic design reference: `docs/UX-UI-ATOMIC-DESIGN.md`
- Feature topology: `docs/FEATURE_TOPOLOGY_REGISTRY.md`
