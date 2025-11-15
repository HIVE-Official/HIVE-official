# Auth & Onboarding Refactoring Plan
**Session**: refactor_2025_09_20_auth_onboarding
**Status**: Ready to Execute

## Executive Summary

We've identified **20+ API routes** with duplicate auth validation code and **10+ onboarding components** that can be consolidated. This refactor will eliminate ~1000 lines of duplicate code while improving maintainability and consistency.

## 🔥 Concrete Refactoring Examples

### Example 1: Auth Middleware Consolidation

#### BEFORE (Duplicated in 20+ files):
```typescript
// apps/web/src/app/api/spaces/[spaceId]/members/route.ts
export async function GET(request: NextRequest) {
  try {
    // 15+ lines of auth validation repeated everywhere
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        ApiResponseHelper.error("Missing or invalid authorization header", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const idToken = authHeader.substring(7);
    const auth = getAuth();

    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      logger.error('Invalid ID token', { error });
      return NextResponse.json(
        ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    if (!decodedToken?.uid) {
      return NextResponse.json(
        ApiResponseHelper.error("Invalid token data", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const userId = decodedToken.uid;

    // Actual business logic starts here...
  } catch (error) {
    // Error handling...
  }
}
```

#### AFTER (With new middleware):
```typescript
// apps/web/src/app/api/spaces/[spaceId]/members/route.ts
import { withAuth } from '@/lib/middleware/auth';

export const GET = withAuth(async (request, { user, params }) => {
  // Direct to business logic - auth handled by middleware
  const { spaceId } = params;
  const members = await getSpaceMembers(spaceId, user.uid);
  return NextResponse.json(ApiResponseHelper.success(members));
});
```

#### New Middleware:
```typescript
// apps/web/src/lib/middleware/auth.ts
export function withAuth<T extends RouteParams>(
  handler: AuthenticatedHandler<T>
): NextRouteHandler {
  return async (request: NextRequest, context: { params: T }) => {
    try {
      const authHeader = request.headers.get("authorization");

      if (!authHeader?.startsWith("Bearer ")) {
        return ApiResponseHelper.unauthorized("Missing or invalid authorization");
      }

      const idToken = authHeader.substring(7);
      const decodedToken = await verifyIdToken(idToken);

      if (!decodedToken?.uid) {
        return ApiResponseHelper.unauthorized("Invalid token");
      }

      // Call the actual handler with authenticated user
      return handler(request, {
        user: decodedToken,
        params: context.params
      });

    } catch (error) {
      return ApiResponseHelper.handleError(error);
    }
  };
}
```

### Example 2: Onboarding Step Consolidation

#### BEFORE (10 separate components):
```typescript
// apps/web/src/app/onboarding/components/steps/hive-name-step.tsx
export function HiveNameStep({ onNext, onPrevious, data }) {
  // 100+ lines for a simple name input
  // Lots of duplicate validation and UI logic
}

// apps/web/src/app/onboarding/components/steps/hive-handle-step.tsx
export function HiveHandleStep({ onNext, onPrevious, data }) {
  // Another 100+ lines, similar structure
  // Duplicate form handling logic
}

// ... 8 more similar files
```

#### AFTER (Configuration-driven):
```typescript
// apps/web/src/app/onboarding/config/steps.ts
export const ONBOARDING_STEPS: StepConfig[] = [
  {
    id: 'welcome',
    title: 'Welcome to HIVE',
    component: 'message',
    props: {
      message: 'Welcome to the campus social utility platform!',
      icon: 'rocket'
    }
  },
  {
    id: 'name',
    title: 'What\'s your name?',
    component: 'form',
    fields: [
      {
        name: 'fullName',
        type: 'text',
        label: 'Full Name',
        validation: z.string().min(1).max(100),
        placeholder: 'Enter your full name'
      }
    ]
  },
  {
    id: 'handle',
    title: 'Choose your handle',
    component: 'form',
    fields: [
      {
        name: 'handle',
        type: 'handle',
        label: '@handle',
        validation: handleSchema,
        asyncValidation: checkHandleAvailability,
        helpText: '3-20 characters, letters, numbers, ., _, -'
      }
    ]
  }
  // ... rest of steps as config
];

// apps/web/src/app/onboarding/components/OnboardingStepRenderer.tsx
export function OnboardingStepRenderer({ step, data, onNext, onPrevious }) {
  // Single component that renders all steps based on config
  // 50 lines instead of 1000+

  switch (step.component) {
    case 'message':
      return <MessageStep {...step.props} onNext={onNext} />;

    case 'form':
      return (
        <FormStep
          fields={step.fields}
          data={data}
          onSubmit={onNext}
          onBack={onPrevious}
        />
      );

    case 'choice':
      return <ChoiceStep {...step.props} onSelect={onNext} />;

    default:
      return null;
  }
}
```

### Example 3: Shared Validation Schemas

#### BEFORE (Duplicate validation):
```typescript
// Client-side (React component)
const validateHandle = (handle: string) => {
  if (handle.length < 3) return "Too short";
  if (handle.length > 20) return "Too long";
  if (!/^[a-zA-Z0-9._-]+$/.test(handle)) return "Invalid characters";
  return null;
};

// Server-side (API route)
const handleSchema = z.string()
  .min(3, "Handle must be at least 3 characters")
  .max(20, "Handle must be at most 20 characters")
  .regex(/^[a-zA-Z0-9._-]+$/, "Invalid characters");

// Service layer (different file)
export function validateHandleFormat(handle: string): boolean {
  return handle.length >= 3 &&
         handle.length <= 20 &&
         /^[a-zA-Z0-9._-]+$/.test(handle);
}
```

#### AFTER (Single source of truth):
```typescript
// packages/validation/src/schemas/user.ts
export const handleSchema = z.string()
  .min(3, "Handle must be at least 3 characters")
  .max(20, "Handle must be at most 20 characters")
  .regex(/^[a-zA-Z0-9._-]+$/, "Handle can only contain letters, numbers, ., _, and -")
  .transform(val => val.toLowerCase());

// Client-side usage
import { handleSchema } from '@hive/validation';
const validation = handleSchema.safeParse(value);

// Server-side usage (same import)
import { handleSchema } from '@hive/validation';
const validated = handleSchema.parse(body.handle);

// Service layer (same validation)
import { handleSchema } from '@hive/validation';
export const validateHandle = (handle: string) => handleSchema.safeParse(handle);
```

## Implementation Tasks

### Task 1: Create Auth Middleware ⏱️ 2 hours
- [ ] Create `withAuth()` wrapper function
- [ ] Add optional auth variant `withOptionalAuth()`
- [ ] Create admin auth variant `withAdminAuth()`
- [ ] Add rate limiting integration
- [ ] Write unit tests

### Task 2: Migrate API Routes ⏱️ 3 hours
- [ ] Update 20+ API routes to use new middleware
- [ ] Remove duplicate auth code
- [ ] Ensure consistent error responses
- [ ] Test all endpoints

### Task 3: Consolidate Types ⏱️ 1 hour
- [ ] Move user types to `@hive/core/types/user.ts`
- [ ] Create onboarding types in `@hive/core/types/onboarding.ts`
- [ ] Update all imports
- [ ] Fix TypeScript errors

### Task 4: Create Validation Package ⏱️ 2 hours
- [ ] Set up `@hive/validation` package
- [ ] Move all Zod schemas
- [ ] Create schema exports
- [ ] Update imports across codebase

### Task 5: Refactor Onboarding Components ⏱️ 3 hours
- [ ] Create step configuration system
- [ ] Build `OnboardingStepRenderer`
- [ ] Migrate individual steps
- [ ] Remove old components
- [ ] Test complete flow

### Task 6: Remove Temporary Code ⏱️ 1 hour
- [ ] Remove `onboarding-bridge-temp.ts`
- [ ] Clean up workarounds
- [ ] Update documentation
- [ ] Verify no regressions

## Files to Modify/Create

### New Files
```
lib/middleware/
├── auth.ts              # Main auth middleware
├── auth.test.ts         # Tests
└── index.ts             # Exports

packages/validation/
├── package.json
├── src/
│   ├── schemas/
│   │   ├── user.ts      # User validation schemas
│   │   ├── onboarding.ts # Onboarding schemas
│   │   └── common.ts    # Shared schemas
│   └── index.ts

app/onboarding/
├── config/
│   └── steps.ts         # Step configurations
└── components/
    └── OnboardingStepRenderer.tsx
```

### Files to Update (20+)
- All API routes with auth
- All onboarding step components
- Type imports across codebase
- Validation logic in components

### Files to Delete
- `onboarding-bridge-temp.ts`
- 10 individual step components (after migration)
- Duplicate validation utilities

## Validation Checklist

### Pre-Refactor
- [ ] All tests passing
- [ ] Build successful
- [ ] No TypeScript errors
- [ ] Document current behavior

### During Refactor
- [ ] Test after each phase
- [ ] Keep old code until verified
- [ ] Maintain backward compatibility
- [ ] Update affected tests

### Post-Refactor
- [ ] All endpoints working
- [ ] Onboarding flow complete
- [ ] No TypeScript errors
- [ ] Performance maintained
- [ ] Code coverage maintained
- [ ] Documentation updated

## Success Metrics

### Quantitative
- **Lines of Code**: -1000 lines (~40% reduction)
- **Duplicate Code**: 0 auth validation duplicates
- **Components**: 10 → 3 onboarding components
- **Bundle Size**: ~50KB smaller

### Qualitative
- ✅ Single source of truth for validation
- ✅ Consistent error messages
- ✅ Easier to add new auth methods
- ✅ Simpler onboarding customization
- ✅ Better developer experience

## Ready to Execute

This plan provides concrete, actionable steps to eliminate duplication in the auth and onboarding systems. Each task is scoped, with clear before/after examples showing the improvements.

**Estimated Total Time**: 12 hours
**Risk Level**: Low to Medium
**Value**: High - significant code reduction and maintainability improvement