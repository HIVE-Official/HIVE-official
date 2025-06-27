"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, mockUser } from "@hive/auth-logic";
import { logger } from "@hive/core";
import type { OnboardingData } from "@hive/core";
import { Loader2 } from "lucide-react";
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { DisplayNameAvatar } from '@/components/onboarding/steps/display-name-avatar';
import { LeaderQuestion } from '@/components/onboarding/steps/leader-question';
import { SpaceVerification } from '@/components/onboarding/steps/space-verification';
import { AcademicCard } from '@/components/onboarding/steps/academic-card';
import { Interests } from '@/components/onboarding/steps/interests';

interface OnboardingStepClientProps {
  step: keyof typeof STEPS;
}

const STEPS = {
  '1': DisplayNameAvatar,
  '2': LeaderQuestion,
  '3': SpaceVerification,
  '4': AcademicCard,
  '5': Interests,
} as const;

export function OnboardingStepClient({ step }: OnboardingStepClientProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { data: onboardingData } = useOnboardingStore();

  // Handle invalid step numbers
  if (isNaN(parseInt(step)) || parseInt(step) < 1 || parseInt(step) > Object.keys(STEPS).length) {
    router.push("/onboarding/1");
    return null;
  }

  // Skip auth check in development mode
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    const CurrentStep = STEPS[step as keyof typeof STEPS];
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <CurrentStep />
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted" />
          <p className="text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    router.push("/auth/email");
    return null;
  }

  // Validation and routing logic
  useEffect(() => {
    // If no onboarding data, start from beginning
    if (!onboardingData && step !== '1') {
      router.replace('/onboarding/1');
      return;
    }

    // Step-specific validation
    switch (step) {
      case '2':
        if (!onboardingData?.fullName || !onboardingData?.handle) {
          router.replace('/onboarding/1');
        }
        break;
      case '3':
        // Only show verification step if they are a student leader
        if (!onboardingData?.isStudentLeader) {
          router.replace('/onboarding/4');
        }
        break;
      case '4':
        if (!onboardingData?.fullName || !onboardingData?.handle) {
          router.replace('/onboarding/1');
        }
        // If they're a leader, they must have selected a space
        if (onboardingData?.isStudentLeader && !onboardingData?.spaceId) {
          router.replace('/onboarding/2');
        }
        break;
      case '5':
        if (!onboardingData?.academicLevel || !onboardingData?.majors?.length) {
          router.replace('/onboarding/4');
        }
        break;
    }
  }, [step, onboardingData, router]);

  const handleNext = async (nextStep?: number, data?: Partial<OnboardingData>) => {
    const updatedData = { ...onboardingData, ...data };
    // TODO: Save onboarding data to user profile
    logger.info("Completing onboarding with data:", updatedData);
    router.push("/onboarding/complete");
  };

  const handlePrev = () => {
    if (parseInt(step) > 1) {
      router.push(`/onboarding/${parseInt(step) - 1}`);
    }
  };

  const StepComponent = STEPS[step];
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <StepComponent />
    </div>
  );
} 