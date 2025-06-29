import * as admin from "firebase-admin";
import { getFirebaseAdminConfig, env, isDevelopment } from "@hive/core";

let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore;
let authAdmin: admin.auth.Auth;

// Check if we're in build time
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

// During build time, create mock instances
if (isBuildTime) {
  const mockDb = {
    collection: () => ({
      doc: () => ({
        get: async () => ({ exists: false, data: () => null }),
        set: async () => {},
      }),
      where: () => ({
        limit: () => ({
          get: async () => ({ empty: true }),
        }),
      }),
      get: async () => ({ empty: true }),
    }),
    runTransaction: async (fn: (transaction: unknown) => Promise<void>) => await fn({}),
  } as unknown as admin.firestore.Firestore;

  const mockAuth = {
    verifyIdToken: async () => ({}),
    setCustomUserClaims: async () => {},
  } as unknown as admin.auth.Auth;

  dbAdmin = mockDb;
  authAdmin = mockAuth;
  firebaseInitialized = true;
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

    // Create mock instances for development
    const mockDb = {
      collection: (path: string) => ({
        get: async () => {
          console.log(
            `🔄 Mock Firebase call: collection(${path}).get() - development mode`
          );
          throw new Error(
            `Firebase Admin not configured for ${env.NODE_ENV}. Add credentials to environment variables.`
          );
        },
        add: async (_data: Record<string, unknown>) => {
          console.log(
            `🔄 Mock Firebase call: collection(${path}).add() - development mode`
          );
          throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
        },
        doc: (id: string) => ({
          get: async () => {
            console.log(
              `🔄 Mock Firebase call: collection(${path}).doc(${id}).get() - development mode`
            );
            throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
          },
          set: async (_data: Record<string, unknown>) => {
            console.log(
              `🔄 Mock Firebase call: collection(${path}).doc(${id}).set() - development mode`
            );
            throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
          },
          update: async (_data: Record<string, unknown>) => {
            console.log(
              `🔄 Mock Firebase call: collection(${path}).doc(${id}).update() - development mode`
            );
            throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
          },
        }),
      }),
      doc: (path: string) => ({
        get: async () => {
          console.log(
            `🔄 Mock Firebase call: doc(${path}).get() - development mode`
          );
          throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
        },
        set: async (_data: Record<string, unknown>) => {
          console.log(
            `🔄 Mock Firebase call: doc(${path}).set() - development mode`
          );
          throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
        },
        update: async (_data: Record<string, unknown>) => {
          console.log(
            `🔄 Mock Firebase call: doc(${path}).update() - development mode`
          );
          throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
        },
      }),
      batch: () => ({
        set: (_ref: unknown, _data: Record<string, unknown>) => {
          console.log(`🔄 Mock Firebase call: batch().set() - development mode`);
        },
        update: (_ref: unknown, _data: Record<string, unknown>) => {
          console.log(
            `🔄 Mock Firebase call: batch().update() - development mode`
          );
        },
        commit: async () => {
          console.log(
            `🔄 Mock Firebase call: batch().commit() - development mode`
          );
          throw new Error(`Firebase Admin not configured for ${env.NODE_ENV}.`);
        },
      }),
    };

    const mockAuth = {
      verifyIdToken: async (_token: string) => {
        console.log(`🔄 Mock Firebase call: verifyIdToken() - development mode`);
        throw new Error(`Firebase Auth not configured for ${env.NODE_ENV}.`);
      },
      createCustomToken: async (uid: string) => {
        console.log(
          `🔄 Mock Firebase call: createCustomToken(${uid}) - development mode`
        );
        throw new Error(`Firebase Auth not configured for ${env.NODE_ENV}.`);
      },
      getUser: async (uid: string) => {
        console.log(`🔄 Mock Firebase call: getUser(${uid}) - development mode`);
        throw new Error(`Firebase Auth not configured for ${env.NODE_ENV}.`);
      },
      setCustomUserClaims: async (
        uid: string,
        _claims: Record<string, unknown>
      ) => {
        console.log(
          `🔄 Mock Firebase call: setCustomUserClaims(${uid}) - development mode`
        );
        throw new Error(`Firebase Auth not configured for ${env.NODE_ENV}.`);
      },
    };

    dbAdmin = mockDb as unknown as admin.firestore.Firestore;
    authAdmin = mockAuth as unknown as admin.auth.Auth;
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
