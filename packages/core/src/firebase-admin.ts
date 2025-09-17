import * as admin from "firebase-admin";

// Environment detection
function getCurrentEnvironment(): "development" | "staging" | "production" {
  const env = process.env.NODE_ENV || "development";
  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === "production") return "production";
  if (vercelEnv === "preview") return "staging";
  if (env === "production") return "production";
  if (env === "staging") return "staging";

  return "development";
}

const currentEnvironment = getCurrentEnvironment();

let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore;
let authAdmin: admin.auth.Auth;

try {
  if (!admin.apps.length) {
    let credential: admin.credential.Credential | undefined;

    // Try different credential formats
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      // Format 1: Individual environment variables (Vercel recommended)
      credential = admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID || "hive-9265c",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
    } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      // Format 2: Base64 encoded service account (existing pattern)
      try {
        const serviceAccountJson = JSON.parse(
          Buffer.from(
            process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
            "base64"
          ).toString("ascii")
        ) as admin.ServiceAccount;
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
        projectId: process.env.FIREBASE_PROJECT_ID || "hive-9265c",
      });

      dbAdmin = admin.firestore();
      authAdmin = admin.auth();
      firebaseInitialized = true;
    } else {
      throw new Error("No valid Firebase credentials found");
    }
  } else {
    // App already initialized
    dbAdmin = admin.firestore();
    authAdmin = admin.auth();
    firebaseInitialized = true;
  }
} catch (error) {
  console.warn(
    `⚠️ Firebase Admin initialization failed for ${currentEnvironment}:`,
    error
  );

  // Create mock instances for development
  dbAdmin = {
    collection: (_path: string) => ({
      get: async () => {
        
        throw new Error(
          `Firebase Admin not configured for ${currentEnvironment}. Add credentials to environment variables.`
        );
      },
      add: async () => {
        
        throw new Error(
          `Firebase Admin not configured for ${currentEnvironment}.`
        );
      },
      doc: (_id: string) => ({
        get: async () => {
          
          throw new Error(
            `Firebase Admin not configured for ${currentEnvironment}.`
          );
        },
        set: async () => {
          
          throw new Error(
            `Firebase Admin not configured for ${currentEnvironment}.`
          );
        },
      }),
    }),
  } as unknown as admin.firestore.Firestore;

  authAdmin = {
    verifyIdToken: async () => {
      throw new Error(
        `Firebase Auth not configured for ${currentEnvironment}.`
      );
    },
    createCustomToken: async (_uid: string) => {
      
      throw new Error(
        `Firebase Auth not configured for ${currentEnvironment}.`
      );
    },
  } as unknown as admin.auth.Auth;
}

export { dbAdmin, authAdmin };

// Re-export for compatibility
export const db = dbAdmin;
export const auth = authAdmin;
export const adminFirestore = dbAdmin;
export const firebaseAuth = authAdmin;
export const isFirebaseConfigured = firebaseInitialized;

// Function exports for compatibility
export const getFirestoreAdmin = () => dbAdmin;
export const getAuthAdmin = () => authAdmin;

// Environment info for debugging
export const environmentInfo = {
  environment: currentEnvironment,
  firebaseConfigured: firebaseInitialized,
  projectId: process.env.FIREBASE_PROJECT_ID || "hive-9265c",
  credentialSource: firebaseInitialized
    ? process.env.FIREBASE_PRIVATE_KEY
      ? "individual_vars"
      : process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? "base64_key"
        : "application_default"
    : "none",
};
