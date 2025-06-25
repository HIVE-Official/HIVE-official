"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@hive/ui";
import { PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
// import Confetti from 'react-confetti'; // Assuming this library is installed

export default function OnboardingCompletePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // This is to make sure confetti animation has a moment to shine
  useEffect(() => {
    const timer = setTimeout(() => {
      // Call the function to mark onboarding as complete
      const complete = async () => {
        // const functions = getFunctions();
        // const onboardingComplete = httpsCallable(functions, 'onboardingComplete');
        // await onboardingComplete();
        console.log("Finalizing onboarding...");
      };
      complete();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsLoading(true);
    router.push("/feed");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* <Confetti width={window.innerWidth} height={window.innerHeight} /> */}
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800 text-center animate-in fade-in-50 zoom-in-95">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 ring-2 ring-yellow-500/20">
            <PartyPopper className="w-8 h-8 text-yellow-500" />
          </div>
          <CardTitle className="text-white text-2xl">
            You&apos;re all set!
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Welcome to the HIVE. You&apos;re now ready to explore what&apos;s
            happening on campus.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleEnter}
            className="w-full bg-yellow-500 text-black hover:bg-yellow-600 text-lg py-6"
            disabled={isLoading}
          >
            Enter HIVE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
