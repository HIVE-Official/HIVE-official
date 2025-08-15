"use client";

import { useEffect, useState, Suspense } from "react";

// Force dynamic rendering to avoid SSG issues with auth
export const dynamic = 'force-dynamic';
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useUnifiedAuth, HiveButton } from "@hive/ui";
import { AuthLayout } from "../../../components/auth/auth-layout";
import { AuthStatus } from "../../../components/auth/auth-status";

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const unifiedAuth = useUnifiedAuth();
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleMagicLink = async () => {
      try {
        // Check if UnifiedAuth has Firebase integration and can handle email link
        if (unifiedAuth && typeof unifiedAuth.verifyMagicLink === 'function') {
          const urlParams = new URLSearchParams(window.location.search);
          const oobCode = urlParams.get('oobCode');
          const token = urlParams.get('token');
          const email = urlParams.get('email');
          const schoolId = urlParams.get('schoolId');
          
          // Get email from URL or fallback to stored email
          const userEmail = email || (typeof window !== 'undefined' ? window.localStorage.getItem("emailForSignIn") : null);
          
          if (!userEmail) {
            setStatus("error");
            setError("Email is required to complete sign in. Please use the magic link from your email or try signing in again.");
            return;
          }

          if (!schoolId) {
            setStatus("error");
            setError("School information is missing. Please try signing in again from the school selection page.");
            return;
          }

          // Validate that we have a token or code
          const verificationToken = oobCode || token;
          if (!verificationToken && process.env.NODE_ENV === 'production') {
            setStatus("error");
            setError("Invalid or missing verification token. Please use the magic link from your email.");
            return;
          }

          // Use UnifiedAuth to handle the verification
          await unifiedAuth.verifyMagicLink(
            verificationToken || 'DEV_MODE',
            userEmail,
            schoolId
          );

          setStatus("success");

          // Clear any stored error state
          unifiedAuth.clearError();

          // Redirect based on onboarding status with retry logic
          setTimeout(() => {
            try {
              if (unifiedAuth.requiresOnboarding()) {
                router.push("/onboarding");
              } else {
                router.push("/");
              }
            } catch (navigationError) {
              console.error('Navigation error:', navigationError);
              // Fallback navigation
              window.location.href = unifiedAuth.requiresOnboarding() ? "/onboarding" : "/";
            }
          }, 1500);

        } else {
          // Fallback to manual verification if UnifiedAuth doesn't support it
          setStatus("error");
          setError("Authentication system not properly initialized. Please refresh the page and try again.");
          
          // Provide retry mechanism
          setTimeout(() => {
            if (unifiedAuth && !unifiedAuth.isLoading) {
              unifiedAuth.retryInitialization();
            }
          }, 2000);
        }

      } catch (err: any) {
        console.error('Magic link verification error:', err);
        setStatus("error");
        
        // Enhanced error messages
        let errorMessage = "Failed to verify magic link.";
        if (err.message?.includes('expired')) {
          errorMessage = "The magic link has expired. Please request a new one.";
        } else if (err.message?.includes('used')) {
          errorMessage = "This magic link has already been used. Please request a new one.";
        } else if (err.message?.includes('invalid')) {
          errorMessage = "Invalid magic link. Please check the link from your email.";
        } else if (err.message?.includes('network')) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        setError(errorMessage);
      }
    };

    // Only run if auth is initialized and we haven't already processed
    if (!unifiedAuth.isLoading && status === "loading") {
      handleMagicLink();
    }
  }, [router, unifiedAuth, unifiedAuth.isLoading, status]);

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
            <HiveButton
              variant="secondary"
              size="xl"
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
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--hive-background-primary)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[var(--hive-brand-primary)] animate-spin" />
      </div>
    }>
      <VerifyPageContent />
    </Suspense>
  );
}
