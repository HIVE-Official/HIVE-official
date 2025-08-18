/**
 * PRODUCTION-SECURE Firebase Admin SDK initialization
 * NO CREDENTIAL LOGGING - SECURE CREDENTIAL HANDLING
 */

import * as admin from "firebase-admin";
import { env, currentEnvironment } from "./env";
import { captureError, LogLevel } from "./error-monitoring";

/**
 * Firebase initialization state
 */
let firebaseInitialized = false;
let dbAdmin: admin.firestore.Firestore;
let authAdmin: admin.auth.Auth;
let initializationError: Error | null = null;

/**
 * Credential validation without logging sensitive data
 */
function validateCredentials(): {
  hasIndividualVars: boolean;
  hasServiceAccountKey: boolean;
  hasApplicationDefault: boolean;
} {
  return {
    hasIndividualVars: !!(env.FIREBASE_PRIVATE_KEY && env.FIREBASE_CLIENT_EMAIL),
    hasServiceAccountKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    hasApplicationDefault: false // Will be checked later
  };
}

/**
 * Secure credential loading without exposure
 */
function loadCredentials(): admin.credential.Credential | null {
  const validation = validateCredentials();
  
  try {
    // Method 1: Individual environment variables (most secure for production)
    if (validation.hasIndividualVars) {
      // Validate private key format without logging
      const privateKey = env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n");
      
      // Basic validation of key format
      if (!privateKey.includes('BEGIN PRIVATE KEY') || !privateKey.includes('END PRIVATE KEY')) {
        throw new Error('Invalid private key format');
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(env.FIREBASE_CLIENT_EMAIL!)) {
        throw new Error('Invalid client email format');
      }
      
      return admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      });
    }
    
    // Method 2: Base64 encoded service account (legacy support)
    if (validation.hasServiceAccountKey) {
      const base64Key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY!;
      
      // Validate base64 format
      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64Key)) {
        throw new Error('Invalid base64 service account key format');
      }
      
      let serviceAccountJson: any;
      try {
        const decoded = Buffer.from(base64Key, "base64").toString("utf8");
        serviceAccountJson = JSON.parse(decoded);
      } catch (parseError) {
        throw new Error('Failed to parse service account JSON');
      }
      
      // Validate service account structure
      if (!serviceAccountJson.type || serviceAccountJson.type !== 'service_account') {
        throw new Error('Invalid service account type');
      }
      
      if (!serviceAccountJson.private_key || !serviceAccountJson.client_email) {
        throw new Error('Missing required service account fields');
      }
      
      return admin.credential.cert(serviceAccountJson);
    }
    
    // Method 3: Application default credentials (development only)
    if (currentEnvironment === 'development') {
      try {
        return admin.credential.applicationDefault();
      } catch (error) {
        // Application default not available
        return null;
      }
    }
    
    return null;
  } catch (error) {
    // Log credential loading error (without sensitive data)
    console.error('Credential loading failed:', error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * SECURE Firebase initialization - NO SENSITIVE LOGGING
 */
function initializeFirebaseSecure(): void {
  try {
    if (admin.apps.length > 0) {
      // App already initialized
      dbAdmin = admin.firestore();
      authAdmin = admin.auth();
      firebaseInitialized = true;
      return;
    }
    
    const credential = loadCredentials();
    
    if (!credential) {
      throw new Error('No valid Firebase credentials available');
    }
    
    // Validate project ID
    if (!env.FIREBASE_PROJECT_ID || env.FIREBASE_PROJECT_ID.length < 1) {
      throw new Error('Invalid Firebase project ID');
    }
    
    // Initialize with minimal logging
    admin.initializeApp({
      credential: credential,
      projectId: env.FIREBASE_PROJECT_ID,
    });
    
    dbAdmin = admin.firestore();
    authAdmin = admin.auth();
    firebaseInitialized = true;
    
    // Log success without credential details
    
    
  } catch (error) {
    initializationError = error instanceof Error ? error : new Error(String(error));
    firebaseInitialized = false;
    
    // Log initialization failure (without sensitive data)
    console.error(`Firebase Admin initialization failed for ${currentEnvironment}:`, 
      error instanceof Error ? error.message : 'Unknown error');
    
    // Capture error for monitoring
    captureError(initializationError, {
      level: LogLevel.ERROR,
      tags: {
        firebase_init: 'true',
        environment: currentEnvironment
      },
      extra: {
        projectId: env.FIREBASE_PROJECT_ID,
        credentialMethods: validateCredentials(),
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }
    });
    
    // Create safe mock instances that throw clear errors
    createMockInstances();
  }
}

/**
 * Create mock instances for failed initialization
 */
function createMockInstances(): void {
  const errorMessage = `Firebase Admin not available in ${currentEnvironment}`;
  
  dbAdmin = {
    collection: () => ({
      get: async () => { throw new Error(errorMessage); },
      add: async () => { throw new Error(errorMessage); },
      doc: () => ({
        get: async () => { throw new Error(errorMessage); },
        set: async () => { throw new Error(errorMessage); },
        update: async () => { throw new Error(errorMessage); },
        delete: async () => { throw new Error(errorMessage); },
      }),
      where: () => ({
        get: async () => { throw new Error(errorMessage); },
      }),
    }),
    runTransaction: async () => { throw new Error(errorMessage); },
    batch: () => ({
      set: () => {},
      update: () => {},
      delete: () => {},
      commit: async () => { throw new Error(errorMessage); }
    }),
  } as any;
  
  authAdmin = {
    verifyIdToken: async () => { throw new Error(errorMessage); },
    createCustomToken: async () => { throw new Error(errorMessage); },
    createUser: async () => { throw new Error(errorMessage); },
    updateUser: async () => { throw new Error(errorMessage); },
    getUserByEmail: async () => { throw new Error(errorMessage); },
    deleteUser: async () => { throw new Error(errorMessage); },
  } as any;
}

/**
 * Get Firebase initialization status safely
 */
export function getFirebaseStatus(): {
  initialized: boolean;
  error: string | null;
  environment: string;
} {
  return {
    initialized: firebaseInitialized,
    error: initializationError?.message || null,
    environment: currentEnvironment
  };
}

/**
 * Initialize Firebase (called once)
 */
initializeFirebaseSecure();

/**
 * SECURE exports - no sensitive data exposed
 */
export { dbAdmin, authAdmin };

// Backward compatibility exports
export const db = dbAdmin;
export const auth = authAdmin;
export const isFirebaseConfigured = firebaseInitialized;

/**
 * Safe environment info - NO SENSITIVE DATA
 */
export const environmentInfo = {
  environment: currentEnvironment,
  firebaseConfigured: firebaseInitialized,
  projectId: env.FIREBASE_PROJECT_ID || '[NOT_SET]',
  initializationError: initializationError?.message || null,
  // Safe credential availability check
  credentialSources: {
    individualVars: !!(env.FIREBASE_PRIVATE_KEY && env.FIREBASE_CLIENT_EMAIL),
    serviceAccountKey: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  }
};

/**
 * Health check function for monitoring
 */
export async function healthCheck(): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  details: {
    firebase: boolean;
    environment: string;
    error?: string;
  };
}> {
  const details = {
    firebase: firebaseInitialized,
    environment: currentEnvironment,
    ...(initializationError && { error: initializationError.message })
  };
  
  if (firebaseInitialized) {
    return { status: 'healthy', details };
  } else if (currentEnvironment === 'development') {
    return { status: 'degraded', details };
  } else {
    return { status: 'unhealthy', details };
  }
}

// Re-export environment utilities without sensitive data
export { currentEnvironment } from "./env";