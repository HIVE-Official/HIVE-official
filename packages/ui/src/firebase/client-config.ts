/**
 * HIVE Firebase Client Configuration
 * Clean, production-ready Firebase setup for authentication
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration - will be loaded from environment
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate required configuration
const requiredFields = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
] as const;

for (const field of requiredFields) {
  if (!process.env[field]) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required Firebase config: ${field}`);
    } else {
      console.warn(`⚠️ Missing Firebase config: ${field}`);
    }
  }
}

// Initialize Firebase app (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth(app);

// Configure auth settings for production
if (process.env.NODE_ENV === 'production') {
  // Add any production-specific auth settings here
} else {
}

export default app;