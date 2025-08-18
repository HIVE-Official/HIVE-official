# HIVE Authentication & Onboarding Tests

This directory contains comprehensive tests for the HIVE authentication and onboarding flow, including unit tests, integration tests, and end-to-end tests.

## Test Structure

```
src/test/
├── unit/                          # Unit tests for components and utilities
│   ├── auth/                      # Authentication component tests
│   └── onboarding/                # Onboarding component tests
├── integration/                   # API route integration tests
│   └── auth/                      # Authentication API tests
├── e2e/                          # End-to-end tests
│   ├── auth-flow-complete.spec.ts # Complete user flow tests
│   └── auth-edge-cases.spec.ts    # Error handling and edge cases
├── setup.ts                      # Test configuration and mocks
├── test-utils.tsx                # Custom testing utilities
├── global-setup.ts               # Playwright global setup
└── global-teardown.ts            # Playwright global teardown
```

## Running Tests

### Unit Tests
```bash
npm run test:unit          # Run unit tests once
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run with coverage report
```

### Integration Tests
```bash
npm run test:integration   # Run API integration tests
```

### End-to-End Tests
```bash
npm run test:e2e          # Run E2E tests headless
npm run test:e2e:headed   # Run E2E tests with browser UI
npm run test:e2e:debug    # Debug E2E tests
npm run test:e2e:ui       # Run with Playwright UI
```

### All Tests
```bash
npm run test:all          # Run all test suites
npm run test:ci           # Run tests for CI (with coverage)
```

## Test Coverage

### Unit Tests (86 tests)

**Authentication Components:**
- LoginPage: Email validation, magic link sending, error handling, development mode
- VerifyPage: Token verification, session management, error states, redirects
- OnboardingWizard: Step navigation, form validation, progress tracking, submission

**Key Test Areas:**
- ✅ Form validation and real-time feedback
- ✅ Development vs production mode handling
- ✅ Error boundary and graceful degradation
- ✅ Accessibility compliance (ARIA labels, keyboard nav)
- ✅ Loading states and user feedback
- ✅ State persistence during navigation

### Integration Tests (43 tests)

**API Routes:**
- `/api/auth/send-magic-link`: Rate limiting, school validation, email sending
- `/api/auth/verify-magic-link`: Token verification, user creation, session management
- `/api/auth/complete-onboarding`: Transaction processing, validation, post-onboarding flows

**Key Test Areas:**
- ✅ Request validation and security checks
- ✅ Database transactions and rollback scenarios
- ✅ External service integration (email, cohort creation)
- ✅ Error handling and audit logging
- ✅ Development mode bypasses and fallbacks

### End-to-End Tests (15 tests)

**Complete User Flows:**
- Happy path: School selection → Login → Onboarding → Dashboard
- Faculty-specific simplified onboarding flow
- Error handling and recovery scenarios
- Edge cases and browser compatibility

**Key Test Areas:**
- ✅ Complete authentication flow end-to-end
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari)
- ✅ Mobile responsiveness testing
- ✅ Network failure recovery
- ✅ Session persistence and state management
- ✅ Handle validation and conflicts

## Test Environment

### Development Setup
- **Authentication**: Uses development mode with `test.edu` domain
- **Database**: Mocked Firestore operations
- **Email**: Mocked SendGrid integration
- **Sessions**: Uses localStorage for development testing

### CI/CD Integration
- **Browsers**: Chromium, Firefox, WebKit
- **Mobile**: Pixel 5, iPhone 12 simulation
- **Reporting**: HTML, JSON, and JUnit formats
- **Artifacts**: Screenshots and videos on failure

## Mock Strategy

### Component Level
- Next.js navigation (useRouter, useSearchParams)
- Framer Motion animations (simplified for testing)
- External APIs and services
- Browser APIs (localStorage, window.location)

### API Level
- Firebase Admin SDK operations
- Email sending services
- Rate limiting and security checks
- Database transactions

### E2E Level
- API responses for consistent test data
- Development mode authentication
- External service calls (cohort creation, auto-join)

## Test Data Factories

```typescript
// User data
const testUser = createTestUser({
  fullName: 'Jane Doe',
  handle: 'janedoe2024',
  userType: 'student'
});

// Session data
const testSession = createTestSession({
  needsOnboarding: true,
  schoolId: 'test-university'
});

// School data
const testSchool = createTestSchool({
  name: 'Test University',
  domain: 'test.edu'
});
```

## Debugging Tests

### Unit/Integration Tests
```bash
# Run specific test file
npm run test -- login-page.test.tsx

# Run tests matching pattern
npm run test -- --grep "handles validation"

# Debug with breakpoints
npm run test:watch
```

### E2E Tests
```bash
# Debug mode with browser
npm run test:e2e:debug

# Visual test runner
npm run test:e2e:ui

# Specific test file
npx playwright test auth-flow-complete.spec.ts
```

## Writing New Tests

### Unit Test Example
```typescript
import { render, screen, fireEvent } from '@/test/test-utils';
import { createMockRouter } from '@/test/setup';

test('validates email format', async () => {
  const mockRouter = createMockRouter();
  render(<LoginPage />, { routerMock: mockRouter });
  
  const emailInput = screen.getByLabelText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'invalid' } });
  
  expect(screen.getByText(/valid email/i)).toBeInTheDocument();
});
```

### E2E Test Example
```typescript
test('completes onboarding flow', async ({ page }) => {
  await page.goto('/schools');
  await page.click('text=Test University');
  await page.fill('input[type="email"]', 'test@test.edu');
  await page.click('button:has-text("Send magic link")');
  
  await expect(page).toHaveURL('/onboarding');
});
```

## Performance Testing

Tests include performance considerations:
- Component render times
- API response times
- Page load speeds
- Form submission efficiency

## Security Testing

Comprehensive security test coverage:
- Input validation and sanitization
- Rate limiting enforcement
- Session management security
- CSRF protection verification
- XSS prevention testing

## Accessibility Testing

Automated accessibility checks:
- ARIA label compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast validation
- Focus management testing

## Maintenance

### Adding New Tests
1. Follow existing naming conventions
2. Use test data factories for consistency
3. Mock external dependencies appropriately
4. Add both happy path and error scenarios

### Updating Tests
1. Update mocks when APIs change
2. Refresh test data when schemas evolve
3. Add tests for new features
4. Remove obsolete test cases

### CI/CD Pipeline
Tests are automatically run on:
- Pull request creation
- Merge to main branch
- Release deployments
- Scheduled regression testing

The test suite ensures high confidence in the authentication and onboarding system's reliability, security, and user experience.