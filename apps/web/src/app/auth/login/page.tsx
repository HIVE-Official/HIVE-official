"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@hive/ui";
import { Input } from "@hive/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { Label } from "@hive/ui";
import { Alert, AlertDescription } from "@hive/ui";
import {
  Loader2,
  Mail,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  University,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface LoginFormData {
  email: string;
}

interface ValidationState {
  isValid: boolean;
  error?: string;
  suggestion?: string;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const schoolId = searchParams.get("schoolId");
  const schoolName = searchParams.get("schoolName");
  const schoolDomain = searchParams.get("domain");

  const [formData, setFormData] = useState<LoginFormData>({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [_resendCount, setResendCount] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if no school context
  useEffect(() => {
    if (mounted && (!schoolId || !schoolName || !schoolDomain)) {
      router.push("/campus");
    }
  }, [mounted, schoolId, schoolName, schoolDomain, router]);

  // Cooldown timer
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldownTime]);

  // Email validation
  const validation = useMemo((): ValidationState => {
    if (!formData.email) {
      return { isValid: false };
    }

    const email = formData.email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return {
        isValid: false,
        error: "Please enter a valid email address",
      };
    }

    const domain = email.split("@")[1];
    const expectedDomain = schoolDomain?.toLowerCase();

    if (expectedDomain && domain !== expectedDomain) {
      const suggestion = `${email.split("@")[0]}@${expectedDomain}`;
      return {
        isValid: false,
        error: `Please use your ${schoolName} email address`,
        suggestion,
      };
    }

    return { isValid: true };
  }, [formData.email, schoolDomain, schoolName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.isValid || cooldownTime > 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.toLowerCase().trim(),
          schoolId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setCooldownTime(60); // 1 minute cooldown
          throw new Error(
            "Too many attempts. Please wait before trying again."
          );
        }
        throw new Error(data.error || "Failed to send magic link");
      }

      setSuccess(true);
      setResendCount((prev) => prev + 1);
      // Track resend analytics
      console.log(`Magic link sent (attempt ${_resendCount + 1})`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
    setError(null);
  };

  const handleSuggestionClick = () => {
    if (validation.suggestion) {
      setFormData({ email: validation.suggestion });
    }
  };

  const handleResend = () => {
    setSuccess(false);
    setCooldownTime(30); // 30 second cooldown for resends
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent" />

        <Card className="w-full max-w-md bg-zinc-900/95 border-zinc-800 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 ring-2 ring-yellow-500/20">
              <Mail className="w-8 h-8 text-yellow-500" />
            </div>
            <CardTitle className="text-white text-xl">
              Check your inbox
            </CardTitle>
            <CardDescription className="text-zinc-400">
              We&apos;ve sent a secure link to
              <br />
              <span className="text-white font-medium">{formData.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Instructions */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-500 text-xs font-bold">1</span>
                </div>
                <div className="text-zinc-300">
                  Check your email inbox (and spam folder)
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-500 text-xs font-bold">2</span>
                </div>
                <div className="text-zinc-300">
                  Click the secure sign-in link
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-yellow-500 text-xs font-bold">3</span>
                </div>
                <div className="text-zinc-300">
                  You&apos;ll be automatically signed in to HIVE
                </div>
              </div>
            </div>

            {/* Security note */}
            <div className="flex items-center gap-2 p-3 bg-zinc-800/50 rounded-lg">
              <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
              <p className="text-xs text-zinc-400">
                This link is secure and will expire in{" "}
                <span className="text-white font-medium">15 minutes</span>
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-zinc-700 hover:bg-zinc-800"
                onClick={handleResend}
                disabled={cooldownTime > 0}
              >
                {cooldownTime > 0 ? (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Resend in {cooldownTime}s
                  </>
                ) : (
                  "Send another link"
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full text-zinc-400 hover:text-white"
                onClick={() => setSuccess(false)}
              >
                Use a different email
              </Button>
            </div>

            {/* Help */}
            <div className="text-center">
              <p className="text-xs text-zinc-500">
                Having trouble?{" "}
                <Link
                  href="/help"
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  Contact support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent" />

      <Card className="w-full max-w-md bg-zinc-900/95 border-zinc-800 backdrop-blur-sm z-10">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 ring-2 ring-yellow-500/20">
            <University className="w-6 h-6 text-yellow-500" />
          </div>
          <CardTitle className="text-white text-xl">
            {schoolName || "Welcome"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Sign in or create an account to join HIVE
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-400">
                School Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="email"
                  placeholder={`your-name@${schoolDomain || "university.edu"}`}
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  className="pl-9 bg-zinc-900 border-zinc-700 text-white focus:ring-yellow-500"
                  required
                />
              </div>
            </div>

            {/* Validation Feedback */}
            {formData.email && !validation.isValid && validation.error && (
              <div className="flex items-start gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{validation.error}</p>
                  {validation.suggestion && (
                    <button
                      type="button"
                      onClick={handleSuggestionClick}
                      className="text-yellow-400 hover:text-yellow-300 font-medium underline mt-1"
                    >
                      Use {validation.suggestion}
                    </button>
                  )}
                </div>
              </div>
            )}
            {formData.email && validation.isValid && (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle className="w-4 h-4" />
                <p>Looks good!</p>
              </div>
            )}

            {error && (
              <Alert
                variant="destructive"
                className="bg-red-900/20 border-red-500/30 text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-zinc-900 font-bold"
              disabled={!validation.isValid || isLoading || cooldownTime > 0}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Continue with Email"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-zinc-500">
              Can&apos;t access your student email?{" "}
              <Link
                href="/support/contact"
                className="underline text-zinc-400 hover:text-white"
              >
                Contact support
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      <Link
        href="/campus"
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors z-20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to campus search</span>
      </Link>
    </div>
  );
}
