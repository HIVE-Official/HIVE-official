"use client";

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  usePullToRefresh,
  useSwipeGestures,
  useHapticFeedback,
  useMobileViewport
} from '../../hooks/use-mobile-interactions';
import {
  Card,
  CardContent,
  Button,
  Badge
} from '../index';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  RefreshCw,
  ChevronDown,
  Loader2
} from 'lucide-react';

interface MobileFeedProps {
  posts: FeedPost[];
  onRefresh: () => Promise<void>;
  onLoadMore: () => Promise<void>;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onShare: (post: FeedPost) => void;
  onComment: (postId: string) => void;
  hasMore?: boolean;
  isLoading?: boolean
}

interface FeedPost {
  id: string;
  content: string;
  author: {
    name: string;
    handle: string;
    avatar?: string
  };
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isBookmarked: boolean;
  space?: {
    name: string;
    color: string
  };
  contentType: 'text' | 'image' | 'link' | 'tool';
  preview?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string
  }
}

export function MobileFeed({
  posts,
  onRefresh,
  onLoadMore,
  onLike,
  onBookmark,
  onShare,
  onComment,
  hasMore = false,
  isLoading = false
}: MobileFeedProps) {
  const { isMobile } = useMobileViewport();
  const { triggerHaptic } = useHapticFeedback();
  const [swipedPostId, setSwipedPostId] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  // Pull to refresh setup
  const {
    pullToRefreshHandlers,
    isPulling,
    isRefreshing,
    pullDistance,
    canRefresh
  } = usePullToRefresh({
    threshold: 80,
    onRefresh,
    resistance: 2.5,
    snapBackDuration: 300
  });

  // Handle post interactions with haptic feedback
  const handleLike = useCallback((postId: string) => {
    triggerHaptic('light');
    onLike(postId)
  }, [onLike, triggerHaptic]);

  const handleBookmark = useCallback((postId: string) => {
    triggerHaptic('medium');
    onBookmark(postId)
  }, [onBookmark, triggerHaptic]);

  const handleShare = useCallback((post: FeedPost) => {
    triggerHaptic('light');
    onShare(post)
  }, [onShare, triggerHaptic]);

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (!feedRef.current || isLoading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = feedRef.current;
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

    if (scrollPercentage > 0.9) {
      onLoadMore()
    }
  }, [onLoadMore, isLoading, hasMore]);

  useEffect(() => {
    const feedElement = feedRef.current;
    if (!feedElement) return;

    feedElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => feedElement.removeEventListener('scroll', handleScroll)
  }, [handleScroll]);

  // Pull to refresh indicator
  const PullToRefreshIndicator = () => (
    <div 
      className="flex items-center justify-center py-4 transition-opacity duration-200"
      style={{ 
        transform: `translateY(${Math.max(0, pullDistance - 20)}px)`,
        opacity: pullDistance > 0 ? Math.min(pullDistance / 60, 1) : 0
          }}
    >
      {isRefreshing ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
          <span className="text-sm text-gray-600">Refreshing feed...</span>
        </>
      ) : canRefresh ? (
        <>
          <RefreshCw className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm text-gray-600">Release to refresh</span>
        </>
      ) : (
        <>
          <ChevronDown 
            className="h-5 w-5 text-gray-400 mr-2 transition-transform duration-200"
            style={{ transform: `rotate(${Math.min(pullDistance * 2, 180)}deg)` }}
          />
          <span className="text-sm text-gray-400">Pull to refresh</span>
        </>
      )}
    </div>
  );

  return (
    <div className="relative h-full overflow-hidden">
      {/* Pull to refresh overlay */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <PullToRefreshIndicator />
      </div>

      {/* Feed container */}
      <div
        ref={feedRef}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{
          transform: isPulling ? `translateY(${Math.min(pullDistance, 100)}px)` : 'translateY(0)',
          transition: isPulling ? 'none' : 'transform 0.3s ease-out',
          paddingTop: pullDistance > 0 ? `${Math.min(pullDistance, 80)}px` : '0'
          }}
        {...pullToRefreshHandlers}
      >
        <div className="space-y-4 px-4 py-2">
          {posts.map((post) => (
            <MobilePostCard
              key={post.id}
              post={post}
              onLike={handleLike}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onComment={onComment}
              isSwipedOut={swipedPostId === post.id}
            />
          ))}

          {/* Load more indicator */}
          {hasMore && (
            <div className="flex items-center justify-center py-8">
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">Loading more posts...</span>
                </>
              ) : (
                <Button 
                  onClick={onLoadMore}
                  variant="secondary" 
                  size="sm"
                  className="touch-target-large"
                >
                  Load More
                </Button>
              )}
            </div>
          )}

          {/* End of feed indicator */}
          {!hasMore && posts.length > 0 && (
            <div className="text-center py-8 text-gray-500 text-sm">
              You&apos;re all caught up! 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Mobile-optimized post card component
function MobilePostCard({
  post,
  onLike,
  onBookmark,
  onShare,
  onComment,
  isSwipedOut
}: {
  post: FeedPost;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
  onShare: (post: FeedPost) => void;
  onComment: (id: string) => void;
  isSwipedOut: boolean
}) {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const { triggerHaptic } = useHapticFeedback();

  // Swipe gestures for quick actions
  const { swipeHandlers } = useSwipeGestures({
    threshold: 80,
    restrained: true,
    onSwipeLeft: () => {
      setShowQuickActions(true);
      triggerHaptic('selection');
      setTimeout(() => setShowQuickActions(false), 3000)
    },
    onSwipeRight: () => {
      // Quick like on right swipe
      handleLike()
    }
  });

  const handleLike = useCallback(() => {
    if (isLikeAnimating) return;
    
    setIsLikeAnimating(true);
    onLike(post.id);
    triggerHaptic(post.isLiked ? 'light' : 'medium');
    
    setTimeout(() => setIsLikeAnimating(false), 300)
  }, [post.id, post.isLiked, onLike, triggerHaptic, isLikeAnimating]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 1) {
      return `${Math.floor(diff / (1000 * 60))}m`
    } else if (hours < 24) {
      return `${Math.floor(hours)}h`
    } else {
      return `${Math.floor(hours / 24)}d`
    }
  };

  return (
    <div {...swipeHandlers}>
      <Card 
        className={`relative overflow-hidden transition-all duration-300 ${
          isSwipedOut ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
        }`}
      >
      {/* Quick actions overlay */}
      {showQuickActions && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 z-10 flex items-center justify-end px-4">
          <div className="flex space-x-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onBookmark(post.id)}
              className="text-white bg-blue-600/80 hover:bg-blue-600 touch-target-large"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onShare(post)}
              className="text-white bg-purple-600/80 hover:bg-purple-600 touch-target-large"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        {/* Post header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
              {post.author.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium text-white text-sm">{post.author.name}</div>
              <div className="text-gray-400 text-xs">@{post.author.handle} • {formatTimestamp(post.timestamp)}</div>
            </div>
          </div>
          
          {post.space && (
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ borderColor: post.space.color, color: post.space.color }}
            >
              {post.space.name}
            </Badge>
          )}
        </div>

        {/* Post content */}
        <div className="space-y-3">
          <p className="text-gray-200 leading-relaxed">{post.content}</p>
          
          {/* Content preview */}
          {post.preview && (
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              {post.preview.image && (
                <img 
                  src={post.preview.image} 
                  alt={post.preview.title}
                  className="w-full h-32 object-cover"
                />
              )}
              <div className="p-3">
                {post.preview.title && (
                  <h4 className="font-medium text-white text-sm mb-1">{post.preview.title}</h4>
                )}
                {post.preview.description && (
                  <p className="text-gray-400 text-xs leading-relaxed">{post.preview.description}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Post actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-800">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 text-sm transition-all duration-200 touch-target ${
                post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
              } ${isLikeAnimating ? 'scale-110' : 'scale-100'}`}
            >
              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </button>
            
            <button
              onClick={() => onComment(post.id)}
              className="flex items-center space-x-2 text-sm text-gray-400 hover:text-blue-400 transition-colors touch-target"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => onBookmark(post.id)}
              className={`text-sm transition-colors touch-target ${
                post.isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => onShare(post)}
              className="text-sm text-gray-400 hover:text-blue-400 transition-colors touch-target"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}