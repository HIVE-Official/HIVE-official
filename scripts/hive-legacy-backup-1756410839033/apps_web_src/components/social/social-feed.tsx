"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, ButtonEnhanced } from "@hive/ui";
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
  RefreshCw
} from 'lucide-react';
import { useSession } from '../../hooks/use-session';
import { useIntersectionObserver } from '../../hooks/use-intersection-observer';
import { generateDefaultAvatar } from '../../lib/avatar-generator';

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

interface SocialFeedProps {
  feedType?: 'home' | 'space' | 'profile';
  spaceId?: string;
  userId?: string;
  searchQuery?: string;
  className?: string;
}

export function SocialFeed({
  feedType = 'home',
  spaceId,
  userId,
  searchQuery = '',
  className = ''
}: SocialFeedProps) {
  const { user: _user } = useSession();
  const [feedState, setFeedState] = useState({
    posts: [] as Post[],
    isLoading: true,
    isLoadingMore: false,
    hasMore: true,
    error: null as string | null,
    lastUpdated: null as Date | null
  });
  
  const [filters, _setFilters] = useState<FeedFilters>({
    postTypes: [],
    sortBy: 'recent',
    timeRange: 'all',
    spaces: []
  });
  
  const [_showComposerModal, setShowComposerModal] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const _isIntersecting = useIntersectionObserver(loadMoreRef);

  // Load initial posts
  useEffect(() => {
    const loadPosts = async () => {
      setFeedState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for development
        const mockPosts: Post[] = [
          {
            id: '1',
            content: 'Just finished building a new study scheduler tool! 📚 It automatically finds free time slots based on your calendar and creates optimal study sessions. Perfect for finals season! #StudyTools #Productivity',
            type: 'tool',
            author: {
              id: 'user1',
              name: 'Alex Chen',
              handle: '@alex_codes',
              avatarUrl: generateDefaultAvatar('user1', { seed: 'Alex Chen', style: 'avataaars' }),
              isVerified: true,
              badges: ['early-adopter', 'top-contributor']
            },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            visibility: 'public',
            spaceId: spaceId,
            spaceName: spaceId ? 'Computer Science' : undefined,
            tags: ['StudyTools', 'Productivity'],
            engagement: {
              likes: 24,
              comments: 8,
              shares: 12,
              views: 156,
              hasLiked: false,
              hasBookmarked: true
            },
            comments: [
              {
                id: 'c1',
                content: 'This looks amazing! Can you share the code?',
                author: {
                  id: 'user2',
                  name: 'Sarah Kim',
                  handle: '@sarahk',
                  avatarUrl: generateDefaultAvatar('user2', { seed: 'Sarah Kim', style: 'avataaars' })
                },
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                likes: 3,
                hasLiked: false
              }
            ]
          }
        ];
        
        // Apply filters
        let filteredPosts = mockPosts;
        
        // Filter by search query
        if (searchQuery) {
          filteredPosts = filteredPosts.filter(post => 
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
          );
        }
        
        // Filter by feed type
        if (feedType === 'space' && spaceId) {
          filteredPosts = filteredPosts.filter(post => post.spaceId === spaceId);
        } else if (feedType === 'profile' && userId) {
          filteredPosts = filteredPosts.filter(post => post.author.id === userId);
        }
        
        // Apply filters
        if (filters.postTypes.length > 0) {
          filteredPosts = filteredPosts.filter(post => filters.postTypes.includes(post.type));
        }
        
        // Sort posts
        switch (filters.sortBy) {
          case 'popular':
            filteredPosts.sort((a, b) => b.engagement.likes - a.engagement.likes);
            break;
          case 'trending':
            filteredPosts.sort((a, b) => 
              (b.engagement.likes + b.engagement.comments + b.engagement.shares) - 
              (a.engagement.likes + a.engagement.comments + a.engagement.shares)
            );
            break;
          case 'recent':
          default:
            filteredPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        
        setFeedState(prev => ({
          ...prev,
          posts: filteredPosts,
          isLoading: false,
          lastUpdated: new Date()
        }));
        
      } catch (error) {
        setFeedState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load posts'
        }));
      }
    };

    loadPosts();
  }, [feedType, spaceId, userId, searchQuery, filters]);

  const handleLike = useCallback((postId: string) => {
    setFeedState(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? {
              ...post,
              engagement: {
                ...post.engagement,
                likes: post.engagement.hasLiked 
                  ? post.engagement.likes - 1 
                  : post.engagement.likes + 1,
                hasLiked: !post.engagement.hasLiked
              }
            }
          : post
      )
    }));
  }, []);

  const handleBookmark = useCallback((postId: string) => {
    setFeedState(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post.id === postId 
          ? {
              ...post,
              engagement: {
                ...post.engagement,
                hasBookmarked: !post.engagement.hasBookmarked
              }
            }
          : post
      )
    }));
  }, []);

  const handleShare = useCallback((postId: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'HIVE Post',
        url: `${window.location.origin}/post/${postId}`
      }).catch(() => {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    }
  }, []);

  const toggleExpanded = useCallback((postId: string) => {
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

  const formatTimeAgo = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  }, []);

  const refreshFeed = useCallback(() => {
    setFeedState(prev => ({ ...prev, posts: [], hasMore: true }));
  }, []);

  if (feedState.error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <User className="h-6 w-6 text-[var(--hive-text-inverse)]" />
          </div>
          <p className="text-[var(--hive-text-inverse)] mb-2">Failed to load feed</p>
          <p className="text-red-400 text-sm">{feedState.error}</p>
          <ButtonEnhanced 
            onClick={refreshFeed} 
            className="mt-4 bg-hive-gold text-hive-obsidian"
          >
            Try Again
          </ButtonEnhanced>
        </div>
      </div>
    );
  }

  if (feedState.isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-hive-surface-elevated rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-hive-surface-elevated rounded" />
                <div className="h-3 w-24 bg-hive-surface-elevated rounded" />
                <div className="space-y-2 mt-4">
                  <div className="h-4 w-full bg-hive-surface-elevated rounded" />
                  <div className="h-4 w-3/4 bg-hive-surface-elevated rounded" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-hive-text-primary">
          {feedType === 'home' ? 'Your Feed' : 
           feedType === 'space' ? 'Space Feed' : 
           'Profile Posts'}
        </h2>
        <div className="flex items-center space-x-2">
          <ButtonEnhanced
            variant="outline"
            size="sm"
            onClick={() => setShowComposerModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Post
          </ButtonEnhanced>
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {feedState.posts.map((post) => {
          const isExpanded = expandedPosts.has(post.id);
          const shouldTruncate = post.content.length > 300;
          const displayContent = shouldTruncate && !isExpanded 
            ? post.content.slice(0, 300) + '...' 
            : post.content;

          return (
            <Card key={post.id} className="p-6 hover:bg-hive-background-interactive transition-colors">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-hive-obsidian">
                      {post.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-hive-text-primary">
                        {post.author.name}
                      </h3>
                      {post.author.isVerified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <User className="h-2 w-2 text-[var(--hive-text-inverse)]" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-hive-text-secondary">
                      {post.author.handle} • {formatTimeAgo(post.createdAt)}
                    </p>
                  </div>
                </div>
                <ButtonEnhanced variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </ButtonEnhanced>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-hive-text-primary whitespace-pre-wrap">
                  {displayContent}
                </p>
                {shouldTruncate && (
                  <ButtonEnhanced
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => toggleExpanded(post.id)}
                  >
                    {isExpanded ? 'Show less' : 'Show more'}
                  </ButtonEnhanced>
                )}
              </div>

              {/* Post Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-hive-gold/20 text-hive-gold"
                    >
                      <Hash className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Engagement Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-hive-border-subtle">
                <div className="flex items-center space-x-6">
                  <ButtonEnhanced
                    variant="outline"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.engagement.hasLiked ? '!text-red-400 !border-red-400' : ''}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.engagement.hasLiked ? 'fill-current' : ''}`} />
                    {post.engagement.likes}
                  </ButtonEnhanced>
                  <ButtonEnhanced variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.engagement.comments}
                  </ButtonEnhanced>
                  <ButtonEnhanced
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare(post.id)}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    {post.engagement.shares}
                  </ButtonEnhanced>
                </div>
                <ButtonEnhanced
                  variant="outline"
                  size="sm"
                  onClick={() => handleBookmark(post.id)}
                  className={post.engagement.hasBookmarked ? '!text-hive-gold !border-hive-gold' : ''}
                >
                  <Bookmark className={`h-4 w-4 ${post.engagement.hasBookmarked ? 'fill-current' : ''}`} />
                </ButtonEnhanced>
              </div>
            </Card>
          );
        })}

        {/* Load More */}
        {feedState.hasMore && (
          <div ref={loadMoreRef} className="text-center py-8">
            {feedState.isLoadingMore ? (
              <div className="flex items-center justify-center">
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                <span>Loading more posts...</span>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-hive-text-secondary">You&apos;ve reached the end!</p>
                <ButtonEnhanced
                  variant="outline"
                  size="sm"
                  onClick={refreshFeed}
                  className="mt-2"
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Back to Top
                </ButtonEnhanced>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}