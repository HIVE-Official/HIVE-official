import React from 'react';

// Comprehensive process mock for browser environment
const mockProcess = {
  env: { NODE_ENV: 'development' },
  stdout: { isTTY: false },
  stderr: { isTTY: false },
  stdin: { isTTY: false },
  platform: 'browser',
  versions: {},
  cwd: () => '/',
  chdir: () => {},
  exit: () => {},
  nextTick: (callback: Function) => setTimeout(callback, 0),
  on: () => {},
  once: () => {},
  removeListener: () => {},
  removeAllListeners: () => {},
  emit: () => {},
  browser: true
};

// Set up global process mock
if (typeof global !== 'undefined') {
  global.process = mockProcess;
}

if (typeof window !== 'undefined') {
  (window as any).process = mockProcess;
  (window as any).global = window;
}

// Mock Firebase for Storybook environment
export const mockFirebaseConfig = {
  apiKey: "mock-api-key",
  authDomain: "mock.firebaseapp.com",
  projectId: "mock-project",
  storageBucket: "mock.appspot.com",
  messagingSenderId: "123456789",
  appId: "mock-app-id"
};

// Mock auth-logic functions for Storybook
export const joinWaitlist = async (email: string, schoolId: string) => {
  console.log('[STORYBOOK MOCK] joinWaitlist called with:', { email, schoolId });
  return Promise.resolve({ success: true, message: 'Mock joinWaitlist success' });
};

export const useAuth = () => ({
  user: null,
  loading: false,
  error: null,
  signIn: async () => Promise.resolve(),
  signOut: async () => Promise.resolve(),
  signUp: async () => Promise.resolve(),
});

// Mock Firestore functions
export const getFirestore = () => ({
  collection: () => ({
    doc: () => ({
      get: () => Promise.resolve({ exists: false, data: () => ({}) }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
      delete: () => Promise.resolve(),
    }),
  }),
});

export const FieldValue = {
  serverTimestamp: () => new Date(),
  increment: (n: number) => n,
  arrayUnion: (...items: any[]) => items,
  arrayRemove: (...items: any[]) => items,
};

// Mock Theme Provider and related hooks for next-themes
export const useTheme = () => ({
  theme: 'dark',
  setTheme: (theme: string) => console.log('[MOCK] setTheme:', theme),
  resolvedTheme: 'dark',
  themes: ['light', 'dark', 'system'],
  systemTheme: 'dark',
});

export const ThemeProvider: React.FC<{ children: React.ReactNode; [key: string]: any }> = ({ 
  children, 
  ...props 
}) => {
  return <>{children}</>;
};

// Default export with all mocks
export default {
  mockFirebaseConfig,
  joinWaitlist,
  useAuth,
  getFirestore,
  FieldValue,
  useTheme,
  ThemeProvider,
};