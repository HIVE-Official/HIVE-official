"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { ROUTES } from "@/lib/routes";

export default function FacultyVerifyPage() {
  const router = useRouter();
  const { update } = useOnboardingStore();

  useEffect(() => {
    // Set faculty role in onboarding data
    update({ userRole: "faculty" as const });
    
    // Redirect immediately to space request page
    router.push(ROUTES.SPACES.REQUEST);
  }, [router, update]);

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted font-body">Redirecting to space request...</p>
      </div>
    </div>
  );
}