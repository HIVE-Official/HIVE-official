"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  Activity,
  MessageSquare,
  Calendar,
  Users,
  Wrench,
  UserPlus,
  UserMinus,
  CheckCircle,
  Settings,
  Filter,
  Clock,
  TrendingUp,
  Eye,
  Heart,
  Reply,
  MapPin,
  Star,
  Crown,
  Sparkles,
  Zap,
  AlertCircle,
  Pin,
  ArrowRight,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';

// HIVE Activity Surface - Unified Space Activity Feed
// Real-time activity stream showing all space interactions

const hiveActivitySurfaceVariants = cva(
  "relative w-full",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-blue-500/30 ring-offset-2 ring-offset-black/20",
        builder: "ring-2 ring-blue-500/30 ring-offset-2 ring-offset-black/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Activity types with HIVE design patterns
const activityTypes = {
  post: {
    icon: MessageSquare,
    label: 'Post',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    description: 'New post created'
  },
  event: {
    icon: Calendar,
    label: 'Event',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    description: 'Event created or updated'
  },
  member_join: {
    icon: UserPlus,
    label: 'Member Join',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    description: 'New member joined'
  },
  member_leave: {
    icon: UserMinus,
    label: 'Member Leave',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    description: 'Member left space'
  },
  tool_deploy: {
    icon: Wrench,
    label: 'Tool Deploy',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    description: 'Tool deployed to space'
  },
  tool_remove: {
    icon: Settings,
    label: 'Tool Remove',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    description: 'Tool removed from space'
  },
  event_rsvp: {
    icon: CheckCircle,
    label: 'RSVP',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    description: 'Event RSVP response'
  },
  space_update: {
    icon: Star,
    label: 'Space Update',
    color: 'text-pink-400',
    bg: 'bg-pink-500/20',
    description: 'Space information updated'
  },
} as const;

export interface ActivityItem {
  id: string;
  type: keyof typeof activityTypes;
  spaceId: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    handle?: string;
  };
  content: any;
  metadata?: {
    isHighlighted?: boolean;
    isPinned?: boolean;
    [key: string]: any;
  };
}

export interface HiveActivitySurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveActivitySurfaceVariants> {
  space: Space;
  activities?: ActivityItem[];
  isBuilder?: boolean;
  canModerate?: boolean;
  onViewActivity?: (activityId: string) => void;
  onFilterActivities?: (types: string[]) => void;
  showFilters?: boolean;
  compact?: boolean;
  maxActivities?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
  // New props for real data fetching
  autoFetch?: boolean;
  authToken?: string;
}

// Helper function to get auth token from session storage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const sessionJson = localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      return process.env.NODE_ENV === 'development' 
        ? `dev_token_${session.uid}` 
        : session.token;
    }
  } catch (error) {
    console.error('Error getting session:', error);
  }
  return null;
};

// API function to fetch activity feed
const fetchActivityFeed = async (spaceId: string, limit = 20, types?: string[]): Promise<{
  activities: ActivityItem[];
  total: number;
  hasMore: boolean;
  summary: any;
}> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token available');
  }

  const params = new URLSearchParams({
    limit: limit.toString(),
  });
  
  if (types && types.length > 0) {
    params.append('types', types.join(','));
  }

  const response = await fetch(`/api/spaces/${spaceId}/feed?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch activity feed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    activities: data.activities || [],
    total: data.total || 0,
    hasMore: data.hasMore || false,
    summary: data.summary || {}
  };
};

export const HiveActivitySurface = React.forwardRef<HTMLDivElement, HiveActivitySurfaceProps>(
  ({ 
    className,
    mode,
    space,
    activities: propActivities,
    isBuilder = false,
    canModerate = false,
    onViewActivity,
    onFilterActivities,
    showFilters = true,
    compact = false,
    maxActivities = 15,
    autoRefresh = false,
    refreshInterval = 30000,
    autoFetch = true,
    authToken,
    ...props 
  }, ref) => {
    
    const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<string[]>(['post', 'event', 'member_join', 'tool_deploy']);
    const [fetchedActivities, setFetchedActivities] = useState<ActivityItem[]>([]);
    const [activitySummary, setActivitySummary] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(autoFetch);
    const [error, setError] = useState<string | null>(null);
    const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
    
    // Fetch activities from API if autoFetch is enabled
    useEffect(() => {
      if (!autoFetch || !space?.id) return;
      
      const loadActivities = async () => {
        try {
          setIsLoading(true);
          setError(null);
          const { activities, summary } = await fetchActivityFeed(space.id, maxActivities, selectedTypes);
          setFetchedActivities(activities);
          setActivitySummary(summary);
          setLastRefresh(new Date());
        } catch (error) {
          console.error('Failed to fetch activities:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch activities');
        } finally {
          setIsLoading(false);
        }
      };

      loadActivities();
    }, [autoFetch, space?.id, maxActivities, selectedTypes]);
    
    // Auto-refresh functionality
    useEffect(() => {
      if (!autoRefresh || !autoFetch || !space?.id) return;
      
      const interval = setInterval(async () => {
        try {
          const { activities, summary } = await fetchActivityFeed(space.id, maxActivities, selectedTypes);
          setFetchedActivities(activities);
          setActivitySummary(summary);
          setLastRefresh(new Date());
        } catch (error) {
          console.error('Auto-refresh failed:', error);
        }
      }, refreshInterval);
      
      return () => clearInterval(interval);
    }, [autoRefresh, autoFetch, space?.id, maxActivities, selectedTypes, refreshInterval]);
    
    // Use either provided activities or fetched activities
    const activities = propActivities || fetchedActivities;
    
    const handleTypeToggle = useCallback((type: string) => {
      const newTypes = selectedTypes.includes(type)
        ? selectedTypes.filter(t => t !== type)
        : [...selectedTypes, type];
      
      setSelectedTypes(newTypes);
      onFilterActivities?.(newTypes);
    }, [selectedTypes, onFilterActivities]);
    
    const handleRefresh = useCallback(async () => {
      if (!space?.id) return;
      
      try {
        setIsLoading(true);
        const { activities, summary } = await fetchActivityFeed(space.id, maxActivities, selectedTypes);
        setFetchedActivities(activities);
        setActivitySummary(summary);
        setLastRefresh(new Date());
      } catch (error) {
        console.error('Manual refresh failed:', error);
        setError(error instanceof Error ? error.message : 'Failed to refresh activities');
      } finally {
        setIsLoading(false);
      }
    }, [space?.id, maxActivities, selectedTypes]);
    
    // Get relative time string
    const getRelativeTime = useCallback((timestamp: string) => {
      const now = new Date();
      const activityTime = new Date(timestamp);
      const diffInSeconds = Math.floor((now.getTime() - activityTime.getTime()) / 1000);
      
      if (diffInSeconds < 60) return 'just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
      return activityTime.toLocaleDateString();
    }, []);
    
    // Render activity content based on type
    const renderActivityContent = useCallback((activity: ActivityItem) => {
      const typeConfig = activityTypes[activity.type];
      
      switch (activity.type) {
        case 'post':
          return (
            <div className="space-y-2">
              <p className="text-sm text-[var(--hive-text-primary)] font-medium">
                {activity.content.title}
              </p>
              {activity.content.content && (
                <p className="text-xs text-gray-400 line-clamp-2">
                  {activity.content.content}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{activity.content.likesCount || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Reply className="w-3 h-3" />
                  <span>{activity.content.repliesCount || 0}</span>
                </div>
                {activity.content.isPinned && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Pin className="w-3 h-3" />
                    <span>Pinned</span>
                  </div>
                )}
              </div>
            </div>
          );
          
        case 'event':
          return (
            <div className="space-y-2">
              <p className="text-sm text-[var(--hive-text-primary)] font-medium">
                {activity.content.title}
              </p>
              {activity.content.description && (
                <p className="text-xs text-gray-400 line-clamp-2">
                  {activity.content.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                {activity.content.startDate && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(activity.content.startDate).toLocaleDateString()}</span>
                  </div>
                )}
                {activity.content.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-24">{activity.content.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{activity.content.currentAttendees || 0} going</span>
                </div>
              </div>
            </div>
          );
          
        case 'member_join':
          return (
            <div className="space-y-1">
              <p className="text-sm text-[var(--hive-text-primary)]">
                Joined as <span className="font-medium capitalize">{activity.content.role}</span>
              </p>
              {activity.content.isNewMember && (
                <p className="text-xs text-green-400">Welcome to the space! 🎉</p>
              )}
            </div>
          );
          
        case 'tool_deploy':
          return (
            <div className="space-y-2">
              <p className="text-sm text-[var(--hive-text-primary)] font-medium">
                Deployed {activity.content.toolName}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span className="capitalize">{activity.content.status}</span>
                </div>
                {activity.content.configuration && Object.keys(activity.content.configuration).length > 0 && (
                  <div className="flex items-center gap-1">
                    <Settings className="w-3 h-3" />
                    <span>Configured</span>
                  </div>
                )}
              </div>
            </div>
          );
          
        default:
          return (
            <p className="text-sm text-gray-400">
              {typeConfig.description}
            </p>
          );
      }
    }, []);
    
    // Loading state
    if (isLoading && activities.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(hiveActivitySurfaceVariants({ mode, className }))}
          {...props}
        >
          <div className="space-y-4">
            {/* Loading skeleton for activity items */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-600 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-600 rounded w-32"></div>
                    <div className="h-4 bg-gray-600 rounded w-48"></div>
                    <div className="h-3 bg-gray-600 rounded w-24"></div>
                  </div>
                  <div className="w-8 h-8 bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Error state
    if (error) {
      return (
        <div
          ref={ref}
          className={cn(hiveActivitySurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-red-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Activity className="w-8 h-8 text-red-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Unable to Load Activity</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed">
              {error}
            </p>
            
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all duration-200 font-medium"
              onClick={handleRefresh}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </motion.button>
          </motion.div>
        </div>
      );
    }
    
    // Empty state
    if (activities.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(hiveActivitySurfaceVariants({ mode, className }))}
          {...props}
        >
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDurations.smooth }}
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-2xl flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Activity className="w-8 h-8 text-blue-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">No Recent Activity</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              This space doesn't have any recent activity. Create posts, events, or deploy tools to get things started.
            </p>
          </motion.div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(hiveActivitySurfaceVariants({ mode, className }))}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Activity Feed</h3>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{activities.length} recent</span>
              {activitySummary?.lastActivity && (
                <>
                  <span>•</span>
                  <span>Last: {getRelativeTime(activitySummary.lastActivity)}</span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Refresh Button */}
            <motion.button
              className="p-2 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
              onClick={handleRefresh}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            </motion.button>
            
            {/* Auto-refresh indicator */}
            {autoRefresh && (
              <div className="flex items-center gap-1 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Live</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Type Filters */}
        {showFilters && (
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {Object.entries(activityTypes).map(([type, config]) => {
              const Icon = config.icon;
              const isActive = selectedTypes.includes(type);
              const count = activitySummary?.typeBreakdown?.[type] || 0;
              
              return (
                <motion.button
                  key={type}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : "bg-[var(--hive-background-primary)]/20 text-gray-400 border-white/10 hover:border-white/20 hover:text-[var(--hive-text-primary)]"
                  )}
                  onClick={() => handleTypeToggle(type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-blue-400" : config.color)} />
                  <span>{config.label}</span>
                  {count > 0 && (
                    <span className={cn(
                      "px-1.5 py-0.5 rounded-full text-xs",
                      isActive 
                        ? "bg-blue-500/30 text-blue-300"
                        : "bg-[var(--hive-text-primary)]/10 text-gray-500"
                    )}>
                      {count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
        
        {/* Activity Feed */}
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const typeConfig = activityTypes[activity.type];
            const TypeIcon = typeConfig.icon;
            const isHovered = hoveredActivity === activity.id;
            
            return (
              <motion.article
                key={activity.id}
                className={cn(
                  "relative group bg-[var(--hive-background-primary)]/10 backdrop-blur-sm border border-white/5 rounded-xl p-4 transition-all duration-200 cursor-pointer",
                  isHovered && "border-white/10",
                  activity.metadata?.isHighlighted && "ring-1 ring-blue-500/30 bg-blue-500/5",
                  activity.metadata?.isPinned && "ring-1 ring-yellow-500/30 bg-yellow-500/5",
                  mode === 'edit' && "hover:ring-2 hover:ring-blue-500/30"
                )}
                onMouseEnter={() => setHoveredActivity(activity.id)}
                onMouseLeave={() => setHoveredActivity(null)}
                onClick={() => onViewActivity?.(activity.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                layout
              >
                {/* Priority indicators */}
                {activity.metadata?.isPinned && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.03 + 0.2 }}
                  />
                )}
                
                <div className="flex items-start gap-3">
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {activity.user.avatar ? (
                      <img
                        src={activity.user.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-500/20 to-gray-700/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                          {activity.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-[var(--hive-text-primary)] text-sm">
                        {activity.user.name}
                      </span>
                      {activity.user.handle && (
                        <span className="text-xs text-gray-400">@{activity.user.handle}</span>
                      )}
                      <span className="text-xs text-gray-500">
                        {getRelativeTime(activity.timestamp)}
                      </span>
                    </div>
                    
                    {/* Activity-specific content */}
                    {renderActivityContent(activity)}
                  </div>
                  
                  {/* Activity Type Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                    typeConfig.bg
                  )}>
                    <TypeIcon className={cn("w-4 h-4", typeConfig.color)} />
                  </div>
                </div>
                
                {/* Hover Actions */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute top-2 right-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: motionDurations.quick }}
                    >
                      <motion.button
                        className="p-1.5 text-gray-400 hover:text-[var(--hive-text-primary)] rounded-lg hover:bg-[var(--hive-text-primary)]/5 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
        
        {/* Builder Hint */}
        {isBuilder && mode === 'edit' && (
          <motion.div
            className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-blue-400 mb-1">Builder Mode Active</h4>
                <p className="text-xs text-blue-300/80">
                  The activity feed shows all recent space interactions. This helps members stay connected and engaged with community activity.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

HiveActivitySurface.displayName = "HiveActivitySurface";

export { hiveActivitySurfaceVariants, activityTypes };