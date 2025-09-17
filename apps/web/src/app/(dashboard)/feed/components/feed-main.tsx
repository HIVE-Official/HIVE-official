"use client";

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  Search, 
  Settings,
  MessageSquare,
  Zap,
  Calendar,
  Users,
  Wrench,
  Heart,
  Share,
  MessageCircle,
  Eye,
  Pin,
  Bookmark,
  MapPin,
  Bell,
  Activity,
  Target,
  Award,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

// HIVE UI Components
import { 
  Button, 
  Card, CardContent, CardHeader, CardTitle,
  Badge,
  Input,
  Avatar, AvatarFallback, AvatarImage,
  useUnifiedAuth
} from '@hive/ui';
import { useFeedSync, useRealtimeNotifications } from '@/hooks/use-cross-slice-sync';

// Types
interface FeedPost {
  id: string;
  type: 'post' | 'tool_share' | 'event' | 'space_update' | 'collaboration' | 'achievement';
  userId: string;
  userName: string;
  userHandle: string;
  userAvatar?: string;
  spaceId?: string;
  spaceName?: string;
  spaceCategory?: string;
  content: {
    text?: string;
    title?: string;
    description?: string;
    mediaUrl?: string;
    toolId?: string;
    toolName?: string;
    eventId?: string;
    eventName?: string;
    eventDate?: string;
    achievement?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  interactions: {
    liked: boolean;
    bookmarked: boolean;
    shared: boolean;
  };
  timestamp: string;
  isPromoted?: boolean;
  isPinned?: boolean;
  tags?: string[];
}

interface CampusEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  spaceId: string;
  spaceName: string;
  attendeeCount: number;
  isUserAttending: boolean;
  category: 'academic' | 'social' | 'career' | 'wellness';
}

interface TrendingTool {
  id: string;
  name: string;
  category: string;
  deployments: number;
  rating: number;
  recentUse: string;
}

interface FeedStats {
  todayPosts: number;
  activeSpaces: number;
  toolsShared: number;
  upcomingEvents: number;
  campusActivity: number;
  unreadNotifications: number;
}

export function FeedMain() {
  const { user } = useUnifiedAuth();
  const router = useRouter();
  
  // Real-time feed synchronization
  const { 
    isInitialized: feedSyncInitialized,
    feedUpdates,
    socialActivity: _socialActivity,
    announceSocialActivity
  } = useFeedSync();
  
  const { notifications: _notifications, unreadCount } = useRealtimeNotifications();
  
  const [isLoading, setIsLoading] = useState(true);
  const [_activeTab, _setActiveTab] = useState<'all' | 'following' | 'spaces' | 'events'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  // State for feed content
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [campusEvents, _setCampusEvents] = useState<CampusEvent[]>([]);
  const [trendingTools, _setTrendingTools] = useState<TrendingTool[]>([]);
  const [feedStats, setFeedStats] = useState<FeedStats>({
    todayPosts: 0,
    activeSpaces: 0,
    toolsShared: 0,
    upcomingEvents: 0,
    campusActivity: 0,
    unreadNotifications: 0
  });

  // Load feed data on component mount
  useEffect(() => {
    const loadFeedData = async () => {
      try {
        setIsLoading(true);

        // Fetch real feed data from API
        const response = await fetch('/api/feed', {
          headers: {
            'Authorization': `Bearer ${(user as any)?.token || 'test-token'}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const posts = data.posts || [];
          
          // Transform API response to feed format
          const transformedPosts: FeedPost[] = posts.map((post: any) => ({
            id: post.id,
            type: 'post',
            userId: post.authorId || post.author?.id || 'unknown',
            userName: post.author?.fullName || post.author?.name || 'Unknown User',
            userHandle: post.author?.handle || '@unknown',
            userAvatar: post.author?.photoURL || post.author?.avatar,
            spaceId: post._metadata?.spaceId,
            spaceName: post._metadata?.spaceName || 'Unknown Space',
            spaceCategory: post.spaceCategory || 'General',
            content: {
              text: post.content,
              title: post.title
            },
            stats: {
              likes: post.reactions?.heart || 0,
              comments: post.commentCount || 0,
              shares: 0,
              views: 0
            },
            interactions: {
              liked: false,
              bookmarked: false,
              shared: false
            },
            timestamp: post.createdAt ? new Date(post.createdAt).toLocaleString() : 'Unknown',
            isPinned: post.isPinned,
            tags: post.tags || []
          }));
          
          setFeedPosts(transformedPosts);
          setFeedStats(prev => ({ 
            ...prev, 
            todayPosts: transformedPosts.length,
            activeSpaces: data.analytics?.totalMemberships || 0,
            toolsShared: 0,
            upcomingEvents: 0
          }));
        } else {
          logger.error('Failed to fetch feed data');
          setFeedPosts([]);
        }
      } catch (error) {
        logger.error('Error loading feed:', { error: String(error) });
        setFeedPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadFeedData();
    }
  }, [user]);

  // Update feed stats from real-time data
  useEffect(() => {
    if (feedSyncInitialized && feedUpdates.length > 0) {
      setFeedStats(prev => ({
        ...prev,
        campusActivity: feedUpdates.length,
        unreadNotifications: unreadCount
      }));
    }
  }, [feedSyncInitialized, feedUpdates, unreadCount]);

  const handleLikePost = async (postId: string) => {
    setFeedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? {
              ...post,
              stats: { ...post.stats, likes: post.interactions.liked ? post.stats.likes - 1 : post.stats.likes + 1 },
              interactions: { ...post.interactions, liked: !post.interactions.liked }
            }
          : post
      )
    );

    // Announce social activity
    const post = feedPosts.find(p => p.id === postId);
    if (post) {
      await announceSocialActivity({
        type: 'like',
        contentId: postId,
        contentPreview: post.content.title || post.content.text?.substring(0, 100),
        spaceId: post.spaceId,
        targetUserId: post.userId
      });
    }
  };

  const handleBookmarkPost = async (postId: string) => {
    setFeedPosts(prev => 
      prev.map(post => 
        post.id === postId 
          ? { ...post, interactions: { ...post.interactions, bookmarked: !post.interactions.bookmarked } }
          : post
      )
    );
  };

  const handleSharePost = async (postId: string) => {
    const post = feedPosts.find(p => p.id === postId);
    if (post) {
      // Copy link to clipboard
      const shareUrl = `${window.location.origin}/feed/post/${postId}`;
      await navigator.clipboard?.writeText(shareUrl);
      
      // Update share count
      setFeedPosts(prev => 
        prev.map(p => 
          p.id === postId 
            ? { 
                ...p, 
                stats: { ...p.stats, shares: p.stats.shares + 1 },
                interactions: { ...p.interactions, shared: true }
              }
            : p
        )
      );

      // Announce social activity
      await announceSocialActivity({
        type: 'comment', // Using comment type for sharing activity
        contentId: postId,
        contentPreview: post.content.title || post.content.text?.substring(0, 100),
        spaceId: post.spaceId
      });
    }
  };

  const renderFeedPost = (post: FeedPost) => {
    const getPostIcon = () => {
      switch (post.type) {
        case 'tool_share': return <Wrench className="h-4 w-4 text-green-400" />;
        case 'event': return <Calendar className="h-4 w-4 text-[var(--hive-gold)]" />;
        case 'space_update': return <Users className="h-4 w-4 text-blue-400" />;
        case 'collaboration': return <Target className="h-4 w-4 text-[var(--hive-gold)]" />;
        case 'achievement': return <Award className="h-4 w-4 text-[var(--hive-gold)]" />;
        default: return <MessageCircle className="h-4 w-4 text-muted-foreground" />;
      }
    };

    const getPostTypeLabel = () => {
      switch (post.type) {
        case 'tool_share': return 'shared a tool';
        case 'event': return 'created an event';
        case 'space_update': return 'updated space';
        case 'collaboration': return 'looking for collaborators';
        case 'achievement': return 'achieved milestone';
        default: return 'posted';
      }
    };

    return (
      <motion.div
        key={post.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className={`hover:border-accent/50 transition-all ${
          post.isPinned ? 'border-[var(--hive-gold)]/30 bg-[var(--hive-gold)]/5' : ''
        } ${post.isPromoted ? 'border-accent/30 bg-accent/5' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.userAvatar} />
                <AvatarFallback>{post.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {getPostIcon()}
                  <span className="font-medium text-foreground">{post.userName}</span>
                  <span className="text-sm text-muted-foreground">{getPostTypeLabel()}</span>
                  {post.isPinned && <Pin className="h-3 w-3 text-[var(--hive-gold)]" />}
                  {post.isPromoted && <TrendingUp className="h-3 w-3 text-accent" />}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>@{post.userHandle}</span>
                  {post.spaceName && (
                    <>
                      <span>•</span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                        post.spaceCategory === 'UNI' ? 'bg-blue-500/20 text-blue-400' :
                        post.spaceCategory === 'REZ' ? 'bg-green-500/20 text-green-400' :
                        'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]'
                      }`}>
                        {post.spaceCategory}
                        <span>{post.spaceName}</span>
                      </span>
                    </>
                  )}
                  <span>•</span>
                  <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Post Content */}
            <div className="space-y-3">
              {post.content.title && (
                <h3 className="font-medium text-foreground">{post.content.title}</h3>
              )}
              
              {post.content.text && (
                <p className="text-foreground leading-relaxed">{post.content.text}</p>
              )}

              {/* Tool/Event/Achievement Cards */}
              {post.content.toolName && (
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-foreground">{post.content.toolName}</span>
                  </div>
                  {post.content.description && (
                    <p className="text-sm text-muted-foreground">{post.content.description}</p>
                  )}
                </div>
              )}

              {post.content.eventName && (
                <div className="p-3 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-[var(--hive-gold)]" />
                    <span className="font-medium text-foreground">{post.content.eventName}</span>
                  </div>
                  {post.content.eventDate && (
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.content.eventDate).toLocaleDateString()} at{' '}
                      {new Date(post.content.eventDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              )}

              {post.content.achievement && (
                <div className="p-3 bg-gradient-to-r from-[var(--hive-gold)]/10 to-[var(--hive-gold)]/10 rounded-lg border border-[var(--hive-gold)]/20">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-[var(--hive-gold)]" />
                    <span className="font-medium text-foreground">{post.content.achievement}</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLikePost(post.id)}
                  className={post.interactions.liked ? 'text-red-400' : ''}
                >
                  <Heart className={`h-4 w-4 mr-1 ${post.interactions.liked ? 'fill-current' : ''}`} />
                  {post.stats.likes}
                </Button>
                
                <Button variant="ghost" size="sm" onClick={() => router.push(`/feed/post/${post.id}`)}>
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {post.stats.comments}
                </Button>
                
                <Button variant="ghost" size="sm" onClick={() => handleSharePost(post.id)}>
                  <Share className="h-4 w-4 mr-1" />
                  {post.stats.shares}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmarkPost(post.id)}
                  className={post.interactions.bookmarked ? 'text-accent' : ''}
                >
                  <Bookmark className={`h-4 w-4 ${post.interactions.bookmarked ? 'fill-current' : ''}`} />
                </Button>
                
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {post.stats.views}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  const filteredPosts = feedPosts.filter(post => {
    if (activeFilter !== 'all') {
      if (activeFilter === 'tools' && post.type !== 'tool_share') return false;
      if (activeFilter === 'events' && post.type !== 'event') return false;
      if (activeFilter === 'spaces' && post.type !== 'space_update') return false;
      if (activeFilter === 'achievements' && post.type !== 'achievement') return false;
    }
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return post.content.title?.toLowerCase().includes(searchLower) ||
             post.content.text?.toLowerCase().includes(searchLower) ||
             post.userName.toLowerCase().includes(searchLower) ||
             post.spaceName?.toLowerCase().includes(searchLower) ||
             post.tags?.some(tag => tag.toLowerCase().includes(searchLower));
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="h-4 w-16 bg-muted rounded animate-pulse mb-2" />
                <div className="h-6 w-8 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="h-32 bg-muted rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Campus Feed</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                University at Buffalo • Live Campus Activity
              </p>
            </div>
            
            {feedSyncInitialized && (
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400 font-medium">Live</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                  {unreadCount}
                </Badge>
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts, tools, events, people..."
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </motion.div>

      {/* Campus Stats Dashboard */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-[var(--hive-gold)] mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{feedStats.campusActivity}</div>
            <div className="text-xs text-muted-foreground">Campus Activity</div>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-6 w-6 text-blue-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{feedStats.todayPosts}</div>
            <div className="text-xs text-muted-foreground">Today's Posts</div>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{feedStats.activeSpaces}</div>
            <div className="text-xs text-muted-foreground">Active Spaces</div>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <Wrench className="h-6 w-6 text-[var(--hive-gold)] mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{feedStats.toolsShared}</div>
            <div className="text-xs text-muted-foreground">Tools Shared</div>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-pink-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{feedStats.upcomingEvents}</div>
            <div className="text-xs text-muted-foreground">Events This Week</div>
          </CardContent>
        </Card>

        <Card className="hover:border-accent/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
            <div className="text-lg font-bold text-foreground">{trendingTools.length}</div>
            <div className="text-xs text-muted-foreground">Trending Tools</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Filters */}
      <motion.div 
        className="flex items-center gap-2 overflow-x-auto pb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('all')}
        >
          All Posts
        </Button>
        <Button
          variant={activeFilter === 'tools' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('tools')}
          className="flex items-center gap-2"
        >
          <Wrench className="h-3 w-3" />
          Tools ({feedPosts.filter(p => p.type === 'tool_share').length})
        </Button>
        <Button
          variant={activeFilter === 'events' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('events')}
          className="flex items-center gap-2"
        >
          <Calendar className="h-3 w-3" />
          Events ({feedPosts.filter(p => p.type === 'event').length})
        </Button>
        <Button
          variant={activeFilter === 'spaces' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('spaces')}
          className="flex items-center gap-2"
        >
          <Users className="h-3 w-3" />
          Spaces ({feedPosts.filter(p => p.type === 'space_update').length})
        </Button>
        <Button
          variant={activeFilter === 'achievements' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('achievements')}
          className="flex items-center gap-2"
        >
          <Award className="h-3 w-3" />
          Achievements ({feedPosts.filter(p => p.type === 'achievement').length})
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="space-y-4">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery ? 'Try adjusting your search terms' : 'Be the first to share something with your campus community!'}
                      </p>
                      {!searchQuery && (
                        <Button onClick={() => router.push('/tools/builder')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Something
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map(renderFeedPost)}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-accent" />
                Trending Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTools.map((tool, _index) => (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => router.push(`/tools/${tool.id}`)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm text-foreground">{tool.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {tool.deployments} deployments • ★{tool.rating}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {tool.recentUse}
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push('/tools/browse')}>
                  View All Tools
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-[var(--hive-gold)]" />
                This Week's Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {campusEvents.map((event: any) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border border-border hover:border-accent/50 cursor-pointer transition-all"
                    onClick={() => router.push(`/events/${event.id}`)}
                  >
                    <div className="font-medium text-sm text-foreground mb-1">{event.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {event.date} at {event.time} • {event.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{event.attendeeCount} attending</span>
                      <Badge variant={event.isUserAttending ? "default" : "outline"} className="text-xs">
                        {event.isUserAttending ? 'Attending' : 'RSVP'}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push('/calendar')}>
                  View Calendar
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Zap className="h-4 w-4 text-accent" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push('/tools/builder')}>
                  <Wrench className="h-4 w-4 mr-2" />
                  Create Tool
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push('/spaces')}>
                  <Users className="h-4 w-4 mr-2" />
                  Discover Spaces
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => router.push('/calendar')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Plan Event
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}