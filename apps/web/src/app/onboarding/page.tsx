"use client";
// import { HiveOnboardingV3 } from "@hive/ui";
// import type { OnboardingData } from "@hive/ui";
import { useAuth } from "@hive/auth-logic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logger } from "@hive/core";
import { PageLoader } from "@hive/ui";

// Temporary type definition until UI package is updated
interface OnboardingData {
  fullName: string;
  major: string;
  handle: string;
  avatarUrl?: string;
  isBuilder: boolean;
  legalAccepted: boolean;
}

// Temporary placeholder component until UI package is updated
function HiveOnboardingV3({
  onComplete,
  onStepChange: _onStepChange,
  initialData: _initialData,
  isHandleAvailable: _isHandleAvailable,
}: {
  onComplete: (data: OnboardingData) => Promise<void>;
  onStepChange: (step: number) => void;
  initialData: { email: string };
  isHandleAvailable: (handle: string) => Promise<boolean>;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-01 border border-border rounded-lg p-6 text-center">
        <h1 className="text-h2 font-display font-semibold text-foreground mb-4">
          Complete Your Profile
        </h1>
        <p className="text-body font-sans text-muted mb-6 leading-relaxed">
          Onboarding component is being built. For now, you can skip to the main app.
        </p>
        <button
          onClick={() => {
            // Mock completion data
            void onComplete({
              fullName: "Test User",
              major: "Computer Science",
              handle: "testuser",
              avatarUrl: "",
              isBuilder: false,
              legalAccepted: true,
            });
          }}
          className="w-full bg-accent hover:bg-accent/90 text-background font-semibold py-3 px-4 rounded-lg transition-colors duration-base ease-smooth focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background"
        >
          Continue to HIVE
        </button>
      </div>
    </div>
  );
}

export default function OnboardingV3Page() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [_isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  const isHandleAvailable = async (handle: string) => {
    try {
      const response = await fetch("/api/auth/check-handle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ handle }),
      });
      const data = await response.json();
      return data.available;
    } catch (error) {
      logger.error("Failed to check handle availability", error);
      return false; // Fail securely
    }
  };

  const handleOnboardingComplete = async (data: OnboardingData) => {
    logger.info("🎉 Onboarding completed with data:", data);

    if (!user) {
      logger.error("No authenticated user");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user?.getIdToken) {
        throw new Error("User not authenticated");
      }
      const token = await user.getIdToken();

      // Send onboarding data to complete profile
      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: data.fullName,
          major: data.major,
          handle: data.handle,
          avatarUrl: data.avatarUrl || "",
          builderOptIn: data.isBuilder,
          consentGiven: data.legalAccepted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to complete onboarding");
      }

      // Redirect to welcome page for celebration
      router.push("/welcome");
    } catch (error) {
      logger.error("Onboarding completion failed:", error);
      // Stay on page to allow retry
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepChange = (step: number) => {
    logger.info("📍 Onboarding step changed to:", step);
    // You could track analytics here
  };

  if (isLoading || !user) {
    return <PageLoader message="Loading your profile..." />;
  }

  void router.push('/onboarding/complete');

  return (
    <HiveOnboardingV3
      onComplete={handleOnboardingComplete}
      onStepChange={handleStepChange}
      initialData={{
        email: user.email || "",
      }}
      isHandleAvailable={isHandleAvailable}
    />
  );
}
