// Server-side exports only
import { env, getFirebaseAdminConfig, isDevelopment, isProduction, isBuildTime, environmentInfo } from './env';
import { dbAdmin, firebaseAuth, isFirebaseConfigured } from './firebase-admin';

// Re-export server-side utilities
export {
  // Environment utilities
  env,
  isDevelopment,
  isProduction,
  isBuildTime,
  getFirebaseAdminConfig,
  environmentInfo,
  
  // Firebase Admin exports
  dbAdmin,
  firebaseAuth as authAdmin, // Re-export as authAdmin for backward compatibility
  isFirebaseConfigured,
};

// Re-export all Firebase Admin types and utilities
export * from './firebase-admin';

 