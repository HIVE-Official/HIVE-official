"use client";

/**
 * HIVE Pure Firebase Auth Context
 * EMERGENCY REWRITE - Clean Firebase Authentication Only
 * Eliminates session auth chaos and implements proper Firebase flow
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { 
  User as FirebaseUser} from 'firebase/auth';
import {
  onAuthStateChanged,
  signInWithCustomToken,
  signOut as firebaseSignOut,
  getIdToken
} from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase app with proper error handling
function initializeFirebaseApp() {
  // Validate required Firebase configuration
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  // Validate critical configuration values
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
    throw new Error('Missing critical Firebase configuration. Check environment variables.');
  }

  try {
    // Return existing app if already initialized
    if (getApps().length > 0) {
      return getApps()[0];
    }
    
    // Initialize new Firebase app
    return initializeApp(firebaseConfig);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw new Error('Firebase initialization failed. Check your configuration.');
  }
}

let app: any;
let auth: any;

try {
  app = initializeFirebaseApp();
  auth = getAuth(app);
} catch (error) {
  console.error('Critical Firebase initialization error:', error);
  // In production, you might want to redirect to an error page
  app = null;
  auth = null;
}

// Clean logger
const logger = {
  info: (msg: string, ctx?: any) => console.info(`[HIVE AUTH] ${msg}`, ctx),
  error: (msg: string, ctx?: any) => console.error(`[HIVE AUTH] ${msg}`, ctx),
  warn: (msg: string, ctx?: any) => console.warn(`[HIVE AUTH] ${msg}`, ctx),
};

// HIVE User Interface (Firebase-only)
export interface HiveUser {
  id: string;          // Firebase UID
  uid: string;         // Firebase UID (duplicate for compatibility)
  email: string;
  emailVerified: boolean;
  fullName?: string;
  handle?: string;
  major?: string;      // Legacy field for backward compatibility
  majors?: string[];   // New field for multiple majors
  avatarUrl?: string;
  schoolId?: string;
  builderOptIn?: boolean;  // Added missing field
  onboardingCompleted: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Auth State Interface
export interface FirebaseAuthState {
  user: HiveUser | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Context Interface
export interface FirebaseAuthContextType extends FirebaseAuthState {
  // Core Authentication
  signInWithMagicLink: (customToken: string) => Promise<void>;
  signOut: () => Promise<void>;
  logout: () => Promise<void>;  // Alias for backward compatibility
  refreshUserData: () => Promise<void>;
  getAuthToken: () => Promise<string | null>;
  
  // Onboarding
  completeOnboarding: (data: OnboardingData) => Promise<OnboardingResult>;
  requiresOnboarding: () => boolean;
}

// Onboarding Types
export interface OnboardingData {
  fullName: string;
  userType: 'student' | 'alumni' | 'faculty';
  firstName?: string;
  lastName?: string;
  major?: string;      // Legacy field for backward compatibility
  majors: string[];    // New field for multiple majors
  academicLevel?: string;
  graduationYear: number;
  handle: string;
  avatarUrl?: string;
  builderRequestSpaces?: string[];
  interests?: string[]; // Added interests array
  consentGiven: boolean;
}

export interface OnboardingResult {
  success: boolean;
  user?: HiveUser;
  builderRequestsCreated?: number;
  error?: string;
}

// Create Context
const FirebaseAuthContext = createContext<FirebaseAuthContextType | null>(null);

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  // Check for Firebase initialization errors
  if (!auth || !app) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-xl font-bold text-foreground">Configuration Error</h2>
          <p className="text-muted-foreground">
            Firebase authentication is not properly configured. Please check your environment variables.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Pure Firebase State with session persistence
  const [authState, setAuthState] = useState<FirebaseAuthState>(() => {
    // Initialize from stored session if available
    if (typeof window !== 'undefined') {
      try {
        const storedSession = localStorage.getItem('hive-auth-session');
        if (storedSession) {
          const session = JSON.parse(storedSession);
          // Validate session data structure
          if (session.user && session.user.id && session.user.email) {
            return {
              user: session.user,
              firebaseUser: null, // Will be restored by Firebase auth state listener
              isLoading: true, // Still loading Firebase user
              isAuthenticated: true,
              error: null,
            };
          }
        }
      } catch (error) {
        logger.warn('Failed to restore session from localStorage', { error });
        // Clear corrupted session data
        localStorage.removeItem('hive-auth-session');
      }
    }
    
    return {
      user: null,
      firebaseUser: null,
      isLoading: true,
      isAuthenticated: false,
      error: null,
    };
  });

  // Update auth state helper with session persistence
  const updateAuthState = useCallback((updates: Partial<FirebaseAuthState>) => {
    setAuthState(prev => {
      const newState = { ...prev, ...updates };
      
      // Persist session to localStorage when user data is available
      if (typeof window !== 'undefined') {
        try {
          if (newState.user && newState.isAuthenticated) {
            // Store authenticated session
            const sessionData = {
              user: newState.user,
              timestamp: Date.now(),
              expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days
            };
            localStorage.setItem('hive-auth-session', JSON.stringify(sessionData));
          } else if (!newState.isAuthenticated) {
            // Clear session on sign out
            localStorage.removeItem('hive-auth-session');
          }
        } catch (error) {
          logger.warn('Failed to persist session to localStorage', { error });
        }
      }
      
      return newState;
    });
  }, []);

  // Validate stored session
  const validateStoredSession = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
      const storedSession = localStorage.getItem('hive-auth-session');
      if (!storedSession) return false;
      
      const session = JSON.parse(storedSession);
      
      // Check session structure
      if (!session.user || !session.user.id || !session.user.email) {
        return false;
      }
      
      // Check expiration
      if (session.expiresAt && Date.now() > session.expiresAt) {
        logger.info('Stored session expired, clearing');
        localStorage.removeItem('hive-auth-session');
        return false;
      }
      
      return true;
    } catch (error) {
      logger.warn('Failed to validate stored session', { error });
      localStorage.removeItem('hive-auth-session');
      return false;
    }
  }, []);

  // Get Firebase ID Token
  const getAuthToken = useCallback(async (): Promise<string | null> => {
    if (!authState.firebaseUser) {
      return null;
    }
    
    try {
      const token = await getIdToken(authState.firebaseUser);
      return token;
    } catch (error) {
      logger.error('Failed to get ID token', { error });
      return null;
    }
  }, [authState.firebaseUser]);

  // Load HIVE user profile from Firestore
  const loadHiveUserProfile = useCallback(async (firebaseUser: FirebaseUser): Promise<HiveUser | null> => {
    try {
      const token = await getIdToken(firebaseUser);
      
      const response = await fetch('/api/profile/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // User exists in Firebase but not in Firestore - needs onboarding
          return {
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            emailVerified: firebaseUser.emailVerified,
            onboardingCompleted: false,
          };
        }
        throw new Error(`Failed to load profile: ${response.status}`);
      }

      const profileData = await response.json();
      
      return {
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        emailVerified: firebaseUser.emailVerified,
        ...profileData,
      };
    } catch (error) {
      logger.error('Failed to load HIVE profile', { error, uid: firebaseUser.uid });
      return null;
    }
  }, []);

  // Refresh user data
  const refreshUserData = useCallback(async () => {
    if (!authState.firebaseUser) {
      return;
    }

    updateAuthState({ isLoading: true, error: null });
    
    try {
      const hiveUser = await loadHiveUserProfile(authState.firebaseUser);
      
      if (hiveUser) {
        updateAuthState({
          user: hiveUser,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        throw new Error('Failed to load user profile');
      }
    } catch (error) {
      logger.error('Refresh user data failed', { error });
      updateAuthState({
        error: 'Failed to refresh user data',
        isLoading: false,
      });
    }
  }, [authState.firebaseUser, loadHiveUserProfile, updateAuthState]);

  // Sign in with Firebase Custom Token (from magic link)
  const signInWithMagicLink = useCallback(async (customToken: string) => {
    try {
      updateAuthState({ isLoading: true, error: null });
      
      // Sign in with Firebase
      const userCredential = await signInWithCustomToken(auth, customToken);
      
      // Firebase auth state change will trigger profile loading
      logger.info('Magic link sign-in successful', { uid: userCredential.user.uid });
      
    } catch (error) {
      logger.error('Magic link sign-in failed', { error });
      updateAuthState({
        error: error instanceof Error ? (error instanceof Error ? error.message : "Unknown error") : 'Sign-in failed',
        isLoading: false,
      });
      throw error;
    }
  }, [updateAuthState]);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      // Clear session storage immediately
      if (typeof window !== 'undefined') {
        localStorage.removeItem('hive-auth-session');
        // Also clear any other auth-related storage
        localStorage.removeItem('firebase-auth-token');
        localStorage.removeItem('hive-user-data');
        sessionStorage.clear();
      }
      
      await firebaseSignOut(auth);
      // Auth state change will clear user data
      logger.info('User signed out successfully');
    } catch (error) {
      logger.error('Sign out failed', { error });
      // Even if Firebase sign out fails, clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('hive-auth-session');
      }
    }
  }, []);

  // Complete onboarding
  const completeOnboarding = useCallback(async (onboardingData: OnboardingData): Promise<OnboardingResult> => {
    if (!authState.user || !authState.firebaseUser) {
      throw new Error('No authenticated user for onboarding');
    }
    
    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('No auth token available');
      }

      const response = await fetch('/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(onboardingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to complete onboarding');
      }

      const result = await response.json();
      
      // Refresh user data to get updated profile
      await refreshUserData();
      
      return {
        success: true,
        user: authState.user,
        builderRequestsCreated: result.builderRequestsCreated || 0,
      };
      
    } catch (error) {
      logger.error('Onboarding completion failed', { error });
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }, [authState.user, authState.firebaseUser, getAuthToken, refreshUserData]);

  // Check if onboarding required
  const requiresOnboarding = useCallback((): boolean => {
    return authState.user ? !authState.user.onboardingCompleted : false;
  }, [authState.user]);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User signed in
        updateAuthState({
          firebaseUser,
          isLoading: true,
          error: null,
        });
        
        try {
          const hiveUser = await loadHiveUserProfile(firebaseUser);
          
          if (hiveUser) {
            updateAuthState({
              user: hiveUser,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            throw new Error('Failed to load user profile');
          }
        } catch (error) {
          logger.error('Auth state change failed', { error });
          updateAuthState({
            error: 'Authentication failed',
            isLoading: false,
          });
        }
      } else {
        // User signed out
        updateAuthState({
          user: null,
          firebaseUser: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    });

    return unsubscribe;
  }, [loadHiveUserProfile, updateAuthState]);

  // Session validation and cleanup effect
  useEffect(() => {
    // Validate session on mount and periodically
    const validateSession = () => {
      if (!validateStoredSession() && authState.isAuthenticated && !authState.firebaseUser) {
        // Stored session is invalid but we think user is authenticated
        // Reset auth state to force re-authentication
        updateAuthState({
          user: null,
          firebaseUser: null,
          isAuthenticated: false,
          isLoading: false,
          error: 'Session expired',
        });
      }
    };

    // Initial validation
    validateSession();

    // Periodic validation every 5 minutes
    const interval = setInterval(validateSession, 5 * 60 * 1000);

    // Cleanup on visibility change (tab becomes active)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        validateSession();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [authState.isAuthenticated, authState.firebaseUser, updateAuthState, validateStoredSession]);

  const contextValue: FirebaseAuthContextType = {
    ...authState,
    signInWithMagicLink,
    signOut,
    logout: signOut,  // Alias for backward compatibility
    refreshUserData,
    getAuthToken,
    completeOnboarding,
    requiresOnboarding,
  };

  return (
    <FirebaseAuthContext.Provider value={contextValue}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

// Hook to use Firebase Auth
export function useFirebaseAuth(): FirebaseAuthContextType {
  const context = useContext(FirebaseAuthContext);
  if (!context) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }
  return context;
}

// Compatibility alias
export const useUnifiedAuth = useFirebaseAuth;