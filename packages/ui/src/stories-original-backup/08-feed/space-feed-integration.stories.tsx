import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SpaceFeed } from '../../components/feed/space-feed';
import { FeedComposer } from '../../components/feed/feed-composer';
import { PostCard } from '../../components/feed/post-card';
import { HiveButton } from '../../components/hive-button';
import { HiveBadge } from '../../components/hive-badge';
import { HiveCard } from '../../components/hive-card';
import { motion, AnimatePresence } from 'framer-motion';

const meta: Meta = {
  title: '08-Feed/Space Feed Integration',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Space Feed Integration

Complete feed experience within HIVE spaces, demonstrating how the feed components work together to create a seamless content creation and consumption experience.

## Feed Components

1. **Feed Composer** - Create new posts, questions, and content
2. **Post Cards** - Display individual posts with interactions
3. **Space Feed** - Infinite scroll feed with real-time updates
4. **Feed Filters** - Sort and filter content by type and relevance
5. **Moderation Tools** - Content moderation and management features

## Integration Features

- **Real-time Updates** - Live feed updates and notifications
- **Optimistic Updates** - Immediate UI feedback for actions
- **Infinite Scroll** - Seamless content loading
- **Rich Interactions** - Reactions, comments, sharing
- **Content Moderation** - Pin, hide, delete posts
- **Contextual Actions** - Role-based action availability

## When to Use

- **Space Interior** - Main content area of a space
- **Content Creation** - Member content creation workflows
- **Content Consumption** - Member content browsing experience
- **Moderation Workflows** - Builder content management
- **Real-time Collaboration** - Live community discussions
        `,
      },
    },
  },
};

export default meta;

// Mock data for feed integration
const mockUser = {
  id: 'user123',
  name: 'Alex Chen',
  email: 'alex.chen@stanford.edu',
  avatar: '/api/placeholder/40/40',
  role: 'builder',
};

const mockSpace = {
  id: 'space123',
  name: 'Stanford CS Study Group',
  memberCount: 156,
  isBuilder: true,
};

const mockPosts = [
  {
    id: 'post1',
    author: {
      id: 'user1',
      name: 'Sarah Miller',
      avatar: '/api/placeholder/40/40',
      role: 'builder',
    },
    content: '📚 Just uploaded the complete CS106B study guide with practice problems and solutions. Perfect for the upcoming midterm!',
    timestamp: new Date('2024-01-20T14:30:00'),
    type: 'text',
    reactions: { heart: 18, helpful: 12 },
    reactedUsers: { heart: [], helpful: [] },
    comments: [
      {
        id: 'comment1',
        author: { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
        content: 'This is exactly what I needed! Thank you so much!',
        timestamp: new Date('2024-01-20T14:35:00'),
      },
      {
        id: 'comment2',
        author: { name: 'Emily Davis', avatar: '/api/placeholder/32/32' },
        content: 'The practice problems are really helpful. Great resource!',
        timestamp: new Date('2024-01-20T14:40:00'),
      },
    ],
    isPinned: true,
    isEdited: false,
    tags: ['study-guide', 'cs106b', 'midterm'],
  },
  {
    id: 'post2',
    author: {
      id: 'user2',
      name: 'John Smith',
      avatar: '/api/placeholder/40/40',
      role: 'member',
    },
    content: 'Can someone explain the difference between DFS and BFS? I keep getting confused about when to use each one. Any visual examples would be super helpful!',
    timestamp: new Date('2024-01-20T13:45:00'),
    type: 'question',
    reactions: { heart: 5, helpful: 8 },
    reactedUsers: { heart: [], helpful: [] },
    comments: [
      {
        id: 'comment3',
        author: { name: 'Alex Chen', avatar: '/api/placeholder/32/32' },
        content: 'Great question! DFS goes deep first (think of exploring a maze by going as far as possible before backtracking), while BFS explores level by level (like ripples in a pond).',
        timestamp: new Date('2024-01-20T13:50:00'),
      },
    ],
    isPinned: false,
    isEdited: false,
    tags: ['algorithms', 'dfs', 'bfs', 'help-needed'],
  },
  {
    id: 'post3',
    author: {
      id: 'user3',
      name: 'Emily Davis',
      avatar: '/api/placeholder/40/40',
      role: 'member',
    },
    content: '🎯 Study session update: We\'ll be meeting tomorrow at 2 PM in the Gates Building, room 104. We\'ll focus on recursive algorithms and dynamic programming. Bring your laptops!',
    timestamp: new Date('2024-01-20T12:15:00'),
    type: 'event',
    reactions: { heart: 12, helpful: 6 },
    reactedUsers: { heart: [], helpful: [] },
    comments: [
      {
        id: 'comment4',
        author: { name: 'David Wilson', avatar: '/api/placeholder/32/32' },
        content: 'I\'ll be there! Should we prepare any specific problems beforehand?',
        timestamp: new Date('2024-01-20T12:20:00'),
      },
    ],
    isPinned: false,
    isEdited: false,
    tags: ['study-session', 'algorithms', 'dp'],
  },
  {
    id: 'post4',
    author: {
      id: 'user4',
      name: 'David Wilson',
      avatar: '/api/placeholder/40/40',
      role: 'member',
    },
    content: 'Found this amazing visualization tool for sorting algorithms: https://visualgo.net/sorting - it really helped me understand quicksort and mergesort better!',
    timestamp: new Date('2024-01-20T11:30:00'),
    type: 'resource',
    reactions: { heart: 15, helpful: 20 },
    reactedUsers: { heart: [], helpful: [] },
    comments: [
      {
        id: 'comment5',
        author: { name: 'Lisa Brown', avatar: '/api/placeholder/32/32' },
        content: 'This is gold! The step-by-step visualization makes it so much clearer.',
        timestamp: new Date('2024-01-20T11:35:00'),
      },
    ],
    isPinned: false,
    isEdited: false,
    tags: ['resource', 'visualization', 'sorting', 'algorithms'],
  },
];

const mockNotifications = [
  {
    id: 'notif1',
    type: 'new_post',
    message: 'Sarah Miller posted a new study guide',
    timestamp: new Date('2024-01-20T14:30:00'),
    read: false,
  },
  {
    id: 'notif2',
    type: 'comment',
    message: 'Mike Johnson commented on your post',
    timestamp: new Date('2024-01-20T14:35:00'),
    read: false,
  },
  {
    id: 'notif3',
    type: 'reaction',
    message: '3 people reacted to your question',
    timestamp: new Date('2024-01-20T13:50:00'),
    read: true,
  },
];

// Feed Filter Component
const FeedFilter = ({ 
  activeFilter, 
  onFilterChange, 
  sortBy, 
  onSortChange 
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}) => (
  <div className="flex items-center justify-between p-4 border-b bg-[var(--hive-text-primary)]">
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Filter:</span>
      {['all', 'questions', 'resources', 'events'].map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`
            px-3 py-1 rounded-full text-sm transition-colors
            ${activeFilter === filter
              ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
          `}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Sort:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-hive-gold"
      >
        <option value="recent">Most Recent</option>
        <option value="popular">Most Popular</option>
        <option value="helpful">Most Helpful</option>
        <option value="commented">Most Commented</option>
      </select>
    </div>
  </div>
);

// Notification Badge Component
const NotificationBadge = ({ 
  notifications, 
  onToggle 
}: {
  notifications: any[];
  onToggle: () => void;
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-[var(--hive-text-primary)] text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export const CompleteFeedExperience: StoryObj = {
  render: () => {
    const [posts, setPosts] = useState(mockPosts);
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('recent');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);

    const handleNewPost = (newPost: any) => {
      const post = {
        id: `post${posts.length + 1}`,
        author: mockUser,
        content: newPost.content,
        timestamp: new Date(),
        type: newPost.type || 'text',
        reactions: { heart: 0, helpful: 0 },
        reactedUsers: { heart: [], helpful: [] },
        comments: [],
        isPinned: false,
        isEdited: false,
        tags: newPost.tags || [],
      };
      setPosts([post, ...posts]);
    };

    const handleReaction = (postId: string, reactionType: string) => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions };
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          return { ...post, reactions: newReactions };
        }
        return post;
      }));
    };

    const handleComment = (postId: string, commentContent: string) => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `comment${Date.now()}`,
            author: mockUser,
            content: commentContent,
            timestamp: new Date(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      }));
    };

    const handlePin = (postId: string) => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return { ...post, isPinned: !post.isPinned };
        }
        return post;
      }));
    };

    const handleDelete = (postId: string) => {
      setPosts(posts.filter(post => post.id !== postId));
    };

    const filteredPosts = posts.filter(post => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'questions') return post.type === 'question';
      if (activeFilter === 'resources') return post.type === 'resource';
      if (activeFilter === 'events') return post.type === 'event';
      return true;
    });

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'popular':
          return (b.reactions.heart || 0) - (a.reactions.heart || 0);
        case 'helpful':
          return (b.reactions.helpful || 0) - (a.reactions.helpful || 0);
        case 'commented':
          return b.comments.length - a.comments.length;
        default:
          return 0;
      }
    });

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {mockSpace.name}
                </h1>
                <p className="text-gray-600">{mockSpace.memberCount} members</p>
              </div>
              <div className="flex items-center gap-3">
                <NotificationBadge
                  notifications={notifications}
                  onToggle={() => setShowNotifications(!showNotifications)}
                />
                <HiveBadge variant="default">
                  {mockUser.role === 'builder' ? '🛠️ Builder' : '👤 Member'}
                </HiveBadge>
              </div>
            </div>
          </div>

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="bg-[var(--hive-text-primary)] border-b">
              <div className="p-4">
                <h3 className="font-semibold mb-3">Recent Notifications</h3>
                <div className="space-y-2">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        p-3 rounded-lg text-sm
                        ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}
                      `}
                    >
                      <div className="font-medium">{notification.message}</div>
                      <div className="text-gray-500 text-xs">
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Feed Composer */}
          <div className="bg-[var(--hive-text-primary)] border-b">
            <div className="p-4">
              <FeedComposer
                user={mockUser}
                onPost={handleNewPost}
                placeholder="Share your thoughts, questions, or resources..."
              />
            </div>
          </div>

          {/* Feed Filter */}
          <FeedFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Feed Content */}
          <div className="bg-[var(--hive-text-primary)]">
            <div className="divide-y">
              {sortedPosts.map((post) => (
                <div key={post.id} className="p-4">
                  <PostCard
                    post={post}
                    onReaction={(reactionType) => handleReaction(post.id, reactionType)}
                    onComment={(content) => handleComment(post.id, content)}
                    onPin={() => handlePin(post.id)}
                    onDelete={() => handleDelete(post.id)}
                    canModerate={mockUser.role === 'builder'}
                  />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="p-4 text-center border-t">
              <HiveButton variant="outline">
                Load More Posts
              </HiveButton>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const FeedWithSurfaceIntegration: StoryObj = {
  render: () => {
    const [activeSurface, setActiveSurface] = useState('posts');
    const [posts, setPosts] = useState(mockPosts);

    const surfaces = [
      { id: 'pinned', name: 'Pinned', icon: '📌' },
      { id: 'posts', name: 'Posts', icon: '💬' },
      { id: 'events', name: 'Events', icon: '📅' },
      { id: 'tools', name: 'Tools', icon: '🔧' },
      { id: 'members', name: 'Members', icon: '👥' },
    ];

    const handleSurfaceChange = (surfaceId: string) => {
      setActiveSurface(surfaceId);
    };

    const getSurfaceContent = () => {
      switch (activeSurface) {
        case 'pinned':
          return posts.filter(post => post.isPinned);
        case 'posts':
          return posts.filter(post => !post.isPinned);
        case 'events':
          return posts.filter(post => post.type === 'event');
        case 'tools':
          return []; // Tools would be handled differently
        case 'members':
          return []; // Members would be handled differently
        default:
          return posts;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {mockSpace.name}
            </h1>
            <p className="text-gray-600">6-Surface Architecture Demo</p>
          </div>

          <div className="flex">
            {/* Surface Navigation */}
            <div className="w-64 bg-[var(--hive-text-primary)] border-r">
              <div className="p-4">
                <h3 className="font-semibold mb-3">Surfaces</h3>
                <div className="space-y-1">
                  {surfaces.map((surface) => (
                    <button
                      key={surface.id}
                      onClick={() => handleSurfaceChange(surface.id)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                        ${activeSurface === surface.id
                          ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                          : 'text-gray-600 hover:bg-gray-100'}
                      `}
                    >
                      <span>{surface.icon}</span>
                      <span className="font-medium">{surface.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {activeSurface === 'posts' && (
                <div>
                  {/* Feed Composer */}
                  <div className="bg-[var(--hive-text-primary)] border-b p-4">
                    <FeedComposer
                      user={mockUser}
                      onPost={(newPost) => {
                        const post = {
                          id: `post${posts.length + 1}`,
                          author: mockUser,
                          content: newPost.content,
                          timestamp: new Date(),
                          type: newPost.type || 'text',
                          reactions: { heart: 0, helpful: 0 },
                          reactedUsers: { heart: [], helpful: [] },
                          comments: [],
                          isPinned: false,
                          isEdited: false,
                          tags: newPost.tags || [],
                        };
                        setPosts([post, ...posts]);
                      }}
                      placeholder="Share with the community..."
                    />
                  </div>

                  {/* Posts Feed */}
                  <div className="bg-[var(--hive-text-primary)] divide-y">
                    {getSurfaceContent().map((post) => (
                      <div key={post.id} className="p-4">
                        <PostCard
                          post={post}
                          onReaction={() => {}}
                          onComment={() => {}}
                          onPin={() => {}}
                          onDelete={() => {}}
                          canModerate={mockUser.role === 'builder'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSurface === 'pinned' && (
                <div className="bg-[var(--hive-text-primary)]">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">📌 Pinned Content</h2>
                    <p className="text-gray-600">Important announcements and resources</p>
                  </div>
                  <div className="divide-y">
                    {getSurfaceContent().map((post) => (
                      <div key={post.id} className="p-4 bg-[var(--hive-brand-secondary)]/5 border-l-4 border-hive-gold">
                        <PostCard
                          post={post}
                          onReaction={() => {}}
                          onComment={() => {}}
                          onPin={() => {}}
                          onDelete={() => {}}
                          canModerate={mockUser.role === 'builder'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSurface === 'events' && (
                <div className="bg-[var(--hive-text-primary)]">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">📅 Events</h2>
                    <p className="text-gray-600">Upcoming study sessions and activities</p>
                  </div>
                  <div className="divide-y">
                    {getSurfaceContent().map((post) => (
                      <div key={post.id} className="p-4 bg-blue-50 border-l-4 border-blue-500">
                        <PostCard
                          post={post}
                          onReaction={() => {}}
                          onComment={() => {}}
                          onPin={() => {}}
                          onDelete={() => {}}
                          canModerate={mockUser.role === 'builder'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSurface === 'tools' && (
                <div className="bg-[var(--hive-text-primary)]">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">🔧 Tools</h2>
                    <p className="text-gray-600">Collaborative tools and resources</p>
                  </div>
                  <div className="p-8 text-center text-gray-500">
                    <div className="text-4xl mb-4">🔧</div>
                    <h3 className="text-lg font-semibold mb-2">Tools Surface</h3>
                    <p>Deployed tools and resources would appear here</p>
                  </div>
                </div>
              )}

              {activeSurface === 'members' && (
                <div className="bg-[var(--hive-text-primary)]">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">👥 Members</h2>
                    <p className="text-gray-600">{mockSpace.memberCount} community members</p>
                  </div>
                  <div className="p-8 text-center text-gray-500">
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="text-lg font-semibold mb-2">Members Directory</h3>
                    <p>Member profiles and directory would appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const FeedModerationInterface: StoryObj = {
  render: () => {
    const [posts, setPosts] = useState(mockPosts);
    const [moderationMode, setModerationMode] = useState(false);
    const [selectedPosts, setSelectedPosts] = useState([]);

    const handleBulkAction = (action: string) => {
      if (action === 'pin') {
        setPosts(posts.map(post => 
          selectedPosts.includes(post.id) 
            ? { ...post, isPinned: true }
            : post
        ));
      } else if (action === 'delete') {
        setPosts(posts.filter(post => !selectedPosts.includes(post.id)));
      }
      setSelectedPosts([]);
    };

    const handlePostSelect = (postId: string, selected: boolean) => {
      if (selected) {
        setSelectedPosts([...selectedPosts, postId]);
      } else {
        setSelectedPosts(selectedPosts.filter(id => id !== postId));
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Moderation Header */}
          <div className="bg-[var(--hive-text-primary)] border-b p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Content Moderation
                </h1>
                <p className="text-gray-600">
                  {moderationMode ? 'Bulk moderation mode' : 'Normal view'}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <HiveButton
                  variant={moderationMode ? 'default' : 'outline'}
                  onClick={() => setModerationMode(!moderationMode)}
                >
                  {moderationMode ? 'Exit Moderation' : 'Moderation Mode'}
                </HiveButton>
                {moderationMode && selectedPosts.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {selectedPosts.length} selected
                    </span>
                    <HiveButton
                      size="sm"
                      onClick={() => handleBulkAction('pin')}
                    >
                      Pin Selected
                    </HiveButton>
                    <HiveButton
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkAction('delete')}
                    >
                      Delete Selected
                    </HiveButton>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Moderation Stats */}
          {moderationMode && (
            <div className="bg-blue-50 border border-blue-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
                  <div className="text-sm text-blue-800">Total Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {posts.filter(p => p.isPinned).length}
                  </div>
                  <div className="text-sm text-green-800">Pinned Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-orange-800">Flagged Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {posts.reduce((sum, p) => sum + p.comments.length, 0)}
                  </div>
                  <div className="text-sm text-purple-800">Total Comments</div>
                </div>
              </div>
            </div>
          )}

          {/* Feed Content */}
          <div className="bg-[var(--hive-text-primary)] divide-y">
            {posts.map((post) => (
              <div key={post.id} className="p-4">
                <div className="flex items-start gap-3">
                  {moderationMode && (
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.id)}
                      onChange={(e) => handlePostSelect(post.id, e.target.checked)}
                      className="mt-1 text-[var(--hive-brand-secondary)]"
                    />
                  )}
                  <div className="flex-1">
                    <PostCard
                      post={post}
                      onReaction={() => {}}
                      onComment={() => {}}
                      onPin={() => {
                        setPosts(posts.map(p => 
                          p.id === post.id 
                            ? { ...p, isPinned: !p.isPinned }
                            : p
                        ));
                      }}
                      onDelete={() => {
                        setPosts(posts.filter(p => p.id !== post.id));
                      }}
                      canModerate={true}
                      moderationMode={moderationMode}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const FeedNotificationSystem: StoryObj = {
  render: () => {
    const [posts, setPosts] = useState(mockPosts);
    const [notifications, setNotifications] = useState(mockNotifications);
    const [liveActivity, setLiveActivity] = useState([]);

    const addLiveActivity = (activity: any) => {
      setLiveActivity(prev => [activity, ...prev.slice(0, 4)]);
    };

    const handleNewPost = (newPost: any) => {
      const post = {
        id: `post${posts.length + 1}`,
        author: mockUser,
        content: newPost.content,
        timestamp: new Date(),
        type: newPost.type || 'text',
        reactions: { heart: 0, helpful: 0 },
        reactedUsers: { heart: [], helpful: [] },
        comments: [],
        isPinned: false,
        isEdited: false,
        tags: newPost.tags || [],
      };
      setPosts([post, ...posts]);
      
      // Add live activity
      addLiveActivity({
        id: `activity${Date.now()}`,
        type: 'new_post',
        user: mockUser.name,
        content: newPost.content.substring(0, 50) + '...',
        timestamp: new Date(),
      });

      // Add notification
      const notification = {
        id: `notif${Date.now()}`,
        type: 'new_post',
        message: `${mockUser.name} created a new post`,
        timestamp: new Date(),
        read: false,
      };
      setNotifications([notification, ...notifications]);
    };

    const handleReaction = (postId: string, reactionType: string) => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newReactions = { ...post.reactions };
          newReactions[reactionType] = (newReactions[reactionType] || 0) + 1;
          return { ...post, reactions: newReactions };
        }
        return post;
      }));

      // Add live activity
      addLiveActivity({
        id: `activity${Date.now()}`,
        type: 'reaction',
        user: mockUser.name,
        content: `reacted with ${reactionType}`,
        timestamp: new Date(),
      });
    };

    const handleComment = (postId: string, commentContent: string) => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const newComment = {
            id: `comment${Date.now()}`,
            author: mockUser,
            content: commentContent,
            timestamp: new Date(),
          };
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      }));

      // Add live activity
      addLiveActivity({
        id: `activity${Date.now()}`,
        type: 'comment',
        user: mockUser.name,
        content: commentContent.substring(0, 50) + '...',
        timestamp: new Date(),
      });
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-6">
            {/* Main Feed */}
            <div className="flex-1">
              {/* Header */}
              <div className="bg-[var(--hive-text-primary)] border-b p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {mockSpace.name}
                    </h1>
                    <p className="text-gray-600">Real-time feed with notifications</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                </div>
              </div>

              {/* Feed Composer */}
              <div className="bg-[var(--hive-text-primary)] border-b p-4">
                <FeedComposer
                  user={mockUser}
                  onPost={handleNewPost}
                  placeholder="Share something with the community..."
                />
              </div>

              {/* Posts Feed */}
              <div className="bg-[var(--hive-text-primary)] divide-y">
                {posts.map((post) => (
                  <div key={post.id} className="p-4">
                    <PostCard
                      post={post}
                      onReaction={(reactionType) => handleReaction(post.id, reactionType)}
                      onComment={(content) => handleComment(post.id, content)}
                      onPin={() => {}}
                      onDelete={() => {}}
                      canModerate={mockUser.role === 'builder'}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 space-y-4">
              {/* Live Activity */}
              <HiveCard className="p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live Activity
                </h3>
                <div className="space-y-3">
                  {liveActivity.length === 0 ? (
                    <p className="text-gray-500 text-sm">No recent activity</p>
                  ) : (
                    liveActivity.map((activity) => (
                      <div key={activity.id} className="text-sm">
                        <div className="font-medium">{activity.user}</div>
                        <div className="text-gray-600">{activity.content}</div>
                        <div className="text-gray-500 text-xs">
                          {activity.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </HiveCard>

              {/* Notifications */}
              <HiveCard className="p-4">
                <h3 className="font-semibold mb-3 flex items-center justify-between">
                  Notifications
                  <span className="text-sm text-gray-500">
                    {notifications.filter(n => !n.read).length} unread
                  </span>
                </h3>
                <div className="space-y-3">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`
                        p-3 rounded-lg text-sm
                        ${notification.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}
                      `}
                    >
                      <div className="font-medium">{notification.message}</div>
                      <div className="text-gray-500 text-xs">
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </HiveCard>

              {/* Space Stats */}
              <HiveCard className="p-4">
                <h3 className="font-semibold mb-3">Space Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Posts today</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Active members</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Comments today</span>
                    <span className="font-medium">47</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Reactions today</span>
                    <span className="font-medium">156</span>
                  </div>
                </div>
              </HiveCard>
            </div>
          </div>
        </div>
      </div>
    );
  },
};