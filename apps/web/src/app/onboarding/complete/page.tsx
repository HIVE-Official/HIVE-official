"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { logger } from "@hive/core";
import { Button } from "@hive/ui";
import { Loader2 } from "lucide-react";

export default function OnboardingCompletePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const completeOnboarding = async () => {
      if (!user) {
        logger.error("No authenticated user found");
        router.push("/auth/email");
        return;
      }

      try {
        // TODO: Mark onboarding as complete in user profile
        logger.info("Marking onboarding as complete for user:", user.uid);
        
        // Redirect to feed
        router.push("/feed");
      } catch (error) {
        logger.error("Failed to complete onboarding", error);
      }
    };

    if (!isLoading && user) {
      void completeOnboarding();
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted" />
          <p className="text-muted">Completing your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 p-4">
        <h1 className="text-2xl font-bold">Welcome to HIVE!</h1>
        <p className="text-center text-muted-foreground">
          We&apos;re setting up your profile. You&apos;ll be redirected to your feed in a moment.
        </p>
        <Button
          variant="outline"
          onClick={() => router.push("/feed")}
          className="mt-4"
        >
          Go to Feed
        </Button>
      </div>
    </div>
  );
}
