'use client';

import React, { useState, useEffect, useRef } from 'react';
import { logger } from '@hive/core/utils/logger';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Calendar,
  Activity,
  MessageCircle,
  Heart,
  Users,
  Trophy,
  Zap,
  BookOpen,
  Award,
  Star,
  Flag,
  Link2,
  Share2,
  GitBranch,
  Coffee,
  Music,
  Camera,
  MapPin,
  TrendingUp,
  Filter,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Download,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button, Badge } from '@hive/ui';
import { cn } from '@/lib/utils';
import { format, formatDistanceToNow, startOfDay, endOfDay, isToday, isYesterday, isThisWeek, subDays } from 'date-fns';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { useInView } from 'react-intersection-observer';

interface ActivityItem {
  id: string;
  type: 'post' | 'comment' | 'like' | 'follow' | 'achievement' | 'milestone' | 'tool' | 'event' | 'space' | 'integration';
  action: string;
  title: string;
  description?: string;
  timestamp: Date;
  icon: React.ElementType | string;
  color: string;
  bgColor: string;
  metadata?: {
    targetId?: string;
    targetName?: string;
    targetType?: string;
    count?: number;
    duration?: string;
    location?: string;
    participants?: string[];
    tags?: string[];
    image?: string;
  };
  visibility: 'public' | 'friends' | 'private';
  relatedUsers?: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

interface ActivityGroup {
  date: Date;
  label: string;
  activities: ActivityItem[];
}

interface ActivityTimelineProps {
  userId: string;
  className?: string;
}

export function ActivityTimeline({ userId, className = '' }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [groupedActivities, setGroupedActivities] = useState<ActivityGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'all'>('week');
  const [showPrivate, setShowPrivate] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    fetchActivities();
  }, [userId, filter, timeRange]);

  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      loadMoreActivities();
    }
  }, [inView, hasMore, loadingMore]);

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        userId,
        filter,
        timeRange,
        page: '1',
        limit: '20'
      });

      const response = await authenticatedFetch(`/api/users/${userId}/activities?${params}`);
      if (response.ok) {
        const data = await response.json();
        const processedActivities = processActivities(data.activities || []);
        setActivities(processedActivities);
        groupActivitiesByDate(processedActivities);
        setHasMore(data.hasMore || false);
        setPage(1);
      }
    } catch (error) {
      logger.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreActivities = async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        userId,
        filter,
        timeRange,
        page: String(page + 1),
        limit: '20'
      });

      const response = await authenticatedFetch(`/api/users/${userId}/activities?${params}`);
      if (response.ok) {
        const data = await response.json();
        const processedActivities = processActivities(data.activities || []);
        const allActivities = [...activities, ...processedActivities];
        setActivities(allActivities);
        groupActivitiesByDate(allActivities);
        setHasMore(data.hasMore || false);
        setPage(page + 1);
      }
    } catch (error) {
      logger.error('Error loading more activities:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const processActivities = (activityList: any[]): ActivityItem[] => {
    return activityList.map(activity => ({
      ...activity,
      timestamp: new Date(activity.timestamp),
      icon: getActivityIcon(activity.type),
      color: getActivityColor(activity.type),
      bgColor: getActivityBgColor(activity.type)
    }));
  };

  const groupActivitiesByDate = (activityList: ActivityItem[]) => {
    const groups: Map<string, ActivityGroup> = new Map();

    activityList
      .filter(activity => showPrivate || activity.visibility !== 'private')
      .forEach(activity => {
        const date = startOfDay(activity.timestamp);
        const key = date.toISOString();
        
        if (!groups.has(key)) {
          groups.set(key, {
            date,
            label: getDateLabel(date),
            activities: []
          });
        }
        
        groups.get(key)!.activities.push(activity);
      });

    const sortedGroups = Array.from(groups.values())
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    setGroupedActivities(sortedGroups);
  };

  const getDateLabel = (date: Date): string => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    if (isThisWeek(date)) return format(date, 'EEEE');
    return format(date, 'MMM d, yyyy');
  };

  const getActivityIcon = (type: string): React.ElementType | string => {
    switch (type) {
      case 'post': return MessageCircle;
      case 'comment': return MessageCircle;
      case 'like': return Heart;
      case 'follow': return Users;
      case 'achievement': return Trophy;
      case 'milestone': return Flag;
      case 'tool': return Zap;
      case 'event': return Calendar;
      case 'space': return Users;
      case 'integration': return Link2;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string): string => {
    switch (type) {
      case 'post': return 'text-blue-400';
      case 'comment': return 'text-green-400';
      case 'like': return 'text-pink-400';
      case 'follow': return 'text-purple-400';
      case 'achievement': return 'text-yellow-400';
      case 'milestone': return 'text-orange-400';
      case 'tool': return 'text-cyan-400';
      case 'event': return 'text-red-400';
      case 'space': return 'text-indigo-400';
      case 'integration': return 'text-gray-400';
      default: return 'text-neutral-400';
    }
  };

  const getActivityBgColor = (type: string): string => {
    switch (type) {
      case 'post': return 'bg-blue-400/10';
      case 'comment': return 'bg-green-400/10';
      case 'like': return 'bg-pink-400/10';
      case 'follow': return 'bg-purple-400/10';
      case 'achievement': return 'bg-yellow-400/10';
      case 'milestone': return 'bg-orange-400/10';
      case 'tool': return 'bg-cyan-400/10';
      case 'event': return 'bg-red-400/10';
      case 'space': return 'bg-indigo-400/10';
      case 'integration': return 'bg-gray-400/10';
      default: return 'bg-neutral-400/10';
    }
  };

  const toggleGroup = (date: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(date)) {
        next.delete(date);
      } else {
        next.add(date);
      }
      return next;
    });
  };

  const exportActivities = async () => {
    try {
      const response = await authenticatedFetch(`/api/users/${userId}/activities/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format: 'json', timeRange })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `activities-${format(new Date(), 'yyyy-MM-dd')}.json`;
        a.click();
      }
    } catch (error) {
      logger.error('Error exporting activities:', error);
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: Activity },
    { value: 'posts', label: 'Posts & Comments', icon: MessageCircle },
    { value: 'social', label: 'Social', icon: Users },
    { value: 'achievements', label: 'Achievements', icon: Trophy },
    { value: 'tools', label: 'Tools & Events', icon: Zap }
  ];

  const stats = {
    total: activities.length,
    today: activities.filter(a => isToday(a.timestamp)).length,
    week: activities.filter(a => isThisWeek(a.timestamp)).length,
    mostActive: activities.reduce((acc, activity) => {
      const hour = activity.timestamp.getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {} as Record<number, number>)
  };

  const mostActiveHour = Object.entries(stats.mostActive)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl border border-white/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
              Activity Timeline
            </h2>
            <p className="text-sm text-neutral-400">
              Your complete activity history on HIVE
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={exportActivities}
            className="border-white/20"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">
              {stats.total}
            </div>
            <div className="text-xs text-neutral-400">Total Activities</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {stats.today}
            </div>
            <div className="text-xs text-neutral-400">Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">
              {stats.week}
            </div>
            <div className="text-xs text-neutral-400">This Week</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">
              {mostActiveHour ? `${mostActiveHour[0]}:00` : 'N/A'}
            </div>
            <div className="text-xs text-neutral-400">Peak Hour</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex gap-2 overflow-x-auto">
          {filterOptions.map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 whitespace-nowrap transition-all',
                  filter === option.value
                    ? 'bg-white/10 text-[var(--hive-text-inverse)] border border-white/20'
                    : 'bg-white/5 text-neutral-400 hover:bg-white/[0.07]'
                )}
              >
                <Icon className="h-3 w-3" />
                {option.label}
              </button>
            );
          })}
        </div>

        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e: any) => setTimeRange(e.target.value as any)}
            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)]"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>

          <button
            onClick={() => setShowPrivate(!showPrivate)}
            className={cn(
              'p-1.5 rounded-lg transition-all',
              showPrivate
                ? 'bg-white/10 text-[var(--hive-text-inverse)]'
                : 'bg-white/5 text-neutral-400'
            )}
          >
            {showPrivate ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Timeline */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-white/5 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : groupedActivities.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">No activities found</p>
          <p className="text-sm text-neutral-500 mt-1">
            Start using HIVE to see your activity history
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedActivities.map(group => {
            const isExpanded = expandedGroups.has(group.date.toISOString());
            const visibleActivities = isExpanded ? group.activities : group.activities.slice(0, 3);
            
            return (
              <div key={group.date.toISOString()} className="space-y-3">
                {/* Date Header */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-sm font-medium text-neutral-400">
                    {group.label}
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Activities */}
                <div className="space-y-3">
                  <AnimatePresence mode="sync">
                    {visibleActivities.map((activity, index) => {
                      const Icon = typeof activity.icon === 'string' ? null : activity.icon;
                      
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-3"
                        >
                          {/* Timeline Line */}
                          <div className="relative">
                            <div className={cn('p-2 rounded-lg', activity.bgColor)}>
                              {Icon ? (
                                <Icon className={cn('h-4 w-4', activity.color)} />
                              ) : (
                                <span className="text-sm">{activity.icon}</span>
                              )}
                            </div>
                            {index < visibleActivities.length - 1 && (
                              <div className="absolute left-1/2 top-full h-full w-px bg-white/10 -translate-x-1/2" />
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-4">
                            <div className="bg-white/5 rounded-lg p-3 hover:bg-white/[0.07] transition-all">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-sm font-medium text-[var(--hive-text-inverse)]">
                                    {activity.title}
                                  </h4>
                                  {activity.description && (
                                    <p className="text-xs text-neutral-400 mt-1">
                                      {activity.description}
                                    </p>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-neutral-500">
                                    {format(activity.timestamp, 'h:mm a')}
                                  </span>
                                  {activity.visibility === 'private' && (
                                    <Lock className="h-3 w-3 text-neutral-500" />
                                  )}
                                </div>
                              </div>

                              {/* Metadata */}
                              {activity.metadata && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {activity.metadata.targetName && (
                                    <Badge className="bg-white/5 text-neutral-400 text-xs">
                                      {activity.metadata.targetName}
                                    </Badge>
                                  )}
                                  {activity.metadata.count && (
                                    <Badge className="bg-white/5 text-neutral-400 text-xs">
                                      {activity.metadata.count} items
                                    </Badge>
                                  )}
                                  {activity.metadata.location && (
                                    <Badge className="bg-white/5 text-neutral-400 text-xs">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {activity.metadata.location}
                                    </Badge>
                                  )}
                                </div>
                              )}

                              {/* Related Users */}
                              {activity.relatedUsers && activity.relatedUsers.length > 0 && (
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-neutral-500">With:</span>
                                  <div className="flex -space-x-2">
                                    {activity.relatedUsers.slice(0, 3).map(user => (
                                      <div
                                        key={user.id}
                                        className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-xs font-medium text-white border-2 border-black"
                                      >
                                        {user.name[0]}
                                      </div>
                                    ))}
                                    {activity.relatedUsers.length > 3 && (
                                      <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-neutral-400 border-2 border-black">
                                        +{activity.relatedUsers.length - 3}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Show More/Less */}
                {group.activities.length > 3 && (
                  <button
                    onClick={() => toggleGroup(group.date.toISOString())}
                    className="w-full py-2 text-xs text-neutral-400 hover:text-[var(--hive-text-inverse)] transition-colors flex items-center justify-center gap-1"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="h-3 w-3" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3" />
                        Show {group.activities.length - 3} More
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}

          {/* Load More */}
          {hasMore && (
            <div ref={loadMoreRef} className="py-4 text-center">
              {loadingMore ? (
                <div className="h-8 w-8 border-2 border-white/20 border-t-[var(--hive-brand-secondary)] rounded-full animate-spin mx-auto" />
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadMoreActivities}
                  className="border-white/20"
                >
                  Load More Activities
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}