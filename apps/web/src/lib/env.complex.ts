import {z  } from "zod";
import { logger } from '@hive/core/utils/logger';


/**
 * Environment Configuration Schema
 * Validates all required environment variables with proper types
 * NO HARDCODED SECRETS ALL VALUES FROM ENV VARS ONLY
 */
const envSchema = z.object({ // Node environment
  NODEENV: z.enum(["development", "staging", "production", "test"]).default("development"),

  // Firebase Client Config (Public prefixed with NEXT_PUBLIC_)
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, "Firebase API key is required"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase auth domain is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase project ID is required"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase storage bucket is required"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1, "Firebase messaging sender ID is required"),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase app ID is required"),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),

  // Firebase Admin SDK (Private Server-side only)
  FIREBASE_PROJECT_ID: z.string().min(1, "Firebase project ID is required for admin"),
  FIREBASE_CLIENT_EMAIL: z.string().email("Valid Firebase client email is required").optional(),
  FIREBASE_PRIVATE_KEY: z.string().min(1, "Firebase private key is required").optional(),

  // Application Config
  NEXTAUTH_SECRET: z.string().min(32, "NextAuth secret must be at least 32 characters").optional(),
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
 * Get the current environment with comprehensive build detection
 */
function getCurrentEnvironment(): "development" | "staging" | "production" | "test" | "build" {const env = process.env.NODE_ENV || "development";
  const vercelEnv = process.env.VERCEL_ENV;
  
  // Comprehensive build detection
  const isBuildTime = (
    process.env.npm_lifecycle_event === "build" ||
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NEXT_PHASE === "phase-production-server" ||
    process.argv.includes('build') ||
    process.argv.includes('next build') ||
    // Vercel build detection
    process.env.VERCEL_ENV && process.env.CI && !process.env.VERCEL_URL ||
    // GitHub Actions build detection
    process.env.GITHUB_ACTIONS === "true" ||
    // Generic CI detection
    process.env.CI === "true" && !process.env.VERCEL_URL
  );
  
  if (isBuildTime) { return "build" as any;
   }

  // Vercel environment mapping
  if (vercelEnv === "production") return "production";
  if (vercelEnv === "preview") return "staging";

  // Check if we're in local development (not deployed)
  const isLocalDev = !process.env.VERCEL && 
                     !process.env.RAILWAY_ENVIRONMENT && 
                     !process.env.HEROKU_APP_NAME && 
                     !process.env.AWS_LAMBDA_FUNCTION_NAME &&
                     !process.env.CI;

  // Additional check for Next.js development mode
  const isNextDev = process.env.NODE_ENV === "development" || 
                    process.env.__NEXT_PROCESSED_ENV ||
                    process.env.npm_lifecycle_event === "dev";

  if (isLocalDev || isNextDev) return "development";

  // Deployed environments
  if (env === "production") return "production";
  if (env === "test") return "test";
  
  // Fallback for staging or unknown environments
  if (env === "staging" || vercelEnv === "preview") return "staging";

  return "development";
}

/**
 * Get Firebase client configuration for the current environment
 * ALL VALUES COME FROM ENVIRONMENT VARIABLES NO HARDCODED SECRETS
 */
export function getFirebaseConfig(){return { apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
   };
}

/**
 * Parse and validate environment variables with build time safety
 * SECURE: Only reads from process.env, no hardcoded values
 */
function parseEnv(){const currentEnv = getCurrentEnvironment();
  const envVars = { NODE_ENV: process.env.NODE_ENV || "development",
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

  // Build time environment handling
  if (currentEnv === 'build') {console.warn('🔧 Build time environment detected, using safe defaults');
    
    // Skip validation during build if SKIP_ENV_VALIDATION is set
    if (process.env.SKIP_ENV_VALIDATION === 'true') { console.warn('⚠️ Skipping environment validation during build');
      return envVars as any;
     }
  }

  try {const result = envSchema.parse(envVars);
    
    // Production specific validation (skip during build)
    if (currentEnv === 'production' && currentEnv !== 'build') { validateProductionConfig(result);
     }
    
    return result;
  } catch (error: unknown) {logger.error('❌ Environment validation failed: ', error);
    
    // Be more lenient during build time
    if (currentEnv === 'build') { console.warn("⚠️ Environment validation failed during build, using fallbacks");
      return createSafeBuildEnv(envVars);
     }
    
    if (currentEnv === 'production') {throw new Error(`PRODUCTION CRITICAL: Environment configuration is invalid.Application cannot start.Please check your environment variables.`
      );
      }
    
    console.warn("⚠️ Environment validation failed in development mode, continuing with warnings");
    return createSafeBuildEnv(envVars);
  }
}

/**
 * Create safe environment variables for build time
 */
function createSafeBuildEnv(envVars) {return {...envVars,
    // Ensure required public vars have values (use build defaults if missing)
    NEXT_PUBLIC_FIREBASE_API_KEY: envVars.NEXT_PUBLIC_FIREBASE_API_KEY || 'build default',
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: envVars.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'build default.firebaseapp.com',
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'build default',
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: envVars.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'build default.appspot.com',
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: envVars.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
    NEXT_PUBLIC_FIREBASE_APP_ID: envVars.NEXT_PUBLIC_FIREBASE_APP_ID || '1:000000000000:web:build default',
    // Set Firebase Project ID from public var if available
    FIREBASE_PROJECT_ID: envVars.FIREBASE_PROJECT_ID || envVars.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'build default',
   };
}

/**
 * Validate production specific requirements
 */
function validateProductionConfig(config) {const requiredInProduction = [ 'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY',
    'NEXTAUTH_SECRET',
  ];
  
  const missing = requiredInProduction.filter(key => !config[key]);
  
  if (missing.length > 0) { throw new Error(`PRODUCTION CRITICAL: Missing required environment variables: ${missing.join(', ') }.` +
      'These are required for production deployment.'
    );
  }
  
  // Validate Firebase Admin credentials format
  if (config.FIREBASE_PRIVATE_KEY && !config.FIREBASE_PRIVATE_KEY.includes('BEGIN PRIVATE KEY')) {
    throw new Error('PRODUCTION CRITICAL: FIREBASE_PRIVATE_KEY appears to be invalid. It should be a properly formatted private key.');
  }
  
  // Production environment validation passed
}

// Parse environment on module load with fallbacks
let env: ReturnType<typeof parseEnv>;
try {env = parseEnv();
  } catch (error: unknown) {logger.error('❌ Environment parsing failed, using fallbacks: ', error);
  // Provide safe fallbacks for build time
  env = { NODE_ENV: (process.env.NODEENV as any) || "development",
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

export {env  };

// Export current environment info
export const isProduction = env.NODEENV === "production";
export const isDevelopment = env.NODEENV === "development";
export const isStaging = env.NODEENV === "staging";
export const isTest = env.NODEENV === "test";
export const currentEnvironment = getCurrentEnvironment();

// SECURITY FIX: NEVER skip auth or onboarding - these were dangerous bypasses
export const skipAuthInDev = false; // DISABLED - security vulnerability
export const skipOnboardingInDev = false; // DISABLED - security vulnerability

// Export whether Firebase Admin is properly configured
export const isFirebaseAdminConfigured = !!(
  env.FIREBASE_CLIENT_EMAIL && env.FIREBASE_PRIVATE_KEY
);

// Environment initialization complete
console.warn(`🚀 Environment: ${currentEnvironment  } | Firebase Admin: ${isFirebaseAdminConfigured ? "✅"  : "❌"  }`);








