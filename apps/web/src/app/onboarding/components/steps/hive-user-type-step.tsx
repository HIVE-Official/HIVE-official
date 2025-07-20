import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Users, BookOpen, ArrowRight, Mail, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { HiveCard, HiveButton, HiveInput } from "@hive/ui";
import type { HiveOnboardingData } from "../hive-onboarding-wizard";

interface HiveUserTypeStepProps {
  data: HiveOnboardingData;
  updateData: (data: Partial<HiveOnboardingData>) => void;
  onNext: () => void;
}

export function HiveUserTypeStep({ data, updateData, onNext }: HiveUserTypeStepProps) {
  const [selectedType, setSelectedType] = useState<'student' | 'alumni' | 'faculty' | null>(data.userType || null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [isSubmittingWaitlist, setIsSubmittingWaitlist] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  const userTypes = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Current undergraduate or graduate student',
      icon: GraduationCap,
      color: 'var(--hive-brand-primary)',
      available: true,
    },
    {
      id: 'alumni' as const,
      title: 'Alumni',
      description: 'Graduate of your institution',
      icon: Users,
      color: 'var(--hive-brand-primary)',
      available: false,
    },
    {
      id: 'faculty' as const,
      title: 'Faculty',
      description: 'Faculty member or staff',
      icon: BookOpen,
      color: 'var(--hive-brand-primary)',
      available: true,
    },
  ];

  const handleTypeSelect = (type: 'student' | 'alumni' | 'faculty') => {
    setSelectedType(type);
    updateData({ userType: type });
    
    // Auto-advance for available types after a delay
    if (type !== 'alumni') {
      setTimeout(() => {
        onNext();
      }, 600);
    }
  };

  const submitWaitlist = async () => {
    if (!waitlistEmail.trim() || !waitlistEmail.includes('@')) {
      return;
    }

    setIsSubmittingWaitlist(true);

    try {
      // TODO: Replace with actual waitlist API call
      // For now, simulate the submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWaitlistSubmitted(true);
      
      // Could store this in localStorage for persistence
      localStorage.setItem('hive_alumni_waitlist', JSON.stringify({
        email: waitlistEmail,
        submittedAt: new Date().toISOString()
      }));
      
    } catch (error) {
      console.error('Failed to submit waitlist:', error);
    } finally {
      setIsSubmittingWaitlist(false);
    }
  };

  // Show coming soon for alumni
  if (selectedType === 'alumni') {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-[var(--hive-spacing-8)] py-[var(--hive-spacing-6)] max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-[var(--hive-brand-primary)]/30"
        >
          <Users className="w-10 h-10 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">
            Alumni Access Coming Soon
          </h2>
          <p className="text-[var(--hive-text-secondary)] text-lg mb-8">
            We're building something special for alumni. Stay tuned for updates!
          </p>
          
          <HiveCard variant="subtle" className="p-[var(--hive-spacing-6)] mb-8">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
              What's Coming for Alumni
            </h3>
            <div className="space-y-[var(--hive-spacing-3)] text-sm text-[var(--hive-text-secondary)]">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full" />
                <span>Connect with fellow alumni</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full" />
                <span>Mentor current students</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full" />
                <span>Stay connected with campus life</span>
              </div>
            </div>
          </HiveCard>

          {/* Waitlist Form */}
          {!waitlistSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <HiveCard variant="premium" className="p-[var(--hive-spacing-6)] mb-8">
                <div className="text-center mb-4">
                  <Mail className="w-8 h-8 text-[var(--hive-brand-primary)] mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                    Join the Waitlist
                  </h3>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    Be the first to know when HIVE alumni access is available.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <HiveInput
                    type="email"
                    placeholder="Enter your email address"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    variant="premium"
                    size="lg"
                    floatingLabel={false}
                    leftIcon={<Mail className="w-4 h-4" />}
                  />
                  
                  <HiveButton
                    onClick={submitWaitlist}
                    disabled={!waitlistEmail.trim() || !waitlistEmail.includes('@') || isSubmittingWaitlist}
                    variant="premium"
                    size="lg"
                    className="w-full"
                    leftIcon={isSubmittingWaitlist ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Mail className="w-4 h-4" /></motion.div> : <Mail className="w-4 h-4" />}
                  >
                    {isSubmittingWaitlist ? "Adding to waitlist..." : "Join Waitlist"}
                  </HiveButton>
                </div>
              </HiveCard>
            </motion.div>
          ) : (
            /* Waitlist Success */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <HiveCard variant="success" className="p-[var(--hive-spacing-6)] mb-8 text-center">
                <CheckCircle className="w-12 h-12 text-[var(--hive-status-success)] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                  You're on the list!
                </h3>
                <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
                  We'll notify you at <strong>{waitlistEmail}</strong> when alumni access is ready.
                </p>
                <div className="text-xs text-[var(--hive-text-muted)]">
                  Thank you for your interest in HIVE Alumni!
                </div>
              </HiveCard>
            </motion.div>
          )}
          
          <HiveButton
            variant="secondary"
            size="lg"
            onClick={() => setSelectedType(null)}
            leftIcon={<ArrowRight className="w-4 h-4 rotate-180" />}
          >
            Go Back
          </HiveButton>
        </motion.div>
      </motion.div>
    );
  }

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
          <Users className="w-8 h-8 text-[var(--hive-brand-primary)]" />
        </motion.div>
        
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            What's Your Role?
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-2">
            Let us know your connection to the campus community.
          </p>
        </motion.div>
      </div>

      {/* User Type Options */}
      <div className="grid gap-[var(--hive-spacing-4)]">
        {userTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <motion.button
              onClick={() => type.available ? handleTypeSelect(type.id) : undefined}
              className={cn(
                "w-full p-[var(--hive-spacing-6)] rounded-2xl border-2 transition-all duration-300 text-left",
                "hover:scale-105 active:scale-95",
                type.available
                  ? "cursor-pointer hover:border-[var(--hive-brand-primary)]/50"
                  : "cursor-not-allowed opacity-60",
                selectedType === type.id
                  ? "bg-[var(--hive-brand-primary)]/20 border-[var(--hive-brand-primary)]/50 shadow-lg shadow-[var(--hive-brand-primary)]/25"
                  : "bg-[var(--hive-background-secondary)]/20 border-[var(--hive-border-primary)]/30"
              )}
              whileHover={type.available ? { y: -4 } : {}}
              whileTap={type.available ? { scale: 0.98 } : {}}
              disabled={!type.available}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                    type.available
                      ? "bg-[var(--hive-brand-primary)]/20"
                      : "bg-[var(--hive-background-tertiary)]/20"
                  )}
                  style={{ backgroundColor: type.available ? `${type.color}20` : undefined }}
                >
                  <type.icon
                    className="w-6 h-6"
                    style={{ color: type.available ? type.color : 'var(--hive-text-muted)' }}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className={cn(
                    "text-lg font-semibold transition-colors duration-300",
                    type.available ? "text-[var(--hive-text-primary)]" : "text-[var(--hive-text-muted)]"
                  )}>
                    {type.title}
                    {!type.available && (
                      <span className="ml-2 text-xs font-normal px-2 py-1 bg-[var(--hive-background-tertiary)]/40 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </h3>
                  <p className={cn(
                    "text-sm mt-1 transition-colors duration-300",
                    type.available ? "text-[var(--hive-text-secondary)]" : "text-[var(--hive-text-muted)]"
                  )}>
                    {type.description}
                  </p>
                </div>

                {type.available && (
                  <ArrowRight className="w-5 h-5 text-[var(--hive-text-muted)] transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <HiveCard variant="subtle" className="p-[var(--hive-spacing-4)]">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-[var(--hive-spacing-3)] flex items-center">
            <div className="w-2 h-2 bg-[var(--hive-brand-primary)] rounded-full mr-2" />
            HIVE Community
          </h4>
          
          <div className="space-y-[var(--hive-spacing-2)] text-xs text-[var(--hive-text-muted)]">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Different user types have access to different features</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Students can join communities and request builder access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-[var(--hive-brand-primary)] rounded-full" />
              <span>Faculty can create and manage institutional spaces</span>
            </div>
          </div>
        </HiveCard>
      </motion.div>
    </motion.div>
  );
}