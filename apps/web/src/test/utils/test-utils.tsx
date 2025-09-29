import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { User } from 'firebase/auth';

// Create a test query client
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

// Mock auth context provider
interface MockAuthProviderProps {
  children: React.ReactNode;
  user?: Partial<User> | null;
  isLoading?: boolean;
}

export const MockAuthProvider: React.FC<MockAuthProviderProps> = ({
  children,
  user = null,
  isLoading = false,
}) => {
  const authValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn: vi.fn(),
    signOut: vi.fn(),
    sendMagicLink: vi.fn(),
  };

  return (
    <div data-testid="mock-auth-provider" data-auth={JSON.stringify(authValue)}>
      {children}
    </div>
  );
};

// All providers wrapper
interface AllTheProvidersProps {
  children: React.ReactNode;
  user?: Partial<User> | null;
  isLoading?: boolean;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({
  children,
  user = null,
  isLoading = false,
}) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MockAuthProvider user={user} isLoading={isLoading}>
        {children}
      </MockAuthProvider>
    </QueryClientProvider>
  );
};

// Custom render function
export const customRender = (
  ui: ReactElement,
  {
    user = null,
    isLoading = false,
    ...options
  }: Omit<RenderOptions, 'wrapper'> & {
    user?: Partial<User> | null;
    isLoading?: boolean;
  } = {}
): RenderResult => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders user={user} isLoading={isLoading}>
        {children}
      </AllTheProviders>
    ),
    ...options,
  });
};

// Re-export everything from testing library
export * from '@testing-library/react';
export { customRender as render };

// Mock data factories
export const createMockUser = (overrides: Partial<User> = {}): Partial<User> => ({
  uid: 'test-uid-123',
  email: 'test@buffalo.edu',
  displayName: 'Test User',
  photoURL: null,
  emailVerified: true,
  ...overrides,
});

export const createMockSpace = (overrides = {}) => ({
  id: 'test-space-123',
  name: 'Test Space',
  description: 'A test space for unit tests',
  type: 'social',
  visibility: 'public',
  memberCount: 42,
  createdAt: new Date('2024-01-01'),
  createdBy: 'test-uid-123',
  campusId: 'ub-buffalo',
  isActive: true,
  ...overrides,
});

export const createMockPost = (overrides = {}) => ({
  id: 'test-post-123',
  content: 'Test post content',
  authorId: 'test-uid-123',
  authorName: 'Test User',
  spaceId: 'test-space-123',
  createdAt: new Date('2024-01-01'),
  likes: 5,
  comments: 2,
  campusId: 'ub-buffalo',
  ...overrides,
});

export const createMockProfile = (overrides = {}) => ({
  id: 'test-uid-123',
  handle: 'testuser',
  displayName: 'Test User',
  email: 'test@buffalo.edu',
  bio: 'Just a test user',
  major: 'Computer Science',
  year: 'Junior',
  dorm: 'Ellicott',
  interests: ['coding', 'testing'],
  campusId: 'ub-buffalo',
  createdAt: new Date('2024-01-01'),
  isOnboarded: true,
  ...overrides,
});

// API response mocks
export function mockApiResponse<T>(data: T, delay = 0): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

export function mockApiError(message: string, status = 500, delay = 0): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      const error = new Error(message) as Error & { status: number };
      error.status = status;
      reject(error);
    }, delay);
  });
}

// Firebase mock helpers
export const mockFirestoreDoc = (data: Record<string, unknown>, exists = true) => ({
  exists: () => exists,
  data: () => data,
  id: data?.id || 'test-doc-id',
  ref: {
    id: data?.id || 'test-doc-id',
  },
});

export const mockFirestoreCollection = (docs: Array<Record<string, unknown>>) => ({
  docs: docs.map(doc => mockFirestoreDoc(doc)),
  empty: docs.length === 0,
  size: docs.length,
});

// Wait utilities
export const waitForAsync = (ms: number = 0): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// Error boundary test helper
export class TestErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div data-testid="error-boundary">Error occurred</div>;
    }
    return this.props.children;
  }
}