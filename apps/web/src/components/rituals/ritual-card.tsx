"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  Trophy, 
  Clock,
  TrendingUp,
  Target,
  Zap,
  Star,
  ChevronRight,
  Play,
  CheckCircle
} from 'lucide-react';
import { Button, Badge, Progress } from '@hive/ui';
import { cn } from '@hive/ui';
import toast from '@/hooks/use-toast-notifications';
import { authenticatedFetch } from '@/lib/auth-utils';

interface RitualCardProps {
  ritual: {
    id: string;
    name: string;
    title: string;
    description: string;
    tagline: string;
    type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
    status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused' | 'cancelled' | 'archived';
    startTime: string;
    endTime?: string;
    duration?: number;
    participationType: 'individual' | 'collective' | 'progressive' | 'competitive' | 'collaborative' | 'creative' | 'social';
    currentParticipants?: number;
    maxParticipants?: number;
    userParticipation?: {
      status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
      progressPercentage: number;
      streakDays?: number;
      lastCompletedAt?: string;
    };
    metrics?: {
      participationRate: number;
      completionRate: number;
      engagementScore: number;
    };
    milestones?: Array<{
      id: string;
      name: string;
      threshold: number;
      completed: boolean;
    }>;
    rewards?: string[];
  };
  variant?: 'grid' | 'list' | 'featured';
  onJoin?: (ritualId: string) => void;
  onComplete?: (ritualId: string) => void;
}

const typeConfig = {
  onboarding: { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-900/20', label: 'Welcome' },
  seasonal: { icon: Calendar, color: 'text-orange-400', bgColor: 'bg-orange-900/20', label: 'Seasonal' },
  achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', label: 'Achievement' },
  community: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-900/20', label: 'Community' },
  creative: { icon: Zap, color: 'text-pink-400', bgColor: 'bg-pink-900/20', label: 'Creative' },
  emergency: { icon: Target, color: 'text-red-400', bgColor: 'bg-red-900/20', label: 'Emergency' },
  legacy: { icon: Star, color: 'text-indigo-400', bgColor: 'bg-indigo-900/20', label: 'Legacy' }
};

export function RitualCard({ ritual, variant = 'grid', onJoin, onComplete }: RitualCardProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  
  const config = typeConfig[ritual.type];
  const Icon = config.icon;
  const isActive = ritual.status === 'active';
  const isUserParticipating = ritual.userParticipation?.status === 'joined' || ritual.userParticipation?.status === 'active';
  const progress = ritual.userParticipation?.progressPercentage || 0;

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      const response = await authenticatedFetch(`/api/rituals/${ritual.id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to join ritual');

      toast.success(`Joined ${ritual.title}!`, 'Your journey begins now');
      if (onJoin) onJoin(ritual.id);
    } catch (error) {
      console.error('Failed to join ritual:', error);
      toast.error('Failed to join ritual', 'Please try again');
    } finally {
      setIsJoining(false);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      const response = await authenticatedFetch(`/api/rituals/${ritual.id}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to complete ritual');

      toast.success('Ritual completed!', `+${ritual.rewards?.[0] || '10'} points earned`);
      if (onComplete) onComplete(ritual.id);
    } catch (error) {
      console.error('Failed to complete ritual:', error);
      toast.error('Failed to complete ritual', 'Please try again');
    } finally {
      setIsCompleting(false);
    }
  };

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-xl border border-[var(--hive-white)]/[0.08] bg-gradient-to-br from-[var(--hive-white)]/[0.05] to-transparent p-6"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--hive-gold)]/20 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={cn("p-3 rounded-xl", config.bgColor)}>
                <Icon className={cn("h-6 w-6", config.color)} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--hive-text-primary)]">{ritual.title}</h3>
                <p className="text-sm text-[var(--hive-gold)]">{ritual.tagline}</p>
              </div>
            </div>
            <Badge variant="outline" className={config.color}>
              {config.label}
            </Badge>
          </div>

          <p className="text-gray-400 mb-6">{ritual.description}</p>

          {ritual.milestones && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">Milestones</span>
                <span className="text-xs text-[var(--hive-gold)]">
                  {ritual.milestones.filter(m => m.completed).length}/{ritual.milestones.length}
                </span>
              </div>
              <div className="flex gap-2">
                {ritual.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={cn(
                      "flex-1 h-2 rounded-full",
                      milestone.completed ? "bg-[var(--hive-gold)]" : "bg-[var(--hive-white)]/[0.1]"
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {ritual.currentParticipants || 0}
              </div>
              <div className="text-xs text-gray-400">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {Math.round(ritual.metrics?.completionRate || 0)}%
              </div>
              <div className="text-xs text-gray-400">Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {ritual.userParticipation?.streakDays || 0}
              </div>
              <div className="text-xs text-gray-400">Day Streak</div>
            </div>
          </div>

          {isUserParticipating ? (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-400">Your Progress</span>
                  <span className="text-sm font-medium text-[var(--hive-gold)]">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <Button
                className="w-full bg-[var(--hive-gold)] text-[var(--hive-black)] hover:bg-[var(--hive-gold)]/90"
                onClick={handleComplete}
                disabled={isCompleting || progress === 100}
              >
                {isCompleting ? 'Completing...' : progress === 100 ? 'Completed!' : 'Mark Progress'}
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-[var(--hive-gold)] text-[var(--hive-black)] hover:bg-[var(--hive-gold)]/90"
              onClick={handleJoin}
              disabled={!isActive || isJoining}
            >
              {isJoining ? 'Joining...' : 'Join Ritual'}
            </Button>
          )}
        </div>
      </motion.div>
    );
  }

  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 p-4 rounded-xl border border-[var(--hive-white)]/[0.08] bg-[var(--hive-white)]/[0.02] hover:bg-[var(--hive-white)]/[0.05] transition-all"
      >
        <div className={cn("p-2 rounded-lg", config.bgColor)}>
          <Icon className={cn("h-5 w-5", config.color)} />
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--hive-text-primary)]">{ritual.title}</h4>
          <p className="text-sm text-gray-400">{ritual.tagline}</p>
        </div>

        {isUserParticipating && (
          <div className="flex items-center gap-2">
            <div className="w-24">
              <Progress value={progress} className="h-1.5" />
            </div>
            <span className="text-xs text-gray-400">{progress}%</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {ritual.userParticipation?.streakDays && ritual.userParticipation.streakDays > 0 && (
            <Badge variant="outline" className="text-xs">
              🔥 {ritual.userParticipation.streakDays}
            </Badge>
          )}
          <Button
            size="sm"
            variant={isUserParticipating ? "outline" : "primary"}
            onClick={isUserParticipating ? handleComplete : handleJoin}
            disabled={!isActive || isJoining || isCompleting}
          >
            {isUserParticipating ? <Play className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          </Button>
        </div>
      </motion.div>
    );
  }

  // Grid variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-xl border border-[var(--hive-white)]/[0.08] bg-[var(--hive-white)]/[0.02] hover:border-[var(--hive-white)]/[0.12] transition-all"
    >
      <div className={cn("h-2", config.bgColor)} />
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={cn("p-2 rounded-lg", config.bgColor)}>
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
          {isActive && (
            <Badge variant="outline" className="text-xs animate-pulse">
              Live
            </Badge>
          )}
        </div>

        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">{ritual.title}</h3>
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{ritual.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{ritual.currentParticipants || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>{Math.round(ritual.metrics?.engagementScore || 0)}%</span>
          </div>
          {ritual.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{ritual.duration}d</span>
            </div>
          )}
        </div>

        {isUserParticipating ? (
          <div className="space-y-2">
            <Progress value={progress} className="h-1.5" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{progress}% complete</span>
              {ritual.userParticipation?.streakDays && ritual.userParticipation.streakDays > 0 && (
                <span className="text-xs text-[var(--hive-gold)]">
                  🔥 {ritual.userParticipation.streakDays} days
                </span>
              )}
            </div>
          </div>
        ) : (
          <Button
            className="w-full"
            size="sm"
            variant={isActive ? "primary" : "outline"}
            onClick={handleJoin}
            disabled={!isActive || isJoining}
          >
            {isJoining ? 'Joining...' : isActive ? 'Join Now' : 'Coming Soon'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}