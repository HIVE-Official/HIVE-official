import { env, getFirebaseAdminConfig, isDevelopment, isProduction, isBuildTime, environmentInfo } from './env';
import { dbAdmin, firebaseAuth, isFirebaseConfigured } from './firebase-admin';
export { env, isDevelopment, isProduction, isBuildTime, getFirebaseAdminConfig, environmentInfo, dbAdmin, firebaseAuth as authAdmin, // Re-export as authAdmin for backward compatibility
isFirebaseConfigured, };
export * from './firebase-admin';
//# sourceMappingURL=server-index.d.ts.map