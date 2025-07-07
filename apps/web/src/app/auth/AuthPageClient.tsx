"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { EmailGate } from "@hive/ui";
import { logger } from "@hive/core";

export default function AuthPageClient() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolDomain, setSchoolDomain] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Get school from localStorage (set by school selection page)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedSchoolId = localStorage.getItem("hive-selected-school-id");
      const selectedSchoolName = localStorage.getItem("hive-selected-school-name");
      const selectedSchoolDomain = localStorage.getItem("hive-selected-school-domain");
      
      if (selectedSchoolId && selectedSchoolName && selectedSchoolDomain) {
        setSchoolName(selectedSchoolName);
        setSchoolDomain(selectedSchoolDomain);
        setIsLoading(false);
      } else {
        // No school selected, redirect to school selection
        router.push(ROUTES.AUTH.SCHOOL_SELECT);
      }
    }
  }, [router]);

  const handleEmailSuccess = (email: string) => {
    logger.info("Magic link sent successfully", { email, schoolDomain });
    router.push(`${ROUTES.AUTH.CHECK_EMAIL}?email=${encodeURIComponent(email)}`);
  };

  const handleBack = () => {
    router.push(ROUTES.AUTH.SCHOOL_SELECT);
  };

  // Show loading state while checking school selection
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
          <p className="text-muted font-sans">Loading...</p>
        </div>
      </div>
    );
  }

  const selectedSchoolId = typeof window !== "undefined" ? localStorage.getItem("hive-selected-school-id") : null;

  if (!selectedSchoolId) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <EmailGate
        schoolName={schoolName}
        schoolDomain={schoolDomain}
        schoolId={selectedSchoolId}
        onSuccess={handleEmailSuccess}
        onBack={handleBack}
        showTermsAndPrivacy={true}
        backLinkHref="/auth/school-select"
      />
    </div>
  );
} 