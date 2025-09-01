"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  Filter, 
  TrendingUp,
  Clock,
  Star,
  Users
} from 'lucide-react';

// Components
import { PostCreator } from './post-creator';
import { PostDisplay } from './post-display';

// HIVE UI Components
import { 
  Button,
  Badge,
  Card,
  CardContent,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@hive/ui';

// Hooks
import { useUnifiedAuth } from '@hive/ui';

// Types
interface FeedDisplayProps {
  spaceId?: string;
  spaceName?: string;
  feedType?: 'all' | 'space' | 'following';
  showPostCreator?: boolean;
  maxPosts?: number;
}

interface Post {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
  };
  createdAt: string;
  type: string;
  visibility: string;
  spaceId?: string;
  spaceName?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isPinned?: boolean;
}

export function FeedDisplay({ 
  spaceId, 
  spaceName, 
  feedType = 'all',
  showPostCreator = true,
  maxPosts 
}: FeedDisplayProps) {
  const { user } = useUnifiedAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterType, setFilterType] = useState<'recent' | 'popular' | 'following'>('recent');

  // Load feed data
  useEffect(() => {
    const loadFeed = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API calls
        // const endpoint = spaceId ? `/api/spaces/${spaceId}/feed` : '/api/feed';
        // const response = await fetch(endpoint);
        // const data = await response.json();
        
        // Mock data for development
        const mockPosts = generateMockPosts(spaceId, spaceName);
        setPosts(maxPosts ? mockPosts.slice(0, maxPosts) : mockPosts);
        
      } catch (error) {
        console.error('Failed to load feed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeed();
  }, [spaceId, spaceName, feedType, filterType, maxPosts]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Reload data logic would go here
    setIsRefreshing(false);
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleLike = async (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newLiked = !post.isLiked;
          return {
            ...post,
            isLiked: newLiked,
            likes: newLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
    // TODO: Implement comment functionality
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
    // TODO: Implement share functionality
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading skeletons */}
        {Array.from({ length: 3 }, (_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-accent rounded-full animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-accent rounded animate-pulse" />
                    <div className="h-3 w-24 bg-accent rounded animate-pulse" />
                  </div>
                </div>
                <div className="h-4 w-full bg-accent rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-accent rounded animate-pulse" />
                <div className="flex space-x-4 pt-2">
                  <div className="h-8 w-16 bg-accent rounded animate-pulse" />
                  <div className="h-8 w-16 bg-accent rounded animate-pulse" />
                  <div className="h-8 w-16 bg-accent rounded animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Post Creator */}
      {showPostCreator && (
        <PostCreator 
          spaceId={spaceId}
          spaceName={spaceName}
          onPostCreated={handlePostCreated}
          compact={true}
        />
      )}

      {/* Feed Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            {posts.length} posts
          </Badge>
          {spaceId && (
            <Badge variant="secondary" className="text-xs">
              {spaceName}
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Filter Tabs */}
          <Tabs value={filterType} onValueChange={(value: any) => setFilterType(value)}>
            <TabsList className="h-9">
              <TabsTrigger value="recent" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="popular" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Popular
              </TabsTrigger>
              <TabsTrigger value="following" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                Following
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Refresh Button */}
          <ButtonEnhanced 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="h-9"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </ButtonEnhanced>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <PostDisplay
                post={post}
                currentUserId={user?.uid}
                onLike={handleLike}
                onComment={handleComment}
                onShare={handleShare}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {posts.length === 0 && !isLoading && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <div className="h-16 w-16 bg-accent rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {spaceId ? 'No posts in this space yet' : 'Your feed is empty'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {spaceId 
                      ? 'Be the first to share something with this community!' 
                      : 'Join some spaces or follow friends to see posts here'
                    }
                  </p>
                  {!spaceId && (
                    <ButtonEnhanced onClick={() => window.location.href = '/spaces'}>
                      Discover Spaces
                    </ButtonEnhanced>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {posts.length > 0 && posts.length >= (maxPosts || 20) && (
          <div className="text-center py-4">
            <ButtonEnhanced variant="outline">
              Load More Posts
            </ButtonEnhanced>
          </div>
        )}
      </div>
    </div>
  );
}

// Mock data generator for development
function generateMockPosts(spaceId?: string, spaceName?: string): Post[] {
  const mockAuthors = [
    { id: '1', name: 'Sarah Chen', handle: 'sarahc', avatar: undefined },
    { id: '2', name: 'Mike Rodriguez', handle: 'mikerod', avatar: undefined },
    { id: '3', name: 'Alex Kim', handle: 'alexk', avatar: undefined },
    { id: '4', name: 'Jessica Wu', handle: 'jessw', avatar: undefined },
    { id: '5', name: 'David Park', handle: 'davidp', avatar: undefined }
  ];

  const mockPosts = [
    {
      id: '1',
      content: spaceId ? 
        "Study session tomorrow at Lockwood Library 2nd floor, 2pm! Bringing snacks and practice problems for the midterm. Who's in? 📚" :
        "Just finished an amazing study session with my CS group. There's nothing like collaborative problem-solving! 💻✨",
      author: mockAuthors[0],
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      type: 'text',
      visibility: spaceId ? 'space' : 'public',
      spaceId,
      spaceName,
      likes: 12,
      comments: 3,
      shares: 1,
      isLiked: false,
      isPinned: false
    },
    {
      id: '2', 
      content: spaceId ?
        "Floor movie night this Friday at 8pm in the common room! We're watching Spider-Man. Bring blankets and your favorite snacks 🍿🎬" :
        "The Ellicott community is so welcoming! Already made 3 new friends just this week. College is amazing when you find your people 🏠💙",
      author: mockAuthors[1],
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      type: 'text',
      visibility: spaceId ? 'space' : 'public',
      spaceId,
      spaceName,
      likes: 8,
      comments: 5,
      shares: 2,
      isLiked: true,
      isPinned: false
    },
    {
      id: '3',
      content: spaceId ?
        "New member introduction! I'm a sophomore in Computer Engineering, love gaming and building robots. Excited to contribute to this community! 🤖" :
        "Built my first campus tool today - a GPA calculator that factors in UB's grading scale. Small wins but it feels amazing! 🚀",
      author: mockAuthors[2],
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      type: 'text',
      visibility: spaceId ? 'space' : 'public',
      spaceId,
      spaceName,
      likes: 15,
      comments: 7,
      shares: 0,
      isLiked: false,
      isPinned: false
    },
    {
      id: '4',
      content: spaceId ?
        "Weekly check-in: How's everyone doing with their projects? Remember office hours are Tuesday/Thursday 3-5pm. We're here to help! 💪" :
        "Shoutout to the Engineering community on HIVE! The collaborative spirit here is incredible. This is what college should feel like 🎓",
      author: mockAuthors[3],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      type: 'text',
      visibility: spaceId ? 'space' : 'public',
      spaceId,
      spaceName,
      likes: 6,
      comments: 2,
      shares: 1,
      isLiked: false,
      isPinned: spaceId ? true : false // Pin in spaces for announcements
    }
  ];

  return mockPosts;
}