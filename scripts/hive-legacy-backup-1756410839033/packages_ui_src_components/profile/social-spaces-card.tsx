/**
 * Social Spaces Card - Community Social Discovery
 * Display user's communities with social context and activity
 */

"use client";

import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Calendar, 
  TrendingUp, 
  Plus, 
  Search,
  Zap,
  Volume2,
  VolumeX,
  Crown,
  Shield,
  UserPlus,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from '../../lib/motion';
import { butterClasses, getStaggerClass } from '../../lib/motion';
import '../../styles/social-profile.css';

interface Space {
  id: string;
  name: string;
  type: 'academic' | 'housing' | 'club' | 'course' | 'community' | 'social';
  memberCount: number;
  role: 'member' | 'moderator' | 'leader' | 'admin';
  activityLevel: 'quiet' | 'active' | 'busy' | 'very-active';
  unreadCount?: number;
  recentActivity?: {
    type: 'post' | 'event' | 'poll' | 'announcement';
    author: string;
    content: string;
    timestamp: string;
  };
  upcomingEvents?: {
    count: number;
    nextEvent?: string;
  };
  mutualFriends?: string[];
  isPrivate: boolean;
  color: string;
  icon?: string;
  lastActivity: string;
}

interface SocialSpacesCardProps {
  spaces: Space[];
  recommendations?: Space[];
  onSpaceClick?: (spaceId: string) => void;
  onJoinSpace?: (spaceId: string) => void;
  onCreateSpace?: () => void;
  onExploreSpaces?: () => void;
  className?: string;
}

export function SocialSpacesCard({
  spaces = [],
  recommendations = [],
  onSpaceClick,
  onJoinSpace,
  onCreateSpace,
  onExploreSpaces,
  className
}: SocialSpacesCardProps) {
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  const getSpaceIcon = (type: Space['type']) => {
    switch (type) {
      case 'academic': return '🎓';
      case 'housing': return '🏠';
      case 'club': return '⭐';
      case 'course': return '💻';
      case 'community': return '🎉';
      case 'social': return '🌟';
      default: return '👥';
    }
  };
  
  const getActivityIcon = (level: Space['activityLevel']) => {
    switch (level) {
      case 'very-active': return <Zap className="text-red-400" size={12} />;
      case 'busy': return <TrendingUp className="text-orange-400" size={12} />;
      case 'active': return <Volume2 className="text-green-400" size={12} />;
      case 'quiet': return <VolumeX className="text-gray-400" size={12} />;
    }
  };
  
  const getRoleIcon = (role: Space['role']) => {
    switch (role) {
      case 'admin': return <Crown size={12} className="text-blue-400" />;
      case 'leader': return <Shield size={12} className="text-blue-400" />;
      case 'moderator': return <Shield size={12} className="text-green-400" />;
      default: return null;
    }
  };
  
  const formatMemberCount = (count: number) => {
    if (count > 1000) return `${(count / 1000).toFixed(1)}k👥`;
    return `${count}👥`;
  };
  
  const getActivityText = (level: Space['activityLevel']) => {
    switch (level) {
      case 'very-active': return 'Very Active';
      case 'busy': return 'Busy';
      case 'active': return 'Active';
      case 'quiet': return 'Quiet';
    }
  };
  
  const SpaceItem: React.FC<{ space: Space; isRecommendation?: boolean }> = ({ 
    space, 
    isRecommendation = false 
  }) => (
    <motion.div
      className={cn("group relative p-5 rounded-xl border border-white/8 hover:border-white/16 cursor-pointer", butterClasses.listItem)}
      onClick={() => isRecommendation ? onJoinSpace?.(space.id) : onSpaceClick?.(space.id)}
      whileHover={{ y: -4, scale: 1.005, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
      whileTap={{ scale: 0.995, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Space Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4 flex-1">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--hive-text-inverse)] text-lg"
            style={{ background: space.color }}
          >
            {space.icon || getSpaceIcon(space.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="profile-body font-semibold text-primary truncate">
                {space.name}
              </h4>
              {getRoleIcon(space.role)}
            </div>
            
            <div className="flex items-center gap-3 mt-1.5">
              <span className="profile-caption text-secondary">
                {formatMemberCount(space.memberCount)}
              </span>
              <span className="text-tertiary">•</span>
              <div className="flex items-center gap-1">
                {getActivityIcon(space.activityLevel)}
                <span className="profile-caption text-tertiary">
                  {getActivityText(space.activityLevel)}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Unread Badge */}
        {!isRecommendation && space.unreadCount && space.unreadCount > 0 && (
          <Badge className="bg-blue-500 text-[var(--hive-text-inverse)] text-xs px-2 py-0 min-w-[20px] h-5 flex items-center justify-center">
            {space.unreadCount > 99 ? '99+' : space.unreadCount}
          </Badge>
        )}
      </div>
      
      {/* Recent Activity */}
      {!isRecommendation && space.recentActivity && (
        <div className="mb-4">
          <div className="profile-caption text-secondary">
            📊 {space.recentActivity.author} {space.recentActivity.type === 'post' ? 'posted' : space.recentActivity.type === 'poll' ? 'created poll' : 'announced'}
          </div>
          <div className="profile-fine text-tertiary mt-1 line-clamp-2">
            {space.recentActivity.content}
          </div>
        </div>
      )}
      
      {/* Upcoming Events */}
      {!isRecommendation && space.upcomingEvents && space.upcomingEvents.count > 0 && (
        <div className="flex items-center gap-1 mb-3">
          <Calendar size={12} className="text-campus-blue" />
          <span className="profile-fine text-campus-blue">
            ⚡ {space.upcomingEvents.count} event{space.upcomingEvents.count > 1 ? 's' : ''} this week
          </span>
        </div>
      )}
      
      {/* Mutual Friends (for recommendations) */}
      {isRecommendation && space.mutualFriends && space.mutualFriends.length > 0 && (
        <div className="social-proof mb-3">
          <span className="social-count">{space.mutualFriends.length}</span>
          <span> mutual connection{space.mutualFriends.length > 1 ? 's' : ''}</span>
        </div>
      )}
      
      {/* Join Button (for recommendations) */}
      {isRecommendation && (
        <ButtonEnhanced
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onJoinSpace?.(space.id);
          }}
          className="social-action-button w-full"
        >
          <UserPlus size={14} />
          Join Space
        </ButtonEnhanced>
      )}
    </motion.div>
  );

  return (
    <motion.div 
      className={cn("social-profile-card", butterClasses.card, className)} 
      style={{ gridArea: 'spaces' }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Users size={20} className="text-[var(--hive-text-inverse)]" />
          </div>
          <div>
            <h3 className="profile-heading text-primary">
              👥 YOUR COMMUNITIES
            </h3>
            <div className="profile-caption text-secondary">
              {spaces.length} spaces joined
            </div>
          </div>
        </div>
        <ButtonEnhanced
          variant="ghost"
          size="sm"
          onClick={onExploreSpaces}
          className="text-tertiary hover:text-primary"
        >
          <Search size={16} />
        </ButtonEnhanced>
      </div>
      
      {/* Toggle View */}
      <div className="flex gap-1 mb-6 p-1 bg-white/5 rounded-lg">
        <button
          onClick={() => setShowRecommendations(false)}
          className={cn(
            "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
            !showRecommendations
              ? "bg-white/10 text-primary border border-white/20"
              : "text-secondary hover:text-primary"
          )}
        >
          Your Spaces
        </button>
        <button
          onClick={() => setShowRecommendations(true)}
          className={cn(
            "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
            showRecommendations
              ? "bg-white/10 text-primary border border-white/20"
              : "text-secondary hover:text-primary"
          )}
        >
          Discover
        </button>
      </div>
      
      {/* Content */}
      <div className="space-y-4 mb-8 max-h-80 overflow-y-auto">
        {showRecommendations ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
          >
            {recommendations.length === 0 ? (
              <motion.div 
                className="text-center py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Users size={32} className="text-tertiary mx-auto mb-3 opacity-50" />
                <p className="profile-body text-tertiary mb-4">
                  No new recommendations
                </p>
                <motion.button
                  onClick={onExploreSpaces}
                  className={cn("social-action-button secondary", butterClasses.button)}
                >
                  <Search size={16} />
                  Explore Spaces
                </motion.button>
              </motion.div>
            ) : (
              recommendations.map((space, index) => (
                <motion.div
                  key={space.id}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.98 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
                  }}
                  className={getStaggerClass(index)}
                >
                  <SpaceItem space={space} isRecommendation />
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
          >
            {spaces.length === 0 ? (
              <motion.div 
                className="text-center py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Users size={32} className="text-tertiary mx-auto mb-3 opacity-50" />
                <p className="profile-body text-tertiary mb-4">
                  You haven't joined any spaces yet
                </p>
                <motion.button
                  onClick={onExploreSpaces}
                  className={cn("social-action-button", butterClasses.button)}
                >
                  <Search size={16} />
                  Find Your People
                </motion.button>
              </motion.div>
            ) : (
              spaces
                .sort((a, b) => {
                  // Sort by unread count first, then by recent activity
                  if (a.unreadCount && !b.unreadCount) return -1;
                  if (!a.unreadCount && b.unreadCount) return 1;
                  return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
                })
                .map((space, index) => (
                  <motion.div
                    key={space.id}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1 }
                    }}
                    className={getStaggerClass(index)}
                  >
                    <SpaceItem space={space} />
                  </motion.div>
                ))
            )}
          </motion.div>
        )}
      </div>
      
      {/* Quick Create */}
      {!showRecommendations && (
        <motion.div 
          className="flex items-center gap-3 p-4 rounded-xl border border-dashed border-white/20 hover:border-white/40 cursor-pointer transition-all group"
          whileHover={{ scale: 1.005, borderColor: 'rgba(255, 255, 255, 0.4)', transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
          whileTap={{ scale: 0.995, transition: { duration: 0.2 } }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={onCreateSpace}
        >
          <motion.div 
            className="w-8 h-8 rounded-lg border border-dashed border-white/30 group-hover:border-white/50 flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Plus size={16} className="text-tertiary group-hover:text-primary" />
          </motion.div>
          <div className="flex-1 profile-caption text-tertiary group-hover:text-primary cursor-pointer">
            ➕ Find your people...
            <div className="profile-fine text-tertiary group-hover:text-secondary mt-1">
              Based on your interests
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Action Buttons */}
      <motion.div 
        className="flex gap-3 mt-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <ButtonEnhanced
            onClick={onExploreSpaces}
            className={cn("social-action-button w-full", butterClasses.button)}
          >
            <Search size={16} />
            Explore
          </ButtonEnhanced>
        </motion.div>
        <motion.div whileHover={{ scale: 1.01, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }} whileTap={{ scale: 0.99, transition: { duration: 0.2 } }}>
          <ButtonEnhanced
            onClick={onCreateSpace}
            className={cn("social-action-button secondary", butterClasses.button)}
            variant="secondary"
          >
            <Plus size={16} />
            Create Space
          </ButtonEnhanced>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SocialSpacesCard;