# TypeScript Errors Fix Plan - HIVE Codebase
**Created**: 2025-09-20
**Total Errors**: 2,712 across 270 files
**Status**: CRITICAL - Build failing

## Root Cause Analysis

### Primary Issue Pattern (90% of errors)
The vast majority of errors are TypeScript type mismatches with UI components from `@hive/ui`:

1. **Component Prop Type Mismatches** (~2,400 errors)
   - `Type '{ ... }' is not assignable to type 'IntrinsicAttributes & ...Props'`
   - Affects: HiveButton, HiveBadge, Card components
   - Root Cause: Components are using incorrect prop type names

2. **Implicit Any Types** (~200 errors)
   - `Parameter '...' implicitly has an 'any' type`
   - Mainly in event handlers and callbacks

3. **Unknown Properties** (~100 errors)
   - Properties not existing on expected types
   - API response type mismatches

4. **Import/Module Issues** (~12 errors)
   - Missing imports or incorrect paths

## Fix Strategy

### Phase 1: Automated Component Prop Fixes (2,400 errors)
**Pattern**: All `HiveButtonProps` → `ButtonProps`, fixing variant props

#### Pattern Detection
```typescript
// WRONG - Current code pattern
Type '{ children: string; variant: string; }' is not assignable to type 'IntrinsicAttributes & HiveButtonProps'

// CORRECT - After fix
// variant must use actual variant names, not string
<HiveButton variant="primary">...</HiveButton>
```

#### Automated Fix Script
Create a script to:
1. Find all HiveButton/HiveBadge usage
2. Validate variant values against allowed variants
3. Fix prop type issues

### Phase 2: Implicit Any Fixes (200 errors)
**Pattern**: Add explicit types to all event handlers

#### Before
```typescript
onClick={(e) => { ... }}  // e is implicitly any
```

#### After
```typescript
onClick={(e: React.MouseEvent) => { ... }}
```

### Phase 3: API Type Fixes (100 errors)
- Update API response types
- Fix property access issues
- Add proper type guards

### Phase 4: Import Fixes (12 errors)
- Update import statements
- Fix module resolution

## Implementation Plan

### Step 1: Create Type Mapping Reference
```typescript
// Correct imports and types from @hive/ui
import {
  HiveButton,     // Component
  ButtonProps,    // Type (not HiveButtonProps!)
  HiveBadge,      // Component
  HiveBadgeProps, // Type (this one is correct)
  Card,           // Component
  CardProps       // Type
} from '@hive/ui';
```

### Step 2: Valid Variant Values
```typescript
// HiveButton variants
type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "success" | "warning";

// HiveBadge variants
type BadgeVariant = "freshman" | "sophomore" | "junior" | "senior" | "grad" | "phd" |
                    "tool-newbie" | "tool-builder" | "tool-expert" | "tool-legend" |
                    "night-owl" | "early-bird" | "grind-mode" | "study-streak" | ...;
```

### Step 3: Batch Fix Commands

#### Fix Button Variants (highest impact)
```bash
# Find all variant="string" patterns and replace with proper variants
grep -r 'variant="[^"]*"' src/ --include="*.tsx" | analyze_and_fix
```

#### Fix Event Handler Types
```bash
# Add React.MouseEvent to all onClick handlers missing types
grep -r 'onClick={(e)' src/ --include="*.tsx" | add_event_types
```

## Files to Fix (By Error Count)

### Critical Files (>40 errors)
1. `src/components/tools/tool-builder.tsx` - 51 errors
2. `src/test/design-system/atomic-consistency.test.tsx` - 52 errors
3. `src/test/components/atomic-components.test.tsx` - 50 errors
4. `src/components/admin/moderation-queue.tsx` - 48 errors
5. `src/app/(dashboard)/profile/settings/*.tsx` - 48 errors each

### High Priority (20-40 errors)
- Dashboard pages (admin, calendar, events, feed, profile)
- Space components and pages
- Tool system components
- Test files

### Medium Priority (10-20 errors)
- API routes
- Onboarding components
- Search and social components

### Low Priority (<10 errors)
- Utility files
- Middleware
- Configuration files

## Validation Metrics

### Success Criteria
- [ ] TypeScript compilation: 0 errors
- [ ] ESLint: <50 warnings
- [ ] Build: Successful
- [ ] Tests: Passing
- [ ] Type coverage: 100%

### Progress Tracking
- Phase 1: 0/2,400 component errors fixed
- Phase 2: 0/200 any type errors fixed
- Phase 3: 0/100 API type errors fixed
- Phase 4: 0/12 import errors fixed

## Risk Assessment
- **Risk Level**: LOW - All changes are type-only
- **Breaking Changes**: None - No runtime behavior changes
- **Testing Required**: Type checking only
- **Rollback Strategy**: Git revert if issues arise

## Next Actions
1. Start with automated component prop fixes (Phase 1)
2. Run TypeScript after each batch to measure progress
3. Commit working batches frequently
4. Complete all phases systematically

## Estimated Timeline
- Phase 1: 2-3 hours (automated fixes)
- Phase 2: 1 hour (event handler types)
- Phase 3: 1-2 hours (API types)
- Phase 4: 30 minutes (imports)
- **Total**: 4-6 hours for complete fix

## Commands to Execute

### Initial Assessment
```bash
npx tsc --noEmit 2>&1 | grep "error TS" | wc -l  # Count errors
npx tsc --noEmit 2>&1 | grep "error TS" | cut -d: -f1 | sort | uniq | wc -l  # Count affected files
```

### Monitor Progress
```bash
# Run after each phase
npm run typecheck
```

### Final Validation
```bash
npm run build
npm run lint
npm run test
```