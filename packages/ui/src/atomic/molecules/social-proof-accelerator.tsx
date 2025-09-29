'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Sparkles, Eye, TrendingUp, Clock, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveCard } from '../atoms/hive-card';
import { SimpleAvatar } from '../atoms/simple-avatar';

interface SocialProofAcceleratorProps {
  className?: string;
  variant?: 'header' | 'sidebar' | 'dashboard';
  showTrending?: boolean;
  showAttractive?: boolean;
  showInsider?: boolean;
}

interface ActivityData {
  id: string;
  type: 'join' | 'post' | 'match' | 'insider' | 'trending';
  user: {
    name: string;
    avatar?: string;
    isAttractive?: boolean;
    year?: string;
    major?: string;
  };
  space?: string;
  content?: string;
  timestamp: Date;
  engagement?: number;
  exclusivity?: number; // How many people have access
}

interface TrendingSpace {
  id: string;
  name: string;
  memberCount: number;
  activeNow: number;
  trendingReason: string;
  attractiveMembers: Array<{ name: string; avatar?: string }>;
  insiderContent: boolean;
}

// Mock data - replace with real API calls
const mockActivityData: ActivityData[] = [
  {
    id: '1',
    type: 'join',
    user: { name: 'Emma', avatar: '/avatars/emma.jpg', isAttractive: true, year: 'Junior', major: 'Psychology' },
    space: 'CS Study Group',
    timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
  },
  {
    id: '2',
    type: 'match',
    user: { name: 'Alex', avatar: '/avatars/alex.jpg', isAttractive: true, year: 'Sophomore', major: 'Engineering' },
    content: 'found their perfect study partner',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: '3',
    type: 'insider',
    user: { name: 'Jordan', avatar: '/avatars/jordan.jpg', year: 'Senior', major: 'Business' },
    content: 'shared exclusive career fair insider info',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    exclusivity: 47, // Only 47 people have access
  },
];

const mockTrendingSpaces: TrendingSpace[] = [
  {
    id: 'study-help',
    name: 'Study Crisis Support',
    memberCount: 234,
    activeNow: 12,
    trendingReason: 'Finals week preparation',
    attractiveMembers: [
      { name: 'Sarah', avatar: '/avatars/sarah.jpg' },
      { name: 'Mike', avatar: '/avatars/mike.jpg' },
      { name: 'Zoe', avatar: '/avatars/zoe.jpg' },
    ],
    insiderContent: true,
  },
  {
    id: 'career-network',
    name: 'Career Networking',
    memberCount: 156,
    activeNow: 8,
    trendingReason: 'Job fair tomorrow',
    attractiveMembers: [
      { name: 'Taylor', avatar: '/avatars/taylor.jpg' },
      { name: 'Morgan', avatar: '/avatars/morgan.jpg' },
    ],
    insiderContent: true,
  },
];

export const SocialProofAccelerator: React.FC<SocialProofAcceleratorProps> = ({
  className,
  variant = 'dashboard',
  showTrending = true,
  showAttractive = true,
  showInsider = true,
}) => {
  const [activityData, setActivityData] = useState<ActivityData[]>(mockActivityData);
  const [trendingSpaces, setTrendingSpaces] = useState<TrendingSpace[]>(mockTrendingSpaces);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for relative timestamps
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const getRelativeTime = (timestamp: Date): string => {
    const diff = currentTime.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getActivityIcon = (type: ActivityData['type']) => {
    switch (type) {
      case 'join': return <Users className="w-4 h-4" />;
      case 'match': return <Heart className="w-4 h-4 text-pink-400" />;
      case 'insider': return <Eye className="w-4 h-4 text-purple-400" />;
      case 'trending': return <TrendingUp className="w-4 h-4 text-green-400" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const formatActivityText = (activity: ActivityData): string => {
    switch (activity.type) {
      case 'join':
        return `joined ${activity.space}`;
      case 'match':
        return activity.content || 'made a connection';
      case 'insider':
        return activity.content || 'shared exclusive content';
      default:
        return activity.content || 'was active';
    }
  };

  const variantStyles = {
    header: 'flex items-center gap-6 p-4 bg-[var(--hive-background-secondary)]/20',
    sidebar: 'w-full space-y-4',
    dashboard: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
  };

  return (
    <div className={cn('social-proof-accelerator', variantStyles[variant], className)}>
      {/* Live Activity Stream */}
      <HiveCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Activity
          </h3>
          <span className="text-sm text-[var(--hive-text-muted)]">
            {activityData.reduce((acc, item) => acc + (item.engagement || 1), 0)} UB students active
          </span>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {activityData.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-[var(--hive-background-secondary)]/30 hover:bg-[var(--hive-background-secondary)]/50 transition-colors"
              >
                {/* User Avatar */}
                <SimpleAvatar
                  size="sm"
                  src={activity.user.avatar}
                  fallback={activity.user.name[0]}
                  className={cn(
                    showAttractive && activity.user.isAttractive && "ring-2 ring-pink-400/50"
                  )}
                />

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[var(--hive-text-primary)] truncate">
                      {activity.user.name}
                    </span>
                    {showAttractive && activity.user.isAttractive && (
                      <Sparkles className="w-3 h-3 text-pink-400" />
                    )}
                    {activity.user.year && (
                      <span className="text-xs text-[var(--hive-text-muted)]">
                        {activity.user.year}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                    {getActivityIcon(activity.type)}
                    <span className="truncate">{formatActivityText(activity)}</span>
                    {showInsider && activity.exclusivity && (
                      <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded">
                        Only {activity.exclusivity} know this
                      </span>
                    )}
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-1 text-xs text-[var(--hive-text-muted)]">
                  <Clock className="w-3 h-3" />
                  {getRelativeTime(activity.timestamp)}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </HiveCard>

      {/* Trending Spaces */}
      {showTrending && (
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Trending Spaces
            </h3>
            <span className="text-sm text-[var(--hive-text-muted)]">
              What everyone's joining
            </span>
          </div>

          <div className="space-y-4">
            {trendingSpaces.map((space, index) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-[var(--hive-background-secondary)]/20 hover:bg-[var(--hive-background-secondary)]/40 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-[var(--hive-text-primary)]">
                    {space.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">{space.activeNow} active</span>
                    <span className="text-[var(--hive-text-muted)]">
                      {space.memberCount} members
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
                  Trending: {space.trendingReason}
                </p>

                {/* Attractive Members Preview */}
                {showAttractive && space.attractiveMembers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {space.attractiveMembers.slice(0, 3).map((member, idx) => (
                        <SimpleAvatar
                          key={idx}
                          size="sm"
                          src={member.avatar}
                          fallback={member.name[0]}
                          className="border-2 border-[var(--hive-background-primary)]"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[var(--hive-text-muted)]">
                      People you might click with
                    </span>
                    {showInsider && space.insiderContent && (
                      <Eye className="w-3 h-3 text-purple-400" />
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </HiveCard>
      )}
    </div>
  );
};