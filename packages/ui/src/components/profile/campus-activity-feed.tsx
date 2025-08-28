/**
 * Campus Activity Feed - Profile Integration
 * Uses SocialInteraction and UserIdentity molecules for campus social activity
 * 
 * Built using HIVE foundation systems and molecules:
 * - SocialInteraction molecule for engagement actions
 * - UserIdentity molecule for consistent user display
 * - ComprehensiveCard molecule for activity item structure
 * - Campus-specific activity types and cross-slice integration
 */

import React, { useState, useCallback } from 'react';
import { cn } from '../lib/utils';

// Molecule imports
import { SocialInteraction, type SocialActionData } from '../../atomic/molecules/social-interaction';
import { UserIdentity } from '../../atomic/molecules/user-identity';
import { ComprehensiveCard } from '../../atomic/molecules/comprehensive-card';

// Foundation system imports
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { 
  iconComposition,
  Users,
  Hammer,
  Calendar,
  MessageSquare,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  Zap,
  BookOpen,
  Coffee,
  Music,
  Code,
  Gamepad2,
  Camera,
  Briefcase,
  Heart,
  Share2,
  ExternalLink,
  ChevronRight
} from '../../atomic/foundations/icon-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';

// === ACTIVITY TYPES ===
export type ActivityType = 
  | 'space_join'
  | 'space_create' 
  | 'tool_build'
  | 'tool_use'
  | 'event_create'
  | 'event_attend'
  | 'connection_made'
  | 'post_create'
  | 'achievement_unlock'
  | 'collaboration_start';

export interface ActivityItem {
  id: string;
  type: ActivityType;
  timestamp: Date;
  
  // Activity actors
  user: {
    id: string;
    name: string;
    handle?: string;
    avatar?: string;
    status?: 'online' | 'away' | 'offline' | 'studying';
    role?: 'student' | 'faculty' | 'admin' | 'leader';
    verified?: boolean;
  };
  
  // Activity content
  title: string;
  description?: string;
  content?: string;
  
  // Activity targets (spaces, tools, events, etc.)
  target?: {
    id: string;
    name: string;
    type: 'space' | 'tool' | 'event' | 'user';
    icon?: string;
  };
  
  // Engagement metrics
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    userLiked?: boolean;
    userCommented?: boolean;
    userShared?: boolean;
  };
  
  // Campus context
  campusContext?: {
    location?: string;
    course?: string;
    semester?: string;
    visibility: 'public' | 'campus' | 'connections' | 'private';
  };
  
  // Media/attachments
  media?: {
    type: 'image' | 'video' | 'file' | 'link';
    url: string;
    preview?: string;
  }[];
  
  // Rich content
  metadata?: Record<string, any>;
}

export interface CampusActivityFeedProps {
  // Activity data
  activities: ActivityItem[];
  
  // Feed configuration
  showUserProfiles?: boolean;
  showEngagementActions?: boolean;
  showCampusContext?: boolean;
  enableRealtime?: boolean;
  
  // Filtering
  activityTypes?: ActivityType[];
  timeRange?: 'today' | 'week' | 'month' | 'all';
  
  // Layout
  variant?: 'compact' | 'comfortable' | 'detailed';
  maxItems?: number;
  
  // Loading state
  isLoading?: boolean;
  hasMore?: boolean;
  
  // Callbacks
  onActivityClick?: (activity: ActivityItem) => void;
  onUserClick?: (userId: string) => void;
  onTargetClick?: (target: ActivityItem['target']) => void;
  onEngagement?: (activityId: string, action: 'like' | 'comment' | 'share') => void;
  onLoadMore?: () => void;
  
  className?: string;
}

// === ACTIVITY TYPE METADATA ===
const activityTypeConfig: Record<ActivityType, {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
  verb: string;
  campusRelevant: boolean;
}> = {
  space_join: {
    icon: Users,
    color: 'text-[var(--hive-info-primary)]',
    bgColor: 'bg-[var(--hive-info-background)]',
    borderColor: 'border-[var(--hive-info-border)]',
    verb: 'joined',
    campusRelevant: true
  },
  space_create: {
    icon: Users,
    color: 'text-[var(--hive-info-primary)]',
    bgColor: 'bg-[var(--hive-info-background)]',
    borderColor: 'border-[var(--hive-info-border)]',
    verb: 'created',
    campusRelevant: true
  },
  tool_build: {
    icon: Hammer,
    color: 'text-[var(--hive-success-primary)]',
    bgColor: 'bg-[var(--hive-success-background)]',
    borderColor: 'border-[var(--hive-success-border)]',
    verb: 'built',
    campusRelevant: true
  },
  tool_use: {
    icon: Zap,
    color: 'text-[var(--hive-success-primary)]',
    bgColor: 'bg-[var(--hive-success-background)]',
    borderColor: 'border-[var(--hive-success-border)]',
    verb: 'used',
    campusRelevant: true
  },
  event_create: {
    icon: Calendar,
    color: 'text-[var(--hive-warning-primary)]',
    bgColor: 'bg-[var(--hive-warning-background)]',
    borderColor: 'border-[var(--hive-warning-border)]',
    verb: 'created',
    campusRelevant: true
  },
  event_attend: {
    icon: Calendar,
    color: 'text-[var(--hive-warning-primary)]',
    bgColor: 'bg-[var(--hive-warning-background)]',
    borderColor: 'border-[var(--hive-warning-border)]',
    verb: 'attended',
    campusRelevant: true
  },
  connection_made: {
    icon: Heart,
    color: 'text-[var(--hive-error-primary)]',
    bgColor: 'bg-[var(--hive-error-background)]',
    borderColor: 'border-[var(--hive-error-border)]',
    verb: 'connected with',
    campusRelevant: true
  },
  post_create: {
    icon: MessageSquare,
    color: 'text-[var(--hive-text-primary)]',
    bgColor: 'bg-[var(--hive-bg-subtle)]',
    borderColor: 'border-[var(--hive-border-subtle)]',
    verb: 'posted in',
    campusRelevant: true
  },
  achievement_unlock: {
    icon: Star,
    color: 'text-[var(--hive-gold-primary)]',
    bgColor: 'bg-[var(--hive-gold-background)]',
    borderColor: 'border-[var(--hive-gold-border)]',
    verb: 'unlocked',
    campusRelevant: true
  },
  collaboration_start: {
    icon: Users,
    color: 'text-[var(--hive-info-primary)]',
    bgColor: 'bg-[var(--hive-info-background)]',
    borderColor: 'border-[var(--hive-info-border)]',
    verb: 'started collaborating on',
    campusRelevant: true
  }
};

// === TIME FORMATTING ===
const formatRelativeTime = (timestamp: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return timestamp.toLocaleDateString();
};

// === ACTIVITY ITEM COMPONENT ===
interface ActivityItemComponentProps {
  activity: ActivityItem;
  variant: 'compact' | 'comfortable' | 'detailed';
  showUserProfile: boolean;
  showEngagementActions: boolean;
  showCampusContext: boolean;
  onActivityClick?: (activity: ActivityItem) => void;
  onUserClick?: (userId: string) => void;
  onTargetClick?: (target: ActivityItem['target']) => void;
  onEngagement?: (action: 'like' | 'comment' | 'share') => void;
}

const ActivityItemComponent = React.forwardRef<HTMLDivElement, ActivityItemComponentProps>(
  ({
    activity,
    variant,
    showUserProfile,
    showEngagementActions,
    showCampusContext,
    onActivityClick,
    onUserClick,
    onTargetClick,
    onEngagement
  }, ref) => {
    
    const config = activityTypeConfig[activity.type];
    const IconComponent = config.icon;
    
    // Build social actions from engagement data
    const socialActions: SocialActionData[] = [];
    if (activity.engagement && showEngagementActions) {
      socialActions.push(
        {
          type: 'like',
          count: activity.engagement.likes,
          isActive: activity.engagement.userLiked || false,
          label: 'Like'
        },
        {
          type: 'comment',
          count: activity.engagement.comments,
          isActive: activity.engagement.userCommented || false,
          label: 'Comment'
        },
        {
          type: 'share',
          count: activity.engagement.shares,
          isActive: activity.engagement.userShared || false,
          label: 'Share'
        }
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'group relative',
          onActivityClick && 'cursor-pointer'
        )}
        onClick={() => onActivityClick?.(activity)}
      >
        <ComprehensiveCard
          variant="interactive"
          size={variant === 'compact' ? 'compact' : variant === 'detailed' ? 'spacious' : 'comfortable'}
          campusOptimized
          className={cn(
            // Activity type border accent
            'border-l-4',
            config.borderColor,
            // Hover effects
            'hover:shadow-md transition-shadow'
          )}
        >
          <div className="space-y-4">
            {/* Activity Header */}
            <div className="flex items-start justify-between gap-4">
              {/* Left: User + Action */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {/* Activity Type Icon */}
                <div className={cn(
                  'p-2 rounded-lg shrink-0',
                  config.bgColor,
                  config.borderColor,
                  'border'
                )}>
                  <IconComponent className={cn(
                    iconComposition.sizes.small.className,
                    config.color
                  )} />
                </div>
                
                {/* User Identity */}
                {showUserProfile && (
                  <div className="min-w-0 flex-1">
                    <UserIdentity
                      name={activity.user.name}
                      handle={activity.user.handle}
                      avatar={activity.user.avatar}
                      status={activity.user.status}
                      role={activity.user.role}
                      verified={activity.user.verified}
                      size="small"
                      layout="horizontal"
                      interactive="subtle"
                      onClick={() => onUserClick?.(activity.user.id)}
                    />
                  </div>
                )}
              </div>
              
              {/* Right: Timestamp */}
              <div className="flex items-center gap-1 text-[var(--hive-text-muted)] shrink-0">
                <Clock className={iconComposition.sizes.micro.className} />
                <span className={cn(
                  'font-[var(--hive-font-family-primary)]',
                  `text-[${typographyComposition.scale.caption.size}]`
                )}>
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </div>
            </div>
            
            {/* Activity Content */}
            <div className="space-y-3">
              {/* Action Description */}
              <div className="flex items-center gap-1 flex-wrap">
                <span className={cn(
                  'font-[var(--hive-font-family-primary)]',
                  `text-[${typographyComposition.scale.small.size}]`,
                  'text-[var(--hive-text-secondary)]'
                )}>
                  {config.verb}
                </span>
                
                {/* Target (space, tool, event, etc.) */}
                {activity.target && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTargetClick?.(activity.target);
                    }}
                    className={cn(
                      'font-medium',
                      'text-[var(--hive-gold-primary)]',
                      'hover:underline',
                      'inline-flex items-center gap-1'
                    )}
                  >
                    <span>{activity.target.name}</span>
                    {activity.target.icon && <span>{activity.target.icon}</span>}
                  </button>
                )}
              </div>
              
              {/* Main Title */}
              <h3 className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-semibold',
                variant === 'compact' 
                  ? `text-[${typographyComposition.scale.small.size}]`
                  : `text-[${typographyComposition.scale.base.size}]`,
                'text-[var(--hive-text-primary)]',
                'leading-tight'
              )}>
                {activity.title}
              </h3>
              
              {/* Content/Description */}
              {activity.content && variant !== 'compact' && (
                <p className={cn(
                  'font-[var(--hive-font-family-primary)]',
                  `text-[${typographyComposition.scale.small.size}]`,
                  'text-[var(--hive-text-secondary)]',
                  'leading-relaxed',
                  variant === 'detailed' ? 'line-clamp-none' : 'line-clamp-3'
                )}>
                  {activity.content}
                </p>
              )}
              
              {/* Campus Context */}
              {showCampusContext && activity.campusContext && (
                <div className="flex items-center gap-4 text-[var(--hive-text-muted)]">
                  {activity.campusContext.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className={iconComposition.sizes.micro.className} />
                      <span className={`text-[${typographyComposition.scale.caption.size}]`}>
                        {activity.campusContext.location}
                      </span>
                    </div>
                  )}
                  
                  {activity.campusContext.course && (
                    <div className="flex items-center gap-1">
                      <BookOpen className={iconComposition.sizes.micro.className} />
                      <span className={`text-[${typographyComposition.scale.caption.size}]`}>
                        {activity.campusContext.course}
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Media Preview */}
              {activity.media && activity.media.length > 0 && variant !== 'compact' && (
                <div className="rounded-lg overflow-hidden border border-[var(--hive-border-subtle)]">
                  {activity.media[0].type === 'image' && (
                    <img
                      src={activity.media[0].preview || activity.media[0].url}
                      alt="Activity media"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  {activity.media[0].type === 'link' && (
                    <div className="p-3 bg-[var(--hive-bg-subtle)] flex items-center gap-3">
                      <ExternalLink className={iconComposition.sizes.small.className} />
                      <span className="text-sm font-medium text-[var(--hive-text-primary)] truncate">
                        {activity.media[0].url}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Engagement Actions */}
            {showEngagementActions && socialActions.length > 0 && (
              <div className="pt-3 border-t border-[var(--hive-border-subtle)]">
                <SocialInteraction
                  actions={socialActions}
                  size="small"
                  layout={variant === 'compact' ? 'compact' : 'horizontal'}
                  variant="ghost"
                  onAction={(actionType) => onEngagement?.(actionType)}
                />
              </div>
            )}
          </div>
        </ComprehensiveCard>
      </div>
    );
  }
);

ActivityItemComponent.displayName = 'ActivityItemComponent';

// === MAIN COMPONENT ===
export const CampusActivityFeed = React.forwardRef<HTMLDivElement, CampusActivityFeedProps>(
  ({
    activities,
    showUserProfiles = true,
    showEngagementActions = true,
    showCampusContext = true,
    enableRealtime = false,
    activityTypes,
    timeRange = 'all',
    variant = 'comfortable',
    maxItems,
    isLoading = false,
    hasMore = false,
    onActivityClick,
    onUserClick,
    onTargetClick,
    onEngagement,
    onLoadMore,
    className
  }, ref) => {
    
    // Filter activities based on criteria
    const filteredActivities = activities
      .filter(activity => {
        if (activityTypes && !activityTypes.includes(activity.type)) return false;
        
        if (timeRange !== 'all') {
          const now = new Date();
          const activityDate = new Date(activity.timestamp);
          const diffMs = now.getTime() - activityDate.getTime();
          const diffDays = diffMs / (1000 * 60 * 60 * 24);
          
          switch (timeRange) {
            case 'today':
              return diffDays < 1;
            case 'week':
              return diffDays < 7;
            case 'month':
              return diffDays < 30;
            default:
              return true;
          }
        }
        
        return true;
      })
      .slice(0, maxItems);
    
    const handleEngagement = useCallback((activityId: string, action: 'like' | 'comment' | 'share') => {
      onEngagement?.(activityId, action);
    }, [onEngagement]);
    
    if (isLoading) {
      return (
        <div ref={ref} className={cn('space-y-4', className)}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-[var(--hive-bg-subtle)] rounded-lg" />
            </div>
          ))}
        </div>
      );
    }
    
    if (filteredActivities.length === 0) {
      return (
        <div ref={ref} className={cn('text-center py-8', className)}>
          <Activity className={cn(
            iconComposition.sizes.xl.className,
            'text-[var(--hive-text-muted)] mx-auto mb-3'
          )} />
          <h3 className="font-medium text-[var(--hive-text-primary)] mb-2">
            No campus activity yet
          </h3>
          <p className="text-[var(--hive-text-secondary)] max-w-md mx-auto">
            Join spaces, build tools, and connect with classmates to see your campus activity here.
          </p>
        </div>
      );
    }
    
    return (
      <div ref={ref} className={cn('space-y-4', className)}>
        {/* Activity Items */}
        {filteredActivities.map(activity => (
          <ActivityItemComponent
            key={activity.id}
            activity={activity}
            variant={variant}
            showUserProfile={showUserProfiles}
            showEngagementActions={showEngagementActions}
            showCampusContext={showCampusContext}
            onActivityClick={onActivityClick}
            onUserClick={onUserClick}
            onTargetClick={onTargetClick}
            onEngagement={(action) => handleEngagement(activity.id, action)}
          />
        ))}
        
        {/* Load More */}
        {hasMore && onLoadMore && (
          <div className="text-center pt-4">
            <button
              onClick={onLoadMore}
              className={cn(
                'inline-flex items-center gap-2 px-6 py-3 rounded-lg',
                'font-medium',
                'text-[var(--hive-text-primary)]',
                'bg-[var(--hive-bg-subtle)]',
                'border border-[var(--hive-border-subtle)]',
                'hover:bg-[var(--hive-bg-interactive)]',
                'hover:border-[var(--hive-border-glass-strong)]',
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`
              )}
            >
              <TrendingUp className={iconComposition.sizes.small.className} />
              Load More Activity
            </button>
          </div>
        )}
        
        {/* Real-time indicator */}
        {enableRealtime && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-full',
              'bg-[var(--hive-success-background)]',
              'border border-[var(--hive-success-border)]',
              'text-[var(--hive-success-primary)]',
              'text-sm font-medium',
              'shadow-lg'
            )}>
              <div className="w-2 h-2 bg-[var(--hive-success-primary)] rounded-full animate-pulse" />
              Live Activity
            </div>
          </div>
        )}
      </div>
    );
  }
);

CampusActivityFeed.displayName = 'CampusActivityFeed';

export type { CampusActivityFeedProps, ActivityItem, ActivityType };
export { activityTypeConfig, formatRelativeTime };