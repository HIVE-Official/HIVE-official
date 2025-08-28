# Auth & Onboarding Brand Compliance Fixes

## Summary of Changes

This document outlines all the brand compliance fixes applied to the authentication and onboarding flows to ensure alignment with `docs/brand-design.md`.

### 1. Button Violations Fixed ✅

**Issue**: Buttons were using `bg-accent` (gold background) in violation of brand guidelines.
**Rule**: "DO NOT use gold/white as button fill (except ritual buttons)"

**Fixed in**:
- `apps/web/src/app/onboarding/[step]/onboarding-step-client.tsx`
  - Academic step "Continue" button
  - Interests step "Complete Setup" button
  - All buttons now use proper border-2 with transparent background
  - Interest selection pills updated to use border styling

### 2. Motion Timing Standardized ✅

**Issue**: Inconsistent transition durations (300ms, 600ms) instead of brand standard 180ms.
**Rule**: Use 180ms with cubic-bezier(0.33, 0.65, 0, 1)

**Fixed in**:
- `apps/web/src/app/auth/school-select/page.tsx`
  - All transitions updated from 600ms to 180ms
  - Added brand curve to all animations
- `apps/web/src/app/auth/choose/page.tsx`
  - Updated from 300ms/200ms to 180ms
  - Applied brand curve consistently
- `packages/ui/src/components/auth/school-pick.tsx`
  - Standardized hover transitions to 180ms

### 3. Component Standardization ✅

**Issue**: Inline button styling instead of using UI library components.

**Fixed in**:
- `apps/web/src/app/onboarding/[step]/onboarding-step-client.tsx`
  - Replaced all inline button elements with `<Button>` component
  - Applied proper variants: "default" for primary, "outline" for secondary
  - Leveraged built-in loading states

### 4. Color Compliance ✅

**Issue**: Using non-brand colors (red-500, gray-400).

**Fixed in**:
- `packages/ui/src/components/auth/email-form.tsx`
  - Error messages changed from `text-red-500` to `text-muted`
- `packages/ui/src/components/auth/CheckEmailInfo.tsx`
  - Updated from `text-gray-400` to `text-muted`
  - Changed `text-white` to `text-foreground`
- `apps/web/src/app/auth/email/page.tsx`
  - Updated to use semantic color tokens
  - Applied proper typography classes
- `apps/web/src/components/onboarding/steps/complete-step.tsx`
  - Removed `destructive` color usage
  - Updated error state to use surface/border styling

### 5. Typography Enhancement ✅

**Applied**:
- `font-display` for headlines (Space Grotesk)
- `font-sans` for body text (Geist Sans)
- Proper font weights and sizing

## Brand Design Principles Enforced

1. **Minimal Surface, Maximal Spark**
   - Removed unnecessary gold fills
   - Gold reserved for focus states and special moments

2. **Motion Philosophy**
   - Consistent 180ms transitions
   - Natural cubic-bezier curve for organic feel

3. **Component Consistency**
   - All interactive elements use shared UI components
   - Predictable behavior across the platform

4. **Color Discipline**
   - Monochrome base with gold accents only
   - No status colors (red/green/blue) in the interface

## Testing Recommendations

1. **Visual QA**: Review all auth/onboarding pages for brand consistency
2. **Motion Testing**: Verify smooth 180ms transitions
3. **Focus States**: Ensure gold focus rings are visible and consistent
4. **Accessibility**: Test keyboard navigation and screen readers

## Next Steps

1. Apply similar fixes to other areas of the application
2. Create Storybook stories for auth components
3. Implement "campus energy" adaptive features
4. Add progressive reveal patterns to onboarding

All changes have been linted and type-checked successfully.