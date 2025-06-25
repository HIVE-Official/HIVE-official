import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { logger } from "@hive/core";
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
        "demo-project.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
        "demo-project.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
};
// Check if we're in a development environment without proper Firebase config
const isDevWithoutFirebase = process.env.NODE_ENV === "development" &&
    !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
let app = null;
let auth = null;
if (!isDevWithoutFirebase) {
    // Initialize Firebase only if it hasn't been initialized already
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
}
else {
    // In development without Firebase config, create mock auth object with proper type assertion
    logger.warn("🔥 Firebase not configured - using mock auth for development");
    auth = {
        currentUser: null,
        onAuthStateChanged: () => () => { },
        signOut: () => Promise.resolve(),
    };
}
export { auth };
export default app;
//# sourceMappingURL=firebase-config.js.map