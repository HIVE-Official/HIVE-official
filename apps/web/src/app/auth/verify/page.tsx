"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { Loader2 } from "lucide-react";
import { useAuth } from "@hive/auth-logic";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signInWithCustomToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("No verification token found. Please try signing in again.");
      return;
    }

    const verify = async () => {
      try {
        // const functions = getFunctions();
        // const verifyMagicLink = httpsCallable(functions, 'verifyMagicLink');
        // const result = await verifyMagicLink({ token });
        // const { customToken } = result.data;

        // Mocking the result for now
        const customToken = "mock-custom-token";
        if (!customToken) {
          throw new Error("Verification failed. Please try again.");
        }

        await signInWithCustomToken(customToken);

        // On success, redirect to the first step of onboarding
        router.push("/onboarding/1");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred during verification."
        );
      }
    };

    verify();
  }, [searchParams, router, signInWithCustomToken]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 text-center">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            {error ? "Verification Failed" : "Verifying your link"}
          </CardTitle>
          <CardDescription className="text-zinc-400">
            {error
              ? "There was a problem verifying your sign-in link."
              : "Please wait a moment..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Loader2 className="mx-auto h-12 w-12 text-yellow-500 animate-spin" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyContent />
    </Suspense>
  );
}
