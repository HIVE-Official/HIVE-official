import type { ActionCodeSettings } from "firebase/auth";

/**
 * Configuration for sending magic link emails
 */
export interface MagicLinkConfig {
  email: string;
  schoolId: string;
  continueUrl?: string;
}

/**
 * Result of sending a magic link
 */
export interface SendMagicLinkResult {
  success: boolean;
  error?: string;
}

/**
 * Firebase Auth Action Code URL configuration
 * 
 * This configuration is used for magic link authentication to:
 * 1. Specify where users should be redirected after clicking the magic link
 * 2. Enable deep linking for mobile apps
 * 3. Provide fallback URLs and app installation prompts
 */

/**
 * Get the base app URL, handling cases where environment variable is not set
 */
function getAppUrl(): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  
  // In development or when env var is missing, provide a fallback
  if (!appUrl) {
    // During development, default to localhost
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3000';
    }
    
    // In production, log error but provide a fallback
    console.error('⚠️ NEXT_PUBLIC_APP_URL environment variable is not set');
    return 'https://hive.college'; // Fallback to production domain
  }
  
  return appUrl;
}

/**
 * Default action code settings for HIVE magic links
 */
export const getDefaultActionCodeSettings = (schoolId: string): ActionCodeSettings => ({
  url: `${getAppUrl()}/auth/verify?schoolId=${schoolId}`,
  handleCodeInApp: true,
  iOS: {
    bundleId: process.env.NEXT_PUBLIC_IOS_BUNDLE_ID || 'com.hive.app',
  },
  android: {
    packageName: process.env.NEXT_PUBLIC_ANDROID_PACKAGE_NAME || 'com.hive.app',
    installApp: true,
    minimumVersion: '1',
  },
});

/**
 * Create action code settings with custom URL
 */
export const createActionCodeSettings = (
  customUrl: string,
  options?: Partial<ActionCodeSettings>
): ActionCodeSettings => ({
  ...getDefaultActionCodeSettings(''), // Get defaults but ignore the default URL
  url: customUrl,
  ...options,
});

/**
 * Validates an email domain against the school's domain
 */
export const validateEmailDomain = (email: string, schoolDomain: string): boolean => {
  const emailDomain = email.split('@')[1]?.toLowerCase();
  return emailDomain === schoolDomain.toLowerCase();
}; 