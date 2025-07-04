"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { AuthForm } from "@hive/ui";
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

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validation = useMemo(() => {
    if (!email) return { isValid: false, error: null };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: "Please enter a valid email address" };
    }
    const domain = email.split("@")[1];
    if (domain.toLowerCase() !== schoolDomain) {
      return {
        isValid: false,
        error: `Please use your ${schoolName} email address`,
      };
    }
    return { isValid: true, error: null };
  }, [email, schoolDomain, schoolName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const selectedSchoolId = localStorage.getItem("hive-selected-school-id");
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          schoolId: selectedSchoolId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send magic link');
      }

      logger.info("Magic link sent successfully", { email, schoolDomain });
      router.push(`${ROUTES.AUTH.CHECK_EMAIL}?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
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

  return (
    <AuthForm
      schoolName={schoolName}
      schoolDomain={schoolDomain}
      email={email}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
      isLoading={isSubmitting}
      error={error}
      validationError={validation.error}
      isSubmitDisabled={!validation.isValid}
      backLinkHref="/auth/school-select"
    />
  );
} 