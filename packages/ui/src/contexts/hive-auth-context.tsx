"use client";

/**
 * HIVE Firebase Auth Context - Clean, Production-Ready Implementation
 * 
 * Replaces the broken UnifiedAuth system with a single, reliable auth provider
 * Built on Firebase Auth with proper error handling and state management
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  connectAuthEmulator 
} from 'firebase/auth';
import { auth } from '../firebase/client-config';

// HIVE User Interface - matches existing onboarding expectations
export interface HiveUser {
  id: string;
  uid: string; // Firebase UID
  email: string;
  emailVerified: boolean;
  fullName?: string;
  handle?: string;
  major?: string;
  academicLevel?: string;
  graduationYear?: number;
  avatarUrl?: string;
  schoolId?: string;
  userType?: 'student' | 'alumni' | 'faculty';
  onboardingCompleted: boolean;
  builderOptIn?: boolean;
  
  // System flags
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Auth State
export interface HiveAuthState {
  user: HiveUser | null;
  firebaseUser: FirebaseUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

// Auth Context Interface
export interface HiveAuthContextType extends HiveAuthState {
  // Authentication Methods
  sendMagicLink: (email: string, schoolId: string) => Promise<void>;
  completeOnboarding: (onboardingData: any) => Promise<any>;
  refreshUserData: () => Promise<void>;
  logout: () => Promise<void>;
  
  // Utilities
  requiresOnboarding: () => boolean;
  getAuthToken: () => Promise<string | null>;
  clearError: () => void;
  
  // Development (only in development)
  devLogin?: (userType?: 'student' | 'faculty' | 'admin') => Promise<void>;
}

const HiveAuthContext = createContext<HiveAuthContextType | null>(null);

// Hook for consuming auth context
export const useHiveAuth = () => {
  const context = useContext(HiveAuthContext);
  if (!context) {
    throw new Error('useHiveAuth must be used within a HiveAuthProvider');
  }
  return context;
};

// Development mode detection
const isDevelopment = process.env.NODE_ENV === 'development';

// Development users for local testing
const DEV_USERS = {
  student: {
    email: 'student@test.edu',
    fullName: 'Dev Student',
    handle: 'devstudent',
    major: 'Computer Science',
    userType: 'student' as const,
    graduationYear: 2025,
    onboardingCompleted: true,
  },
  faculty: {
    email: 'faculty@test.edu', 
    fullName: 'Dev Faculty',
    handle: 'devfaculty',
    major: 'Computer Science',
    userType: 'faculty' as const,
    graduationYear: 2020,
    onboardingCompleted: true,
  },
  admin: {
    email: 'admin@test.edu',
    fullName: 'Dev Admin', 
    handle: 'devadmin',
    major: 'Administration',
    userType: 'faculty' as const,
    graduationYear: 2020,
    onboardingCompleted: true,
    isAdmin: true,
  }
};

interface HiveAuthProviderProps {
  children: React.ReactNode;
}

export const HiveAuthProvider: React.FC<HiveAuthProviderProps> = ({ children }) => {
  // Auth State
  const [authState, setAuthState] = useState<HiveAuthState>({
    user: null,
    firebaseUser: null, 
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Update auth state helper
  const updateAuthState = useCallback((updates: Partial<HiveAuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }));
  }, []);

  // Get Firebase ID Token
  const getAuthToken = useCallback(async (): Promise<string | null> => {
    if (!authState.firebaseUser) return null;
    
    try {
      return await authState.firebaseUser.getIdToken();
    } catch (error) {
      console.error('Failed to get Firebase ID token:', error);
      return null;
    }
  }, [authState.firebaseUser]);

  // Fetch user data from Firestore
  const fetchUserData = useCallback(async (firebaseUser: FirebaseUser): Promise<HiveUser | null> => {
    try {
      const token = await firebaseUser.getIdToken();
      
      const response = await fetch('/api/profile/route', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // User doesn't exist in Firestore yet - new user
          return {
            id: firebaseUser.uid,
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            emailVerified: firebaseUser.emailVerified,
            onboardingCompleted: false,
            createdAt: new Date().toISOString(),
          };
        }
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const userData = await response.json();
      return {
        id: userData.id || firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        emailVerified: firebaseUser.emailVerified,
        fullName: userData.fullName,
        handle: userData.handle,
        major: userData.major,
        academicLevel: userData.academicLevel,
        graduationYear: userData.graduationYear,
        avatarUrl: userData.avatarUrl,
        schoolId: userData.schoolId,
        userType: userData.userType,
        onboardingCompleted: userData.onboardingCompleted || false,
        builderOptIn: userData.builderOptIn,
        isAdmin: userData.isAdmin,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      };
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  }, []);

  // Refresh user data from backend
  const refreshUserData = useCallback(async () => {
    if (!authState.firebaseUser) return;
    
    const userData = await fetchUserData(authState.firebaseUser);
    if (userData) {
      updateAuthState({ user: userData });
    }
  }, [authState.firebaseUser, fetchUserData, updateAuthState]);

  // Send magic link
  const sendMagicLink = useCallback(async (email: string, schoolId: string) => {
    try {
      updateAuthState({ isLoading: true, error: null });

      const response = await fetch('/api/auth/send-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, schoolId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send magic link');
      }

      updateAuthState({ isLoading: false });
    } catch (error) {
      updateAuthState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send magic link',
      });
      throw error;
    }
  }, [updateAuthState]);

  // Complete onboarding
  const completeOnboarding = useCallback(async (onboardingData: any) => {
    if (!authState.firebaseUser) {
      throw new Error('No authenticated user for onboarding');
    }

    try {
      updateAuthState({ isLoading: true, error: null });

      const token = await authState.firebaseUser.getIdToken();
      
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
      
      updateAuthState({ isLoading: false });
      return result;
    } catch (error) {
      updateAuthState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Onboarding failed',
      });
      throw error;
    }
  }, [authState.firebaseUser, updateAuthState, refreshUserData]);

  // Logout
  const logout = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      // Firebase auth state change will handle cleanup
    } catch (error) {
      console.error('Logout failed:', error);
      // Force cleanup even if Firebase signout fails
      updateAuthState({
        user: null,
        firebaseUser: null,
        isAuthenticated: false,
        error: null,
      });
    }
  }, [updateAuthState]);

  // Development login (only available in development)
  const devLogin = useCallback(async (userType: 'student' | 'faculty' | 'admin' = 'student') => {
    if (!isDevelopment) {
      throw new Error('Development login only available in development mode');
    }

    try {
      updateAuthState({ isLoading: true, error: null });

      const devUser = DEV_USERS[userType];
      
      // Create mock Firebase user with proper token generation
      const mockFirebaseUser = {
        uid: `dev_${userType}_${Date.now()}`,
        email: devUser.email,
        emailVerified: true,
        getIdToken: async (forceRefresh?: boolean) => {
          // Generate a mock JWT-like token for development
          const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
          const payload = btoa(JSON.stringify({
            iss: 'https://securetoken.google.com/dev-project',
            aud: 'dev-project',
            auth_time: Math.floor(Date.now() / 1000),
            user_id: `dev_${userType}_${Date.now()}`,
            sub: `dev_${userType}_${Date.now()}`,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600,
            email: devUser.email,
            email_verified: true,
          }));
          const signature = btoa('dev-signature');
          return `${header}.${payload}.${signature}`;
        },
      } as FirebaseUser;

      const hiveUser: HiveUser = {
        ...devUser,
        id: mockFirebaseUser.uid,
        uid: mockFirebaseUser.uid,
        emailVerified: true,
        schoolId: 'buffalo', // Use consistent buffalo ID for development
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      updateAuthState({
        user: hiveUser,
        firebaseUser: mockFirebaseUser,
        isAuthenticated: true,
        isLoading: false,
      });

      console.log(`🔧 Development ${userType} login successful`);
    } catch (error) {
      updateAuthState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Development login failed',
      });
      throw error;
    }
  }, [updateAuthState]);

  // Utility functions
  const requiresOnboarding = useCallback(() => {
    return authState.isAuthenticated && !authState.user?.onboardingCompleted;
  }, [authState.isAuthenticated, authState.user?.onboardingCompleted]);

  const clearError = useCallback(() => {
    updateAuthState({ error: null });
  }, [updateAuthState]);

  // Firebase Auth State Listener
  useEffect(() => {
    // Connect to emulator in development
    if (isDevelopment && !auth.config.emulator) {
      try {
        connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
      } catch (error) {
        console.log('Firebase emulator not available:', error);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        console.log('🔥 Firebase user authenticated:', firebaseUser.email);
        
        // Fetch HIVE user data from backend
        const userData = await fetchUserData(firebaseUser);
        
        updateAuthState({
          user: userData,
          firebaseUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        console.log('🔥 No Firebase user');
        
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
  }, [fetchUserData, updateAuthState]);

  // Context value
  const contextValue: HiveAuthContextType = {
    ...authState,
    sendMagicLink,
    completeOnboarding,
    refreshUserData,
    logout,
    requiresOnboarding,
    getAuthToken,
    clearError,
    ...(isDevelopment && { devLogin }),
  };

  return (
    <HiveAuthContext.Provider value={contextValue}>
      {children}
    </HiveAuthContext.Provider>
  );
};

// Export context for advanced usage
export { HiveAuthContext };