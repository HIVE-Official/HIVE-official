import "server-only";
import * as admin from "firebase-admin";
import { env, isDevelopment, getFirebaseAdminConfig } from "@hive/core";

let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore | null = null;
let authAdmin: admin.auth.Auth | null = null;

// More robust build time detection
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build" || 
                   process.env.VERCEL_ENV === "production" ||
                   process.env.NODE_ENV === "production";

// Mock instances for build time or when Firebase is not configured
const mockDb = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => null }),
      set: async () => {},
      update: async () => {},
      delete: async () => {},
    }),
  }),
} as unknown as admin.firestore.Firestore;

const mockAuth = {
  verifyIdToken: async () => ({ uid: "mock-uid" }),
  getUser: async () => ({ uid: "mock-uid", email: "mock@example.com" }),
  createUser: async () => ({ uid: "mock-uid" }),
  updateUser: async () => ({ uid: "mock-uid" }),
  deleteUser: async () => {},
} as unknown as admin.auth.Auth;

// During build time or when Firebase is not configured, use mock instances
if (process.env.NEXT_PHASE === "phase-production-build" || !getFirebaseAdminConfig()) {
  dbAdmin = mockDb;
  authAdmin = mockAuth;
} else {
  // Initialize Firebase Admin if not already initialized
  if (!firebaseInitialized) {
    try {
      if (!admin.apps.length) {
        const adminConfig = getFirebaseAdminConfig();

        if (adminConfig) {
          admin.initializeApp({
            credential: admin.credential.cert({
              projectId: adminConfig.projectId,
              clientEmail: adminConfig.clientEmail,
              privateKey: adminConfig.privateKey,
            }),
            projectId: adminConfig.projectId,
          });

          firebaseInitialized = true;
          dbAdmin = admin.firestore();
          authAdmin = admin.auth();
        } else {
          console.warn("Firebase Admin credentials not found, using mock services");
          dbAdmin = mockDb;
          authAdmin = mockAuth;
        }
      } else {
        dbAdmin = admin.firestore();
        authAdmin = admin.auth();
      }
    } catch (error) {
      console.error("Error initializing Firebase Admin:", error);
      dbAdmin = mockDb;
      authAdmin = mockAuth;
    }
  }
}

// Primary exports
export { dbAdmin, authAdmin };

// Compatibility exports
export const db = dbAdmin;
export const auth = authAdmin;
export const adminDb = dbAdmin;
export const adminAuth = authAdmin;

// Configuration status
export const isFirebaseConfigured = firebaseInitialized;

// Environment info for debugging
export const environmentInfo = {
  environment: env.NODE_ENV,
  firebaseConfigured: firebaseInitialized,
  hasCredentials: getFirebaseAdminConfig() !== null,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  isDevelopment,
  isBuildTime,
};
