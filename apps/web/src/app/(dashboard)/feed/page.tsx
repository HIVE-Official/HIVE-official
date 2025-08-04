"use client";

import { Button, Card, Badge } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { 
  Activity, 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar, 
  Zap,
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  Bell,
  Settings,
  Globe
} from 'lucide-react';
import { useSession } from '../../../hooks/use-session';
import { ErrorBoundary } from '../../../components/error-boundary';
import { PostComposer } from '../../../components/social/post-composer';
import { useState, useEffect } from 'react';

// Mock data interfaces for campus feed
interface FeedPost {
  id: string;
  type: 'post' | 'event' | 'tool' | 'space_activity' | 'academic';
  author: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role?: string;
  };
  space?: {
    id: string;
    name: string;
    type: string;
  };
  title: string;
  content: string;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
  };
  tags?: string[];
  media?: {
    type: 'image' | 'video' | 'tool' | 'event';
    url?: string;
    metadata?: any;
  };
  isLiked?: boolean;
  isBookmarked?: boolean;
}

export default function FeedPage() {
  const { user: _user } = useSession();
  const [feedFilter, setFeedFilter] = useState<'all' | 'following' | 'spaces' | 'academic'>('all');
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showComposer, setShowComposer] = useState(false);

  // Helper functions for data transformation
  const mapContentTypeToFeedType = (contentType: string): FeedPost['type'] => {
    switch (contentType) {
      case 'tool_generated': return 'tool';
      case 'tool_enhanced': return 'tool';
      case 'space_event': return 'event';
      case 'builder_announcement': return 'post';
      default: return 'post';
    }
  };

  const extractTitleFromContent = (content: string): string => {
    if (!content) return 'Untitled Post';
    // Extract first line or first 60 characters as title
    const firstLine = content.split('\n')[0];
    return firstLine.length > 60 ? firstLine.substring(0, 60) + '...' : firstLine;
  };

  // Load real feed data from API
  useEffect(() => {
    const loadFeedData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from the real feed API
        const response = await fetch('/api/feed?' + new URLSearchParams({
          limit: '20',
          feedType: feedFilter === 'all' ? 'campus' : feedFilter === 'spaces' ? 'personal' : 'personal',
          refresh: 'false'
        }));
        
        if (!response.ok) {
          throw new Error('Failed to fetch feed');
        }
        
        const data = await response.json();
        
        if (data.success && data.posts) {
          // Transform API posts to FeedPost format
          const transformedPosts: FeedPost[] = data.posts.map((post: any) => ({
            id: post.id,
            type: mapContentTypeToFeedType(post._metadata?.contentType || post.type || 'post'),
            author: {
              id: post.authorId || post.author?.id || 'unknown',
              name: post.authorName || post.author?.name || 'Anonymous',
              handle: post.authorHandle || post.author?.handle || 'unknown',
              avatar: post.authorAvatar || post.author?.avatar,
              role: post.authorRole || post.author?.role
            },
            space: post._metadata?.spaceId ? {
              id: post._metadata.spaceId,
              name: post._metadata.spaceName || 'Unknown Space', 
              type: 'space'
            } : undefined,
            title: post.title || extractTitleFromContent(post.content),
            content: post.content || post.body || '',
            timestamp: post.createdAt || post.timestamp || new Date().toISOString(),
            engagement: {
              likes: post.reactions?.heart || post.engagement?.likes || 0,
              comments: post.reactions?.comments || post.engagement?.comments || 0,
              shares: post.reactions?.shares || post.engagement?.shares || 0,
              bookmarks: post.reactions?.bookmarks || post.engagement?.bookmarks || 0
            },
            tags: post.tags || [],
            media: post.media,
            isLiked: false, // TODO: Implement user-specific like status
            isBookmarked: false // TODO: Implement user-specific bookmark status
          }));
          
          setFeedPosts(transformedPosts);
        } else {
          // Fallback to empty state or error handling
          console.warn('Feed API returned no posts, showing empty state');
          setFeedPosts([]);
        }
      } catch (error) {
        console.error('Error loading feed:', error);
        // On error, show empty state rather than crash
        setFeedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeedData();
  }, [feedFilter]); // Reload when filter changes

  const handleLike = (postId: string) => {
    setFeedPosts(posts => posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            engagement: {
              ...post.engagement,
              likes: post.isLiked ? post.engagement.likes - 1 : post.engagement.likes + 1
            }
          }
        : post
    ));
  };

  const handleBookmark = (postId: string) => {
    setFeedPosts(posts => posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isBookmarked: !post.isBookmarked,
            engagement: {
              ...post.engagement,
              bookmarks: post.isBookmarked ? post.engagement.bookmarks - 1 : post.engagement.bookmarks + 1
            }
          }
        : post
    ));
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="h-4 w-4 text-blue-400" />;
      case 'tool': return <Zap className="h-4 w-4 text-purple-400" />;
      case 'space_activity': return <Users className="h-4 w-4 text-green-400" />;
      case 'academic': return <TrendingUp className="h-4 w-4 text-orange-400" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-blue-500';
      case 'tool': return 'bg-purple-500';
      case 'space_activity': return 'bg-green-500';
      case 'academic': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  if (isLoading) {
    return (
      <PageContainer title="Loading Feed..." maxWidth="2xl">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-white">Loading your campus feed...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
      title="Campus Feed"
      subtitle="Your personalized campus pulse and coordination center"
      breadcrumbs={[
        { label: "Feed", icon: Activity }
      ]}
      actions={
        <div className="flex items-center space-x-3">
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
      }
      maxWidth="2xl"
    >
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
          <PostComposer
            user={{
              id: 'current-user',
              name: 'Current User',
              handle: 'currentuser',
              avatarUrl: undefined
            }}
            onPost={async (postData) => {
              // TODO: Implement API call to create post
              console.log('Creating post:', postData);
              setShowComposer(false);
            }}
            onCancel={() => setShowComposer(false)}
            placeholder="Share what's happening on campus..."
          />
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
                  Your campus feed will show activity from your spaces, tools, and community. 
                  Join some spaces to get started!
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
            <Card key={post.id} className="p-6 bg-hive-background-overlay border-hive-border-default hover:bg-hive-background-interactive transition-all duration-200">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  {/* Post Type Indicator */}
                  <div className={`w-10 h-10 ${getPostTypeColor(post.type)} rounded-full flex items-center justify-center flex-shrink-0`}>
                    {getPostTypeIcon(post.type)}
                  </div>
                  
                  {/* Author & Space Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-white hover:text-hive-gold cursor-pointer transition-colors">
                        {post.author.name}
                      </h4>
                      <span className="text-hive-text-mutedLight text-sm">@{post.author.handle}</span>
                      {post.author.role && (
                        <Badge variant="tool-builder" className="text-xs">
                          {post.author.role}
                        </Badge>
                      )}
                    </div>
                    
                    {post.space && (
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-xs text-hive-text-mutedLight">in</span>
                        <span className="text-xs font-medium text-hive-gold hover:text-hive-champagne cursor-pointer transition-colors">
                          {post.space.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Timestamp */}
                <span className="text-xs text-hive-text-mutedLight flex-shrink-0">
                  {formatTimeAgo(post.timestamp)}
                </span>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                <p className="text-hive-text-mutedLight leading-relaxed">{post.content}</p>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="skill-tag" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Engagement Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-hive-border-default">
                <div className="flex items-center space-x-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`text-xs h-8 ${post.isLiked ? 'text-pink-400' : 'text-hive-text-mutedLight'} hover:text-pink-400 transition-colors`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.engagement.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-xs h-8 text-hive-text-mutedLight hover:text-blue-400 transition-colors">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.engagement.comments}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-xs h-8 text-hive-text-mutedLight hover:text-green-400 transition-colors">
                    <Share2 className="h-4 w-4 mr-2" />
                    {post.engagement.shares}
                  </Button>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`text-xs h-8 ${post.isBookmarked ? 'text-hive-gold' : 'text-hive-text-mutedLight'} hover:text-hive-gold transition-colors`}
                  onClick={() => handleBookmark(post.id)}
                >
                  <Bookmark className={`h-4 w-4 mr-2 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  {post.engagement.bookmarks}
                </Button>
              </div>
            </Card>
            ))
          )}
        </div>

        {/* Load More */}
        {feedPosts.length > 0 && (
          <div className="text-center">
            <Button 
              variant="outline" 
              className="w-full max-w-md"
              onClick={() => {
                // TODO: Implement pagination with cursor
                console.log('Load more posts');
              }}
            >
              Load More Posts
            </Button>
          </div>
        )}
      </div>
    </PageContainer>
    </ErrorBoundary>
  );
}