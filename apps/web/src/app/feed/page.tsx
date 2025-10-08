"use client";

// Global analytics type declaration
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Card, Button, Badge } from '@hive/ui';
// TODO: SocialProofAccelerator not in @hive/ui
import { useAuth } from "@hive/auth-logic";
import {
  Activity,
  TrendingUp,
  Users,
  Zap,
  Heart,
  Bell,
  Settings,
  Globe,
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { FeedErrorBoundary } from '@/components/error-boundaries';
// PostComposer removed - Feed is READ-ONLY per SPEC.md
import { PostCard } from '@/components/social/post-card';
import { RitualStoriesStrip } from '@/components/feed/ritual-stories-strip';
import { RitualHorizontalCards } from '@/components/feed/ritual-horizontal-cards';
import { useFeed } from '@/hooks/use-feed';
import { useQuery } from '@tanstack/react-query';
import {
  toggleLikePost,
  addComment,
  sharePost as sharePostAction
} from '@/lib/feed-actions';
import { useToast } from '@hive/ui';
import { useFeedConfig } from '@/lib/feed-config';

// Fetch rituals data
async function fetchRituals(user: any, getAuthToken: () => Promise<string | null>) {
  if (!user) return { rituals: [], participation: [] };

  try {
    const authToken = await getAuthToken();
    const response = await fetch('/api/rituals', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    if (!response.ok) return { rituals: [], participation: [] };

    const data = await response.json();
    return {
      rituals: data.rituals || [],
      participation: data.participation || []
    };
  } catch (error) {
    return { rituals: [], participation: [] };
  }
}

export default function FeedPage() {
  const { user, getAuthToken } = useAuth();
  const { toast } = useToast();
  const isAuthenticated = !!user;
  const [feedFilter, setFeedFilter] = useState<'all' | 'following' | 'spaces' | 'academic'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  // Feed is READ-ONLY - no direct posting allowed per SPEC.md

  // Feed Configuration Integration
  const { config: feedConfig } = useFeedConfig();

  // Calculate user stats for feature gating
  // Panic-to-relief tracking: Core behavioral metric
  const [anxietyStartTime] = useState<number>(Date.now());
  const [hasFoundRelief, setHasFoundRelief] = useState(false);
  const [timeToRelief, setTimeToRelief] = useState<number | null>(null);

  // 70% Completion tracking for behavioral hook
  const [scrollDepth, setScrollDepth] = useState(0);
  const [engagementActions, setEngagementActions] = useState(0);
  const [sessionStartTime] = useState<number>(Date.now());
  const [hasReached70Percent, setHasReached70Percent] = useState(false);

  // Feed is READ-ONLY - removed posting permission checks

  // Fetch rituals data (only if enabled in config)
  const { data: ritualsData } = useQuery({
    queryKey: ['rituals', user?.id],
    queryFn: () => fetchRituals(user, getAuthToken || (() => Promise.resolve(null))),
    staleTime: 300000, // 5 minutes
    enabled: isAuthenticated && !!user && feedConfig?.features?.ritualsEnabled !== false,
  });

  const rituals = useMemo(() => ritualsData?.rituals ?? [], [ritualsData?.rituals]);
  const participation = useMemo(() => ritualsData?.participation ?? [], [ritualsData?.participation]);

  // Transform rituals for horizontal cards if needed
  const ritualCards = useMemo(() => {
    if (!feedConfig?.activeRitual?.displayMode || !rituals.length) return [];

    return rituals.map((ritual: any) => ({
      id: ritual.id,
      type: ritual.status === 'active' ? 'active' : ritual.status === 'upcoming' ? 'upcoming' : 'completed',
      title: ritual.title,
      subtitle: ritual.subtitle,
      description: ritual.description,
      backgroundColor: ritual.color || '#6366f1',
      accentColor: ritual.accentColor || '#4f46e5',
      icon: ritual.icon || 'trophy',
      status: ritual.status,
      timeRemaining: ritual.endDate,
      participantCount: ritual.participantCount || 0,
      progress: ritual.progress ? {
        current: ritual.progress.current,
        target: ritual.progress.target,
        percentage: Math.round((ritual.progress.current / ritual.progress.target) * 100),
        label: ritual.progress.label
      } : undefined,
      leaderboard: ritual.leaderboard,
      milestones: ritual.milestones,
      primaryAction: {
        label: 'View Details',
        onClick: () => window.location.href = `/rituals/${ritual.id}`,
        variant: ritual.status === 'active' ? 'gold' : 'default'
      }
    }));
  }, [rituals, feedConfig]);

  // Use the integrated feed hook FIRST (before using refresh in callbacks)
  const {
    posts: feedPosts,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    loadMore,
    refresh,
  } = useFeed({
    limit: 20,
    sortBy,
    types: feedFilter === 'all' ? undefined : [feedFilter === 'following' ? 'text' : feedFilter === 'spaces' ? 'tool' : feedFilter],
  });

  // Feed is READ-ONLY - posts can only be created within spaces, then promoted to feed

  const likePost = useCallback(async (postId: string) => {
    if (!user?.id) {
      toast({ title: 'Please sign in to like posts', variant: 'error' });
      return;
    }

    try {
      const _isLiked = await toggleLikePost(user.id, postId);
      // Optimistically update UI can be handled by the PostCard component
    } catch (error) {
      toast({ title: 'Failed to update like', variant: 'error' });
    }
  }, [user, toast]);

  const commentOnPost = useCallback(async (postId: string, content: string) => {
    if (!user?.id) {
      toast({ title: 'Please sign in to comment', variant: 'error' });
      return;
    }

    try {
      const comment = await addComment(user.id, postId, content);
      toast({ title: 'Comment added!', variant: 'success' });
      return comment;
    } catch (error) {
      toast({ title: 'Failed to add comment', variant: 'error' });
      throw error;
    }
  }, [user, toast]);

  const sharePost = useCallback(async (postId: string, message?: string) => {
    if (!user?.id) {
      toast({ title: 'Please sign in to share posts', variant: 'error' });
      return;
    }

    try {
      const share = await sharePostAction(user.id, postId, undefined, message);
      toast({ title: 'Post shared!', variant: 'success' });
      refresh(); // Refresh feed to show shared post
      return share;
    } catch (error) {
      toast({ title: 'Failed to share post', variant: 'error' });
      throw error;
    }
  }, [user, toast, refresh]);

  // Feed is READ-ONLY - removed post creation handler

  // Track relief moment - this is when the user finds what they needed
  const trackReliefMoment = useCallback((action: string) => {
    if (!hasFoundRelief && anxietyStartTime) {
      const reliefTime = Date.now() - anxietyStartTime;
      setHasFoundRelief(true);
      setTimeToRelief(reliefTime);

      // Log behavioral metric

      // Send to analytics (ready for production analytics service)
      if (window.gtag) {
        window.gtag('event', 'panic_to_relief', {
          event_category: 'behavioral_metrics',
          event_label: action,
          value: reliefTime,
          custom_dimensions: {
            time_seconds: reliefTime / 1000,
            success: reliefTime < 10000, // Under 10 seconds is success
            feed_filter: feedFilter,
            sort_by: sortBy
          }
        });
      }
    }
  }, [hasFoundRelief, anxietyStartTime, feedFilter, sortBy]);

  // Handle post interactions with relief tracking
  const handleLike = useCallback(async (postId: string) => {
    trackReliefMoment('like_post');
    try {
      await likePost(postId);
    } catch (error) {
      // Intentionally suppressed - non-critical error
    }
  }, [likePost, trackReliefMoment]);

  const handleComment = useCallback(async (postId: string, content: string) => {
    trackReliefMoment('comment_post');
    try {
      await commentOnPost(postId, content);
    } catch (error) {
      // Intentionally suppressed - non-critical error
    }
  }, [commentOnPost, trackReliefMoment]);

  const handleShare = useCallback(async (postId: string) => {
    trackReliefMoment('share_post');
    try {
      await sharePost(postId);
      // Show success message or handle share UI
    } catch (error) {
      // Intentionally suppressed - non-critical error
    }
  }, [sharePost, trackReliefMoment]);

  // Handle ritual interactions
  const handleRitualClick = useCallback((ritual: any) => {
    trackReliefMoment('ritual_engagement');
    // Navigate to ritual detail page or show ritual modal
    window.location.href = `/rituals/${ritual.id}`;
  }, [trackReliefMoment]);

  // Track scroll depth for 70% completion metric
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = (scrolled / documentHeight) * 100;

      setScrollDepth(Math.max(scrollDepth, scrollPercentage));

      // Check if user reached 70% scroll depth
      if (!hasReached70Percent && scrollPercentage >= 70) {
        setHasReached70Percent(true);
        const sessionTime = Date.now() - sessionStartTime;


        // Track behavioral milestone
        if (window.gtag) {
          window.gtag('event', 'completion_milestone', {
            event_category: 'behavioral_metrics',
            event_label: '70_percent_scroll',
            value: sessionTime,
            custom_dimensions: {
              scroll_depth: 70,
              engagement_actions: engagementActions,
              time_to_relief: timeToRelief,
              session_duration: sessionTime / 1000
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDepth, hasReached70Percent, sessionStartTime, engagementActions, timeToRelief]);

  // Track engagement actions for completion quality
  useEffect(() => {
    setEngagementActions(prev => prev + 1);
  }, [feedFilter, sortBy]); // Count filter changes as engagement

  // Show authentication required state
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-hive-surface-elevated rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-hive-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
            Authentication Required
          </h3>
          <p className="text-hive-text-secondary">
            Please sign in to view your feed.
          </p>
        </Card>
      </div>
    );
  }

  // Show error state
  if (error && !feedPosts.length) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
            Failed to Load Feed
          </h3>
          <p className="text-hive-text-secondary mb-4">
            {error}
          </p>
          <Button 
            onClick={refresh}
            className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  if (isLoading && !feedPosts.length) {
    return (
      <div className="min-h-screen bg-hive-background p-6">
        <div className="max-w-2xl mx-auto space-y-6">
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
      </div>
    );
  }

  return (
    <FeedErrorBoundary>
      <div className="min-h-screen bg-hive-background">
        {/* Dynamic Ritual Display based on Configuration */}
        {feedConfig?.features?.ritualsEnabled && (
          <>
            {feedConfig?.activeRitual?.displayMode === 'stories' && (
              <RitualStoriesStrip
                rituals={rituals.map((ritual: any) => ({
                  ...ritual,
                  participation: participation.find((p: any) => p.ritualId === ritual.id)
                }))}
                onRitualClick={handleRitualClick}
              />
            )}
            {feedConfig?.activeRitual?.displayMode === 'cards' && (
              <RitualHorizontalCards
                cards={ritualCards}
                onCardClick={handleRitualClick}
                className="mb-6"
              />
            )}
            {feedConfig?.activeRitual?.displayMode === 'both' && (
              <>
                <RitualStoriesStrip
                  rituals={rituals.map((ritual: any) => ({
                    ...ritual,
                    participation: participation.find((p: any) => p.ritualId === ritual.id)
                  }))}
                  onRitualClick={handleRitualClick}
                />
                <RitualHorizontalCards
                  cards={ritualCards}
                  onCardClick={handleRitualClick}
                  className="mb-6"
                />
              </>
            )}
          </>
        )}

        {/* Header */}
        <div className="border-b border-hive-border bg-hive-surface">
          <div className="max-w-2xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-hive-text-primary flex items-center">
                  <Activity className="h-6 w-6 mr-2" />
                  Campus Feed
                </h1>
                <p className="text-hive-text-secondary text-sm">
                  Your personalized campus pulse and coordination center
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 flex-wrap gap-2">
              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy((e.target as any).value as any)}
                className="text-sm bg-hive-background-tertiary border border-hive-border-default rounded px-3 py-1"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
              
              {/* Feed Filter */}
              <div className="flex items-center bg-hive-background-overlay rounded-lg p-1">
                <Button
                  variant={feedFilter === 'all' ? 'default' : 'ghost'}
                  className="max-w-sm text-xs"
                  onClick={() => setFeedFilter('all')}
                >
                  <Globe className="h-3 w-3 mr-1" />
                  All
                </Button>
                <Button
                  variant={feedFilter === 'following' ? 'default' : 'ghost'}
                  className="max-w-sm text-xs"
                  onClick={() => setFeedFilter('following')}
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Following
                </Button>
                <Button
                  variant={feedFilter === 'spaces' ? 'default' : 'ghost'}
                  className="max-w-sm text-xs"
                  onClick={() => setFeedFilter('spaces')}
                >
                  <Users className="h-3 w-3 mr-1" />
                  Spaces
                </Button>
                <Button
                  variant={feedFilter === 'academic' ? 'default' : 'ghost'}
                  className="max-w-sm text-xs"
                  onClick={() => setFeedFilter('academic')}
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Academic
                </Button>
              </div>
              
              {/* Feed Settings */}
              <Button variant="outline" className="max-w-sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              {/* Notifications */}
 <Button variant="outline" className="max-w-sm relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 bg-[var(--hive-brand-primary)] text-hive-obsidian text-xs px-1 min-w-[16px] h-4">
                  3
                </Badge>
              </Button>
              
              {/* Feed is READ-ONLY - Create posts within spaces instead */}
              <Button
                onClick={() => window.location.href = '/spaces'}
                className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne min-h-[44px] px-6"
                title="Posts can only be created within spaces"
              >
                <Users className="h-4 w-4 mr-2" />
                Go to Spaces
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-6">
      <div className="space-y-6">
        {/* Feed Stats */}
        {/* Social Proof Accelerator - TODO: Create component */}
        {/* <SocialProofAccelerator
          variant="dashboard"
          showTrending={true}
          showAttractive={true}
          showInsider={true}
          className="mb-8"
        /> */}

        {/* Feed is READ-ONLY - Posts are promoted from spaces automatically or manually */}
        <Card className="p-4 mb-6 bg-hive-surface-elevated border-hive-border">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="h-4 w-4 text-[var(--hive-brand-primary)]" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-hive-text-primary text-sm mb-1">
                Campus Feed is Read-Only
              </h4>
              <p className="text-xs text-hive-text-secondary">
                Posts appear here when they gain traction in spaces or are promoted by leaders.
                Create content in your spaces to potentially reach the entire campus!
              </p>
            </div>
          </div>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.length === 0 && !isLoading ? (
            <Card className="p-12 text-center bg-hive-background-overlay border-hive-border-default">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Posts Yet</h3>
                <p className="text-hive-text-mutedLight mb-6">
                  {feedFilter === 'all' 
                    ? 'Your campus feed will show activity from your spaces, tools, and community. Join some spaces to get started!'
                    : `No ${feedFilter} posts found. Try changing your filter or create a new post.`
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={() => window.location.href = '/spaces/browse'}
                    className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
                  >
                    Browse Spaces
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.location.href = '/spaces'}
                  >
                    View Your Spaces
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            feedPosts.map((post: any) => (
              <PostCard
                key={post.id}
                post={{
                  ...post,
                  author: {
                    ...post.author,
                    name: post.author.name || 'Unknown User',
                    handle: post.author.handle || 'unknown'
                  }
                }}
                currentUserId={(user as any)?.id || (user as any)?.id || ''}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
                showComments={true}
              />
            ))
          )}
        </div>

        {/* Load More */}
        {hasMore && feedPosts.length > 0 && (
          <div className="text-center py-8">
            {isLoadingMore ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Loading more posts...</span>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={isLoadingMore}
                className="w-full max-w-md"
              >
                Load More Posts
              </Button>
            )}
          </div>
        )}

        {/* Error display for ongoing errors */}
        {error && feedPosts.length > 0 && (
          <Card className="p-4 bg-red-500/10 border-red-500/20">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
              <Button 
                variant="outline" 
                className="max-w-sm ml-auto" 
                onClick={refresh}
                
              >
                Retry
              </Button>
            </div>
          </Card>
        )}
        </div>
        </div>
      </div>
    </FeedErrorBoundary>
  );
}
