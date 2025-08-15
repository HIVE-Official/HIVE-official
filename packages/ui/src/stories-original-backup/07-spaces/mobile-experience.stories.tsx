import type { Meta, StoryObj } from '@storybook/react';
import { HiveSpaceCard } from '../../components/hive-space-card';
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState } from 'react';

const meta: Meta = {
  title: 'Spaces/Mobile Experience',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Mobile-optimized space experiences including responsive design, touch interactions, and mobile-specific features for HIVE spaces.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for mobile experience
const mockSpaces = [
  {
    id: 'cs-101',
    name: 'CS 101 Study Group',
    description: 'Collaborative learning space for Computer Science fundamentals',
    memberCount: 34,
    isJoined: true,
    lastActivity: '2 minutes ago',
    notifications: 3,
    surfaces: ['posts', 'events', 'tools'],
    image: '/api/placeholder/200/120'
  },
  {
    id: 'design-thinking',
    name: 'Design Thinking Workshop',
    description: 'Creative problem-solving and user experience design',
    memberCount: 18,
    isJoined: true,
    lastActivity: '15 minutes ago',
    notifications: 0,
    surfaces: ['posts', 'tools', 'members'],
    image: '/api/placeholder/200/120'
  },
  {
    id: 'startup-incubator',
    name: 'Startup Incubator',
    description: 'Building the next generation of student entrepreneurs',
    memberCount: 67,
    isJoined: false,
    lastActivity: '1 hour ago',
    notifications: 0,
    surfaces: ['posts', 'events', 'tools', 'chat'],
    image: '/api/placeholder/200/120'
  }
];

const mockPosts = [
  {
    id: '1',
    author: 'Sarah Chen',
    content: 'Just finished the React hooks assignment! The useEffect cleanup was tricky but finally got it working 🎉',
    timestamp: '5 minutes ago',
    likes: 12,
    comments: 3,
    isLiked: false
  },
  {
    id: '2',
    author: 'Mike Rodriguez',
    content: 'Study group meeting tomorrow at 2 PM in the library. We\'ll be covering recursion and dynamic programming.',
    timestamp: '1 hour ago',
    likes: 8,
    comments: 5,
    isLiked: true
  },
  {
    id: '3',
    author: 'Emma Thompson',
    content: 'Found this amazing visualization tool for algorithms. Check it out!',
    timestamp: '3 hours ago',
    likes: 15,
    comments: 7,
    isLiked: false
  }
];

export const MobileSpaceGrid: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('joined');

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-[var(--hive-text-primary)] border-b px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">My Spaces</h1>
            <div className="flex items-center gap-2">
              <HiveButton variant="outline" size="sm">
                Search
              </HiveButton>
              <HiveButton variant="primary" size="sm">
                Join
              </HiveButton>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-1 mt-3">
            <button
              onClick={() => setActiveTab('joined')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'joined' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Joined
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'discover' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'recent' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Recent
            </button>
          </div>
        </div>

        {/* Mobile Space Cards */}
        <div className="p-4 space-y-3">
          {mockSpaces
            .filter(space => activeTab === 'joined' ? space.isJoined : activeTab === 'discover' ? !space.isJoined : true)
            .map((space) => (
              <motion.div
                key={space.id}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
              >
                <HiveCard className="overflow-hidden">
                  <div className="flex">
                    {/* Space Image */}
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                    
                    {/* Space Info */}
                    <div className="flex-1 p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm leading-tight">{space.name}</h3>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{space.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">{space.memberCount} members</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{space.lastActivity}</span>
                          </div>
                        </div>
                        
                        {/* Notification Badge */}
                        {space.notifications > 0 && (
                          <HiveBadge variant="destructive" size="sm">
                            {space.notifications}
                          </HiveBadge>
                        )}
                      </div>
                      
                      {/* Surface Indicators */}
                      <div className="flex gap-1 mt-2">
                        {space.surfaces.map((surface) => (
                          <div key={surface} className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
        </div>
      </div>
    );
  },
};

export const MobileSpaceDetail: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('posts');
    const [showComposer, setShowComposer] = useState(false);

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Space Header */}
        <div className="bg-[var(--hive-text-primary)] border-b">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-24 relative">
            <div className="absolute inset-0 bg-[var(--hive-background-primary)] bg-opacity-20"></div>
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
              <HiveButton variant="outline" size="sm" className="text-[var(--hive-text-primary)] border-white">
                ← Back
              </HiveButton>
              <HiveButton variant="outline" size="sm" className="text-[var(--hive-text-primary)] border-white">
                ⚙️
              </HiveButton>
            </div>
          </div>
          
          <div className="px-4 py-3">
            <h1 className="text-lg font-semibold">CS 101 Study Group</h1>
            <p className="text-sm text-gray-600">34 members • 3 new notifications</p>
            
            {/* Tab Navigation */}
            <div className="flex gap-1 mt-3 overflow-x-auto">
              {['posts', 'events', 'tools', 'members'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                    activeTab === tab 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Feed */}
        <div className="pb-16">
          {activeTab === 'posts' && (
            <div className="p-4 space-y-3">
              {mockPosts.map((post) => (
                <motion.div
                  key={post.id}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <HiveCard>
                    <div className="p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm mb-3">{post.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <button className={`flex items-center gap-1 ${post.isLiked ? 'text-red-500' : ''}`}>
                          <span>{post.isLiked ? '❤️' : '🤍'}</span>
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1">
                          <span>💬</span>
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1">
                          <span>📤</span>
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </HiveCard>
                </motion.div>
              ))}
            </div>
          )}
          
          {activeTab === 'events' && (
            <div className="p-4">
              <HiveCard>
                <div className="p-4 text-center">
                  <p className="text-gray-500">No upcoming events</p>
                  <HiveButton variant="outline" size="sm" className="mt-2">
                    Create Event
                  </HiveButton>
                </div>
              </HiveCard>
            </div>
          )}
          
          {activeTab === 'tools' && (
            <div className="p-4">
              <HiveCard>
                <div className="p-4 text-center">
                  <p className="text-gray-500">No tools deployed</p>
                  <HiveButton variant="outline" size="sm" className="mt-2">
                    Deploy Tool
                  </HiveButton>
                </div>
              </HiveCard>
            </div>
          )}
          
          {activeTab === 'members' && (
            <div className="p-4 space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <HiveCard key={i}>
                  <div className="p-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Member {i + 1}</p>
                      <p className="text-xs text-gray-500">Computer Science</p>
                    </div>
                    <HiveBadge variant="outline" size="sm">
                      {i === 0 ? 'Builder' : 'Member'}
                    </HiveBadge>
                  </div>
                </HiveCard>
              ))}
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <motion.div
          className="fixed bottom-6 right-6"
          whileTap={{ scale: 0.9 }}
        >
          <HiveButton
            variant="primary"
            className="w-14 h-14 rounded-full shadow-lg"
            onClick={() => setShowComposer(true)}
          >
            +
          </HiveButton>
        </motion.div>

        {/* Mobile Composer Modal */}
        {showComposer && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            className="fixed inset-0 z-50 bg-[var(--hive-text-primary)]"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <HiveButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowComposer(false)}
                >
                  Cancel
                </HiveButton>
                <h2 className="font-semibold">Create Post</h2>
                <HiveButton variant="primary" size="sm">
                  Post
                </HiveButton>
              </div>
              
              <div className="flex-1 p-4">
                <textarea
                  className="w-full h-32 p-3 border rounded-lg resize-none"
                  placeholder="What's happening in your space?"
                  autoFocus
                />
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-4">
                  <button className="text-2xl">📷</button>
                  <button className="text-2xl">📎</button>
                  <button className="text-2xl">📊</button>
                  <button className="text-2xl">🗓️</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    );
  },
};

export const MobileNavigation: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('spaces');

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-[var(--hive-text-primary)] border-b px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold">HIVE</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                🔍
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                🔔
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                👤
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pb-16">
          {activeTab === 'spaces' && (
            <div className="p-4 space-y-3">
              {mockSpaces.map((space) => (
                <motion.div
                  key={space.id}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <HiveCard>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm">{space.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{space.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{space.memberCount} members</span>
                        {space.notifications > 0 && (
                          <HiveBadge variant="destructive" size="sm">
                            {space.notifications}
                          </HiveBadge>
                        )}
                      </div>
                    </div>
                  </HiveCard>
                </motion.div>
              ))}
            </div>
          )}
          
          {activeTab === 'feed' && (
            <div className="p-4">
              <HiveCard>
                <div className="p-4 text-center">
                  <p className="text-gray-500">Your personalized feed</p>
                </div>
              </HiveCard>
            </div>
          )}
          
          {activeTab === 'explore' && (
            <div className="p-4">
              <HiveCard>
                <div className="p-4 text-center">
                  <p className="text-gray-500">Discover new spaces</p>
                </div>
              </HiveCard>
            </div>
          )}
          
          {activeTab === 'create' && (
            <div className="p-4">
              <HiveCard>
                <div className="p-4 text-center">
                  <p className="text-gray-500">Create new content</p>
                </div>
              </HiveCard>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="p-4">
              <HiveCard>
                <div className="p-4 text-center">
                  <p className="text-gray-500">Your profile</p>
                </div>
              </HiveCard>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--hive-text-primary)] border-t">
          <div className="flex">
            {[
              { id: 'spaces', label: 'Spaces', icon: '🏠' },
              { id: 'feed', label: 'Feed', icon: '📰' },
              { id: 'explore', label: 'Explore', icon: '🔍' },
              { id: 'create', label: 'Create', icon: '➕' },
              { id: 'profile', label: 'Profile', icon: '👤' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-2 text-center transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="text-lg">{tab.icon}</div>
                <div className="text-xs mt-1">{tab.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const MobileTouchInteractions: Story = {
  render: () => {
    const [swipeAction, setSwipeAction] = useState<string | null>(null);
    const [longPressTarget, setLongPressTarget] = useState<string | null>(null);

    const handleSwipe = (direction: string, item: string) => {
      setSwipeAction(`${direction} on ${item}`);
      setTimeout(() => setSwipeAction(null), 2000);
    };

    const handleLongPress = (item: string) => {
      setLongPressTarget(item);
      setTimeout(() => setLongPressTarget(null), 2000);
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="mb-6">
          <h1 className="text-lg font-semibold mb-2">Touch Interactions</h1>
          <p className="text-sm text-gray-600">
            Try swiping left/right on cards or long-pressing for actions
          </p>
        </div>

        {/* Swipe Actions Demo */}
        <div className="space-y-3 mb-6">
          <h2 className="font-medium">Swipe Actions</h2>
          {mockPosts.map((post) => (
            <motion.div
              key={post.id}
              drag="x"
              dragConstraints={{ left: -100, right: 100 }}
              onDragEnd={(event, info) => {
                if (info.offset.x > 50) {
                  handleSwipe('right', post.author);
                } else if (info.offset.x < -50) {
                  handleSwipe('left', post.author);
                }
              }}
              whileDrag={{ scale: 1.05 }}
              className="relative"
            >
              <HiveCard>
                <div className="p-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <p className="text-sm">{post.content}</p>
                </div>
              </HiveCard>
            </motion.div>
          ))}
        </div>

        {/* Long Press Demo */}
        <div className="space-y-3">
          <h2 className="font-medium">Long Press Actions</h2>
          {mockSpaces.slice(0, 2).map((space) => (
            <motion.div
              key={space.id}
              onLongPress={() => handleLongPress(space.name)}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <HiveCard>
                <div className="p-3">
                  <h3 className="font-semibold text-sm">{space.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{space.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{space.memberCount} members</span>
                  </div>
                </div>
              </HiveCard>
            </motion.div>
          ))}
        </div>

        {/* Feedback Messages */}
        {swipeAction && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 bg-[var(--hive-background-primary)] bg-opacity-80 text-[var(--hive-text-primary)] p-3 rounded-lg text-center"
          >
            Swiped {swipeAction}
          </motion.div>
        )}

        {longPressTarget && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 left-4 right-4 bg-[var(--hive-background-primary)] bg-opacity-80 text-[var(--hive-text-primary)] p-3 rounded-lg text-center"
          >
            Long pressed on {longPressTarget}
          </motion.div>
        )}
      </div>
    );
  },
};

export const MobileResponsiveLayouts: Story = {
  render: () => {
    const [viewMode, setViewMode] = useState<'portrait' | 'landscape'>('portrait');

    return (
      <div className={`min-h-screen bg-gray-50 ${viewMode === 'landscape' ? 'flex' : ''}`}>
        {/* View Mode Toggle */}
        <div className="fixed top-4 right-4 z-10">
          <HiveButton
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'portrait' ? 'landscape' : 'portrait')}
          >
            {viewMode === 'portrait' ? '↻ Landscape' : '↺ Portrait'}
          </HiveButton>
        </div>

        {viewMode === 'portrait' ? (
          // Portrait Layout
          <div className="flex flex-col h-screen">
            <div className="bg-[var(--hive-text-primary)] border-b p-4">
              <h1 className="text-lg font-semibold">Portrait Mode</h1>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {mockSpaces.map((space) => (
                <HiveCard key={space.id}>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{space.name}</h3>
                    <p className="text-xs text-gray-600 mt-1">{space.description}</p>
                  </div>
                </HiveCard>
              ))}
            </div>
          </div>
        ) : (
          // Landscape Layout
          <div className="flex w-full h-screen">
            {/* Sidebar */}
            <div className="w-1/3 bg-[var(--hive-text-primary)] border-r overflow-y-auto">
              <div className="p-4 border-b">
                <h2 className="font-semibold">Spaces</h2>
              </div>
              <div className="p-2 space-y-2">
                {mockSpaces.map((space) => (
                  <div key={space.id} className="p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <h3 className="font-medium text-sm">{space.name}</h3>
                    <p className="text-xs text-gray-600">{space.memberCount} members</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
              <div className="bg-[var(--hive-text-primary)] border-b p-4">
                <h1 className="text-lg font-semibold">Landscape Mode</h1>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {mockPosts.map((post) => (
                  <HiveCard key={post.id}>
                    <div className="p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      <p className="text-sm">{post.content}</p>
                    </div>
                  </HiveCard>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
};