"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signInWithCustomToken as firebaseSignInWithCustomToken } from "firebase/auth";
import type { AuthUser, AuthContextType, DevModeConfig } from "../types";
import { logger } from "@hive/core";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const mockUser: AuthUser = {
  uid: 'mock-uid',
  email: 'dev@buffalo.edu',
  fullName: 'Dev User',
  onboardingCompleted: false,
  emailVerified: true,
  customClaims: {
    isBuilder: true,
  },
  getIdToken: () => Promise.resolve('mock-token'),
};

const defaultDevConfig: DevModeConfig = {
  enabled: !process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  mockUser,
  skipOnboarding: false,
  simulateErrors: {
    auth: false,
    onboarding: false,
    network: false,
  },
  delayMs: 1000,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [devMode, setDevMode] = useState<DevModeConfig>(defaultDevConfig);

  const signInWithCustomToken = async (token: string) => {
    if (!auth) throw new Error("Firebase auth not initialized");
    await firebaseSignInWithCustomToken(auth, token);
  };

  // Dev mode controls
  const setDevModeConfig = (config: Partial<DevModeConfig>) => {
    if (process.env.NODE_ENV === 'production') {
      logger.warn('Dev mode controls attempted in production');
      return;
    }
    setDevMode(prev => ({ ...prev, ...config }));
  };

  useEffect(() => {
    // Dev mode handling
    if (devMode.enabled) {
      const simulateDevMode = async () => {
        await new Promise(resolve => setTimeout(resolve, devMode.delayMs));
        
        if (devMode.simulateErrors.network) {
          logger.error('🔥 Dev mode: Simulating network error');
          setUser(null);
          setIsLoading(false);
          return;
        }

        if (devMode.simulateErrors.auth) {
          logger.error('🔥 Dev mode: Simulating auth error');
          setUser(null);
          setIsLoading(false);
          return;
        }

        if (devMode.simulateErrors.onboarding) {
          logger.error('🔥 Dev mode: Simulating onboarding error');
          const errorUser = { ...devMode.mockUser, onboardingCompleted: false };
          setUser(errorUser);
          setIsLoading(false);
          return;
        }

        logger.info('🔥 Dev mode: Using mock user');
        const mockUserWithOnboarding = {
          ...devMode.mockUser,
          onboardingCompleted: devMode.skipOnboarding,
        };
        setUser(mockUserWithOnboarding);
        setIsLoading(false);
      };

      void simulateDevMode();
      return;
    }

    // Production auth handling
    if (!auth) {
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idTokenResult = await firebaseUser.getIdTokenResult();
        const onboardingCompleted = !!idTokenResult.claims.onboardingCompleted;
        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "User",
          onboardingCompleted,
          emailVerified: firebaseUser.emailVerified,
          customClaims: idTokenResult.claims,
          getIdToken: () => firebaseUser.getIdToken(),
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [devMode]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInWithCustomToken,
    devMode: process.env.NODE_ENV !== 'production' ? devMode : undefined,
    setDevModeConfig: process.env.NODE_ENV !== 'production' ? setDevModeConfig : undefined,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
