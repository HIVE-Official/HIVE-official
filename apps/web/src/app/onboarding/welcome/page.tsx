"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { WelcomeStep } from "@hive/ui";

export default function OnboardingWelcomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [userEmail, setUserEmail] = useState<string | undefined>();

  useEffect(() => {
    // Get user email from auth state or localStorage
    if (user?.email) {
      setUserEmail(user.email);
    } else if (typeof window !== "undefined") {
      const storedEmail = localStorage.getItem("hive-auth-email");
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, [user]);

  const handleNext = () => {
    // Navigate to the first actual onboarding step
    router.push("/onboarding/1");
  };

  // Show loading while auth state is being determined
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent"></div>
      </div>
    );
  }

  return <WelcomeStep onNext={handleNext} userEmail={userEmail} />;
}
