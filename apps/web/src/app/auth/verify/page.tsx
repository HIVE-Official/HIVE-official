"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "../../../components/auth/auth-layout";
import { AuthStatus } from "../../../components/auth/auth-status";

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMagicLink = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const oobCode = urlParams.get('oobCode');
        const mode = urlParams.get('mode');
        const email = urlParams.get('email');
        const schoolId = urlParams.get('schoolId');
        
        // Get email from URL or local storage
        let userEmail = email || window.localStorage.getItem("emailForSignIn");
        
        if (!userEmail) {
          userEmail = window.prompt("Please provide your email for confirmation:");
        }

        if (!userEmail) {
          setStatus("error");
          setError("Email is required to complete sign in");
          return;
        }

        if (!schoolId) {
          setStatus("error");
          setError("School information is missing");
          return;
        }

        // Clear email from local storage
        window.localStorage.removeItem("emailForSignIn");

        // Call our backend API to verify the magic link
        const response = await fetch('/api/auth/verify-magic-link', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userEmail,
            schoolId: schoolId,
            token: oobCode || 'DEV_MODE', // Use oobCode as token, fallback to DEV_MODE
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify magic link');
        }

        setStatus("success");

        // Store user session info for the frontend
        if (data.userId) {
          // For development mode, we can store some basic info
          const userSession = {
            userId: data.userId,
            email: userEmail,
            schoolId: schoolId,
            needsOnboarding: data.needsOnboarding,
            verifiedAt: new Date().toISOString(),
          };
          
          window.localStorage.setItem('hive_session', JSON.stringify(userSession));
          
          // Set development mode flag if needed
          if (oobCode === 'DEV_MODE') {
            window.localStorage.setItem('dev_auth_mode', 'true');
          }
        }

        // Redirect based on onboarding status
        setTimeout(() => {
          if (data.needsOnboarding) {
            router.push("/onboarding");
          } else {
            router.push("/");
          }
        }, 1500);

      } catch (err: any) {
        console.error("Magic link verification error:", err);
        setStatus("error");
        setError(err.message || "Failed to verify magic link. The link may have expired or been used already.");
      }
    };

    // Run magic link verification
    handleMagicLink();
  }, [router]);

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
          message={error || "Unable to verify your magic link. The link may have expired or been used already."}
          action={
            <button
              className="w-full hive-button-secondary px-6 py-3"
              onClick={() => router.push("/schools")}
            >
              Try again
            </button>
          }
        />
      )}
    </AuthLayout>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[var(--hive-brand-primary)] animate-spin" />
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  );
}
