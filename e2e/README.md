# HIVE End-to-End Testing

## Overview
Comprehensive end-to-end testing suite for the HIVE platform using Playwright.

## Test Coverage
- **Authentication Flow**: Magic link login, onboarding, session management
- **Spaces**: Discovery, joining, creating, and managing spaces
- **Profile Management**: Profile editing, privacy settings, ghost mode, analytics
- **Accessibility**: WCAG compliance, keyboard navigation, screen reader support

## Running Tests

### Local Development
```bash
# Run all tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Debug specific test
pnpm test:e2e:debug auth.spec.ts

# View test report
pnpm test:e2e:report
```

### CI/CD
Tests run automatically on:
- Push to main, staging, or develop branches
- Pull requests
- Daily at 2 AM UTC

## Test Structure
```
e2e/
├── fixtures/          # Test data and auth fixtures
├── helpers/           # Page objects and utilities
├── tests/            # Test specifications
│   ├── auth.spec.ts
│   ├── spaces.spec.ts
│   ├── profile.spec.ts
│   └── accessibility.spec.ts
└── README.md
```

## Writing Tests

### Using Auth Fixtures
```typescript
import { test, expect } from '../fixtures/auth.fixture';

test('authenticated test', async ({ studentPage }) => {
  // studentPage is pre-authenticated as a student user
  await studentPage.goto('/dashboard');
});
```

### Using Page Objects
```typescript
import { SpaceHelper } from '../helpers/page-objects';

test('space interaction', async ({ page }) => {
  const spaceHelper = new SpaceHelper(page);
  await spaceHelper.createSpace('Test Space', 'Description');
});
```

## Environment Variables
- `PLAYWRIGHT_BASE_URL`: Base URL for tests (default: http://localhost:3000)
- `TEST_MODE`: Enable test mode for auth bypass (CI only)
- `CI`: Set by GitHub Actions for CI-specific behavior

## Debugging Failed Tests
1. Check test report: `pnpm test:e2e:report`
2. View screenshots in `test-results/`
3. Watch test videos for failures
4. Run specific test in debug mode: `pnpm test:e2e:debug <test-file>`

## Best Practices
- Use data-testid attributes for reliable element selection
- Keep tests independent and idempotent
- Use fixtures for common setup
- Mock external services when possible
- Test both happy and error paths
- Include accessibility tests for all new features