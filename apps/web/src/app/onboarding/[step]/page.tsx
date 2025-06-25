"use client";

import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { type Metadata } from "next";
import { AuthUser } from "@hive/auth-logic";

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

// Placeholder for now
// const LeaderQuestionStep = () => <div>Step 2a: Leader Question</div>;
// const AcademicCardStep = () => <div>Step 3: Academic Card</div>;
// const AvatarUploadStep = () => <div>Step 4: Avatar Upload</div>;
// const InterestsStep = () => <div>Step 5: Interests</div>;

interface OnboardingStepProps {
  onNext: (nextStep: number) => void;
  user: AuthUser;
}

const ONBOARDING_STEPS: { [key: number]: React.ComponentType<OnboardingStepProps> } = {
  1: DisplayNameStep,
  2: LeaderQuestionStep,
  3: ClaimSpaceStep,
  3.5: PendingNoticeStep,
  4: AcademicCardStep,
  5: AvatarUploadStep,
  6: InterestsStep,
};

interface OnboardingStepParams {
  params: {
    step: string;
  };
}

export const metadata: Metadata = {
  title: "Onboarding | HIVE",
  description: "Complete your HIVE profile setup",
};

export default function OnboardingStepPage({ params }: OnboardingStepParams) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const stepNumber = parseInt(params.step, 10);

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 7) {
    notFound();
  }

  const CurrentStepComponent = ONBOARDING_STEPS[stepNumber];

  // Redirect if not authenticated or onboarding is complete
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
    // In a real implementation, we'd also check if onboarding is already complete
    // and redirect to /feed if so.
    // const userProfile = getUserProfile(user.uid);
    // if (userProfile.onboardingCompleted) router.push('/feed');
  }, [user, loading, router]);

  const handleNextStep = (nextStep: number) => {
    router.push(`/onboarding/${nextStep}`);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (!CurrentStepComponent) {
    // Handle invalid step number
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Invalid onboarding step. Redirecting...
        {useEffect(() => {
          router.push("/onboarding/1");
        }, [router])}
      </div>
    );
  }

  return <CurrentStepComponent onNext={handleNextStep} user={user} />;
}
