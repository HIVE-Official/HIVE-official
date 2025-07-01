// Mock Firebase configuration for Storybook
// This prevents import errors when components try to import Firebase auth

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

// Mock initialization
export const initializeApp = () => ({});
export const getAuth = () => auth;
export const getFirestore = () => db;
export const getAnalytics = () => analytics;

console.log('[Storybook] Using mock Firebase configuration'); 