# HIVE Testing Guidelines & Patterns

## 🟡 Team Yellow Testing Standards

This document outlines the testing patterns, standards, and guidelines established by Team Yellow for the HIVE platform.

## Test Infrastructure

### Testing Stack
- **Test Runner**: Vitest
- **Component Testing**: @testing-library/react
- **E2E Testing**: Playwright
- **Coverage Reporting**: Vitest Coverage (v8)
- **Mocking**: Vitest vi utilities

### Directory Structure
```
apps/web/src/
├── test/
│   ├── setup.ts                 # Global test setup
│   ├── utils/
│   │   └── test-utils.tsx       # Testing utilities & custom render
│   ├── unit/
│   │   ├── api/                 # API route tests
│   │   ├── auth/                # Authentication tests
│   │   ├── components/          # Component tests
│   │   └── firebase/            # Firebase operation tests
│   ├── integration/             # Integration tests
│   └── e2e/                     # End-to-end tests
```

## Running Tests

### Available Commands
```bash
# Run all tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# Specific test types
npm run test:unit
npm run test:integration
npm run test:component
npm run test:e2e

# Quick smoke test
npm run test:quick
```

## Writing Tests

### Test File Naming
- Unit tests: `*.test.ts` or `*.test.tsx`
- Integration tests: `*.integration.test.ts`
- E2E tests: `*.spec.ts`

### Test Structure Pattern
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup before each test
    vi.clearAllMocks();
  });

  describe('Feature Group', () => {
    it('should do something specific', () => {
      // Arrange
      const mockData = createMockData();

      // Act
      render(<Component data={mockData} />);

      // Assert
      expect(screen.getByText('Expected')).toBeInTheDocument();
    });
  });
});
```

## Testing Utilities

### Custom Render Function
Use the custom render from `test-utils.tsx` for consistent test setup:

```typescript
import { render } from '@/test/utils/test-utils';

// Renders with all providers
render(<Component />, {
  user: createMockUser(),
  isLoading: false,
});
```

### Mock Data Factories
Use factory functions for consistent test data:

```typescript
import {
  createMockUser,
  createMockSpace,
  createMockPost,
  createMockProfile,
} from '@/test/utils/test-utils';

const user = createMockUser({ email: 'test@buffalo.edu' });
const space = createMockSpace({ type: 'academic' });
```

## Testing Patterns

### 1. Authentication Testing
```typescript
describe('Authentication', () => {
  it('should validate UB email addresses', () => {
    const isValidEmail = (email: string) => email.endsWith('@buffalo.edu');

    expect(isValidEmail('student@buffalo.edu')).toBe(true);
    expect(isValidEmail('external@gmail.com')).toBe(false);
  });

  it('should handle magic link verification', async () => {
    // Mock Firebase auth
    const mockSignIn = vi.fn();

    await verifyMagicLink('valid-link');

    expect(mockSignIn).toHaveBeenCalled();
  });
});
```

### 2. Campus Isolation Testing
All tests must verify campus isolation:

```typescript
it('should enforce campus isolation', () => {
  const query = createQuery({ campusId: 'ub-buffalo' });

  expect(query.where).toContain(['campusId', '==', 'ub-buffalo']);
});
```

### 3. Firebase Operations Testing
```typescript
describe('Firestore Operations', () => {
  it('should add campusId to all documents', async () => {
    const doc = await createDocument('spaces', { name: 'Test' });

    expect(doc.campusId).toBe('ub-buffalo');
    expect(doc.createdAt).toBeDefined();
  });
});
```

### 4. Component Testing
```typescript
describe('SpaceCard', () => {
  it('should render space information', () => {
    const space = createMockSpace();
    render(<SpaceCard space={space} />);

    expect(screen.getByText(space.name)).toBeInTheDocument();
    expect(screen.getByText(`${space.memberCount} members`)).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const onJoin = vi.fn();
    render(<SpaceCard space={space} onJoin={onJoin} />);

    fireEvent.click(screen.getByText('Join Space'));

    await waitFor(() => {
      expect(onJoin).toHaveBeenCalledWith(space.id);
    });
  });
});
```

### 5. API Route Testing
```typescript
describe('Feed API', () => {
  it('should return paginated results', async () => {
    const response = await fetchFeed({ limit: 20, cursor: null });

    expect(response.items).toHaveLength(20);
    expect(response.hasMore).toBeDefined();
    expect(response.nextCursor).toBeDefined();
  });
});
```

## Mocking Strategies

### Mocking Firebase
```typescript
vi.mock('@hive/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signInWithEmailLink: vi.fn(),
  },
  db: {},
}));
```

### Mocking Next.js
```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/',
}));
```

### Mocking API Calls
```typescript
const mockFetch = vi.fn();
global.fetch = mockFetch;

mockFetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: 'test' }),
});
```

## Coverage Requirements

### Minimum Coverage Targets
- **Overall**: 30% (current)
- **Target**: 70% by launch
- **Critical paths**: 90%

### Critical Paths to Test
1. Authentication flow (magic link)
2. Space creation and joining
3. Post creation and interactions
4. Profile updates
5. Campus isolation enforcement

## Error Handling Tests

Always test error scenarios:

```typescript
it('should handle network errors gracefully', async () => {
  mockFetch.mockRejectedValueOnce(new Error('Network error'));

  const result = await fetchWithRetry('/api/feed');

  expect(result.error).toBe('Network unavailable');
});

it('should handle rate limiting', async () => {
  const response = await makeRequest('/api/spaces', { requestCount: 11 });

  expect(response.status).toBe(429);
  expect(response.error).toBe('Rate limit exceeded');
});
```

## Performance Testing

```typescript
it('should render large lists efficiently', async () => {
  const items = Array.from({ length: 1000 }, (_, i) =>
    createMockPost({ id: `${i}` })
  );

  const start = performance.now();
  render(<VirtualList items={items} />);
  const duration = performance.now() - start;

  expect(duration).toBeLessThan(100); // Under 100ms
});
```

## Accessibility Testing

```typescript
it('should be keyboard navigable', () => {
  render(<NavigationMenu />);

  const firstItem = screen.getByRole('menuitem', { name: 'Feed' });
  firstItem.focus();

  fireEvent.keyDown(firstItem, { key: 'ArrowDown' });

  expect(screen.getByRole('menuitem', { name: 'Spaces' })).toHaveFocus();
});

it('should have proper ARIA labels', () => {
  render(<SpaceCard space={space} />);

  expect(screen.getByRole('button', { name: 'Join Space' })).toBeInTheDocument();
  expect(screen.getByLabelText('Space type')).toBeInTheDocument();
});
```

## Debugging Tests

### Debugging Tools
```typescript
// Print the DOM
screen.debug();

// Query specific elements
screen.getByTestId('element-id');

// Check what's rendered
screen.logTestingPlaygroundURL();
```

### Common Issues

1. **Async Issues**: Always use `waitFor` for async operations
2. **Provider Issues**: Use custom render with all providers
3. **Mock Leakage**: Clear mocks in `beforeEach`
4. **State Updates**: Wrap state updates in `act()`

## Best Practices

### DO ✅
- Write descriptive test names
- Test user behavior, not implementation
- Use data-testid for complex queries
- Mock external dependencies
- Test error cases
- Clear mocks between tests
- Use factory functions for test data

### DON'T ❌
- Test implementation details
- Use snapshot tests for logic
- Leave console.logs in tests
- Skip error scenarios
- Hardcode test data
- Test third-party libraries
- Write brittle selectors

## Continuous Integration

Tests run automatically on:
- Pull requests
- Pre-commit hooks (optional)
- Main branch merges

### CI Configuration
```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - run: pnpm install
    - run: pnpm test:ci
    - run: pnpm test:e2e:cross-browser
```

## Logging in Tests

Use the structured logger instead of console.log:

```typescript
import { logInfo, logError } from '@/lib/structured-logger';

// In tests, logger is mocked by default
logInfo('Test started', { testName: 'authentication' });
logError('Test failed', error, { context: 'api-call' });
```

## Test Maintenance

### Weekly Tasks
- Review failing tests
- Update test data factories
- Check coverage reports
- Remove obsolete tests

### Monthly Tasks
- Audit test performance
- Review testing patterns
- Update documentation
- Refactor slow tests

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Playwright Docs](https://playwright.dev)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

*Last Updated: December 2024*
*Maintained by: Team Yellow*