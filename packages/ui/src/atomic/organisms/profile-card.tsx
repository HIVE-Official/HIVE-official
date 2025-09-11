"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ProfileHeader, type ProfileUser } from '../molecules/profile-header';
import { ProfileStats, type HiveProfileStats } from '../molecules/profile-stats';
import { Clock, Users, Zap, Award, Calendar } from 'lucide-react';

const profileCardVariants = cva(
  "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl transition-all duration-200",
  {
    variants: {
      size: {
        sm: "p-4 space-y-4",
        md: "p-6 space-y-6",
        lg: "p-8 space-y-8"
      },
      variant: {
        default: "shadow-sm hover:shadow-md",
        elevated: "shadow-lg hover:shadow-xl",
        minimal: "shadow-none border-0",
        interactive: "shadow-sm hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      },
      layout: {
        vertical: "flex flex-col",
        horizontal: "flex flex-row gap-6",
        stacked: "space-y-6"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      layout: "stacked"
    }
  }
);

export interface HiveActivityItem {
  id: string;
  type: 'space' | 'tool' | 'connection' | 'achievement' | 'builder';
  action: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: React.ReactNode;
  spaceId?: string;
  toolId?: string;
}

export interface HiveProfileCardProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileCardVariants> {
  user: ProfileUser;
  stats: HiveProfileStats;
  recentActivity?: HiveActivityItem[];
  isOwnProfile?: boolean;
  showStats?: boolean;
  showActivity?: boolean;
  showHeader?: boolean;
  maxActivities?: number;
  onEditProfile?: () => void;
  onEditAvatar?: () => void;
  onShareProfile?: () => void;
  onViewActivity?: () => void;
  onStatClick?: (statKey: string, value: number) => void;
  loading?: boolean;
}

export function HiveProfileCard({
  user,
  stats,
  recentActivity = [],
  isOwnProfile = false,
  showStats = true,
  showActivity = true,
  showHeader = true,
  maxActivities = 3,
  onEditProfile,
  onEditAvatar,
  onShareProfile,
  onViewActivity,
  onStatClick,
  loading = false,
  size = "md",
  variant = "default",
  layout = "stacked",
  className,
  ...props
}: HiveProfileCardProps) {

  // Get activity icon based on HIVE activity types
  const getActivityIcon = (type: HiveActivityItem['type'], action?: string) => {
    switch (type) {
      case 'space': return <Users className="h-4 w-4 text-hive-brand-secondary" />;
      case 'tool': return <Zap className="h-4 w-4 text-hive-gold" />;
      case 'connection': return <Users className="h-4 w-4 text-purple-400" />;
      case 'achievement': return <Award className="h-4 w-4 text-yellow-400" />;
      case 'builder': return <Zap className="h-4 w-4 text-hive-gold" />;
      default: return <Clock className="h-4 w-4 text-hive-text-secondary" />;
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const displayActivities = recentActivity.slice(0, maxActivities);

  if (loading) {
    return (
      <div className={cn(profileCardVariants({ size, variant, layout }), className)}>
        {/* Loading skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-hive-surface-elevated rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-32 bg-hive-surface-elevated rounded animate-pulse" />
              <div className="h-4 w-24 bg-hive-surface-elevated rounded animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 bg-hive-surface-elevated rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(profileCardVariants({ size, variant, layout }), className)}
      {...props}
    >
      {/* Profile Header */}
      {showHeader && (
        <ProfileHeader
          user={user}
          isOwnProfile={isOwnProfile}
          onEditProfile={onEditProfile}
          onEditAvatar={onEditAvatar}
          onShareProfile={onShareProfile}
          variant="ghost"
          avatarSize={size === "sm" ? "md" : "lg"}
        />
      )}

      {/* Stats Section */}
      {showStats && (
        <ProfileStats
          stats={stats}
          variant="ghost"
          layout={layout === "horizontal" ? "horizontal" : "grid"}
          onStatClick={onStatClick}
          interactive={!!onStatClick}
          priority={user.isBuilder 
            ? ['toolsUsed', 'spacesLed', 'reputation', 'connectionsCount']
            : ['spacesJoined', 'connectionsCount', 'currentStreak', 'reputation']
          }
        />
      )}

      {/* Recent Activity */}
      {showActivity && displayActivities.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-hive-text-primary">Recent Activity</h3>
            {onViewActivity && recentActivity.length > maxActivities && (
              <button
                onClick={onViewActivity}
                className="text-sm text-hive-gold hover:underline"
              >
                View all
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {displayActivities.map((activity: any) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-hive-background-primary/50 rounded-lg hover:bg-hive-background-interactive transition-colors"
              >
                {/* Activity Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {activity.icon || getActivityIcon(activity.type, activity.action)}
                </div>
                
                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-hive-text-primary truncate">
                    {activity.title}
                  </h4>
                  {activity.description && (
                    <p className="text-sm text-hive-text-secondary mt-1">
                      {activity.description}
                    </p>
                  )}
                  <p className="text-xs text-hive-text-tertiary mt-1">
                    {activity.action}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-hive-text-secondary">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimestamp(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {showActivity && displayActivities.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-hive-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-hive-text-primary mb-2">No recent activity</h3>
          <p className="text-sm text-hive-text-secondary">
            {isOwnProfile 
              ? "Start by joining a space or using a tool!"
              : "This user hasn't been active recently."
            }
          </p>
        </div>
      )}
    </div>
  );
}

// Keep backward compatibility with old name
export const ProfileCard = HiveProfileCard;
export type ProfileCardProps = HiveProfileCardProps;
export type ActivityItem = HiveActivityItem;

// Preset variants for common use cases
export function StudentProfileCard(props: Omit<HiveProfileCardProps, 'layout'>) {
  return <HiveProfileCard layout="stacked" {...props} />;
}

export function BuilderProfileCard(props: Omit<HiveProfileCardProps, 'layout'>) {  
  return <HiveProfileCard layout="stacked" {...props} />;
}

export function CompactProfileCard(props: Omit<HiveProfileCardProps, 'size' | 'showActivity'>) {
  return (
    <HiveProfileCard 
      size="sm" 
      showActivity={false}
      maxActivities={0}
      {...props} 
    />
  );
}

export function InteractiveProfileCard(props: Omit<HiveProfileCardProps, 'variant'>) {
  return <HiveProfileCard variant="interactive" {...props} />;
}

export function MinimalProfileCard(props: Omit<HiveProfileCardProps, 'variant'>) {
  return <HiveProfileCard variant="minimal" {...props} />;
}

// Export variants for external use
export { profileCardVariants };