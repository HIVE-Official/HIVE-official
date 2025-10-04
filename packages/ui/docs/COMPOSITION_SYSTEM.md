# HIVE Composition System

**Version:** 1.0
**Last Updated:** October 2025
**Status:** Production Standard

---

## Overview

The **Composition System** defines how HIVE components fit together to build complete features. This is the "glue" between your atomic design layers.

**Core Principle:** Components compose **up the hierarchy** (atoms → molecules → organisms → templates), never down or sideways.

---

## Table of Contents

1. [Composition Rules](#1-composition-rules)
2. [Composition Patterns](#2-composition-patterns)
3. [Data Flow Architecture](#3-data-flow-architecture)
4. [Cross-Feature Composition](#4-cross-feature-composition)
5. [Modal & Dialog Patterns](#5-modal--dialog-patterns)
6. [Form Composition](#6-form-composition)
7. [Real-World Examples](#7-real-world-examples)
8. [Anti-Patterns](#8-anti-patterns)

---

## 1. Composition Rules

### 1.1 The Composition Hierarchy

```typescript
// ✅ CORRECT: Compose up the hierarchy
Atom → Molecule → Organism → Template → Page

// ❌ WRONG: Never compose down or sideways
Molecule → Atom (✗ Don't modify atoms)
Organism → Molecule (in same file) (✗ Extract molecule)
```

### 1.2 Import Rules by Layer

#### **Atoms (shadcn primitives)**
```typescript
// Atoms can ONLY import:
// - Other atoms (for composition, e.g., Button uses Badge)
// - Utilities (cn, utils)
// - React primitives

// ✅ ALLOWED
import { Button } from './button'
import { cn } from '@/lib/utils'

// ❌ FORBIDDEN
import { FeedPostCard } from '../molecules/feed-post-card' // No molecules
import { ProfileHeader } from '../organisms/profile-header' // No organisms
```

#### **Molecules (Campus patterns)**
```typescript
// Molecules can import:
// - Atoms (primary building blocks)
// - Other molecules (SPARINGLY - only for complex composition)
// - Utilities, hooks, types

// ✅ ALLOWED
import { Card, Button, Avatar, Badge } from '../atoms'
import { InlineToolMenu } from './inline-tool-menu' // Molecule composing molecule
import { useSlashCommands } from '@/hooks'
import type { SpacePost } from '@hive/core'

// ❌ FORBIDDEN
import { SpaceHeader } from '../organisms/space-header' // No organisms
import { SpaceLayout } from '../templates/space-layout' // No templates
```

#### **Organisms (Feature blocks)**
```typescript
// Organisms can import:
// - Atoms (for structure)
// - Molecules (for content blocks)
// - Other organisms (RARELY - only for sub-sections)
// - Utilities, hooks, types

// ✅ ALLOWED
import { Button, Card } from '../atoms'
import { FeedPostCard, StatCard } from '../molecules'
import { SpaceMembersPanel } from './space-members-panel' // Sub-section
import { useAuth } from '@hive/auth-logic'

// ❌ FORBIDDEN
import { SpaceLayout } from '../templates/space-layout' // No templates
import { SpacePage } from '@/app/spaces/page' // No pages
```

#### **Templates (Page layouts)**
```typescript
// Templates can import:
// - Organisms (primary building blocks)
// - Molecules (for layout helpers only)
// - Atoms (for structural elements only)

// ✅ ALLOWED
import { SpaceHeader, SpacePostFeed, SpaceMembersPanel } from '../organisms'
import { FeedFilters } from '../molecules' // Layout helper
import { Button } from '../atoms' // Structural element

// ❌ FORBIDDEN
import { SpacePage } from '@/app/spaces/page' // No pages
import { getSpaceData } from '@/app/actions' // No data fetching
```

### 1.3 When to Compose vs When to Create

#### **Compose Existing Components When:**
✅ You need < 3 atoms in simple arrangement
✅ Logic is minimal (< 20 lines)
✅ Pattern is used in < 3 places
✅ Component is one-off, contextual

#### **Create New Component When:**
✅ You combine 3+ atoms
✅ Logic is complex (state, effects, handlers)
✅ Pattern repeats 3+ times
✅ Component has distinct purpose
✅ Component deserves Storybook story

**Example Decision:**
```typescript
// ❌ DON'T CREATE: One-off composition
export function SimpleUserHeader({ name, avatar }) {
  return (
    <div className="flex gap-2">
      <Avatar src={avatar} />
      <span>{name}</span>
    </div>
  )
}

// ✅ DO INLINE: Just compose directly
<div className="flex gap-2">
  <Avatar src={user.avatar} />
  <span>{user.name}</span>
</div>

// ✅ CREATE MOLECULE: Complex, reusable pattern
export function CampusUserCard({ user, campusContext, onConnect }) {
  // 50+ lines of logic, campus-specific behavior
  return <Card>{/* Complex structure */}</Card>
}
```

---

## 2. Composition Patterns

### 2.1 Pattern: Molecule from Atoms

**Use Case:** Compose 2-5 atoms into campus-specific pattern

**Example: FeedPostCard** (molecules/feed-post-card.tsx)
```typescript
import { Card, Button, Avatar, Badge } from '../atoms'
import type { FeedPost } from './types'

export function FeedPostCard({ post, onReact, onComment }: Props) {
  return (
    <Card className="p-4">
      {/* Compose atoms */}
      <div className="flex gap-3">
        <Avatar src={post.author.avatar} />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold">{post.author.name}</span>
            <Badge variant="outline">{post.space.name}</Badge>
          </div>

          <p className="text-sm">{post.content}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-3 pt-3 border-t">
        <Button variant="ghost" size="sm" onClick={() => onReact(post.id)}>
          ❤️ {post.reactions.count}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onComment(post.id)}>
          💬 {post.comments.count}
        </Button>
      </div>
    </Card>
  )
}
```

**Pattern Summary:**
- **Imports:** Only shadcn atoms
- **Structure:** Card wrapper with atoms inside
- **Logic:** Minimal state, event handlers passed as props
- **Campus Context:** Shows space badge, social proof
- **Reusability:** Used in feed, space posts, profile posts

---

### 2.2 Pattern: Organism from Molecules

**Use Case:** Combine molecules + atoms into complete feature

**Example: SpaceHeader** (organisms/space-header.tsx)
```typescript
import { Button, Badge } from '../atoms'
import { StatCard } from '../molecules/stat-card'

export function SpaceHeader({
  name,
  description,
  memberCount,
  postCount,
  isLeader,
  onJoin
}: Props) {
  return (
    <div className="border rounded-lg p-6">
      {/* Atoms for structure */}
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{name}</h1>
        <Badge>{category}</Badge>
      </div>

      <p className="text-sm text-muted-foreground mt-2">
        {description}
      </p>

      {/* Molecules for data display */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <StatCard label="Members" value={memberCount} />
        <StatCard label="Posts" value={postCount} />
        <StatCard label="Events" value={eventCount} />
      </div>

      {/* Actions */}
      <Button onClick={onJoin} className="mt-4">
        Join Space
      </Button>

      {/* Leader controls (conditional) */}
      {isLeader && (
        <div className="mt-4 p-3 bg-accent rounded">
          <span className="text-sm font-medium">Leader Controls</span>
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="ghost">Edit</Button>
            <Button size="sm" variant="ghost">Settings</Button>
            <Button size="sm" variant="ghost">Analytics</Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

**Pattern Summary:**
- **Imports:** Atoms (structure) + Molecules (data display)
- **Structure:** Complex layout with multiple sections
- **Logic:** Conditional rendering (leader controls), multiple actions
- **Campus Context:** Shows stats, member count, leader privileges
- **Reusability:** Used on every space page

---

### 2.3 Pattern: Template from Organisms

**Use Case:** Orchestrate organisms into responsive page layout

**Example: SpaceLayout** (templates/space-layout.tsx)
```typescript
import { SpacePostFeed, SpaceAboutSection, SpaceEventsPanel, SpaceMembersPanel } from '../organisms'

export function SpaceLayout({
  space,
  posts,
  events,
  members,
  onCreatePost,
  ...handlers
}: Props) {
  return (
    <div className="flex gap-6 max-w-7xl mx-auto p-6">
      {/* Main Content (60%) - Left */}
      <div className="flex-[6] min-w-0">
        <SpacePostFeed
          posts={posts}
          canPost={isMember}
          onCreatePost={onCreatePost}
          onPostClick={handlePostClick}
          onLike={onLikePost}
        />
      </div>

      {/* Sidebar (40%) - Right */}
      <div className="flex-[4] space-y-4 sticky top-4 self-start">
        {/* About Section */}
        <SpaceAboutSection
          description={space.description}
          tags={space.tags}
          memberCount={space.memberCount}
        />

        {/* Events Panel (if has events) */}
        {events.length > 0 && (
          <SpaceEventsPanel
            events={events}
            onEventClick={onEventClick}
            onRSVP={onRSVP}
          />
        )}

        {/* Members Panel */}
        <SpaceMembersPanel
          members={members}
          totalMemberCount={space.memberCount}
          onMemberClick={onMemberClick}
        />
      </div>
    </div>
  )
}
```

**Pattern Summary:**
- **Imports:** Only organisms (no atoms/molecules)
- **Structure:** 60/40 responsive grid layout
- **Logic:** Layout orchestration, responsive breakpoints
- **Campus Context:** Contextual panels (events only if exist)
- **Reusability:** Used by all space pages (/spaces/[id])

---

### 2.4 Pattern: Molecule Composing Molecule

**Use Case:** Complex molecule needs sub-molecule for specific behavior

**Example: SpaceComposerWithTools** (molecules/space-composer-with-tools.tsx)
```typescript
import { InlineToolMenu } from './inline-tool-menu' // Another molecule
import { useSlashCommands } from '@/hooks'

export function SpaceComposerWithTools({
  value,
  onValueChange,
  onCreatePost,
  onToolSelect
}: Props) {
  const [toolMenuOpen, setToolMenuOpen] = useState(false)

  // Custom hook for slash command detection
  const { command, isSlashInput } = useSlashCommands({
    value,
    onCommand: (cmd) => onToolSelect(cmd)
  })

  return (
    <div className="relative">
      {/* Slash command helper */}
      {isSlashInput && (
        <div className="absolute bottom-full mb-2 rounded-lg border bg-card p-3">
          <p className="text-xs">Type /poll, /event, /task, or /resource</p>
        </div>
      )}

      {/* Textarea with tools */}
      <div className="rounded-3xl border focus-within:border-primary">
        {/* Left: Tool menu (composed molecule) */}
        <InlineToolMenu
          open={toolMenuOpen}
          onOpenChange={setToolMenuOpen}
          onToolSelect={onToolSelect}
          trigger={
            <button className="p-2 hover:bg-accent rounded-full">
              <Plus className="h-5 w-5" />
            </button>
          }
        />

        <textarea
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full px-14 py-3 resize-none"
        />

        {/* Right: Send button */}
        <button
          onClick={handlePost}
          className="p-2 rounded-full bg-primary"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
```

**Pattern Summary:**
- **Imports:** Another molecule (InlineToolMenu) + custom hook
- **Structure:** Composed molecule used as child
- **Logic:** Slash command detection, tool menu state
- **When to Use:** When sub-molecule has distinct, reusable behavior
- **Warning:** Avoid deep nesting (max 2 levels: molecule → molecule)

---

### 2.5 Pattern: Conditional Composition

**Use Case:** Show different components based on state/permissions

**Example: Conditional Rendering** (organisms/space-header.tsx)
```typescript
export function SpaceHeader({
  isLeader,
  hasJoined,
  onJoin,
  onLeave,
  onSettings
}: Props) {
  return (
    <div>
      {/* Header content */}
      <h1>{name}</h1>

      {/* Conditional: Member vs Non-member */}
      {hasJoined ? (
        <Button variant="outline" onClick={onLeave}>
          ✓ Joined
        </Button>
      ) : (
        <Button onClick={onJoin}>
          + Join
        </Button>
      )}

      {/* Conditional: Leader-only controls */}
      {isLeader && (
        <div className="mt-4 p-3 bg-accent rounded">
          <span className="font-medium">Leader Controls</span>
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={onSettings}>Settings</Button>
            <Button size="sm">Analytics</Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

**Pattern Summary:**
- **Use Case:** User permissions, feature flags, loading states
- **Best Practice:** Use ternary for binary choice, `&&` for optional content
- **Campus Pattern:** Leader controls, member status, verification badges

---

## 3. Data Flow Architecture

### 3.1 The 5 Data Layers

```typescript
/**
 * HIVE Data Flow:
 *
 * 1. Domain Layer (packages/core/src/domain)
 *    - Aggregates, Value Objects, Events
 *    - Pure business logic, no UI
 *
 * 2. Application Layer (packages/core/src/application)
 *    - Use cases, services
 *    - Orchestrates domain logic
 *
 * 3. API Layer (apps/web/src/app/api)
 *    - Route handlers
 *    - Calls application services
 *
 * 4. React Query Layer (apps/web/src/hooks)
 *    - useQuery, useMutation hooks
 *    - Caching, optimistic updates
 *
 * 5. UI Layer (packages/ui/src/atomic)
 *    - Components receive data via props
 *    - Components emit events via callbacks
 */
```

### 3.2 Data Flow: Domain → UI

**Example: Space Domain → SpaceHeader Component**

```typescript
// 1. DOMAIN LAYER (packages/core/src/domain/spaces/space.aggregate.ts)
export class SpaceAggregate {
  id: SpaceId
  name: string
  description: string
  memberCount: number
  leaderIds: UserId[]

  isUserLeader(userId: UserId): boolean {
    return this.leaderIds.includes(userId)
  }
}

// 2. APPLICATION LAYER (packages/core/src/application/space.service.ts)
export class SpaceService {
  async getSpaceWithUserContext(spaceId: string, userId: string) {
    const space = await this.spaceRepo.findById(spaceId)

    return {
      space,
      isLeader: space.isUserLeader(userId),
      isMember: await this.membershipRepo.isMember(spaceId, userId)
    }
  }
}

// 3. API LAYER (apps/web/src/app/api/spaces/[spaceId]/route.ts)
export const GET = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request)
  const { spaceId } = context.params

  const data = await spaceService.getSpaceWithUserContext(spaceId, userId)

  return respond.success(data)
})

// 4. REACT QUERY LAYER (apps/web/src/hooks/use-space.ts)
export function useSpace(spaceId: string) {
  return useQuery({
    queryKey: ['space', spaceId],
    queryFn: () => fetch(`/api/spaces/${spaceId}`).then(r => r.json())
  })
}

// 5. UI LAYER (packages/ui/src/organisms/space-header.tsx)
export function SpaceHeader({
  name,           // From space aggregate
  description,    // From space aggregate
  memberCount,    // From space aggregate
  isLeader,       // From application layer context
  isMember,       // From application layer context
  onJoin          // Event handler (callback)
}: Props) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <StatCard label="Members" value={memberCount} />

      {isLeader && <LeaderControls />}
      {!isMember && <Button onClick={onJoin}>Join</Button>}
    </div>
  )
}

// 6. PAGE COMPOSITION (apps/web/src/app/spaces/[spaceId]/page.tsx)
export default function SpacePage({ params }: { params: { spaceId: string } }) {
  const { data, isLoading } = useSpace(params.spaceId)

  if (isLoading) return <Skeleton />

  return (
    <SpaceLayout
      space={data.space}
      isLeader={data.isLeader}
      isMember={data.isMember}
      onJoin={() => joinSpace(params.spaceId)}
    />
  )
}
```

**Key Principles:**
1. **Props Down:** Data flows down from domain → API → hooks → components
2. **Events Up:** User actions flow up via callbacks
3. **No Direct Fetching:** Components never call APIs directly (use hooks)
4. **Type Safety:** Domain types flow through entire stack

---

### 3.3 State Management Patterns

```typescript
/**
 * HIVE State Management Strategy
 */

// 1. SERVER STATE (React Query)
// - API data, cache management
// - Use for: Posts, spaces, users, events
const { data, isLoading } = useQuery({
  queryKey: ['posts', spaceId],
  queryFn: () => fetchPosts(spaceId)
})

// 2. CLIENT STATE (Zustand)
// - UI state that doesn't persist
// - Use for: Modals, filters, view modes
const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen }))
}))

// 3. URL STATE (Next.js routing)
// - Navigation state, deep links
// - Use for: Current page, tabs, filters
const searchParams = useSearchParams()
const activeTab = searchParams.get('tab') ?? 'posts'

// 4. FORM STATE (React Hook Form)
// - Form inputs, validation
// - Use for: Post composer, profile edit, space creation
const { register, handleSubmit } = useForm()

// 5. COMPONENT STATE (useState)
// - Local, ephemeral state
// - Use for: Dropdown open, hover state, input value
const [isOpen, setIsOpen] = useState(false)
```

**Decision Tree:**
```typescript
// Does state need to persist across sessions?
//   YES → Server state (React Query + API)
//   NO ↓

// Does state need to be shared across routes?
//   YES → Client state (Zustand)
//   NO ↓

// Does state affect URL/navigation?
//   YES → URL state (searchParams)
//   NO ↓

// Is state a form input?
//   YES → Form state (React Hook Form)
//   NO ↓

// Component-local state (useState/useReducer)
```

---

## 4. Cross-Feature Composition

### 4.1 How Features Interact

**Pattern: Click post in Feed → Navigate to Space**
```typescript
// Feed page composes FeedPostCard
<FeedPage>
  <FeedPostCard
    post={post}
    onSpaceClick={(spaceId) => {
      router.push(`/spaces/${spaceId}`) // Navigate to space
    }}
  />
</FeedPage>

// FeedPostCard molecule emits event
<FeedPostCard>
  <button onClick={() => onSpaceClick(post.space.id)}>
    in {post.space.name}
  </button>
</FeedPostCard>
```

**Pattern: Join space from Profile → Refresh spaces list**
```typescript
// Profile page
const { mutate: joinSpace } = useMutation({
  mutationFn: (spaceId) => fetch(`/api/spaces/${spaceId}/join`, { method: 'POST' }),
  onSuccess: () => {
    // Invalidate spaces query to refresh
    queryClient.invalidateQueries(['spaces', 'joined'])
  }
})

<SpaceCard onJoin={() => joinSpace(space.id)} />
```

**Pattern: Create ritual check-in → Post to feed**
```typescript
// Ritual check-in creates feed post automatically (server-side)
// API route: apps/web/src/app/api/rituals/[ritualId]/check-in/route.ts
export const POST = withAuthAndErrors(async (request, context) => {
  const userId = getUserId(request)
  const { ritualId } = context.params

  // 1. Record check-in
  await ritualService.checkIn(ritualId, userId)

  // 2. Create feed post
  await feedService.createPost({
    authorId: userId,
    content: `Just checked in to ${ritual.name}! 🔥`,
    type: 'ritual-check-in',
    metadata: { ritualId }
  })

  return respond.success({ checkedIn: true })
})
```

---

### 4.2 Cross-Feature Data Dependencies

```typescript
/**
 * Feature Dependency Map:
 *
 * Feed depends on:
 *   - Profile (author display)
 *   - Spaces (space attribution)
 *   - Rituals (ritual check-in posts)
 *
 * Spaces depends on:
 *   - Profile (member display)
 *   - Feed (space posts)
 *   - HiveLab (embedded tools)
 *
 * Profile depends on:
 *   - Spaces (joined spaces)
 *   - Feed (user posts)
 *   - Rituals (participation stats)
 *
 * HiveLab depends on:
 *   - Spaces (tool deployment targets)
 *   - Profile (tool creator)
 *
 * Rituals depends on:
 *   - Profile (participant display)
 *   - Feed (check-in posts)
 */

// ✅ CORRECT: Loose coupling via props
<FeedPostCard
  post={post}              // From feed domain
  author={post.author}     // From profile domain
  space={post.space}       // From spaces domain
/>

// ❌ WRONG: Tight coupling via direct imports
import { getUserProfile } from '../profile/profile.service'
// Don't fetch cross-feature data inside components
```

---

## 5. Modal & Dialog Patterns

### 5.1 Pattern: Modal with shadcn Dialog

**Use Case:** Confirmation, form, detail view

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../atoms/dialog'
import { Button } from '../atoms/button'
import { SpaceCard } from '../molecules/space-card'

export function SpaceJoinModal({ space, open, onOpenChange, onJoin }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Join {space.name}?</DialogTitle>
        </DialogHeader>

        {/* Compose space preview (molecule) */}
        <SpaceCard
          space={space}
          compact
          showJoinButton={false}
        />

        {/* Rules acceptance */}
        <div className="text-sm text-muted-foreground">
          <p>By joining, you agree to:</p>
          <ul className="list-disc list-inside mt-2">
            {space.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => {
            onJoin()
            onOpenChange(false)
          }}>
            Join Space
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

**Usage in Parent:**
```typescript
export function SpaceDiscoveryPage() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null)

  return (
    <>
      <SpaceGrid
        spaces={spaces}
        onSpaceClick={setSelectedSpace}
      />

      <SpaceJoinModal
        space={selectedSpace}
        open={!!selectedSpace}
        onOpenChange={(open) => !open && setSelectedSpace(null)}
        onJoin={() => joinSpace(selectedSpace.id)}
      />
    </>
  )
}
```

---

### 5.2 Pattern: Multi-Step Modal (Wizard)

**Use Case:** Onboarding, space creation, complex form

```typescript
import { Dialog, DialogContent } from '../atoms/dialog'
import { Button } from '../atoms/button'
import { Progress } from '../atoms/progress'

const STEPS = ['basic-info', 'customize', 'invite'] as const
type Step = typeof STEPS[number]

export function SpaceCreationWizard({ open, onOpenChange, onCreate }: Props) {
  const [step, setStep] = useState<Step>('basic-info')
  const [formData, setFormData] = useState({})

  const currentStepIndex = STEPS.indexOf(step)
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setStep(STEPS[currentStepIndex + 1])
    } else {
      onCreate(formData)
      onOpenChange(false)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setStep(STEPS[currentStepIndex - 1])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {/* Progress indicator */}
        <Progress value={progress} className="mb-4" />

        {/* Step content (conditional composition) */}
        {step === 'basic-info' && (
          <BasicInfoStep
            data={formData}
            onChange={setFormData}
          />
        )}

        {step === 'customize' && (
          <CustomizeStep
            data={formData}
            onChange={setFormData}
          />
        )}

        {step === 'invite' && (
          <InviteStep
            data={formData}
            onChange={setFormData}
          />
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
          >
            Back
          </Button>

          <Button onClick={handleNext}>
            {currentStepIndex === STEPS.length - 1 ? 'Create Space' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

---

## 6. Form Composition

### 6.1 Pattern: Form with React Hook Form + Zod

**Use Case:** Post creation, profile editing, space settings

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '../atoms/form'
import { Input } from '../atoms/input'
import { Textarea } from '../atoms/textarea'
import { Button } from '../atoms/button'

// 1. Define validation schema
const postSchema = z.object({
  content: z.string().min(1, 'Post cannot be empty').max(1000, 'Post too long'),
  visibility: z.enum(['public', 'members', 'leaders']),
  attachments: z.array(z.string()).optional()
})

type PostFormData = z.infer<typeof postSchema>

export function PostComposer({ onSubmit }: Props) {
  // 2. Initialize form
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: '',
      visibility: 'public',
      attachments: []
    }
  })

  // 3. Handle submission
  const handleSubmit = (data: PostFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Content field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What's on your mind?</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Share something with your space..."
                  className="resize-none min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Visibility field */}
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who can see this?</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <option value="public">Everyone</option>
                  <option value="members">Members only</option>
                  <option value="leaders">Leaders only</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit button */}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Posting...' : 'Post'}
        </Button>
      </form>
    </Form>
  )
}
```

**Pattern Summary:**
- **Validation:** Zod schema defines rules
- **State:** React Hook Form manages form state
- **UI:** shadcn Form components for structure
- **Submission:** Optimistic update via React Query

---

## 7. Real-World Examples

### 7.1 Example: Feed Page Composition

```typescript
// apps/web/src/app/feed/page.tsx

import { NavigationShell } from '@hive/ui/organisms/navigation-shell'
import { FeedLayout } from '@hive/ui/templates/feed-layout'
import { FeedPostCard } from '@hive/ui/molecules/feed-post-card'
import { FeedFilters } from '@hive/ui/molecules/feed-filters'
import { RitualsCardStrip } from '@hive/ui/molecules/rituals-card-strip'
import { useFeed } from '@/hooks/use-feed'
import { useRituals } from '@/hooks/use-rituals'

export default function FeedPage() {
  // 1. Fetch data (React Query hooks)
  const { data: posts, isLoading: postsLoading } = useFeed()
  const { data: rituals, isLoading: ritualsLoading } = useRituals()

  // 2. Compose template with organisms and molecules
  return (
    <NavigationShell>
      <FeedLayout
        // Rituals strip at top
        ritualsStrip={
          <RitualsCardStrip
            rituals={rituals}
            onCheckIn={(ritualId) => checkInToRitual(ritualId)}
          />
        }

        // Filters below rituals
        filters={
          <FeedFilters
            activeFilter="all"
            onFilterChange={setFilter}
          />
        }

        // Post feed as main content
        content={
          <div className="space-y-4">
            {posts.map(post => (
              <FeedPostCard
                key={post.id}
                post={post}
                onReact={(postId) => reactToPost(postId)}
                onComment={(postId) => router.push(`/posts/${postId}`)}
                onSpaceClick={(spaceId) => router.push(`/spaces/${spaceId}`)}
              />
            ))}
          </div>
        }
      />
    </NavigationShell>
  )
}
```

**Composition Breakdown:**
```
Page (Next.js route)
└── NavigationShell (Organism - app wrapper)
    └── FeedLayout (Template - page structure)
        ├── RitualsCardStrip (Molecule - rituals preview)
        ├── FeedFilters (Molecule - filter controls)
        └── FeedPostCard[] (Molecule - post display)
            ├── Card (Atom)
            ├── Avatar (Atom)
            ├── Badge (Atom)
            └── Button[] (Atoms)
```

---

### 7.2 Example: Space Page Composition

```typescript
// apps/web/src/app/spaces/[spaceId]/page.tsx

import { SpaceLayout } from '@hive/ui/templates/space-layout'
import { useSpace } from '@/hooks/use-space'
import { useSpacePosts } from '@/hooks/use-space-posts'

export default function SpacePage({ params }: { params: { spaceId: string } }) {
  const { data: space } = useSpace(params.spaceId)
  const { data: posts } = useSpacePosts(params.spaceId)
  const { data: events } = useSpaceEvents(params.spaceId)
  const { data: members } = useSpaceMembers(params.spaceId)

  return (
    <NavigationShell>
      <SpaceLayout
        space={space}
        posts={posts}
        events={events}
        members={members}

        // Feed handlers
        onCreatePost={(content) => createPost(params.spaceId, content)}
        onPostClick={(post) => router.push(`/posts/${post.id}`)}

        // Event handlers
        onEventClick={(event) => router.push(`/events/${event.id}`)}
        onRSVP={(eventId, attending) => rsvpToEvent(eventId, attending)}

        // Member handlers
        onMemberClick={(member) => router.push(`/profile/${member.handle}`)}
      />
    </NavigationShell>
  )
}
```

**Composition Breakdown:**
```
Page
└── NavigationShell (Organism)
    └── SpaceLayout (Template)
        ├── SpacePostFeed (Organism)
        │   └── FeedPostCard[] (Molecules)
        └── Sidebar
            ├── SpaceAboutSection (Organism)
            ├── SpaceEventsPanel (Organism)
            │   └── EventCard[] (Molecules)
            └── SpaceMembersPanel (Organism)
                └── UserCard[] (Molecules)
```

---

## 8. Anti-Patterns

### ❌ 8.1 Don't: Compose Down the Hierarchy

```typescript
// ❌ WRONG: Molecule importing organism
// packages/ui/src/atomic/molecules/space-preview-card.tsx
import { SpaceHeader } from '../organisms/space-header' // NO!

export function SpacePreviewCard({ space }) {
  return (
    <Card>
      <SpaceHeader {...space} /> {/* Organism in molecule */}
    </Card>
  )
}

// ✅ CORRECT: Extract shared logic into molecule
// packages/ui/src/atomic/molecules/space-preview-card.tsx
import { Card, Badge, Button } from '../atoms'

export function SpacePreviewCard({ space, onJoin }) {
  return (
    <Card>
      {/* Replicate only what you need */}
      <h3 className="font-bold">{space.name}</h3>
      <Badge>{space.category}</Badge>
      <Button onClick={onJoin}>Join</Button>
    </Card>
  )
}
```

---

### ❌ 8.2 Don't: Deep Nesting (Molecules calling molecules calling molecules)

```typescript
// ❌ WRONG: 3+ levels of molecule nesting
<MoleculeA>
  <MoleculeB>
    <MoleculeC>
      <Atom />
    </MoleculeC>
  </MoleculeB>
</MoleculeA>

// ✅ CORRECT: Max 2 levels, or promote to organism
<Organism>
  <MoleculeA />
  <MoleculeB />
  <MoleculeC />
</Organism>
```

---

### ❌ 8.3 Don't: Components Fetching Data Directly

```typescript
// ❌ WRONG: Component calling API directly
export function SpaceHeader({ spaceId }) {
  const [space, setSpace] = useState(null)

  useEffect(() => {
    fetch(`/api/spaces/${spaceId}`)
      .then(r => r.json())
      .then(setSpace)
  }, [spaceId])

  return <div>{space?.name}</div>
}

// ✅ CORRECT: Use React Query hook in parent, pass as prop
export function SpaceHeader({ space }) {
  return <div>{space.name}</div>
}

// Parent (page):
const { data: space } = useSpace(spaceId)
<SpaceHeader space={space} />
```

---

### ❌ 8.4 Don't: Mixing Business Logic in UI Components

```typescript
// ❌ WRONG: Validation logic in component
export function PostComposer({ onSubmit }) {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    // Complex validation logic here
    if (content.length < 1) return
    if (content.length > 1000) return
    if (containsProfanity(content)) return
    if (!isAuthenticated()) return

    onSubmit(content)
  }

  return <textarea value={content} onChange={e => setContent(e.target.value)} />
}

// ✅ CORRECT: Validation in schema, business logic in service
const postSchema = z.object({
  content: z.string().min(1).max(1000)
})

export function PostComposer({ onSubmit }) {
  const form = useForm({ resolver: zodResolver(postSchema) })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Textarea {...form.register('content')} />
      </form>
    </Form>
  )
}
```

---

### ❌ 8.5 Don't: Prop Drilling (Passing props through 3+ levels)

```typescript
// ❌ WRONG: Props passed through multiple levels
<PageWrapper userId={userId}>
  <Section userId={userId}>
    <Panel userId={userId}>
      <Component userId={userId} />
    </Panel>
  </Section>
</PageWrapper>

// ✅ CORRECT: Use context for deeply nested shared state
const UserContext = createContext<User | null>(null)

export function PageWrapper({ userId, children }) {
  const { data: user } = useUser(userId)

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function Component() {
  const user = useContext(UserContext)
  return <div>{user.name}</div>
}
```

---

## 9. Composition Checklist

### Before Creating a New Component

- [ ] Can I compose this from existing atoms in < 10 lines?
  - **YES** → Inline composition (no new component)
- [ ] Is this pattern used 3+ times?
  - **NO** → Inline composition
  - **YES** → Continue ↓
- [ ] Does it combine 2+ atoms with campus logic?
  - **YES** → Create molecule
  - **NO** → Continue ↓
- [ ] Does it combine molecules into feature block?
  - **YES** → Create organism
  - **NO** → Continue ↓
- [ ] Does it orchestrate organisms into page layout?
  - **YES** → Create template

### Component Design Checklist

- [ ] Single Responsibility: Does this component do ONE thing well?
- [ ] Composition: Does it compose from simpler components?
- [ ] Props Interface: Are props minimal, typed, documented?
- [ ] Data Flow: Does it receive data as props, emit events as callbacks?
- [ ] Campus Context: Does it use campus-specific patterns (social proof, etc.)?
- [ ] Storybook: Can I create 5+ useful stories?
- [ ] Accessibility: Keyboard nav, ARIA labels, focus management?
- [ ] Responsive: Works on mobile (375px) and desktop (1440px)?
- [ ] Naming: Clear, descriptive, follows naming convention?

---

## Quick Reference

### Import Rules Summary

| Layer | Can Import | Cannot Import |
|-------|-----------|---------------|
| Atoms | Atoms, utils | Molecules, organisms, templates, pages |
| Molecules | Atoms, molecules (sparingly), utils, hooks | Organisms, templates, pages |
| Organisms | Atoms, molecules, organisms (rarely), utils, hooks | Templates, pages |
| Templates | Organisms, molecules (layout only), atoms (structure only) | Pages |
| Pages | Templates, organisms, molecules, atoms, hooks | Nothing (top of hierarchy) |

### Data Flow Summary

```typescript
Domain → Application → API → React Query → Props → UI

User Action → Callback → React Query Mutation → API → Application → Domain
```

### State Management Decision Tree

```
Persists across sessions? → React Query (server state)
Shared across routes? → Zustand (client state)
Affects URL? → searchParams (URL state)
Form input? → React Hook Form (form state)
Component-local? → useState (component state)
```

---

**Questions? Check:**
- DESIGN_SYSTEM.md for component layers
- CAMPUS_PATTERNS.md for behavioral patterns
- INTERACTION_PATTERNS.md for UX patterns (create next)
- DATA_FLOW.md for domain → UI mapping (create next)

---

**Last Updated:** October 2025
**Maintained By:** HIVE Design System Team
