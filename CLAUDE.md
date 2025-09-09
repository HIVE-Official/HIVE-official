# HIVE - Ship Fast, Ship Real

## 🧑‍💻 Claude as Senior HIVE Developer

You are a **Senior Full-Stack Developer** who ships working features, not philosophy.
- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **UI/UX**: TailwindCSS, @hive/ui components, Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage), Next.js API routes
- **Architecture**: Monorepo (Turborepo + pnpm), Server Components

### Current Reality Check
- **Posts don't save** (using mock data)
- **Can't create spaces** (only pre-seeded)
- **No notifications** (zero implementation)
- **No real-time sync** (requires refresh)
- **400+ UI components** (but no working backend)

### Development Approach
- **Ship working features** - Make it work, then make it good
- **Fix critical issues first** - Posts must save before anything else
- **Take shortcuts if needed** - `any` types are fine if it ships
- **User stories over architecture** - Build for Jake who wants to party
- **Test with real users** - Not Storybook components
- **Console.log is fine** - Clean up after it works

### Code Implementation Rules
```typescript
// ✅ GOOD: Early returns, semantic naming, accessibility
const handleJoinSpace = async () => {
  if (!user) return;
  
  try {
    const response = await authenticatedFetch(`/api/spaces/${spaceId}/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) throw new Error('Failed to join space');
    
    setIsJoined(true);
  } catch (error) {
    console.error('Join space error:', error);
  }
};

// ✅ GOOD: Tailwind with semantic tokens, proper component structure
<Button
  onClick={handleJoinSpace}
  className="bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
  aria-label="Join this space"
  disabled={isJoining}
>
  {isJoining ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join Space'}
</Button>
```

### Firebase Integration Pattern
```typescript
// Server-side (API route)
export async function POST(req: Request, { params }: { params: { spaceId: string } }) {
  const session = await getServerSession();
  if (!session?.user) return new Response('Unauthorized', { status: 401 });
  
  const { spaceId } = params;
  const body = await req.json();
  
  // Firebase operation
  await adminDb.collection('spaces').doc(spaceId).collection('members').add({
    userId: session.user.id,
    role: 'member',
    joinedAt: FieldValue.serverTimestamp()
  });
  
  return Response.json({ success: true });
}

// Client-side with React Query
const { data: space } = useQuery({
  queryKey: ['space', spaceId],
  queryFn: () => fetchSpaceById(spaceId),
  enabled: !!spaceId
});
```

## 🎯 v1 (vFALL) - Complete Platform Vision

We're building v1 for Fall 2025 launch at UB. This is the complete platform with all 6 vertical slices fully implemented.

### 🏗️ Six Core Vertical Slices

#### 1️⃣ **ONBOARDING & AUTH**
**Purpose**: Seamless entry into campus community
**Features**:
- Magic link authentication
- School email verification (@buffalo.edu)
- Academic profile setup (major, year, housing)
- Interest selection
- Initial space discovery & auto-join
- Privacy settings configuration

**Implementation Status**: ✅ 90% Complete
**Remaining**: Better school validation, email verification follow-up

---

#### 2️⃣ **SPACES** 
**Purpose**: Functional communities where coordination happens
**Features**:
- Discovery system (browse, search, filter)
- Space types (dorms, organizations, majors, interest-based)
- 5-Surface Architecture:
  - **Posts Surface** (60%): Discussions & coordination
  - **Events Surface** (40%): Scheduled activities
  - **Members Surface** (40%): Community directory
  - **Pinned Surface** (40%): Important resources
  - **Tools Surface** (40%): Space utilities
- Leader tools (configure, moderate, insights, manage)
- Join/leave mechanics
- Space permissions & roles

**Implementation Status**: ⚠️ 70% Complete
**Remaining**: Connect posts/events to Firebase, proper permissions, real coordination features

---

#### 3️⃣ **TOOLS & HIVELAB**
**Purpose**: Students build and share campus utilities without code
**Features**:
- HiveLab visual builder
- Element system (inputs, displays, actions, logic)
- Tool marketplace
- Cross-space tool sharing
- Tool analytics & usage tracking
- Version control
- Collaborative building

**Implementation Status**: ❌ 0% (Disabled for vBETA)
**Remaining**: Complete implementation for v1

---

#### 4️⃣ **PROFILE**
**Purpose**: Personal command center for campus life
**Features**:
- Customizable dashboard (drag-and-drop cards)
- Identity management
- Privacy controls (Ghost Mode)
- Personal analytics
- Integration connections (calendar, external apps)
- Activity history
- Achievements & milestones

**Implementation Status**: ✅ 85% Complete
**Remaining**: Calendar integration, remaining card types

---

#### 5️⃣ **FEED**
**Purpose**: Surface coordination and collaboration across all spaces
**Features**:
- Smart aggregation algorithm
- Coordination priority (study sessions, food runs, ride shares)
- Real-time updates
- Ritual reminders strip
- Trending activities
- Personalized filtering
- Cross-space discovery

**Implementation Status**: ⚠️ 40% Complete
**Remaining**: Aggregation algorithm, real-time updates, personalization

---

#### 6️⃣ **RITUALS**
**Purpose**: Recurring community rhythms that build culture
**Features**:
- Ritual creation wizard
- Scheduling system (weekly, monthly, custom)
- Automated reminders
- Participation tracking
- Tradition evolution
- Space-specific rituals
- Campus-wide rituals

**Implementation Status**: ❌ 0% (Not started)
**Remaining**: Complete implementation for v1

## 🚀 Implementation Priority for v1

### Phase 1: Core Utility (Weeks 1-4)
1. **Complete SPACES data layer** - Connect all surfaces to Firebase
2. **Implement coordination features** - Study sessions, food runs, ride shares
3. **Complete FEED aggregation** - Real-time activity across spaces
4. **Polish ONBOARDING** - Smooth first experience

### Phase 2: Creation Engine (Weeks 5-8)
5. **Build TOOLS foundation** - Element system and runtime
6. **Implement HiveLab** - Visual builder interface
7. **Create tool marketplace** - Discovery and sharing
8. **Add tool analytics** - Usage tracking

### Phase 3: Community Features (Weeks 9-12)
9. **Implement RITUALS** - Scheduling and tracking
10. **Enhance PROFILE** - Remaining integrations
11. **Add notifications** - Real-time updates
12. **Complete search** - Platform-wide search

## 🏗️ Surface-Based Architecture

HIVE uses a "Surface Architecture" where each Space contains 5 surfaces:

```typescript
interface SpaceSurface {
  space: Space;
  mode?: 'view' | 'edit';
  leaderMode?: 'configure' | 'moderate' | 'insights' | 'manage';
  canPost?: boolean;
  canModerate?: boolean;
  maxItems?: number;
}

// Usage in Space Detail Page
<HivePostsSurface 
  space={space}
  mode="view"
  leaderMode={currentMode}
  onCoordinationResponse={handleResponse}
/>
```

## 📁 Vertical Slice Implementation Pattern

Every feature follows this structure:

```
1. Domain Model      → packages/core/src/domain/{feature}.ts
2. Firebase Schema   → apps/web/src/lib/firebase-collections.ts
3. API Routes        → apps/web/src/app/api/{feature}/route.ts
4. Surface Component → packages/ui/src/atomic/organisms/hive-{feature}-surface.tsx
5. Page Integration  → apps/web/src/app/(dashboard)/{page}/page.tsx
6. Tests            → apps/web/src/test/e2e/{feature}.spec.ts
```

## 🎨 Design System Guidelines

### Component Hierarchy
- **Atoms**: Basic elements (Button, Input, Badge)
- **Molecules**: Compound components (FormField, ProfileCard)
- **Organisms**: Complex features (SpaceSurface, DashboardGrid)
- **Templates**: Page layouts (DashboardLayout, SpaceLayout)

### Brand Identity
```css
--hive-brand-primary: #FF6B35;    /* Warm orange */
--hive-brand-secondary: #FFE255;  /* Gold */
--hive-accent: #6B46C1;           /* Deep purple */
--hive-text-inverse: white;
--hive-background-primary: #0A0A0A;
```

### Mobile-First Breakpoints
```typescript
// Always design mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  // Mobile: 1 column
  // Tablet: 2 columns  
  // Desktop: 3 columns
</div>
```

## 🔥 Firebase Collections Structure

```
users/{userId}
  /preferences
  /privacy
  /integrations

spaces/{spaceId}
  /posts/{postId}
    /comments/{commentId}
    /reactions/{userId}
  /events/{eventId}
    /attendees/{userId}
  /members/{userId}
  /tools/{toolId}
  /rituals/{ritualId}
  /pinned/{itemId}

feed/{userId}/items/{itemId}

tools/{toolId}
  /versions/{versionId}
  /analytics/{date}

rituals/{ritualId}
  /instances/{instanceId}
  /participants/{userId}
```

## ⚡ Performance Requirements

- **Initial Load**: <3 seconds
- **Route Transition**: <1 second
- **Firebase Query**: <500ms
- **Animation**: 60fps
- **Bundle Size**: <500KB per route
- **Touch Targets**: Minimum 44px
- **Lighthouse Score**: >90

## 🚨 Critical Development Rules

1. **NO mock data in production** - Real Firebase or nothing
2. **NO bypassing authentication** - Every API route checks auth
3. **NO inline styles** - Use Tailwind + semantic tokens
4. **NO one-off components** - Extend @hive/ui
5. **NO partial implementations** - Complete vertical slices only
6. **NO console.logs in production** - Use structured logging
7. **NO any types** - TypeScript strict mode always

## 🧪 Testing Requirements

```typescript
// E2E Test Example
test('user can join a space', async ({ page }) => {
  // Arrange
  await page.goto('/spaces/cs-220-fall-2025');
  
  // Act
  await page.click('button:has-text("Join Space")');
  
  // Assert
  await expect(page.locator('button:has-text("Leave Space")')).toBeVisible();
});
```

## 📋 Reference Commands

```bash
# Development
pnpm dev                    # Start development
pnpm build                  # Build for production
pnpm typecheck             # TypeScript validation
pnpm lint                  # ESLint check
pnpm test:e2e              # Run E2E tests

# Firebase
firebase emulators:start    # Local Firebase
firebase deploy            # Deploy to production

# Component Development
pnpm storybook             # View component library
pnpm --filter @hive/ui add-component  # Add new component
```

## 🎯 Decision Framework

### The "Ship It" Test
When building any feature, ask:
1. **Does it work?** (Can users actually use it?)
2. **Will students use it?** (Check USER_STORIES.md)
3. **Can we ship it today?** (Not next week)
4. **Is it better than nothing?** (Perfect is the enemy of good)
5. **Will it survive real usage?** (Not just demos)

## 📚 Critical Documentation

### Read These First
1. **CURRENT_REALITY.md** - What actually works (15%) vs fake (85%)
2. **WEEK_1_PRIORITIES.md** - The only 5 things that matter
3. **TECHNICAL_DEBT.md** - All the mocks and hacks
4. **USER_STORIES.md** - What students actually want

### Read These Later
5. **VISION_2025.md** - The grand vision (after we ship)
6. **HIVE_PRODUCT_CONTEXT.md** - Product philosophy
7. **PATTERNS.md** - Code patterns when refactoring

---

## 🚨 Current Mission

**WEEK 1: Make These 5 Things Work**
1. ✅ Posts save to Firebase (not mocked)
2. ✅ Real-time updates (no refresh needed)
3. ✅ Basic notifications (red badge)
4. ✅ Photo uploads (memes matter)
5. ✅ Students can create spaces

**If these don't work by Friday, nothing else matters.**

---

## The Brutal Truth

**Current State**: Beautiful demo with no working features
**Target State**: Basic social platform that actually works
**Timeline**: 1 week for basics, 4 weeks for MVP

**Remember**: 
- Jake wants to find parties, not "sovereignty"
- Sarah needs study partners, not "intelligence layers"  
- Posts need to fucking save to the database

**Ship it or shut it down.**