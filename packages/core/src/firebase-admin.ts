import * as admin from "firebase-admin";

// Environment detection
function getCurrentEnvironment(): "development" | "staging" | "production" {
  const env = (process.env.NODE_ENV as string) || "development";
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
        projectId: process.env.FIREBASE_PROJECT_ID || "hive-dev-2025",
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      });
      console.log(
        `🔐 Firebase Admin: Using individual env vars for ${currentEnvironment}`
      );
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
        projectId: process.env.FIREBASE_PROJECT_ID || "hive-dev-2025",
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
  dbAdmin = {
    collection: (path: string) => ({
      get: async () => {
        console.log(
          `🔄 Mock Firebase call: collection(${path}).get() - returning development data`
        );
        throw new Error(
          `Firebase Admin not configured for ${currentEnvironment}. Add credentials to environment variables.`
        );
      },
      add: async () => {
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
        set: async () => {
          console.log(
            `🔄 Mock Firebase call: collection(${path}).doc(${id}).set() - development mode`
          );
          throw new Error(
            `Firebase Admin not configured for ${currentEnvironment}.`
          );
        },
      }),
    }),
  } as unknown as admin.firestore.Firestore;

  authAdmin = {
    verifyIdToken: async () => {
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
  } as unknown as admin.auth.Auth;
}

export { dbAdmin, authAdmin };

// Re-export for compatibility
export const db: admin.firestore.Firestore = dbAdmin;
export const auth: admin.auth.Auth = authAdmin;
export const isFirebaseConfigured = firebaseInitialized;

// Function exports for compatibility
export const getFirestoreAdmin = (): admin.firestore.Firestore => dbAdmin;
export const getAuthAdmin = (): admin.auth.Auth => authAdmin;

// Environment info for debugging
export const environmentInfo = {
  environment: currentEnvironment,
  firebaseConfigured: firebaseInitialized,
  projectId: process.env.FIREBASE_PROJECT_ID || "hive-dev-2025",
  credentialSource: firebaseInitialized
    ? process.env.FIREBASE_PRIVATE_KEY
      ? "individual_vars"
      : process.env.FIREBASE_SERVICE_ACCOUNT_KEY
        ? "base64_key"
        : "application_default"
    : "none",
};
