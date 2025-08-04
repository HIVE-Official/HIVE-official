"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * Root page - Clean authentication router (no longer tries to be dashboard)
 * Handles routing logic: unauthenticated → schools, authenticated → profile (command center)
 */
export default function RootPage() {
  const router = useRouter();
  const [_isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Force dev mode for testing - check both server and client
  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    // FORCE DEV MODE - immediate redirect (only on client side to avoid hydration mismatch)
    if (typeof window !== 'undefined' && isDev) {
      router.replace('/profile');
      return;
    }
    
    const checkAuthAndRedirect = () => {
      try {
        // Check if we're in the browser
        if (typeof window === 'undefined') {
          setIsCheckingAuth(false);
          return;
        }

        // DEVELOPMENT MODE: Immediately redirect to profile
        if (isDev) {
          console.log('🛠️ Dev mode: Immediately redirecting to profile');
          
          // Create dev session
          const devSession = {
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
          
          window.localStorage.setItem('hive_session', JSON.stringify(devSession));
          window.localStorage.setItem('dev_auth_mode', 'true');
          
          router.replace('/profile');
          return;
        }

        const sessionData = window.localStorage.getItem('hive_session');
        
        if (!sessionData) {
          // No session, redirect to schools selection (start of Flow 1)
          router.push('/schools');
          return;
        }

        const session = JSON.parse(sessionData);
        
        // Check if session is valid (not expired)
        const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge > maxAge) {
          // Session expired, clear and redirect to schools
          window.localStorage.removeItem('hive_session');
          window.localStorage.removeItem('dev_auth_mode');
          router.push('/schools');
          return;
        }

        // Valid session exists - check onboarding status
        if (isDev) {
          // In dev mode, redirect to profile (command center)
          console.log('🛠️ Dev mode: Redirecting to profile');
          router.replace('/profile');
          return;
        }

        const devAuth = window.localStorage.getItem('dev_auth_mode');
        const onboardingCompleted = session.onboardingCompleted || 
          (devAuth === 'true' && !!session.profileData?.fullName);
          
        if (!onboardingCompleted) {
          // User needs to complete onboarding
          console.log('🔄 Redirecting to onboarding');
          router.push('/onboarding');
          return;
        }

        // User is authenticated and onboarded - redirect to profile (command center)
        console.log('✅ Authenticated user, redirecting to profile');
        router.replace('/profile');
        
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear potentially corrupted data and start fresh
        window.localStorage.removeItem('hive_session');
        window.localStorage.removeItem('dev_auth_mode');
        router.push('/schools');
      }
    };

    // Small delay to ensure localStorage is available
    const timeoutId = setTimeout(checkAuthAndRedirect, 100);
    
    return () => clearTimeout(timeoutId);
  }, [router, isDev]);

  // Show loading while checking auth - no dashboard content here
  return (
    <div className="min-h-screen bg-void-900 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 text-gold-500 animate-spin mx-auto" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Welcome to HIVE</h2>
          <p className="text-neutral-400">Checking your authentication...</p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-neutral-500 mt-4">
              🛠️ Dev Mode: Clean auth routing
            </p>
          )}
        </div>
      </div>
    </div>
  );
}