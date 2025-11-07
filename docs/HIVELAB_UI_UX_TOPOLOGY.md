# HiveLab UI/UX Topology — Complete Build Checklist

**North Star:** Empower campus leaders to build tools without code
**Design Stance:** Desktop studio meets mobile consumption
**System Rule:** Every tool must ship production-ready, no prototypes

---

## 0. HiveLab System Architecture

### Three Core Surfaces
1. **Overview/Discovery** - Browse templates, see what's possible, get started
2. **Studio (Desktop-first)** - Visual composer for building tools
3. **Tool Lifecycle** - Publish, deploy, analytics, marketplace

### User Personas
- **Builders** (Space leaders, student devs) - Create and manage tools in studio
- **Installers** (Space leaders) - Discover and deploy tools to their spaces
- **Users** (All students) - Interact with deployed tools in spaces and feed

### Data Model
```typescript
ToolComposition {
  id, name, description, creatorId, campusId
  elements: { elementId, instanceId, config, position, size }[]
  connections: { from: {instanceId, output}, to: {instanceId, input} }[]
  layout: 'grid' | 'flow' | 'tabs' | 'sidebar'
  status: 'draft' | 'pilot' | 'certified'
  metrics: { installs, activeUsers, engagement }
}

ElementDefinition {
  id, name, description, category, icon
  configSchema: Record<string, any>
  defaultConfig: Record<string, any>
  render: (props: ElementProps) => JSX.Element
}
```

---

## 1. HiveLab Surfaces (Page-Level)

### 1.1 HiveLab Overview/Landing ✅ EXISTS (needs enhancement)
**Route:** `/hivelab`
**File:** `apps/web/src/app/hivelab/page.tsx`
**Component:** `HiveLabExperience` (packages/ui/src/atomic/templates/hivelab-experience.tsx)

**Current State:**
- [x] Hero section with description
- [x] Quick actions grid
- [x] Mode switcher (overview → visual)
- [x] Placeholder states for non-visual modes

**Needs Build:**
- [ ] Template gallery carousel (3+ featured templates)
- [ ] "Your Tools" section (drafts + published)
- [ ] Recent activity feed (tool installs, usage milestones)
- [ ] Getting started tutorial overlay
- [ ] Statistics dashboard (total tools, installs, active users)
- [ ] Mobile-optimized layout (show desktop prompt)
- [ ] Loading skeleton (`apps/web/src/app/hivelab/loading.tsx` ⚠️ MISSING)

**Acceptance Criteria:**
- Users can go from landing → template selected → editing in < 60s
- Mobile users see clear "Open on desktop to build" banner
- Loading state shows within 120ms
- Analytics: `hivelab_page_view`, `hivelab_template_select`, `hivelab_start_from_scratch`

---

### 1.2 Studio (Visual Composer) ✅ EXISTS (needs polish)
**Route:** `/hivelab` (visual mode active)
**Component:** `VisualToolComposer` (packages/ui/src/components/hivelab/visual-tool-composer.tsx)

**Current State:**
- [x] Three-pane layout (palette, canvas, properties)
- [x] Drag-and-drop elements onto canvas
- [x] Element positioning and sizing
- [x] Connection system (output → input wiring)
- [x] Properties panel for selected elements
- [x] Zoom controls and grid toggle
- [x] Save/Preview/Cancel actions

**Needs Build:**

#### A. Enhanced Canvas
- [ ] Live preview pane (split screen showing tool as users will see it)
- [ ] Element animations on drag/drop (physics-based feel)
- [ ] Connection line animations (show data flow)
- [ ] Multi-select elements (shift+click)
- [ ] Undo/Redo stack (Cmd+Z / Cmd+Shift+Z)
- [ ] Copy/paste elements (Cmd+C / Cmd+V)
- [ ] Alignment guides (snap to grid, snap to elements)
- [ ] Canvas minimap (for large compositions)

#### B. Element Palette Enhancements
- [ ] Search/filter elements by name or category
- [ ] Element preview on hover
- [ ] Recently used elements section
- [ ] Favorite/pin elements
- [ ] Category icons and colors
- [ ] Element usage count ("Used in 12 tools")

#### C. Properties Panel
- [ ] Visual config editors (color pickers, sliders)
- [ ] Conditional config (show/hide based on other values)
- [ ] Config validation with inline errors
- [ ] Reset to defaults button
- [ ] Copy config to clipboard
- [ ] Element duplicate button

#### D. Data Sources Panel (NEW - Priority 1)
- [ ] Third tab in left sidebar: "Data Sources"
- [ ] Available sources:
  - [ ] Spaces API (posts, members, events)
  - [ ] User Directory (search with privacy filters)
  - [ ] Analytics API (metrics, engagement)
  - [ ] RSS Feeds (external content)
  - [ ] Static data (manual entry)
- [ ] Visual data binding (drag source → element input)
- [ ] Data preview (sample data shown in inspector)
- [ ] API rate limit indicators

#### E. Tool Settings Panel (NEW)
- [ ] Fourth tab: "Settings"
- [ ] Tool metadata editor:
  - [ ] Name, description, icon
  - [ ] Category selection
  - [ ] Tags (searchable keywords)
  - [ ] Visibility (public/private/pilot)
  - [ ] Permissions (who can install)
- [ ] Complexity meter (visual gauge: green/yellow/red)
- [ ] Cognitive budget indicators:
  - [ ] Actions count (≤ 2 limit)
  - [ ] Fields count (≤ 12 limit)
  - [ ] CTA count (≤ 1 per card)
- [ ] Lint panel (blocking vs warning issues)

#### F. Timeline/Workflow Panel (NEW - Advanced)
- [ ] Fifth tab: "Timeline" (for event-based tools)
- [ ] Visual timeline editor:
  - [ ] Open phase (tool goes live)
  - [ ] Remind phase (T-24h, T-10m notifications)
  - [ ] Close phase (tool stops accepting input)
  - [ ] Recap phase (auto-generate summary post)
- [ ] Quiet hours guard (block 22:00-08:00)
- [ ] Trigger configuration (manual/scheduled/event-based)

#### G. Save/Publish Flow
- [ ] Save states: "Saving...", "Saved ✓", "Failed ✗"
- [ ] Auto-save (debounced, every 30s)
- [ ] Version history (restore previous versions)
- [ ] Publish modal:
  - [ ] Status selection (Draft → Pilot → Certified)
  - [ ] Pilot mode: select ≤ 2 test spaces, 30-day limit
  - [ ] Certification request form
  - [ ] Terms and guidelines acceptance
- [ ] Validation before publish:
  - [ ] All elements configured
  - [ ] All connections valid
  - [ ] Passes lint checks
  - [ ] Complexity within limits

**Acceptance Criteria:**
- Composer feels instant (< 100ms drag response)
- Data sources can be wired to elements visually
- Cognitive budgets enforce limits (block publish if violated)
- Mobile redirects to desktop with "Open in desktop browser"
- Analytics: `hivelab_element_added`, `hivelab_connection_created`, `hivelab_tool_saved`, `hivelab_publish_attempt`

---

### 1.3 Template Browser (NEW - Priority 1)
**Route:** `/hivelab/templates` OR modal from overview
**Component:** `TemplateBrowserModal` (packages/ui/src/atomic/organisms/hivelab/template-browser.tsx - NEW)

**Needs Build:**
- [ ] Grid layout with template cards
- [ ] Template card shows:
  - [ ] Visual preview (screenshot or mini-canvas)
  - [ ] Name, description, creator
  - [ ] Category badge
  - [ ] Install count, rating
  - [ ] "Use This Template" CTA
- [ ] Filters:
  - [ ] Category (Campus Tools, Events, Analytics, Social)
  - [ ] Complexity (Simple, Medium, Advanced)
  - [ ] Popularity (Most installed, Trending, Recent)
- [ ] Search bar (by name, description, tags)
- [ ] Template detail modal:
  - [ ] Full description, use cases
  - [ ] Element breakdown (what's included)
  - [ ] Creator profile link
  - [ ] Reviews/ratings
  - [ ] "Use Template" → opens composer with pre-loaded elements
- [ ] Empty state: "More templates coming soon"

**Pre-built Templates (from element-system.ts):**
1. ✅ Basic Search Tool (search-input + filter-selector + result-list)
2. ✅ Event Manager (form-builder + date-picker + user-selector)
3. ✅ Analytics Dashboard (2x chart-display + result-list)

**New Templates to Design:**
4. [ ] Poll/Survey Tool (form-builder + chart-display)
5. [ ] RSVP System (event card + user-selector + notification-center)
6. [ ] Marketplace/Classifieds (search-input + filter-selector + result-list + form-builder)
7. [ ] Study Group Matcher (user-selector + filter-selector + notification-center)
8. [ ] Resource Directory (search-input + tag-cloud + result-list)

**Acceptance Criteria:**
- "Use Template" → composer opens with elements in < 2s
- Templates are visually previewed (not just descriptions)
- Category filtering feels instant (client-side)
- Analytics: `hivelab_template_viewed`, `hivelab_template_selected`

---

### 1.4 Tool Marketplace (NEW - Priority 2)
**Route:** `/hivelab/marketplace`
**Component:** `ToolMarketplace` (packages/ui/src/atomic/templates/hivelab/tool-marketplace.tsx - NEW)

**Needs Build:**
- [ ] Grid layout similar to template browser
- [ ] Tool card shows:
  - [ ] Tool name, description, icon
  - [ ] Creator info (name, avatar, verification badge)
  - [ ] Install count, active users, rating
  - [ ] Category badge, complexity indicator
  - [ ] "Install" CTA (for space leaders)
  - [ ] "Preview" CTA (see tool in action)
- [ ] Filters/sorting:
  - [ ] Category
  - [ ] Complexity
  - [ ] Sort by: Popular, Recent, Top-rated
- [ ] Search (by name, creator, tags)
- [ ] Tool detail sheet (sheet overlay):
  - [ ] Full description
  - [ ] Screenshots/demo video
  - [ ] Element breakdown
  - [ ] Permissions required
  - [ ] Reviews section (with ratings)
  - [ ] "Install to Space" modal:
    - [ ] Select space dropdown
    - [ ] Permissions confirmation
    - [ ] Install button
- [ ] Installation flow:
  - [ ] Select target space(s)
  - [ ] Confirm permissions
  - [ ] Installation progress indicator
  - [ ] Success: "Tool installed! View in [Space Name]"
- [ ] "My Installed Tools" tab

**API Integration:**
- Uses existing routes:
  - `/api/tools` - GET list of published tools
  - `/api/tools/install` - POST install tool to space
  - `/api/tools/browse` - GET with filters/search
  - `/api/tools/recommendations` - GET personalized suggestions

**Acceptance Criteria:**
- SSR for marketplace (fast initial load, SEO)
- Install requires CSRF token and rate limiting
- Space leaders can install, members can preview
- Analytics: `hivelab_marketplace_view`, `hivelab_tool_install`, `hivelab_tool_preview`

---

### 1.5 Tool Analytics Dashboard (NEW - Priority 2)
**Route:** `/tools/[toolId]/analytics`
**File:** `apps/web/src/app/tools/[toolId]/analytics/page.tsx` ✅ EXISTS (empty)
**Component:** `ToolAnalyticsDashboard` (NEW)

**Needs Build:**
- [ ] Header: Tool name, icon, status badge
- [ ] Key metrics cards:
  - [ ] Total installs (across all spaces)
  - [ ] Active users (last 7 days)
  - [ ] Engagement rate (interactions / views)
  - [ ] Average session time
- [ ] Charts:
  - [ ] Usage over time (line chart)
  - [ ] Installs by space (bar chart)
  - [ ] Element usage breakdown (pie chart)
  - [ ] Funnel analysis (views → interactions → conversions)
- [ ] Recent activity feed:
  - [ ] Recent installs (space, date)
  - [ ] High-engagement sessions
  - [ ] Error reports (if any)
- [ ] Optimization suggestions:
  - [ ] "Most users drop off at step 3"
  - [ ] "Consider simplifying filter options"
  - [ ] AI-generated insights (future)
- [ ] Export data button (CSV/JSON)
- [ ] Date range selector (7d, 30d, 90d, All time)

**API Integration:**
- `/api/tools/[toolId]/analytics` - GET metrics
- `/api/tools/usage-stats` - GET aggregated stats

**Acceptance Criteria:**
- Dashboard loads in < 1.5s
- Charts are responsive and accessible
- Real-time updates via SSE (optional)
- Analytics: `hivelab_analytics_viewed`, `hivelab_analytics_exported`

---

### 1.6 My Tools Dashboard (NEW)
**Route:** `/hivelab/my-tools`
**Component:** `MyToolsDashboard` (NEW)

**Needs Build:**
- [ ] Tabs: All, Drafts, Published, Archived
- [ ] Tool cards (grid layout):
  - [ ] Tool name, icon, description
  - [ ] Status badge (Draft/Pilot/Certified)
  - [ ] Last edited date
  - [ ] Quick actions:
    - [ ] Edit (→ composer)
    - [ ] Duplicate
    - [ ] Archive/Delete
    - [ ] View analytics (if published)
- [ ] Empty state per tab:
  - [ ] Drafts: "Start building your first tool"
  - [ ] Published: "Publish a tool to see it here"
- [ ] Sort/filter options:
  - [ ] Sort by: Recent, Name, Installs
  - [ ] Filter by status, complexity
- [ ] Bulk actions:
  - [ ] Select multiple → Archive/Delete

**Acceptance Criteria:**
- Shows only user's tools (creatorId filter)
- Edit button opens composer with existing composition
- Analytics: `hivelab_my_tools_viewed`, `hivelab_tool_edited`

---

## 2. Organisms (Reusable Complex Components)

### 2.1 Element Renderers ✅ EXISTS
**File:** `packages/ui/src/components/hivelab/element-renderers.tsx`

**Current State (9 elements implemented):**
- [x] SearchInputElement - Text input with autocomplete
- [x] FilterSelectorElement - Multi-select filter chips
- [x] ResultListElement - Paginated list display
- [x] DatePickerElement - Date/time selection
- [x] UserSelectorElement - User dropdown selector
- [x] TagCloudElement - Weighted tag display
- [x] MapViewElement - Placeholder for map
- [x] ChartDisplayElement - Data visualization
- [x] FormBuilderElement - Dynamic form fields
- [x] NotificationCenterElement - Notification list

**Enhancements Needed:**
- [ ] All elements support data binding from data sources
- [ ] Loading states for elements fetching data
- [ ] Error states with retry
- [ ] Empty states per element
- [ ] Accessibility improvements (ARIA labels, keyboard nav)
- [ ] Mobile-responsive variants

**New Elements to Build (Priority 3):**
- [ ] `ImageGalleryElement` - Photo grid with lightbox
- [ ] `VideoPlayerElement` - Embedded video playback
- [ ] `TableElement` - Sortable data table
- [ ] `KanbanElement` - Drag-and-drop board
- [ ] `RatingElement` - Star/numeric rating input
- [ ] `FileUploadElement` - Multi-file upload with preview
- [ ] `MapElement` (real) - Interactive map with markers
- [ ] `CountdownElement` - Timer/countdown display
- [ ] `ProgressTrackerElement` - Multi-step progress bar
- [ ] `ChatElement` - Simple chat interface

---

### 2.2 Template Cards
**Component:** `TemplateCard` (packages/ui/src/atomic/organisms/hivelab/template-card.tsx - NEW)

**Needs Build:**
- [ ] Card with preview image/screenshot
- [ ] Template metadata (name, description, creator)
- [ ] Category badge, complexity indicator
- [ ] Install count, rating stars
- [ ] "Use Template" CTA button
- [ ] Hover state shows element breakdown
- [ ] Mobile-optimized (stacked layout)

---

### 2.3 Tool Cards
**Component:** `ToolCard` (packages/ui/src/atomic/organisms/hivelab/tool-card.tsx - NEW)

**Needs Build:**
- [ ] Similar to TemplateCard but for marketplace
- [ ] Creator info with avatar
- [ ] Status badge (Active/Beta/Certified)
- [ ] Quick actions dropdown (Install, Preview, Share)
- [ ] Installed indicator (for space leaders)
- [ ] Loading state during install

---

### 2.4 Element Palette
**Component:** `ElementPalette` (packages/ui/src/atomic/organisms/hivelab/element-palette.tsx - NEW)

**Needs Build:**
- [ ] Categorized element list (collapsible categories)
- [ ] Search/filter elements
- [ ] Element drag handles
- [ ] Hover preview (shows element description + icon)
- [ ] Recently used section
- [ ] Empty state: "No elements match filter"

---

### 2.5 Canvas
**Component:** `ComposerCanvas` (packages/ui/src/atomic/organisms/hivelab/composer-canvas.tsx - NEW)

**Needs Build:**
- [ ] Grid background (toggleable)
- [ ] Drop zone for elements
- [ ] Element instances with:
  - [ ] Resize handles
  - [ ] Move handles
  - [ ] Connection points (input/output)
  - [ ] Selection state
- [ ] Connection lines (SVG paths)
- [ ] Minimap overlay (for large canvases)
- [ ] Zoom controls (buttons + mouse wheel)
- [ ] Empty state: "Drag elements here to start building"

---

### 2.6 Properties Inspector
**Component:** `PropertiesInspector` (packages/ui/src/atomic/organisms/hivelab/properties-inspector.tsx - NEW)

**Needs Build:**
- [ ] Dynamic form based on element configSchema
- [ ] Field types:
  - [ ] Text input
  - [ ] Number input
  - [ ] Toggle (boolean)
  - [ ] Select dropdown
  - [ ] Color picker
  - [ ] Slider (range)
- [ ] Conditional fields (show/hide based on other values)
- [ ] Validation indicators
- [ ] Reset to defaults button
- [ ] Empty state: "Select an element to edit properties"

---

### 2.7 Data Source Panel
**Component:** `DataSourcePanel` (packages/ui/src/atomic/organisms/hivelab/data-source-panel.tsx - NEW)

**Needs Build:**
- [ ] List of available data sources
- [ ] Data source configuration forms:
  - [ ] Spaces API: Select spaces, filter options
  - [ ] User Directory: Search filters, privacy settings
  - [ ] Analytics API: Metric selection, date range
  - [ ] RSS Feeds: Feed URL input
- [ ] Data preview (sample data shown)
- [ ] Drag-to-bind interaction (drag source → element input)
- [ ] Connection indicators (which elements use which sources)
- [ ] Rate limit warnings

---

### 2.8 Timeline Editor
**Component:** `TimelineEditor` (packages/ui/src/atomic/organisms/hivelab/timeline-editor.tsx - NEW)

**Needs Build:**
- [ ] Visual timeline with phases:
  - [ ] Open phase (start time)
  - [ ] Remind phase (notification triggers)
  - [ ] Close phase (end time)
  - [ ] Recap phase (auto-summary)
- [ ] Drag handles to adjust timing
- [ ] Trigger configuration modals
- [ ] Quiet hours indicator (22:00-08:00 blocked)
- [ ] Preview mode (simulate timeline)

---

### 2.9 Lint Panel
**Component:** `LintPanel` (packages/ui/src/atomic/organisms/hivelab/lint-panel.tsx - NEW)

**Needs Build:**
- [ ] List of lint issues (blocking vs warning)
- [ ] Issue types:
  - [ ] Blocking: Missing required config, invalid connections, budget violations
  - [ ] Warning: Complexity high, accessibility concerns, performance hints
- [ ] Click issue → highlight element on canvas
- [ ] Auto-fix button (where possible)
- [ ] Dismiss warnings (with confirmation)
- [ ] Empty state: "No issues found ✓"

---

### 2.10 Complexity Meter
**Component:** `ComplexityMeter` (packages/ui/src/atomic/molecules/complexity-meter.tsx - NEW)

**Needs Build:**
- [ ] Visual gauge (green/yellow/red)
- [ ] Factors:
  - [ ] Element count
  - [ ] Connection count
  - [ ] Action count
  - [ ] Field count
- [ ] Tooltip explaining score
- [ ] Trend indicator (complexity increasing/decreasing)

---

## 3. Molecules (Simple Compounds)

### 3.1 Element Badge
**Component:** `ElementBadge` (packages/ui/src/atomic/molecules/element-badge.tsx - NEW)

**Needs Build:**
- [ ] Category icon + color
- [ ] Element name
- [ ] Hover shows full description
- [ ] Draggable variant (for palette)
- [ ] Static variant (for inspector)

---

### 3.2 Connection Line
**Component:** `ConnectionLine` (packages/ui/src/atomic/molecules/connection-line.tsx - NEW)

**Needs Build:**
- [ ] SVG path between two points
- [ ] Animated data flow indicator (optional)
- [ ] Color based on connection type
- [ ] Hover shows connection details
- [ ] Delete button on hover

---

### 3.3 Canvas Element Instance
**Component:** `CanvasElementInstance` (packages/ui/src/atomic/molecules/canvas-element-instance.tsx - NEW)

**Needs Build:**
- [ ] Element container with:
  - [ ] Header (name, icon, actions)
  - [ ] Body (element preview)
  - [ ] Connection points (input/output ports)
- [ ] Selection state (highlighted border)
- [ ] Resize handles (8 points)
- [ ] Move handle (draggable header)
- [ ] Quick actions (duplicate, delete, copy config)

---

### 3.4 Tool Status Badge
**Component:** `ToolStatusBadge` (packages/ui/src/atomic/molecules/tool-status-badge.tsx - NEW)

**Needs Build:**
- [ ] Status variants:
  - [ ] Draft (gray)
  - [ ] Pilot (blue)
  - [ ] Certified (gold with checkmark)
  - [ ] Archived (red)
- [ ] Icon + text
- [ ] Tooltip with status details

---

### 3.5 Cognitive Budget Indicator
**Component:** `CognitiveBudgetIndicator` (packages/ui/src/atomic/molecules/cognitive-budget-indicator.tsx - NEW)

**Needs Build:**
- [ ] Shows count vs limit:
  - [ ] Actions: X / 2
  - [ ] Fields: X / 12
  - [ ] CTAs: X / 1
- [ ] Color coded (green < limit, red >= limit)
- [ ] Tooltip explaining budget rules
- [ ] Block publish button when exceeded

---

## 4. Atoms (Primitives)

Most atoms already exist in `packages/ui/src/atomic/atoms/`. HiveLab-specific needs:

### 4.1 Category Icon
**Component:** Use existing `Badge` with category-specific colors from tokens

**Color Mapping:**
- Input: `text-blue-400`
- Display: `text-green-400`
- Filter: `text-purple-400`
- Action: `text-orange-400`
- Layout: `text-pink-400`

---

### 4.2 Element Config Field Types
**Components:** Use existing form atoms (`Input`, `Select`, `Switch`, `Slider`)

**Enhancements:**
- [ ] Color picker atom (if not exists)
- [ ] Range slider with dual handles (min/max)
- [ ] Tag input (multi-value chips)

---

## 5. Integration Points

### 5.1 Space Integration
**When tool is deployed to a space:**
- [ ] Tool appears in space sidebar (if applicable)
- [ ] Tool can be pinned to space board (S2 slot)
- [ ] Tool posts show in space feed
- [ ] Space analytics include tool metrics

### 5.2 Feed Integration
**When tool generates content:**
- [ ] Tool posts have special card type (`FeedCard.Tool`)
- [ ] Tool recap cards auto-generate at close phase
- [ ] Feed diversity cap applies (≤3 posts per space per page)

### 5.3 Profile Integration
**Creator profile shows:**
- [ ] Tools built badge
- [ ] Total installs across tools
- [ ] Creator reputation score (future)

### 5.4 Notifications Integration
**Tool triggers notifications for:**
- [ ] Remind phase (T-24h, T-10m)
- [ ] Close phase (last call)
- [ ] Recap available
- [ ] Tool installed to your space

---

## 6. Mobile Experience

### 6.1 Overview Page (Mobile-Optimized)
- [ ] Vertical card layout (templates stacked)
- [ ] Bottom sheet for template details
- [ ] "Open on Desktop" CTA for building

### 6.2 Tool Viewer (Mobile-First)
**NEW Component:** `ToolViewer` (mobile-optimized tool execution)
- [ ] Full-screen tool display
- [ ] Mobile-friendly element interactions
- [ ] Swipe between tool sections (if multi-page)
- [ ] Share tool button
- [ ] Report issue button

### 6.3 Builder Redirect
- [ ] Detect mobile viewport in studio
- [ ] Show full-screen modal: "HiveLab Studio is best on desktop"
- [ ] QR code to continue on desktop
- [ ] Option to preview tools (read-only)

---

## 7. Performance & Optimization

### 7.1 Canvas Performance
- [ ] Virtualize large canvases (only render visible elements)
- [ ] Debounce canvas state updates (300ms)
- [ ] Throttle connection line rendering (60fps cap)
- [ ] Use React.memo for element instances
- [ ] Lazy load element renderers (dynamic imports)

### 7.2 Marketplace Performance
- [ ] SSR marketplace page (fast initial load)
- [ ] Cache tool listings (Redis, 5min TTL)
- [ ] Paginate results (12 tools per page)
- [ ] Lazy load tool previews (Intersection Observer)
- [ ] Prefetch template data on hover

### 7.3 Analytics Performance
- [ ] Server-side chart aggregation (no client-side processing)
- [ ] Cache analytics data (1 hour for historical, realtime updates)
- [ ] Batch analytics events (send every 10s, not per-action)

---

## 8. Accessibility

### 8.1 Keyboard Navigation
- [ ] Tab through element palette (roving tabindex)
- [ ] Arrow keys to move selected element on canvas
- [ ] Enter to select element
- [ ] Delete key to remove element
- [ ] Cmd+Z for undo, Cmd+Shift+Z for redo
- [ ] Cmd+S to save
- [ ] Escape to close modals/deselect

### 8.2 Screen Reader Support
- [ ] ARIA labels for all canvas elements
- [ ] Announce element added/removed
- [ ] Announce connection created/removed
- [ ] Announce save status changes
- [ ] Live region for lint panel updates

### 8.3 Color & Contrast
- [ ] All connection lines meet WCAG AA contrast
- [ ] Category colors tested for accessibility
- [ ] Focus rings visible on all interactive elements

---

## 9. Storybook Coverage

### 9.1 Stories Needed (Priority Order)

**Priority 1 - Core Components:**
- [ ] `HiveLabOverview.stories.tsx` ✅ EXISTS (enhance)
- [ ] `VisualToolComposer.stories.tsx` ✅ EXISTS (enhance)
- [ ] `TemplateBrowser.stories.tsx` (NEW)
- [ ] `ElementPalette.stories.tsx` (NEW)
- [ ] `PropertiesInspector.stories.tsx` (NEW)

**Priority 2 - Organisms:**
- [ ] `TemplateCard.stories.tsx` (NEW)
- [ ] `ToolCard.stories.tsx` (NEW)
- [ ] `DataSourcePanel.stories.tsx` (NEW)
- [ ] `LintPanel.stories.tsx` (NEW)
- [ ] `ComplexityMeter.stories.tsx` (NEW)

**Priority 3 - Molecules:**
- [ ] `ElementBadge.stories.tsx` (NEW)
- [ ] `CanvasElementInstance.stories.tsx` (NEW)
- [ ] `ToolStatusBadge.stories.tsx` (NEW)
- [ ] `CognitiveBudgetIndicator.stories.tsx` (NEW)

**Priority 4 - Element Renderers:**
- [ ] Individual stories for each of 9 elements
- [ ] Combined story showing all elements
- [ ] Data binding demonstrations

---

## 10. Testing Strategy

### 10.1 Unit Tests
- [ ] Element system (registry, engine)
- [ ] Tool composition validation
- [ ] Cognitive budget calculations
- [ ] Lint rule engine
- [ ] Data source connectors

### 10.2 Component Tests (React Testing Library)
- [ ] Element renderers (all 9 + new ones)
- [ ] Canvas interactions (drag, drop, connect)
- [ ] Properties inspector (config changes)
- [ ] Template browser (filter, search, select)

### 10.3 Integration Tests
- [ ] Save/load tool composition
- [ ] Publish workflow (draft → pilot → certified)
- [ ] Install tool to space
- [ ] Tool execution with live data

### 10.4 E2E Tests (Playwright)
- [ ] Complete tool creation flow:
  1. Open HiveLab → Select template
  2. Customize elements → Save tool
  3. Publish tool → View in marketplace
  4. Install to space → Execute tool
- [ ] Analytics dashboard loads correctly
- [ ] Mobile redirect works

---

## 11. API Routes (Audit Existing)

### Existing Routes:
- [x] `/api/tools` - CRUD operations
- [x] `/api/tools/[toolId]` - Get/update specific tool
- [x] `/api/tools/[toolId]/analytics` - Get metrics
- [x] `/api/tools/[toolId]/deploy` - Deploy to space
- [x] `/api/tools/[toolId]/share` - Share tool
- [x] `/api/tools/browse` - Browse published tools
- [x] `/api/tools/install` - Install to space
- [x] `/api/tools/execute` - Execute tool
- [x] `/api/tools/search` - Search tools
- [x] `/api/tools/recommendations` - Get personalized suggestions
- [x] `/api/tools/usage-stats` - Get aggregated stats

### New Routes Needed:
- [ ] `/api/tools/templates` - Get template list
- [ ] `/api/tools/templates/[templateId]` - Get template details
- [ ] `/api/tools/[toolId]/reviews` - Reviews (route exists, needs implementation)
- [ ] `/api/tools/[toolId]/certify` - Request certification
- [ ] `/api/tools/[toolId]/pilot` - Start pilot program
- [ ] `/api/tools/data-sources` - Get available data sources
- [ ] `/api/tools/data-sources/[sourceId]/preview` - Preview sample data

---

## 12. Checklist Summary (Build Order)

### Phase 1: Core UX Polish (Week 1)
- [ ] Template Browser UI (organism + page)
- [ ] Template cards with previews
- [ ] "Use Template" → composer integration
- [ ] Mobile responsive overview page
- [ ] Loading skeleton for HiveLab page
- [ ] Enhanced visual feedback (animations, save states)

### Phase 2: Live Data Integration (Week 2)
- [ ] Data Source Panel (organism)
- [ ] Data source connectors (4 types)
- [ ] Element data binding system
- [ ] Update element renderers for live data
- [ ] Loading/error states for all elements
- [ ] Tool execution runtime enhancements

### Phase 3: Tool Lifecycle (Week 3)
- [ ] Tool Marketplace UI (page + organisms)
- [ ] Tool cards with install flow
- [ ] Analytics Dashboard UI (charts, metrics, activity)
- [ ] My Tools Dashboard
- [ ] Publish flow modal (draft → pilot → certified)
- [ ] Complexity meter + lint panel

### Phase 4: Polish & Advanced Features (Week 4)
- [ ] Timeline Editor (for event-based tools)
- [ ] Live preview pane (split screen)
- [ ] Undo/Redo system
- [ ] Multi-select and bulk actions
- [ ] Advanced element renderers (new 10 elements)
- [ ] Mobile tool viewer

### Phase 5: Testing & Documentation (Week 5)
- [ ] Storybook stories (all 15+ stories)
- [ ] Unit tests (element system, validation)
- [ ] Component tests (RTL)
- [ ] E2E tests (Playwright)
- [ ] Documentation (builder guide, API docs)

---

## 13. Success Metrics

### Builder Adoption
- **Goal:** 20% of space leaders try HiveLab within first month
- **Metric:** Unique users who open composer
- **Track:** `hivelab_page_view`, `hivelab_start_building`

### Tool Creation
- **Goal:** 50 tools published in first semester
- **Metric:** Tools with status = 'certified' or 'pilot'
- **Track:** `hivelab_tool_saved`, `hivelab_publish_attempt`

### Tool Usage
- **Goal:** 500 tool installations across spaces
- **Metric:** Total installs from marketplace
- **Track:** `hivelab_tool_install`, `hivelab_tool_used`

### Creator Retention
- **Goal:** 60% of builders create 2+ tools
- **Metric:** Users with ≥2 published tools
- **Track:** Creator dashboard analytics

---

## 14. Non-Negotiables (Before Launch)

- [ ] **Desktop-first studio** - Mobile shows "Open on desktop" banner
- [ ] **Cognitive budgets enforced** - Block publish if ≤2 actions, ≤12 fields violated
- [ ] **Campus isolation** - All tools scoped to campusId
- [ ] **CSRF protection** - All mutations (save, publish, install) require token
- [ ] **Rate limiting** - Install API limited to 10/min per user
- [ ] **Real data only** - No mock data in production (all elements connect to APIs)
- [ ] **Accessibility** - WCAG AA compliance, keyboard navigation
- [ ] **Loading states** - All async operations show progress
- [ ] **Error handling** - Graceful failures with retry options

---

**Total Components to Build:** ~35 new components + ~20 enhancements
**Estimated Timeline:** 5 weeks (1 designer + 2 devs)
**Launch Blocker:** Phase 1 (Template Browser) + Phase 2 (Live Data)
**Post-Launch:** Phase 3-5 (iterate based on feedback)
