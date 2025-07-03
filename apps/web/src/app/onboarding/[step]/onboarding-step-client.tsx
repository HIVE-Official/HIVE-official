"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { env, logger, type OnboardingState, type AcademicLevel } from "@hive/core";
import { Loader2 } from "lucide-react";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import {
  Button,
  WelcomeStep,
  CreateProfileStep as CreateProfileStepUI,
  SchoolPledgeStep,
} from "@hive/ui";
import { useHandleAvailability } from "@/hooks/use-handle-availability";
import { functions } from "@/lib/firebase-client";
import { httpsCallable } from "firebase/functions";

interface OnboardingStepClientProps {
  step: string;
}

interface StepComponentProps {
  onNext: (nextStep?: number, data?: Partial<OnboardingState>) => void;
  onPrev: () => void;
  data: Partial<OnboardingState>;
}

function generateHandle(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, ".")
    .slice(0, 30);
}

const CreateProfileStepContainer: React.FC<StepComponentProps> = ({ onNext, data: onboardingData }) => {
  const { update } = useOnboardingStore();
  const [displayName, setDisplayName] = useState(onboardingData?.displayName ?? "");
  const [handle, setHandle] = useState(onboardingData?.handle ?? "");
  const [avatarUrl, setAvatarUrl] = useState(onboardingData?.avatarUrl ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleAvailability = useHandleAvailability(handle);

  useEffect(() => {
    if (displayName) {
      setHandle(generateHandle(displayName));
    }
  }, [displayName]);

  const uploadCroppedImage = async (): Promise<string> => {
    if (!selectedFile) {
      throw new Error("No image to upload.");
    }
    const croppedImageBlob = selectedFile;
    setIsUploading(true);
    try {
      const generateUploadUrl = httpsCallable(functions, "generateAvatarUploadUrl");
      const uploadUrlResult = await generateUploadUrl({
        fileType: croppedImageBlob.type,
        fileSize: croppedImageBlob.size,
      });
      const { url, filePath } = uploadUrlResult.data as { success: boolean; url: string; filePath: string; };
      await fetch(url, {
        method: "PUT",
        body: croppedImageBlob,
        headers: { "Content-Type": croppedImageBlob.type },
      });
      const bucket = env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "demo-project.appspot.com";
      return `https://storage.googleapis.com/${bucket}/${filePath}`;
    } catch (error) {
      console.error("Upload failed", error);
      throw new Error("Could not upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleAvailability.available === false) {
      setError("Please choose an available username");
      return;
    }
    if (handleAvailability.isChecking) {
      setError("Please wait while we check username availability");
      return;
    }
    setIsUploading(true);
    setError("");
    try {
      let finalAvatarUrl = avatarUrl;
      if (selectedFile) {
        finalAvatarUrl = await uploadCroppedImage();
      }
      const updatedData = { displayName, handle, avatarUrl: finalAvatarUrl, consentGiven: termsAccepted };
      update(updatedData);
      onNext(undefined, updatedData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <CreateProfileStepUI
      displayName={displayName}
      onDisplayNameChange={setDisplayName}
      handle={handle}
      onHandleChange={setHandle}
      handleAvailability={handleAvailability}
      avatarUrl={avatarUrl}
      onFileSelect={setSelectedFile}
      onSubmit={handleSubmit}
      isUploading={isUploading}
      error={error}
      selectedFile={selectedFile}
      termsAccepted={termsAccepted}
      onTermsAcceptedChange={setTermsAccepted}
    />
  );
};

const SchoolPledgeStepContainer: React.FC<StepComponentProps> = ({ onNext, data }) => {
  const schoolName = data.schoolName || "your school";
  return (
    <SchoolPledgeStep
      schoolName={schoolName}
      onNext={() => onNext()}
    />
  );
};

const STEPS: Record<string, React.ComponentType<StepComponentProps>> = {
  "1": WelcomeStep,
  "2": CreateProfileStepContainer,
  "3": SchoolPledgeStepContainer,
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
  console.warn("🐛 OnboardingStepClient Debug:", {
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
      const currentNum = parseInt(step);
      if (currentNum >= Object.keys(STEPS).length) {
        router.push("/onboarding/complete");
      } else {
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
    console.warn("🔄 Initialization useEffect triggered:", {
      isDevMode,
      hasOnboardingData: !!onboardingData,
      isAuthLoading,
    });

    if (isDevMode) {
      // In dev mode, always initialize with mock data
      if (!onboardingData) {
        logger.info("🔥 Development mode: initializing with mock data");
        console.warn("📝 Setting initial dev data");
        update(initialDevData);
      }
      console.warn("✅ Setting isInitialized = true (dev mode)");
      setIsInitialized(true);
    } else {
      // In production mode, wait for auth to load
      if (!isAuthLoading) {
        console.warn("✅ Setting isInitialized = true (production mode)");
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
    console.warn("🔄 Showing loading state:", {
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
              className="px-4 py-2 bg-foreground text-background rounded-md font-medium"
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
    if (step === "2" && !onboardingData?.schoolId) {
      logger.warn("🚫 Missing schoolId for step 2, redirecting to step 1");
      router.push("/onboarding/1");
    }
  }, [step, onboardingData, isInitialized, router]);

  const StepComponent = STEPS[step];

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
