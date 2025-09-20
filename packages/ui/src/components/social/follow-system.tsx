/**
 * HIVE Follow System
 * Complete follow/unfollow functionality for users and spaces
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '../../atomic/atoms/button';
import { Avatar } from '../index';
import { HiveBadge as Badge } from '../index';
import { 
  UserPlus, 
  UserMinus, 
  Users, 
  Bell,
  BellOff,
  Star,
  MapPin,
  Calendar,
  BookOpen,
  Settings,
  MoreHorizontal,
  Check,
  Plus,
  X,
  Search,
  Filter,
  UserCheck,
  Eye,
  EyeOff,
  ChevronDown,
  Heart,
  MessageCircle,
  Share
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FollowableUser {
  id: string;
  name: string;
  handle: string;
  avatar?: string;
  bio?: string;
  location?: string;
  school?: string;
  major?: string;
  year?: string;
  isVerified?: boolean;
  followersCount: number;
  followingCount: number;
  spacesCount: number;
  toolsCount: number;
  isFollowing?: boolean;
  isFollowedBy?: boolean;
  hasNotifications?: boolean;
  mutualFollowers?: FollowableUser[];
  commonSpaces?: string[];
  lastActive?: string
}

export interface FollowableSpace {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  banner?: string;
  type: 'academic' | 'residential' | 'professional' | 'recreational' | 'project';
  membersCount: number;
  toolsCount: number;
  isFollowing?: boolean;
  hasNotifications?: boolean;
  visibility: 'public' | 'private' | 'invite_only';
  tags?: string[];
  recentActivity?: string;
  createdAt: string
}

interface FollowSystemProps {
  currentUserId: string;
  users?: FollowableUser[];
  spaces?: FollowableSpace[];
  onFollowUser?: (userId: string) => Promise<void>;
  onUnfollowUser?: (userId: string) => Promise<void>;
  onFollowSpace?: (spaceId: string) => Promise<void>;
  onUnfollowSpace?: (spaceId: string) => Promise<void>;
  onToggleUserNotifications?: (userId: string) => Promise<void>;
  onToggleSpaceNotifications?: (spaceId: string) => Promise<void>;
  onViewProfile?: (userId: string) => void;
  onViewSpace?: (spaceId: string) => void;
  isLoading?: boolean;
  enableFeatureFlag?: boolean
}

interface FollowButtonProps {
  isFollowing: boolean;
  isLoading?: boolean;
  onFollow: () => Promise<void>;
  onUnfollow: () => Promise<void>;
  variant?: 'default' | 'compact';
  showNotificationToggle?: boolean;
  hasNotifications?: boolean;
  onToggleNotifications?: () => Promise<void>
}

interface UserCardProps {
  user: FollowableUser;
  currentUserId: string;
  onFollow: (userId: string) => Promise<void>;
  onUnfollow: (userId: string) => Promise<void>;
  onToggleNotifications?: (userId: string) => Promise<void>;
  onViewProfile?: (userId: string) => void;
  isLoading?: boolean
}

interface SpaceCardProps {
  space: FollowableSpace;
  onFollow: (spaceId: string) => Promise<void>;
  onUnfollow: (spaceId: string) => Promise<void>;
  onToggleNotifications?: (spaceId: string) => Promise<void>;
  onViewSpace?: (spaceId: string) => void;
  isLoading?: boolean
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  isLoading = false,
  onFollow,
  onUnfollow,
  variant = 'default',
  showNotificationToggle = false,
  hasNotifications = false,
  onToggleNotifications
}) => {
  const [actionLoading, setActionLoading] = useState(false);

  const handleFollowAction = useCallback(async () => {
    if (actionLoading || isLoading) return;
    
    setActionLoading(true);
    try {
      if (isFollowing) {
        await onUnfollow()
      } else {
        await onFollow()
      }
    } finally {
      setActionLoading(false)
    }
  }, [isFollowing, onFollow, onUnfollow, actionLoading, isLoading]);

  const handleNotificationToggle = useCallback(async () => {
    if (!onToggleNotifications || actionLoading) return;
    
    setActionLoading(true);
    try {
      await onToggleNotifications()
    } finally {
      setActionLoading(false)
    }
  }, [onToggleNotifications, actionLoading]);

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1">
        <Button
          size="xs"
          variant={isFollowing ? "outline" : "default"}
          onClick={handleFollowAction}
          disabled={actionLoading || isLoading}
          className={`${isFollowing 
            ? 'border-[var(--hive-border-default)] text-[var(--hive-text-primary)] hover:border-red-500 hover:text-red-500 hover:bg-red-500/10' 
            : 'bg-[var(--hive-primary)] text-white hover:bg-[var(--hive-primary)]/90'
          }`}
        >
          {actionLoading ? (
            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
          ) : isFollowing ? (
            <UserCheck className="w-3 h-3" />
          ) : (
            <UserPlus className="w-3 h-3" />
          )}
        </Button>

        {showNotificationToggle && isFollowing && (
          <Button
            size="xs"
            variant="ghost"
            onClick={handleNotificationToggle}
            disabled={actionLoading}
            className={hasNotifications ? 'text-[var(--hive-primary)]' : 'text-[var(--hive-text-muted)]'}
          >
            {hasNotifications ? <Bell className="w-3 h-3" /> : <BellOff className="w-3 h-3" />}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isFollowing ? "outline" : "default"}
        onClick={handleFollowAction}
        disabled={actionLoading || isLoading}
        className={`flex items-center gap-2 ${isFollowing 
          ? 'border-[var(--hive-border-default)] text-[var(--hive-text-primary)] hover:border-red-500 hover:text-red-500 hover:bg-red-500/10' 
          : 'bg-[var(--hive-primary)] text-white hover:bg-[var(--hive-primary)]/90'
        }`}
      >
        {actionLoading ? (
          <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
        ) : isFollowing ? (
          <>
            <UserCheck className="w-4 h-4" />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            <span>Follow</span>
          </>
        )}
      </Button>

      {showNotificationToggle && isFollowing && (
        <Button
          variant="outline"
          onClick={handleNotificationToggle}
          disabled={actionLoading}
          className={`flex items-center gap-2 ${hasNotifications ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]' : ''}`}
        >
          {hasNotifications ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
          <span>{hasNotifications ? 'Notifications On' : 'Notifications Off'}</span>
        </Button>
      )}
    </div>
  )
};

const UserCard: React.FC<UserCardProps> = ({
  user,
  currentUserId,
  onFollow,
  onUnfollow,
  onToggleNotifications,
  onViewProfile,
  isLoading = false
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString()
  };

  const formatLastActive = (timestamp?: string) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString()
  };

  const isOwnProfile = user.id === currentUserId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl hover:bg-[var(--hive-background-secondary)]/50 transition-colors group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div 
          className="flex items-center space-x-3 cursor-pointer flex-1"
          onClick={() => onViewProfile?.(user.id)}
        >
          <Avatar
            src={user.avatar}
            initials={user.name.charAt(0)}
            size="lg"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-[var(--hive-text-primary)] truncate hover:text-[var(--hive-primary)] transition-colors">
                {user.name}
              </h3>
              {user.isVerified && (
                <div className="w-4 h-4 bg-[var(--hive-primary)] text-white rounded-full flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
            </div>
            <p className="text-sm text-[var(--hive-text-muted)]">@{user.handle}</p>
            {user.location && (
              <div className="flex items-center space-x-1 text-xs text-[var(--hive-text-muted)] mt-1">
                <MapPin className="w-3 h-3" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {!isOwnProfile && (
          <div className="flex items-center gap-2">
            <FollowButton
              isFollowing={user.isFollowing || false}
              onFollow={() => onFollow(user.id)}
              onUnfollow={() => onUnfollow(user.id)}
              variant="compact"
              showNotificationToggle
              hasNotifications={user.hasNotifications}
              onToggleNotifications={onToggleNotifications ? () => onToggleNotifications(user.id) : undefined}
              isLoading={isLoading}
            />

            <div className="relative">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setShowMenu(!showMenu)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="w-3 h-3" />
              </Button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]"
                  >
                    <button
                      onClick={() => {
                        onViewProfile?.(user.id);
                        setShowMenu(false)
          }}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                    >
                      <Eye className="w-3 h-3" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        // Handle message action
                        setShowMenu(false)
          }}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                    >
                      <MessageCircle className="w-3 h-3" />
                      Message
                    </button>
                    <button
                      onClick={() => {
                        // Handle share action
                        navigator.clipboard.writeText(`${window.location.origin}/profile/${user.handle}`);
                        setShowMenu(false)
          })}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                    >
                      <Share className="w-3 h-3" />
                      Share Profile
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Bio */}
      {user.bio && (
        <p className="text-sm text-[var(--hive-text-secondary)] mb-3 leading-relaxed">
          {user.bio}
        </p>
      )}

      {/* Academic Info */}
      {(user.school || user.major || user.year) && (
        <div className="flex flex-wrap gap-2 mb-3">
          {user.school && (
            <Badge size="sm" variant="secondary" className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {user.school}
            </Badge>
          )}
          {user.major && (
            <Badge size="sm" variant="secondary">
              {user.major}
            </Badge>
          )}
          {user.year && (
            <Badge size="sm" variant="secondary">
              {user.year}
            </Badge>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-[var(--hive-text-muted)]">
        <div className="flex items-center space-x-4">
          <span>{formatCount(user.followersCount)} followers</span>
          <span>{formatCount(user.followingCount)} following</span>
          <span>{formatCount(user.spacesCount)} spaces</span>
        </div>
        <span>Active {formatLastActive(user.lastActive)}</span>
      </div>

      {/* Mutual Connections */}
      {user.mutualFollowers && user.mutualFollowers.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[var(--hive-border-subtle)]">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {user.mutualFollowers.slice(0, 3).map((mutual, index) => (
                <Avatar
                  key={mutual.id}
                  src={mutual.avatar}
                  initials={mutual.name.charAt(0)}
                  size="xs"
                  className="border border-[var(--hive-background-elevated)]"
                />
              ))}
            </div>
            <span className="text-xs text-[var(--hive-text-muted)]">
              Followed by {user.mutualFollowers[0].name}
              {user.mutualFollowers.length > 1 && ` and ${user.mutualFollowers.length - 1} others you follow`}
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
};

const SpaceCard: React.FC<SpaceCardProps> = ({
  space,
  onFollow,
  onUnfollow,
  onToggleNotifications,
  onViewSpace,
  isLoading = false
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString()
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-blue-500';
      case 'residential': return 'bg-green-500';
      case 'professional': return 'bg-purple-500';
      case 'recreational': return 'bg-orange-500';
      case 'project': return 'bg-red-500';
      default: return 'bg-gray-500'
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'residential': return '🏠';
      case 'professional': return '💼';
      case 'recreational': return '🎮';
      case 'project': return '🛠️';
      default: return '📁'
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-xl hover:bg-[var(--hive-background-secondary)]/50 transition-colors group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div 
          className="flex items-center space-x-3 cursor-pointer flex-1"
          onClick={() => onViewSpace?.(space.id)}
        >
          <div className="relative">
            {space.avatar ? (
              <Avatar
                src={space.avatar}
                initials={space.name.charAt(0)}
                size="lg"
              />
            ) : (
              <div className={`w-12 h-12 ${getTypeColor(space.type)} rounded-xl flex items-center justify-center text-xl`}>
                {getTypeEmoji(space.type)}
              </div>
            )}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getTypeColor(space.type)} rounded-full flex items-center justify-center text-xs`}>
              {getTypeEmoji(space.type)}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-[var(--hive-text-primary)] truncate hover:text-[var(--hive-primary)] transition-colors">
                {space.name}
              </h3>
              {space.visibility === 'private' && (
                <div className="w-4 h-4 text-[var(--hive-text-muted)]">
                  <EyeOff className="w-3 h-3" />
                </div>
              )}
            </div>
            <Badge size="sm" variant="secondary" className="capitalize mt-1">
              {space.type}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <FollowButton
            isFollowing={space.isFollowing || false}
            onFollow={() => onFollow(space.id)}
            onUnfollow={() => onUnfollow(space.id)}
            variant="compact"
            showNotificationToggle
            hasNotifications={space.hasNotifications}
            onToggleNotifications={onToggleNotifications ? () => onToggleNotifications(space.id) : undefined}
            isLoading={isLoading}
          />

          <div className="relative">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setShowMenu(!showMenu)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreHorizontal className="w-3 h-3" />
            </Button>

            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute top-full right-0 mt-1 bg-[var(--hive-background-elevated)] border border-[var(--hive-border-default)] rounded-lg shadow-lg py-1 z-20 min-w-[140px]"
                >
                  <button
                    onClick={() => {
                      onViewSpace?.(space.id);
                      setShowMenu(false)
          }}
                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                  >
                    <Eye className="w-3 h-3" />
                    View Space
                  </button>
                  <button
                    onClick={() => {
                      // Handle share action
                      navigator.clipboard.writeText(`${window.location.origin}/spaces/${space.id}`);
                      setShowMenu(false)
          })}
                    className="w-full px-3 py-1.5 text-left text-sm hover:bg-[var(--hive-background-secondary)] flex items-center gap-2"
                  >
                    <Share className="w-3 h-3" />
                    Share Space
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--hive-text-secondary)] mb-3 leading-relaxed">
        {space.description}
      </p>

      {/* Tags */}
      {space.tags && space.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {space.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} size="xs" variant="outline">
              #{tag}
            </Badge>
          ))}
          {space.tags.length > 3 && (
            <Badge size="xs" variant="outline">
              +{space.tags.length - 3} more
            </Badge>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-[var(--hive-text-muted)]">
        <div className="flex items-center space-x-4">
          <span>{formatCount(space.membersCount)} members</span>
          <span>{formatCount(space.toolsCount)} tools</span>
        </div>
        <span className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{new Date(space.createdAt).toLocaleDateString()}</span>
        </span>
      </div>

      {/* Recent Activity */}
      {space.recentActivity && (
        <div className="mt-3 pt-3 border-t border-[var(--hive-border-subtle)]">
          <p className="text-xs text-[var(--hive-text-muted)]">
            <Heart className="w-3 h-3 inline mr-1" />
            {space.recentActivity}
          </p>
        </div>
      )}
    </motion.div>
  )
};

export const FollowSystem: React.FC<FollowSystemProps> = ({
  currentUserId,
  users = [],
  spaces = [],
  onFollowUser,
  onUnfollowUser,
  onFollowSpace,
  onUnfollowSpace,
  onToggleUserNotifications,
  onToggleSpaceNotifications,
  onViewProfile,
  onViewSpace,
  isLoading = false,
  enableFeatureFlag = true
}) => {
  const [activeTab, setActiveTab] = useState<'users' | 'spaces'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'following' | 'suggested'>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) return null;

  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.school?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.major?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply filter
    switch (filter) {
      case 'following':
        return filtered.filter(user => user.isFollowing);
      case 'suggested':
        return filtered.filter(user => !user.isFollowing && user.mutualFollowers && user.mutualFollowers.length > 0);
      default:
        return filtered
    }
  }, [users, searchQuery, filter]);

  const filteredSpaces = useMemo(() => {
    let filtered = spaces;

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(space => 
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Apply filter
    switch (filter) {
      case 'following':
        return filtered.filter(space => space.isFollowing);
      case 'suggested':
        return filtered.filter(space => !space.isFollowing && space.visibility === 'public');
      default:
        return filtered
    }
  }, [spaces, searchQuery, filter]);

  const getTabCount = (tab: 'users' | 'spaces') => {
    if (tab === 'users') {
      switch (filter) {
        case 'following': return users.filter(u => u.isFollowing).length;
        case 'suggested': return users.filter(u => !u.isFollowing && u.mutualFollowers && u.mutualFollowers.length > 0).length;
        default: return users.length
      }
    } else {
      switch (filter) {
        case 'following': return spaces.filter(s => s.isFollowing).length;
        case 'suggested': return spaces.filter(s => !s.isFollowing && s.visibility === 'public').length;
        default: return spaces.length
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">Discover & Follow</h2>
          <p className="text-[var(--hive-text-secondary)] mt-1">Connect with people and spaces in your community</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--hive-text-muted)]" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-primary)]"
          />
        </div>
        
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Filter Options */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
              {[
                { key: 'all', label: 'All' },
                { key: 'following', label: 'Following' },
                { key: 'suggested', label: 'Suggested' }
              ].map(({ key, label })} => (
                <Button
                  key={key}
                  variant={filter === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(key as any)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'users'
              ? 'bg-[var(--hive-primary)] text-white'
              : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>People</span>
          <Badge size="xs" className={activeTab === 'users' ? 'bg-white/20' : 'bg-[var(--hive-background-primary)]'}>
            {getTabCount('users')}
          </Badge>
        </button>
        <button
          onClick={() => setActiveTab('spaces')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'spaces'
              ? 'bg-[var(--hive-primary)] text-white'
              : 'text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)]'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Spaces</span>
          <Badge size="xs" className={activeTab === 'spaces' ? 'bg-white/20' : 'bg-[var(--hive-background-primary)]'}>
            {getTabCount('spaces')}
          </Badge>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'users' ? (
          filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
                {searchQuery ? 'No users found' : 'No users to show'}
              </h3>
              <p className="text-[var(--hive-text-muted)]">
                {searchQuery 
                  ? 'Try adjusting your search or filters' 
                  : 'Check back later for new people to connect with'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  currentUserId={currentUserId}
                  onFollow={onFollowUser || (() => Promise.resolve())}
                  onUnfollow={onUnfollowUser || (() => Promise.resolve())}
                  onToggleNotifications={onToggleUserNotifications}
                  onViewProfile={onViewProfile}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )
        ) : (
          filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-[var(--hive-text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
                {searchQuery ? 'No spaces found' : 'No spaces to show'}
              </h3>
              <p className="text-[var(--hive-text-muted)]">
                {searchQuery 
                  ? 'Try adjusting your search or filters' 
                  : 'Check back later for new spaces to join'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onFollow={onFollowSpace || (() => Promise.resolve())}
                  onUnfollow={onUnfollowSpace || (() => Promise.resolve())}
                  onToggleNotifications={onToggleSpaceNotifications}
                  onViewSpace={onViewSpace}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
};