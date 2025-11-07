# HiveLab Development Quick Start

**Status:** Foundation built, ready for Phase 1 development
**Timeline:** 5 weeks to full launch
**Priority:** Phase 1 + Phase 2 = Launch Blocker

---

## 🎯 What is HiveLab?

HiveLab empowers campus leaders to build custom tools without code:
- **Visual Composer**: Drag-and-drop interface for tool building
- **Element System**: 9 pre-built components (search, filters, forms, charts, etc.)
- **Template Library**: Pre-configured tools ready to customize
- **Tool Marketplace**: Discover and install tools built by other leaders

**Real-world examples:**
- "Campus Events RSVP System" (form + date picker + notifications)
- "Study Group Matcher" (search + filters + user selector)
- "Resource Directory" (search + tags + results list)

---

## 📂 Documentation Structure

```
docs/
├── HIVELAB_UI_UX_TOPOLOGY.md        ← Complete breakdown (14 sections)
├── HIVELAB_TOPOLOGY_DIAGRAM.md      ← Visual architecture
├── HIVELAB_QUICK_START.md           ← This file
└── UX-UI-TAXONOMY.md                ← Updated with HiveLab phases
```

---

## 🏗️ Current Architecture

### Existing Files (✅ Built)
```
packages/ui/src/
├── atomic/templates/
│   ├── hivelab-experience.tsx           ← Main experience wrapper
│   ├── hivelab-overview.tsx             ← Landing page
│   └── hivelab-mode-placeholder.tsx     ← Future mode placeholders
├── components/hivelab/
│   ├── visual-tool-composer.tsx         ← Studio interface (3-pane)
│   └── element-renderers.tsx            ← 9 element implementations
└── lib/hivelab/
    └── element-system.ts                ← Core system (registry, engine)

apps/web/src/app/
├── hivelab/
│   └── page.tsx                         ← Route (uses HiveLabExperience)
└── tools/[toolId]/
    ├── analytics/page.tsx               ← Empty (needs implementation)
    ├── edit/page.tsx                    ← Redirect to composer
    └── [other routes]                   ← Various tool routes
```

### Files to Create (⬜ Next Steps)
```
packages/ui/src/atomic/
├── organisms/hivelab/
│   ├── template-browser.tsx             ← Phase 1 Priority 1
│   ├── template-card.tsx                ← Phase 1 Priority 1
│   ├── tool-card.tsx                    ← Phase 3
│   ├── element-palette.tsx              ← Phase 1 Enhancement
│   ├── properties-inspector.tsx         ← Phase 1 Enhancement
│   ├── data-source-panel.tsx            ← Phase 2 Priority 1
│   ├── timeline-editor.tsx              ← Phase 4
│   └── lint-panel.tsx                   ← Phase 3
└── molecules/
    ├── complexity-meter.tsx             ← Phase 3
    ├── element-badge.tsx                ← Phase 2
    └── tool-status-badge.tsx            ← Phase 3

apps/web/src/app/
├── hivelab/
│   ├── loading.tsx                      ← Phase 1 (MISSING)
│   ├── marketplace/page.tsx             ← Phase 3
│   └── my-tools/page.tsx                ← Phase 3
└── tools/[toolId]/
    └── analytics/page.tsx               ← Implement in Phase 3
```

---

## 🚀 5-Week Development Plan

### Phase 1: Core UX Polish (Week 1) 🎯 LAUNCH BLOCKER
**Goal:** Make template selection feel instant and delightful

**Tasks:**
1. **TemplateBrowserModal** (2 days)
   - Grid layout with 3+ template cards
   - Visual previews (screenshots or mini-canvas)
   - "Use This Template" → opens composer
   - Category filters, search

2. **Template Cards** (1 day)
   - Preview image
   - Name, description, complexity badge
   - Install count, creator info
   - Hover shows element breakdown

3. **Mobile Experience** (1 day)
   - Detect mobile viewport
   - Show "Open on Desktop" banner
   - Allow template preview (read-only)

4. **Loading States** (1 day)
   - Create `apps/web/src/app/hivelab/loading.tsx`
   - Skeleton for overview page
   - Enhanced save states (Saving.../Saved/Failed)

**Acceptance:**
- User can go from landing → template → editing in < 60s
- Mobile users see clear desktop prompt
- Loading state shows within 120ms

---

### Phase 2: Live Data Integration (Week 2) 🎯 LAUNCH BLOCKER
**Goal:** Elements connect to real campus data, tools become useful

**Tasks:**
1. **Data Source Panel** (2 days)
   - New 3rd tab in composer sidebar
   - 4 data source types:
     - Spaces API (posts, members, events)
     - User Directory (with privacy filters)
     - Analytics API (metrics)
     - RSS Feeds (external content)
   - Visual data binding (drag source → element input)

2. **Element Data Binding System** (2 days)
   - Extend element config schema with `dataSource` field
   - Wire connections visually on canvas
   - Data preview in inspector

3. **Update Element Renderers** (1 day)
   - All 9 elements handle live data
   - Loading states (spinners)
   - Error states (retry buttons)
   - Empty states ("No results")

**Acceptance:**
- Elements render real data from Firebase/APIs
- Loading/error states work correctly
- Users can wire data visually (no code)

---

## 🔨 How to Start Development

### 1. Start Storybook (for UI development)
```bash
cd /Users/laneyfraass/hive_ui
NODE_OPTIONS='' pnpm storybook
# Opens at http://localhost:6006
```

### 2. Start Dev Server (for full app)
```bash
pnpm dev --filter=web
# Opens at http://localhost:3000
# Navigate to: http://localhost:3000/hivelab
```

### 3. Create First Component (Example: TemplateBrowserModal)
```bash
# 1. Create organism directory
mkdir -p packages/ui/src/atomic/organisms/hivelab

# 2. Create component
touch packages/ui/src/atomic/organisms/hivelab/template-browser.tsx

# 3. Create story
touch packages/ui/src/stories/07-Complete-Systems/TemplateBrowser.stories.tsx

# 4. Export from index
# Add to packages/ui/src/atomic/organisms/index.ts

# 5. Use in experience
# Import in hivelab-experience.tsx
```

---

## 📊 Element System Overview

### 9 Built Elements (Ready to Use)
1. **SearchInputElement** - Text input with autocomplete
2. **FilterSelectorElement** - Multi-select filter chips
3. **ResultListElement** - Paginated list display
4. **DatePickerElement** - Date/time selection
5. **UserSelectorElement** - User dropdown
6. **TagCloudElement** - Weighted tag display
7. **MapViewElement** - Map placeholder
8. **ChartDisplayElement** - Data visualization
9. **FormBuilderElement** - Dynamic forms
10. **NotificationCenterElement** - Notification list

---

## 🎨 Design Principles

### Cognitive Budgets (Enforced)
- **Actions per tool:** ≤ 2
- **Fields per tool:** ≤ 12
- **CTAs per card:** ≤ 1
- **Composer verbs:** ≤ 6

### Complexity Scoring
- 🟢 Green: 0-30 points (Simple)
- 🟡 Yellow: 31-60 points (Medium)
- 🔴 Red: 61+ points (Complex)

*Points = (elements × 2) + (connections × 3) + (actions × 5)*

### Mobile Strategy
- **Desktop-first studio** - Full builder capabilities
- **Mobile redirects** - "Open on desktop to build"
- **Mobile viewer** - Read-only tool execution

---

## 📝 Component Checklist (at a glance)

### Phase 1 Components (Week 1)
- [ ] TemplateBrowserModal
- [ ] TemplateCard
- [ ] HiveLab loading.tsx
- [ ] Mobile banner
- [ ] Enhanced save states

### Phase 2 Components (Week 2)
- [ ] DataSourcePanel
- [ ] Data binding UI
- [ ] Updated element renderers (×9)
- [ ] Loading/error states

---

## 🚨 Non-Negotiables (Before Launch)

- [ ] **Desktop-first studio** enforced
- [ ] **Cognitive budgets** block publish when exceeded
- [ ] **Campus isolation** on all queries (campusId filter)
- [ ] **CSRF protection** on all mutations
- [ ] **Rate limiting** on install API (10/min per user)
- [ ] **Real data only** (no mock data in production)
- [ ] **WCAG AA** accessibility compliance
- [ ] **Loading states** for all async operations
- [ ] **Error handling** with retry options

---

## 📞 Getting Help

### Documentation
- **Full topology:** `docs/HIVELAB_UI_UX_TOPOLOGY.md` (14 sections, complete)
- **Visual diagram:** `docs/HIVELAB_TOPOLOGY_DIAGRAM.md` (ASCII architecture)
- **Main taxonomy:** `docs/UX-UI-TAXONOMY.md` (platform-wide checklist)

### Code References
- **Element System:** `packages/ui/src/lib/hivelab/element-system.ts`
- **Composer:** `packages/ui/src/components/hivelab/visual-tool-composer.tsx`
- **Renderers:** `packages/ui/src/components/hivelab/element-renderers.tsx`
- **Experience:** `packages/ui/src/atomic/templates/hivelab-experience.tsx`

### Example Code
- **Template data:** `packages/ui/src/atomic/templates/hivelab-mock-data.ts`
- **Existing stories:** `packages/ui/src/stories/07-Complete-Systems/HiveLab*.stories.tsx`

---

**Ready to build?** Start with Phase 1, Task 1: TemplateBrowserModal 🚀
