# HIVE Design TODO — Week 1 Foundations

Last updated: 2025-10-22

## How to read this
- Status uses the same `[ ]` / `[x]` convention as the platform-wide `TODO.md`.
- Items link back to the source spec or code path so builders can pick up without guessing.
- “Next check” bullets describe how we’ll verify progress with Storybook or live routes.

### Sections in this Full Checklist
- Brand System (global tokens)
- Atoms (global)
- Molecules (global)
- Layouts & Flows (global shells)
- Sections — Full Checklist
  - Feed
  - Spaces
  - Profile
  - Rituals
  - HiveLab
  - Onboarding & Auth
  - Notifications
  - Admin/Ops
- Cross‑Cutting Acceptance
- Completed Summary + References

## Brand System
- [x] Core palette locked to gold (`#FFD700`), black, white with light/dark roles (`packages/ui/src/brand/brand.css:11`). Next check: run Storybook toolbar → select `Hive` theme to confirm tokens apply.
- [x] Motion tokens defined for micro/fast/standard/smooth interactions (`packages/ui/src/brand/brand.css:39`). Next check: audit `tooltip.css` & `popover.css` once motion toggles ship.
- [ ] Typography scale + usage guidance exported (need docs tying Geist Sans weights to components). Next check: draft usage grid in Storybook Typography story.
- [ ] Global easing/duration spec captured in docs (currently inline comments only). Next check: document in `docs/design/motion-spec.md` before enabling reduced-motion toggles.

## Atoms (Storybook `Atoms/*`) — Full Checklist
- [x] Buttons refresh (gold, monochrome, outline) with motion polish (`packages/ui/src/components/ui/button.css:1`). Next check: Snapshot hover/pressed contrast in dark mode.
- [x] Input/TextField stack aligned to brand neutrals with focus rings (`packages/ui/src/components/ui/input.css:1`). Next check: optionally layer placeholder fade per audit item 2.
- [x] Checkbox & Radio restyled with gold focus state, circle indicators (`packages/ui/src/components/ui/checkbox.css:1`, `.../radio.css:1`). Next check: verify dark-mode contrast (todo from audit outstanding).
- [x] Textarea auto-resize + size variants with GPT-like expansion (`packages/ui/src/components/ui/textarea.tsx:52`). Next check: add tests for min/max rows + long content.
- [x] Toggle (switch) spacing + alignment with form field (`packages/ui/src/components/ui/switch.css:1`). Next check: confirm `FormField` layout alignment when used inline.
- [x] Avatar now represents a portrait profile card (3:4 ratio) with Hive gold edge lighting (`packages/ui/src/components/ui/avatar.tsx:9`, `packages/ui/src/components/ui/avatar.css:2`). Next check: confirm rectangular primitive works across roster + grid layouts; keep AvatarCard for richer overlays.
- [x] Alert surface refreshed with Hive icon framing, gradients, and accent rail (`packages/ui/src/components/ui/alert.css:1`). Next check: validate against moderation/Feed use cases and add integration screenshot to design changelog.
- [x] Select popover and scroll affordances restyled with calm surface + minimal motion (`packages/ui/src/components/ui/select.css:1`). Next check: run long-list story to confirm scroll fades behave in both light/dark themes.
- [x] Toaster duplication removed; single source of truth at `organisms/toaster` (Hive crest + quiet capsule). Notes: old `components/ui/toaster.tsx` and `components/ui/sonner.tsx` deleted.
- [x] Progress/Spinner minimal skins to match alerts/toasts (reduced glow; subtle ring; reduced‑motion honored) (`packages/ui/src/components/ui/progress.tsx:1`, `packages/ui/src/atoms/spinner.tsx:1`). Next check: review Spinner sizes and Progress thickness in Storybook.
- [x] Slider handle + track polished; neutral fill; focus ring; reduced-motion (`packages/ui/src/components/ui/slider.tsx:1`). Next check: Range & marks story.
- [ ] Slider: gold range fill confirmed on both themes; add marks story (thin neutral ticks).
- [x] Link underline/focus updated; neutral visited; accessible ring; animated underline option (`packages/ui/src/atoms/link.tsx:1`, `packages/ui/src/atoms/link.css:1`). Next check: External/subtle + animation toggle in Storybook.
- [ ] Typography atom audit (scale, weight usage, letter-spacing defaults) (`packages/ui/src/atoms/typography.tsx`).
- [ ] Separator contrast pass in dark theme (`packages/ui/src/atoms/separator.tsx`).
- [x] Card hover/focus polished — shadowless slow expansion + visible focus ring; interactive variant (`packages/ui/src/components/ui/card.tsx:1`, stories `Atoms/Card`).
- [x] ExpandableCard — hover/focus reveal section with gradient fade; media/compact/action variants; stories present (`packages/ui/src/molecules/expandable-card.tsx:1`, `packages/ui/src/stories/ExpandableCard.stories.tsx:1`).

## Molecules — Full Checklist
- [~] FormField integrates refreshed inputs, toggles, inline labels (`packages/ui/src/molecules/form-field.tsx:35`). Next check: responsive label widths + a11y pass.
- [~] AvatarCard portrait layout consumes new avatar shapes and overlays (`packages/ui/src/molecules/avatar-card.tsx:90`). Next check: verify across list/grid densities.
- [~] Toast stack tuned to OpenAI/Vercel minimalism (soft shadow, no blur; action/close toned down) (`packages/ui/src/components/ui/toast.tsx:1`, `packages/ui/src/organisms/toaster.tsx:1`). Next check: finalize icon quiescence + stacking clip.
- [ ] Dock widgets (Stories, Tools, Resources) need brand polish + real fixtures (`packages/ui/src/organisms/spaces/context-rail.tsx:120`). Next check: create fixtures per Spaces spec §2.
- [x] DropdownMenu — aligned surface/hover/separators with Select (`packages/ui/src/components/ui/dropdown-menu.css:1`, `packages/ui/src/components/ui/dropdown-menu.tsx:1`). Next check: review WithSections, LongList, Checkbox/Radio, Submenu stories.
- [x] InlineNotice — tone aligned with Alert (neutral surface + accent rail; reduced-motion) (`packages/ui/src/molecules/inline-notice.tsx:1`, `packages/ui/src/molecules/inline-notice.css:1`). Next check: review Variants story across themes.
- [x] Command (palette) — list surface + item focus parity with Select (`packages/ui/src/components/ui/command.css:1`, `packages/ui/src/components/ui/command.tsx:1`). Next check: verify CommandPalette stories (Default, States) for hover/selected/empty.
- [x] Neutral interaction washes tokenized (`--wash-hover`, `--wash-selected`) and applied to Select/Dropdown/Command; disabled contrast improved; InlineNotice role semantics fixed. References: `packages/ui/src/brand/brand.css:1`, `packages/ui/src/components/ui/{select,dropdown-menu,command}.css:1`, `packages/ui/src/molecules/inline-notice.tsx:1`.
- [x] Breadcrumb — truncation + aria-current + optional collapse (`maxVisible`) with stories (Default, Truncated, LongLabels). Files: `packages/ui/src/molecules/breadcrumb.tsx:1`, `packages/ui/src/stories/Breadcrumb.stories.tsx:1`.
- [~] Dialog/Sheet/Popover/Accordion/Tabs — unify motion tokens, borders, focus rings (`packages/ui/src/molecules/{dialog,sheet,popover,accordion,tabs}.tsx`). Next check: confirm reduced-motion.
  - [x] Tooltip tone updated (neutral surface; subtle gold border/arrow; minimal shadow; reduced-motion) (`packages/ui/src/components/ui/tooltip.css:1`).
- [ ] Banner — success/info/warning variants aligned to Alert (`packages/ui/src/molecules/banner.tsx:1`).
- [ ] Breadcrumb — spacing, truncation, keyboard order (`packages/ui/src/molecules/breadcrumb.tsx:1`).
- [ ] SegmentedControl — active/hover states, reduced-motion (`packages/ui/src/molecules/segmented-control.tsx:1`).
- [ ] SearchInput — clear affordance, focus rings (`packages/ui/src/molecules/search-input.tsx:1`).
- [ ] Pagination — ellipsis + keyboard order (`packages/ui/src/molecules/pagination.tsx:1`).
- [ ] TagInput/CheckboxGroup/FieldText — brand/focus/invalid parity (`packages/ui/src/molecules/{tag-input,checkbox-group,field-text}.tsx`).
- [ ] EmptyState — icon tone + spacing; add stories (`packages/ui/src/molecules/empty-state.tsx:1`).

## Organisms — Full Checklist
- [~] Toaster — crest icon, quiet capsule, minimal container (`packages/ui/src/organisms/toaster.tsx:1`, `packages/ui/src/components/ui/toast.tsx:1`). Next check: swipe + stacking motion balance.
- [~] DashboardHeader — spacing/typography/portrait atom adoption (`packages/ui/src/organisms/dashboard-header.tsx:1`).
- [~] StepperHeader — separators + motion tokens (`packages/ui/src/organisms/stepper-header.tsx:1`).
- [~] Auth/SignInCard — surface + CTAs updated to tokens (`packages/ui/src/organisms/auth/sign-in-card.tsx:1`).
- [~] OnboardingFrame — panel spacing + motion, reduced-motion handling (`packages/ui/src/organisms/onboarding/onboarding-frame.tsx:1`).
- [~] Profile (header/overview/…) — adopt portrait atom; verify contrast (`packages/ui/src/organisms/profile`).
- [~] Spaces (header, discovery cards, Dock, queues) — adopt refreshed Alerts/Select/InlineNotice; verify shadows and list density (`packages/ui/src/organisms/spaces`).
- [ ] HiveLab canvas and rails — unify borders/shadows/tokens; add stories (`packages/ui/src/organisms/hivelab`).

## Layouts & Flows — Full Checklist (Deferred until Molecules/Organisms complete)
 - [ ] App Shell — Sidebar Left (shadcn v0.7): compose `packages/ui/src/components/app-sidebar-hive.tsx` with `HeaderBar`, `Content`, optional `ContextRail`; support 60/40 + 65/35. Scaffold `packages/ui/src/organisms/app-shell.tsx`, `header-bar.tsx`, `context-rail.tsx`, and `packages/ui/src/stories/Layouts.AppShell.stories.tsx`. Stories: Layouts/AppShell/Sidebar. Acceptance: skip link, sidebar overlay focus trap, reduced‑motion disables translations.
 - [ ] Spaces Shell: compose SpaceHeader + Tabs + Content + optional ContextRail + bottom Composer. Stories: Layouts/Spaces/Shell (Feed/Calendar/About; empty states). Controls: `NAV_DETAIL_MODE`, layout ratio (60/40, 65/35), rail on/off. Acceptance: no layout shift on tab/rail toggle; reduced‑motion respected; pinned cluster ≤2 with expiry. Reference: `docs/design/spaces/SPACES_SHELL_LAYOUT.md`.
- [ ] Feed Shell (Campus/Public): filter bar + feed + optional right rail. Stories: Layouts/Feed/Shell.
- [ ] Profile Shell: header (portrait), tabs, content. Stories: Layouts/Profile/Shell.
- [ ] Onboarding Shell: stepper header + stage panel + footer actions. Stories: Layouts/Onboarding/Shell.
- [ ] Rituals Shell: spotlight header + participation + results. Stories: Layouts/Rituals/Shell.
- [ ] HiveLab Shell: toolbar + left/right rails + canvas. Stories: Layouts/HiveLab/Shell.
- [ ] Overlays: modal + sheet patterns (mobile/desktop). Stories: Overlays/Sheet, Overlays/Modal.
- [ ] Motion/easing matrix for navigation transitions (feed → detail sheet; calendar list ↔ month). Stories: motion toggles per layout.
- Reference: `docs/design/layouts/LAYOUT_SYSTEM.md` for definitions and verification.

## Research / Validation Backlog — Full Checklist
- [ ] Dark-mode contrast audit across all atoms using updated tokens. Next check: run axe/Storybook accessibility pass.
- [ ] Avatar usage audit: replace ad-hoc rounding/size classes with intended portrait-card atom; identify cases needing a tiny identity chip. Candidates: `packages/ui/src/components/nav-user.tsx:1`, Spaces comment lists, moderation queue.
- [ ] Usability test plan for Recommended tab ranking blends (activity vs affinity). Next check: coordinate with Spaces PM before flipping blend flag.
- [ ] Brand voice overlays in Feed & Rituals (copy tone). Next check: align with `docs/business/HIVE_BRAND_PRIMER.md` guidance and write microcopy samples.

## Sections — Full Checklist (Atoms → Molecules → Organisms → Layouts)

Note: Use the App Shell (shadcn v0.7) once available for all shells; do not fork layout primitives per section.

### Feed (Campus/Public)
- Atoms
  - [ ] Button, Link, Tooltip, Badge — audit for density mode
  - [ ] Inline Alert for feed-level system banners (quiet tone)
  - [ ] Typography scale for long posts (truncate rules)
- Molecules
  - [ ] FilterBar (chips, segmented control, search)
  - [ ] BoardCard variants (announcement/standard/poll/event) refreshed to tokens
  - [ ] InlineNotice for policy nudges in composer/first post
  - [ ] Pagination/Infinite loader (skeletons, a11y)
- Organisms
  - [ ] FeedList (virtualized optional; keyboard nav between cards)
  - [ ] PinnedCluster (≤2 items, auto-expire, subdued tone)
  - [ ] Composer (bottom) with action shelf; media scan cues
- Layouts
  - [ ] Feed Shell (header + filter bar + list + optional right Dock)
  - Controls: density toggle, reduced-motion, Dock on/off
  - Acceptance: no layout shift when filters change or Dock toggles; pinned cluster respects limits

### Spaces — Pages & Interfaces (Atoms → Molecules → Organisms)

- Header & Tabs (global across pages)
  - Atoms: Avatar (portrait), Badge, Link, Tooltip, Tabs
  - Molecules: InlineNotice (policy prompts), Breadcrumb (optional)
  - Organisms: SpaceHeader (identity, join/leave, role chips); Tabs bar (sticky)
  - Status: [ ] SpaceHeader restyle; [x] Tabs underline/neutral hover; [x] Breadcrumb truncation

- Feed (Post Stream)
  - Atoms: Button, Badge, Tooltip, Link, Avatar, Progress/Spinner
  - Molecules: BoardCard.Standard, BoardCard.Announcement, BoardCard.Poll, BoardCard.Event; InlineNotice (preflight); Pagination/Infinite loader; ExpandableCard (for Stories/widgets)
  - Organisms: FeedList (virtualized optional), PinnedCluster (≤2, auto-expire), Composer (bottom) with action shelf; PostDetail (Sheet/Route via NAV_DETAIL_MODE)
  - Status: [x] BoardCard.* scaffolded (stories added); [x] Composer actions present; [x] FeedList scaffold; [x] PinnedCluster present; [x] PostDetail (sheet) scaffold; [ ] Virtualization pass; [ ] Composer policy preflight variants
  - Files: 
    - UI components: `packages/ui/src/organisms/spaces/{feed-list.tsx,composer.tsx,post-detail.tsx}`
    - Existing variants reused: `packages/ui/src/organisms/spaces/board-card-*.tsx`, `packages/ui/src/organisms/spaces/pinned-cluster.tsx`, `packages/ui/src/organisms/spaces/composer-actions.tsx`
    - Stories: `packages/ui/src/stories/spaces/post-stream/*`
  - Next check (Storybook):
    - Open `Organisms/Spaces/BoardCard/*` stories → verify tokens, hover/focus, dark mode
    - Open `Organisms/Spaces/Composer` → ≤6 actions, focus ring, reduced‑motion
    - Open `Organisms/Spaces/FeedList` → Pinned (≤2) above Recent, infinite loader sentinel
    - Open `Organisms/Spaces/PostDetail` → sheet mode toggles and keyboard close
  - Acceptance: keyboard nav across cards; policy cues visible; no layout shift on load; pinned cluster subdued

- Calendar
  - List view
    - Atoms: Button, Badge, Tooltip, Separator
    - Molecules: EventCard (RSVP + undo; check-in state), DateGroup headers
    - Organisms: CalendarList, EventSheet
  - Month view
    - Molecules: DayCell (events preview), MonthNav
    - Organisms: CalendarMonth
  - Status: [ ] EventCard restyle; [ ] List/Month parity; [ ] RSVP + undo tokens; [ ] EventSheet
  - Acceptance: List default; Month for planning; no scroll bleed; reduced-motion for sheet

- About — About System (Space identity module)
  - Surfaces & IA
    - [x] Full page route `/spaces/[spaceId]/about` (apps/web/src/app/spaces/[spaceId]/about/page.tsx:1)
    - [x] Context rail preview widget (packages/ui/src/organisms/spaces/context-rail.tsx:221)
    - [x] AboutSection organism (view/edit scaffold) (packages/ui/src/organisms/spaces/about-section.tsx:1)
    - [ ] Header: quick stats (members, upcoming count) + verified/type chips
    - [ ] Above-the-fold blocks: Overview, Tags, Links; Governance & Safety summary aligned with Settings
  - Data model (spec §4 About)
    - Core fields: `description`, `tags[]`, `settings.featuredLinks[]`
    - Visual (deferred behind flag): `coverImageUrl`, `accentColor`, `tagline`
    - Derived: Policies summary from join/posting/visibility/media policy; Contacts from `helperIds`
    - Provenance (leaders): version log entries (who/when/what)
  - Backend/API
    - [ ] Add `PATCH /api/spaces/[spaceId]/about` to update: `description`, `tags[]`, `featuredLinks[]` (apps/web/src/app/api/spaces/[spaceId]/about/route.ts)
    - [ ] Service method `spaceService.updateAbout(...)` with role checks (leaders/admin only) (apps/web/src/server/spaces/service.ts:1)
    - [ ] Link allowlist + URL safety lint; reject non-https and blocked domains
    - [ ] Audit/version entry on save (append immutable diff to `spaces/{id}/audits`) and emit telemetry
    - [ ] Unit tests: validator, service auth, API contract (apps/web/src/app/api/spaces/[spaceId]/about/route.test.ts)
    - [ ] Firestore indexes/rules (if client-facing later); for now Admin SDK only
  - Application services & telemetry
    - [ ] Telemetry sink for About: `about_view`, `about_edit_start`, `about_edit_save`, `about_link_click` (apps/web/src/server/spaces/telemetry/console-space-about-telemetry.ts)
    - [ ] Wire events in route/client; include `spaceId`, `viewerRole`, counts
  - UI/UX
    - [x] View/Edit scaffold in `AboutSection` (inline for v1)
    - [ ] Wire `onSave` in AboutClient to call API and optimistic refresh (apps/web/src/app/spaces/[spaceId]/about/AboutClient.tsx:1)
    - [ ] Edit affordance limited to leaders (role-aware rendering)
    - [ ] Governance & Safety copy: derive from policies; InlineNotice tone; link to Settings
    - [ ] Add quick stats row (members, upcoming events count); CTA chips to Members/Calendar
    - [ ] Storybook: `Spaces/About` stories (view + edit + empty states)
  - Feature flags
    - `ABOUT_ENABLE_COVER` — enables cover upload + accent picker
    - `ABOUT_ENABLE_VERSION_HISTORY` — shows version log to leaders
    - `ABOUT_RAIL_SUMMARY` — toggles 3-line summary in context rail
  - Acceptance
    - Leaders can edit description/tags/links with lints and undo/cancel
    - Non-leaders see clean read view; Contacts redacted off-campus (later)
    - Links open in new tab; blocked domains rejected with friendly error
    - A11y: keyboard reachable edit/save; visible focus; reduced-motion honored
  - How to verify (non‑dev)
    - Visit `/spaces/{id}/about` → see Overview, Tags, Links, Governance summary
    - As leader: edit description, add tag, add link → Save → refresh shows updates
    - As member: edit controls hidden; attempting PATCH returns 403
    - Click a link → opens in new tab; telemetry logs `about_link_click`
  - Out of scope (v1)
    - Cover image + accent (behind flag)
    - Version history UI (log only initially)
    - Contacts redaction by campus enrollment (policy plumbing TBD)

- Context Rail (optional, desktop)
  - Widgets: Stories, Upcoming Events, Tools Quick Actions, Resources
  - Atoms: Button, Link, Tooltip, Badge
  - Molecules: StoryCard (use ExpandableCard), EventMiniCard, ToolQuickAction, ResourceLink
  - Organisms: ContextRail (stacked widgets)
  - Status: [ ] Stories + Events first; [ ] Tools/Resources later
  - Acceptance: ≤3 widgets without scroll; neutral chrome; mobile hidden

- Moderation & Safety
  - Queues: Media Approvals, Reports, Hidden Posts
  - Atoms: Checkbox, Button, Badge, Tooltip
  - Molecules: ModerationRow (content + flags), Filters/Chips
  - Organisms: ModerationQueue, SafetyQueue
  - Status: [ ] Density + token restyle; [ ] a11y focus for actions; [ ] Inline policy messages

- Discovery (Spaces grid)
  - Surfaces: DiscoveryGrid, DiscoveryCard (ranked), Filters
  - Atoms: Button, Badge, Avatar, Tooltip
  - Molecules: SpaceDiscoveryCard (image + meta), FilterChips
  - Organisms: SpaceDiscoveryGrid (pagination/infinite)
  - Status: [ ] Card restyle to tokens; [ ] rank badges; [ ] empty state

- Members (Roster)
  - Atoms: Avatar (portrait), Badge, Select
  - Molecules: AvatarCard (compact/detailed), RoleMenu
  - Organisms: MembersRoster (search, filters, role updates)
  - Status: [ ] Adopt portrait atom everywhere; [ ] role-change flow a11y

- Cross‑section Interfaces
  - Post/Media Policies: InlineNotice; preflight cues; “leaders review” copy
  - Role‑aware UI: disable/hide actions; tooltips disclose why
  - Detail routing: NAV_DETAIL_MODE sheet vs route; back affordance
  - Telemetry: Feed composer starts→publishes; pin CTR; RSVP→check‑in; moderation latency

- Layouts (deferred until molecules/organisms complete)
  - [ ] Spaces Shell (Feed/Calendar/About) — see `docs/design/spaces/SPACES_SHELL_LAYOUT.md`
  - Controls: NAV_DETAIL_MODE, 60/40 vs 65/35, Dock on/off
  - Acceptance: sticky tabs; sheet vs route detail verified; empty states brand‑consistent

### Profile
- Atoms
  - [ ] Avatar (portrait), Badge, Link focus visibility
- Molecules
  - [ ] ProfileHeader summary (name, handle, meta, actions)
  - [ ] Connections panel (grid + hover states)
  - [ ] Stats strip (tokens + separators)
  - [ ] Tools panel (cards with role-aware actions)
  - [ ] Privacy banner (InlineNotice tone)
- Organisms
  - [ ] ProfileOverview (modular sections)
- Layouts
  - [ ] Profile Shell (header + tabs + content); acceptance: no scroll bleed, keyboard reachable tabs

### Rituals (Campus-wide, time-boxed)
- Atoms
  - [ ] Progress/Spinner (calm ring) for live participation
- Molecules
  - [ ] Spotlight header (timer, status, CTA)
  - [ ] Participation card(s) — ballot/poll/bracket minimal skins
  - [ ] Results panel (bar/percent with a11y labels)
- Organisms
  - [ ] Rituals surface (flow: spotlight → participate → results)
- Layouts
  - [ ] Rituals Shell (full-bleed with readability rails); acceptance: reduced‑motion respects live updates

### HiveLab (Canvas + Rails)
- Atoms
  - [ ] Slider/Inputs/Select for properties panel (token borders/rings)
- Molecules
  - [ ] Element palette (searchable, draggable)
  - [ ] Properties panel (sections, accordions)
  - [ ] Template browser (grid; empty states)
- Organisms
  - [ ] Canvas shell (zoom/pan, snap; keyboard panning)
  - [ ] Rails (left elements, right properties), Top toolbar
- Layouts
  - [ ] HiveLab Shell (toolbar + left/right rails + canvas); acceptance: no scroll bleed; z‑layers correct

### Onboarding & Auth
- Molecules
  - [ ] Step cards (FormField + actions; a11y)
  - [ ] StarterSpaces selector (cards + selection state)
- Organisms
  - [ ] OnboardingFrame (progress, back/next, reduced-motion)
  - [ ] SignInCard (tokens + CTA hierarchy)
- Layouts
  - [ ] Onboarding Shell; acceptance: focus order + skip link; error states visible

### Notifications (Toast/Inline alerts)
- Molecules
  - [ ] Toast stories with swipe/stacking clip; variant color audit
  - [ ] InlineNotice variants documented
- Organisms
  - [ ] Toaster (crest icon capsule quiet); acceptance: motion tokens match alerts

### Admin/Ops (later)
- [ ] Dashboard widgets parity with tokens; use compact density; ensure no drift from student surfaces.

### Cross-Cutting Acceptance (per section)
- [ ] Focus rings + keyboard traversal across tabs, lists, sheets
- [ ] Reduced-motion disables translations; opacity only
- [ ] Dark-mode border/separator/scroll-fade contrast
- [ ] No duplicate exports; one import path per component
- [ ] Dark-mode contrast audit across all atoms using updated tokens. Next check: run axe/Storybook accessibility pass.
- [ ] Avatar usage audit: replace ad-hoc rounding/size classes with intended portrait-card atom; identify cases needing a tiny identity chip. Candidates: `packages/ui/src/components/nav-user.tsx:1`, Spaces comment lists, moderation queue.
- [ ] Usability test plan for Recommended tab ranking blends (activity vs affinity). Next check: coordinate with Spaces PM before flipping blend flag.
- [ ] Brand voice overlays in Feed & Rituals (copy tone). Next check: align with `docs/business/HIVE_BRAND_PRIMER.md` guidance and write microcopy samples.

## Completed Summary (current)
- Tokens: color, motion set; typography scale pending doc.
- Atoms shipped: Button, Input, Checkbox, Radio, Textarea (auto-resize), Switch, Avatar (portrait), Alert, Select.
- Molecules progressed: Select popover + long list; FormField, AvatarCard, Toast stack require final verification in Storybook.
- Organisms progressed: Toaster updated to crest + quieter capsule; broader organism passes pending.

References
- Layout System: `docs/design/layouts/LAYOUT_SYSTEM.md`
- Spaces Shell: `docs/design/spaces/SPACES_SHELL_LAYOUT.md`
- Molecules & Organisms audit: `docs/design/COMPONENT_AUDIT_MOLECULES_ORGANISMS.md`

## Notes
- Keep backend-first rule: do not ship UI polish that introduces new contract shapes without service coverage.
- Update this document alongside `TODO.md` whenever a design slice moves; archive completed items to `docs/design/changelog.md` (pending creation).
