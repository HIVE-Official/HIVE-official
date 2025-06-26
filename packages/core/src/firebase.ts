import type { FirebaseApp } from 'firebase/app';
import { initializeApp, getApps, getApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import { getStorage } from 'firebase/storage';
import type { Analytics } from 'firebase/analytics';
import { getAnalytics } from 'firebase/analytics';

// Environment variable validation
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
} as const;

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);

if (missingVars.length > 0) {
  console.warn(`🚨 Missing Firebase environment variables: ${missingVars.join(', ')}`);
  console.warn('Please create apps/web/.env.local with your Firebase configuration');
  console.warn('See apps/web/.env.example for the required format');
}

// Use environment variables or fallback values for development
const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey || 'demo-api-key',
  authDomain: requiredEnvVars.authDomain || 'demo-project.firebaseapp.com',
  projectId: requiredEnvVars.projectId || 'demo-project',
  storageBucket: requiredEnvVars.storageBucket || 'demo-project.appspot.com',
  messagingSenderId: requiredEnvVars.messagingSenderId || '123456789',
  appId: requiredEnvVars.appId || '1:123456789:web:demo',
  measurementId: requiredEnvVars.measurementId || 'G-DEMO',
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
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw new Error('Failed to initialize Firebase. Please check your configuration.');
}

export { app, db, auth, storage, analytics };
