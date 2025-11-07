# Storybook Audit Report — Current State Analysis

**Date**: November 6, 2025
**Auditor**: Head of Development
**Status**: 🔴 **CRITICAL** — Storybook not production-ready

---

## 🚨 Critical Findings

### Problem 1: **Stories Separated from Components**
- **119 production components** exist in `packages/ui/src/atomic/`
- **Only 2 stories co-located** with components (hive-card, top-bar-nav)
- **140+ stories** exist in separate `packages/ui/src/stories/` directory
- **Result**: Stories drift from production code, no single source of truth

### Problem 2: **Coverage is 1.7%**
- **2 out of 119 components** have co-located stories
- **Coverage**: 1.7% (target: 100%)
- **Gap**: 117 components need stories created

### Problem 3: **Organizational Chaos**
Stories directory structure:
```
src/stories/
├── 00-Foundations/        (Design tokens, not components)
├── 00-System-Overview/    (Meta documentation)
├── 01-Foundation/         (Colors, Motion, Typography)
├── 01-Layout/             (Layout primitives)
├── 02-Atoms/              (Atomic components)
├── 02-Typography/         (Type system)
├── 03-Molecules/          (Molecule components)
├── 04-Controls/           (Form controls)
├── 04-Organisms/          (Organism components)
├── 05-Navigation/         (Nav components)
├── 05-Templates/          (Page templates)
├── 06-Overlays/           (Modals, sheets)
├── 06-Pages/              (Full page examples)
├── 07-Complete-Systems/   (Feature systems)
├── 07-Feedback/           (Toast, alerts)
├── 08-DataDisplay/        (Data viz)
├── 09-A11y-Utility/       (Accessibility utils)
├── 13-Spaces-Communities/ (Spaces slice)
├── 14-Rituals/            (Rituals slice)
├── admin/                 (Admin components)
└── shells/                (Shell components)
```

**Problem**:
- Numbering is inconsistent (00, 01, 02, 04, 05, 06, 07, 08, 09, 13, 14)
- Mix of atomic design + feature slices + utilities
- NOT organized by vertical slice (Feed, Spaces, Profile, HiveLab, Rituals)
- Stories reference components that may not exist in production

### Problem 4: **Mock Components in Stories**
Many stories reference components that don't exist:
- `SpacesExperience` (shell, not production)
- `UniversalShell` (shell, not production)
- Various utility components (ClickAwayListener, FocusTrap, Portal, etc.)

**These are NOT production components** — they're Storybook-only mocks/utilities.

### Problem 5: **Storybook Config is Mock-Heavy**
`.storybook/main.ts` has heavy mocking:
- Mocks `@hive/auth-logic` (entire package)
- Mocks `next/navigation` and `next/router`
- Mocks `firebase-admin` (entire package)
- Mocks `next-themes`

**This creates a disconnect**: Storybook shows mocked behavior, production uses real implementations.

---

## 📊 Component Inventory (By Atomic Layer)

### Atoms (42 components, 0% co-located coverage)
Missing stories:
- action-sheet, alert, aria-live-region, avatar, badge
- button, card, check-icon, checkbox, command
- context-menu, date-time-picker, dialog, file-upload, grid
- hive-confirm-modal, hive-logo, hive-modal, icon-library, input
- label, media-thumb, media-viewer, notification-bell, notification-item
- percent-bar, popover, post-card, presence-indicator, progress
- select, sheet, simple-avatar, skeleton, slider
- switch, tabs, textarea, toast, tooltip

✅ **Has co-located story**: hive-card, top-bar-nav

### Molecules (38 components, 0% co-located coverage)
All missing stories:
- description-list, dropdown-menu, empty-state-compact
- feed-filter-bar, feed-media-preview, feed-post-actions
- feed-ritual-banner, feed-space-chip, filter-chips
- hivelab-element-palette, hivelab-inspector-panel, hivelab-lint-panel, hivelab-tool-library-card
- keyboard-shortcuts-overlay, kpi-delta, navigation-primitives
- notification-card, notification-dropdown, now-card
- pinned-posts-stack, privacy-control, profile-bento-grid
- progress-list, rail-widget, ritual-empty-state, ritual-error-state
- ritual-loading-skeleton, ritual-progress-bar, search-bar
- space-about-widget, space-composer, space-header, space-tools-widget
- stat-card, table, tag-list, today-drawer, user-avatar-group

### Organisms (33 components, 0% co-located coverage)
All missing stories:
- admin/admin-dashboard-primitives, admin/admin-ritual-composer, admin/admin-shell
- feed-card-event, feed-card-post, feed-card-system, feed-card-tool
- feed-composer-sheet, feed-virtualized-list
- hivelab-studio, hivelab-widget
- notification-system, notification-toast-container
- profile-activity-widget, profile-completion-card, profile-connections-widget
- profile-identity-widget, profile-spaces-widget
- ritual-beta-lottery, ritual-card, ritual-feature-drop, ritual-feed-banner
- ritual-founding-class, ritual-launch-countdown, ritual-leak
- ritual-rule-inversion, ritual-strip, ritual-survival
- ritual-tournament-bracket, ritual-unlock-challenge
- space-board-layout, space-post-composer, welcome-mat

### Templates (6 components, 0% co-located coverage)
All missing stories:
- feed-loading-skeleton, feed-page-layout
- profile-view-layout
- ritual-detail-layout, rituals-page-layout
- space-board-template

---

## 🎯 Target State (Per User Direction)

### 1. Organization: **Vertical Slice + Global Foundation**
```
packages/ui/src/
├── atomic/
│   ├── 00-Global/                    # Foundation (start here)
│   │   ├── atoms/
│   │   │   ├── button.tsx
│   │   │   ├── button.stories.tsx    # Co-located
│   │   │   ├── input.tsx
│   │   │   ├── input.stories.tsx
│   │   │   └── ...
│   │   ├── molecules/
│   │   └── organisms/
│   ├── 01-Auth-Onboarding/           # Vertical slice
│   ├── 02-Feed/                      # Vertical slice
│   ├── 03-Spaces/                    # Vertical slice
│   ├── 04-Profile/                   # Vertical slice
│   ├── 05-HiveLab/                   # Vertical slice
│   ├── 06-Rituals/                   # Vertical slice
│   └── 07-Admin/                     # Vertical slice
└── stories/
    └── 00-Foundations/               # Design tokens only (Colors, Motion, Typography)
```

### 2. Coverage: **100%**
- Every production component MUST have a co-located `.stories.tsx` file
- CI enforces this (GitHub Action fails if component without story)

### 3. Story Quality: **Production-Grade**
Each story must show:
- [ ] Default state
- [ ] All variants (for components with variants)
- [ ] Interactive states (hover/focus/active)
- [ ] Error states (if applicable)
- [ ] Loading states (if applicable)
- [ ] Empty states (if applicable)
- [ ] Props table (auto-generated)
- [ ] Usage guidelines (when to use this component)

### 4. Enforcement: **Strict**
- ESLint rule: Component file exists → Story file must exist
- CI check: Build Storybook, fail if any story has errors
- Pre-commit hook: Lint stories for required sections

---

## 🗑️ Cleanup Plan

### Phase 1: **Delete Non-Production Code** (2 hours)
**Delete entirely**:
- `packages/ui/src/stories/` directory (140+ files)
  - Rationale: Stories are separated from components, causing drift
  - Keep: `00-Foundations/` (Colors, Motion, Typography) — move to root
- `packages/ui/src/shells/` directory (if not production)
  - SpacesExperience, UniversalShell (verify with user)

**Result**: Clean slate, only production components remain

### Phase 2: **Restructure Atomic Directory** (4 hours)
Move components from flat structure to vertical slices:

**Current**:
```
packages/ui/src/atomic/
├── atoms/
├── molecules/
└── organisms/
```

**Target**:
```
packages/ui/src/atomic/
├── 00-Global/          # Foundation (Button, Input, Card, Badge)
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── 02-Feed/            # Feed-specific components
├── 03-Spaces/          # Spaces-specific components
├── 04-Profile/         # Profile-specific components
├── 05-HiveLab/         # HiveLab-specific components
├── 06-Rituals/         # Rituals-specific components
└── 07-Admin/           # Admin-specific components
```

**Migration Logic**:
- **Global (00-Global)**: Button, Input, Card, Badge, Avatar, Dialog, Sheet, Toast, Tooltip, etc.
  - Rule: Used in 3+ slices
- **Feed (02-Feed)**: feed-card-*, feed-composer-*, feed-filter-bar, feed-space-chip, etc.
  - Rule: Used only in Feed
- **Spaces (03-Spaces)**: space-*, pinned-posts-stack, now-card, rail-widget, today-drawer
  - Rule: Used only in Spaces
- **Profile (04-Profile)**: profile-*, privacy-control
  - Rule: Used only in Profile
- **HiveLab (05-HiveLab)**: hivelab-*
  - Rule: Used only in HiveLab
- **Rituals (06-Rituals)**: ritual-*
  - Rule: Used only in Rituals
- **Admin (07-Admin)**: admin/*
  - Rule: Used only in Admin

### Phase 3: **Create Stories (Co-Located)** (40 hours)
**Start with Global (00-Global)**:
- Priority 1 (Day 1, 8h): Button, Input, Card, Badge, Avatar (5 most-used atoms)
- Priority 2 (Day 2, 8h): Dialog, Sheet, Select, Checkbox, Switch, Textarea (6 form/overlay atoms)
- Priority 3 (Day 3, 8h): Remaining atoms (Tooltip, Popover, Progress, Skeleton, etc.)
- Priority 4 (Day 4, 8h): Global molecules (SearchBar, DropdownMenu, EmptyState, ErrorState)
- Priority 5 (Day 5, 8h): Global organisms (NotificationSystem, WelcomeMat)

**Then vertical slices** (1 slice per week):
- Week 2: Feed components (12 components)
- Week 3: Spaces components (15 components)
- Week 4: Profile components (10 components)
- Week 5: HiveLab components (8 components)
- Week 6: Rituals components (14 components)
- Week 7: Admin components (3 components)

**Total**: 7 weeks (including Global foundation)

### Phase 4: **Configure Enforcement** (4 hours)
- ESLint rule: `no-component-without-story`
- CI check: GitHub Action to build Storybook + fail on error
- Pre-commit hook: Lint stories for required sections
- Update contributing guide with story requirements

---

## 🚀 Immediate Action Plan (Week 1)

### Day 1: **Audit & Delete** (8 hours)
- [x] Generate component inventory (done)
- [ ] Review with user: Confirm shells (SpacesExperience, UniversalShell) are not production
- [ ] Delete `packages/ui/src/stories/` directory (except 00-Foundations)
- [ ] Move `00-Foundations/` to `packages/ui/src/foundations/`
- [ ] Git commit: "chore: remove non-production Storybook stories"

### Day 2: **Restructure Atomic Directory** (8 hours)
- [ ] Create `00-Global/` directory structure
- [ ] Migrate global atoms (Button, Input, Card, Badge, Avatar)
- [ ] Update import paths across codebase
- [ ] Test: `pnpm build` succeeds
- [ ] Git commit: "refactor: restructure atomic design to vertical slices - global foundation"

### Day 3-5: **Create Global Stories** (24 hours)
- [ ] Day 3: Top 5 atoms (Button, Input, Card, Badge, Avatar)
- [ ] Day 4: Form/overlay atoms (Dialog, Sheet, Select, Checkbox, Switch, Textarea)
- [ ] Day 5: Remaining global atoms + molecules

### Result by End of Week 1:
- ✅ Storybook cleaned (no drift, no mocks)
- ✅ Global foundation organized (00-Global/)
- ✅ 20+ core components with production-grade stories
- ✅ Coverage: ~17% (20/119) — but the RIGHT 20 (most-used components)

---

## 📊 Success Metrics

**Phase 1 Complete (Week 1)**:
- [ ] 0 stories in separate `/stories/` directory (deleted)
- [ ] Global foundation organized (00-Global/)
- [ ] 20 global components with stories (17% coverage)
- [ ] Storybook builds without errors

**Phase 2 Complete (Week 7)**:
- [ ] 100% coverage (119/119 components with stories)
- [ ] All slices organized (Feed, Spaces, Profile, HiveLab, Rituals, Admin)
- [ ] CI enforces story requirement
- [ ] Storybook published at `storybook.hive.app` (or similar)

---

## 🎯 Strategic Recommendations

### Recommendation 1: **Start with Global, Ship Incrementally**
Don't wait 7 weeks to see value. After Week 1:
- Publish Storybook with 20 global components
- Share with team: "This is the foundation, slices coming weekly"
- Iterate based on feedback

### Recommendation 2: **Pair Storybook Work with Slice Polish**
From UX_UI_MASTER_TODO.md:
- Week 3: Feed slice polish (10h) + Feed stories (8h) = 18h
- Week 4: Spaces slice polish (10h) + Spaces stories (8h) = 18h
- **Result**: Polish and documentation happen together

### Recommendation 3: **Use Storybook as Design Review Tool**
Before shipping any new component:
1. Build in Storybook first
2. Review with team
3. Iterate on story
4. Move to production when story is approved
- **Benefit**: Design review happens before code ships

### Recommendation 4: **Public Storybook = Competitive Advantage**
Publish at `storybook.hive.app`:
- Designers reference components
- Developers onboard faster
- Product team sees what's possible
- **Bonus**: Campus developers can contribute components

---

**Next Steps**: User approval to delete `packages/ui/src/stories/` directory and start Global foundation.

---

**Audit Complete**: November 6, 2025, 4:30 PM
