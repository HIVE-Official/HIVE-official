# HIVE — Complete UX/UI Build Checklist
**Created**: November 2, 2025
**Status**: Authoritative Build Tracker
**Purpose**: Every component needed for production launch and scale

---

## 📊 Executive Dashboard

### Overall Build Status
```
Foundation:              ✅ 100% (tokens, shell, auth, API)
Navigation:              ✅ 90% (shell complete, shortcuts missing)
Atoms (55 needed):       🟡 71% (39/55)
Molecules (42 needed):   🔴 21% (9/42)
Organisms (35 needed):   🔴 11% (4/35) ← CRITICAL BLOCKER
Templates (18 needed):   🟡 56% (10/18)
Pages (11 core routes):  🟡 73% (8/11 ready)

Total Components:        150 target
Built:                   70 complete (47%)
Needs Refinement:        12 components (8%)
Not Started:             68 components (45%) ← BUILD QUEUE
```

### By Feature Slice
| Feature | Status | Atoms | Molecules | Organisms | Templates | Priority | Blocker? |
|---------|--------|-------|-----------|-----------|-----------|----------|----------|
| **Global Systems** | 🟡 65% | 39/50 | 9/30 | 0/5 | 3/5 | P0 | ⚠️ Shortcuts |
| **Onboarding/Auth** | ✅ 95% | ✅ | ✅ | 4/4 | ✅ | P0 | ✅ Ready |
| **Feed** | 🔴 25% | 🟡 | 🔴 | 0/7 | 0/2 | P0 | 🚫 BLOCKS LAUNCH |
| **Spaces** | 🟡 55% | ✅ | 🟡 | 1/5 | 1/3 | P0 | ⚠️ Widgets |
| **Profile** | 🟡 50% | ✅ | 🟡 | 0/3 | 2/3 | P1 | ⚠️ Header |
| **HiveLab** | 🟡 60% | ✅ | 🟡 | 0/5 | 4/4 | P2 | ⚠️ Studio |
| **Rituals** | 🔴 20% | 🟡 | 🔴 | 0/4 | 0/1 | P1 | 🚫 BLOCKS LAUNCH |
| **Events** | 🔴 30% | 🟡 | 🔴 | 0/2 | 0/1 | P1 | ⚠️ Cards |

**Critical Findings**:
- ✅ **Auth/Onboarding**: Ship-ready (95% complete)
- 🚫 **Feed + Rituals**: Cannot launch without organisms (0% complete)
- ⚠️ **Spaces**: 55% complete (need widgets for full spec)
- 🟡 **Profile + HiveLab**: Post-launch priority (50-60% complete)

---

## Part 1: Foundation Systems (100% Complete)

### 1.1 Design Tokens ✅
**Location**: `packages/tokens/`
**Status**: ✅ PRODUCTION READY

- [x] Color tokens (`colors-prd-aligned.ts`) — Black + Gold system ✅
- [x] Typography tokens — Display/Title/Heading/Body/Caption scales ✅
- [x] Spacing tokens — 4px grid (4, 8, 12, 16, 24, 32) ✅
- [x] Radius tokens — xs/sm/md/lg (6/10/14/22px) ✅
- [x] Elevation tokens — e0-e3 shadow system ✅
- [x] Motion tokens — 120/160/240ms durations + easing ✅
- [x] Breakpoints — xs/sm/md/lg/xl responsive system ✅
- [x] Z-index system — Shell/Overlay/Modal/Toast layers ✅
- [x] CSS generation script — `generate-css.ts` ✅
- [x] Tailwind integration — `tailwind-config.ts` ✅

**Files**:
- ✅ `packages/tokens/src/colors-prd-aligned.ts`
- ✅ `packages/tokens/src/tailwind-config.ts`
- ✅ `packages/tokens/hive-tokens-generated.css`
- ✅ `packages/tokens/hive-tokens.css`

**Stories**: ✅ Token documentation in Storybook
**Priority**: ✅ Complete — No action needed

---

### 1.2 Shell & Navigation ✅
**Location**: `packages/ui/src/shells/`, `packages/ui/src/navigation/`
**Status**: ✅ PRODUCTION READY

- [x] `UniversalShell.tsx` — Main app wrapper with routing ✅
- [x] `UniversalNav.tsx` — Navigation system (sidebar + top bar) ✅
- [x] Desktop sidebar — Collapsible, icon + label, 5 primary routes ✅
- [x] Mobile bottom nav — 5 actions, active state, haptic feedback ✅
- [x] Top bar — Context breadcrumbs, search, notifications, avatar ✅
- [x] Command palette — `Cmd+K` fuzzy search ✅

**Stories**:
- [x] `07-Complete-Systems/AppNavigation.stories.tsx`
- [x] `07-Complete-Systems/SidebarShadcn.stories.tsx`
- [x] `05-Navigation/CommandPalette.stories.tsx`

**E2E**:
- [x] `universal-shell.spec.ts` (310 lines) — Navigation flows ✅

**Priority**: ✅ Complete — No action needed

---

### 1.3 Authentication & Security ✅
**Location**: `apps/web/src/lib/middleware/`, `apps/web/src/lib/`
**Status**: ✅ PRODUCTION READY

- [x] Magic link auth — @buffalo.edu email validation ✅
- [x] JWT sessions — HttpOnly cookies (24h users, 4h admins) ✅
- [x] Session middleware — `withAuthAndErrors` (200+ routes) ✅
- [x] Admin middleware — `withAdminAuthAndErrors` (46 routes) ✅
- [x] CSRF protection — Admin routes only ✅
- [x] Rate limiting — 5/60/100 req/min by route type ✅
- [x] Campus isolation — `campusId: 'ub-buffalo'` enforced ✅
- [x] Admin role verification — Email whitelist + isAdmin flag ✅

**Files**:
- [x] `apps/web/src/lib/middleware/withAuthAndErrors.ts`
- [x] `apps/web/src/lib/middleware/withAdminAuthAndErrors.ts`
- [x] `apps/web/src/lib/auth-server.ts`
- [x] `apps/web/src/lib/secure-firebase-admin.ts`

**E2E**:
- [x] `auth-magic-link-onboarding.spec.ts` — Full auth flow ✅

**Priority**: ✅ Complete — No action needed

---

### 1.4 API Routes ✅
**Location**: `apps/web/src/app/api/`
**Status**: ✅ 175 ROUTES PRODUCTION READY

- [x] Auth routes (12) — Login, verify, onboarding ✅
- [x] Profile routes (13) — CRUD, privacy, stats ✅
- [x] Spaces routes (31) — CRUD, members, posts, events ✅
- [x] Feed routes (9) — Aggregation, filters, search ✅
- [x] Tools/HiveLab routes (21) — CRUD, deploy, analytics ✅
- [x] Rituals routes (3+) — Join, track, complete ✅
- [x] Admin routes (46) — Moderation, analytics, system ✅
- [x] Other routes (40+) — Notifications, search, schools ✅

**All routes use**: Consolidated middleware with campus isolation ✅

**Priority**: ✅ Complete — No action needed

---

## Part 2: Atomic Components

### 2.1 Atoms (39/55 = 71%)

#### ✅ Form Controls (8/11 complete)
**Location**: `packages/ui/src/atomic/atoms/`

- [x] `button.tsx` — All variants (primary/ghost/brand/outline) ✅
- [x] `input.tsx` — Text, email, password, search ✅
- [x] `textarea.tsx` — Auto-growing supported ✅
- [x] `checkbox.tsx` — Default + indeterminate states ✅
- [x] `switch.tsx` — Toggle with labels ✅
- [x] `select.tsx` — Native + custom variants ✅
- [x] `slider.tsx` — Range input ✅
- [x] `label.tsx` — Form labels with required indicators ✅
- [ ] **⭐ date-time-picker.tsx** — Event creation (P0) ❌
- [ ] **⭐ file-upload.tsx** — Media posts (P0) ❌
- [ ] **⭐ radio-group.tsx** — Onboarding selections (P1) ❌

**Stories**:
- [x] `04-Controls/Input.stories.tsx` ✅
- [x] `04-Controls/Button.stories.tsx` ✅
- [x] `04-Controls/Toggles.stories.tsx` ✅

**Priority**: P0 — Need date picker and file upload for events/posts

---

#### ✅ Navigation Atoms (3/3 complete)

- [x] `top-bar-nav.tsx` — Global nav bar ✅
- [x] `command.tsx` — Command palette (Cmd+K) ✅
- [x] `context-menu.tsx` — Right-click menus ✅

**Stories**:
- [x] `05-Navigation/Tabs.stories.tsx` ✅
- [x] `05-Navigation/CommandPalette.stories.tsx` ✅

**Priority**: ✅ Complete

---

#### ✅ Modals & Overlays (7/7 complete)

- [x] `dialog.tsx` — Base dialog (Radix) ✅
- [x] `hive-modal.tsx` — Styled modal with header/footer ✅
- [x] `hive-confirm-modal.tsx` — Confirmation dialogs ✅
- [x] `sheet.tsx` — Slide-up mobile sheet ✅
- [x] `action-sheet.tsx` — Mobile bottom action menu ✅
- [x] `popover.tsx` — Floating content ✅
- [x] `tooltip.tsx` — Hover hints ✅

**Stories**:
- [x] `06-Overlays/Sheet.stories.tsx` ✅
- [x] `06-Overlays/ActionSheet.stories.tsx` ✅
- [x] `06-Overlays/Popover.stories.tsx` ✅
- [x] `06-Overlays/Tooltip.stories.tsx` ✅

**Priority**: ✅ Complete

---

#### ✅ Cards & Containers (5/5 complete)

- [x] `card.tsx` — Base card primitive ✅
- [x] `hive-card.tsx` — Styled card with hover states ✅
- [x] `grid.tsx` — Responsive grid layout ✅
- [x] `avatar.tsx` — User avatars (Radix) ✅
- [x] `simple-avatar.tsx` — Minimal avatar variant ✅

**Stories**:
- [x] `01-Layout/Grid.stories.tsx` ✅
- [x] `02-Atoms/HiveCard.stories.tsx` ✅

**Priority**: ✅ Complete

---

#### ✅ Display & Feedback (7/8 complete)

- [x] `badge.tsx` — Status indicators ✅
- [x] `alert.tsx` — Info/success/warning/error alerts ✅
- [x] `progress.tsx` — Linear progress bar ✅
- [x] `skeleton.tsx` — Loading placeholders ✅
- [x] `notification-bell.tsx` — Notification icon with count ✅
- [x] `notification-item.tsx` — Single notification ✅
- [x] `presence-indicator.tsx` — Online/offline status ✅
- [ ] **⭐ toast.tsx** — Toast notifications (P1) ❌

**Priority**: P1 — Toast needed for user feedback

---

#### 🟡 Media Atoms (3/6 complete)

- [x] `media-viewer.tsx` — Full-screen image viewer ✅
- [x] `media-thumb.tsx` — Thumbnail preview ✅
- [x] `tabs.tsx` — Tabbed navigation ✅
- [ ] **⭐ video-player.tsx** — Video posts (P1) ❌
- [ ] **⭐ image-carousel.tsx** — Multi-photo posts (P1) ❌
- [ ] **⭐ audio-player.tsx** — Audio content (P2) ❌

**Priority**: P1 — Video + carousel needed for media posts

---

#### ✅ Utility Atoms (4/4 complete)

- [x] `check-icon.tsx` — Animated checkmark ✅
- [x] `percent-bar.tsx` — Percentage visualization ✅
- [x] `hive-logo.tsx` — Brand logo variants ✅
- [x] `separator.tsx` — Horizontal/vertical dividers ✅

**Priority**: ✅ Complete

---

#### 🟡 Icon System (0/1 needed)

- [ ] **⭐ icon-library.tsx** — Unified icon system (P0) ❌
  - **Spec**: Lucide icons + custom HIVE icons
  - **Usage**: All UI components should use centralized icons
  - **Priority**: P0 — Prevents icon inconsistency

---

### Atoms Summary
- **Complete**: 39/55 (71%)
- **Missing**: 16 atoms
  - **P0 Blockers** (3): date-time-picker, file-upload, icon-library
  - **P1 High** (5): radio-group, toast, video-player, image-carousel
  - **P2 Nice** (1): audio-player
- **Action**: Build P0 atoms in Week 1 (Nov 2-5)

---

### 2.2 Molecules (9/42 = 21%)

#### 🟡 Navigation Molecules (4/12 complete)

- [x] `navigation-primitives.tsx` — NavLink, NavButton, NavDivider ✅
- [x] `breadcrumbs.tsx` — Breadcrumb navigation ✅
- [x] `pagination.tsx` — Pagination controls ✅
- [x] `progress-steps.tsx` — Step indicator (onboarding) ✅
- [ ] **⭐ header-bar.tsx** — Page header with actions (P1) ❌
- [ ] **⭐ dropdown-menu.tsx** — Dropdown menu (P0) ❌
- [ ] **⭐ action-bar.tsx** — Action bar (toolbar) (P1) ❌
- [ ] **⭐ search-bar.tsx** — Search input with filters (P0) ❌
- [ ] **⭐ filter-chips.tsx** — Filter chip group (P0) ❌
- [ ] **⭐ sort-dropdown.tsx** — Sort options dropdown (P1) ❌
- [ ] **⭐ tab-bar.tsx** — Tab navigation (P1) ❌
- [ ] **⭐ menu-bar.tsx** — Menu bar (P2) ❌

**Priority**: P0 — dropdown-menu, search-bar, filter-chips needed for Feed

---

#### 🟢 Space Molecules (2/2 complete) — **TOPOLOGY COMPLIANT**

- [x] `space-composer.tsx` — NO avatar, consolidated [+ Add] ✅ **PERFECT**
- [x] `pinned-posts-stack.tsx` — Vertical stack, gold left border ONLY ✅ **PERFECT**

**Stories**:
- [x] `13-Spaces-Communities/Spaces.ComposerChat.stories.tsx` ✅

**Priority**: ✅ Complete — Matches SPACES_TOPOLOGY.md exactly

---

#### 🔴 Feed Molecules (0/7 needed) — **P0 BLOCKER**

- [ ] **⭐ feed-filter-bar.tsx** — All/My Spaces/Events chips (P0) ❌
  - **Spec**: FEED_TOPOLOGY.md lines 61-118
  - **Props**: `activeFilter`, `onFilterChange`, `counts?`
  - **Visual**: Horizontal scroll on mobile, inline on desktop
  - **Story**: Variants (default, with-counts, active-states)
  - **Priority**: P0 — Blocks Feed launch

- [ ] **⭐ feed-ritual-banner.tsx** — Full-width ritual strip (P0) ❌
  - **Spec**: UX-UI-TOPOLOGY.md section 2.6
  - **Props**: `ritual`, `onJoin`, `onSnooze`, `onHide`
  - **Visual**: Dismissible, compresses after scroll (mobile)
  - **Story**: Variants (active, urgent, celebration)
  - **Priority**: P0 — Blocks Feed launch

- [ ] **⭐ feed-empty-state.tsx** — "Join Spaces to see activity" (P1) ❌
  - **Props**: `variant` (no-spaces/no-posts/no-results), `suggestedSpaces?`
  - **Story**: Variants (no-spaces, no-posts, no-results)
  - **Priority**: P1 — Nice to have

- [ ] **⭐ feed-post-actions.tsx** — Upvote/Comment/Bookmark row (P0) ❌
  - **Props**: `upvotes`, `comments`, `bookmarked`, `onUpvote`, `onComment`, `onBookmark`
  - **Visual**: Icon + count, optimistic updates
  - **Priority**: P0 — Shared across all FeedCard variants

- [ ] **⭐ feed-explainability-chip.tsx** — "Why am I seeing this?" (P1) ❌
  - **Props**: `reason` (joined_space/interests/trending), `label`
  - **Visual**: Small chip, tooltip on hover
  - **Priority**: P1 — Transparency feature

- [ ] **⭐ feed-space-chip.tsx** — Space badge with color (P0) ❌
  - **Props**: `space` (id/name/slug/color), `onClick?`
  - **Visual**: Colored background, clickable
  - **Priority**: P0 — Used in all FeedCard variants

- [ ] **⭐ feed-media-preview.tsx** — Image/video preview (P0) ❌
  - **Props**: `media` (url/type/aspect/alt), `onClick`
  - **Visual**: 16:9 aspect ratio, lazy load
  - **Priority**: P0 — Used in Post/Event cards

**Priority**: P0 — All Feed molecules block launch

---

#### 🔴 Space Molecules (3/8 needed) — **P0 BLOCKER**

**Existing**:
- [x] `space-composer.tsx` ✅ (listed above)
- [x] `pinned-posts-stack.tsx` ✅ (listed above)
- [x] `space-header.tsx` ✅ **VERIFIED** — Minimal spec compliant

**Missing**:
- [ ] **⭐ space-about-widget.tsx** — Description + leaders inline (P0) ❌
  - **Spec**: SPACES_TOPOLOGY.md lines 378-425
  - **Props**: `description`, `leaders[]`, `memberCount`, `createdAt`
  - **Visual**: Max 140px height (3 lines description)
  - **Story**: Variants (with-leaders, no-leaders, long-description)
  - **Priority**: P0 — Right rail widget (blocks Space Board)

- [ ] **⭐ space-tools-widget.tsx** — Active tools (≤3) with close time (P0) ❌
  - **Spec**: SPACES_TOPOLOGY.md lines 429-462
  - **Props**: `tools[]` (max 3), `onClickTool`
  - **Visual**: Gold left border, close time countdown
  - **Story**: Variants (0-tools, 1-tool, 3-tools, expired)
  - **Priority**: P0 — Right rail widget (blocks Space Board)

- [ ] **⭐ space-events-widget.tsx** — Upcoming events (compact) (P1) ❌
  - **Spec**: SPACES_TOPOLOGY.md lines 467-495
  - **Props**: `events[]` (upcoming only), `onClickEvent`
  - **Visual**: Blue left border, date + time
  - **Story**: Variants (0-events, 1-event, 3-events)
  - **Priority**: P1 — Right rail widget (nice to have)

- [ ] **⭐ space-card.tsx** — Discovery card (grid view) (P0) 🔧
  - **File**: EXISTS — needs verification against minimal spec
  - **Spec**: SPACES_TOPOLOGY.md lines 500-600
  - **Props**: `space`, `memberCount`, `socialProof?`, `onJoin`
  - **Visual**: Icon, name, member count, join policy badge
  - **Action**: Verify no clutter (remove decorative elements)
  - **Priority**: P0 — Verify/refactor

- [ ] **⭐ space-member-row.tsx** — Member list item (P2) ❌
  - **Props**: `user`, `role` (leader/member), `onRemove?` (if leader)
  - **Visual**: Avatar + name + role badge
  - **Priority**: P2 — Member management (post-launch)

**Priority**: P0 — About/Tools widgets block Space Board launch

---

#### 🔴 Profile Molecules (0/5 needed) — **P1 BLOCKER**

- [ ] **⭐ profile-stat-tile.tsx** — Single stat display (P1) ❌
  - **Props**: `label`, `value`, `trend?` (up/down/neutral)
  - **Visual**: Label + large number + trend icon
  - **Priority**: P1 — Used in ProfileHeader

- [ ] **⭐ profile-activity-item.tsx** — Timeline activity row (P1) ❌
  - **Props**: `activity` (type/timestamp/title/metadata)
  - **Visual**: Icon + timestamp + title + link
  - **Priority**: P1 — Used in ProfileTimeline

- [ ] **⭐ profile-connection-card.tsx** — Connection display (P2) ❌
  - **Props**: `user`, `mutualFriends?`, `onMessage?`
  - **Visual**: Avatar + name + bio snippet + action
  - **Priority**: P2 — Connections page (post-launch)

- [ ] **⭐ profile-completion-step.tsx** — Completion checklist item (P1) ❌
  - **Props**: `step` (label/completed/points), `onClick?`
  - **Visual**: Checkmark + label + points badge
  - **Priority**: P1 — Gamification widget

- [ ] **⭐ profile-badge.tsx** — Achievement badge (P2) ❌
  - **Props**: `badge` (name/icon/earnedAt), `onClick?`
  - **Visual**: Icon + name + tooltip
  - **Priority**: P2 — Gamification (post-launch)

**Priority**: P1 — Stat/activity molecules needed for profile

---

#### 🔴 HiveLab Molecules (0/5 needed) — **P2**

- [ ] **⭐ element-palette.tsx** — Draggable element library (P2) ❌
  - **Spec**: HIVELAB_TOOLS_TOPOLOGY.md lines 194-264
  - **Props**: `elements[]`, `onDragStart`, `categories` (BUILD/RESULTS)
  - **Visual**: 2 categories (reduced from 4), drag handles
  - **Priority**: P2 — Desktop-only Studio (post-launch)

- [ ] **⭐ inspector-panel.tsx** — Element properties editor (P2) ❌
  - **Props**: `selectedElement?`, `onPropertyChange`, `lintErrors?`
  - **Visual**: Config/Lint tabs, property fields
  - **Priority**: P2 — Desktop-only Studio

- [ ] **⭐ lint-panel.tsx** — Validation errors (P2) ❌
  - **Spec**: HIVELAB_TOOLS_TOPOLOGY.md lines 1030-1052
  - **Props**: `errors[]` (blocking/warning)
  - **Visual**: Red (blocking), yellow (warning)
  - **Priority**: P2 — Embedded in InspectorPanel

- [ ] **⭐ tool-library-card.tsx** — Tool card in workspace (P2) ❌
  - **Props**: `tool` (id/title/status/responseCount/closesAt), `onEdit`, `onDeploy`
  - **Visual**: Status badge, quick actions
  - **Priority**: P2 — Workspace grid

- [ ] **⭐ tool-deploy-form.tsx** — Deploy settings (P2) ❌
  - **Props**: `tool`, `onDeploy`, `onCancel`
  - **Visual**: 2 visible fields (closeTime, installTarget) + collapsed advanced
  - **Priority**: P2 — Deploy flow

**Priority**: P2 — Desktop-only, post-launch

---

#### 🔴 Ritual Molecules (0/3 needed) — **P1 BLOCKER**

- [ ] **⭐ ritual-progress-bar.tsx** — Progress meter with count (P1) ❌
  - **Props**: `progress` (0-100), `participantCount`, `goal?`, `variant` (compact/full)
  - **Visual**: Progress bar + "347 students joined"
  - **Priority**: P1 — Used in RitualCard + RitualStrip

- [ ] **⭐ ritual-task-item.tsx** — Checklist task row (P1) ❌
  - **Props**: `task` (label/completed), `onToggle`
  - **Visual**: Checkbox + label + completion badge
  - **Priority**: P1 — Ritual participation

- [ ] **⭐ recap-card.tsx** — Post-ritual summary (P2) ❌
  - **Props**: `ritual` (id/title/completionCount/topParticipants/stats), `userParticipated`, `userReward?`
  - **Visual**: Summary stats + leaderboard + reward badge
  - **Priority**: P2 — Auto-generated after ritual ends

**Priority**: P1 — Progress bar blocks Rituals launch

---

### Molecules Summary
- **Complete**: 9/42 (21%)
- **Missing**: 33 molecules
  - **P0 Blockers** (14): Feed molecules (7), Space widgets (3), icons (1), search/filter (3)
  - **P1 High** (12): Profile molecules (3), Ritual molecules (2), Navigation (7)
  - **P2 Nice** (7): HiveLab molecules (5), Profile badges (2)
- **Action**: Build P0 molecules in Week 1 (Nov 2-5)

---

### 2.3 Organisms (4/35 = 11%) — **CRITICAL BLOCKER**

#### 🔴 Feed Organisms (0/7 needed) — **P0 BLOCKER**

- [ ] **⭐ feed-card-post.tsx** — Text/photo posts (P0) ❌
  - **Spec**: FEED_TOPOLOGY.md lines 176-200
  - **Props**: `type: 'post'`, `space`, `createdAt`, `title`, `body?`, `media?`, `primaryActions`, `metadata`, `explainability?`
  - **Visual**: Space chip (colored), title (max 2 lines), body preview (max 3 lines), media (16:9), actions
  - **Story**: Variants (text-only, with-image, with-video, long-preview)
  - **Priority**: P0 — Blocks Feed launch

- [ ] **⭐ feed-card-event.tsx** — Events with RSVP CTA (P0) ❌
  - **Spec**: FEED_TOPOLOGY.md lines 176-200
  - **Props**: `type: 'event'`, `space`, `eventTime`, `title`, `media` (REQUIRED), `rsvpCount`, `capacity?`, `primaryActions: ['RSVP →']`, `metadata`
  - **Visual**: 16:9 cover image, "Tomorrow at 7pm", "23/50 going", RSVP button
  - **Story**: Variants (upcoming, today, sold-out, past)
  - **Priority**: P0 — Blocks Feed launch

- [ ] **⭐ feed-card-tool.tsx** — Featured HiveLab tools (P0) ❌
  - **Spec**: FEED_TOPOLOGY.md lines 176-200
  - **Props**: `type: 'tool'`, `space`, `featured`, `title`, `description?`, `toolBy`, `installCount?`, `primaryActions: ['Open Tool →']`
  - **Visual**: "Featured" badge, "🛠️ Tool by @jacob", "47 installs"
  - **Story**: Variants (featured, normal, high-installs)
  - **Priority**: P0 — Blocks Feed launch

- [ ] **⭐ feed-card-system.tsx** — Ritual progress, announcements (P0) ❌
  - **Spec**: FEED_TOPOLOGY.md lines 176-200
  - **Props**: `type: 'system'`, `systemType` (ritual/announcement), `title`, `body`, `progress?`, `participantCount?`, `primaryActions`, `theme?` (ritual/urgent/celebration)
  - **Visual**: Full text (no preview), progress bar (if ritual), themed styling
  - **Story**: Variants (ritual-active, announcement, urgent)
  - **Priority**: P0 — Blocks Feed launch

- [ ] **⭐ feed-composer-sheet.tsx** — Create post overlay (P0) ❌
  - **Props**: `initialSpace?`, `initialContent?`, `onPublish`, `onCancel`
  - **Visual**: Sheet with space selector, title/body fields, media upload, publish button
  - **Story**: Variants (new-post, with-space, with-media)
  - **Priority**: P0 — First post creation flow

- [ ] **⭐ feed-post-detail-sheet.tsx** — Post detail overlay (P1) ❌
  - **Props**: `post`, `comments[]`, `onComment`, `onUpvote`, `onBookmark`
  - **Visual**: Full post + comment thread + actions
  - **Story**: Variants (with-comments, no-comments, many-comments)
  - **Priority**: P1 — Post engagement

- [ ] **⭐ feed-virtualized-list.tsx** — Infinite scroll container (P0) ❌
  - **Props**: `posts[]`, `onLoadMore`, `hasMore`, `renderCard`
  - **Tech**: react-window for virtualization (60fps with 10,000+ posts)
  - **Story**: Variants (100-posts, 1000-posts, loading, empty)
  - **Priority**: P0 — Performance at scale

**Priority**: P0 — All 7 Feed organisms block launch

---

#### 🔴 Space Organisms (1/5 needed) — **P0 BLOCKER**

**Existing**:
- [x] `space-header.tsx` ✅ **VERIFIED** — Minimal metadata, shared across apps

**Missing**:
- [ ] **⭐ space-board-layout.tsx** — Feed-first board view (P0) ❌
  - **Spec**: SPACES_TOPOLOGY.md lines 100-300
  - **Props**: `space`, `pinnedPosts[]`, `posts[]`, `rightRail` (About/Tools/Events widgets)
  - **Visual**: Pinned stack → Stream → Right rail (desktop) / Single scroll (mobile)
  - **Story**: Variants (with-pinned, no-pinned, empty)
  - **Priority**: P0 — Main space view (blocks launch)

- [ ] **⭐ space-post-composer.tsx** — Post creation in space (P0) ❌
  - **Props**: `spaceId`, `onPublish`, `onCancel`
  - **Visual**: Title + body fields, media upload, publish button
  - **Note**: Reuse FeedComposerSheet with space pre-selected
  - **Priority**: P0 — Post creation flow

- [ ] **⭐ space-member-list.tsx** — Member directory (P2) ❌
  - **Props**: `members[]`, `isLeader`, `onRemove?`
  - **Visual**: Grid of member cards, search/filter
  - **Priority**: P2 — Member management (post-launch)

- [ ] **⭐ space-settings-modal.tsx** — Space configuration (P2) ❌
  - **Props**: `space`, `isLeader`, `onUpdate`
  - **Visual**: Tabs (General/Members/Tools/Danger)
  - **Priority**: P2 — Leader tools (post-launch)

**Priority**: P0 — SpaceBoardLayout blocks launch

---

#### 🔴 Profile Organisms (0/3 needed) — **P1 BLOCKER**

- [ ] **⭐ profile-header.tsx** — Avatar, name, bio, stats (P1) ❌
  - **Spec**: PROFILE_TOPOLOGY.md lines 100-200
  - **Props**: `user` (avatarUrl/fullName/handle/verificationBadge/bio), `stats` (spacesJoined/eventsAttended/highlightsCount), `isOwnProfile`, `primaryAction?`, `overflowActions?`
  - **Visual**: Full-width header, stats ribbon below bio
  - **Story**: Variants (own-profile, other-profile, verified)
  - **Priority**: P1 — Profile page header

- [ ] **⭐ profile-timeline.tsx** — Chronological activity feed (P1) ❌
  - **Spec**: PROFILE_TOPOLOGY.md lines 300-400
  - **Props**: `activities[]` (type/timestamp/title/metadata)
  - **Visual**: Vertical timeline with icons
  - **Story**: Variants (full-timeline, filtered-timeline, empty)
  - **Priority**: P1 — Profile activity view

- [ ] **⭐ profile-edit-form.tsx** — Profile editing interface (P1) ❌
  - **Props**: `profile`, `onSave`, `onCancel`
  - **Visual**: Avatar upload, name/handle/bio fields, privacy settings
  - **Story**: Variants (with-avatar, no-avatar, validation-errors)
  - **Priority**: P1 — Edit profile flow

**Priority**: P1 — ProfileHeader blocks profile pages

---

#### 🔴 HiveLab Organisms (0/5 needed) — **P2**

- [ ] **⭐ hivelab-studio.tsx** — Three-pane builder (P2) ❌
  - **Spec**: HIVELAB_TOOLS_TOPOLOGY.md lines 140-192
  - **Props**: `tool`, `onSave`, `onDeploy`
  - **Visual**: Toolbar (64px) + 3-pane (Palette/Canvas/Inspector)
  - **Desktop-only**: 1280px+ viewport
  - **Story**: Variants (new-tool, editing-tool, with-lint-errors)
  - **Priority**: P2 — Desktop-only (post-launch)

- [ ] **⭐ hivelab-workspace.tsx** — Tool library grid (P2) ❌
  - **Props**: `tools[]`, `onCreate`, `onEdit`
  - **Visual**: Grid of ToolLibraryCards, search/filter
  - **Story**: Variants (empty, few-tools, many-tools)
  - **Priority**: P2 — Workspace view

- [ ] **⭐ hivelab-tool-preview.tsx** — Live tool render (P2) ❌
  - **Props**: `tool`, `mode` (preview/live)
  - **Visual**: Renders tool elements dynamically
  - **Priority**: P2 — Canvas preview

- [ ] **⭐ hivelab-response-viewer.tsx** — Analytics dashboard (P2) ❌
  - **Props**: `tool`, `responses[]`
  - **Visual**: Counts + lists (no charts), export CSV
  - **Priority**: P2 — Tool analytics

- [ ] **⭐ hivelab-deploy-sheet.tsx** — Deploy configuration (P2) ❌
  - **Props**: `tool`, `onDeploy`, `onCancel`
  - **Visual**: 2 fields (closeTime/installTarget) + collapsed advanced
  - **Priority**: P2 — Deploy flow

**Priority**: P2 — Desktop-only, post-launch

---

#### 🔴 Ritual Organisms (0/4 needed) — **P1 BLOCKER**

- [ ] **⭐ ritual-card.tsx** — Ritual display in /rituals list (P1) ❌
  - **Spec**: UX-UI-TOPOLOGY.md section 2.6
  - **Props**: `ritual` (id/title/type/participationType/timeRemaining/participantCount/reward), `userProgress?` (joined/progress/completionCount), `onJoin`, `onLeave`
  - **Visual**: Card with progress bar (if joined), countdown, reward badge
  - **Story**: Variants (joined, not-joined, completed)
  - **Priority**: P1 — Rituals page

- [ ] **⭐ ritual-strip.tsx** — Feed banner (S2 slot) (P0) ❌
  - **Shared with Feed organisms** (already listed above)
  - **Spec**: UX-UI-TOPOLOGY.md section 2.6
  - **Props**: `ritual`, `onJoin`, `onSnooze`, `onHide`
  - **Visual**: Full-width banner, dismissible, compresses on scroll
  - **Story**: Variants (active, urgent, celebration)
  - **Priority**: P0 — Feed integration

- [ ] **⭐ ritual-detail-sheet.tsx** — Ritual details overlay (P1) ❌
  - **Props**: `ritual`, `userProgress?`, `tasks[]`, `leaderboard[]`, `onJoin`, `onToggleTask`
  - **Visual**: Sheet with full details, task checklist, leaderboard
  - **Story**: Variants (not-joined, joined, completed)
  - **Priority**: P1 — Ritual engagement

- [ ] **⭐ ritual-leaderboard.tsx** — Top participants (P2) ❌
  - **Props**: `participants[]` (top 10), `currentUserRank?`
  - **Visual**: Ranked list with avatars + completion counts
  - **Priority**: P2 — Gamification (post-launch)

**Priority**: P1 — RitualCard + RitualStrip block Rituals launch

---

#### 🔴 Event Organisms (0/2 needed) — **P1 BLOCKER**

- [ ] **⭐ event-card.tsx** — Event display (P0) ❌
  - **Shared with Feed** — See FeedCard.Event above
  - **Also used in**: Spaces calendar, profile timeline
  - **Priority**: P0 — Blocks Feed/Spaces launch

- [ ] **⭐ event-sheet.tsx** — Event detail overlay (P1) ❌
  - **Props**: `event` (id/title/description/startTime/endTime/location/coverImageUrl/hostId/capacity/rsvpCount), `userRsvpStatus?`, `attendees?`, `isHost`, `onRsvp`, `onShare`, `onAddToCalendar`, `onCheckIn?`
  - **Visual**: Sheet with full details, RSVP actions, attendee list
  - **Story**: Variants (attendee, host, during-event)
  - **Priority**: P1 — Event engagement

**Priority**: P1 — EventSheet blocks Events launch

---

#### ✅ Auth Organisms (4/4 complete) — **PRODUCTION READY**

**Location**: `packages/ui/src/organisms/auth/`

- [x] Auth login screen ✅
- [x] Auth signup screen ✅
- [x] Auth verification screen ✅
- [x] Auth reset screen ✅

**Stories**:
- [x] `08-Auth/` stories ✅

**Priority**: ✅ Complete

---

### Organisms Summary
- **Total**: 4/35 (11%) ← **CRITICAL GAP**
- **Feed**: 0/7 (0%) — **P0 BLOCKER** 🚫
- **Spaces**: 1/5 (20%) — **P0 BLOCKER** (need SpaceBoardLayout) ⚠️
- **Profile**: 0/3 (0%) — **P1 BLOCKER** ⚠️
- **HiveLab**: 0/5 (0%) — **P2** (post-launch)
- **Rituals**: 0/4 (0%) — **P1 BLOCKER** ⚠️
- **Events**: 0/2 (0%) — **P1 BLOCKER** ⚠️
- **Auth**: 4/4 (100%) ✅
- **Action**: Build 18 P0/P1 organisms in Weeks 1-2 (Nov 2-12)

---

### 2.4 Templates (10/18 = 56%)

#### ✅ Onboarding Templates (1/1 complete)

- [x] `onboarding-experience.tsx` — Full 10-step wizard ✅

**Stories**:
- [x] `08-Auth/OnboardingExperience.stories.tsx` ✅

**Priority**: ✅ Complete

---

#### ✅ Auth Templates (1/1 complete)

- [x] `auth-onboarding-layout.tsx` — Auth layout ✅

**Stories**:
- [x] `08-Auth/AuthOnboardingLayout.stories.tsx` ✅

**Priority**: ✅ Complete

---

#### 🔴 Feed Templates (1/3 needed)

- [x] `feed-loading-skeleton.tsx` — Loading state ✅
- [ ] **⭐ feed-page-layout.tsx** — Main feed with virtualization (P0) ❌
- [ ] **⭐ feed-detail-layout.tsx** — Post detail page (P1) ❌

**Priority**: P0 — feed-page-layout blocks launch

---

#### 🟡 Profile Templates (2/3 needed)

- [x] `profile-view-layout.tsx` — Profile page layout ✅
- [x] `profile-view-loading-skeleton.tsx` — Loading skeleton ✅
- [ ] **⭐ profile-edit-layout.tsx** — Edit profile page (P1) ❌

**Priority**: P1 — Edit page nice to have

---

#### 🟡 Spaces Templates (2/4 needed)

- [x] Spaces discovery grid (inline in page, should extract) ✅
- [x] Space card grid layout ✅
- [ ] **⭐ space-board-layout.tsx** — Board view (P0) ❌
- [ ] **⭐ space-calendar-layout.tsx** — Calendar month + list views (P2) ❌

**Priority**: P0 — space-board-layout blocks launch

---

#### ✅ HiveLab Templates (4/4 complete)

- [x] `hivelab-experience.tsx` — Multi-mode experience ✅
- [x] `hivelab-overview.tsx` — Overview mode ✅
- [x] `hivelab-mode-placeholder.tsx` — Placeholder modes ✅
- [x] HiveLab loading skeleton ✅

**Stories**:
- [x] `07-Complete-Systems/HiveLabExperience.stories.tsx` ✅

**Priority**: ✅ Complete

---

#### 🔴 Rituals Templates (0/1 needed)

- [ ] **⭐ rituals-page-layout.tsx** — Rituals list with tabs (P1) ❌

**Priority**: P1 — Rituals page layout

---

#### 🔴 Events Templates (0/1 needed)

- [ ] **⭐ events-calendar-layout.tsx** — Calendar view (P2) ❌

**Priority**: P2 — Post-launch

---

### Templates Summary
- **Complete**: 10/18 (56%)
- **Missing**: 8 templates
  - **P0 Blockers** (2): feed-page-layout, space-board-layout
  - **P1 High** (3): feed-detail-layout, profile-edit-layout, rituals-page-layout
  - **P2 Nice** (3): space-calendar-layout, events-calendar-layout, admin layouts
- **Action**: Build P0 templates in Week 1 (Nov 2-5)

---

## Part 3: Scale-Ready Patterns (10% Complete)

### 3.1 Performance Optimization (10%)

**From TikTok/Vercel**:
- [ ] **⭐ Virtualized scroll** (react-window) (P0) ❌
  - Feed: 10,000+ posts at 60fps
  - HiveLab: 100+ tools at < 800ms load
  - Space Board: 500+ posts at 60fps
- [ ] **⭐ Lazy loading** (code splitting) (P1) 🔧
  - HiveLab Studio: < 1.5s load
  - Analytics dashboards: Lazy load
- [ ] **⭐ Optimistic updates** (P0) ❌
  - Upvote/like: < 16ms response
  - Comment: < 50ms response
  - Background sync + rollback on failure
- [ ] **⭐ Smart prefetching** (P1) ❌
  - Next feed page at 70% scroll
  - Space content on hover
- [ ] **⭐ Debouncing** (P1) 🔧
  - Autosave: 10s debounce
  - Search: 300ms debounce
  - Analytics events: 30s batch

**Status**: 10% — Only debouncing partially implemented

---

### 3.2 Command Palette & Keyboard Shortcuts (20%)

**From Linear/Vercel**:
- [x] **Command Palette** (`Cmd+K`) ✅
- [ ] **⭐ Global shortcuts** (P0) ❌
  - `Cmd+F` — Go to Feed
  - `Cmd+S` — Browse Spaces
  - `Cmd+P` — Profile
  - `/` — Search/Filter
  - `?` — Show shortcuts help
- [ ] **⭐ Feed shortcuts** (vim-style) (P0) ❌
  - `j/↓` — Next post
  - `k/↑` — Previous post
  - `l` — Like focused post
  - `c` — Comment
  - `b` — Bookmark
  - `o/Enter` — Open detail
- [ ] **⭐ HiveLab shortcuts** (P2) ❌
  - `Cmd+Z/Shift+Z` — Undo/Redo
  - `Cmd+E` — Element palette
  - `↑/↓` — Reorder elements

**Status**: 20% — Only Cmd+K implemented

---

### 3.3 Undo/Redo System (0%)

**From Figma**:
- [ ] **⭐ 50-action history** (P2) ❌
- [ ] **⭐ Granular undo** (< 50ms) (P2) ❌
- [ ] **⭐ Smart grouping** (typing = 1 undo) (P2) ❌
- [ ] **⭐ Persistent across sessions** (P2) ❌

**Status**: 0%

---

### 3.4 Autosave + Version History (0%)

**From Google Docs**:
- [ ] **⭐ Debounced autosave** (10s) (P1) ❌
- [ ] **⭐ 50-version history** (30-day retention) (P2) ❌
- [ ] **⭐ Session recovery** (browser crash) (P1) ❌
- [ ] **⭐ Version restore** (non-destructive) (P2) ❌

**Status**: 0%

---

### 3.5 Real-Time Collaboration (0%)

**From Figma**:
- [ ] **⭐ Live presence indicators** (P2) ❌
- [ ] **⭐ Cursor tracking** (P2) ❌
- [ ] **⭐ Conflict resolution** (last-write-wins) (P2) ❌
- [ ] **⭐ Element locking** (prevent concurrent edits) (P2) ❌

**Status**: 0%

---

### 3.6 Offline Mode & PWA (0%)

**From Best Practices**:
- [ ] **⭐ Service Worker** (cache last 100 posts) (P2) ❌
- [ ] **⭐ Offline action queue** (IndexedDB) (P2) ❌
- [ ] **⭐ Offline banner** (P2) ❌
- [ ] **⭐ Seamless reconnection** (P2) ❌

**Status**: 0%

---

### 3.7 Advanced Filtering (0%)

**From Twitter/Reddit**:
- [ ] **⭐ Compound filters** (P1) ❌
  - Content type (posts/events/tools)
  - Spaces (multi-select)
  - Date range
  - Sort (recent/popular/trending)
- [ ] **⭐ Saved filter presets** (P2) ❌
- [ ] **⭐ Quick access via Cmd+K** (P1) ❌

**Status**: 0%

---

### 3.8 Bookmarks & Collections (0%)

**From Twitter**:
- [ ] **⭐ Bookmark any post/event/tool** (P1) ❌
- [ ] **⭐ Organize into collections** (P2) ❌
- [ ] **⭐ Private/public visibility** (P2) ❌
- [ ] **⭐ Profile → Collections** (P2) ❌

**Status**: 0%

---

### 3.9 Personal Analytics (0%)

**From Arc**:
- [ ] **⭐ Feed analytics** (P2) ❌
  - Activity metrics (posts viewed, upvotes, comments)
  - Top spaces
  - Engagement pattern graph
- [ ] **⭐ HiveLab creator analytics** (P2) ❌
  - Total tools/installs/responses
  - Response rate
  - Top tool by usage

**Status**: 0%

---

### Scale-Ready Patterns Summary
- **Overall**: 10% complete
- **P0 Blockers** (4): Virtualization, optimistic updates, global shortcuts, feed shortcuts
- **P1 High** (6): Lazy loading, prefetching, autosave, session recovery, compound filters, bookmarks
- **P2 Nice** (18): All others
- **Action**: Implement P0 patterns in Week 1 (Nov 2-5)

---

## Part 4: Pages & Routes (8/11 = 73%)

### 4.1 Core Routes

#### ✅ Onboarding & Auth (2/2 complete)

- [x] `/auth/login` — Magic link entry ✅
- [x] `/onboarding` — 10-step wizard ✅

**Status**: ✅ Production ready

---

#### 🔴 Feed (0/1 needed)

- [ ] **⭐ `/feed` — Main feed page** (P0) ❌
  - **Status**: Page exists, uses wrong components
  - **Action**: Rebuild with FeedCard organisms + virtualization
  - **Priority**: P0 — Blocks launch

---

#### 🟡 Spaces (2/3 needed)

- [x] `/spaces` — Space discovery ✅
- [x] `/spaces/[spaceId]` — Space board 🔧
  - **Status**: Page exists, needs SpaceBoardLayout organism
  - **Action**: Refactor with topology-spec'd components
  - **Priority**: P0 — Blocks launch
- [ ] **⭐ `/spaces/[spaceId]/calendar` — Calendar view** (P2) ❌
  - **Priority**: P2 — Post-launch

---

#### 🟡 Profile (2/2 needed)

- [x] `/profile/[id]` — View profile ✅
- [x] `/profile/edit` — Edit profile 🔧
  - **Status**: Page exists, needs ProfileEditForm organism
  - **Action**: Refactor with form organism
  - **Priority**: P1 — Nice to have

---

#### 🟡 HiveLab (1/2 needed)

- [x] `/hivelab` — Tool workspace ✅
- [ ] **⭐ `/hivelab/studio/[toolId]` — Studio page** (P2) ❌
  - **Priority**: P2 — Desktop-only, post-launch

---

#### 🔴 Rituals (0/1 needed)

- [ ] **⭐ `/rituals` — Rituals list page** (P1) ❌
  - **Status**: Page exists, needs RitualCard organisms
  - **Action**: Rebuild with organisms + RitualsPageLayout template
  - **Priority**: P1 — Blocks Rituals launch

---

#### ✅ Admin (1/1 complete)

- [x] `/admin` — Admin dashboard ✅

**Status**: ✅ Production ready

---

### Pages Summary
- **Complete**: 8/11 (73%)
- **Needs Refactor**: 3 pages (Feed, Space Board, Rituals)
- **Missing**: 3 pages (Space Calendar, HiveLab Studio, Events Calendar)
- **Action**: Rebuild 3 P0 pages in Week 1 (Nov 2-5)

---

## Part 5: Build Priorities (November 2-15)

### 🔴 WEEK 1: Critical Path (Nov 2-5) — **LAUNCH BLOCKERS**

#### **Day 1-2 (Nov 2-3): Feed Critical Path**

**Goal**: Ship topology-spec'd Feed

**Tasks**:
1. [ ] Build 7 Feed molecules (filter-bar, ritual-banner, empty-state, post-actions, explainability-chip, space-chip, media-preview)
2. [ ] Build 4 FeedCard organisms (post, event, tool, system)
3. [ ] Build FeedComposerSheet organism
4. [ ] Build FeedVirtualizedList organism (react-window)
5. [ ] Build FeedPageLayout template
6. [ ] Rebuild `/feed` page with new organisms
7. [ ] Add keyboard shortcuts (j/k/l/c/b)
8. [ ] Add optimistic updates (upvote/comment/bookmark)
9. [ ] E2E tests (load, scroll, filter, keyboard)

**Success Criteria**:
- ✅ Feed loads 10,000+ posts at 60fps
- ✅ All 4 card variants render correctly
- ✅ Keyboard navigation works
- ✅ < 1s cold load, < 500ms warm load
- ✅ Matches FEED_TOPOLOGY.md spec

---

#### **Day 3 (Nov 4): Spaces Critical Path**

**Goal**: Ship topology-spec'd Space Board

**Tasks**:
1. [ ] Build 3 Space widgets (about, tools, events)
2. [ ] Verify SpaceCard molecule (remove clutter)
3. [ ] Build SpaceBoardLayout template
4. [ ] Rebuild `/spaces/[spaceId]` page with new layout
5. [ ] E2E tests (discovery, join, post, RSVP)

**Success Criteria**:
- ✅ Right rail is 280px (down from 600px)
- ✅ Pinned posts use vertical stack
- ✅ Composer matches topology spec
- ✅ Matches SPACES_TOPOLOGY.md spec

---

#### **Day 4 (Nov 5): Polish & Performance**

**Goal**: Production-ready launch build

**Tasks**:
1. [ ] Onboarding polish (animations, error messages)
2. [ ] Performance optimization (Lighthouse audit)
3. [ ] Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
4. [ ] Bundle size verification (< 800KB initial)
5. [ ] Critical E2E tests (signup → feed → space → post)
6. [ ] Production build verification

**Success Criteria**:
- ✅ All performance budgets met
- ✅ All critical E2E tests pass
- ✅ Production build succeeds
- ✅ Mobile experience polished

---

### 🟡 WEEK 2: Complete Organisms (Nov 6-12)

#### **Day 1-2 (Nov 6-7): Profile Organisms**

**Tasks**:
1. [ ] Build ProfileHeader organism + story
2. [ ] Build ProfileTimeline organism + story
3. [ ] Build ProfileRecommendations molecule + story
4. [ ] Build profile molecules (stat-tile, activity-item, connection-card)
5. [ ] Rebuild `/profile/[id]` page
6. [ ] E2E tests (view, edit, privacy)

---

#### **Day 3-4 (Nov 8-9): Ritual Organisms**

**Tasks**:
1. [ ] Build RitualCard organism + story
2. [ ] Build RitualStrip organism + story (shared with Feed)
3. [ ] Build RitualProgressBar molecule + story
4. [ ] Build RitualDetailSheet organism + story
5. [ ] Build RitualsPageLayout template
6. [ ] Rebuild `/rituals` page
7. [ ] E2E tests (browse, join, track, complete)

---

#### **Day 5 (Nov 10): Event Organisms**

**Tasks**:
1. [ ] FeedCard.Event already built (shared)
2. [ ] Build EventSheet organism + story
3. [ ] E2E tests (RSVP, check-in, calendar add)

---

#### **Day 6-7 (Nov 11-12): HiveLab Organisms (Desktop)**

**Tasks**:
1. [ ] Build HiveLabStudio organism + story
2. [ ] Build ElementPalette molecule + story
3. [ ] Build InspectorPanel molecule + story
4. [ ] Build LintPanel molecule + story
5. [ ] Build ToolLibraryCard molecule + story
6. [ ] Build `/hivelab/studio/[toolId]` page

---

### 🟢 WEEK 3: Quality & Scale (Nov 13-15)

#### **Day 1-2 (Nov 13-14): Testing**

**Tasks**:
1. [ ] Unit tests (30+ tests for utilities/hooks)
2. [ ] Component tests (20+ tests for organisms)
3. [ ] Visual regression (Chromatic setup, 170+ stories)
4. [ ] Accessibility (axe automation, keyboard tests)

---

#### **Day 3 (Nov 15): Scale Features**

**Tasks**:
1. [ ] Keyboard shortcuts (global + feature-specific)
2. [ ] Bookmarks & collections
3. [ ] Advanced filtering (compound filters, presets)
4. [ ] Personal analytics dashboards
5. [ ] Optimistic updates (upvote, comment, RSVP)

---

## Part 6: Quality Gates

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

## Part 7: Quick Reference

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

---

### File Locations

```
packages/ui/src/atomic/
├─ atoms/           # 39/55 (primitives)
├─ molecules/       # 9/42 (composed patterns)
├─ organisms/       # 4/35 (domain-specific)
│  └─ auth/         # ✅ Complete
└─ templates/       # 10/18 (page layouts)

apps/web/src/
├─ app/             # Pages (11 core routes)
│  ├─ feed/         # 🔴 Needs FeedCard organisms
│  ├─ spaces/       # 🟡 Needs Space widgets
│  ├─ profile/      # 🟡 Needs Profile organisms
│  ├─ hivelab/      # 🟡 Needs HiveLab organisms
│  ├─ rituals/      # 🔴 Needs Ritual organisms
│  ├─ onboarding/   # ✅ Complete
│  └─ admin/        # ✅ Complete
│
└─ components/      # 45 files (ALL infrastructure, NO UI)
```

---

### Import Patterns

```typescript
// ✅ CORRECT
import {
  Button,
  FeedCardPost,  // When built
  SpaceComposer,
  PinnedPostsStack
} from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import type { User, Space } from '@hive/core';

// ❌ WRONG (generic components, not topology-specific)
import { PostCard } from '@hive/ui'; // Generic, not Feed-specific
import { Button } from '@/components/ui/button'; // Should use @hive/ui
```

---

## Part 8: Metrics & Goals

### Current State (November 2, 2025)
```
Components in @hive/ui:        117 (atoms + molecules + organisms + templates)
  - Atoms:                     39/55 (71%)
  - Molecules:                 9/42 (21%)
  - Organisms:                 4/35 (11%) ← CRITICAL GAP
  - Templates:                 10/18 (56%)

Components in apps/web:        45 (all infrastructure, 0 UI)
API routes:                    175 (all with middleware)
Storybook stories:             94/170 target (55%)
Design-fit rate:               2% (3 components match philosophy)
Atomic compliance:             100% (no UI in apps/web)
```

### Launch Goals (November 5, 2025)
```
Target Storybook:        80% (136/170 stories)
Target Organisms:        60% (21/35) — Feed + Spaces + Profile
Target E2E:              Core flows covered (20+ tests)
Target Performance:      p75 TTI < 2.5s (Feed, Spaces)
Target Accessibility:    WCAG 2.2 AA compliance
Target Design-fit:       50%+ (components match topology specs)
```

### Post-Launch Goals (November 15, 2025)
```
Target Storybook:        100% (170/170 stories)
Target Organisms:        90% (32/35) — All features
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
2. **If NO**, rebuild to match spec
3. **Create story** (before refactoring)
4. **Refactor** (maintain API compatibility)
5. **Update this checklist** (mark as refactored)

---

**Last Updated**: November 2, 2025
**Next Review**: Daily during Nov 2-5 sprint
**Owner**: Design Architect + Engineering Team

**Critical Next Steps**:
1. ✅ Editorial review of HIVE_MISSION.md → APPROVED
2. ⭐ Build 7 Feed molecules + 4 organisms (Nov 2-3)
3. ⭐ Build 3 Space widgets (Nov 4)
4. ⭐ Rebuild Feed + Space pages with virtualization (Nov 2-4)
5. ⭐ Performance optimization + E2E tests (Nov 5)
6. 🚀 **LAUNCH** (November 5, 2025)

---

**End of Checklist** — 150 components mapped, 70 built, 80 in queue. Full proper. ✅
