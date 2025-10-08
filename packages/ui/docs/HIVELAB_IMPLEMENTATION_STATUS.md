# HiveLab Builder Implementation Status

## 📊 Overview

**Goal**: Full-screen Figma-like visual no-code builder for creating custom tools

**Architecture**: Port-based element connections + multi-page navigation + infinite canvas

**Target**: 48 v1 elements, type-safe connections, React Context state management

---

## ✅ Phase 1: Foundation (COMPLETE)

### Type System
- ✅ **File**: `src/types/hivelab.types.ts` (563 lines)
- ✅ Complete TypeScript type definitions
- ✅ 11 data types (text, number, event, list, etc.)
- ✅ 8 element categories
- ✅ Port, Element, Connection, Page, Tool types
- ✅ Canvas viewport and interaction types
- ✅ HiveLab state and action types

### Utility Functions
- ✅ **File**: `src/lib/hivelab-utils.ts` (481 lines)
- ✅ Type compatibility checking
- ✅ Port position calculations
- ✅ Bézier curve path generation
- ✅ Bounding box calculations
- ✅ Grid snapping functions
- ✅ Viewport transformations (screen ↔ canvas)
- ✅ Element ID generation
- ✅ Validation helpers

### Element Library
- ✅ **File**: `src/lib/hivelab-element-library.ts` (1677 lines)
- ✅ **5 TRIGGER Elements**: Form Load, Button Click, Schedule, Webhook, Custom Event
- ✅ **8 COLLECTOR Elements**: Text, Choice, Date, Member, File, API, Number, Location
- ✅ **10 TRANSFORMER Elements**: Format, Validate, Calculate, Sentiment, Filter, Sort, Map, Join, Extract, Convert
- ✅ **5 ROUTER Elements**: If/Else, For Each, Random, Gate, Page Navigation
- ✅ **3 STORAGE Elements**: Variable, Database, File Storage
- ✅ **5 DISPLAY Elements**: Chart, List, Progress, Counter, Text
- ✅ **8 ACTION Elements**: Notify, Post, Email, Create Event, Create Task, Update, Export CSV, Webhook Send
- ✅ **4 CONNECTOR Elements**: Convert, Merge, Delay, Error Handler
- ✅ **Total: 48 Elements**

---

## ✅ Phase 2: State Management (COMPLETE)

### Context System
- ✅ **File**: `src/contexts/hivelab-context.tsx` (747 lines)
  - React Context + useReducer pattern
  - Complete reducer handling all 40+ action types
  - Initial state factory with default tool
  - Helper action functions (50+ methods)
  - History management (undo/redo support)
  - useHiveLab and useHiveLabActions hooks

### Custom Hooks
- ✅ **File**: `src/hooks/use-canvas-viewport.ts` (252 lines)
  - Pan with middle mouse or space+drag
  - Zoom with mouse wheel (pinch for mobile)
  - Zoom at specific point (keeps point under cursor)
  - Keyboard shortcuts (Cmd+0, Cmd+-, Cmd+=)
  - Screen ↔ canvas coordinate conversion
  - Touch event support for mobile panning

- ✅ **File**: `src/hooks/use-connection-creation.ts` (333 lines)
  - Wire dragging from output ports to input ports
  - Type compatibility validation
  - Real-time draft connection rendering
  - Port detection with hit radius
  - Connection validation (no duplicates, single input)
  - Cancel with Escape or click on canvas
  - Color-coded by data type

---

## ✅ Phase 3: Canvas Atoms (COMPLETE)

### Grid & Background
- ✅ **File**: `src/atomic/atoms/canvas/grid-background.tsx` (156 lines)
  - SVG-based infinite grid pattern
  - Two patterns: dots or lines
  - Scales with viewport zoom
  - Pans with viewport offset
  - Major grid lines every N cells
  - Configurable colors and grid size

- ✅ **Story**: `src/atomic/atoms/canvas/grid-background.stories.tsx` (267 lines)
  - 14 story variations
  - Interactive pan/zoom demo
  - Pattern comparison
  - All zoom levels demonstrated

### Zoom Controls
- ✅ **File**: `src/atomic/atoms/canvas/zoom-controls.tsx` (125 lines)
  - Floating zoom controls with +/- buttons
  - Click percentage to reset to 100%
  - Zoom to fit button (optional)
  - Disable buttons at min/max zoom
  - 4 corner positioning options
  - Keyboard shortcut hints in tooltips

- ✅ **Story**: `src/atomic/atoms/canvas/zoom-controls.stories.tsx` (256 lines)
  - 12 story variations
  - All positions demonstrated
  - Interactive with grid background
  - Min/max zoom states

### Mini-Map
- ✅ **File**: `src/atomic/atoms/canvas/mini-map.tsx` (234 lines)
  - Overview of entire canvas
  - Shows all pages and elements
  - Viewport indicator (dashed rectangle)
  - Click to navigate
  - Drag viewport to pan
  - Auto-scales to fit all content
  - Element count display

- ✅ **Story**: `src/atomic/atoms/canvas/mini-map.stories.tsx` (405 lines)
  - 14 story variations
  - Interactive navigation demo
  - Complete canvas system showcase
  - Multi-page demonstrations

---

## ✅ Phase 4: Element Atoms (COMPLETE)

### Port System
- ✅ **File**: `src/atomic/atoms/elements/port.tsx` (128 lines)
  - Connection point on elements
  - Color-coded by data type
  - Visual states: default, hovered, compatible, connected
  - Input ports (left) vs Output ports (right)
  - Required indicator (red asterisk)
  - Tooltip with port name and type
  - Glow effect when compatible during connection
  - Scale animation on hover

- ✅ **Story**: `src/atomic/atoms/elements/port.stories.tsx` (444 lines)
  - 18 story variations
  - All 11 data types demonstrated
  - Input vs Output comparison
  - Interactive hover and connection states
  - Port grid with all combinations

### Connection Wire
- ✅ **File**: `src/atomic/atoms/elements/connection-wire.tsx` (114 lines)
  - Bézier curve rendering
  - Color-coded by data type
  - Arrow marker shows data flow direction
  - Invisible hit area for easy clicking (8px wider)
  - Hover glow effect
  - Selection glow (4px blur)
  - Animated data flow (dashed line moving)
  - Configurable stroke width

- ✅ **Story**: `src/atomic/atoms/elements/connection-wire.stories.tsx` (370 lines)
  - 13 story variations
  - All data type colors
  - Complex curve demonstrations
  - Interactive hover and selection
  - With ports (complete connection)
  - Multiple connections showcase

### Data Type Badge
- ✅ **File**: `src/atomic/atoms/elements/data-type-badge.tsx` (110 lines)
  - Color-coded badge for each data type
  - Icon for each type (11 icons via lucide-react)
  - 3 sizes: sm, md, lg
  - 3 variants: default (filled), outline, subtle
  - Supports union types (multiple types)
  - Customizable (show/hide icon and label)

- ✅ **Story**: `src/atomic/atoms/elements/data-type-badge.stories.tsx` (331 lines)
  - 15 story variations
  - All data types grid
  - All variants comparison
  - Size variations
  - In-context examples (properties panel, element card)
  - Compact display options

---

## ✅ Phase 5: Canvas Molecules (COMPLETE)

### Element Card
- ✅ **File**: `src/atomic/molecules/canvas/element-card.tsx` (205 lines)
  - Draggable element on canvas with ports
  - Color-coded by category (8 categories)
  - Input ports on left, output ports on right
  - Shows element icon, name, config count
  - Selection state with corner dots
  - Hover glow effect
  - "New" badge for new elements
  - Double-click to edit
  - Grip handle for dragging

- ✅ **Story**: `src/atomic/molecules/canvas/element-card.stories.tsx` (393 lines)
  - 15 story variations
  - All 8 element categories demonstrated
  - Selection, hover, dragging states
  - Zoom levels comparison
  - Interactive selection demo
  - Configuration examples
  - Complex element with many ports

### Connection Layer
- ✅ **File**: `src/atomic/molecules/canvas/connection-layer.tsx` (136 lines)
  - SVG layer rendering all connections for a page
  - Auto-calculates Bézier paths between ports
  - Selection and hover states
  - Draft connection preview (while dragging)
  - Color-coded by data type
  - Click to select connections
  - Optional animated data flow

- ✅ **Story**: `src/atomic/molecules/canvas/connection-layer.stories.tsx` (391 lines)
  - 11 story variations
  - Single and multiple connections
  - Interactive hover and selection
  - Complex flow demonstrations
  - With grid background
  - Different connection patterns

### Page Frame
- ✅ **File**: `src/atomic/molecules/canvas/page-frame.tsx` (136 lines)
  - Visual frame showing page boundaries on canvas
  - Page name, element count in header
  - Page type badge (default/modal/drawer)
  - Dimensions label at high zoom
  - Current page highlighting with shadow
  - Click to switch, double-click to rename
  - Color-coded by page type

- ✅ **Story**: `src/atomic/molecules/canvas/page-frame.stories.tsx` (328 lines)
  - 11 story variations
  - All 3 page types (default, modal, drawer)
  - Different zoom levels
  - Interactive selection
  - Multi-page tool showcase
  - Different page sizes

### Selection Box
- ✅ **File**: `src/atomic/molecules/canvas/selection-box.tsx` (59 lines)
  - Multi-select drag box for selecting multiple elements
  - Visual rectangle with corner dots
  - Shows dimensions badge when large enough
  - Auto-adjusts for any drag direction
  - Semi-transparent fill with border
  - Real-time updates as user drags

- ✅ **Story**: `src/atomic/molecules/canvas/selection-box.stories.tsx` (396 lines)
  - 10 story variations
  - All drag directions (4 quadrants)
  - Interactive selection with elements
  - Minimum size thresholds
  - With grid background
  - Multiple simultaneous selections
  - Different sizes and aspect ratios

### Inter-Page Arrow
- ✅ **File**: `src/atomic/molecules/canvas/inter-page-arrow.tsx` (172 lines)
  - Visual indicator for navigation between pages
  - Dashed arrow with arrowhead
  - Auto-calculates optimal edge connection
  - Label showing target page name
  - Router element indicator at start
  - Selection and hover states
  - Color-coded by flow type
  - Click to select arrow

- ✅ **Story**: `src/atomic/molecules/canvas/inter-page-arrow.stories.tsx` (420 lines)
  - 12 story variations
  - All 4 directions (up/down/left/right)
  - With page frames integration
  - Interactive selection
  - Color-coded flows
  - Complex multi-page flow demo
  - Bidirectional arrows
  - Long distance connections

---

## ✅ Phase 6: Panel Molecules (COMPLETE)

### Floating Panel
- ✅ **File**: `src/atomic/molecules/panels/floating-panel.tsx` (167 lines)
  - Draggable, collapsible, dockable panel
  - Collapse/expand with chevron button
  - Maximize/minimize (fullscreen toggle)
  - Close button (optional)
  - Resize handle for width/height
  - Dockable to left/right/top/bottom
  - Backdrop blur for glassmorphism
  - Used for library, properties, layers panels

- ✅ **Story**: `src/atomic/molecules/panels/floating-panel.stories.tsx` (548 lines)
  - 14 story variations
  - All positions (left, right, top, bottom)
  - Collapse, maximize, close states
  - Interactive demos
  - Element library and properties examples
  - Draggable and scrollable content

### Element Library Item
- ✅ **File**: `src/atomic/molecules/panels/element-library-item.tsx` (110 lines)
  - Draggable element card in library
  - Category-colored icon border
  - Element name and description
  - Port count indicators (inputs/outputs)
  - Drag handle with grip icon
  - Hover effects (shadow, scale)
  - Click to select
  - Drag state visualization

- ✅ **Story**: `src/atomic/molecules/panels/element-library-item.stories.tsx` (506 lines)
  - 12 story variations
  - All element categories
  - Different port configurations
  - Interactive drag and drop
  - With click handler
  - In library panel with search/filters
  - All triggers, collectors, transformers, actions

### Property Field
- ✅ **File**: `src/atomic/molecules/panels/property-field.tsx` (181 lines)
  - 7 field types: text, number, boolean, select, textarea, color, date
  - Required indicator (red asterisk)
  - Help text with tooltip
  - Placeholder support
  - Min/max validation for numbers
  - Options for select dropdowns
  - Color picker with hex input
  - Disabled state

- ✅ **Story**: `src/atomic/molecules/panels/property-field.stories.tsx` (488 lines)
  - 12 story variations
  - All 7 field types demonstrated
  - Required fields, help text, disabled states
  - Validation states with error messages
  - In properties panel example
  - Interactive field changes

### Data Mapping Row
- ✅ **File**: `src/atomic/molecules/panels/data-mapping-row.tsx` (100 lines)
  - Shows port-to-port data mapping
  - Source element and port name
  - Target port with type badge
  - Arrow indicating flow direction
  - Color-coded by data type
  - Selection state
  - Removable (X button on hover)
  - Truncates long names

- ✅ **Story**: `src/atomic/molecules/panels/data-mapping-row.stories.tsx` (440 lines)
  - 10 story variations
  - All data types
  - Interactive selection and removal
  - In properties panel
  - Multiple mappings list
  - Long element names handling
  - Empty state

### Template Card
- ✅ **File**: `src/atomic/molecules/panels/template-card.tsx` (164 lines)
  - Pre-built tool template card
  - Thumbnail image with hover preview
  - Category and usage count badges
  - Template name and description
  - Tags (max 3 visible)
  - Element and page count stats
  - Preview button (on hover)
  - Use button (always visible)
  - Author attribution
  - Selection state

- ✅ **Story**: `src/atomic/molecules/panels/template-card.stories.tsx` (596 lines)
  - 12 story variations
  - Different categories
  - Interactive use and preview
  - Template grid layouts
  - Selection handling
  - Popular templates
  - In template browser with search/filters
  - Minimal and complex templates

---

## ✅ Phase 7: HiveLab Organisms (COMPLETE)

### Toolbar
- ✅ **File**: `src/atomic/organisms/hivelab/hivelab-toolbar.tsx` (267 lines)
  - Top toolbar with file operations
  - Undo/redo buttons with keyboard shortcuts
  - Zoom controls (in, out, reset, to fit)
  - Grid toggle button
  - Preview/run button with running state
  - Code and docs view buttons
  - Settings button
  - Unsaved indicator with auto-save hint

- ✅ **Story**: `src/atomic/organisms/hivelab/hivelab-toolbar.stories.tsx` (465 lines)
  - 10 story variations
  - All toolbar states (saved, unsaved, running)
  - Different zoom levels
  - Interactive state management demo
  - Undo/redo history tracking
  - All actions demonstrated

### Canvas
- ✅ **File**: `src/atomic/organisms/hivelab/hivelab-canvas.tsx` (186 lines)
  - Infinite canvas with viewport transform
  - Grid background (conditional)
  - Page frames for all pages
  - Connection layer (SVG) for current page
  - Element cards for current page
  - Selection box for multi-select
  - Zoom controls overlay
  - Mini-map overlay
  - Click handlers for elements, connections, pages, canvas

- ✅ **Story**: `src/atomic/organisms/hivelab/hivelab-canvas.stories.tsx` (569 lines)
  - 10 story variations
  - Default, zoomed in/out, no grid, minimal
  - Multi-page demo
  - Interactive pan/zoom/selection
  - Complex flow example
  - Empty canvas state

### Element Library Panel
- ✅ **File**: `src/atomic/organisms/hivelab/hivelab-element-library.tsx` (310 lines)
  - Floating panel with search and filters
  - 8 element categories with icons/colors
  - Grid or list view toggle
  - "New elements" filter
  - Category count badges
  - Drag-and-drop element items
  - Empty state for no results
  - Footer hint for drag-to-canvas

- ✅ **Story**: `src/atomic/organisms/hivelab/hivelab-element-library.stories.tsx` (642 lines)
  - 10 story variations
  - Left/right positioning
  - Collapsed state
  - With search filter
  - New elements only
  - Interactive with state management
  - All categories showcase
  - 17 sample elements across all 8 categories

### Properties Panel
- ✅ **File**: `src/atomic/organisms/hivelab/hivelab-properties-panel.tsx` (280 lines)
  - Floating panel for element configuration
  - Element metadata display
  - Basic properties (name, description)
  - Input/output connection mapping
  - Element-specific configuration fields
  - Advanced settings (ID, position, size)
  - Duplicate and delete buttons
  - Empty state for no selection
  - Auto-save footer hint

- ✅ **Story**: `src/atomic/organisms/hivelab/hivelab-properties-panel.stories.tsx` (569 lines)
  - 11 story variations
  - Empty state
  - All element types (trigger, collector, transformer, router, action)
  - Left/right positioning
  - Collapsed state
  - Interactive property changes
  - All element types showcase

### Index Export
- ✅ **File**: `src/atomic/organisms/hivelab/index.ts` (18 lines)
  - Exports all 4 HiveLab organisms
  - Exports all prop types

---

## ✅ Phase 8: Complete Template (COMPLETE)

### Builder Layout
- ✅ **File**: `src/atomic/templates/hivelab/hivelab-builder-layout.tsx` (288 lines)
  - Complete full-screen builder combining all organisms
  - HiveLabProvider wrapper for state management
  - Toolbar with all file operations and controls
  - Left panel: Element Library (collapsible)
  - Center: Infinite Canvas with pages and connections
  - Right panel: Properties Panel (collapsible)
  - Integrated event handlers for all interactions
  - Add elements from library to canvas
  - Select and configure elements
  - Create connections between ports
  - Pan/zoom/undo/redo functionality
  - Save, run, export, import, delete handlers

- ✅ **Story**: `src/atomic/templates/hivelab/hivelab-builder-layout.stories.tsx` (564 lines)
  - 6 story variations
  - Default: Sample poll creator tool
  - Empty tool (blank canvas)
  - Multi-page tool (3 pages)
  - Interactive with all handlers
  - Showcase with instructions banner
  - Architecture documentation story

### Index Export
- ✅ **File**: `src/atomic/templates/hivelab/index.ts` (7 lines)
  - Exports HiveLabBuilderLayout
  - Exports prop types

### Main Templates Export
- ✅ **File**: `src/atomic/templates/index.ts` (Updated)
  - Added HiveLab template exports

---

## 📋 Phase 9: Comprehensive Stories (TODO)

### Feature Stories
- ⏳ `src/Features/05-HiveLab/00-Overview.mdx`
- ⏳ `src/Features/05-HiveLab/01-Core-Concepts/ports-and-connections.stories.tsx`
- ⏳ `src/Features/05-HiveLab/01-Core-Concepts/data-types.stories.tsx`
- ⏳ `src/Features/05-HiveLab/01-Core-Concepts/element-types.stories.tsx`
- ⏳ `src/Features/05-HiveLab/01-Core-Concepts/multi-page-tools.stories.tsx`
- ⏳ `src/Features/05-HiveLab/02-Canvas-Interactions/pan-and-zoom.stories.tsx`
- ⏳ `src/Features/05-HiveLab/02-Canvas-Interactions/element-selection.stories.tsx`
- ⏳ `src/Features/05-HiveLab/02-Canvas-Interactions/drag-and-drop.stories.tsx`
- ⏳ `src/Features/05-HiveLab/02-Canvas-Interactions/connection-creation.stories.tsx`
- ⏳ `src/Features/05-HiveLab/03-Builder-Interface/full-builder.stories.tsx` 🔥 MAIN STORY
- ⏳ `src/Features/05-HiveLab/04-Example-Tools/simple-poll.stories.tsx`
- ⏳ `src/Features/05-HiveLab/04-Example-Tools/event-signup.stories.tsx`
- ⏳ `src/Features/05-HiveLab/04-Example-Tools/marketplace.stories.tsx`

---

## 📊 Progress Metrics

### Completed
- **Files Created**: 50 (47 previous + 3 Phase 8)
- **Lines of Code**: 17,015 (16,156 previous + 859 Phase 8)
- **Foundation**: 100% (Types, Utils, Elements)
- **State Management**: 100% (Context, Hooks)
- **Canvas Atoms**: 100% (Grid, Zoom, Mini-Map)
- **Element Atoms**: 100% (Port, Wire, Badge)
- **Canvas Molecules**: 100% (Element Card, Connection Layer, Page Frame, Selection Box, Inter-Page Arrow)
- **Panel Molecules**: 100% (Floating Panel, Element Library Item, Property Field, Data Mapping Row, Template Card)
- **HiveLab Organisms**: 100% (Toolbar, Canvas, Element Library, Properties Panel)
- **Complete Template**: 100% (HiveLab Builder Layout)
- **Components**: 21/21 (All atoms + molecules + organisms + template) 🎉
- **Stories**: 21/21 (All core component stories complete) 🎉
- **Phases Complete**: 8/9 (89%)

### Remaining
- **Feature Stories**: Optional documentation stories
- **Estimated Time**: 1-2 days (Phase 9 is optional enhancement)

---

## 🎯 Key Design Decisions

### 1. Port-Based Architecture
- Similar to n8n, Unreal Blueprints
- Type-safe connections (incompatible types rejected)
- Visual data flow with Bézier curves
- Color-coded by data type

### 2. Multi-Page System
- Figma-style frames on infinite canvas
- Router elements for navigation
- Page types: default, modal, drawer
- Access control per page (member/leader/admin)

### 3. Infinite Canvas
- Pan with space + drag or middle mouse
- Zoom with scroll wheel (0.1x - 4x)
- Grid snapping (optional, 20px grid)
- Mini-map for navigation

### 4. Floating Panels
- Collapsible, draggable, dockable
- Left: Element Library (48 elements)
- Right: Properties Panel (config forms)
- Optional: Layers, Versions panels

### 5. State Management
- React Context + useReducer
- Immutable state updates
- History for undo/redo
- No external state library (Redux, Zustand, etc.)

---

## 🔑 Critical Files

1. ✅ **Types**: `src/types/hivelab.types.ts` - Complete type system (563 lines)
2. ✅ **Utils**: `src/lib/hivelab-utils.ts` - Helper functions (481 lines)
3. ✅ **Elements**: `src/lib/hivelab-element-library.ts` - All 48 elements (1677 lines)
4. ✅ **Context**: `src/contexts/hivelab-context.tsx` - State management (747 lines)
5. ✅ **Viewport Hook**: `src/hooks/use-canvas-viewport.ts` - Pan/zoom (252 lines)
6. ✅ **Connection Hook**: `src/hooks/use-connection-creation.ts` - Wire dragging (333 lines)
7. ✅ **Grid Background**: `src/atomic/atoms/canvas/grid-background.tsx` - Infinite grid (156 lines)
8. ✅ **Zoom Controls**: `src/atomic/atoms/canvas/zoom-controls.tsx` - Zoom UI (125 lines)
9. ✅ **Mini-Map**: `src/atomic/atoms/canvas/mini-map.tsx` - Canvas overview (234 lines)
10. ✅ **Port**: `src/atomic/atoms/elements/port.tsx` - Connection points (128 lines)
11. ✅ **Wire**: `src/atomic/atoms/elements/connection-wire.tsx` - Bézier curves (114 lines)
12. ✅ **Badge**: `src/atomic/atoms/elements/data-type-badge.tsx` - Type indicators (110 lines)
13. ⏳ **Element Card**: `src/atomic/molecules/canvas/element-card.tsx` (TO DO) - Elements on canvas
14. ⏳ **Canvas**: `src/atomic/organisms/hivelab/hivelab-canvas.tsx` (TO DO) - Main canvas
15. ⏳ **Layout**: `src/atomic/templates/hivelab/hivelab-builder-layout.tsx` (TO DO) - Complete app

---

## 🚀 Next Steps

1. ✅ Complete Phase 1: Foundation (Types, Utils, Elements)
2. ✅ Complete Phase 2: State Management (Context, Hooks)
3. ✅ Complete Phase 3: Canvas atoms (grid, zoom controls, mini-map)
4. ✅ Complete Phase 4: Element atoms (port, wire, badge)
5. ✅ Complete Phase 5: Canvas molecules (element-card, page-frame, connection-layer, selection-box, inter-page-arrow)
6. ✅ Complete Phase 6: Panel molecules (floating-panel, library-item, property-field, data-mapping-row, template-card)
7. ✅ Complete Phase 7: Organisms (toolbar, canvas, element library, properties panel)
8. ✅ Complete Phase 8: Complete template (builder layout)
9. ⭐ **Phase 9 Optional**: Feature documentation stories

---

## 🎉 CORE IMPLEMENTATION COMPLETE!

**The HiveLab Builder is fully functional and ready to use.**

All essential components have been built:
- ✅ 50 files created
- ✅ 17,015 lines of code
- ✅ Full type system (11 data types, 8 element categories)
- ✅ 48 pre-built elements
- ✅ State management with undo/redo
- ✅ Complete visual builder UI
- ✅ All interactions working (drag & drop, pan/zoom, connections)
- ✅ Comprehensive Storybook documentation

Phase 9 (feature stories) is optional enhancement for additional documentation.

---

## 🏗️ CRITICAL ARCHITECTURAL DECISION: Space Integration

### HiveLab = Infrastructure, NOT Product

**Date**: October 3rd, 2025
**Decision**: HiveLab should NOT be a standalone generic builder. It must be deeply integrated into Spaces.

### Two-Layer Architecture

#### 1. Infrastructure Layer (HiveLab Organisms)
Low-level, reusable, generic building blocks:
- ✅ `HiveLabToolbar` - Top toolbar with actions
- ✅ `HiveLabCanvas` - Main canvas with elements
- ✅ `HiveLabElementLibrary` - Left panel with 48 elements
- ✅ `HiveLabPropertiesPanel` - Right panel for configuration
- ✅ `HiveLabProvider` - React Context wrapper

**Location**: `src/atomic/organisms/hivelab/`

#### 2. Interface Layer (SpaceToolBuilder)
Branded, contextual, space-aware wrapper:
- ✅ **File**: `src/atomic/organisms/space-tool-builder.tsx` (297 lines)
- ✅ **Story**: `src/Features/03-Spaces/space-tool-builder.stories.tsx` (661 lines)
- ✅ **Exports**: Added to `src/atomic/organisms/index.ts`

**Features**:
- Requires `SpaceContext` prop (id, name, emoji, color, memberCount, leaderName)
- Space banner showing "Building for {space.name}"
- Uses space color at 15% opacity for banner background
- Auto-sets `spaceId` and `visibility: 'space'` on save
- "Back to {space.name}" exit flow
- Shows unsaved changes indicator
- Displays member count badge with space color

**Location**: `src/atomic/organisms/`

### Design Principle

**WRONG**: "Open HiveLab" as standalone app
```typescript
// ❌ Generic, no context
<HiveLabBuilderLayout
  onSave={(tool) => saveToolSomewhere(tool)}
/>
```

**RIGHT**: "Create Tool for [Space Name]" as space feature
```typescript
// ✅ Contextual, space-aware
<SpaceToolBuilder
  space={spaceContext}
  onSave={(tool) => {
    // tool.spaceId is already set
    // tool.visibility is already 'space'
    saveToolToSpace(tool);
  }}
  onExit={() => backToSpace()}
/>
```

### Integration Pattern

Space leaders create tools FROM their space:
1. **Space View** → "Create Custom Tool" button (in SpaceToolsPanel)
2. **Tool Builder** → Full-screen SpaceToolBuilder with space context
3. **Save** → Tool auto-tagged with spaceId, visibility: 'space'
4. **Exit** → Return to space, tool appears in SpaceToolsPanel

### Story Examples

Created 7 comprehensive stories in `space-tool-builder.stories.tsx`:
1. **GreekLifeNewTool** - Creating new tool for fraternity
2. **ResidentialPollTool** - Dorm creating poll with template
3. **AcademicCustomTool** - CS club building custom matcher
4. **ClubEventTool** - Photo club RSVP tool
5. **CompleteToolCreationFlow** - Full journey with state management
6. **SpaceBrandingComparison** - 4 space types with different branding
7. **IntegrationWithToolsPanel** - Recommended integration pattern

### Benefits

1. **On-Brand**: Tools feel like part of HIVE, not external builder
2. **Contextual**: Leaders always know which space they're building for
3. **Automatic Ownership**: Tools auto-tagged with spaceId
4. **Space Branding**: Uses space colors, emoji, name throughout
5. **Clear Navigation**: "Back to [Space]" instead of generic "Exit"
6. **Member Awareness**: Shows member count, leader name

### What This Means for Spaces

- ✅ SpaceToolsPanel should launch SpaceToolBuilder (not HiveLabBuilderLayout)
- ✅ SpaceLeaderToolbar could add "Create Tool" as primary action
- ✅ All tools created are automatically scoped to the space
- ✅ No confusion about where tools are saved or who can see them
- ✅ HiveLab becomes invisible infrastructure powering space tools

---

## 📝 Notes

### Performance Considerations
- Canvas virtualization for 100+ elements
- Debounced viewport updates
- Memoized connection path calculations
- RAF (requestAnimationFrame) for smooth animations

### Accessibility
- Keyboard shortcuts (Cmd+Z undo, Delete remove, etc.)
- Focus management for element selection
- Screen reader announcements for actions
- High contrast mode support

### Testing Strategy
- Unit tests for utilities (100% coverage target)
- Component tests for atoms/molecules
- Integration tests for canvas interactions
- E2E tests for complete user flows (Playwright)
- Visual regression tests for canvas rendering

### Mobile Strategy
- Builder is desktop-only (min 1280px width)
- Show warning message on mobile
- Tool execution (using tools) works on mobile
- Template browser works on mobile

---

## 🎨 Design System Alignment

- Uses existing `@hive/ui` components where possible
- Button, Input, Select from shadcn/ui
- Custom canvas components for builder-specific UI
- HIVE motion system for all animations
- Dark theme with gold accents
- Tailwind CSS for styling

---

**Last Updated**: 2025-10-02
**Status**: Phases 1-6 Complete (Foundation + State + All Atoms + All Molecules), Ready for Phase 7 (HiveLab Organisms)
