# 🚀 START HERE — HIVE Build Sprint (Nov 2-15)

**Date**: November 2, 2025
**Status**: Ready to build — Complete audit finished
**Launch Target**: November 5, 2025 (4 days)

---

## ⚡ Quick Start

**If you're starting a new session, do this FIRST**:

1. **Read**: [COMPLETE_BUILD_CHECKLIST_CORRECTED.md](COMPLETE_BUILD_CHECKLIST_CORRECTED.md)
2. **Check**: Week 1 build plan (Nov 2-5) — 21 P0 components
3. **Start**: Day 1 tasks → 4 atoms + 7 molecules

**Do NOT**:
- ❌ Create new checklists (checklist is 100% verified)
- ❌ Re-audit components (audit is complete)
- ❌ Skip topology specs (9 docs, 17,931 lines)

---

## 📊 Current Status (Verified)

```
Components Built:        65/150 (43%)
  Atoms:                 37/55 (67%)
  Molecules:             13/42 (31%)
  Organisms:             4/35 (11%) ← CRITICAL GAP
  Templates:             0/18 (0%) ← EMPTY FOLDER

Keyboard Shortcuts:      1/48 (2%) ← Cmd+K only
Storybook Stories:       109/170 (64%)
Routes:                  23/23 (100%) ✅
API Routes:              175+ (100%) ✅
```

---

## 🎯 Next 4 Days (Nov 2-5)

### Day 1 (Nov 2): Foundation — 11 components
- 4 atoms: date-picker, file-upload, icon-library, toast
- 7 molecules: Feed molecules + search/filter

### Day 2 (Nov 3): Feed Organisms — 9 components
- 7 organisms: FeedCard variants, composer, virtualized list, toast container
- 2 templates: feed-page-layout, feed-loading-skeleton
- **Rebuild `/feed/page.tsx`** with organisms

### Day 3 (Nov 4): Spaces Organisms — 5 components
- 2 molecules: space-about-widget, space-tools-widget
- 2 organisms: space-board-layout, space-post-composer
- 1 template: space-board-layout
- **Rebuild `/spaces/[spaceId]/page.tsx`**

### Day 4 (Nov 5): Rituals + Launch — 4 components + polish
- 3 organisms/molecules: ritual-strip, ritual-card, ritual-progress-bar
- 1 template: rituals-page-layout
- **Performance audit + E2E tests + LAUNCH** 🚀

---

## 📋 Authoritative Documents

**Primary Reference**:
- **COMPLETE_BUILD_CHECKLIST_CORRECTED.md** — Build tracker (100% verified)

**Product Vision**:
- **HIVE_MISSION.md** — Mission, vision, design philosophy (approved 9.2/10)

**Topology Specs** (9 docs, 17,931 lines):
- NAVIGATION_TOPOLOGY.md (1,565 lines) — 48+ keyboard shortcuts
- FEED_TOPOLOGY.md (1,920 lines) — Feed cards, filters
- SPACES_TOPOLOGY.md (1,802 lines) — Board, widgets
- PROFILE_TOPOLOGY.md (1,638 lines) — Header, timeline
- HIVELAB_TOOLS_TOPOLOGY.md (2,685 lines) — Studio, elements
- ONBOARDING_AUTH_TOPOLOGY.md (2,577 lines) — 10-step wizard
- FEED_RITUALS_TOPOLOGY.md (2,506 lines) — Rituals system
- HIVE_STORYBOOK_CHECKLIST.md (1,176 lines) — Story requirements
- SPACES_LAYOUT_AUDIT.md (722 lines) — Layout refinements

**Development Guide**:
- **CLAUDE.md** — Commands, architecture, patterns

---

## ✅ What's Already Built (Verified)

### Atoms (37 files)
- ✅ Form controls: button, input, textarea, checkbox, switch, select, slider, label
- ✅ Navigation: top-bar-nav, command, context-menu
- ✅ Overlays: dialog, modal, sheet, action-sheet, popover, tooltip
- ✅ Cards: card, hive-card, grid, avatar
- ✅ Display: badge, alert, progress, skeleton, notification-bell

### Molecules (13 files)
- ✅ **dropdown-menu.tsx** — Radix dropdown ✅
- ✅ **rail-widget.tsx** — Right rail container ✅
- ✅ **today-drawer.tsx** — Today view drawer ✅
- ✅ **now-card.tsx** — Current activity card ✅
- ✅ **space-composer.tsx** — NO avatar, [+ Add] ✅
- ✅ **pinned-posts-stack.tsx** — Vertical stack ✅
- ✅ **space-header.tsx** — Minimal header ✅
- ✅ navigation-primitives, stat-card, kpi-delta, user-avatar-group, profile-bento-grid, tag-list

### Organisms (4 files — auth only)
- ✅ auth/LoginEmailCard.tsx
- ✅ auth/LoginLinkSentCard.tsx
- ✅ auth/LoginSchoolSelectionCard.tsx
- ✅ auth/VerifyLinkStatusCard.tsx

### Shell & Navigation
- ✅ UniversalShell.tsx (10 shell component files)
- ✅ UniversalNav.tsx (command palette Cmd+K)

---

## 🔴 What's Missing (Build Queue)

### P0 Blockers (21 components) — Nov 2-5
- 4 atoms
- 11 molecules (Feed molecules + search/filter)
- 12 organisms (Feed + Spaces + Rituals)
- 4 templates (Feed, Space board, Onboarding, Auth)

### P1 High (32 components) — Nov 6-12
- Profile organisms (3)
- Event organisms (2)
- Navigation organisms (2)
- 47 keyboard shortcuts
- 10 molecules
- 9 templates

### P2 Nice (32 components) — Nov 13-15
- HiveLab organisms (5)
- Scale features (virtualization, undo/redo, offline)
- 8 molecules
- 6 templates

---

## 🎯 Success Criteria

### Launch Day (Nov 5)
- ✅ 21 P0 organisms built
- ✅ Feed loads 10,000+ posts at 60fps
- ✅ Keyboard shortcuts work (j/k/l/c/b)
- ✅ < 1s feed load, < 500ms warm load
- ✅ All performance budgets met

### Post-Launch (Nov 15)
- ✅ 90% organisms built (32/35)
- ✅ 100% templates built (18/18)
- ✅ 100% keyboard shortcuts (48/48)
- ✅ 100% Storybook stories (170/170)

---

## 🔄 Workflow for Each Component

1. **Check checklist** — Does it exist?
2. **Check topology spec** — Which doc covers this?
3. **Create Storybook story FIRST** — Realistic fixtures
4. **Build in Storybook** — Compose from existing
5. **Export from @hive/ui/index.ts** — Make available
6. **Update checklist** — Mark complete

---

**Ready to build?** Start with Day 1: [COMPLETE_BUILD_CHECKLIST_CORRECTED.md](COMPLETE_BUILD_CHECKLIST_CORRECTED.md)

**Launch in 4 days.** 🚀
