"use client";

import { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export interface AuthUser {
  uid: string;
  email: string | null;
  fullName: string | null;
  onboardingCompleted: boolean;
  getIdToken: () => Promise<string>;
}

export interface UseAuthReturn {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: User | null) => {
        if (firebaseUser) {
          // In a real implementation, you'd fetch additional user data from Firestore
          // For now, we'll create a basic user object
          const authUser: AuthUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            fullName:
              firebaseUser.displayName ||
              firebaseUser.email?.split("@")[0] ||
              "User",
            onboardingCompleted: true, // Placeholder - would be fetched from user profile
            getIdToken: () => firebaseUser.getIdToken(),
          };
          setUser(authUser);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
