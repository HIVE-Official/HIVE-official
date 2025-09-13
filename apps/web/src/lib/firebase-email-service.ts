/**
 * Firebase Email Link Authentication Service
 * Uses Firebase's built-in email link (passwordless) authentication
 */

import { auth } from './firebase-client';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { authAdmin } from './firebase-admin';

/**
 * Action code settings for Firebase email links
 */
const getActionCodeSettings = (email: string, schoolId?: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  return {
    // URL you want to redirect back to after email verification
    url: `${baseUrl}/auth/verify?email=${encodeURIComponent(email)}&schoolId=${schoolId || 'ub-buffalo'}`,
    // This must be true for email link sign-in
    handleCodeInApp: true,
    // For mobile apps (optional)
    iOS: {
      bundleId: 'com.hive.campus'
    },
    android: {
      packageName: 'com.hive.campus',
      installApp: true,
      minimumVersion: '12'
    },
    // Prevents the link from being opened in a mobile app
    dynamicLinkDomain: undefined
  };
};

/**
 * Send magic link using Firebase Email Link authentication
 */
export async function sendFirebaseMagicLink(
  email: string,
  schoolId: string = 'ub-buffalo'
): Promise<{ success: boolean; error?: string }> {
  try {
    // In development, log the action
    if (process.env.NODE_ENV === 'development') {

    }

    // Send sign-in link to email
    await sendSignInLinkToEmail(auth, email, getActionCodeSettings(email, schoolId));
    
    // Save email in localStorage for later verification
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('emailForSignIn', email);
      window.localStorage.setItem('schoolIdForSignIn', schoolId);
    }

    return { success: true };
  } catch (error: unknown) {

    // Handle specific Firebase errors
    if (error.code === 'auth/invalid-email') {
      return { success: false, error: 'Invalid email address' };
    }
    if (error.code === 'auth/missing-continue-uri') {
      return { success: false, error: 'Configuration error - missing redirect URL' };
    }
    if (error.code === 'auth/unauthorized-continue-uri') {
      return { success: false, error: 'Unauthorized domain - please add to Firebase authorized domains' };
    }
    
    return { success: false, error: error.message || 'Failed to send magic link' };
  }
}

/**
 * Verify magic link and sign in user
 */
export async function verifyFirebaseMagicLink(
  emailLink: string,
  email?: string
): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
  try {
    // Check if this is a valid sign-in link
    if (!isSignInWithEmailLink(auth, emailLink)) {
      return { success: false, error: 'Invalid or expired magic link' };
    }

    // Get email from localStorage if not provided
    const emailToUse = email || window.localStorage.getItem('emailForSignIn');
    
    if (!emailToUse) {
      return { success: false, error: 'Email not found. Please request a new magic link.' };
    }

    // Sign in with email link
    const result = await signInWithEmailLink(auth, emailToUse, emailLink);
    
    // Clear stored email
    window.localStorage.removeItem('emailForSignIn');
    window.localStorage.removeItem('schoolIdForSignIn');
    
    // Check if this is a new user
    const isNewUser = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
    
    // Get ID token for API calls
    const idToken = await result.user.getIdToken();
    
    return {
      success: true,
      user: {
        uid: result.user.uid,
        email: result.user.email,
        emailVerified: true, // Email links automatically verify the email
        idToken
      },
      isNewUser
    };
  } catch (error: unknown) {

    // Handle specific errors
    if (error.code === 'auth/invalid-action-code') {
      return { success: false, error: 'Magic link has expired or already been used' };
    }
    if (error.code === 'auth/invalid-email') {
      return { success: false, error: 'Invalid email address' };
    }
    
    return { success: false, error: error.message || 'Failed to verify magic link' };
  }
}

/**
 * Server-side: Create custom claims for user (for admin operations)
 */
export async function setUserClaims(
  uid: string,
  claims: Record<string, any>
): Promise<void> {
  try {
    await authAdmin.setCustomUserClaims(uid, claims);

  } catch (error) {

    throw error;
  }
}

/**
 * Server-side: Verify ID token and get user
 */
export async function verifyIdToken(idToken: string) {
  try {
    const decodedToken = await authAdmin.verifyIdToken(idToken);
    return {
      success: true,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        emailVerified: decodedToken.email_verified,
        customClaims: decodedToken
      }
    };
  } catch (error) {

    return { success: false, error: 'Invalid or expired token' };
  }
}

/**
 * Check if user exists in Firebase Auth
 */
export async function checkUserExists(email: string): Promise<boolean> {
  try {
    await authAdmin.getUserByEmail(email);
    return true;
  } catch (error: unknown) {
    if (error.code === 'auth/user-not-found') {
      return false;
    }
    throw error;
  }
}

/**
 * Delete user (for cleanup/testing)
 */
export async function deleteUser(uid: string): Promise<void> {
  try {
    await authAdmin.deleteUser(uid);

  } catch (error) {

    throw error;
  }
}