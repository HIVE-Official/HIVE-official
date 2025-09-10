'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChevronDown,
  Heart,
  MessageCircle,
  Share2,
  Pin,
  MoreHorizontal,
  AlertCircle,
  CheckCircle2,
  Timer,
  Car,
  Coffee,
  BookOpen,
  Crown,
  Activity,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Space } from '../../types';

// Post types aligned with PRD requirements
export type HivePostType = 
  | 'discussion'    // Basic text discussion
  | 'question'      // Question with answers
  | 'poll'          // Simple poll
  | 'announcement'  // Leader announcements
  | 'link'          // Link sharing
  | 'event'         // Event coordination
  | 'study_session' // Study group coordination
  | 'food_run'      // Food order coordination  
  | 'ride_share'    // Ride sharing coordination
  | 'meetup';       // General meetup coordination

export interface HivePostAuthor {
  id: string;
  name: string;
  avatar?: string;
  role?: 'owner' | 'admin' | 'moderator' | 'member';
}

export interface HivePostReaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface CoordinationResponse {
  userId: string;
  response: 'yes' | 'no' | 'maybe';
  details?: string;
  timestamp: Date;
}

export interface HiveSpacePost {
  id: string;
  type: HivePostType;
  content: string;
  author: HivePostAuthor;
  timestamp: Date;
  reactions?: HivePostReaction[];
  commentCount?: number;
  isPinned?: boolean;
  
  // Coordination-specific fields
  coordinationType?: 'study_session' | 'food_run' | 'ride_share' | 'meetup';
  coordinationData?: {
    title: string;
    description?: string;
    location?: string;
    datetime?: Date;
    capacity?: number;
    deadline?: Date;
    responses?: CoordinationResponse[];
    status?: 'open' | 'full' | 'closed' | 'completed';
    organizer: string;
  };
  
  // Poll-specific fields
  pollData?: {
    question: string;
    options: Array<{
      id: string;
      text: string;
      votes: number;
      userVoted: boolean;
    }>;
    allowMultiple?: boolean;
    endsAt?: Date;
  };
}

export interface HivePostsSurfaceProps {
  space: Space;
  posts?: HiveSpacePost[];  // Accept posts from parent
  isLoading?: boolean;       // Loading state
  mode?: 'view' | 'edit';
  maxPosts?: number;
  showFilters?: boolean;
  canPost?: boolean;
  canModerate?: boolean;
  leaderMode?: 'configure' | 'moderate' | 'insights' | null;
  
  // Live activity features
  showLiveActivity?: boolean;
  liveActivityCount?: number;
  currentUserId?: string;
  
  // Event handlers
  onCreatePost?: (type: HivePostType) => void;
  onCreateComment?: (postId: string, content: string, parentCommentId?: string) => Promise<any>;
  onLoadComments?: (postId: string) => Promise<any[]>;
  onCoordinationResponse?: (postId: string, response: CoordinationResponse) => void;
  onUpdateCoordinationStatus?: (postId: string, status: 'open' | 'full' | 'closed' | 'completed') => void;
  
  // Custom post renderer
  PostRenderer?: React.ComponentType<{
    post: HiveSpacePost;
    spaceId: string;
    currentUserId?: string;
    canModerate?: boolean;
    onReaction?: (postId: string, emoji: string) => void;
    onShare?: (postId: string) => void;
    onDelete?: (postId: string) => void;
  }>;
  onReaction?: (postId: string, emoji: string) => void;
  onShare?: (postId: string) => void;
  onDelete?: (postId: string) => void;
}

// Removed mock data - using real posts only
/* const mockPosts: HiveSpacePost[] = [
  {
    id: '1',
    type: 'study_session',
    content: 'Anyone want to study for the midterm tomorrow? Library group room 204.',
    author: {
      id: 'user1',
      name: 'Sarah Chen',
      role: 'member'
    },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    coordinationType: 'study_session',
    coordinationData: {
      title: 'CS 220 Midterm Study Session',
      description: 'Review data structures and algorithms',
      location: 'Library Group Room 204',
      datetime: new Date(Date.now() + 22 * 60 * 60 * 1000), // Tomorrow
      capacity: 6,
      responses: [
        { userId: 'user2', response: 'yes', timestamp: new Date() },
        { userId: 'user3', response: 'maybe', timestamp: new Date() },
      ],
      status: 'open',
      organizer: 'user1'
    },
    reactions: [
      { emoji: '📚', count: 3, userReacted: true },
      { emoji: '👍', count: 2, userReacted: false }
    ],
    commentCount: 2
  },
  {
    id: '2',
    type: 'food_run',
    content: 'Chipotle run in 30 minutes! Drop your orders in the comments.',
    author: {
      id: 'user2',
      name: 'Alex Rodriguez',
      role: 'member'
    },
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    coordinationType: 'food_run',
    coordinationData: {
      title: 'Chipotle Run',
      description: 'Leaving from dorm lobby',
      location: 'Chipotle on Main St',
      datetime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      deadline: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes from now
      responses: [
        { userId: 'user4', response: 'yes', details: 'Burrito bowl, chicken, brown rice', timestamp: new Date() },
        { userId: 'user5', response: 'yes', details: 'Burrito, steak, white rice', timestamp: new Date() },
      ],
      status: 'open',
      organizer: 'user2'
    },
    reactions: [
      { emoji: '🌯', count: 5, userReacted: false },
      { emoji: '🔥', count: 2, userReacted: true }
    ]
  },
  {
    id: '3',
    type: 'announcement',
    content: 'Reminder: Floor meeting tonight at 8 PM in the common room. We\'ll discuss the upcoming formal and new quiet hours policy.',
    author: {
      id: 'user6',
      name: 'Jordan Martinez',
      role: 'admin'
    },
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isPinned: true,
    reactions: [
      { emoji: '👍', count: 8, userReacted: true },
      { emoji: '📝', count: 3, userReacted: false }
    ],
    commentCount: 5
  }
]; */

export const HivePostsSurface: React.FC<HivePostsSurfaceProps> = React.memo(({
  space,
  posts: propsPosts,
  isLoading = false,
  mode = 'view',
  maxPosts,
  showFilters = true,
  canPost = false,
  canModerate = false,
  leaderMode,
  showLiveActivity = false,
  liveActivityCount = 0,
  currentUserId,
  onCreatePost,
  onCoordinationResponse,
  onUpdateCoordinationStatus,
  PostRenderer,
  onReaction,
  onShare,
  onDelete
}) => {
  const [filter, setFilter] = useState<'all' | 'coordination' | 'discussion'>('all');
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const filteredPosts = useMemo(() => {
    // Use real posts from props only - no mock data
    let posts = propsPosts || [];
    
    if (filter === 'coordination') {
      posts = posts.filter(post => ['study_session', 'food_run', 'ride_share', 'meetup'].includes(post.type));
    } else if (filter === 'discussion') {
      posts = posts.filter(post => ['discussion', 'question', 'announcement'].includes(post.type));
    }
    
    if (maxPosts) {
      posts = posts.slice(0, maxPosts);
    }
    
    return posts;
  }, [filter, maxPosts, propsPosts]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--hive-brand-primary)]" />
      </div>
    );
  }

  const getPostIcon = (type: HivePostType) => {
    switch (type) {
      case 'study_session': return <BookOpen className="h-4 w-4" />;
      case 'food_run': return <Coffee className="h-4 w-4" />;
      case 'ride_share': return <Car className="h-4 w-4" />;
      case 'meetup': return <Users className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'announcement': return <AlertCircle className="h-4 w-4" />;
      case 'poll': return <CheckCircle2 className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getCoordinationStatusColor = (status?: string) => {
    switch (status) {
      case 'open': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'full': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'closed': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-green-400 bg-green-400/10 border-green-400/20';
    }
  };

  const formatTimeRemaining = (date: Date) => {
    const diff = date.getTime() - Date.now();
    if (diff <= 0) return 'Ended';
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d remaining`;
    if (hours > 0) return `${hours}h remaining`;
    return `${minutes}m remaining`;
  };

  const formatTimeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  };

  const postTypes: Array<{ type: HivePostType; label: string; icon: React.ReactNode; description: string }> = [
    { type: 'discussion', label: 'Discussion', icon: <MessageSquare className="h-4 w-4" />, description: 'Start a conversation' },
    { type: 'question', label: 'Question', icon: <AlertCircle className="h-4 w-4" />, description: 'Ask for help' },
    { type: 'study_session', label: 'Study Session', icon: <BookOpen className="h-4 w-4" />, description: 'Coordinate studying' },
    { type: 'food_run', label: 'Food Run', icon: <Coffee className="h-4 w-4" />, description: 'Order food together' },
    { type: 'ride_share', label: 'Ride Share', icon: <Car className="h-4 w-4" />, description: 'Share transportation' },
    { type: 'meetup', label: 'Meetup', icon: <Users className="h-4 w-4" />, description: 'Plan group activities' }
  ];

  return (
    <div className="space-y-4">
      {/* Header with Live Activity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
            <h3 className="font-semibold text-[var(--hive-text-inverse)]">
              {mode === 'view' ? 'Recent Posts' : 'Post Feed'}
            </h3>
          </div>
          
          {showLiveActivity && liveActivityCount > 0 && (
            <div className="flex items-center gap-2 px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400">{liveActivityCount} online</span>
            </div>
          )}
          
          {leaderMode === 'insights' && (
            <div className="flex items-center gap-2 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full">
              <TrendingUp className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-purple-400">Analytics Active</span>
            </div>
          )}
        </div>

        {canPost && (
          <div className="relative">
            <motion.button
              onClick={() => setShowCreateMenu(!showCreateMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 rounded-lg hover:bg-[var(--hive-brand-secondary)]/20 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-expanded={showCreateMenu}
              aria-haspopup="menu"
              aria-label="Create new post"
            >
              <Plus className="h-4 w-4" />
              Create Post
              <ChevronDown className={cn("h-3 w-3 transition-transform", showCreateMenu && "rotate-180")} />
            </motion.button>

            <AnimatePresence>
              {showCreateMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-64 bg-[var(--hive-background-primary)] border border-white/10 rounded-xl p-2 shadow-lg z-10"
                  role="menu"
                  aria-label="Post creation options"
                >
                  {postTypes.map((postType) => (
                    <button
                      key={postType.type}
                      onClick={() => {
                        onCreatePost?.(postType.type);
                        setShowCreateMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/5 rounded-lg transition-colors min-h-[44px]"
                      role="menuitem"
                      aria-label={`Create ${postType.label.toLowerCase()}: ${postType.description}`}
                    >
                      <div className="text-[var(--hive-brand-secondary)]">
                        {postType.icon}
                      </div>
                      <div>
                        <div className="font-medium text-[var(--hive-text-inverse)]">{postType.label}</div>
                        <div className="text-xs text-neutral-400">{postType.description}</div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'All Posts' },
            { id: 'coordination', label: 'Coordination' },
            { id: 'discussion', label: 'Discussion' }
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as any)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-colors",
                filter === filterOption.id
                  ? "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30"
                  : "bg-white/5 text-neutral-400 border border-white/10 hover:text-[var(--hive-text-inverse)]"
              )}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-white/5 rounded w-20"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                  <div className="h-4 bg-white/5 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          // Empty state
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-neutral-500 mx-auto mb-4" />
            <p className="text-neutral-400">No posts yet</p>
            {canPost && (
              <p className="text-neutral-500 text-sm mt-2">Be the first to share something!</p>
            )}
          </div>
        ) : (
          // Posts list
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              PostRenderer ? (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostRenderer
                    post={post}
                    spaceId={space.id}
                    currentUserId={currentUserId}
                    canModerate={canModerate}
                    onReaction={onReaction}
                    onShare={onShare}
                    onDelete={onDelete}
                  />
                </motion.div>
              ) : (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "bg-white/[0.02] border border-white/[0.06] rounded-xl p-4",
                post.isPinned && "border-[var(--hive-brand-secondary)]/30 bg-[var(--hive-brand-secondary)]/5",
                leaderMode === 'insights' && "border-purple-500/20 bg-purple-500/5"
              )}
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                    {post.author.avatar ? (
                      <img src={post.author.avatar} alt="" className="w-full h-full rounded-lg object-cover" />
                    ) : (
                      <span className="text-sm font-semibold text-[var(--hive-text-inverse)]">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--hive-text-inverse)]">{post.author.name}</span>
                      {post.author.role === 'admin' && <Crown className="h-3 w-3 text-[var(--hive-brand-secondary)]" />}
                      {post.isPinned && <Pin className="h-3 w-3 text-[var(--hive-brand-secondary)]" />}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      {getPostIcon(post.type)}
                      <span className="capitalize">{post.type.replace('_', ' ')}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                </div>

                <button className="text-neutral-400 hover:text-[var(--hive-text-inverse)] transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-3">
                <p className="text-[var(--hive-text-inverse)] leading-relaxed">{post.content}</p>
              </div>

              {/* Coordination Details */}
              {post.coordinationData && (
                <div className="mb-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-[var(--hive-text-inverse)]">{post.coordinationData.title}</h4>
                    <span className={cn(
                      "px-2 py-1 text-xs font-medium rounded-full border",
                      getCoordinationStatusColor(post.coordinationData.status)
                    )}>
                      {post.coordinationData.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-neutral-300">
                    {post.coordinationData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{post.coordinationData.location}</span>
                      </div>
                    )}
                    {post.coordinationData.datetime && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{post.coordinationData.datetime.toLocaleString()}</span>
                      </div>
                    )}
                    {post.coordinationData.deadline && (
                      <div className="flex items-center gap-2">
                        <Timer className="h-3 w-3" />
                        <span className="text-yellow-400">{formatTimeRemaining(post.coordinationData.deadline)}</span>
                      </div>
                    )}
                  </div>

                  {/* Response Summary */}
                  {post.coordinationData.responses && post.coordinationData.responses.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-green-400">
                          {post.coordinationData.responses.filter(r => r.response === 'yes').length} joining
                        </span>
                        <span className="text-yellow-400">
                          {post.coordinationData.responses.filter(r => r.response === 'maybe').length} maybe
                        </span>
                        {post.coordinationData.capacity && (
                          <span className="text-neutral-400">
                            {post.coordinationData.capacity - post.coordinationData.responses.filter(r => r.response === 'yes').length} spots left
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick Response Buttons */}
                  {post.coordinationData.status === 'open' && currentUserId && (
                    <div className="mt-3 flex items-center gap-2">
                      {['yes', 'maybe', 'no'].map((response) => (
                        <button
                          key={response}
                          onClick={() => onCoordinationResponse?.(post.id, {
                            userId: currentUserId,
                            response: response as 'yes' | 'maybe' | 'no',
                            timestamp: new Date()
                          })}
                          className={cn(
                            "px-3 py-1 text-xs rounded-full border transition-colors",
                            response === 'yes' && "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20",
                            response === 'maybe' && "bg-yellow-500/10 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20", 
                            response === 'no' && "bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20"
                          )}
                        >
                          {response === 'yes' && '✓ I\'m in'}
                          {response === 'maybe' && '? Maybe'}
                          {response === 'no' && '✗ Can\'t make it'}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-4">
                  {post.reactions && post.reactions.map((reaction, idx) => (
                    <button
                      key={idx}
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-colors",
                        reaction.userReacted 
                          ? "bg-[var(--hive-brand-secondary)]/20 border border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]"
                          : "hover:bg-white/5 text-neutral-400"
                      )}
                    >
                      <span>{reaction.emoji}</span>
                      <span>{reaction.count}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-neutral-400">
                  {post.commentCount && post.commentCount > 0 && (
                    <button className="flex items-center gap-1 hover:text-[var(--hive-text-inverse)] transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">{post.commentCount}</span>
                    </button>
                  )}
                  <button className="hover:text-[var(--hive-text-inverse)] transition-colors">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
              )
          ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
});

HivePostsSurface.displayName = 'HivePostsSurface';

export default HivePostsSurface;