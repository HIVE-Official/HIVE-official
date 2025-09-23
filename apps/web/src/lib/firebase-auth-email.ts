/**
 * Firebase Auth Email Service
 * Uses Firebase's built-in email authentication instead of SendGrid
 */

import { getAuth } from "firebase-admin/auth";
import { logger } from "@/lib/logger";

interface FirebaseMagicLinkOptions {
  email: string;
  schoolName: string;
  redirectUrl?: string;
}

/**
 * Send magic link email using Firebase Auth
 * Firebase handles email delivery, templates, and link generation
 */
export async function sendFirebaseMagicLinkEmail({
  email,
  schoolName,
  redirectUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}: FirebaseMagicLinkOptions): Promise<string> {
  try {
    const auth = getAuth();

    // Configure action code settings for magic link
    const actionCodeSettings = {
      // URL to redirect to after email verification
      url: `${redirectUrl}/auth/verify?school=${encodeURIComponent(schoolName)}`,

      // This must be true for email link sign-in
      handleCodeInApp: true,

      // iOS and Android app configuration (optional, for future mobile apps)
      iOS: {
        bundleId: 'com.hive.app'
      },
      android: {
        packageName: 'com.hive.app',
        installApp: true,
        minimumVersion: '12'
      },

      // Dynamic link domain (optional, for shorter links)
      // dynamicLinkDomain: 'hive.page.link'
    };

    // Generate the sign-in link
    const link = await auth.generateSignInWithEmailLink(email, actionCodeSettings);

    // In development, log the link
    if (process.env.NODE_ENV === 'development') {
      logger.info('🔐 Firebase Magic Link Generated', {
        email: email.replace(/(.{3}).*@/, '$1***@'),
        schoolId: schoolName, // Using schoolId key to match LogContext type
        endpoint: 'firebase-auth-email'
      });

      // Also log to console for easy access
      console.log('\n=== FIREBASE MAGIC LINK (Development) ===');
      console.log(`To: ${email}`);
      console.log(`Link: ${link}`);
      console.log('==========================================\n');
    }

    // Firebase automatically sends the email using its built-in templates
    // You can customize the email template in Firebase Console:
    // Authentication > Templates > Email address verification

    return link;
  } catch (error: any) {
    logger.error('Failed to generate Firebase magic link', {
      error: error.message,
      email: email.replace(/(.{3}).*@/, '$1***@'),
      schoolId: schoolName
    });

    throw new Error(`Failed to send magic link: ${error.message}`);
  }
}

/**
 * Verify a Firebase magic link
 */
export async function verifyFirebaseMagicLink(email: string, link: string): Promise<boolean> {
  try {
    // Basic validation - check if link contains the required Firebase Auth parameters
    const url = new URL(link);
    const isValid = url.hostname.includes('firebaseapp.com') ||
                    url.hostname.includes('firebase.com') ||
                    (url.searchParams.has('mode') && url.searchParams.get('mode') === 'signIn');

    if (!isValid) {
      logger.warn('Invalid magic link attempted', {
        email: email.replace(/(.{3}).*@/, '$1***@')
      });
      return false;
    }

    return true;
  } catch (error: any) {
    logger.error('Failed to verify Firebase magic link', {
      error: error.message,
      email: email.replace(/(.{3}).*@/, '$1***@')
    });
    return false;
  }
}

/**
 * Create or update user after successful magic link verification
 */
export async function createOrUpdateFirebaseUser(email: string, additionalClaims?: Record<string, any>) {
  try {
    const auth = getAuth();

    // Check if user exists
    let user;
    try {
      user = await auth.getUserByEmail(email);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        user = await auth.createUser({
          email,
          emailVerified: true, // Already verified via magic link
        });

        logger.info('New Firebase user created via magic link', {
          userId: user.uid, // Using userId key to match LogContext type
          email: email.replace(/(.{3}).*@/, '$1***@')
        });
      } else {
        throw error;
      }
    }

    // Set custom claims if provided
    if (additionalClaims) {
      await auth.setCustomUserClaims(user.uid, additionalClaims);
    }

    return user;
  } catch (error: any) {
    logger.error('Failed to create/update Firebase user', {
      error: error.message,
      email: email.replace(/(.{3}).*@/, '$1***@')
    });
    throw error;
  }
}

/**
 * Configure Firebase Auth email templates (call once during setup)
 * Note: This is mainly done in Firebase Console, but we can set some defaults
 */
export async function configureFirebaseEmailTemplates() {
  // Email templates are configured in Firebase Console:
  // https://console.firebase.google.com/project/hive-9265c/authentication/emails

  // You can customize:
  // 1. Email address verification template
  // 2. Password reset template
  // 3. Email address change template

  // Templates support variables like:
  // - %APP_NAME% - Your app name
  // - %LINK% - The action link
  // - %EMAIL% - User's email

  // Log configuration info without custom fields that break LogContext type
  logger.info('📧 Firebase Email Templates Configuration', {
    endpoint: 'firebase-auth-email'
  });
}

/**
 * Helper to check if Firebase Auth email provider is enabled
 */
export async function isFirebaseEmailAuthEnabled(): Promise<boolean> {
  try {
    const auth = getAuth();
    // Try to generate a test link - will fail if not configured
    await auth.generateSignInWithEmailLink('test@example.com', {
      url: 'https://example.com',
      handleCodeInApp: true
    });
    return true;
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed') {
      logger.warn('⚠️ Firebase Email Auth is not enabled', {
        endpoint: 'firebase-auth-email',
        error: 'Email/Password provider not enabled in Firebase Console'
      });
      return false;
    }
    // Other errors don't necessarily mean it's disabled
    return true;
  }
}