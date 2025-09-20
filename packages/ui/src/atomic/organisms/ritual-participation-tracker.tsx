'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '../../utils/logger';

import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Trophy, Target, Clock, Users, CheckCircle, Circle, Flame, Award, Share2, TrendingUp, Star, Calendar } from 'lucide-react';

export interface RitualParticipation {
  id: string;
  ritualId: string;
  userId: string;
  status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
  progress: number; // 0-100
  score: number;
  rank?: number;
  joinedAt: string;
  lastActiveAt: string;
  completedActions: Array<{
    actionId: string;
    actionType: string;
    completedAt: string;
    points: number;
    data?: Record<string, string | number | boolean>;
  }>;
  milestonesReached: Array<{
    milestoneId: string;
    name: string;
    reachedAt: string;
    celebration?: Record<string, string | number | boolean>;
  }>;
  streakDays: number;
  personalBest?: {
    longestStreak: number;
    highestScore: number;
    fastestCompletion: number; // minutes
  };
  rewards: Array<{
    id: string;
    type: string;
    name: string;
    awardedAt: string;
  }>;
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    unlockedAt: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  }>;
}

export interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  type: string;
  status: string;
  startTime: string;
  endTime?: string;
  participantCount: number;
  maxParticipants?: number;
  actions: Array<{
    id: string;
    type: string;
    name: string;
    description: string;
    isRequired: boolean;
    weight: number;
  }>;
  milestones: Array<{
    id: string;
    name: string;
    description: string;
    threshold: number;
    rewards?: string[];
  }>;
}

export interface RitualParticipationTrackerProps {
  participation: RitualParticipation;
  ritual: Ritual;
  onActionComplete?: (actionId: string, data?: Record<string, string | number | boolean>) => Promise<void>;
  onWithdraw?: () => Promise<void>;
  onShare?: () => void;
  className?: string;
  variant?: 'compact' | 'detailed' | 'card';
  showActions?: boolean;
}

const RARITY_CONFIG = {
  common: { color: 'text-gray-400', bg: 'bg-gray-500/20', border: 'border-gray-500/30' },
  uncommon: { color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' },
  rare: { color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
  epic: { color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
  legendary: { color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' }
};

export function RitualParticipationTracker({
  participation,
  ritual,
  onActionComplete,
  onWithdraw,
  onShare,
  className,
  variant = 'detailed',
  showActions = true
}: RitualParticipationTrackerProps) {
  const [selectedTab, setSelectedTab] = useState<'progress' | 'actions' | 'milestones' | 'achievements'>('progress');
  const [completingAction, setCompletingAction] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationData, setCelebrationData] = useState<{
    type: string;
    data: {
      name?: string;
      [key: string]: string | number | boolean | undefined;
    };
  } | null>(null);
  
  const isActive = participation.status === 'active' || participation.status === 'joined';
  const isCompleted = participation.status === 'completed';
  const completedActionIds = participation.completedActions.map(a => a.actionId);
  const requiredActions = ritual.actions.filter(a => a.isRequired);
  const optionalActions = ritual.actions.filter(a => !a.isRequired);
  const nextMilestone = ritual.milestones.find(m => 
    !participation.milestonesReached.some(rm => rm.milestoneId === m.id)
  );

  // Trigger celebration for new milestones or achievements
  useEffect(() => {
    const latestMilestone = participation.milestonesReached[participation.milestonesReached.length - 1];
    if (latestMilestone && Date.now() - new Date(latestMilestone.reachedAt).getTime() < 10000) {
      setCelebrationData({
        type: 'milestone',
        data: latestMilestone
      })};
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [participation.milestonesReached]);

  const handleActionComplete = async (actionId: string) => {
    if (!onActionComplete || completingAction) return;
    
    setCompletingAction(actionId);
    try {
      await onActionComplete(actionId);
    } catch (error) {
      logger.error('Failed to complete action:', { error });
    } finally {
      setCompletingAction(null);
    }
  };

  const formatTimeRemaining = (endTime: string): string => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Less than 1h left';
  };

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-4 bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)]",
          className
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-[var(--hive-gold)]" />
              </div>
              {participation.streakDays > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {participation.streakDays}
                </div>
              )}
            </div>
            <div>
              <h4 className="font-semibold text-[var(--hive-text-primary)]">{ritual.title}</h4>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                {participation.progress}% complete • Rank #{participation.rank || 'N/A'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{participation.score}</div>
            <div className="text-xs text-[var(--hive-text-secondary)]">points</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-[var(--hive-gold)] to-[#FF6B35] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${participation.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[var(--hive-text-secondary)]">
              <CheckCircle className="h-4 w-4" />
              <span>{participation.completedActions.length}/{ritual.actions.length}</span>
            </div>
            {participation.streakDays > 0 && (
              <div className="flex items-center gap-1 text-red-400">
                <Flame className="h-4 w-4" />
                <span>{participation.streakDays} day streak</span>
              </div>
            )}
          </div>
          {ritual.endTime && (
            <div className="text-[var(--hive-text-secondary)]">
              {formatTimeRemaining(ritual.endTime)}
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-[var(--hive-border-subtle)] bg-gradient-to-br from-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)]",
          className
        )}
      >
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--hive-gold)]/10 to-transparent rounded-full blur-2xl" />
        
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-1">{ritual.title}</h3>
              <p className="text-[var(--hive-text-secondary)]">{ritual.description}</p>
            </div>
            {isCompleted && (
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                Completed!
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{participation.progress}%</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{participation.score}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">#{participation.rank || 'N/A'}</div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Rank</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[var(--hive-text-secondary)]">Overall Progress</span>
              <span className="text-sm font-medium text-[var(--hive-gold)]">{participation.progress}%</span>
            </div>
            <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-[var(--hive-gold)] to-[#FF6B35] h-3 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${participation.progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg" />
              </motion.div>
            </div>
          </div>

          {/* Achievements Preview */}
          {participation.achievements.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Recent Achievements</h4>
                <span className="text-xs text-[var(--hive-text-secondary)]">
                  {participation.achievements.length} total
                </span>
              </div>
              <div className="flex gap-2">
                {participation.achievements.slice(0, 4).map((achievement) => {
                  const rarityConfig = RARITY_CONFIG[achievement.rarity];
                  return (
                    <div
                      key={achievement.id}
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center border",
                        rarityConfig.bg,
                        rarityConfig.border
                      )}
                      title={achievement.name}
                    >
                      <Award className={cn("h-5 w-5", rarityConfig.color)} />
                    </div>
                  );
                })}
                {participation.achievements.length > 4 && (
                  <div className="w-10 h-10 rounded-lg bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] flex items-center justify-center text-xs text-[var(--hive-text-secondary)]">
                    +{participation.achievements.length - 4}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90 transition-colors font-medium">
              View Details
            </button>
            {onShare && (
              <button
                onClick={onShare}
                className="px-4 py-2 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-background-tertiary)] transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Detailed variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-[var(--hive-background-secondary)] rounded-xl border border-[var(--hive-border-subtle)] overflow-hidden",
        className
      )}
    >
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && celebrationData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="absolute inset-0 z-50 bg-[var(--hive-background-primary)]/95 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
                Milestone Reached!
              </h3>
              <p className="text-[var(--hive-text-secondary)]">
                {celebrationData.data.name}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 border-b border-[var(--hive-border-subtle)]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--hive-gold)]/20 to-[var(--hive-gold)]/10 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-[var(--hive-gold)]" />
              </div>
              {participation.streakDays > 0 && (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
                >
                  {participation.streakDays}
                </motion.div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">{ritual.title}</h2>
              <p className="text-[var(--hive-text-secondary)] mb-2">{ritual.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{ritual.participantCount} participants</span>
                </div>
                {ritual.endTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeRemaining(ritual.endTime)}</span>
                  </div>
                )}
                <div className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  isCompleted ? "bg-green-500/20 text-green-400" :
                  isActive ? "bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]" :
                  "bg-gray-500/20 text-gray-400"
                )}>
                  {participation.status.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-[var(--hive-text-primary)]">{participation.score}</div>
            <div className="text-sm text-[var(--hive-text-secondary)]">total points</div>
            {participation.rank && (
              <div className="text-sm text-[var(--hive-gold)] font-medium">Rank #{participation.rank}</div>
            )}
          </div>
        </div>

        {/* Main Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">Overall Progress</span>
            <span className="text-sm font-bold text-[var(--hive-gold)]">{participation.progress}%</span>
          </div>
          <div className="w-full bg-[var(--hive-background-tertiary)] rounded-full h-4 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-[var(--hive-gold)] to-[#FF6B35] h-4 rounded-full relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${participation.progress}%` }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </motion.div>
          </div>
        </div>

        {/* Next Milestone */}
        {nextMilestone && (
          <div className="p-3 bg-[var(--hive-background-tertiary)] rounded-lg border border-[var(--hive-border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center">
                <Target className="h-4 w-4 text-[var(--hive-gold)]" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Next Milestone</h4>
                <p className="text-sm text-[var(--hive-text-secondary)]">{nextMilestone.name}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                  {nextMilestone.threshold}%
                </div>
                <div className="text-xs text-[var(--hive-text-secondary)]">required</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[var(--hive-border-subtle)]">
        <nav className="flex">
          {([
            { id: 'progress', label: 'Progress', icon: TrendingUp },
            { id: 'actions', label: 'Actions', icon: CheckCircle },
            { id: 'milestones', label: 'Milestones', icon: Trophy },
            { id: 'achievements', label: 'Achievements', icon: Award }
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id as 'progress' | 'actions' | 'milestones' | 'achievements')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                selectedTab === id
                  ? "text-[var(--hive-gold)] border-b-2 border-[var(--hive-gold)] bg-[var(--hive-gold)]/5"
                  : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)]"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {selectedTab === 'progress' && (
            <motion.div
              key="progress"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {([
                  { label: 'Actions Completed', value: `${participation.completedActions.length}/${ritual.actions.length}`, icon: CheckCircle },
                  { label: 'Current Streak', value: `${participation.streakDays} days`, icon: Flame },
                  { label: 'Total Score', value: participation.score.toLocaleString(), icon: Star },
                  { label: 'Time Active', value: `${Math.floor((Date.now() - new Date(participation.joinedAt).getTime()) / (1000 * 60 * 60 * 24))} days`, icon: Calendar }
                ] as const).map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-4 bg-[var(--hive-background-tertiary)] rounded-lg text-center">
                    <Icon className="h-6 w-6 mx-auto mb-2 text-[var(--hive-gold)]" />
                    <div className="text-xl font-bold text-[var(--hive-text-primary)]">{value}</div>
                    <div className="text-xs text-[var(--hive-text-secondary)]">{label}</div>
                  </div>
                ))}
              </div>

              {/* Personal Bests */}
              {participation.personalBest && (
                <div>
                  <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">Personal Records</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Longest Streak', value: `${participation.personalBest.longestStreak} days` },
                      { label: 'Highest Score', value: participation.personalBest.highestScore.toLocaleString() },
                      { label: 'Fastest Completion', value: `${participation.personalBest.fastestCompletion}m` }
                    ].map(({ label, value }) => (
                      <div key={label} className="text-center">
                        <div className="text-lg font-bold text-[var(--hive-gold)]">{value}</div>
                        <div className="text-xs text-[var(--hive-text-secondary)]">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'actions' && showActions && (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Required Actions */}
              <div>
                <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">Required Actions</h4>
                <div className="space-y-3">
                  {requiredActions.map((action) => {
                    const isCompleted = completedActionIds.includes(action.id);
                    const completionData = participation.completedActions.find(ca => ca.actionId === action.id);
                    
                    return (
                      <div
                        key={action.id}
                        className={cn(
                          "p-4 rounded-lg border transition-all",
                          isCompleted 
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-gold)]/30"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                            ) : (
                              <Circle className="h-5 w-5 text-[var(--hive-text-secondary)] mt-0.5" />
                            )}
                            <div>
                              <h5 className="font-medium text-[var(--hive-text-primary)]">{action.name}</h5>
                              <p className="text-sm text-[var(--hive-text-secondary)] mb-2">{action.description}</p>
                              {isCompleted && completionData && (
                                <div className="text-xs text-green-400">
                                  Completed {new Date(completionData.completedAt).toLocaleDateString()} • +{completionData.points} points
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-[var(--hive-gold)]">+{action.weight}pts</span>
                            {!isCompleted && isActive && onActionComplete && (
                              <button
                                onClick={() => handleActionComplete(action.id)}
                                disabled={completingAction === action.id}
                                className="px-3 py-1.5 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg text-sm font-medium hover:bg-[var(--hive-gold)]/90 disabled:opacity-50"
                              >
                                {completingAction === action.id ? 'Completing...' : 'Complete'}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Optional Actions */}
              {optionalActions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-[var(--hive-text-primary)] mb-3">Optional Actions</h4>
                  <div className="space-y-3">
                    {optionalActions.map((action) => {
                      const isCompleted = completedActionIds.includes(action.id);
                      const completionData = participation.completedActions.find(ca => ca.actionId === action.id);
                      
                      return (
                        <div
                          key={action.id}
                          className={cn(
                            "p-4 rounded-lg border transition-all",
                            isCompleted 
                              ? "bg-blue-500/10 border-blue-500/30"
                              : "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)] hover:border-[var(--hive-gold)]/30"
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                              ) : (
                                <Circle className="h-5 w-5 text-[var(--hive-text-secondary)] mt-0.5" />
                              )}
                              <div>
                                <h5 className="font-medium text-[var(--hive-text-primary)]">{action.name}</h5>
                                <p className="text-sm text-[var(--hive-text-secondary)] mb-2">{action.description}</p>
                                {isCompleted && completionData && (
                                  <div className="text-xs text-blue-400">
                                    Completed {new Date(completionData.completedAt).toLocaleDateString()} • +{completionData.points} points
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-[var(--hive-gold)]">+{action.weight}pts</span>
                              {!isCompleted && isActive && onActionComplete && (
                                <button
                                  onClick={() => handleActionComplete(action.id)}
                                  disabled={completingAction === action.id}
                                  className="px-3 py-1.5 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg text-sm font-medium hover:bg-[var(--hive-gold)]/90 disabled:opacity-50"
                                >
                                  {completingAction === action.id ? 'Completing...' : 'Complete'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'milestones' && (
            <motion.div
              key="milestones"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {ritual.milestones.map((milestone) => {
                const isReached = participation.milestonesReached.some(rm => rm.milestoneId === milestone.id);
                const reachedData = participation.milestonesReached.find(rm => rm.milestoneId === milestone.id);
                
                return (
                  <div
                    key={milestone.id}
                    className={cn(
                      "p-4 rounded-lg border transition-all",
                      isReached 
                        ? "bg-[var(--hive-gold)]/10 border-[var(--hive-gold)]/30"
                        : "bg-[var(--hive-background-tertiary)] border-[var(--hive-border-subtle)]"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {isReached ? (
                        <Trophy className="h-6 w-6 text-[var(--hive-gold)] mt-1" />
                      ) : (
                        <Target className="h-6 w-6 text-[var(--hive-text-secondary)] mt-1" />
                      )}
                      <div className="flex-1">
                        <h5 className="font-semibold text-[var(--hive-text-primary)]">{milestone.name}</h5>
                        <p className="text-sm text-[var(--hive-text-secondary)] mb-2">{milestone.description}</p>
                        {isReached && reachedData && (
                          <div className="text-xs text-[var(--hive-gold)]">
                            Reached on {new Date(reachedData.reachedAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                          {milestone.threshold}%
                        </div>
                        <div className="text-xs text-[var(--hive-text-secondary)]">threshold</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {selectedTab === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {participation.achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {participation.achievements.map((achievement) => {
                    const rarityConfig = RARITY_CONFIG[achievement.rarity];
                    
                    return (
                      <div
                        key={achievement.id}
                        className={cn(
                          "p-4 rounded-lg border transition-all hover:scale-105",
                          rarityConfig.bg,
                          rarityConfig.border
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2 rounded-lg", rarityConfig.bg)}>
                            <Award className={cn("h-6 w-6", rarityConfig.color)} />
                          </div>
                          <div>
                            <h5 className="font-semibold text-[var(--hive-text-primary)]">{achievement.name}</h5>
                            <p className="text-sm text-[var(--hive-text-secondary)] mb-2">{achievement.description}</p>
                            <div className="flex items-center gap-2">
                              <span className={cn("text-xs px-2 py-1 rounded-full", rarityConfig.bg, rarityConfig.color)}>
                                {achievement.rarity.toUpperCase()}
                              </span>
                              <span className="text-xs text-[var(--hive-text-secondary)]">
                                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-[var(--hive-text-secondary)]">
                  <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No achievements unlocked yet</p>
                  <p className="text-sm">Complete more actions to unlock achievements!</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      {isActive && (
        <div className="p-6 border-t border-[var(--hive-border-subtle)] bg-[var(--hive-background-tertiary)]">
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-[var(--hive-gold)] text-[var(--hive-black)] rounded-lg hover:bg-[var(--hive-gold)]/90 transition-colors font-medium">
              Continue Participating
            </button>
            {onShare && (
              <button
                onClick={onShare}
                className="px-4 py-2 border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Progress
              </button>
            )}
            {onWithdraw && (
              <button
                onClick={onWithdraw}
                className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
              >
                Withdraw
              </button>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}