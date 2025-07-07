import { z } from "zod";
import type { ServiceAccount } from 'firebase-admin/app';

/**
 * Environment configuration schema - Build-friendly with runtime validation
 */
const baseSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Firebase Client Configuration (Public) - Required for client-side
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1).optional(),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_DEBUG: z.string().optional(),

  // Firebase Admin Configuration (Server-side only)
  FIREBASE_PROJECT_ID: z.string().optional(),
  FIREBASE_CLIENT_EMAIL: z.string().optional(),
  FIREBASE_PRIVATE_KEY: z.string().optional(),
  
  // Build environment detection
  VERCEL: z.string().optional(),
  VERCEL_ENV: z.string().optional(),
  NEXT_PHASE: z.string().optional(),
});

// Build-time schema is more lenient
const buildTimeSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
}).passthrough(); // Allow all fields during build

// Parse environment with graceful fallbacks for build time
let parsedEnv: z.infer<typeof baseSchema>;

export const isBuildTime = 
  process.env.NEXT_PHASE === "phase-production-build" || 
  process.env.VERCEL_ENV === "production" ||
  (process.env.VERCEL === "1" && process.env.NODE_ENV === "production");
const isServerSide = typeof window === 'undefined';

try {
  parsedEnv = baseSchema.parse(process.env);
} catch (error) {
  if (isBuildTime) {
    parsedEnv = buildTimeSchema.parse(process.env);
  } else {
    throw error;
  }
}

// Export validated environment
export const env = parsedEnv;

// Export environment flags
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";

/**
 * Get Firebase configuration for the current environment
 */
export function getFirebaseConfig() {
  // Check if we have the required Firebase config vars
  const requiredVars = [
    env.NEXT_PUBLIC_FIREBASE_API_KEY,
    env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  return config;
}

/**
 * Get Firebase Admin configuration for server-side operations
 */
export function getFirebaseAdminConfig(): ServiceAccount | null {
  // During build time, return null to avoid Firebase Admin initialization
  if (isBuildTime) {
    return null;
  }

  if (
    !env.FIREBASE_PROJECT_ID ||
    !env.FIREBASE_CLIENT_EMAIL ||
    !env.FIREBASE_PRIVATE_KEY
  ) {
    if (isProduction && !isBuildTime && isServerSide) {
      console.error("❌ Firebase Admin credentials are missing in production runtime");
      return null;
    }
    console.warn("⚠️ Firebase Admin credentials not found, server-side operations will be disabled");
    return null;
  }

  return {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  } as ServiceAccount;
}

/**
 * Check if debug mode is enabled
 */
export const isDebugMode = env.NEXT_PUBLIC_DEBUG === "true" || isDevelopment;

// Export environment info for debugging
export const environmentInfo = {
  environment: env.NODE_ENV,
  isProduction,
  isDevelopment,
  isBuildTime,
  isServerSide,
  hasFirebaseConfig: getFirebaseConfig() !== null,
  hasFirebaseAdminConfig: getFirebaseAdminConfig() !== null,
};
