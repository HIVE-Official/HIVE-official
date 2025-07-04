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

// Mock school data for development
const mockSchoolData = {
  buffalo: {
    id: 'buffalo',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open',
    studentsUntilOpen: 0,
    waitlistCount: 0
  }
};

// Mock instances for build time or when Firebase is not configured
const mockDb = {
  collection: (collectionName: string) => ({
    doc: (docId: string) => ({
      get: async () => {
        console.log(`🔄 Mock Firebase call: collection(${collectionName}).doc(${docId}).get() - development mode`);
        
        if (collectionName === 'schools' && mockSchoolData[docId as keyof typeof mockSchoolData]) {
          const schoolData = mockSchoolData[docId as keyof typeof mockSchoolData];
          return { 
            exists: true, 
            data: () => schoolData,
            id: docId
          };
        }
        
        return { exists: false, data: () => null };
      },
      set: async () => {
        console.log(`🔄 Mock Firebase call: collection(${collectionName}).doc(${docId}).set() - development mode`);
      },
      update: async () => {
        console.log(`🔄 Mock Firebase call: collection(${collectionName}).doc(${docId}).update() - development mode`);
      },
      delete: async () => {
        console.log(`🔄 Mock Firebase call: collection(${collectionName}).doc(${docId}).delete() - development mode`);
      },
    }),
    add: async (data: any) => {
      console.log(`🔄 Mock Firebase call: collection(${collectionName}).add() - development mode`, data);
      return { id: 'mock-doc-id' };
    },
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
const adminConfig = getFirebaseAdminConfig();
if (process.env.NEXT_PHASE === "phase-production-build" || !adminConfig) {
  console.log("🔥 Using mock Firebase Admin for development");
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
          console.warn("🔥 Firebase Admin credentials not found, using mock services for development");
          dbAdmin = mockDb;
          authAdmin = mockAuth;
        }
      } else {
        dbAdmin = admin.firestore();
        authAdmin = admin.auth();
      }
    } catch (error) {
      console.error("🔥 Error initializing Firebase Admin, falling back to mock:", error);
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
