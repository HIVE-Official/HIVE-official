"use client";

import { useEffect, useState, Suspense } from "react";

// Force dynamic rendering to avoid SSG issues with auth
export const dynamic = "force-dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@hive/auth-logic";
import { HiveButton } from "@hive/ui";
import { AuthLayout } from "../../../components/auth/auth-layout";
import { AuthStatus } from "../../../components/auth/auth-status";

function VerifyPageContent() {
  const router = useRouter();
  const unifiedAuth = useAuth();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMagicLink = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const oobCode = urlParams.get("oobCode");
        const token = urlParams.get("token");
        const email = urlParams.get("email");
        const schoolId = urlParams.get("schoolId");

        // Get email from URL or fallback to stored email
        const userEmail =
          email ||
          (typeof window !== "undefined"
            ? window.localStorage.getItem("emailForSignIn")
            : null);

        if (!userEmail) {
          setStatus("error");
          setError(
            "Email is required to complete sign in. Please use the magic link from your email or try signing in again."
          );
          return;
        }

        if (!schoolId) {
          setStatus("error");
          setError(
            "School information is missing. Please try signing in again from the school selection page."
          );
          return;
        }

        // Validate that we have a token or code
        const verificationToken = oobCode || token;
        if (!verificationToken && process.env.NODE_ENV === "production") {
          setStatus("error");
          setError(
            "Invalid or missing verification token. Please use the magic link from your email."
          );
          return;
        }

        // Call the API to verify the magic link
        const response = await fetch("/api/auth/verify-magic-link", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: verificationToken || "DEV_MODE",
            email: userEmail,
            schoolId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to verify magic link");
        }

        // Handle development mode session
        if (data.devMode && data.sessionData) {
          // Store session in localStorage for development
          window.localStorage.setItem('hive_session', JSON.stringify(data.sessionData));
          console.log('🔧 Development session created:', data.sessionData);
        }

        setStatus("success");

        // Clear any stored error state
        if (unifiedAuth?.clearError) {
          unifiedAuth.clearError();
        }

        // Redirect based on onboarding status
        setTimeout(() => {
          // In development mode with sessionData, skip onboarding
          if (data.devMode && data.sessionData) {
            router.push("/profile");
          } else if (data.needsOnboarding) {
            router.push("/onboarding");
          } else {
            router.push("/profile");
          }
        }, 1500);
      } catch (err: any) {
        console.error("Magic link verification error:", err);
        setStatus("error");

        // Enhanced error messages
        let errorMessage = "Failed to verify magic link.";
        if (err.message?.includes("expired")) {
          errorMessage =
            "The magic link has expired. Please request a new one.";
        } else if (err.message?.includes("used")) {
          errorMessage =
            "This magic link has already been used. Please request a new one.";
        } else if (err.message?.includes("invalid")) {
          errorMessage =
            "Invalid magic link. Please check the link from your email.";
        } else if (err.message?.includes("network")) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (err.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      }
    };

    // Only run once when page loads
    if (status === "loading") {
      handleMagicLink();
    }
  }, [router, unifiedAuth, status]);

  return (
    <AuthLayout title="Verifying Access">
      {status === "loading" && (
        <AuthStatus
          type="loading"
          title="Verifying your access"
          message="Please wait while we verify your magic link"
        />
      )}

      {status === "success" && (
        <AuthStatus
          type="success"
          title="Welcome to HIVE!"
          message="You've been successfully signed in. Taking you to your digital campus..."
        />
      )}

      {status === "error" && (
        <AuthStatus
          type="error"
          title="Verification Failed"
          message={
            error ||
            "Unable to verify your magic link. The link may have expired or been used already."
          }
          action={
            <HiveButton
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={() => router.push("/schools")}
            >
              Try again
            </HiveButton>
          }
        />
      )}
    </AuthLayout>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-[var(--hive-brand-primary)] animate-spin" />
        </div>
      }
    >
      <VerifyPageContent />
    </Suspense>
  );
}
