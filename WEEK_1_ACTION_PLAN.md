# 🚀 HIVE Platform - Week 1 Action Plan

**Priority**: Fix Critical Blockers  
**Goal**: Get to a clean, buildable state  
**Timeline**: 5-7 days of focused work

---

## Day 1: Production Build Fix 🔴

### Problem

```bash
> Build error occurred
[Error: Failed to collect page data for /waitlist/[schoolId]]
TypeError: e.createContext is not a function
```

### Root Cause

React Hook Form barrel optimization issue with Next.js 15

### Action Items

1. **Investigate waitlist page** (`apps/web/src/app/waitlist/[schoolId]/page.tsx`)
   - Check React Hook Form imports
   - Verify Context API usage
   - Test with barrel optimization disabled

2. **Try Quick Fixes** (in order):

   ```typescript
   // Option 1: Direct imports instead of barrel
   import { FormProvider } from "react-hook-form";
   import { Controller } from "react-hook-form";
   import { useFormContext } from "react-hook-form";

   // Option 2: Disable barrel optimization in next.config.js
   experimental: {
     optimizePackageImports: []; // Remove 'react-hook-form'
   }

   // Option 3: Dynamic import if needed
   const FormComponent = dynamic(() => import("./FormComponent"), {
     ssr: false,
   });
   ```

3. **Fix useToast import** in `apps/web/src/app/spaces/page.tsx`
   - Currently trying to import from `@hive/hooks`
   - Either add to exports or import from correct location

4. **Verify fix**:
   ```bash
   cd apps/web
   export NODE_OPTIONS="--max-old-space-size=4096"
   npx next build
   ```

**Success Criteria**: Production build completes without errors

---

## Day 2-3: ESLint Error Triage 🔴

### Current State

```
✖ 2,245 problems (1,038 errors, 1,207 warnings)
```

### Strategy: Categorize and Fix

#### Category 1: Type Definition Errors (9 files) - HIGH PRIORITY

```
/packages/ui/src/types/*.ts
Error: Couldn't find tsconfig.json
```

**Fix**:

1. Check if `packages/ui/tsconfig.json` exists
2. Verify ESLint config references correct tsconfig
3. Add missing type references

**Commands**:

```bash
cd packages/ui
ls -la tsconfig.json  # Verify exists
cat tsconfig.json     # Check configuration
```

#### Category 2: Template Parsing Errors (5 files) - HIGH PRIORITY

```
/packages/ui/templates/*.tsx
Error: Property destructuring pattern expected
```

**Fix**:

1. These are code generation templates, not actual code
2. Either exclude from linting or fix syntax
3. Add to `.eslintignore`:
   ```
   packages/ui/templates/
   ```

#### Category 3: Actual Code Issues (1,024 errors)

**Approach**: Fix by severity

1. Auto-fix what's possible:

   ```bash
   npx eslint . --fix --max-warnings 200
   ```

2. Manual triage remaining errors:

   ```bash
   npx eslint . --format json > eslint-errors.json
   # Parse JSON to categorize by rule type
   ```

3. Focus on critical rules first:
   - `no-unused-vars` - Remove dead code
   - `@typescript-eslint/no-explicit-any` - Add proper types
   - Import/export errors - Fix broken imports

**Success Criteria**: <50 errors, <200 warnings (production acceptable)

---

## Day 3-4: Middleware Migration Cleanup 🟡

### Current State

30 uncommitted modified files in API routes

### Decision Point

**Option A: Commit the changes** (if migration is complete)

- Review each modified file
- Ensure middleware pattern is correct
- Write comprehensive commit message
- Push changes

**Option B: Revert the changes** (if migration is incomplete)

- Save work to feature branch
- Revert main branch to stable state
- Complete migration properly in branch
- Merge when ready

### Review Checklist

For each modified file:

- [ ] Does it use `withAuthAndErrors` or `withAdminAuthAndErrors`?
- [ ] Are all parameters correctly typed?
- [ ] Does error handling work properly?
- [ ] Are success responses consistent?
- [ ] Is logging correctly structured?

### Commands

```bash
# Review changes
git diff apps/web/src/app/api/ | less

# If committing
git add apps/web/src/app/api/
git commit -m "refactor(api): Complete middleware consolidation

- Migrate 30 API routes to unified middleware pattern
- Standardize error handling and response formatting
- Add consistent logging across all routes
- Update documentation

Closes: middleware-migration
"

# If reverting
git stash save "WIP: Middleware migration - needs completion"
git checkout apps/web/src/app/api/
```

**Success Criteria**: All API files either committed or reverted, no uncommitted work

---

## Day 5: Documentation Honesty Pass 📝

### Update These Files

1. **PLATFORM_CURRENT_STATE.md**
   - Change "~95% (Build-ready)" to "65-70% (Development build)"
   - Update build status to reflect actual errors
   - Remove "production ready" claims

2. **docs/hive-vbeta-final-completion.md**
   - Add disclaimer at top: "ASPIRATIONAL - See PLATFORM_AUDIT_OCT_2025.md for actual state"
   - Keep as vision document, not status report

3. **memory-bank/checklist.md**
   - Add reality check section
   - Update completion percentages to realistic values
   - Mark items as "built but needs hardening"

4. **Create new: STATUS_REALITY.md**
   - Link to audit documents
   - Current state summary
   - Path to production
   - Weekly progress tracking

### Commands

```bash
# Update docs
code PLATFORM_CURRENT_STATE.md
code docs/hive-vbeta-final-completion.md
code memory-bank/checklist.md

# Create reality doc
code STATUS_REALITY.md
```

**Success Criteria**: Documentation accurately reflects current state

---

## Day 6-7: Quality Gate Verification ✅

### Run Full Quality Suite

1. **TypeScript Compilation**

   ```bash
   export NODE_OPTIONS="--max-old-space-size=4096"
   pnpm typecheck
   ```

   Expected: ✅ 0 errors (already passing)

2. **ESLint**

   ```bash
   npx eslint . --max-warnings 200
   ```

   Expected: ✅ <50 errors, <200 warnings (after fixes)

3. **Production Build**

   ```bash
   cd apps/web
   npx next build
   ```

   Expected: ✅ Build succeeds (after Day 1 fix)

4. **Test Suite**

   ```bash
   pnpm test
   ```

   Expected: ✅ All tests pass

5. **Measure Test Coverage**
   ```bash
   pnpm test:coverage
   ```
   Expected: 📊 Baseline measurement (probably <50%)

### Create Quality Dashboard

**File**: `QUALITY_METRICS.md`

```markdown
# HIVE Quality Metrics

**Last Updated**: [Date]

## Build Status

- [ ] TypeScript: 0 errors
- [ ] ESLint: <50 errors, <200 warnings
- [ ] Production Build: Success
- [ ] Tests: All passing

## Test Coverage

- **Overall**: X%
- **Core Package**: X%
- **Hooks Package**: X%
- **UI Package**: X%

## Performance

- **Lighthouse Score**: X/100
- **Bundle Size**: X MB
- **Build Time**: X minutes

## Deployment

- [ ] Staging: Success
- [ ] Production: Not yet deployed
```

**Success Criteria**: All quality gates documented and baseline established

---

## Week 1 Success Metrics

By end of Week 1, you should have:

### ✅ Must Achieve

1. Production build succeeds without errors
2. ESLint errors reduced to <50
3. All API files committed or reverted (no uncommitted work)
4. Documentation reflects actual state
5. Quality baseline established

### 🎯 Nice to Have

1. ESLint warnings <200
2. Test coverage measured and documented
3. Staging deployment successful
4. Team aligned on realistic timeline

---

## Commands Quick Reference

```bash
# Check current state
cd /Users/laneyfraass/hive_ui
export NODE_OPTIONS="--max-old-space-size=4096"

# Build
cd apps/web && npx next build

# Type check
pnpm typecheck

# Lint
npx eslint . --max-warnings 200

# Lint with auto-fix
npx eslint . --fix --max-warnings 200

# Test
pnpm test

# Test coverage
pnpm test:coverage

# Git status
git status --short
git diff --stat
```

---

## End of Week 1 Checklist

- [ ] Production build succeeds
- [ ] ESLint <50 errors, <200 warnings
- [ ] No uncommitted API route changes
- [ ] Documentation updated to reality
- [ ] Quality baseline documented
- [ ] Team briefed on actual status
- [ ] Week 2 plan created
- [ ] Blockers identified and documented

---

**Next**: See TODO.md for Week 2+ priorities (Security, Testing, Performance)

**Reference**:

- Full audit: `PLATFORM_AUDIT_OCT_2025.md`
- Executive summary: `AUDIT_EXECUTIVE_SUMMARY.md`
- Complete TODO: `TODO.md`
