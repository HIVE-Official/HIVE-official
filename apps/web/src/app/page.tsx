"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * Root page that handles authentication routing and serves as authenticated dashboard
 * This implements the Flow 1 routing logic and serves as the main dashboard when authenticated
 */
export default function RootPage() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [shouldShowDashboard, setShouldShowDashboard] = useState(false);

  useEffect(() => {
    // Check if user has a session and handle routing
    const checkAuthAndRedirect = () => {
      try {
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

        // Valid session exists - check onboarding status with dev auth logic
        const devAuth = window.localStorage.getItem('dev_auth_mode');
        const onboardingCompleted = session.onboardingCompleted || 
          (devAuth === 'true' && !!session.profileData?.fullName);
          
        console.log('🔍 Root page auth check:', {
          sessionOnboardingCompleted: session.onboardingCompleted,
          sessionNeedsOnboarding: session.needsOnboarding,
          devAuth,
          hasProfileData: !!session.profileData?.fullName,
          finalOnboardingCompleted: onboardingCompleted
        });
          
        if (!onboardingCompleted) {
          // User needs to complete onboarding
          console.log('🔄 Redirecting to onboarding');
          router.push('/onboarding');
          return;
        }

        // User is authenticated and onboarded - show dashboard
        setIsCheckingAuth(false);
        setShouldShowDashboard(true);
        
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
  }, [router]);

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-hive-background-primary text-hive-text-primary flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 text-hive-brand-primary animate-spin mx-auto" />
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Welcome to HIVE</h2>
            <p className="text-hive-text-secondary">Checking your authentication status...</p>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-xs text-hive-text-muted mt-4">
                🛠️ Dev Mode: Testing Flow 1 routing logic
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, import and show the dashboard
  if (shouldShowDashboard) {
    // Dynamic import to avoid circular dependency
    const DashboardPage = require('./(dashboard)/page').default;
    const DashboardLayout = require('./(dashboard)/layout').default;
    
    return (
      <DashboardLayout>
        <DashboardPage />
      </DashboardLayout>
    );
  }

  // Fallback - should not reach here due to redirects above
  return (
    <div className="min-h-screen bg-hive-background-primary text-hive-text-primary flex items-center justify-center">
      <div className="text-center">
        <p className="text-hive-text-secondary">Redirecting...</p>
      </div>
    </div>
  );
}