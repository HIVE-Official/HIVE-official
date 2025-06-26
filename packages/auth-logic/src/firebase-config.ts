import { initializeApp, getApps } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { Auth, User } from "firebase/auth";
import { logger } from "@hive/core";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "demo-project.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
};

// Check if we're in a development environment without proper Firebase config
const isDevWithoutFirebase =
  process.env.NODE_ENV === "development" &&
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (!isDevWithoutFirebase) {
  // Initialize Firebase only if it hasn't been initialized already
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
} else {
  // In development without Firebase config, create comprehensive mock auth object
  logger.warn("🔥 Firebase not configured - using mock auth for development");
  
  // Create a complete mock auth object with all necessary methods
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: (user: User | null) => void) => {
      // Immediately call with null user (unauthenticated)
      setTimeout(() => callback(null), 0);
      // Return unsubscribe function
      return () => {};
    },
    signOut: () => Promise.resolve(),
    signInWithCustomToken: () => Promise.reject(new Error("Mock auth - not implemented")),
    signInWithEmailAndPassword: () => Promise.reject(new Error("Mock auth - not implemented")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Mock auth - not implemented")),
    sendPasswordResetEmail: () => Promise.reject(new Error("Mock auth - not implemented")),
    updateProfile: () => Promise.reject(new Error("Mock auth - not implemented")),
    // Add any other auth methods that might be used
    app: null,
    name: "mock-auth",
    config: firebaseConfig,
  } as unknown as Auth;
}

export { auth };
export default app;
