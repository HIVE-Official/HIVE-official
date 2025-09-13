# HIVE Code Organization Standards

## 🎯 Core Principles

### 1. Clear Module Boundaries
- Each package must have a single, well-defined responsibility
- No circular dependencies between packages
- Explicit exports through index files
- Strong encapsulation - internal implementation details should not leak

### 2. Consistent File Organization
```
feature/
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Business logic & utilities
├── types/           # TypeScript type definitions
├── api/             # API route handlers
└── __tests__/       # Test files
```

## 📁 Directory Structure Standards

### Apps Structure
```
apps/web/src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Shared components
│   ├── ui/               # Presentational components
│   ├── features/         # Feature-specific components
│   └── layouts/          # Layout components
├── lib/                   # Core utilities
│   ├── auth/             # Authentication logic
│   ├── firebase/         # Firebase configuration
│   ├── api/              # API utilities
│   └── utils/            # General utilities
├── hooks/                 # Custom React hooks
├── store/                 # State management
├── types/                 # Global type definitions
└── styles/               # Global styles
```

### Package Structure
```
packages/{package-name}/
├── src/
│   ├── index.ts          # Public API exports
│   ├── components/       # Package components
│   ├── hooks/           # Package hooks
│   ├── lib/             # Internal utilities
│   └── types/           # Package types
├── dist/                 # Build output
├── package.json
└── tsconfig.json
```

## 🔧 Import Standards

### Path Aliases
Configure these aliases in tsconfig.json:
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/hooks/*": ["./src/hooks/*"],
    "@/types/*": ["./src/types/*"],
    "@/api/*": ["./src/app/api/*"]
  }
}
```

### Import Order
1. External packages
2. Internal packages (@hive/*)
3. Absolute imports (@/*)
4. Relative imports (./*)
5. Type imports

Example:
```typescript
// External
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Internal packages
import { Button, Card } from '@hive/ui';
import { useDebounce } from '@hive/hooks';

// Absolute imports
import { authenticatedFetch } from '@/lib/auth';
import { PageContainer } from '@/components/layouts';

// Relative imports
import { LocalComponent } from './components/local-component';

// Type imports
import type { Space, User } from '@hive/core';
```

## 📝 Naming Conventions

### Files & Directories
- **Components**: PascalCase (e.g., `SpaceCard.tsx`)
- **Utilities**: camelCase (e.g., `authUtils.ts`)
- **Constants**: SCREAMING_SNAKE_CASE file (e.g., `API_CONSTANTS.ts`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.ts`)
- **API Routes**: kebab-case (e.g., `user-profile/route.ts`)

### Code Conventions
```typescript
// Components - PascalCase
export function SpaceCard() { }

// Hooks - camelCase with 'use' prefix
export function useSpaceData() { }

// Constants - SCREAMING_SNAKE_CASE
export const MAX_UPLOAD_SIZE = 5242880;

// Interfaces - PascalCase with 'I' prefix for non-domain types
interface IApiResponse { }

// Types - PascalCase
type SpaceType = 'public' | 'private';

// Enums - PascalCase with SCREAMING_SNAKE_CASE values
enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}
```

## 🏗️ Component Architecture

### Component Types
1. **Atoms**: Basic UI elements
   - Location: `packages/ui/src/atomic/atoms/`
   - Example: Button, Input, Badge

2. **Molecules**: Compound components
   - Location: `packages/ui/src/atomic/molecules/`
   - Example: FormField, SearchBar

3. **Organisms**: Complex features
   - Location: `packages/ui/src/atomic/organisms/`
   - Example: SpaceDashboard, FeedContainer

4. **Templates**: Page layouts
   - Location: `apps/web/src/components/layouts/`
   - Example: DashboardLayout, AuthLayout

### Component File Structure
```typescript
// SpaceCard.tsx
import { FC, memo } from 'react';
import type { SpaceCardProps } from './types';

// Component definition
const SpaceCard: FC<SpaceCardProps> = memo(({ space, onJoin }) => {
  // Hooks first
  const router = useRouter();
  const { user } = useAuth();
  
  // State
  const [isLoading, setIsLoading] = useState(false);
  
  // Computed values
  const isMember = useMemo(() => {
    return space.members.includes(user?.id);
  }, [space.members, user?.id]);
  
  // Handlers
  const handleJoin = async () => {
    // Implementation
  };
  
  // Render
  return (
    <div>...</div>
  );
});

SpaceCard.displayName = 'SpaceCard';

export { SpaceCard };
export type { SpaceCardProps };
```

## 🔌 API Route Standards

### Route Structure
```typescript
// app/api/spaces/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/auth';
import { validateRequest } from '@/lib/validation';
import { logger } from '@/lib/logger';

// Schema validation
const createSpaceSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['public', 'private'])
});

// GET handler
export const GET = withAuth(async (req: NextRequest, context) => {
  try {
    // Implementation
    return NextResponse.json({ data });
  } catch (error) {
    logger.error('Spaces GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});

// POST handler
export const POST = withAuth(async (req: NextRequest, context) => {
  try {
    const body = await req.json();
    const validated = createSpaceSchema.parse(body);
    // Implementation
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    logger.error('Spaces POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
```

## 🧪 Testing Standards

### Test File Location
- Unit tests: Same directory as source file
  - `SpaceCard.tsx` → `SpaceCard.test.tsx`
- Integration tests: `__tests__/integration/`
- E2E tests: `e2e/`

### Test Structure
```typescript
// SpaceCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { SpaceCard } from './SpaceCard';

describe('SpaceCard', () => {
  const mockSpace = {
    id: '1',
    name: 'Test Space',
    memberCount: 10
  };
  
  it('should render space information', () => {
    render(<SpaceCard space={mockSpace} />);
    expect(screen.getByText('Test Space')).toBeInTheDocument();
    expect(screen.getByText('10 members')).toBeInTheDocument();
  });
  
  it('should handle join action', async () => {
    const onJoin = jest.fn();
    render(<SpaceCard space={mockSpace} onJoin={onJoin} />);
    
    fireEvent.click(screen.getByRole('button', { name: /join/i }));
    expect(onJoin).toHaveBeenCalledWith(mockSpace.id);
  });
});
```

## 📦 Package Boundaries

### Package Responsibilities
- **@hive/ui**: Presentational components only, no business logic
- **@hive/core**: Domain models, business rules, types
- **@hive/hooks**: Reusable React hooks
- **@hive/auth-logic**: Authentication and authorization
- **@hive/api-client**: API communication utilities
- **@hive/validation**: Schema validation and sanitization

### Dependency Rules
```
apps/web → packages/*
packages/ui → packages/core, packages/hooks
packages/hooks → packages/core
packages/core → (no internal dependencies)
```

## 🚫 Anti-Patterns to Avoid

### ❌ Deep Relative Imports
```typescript
// Bad
import { Something } from '../../../../lib/utils';

// Good
import { Something } from '@/lib/utils';
```

### ❌ Mixed Concerns
```typescript
// Bad - UI component with API calls
function SpaceCard() {
  const handleJoin = async () => {
    const response = await fetch('/api/spaces/join');
    // ...
  };
}

// Good - Separated concerns
function SpaceCard({ onJoin }) {
  const handleJoin = () => {
    onJoin(space.id);
  };
}
```

### ❌ Inconsistent Error Handling
```typescript
// Bad - Silent failures
try {
  await doSomething();
} catch (error) {
  // Nothing
}

// Good - Proper error handling
try {
  await doSomething();
} catch (error) {
  logger.error('Operation failed:', error);
  toast.error('Something went wrong');
  throw error; // Re-throw if needed
}
```

### ❌ God Components
```typescript
// Bad - 1000+ line component doing everything

// Good - Split into smaller, focused components
<SpaceLayout>
  <SpaceHeader />
  <SpaceContent>
    <SpacePosts />
    <SpaceMembers />
  </SpaceContent>
  <SpaceSidebar />
</SpaceLayout>
```

## 🔄 Refactoring Checklist

When refactoring code, ensure:
- [ ] No circular dependencies
- [ ] Clear module boundaries
- [ ] Consistent naming conventions
- [ ] Proper error handling
- [ ] Type safety (no `any` types)
- [ ] Tests updated/added
- [ ] Documentation updated
- [ ] No console.logs in production code
- [ ] Proper loading states
- [ ] Accessibility attributes

## 📐 Code Review Standards

### Must Check
1. **Type Safety**: No `any` types, proper type definitions
2. **Error Handling**: All errors caught and handled appropriately
3. **Performance**: No unnecessary re-renders, proper memoization
4. **Security**: No exposed secrets, proper authentication
5. **Accessibility**: ARIA labels, keyboard navigation
6. **Testing**: New features have tests
7. **Documentation**: Complex logic is documented

### Code Metrics
- Function length: Max 50 lines
- File length: Max 300 lines
- Cyclomatic complexity: Max 10
- Import depth: Max 3 levels
- Component props: Max 7 props

## 🚀 Performance Standards

### Bundle Size
- Page JS: < 200KB (gzipped)
- First Load JS: < 100KB
- Lazy load heavy components
- Code split at route level

### React Performance
```typescript
// Use memo for expensive components
const ExpensiveComponent = memo(({ data }) => {
  // Component logic
});

// Use useMemo for expensive computations
const processedData = useMemo(() => {
  return heavyProcessing(rawData);
}, [rawData]);

// Use useCallback for stable references
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

## 📚 Documentation Standards

### Component Documentation
```typescript
/**
 * SpaceCard - Displays a space summary card
 * 
 * @component
 * @param {Space} space - The space data to display
 * @param {Function} onJoin - Callback when user joins the space
 * @param {boolean} [showActions=true] - Whether to show action buttons
 * 
 * @example
 * <SpaceCard 
 *   space={spaceData}
 *   onJoin={handleJoin}
 *   showActions={!isOwner}
 * />
 */
```

### API Documentation
```typescript
/**
 * GET /api/spaces
 * 
 * Fetches a list of spaces with optional filtering
 * 
 * @query {string} type - Filter by space type
 * @query {string} q - Search term
 * @query {number} limit - Max results (default: 50)
 * @query {number} offset - Pagination offset
 * 
 * @returns {Space[]} Array of space objects
 * @throws {401} Unauthorized
 * @throws {500} Internal server error
 */
```

## 🔐 Security Standards

### Input Validation
- Always validate user input
- Use zod schemas for validation
- Sanitize data before storage
- Escape output when rendering

### Authentication
- Check auth on every protected route
- Use middleware for consistent auth
- Never expose sensitive data in responses
- Implement rate limiting

### Environment Variables
- Never commit .env files
- Use strong, unique secrets
- Rotate keys regularly
- Document required env vars

## 📈 Monitoring & Logging

### Logging Standards
```typescript
import { logger } from '@/lib/logger';

// Info - Normal operations
logger.info('User joined space', { userId, spaceId });

// Warning - Potential issues
logger.warn('Rate limit approaching', { ip, requests });

// Error - Failures requiring attention
logger.error('Database connection failed', { error });

// Debug - Development only
logger.debug('Processing data', { data });
```

### Performance Monitoring
- Track API response times
- Monitor bundle sizes
- Track Core Web Vitals
- Set up error boundaries

---

## 🎯 Implementation Priority

1. **Immediate** (Week 1)
   - Fix import paths using aliases
   - Establish consistent file naming
   - Clean up any/unknown types

2. **Short-term** (Week 2-3)
   - Reorganize component structure
   - Implement error boundaries
   - Add loading states

3. **Medium-term** (Month 1)
   - Refactor large components
   - Add comprehensive tests
   - Implement monitoring

4. **Long-term** (Quarter)
   - Performance optimization
   - Documentation completion
   - Security audit