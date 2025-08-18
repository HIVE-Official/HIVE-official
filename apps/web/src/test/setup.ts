// This file adds custom test setup for vitest
import { vi, afterEach } from 'vitest';
import React from 'react';

// Import Jest DOM matchers to fix "toBeInTheDocument" type errors
import '@testing-library/jest-dom';

// JSDOM environment provides document and window - don't override them

// Fix React context reading issue - ensure React is properly available globally
if (typeof global.React === 'undefined') {
  global.React = React;
}

// Also ensure React is available in globalThis for wider compatibility
if (typeof globalThis.React === 'undefined') {
  globalThis.React = React;
}

// Make React available in all test files 
global.React = React;

// Set up essential window mocks - work with existing JSDOM window
const createMediaQueryList = (matches: boolean = false, media: string = '') => ({
  matches,
  media,
  onchange: null as ((_this: MediaQueryList, _ev: MediaQueryListEvent) => any) | null,
  addListener: vi.fn((_listener: ((_this: MediaQueryList, _ev: MediaQueryListEvent) => any) | null) => {}),
  removeListener: vi.fn((_listener: ((_this: MediaQueryList, _ev: MediaQueryListEvent) => any) | null) => {}),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
});

const matchMediaMock = vi.fn().mockImplementation((query: string) => createMediaQueryList(false, query));

// Add matchMedia to existing window object instead of creating new one
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
  });
  
  // Also set on global for backwards compatibility
  global.matchMedia = matchMediaMock;
} else {
  // Fallback if JSDOM window isn't available
  global.matchMedia = matchMediaMock;
}

// Mock Next.js modules that are commonly used in tests
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
  usePathname: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
     
    return React.createElement('img', { src, alt, ...props });
  },
}));

// Mock framer-motion for tests to avoid animation complexity  
vi.mock('framer-motion', () => {
  const createMotionComponent = (tag: string) => {
    const MotionComponent = React.forwardRef<any, any>(
      ({ children, ...props }, ref) => {
        const { animate, initial, transition, whileHover, whileTap, ...domProps } = props;
        return React.createElement(tag, { ...domProps, ref }, children);
      }
    );
    MotionComponent.displayName = `Motion${tag.charAt(0).toUpperCase() + tag.slice(1)}`;
    return MotionComponent;
  };

  return {
    motion: new Proxy({}, {
      get: (target, prop) => {
        if (typeof prop === 'string') {
          return createMotionComponent(prop);
        }
        return target[prop as keyof typeof target];
      }
    }),
    AnimatePresence: ({ children }: any) => children,
    // Mock the reduced motion utilities
    useReducedMotion: () => false,
    useIsPresent: () => true,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }),
    useMotionValue: (initialValue: any) => ({ get: () => initialValue, set: vi.fn() }),
    useTransform: (motionValue: any, _transformer: any) => ({ get: () => motionValue, set: vi.fn() }),
  };
});

// Create reusable motion component factory to avoid duplication
const createMotionComponentFactory = () => {
  const createMotionComponent = (tag: string) => {
    const MotionComponent = React.forwardRef<any, any>(
      ({ children, ...props }, ref) => {
        const { animate, initial, transition, whileHover, whileTap, layout, exit, variants, ...domProps } = props;
        return React.createElement(tag, { ...domProps, ref }, children);
      }
    );
    MotionComponent.displayName = `Motion${tag.charAt(0).toUpperCase() + tag.slice(1)}`;
    return MotionComponent;
  };

  return {
    motion: new Proxy({}, {
      get: (target, prop) => {
        if (typeof prop === 'string') {
          return createMotionComponent(prop);
        }
        return target[prop as keyof typeof target];
      }
    }),
    AnimatePresence: ({ children }: any) => children,
    MotionDiv: createMotionComponent('div'),
    MotionButton: createMotionComponent('button'), 
    MotionSpan: createMotionComponent('span'),
    MotionSection: createMotionComponent('section'),
    // Mock framer-motion hooks
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }),
    useMotionValue: (initialValue: any) => ({ get: () => initialValue, set: vi.fn() }),
    useTransform: (motionValue: any, _transformer: any) => ({ get: () => motionValue, set: vi.fn() }),
  };
};

// Mock all framer-motion proxy paths with same factory
const framerMotionMock = createMotionComponentFactory();
vi.mock('../../packages/ui/src/components/framer-motion-proxy', () => framerMotionMock);

// Mock environment variables for tests
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';
// Set NODE_ENV for tests if not already set (read-only safe)
try {
  if (!process.env.NODE_ENV) {
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'test', writable: false });
  }
} catch {
  // NODE_ENV is already defined and read-only
}

// Mock global fetch with proper Response interface
const mockResponse = (data: any, ok: boolean = true, status: number = 200) => ({
  ok,
  status,
  statusText: ok ? 'OK' : 'Error',
  json: vi.fn().mockResolvedValue(data),
  text: vi.fn().mockResolvedValue(JSON.stringify(data)),
  headers: new Headers(),
  url: '',
  redirected: false,
  type: 'default' as Response['type'],
  body: null,
  bodyUsed: false,
  clone: vi.fn(),
  arrayBuffer: vi.fn(),
  blob: vi.fn(),
  formData: vi.fn(),
});

global.fetch = vi.fn().mockImplementation((url: string) => {
  // Default success response for calendar API
  if (url.includes('/api/calendar')) {
    return Promise.resolve(mockResponse({ events: [] }));
  }
  
  // Default success response for other APIs
  return Promise.resolve(mockResponse({ success: true }));
});

// Mock auth context replaced by @hive/ui unified auth mock below

// Mock unified auth context from @hive/ui
vi.mock('@hive/ui', async () => {
  const actual = await vi.importActual('@hive/ui');
  return {
    ...actual,
    ...framerMotionMock,
    useUnifiedAuth: vi.fn(() => ({
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        fullName: 'Test User',
        handle: 'testuser',
        onboardingCompleted: true,
      },
      isAuthenticated: true,
      isLoading: false,
      error: null,
      signIn: vi.fn(),
      signOut: vi.fn(),
      completeOnboarding: vi.fn(() => Promise.resolve({ success: true })),
      getAuthToken: vi.fn(() => Promise.resolve('test-token')),
      hasValidSession: vi.fn(() => true),
      canAccessFeature: vi.fn(() => true),
      requiresOnboarding: vi.fn(() => false),
      refreshSession: vi.fn(() => Promise.resolve()),
    })),
    useOnboardingBridge: vi.fn(() => ({
      completeOnboarding: vi.fn(() => Promise.resolve({ success: true })),
      needsOnboarding: vi.fn(() => false),
      getOnboardingProgress: vi.fn(() => ({ completedSteps: 7, totalSteps: 7, isComplete: true })),
      createPostOnboardingSpaces: vi.fn(() => Promise.resolve({ totalSpaces: 3 })),
      isAuthenticated: true,
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        fullName: 'Test User',
        handle: 'testuser',
      },
      isLoading: false,
      error: null,
    })),
  };
});

// Mock shell context to prevent useContext errors  
vi.mock('@hive/ui/src/components/shell/shell-provider', () => ({
  useShell: vi.fn(() => ({
    sidebarCollapsed: true,
    setSidebarCollapsed: vi.fn(),
    commandPaletteOpen: false,
    setCommandPaletteOpen: vi.fn(),
    notificationCenterOpen: false,
    setNotificationCenterOpen: vi.fn(),
    unreadNotificationCount: 0,
    setUnreadNotificationCount: vi.fn(),
    navigationMode: 'sidebar' as const,
    setNavigationMode: vi.fn(),
    navigationPreference: 'auto' as const,
    setNavigationPreference: vi.fn(),
    navigationLayout: {
      resolvedMode: 'sidebar' as const,
      canUsePreference: true,
      reasons: [],
    },
  })),
  ShellProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock feature flags to prevent useFeatureFlags errors
vi.mock('@hive/core', () => ({
  useFeatureFlags: vi.fn(() => ({
    spaces: true,
    tools: true,
    calendar: true,
    analytics: true,
    realtime: true,
    ai: false,
    gamification: false
  })),
  FeatureFlags: {
    spaces: true,
    tools: true,
    calendar: true,
    analytics: true,
    realtime: true,
    ai: false,
    gamification: false
  }
}));

// Mock session hook to prevent useSession errors
vi.mock('@/hooks/use-session', () => ({
  useSession: vi.fn(() => ({
    user: {
      uid: 'test-user-id',
      email: 'test@example.com',
      fullName: 'Test User',
      handle: 'testuser',
      avatarUrl: '/test-avatar.jpg',
      interests: ['programming', 'design', 'music'],
      year: 'sophomore',
      major: 'Computer Science',
      joinedSpaces: ['test-space-1'],
      friends: ['friend-1', 'friend-2']
    },
    loading: false,
    error: null,
    signIn: vi.fn(),
    signOut: vi.fn()
  }))
}));

// Mock @hive/hooks package to prevent useFeatureFlags and other hook errors
vi.mock('@hive/hooks', () => ({
  useFeatureFlags: vi.fn(() => ({
    spaces: true,
    tools: true,
    calendar: true,
    analytics: true,
    realtime: true,
    ai: false,
    gamification: false,
    trackEvent: vi.fn()
  })),
  useAnalytics: vi.fn(() => ({
    track: vi.fn(),
    identify: vi.fn(),
    page: vi.fn()
  })),
  useNavigation: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn()
  }))
}));

// Firebase mocks - consolidated for better maintenance
const createFirebaseMocks = () => {
  const mockUser = {
    uid: 'test-user-id',
    email: 'test@example.com',
    displayName: 'Test User',
    emailVerified: true,
    getIdToken: vi.fn(() => Promise.resolve('test-token')),
  };

  const mockDoc = {
    exists: () => true,
    data: () => ({
      id: 'test-doc',
      channels: [],
      type: 'test',
      userId: 'test-user-id',
      createdAt: new Date().toISOString(),
    }),
    id: 'test-doc',
  };

  return {
    app: {
      initializeApp: vi.fn(),
      getApps: vi.fn(() => []),
      getApp: vi.fn(),
    },
    auth: {
      getAuth: vi.fn(() => ({
        currentUser: mockUser,
        onAuthStateChanged: vi.fn(),
        signInWithEmailLink: vi.fn(),
        sendSignInLinkToEmail: vi.fn(),
        signOut: vi.fn(),
      })),
      onAuthStateChanged: vi.fn(),
      signInWithEmailLink: vi.fn(),
      sendSignInLinkToEmail: vi.fn(),
      signOut: vi.fn(),
    },
    adminAuth: {
      getAuth: vi.fn(() => ({
        verifyIdToken: vi.fn().mockResolvedValue({
          uid: 'test-user-id',
          email: 'test@example.com',
          email_verified: true,
        }),
      })),
    },
    mockDoc,
  };
};

const firebaseMocks = createFirebaseMocks();

vi.mock('firebase/app', () => firebaseMocks.app);
vi.mock('firebase/auth', () => firebaseMocks.auth);
vi.mock('firebase-admin/auth', () => firebaseMocks.adminAuth);

// Mock Firestore with proper document methods using consolidated mockDoc
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(() => Promise.resolve(firebaseMocks.mockDoc)),
  getDocs: vi.fn(() => Promise.resolve({
    empty: false,
    size: 1,
    docs: [firebaseMocks.mockDoc],
  })),
  setDoc: vi.fn(() => Promise.resolve()),
  updateDoc: vi.fn(() => Promise.resolve()),
  deleteDoc: vi.fn(() => Promise.resolve()),
  addDoc: vi.fn(() => Promise.resolve({ id: 'new-doc-id' })),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  onSnapshot: vi.fn((query, callback) => {
    setTimeout(() => {
      callback({
        empty: false,
        size: 1,
        docs: [firebaseMocks.mockDoc],
      });
    }, 0);
    return vi.fn();
  }),
  serverTimestamp: vi.fn(() => new Date()),
  Timestamp: {
    now: vi.fn(() => ({ seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 })),
    fromDate: vi.fn((date: Date) => ({ seconds: Math.floor(date.getTime() / 1000), nanoseconds: 0 })),
  },
}));

// Mock Firebase Admin Firestore
vi.mock('firebase-admin/firestore', () => ({
  getFirestore: vi.fn(() => ({
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        get: vi.fn(() => Promise.resolve({
          exists: true,
          data: () => ({
            id: 'test-doc',
            type: 'test',
            userId: 'test-user-id',
          }),
          id: 'test-doc',
        })),
        set: vi.fn(() => Promise.resolve()),
        update: vi.fn(() => Promise.resolve()),
        delete: vi.fn(() => Promise.resolve()),
      })),
      add: vi.fn(() => Promise.resolve({ id: 'new-doc-id' })),
      where: vi.fn(() => ({
        get: vi.fn(() => Promise.resolve({
          empty: false,
          size: 1,
          docs: [{
            exists: true,
            data: () => ({ id: 'test-doc', type: 'test' }),
            id: 'test-doc',
          }],
        })),
      })),
    })),
    doc: vi.fn(() => ({
      get: vi.fn(() => Promise.resolve({
        exists: true,
        data: () => ({ id: 'test-doc', type: 'test' }),
        id: 'test-doc',
      })),
      set: vi.fn(() => Promise.resolve()),
      update: vi.fn(() => Promise.resolve()),
      delete: vi.fn(() => Promise.resolve()),
    })),
  })),
  FieldValue: {
    serverTimestamp: vi.fn(() => 'SERVER_TIMESTAMP'),
    delete: vi.fn(() => 'DELETE_FIELD'),
    increment: vi.fn((value: number) => `INCREMENT_${value}`),
    arrayUnion: vi.fn((...values: any[]) => `ARRAY_UNION_${values.join(',')}`),
    arrayRemove: vi.fn((...values: any[]) => `ARRAY_REMOVE_${values.join(',')}`),
  },
}));

// Ensure window.matchMedia is available during JSDOM setup
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMediaMock,
  });
}

// Mock browser APIs (JSDOM safe)
if (typeof global !== 'undefined') {
  // Mock IntersectionObserver for Next.js components
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback: (_entries: any[], _observer: any) => void, options?: any) {
      this.callback = callback;
      this.options = options;
    }
    callback: (_entries: any[], _observer: any) => void;
    options?: any;
    root = null;
    rootMargin = '';
    thresholds = [];
    
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  };

  // Mock ResizeObserver for responsive components
  global.ResizeObserver = class ResizeObserver {
    constructor(callback: (_entries: any[], _observer: any) => void) {
      this.callback = callback;
    }
    callback: (_entries: any[], _observer: any) => void;
    
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  };

  // Mock MutationObserver for DOM monitoring
  global.MutationObserver = class MutationObserver {
    constructor(callback: (_mutations: any[], _observer: any) => void) {
      this.callback = callback;
    }
    callback: (_mutations: any[], _observer: any) => void;
    
    observe = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  };

  // Mock DOMRect for getBoundingClientRect
  global.DOMRect = class DOMRect {
    bottom = 0;
    left = 0;
    right = 0;
    top = 0;
    constructor(public x = 0, public y = 0, public width = 0, public height = 0) {
      this.left = x;
      this.top = y;
      this.right = x + width;
      this.bottom = y + height;
    }
    toJSON() {
      return JSON.stringify(this);
    }
    static fromRect(other?: { x?: number; y?: number; width?: number; height?: number }): DOMRect {
      return new DOMRect(other?.x, other?.y, other?.width, other?.height);
    }
  };
}

// Mock window-dependent APIs (JSDOM safe)
if (typeof window !== 'undefined') {
  // Mock media queries and viewport for Next.js
  Object.defineProperty(window, 'navigator', {
    value: {
      userAgent: 'test',
      language: 'en-US',
      languages: ['en-US'],
    },
    writable: true,
  });

  // Mock performance API
  Object.defineProperty(window, 'performance', {
    value: {
      now: vi.fn(() => Date.now()),
      mark: vi.fn(),
      measure: vi.fn(),
      getEntriesByName: vi.fn(() => []),
      getEntriesByType: vi.fn(() => []),
    },
    writable: true,
  });

  // Mock element methods
  if (typeof HTMLElement !== 'undefined') {
    Object.defineProperty(HTMLElement.prototype, 'getBoundingClientRect', {
      value: vi.fn(() => new (global as any).DOMRect(0, 0, 100, 100)),
    });

    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      value: vi.fn(),
    });
  }
}


// Mock localStorage (JSDOM safe)
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock sessionStorage (JSDOM safe)
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
  });

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
    writable: true,
  });
}

// Mock window.location (JSDOM safe)
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'location', {
    value: {
      assign: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      href: 'http://localhost:3000',
      origin: 'http://localhost:3000',
      protocol: 'http:',
      host: 'localhost:3000',
      hostname: 'localhost',
      port: '3000',
      pathname: '/',
      search: '',
      hash: '',
    },
    writable: true,
    configurable: true
  });
}

// Mock window.prompt
global.prompt = vi.fn();

// Mock window.alert
global.alert = vi.fn();

// Mock window.confirm
global.confirm = vi.fn();

// Console suppression for cleaner test output
const originalError = console.error;
const originalWarn = console.warn;

console.error = (...args: any[]) => {
  // Suppress specific React warnings that are expected in tests
  const message = args[0]?.toString() || '';
  
  if (
    message.includes('Warning: ReactDOM.render is no longer supported') ||
    message.includes('Warning: An invalid form control') ||
    message.includes('Not implemented: HTMLFormElement.prototype.requestSubmit')
  ) {
    return;
  }
  
  originalError.apply(console, args);
};

console.warn = (...args: any[]) => {
  const message = args[0]?.toString() || '';
  
  if (
    message.includes('componentWillReceiveProps has been renamed') ||
    message.includes('componentWillMount has been renamed')
  ) {
    return;
  }
  
  originalWarn.apply(console, args);
};

// Clean up after each test
afterEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
  sessionStorageMock.getItem.mockClear();
  sessionStorageMock.setItem.mockClear();
  sessionStorageMock.removeItem.mockClear();
  sessionStorageMock.clear.mockClear();
});

// Test utilities for common test patterns
export const createMockRouter = (overrides = {}) => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
  ...overrides,
});

export const createMockSearchParams = (params = {}) => ({
  get: vi.fn((key: string) => params[key as keyof typeof params] || null),
  getAll: vi.fn(),
  has: vi.fn(),
  keys: vi.fn(),
  values: vi.fn(),
  entries: vi.fn(),
  forEach: vi.fn(),
  toString: vi.fn(),
  ...params,
});

export const mockLocalStorage = localStorageMock;
export const mockSessionStorage = sessionStorageMock;