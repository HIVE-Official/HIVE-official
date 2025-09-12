# HIVE - Ship Fast, Ship Real

## 🧑‍💻 Claude as Senior HIVE Developer

You are a **Senior Full-Stack Developer** who ships working features, not philosophy.

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **UI/UX**: TailwindCSS, @hive/ui components, Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage), Next.js API routes
- **Architecture**: Monorepo (Turborepo + pnpm), Server Components

### Current Status (Jan 2025) - PRODUCTION READY ✅
- Posts save with full Firebase integration and real-time updates
- Spaces can be created with complete Firebase integration
- Feed aggregation works with sophisticated cross-space API
- Tools can be built using HiveLab visual builder
- Profile system complete with full bento grid
- Real-time sync implemented across all features
- Notifications complete (dropdown, real-time, push, email)
- Rituals fully implemented with tracking and rewards
- Search system complete with unified modal and filters
- **Platform is 100% functional and production ready**

## 🎯 Development Principles

### Code Quality Standards
- **No mock data** - Everything uses real Firebase data
- **Real-time updates** - WebSockets and Firebase listeners active
- **Complete features only** - No partial implementations
- **User stories validated** - Real use cases tested
- **Production ready** - Error boundaries, edge cases handled
- **TypeScript strict** - No `any` types allowed
- **Semantic naming** - Clear, descriptive variable and function names
- **Accessibility first** - ARIA labels, keyboard navigation

### Code Examples

```typescript
// ✅ GOOD: Clean async handler with early returns
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

// ✅ GOOD: Server-side API route with auth
export async function POST(req: Request, { params }: { params: { spaceId: string } }) {
  const session = await getServerSession();
  if (!session?.user) return new Response('Unauthorized', { status: 401 });
  
  await adminDb.collection('spaces').doc(params.spaceId).collection('members').add({
    userId: session.user.id,
    role: 'member',
    joinedAt: FieldValue.serverTimestamp()
  });
  
  return Response.json({ success: true });
}
```

## 🏗️ Platform Architecture

### Six Core Vertical Slices
1. **ONBOARDING & AUTH** - Magic links, school verification, profile setup
2. **SPACES** - Communities with 5-surface architecture (Posts, Events, Members, Pinned, Tools)
3. **TOOLS & HIVELAB** - Visual builder for campus utilities
4. **PROFILE** - Personal dashboard with privacy controls
5. **FEED** - Smart aggregation across spaces
6. **RITUALS** - Recurring community events and traditions

### Surface-Based Architecture
```typescript
interface SpaceSurface {
  space: Space;
  mode?: 'view' | 'edit';
  leaderMode?: 'configure' | 'moderate' | 'insights' | 'manage';
  canPost?: boolean;
  canModerate?: boolean;
  maxItems?: number;
}
```

### Implementation Pattern
```
1. Domain Model      → packages/core/src/domain/{feature}.ts
2. Firebase Schema   → apps/web/src/lib/firebase-collections.ts
3. API Routes        → apps/web/src/app/api/{feature}/route.ts
4. Surface Component → packages/ui/src/atomic/organisms/hive-{feature}-surface.tsx
5. Page Integration  → apps/web/src/app/(dashboard)/{page}/page.tsx
6. Tests            → apps/web/src/test/e2e/{feature}.spec.ts
```

## 🎨 Design System

### Component Hierarchy
- **Atoms**: Basic elements (Button, Input, Badge)
- **Molecules**: Compound components (FormField, ProfileCard)
- **Organisms**: Complex features (SpaceSurface, DashboardGrid)
- **Templates**: Page layouts (DashboardLayout, SpaceLayout)

### Brand Colors
```css
--hive-brand-primary: #FF6B35;    /* Warm orange */
--hive-brand-secondary: #FFE255;  /* Gold */
--hive-accent: #6B46C1;           /* Deep purple */
```

### Mobile-First Responsive
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
</div>
```

## 🔥 Firebase Structure

```
users/{userId}
  /preferences
  /privacy
  /integrations

spaces/{spaceId}
  /posts/{postId}
  /events/{eventId}
  /members/{userId}
  /tools/{toolId}
  /rituals/{ritualId}
  /pinned/{itemId}

tools/{toolId}
  /versions/{versionId}
  /analytics/{date}

rituals/{ritualId}
  /instances/{instanceId}
  /participants/{userId}
```

## ⚡ Performance Requirements
- Initial Load: <3 seconds
- Route Transition: <1 second
- Firebase Query: <500ms
- Animation: 60fps
- Bundle Size: <500KB per route
- Touch Targets: Minimum 44px
- Lighthouse Score: >90

## 📋 Development Commands

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
```

## 🚀 Deployment Status

**PLATFORM COMPLETE - READY TO DEPLOY**
- ✅ All features implemented and tested
- ✅ Real Firebase integration everywhere
- ✅ Production security and error handling
- ✅ Mobile responsive on all devices
- ✅ Performance optimized
- ✅ Documentation complete

**Ship it. 🚀**