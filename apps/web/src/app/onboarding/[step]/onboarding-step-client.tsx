"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { logger } from "@hive/core";
import type { OnboardingState, AcademicLevel } from "@hive/core";
import { Loader2 } from "lucide-react";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { DisplayNameAvatar as DisplayNameAvatarBase } from "@/components/onboarding/steps/display-name-avatar";
import { AcademicCard as AcademicCardBase } from "@/components/onboarding/steps/academic-card";

interface OnboardingStepClientProps {
  step: string;
}

interface StepComponentProps {
  onNext: (nextStep?: number, data?: Partial<OnboardingState>) => void;
  onPrev: () => void;
  data: Partial<OnboardingState>;
}

// Wrapper components that adapt the existing components to the expected interface
const DisplayNameAvatar: React.FC<StepComponentProps> = ({ onNext, data }) => {
  return (
    <DisplayNameAvatarBase
      onNext={(stepData: Partial<OnboardingState>) => onNext(undefined, stepData)}
      data={data}
    />
  );
};

const LeaderStep: React.FC<StepComponentProps> = ({ onNext }) => {
  const { update } = useOnboardingStore();
  
  const handleLeaderChoice = async (isStudentLeader: boolean) => {
    await update({ isStudentLeader });
    onNext(undefined, { isStudentLeader });
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface border border-border rounded-lg p-6">
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 0 0 14-14 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-display text-foreground">
            Student Leadership
          </h2>
          <p className="text-muted font-sans">
            Are you involved in student leadership or organizations?
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLeaderChoice(true)}
            className="w-full p-4 rounded-lg border-2 border-border hover:border-accent/50 transition-all text-left"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 0 0 14-14 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  Yes, I'm a leader
                </h3>
                <p className="text-sm text-muted">
                  I hold leadership positions in student organizations, clubs, or governance
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={() => handleLeaderChoice(false)}
            className="w-full p-4 rounded-lg border-2 border-border hover:border-accent/50 transition-all text-left"
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">
                  Not at this time
                </h3>
                <p className="text-sm text-muted">
                  I'm focused on academics or not currently in leadership roles
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

const AcademicCard: React.FC<StepComponentProps> = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AcademicCardBase />
    </div>
  );
};

const Interests: React.FC<StepComponentProps> = ({ onNext }) => {
  const { update } = useOnboardingStore();
  
  const handleInterestsSubmit = async (interestData: Partial<OnboardingState>) => {
    await update(interestData);
    onNext(undefined, interestData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg bg-surface border border-border rounded-lg p-6">
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl font-display text-foreground">
            Your Interests
          </h2>
          <p className="text-muted font-sans">
            What are you passionate about? This helps us connect you with relevant communities.
          </p>
        </div>
        <button
          onClick={() => handleInterestsSubmit({ interests: [] })}
          className="w-full bg-accent text-background font-medium py-3 px-4 rounded-lg hover:bg-accent/90 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const STEPS: Record<string, React.ComponentType<StepComponentProps>> = {
  "1": DisplayNameAvatar, // Personal identity - builds connection
  "2": LeaderStep, // Student leader question for space claiming
  "3": AcademicCard, // Academic context - sets university context
  "4": Interests, // Personalization - customize experience
} as const;

// Use the same check as auth hook for consistency
// If Firebase env vars are missing, we're in dev mode
const isDevMode = !process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

const initialDevData: Partial<OnboardingState> = {
  schoolId: "ub",
  schoolName: "University at Buffalo",
  displayName: "Dev User",
  handle: "dev-user",
  onboardingCompleted: false,
  isStudentLeader: false,
  academicLevel: "undergraduate" as AcademicLevel,
  majors: ["Computer Science"],
  graduationYear: new Date().getFullYear() + 4,
  interests: [],
  consentGiven: false,
};

export function OnboardingStepClient({ step }: OnboardingStepClientProps) {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: onboardingData, update } = useOnboardingStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // Debug logging
  console.log("🐛 OnboardingStepClient Debug:", {
    step,
    isDevMode,
    isAuthLoading,
    isInitialized,
    hasOnboardingData: !!onboardingData,
    userExists: !!user,
    envVars: {
      hasFirebaseKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      nodeEnv: process.env.NODE_ENV,
    },
  });

  const handleNext = async (
    nextStep?: number,
    data?: Partial<OnboardingState>
  ) => {
    const updatedData = { ...onboardingData, ...data };
    update(updatedData);
    logger.info("Updating onboarding data:", updatedData);

    if (nextStep) {
      router.push(`/onboarding/${nextStep}`);
    } else {
      // Determine next step based on current step
      if (step === "4") {
        router.push("/onboarding/complete");
      } else {
        const currentNum = parseInt(step);
        router.push(`/onboarding/${currentNum + 1}`);
      }
    }
  };

  const handlePrev = () => {
    if (step !== "1") {
      const currentNum = parseInt(step);
      if (currentNum > 1) {
        router.push(`/onboarding/${currentNum - 1}`);
      }
    }
  };

  // Initialize onboarding data in dev mode
  useEffect(() => {
    console.log("🔄 Initialization useEffect triggered:", {
      isDevMode,
      hasOnboardingData: !!onboardingData,
      isAuthLoading,
    });

    if (isDevMode) {
      // In dev mode, always initialize with mock data
      if (!onboardingData) {
        logger.info("🔥 Development mode: initializing with mock data");
        console.log("📝 Setting initial dev data");
        update(initialDevData);
      }
      console.log("✅ Setting isInitialized = true (dev mode)");
      setIsInitialized(true);
    } else {
      // In production mode, wait for auth to load
      if (!isAuthLoading) {
        console.log("✅ Setting isInitialized = true (production mode)");
        setIsInitialized(true);
      }
    }
  }, [onboardingData, update, isAuthLoading]);

  // Handle invalid step identifiers (support numeric steps only)
  const validSteps = Object.keys(STEPS);
  if (!validSteps.includes(step)) {
    router.replace("/onboarding/1");
    return null;
  }

  // Show loading state only when actually loading
  const shouldShowLoading = isDevMode
    ? !isInitialized
    : isAuthLoading || !isInitialized;

  if (shouldShowLoading) {
    console.log("🔄 Showing loading state:", {
      reason: isDevMode
        ? "waiting for dev mode initialization"
        : isAuthLoading
        ? "auth loading in production"
        : "not initialized",
      isDevMode,
      isAuthLoading,
      isInitialized,
    });

    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <p className="text-muted font-sans">Loading your profile...</p>
          {process.env.NODE_ENV === "development" && (
            <div className="text-xs text-muted mt-2 max-w-md">
              Debug: isDevMode={isDevMode.toString()}, isAuthLoading=
              {isAuthLoading.toString()}, isInitialized=
              {isInitialized.toString()}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Development mode handling - always proceed
  if (isDevMode) {
    logger.info("🔥 Development mode: proceeding with mock user");
    const StepComponent = STEPS[step];
    if (!StepComponent) {
      return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-foreground">Step {step} Not Found</h1>
            <p className="text-muted mb-4">
              The requested onboarding step does not exist.
            </p>
            <button
              onClick={() => router.push("/onboarding/1")}
              className="px-4 py-2 bg-accent text-background rounded-md font-medium"
            >
              Go to Step 1
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-background">
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
    router.push("/auth/school-select");
    return null;
  }

  // Validation and routing logic
  useEffect(() => {
    if (!isInitialized) return;

    // Step-specific validation
    switch (step) {
      case "1":
        // Step 1 (Profile) can always be accessed
        break;
      case "2":
        // Step 2 (Leader) requires name and handle from Step 1
        if (!onboardingData?.displayName || !onboardingData?.handle) {
          router.replace("/onboarding/1");
        }
        break;
      case "3":
        // Step 3 (Academic) requires previous steps completed
        if (
          !onboardingData?.displayName ||
          !onboardingData?.handle ||
          onboardingData?.isStudentLeader === undefined
        ) {
          router.replace("/onboarding/1");
        }
        break;
      case "4":
        // Step 4 (Interests) requires all previous steps completed
        if (
          !onboardingData?.displayName ||
          !onboardingData?.handle ||
          onboardingData?.isStudentLeader === undefined ||
          !onboardingData?.academicLevel ||
          !onboardingData?.majors?.length
        ) {
          router.replace("/onboarding/1");
        }
        break;
    }
  }, [isInitialized, onboardingData, router, step]);

  const StepComponent = STEPS[step];
  if (!StepComponent) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4 bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Step {step} Not Found</h1>
          <p className="text-muted mb-4">
            The requested onboarding step does not exist.
          </p>
          <button
            onClick={() => router.push("/onboarding/1")}
            className="px-4 py-2 bg-accent text-background rounded-md font-medium"
          >
            Go to Step 1
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <StepComponent
        onNext={handleNext}
        onPrev={handlePrev}
        data={onboardingData || {}}
      />
    </div>
  );
}
