"use client";
import React from "react";
// Unused imports removed - will be used when welcome page is fully implemented
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { WelcomeMat } from "@hive/ui";
// import { SchoolSearch } from "@hive/ui";
// import { Logo } from "@hive/ui";
// import { AnimatePresence, motion } from "framer-motion";
// import { logger } from "@hive/core";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-6xl font-bold text-accent mb-6">
          Welcome to HIVE!
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          You&apos;re now part of the campus community. 
          Start exploring spaces and connecting with fellow students.
        </p>
        <div className="space-y-4">
          <p className="text-gray-500">
            Welcome page components are being built. 
            This will soon include onboarding celebration and next steps.
          </p>
        </div>
      </div>
    </div>
  );
}
