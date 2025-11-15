/**
 * Firebase Configuration and Initialization
 * Centralized Firebase setup with security enforcement
 */

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  connectAuthEmulator,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  connectFirestoreEmulator,
  enableIndexedDbPersistence,
  initializeFirestore
} from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration - IMPORTANT: Use direct references for Next.js build-time inlining
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '' // Optional
};

// Validate configuration in production
if (process.env.NODE_ENV === 'production') {
  const requiredVars = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missing = requiredVars.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);
  if (missing.length > 0) {
    console.error(`Missing Firebase environment variables: ${missing.join(', ')}`);
    throw new Error(`Firebase configuration error: ${missing.join(', ')} required`);
  }
}

// Security check - ensure we're not using dev config in production
if (process.env.NODE_ENV === 'production') {
  if (firebaseConfig.projectId?.includes('demo') ||
      firebaseConfig.projectId?.includes('test') ||
      firebaseConfig.authDomain?.includes('localhost')) {
    throw new Error('Development Firebase configuration detected in production!');
  }
}

// Initialize Firebase App
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize Auth with security settings
const auth: Auth = getAuth(app);

// Set persistence for web
if (typeof window !== 'undefined') {
  setPersistence(auth, browserLocalPersistence).catch(console.error);
}

// Initialize Firestore with settings
const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: false, // Use WebSocket
  cacheSizeBytes: 50 * 1024 * 1024, // 50MB cache
});

// Enable offline persistence for web
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
  enableIndexedDbPersistence(db, {
    forceOwnership: false // Don't force ownership in tabs
  }).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence not supported in this browser');
    }
  });
}

// Initialize Storage
const storage: FirebaseStorage = getStorage(app);

// Initialize Analytics (client-side only)
let analytics: Analytics | undefined;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
  const EMULATOR_HOST = process.env.NEXT_PUBLIC_EMULATOR_HOST || 'localhost';

  // Only connect if not already connected
  if (!(auth as any).emulatorConfig) {
    connectAuthEmulator(auth, `http://${EMULATOR_HOST}:9099`, { disableWarnings: true });
  }

  if (!(db as any)._settings?.host?.includes('localhost')) {
    connectFirestoreEmulator(db, EMULATOR_HOST, 8080);
  }

  if (!(storage as any)._host?.includes('localhost')) {
    connectStorageEmulator(storage, EMULATOR_HOST, 9199);
  }

  console.log('🔧 Firebase Emulators Connected');
}

// Campus validation helper
export const validateCampusAccess = (userCampusId: string, requestedCampusId: string): boolean => {
  if (!userCampusId || !requestedCampusId) {
    console.error('Campus validation failed: Missing campus IDs');
    return false;
  }

  // In production, strictly enforce campus isolation
  if (process.env.NODE_ENV === 'production') {
    return userCampusId === requestedCampusId;
  }

  // In development, allow but warn
  if (userCampusId !== requestedCampusId) {
    console.warn(`⚠️ Campus mismatch: User campus ${userCampusId} accessing ${requestedCampusId}`);
  }

  return userCampusId === requestedCampusId;
};

// Rate limiting helper (in-memory for now, use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean => {
  const now = Date.now();
  const limit = rateLimitMap.get(identifier);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }

  if (limit.count >= maxRequests) {
    return false;
  }

  limit.count++;
  return true;
};

// Clean up old rate limit entries periodically
if (typeof window !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000); // Clean up every minute
}

export { app, auth, db, storage, analytics };

// Type exports
export type { FirebaseApp, Auth, Firestore, FirebaseStorage, Analytics };