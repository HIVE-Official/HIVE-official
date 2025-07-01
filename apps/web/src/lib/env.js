import { z } from "zod";
/**
 * Environment Configuration Schema
 * Validates all required environment variables with proper types
 */
const envSchema = z.object({
    // Node environment
    NODE_ENV: z
        .enum(["development", "staging", "production"])
        .default("development"),
    // Firebase Client Config (Public - prefixed with NEXT_PUBLIC_)
    NEXT_PUBLIC_FIREBASE_API_KEY: z
        .string()
        .min(1, "Firebase API key is required"),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z
        .string()
        .min(1, "Firebase auth domain is required"),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: z
        .string()
        .min(1, "Firebase project ID is required"),
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z
        .string()
        .min(1, "Firebase storage bucket is required"),
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z
        .string()
        .min(1, "Firebase messaging sender ID is required"),
    NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase app ID is required"),
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
    // Firebase Admin SDK (Private - Server-side only)
    FIREBASE_PROJECT_ID: z
        .string()
        .min(1, "Firebase project ID is required for admin"),
    FIREBASE_CLIENT_EMAIL: z
        .string()
        .email("Valid Firebase client email is required")
        .optional(),
    FIREBASE_PRIVATE_KEY: z
        .string()
        .min(1, "Firebase private key is required")
        .optional(),
    // Application Config
    NEXTAUTH_SECRET: z
        .string()
        .min(32, "NextAuth secret must be at least 32 characters")
        .optional(),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});
/**
 * Get the current environment
 */
function getCurrentEnvironment() {
    const env = process.env.NODE_ENV || "development";
    const vercelEnv = process.env.VERCEL_ENV;
    // Vercel environment mapping
    if (vercelEnv === "production")
        return "production";
    if (vercelEnv === "preview")
        return "staging";
    // Local development or other environments
    if (env === "production")
        return "production";
    if (env === "staging")
        return "staging";
    return "development";
}
/**
 * Check if we're in a development environment without Firebase config
 */
function isDevelopmentWithoutFirebase() {
    return getCurrentEnvironment() === "development" && 
           (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
            process.env.NEXT_PUBLIC_FIREBASE_API_KEY === "demo-api-key");
}
/**
 * Parse and validate environment variables
 * Provides helpful error messages for missing configuration
 */
function parseEnv() {
    const currentEnv = getCurrentEnvironment();
    const isDevWithoutFirebase = isDevelopmentWithoutFirebase();
    
    // In development without Firebase config, use demo values
    const envVars = {
        NODE_ENV: process.env.NODE_ENV || "development",
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 
            (isDevWithoutFirebase ? "demo-api-key" : ""),
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 
            (isDevWithoutFirebase ? "demo-project.firebaseapp.com" : ""),
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 
            (isDevWithoutFirebase ? "demo-project" : ""),
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 
            (isDevWithoutFirebase ? "demo-project.appspot.com" : ""),
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || 
            (isDevWithoutFirebase ? "123456789" : ""),
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 
            (isDevWithoutFirebase ? "1:123456789:web:abcdef123456" : ""),
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    };

    try {
        return envSchema.parse(envVars);
    } catch (error) {
        console.error("❌ Environment validation failed:", error);
        
        // Provide helpful error messages based on environment
        if (currentEnv === "production" || currentEnv === "staging") {
            throw new Error(
                `🚨 PRODUCTION/STAGING ERROR: Missing required environment variables!\n` +
                `Please configure all Firebase environment variables in Vercel Dashboard.\n` +
                `See ENV_TEMPLATE.md for the complete list of required variables.\n` +
                `Environment: ${currentEnv}`
            );
        } else if (!isDevWithoutFirebase) {
            throw new Error(
                `🔧 DEVELOPMENT ERROR: Invalid environment configuration!\n` +
                `Please check your .env.local file or see ENV_TEMPLATE.md for setup instructions.\n` +
                `Environment: ${currentEnv}`
            );
        }
        
        throw new Error(`Environment configuration is invalid. Please check your environment variables.`);
    }
}

/**
 * Get Firebase client configuration for the current environment
 * This function is kept for backward compatibility but now relies on env vars
 */
export function getFirebaseConfig() {
    const isDevWithoutFirebase = isDevelopmentWithoutFirebase();
    
    if (isDevWithoutFirebase) {
        console.log("🔥 Development mode: Using demo Firebase configuration");
        return {
            apiKey: "demo-api-key",
            authDomain: "demo-project.firebaseapp.com",
            projectId: "demo-project",
            storageBucket: "demo-project.appspot.com",
            messagingSenderId: "123456789",
            appId: "1:123456789:web:abcdef123456",
            measurementId: "G-DEMO"
        };
    }
    
    // Use environment variables for all other cases
    return {
        apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    };
}

// Parse environment on module load
export const env = parseEnv();
// Export current environment info
export const isProduction = env.NODE_ENV === "production";
export const isDevelopment = env.NODE_ENV === "development";
export const isStaging = env.NODE_ENV === "staging";
export const currentEnvironment = getCurrentEnvironment();
// Export whether Firebase Admin is properly configured
export const isFirebaseAdminConfigured = !!(env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY);
// Export whether this is development mode without Firebase
export const isDevWithoutFirebase = isDevelopmentWithoutFirebase();
// Enhanced logging
if (isDevWithoutFirebase) {
    console.log(`🔥 Development Mode: Demo Firebase configuration active`);
} else {
    console.log(`🚀 Environment: ${currentEnvironment} | Firebase Admin: ${isFirebaseAdminConfigured ? "✅" : "❌"}`);
    
    if (!isFirebaseAdminConfigured && (isProduction || isStaging)) {
        console.warn(`⚠️  WARNING: Firebase Admin not configured in ${currentEnvironment} environment!`);
    }
}
//# sourceMappingURL=env.js.map