import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HiveButton, HiveLogo } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveWelcomeStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

export function HiveWelcomeStep({ onNext }: HiveWelcomeStepProps) {

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)]"
    >
      {/* Hero Section with HIVE Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mx-auto w-32 h-32 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center relative overflow-hidden"
      >
        <HiveLogo size="xl" variant="gold" showWordmark={false} />
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-[var(--hive-brand-primary)]/20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-[var(--hive-spacing-4)]"
      >
        <h1 className="text-4xl font-bold text-[var(--hive-text-primary)]">
          Welcome to <span className="text-[var(--hive-brand-primary)]">HIVE</span>
        </h1>
        <p className="text-lg text-[var(--hive-text-secondary)] max-w-md mx-auto">
          Your digital campus awaits
        </p>
      </motion.div>

      {/* Simplified Call to Action */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-[var(--hive-spacing-6)]"
      >
        <p className="text-[var(--hive-text-muted)] max-w-lg mx-auto">
          We'll walk you through a few quick steps to set up your profile. 
          This should only take a couple of minutes.
        </p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          className="flex justify-center"
        >
          <HiveButton
            variant="premium"
            size="xl"
            onClick={onNext}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="px-[var(--hive-spacing-8)]"
          >
            Get Started
          </HiveButton>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}