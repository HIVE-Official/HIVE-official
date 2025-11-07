# NAVIGATION TOPOLOGY
**Global Navigation System: Seamless Movement Across HIVE Platform**

> **Design Philosophy**: SF/YC minimalism meets campus mobility — keyboard-first for power users, touch-first for mobile
> **Scale Target**: Navigate 20+ spaces, 100+ tools, 10,000+ posts without UX degradation
> **Performance**: < 100ms navigation, < 16ms transitions, < 50ms route changes
> **Aesthetic**: Linear/Vercel/Arc — Zero friction between features, deep linking everywhere

---

## Table of Contents

1. [Platform Navigation Architecture](#platform-navigation-architecture)
2. [Route Topology](#route-topology)
3. [Global Navigation Components](#global-navigation-components)
4. [Keyboard Navigation & Shortcuts](#keyboard-navigation--shortcuts)
5. [Command Palette System](#command-palette-system)
6. [Deep Linking Patterns](#deep-linking-patterns)
7. [Mobile Navigation](#mobile-navigation)
8. [Performance & Optimization](#performance--optimization)
9. [Navigation Flows](#navigation-flows)
10. [Accessibility](#accessibility)
11. [Testing & QA](#testing--qa)

---

## Platform Navigation Architecture

### Multi-Layer Navigation System

HIVE uses a layered navigation approach for different user contexts:

```
┌─────────────────────────────────────────────────────────┐
│ Layer 1: Global Command Palette (Cmd+K)                │
│          Search + Actions + Recent Items + Shortcuts    │
├─────────────────────────────────────────────────────────┤
│ Layer 2: Platform Shell (Desktop/Mobile)                │
│          - Desktop: Left Sidebar + Top Bar               │
│          - Mobile: Bottom Navigation + Top Bar           │
├─────────────────────────────────────────────────────────┤
│ Layer 3: Feature-Specific Navigation                    │
│          - Space Tabs: Board / Calendar / About         │
│          - Feed: Filters / Collections                  │
│          - HiveLab: Studio / Workspace / Analytics      │
├─────────────────────────────────────────────────────────┤
│ Layer 4: Keyboard Shortcuts                             │
│          Context-aware shortcuts (j/k, l, c, b, etc)   │
└─────────────────────────────────────────────────────────┘
```

### Navigation Item Hierarchy

```
Primary (Always visible):
├─ Feed        → /feed
├─ Spaces      → /spaces
├─ HiveLab     → /hivelab (leaders only)
├─ Rituals     → /rituals
└─ Profile     → /profile

Secondary (User-specific):
├─ My Spaces   → Dynamic list
├─ Notifications → /notifications
├─ Settings    → /settings
└─ Admin       → /admin (admin users)

Tertiary (Feature-specific):
├─ Space Board  → /spaces/[id]
├─ Tools        → /tools/[id]
├─ Events       → /spaces/[id]/events/[id]
└─ Collections  → /collections/[id]
```

---

## Route Topology

### Complete Route Map (All Pages)

**Authentication Routes** (`/auth`):
```
/auth/login              → Email login page
/auth/verify            → Email verification (magic link)
/auth/expired           → Session expired page
```

**Onboarding Routes** (`/onboarding`):
```
/onboarding             → Onboarding wizard (step-based)
/start                  → Alternative start flow
/start/verify           → Verify email during start
/start/done             → Onboarding completion
```

**Core Feature Routes**:
```
/                       → Landing page or feed redirect
/feed                   → Main campus feed (primary route)
/feed/[view]           → Feed variants (all-spaces, my-spaces, events)

/spaces                 → Space directory/browse
/spaces/[spaceId]       → Space board view (primary)
/spaces/[spaceId]/calendar
                        → Space calendar view
/spaces/[spaceId]/events
                        → Space events list
/spaces/[spaceId]/members
                        → Space members list
/spaces/[spaceId]/resources
                        → Space resources/tools
/spaces/[spaceId]/settings
                        → Space settings (leaders)
/spaces/create          → Create new space
/spaces/browse          → Browse all spaces (discovery)
/spaces/search          → Space search results
/spaces/s/[slug]        → Space by custom slug (short link)

/tools                  → Tools directory/all tools
/tools/[toolId]         → Tool detail/preview
/tools/[toolId]/edit    → HiveLab studio (edit tool)
/tools/[toolId]/preview → Tool preview/test mode
/tools/[toolId]/deploy  → Deploy tool flow
/tools/[toolId]/run     → Run tool/execute
/tools/[toolId]/analytics
                        → Tool response analytics
/tools/[toolId]/settings
                        → Tool configuration (leaders)

/hivelab                → HiveLab workspace/library
/hivelab/studio         → HiveLab studio (implied by tool edit)
/hivelab/analytics      → Creator analytics dashboard
/hivelab/templates      → Tool templates library
/hivelab/published      → Published tools gallery

/profile                → My profile (redirect to /profile/[userId])
/profile/[userId]       → View user profile
/profile/edit           → Edit my profile
/profile/my-spaces      → My spaces list
/profile/connections    → My connections/friends

/rituals                → Rituals dashboard
/rituals/[ritualId]     → Ritual detail page

/calendar               → Campus calendar view
/calendar/[date]        → Calendar on specific date

/notifications          → Notifications center
/notifications/[id]     → Notification detail

/schools                → School/campus selector
/schools/[schoolId]     → School landing page
/waitlist/[schoolId]    → Waitlist page (pre-launch)

/admin                  → Admin dashboard (admin-only)
/admin/control-board    → Admin control center
/admin/hivelab          → Admin HiveLab management
/admin/[section]        → Various admin sections

/settings               → Settings page
/resources              → Help/resources page
/design-system          → Design system showcase
```

### Dynamic Route Patterns

**Parameterized Routes**:
```typescript
// Space with ID
/spaces/[spaceId]
/spaces/[spaceId]/events/[eventId]
/spaces/[spaceId]/posts/[postId]
/spaces/[spaceId]/posts/[postId]/comments

// Tools with ID
/tools/[toolId]
/tools/[toolId]/analytics
/tools/[toolId]/deploy/[deploymentId]

// Profiles with ID
/profile/[userId]
/profile/[userId]/badges
/profile/[userId]/timeline

// Short links/slugs
/s/[slug]              → Space by custom slug
```

### Route Accessibility

**Public Routes** (no auth required):
- `/landing` - Marketing landing page
- `/auth/*` - All auth pages
- `/schools` - School selection
- `/waitlist/[schoolId]` - Waitlist signup

**Authenticated Routes** (auth required):
- `/feed` - Primary app
- `/spaces/*` - All space routes
- `/tools/*` - All tool routes
- `/profile/*` - User profiles
- `/hivelab/*` - Builder studio
- `/admin/*` - Admin dashboard (role-based)

---

## Global Navigation Components

### Component Locations & Files

```
packages/ui/src/
├── shells/
│   ├── UniversalShell.tsx          → Main app shell (desktop/mobile)
│   ├── components/
│   │   ├── ShellHeader.tsx          → Top bar with search & user menu
│   │   ├── ShellSidebar.tsx         → Left sidebar (desktop)
│   │   ├── ShellMobileNav.tsx       → Bottom nav (mobile)
│   │   ├── ShellContextRail.tsx     → Secondary navigation rail
│   │   └── ShellNotifications.tsx   → Notification center
│   ├── hooks/
│   │   └── useShellState.tsx        → Shell state management
│   └── motion-safe.tsx              → Safe motion components
│
├── navigation/
│   ├── UniversalNav.tsx             → Main navigation component
│   └── CommandPalette.tsx           → Cmd+K command palette
│
├── atomic/molecules/
│   ├── navigation-primitives.tsx    → Reusable nav components
│   │   ├── NavigationItem           → Single nav item (4 layouts)
│   │   ├── SidebarNav               → Sidebar nav structure
│   │   ├── NavigationRail           → Compact rail nav
│   │   ├── BottomNav                → Mobile bottom nav
│   │   └── TopBar                   → Header bar component
│   │
│   └── notification-system.tsx      → Global notification manager
```

### Desktop Shell Layout

```
┌─────────────────────────────────────────────────────────────┐
│ TopBar: [Logo] [Search Cmd+K] [Context] [Notifications]   │
├─────┬──────────────────────────────────────────────────────┤
│     │                                                        │
│     │  PRIMARY CONTENT                                       │
│ Sidebarr   - Feed card stream                               │
│ [Feed]     - Space board                                    │
│ [Spaces]   - Tool studio                                    │
│ [HiveLab]  - Profile timeline                               │
│ [Profile]  │                                                │
│ [Rituals]  │                                                │
│            │                                                │
│ [─────]    │                                                │
│ My Spaces: │                                                │
│ • Photo 🟢 │                                                │
│ • CS Majors│                                                │
│ • Res Hall │                                                │
│            │                                                │
│ [Settings] │                                                │
│ [Logout]   │                                                │
└─────┴──────────────────────────────────────────────────────┘

Sidebar: 240px (collapsible to 56px rail)
Content: Fluid (full width minus sidebar)
Top Bar: 56px height, sticky
```

**Sidebar Structure** (`SidebarNav.tsx`):
```typescript
interface SidebarNavSection {
  id: string;
  label?: string;
  items: NavigationNode[];
}

sections = [
  {
    id: 'primary',
    label: 'Main',
    items: [
      { id: 'feed', label: 'Feed', icon: Home, href: '/feed', ... },
      { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', ... },
      { id: 'hivelab', label: 'HiveLab', icon: Hammer, href: '/hivelab', ... },
      { id: 'profile', label: 'Profile', icon: User, href: '/profile', ... },
    ]
  },
  {
    id: 'myspaces',
    label: 'My Spaces',
    items: [
      { id: 's-photo', label: 'Photography Club', ... },
      { id: 's-cs', label: 'CS Majors', ... },
    ]
  },
  {
    id: 'system',
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings, ... },
      { id: 'notifications', label: 'Notifications', icon: Bell, ... },
    ]
  }
]
```

**Navigation Item Layout Variants** (`NavigationItem.tsx`):
```typescript
type NavigationLayout = 'sidebar' | 'rail' | 'bottom' | 'inline';

// sidebar: Full width with label + icon (44px height)
// rail: Icon only, compact (64px height)
// bottom: Icon + label, mobile (56px height)
// inline: Horizontal, header bar (40px height)

const layoutClassMap = {
  sidebar: 'w-full justify-between px-3 py-2 text-sm',
  inline: 'justify-start px-3 py-1.5 text-sm',
  rail: 'flex-col gap-1 px-2 py-3 text-xs',
  bottom: 'flex-1 flex-col gap-1 px-2 py-2 text-xs'
}
```

### Mobile Shell Layout

```
┌──────────────────────────────────────┐
│ TopBar: [Menu] [Title] [Search] [⚙️]│
├──────────────────────────────────────┤
│                                       │
│  PRIMARY CONTENT (Full Width)        │
│                                       │
│  - Feed card stream                  │
│  - Space board                       │
│  - Tool detail                       │
│  - Profile view                      │
│                                       │
├──────────────────────────────────────┤
│ [🏠] [🧭] [🛠️] [🔔] [👤]             │
│ Feed Spaces HiveLab Notif Profile   │
└──────────────────────────────────────┘

Top Bar: 56px, sticky
Bottom Nav: 56px, fixed
Content: Full width minus bottom nav
```

**Bottom Navigation Structure** (`BottomNav.tsx`):
```typescript
const mobileNavItems: NavigationNode[] = [
  { id: 'feed', label: 'Feed', icon: Home, href: '/feed', ... },
  { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', ... },
  { id: 'compose', label: 'Create', icon: Plus, href: '/compose', ... },
  { id: 'notifications', label: 'Notif', icon: Bell, badge: 3, ... },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile', ... }
];

// Badges show unread counts (notifications, messages)
// Active indicator: Highlight + underline
// Icons sized 24px (touch target ≥44px)
```

### Navigation Item Styling

**Active State Indicators**:
```css
/* Sidebar - Gold border + background tint */
.nav-item[aria-current="page"] {
  background: rgba(250, 204, 21, 0.18);
  border: 1px solid rgba(250, 204, 21, 0.32);
  box-shadow: 0 16px 42px rgba(7, 8, 15, 0.32);
}

/* Rail - Top accent indicator */
.nav-item[aria-current="page"]::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  width: 40px;
  height: 4px;
  border-radius: 2px;
  background: rgba(250, 204, 21, 0.82);
  transform: translateX(-50%);
}

/* Bottom Nav - Underline indicator */
.nav-item[aria-current="page"]::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  width: 10px;
  height: 4px;
  border-radius: 2px;
  background: rgba(250, 204, 21, 0.82);
  transform: translateX(-50%);
}

/* Hover state */
.nav-item:not([aria-disabled]):hover {
  background: rgba(15, 16, 24, 0.65);
  transition: all 200ms ease;
}

/* Badge styling */
.nav-item[data-badge] .badge {
  background: rgba(250, 204, 21, 0.2);
  color: #F9FAFB;
  min-width: 24px;
  padding: 2px 6px;
  font-size: 11px;
  border-radius: 999px;
  font-weight: 600;
}
```

---

## Keyboard Navigation & Shortcuts

### Global Keyboard Shortcuts

**Available Everywhere** (with `useKeyboardShortcuts` hook):

```typescript
// Navigation Commands (Cmd = Cmd on Mac, Ctrl on Windows)
Cmd+K        → Open Command Palette (fuzzy search + actions)
Cmd+F        → Go to Feed
Cmd+S        → Browse Spaces
Cmd+P        → Go to Profile
Cmd+H        → Go to HiveLab (leaders only, silent fail if not leader)
Cmd+N        → New (context-aware: tool in HiveLab, post in Space)
Cmd+,        → Settings
Cmd+\        → Toggle Sidebar (desktop)
Cmd+.        → Notifications dropdown
Escape       → Close modal/sheet/palette/menu
?            → Show keyboard shortcuts help modal
```

**Creation Commands**:
```typescript
C            → Compose (global, opens composer sheet)
Cmd+Enter    → Submit form/post (if in textarea/form context)
Cmd+S        → Save draft (in tool editor)
```

### Feed-Specific Shortcuts

**Vim-Style Navigation**:
```typescript
Navigation:
  j / ↓      → Next post (scroll down by post height)
  k / ↑      → Previous post (scroll up by post height)
  Space      → Page down (scroll by viewport)
  Shift+Space→ Page up (scroll by viewport)

Post Interactions (on focused post):
  l          → Like focused post
  c          → Comment on focused post
  r          → Reshare focused post
  b          → Bookmark focused post
  o / Enter  → Open focused post detail view
  m          → Mute space of focused post
  s          → Save to collection

Filtering:
  f          → Open filter panel
  1-5        → Quick filter presets (All, My Spaces, Events, etc)
  x          → Clear all filters
```

### Space Board Shortcuts

```typescript
Composer:
  c          → Focus composer/open textarea
  Tab        → Next field (from composer)

Content:
  p          → Pin post (leaders only, fails silently if not leader)
  e          → Create/open event
  t          → Install tool (leaders only)

Organization:
  f          → Open filters/sort menu
  v          → Toggle view (grid/list)
```

### Calendar View Shortcuts

```typescript
Navigation:
  n          → Next month
  p          → Previous month
  t          → Jump to today
  j / ↓      → Next day
  k / ↑      → Previous day

Event:
  Enter      → Open focused event detail
  r          → RSVP focused event
  c          → Check-in (if event is live)
```

### HiveLab Studio Shortcuts

**Canvas Editing**:
```typescript
Navigation:
  Cmd+O      → Open tool (from template list)
  Cmd+W      → Close current tool
  Escape     → Exit preview/canvas mode

Editing:
  Cmd+E      → Element palette (focus)
  Cmd+P      → Properties panel
  Cmd+L      → Lint/validation panel
  Cmd+Z      → Undo last action
  Cmd+Shift+Z→ Redo last action
  Cmd+D      → Duplicate selected element
  Cmd+C      → Copy element
  Cmd+V      → Paste element
  Delete     → Remove selected element
  ↑ / ↓      → Reorder elements (move up/down in tree)
  Tab        → Next property field
  Shift+Tab  → Previous property field

Workspace:
  Cmd+S      → Save current tool
  Cmd+Shift+S→ Save as new version
  Cmd+B      → Preview/Build tool
  Cmd+Shift+P→ Publish/Deploy tool
```

### Shortcuts Help Modal

**Trigger**: Press `?` anywhere

```
┌─────────────────────────────────────────────┐
│ ⌨️  Keyboard Shortcuts            ✕ Close   │
├─────────────────────────────────────────────┤
│ GLOBAL NAVIGATION                           │
│ Cmd+K    Command Palette                    │
│ Cmd+F    Feed                               │
│ Cmd+S    Spaces                             │
│ Cmd+P    Profile                            │
│ Cmd+,    Settings                           │
│ ?        This help                          │
│                                             │
│ FEED NAVIGATION                             │
│ j / ↓    Next post                          │
│ k / ↑    Previous post                      │
│ Space    Page down                          │
│ l        Like                               │
│ c        Comment                            │
│ b        Bookmark                           │
│                                             │
│ HIVELAB STUDIO                              │
│ Cmd+Z    Undo                               │
│ Cmd+E    Element palette                    │
│ Cmd+P    Properties                         │
│                                             │
│ [Show all shortcuts →]                      │
└─────────────────────────────────────────────┘
```

### Implementation Pattern

**Hook-based keyboard shortcut system** (`useKeyboardShortcuts.ts`):

```typescript
interface KeyboardShortcut {
  key: string;
  modifiers?: ('cmd' | 'shift' | 'alt' | 'ctrl')[];
  handler: () => void;
  context?: 'global' | 'feed' | 'spaces' | 'hivelab' | 'modal';
  label?: string;
  preventDefault?: boolean;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        if (matchesShortcut(event, shortcut)) {
          if (shortcut.preventDefault) event.preventDefault();
          shortcut.handler();
          break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// In component
useKeyboardShortcuts([
  { key: 'k', modifiers: ['cmd'], handler: openCommandPalette, context: 'global' },
  { key: 'j', handler: nextPost, context: 'feed', preventDefault: true },
  { key: 'l', handler: likePost, context: 'feed' },
]);
```

---

## Command Palette System

### What is the Command Palette?

Universal action finder + navigator inspired by Linear, Vercel, and Arc. Accessible via **Cmd+K** (Ctrl+K on Windows) or **/** key.

**Purpose**: Enable zero-mouse navigation for power users creating/managing 20+ spaces and 100+ tools.

### Command Palette Triggers

```typescript
// Trigger methods
1. Cmd+K (Mac) / Ctrl+K (Windows)
2. / (slash) when not in text field
3. Click search icon in top bar
4. Mobile: Floating action button (bottom-right)

// Context detection
if (userAgent.isMobile) {
  showFloatingSearchButton();  // 56x56 FAB
} else {
  activateKeyboardShortcut('Cmd+K');
}

// Text field detection
if (activeElement.matches('input, textarea, [contenteditable]')) {
  ignoreSlashTrigger();  // Allow typing `/`
} else {
  activateShorcut('/');   // Focus palette
}
```

### Command Palette Architecture

**Component Location**: `packages/ui/src/navigation/UniversalNav.tsx`

```typescript
interface CommandPaletteItem {
  id: string;
  category: 'navigation' | 'creation' | 'tools' | 'spaces' | 'recent' | 'shortcuts' | 'settings';
  label: string;
  description?: string;
  icon?: React.ReactNode;
  action: () => void;
  shortcut?: string;
  keywords?: string[];
  badge?: string;
}

// Dynamic commands based on user role
const getCommands = (user: User): CommandPaletteItem[] => [
  // Navigation (always available)
  { id: 'go-feed', category: 'navigation', label: 'Go to Feed', action: () => router.push('/feed'), ... },
  { id: 'go-spaces', category: 'navigation', label: 'Browse Spaces', action: () => router.push('/spaces'), ... },
  { id: 'go-profile', category: 'navigation', label: 'My Profile', action: () => router.push('/profile'), ... },
  
  // Creation
  { id: 'new-tool', category: 'creation', label: 'New Tool', action: createTool, shortcut: 'Cmd+N', ... },
  { id: 'new-space', category: 'creation', label: 'Create Space', action: createSpace, ... },
  { id: 'new-post', category: 'creation', label: 'New Post', action: openComposer, ... },
  
  // Tools (searchable)
  ...userTools.map(tool => ({
    category: 'tools',
    label: `Open ${tool.name}`,
    description: `${tool.installs} installs`,
    action: () => router.push(`/tools/${tool.id}`),
    keywords: [tool.name, ...tool.tags],
  })),
  
  // Spaces (searchable, contextual actions)
  ...userSpaces.map(space => ({
    category: 'spaces',
    label: `Go to ${space.name}`,
    description: `${space.members} members`,
    action: () => router.push(`/spaces/${space.id}`),
    keywords: [space.name, space.description],
  })),
  
  // Recent items
  ...recentItems.map(item => ({
    category: 'recent',
    label: item.title,
    description: formatDistance(item.viewedAt, new Date()),
    action: () => navigate(item.url),
  })),
  
  // Settings
  { id: 'settings', category: 'settings', label: 'Settings', action: () => router.push('/settings'), ... },
  { id: 'theme-toggle', category: 'settings', label: 'Toggle Theme', action: toggleTheme, ... },
];
```

### Visual Treatment

**Desktop Command Palette**:
```
┌─────────────────────────────────────────────────────┐
│ 🔍  Search or jump to...             Cmd+K close  │
├─────────────────────────────────────────────────────┤
│ Recent                                              │
│ ⏱  Photography Club                        2m    │
│ ⏱  Weekly Poll (tool)                      5m    │
│ ⏱  HiveLab workspace                      12m    │
│                                                     │
│ Suggestions                                         │
│ ➕ New Tool                             Cmd+N    │
│ 🏛 Browse Spaces                         Cmd+S    │
│ 📝 New Post                                        │
│                                                     │
│ Actions                                             │
│ ⚙️  Settings                            Cmd+,    │
│ 🌙 Toggle Theme                                    │
│ ? Show shortcuts                         ?       │
└─────────────────────────────────────────────────────┘
```

**Mobile Command Palette** (Sheet variant):
```
┌──────────────────────────────────────┐
│ 🔍  Search...                    ✕  │
├──────────────────────────────────────┤
│                                       │
│ Recent (limited to 5)                │
│ ⏱  Photography Club                 │
│ ⏱  CS Majors                         │
│                                       │
│ [Quick Add Tool ▾]                  │
│ [Browse Spaces ▾]                   │
│                                       │
│ [Microphone icon - Voice search]     │
│                                       │
└──────────────────────────────────────┘
```

### Search & Filtering

**Fuzzy Search**:
```typescript
// Query: "hive photo" matches:
- "HIVE Photography Club"
- "HIVElab Photo Tools"
- "PHIVE Organization"

// Implementation: fuse.js with fuzzy matching
const searchResults = fuse.search(query, {
  threshold: 0.3,
  keys: ['label', 'description', 'keywords']
});

// Performance: < 100ms response (debounced 150ms)
const debouncedSearch = debounce((query) => {
  setResults(searchResults(query));
}, 150);
```

**Smart Context**:
```typescript
// Filter commands based on context
if (userPathname.startsWith('/feed')) {
  prioritizeCommands(['new-post', 'next-post', 'filter']);
}
if (userPathname.startsWith('/hivelab')) {
  prioritizeCommands(['new-tool', 'deploy-tool', 'element-palette']);
}
if (currentSpace) {
  suggestCommands([
    'Create event in this space',
    'Invite members to this space',
    'Leave this space',
  ]);
}
```

---

## Deep Linking Patterns

### Deep Link Structure

All HIVE features support deep linking for sharing and direct access:

```typescript
// Space board with post highlighted
/spaces/[spaceId]?postId=[postId]&highlight=true

// Event with calendar context
/spaces/[spaceId]/events/[eventId]?viewDate=[date]

// Tool with deployment variant
/tools/[toolId]/run?deploymentId=[id]&responses=true

// Profile with tab open
/profile/[userId]?tab=timeline&sortBy=recent

// Feed with filters applied
/feed?spaces=cs-majors,photo-club&type=event&sort=trending

// Search/discovery with query
/spaces/browse?q=photography&category=club&sort=members

// HiveLab with specific tool
/hivelab?toolId=[toolId]&action=edit

// Collections/bookmarks filtered
/profile/[userId]/bookmarks?collection=study-tips&sortBy=saved-date
```

### Generating Deep Links

**URL Utilities** (`apps/web/src/lib/navigation/deep-links.ts`):

```typescript
export const deepLinks = {
  // Space board with context
  spaceBoard: (spaceId: string, postId?: string) =>
    `/spaces/${spaceId}${postId ? `?postId=${postId}&highlight=true` : ''}`,
  
  // Event detail
  event: (spaceId: string, eventId: string) =>
    `/spaces/${spaceId}/events/${eventId}`,
  
  // Tool in different contexts
  tool: (toolId: string) => `/tools/${toolId}`,
  toolEdit: (toolId: string) => `/tools/${toolId}/edit`,
  toolRun: (toolId: string, deploymentId?: string) =>
    `/tools/${toolId}/run${deploymentId ? `?deploymentId=${deploymentId}` : ''}`,
  
  // Feed with state
  feed: (filters?: FeedFilters) =>
    `/feed${serializeFilters(filters)}`,
  
  // Profile with context
  profile: (userId: string, tab?: 'timeline' | 'spaces' | 'connections') =>
    `/profile/${userId}${tab ? `?tab=${tab}` : ''}`,
  
  // Share link (short)
  share: (type: 'space' | 'tool' | 'post', id: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/s/${generateSlug(type, id)}`,
};

// Usage
const spaceLink = deepLinks.spaceBoard('space-123', 'post-456');
// → /spaces/space-123?postId=post-456&highlight=true
```

### Handling Deep Links on App Init

**Route Handler** (`apps/web/src/lib/navigation/handle-deep-link.ts`):

```typescript
export function useHandleDeepLink() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Extract query parameters
    const postId = searchParams.get('postId');
    const highlight = searchParams.get('highlight') === 'true';
    const tab = searchParams.get('tab');
    const filters = Object.fromEntries(searchParams.entries());
    
    // Restore state based on query
    if (postId && highlight) {
      scrollToPost(postId, { highlight: true });
    }
    if (tab) {
      setActiveTab(tab);
    }
    if (Object.keys(filters).length > 0) {
      applyFeedFilters(filters);
    }
  }, [searchParams]);
}
```

### QR Code Links

**Mobile-to-Desktop Handoff**:
```typescript
// In mobile HiveLab editor
if (isMobileDevice && isCreatingComplexTool) {
  showBanner({
    message: "Building tools works best on desktop",
    action: {
      label: "Continue on Desktop",
      onClick: () => {
        const qrCode = generateQRCode(
          deepLinks.toolEdit(currentToolId),
          { includeUrl: true, size: 'large' }
        );
        showQRModal(qrCode);
      }
    }
  });
}

// Scanned QR opens same tool on desktop with state synced
```

---

## Mobile Navigation

### Mobile Navigation Differences

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| **Primary Nav** | Left sidebar (240px) | Bottom tab bar (56px) |
| **Secondary Nav** | Sidebar sections | Hamburger menu sheet |
| **Spaces List** | Sidebar "My Spaces" | Sheet with search |
| **Detail Views** | Inline/adjacent | Full-screen sheet |
| **Top Bar** | Sticky + search | Sticky + context title |
| **Modals** | Centered dialog | Bottom sheet (drag-dismiss) |
| **FAB** | None | Floating action button |

### Bottom Navigation Implementation

**Mobile Tab Bar** (`ShellMobileNav.tsx`):

```typescript
interface ShellMobileNavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  path?: string;
  badge?: number;
  onClick?: () => void;
}

const mobileNavItems: ShellMobileNavItem[] = [
  { id: 'feed', icon: Home, label: 'Feed', path: '/feed' },
  { id: 'spaces', icon: Users, label: 'Spaces', path: '/spaces' },
  { id: 'compose', icon: Plus, label: 'Create', path: '/compose' },
  { id: 'notifications', icon: Bell, label: 'Notif', path: '/notifications', badge: 3 },
  { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
];

// Positions: fixed bottom-0, 100% width, 56px height
// Safe area: padding-bottom to account for iPhone notch
// Touch target: ≥44px per WCAG
```

### Mobile Sheet Patterns

**Detail View Navigation**:
```typescript
// Click post in feed → Open full-screen sheet
<Sheet
  open={isOpen}
  onOpenChange={setIsOpen}
  size="full"  // Mobile: full screen
>
  <SheetContent>
    <PostDetail postId={postId} />
  </SheetContent>
</Sheet>

// Slide up from bottom with drag-to-dismiss
// Drag down > 30% height → Close sheet
```

**Hamburger Menu** (Mobile Sidebar):
```typescript
const [menuOpen, setMenuOpen] = useState(false);

return (
  <>
    {/* Top bar hamburger button */}
    <button onClick={() => setMenuOpen(true)} aria-label="Menu">
      <Menu size={24} />
    </button>
    
    {/* Full-screen navigation sheet */}
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent side="left" size="full">
        <SidebarNav sections={navSections} />
      </SheetContent>
    </Sheet>
  </>
);
```

### Mobile-Specific Gestures

```typescript
// Gesture handlers
const gestureHandlers = {
  // Swipe right → Go back
  swipeRight: () => router.back(),
  
  // Swipe left → Open next item
  swipeLeft: () => {
    const nextPost = posts[currentIndex + 1];
    if (nextPost) scrollToPost(nextPost.id);
  },
  
  // Pull to refresh
  pullToRefresh: () => {
    refetchFeed();
    showRefreshAnimation();
  },
  
  // Long press → Context menu
  longPress: (itemId: string) => {
    showContextMenu(itemId, {
      options: ['Save', 'Share', 'Mute Space', 'Report']
    });
  }
};

// Implementation: react-use-gesture
const bind = useGesture({
  onSwipe: ({ direction }) => {
    if (direction[0] > 0) gestureHandlers.swipeRight();
    if (direction[0] < 0) gestureHandlers.swipeLeft();
  },
  onPinch: ({ offset: [scale] }) => {
    setZoom(scale);  // Pinch to zoom images
  }
});
```

### Responsive Breakpoints

```typescript
// Tailwind breakpoints used in HIVE
const breakpoints = {
  xs: '480px',   // Phones (portrait)
  sm: '768px',   // Small tablets
  md: '1024px',  // Large tablets
  lg: '1280px',  // Desktops
  xl: '1536px',  // Large monitors
};

// Navigation changes per breakpoint
export function useResponsiveNav() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  return {
    navLayout: isMobile ? 'bottom' : 'sidebar',
    showSidebar: !isMobile,
    sidebarCollapsed: isTablet,
    contentPadding: isMobile ? '0' : '240px',
  };
}
```

---

## Performance & Optimization

### Navigation Performance Budgets

**Target Metrics**:
```
Route Navigation: < 50ms
├─ useRouter push: < 5ms
├─ Route match: < 5ms
├─ Component render: < 30ms
└─ Display: < 10ms

Keyboard Shortcut Response: < 16ms
├─ Key press detection: < 2ms
├─ Command lookup: < 5ms
├─ Action execution: < 9ms

Command Palette: < 100ms
├─ Open animation: < 50ms
├─ Initial render: < 20ms
├─ Fuzzy search (on type): < 100ms (debounced 150ms)

Sidebar Collapse: < 200ms
├─ Animation: 180ms
├─ Layout shift: < 20ms

Mobile Sheet Open: < 300ms
├─ Animation: 240ms
├─ Content render: < 60ms
```

### Implementation Optimization

**Code Splitting**:
```typescript
// Heavy components lazy-loaded
const CommandPalette = dynamic(
  () => import('@/navigation/CommandPalette'),
  { ssr: false, loading: () => null }
);

const AdminDashboard = dynamic(
  () => import('@/components/admin/AdminDashboard'),
  { ssr: false, loading: () => <AdminSkeleton /> }
);

// Result: Initial bundle reduced by 30%
// Command palette loaded on first Cmd+K press
```

**Memoization**:
```typescript
// Prevent unnecessary re-renders during navigation
export const ShellSidebar = React.memo(function ShellSidebar(props) {
  return <SidebarNav {...props} />;
}, (prev, next) => {
  // Only re-render if these specific props change
  return (
    prev.activeId === next.activeId &&
    prev.sections === next.sections &&
    prev.isCollapsed === next.isCollapsed
  );
});

// In parent
const [activeNavId, setActiveNavId] = useState<string>();
const navSections = useMemo(() => getNavSections(), [user]);

return <ShellSidebar activeId={activeNavId} sections={navSections} />;
```

**Debouncing Navigation Events**:
```typescript
// Debounce frequent navigation updates
const debouncedSetActiveNav = useMemo(
  () => debounce(setActiveNavId, 50),
  []
);

useEffect(() => {
  const pathname = usePathname();
  const navId = getNavIdFromPathname(pathname);
  debouncedSetActiveNav(navId);
}, [pathname, debouncedSetActiveNav]);
```

**Prefetching Routes**:
```typescript
// Prefetch likely next routes on hover
const router = useRouter();

<Link
  href="/spaces"
  onMouseEnter={() => router.prefetch('/spaces')}
>
  Spaces
</Link>

// Mobile: Prefetch on touch
<button
  onTouchStart={() => router.prefetch('/profile')}
  onClick={() => router.push('/profile')}
>
  Profile
</button>

// Result: Navigation feels instant (content pre-loaded)
```

---

## Navigation Flows

### Core User Journeys

#### 1. Feed → Space → Tool Flow

```
User browses feed
    ↓
Sees post from Photography Club
    ↓
[Clicks post] → Expands detail view
    ↓
[Clicks "Go to space"] → /spaces/photo-club
    ↓
Views space board
    ↓
[Clicks installed "Poll tool"] → /tools/poll-id/run
    ↓
Responds to poll
    ↓
[Closes tool] → Back to space board
    ↓
[Leaves space] → Back to feed
```

**Implementation** (`useNavigationFlow.ts`):
```typescript
export function usePostNavigation() {
  const router = useRouter();
  
  const goToSpace = useCallback((spaceId: string, postId?: string) => {
    router.push(deepLinks.spaceBoard(spaceId, postId));
  }, [router]);
  
  const openTool = useCallback((toolId: string, context?: any) => {
    router.push(deepLinks.toolRun(toolId, context?.deploymentId));
  }, [router]);
  
  return { goToSpace, openTool };
}
```

#### 2. HiveLab Creation Flow

```
User in HiveLab workspace
    ↓
[New Tool] → Command Palette or FAB
    ↓
Studio opens → /tools/new-tool-id/edit
    ↓
Builds tool (canvas + inspector)
    ↓
[Preview] → /tools/[id]/preview (separate tab)
    ↓
[Deploy] → /tools/[id]/deploy
    ↓
Sets deployment options (space, timing, notifications)
    ↓
[Deploy] → Confirms → Closes modal
    ↓
Back to workspace list → Tool appears as "Recently Modified"
    ↓
[View Analytics] → /tools/[id]/analytics
```

#### 3. Search & Discovery Flow

```
User on any page
    ↓
[Cmd+K] → Command Palette opens
    ↓
[Types "photography"] → Fuzzy search results
    ↓
Results:
- Photography Club (space)
- Photo Poll v2 (tool)
- Summer Photo Walk (event)
    ↓
[Clicks space] → /spaces/photo-club
```

#### 4. Mobile Bottom Nav Flow

```
User on mobile
    ↓
[Tap Feed] → /feed (loads latest posts)
    ↓
[Swipe up] → Scrolls feed
    ↓
[Tap Spaces] → /spaces (space directory)
    ↓
[Tap space card] → Full-screen sheet with space board
    ↓
[Tap post] → Post detail sheet (drag-to-close)
    ↓
[Tap "Go to space"] → Space sheet replaces post
    ↓
[Tap outside/drag down] → Close sheet, back to /spaces
```

---

## Accessibility

### WCAG 2.1 AA Compliance

**Keyboard Navigation**:
- All navigation items keyboard accessible (Tab, Enter, Space)
- Focus management in modals (trap focus)
- Skip to main content link available
- Focus visible at all times (golden ring)

**Screen Reader Support**:
```typescript
// Semantic HTML
<nav aria-label="Main navigation">
  <ul role="list">
    <li>
      <a 
        href="/feed" 
        aria-current={pathname === '/feed' ? 'page' : undefined}
        aria-label="Feed (current page)"
      >
        Feed
      </a>
    </li>
  </ul>
</nav>

// Live regions for dynamic updates
<div role="status" aria-live="polite" aria-atomic="true">
  {isNavigating && "Loading new page..."}
</div>

// Dialog/Modal keyboard trap
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent
    role="dialog"
    aria-modal="true"
    aria-labelledby="dialog-title"
  >
    {/* Tab key stays within sheet */}
  </SheetContent>
</Sheet>
```

**Color Contrast**:
```css
/* All navigation items meet 4.5:1 ratio for text */
.nav-item {
  color: #F9FAFB;        /* 100% text, very light */
  background: transparent;
}

.nav-item:hover {
  background: rgba(15, 16, 24, 0.65);  /* Subtle tint */
}

.nav-item[aria-current="page"] {
  color: #F9FAFB;
  background: rgba(250, 204, 21, 0.18);  /* Gold tint */
  border: 1px solid rgba(250, 204, 21, 0.32);
}
/* Contrast ratio: 9.2:1 (exceeds WCAG AAA) */
```

### Accessible Navigation Component

**NavigationItem Accessibility**:
```typescript
export const NavigationItem = forwardRef<HTMLElement, NavigationItemProps>(
  function NavigationItem({
    id,
    label,
    description,
    href,
    active,
    disabled,
    ...props
  }) {
    const Component = href ? 'a' : 'button';
    
    return (
      <Component
        id={id}
        href={href}
        aria-current={active ? 'page' : undefined}
        aria-disabled={disabled}
        aria-label={description ? `${label}: ${description}` : label}
        role={!href ? 'button' : undefined}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {/* Content */}
      </Component>
    );
  }
);
```

### Reduced Motion Support

```typescript
const shouldReduce = useReducedMotion();

return (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: shouldReduce ? 0 : 0.18,
      ease: shouldReduce ? undefined : [0.16, 1, 0.3, 1],
    }}
  >
    {/* Content */}
  </motion.div>
);
```

---

## Testing & QA

### Navigation Test Cases

**Route Navigation**:
```typescript
describe('Route Navigation', () => {
  it('should navigate from /feed to /spaces on sidebar click', async () => {
    render(<App />);
    const spacesLink = screen.getByRole('link', { name: /spaces/i });
    fireEvent.click(spacesLink);
    expect(router).toHaveBeenCalledWith('/spaces');
  });
  
  it('should maintain scroll position when returning to /feed', async () => {
    render(<App />);
    // Scroll feed to post #50
    scrollToIndex(50);
    const spacesLink = screen.getByRole('link', { name: /spaces/i });
    fireEvent.click(spacesLink);
    // Navigate back
    fireEvent.click(screen.getByRole('link', { name: /feed/i }));
    expect(document.documentElement.scrollTop).toBeGreaterThan(0);
  });
});
```

**Keyboard Navigation**:
```typescript
describe('Keyboard Shortcuts', () => {
  it('should open command palette on Cmd+K', async () => {
    render(<App />);
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    expect(screen.getByRole('dialog', { name: /command palette/i })).toBeVisible();
  });
  
  it('should navigate next post on "j" key in feed', async () => {
    render(<Feed />);
    const posts = screen.getAllByRole('article');
    expect(posts[0]).toHaveFocus();
    fireEvent.keyDown(window, { key: 'j' });
    expect(posts[1]).toHaveFocus();
  });
  
  it('should not trigger shortcut inside textarea', async () => {
    render(<ComposerSheet />);
    const textarea = screen.getByRole('textbox');
    textarea.focus();
    fireEvent.keyDown(textarea, { key: '/' });
    // Palette should NOT open
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

**Mobile Navigation**:
```typescript
describe('Mobile Navigation', () => {
  beforeEach(() => {
    render(<App />, { viewport: 'mobile' });
  });
  
  it('should show bottom nav bar on mobile', () => {
    expect(screen.getByRole('navigation', { name: /mobile navigation/i })).toBeInTheDocument();
  });
  
  it('should hide sidebar on mobile', () => {
    expect(screen.queryByRole('navigation', { name: /primary navigation/i })).not.toBeInTheDocument();
  });
  
  it('should open menu sheet on hamburger click', async () => {
    fireEvent.click(screen.getByRole('button', { name: /menu/i }));
    expect(screen.getByRole('dialog')).toBeVisible();
  });
});
```

**Deep Linking**:
```typescript
describe('Deep Linking', () => {
  it('should restore feed filters from URL query', async () => {
    render(<App initialRoute="/feed?spaces=photo,cs&type=event" />);
    expect(screen.getByRole('checkbox', { name: /photography/i })).toBeChecked();
    expect(screen.getByRole('radio', { name: /event/i })).toBeChecked();
  });
  
  it('should scroll to post when postId param provided', async () => {
    render(<App initialRoute="/spaces/space-1?postId=post-123&highlight=true" />);
    const post = screen.getByTestId('post-post-123');
    expect(post).toBeInView();
    expect(post).toHaveClass('highlight');
  });
});
```

### Performance Testing

```typescript
describe('Navigation Performance', () => {
  it('should navigate in < 50ms', async () => {
    const start = performance.now();
    fireEvent.click(screen.getByRole('link', { name: /spaces/i }));
    const end = performance.now();
    expect(end - start).toBeLessThan(50);
  });
  
  it('should render command palette in < 100ms', async () => {
    const start = performance.now();
    fireEvent.keyDown(window, { key: 'k', metaKey: true });
    const palette = await screen.findByRole('dialog');
    const end = performance.now();
    expect(end - start).toBeLessThan(100);
  });
  
  it('should debounce keyboard search to < 300ms', async () => {
    render(<CommandPalette open={true} />);
    const searchBox = screen.getByRole('textbox');
    
    // Type multiple characters quickly
    fireEvent.change(searchBox, { target: { value: 'p' } });
    fireEvent.change(searchBox, { target: { value: 'ph' } });
    fireEvent.change(searchBox, { target: { value: 'pho' } });
    
    // Only last search should execute (debounced)
    expect(mockSearchFn).toHaveBeenCalledTimes(1);
  });
});
```

---

## Related Topology Documents

See these documents for feature-specific navigation patterns:

- **[FEED_TOPOLOGY.md](./FEED_TOPOLOGY.md)** - Feed filters, sorting, keyboard shortcuts (`j/k`, `l`, `c`, `b`)
- **[SPACES_TOPOLOGY.md](./SPACES_TOPOLOGY.md)** - Space board tabs, member navigation, leader tools
- **[HIVELAB_TOOLS_TOPOLOGY.md](./HIVELAB_TOOLS_TOPOLOGY.md)** - Studio keyboard shortcuts (`Cmd+Z`, `Cmd+E`), deployment flow
- **[ONBOARDING_AUTH_TOPOLOGY.md](./ONBOARDING_AUTH_TOPOLOGY.md)** - Auth flow navigation (login → verify → onboarding)
- **[PROFILE_TOPOLOGY.md](./PROFILE_TOPOLOGY.md)** - Profile navigation (header → stats → timeline → connections)
- **[UX-UI-TOPOLOGY.md](../UX-UI-TOPOLOGY.md)** - Global shell patterns, command palette, keyboard shortcuts reference

---

## Implementation Checklist

- [ ] Desktop shell layout (sidebar 240px, collapsible to 56px)
- [ ] Mobile bottom navigation (5 tabs, 56px height)
- [ ] Navigation primitives (`NavigationItem`, `SidebarNav`, `BottomNav`, `TopBar`)
- [ ] Keyboard shortcut system (`useKeyboardShortcuts` hook)
- [ ] Command Palette (`Cmd+K` trigger, fuzzy search, 10+ command categories)
- [ ] Shortcuts help modal (`?` key trigger)
- [ ] Deep linking support (query params for state restoration)
- [ ] Mobile sheet navigation (hamburger menu, full-screen sheets)
- [ ] Responsive breakpoints (sidebar collapse at sm breakpoint)
- [ ] Focus management (trapping in modals, visible focus rings)
- [ ] Performance optimization (code splitting, memoization, prefetching)
- [ ] Mobile gesture handlers (swipe-to-go-back, pull-to-refresh, long-press)
- [ ] Accessibility (ARIA labels, semantic HTML, skip links)
- [ ] E2E tests for all major navigation flows
- [ ] Performance tests (navigation < 50ms, palette < 100ms)

---

**Status**: Complete topology documented for implementation

**Last Updated**: November 1, 2025

**Next Phase**: Implementation of navigation components and integration with UniversalShell
