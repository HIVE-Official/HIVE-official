import { expect, afterEach, vi, beforeAll, afterAll } from 'vitest';

// Optionally load Testing Library matchers and cleanup if available
let cleanup: (() => void) | undefined;
try {
  const jestDom = await import('@testing-library/jest-dom');
  const matchers = await import('@testing-library/jest-dom/matchers');
  // Extend Vitest's expect with Testing Library matchers
  // @ts-ignore - types may not be available if package is missing
  expect.extend(matchers);
  const rtl = await import('@testing-library/react');
  cleanup = rtl.cleanup;
} catch {}

afterEach(() => {
  try { cleanup?.(); } catch {}
  vi.clearAllMocks();
});

// Mock Next.js server-only directive used in server files
vi.mock('server-only', () => ({}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Firebase
vi.mock('@hive/firebase', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signInWithEmailLink: vi.fn(),
    signOut: vi.fn(),
    sendSignInLinkToEmail: vi.fn(),
  },
  db: {},
}));

// Mock environment variables
process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-api-key';
process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com';
process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
process.env.NEXT_PUBLIC_APP_URL = 'http://localhost:3000';

// Suppress console errors during tests unless explicitly needed
const originalError = console.error;
const originalWarn = console.warn;

beforeAll(() => {
  console.error = vi.fn();
  console.warn = vi.fn();
});

afterAll(() => {
  console.error = originalError;
  console.warn = originalWarn;
});

// Mock window.localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
