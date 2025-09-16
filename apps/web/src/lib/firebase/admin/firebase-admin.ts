// Firebase Admin SDK configuration and initialization
// Server-side Firebase setup for administrative operations

import * as admin from "firebase-admin";
import { logger } from '@/lib/logger';

import { env, isFirebaseAdminConfigured, currentEnvironment } from "../../env";

let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore;
let authAdmin: admin.auth.Auth;
let storageAdmin: admin.storage.Storage;
let messagingAdmin: admin.messaging.Messaging;

try {
  if (!admin.apps.length) {
    let credential: admin.credential.Credential | undefined;

    // Try different credential formats
    if (env.FIREBASE_PRIVATE_KEY && env.FIREBASE_CLIENT_EMAIL) {
      // Format 1: Individual environment variables (Vercel recommended)
      try {
        // Handle different private key formats
        let privateKey = env.FIREBASE_PRIVATE_KEY;
        
        // If the key doesn't start with -----BEGIN, it might be escaped or encoded
        if (!privateKey.includes('-----BEGIN')) {
          // Try to decode if it's base64 encoded
          try {
            const decoded = Buffer.from(privateKey, 'base64').toString('utf-8');
            if (decoded.includes('-----BEGIN')) {
              privateKey = decoded;
            }
          } catch (e) {
            // Not base64, continue with original
          }
        }
        
        // Replace escaped newlines with actual newlines
        privateKey = privateKey.replace(/\\n/g, '\n');
        
        // Ensure proper formatting
        if (!privateKey.includes('\n') && privateKey.includes('-----BEGIN')) {
          // Add newlines after BEGIN and before END if missing
          privateKey = privateKey
            .replace(/-----BEGIN PRIVATE KEY-----/, '-----BEGIN PRIVATE KEY-----\n')
            .replace(/-----END PRIVATE KEY-----/, '\n-----END PRIVATE KEY-----');
        }
        
        credential = admin.credential.cert({
          projectId: env.FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: privateKey,
        });
      } catch (certError) {
        console.warn("Failed to create certificate credential:", certError);
        // Fall through to other methods
      }
    }
    
    if (!credential && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
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
        storageBucket: `${env.FIREBASE_PROJECT_ID}.appspot.com`
      });

      dbAdmin = admin.firestore();
      authAdmin = admin.auth();
      storageAdmin = admin.storage();
      messagingAdmin = admin.messaging();
      firebaseInitialized = true;

    } else {
      throw new Error("No valid Firebase credentials found");
    }
  } else {
    // App already initialized
    dbAdmin = admin.firestore();
    authAdmin = admin.auth();
    storageAdmin = admin.storage();
    messagingAdmin = admin.messaging();
    firebaseInitialized = true;
  }
} catch (error) {
  logger.error('🚨 CRITICAL: Firebase Admin initialization failed for ${currentEnvironment}:', { error: String(error) });

  // In production, Firebase Admin MUST be properly configured
  if (currentEnvironment === 'production') {
    throw new Error(
      `PRODUCTION FAILURE: Firebase Admin credentials not configured. This will prevent the application from functioning. Please check environment variables: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL`
    );
  }

  // Only use mocks in development environment
  if (currentEnvironment === 'development') {
    console.warn(`⚠️ Firebase Admin initialization failed for development:`, error);
    dbAdmin = {
      collection: (path: string) => ({
        doc: (id: string) => ({
          get: async () => ({ exists: false, data: () => null }),
          set: async (data: any) => {},
          update: async (data: any) => {},
        }),
        add: async (data: any) => {
          return { id: `mock-${Date.now()}` };
        },
        where: () => ({ get: async () => ({ docs: [] }) }),
      }),
    } as any;

    storageAdmin = {
      bucket: () => ({
        file: (path: string) => ({
          save: async (buffer: Buffer) => {},
          delete: async () => {},
          getSignedUrl: async () => [`https://mock-storage.com/${path}`],
          exists: async () => [false],
        }),
        upload: async (filepath: string) => {},
      }),
    } as any;

    authAdmin = {
      verifyIdToken: async (token: string) => {

        // In development, accept Firebase emulator JWT tokens
        if (token.includes('.') && token.split('.').length === 3) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            
            // Check if it's a Firebase dev project token
            if (payload.iss?.includes('dev-project') || payload.aud === 'dev-project') {
              return {
                uid: payload.user_id || payload.sub || 'dev-user',
                email: payload.email || 'test@dev-project.com',
                email_verified: payload.email_verified || true,
              };
            }
          } catch (err) {
            console.warn('Failed to parse dev JWT token:', err);
          }
        }
        
        // Fallback for other dev tokens
        if (token.startsWith('dev_token_') || token === 'test-token') {
          return {
            uid: 'dev-user-123',
            email: 'test@dev-project.com',
            email_verified: true,
          };
        }
        
        throw new Error('Invalid token for development mode');
      },
      createCustomToken: async (uid: string) => {
        
        // Generate a mock custom token
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
          iss: 'https://securetoken.google.com/dev-project',
          aud: 'dev-project',
          user_id: uid,
          sub: uid,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 3600,
        }));
        const signature = btoa('dev-signature');
        return `${header}.${payload}.${signature}`;
      },
    } as any;

    messagingAdmin = {
      send: async (message: any) => {
        
        return `mock-message-${Date.now()}`;
      },
      sendMulticast: async (message: any) => {
        
        return {
          successCount: 1,
          failureCount: 0,
          responses: [{ success: true, messageId: `mock-message-${Date.now()}` }]
        };
      },
    } as any;
  } else {
    // In production/staging, fail fast if Firebase Admin cannot initialize
    logger.error('❌ CRITICAL: Firebase Admin initialization failed for ${currentEnvironment}');
    logger.error('Error details:', { error: String(error) });
    throw new Error(`Firebase Admin initialization failed. Check service account configuration.`);
  }
}

// Primary exports - ensure variables are always defined
const dbExport = dbAdmin as admin.firestore.Firestore;
const authExport = authAdmin as admin.auth.Auth;
const storageExport = storageAdmin as admin.storage.Storage;
const messagingExport = messagingAdmin as admin.messaging.Messaging;

export { dbExport as dbAdmin, authExport as authAdmin, storageExport as storageAdmin, messagingExport as adminMessaging };

// Re-export for compatibility with existing code
export const db = dbExport;
export const auth = authExport;
export const storage = storageExport;

// Additional aliases for backward compatibility
export const adminDb = dbExport;
export const adminAuth = authExport;
export const adminStorage = storageExport;
export const isFirebaseConfigured = firebaseInitialized;

// Re-export environment utilities
export { currentEnvironment, isFirebaseAdminConfigured } from "../../env";

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

// Helper functions for common admin operations
export const verifyIdToken = async (token: string) => {
  if (!authAdmin) {
    logger.error('Firebase Admin Auth not initialized');
    return null;
  }
  try {
    return await authAdmin.verifyIdToken(token);
  } catch (error) {
    logger.error('Failed to verify ID token:', { error: String(error) });
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  if (!authAdmin) {
    logger.error('Firebase Admin Auth not initialized');
    return null;
  }
  try {
    return await authAdmin.getUserByEmail(email);
  } catch (error) {
    logger.error('Failed to get user by email:', { error: String(error) });
    return null;
  }
};

export const createCustomToken = async (uid: string, claims?: object) => {
  if (!authAdmin) {
    logger.error('Firebase Admin Auth not initialized');
    return null;
  }
  try {
    return await authAdmin.createCustomToken(uid, { error: String(claims) });
  } catch (error) {
    logger.error('Failed to create custom token:', { error: String(error) });
    return null;
  }
};

export const setCustomUserClaims = async (uid: string, claims: object) => {
  if (!authAdmin) {
    logger.error('Firebase Admin Auth not initialized');
    return false;
  }
  try {
    await authAdmin.setCustomUserClaims(uid, { error: String(claims) });
    return true;
  } catch (error) {
    logger.error('Failed to set custom claims:', { error: String(error) });
    return false;
  }
};

// Firestore helpers with proper typing
export const serverTimestamp = () => {
  if (!dbAdmin) {
    throw new Error('Firebase Admin Firestore not initialized');
  }
  return admin.firestore.FieldValue.serverTimestamp();
};

export const deleteField = () => {
  if (!dbAdmin) {
    throw new Error('Firebase Admin Firestore not initialized');
  }
  return admin.firestore.FieldValue.delete();
};

export const arrayUnion = (...elements: any[]) => {
  if (!dbAdmin) {
    throw new Error('Firebase Admin Firestore not initialized');
  }
  return admin.firestore.FieldValue.arrayUnion(...elements);
};

export const arrayRemove = (...elements: any[]) => {
  if (!dbAdmin) {
    throw new Error('Firebase Admin Firestore not initialized');
  }
  return admin.firestore.FieldValue.arrayRemove(...elements);
};

export const increment = (n: number) => {
  if (!dbAdmin) {
    throw new Error('Firebase Admin Firestore not initialized');
  }
  return admin.firestore.FieldValue.increment(n);
};
