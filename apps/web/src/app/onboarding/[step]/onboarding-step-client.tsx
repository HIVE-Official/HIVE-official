"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { env, logger, type OnboardingState, type AcademicLevel, INTEREST_CATEGORIES } from "@hive/core";
import { Loader2 } from "lucide-react";
import { Button } from "@hive/ui";
import { ROUTES, getNextOnboardingStep, getPreviousOnboardingStep, isValidOnboardingStep } from "@/lib/routes";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import {
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
  const [avatarUrl, _setAvatarUrl] = useState(onboardingData?.avatarUrl ?? "");
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

// Step 4: Academic Info Step Container - HIVE styled
const AcademicStepContainer: React.FC<StepComponentProps> = ({ onNext, onPrev, data }) => {
  const { update } = useOnboardingStore();
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(data.academicLevel || "undergraduate");
  const [majors, setMajors] = useState<string[]>(data.majors || []);
  const [graduationYear, setGraduationYear] = useState<number>(data.graduationYear || new Date().getFullYear() + 4);
  const [isLoading, setIsLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleSubmit = async () => {
    setIsLoading(true);
    const updatedData = { academicLevel, majors, graduationYear };
    update(updatedData);
    onNext(undefined, updatedData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                  step < 4 ? 'bg-white' : step === 4 ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content card */}
        <div className="module-border module-surface module-padding space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-display font-semibold text-foreground">
              Academic Information
            </h1>
            <p className="text-muted font-body">
              Tell us about your academic journey
            </p>
          </div>
          
          {/* Form fields */}
          <div className="hive-stack">
            {/* Academic Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground font-body">
                Academic Level
              </label>
              <select 
                value={academicLevel}
                onChange={(e) => setAcademicLevel(e.target.value as AcademicLevel)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface-01 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
              >
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate Student</option>
                <option value="phd">PhD Student</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            {/* Graduation Year */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground font-body">
                Expected Graduation Year
              </label>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface-01 text-foreground font-body focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
              >
                {Array.from({ length: 8 }, (_, i) => currentYear + i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onPrev}
              className="flex-1 font-body"
            >
              Back
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 font-body"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted font-body">
            Step 4 of 5
          </p>
        </div>
      </div>
    </div>
  );
};

// Step 5: Interests Step Container - HIVE styled
const InterestsStepContainer: React.FC<StepComponentProps> = ({ onNext, onPrev, data }) => {
  const { update } = useOnboardingStore();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const updatedData = { interests: selectedInterests, onboardingCompleted: true };
    update(updatedData);
    onNext(undefined, updatedData);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                  step < 5 ? 'bg-white' : step === 5 ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content card */}
        <div className="module-border module-surface module-padding space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-display font-semibold text-foreground">
              What interests you?
            </h1>
            <p className="text-muted font-body">
              Select at least 3 interests to help us connect you with relevant communities
            </p>
          </div>
          
          {/* Interest categories */}
          <div className="hive-stack max-h-96 overflow-y-auto">
            {Object.entries(INTEREST_CATEGORIES).map(([category, interests]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-sm font-medium text-foreground font-body">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest: string) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1.5 rounded-md text-sm font-body transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                        selectedInterests.includes(interest)
                          ? 'border border-accent bg-accent/10 text-accent hover:bg-accent/20'
                          : 'border border-border bg-surface-01 text-muted hover:bg-surface-02 hover:border-accent/30 hover:text-accent'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selection counter */}
          <div className="text-center">
            <p className="text-sm text-muted font-body">
              {selectedInterests.length} interests selected
              {selectedInterests.length < 3 && ` • select at least ${3 - selectedInterests.length} more`}
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onPrev}
              className="flex-1 font-body"
            >
              Back
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={isLoading || selectedInterests.length < 3}
              className="flex-1 font-body"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Completing...
                </>
              ) : (
                'Complete Setup'
              )}
            </Button>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted font-body">
            Step 5 of 5
          </p>
        </div>
      </div>
    </div>
  );
};

const STEPS: Record<string, React.ComponentType<StepComponentProps>> = {
  "1": WelcomeStep,
  "2": CreateProfileStepContainer,
  "3": SchoolPledgeStepContainer,
  "4": AcademicStepContainer,
  "5": InterestsStepContainer,
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

  // Development mode logging (only in dev)
  if (process.env.NODE_ENV === 'development') {
    logger.debug("OnboardingStepClient state:", {
      step,
      isDevMode,
      isAuthLoading,
      isInitialized,
      hasOnboardingData: !!onboardingData,
      userExists: !!user,
    });
  }

  const handleNext = async (
    nextStep?: number,
    data?: Partial<OnboardingState>
  ) => {
    const updatedData = { ...onboardingData, ...data };
    update(updatedData);
    logger.info("Updating onboarding data:", updatedData);

    if (nextStep) {
      router.push(ROUTES.ONBOARDING.STEP(nextStep));
    } else {
      const currentNum = parseInt(step);
      const nextRoute = getNextOnboardingStep(currentNum);
      router.push(nextRoute);
    }
  };

  const handlePrev = () => {
    const currentNum = parseInt(step);
    const prevRoute = getPreviousOnboardingStep(currentNum);
    if (prevRoute) {
      router.push(prevRoute);
    }
  };

  // Initialize onboarding data in dev mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      logger.debug("Initialization useEffect triggered", {
        isDevMode,
        hasOnboardingData: !!onboardingData,
        isAuthLoading,
      });
    }

    if (isDevMode) {
      // In dev mode, always initialize with mock data
      if (!onboardingData) {
        logger.info("🔥 Development mode: initializing with mock data");
        update(initialDevData);
      }
      setIsInitialized(true);
    } else {
      // In production mode, wait for auth to load
      if (!isAuthLoading) {
        setIsInitialized(true);
      }
    }
  }, [onboardingData, update, isAuthLoading]);

  // Handle invalid step identifiers (support numeric steps only)
  if (!isValidOnboardingStep(step)) {
    router.replace(ROUTES.ONBOARDING.STEP_1);
    return null;
  }

  // Show loading state only when actually loading
  const shouldShowLoading = isDevMode
    ? !isInitialized
    : isAuthLoading || !isInitialized;

  if (shouldShowLoading) {
    if (process.env.NODE_ENV === 'development') {
      logger.debug("Showing loading state", {
        reason: isDevMode
          ? "waiting for dev mode initialization"
          : isAuthLoading
          ? "auth loading in production"
          : "not initialized",
        isDevMode,
        isAuthLoading,
        isInitialized,
      });
    }

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
            <Button
              variant="surface"
              onClick={() => router.push(ROUTES.ONBOARDING.STEP_1)}
            >
              Go to Step 1
            </Button>
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
    router.push(ROUTES.AUTH.SCHOOL_SELECT);
    return null;
  }

  // Validation and routing logic
  useEffect(() => {
    if (!isInitialized) return;

    // Step-specific validation
    if (step === "2" && !onboardingData?.schoolId) {
      logger.warn("Missing schoolId for step 2, redirecting to step 1");
      router.push(ROUTES.ONBOARDING.STEP_1);
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
