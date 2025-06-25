"use client";

import { HiveOnboardingV3 } from "@hive/ui";
import type { OnboardingData } from "@hive/ui";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@hive/auth-logic";
import { logger } from "@hive/core";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [_isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

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
      // Get Firebase ID token for authentication
      const idToken = await user.getIdToken();

      // Send onboarding data to complete profile
      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
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

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-[#FFD700] text-lg font-sans">Loading...</div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!user) {
    return null;
  }

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
