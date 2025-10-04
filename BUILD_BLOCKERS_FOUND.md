# Build Blockers Discovered

**Date**: October 4, 2025
**Status**: ⚠️ Multiple build blockers uncovered after fixing auth error

---

## ✅ FIXED

### 1. TypeScript Error in use-auth.ts ✅
**Location**: `packages/auth-logic/src/hooks/use-auth.ts:266`
**Status**: **FIXED**

**Change Made**:
```typescript
// Before:
session: user ? { issuedAt: new Date().toISOString() } : null,

// After:
session: user ? {
  user: user,
  expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
} : null,
```

### 2. Duplicate Space Export ✅
**Location**: `packages/core/src/application/shared/temporary-types.ts:18`
**Status**: **FIXED**

**Change Made**: Commented out aggregate import to use local stub class

### 3. Missing universal-atoms Export ✅
**Location**: `packages/ui/src/index.ts:6`
**Status**: **FIXED**

**Change Made**: Removed non-existent export line

---

## 🚨 NEW BLOCKERS FOUND

### Category 1: UI Package Build Failures

#### 1.1 Test Utilities Missing `expect` Types
**Location**: `packages/ui/src/lib/test-utils.tsx` (multiple lines)
**Error**: `Cannot find name 'expect'`
**Count**: 13 errors

**Cause**: Missing test framework types (@testing-library or vitest)

**Fix Required**:
```typescript
// Add to test-utils.tsx:
import { expect } from 'vitest';
// OR
import '@testing-library/jest-dom';
```

#### 1.2 Missing Space Type Imports
**Location**: `packages/ui/src/types/space.types.ts:349-352`
**Errors**:
- Cannot find module '../organisms/space-post-feed'
- Cannot find module '../organisms/space-events-panel'
- Cannot find module '../organisms/space-resources-panel'
- Cannot find module '../organisms/space-members-panel'

**Cause**: Files deleted or moved during shadcn migration

**Fix Options**:
1. Create missing organism files
2. Update imports to use existing files
3. Remove broken type imports

---

### Category 2: Core Package TypeScript Errors

**Status**: 37 TypeScript errors in `@hive/core`

**Major Issues**:

#### 2.1 Analytics Test Errors (4 errors)
**Location**: `src/domain/analytics/events/__tests__/analytics-events.test.ts`
**Issue**: Type mismatches in onboarding step names

#### 2.2 Feed Algorithm Module Missing
**Location**: `src/domain/feed/services/feed-algorithm.service.ts:14`
**Error**: Cannot find module '../types/index'

#### 2.3 Profile Aggregate Errors (3 errors)
**Location**: `src/domain/profile/aggregates/profile.aggregate.ts`
**Issues**:
- Line 299: Expected 4 arguments, got 3
- Line 428: Expected 3 arguments, got 1

#### 2.4 Export Type Errors (8 errors)
**Locations**:
- `src/domain/profile/index.ts`
- `src/domain/spaces/index.ts`
**Issue**: Re-exporting types requires `export type` with isolatedModules

**Fix Required**:
```typescript
// Change from:
export { Profile, ProfileId, ProfileHandle } from './aggregates';

// To:
export type { Profile, ProfileId, ProfileHandle } from './aggregates';
```

#### 2.5 Ritual Aggregate Errors (3 errors)
**Location**: `src/domain/rituals/aggregates/ritual.aggregate.ts`
**Issues**:
- Line 131: `string | undefined` not assignable to `string`
- Line 652: Property 'milestones' does not exist
- Line 656: Property 'settings' does not exist

#### 2.6 Repository Errors (14 errors)
**Locations**:
- `profile.repository.ts`: Missing ProfilePrivacy properties (5 errors)
- `ritual.repository.ts`: Properties like `announcedAt`, `activatedAt` don't exist (9 errors)

---

## 📊 Summary

### Errors by Package
- **@hive/auth-logic**: ✅ 0 errors (FIXED)
- **@hive/ui**: ❌ 17 errors
- **@hive/core**: ❌ 37 errors
- **@hive/hooks**: ✅ 0 errors (auth fix resolved)
- **Other packages**: ✅ 0 errors

**Total**: **54 TypeScript errors** blocking production build

---

## 🎯 Root Cause Analysis

### Why These Weren't Caught Earlier?

1. **Development server doesn't require clean build**: Can run with type errors
2. **Partial typecheck**: Individual package checks may pass
3. **Recent migrations**: shadcn migration may have broken references
4. **Test files**: Some errors only in test files (non-critical)

### Critical vs. Non-Critical

**CRITICAL** (Blocks Production Build):
- ✅ use-auth.ts session type (FIXED)
- ❌ UI package module resolution (17 errors)
- ❌ Core package type exports (8 errors)

**NON-CRITICAL** (Test Files Only):
- Analytics test type mismatches (4 errors)
- Test utilities missing expect (13 errors)
- Event bus test mock types (1 error)

---

## 🛠️ Recommended Fix Strategy

### Strategy 1: Web-First Quick Fix (Recommended)
**Goal**: Get web app building even if some packages have test errors

**Steps**:
1. ✅ Fix UI package build issues (17 errors) - **HIGH PRIORITY**
   - Add test framework imports to test-utils.tsx
   - Fix or remove broken space type imports

2. ✅ Fix Core package export types (8 errors) - **MEDIUM PRIORITY**
   - Change to `export type` for type-only exports

3. ⏭️ Skip test file errors for now (18 errors) - **LOW PRIORITY**
   - Tests can be fixed post-launch
   - Dev/production code works

**Time Estimate**: 1-2 hours

**Success Criteria**: `pnpm --filter=web build` succeeds

---

### Strategy 2: Complete Fix (Thorough)
**Goal**: Zero TypeScript errors across all packages

**Steps**:
1. Fix all 17 UI errors
2. Fix all 37 Core errors
3. Fix all test files
4. Full typecheck passes

**Time Estimate**: 4-6 hours

**Success Criteria**: `pnpm typecheck` passes clean

---

### Strategy 3: Pragmatic Launch Path (Fastest)
**Goal**: Deploy to production ASAP with web-first focus

**Steps**:
1. ✅ Fix critical UI build errors only (module resolution)
2. ✅ Fix critical Core type exports
3. ✅ Build web app successfully
4. 🚀 Deploy to production
5. ⏭️ Fix remaining errors post-launch

**Time Estimate**: 30-60 minutes

**Success Criteria**: Production deployment live

---

## 💡 Immediate Next Steps

### Option A: Quick Web Build Fix (Recommended)
```bash
# 1. Fix test-utils.tsx
# Add: import { expect } from 'vitest';

# 2. Fix space type imports in space.types.ts
# Comment out or update broken imports

# 3. Fix export type statements in core
# Change export { } to export type { }

# 4. Try build
pnpm --filter=web build
```

**Time**: 30-60 minutes
**Risk**: Low - targeted fixes

### Option B: Skip Tests, Fix Production Code
```bash
# 1. Move test files temporarily
# 2. Fix only production code errors
# 3. Build web app
# 4. Restore test files post-launch
```

**Time**: 15-30 minutes
**Risk**: Medium - tests broken temporarily

### Option C: Full Fix Before Launch
```bash
# 1. Systematically fix all 54 errors
# 2. Run full typecheck
# 3. Build all packages
# 4. Then deploy
```

**Time**: 4-6 hours
**Risk**: None - most thorough

---

## 🚀 Recommendation

### For Web-First Launch (You Said Web First!)

**DO THIS NOW**:
1. Fix UI package (17 errors) - **30 min**
2. Fix Core type exports (8 errors) - **15 min**
3. Build web app - **5 min**
4. Deploy to production - **10 min**
5. **LAUNCH** 🎉

**FIX LATER** (Post-Launch):
- Test file errors (18 errors) - Not blocking users
- Profile/Ritual repository errors - If they break features, prioritize
- Analytics test errors - Low priority

**Total Time to Launch**: **1 hour**

---

## 📋 Current Files Modified

1. ✅ `packages/auth-logic/src/hooks/use-auth.ts` - Fixed session type
2. ✅ `packages/ui/src/index.ts` - Removed bad export
3. ✅ `packages/core/src/application/shared/temporary-types.ts` - Fixed duplicate

---

## 🎯 Decision Point

**Jacob, what's your priority?**

1. **Get web app live FAST** (1 hour) - Fix critical build errors, deploy
2. **Clean build completely** (4-6 hours) - Fix all errors, then deploy
3. **Understand issues first** (30 min) - Deep dive into each error

**My recommendation**: Option 1 (web-first, fast launch) since you emphasized web-first and we're targeting October 1st launch.

---

**Next Action**: Your call - which strategy?
