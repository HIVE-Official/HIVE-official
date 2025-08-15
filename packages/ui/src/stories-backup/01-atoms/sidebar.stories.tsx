import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from '../../atomic/atoms/sidebar';
import { 
  Home, 
  Compass, 
  Zap, 
  Calendar, 
  BookOpen, 
  User, 
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Star,
  Trophy,
  Target
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Sidebar> = {
  title: '01-Atoms/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE sidebar navigation component with collapsible design, hierarchical navigation, and breadcrumbs support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    user: {
      control: 'object',
      description: 'User data object with profile information',
    },
    currentPath: {
      control: 'text',
      description: 'Current active path for navigation highlighting',
    },
    collapsed: {
      control: 'boolean',
      description: 'Collapsed sidebar state',
    },
    breadcrumbs: {
      control: 'object',
      description: 'Breadcrumb navigation items',
    },
    currentSection: {
      control: 'text',
      description: 'Current section identifier',
    },
    onItemClick: {
      action: 'item clicked',
      description: 'Navigation item click handler',
    },
    onToggle: {
      action: 'sidebar toggled',
      description: 'Sidebar collapse toggle handler',
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
    currentPath: '/feed',
    collapsed: false,
    breadcrumbs: [],
  },
};

export const Collapsed: Story = {
  args: {
    user: {
      id: '1',
      name: 'Sarah Chen',
      handle: 'sarahc',
      avatar: '',
    },
    currentPath: '/spaces',
    collapsed: true,
    breadcrumbs: [],
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    user: {
      id: '1',
      name: 'Marcus Johnson',
      handle: 'marcusj',
      avatar: '',
    },
    currentPath: '/spaces/browse',
    collapsed: false,
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Spaces', href: '/spaces' },
      { label: 'Browse', href: '/spaces/browse' },
    ],
  },
};

export const ToolsActive: Story = {
  args: {
    user: {
      id: '1',
      name: 'Emma Davis',
      handle: 'emmad',
      avatar: '',
    },
    currentPath: '/tools/personal',
    collapsed: false,
    breadcrumbs: [
      { label: 'Tools', href: '/tools' },
      { label: 'Personal', href: '/tools/personal' },
    ],
  },
};

export const SignedOut: Story = {
  args: {
    user: null,
    currentPath: '/feed',
    collapsed: false,
    breadcrumbs: [],
  },
};

// Campus sidebar scenarios
export const CampusSidebarScenarios: Story = {
  render: () => (
    <div className="flex h-screen bg-hive-background-primary">
      <div className="space-y-8 w-full">
        <div className="flex h-1/3">
          <div className="border-r border-hive-border-subtle">
            <div className="p-4 bg-hive-background-secondary border-b border-hive-border-subtle">
              <h3 className="font-semibold text-hive-text-primary">Student Dashboard Navigation</h3>
              <p className="text-sm text-hive-text-secondary">Full sidebar with user profile</p>
            </div>
            <Sidebar
              user={{
                id: '1',
                name: 'Alex Rodriguez',
                handle: 'alexr',
              }}
              currentPath="/feed"
              collapsed={false}
              breadcrumbs={[
                { label: 'Dashboard', href: '/' },
                { label: 'Feed' },
              ]}
              onItemClick={(href) => alert(`Navigating to: ${href}`)}
            />
          </div>
          
          <div className="flex-1 p-6 bg-hive-background-tertiary">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-4">Campus Feed</h4>
            <div className="space-y-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-hive-emerald rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-hive-text-primary">CS 101 Study Group Update</h5>
                    <p className="text-sm text-hive-text-secondary">New study session scheduled for tomorrow</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-hive-gold rounded-full flex items-center justify-center">
                    <Zap className="h-5 w-5 text-hive-background-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-hive-text-primary">New Tool Published</h5>
                    <p className="text-sm text-hive-text-secondary">Grade Calculator Pro by @sarahc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-1/3">
          <div className="border-r border-hive-border-subtle">
            <div className="p-4 bg-hive-background-secondary border-b border-hive-border-subtle">
              <h3 className="font-semibold text-hive-text-primary">Spaces Navigation</h3>
              <p className="text-sm text-hive-text-secondary">Hierarchical navigation with breadcrumbs</p>
            </div>
            <Sidebar
              user={{
                id: '2',
                name: 'Sarah Chen',
                handle: 'sarahc',
              }}
              currentPath="/spaces/browse"
              collapsed={false}
              breadcrumbs={[
                { label: 'Dashboard', href: '/' },
                { label: 'Spaces', href: '/spaces' },
                { label: 'Browse' },
              ]}
              onItemClick={(href) => alert(`Navigating to: ${href}`)}
            />
          </div>
          
          <div className="flex-1 p-6 bg-hive-background-tertiary">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-4">Browse Campus Spaces</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-hive-text-primary">Computer Science Hub</h5>
                  <span className="px-2 py-1 bg-hive-emerald/20 text-hive-emerald text-xs rounded-full">156 members</span>
                </div>
                <p className="text-sm text-hive-text-secondary mb-3">Connect with CS students, share resources, and collaborate on projects.</p>
                <button className="w-full px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors">
                  Join Space
                </button>
              </div>
              
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-hive-text-primary">Study Lounge</h5>
                  <span className="px-2 py-1 bg-hive-sapphire/20 text-hive-sapphire text-xs rounded-full">89 members</span>
                </div>
                <p className="text-sm text-hive-text-secondary mb-3">Find study partners, organize group sessions, and share study tips.</p>
                <button className="w-full px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg font-medium hover:bg-hive-interactive-hover transition-colors">
                  View Space
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-1/3">
          <div className="border-r border-hive-border-subtle">
            <div className="p-4 bg-hive-background-secondary border-b border-hive-border-subtle">
              <h3 className="font-semibold text-hive-text-primary">Collapsed Navigation</h3>
              <p className="text-sm text-hive-text-secondary">Minimal sidebar for focused work</p>
            </div>
            <Sidebar
              user={{
                id: '3',
                name: 'Marcus Johnson',
                handle: 'marcusj',
              }}
              currentPath="/tools"
              collapsed={true}
              onItemClick={(href) => alert(`Navigating to: ${href}`)}
            />
          </div>
          
          <div className="flex-1 p-6 bg-hive-background-tertiary">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-4">Tool Builder Workspace</h4>
            <div className="space-y-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-hive-text-primary">GPA Calculator Pro</h5>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">Published</span>
                </div>
                <p className="text-sm text-hive-text-secondary mb-3">Advanced GPA calculation with what-if scenarios</p>
                <div className="flex space-x-2 text-xs text-hive-text-secondary">
                  <span>2.8k users</span>
                  <span>•</span>
                  <span>4.9 rating</span>
                </div>
              </div>
              
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-hive-text-primary">Study Planner v2</h5>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">In Development</span>
                </div>
                <p className="text-sm text-hive-text-secondary mb-3">Enhanced study scheduling with AI recommendations</p>
                <div className="w-full bg-hive-background-tertiary rounded-full h-2">
                  <div className="bg-hive-gold h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-hive-text-secondary mt-2">75% complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive sidebar examples
export const InteractiveSidebarExamples: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = useState('/feed');
    const [collapsed, setCollapsed] = useState(false);
    const [user, setUser] = useState({
      id: '1',
      name: 'Interactive User',
      handle: 'interactive',
    });

    const handleItemClick = (href: string) => {
      setCurrentPath(href);
    };

    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };

    const toggleUser = () => {
      setUser(prev => prev ? null : {
        id: '1',
        name: 'Interactive User',
        handle: 'interactive',
      });
    };

    const getBreadcrumbs = (path: string) => {
      const breadcrumbMap: Record<string, { label: string; href?: string }[]> = {
        '/': [{ label: 'Dashboard' }],
        '/feed': [{ label: 'Dashboard', href: '/' }, { label: 'Feed' }],
        '/profile': [{ label: 'Dashboard', href: '/' }, { label: 'Profile' }],
        '/spaces': [{ label: 'Dashboard', href: '/' }, { label: 'Spaces' }],
        '/spaces/my': [{ label: 'Dashboard', href: '/' }, { label: 'Spaces', href: '/spaces' }, { label: 'My Spaces' }],
        '/spaces/browse': [{ label: 'Dashboard', href: '/' }, { label: 'Spaces', href: '/spaces' }, { label: 'Browse' }],
        '/spaces/activate': [{ label: 'Dashboard', href: '/' }, { label: 'Spaces', href: '/spaces' }, { label: 'Activate' }],
        '/tools': [{ label: 'Dashboard', href: '/' }, { label: 'Tools' }],
        '/tools/personal': [{ label: 'Dashboard', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Personal' }],
        '/tools/browse': [{ label: 'Dashboard', href: '/' }, { label: 'Tools', href: '/tools' }, { label: 'Browse' }],
        '/calendar': [{ label: 'Dashboard', href: '/' }, { label: 'Calendar' }],
        '/events': [{ label: 'Dashboard', href: '/' }, { label: 'Events' }],
        '/settings': [{ label: 'Dashboard', href: '/' }, { label: 'Settings' }],
      };
      
      return breadcrumbMap[path] || [];
    };

    const getPageContent = (path: string) => {
      const contentMap: Record<string, { title: string; description: string; content: any }> = {
        '/feed': {
          title: 'Campus Feed',
          description: 'Stay updated with your campus community',
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-hive-emerald rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-hive-text-primary">CS 101 Study Group</h5>
                    <p className="text-sm text-hive-text-secondary">New study session scheduled</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        '/profile': {
          title: 'Your Profile',
          description: 'Manage your campus presence and achievements',
          content: (
            <div className="space-y-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-hive-background-primary">IU</span>
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold text-hive-text-primary">Interactive User</h5>
                    <p className="text-hive-text-secondary">@interactive</p>
                  </div>
                </div>
              </div>
            </div>
          )
        },
        '/spaces': {
          title: 'Campus Spaces',
          description: 'Discover and join campus communities',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary mb-2">My Spaces</h5>
                <p className="text-sm text-hive-text-secondary">Spaces you've joined</p>
              </div>
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary mb-2">Browse</h5>
                <p className="text-sm text-hive-text-secondary">Discover new communities</p>
              </div>
            </div>
          )
        },
        '/tools': {
          title: 'Campus Tools',
          description: 'Build and discover helpful academic tools',
          content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary mb-2">Personal Tools</h5>
                <p className="text-sm text-hive-text-secondary">Your created tools</p>
              </div>
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary mb-2">Browse Tools</h5>
                <p className="text-sm text-hive-text-secondary">Community-built tools</p>
              </div>
            </div>
          )
        },
        '/calendar': {
          title: 'Academic Calendar',
          description: 'Manage your schedule and important dates',
          content: (
            <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
              <div className="flex items-center space-x-3">
                <Calendar className="h-8 w-8 text-hive-text-secondary" />
                <div>
                  <h5 className="font-semibold text-hive-text-primary">Today's Schedule</h5>
                  <p className="text-sm text-hive-text-secondary">3 classes, 2 study sessions</p>
                </div>
              </div>
            </div>
          )
        },
        '/events': {
          title: 'Campus Events',
          description: 'Discover and attend campus activities',
          content: (
            <div className="space-y-3">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary">Study Group Meetup</h5>
                <p className="text-sm text-hive-text-secondary">Tomorrow at 3:00 PM</p>
              </div>
            </div>
          )
        },
        '/settings': {
          title: 'Settings',
          description: 'Customize your HIVE experience',
          content: (
            <div className="space-y-3">
              <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
                <h5 className="font-semibold text-hive-text-primary">Account Settings</h5>
                <p className="text-sm text-hive-text-secondary">Manage your profile and preferences</p>
              </div>
            </div>
          )
        },
      };

      return contentMap[path] || {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
        content: <div className="text-center text-hive-text-secondary">404 - Page not found</div>
      };
    };

    const currentContent = getPageContent(currentPath);

    return (
      <div className="flex h-screen bg-hive-background-primary">
        <Sidebar
          user={user}
          currentPath={currentPath}
          collapsed={collapsed}
          breadcrumbs={getBreadcrumbs(currentPath)}
          onItemClick={handleItemClick}
          onToggle={toggleCollapsed}
        />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 bg-hive-background-secondary border-b border-hive-border-subtle">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-hive-text-primary">{currentContent.title}</h3>
                <p className="text-hive-text-secondary">{currentContent.description}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={toggleCollapsed}
                  className="px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg font-medium hover:bg-hive-gold/90 transition-colors flex items-center space-x-2"
                >
                  {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                  <span>{collapsed ? 'Expand' : 'Collapse'}</span>
                </button>
                
                <button 
                  onClick={toggleUser}
                  className="px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg font-medium hover:bg-hive-interactive-hover transition-colors"
                >
                  {user ? 'Sign Out' : 'Sign In'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 bg-hive-background-tertiary overflow-auto">
            {currentContent.content}
          </div>
          
          {/* Status */}
          <div className="p-4 bg-hive-background-secondary border-t border-hive-border-subtle">
            <p className="text-sm text-hive-text-secondary">
              Current: {currentPath} • Collapsed: {collapsed ? 'Yes' : 'No'} • User: {user ? user.name : 'Signed out'}
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// All navigation states
export const AllNavigationStates: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary">
      <h3 className="text-lg font-semibold text-hive-text-primary mb-6">All Sidebar States</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-hive-text-secondary mb-3">Default State - Feed Active</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden h-96">
            <Sidebar
              user={{ id: '1', name: 'Alex Rodriguez', handle: 'alexr' }}
              currentPath="/feed"
              collapsed={false}
              onItemClick={(href) => alert(`Clicked: ${href}`)}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-3">Collapsed State - Tools Active</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden h-96">
            <Sidebar
              user={{ id: '2', name: 'Sarah Chen', handle: 'sarahc' }}
              currentPath="/tools"
              collapsed={true}
              onItemClick={(href) => alert(`Clicked: ${href}`)}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-3">With Breadcrumbs - Spaces Navigation</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden h-96">
            <Sidebar
              user={{ id: '3', name: 'Marcus Johnson', handle: 'marcusj' }}
              currentPath="/spaces/browse"
              collapsed={false}
              breadcrumbs={[
                { label: 'Dashboard', href: '/' },
                { label: 'Spaces', href: '/spaces' },
                { label: 'Browse' },
              ]}
              onItemClick={(href) => alert(`Clicked: ${href}`)}
            />
          </div>
        </div>
        
        <div>
          <p className="text-sm text-hive-text-secondary mb-3">Signed Out State</p>
          <div className="border border-hive-border-subtle rounded-lg overflow-hidden h-96">
            <Sidebar
              user={null}
              currentPath="/settings"
              collapsed={false}
              onItemClick={(href) => alert(`Clicked: ${href}`)}
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
    currentPath: '/feed',
    collapsed: false,
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Feed' },
    ],
  },
};