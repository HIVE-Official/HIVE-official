# HIVE UX/UI Build Checklist (Topology-Aligned)

**Last Updated**: November 2, 2025
**Status**: Complete Rebuild — Aligned with Production Topologies
**Design Philosophy**: Arc/Linear/Vercel/SF minimalism meets campus chaos
**Atomic Layers**: Atoms → Molecules → Organisms → Templates → Pages

---

## 🎯 Purpose

This is the **single source of truth** for HIVE's frontend build, fully aligned with:
- [UX-UI-TOPOLOGY.md](UX-UI-TOPOLOGY.md) — Platform-wide patterns
- [FEED_TOPOLOGY.md](ux/FEED_TOPOLOGY.md) — Feed specifications
- [SPACES_TOPOLOGY.md](ux/SPACES_TOPOLOGY.md) — Spaces specifications
- [HIVELAB_TOOLS_TOPOLOGY.md](ux/HIVELAB_TOOLS_TOPOLOGY.md) — HiveLab specifications
- [DESIGN_FIT_AUDIT.md](DESIGN_FIT_AUDIT.md) — Component design-fit analysis

**Use this before building anything.** Check if it exists, check if it matches topology spec, check if it has a story.

---

## 📊 Quick Status Dashboard

### Recent Updates (Nov 2025)
- Feed: Added landmark roles and aria-live announcements in shared template; standardized empty state in `@hive/ui`.
- Rituals: Landmark roles + tablist labels and list semantics for grids in `RitualsPageLayout`.
- Onboarding: Academics step now shows skeleton while catalog loads and announces progress via live region.

### Overall Progress
```
Foundation:           90% ✅ (tokens, shell complete)
Atoms (50 needed):    78% 🟡 (39/50 — 11 missing)
Molecules (30):       30% 🔴 (9/30 — 21 missing)
Organisms (30):       13% 🔴 (4/30 — 26 missing) ← CRITICAL GAP
Templates (15):       67% 🟡 (10/15 — 5 missing)
Pages (60+ routes):   90% ✅ (most exist, wrong components)

Storybook Coverage:   55% 🔴 (94/170 target)
Design-Fit Rate:      2% 🔴 (3 components match philosophy)
Production-Ready:     20% 🔴 (needs organisms expansion)
```

### By Feature Slice
| Feature | Atoms | Molecules | Organisms | Templates | Pages | Status |
|---------|-------|-----------|-----------|-----------|-------|--------|
| **Global Systems** | 39/50 | 9/30 | 0/5 | 3/5 | N/A | 🔴 50% |
| **Onboarding/Auth** | ✅ | ✅ | 4/4 | ✅ | ✅ | 🟢 85% |
| **Feed** | 🟡 | 🔴 | 0/7 | 🟡 | 🔴 | 🔴 30% |
| **Spaces** | ✅ | 🟡 | 0/5 | 🟡 | 🟡 | 🟡 60% |
| **Profile** | ✅ | 🟡 | 0/3 | 🟡 | 🟡 | 🟡 55% |
| **HiveLab** | ✅ | 🟡 | 0/5 | ✅ | 🟡 | 🟡 65% |
| **Rituals** | 🟡 | 🔴 | 0/4 | 🔴 | 🔴 | 🔴 25% |

**Critical Finding**: Only **3 components** (SpaceComposer, PinnedPostsStack, Button) match the refined design philosophy. Most were built before YC/SF minimalism refinements.

---

## Part 1: HIVE Brand & Design Philosophy

### 1.1 Design North Stars

**Mission**: "Make campus life easier, more fun, and more connected"
**Not**: LinkedIn, feature bloat, professional networking
**Core Loop**: Open app → See feed → Maybe engage → Come back (< 3s)

### 1.2 Visual Identity

**Aesthetic**: "SF polish meets campus chaos"
- **Calm chrome** — Subtle borders, minimal backgrounds, no mystery
- **Crisp hierarchy** — Clear visual weight, proper spacing, content-first
- **Zero mystery** — Explainability chips, clear labels, transparent algorithm
- **Production-grade** — Arc/Linear/Vercel/Figma quality from day one

**Color System** ([UX-UI-TOPOLOGY.md](UX-UI-TOPOLOGY.md) section 0):
```
Primary Brand:    Gold gradient (#FFD700 → #FDB913)
Background:       Dark theme default (neutrals 900-950)
Text Hierarchy:   100% / 70% / 50% opacity
Accent:           Per-campus (UB Blue for Buffalo)
Semantic:         Success/Info/Warn/Danger with AA contrast
```

**Typography** (tokens):
```
Display:   28/32 (mobile/desktop)
Title:     22/26
Heading:   18/22
Body:      14/20
Caption:   12/16
```

**Spacing** (4px grid):
```
4, 8, 12, 16, 24, 32
```

**Radii**:
```
xs: 6px    (chips, badges)
sm: 10px   (buttons, inputs)
md: 14px   (cards)
lg: 22px   (pills, tags)
```

**Elevation**:
```
e0: flat (default)
e1: hover (subtle lift)
e2: popover/sheet (clear separation)
e3: modal (highest layer)
```

**Motion** (respects reduced-motion):
```
Quick:     120-180ms (affordances)
Standard:  240ms (overlays)
Easing:    [0.23, 1, 0.32, 1] (HIVE reveal)
```

### 1.3 Patterns from Best-in-Class

**From Linear/Vercel**:
- Command Palette (`Cmd+K`) for keyboard-first navigation
- Unified shortcuts (vim-style `j/k`, zero-mouse browsing)
- Clean minimal UI with power-user efficiency
- Instant feedback (optimistic updates < 16ms)

**From Figma**:
- Undo/Redo (50-action history, granular, < 50ms)
- Real-time collaboration (live cursors, presence, conflict resolution)
- Canvas-based editing with property inspectors

**From Google Docs**:
- Autosave (debounced 10s, non-blocking)
- Version history (50 versions, 30-day retention)
- Session recovery (browser crash protection)

**From TikTok**:
- Virtualized infinite scroll (60fps with 10,000+ posts)
- Optimistic updates (< 16ms interactions)
- Smart prefetching (seamless loading)

**From Arc**:
- Personal analytics (engagement insights, recommendations)
- Progressive disclosure (mobile parity without complexity)
- Graceful handoff (mobile → desktop via QR code)

### 1.4 Mobile-First Reality

**Critical Stat**: 80% of usage is on phones
- Touch targets: ≥44px
- Single-column layouts (no desktop-only complexity)
- Progressive disclosure (not hidden features)
- Bottom navigation (primary actions)
- Sheet overlays (not full-page modals)

### 1.5 Campus Isolation (Multi-Tenant)

**Every query must include**:
```typescript
where('campusId', '==', 'ub-buffalo') // REQUIRED
```

**Launch campus**: UB Buffalo only (vBETA)
**Email domain**: @buffalo.edu validation
**Data isolation**: Firestore security rules enforce campusId

---

## Part 2: Foundation (90% Complete)

### 2.1 Design Tokens
**Location**: `packages/tokens/`
**Status**: ✅ COMPLETE

- [x] Color tokens (semantic, campus-specific)
- [x] Typography tokens (scale, weights, line-heights)
- [x] Spacing tokens (4px grid)
- [x] Radius tokens (xs/sm/md/lg)
- [x] Elevation tokens (e0-e3)
- [x] Motion tokens (durations, easing)
- [x] Breakpoints (xs/sm/md/lg/xl)
- [x] Z-index system
- [x] CSS generation (`generate-css.ts`)
- [x] Tailwind config integration

**Files**:
- ✅ `packages/tokens/src/colors-prd-aligned.ts`
- ✅ `packages/tokens/src/tailwind-config.ts`
- ✅ `packages/tokens/hive-tokens-generated.css`
- ✅ `packages/tokens/hive-tokens.css`

### 2.2 Shell System
**Location**: `packages/ui/src/shells/`, `packages/ui/src/navigation/`
**Status**: ✅ COMPLETE

**Components**:
- [x] `UniversalShell.tsx` — Main app wrapper
- [x] `UniversalNav.tsx` — Navigation system
- [x] Desktop sidebar (collapsible)
- [x] Mobile bottom nav (5 actions)
- [x] Top bar (context, search, avatar)
- [x] Command palette (`Cmd+K`)

**Stories**:
- [x] `07-Complete-Systems/AppNavigation.stories.tsx`
- [x] `07-Complete-Systems/SidebarShadcn.stories.tsx`

**E2E**:
- [x] `universal-shell.spec.ts` (310 lines)

### 2.3 Authentication & Security
**Location**: `apps/web/src/lib/middleware/`, `apps/web/src/lib/`
**Status**: ✅ COMPLETE

- [x] Magic link auth (@buffalo.edu only)
- [x] JWT sessions (HttpOnly cookies, 24h users, 4h admins)
- [x] Session middleware (validation, refresh)
- [x] CSRF protection (admin routes)
- [x] Rate limiting (5/60/100 req/min by route type)
- [x] Campus isolation enforcement
- [x] Admin role verification (email whitelist + isAdmin flag)

**Middleware**:
- [x] `withAuthAndErrors` (200+ routes use this)
- [x] `withAdminAuthAndErrors` (46 admin routes)
- [x] `withErrors` (public routes)

### 2.4 API Routes
**Location**: `apps/web/src/app/api/`
**Status**: ✅ 175 ROUTES COMPLETE

- [x] Auth (12 routes)
- [x] Profile (13 routes)
- [x] Spaces (31 routes)
- [x] Feed (9 routes)
- [x] Tools/HiveLab (21 routes)
- [x] Rituals (3+ routes)
- [x] Admin (46 routes)
- [x] Other (40+ routes)

**All routes use**: Consolidated middleware with campus isolation

---

## Part 3: Atomic Design Components

### 3.1 Atoms (39/50 = 78%)

**Location**: `packages/ui/src/atomic/atoms/`
**Philosophy**: Single-purpose primitives, token-driven, no business logic

#### ✅ Form Controls (8/10 complete)
- [x] `button.tsx` — All variants (primary/ghost/brand/outline) ✅ MATCHES SPEC
- [x] `input.tsx` — Text, email, password, search
- [x] `textarea.tsx` — Auto-growing supported
- [x] `checkbox.tsx` — Default + indeterminate states
- [x] `switch.tsx` — Toggle with labels
- [x] `select.tsx` — Native + custom variants
- [x] `slider.tsx` — Range input
- [x] `label.tsx` — Form labels with required indicators
- [ ] **DateTimePicker** — Needed for events ❌ MISSING
- [ ] **FileUpload** — Needed for media posts ❌ MISSING

**Stories**:
- [x] `04-Controls/Input.stories.tsx`
- [x] `04-Controls/Button.stories.tsx`
- [x] `04-Controls/Toggles.stories.tsx`

#### ✅ Navigation (3/3 complete)
- [x] `top-bar-nav.tsx` — Global nav bar
- [x] `command.tsx` — Command palette (Cmd+K)
- [x] `context-menu.tsx` — Right-click menus

**Stories**:
- [x] `05-Navigation/Tabs.stories.tsx`
- [x] `05-Navigation/CommandPalette.stories.tsx`

#### ✅ Modals & Overlays (7/7 complete)
- [x] `dialog.tsx` — Base dialog (Radix)
- [x] `hive-modal.tsx` — Styled modal with header/footer
- [x] `hive-confirm-modal.tsx` — Confirmation dialogs
- [x] `sheet.tsx` — Slide-up mobile sheet
- [x] `action-sheet.tsx` — Mobile bottom action menu
- [x] `popover.tsx` — Floating content
- [x] `tooltip.tsx` — Hover hints

**Stories**:
- [x] `06-Overlays/Sheet.stories.tsx`
- [x] `06-Overlays/ActionSheet.stories.tsx`
- [x] `06-Overlays/Popover.stories.tsx`
- [x] `06-Overlays/Tooltip.stories.tsx`

#### ✅ Cards & Containers (5/5 complete)
- [x] `card.tsx` — Base card primitive
- [x] `hive-card.tsx` — Styled card with hover states
- [x] `grid.tsx` — Responsive grid layout
- [x] `avatar.tsx` — User avatars (Radix)
- [x] `simple-avatar.tsx` — Minimal avatar variant

**Stories**:
- [x] `01-Layout/Grid.stories.tsx`
- [x] `02-Atoms/HiveCard.stories.tsx`

#### ✅ Display & Feedback (7/7 complete)
- [x] `badge.tsx` — Status indicators
- [x] `alert.tsx` — Info/success/warning/error alerts
- [x] `progress.tsx` — Linear progress bar
- [x] `skeleton.tsx` — Loading placeholders
- [x] `notification-bell.tsx` — Notification icon with count
- [x] `notification-item.tsx` — Single notification
- [x] `presence-indicator.tsx` — Online/offline status

**Stories**:
- [x] Used in various component stories

#### 🟡 Media (3/5 complete)
- [x] `media-viewer.tsx` — Full-screen image viewer
- [x] `media-thumb.tsx` — Thumbnail preview
- [x] `post-card.tsx` — Base post card (⚠️ WRONG — should be Feed organisms)
- [ ] **VideoPlayer** — Needed for video posts ❌ MISSING
- [ ] **ImageCarousel** — Needed for multi-photo posts ❌ MISSING

**Status**: post-card.tsx should be deleted, replaced with FeedCard organisms

#### ✅ Utilities (4/4 complete)
- [x] `check-icon.tsx` — Animated checkmark
- [x] `percent-bar.tsx` — Percentage visualization
- [x] `hive-logo.tsx` — Brand logo variants
- [x] `tabs.tsx` — Tabbed navigation

### Atoms Summary
- **Complete**: 39/50 (78%)
- **Missing**: 11 atoms (date picker, file upload, video player, carousel, advanced select, etc.)
- **Design-Fit**: Only **Button** fully matches SF/YC minimalism spec
- **Priority**: P1 — Fill gaps for events, media uploads

---

### 3.2 Molecules (9/30 = 30%)

**Location**: `packages/ui/src/atomic/molecules/`
**Philosophy**: Composed patterns, reusable across features, no domain logic

#### ✅ Navigation Primitives (4/10 complete)
- [x] `navigation-primitives.tsx` — NavLink, NavButton, NavDivider
- [x] `breadcrumbs.tsx` — Breadcrumb navigation
- [x] `pagination.tsx` — Pagination controls
- [x] `progress-steps.tsx` — Step indicator
- [ ] `header-bar.tsx` — Page header ❌ MISSING
- [ ] `dropdown-menu.tsx` — Dropdown menu ❌ MISSING
- [ ] `action-bar.tsx` — Action bar ❌ MISSING
- [ ] `search-bar.tsx` — Search input ❌ MISSING
- [ ] `filter-chips.tsx` — Filter chip group ❌ MISSING
- [ ] `sort-dropdown.tsx` — Sort options dropdown ❌ MISSING

#### 🟢 Space Components (2/2 complete) — **MATCH TOPOLOGY SPEC**
- [x] `space-composer.tsx` — NO avatar, consolidated [+ Add] ✅ PERFECT
- [x] `pinned-posts-stack.tsx` — Vertical stack, gold left border ONLY ✅ PERFECT

**Stories**:
- [x] `13-Spaces-Communities/Spaces.ComposerChat.stories.tsx`
- [ ] `pinned-posts-stack.stories.tsx` ❌ MISSING

**Topology Compliance**: ✅ These match SPACES_TOPOLOGY.md exactly!

#### 🟡 User & Social (2/5 complete)
- [x] `user-avatar-group.tsx` — Stacked avatars
- [x] `profile-bento-grid.tsx` — Profile widget layout
- [ ] `connection-card.tsx` — Connection display ❌ MISSING
- [ ] `user-search-result.tsx` — Search result card ❌ MISSING
- [ ] `friend-request-card.tsx` — Friend request ❌ MISSING

#### 🟡 Analytics (2/5 complete)
- [x] `stat-card.tsx` — Metric display card
- [x] `kpi-delta.tsx` — Metric change indicator
- [ ] `chart-wrapper.tsx` — Chart component wrapper ❌ MISSING
- [ ] `timeline-visualization.tsx` — Timeline view ❌ MISSING
- [ ] `metric-tile.tsx` — Compact metric tile ❌ MISSING

#### 🟡 Layout (1/3 complete)
- [x] `tag-list.tsx` — Tag chips with actions
- [ ] `page-container.tsx` — Page wrapper ❌ MISSING (exists but needs verification)
- [ ] `rail-widget.tsx` — Right rail widget ❌ MISSING (exists but needs verification)

### Molecules Summary
- **Complete**: 9/30 (30%)
- **Missing**: 21 molecules (filters, charts, user cards, etc.)
- **Design-Fit**: Only **SpaceComposer** and **PinnedPostsStack** match topology specs
- **Priority**: P0 — Feed filters, Space widgets needed for launch

---

### 3.3 Organisms (4/30 = 13%) — **CRITICAL GAP**

**Location**: `packages/ui/src/atomic/organisms/` (currently only has `auth/` subfolder)
**Philosophy**: Domain-specific, feature-rich, composed from molecules

**Current State**: Only 4 auth organisms exist. Need 26 more for topology compliance.

---

#### 🔴 Feed Organisms (0/7 = 0%) — **P0 BLOCKER**

**Topology Spec**: [FEED_TOPOLOGY.md](ux/FEED_TOPOLOGY.md) lines 176-200

**1. FeedCard.Post** ✅ SHIPPED
- **File**: `packages/ui/src/atomic/organisms/feed-card-post.tsx`
- **Purpose**: Text/photo posts from spaces (standard feed card)
- **Spec**:
  ```typescript
  interface FeedCardPostData {
    id: string;
    author: { id: string; name: string; avatarUrl?: string; role?: string };
    space: { id: string; name: string; color?: string; icon?: string };
    content: {
      headline?: string;
      body?: string;
      media?: MediaItem[];
      tags?: string[];
    };
    stats: { upvotes: number; comments: number; isUpvoted: boolean; isBookmarked: boolean };
    meta: { timeAgo: string; isPinned?: boolean; isEdited?: boolean };
  }
  ```
- **Story**: `packages/ui/src/stories/04-Organisms/FeedCardPost.stories.tsx` (text-only, single image, gallery, long-form/pinned variants)
- **Status Notes**: Composes `FeedSpaceChip`, `FeedMediaPreview`, and `FeedPostActions`; supports pinned badge + optimistic action toggles.

**2. FeedCard.Event** ✅ SHIPPED
- **File**: `packages/ui/src/atomic/organisms/feed-card-event.tsx`
- **Purpose**: Events with RSVP CTA (16:9 cover image)
- **Spec**:
  ```typescript
  interface FeedCardEventData {
    id: string;
    title: string;
    space: FeedCardSpace;
    coverImage?: MediaItem;
    meta: {
      scheduleLabel: string;
      locationLabel?: string;
      status: 'upcoming' | 'today' | 'sold_out' | 'past';
    };
    stats: {
      attendingCount: number;
      capacity?: number;
      isAttending: boolean;
    };
  }
  ```
- **Story**: `packages/ui/src/stories/04-Organisms/FeedCardEvent.stories.tsx` (Upcoming, Today, Sold-out, Past)
- **CTA**: RSVP / waitlist button mirrors status with secondary "View" action and capacity readouts

**3. FeedCard.Tool** ✅ SHIPPED
- **File**: `packages/ui/src/atomic/organisms/feed-card-tool.tsx`
- **Purpose**: Featured HiveLab tools from spaces
- **Spec**:
  ```typescript
  interface FeedCardToolData {
    id: string;
    title: string;
    summary?: string;
    authorLabel: string;
    space: FeedCardSpace;
    meta?: {
      featured?: boolean;
      categoryLabel?: string;
      lastUpdatedLabel?: string;
    };
    stats?: {
      installs?: number;
      activeUsers?: number;
      ratingLabel?: string;
    };
    tags?: string[];
  }
  ```
- **Story**: `packages/ui/src/stories/04-Organisms/FeedCardTool.stories.tsx` (Featured, Standard, Trending/high installs)
- **CTA**: "Open tool" (primary gold) + "Preview" secondary button, installs update optimistically in Storybook

**4. FeedCard.System** ❌ MISSING
- **File**: `packages/ui/src/atomic/organisms/feed-card-system.tsx`
- **Purpose**: Ritual progress, campus announcements
- **Spec**:
  ```typescript
  interface FeedCardSystemProps {
    type: 'system';
    systemType: 'ritual' | 'announcement';
    title: string;
    body: string; // Full text (no preview)
    progress?: number; // For rituals: 0-100
    participantCount?: number; // "347 students joined"
    primaryActions: ['Join Now →'] | ['Learn More →'];
    theme?: 'ritual' | 'urgent' | 'celebration'; // Visual theming
  }
  ```
- **Story**: Variants (ritual-active, announcement, urgent)
- **Priority**: **P0** — Blocks Feed launch

**5. FeedFilterBar** ✅ SHIPPED (Molecule)
- **File**: `packages/ui/src/atomic/molecules/feed-filter-bar.tsx`
- **Purpose**: Filter chips (All, My Spaces, Events)
- **Spec** (FEED_TOPOLOGY.md lines 61-118):
  ```typescript
  interface FeedFilterBarProps {
    activeFilter: 'all' | 'my-spaces' | 'events';
    onFilterChange: (filter: string) => void;
    counts?: { // Optional badge counts
      all: number;
      mySpaces: number;
      events: number;
    };
  }
  ```
- **Visual**: Horizontal scroll on mobile, inline on desktop
- **Status**: ✅ Implemented with white-focus borders; Storybook at `packages/ui/src/stories/03-Molecules/FeedFilterBar.stories.tsx`

**6. FeedRitualBanner** ✅ SHIPPED (Molecule)
- **File**: `packages/ui/src/atomic/molecules/feed-ritual-banner.tsx`
- **Purpose**: Full-width ritual strip at top of feed
- **Spec** (UX-UI-TOPOLOGY.md section 2.6):
  ```typescript
  interface FeedRitualBannerProps {
    ritual: {
      id: string;
      title: string; // "🔥 Week 2 of Campus Clean"
      participantCount: number; // "347 students joined"
      countdown: string; // "3 days left"
      theme: 'default' | 'urgent' | 'celebration';
    };
    onJoin: () => void;
    onSnooze: () => void;
    onHide: () => void;
  }
  ```
- **Behavior**: Dismissible, compresses after scroll (mobile) — ⏳ follow-up (CTA/progress shipped; snooze/hide to wire next)
- **Status**: ✅ Base implementation live with Storybook at `packages/ui/src/stories/03-Molecules/FeedRitualBanner.stories.tsx`

**7. FeedEmptyState** ❌ MISSING (Molecule)
- **File**: `packages/ui/src/atomic/molecules/feed-empty-state.tsx`
- **Purpose**: "Join Spaces to see campus activity"
- **Spec**:
  ```typescript
  interface FeedEmptyStateProps {
    variant: 'no-spaces' | 'no-posts' | 'no-results';
    suggestedSpaces?: Space[]; // If variant === 'no-spaces'
    primaryAction?: {
      label: string; // "Browse Spaces"
      href: string; // "/spaces/browse"
    };
  }
  ```
- **Priority**: **P1** — Nice to have

---

#### 🔴 Space Organisms (1/5 = 20%) — **P0 BLOCKER**

**Topology Spec**: [SPACES_TOPOLOGY.md](ux/SPACES_TOPOLOGY.md)

**1. SpaceHeader** ✅ VERIFIED (Molecule — production ready)
- **File**: `packages/ui/src/atomic/molecules/space-header.tsx`
- **Stories**: `packages/ui/src/stories/13-Spaces-Communities/Spaces.SpaceHeader.stories.tsx`
- **Purpose**: Minimal header (icon + name + member count + online count only)
- **Spec** (SPACES_TOPOLOGY.md lines 975-1016):
  ```
  Structure:
  ┌─────────────────────────────────────┐
  │ [Icon] Chemistry 101                │
  │        428 members · 12 online      │  ← NO @handle, NO category badge
  │ [Joined ✓] [⋯]                      │
  └─────────────────────────────────────┘
  ```
- **Removed Elements**:
  - ❌ @handle — Not in header (available in About widget)
  - ❌ Category badge — Visual clutter
- **Notes**:
  - ✅ Membership states implemented (`join`, `joined`, `pending`, `loading`)
  - ✅ Leader menu gated behind `isLeader`
  - ✅ Apps Router uses shared molecule (`apps/web/src/app/spaces/[spaceId]/page.tsx`)
- **Priority**: **P0** — COMPLETE (remove from blocker list)

**2. SpaceAboutWidget** ❌ MISSING (Molecule, right rail)
- **File**: `packages/ui/src/atomic/molecules/space-about-widget.tsx`
- **Purpose**: Description + leaders inline (consolidated)
- **Spec** (SPACES_TOPOLOGY.md lines 378-425):
  ```
  ┌─────────────────────────────────────┐
  │ About                               │
  │                                     │
  │ A space for Chemistry 101 students  │
  │ to share notes, form study groups,  │
  │ and coordinate lab schedules.       │
  │                                     │
  │ Leaders: [Avatar] [Avatar] [+2]     │  ← Inline, not separate section
  │ 428 members · Created Oct 2024      │
  └─────────────────────────────────────┘
  ```
- **Max Height**: ~140px (3 lines description)
- **Priority**: **P0** — Blocks Space Board launch

**3. SpaceToolsWidget** ❌ MISSING (Molecule, right rail)
- **File**: `packages/ui/src/atomic/molecules/space-tools-widget.tsx`
- **Purpose**: Active tools (≤3) with close time
- **Spec** (SPACES_TOPOLOGY.md lines 429-462):
  ```
  ┌─────────────────────────────────────┐
  │ Tools (3)                           │
  │                                     │
  │ │ 📊 Midterm Study Poll             │  ← Gold left border
  │ │    Closes in 2h                   │
  │                                     │
  │ │ 📝 Lab Partner Match              │
  │ │    Closes tomorrow                │
  │                                     │
  │ │ 🎯 Office Hours Tracker           │
  │ │    Closes Friday                  │
  └─────────────────────────────────────┘
  ```
- **Max Height**: ~80px
- **Priority**: **P0** — Blocks Space Board launch

**4. SpaceEventsWidget** ❌ MISSING (Molecule, right rail)
- **File**: `packages/ui/src/atomic/molecules/space-events-widget.tsx`
- **Purpose**: Upcoming events (compact list)
- **Spec** (SPACES_TOPOLOGY.md lines 467-495):
  ```
  ┌─────────────────────────────────────┐
  │ Upcoming Events                     │
  │                                     │
  │ │ 📅 Study Group Session            │  ← Blue left border
  │ │    Tomorrow 3PM                   │
  │                                     │
  │ │ 📅 Lab Review                     │
  │ │    Friday 2PM                     │
  └─────────────────────────────────────┘
  ```
- **Max Height**: ~60px
- **Priority**: **P1** — Nice to have

**5. SpaceCard** ❌ VERIFY (exists, check spec)
- **File**: `packages/ui/src/atomic/molecules/space-card.tsx` (EXISTS — verify spec)
- **Purpose**: Space discovery card (grid view)
- **Spec** (SPACES_TOPOLOGY.md lines 500-600):
  - Icon, name, member count, activity level
  - Join policy badge (open/request/invite)
  - Social proof ("8 CS majors joined")
- **Action**: Verify matches minimal spec (no clutter)
- **Priority**: **P0** — Verify/refactor

**Total Right Rail Height**: 280px (down from 600px = -53% clutter)

---

#### 🔴 Profile Organisms (0/3 = 0%) — **P1 BLOCKER**

**Topology Spec**: From topology references

**1. ProfileHeader** ❌ MISSING
- **File**: `packages/ui/src/atomic/organisms/profile-header.tsx`
- **Purpose**: Avatar, name/handle, bio, stats ribbon
- **Spec**:
  ```typescript
  interface ProfileHeaderProps {
    user: {
      avatarUrl?: string;
      fullName: string;
      handle: string; // @jacob
      verificationBadge?: boolean;
      bio?: string; // Max 160 chars
    };
    stats: {
      spacesJoined: number;
      eventsAttended: number;
      highlightsCount: number;
    };
    isOwnProfile: boolean;
    primaryAction?: 'edit' | 'message'; // Future
    overflowActions?: Action[]; // Settings, share, etc.
  }
  ```
- **Visual**: Full-width header, stats ribbon below bio
- **Priority**: **P1** — Blocks Profile launch

**2. ProfileTimeline** ❌ MISSING
- **File**: `packages/ui/src/atomic/organisms/profile-timeline.tsx`
- **Purpose**: Chronological activity feed
- **Spec**:
  ```typescript
  interface ProfileTimelineProps {
    activities: Activity[];
  }

  interface Activity {
    id: string;
    type: 'joined_space' | 'posted' | 'attended_event' | 'completed_ritual';
    timestamp: Date;
    title: string; // "Joined Chemistry 101"
    metadata?: {
      spaceId?: string;
      eventId?: string;
      ritualId?: string;
    };
  }
  ```
- **Visual**: Vertical timeline with icons
- **Priority**: **P1** — Blocks Profile launch

**3. ProfileRecommendations** ❌ MISSING (Molecule)
- **File**: `packages/ui/src/atomic/molecules/profile-recommendations.tsx`
- **Purpose**: Suggested spaces with rationale
- **Spec**:
  ```typescript
  interface ProfileRecommendationsProps {
    recommendations: {
      space: Space;
      reason: string; // "8 CS majors joined"
      matchScore: number; // 0-100 (for sorting)
    }[];
  }
  ```
- **Visual**: Compact cards, max 3 shown
- **Priority**: **P2** — Nice to have

---

#### 🔴 HiveLab Organisms (0/5 = 0%) — **P2 BLOCKER**

**Topology Spec**: [HIVELAB_TOOLS_TOPOLOGY.md](ux/HIVELAB_TOOLS_TOPOLOGY.md) lines 140-193

**1. HiveLabStudio** ❌ MISSING (Complex organism)
- **File**: `packages/ui/src/atomic/organisms/hivelab-studio.tsx`
- **Purpose**: Three-pane builder (1280px+ desktop only)
- **Spec** (lines 140-192):
  ```
  ┌──────────────────────────────────────────────────────────────────┐
  │ Toolbar (64px): [← Back] [Tool Name ▾] [↶ Undo] [↷ Redo] [Deploy] │
  ├────────────┬──────────────────────────┬──────────────────────────┤
  │ L: Palette │ C: Canvas (640px)        │ R: Properties + Lint     │
  │ (280px)    │                          │ (360px)                  │
  │            │ ┌────────────────────┐   │                          │
  │ ┌─────────┐│ │ Tool Preview       │   │ ┌──────────────────────┐│
  │ │Elements ││ │ (Live render)      │   │ │ Config    Lint (2)  ││
  │ │ Data    ││ │ [Element 1]        │   │ │ Element Properties   ││
  │ └─────────┘│ │ [Element 2]        │   │ │ Label: [___]         ││
  │ 📝 BUILD   │ │ ...                │   │ │ [x] Required         ││
  │ Text Input │ └────────────────────┘   │ └──────────────────────┘│
  │ Choice     │                          │                          │
  │ Toggle     │ Drag to reorder          │ Timeline ▾ (contextual) │
  │ ...        │ Click to edit            │                          │
  │ 📊 RESULTS │ Delete to remove         │ [Lint Tab shows:]        │
  │ Summary    │                          │ ⚠️ 2 Warnings            │
  │ Chart      │                          │ • No close time set      │
  │ ⚡ Advanced│                          │ • >12 fields (14)        │
  │ Conditional│                          │                          │
  └────────────┴──────────────────────────┴──────────────────────────┘
  ```
- **Left Tabs Reduced**: 5 → 2 (-60% navigation overhead)
  - Elements (BUILD, RESULTS, Advanced)
  - Data Sources
- **Priority**: **P2** — Desktop-only, post-launch

**2. ElementPalette** ❌ MISSING (Molecule, left sidebar)
- **File**: `packages/ui/src/atomic/molecules/element-palette.tsx`
- **Purpose**: Draggable element library (2 categories)
- **Spec** (lines 194-264):
  ```
  📝 BUILD (Input Elements):
  - Text Input, Textarea, Radio, Checkbox
  - Toggle, Slider, Image Upload, Video Embed

  📊 RESULTS (Display-Only):
  - Results Summary, Results Chart, Data Table

  ⚡ ADVANCED (Special Callout):
  - Conditional (show/hide based on answers)
  ```
- **Categories Reduced**: 4 → 2 (-50%)
- **Priority**: **P2** — Desktop-only

**3. InspectorPanel** ❌ MISSING (Molecule, right sidebar)
- **File**: `packages/ui/src/atomic/molecules/inspector-panel.tsx`
- **Purpose**: Element properties editor
- **Spec**:
  ```typescript
  interface InspectorPanelProps {
    selectedElement?: ToolElement;
    onPropertyChange: (key: string, value: any) => void;
    lintErrors?: LintError[]; // Blocking vs warnings
  }
  ```
- **Features**:
  - Property tabs (Config, Lint)
  - Timeline (contextual — only shows when time elements exist)
  - Complexity meter (green/yellow/red)
- **Priority**: **P2** — Desktop-only

**4. LintPanel** ❌ MISSING (Molecule, embedded in InspectorPanel)
- **File**: `packages/ui/src/atomic/molecules/lint-panel.tsx`
- **Purpose**: Validation errors (blocking vs warnings)
- **Spec** (lines 1030-1052):
  ```
  Blocking Errors (red):
  - No elements added
  - Missing required properties

  Warnings (yellow):
  - >12 fields (recommend split)
  - No close time set
  - No results element (users can't see outcome)
  ```
- **Priority**: **P2** — Desktop-only

**5. ToolLibraryCard** ❌ MISSING (Molecule, workspace)
- **File**: `packages/ui/src/atomic/molecules/tool-library-card.tsx`
- **Purpose**: Tool card in workspace grid
- **Spec**:
  ```typescript
  interface ToolLibraryCardProps {
    tool: {
      id: string;
      title: string;
      status: 'active' | 'draft' | 'closed';
      responseCount: number;
      closesAt?: Date;
    };
    onEdit: () => void;
    onDeploy: () => void;
    onAnalytics: () => void;
  }
  ```
- **Visual**: Card with status badge, quick actions
- **Priority**: **P2** — Desktop-only

---

#### 🔴 Ritual Organisms (0/4 = 0%) — **P1 BLOCKER**

**Topology Spec**: UX-UI-TOPOLOGY.md section 2.6

**1. RitualStrip** ❌ MISSING (Already listed in Feed organisms)
- **Shared with Feed** — See Feed organisms section
- **Priority**: **P0** — Blocks Feed launch

**2. RitualCard** ❌ MISSING
- **File**: `packages/ui/src/atomic/organisms/ritual-card.tsx`
- **Purpose**: Ritual display in /rituals list
- **Spec**:
  ```typescript
  interface RitualCardProps {
    ritual: {
      id: string;
      title: string; // "Campus Clean Week"
      type: 'participation' | 'collection' | 'challenge';
      participationType: 'daily' | 'weekly' | 'total' | 'completion';
      timeRemaining: string; // "3 days left"
      participantCount: number; // "347 students"
      reward?: string; // "Sustainability Badge"
    };
    userProgress?: {
      joined: boolean;
      progress: number; // 0-100
      completionCount?: number;
    };
    onJoin: () => void;
    onLeave: () => void;
  }
  ```
- **Visual**: Card with progress bar (if joined), countdown
- **Story**: Variants (joined, not-joined, completed)
- **Priority**: **P1** — Blocks Rituals launch

**3. RitualProgressBar** ❌ MISSING (Atom/Molecule)
- **File**: `packages/ui/src/atomic/molecules/ritual-progress-bar.tsx`
- **Purpose**: Visual progress meter with participant count
- **Spec**:
  ```typescript
  interface RitualProgressBarProps {
    progress: number; // 0-100
    participantCount: number;
    goal?: number; // Target participants
    variant: 'compact' | 'full';
  }
  ```
- **Priority**: **P1** — Blocks Rituals launch

**4. RecapCard** ❌ MISSING (Molecule)
- **File**: `packages/ui/src/atomic/molecules/recap-card.tsx`
- **Purpose**: Post-ritual summary (appears in Feed)
- **Spec**:
  ```typescript
  interface RecapCardProps {
    ritual: {
      id: string;
      title: string;
      completionCount: number;
      topParticipants?: User[]; // Top 3
      stats?: { key: string; value: string }[]; // Custom stats
    };
    userParticipated: boolean;
    userReward?: string; // Badge earned
  }
  ```
- **Priority**: **P2** — Nice to have

---

#### 🔴 Event Organisms (0/2 = 0%) — **P1 BLOCKER**

**1. EventCard** ❌ MISSING (Shared with Feed)
- **Shared with Feed** — See FeedCard.Event in Feed organisms
- **Also used in**: Spaces calendar, profile timeline
- **Priority**: **P0** — Blocks Feed/Spaces launch

**2. EventSheet** ❌ MISSING
- **File**: `packages/ui/src/atomic/organisms/event-sheet.tsx`
- **Purpose**: Event detail overlay (sheet-first)
- **Spec**:
  ```typescript
  interface EventSheetProps {
    event: {
      id: string;
      title: string;
      description: string;
      startTime: Date;
      endTime?: Date;
      location: string;
      coverImageUrl?: string;
      hostId: string;
      capacity?: number;
      rsvpCount: { going: number; maybe: number; notGoing: number };
    };
    userRsvpStatus?: 'going' | 'maybe' | 'not_going';
    attendees?: User[]; // First 10
    isHost: boolean;
    onRsvp: (status: 'going' | 'maybe' | 'not_going') => void;
    onShare: () => void;
    onAddToCalendar: () => void;
    onCheckIn?: () => void; // If during event window
  }
  ```
- **Visual**: Sheet with full details, RSVP actions, attendee list
- **Story**: Variants (attendee, host, during-event)
- **Priority**: **P1** — Blocks Events launch

---

#### ✅ Auth Organisms (4/4 = 100%)

**Location**: `packages/ui/src/organisms/auth/`
**Status**: ✅ COMPLETE

- [x] Auth login screen
- [x] Auth signup screen
- [x] Auth verification screen
- [x] Auth reset screen

**Stories**:
- [x] `08-Auth/` stories

**Priority**: ✅ Complete

---

### Organisms Summary
- **Total**: 4/30 (13%) ← **CRITICAL GAP**
- **Feed**: 0/7 (0%) — **P0 BLOCKER**
- **Spaces**: 0/5 (0%) — **P0 BLOCKER**
- **Profile**: 0/3 (0%) — **P1 BLOCKER**
- **HiveLab**: 0/5 (0%) — **P2**
- **Rituals**: 0/4 (0%) — **P1 BLOCKER**
- **Events**: 0/2 (0%) — **P1 BLOCKER**
- **Auth**: 4/4 (100%) ✅

**Impact**: Cannot build topology-spec'd pages without these organisms.

---

### 3.4 Templates (10/15 = 67%)

**Location**: `packages/ui/src/atomic/templates/` or `packages/ui/src/pages/`
**Philosophy**: Page layouts composed from organisms

#### ✅ Onboarding Templates (1/1 complete)
- [x] `onboarding-experience.tsx` — Full 10-step wizard

**Stories**:
- [x] `08-Auth/OnboardingExperience.stories.tsx`

#### ✅ Auth Templates (1/1 complete)
- [x] `auth/auth-onboarding-layout.tsx` — Auth layout

**Stories**:
- [x] `08-Auth/AuthOnboardingLayout.stories.tsx`

#### 🟡 Feed Templates (1/2 complete)
- [x] `feed-loading-skeleton.tsx` — Loading state
- [ ] **FeedPageLayout** — Main feed layout with virtualization ❌ MISSING

**Status**: Need full page template with virtualized scroll

#### 🟡 Profile Templates (2/3 complete)
- [x] `profile-view-layout.tsx` — Profile page layout
- [x] `profile-view-loading-skeleton.tsx` — Loading skeleton
- [ ] **ProfileEditLayout** — Edit profile page ❌ MISSING

#### 🟡 Spaces Templates (2/4 complete)
- [x] Spaces discovery grid (inline in page, should extract)
- [x] Space card grid layout
- [ ] **SpaceBoardLayout** — Board view with pinned + stream ❌ MISSING
- [ ] **SpaceCalendarLayout** — Calendar month + list views ❌ MISSING

#### ✅ HiveLab Templates (4/4 complete)
- [x] `hivelab-experience.tsx` — Multi-mode experience
- [x] `hivelab-overview.tsx` — Overview mode
- [x] `hivelab-mode-placeholder.tsx` — Placeholder modes
- [x] HiveLab loading skeleton

**Stories**:
- [x] `07-Complete-Systems/HiveLabExperience.stories.tsx`

#### 🟢 Rituals Templates (2/2 complete)
- [x] **RitualsPageLayout** — Rituals list with tabs (`packages/ui/src/atomic/templates/rituals-page-layout.tsx`)
- [x] **RitualDetailLayout** — Ritual detail view (`packages/ui/src/atomic/templates/ritual-detail-layout.tsx`)

### Templates Summary
- **Complete**: 11/15 (73%)
- **Missing**: 4 templates (Feed, Profile edit, Space Board, Space Calendar)
- **Priority**: P0 — FeedPageLayout, SpaceBoardLayout needed for launch

---

## Part 4: Scale-Ready Patterns (10% Complete)

**Topology Spec**: UX-UI-TOPOLOGY.md section 1.5 (lines 39-1095)

### 4.1 Performance Optimization

**From TikTok/Vercel**:
- [ ] **Virtualized scroll** (react-window) ❌ NOT IMPLEMENTED
  - Feed (10,000+ posts): Target 60fps, < 200MB memory
  - HiveLab workspace (100+ tools): Target < 800ms load
  - Space Board (500+ posts): Target 60fps
- [ ] **Lazy loading** (code splitting) ❌ PARTIAL
  - HiveLab Studio: < 1.5s load (lazy on demand)
  - Analytics dashboards: Lazy load
- [ ] **Optimistic updates** ❌ NOT IMPLEMENTED
  - Upvote/like: < 16ms response
  - Comment: < 50ms response
  - Background sync + rollback on failure
- [ ] **Smart prefetching** ❌ NOT IMPLEMENTED
  - Next feed page at 70% scroll
  - Space content on hover
- [ ] **Debouncing** ❌ PARTIAL
  - Autosave: 10s debounce
  - Search: 300ms debounce
  - Analytics events: 30s batch

**Status**: 10% — Only debouncing partially implemented

### 4.2 Command Palette & Keyboard Shortcuts

**From Linear/Vercel**:
- [x] **Command Palette** (`Cmd+K`) ✅ EXISTS
  - Fuzzy search (1000+ items < 100ms)
  - Contextual actions
  - Recent items
- [ ] **Global shortcuts** ❌ NOT IMPLEMENTED
  - `Cmd+F` — Go to Feed
  - `Cmd+S` — Browse Spaces
  - `Cmd+P` — Profile
  - `/` — Search/Filter
  - `?` — Show shortcuts help
- [ ] **Feed shortcuts** (vim-style) ❌ NOT IMPLEMENTED
  - `j/↓` — Next post
  - `k/↑` — Previous post
  - `l` — Like focused post
  - `c` — Comment
  - `b` — Bookmark
  - `o/Enter` — Open detail
- [ ] **HiveLab shortcuts** ❌ NOT IMPLEMENTED
  - `Cmd+Z/Shift+Z` — Undo/Redo
  - `Cmd+E` — Element palette
  - `↑/↓` — Reorder elements

**Status**: 20% — Only Cmd+K implemented

### 4.3 Undo/Redo System

**From Figma**:
- [ ] **50-action history** ❌ NOT IMPLEMENTED
- [ ] **Granular undo** (< 50ms) ❌ NOT IMPLEMENTED
- [ ] **Smart grouping** (typing = 1 undo) ❌ NOT IMPLEMENTED
- [ ] **Persistent across sessions** ❌ NOT IMPLEMENTED

**Status**: 0%

### 4.4 Autosave + Version History

**From Google Docs**:
- [ ] **Debounced autosave** (10s) ❌ NOT IMPLEMENTED
- [ ] **50-version history** (30-day retention) ❌ NOT IMPLEMENTED
- [ ] **Session recovery** (browser crash) ❌ NOT IMPLEMENTED
- [ ] **Version restore** (non-destructive) ❌ NOT IMPLEMENTED

**Status**: 0%

### 4.5 Real-Time Collaboration

**From Figma**:
- [ ] **Live presence indicators** ❌ NOT IMPLEMENTED
- [ ] **Cursor tracking** ❌ NOT IMPLEMENTED
- [ ] **Conflict resolution** (last-write-wins) ❌ NOT IMPLEMENTED
- [ ] **Element locking** (prevent concurrent edits) ❌ NOT IMPLEMENTED

**Status**: 0%

### 4.6 Offline Mode & PWA

**From Best Practices**:
- [ ] **Service Worker** (cache last 100 posts) ❌ NOT IMPLEMENTED
- [ ] **Offline action queue** (IndexedDB) ❌ NOT IMPLEMENTED
- [ ] **Offline banner** ❌ NOT IMPLEMENTED
- [ ] **Seamless reconnection** ❌ NOT IMPLEMENTED

**Status**: 0%

### 4.7 Advanced Filtering

**From Twitter/Reddit**:
- [ ] **Compound filters** ❌ NOT IMPLEMENTED
  - Content type (posts/events/tools)
  - Spaces (multi-select)
  - Date range
  - Sort (recent/popular/trending)
- [ ] **Saved filter presets** ❌ NOT IMPLEMENTED
- [ ] **Quick access via Cmd+K** ❌ NOT IMPLEMENTED

**Status**: 0%

### 4.8 Bookmarks & Collections

**From Twitter**:
- [ ] **Bookmark any post/event/tool** ❌ NOT IMPLEMENTED
- [ ] **Organize into collections** ❌ NOT IMPLEMENTED
- [ ] **Private/public visibility** ❌ NOT IMPLEMENTED
- [ ] **Profile → Collections** ❌ NOT IMPLEMENTED

**Status**: 0%

### 4.9 Personal Analytics

**From Arc**:
- [ ] **Feed analytics** ❌ NOT IMPLEMENTED
  - Activity metrics (posts viewed, upvotes, comments)
  - Top spaces
  - Engagement pattern graph
- [ ] **HiveLab creator analytics** ❌ NOT IMPLEMENTED
  - Total tools/installs/responses
  - Response rate
  - Top tool by usage

**Status**: 0%

### Scale-Ready Patterns Summary
- **Overall**: 10% complete
- **Impact**: Platform won't scale to 10,000+ posts or 100+ tools without these
- **Priority**: P0 — Virtualization, keyboard shortcuts, optimistic updates

---

## Part 5: Feature Slice Completion

### 5.1 Global Systems (50%)
**Components**: Atoms (39/50), Molecules (9/30), Shell (✅), Auth (✅)
**Status**: 🟡 Foundation solid, need molecules/organisms

**Blockers**:
- 11 missing atoms (date picker, file upload, video player, etc.)
- 21 missing molecules (filters, charts, user cards, etc.)
- 5 missing global organisms (command palette extensions, etc.)

---

### 5.2 Onboarding & Auth (85%)
**Route**: `/onboarding`, `/auth/*`
**Status**: 🟢 SHIP READY

**Components**:
- [x] Onboarding wizard (10 steps)
- [x] Auth organisms (4 components)
- [x] Magic link flow
- [x] Email verification

**Stories**:
- [x] OnboardingExperience.stories.tsx
- [x] Auth stories (8 total)

**E2E**:
- [x] auth-magic-link-onboarding.spec.ts
- [x] start-flow.spec.ts
- [x] preboarding-preview.spec.ts

**Blockers**: None — **Ready to ship**

---

### 5.3 Feed (30%)
**Route**: `/feed`
**Status**: 🔴 CRITICAL — Cannot ship without organisms

**Components**:
- [x] Feed page exists (`apps/web/src/app/feed/page.tsx`)
- [x] FeedCard.Post organism ✅ SHIPPED
- [ ] FeedCard.Event organism ❌ MISSING
- [ ] FeedCard.Tool organism ❌ MISSING
- [ ] FeedCard.System organism ❌ MISSING
- [x] FeedFilterBar molecule ✅ SHIPPED
- [x] FeedRitualBanner molecule ✅ SHIPPED
- [ ] FeedEmptyState molecule ❌ MISSING
- [ ] Virtualized scroll ❌ NOT IMPLEMENTED

**Stories**:
- [ ] FeedSystem.stories.tsx (deprecated; needs replacement with new organisms)
- [x] FeedCardPost.stories.tsx ✅ ADDED (text, single image, gallery, long-form)
- [x] FeedFilterBar.stories.tsx ✅ ADDED
- [x] FeedRitualBanner.stories.tsx ✅ ADDED

**E2E**:
- [ ] Feed interactions (tab switching, filtering, infinite scroll) ❌ MISSING
- [ ] Keyboard navigation (j/k/l/c/b) ❌ MISSING

**Topology Compliance**: ❌ 0% — Uses generic components, not Feed-specific organisms

**Blockers** (P0):
1. Build 4 FeedCard organisms
2. Build FeedFilterBar, FeedRitualBanner molecules
3. Implement virtualized scroll (react-window)
4. Add keyboard shortcuts
5. Rebuild page with topology-spec'd components

---

### 5.4 Spaces (60%)
**Route**: `/spaces`, `/spaces/[spaceId]`
**Status**: 🟡 PARTIAL — Needs organisms

**Components**:
- [x] SpaceComposer molecule ✅ MATCHES TOPOLOGY
- [x] PinnedPostsStack molecule ✅ MATCHES TOPOLOGY
- [x] SpaceHeader molecule ✅ VERIFIED — minimal metadata + shared across apps
- [ ] SpaceAboutWidget molecule ❌ MISSING
- [ ] SpaceToolsWidget molecule ❌ MISSING
- [ ] SpaceEventsWidget molecule ❌ MISSING
- [ ] SpaceCard molecule 🟡 EXISTS — needs verification

**Stories**:
- [x] SpacesSystem.stories.tsx
- [x] Spaces.SpaceCard.stories.tsx
- [x] Spaces.LayoutVariants.stories.tsx
- [x] Spaces.ComposerChat.stories.tsx
- [ ] Spaces right rail widgets ❌ MISSING (3 stories)

**E2E**:
- [x] Spaces verification (basic)
- [ ] Space discovery flow ❌ MISSING
- [ ] Join/leave, post, RSVP ❌ MISSING

**Topology Compliance**: 🟡 40% — Composer and PinnedStack match, missing widgets

**Blockers** (P0):
1. ✅ SpaceHeader matches minimal spec (shared molecule in UI + apps/web)
2. Build 3 right rail widgets (About, Tools, Events)
3. Verify SpaceCard matches minimal spec
4. Add stories for widgets
5. E2E tests for core flows

---

### 5.5 Profile (55%)
**Route**: `/profile/[id]`
**Status**: 🟡 PARTIAL — Needs organisms

**Components**:
- [x] Profile page exists
- [x] Profile widgets (identity, activity, spaces, connections, completion, hivelab)
- [ ] ProfileHeader organism ❌ MISSING
- [ ] ProfileTimeline organism ❌ MISSING
- [ ] ProfileRecommendations molecule ❌ MISSING

**Stories**:
- [x] ProfileSystem.stories.tsx
- [x] Individual widget stories (6 total)
- [ ] ProfileHeader.stories.tsx ❌ MISSING
- [ ] ProfileTimeline.stories.tsx ❌ MISSING

**E2E**:
- [ ] View own/other profile ❌ MISSING
- [ ] Edit profile, privacy settings ❌ MISSING

**Topology Compliance**: 🟡 50% — Widgets exist, missing header/timeline

**Blockers** (P1):
1. Build ProfileHeader organism
2. Build ProfileTimeline organism
3. Build ProfileRecommendations molecule
4. Add stories
5. E2E tests

---

### 5.6 HiveLab (90%)
**Route**: `/hivelab`
**Status**: 🟡 PARTIAL — Desktop-only, needs organisms

**Components**:
- [x] HiveLab page exists
- [x] HiveLabExperience template
- [x] Element renderers (9 types)
- [x] VisualToolComposer (exported from @hive/ui)
- [x] Tool pages (presentational): ToolAnalyticsPage, ToolPreviewPage, ToolEditPage
- [x] HiveLabStudio organism (3-pane)
- [x] ElementPalette molecule
- [x] InspectorPanel molecule
- [x] LintPanel molecule
- [x] ToolLibraryCard molecule

**Stories**:
- [x] HiveLabExperience.stories.tsx
- [x] HiveLabOverview.stories.tsx
- [x] VisualToolComposer.stories.tsx
- [x] ToolAnalyticsPage.stories.tsx
- [x] ToolDeployModal.stories.tsx
- [x] HiveLabStudio.stories.tsx

**E2E**:
- [x] hivelab-complete-flow.spec.ts

**Topology Compliance**: 🟢 100% — Core experience + organisms present

**Blockers** (P2):
1. Build HiveLabStudio organism (desktop-only)
2. Build ElementPalette, InspectorPanel, LintPanel molecules
3. Build ToolLibraryCard molecule
4. Add scale features (undo/redo, autosave, version history)
5. Stories for all organisms

---

### 5.7 Rituals (25%)
**Route**: `/rituals`
**Status**: 🔴 CRITICAL — Cannot ship without organisms

**Components**:
- [x] Rituals page exists
- [ ] RitualCard organism ❌ MISSING
- [ ] RitualStrip organism ❌ MISSING (shared with Feed)
- [ ] RitualProgressBar molecule ❌ MISSING
- [ ] RecapCard molecule ❌ MISSING

**Stories**:
- [ ] RitualCard.stories.tsx ❌ MISSING
- [ ] RitualStrip.stories.tsx ❌ MISSING

**E2E**:
- [ ] Browse, join, track, complete rituals ❌ MISSING

**Topology Compliance**: ❌ 0% — No organisms built

**Blockers** (P1):
1. Build RitualCard organism
2. Build RitualStrip organism (shared with Feed)
3. Build RitualProgressBar, RecapCard molecules
4. Add stories
5. E2E tests

---

## Part 6: Build Priorities (November 2-15)

### 🔴 CRITICAL — Week of Nov 2-5 (Pre-Launch Sprint)

**Goal**: Ship Feed + Spaces to topology spec

#### Day 1-2 (Nov 2-3): Feed Critical Path
**Priority**: P0 — BLOCKS LAUNCH

**Tasks**:
1. **Build FeedCard organisms** (4 variants)
   - [ ] `feed-card-post.tsx` + story (text, image, video variants)
   - [ ] `feed-card-event.tsx` + story (upcoming, today, sold-out, past)
   - [ ] `feed-card-tool.tsx` + story (featured, normal)
   - [ ] `feed-card-system.tsx` + story (ritual, announcement, urgent)

2. **Build Feed molecules**
   - [ ] `feed-filter-bar.tsx` + story (All/My Spaces/Events chips)
   - [ ] `feed-ritual-banner.tsx` + story (dismissible, compresses on scroll)
   - [ ] `feed-empty-state.tsx` + story (no-spaces, no-posts, no-results)

3. **Rebuild Feed page**
   - [ ] Delete `page-v2.tsx` and `page-storybook-migration.tsx`
   - [ ] Refactor `page.tsx` with:
     - Virtualized scroll (react-window)
     - FeedCard organisms (render correct variant)
     - FeedFilterBar
     - FeedRitualBanner (if active ritual)
     - Keyboard shortcuts (`j/k/l/c/b`)

4. **Testing**
   - [ ] E2E: Feed load, scroll, filter, keyboard navigation
   - [ ] Performance: 60fps scroll with 1,000+ posts
   - [ ] Mobile: Touch interactions, bottom sheet

**Success Criteria**:
- ✅ Feed loads 10,000+ posts at 60fps (virtualized)
- ✅ All 4 card variants render correctly
- ✅ Keyboard navigation works (`j/k/l/c/b`)
- ✅ Matches FEED_TOPOLOGY.md spec exactly
- ✅ < 1s cold load, < 500ms warm load

---

#### Day 3 (Nov 4): Spaces Critical Path
**Priority**: P0 — BLOCKS LAUNCH

**Tasks**:
1. **Verify SpaceHeader molecule** ✅ DONE
   - [x] Check for @handle (remove if present)
   - [x] Check for category badge (remove if present)
   - [x] Add story with minimal spec + membership states

2. **Build Space widgets** (right rail)
   - [ ] `space-about-widget.tsx` + story (description + leaders inline)
   - [ ] `space-tools-widget.tsx` + story (≤3 tools, close time)
   - [ ] `space-events-widget.tsx` + story (upcoming events)

3. **Verify SpaceCard molecule**
   - [ ] Check matches minimal spec (no clutter)
   - [ ] Add story variants

4. **Testing**
   - [ ] E2E: Space discovery, join, post, RSVP
   - [ ] Mobile: Single scroll view, footer sections

**Success Criteria**:
- ✅ Space header matches minimal spec (no clutter)
- ✅ Right rail is 280px vertical (down from 600px)
- ✅ Pinned posts use vertical stack (no carousel)
- ✅ Composer has no avatar, no "Posting to" label
- ✅ Matches SPACES_TOPOLOGY.md spec exactly

---

#### Day 4 (Nov 5): Polish & Performance
**Priority**: P0 — LAUNCH DAY

**Tasks**:
1. **Onboarding polish**
   - [ ] Step transition animations (fade/slide)
   - [ ] Mobile layout optimization
   - [ ] Error messaging clarity

2. **Performance optimization**
   - [ ] Lighthouse audit (Feed, Spaces, Profile pages)
   - [ ] Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
   - [ ] Bundle size verification (< 800KB initial)

3. **Final E2E tests**
   - [ ] Critical user flows (signup → onboarding → feed → space → post)
   - [ ] Mobile flows (bottom nav, sheets, touch)
   - [ ] Error recovery (network failure, session expiration)

4. **Production build verification**
   - [ ] `NODE_OPTIONS="--max-old-space-size=4096" pnpm build`
   - [ ] No TypeScript errors
   - [ ] No console errors
   - [ ] All pages load

**Success Criteria**:
- ✅ All performance budgets met
- ✅ All critical E2E tests pass
- ✅ Production build succeeds
- ✅ Mobile experience polished

---

### 🟡 HIGH PRIORITY — Week of Nov 6-12 (Post-Launch)

**Goal**: Complete organisms layer, add scale features

#### Profile Organisms (Nov 6-7)
- [ ] Build ProfileHeader organism + story
- [ ] Build ProfileTimeline organism + story
- [ ] Build ProfileRecommendations molecule + story
- [ ] E2E: Profile flows (view, edit, privacy)

#### Ritual Organisms (Nov 8-9)
- [ ] Build RitualCard organism + story
- [ ] Build RitualProgressBar molecule + story
- [ ] Build RecapCard molecule + story
- [ ] E2E: Ritual flows (browse, join, track, complete)

#### Event Organisms (Nov 10)
- [ ] FeedCard.Event already built (shared)
- [ ] Build EventSheet organism + story
- [ ] E2E: Event RSVP, check-in, calendar add

#### HiveLab Organisms (Nov 11-12)
- [ ] Build HiveLabStudio organism + story (desktop-only)
- [ ] Build ElementPalette molecule + story
- [ ] Build InspectorPanel molecule + story
- [ ] Build LintPanel molecule + story
- [ ] Build ToolLibraryCard molecule + story

**Success Criteria**:
- ✅ Organisms layer 90%+ complete (27/30)
- ✅ All features have topology-spec'd components
- ✅ Storybook coverage 80%+

---

### 🟢 MEDIUM PRIORITY — Week of Nov 13-15 (Quality)

**Goal**: Testing, documentation, scale features

#### Testing (Nov 13-14)
- [ ] Unit tests (30+ tests for utilities, hooks)
- [ ] Component tests (20+ tests for organisms)
- [ ] Visual regression (Chromatic setup, snapshot 170+ stories)
- [ ] Accessibility (axe automation, keyboard navigation tests)

#### Scale Features (Nov 15)
- [ ] Keyboard shortcuts (global + feature-specific)
- [ ] Bookmarks & collections
- [ ] Advanced filtering (compound filters, saved presets)
- [ ] Personal analytics dashboards
- [ ] Optimistic updates (upvote, comment, RSVP)

#### Documentation (Ongoing)
- [ ] JSDoc comments (all exported components)
- [ ] Usage examples (in Storybook)
- [ ] Component guidelines (when to use, variants)
- [ ] Migration guide (old → new components)

**Success Criteria**:
- ✅ Test coverage 70%+
- ✅ Visual regression setup complete
- ✅ Accessibility WCAG AA compliant
- ✅ Scale features 50%+ implemented

---

## Part 7: Quality Gates

### Before Merging Any UI/UX PR

**Foundation**:
- [ ] Uses semantic tokens from `@hive/tokens` (no raw hex)
- [ ] Respects motion tokens and reduced motion
- [ ] Dark theme works (default theme)
- [ ] CSS variables only (`var(--hive-brand-primary)`)

**Design Philosophy** (CRITICAL):
- [ ] **Calm chrome** — Subtle borders, minimal backgrounds
- [ ] **Crisp hierarchy** — Clear visual weight, proper spacing
- [ ] **Zero mystery** — Explainability chips, clear labels
- [ ] **Content-first** — No decorative elements
- [ ] **Matches topology spec** — Check against FEED/SPACES/HIVELAB_TOPOLOGY.md

**Accessibility (WCAG 2.2 AA)**:
- [ ] Keyboard navigable with visible focus
- [ ] Touch targets ≥ 44×44px
- [ ] Color contrast meets AA
- [ ] Overlays trap focus, support ESC
- [ ] ARIA labels for icons

**Performance**:
- [ ] Skeletons show if load > 120ms
- [ ] Route `loading.tsx` exists (if applicable)
- [ ] No layout thrash (CLS < 0.1)
- [ ] Images use next/image
- [ ] Lazy loaded if > 100KB

**Security**:
- [ ] Uses `secureApiFetch` or `withAuthAndErrors`
- [ ] Admin routes include CSRF
- [ ] Campus isolation enforced (`campusId === 'ub-buffalo'`)

**Storybook**:
- [ ] Story exists for new component
- [ ] Axe a11y checks pass
- [ ] Realistic fixtures (no lorem ipsum)
- [ ] Multiple variants shown (all states)

**Testing**:
- [ ] E2E test for critical user flow (if applicable)
- [ ] Manual QA on mobile viewport (375px)

---

## Part 8: Quick Reference

### Component Decision Tree

```
Need a component?
├─ Does it exist in @hive/ui?
│  ├─ YES → Check if it matches topology spec
│  │  ├─ MATCHES → Use it! ✅
│  │  └─ DOESN'T MATCH → Refactor or rebuild
│  └─ NO → Continue
│
├─ What atomic layer?
│  ├─ Single HTML element + styling → Atom
│  ├─ Composed pattern, reusable → Molecule
│  ├─ Domain-specific, feature-rich → Organism
│  └─ Page layout → Template
│
└─ BEFORE CODING:
   1. Check topology spec (FEED/SPACES/HIVELAB_TOPOLOGY.md)
   2. Create story FIRST with mock data
   3. Build component using Storybook
   4. Export from @hive/ui/index.ts
   5. Update this checklist
```

### File Locations

```
packages/ui/src/atomic/
├─ atoms/           # 39/50 (primitives, single-purpose)
├─ molecules/       # 9/30 (composed patterns, reusable)
├─ organisms/       # 4/30 (domain-specific, feature-rich)
│  ├─ auth/         # ✅ Complete
│  └─ admin/        # 🆕 AdminShell, AdminMetricCard, AuditLogList, ModerationQueue
└─ templates/       # 10/15 (page layouts)

apps/web/src/
├─ app/             # Pages (60+ routes)
│  ├─ feed/         # 🔴 Needs FeedCard organisms
│  ├─ spaces/       # 🟡 Needs Space widgets
│  ├─ profile/      # 🟡 Needs Profile organisms
│  ├─ hivelab/      # 🟡 Needs HiveLab organisms
│  ├─ rituals/      # 🔴 Needs Ritual organisms
│  ├─ onboarding/   # ✅ Complete
│  └─ admin/        # ✅ Complete
│
└─ components/      # 45 files (ALL infrastructure, NO UI)
   ├─ admin/        # Admin-specific infrastructure
   ├─ auth/         # Auth infrastructure
   ├─ error-boundaries/
   ├─ landing/      # Page-specific
   └─ ...           # Providers, guards, utilities
```

### Import Patterns

```typescript
// ✅ CORRECT
import {
  Button,
  FeedCardPost,  // When it exists
  SpaceComposer,
  PinnedPostsStack
} from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import type { User, Space } from '@hive/core';

// ❌ WRONG (generic components, not topology-specific)
import { PostCard } from '@hive/ui'; // Generic, not Feed-specific
import { Button } from '@/components/ui/button'; // Should use @hive/ui

// ❌ WRONG (non-existent paths)
import { FeedCard } from '@/components/feed/'; // Doesn't exist
```

---

## Part 9: Metrics & Goals

### Current State (November 2, 2025)
```
Components in @hive/ui:        117 (atoms + molecules + organisms + templates)
  - Atoms:                     39/50 (78%)
  - Molecules:                 9/30 (30%)
  - Organisms:                 4/30 (13%) ← CRITICAL GAP
  - Templates:                 10/15 (67%)

Components in apps/web:        45 (all infrastructure, 0 UI)
API routes:                    175 (all with middleware)
Storybook stories:             94/170 target (55%)
Design-fit rate:               2% (3 components match philosophy)
Atomic compliance:             100% (no UI in apps/web)
```

### Launch Goals (November 5, 2025)
```
Target Storybook:        80% (136/170 stories)
Target Organisms:        60% (18/30) — Feed + Spaces + Profile
Target E2E:              Core flows covered (20+ tests)
Target Performance:      p75 TTI < 2.5s (Feed, Spaces)
Target Accessibility:    WCAG 2.2 AA compliance
Target Design-fit:       50%+ (components match topology specs)
```

### Post-Launch Goals (November 15, 2025)
```
Target Storybook:        100% (170/170 stories)
Target Organisms:        90% (27/30) — All features
Target Scale Features:   50% (virtualization, shortcuts, offline)
Target Test Coverage:    70%+ (unit + component + E2E)
Target Visual Tests:     100% Storybook stories
Target Bundle Size:      < 800KB gzipped initial
```

---

## How to Use This Checklist

### For New Features:
1. **Check this list FIRST** — Does component exist?
2. **Check topology spec** — Does it match FEED/SPACES/HIVELAB_TOPOLOGY.md?
3. **If NO**, determine atomic layer (atom/molecule/organism/template)
4. **Create Storybook story FIRST** (with realistic fixtures)
5. **Build component in Storybook** (compose from existing atoms/molecules)
6. **Wire to page** (update route file)
7. **Create E2E test** (if critical flow)
8. **Update this checklist** (mark as complete)

### For Bug Fixes:
1. **Find component in this list**
2. **Check if story exists** (reproduce bug in Storybook)
3. **Fix in Storybook first** (verify all variants)
4. **Verify in page** (check route)
5. **Add E2E regression test** (prevent future bugs)

### For Refactoring:
1. **Check "Design-Fit Audit"** — Does component match topology?
2. **If NO**, rebuild to match spec (see DESIGN_FIT_AUDIT.md)
3. **Create story** (before refactoring)
4. **Refactor** (maintain API compatibility)
5. **Update this checklist** (mark as refactored)

---

## Appendix: Design Philosophy Checklist

Use this for **every** new component:

### Arc/Linear/Vercel Minimalism
- [ ] **Calm chrome** — Subtle borders (`border-white/8`), minimal backgrounds (`bg-black/20`)
- [ ] **Crisp hierarchy** — Clear visual weight, proper spacing (4px grid)
- [ ] **Zero mystery** — Explainability chips, clear labels, no hidden actions
- [ ] **Content-first** — No decorative elements, focus on user content

### Token-Driven
- [ ] Uses CSS variables (`var(--hive-brand-primary)`)
- [ ] No hardcoded colors, spacing, or radii
- [ ] Respects dark theme (default theme)
- [ ] High contrast (WCAG AA minimum)

### Performance-Ready
- [ ] Lazy loadable (code-split if > 100KB)
- [ ] Virtualization support (if renders lists > 50 items)
- [ ] Optimistic updates (if has interactions)
- [ ] Memoized (React.memo if expensive)

### Accessibility
- [ ] Keyboard navigable (Tab, Enter, Esc)
- [ ] Focus rings visible (`focus-visible:ring-2`)
- [ ] ARIA labels for icons (`aria-label`)
- [ ] Semantic HTML (`<button>` not `<div onClick>`)

### Mobile-First
- [ ] Works on 375px viewport
- [ ] Touch targets ≥44px
- [ ] No horizontal scroll
- [ ] Progressive disclosure (not hidden features)

---

**Last Updated**: November 2, 2025
**Next Review**: Daily during Nov 2-5 sprint
**Owner**: Design Architect + Engineering Team

**Critical Next Steps**:
1. Build 4 FeedCard organisms (Nov 2-3)
2. Build 3 Space widgets (Nov 4)
3. Rebuild Feed page with virtualization (Nov 2-3)
4. Performance optimization (Nov 5)
5. Launch 🚀 (November 5, 2025)
