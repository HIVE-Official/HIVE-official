"use client";

/**
 * Feed Page V2
 * Uses CQRS pattern and real-time updates
 */

import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card, Badge } from '@hive/ui';
import { useAuth } from "@hive/auth-logic";
import {
  Activity,
  Users,
  TrendingUp,
  Heart,
  Bell,
  Settings,
  Globe,
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { FeedErrorBoundary } from '@/components/error-boundaries';
import { PostCard } from '@/components/social/post-card';
import { RitualStoriesStrip } from '@/components/feed/ritual-stories-strip';
import { useRealtimeFeed } from '@/hooks/use-realtime-feed-v2';
import { useToast } from '@/hooks/use-toast';
import { useFeedConfig } from '@/lib/feed-config';

export default function FeedPageV2() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAuthenticated = !!user;
  const [feedFilter, setFeedFilter] = useState<'all' | 'my_spaces' | 'trending' | 'events' | 'rituals'>('all');

  // Feed Configuration
  const { config: feedConfig } = useFeedConfig();

  // Use real-time feed with CQRS
  const {
    feed,
    loading,
    error,
    refresh,
    loadMore,
    hasMore,
    isRealtime
  } = useRealtimeFeed({
    filter: feedFilter,
    limitCount: 20,
    autoRefresh: true,
    refreshInterval: 30000 // Auto-refresh every 30 seconds
  });

  // Track user engagement
  const [engagementStartTime] = useState<number>(Date.now());
  const [hasEngaged, setHasEngaged] = useState(false);

  // Handle post interactions
  const handleLike = useCallback(async (postId: string) => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to like posts',
        variant: 'destructive'
      });
      return;
    }

    if (!hasEngaged) {
      setHasEngaged(true);
      const engagementTime = Date.now() - engagementStartTime;
    }

    // TODO: Implement like action with CQRS command
    toast({
      title: 'Post liked!',
      description: 'Your reaction has been recorded'
    });
  }, [user, hasEngaged, engagementStartTime, toast]);

  const handleComment = useCallback(async (postId: string, content: string) => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to comment',
        variant: 'destructive'
      });
      return;
    }

    // TODO: Implement comment action with CQRS command
    toast({
      title: 'Comment added!',
      description: 'Your comment has been posted'
    });
  }, [user, toast]);

  const handleShare = useCallback(async (postId: string) => {
    if (!user?.uid) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to share posts',
        variant: 'destructive'
      });
      return;
    }

    // TODO: Implement share action with CQRS command
    toast({
      title: 'Post shared!',
      description: 'The post has been shared to your profile'
    });
  }, [user, toast]);

  // Show authentication required state
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center p-6">
        <Card className="p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-hive-surface-elevated rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-hive-text-secondary" />
          </div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
            Sign In Required
          </h3>
          <p className="text-hive-text-secondary mb-4">
            Join HIVE to see what's happening on campus
          </p>
          <Button
            onClick={() => window.location.href = '/auth/login'}
            className="bg-[var(--hive-brand-primary)] text-hive-obsidian hover:bg-hive-champagne"
          >
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  // Show error state
  if (error && feed.length === 0) {
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
            We're having trouble loading your feed. Please try again.
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

  // Show loading state
  if (loading && feed.length === 0) {
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
        {/* Rituals Strip (if enabled) */}
        {feedConfig?.features?.ritualsEnabled && (
          <RitualStoriesStrip
            rituals={[]}  // TODO: Load rituals
            onRitualClick={(ritual) => window.location.href = `/rituals/${ritual.id}`}
          />
        )}

        {/* Header */}
        <div className="border-b border-hive-border bg-hive-surface">
          <div className="max-w-2xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-hive-text-primary flex items-center">
                  <Activity className="h-6 w-6 mr-2" />
                  Campus Feed
                  {isRealtime && (
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">
                      LIVE
                    </Badge>
                  )}
                </h1>
                <p className="text-hive-text-secondary text-sm">
                  Real-time campus activity and updates
                </p>
              </div>
              <Button
                onClick={refresh}
                variant="ghost"
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            {/* Feed Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Button
                variant={feedFilter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFeedFilter('all')}
              >
                <Globe className="h-3 w-3 mr-1" />
                All
              </Button>
              <Button
                variant={feedFilter === 'my_spaces' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFeedFilter('my_spaces')}
              >
                <Users className="h-3 w-3 mr-1" />
                My Spaces
              </Button>
              <Button
                variant={feedFilter === 'trending' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFeedFilter('trending')}
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Button>
              <Button
                variant={feedFilter === 'events' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFeedFilter('events')}
              >
                <Heart className="h-3 w-3 mr-1" />
                Events
              </Button>
              <Button
                variant={feedFilter === 'rituals' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setFeedFilter('rituals')}
              >
                <Bell className="h-3 w-3 mr-1" />
                Rituals
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-6">
          <div className="space-y-6">
            {/* Info Card */}
            <Card className="p-4 bg-hive-surface-elevated border-hive-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--hive-brand-primary)]/20 rounded-full flex items-center justify-center">
                  <Activity className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                </div>
                <div>
                  <p className="text-sm text-hive-text-secondary">
                    Posts from your spaces appear here when they gain traction. Create in spaces to reach campus!
                  </p>
                </div>
              </div>
            </Card>

            {/* Feed Posts */}
            {feed.length === 0 ? (
              <Card className="p-12 text-center">
                <Activity className="h-12 w-12 text-hive-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
                <p className="text-hive-text-secondary mb-4">
                  Join spaces to see posts in your feed
                </p>
                <Button
                  onClick={() => window.location.href = '/spaces/browse'}
                  className="bg-[var(--hive-brand-primary)] text-hive-obsidian"
                >
                  Browse Spaces
                </Button>
              </Card>
            ) : (
              <>
                {feed.map((item) => (
                  <PostCard
                    key={item.id}
                    post={{
                      id: item.id,
                      content: item.content.text,
                      author: {
                        id: item.content.authorId,
                        name: item.content.authorName,
                        handle: item.content.authorHandle,
                        avatar: item.content.authorAvatar
                      },
                      createdAt: item.createdAt.toISOString(),
                      likes: item.engagement.reactions,
                      comments: item.engagement.comments,
                      shares: item.engagement.reposts,
                      isPromoted: item.isPromoted,
                      spaceName: item.spaceName,
                      mediaUrls: item.content.mediaUrls
                    }}
                    currentUserId={user.uid}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                    showComments={true}
                  />
                ))}

                {/* Load More */}
                {hasMore && (
                  <div className="text-center py-4">
                    <Button
                      variant="secondary"
                      onClick={loadMore}
                      disabled={loading}
                      className="w-full max-w-xs"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Load More'
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </FeedErrorBoundary>
  );
}