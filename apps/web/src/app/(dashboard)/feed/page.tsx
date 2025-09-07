"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar, 
  Zap,
  Heart,
  Bell,
  Settings,
  Globe,
  Loader2,
  RefreshCw,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Search,
  Filter,
  ChevronDown,
  Sparkles,
  Hash,
  Image as ImageIcon,
  Link2,
  Smile,
  MapPin,
  PlusCircle,
  Eye,
  Clock,
  ArrowUp,
  UserPlus,
  Award,
  Target,
  Flame
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useFirebaseFeed } from '@/hooks/use-firebase-feed';
import { RitualsStrip } from '@/components/feed/rituals-strip';

// Feed stats component
function FeedStats() {
  const stats = [
    { label: 'Active Now', value: '2.3k', icon: Users, color: 'text-green-400', bgColor: 'bg-green-400/10' },
    { label: 'Today\'s Posts', value: '186', icon: Activity, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    { label: 'Tools Shared', value: '42', icon: Zap, color: 'text-[#FFD700]', bgColor: 'bg-[#FFD700]/10' },
    { label: 'Events Today', value: '8', icon: Calendar, color: 'text-purple-400', bgColor: 'bg-purple-400/10' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-xl p-4 hover:bg-white/[0.05] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={cn("h-4 w-4", stat.color)} />
              <span className={cn("text-xs px-2 py-0.5 rounded-full", stat.bgColor, stat.color)}>
                Live
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Create post card component
function CreatePostCard({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0D0D0E] border border-white/[0.08] rounded-xl p-4 mb-6"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-[#FFD700]">JD</span>
        </div>
        
        <button
          onClick={onOpen}
          className="flex-1 text-left px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] rounded-lg text-gray-400 transition-all"
        >
          What's happening in your space?
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-all text-gray-400 hover:text-white">
            <ImageIcon className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-all text-gray-400 hover:text-white">
            <Link2 className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-white/[0.05] rounded-lg transition-all text-gray-400 hover:text-white">
            <Smile className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Trending sidebar component
function TrendingSidebar() {
  const trendingTopics = [
    { tag: 'hackathon2024', posts: 234, trend: '+12%' },
    { tag: 'midterms', posts: 189, trend: '+8%' },
    { tag: 'springbreak', posts: 156, trend: '+24%' },
    { tag: 'research', posts: 98, trend: '+5%' }
  ];

  const suggestedSpaces = [
    { name: 'AI Research Lab', members: 234, category: 'Academic' },
    { name: 'Campus Events', members: 1.2, unit: 'k', category: 'Social' },
    { name: 'Study Buddies', members: 456, category: 'Study' }
  ];

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#0D0D0E] border border-white/[0.08] rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Trending on Campus</h3>
          <TrendingUp className="h-4 w-4 text-[#FFD700]" />
        </div>
        
        <div className="space-y-3">
          {trendingTopics.map((topic, idx) => (
            <div key={topic.tag} className="group cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Hash className="h-3 w-3 text-gray-500" />
                  <span className="text-sm text-white group-hover:text-[#FFD700] transition-colors">
                    {topic.tag}
                  </span>
                </div>
                <span className="text-xs text-green-400">{topic.trend}</span>
              </div>
              <div className="text-xs text-gray-500">{topic.posts} posts</div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-xs text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">
          Show more →
        </button>
      </motion.div>

      {/* Suggested Spaces */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0D0D0E] border border-white/[0.08] rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Suggested Spaces</h3>
          <Sparkles className="h-4 w-4 text-[#FFD700]" />
        </div>
        
        <div className="space-y-3">
          {suggestedSpaces.map((space) => (
            <div key={space.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-sm text-white">{space.name}</div>
                  <div className="text-xs text-gray-500">
                    {space.members}{space.unit} members • {space.category}
                  </div>
                </div>
              </div>
              <button className="text-xs px-2 py-1 rounded-lg bg-[#FFD700] text-black font-medium hover:bg-[#FFD700]/90 transition-colors">
                Join
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Active Events */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white">Live Event</h3>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-xs text-red-400">LIVE</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-white font-medium">Tech Talk: AI in Education</div>
          <div className="text-xs text-gray-400">Student Union • Room 201</div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Users className="h-3 w-3" />
            <span>127 watching</span>
          </div>
        </div>
        
        <button className="w-full mt-3 text-xs px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-all">
          Join Stream
        </button>
      </motion.div>
    </div>
  );
}

// Post card component
function PostCard({ post, onLike, onBookmark, onShare, onComment, hasLiked, hasBookmarked }: any) {
  const timeAgo = post.createdAt ? formatDistanceToNow(
    post.createdAt.toDate ? post.createdAt.toDate() : new Date(post.createdAt),
    { addSuffix: true }
  ) : 'just now';

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'tool_share': return <Zap className="h-3 w-3 text-[#FFD700]" />;
      case 'event': return <Calendar className="h-3 w-3 text-purple-400" />;
      case 'achievement': return <Award className="h-3 w-3 text-green-400" />;
      case 'announcement': return <Bell className="h-3 w-3 text-blue-400" />;
      default: return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-[#0D0D0E] border border-white/[0.08] rounded-xl hover:border-white/[0.12] transition-all"
    >
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFD700]/20 to-purple-500/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-white">
                {post.authorName?.[0] || '?'}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-white text-sm">{post.authorName}</span>
                <span className="text-xs text-gray-500">@{post.authorHandle}</span>
                {getPostTypeIcon()}
                {post.isPinned && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#FFD700]/20 text-[#FFD700]">
                    Pinned
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                {post.spaceName && (
                  <>
                    <Hash className="h-3 w-3" />
                    <span>{post.spaceName}</span>
                    <span>•</span>
                  </>
                )}
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>

          <button className="p-1.5 hover:bg-white/[0.05] rounded-lg transition-all text-gray-400 hover:text-white">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3 space-y-3">
        {post.content.title && (
          <h3 className="font-semibold text-white text-base">{post.content.title}</h3>
        )}
        
        {post.content.text && (
          <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
            {post.content.text}
          </p>
        )}

        {/* Tool/Event Cards */}
        {post.content.toolName && (
          <div className="p-3 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-[#FFD700]" />
              <span className="font-medium text-white text-sm">{post.content.toolName}</span>
            </div>
            {post.content.description && (
              <p className="text-xs text-gray-400 mt-1">{post.content.description}</p>
            )}
            <button className="mt-2 text-xs text-[#FFD700] hover:text-[#FFD700]/80 transition-colors">
              Deploy Tool →
            </button>
          </div>
        )}

        {post.content.eventDetails && (
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-white text-sm">{post.content.eventDetails.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
              <span>{post.content.eventDetails.date}</span>
              <span>•</span>
              <span>{post.content.eventDetails.location}</span>
            </div>
            <button className="mt-2 text-xs text-purple-400 hover:text-purple-300 transition-colors">
              Add to Calendar →
            </button>
          </div>
        )}

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag: string) => (
              <span 
                key={tag} 
                className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] text-gray-400 hover:bg-white/[0.08] hover:text-white cursor-pointer transition-all"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Engagement Stats */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{post.engagement.views} views</span>
          <span>{post.engagement.likes} likes</span>
          <span>{post.engagement.comments} comments</span>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 py-3 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onLike(post.id)}
            className={cn(
              "p-2 rounded-lg transition-all flex items-center gap-1.5 text-sm",
              hasLiked 
                ? "text-red-400 bg-red-400/10 hover:bg-red-400/20" 
                : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
            )}
          >
            <Heart className={cn("h-4 w-4", hasLiked && "fill-current")} />
            <span className="text-xs">{post.engagement.likes || 0}</span>
          </button>

          <button
            onClick={() => onComment(post.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{post.engagement.comments || 0}</span>
          </button>

          <button
            onClick={() => onShare(post.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all flex items-center gap-1.5"
          >
            <Share2 className="h-4 w-4" />
            <span className="text-xs">{post.engagement.shares || 0}</span>
          </button>
        </div>

        <button
          onClick={() => onBookmark(post.id)}
          className={cn(
            "p-2 rounded-lg transition-all",
            hasBookmarked 
              ? "text-[#FFD700] bg-[#FFD700]/10 hover:bg-[#FFD700]/20" 
              : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
          )}
        >
          <Bookmark className={cn("h-4 w-4", hasBookmarked && "fill-current")} />
        </button>
      </div>
    </motion.div>
  );
}

export default function FeedPageV2() {
  const [feedType, setFeedType] = useState<'personal' | 'trending' | 'following'>('personal');
  const [showComposer, setShowComposer] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Use Firebase feed hook
  const {
    posts,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    createPost,
    toggleLike,
    toggleBookmark,
    addComment,
    sharePost,
    loadMore,
    refresh,
    hasLiked,
    hasBookmarked
  } = useFirebaseFeed({
    feedType,
    sortBy: feedType === 'trending' ? 'popular' : 'recent',
    pageSize: 20,
    realtime: true
  });

  // Intersection observer for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);

  // Handle comment
  const handleComment = useCallback(async (postId: string) => {
    const comment = prompt('Add a comment:');
    if (comment) {
      try {
        await addComment(postId, comment);
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  }, [addComment]);

  // Feed type filters
  const feedFilters = [
    { value: 'personal', label: 'For You', icon: Sparkles },
    { value: 'following', label: 'Following', icon: UserPlus },
    { value: 'trending', label: 'Trending', icon: Flame }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Rituals Strip - Above everything */}
      <RitualsStrip />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Feed</h1>
              <p className="text-sm text-gray-400 mt-1">
                Stay connected with your campus community
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={refresh}
                disabled={isLoading}
                className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white transition-all"
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </button>
              
              <button className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white transition-all">
                <Bell className="h-4 w-4" />
              </button>

              <button className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-white transition-all">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Stats */}
          <FeedStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Feed Type Selector */}
            <div className="flex items-center gap-2 p-1 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-lg">
              {feedFilters.map((filter) => {
                const Icon = filter.icon;
                const isActive = feedType === filter.value;
                return (
                  <button
                    key={filter.value}
                    onClick={() => setFeedType(filter.value as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all text-sm font-medium",
                      isActive 
                        ? "bg-[#FFD700] text-black" 
                        : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Create Post */}
            <CreatePostCard onOpen={() => setShowComposer(true)} />

            {/* Posts */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-[#0D0D0E] border border-white/[0.08] rounded-xl p-4">
                    <div className="animate-pulse space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-white/[0.05] rounded-full" />
                        <div className="space-y-2 flex-1">
                          <div className="h-3 w-32 bg-white/[0.05] rounded" />
                          <div className="h-2 w-24 bg-white/[0.05] rounded" />
                        </div>
                      </div>
                      <div className="h-16 bg-white/[0.05] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D0D0E] border border-white/[0.08] rounded-xl p-8 text-center"
              >
                <Activity className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <h3 className="font-semibold text-white mb-2">No posts yet</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Be the first to share something with your community!
                </p>
                <button
                  onClick={() => setShowComposer(true)}
                  className="px-4 py-2 rounded-lg bg-[#FFD700] text-black font-medium hover:bg-[#FFD700]/90 transition-colors"
                >
                  Create First Post
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={toggleLike}
                      onBookmark={toggleBookmark}
                      onShare={sharePost}
                      onComment={handleComment}
                      hasLiked={hasLiked(post.id)}
                      hasBookmarked={hasBookmarked(post.id)}
                    />
                  ))}
                </div>
              </AnimatePresence>
            )}

            {/* Load More Trigger */}
            {hasMore && !isLoading && posts.length > 0 && (
              <div ref={loadMoreRef} className="py-4 flex justify-center">
                {isLoadingMore && (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <TrendingSidebar />
          </div>
        </div>
      </div>

      {/* Post Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0D0D0E] border border-white/[0.08] rounded-xl max-w-lg w-full max-h-[90vh] overflow-auto"
          >
            {/* Composer content here */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-white mb-4">Create Post</h2>
              {/* Add composer form */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowComposer(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/[0.08] text-white hover:bg-white/[0.05] transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle post creation
                    setShowComposer(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#FFD700] text-black font-medium hover:bg-[#FFD700]/90 transition-all"
                >
                  Post
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}