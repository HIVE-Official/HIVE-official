import { z } from "zod";

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
});

// Parse environment with graceful fallbacks for build time
let parsedEnv: z.infer<typeof baseSchema>;

const isProductionEnv = process.env.NODE_ENV === "production";
const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";
const isServerSide = process.env.NEXT_RUNTIME === "nodejs";

try {
  // During build time, we want to be more lenient with validation
  const schema = isBuildTime ? baseSchema : baseSchema;
  parsedEnv = schema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    // Only throw during runtime in production for server-side code
    if (isProductionEnv && !isBuildTime && isServerSide) {
      console.error("❌ Production runtime validation failed:", error.errors);
      throw new Error("Missing required environment variables in production runtime");
    } else {
      const context = isBuildTime ? "build time" : "development";
      console.warn(`⚠️ Environment warnings during ${context}:`, 
        error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
      // Provide fallback values for development and build time
      parsedEnv = {
        NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") || "development",
        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
        NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG || "",
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
        FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL || "",
        FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY || "",
      };
      console.log(`🔧 Using fallback environment configuration for ${context}`);
    }
  } else {
    throw error;
  }
}

export const env = parsedEnv;

/**
 * Check if we're in development mode
 */
export const isDevelopment = env.NODE_ENV === "development";

/**
 * Check if we're in production mode
 */
export const isProduction = env.NODE_ENV === "production";

/**
 * Get Firebase configuration for the current environment
 */
export function getFirebaseConfig() {
  // During build time, return null to allow the build to proceed
  if (isBuildTime) {
    return null;
  }

  if (!env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    if (isProduction && !isBuildTime) {
      console.error("❌ Firebase client configuration is missing in production runtime");
      return null;
    }
    console.warn("⚠️ Firebase client configuration not found, running in development mode");
    return null;
  }

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
 * Get Firebase Admin configuration for server-side operations
 */
export function getFirebaseAdminConfig() {
  // During build time, return null to allow the build to proceed
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
    type: "service_account",
    project_id: env.FIREBASE_PROJECT_ID,
    client_email: env.FIREBASE_CLIENT_EMAIL,
    private_key: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  };
}

/**
 * Check if debug mode is enabled
 */
export const isDebugMode = env.NEXT_PUBLIC_DEBUG === "true" || isDevelopment;
