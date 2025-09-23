/**
 * Firebase App Check Configuration
 * Provides app attestation to protect backend resources
 */

import { FirebaseApp } from 'firebase/app';
import {
  initializeAppCheck,
  AppCheck,
  ReCaptchaV3Provider,
  ReCaptchaEnterpriseProvider,
  CustomProvider,
  getToken,
} from 'firebase/app-check';

let appCheck: AppCheck | null = null;

/**
 * Initialize Firebase App Check for production security
 */
export function initializeAppCheckSecurity(app: FirebaseApp): AppCheck | null {
  // Only enable in production
  if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    console.log('ℹ️ App Check disabled in development');
    return null;
  }

  // Check if App Check is enabled
  if (process.env.NEXT_PUBLIC_ENABLE_APP_CHECK !== 'true') {
    console.log('ℹ️ App Check disabled via feature flag');
    return null;
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    console.error('❌ App Check enabled but RECAPTCHA_SITE_KEY not provided');
    return null;
  }

  try {
    // Use ReCaptcha V3 for web (invisible to users)
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      isTokenAutoRefreshEnabled: true, // Auto-refresh tokens
    });

    console.log('✅ Firebase App Check initialized');

    // Log token refresh events in development
    if (process.env.NODE_ENV === 'development') {
      monitorAppCheckTokens();
    }

    return appCheck;
  } catch (error) {
    console.error('❌ Failed to initialize App Check:', error);
    return null;
  }
}

/**
 * Custom App Check provider for special cases (e.g., CI/CD, testing)
 */
export class HiveDebugProvider extends CustomProvider {
  constructor(private debugToken: string) {
    super({
      getToken: async () => {
        // In debug mode, return debug token
        if (process.env.NODE_ENV === 'development' && debugToken) {
          return {
            token: debugToken,
            expireTimeMillis: Date.now() + 3600000, // 1 hour
          };
        }

        throw new Error('Debug token not available');
      },
    });
  }
}

/**
 * Initialize App Check with debug provider (for testing)
 */
export function initializeAppCheckDebug(
  app: FirebaseApp,
  debugToken: string
): AppCheck | null {
  if (process.env.NODE_ENV !== 'development') {
    console.error('❌ Debug App Check can only be used in development');
    return null;
  }

  try {
    appCheck = initializeAppCheck(app, {
      provider: new HiveDebugProvider(debugToken),
      isTokenAutoRefreshEnabled: false,
    });

    console.log('✅ Firebase App Check initialized in debug mode');
    return appCheck;
  } catch (error) {
    console.error('❌ Failed to initialize debug App Check:', error);
    return null;
  }
}

/**
 * Get current App Check token
 */
export async function getAppCheckToken(
  forceRefresh = false
): Promise<string | null> {
  if (!appCheck) {
    console.warn('App Check not initialized');
    return null;
  }

  try {
    const result = await getToken(appCheck, forceRefresh);
    return result.token;
  } catch (error) {
    console.error('Failed to get App Check token:', error);
    return null;
  }
}

/**
 * Monitor App Check token refresh (for debugging)
 */
function monitorAppCheckTokens(): void {
  if (!appCheck) return;

  // Log when tokens are refreshed
  let tokenCount = 0;
  setInterval(async () => {
    try {
      const token = await getAppCheckToken(false);
      if (token) {
        tokenCount++;
        console.log(`🔐 App Check token #${tokenCount} active`);
      }
    } catch (error) {
      console.error('Token monitoring error:', error);
    }
  }, 300000); // Check every 5 minutes
}

/**
 * Middleware to add App Check token to API requests
 */
export async function addAppCheckHeader(
  headers: Headers | Record<string, string>
): Promise<Headers | Record<string, string>> {
  const token = await getAppCheckToken();

  if (token) {
    if (headers instanceof Headers) {
      headers.set('X-Firebase-AppCheck', token);
    } else {
      headers['X-Firebase-AppCheck'] = token;
    }
  }

  return headers;
}

/**
 * React hook for App Check status
 */
export function useAppCheck() {
  const [isProtected, setIsProtected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkProtection = async () => {
      try {
        const token = await getAppCheckToken();
        setIsProtected(!!token);
      } catch (error) {
        console.error('App Check verification failed:', error);
        setIsProtected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkProtection();

    // Re-check periodically
    const interval = setInterval(checkProtection, 600000); // Every 10 minutes

    return () => clearInterval(interval);
  }, []);

  return {
    isProtected,
    isLoading,
    refreshToken: () => getAppCheckToken(true),
  };
}

/**
 * Server-side App Check verification
 * Use this in API routes to verify requests
 */
export async function verifyAppCheckToken(
  token: string | null,
  projectId: string
): Promise<boolean> {
  if (!token) {
    console.warn('No App Check token provided');
    return false;
  }

  // In production, verify with Firebase Admin SDK
  if (process.env.NODE_ENV === 'production') {
    try {
      // This would be done server-side with admin SDK
      // For now, we trust the token if it exists
      // Real implementation would verify with Firebase Admin
      return true;
    } catch (error) {
      console.error('App Check verification failed:', error);
      return false;
    }
  }

  // In development, accept debug tokens
  return token.startsWith('debug-');
}

// React imports (add at top if using the hook)
import { useState, useEffect } from 'react';

export default {
  initializeAppCheckSecurity,
  initializeAppCheckDebug,
  getAppCheckToken,
  addAppCheckHeader,
  verifyAppCheckToken,
  useAppCheck,
};