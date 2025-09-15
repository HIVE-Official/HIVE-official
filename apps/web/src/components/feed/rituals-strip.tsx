"use client";

import React, { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

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
  Heart,
  Target,
  Zap,
  Gift,
  Calendar,
  TrendingUp,
  Bell,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import toast from '@/hooks/use-toast-notifications';

// Real-time ritual interface matching the backend
export interface RitualStrip {
  id: string;
  ritual: {
    id: string;
    name: string;
    title: string;
    description: string;
    type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
    status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused' | 'cancelled' | 'archived';
    participationType: 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';
    startTime: string;
    endTime?: string;
    maxParticipants?: number;
    currentParticipants: number;
  };
  userParticipation?: {
    status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
    progressPercentage: number;
    streakDays?: number;
    emoji?: string;
    joinedAt: string;
    lastActiveAt: string;
  };
  timeRemaining: number; // minutes
  canParticipate: boolean;
  quickActions?: string[]; // for quick participation
  participations: Array<{
    userId: string;
    emoji?: string;
    timestamp: string;
  }>;
}

const RITUAL_TYPE_CONFIG = {
  onboarding: { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30' },
  seasonal: { icon: Calendar, color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/30' },
  achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
  community: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
  creative: { icon: Zap, color: 'text-pink-400', bgColor: 'bg-pink-500/20', borderColor: 'border-pink-500/30' },
  emergency: { icon: Target, color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
  legacy: { icon: Gift, color: 'text-indigo-400', bgColor: 'bg-indigo-500/20', borderColor: 'border-indigo-500/30' }
};

export function RitualsStrip() {
  const [activeRituals, setActiveRituals] = useState<RitualStrip[]>([]);
  const [participatingIn, setParticipatingIn] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch active rituals from API
  const fetchActiveRituals = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authenticatedFetch('/api/rituals?status=active&limit=10');
      if (!response.ok) {
        throw new Error('Failed to fetch rituals');
      }
      
      const data = await response.json();
      
      // Transform API response to RitualStrip format
      const ritualStrips: RitualStrip[] = data.rituals
        .filter((ritual: any) => ritual.status === 'active')
        .map((ritual: any) => ({
          id: `strip-${ritual.id}`,
          ritual: {
            id: ritual.id,
            name: ritual.name,
            title: ritual.title,
            description: ritual.description,
            type: ritual.type,
            status: ritual.status,
            participationType: ritual.participationType,
            startTime: ritual.startTime,
            endTime: ritual.endTime,
            maxParticipants: ritual.maxParticipants,
            currentParticipants: ritual.participantCount || 0
          },
          userParticipation: ritual.userParticipation ? {
            status: ritual.userParticipation.status,
            progressPercentage: ritual.userParticipation.progressPercentage || 0,
            streakDays: ritual.userParticipation.streakDays || 0,
            emoji: ritual.userParticipation.emoji,
            joinedAt: ritual.userParticipation.joinedAt,
            lastActiveAt: ritual.userParticipation.lastActiveAt
          } : undefined,
          timeRemaining: ritual.endTime 
            ? Math.max(0, Math.floor((new Date(ritual.endTime).getTime() - Date.now()) / (1000 * 60)))
            : 1440, // 24 hours default
          canParticipate: ritual.status === 'active' && !ritual.userParticipation,
          quickActions: ['🔥', '💪', '🎯', '✨'], // Default quick actions
          participations: [] // Would be populated from real participation data
        }));
      
      setActiveRituals(ritualStrips);
    } catch (err) {
      logger.error('Failed to fetch rituals:', err);
      setError(err instanceof Error ? err.message : 'Failed to load rituals');
      setActiveRituals([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial fetch and periodic updates
  useEffect(() => {
    fetchActiveRituals();
    
    // Update every 5 minutes for real-time feel
    const interval = setInterval(fetchActiveRituals, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Don't render if loading, no rituals, or error
  if (isLoading || error || !activeRituals.length) {
    return null;
  }

  const handleQuickParticipate = async (ritualStrip: RitualStrip, emoji: string) => {
    if (!ritualStrip.ritual?.id || participatingIn) return;
    
    setParticipatingIn(ritualStrip.ritual.id);
    setSelectedEmoji({ ...selectedEmoji, [ritualStrip.ritual.id]: emoji });
    
    try {
      const response = await authenticatedFetch(`/api/rituals/${ritualStrip.ritual.id}/participate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emoji,
          actionType: 'quick_participate',
          data: { quickAction: emoji }
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to participate in ritual');
      }
      
      toast.success('Participated in ritual!', `You reacted with ${emoji}`);
      
      // Refresh rituals to get updated participation state
      setTimeout(() => {
        fetchActiveRituals();
      }, 1000);
      
    } catch (error) {
      logger.error('Failed to participate:', error);
      toast.error('Failed to participate', 'Please try again');
    } finally {
      setParticipatingIn(null);
    }
  };
  
  const handleJoinRitual = async (ritualId: string) => {
    try {
      const response = await authenticatedFetch(`/api/rituals/${ritualId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) {
        throw new Error('Failed to join ritual');
      }
      
      toast.success('Joined ritual!', 'Welcome to the journey');
      
      // Refresh rituals to get updated participation state
      fetchActiveRituals();
      
    } catch (error) {
      logger.error('Failed to join ritual:', error);
      toast.error('Failed to join ritual', 'Please try again');
    }
  };

  const handleDismiss = async (ritualId: string) => {
    try {
      // Remove from local state immediately for responsive UI
      setActiveRituals(prev => prev.filter(r => r.ritual.id !== ritualId));
      
      // Note: In a full implementation, you'd also call an API to persist the dismissal
      // await authenticatedFetch(`/api/rituals/${ritualId}/dismiss`, { method: 'POST' });
      
    } catch (error) {
      logger.error('Failed to dismiss ritual:', error);
      // Refresh to restore state if dismiss failed
      fetchActiveRituals();
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
          {activeRituals.map((ritualStrip, index) => {
            const { ritual, userParticipation } = ritualStrip;
            const config = RITUAL_TYPE_CONFIG[ritual.type] || RITUAL_TYPE_CONFIG.community;
            const Icon = config.icon;
            
            return (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex-shrink-0 w-80 p-4 bg-gradient-to-br border rounded-xl transition-all group",
                  userParticipation
                    ? "from-green-500/10 to-green-600/5 border-green-500/30"
                    : "from-white/[0.03] to-white/[0.01] hover:from-white/[0.05] hover:to-white/[0.02]",
                  config.borderColor
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", config.bgColor)}>
                      <Icon className={cn("h-5 w-5", config.color)} />
                    </div>
                    <div>
                      <h4 className="font-medium text-[var(--hive-text-primary)] text-sm group-hover:text-[var(--hive-gold)] transition-colors">
                        {ritual.title}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {ritual.currentParticipants} participants
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDismiss(ritual.id)}
                      className="p-1 hover:bg-[var(--hive-white)]/[0.05] rounded-lg transition-all text-gray-400 hover:text-[var(--hive-text-primary)]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-400/10 text-green-400 rounded-md text-xs">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Live
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-400 mb-3">
                  {ritual.description}
                </p>

                {/* Quick Actions */}
                {ritualStrip.canParticipate && ritualStrip.quickActions && (
                  <div className="flex gap-1 mb-3">
                    {ritualStrip.quickActions.map((action: string) => (
                      <button
                        key={action}
                        onClick={() => handleQuickParticipate(ritualStrip, action)}
                        disabled={participatingIn === ritual.id}
                        className={cn(
                          "flex-1 px-2 py-1.5 text-xs rounded-lg transition-all",
                          "bg-[var(--hive-white)]/[0.05] hover:bg-[var(--hive-white)]/[0.08]",
                          "border border-[var(--hive-white)]/[0.08]",
                          selectedEmoji[ritual.id] === action && "bg-[var(--hive-gold)]/20 border-[var(--hive-gold)]/30",
                          "disabled:opacity-50 disabled:cursor-not-allowed"
                        )}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}

                {/* User Participation Status */}
                {userParticipation && (
                  <div className="mb-3 p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <Heart className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">You're participating!</span>
                      {userParticipation.emoji && (
                        <span className="text-sm">{userParticipation.emoji}</span>
                      )}
                    </div>
                    {userParticipation.streakDays && userParticipation.streakDays > 1 && (
                      <div className="text-xs text-gray-400 mt-1">
                        🔥 {userParticipation.streakDays} day streak
                      </div>
                    )}
                  </div>
                )}

                {/* Progress Bar */}
                {userParticipation && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-400">Your Progress</span>
                      <span className="text-[var(--hive-text-primary)] font-medium">
                        {userParticipation.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--hive-white)]/[0.05] rounded-full h-2">
                      <motion.div 
                        className="bg-gradient-to-r from-[var(--hive-gold)] to-[#FF6B35] h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${userParticipation.progressPercentage}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    {userParticipation?.streakDays && userParticipation.streakDays > 0 && (
                      <div className="flex items-center gap-1">
                        <Trophy className="w-3 h-3 text-[var(--hive-gold)]" />
                        <span>{userParticipation.streakDays} streak</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Timer className="w-3 h-3" />
                      <span>{formatTimeRemaining(ritualStrip.timeRemaining)} left</span>
                    </div>
                  </div>
                  
                  {!userParticipation && ritualStrip.canParticipate && (
                    <button 
                      onClick={() => handleJoinRitual(ritual.id)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] rounded-lg text-xs font-medium hover:bg-[var(--hive-gold)]/30 transition-all"
                    >
                      <Play className="w-3 h-3" />
                      Join
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