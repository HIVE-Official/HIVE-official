"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth");
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
exports.auth = auth;
if (!isDevWithoutFirebase) {
    // Initialize Firebase only if it hasn't been initialized already
    app = (0, app_1.getApps)().length === 0 ? (0, app_1.initializeApp)(firebaseConfig) : (0, app_1.getApps)()[0];
    exports.auth = auth = (0, auth_1.getAuth)(app);
}
else {
    // In development without Firebase config, create mock objects
    console.warn("🔥 Firebase not configured - using mock auth for development");
    exports.auth = auth = {
        currentUser: null,
        onAuthStateChanged: () => () => { },
        signOut: () => Promise.resolve(),
    };
}
exports.default = app;
//# sourceMappingURL=firebase-config.js.map