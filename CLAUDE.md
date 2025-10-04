# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Core Development Commands

### Development & Build
```bash
# Start development server (all apps)
pnpm dev

# Build for production (with memory optimization)
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Run only web app
pnpm dev --filter=web

# Build specific package
pnpm build --filter=@hive/ui
pnpm build --filter=@hive/core

# Build without linting (faster)
NODE_OPTIONS="--max-old-space-size=4096" npx next build --no-lint

# Analyze bundle size
pnpm build:analyze     # Creates .next/analyze/ directory
```

### Code Quality
```bash
# TypeScript validation
NODE_OPTIONS="--max-old-space-size=4096" pnpm typecheck

# Type check specific file
NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit --skipLibCheck <file-path>

# Linting (with memory optimization for large codebase)
NODE_OPTIONS="--max-old-space-size=4096" pnpm lint

# Lint specific areas
pnpm lint:quick        # Packages only (skip web)
pnpm lint:api          # API routes only (max 20 warnings)
pnpm lint:components   # Components only (max 160 warnings)
pnpm lint:hooks        # Hooks only (max 10 warnings)
pnpm lint:strict       # Strict mode (max 50 warnings)

# Clean builds and dependencies
pnpm clean:build
pnpm clean:node
```

### Testing
```bash
# Unit tests (Vitest)
pnpm test
pnpm test:unit
pnpm test:watch
pnpm test:coverage

# Component tests
pnpm test:component

# Integration tests
pnpm test:integration

# E2E tests (Playwright)
pnpm test:e2e
pnpm test:e2e:headed      # With browser UI
pnpm test:e2e:debug       # Debug mode
pnpm test:e2e:ui          # Interactive UI mode
pnpm test:e2e:mobile      # Mobile viewport

# Cross-browser testing
pnpm test:e2e:cross-browser  # Chromium, Firefox, WebKit

# Specialized tests
pnpm test:smoke           # Quick smoke tests
pnpm test:visual          # Visual regression
pnpm test:accessibility   # A11y tests
pnpm test:performance:e2e # Performance tests

# Run all tests (CI)
pnpm test:ci              # Coverage + cross-browser E2E

# Storybook for UI components
pnpm storybook
pnpm build-storybook
```

### Firebase Operations
```bash
# Deploy Firestore indexes
pnpm indexes:deploy

# Validate Firestore indexes
pnpm indexes:validate
```

## 🏗️ Architecture Overview

### Monorepo Structure (Turborepo + pnpm)
- **apps/web**: Main Next.js 15.3.3 application (port 3000) - includes admin dashboard at `/admin`
- **packages/ui**: @hive/ui - Atomic design system (70+ components)
- **packages/core**: @hive/core - Business logic, domain models, DDD architecture
- **packages/firebase**: @hive/firebase - Firebase integration layer
- **packages/auth-logic**: @hive/auth-logic - Authentication logic
- **packages/hooks**: @hive/hooks - Shared React hooks
- **packages/tokens**: @hive/tokens - Design tokens and CSS variables
- **packages/api-client**: @hive/api-client - API client utilities
- **packages/i18n**: @hive/i18n - Internationalization
- **packages/utilities**: @hive/utilities - Shared utilities
- **packages/validation**: @hive/validation - Validation schemas
- **packages/analytics**: @hive/analytics - Analytics tracking

### Package Dependency Graph

**Build Order (managed by Turborepo):**
```
1. @hive/tokens         # Design tokens (CSS variables)
2. @hive/firebase       # Firebase initialization
3. @hive/core           # Business logic and types
4. @hive/auth-logic     # Authentication logic
5. @hive/validation     # Validation schemas
6. @hive/hooks          # React hooks (depends on core)
7. @hive/ui             # UI components (depends on tokens, hooks)
8. @hive/api-client     # API client (depends on core)
9. @hive/analytics      # Analytics (depends on core)
10. apps/web            # Main app (depends on all) - includes admin at /admin
```

**Key Dependency Rules:**
- All packages can import from `@hive/core` for types
- UI components should NOT import from apps/
- Use workspace protocol: `"@hive/core": "workspace:*"`
- pnpm overrides in root package.json handle version conflicts

### Domain-Driven Design Architecture (packages/core)

The `@hive/core` package follows DDD principles with clean architecture:

**Structure:**
```
packages/core/src/
├── domain/              # Domain layer (business rules)
│   ├── identity/       # User identity domain
│   │   ├── aggregates/       # profile.aggregate.ts
│   │   ├── value-objects/    # ub-email.value.ts, handle.value.ts
│   │   ├── events/           # profile-created.event.ts
│   │   └── specifications/   # profile-completion.spec.ts
│   ├── spaces/         # Spaces domain
│   ├── rituals/        # Rituals domain
│   ├── feed/           # Feed domain
│   ├── analytics/      # Analytics domain
│   └── shared/         # Shared domain concepts
├── application/        # Application services (use cases)
├── infrastructure/     # Infrastructure (Firebase repos, external services)
│   └── repositories/   # Data access implementations
├── types/             # Shared types
└── utils/             # Utility functions
```

**Key DDD Patterns:**
- **Aggregates**: Entity clusters that enforce invariants (e.g., `profile.aggregate.ts`)
- **Value Objects**: Immutable domain values (e.g., `ub-email.value.ts`, `handle.value.ts`)
- **Domain Events**: Event-driven communication (e.g., `profile-created.event.ts`)
- **Specifications**: Business rule validators (e.g., `profile-completion.spec.ts`)
- **Repositories**: Data access abstraction in infrastructure layer

**Finding Domain Components:**
```bash
# Find all domain aggregates
find packages/core/src/domain -name "*.aggregate.ts"

# Find all value objects
find packages/core/src/domain -name "*.value.ts"

# Find domain events
find packages/core/src/domain -name "*.event.ts"
```

### Critical Import Patterns
```typescript
// Always use package imports for shared code
import { Button, FormField } from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import { db, auth } from '@hive/firebase';
import type { User, Space } from '@hive/core';

// Type-only imports
import type { Profile } from '@hive/core';

// Domain layer imports (in core package)
import { ProfileAggregate } from '@/domain/identity/aggregates/profile.aggregate';
import { UBEmail } from '@/domain/identity/value-objects/ub-email.value';
```

### API Route Architecture

All API routes follow a consistent pattern with consolidated middleware:

**Location:** `apps/web/src/app/api/` (149 total routes)

**Middleware System** (`apps/web/src/lib/middleware/`):

```typescript
// Import from centralized middleware
import {
  withAuthAndErrors,
  withAdminAuthAndErrors,
  withErrors,
  getUserId,
  getUserEmail,
  respond
} from '@/lib/middleware';

// Standard authenticated route (most common - 200+ routes use this)
export const POST = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request);
  const data = await parseJsonBody(request);

  // Business logic here

  return respond.success({ userId, data });
});

// Admin-only route
export const DELETE = withAdminAuthAndErrors(async (request, context, respond) => {
  // Admin logic here
  return respond.noContent();
});

// Public route with error handling
export const GET = withErrors(async (request, context, respond) => {
  // Public logic here
  return respond.success(data);
});
```

**What `withAuthAndErrors` provides automatically:**
- JWT session validation from cookies
- User authentication via Firebase Admin
- Campus isolation enforcement (`campusId: 'ub-buffalo'`)
- Error handling and formatting
- Response formatting with consistent structure
- Rate limiting (from middleware.ts)
- Security headers
- CSRF protection for admin routes
- Audit logging

**Standard Response Format:**
```typescript
// Success responses
respond.success(data)              // 200 with data
respond.created(data)              // 201 with data
respond.noContent()                // 204 no data

// Error responses (handled automatically)
respond.badRequest(message)        // 400
respond.unauthorized(message)      // 401
respond.forbidden(message)         // 403
respond.notFound(message)          // 404
respond.error(message)             // 500
```

**Middleware Composition:**
- **withAuth**: Validates Firebase session, extracts user
- **withAdminAuth**: Same as withAuth + admin role check
- **withErrorHandling**: Catches errors, formats responses
- **withResponse**: Provides `respond` helper for consistent responses
- **withAuthAndErrors**: Combines auth + error handling + response formatting
- **withAdminAuthAndErrors**: Combines admin auth + error handling + response formatting

**Finding Middleware Usage:**
```bash
# Find all routes using withAuthAndErrors
grep -r "withAuthAndErrors" apps/web/src/app/api

# Count API routes
find apps/web/src/app/api -name "route.ts" | wc -l  # 149 routes
```

## 🔐 Critical Security Patterns

### Firebase Query Pattern (MANDATORY)
```typescript
// ALWAYS include campus isolation
import { getSecureSpacesQuery, CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

// Use secure query helpers
const query = query(
  collection(db, 'spaces'),
  where('campusId', '==', 'ub-buffalo'), // REQUIRED
  where('isActive', '==', true),
  orderBy('memberCount', 'desc')
);

// Or use the secure query builder
const result = await getSecureSpacesQuery({ filterType: 'student_org' });
```

### Authentication Flow
1. Email verification required (@buffalo.edu only for vBETA)
2. Firebase Auth sessions managed via JWT cookies
3. Protected routes use middleware.ts for authentication
4. API routes wrapped with `withAuthAndErrors` or `withAdminAuthAndErrors`
5. Session validation in middleware (max age: 24h users, 4h admins)
6. Admin access requires email in ADMIN_EMAILS list + isAdmin flag

### Rate Limiting
**Implementation:** `apps/web/middleware.ts` + `apps/web/src/lib/rate-limiter.ts`

```typescript
// Automatic rate limiting by route type
// Auth routes: 5 requests/minute per IP
// API routes: 60 requests/minute per IP
// Admin routes: 100 requests/minute per IP (with admin check)

// Rate limit headers included automatically
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 2025-10-01T12:00:00Z
```

### CSRF Protection
```typescript
// Admin API routes require CSRF token in header
X-CSRF-Token: <token from session>

// Validated in middleware for all /api/admin/* routes
```

## 🔐 Environment Configuration

### Required Environment Variables

**Firebase Configuration:**
```bash
# Public (client-side)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Server-side (Firebase Admin)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

**Authentication:**
```bash
# Session management
NEXTAUTH_SECRET=         # Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Campus configuration
NEXT_PUBLIC_CAMPUS_ID=ub-buffalo
NEXT_PUBLIC_ENVIRONMENT=development
```

**Admin Configuration:**
```bash
# Admin emails (comma-separated)
ADMIN_EMAILS=jwrhineh@buffalo.edu,noahowsh@gmail.com
```

**Optional Services:**
```bash
# Redis (for caching and rate limiting)
REDIS_URL=

# Analytics
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

## 🎯 Core Product Context

### The Core Loop (Critical Path)
**Open app → See feed → Maybe engage → Come back**

This loop must be < 3 seconds end-to-end. Every feature either:
1. Makes this loop faster → Ship it
2. Serves something else → Delete it

### Student Behavior Reality
- **80% Social Mode**: Browse, scroll, check profiles
- **20% Coordination Mode**: "Who's going to Walmart?", "Selling textbook"
- **NOT LinkedIn**: Keep it informal, no professional networking

### Launch Focus (October 1st)
**Must Work Perfectly:**
1. Sign up with @buffalo.edu
2. See feed immediately
3. Post text/photos
4. Browse/join spaces
5. Basic profiles

Everything else is secondary.

### 5 Core Platform Features
1. **Spaces**: Pre-seeded communities with RSS-fed content
2. **Feed**: Real-time discovery stream (read-only from spaces)
3. **Profile**: Campus identity with connections system
4. **HiveLab**: No-code tool builder for space leaders
5. **Rituals**: Campus-wide behavioral campaigns

## 🚦 Development Principles

### 2025 Excellence Standard
- **Ship remarkable, not viable**: First version must create sharing urge
- **Production only**: No mocks, stubs, or "we'll fix later"
- **Behavior change focus**: Build new habits, not features
- **Distribution is design**: Sharing IS the product

### Code Quality Requirements
- **TypeScript strict mode**: Zero `any` types
- **Zero build errors**: Must compile cleanly
- **Mobile-first**: Every feature works on phones
- **Campus-isolated**: All data tagged with campusId
- **Real-time capable**: SSE/Firebase listeners where needed

### Performance Targets
- **Page load**: < 3s on campus WiFi
- **Transitions**: < 1s between pages
- **Bundle size**: Optimized for mobile
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1

## 💡 Common Development Tasks

### Adding New Features
1. Check existing patterns in codebase first
2. Use @hive/ui components (don't create new ones)
3. Follow atomic design: atoms → molecules → organisms
4. Ensure campus isolation in all queries
5. Add loading/error states
6. Test on mobile viewport
7. Add to Storybook if reusable UI component

### Creating API Routes
```typescript
// 1. Create route file: apps/web/src/app/api/[feature]/route.ts
// 2. Import middleware
import { withAuthAndErrors, getUserId, respond } from '@/lib/middleware';
import { z } from 'zod';

// 3. Define validation schema
const requestSchema = z.object({
  name: z.string().min(1).max(100),
  // ... other fields
});

// 4. Implement handler
export const POST = withAuthAndErrors(async (request, context, respond) => {
  const userId = getUserId(request);
  const data = await parseJsonBody(request);

  // Validate input
  const validated = requestSchema.parse(data);

  // Business logic with campus isolation
  const result = await someService.create({
    ...validated,
    userId,
    campusId: 'ub-buffalo' // REQUIRED
  });

  return respond.created(result);
});
```

### Working with Spaces
- Spaces are pre-seeded RSS-fed communities
- All space queries must filter by campusId
- Space membership tracked in subcollections (`spaces/{id}/members`)
- Posts are subcollections of spaces (`spaces/{id}/posts`)
- Use `getSecureSpacesQuery` helper for campus-isolated queries

### Feed Implementation
- Feed is read-only aggregation from spaces
- Real-time updates via SSE endpoints (`/api/feed/stream`)
- Cache strategy: Redis for performance
- Algorithm: Chronological with boost for engagement
- Users see posts from joined spaces only

### UI Component Development
```bash
# Component location: packages/ui/src/atomic/
# Structure:
# - atoms/         # Basic elements (Button, Input, Badge)
# - molecules/     # Simple combos (FormField, Card)
# - organisms/     # Complex components (ProfileCard, SpaceCard)
# - templates/     # Page layouts

# Always create Storybook story
# Location: packages/ui/src/stories/[component].stories.tsx
```

## ⚡ Turborepo Task Pipeline

### Task Dependencies
Tasks automatically run dependencies via `dependsOn`:

```json
{
  "build": {
    "dependsOn": ["^build"],  // Build all workspace deps first
    "outputs": [".next/**", "dist/**", "storybook-static/**"]
  },
  "test:e2e": {
    "dependsOn": ["build"]    // Build before E2E tests
  }
}
```

### Running Tasks
```bash
# Run task across all workspaces
pnpm build                    # Turborepo orchestrates parallel builds

# Run task for specific package
pnpm build --filter=@hive/ui
pnpm build --filter=web

# Run task with dependencies
pnpm test:e2e --filter=web    # Builds deps first automatically

# Multiple filters
pnpm typecheck --filter=@hive/core --filter=@hive/ui

# Skip cache (useful for debugging)
pnpm build --force

# Dry run to see what would execute
pnpm build --dry-run

# Parallel execution
pnpm lint --parallel
```

### Task Caching
Turborepo caches task outputs based on inputs:
- Source file changes
- Dependencies
- Environment variables
- Configuration files

**Clear cache:**
```bash
rm -rf .turbo
pnpm build --force
```

## 🐛 Known Issues & Solutions

### Memory Issues During Build
```bash
# Always use increased memory for builds
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build

# For larger builds (if needed)
export NODE_OPTIONS="--max-old-space-size=8192"
pnpm build
```

### TypeScript Performance
```bash
# Skip lib checking for faster compilation
NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit --skipLibCheck

# Type check specific file
NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit --skipLibCheck <file-path>

# Project-specific typecheck
NODE_OPTIONS="--max-old-space-size=4096" pnpm --filter=@hive/core typecheck
```

### Package Resolution
- Use pnpm overrides in root package.json for version conflicts
- React/React-DOM locked to ^18.0.0 across monorepo
- framer-motion locked to ^11.11.17
- esbuild security patches enforced

### Build Fails with "Module not found"
```bash
# Clean and reinstall
pnpm clean:node

# Or rebuild specific package
pnpm build --filter=@hive/core --force
```

## 🔍 Debugging & Analysis

### Common Debugging Commands
```bash
# Type check specific file
NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit --skipLibCheck <file-path>

# Lint specific directory
pnpm lint:api          # API routes only (max 20 warnings)
pnpm lint:components   # Components only (max 160 warnings)
pnpm lint:hooks        # Hooks only (max 10 warnings)

# Check build without linting
NODE_OPTIONS="--max-old-space-size=4096" npx next build --no-lint

# Analyze bundle size
pnpm build:analyze     # Creates .next/analyze/ directory

# Check package dependencies
pnpm list --depth=0
pnpm list @hive/core   # See who depends on core
```

### Finding Code Patterns
```bash
# Find all API routes with auth
grep -r "withAuthAndErrors" apps/web/src/app/api

# Find campus isolation patterns
grep -r "campusId.*ub-buffalo" apps/web/src

# Find all domain aggregates
find packages/core/src/domain -name "*.aggregate.ts"

# Find all value objects
find packages/core/src/domain -name "*.value.ts"

# Find all API routes (149 total)
find apps/web/src/app/api -name "route.ts" | wc -l

# Find middleware usage
grep -r "middleware.ts" apps/web/src/app

# Find React Server Components
grep -r "'use client'" apps/web/src/app

# Find Zustand stores
find . -name "*.store.ts"

# Find React Query hooks
grep -r "useQuery\|useMutation" apps/web/src
```

### Component & File Locations
- **UI components**: `packages/ui/src/atomic/` (atoms → molecules → organisms → templates)
- **Domain models**: `packages/core/src/domain/`
- **Application services**: `packages/core/src/application/`
- **Repositories**: `packages/core/src/infrastructure/repositories/`
- **API routes**: `apps/web/src/app/api/` (149 routes)
- **Page components**: `apps/web/src/app/` (App Router)
- **Shared hooks**: `packages/hooks/src/`
- **Middleware**: `apps/web/src/lib/middleware/`
- **Auth utilities**: `apps/web/src/lib/` (auth-*.ts, session.ts)
- **Storybook stories**: `packages/ui/src/stories/`

### Debugging Production Issues
```bash
# Check environment variables
vercel env ls

# View deployment logs
vercel logs <deployment-url>

# Test production build locally
NODE_OPTIONS="--max-old-space-size=4096" pnpm build
pnpm start

# Check Firebase connection
pnpm test:firebase-auth
```

## 📝 Git Workflow

### Commit Standards
- Use conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Reference issue numbers when applicable
- Keep commits atomic and focused
- Run `pnpm lint` and `pnpm typecheck` before committing

### Current Branch Strategy
- `main`: Production-ready code
- Feature branches: Short-lived, merge quickly
- No long-running branches
- PR required for merging to main

### Pre-commit Checklist
```bash
# 1. Type check
NODE_OPTIONS="--max-old-space-size=4096" pnpm typecheck

# 2. Lint
NODE_OPTIONS="--max-old-space-size=4096" pnpm lint

# 3. Run tests
pnpm test

# 4. Build check
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# 5. Commit
git add .
git commit -m "feat: add new feature"
```

## 🎨 UI/UX Consistency

### Design System Usage
- Always use @hive/ui components
- Follow atomic design patterns
- Dark theme with gold accents (#FFD700)
- Mobile-first responsive design
- Glassmorphism effects for cards/modals

### Component Hierarchy
1. Check if component exists in @hive/ui
2. Compose from existing atoms/molecules
3. Only create new if absolutely necessary
4. Add to Storybook if reusable
5. Follow Radix UI + shadcn/ui patterns

### Styling Standards
- **Tailwind CSS only**: No custom CSS unless absolutely necessary
- **Design tokens**: Use @hive/tokens for colors, spacing, typography
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **Accessibility**: WCAG 2.1 AA compliance required
- **Dark theme**: Default theme with high contrast

### Animation Guidelines
- **Framer Motion**: For complex animations
- **CSS transitions**: For simple hover/focus states
- **Keep subtle**: Max 300ms duration for micro-interactions
- **Respect prefers-reduced-motion**: Disable for accessibility

## 🔥 Firebase Architecture

### Collection Structure
```
users/                    // User profiles
  └── {userId}/
      ├── profile data
      └── connections/    // User connections subcollection

spaces/                   // Community spaces
  └── {spaceId}/
      ├── posts/         // Space posts subcollection
      │   └── {postId}/
      │       └── comments/  // Post comments subcollection
      └── members/       // Space membership subcollection

tools/                   // User-created tools (HiveLab)
  └── {toolId}/

rituals/                 // Campus campaigns
  └── {ritualId}/

schools/                 // University data
  └── ub-buffalo/

analytics/               // Analytics events
  └── {eventId}/
```

### Security Rules Pattern
- **Campus isolation**: All documents have campusId field
- **User permission validation**: Only owners can edit
- **Rate limiting**: Write limits enforced
- **Optimistic UI**: Client updates immediately, rollback on failure

### Query Patterns
```typescript
// CORRECT: Campus-isolated query
const q = query(
  collection(db, 'spaces'),
  where('campusId', '==', 'ub-buffalo'),
  where('isActive', '==', true)
);

// WRONG: Missing campus isolation
const q = query(
  collection(db, 'spaces'),
  where('isActive', '==', true)
); // ❌ WILL FAIL SECURITY REVIEW

// Use secure query helpers
import { getSecureSpacesQuery } from '@/lib/secure-firebase-queries';
const result = await getSecureSpacesQuery({ filterType: 'student_org' });
```

## ⚠️ Critical Warnings

1. **NEVER** skip campus isolation in queries
2. **NEVER** use hardcoded values for campusId (except 'ub-buffalo' for vBETA)
3. **NEVER** create mocks or stubs - production only
4. **NEVER** use `any` type in TypeScript
5. **NEVER** bypass authentication in API routes
6. **ALWAYS** handle loading/error states
7. **ALWAYS** test on mobile viewport
8. **ALWAYS** use package imports for shared code
9. **ALWAYS** validate user input with Zod schemas
10. **ALWAYS** use `withAuthAndErrors` middleware for protected routes

## 🎓 Development Best Practices

### From .cursorrules
- **File size limit**: 300 lines max
- **One export per file**: Primary component/function only
- **TypeScript strict mode**: No `any` types allowed
- **Server Components default**: Only use `"use client"` when necessary
- **State management**:
  - `useState` for local state
  - Zustand for global client state
  - React Query for server state
  - Context for stable, infrequent data only

### Testing Philosophy
- **Unit tests**: Utility functions and hooks
- **Component tests**: React Testing Library, test user interactions
- **Integration tests**: Critical user flows
- **E2E tests**: Complete user journeys (Playwright)
- **Arrange-Act-Assert**: Clear test structure
- **Mock external deps**: Firebase, API calls

### Performance Optimization
- **React.memo**: For expensive components
- **useMemo/useCallback**: Judiciously, not everywhere
- **Dynamic imports**: Code splitting for large components
- **Next.js Image**: All images must use next/image
- **Suspense boundaries**: Better loading states
- **Bundle analysis**: Run `pnpm build:analyze` regularly

## 🚀 Deployment

### Vercel Deployment
```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# Environment variables
vercel env add FIREBASE_PRIVATE_KEY production
```

### Build Status Requirements
- ✅ TypeScript compilation: Clean (0 errors)
- ✅ ESLint: < 200 warnings total
- ✅ Production build: Success
- ✅ Bundle optimization: Complete
- ✅ All tests passing: Required for merge

### Pre-deployment Checklist
1. `pnpm typecheck` - No TypeScript errors
2. `pnpm lint` - Within warning limits
3. `pnpm test` - All tests pass
4. `pnpm build` - Builds successfully
5. Test critical paths on staging
6. Verify Firebase indexes deployed
7. Check environment variables set

---

Remember: **HIVE succeeds when students choose it over Instagram for campus content.** Every line of code should make campus life easier, more fun, or more connected.
