"use client";

import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { AuthUser } from "@hive/auth-logic";
import type { User as _User } from "@hive/core";
import type { Timestamp as _Timestamp } from "firebase/firestore";

// Import step components
import {
  DisplayNameStep,
  LeaderQuestionStep,
  ClaimSpaceStep,
  PendingNoticeStep,
  AcademicCardStep,
  AvatarUploadStep,
  InterestsStep,
} from "@/components/onboarding/steps";

interface OnboardingStepClientProps {
  params: {
    step: string;
  };
}

interface StepProps {
  user: AuthUser;
  onNext: (nextStep?: number) => void;
  onPrev?: () => void;
}

const ONBOARDING_STEPS: { [key: number]: React.FC<StepProps> } = {
  1: DisplayNameStep,
  2: LeaderQuestionStep,
  3: ClaimSpaceStep,
  3.5: PendingNoticeStep,
  4: AcademicCardStep,
  5: AvatarUploadStep,
  6: InterestsStep,
};

export default function OnboardingStepClient({ params }: OnboardingStepClientProps) {
  const router = useRouter();
  const { user: authUser, isLoading } = useAuth();
  const stepNumber = parseFloat(params.step);

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/auth/check-email");
    }
  }, [authUser, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!authUser) {
    return null;
  }

  const StepComponent = ONBOARDING_STEPS[stepNumber];

  if (!StepComponent) {
    notFound();
  }

  const handleNext = (nextStep?: number) => {
    const next = nextStep ?? stepNumber + 1;
    router.push(`/onboarding/${next}`);
  };

  const handlePrev = () => {
    const prev = stepNumber - 1;
    if (prev >= 1) {
      router.push(`/onboarding/${prev}`);
    }
  };

  return <StepComponent user={authUser} onNext={handleNext} onPrev={handlePrev} />;
} 