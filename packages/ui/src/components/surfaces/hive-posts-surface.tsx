"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { liquidMetal, motionDurations } from '../../motion/hive-motion-system';
import { type Space } from '@hive/core';
import { 
  MessageSquare,
  Plus,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Pin,
  Flag,
  Edit3,
  Trash2,
  Clock,
  Users,
  TrendingUp,
  Eye,
  Heart,
  Bookmark,
  Reply,
  Send,
  Image as ImageIcon,
  BarChart3 as Poll,
  Link as LinkIcon,
  Calendar,
  ChevronUp,
  ChevronDown,
  Filter,
  SortDesc,
  Crown,
  Sparkles
} from 'lucide-react';

// HIVE Posts Surface - Community Discussion & Threads
// Rich posting system with threads, polls, and engagement

const hivePostsSurfaceVariants = cva(
  "relative w-full",
  {
    variants: {
      mode: {
        view: "",
        edit: "ring-2 ring-[var(--hive-status-info)]/30 ring-offset-2 ring-offset-[var(--hive-background-primary)]/20",
        builder: "ring-2 ring-[var(--hive-status-info)]/30 ring-offset-2 ring-offset-[var(--hive-background-primary)]/20",
      }
    },
    defaultVariants: {
      mode: "view",
    },
  }
);

// Post types with HIVE design patterns
const postTypes = {
  discussion: {
    icon: MessageSquare,
    label: 'Discussion',
    color: 'text-[var(--hive-status-info)]',
    description: 'Start a conversation'
  },
  question: {
    icon: MessageCircle,
    label: 'Question',
    color: 'text-[var(--hive-status-success)]',
    description: 'Ask the community'
  },
  poll: {
    icon: Poll,
    label: 'Poll',
    color: 'text-[var(--hive-brand-accent)]',
    description: 'Gather opinions'
  },
  announcement: {
    icon: Pin,
    label: 'Announcement',
    color: 'text-[var(--hive-brand-primary)]',
    description: 'Important updates'
  },
  link: {
    icon: LinkIcon,
    label: 'Link Share',
    color: 'text-[var(--hive-brand-accent)]',
    description: 'Share a resource'
  },
} as const;

export interface Post {
  id: string;
  type: keyof typeof postTypes;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  replies: number;
  views: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
  imageUrls?: string[];
  pollOptions?: Array<{ id: string; text: string; votes: number; }>;
  linkPreview?: {
    title: string;
    description: string;
    imageUrl?: string;
    domain: string;
  };
}

export interface HivePostsSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hivePostsSurfaceVariants> {
  space: Space;
  posts?: Post[];
  isBuilder?: boolean;
  canPost?: boolean;
  canModerate?: boolean;
  onCreatePost?: (type: keyof typeof postTypes) => void;
  onLikePost?: (postId: string) => void;
  onReplyToPost?: (postId: string) => void;
  onSharePost?: (postId: string) => void;
  onPinPost?: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onViewPost?: (postId: string) => void;
  sortBy?: 'recent' | 'popular' | 'trending';
  showFilters?: boolean;
  maxPosts?: number;
}

export const HivePostsSurface = React.forwardRef<HTMLDivElement, HivePostsSurfaceProps>(
  ({ 
    className,
    mode,
    space,
    posts = [],
    isBuilder = false,
    canPost = true,
    canModerate = false,
    onCreatePost,
    onLikePost,
    onReplyToPost,
    onSharePost,
    onPinPost,
    onDeletePost,
    onViewPost,
    sortBy = 'recent',
    showFilters = true,
    maxPosts = 10,
    ...props 
  }, ref) => {
    
    const [hoveredPost, setHoveredPost] = useState<string | null>(null);
    const [showCreateMenu, setShowCreateMenu] = useState(false);
    const [currentSort, setCurrentSort] = useState(sortBy);
    const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
    
    // Sort posts
    const sortedPosts = posts
      .sort((a, b) => {
        // Pinned posts always first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        
        switch (currentSort) {
          case 'popular':
            return (b.likes + b.replies) - (a.likes + a.replies);
          case 'trending':
            // Mock trending algorithm - consider recent engagement
            const aScore = a.likes + a.replies + (a.views / 10);
            const bScore = b.likes + b.replies + (b.views / 10);
            return bScore - aScore;
          case 'recent':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      })
      .slice(0, maxPosts);
    
    const handleCreatePost = useCallback((type: keyof typeof postTypes) => {
      onCreatePost?.(type);
      setShowCreateMenu(false);
    }, [onCreatePost]);
    
    const togglePostExpansion = useCallback((postId: string) => {
      setExpandedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
    }, []);
    
    // Empty state
    if (posts.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(hivePostsSurfaceVariants({ mode, className }))}
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
              <MessageSquare className="w-8 h-8 text-blue-400" />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-3">Start the Conversation</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm max-w-md mx-auto mb-8 leading-relaxed">
              This Space is ready for discussions! Share questions, ideas, and connect with the community through posts and threads.
            </p>
            
            {canPost && (
              <motion.button
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium"
                onClick={() => setShowCreateMenu(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                Create First Post
              </motion.button>
            )}
          </motion.div>
        </div>
      );
    }
    
    return (
      <div
        ref={ref}
        className={cn(hivePostsSurfaceVariants({ mode, className }))}
        {...props}
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Posts</h3>
            <span className="text-sm text-[var(--hive-text-secondary)]">{posts.length} discussions</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Sort Options */}
            {showFilters && (
              <select
                value={currentSort}
                onChange={(e) => setCurrentSort(e.target.value as any)}
                className="bg-[var(--hive-background-primary)]/20 text-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--hive-status-info)]/50"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
            )}
            
            {/* Create Post Button */}
            {canPost && (
              <div className="relative">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 rounded-xl hover:bg-[var(--hive-status-info)]/30 transition-all duration-200 font-medium"
                  onClick={() => setShowCreateMenu(!showCreateMenu)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Post</span>
                </motion.button>
                
                {/* Create Menu */}
                <AnimatePresence>
                  {showCreateMenu && (
                    <motion.div
                      className="absolute top-full right-0 mt-2 w-64 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden z-20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: motionDurations.quick }}
                    >
                      <div className="p-2">
                        {Object.entries(postTypes).map(([type, config]) => {
                          const Icon = config.icon;
                          return (
                            <motion.button
                              key={type}
                              className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-white/5 transition-all duration-200"
                              onClick={() => handleCreatePost(type as keyof typeof postTypes)}
                              whileHover={{ x: 4 }}
                            >
                              <Icon className={cn("w-5 h-5", config.color)} />
                              <div>
                                <div className="text-sm font-medium text-white">{config.label}</div>
                                <div className="text-xs text-gray-400">{config.description}</div>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        
        {/* Posts Feed */}
        <div className="space-y-4">
          {sortedPosts.map((post, index) => {
            const typeConfig = postTypes[post.type];
            const TypeIcon = typeConfig.icon;
            const isHovered = hoveredPost === post.id;
            const isExpanded = expandedPosts.has(post.id);
            
            return (
              <motion.article
                key={post.id}
                className={cn(
                  "relative group bg-black/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden transition-all duration-200",
                  isHovered && "border-white/10",
                  post.isPinned && "ring-1 ring-yellow-500/30 bg-yellow-500/5",
                  mode === 'edit' && "hover:ring-2 hover:ring-blue-500/30"
                )}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                {/* Pinned Indicator */}
                {post.isPinned && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500/50 to-yellow-500/20"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.05 + 0.2 }}
                  />
                )}
                
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Author Avatar */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-600 overflow-hidden">
                        {post.authorAvatar ? (
                          <img src={post.authorAvatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {post.authorName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white text-sm">{post.authorName}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <time className="text-xs text-gray-400">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </time>
                          {post.isPinned && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <div className="flex items-center gap-1 text-xs text-yellow-400">
                                <Pin className="w-3 h-3" />
                                <span>Pinned</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <TypeIcon className={cn("w-4 h-4", typeConfig.color)} />
                          <span className="text-xs text-gray-400">{typeConfig.label}</span>
                          {post.tags.length > 0 && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <div className="flex items-center gap-1">
                                {post.tags.slice(0, 2).map((tag, i) => (
                                  <span key={i} className="text-xs bg-white/5 px-2 py-0.5 rounded text-gray-300">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Post Actions */}
                    <div className="flex items-center gap-1">
                      {canModerate && (
                        <AnimatePresence>
                          {(isHovered || mode === 'edit') && (
                            <motion.div
                              className="flex items-center gap-1"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                            >
                              <motion.button
                                className="p-1.5 text-gray-400 hover:text-yellow-400 rounded-lg hover:bg-yellow-500/10 transition-all duration-200"
                                onClick={() => onPinPost?.(post.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Pin className="w-3.5 h-3.5" />
                              </motion.button>
                              <motion.button
                                className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                                onClick={() => onDeletePost?.(post.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </motion.button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                      
                      <motion.button
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-white text-base leading-snug">
                      {post.title}
                    </h4>
                    
                    <div className={cn(
                      "text-sm text-gray-300 leading-relaxed",
                      !isExpanded && "line-clamp-3"
                    )}>
                      {post.content}
                    </div>
                    
                    {post.content.length > 200 && (
                      <motion.button
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={() => togglePostExpansion(post.id)}
                        whileHover={{ scale: 1.02 }}
                      >
                        {isExpanded ? 'Show less' : 'Read more'}
                      </motion.button>
                    )}
                    
                    {/* Poll Options */}
                    {post.pollOptions && (
                      <div className="space-y-2">
                        {post.pollOptions.map((option, i) => (
                          <motion.div
                            key={option.id}
                            className="relative p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all duration-200"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white">{option.text}</span>
                              <span className="text-xs text-gray-400">{option.votes} votes</span>
                            </div>
                            <div 
                              className="absolute bottom-0 left-0 h-0.5 bg-purple-500/50 rounded-full"
                              style={{ 
                                width: `${(option.votes / Math.max(...post.pollOptions!.map(o => o.votes))) * 100}%` 
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    )}
                    
                    {/* Link Preview */}
                    {post.linkPreview && (
                      <motion.div
                        className="p-3 bg-white/5 rounded-lg border border-white/5"
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex gap-3">
                          {post.linkPreview.imageUrl && (
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                              <img 
                                src={post.linkPreview.imageUrl} 
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium text-white truncate">
                              {post.linkPreview.title}
                            </h5>
                            <p className="text-xs text-gray-400 line-clamp-2 mt-1">
                              {post.linkPreview.description}
                            </p>
                            <span className="text-xs text-blue-400 mt-1 block">
                              {post.linkPreview.domain}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Engagement Bar */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <motion.button
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 transition-colors"
                        onClick={() => onLikePost?.(post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-400 transition-colors"
                        onClick={() => onReplyToPost?.(post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Reply className="w-4 h-4" />
                        <span>{post.replies}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-green-400 transition-colors"
                        onClick={() => onSharePost?.(post.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </motion.button>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views}</span>
                      </div>
                      
                      <motion.button
                        className="p-1 hover:text-yellow-400 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </div>
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
                  Posts drive community engagement. Enable posting Tools to let members share ideas, ask questions, and build connections.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  }
);

HivePostsSurface.displayName = "HivePostsSurface";

export { hivePostsSurfaceVariants, postTypes };