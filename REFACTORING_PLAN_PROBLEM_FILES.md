# Refactoring Plan for Problem Files
## HIVE Platform - January 2025

---

## 🔴 Priority 1: Onboarding Page (2,320 lines)
**File**: `apps/web/src/app/onboarding/page.tsx`

### Current Problems
- **Single file handling everything**: Authentication, validation, UI, animations, Firebase operations
- **41 inline function definitions** mixed with JSX
- **10+ onboarding steps** all defined inline (200+ lines each)
- **20+ useState hooks** managing complex state
- **No separation of concerns** - business logic mixed with presentation

### Refactoring Strategy

#### Step 1: Extract Components (Week 1)
Create dedicated component files:
```
src/components/onboarding/
├── OnboardingContainer.tsx       # Main orchestrator (150 lines)
├── steps/
│   ├── WelcomeStep.tsx          # Step 1 component (80 lines)
│   ├── IdentityStep.tsx         # Step 2 component (100 lines)
│   ├── AcademicInfoStep.tsx     # Step 3 component (120 lines)
│   ├── InterestsStep.tsx        # Step 4 component (90 lines)
│   ├── SpaceSelectionStep.tsx   # Step 5 component (110 lines)
│   └── CompletionStep.tsx       # Final step (60 lines)
├── hooks/
│   ├── useOnboardingState.ts    # State management (100 lines)
│   ├── useOnboardingProgress.ts # Progress tracking (50 lines)
│   └── useStepValidation.ts     # Validation logic (80 lines)
└── services/
    ├── onboardingService.ts      # API calls (120 lines)
    └── profileCreation.ts        # Profile setup (80 lines)
```

#### Step 2: Implement State Management Pattern
```typescript
// useOnboardingState.ts
interface OnboardingState {
  currentStep: number;
  profile: ProfileData;
  selections: SelectionData;
  validation: ValidationState;
}

const useOnboardingState = () => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);
  // Centralized state management
};
```

#### Step 3: Extract Business Logic
- Move Firebase operations to `onboardingService.ts`
- Move validation rules to `validationSchemas.ts`
- Move animation configs to `motionConfig.ts`

**Expected Result**: 10 files, each under 200 lines, with clear responsibilities

---

## 🔴 Priority 2: Space Dashboard (1,440 lines)
**File**: `apps/web/src/app/(dashboard)/spaces/[spaceId]/page.tsx`

### Current Problems
- **20 different hooks** being used
- **5 surface components** all rendered inline
- **Complex conditional rendering** logic throughout
- **Multiple modal states** managed locally
- **Error handling mixed with UI** rendering

### Refactoring Strategy

#### Step 1: Create Surface Manager Pattern
```typescript
// SpaceSurfaceManager.tsx
const SpaceSurfaceManager = ({ spaceId, activeSurface }) => {
  const surfaceComponents = {
    posts: PostsSurface,
    events: EventsSurface,
    members: MembersSurface,
    tools: ToolsSurface,
    pinned: PinnedSurface
  };
  
  const Surface = surfaceComponents[activeSurface];
  return <Surface spaceId={spaceId} />;
};
```

#### Step 2: Extract Sub-Pages
```
src/app/(dashboard)/spaces/[spaceId]/
├── page.tsx                    # Main router (100 lines)
├── components/
│   ├── SpaceHeader.tsx        # Header section (80 lines)
│   ├── SpaceNavigation.tsx    # Tab navigation (60 lines)
│   ├── SpaceSurfaceManager.tsx # Surface switcher (120 lines)
│   └── SpaceModals.tsx        # Modal management (100 lines)
├── surfaces/
│   ├── PostsSurface.tsx       # Posts view (150 lines)
│   ├── EventsSurface.tsx      # Events view (150 lines)
│   └── MembersSurface.tsx     # Members view (150 lines)
└── hooks/
    └── useSpaceData.ts         # Consolidated data fetching (100 lines)
```

#### Step 3: Implement Error Boundaries per Surface
```typescript
// Each surface wrapped in its own error boundary
<SurfaceErrorBoundary surface="posts">
  <PostsSurface />
</SurfaceErrorBoundary>
```

**Expected Result**: 12 focused files, improved error isolation, better testability

---

## 🔴 Priority 3: Firebase Admin (Console Logging Issues)
**File**: `apps/web/src/lib/firebase-admin.ts`

### Current Problems
- **17 console statements** that could expose sensitive data
- **Multiple credential formats** handled inline
- **No proper logging service** - using console directly
- **Sensitive error details** exposed in logs
- **Try-catch blocks with console.warn** fallbacks

### Refactoring Strategy

#### Step 1: Implement Proper Logger
```typescript
// lib/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({
      format: winston.format.simple(),
      silent: process.env.NODE_ENV === 'production'
    })
  ]
});

export const log = {
  info: (message: string, meta?: any) => logger.info(message, { ...meta, timestamp: new Date() }),
  error: (message: string, error?: Error) => logger.error(message, { 
    error: error?.message,
    stack: process.env.NODE_ENV !== 'production' ? error?.stack : undefined 
  }),
  warn: (message: string, meta?: any) => logger.warn(message, meta)
};
```

#### Step 2: Replace All Console Statements
```typescript
// Before
console.log("✅ Firebase Admin initialized with service account file");
console.warn("Failed to create certificate credential:", certError);

// After  
log.info("Firebase Admin initialized", { method: 'service_account' });
log.error("Failed to create certificate credential", certError);
```

#### Step 3: Sanitize Error Messages
```typescript
// Error sanitizer utility
const sanitizeError = (error: Error): string => {
  // Remove sensitive paths, credentials, etc.
  return error.message
    .replace(/\/home\/[^/]+/g, '/***')
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '***@***')
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '***-uuid-***');
};
```

**Expected Result**: Zero console statements, proper logging, no sensitive data exposure

---

## 🟡 Priority 4: Platform Integration (Poor Error Handling)
**File**: `apps/web/src/lib/platform-integration.ts`

### Current Problems
- **14 console.log statements**
- **Inconsistent error handling**
- **No error recovery mechanisms**
- **Silent failures in critical paths**

### Refactoring Strategy

#### Implement Circuit Breaker Pattern
```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailTime: Date | null = null;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailTime > 60000) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('Service temporarily unavailable');
      }
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
}
```

---

## 📊 Refactoring Metrics & Timeline

### Week 1-2: Component Extraction
- **Goal**: Break down files over 500 lines
- **Target**: No file over 300 lines
- **Metric**: Reduce average file size by 60%

### Week 3-4: Remove Console Statements
- **Goal**: Zero console statements in production code
- **Target**: Implement proper logging service
- **Metric**: 2,307 → 0 console statements

### Week 5-6: Error Handling Improvement
- **Goal**: Consistent error handling patterns
- **Target**: Error boundaries for all major components
- **Metric**: 100% of async operations with proper error handling

### Week 7-8: Type Safety
- **Goal**: Eliminate 'any' types
- **Target**: Full type coverage
- **Metric**: 727 → <50 'any' types

---

## 🛠️ Tooling Setup

### ESLint Rules to Prevent Regression
```javascript
// .eslintrc.js
module.exports = {
  rules: {
    'no-console': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    'max-lines': ['error', { max: 300 }],
    'complexity': ['error', { max: 10 }],
    'max-depth': ['error', { max: 3 }]
  }
};
```

### Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "bash -c 'if grep -q console\\. \"$0\"; then exit 1; fi'"
    ]
  }
}
```

---

## ✅ Success Criteria

1. **No file over 500 lines** (currently 129 files)
2. **Zero console statements** (currently 2,307)
3. **Test coverage over 40%** (currently 1.9%)
4. **All async operations have error handling**
5. **No 'any' types in critical paths**
6. **Average cyclomatic complexity < 10**
7. **Build success rate 100%**

---

## 💡 Quick Wins (Do Today)

1. **Run this command to remove all console statements**:
   ```bash
   find . -name "*.ts" -o -name "*.tsx" | xargs sed -i '/console\./d'
   ```

2. **Add ESLint rule to prevent new console statements**:
   ```bash
   npm install --save-dev eslint-plugin-no-console
   ```

3. **Create a logger service** (30 minutes):
   - Copy the winston logger code above
   - Replace most critical console.error statements

4. **Break down onboarding file** (2 hours):
   - Extract just the step components first
   - Leave state management for later

---

## 📈 Expected ROI

- **Development Speed**: +40% after refactoring
- **Bug Rate**: -60% with proper error handling  
- **Onboarding Time**: -50% with cleaner code
- **Test Writing**: 5x faster with smaller files
- **Code Review Time**: -70% with focused files

---

*Total Effort: 4-6 weeks for one developer*
*Priority: Start with onboarding file (highest impact)*