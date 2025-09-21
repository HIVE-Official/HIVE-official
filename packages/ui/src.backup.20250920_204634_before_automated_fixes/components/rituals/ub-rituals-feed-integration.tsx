'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from '../../atomic/atoms/badge';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
import { Text } from '../../atomic/atoms/text';
import { Icon } from '../../atomic/atoms/icon';
import { cn } from '../../lib/utils';
import { 
  Sparkles,
  Calendar,
  Users,
  Trophy,
  Clock,
  Heart,
  Zap,
  Star,
  Target,
  ArrowRight,
  Play,
  CheckCircle,
  Timer,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Activity;
} from 'lucide-react';

// =============================================================================
// UB CAMPUS RITUAL TYPES;
// =============================================================================

export interface UBRitual {id: string;
  name: string;
  title: string;
  description: string;
  tagline: string;
  type: 'orientation' | 'finals' | 'homecoming' | 'spring_fest' | 'graduation' | 'move_in' | 'club_rush';
  status: 'upcoming' | 'active' | 'completed' | 'archived';
  startTime: string;
  endTime?: string;
  duration?: number;
  participationType: 'individual' | 'dorm' | 'class' | 'campus_wide' | 'club' | 'academic';
  maxParticipants?: number;
  campusLocation?: string;
  ubSpecific: {
    buildings?: string[];
    dorms?: string[];
    departments?: string[];
    campusAreas?: ('north' | 'south' | 'downtown')[]};
  metrics: {
    participationRate: number;
    completionRate: number;
    engagementScore: number;
    campusImpact: number;
  };
  rewards?: {
    points: number;
    badges: string[];
    swag?: string[]
  }
}

export interface UBRitualFeedPost {id: string;
  type: 'ritual_announcement' | 'ritual_milestone' | 'ritual_completion' | 'ritual_reminder';
  ritual: UBRitual;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role?: string;};
  content: string;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    participants: number;
  };
  milestone?: {
    achievement: string;
    participantCount: number;
    completionRate: number;
  };
  isParticipating?: boolean;
  hasCompleted?: boolean;
}

// UB-specific ritual configurations;
export const UB_RITUAL_TYPES = {
  orientation: {
    icon: Sparkles,
    color: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    label: 'New Student',
    campusArea: 'north'
  },
  finals: {
    icon: Target,
    color: 'text-red-400',
    bgColor: 'bg-red-900/20',
    label: 'Finals Week',
    campusArea: 'campus_wide'
  },
  homecoming: {
    icon: Trophy,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-900/20',
    label: 'Homecoming',
    campusArea: 'south'
  },
  spring_fest: {
    icon: Star,
    color: 'text-pink-400',
    bgColor: 'bg-pink-900/20',
    label: 'Spring Fest',
    campusArea: 'north'
  },
  graduation: {
    icon: Trophy,
    color: 'text-green-400',
    bgColor: 'bg-green-900/20',
    label: 'Graduation',
    campusArea: 'south'
  },
  move_in: {
    icon: Calendar,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    label: 'Move-In Week',
    campusArea: 'north'
  },
  club_rush: {
    icon: Users,
    color: 'text-orange-400',
    bgColor: 'bg-orange-900/20',
    label: 'Club Rush',
    campusArea: 'campus_wide'
  }
};

export const UB_PARTICIPATION_TYPES = {
  individual: { label: 'Personal Challenge', icon: Target },
  dorm: { label: 'Dorm vs Dorm', icon: Users },
  class: { label: 'Class Competition', icon: TrendingUp },
  campus_wide: { label: 'All UB Bulls', icon: Heart },
  club: { label: 'Club Challenge', icon: Star },
  academic: { label: 'Academic Achievement', icon: Trophy }
};

// =============================================================================
// UB RITUAL FEED CARD COMPONENT;
// =============================================================================

interface UBRitualFeedCardProps {post: UBRitualFeedPost;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onJoinRitual?: (ritualId: string) => void;
  onViewRitual?: (ritualId: string) => void;
  className?: string;}

export function UBRitualFeedCard({ 
  post, 
  onLike,
  onComment,
  onShare,
  onJoinRitual,
  onViewRitual,
  className;
}: UBRitualFeedCardProps) {
  const { ritual, type, milestone } = post;
  const typeConfig = UB_RITUAL_TYPES[ritual.type];
  const participationConfig = UB_PARTICIPATION_TYPES[ritual.participationType];
  const TypeIcon = typeConfig.icon;
  const ParticipationIcon = participationConfig.icon;

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now'
  };

  const getPostTypeIndicator = () => {
    switch (type) {
      case 'ritual_announcement':
        return { icon: Sparkles, label: 'New Campus Ritual', color: 'text-purple-400' };
      case 'ritual_milestone':
        return { icon: Trophy, label: 'Milestone Achieved', color: 'text-yellow-400' };
      case 'ritual_completion':
        return { icon: CheckCircle, label: 'Ritual Completed', color: 'text-green-400' };
      case 'ritual_reminder':
        return { icon: Clock, label: 'Ritual Reminder', color: 'text-blue-400' };
      default:
        return { icon: Activity, label: 'Campus Activity', color: 'text-gray-400' }
    }
  };

  const postIndicator = getPostTypeIndicator();
  const PostIndicatorIcon = postIndicator.icon;

  return (
    <Card className={cn(
      "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]",
      "hover:shadow-lg transition-all duration-200",
      "overflow-hidden",
      className;
    )}>
      {/* Post Header */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {/* Ritual Type Icon */}
            <div className={cn(
              "p-2 rounded-lg",
              typeConfig.bgColor;
            )}>
              <TypeIcon className={cn("h-5 w-5", typeConfig.color)} />
            </div>
            
            {/* Post Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <PostIndicatorIcon className={cn("h-4 w-4", postIndicator.color)} />
                <Text variant="body-sm" weight="medium" color="primary">
                  {postIndicator.label}
                </Text>
              </div>
              
              <div className="flex items-center gap-2">
                <Text variant="body-sm" weight="medium" className="text-[var(--hive-text-primary)]">
                  {post.author.name}
                </Text>
                <Text variant="body-xs" color="secondary">
                  @{post.author.handle}
                </Text>
                {post.author.role && (
                  <Badge variant="secondary" className="text-xs">
                    {post.author.role}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Text variant="body-xs" color="secondary">
            {formatTimeAgo(post.timestamp)}
          </Text>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Ritual Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className={cn("text-xs", typeConfig.color)}>
              {typeConfig.label}
            </Badge>
            <Badge variant="ghost" className="text-xs">
              <ParticipationIcon className="h-3 w-3 mr-1" />
              {participationConfig.label}
            </Badge>
          </div>
          
          <Text variant="h3" weight="semibold" className="mb-2">
            {ritual.title}
          </Text>
          
          <Text variant="body-sm" color="secondary" className="mb-3">
            {post.content}
          </Text>
        </div>

        {/* Milestone Achievement */}
        {type === 'ritual_milestone' && milestone && (
          <div className="mb-4 p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <Text variant="body-sm" weight="medium">
                {milestone.achievement}
              </Text>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <Text variant="body-lg" weight="bold" color="primary">
                  {milestone.participantCount}
                </Text>
                <Text variant="body-xs" color="secondary">
                  UB Students Participating;
                </Text>
              </div>
              <div>
                <Text variant="body-lg" weight="bold" color="primary">
                  {milestone.completionRate}%
                </Text>
                <Text variant="body-xs" color="secondary">
                  Completion Rate;
                </Text>
              </div>
            </div>
          </div>
        )}

        {/* Ritual Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 rounded-lg bg-[var(--hive-background-primary)]">
          <div className="text-center">
            <Text variant="body-md" weight="bold" color="primary">
              {Math.round(ritual.metrics.participationRate)}%
            </Text>
            <Text variant="body-xs" color="secondary">
              Participating;
            </Text>
          </div>
          <div className="text-center">
            <Text variant="body-md" weight="bold" color="primary">
              {Math.round(ritual.metrics.engagementScore)}
            </Text>
            <Text variant="body-xs" color="secondary">
              Engagement;
            </Text>
          </div>
          <div className="text-center">
            <Text variant="body-md" weight="bold" color="primary">
              {Math.round(ritual.metrics.campusImpact)}
            </Text>
            <Text variant="body-xs" color="secondary">
              Campus Impact;
            </Text>
          </div>
        </div>

        {/* Campus Location */}
        {ritual.campusLocation && (
          <div className="flex items-center gap-2 mb-4">
            <Icon icon={Calendar} size="sm" color="secondary" />
            <Text variant="body-xs" color="secondary">
              {ritual.campusLocation}
            </Text>
            {ritual.ubSpecific.campusAreas && (
              <Badge variant="ghost" className="text-xs">
                {ritual.ubSpecific.campusAreas.join(', ')}
              </Badge>
            )}
          </div>
        )}

        {/* Engagement Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--hive-border-default)]">
          <div className="flex items-center gap-4">
            <Button;
              variant="ghost" 
              size="sm" 
              className="text-xs h-8 text-[var(--hive-text-secondary)] hover:text-pink-400 transition-colors"
              onClick={() => onLike?.(post.id)}
            >
              <Heart className="h-4 w-4 mr-2" />
              {post.engagement.likes}
            </Button>
            
            <Button;
              variant="ghost" 
              size="sm" 
              className="text-xs h-8 text-[var(--hive-text-secondary)] hover:text-blue-400 transition-colors"
              onClick={() => onComment?.(post.id)}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              {post.engagement.comments}
            </Button>
            
            <Button;
              variant="ghost" 
              size="sm" 
              className="text-xs h-8 text-[var(--hive-text-secondary)] hover:text-green-400 transition-colors"
              onClick={() => onShare?.(post.id)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              {post.engagement.shares}
            </Button>
            
            <div className="flex items-center gap-1 text-xs text-[var(--hive-text-secondary)]">
              <Users className="h-4 w-4" />
              {post.engagement.participants} participating;
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {post.hasCompleted ? (
              <Badge variant="success" className="text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed;
              </Badge>
            ) : post.isParticipating ? (
              <Button;
                variant="secondary"
                size="sm"
                onClick={() => onViewRitual?.(ritual.id)}
              >
                <Play className="h-4 w-4 mr-2" />
                Continue;
              </Button>
            ) : ritual.status === 'active' ? (
              <Button;
                variant="primary"
                size="sm"
                onClick={() => onJoinRitual?.(ritual.id)}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Join;
              </Button>
            ) : (
              <Button;
                variant="ghost"
                size="sm"
                onClick={() => onViewRitual?.(ritual.id)}
              >
                View Details;
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// =============================================================================
// UB RITUALS FEED INTEGRATION COMPONENT;
// =============================================================================

interface UBRitualsFeedIntegrationProps {ritualPosts: UBRitualFeedPost[];
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onJoinRitual?: (ritualId: string) => void;
  onViewRitual?: (ritualId: string) => void;
  showHeader?: boolean;
  maxPosts?: number;
  className?: string;}

export function UBRitualsFeedIntegration({ 
  ritualPosts,
  onLike,
  onComment,
  onShare,
  onJoinRitual,
  onViewRitual,
  showHeader = true,
  maxPosts,
  className;
}: UBRitualsFeedIntegrationProps) {
  const displayPosts = maxPosts ? ritualPosts.slice(0, maxPosts) : ritualPosts;
  
  if (ritualPosts.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showHeader && (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-400/10">
            <Sparkles className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <Text variant="h3" weight="semibold">
              Campus Rituals;
            </Text>
            <Text variant="body-sm" color="secondary">
              Shared experiences building UB culture;
            </Text>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {ritualPosts.length} active;
          </Badge>
        </div>
      )}
      
      <div className="space-y-4">
        {displayPosts.map((post) => (
          <UBRitualFeedCard;
            key={post.id}
            post={post}
            onLike={onLike}
            onComment={onComment}
            onShare={onShare}
            onJoinRitual={onJoinRitual}
            onViewRitual={onViewRitual}
          />
        ))}
        
        {maxPosts && ritualPosts.length > maxPosts && (
          <div className="text-center pt-4">
            <Button variant="ghost" size="sm">
              <ArrowRight className="h-4 w-4 mr-2" />
              View {ritualPosts.length - maxPosts} more ritual updates;
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// UB RITUAL FEED FILTERS;
// =============================================================================

interface UBRitualFeedFiltersProps {selectedTypes: string[];
  selectedParticipation: string[];
  onTypeChange: (types: string[]) => void;
  onParticipationChange: (participation: string[]) => void;
  className?: string;}

export function UBRitualFeedFilters({
  selectedTypes,
  selectedParticipation,
  onTypeChange,
  onParticipationChange,
  className;
}: UBRitualFeedFiltersProps) {
  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeChange(selectedTypes.filter(t => t !== type))
    } else {
      onTypeChange([...selectedTypes, type])
    }
  };

  const toggleParticipation = (participation: string) => {
    if (selectedParticipation.includes(participation)) {
      onParticipationChange(selectedParticipation.filter(p => p !== participation))
    } else {
      onParticipationChange([...selectedParticipation, participation])
    }
  };

  return (
    <Card className={cn("p-4", className)}>
      <Text variant="h4" weight="semibold" className="mb-3">
        Filter Rituals;
      </Text>
      
      <div className="space-y-4">
        <div>
          <Text variant="body-sm" weight="medium" className="mb-2">
            Ritual Types;
          </Text>
          <div className="flex flex-wrap gap-2">
            {Object.entries(UB_RITUAL_TYPES).map(([type, config]) => {
              const Icon = config.icon;
              const isSelected = selectedTypes.includes(type);
              
              return (
                <Button;
                  key={type}}
                  variant={isSelected ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => toggleType(type)}
                  className="text-xs"
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {config.label}
                </Button>
              )
          })}
          </div>
        </div>
        
        <div>
          <Text variant="body-sm" weight="medium" className="mb-2">
            Participation Style;
          </Text>
          <div className="flex flex-wrap gap-2">
            {Object.entries(UB_PARTICIPATION_TYPES).map(([type, config]) => {
              const Icon = config.icon;
              const isSelected = selectedParticipation.includes(type);
              
              return (
                <Button;
                  key={type}}
                  variant={isSelected ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => toggleParticipation(type)}
                  className="text-xs"
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {config.label}
                </Button>
              )
          })}
          </div>
        </div>
      </div>
    </Card>
  )
}