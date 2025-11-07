# HIVELAB & TOOLS TOPOLOGY
**No-Code Builder: Empowering Space Leaders**

> **Design Philosophy**: SF polish meets campus chaos — Production-grade scale from day one
> **Scale Target**: 1 tool → 100+ tools without UX degradation
> **Performance**: < 800ms workspace load, < 1.5s studio load (production-grade)
> **Aesthetic**: Linear/Vercel/Figma/Arc patterns — Professional workflows for power users
> **Platform**: Web-first (desktop + mobile studio, keyboard-first for power users)

## 🎯 Recent Refinements (YC/SF Intuitive Workflows)

**Studio Simplifications**:
- ✅ **Left tabs reduced**: 5 tabs → 2 tabs (Elements, Data Sources) — **-60% navigation overhead**
- ✅ **Settings relocated**: Dedicated tab → Toolbar `⋯` menu (low-frequency access pattern)
- ✅ **Timeline made contextual**: Dedicated tab → Properties panel (shows only when tool has time-based elements)
- ✅ **Templates removed from studio**: Belongs in overview/discovery phase, not mid-build workflow

**Deploy Flow Simplifications**:
- **Smart defaults over forms**: 10+ fields → 2 visible (Deploy to + Deploy button)
- **Sections consolidated**: 3 sections (Timing, Deployment, Notifications) → 1 screen with collapsible advanced
- **Natural language presets**: Date/time pickers → "Tomorrow 9am", "In 7 days", "1 day before"
- **Auto-pilot mode**: Automatically enables if <30 days & ≤2 spaces (no manual toggle)

**Element Palette Optimizations**:
- **Categories reduced**: 4 categories → 2 (BUILD, RESULTS) — **-50% category navigation**
- **Flatten hierarchy**: BASICS/MEDIA/ADVANCED merged into BUILD
- **Advanced callout**: Conditional element gets special treatment (matches low usage)

**Template Strategy**:
- **Minimal launch set**: 5 core templates (Poll, RSVP, Vote, Survey, Sign-Up)
- **No filters/categories**: Only 5 choices, decision in <5 seconds
- **"Recently Used" delayed**: Appears after user creates 3+ tools (progressive disclosure)

**Analytics Simplification**:
- **Dashboard → Response viewer**: No charts, just counts + breakdown + list
- **Metrics reduced**: 6 sections → 3 (headline, breakdown, individual responses)
- **Export over visualization**: CSV export for deeper analysis, not built-in charts

**Complexity Reductions**:
- Studio left tabs: 5 → 2 (-60%)
- Deploy form fields: 10 → 2 (-80%)
- Element categories: 4 → 2 (-50%)
- Analytics sections: 6 → 3 (-50%)
- Minimum studio width: 1280px → Optimized for 1366px laptops ✅

---

## 🚀 Production-Grade Scale Enhancements

> **Upgrade Path**: MVP-ready → Production-ready for heavy usage (20+ tools/semester)

**What Changed**: Added 8 comprehensive scale-ready UX patterns inspired by Linear, Vercel, Figma, Google Docs, and Arc.

**New Capabilities**:
- ⌨️ **Command Palette** (`Cmd+K`): Fuzzy search across all actions, tools, templates — Zero-to-deployed in 3 keystrokes
- ↶ **Undo/Redo System** (`Cmd+Z`): 50-action history with smart grouping — No fear of mistakes
- 📂 **Workspace Organization**: Filters, multi-select, bulk operations — Manage 100+ tools effortlessly
- 💾 **Autosave + Version History**: 10s autosave, 50 versions, session recovery — Never lose work
- ⚡ **Performance Optimization**: Virtualization, lazy loading, optimistic updates — 800ms workspace load with 100+ tools
- 👥 **Real-Time Collaboration**: Live cursors, presence, conflict resolution — Co-leaders can build together
- 📱 **Mobile Studio**: Progressive disclosure, touch gestures — 40% of leaders create on phones
- 🛡️ **Error Recovery**: Offline mode, session recovery, graceful degradation — Resilient under campus WiFi

**Impact**:
- Workspace load: 2.5s → 800ms (-68% with virtualization)
- Studio load: 2.5s → 1.5s (-40% with lazy loading)
- Autosave latency: Instant via optimistic updates (< 200ms perceived)
- Mobile studio: Now viable for full tool creation (previously desktop-only)
- Keyboard-first: Power users can create/deploy without touching mouse

**Updated Sections**:
- Toolbar now includes Undo/Redo buttons with keyboard shortcuts
- Component props extended with scale-ready features (collaboration, version history, command palette)
- 17 new component states for scale features (autosaving, collaborating, offline mode, etc.)
- Comprehensive keyboard shortcuts reference (Global, Studio, Mobile gestures)
- Enhanced performance budgets with scale targets

---

## 🚀 Scale-Ready UX Patterns (Production-Grade)

**Philosophy**: HiveLab must scale from 1 tool → 100+ tools without degrading UX. Power users creating 20+ tools/semester demand professional-grade workflows.

### 1. Command Palette (Linear/Vercel Pattern)

**Why Essential**: Keyboard > Mouse for 80% of power user actions

**Trigger**: `Cmd+K` (Mac) / `Ctrl+K` (Windows) anywhere in HiveLab

```
┌─────────────────────────────────────────┐
│ 🔍 Quick actions...                     │
├─────────────────────────────────────────┤
│ → Create new tool                  ⌘N   │
│ → Duplicate "Campus Poll"          ⌘D   │
│ → Deploy "Study RSVP"           ⌘⇧D   │
│ → Go to Analytics               ⌘A   │
│ → Search all tools...           ⌘F   │
│                                         │
│ Recent:                                 │
│ → "Midterm Vote"                        │
│ → "Lab Partner Match"                   │
│                                         │
│ Templates:                              │
│ → Poll, RSVP, Survey, Vote, Sign-Up     │
└─────────────────────────────────────────┘
```

**Features**:
- **Fuzzy search**: Type "rsvp" matches "Study Group RSVP"
- **Keyboard nav**: Arrow keys + Enter (no mouse needed)
- **Contextual**: Shows different actions in studio vs overview
- **Recent items**: Last 5 tools auto-suggested
- **Quick deploy**: `Cmd+Shift+D` deploys to default space (skips modal)

**Keyboard Shortcuts** (Global):
- `Cmd+K` - Command palette
- `Cmd+N` - New tool
- `Cmd+S` - Save current tool
- `Cmd+Z` / `Cmd+Shift+Z` - Undo/Redo
- `Cmd+D` - Duplicate tool
- `Cmd+/` - Keyboard shortcuts help
- `Cmd+Shift+D` - Quick deploy (default space)
- `Esc` - Cancel/close modals

**Studio-Specific Shortcuts**:
- `Cmd+E` - Toggle element palette
- `Cmd+P` - Toggle properties panel
- `Cmd+L` - Toggle lint panel
- `Cmd+Shift+P` - Preview mode
- `Delete` - Delete selected element
- `Cmd+C` / `Cmd+V` - Copy/paste elements
- `Cmd+Up/Down` - Reorder selected element

---

### 2. Undo/Redo System (Figma Pattern)

**Why Essential**: One wrong drag = rebuild entire form (unacceptable at scale)

**Studio Toolbar** (Always visible):
```
[← Back] [Tool Name ▾] [↶ Undo] [↷ Redo] [Preview] [Save] [Deploy]
                        ↑ Cmd+Z   ↑ Cmd+Shift+Z
                        ↑ Hover shows last action
```

**Granular Action History** (`Cmd+Shift+H`):
```
┌─────────────────────────────────────────┐
│ Action History                          │
├─────────────────────────────────────────┤
│ ● Added "Email" text input      2m ago  │  ← Current state
│   Renamed tool to "Sign-Up"     5m ago  │
│   Deleted "Phone" field         8m ago  │
│   Reordered elements            12m ago │
│   Changed validation rules      18m ago │
│   ... (up to 50 actions cached)         │
│                                         │
│ [Jump to State] [Clear History]         │
└─────────────────────────────────────────┘
```

**Trackable Actions**:
- Element add/delete/reorder
- Property changes (label, validation, required, etc.)
- Tool settings (name, category, timing)
- Canvas state (selected element, zoom level)

**Undo Stack Rules**:
- **50 actions** kept in memory (older auto-purged)
- **Canvas-scoped**: Undo in studio ≠ Undo in overview
- **Persistent**: Survives page refresh (localStorage)
- **Smart grouping**: Typing "Email Address" = 1 undo (not 13 char edits)

---

### 3. Workspace Organization (Notion Pattern)

**Why Essential**: 50+ tools becomes chaos without structure

**HiveLab Overview** (Updated):
```
┌─────────────────────────────────────────┐
│ HiveLab                    [+ New ⌘N]   │
├─────────────────────────────────────────┤
│ [All ▾] [Active] [Draft] [Closed]      │  ← Status filters
│ [🔍 Search tools...             ⌘F]     │  ← Fuzzy search
│                                         │
│ 📁 Active Tools (8)                     │
│   ☑ Campus Poll            47 responses │ ← Multi-select checkbox
│   ☐ Study RSVP             12 going     │
│   ☐ Midterm Vote           Closes 2h    │
│   ...                                   │
│                                         │
│ 📁 Drafts (3)               [Expand ▾]  │
│   ☐ Course Feedback        Not deployed │
│   ☐ Logo Vote              Not deployed │
│                                         │
│ 📁 Closed (24)              [Expand ▾]  │
│                                         │
│ ─────────────────────────────           │
│ [3 selected]                            │
│ • Archive                               │
│ • Export responses                      │
│ • Duplicate to...                       │
└─────────────────────────────────────────┘
```

**Smart Filters**:
- **Status**: Active, Draft, Closed, Archived
- **Space**: Filter by deployment space (Chem 101, CS Club, etc.)
- **Template**: Show all polls, RSVPs, surveys
- **Date**: Created/deployed/closed this week/month/all time
- **Responses**: Tools with >X responses
- **Urgent**: Closing in <24 hours

**Bulk Operations** (Shift+Click multi-select):
- Archive multiple closed tools
- Export responses from multiple tools (combined CSV)
- Duplicate tools to new space
- Change deployment timing across tools
- Delete multiple drafts

**Keyboard Nav**:
- `j/k` - Navigate up/down tool list
- `Space` - Toggle selection
- `Shift+j/k` - Multi-select range
- `Enter` - Open selected tool
- `a` - Select all filtered tools
- `Esc` - Clear selection

---

### 4. Autosave + Version History (Google Docs Pattern)

**Why Essential**: Browser crash = lost work (unacceptable)

**Autosave Indicator** (Studio toolbar):
```
[Tool Name ▾] [Saving...] → [Saved 2s ago] → [Saved ✓]
              ↑ Real-time    ↑ Confirmation   ↑ Idle
              ↑ Spinner      ↑ Timestamp      ↑ Checkmark
```

**Autosave Strategy**:
- **Save every 10 seconds** (debounced on user input)
- **Save on blur** (leaving studio, switching tools)
- **Save before deploy** (pre-deployment validation)
- **Smart batching**: Multiple property changes = 1 save batch

**Version History** (Toolbar `⋯` → Version History):
```
┌─────────────────────────────────────────┐
│ Version History: "Campus Poll"          │
├─────────────────────────────────────────┤
│ ● Current (autosaved 30s ago)           │ ← Live version
│   Manual save by You        2h ago      │
│   Deployed to Chem 101      5h ago      │
│   Added results chart       Yesterday   │
│   Created from template     2 days ago  │
│   ... (50 versions, 30-day retention)   │
│                                         │
│ [Restore Version] [Download JSON]       │
└─────────────────────────────────────────┘
```

**Version Restore**:
1. Click version → Preview loads in modal
2. Side-by-side comparison (Current vs Selected)
3. `[Restore]` or `[Keep Current]`
4. Restore creates new version (non-destructive)

**Session Recovery** (Browser crash):
```
Browser crash → Reopen HiveLab
┌─────────────────────────────────────────┐
│ 🔄 Unsaved Work Detected                │
├─────────────────────────────────────────┤
│ You were editing "Campus Poll"          │
│ Last autosaved 30 seconds ago           │
│                                         │
│ Changes:                                │
│ • Added "Email" field                   │
│ • Changed close time to tomorrow        │
│                                         │
│ [Restore Work] [Discard]                │
└─────────────────────────────────────────┘
```

---

### 5. Performance Optimization (Vercel Pattern)

**Why Essential**: 100+ tools in list = slow loading without virtualization

**Virtualized Lists** (react-window):
```typescript
// HiveLab Overview uses virtualization
<VirtualList
  height={800}
  itemCount={tools.length} // Could be 200+
  itemSize={80}
  renderItem={ToolCard}
  overscanCount={5} // Pre-render 5 above/below
/>

Results:
- Renders only 10-15 visible tools at a time
- Smooth 60fps scrolling with 500+ tools
- Initial load: 2.5s → 800ms (-68%)
```

**Lazy Loading** (Element Palette):
```typescript
// Don't load all element configs upfront
const elementConfigs = {
  'TEXT_INPUT': () => import('./elements/text-input'),
  'RADIO_CHOICE': () => import('./elements/radio-choice'),
  // ... load on demand when dragged to canvas
}

Results:
- Initial bundle: 240KB → 80KB (-67%)
- Element renders on first drag (200ms delay)
- Cached after first use
```

**Optimistic Updates** (Instant UI):
```typescript
// Don't wait for server on property changes
onPropertyChange(elementId, key, value) {
  // 1. Update UI immediately
  updateLocalState(elementId, key, value)

  // 2. Send to server in background (debounced 500ms)
  debounce(() => api.saveTool(tool), 500)

  // 3. Rollback on failure + show error toast
  .catch(() => {
    revertLocalState()
    toast.error("Failed to save - retrying...")
  })
}

Results:
- Typing feels instant (< 16ms perceived latency)
- No blocking spinners on every keystroke
- Graceful failure recovery
```

**Image Optimization**:
- **Next.js Image** for all uploads (auto WebP, lazy load)
- **Responsive sizes**: Load 400px on mobile, 1200px on desktop
- **Blur placeholders**: Low-quality image preview while loading
- **Lazy load**: Images load as user scrolls (not all at once)

**Bundle Optimization**:
- **Code splitting**: Studio code not loaded on overview page
- **Tree shaking**: Remove unused Framer Motion animations
- **Minification**: Terser + gzip compression
- **CDN caching**: Immutable assets cached 1 year

---

### 6. Real-Time Collaboration (Figma Pattern)

**Why Essential**: Multiple co-leaders editing = conflicts without coordination

**Presence Indicators** (Studio toolbar):
```
[Tool Name ▾] [Sarah 👤] [Mike 👤] [↶] [↷] [Preview] [Save]
              ↑ Live avatars
              ↑ Hover shows what they're editing
```

**Live Cursors** (Canvas):
```
┌────────────────────────────────┐
│ [Email Input]                  │  ← Sarah's cursor here
│ Sarah is editing...            │  ← Tooltip
│                                │
│ [Phone Input]                  │
│                                │
│ [Submit Button]                │  ← Mike's cursor here
└────────────────────────────────┘
```

**Conflict Resolution** (Auto-merge):
```
Scenario: Sarah edits "Email" label while you edit validation

Auto-merge:
- Different fields → Merge both changes
- Same field → Last save wins, notify other user

Manual conflict:
┌─────────────────────────────────────────┐
│ ⚠️ Conflict Detected                    │
├─────────────────────────────────────────┤
│ Sarah edited "Email" field while you    │
│ were working. Choose version:           │
│                                         │
│ ○ Sarah's: "Email (required)"           │
│ ● Yours:   "Email Address (optional)"   │
│                                         │
│ [Keep Mine] [Keep Theirs] [View Diff]  │
└─────────────────────────────────────────┘
```

**Activity Log** (Right panel tab):
```
┌─────────────────────────────────────────┐
│ Activity                                │
├─────────────────────────────────────────┤
│ Sarah renamed tool          2m ago      │
│ You added "Phone" field     5m ago      │
│ Mike deployed to Chem 101   1h ago      │
│ Sarah changed close time    3h ago      │
│                                         │
│ [View Full History]                     │
└─────────────────────────────────────────┘
```

**Permissions** (Granular roles):
- **Owner**: Full control + transfer ownership
- **Editor**: Edit tools, deploy to any space
- **Deployer**: Deploy existing tools only (can't edit elements)
- **Viewer**: See responses, export data (read-only)

**Locking** (Prevent conflicts):
- **Element-level locking**: Sarah editing "Email" → Locked for others
- **Auto-unlock**: Unlocks after 2 minutes of inactivity
- **Visual indicator**: Locked elements show avatar badge
- **Override**: Owner can force-unlock (with confirmation)

---

### 7. Mobile Studio (Arc Pattern - Progressive Disclosure)

**Why Essential**: "Desktop-only" excludes 40% of leaders who need quick edits on-the-go

**Mobile Philosophy**:
- ✅ **Edit existing tools** (quick label changes, timing updates)
- ✅ **Deploy tools** (urgent launch from phone)
- ✅ **View responses** (check engagement on-the-go)
- ❌ **Build from scratch** (complex creation = desktop)
- ❌ **Advanced elements** (Conditional logic = desktop)

**Mobile Studio Layout**:
```
┌─────────────────────────────────────┐
│ [←] Edit "Campus Poll"         [⋮]  │
├─────────────────────────────────────┤
│                                     │
│ Live Preview:                       │
│ ┌─────────────────────────────────┐ │
│ │ What's the best study spot?     │ │
│ │ ○ Lockwood Library              │ │
│ │ ○ Student Union                 │ │
│ │ ○ NSC                           │ │
│ │ ○ Online (Zoom)                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ─── Elements (3) ───                │
│ [↕] Question Text    [Edit >]       │
│ [↕] Choice Options   [Edit >]       │
│ [↕] Results Chart    [Edit >]       │
│                                     │
│ [+ Add Element ▾]                   │
│                                     │
│ ────────────────────────────────    │
│ [Save] [Deploy]                     │
└─────────────────────────────────────┘
```

**Mobile Limitations** (Graceful Degradation):
- **No drag-and-drop**: Use ↕ arrows to reorder
- **No multi-select**: Bulk ops desktop-only
- **No keyboard shortcuts**: Touch-first interactions
- **Simplified palette**: 5 most common elements only
- **No conditional logic**: Advanced features desktop-only

**Edit Sheet** (Tap element → Opens):
```
┌─────────────────────────────────────┐
│ Edit: Question Text            [×]  │
├─────────────────────────────────────┤
│ Label                               │
│ [What's the best study spot?]       │
│                                     │
│ Description (optional)              │
│ [Choose one option below]           │
│                                     │
│ Required                            │
│ [● Yes  ○ No]                       │
│                                     │
│ ────────────────────────────────    │
│ [Delete Element] [Save Changes]     │
└─────────────────────────────────────┘
```

**Handoff Pattern** (Mobile → Desktop):
```
Complex edit needed on mobile:
┌─────────────────────────────────────┐
│ This feature requires desktop       │
│                                     │
│ [Open on Desktop]                   │
│ └─ Copies link to clipboard         │
│                                     │
│ or scan QR code:                    │
│ [QR Code]                           │
└─────────────────────────────────────┘
```

**Mobile Deploy** (Simplified):
```
[Deploy] button → Opens:
┌─────────────────────────────────────┐
│ Deploy "Campus Poll"           [×]  │
├─────────────────────────────────────┤
│ Deploy to                           │
│ [Chemistry 101 ▾]                   │
│                                     │
│ Timing (optional)                   │
│ [Now ▾]  [In 7 days ▾]              │
│                                     │
│ [Deploy Now]                        │
└─────────────────────────────────────┘
```

---

### 8. Error Recovery (Linear Pattern)

**Why Essential**: Errors shouldn't block users or lose data

**Graceful Degradation** (Network issues):
```typescript
// Detect slow/offline connection
if (saveResponse.time > 2000ms || navigator.onLine === false) {
  toast.warning("Working offline - changes will sync when connection improves")
  enableOfflineMode()
  storeChangesLocally()
}

// Retry failed saves in background
retryQueue.add(failedSave, { retries: 3, backoff: 2000 })
```

**Upload Error Handling**:
```
Image upload fails:
┌─────────────────────────────────────────┐
│ ⚠️ Image Upload Failed                  │
├─────────────────────────────────────────┤
│ "logo.png" couldn't be uploaded         │
│                                         │
│ Possible causes:                        │
│ • File too large (max 5MB)              │
│ • Unsupported format (PNG/JPG only)     │
│ • Network connection issues             │
│                                         │
│ [Try Again] [Use Different Image]       │
└─────────────────────────────────────────┘

Saved as draft with placeholder - user can retry later
```

**Deploy Validation** (Pre-flight checks):
```
Before deploy:
┌─────────────────────────────────────────┐
│ Ready to Deploy "Campus Poll"           │
├─────────────────────────────────────────┤
│ ✅ No blocking errors                   │
│ ✅ 89 members in Chemistry 101          │
│ ✅ Opens now, closes in 7 days          │
│                                         │
│ ⚠️ Warnings (optional fixes):           │
│ • >12 fields (14 total)                 │
│   → Consider splitting into 2 tools     │
│ • No results element                    │
│   → Users can't see outcome             │
│                                         │
│ [Deploy Anyway] [Fix Warnings]          │
└─────────────────────────────────────────┘
```

**Post-Deploy Undo** (5-minute window):
```
After deploy:
┌─────────────────────────────────────────┐
│ ✅ Poll deployed to Chemistry 101       │
├─────────────────────────────────────────┤
│ 89 members notified                     │
│                                         │
│ [View Responses] [Share Link]           │
│ [Undo Deploy]  ← Available 5 minutes    │
└─────────────────────────────────────────┘

Undo:
- Removes post from space
- Recalls notifications (if <1 minute)
- Restores draft state
- Preserves any responses (if >0)
```

**Session Timeout Handling**:
```
After 4 hours idle:
┌─────────────────────────────────────────┐
│ 🔒 Session Expired                      │
├─────────────────────────────────────────┤
│ Your work has been auto-saved           │
│                                         │
│ Please log in again to continue         │
│                                         │
│ [Log In] [View Auto-Saved Changes]      │
└─────────────────────────────────────────┘
```

**Scale Metrics** (Performance Budgets):
- **Workspace load**: < 800ms (100+ tools)
- **Studio load**: < 1.5s (cold start)
- **Autosave latency**: < 200ms (perceived instant)
- **Deploy validation**: < 500ms
- **Undo/Redo**: < 50ms (imperceptible)
- **Command palette**: < 100ms (fuzzy search 1000+ items)

---

## Table of Contents

1. [Strategic Context](#strategic-context)
2. [Scale-Ready UX Patterns](#scale-ready-ux-patterns-production-grade) ⭐ NEW
3. [Design System Foundation](#design-system-foundation)
4. [HiveLab Studio](#hivelab-studio)
5. [Tool System](#tool-system)
6. [Component Specifications](#component-specifications)
7. [Technical Architecture](#technical-architecture)
8. [Performance & Analytics](#performance--analytics)
9. [Testing Strategy](#testing-strategy)

---

## Strategic Context

### What Is HiveLab?

**HiveLab** = No-code tool builder for space leaders to create interactive content

**Purpose**:
- Empower students to build custom tools without coding
- Enable coordination (polls, RSVPs, surveys, sign-ups)
- Provide analytics and proof exports for accountability
- Drive engagement through interactive content

**Not Airtable/Notion**:
- Purpose-built for student coordination, not general productivity
- Mobile-first deployment, desktop studio creation
- Social by default (tools post to Feed/Spaces)
- Time-boxed lifecycle (open → close → recap)

### HiveLab vs. Other Features

| Aspect | HiveLab Studio | Tool Deployment | Feed/Spaces |
|--------|----------------|-----------------|-------------|
| **Action** | Create, preview, test | Respond, view results | Discover, scroll |
| **Audience** | Space leaders (10%) | All students (100%) | All students (100%) |
| **Device** | Desktop primary | Mobile primary | Mobile primary |
| **Frequency** | Weekly creation | Daily responses | Hourly browsing |

### Tool Lifecycle

```
DRAFT → PILOT → CERTIFIED
```

**DRAFT** (Lab-only):
- Infinite iterations, no publish
- Preview mode testing
- No analytics, no recap
- Deleted after 30 days of inactivity

**PILOT** (≤2 spaces, 30 days):
- Limited deployment for testing
- Basic analytics (response rate, completion time)
- Manual recap (leader exports data)
- Promoted to Certified if successful

**CERTIFIED** (Campus-wide):
- Available in tool picker for all spaces
- Full analytics dashboard (engagement, demographics, trends)
- Auto-recap posts to Feed
- Proof exports (CSV, PDF, screenshots)

### Temporal Lifecycle (Runtime)

```
OPEN → REMIND → ACT → CLOSE → RECAP
```

**OPEN**: Tool post created, clock starts
**REMIND**: T–24h, T–1h notifications
**ACT**: Live window (highlighted with "Now" chip if urgent)
**CLOSE**: Deadline hits, submissions freeze
**RECAP**: Auto-post with results lands in Feed

**Constraints**:
- **≤2 auto-posts/day/space** (prevent spam)
- **Max 7-day open window** (tools should be time-boxed)
- **Recap required** (every tool ends with results post)

---

## Design System Foundation

### Color Palette
```css
/* Inherits from base design system */
/* HiveLab-Specific Colors */

--lab-accent-start: #8B5CF6;    /* Purple gradient start */
--lab-accent-end: #6366F1;      /* Indigo gradient end */
--lab-accent-glow: rgba(139, 92, 246, 0.3);

--lab-canvas-bg: #0F0F0F;       /* Darker canvas for contrast */
--lab-panel-bg: var(--bg-secondary);
--lab-toolbar-bg: var(--bg-tertiary);

--element-text: #22D3EE;        /* Cyan for text inputs */
--element-choice: #F59E0B;      /* Amber for radio/checkbox */
--element-media: #EC4899;       /* Pink for image/file */
--element-results: #10B981;     /* Green for results bars */

--preview-border: rgba(139, 92, 246, 0.3);
--preview-bg: rgba(139, 92, 246, 0.05);
```

### Typography
```css
/* Inherits from base design system */
/* Lab-Specific Scales */

--text-studio-title: 20px / 24px;      /* Panel headers */
--text-element-label: 13px / 18px;     /* Element labels */
--text-lint-message: 12px / 16px;      /* Lint warnings */
```

### Layout
```css
/* Studio Layout (Desktop Only) */
--studio-max-width: 1600px;
--studio-sidebar-width: 280px;    /* Left: Element palette */
--studio-canvas-width: 640px;     /* Center: Tool preview */
--studio-panel-width: 360px;      /* Right: Properties + Lint */
--studio-toolbar-height: 64px;    /* Top: Save, Preview, Deploy */
```

---

## HiveLab Studio

### Spatial Layout (Desktop Only)

**Updated Layout (2-Tab Palette)**:
```
┌──────────────────────────────────────────────────────────────────┐
│ Toolbar (64px height)                                            │
│ [← Back] [Tool Name ▾] [↶ Undo] [↷ Redo] [Preview] [Save] [Deploy] [⋯] │
│         └─ Rename       Cmd+Z    Cmd+Shift+Z                     │
│            Category, Delete                                      │
├────────────┬──────────────────────────┬──────────────────────────┤
│            │                          │                          │
│ L: Palette │ C: Canvas (640px)        │ R: Properties + Lint     │
│ (280px)    │                          │ (360px)                  │
│            │ ┌────────────────────┐   │                          │
│ ┌─────────┐│ │ Tool Preview       │   │ ┌──────────────────────┐│
│ │Elements ││ │ (Live render)      │   │ │ Config    Lint (2)  ││
│ │ Data    ││ │                    │   │ ├──────────────────────┤│
│ └─────────┘│ │ [Element 1]        │   │ │ Element Properties   ││
│            │ │ [Element 2]        │   │ │                      ││
│ 📝 BUILD   │ │ [Element 3]        │   │ │ Label                ││
│ Text       │ │ ...                │   │ │ [____________]       ││
│ Input      │ │                    │   │ │                      ││
│ Choice     │ │ [+ Add Element]    │   │ │ [x] Required         ││
│ Toggle     │ └────────────────────┘   │ │                      ││
│ Slider     │                          │ │ Timeline ▾           ││
│ Image      │ Drag to reorder          │ │ (appears when tool   ││
│ Video      │ Click to edit            │ │  has time elements)  ││
│ Section    │ Delete to remove         │ └──────────────────────┘│
│            │                          │                          │
│ 📊 RESULTS │                          │ [Lint Tab shows:]        │
│ Summary    │                          │ ⚠️ 2 Warnings            │
│ Chart      │                          │ • No close time set      │
│ Data Table │                          │ • >12 fields (14)        │
│            │                          │                          │
│ ⚡ Advanced│                          │                          │
│ Conditional│                          │                          │
│            │                          │                          │
│ [⋯] Settings                          │                          │
└────────────┴──────────────────────────┴──────────────────────────┘

Toolbar [⋯] Menu:
  • Rename Tool
  • Change Category
  • Delete Tool

Timeline (contextual in Properties):
  Shows when tool contains date/time elements
  - Open window
  - Reminder schedule
  (Otherwise hidden to reduce clutter)
```

### Element Palette (Left Sidebar)

**Visual Treatment**:
```css
.palette {
  width: var(--studio-sidebar-width);
  height: 100%;
  padding: 20px 16px;
  background: var(--lab-panel-bg);
  border-right: 1px solid var(--border-subtle);
  overflow-y: auto;
}

.palette-section {
  margin-bottom: 24px;
}

.palette-section-title {
  font-size: var(--text-micro);
  font-weight: var(--weight-semibold);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-bottom: 12px;
}

.palette-element {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  cursor: grab;
  transition: all var(--motion-quick) var(--ease-smooth);
}

.palette-element:hover {
  background: rgba(139, 92, 246, 0.05);
  border-color: var(--preview-border);
  transform: translateX(4px);
}

.palette-element:active {
  cursor: grabbing;
  transform: scale(0.98);
}

.palette-element-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.palette-element-label {
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  color: var(--text-primary);
}
```

**Element Types (2-Category System)**:

**📝 BUILD** (Input Elements):
- **Text Input** (📝): Short text field (name, email, etc.)
- **Textarea** (📄): Long text field (description, feedback)
- **Radio** (◉): Single choice (A, B, C, D)
- **Checkbox** (☑): Multiple choice (select all that apply)
- **Toggle** (⚡): On/off switch
- **Slider** (━━◉━): Numeric range (1-10 rating, budget)
- **Image Upload** (🖼️): Single image submission
- **Video Embed** (🎥): YouTube/Vimeo links
- **Section** (📋): Divider with optional heading

**📊 RESULTS** (Display-Only Elements):
- **Results Summary** (📊): Aggregated response counts
- **Results Chart** (📈): Bar/pie chart visualization
- **Data Table** (📋): Tabular response view

**⚡ ADVANCED** (Special Callout):
- **Conditional** (🔀): Show/hide elements based on previous answers
  - Usage: Low-frequency (<5% of tools)
  - Placement: Separate from BUILD/RESULTS (visual distinction)

**Category Rationale**:
- **BUILD vs RESULTS** = Clear mental model (input vs output)
- **Flatten BASICS/MEDIA** = Reduces unnecessary hierarchy
- **Advanced callout** = Matches actual usage patterns (rare but powerful)

### Canvas (Center)

**Visual Treatment**:
```css
.canvas {
  flex: 1;
  max-width: var(--studio-canvas-width);
  margin: 0 auto;
  padding: 32px 24px;
  background: var(--lab-canvas-bg);
  overflow-y: auto;
}

.canvas-preview {
  width: 100%;
  padding: 24px;
  background: var(--bg-secondary);
  border: 2px solid var(--preview-border);
  border-radius: var(--radius-md);
  box-shadow: 0 0 32px rgba(139, 92, 246, 0.15);
}

.canvas-element {
  position: relative;
  margin-bottom: 20px;
  padding: 16px;
  background: transparent;
  border: 1px dashed transparent;
  border-radius: var(--radius-sm);
  transition: all var(--motion-quick);
}

.canvas-element:hover {
  background: rgba(255, 255, 255, 0.02);
  border-color: var(--border-subtle);
}

.canvas-element.selected {
  background: rgba(139, 92, 246, 0.05);
  border-color: var(--lab-accent-start);
  border-style: solid;
}

.canvas-element-drag-handle {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  opacity: 0;
  cursor: grab;
  transition: opacity var(--motion-quick);
}

.canvas-element:hover .canvas-element-drag-handle {
  opacity: 0.5;
}

.canvas-element-delete {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  opacity: 0;
  color: var(--danger);
  cursor: pointer;
  transition: opacity var(--motion-quick);
}

.canvas-element:hover .canvas-element-delete {
  opacity: 0.7;
}
```

**Interactions**:

1. **Add Element**:
   - Drag from palette → Drop on canvas
   - Or click palette element → Appends to bottom

2. **Reorder Elements**:
   - Drag element by drag handle
   - Drop between other elements
   - Smooth reorder animation (160ms)

3. **Edit Element**:
   - Click element → Selects (purple border)
   - Right panel shows properties
   - Changes reflect in real-time preview

4. **Delete Element**:
   - Hover → Delete icon appears
   - Click delete → Confirm modal
   - Remove with slide-out animation (160ms)

5. **Live Preview**:
   - Canvas always shows what users will see
   - Type in properties → Updates instantly
   - Add validation → Error states appear
   - Mobile preview toggle (switches canvas width)

### Properties Panel (Right Top)

**Visual Treatment**:
```css
.properties-panel {
  width: var(--studio-panel-width);
  height: 50%;
  padding: 20px;
  background: var(--lab-panel-bg);
  border-left: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
  overflow-y: auto;
}

.property-field {
  margin-bottom: 20px;
}

.property-label {
  display: block;
  margin-bottom: 6px;
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  color: var(--text-secondary);
}

.property-input {
  width: 100%;
  padding: 10px 12px;
  font-size: var(--text-body);
  color: var(--text-primary);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-sm);
  transition: all var(--motion-standard) var(--ease-smooth);
}

.property-input:focus {
  border-color: var(--lab-accent-start);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  outline: none;
}

.property-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--motion-quick);
}

.property-checkbox:hover {
  background: rgba(139, 92, 246, 0.05);
}
```

**Common Properties** (all elements):
- **Label**: Element title/question (required)
- **Description**: Helper text (optional)
- **Required**: Toggle for validation
- **Placeholder**: Hint text (for text inputs)

**Element-Specific Properties**:

**Text Input / Textarea**:
- Min/Max length validation
- Input type (text, email, url, number)
- Validation pattern (regex)

**Radio / Checkbox**:
- Options list (add/remove/reorder)
- Allow "Other" option with text input
- Max selections (checkbox only)

**Image / File Upload**:
- Max file size (MB)
- Allowed file types
- Multiple files toggle

**Date Picker**:
- Min/Max date range
- Time selection toggle
- Default to today toggle

**Slider**:
- Min/Max values
- Step increment
- Show value label toggle

**Rating**:
- Max rating (1-5 or 1-10)
- Icon style (star, heart, emoji)
- Half-star toggle

### Lint Panel (Right Bottom)

**Visual Treatment**:
```css
.lint-panel {
  width: var(--studio-panel-width);
  height: 50%;
  padding: 20px;
  background: var(--lab-panel-bg);
  border-left: 1px solid var(--border-subtle);
  overflow-y: auto;
}

.lint-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.lint-count {
  display: flex;
  gap: 12px;
}

.lint-count-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: var(--text-caption);
}

.lint-count-item.error {
  color: var(--danger);
}

.lint-count-item.warning {
  color: var(--warn);
}

.lint-message {
  display: flex;
  gap: 12px;
  padding: 12px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.02);
  border-left: 3px solid var(--danger);
  border-radius: var(--radius-sm);
  font-size: var(--text-lint-message);
  cursor: pointer;
  transition: background var(--motion-quick);
}

.lint-message:hover {
  background: rgba(255, 255, 255, 0.04);
}

.lint-message.warning {
  border-left-color: var(--warn);
}

.lint-message-icon {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.lint-message-text {
  flex: 1;
  line-height: 1.4;
  color: var(--text-secondary);
}
```

**Lint Rules**:

**BLOCKING** (Can't deploy):
- ❌ Missing tool title
- ❌ No close time set
- ❌ >12 fields (cognitive cap)
- ❌ Duplicate element labels
- ❌ Invalid validation patterns

**WARNING** (Can deploy):
- ⚠️ No tool description
- ⚠️ No image/icon set
- ⚠️ <2 responses expected (no analytics value)
- ⚠️ Close time >7 days (too long)
- ⚠️ No results element (users can't see outcome)

**Click to Fix**:
- Click lint message → Highlights problem element
- Auto-scrolls to element
- Opens relevant property field

### Toolbar (Top)

**Visual Treatment**:
```css
.studio-toolbar {
  width: 100%;
  height: var(--studio-toolbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--lab-toolbar-bg);
  border-bottom: 1px solid var(--border-subtle);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toolbar-back {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--motion-quick);
}

.toolbar-back:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.toolbar-title-input {
  min-width: 240px;
  max-width: 480px;
  padding: 8px 12px;
  font-size: var(--text-studio-title);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  transition: all var(--motion-quick);
}

.toolbar-title-input:hover {
  border-color: var(--border-subtle);
}

.toolbar-title-input:focus {
  background: var(--bg-primary);
  border-color: var(--lab-accent-start);
  outline: none;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar-button {
  padding: 10px 20px;
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--motion-standard) var(--ease-smooth);
}

.toolbar-button.preview {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

.toolbar-button.preview:hover {
  border-color: var(--lab-accent-start);
  background: rgba(139, 92, 246, 0.05);
  color: var(--lab-accent-start);
}

.toolbar-button.save {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
}

.toolbar-button.save:hover {
  background: rgba(255, 255, 255, 0.05);
}

.toolbar-button.save.saving {
  opacity: 0.5;
  cursor: not-allowed;
}

.toolbar-button.deploy {
  background: linear-gradient(135deg, var(--gold-start), var(--gold-end));
  border: none;
  color: #000;
  box-shadow: var(--shadow-gold);
}

.toolbar-button.deploy:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 32px rgba(255, 215, 0, 0.4);
}

.toolbar-button.deploy:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

**Actions**:

1. **Back**: Returns to HiveLab dashboard (confirms unsaved changes)
2. **Tool Title**: Click to edit (auto-saves on blur)
3. **Preview**: Opens mobile preview overlay (how users will see it)
4. **Save**: Saves draft (auto-saves every 10s, manual for peace of mind)
5. **Deploy**: Opens deploy modal (disabled if blocking lint errors)

### Preview Modal

**Trigger**: Click "Preview" button in toolbar

**Visual Treatment**:
```css
.preview-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
}

.preview-device {
  width: 375px; /* iPhone width */
  height: 812px; /* iPhone height */
  padding: 48px 12px; /* Device bezel */
  background: #1C1C1E; /* iPhone frame */
  border-radius: 40px;
  box-shadow: 0 8px 64px rgba(0, 0, 0, 0.8);
  position: relative;
}

.preview-screen {
  width: 100%;
  height: 100%;
  background: var(--bg-primary);
  border-radius: 32px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.preview-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--motion-quick);
}

.preview-close:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}
```

**Features**:
- Shows exact mobile rendering
- Live updates as you edit
- Tap interactions work (test radio/checkbox)
- Scrollable if content overflows
- ESC to close

### Deploy Modal

**Trigger**: Click "Deploy" button in toolbar (if no blocking lints)

**Visual Treatment**:
```css
.deploy-modal {
  /* Inherits from Z1 Sheet pattern */
  max-width: 640px;
  padding: 32px;
}

.deploy-section {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-subtle);
}

.deploy-section:last-child {
  border-bottom: none;
}
```

**Structure (Simplified with Smart Defaults)**:
```
┌─────────────────────────────────────┐
│ [Close ×] Deploy "Campus Poll"      │
│                                     │
│ Deploy to                           │
│ [Chemistry 101 Space ▾]             │
│ 89 members · 12 online now          │
│                                     │
│ ─── Advanced ▾ (collapsed) ───      │
│                                     │
│ [Deploy Now]  [Cancel]              │
└─────────────────────────────────────┘

[Advanced ▾] expands to:
┌─────────────────────────────────────┐
│ Timing                              │
│ Opens: [Now ▾]                      │
│        └─ Tomorrow 9am, Custom      │
│ Closes: [In 7 days ▾]               │
│         └─ In 3 days, In 24h        │
│ Remind: [1 day before ▾]            │
│         └─ 1h before, Never         │
│                                     │
│ [Deploy Now]  [Cancel]              │
└─────────────────────────────────────┘

**Smart Defaults Applied**:
- Opens: Now (or "Tomorrow 9am" if after 8pm)
- Closes: 7 days from open (max window)
- Reminder: 1 day before close (single notification)
- Visibility: Space-only (Feed promotion requires manual opt-in)
- Pilot mode: Auto-enabled if <30 days old & ≤2 spaces
- Notifications: Auto-send to space members (no toggle)
```

**Deployment Flow (Streamlined)**:
```
1. User clicks Deploy (toolbar)
2. Modal opens with defaults pre-filled
3. User selects space (only required field)
4. Click "Deploy Now"
5. Tool post appears in selected space immediately
6. Success toast: "Poll deployed to Chemistry 101"
7. Optional: Navigate to space or stay in studio

Total clicks to deploy: 2 (Deploy button + space selection + Deploy Now)
Previous: 5+ (Deploy + space + timing + notifications + Deploy)
```

**Progressive Disclosure Strategy**:
- **Default view**: 1 dropdown + 1 button (essential only)
- **Advanced view**: Expand for timing control (5% of users need this)
- **No preview pane**: User already previewed in studio canvas
- **No visibility toggle**: Space-only is sensible default (Feed promotion is opt-in feature)

**Why This Works**:
- **80% use case**: "Deploy this poll to my class now" = 2 clicks
- **20% use case**: "Schedule for tomorrow" = 3 clicks (expand Advanced)
- **Vercel-like**: Smart defaults eliminate decisions
- **Error-resistant**: 7-day max window prevents infinite open tools

---

## Tool System

### Tool Types (Pre-Built Templates)

**Minimal Launch Set (5 Core Templates)**:

**Visual Layout** (HiveLab Landing):
```
┌─────────────────────────────────────────┐
│ Start with a template                   │
├─────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐             │
│ │ Poll │ │ RSVP │ │ Vote │  ← 3 core   │
│ └──────┘ └──────┘ └──────┘             │
│                                         │
│ ┌──────┐ ┌──────┐                      │
│ │Survey│ │Sign  │          ← 2 advanced│
│ └──────┘ │Up    │                      │
│          └──────┘                      │
│                                         │
│ [Start from Blank]  ← Always visible   │
└─────────────────────────────────────────┘

Decision time: <5 seconds (no filters, no categories)
"Recently Used" section appears after user creates 3+ tools
```

**Template Details**:

1. **Poll** (Most popular - 60% of tools):
   - Radio buttons for single choice
   - Results summary element
   - Example: "Best study spot on campus?"
   - Pre-populated: 1 question + 4 options + results

2. **RSVP** (20% of tools):
   - Yes/No/Maybe radio + optional comment
   - Counter summary showing attendance
   - Example: "Study group meeting"
   - Pre-populated: RSVP question + comment field + counter

3. **Vote** (10% of tools):
   - Radio buttons with optional images
   - Results chart
   - Example: "Vote for club logo"
   - Pre-populated: Vote question + 3 image options + chart

4. **Survey** (5% of tools):
   - Mix of text inputs + radio
   - No results display (individual responses only)
   - Example: "Course feedback form"
   - Pre-populated: 3 questions (text, radio, textarea)

5. **Sign-Up** (5% of tools):
   - Text inputs for contact info (name, email, phone)
   - No results (leader exports CSV)
   - Example: "Carpool to NYC sign-up"
   - Pre-populated: Name, email, optional note fields

**Intentionally Excluded**:
- ❌ **No Quiz template** (future feature - requires scoring logic)
- ❌ **No template categories** (only 5 choices, doesn't warrant grouping)
- ❌ **No template search** (5 options visible at once)
- ❌ **No template details modal** (preview card shows enough)

**Starting from Template Flow**:
```
1. Click "Create Tool" in HiveLab
2. Template picker appears (5 options + Blank)
3. Click template → Studio loads immediately
4. Elements pre-populated, ready to edit
5. Deploy when ready

Total time from landing → studio: <2 seconds
```

**Progressive Disclosure**:
- **First-time user**: Sees 5 templates + Blank (no "Recently Used")
- **After 3+ tools created**: "Recently Used" section appears above templates
- **Blank Canvas**: Always last option (default for experienced users)

### Element Library (12 Types)

#### INPUT ELEMENTS

**1. Text Input**:
```typescript
{
  type: 'TEXT_INPUT',
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string; // regex
    type?: 'text' | 'email' | 'url' | 'number';
  };
}
```

**2. Textarea**:
```typescript
{
  type: 'TEXTAREA',
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
  };
  rows?: number; // Default: 4
}
```

**3. Radio** (Single Choice):
```typescript
{
  type: 'RADIO',
  label: string;
  description?: string;
  required: boolean;
  options: string[];
  allowOther: boolean; // Shows "Other: ___" option
}
```

**4. Checkbox** (Multiple Choice):
```typescript
{
  type: 'CHECKBOX',
  label: string;
  description?: string;
  required: boolean;
  options: string[];
  minSelections?: number;
  maxSelections?: number;
  allowOther: boolean;
}
```

**5. Date Picker**:
```typescript
{
  type: 'DATE_PICKER',
  label: string;
  description?: string;
  required: boolean;
  includeTime: boolean;
  minDate?: Date;
  maxDate?: Date;
  defaultToToday: boolean;
}
```

**6. Image Upload**:
```typescript
{
  type: 'IMAGE_UPLOAD',
  label: string;
  description?: string;
  required: boolean;
  maxSizeMB: number; // Default: 5
  allowMultiple: boolean;
  maxFiles?: number; // If allowMultiple
}
```

**7. File Upload**:
```typescript
{
  type: 'FILE_UPLOAD',
  label: string;
  description?: string;
  required: boolean;
  maxSizeMB: number; // Default: 10
  allowedTypes: string[]; // ['pdf', 'docx', 'xlsx']
  allowMultiple: boolean;
}
```

**8. Slider**:
```typescript
{
  type: 'SLIDER',
  label: string;
  description?: string;
  required: boolean;
  min: number;
  max: number;
  step: number; // Default: 1
  defaultValue?: number;
  showValue: boolean; // Display current value
}
```

**9. Rating**:
```typescript
{
  type: 'RATING',
  label: string;
  description?: string;
  required: boolean;
  maxRating: 5 | 10;
  icon: 'star' | 'heart' | 'emoji';
  allowHalf: boolean; // Half-star ratings
}
```

#### DISPLAY ELEMENTS (Results)

**10. Results Bar**:
```typescript
{
  type: 'RESULTS_BAR',
  label: string;
  sourceElementId: string; // Radio/Checkbox to visualize
  showPercentages: boolean;
  showCounts: boolean;
  sortBy: 'votes' | 'alphabetical';
}
```

**11. Photo Grid**:
```typescript
{
  type: 'PHOTO_GRID',
  label: string;
  sourceElementId: string; // Image upload to display
  columns: 2 | 3 | 4;
  showUsernames: boolean;
}
```

**12. Counter Ring**:
```typescript
{
  type: 'COUNTER_RING',
  label: string;
  targetCount?: number; // Optional goal
  showPercentage: boolean;
}
```

### Depth Budgets (Complexity Limits)

**Hard Limits**:
- **≤12 elements** per tool (cognitive cap)
- **≤2 tool actions** per post (e.g., "Vote + Share")
- **≤3 results views** (Summary, Breakdown, Responses)
- **≤7 days** open window (tools should be time-boxed)

**Soft Warnings**:
- **>8 elements**: "Consider splitting into multiple tools"
- **>5 days open**: "Shorter deadlines increase urgency"
- **No results element**: "Users can't see outcome"

### Tool Response Viewer (Simplified Analytics)

**Location**: `/tools/[toolId]/responses`

**Renamed from "Analytics Dashboard" → "Response Viewer"**
- Rationale: Students aren't data scientists, they need counts + lists
- HiveLab tools are ephemeral (7-day windows), not long-term datasets
- Over-engineering reduces utility (analysis paralysis)

**Structure (3 Sections Only)**:

```
┌─────────────────────────────────────────┐
│ "Who's going to Walmart?" Results       │
├─────────────────────────────────────────┤
│                                         │
│ 47 responses (out of 89 members)        │  ← Single headline metric
│ Response rate: 53%                      │
│ Closed 2 hours ago                      │
│                                         │
│ ─── Breakdown ───                       │
│ • Yes: 32 responses (68%)               │
│ • No: 15 responses (32%)                │
│                                         │
│ ─── All Responses (47) ───              │
│ [Filter: All ▾] [Sort: Recent ▾]        │
│                                         │
│ Sarah Chen        Yes    2m ago         │
│ Mike Torres       Yes    5m ago         │
│ Emma Johnson      No     12m ago        │
│ ...                                     │
│                                         │
│ [Export CSV]                            │
└─────────────────────────────────────────┘
```

**What's Included**:
1. **Headline**: Total responses, response rate, status (open/closed)
2. **Breakdown**: Aggregated counts per answer option (percentages)
3. **Individual Responses**: List of submissions (name, answer, timestamp)
4. **Export**: CSV download for deeper analysis (not built-in charts)

**What's Excluded** (Previously Planned):
- ❌ **No line charts**: Responses over time (overkill for 7-day tools)
- ❌ **No bar charts**: Peak response hours (not actionable for students)
- ❌ **No demographics**: Graduation year, school breakdown (privacy + complexity)
- ❌ **No PDF exports**: Screenshots sufficient for presentations
- ❌ **No drop-off analysis**: Which element loses people (too granular)

**Rationale for Simplification**:
- **Student use case**: "How many people responded?" + "Who said what?" = 90% of needs
- **Export over visualize**: Power users can export CSV → Excel for charts
- **Privacy-first**: No demographic breakdowns (reduces surveillance feel)
- **Fast to build**: 1 week vs 4 weeks for full dashboard
- **Matches ephemerality**: 7-day tools don't need trend analysis

**Response Viewer vs Analytics Dashboard**:
| Aspect | Response Viewer (New) | Analytics Dashboard (Old) |
|--------|----------------------|---------------------------|
| Sections | 3 (Headline, Breakdown, List) | 6 (Engagement, Demographics, Trends, Responses, Exports, Settings) |
| Charts | 0 (numbers only) | 4 (line, bar, pie, drop-off) |
| Build time | 1 week | 4 weeks |
| Load time | <1s | 2-3s (chart rendering) |
| Student value | High (answers core questions) | Medium (impressive but unused) |

---

## Component Specifications

### ToolStudio Component

**File**: `packages/ui/src/atomic/templates/tool-studio.tsx`

**Props Interface**:
```typescript
interface ToolStudioProps {
  // Tool data
  toolId?: string; // If editing existing
  initialData?: Tool; // Pre-populated from template or draft

  // User context
  isLeader: boolean;
  spaceId?: string; // Pre-selected space if from space context

  // Callbacks
  onSave: (tool: Tool) => Promise<void>;
  onDeploy: (tool: Tool, deployment: DeploymentConfig) => Promise<void>;
  onBack: () => void;

  // State
  isSaving?: boolean;
  deployError?: string;

  // Scale-Ready Features (Production-Grade)
  // Undo/Redo System
  undoStack?: ToolAction[]; // History of actions (max 50)
  redoStack?: ToolAction[]; // Redo stack
  onUndo?: () => void;
  onRedo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;

  // Autosave + Version History
  lastSaved?: Date; // Last autosave timestamp
  autoSaveEnabled?: boolean; // Default true
  autoSaveInterval?: number; // Default 10s
  versions?: ToolVersion[]; // Version history (max 50)
  onRestoreVersion?: (versionId: string) => Promise<void>;

  // Real-Time Collaboration (if enabled)
  collaborators?: Collaborator[]; // Other users editing
  onPresenceUpdate?: (userId: string, cursor: Position) => void;

  // Command Palette Integration
  onCommandPaletteToggle?: () => void; // Cmd+K handler
  availableCommands?: Command[]; // Context-aware commands

  // Performance Optimization
  enableVirtualization?: boolean; // For large element lists (>20)
  enableOptimisticUpdates?: boolean; // Default true
}

interface Tool {
  id: string;
  title: string;
  description?: string;
  iconUrl?: string;
  elements: ToolElement[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'pilot' | 'certified';
}

interface DeploymentConfig {
  spaceId: string;
  visibility: 'space' | 'campus';
  openTime: Date;
  closeTime: Date;
  reminders: {
    hours24: boolean;
    hours1: boolean;
  };
}

// Scale-Ready Supporting Types

interface ToolAction {
  type: 'add_element' | 'remove_element' | 'modify_property' | 'reorder_elements' | 'modify_tool_settings';
  timestamp: Date;
  elementId?: string;
  propertyPath?: string;
  oldValue?: any;
  newValue?: any;
  description: string; // Human-readable: "Added Question element"
}

interface ToolVersion {
  id: string;
  timestamp: Date;
  author: string; // userId who saved this version
  description?: string; // Auto or manual: "Auto-saved" | "Before major redesign"
  snapshot: Tool; // Complete tool state at this point
  changesSince?: number; // Number of actions since previous version
}

interface Collaborator {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  color: string; // Unique color for cursor/selection (e.g., '#8B5CF6')
  cursor?: Position; // Current cursor position
  selection?: string; // Currently selected elementId
  isActive: boolean; // Active in last 30s
  lastSeen: Date;
}

interface Position {
  elementId?: string; // Which element they're hovering
  x?: number; // Pixel coordinates (for cursor rendering)
  y?: number;
}

interface Command {
  id: string;
  label: string; // "Create new tool"
  icon?: string; // Lucide icon name
  shortcut?: string; // "Cmd+N"
  category?: 'create' | 'edit' | 'navigate' | 'deploy'; // For grouping
  keywords?: string[]; // For fuzzy search: ['new', 'add', 'start']
  action: () => void | Promise<void>;
}
```

**States**:
1. **Loading**: Skeleton studio while fetching data
2. **Editing**: Active element selected, properties shown
3. **No Selection**: Properties panel shows tool-level settings
4. **Dragging**: Element being dragged from palette
5. **Saving**: Save button disabled, spinner
6. **Deploying**: Deploy modal open
7. **Error**: Lint errors blocking deployment

**Scale-Ready States**:
8. **Undoing/Redoing**: Undo button shows animation, canvas smoothly transitions
9. **Autosaving**: Subtle "Saving..." indicator in toolbar (fades after 200ms)
10. **Auto-saved**: "Last saved 3s ago" persistent in toolbar
11. **Version History Open**: Right panel replaced with version timeline
12. **Restoring Version**: Loading overlay with "Restoring version from 2h ago..."
13. **Collaborating**: Other users' cursors/selections visible, presence indicators
14. **Conflict Detected**: Modal showing conflicting changes with merge options
15. **Command Palette Open**: Overlay with fuzzy search, keyboard navigation active
16. **Offline Mode**: Warning banner + disabled Deploy, autosave queued
17. **Session Recovery**: Modal on load: "Recover unsaved changes from 5m ago?"

### ToolCard Component (Deployed)

**File**: `packages/ui/src/atomic/organisms/tool-card.tsx`

**Props Interface**:
```typescript
interface ToolCardProps {
  // Tool data
  tool: {
    id: string;
    title: string;
    description?: string;
    type: 'poll' | 'survey' | 'rsvp' | 'vote' | 'quiz';
    closeTime: Date;
    responseCount: number;
    maxResponses?: number;
  };

  // User state
  hasResponded: boolean;
  userResponse?: any;

  // Temporal
  isOpen: boolean;
  isClosed: boolean;
  timeUntilClose?: string;

  // Results
  showResults: boolean;
  results?: ToolResults;

  // Interactions
  onRespond: () => void;
  onViewResults: () => void;

  // Display
  variant?: 'feed' | 'space' | 'detail';
}
```

**States**:
1. **Open**: "Vote Now" / "Respond" CTA enabled
2. **Responded**: Gold checkmark, "You responded" text
3. **Closing Soon**: Orange countdown chip
4. **Closed**: Grayed out, "Closed" badge, final results
5. **Full**: "Max responses reached" if applicable

### ToolResponseSheet Component

**File**: `packages/ui/src/atomic/templates/tool-response-sheet.tsx`

**Props Interface**:
```typescript
interface ToolResponseSheetProps {
  // Tool data
  tool: Tool;

  // Submit
  onSubmit: (responses: Record<string, any>) => Promise<void>;
  onCancel: () => void;

  // State
  isSubmitting?: boolean;
  submitError?: string;
}
```

**Structure**:
```
┌─────────────────────────────────────┐
│ [Close ×] Poll Title                │
│                                     │
│ Description text here...            │
│                                     │
│ [Progress: 1/5 ████░░░░░░]         │
│                                     │
│ ──────────────────────────────────  │
│                                     │
│ Question 1 *                        │
│ [Element render]                    │
│                                     │
│ Question 2                          │
│ [Element render]                    │
│                                     │
│ ...                                 │
│                                     │
│ ──────────────────────────────────  │
│                                     │
│ [Submit - Gold] [Save Draft]        │
└─────────────────────────────────────┘
```

**Features**:
- Progress bar at top (completed / total)
- Validation on submit (required fields)
- Save draft (if survey with >5 fields)
- Auto-save draft every 30s (if >5 fields)

---

## Technical Architecture

### API Endpoints

#### Studio & Creation
```typescript
// Create new tool (draft)
POST /api/tools
Body: {
  title: string;
  description?: string;
  elements: ToolElement[];
}
Response: Tool

// Update tool draft
PATCH /api/tools/:toolId
Body: Partial<Tool>
Response: Tool

// Delete tool draft
DELETE /api/tools/:toolId
Response: { deleted: true }

// Deploy tool
POST /api/tools/:toolId/deploy
Body: DeploymentConfig
Response: {
  deployed: true;
  deploymentId: string;
  postId: string; // Posted to space/feed
}

// Get tool templates
GET /api/tools/templates
Response: {
  templates: Template[];
}
```

#### Responses
```typescript
// Submit response
POST /api/tools/:toolId/respond
Body: {
  responses: Record<string, any>; // elementId → value
}
Response: {
  submitted: true;
  results?: ToolResults; // If showResults enabled
}

// Get tool results (leader only)
GET /api/tools/:toolId/results
Response: ToolResults

interface ToolResults {
  responseCount: number;
  results: Record<string, ElementResults>;
}

interface ElementResults {
  elementId: string;
  type: ElementType;
  data: {
    // For radio/checkbox
    options?: {
      label: string;
      count: number;
      percentage: number;
    }[];

    // For text inputs
    responses?: string[];

    // For ratings
    average?: number;
    distribution?: Record<number, number>;
  };
}
```

#### Analytics
```typescript
// Get tool analytics (leader only)
GET /api/tools/:toolId/analytics
Response: {
  engagement: {
    viewCount: number;
    responseCount: number;
    responseRate: number;
    avgCompletionTime: number; // seconds
  };
  demographics?: {
    byYear: Record<number, number>;
    bySchool: Record<string, number>;
  };
  trends: {
    responsesOverTime: { date: Date; count: number }[];
    peakHours: Record<number, number>; // hour → count
  };
}

// Export results
GET /api/tools/:toolId/export
Query params:
  - format: 'csv' | 'pdf'
Response: File download
```

### Database Schema

#### Tools Collection
```typescript
// Collection: tools
{
  id: string;
  campusId: string;

  // Basic info
  title: string;
  description?: string;
  iconUrl?: string;

  // Type & Template
  type: 'poll' | 'survey' | 'rsvp' | 'vote' | 'quiz' | 'custom';
  templateId?: string; // If created from template

  // Elements
  elements: ToolElement[];

  // Status
  status: 'draft' | 'pilot' | 'certified';
  pilotSpaces?: string[]; // If status === 'pilot'

  // Stats (denormalized)
  responseCount: number;
  viewCount: number;

  // Creator
  createdBy: string; // User UID (space leader)
  spaceId?: string; // If created in space context
  createdAt: Date;
  updatedAt: Date;
}

// Indexes:
// - (campusId, createdBy, createdAt DESC) - User's tools
// - (campusId, status, type) - Browse certified tools
// - (campusId, spaceId, createdAt DESC) - Space tools
```

#### Tool Deployments Collection
```typescript
// Collection: tool_deployments
{
  id: string;
  campusId: string;
  toolId: string;

  // Deployment config
  spaceId: string;
  visibility: 'space' | 'campus';
  postId: string; // Created post ID

  // Timing
  openTime: Date;
  closeTime: Date;
  isOpen: boolean; // Calculated field

  // Notifications
  reminders: {
    hours24: boolean;
    hours1: boolean;
  };
  remindersSent: {
    hours24: boolean;
    hours1: boolean;
  };

  // Recap
  recapPosted: boolean;
  recapPostId?: string;

  // Stats
  responseCount: number;
  viewCount: number;

  // Metadata
  createdBy: string;
  createdAt: Date;
}

// Indexes:
// - (campusId, spaceId, isOpen) - Active tools in space
// - (campusId, closeTime ASC) - Upcoming closures (for reminders)
// - (toolId, createdAt DESC) - Tool deployment history
```

#### Tool Responses Subcollection
```typescript
// Subcollection: tool_deployments/{deploymentId}/responses
{
  userId: string;
  responses: Record<string, any>; // elementId → value
  submittedAt: Date;
  completionTime: number; // Seconds from view to submit

  // Analytics
  userYear?: number; // Graduation year
  userSchool?: string; // School code
}

// Indexes:
// - (userId) UNIQUE - One response per user
// - (submittedAt DESC) - Response timeline
```

### Security Rules

#### Tool Creation
```typescript
// Only space leaders can create tools
match /tools/{toolId} {
  allow create: if request.auth != null
    && request.resource.data.campusId == request.auth.token.campusId
    && (
      request.resource.data.spaceId == null
      || isLeader(request.resource.data.spaceId, request.auth.uid)
    );

  allow read: if request.auth != null
    && resource.data.campusId == request.auth.token.campusId;

  allow update, delete: if request.auth.uid == resource.data.createdBy;
}
```

#### Tool Responses
```typescript
// Anyone can respond, but only once
match /tool_deployments/{deploymentId}/responses/{userId} {
  allow create: if request.auth.uid == userId
    && request.auth.token.campusId == getDeployment(deploymentId).campusId
    && getDeployment(deploymentId).isOpen == true;

  // Only creator can read individual responses
  allow read: if request.auth.uid == getDeployment(deploymentId).createdBy;
}

function getDeployment(deploymentId) {
  return get(/databases/$(database)/documents/tool_deployments/$(deploymentId)).data;
}
```

---

## Performance & Analytics

### Performance Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Studio Load** | < 2.5s | Desktop only, complex UI acceptable |
| **Element Drag** | < 16ms | 60fps smoothness |
| **Canvas Render** | < 16ms | Real-time preview |
| **Preview Modal** | < 300ms | Instant feedback |
| **Tool Response Submit** | < 1.0s | Must feel instant |
| **Results Load** | < 1.5s | Can tolerate slight delay |

### Optimization Strategies

#### 1. Canvas Virtual Rendering
```typescript
// Only render visible elements (if >20)
const visibleElements = elements.slice(scrollTop / elementHeight, scrollBottom / elementHeight);
```

#### 2. Debounced Auto-Save
```typescript
// Save draft every 10s, debounced
const debouncedSave = debounce(saveDraft, 10000);

useEffect(() => {
  debouncedSave(tool);
}, [tool]);
```

#### 3. Cached Templates
```typescript
// Cache templates in localStorage (5min)
const TEMPLATE_CACHE_KEY = 'hivelab:templates';
const CACHE_DURATION = 5 * 60 * 1000;

const cachedTemplates = localStorage.getItem(TEMPLATE_CACHE_KEY);
if (cachedTemplates) {
  const { data, timestamp } = JSON.parse(cachedTemplates);
  if (Date.now() - timestamp < CACHE_DURATION) {
    return data;
  }
}
```

### Analytics Events

#### Studio Usage
```typescript
trackEvent('studio_open', {
  source: 'dashboard' | 'space' | 'template',
  templateId?: string,
});

trackEvent('element_added', {
  elementType: ElementType,
  position: number,
});

trackEvent('element_deleted', {
  elementType: ElementType,
});

trackEvent('tool_saved', {
  toolId: string,
  elementCount: number,
  hasLintErrors: boolean,
});

trackEvent('tool_deployed', {
  toolId: string,
  spaceId: string,
  visibility: 'space' | 'campus',
  openDuration: number, // Days until close
});
```

#### Tool Engagement
```typescript
trackEvent('tool_view', {
  toolId: string,
  deploymentId: string,
  source: 'feed' | 'space',
});

trackEvent('tool_respond', {
  toolId: string,
  deploymentId: string,
  completionTime: number,
});

trackEvent('tool_results_view', {
  toolId: string,
  deploymentId: string,
});

trackEvent('tool_export', {
  toolId: string,
  format: 'csv' | 'pdf',
});
```

### Success Metrics (KPIs)

#### Creation Metrics
- **Tool Creation Rate**: Tools created per week
- **Template Usage**: % of tools from templates vs. blank
- **Element Diversity**: Distribution of element types used
- **Lint Error Rate**: % of tools with blocking errors on first deploy

#### Engagement Metrics
- **Response Rate**: % of views that result in submissions
- **Completion Rate**: % of started responses that submit
- **Average Completion Time**: Seconds from view to submit
- **Results View Rate**: % of respondents who check results

#### Leader Adoption
- **Active Tool Creators**: % of leaders who create ≥1 tool/month
- **Certified Tool Rate**: % of pilot tools promoted to certified
- **Analytics Usage**: % of leaders who view analytics dashboard
- **Export Rate**: % of closed tools with CSV/PDF export

---

## Testing Strategy

### Unit Tests

#### ToolStudio Component
```typescript
describe('ToolStudio', () => {
  test('renders empty canvas', () => {
    render(<ToolStudio />);
    expect(screen.getByText('Add Element')).toBeInTheDocument();
  });

  test('adds element from palette', () => {
    render(<ToolStudio />);

    // Drag text input from palette
    const textInput = screen.getByText('Text Input');
    fireEvent.dragStart(textInput);
    fireEvent.drop(screen.getByTestId('canvas'));

    // Element appears in canvas
    expect(screen.getByLabelText('Label')).toBeInTheDocument();
  });

  test('validates required fields', () => {
    render(<ToolStudio />);

    // Try to deploy without title
    fireEvent.click(screen.getByText('Deploy'));

    // Should show lint error
    expect(screen.getByText(/Missing tool title/i)).toBeInTheDocument();
  });
});
```

#### ToolCard Component
```typescript
describe('ToolCard', () => {
  test('renders tool info', () => {
    render(<ToolCard tool={mockTool} isOpen={true} />);
    expect(screen.getByText(mockTool.title)).toBeInTheDocument();
  });

  test('shows respond CTA when open', () => {
    render(<ToolCard isOpen={true} hasResponded={false} />);
    expect(screen.getByText(/Respond/i)).toBeInTheDocument();
  });

  test('shows responded state', () => {
    render(<ToolCard hasResponded={true} />);
    expect(screen.getByText(/You responded/i)).toBeInTheDocument();
  });
});
```

### Integration Tests

#### Tool Creation Flow
```typescript
describe('Tool Creation Flow', () => {
  test('creates poll from template', async () => {
    render(<HiveLab />);

    // Click New Tool
    fireEvent.click(screen.getByText('New Tool'));

    // Select Poll template
    fireEvent.click(screen.getByText('Poll'));

    // Studio loads with template
    await waitFor(() => {
      expect(screen.getByText('Best study spot on campus?')).toBeInTheDocument();
    });

    // Edit title
    const titleInput = screen.getByDisplayValue('Best study spot on campus?');
    fireEvent.change(titleInput, { target: { value: 'Favorite coffee shop?' } });

    // Save
    fireEvent.click(screen.getByText('Save'));

    // Should show success
    await waitFor(() => {
      expect(screen.getByText(/Saved/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Tests (Playwright)

#### End-to-End Tool Lifecycle
```typescript
test('leader creates and deploys tool', async ({ page }) => {
  await loginAsLeader(page);
  await page.goto('/hivelab');

  // Create new tool
  await page.click('text=New Tool');
  await page.click('text=Poll');

  // Wait for studio
  await expect(page.locator('[data-testid="tool-studio"]')).toBeVisible();

  // Edit title
  await page.fill('[data-testid="tool-title"]', 'Best dining hall?');

  // Add options
  await page.click('text=Edit Options');
  await page.fill('[placeholder="Option 1"]', 'Ellicott');
  await page.fill('[placeholder="Option 2"]', 'Governors');
  await page.fill('[placeholder="Option 3"]', 'Putnam');

  // Deploy
  await page.click('text=Deploy');

  // Configure deployment
  await page.selectOption('select[name="spaceId"]', 'chemistry-101');
  await page.fill('input[name="closeTime"]', '2025-12-01T17:00');
  await page.click('text=Deploy Tool');

  // Should navigate to space
  await expect(page).toHaveURL(/\/spaces\//);

  // Tool post should appear
  await expect(page.locator('text=Best dining hall?')).toBeVisible();
});
```

---

## Appendix: Quick Reference

### Element Types (12)
**Input**: Text, Textarea, Radio, Checkbox, Date, Image, File, Slider, Rating
**Display**: Results Bar, Photo Grid, Counter Ring

### Complexity Limits
- ≤12 elements per tool
- ≤7 days open window
- ≤2 tool actions per post
- ≤3 results views

### Tool Lifecycle
**Creation**: Draft → Pilot (≤2 spaces, 30d) → Certified (campus-wide)
**Runtime**: OPEN → REMIND → ACT → CLOSE → RECAP

### Performance Budgets (Scale-Ready)

**MVP Targets** (1-10 tools):
- Studio load: < 2.5s
- Element drag: < 16ms (60fps)
- Tool response: < 1.0s
- Results load: < 1.5s

**Scale Targets** (100+ tools, production-grade):
- **Workspace load**: < 800ms (cold start with 100+ tools via virtualization)
- **Studio load**: < 1.5s (cold start, down from 2.5s via lazy loading)
- **Autosave latency**: < 200ms (perceived instant via optimistic updates)
- **Deploy validation**: < 500ms (lint + schema check)
- **Undo/Redo**: < 50ms (imperceptible, local state only)
- **Command palette search**: < 100ms (fuzzy search 1000+ items)
- **Element drag**: < 16ms (60fps maintained with 20+ elements)
- **Version restore**: < 2s (snapshot load + canvas re-render)
- **Collaboration sync**: < 300ms (presence updates, element locking)
- **Mobile studio load**: < 2s (progressive disclosure, smaller bundles)

**Optimization Techniques**:
- Virtualization for tool lists (react-window)
- Lazy loading for element configs (dynamic imports)
- Optimistic updates for all user actions
- Debounced autosave (10s intervals, batched)
- Memoized canvas renders (React.memo)
- IndexedDB for offline drafts
- WebSocket for real-time collaboration (if enabled)

### Keyboard Shortcuts (Production-Grade)

#### Global Shortcuts (HiveLab Overview)
| Shortcut | Action | Context |
|----------|--------|---------|
| `Cmd+K` | Open command palette | Anywhere |
| `Cmd+N` | Create new tool | Overview |
| `Cmd+F` | Focus search | Overview |
| `j` / `k` | Navigate down/up | Tool list |
| `Space` | Select/deselect tool | Tool list (multi-select mode) |
| `Enter` | Open selected tool | Tool list |
| `a` | Select all visible | Tool list |
| `Esc` | Clear selection / Close modal | Anywhere |

#### Studio Shortcuts
| Shortcut | Action | Context |
|----------|--------|---------|
| `Cmd+Z` | Undo last action | Studio (50-action history) |
| `Cmd+Shift+Z` | Redo action | Studio |
| `Cmd+S` | Manual save | Studio (also autosaves every 10s) |
| `Cmd+E` | Open element palette | Studio |
| `Cmd+P` | Toggle properties panel | Studio |
| `Cmd+L` | Toggle lint panel | Studio |
| `Cmd+Shift+D` | Deploy tool | Studio (if no lint errors) |
| `Delete` / `Backspace` | Remove selected element | Canvas |
| `Cmd+D` | Duplicate selected element | Canvas |
| `Cmd+C` | Copy element | Canvas |
| `Cmd+V` | Paste element | Canvas |
| `↑` / `↓` | Reorder selected element | Canvas |
| `Tab` | Select next element | Canvas |
| `Shift+Tab` | Select previous element | Canvas |
| `Cmd+/` | Show all shortcuts | Anywhere in studio |

#### Command Palette Actions (Fuzzy Search)
When `Cmd+K` is pressed, type to search:
- **"new"** → Create new tool
- **"dup campus poll"** → Duplicate "Campus Poll"
- **"deploy study rsvp"** → Deploy "Study RSVP"
- **"go analytics"** → Navigate to analytics
- **"template poll"** → Insert poll template
- **"version"** → View version history
- **"undo"** → Undo (same as Cmd+Z)

#### Mobile Studio (Touch Gestures)
| Gesture | Action |
|---------|--------|
| **Long press** element | Open element menu (Edit/Delete/Duplicate) |
| **Swipe left** on element | Quick delete |
| **Two-finger tap** | Undo last action |
| **Pull down** from top | Manual save |
| **Swipe from left edge** | Open element drawer |

#### Collaboration Shortcuts (When Enabled)
| Shortcut | Action |
|----------|--------|
| `Cmd+Shift+C` | Show/hide collaborators panel |
| `Cmd+Shift+V` | View version history timeline |
| `Cmd+Option+L` | Lock selected element (prevent others editing) |

**Note**: Keyboard shortcuts follow SF/YC conventions (Linear, Vercel, Figma patterns). All shortcuts are discoverable via `Cmd+/` in-app help.

---

**Remember**: HiveLab is about empowerment, not complexity. Simple tools create big impact.
