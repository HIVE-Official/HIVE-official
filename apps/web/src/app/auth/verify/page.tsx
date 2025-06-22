"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import {
  Loader2,
  CheckCircle,
  XCircle,
  RefreshCw,
  Mail,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@hive/ui";

type VerificationStatus = "loading" | "success" | "error" | "expired" | "used";

interface VerificationError {
  type: "expired" | "used" | "invalid" | "network" | "server";
  message: string;
  canRetry: boolean;
}

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [error, setError] = useState<VerificationError | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const parseError = (errorMessage: string): VerificationError => {
    const lowerError = errorMessage.toLowerCase();

    if (lowerError.includes("expired")) {
      return {
        type: "expired",
        message:
          "This verification link has expired. Links are valid for 10 minutes.",
        canRetry: true,
      };
    }

    if (lowerError.includes("used") || lowerError.includes("already")) {
      return {
        type: "used",
        message: "This verification link has already been used.",
        canRetry: false,
      };
    }

    if (lowerError.includes("invalid") || lowerError.includes("not found")) {
      return {
        type: "invalid",
        message: "This verification link is invalid or malformed.",
        canRetry: true,
      };
    }

    if (lowerError.includes("network") || lowerError.includes("fetch")) {
      return {
        type: "network",
        message: "Network error. Please check your connection and try again.",
        canRetry: true,
      };
    }

    return {
      type: "server",
      message: "Something went wrong on our end. Please try again.",
      canRetry: true,
    };
  };

  const verifyToken = async (isRetry = false) => {
    if (isRetry) {
      setRetrying(true);
    }

    try {
      const response = await fetch("/api/auth/verify-magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const data = (await response.json()) as {
        error?: string;
        needsOnboarding?: boolean;
        user?: { name?: string };
      };

      if (!response.ok) {
        const errorInfo = parseError(data.error || "Verification failed");
        setError(errorInfo);
        setStatus("error");
        return;
      }

      setStatus("success");

      // Start countdown for redirect
      let countdown = 3;
      const countdownInterval = setInterval(() => {
        countdown--;
        setRedirectCountdown(countdown);

        if (countdown <= 0) {
          clearInterval(countdownInterval);
          // Redirect based on user status
          if (data.needsOnboarding) {
            void router.push("/onboarding");
          } else {
            void router.push("/feed");
          }
        }
      }, 1000);
    } catch (err) {
      const errorInfo = parseError(
        err instanceof Error ? err.message : "Network error"
      );
      setError(errorInfo);
      setStatus("error");
    } finally {
      if (isRetry) {
        setRetrying(false);
      }
    }
  };

  useEffect(() => {
    if (!token) {
      setError({
        type: "invalid",
        message: "No verification token provided in the link.",
        canRetry: true,
      });
      setStatus("error");
      return;
    }

    void verifyToken();
  }, [token]); // router dependency removed to avoid re-runs, verifyToken is stable

  const handleRetry = () => {
    setStatus("loading");
    setError(null);
    void verifyToken(true);
  };

  const getStatusIcon = () => {
    switch (status) {
      case "loading":
        return <Loader2 className="w-6 h-6 text-yellow-500 animate-spin" />;
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "error":
        if (error?.type === "expired") {
          return <Clock className="w-6 h-6 text-orange-500" />;
        }
        if (error?.type === "used") {
          return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
        }
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "loading":
        return "bg-yellow-500/10";
      case "success":
        return "bg-green-500/10";
      case "error":
        if (error?.type === "expired") return "bg-orange-500/10";
        if (error?.type === "used") return "bg-yellow-500/10";
        return "bg-red-500/10";
      default:
        return "bg-red-500/10";
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Main Status Card */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="text-center">
            <div
              className={`mx-auto w-12 h-12 ${getStatusColor()} rounded-full flex items-center justify-center mb-4 transition-all duration-300`}
            >
              {getStatusIcon()}
            </div>

            {status === "loading" && (
              <>
                <CardTitle className="text-white">
                  Verifying Your Link
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  {retrying
                    ? "Retrying verification..."
                    : "Please wait while we verify your magic link"}
                </CardDescription>
              </>
            )}

            {status === "success" && (
              <>
                <CardTitle className="text-white">
                  Welcome to HIVE! 🎉
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  You've been successfully signed in
                </CardDescription>
              </>
            )}

            {status === "error" && (
              <>
                <CardTitle className="text-white">
                  {error?.type === "expired"
                    ? "Link Expired"
                    : error?.type === "used"
                      ? "Link Already Used"
                      : "Verification Failed"}
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  {error?.message || "Unable to verify your magic link"}
                </CardDescription>
              </>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {status === "success" && (
              <div className="text-center space-y-3">
                <p className="text-sm text-zinc-400">
                  Redirecting you to HIVE in {redirectCountdown} seconds...
                </p>
                <div className="w-full bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-in-out"
                    style={{ width: `${((3 - redirectCountdown) / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-4">
                {error?.type === "expired" && (
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <p className="text-sm text-orange-300">
                        Magic links expire after 10 minutes for security.
                      </p>
                    </div>
                  </div>
                )}

                {error?.type === "used" && (
                  <div className="text-center space-y-3">
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-sm text-yellow-300">
                        You may already be signed in. Try accessing HIVE
                        directly.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
                      onClick={() => router.push("/feed")}
                    >
                      Go to HIVE
                    </Button>
                  </div>
                )}

                {error?.canRetry && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleRetry}
                    disabled={retrying}
                  >
                    {retrying ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Retrying...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                      </>
                    )}
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full text-zinc-400 hover:text-white"
                  onClick={() =>
                    router.push(
                      "/auth/login" +
                        (email ? `?email=${encodeURIComponent(email)}` : "")
                    )
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Request New Link
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-zinc-900/50 border-zinc-800">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-white mb-3">Having trouble?</h3>
            <div className="space-y-2 text-sm text-zinc-400">
              <p>• Check that you clicked the most recent link we sent</p>
              <p>• Make sure you're using the same device/browser</p>
              <p>• Links expire after 10 minutes for security</p>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-800">
              <Link
                href="/welcome"
                className="text-sm text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                ← Back to Welcome
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
