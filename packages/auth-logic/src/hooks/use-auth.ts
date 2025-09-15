"use client";

import { useState, useEffect } from "react";
import { logger } from '../logger';

import type { User } from "firebase/auth";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { handleAuthError, type AuthError } from "../error-handler";
import { SessionManager } from "../session-manager";

export interface AuthUser {
  uid: string;
  email: string | null;
  fullName: string | null;
  handle: string | null;
  bio: string | null;
  major: string | null;
  graduationYear: number | null;
  avatarUrl: string | null;
  isBuilder: boolean;
  schoolId: string | null;
  onboardingCompleted: boolean;
  getIdToken: () => Promise<string>;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: AuthError | null;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  clearDevMode?: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  const clearError = () => setError(null);

  // Development mode user management
  const checkDevUser = (): AuthUser | null => {
    if (typeof window === 'undefined') return null;
    
    const devAuthMode = window.localStorage.getItem('dev_auth_mode');
    const devUserData = window.localStorage.getItem('dev_user');
    
    if (devAuthMode === 'true' && devUserData) {
      try {
        const devUser = JSON.parse(devUserData);
        return {
          ...devUser,
          getIdToken: async () => 'dev_token_' + devUser.uid
        };
      } catch (error) {
        logger.error('Error parsing dev user data', { error });
        return null;
      }
    }
    
    return null;
  };

  // Clear development mode data
  const clearDevMode = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('dev_auth_mode');
      window.localStorage.removeItem('dev_user');
    }
  };

  const fetchUserData = async (firebaseUser: User): Promise<AuthUser> => {
    try {
      const db = getFirestore();
      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: userData.fullName || null,
          handle: userData.handle || null,
          bio: userData.bio || null,
          major: userData.major || null,
          graduationYear: userData.graduationYear || null,
          avatarUrl: userData.avatarUrl || null,
          isBuilder: userData.builderOptIn || false,
          schoolId: userData.schoolId || null,
          onboardingCompleted: !!(userData.handle && userData.fullName),
          getIdToken: () => firebaseUser.getIdToken(),
        };
      } else {
        // User document doesn't exist yet - needs onboarding
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: null,
          handle: null,
          bio: null,
          major: null,
          graduationYear: null,
          avatarUrl: null,
          isBuilder: false,
          schoolId: null,
          onboardingCompleted: false,
          getIdToken: () => firebaseUser.getIdToken(),
        };
      }
    } catch (fetchError) {
      logger.error('Error fetching user data', { error: fetchError });
      // Fallback to basic user object
      return {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        fullName: firebaseUser.displayName || null,
        handle: null,
        bio: null,
        major: null,
        graduationYear: null,
        avatarUrl: null,
        isBuilder: false,
        schoolId: null,
        onboardingCompleted: false,
        getIdToken: () => firebaseUser.getIdToken(),
      };
    }
  };

  const refreshUser = async (): Promise<void> => {
    // Check for development mode user first
    const devUser = checkDevUser();
    if (devUser) {
      setUser(devUser);
      setError(null);
      return;
    }
    
    if (!auth) return;
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        setIsLoading(true);
        const userData = await fetchUserData(currentUser);
        setUser(userData);
        setError(null);
      } catch (refreshError) {
        const authError = handleAuthError(refreshError);
        setError(authError);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const sessionManager = SessionManager.getInstance();
    
    // Check for development mode user first
    const devUser = checkDevUser();
    if (devUser) {
      setUser(devUser);
      setError(null);
      setIsLoading(false);
      
      // Listen for localStorage changes to update dev user
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'dev_user' || e.key === 'dev_auth_mode') {
          const updatedDevUser = checkDevUser();
          if (updatedDevUser) {
            setUser(updatedDevUser);
          } else {
            setUser(null);
          }
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
    
    if (!auth) {
      setIsLoading(false);
      return;
    }
    
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: User | null) => {
        try {
          if (firebaseUser) {
            // Update session management
            sessionManager.updateSession(firebaseUser);
            
            const userData = await fetchUserData(firebaseUser);
            setUser(userData);
            setError(null);
          } else {
            sessionManager.clearSession();
            setUser(null);
            setError(null);
          }
        } catch (authError) {
          logger.error('Auth state change error', { error: authError });
          const error = handleAuthError(authError);
          setError(error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    clearError,
    refreshUser,
    clearDevMode: process.env.NODE_ENV === 'development' ? clearDevMode : undefined,
  };
}
