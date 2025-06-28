"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { logger } from "@hive/core";
import type { OnboardingData, AcademicLevel } from "@hive/core";
import { Loader2 } from "lucide-react";
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { WelcomeStep } from '@hive/ui';
import { DisplayNameAvatar as DisplayNameAvatarBase } from '@/components/onboarding/steps/display-name-avatar';
import { AcademicCard as AcademicCardBase } from '@/components/onboarding/steps/academic-card';
import { Interests as InterestsBase } from '@/components/onboarding/steps/interests';

interface OnboardingStepClientProps {
  step: string;
}

interface StepComponentProps {
  onNext: (nextStep?: number, data?: Partial<OnboardingData>) => void;
  onPrev?: () => void;
  data: Partial<OnboardingData>;
}

// Wrapper components that adapt the existing components to the expected interface
const Welcome: React.FC<StepComponentProps> = ({ onNext }) => {
  return (
    <WelcomeStep 
      onNext={() => onNext?.(1)}
      userEmail="student@university.edu" // TODO: Get from auth context
    />
  );
};

const DisplayNameAvatar: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  // The existing component handles its own logic, so we just render it
  // The onNext/onPrev/data props are available if we need to customize behavior
  return <DisplayNameAvatarBase />;
};

const AcademicCard: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  return <AcademicCardBase />;
};

const Interests: React.FC<StepComponentProps> = ({ onNext: _onNext, onPrev: _onPrev, data: _data }) => {
  return <InterestsBase />;
};

const STEPS: Record<string, React.ComponentType<StepComponentProps>> = {
  'welcome': Welcome,       // Context setting and value proposition
  '1': DisplayNameAvatar,   // Personal identity first - builds connection
  '2': AcademicCard,        // Academic context - sets university context  
  '3': Interests,           // Personalization - customize experience
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
  consentGiven: false
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
      // Determine next step based on current step
      if (step === 'welcome') {
        router.push('/onboarding/1');
      } else if (step === '3') {
        router.push("/onboarding/complete");
      } else {
        const currentNum = parseInt(step);
        router.push(`/onboarding/${currentNum + 1}`);
      }
    }
  };

  const handlePrev = () => {
    if (step === '1') {
      router.push('/onboarding/welcome');
    } else if (step !== 'welcome') {
      const currentNum = parseInt(step);
      if (currentNum > 1) {
        router.push(`/onboarding/${currentNum - 1}`);
      }
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

  // Handle invalid step identifiers (support both 'welcome' and numeric steps)
  const validSteps = Object.keys(STEPS);
  if (!validSteps.includes(step)) {
    router.replace('/onboarding/welcome');
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
              onClick={() => router.push('/onboarding/welcome')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Go to Welcome
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

    // If no onboarding data, start from welcome (except if already on welcome)
    if (!onboardingData && step !== 'welcome' && step !== '1') {
      router.replace('/onboarding/welcome');
      return;
    }

    // Step-specific validation
    switch (step) {
      case '1':
        // Step 1 can be accessed after welcome or if data exists
        break;
      case '2':
        // Step 2 (Academic) requires name and handle from Step 1
        if (!onboardingData?.fullName || !onboardingData?.handle) {
          router.replace('/onboarding/1');
        }
        break;
      case '3':
        // Step 3 (Interests) requires previous steps completed
        if (!onboardingData?.fullName || !onboardingData?.handle || 
            !onboardingData?.academicLevel || !onboardingData?.majors?.length) {
          router.replace('/onboarding/1');
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
            onClick={() => router.push('/onboarding/welcome')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Go to Welcome
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