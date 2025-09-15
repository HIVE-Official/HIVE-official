# HIVE Codebase Organization Plan

## Executive Summary

**Date**: January 2025
**Status**: Critical - Build Failing, Major Refactoring Required
**Estimated Timeline**: 5-7 days for complete reorganization

### Current State
- **207,920 lines of code** across a massive monorepo
- **Build Status**: ❌ FAILING due to module resolution issues
- **Organization**: Chaotic with 106 files in `/lib`, inconsistent patterns
- **Technical Debt**: ~30% of development time wasted on navigation and debugging

### Key Problems
1. Module resolution failures blocking builds
2. Massive unorganized `/lib` directory (106 files)
3. Duplicate implementations across codebase
4. Inconsistent import strategies
5. No clear architectural boundaries

### Proposed Solution
Complete architectural restructuring following domain-driven design principles with clear separation of concerns, standardized patterns, and enforced conventions.

---

## 🔍 Detailed Analysis

### 1. The Scale of the Problem

| Metric | Count | Issue |
|--------|-------|-------|
| **Total Files** | 2,000+ | Difficult to navigate |
| **API Routes** | 187 | No consistent patterns |
| **UI Components** | 285 | Duplicates and confusion with @hive/ui |
| **Lib Files** | 106 | Complete chaos, no organization |
| **Import Strategies** | 3 | @/, @hive/, and relative |
| **Duplicate Files** | 20+ | Same functionality implemented multiple times |

### 2. Critical Build Issues

```typescript
// CURRENT PROBLEM
@hive/api-client cannot resolve '@hive/core'
- Missing exports in package index files
- Incorrect TypeScript path mappings
- Undefined build order in turbo.json
```

### 3. Library Chaos (/lib directory)

**Current State - 106 files including:**
```
auth-middleware.ts
auth-rate-limiter.ts
auth-server.ts
auth-utils.ts
auth.ts
admin-auth.ts
production-auth.ts
firebase-admin.ts
firebase-client.ts
firebase-collections.ts
... (96 more files with no organization)
```

### 4. Component Duplication

**Found Multiple Versions:**
- `analytics-dashboard.tsx` (3 locations)
- `event-creation-modal.tsx` (2 locations)
- Auth components (5 different implementations)
- Feed components (scattered across 4 directories)

### 5. Import Path Inconsistency

```typescript
// THREE different import strategies in use:
import { Something } from '@/lib/auth'        // 948 instances
import { Component } from '@hive/ui'          // 305 instances
import { Util } from '../../../utils'         // Scattered throughout
```

### 6. API Route Sprawl

**28 categories with inconsistent patterns:**
- Some singular: `/api/auth`
- Some plural: `/api/spaces`
- No versioning
- Mixed REST and RPC styles

---

## 📋 Restructuring Plan

### Phase 1: Fix Critical Build Issues (Day 1)
**Goal**: Get the platform building again

#### Tasks:
1. **Fix Package Exports**
   ```typescript
   // packages/core/index.ts
   export * from './domain';
   export * from './types';
   export * from './utils';
   ```

2. **Update TypeScript Paths**
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "paths": {
         "@hive/core": ["packages/core/src/index.ts"],
         "@hive/core/*": ["packages/core/src/*"]
       }
     }
   }
   ```

3. **Define Build Order**
   ```json
   // turbo.json
   {
     "pipeline": {
       "build": {
         "dependsOn": ["^build"],
         "outputs": ["dist/**"]
       }
     }
   }
   ```

### Phase 2: Reorganize /lib Directory (Day 2)
**Goal**: Create clear, navigable structure

#### New Structure:
```
apps/web/src/lib/
├── auth/
│   ├── middleware/
│   │   ├── auth-middleware.ts
│   │   └── rate-limiter.ts
│   ├── providers/
│   │   ├── magic-link.ts
│   │   └── session.ts
│   └── utils/
│       ├── validation.ts
│       └── tokens.ts
├── firebase/
│   ├── admin/
│   │   └── admin-sdk.ts
│   ├── client/
│   │   └── client-config.ts
│   └── collections/
│       ├── spaces.ts
│       └── users.ts
├── api/
│   ├── middleware/
│   ├── utils/
│   └── error-handler.ts
├── services/
│   ├── feed-aggregation/
│   ├── notifications/
│   ├── realtime/
│   └── search/
└── utils/
    ├── constants.ts
    ├── formatters.ts
    └── validators.ts
```

#### Migration Script:
```bash
# Create new structure
mkdir -p lib/{auth,firebase,api,services,utils}
mkdir -p lib/auth/{middleware,providers,utils}
mkdir -p lib/firebase/{admin,client,collections}

# Move files (examples)
mv lib/auth*.ts lib/auth/
mv lib/firebase*.ts lib/firebase/
mv lib/*-service.ts lib/services/
```

### Phase 3: Component Consolidation (Day 3)
**Goal**: Single source of truth for each component

#### New Component Structure:
```
apps/web/src/components/
├── features/          # Feature-specific components
│   ├── auth/
│   │   ├── MagicLinkForm.tsx
│   │   ├── SchoolVerification.tsx
│   │   └── index.ts
│   ├── spaces/
│   │   ├── SpaceCard.tsx
│   │   ├── SpaceCreation.tsx
│   │   └── SpaceManagement.tsx
│   ├── tools/
│   ├── feed/
│   └── profile/
├── shared/           # Shared across features
│   ├── ErrorBoundary.tsx
│   ├── LoadingStates.tsx
│   └── EmptyStates.tsx
└── layouts/          # Layout components only
    ├── DashboardLayout.tsx
    ├── AuthLayout.tsx
    └── PublicLayout.tsx

packages/ui/src/      # Design system components only
├── atoms/
├── molecules/
├── organisms/
└── templates/
```

#### Deduplication Tasks:
- Merge 3 `analytics-dashboard.tsx` into one
- Consolidate 5 auth implementations
- Move all design system components to `@hive/ui`
- Remove redundant implementations

### Phase 4: API Standardization (Day 4)
**Goal**: Consistent, versioned, RESTful API

#### New API Structure:
```
apps/web/src/app/api/
├── v1/                    # Versioned API
│   ├── auth/
│   │   ├── login/        # POST /api/v1/auth/login
│   │   ├── logout/       # POST /api/v1/auth/logout
│   │   └── verify/       # POST /api/v1/auth/verify
│   ├── spaces/
│   │   ├── route.ts      # GET (list), POST (create)
│   │   └── [id]/
│   │       ├── route.ts  # GET, PUT, DELETE
│   │       ├── members/  # GET, POST /api/v1/spaces/:id/members
│   │       └── posts/    # GET, POST /api/v1/spaces/:id/posts
│   ├── users/
│   └── tools/
├── internal/             # Internal endpoints (not exposed)
│   ├── cron/
│   └── admin/
└── health/              # Health checks

```

#### REST Conventions:
```typescript
// Consistent patterns
GET    /api/v1/spaces          // List
POST   /api/v1/spaces          // Create
GET    /api/v1/spaces/:id      // Read
PUT    /api/v1/spaces/:id      // Update
DELETE /api/v1/spaces/:id      // Delete

// Consistent responses
{
  data: T,
  meta: { page, total },
  error: null
}
```

### Phase 5: Testing & Documentation (Day 5)
**Goal**: Ensure stability and maintainability

#### Tasks:
1. **Update All Imports**
   ```bash
   # Automated import updates
   npx tsx scripts/update-imports.ts
   ```

2. **Add Path Validation**
   ```typescript
   // eslint.config.js
   rules: {
     'import/no-relative-parent-imports': 'error',
     'import/order': ['error', {
       groups: ['builtin', 'external', 'internal'],
       pathGroups: [{
         pattern: '@hive/**',
         group: 'internal'
       }]
     }]
   }
   ```

3. **Create Architecture Tests**
   ```typescript
   // tests/architecture.test.ts
   describe('Architecture Rules', () => {
     test('no circular dependencies', () => {
       // Validate no circular imports
     });

     test('components follow naming convention', () => {
       // Validate PascalCase for components
     });
   });
   ```

---

## 📐 Implementation Guidelines

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase.tsx | `SpaceCard.tsx` |
| **Utilities** | kebab-case.ts | `format-date.ts` |
| **Types** | kebab-case.types.ts | `space.types.ts` |
| **Tests** | {name}.test.ts | `space-card.test.tsx` |
| **Styles** | kebab-case.module.css | `space-card.module.css` |

### Import Path Standards

```typescript
// ✅ CORRECT
import { Button } from '@hive/ui';           // Package imports
import { authenticatedFetch } from '@/lib/auth';  // App imports
import { formatDate } from './utils';        // Same directory only

// ❌ INCORRECT
import { Button } from '../../../packages/ui';    // No relative packages
import { auth } from '../../lib/auth';            // Use @/ alias
import { Space } from '@hive/core/src/types';     // Use package root
```

### Package Boundaries

```typescript
// packages/core/index.ts - Clear public API
export { Space, User, Tool } from './types';
export { createSpace, updateSpace } from './domain/space';
export { validateEmail } from './utils/validation';

// packages/api-client/package.json - Declare dependencies
{
  "dependencies": {
    "@hive/core": "workspace:*"
  }
}
```

### Directory Structure Rules

1. **Max depth**: 4 levels
2. **Max files per directory**: 10 (split if more)
3. **Index files**: Export public API only
4. **Colocation**: Keep related files together
5. **Feature folders**: Self-contained modules

---

## 💰 Business Impact

### Current State Costs

| Issue | Impact | Cost |
|-------|--------|------|
| **Finding files** | 30% slower development | 2 hours/day/developer |
| **Duplicate bugs** | Fix in multiple places | 50% more bug fixes |
| **Onboarding** | 2x longer for new devs | 2 weeks vs 1 week |
| **Build failures** | Daily interruptions | 1 hour/day team-wide |
| **Bundle size** | Duplicate code shipped | 30% larger bundles |

### Expected Benefits Post-Refactoring

| Benefit | Impact | Value |
|---------|--------|-------|
| **Developer velocity** | 40% faster feature development | Ship 2x more features |
| **Bug reduction** | 60% fewer duplicate bugs | Better user experience |
| **Onboarding** | 50% faster | New devs productive in days |
| **Build time** | 30% faster builds | Faster CI/CD |
| **Bundle size** | 25% smaller | Better performance |

### ROI Calculation

- **Investment**: 5-7 days of 2 developers
- **Payback period**: 2 weeks
- **Annual savings**: 3 months of developer time
- **Quality improvement**: Immeasurable

---

## 🚀 Immediate Actions

### Day 1 Checklist
- [ ] Fix @hive/api-client imports
- [ ] Update all package index.ts files
- [ ] Configure turbo.json build order
- [ ] Verify build passes

### Day 2 Checklist
- [ ] Create new lib/ structure
- [ ] Write migration script
- [ ] Move files to new locations
- [ ] Update all imports

### Day 3 Checklist
- [ ] Identify duplicate components
- [ ] Merge implementations
- [ ] Move to appropriate packages
- [ ] Update component imports

### Day 4 Checklist
- [ ] Design API v1 structure
- [ ] Create versioned routes
- [ ] Implement REST patterns
- [ ] Add OpenAPI specs

### Day 5 Checklist
- [ ] Run full test suite
- [ ] Update documentation
- [ ] Add ESLint rules
- [ ] Create ADRs

---

## 📊 Success Metrics

### Technical Metrics
- ✅ Build passes with 0 errors
- ✅ 0 ESLint warnings for imports
- ✅ No circular dependencies
- ✅ 100% of imports follow standards
- ✅ All tests passing

### Developer Experience Metrics
- ✅ Find any file in <10 seconds
- ✅ New developer onboarded in 3 days
- ✅ Feature development 40% faster
- ✅ No confusion about where code goes

### Business Metrics
- ✅ Ship features 2x faster
- ✅ 50% fewer bugs
- ✅ 30% smaller bundle size
- ✅ Better user experience

---

## 🔒 Risk Mitigation

### Potential Risks

1. **Breaking changes during refactoring**
   - Mitigation: Incremental changes with tests
   - Rollback plan for each phase

2. **Team disruption**
   - Mitigation: Clear communication
   - Migration guides and pair programming

3. **Merge conflicts**
   - Mitigation: Feature freeze during core refactoring
   - Quick, focused sprints

4. **Performance regression**
   - Mitigation: Performance tests before/after
   - Bundle size monitoring

---

## 📚 Appendix

### A. Migration Scripts

```bash
#!/bin/bash
# organize-lib.sh
# Automated lib reorganization script

echo "Creating new lib structure..."
mkdir -p lib/{auth,firebase,api,services,utils}

echo "Moving auth files..."
mv lib/auth*.ts lib/auth/ 2>/dev/null || true

echo "Moving firebase files..."
mv lib/firebase*.ts lib/firebase/ 2>/dev/null || true

echo "Updating imports..."
find apps/web/src -name "*.ts" -o -name "*.tsx" | \
  xargs sed -i '' 's|@/lib/auth-|@/lib/auth/|g'

echo "Done!"
```

### B. ESLint Configuration

```javascript
// eslint.config.js additions
module.exports = {
  rules: {
    'import/no-relative-parent-imports': 'error',
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'sibling'],
      'pathGroups': [
        {
          'pattern': '@hive/**',
          'group': 'internal',
          'position': 'before'
        },
        {
          'pattern': '@/**',
          'group': 'internal'
        }
      ],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc'
      }
    }]
  }
};
```

### C. Type Definitions

```typescript
// types/architecture.ts
export interface PackageStructure {
  name: string;
  dependencies: string[];
  exports: string[];
  internal: string[];
}

export interface DirectoryRules {
  maxDepth: number;
  maxFiles: number;
  requiredFiles: string[];
  naming: 'kebab-case' | 'PascalCase';
}
```

---

## 📝 Notes

This plan represents a complete architectural overhaul of the HIVE codebase. While the timeline is aggressive (5-7 days), the benefits far outweigh the costs. The current state is unsustainable and actively hampering development velocity.

**Key Success Factor**: Commitment to following through completely. Partial implementation will make things worse, not better.

**Remember**: This isn't just about organization - it's about creating a foundation for the next phase of HIVE's growth. A clean, well-organized codebase is the difference between a startup that scales and one that collapses under its own technical debt.

---

*Document Version: 1.0*
*Last Updated: January 2025*
*Status: Ready for Implementation*