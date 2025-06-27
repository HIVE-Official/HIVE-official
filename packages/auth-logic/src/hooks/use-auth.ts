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
import type { AuthUser, AuthContextType, UseAuthReturn } from "../types";
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signInWithCustomToken = async (token: string) => {
    if (!auth) throw new Error("Firebase auth not initialized");
    await firebaseSignInWithCustomToken(auth, token);
  };

  useEffect(() => {
    // Check for development mode without Firebase
    if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      logger.warn('🔥 Firebase not configured - using mock auth for development');
      setUser(mockUser);
      setIsLoading(false);
      return () => {};
    }

    // Production mode with Firebase
    if (!auth) {
      setIsLoading(false);
      return () => {};
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // In a real implementation, you'd fetch additional user data from Firestore
        const idTokenResult = await firebaseUser.getIdTokenResult();
        const onboardingCompleted = !!idTokenResult.claims.onboardingCompleted;

        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          fullName:
            firebaseUser.displayName ||
            firebaseUser.email?.split("@")[0] ||
            "User",
          onboardingCompleted,
          emailVerified: firebaseUser.emailVerified || false,
          customClaims: idTokenResult.claims || {},
          getIdToken: () => firebaseUser.getIdToken(),
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInWithCustomToken,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): UseAuthReturn {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
