"use client";
// import { HiveOnboardingV3 } from "@hive/ui";
// import type { OnboardingData } from "@hive/ui";
import { useAuth } from "@hive/auth-logic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

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
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          Complete Your Profile
        </h1>
        <p className="text-zinc-400 mb-6">
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
          className="w-full bg-accent hover:bg-accent-600 text-background font-semibold py-3 px-4 rounded-md transition-colors"
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      console.error("Failed to check handle availability", error);
      return false; // Fail securely
    }
  };

  const handleOnboardingComplete = async (data: OnboardingData) => {
    console.info("🎉 Onboarding completed with data:", data);

    if (!user) {
      console.error("No authenticated user");
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
      console.error("Onboarding completion failed:", error);
      // Stay on page to allow retry
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStepChange = (step: number) => {
    console.info("📍 Onboarding step changed to:", step);
    // You could track analytics here
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-yellow-500 animate-spin" />
      </div>
    );
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
