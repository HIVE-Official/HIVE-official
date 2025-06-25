"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@hive/ui/components/auth/AuthForm";
import { logger } from "@hive/core";
// We need to figure out where to get this from now
// import { sendMagicLink } from '@hive/auth-logic';

export default function AuthPage() {
  const router = useRouter();
  // Hardcoding for UB for this slice
  const schoolName = "University at Buffalo";
  const schoolDomain = "buffalo.edu";

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    setError(null);

    try {
      // await sendMagicLink({ email: email.toLowerCase().trim(), schoolId: 'buffalo' });
      logger.info("Requesting magic link for:", email);
      router.push(`/auth/check-email?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      schoolName={schoolName}
      schoolDomain={schoolDomain}
      email={email}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      validationError={validation.error}
      isSubmitDisabled={!validation.isValid}
      backLinkHref="/campus"
    />
  );
}
