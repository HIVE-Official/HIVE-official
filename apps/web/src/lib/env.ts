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
 * Get the current environment
 */
function getCurrentEnvironment(): "development" | "staging" | "production" {
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
  return {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

/**
 * Parse and validate environment variables
 */
function parseEnv() {
  const envVars = {
    NODE_ENV: process.env.NODE_ENV || "development",
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
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
