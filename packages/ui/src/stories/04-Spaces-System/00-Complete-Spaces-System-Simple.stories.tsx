import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { 
  Users, Search, Plus, Settings, Bell, BookOpen, 
  Calendar, MapPin, Star, Heart, MessageCircle, Share, 
  ChevronRight, Target, Grid, List, X, ArrowLeft,
  User, Clock, Activity, Eye, Lock, Globe
} from 'lucide-react';

// Spaces System Props Interface
interface SpacesSystemProps {
  viewMode?: 'explore' | 'category' | 'space-preview' | 'space-board';
  userRole?: 'student' | 'leader' | 'admin';
  showDebugLabels?: boolean;
}

// Simplified HIVE Spaces System
const CompleteSpacesSystem = ({ 
  viewMode = 'explore',
  userRole = 'student',
  showDebugLabels = false
}: SpacesSystemProps = {}) => {
  const [currentView, setCurrentView] = React.useState(viewMode);

  // Main Explore Page Component
  const MainExplorePage = () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Discover Your Community
          </h1>
          <p className="text-gray-400 text-lg">
            Find spaces where you belong and collaborate with peers who share your interests
          </p>
        </div>

        {/* Four Core Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            {
              type: 'university',
              title: 'University Spaces',
              description: 'Academic departments, courses, and official university communities',
              icon: '🎓',
              examples: ['CS Department', 'Engineering Students', 'Pre-Med Society'],
              color: 'bg-blue-600/20 border-blue-500/30'
            },
            {
              type: 'residential',
              title: 'Residential Spaces',
              description: 'Dorm floors, buildings, and housing communities',
              icon: '🏠',
              examples: ['Ellicott 3rd Floor', 'Governors Hall', 'Off-Campus Commons'],
              color: 'bg-green-600/20 border-green-500/30'
            },
            {
              type: 'greek',
              title: 'Greek Organizations',
              description: 'Fraternities, sororities, and Greek life communities',
              icon: '🏛️',
              examples: ['Alpha Beta Gamma', 'Delta Phi Epsilon', 'Theta Chi'],
              color: 'bg-purple-600/20 border-purple-500/30'
            },
            {
              type: 'student',
              title: 'Student Organizations',
              description: 'Clubs, societies, and interest-based communities',
              icon: '🌟',
              examples: ['Photography Club', 'Debate Society', 'Gaming Community'],
              color: 'bg-orange-600/20 border-orange-500/30'
            }
          ].map((category) => (
            <div 
              key={category.type}
              onClick={() => setCurrentView('category')}
              className={`${category.color} rounded-xl p-6 border cursor-pointer hover:bg-opacity-30 transition-all duration-200 hover:scale-105 hover:shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{category.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-sm text-gray-300 mb-2">Popular spaces:</div>
                <div className="space-y-1">
                  {category.examples.map((example) => (
                    <div key={example} className="text-sm text-gray-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                      {example}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  12+ active spaces
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations Section */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'CS Study Group',
                members: 24,
                category: 'Academic',
                activity: 'Active now'
              },
              {
                name: 'Ellicott 3rd Floor',
                members: 18,
                category: 'Residential',
                activity: '2 events this week'
              },
              {
                name: 'Photography Club',
                members: 45,
                category: 'Interest',
                activity: 'Photo walk tomorrow'
              }
            ].map((space) => (
              <div key={space.name} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-yellow-500/50 transition-all duration-200 cursor-pointer">
                <h3 className="font-semibold text-white mb-2">{space.name}</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    {space.members} members
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3" />
                    {space.activity}
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded">
                    {space.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Category Browse Page Component
  const CategoryBrowsePage = () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setCurrentView('explore')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">University Spaces</h1>
            <p className="text-gray-400">Academic departments, courses, and official university communities</p>
          </div>
        </div>

        {/* Sample Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'CS Department', members: 156, posts: 24, type: 'Department' },
            { name: 'Engineering Students', members: 203, posts: 45, type: 'College' },
            { name: 'Pre-Med Society', members: 89, posts: 12, type: 'Academic' },
            { name: 'Mathematics Club', members: 67, posts: 18, type: 'Academic' },
            { name: 'Physics Lab Group', members: 34, posts: 8, type: 'Research' },
            { name: 'Study Abroad Alumni', members: 92, posts: 15, type: 'Alumni' }
          ].map((space) => (
            <div key={space.name} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-yellow-500/50 transition-all duration-200 cursor-pointer hover:bg-white/10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white mb-1">{space.name}</h3>
                  <p className="text-sm text-gray-400">{space.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Members</div>
                  <div className="font-semibold text-white">{space.members}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    {space.posts} posts
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    Active
                  </div>
                </div>
                <button className="text-sm bg-yellow-400 text-black px-3 py-1 rounded-lg hover:bg-yellow-500 transition-all duration-200">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Space Preview Page Component
  const SpacePreviewPage = () => (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setCurrentView('category')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">CS Department</h1>
            <p className="text-gray-400">Academic department space</p>
          </div>
        </div>

        {/* Space Preview Content */}
        <div className="bg-white/5 rounded-xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">CS Department</h2>
            <p className="text-gray-400 mb-4">Official Computer Science Department space for students, faculty, and announcements</p>
            
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="text-center">
                <div className="font-bold text-white">156</div>
                <div className="text-sm text-gray-400">Members</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">24</div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">Active</div>
                <div className="text-sm text-gray-400">Status</div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentView('space-board')}
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-200"
            >
              Join Space
            </button>
          </div>

          {/* Recent Activity Preview */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { user: 'Prof. Johnson', action: 'posted an announcement', time: '2 hours ago' },
                { user: 'Sarah Chen', action: 'shared study resources', time: '4 hours ago' },
                { user: 'Mike Rodriguez', action: 'asked about office hours', time: '6 hours ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-white font-medium">{activity.user}</span>
                    <span className="text-gray-400"> {activity.action}</span>
                  </div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Individual Space Board Component
  const SpaceBoardPage = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setCurrentView('space-preview')}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">CS Department</h1>
                <p className="text-sm text-gray-400">156 members • Active</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Board Layout: 60/40 split */}
      <div className="flex">
        {/* Post Board (60%) */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Activity Feed</h2>
            
            {/* Post Creation */}
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-black" />
                </div>
                <input 
                  type="text" 
                  placeholder="Share an update with the department..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-yellow-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200">
                    <Calendar className="w-4 h-4" />
                    Event
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200">
                    <BookOpen className="w-4 h-4" />
                    Resource
                  </button>
                </div>
                <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-all duration-200">
                  Post
                </button>
              </div>
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {[
                {
                  user: 'Prof. Johnson',
                  title: 'Office Hours Update',
                  content: 'Office hours for this week will be moved to Wednesday 2-4 PM due to the department meeting.',
                  time: '2 hours ago',
                  likes: 12,
                  comments: 3
                },
                {
                  user: 'Sarah Chen',
                  title: 'Study Group Resources',
                  content: 'I\'ve compiled some helpful resources for the upcoming algorithms exam. Check the shared drive for practice problems and solutions.',
                  time: '4 hours ago',
                  likes: 8,
                  comments: 5
                }
              ].map((post, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{post.user}</span>
                        <span className="text-sm text-gray-400">{post.time}</span>
                      </div>
                      <h3 className="font-medium text-white mb-2">{post.title}</h3>
                      <p className="text-gray-300">{post.content}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-200">
                      <Share className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tool Grid (40%) */}
        <div className="w-2/5 border-l border-white/10 p-8 bg-white/5">
          <h2 className="text-xl font-bold text-white mb-6">Community Tools</h2>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { name: 'Study Sessions', icon: BookOpen, description: 'Schedule and join study groups' },
              { name: 'Office Hours', icon: Clock, description: 'View professor availability' },
              { name: 'Resource Library', icon: Star, description: 'Access shared materials' },
              { name: 'Event Calendar', icon: Calendar, description: 'Department events and deadlines' },
              { name: 'Discussion Forum', icon: MessageCircle, description: 'Ask questions and get help' },
              { name: 'Project Showcase', icon: Share, description: 'Share your work with peers' }
            ].map((tool) => (
              <div key={tool.name} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-yellow-500/50 transition-all duration-200 cursor-pointer hover:bg-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-400/20 rounded-lg">
                    <tool.icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{tool.name}</h3>
                    <p className="text-sm text-gray-400">{tool.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Debug Labels */}
      {showDebugLabels && (
        <div className="fixed bottom-4 right-4 p-4 bg-black/90 text-white rounded-lg border border-white/20 text-sm">
          <div>View: {currentView}</div>
          <div>User Role: {userRole}</div>
        </div>
      )}
    </div>
  );

  // Main Render - Route between views
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {currentView === 'explore' && <MainExplorePage />}
      {currentView === 'category' && <CategoryBrowsePage />}
      {currentView === 'space-preview' && <SpacePreviewPage />}
      {currentView === 'space-board' && <SpaceBoardPage />}
    </div>
  );
};

const meta = {
  title: '04-Spaces System/Complete Spaces System (Clean)',
  component: CompleteSpacesSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '🏠 **HIVE Spaces System Kitchen Sink** - Clean, simplified implementation with full page navigation showcasing all core flows: Main Explore Page, Category Browse, Space Preview, and Individual Space Board.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: { type: 'select' },
      options: ['explore', 'category', 'space-preview', 'space-board'],
      description: 'Current view mode for the system',
    },
    userRole: {
      control: { type: 'select' },
      options: ['student', 'leader', 'admin'],
      description: 'User role affecting available actions and interface',
    },
    showDebugLabels: {
      control: { type: 'boolean' },
      description: 'Show debug overlay with current state information',
    },
  },
} satisfies Meta<typeof CompleteSpacesSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Kitchen Sink Stories - Complete Frontend Flows

export const MainExplorePage: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'explore',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🏠 **Main Explore Page** - Primary landing page with 4 core categories (University, Residential, Greek, Student) plus personalized recommendations.',
      },
    },
  },
};

export const CategoryBrowsePage: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'category',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '📂 **Category Browse Page** - Dedicated browse experience for University spaces with back navigation.',
      },
    },
  },
};

export const SpacePreviewFlow: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'space-preview',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '👁️ **Space Preview Flow** - Full-page preview for spaces with join functionality and activity preview.',
      },
    },
  },
};

export const IndividualSpaceBoard: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'space-board',
    userRole: 'leader',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🏗️ **Individual Space Board** - 60/40 split layout with Post Board and Tool Grid for active spaces.',
      },
    },
  },
};

export const KitchenSinkWithDebug: Story = {
  render: (args) => <CompleteSpacesSystem {...args} />,
  args: {
    viewMode: 'explore',
    userRole: 'leader',
    showDebugLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🔧 **Kitchen Sink with Debug** - Complete system with debug overlay for development and testing.',
      },
    },
  },
};