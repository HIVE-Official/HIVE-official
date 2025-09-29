// Temporary stub for firebase-admin utilities
// TODO: Use proper firebase-admin from @hive/core

import * as admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { env, isFirebaseAdminConfigured, currentEnvironment } from "./env";

let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore;
let authAdmin: admin.auth.Auth;

try {
  if (!admin.apps.length) {
    let credential: admin.credential.Credential | undefined;

    // Try different credential formats
    if (process.env.FIREBASE_PRIVATE_KEY_BASE64) {
      // Format 1: Base64 encoded private key (Recommended for Vercel)
      // This prevents multiline string issues in environment variables
      try {
        const decodedKey = Buffer.from(
          process.env.FIREBASE_PRIVATE_KEY_BASE64,
          "base64"
        ).toString("utf-8");

        credential = admin.credential.cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: decodedKey,
        });
      } catch (error) {
        console.error("Failed to decode base64 private key:", error);
      }
    } else if (env.FIREBASE_PRIVATE_KEY && env.FIREBASE_CLIENT_EMAIL) {
      // Format 2: Individual environment variables (legacy)
      credential = admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
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
      } catch (error) {
        console.warn("Failed to parse base64 service account:", error);
      }
    } else {
      // Format 3: Application default credentials (development fallback)
      try {
        credential = admin.credential.applicationDefault();
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

      dbAdmin = getFirestore();
      authAdmin = getAuth();
      firebaseInitialized = true;

    } else {
      throw new Error("No valid Firebase credentials found");
    }
  } else {
    // App already initialized
    dbAdmin = getFirestore();
    authAdmin = getAuth();
    firebaseInitialized = true;
  }
} catch (error) {
  console.error(
    `🚨 CRITICAL: Firebase Admin initialization failed for ${currentEnvironment}:`,
    error
  );

  // In production, Firebase Admin MUST be properly configured
  if (currentEnvironment === 'production') {
    throw new Error(
      `PRODUCTION FAILURE: Firebase Admin credentials not configured. This will prevent the application from functioning. Please check environment variables: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL`
    );
  }

  // Development fallback - but still throw errors to encourage proper setup
  
  dbAdmin = {
    collection: () => {
      throw new Error(`Firebase Admin not configured for ${currentEnvironment}. Add credentials to continue.`);
    },
  } as any;

  authAdmin = {
    verifyIdToken: async () => {
      throw new Error(`Firebase Admin not configured for ${currentEnvironment}. Add credentials to continue.`);
    },
    createCustomToken: async () => {
      throw new Error(`Firebase Admin not configured for ${currentEnvironment}. Add credentials to continue.`);
    },
  } as any;
}

export { dbAdmin, authAdmin };

// Re-export for compatibility with existing code
export const db = dbAdmin;
export const adminDb = dbAdmin; // Alias for modules expecting adminDb
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
