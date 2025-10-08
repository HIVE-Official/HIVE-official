# Spaces Composition Architecture Audit

**Date**: 2025-10-03
**Status**: 🔴 **NEEDS REFACTORING**
**Scope**: Complete composition redesign for Spaces feature vertical

---

## Executive Summary

The Spaces feature has **fragmented composition patterns** with inconsistent prop interfaces, unclear data flow, and redundant component variants. This audit identifies architectural issues and proposes a clean compositional redesign following HIVE's established patterns.

### Critical Issues

1. **❌ 3 Conflicting Card Molecules**: `space-card`, `discoverable-space-card`, `joined-space-card` with overlapping responsibilities
2. **❌ Inconsistent Prop Interfaces**: No unified data model flowing through composition layers
3. **❌ Missing Event Handler Patterns**: Action handlers scattered, not bubbling properly
4. **❌ No Loading State Strategy**: Components handle loading inconsistently
5. **❌ Semantic Tokens Remain**: 3 card molecules still using semantic design tokens
6. **❌ Template Complexity**: `space-layout` doing too much orchestration internally

---

## Current Component Inventory

### Molecules (5 total)

#### ✅ **space-card.tsx** (Generic Base Card)
```typescript
interface SpaceCardProps {
  name: string
  description?: string
  coverPhoto?: string
  category?: string
  memberCount?: number
  postCount?: number
  isJoined?: boolean
  privacy?: "public" | "private" | "hidden"
  memberAvatars?: Array<{ name: string; avatar?: string }>
  tags?: string[]
  onClick?: () => void
  onJoin?: () => void
  onLeave?: () => void
}
```

**Status**: ✅ Dark monochrome, clean prop interface
**Issues**: Overlaps with other card variants
**Recommendation**: Make this the single canonical card molecule

---

#### ❌ **discoverable-space-card.tsx** (Discovery State)
```typescript
interface DiscoverableSpaceCardProps {
  title: string  // ❌ Should be 'name' (inconsistent)
  description: string
  coverImage?: string  // ❌ Should be 'coverPhoto' (inconsistent)
  memberCount: number
  postCount?: number
  campusContext?: CampusSpaceContext  // ✅ Good: campus-specific
  onJoin?: () => void
  onClick?: () => void
}

interface CampusSpaceContext {
  friendsInSpace?: Array<{...}>  // Social proof
  isTrending?: boolean
  spaceType?: "academic" | "greek" | "residential" | "interest" | "official"
  activeToday?: number
  recentPostCount?: number
}
```

**Status**: ❌ Has semantic tokens, inconsistent naming
**Issues**:
- Uses `title` instead of `name` (breaks consistency)
- Uses `coverImage` instead of `coverPhoto` (breaks consistency)
- Horizontal layout duplicates functionality
- Campus context should be unified, not card-specific

**Recommendation**: Merge campus context into base card, consolidate

---

#### ❌ **joined-space-card.tsx** (Joined State)
```typescript
interface JoinedSpaceCardProps {
  // (Similar structure to discoverable-space-card)
  // Plus: unreadCount, lastActivity, etc.
}
```

**Status**: ❌ Has semantic tokens, duplicates space-card
**Issues**:
- Duplicates 80% of space-card logic
- Only difference: shows unread badge, different CTA
- Should be handled by single card with `isJoined` prop

**Recommendation**: Delete, merge functionality into base `space-card`

---

#### ❌ **hive-space-card.tsx** (Unknown Purpose)
**Status**: ❌ Has semantic tokens, purpose unclear
**Issues**: Unclear how this differs from `space-card`
**Recommendation**: Audit usage, likely delete and consolidate

---

#### ✅ **space-composer-with-tools.tsx** (Post Composer)
**Status**: ✅ Dark monochrome, clean composition
**Issues**: None identified
**Recommendation**: Keep as-is

---

### Organisms (11 total)

#### ✅ **space-header.tsx**
```typescript
interface SpaceHeaderProps {
  // Basic info
  name: string
  description?: string
  coverPhoto?: string
  category?: string

  // Stats
  memberCount?: number
  postCount?: number
  eventCount?: number

  // State
  hasJoined?: boolean
  isLeader?: boolean
  privacy?: "public" | "private" | "hidden"

  // Visual
  tags?: string[]
  memberAvatars?: Array<{ name: string; avatar?: string }>

  // Layout
  layout?: "header" | "sidebar"
  isCollapsed?: boolean

  // Actions (7 handlers - too many!)
  onJoin?: () => void
  onLeave?: () => void
  onEdit?: () => void
  onSettings?: () => void
  onAnalytics?: () => void
  onInvite?: () => void
  onToggleLayout?: () => void
}
```

**Status**: ✅ Dark monochrome, functional
**Issues**:
- **Too many action handlers** (7 callbacks)
- **Mixed layout concerns** (header vs sidebar mode in same component)
- **No unified data model** (flat props instead of `space` object)
- Missing loading states

**Recommendation**:
- Extract `SpaceHeaderActions` molecule for leader controls
- Use `space` object prop instead of flat props
- Add loading/error states

---

#### ✅ **space-post-feed.tsx**
```typescript
interface SpacePostFeedProps {
  posts?: SpacePost[]
  canPost?: boolean
  canComment?: boolean

  // Many handlers
  onCreatePost?: (content: string) => void
  onPostClick?: (post: SpacePost) => void
  onLikePost?: (postId: string) => void
  onCommentPost?: (postId: string) => void
  onSharePost?: (postId: string) => void
  onDeletePost?: (postId: string) => void
  onReportPost?: (postId: string) => void

  // Loading
  isLoading?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
}
```

**Status**: ✅ Dark monochrome, functional
**Issues**:
- **Too many action handlers** (7 callbacks)
- Should use **event aggregation pattern** (`onPostAction(action, postId)`)
- Missing empty state handling
- No error state prop

**Recommendation**:
- Consolidate handlers: `onPostAction(action: PostAction, postId: string)`
- Add `error` prop for error state
- Add `emptyState` render prop

---

#### ✅ **space-about-section.tsx**
**Status**: ✅ Dark monochrome
**Issues**: Minimal, well-scoped
**Recommendation**: Keep as-is

---

#### ✅ **space-events-panel.tsx**
**Status**: ✅ Dark monochrome
**Issues**: Minimal
**Recommendation**: Keep as-is

---

#### ✅ **space-members-panel.tsx**
**Status**: ✅ Dark monochrome
**Issues**: Minimal
**Recommendation**: Keep as-is

---

#### ✅ **space-resources-panel.tsx**
**Status**: ✅ Dark monochrome
**Issues**: Minimal
**Recommendation**: Keep as-is

---

#### ✅ **space-member-list.tsx**
**Status**: ✅ Dark monochrome
**Issues**: Good composition
**Recommendation**: Keep as-is

---

#### ✅ **space-leader-toolbar.tsx**
**Status**: ✅ Dark monochrome
**Issues**: Good scoping
**Recommendation**: Keep as-is

---

#### ✅ **space-category-accordion.tsx**
**Status**: ✅ Dark monochrome
**Issues**: Good composition
**Recommendation**: Keep as-is

---

#### ✅ **space-tool-builder.tsx** (HiveLab Integration)
**Status**: ✅ Dark monochrome
**Issues**: Good abstraction
**Recommendation**: Keep as-is

---

#### ✅ **space-tools-panel.tsx** (HiveLab Integration)
**Status**: ✅ Dark monochrome
**Issues**: Good composition
**Recommendation**: Keep as-is

---

### Templates (1 total)

#### ⚠️ **space-layout.tsx**
```typescript
interface SpaceLayoutProps {
  // Massive prop interface (40+ props)
  space: { /* nested object with 12 fields */ }
  posts?: SpacePost[]
  events?: SpaceEvent[]
  resources?: SpaceResource[]
  members?: SpaceMemberPreview[]
  totalMemberCount?: number
  isLeader?: boolean
  isMember?: boolean

  // 6 feed handlers
  onCreatePost?: (content: string) => void
  onPostClick?: (post: SpacePost) => void
  onLikePost?: (postId: string) => void
  onCommentPost?: (postId: string) => void
  onSharePost?: (postId: string) => void
  onLoadMore?: () => void
  hasMorePosts?: boolean

  // 2 about handlers
  onEditDescription?: () => void
  onEditRules?: () => void

  // 3 event handlers
  onCreateEvent?: () => void
  onEventClick?: (event: SpaceEvent) => void
  onRSVP?: (eventId: string, attending: boolean) => void

  // 2 resource handlers
  onAddResource?: () => void
  onResourceClick?: (resource: SpaceResource) => void

  // 3 member handlers
  onInviteMembers?: () => void
  onViewAllMembers?: () => void
  onMemberClick?: (member: SpaceMemberPreview) => void

  // 4 loading states
  isLoadingPosts?: boolean
  isLoadingEvents?: boolean
  isLoadingResources?: boolean
  isLoadingMembers?: boolean

  // Layout
  layoutMode?: "sidebar" | "fullwidth"
}
```

**Status**: ⚠️ Functional but needs refactoring
**Issues**:
- **40+ props** (unmaintainable)
- **Internal state management** (context panel state should be lifted)
- **Direct organism imports** (good, but too many responsibilities)
- **No error handling** (missing error props)
- **Event handlers too granular** (20+ callbacks)

**Recommendation**:
- **Event aggregation**: `onAction(domain: string, action: string, data: any)`
- **Data consolidation**: `spaceData` object with nested collections
- **State lifting**: Move context panel state to page level
- **Error boundaries**: Add error state handling

---

## Architectural Problems

### 1. No Unified Data Model

**Problem**: Each component defines its own shape for space data.

**Current State**:
```typescript
// space-card.tsx
{
  name: string
  description?: string
  coverPhoto?: string
  // ... flat props
}

// discoverable-space-card.tsx
{
  title: string  // ❌ Different name!
  coverImage?: string  // ❌ Different name!
  campusContext?: CampusSpaceContext
}

// space-header.tsx
{
  name: string
  description?: string
  // ... 20+ flat props
}

// space-layout.tsx
{
  space: {
    description: string
    tags?: string[]
    // ... nested object
  }
}
```

**Solution**: Define canonical `Space` domain type that flows through all layers.

```typescript
// From @hive/core domain model
interface Space {
  id: string
  name: string
  description: string
  coverPhoto?: string
  category: string
  privacy: "public" | "private" | "hidden"
  tags: string[]

  // Stats
  stats: {
    memberCount: number
    postCount: number
    eventCount: number
    activeToday: number
  }

  // Campus context
  campus: {
    friendsInSpace: User[]
    isTrending: boolean
    spaceType: SpaceType
  }

  // User context (computed)
  userContext: {
    isJoined: boolean
    isLeader: boolean
    unreadCount: number
  }
}
```

---

### 2. Event Handler Explosion

**Problem**: 20+ callback props in space-layout makes composition brittle.

**Current State**:
```typescript
<SpaceLayout
  onCreatePost={handleCreatePost}
  onPostClick={handlePostClick}
  onLikePost={handleLikePost}
  onCommentPost={handleCommentPost}
  onSharePost={handleSharePost}
  onLoadMore={handleLoadMore}
  onEditDescription={handleEditDescription}
  onEditRules={handleEditRules}
  onCreateEvent={handleCreateEvent}
  onEventClick={handleEventClick}
  onRSVP={handleRSVP}
  onAddResource={handleAddResource}
  onResourceClick={handleResourceClick}
  onInviteMembers={handleInviteMembers}
  onViewAllMembers={handleViewAllMembers}
  onMemberClick={handleMemberClick}
  // 😱 16 props just for event handlers!
/>
```

**Solution**: Event aggregation pattern.

```typescript
// Unified action handler
type SpaceAction =
  | { type: 'post.create'; content: string }
  | { type: 'post.like'; postId: string }
  | { type: 'post.comment'; postId: string }
  | { type: 'post.share'; postId: string }
  | { type: 'post.click'; post: SpacePost }
  | { type: 'event.create' }
  | { type: 'event.click'; event: SpaceEvent }
  | { type: 'event.rsvp'; eventId: string; attending: boolean }
  | { type: 'member.click'; member: SpaceMember }
  | { type: 'member.invite' }
  // ... etc

<SpaceLayout
  space={space}
  onAction={handleSpaceAction}  // Single handler!
/>
```

---

### 3. Duplicate Card Molecules

**Problem**: 3 card components with 80% overlapping functionality.

**Current State**:
- `space-card.tsx` (222 lines) - Generic
- `discoverable-space-card.tsx` (~300 lines) - Discovery state
- `joined-space-card.tsx` (~250 lines) - Joined state
- `hive-space-card.tsx` (~200 lines) - Unknown purpose

**Total**: ~1000 lines of duplicated card logic.

**Solution**: Single polymorphic card.

```typescript
// Unified SpaceCard
interface SpaceCardProps {
  space: Space  // Domain model
  variant?: "default" | "discovery" | "joined" | "compact"
  layout?: "vertical" | "horizontal"
  showActions?: boolean
  onAction?: (action: CardAction) => void
}

// Usage
<SpaceCard space={space} variant="discovery" />  // For browse
<SpaceCard space={space} variant="joined" />     // For joined spaces
<SpaceCard space={space} variant="compact" />    // For list view
```

---

### 4. No Loading/Error State Strategy

**Problem**: Components handle loading inconsistently.

**Current State**:
```typescript
// space-post-feed.tsx: Has isLoading prop
<SpacePostFeed isLoading={isLoadingPosts} />

// space-events-panel.tsx: NO loading prop
<SpaceEventsPanel events={events} />  // ❓ How to show loading?

// space-layout.tsx: 4 separate loading flags
<SpaceLayout
  isLoadingPosts={...}
  isLoadingEvents={...}
  isLoadingResources={...}
  isLoadingMembers={...}
/>
```

**Solution**: Consistent loading/error state pattern.

```typescript
// Option 1: Render props pattern
<SpacePostFeed
  posts={posts}
  renderLoading={() => <Skeleton />}
  renderError={(error) => <ErrorState error={error} />}
  renderEmpty={() => <EmptyState />}
/>

// Option 2: Status prop pattern
<SpacePostFeed
  posts={posts}
  status="loading" | "error" | "success" | "empty"
  error={error}
/>
```

---

### 5. Template Doing Too Much

**Problem**: `space-layout` manages internal UI state (context panel).

**Current State** (space-layout.tsx):
```typescript
const [contextOpen, setContextOpen] = React.useState(false)
const [selectedPost, setSelectedPost] = React.useState<SpacePost | null>(null)

const handlePostClick = (post: SpacePost) => {
  setSelectedPost(post)
  setContextOpen(true)
  onPostClick?.(post)
}
```

**Issue**: Template owns UI state that parent page might need to control (e.g., deep linking to a post).

**Solution**: Lift state, make template controlled.

```typescript
// Controlled component
<SpaceLayout
  space={space}
  contextPanel={{
    isOpen: contextPanelOpen,
    post: selectedPost
  }}
  onContextPanelChange={(isOpen, post) => {
    setContextPanelOpen(isOpen)
    setSelectedPost(post)
  }}
/>
```

---

## Composition Hierarchy Issues

### Current (Fragmented)

```
Page
└── Template (space-layout.tsx)
    ├── Organism (space-post-feed.tsx)
    │   └── ??? (no feed-post-card molecule!)
    ├── Organism (space-about-section.tsx)
    ├── Organism (space-events-panel.tsx)
    ├── Organism (space-resources-panel.tsx)
    └── Organism (space-members-panel.tsx)

Disconnected molecules:
  - space-card.tsx (not used in layout?)
  - discoverable-space-card.tsx (used where?)
  - joined-space-card.tsx (used where?)
  - hive-space-card.tsx (used where?)
```

**Problem**: Card molecules are disconnected from main composition.

---

### Proposed (Clean)

```
Page
└── Template (space-layout.tsx)
    ├── Organism (space-header.tsx)
    │   ├── Molecule (space-header-actions.tsx) - NEW
    │   └── Atoms (Button, Badge, etc.)
    │
    ├── Organism (space-post-feed.tsx)
    │   ├── Molecule (space-post-card.tsx) - NEW
    │   │   └── Atoms
    │   └── Molecule (space-composer-with-tools.tsx) ✅ Exists
    │
    ├── Organism (space-about-section.tsx) ✅
    ├── Organism (space-events-panel.tsx) ✅
    │   └── Molecule (event-card.tsx) - From elsewhere
    ├── Organism (space-resources-panel.tsx) ✅
    ├── Organism (space-members-panel.tsx) ✅
    │   └── Molecule (user-card.tsx) - From elsewhere
    └── Organism (space-tools-panel.tsx) ✅

Separate usage contexts:
  - Molecule (space-card.tsx) - For browse/discovery grids
  - Molecule (space-card.tsx variant="compact") - For lists
```

**Solution**: Clear composition tree with proper molecule reuse.

---

## Refactoring Strategy

### Phase 1: Define Canonical Data Model ✅ CRITICAL

**Create**: `packages/ui/src/types/space.types.ts`

```typescript
/**
 * Canonical Space Data Model
 *
 * This type defines the contract for all Space components.
 * Mirrors @hive/core domain model but simplified for UI layer.
 */
export interface SpaceData {
  id: string
  name: string
  description: string
  coverPhoto?: string

  // Classification
  category: string
  spaceType: "academic" | "greek" | "residential" | "interest" | "official"
  privacy: "public" | "private" | "hidden"
  tags: string[]

  // Stats (always present)
  stats: {
    memberCount: number
    postCount: number
    eventCount: number
    activeToday: number
  }

  // Campus context (social proof)
  campus: {
    friendsInSpace: Array<{
      id: string
      name: string
      avatar?: string
    }>
    isTrending: boolean
  }

  // User context (computed for current user)
  userContext: {
    isJoined: boolean
    isLeader: boolean
    unreadCount: number
  }

  // Optional rich data
  creator?: {
    id: string
    name: string
    handle: string
    avatar?: string
  }
  createdAt?: Date
  rules?: string[]
  memberAvatars?: Array<{
    name: string
    avatar?: string
  }>
}

// Aggregate action type for event handling
export type SpaceAction =
  | { type: 'space.join' }
  | { type: 'space.leave' }
  | { type: 'space.click' }
  | { type: 'post.create'; content: string }
  | { type: 'post.like'; postId: string }
  | { type: 'post.comment'; postId: string }
  | { type: 'post.share'; postId: string }
  | { type: 'post.click'; postId: string }
  | { type: 'event.create' }
  | { type: 'event.click'; eventId: string }
  | { type: 'event.rsvp'; eventId: string; attending: boolean }
  | { type: 'member.click'; memberId: string }
  | { type: 'member.invite' }
  | { type: 'resource.add' }
  | { type: 'resource.click'; resourceId: string }
  | { type: 'settings.open' }
  | { type: 'analytics.open' }

export type SpaceActionHandler = (action: SpaceAction) => void
```

---

### Phase 2: Consolidate Card Molecules

**Action Items**:

1. **Refactor `space-card.tsx`** to be polymorphic
   - Add `variant` prop: `"default" | "discovery" | "joined" | "compact"`
   - Add `layout` prop: `"vertical" | "horizontal"`
   - Use `SpaceData` type for props
   - Implement dark monochrome throughout

2. **Delete redundant cards**:
   - ❌ Delete `discoverable-space-card.tsx`
   - ❌ Delete `joined-space-card.tsx`
   - ❌ Delete or consolidate `hive-space-card.tsx`

3. **Update all imports** to use unified `SpaceCard`

---

### Phase 3: Refactor Organisms

**Action Items**:

1. **space-header.tsx**:
   - Change prop interface to use `space: SpaceData`
   - Extract `SpaceHeaderActions` molecule for leader controls
   - Implement event aggregation: `onAction?: SpaceActionHandler`
   - Add loading/error states

2. **space-post-feed.tsx**:
   - Change prop interface to use `posts: PostData[]`
   - Add `status` prop for loading/error/empty states
   - Implement event aggregation: `onAction?: SpaceActionHandler`
   - Add render props for custom empty/error states

3. **Other organisms**:
   - Audit all organisms for consistent patterns
   - Add loading states where missing
   - Implement event aggregation

---

### Phase 4: Refactor Template

**Action Items**:

1. **space-layout.tsx**:
   - Simplify prop interface:
     ```typescript
     interface SpaceLayoutProps {
       space: SpaceData
       posts: PostData[]
       events: EventData[]
       resources: ResourceData[]
       members: MemberData[]
       onAction: SpaceActionHandler  // Single handler!
       loading?: {
         posts?: boolean
         events?: boolean
         resources?: boolean
         members?: boolean
       }
       contextPanel?: {
         isOpen: boolean
         postId?: string
       }
       onContextPanelChange?: (isOpen: boolean, postId?: string) => void
     }
     ```

   2. Lift context panel state to be controlled
   3. Implement action routing to organisms
   4. Add error boundaries

---

### Phase 5: Create Comprehensive Storybook

**Action Items**:

1. **space-card.stories.tsx**:
   - All variants: default, discovery, joined, compact
   - All layouts: vertical, horizontal
   - All states: with/without cover, with/without campus context
   - Interactive actions

2. **space-layout.stories.tsx**:
   - Full composition demo
   - Loading states
   - Error states
   - Empty states
   - Leader vs member views
   - Mobile responsive

3. **space-header.stories.tsx**:
   - Header vs sidebar modes
   - Collapsed states
   - Leader actions

---

### Phase 6: Document Architecture

**Create**: `SPACES_COMPOSITION.md` with:
- Component hierarchy diagram
- Data flow patterns
- Event handling patterns
- Loading/error strategies
- Campus-specific patterns
- Mobile responsiveness
- Accessibility patterns

---

## Success Criteria

### ✅ Phase 1 Complete When:
- [ ] `SpaceData` type defined and exported
- [ ] `SpaceAction` type defined and exported
- [ ] All organisms type-check with new types

### ✅ Phase 2 Complete When:
- [ ] Single `SpaceCard` with all variants
- [ ] Redundant cards deleted
- [ ] All imports updated
- [ ] Storybook stories updated
- [ ] Zero semantic tokens in cards

### ✅ Phase 3 Complete When:
- [ ] All organisms use `SpaceData` type
- [ ] Event aggregation implemented
- [ ] Loading states consistent
- [ ] Error handling present

### ✅ Phase 4 Complete When:
- [ ] `space-layout` prop count < 15
- [ ] Context panel state controlled
- [ ] Action routing implemented
- [ ] Error boundaries added

### ✅ Phase 5 Complete When:
- [ ] All variants documented in Storybook
- [ ] Composition demo story created
- [ ] Responsive behavior validated

### ✅ Phase 6 Complete When:
- [ ] Architecture document complete
- [ ] Diagrams added
- [ ] Code examples provided
- [ ] Migration guide written

---

## Estimated Effort

- **Phase 1** (Data Model): 30 minutes
- **Phase 2** (Cards): 2 hours
- **Phase 3** (Organisms): 2 hours
- **Phase 4** (Template): 1.5 hours
- **Phase 5** (Storybook): 2 hours
- **Phase 6** (Documentation): 1 hour

**Total**: ~9 hours for complete composition refactor

---

## Next Steps

**Immediate Actions**:
1. ✅ Review this audit with team
2. Create Phase 1 types
3. Begin Phase 2 card consolidation
4. Validate with Storybook throughout

**Questions to Resolve**:
- Should space-layout support both sidebar and fullwidth modes, or split?
- Do we need campus context in all card variants?
- What's the page-level state management strategy (React Query)?

---

**Last Updated**: 2025-10-03
**Author**: HIVE Design System Team
**Status**: Ready for implementation
