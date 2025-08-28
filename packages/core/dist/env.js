"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentInfo = exports.isDebugMode = exports.isTest = exports.isProduction = exports.isDevelopment = exports.env = exports.isBuildTime = void 0;
exports.getFirebaseConfig = getFirebaseConfig;
exports.getFirebaseAdminConfig = getFirebaseAdminConfig;
const zod_1 = require("zod");
/**
 * Environment configuration schema - Build-friendly with runtime validation
 */
const baseSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    // Firebase Client Configuration (Public) - Required for client-side
    NEXT_PUBLIC_FIREBASE_API_KEY: zod_1.z.string().min(1).optional(),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: zod_1.z.string().min(1).optional(),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: zod_1.z.string().min(1).optional(),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: zod_1.z.string().min(1).optional(),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: zod_1.z.string().min(1).optional(),
    NEXT_PUBLIC_FIREBASE_APP_ID: zod_1.z.string().min(1).optional(),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: zod_1.z.string().optional(),
    NEXT_PUBLIC_DEBUG: zod_1.z.string().optional(),
    // Firebase Admin Configuration (Server-side only)
    FIREBASE_PROJECT_ID: zod_1.z.string().optional(),
    FIREBASE_CLIENT_EMAIL: zod_1.z.string().optional(),
    FIREBASE_PRIVATE_KEY: zod_1.z.string().optional(),
    // Build environment detection
    VERCEL: zod_1.z.string().optional(),
    VERCEL_ENV: zod_1.z.string().optional(),
    NEXT_PHASE: zod_1.z.string().optional(),
});
// Build-time schema is more lenient
const buildTimeSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
}).passthrough(); // Allow all fields during build
// Parse environment with graceful fallbacks for build time
let parsedEnv;
exports.isBuildTime = process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.VERCEL_ENV === "production" ||
    (process.env.VERCEL === "1" && process.env.NODE_ENV === "production");
const isServerSide = typeof window === 'undefined';
try {
    parsedEnv = baseSchema.parse(process.env);
}
catch (error) {
    if (exports.isBuildTime) {
        parsedEnv = buildTimeSchema.parse(process.env);
    }
    else {
        throw error;
    }
}
// Export validated environment
exports.env = parsedEnv;
// Export environment flags
exports.isDevelopment = exports.env.NODE_ENV === "development";
exports.isProduction = exports.env.NODE_ENV === "production";
exports.isTest = exports.env.NODE_ENV === "test";
/**
 * Get Firebase configuration for the current environment
 */
function getFirebaseConfig() {
    // Check if we have the required Firebase config vars
    const requiredVars = [
        exports.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        exports.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        exports.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        exports.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        exports.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        exports.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    ];
    const missingVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID'
    ].filter((name, index) => !requiredVars[index]);
    if (missingVars.length > 0) {
        const message = `⚠️ Firebase configuration: Missing environment variables: ${missingVars.join(', ')}. ` +
            'Firebase features will be disabled.';
        console.warn(message);
        return null;
    }
    const config = {
        apiKey: exports.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: exports.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: exports.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: exports.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: exports.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: exports.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: exports.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };
    return config;
}
/**
 * Get Firebase Admin configuration for server-side operations
 */
function getFirebaseAdminConfig() {
    // During build time, return null to avoid Firebase Admin initialization
    if (exports.isBuildTime) {
        return null;
    }
    if (!exports.env.FIREBASE_PROJECT_ID ||
        !exports.env.FIREBASE_CLIENT_EMAIL ||
        !exports.env.FIREBASE_PRIVATE_KEY) {
        if (exports.isProduction && !exports.isBuildTime && isServerSide) {
            console.error("❌ Firebase Admin credentials are missing in production runtime");
            return null;
        }
        console.warn("⚠️ Firebase Admin credentials not found, server-side operations will be disabled");
        return null;
    }
    return {
        projectId: exports.env.FIREBASE_PROJECT_ID,
        clientEmail: exports.env.FIREBASE_CLIENT_EMAIL,
        privateKey: exports.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
}
/**
 * Check if debug mode is enabled
 */
exports.isDebugMode = exports.env.NEXT_PUBLIC_DEBUG === "true" || exports.isDevelopment;
// Export environment info for debugging
exports.environmentInfo = {
    environment: exports.env.NODE_ENV,
    isProduction: exports.isProduction,
    isDevelopment: exports.isDevelopment,
    isBuildTime: exports.isBuildTime,
    isServerSide,
    hasFirebaseConfig: getFirebaseConfig() !== null,
    hasFirebaseAdminConfig: getFirebaseAdminConfig() !== null,
};
//# sourceMappingURL=env.js.map