import { motion } from "@hive/ui/src/components/framer-motion-proxy";
import { Shield, FileText, Eye, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { HiveCard } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveLegalStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

export function HiveLegalStep({ data, updateData }: HiveLegalStepProps) {
  const toggleTerms = () => {
    updateData({ acceptedTerms: !data.acceptedTerms });
  };

  const togglePrivacy = () => {
    updateData({ acceptedPrivacy: !data.acceptedPrivacy });
  };

  const toggleConsent = () => {
    updateData({ hasConsented: !data.hasConsented });
  };

  const agreements = [
    {
      id: "terms",
      title: "Terms of Service",
      description: "Our community guidelines and platform rules",
      icon: FileText,
      checked: data.acceptedTerms,
      toggle: toggleTerms,
      required: true,
      link: "/terms"
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      description: "How we protect and use your information",
      icon: Eye,
      checked: data.acceptedPrivacy,
      toggle: togglePrivacy,
      required: true,
      link: "/privacy"
    },
    {
      id: "consent",
      title: "Data Consent",
      description: "Optional: Help us improve HIVE with usage analytics",
      icon: Shield,
      checked: data.hasConsented,
      toggle: toggleConsent,
      required: false,
      link: "/data-usage"
    }
  ];

  const highlights = [
    "Your data is always encrypted and secure",
    "We never sell your personal information",
    "You can delete your account and data anytime",
    "Open source and transparent privacy practices"
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)] max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center space-y-[var(--hive-spacing-4)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-brand-primary)]/30"
        >
          <Shield className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            Privacy & Terms
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Review our policies to complete your HIVE setup.
          </p>
        </motion.div>
      </div>

      {/* Agreements */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-[var(--hive-spacing-4)]"
      >
        {agreements.map((agreement, index) => (
          <motion.div
            key={agreement.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <HiveCard
              variant={agreement.checked ? "premium" : "glass"}
              className={cn(
                "p-[var(--hive-spacing-4)] transition-all duration-300 cursor-pointer",
                agreement.checked
                  ? "border-[var(--hive-brand-primary)]/50 shadow-lg shadow-[var(--hive-brand-primary)]/25"
                  : "hover:border-[var(--hive-brand-primary)]/30"
              )}
              onClick={agreement.toggle}
            >
            <div className="flex items-start space-x-4">
              {/* Checkbox */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); agreement.toggle(); }}
                className={cn(
                  "flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
                  agreement.checked
                    ? "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)]/50 text-[var(--hive-brand-primary)]"
                    : "border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]/30"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {agreement.checked && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Check className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <agreement.icon className="w-4 h-4 text-[var(--hive-text-secondary)]" />
                  <h4 className="font-medium text-[var(--hive-text-primary)] text-sm">
                    {agreement.title}
                    {agreement.required && (
                      <span className="text-[var(--hive-status-error)] ml-1">*</span>
                    )}
                  </h4>
                </div>
                <p className="text-xs text-[var(--hive-text-secondary)] mb-3">
                  {agreement.description}
                </p>
                
                {/* View Link */}
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(agreement.link, '_blank'); }}
                  className="inline-flex items-center space-x-1 text-xs text-[var(--hive-brand-primary)] hover:text-[var(--hive-brand-secondary)] transition-colors"
                >
                  <span>Read full document</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
            </HiveCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Privacy Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <HiveCard variant="subtle" className="p-[var(--hive-spacing-4)]">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-[var(--hive-spacing-3)] flex items-center">
            <Shield className="w-4 h-4 mr-2 text-[var(--hive-brand-primary)]" />
            Your Privacy Matters
          </h4>
          
          <div className="space-y-[var(--hive-spacing-2)]">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center space-x-2 text-xs text-[var(--hive-text-secondary)]"
              >
                <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full flex-shrink-0" />
                <span>{highlight}</span>
              </motion.div>
            ))}
          </div>
        </HiveCard>
      </motion.div>

      {/* Completion Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <HiveCard 
          variant={data.acceptedTerms && data.acceptedPrivacy ? "success" : "glass"}
          className="p-[var(--hive-spacing-4)]"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-1">
                Agreement Status
              </h4>
              <p className="text-xs text-[var(--hive-text-secondary)]">
                {data.acceptedTerms && data.acceptedPrivacy
                  ? "All required agreements completed"
                  : "Please accept required terms to continue"
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-3 h-3 rounded-full transition-colors duration-300",
                data.acceptedTerms && data.acceptedPrivacy
                  ? "bg-[var(--hive-status-success)]"
                  : "bg-[var(--hive-status-error)]"
              )} />
              <span className="text-xs text-[var(--hive-text-muted)]">
                {agreements.filter(a => a.required && a.checked).length}/
                {agreements.filter(a => a.required).length} required
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <motion.div
            className="mt-3 w-full bg-[var(--hive-background-tertiary)]/20 rounded-full h-1.5 overflow-hidden"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)] rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(agreements.filter(a => a.required && a.checked).length / agreements.filter(a => a.required).length) * 100}%`
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </HiveCard>
      </motion.div>
    </motion.div>
  );
}