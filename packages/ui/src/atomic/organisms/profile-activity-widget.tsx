'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  Activity,
  Plus,
  MessageSquare,
  Users,
  Heart,
  Star,
  Zap,
  Calendar,
  BookOpen,
  Coffee,
  Code,
  Trophy,
  TrendingUp,
  Clock,
  ExternalLink,
  Settings,
  ChevronRight,
  Flame,
  Award,
  Target
} from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'post' | 'comment' | 'join' | 'create' | 'like' | 'collaborate' | 'achievement' | 'event';
  title: string;
  description: string;
  timestamp: string;
  contextSpace?: {
    name: string;
    type: 'academic' | 'residential' | 'social' | 'professional' | 'hobby';
  };
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
  isHighlighted?: boolean;
}

export interface ProfileActivityWidgetProps {
  user: {
    id: string;
    name: string;
  };
  recentActivities?: ActivityItem[];
  todayActivities?: number;
  weeklyStreak?: number;
  totalEngagement?: number;
  activityScore?: number;
  topActivityType?: string;
  isEditable?: boolean;
  onViewActivity?: (activityId: string) => void;
  onViewAllActivities?: () => void;
  onCreatePost?: () => void;
  onEngageMore?: () => void;
  className?: string;
}

const getActivityTypeConfig = (type: string) => {
  const configs = {
    post: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: MessageSquare,
      label: 'Posted'
    },
    comment: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: MessageSquare,
      label: 'Commented'
    },
    join: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: Users,
      label: 'Joined'
    },
    create: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: Plus,
      label: 'Created'
    },
    like: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      icon: Heart,
      label: 'Liked'
    },
    collaborate: {
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      icon: Code,
      label: 'Collaborated'
    },
    achievement: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: Trophy,
      label: 'Achieved'
    },
    event: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: Calendar,
      label: 'Attended'
    }
  };
  
  return configs[type as keyof typeof configs] || configs.post;
};

const getSpaceTypeIcon = (type: string) => {
  const icons = {
    academic: BookOpen,
    residential: Coffee,
    social: Heart,
    professional: Award,
    hobby: Code
  };
  return icons[type as keyof typeof icons] || Heart;
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};

export const ProfileActivityWidget: React.FC<ProfileActivityWidgetProps> = ({
  user,
  recentActivities = [],
  todayActivities = 0,
  weeklyStreak = 0,
  totalEngagement = 0,
  activityScore = 0,
  topActivityType = 'post',
  isEditable = true,
  onViewActivity,
  onViewAllActivities,
  onCreatePost,
  onEngageMore,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the most recent activities (up to 4)
  const displayActivities = recentActivities.slice(0, 4);
  const highlightedActivities = recentActivities.filter(activity => activity.isHighlighted).length;
  const totalActivitiesThisWeek = recentActivities.length;

  return (
    <Card 
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]',
        isHovered && 'scale-[1.02]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text variant="body-sm" color="gold" weight="medium">
              Recent Activity
            </Text>
            {weeklyStreak > 0 && (
              <Badge variant="outline" className="text-xs">
                <Flame className="h-3 w-3 mr-1" />
                {weeklyStreak} day streak
              </Badge>
            )}
          </div>
          {isEditable && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewAllActivities}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Activity Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Activity className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {todayActivities}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Today's Activity
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <Text variant="body-sm" weight="medium" color="primary">
                {totalEngagement}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Total Engagement
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Target className="h-3 w-3 text-[var(--hive-gold)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {activityScore}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Activity Score
            </Text>
          </div>
        </div>

        {/* Weekly Activity Progress */}
        {weeklyStreak > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Weekly Engagement:</Text>
              <Text variant="body-xs" color="gold" weight="medium">
                {totalActivitiesThisWeek} activities
              </Text>
            </div>
            <div className="w-full bg-[var(--hive-background-secondary)] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-[var(--hive-gold)] rounded-full h-2 transition-all duration-500"
                style={{ width: `${Math.min((totalActivitiesThisWeek / 20) * 100, 100)}%` }}
              />
            </div>
            <Text variant="body-xs" color="secondary">
              {weeklyStreak} day activity streak • Keep it going! 🔥
            </Text>
          </div>
        )}

        {/* Recent Activity Feed */}
        {displayActivities.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Recent Activity:</Text>
              {recentActivities.length > 4 && (
                <Text variant="body-xs" color="secondary">
                  +{recentActivities.length - 4} more
                </Text>
              )}
            </div>
            <div className="space-y-1">
              {displayActivities.map((activity) => {
                const config = getActivityTypeConfig(activity.type);
                const SpaceIcon = activity.contextSpace ? getSpaceTypeIcon(activity.contextSpace.type) : null;
                return (
                  <div 
                    key={activity.id}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded transition-colors cursor-pointer',
                      'hover:bg-[var(--hive-background-secondary)]',
                      activity.isHighlighted && 'bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/20'
                    )}
                    onClick={() => onViewActivity?.(activity.id)}
                  >
                    <config.icon className={cn('h-3 w-3 flex-shrink-0', config.color)} />
                    <div className="flex-1 min-w-0">
                      <Text variant="body-xs" color="primary" className="truncate">
                        {activity.title}
                      </Text>
                      <div className="flex items-center gap-2 mt-0.5">
                        {activity.contextSpace && SpaceIcon && (
                          <div className="flex items-center gap-1">
                            <SpaceIcon className="h-2 w-2 text-[var(--hive-text-muted)]" />
                            <Text variant="body-xs" color="muted" className="truncate">
                              {activity.contextSpace.name}
                            </Text>
                          </div>
                        )}
                        <Clock className="h-2 w-2 text-[var(--hive-text-muted)]" />
                        <Text variant="body-xs" color="muted">
                          {formatTimestamp(activity.timestamp)}
                        </Text>
                      </div>
                    </div>
                    {activity.engagement && (
                      <div className="flex items-center gap-1">
                        {activity.engagement.likes > 0 && (
                          <div className="flex items-center gap-0.5">
                            <Heart className="h-2 w-2 text-red-500" />
                            <Text variant="body-xs" color="muted">
                              {activity.engagement.likes}
                            </Text>
                          </div>
                        )}
                      </div>
                    )}
                    <ChevronRight className="h-3 w-3 text-[var(--hive-text-secondary)] flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Activity Insight */}
        {topActivityType && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <Text variant="body-sm" color="primary" weight="medium">Activity Insights:</Text>
            <div className={cn(
              'p-3 rounded-lg border',
              getActivityTypeConfig(topActivityType).bgColor,
              getActivityTypeConfig(topActivityType).borderColor
            )}>
              <div className="flex items-center gap-2">
                {(() => {
                  const IconComponent = getActivityTypeConfig(topActivityType).icon;
                  return <IconComponent className={cn(
                    'h-4 w-4',
                    getActivityTypeConfig(topActivityType).color
                  )} />;
                })()}
                <Text variant="body-sm" color="primary">
                  Most active in: {getActivityTypeConfig(topActivityType).label.toLowerCase()}
                </Text>
              </div>
              <Text variant="body-xs" color="secondary" className="mt-1">
                You're building strong engagement through {getActivityTypeConfig(topActivityType).label.toLowerCase()} activities
              </Text>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]">
          {isEditable && onCreatePost && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCreatePost}
              className="flex-1"
            >
              <Plus className="h-3 w-3 mr-1" />
              Create Post
            </Button>
          )}
          
          {onViewAllActivities && (
            <Button
              variant="default"
              size="sm"
              onClick={onViewAllActivities}
              className="flex-1"
            >
              <Activity className="h-3 w-3 mr-1" />
              All Activity
            </Button>
          )}
          
          {onEngageMore && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onEngageMore}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Empty State */}
        {recentActivities.length === 0 && (
          <div className="text-center py-6">
            <Activity className="h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" />
            <Text variant="body-sm" color="secondary" className="mb-2">
              No recent activity
            </Text>
            <Text variant="body-xs" color="secondary" className="mb-4">
              Start engaging with the UB community to see your activity here
            </Text>
            {isEditable && onCreatePost && (
              <Button
                variant="outline"
                size="sm"
                onClick={onCreatePost}
              >
                <Plus className="h-3 w-3 mr-1" />
                Create Your First Post
              </Button>
            )}
          </div>
        )}

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg blur-xl" />
      )}
    </Card>
  );
};