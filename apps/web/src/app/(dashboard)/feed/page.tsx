"use client";

import { 
  PageContainer, 
  Button, 
  Card,
  SpaceFeed as _SpaceFeed,
  Badge
} from '@hive/ui';
import { 
  Activity, 
  Plus, 
  Filter as _Filter, 
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
  Eye as _Eye,
  Globe
} from 'lucide-react';
import { useSession } from '../../../hooks/use-session';
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

  // Mock feed data
  useEffect(() => {
    const mockPosts: FeedPost[] = [
      {
        id: '1',
        type: 'space_activity',
        author: {
          id: 'user-1',
          name: 'Sarah Chen',
          handle: 'sarah_cs',
          role: 'CS Junior'
        },
        space: {
          id: 'space-cs',
          name: 'CS Study Group',
          type: 'academic'
        },
        title: 'Algorithm Study Session Tomorrow',
        content: 'Hey everyone! We\'re having an intensive algorithm study session tomorrow at 6 PM in the library. We\'ll be covering dynamic programming and graph algorithms. Bring your laptops and questions! 💻',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        engagement: {
          likes: 24,
          comments: 8,
          shares: 3,
          bookmarks: 12
        },
        tags: ['algorithms', 'study-group', 'library'],
        isLiked: false,
        isBookmarked: true
      },
      {
        id: '2',
        type: 'tool',
        author: {
          id: 'user-2',
          name: 'Alex Rodriguez',
          handle: 'alex_builds',
          role: 'Builder'
        },
        title: 'New Tool: GPA Trend Analyzer',
        content: 'Just published a tool that helps you visualize your GPA trends across semesters and predict future performance based on current trajectory. Try it out and let me know what you think!',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        engagement: {
          likes: 45,
          comments: 12,
          shares: 18,
          bookmarks: 23
        },
        tags: ['gpa', 'analytics', 'tools'],
        media: {
          type: 'tool',
          metadata: { toolId: 'gpa-analyzer', category: 'academic' }
        },
        isLiked: true,
        isBookmarked: false
      },
      {
        id: '3',
        type: 'event',
        author: {
          id: 'user-3',
          name: 'Campus Events',
          handle: 'ub_events',
          role: 'Official'
        },
        space: {
          id: 'space-events',
          name: 'Campus Events',
          type: 'official'
        },
        title: 'Fall Career Fair - Next Week',
        content: 'The Fall Career Fair is happening next Tuesday-Thursday at the Student Union. Over 150 companies will be there, including Google, Microsoft, and local Buffalo startups. Register now!',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        engagement: {
          likes: 156,
          comments: 34,
          shares: 89,
          bookmarks: 234
        },
        tags: ['career-fair', 'jobs', 'networking'],
        media: {
          type: 'event',
          metadata: { eventId: 'fall-career-fair-2024', location: 'Student Union' }
        },
        isLiked: false,
        isBookmarked: true
      },
      {
        id: '4',
        type: 'post',
        author: {
          id: 'user-4',
          name: 'Maya Patel',
          handle: 'maya_premed',
          role: 'Pre-Med Senior'
        },
        space: {
          id: 'space-premed',
          name: 'Pre-Med Society',
          type: 'academic'
        },
        title: 'MCAT Study Strategy That Worked',
        content: 'After scoring 520 on the MCAT, here\'s the study strategy that worked for me: 1) Start with content review 2) Practice questions daily 3) Full-length tests weekly 4) Review mistakes thoroughly. Happy to answer questions!',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        engagement: {
          likes: 89,
          comments: 23,
          shares: 45,
          bookmarks: 67
        },
        tags: ['mcat', 'study-tips', 'pre-med'],
        isLiked: false,
        isBookmarked: false
      }
    ];
    
    setFeedPosts(mockPosts);
    setIsLoading(false);
  }, []);

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
              variant={feedFilter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFeedFilter('all')}
              className="text-xs"
            >
              <Globe className="h-3 w-3 mr-1" />
              All
            </Button>
            <Button
              variant={feedFilter === 'following' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFeedFilter('following')}
              className="text-xs"
            >
              <Heart className="h-3 w-3 mr-1" />
              Following
            </Button>
            <Button
              variant={feedFilter === 'spaces' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFeedFilter('spaces')}
              className="text-xs"
            >
              <Users className="h-3 w-3 mr-1" />
              Spaces
            </Button>
            <Button
              variant={feedFilter === 'academic' ? 'default' : 'ghost'}
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
          <Button className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
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

        {/* Feed Posts */}
        <div className="space-y-6">
          {feedPosts.map((post) => (
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
                        <Badge variant="outline" className="text-xs">
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
                      <Badge key={tag} variant="secondary" className="text-xs">
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
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="w-full max-w-md">
            Load More Posts
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}