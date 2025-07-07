"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { OnboardingCompleteStep } from "@hive/ui";
import { ROUTES } from "@/lib/routes";
import { logger } from "@hive/core";
import { motion } from "framer-motion";

export default function OnboardingCompletePage() {
  const router = useRouter();
  const { data: onboardingData } = useOnboardingStore();
  const [status, setStatus] = useState<"saving" | "success" | "error">("saving");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const completeOnboarding = async () => {
      try {
        // Get user data from localStorage (set during verification)
        const storedUserData = localStorage.getItem("hive-user-data");
        if (!storedUserData) {
          throw new Error("No user data found");
        }

        const userData = JSON.parse(storedUserData);
        
        // Save onboarding completion to backend
        const response = await fetch("/api/onboarding/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: userData.uid,
            onboardingData,
          }),
        });

        const result = await response.json();

        if (response.ok && result.ok) {
          setStatus("success");
          // Don't auto-redirect - let user click to enter HIVE
        } else {
          throw new Error(result.error || "Failed to complete onboarding");
        }
      } catch (error) {
        logger.error("Onboarding completion error:", error);
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Unknown error");
      }
    };

    if (onboardingData) {
      completeOnboarding();
    } else {
      // No onboarding data, redirect to start
      router.push(ROUTES.ONBOARDING.STEP_2);
    }
  }, [onboardingData, router]);

  const handleGoToFeed = () => {
    router.push(ROUTES.APP.FEED);
  };

  // Show saving state
  if (status === "saving") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
        </div>

        <motion.div 
          className="w-full max-w-lg module-border module-surface module-padding text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Loader2 className="w-8 h-8 text-accent animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                Completing Your Setup...
              </h2>
              <p className="text-muted font-body">
                Just a moment while we save your profile.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show error state
  if (status === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
        </div>

        <motion.div 
          className="w-full max-w-lg module-border module-surface module-padding text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-y-6">
            <div className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-muted" />
            </div>
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                Setup Error
              </h2>
              <p className="text-muted font-body">
                {errorMessage || "Something went wrong. Please try again."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show success completion with branded component
  return (
    <OnboardingCompleteStep
      onGoToFeed={handleGoToFeed}
      userName={onboardingData?.displayName?.split(' ')[0] || "there"}
      majorName={onboardingData?.major}
      graduationYear={onboardingData?.graduationYear}
      schoolName={onboardingData?.schoolName}
    />
  );
}
