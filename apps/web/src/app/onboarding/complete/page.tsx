"use client";

import { useRouter } from "next/navigation";
// import { useAuth } from "@hive/auth-logic"; // Unused import removed
import { useEffect, useState } from "react";
import { logger } from "@hive/core";
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
        logger.info("Finalizing onboarding...");
      };
      void complete();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsLoading(true);
    void router.push("/feed");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* <Confetti width={window.innerWidth} height={window.innerHeight} /> */}
      <div className="w-full max-w-lg bg-zinc-900 border-zinc-800 text-center animate-in fade-in-50 zoom-in-95">
        <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 ring-2 ring-yellow-500/20">
          <div className="w-8 h-8 text-yellow-500">
            {/* <PartyPopper className="w-8 h-8 text-yellow-500" /> */}
          </div>
        </div>
        <h2 className="text-white text-2xl">
          You&apos;re all set!
        </h2>
        <p className="text-zinc-400">
          Welcome to the HIVE. You&apos;re now ready to explore what&apos;s
          happening on campus.
        </p>
        <button
          onClick={handleEnter}
          className="w-full bg-yellow-500 text-black hover:bg-yellow-600 text-lg py-6"
          disabled={isLoading}
        >
          Enter HIVE
        </button>
      </div>
    </div>
  );
}
