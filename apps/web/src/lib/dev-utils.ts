/**
 * Development Utilities with PRODUCTION SAFETY
 * 
 * CRITICAL: These utilities are ONLY available in local development
 * Multiple safety checks ensure they can NEVER run in production
 */

/**
 * Simple development check (for backwards compatibility)
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if we're REALLY in local development
 * This function has multiple redundant checks to prevent any possibility
 * of dev features appearing in production
 */
export function isLocalDevelopment(): boolean {
  // Server-side check
  if (typeof window === 'undefined') {
    return (
      process.env.NODE_ENV === 'development' &&
      !process.env.VERCEL &&
      !process.env.VERCEL_ENV &&
      !process.env.RAILWAY_ENVIRONMENT &&
      !process.env.HEROKU_APP_NAME &&
      !process.env.AWS_LAMBDA_FUNCTION_NAME &&
      !process.env.GOOGLE_CLOUD_PROJECT &&
      !process.env.AZURE_FUNCTIONS_ENVIRONMENT
    );
  }

  // Client-side check with multiple safety layers
  const url = window.location;
  
  // CRITICAL SAFETY CHECKS
  const isLocalhost = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const isLocalPort = ['3000', '3001', '3002', '3003', '3004', '3005'].includes(url.port); // Common dev ports
  const notProductionDomain = !url.hostname.includes('hive') && 
                               !url.hostname.includes('vercel') && 
                               !url.hostname.includes('.app') &&
                               !url.hostname.includes('.com') &&
                               !url.hostname.includes('.org');
  const isHttpNotHttps = url.protocol === 'http:';
  
  // ALL conditions must be true for dev mode
  return isLocalhost && isLocalPort && notProductionDomain && isHttpNotHttps;
}

/**
 * Development-only features configuration
 * These will ALWAYS be false in production
 */
export const DEV_FEATURES = {
  // Auto-login for onboarding testing
  autoLogin: isLocalDevelopment() && process.env.NEXT_PUBLIC_ENABLE_DEV_AUTO_LOGIN === 'true',
  
  // Skip all button in onboarding
  skipAllButton: isLocalDevelopment(),
  
  // Dev mode indicators
  showDevIndicator: isLocalDevelopment(),
  
  // Console logging
  verboseLogging: isLocalDevelopment(),
  
  // Mock data
  useMockData: false, // Always false for safety
  
  // Skip email verification
  skipEmailVerification: false, // Always false for safety
};

/**
 * Log only in development
 */
export function devLog(...args: any[]) {
  if (isLocalDevelopment() && DEV_FEATURES.verboseLogging) {
    console.log('[DEV]', ...args);
  }
}

/**
 * Warn only in development
 */
export function devWarn(...args: any[]) {
  if (isLocalDevelopment()) {
    console.warn('[DEV WARNING]', ...args);
  }
}

/**
 * Error in development, silent in production
 */
export function devError(...args: any[]) {
  if (isLocalDevelopment()) {
    console.error('[DEV ERROR]', ...args);
  }
}

/**
 * Assert development environment
 * Throws error if not in development (for critical dev-only features)
 */
export function assertDevelopment(feature: string) {
  if (!isLocalDevelopment()) {
    throw new Error(`Feature "${feature}" is only available in development mode`);
  }
}

/**
 * Get safe environment name for display
 */
export function getEnvironmentName(): string {
  if (typeof window === 'undefined') {
    if (process.env.VERCEL_ENV === 'production') return 'Production';
    if (process.env.VERCEL_ENV === 'preview') return 'Staging';
    if (process.env.NODE_ENV === 'test') return 'Test';
    if (isLocalDevelopment()) return 'Development';
    return 'Production'; // Default to production for safety
  }
  
  // Client-side - be extra careful
  if (isLocalDevelopment()) return 'Development';
  return 'Production'; // Always assume production if not definitely dev
}

// Freeze the exports to prevent runtime modification
Object.freeze(DEV_FEATURES);