# HIVE Codebase Map - AI Development Guide

## 🎯 Quick Navigation for Claude Code

### Critical Files to Check First
```
CLAUDE.md          → Project instructions & tech stack
HIVE_MAP.md        → This file - codebase navigation
turbo.json         → Build configuration
package.json       → Root dependencies & scripts
```

### 🏗️ Architecture Map

```
C:\hive\
├── apps/
│   ├── web/                        → Main Next.js app
│   │   ├── src/
│   │   │   ├── app/                → App router pages
│   │   │   │   ├── api/           → API routes
│   │   │   │   ├── (auth)/        → Auth pages
│   │   │   │   ├── (dashboard)/   → Protected pages
│   │   │   │   └── layout.tsx     → Root layout
│   │   │   ├── components/        → App-specific components
│   │   │   ├── lib/              → Utilities & Firebase
│   │   │   └── hooks/            → App-specific hooks
│   │   └── next.config.mjs       → Next.js config
│   │
│   └── admin/                      → Admin dashboard
│       └── [Similar structure]
│
├── packages/
│   ├── ui/                        → Component library ⚠️ BUILD ISSUE
│   │   ├── src/
│   │   │   ├── atomic/           → Atomic design components
│   │   │   │   ├── atoms/       → Basic elements
│   │   │   │   ├── molecules/   → Compound components
│   │   │   │   ├── organisms/   → Complex features
│   │   │   │   └── templates/   → Page layouts
│   │   │   ├── components/      → Legacy components
│   │   │   │   └── surfaces/    → 5-surface architecture
│   │   │   ├── design-system/   → Tokens & themes
│   │   │   └── hooks/          → Shared React hooks
│   │   └── index.ts            → Main exports
│   │
│   ├── core/                     → Business logic
│   │   └── src/
│   │       ├── domain/         → Domain models
│   │       ├── services/       → Business services
│   │       └── types/          → Shared types
│   │
│   ├── firebase-admin/          → Server-side Firebase
│   ├── auth-logic/             → Authentication logic
│   ├── validation/             → Zod schemas
│   └── utilities/              → Shared utilities
│
└── docs/                         → Documentation
```

## 📍 Where to Find What

### Feature Implementation Pattern
```
1. Domain Model      → packages/core/src/domain/{feature}.ts
2. Validation        → packages/validation/src/{feature}.schema.ts
3. API Route         → apps/web/src/app/api/{feature}/route.ts
4. UI Component      → packages/ui/src/atomic/organisms/{feature}.tsx
5. Page              → apps/web/src/app/(dashboard)/{feature}/page.tsx
6. Tests             → {location}/__tests__/{feature}.test.ts
```

### Common Tasks Location Map

| Task | Location |
|------|----------|
| Add new page | `apps/web/src/app/(dashboard)/` |
| Create API endpoint | `apps/web/src/app/api/` |
| Add UI component | `packages/ui/src/atomic/` |
| Define types | `packages/core/src/types/` |
| Add validation | `packages/validation/src/` |
| Firebase config | `apps/web/src/lib/firebase/` |
| Add hook | `packages/ui/src/hooks/` or `apps/web/src/hooks/` |
| Update theme | `packages/ui/src/design-system/` |

## 🔥 Firebase Structure Location

```
Collections:
- users/{userId}           → User profiles & preferences
- spaces/{spaceId}         → Campus spaces
  - /posts/{postId}       → Space posts
  - /events/{eventId}     → Space events  
  - /members/{userId}     → Space members
  - /tools/{toolId}       → Space tools
  - /pinned/{itemId}      → Pinned items
- tools/{toolId}          → HiveLab tools
- rituals/{ritualId}      → Recurring events
```

## 🎨 5-Surface Architecture

Each space has 5 surfaces (found in `packages/ui/src/components/surfaces/`):
1. **HivePostsSurface.tsx** - Social posts & discussions
2. **HiveEventsSurface.tsx** - Events & gatherings
3. **HiveMembersSurface.tsx** - Member directory
4. **HivePinnedSurface.tsx** - Important/pinned content
5. **HiveToolsSurface.tsx** - Space-specific tools

## 🛠️ Quick Commands

```bash
# Development
pnpm dev                 # Start dev server
pnpm build              # Build all apps (CURRENTLY FAILING)
pnpm typecheck          # Check TypeScript
pnpm lint               # Run ESLint

# Testing
pnpm test               # Run tests
pnpm test:e2e           # E2E tests
pnpm storybook          # Component library

# Package specific
pnpm --filter @hive/ui dev       # Dev specific package
pnpm --filter web build          # Build specific app
```

## ⚠️ Known Issues & Locations

1. **Build Error** → `packages/ui/src/index*.ts` - Case sensitivity issue
2. **TypeScript Errors** → Same as build error
3. **ESLint Warnings** → 164 warnings across codebase

## 🔍 Search Patterns for Claude

```typescript
// Find all API routes
Glob: "apps/web/src/app/api/**/route.ts"

// Find all surfaces
Glob: "packages/ui/src/components/surfaces/*.tsx"

// Find domain models
Glob: "packages/core/src/domain/*.ts"

// Find all pages
Glob: "apps/web/src/app/**/page.tsx"

// Find React hooks
Grep: "export.*use[A-Z].*function|export function use[A-Z]"
```

## 📝 AI Development Best Practices

1. **Always check these first:**
   - `CLAUDE.md` for project context
   - `package.json` for available dependencies
   - Existing patterns in similar files

2. **When creating new features:**
   - Follow the Feature Implementation Pattern above
   - Check existing surfaces for patterns
   - Use existing components from @hive/ui

3. **Before claiming completion:**
   - Run `pnpm typecheck`
   - Run `pnpm lint`
   - Test with real Firebase data
   - Check mobile responsiveness

4. **Context optimization:**
   - Use file paths like `packages/ui/src/atomic/atoms/button.tsx:45`
   - Reference specific functions/interfaces by name
   - Use Glob/Grep instead of reading entire directories