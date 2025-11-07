import { useState } from "react";
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight, Heart, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { HiveCard, Button, Input } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveCompletionStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

export function HiveCompletionStep({ data, updateData, onNext }: HiveCompletionStepProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = async () => {
    // Ensure terms are accepted
    if (!data.acceptedTerms || !data.acceptedPrivacy) {
      updateData({
        acceptedTerms: true,
        acceptedPrivacy: true,
        hasConsented: true
      });
    }

    setIsCompleting(true);

    // Add small delay for user experience
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  const firstName = data.fullName?.split(' ')[0] || 'there';

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)] max-w-2xl mx-auto text-center"
    >
      {/* Celebration Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative mx-auto w-24 h-24 mb-8"
      >
        {/* Brand color burst background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-primary)]/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Main icon */}
        <div className="relative z-10 w-full h-full bg-[var(--hive-brand-primary)] rounded-full flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-black" />
        </div>

        {/* Floating sparkles */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-6 h-6 text-[var(--hive-brand-primary)]" />
        </motion.div>
      </motion.div>

      {/* Welcome Message */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-4xl font-bold text-[var(--hive-text-primary)]">
          Welcome in, {firstName}.
        </h2>
        <p className="text-lg text-[var(--hive-text-secondary)] max-w-md mx-auto">
          Your UB feed is live—rituals, spaces, and people are ready now.
        </p>
      </motion.div>

      {/* Profile Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <HiveCard className="p-[var(--hive-spacing-6)] text-left">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4 text-center">
            Your HIVE Profile
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[var(--hive-brand-primary)]" />
              <span className="text-[var(--hive-text-secondary)]">
                {data.userType === 'student' ? 'Student' :
                 data.userType === 'faculty' ? 'Faculty' : 'Alumni'}
              </span>
            </div>

            {data.major && (
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                <span className="text-[var(--hive-text-secondary)]">
                  {data.major} • Class of {data.graduationYear}
                </span>
              </div>
            )}

            {data.interests && data.interests.length > 0 && (
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-[var(--hive-brand-primary)] mt-0.5" />
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2">
                    {data.interests.slice(0, 4).map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] text-xs rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                    {data.interests.length > 4 && (
                      <span className="px-2 py-1 bg-[var(--hive-background-tertiary)] text-[var(--hive-text-muted)] text-xs rounded-full">
                        +{data.interests.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </HiveCard>
      </motion.div>

      {/* What's Next */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <HiveCard className="p-[var(--hive-spacing-6)]">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
            Up next
          </h3>

          <div className="space-y-3 text-sm text-[var(--hive-text-secondary)]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Follow the spaces that feel like home</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Share a quick hello in tonight’s ritual</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Keep UB news and events in one thread</span>
            </div>
          </div>
        </HiveCard>
      </motion.div>

      {/* Terms Acceptance & Complete Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="space-y-6"
      >
        {/* Terms Acceptance */}
        <div className="text-xs text-[var(--hive-text-muted)] space-y-2">
          <p>
            By completing your profile, you agree to our{' '}
            <a
              href="/legal/terms"
              target="_blank"
              className="text-[var(--hive-brand-primary)] hover:underline"
            >
              Terms of Service
            </a>
            {' '}and{' '}
            <a
              href="/legal/privacy"
              target="_blank"
              className="text-[var(--hive-brand-primary)] hover:underline"
            >
              Privacy Policy
            </a>
          </p>
          <p>
            We keep campus data locked to UB and off third-party trackers.
          </p>
        </div>

        {/* Completion Button */}
        <Button
          onClick={handleComplete}
          disabled={isCompleting}
          variant="primary"
          size="lg"
          className="w-full max-w-md mx-auto"
        >
          {isCompleting ? (
            <div className="flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <span>Setting up your HIVE...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <span>Enter the HIVE</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
