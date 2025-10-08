"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  userId: string;
  email: string;
  schoolId?: string;
  onboardingCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: () => {},
});

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for session in localStorage or cookie
    const checkSession = () => {
      // First check localStorage
      const sessionJson = window.localStorage.getItem('hive_session');
      if (sessionJson) {
        try {
          const sessionData = JSON.parse(sessionJson);
          // Verify session is not expired (24 hours)
          const sessionAge = Date.now() - new Date(sessionData.verifiedAt).getTime();
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours

          if (sessionAge <= maxAge) {
            setUser({
              userId: sessionData.userId,
              email: sessionData.email,
              schoolId: sessionData.schoolId,
              onboardingCompleted: sessionData.onboardingCompleted
            });
            setIsLoading(false);
            return;
          } else {
            // Session expired
            window.localStorage.removeItem('hive_session');
          }
        } catch (error) {
          window.localStorage.removeItem('hive_session');
        }
      }

      // Check for development mode authentication
      const devAuthMode = window.localStorage.getItem('dev_auth_mode');
      const devUserData = window.localStorage.getItem('dev_user');

      if (devAuthMode === 'true' && devUserData) {
        try {
          const devUser = JSON.parse(devUserData);
          setUser({
            userId: devUser.id || devUser.id,
            email: devUser.email,
            schoolId: devUser.schoolId,
            onboardingCompleted: devUser.onboardingCompleted
          });
          setIsLoading(false);
          return;
        } catch (error) {
      // Intentionally suppressed - non-critical error
    }
      }

      // No valid session found
      setUser(null);

      setIsLoading(false);
    };

    checkSession();
    // Re-check on storage events (for cross-tab sync)
    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  }, []);

  // Handle route protection
  useEffect(() => {
    if (!isLoading) {
      const publicPaths = ['/landing', '/schools', '/auth/login', '/auth/verify', '/debug-auth', '/waitlist', '/signin'];
      const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

      if (!user && !isPublicPath) {
        // Not authenticated and trying to access protected route
        router.push('/landing');
      } else if (user && !user.onboardingCompleted && pathname !== '/onboarding' && !isPublicPath) {
        // Authenticated but needs onboarding (except on public/auth pages)
        router.push('/onboarding');
      }
    }
  }, [isLoading, user, pathname, router]);

  const signOut = () => {
    window.localStorage.removeItem('hive_session');
    window.localStorage.removeItem('emailForSignIn');
    window.localStorage.removeItem('dev_auth_mode');
    window.localStorage.removeItem('dev_user');
    setUser(null);
    router.push('/landing');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSimpleAuth() {
  return useContext(AuthContext);
}