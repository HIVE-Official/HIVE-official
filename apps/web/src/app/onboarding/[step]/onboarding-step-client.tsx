"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { logger } from "@hive/core";
import type { OnboardingData, AcademicLevel } from "@hive/core";
import { Loader2 } from "lucide-react";
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { DisplayNameAvatar as DisplayNameAvatarBase } from '@/components/onboarding/steps/display-name-avatar';
import { LeaderQuestion as LeaderQuestionBase } from '@/components/onboarding/steps/leader-question';
import { SpaceVerification as SpaceVerificationBase } from '@/components/onboarding/steps/space-verification';
import { AcademicCard as AcademicCardBase } from '@/components/onboarding/steps/academic-card';
import { Interests as InterestsBase } from '@/components/onboarding/steps/interests';
import SpaceDiscoveryStep from '@/components/onboarding/steps/space-discovery';

interface OnboardingStepClientProps {
  step: keyof typeof STEPS;
}

interface StepComponentProps {
  onNext: (nextStep?: number, data?: Partial<OnboardingData>) => void;
  onPrev?: () => void;
  data: Partial<OnboardingData>;
}

// Wrapper components that adapt the existing components to the expected interface
const DisplayNameAvatar: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  // The existing component handles its own logic, so we just render it
  // The onNext/onPrev/data props are available if we need to customize behavior
  return <DisplayNameAvatarBase />;
};

const LeaderQuestion: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  return <LeaderQuestionBase />;
};

const SpaceVerification: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  return <SpaceVerificationBase />;
};

const AcademicCard: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  return <AcademicCardBase />;
};

const Interests: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  return <InterestsBase />;
};

const SpaceDiscovery: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  return <SpaceDiscoveryStep />;
};

const STEPS: Record<string, React.ComponentType<StepComponentProps>> = {
  '1': AcademicCard,        // Start with academic info to build trust
  '2': SpaceDiscovery,      // Auto-join based on major + choose others  
  '3': DisplayNameAvatar,   // Personal details after trust established
  '4': Interests,           // Refine recommendations
} as const;

// Use the same check as auth hook for consistency
// If Firebase env vars are missing, we're in dev mode
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

  // Debug logging
  console.log('🐛 OnboardingStepClient Debug:', {
    step,
    isDevMode,
    isAuthLoading,
    isInitialized,
    hasOnboardingData: !!onboardingData,
    userExists: !!user,
    envVars: {
      hasFirebaseKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      nodeEnv: process.env.NODE_ENV
    }
  });

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
    console.log('🔄 Initialization useEffect triggered:', {
      isDevMode,
      hasOnboardingData: !!onboardingData,
      isAuthLoading
    });

    if (isDevMode) {
      // In dev mode, always initialize with mock data
      if (!onboardingData) {
        logger.info('🔥 Development mode: initializing with mock data');
        console.log('📝 Setting initial dev data');
        update(initialDevData);
      }
      console.log('✅ Setting isInitialized = true (dev mode)');
      setIsInitialized(true);
    } else {
      // In production mode, wait for auth to load
      if (!isAuthLoading) {
        console.log('✅ Setting isInitialized = true (production mode)');
        setIsInitialized(true);
      }
    }
  }, [onboardingData, update, isAuthLoading]);

  // Handle invalid step numbers
  if (isNaN(parseInt(step)) || parseInt(step) < 1 || parseInt(step) > Object.keys(STEPS).length) {
    router.replace('/onboarding/1');
    return null;
  }

  // Show loading state only when actually loading
  const shouldShowLoading = isDevMode ? !isInitialized : (isAuthLoading || !isInitialized);
  
  if (shouldShowLoading) {
    console.log('🔄 Showing loading state:', {
      reason: isDevMode ? 'waiting for dev mode initialization' : (isAuthLoading ? 'auth loading in production' : 'not initialized'),
      isDevMode,
      isAuthLoading,
      isInitialized
    });
    
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted" />
          <p className="text-muted">Loading your profile...</p>
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-muted mt-2 max-w-md">
              Debug: isDevMode={isDevMode.toString()}, isAuthLoading={isAuthLoading.toString()}, isInitialized={isInitialized.toString()}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Development mode handling - always proceed
  if (isDevMode) {
    logger.info('🔥 Development mode: proceeding with mock user');
    const StepComponent = STEPS[step];
    if (!StepComponent) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Step {step} Not Found</h1>
            <p className="text-muted-foreground mb-4">
              The requested onboarding step does not exist.
            </p>
            <button 
              onClick={() => router.push('/onboarding/1')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Go to Step 1
            </button>
          </div>
        </div>
      );
    }
    
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
  if (!StepComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Step {step} Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The requested onboarding step does not exist.
          </p>
          <button 
            onClick={() => router.push('/onboarding/1')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Go to Step 1
          </button>
        </div>
      </div>
    );
  }

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