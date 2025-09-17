import { initializeApp, cert, getApps, getApp, ServiceAccount } from 'firebase-admin/app';
import { logger } from '@/lib/logger';

import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin SDK
let adminApp;

try {
  // Check if admin app already exists
  if (getApps().length === 0) {
    // Get service account from environment or file
    let serviceAccount: ServiceAccount;
    
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      // Parse from environment variable
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount;
    } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      // Build from individual environment variables
      serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      };
    } else {
      // Missing required Firebase Admin credentials
      const missingVars = [];
      if (!process.env.FIREBASE_SERVICE_ACCOUNT && !process.env.FIREBASE_PROJECT_ID) missingVars.push('FIREBASE_PROJECT_ID');
      if (!process.env.FIREBASE_SERVICE_ACCOUNT && !process.env.FIREBASE_CLIENT_EMAIL) missingVars.push('FIREBASE_CLIENT_EMAIL');
      if (!process.env.FIREBASE_SERVICE_ACCOUNT && !process.env.FIREBASE_PRIVATE_KEY) missingVars.push('FIREBASE_PRIVATE_KEY');
      
      throw new Error(
        `Firebase Admin initialization failed. Missing required environment variables: ${missingVars.join(', ')}. ` +
        `Please set FIREBASE_SERVICE_ACCOUNT or the individual variables (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).`
      );
    }

    adminApp = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.projectId}.appspot.com`
    });
  } else {
    adminApp = getApp();
  }
} catch (error) {
  logger.error('Failed to initialize Firebase Admin:', { error: String(error) });
  throw new Error(
    `Firebase Admin initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}. ` +
    `Please check your Firebase configuration and ensure all required environment variables are set.`
  );
}

// Export admin services
export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);

// Helper functions for common admin operations
export const verifyIdToken = async (token: string) => {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (error) {
    logger.error('Failed to verify ID token:', { error: String(error) });
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await adminAuth.getUserByEmail(email);
  } catch (error) {
    logger.error('Failed to get user by email:', { error: String(error) });
    return null;
  }
};

export const createCustomToken = async (uid: string, claims?: object) => {
  try {
    return await adminAuth.createCustomToken(uid, claims);
  } catch (error) {
    logger.error('Failed to create custom token:', { error: String(error) });
    return null;
  }
};

export const setCustomUserClaims = async (uid: string, claims: object) => {
  try {
    await adminAuth.setCustomUserClaims(uid, claims);
    return true;
  } catch (error) {
    logger.error('Failed to set custom claims:', { error: String(error) });
    return false;
  }
};

// Firestore helpers with proper typing
export const serverTimestamp = () => adminDb.FieldValue.serverTimestamp();
export const deleteField = () => adminDb.FieldValue.delete();
export const arrayUnion = (...elements: any[]) => adminDb.FieldValue.arrayUnion(...elements);
export const arrayRemove = (...elements: any[]) => adminDb.FieldValue.arrayRemove(...elements);
export const increment = (n: number) => adminDb.FieldValue.increment(n);

export default adminApp;