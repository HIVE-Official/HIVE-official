"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useUnifiedAuth } from "@hive/ui";

/**
 * HIVE Onboarding Page - Updated for Firebase Auth
 * 
 * Uses the new HiveAuth context for clean authentication flow
 * Removes the temporary bridge pattern in favor of direct Firebase integration
 */

// Dynamic import for heavy onboarding wizard
const HiveOnboardingWizard = dynamic(
  () => import("./components/hive-onboarding-wizard").then(mod => ({ default: mod.HiveOnboardingWizard })),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-hive-brand-primary" />
      </div>
    ),
    ssr: false
  }
);

// Clean onboarding wrapper with HiveAuth integration
function OnboardingWizardWrapper() {
  const router = useRouter();
  const hiveAuth = useUnifiedAuth();
  const [isCompleting, setIsCompleting] = useState(false);

  // Handle onboarding completion using HiveAuth
  const handleOnboardingComplete = async (onboardingData: any) => {
    if (!hiveAuth.isAuthenticated || !hiveAuth.user) {
      console.error('No authenticated user for onboarding completion');
      throw new Error('Authentication required for onboarding completion');
    }

    try {
      setIsCompleting(true);
      
      console.log('🎓 Starting onboarding completion:', {
        userId: hiveAuth.user.id,
        email: hiveAuth.user.email
      });
      
      // Complete onboarding using HiveAuth context
      const result = await hiveAuth.completeOnboarding(onboardingData);
      
      console.log('🎉 Onboarding completed successfully:', {
        user: result.user,
        builderRequestsCreated: result.builderRequestsCreated
      });
      
      // Redirect to dashboard after completion
      router.push('/');
      
      return result;
      
    } catch (error) {
      console.error('Onboarding completion failed:', error);
      setIsCompleting(false);
      throw error;
    }
  };

  if (isCompleting) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-hive-brand-primary animate-spin" />
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Completing your setup...</h2>
          <p className="text-muted">Creating your profile and campus communities</p>
        </div>
      </div>
    );
  }

  return <HiveOnboardingWizard onComplete={handleOnboardingComplete} />;
}

export default function OnboardingPage() {
  const router = useRouter();
  const hiveAuth = useUnifiedAuth();

  // Handle authentication and onboarding status
  useEffect(() => {
    if (!hiveAuth.isLoading) {
      if (!hiveAuth.isAuthenticated) {
        // User is not authenticated, redirect to schools
        
        router.push("/schools");
        return;
      }

      if (!hiveAuth.requiresOnboarding()) {
        // User has already completed onboarding, redirect to dashboard
        
        router.push("/");
        return;
      }

      
    }
  }, [
    hiveAuth.isLoading, 
    hiveAuth.isAuthenticated, 
    hiveAuth.requiresOnboarding, 
    router
  ]);

  // Show loading while auth is initializing or if redirecting
  if (hiveAuth.isLoading || 
      !hiveAuth.isAuthenticated || 
      !hiveAuth.requiresOnboarding()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-hive-brand-primary animate-spin" />
      </div>
    );
  }

  // Show onboarding wizard for authenticated users who need onboarding
  return <OnboardingWizardWrapper />;
}