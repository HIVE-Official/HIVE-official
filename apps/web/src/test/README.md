# HIVE E2E Testing Guide

## Overview

This directory contains end-to-end tests for the HIVE authentication and onboarding flows using Playwright. These tests ensure critical user journeys work correctly across different browsers and devices.

## Test Structure

```
src/test/e2e/
├── auth-flow.spec.ts          # Authentication flow tests
├── onboarding-flow.spec.ts    # Onboarding wizard tests  
├── smoke-tests.spec.ts        # Critical path smoke tests
├── helpers/
│   └── test-helpers.ts        # Shared test utilities
├── global-setup.ts            # Global test setup
└── global-teardown.ts         # Global test cleanup
```

## Running Tests

### Basic Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run with browser UI (great for debugging)
npm run test:e2e:ui

# Run in headed mode (see browser window)
npm run test:e2e:headed

# Debug specific test
npm run test:e2e:debug

# Run smoke tests only
npm run test:smoke
```

### Cross-Browser Testing

```bash
# Run on all browsers (Chromium, Firefox, WebKit)
npm run test:e2e:cross-browser

# Run on mobile devices
npm run test:e2e:mobile
```

### CI/CD Commands

```bash
# CI-optimized run with retries and reporting
npm run test:ci

# Generate test reports
npm run test:e2e -- --reporter=html
```

## Test Categories

### 1. Authentication Flow Tests (`auth-flow.spec.ts`)

Tests the complete authentication journey:
- School selection → Login → Magic link → Verification
- Invalid email domains
- Expired magic links  
- Rate limiting
- Network error handling
- Mobile responsiveness
- Auth state persistence
- Logout functionality

### 2. Onboarding Flow Tests (`onboarding-flow.spec.ts`)

Tests the complete onboarding wizard:
- **Student Flow**: All 9 steps (Welcome → User Type → Name → Academics → Handle → Photo → Interests → Builder → Legal)
- **Faculty Flow**: Simplified 5 steps (Welcome → User Type → Faculty Info → Builder → Legal)
- Field validation (names, graduation years, handle format)
- Handle availability checking
- Optional step skipping
- Progress tracking
- Back navigation with data persistence
- Mobile responsiveness
- Network error handling

### 3. Smoke Tests (`smoke-tests.spec.ts`)

Critical path verification:
- App loads and health checks
- Complete happy path journey
- Error boundaries on failures
- Mobile responsiveness
- JavaScript disabled graceful degradation  
- Data persistence across refreshes
- Concurrent user sessions
- Network connectivity issues
- Accessibility standards

## Test Helpers

The `TestHelpers` class provides utilities for:

### Authentication Mocking
```typescript
await testHelpers.mockAuthenticatedUser({
  id: 'user123',
  email: 'test@buffalo.edu', 
  onboardingCompleted: false
});
```

### Magic Link Testing
```typescript
const token = await testHelpers.getMockMagicLinkToken('test@buffalo.edu');
await page.goto(`/auth/verify?token=${token}&email=test@buffalo.edu`);
```

### Onboarding Shortcuts
```typescript
// Complete onboarding up to specific step
await testHelpers.completeOnboardingToStep('handle');
```

### Error Simulation  
```typescript
// Mock API errors
await testHelpers.mockApiError('/api/auth/send-magic-link', {
  status: 500,
  message: 'Server error'
});

// Simulate slow network
await testHelpers.simulateSlowNetwork();
```

## Configuration

### Playwright Config (`playwright.config.ts`)

- **Base URL**: `http://localhost:3003` (dedicated test server)
- **Retries**: 2 in CI, 0 locally
- **Timeouts**: Extended for slow compilation (60s test, 45s navigation)
- **Screenshots**: On failure only
- **Videos**: Retain on failure
- **Browsers**: Chrome, Firefox, Safari + mobile variants

### Global Setup

- Waits for dev server to be ready
- Sets up test data and mock endpoints
- Creates screenshot directories
- Validates auth endpoints accessibility

### Global Teardown

- Cleans up test data
- Removes old screenshots (7+ days)
- Generates test summary report

## Best Practices

### Writing Tests

1. **Use TestHelpers**: Leverage shared utilities for common tasks
2. **Mock External APIs**: Don't rely on real Firebase/email services
3. **Test Data Isolation**: Clear auth state between tests  
4. **Progressive Enhancement**: Test with and without JavaScript
5. **Mobile First**: Include mobile viewport tests
6. **Error Scenarios**: Test both happy path and edge cases

### Debugging Tests

1. **Use UI Mode**: `npm run test:e2e:ui` for interactive debugging
2. **Screenshots**: Automatic on failures, manual via `testHelpers.takeScreenshot()`
3. **Console Logs**: Check for JavaScript errors with `testHelpers.checkForConsoleErrors()`
4. **Slow Motion**: Add `page.waitForTimeout()` to observe interactions

### Performance

1. **Parallel Execution**: Tests run in parallel by default
2. **Efficient Selectors**: Use `data-testid` attributes for reliable selection
3. **Wait Strategies**: Use `waitForSelector()` instead of fixed timeouts
4. **Resource Cleanup**: Always clean up in `afterEach` hooks

## CI/CD Integration

Tests are configured for CI environments with:
- Retry logic for flaky tests
- JSON and JUnit reporting formats  
- HTML reports for debugging failures
- Screenshot and video artifacts on failure
- Extended timeouts for slower CI machines

## Troubleshooting

### Common Issues

1. **Dev server not ready**: Increase timeout in global setup
2. **Element not found**: Add `data-testid` attributes to components
3. **Timing issues**: Use `waitForSelector()` instead of `waitForTimeout()`
4. **Mock not working**: Verify route matching patterns
5. **Mobile tests failing**: Check viewport size and touch events

### Debug Commands

```bash
# Run specific test file
npx playwright test auth-flow.spec.ts

# Run with debug inspector
npx playwright test --debug

# Generate and open HTML report
npx playwright show-report

# List all available tests
npx playwright test --list
```

## Environment Variables

Required for testing:
```bash
# Firebase configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=  
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

# App configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3003
```

## Future Enhancements

- Visual regression testing with screenshot comparison
- Performance testing with Lighthouse integration
- Accessibility testing with axe-core
- API contract testing with network request validation
- Multi-language testing for internationalization