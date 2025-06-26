import { type Metadata } from "next";
import OnboardingStepClient from "./onboarding-step-client";

interface OnboardingStepParams {
  params: Promise<{
    step: string;
  }>;
}

export const metadata: Metadata = {
  title: "Onboarding | HIVE",
  description: "Complete your HIVE profile setup",
};

export default async function OnboardingStepPage({ params }: OnboardingStepParams) {
  const { step } = await params;
  return <OnboardingStepClient params={{ step }} />;
}
