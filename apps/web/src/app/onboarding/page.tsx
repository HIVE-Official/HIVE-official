"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { HiveOnboardingWizard } from "./components/hive-onboarding-wizard";

export default function OnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    // Check authentication and onboarding status from session
    const checkAuthStatus = () => {
      try {
        const sessionData = window.localStorage.getItem('hive_session');
        
        if (!sessionData) {
          // No session, redirect to schools/login
          router.push("/schools");
          return;
        }

        const session = JSON.parse(sessionData);
        
        // Check if session is valid (not expired)
        const sessionAge = Date.now() - new Date(session.verifiedAt).getTime();
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (sessionAge > maxAge) {
          // Session expired, clear and redirect
          window.localStorage.removeItem('hive_session');
          window.localStorage.removeItem('dev_auth_mode');
          router.push("/schools");
          return;
        }

        setIsAuthenticated(true);
        
        // Check onboarding status with dev auth logic
        const devAuth = window.localStorage.getItem('dev_auth_mode');
        const onboardingCompleted = session.onboardingCompleted || 
          (devAuth === 'true' && !!session.profileData?.fullName);
          
        console.log('🔍 Onboarding page auth check:', {
          sessionOnboardingCompleted: session.onboardingCompleted,
          sessionNeedsOnboarding: session.needsOnboarding,
          devAuth,
          hasProfileData: !!session.profileData?.fullName,
          finalOnboardingCompleted: onboardingCompleted
        });
          
        if (onboardingCompleted) {
          console.log('🔄 Redirecting to dashboard');
          setOnboardingCompleted(true);
          router.push("/");
          return;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error checking auth status:", error);
        // Clear potentially corrupted session data
        window.localStorage.removeItem('hive_session');
        window.localStorage.removeItem('dev_auth_mode');
        router.push("/schools");
      }
    };

    checkAuthStatus();
  }, [router]);

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" />
      </div>
    );
  }

  // Show loading while redirecting if onboarding is complete
  if (onboardingCompleted) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" />
      </div>
    );
  }

  // Show loading if not authenticated (while redirecting)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" />
      </div>
    );
  }

  return <HiveOnboardingWizard />;
}
