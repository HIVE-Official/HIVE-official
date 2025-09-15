// Temporary stub for firebase client utilities
import { getFirebaseConfig } from "../env";

// Get the Firebase configuration for the current environment
let firebaseConfig;
try {
  firebaseConfig = getFirebaseConfig();
  // Validate Firebase config
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error(`Firebase configuration is incomplete: missing ${!firebaseConfig.apiKey ? 'apiKey' : 'projectId'}`);
  }
} catch (error) {
  logger.error('❌ Firebase configuration error:', error);
  logger.error('❌ Available env vars:', {
    NEXT_PUBLIC_FIREBASE_API_KEY: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  });
  
  // In development, try direct environment variable access as fallback
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Attempting direct environment variable access...');
    firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
    
    // Validate direct access
    if (firebaseConfig.apiKey && firebaseConfig.projectId) {
      // Direct environment variable access succeeded
    } else {
      if (process.env.NODE_ENV === 'development') {
        logger.error('Direct environment access failed, using demo config');
      }
      firebaseConfig = {
        apiKey: 'demo-api-key',
        authDomain: 'demo.firebaseapp.com',
        projectId: 'demo-project',
        storageBucket: 'demo-project.appspot.com',
        messagingSenderId: '123456789',
        appId: '1:123456789:web:demo-app-id'
      };
    }
  } else {
    throw error; // In production, fail hard
  }
}

// Initialize Firebase app (only once)
let app;
try {
  // Check if config is valid before initializing
  if (!firebaseConfig || !firebaseConfig.apiKey || !firebaseConfig.projectId) {
    logger.error('❌ Invalid Firebase configuration:', {
      hasConfig: !!firebaseConfig,
      hasApiKey: !!firebaseConfig?.apiKey,
      hasProjectId: !!firebaseConfig?.projectId,
      config: firebaseConfig
    });
    throw new Error('Firebase configuration is invalid or missing');
  }
  
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
} catch (error) {
  logger.error('❌ Failed to initialize Firebase:', error);
  throw new Error('Firebase initialization failed');
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser and if supported)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported: any) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Connect to emulators in development (if not already connected)
// DISABLED: Using production Firebase for development
// if (isDevelopment && typeof window !== "undefined") {
//   try {
//     // Only connect to emulators if not already connected
//     if (!auth.config.emulator) {
//       connectAuthEmulator(auth, "http://localhost:9099", {
//         disableWarnings: true,
//       });
//     }
//     if (!db._delegate._databaseId.projectId.includes("localhost")) {
//       connectFirestoreEmulator(db, "localhost", 8080);
//     }
//   } catch (error) {
//     // Emulators might not be running, that's ok
//     
//   }
// }

export { app };
export default app;
