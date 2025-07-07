"use client";

import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { AlumniComingSoonStep } from "@hive/ui";
import { ROUTES } from "@/lib/routes";

export default function AlumniSoonPage() {
  const router = useRouter();
  const { data: onboardingData } = useOnboardingStore();

  const handleBack = () => {
    router.push(ROUTES.ONBOARDING.STEP_1);
  };

  return (
    <AlumniComingSoonStep
      onBack={handleBack}
      schoolName={onboardingData?.schoolName || "University at Buffalo"}
      userEmail={onboardingData?.email || ""}
    />
  );
}