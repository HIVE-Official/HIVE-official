# HIVE Codebase Rules

## Architecture Rules

### 1. File Size Limits
- **Maximum file size**: 500 lines
- **Ideal file size**: 200-300 lines
- **Split large files** into logical modules

### 2. Import Consolidation

#### Logging
- **USE**: `import { logger } from "@/lib/logger"`
- **DO NOT CREATE**: New logger implementations
- **DO NOT USE**: structured-logger, audit-logger, admin-activity-logger (deleted)

#### Firebase
- **Client SDK**: `import { auth, db, storage } from "@/lib/firebase"`
- **Admin SDK**: `import { dbAdmin, authAdmin } from "@/lib/firebase-admin"`
- **Session**: `import { ... } from "@/lib/firebase-session"`
- **DO NOT CREATE**: New Firebase configuration files

#### Authentication
- **Server-side**: `import { getCurrentUser } from "@/lib/server-auth"`
- **Client-side**: Use Firebase auth directly or auth-utils
- **API Routes**: `import { authenticatedFetch } from "@/lib/auth-utils"`
- **DO NOT USE**: next-auth, auth-server (deleted)

#### Rate Limiting
- **Auth endpoints**: `import { authRateLimiter } from "@/lib/auth-rate-limiter"`
- **General APIs**: `import { ... } from "@/lib/rate-limit"`
- **DO NOT CREATE**: New rate limiting implementations

### 3. API Client Pattern
- **USE**: `authenticatedFetch` from auth-utils for authenticated requests
- **USE**: Standard `fetch` for public endpoints
- **DO NOT CREATE**: New API client wrappers

### 4. Session Management
- **USE**: `firebase-session.ts` for all session handling
- **DO NOT CREATE**: New session/cookie utilities

### 5. Error Handling
- **USE**: `try/catch` with proper error logging via logger
- **USE**: `api-error-handler.ts` for API routes
- **DO NOT CREATE**: New error handling systems

## Component Rules

### 1. Component Size
- **Maximum**: 300 lines per component
- **Split** into smaller sub-components if larger
- **Extract** hooks into separate files

### 2. File Organization
```
/components
  /feature-name
    index.tsx           // Main component
    hooks.ts           // Custom hooks
    utils.ts           // Helper functions
    types.ts           // TypeScript types
    sub-component.tsx  // Sub-components
```

### 3. State Management
- **Global state**: Use Zustand stores from @hive/hooks
- **Local state**: Use React hooks
- **Server state**: Use React Query

## Code Quality Rules

### 1. No Duplicate Implementations
- Check if functionality exists before creating new
- Consolidate similar functions
- Delete unused code immediately

### 2. No Over-Engineering
- Avoid "wrapper" patterns
- No "enhanced", "advanced", "secure" prefixes
- Keep it simple and direct

### 3. Documentation
- Comment WHY, not WHAT
- Keep comments concise
- Update or delete outdated comments

### 4. Testing
- Write tests for critical paths
- Delete tests for deleted features
- Keep test files next to source files

## Performance Rules

### 1. Bundle Size
- Lazy load heavy components
- Use dynamic imports for non-critical features
- Monitor bundle size regularly

### 2. Database Queries
- Limit Firestore queries to necessary fields
- Use pagination for lists
- Cache frequently accessed data

### 3. Real-time Updates
- Use real-time listeners sparingly
- Unsubscribe on component unmount
- Batch updates when possible

## Maintenance Rules

### 1. Regular Cleanup
- Delete unused files immediately
- Remove commented code
- Clean up TODO comments regularly

### 2. Dependency Management
- Audit dependencies monthly
- Remove unused packages
- Update security vulnerabilities

### 3. Code Reviews
- Enforce these rules in PR reviews
- Question new abstractions
- Prefer deletion over addition

## File Size Violations to Fix

These files exceed 500 lines and need splitting:
1. `app/onboarding/page.tsx` - 2,320 lines → Split into 5+ components
2. `app/(dashboard)/spaces/[spaceId]/page.tsx` - 1,440 lines → Split into 3+ components
3. `components/spaces/smart-space-discovery.tsx` - 1,164 lines → Split into smaller components
4. `app/(dashboard)/tools/builder/page.tsx` - 1,128 lines → Split into builder components
5. All other files over 500 lines need refactoring

## Deleted Patterns (DO NOT RECREATE)

These patterns have been removed and should not be recreated:
- Multiple logger implementations
- "Resilience" systems
- "Enhanced/Advanced/Secure" wrappers
- Duplicate Firebase configurations
- Multiple API client patterns
- Redundant session managers
- Over-engineered error handling systems

---

**Last Updated**: January 2025
**Enforced Since**: Major cleanup operation
**Total Files Deleted**: 60+ redundant files