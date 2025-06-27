"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { logger } from "@hive/core";
import type { OnboardingData, AcademicLevel } from "@hive/core";
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

interface StepComponentProps {
  onNext: (nextStep?: number, data?: Partial<OnboardingData>) => void;
  onPrev?: () => void;
  data: Partial<OnboardingData>;
}

const STEPS: Record<string, React.ComponentType<StepComponentProps>> = {
  '1': DisplayNameAvatar,
  '2': LeaderQuestion,
  '3': SpaceVerification,
  '4': AcademicCard,
  '5': Interests,
} as const;

// Use the same check as auth hook for consistency
const isDevMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const initialDevData: Partial<OnboardingData> = {
  fullName: 'Dev User',
  handle: 'dev-user',
  onboardingCompleted: false,
  isStudentLeader: false,
  academicLevel: 'undergraduate' as AcademicLevel,
  majors: ['Computer Science'],
  graduationYear: new Date().getFullYear() + 4,
  interests: [],
  spaceId: undefined
};

export function OnboardingStepClient({ step }: OnboardingStepClientProps) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: onboardingData, update } = useOnboardingStore();
  const [isInitialized, setIsInitialized] = useState(false);

  const handleNext = async (nextStep?: number, data?: Partial<OnboardingData>) => {
    const updatedData = { ...onboardingData, ...data };
    update(updatedData);
    logger.info("Updating onboarding data:", updatedData);
    
    if (nextStep) {
      router.push(`/onboarding/${nextStep}`);
    } else {
      router.push("/onboarding/complete");
    }
  };

  const handlePrev = () => {
    if (parseInt(step) > 1) {
      router.push(`/onboarding/${parseInt(step) - 1}`);
    }
  };

  // Initialize onboarding data in dev mode
  useEffect(() => {
    if (isDevMode && !onboardingData) {
      update(initialDevData);
    }
    setIsInitialized(true);
  }, [onboardingData, update]);

  // Handle invalid step numbers
  if (isNaN(parseInt(step)) || parseInt(step) < 1 || parseInt(step) > Object.keys(STEPS).length) {
    router.replace('/onboarding/1');
    return null;
  }

  // Show loading state
  if (isAuthLoading || !isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted" />
          <p className="text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Development mode handling
  if (isDevMode) {
    logger.info('🔥 Development mode: proceeding with mock user');
    const StepComponent = STEPS[step];
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <StepComponent 
          onNext={handleNext} 
          onPrev={handlePrev} 
          data={onboardingData || initialDevData} 
        />
      </div>
    );
  }

  // Production auth check
  if (!user) {
    router.push('/auth/email');
    return null;
  }

  // Validation and routing logic
  useEffect(() => {
    if (!isInitialized) return;

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
    }
  }, [isInitialized, onboardingData, router, step]);

  const StepComponent = STEPS[step];
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <StepComponent 
        onNext={handleNext} 
        onPrev={handlePrev} 
        data={onboardingData || {}} 
      />
    </div>
  );
} 