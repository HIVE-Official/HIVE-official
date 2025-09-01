"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ROUTES } from "@/lib/routes";
import { HiveAuthFlowEnhanced } from "@/components/auth/HiveAuthFlowEnhanced";

export default function AuthPageClient() {
  const router = useRouter();
  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolDomain, setSchoolDomain] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  // Get school from localStorage (set by school selection page)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedSchoolId = localStorage.getItem("hive-selected-school-id");
      const selectedSchoolName = localStorage.getItem("hive-selected-school-name");
      const selectedSchoolDomain = localStorage.getItem("hive-selected-school-domain");
      
      // Force welcome screen for testing - remove this in production
      const forceWelcome = window.location.search.includes('welcome=true');
      
      if (forceWelcome || (!selectedSchoolId || !selectedSchoolName || !selectedSchoolDomain)) {
        // No school selected or forced welcome, show welcome screen
        setShowWelcome(true);
        setIsLoading(false);
      } else {
        setSchoolName(selectedSchoolName);
        setSchoolDomain(selectedSchoolDomain);
        setShowWelcome(false);
        setIsLoading(false);
      }
    }
  }, [router]);

  const handleAuthSuccess = (user: { id: string; email: string; name: string; isNewUser: boolean }) => {
    console.log("Auth completed successfully", { 
      email: user.email, 
      isNewUser: user.isNewUser,
      schoolDomain 
    });
    
    if (user.isNewUser) {
      // New user needs onboarding
      router.push(ROUTES.ONBOARDING.STEP_1);
    } else {
      // Existing user goes to dashboard
      router.push("/");
    }
  };

  // Show loading state while checking school selection
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent"></div>
          <p className="text-white/80 font-sans">Loading...</p>
        </div>
      </div>
    );
  }

  // Show welcome screen if no school selected
  if (showWelcome) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
          className="w-full max-w-md"
        >
          <div 
            className="bg-surface rounded-xl p-8 text-center space-y-6 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
            style={{
              border: '1px solid rgba(255, 215, 0, 0.15)',
            }}
          >
            {/* HIVE Logo/Brand */}
            <div className="space-y-2">
              <h1 className="text-4xl font-sans font-bold text-white">
                HIVE
              </h1>
              <p className="text-white/80 text-lg font-sans">
                The programmable campus layer
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-white/80 leading-relaxed font-sans">
                Find your people, make decisions together, and build tools that spread across campus.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => router.push(ROUTES.AUTH.SCHOOL_SELECT)}
                className="w-full px-6 py-3 font-sans font-bold rounded-xl transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-[1.02] focus:outline-none text-white"
                style={{
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.15)';
                }}
              >
                Get Started
              </button>
            </div>

            {/* Additional Info */}
            <div className="text-xs text-white/80 font-sans">
              Available at select universities
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Use the enhanced @hive/ui auth flow
  return (
    <HiveAuthFlowEnhanced
      onAuthSuccess={handleAuthSuccess}
      initialStep="welcome"
      mockMode={process.env.NODE_ENV === 'development'}
    />
  );
} 