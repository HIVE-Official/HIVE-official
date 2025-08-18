"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '../lib/utils';
import { SchoolPick, EmailGate, MagicLinkSent } from ".";
import type { School } from '@hive/core';

export type AuthStep = "school-pick" | "email-gate" | "magic-link-sent";

interface AuthFlowProps {
  schools: School[];
  onSchoolSelect: (school: School) => void;
  onEmailSubmit: (email: string) => Promise<void>;
  onCreateSchool?: () => void;
  className?: string;
}

export const AuthFlow: React.FC<AuthFlowProps> = ({
  schools,
  onSchoolSelect,
  onEmailSubmit,
  onCreateSchool: _onCreateSchool,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>("school-pick");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [email, setEmail] = useState("");
  const [direction, setDirection] = useState(0);

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    onSchoolSelect(school);
    setDirection(1);
    setCurrentStep("email-gate");
  };


  const handleEmailSubmit = async (email: string) => {
    setEmail(email);
    await onEmailSubmit(email);
    setDirection(1);
    setCurrentStep("magic-link-sent");
  };

  const handleResendMagicLink = async () => {
    try {
      await onEmailSubmit(email);
      return true;
    } catch (error) {
      console.error('Failed to resend magic link:', error);
      return false;
    }
  };

  const handleBack = (step: AuthStep) => {
    setDirection(-1);
    setCurrentStep(step);
  };

  return (
    <div className={cn("w-full relative overflow-hidden", className)}>
      <AnimatePresence initial={false} custom={direction}>
        {currentStep === "school-pick" && (
          <motion.div
            key="school-pick"
            initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 1000 : -1000 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <SchoolPick
              schools={schools}
              onSchoolSelect={handleSchoolSelect}
              className="bg-transparent"
            />
          </motion.div>
        )}

        {currentStep === "email-gate" && selectedSchool && (
          <motion.div
            key="email-gate"
            initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 1000 : -1000 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <EmailGate
              schoolName={selectedSchool.name}
              schoolDomain={selectedSchool.domain}
              schoolId={selectedSchool.id}
              onSuccess={handleEmailSubmit}
              onBack={() => handleBack("school-pick")}
            />
          </motion.div>
        )}

        {currentStep === "magic-link-sent" && selectedSchool && (
          <motion.div
            key="magic-link-sent"
            initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 1000 : -1000 }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full"
          >
            <MagicLinkSent
              email={email}
              school={selectedSchool}
              onBack={() => handleBack("email-gate")}
              onResend={handleResendMagicLink}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
