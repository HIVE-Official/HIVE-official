import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth, type User, type UserCredential, type IdTokenResult } from "firebase/auth";
import { logger } from "@hive/core";

// Development mode is when we're running locally without Firebase config
const isDevelopment = process.env.NODE_ENV === 'development';

// These are the production values - they will be overridden by .env.local in production
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hive-9265c.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hive-9265c",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hive-9265c.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "573191826528",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:573191826528:web:1d5eaeb8531276e4c1a705",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-NK3E12MSFD"
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

// Mock user type matching Firebase User interface
interface MockUser extends Partial<User> {
  uid: string;
  email: string | null;
  displayName: string | null;
  emailVerified: boolean;
  getIdTokenResult(): Promise<IdTokenResult>;
  getIdToken(): Promise<string>;
}

// In development, we'll use a mock auth object
if (isDevelopment) {
  logger.info("🔥 Running in development mode with mock auth");
  
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
    signInWithCustomToken: () => {
      logger.info("🔥 Mock auth: signInWithCustomToken called");
      const mockUser: MockUser = {
        uid: 'mock-uid',
        email: 'dev@buffalo.edu',
        displayName: 'Dev User',
        emailVerified: true,
        getIdTokenResult: () => Promise.resolve({
          claims: {
            onboardingCompleted: false,
            isBuilder: true
          },
          token: 'mock-token',
          authTime: new Date().toISOString(),
          issuedAtTime: new Date().toISOString(),
          expirationTime: new Date(Date.now() + 3600000).toISOString(),
          signInProvider: 'custom',
          signInSecondFactor: null
        }),
        getIdToken: () => Promise.resolve('mock-token')
      };
      
      return Promise.resolve({
        user: mockUser,
        operationType: 'signIn',
        providerId: 'custom'
      } as UserCredential);
    },
    signInWithEmailAndPassword: () => Promise.reject(new Error("Mock auth - not implemented")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Mock auth - not implemented")),
    sendPasswordResetEmail: () => Promise.reject(new Error("Mock auth - not implemented")),
    updateProfile: () => Promise.reject(new Error("Mock auth - not implemented")),
    app: null,
    name: "mock-auth",
    config: firebaseConfig,
  } as unknown as Auth;
} else {
  // Production mode - use real Firebase
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
}

export { auth };
export default app;
