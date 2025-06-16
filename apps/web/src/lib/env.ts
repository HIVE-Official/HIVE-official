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
});

/**
 * Firebase Configuration Objects for each environment
 */
const firebaseConfigs = {
  development: {
    apiKey: "AIzaSyD0aMEsznCtijDJBV8KcHS0KXrmS3DIXZc",
    authDomain: "hive-dev-2025.firebaseapp.com",
    projectId: "hive-dev-2025",
    storageBucket: "hive-dev-2025.firebasestorage.app",
    messagingSenderId: "43961711178",
    appId: "1:43961711178:web:d5cca76e45fc125bb484b3",
    measurementId: "G-9PJ6SQ8WVS",
  },
  staging: {
    apiKey: "AIzaSyDj7dO4DHmGMFGMZouGQVjRDPbDF026NG4",
    authDomain: "hive-staging-2025.firebaseapp.com",
    projectId: "hive-staging-2025",
    storageBucket: "hive-staging-2025.firebasestorage.app",
    messagingSenderId: "32403978665",
    appId: "1:32403978665:web:5779609cc83680e0486cb8",
    measurementId: "G-TD0JEBTKHP",
  },
  production: {
    apiKey: "AIzaSyDMDHXJ8LcWGXz05ipPTNvA-fRi9nfdzbQ",
    authDomain: "hive-9265c.firebaseapp.com",
    projectId: "hive-9265c",
    storageBucket: "hive-9265c.appspot.com",
    messagingSenderId: "573191826528",
    appId: "1:573191826528:web:1d5eaeb8531276e4c1a705",
    measurementId: "G-NK3E12MSFD",
    databaseURL: "https://hive-9265c-default-rtdb.firebaseio.com",
  },
} as const;

/**
 * Get the current environment
 */
function getCurrentEnvironment(): keyof typeof firebaseConfigs {
  const env = process.env.NODE_ENV || "development";
  const vercelEnv = process.env.VERCEL_ENV;

  // Vercel environment mapping
  if (vercelEnv === "production") return "production";
  if (vercelEnv === "preview") return "staging";

  // Local development or other environments
  if (env === "production") return "production";
  if (env === "staging") return "staging";

  return "development";
}

/**
 * Get Firebase client configuration for the current environment
 */
export function getFirebaseConfig() {
  const environment = getCurrentEnvironment();
  return firebaseConfigs[environment];
}

/**
 * Parse and validate environment variables
 * Falls back to hardcoded config if env vars not available
 */
function parseEnv() {
  const currentEnv = getCurrentEnvironment();
  const firebaseConfig = firebaseConfigs[currentEnv];

  // Try to parse from environment variables first
  const envVars = {
    NODE_ENV: process.env.NODE_ENV || "development",
    NEXT_PUBLIC_FIREBASE_API_KEY:
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseConfig.apiKey,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      firebaseConfig.storageBucket,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ||
      firebaseConfig.messagingSenderId,
    NEXT_PUBLIC_FIREBASE_APP_ID:
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID || firebaseConfig.appId,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ||
      firebaseConfig.measurementId,
    FIREBASE_PROJECT_ID:
      process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  };

  try {
    return envSchema.parse(envVars);
  } catch (error) {
    console.error("❌ Environment validation failed:", error);
    throw new Error(
      `Environment configuration is invalid. Please check your environment variables.`
    );
  }
}

// Parse environment on module load
export const env = parseEnv();

// Export current environment info
export const isProduction = env.NODE_ENV === "production";
export const isDevelopment = env.NODE_ENV === "development";
export const isStaging = env.NODE_ENV === "staging";
export const currentEnvironment = getCurrentEnvironment();

// Export whether Firebase Admin is properly configured
export const isFirebaseAdminConfigured = !!(
  env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY
);

console.log(
  `🚀 Environment: ${currentEnvironment} | Firebase Admin: ${isFirebaseAdminConfigured ? "✅" : "❌"}`
);
