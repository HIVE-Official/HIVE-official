// Temporary stub for firebase client utilities
// TODO: Use proper firebase client from @hive/core

import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirebaseConfig, isDevelopment } from "./env";

// Get the Firebase configuration for the current environment
const firebaseConfig = getFirebaseConfig();

// Initialize Firebase app (only once)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser and if supported)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Connect to emulators in development (if not already connected)
if (isDevelopment && typeof window !== "undefined") {
  try {
    // Only connect to emulators if not already connected
    // Check if emulators are already connected by checking for localhost in config
    const authConfig = (auth as any).config;
    const dbConfig = (db as any)._delegate?._databaseId;

    if (!authConfig?.emulator) {
      connectAuthEmulator(auth, "http://localhost:9099", {
        disableWarnings: true,
      });
    }
    if (dbConfig && !dbConfig.projectId.includes("localhost")) {
      connectFirestoreEmulator(db, "localhost", 8080);
    }
  } catch (error) {
    // Emulators might not be running, that's ok
    console.log("Firebase emulators not available:", error);
  }
}

export { app };
export default app;
