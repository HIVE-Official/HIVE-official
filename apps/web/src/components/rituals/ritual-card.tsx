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
  CheckCircle,
  Plus,
  Gift,
  MapPin,
  Flame,
  Eye,
  Share2,
  Bell,
  ExternalLink,
  Award,
  Heart,
  Timer
} from 'lucide-react';
import { Button, Badge, Progress } from '@hive/ui';
import { cn } from '@hive/ui';
import toast from '@/hooks/use-toast-notifications';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';

export interface RitualCardProps {
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
    participantCount?: number; // Alternative naming from API
    userParticipation?: {
      status: 'invited' | 'joined' | 'active' | 'completed' | 'dropped';
      progressPercentage: number;
      streakDays?: number;
      lastCompletedAt?: string;
      joinedAt?: string;
      lastActiveAt?: string;
      score?: number;
      rank?: number;
    };
    metrics?: {
      participationRate: number;
      completionRate: number;
      engagementScore: number;
      socialImpact?: number;
    };
    milestones?: Array<{
      id: string;
      name: string;
      description?: string;
      threshold: number;
      completed: boolean;
      participantThreshold?: number;
      progressThreshold?: number;
    }>;
    rewards?: Array<{
      id: string;
      name: string;
      type: string;
      rarity?: string;
    }> | string[];
    actions?: Array<{
      id: string;
      type: string;
      name: string;
      description: string;
      isRequired: boolean;
      weight: number;
    }>;
    // Additional fields from API
    category?: string;
    tags?: string[];
    universities?: string[];
    isGlobal?: boolean;
    location?: string;
    imageUrl?: string;
  };
  variant?: 'grid' | 'list' | 'featured' | 'compact' | 'showcase';
  onJoin?: (ritualId: string) => Promise<void> | void;
  onComplete?: (ritualId: string) => Promise<void> | void;
  onView?: (ritualId: string) => void;
  onShare?: (ritual: RitualCardProps['ritual']) => void;
  className?: string;
  showActions?: boolean;
  showMetrics?: boolean;
  showProgress?: boolean;
}

const typeConfig = {
  onboarding: { icon: Sparkles, color: 'text-purple-400', bgColor: 'bg-purple-900/20', label: 'Welcome' },
  seasonal: { icon: Calendar, color: 'text-orange-400', bgColor: 'bg-orange-900/20', label: 'Seasonal' },
  achievement: { icon: Trophy, color: 'text-yellow-400', bgColor: 'bg-yellow-900/20', label: 'Achievement' },
  community: { icon: Users, color: 'text-blue-400', bgColor: 'bg-blue-900/20', label: 'Community' },
  creative: { icon: Zap, color: 'text-pink-400', bgColor: 'bg-pink-900/20', label: 'Creative' },
  emergency: { icon: Target, color: 'text-red-400', bgColor: 'bg-red-900/20', label: 'Emergency' },
  legacy: { icon: Gift, color: 'text-indigo-400', bgColor: 'bg-indigo-900/20', label: 'Legacy' }
};

export function RitualCard({ 
  ritual, 
  variant = 'grid', 
  onJoin, 
  onComplete, 
  onView,
  onShare,
  className,
  showActions = true,
  showMetrics = true,
  showProgress = true
}: RitualCardProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const config = typeConfig[ritual.type];
  const Icon = config.icon;
  const isActive = ritual.status === 'active';
  const isCompleted = ritual.status === 'completed';
  const isUserParticipating = ritual.userParticipation?.status === 'joined' || ritual.userParticipation?.status === 'active';
  const progress = ritual.userParticipation?.progressPercentage || 0;
  const participantCount = ritual.currentParticipants || ritual.participantCount || 0;

  const handleJoin = async () => {
    if (!onJoin || isJoining) return;
    
    setIsJoining(true);
    try {
      if (onJoin.constructor.name === 'AsyncFunction') {
        await onJoin(ritual.id);
      } else {
        onJoin(ritual.id);
      }
      
      toast.success(`Joined ${ritual.title}!`, 'Your journey begins now');
    } catch (error) {
      console.error('Failed to join ritual:', error);
      toast.error('Failed to join ritual', 'Please try again');
    } finally {
      setIsJoining(false);
    }
  };

  const handleComplete = async () => {
    if (!onComplete || isCompleting) return;
    
    setIsCompleting(true);
    try {
      if (onComplete.constructor.name === 'AsyncFunction') {
        await onComplete(ritual.id);
      } else {
        onComplete(ritual.id);
      }
      
      toast.success('Ritual completed!', `Great job finishing ${ritual.title}!`);
    } catch (error) {
      console.error('Failed to complete ritual:', error);
      toast.error('Failed to complete ritual', 'Please try again');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleView = () => {
    if (onView) {
      onView(ritual.id);
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare(ritual);
    }
  };

  const formatTimeRemaining = (): string => {
    if (!ritual.endTime) return '';
    
    const now = new Date();
    const end = new Date(ritual.endTime);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Less than 1h left';
  };

  // Compact variant for lists or small spaces
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-background-tertiary)] transition-all cursor-pointer",
          className
        )}
        onClick={handleView}
      >
        <div className={cn("p-2 rounded-lg", config.bgColor)}>
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-[var(--hive-text-primary)] truncate">{ritual.title}</h4>
          <p className="text-xs text-[var(--hive-text-secondary)] truncate">{ritual.tagline}</p>
        </div>

        {isUserParticipating && showProgress && (
          <div className="flex items-center gap-2">
            <div className="w-16">
              <Progress value={progress} className="h-1.5" />
            </div>
            <span className="text-xs text-[var(--hive-text-secondary)]">{progress}%</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-[var(--hive-text-secondary)]">
          <Users className="h-3 w-3" />
          <span>{participantCount}</span>
        </div>

        <ChevronRight className="h-4 w-4 text-[var(--hive-text-secondary)]" />
      </motion.div>
    );
  }

  // List variant
  if (variant === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-start gap-4 p-4 rounded-xl border border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-glass)] transition-all",
          className
        )}
      >
        <div className={cn("p-3 rounded-xl", config.bgColor)}>
          <Icon className={cn("h-6 w-6", config.color)} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-[var(--hive-text-primary)]">{ritual.title}</h3>
              <p className="text-sm text-[var(--hive-gold)]">{ritual.tagline}</p>
            </div>
            <Badge variant="outline" className={config.color}>
              {config.label}
            </Badge>
          </div>

          <p className="text-sm text-[var(--hive-text-secondary)] mb-3 line-clamp-2">{ritual.description}</p>

          <div className="flex items-center gap-6 text-sm text-[var(--hive-text-secondary)] mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{participantCount}{ritual.maxParticipants && `/${ritual.maxParticipants}`}</span>
            </div>
            {ritual.endTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTimeRemaining()}</span>
              </div>
            )}
            {showMetrics && ritual.metrics && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span>{Math.round(ritual.metrics.engagementScore || 0)}% engagement</span>
              </div>
            )}
          </div>

          {isUserParticipating && showProgress && (
            <div className="mb-3">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[var(--hive-text-secondary)]">Your Progress</span>
                <span className="text-sm font-medium text-[var(--hive-gold)]">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {ritual.userParticipation?.streakDays && ritual.userParticipation.streakDays > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-md text-xs">
                  <Flame className="h-3 w-3" />
                  {ritual.userParticipation.streakDays}
                </div>
              )}
              {isActive && (
                <Badge variant="outline" className="text-xs animate-pulse text-green-400">
                  Live
                </Badge>
              )}
            </div>

            {showActions && (
              <div className="flex items-center gap-2">
                {onView && (
                  <Button variant="ghost" size="sm" onClick={handleView}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                )}
                {onShare && (
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
                {isUserParticipating ? (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleComplete}
                    disabled={isCompleting || progress === 100}
                  >
                    {isCompleting ? 'Completing...' : progress === 100 ? 'Completed!' : 'Continue'}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant={isActive ? "primary" : "secondary"}
                    onClick={handleJoin}
                    disabled={!isActive || isJoining}
                  >
                    {isJoining ? 'Joining...' : isActive ? 'Join' : 'Coming Soon'}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Featured variant for hero display
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "relative overflow-hidden rounded-xl border border-[var(--hive-border-subtle)] bg-gradient-to-br from-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] p-6",
          className
        )}
      >
        {/* Background Pattern */}
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
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={config.color}>
                {config.label}
              </Badge>
              {isActive && (
                <Badge variant="outline" className="text-xs animate-pulse text-green-400">
                  Live
                </Badge>
              )}
            </div>
          </div>

          <p className="text-[var(--hive-text-secondary)] mb-6">{ritual.description}</p>

          {/* Milestones Preview */}
          {ritual.milestones && ritual.milestones.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--hive-text-secondary)]">Milestones</span>
                <span className="text-xs text-[var(--hive-gold)]">
                  {ritual.milestones.filter(m => m.completed).length}/{ritual.milestones.length}
                </span>
              </div>
              <div className="flex gap-2">
                {ritual.milestones.slice(0, 5).map((milestone) => (
                  <div
                    key={milestone.id}
                    className={cn(
                      "flex-1 h-2 rounded-full",
                      milestone.completed ? "bg-[var(--hive-gold)]" : "bg-[var(--hive-border-subtle)]"
                    )}
                    title={milestone.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {participantCount}
              </div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Participants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {showMetrics && ritual.metrics ? Math.round(ritual.metrics.completionRate || 0) : '—'}%
              </div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {ritual.userParticipation?.streakDays || 0}
              </div>
              <div className="text-xs text-[var(--hive-text-secondary)]">Day Streak</div>
            </div>
          </div>

          {isUserParticipating && showProgress ? (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[var(--hive-text-secondary)]">Your Progress</span>
                  <span className="text-sm font-medium text-[var(--hive-gold)]">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              {showActions && (
                <Button
                  className="w-full bg-[var(--hive-gold)] text-[var(--hive-black)] hover:bg-[var(--hive-gold)]/90"
                  onClick={handleComplete}
                  disabled={isCompleting || progress === 100}
                >
                  {isCompleting ? 'Completing...' : progress === 100 ? 'Completed!' : 'Continue Journey'}
                </Button>
              )}
            </div>
          ) : (
            showActions && (
              <div className="flex gap-3">
                <Button
                  className="flex-1 bg-[var(--hive-gold)] text-[var(--hive-black)] hover:bg-[var(--hive-gold)]/90"
                  onClick={handleJoin}
                  disabled={!isActive || isJoining}
                >
                  {isJoining ? 'Joining...' : isActive ? 'Join Ritual' : 'Coming Soon'}
                </Button>
                {onShare && (
                  <Button variant="secondary" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )
          )}
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
      className={cn(
        "relative overflow-hidden rounded-xl border border-[var(--hive-border-subtle)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-glass)] transition-all cursor-pointer",
        className
      )}
      onClick={handleView}
    >
      {/* Type indicator */}
      <div className={cn("h-2", config.bgColor)} />
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={cn("p-2 rounded-lg", config.bgColor)}>
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
          <div className="flex items-center gap-1">
            {isActive && (
              <Badge variant="outline" className="text-xs animate-pulse text-green-400">
                Live
              </Badge>
            )}
            {ritual.userParticipation?.streakDays && ritual.userParticipation.streakDays > 0 && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">
                <Flame className="h-2.5 w-2.5" />
                {ritual.userParticipation.streakDays}
              </div>
            )}
          </div>
        </div>

        <h3 className="font-semibold text-[var(--hive-text-primary)] mb-1">{ritual.title}</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-4 line-clamp-2">{ritual.description}</p>

        <div className="flex items-center gap-4 text-xs text-[var(--hive-text-secondary)] mb-4">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{participantCount}</span>
          </div>
          {showMetrics && ritual.metrics && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{Math.round(ritual.metrics.engagementScore || 0)}%</span>
            </div>
          )}
          {ritual.endTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatTimeRemaining()}</span>
            </div>
          )}
        </div>

        {isUserParticipating && showProgress ? (
          <div className="space-y-2">
            <Progress value={progress} className="h-1.5" />
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--hive-text-secondary)]">{progress}% complete</span>
              {ritual.userParticipation?.rank && (
                <span className="text-xs text-[var(--hive-gold)]">
                  Rank #{ritual.userParticipation.rank}
                </span>
              )}
            </div>
          </div>
        ) : (
          showActions && (
            <Button
              className="w-full"
              size="sm"
              variant={isActive ? "primary" : "secondary"}
              onClick={(e) => {
                e.stopPropagation();
                handleJoin();
              }}
              disabled={!isActive || isJoining}
            >
              {isJoining ? 'Joining...' : isActive ? 'Join Now' : 'Coming Soon'}
            </Button>
          )
        )}
      </div>

      {/* Action buttons overlay */}
      {showActions && (
        <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onShare && (
            <Button
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleShare();
              }}
              className="h-8 w-8 p-0"
            >
              <Share2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}