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
```

### Code Quality
```bash
# TypeScript validation
NODE_OPTIONS="--max-old-space-size=4096" pnpm typecheck

# Linting (with memory optimization for large codebase)
NODE_OPTIONS="--max-old-space-size=4096" pnpm lint

# Quick lint (packages only)
pnpm lint:quick

# Clean builds and dependencies
pnpm clean:build
pnpm clean:node
```

### Testing
```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Storybook for UI components
pnpm storybook
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
- **apps/web**: Main Next.js 15.3.3 application (port 3000)
- **apps/admin**: Admin dashboard (port 3001)
- **packages/ui**: @hive/ui - Atomic design system (70+ components)
- **packages/core**: @hive/core - Business logic, Firebase models
- **packages/firebase**: @hive/firebase - Firebase integration layer
- **packages/auth-logic**: @hive/auth-logic - Authentication logic
- **packages/hooks**: @hive/hooks - Shared React hooks
- **packages/tokens**: @hive/tokens - Design tokens and CSS variables

### Critical Import Patterns
```typescript
// Always use package imports for shared code
import { Button, FormField } from '@hive/ui';
import { useAuth } from '@hive/auth-logic';
import { db, auth } from '@hive/firebase';
import type { User, Space } from '@hive/core';
```

### API Route Architecture
All API routes follow a consistent pattern with:
- **withAuthAndErrors**: Middleware wrapper for auth + error handling
- **Campus isolation**: All queries filter by `campusId: 'ub-buffalo'`
- **Rate limiting**: Applied to public endpoints
- **TypeScript validation**: Zod schemas for request/response

Example pattern:
```typescript
export const POST = withAuthAndErrors(async (req, user) => {
  // user is already authenticated
  // campus isolation is enforced
  // errors are handled automatically
});
```

## 🔐 Critical Security Patterns

### Firebase Query Pattern (MANDATORY)
```typescript
// ALWAYS include campus isolation
const query = query(
  collection(db, 'spaces'),
  where('campusId', '==', 'ub-buffalo'), // REQUIRED
  where('isActive', '==', true),
  orderBy('memberCount', 'desc')
);
```

### Authentication Flow
1. Email verification required (@buffalo.edu only for vBETA)
2. Firebase Auth sessions managed via cookies
3. Protected routes use middleware authentication
4. API routes wrapped with `withAuthAndErrors`

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

### Working with Spaces
- Spaces are pre-seeded RSS-fed communities
- All space queries must filter by campusId
- Space membership tracked in subcollections
- Posts are subcollections of spaces

### Feed Implementation
- Feed is read-only aggregation from spaces
- Real-time updates via SSE endpoints
- Cache strategy: Redis for performance
- Algorithm: Chronological with boost for engagement

## 🐛 Known Issues & Solutions

### Memory Issues During Build
```bash
# Always use increased memory for builds
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build
```

### TypeScript Performance
```bash
# Skip lib checking for faster compilation
NODE_OPTIONS="--max-old-space-size=4096" npx tsc --noEmit --skipLibCheck
```

### Package Resolution
- Use pnpm overrides in root package.json for version conflicts
- React/React-DOM locked to ^18.0.0 across monorepo

## 🔍 Debugging & Analysis

### Find Specific Route Patterns
```bash
# Find all API routes with auth
grep -r "withAuthAndErrors" apps/web/src/app/api

# Find campus isolation patterns
grep -r "campusId.*ub-buffalo" apps/web/src
```

### Component Location
- UI components: `packages/ui/src/atomic/`
- Page components: `apps/web/src/app/`
- Shared hooks: `packages/hooks/src/`
- Business logic: `packages/core/src/`

## 📝 Git Workflow

### Commit Standards
- Use conventional commits: `feat:`, `fix:`, `chore:`
- Reference issue numbers when applicable
- Keep commits atomic and focused

### Current Branch Strategy
- `main`: Production-ready code
- Feature branches: Short-lived, merge quickly
- No long-running branches

## 🎨 UI/UX Consistency

### Design System Usage
- Always use @hive/ui components
- Follow atomic design patterns
- Dark theme with gold accents (#FFD700)
- Mobile-first responsive design

### Component Hierarchy
1. Check if component exists in @hive/ui
2. Compose from existing atoms/molecules
3. Only create new if absolutely necessary
4. Add to Storybook if reusable

## 🔥 Firebase Architecture

### Collection Structure
```
users/                    // User profiles
spaces/                   // Community spaces
  └── posts/             // Space posts
      └── comments/      // Post comments
  └── members/           // Space membership
tools/                   // User-created tools
rituals/                 // Campus campaigns
schools/                 // University data
```

### Security Rules Pattern
- Campus isolation on all documents
- User permission validation
- Rate limiting on writes
- Optimistic UI with rollback

## ⚠️ Critical Warnings

1. **NEVER** skip campus isolation in queries
2. **NEVER** use hardcoded values for campusId (except 'ub-buffalo' for vBETA)
3. **NEVER** create mocks or stubs - production only
4. **ALWAYS** handle loading/error states
5. **ALWAYS** test on mobile viewport
6. **ALWAYS** use package imports for shared code

Remember: HIVE succeeds when students choose it over Instagram for campus content. Every line of code should make campus life easier, more fun, or more connected.