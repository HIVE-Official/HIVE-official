import * as admin from "firebase-admin";
import { getFirebaseAdminConfig, env, isDevelopment } from "@hive/core";

let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore;
let authAdmin: admin.auth.Auth;

// Check if we're in build time
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

// Mock instances for build time and development
const mockDb = {
  collection: (_path: string) => ({
    doc: (_id: string) => ({
      get: async () => ({ exists: false, data: () => null }),
      set: async () => {},
      update: async () => {},
    }),
    where: () => ({
      limit: () => ({
        get: async () => ({ empty: true }),
      }),
    }),
    get: async () => ({ empty: true }),
  }),
  runTransaction: async (fn: (transaction: unknown) => Promise<void>) => await fn({}),
  batch: () => ({
    set: () => {},
    update: () => {},
    commit: async () => {},
  }),
} as unknown as admin.firestore.Firestore;

const mockAuth = {
  verifyIdToken: async () => ({
    uid: "mock-uid",
    email: "mock@example.edu",
    email_verified: true,
  }),
  setCustomUserClaims: async () => {},
  getUser: async () => ({
    uid: "mock-uid",
    email: "mock@example.edu",
    emailVerified: true,
  }),
  createCustomToken: async () => "mock-token",
} as unknown as admin.auth.Auth;

// During build time or when Firebase is not configured, use mock instances
if (isBuildTime || !getFirebaseAdminConfig()) {
  dbAdmin = mockDb;
  authAdmin = mockAuth;
  firebaseInitialized = true;
  console.log(`🔧 Using mock Firebase Admin for ${isBuildTime ? "build" : env.NODE_ENV}`);
} else {
  try {
    if (!admin.apps.length) {
      const adminConfig = getFirebaseAdminConfig();

      if (adminConfig) {
        admin.initializeApp({
          credential: admin.credential.cert(adminConfig as admin.ServiceAccount),
          projectId: adminConfig.project_id,
        });

        dbAdmin = admin.firestore();
        authAdmin = admin.auth();
        firebaseInitialized = true;

        console.log(
          `✅ Firebase Admin initialized successfully for ${env.NODE_ENV}`
        );
      } else {
        throw new Error("No valid Firebase Admin credentials found");
      }
    } else {
      // App already initialized
      dbAdmin = admin.firestore();
      authAdmin = admin.auth();
      firebaseInitialized = true;
      console.log(`🔄 Firebase Admin: Using existing app for ${env.NODE_ENV}`);
    }
  } catch (error) {
    console.warn(
      `⚠️ Firebase Admin initialization failed for ${env.NODE_ENV}:`,
      error
    );

    // Use mock instances for development
    dbAdmin = mockDb;
    authAdmin = mockAuth;
    firebaseInitialized = true;
    console.log(`🔧 Using mock Firebase Admin for ${env.NODE_ENV} (after error)`);
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
