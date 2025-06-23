"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import type { ReactNode } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export interface AuthUser {
  uid: string;
  email: string | null;
  fullName: string | null;
  onboardingCompleted: boolean;
  getIdToken: () => Promise<string>;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
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
          getIdToken: () => firebaseUser.getIdToken(),
        };
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
