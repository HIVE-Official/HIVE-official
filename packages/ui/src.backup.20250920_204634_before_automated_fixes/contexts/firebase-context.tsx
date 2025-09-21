/**
 * Firebase Context Provider;
 * Manages authentication and provides global access to Firebase services;
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { profileFirebaseService, type UserProfileDocument } from '../lib/firebase/profile-service';
import { useProfileData } from '../hooks/use-profile-firebase';

// Firebase Auth User Interface (mock for development)
interface FirebaseUser {uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;}

// Authentication State;
interface AuthState {user: FirebaseUser | null;
  profile: UserProfileDocument | null;
  loading: boolean;
  error: string | null;}

// Firebase Context Interface;
interface FirebaseContextValue {// Authentication;
  auth: AuthState;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  
  // Profile Management;
  profileData: ReturnType<typeof useProfileData> | null;
  
  // Campus Verification;
  isUBStudent: boolean;
  campusId: 'ub-buffalo';
  
  // Connection Status;
  isOnline: boolean;
  isConnected: boolean;}

// Create Context;
const FirebaseContext = createContext<FirebaseContextValue | undefined>(undefined);

// Firebase Provider Props;
interface FirebaseProviderProps {children: ReactNode;
  enableMockAuth?: boolean; // For development/testing;}

// Firebase Provider Component;
export function FirebaseProvider({ 
  children, 
  enableMockAuth = true;
}: FirebaseProviderProps) {
  // Authentication State;
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null;
  });

  // Connection State;
  const [isOnline, setIsOnline] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  // Profile Data Hook (only if user is authenticated)
  const profileData = auth.user ? useProfileData(auth.user.uid) : null;

  // Campus Verification;
  const isUBStudent = auth.user?.email?.endsWith('@buffalo.edu') || false;
  const campusId = 'ub-buffalo' as const;

  // Initialize Authentication Listener;
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (enableMockAuth) {
      // Mock authentication for development;
      console.log('Initializing mock authentication');
      
      // Simulate authentication check;
      setTimeout(() => {
        const mockUser: FirebaseUser = {
          uid: 'mock-user-123',
          email: 'student@buffalo.edu',
          displayName: 'Mock Student',
          photoURL: null,
          emailVerified: true;
        };

        setAuth(prev => ({
          ...prev,
          user: mockUser,
          loading: false;
        }))
      }, 1000)
    } else {
      // Real Firebase Auth integration;
      console.log('Initializing Firebase Auth');
      
      // In production, set up Firebase Auth listener:
      // unsubscribe = auth.onAuthStateChanged((user) => {
      //   if (user && user.email?.endsWith('@buffalo.edu')) {
      //     setAuth(prev => ({
      //       ...prev,
      //       user: {
      //         uid: user.uid,
      //         email: user.email,
      //         displayName: user.displayName,
      //         photoURL: user.photoURL,
      //         emailVerified: user.emailVerified;
      //       },
      //       loading: false;
      //     }));
      //   } else {
      //     setAuth(prev => ({
      //       ...prev,
      //       user: null,
      //       profile: null,
      //       loading: false;
      //     }));
      //   }
      // })
    }

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }}
    }
  }, [enableMockAuth]);

  // Update profile in auth state when profile data changes;
  useEffect(() => {
    if (profileData?.profile) {
      setAuth(prev => ({
        ...prev,
        profile: profileData.profile;
      }));
    }
  }, [profileData?.profile]);

  // Network Status Monitoring;
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline)
    }}
  }, []);

  // Authentication Methods;
  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!email.endsWith('@buffalo.edu')) {
      throw new Error('Only University at Buffalo email addresses are allowed')
    }
}
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      if (enableMockAuth) {
        // Mock sign in;
        console.log('Mock sign in:', email);
        setTimeout(() => {
          const mockUser: FirebaseUser = {
            uid: `user-${Date.now()}`,
            email,
            displayName: email.split('@')[0],
            photoURL: null,
            emailVerified: true;
          };
          setAuth(prev => ({ ...prev, user: mockUser, loading: false }))
        }, 1000)
      } else {
        // Real Firebase Auth;
        // const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // User state will be updated by the auth listener;
      }
    } catch (error: any) {
      setAuth(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Sign in failed'
      }));
      throw error;
    }
  }, [enableMockAuth]);

  const signUpWithEmail = useCallback(async (email: string, password: string, displayName: string) => {
    if (!email.endsWith('@buffalo.edu')) {
      throw new Error('Only University at Buffalo email addresses are allowed')
    }
}
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      if (enableMockAuth) {
        // Mock sign up;
        console.log('Mock sign up:', email, displayName);
        setTimeout(() => {
          const mockUser: FirebaseUser = {
            uid: `user-${Date.now()}`,
            email,
            displayName,
            photoURL: null,
            emailVerified: false;
          };
          setAuth(prev => ({ ...prev, user: mockUser, loading: false }))
        }, 1000)
      } else {
        // Real Firebase Auth;
        // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // await updateProfile(userCredential.user, { displayName });
        // User state will be updated by the auth listener;
      }
    } catch (error: any) {
      setAuth(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Sign up failed'
      }));
      throw error;
    }
  }, [enableMockAuth]);

  const signInWithMagicLink = useCallback(async (email: string) => {
    if (!email.endsWith('@buffalo.edu')) {
      throw new Error('Only University at Buffalo email addresses are allowed')
    }
}
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      if (enableMockAuth) {
        // Mock magic link;
        console.log('Mock magic link sent to:', email);
        setAuth(prev => ({ ...prev, loading: false }))
      } else {
        // Real Firebase Auth;
        // const actionCodeSettings = {
        //   url: `${window.location.origin}/auth/verify`,
        //   handleCodeInApp: true;
        // };
        // await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        setAuth(prev => ({ ...prev, loading: false }))
      }
    } catch (error: any) {
      setAuth(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Magic link failed'
      }));
      throw error;
    }
  }, [enableMockAuth]);

  const signOut = useCallback(async () => {
    try {
      setAuth(prev => ({ ...prev, loading: true, error: null }));
      
      if (enableMockAuth) {
        // Mock sign out;
        console.log('Mock sign out');
        setAuth({user: null,
          profile: null,
          loading: false,
          error: null;)}
      } else {
        // Real Firebase Auth;
        // await firebaseSignOut(auth);
        // User state will be updated by the auth listener;
      }
      
      // Clean up Firebase services;
      profileFirebaseService.cleanup()
    } catch (error: any) {
      setAuth(prev => ({ 
        ...prev, 
        loading: false, 
        error: error.message || 'Sign out failed'
      }));
      throw error;
    }
  }, [enableMockAuth]);

  // Context Value;
  const contextValue: FirebaseContextValue = {
    auth,
    signInWithEmail,
    signUpWithEmail,
    signInWithMagicLink,
    signOut,
    profileData,
    isUBStudent,
    campusId,
    isOnline,
    isConnected;
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  )
}

// Custom Hook to use Firebase Context;
export function useFirebase(): FirebaseContextValue {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider')
  }
  return context;
}

// Auth Guard Hook;
export function useAuthGuard(redirectTo: string = '/auth/login') {
  const { auth } = useFirebase();
  
  useEffect(() => {
    if (!auth.loading && !auth.user) {
      // In a real app, this would handle navigation;
      console.log(`Redirecting to ${redirectTo} - user not authenticated`)
    }
  }, [auth.loading, auth.user, redirectTo]);

  return {
    isAuthenticated: !!auth.user,
    isLoading: auth.loading,
    user: auth.user,
    profile: auth.profile;
  }
}

// UB Student Guard Hook;
export function useUBStudentGuard() {
  const { auth, isUBStudent } = useFirebase();
  
  useEffect(() => {
    if (!auth.loading && auth.user && !isUBStudent) {
      console.log('Access denied - not a UB student');
      // In a real app, this would redirect to an error page;
    }}
  }, [auth.loading, auth.user, isUBStudent]);

  return {
    isUBStudent,
    isLoading: auth.loading,
    hasAccess: isUBStudent;
  }
}

// Connection Status Hook;
export function useConnectionStatus() {
  const { isOnline, isConnected } = useFirebase();
  
  return {
    isOnline,
    isConnected,
    canSync: isOnline && isConnected,
    status: isOnline && isConnected ? 'connected' : isOnline ? 'online' : 'offline'
  }
}

// Profile Completion Hook;
export function useProfileCompletion() {
  const { auth, profileData } = useFirebase();
  
  const completionPercentage = auth.profile?.metadata?.profileCompleteness || 0;
  const isComplete = completionPercentage >= 90;
  
  const missingFields = [];
  if (!auth.profile?.bio) missingFields.push('bio');
  if (!auth.profile?.profilePhotoURL) missingFields.push('profile photo');
  if (!auth.profile?.academicInfo?.housing) missingFields.push('housing');
  
  return {
    completionPercentage,
    isComplete,
    missingFields,
    canUseAdvancedFeatures: isComplete;
  }
}

// Export types for external use;
export type { FirebaseUser, AuthState, FirebaseContextValue };