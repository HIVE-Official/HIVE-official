// Temporary stub for firebase-admin utilities
// TODO: Use proper firebase-admin from @hive/core

import * as admin from "firebase-admin";
import { env, isFirebaseAdminConfigured, currentEnvironment } from "./env";

let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore;
let authAdmin: admin.auth.Auth;

try {
  if (!admin.apps.length) {
    let credential: admin.credential.Credential | undefined;

    // Try different credential formats
    if (env.FIREBASE_PRIVATE_KEY && env.FIREBASE_CLIENT_EMAIL) {
      // Format 1: Individual environment variables (Vercel recommended)
      credential = admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      console.log(
        `🔐 Firebase Admin: Using individual env vars for ${currentEnvironment}`
      );
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Format 2: Base64 encoded service account (existing packages/core pattern)
      try {
        const serviceAccountJson = JSON.parse(
          Buffer.from(
            process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
            "base64"
          ).toString("ascii")
        );
        credential = admin.credential.cert(serviceAccountJson);
        console.log(
          `🔐 Firebase Admin: Using base64 service account for ${currentEnvironment}`
        );
      } catch (error) {
        console.warn("Failed to parse base64 service account:", error);
      }
    } else {
      // Format 3: Application default credentials (development fallback)
      try {
        credential = admin.credential.applicationDefault();
        console.log(
          `🔑 Firebase Admin: Using application default credentials for ${currentEnvironment}`
        );
      } catch (credError) {
        console.warn(
          `⚠️ No Firebase Admin credentials available for ${currentEnvironment}`
        );
        throw credError;
      }
    }

    if (credential) {
      admin.initializeApp({
        credential: credential,
        projectId: env.FIREBASE_PROJECT_ID,
      });

      dbAdmin = admin.firestore();
      authAdmin = admin.auth();
      firebaseInitialized = true;

      console.log(
        `✅ Firebase Admin initialized successfully for ${currentEnvironment}`
      );
    } else {
      throw new Error("No valid Firebase credentials found");
    }
  } else {
    // App already initialized
    dbAdmin = admin.firestore();
    authAdmin = admin.auth();
    firebaseInitialized = true;
    console.log(
      `🔄 Firebase Admin: Using existing app for ${currentEnvironment}`
    );
  }
} catch (error) {
  console.warn(
    `⚠️ Firebase Admin initialization failed for ${currentEnvironment}:`,
    error
  );

  // Create mock instances for development
  const mockDb = {
    collection: (path: string) => ({
      get: async () => {
        console.log(
          `🔄 Mock Firebase call: collection(${path}).get() - returning development data`
        );
        throw new Error(
          `Firebase Admin not configured for ${currentEnvironment}. Add credentials to environment variables.`
        );
      },
      add: async (_data: Record<string, unknown>) => {
        console.log(
          `🔄 Mock Firebase call: collection(${path}).add() - development mode`
        );
        throw new Error(
          `Firebase Admin not configured for ${currentEnvironment}.`
        );
      },
      doc: (id: string) => ({
        get: async () => {
          console.log(
            `🔄 Mock Firebase call: collection(${path}).doc(${id}).get() - development mode`
          );
          throw new Error(
            `Firebase Admin not configured for ${currentEnvironment}.`
          );
        },
        set: async (_data: Record<string, unknown>) => {
          console.log(
            `🔄 Mock Firebase call: collection(${path}).doc(${id}).set() - development mode`
          );
          throw new Error(
            `Firebase Admin not configured for ${currentEnvironment}.`
          );
        },
      }),
    }),
  };

  const mockAuth = {
    verifyIdToken: async (_token: string) => {
      console.log(`🔄 Mock Firebase call: verifyIdToken() - development mode`);
      throw new Error(
        `Firebase Auth not configured for ${currentEnvironment}.`
      );
    },
    createCustomToken: async (uid: string) => {
      console.log(
        `🔄 Mock Firebase call: createCustomToken(${uid}) - development mode`
      );
      throw new Error(
        `Firebase Auth not configured for ${currentEnvironment}.`
      );
    },
  };

  dbAdmin = mockDb as unknown as admin.firestore.Firestore;
  authAdmin = mockAuth as unknown as admin.auth.Auth;
}

export { dbAdmin, authAdmin };

// Re-export for compatibility with existing code
export const db = dbAdmin;
export const auth = authAdmin;
export const isFirebaseConfigured = firebaseInitialized;

// Re-export environment utilities
export { currentEnvironment, isFirebaseAdminConfigured } from "./env";

// Environment info for debugging
export const environmentInfo = {
  environment: currentEnvironment,
  firebaseConfigured: firebaseInitialized,
  hasServiceAccount: isFirebaseAdminConfigured,
  projectId: env.FIREBASE_PROJECT_ID,
  credentialSource: firebaseInitialized
    ? env.FIREBASE_PRIVATE_KEY
      ? "individual_vars"
      : process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? "base64_key"
        : "application_default"
    : "none",
};
