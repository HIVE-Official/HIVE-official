"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { useAuth } from "@hive/auth-logic";
// TEMPORARY: Using local implementation due to export resolution issue
import { useOnboardingBridge, type OnboardingData } from "@/lib/onboarding-bridge-temp";
import { motion } from 'framer-motion';
import {
  AuthOnboardingLayout,
  Badge,
  HiveCard,
  HiveCardContent,
  HiveCardHeader,
  HiveCardTitle,
  HiveLogo,
  OnboardingFrame,
} from "@hive/ui";

import type { HiveOnboardingData } from "./types";
export type { HiveOnboardingData, AcademicLevel, LivingSituation } from "./types";

// Enhanced HIVE step components
import { HiveWelcomeStep } from "./steps/hive-welcome-step";
import { HiveUserTypeStep } from "./steps/hive-user-type-step";
import { HiveNameStep } from "./steps/hive-name-step";
import { HiveFacultyInfoStep } from "./steps/hive-faculty-info-step";
import { HiveAcademicsStep } from "./steps/hive-academics-step";
import { HiveHandleStep } from "./steps/hive-handle-step";
import { HivePhotoStep } from "./steps/hive-photo-step";
import { HiveInterestsStep } from "./steps/hive-interests-step";
import { HiveBuilderStep } from "./steps/hive-builder-step";
import { HiveCompletionStep } from "./steps/hive-completion-step";
import { HiveLegalStep } from "./steps/hive-legal-step";

// Desktop step indicator
function StepIndicator({
  currentStep,
  stepTitles,
}: {
  currentStep: number;
  stepTitles: string[];
}) {
  return (
    <div className="hidden rounded-2xl border border-[var(--hive-border-primary)]/50 bg-[var(--hive-background-elevated)] p-5 lg:block">
      <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">Progress</h3>
      <ol className="mt-3 space-y-2">
        {stepTitles.map((title, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;
          return (
            <li
              key={title}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-[var(--hive-brand-primary)]/10 text-[var(--hive-text-primary)]"
                  : isComplete
                    ? "text-[var(--hive-text-secondary)]"
                    : "text-[var(--hive-text-muted)]"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                  isActive
                    ? "bg-[var(--hive-brand-primary)] text-black"
                    : isComplete
                      ? "bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]"
                      : "bg-[var(--hive-background-secondary)]/70 text-[var(--hive-text-muted)]"
                )}
                aria-hidden
              >
                {index + 1}
              </span>
              <span className="flex-1">
                {title}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ProfilePreviewCard({ data }: { data: HiveOnboardingData }) {
  const fullName = data.fullName?.trim() || [data.firstName, data.lastName].filter(Boolean).join(" ") || "Your name";
  const handle = data.handle?.trim() || "your-handle";
  const interests = data.interests?.slice(0, 3) ?? [];
  const spacesCount = data.builderRequestSpaces?.length ?? 0;

  const initials = React.useMemo(() => {
    if (!fullName || fullName === "Your name") {
      return "UB";
    }
    const parts = fullName.split(" ").filter(Boolean);
    const [first, second] = [parts[0], parts[1]];
    return [first?.[0], second?.[0]].filter(Boolean).join("" ).toUpperCase();
  }, [fullName]);

  return (
    <HiveCard className="bg-[var(--hive-background-elevated)]">
      <HiveCardHeader className="space-y-1">
        <HiveCardTitle className="text-sm font-semibold text-[var(--hive-text-primary)]">Profile preview</HiveCardTitle>
        <p className="text-xs text-[var(--hive-text-secondary)]">
          Update fields to see how classmates will spot you in HIVE.
        </p>
      </HiveCardHeader>
      <HiveCardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[var(--hive-border-primary)]/60 bg-[var(--hive-background-tertiary)]/60">
            {data.profilePhoto ? (
              <Image
                src={data.profilePhoto}
                alt="Profile preview"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-[var(--hive-text-secondary)]">
                {initials || "UB"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--hive-text-primary)]">{fullName}</p>
            <p className="truncate text-xs text-[var(--hive-text-muted)]">@{handle}</p>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[var(--hive-text-secondary)]">
          {data.major && (
            <div className="font-medium text-[var(--hive-text-primary)]">{data.major}</div>
          )}
          {data.academicLevel && (
            <div className="capitalize">{data.academicLevel.replace(/-/g, " ")}</div>
          )}
          {data.graduationYear && (
            <div>Class of {data.graduationYear}</div>
          )}
        </div>

        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-[var(--hive-brand-primary)]/10 px-2 py-1 text-xs font-medium text-[var(--hive-brand-primary)]"
              >
                {interest}
              </span>
            ))}
            {data.interests && data.interests.length > interests.length && (
              <span className="rounded-full bg-[var(--hive-background-tertiary)]/40 px-2 py-1 text-xs text-[var(--hive-text-muted)]">
                +{data.interests.length - interests.length}
              </span>
            )}
          </div>
        )}

        {spacesCount > 0 && (
          <div className="text-xs text-[var(--hive-text-secondary)]">
            Requesting access to {spacesCount} space{spacesCount !== 1 ? "s" : ""}.
          </div>
        )}

        <Badge variant="outline" className="uppercase tracking-wide">Built by UB Students</Badge>
      </HiveCardContent>
    </HiveCard>
  );
}

const CampusMessageCard = () => (
  <div className="rounded-2xl border border-[var(--hive-border-primary)]/50 bg-[var(--hive-background-elevated)] p-5 text-sm text-[var(--hive-text-secondary)]">
    <p className="font-medium text-[var(--hive-text-primary)]">Tonight at UB</p>
    <p className="mt-2 leading-relaxed">
      Complete onboarding to unlock campus rituals, student spaces, and live feed drops curated for UB.
    </p>
    <p className="mt-4 text-xs uppercase tracking-wide text-[var(--hive-text-muted)]">Student-run • Campus first</p>
  </div>
);

function MobileSummary({
  currentStep,
  totalSteps,
  stepTitle,
}: {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--hive-border-primary)]/50 bg-[var(--hive-background-elevated)] p-4 lg:hidden">
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--hive-text-muted)]">
        Step {currentStep} of {totalSteps}
      </div>
      {stepTitle && (
        <div className="mt-1 text-sm font-semibold text-[var(--hive-text-primary)]">
          {stepTitle}
        </div>
      )}
    </div>
  );
}

type StepId =
  | "welcome"
  | "userType"
  | "personalInfo"
  | "photo"
  | "academicInfo"
  | "interests"
  | "facultyInfo"
  | "builder"
  | "legal"
  | "complete";

type StepComponent = (props: {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}) => JSX.Element;

interface StepConfig {
  id: StepId;
  title: string;
  description: string;
  component: StepComponent;
}

const studentStepConfig: StepConfig[] = [
  {
    id: "welcome",
    title: "Welcome to HIVE",
    description: "Start your UB hub",
    component: HiveWelcomeStep,
  },
  {
    id: "userType",
    title: "Your Role",
    description: "Student, alumni, or faculty",
    component: HiveUserTypeStep,
  },
  {
    id: "personalInfo",
    title: "Profile Basics",
    description: "Name and handle",
    component: HiveNameStep,
  },
  {
    id: "photo",
    title: "Profile Photo",
    description: "Add a face (optional)",
    component: HivePhotoStep,
  },
  {
    id: "academicInfo",
    title: "Academics",
    description: "Major, year, quick bio",
    component: HiveAcademicsStep,
  },
  {
    id: "interests",
    title: "Interests",
    description: "Pick 3-6",
    component: HiveInterestsStep,
  },
  {
    id: "legal",
    title: "Privacy & Terms",
    description: "Review and accept",
    component: HiveLegalStep,
  },
  {
    id: "complete",
    title: "Finish Setup",
    description: "Enter the HIVE",
    component: HiveCompletionStep,
  },
];

const facultyStepConfig: StepConfig[] = [
  {
    id: "welcome",
    title: "Welcome to HIVE",
    description: "Start your UB hub",
    component: HiveWelcomeStep,
  },
  {
    id: "userType",
    title: "Your Role",
    description: "Confirm you're faculty",
    component: HiveUserTypeStep,
  },
  {
    id: "facultyInfo",
    title: "Faculty Details",
    description: "Name and contact",
    component: HiveFacultyInfoStep,
  },
  {
    id: "builder",
    title: "Space Access",
    description: "Request campus spaces",
    component: HiveBuilderStep,
  },
  {
    id: "legal",
    title: "Privacy & Terms",
    description: "Review and accept",
    component: HiveLegalStep,
  },
  {
    id: "complete",
    title: "Finish Setup",
    description: "Enter the HIVE",
    component: HiveCompletionStep,
  },
];

export function HiveOnboardingWizard() {
  const router = useRouter();
  const unifiedAuth = useAuth();
  const onboardingBridge = useOnboardingBridge();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<HiveOnboardingData>({
    fullName: "",
    userType: undefined,
    firstName: "",
    lastName: "",
    facultyEmail: "",
    major: "",
    academicLevel: undefined,
    graduationYear: new Date().getFullYear() + 4, // Default to 4 years from now
    handle: "",
    profilePhoto: "",
    interests: [],
    builderRequestSpaces: [],
    bio: "",
    livingSituation: undefined,
    hasConsented: false,
    acceptedTerms: false,
    acceptedPrivacy: false,
  });

  const updateData = (newData: Partial<HiveOnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const steps = useMemo(
    () => (data.userType === 'faculty' ? facultyStepConfig : studentStepConfig),
    [data.userType]
  );

  useEffect(() => {
    setCurrentStep((prev) => {
      if (steps.length === 0) return 0;
      return Math.min(prev, steps.length - 1);
    });
  }, [steps.length]);

  const activeStep = steps[currentStep];
  const totalSteps = steps.length;
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  const canGoNext = () => {
    const step = activeStep;
    if (!step) return false;

    const currentYear = new Date().getFullYear();

    switch (step.id) {
      case "welcome":
        return true;
      case "userType":
        return data.userType !== undefined;
      case "personalInfo":
        return (
          !!data.firstName?.trim() &&
          data.firstName.trim().length >= 2 &&
          !!data.lastName?.trim() &&
          data.lastName.trim().length >= 2 &&
          data.handle.length >= 3 &&
          data.handle.length <= 20 &&
          /^[a-zA-Z0-9]/.test(data.handle) &&
          /[a-zA-Z0-9]$/.test(data.handle) &&
          /^[a-zA-Z0-9._-]+$/.test(data.handle) &&
          !/[._-]{2,}/.test(data.handle)
        );
      case "photo":
        return true;
      case "academicInfo":
        return (
          !!data.major &&
          !!data.academicLevel &&
          data.graduationYear >= currentYear &&
          data.graduationYear <= currentYear + 10
        );
      case "interests":
        return !!data.interests && data.interests.length >= 3 && data.interests.length <= 6;
      case "facultyInfo":
        return (
          !!data.firstName?.trim() &&
          data.firstName.trim().length >= 2 &&
          !!data.lastName?.trim() &&
          data.lastName.trim().length >= 2
        );
      case "builder":
        return !!data.builderRequestSpaces && data.builderRequestSpaces.length > 0;
      case "legal":
        return data.acceptedTerms && data.acceptedPrivacy;
      case "complete":
        return true;
      default:
        return true;
    }
  };

  const goNext = () => {
    if (currentStep < totalSteps - 1 && canGoNext()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };


  const handleSubmit = async () => {
    if (activeStep?.id !== "complete") {
      goNext();
      return;
    }

    if (!canGoNext()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (!unifiedAuth.isAuthenticated || !unifiedAuth.user) {
        throw new Error("Authentication required. Please sign in again.");
      }

      const firstName = data.firstName?.trim() ?? "";
      const lastName = data.lastName?.trim() ?? "";
      const fullName = data.fullName?.trim() || [firstName, lastName].filter(Boolean).join(" ");
      const fallbackHandle = [firstName, lastName].filter(Boolean).join(".").toLowerCase();

      const onboardingData: OnboardingData = {
        fullName,
        userType: data.userType!,
        firstName,
        lastName,
        major: data.userType === "faculty" ? "Faculty" : data.major,
        academicLevel: data.academicLevel,
        graduationYear: data.userType === "faculty" ? new Date().getFullYear() : data.graduationYear,
        handle: data.userType === "faculty" ? fallbackHandle || data.handle : data.handle,
        avatarUrl: data.profilePhoto || "",
        interests: data.interests || [],
        builderRequestSpaces: data.builderRequestSpaces || [],
        consentGiven: data.acceptedTerms && data.acceptedPrivacy,
        bio: data.bio?.trim() ? data.bio.trim() : undefined,
        livingSituation: data.livingSituation,
      };

      const result = await onboardingBridge.completeOnboarding(onboardingData);

      if (!result.success) {
        throw new Error(result.error || "Onboarding completion failed");
      }

      await onboardingBridge.createPostOnboardingSpaces(onboardingData);

      setCurrentStep(totalSteps);

      setTimeout(() => {
        router.push("/feed");
      }, 1000);
    } catch (error) {
      let userFriendlyError = "Something went wrong during setup.";

      if (error instanceof Error) {
        const message = error.message;

        if (message.includes("handle") && message.includes("taken")) {
          userFriendlyError = "That handle is already in use.";
        } else if (message.includes("handle") && message.includes("invalid")) {
          userFriendlyError = "Handle must use letters, numbers, dots, hyphens, or underscores.";
        } else if (message.includes("network") || message.includes("fetch")) {
          userFriendlyError = "Network error. Try again in a moment.";
        } else if (message.includes("consent") || message.includes("terms")) {
          userFriendlyError = "Please accept the terms and privacy policy.";
        } else if (message.includes("authentication") || message.includes("token")) {
          userFriendlyError = "Session expired. Please sign in again.";
          setTimeout(() => {
            router.push("/schools");
          }, 1500);
        } else if (message.includes("email") && message.includes("duplicate")) {
          userFriendlyError = "An account with this email already exists.";
        } else if (message.includes("server") || message.includes("500")) {
          userFriendlyError = "Server error. Please try again soon.";
        } else if (message.includes("required")) {
          userFriendlyError = "Fill out the required fields before continuing.";
        } else {
          userFriendlyError = message;
        }
      }

      setError(userFriendlyError);

      setTimeout(() => {
        setError(null);
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StepComponent = activeStep?.component;
  const stepNumber = totalSteps > 0 ? Math.min(currentStep + 1, totalSteps) : 1;
  const safeTotalSteps = Math.max(totalSteps, 1);

  const handleContinue = () => {
    if (isLastStep) {
      void handleSubmit();
    } else {
      goNext();
    }
  };

  if (totalSteps > 0 && currentStep >= totalSteps) {
    const firstName = data.fullName?.split(" ")[0] || data.firstName || "there";
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--hive-background-primary)] px-6">
        <div className="max-w-md space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-[var(--hive-text-primary)]">
            Welcome to HIVE, {firstName}!
          </h2>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Your UB feed is loading. Hang tight while we finish setting things up.
          </p>
        </div>
      </div>
    );
  }

  const mode: "calm" | "warm" | "celebrate" = (() => {
    switch (activeStep?.id) {
      case "welcome":
      case "interests":
      case "builder":
        return "warm";
      case "complete":
        return "celebrate";
      default:
        return "calm";
    }
  })();

  const headerSlot = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <HiveLogo size="default" showText variant="gradient" />
        <span className="hidden text-sm font-medium text-[var(--hive-text-secondary)] sm:inline">
          Step {stepNumber} of {safeTotalSteps}
        </span>
      </div>
    </div>
  );

  const footerSlot = (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
      <span>
        Need help?{" "}
        <a className="text-[var(--hive-brand-primary)] hover:underline" href="mailto:support@hivecampus.com">
          support@hivecampus.com
        </a>
      </span>
      <div className="flex gap-3">
        <a className="hover:underline" href="/legal/terms">
          Terms
        </a>
        <a className="hover:underline" href="/legal/privacy">
          Privacy
        </a>
      </div>
    </div>
  );

  return (
    <AuthOnboardingLayout mode={mode} headerSlot={headerSlot} footerSlot={footerSlot}>
      <div className="flex w-full flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <OnboardingFrame
            step={currentStep}
            totalSteps={safeTotalSteps}
            title={activeStep?.title ?? "Onboarding"}
            description={activeStep?.description}
            mode={mode}
            onBack={isFirstStep ? undefined : goBack}
            onContinue={handleContinue}
            continueLabel={isLastStep ? "Finish setup" : "Continue"}
            continueDisabled={!canGoNext() || isSubmitting}
            isSubmitting={isSubmitting}
          >
            <MobileSummary currentStep={stepNumber} totalSteps={safeTotalSteps} stepTitle={activeStep?.title} />

            {error && (
              <div className="rounded-xl border border-[var(--hive-status-error)]/40 bg-[var(--hive-status-error)]/10 px-4 py-3 text-sm text-[var(--hive-status-error)]">
                {error}
              </div>
            )}

            {StepComponent && (
              <motion.div
                key={activeStep?.id ?? currentStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="space-y-6"
              >
                <StepComponent data={data} updateData={updateData} onNext={handleContinue} />
              </motion.div>
            )}
          </OnboardingFrame>
        </div>

        <aside className="hidden w-full max-w-sm flex-col gap-5 lg:flex">
          <StepIndicator currentStep={currentStep} stepTitles={steps.map((s) => s.title)} />
          <CampusMessageCard />
          <ProfilePreviewCard data={data} />
        </aside>
      </div>

      <div className="mt-6 flex flex-col gap-4 lg:hidden">
        <CampusMessageCard />
        <ProfilePreviewCard data={data} />
      </div>
    </AuthOnboardingLayout>
  );
}
