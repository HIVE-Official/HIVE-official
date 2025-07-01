import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics";

// Required Firebase configuration fields
const requiredConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
} as const;

// Optional Firebase configuration fields
const optionalConfig = {
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
} as const;

// Check for missing required environment variables
const missingRequiredVars = Object.entries(requiredConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);

if (missingRequiredVars.length > 0) {
  console.warn(`🚨 Missing required Firebase environment variables: ${missingRequiredVars.join(', ')}`);
  console.warn('Please create apps/web/.env.local with your Firebase configuration');
  console.warn('See apps/web/.env.example for the required format');
}

// Development fallback values
const devFallbacks = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-project.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo-project.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:demo',
  measurementId: 'G-DEMO',
  databaseURL: undefined,
};

// Build Firebase config object with required and optional fields
const firebaseConfig = {
  // Required fields (with fallbacks for development)
  apiKey: requiredConfig.apiKey || devFallbacks.apiKey,
  authDomain: requiredConfig.authDomain || devFallbacks.authDomain,
  projectId: requiredConfig.projectId || devFallbacks.projectId,
  
  // Optional fields (only include if defined)
  ...(optionalConfig.storageBucket && { storageBucket: optionalConfig.storageBucket }),
  ...(optionalConfig.messagingSenderId && { messagingSenderId: optionalConfig.messagingSenderId }),
  ...(optionalConfig.appId && { appId: optionalConfig.appId }),
  ...(optionalConfig.measurementId && { measurementId: optionalConfig.measurementId }),
  ...(optionalConfig.databaseURL && { databaseURL: optionalConfig.databaseURL }),
};

// Initialize Firebase app
let app: FirebaseApp;
let db: Firestore;
let auth: Auth;
let storage: FirebaseStorage;
let analytics: Analytics | undefined;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
  
  // Only initialize analytics in the browser with valid config
  if (typeof window !== 'undefined' && firebaseConfig.measurementId && 
      firebaseConfig.apiKey !== 'demo-api-key') {
    try {
      analytics = getAnalytics(app);
    } catch (error) {
      console.warn("Analytics initialization failed:", error);
      // Don't throw - this is not critical for app functionality
      analytics = undefined;
    }
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

export { app, db, auth, storage, analytics };
