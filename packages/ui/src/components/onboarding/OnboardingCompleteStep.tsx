"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, Sparkles } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "..";

interface OnboardingCompleteStepProps {
  onNext: () => void;
  autoRedirectDelay?: number;
  showRedirectButton?: boolean;
  userDisplayName?: string;
}

export const OnboardingCompleteStep = ({
  onNext,
  autoRedirectDelay = 3000,
  showRedirectButton = false,
  userDisplayName = "there",
}: OnboardingCompleteStepProps) => {
  const [countdown, setCountdown] = useState(
    Math.ceil(autoRedirectDelay / 1000)
  );
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!showRedirectButton) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsRedirecting(true);
            clearInterval(interval);
            setTimeout(onNext, 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [onNext, autoRedirectDelay, showRedirectButton]);

  const handleManualRedirect = () => {
    setIsRedirecting(true);
    onNext();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 text-center">
        <CardHeader className="space-y-6">
          {/* Success Animation */}
          <div className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center relative">
            <CheckCircle className="w-12 h-12 text-green-500" />
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-white text-2xl flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Welcome to HIVE, {userDisplayName}!
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </CardTitle>
            <CardDescription className="text-zinc-400 text-lg">
              You're all set and ready to explore your community.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Feature highlights */}
          <div className="bg-zinc-800/50 rounded-lg p-4 text-left space-y-3">
            <h3 className="text-white font-semibold text-sm">What's next?</h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                Explore Spaces and connect with your community
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                Share your thoughts and discover engaging content
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                Build your profile and showcase your interests
              </li>
            </ul>
          </div>

          {/* Redirect status */}
          {!showRedirectButton ? (
            <div className="flex flex-col items-center gap-3">
              {isRedirecting ? (
                <>
                  <Loader2 className="h-6 w-6 text-yellow-500 animate-spin" />
                  <p className="text-zinc-400 text-sm">
                    Taking you to your feed...
                  </p>
                </>
              ) : (
                <>
                  <Loader2 className="h-6 w-6 text-yellow-500 animate-spin" />
                  <p className="text-zinc-400 text-sm">
                    Redirecting in {countdown} second
                    {countdown !== 1 ? "s" : ""}...
                  </p>
                </>
              )}
            </div>
          ) : (
            <Button
              onClick={handleManualRedirect}
              className="w-full bg-white text-black hover:bg-zinc-100"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entering HIVE...
                </>
              ) : (
                "Enter HIVE"
              )}
            </Button>
          )}

          {/* Footer message */}
          <p className="text-xs text-zinc-500">
            Need help getting started? Check out our{" "}
            <span className="text-yellow-500 cursor-pointer hover:underline">
              community guidelines
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
