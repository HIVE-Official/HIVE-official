import { z } from "zod";
import { logger } from '@hive/core/utils/logger';


/**
 * Environment Configuration Schema
 * Validates all required environment variables with proper types
 */
const envSchema = z.object({
  // Node environment
  NODE_ENV: z
    .enum(["development", "staging", "production", "test"])
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

  // Redis Config (for rate limiting and caching)
  REDIS_URL: z.string().url().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_USERNAME: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),

  // Email Service Config
  SENDGRID_API_KEY: z.string().optional(),
  FROM_EMAIL: z.string().email().optional(),

  // Error Monitoring Config
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});


/**
 * Get the current environment
 */
function getCurrentEnvironment(): "development" | "staging" | "production" | "test" {
  const env = process.env.NODE_ENV || "development";
  const vercelEnv = process.env.VERCEL_ENV;

  // Vercel environment mapping
  if (vercelEnv === "production") return "production";
  if (vercelEnv === "preview") return "staging";

  // Check if we're in local development (not deployed)
  // This allows development features to work even when NODE_ENV=production for builds
  const isLocalDev = !process.env.VERCEL && !process.env.RAILWAY_ENVIRONMENT && 
                     !process.env.HEROKU_APP_NAME && !process.env.AWS_LAMBDA_FUNCTION_NAME;

  // Additional check for Next.js development mode
  const isNextDev = process.env.NODE_ENV === "development" || process.env.__NEXT_PROCESSED_ENV;

  if (isLocalDev || isNextDev) return "development";

  // Deployed environments
  if (env === "production") return "production";
  if (env === "test") return "test";
  
  // Fallback for staging or unknown environments
  if (vercelEnv === "preview") return "staging";

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
  const currentEnv = getCurrentEnvironment();
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
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    FROM_EMAIL: process.env.FROM_EMAIL,
    SENTRY_DSN: process.env.SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  };

  try {
    const result = envSchema.parse(envVars);
    
    // Production-specific validation
    if (currentEnv === 'production') {
      validateProductionConfig(result);
    }
    
    return result;
  } catch (error) {
    logger.error('❌ Environment validation failed:', error);
    
    if (currentEnv === 'production') {
      throw new Error(
        `PRODUCTION CRITICAL: Environment configuration is invalid. Application cannot start. Please check your environment variables.`
      );
    }
    
    console.warn("⚠️ Environment validation failed in development mode, using fallback values");
    // In development, continue with fallback values instead of throwing
    return {
      NODE_ENV: (process.env.NODE_ENV as any) || "development",
      NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
      NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
      FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      REDIS_URL: process.env.REDIS_URL,
      REDIS_PASSWORD: process.env.REDIS_PASSWORD,
      REDIS_USERNAME: process.env.REDIS_USERNAME,
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
      FROM_EMAIL: process.env.FROM_EMAIL,
      SENTRY_DSN: process.env.SENTRY_DSN,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    } as any;
  }
}

/**
 * Validate production-specific requirements
 */
function validateProductionConfig(config: any) {
  const requiredInProduction = [
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'NEXTAUTH_SECRET',
  ];
  
  const missing = requiredInProduction.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `PRODUCTION CRITICAL: Missing required environment variables: ${missing.join(', ')}. ` +
      'These are required for production deployment.'
    );
  }
  
  // Validate Firebase Admin credentials format
  if (config.FIREBASE_PRIVATE_KEY) {
    // Check if it's base64 encoded
    let isValidKey = false;
    const privateKey = config.FIREBASE_PRIVATE_KEY;
    
    // Check if it contains BEGIN PRIVATE KEY (might be escaped)
    if (privateKey.includes('BEGIN') && privateKey.includes('PRIVATE') && privateKey.includes('KEY')) {
      isValidKey = true;
    } else {
      // Try to decode if base64
      try {
        const decoded = Buffer.from(privateKey, 'base64').toString('utf-8');
        if (decoded.includes('BEGIN PRIVATE KEY')) {
          isValidKey = true;
        }
      } catch (e) {
        // Not base64
      }
    }
    
    if (!isValidKey) {
      console.warn(
        'WARNING: FIREBASE_PRIVATE_KEY may be invalid. It should be a properly formatted private key.'
      );
      // Don't throw in production - let Firebase Admin handle the error
    }
  }
  
  // Production environment validation passed
}

// Parse environment on module load with fallbacks
let env: ReturnType<typeof parseEnv>;
try {
  env = parseEnv();
} catch (error) {
  logger.error('❌ Environment parsing failed, using fallbacks:', error);
  // Provide safe fallbacks for build time
  env = {
    NODE_ENV: (process.env.NODE_ENV as any) || "development",
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_USERNAME: process.env.REDIS_USERNAME,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  } as any;
}

export { env };

// Export current environment info with PRODUCTION SAFETY
export const isProduction = env.NODE_ENV === "production" || process.env.VERCEL_ENV === "production";
export const isStaging = env.NODE_ENV === "staging" || process.env.VERCEL_ENV === "preview";
export const isTest = env.NODE_ENV === "test";

// CRITICAL: Bulletproof development detection
// This MUST be false in production to prevent security issues
export const isDevelopment = (() => {
  // Multiple checks to ensure we're REALLY in development
  const checks = {
    nodeEnv: env.NODE_ENV === "development",
    notVercel: !process.env.VERCEL,
    notVercelProd: process.env.VERCEL_ENV !== "production",
    localhost: typeof window !== "undefined" && window.location?.hostname === "localhost",
    port3000: typeof window !== "undefined" && window.location?.port === "3000",
    noProductionUrl: typeof window !== "undefined" && !window.location?.hostname?.includes("hive")
  };
  
  // Only true if we're definitely in local development
  return checks.nodeEnv && checks.notVercel && !isProduction;
})();

export const currentEnvironment = getCurrentEnvironment();

// PRODUCTION SAFETY: Authentication bypasses completely removed for security
export const skipAuthInDev = false; // Never skip authentication
export const skipOnboardingInDev = false; // Never skip onboarding
export const devBypassEmail = null; // Removed hardcoded email for security

// Export whether Firebase Admin is properly configured
export const isFirebaseAdminConfigured = !!(
  env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY
);

// Environment initialization complete
