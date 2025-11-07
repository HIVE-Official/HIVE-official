# HIVE Build Errors & Warnings Report
**Generated**: November 3, 2025
**Status**: 🔴 Build Failing

---

## Summary

- ✅ **TypeCheck**: PASSING (0 errors)
- 🔴 **Build**: FAILING (68 TypeScript errors in `@hive/ui`)
- 🔴 **Lint**: FAILING (ESLint config error)

---

## 🔴 Build Errors (68 total)

All errors are in `@hive/ui` package. Breaking down by category:

### Category 1: Badge Variant '"pill"' (19 errors)
**Issue**: Using unsupported badge variant `"pill"`
**Files affected**:
- `src/atomic/molecules/hivelab-lint-panel.tsx` (1)
- `src/atomic/molecules/hivelab-tool-library-card.tsx` (1)
- `src/pages/feed/FeedPage.tsx` (3)
- `src/pages/hivelab/HiveLabToolsPage.tsx` (2)
- `src/pages/onboarding/OnboardingFlowPage.tsx` (1)
- `src/pages/profile/ProfileOverviewPage.tsx` (3)
- `src/pages/spaces/SpaceCard.tsx` (2)
- `src/pages/spaces/SpacesDiscoveryPage.tsx` (1)

**Fix**: Change `variant="pill"` to a valid variant like `"default"` or `"outline"`, OR add "pill" to badge variants

---

### Category 2: Missing Icon Exports (3 errors)
**Issue**: Icons not exported from atoms
**Errors**:
- `CheckCircleIcon` not found (2 instances)
- `MegaphoneIcon` not found (1 instance)

**Files affected**:
- `src/atomic/molecules/ritual-progress-bar.tsx`
- `src/atomic/organisms/notification-toast-container.tsx`
- `src/atomic/organisms/feed-card-system.tsx`

**Fix**: Export missing icons from `packages/ui/src/atomic/atoms/index.ts`

---

### Category 3: Type Conflicts & Interface Issues (12 errors)
**Files affected**:
- `src/atomic/atoms/input.tsx` (2 errors - width property conflict)
- `src/atomic/molecules/notification-card.tsx` (title type)
- `src/atomic/organisms/space-post-composer.tsx` (onSubmit type)
- `src/layout/page-header.tsx` (2 errors - title type)
- `src/a11y/Measure.tsx` (children type)
- `src/atomic/atoms/action-sheet.tsx` (SheetContentProps naming)

---

### Category 4: Profile Bento Grid Errors (7 errors)
**Issue**: Missing `position` property on BentoCard objects
**File**: `src/atomic/molecules/profile-bento-grid.tsx`

**Fix**: Add `position` field to all BentoCard objects in defaultOwnProfileGrid and defaultOtherProfileGrid

---

### Category 5: Presence/PresenceStatus Conflicts (4 errors)
**Issue**: Duplicate export declarations
**Files**:
- `src/identity/presence.tsx`
- `src/atomic/organisms/profile-types.ts`
- `src/atomic/templates/profile-view-layout.tsx`

**Fix**: Consolidate PresenceStatus type into single source of truth

---

### Category 6: CSS & Style Issues (4 errors)
**Files affected**:
- `src/a11y/FocusRing.tsx` (CSS custom property typing)
- `src/atomic/molecules/feed-post-actions.tsx` (style prop not allowed)
- `src/layout/viewport-safe-area.tsx` (calc type assertion)

---

### Category 7: Missing Imports/Exports (5 errors)
- `CardContent` not found (2 instances in visual-tool-composer.tsx)
- `FeedLoadingSkeleton` duplicate export in index.ts
- `HTMLArticleElement` not found in feed-card-post.tsx
- `ProfileWidgetPrivacy` export conflict in profile-types.ts

---

### Category 8: Space/Motion Token Issues (4 errors)
**File**: `src/shells/components/ShellMobileNav.tsx`
**Issue**: Missing easing properties (`reveal`, `interactive`, `layout`)

**Fix**: Update `packages/tokens/src/motion.ts` to include missing easing curves

---

### Category 9: Misc Type Errors (10 errors)
- Event handler signatures (feed-card-event, feed-card-post, feed-card-tool - 3 errors)
- Badge tone property (HiveLabToolsPage - 1 error)
- Size prop type mismatches (ToolAnalyticsPage - 3 errors)
- Space type issues (space-board-layout, space-board-template - 3 errors)

---

## 🔴 Lint Errors

**Issue**: ESLint configuration error in `apps/web`
**Error**: Plugin "react-hooks" not found

**Fix**:
1. Ensure `eslint-plugin-react-hooks` is installed in web package
2. Update `apps/web/eslint.config.mjs` to properly import and register the plugin

---

## 📊 Error Breakdown by File

**Top 10 Files with Most Errors**:
1. `profile-bento-grid.tsx` - 7 errors (missing position property)
2. `space-board-template.tsx` - 5 errors (type mismatches)
3. `FeedPage.tsx` - 3 errors (badge pill variant)
4. `ProfileOverviewPage.tsx` - 3 errors (badge pill variant)
5. `ShellMobileNav.tsx` - 3 errors (missing motion tokens)
6. `ToolAnalyticsPage.tsx` - 3 errors (size prop type)
7. `page-header.tsx` - 2 errors (title type)
8. `input.tsx` - 2 errors (width property conflict)
9. `HiveLabToolsPage.tsx` - 2 errors (badge pill + tone)
10. `SpaceCard.tsx` - 2 errors (badge pill variant)

---

## ✅ Quick Win Fixes (Can fix in < 2 hours)

### Fix 1: Badge "pill" variant (30 min)
**Option A** - Replace with valid variant:
```bash
find packages/ui/src -name "*.tsx" -exec sed -i '' 's/variant="pill"/variant="default"/g' {} \;
```

**Option B** - Add "pill" to badge variants (better UX):
```typescript
// In packages/ui/src/atomic/atoms/badge.tsx
const badgeVariants = cva(
  "...",
  {
    variants: {
      variant: {
        default: "...",
        // ... other variants
        pill: "rounded-full px-3 py-1 text-xs", // Add this
      }
    }
  }
)
```

### Fix 2: Export missing icons (15 min)
```typescript
// In packages/ui/src/atomic/atoms/index.ts
export { CheckCircle as CheckCircleIcon, Megaphone as MegaphoneIcon } from 'lucide-react';
```

### Fix 3: Add position to BentoCards (15 min)
```typescript
// In packages/ui/src/atomic/molecules/profile-bento-grid.tsx
// Add position: 0, 1, 2... to each card in defaultOwnProfileGrid and defaultOtherProfileGrid
```

### Fix 4: Fix motion tokens (20 min)
```typescript
// In packages/tokens/src/motion.ts
export const easing = {
  liquid: [0.23, 1, 0.32, 1],
  magnetic: [0.25, 0.46, 0.45, 0.94],
  silk: [0.4, 0, 0.2, 1],
  reveal: [0.32, 0.72, 0, 1],      // Add
  interactive: [0.4, 0, 0.2, 1],    // Add
  layout: [0.25, 0.46, 0.45, 0.94], // Add
};
```

### Fix 5: ESLint config (10 min)
```bash
cd apps/web
pnpm add -D eslint-plugin-react-hooks
```

**Total Quick Fixes**: ~1.5 hours
**Estimated Errors Resolved**: ~35/68 (51%)

---

## 🎯 Recommended Action Plan

### Phase 1: Quick Wins (2 hours)
1. ✅ Fix badge "pill" variants (19 errors)
2. ✅ Export missing icons (3 errors)
3. ✅ Add position to BentoCards (7 errors)
4. ✅ Fix motion tokens (4 errors)
5. ✅ Fix ESLint config (lint blocker)

**Impact**: 33 errors fixed, lint working

### Phase 2: Type Fixes (3 hours)
1. Fix input width property conflict (2 errors)
2. Fix title type conflicts in headers (3 errors)
3. Fix onSubmit handler types (1 error)
4. Fix PresenceStatus duplicate exports (4 errors)
5. Fix style prop types (2 errors)

**Impact**: 12 errors fixed

### Phase 3: Remaining Issues (2 hours)
1. Fix CardContent imports (2 errors)
2. Fix space type issues (6 errors)
3. Fix event handler signatures (3 errors)
4. Clean up duplicate exports (2 errors)
5. Fix remaining misc errors (10 errors)

**Impact**: 23 errors fixed

**Total Estimated Time**: 7 hours
**Result**: ✅ Build passing, ready for integration testing

---

## Detailed Error List

<details>
<summary>All 68 Errors (click to expand)</summary>

```
src/a11y/FocusRing.tsx(49,5): error TS2353: Object literal may only specify known properties, and '"--focus-ring-color"' does not exist in type 'Properties<string | number, string & {}>'.
src/a11y/Measure.tsx(10,18): error TS2430: Interface 'MeasureProps' incorrectly extends interface 'HTMLAttributes<HTMLDivElement>'.
src/atomic/atoms/action-sheet.tsx(19,7): error TS4023: Exported variable 'ActionSheetContent' has or is using name 'SheetContentProps' from external module
src/atomic/atoms/input.tsx(45,18): error TS2320: Interface 'InputProps' cannot simultaneously extend types 'Omit<InputHTMLAttributes<HTMLInputElement>, "size">' and 'VariantProps<...>'.
src/atomic/atoms/input.tsx(98,55): error TS2322: Type 'string | number' is not assignable to type '"full" | "auto" | "fit"'.
src/atomic/molecules/feed-post-actions.tsx(130,9): error TS2322: Type '{ className: string; style: { color: string; }; }' is not assignable
src/atomic/molecules/hivelab-lint-panel.tsx(18,73): error TS2322: Type '"pill"' is not assignable to badge variant
src/atomic/molecules/hivelab-tool-library-card.tsx(19,44): error TS2322: Type '"pill"' is not assignable to badge variant
src/atomic/molecules/notification-card.tsx(12,18): error TS2430: Interface 'NotificationCardProps' incorrectly extends interface 'HTMLAttributes<HTMLDivElement>'.
src/atomic/molecules/profile-bento-grid.tsx(51,5): error TS2322: Property 'position' is missing in type '{ id: string; type: "spaces_hub"; size: "2x1"; visible: true; }'
src/atomic/molecules/profile-bento-grid.tsx(57,5): error TS2322: Property 'position' is missing in type '{ id: string; type: "friends_network"; size: "2x1"; visible: true; }'
src/atomic/molecules/profile-bento-grid.tsx(63,5): error TS2322: Property 'position' is missing in type '{ id: string; type: "active_now"; size: "1x1"; visible: true; }'
src/atomic/molecules/profile-bento-grid.tsx(69,5): error TS2322: Property 'position' is missing in type '{ id: string; type: "discovery"; size: "1x1"; visible: true; }'
src/atomic/molecules/profile-bento-grid.tsx(77,5): error TS2322: Property 'position' is missing in type '{ id: string; type: "spaces_hub"; size: "2x1"; visible: true; }'
src/atomic/molecules/profile-bento-grid.tsx(83,5): error TS2322: Property 'position' is missing in type '{ id: string; type: "friends_network"; size: "2x1"; visible: true; }'
src/atomic/molecules/profile-bento-grid.tsx(274,18): error TS2345: Argument of type '{ size: string; id: string; type: string; ... }[]' is not assignable to parameter of type 'GridCard[]'.
src/atomic/molecules/ritual-progress-bar.tsx(6,10): error TS2724: '"../atoms"' has no exported member named 'CheckCircleIcon'.
src/atomic/molecules/ritual-progress-bar.tsx(90,13): error TS2322: Property 'indicatorClassName' does not exist on type 'ProgressProps'
src/atomic/organisms/feed-card-event.tsx(112,17): error TS2322: Type '(event: any) => void' is not assignable to type '() => void'.
src/atomic/organisms/feed-card-post.tsx(73,26): error TS2552: Cannot find name 'HTMLArticleElement'.
src/atomic/organisms/feed-card-post.tsx(169,17): error TS2322: Type '(event: any) => void' is not assignable to type '() => void'.
src/atomic/organisms/feed-card-system.tsx(11,3): error TS2305: Module '"../atoms"' has no exported member 'MegaphoneIcon'.
src/atomic/organisms/feed-card-tool.tsx(129,17): error TS2322: Type '(event: any) => void' is not assignable to type '() => void'.
src/atomic/organisms/notification-system.tsx(133,57): error TS2339: Property 'message' does not exist on type 'never'.
src/atomic/organisms/notification-toast-container.tsx(7,3): error TS2724: '"../atoms"' has no exported member named 'CheckCircleIcon'.
src/atomic/organisms/profile-types.ts(76,20): error TS2339: Property 'personal' does not exist on type 'ProfileSystem'.
src/atomic/organisms/profile-types.ts(86,20): error TS2339: Property 'personal' does not exist on type 'ProfileSystem'.
src/atomic/organisms/profile-types.ts(87,26): error TS2339: Property 'personal' does not exist on type 'ProfileSystem'.
src/atomic/organisms/profile-types.ts(121,15): error TS2484: Export declaration conflicts with exported declaration of 'ProfileWidgetPrivacy'.
src/atomic/organisms/space-board-layout.tsx(82,13): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'SpaceHeaderSpace'.
src/atomic/organisms/space-board-layout.tsx(86,11): error TS2322: Type '"member" | "non_member"' is not assignable to type 'SpaceMembershipState'.
src/atomic/organisms/space-post-composer.tsx(9,18): error TS2430: Interface 'SpacePostComposerProps' incorrectly extends interface 'HTMLAttributes<HTMLDivElement>'.
src/atomic/organisms/space-post-composer.tsx(95,15): error TS2353: Object literal may only specify known properties, and 'color' does not exist in type 'ComposerSpace'.
src/atomic/templates/profile-view-layout.tsx(114,9): error TS2322: Type 'string' is not assignable to type 'PresenceStatus'.
src/atomic/templates/space-board-template.tsx(122,7): error TS2322: Property 'role' is missing in type '{ id: string; name: string; avatarUrl?: string; }'
src/atomic/templates/space-board-template.tsx(138,13): error TS2353: Object literal may only specify known properties, and 'icon' does not exist in type 'SpaceHeaderSpace'.
src/atomic/templates/space-board-template.tsx(142,11): error TS2322: Type '"member" | "non_member"' is not assignable to type 'SpaceMembershipState'.
src/atomic/templates/space-board-template.tsx(209,15): error TS2322: Property 'space' does not exist on type 'SpaceAboutWidgetProps'
src/atomic/templates/space-board-template.tsx(216,17): error TS2322: Property 'tools' does not exist on type 'SpaceToolsWidgetProps'
src/components/hivelab/visual-tool-composer.tsx(359,28): error TS2304: Cannot find name 'CardContent'.
src/components/hivelab/visual-tool-composer.tsx(373,29): error TS2304: Cannot find name 'CardContent'.
src/identity/presence.tsx(101,7): error TS2339: Property 'label' does not exist on type 'PresenceDotProps'.
src/identity/presence.tsx(182,15): error TS2484: Export declaration conflicts with exported declaration of 'PresenceStatus'.
src/identity/presence.tsx(182,31): error TS2484: Export declaration conflicts with exported declaration of 'PresenceDotProps'.
src/index.ts(89,3): error TS2300: Duplicate identifier 'FeedLoadingSkeleton'.
src/index.ts(199,10): error TS2300: Duplicate identifier 'FeedLoadingSkeleton'.
src/layout/page-header.tsx(26,18): error TS2430: Interface 'PageHeaderProps' incorrectly extends interface 'HTMLAttributes<HTMLDivElement>'.
src/layout/page-header.tsx(116,18): error TS2430: Interface 'SectionHeaderProps' incorrectly extends interface 'HTMLAttributes<HTMLDivElement>'.
src/layout/viewport-safe-area.tsx(66,7): error TS2322: Type '`calc(${string} + env(${string}))`' is not assignable to type 'Properties<...>'.
src/pages/feed/FeedPage.tsx(241,38): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/feed/FeedPage.tsx(274,43): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/feed/FeedPage.tsx(413,35): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/hivelab/HiveLabToolsPage.tsx(159,27): error TS2322: Property 'tone' does not exist on type 'BadgeProps'.
src/pages/hivelab/HiveLabToolsPage.tsx(172,57): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/hivelab/HiveLabToolsPage.tsx(215,45): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/hivelab/ToolAnalyticsPage.tsx(179,29): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "none" | "xs"'.
src/pages/hivelab/ToolAnalyticsPage.tsx(190,29): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "none" | "xs"'.
src/pages/hivelab/ToolAnalyticsPage.tsx(197,27): error TS2322: Type 'number' is not assignable to type '"sm" | "md" | "lg" | "xl" | "none" | "xs"'.
src/pages/onboarding/OnboardingFlowPage.tsx(72,34): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/profile/ProfileOverviewPage.tsx(144,52): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/profile/ProfileOverviewPage.tsx(182,47): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/profile/ProfileOverviewPage.tsx(219,59): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/spaces/SpaceCard.tsx(81,35): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/spaces/SpaceCard.tsx(95,45): error TS2322: Type '"pill"' is not assignable to badge variant
src/pages/spaces/SpacesDiscoveryPage.tsx(149,55): error TS2322: Type '"pill"' is not assignable to badge variant
src/shells/components/ShellMobileNav.tsx(54,56): error TS2339: Property 'reveal' does not exist on motion tokens
src/shells/components/ShellMobileNav.tsx(103,72): error TS2339: Property 'interactive' does not exist on motion tokens
src/shells/components/ShellMobileNav.tsx(115,72): error TS2339: Property 'layout' does not exist on motion tokens
```

</details>

---

## Next Steps

1. **Start with Phase 1 quick wins** (2 hours) - Fix 33 errors
2. **Run `pnpm build`** after each fix to verify progress
3. **Move to Phase 2** once quick wins are complete
4. **Resume integration testing** from TODO.md once build passes

---

**Last Updated**: November 3, 2025
**Next Review**: After Phase 1 fixes (est. 2 hours)
