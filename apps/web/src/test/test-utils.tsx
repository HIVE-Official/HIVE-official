import React from 'react';
import { render, RenderOptions, screen } from '@testing-library/react';
import { vi, beforeEach, afterEach, expect, describe, it } from 'vitest';
import { useRouter, useSearchParams } from 'next/navigation';
import { mockLocalStorage } from './setup';

// Mock providers for testing
const MockProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div data-testid="mock-providers">
      {children}
    </div>
  );
};

// Custom render function with providers
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    routerMock?: object;
    searchParamsMock?: object;
  }
) => {
  const { routerMock, searchParamsMock, ...renderOptions } = options || {};

  // Set up router mock
  if (routerMock) {
    (useRouter as vi.MockedFunction<typeof useRouter>).mockReturnValue(routerMock);
  }

  // Set up search params mock
  if (searchParamsMock) {
    (useSearchParams as any).mockReturnValue(searchParamsMock);
  }

  return render(ui, {
    wrapper: MockProviders,
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Standardized test data factories
export const createTestUser = (overrides = {}) => ({
  id: 'test-user-id',
  uid: 'test-user-id',
  email: 'test@test.edu',
  fullName: 'Test User',
  handle: 'testuser',
  major: 'Computer Science',
  graduationYear: 2026,
  userType: 'student' as const,
  schoolId: 'test-university',
  onboardingCompleted: true,
  isVerified: true,
  status: 'active' as const,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createTestSession = (overrides = {}) => ({
  userId: 'test-user-id',
  email: 'test@test.edu',
  schoolId: 'test-university',
  needsOnboarding: false,
  verifiedAt: new Date().toISOString(),
  handle: 'testuser',
  role: 'student' as const,
  onboardingCompleted: true,
  ...overrides,
});

export const createTestSchool = (overrides = {}) => ({
  id: 'test-university',
  name: 'Test University',
  domain: 'test.edu',
  location: 'Test City, NY',
  status: 'active' as const,
  waitlistCount: 0,
  ...overrides,
});

export const createTestSpace = (overrides = {}) => ({
  id: 'test-space-id',
  name: 'Test Space',
  name_lowercase: 'test space',
  description: 'A test space for unit testing',
  schoolId: 'test-university',
  memberCount: 42,
  type: 'cohort' as const,
  status: 'activated' as const,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

export const createTestTool = (overrides = {}) => ({
  id: 'test-tool-id',
  name: 'Test Tool',
  icon: '🔧',
  category: 'productivity' as const,
  isInstalled: true,
  lastUsed: new Date().toISOString(),
  usageCount: 5,
  quickLaunch: true,
  ...overrides,
});

// Mock API response helpers
export const createMockApiResponse = (data: unknown, options = {}) => ({
  ok: true,
  status: 200,
  json: async () => data,
  text: async () => JSON.stringify(data),
  ...options,
});

export const createMockApiError = (error: string, status = 400) => ({
  ok: false,
  status,
  json: async () => ({ error }),
  text: async () => JSON.stringify({ error }),
});

// Authentication test helpers
export const mockSuccessfulLogin = (userOverrides = {}) => {
  const user = createTestUser(userOverrides);
  return createMockApiResponse({
    success: true,
    dev: true,
    user,
  });
};

export const mockSuccessfulOnboarding = (userOverrides = {}) => {
  const user = createTestUser(userOverrides);
  return createMockApiResponse({
    success: true,
    message: 'Onboarding completed successfully',
    user,
    builderRequestsCreated: 0,
  });
};

export const mockFailedRequest = (error: string, status = 400) => {
  return createMockApiError(error, status);
};

// Test environment helpers
export const setupTestEnvironment = () => {
  // Mock console methods to reduce noise in tests
  const originalConsole = { ...console };
  
  beforeEach(() => {
    console.error = vi.fn();
    console.warn = vi.fn();
    console.log = vi.fn();
  });

  afterEach(() => {
    Object.assign(console, originalConsole);
  });
};

// Local storage test helpers
export const mockLocalStorageValue = (key: string, value: string | null) => {
  mockLocalStorage.getItem.mockImplementation((k) => 
    k === key ? JSON.stringify(value) : null
  );
};

export const expectLocalStorageCall = (key: string, value: string) => {
  expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
    key,
    JSON.stringify(value)
  );
};

// Form testing helpers
export const fillForm = async (fields: Record<string, string>) => {
  const { screen } = await import('@testing-library/react');
  const { fireEvent } = await import('@testing-library/react');
  
  for (const [fieldName, value] of Object.entries(fields)) {
    const field = screen.getByLabelText(new RegExp(fieldName, 'i')) ||
                  screen.getByPlaceholderText(new RegExp(fieldName, 'i')) ||
                  screen.getByRole('textbox', { name: new RegExp(fieldName, 'i') });
    
    fireEvent.change(field, { target: { value } });
  }
};

export const submitForm = async (buttonText = 'submit') => {
  const { screen } = await import('@testing-library/react');
  const { fireEvent } = await import('@testing-library/react');
  
  const submitButton = screen.getByRole('button', { 
    name: new RegExp(buttonText, 'i') 
  });
  
  fireEvent.click(submitButton);
};

// Async testing helpers
export const waitForApiCall = async (mockFetch: vi.MockedFunction<typeof fetch>, expectedUrl: string) => {
  const { waitFor } = await import('@testing-library/react');
  
  await waitFor(() => {
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining(expectedUrl),
      expect.any(Object)
    );
  });
};

export const waitForRedirect = async (mockRouter: object, expectedPath: string) => {
  const { waitFor } = await import('@testing-library/react');
  
  await waitFor(() => {
    expect(mockRouter.push).toHaveBeenCalledWith(expectedPath);
  });
};

// Component testing helpers
export const getByTestId = (testId: string) => {
  return screen.getByTestId(testId);
};

export const queryByTestId = (testId: string) => {
  return screen.queryByTestId(testId);
};

// Error boundary testing with proper error handling
export const TestErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  return (
    <div data-testid="error-boundary">
      {children}
    </div>
  );
};

// Standardized test patterns
export const describeComponentSuite = (componentName: string, tests: () => void) => {
  describe(`${componentName} Component`, () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    tests();
  });
};

// Common test patterns
export const testPatterns = {
  shouldRender: (getComponent: () => React.ReactElement, testId?: string) => {
    it('should render without crashing', () => {
      const { container } = render(getComponent());
      expect(container).toBeInTheDocument();
      if (testId) {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      }
    });
  },

  shouldHandleLoading: (getLoadingComponent: () => React.ReactElement) => {
    it('should display loading state', () => {
      render(getLoadingComponent());
      expect(screen.getByText(/loading|spinner|syncing/i)).toBeInTheDocument();
    });
  },

  shouldHandleError: (getErrorComponent: () => React.ReactElement) => {
    it('should handle error states gracefully', () => {
      render(getErrorComponent());
      expect(screen.getByText(/error|failed|something went wrong/i)).toBeInTheDocument();
    });
  },
};

// Performance helpers for testing
export const measureRenderTime = async (component: () => React.ReactElement) => {
  const start = performance.now();
  render(component());
  const end = performance.now();
  return end - start;
};

// Accessibility testing helpers
export const testAccessibility = {
  shouldHaveProperLabels: (component: () => React.ReactElement) => {
    it('should have proper ARIA labels', () => {
      render(component());
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAttribute('aria-label');
      });
    });
  },

  shouldSupportKeyboardNavigation: (component: () => React.ReactElement) => {
    it('should support keyboard navigation', () => {
      render(component());
      const focusableElements = screen.getAllByRole(/button|link|textbox|combobox/i);
      focusableElements.forEach(element => {
        expect(element).toHaveAttribute('tabIndex');
      });
    });
  },
};