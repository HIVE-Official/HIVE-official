import { type Metadata } from "next";
import { OnboardingStepClient } from './onboarding-step-client';

interface OnboardingStepPageProps {
  params: {
    step: string;
  };
}

export const metadata: Metadata = {
  title: "Onboarding | HIVE",
  description: "Complete your HIVE profile setup",
};

export default function OnboardingStepPage({ params }: OnboardingStepPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <OnboardingStepClient step={params.step as any} />
    </div>
  );
}
