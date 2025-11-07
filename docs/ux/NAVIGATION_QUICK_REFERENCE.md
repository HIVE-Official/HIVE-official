# Navigation Quick Reference

Complete keyboard shortcut and route reference for HIVE platform developers.

## Keyboard Shortcuts Cheat Sheet

### Global (All Contexts)
```
Cmd+K        Command Palette - Search actions, navigate, create
Cmd+F        Go to Feed
Cmd+S        Browse Spaces
Cmd+P        Go to Profile
Cmd+H        Go to HiveLab (leaders only)
Cmd+N        New (context-aware)
Cmd+,        Settings
Cmd+\        Toggle Sidebar (desktop only)
Cmd+.        Notifications dropdown
?            Show keyboard shortcuts help
Escape       Close any modal/sheet/palette
C            Compose (opens composer anywhere)
```

### Feed (vim-style)
```
j / ↓        Next post
k / ↑        Previous post
Space        Page down
Shift+Space  Page up
l            Like focused post
c            Comment on focused post
r            Reshare focused post
b            Bookmark focused post
o / Enter    Open post detail
m            Mute space of post
s            Save to collection
f            Open filters
1-5          Quick filter presets
x            Clear filters
```

### Space Board
```
c            Focus composer
p            Pin post (leader)
e            Create event
t            Install tool (leader)
f            Filters
v            Toggle view
```

### HiveLab Studio
```
Cmd+Z        Undo
Cmd+Shift+Z  Redo
Cmd+E        Element palette
Cmd+P        Properties panel
Cmd+L        Lint panel
Cmd+D        Duplicate element
Cmd+C        Copy
Cmd+V        Paste
Delete       Remove selected
↑/↓          Reorder elements
Tab          Next property field
Shift+Tab    Previous property field
Cmd+S        Save
Cmd+Shift+S  Save as new version
Cmd+B        Preview
Cmd+Shift+P  Publish/Deploy
```

### Calendar
```
n            Next month
p            Previous month
t            Today
j / ↓        Next day
k / ↑        Previous day
Enter        Open focused event
r            RSVP focused event
c            Check-in (if live)
```

## Route Map

### Core Routes
```
/              Landing or feed redirect
/feed          Main campus feed
/spaces        Space directory
/spaces/[id]   Space board view
/tools         Tools directory
/tools/[id]    Tool detail
/hivelab       HiveLab workspace
/profile       My profile
/profile/[id]  User profile
/admin         Admin dashboard
/settings      Settings
/notifications Notifications center
```

### Parameterized Routes
```
/spaces/[id]?postId=[id]&highlight=true
/spaces/[id]/events/[id]
/tools/[id]/run?deploymentId=[id]
/profile/[id]?tab=timeline
/feed?spaces=id1,id2&type=event&sort=trending
```

## Component File Locations

```
packages/ui/src/
├── shells/
│   ├── UniversalShell.tsx
│   ├── components/ShellHeader.tsx
│   ├── components/ShellSidebar.tsx
│   ├── components/ShellMobileNav.tsx
│   └── hooks/useShellState.tsx
├── navigation/
│   ├── UniversalNav.tsx
│   └── CommandPalette.tsx
└── atomic/molecules/
    └── navigation-primitives.tsx
```

## Performance Targets

| Component | Target | Type |
|-----------|--------|------|
| Route Navigation | <50ms | Response Time |
| Keyboard Shortcut | <16ms | Response Time |
| Command Palette | <100ms | Search Response |
| Sidebar Toggle | <200ms | Animation |
| Mobile Sheet | <300ms | Animation |
| Fuzzy Search | <100ms | Debounced (150ms) |

## Mobile Dimensions

```
Top Bar:       56px (height)
Bottom Nav:    56px (height)
Sidebar:       240px (desktop) → 56px (rail) → 0 (mobile)
Touch Targets: ≥44px (minimum)
Safe Area:     Bottom padding for notch
```

## Navigation Components

### NavigationItem
```typescript
type NavigationLayout = 'sidebar' | 'rail' | 'bottom' | 'inline';

Props:
- id, label, icon, badge
- active, disabled, layout
- href, path, onClick
- description (optional)
```

### SidebarNav
```typescript
Props:
- sections: SidebarNavSection[]
- activeId, onSelect
- header, footer (optional)
```

### BottomNav
```typescript
Props:
- items: NavigationNode[]
- activeId, onSelect
- label (optional)
```

## Deep Linking Examples

```
// Space with post highlighted
/spaces/photo-club?postId=post-123&highlight=true

// Feed with filters
/feed?spaces=photo-club,cs-majors&type=event

// Profile with tab
/profile/user-456?tab=timeline&sort=recent

// Tool deployment
/tools/poll-id/run?deploymentId=deploy-789

// Collections
/profile/user-456/bookmarks?collection=study-tips

// Short links
/s/photography-club  → /spaces/photo-club
/s/weekly-poll       → /tools/poll-id
```

## Mobile Gestures

```
Swipe Right    → Go back
Swipe Left     → Go forward
Pull Down      → Refresh (feed)
Long Press     → Context menu
Pinch          → Zoom (images)
Tap + Hold     → Long press menu
Drag Up/Down   → Close sheet
```

## Keyboard Shortcut Contexts

1. **Global** - Work everywhere
2. **Feed** - Only in feed view (vim-style)
3. **Spaces** - Only in space boards
4. **HiveLab** - Only in studio editor
5. **Calendar** - Only in calendar view

Text field aware: Shortcuts disabled inside:
- `<input>`
- `<textarea>`
- `[contenteditable]`

## Command Palette Categories

1. **Navigation** - Go to routes
2. **Creation** - New tool, space, post
3. **Tools** - Open/manage tools (dynamic)
4. **Spaces** - Join/navigate spaces (dynamic)
5. **Recent** - Last 10 viewed items
6. **Settings** - Theme, notifications, privacy
7. **Shortcuts** - Show keyboard help

## Accessibility Standards

- WCAG 2.1 Level AA
- Color Contrast: 4.5:1 for text
- Touch Targets: ≥44px
- Keyboard Navigation: Full support
- Screen Reader: ARIA labels
- Reduced Motion: Respected

---

**For complete documentation, see:**
- `/docs/ux/NAVIGATION_TOPOLOGY.md` - Full 1,565-line specification
- `/docs/ux/FEED_TOPOLOGY.md` - Feed-specific navigation
- `/docs/ux/SPACES_TOPOLOGY.md` - Space-specific navigation
- `/docs/ux/HIVELAB_TOOLS_TOPOLOGY.md` - HiveLab shortcuts
- `/docs/UX-UI-TOPOLOGY.md` - Global patterns
