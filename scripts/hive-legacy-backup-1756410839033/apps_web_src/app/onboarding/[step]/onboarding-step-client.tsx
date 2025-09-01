"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUnifiedAuth } from "@hive/ui";
import { env, logger, type OnboardingState, type AcademicLevel, INTEREST_CATEGORIES } from "@hive/core";
import { Loader2 } from "lucide-react";
import { ButtonEnhanced } from "@hive/ui";
import { ROUTES, getNextOnboardingStep, getPreviousOnboardingStep, isValidOnboardingStep } from "@/lib/routes";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import {
  CreateProfileStep as CreateProfileStepUI,
  AcademicStep,
  InterestsSelectionStep,
  WelcomeRoleStep,
} from "@hive/ui";
import { RoleSelectionStep, FacultyVerificationStep, AlumniComingSoonStep, type UserRole } from "@hive/ui";import { useHandleAvailability } from "@/hooks/use-handle-availability";
import { functions } from "@/lib/firebase-client";
import { httpsCallable } from "firebase/functions";

interface OnboardingStepClientProps {
  step: string;
}

interface StepComponentProps {
  onNext: (nextStep?: number, data?: Partial<OnboardingState>) => void;
  onPrev: () => void;
  data: Partial<OnboardingState>;
  isNavigating?: boolean;
}

function generateHandle(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .replace(/\s+/g, ".")
    .slice(0, 15);
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
      const updatedData = { 
        displayName, 
        handle, 
        avatarUrl: finalAvatarUrl, 
        consentGiven: termsAccepted,
        // Flag uploaded photos for moderation review
        ...(selectedFile && finalAvatarUrl && {
          avatarModerationStatus: "pending" as const
        })
      };
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
      avatarModerationStatus={onboardingData?.avatarModerationStatus}
      onFileSelect={setSelectedFile}
      onSubmit={handleSubmit}
      isUploading={isUploading}
      error={error}
      selectedFile={selectedFile}
      termsAccepted={termsAccepted}
      onTermsAcceptedChange={setTermsAccepted}
      userRole={onboardingData?.userRole}
      schoolName={onboardingData?.schoolName}
    />
  );
};


// Step 3: Academic Info Step Container - Using branded component
const AcademicStepContainer: React.FC<StepComponentProps> = ({ onNext, onPrev, data }) => {
  const { update } = useOnboardingStore();
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(data.academicLevel || "undergraduate");
  const [graduationYear, setGraduationYear] = useState<number>(data.graduationYear || new Date().getFullYear() + 4);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const updatedData = { academicLevel, graduationYear };
    update(updatedData);
    onNext(undefined, updatedData);
    setIsLoading(false);
  };

  return (
    <AcademicStep
      academicLevel={academicLevel}
      onAcademicLevelChange={setAcademicLevel}
      graduationYear={graduationYear}
      onGraduationYearChange={setGraduationYear}
      onSubmit={handleSubmit}
      onBack={onPrev}
      isLoading={isLoading}
    />
  );
};

// Step 4: Interests Step Container - Using branded component  
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
    <InterestsSelectionStep
      selectedInterests={selectedInterests}
      onInterestToggle={handleInterestToggle}
      onSubmit={handleSubmit}
      onBack={onPrev}
      isLoading={isLoading}
      interestCategories={INTEREST_CATEGORIES as any}
      minInterests={3}
    />
  );
};


// Step 1: Welcome + Role Selection Step Container
const WelcomeRoleStepContainer: React.FC<StepComponentProps> = ({ onNext, data }) => {
  const schoolName = data.schoolName || "your school";
  const userEmail = data.email || "";

  const handleRoleSelect = (role: UserRole) => {
    if (role === "faculty") {
      // Faculty can claim a space or continue to waitlist
      // For now, redirect to faculty verification where they can choose
      window.location.href = "/onboarding/faculty-verify";
      return;
    }
    
    if (role === "alumni") {
      // Alumni get email input for future news
      window.location.href = "/onboarding/alumni-soon";
      return;
    }
    
    // Only students continue to profile creation
    const updatedData = { userRole: role };
    onNext(undefined, updatedData);
  };

  return (
    <WelcomeRoleStep
      onRoleSelect={handleRoleSelect}
      schoolName={schoolName}
      userEmail={userEmail}
    />
  );
};

const STEPS: Record<string, React.ComponentType<StepComponentProps>> = {
  "1": WelcomeRoleStepContainer,
  "2": CreateProfileStepContainer,
  "3": AcademicStepContainer,
  "4": InterestsStepContainer,
} as const;

// Use NODE_ENV to determine development mode
const isDevMode = process.env.NODE_ENV === 'development';

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
  // In development mode, completely bypass Firebase auth
  const authResult = isDevMode ? { user: { uid: 'dev-user', email: 'test@buffalo.edu' }, isLoading: false } : useUnifiedAuth();
  const { user, isLoading: isAuthLoading } = authResult;
  const { data: onboardingData, update } = useOnboardingStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

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
    setIsNavigating(true);
    const updatedData = { ...onboardingData, ...data };
    update(updatedData);
    logger.info("Updating onboarding data:", updatedData);

    // Add small delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 180));

    if (nextStep) {
      router.push(ROUTES.ONBOARDING.STEP(nextStep));
    } else {
      const currentNum = parseInt(step);
      const nextRoute = getNextOnboardingStep(currentNum);
      router.push(nextRoute);
    }
  };

  const handlePrev = async () => {
    setIsNavigating(true);
    
    // Add small delay for better UX feedback
    await new Promise(resolve => setTimeout(resolve, 180));
    
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
        isInitialized,
      });
    }

    if (isDevMode) {
      // In dev mode, always initialize with mock data
      if (!onboardingData) {
        logger.info("🔥 Development mode: initializing with mock data");
        update(initialDevData);
      }
      // Always set initialized in dev mode
      if (!isInitialized) {
        setIsInitialized(true);
      }
    } else {
      // In production mode, wait for auth to load
      if (!isAuthLoading && !isInitialized) {
        setIsInitialized(true);
      }
    }
  }, [onboardingData, update, isAuthLoading, isInitialized]);

  // Handle invalid step identifiers (support steps 1-5 only)
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
            <ButtonEnhanced
              variant="surface"
              onClick={() => router.push(ROUTES.ONBOARDING.STEP_1)}
            >
              Go to Step 1
            </ButtonEnhanced>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-background relative">
        <StepComponent
          onNext={handleNext}
          onPrev={handlePrev}
          data={onboardingData || initialDevData}
          isNavigating={isNavigating}
        />
        
        {/* Navigation Loading Overlay */}
        {isNavigating && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-accent" />
              <p className="text-sm text-muted-foreground font-medium">Loading next step...</p>
            </div>
          </div>
        )}
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
    <div className="bg-background relative">
      <StepComponent
        onNext={handleNext}
        onPrev={handlePrev}
        data={onboardingData || {}}
        isNavigating={isNavigating}
      />
      
      {/* Navigation Loading Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-accent" />
            <p className="text-sm text-muted-foreground font-medium">Loading next step...</p>
          </div>
        </div>
      )}
    </div>
  );
}
