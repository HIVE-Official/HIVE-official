"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import nextDynamic from "next/dynamic";
import { useAuth } from "@hive/auth-logic";
// TEMPORARY: Using local implementation due to export resolution issue
import { useOnboardingBridge, type OnboardingData } from "@/lib/onboarding-bridge-temp";

// Dynamic import for heavy onboarding wizard
const HiveOnboardingWizard = nextDynamic(
  () => import("./components/hive-onboarding-wizard").then(mod => ({ default: mod.HiveOnboardingWizard })),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--hive-brand-primary)]" />
      </div>
    ),
    ssr: false
  }
);

// Enhanced onboarding wrapper with unified auth integration
function OnboardingWizardWrapper() {
  const router = useRouter();
  const unifiedAuth = useAuth();
  const onboardingBridge = useOnboardingBridge();
  const [isCreatingSpaces, setIsCreatingSpaces] = useState(false);

  // Handle onboarding completion with auto-space creation
  const _handleOnboardingComplete = async (onboardingData: OnboardingData, retryCount = 0) => {
    if (!unifiedAuth.isAuthenticated || !unifiedAuth.user) {
      return;
    }

    try {
      setIsCreatingSpaces(true);
      
      // Complete onboarding through the bridge
      const result = await onboardingBridge.completeOnboarding(onboardingData);
      
      if (!result.success) {
        throw new Error(result.error || 'Onboarding completion failed');
      }
      
      // Auto-create spaces after onboarding (non-blocking)
      try {
        const _spaceResults = await onboardingBridge.createPostOnboardingSpaces(onboardingData);
      } catch (spaceError) {
      // Intentionally suppressed - non-critical error
    }
      
      // Redirect to dashboard
      router.push('/');
      
    } catch (error) {
      
      // Retry mechanism for network errors
      if (retryCount < 2 && error instanceof Error && 
          (error.message.includes('network') || error.message.includes('timeout'))) {
        setTimeout(() => {
          _handleOnboardingComplete(onboardingData, retryCount + 1);
        }, 2000);
        return;
      }
      
      // For auth errors, redirect to login
      if (error instanceof Error && 
          (error.message.includes('authentication') || error.message.includes('token'))) {
        router.push('/schools');
        return;
      }
      
      // For other errors, still try to redirect to dashboard
      router.push('/');
    } finally {
      setIsCreatingSpaces(false);
    }
  };

  if (isCreatingSpaces) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" />
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">Setting up your spaces...</h2>
          <p className="text-[var(--hive-text-muted)]">Creating your personalized campus communities</p>
        </div>
      </div>
    );
  }

  return <HiveOnboardingWizard />;
}

export default function OnboardingPage() {
  const router = useRouter();
  const unifiedAuth = useAuth();
  const _onboardingBridge = useOnboardingBridge();

  // Handle authentication and onboarding status
  useEffect(() => {
    if (!unifiedAuth.isLoading) {
      if (!unifiedAuth.isAuthenticated) {
        // User is not authenticated, redirect to schools
        router.push("/schools");
        return;
      }

      if (unifiedAuth.user?.onboardingCompleted) {
        // User has already completed onboarding, redirect to dashboard
        router.push("/");
        return;
      }
    }
  }, [
    unifiedAuth.isLoading, 
    unifiedAuth.isAuthenticated, 
    unifiedAuth.user?.onboardingCompleted, 
    router
  ]);

  // Show loading while auth is initializing or if redirecting
  if (unifiedAuth.isLoading || 
      !unifiedAuth.isAuthenticated || 
      unifiedAuth.user?.onboardingCompleted) {
    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[var(--hive-brand-primary)] animate-spin" />
      </div>
    );
  }

  // Show onboarding wizard for authenticated users who need onboarding
  return <OnboardingWizardWrapper />;
}
