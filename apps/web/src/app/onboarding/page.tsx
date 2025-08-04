"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useUnifiedAuth } from "@hive/ui";
import { useOnboardingBridge } from "@/components/temp-stubs";
import type { OnboardingData } from "@hive/ui";

// Dynamic import for heavy onboarding wizard
const HiveOnboardingWizard = dynamic(
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
  const unifiedAuth = useUnifiedAuth();
  const onboardingBridge = useOnboardingBridge();
  const [isCreatingSpaces, setIsCreatingSpaces] = useState(false);

  // Handle onboarding completion with auto-space creation
  const handleOnboardingComplete = async (onboardingData: OnboardingData) => {
    if (!unifiedAuth.isAuthenticated || !unifiedAuth.user) {
      console.error('No authenticated user for onboarding completion');
      return;
    }

    try {
      setIsCreatingSpaces(true);
      
      // Complete onboarding through the bridge
      const result = await onboardingBridge.completeOnboarding(onboardingData);
      
      if (!result.success) {
        throw new Error(result.error || 'Onboarding completion failed');
      }
      
      console.log('🏗️ Onboarding completed:', {
        user: result.user,
        builderRequestsCreated: result.builderRequestsCreated
      });
      
      // Auto-create spaces after onboarding
      const spaceResults = await onboardingBridge.createPostOnboardingSpaces(onboardingData);
      console.log('🏗️ Post-onboarding spaces:', spaceResults);
      
      // Redirect to dashboard
      router.push('/');
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Still redirect to dashboard even if space creation fails
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
  const unifiedAuth = useUnifiedAuth();
  const onboardingBridge = useOnboardingBridge();

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
