"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// Force dev mode for testing - hardcoded override
const FORCE_DEV_MODE = true;
const skipAuthInDev = FORCE_DEV_MODE || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
const skipOnboardingInDev = FORCE_DEV_MODE || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

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
        console.log('🔍 AuthGuard checking auth status...');
        
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          setIsLoading(false);
          return;
        }
        
        // DEVELOPMENT MODE: Auto-bypass auth when flags are set
        if (skipAuthInDev && skipOnboardingInDev) {
          console.log('🛠️ Dev mode: Auto-creating dev session with completed onboarding');
          const devSession: SessionData = {
            userId: 'dev_user_123',
            email: 'dev@hive.com',
            schoolId: 'dev_school',
            needsOnboarding: false,
            onboardingCompleted: true,
            verifiedAt: new Date().toISOString(),
            profileData: {
              fullName: 'Dev User',
              handle: 'devuser',
              major: 'Computer Science',
              avatarUrl: '',
              builderOptIn: true
            }
          };
          
          // Auto-set dev session if none exists
          if (!window.localStorage.getItem('hive_session')) {
            window.localStorage.setItem('hive_session', JSON.stringify(devSession));
            window.localStorage.setItem('dev_auth_mode', 'true');
          }
          
          setIsAuthenticated(true);
          setSessionData(devSession);
          setIsLoading(false);
          return;
        }
        
        const sessionJson = window.localStorage.getItem('hive_session');
        const devAuth = window.localStorage.getItem('dev_auth_mode');
        
        console.log('🔍 SessionJson:', sessionJson ? 'found' : 'not found');
        console.log('🔍 DevAuth:', devAuth);
        
        if (!sessionJson) {
          console.log('🔍 No session found, setting unauthenticated');
          setIsAuthenticated(false);
          setSessionData(null);
          setIsLoading(false);
          return;
        }

        const session: SessionData = JSON.parse(sessionJson);
        console.log('🔍 Parsed session:', { userId: session.userId, email: session.email });
        
        // For dev auth, skip expiration check
        if (devAuth === 'true') {
          console.log('🔍 Dev auth mode, skipping expiration check');
          setIsAuthenticated(true);
          setSessionData(session);
          setIsLoading(false);
          return;
        }
        
        // Check if session is expired (24 hours)
        const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge > maxAge) {
          console.log('🔍 Session expired, clearing');
          // Session expired, clear it
          window.localStorage.removeItem('hive_session');
          window.localStorage.removeItem('dev_auth_mode');
          setIsAuthenticated(false);
          setSessionData(null);
          setIsLoading(false);
          return;
        }

        // Session is valid
        console.log('🔍 Session valid, setting authenticated');
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

    // Check auth status on mount
    checkAuthStatus();
    
    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'hive_session') {
        console.log('🔍 AuthGuard detected session change, rechecking auth');
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    console.log('🔍 AuthGuard redirect logic:', { 
      isLoading, 
      isAuthenticated, 
      requireAuth, 
      pathname,
      hasSessionData: !!sessionData,
      onboardingCompleted: sessionData?.onboardingCompleted
    });
    
    // Don't redirect while auth is loading
    if (isLoading) {
      console.log('🔍 Still loading, not redirecting');
      return;
    }

    // If auth is required but user is not authenticated, redirect to login
    if (requireAuth && !isAuthenticated) {
      console.log('🔍 Auth required but not authenticated, redirecting to:', redirectTo);
      // Store the intended destination for post-login redirect
      const returnUrl = encodeURIComponent(pathname);
      router.push(`${redirectTo}?returnUrl=${returnUrl}`);
      return;
    }

    // If user is authenticated but hasn't completed onboarding, redirect to onboarding
    if (isAuthenticated && sessionData && !sessionData.onboardingCompleted) {
      // DEV FIX: If user has profile data, consider onboarding completed
      const devAuth = typeof window !== 'undefined' ? window.localStorage.getItem('dev_auth_mode') : null;
      if (devAuth === 'true' && sessionData.profileData?.fullName) {
        console.log('🔧 Dev mode: User has profile data, treating as onboarding completed');
        // Update the session to mark onboarding as completed
        try {
          const updatedSession = { ...sessionData, onboardingCompleted: true };
          window.localStorage.setItem('hive_session', JSON.stringify(updatedSession));
          setSessionData(updatedSession);
          console.log('🔧 Updated session with onboardingCompleted: true');
          return;
        } catch (error) {
          console.error('Error updating session:', error);
        }
      }
      
      // Allow access to onboarding pages
      if (pathname.startsWith('/onboarding')) {
        console.log('🔍 Already on onboarding page');
        return;
      }
      
      console.log('🔍 Onboarding not completed, redirecting to onboarding. Session data:', {
        onboardingCompleted: sessionData.onboardingCompleted,
        hasProfileData: !!sessionData.profileData,
        userId: sessionData.userId,
        devAuth
      });
      router.push('/onboarding');
      return;
    }

    // If user is authenticated and on auth pages, redirect to dashboard
    if (isAuthenticated && (pathname.startsWith('/auth') || pathname.startsWith('/schools'))) {
      console.log('🔍 Authenticated user on auth page, redirecting to dashboard');
      router.push('/');
      return;
    }

    console.log('🔍 No redirect needed, allowing access');
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