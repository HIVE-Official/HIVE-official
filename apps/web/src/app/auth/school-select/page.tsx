"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { SchoolPick, HiveLogo, EmailForm } from "@hive/ui";
import { motion, AnimatePresence } from "framer-motion";
import { SCHOOLS, type School, logger } from "@hive/core";
import { ArrowLeft } from "lucide-react";

export default function SchoolSelectPage() {
  const router = useRouter();
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isEmailStep, setIsEmailStep] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSchoolSelect = async (school: School) => {
    // Store selected school in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("hive-selected-school-id", school.id);
      localStorage.setItem("hive-selected-school-name", school.name);
      localStorage.setItem("hive-selected-school-domain", school.domain);
    }

    setSelectedSchool(school);
    setIsEmailStep(true);
  };

  const handleBackToSchools = () => {
    setIsEmailStep(false);
    setSelectedSchool(null);
    setApiError(null);
  };

  const handleEmailSubmit = async ({ email }: { email: string }) => {
    if (!selectedSchool) return;

    setIsLoading(true);
    setApiError(null);

    // Validate email domain matches selected school
    const emailDomain = email.split('@')[1]?.toLowerCase();
    if (emailDomain !== selectedSchool.domain.toLowerCase()) {
      setApiError(`Please use your ${selectedSchool.name} email address`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/email/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          schoolId: selectedSchool.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send magic link');
      }

      logger.info("Magic link sent successfully", { email, schoolDomain: selectedSchool.domain });
      
      // Store email for verification
      if (typeof window !== "undefined") {
        localStorage.setItem("hive-auth-email", email.toLowerCase().trim());
      }
      
      // In development mode, automatically proceed to verification
      if (data.dev_mode || process.env.NODE_ENV === 'development') {
        logger.info("Development mode: Auto-proceeding to verification");
        router.push(`${ROUTES.AUTH.VERIFY}?email=${encodeURIComponent(email)}&dev=true`);
      } else {
        router.push(`${ROUTES.AUTH.CHECK_EMAIL}?email=${encodeURIComponent(email)}`);
      }
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'auth/invalid-email') {
        setApiError('Please enter a valid email address.');
      } else {
        setApiError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        <AnimatePresence mode="wait">
          {!isEmailStep ? (
            <motion.div
              key="school-selection"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
            >
              {/* Header */}
              <div className="text-center space-y-8 mb-8">
                {/* HIVE Logo */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18, delay: 0.05, ease: [0.33, 0.65, 0, 1] }}
                  className="flex justify-center"
                >
                  <HiveLogo 
                    variant="white" 
                    size="2xl" 
                    animationType="gentle-float"
                    className="drop-shadow-lg"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: 0.1, ease: [0.33, 0.65, 0, 1] }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">
                    Choose Your Campus
                  </h1>
                  <p className="text-muted mt-2 font-sans max-w-lg mx-auto">
                    HIVE is currently available at University at Buffalo, with other schools joining soon
                  </p>
                </motion.div>
              </div>

              {/* School Selection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: 0.15, ease: [0.33, 0.65, 0, 1] }}
                className="w-full"
              >
                <SchoolPick
                  schools={SCHOOLS}
                  onSchoolSelect={handleSchoolSelect}
                  className="bg-transparent border-none p-0"
                />
              </motion.div>

              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18, delay: 0.2, ease: [0.33, 0.65, 0, 1] }}
                className="text-center mt-8"
              >
                <p className="text-sm text-muted font-sans">
                  Don't see your school? We're expanding to new campuses regularly.
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="email-input"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
            >
              {/* Header */}
              <div className="text-center space-y-8 mb-8">
                {/* Back Button */}
                <div className="flex justify-start mb-4">
                  <motion.button
                    onClick={handleBackToSchools}
                    className="flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background rounded-lg p-2"
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="text-sm font-medium">Back</span>
                  </motion.button>
                </div>

                {/* HIVE Logo */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.18, delay: 0.05, ease: [0.33, 0.65, 0, 1] }}
                  className="flex justify-center"
                >
                  <HiveLogo 
                    variant="white" 
                    size="2xl" 
                    animationType="gentle-float"
                    className="drop-shadow-lg"
                  />
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, delay: 0.1, ease: [0.33, 0.65, 0, 1] }}
                  className="space-y-3"
                >
                  <h1 className="text-3xl font-display font-semibold text-foreground tracking-tight">
                    Enter your {selectedSchool?.name || 'school'} email
                  </h1>
                  <p className="text-muted mt-2 font-sans">
                    to join or sign in
                  </p>
                </motion.div>
              </div>

              {/* Email Form */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, delay: 0.15, ease: [0.33, 0.65, 0, 1] }}
                className="w-full"
              >
                <EmailForm
                  onSubmit={handleEmailSubmit}
                  isLoading={isLoading}
                  apiError={apiError}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 