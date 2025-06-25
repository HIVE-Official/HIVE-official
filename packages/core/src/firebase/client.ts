import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirebaseConfig, isDevelopment } from "../env";

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
  void isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Connect to emulators in development (if not already connected)
if (isDevelopment && typeof window !== "undefined") {
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
