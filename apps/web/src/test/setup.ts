// This file adds the jest-dom matchers to vitest
import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";
import type { TestUser, TestSpace } from "./types";

// Mock test user data
export const createTestUser = (overrides?: Partial<TestUser>): TestUser => ({
  id: "test-user-id",
  handle: "testuser",
  email: "test@university.edu",
  fullName: "Test User",
  uid: "test-user-id",
  emailVerified: true,
  isAnonymous: false,
  onboardingCompleted: true,
  customClaims: {},
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  },
  getIdToken: () => Promise.resolve("mock-token"),
  ...overrides,
});

// Mock test space data
export const createTestSpace = (overrides?: Partial<TestSpace>): TestSpace => ({
  id: "test-space-id",
  name: "Test Space",
  description: "A test space",
  createdBy: "test-user-id",
  createdAt: new Date().toISOString(),
  memberCount: 1,
  isPrivate: false,
  schoolId: "test-school-id",
  ...overrides,
});

// Mock Firebase
export const mockFirebaseDb = {
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  writeBatch: vi.fn(),
  serverTimestamp: vi.fn(),
  limit: vi.fn(),
  increment: vi.fn(),
};

// Mock fetch for API calls
export const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock Firebase auth
export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
};

// Mock Firebase functions
vi.mock("@/lib/firebase", () => ({
  db: mockFirebaseDb,
  auth: mockAuth,
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  writeBatch: vi.fn(),
  serverTimestamp: vi.fn(),
  limit: vi.fn(),
  increment: vi.fn(),
}));

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
  (window as unknown as { analyticsEvents: unknown[] }).analyticsEvents = [];
}); 