"use client";

import React, { useState, useCallback } from 'react';
import { Button, Card, Badge, useAuth } from "@hive/ui";
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
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react';
import { ErrorBoundary } from '../../../components/error-boundary';
import { PostComposer } from '../../../components/social/post-composer';
import { PostCard } from '../../../components/social/post-card';
import { useFeed } from '../../../hooks/use-feed';

export default function FeedPage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const [feedFilter, setFeedFilter] = useState<'all' | 'following' | 'spaces' | 'academic'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');
  const [showComposer, setShowComposer] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Use the integrated feed hook
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

  // Placeholder functions for post actions
  const createPost = useCallback(async (postData: any) => {
    // TODO: Implement post creation API call
    
  }, []);

  const likePost = useCallback(async (postId: string) => {
    // TODO: Implement like API call
    
  }, []);

  const commentOnPost = useCallback(async (postId: string, comment: string) => {
    // TODO: Implement comment API call
    
  }, []);

  const sharePost = useCallback(async (postId: string) => {
    // TODO: Implement share API call
    
  }, []);

  // Handle post creation
  const handleCreatePost = useCallback(async (postData: {
    content: string;
    type: string;
    visibility: string;
    attachments: any[];
    mentions: string[];
    tags: string[];
    poll?: any;
    event?: any;
    location?: any;
  }) => {
    try {
      await createPost(postData);
      setShowComposer(false);
    } catch (error) {
      console.error('Failed to create post:', error);
      // Error handling is done by the hook
    }
  }, [createPost]);

  // Handle post interactions
  const handleLike = useCallback(async (postId: string) => {
    try {
      await likePost(postId);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  }, [likePost]);

  const handleComment = useCallback(async (postId: string, content: string) => {
    try {
      await commentOnPost(postId, content);
    } catch (error) {
      console.error('Failed to comment on post:', error);
    }
  }, [commentOnPost]);

  const handleShare = useCallback(async (postId: string) => {
    try {
      await sharePost(postId);
      // Show success message or handle share UI
    } catch (error) {
      console.error('Failed to share post:', error);
    }
  }, [sharePost]);



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
            className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
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
    <ErrorBoundary>
      <div className="min-h-screen bg-hive-background">
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
                  {lastUpdated && ` • Last updated ${lastUpdated.toLocaleTimeString()}`}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3 flex-wrap gap-2">
              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm bg-hive-background-tertiary border border-hive-border-default rounded px-3 py-1"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="trending">Trending</option>
              </select>
              
              {/* Feed Filter */}
              <div className="flex items-center bg-hive-background-overlay rounded-lg p-1">
                <Button
                  variant={feedFilter === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFeedFilter('all')}
                  className="text-xs"
                >
                  <Globe className="h-3 w-3 mr-1" />
                  All
                </Button>
                <Button
                  variant={feedFilter === 'following' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFeedFilter('following')}
                  className="text-xs"
                >
                  <Heart className="h-3 w-3 mr-1" />
                  Following
                </Button>
                <Button
                  variant={feedFilter === 'spaces' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFeedFilter('spaces')}
                  className="text-xs"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Spaces
                </Button>
                <Button
                  variant={feedFilter === 'academic' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFeedFilter('academic')}
                  className="text-xs"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Academic
                </Button>
              </div>
              
              {/* Feed Settings */}
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              
              {/* Notifications */}
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 bg-hive-gold text-hive-obsidian text-xs px-1 min-w-[16px] h-4">
                  3
                </Badge>
              </Button>
              
              {/* Create Post */}
              <Button 
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                onClick={() => setShowComposer(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-6">
      <div className="space-y-6">
        {/* Feed Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <Activity className="h-6 w-6 mx-auto mb-2 text-blue-400" />
            <div className="text-lg font-bold text-white">24</div>
            <div className="text-xs text-hive-text-mutedLight">Posts Today</div>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <Users className="h-6 w-6 mx-auto mb-2 text-green-400" />
            <div className="text-lg font-bold text-white">12</div>
            <div className="text-xs text-hive-text-mutedLight">Active Spaces</div>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-purple-400" />
            <div className="text-lg font-bold text-white">8</div>
            <div className="text-xs text-hive-text-mutedLight">Events Today</div>
          </Card>
          
          <Card className="p-4 text-center bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <Zap className="h-6 w-6 mx-auto mb-2 text-orange-400" />
            <div className="text-lg font-bold text-white">5</div>
            <div className="text-xs text-hive-text-mutedLight">New Tools</div>
          </Card>
        </div>

        {/* Post Composer */}
        {showComposer && (
          <Card className="p-4">
            <PostComposer
              user={{
                id: (user as any).uid || (user as any).id,
                name: user.fullName || 'User',
                handle: user.handle || 'user',
                avatarUrl: user.avatarUrl
              }}
              onPost={handleCreatePost}
              onCancel={() => setShowComposer(false)}
              placeholder="Share what's happening on campus..."
              maxLength={500}
              allowedTypes={['text', 'image', 'link', 'poll', 'event']}
            />
          </Card>
        )}

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
                    className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                  >
                    Browse Spaces
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowComposer(true)}
                  >
                    Create Post
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            feedPosts.map((post) => (
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
                currentUserId={(user as any).uid || (user as any).id}
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
                size="sm" 
                onClick={refresh}
                className="ml-auto"
              >
                Retry
              </Button>
            </div>
          </Card>
        )}
        </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}