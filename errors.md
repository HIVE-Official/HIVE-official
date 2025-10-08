# Error and Warning Tracker

Monorepo TypeScript and ESLint status to target deployment readiness. Updated by Codex on migration/shadcn-foundation.

## Current State

- TypeScript: clean across all packages (`pnpm typecheck` passes)
- ESLint: high warning volume causing lint step to fail by package scripts; no fatal parse errors found in current scan

## Package Summaries (fresh scan)

- @hive/core (warnings only)
  - Top rules: `@typescript-eslint/no-unsafe-member-access` (412), `@typescript-eslint/no-explicit-any` (275), `@typescript-eslint/no-unsafe-assignment` (243), `@typescript-eslint/no-unsafe-argument` (97), `@typescript-eslint/no-unsafe-call` (89)
  - Top files:
    - packages/core/src/infrastructure/repositories/firebase/ritual.repository.ts (146)
    - packages/core/src/application/shared/temporary-types.ts (125)
    - packages/core/src/infrastructure/repositories/firebase/space.repository.ts (106)
    - packages/core/src/infrastructure/repositories/firebase/profile.repository.ts (98)
    - packages/core/src/infrastructure/repositories/firebase/feed.repository.ts (93)

- apps/web (warnings only)
  - Top rules: `@typescript-eslint/no-unused-vars` (393), `react-hooks/exhaustive-deps` (44), `@next/next/no-img-element` (9), `jsx-a11y/alt-text` (7)

- @hive/ui (warnings only)
  - Top rules: `@typescript-eslint/no-unused-vars` (135), `@typescript-eslint/no-explicit-any` (62), `@typescript-eslint/no-unsafe-assignment` (42), `@typescript-eslint/no-unsafe-member-access` (25), `storybook/csf-component` (24)

## Root Causes

- Core repositories depend on untyped Firestore `data()` and loose DTOs; pervasive `any` and unchecked property access lead to unsafe-* rule violations.
- `application/shared/temporary-types.ts` re-exports legacy shapes and introduces `any`, leaking into services and mappers.
- Web app has many stale or placeholder variables from migrations and incomplete effect dependency lists.
- UI contains scaffolded components/stories using `any` and leaving unused props; some stories not CSF compliant.

## Remediation Plan

- Core data layer
  - Define Firestore DTOs per collection and add type guards to narrow `data()` results.
  - Replace `any` with concrete types; convert generics to `unknown` where appropriate and assert safely.
  - Remove `application/shared/temporary-types.ts`; update imports to domain value objects and aggregates.

- Web
  - Remove unused variables; explicitly disable the rule only when placeholders are intentional.
  - Fix `useEffect` deps; memoize callbacks/selectors and include in dependency arrays.
  - Replace `<img>` with `next/image` and ensure `alt` text present.

- UI
  - Type component props precisely; eliminate `any`.
  - Update Storybook files to CSF3; ensure default export meta present and component stories follow conventions.

## Pre-commit Hook Blockers (Design Tokens)

- Hardcoded colors/spacings detected in: `packages/ui/src/atomic/atoms/button.tsx`, `packages/ui/src/atomic/atoms/hive-logo.tsx`, `packages/ui/src/atomic/molecules/hive-confirm-modal.tsx`, `packages/ui/src/legacy/hive-modal.tsx`, and specific lines in `form.tsx`.
- Action: replace with `@hive/tokens` semantic tokens and Tailwind spacing utilities; migration scripts listed in the hook (`migrate-tokens.js`, `migrate-final-hex-colors.js`) can accelerate this.

## Verification Commands

- TypeScript: `pnpm typecheck`
- ESLint JSON reports:
  - Core: `pnpm --filter @hive/core exec -- eslint . --format json --output-file ../../core-lint.json`
  - Web: `pnpm --filter web exec -- eslint . --format json --output-file ../../web-lint.json`
  - UI: `pnpm --filter @hive/ui exec -- eslint . --format json --output-file ../../ui-lint.json`

## Immediate Fix Queue

- Add DTOs + guards in: ritual.repository.ts, space.repository.ts, profile.repository.ts, feed.repository.ts, tool.repository.ts
- Remove `temporary-types.ts` and migrate usages
- Clean unused vars and fix effect deps in key web pages/components
- Replace hardcoded UI values with tokens to pass pre-commit

---

## 🎯 Team 2: @hive/ui Component Library (357 ISSUES)

**Priority:** 🔴 CRITICAL - Cleanup Needed
**Owner:** Frontend/Design System team
**Estimated effort:** 1 week

### Breakdown by Directory

| Directory                       | Errors | Warnings | Total   | Primary Issue       |
| ------------------------------- | ------ | -------- | ------- | ------------------- |
| `scripts/`                      | 25     | 0        | 25      | Node env issues     |
| `src/atomic/` + `src/Features/` | 44     | 269      | 313     | Unused vars/imports |
| `other`                         | 19     | 0        | 19      | Various             |
| **TOTAL**                       | **88** | **269**  | **357** |                     |

### Scripts Directory (25 ERRORS)

#### scripts/fix-imports.mjs (5 errors)

```javascript
94:1   error  'console' is not defined  no-undef
112:9  error  'console' is not defined  no-undef
123:5  error  'console' is not defined  no-undef
128:1  error  'console' is not defined  no-undef
130:3  error  'console' is not defined  no-undef
```

**Fix:** Add to top of file:

```javascript
/* eslint-env node */
```

#### scripts/create-component.ts (2 errors)

```typescript
99:7  error  'story' is never reassigned. Use 'const' instead
96:7  error  'story' is never reassigned. Use 'const' instead
```

**Fix:**

```typescript
// BEFORE
let story = `...`;

// AFTER
const story = `...`;
```

### Source Files (44 errors, 269 warnings)

**Pattern Analysis:**

- Unused icon imports: ~80 instances
- Unused component destructuring: ~40 instances
- React hook dependency warnings: ~30 instances

**Top Error Categories:**

1. **Unused imports (80+ warnings)**

```typescript
// Remove these if unused:
import { Calendar, Clock, Users, Settings } from "lucide-react";
```

2. **React Hook Dependencies (30 warnings)**

```typescript
// BAD
useEffect(() => {
  loadData();
}, []); // loadData missing from deps

// GOOD
useEffect(() => {
  loadData();
}, [loadData]); // OR wrap loadData in useCallback
```

---

## 🎯 Team 3: apps/web Application (628 ISSUES)

**Priority:** 🟡 MEDIUM - Code Quality
**Owner:** Product/Feature team
**Estimated effort:** 1-2 weeks

### Breakdown by Directory

| Directory         | Errors | Warnings | Total   | Primary Issue       |
| ----------------- | ------ | -------- | ------- | ------------------- |
| `src/components/` | 0      | 387      | 387     | Unused vars/imports |
| `src/app/`        | 0      | 154      | 154     | Page-level issues   |
| `src/lib/`        | 0      | 67       | 67      | Various             |
| **TOTAL**         | **0**  | **628**  | **628** |                     |

### High-Impact Files

#### src/lib/ (67 warnings)

**Empty catch blocks:**

```typescript
// admin-activity-logger.ts
276:21  warning  Empty block statement
296:21  warning  Empty block statement

// FIX: Add error handling
catch (error) {
  console.error('Operation failed:', error);
}
```

**Unused imports/vars (67 warnings):**

```typescript
// admin-auth.ts
1:13   warning  'admin' is defined but never used
187:3  warning  'adminId' is defined but never used
188:3  warning  'action' is defined but never used
[+60 more similar]
```

#### src/app/ (154 warnings)

**Unused imports (80+ warnings):**

```typescript
// feed/page.tsx
15:3   warning  'Plus' is defined but never used
18:3   warning  'Calendar' is defined but never used
27:3   warning  'Lock' is defined but never used
[+75 more icon imports]
```

**React hook warnings (30+ warnings):**

```typescript
// feed/page.tsx
75:9   warning  The 'toast' function makes dependencies change on every render
146:9  warning  The 'rituals' expression could make useMemo dependencies change
```

#### src/components/ (387 warnings)

**Pattern:** Mostly unused imports and destructured props

```typescript
// Typical pattern across 30+ files:
const Component = ({ variant, size, ...rest }: Props) => {
  // variant and size never used
  return <div {...rest} />;
}

// FIX: Remove unused props or use them
const Component = ({ ...rest }: Props) => {
  return <div {...rest} />;
}
```

---

## 📋 Implementation Plan - 3 Teams, 3 Weeks

### Week 1: Critical Fixes (All Teams)

**Team 1: Core Domain Types**

- [ ] Remove all unused imports (8 files)
- [ ] Fix feed-generation.service.ts type safety (highest impact)
- [ ] Fix ritual-participation.service.ts type safety
- [ ] Add type guards for Firebase snapshots (infrastructure layer)
- **Goal:** @hive/core errors drop from 34 → 0, warnings from 1,113 → ~500

**Team 2: UI Cleanup**

- [ ] Add `/* eslint-env node */` to all script files
- [ ] Fix syntax error in scripts/create-component.ts
- [ ] Change `let story` to `const story` (2 files)
- [ ] Remove ~80 unused icon imports from components
- **Goal:** @hive/ui errors drop from 88 → 25

**Team 3: Web App Quality**

- [ ] Remove unused imports from src/lib (67 warnings)
- [ ] Fix component prop destructuring (387 warnings)
- [ ] Fix React hook dependency warnings (30 instances)
- **Goal:** apps/web warnings drop from 628 → 300

### Week 2: Type Safety Foundation

**Team 1: Core Completion**

- [ ] Fix remaining `any` types in domain layer (145 warnings)
- [ ] Complete infrastructure type safety (518 warnings)
- [ ] **Goal:** @hive/core warnings drop from 500 → 200

**Team 2: Component Cleanup**

- [ ] Fix React hook dependency warnings (30 instances)
- [ ] Remove unused component destructuring (40 instances)
- [ ] **Goal:** @hive/ui warnings drop from 269 → 100

**Team 3: Page Cleanup**

- [ ] Remove unused vars from app pages (154 warnings)
- [ ] Fix React hook dependencies in pages
- [ ] **Goal:** apps/web warnings drop from 300 → 150

### Week 3: Polish & Optimization

**Team 2: UI Polish**

- [ ] Final cleanup of unused imports and variables
- [ ] Ensure all components follow design patterns
- [ ] **Goal:** @hive/ui warnings drop from 100 → 50

**Team 3: App Polish**

- [ ] Final cleanup of unused imports and variables
- [ ] Ensure all pages follow routing patterns
- [ ] **Goal:** apps/web warnings drop from 150 → 50

**Team 1: Core Polish**

- [ ] Final type safety improvements
- [ ] Ensure domain layer is fully typed
- [ ] **Goal:** @hive/core warnings drop from 200 → 50

---

## 🚀 Quick Win Sprint (Day 1 - 4 Hours)

**Goal:** Fix 200+ issues in 4 hours with zero risk

### Hour 1: Script Fixes (Team 2)

```bash
# Add to all .mjs and .js files in packages/ui/scripts:
# /* eslint-env node */

# Fix create-component.ts and generate-story.ts:
# Change `let story =` to `const story =`
```

**Impact:** -27 errors (100% of script errors)

### Hour 2: Remove Unused Imports (Team 1 & 3)

```bash
# Use eslint --fix for safe auto-fixes:
cd packages/core && npx eslint --fix src/
cd apps/web && npx eslint --fix src/
```

**Impact:** ~150 warnings auto-fixed

### Hour 3: Fix Component Props (Team 2 & 3)

```bash
# Remove unused destructured props:
# Change { variant, size, ...rest } to { ...rest }
```

**Impact:** ~200 warnings fixed

### Hour 4: React Hook Dependencies (Team 2 & 3)

```bash
# Fix missing dependencies or wrap in useCallback
```

**Impact:** ~50 warnings fixed

### Day 1 Total Impact

- **Errors:** 122 → 95 (-27 errors / -22%)
- **Warnings:** 2,010 → 1,810 (-200 warnings / -10%)
- **Build:** ✅ (PASSING)

---

## 📊 Progress Tracking

### Target Milestones

| Milestone                  | Errors | Warnings | Total | Status |
| -------------------------- | ------ | -------- | ----- | ------ |
| **Current State**          | 122    | 2,010    | 2,132 | 🔴     |
| **After Day 1 Quick Wins** | 95     | 1,810    | 1,905 | 🟠     |
| **After Week 1**           | 50     | 1,200    | 1,250 | 🟡     |
| **After Week 2**           | 25     | 600      | 625   | 🟡     |
| **After Week 3**           | 10     | 200      | 210   | 🟢     |
| **Target (Shippable)**     | <10    | <100     | <110  | ✅     |

### Definition of Done

**BLOCKERS RESOLVED (Required for deploy):**

- [ ] All packages pass `pnpm lint` with configured max-warnings
- [ ] Zero ESLint config errors
- [ ] Zero parsing errors

**TYPE SAFETY ACHIEVED (Required for maintainability):**

- [ ] No `any` types in feed generation (apps/web/src/app/feed)
- [ ] No `any` types in ritual participation
- [ ] All Firebase snapshots have type guards
- [ ] Core domain services <200 warnings

**CODE QUALITY (Nice to have):**

- [ ] No unused imports in new code
- [ ] React hook dependencies correct
- [ ] No unreachable code

---

## 🛠️ Automated Fixes Available

### ESLint Auto-Fix (Safe)

```bash
# Run across all packages:
pnpm lint:fix

# Fixes automatically:
# - Unused imports (can remove)
# - const vs let
# - Some React hook dependencies
```

**Expected Impact:** ~200 warnings auto-fixed

---

## 📞 Support & Escalation

### Blockers

- **Core type safety:** @noah (domain logic types)
- **UI cleanup:** @design-system-team (component decisions)
- **Web app quality:** @product-team (feature cleanup)

### Questions

1. Type safety target for core package? → Engineering standards decision
2. Timeline pressure for cleanup? → Product/sprint planning decision

---

## 📝 Commands Reference

### Check Individual Package

```bash
cd packages/[package-name]
npx eslint . 2>&1 | grep "✖"
```

### Get Detailed Errors

```bash
cd packages/[package-name]
npx eslint . 2>&1 | head -100
```

### Count by Type

```bash
npx eslint . 2>&1 | grep "error" | wc -l
npx eslint . 2>&1 | grep "warning" | wc -l
```

### Run Full Audit

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm lint 2>&1 | tee lint-output.txt
```

---

**Last Updated:** $(date)
**Generated By:** Claude Code Audit System
**Next Review:** After Week 1 sprint completion
