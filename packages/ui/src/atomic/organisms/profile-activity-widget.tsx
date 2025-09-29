'use client';

import React from 'react';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import {
  Activity,
  TrendingUp,
  Users,
  MessageCircle,
  Heart,
  Zap,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { PrivacyControl, type PrivacyLevel } from '../molecules/privacy-control';

export interface ActivityItem {
  id: string;
  type: 'post' | 'comment' | 'connection' | 'space_join';
  title: string;
  description?: string;
  timestamp: Date;
  spaceId?: string;
  spaceName?: string;
  engagementCount?: number;
}

export interface MyActivityWidgetProps {
  activities: ActivityItem[];
  isOwnProfile?: boolean;
  privacyLevel?: PrivacyLevel;
  onPrivacyChange?: (level: PrivacyLevel) => void;
  onViewAll?: () => void;
  className?: string;
}

/**
 * My Activity Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - 8px grid system for spacing
 * - Monochrome with gold accents for key interactions
 * - Subtle hover states with white/4 overlay
 * - Mobile-optimized with 44px touch targets
 */
export const MyActivityWidget: React.FC<MyActivityWidgetProps> = ({
  activities = [],
  isOwnProfile = false,
  privacyLevel = 'public',
  onPrivacyChange,
  onViewAll,
  className = ''
}) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'post':
        return MessageCircle;
      case 'comment':
        return MessageCircle;
      case 'connection':
        return Users;
      case 'space_join':
        return Users;
      default:
        return Activity;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) {
      const mins = Math.floor(diff / (1000 * 60));
      return `${mins}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }
  };

  return (
    <Card
      className={`
        relative overflow-hidden
        bg-black border border-white/8
        p-6 space-y-4
        transition-all duration-300
        hover:border-white/16
        ${className}
      `}
    >
      {/* Header with Privacy Control */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-900 rounded-lg">
            <Activity className="w-4 h-4 text-[#FFD700]" />
          </div>
          <h3 className="text-lg font-medium text-white">My Activity</h3>
        </div>

        {isOwnProfile && onPrivacyChange && (
          <PrivacyControl
            level={privacyLevel}
            onLevelChange={onPrivacyChange}
            compact
            className="backdrop-blur-sm"
          />
        )}
      </div>

      {/* Activity List */}
      <div className="space-y-3">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400">No recent activity</p>
            {isOwnProfile && (
              <p className="text-xs text-gray-500 mt-1">
                Start exploring spaces to build your activity
              </p>
            )}
          </div>
        ) : (
          activities.slice(0, 5).map((activity) => {
            const Icon = getActivityIcon(activity.type);

            return (
              <div
                key={activity.id}
                className="
                  group flex items-start gap-3
                  p-3 -m-3
                  hover:bg-white/[0.02]
                  rounded-lg
                  transition-all duration-200
                  cursor-pointer
                "
              >
                {/* Activity Icon */}
                <div className="p-1.5 bg-gray-900 rounded-lg group-hover:bg-gray-800 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-gray-400" />
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">
                    {activity.title}
                  </p>

                  {activity.spaceName && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      in {activity.spaceName}
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(activity.timestamp)}
                    </span>

                    {activity.engagementCount !== undefined && activity.engagementCount > 0 && (
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">
                          {activity.engagementCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Arrow */}
                <ChevronRight className="
                  w-4 h-4 text-gray-600
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-200
                " />
              </div>
            );
          })
        )}
      </div>

      {/* View All Button */}
      {activities.length > 5 && onViewAll && (
        <button
          onClick={onViewAll}
          className="
            w-full py-3 px-4
            bg-gray-900 hover:bg-gray-800
            text-sm text-gray-300 hover:text-white
            rounded-lg
            transition-all duration-200
            flex items-center justify-center gap-2
            min-h-[44px]
          "
        >
          View all activity
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Activity Streak Indicator */}
      {activities.length > 0 && (
        <div className="pt-4 border-t border-white/8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs text-gray-400">Activity Streak</span>
            </div>
            <span className="text-xs text-[#FFD700] font-medium">
              3 days
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};