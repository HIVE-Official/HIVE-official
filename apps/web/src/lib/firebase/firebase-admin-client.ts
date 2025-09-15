import { initializeApp, cert, getApps, getApp, ServiceAccount } from 'firebase-admin/app';
import { logger } from '@hive/core/utils/logger';

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
      // Fallback for development
      console.warn('Firebase Admin: No service account found. Some features may not work.');
      // Create a minimal service account for development
      serviceAccount = {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'hive-campus-dev',
        clientEmail: 'dev@hive-campus.iam.gserviceaccount.com',
        privateKey: '-----BEGIN PRIVATE KEY-----\nDEVELOPMENT_KEY\n-----END PRIVATE KEY-----\n'
      };
    }

    adminApp = initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.projectId}.appspot.com`
    });
  } else {
    adminApp = getApp();
  }
} catch (error) {
  logger.error('Failed to initialize Firebase Admin:', error);
  // Create a fallback app for development
  adminApp = initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'hive-campus-dev'
  });
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
    logger.error('Failed to verify ID token:', error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    return await adminAuth.getUserByEmail(email);
  } catch (error) {
    logger.error('Failed to get user by email:', error);
    return null;
  }
};

export const createCustomToken = async (uid: string, claims?: object) => {
  try {
    return await adminAuth.createCustomToken(uid, claims);
  } catch (error) {
    logger.error('Failed to create custom token:', error);
    return null;
  }
};

export const setCustomUserClaims = async (uid: string, claims: object) => {
  try {
    await adminAuth.setCustomUserClaims(uid, claims);
    return true;
  } catch (error) {
    logger.error('Failed to set custom claims:', error);
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