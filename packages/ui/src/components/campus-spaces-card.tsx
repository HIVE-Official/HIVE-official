'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from './framer-motion-proxy';
import { cn } from '../lib/utils';
import { 
  Bell, 
  BellOff, 
  MessageSquare, 
  UserMinus, 
  MoreHorizontal, 
  Pin, 
  PinOff,
  Send,
  X
} from 'lucide-react';

export interface CampusSpace {
  id: string;
  name: string;
  type: 'course' | 'housing' | 'club' | 'academic' | 'community' | 'school' | 'graduation' | 'mentoring';
  memberCount: number;
  unreadCount?: number;
  lastActivity?: string;
  icon?: string;
  color?: string;
  isPrivate?: boolean;
  isFavorite?: boolean;
  isPinned?: boolean;
  isMuted?: boolean;
  userRole?: 'member' | 'moderator' | 'leader';
  recentActivity?: {
    type: 'message' | 'event' | 'announcement';
    preview: string;
    timestamp: string;
  };
}

export interface CampusSpacesCardProps {
  spaces: CampusSpace[];
  isLoading?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  showQuickActions?: boolean;
  onSpaceClick?: (spaceId: string) => void;
  onJoinSpace?: () => void;
  onViewAll?: () => void;
  onMuteSpace?: (spaceId: string, muted: boolean) => void;
  onPinSpace?: (spaceId: string, pinned: boolean) => void;
  onLeaveSpace?: (spaceId: string) => void;
  onQuickPost?: (spaceId: string, message: string) => void;
  className?: string;
}

const spaceTypeIcons: Record<CampusSpace['type'], string> = {
  course: '📚',
  housing: '🏠',
  club: '⭐',
  academic: '🎓',
  community: '👥',
  school: '🏛️',
  graduation: '🎓',
  mentoring: '🤝'
};

const spaceTypeColors: Record<CampusSpace['type'], string> = {
  course: 'from-blue-500/20 to-blue-600/10',
  housing: 'from-emerald-500/20 to-emerald-600/10',
  club: 'from-purple-500/20 to-purple-600/10',
  academic: 'from-gold/20 to-champagne/10',
  community: 'from-rose-500/20 to-rose-600/10',
  school: 'from-indigo-500/20 to-indigo-600/10',
  graduation: 'from-gold/20 to-champagne/10',
  mentoring: 'from-teal-500/20 to-teal-600/10'
};

export const CampusSpacesCard: React.FC<CampusSpacesCardProps> = ({
  spaces,
  isLoading = false,
  variant = 'default',
  showQuickActions = true,
  onSpaceClick,
  onJoinSpace,
  onViewAll,
  onMuteSpace,
  onPinSpace,
  onLeaveSpace,
  onQuickPost,
  className
}) => {
  const [hoveredSpace, setHoveredSpace] = useState<string | null>(null);
  const [showQuickPostFor, setShowQuickPostFor] = useState<string | null>(null);
  const [quickPostMessage, setQuickPostMessage] = useState('');

  const formatMemberCount = (count: number): string => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const formatLastActivity = (timestamp: string): string => {
    const now = new Date();
    const activity = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - activity.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  const displayedSpaces = spaces.slice(0, 6); // Show max 6 spaces
  const hasMoreSpaces = spaces.length > 6;

  // Quick action handlers
  const handleQuickPost = (spaceId: string) => {
    if (quickPostMessage.trim() && onQuickPost) {
      onQuickPost(spaceId, quickPostMessage.trim());
      setQuickPostMessage('');
      setShowQuickPostFor(null);
    }
  };

  const toggleQuickPost = (spaceId: string) => {
    setShowQuickPostFor(showQuickPostFor === spaceId ? null : spaceId);
    setQuickPostMessage('');
  };

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
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-steel/20 rounded-xl animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-steel/20 rounded animate-pulse" />
                <div className="h-3 bg-steel/20 rounded animate-pulse w-2/3" />
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
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-champagne/10 border border-gold/20 flex items-center justify-center">
              <span className="text-gold text-lg">🏛️</span>
            </div>
            <h3 className="text-platinum font-bold text-xl tracking-tight">Your Campus Spaces</h3>
          </div>
          
          {showQuickActions && onViewAll && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onViewAll}
              className="text-gold hover:text-champagne transition-colors duration-200 text-sm font-medium"
            >
              View All
            </motion.button>
          )}
        </div>
        
        <p className="text-mercury text-sm">
          {spaces.length} space{spaces.length !== 1 ? 's' : ''} joined
        </p>
      </div>

      {/* Spaces Grid */}
      <div className="relative z-10 space-y-3">
        <AnimatePresence>
          {displayedSpaces.map((space, index) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1]
              }}
              onHoverStart={() => setHoveredSpace(space.id)}
              onHoverEnd={() => setHoveredSpace(null)}
              onClick={() => onSpaceClick?.(space.id)}
              className={cn(
                'relative group cursor-pointer rounded-xl p-4',
                'bg-gradient-to-br from-charcoal/40 via-charcoal/30 to-graphite/40',
                'border border-steel/10 backdrop-blur-sm',
                'hover:border-steel/20 hover:from-charcoal/60 hover:to-graphite/60',
                'transition-all duration-300 ease-hive-smooth',
                'hover:shadow-lg'
              )}
            >
              {/* Space Type Glow */}
              <div className={cn(
                'absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                `bg-gradient-to-br ${spaceTypeColors[space.type]}`
              )} />

              <div className="relative z-10">
                <div className="flex items-center gap-4">
                  {/* Space Icon */}
                  <div className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center border',
                    'bg-gradient-to-br from-charcoal/60 to-graphite/60 border-steel/20',
                    'group-hover:border-gold/30 transition-all duration-300',
                    hoveredSpace === space.id && 'scale-105 shadow-lg'
                  )}>
                    <span className="text-xl">
                      {space.icon || spaceTypeIcons[space.type]}
                    </span>
                  </div>

                  {/* Space Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-platinum font-semibold truncate text-base">
                        {space.name}
                      </h4>
                      
                      {/* Status Indicators */}
                      <div className="flex items-center gap-2 ml-2">
                        {space.isPinned && (
                          <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_4px_color-mix(in_srgb,var(--hive-brand-secondary)_50%,transparent)]" />
                        )}
                        {space.isMuted && (
                          <BellOff className="w-3 h-3 text-steel/60" />
                        )}
                        {space.unreadCount && space.unreadCount > 0 && !space.isMuted && (
                          <div className="px-2 py-0.5 bg-gold/20 border border-gold/30 rounded-full">
                            <span className="text-gold text-xs font-medium">
                              {space.unreadCount > 99 ? '99+' : space.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Space Details */}
                    <div className="flex items-center gap-2 text-sm text-mercury">
                      <span className="capitalize">{space.type}</span>
                      <span className="text-steel/60">•</span>
                      <span>{formatMemberCount(space.memberCount)} members</span>
                      {space.lastActivity && (
                        <>
                          <span className="text-steel/60">•</span>
                          <span className="text-xs">
                            {formatLastActivity(space.lastActivity)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions - Shown on Hover */}
                  {showQuickActions && hoveredSpace === space.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-1"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleQuickPost(space.id);
                        }}
                        className="p-1.5 rounded-lg bg-charcoal/60 border border-steel/20 hover:border-gold/30 hover:bg-gold/10 transition-all duration-200 group/btn"
                        title="Quick Post"
                      >
                        <MessageSquare className="w-3 h-3 text-mercury group-hover/btn:text-gold" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPinSpace?.(space.id, !space.isPinned);
                        }}
                        className="p-1.5 rounded-lg bg-charcoal/60 border border-steel/20 hover:border-gold/30 hover:bg-gold/10 transition-all duration-200 group/btn"
                        title={space.isPinned ? "Unpin Space" : "Pin Space"}
                      >
                        {space.isPinned ? (
                          <PinOff className="w-3 h-3 text-gold group-hover/btn:text-champagne" />
                        ) : (
                          <Pin className="w-3 h-3 text-mercury group-hover/btn:text-gold" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onMuteSpace?.(space.id, !space.isMuted);
                        }}
                        className="p-1.5 rounded-lg bg-charcoal/60 border border-steel/20 hover:border-gold/30 hover:bg-gold/10 transition-all duration-200 group/btn"
                        title={space.isMuted ? "Unmute Space" : "Mute Space"}
                      >
                        {space.isMuted ? (
                          <BellOff className="w-3 h-3 text-steel/60 group-hover/btn:text-mercury" />
                        ) : (
                          <Bell className="w-3 h-3 text-mercury group-hover/btn:text-gold" />
                        )}
                      </button>

                      {space.userRole === 'member' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onLeaveSpace?.(space.id);
                          }}
                          className="p-1.5 rounded-lg bg-charcoal/60 border border-steel/20 hover:border-red-400/30 hover:bg-red-400/10 transition-all duration-200 group/btn"
                          title="Leave Space"
                        >
                          <UserMinus className="w-3 h-3 text-mercury group-hover/btn:text-red-400" />
                        </button>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Recent Activity Preview */}
                {space.recentActivity && hoveredSpace === space.id && !showQuickPostFor && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-2 border-t border-steel/10"
                  >
                    <p className="text-xs text-silver/80 truncate">
                      {space.recentActivity.preview}
                    </p>
                  </motion.div>
                )}

                {/* Quick Post Interface */}
                {showQuickPostFor === space.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-2 border-t border-steel/10"
                  >
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={quickPostMessage}
                        onChange={(e) => setQuickPostMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleQuickPost(space.id);
                          } else if (e.key === 'Escape') {
                            setShowQuickPostFor(null);
                            setQuickPostMessage('');
                          }
                        }}
                        placeholder={`Post to ${space.name}...`}
                        className="flex-1 px-3 py-1.5 bg-charcoal/40 border border-steel/20 rounded-lg text-platinum text-sm placeholder-mercury/60 focus:border-gold/30 focus:outline-none transition-colors"
                        autoFocus
                      />
                      <button
                        onClick={() => handleQuickPost(space.id)}
                        disabled={!quickPostMessage.trim()}
                        className="p-1.5 rounded-lg bg-gold/20 border border-gold/30 text-gold hover:bg-gold/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <Send className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          setShowQuickPostFor(null);
                          setQuickPostMessage('');
                        }}
                        className="p-1.5 rounded-lg bg-charcoal/60 border border-steel/20 text-mercury hover:text-red-400 hover:border-red-400/30 transition-all duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Magnetic hover effect */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={hoveredSpace === space.id ? { scale: 1.02 } : { scale: 1 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* More Spaces Indicator */}
        {hasMoreSpaces && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center pt-3 border-t border-steel/10"
          >
            <button
              onClick={onViewAll}
              className="text-mercury hover:text-platinum transition-colors duration-200 text-sm"
            >
              +{spaces.length - 6} more spaces
            </button>
          </motion.div>
        )}

        {/* Join New Space CTA */}
        {showQuickActions && onJoinSpace && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 2 32px color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onJoinSpace}
            className={cn(
              'w-full mt-4 p-3 rounded-xl border-2 border-dashed border-steel/30',
              'hover:border-gold/50 hover:bg-gold/5',
              'text-mercury hover:text-gold transition-all duration-300',
              'flex items-center justify-center gap-2 text-sm font-medium',
              'group'
            )}
          >
            <motion.span
              className="text-lg group-hover:rotate-90 transition-transform duration-300"
            >
              +
            </motion.span>
            Join New Space
          </motion.button>
        )}
      </div>

      {/* Empty State */}
      {spaces.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 text-center py-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-charcoal/60 to-graphite/60 border border-steel/20 flex items-center justify-center">
            <span className="text-2xl">🏛️</span>
          </div>
          <h4 className="text-platinum font-medium mb-2">No Spaces Yet</h4>
          <p className="text-mercury text-sm mb-4">
            Join campus spaces to connect with your community
          </p>
          {onJoinSpace && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onJoinSpace}
              className="px-4 py-2 bg-gradient-to-r from-gold/20 to-champagne/20 border border-gold/30 rounded-xl text-gold text-sm font-medium hover:from-gold/30 hover:to-champagne/30 transition-all duration-300"
            >
              Explore Spaces
            </motion.button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CampusSpacesCard;