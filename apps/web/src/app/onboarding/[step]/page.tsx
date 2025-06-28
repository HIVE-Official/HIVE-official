import { type Metadata } from "next";
import { OnboardingStepClient } from "./onboarding-step-client";

interface OnboardingStepPageProps {
  params: Promise<{
    step: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Onboarding | HIVE",
  description: "Complete your HIVE profile setup",
};

export default async function OnboardingStepPage({ params }: OnboardingStepPageProps) {
  const { step } = await params;
  
  return <OnboardingStepClient step={step as keyof typeof STEPS} />;
}

const STEPS = {
  '1': 'AcademicCard',        // Start with academic info to build trust
  '2': 'SpaceDiscovery',      // Auto-join based on major + choose others
  '3': 'DisplayNameAvatar',   // Personal details after trust established
  '4': 'Interests',           // Refine recommendations
} as const;
