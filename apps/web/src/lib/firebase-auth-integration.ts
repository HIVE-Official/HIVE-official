import { onAuthStateChanged, signInWithEmailLink, isSignInWithEmailLink, getIdToken, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase';
import { logger } from './structured-logger';

export interface FirebaseAuthIntegration {
  listenToAuthChanges: (callback: (user: FirebaseUser | null) => void) => () => void;
  handleEmailLinkSignIn: (email?: string) => Promise<void>;
  getFirebaseToken: () => Promise<string | null>;
  signOut: () => Promise<void>;
  isEmailLinkSignIn: () => boolean;
}

/**
 * Firebase Authentication Integration for HIVE
 * Provides a clean interface to Firebase Auth for the UnifiedAuth context
 */
export const createFirebaseAuthIntegration = (): FirebaseAuthIntegration => {
  
  const listenToAuthChanges = (callback: (user: FirebaseUser | null) => void): (() => void) => {
    return onAuthStateChanged(auth, (user) => {
      logger.info('Firebase auth state changed', { userId: user?.uid });
      callback(user);
    });
  };

  const handleEmailLinkSignIn = async (email?: string): Promise<void> => {
    if (!isSignInWithEmailLink(auth, window.location.href)) {
      throw new Error('Invalid email link');
    }

    const userEmail = email || window.localStorage.getItem('emailForSignIn') || '';
    if (!userEmail) {
      throw new Error('Email not found for sign-in');
    }

    try {
      const result = await signInWithEmailLink(auth, userEmail, window.location.href);
      logger.info('Email link sign-in successful', { userId: result.user.uid });
      
      // Clean up stored email
      window.localStorage.removeItem('emailForSignIn');
    } catch (error) {
      logger.error('Email link sign-in failed', { error: error instanceof Error ? error : new Error(String(error)) });
      throw error;
    }
  };

  const getFirebaseToken = async (): Promise<string | null> => {
    const user = auth.currentUser;
    if (!user) return null;

    try {
      const token = await getIdToken(user, false); // Don't force refresh by default
      return token;
    } catch (error) {
      logger.error('Failed to get Firebase token', { error: error instanceof Error ? error : new Error(String(error)) });
      return null;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await auth.signOut();
      logger.info('Firebase sign out successful');
    } catch (error) {
      logger.error('Firebase sign out failed', { error: error instanceof Error ? error : new Error(String(error)) });
      throw error;
    }
  };

  const isEmailLinkSignIn = (): boolean => {
    return isSignInWithEmailLink(auth, window.location.href);
  };

  return {
    listenToAuthChanges,
    handleEmailLinkSignIn,
    getFirebaseToken,
    signOut,
    isEmailLinkSignIn,
  };
};

export default createFirebaseAuthIntegration;