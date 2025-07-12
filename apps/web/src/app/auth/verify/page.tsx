"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, RefreshCw, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@hive/ui";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { logger } from "@hive/core";
import { ROUTES } from "@/lib/routes";

interface CountdownRingProps {
  timeLeft: number;
  totalTime: number;
}

function CountdownRing({ timeLeft, totalTime }: CountdownRingProps) {
  const progress = (timeLeft / totalTime) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-surface-03"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-accent transition-all duration-1000 ease-linear"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-mono text-muted">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

// Verification status icon component
interface StatusIconProps {
  status: "waiting" | "verifying" | "success" | "error";
}

function StatusIcon({ status }: StatusIconProps) {
  const iconClass = "w-8 h-8";
  
  switch (status) {
    case "success":
      return <CheckCircle className={`${iconClass} text-accent`} />;
    case "error":
      return <AlertCircle className={`${iconClass} text-foreground`} />;
    case "verifying":
      return <RefreshCw className={`${iconClass} text-accent animate-spin`} />;
    default:
      return <Mail className={`${iconClass} text-muted`} />;
  }
}

// Status header component
interface StatusHeaderProps {
  status: "waiting" | "verifying" | "success" | "error";
  errorMessage?: string;
  email?: string;
}

function StatusHeader({ status, errorMessage, email }: StatusHeaderProps) {
  const getTitle = () => {
    switch (status) {
      case "success":
        return "Welcome to HIVE!";
      case "error":
        return "Verification Failed";
      case "verifying":
        return "Verifying...";
      default:
        return "Check Your Email";
    }
  };

  const getDescription = () => {
    switch (status) {
      case "success":
        return "Setting up your account...";
      case "error":
        return errorMessage;
      case "verifying":
        return "Please wait while we verify your email...";
      default:
        return email 
          ? `We sent a verification email to ${email}. Click the link to sign in.`
          : "We sent you a verification email. Click the link to sign in.";
    }
  };

  return (
    <div className="text-center mb-8">
      <motion.div
        className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
      >
        <StatusIcon status={status} />
      </motion.div>

      <h1 className="text-2xl font-display font-semibold text-foreground mb-2">
        {getTitle()}
      </h1>

      <p className="text-muted font-sans">
        {getDescription()}
      </p>
    </div>
  );
}

// Email verification logic hook
function useEmailVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { update } = useOnboardingStore();
  
  const [verificationStatus, setVerificationStatus] = useState<
    "waiting" | "verifying" | "success" | "error"
  >("waiting");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const verificationInProgress = useRef(false);

  const handleVerification = useCallback(async () => {
    // Prevent duplicate calls
    if (verificationInProgress.current) {
      logger.info("🔥 Verification already in progress, skipping duplicate call");
      return;
    }
    
    verificationInProgress.current = true;
    
    const urlEmail = searchParams.get("email");
    const dev = searchParams.get("dev");
    const storedEmail = typeof window !== "undefined" 
      ? localStorage.getItem("hive-auth-email") 
      : null;
    const finalEmail = urlEmail || storedEmail;

    if (!finalEmail) {
      setVerificationStatus("error");
      setErrorMessage("No email found for verification. Please start the sign-in process again.");
      verificationInProgress.current = false;
      return;
    }

    setVerificationStatus("verifying");

    try {
      const response = await fetch("/api/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: finalEmail,
          url: window.location.href,
          dev: dev || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setVerificationStatus("success");

        // In development mode, skip Firebase auth entirely and just redirect
        if (dev === "true" || process.env.NODE_ENV === "development") {
          logger.info("🔥 Development mode: skipping Firebase auth, redirecting directly", {
            userData: data.user
          });
          
          // Store user data locally for dev mode
          if (typeof window !== "undefined") {
            localStorage.setItem("hive-user-data", JSON.stringify(data.user));
            localStorage.removeItem("hive-auth-email");
          }
        } else {
          // Production magic link flow - try to sign in with Firebase
          try {
            const { signInWithCustomToken } = await import("firebase/auth");
            const { auth } = await import("@hive/core");
            
            await signInWithCustomToken(auth, data.idToken);
            
            // Store user data locally
            if (typeof window !== "undefined") {
              localStorage.setItem("hive-auth-token", data.idToken);
              localStorage.setItem("hive-user-data", JSON.stringify(data.user));
              localStorage.removeItem("hive-auth-email");
            }
          } catch (authError) {
            logger.error("Failed to sign in with custom token", authError);
            setVerificationStatus("error");
            setErrorMessage(`Authentication failed: ${authError instanceof Error ? authError.message : 'Unknown error'}`);
            return;
          }
        }

        // Redirect based on user status
        setTimeout(() => {
          if (data.user.isNewUser) {
            // Transfer school selection data to onboarding store
            const schoolId = localStorage.getItem("hive-selected-school-id");
            const schoolName = localStorage.getItem("hive-selected-school-name");
            // const schoolDomain = localStorage.getItem("hive-selected-school-domain");
            
            if (schoolId && schoolName) {
              update({ 
                schoolId, 
                schoolName,
                email: finalEmail,
                uid: data.user.uid
              });
              
              // Clear temporary localStorage items since they're now in onboarding store
              localStorage.removeItem("hive-selected-school-id");
              localStorage.removeItem("hive-selected-school-name"); 
              localStorage.removeItem("hive-selected-school-domain");
            }
            
            logger.info("🔥 Redirecting new user to onboarding step 1", { 
              schoolId, 
              schoolName,
              email: finalEmail 
            });
            router.push(ROUTES.ONBOARDING.STEP_1);
          } else {
            logger.info("🔥 Redirecting existing user to feed");
            router.push(ROUTES.APP.FEED);
          }
        }, 1000);
      } else {
        setVerificationStatus("error");
        setErrorMessage(data.message || "Verification failed");
      }
    } catch (error) {
      logger.error("Verification error occurred", { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      setVerificationStatus("error");
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      verificationInProgress.current = false;
    }
  }, [searchParams, router, update]);

  return {
    verificationStatus,
    setVerificationStatus,
    errorMessage,
    setErrorMessage,
    email,
    setEmail,
    handleVerification
  };
}

// Timer logic hook
function useVerificationTimer() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resetTimer = () => {
    setTimeLeft(300);
    setCanResend(false);
  };

  return { timeLeft, canResend, resetTimer };
}

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    verificationStatus,
    setVerificationStatus,
    errorMessage,
    setErrorMessage,
    email,
    setEmail,
    handleVerification
  } = useEmailVerification();
  
  const { timeLeft, canResend, resetTimer } = useVerificationTimer();
  const hasAutoVerified = useRef(false);

  // Initialize email and auto-verify
  useEffect(() => {
    const urlEmail = searchParams.get("email");
    const dev = searchParams.get("dev");
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    const storedEmail = typeof window !== "undefined" 
      ? localStorage.getItem("hive-auth-email") 
      : null;
    const finalEmail = urlEmail || storedEmail || "";
    setEmail(finalEmail);

    // Auto-verify if this is a magic link and we haven't already verified
    if (!hasAutoVerified.current && ((oobCode && mode === "signIn") || (dev === "true" && finalEmail))) {
      hasAutoVerified.current = true;
      void handleVerification();
    }
  }, [searchParams, setEmail, handleVerification]);

  const handleResend = async () => {
    if (!email) {
      setErrorMessage("No email found to resend to.");
      return;
    }

    try {
      const response = await fetch("/api/auth/email/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        resetTimer();
        setVerificationStatus("waiting");
        setErrorMessage("");

        if (typeof window !== "undefined") {
          localStorage.setItem("hive-auth-email", email);
        }
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to resend email");
      }
    } catch (error) {
      logger.error("Resend error occurred", { 
        error: error instanceof Error ? error : new Error(String(error))
      });
      setErrorMessage("Network error occurred");
    }
  };

  const renderStateContent = () => {
    switch (verificationStatus) {
      case "waiting":
        return (
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <CountdownRing timeLeft={timeLeft} totalTime={300} />
            <div className="space-y-4">
              <p className="text-sm text-muted font-sans">
                {canResend
                  ? "Didn't receive the email? You can request a new one."
                  : `Email expires in ${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                      .toString()
                      .padStart(2, "0")}`}
              </p>
              <Button
                variant="outline"
                onClick={handleResend}
                disabled={!canResend}
                className="w-full"
              >
                {canResend ? "Resend Email" : "Resend Available Soon"}
              </Button>
            </div>
          </motion.div>
        );
      case "verifying":
        return (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-center">
              <RefreshCw className="w-8 h-8 text-accent animate-spin" />
            </div>
          </motion.div>
        );
      case "success":
        return (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <p className="text-muted font-sans">
              Redirecting you to your dashboard...
            </p>
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Button
              variant="outline"
              onClick={() => router.push(ROUTES.AUTH.SCHOOL_SELECT)}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <StatusHeader 
          status={verificationStatus} 
          errorMessage={errorMessage} 
          email={email} 
        />

        {renderStateContent()}

      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
            <p className="text-muted font-sans">Loading...</p>
          </div>
        </div>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
