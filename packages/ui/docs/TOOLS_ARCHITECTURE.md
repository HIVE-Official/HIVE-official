# HIVE Tools Architecture

## Overview

The HIVE tools system provides **two complementary access methods** for creating Poll, Event, Task, and Resource tools in spaces. Both methods create the same tools but serve different use cases.

---

## 🎯 Two Access Methods

### 1. **Inline Tools** (Composer Integration)
**Location**: Inside the message composer (60% main content area)

**Access Methods**:
- **Plus Button** (`+`): Click to open quick tool menu
- **Slash Commands**: Type `/poll`, `/event`, `/task`, or `/resource`
- **Mobile**: Tool tray above keyboard

**Use Case**: Quick tool creation while typing a message

**Components**:
- `InlineToolMenu` - Popup menu with 2x2 tool grid
- `SpaceComposerWithTools` - Enhanced composer with inline tool support
- `useSlashCommands` - Hook for detecting slash commands

**User Flow**:
```
User typing message
  → Clicks + button OR types /poll
  → Tool menu appears
  → Clicks Poll
  → PollModal opens
  → Submits poll
  → Poll posts to feed
```

---

### 2. **Widget Tools** (Sidebar Integration)
**Location**: Tools Widget in 40% sidebar

**Access Methods**:
- **Click tool** in sidebar widget
- **Leaders only**: "Create Tool" CTA for HiveLab builder
- **Leaders only**: "Manage Tools" button for analytics

**Use Case**: Browsing available tools, managing custom HiveLab tools

**Components**:
- `SpaceToolsPanel` - Sidebar widget showing default + custom tools
- Shows usage analytics for custom tools
- Displays permission badges (all members vs leaders only)

**User Flow**:
```
User views sidebar
  → Sees default tools + custom HiveLab tools
  → Clicks Poll in widget
  → PollModal opens
  → Submits poll
  → Poll posts to feed
```

---

## 🔧 Default Tools (4 Total)

All default tools are available in BOTH inline and widget methods:

1. **📊 Poll**
   - Quick poll (2-5 options)
   - Anonymous voting option
   - Multiple choice option
   - Auto-close with end date

2. **📅 Event**
   - Create events
   - Quick templates (Meeting, Social, Workshop)
   - RSVP limits
   - Calendar integration

3. **📋 Task**
   - Assign tasks with deadlines
   - Priority levels (low, medium, high)
   - Assignment options (volunteer or specific members)

4. **📚 Resource**
   - Upload or link resources
   - Post announcement option
   - Auto-categorization

**Permissions**:
- **All Members**: Poll, Resource (after 7 days in space)
- **Leaders Only**: Event, Task

---

## 🚀 Custom HiveLab Tools

**Access**: Widget ONLY (not available in inline menu)

**Creation**: Leaders use HiveLab Builder (drag-and-drop tool creator)

**Features**:
- Custom icons and colors
- Usage analytics
- Permission configuration (all members vs leaders only)
- Deploy to multiple spaces

**Examples**:
- Event Sign-up (custom form)
- Budget Request (leader approval)
- Anonymous Feedback (identity anonymizer)
- Study Group Finder (matching algorithm)

---

## 📦 Component Architecture

### Core Components

#### `InlineToolMenu`
```tsx
<InlineToolMenu
  open={open}
  onOpenChange={setOpen}
  onToolSelect={(tool) => handleToolSelect(tool)}
  position="above"
  trigger={<Button>+</Button>}
/>
```

#### `SpaceComposerWithTools`
```tsx
<SpaceComposerWithTools
  value={value}
  onValueChange={setValue}
  onCreatePost={handlePost}
  onToolSelect={handleToolSelect}
  placeholder="Message #space... (try /poll or click +)"
  showInlineTools={true}
/>
```

#### `SpaceToolsPanel`
```tsx
<SpaceToolsPanel
  customTools={customHiveLabTools}
  isLeader={isSpaceLeader}
  onToolClick={handleToolClick}
  onManageTools={() => navigate('/hivelab/analytics')}
  onCreateTool={() => navigate('/hivelab/builder')}
/>
```

### Tool Modals (Shared by Both Methods)

```tsx
<PollModal
  open={pollOpen}
  onOpenChange={setPollOpen}
  onSubmit={(data) => createPoll(data)}
/>

<EventModal
  open={eventOpen}
  onOpenChange={setEventOpen}
  onSubmit={(data) => createEvent(data)}
/>

<TaskModal
  open={taskOpen}
  onOpenChange={setTaskOpen}
  onSubmit={(data) => createTask(data)}
/>

<ResourceModal
  open={resourceOpen}
  onOpenChange={setResourceOpen}
  onSubmit={(data) => addResource(data)}
/>
```

---

## 🎨 Storybook Stories

### 1. **Inline Tools** (`src/Features/05-HiveLab/inline-tools.stories.tsx`)

Stories:
- `InlineToolMenuBasic` - Standalone menu component
- `ComposerWithInlineTools` - Full composer with tools + modals
- `SlashCommandDemo` - Slash command demonstration
- `MobileToolTray` - Mobile responsive view
- `InlineVsWidgetComparison` - Side-by-side comparison

### 2. **Tool Action Modals** (`src/Features/05-HiveLab/tool-action-modals.stories.tsx`)

Stories:
- `PollModalStory` - Poll creation
- `EventModalStory` - Event creation
- `TaskModalStory` - Task creation
- `ResourceModalStory` - Resource upload/link
- `AllToolModals` - Interactive demo

### 3. **Space Tools Panel** (`src/Features/03-Spaces/space-tools-panel.stories.tsx`)

Stories:
- `DefaultToolsOnly` - No custom tools yet
- `MemberView` - Non-leader permissions
- `LeaderView` - With create tool CTA
- `WithCustomTools` - Custom HiveLab tools shown
- `ActiveSpaceTools`, `GreekLifeTools`, `ResidentialTools` - Use case examples

### 4. **Complete Integration** (`src/Features/05-HiveLab/spaces-tools-integration.stories.tsx`)

Stories:
- `CompleteIntegration` - Original 60/40 layout with widget tools
- `MemberViewIntegration` - Non-leader permissions
- `MobileIntegration` - Mobile responsive
- **🔥 `InlineAndWidgetIntegration`** - **THE COMPLETE STORY**

**The `InlineAndWidgetIntegration` Story Shows:**
- Full 60/40 Spaces layout
- Composer with inline tools (+ button and slash commands)
- Sidebar with Tools Widget (default + custom tools)
- Both methods opening the same modals
- Live post creation when tools are submitted
- Info banner explaining both access methods

---

## 🔄 Integration with Spaces

### Spaces 60/40 Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Space Header                                                 │
├───────────────────────────────────┬─────────────────────────┤
│                                   │                         │
│  60% Main Content                 │  40% Sidebar            │
│  ─────────────────                │  ────────────           │
│                                   │                         │
│  Space Post Feed                  │  About Section          │
│  ├─ Messages                      │  Events Widget          │
│  ├─ Threads                       │  🔥 TOOLS WIDGET        │
│  └─ Composer with Inline Tools ✨ │  Resources Widget       │
│     ├─ + button                   │  Members Widget         │
│     └─ /poll /event /task         │                         │
│                                   │                         │
└───────────────────────────────────┴─────────────────────────┘
```

### Integration Points

1. **Feed System**: Tool submissions create posts
2. **Events Panel**: Events created via tool → appear in sidebar
3. **Resources Panel**: Resources added via tool → appear in sidebar
4. **Notifications**: Tool events trigger notifications
5. **Analytics**: Usage flows to HiveLab analytics
6. **HiveLab**: Custom tools deploy to Tools Widget

---

## 🎯 Key Distinctions

### Inline Tools vs Widget Tools

| Aspect | Inline Tools | Widget Tools |
|--------|--------------|--------------|
| **Location** | Composer (+ button) | Sidebar panel |
| **Access** | Click + OR slash commands | Click tool in widget |
| **Tools Shown** | Default 4 only | Default + custom HiveLab |
| **Use Case** | Quick creation while typing | Browse all tools |
| **Mobile** | Tool tray above keyboard | Scrollable sidebar |
| **Leaders** | Same as members | Additional: Manage, Create |

### Tool Creation vs HiveLab

| Aspect | Tool Creation (Inline/Widget) | HiveLab Builder |
|--------|-------------------------------|-----------------|
| **Purpose** | Use existing tools | Build NEW tools |
| **Access** | All members (with permissions) | Leaders only |
| **Tools** | 4 default tools | Unlimited custom tools |
| **Interface** | Simple modals | Drag-drop builder |
| **Result** | Poll/Event/Task/Resource | Custom tool deployed to spaces |

---

## 📝 Implementation Checklist

### ✅ Completed

- [x] `InlineToolMenu` component
- [x] `SpaceComposerWithTools` component
- [x] `useSlashCommands` hook
- [x] Slash command detection (/poll, /event, /task, /resource)
- [x] Tool modals (PollModal, EventModal, TaskModal, ResourceModal)
- [x] `SpaceToolsPanel` sidebar widget
- [x] Custom HiveLab tools support
- [x] Permission-based access (all vs leaders)
- [x] Complete integration story (inline + widget)
- [x] Mobile responsive patterns
- [x] Comprehensive Storybook documentation

### 🔜 Future Enhancements

- [ ] Slash command autocomplete suggestions
- [ ] Tool usage analytics dashboard
- [ ] Custom tool builder (HiveLab visual builder)
- [ ] Tool templates library
- [ ] Multi-space tool deployment
- [ ] Tool version control
- [ ] A/B testing for tools
- [ ] Tool permissions granularity

---

## 🚀 Usage Examples

### Example 1: Quick Poll Creation (Inline)

```tsx
// User types in composer
"/poll"

// useSlashCommands detects command
// Opens PollModal
// User creates poll
// Poll posts to feed
```

### Example 2: Event Creation (Widget)

```tsx
// User clicks Event in sidebar Tools Widget
// Opens EventModal
// User fills form
// Event created → appears in Events Panel + Feed
```

### Example 3: Custom Tool (HiveLab)

```tsx
// Leader creates "Budget Request" tool in HiveLab
// Tool deploys to space Tools Widget
// Members click tool in widget
// Custom form opens
// Submission flows to space leaders
```

---

## 📚 Related Documentation

- **Spec**: `/spec.md` lines 1649-1744 (Tools Widget Pattern, HiveLab Access)
- **Stories**:
  - `src/Features/05-HiveLab/inline-tools.stories.tsx`
  - `src/Features/05-HiveLab/tool-action-modals.stories.tsx`
  - `src/Features/05-HiveLab/spaces-tools-integration.stories.tsx`
  - `src/Features/03-Spaces/space-tools-panel.stories.tsx`
- **Components**:
  - `src/atomic/molecules/inline-tool-menu.tsx`
  - `src/atomic/molecules/space-composer-with-tools.tsx`
  - `src/atomic/organisms/space-tools-panel.tsx`
  - `src/atomic/organisms/tool-action-modals.tsx`
  - `src/hooks/use-slash-commands.ts`

---

## 🎉 Summary

The HIVE tools system provides a **dual-access pattern** that serves different user needs:

- **Inline Tools**: Fast, contextual access while composing messages
- **Widget Tools**: Comprehensive view including custom HiveLab tools

Both methods use the same tool modals and create identical results, providing flexibility without complexity. The system is fully implemented in Storybook with comprehensive stories demonstrating all use cases.
