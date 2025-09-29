/**
 * Optimized Firebase imports to reduce bundle size
 * Only import what we actually use
 */

// Core Firebase - minimal imports
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';

// Auth - only required functions
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User
} from 'firebase/auth';

// Firestore - only required functions
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  type Firestore,
  type DocumentData,
  type QueryConstraint,
  type CollectionReference,
  type DocumentReference
} from 'firebase/firestore';

// Storage - only if needed
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  type Storage
} from 'firebase/storage';

// Analytics - load lazily
let analytics: any = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app: FirebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize services
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: Storage = getStorage(app);

// Lazy load analytics only when needed
export const getAnalytics = async () => {
  if (!analytics && typeof window !== 'undefined') {
    const { getAnalytics: initAnalytics, isSupported } = await import('firebase/analytics');
    if (await isSupported()) {
      analytics = initAnalytics(app);
    }
  }
  return analytics;
};

// Export optimized functions
export {
  // Auth
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,

  // Firestore
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp,

  // Storage
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,

  // Types
  type User,
  type DocumentData,
  type QueryConstraint,
  type CollectionReference,
  type DocumentReference
};

// Helper to get timestamp
export const getTimestamp = () => serverTimestamp();

// Helper for batch operations (lazy loaded)
export const getBatch = async () => {
  const { writeBatch } = await import('firebase/firestore');
  return writeBatch(db);
};

// Helper for transactions (lazy loaded)
export const runTransaction = async (updateFunction: any) => {
  const { runTransaction: firestoreTransaction } = await import('firebase/firestore');
  return firestoreTransaction(db, updateFunction);
};