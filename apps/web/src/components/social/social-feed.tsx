"use client";

import React, { useCallback } from 'react';
import { Card, Button } from "@hive/ui";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark, 
  MoreHorizontal, 
  User,
  Hash,
  ArrowUp,
  Plus,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import { generateDefaultAvatar } from '../../lib/avatar-generator';

// State Management
import { 
  useFeedPosts,
  useLikePost,
  useBookmarkPost,
  useSharePost,
  useUIStore,
  useAuthStore,
  useFeedStore
} from '@hive/hooks';

// Post types and interfaces
export interface Post {
  id: string;
  content: string;
  type: 'text' | 'tool' | 'event' | 'collaboration' | 'achievement' | 'question';
  author: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
    isVerified?: boolean;
    badges?: string[];
  };
  createdAt: string;
  visibility: 'public' | 'spaces' | 'connections';
  spaceId?: string;
  spaceName?: string;
  attachments?: string[];
  mentions?: string[];
  tags?: string[];
  poll?: {
    question: string;
    options: Array<{ id: string; text: string; votes: number }>;
    totalVotes: number;
    userVote?: string;
    endsAt: string;
  };
  event?: {
    title: string;
    startTime: string;
    endTime: string;
    location: string;
    attendees: number;
    isAttending: boolean;
  };
  location?: {
    name: string;
    coordinates?: [number, number];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    hasLiked: boolean;
    hasBookmarked: boolean;
  };
  comments: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      handle: string;
      avatarUrl?: string;
    };
    createdAt: string;
    likes: number;
    hasLiked: boolean;
  }>;
}

export interface FeedFilters {
  postTypes: string[];
  sortBy: 'recent' | 'popular' | 'trending';
  timeRange: 'today' | 'week' | 'month' | 'all';
  spaces: string[];
}

interface SocialFeedMigratedProps {
  feedType?: 'home' | 'space' | 'profile';
  spaceId?: string;
  userId?: string;
  searchQuery?: string;
  className?: string;
}

export function SocialFeedMigrated({
  feedType = 'home',
  spaceId,
  userId,
  searchQuery = '',
  className = ''
}: SocialFeedMigratedProps) {
  // Global state
  const { user } = useAuthStore();
  const { addToast, openModal } = useUIStore();
  const { filters, setFilters, expandedPosts, togglePostExpanded } = useFeedStore();

  // React Query hooks
  const { 
    data: posts, 
    isLoading, 
    error, 
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useFeedPosts({
    feedType,
    spaceId,
    userId,
    searchQuery,
    filters
  });

  const likePost = useLikePost();
  const bookmarkPost = useBookmarkPost();
  const sharePost = useSharePost();

  // Infinite scroll
  const loadMoreRef = React.useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(loadMoreRef);

  React.useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handlers
  const handleLike = useCallback((postId: string) => {
    if (!user) {
      addToast({
        title: 'Authentication Required',
        description: 'Please log in to like posts',
        type: 'error',
      });
      return;
    }

    likePost.mutate(postId, {
      onError: (error: any) => {
        addToast({
          title: 'Failed to like post',
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  }, [user, likePost, addToast]);

  const handleBookmark = useCallback((postId: string) => {
    if (!user) {
      addToast({
        title: 'Authentication Required',
        description: 'Please log in to bookmark posts',
        type: 'error',
      });
      return;
    }

    bookmarkPost.mutate(postId, {
      onSuccess: (data: any) => {
        addToast({
          title: data.isBookmarked ? 'Bookmarked' : 'Removed from bookmarks',
          description: data.isBookmarked ? 'Post saved to your bookmarks' : 'Post removed from bookmarks',
          type: 'success',
        });
      },
      onError: (error: any) => {
        addToast({
          title: 'Failed to bookmark post',
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  }, [user, bookmarkPost, addToast]);

  const handleShare = useCallback((postId: string) => {
    sharePost.mutate(postId, {
      onSuccess: () => {
        addToast({
          title: 'Shared!',
          description: 'Post has been shared to your profile',
          type: 'success',
        });
      },
      onError: (error: any) => {
        addToast({
          title: 'Failed to share post',
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  }, [sharePost, addToast]);

  const handleCommentClick = useCallback((postId: string) => {
    openModal('comments', { postId });
  }, [openModal]);

  const handleCreatePost = useCallback(() => {
    openModal('create-post', { spaceId, feedType });
  }, [openModal, spaceId, feedType]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-muted-foreground">Loading feed...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <p className="text-destructive">Failed to load feed</p>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const allPosts = posts?.pages?.flatMap(page => page.posts) || [];

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Create Post Button */}
      <Card className="p-4">
        <Button
          onClick={handleCreatePost}
          variant="outline"
          className="w-full justify-start text-muted-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          What's on your mind?
        </Button>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {allPosts.map((post: any) => (
          <Card key={post.id} className="overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                  {post.author.avatarUrl ? (
                    <img 
                      src={post.author.avatarUrl} 
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{post.author.name}</span>
                    {post.author.isVerified && (
                      <span className="text-blue-500 text-xs">✓</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{post.author.handle}</span>
                    <span>·</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-3">
              <p className={`text-sm ${expandedPosts.has(post.id) ? '' : 'line-clamp-3'}`}>
                {post.content}
              </p>
              {post.content.length > 200 && (
                <button
                  onClick={() => togglePostExpanded(post.id)}
                  className="text-sm text-accent hover:underline mt-1"
                >
                  {expandedPosts.has(post.id) ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {post.tags.map((tag: any) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs text-accent hover:underline cursor-pointer"
                  >
                    <Hash className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Engagement Bar */}
            <div className="px-4 py-2 border-t flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${
                    post.engagement.hasLiked 
                      ? 'text-red-500' 
                      : 'text-muted-foreground hover:text-red-500'
                  }`}
                  disabled={likePost.isPending}
                >
                  <Heart 
                    className={`h-4 w-4 ${post.engagement.hasLiked ? 'fill-current' : ''}`} 
                  />
                  <span>{post.engagement.likes}</span>
                </button>

                <button
                  onClick={() => handleCommentClick(post.id)}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.engagement.comments}</span>
                </button>

                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                  disabled={sharePost.isPending}
                >
                  <Share className="h-4 w-4" />
                  <span>{post.engagement.shares}</span>
                </button>
              </div>

              <button
                onClick={() => handleBookmark(post.id)}
                className={`text-sm transition-colors ${
                  post.engagement.hasBookmarked 
                    ? 'text-accent' 
                    : 'text-muted-foreground hover:text-accent'
                }`}
                disabled={bookmarkPost.isPending}
              >
                <Bookmark 
                  className={`h-4 w-4 ${post.engagement.hasBookmarked ? 'fill-current' : ''}`} 
                />
              </button>
            </div>

            {/* Comments Preview */}
            {post.comments.length > 0 && (
              <div className="px-4 py-2 border-t">
                <div className="text-xs text-muted-foreground mb-2">
                  {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
                </div>
                {post.comments.slice(0, 2).map((comment: any) => (
                  <div key={comment.id} className="mb-2">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-muted flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {post.comments.length > 2 && (
                  <button
                    onClick={() => handleCommentClick(post.id)}
                    className="text-xs text-accent hover:underline"
                  >
                    View all comments
                  </button>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Load More Indicator */}
      <div ref={loadMoreRef} className="py-4">
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}
        {!hasNextPage && allPosts.length > 0 && (
          <div className="text-center text-muted-foreground text-sm">
            No more posts to load
          </div>
        )}
      </div>

      {/* Empty State */}
      {allPosts.length === 0 && (
        <Card className="p-12">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center">
              <Hash className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium">No posts yet</h3>
            <p className="text-sm text-muted-foreground">
              Be the first to share something with the community
            </p>
            <Button onClick={handleCreatePost}>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>
        </Card>
      )}

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-accent text-white shadow-lg hover:shadow-xl transition-all"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}