'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles, TrendingUp, Users, Eye, Gift, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveCard } from '../atoms/hive-card';
import { HiveProgress } from '../atoms/hive-progress';

interface CompletionPsychologyEnhancerProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
  onCompletionBoost?: (boostType: string) => void;
  userType?: 'student' | 'faculty' | 'alumni';
}

interface CompletionReward {
  threshold: number; // % completion
  type: 'preview' | 'access' | 'social' | 'exclusive';
  title: string;
  description: string;
  icon: React.ReactNode;
  previewContent?: React.ReactNode;
  urgency?: 'low' | 'medium' | 'high';
  socialProof?: {
    count: number;
    action: string;
  };
}

// Behavioral rewards designed for 70% completion target
const completionRewards: CompletionReward[] = [
  {
    threshold: 30,
    type: 'preview',
    title: 'Preview Your Matches',
    description: 'See who you might connect with at UB',
    icon: <Eye className="w-5 h-5 text-purple-400" />,
    previewContent: (
      <div className="flex -space-x-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full border-2 border-white" />
        ))}
        <div className="w-8 h-8 bg-[var(--hive-background-tertiary)] rounded-full border-2 border-white flex items-center justify-center text-xs">
          +7
        </div>
      </div>
    ),
    socialProof: { count: 23, action: 'students like you joined today' },
  },
  {
    threshold: 50,
    type: 'access',
    title: 'Unlock Exclusive Spaces',
    description: 'Access member-only communities',
    icon: <Users className="w-5 h-5 text-blue-400" />,
    urgency: 'medium',
    socialProof: { count: 12, action: 'exclusive spaces available' },
  },
  {
    threshold: 70, // TARGET COMPLETION RATE
    type: 'exclusive',
    title: 'Insider Campus Knowledge',
    description: 'Get the insider info only members know',
    icon: <Sparkles className="w-5 h-5 text-[var(--hive-brand-primary)]" />,
    urgency: 'high',
    socialProof: { count: 5, action: 'exclusive insights waiting' },
  },
  {
    threshold: 85,
    type: 'social',
    title: 'Full Platform Access',
    description: 'Complete access to all HIVE features',
    icon: <Gift className="w-5 h-5 text-green-400" />,
    urgency: 'low',
  },
];

export const CompletionPsychologyEnhancer: React.FC<CompletionPsychologyEnhancerProps> = ({
  currentStep,
  totalSteps,
  className,
  onCompletionBoost,
  userType = 'student',
}) => {
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [activeRewards, setActiveRewards] = useState<CompletionReward[]>([]);
  const [unlockedRewards, setUnlockedRewards] = useState<Set<number>>(new Set());
  const [justUnlocked, setJustUnlocked] = useState<CompletionReward | null>(null);

  // Calculate completion percentage
  useEffect(() => {
    const percentage = Math.round((currentStep / totalSteps) * 100);
    setCompletionPercentage(percentage);

    // Check for newly unlocked rewards
    const newlyUnlocked = completionRewards.find(
      reward => percentage >= reward.threshold && !unlockedRewards.has(reward.threshold)
    );

    if (newlyUnlocked) {
      setUnlockedRewards(prev => new Set([...prev, newlyUnlocked.threshold]));
      setJustUnlocked(newlyUnlocked);
      onCompletionBoost?.(newlyUnlocked.type);

      // Clear the unlock notification after animation
      setTimeout(() => setJustUnlocked(null), 3000);
    }

    // Set active rewards (current + next few)
    const current = completionRewards.filter(reward =>
      percentage >= reward.threshold - 20 && percentage <= reward.threshold + 10
    );
    setActiveRewards(current.slice(0, 3));
  }, [currentStep, totalSteps, unlockedRewards, onCompletionBoost]);

  const getProgressColor = () => {
    if (completionPercentage >= 70) return 'from-[var(--hive-brand-primary)] to-yellow-400';
    if (completionPercentage >= 50) return 'from-blue-400 to-purple-400';
    return 'from-purple-400 to-pink-400';
  };

  const getMotivationalMessage = () => {
    if (completionPercentage >= 70) {
      return "🎉 You're in the exclusive zone! Only the best students make it this far.";
    }
    if (completionPercentage >= 50) {
      return "⚡ Almost there! You're closer than most students get.";
    }
    if (completionPercentage >= 30) {
      return "🚀 Great progress! Keep going to unlock exclusive features.";
    }
    return "✨ Perfect start! Each step unlocks something amazing.";
  };

  const getNextReward = () => {
    return completionRewards.find(reward => completionPercentage < reward.threshold);
  };

  const nextReward = getNextReward();

  return (
    <div className={cn('completion-psychology-enhancer space-y-4', className)}>
      {/* Progress with Psychological Messaging */}
      <HiveCard className="p-6">
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                Profile Completion
              </span>
              <span className="text-sm font-bold text-[var(--hive-brand-primary)]">
                {completionPercentage}%
              </span>
            </div>

            <div className="relative">
              <HiveProgress
                value={completionPercentage}
                className="h-3"
              />
              {/* 70% target marker */}
              <div
                className="absolute top-0 h-3 w-0.5 bg-[var(--hive-brand-primary)] opacity-60"
                style={{ left: '70%' }}
              />
              <div
                className="absolute -top-1 text-xs text-[var(--hive-brand-primary)] font-medium"
                style={{ left: '70%', transform: 'translateX(-50%)' }}
              >
                Target
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <motion.p
            key={completionPercentage} // Re-animate on percentage change
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-[var(--hive-text-secondary)] font-medium"
          >
            {getMotivationalMessage()}
          </motion.p>

          {/* Step Progress */}
          <div className="flex items-center gap-2 text-xs text-[var(--hive-text-muted)]">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>•</span>
            <span>{totalSteps - currentStep} steps remaining</span>
          </div>
        </div>
      </HiveCard>

      {/* Unlock Notification */}
      <AnimatePresence>
        {justUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="fixed top-4 right-4 z-50"
          >
            <HiveCard className="p-4 bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-yellow-400/20 border border-[var(--hive-brand-primary)]/30">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[var(--hive-brand-primary)] rounded-full">
                  {justUnlocked.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--hive-text-primary)]">
                    🎉 Unlocked: {justUnlocked.title}
                  </h4>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    {justUnlocked.description}
                  </p>
                </div>
              </div>
            </HiveCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Reward Preview */}
      {nextReward && (
        <HiveCard className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--hive-background-secondary)] rounded-lg opacity-60">
              {nextReward.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-[var(--hive-text-primary)]">
                Next: {nextReward.title}
              </h4>
              <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                <span>{nextReward.threshold - completionPercentage}% to unlock</span>
                {nextReward.socialProof && (
                  <>
                    <span>•</span>
                    <span className="text-[var(--hive-brand-primary)]">
                      {nextReward.socialProof.count} {nextReward.socialProof.action}
                    </span>
                  </>
                )}
              </div>
            </div>
            {nextReward.urgency === 'high' && (
              <div className="flex items-center gap-1 text-xs text-orange-400">
                <Zap className="w-3 h-3" />
                <span>Limited</span>
              </div>
            )}
          </div>

          {/* Preview Content */}
          {nextReward.previewContent && (
            <div className="mt-3 p-3 bg-[var(--hive-background-secondary)]/30 rounded-lg">
              {nextReward.previewContent}
            </div>
          )}
        </HiveCard>
      )}

      {/* Completion Urgency (70%+ zone) */}
      {completionPercentage >= 60 && completionPercentage < 70 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-4"
        >
          <HiveCard className="p-4 bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-orange-400/10 border border-[var(--hive-brand-primary)]/30">
            <div className="flex items-center justify-center gap-2 text-[var(--hive-brand-primary)]">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">
                You're {70 - completionPercentage}% away from exclusive access!
              </span>
            </div>
            <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
              Only the top students make it to 70% completion
            </p>
          </HiveCard>
        </motion.div>
      )}

      {/* Success State (70%+ achieved) */}
      {completionPercentage >= 70 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-4"
        >
          <HiveCard className="p-6 bg-gradient-to-r from-[var(--hive-brand-primary)]/20 to-yellow-400/20">
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-6 h-6 text-[var(--hive-brand-primary)]" />
                <span className="text-lg font-bold text-[var(--hive-text-primary)]">
                  Elite Status Achieved!
                </span>
              </div>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                You're in the top tier of UB students. You now have access to everything HIVE offers.
              </p>
            </div>
          </HiveCard>
        </motion.div>
      )}
    </div>
  );
};