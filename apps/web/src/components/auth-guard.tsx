"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

interface SessionData {
  userId: string;
  email: string;
  schoolId: string;
  needsOnboarding?: boolean;
  onboardingCompleted?: boolean;
  verifiedAt: string;
  profileData?: {
    fullName: string;
    handle: string;
    major: string;
    avatarUrl: string;
    builderOptIn: boolean;
  };
}

/**
 * Authentication guard that protects routes and handles authentication redirects.
 * Uses session-based authentication with localStorage.
 */
export function AuthGuard({ 
  children, 
  requireAuth = true,
  redirectTo = '/schools' 
}: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const sessionJson = window.localStorage.getItem('hive_session');
        
        if (!sessionJson) {
          setIsAuthenticated(false);
          setSessionData(null);
          setIsLoading(false);
          return;
        }

        const session: SessionData = JSON.parse(sessionJson);
        
        // Check if session is expired (24 hours)
        const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge > maxAge) {
          // Session expired, clear it
          window.localStorage.removeItem('hive_session');
          window.localStorage.removeItem('dev_auth_mode');
          setIsAuthenticated(false);
          setSessionData(null);
          setIsLoading(false);
          return;
        }

        // Session is valid
        setIsAuthenticated(true);
        setSessionData(session);
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear potentially corrupted session
        window.localStorage.removeItem('hive_session');
        window.localStorage.removeItem('dev_auth_mode');
        setIsAuthenticated(false);
        setSessionData(null);
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    // Don't redirect while auth is loading
    if (isLoading) return;

    // If auth is required but user is not authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
      // Store the intended destination for post-login redirect
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // If user is authenticated but hasn't completed onboarding, redirect to onboarding
    if (isAuthenticated && sessionData && !sessionData.onboardingCompleted) {
      // Allow access to onboarding pages
      if (pathname.startsWith('/onboarding')) return;
      
      router.push('/onboarding');
      return;
    }

    // If user is authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && (pathname.startsWith('/auth') || pathname.startsWith('/schools'))) {
      router.push('/');
      return;
    }
  }, [isLoading, isAuthenticated, sessionData, pathname, requireAuth, redirectTo, router]);

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-[var(--hive-text-primary)]">
          <div className="w-6 h-6 bg-[var(--hive-brand-primary)] rounded-lg animate-pulse" />
          <span className="font-medium">Loading HIVE...</span>
        </div>
      </div>
    );
  }

  // For protected routes, only render if authenticated
  if (requireAuth && !isAuthenticated) {
    return null; // Redirect is handled in useEffect
  }

  return <>{children}</>;
}