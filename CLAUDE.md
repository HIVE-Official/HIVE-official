# HIVE - Campus Social Platform

## 🧑‍💻 Claude as Senior HIVE Developer

You are a **Senior Full-Stack Developer** working on the HIVE platform - a campus social network for UB students.

### Tech Stack
- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **UI/UX**: TailwindCSS, @hive/ui components, Framer Motion
- **Backend**: Firebase (Firestore, Auth, Storage), Next.js API routes
- **Architecture**: Monorepo (Turborepo + pnpm), Server Components
- **Package Manager**: pnpm 9.1.1
- **Node**: >=18.0.0

### Current Status (January 2025) - BUILD ISSUES ⚠️
- **Build Status**: ❌ FAILING - Case sensitivity issue in @hive/ui package
- **TypeScript**: ❌ FAILING - Same case sensitivity issue blocking typecheck
- **Development**: Can run with `pnpm dev` but with warnings
- **Admin App**: ✅ Builds successfully
- **Web App**: Build blocked by @hive/ui package issue

### Active Build Issue
```
Error in @hive/ui package:
- File casing mismatch: 'Loading' vs 'loading' directory
- Affects: index-minimal.ts, index-production.ts, index.ts
- Blocks both build and typecheck commands
```

## 📊 Project Structure

### Monorepo Layout
```
C:\hive\
├── apps/
│   ├── web/         # Main Next.js application
│   └── admin/       # Admin dashboard (builds successfully)
├── packages/
│   ├── ui/          # Component library (HAS BUILD ISSUE)
│   ├── core/        # Business logic
│   ├── hooks/       # Shared React hooks
│   ├── validation/  # Schema validation
│   ├── api-client/  # API client utilities
│   ├── auth-logic/  # Authentication logic
│   ├── analytics/   # Analytics utilities
│   ├── i18n/        # Internationalization
│   ├── tokens/      # Design tokens
│   └── utilities/   # Shared utilities
└── docs/            # Documentation
```

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

## 🚨 Current Issues & Status

### Build Blocking Issues
1. **@hive/ui Package Case Sensitivity Error**
   - Import path mismatch: `Loading` vs `loading` directory
   - Files affected: index-minimal.ts, index-production.ts, index.ts
   - Prevents both build and typecheck from completing

### Working Features
- ✅ Admin app builds and runs
- ✅ Development server runs (with warnings)
- ✅ Most packages typecheck successfully
- ✅ Firebase integration configured
- ✅ Authentication flow implemented

### Documentation Conflicts
- **ACTUAL_PLATFORM_STATUS.md**: Reports build failures and ~70% completion
- **PLATFORM_STATUS_FINAL.md**: Claims production ready at 95%
- **Reality**: Build is currently broken, needs immediate fixes

## 📋 Priority Tasks

1. **Fix @hive/ui case sensitivity issue** (CRITICAL)
2. **Resolve build errors in web app**
3. **Clean up ESLint warnings (164 warnings)**
4. **Verify all features actually work with real data**
5. **Update documentation to reflect actual state**

## 🔧 Development Commands

```bash
# Development (works with warnings)
pnpm dev

# Build (CURRENTLY FAILING)
pnpm build

# Type checking (CURRENTLY FAILING)
pnpm typecheck

# Linting
pnpm lint

# Component development
pnpm storybook

# E2E tests
pnpm test:e2e
```

## 🤖 AI Development with Claude Code

### Quick Reference Files
- **HIVE_MAP.md** - Complete codebase navigation and file locations
- **AI_PATTERNS.md** - Copy-paste patterns for common tasks
- **CLAUDE.md** - This file - project context and rules

### Efficient Claude Commands
```bash
# Find components
Glob: "**/atomic/atoms/*.tsx"

# Search for patterns
Grep: "export.*Surface" packages/ui/src/

# Check specific implementation
Read: packages/ui/src/components/surfaces/HivePostsSurface.tsx:1-50

# Find all API routes
Glob: "apps/web/src/app/api/**/route.ts"
```

### Context Optimization Tips
1. Reference files with line numbers: `file.tsx:45-60`
2. Use Glob/Grep before Read to find exact locations
3. Check HIVE_MAP.md first to know where things are
4. Copy patterns from AI_PATTERNS.md instead of creating from scratch

## ⚠️ Important Notes

- **DO NOT claim the platform is production ready** - it has build failures
- **DO NOT deploy to production** until build issues are resolved
- **DO focus on fixing the critical build-blocking issues first**
- **DO test all features with real Firebase data before claiming completion**

The platform has good bones but needs critical fixes before it can be considered ready for deployment.