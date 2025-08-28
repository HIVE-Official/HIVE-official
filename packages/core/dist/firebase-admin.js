"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentInfo = exports.getAuthAdmin = exports.getFirestoreAdmin = exports.isFirebaseConfigured = exports.firebaseAuth = exports.adminFirestore = exports.auth = exports.db = exports.authAdmin = exports.dbAdmin = void 0;
const admin = __importStar(require("firebase-admin"));
// Environment detection
function getCurrentEnvironment() {
    const env = process.env.NODE_ENV || "development";
    const vercelEnv = process.env.VERCEL_ENV;
    if (vercelEnv === "production")
        return "production";
    if (vercelEnv === "preview")
        return "staging";
    if (env === "production")
        return "production";
    if (env === "staging")
        return "staging";
    return "development";
}
const currentEnvironment = getCurrentEnvironment();
let firebaseInitialized = false;
let dbAdmin;
let authAdmin;
try {
    if (!admin.apps.length) {
        let credential;
        // Try different credential formats
        if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
            // Format 1: Individual environment variables (Vercel recommended)
            credential = admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID || "hive-dev-2025",
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            });
            console.log(`🔐 Firebase Admin: Using individual env vars for ${currentEnvironment}`);
        }
        else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
            // Format 2: Base64 encoded service account (existing pattern)
            try {
                const serviceAccountJson = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString("ascii"));
                credential = admin.credential.cert(serviceAccountJson);
                console.log(`🔐 Firebase Admin: Using base64 service account for ${currentEnvironment}`);
            }
            catch (error) {
                console.warn("Failed to parse base64 service account:", error);
            }
        }
        else {
            // Format 3: Application default credentials (development fallback)
            try {
                credential = admin.credential.applicationDefault();
                console.log(`🔑 Firebase Admin: Using application default credentials for ${currentEnvironment}`);
            }
            catch (credError) {
                console.warn(`⚠️ No Firebase Admin credentials available for ${currentEnvironment}`);
                throw credError;
            }
        }
        if (credential) {
            admin.initializeApp({
                credential: credential,
                projectId: process.env.FIREBASE_PROJECT_ID || "hive-dev-2025",
            });
            exports.dbAdmin = dbAdmin = admin.firestore();
            exports.authAdmin = authAdmin = admin.auth();
            firebaseInitialized = true;
            console.log(`✅ Firebase Admin initialized successfully for ${currentEnvironment}`);
        }
        else {
            throw new Error("No valid Firebase credentials found");
        }
    }
    else {
        // App already initialized
        exports.dbAdmin = dbAdmin = admin.firestore();
        exports.authAdmin = authAdmin = admin.auth();
        firebaseInitialized = true;
        console.log(`🔄 Firebase Admin: Using existing app for ${currentEnvironment}`);
    }
}
catch (error) {
    console.warn(`⚠️ Firebase Admin initialization failed for ${currentEnvironment}:`, error);
    // Create mock instances for development
    exports.dbAdmin = dbAdmin = {
        collection: (path) => ({
            get: async () => {
                console.log(`🔄 Mock Firebase call: collection(${path}).get() - returning development data`);
                throw new Error(`Firebase Admin not configured for ${currentEnvironment}. Add credentials to environment variables.`);
            },
            add: async () => {
                console.log(`🔄 Mock Firebase call: collection(${path}).add() - development mode`);
                throw new Error(`Firebase Admin not configured for ${currentEnvironment}.`);
            },
            doc: (id) => ({
                get: async () => {
                    console.log(`🔄 Mock Firebase call: collection(${path}).doc(${id}).get() - development mode`);
                    throw new Error(`Firebase Admin not configured for ${currentEnvironment}.`);
                },
                set: async () => {
                    console.log(`🔄 Mock Firebase call: collection(${path}).doc(${id}).set() - development mode`);
                    throw new Error(`Firebase Admin not configured for ${currentEnvironment}.`);
                },
            }),
        }),
    };
    exports.authAdmin = authAdmin = {
        verifyIdToken: async () => {
            console.log(`🔄 Mock Firebase call: verifyIdToken() - development mode`);
            throw new Error(`Firebase Auth not configured for ${currentEnvironment}.`);
        },
        createCustomToken: async (uid) => {
            console.log(`🔄 Mock Firebase call: createCustomToken(${uid}) - development mode`);
            throw new Error(`Firebase Auth not configured for ${currentEnvironment}.`);
        },
    };
}
// Re-export for compatibility
exports.db = dbAdmin;
exports.auth = authAdmin;
exports.adminFirestore = dbAdmin;
exports.firebaseAuth = authAdmin;
exports.isFirebaseConfigured = firebaseInitialized;
// Function exports for compatibility
const getFirestoreAdmin = () => dbAdmin;
exports.getFirestoreAdmin = getFirestoreAdmin;
const getAuthAdmin = () => authAdmin;
exports.getAuthAdmin = getAuthAdmin;
// Environment info for debugging
exports.environmentInfo = {
    environment: currentEnvironment,
    firebaseConfigured: firebaseInitialized,
    projectId: process.env.FIREBASE_PROJECT_ID || "hive-dev-2025",
    credentialSource: firebaseInitialized
        ? process.env.FIREBASE_PRIVATE_KEY
            ? "individual_vars"
            : process.env.FIREBASE_SERVICE_ACCOUNT_KEY
                ? "base64_key"
                : "application_default"
        : "none",
};
//# sourceMappingURL=firebase-admin.js.map