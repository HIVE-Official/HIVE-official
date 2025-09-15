'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithCustomToken,
  signOut as firebaseSignOut,
  getIdToken,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client/firebase-client';
import { logger } from '@hive/core';
import type { UserProfile } from '@/lib/firebase/collections/firebase-collections';

interface HiveUser extends Partial<UserProfile> {
  id: string;
  uid: string;
  email: string;
  emailVerified: boolean;
  token?: string;
}

interface AuthContextValue {
  // Authentication state
  user: HiveUser | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  
  // Authentication methods
  signInWithMagicLink: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  getAuthToken: () => Promise<string | null>;
  
  // Onboarding helpers
  requiresOnboarding: () => boolean;
  isOnboarding: boolean;
  completeOnboarding: (data: OnboardingData) => Promise<void>;
}

interface OnboardingData {
  fullName: string;
  handle: string;
  major: string;
  majors?: string[];
  graduationYear: number;
  userType: 'student' | 'faculty' | 'alumni';
  interests?: string[];
  goals?: string[];
  avatarUrl?: string;
  academicLevel?: string;
  builderRequestSpaces?: string[];
  consentGiven: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function FirebaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<HiveUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnboarding, setIsOnboarding] = useState(false);

  // Helper to check if onboarding is required
  const requiresOnboarding = useCallback(() => {
    return !!user && !user.onboardingCompleted;
  }, [user]);

  // Load user profile from Firestore
  const loadUserProfile = useCallback(async (firebaseUser: FirebaseUser): Promise<HiveUser | null> => {
    try {
      const profileDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (profileDoc.exists()) {
        const profileData = profileDoc.data() as UserProfile;
        const hiveUser: HiveUser = {
          ...profileData,
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email || profileData.email,
          emailVerified: firebaseUser.emailVerified
        };
        
        // Update last active timestamp
        updateDoc(doc(db, 'users', firebaseUser.uid), {
          lastActiveAt: serverTimestamp()
        }).catch(err => logger.warn('Failed to update last active', { error: err }));
        
        return hiveUser;
      } else {
        // Create basic profile if it doesn't exist
        const newUser: HiveUser = {
          id: firebaseUser.uid,
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          emailVerified: firebaseUser.emailVerified,
          onboardingCompleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          ...newUser,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastActiveAt: serverTimestamp()
        });
        
        return newUser;
      }
    } catch (err) {
      logger.error('Failed to load user profile', { error: err, uid: firebaseUser.uid });
      throw err;
    }
  }, []);

  // Set up Firebase persistence
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(err => {
      logger.error('Failed to set auth persistence', { error: err });
    });
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        setError(null);
        
        if (firebaseUser) {
          logger.info('Auth state changed: User signed in', { 
            uid: firebaseUser.uid,
            email: firebaseUser.email 
          });
          
          setFirebaseUser(firebaseUser);
          
          // Load user profile
          const profile = await loadUserProfile(firebaseUser);
          setUser(profile);
          
          logger.info('User profile loaded', { 
            uid: firebaseUser.uid,
            onboardingCompleted: profile?.onboardingCompleted 
          });
        } else {
          logger.info('Auth state changed: No user');
          setFirebaseUser(null);
          setUser(null);
        }
      } catch (err) {
        logger.error('Error handling auth state change', { error: err });
        setError(err instanceof Error ? err.message : 'Authentication error');
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [loadUserProfile]);

  // Sign in with magic link custom token
  const signInWithMagicLink = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      logger.info('Signing in with custom token');
      const credential = await signInWithCustomToken(auth, token);
      logger.info('Sign in successful', { uid: credential.user.uid });
      
      // Profile will be loaded by auth state listener
    } catch (err) {
      logger.error('Sign in failed', { error: err });
      setError(err instanceof Error ? err.message : 'Sign in failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await firebaseSignOut(auth);
      logger.info('User signed out');
    } catch (err) {
      logger.error('Sign out failed', { error: err });
      setError(err instanceof Error ? err.message : 'Sign out failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh user profile from Firestore
  const refreshProfile = useCallback(async () => {
    if (!firebaseUser) return;
    
    try {
      const profile = await loadUserProfile(firebaseUser);
      setUser(profile);
      logger.info('Profile refreshed', { uid: firebaseUser.uid });
    } catch (err) {
      logger.error('Failed to refresh profile', { error: err });
      setError(err instanceof Error ? err.message : 'Failed to refresh profile');
    }
  }, [firebaseUser, loadUserProfile]);

  // Update user profile
  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!firebaseUser) throw new Error('User not authenticated');
    
    try {
      const updatedData = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      await updateDoc(doc(db, 'users', firebaseUser.uid), updatedData);
      await refreshProfile();
      logger.info('Profile updated', { uid: firebaseUser.uid, updates });
    } catch (err) {
      logger.error('Failed to update profile', { error: err });
      throw err;
    }
  }, [firebaseUser, refreshProfile]);

  // Complete onboarding
  const completeOnboarding = useCallback(async (data: OnboardingData) => {
    if (!firebaseUser) throw new Error('User not authenticated');
    
    try {
      setIsOnboarding(true);
      setError(null);
      
      // Get the ID token for API authentication
      const idToken = await getIdToken(firebaseUser);
      
      // Call the complete onboarding API
      const response = await fetch('/api/auth/complete-onboarding', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Onboarding failed');
      }
      
      const result = await response.json();
      logger.info('Onboarding completed successfully', { uid: firebaseUser.uid });
      
      // Refresh profile to get updated data
      await refreshProfile();
      
      return result;
    } catch (err) {
      logger.error('Onboarding failed', { error: err });
      setError(err instanceof Error ? err.message : 'Onboarding failed');
      throw err;
    } finally {
      setIsOnboarding(false);
    }
  }, [firebaseUser, refreshProfile]);

  // Get current auth token
  const getAuthToken = useCallback(async (): Promise<string | null> => {
    if (!firebaseUser) return null;
    
    try {
      return await getIdToken(firebaseUser);
    } catch (err) {
      logger.error('Failed to get auth token', { error: err });
      return null;
    }
  }, [firebaseUser]);

  const value: AuthContextValue = {
    user,
    firebaseUser,
    isLoading,
    isAuthenticated: !!user,
    error,
    signInWithMagicLink,
    signOut,
    refreshProfile,
    updateProfile,
    getAuthToken,
    requiresOnboarding,
    isOnboarding,
    completeOnboarding
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useFirebaseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useFirebaseAuth must be used within a FirebaseAuthProvider');
  }
  return context;
}

// Compatibility hook for components using useUnifiedAuth
export function useUnifiedAuth() {
  return useFirebaseAuth();
}