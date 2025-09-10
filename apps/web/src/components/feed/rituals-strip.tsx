"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Timer, 
  Users, 
  Trophy,
  Play,
  ChevronRight,
  Clock,
  X,
  MapPin,
  Camera,
  Heart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFeedAggregation } from '@/hooks/use-feed-aggregation';
import { type RitualStrip } from '@/lib/rituals/ritual-engine';

// Rituals will be implemented in v1 - no mock data needed
const mockRituals: any[] = [];

const RITUAL_TYPE_CONFIG = {
  community: {
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/20'
  }
};

export function RitualsStrip() {
  const { ritualStrips, participateInRitual, dismissRitual } = useFeedAggregation();
  const [participatingIn, setParticipatingIn] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<{ [key: string]: string }>({});
  
  // Use real ritual strips if available, otherwise fall back to mock
  const activeRituals = ritualStrips && ritualStrips.length > 0 
    ? ritualStrips 
    : mockRituals.filter(ritual => 
        ritual.status === 'active' && ritual.userParticipation
      );

  if (!activeRituals || activeRituals.length === 0) {
    return null;
  }

  const handleQuickParticipate = async (ritual: any, emoji: string) => {
    if (!ritual.ritual?.id) return;
    
    setParticipatingIn(ritual.ritual.id);
    setSelectedEmoji({ ...selectedEmoji, [ritual.ritual.id]: emoji });
    
    try {
      await participateInRitual(ritual.ritual.id, {
        emoji,
        isAnonymous: false
      });
    } catch (error) {
      console.error('Failed to participate:', error);
    } finally {
      setParticipatingIn(null);
    }
  };

  const handleDismiss = async (ritualId: string) => {
    try {
      await dismissRitual(ritualId);
    } catch (error) {
      console.error('Failed to dismiss ritual:', error);
    }
  };

  const formatTimeRemaining = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  return (
    <div className="bg-gradient-to-r from-[#0D0D0E] to-[var(--hive-background-tertiary)] border-b border-[var(--hive-white)]/[0.08]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[var(--hive-gold)]" />
            <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">Active Rituals</h3>
          </div>
          <button className="text-xs text-gray-400 hover:text-[var(--hive-gold)] transition-colors flex items-center gap-1">
            View All
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <AnimatePresence mode="popLayout">
          {activeRituals.map((ritual: any, index) => {
            // Handle both real ritual strips and mock data
            const isRealRitual = ritual.ritual && ritual.participations;
            const ritualData = isRealRitual ? ritual.ritual : ritual;
            const config = RITUAL_TYPE_CONFIG[ritualData.type || 'community'] || RITUAL_TYPE_CONFIG.community;
            const Icon = config.icon;
            
            return (
              <motion.div
                key={ritualData.id}
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex-shrink-0 w-80 p-4 bg-gradient-to-br border rounded-xl transition-all group",
                  ritual.userParticipation
                    ? "from-green-500/10 to-green-600/5 border-green-500/30"
                    : "from-white/[0.03] to-white/[0.01] hover:from-white/[0.05] hover:to-white/[0.02]",
                  config.borderColor
                )}
                style={{
                  background: ritual.userParticipation
                    ? undefined
                    : ritualData.color ? `linear-gradient(135deg, ${ritualData.color}20, ${ritualData.color}05)` : undefined
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bgColor)}>
                      <Icon className={cn("h-5 w-5", config.color)} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--hive-text-primary)] text-sm group-hover:text-[var(--hive-gold)] transition-colors">
                        {ritualData.name || ritualData.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {isRealRitual 
                          ? `${ritual.participations?.length || 0} participants` 
                          : `${ritual.participantCount} participants`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isRealRitual && (
                      <button
                        onClick={() => handleDismiss(ritualData.id)}
                        className="p-1 hover:bg-[var(--hive-white)]/[0.05] rounded-lg transition-all text-gray-400 hover:text-[var(--hive-text-primary)]"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 rounded-md text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Live
                    </div>
                  </div>
                </div>

                {/* Description */}
                {ritualData.description && (
                  <p className="text-xs text-gray-400 mb-3">
                    {ritualData.description}
                  </p>
                )}

                {/* Quick Actions for Real Rituals */}
                {isRealRitual && ritual.canParticipate && ritualData.participationType === 'quick' && (
                  <div className="flex gap-1 mb-3">
                    {ritualData.quickActions?.map((action: string) => (
                      <button
                        key={action}
                        onClick={() => handleQuickParticipate(ritual, action)}
                        disabled={participatingIn === ritualData.id}
                        className={cn(
                          "flex-1 px-2 py-1.5 text-xs rounded-lg transition-all",
                          "bg-[var(--hive-white)]/[0.05] hover:bg-[var(--hive-white)]/[0.08]",
                          "border border-[var(--hive-white)]/[0.08]",
                          selectedEmoji[ritualData.id] === action && "bg-[var(--hive-gold)]/20 border-[var(--hive-gold)]/30",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}

                {/* User Participation Status */}
                {ritual.userParticipation && (
                  <div className="mb-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <Heart className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">You participated!</span>
                      {ritual.userParticipation.emoji && (
                        <span className="text-sm">{ritual.userParticipation.emoji}</span>
                      )}
                    </div>
                    {ritual.userParticipation.streak && ritual.userParticipation.streak > 1 && (
                      <div className="text-xs text-gray-400 mt-1">
                        🔥 {ritual.userParticipation.streak} day streak
                      </div>
                    )}
                  </div>
                )}

                {/* Progress Bar for Mock Data */}
                {!isRealRitual && ritual.userParticipation && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">Your Progress</span>
                      <span className="text-[var(--hive-text-primary)] font-medium">
                        {ritual.userParticipation.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--hive-white)]/[0.05] rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-[var(--hive-gold)] to-[#FF6B35] h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${ritual.userParticipation.progressPercentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    {(ritual.userParticipation?.currentStreak || ritual.userParticipation?.streak) && (
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-[var(--hive-gold)]" />
                        <span>{ritual.userParticipation.currentStreak || ritual.userParticipation.streak} streak</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      <span>
                        {isRealRitual 
                          ? formatTimeRemaining(ritual.timeRemaining)
                          : ritual.timeRemaining} left
                      </span>
                    </div>
                  </div>
                  
                  {!ritual.userParticipation && (
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded-lg text-xs font-medium hover:bg-[var(--hive-gold)]/30 transition-all">
                      <Play className="w-3 h-3" />
                      Participate
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}