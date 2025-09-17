/**
 * Mock Firebase configuration for Storybook and testing
 * This prevents import errors when components try to import Firebase auth
 * 
 * In production, components should import from @hive/core/firebase directly
 */

// Mock Firebase for UI package (used in Storybook and tests)
export const auth = {
  currentUser: null,
  onAuthStateChanged: () => () => {},
  signOut: () => Promise.resolve(),
  sendSignInLinkToEmail: () => Promise.resolve(),
  isSignInWithEmailLink: () => false,
  signInWithEmailLink: () => Promise.resolve({}),
};

export const db = {
  collection: () => ({
    doc: () => ({
      get: () => Promise.resolve({ data: () => ({}) }),
      set: () => Promise.resolve(),
      update: () => Promise.resolve(),
    }),
  }),
};

export const analytics = {
  logEvent: () => {},
};

export const initializeApp = () => ({});
export const getAuth = () => auth;
export const getFirestore = () => db;
export const getAnalytics = () => analytics;

// Log only in browser environment
if (typeof window !== 'undefined') {
}