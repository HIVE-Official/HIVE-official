'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';

export interface CampusActivity {
  id: string;
  type: 'message' | 'event' | 'announcement' | 'assignment' | 'social' | 'achievement' | 'space_join' | 'tool_created';
  title: string;
  content?: string;
  author?: {
    name: string;
    avatar?: string;
    handle?: string;
  };
  space?: {
    id: string;
    name: string;
    type: 'course' | 'housing' | 'club' | 'academic' | 'community' | 'school' | 'graduation' | 'mentoring';
  };
  timestamp: string;
  priority?: 'high' | 'medium' | 'low';
  isUnread?: boolean;
  metadata?: {
    attachmentCount?: number;
    replyCount?: number;
    likes?: number;
    eventDate?: string;
    dueDate?: string;
  };
}

export interface CampusActivityFeedProps {
  activities: CampusActivity[];
  isLoading?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  showFilters?: boolean;
  maxItems?: number;
  onActivityClick?: (activityId: string) => void;
  onViewAll?: () => void;
  onFilterChange?: (filters: string[]) => void;
  className?: string;
}

const activityTypeConfig = {
  message: {
    icon: '💬',
    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    label: 'Message'
  },
  event: {
    icon: '📅',
    color: 'from-[var(--hive-gold)]/20 to-[var(--hive-gold-dark)]/10',
    border: 'border-[var(--hive-gold)]/30',
    label: 'Event'
  },
  announcement: {
    icon: '📢',
    color: 'from-gold/20 to-champagne/10',
    border: 'border-[var(--hive-brand-secondary)]/30',
    label: 'Announcement'
  },
  assignment: {
    icon: '📝',
    color: 'from-red-500/20 to-red-600/10',
    border: 'border-red-500/30',
    label: 'Assignment'
  },
  social: {
    icon: '🎉',
    color: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/30',
    label: 'Social'
  },
  achievement: {
    icon: '🏆',
    color: 'from-gold/20 to-champagne/10',
    border: 'border-[var(--hive-brand-secondary)]/30',
    label: 'Achievement'
  },
  space_join: {
    icon: '🏛️',
    color: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
    label: 'Space Activity'
  },
  tool_created: {
    icon: '🔧',
    color: 'from-gold/20 to-champagne/10',
    border: 'border-[var(--hive-brand-secondary)]/30',
    label: 'Tool Created'
  }
};

export const CampusActivityFeed: React.FC<CampusActivityFeedProps> = ({
  activities,
  isLoading = false,
  variant: _variant = 'default',
  showFilters: _showFilters = false,
  maxItems = 8,
  onActivityClick,
  onViewAll,
  onFilterChange: _onFilterChange,
  className
}) => {
  const [hoveredActivity, setHoveredActivity] = useState<string | null>(null);

  const formatTimestamp = (timestamp: string): string => {
    const now = new Date();
    const activity = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activity.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return `${Math.floor(diffInMinutes / 10080)}w ago`;
  };


  const displayedActivities = activities?.slice(0, maxItems) ?? [];
  const hasMoreActivities = (activities?.length ?? 0) > maxItems;


  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90',
          'backdrop-blur-xl border border-steel/10',
          'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]',
          'p-6',
          className
        )}
      >
        <div className="space-y-4">
          <div className="h-6 bg-steel/20 rounded animate-pulse" />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-10 h-10 bg-steel/20 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-steel/20 rounded animate-pulse" />
                <div className="h-3 bg-steel/20 rounded animate-pulse w-3/4" />
                <div className="h-3 bg-steel/20 rounded animate-pulse w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }}
      className={cn(
        // BentoGrid-inspired card treatment
        'relative overflow-hidden rounded-2xl',
        // HIVE luxury background with sophisticated glass morphism
        'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90',
        'backdrop-blur-xl border border-steel/10',
        // Subtle inner glow for premium feel
        'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]',
        // Interactive hover states with magnetic feel
        'hover:border-steel/20 hover:shadow-[inset_0_1px_0_0_var(--hive-interactive-active)]',
        'transition-all duration-300 ease-hive-smooth',
        // Responsive padding with bento spacing
        'p-6',
        className
      )}
    >
      {/* Sophisticated Background Pattern - BentoGrid Feel */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-lg" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 border border-[var(--hive-brand-secondary)]/20 flex items-center justify-center">
              <span className="text-[var(--hive-brand-secondary)] text-lg">⚡</span>
            </div>
            <h3 className="text-platinum font-bold text-xl tracking-tight">Campus Activity</h3>
          </div>
          
          {onViewAll && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewAll}
              className="text-[var(--hive-brand-secondary)] hover:text-champagne transition-colors duration-200 text-sm font-medium"
            >
              View All
            </motion.button>
          )}
        </div>
        
        <p className="text-mercury text-sm">
          Recent campus activity from your spaces
        </p>
      </div>

      {/* Activity Timeline */}
      <div className="relative z-10">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-steel/30 via-steel/20 to-transparent" />

        <div className="space-y-4">
          <AnimatePresence>
            {displayedActivities.map((activity, index) => {
              const config = activityTypeConfig[activity.type];
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.4,
                    ease: [0.23, 1, 0.32, 1]
                  }}
                  onHoverStart={() => setHoveredActivity(activity.id)}
                  onHoverEnd={() => setHoveredActivity(null)}
                  onClick={() => onActivityClick?.(activity.id)}
                  className={cn(
                    'relative group cursor-pointer rounded-xl p-4 pl-16',
                    'bg-gradient-to-br from-charcoal/40 via-charcoal/30 to-graphite/40',
                    'border border-steel/10 backdrop-blur-sm',
                    'hover:border-steel/20 hover:from-charcoal/60 hover:to-graphite/60',
                    'transition-all duration-300 ease-hive-smooth',
                    'hover:shadow-lg',
                    activity.isUnread && 'ring-1 ring-gold/20'
                  )}
                >
                  {/* Activity Type Icon */}
                  <div className={cn(
                    'absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl',
                    'flex items-center justify-center border-2 bg-gradient-to-br from-charcoal to-graphite',
                    config.border,
                    'group-hover:scale-110 transition-transform duration-300'
                  )}>
                    <span className="text-sm">{config.icon}</span>
                  </div>

                  {/* Activity Content */}
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className={cn(
                            'font-semibold truncate text-sm',
                            activity.priority === 'high' ? 'text-[var(--hive-brand-secondary)]' : 'text-platinum'
                          )}>
                            {activity.title}
                          </h4>
                          
                          {activity.isUnread && (
                            <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] shadow-[0_0_4px_color-mix(in_srgb,var(--hive-brand-secondary)_50%,transparent)]" />
                          )}
                        </div>

                        {/* Activity Content Preview */}
                        {activity.content && (
                          <p className="text-mercury text-sm mb-2 line-clamp-2">
                            {activity.content}
                          </p>
                        )}

                        {/* Activity Metadata */}
                        <div className="flex items-center gap-2 text-xs text-steel">
                          {activity.author && (
                            <>
                              <span>{activity.author.name}</span>
                              <span>•</span>
                            </>
                          )}
                          
                          {activity.space && (
                            <>
                              <span className="text-mercury">{activity.space.name}</span>
                              <span>•</span>
                            </>
                          )}
                          
                          <span>{formatTimestamp(activity.timestamp)}</span>
                        </div>
                      </div>

                      {/* Activity Stats */}
                      <div className="flex items-center gap-3 text-xs text-steel">
                        {activity.metadata?.replyCount && (
                          <div className="flex items-center gap-1">
                            <span>💬</span>
                            <span>{activity.metadata.replyCount}</span>
                          </div>
                        )}
                        
                        {activity.metadata?.likes && (
                          <div className="flex items-center gap-1">
                            <span>❤️</span>
                            <span>{activity.metadata.likes}</span>
                          </div>
                        )}
                        
                        {activity.metadata?.attachmentCount && (
                          <div className="flex items-center gap-1">
                            <span>📎</span>
                            <span>{activity.metadata.attachmentCount}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Due Date or Event Date */}
                    {(activity.metadata?.dueDate || activity.metadata?.eventDate) && (
                      <div className="mt-2 pt-2 border-t border-steel/10">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-[var(--hive-brand-secondary)]">
                            {activity.metadata.dueDate ? '⏰' : '📅'}
                          </span>
                          <span className="text-mercury">
                            {activity.metadata.dueDate ? 'Due' : 'Event'}: {' '}
                            {new Date(activity.metadata.dueDate || activity.metadata.eventDate!).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className={cn(
                      'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                      `bg-gradient-to-br ${config.color}`
                    )}
                    animate={hoveredActivity === activity.id ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* More Activities Indicator */}
        {hasMoreActivities && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center pt-4 border-t border-steel/10 mt-4"
          >
            <button
              onClick={onViewAll}
              className="text-mercury hover:text-platinum transition-colors duration-200 text-sm"
            >
              +{(activities?.length ?? 0) - maxItems} more activities
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {(activities?.length ?? 0) === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-charcoal/60 to-graphite/60 border border-steel/20 flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="text-platinum font-medium mb-2">No Recent Activity</h4>
            <p className="text-mercury text-sm">
              Join more spaces to see campus activity here
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CampusActivityFeed;