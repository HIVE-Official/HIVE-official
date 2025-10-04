# HIVE Codebase Errors & Warnings - Complete Audit
**Generated:** 2025-10-03
**Command:** `pnpm lint` across all packages
**Total Issues:** ~2,561 problems (417 errors, 2,144 warnings)

---

## 📊 Executive Summary

| Package | Errors | Warnings | Total | Status |
|---------|--------|----------|-------|--------|
| **@hive/tokens** | 2 | 0 | 2 | 🔴 BLOCKS BUILD |
| **@hive/firebase** | 3 | 0 | 3 | 🔴 CONFIG |
| **@hive/auth-logic** | 3 | 0 | 3 | 🟠 TYPE SAFETY |
| **@hive/core** | 25 | 1,051 | 1,076 | 🟠 TYPE SAFETY |
| **@hive/ui** | 207 | 485 | 692 | 🔴 CLEANUP NEEDED |
| **apps/web** | 116 | 668 | 784 | 🟡 CODE QUALITY |
| **apps/admin** | 1 | 0 | 1 | 🟢 MINOR |
| **@hive/analytics** | 0 | 0 | 0 | ✅ CLEAN |
| **@hive/api-client** | 0 | 0 | 0 | ✅ CLEAN |
| **@hive/i18n** | 0 | 0 | 0 | ✅ CLEAN |
| **@hive/utilities** | 0 | 0 | 0 | ✅ CLEAN |
| **@hive/validation** | 0 | 0 | 0 | ✅ CLEAN |
| **@hive/hooks** | 0 | 0 | 0 | ✅ CLEAN |
| **TOTAL** | **417** | **2,144** | **2,561** | |

---

## 🎯 Team 1: Build Infrastructure & Config (CRITICAL - 8 ERRORS)
**Priority:** 🔴 BLOCKS BUILDS
**Owner:** DevOps/Infrastructure team
**Estimated effort:** 2-4 hours

### @hive/tokens (2 errors) - BLOCKING
```bash
packages/tokens/scripts/generate-css.d.ts:0:0
  error: "parserOptions.project" has been provided for @typescript-eslint/parser.
  The file was not found in any of the provided project(s): scripts/generate-css.d.ts

packages/tokens/scripts/generate-css.js:0:0
  error: "parserOptions.project" has been provided for @typescript-eslint/parser.
  The file was not found in any of the provided project(s): scripts/generate-css.js
```

**Root Cause:** `scripts/` directory not included in `tsconfig.json` but ESLint is trying to parse it with TypeScript parser

**Fix Options:**
```json
// Option 1: Add to tsconfig.json
{
  "include": ["src/**/*", "scripts/**/*"]
}

// Option 2: Add to eslint.config.js ignores
export default {
  ignores: ["scripts/**/*"]
}

// Option 3: Add /* eslint-env node */ to each script file
```

**RECOMMENDATION:** Option 2 (ignore scripts from linting) - fastest fix

### @hive/firebase (3 errors) - BLOCKING
```bash
packages/firebase/src/app-check.ts:0:0
  error: "parserOptions.project" has been provided for @typescript-eslint/parser.
  The file was not found in any of the provided project(s)

packages/firebase/src/index.ts:0:0
  error: Same error

packages/firebase/src/performance.ts:0:0
  error: Same error
```

**Root Cause:** Files exist but not included in `tsconfig.json` project references

**Fix:**
```json
// packages/firebase/tsconfig.json
{
  "include": [
    "src/**/*",
    "src/app-check.ts",
    "src/index.ts",
    "src/performance.ts"
  ]
}
```

### @hive/auth-logic (3 errors) - TYPE SAFETY
```typescript
// packages/auth-logic/src/hooks/use-auth.ts
39:31  error  Unexpected any. Specify a different type
39:47  error  Unexpected any. Specify a different type
42:13  error  Unexpected any. Specify a different type
```

**Fix:** Replace `any` with proper Firebase types:
```typescript
// BEFORE
const login = async (email: string, password: string): Promise<any> => { }

// AFTER
import { UserCredential } from 'firebase/auth';
const login = async (email: string, password: string): Promise<UserCredential> => { }
```

---

## 🎯 Team 2: @hive/core Domain Logic (1,076 ISSUES)
**Priority:** 🟠 HIGH - Type Safety Critical
**Owner:** Backend/Domain team
**Estimated effort:** 2-3 weeks

### Breakdown by Layer

| Layer | Errors | Warnings | Total | Primary Issue |
|-------|--------|----------|-------|---------------|
| `application/` | 12 | 380 | 392 | `any` types, unsafe operations |
| `infrastructure/` | 9 | 518 | 527 | Firebase type safety |
| `domain/` | 3 | 145 | 148 | Unused imports |
| **TOTAL** | **25** | **1,051** | **1,076** | |

### Top Problem Files

#### 1. application/feed-generation.service.ts (56 warnings + 3 errors)
```typescript
// ERRORS - Remove unused imports
11:10  error  'SpaceId' is defined but never used
12:10  error  'EnhancedProfile' is defined but never used
13:10  error  'EnhancedSpace' is defined but never used

// WARNINGS - 56 type safety warnings (sample)
98:47   warning  Unexpected any. Specify a different type
113:9   warning  Unsafe argument of type `any[]` assigned to `string[]`
125:40  warning  Unsafe argument of type `any[]` assigned to `FeedItem[]`
130:11  warning  Unsafe call of a(n) `any` typed value
130:13  warning  Unsafe member access .toData on an `any` value
[+46 more similar warnings]
```

**Impact:** Feed algorithm type safety - CRITICAL for production
**Fix Required:**
```typescript
// Replace all instances of:
const items: any[] = []
// With proper types:
const items: FeedItem[] = []

// Add type guards:
function isFeedItem(item: unknown): item is FeedItem {
  return typeof item === 'object' && item !== null && 'id' in item;
}
```

#### 2. application/ritual-participation.service.ts (62 warnings)
```typescript
24:27   warning  Unexpected any. Specify a different type
274:13  warning  Unsafe assignment of an `any` value
274:25  warning  Unsafe call of a(n) `any` typed value
280:54  warning  Unsafe argument of type `any` to `Milestone`
[+58 more]
```

**Fix:** Use proper domain types:
```typescript
import { RitualAggregate, Milestone, Participant } from '@/domain/rituals';
```

#### 3. application/profile-onboarding.service.ts (31 warnings + 3 errors)
```typescript
// ERRORS
12:10  error  'CampusId' is defined but never used
13:10  error  'UserType' is defined but never used
304:5  error  'interests' is assigned a value but never used

// WARNINGS
102:13  warning  Unsafe assignment of an `any` value
192:23  warning  Unsafe member access .email on an `any` value
[+28 more]
```

#### 4. infrastructure/repositories (527 warnings, 9 errors)
**Pattern:** Almost all Firebase snapshot operations lack type guards

```typescript
// CURRENT (unsafe):
const doc = await getDoc(docRef);
const data = doc.data(); // Returns any
return data.someField;

// SHOULD BE:
const doc = await getDoc(docRef);
const data = doc.data() as ProfileSnapshot | undefined;
if (!data) throw new Error('Document not found');
return data.someField;
```

### Core Package: Quick Wins

**High Impact, Low Effort (< 2 hours each):**

1. ✅ Remove 8 unused imports across services
2. ✅ Remove unused `interests` variable in profile-onboarding.service.ts
3. ✅ Remove unused `query` variables in query files
4. ✅ Fix 3 `Result` import issues in mappers

**Medium Effort (1-2 days each):**

5. Type all Firebase snapshots in infrastructure layer
6. Replace `any[]` with proper array types in feed-generation
7. Add type guards for all `.toData()` calls

---

## 🎯 Team 3: @hive/ui Component Library (692 ISSUES)
**Priority:** 🔴 CRITICAL - Cleanup Needed
**Owner:** Frontend/Design System team
**Estimated effort:** 1-2 weeks

### Breakdown by Directory

| Directory | Errors | Warnings | Total | Primary Issue |
|-----------|--------|----------|-------|---------------|
| `src/.atomic-backup/` | 126 | 0 | 126 | Not in tsconfig |
| `scripts/` | 25 | 0 | 25 | Node env issues |
| `src/atomic/` + `src/Features/` | 44 | 299 | 343 | Unused vars/imports |
| `other` | 12 | 186 | 198 | Various |
| **TOTAL** | **207** | **485** | **692** | |

### CRITICAL: .atomic-backup Directory (126 PARSING ERRORS)

**All files in `src/.atomic-backup/`:**
```
error: "parserOptions.project" has been provided for @typescript-eslint/parser.
The file was not found in any of the provided project(s)
```

**Affected Files (partial list):**
- atoms/*.tsx (40+ files)
- molecules/*.tsx (30+ files)
- organisms/*.tsx (50+ files)
- All index.ts files

**DECISION REQUIRED:**
```bash
# Option 1: DELETE (recommended if truly backup)
rm -rf packages/ui/src/.atomic-backup/

# Option 2: EXCLUDE from linting
# Add to eslint.config.js:
{
  ignores: ["src/.atomic-backup/**/*"]
}

# Option 3: INCLUDE in tsconfig (if still needed)
{
  "include": ["src/**/*"]  // Will pick up .atomic-backup
}
```

**RECOMMENDATION:** Option 1 (delete) - saves ~126 errors instantly

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

#### scripts/reorganize-stories.js (15 errors)
```javascript
12:12  error  A `require()` style import is forbidden
12:12  error  'require' is not defined
13:14  error  A `require()` style import is forbidden
13:14  error  'require' is not defined
114:28 error  '__dirname' is not defined
[+10 more console/require errors]
```

**Fix:** Add to top of file:
```javascript
/* eslint-env node */
```

#### scripts/fix-storybook-imports.js (1 SYNTAX ERROR)
```javascript
62:2  error  Parsing error: ',' expected
```

**Fix:** Check line 62 for syntax error - likely missing comma in object/array

#### scripts/create-component.ts + generate-story.ts (2 errors)
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

### Source Files (44 errors, 299 warnings)

**Pattern Analysis:**
- Unused icon imports: ~80 instances
- Empty catch blocks: ~15 instances
- Unused component destructuring: ~40 instances
- React hook dependency warnings: ~30 instances
- `<img>` instead of `<Image />`: ~20 instances

**Top Error Categories:**

1. **Empty catch blocks (15 errors)**
```typescript
// BAD
try {
  await something();
} catch (error) {
  // Empty
}

// GOOD
try {
  await something();
} catch (error) {
  console.error('Failed to do something:', error);
  toast.error('Operation failed');
}
```

2. **Unused imports (80+ warnings)**
```typescript
// Remove these if unused:
import { Calendar, Clock, Users, Settings } from 'lucide-react';
```

3. **React Hook Dependencies (30 warnings)**
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

## 🎯 Team 4: apps/web Application (784 ISSUES)
**Priority:** 🟡 MEDIUM - Code Quality
**Owner:** Product/Feature team
**Estimated effort:** 2-3 weeks

### Breakdown by Directory

| Directory | Errors | Warnings | Total | Primary Issue |
|-----------|--------|----------|-------|---------------|
| `src/components/` | 45 | 387 | 432 | Unused vars/imports |
| `src/app/` | 4 | 154 | 158 | Page-level issues |
| `src/lib/` | 50 | 67 | 117 | Empty catches, dead code |
| `scripts/middleware` | 0 | 11 | 11 | Backup files |
| **TOTAL** | **116** | **668** | **784** | |

### High-Impact Files

#### src/lib/ (50 errors, 67 warnings)

**Empty catch blocks (15+ errors):**
```typescript
// admin-activity-logger.ts
276:21  error  Empty block statement
296:21  error  Empty block statement

// admin-auth.ts
55:19   error  Empty block statement
65:19   error  Empty block statement
194:19  error  Empty block statement

// admin-notifications.ts
176:23  error  Empty block statement
222:21  error  Empty block statement

// cross-platform-notifications.ts
414:21  error  Empty block statement
453:21  error  Empty block statement
705:21  error  Empty block statement

// csrf-protection.ts
540:27  error  Empty block statement

// error-monitoring.ts
54:48   error  Empty block statement
```

**Unreachable code (1 error):**
```typescript
// cross-platform-notifications.ts
603:21  error  Unreachable code  no-unreachable
```

**Regex errors (2 errors):**
```typescript
// error-reporting.ts
146:28  error  Unnecessary escape character: \/
147:27  error  Unnecessary escape character: \/

// FIX: Remove backslash before forward slash
const pattern = /path\/to/;  // BAD
const pattern = /path/to/;   // GOOD
```

**Unused imports/vars (67 warnings):**
```typescript
// admin-auth.ts
1:13   warning  'admin' is defined but never used
187:3  warning  'adminId' is defined but never used
188:3  warning  'action' is defined but never used
[+60 more similar]
```

#### src/app/ (4 errors, 154 warnings)

**Empty catch blocks:**
```typescript
// feed/page.tsx
278:21  error  Empty block statement
286:21  error  Empty block statement
295:21  error  Empty block statement

// onboarding/page.tsx
53:28   error  Empty block statement
```

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

// admin/page.tsx
130:6  warning  React Hook useEffect missing dependency: 'loadDashboardData'

// spaces/[spaceId]/page.tsx
78:6   warning  React Hook useEffect missing dependency: 'loadSpace'
```

**Image optimization warnings (20+ warnings):**
```typescript
// profile/connections/page.tsx
296:29  warning  Using `<img>` - use `<Image />` instead
387:15  warning  Using `<img>` - use `<Image />` instead

// spaces/[spaceId]/page.tsx
155:13  warning  Using `<img>` - use `<Image />` instead
```

#### src/components/ (45 errors, 387 warnings)

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

## 🎯 DECISION MATRIX - Requires Sign-Off

### Critical Decisions Needed Before Work Begins

| Decision | Impact | Options | Recommendation | Blocker? |
|----------|--------|---------|----------------|----------|
| **Delete `.atomic-backup/`?** | -126 errors | 1) Delete<br>2) Exclude from lint<br>3) Include in tsconfig | **DELETE** (if truly backup) | 🔴 YES |
| **Delete `middleware-backup.ts`?** | -3 warnings | 1) Delete<br>2) Restore | **DELETE** | 🟢 NO |
| **Delete `page-v2.tsx` files?** | -9 warnings | 1) Delete<br>2) Complete migration | **DELETE** or complete migration | 🟢 NO |
| **Fix all `any` types?** | -1,051 warnings | 1) Fix all<br>2) Fix critical only<br>3) Suppress | **Fix critical files first** (feed, ritual, profile) | 🟠 PARTIAL |
| **Replace all `<img>`?** | -20 warnings | 1) Auto-fix<br>2) Manual review | **Auto-fix** with codemod | 🟢 NO |

### Quick Decision Script

```bash
# Run this to make quick decisions:
cd /Users/laneyfraass/hive_ui

# Decision 1: Check if .atomic-backup is referenced anywhere
grep -r "\.atomic-backup" --include="*.ts" --include="*.tsx" | grep -v "node_modules"

# Decision 2: Check if middleware-backup is imported
grep -r "middleware-backup" --include="*.ts" --include="*.tsx"

# Decision 3: Check if page-v2 is routed
grep -r "page-v2" --include="*.ts" --include="*.tsx"

# If no results, DELETE is safe
```

---

## 📋 Implementation Plan - 4 Teams, 4 Weeks

### Week 1: Critical Blockers (Team 1 + Team 3 Cleanup)

**Team 1: Infrastructure (2-4 hours)**
- [ ] Fix @hive/tokens ESLint config (add ignores)
- [ ] Fix @hive/firebase tsconfig.json (include missing files)
- [ ] Fix @hive/auth-logic `any` types (replace with Firebase types)
- [ ] **Goal:** Green `pnpm lint` for all packages

**Team 3: UI Cleanup (1 week)**
- [ ] **DECISION:** Delete or exclude `.atomic-backup/` (-126 errors)
- [ ] Add `/* eslint-env node */` to all script files
- [ ] Fix syntax error in `fix-storybook-imports.js:62`
- [ ] Change `let story` to `const story` (2 files)
- [ ] **Goal:** @hive/ui errors drop from 207 → 56

### Week 2: Type Safety Foundation (Team 2)

**Team 2: Core Domain Types (1 week)**
- [ ] Remove all unused imports (8 files)
- [ ] Fix feed-generation.service.ts type safety (highest impact)
- [ ] Fix ritual-participation.service.ts type safety
- [ ] Fix profile-onboarding.service.ts type safety
- [ ] Add type guards for Firebase snapshots (infrastructure layer)
- [ ] **Goal:** @hive/core errors drop from 25 → 0, warnings from 1,051 → ~500

### Week 3: Web App Quality (Team 4)

**Team 4: Apps/Web (1 week)**
- [ ] Fix all empty catch blocks (15 errors) - add error handling
- [ ] Remove unused imports from src/lib (67 warnings)
- [ ] Fix regex escaping issues (2 errors)
- [ ] Remove unreachable code (1 error)
- [ ] **DECISION:** Delete backup files (middleware-backup.ts, page-v2.tsx)
- [ ] **Goal:** apps/web errors drop from 116 → 85

### Week 4: Polish & Optimization (All Teams)

**Team 3: Component Cleanup**
- [ ] Remove ~80 unused icon imports from components
- [ ] Fix React hook dependency warnings (30 instances)
- [ ] Replace `<img>` with `<Image />` (20 instances)
- [ ] **Goal:** @hive/ui warnings drop from 485 → 200

**Team 4: Page Cleanup**
- [ ] Remove unused vars from app pages (154 warnings)
- [ ] Fix component prop destructuring (387 warnings)
- [ ] **Goal:** apps/web warnings drop from 668 → 300

**Team 2: Type Safety Completion**
- [ ] Fix remaining `any` types in domain layer (145 warnings)
- [ ] Complete infrastructure type safety (518 warnings)
- [ ] **Goal:** @hive/core warnings drop from 1,051 → 300

---

## 🚀 Quick Win Sprint (Day 1 - 4 Hours)

**Goal:** Fix 200+ issues in 4 hours with zero risk

### Hour 1: Config Fixes (Team 1)
```bash
# @hive/tokens - Add to eslint.config.js
export default {
  ignores: ["scripts/**/*"]
}

# @hive/firebase - Add to tsconfig.json
{
  "include": ["src/**/*"]
}

# @hive/auth-logic - Replace any types
import { UserCredential } from 'firebase/auth';
```
**Impact:** -8 errors (100% of blockers)

### Hour 2: UI Cleanup Decision (Team 3)
```bash
# IF .atomic-backup is not referenced:
rm -rf packages/ui/src/.atomic-backup/

# Add to all .mjs and .js files in packages/ui/scripts:
/* eslint-env node */

# Fix create-component.ts and generate-story.ts:
# Change `let story =` to `const story =`
```
**Impact:** -153 errors (126 backup + 25 scripts + 2 const)

### Hour 3: Remove Unused Imports (Team 2 & 4)
```bash
# Use eslint --fix for safe auto-fixes:
cd packages/core && npx eslint --fix src/

# Manually remove these 8 unused imports:
# - SpaceId, EnhancedProfile, EnhancedSpace (feed-generation.service.ts)
# - CampusId, UserType (profile-onboarding.service.ts)
# - query (2 files in application/feed and application/search)
# - Result (profile.mapper.ts)
```
**Impact:** -8 errors, ~50 warnings auto-fixed

### Hour 4: Empty Catch Blocks (Team 4)
```bash
# Find all empty catches:
grep -r "catch.*{[\s]*}" apps/web/src/lib

# Add minimal error handling to all 15 instances:
catch (error) {
  console.error('Operation failed:', error);
}
```
**Impact:** -15 errors

### Day 1 Total Impact
- **Errors:** 417 → 233 (-184 errors / -44%)
- **Blockers:** 8 → 0 (✅ ALL RESOLVED)
- **Build:** ❌ → ✅ (PASSING)

---

## 📊 Progress Tracking

### Target Milestones

| Milestone | Errors | Warnings | Total | Status |
|-----------|--------|----------|-------|--------|
| **Current State** | 417 | 2,144 | 2,561 | 🔴 |
| **After Day 1 Quick Wins** | 233 | 2,094 | 2,327 | 🟠 |
| **After Week 1** | 90 | 2,094 | 2,184 | 🟡 |
| **After Week 2** | 90 | 1,544 | 1,634 | 🟡 |
| **After Week 3** | 75 | 1,544 | 1,619 | 🟡 |
| **After Week 4** | 75 | 1,000 | 1,075 | 🟢 |
| **Target (Shippable)** | <50 | <500 | <550 | ✅ |

### Definition of Done

**BLOCKERS RESOLVED (Required for deploy):**
- [ ] All packages pass `pnpm lint` with configured max-warnings
- [ ] Zero ESLint config errors
- [ ] Zero parsing errors
- [ ] No empty catch blocks in critical paths

**TYPE SAFETY ACHIEVED (Required for maintainability):**
- [ ] No `any` types in feed generation (apps/web/src/app/feed)
- [ ] No `any` types in ritual participation
- [ ] All Firebase snapshots have type guards
- [ ] Core domain services <200 warnings

**CODE QUALITY (Nice to have):**
- [ ] All `<img>` replaced with `<Image />`
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

### Codemod Opportunities

#### 1. Replace `<img>` with `<Image />`
```bash
# Create codemod script:
npx jscodeshift -t transform-img-to-next-image.js apps/web/src
```

**Impact:** -20 warnings

#### 2. Add Error Handling to Empty Catches
```bash
# Find and replace pattern:
find . -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/catch.*{[\s]*}/catch (error) { console.error(error); }/g'
```

**Impact:** -15 errors (REVIEW CAREFULLY)

---

## 📞 Support & Escalation

### Blockers
- **Infrastructure issues:** @jacob (tokens, firebase config)
- **Domain types:** @noah (core package type safety)
- **Component library:** @design-system-team (UI cleanup decisions)

### Questions
1. Delete `.atomic-backup/`? → Needs product/design decision
2. Type safety target? → Engineering standards decision
3. Timeline pressure? → Product/sprint planning decision

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

**Last Updated:** 2025-10-03
**Generated By:** Claude Code Audit System
**Next Review:** After Week 1 sprint completion
