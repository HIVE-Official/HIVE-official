import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../../atomic/atoms/nav-bar';
import { 
  Search, 
  Bell, 
  Settings, 
  Command,
  User,
  Mail,
  Calendar,
  BookOpen,
  Users,
  Zap,
  Home
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof NavBar> = {
  title: '01-Atoms/Nav Bar',
  component: NavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE navigation bar component for application header with search, notifications, and user management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: 'User data object with profile information',
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search input',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Show notifications button',
    },
    unreadCount: {
      control: 'number',
      description: 'Number of unread notifications',
    },
    onSearchClick: {
      action: 'search clicked',
      description: 'Search input click handler',
    },
    onNotificationsClick: {
      action: 'notifications clicked',
      description: 'Notifications button click handler',
    },
    onSettingsClick: {
      action: 'settings clicked',
      description: 'Settings button click handler',
    },
    onUserClick: {
      action: 'user clicked',
      description: 'User avatar click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    user: {
      id: '1',
      name: 'Alex Rodriguez',
      handle: 'alexr',
      avatar: '',
    },
    showSearch: true,
    showNotifications: true,
    unreadCount: 0,
  },
};

export const WithNotifications: Story = {
  args: {
    user: {
      id: '1',
      name: 'Sarah Chen',
      handle: 'sarahc',
      avatar: '',
    },
    showSearch: true,
    showNotifications: true,
    unreadCount: 5,
  },
};

export const WithoutSearch: Story = {
  args: {
    user: {
      id: '1',
      name: 'Marcus Johnson',
      handle: 'marcusj',
      avatar: '',
    },
    showSearch: false,
    showNotifications: true,
    unreadCount: 12,
  },
};

export const SignedOut: Story = {
  args: {
    user: null,
    showSearch: true,
    showNotifications: false,
    unreadCount: 0,
  },
};

export const HighNotificationCount: Story = {
  args: {
    user: {
      id: '1',
      name: 'Emma Davis',
      handle: 'emmad',
      avatar: '',
    },
    showSearch: true,
    showNotifications: true,
    unreadCount: 15,
  },
};

export const MinimalView: Story = {
  args: {
    user: {
      id: '1',
      name: 'David Park',
      handle: 'davidp',
      avatar: '',
    },
    showSearch: false,
    showNotifications: false,
    unreadCount: 0,
  },
};

// Campus navigation scenarios
export const CampusNavScenarios: Story = {
  render: () => (
    <div className="space-y-8 bg-hive-background-primary min-h-screen">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6 p-6">Student Dashboard Navigation</h3>
        <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary mx-6">
          <NavBar
            user={{
              id: '1',
              name: 'Alex Rodriguez',
              handle: 'alexr',
              avatar: '',
            }}
            showSearch={true}
            showNotifications={true}
            unreadCount={3}
            onSearchClick={() => alert('Opening command palette...')}
            onNotificationsClick={() => alert('Opening notifications panel...')}
            onSettingsClick={() => alert('Opening settings...')}
            onUserClick={() => alert('Opening user profile...')}
          />
          
          <div className="p-6 bg-hive-background-tertiary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Dashboard Content</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-hive-gold rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-hive-background-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-hive-text-primary">Current Courses</h5>
                    <p className="text-sm text-hive-text-secondary">5 active this semester</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-hive-emerald rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-hive-text-primary">Study Groups</h5>
                    <p className="text-sm text-hive-text-secondary">12 groups joined</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-hive-sapphire rounded-lg flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-hive-text-primary">Tools Built</h5>
                    <p className="text-sm text-hive-text-secondary">8 published tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6 px-6">Study Group Leader View</h3>
        <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary mx-6">
          <NavBar
            user={{
              id: '2',
              name: 'Sarah Chen',
              handle: 'sarahc',
            }}
            showSearch={true}
            showNotifications={true}
            unreadCount={8}
            onSearchClick={() => alert('Searching for study materials...')}
            onNotificationsClick={() => alert('Group management notifications...')}
            onSettingsClick={() => alert('Group settings...')}
            onUserClick={() => alert('Leader profile...')}
          />
          
          <div className="p-6 bg-hive-background-tertiary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Group Management Dashboard</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-hive-gold rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-hive-background-primary">CS</span>
                  </div>
                  <div>
                    <p className="font-medium text-hive-text-primary">CS 101 Study Group</p>
                    <p className="text-sm text-hive-text-secondary">28 members • 3 pending requests</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-hive-emerald/20 text-hive-emerald text-xs rounded-full">Active</span>
                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">3 New</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-hive-sapphire rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">PH</span>
                  </div>
                  <div>
                    <p className="font-medium text-hive-text-primary">Physics Lab Partners</p>
                    <p className="text-sm text-hive-text-secondary">12 members • Session today 3pm</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className="px-2 py-1 bg-hive-emerald/20 text-hive-emerald text-xs rounded-full">Active</span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6 px-6">Tool Builder Dashboard</h3>
        <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary mx-6">
          <NavBar
            user={{
              id: '3',
              name: 'Marcus Johnson',
              handle: 'marcusj',
            }}
            showSearch={true}
            showNotifications={true}
            unreadCount={12}
            onSearchClick={() => alert('Searching for development resources...')}
            onNotificationsClick={() => alert('Tool usage notifications...')}
            onSettingsClick={() => alert('Developer settings...')}
            onUserClick={() => alert('Builder profile...')}
          />
          
          <div className="p-6 bg-hive-background-tertiary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Tool Development Center</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-hive-text-primary">GPA Calculator Pro</h5>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Published</span>
                </div>
                <div className="space-y-2 text-sm text-hive-text-secondary">
                  <p>2.8k users • 4.9 rating</p>
                  <p>+234 new users this week</p>
                </div>
              </div>
              
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-hive-text-primary">Study Planner v2</h5>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">In Development</span>
                </div>
                <div className="space-y-2 text-sm text-hive-text-secondary">
                  <p>Beta testing • 45 testers</p>
                  <p>Release planned for next week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6 px-6">Guest/New User View</h3>
        <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary mx-6">
          <NavBar
            user={null}
            showSearch={true}
            showNotifications={false}
            unreadCount={0}
            onSearchClick={() => alert('Public search - discover HIVE...')}
            onSettingsClick={() => alert('App preferences...')}
          />
          
          <div className="p-6 bg-hive-background-tertiary">
            <h4 className="font-semibold text-hive-text-primary mb-4">Welcome to HIVE</h4>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-hive-background-primary" />
              </div>
              <h5 className="text-xl font-semibold text-hive-text-primary mb-2">Join Your Campus Community</h5>
              <p className="text-hive-text-secondary mb-6 max-w-md mx-auto">
                Connect with classmates, build study tools, and succeed together in your academic journey.
              </p>
              <div className="flex space-x-3 justify-center">
                <button className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors">
                  Sign Up
                </button>
                <button className="px-6 py-2 border border-hive-border-default text-hive-text-primary rounded-lg font-medium hover:bg-hive-interactive-hover transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive navigation examples
export const InteractiveNavExamples: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(7);
    const [currentUser, setCurrentUser] = useState({
      id: '1',
      name: 'Interactive User',
      handle: 'interactive',
    });

    const handleNotificationClick = () => {
      if (notifications > 0) {
        setNotifications(prev => Math.max(0, prev - 1));
      }
    };

    const addNotification = () => {
      setNotifications(prev => prev + 1);
    };

    const toggleUser = () => {
      setCurrentUser(prev => 
        prev ? null : {
          id: '1',
          name: 'Interactive User',
          handle: 'interactive',
        }
      );
    };

    return (
      <div className="space-y-6 bg-hive-background-primary min-h-screen">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Navigation Demo</h3>
          
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary mb-6">
            <NavBar
              user={currentUser}
              showSearch={true}
              showNotifications={true}
              unreadCount={notifications}
              onSearchClick={() => alert('Search activated! (Cmd/Ctrl + K)')}
              onNotificationsClick={handleNotificationClick}
              onSettingsClick={() => alert('Settings panel opening...')}
              onUserClick={() => alert('User profile menu opening...')}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button 
              onClick={addNotification}
              className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors"
            >
              Add Notification (+1)
            </button>
            
            <button 
              onClick={handleNotificationClick}
              className="px-4 py-2 bg-hive-emerald text-white rounded-lg font-medium hover:bg-hive-emerald/90 transition-colors"
              disabled={notifications === 0}
            >
              Clear Notification (-1)
            </button>
            
            <button 
              onClick={toggleUser}
              className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg font-medium hover:bg-hive-interactive-hover transition-colors"
            >
              {currentUser ? 'Sign Out' : 'Sign In'}
            </button>
            
            <button 
              onClick={() => setNotifications(0)}
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium hover:bg-red-500/30 transition-colors"
            >
              Clear All Notifications
            </button>
          </div>

          <div className="mt-4 p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <p className="text-sm text-hive-text-secondary">
              Current Status: {notifications} notification{notifications !== 1 ? 's' : ''} • 
              User: {currentUser ? `${currentUser.name} (@${currentUser.handle})` : 'Signed out'}
            </p>
          </div>
        </div>

        <div className="px-6">
          <h4 className="font-semibold text-hive-text-primary mb-4">Search Variations</h4>
          <div className="space-y-4">
            <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary">
              <NavBar
                user={{
                  id: '1',
                  name: 'Student',
                  handle: 'student',
                }}
                showSearch={true}
                showNotifications={false}
                onSearchClick={() => alert('Student search: courses, classmates, study materials...')}
              />
            </div>
            
            <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary">
              <NavBar
                user={{
                  id: '2',
                  name: 'Builder',
                  handle: 'builder',
                }}
                showSearch={true}
                showNotifications={false}
                onSearchClick={() => alert('Builder search: APIs, documentation, components...')}
              />
            </div>
            
            <div className="border border-hive-border-subtle rounded-lg overflow-hidden bg-hive-background-secondary">
              <NavBar
                user={null}
                showSearch={true}
                showNotifications={false}
                onSearchClick={() => alert('Public search: discover HIVE features...')}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// All navigation states
export const AllNavigationStates: Story = {
  render: () => (
    <div className="space-y-4 bg-hive-background-primary p-6">
      <h3 className="text-lg font-semibold text-hive-text-primary mb-6">All Navigation States</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-hive-text-secondary mb-2">Default State</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden">
            <NavBar
              user={{ id: '1', name: 'Alex Rodriguez', handle: 'alexr' }}
              showSearch={true}
              showNotifications={true}
              unreadCount={0}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-2">With Notifications</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden">
            <NavBar
              user={{ id: '2', name: 'Sarah Chen', handle: 'sarahc' }}
              showSearch={true}
              showNotifications={true}
              unreadCount={5}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-2">High Notification Count</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden">
            <NavBar
              user={{ id: '3', name: 'Marcus Johnson', handle: 'marcusj' }}
              showSearch={true}
              showNotifications={true}
              unreadCount={15}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-2">Without Search</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden">
            <NavBar
              user={{ id: '4', name: 'Emma Davis', handle: 'emmad' }}
              showSearch={false}
              showNotifications={true}
              unreadCount={3}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-2">Signed Out</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden">
            <NavBar
              user={null}
              showSearch={true}
              showNotifications={false}
              unreadCount={0}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-2">Minimal (No Search, No Notifications)</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden">
            <NavBar
              user={{ id: '5', name: 'David Park', handle: 'davidp' }}
              showSearch={false}
              showNotifications={false}
              unreadCount={0}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    user: {
      id: '1',
      name: 'Interactive User - Use controls to customize →',
      handle: 'interactive',
      avatar: '',
    },
    showSearch: true,
    showNotifications: true,
    unreadCount: 3,
  },
};