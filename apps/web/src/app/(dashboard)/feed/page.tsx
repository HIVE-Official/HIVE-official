"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Calendar, 
  Zap,
  Heart,
  Bell,
  Loader2,
  RefreshCw,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Sparkles,
  Hash,
  Image as ImageIcon,
  Link2,
  Smile,
  MapPin,
  UserPlus,
  Award,
  Flame
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useFeed, useCoordinationFeed } from '@/hooks/use-feed';
import { RitualsStrip } from '@/components/feed/rituals-strip';
import { PostComposer } from '@/components/feed/post-composer';
import { useActiveUsers } from '@/hooks/use-active-users';
// import { RitualEngine, type RitualStrip } from '@/lib/spaces/rituals/rituals/ritual-engine';
import { useUnifiedAuth } from '@hive/ui';
import { useQuery } from '@tanstack/react-query';
import { RealTimeFeedManager } from '@/components/feed/real-time-feed-manager';
import { FeedPreferencesButton } from '@/components/feed/feed-preferences-modal';
import { FeedNotifications } from '@/components/feed/feed-notifications';
import { CrossSpaceDiscovery } from '@/components/feed/cross-space-discovery';

// Feed stats component with real data
interface FeedStatsProps {
  posts?: any[];
}

function FeedStats({ posts = [] }: FeedStatsProps) {
  // Get real active user count
  const { activeCount, isLoading: activeLoading } = useActiveUsers();
  
  // Calculate real stats from posts
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayPosts = posts.filter(p => {
    if (!p.createdAt) return false;
    const postDate = p.createdAt?.toDate ? p.createdAt.toDate() : new Date(p.createdAt);
    return postDate >= today;
  });
  
  const toolPosts = posts.filter(p => p.type === 'tool_share').length;
  const eventPosts = posts.filter(p => p.type === 'event').length;
  
  const stats = [
    { 
      label: 'Active Now', 
      value: activeLoading ? '...' : activeCount.toString(), 
      icon: Users, 
      color: 'text-green-400', 
      bgColor: 'bg-green-400/10' 
    },
    { label: 'Today\'s Posts', value: todayPosts.length.toString(), icon: Activity, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    { label: 'Tools Shared', value: toolPosts.toString(), icon: Zap, color: 'text-[var(--hive-gold)]', bgColor: 'bg-[var(--hive-gold)]/10' },
    { label: 'Events Today', value: eventPosts.toString(), icon: Calendar, color: 'text-[var(--hive-gold)]', bgColor: 'bg-[var(--hive-gold)]/10' }
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
            className="bg-[var(--hive-white)]/[0.03] backdrop-blur-sm border border-[var(--hive-white)]/[0.08] rounded-xl p-4 hover:bg-[var(--hive-white)]/[0.05] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon className={cn("h-4 w-4", stat.color)} />
              <span className={cn("text-xs px-2 py-0.5 rounded-full", stat.bgColor, stat.color)}>
                Live
              </span>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-[var(--hive-text-primary)]">{stat.value}</div>
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
      className="bg-[#0D0D0E] border border-[var(--hive-white)]/[0.08] rounded-xl p-4 mb-6"
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-[var(--hive-gold)]/20 flex items-center justify-center shrink-0">
          <span className="text-sm font-bold text-[var(--hive-gold)]">JD</span>
        </div>
        
        <button
          onClick={onOpen}
          className="flex-1 text-left px-4 py-2.5 bg-[var(--hive-white)]/[0.03] hover:bg-[var(--hive-white)]/[0.05] border border-[var(--hive-white)]/[0.08] rounded-lg text-gray-400 transition-all"
        >
          What's happening in your space?
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-[var(--hive-white)]/[0.05] rounded-lg transition-all text-gray-400 hover:text-[var(--hive-text-primary)]">
            <ImageIcon className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-[var(--hive-white)]/[0.05] rounded-lg transition-all text-gray-400 hover:text-[var(--hive-text-primary)]">
            <Link2 className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-[var(--hive-white)]/[0.05] rounded-lg transition-all text-gray-400 hover:text-[var(--hive-text-primary)]">
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
        className="bg-[#0D0D0E] border border-[var(--hive-white)]/[0.08] rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">Trending on Campus</h3>
          <TrendingUp className="h-4 w-4 text-[var(--hive-gold)]" />
        </div>
        
        <div className="space-y-3">
          {trendingTopics.map((topic, _idx) => (
            <div key={topic.tag} className="group cursor-pointer">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Hash className="h-3 w-3 text-gray-500" />
                  <span className="text-sm text-[var(--hive-text-primary)] group-hover:text-[var(--hive-gold)] transition-colors">
                    {topic.tag}
                  </span>
                </div>
                <span className="text-xs text-green-400">{topic.trend}</span>
              </div>
              <div className="text-xs text-gray-500">{topic.posts} posts</div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 text-xs text-[var(--hive-gold)] hover:text-[var(--hive-gold)]/80 transition-colors">
          Show more →
        </button>
      </motion.div>

      {/* Suggested Spaces */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0D0D0E] border border-[var(--hive-white)]/[0.08] rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">Suggested Spaces</h3>
          <Sparkles className="h-4 w-4 text-[var(--hive-gold)]" />
        </div>
        
        <div className="space-y-3">
          {suggestedSpaces.map((space: any) => (
            <div key={space.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[var(--hive-white)]/[0.05] flex items-center justify-center">
                  <Users className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <div className="text-sm text-[var(--hive-text-primary)]">{space.name}</div>
                  <div className="text-xs text-gray-500">
                    {space.members}{space.unit} members • {space.category}
                  </div>
                </div>
              </div>
              <button className="text-xs px-2 py-1 rounded-lg bg-[var(--hive-gold)] text-[var(--hive-black)] font-medium hover:bg-[var(--hive-gold)]/90 transition-colors">
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
        className="bg-gradient-to-br from-[var(--hive-gold)]/10 to-pink-500/10 border border-[var(--hive-gold)]/20 rounded-xl p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[var(--hive-text-primary)]">Live Event</h3>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-xs text-red-400">LIVE</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-[var(--hive-text-primary)] font-medium">Tech Talk: AI in Education</div>
          <div className="text-xs text-gray-400">Student Union • Room 201</div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Users className="h-3 w-3" />
            <span>127 watching</span>
          </div>
        </div>
        
        <button className="w-full mt-3 text-xs px-3 py-1.5 rounded-lg bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border border-[var(--hive-gold)]/30 hover:bg-[var(--hive-gold)]/30 transition-all">
          Join Stream
        </button>
      </motion.div>
    </div>
  );
}

// Post card component
function PostCard({ post, onLike, onBookmark, onShare, onComment, hasLiked, hasBookmarked }: any) {
  const timeAgo = post.timestamp ? formatDistanceToNow(
    post.timestamp instanceof Date ? post.timestamp : new Date(post.timestamp),
    { addSuffix: true }
  ) : 'just now';

  const getPostTypeIcon = () => {
    switch (post.type) {
      case 'tool_share': return <Zap className="h-3 w-3 text-[var(--hive-gold)]" />;
      case 'event': return <Calendar className="h-3 w-3 text-[var(--hive-gold)]" />;
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
      className="bg-[#0D0D0E] border border-[var(--hive-white)]/[0.08] rounded-xl hover:border-[var(--hive-white)]/[0.12] transition-all"
    >
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[var(--hive-gold)]/20 to-[var(--hive-gold)]/20 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-[var(--hive-text-primary)]">
                {post.authorName?.[0] || '?'}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[var(--hive-text-primary)] text-sm">{post.author?.name || 'Anonymous'}</span>
                <span className="text-xs text-gray-500">@{post.spaceHandle || post.spaceName}</span>
                {getPostTypeIcon()}
                {post.isPinned && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]">
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

          <button className="p-1.5 hover:bg-[var(--hive-white)]/[0.05] rounded-lg transition-all text-gray-400 hover:text-[var(--hive-text-primary)]">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3 space-y-3">
        {post.title && (
          <h3 className="font-semibold text-[var(--hive-text-primary)] text-base">{post.title}</h3>
        )}
        
        {post.content && (
          <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
            {post.content}
          </p>
        )}

        {/* Images */}
        {post.images && post.images.length > 0 && (
          <div className={cn(
            "grid gap-2",
            post.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
          )}>
            {post.images.map((url: string, idx: number) => (
              <img
                key={idx}
                src={url}
                alt={`Post image ${idx + 1}`}
                className="rounded-lg w-full h-auto object-cover max-h-96"
              />
            ))}
          </div>
        )}

        {/* Coordination Data */}
        {post.coordinationData && (
          <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="font-medium text-[var(--hive-text-primary)] text-sm">{post.coordinationData.title}</span>
            </div>
            {post.coordinationData.location && (
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <MapPin className="h-3 w-3" />
                <span>{post.coordinationData.location}</span>
              </div>
            )}
            <div className="mt-2 text-xs text-blue-400">
              {post.coordinationData.status === 'open' ? 'Open for responses' : post.coordinationData.status}
            </div>
          </div>
        )}

        {/* Poll Data */}
        {post.pollData && (
          <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <h4 className="font-medium text-[var(--hive-text-primary)] text-sm mb-2">{post.pollData.question}</h4>
            <div className="space-y-1">
              {post.pollData.options.map((option: any) => (
                <div key={option.id} className="flex items-center justify-between text-xs">
                  <span className="text-gray-300">{option.text}</span>
                  <span className="text-gray-500">{option.votes} votes</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tool/Event Cards - Legacy support */}
        {post.content?.toolName && (
          <div className="p-3 bg-[var(--hive-gold)]/10 rounded-lg border border-[var(--hive-gold)]/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-[var(--hive-gold)]" />
              <span className="font-medium text-[var(--hive-text-primary)] text-sm">{post.content.toolName}</span>
            </div>
            {post.content.description && (
              <p className="text-xs text-gray-400 mt-1">{post.content.description}</p>
            )}
            <button className="mt-2 text-xs text-[var(--hive-gold)] hover:text-[var(--hive-gold)]/80 transition-colors">
              Deploy Tool →
            </button>
          </div>
        )}

        {post.content.eventDetails && (
          <div className="p-3 bg-[var(--hive-gold)]/10 rounded-lg border border-[var(--hive-gold)]/20">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-4 w-4 text-[var(--hive-gold)]" />
              <span className="font-medium text-[var(--hive-text-primary)] text-sm">{post.content.eventDetails.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
              <span>{post.content.eventDetails.date}</span>
              <span>•</span>
              <span>{post.content.eventDetails.location}</span>
            </div>
            <button className="mt-2 text-xs text-[var(--hive-gold)] hover:text-purple-300 transition-colors">
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
                className="text-xs px-2 py-0.5 rounded-full bg-[var(--hive-white)]/[0.05] text-gray-400 hover:bg-[var(--hive-white)]/[0.08] hover:text-[var(--hive-text-primary)] cursor-pointer transition-all"
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
      <div className="px-4 py-3 border-t border-[var(--hive-white)]/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onLike(post.id)}
            className={cn(
              "p-2 rounded-lg transition-all flex items-center gap-1.5 text-sm",
              hasLiked 
                ? "text-red-400 bg-red-400/10 hover:bg-red-400/20" 
                : "text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.05]"
            )}
          >
            <Heart className={cn("h-4 w-4", hasLiked && "fill-current")} />
            <span className="text-xs">{post.engagement.likes || 0}</span>
          </button>

          <button
            onClick={() => onComment(post.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.05] transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs">{post.engagement.comments || 0}</span>
          </button>

          <button
            onClick={() => onShare(post.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.05] transition-all flex items-center gap-1.5"
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
              ? "text-[var(--hive-gold)] bg-[var(--hive-gold)]/10 hover:bg-[var(--hive-gold)]/20" 
              : "text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.05]"
          )}
        >
          <Bookmark className={cn("h-4 w-4", hasBookmarked && "fill-current")} />
        </button>
      </div>
    </motion.div>
  );
}

export default function FeedPageV2() {
  const [showComposer, setShowComposer] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [currentFeedType, setCurrentFeedType] = useState<'personal' | 'campus' | 'trending'>('personal');
  const [_showDiscovery, _setShowDiscovery] = useState(false);
  
  // Get auth context
  const { user } = useUnifiedAuth();

  // Handle post creation
  const handleCreatePost = async (postData: any): Promise<string> => {
    try {
      //   body: JSON.stringify(postData)
      // });
      // const newPost = await response.json();
      setShowComposer(false);
      // Refresh feed or add post to the feed
      return `post-${Date.now()}`; // Return temporary post ID
    } catch (error) {
      logger.error('Error creating post:', { error: String(error) });
      throw error;
    }
  };

  // Use the new working feed hook
  const {
    posts,
    isLoading,
    error,
    hasMore,
    isLoadingMore,
    loadMore,
    refresh,
    createPost,
    analytics,
    feedType
  } = useFeed(currentFeedType);

  // Use coordination feed for specific filter
  const coordinationFeed = useCoordinationFeed();

  // Switch between feeds based on filter
  const activeFeed = selectedFilter === 'coordination' ? coordinationFeed : { posts, isLoading, error, hasMore, loadMore, refresh };
  
  // Get user's spaces for real-time manager
  const { data: userSpaces = [] } = useQuery({
    queryKey: ['user-spaces', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await fetch(`/api/users/${user.id}/spaces`);
      const data = await response.json();
      return data.spaces?.map((s: any) => s.id) || [];
    },
    enabled: !!user?.id
  });

  // Mock functions for interactions (will be implemented later)
  const toggleLike = async (postId: string) => {
  };

  const toggleBookmark = async (postId: string) => {
  };

  const addComment = async (postId: string, comment: string) => {
  };

  const sharePost = async (postId: string) => {
  };

  const hasLiked = (_postId: string) => false;
  const hasBookmarked = (_postId: string) => false;

  // Intersection observer for infinite scroll
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!loadMoreRef.current || !activeFeed.hasMore || activeFeed.isLoading) return;

    const observer = new IntersectionObserver(
      (entries: any) => {
        if (entries[0].isIntersecting) {
          activeFeed.loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  // Handle comment
  const handleComment = useCallback(async (postId: string) => {
    const comment = prompt('Add a comment:');
    if (comment) {
      try {
        await addComment(postId, comment);
      } catch (error) {
        logger.error('Failed to add comment:', { error: String(error) });
      }
    }
  }, [addComment]);

  // Feed type filters
  const feedFilters = [
    { value: 'for-you', label: 'For You', icon: Sparkles },
    { value: 'following', label: 'Following', icon: UserPlus },
    { value: 'trending', label: 'Trending', icon: Flame }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)]">
      {/* Rituals Strip - Above everything */}
      <RitualsStrip />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">Feed</h1>
              <p className="text-sm text-gray-400 mt-1">
                Stay connected with your campus community
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={refresh}
                disabled={isLoading}
                className="p-2 rounded-lg bg-[var(--hive-white)]/[0.03] hover:bg-[var(--hive-white)]/[0.05] border border-[var(--hive-white)]/[0.08] text-gray-400 hover:text-[var(--hive-text-primary)] transition-all"
              >
                <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
              </button>
              
              {/* Feed Notifications */}
              {user?.id && (
                <FeedNotifications 
                  userId={user.id}
                  onNotificationClick={(notification: any) => {
                  }}
                />
              )}

              {/* Feed Preferences */}
              {user?.id && (
                <FeedPreferencesButton
                  userId={user.id}
                  onSettingsChange={(settings: any) => {
                    refresh();
                  }}
                />
              )}
            </div>
          </div>

          {/* Stats */}
          <FeedStats posts={posts} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Real-Time Feed Manager */}
            {user?.id && userSpaces.length > 0 && (
              <RealTimeFeedManager
                userId={user.id}
                userSpaces={userSpaces}
                onNewItems={(count: any) => {
                }}
                onItemClick={(item: any) => {
                }}
                className="mb-4"
              />
            )}
            {/* Feed Type Selector */}
            <div className="flex items-center gap-2 p-1 bg-[var(--hive-white)]/[0.03] backdrop-blur-sm border border-[var(--hive-white)]/[0.08] rounded-lg">
              {feedFilters.map((filter: any) => {
                const Icon = filter.icon;
                const isActive = feedType === filter.value;
                return (
                  <button
                    key={filter.value}
                    onClick={() => setCurrentFeedType(filter.value as any)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-all text-sm font-medium",
                      isActive 
                        ? "bg-[var(--hive-gold)] text-[var(--hive-black)]" 
                        : "text-gray-400 hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-white)]/[0.05]"
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
                  <div key={i} className="bg-[#0D0D0E] border border-[var(--hive-white)]/[0.08] rounded-xl p-4">
                    <div className="animate-pulse space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-[var(--hive-white)]/[0.05] rounded-full" />
                        <div className="space-y-2 flex-1">
                          <div className="h-3 w-32 bg-[var(--hive-white)]/[0.05] rounded" />
                          <div className="h-2 w-24 bg-[var(--hive-white)]/[0.05] rounded" />
                        </div>
                      </div>
                      <div className="h-16 bg-[var(--hive-white)]/[0.05] rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0D0D0E] border border-[var(--hive-white)]/[0.08] rounded-xl p-8 text-center"
              >
                <Activity className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">No posts yet</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Be the first to share something with your community!
                </p>
                <button
                  onClick={() => setShowComposer(true)}
                  className="px-4 py-2 rounded-lg bg-[var(--hive-gold)] text-[var(--hive-black)] font-medium hover:bg-[var(--hive-gold)]/90 transition-colors"
                >
                  Create First Post
                </button>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-4">
                  {activeFeed.posts.map((post: any) => (
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
                {isLoading && (
                  <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Cross-Space Discovery */}
            {user?.id && (
              <CrossSpaceDiscovery
                userId={user.id}
                currentSpaceId={userSpaces[0]}
                onItemClick={(item: any) => {
                }}
                className="mb-6"
              />
            )}
            
            {/* Trending Sidebar */}
            <TrendingSidebar />
          </div>
        </div>
      </div>

      {/* Post Composer Modal */}
      <PostComposer
        isOpen={showComposer}
        onClose={() => setShowComposer(false)}
        onCreatePost={handleCreatePost}
      />
    </div>
  );
}