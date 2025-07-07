import { initializeApp, getApps, type FirebaseOptions } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirebaseConfig, isDevelopment } from "./env";

// Get the Firebase configuration for the current environment
const firebaseConfig = getFirebaseConfig();

// Fallback config for when Firebase is disabled
const fallbackConfig = {
  apiKey: "demo-api-key",
  appId: "demo-app",
  projectId: "demo-project",
  authDomain: "demo.firebaseapp.com",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "123456789",
};

// Only initialize Firebase if we have a valid config
let app: ReturnType<typeof initializeApp> | null = null;

if (firebaseConfig) {
  // Initialize Firebase app (only once)
  app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];
} else {
  // Use fallback config in development or when Firebase is disabled
  app = getApps().length === 0
    ? initializeApp(fallbackConfig as FirebaseOptions)
    : getApps()[0];
}

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser and if supported)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  void isSupported().then((supported) => {
    if (supported && firebaseConfig && firebaseConfig.apiKey !== "demo-api-key") {
      try {
        analytics = getAnalytics(app);
      } catch (error) {
        console.warn("Analytics initialization failed:", error);
        // Don't throw - this is not critical for app functionality
      }
    }
  });
}

// Connect to emulators in development (disabled for now)
// TODO: Enable emulators when needed for local development
// eslint-disable-next-line no-constant-condition, no-constant-binary-expression
if (false && isDevelopment && typeof window !== "undefined") {
  try {
    // Only connect to emulators if not already connected
    // Check auth emulator connection status safely
    const authConfig = auth.config as { emulator?: unknown };
    if (!authConfig.emulator) {
      connectAuthEmulator(auth, "http://localhost:9099", {
        disableWarnings: true,
      });
    }

    // Check firestore emulator connection status safely
    const dbInternal = db as unknown as {
      _delegate?: { _databaseId?: { projectId?: string } };
    };
    if (!dbInternal._delegate?._databaseId?.projectId?.includes("localhost")) {
      connectFirestoreEmulator(db, "localhost", 8080);
    }
  } catch {
    // Emulators might not be running, that's ok
  }
}

export { app };
export default app;
