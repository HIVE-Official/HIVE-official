# HIVE Pages & Layouts Map (Top-Down)

**Purpose**: Map every page → layout → organisms → molecules to know exactly what to build

**Approach**: Top-down (user experience first, components second)

**Last Updated**: October 2025

---

## Methodology

### Top-Down Design Process
```
1. Define Pages (user-facing routes)
2. Design Layouts (page structure)
3. Identify Organisms (feature blocks in layout)
4. List Molecules (components in organisms)
5. Verify Atoms (primitives needed)
```

**Why top-down?**
- Know what users actually see
- Avoid building unused components
- Design for real use cases
- Ensure complete coverage

---

## The 4 Core Pages (Primary Navigation)

### 1. Feed Page (`/feed`)
### 2. Spaces Pages (`/spaces/*`)
### 3. Profile Pages (`/profile/*`)
### 4. HiveLab Pages (`/hivelab/*`)

---

## 1. Feed Page (`/feed`)

### User Experience
**Goal**: Discover campus content, engage with posts, check rituals

**Core Loop**: Open → See feed → React/comment → Come back

### Page Hierarchy
```
NavigationShell (Organism - app wrapper)
└── FeedLayout (Template)
    ├── RitualsStrip (Organism) - Campus behavioral campaigns
    │   └── RitualCard[] (Molecule)
    │       ├── Card (Atom)
    │       ├── Progress (Atom)
    │       ├── Badge (Atom)
    │       └── Button (Atom)
    │
    ├── FeedFilters (Molecule) - Filter content
    │   └── Tabs + Badge (Atoms)
    │
    └── FeedStream (Organism) - Post list
        ├── FeedPostCard[] (Molecule) ← PRIMARY COMPONENT
        │   ├── Card (Atom)
        │   ├── Avatar (Atom)
        │   ├── Badge (Atom - space attribution)
        │   ├── Button[] (Atom - react/comment/share)
        │   └── PhotoCarousel (Molecule - if media)
        │
        ├── FeedEventCard[] (Molecule) - Event promotions
        │   ├── Card (Atom)
        │   ├── Badge (Atom - urgency color)
        │   ├── AvatarStack (Molecule - friends going)
        │   └── Button[] (Atom - Going/Interested)
        │
        └── FeedComposer (Organism - create post)
            ├── Dialog (Atom - modal)
            ├── Textarea (Atom)
            ├── InlineToolMenu (Molecule)
            └── Button (Atom)
```

### Layout: FeedLayout
**File**: `packages/ui/src/atomic/templates/feed-layout.tsx` (needs creation)

**Structure**:
```tsx
<FeedLayout>
  {/* Sticky top: Rituals */}
  <RitualsStrip position="sticky" />

  {/* Filters */}
  <FeedFilters activeFilter="all" />

  {/* Main content */}
  <FeedStream>
    {posts.map(post => (
      post.type === 'event'
        ? <FeedEventCard {...post} />
        : <FeedPostCard {...post} />
    ))}
  </FeedStream>
</FeedLayout>
```

### Organisms Needed
1. **RitualsStrip** - Horizontal scroll of ritual cards
2. **FeedStream** - Infinite scroll post container
3. **FeedComposer** - Modal post creation

### Molecules Needed (Priority Order)
1. **FeedPostCard** ⭐ (highest priority - core loop)
2. **FeedEventCard** ⭐
3. **RitualCard** ⭐
4. **FeedFilters**
5. **PhotoCarousel** (for posts with images)
6. **InlineToolMenu** (for composer)
7. **CommentCard** (for post detail/thread view)

### Missing Atoms
✅ All atoms exist (Phase 1 complete)

---

## 2. Spaces Pages

### 2a. Spaces Discovery (`/spaces` or `/spaces/discover`)

#### User Experience
**Goal**: Find new spaces to join, browse by category

#### Page Hierarchy
```
NavigationShell
└── SpacesDiscoveryLayout (Template)
    ├── SearchBar (Molecule) - Search spaces
    │   ├── Input (Atom)
    │   └── Dropdown (Atom)
    │
    ├── CategoryTabs (Molecule) - Filter by category
    │   └── Tabs + Badge (Atoms)
    │
    └── SpaceGrid (Organism)
        └── DiscoverableSpaceCard[] (Molecule) ← PRIMARY
            ├── Card (Atom)
            ├── Badge[] (Atom - category, trending)
            ├── StatCard[] (Molecule - members, posts)
            ├── AvatarStack (Molecule - friends in space)
            └── Button (Atom - Join)
```

#### Layout: SpacesDiscoveryLayout
**File**: `packages/ui/src/atomic/templates/spaces-discovery-layout.tsx` (needs creation)

#### Molecules Needed
1. **DiscoverableSpaceCard** ⭐ (with social proof)
2. **SearchBar**
3. **CategoryTabs**
4. **StatCard** (reusable across domains)
5. **AvatarStack** (reusable - shows friends)

---

### 2b. My Spaces (`/spaces/joined`)

#### User Experience
**Goal**: Quick access to joined spaces, see unread activity

#### Page Hierarchy
```
NavigationShell
└── MySpacesLayout (Template)
    ├── QuickActions (Molecule)
    │   └── Button[] (Atom - Create, Manage)
    │
    └── SpaceGrid (Organism)
        └── JoinedSpaceCard[] (Molecule) ← PRIMARY
            ├── Card (Atom)
            ├── Badge (Atom - unread indicator)
            ├── Text (Atom - "3 friends posted today")
            └── Button (Atom - View)
```

#### Molecules Needed
1. **JoinedSpaceCard** ⭐
2. **QuickActions**

---

### 2c. Space Detail (`/spaces/[spaceId]`)

#### User Experience
**Goal**: View space content, participate, see events/members

#### Page Hierarchy
```
NavigationShell
└── SpaceLayout (Template) ← EXISTS!
    ├── SpaceHeader (Organism)
    │   ├── CoverImage
    │   ├── SpaceIdentity (name, handle, badges)
    │   ├── StatCard[] (Molecule - members, posts)
    │   └── Button[] (Atom - Join/Leave/Manage)
    │
    ├── SpaceNavigation (Molecule)
    │   └── Tabs (Atom - Posts/Events/About/Members)
    │
    ├── SpaceLeaderToolbar (Organism - if user is leader)
    │   └── Button[] (Atom - Manage, Analytics, Settings)
    │
    └── SpaceContent (60/40 split)
        ├── MainFeed (60% - Left)
        │   ├── SpaceComposer (Organism)
        │   │   ├── SpaceComposerWithTools (Molecule) ← PRIMARY
        │   │   │   ├── Textarea (Atom)
        │   │   │   ├── InlineToolMenu (Molecule)
        │   │   │   ├── QuickActionButtons (Molecule)
        │   │   │   └── Button (Atom - Send)
        │   │   └── Dialog (Atom - expanded composer)
        │   │
        │   └── SpacePostFeed (Organism)
        │       └── FeedPostCard[] (Molecule - REUSE from feed!)
        │
        └── Sidebar (40% - Right)
            ├── FriendsInSpace (Organism) - Priority #1
            │   ├── AvatarStack (Molecule)
            │   └── Text (Atom)
            │
            ├── SpaceEventsPanel (Organism)
            │   └── EventCard[] (Molecule) ← PRIMARY
            │       ├── Card (Atom)
            │       ├── Badge (Atom - urgency)
            │       ├── AvatarStack (Molecule - who's going)
            │       └── Button[] (Atom - Going/Interested)
            │
            ├── SpaceMembersPanel (Organism)
            │   └── MemberCard[] (Molecule)
            │       ├── Avatar (Atom)
            │       ├── Badge (Atom - role, mutual)
            │       ├── OnlineIndicator (Atom)
            │       └── Button (Atom - View profile)
            │
            ├── SpaceResourcesPanel (Organism)
            │   └── ResourceCard[] (Molecule)
            │       ├── Card (Atom)
            │       ├── Badge (Atom - type)
            │       └── Button (Atom - Open)
            │
            └── SpaceAboutSection (Organism - collapsible)
                ├── Text (Atom - description)
                ├── Badge[] (Atom - tags)
                └── Button (Atom - Expand/Collapse)
```

#### Layout: SpaceLayout
**File**: `packages/ui/src/atomic/templates/space-layout.tsx` ✅ EXISTS

**Current Implementation**:
```tsx
// Check current state
<SpaceLayout>
  {/* 60% Main feed */}
  <MainContent>
    <SpacePostFeed />
  </MainContent>

  {/* 40% Sidebar */}
  <Sidebar>
    <SpaceAboutSection />
    <SpaceEventsPanel />
    <SpaceResourcesPanel />
    <SpaceMembersPanel />
  </Sidebar>
</SpaceLayout>
```

**Needed Changes** (from SPACES_IA_UX_AUDIT.md):
1. Reorder sidebar: Friends → Events → Members → Resources → About
2. Add FriendsInSpace at top
3. Add SpaceComposer to feed
4. Integrate SpaceLeaderToolbar

#### Organisms Needed
1. **SpaceHeader** (exists, needs social proof)
2. **SpaceComposer** (create post in space)
3. **SpacePostFeed** (reuses FeedPostCard)
4. **FriendsInSpace** (NEW - top priority)
5. **SpaceEventsPanel** (exists, needs "who's going")
6. **SpaceMembersPanel** (exists, needs online status)
7. **SpaceResourcesPanel** (exists)
8. **SpaceAboutSection** (exists, make collapsible)
9. **SpaceLeaderToolbar** (exists, needs badges)

#### Molecules Needed
1. **SpaceComposerWithTools** ⭐ (with inline tool menu)
2. **EventCard** ⭐ (with "who's going" prioritized)
3. **MemberCard** ⭐ (with online status, mutual connections)
4. **ResourceCard**
5. **InlineToolMenu** (dropdown with Poll/Event/Task/Resource)
6. **QuickActionButtons** ("Need ride", "Study session", etc.)
7. **AvatarStack** (reusable - friends in space, going to event)

---

## 3. Profile Pages

### 3a. View Profile (`/profile/[handle]`)

#### User Experience
**Goal**: View user identity, activity, connections, spaces

#### Page Hierarchy
```
NavigationShell
└── ProfileLayout (Template)
    ├── ProfileHeader (Organism) ← PRIMARY
    │   ├── CoverPhoto
    │   ├── Avatar (Atom - 3:4 portrait)
    │   ├── IdentitySection (Molecule)
    │   │   ├── Name + Handle
    │   │   ├── Badge[] (Atom - major, year, verified)
    │   │   └── Bio text
    │   ├── StatCard[] (Molecule - connections, spaces, posts)
    │   ├── Button[] (Atom - Edit/Share/Connect)
    │   └── CompletionPrompt (Molecule - if incomplete profile)
    │       ├── Progress (Atom)
    │       ├── Text (Atom)
    │       └── Button (Atom)
    │
    ├── ProfileNavigation (Molecule)
    │   └── Tabs (Atom - Posts/Spaces/Activity/Settings)
    │
    └── ProfileContent (contextual based on tab)
        ├── PostsTab
        │   └── FeedPostCard[] (Molecule - REUSE!)
        │
        ├── SpacesTab
        │   └── SpaceCard[] (Molecule - REUSE!)
        │
        ├── ActivityTab
        │   └── ActivityTimeline (Organism)
        │       └── ActivityItem[] (Molecule)
        │           ├── Icon (Atom - action type)
        │           ├── Text (Atom - description)
        │           ├── Timestamp (Atom)
        │           └── Badge (Atom - context)
        │
        └── SettingsTab
            └── SettingsForm (Organism)
                ├── FormField[] (Molecule)
                ├── Switch[] (Atom)
                └── Button[] (Atom)
```

#### Layout: ProfileLayout
**File**: `packages/ui/src/atomic/templates/profile-layout.tsx` (needs creation)

#### Organisms Needed
1. **ProfileHeader** ⭐ (campus identity widget)
2. **ActivityTimeline** (recent actions)
3. **ConnectionList** (friends on campus)
4. **SettingsForm** (profile edit)

#### Molecules Needed
1. **IdentitySection** ⭐
2. **StatCard** (reusable - already in Spaces)
3. **CompletionPrompt** ⭐ (completion psychology)
4. **ActivityItem**
5. **ConnectionCard** (similar to MemberCard)

---

## 4. HiveLab Pages

### 4a. Tool Browser (`/hivelab`)

#### User Experience
**Goal**: Browse templates, view my tools, discover community tools

#### Page Hierarchy
```
NavigationShell
└── HiveLabBrowserLayout (Template)
    ├── HiveLabNavigation (Molecule)
    │   └── Tabs (Atom - My Tools/Templates/Community)
    │
    └── ToolGrid (Organism)
        └── ToolCard[] (Molecule)
            ├── Card (Atom)
            ├── Badge[] (Atom - type, popularity)
            ├── PreviewImage
            ├── StatCard[] (Molecule - uses, likes)
            └── Button[] (Atom - Use/Edit/Deploy)
```

### 4b. Tool Builder (`/hivelab/builder`)

#### User Experience
**Goal**: Create/edit tools with no-code builder

#### Page Hierarchy
```
NavigationShell
└── HiveLabBuilderLayout (Template) ← EXISTS!
    ├── BuilderTopBar (Organism)
    │   ├── ToolName (editable)
    │   ├── Button[] (Atom - Save/Preview/Publish)
    │   └── Badge (Atom - draft status)
    │
    ├── ElementPalette (Organism - Left Sidebar)
    │   └── HiveLabElementLibrary (Organism)
    │       └── ElementCard[] (Molecule)
    │           ├── Icon (Atom)
    │           ├── Label (Atom)
    │           └── Drag handle
    │
    ├── BuilderCanvas (Organism - Center)
    │   └── HiveLabBuilderCanvas (Organism)
    │       └── CanvasElement[] (Molecule - dynamic)
    │
    ├── PropertiesPanel (Organism - Right Sidebar)
    │   └── HiveLabPropertiesPanel (Organism)
    │       ├── FormField[] (Molecule)
    │       ├── ColorPicker (Molecule)
    │       └── Switch[] (Atom)
    │
    └── PreviewModal (Organism)
        └── Dialog (Atom)
            └── ToolRuntimeView (dynamic based on composition)
```

#### Layout: HiveLabBuilderLayout
**File**: `packages/ui/src/atomic/templates/hivelab/hivelab-builder-layout.tsx` ✅ EXISTS

#### Organisms Needed
1. **HiveLabElementLibrary** ⭐ (drag-drop element palette)
2. **HiveLabBuilderCanvas** ⭐ (canvas with elements)
3. **HiveLabPropertiesPanel** ⭐ (configure selected element)
4. **HiveLabTemplateBrowser** (choose starting template)
5. **HiveLabAnalyticsDashboard** (tool performance)

#### Molecules Needed
1. **ElementCard** (draggable element in palette)
2. **CanvasElement** (element on canvas)
3. **ToolCard** (in browser)
4. **ColorPicker**
5. **FormField** (reusable across forms)

---

## Complete Molecule Inventory (What We Need to Build)

### Priority 1: Core Loop (Must have for launch)
```
Feed Domain:
✓ FeedPostCard ........... Main content card (HIGHEST PRIORITY)
✓ FeedEventCard .......... Event promotions with urgency
✓ FeedFilters ............ Filter tabs
✓ RitualCard ............. Behavioral campaigns
✓ CommentCard ............ Post comments

Spaces Domain:
✓ DiscoverableSpaceCard .. Discovery with social proof
✓ JoinedSpaceCard ........ Joined spaces with activity
✓ SpaceComposerWithTools . Post creation with tools
✓ EventCard .............. Event with "who's going"
✓ InlineToolMenu ......... Tool dropdown (Poll/Event/Task)

Profile Domain:
✓ IdentitySection ........ Name, handle, campus info
✓ CompletionPrompt ....... Profile completion psychology
✓ ActivityItem ........... Timeline activity

Shared:
✓ StatCard ............... Metrics display (reusable)
✓ AvatarStack ............ Friends list (reusable)
✓ SearchBar .............. Universal search
✓ NotificationItem ....... Notification card
```

### Priority 2: Feature Complete
```
Spaces:
- MemberCard ............. Member with online status
- ResourceCard ........... Space resources
- QuickActionButtons ..... "Need ride", "Study session"
- PhotoCarousel .......... Image galleries

Profile:
- ConnectionCard ......... Friend card
- SettingsForm ........... Profile edit

HiveLab:
- ToolCard ............... Tool browser
- ElementCard ............ Draggable element
- CanvasElement .......... Element on canvas
```

### Priority 3: Polish
```
- FormField .............. Reusable form component
- ColorPicker ............ Color selection
- CategoryTabs ........... Category filters
- QuickActions ........... Action buttons
```

---

## Implementation Plan (Top-Down)

### Phase 2A: Feed (Core Loop - Week 1)
**Goal**: Make feed functional and engaging

**Build in order**:
1. **FeedPostCard** ← Start here (exemplar molecule)
   - Compose: Card + Avatar + Badge + Button
   - Add: Social proof (friend reactions)
   - Add: Trending indicator
   - Stories: Default, WithFriends, Trending, WithPhotos

2. **FeedEventCard**
   - Compose: Card + Badge + AvatarStack + Button
   - Add: Urgency color coding
   - Add: "Who's going" prioritized
   - Stories: Default, Urgent, FriendsGoing, FOMO

3. **RitualCard**
   - Compose: Card + Progress + Badge + Button
   - Add: Streak counter
   - Stories: NotStarted, InProgress, Completed, Streak

4. **FeedFilters**
   - Compose: Tabs + Badge
   - Stories: AllFilters, WithUnread

5. **CommentCard**
   - Compose: Avatar + Text + Button
   - Stories: Default, FromFriend, Reply

### Phase 2B: Spaces (Community - Week 2)
**Build in order**:
1. **DiscoverableSpaceCard** (discovery)
2. **JoinedSpaceCard** (my spaces)
3. **SpaceComposerWithTools** (create post)
4. **InlineToolMenu** (tool dropdown)
5. **EventCard** (sidebar events)
6. **MemberCard** (sidebar members)

### Phase 2C: Profile (Identity - Week 3)
1. **IdentitySection** (header)
2. **CompletionPrompt** (psychology)
3. **ActivityItem** (timeline)

### Phase 2D: Shared (Utilities - Week 3)
1. **StatCard** (reusable metrics)
2. **AvatarStack** (friends list)
3. **SearchBar** (search)
4. **NotificationItem** (notifications)

---

## Layouts Status

### Existing Templates
```
✅ space-layout.tsx ................. Needs updates (reorder sidebar)
✅ hivelab-builder-layout.tsx ....... Complete
```

### Needed Templates
```
❌ feed-layout.tsx .................. Create (Rituals + Filters + Stream)
❌ spaces-discovery-layout.tsx ...... Create (Search + Grid)
❌ my-spaces-layout.tsx ............. Create (Quick actions + Grid)
❌ profile-layout.tsx ............... Create (Header + Tabs + Content)
❌ hivelab-browser-layout.tsx ....... Create (Tool grid)
```

---

## Next Steps

### This Session
1. **Review this map with Jacob** - Validate pages, layouts, priorities
2. **Choose starting point** - FeedPostCard recommended (core loop + all patterns)
3. **Define exact props** - From domain types
4. **Build exemplar** - Perfect composition + campus patterns + stories
5. **Use as template** - Apply pattern to remaining molecules

### This Week
- Complete Phase 2A: Feed molecules (5 components)
- Create FeedLayout template
- Verify in Storybook with real campus context

### Next Week
- Phase 2B: Spaces molecules
- Phase 2C: Profile molecules
- Phase 2D: Shared molecules

---

## Questions to Answer

1. **Are these the right pages?** Any missing routes?
2. **Is the priority order correct?** Feed → Spaces → Profile → HiveLab?
3. **Do the layouts make sense?** Any structural issues?
4. **Are molecules properly scoped?** Too big/small?
5. **Should we build layouts first or molecules first?** Or parallel?

---

**Ready to build?** Let's start with FeedPostCard and nail the pattern.
