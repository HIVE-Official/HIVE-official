/**
 * Centralized configuration for HIVE application
 * Handles environment variables and application settings
 */

export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000', 10),
  },

  // Authentication Configuration
  auth: {
    tokenStorageKey: 'hive_session',
    tokenExpiryHours: parseInt(process.env.NEXT_PUBLIC_TOKEN_EXPIRY_HOURS || '24', 10),
    enableTestMode: process.env.NODE_ENV === 'development',
  },

  // Cache Configuration
  cache: {
    defaultStaleTime: parseInt(process.env.NEXT_PUBLIC_CACHE_STALE_TIME || '300000', 10), // 5 minutes
    spacesStaleTime: parseInt(process.env.NEXT_PUBLIC_SPACES_CACHE_TIME || '300000', 10),
    profileStaleTime: parseInt(process.env.NEXT_PUBLIC_PROFILE_CACHE_TIME || '600000', 10), // 10 minutes
  },

  // Feature Flags
  features: {
    enableSmartDiscovery: process.env.NEXT_PUBLIC_ENABLE_SMART_DISCOVERY === 'true',
    enableCrossSpaceCollaboration: process.env.NEXT_PUBLIC_ENABLE_COLLABORATION === 'true',
    enableAdvancedAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableResourceManager: process.env.NEXT_PUBLIC_ENABLE_RESOURCES === 'true',
  },

  // App Configuration
  app: {
    name: 'HIVE',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000',
  },

  // Logging Configuration
  logging: {
    level: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
    enableConsole: process.env.NODE_ENV === 'development',
    enableSentry: process.env.NEXT_PUBLIC_ENABLE_SENTRY === 'true',
  },

  // UI Configuration
  ui: {
    defaultPageSize: parseInt(process.env.NEXT_PUBLIC_DEFAULT_PAGE_SIZE || '20', 10),
    maxUploadSize: parseInt(process.env.NEXT_PUBLIC_MAX_UPLOAD_SIZE || '10485760', 10), // 10MB
    supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  },
} as const;

// Type-safe configuration access
export type Config = typeof config;

// Validation function to ensure required env vars are present
export function validateConfig(): { isValid: boolean; missingVars: string[] } {
  const requiredVars: string[] = [
    // Add required environment variables here
    // 'NEXT_PUBLIC_API_URL',
    // 'NEXT_PUBLIC_FIREBASE_API_KEY',
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
}

// Helper to get configuration with fallbacks
export function getConfig<K extends keyof Config>(section: K): Config[K] {
  return config[section];
}