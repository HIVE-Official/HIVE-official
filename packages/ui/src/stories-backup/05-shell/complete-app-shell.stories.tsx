import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedAppShell } from '../../components/shell/enhanced-app-shell';

// Mock user data for shell context
const mockUser = {
  id: 'user-123',
  name: 'Alex Rodriguez',
  handle: 'alexr',
  email: 'alex.rodriguez@university.edu',
  profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  isBuilder: true,
  userType: 'student' as const,
  university: 'Tech University',
  year: 'Junior',
  major: 'Computer Science',
};

const mockNotifications = [
  {
    id: 'notif-1',
    type: 'event' as const,
    title: 'Study session in 30 minutes',
    message: 'Data Structures review session starting soon',
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    isRead: false,
    actionUrl: '/events/study-session-123',
  },
  {
    id: 'notif-2',
    type: 'space' as const,
    title: 'New member in CS Study Group',
    message: 'Sarah Chen joined your study group',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
    actionUrl: '/spaces/cs-study-group',
  },
  {
    id: 'notif-3',
    type: 'tool' as const,
    title: 'GPA Calculator updated',
    message: 'New semester planning features available',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    isRead: true,
    actionUrl: '/tools/gpa-calculator',
  },
  {
    id: 'notif-4',
    type: 'achievement' as const,
    title: 'Streak milestone reached!',
    message: 'You\'ve maintained a 20-day activity streak',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

const mockBreadcrumbs = [
  { label: 'Dashboard', href: '/', icon: 'Home' },
  { label: 'Profile', href: '/profile', icon: 'User' },
  { label: 'Settings' },
];

// Sample page content components
const DashboardContent = () => (
  <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Your Spaces</h3>
        <p className="text-hive-text-mutedLight mb-4">Active in 8 spaces</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-primary">CS Study Group</span>
            <span className="text-xs text-hive-text-mutedLight">24 members</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-primary">Dorm Floor 3B</span>
            <span className="text-xs text-hive-text-mutedLight">18 members</span>
          </div>
        </div>
      </div>
      
      <div className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Upcoming Events</h3>
        <p className="text-hive-text-mutedLight mb-4">3 events this week</p>
        <div className="space-y-2">
          <div className="text-sm">
            <div className="text-hive-text-primary">Study Session</div>
            <div className="text-xs text-hive-text-mutedLight">Today at 3:00 PM</div>
          </div>
          <div className="text-sm">
            <div className="text-hive-text-primary">Floor Meeting</div>
            <div className="text-xs text-hive-text-mutedLight">Tomorrow at 7:00 PM</div>
          </div>
        </div>
      </div>
      
      <div className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Your Tools</h3>
        <p className="text-hive-text-mutedLight mb-4">Using 5 tools</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-primary">GPA Calculator</span>
            <span className="text-xs text-hive-text-mutedLight">⭐ 4.9</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-primary">Study Timer</span>
            <span className="text-xs text-hive-text-mutedLight">⭐ 4.7</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProfileContent = () => (
  <div className="p-6 space-y-6">
    <div className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={mockUser.profilePhoto}
          alt={mockUser.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-hive-text-primary">{mockUser.name}</h2>
          <p className="text-hive-text-mutedLight">@{mockUser.handle}</p>
          <p className="text-sm text-hive-text-mutedLight mt-1">
            {mockUser.year} • {mockUser.major} • {mockUser.university}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-hive-text-primary">12</div>
          <div className="text-xs text-hive-text-mutedLight">Spaces</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-hive-text-primary">89</div>
          <div className="text-xs text-hive-text-mutedLight">Connections</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-hive-text-primary">23</div>
          <div className="text-xs text-hive-text-mutedLight">Day Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-hive-text-primary">892</div>
          <div className="text-xs text-hive-text-mutedLight">Reputation</div>
        </div>
      </div>
    </div>
  </div>
);

const SpacesContent = () => (
  <div className="p-6 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { name: 'CS Study Group', members: 24, type: 'Academic', active: true },
        { name: 'Dorm Floor 3B', members: 18, type: 'Residential', active: true },
        { name: 'Photography Club', members: 45, type: 'Interest', active: false },
        { name: 'Women in Tech', members: 67, type: 'Community', active: true },
        { name: 'Rock Climbing', members: 32, type: 'Recreation', active: true },
        { name: 'Study Abroad', members: 156, type: 'Academic', active: false },
      ].map((space, index) => (
        <div key={index} className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-hive-text-primary">{space.name}</h3>
            <div className={`w-2 h-2 rounded-full ${space.active ? 'bg-green-400' : 'bg-gray-400'}`} />
          </div>
          <p className="text-sm text-hive-text-mutedLight mb-2">{space.type}</p>
          <p className="text-xs text-hive-text-mutedLight">{space.members} members</p>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta<typeof EnhancedAppShell> = {
  title: '05-Shell/Complete App Shell',
  component: EnhancedAppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete HIVE application shell with navigation, notifications, and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentSection: {
      control: 'select',
      options: ['dashboard', 'profile', 'spaces', 'tools', 'calendar', 'feed', 'settings'],
      description: 'Current active navigation section',
    },
    user: {
      description: 'Current user data',
    },
    notifications: {
      description: 'User notifications',
    },
    breadcrumbs: {
      description: 'Breadcrumb navigation',
    },
    sidebarCollapsed: {
      control: 'boolean',
      description: 'Whether sidebar is collapsed',
    },
    showNotifications: {
      control: 'boolean',
      description: 'Whether to show notification center',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Dashboard view
export const Dashboard: Story = {
  args: {
    currentSection: 'dashboard',
    user: mockUser,
    notifications: mockNotifications,
    breadcrumbs: [{ label: 'Dashboard' }],
    sidebarCollapsed: false,
    showNotifications: false,
    children: <DashboardContent />,
  },
};

// Profile view
export const Profile: Story = {
  args: {
    currentSection: 'profile',
    user: mockUser,
    notifications: mockNotifications,
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Profile' },
    ],
    sidebarCollapsed: false,
    showNotifications: false,
    children: <ProfileContent />,
  },
};

// Spaces view
export const Spaces: Story = {
  args: {
    currentSection: 'spaces',
    user: mockUser,
    notifications: mockNotifications,
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Spaces' },
    ],
    sidebarCollapsed: false,
    showNotifications: false,
    children: <SpacesContent />,
  },
};

// Collapsed sidebar
export const CollapsedSidebar: Story = {
  args: {
    currentSection: 'dashboard',
    user: mockUser,
    notifications: mockNotifications,
    breadcrumbs: [{ label: 'Dashboard' }],
    sidebarCollapsed: true,
    showNotifications: false,
    children: <DashboardContent />,
  },
};

// With notifications open
export const WithNotifications: Story = {
  args: {
    currentSection: 'dashboard',
    user: mockUser,
    notifications: mockNotifications,
    breadcrumbs: [{ label: 'Dashboard' }],
    sidebarCollapsed: false,
    showNotifications: true,
    children: <DashboardContent />,
  },
};

// Builder user view
export const BuilderView: Story = {
  args: {
    currentSection: 'tools',
    user: {
      ...mockUser,
      isBuilder: true,
      name: 'Sarah Builder',
      handle: 'sarahbuilds',
    },
    notifications: [
      {
        id: 'builder-notif-1',
        type: 'tool' as const,
        title: 'Your tool gained 10 new users!',
        message: 'GPA Calculator is trending this week',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        isRead: false,
      },
      ...mockNotifications.slice(1),
    ],
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Tools' },
    ],
    sidebarCollapsed: false,
    showNotifications: false,
    children: (
      <div className="p-6">
        <div className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-6">
          <h2 className="text-xl font-bold text-hive-text-primary mb-4">Your Created Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-hive-border-default rounded-lg p-4">
              <h3 className="font-semibold text-hive-text-primary">GPA Calculator</h3>
              <p className="text-sm text-hive-text-mutedLight mt-1">127 active users</p>
              <p className="text-xs text-hive-text-mutedLight mt-2">⭐ 4.9 rating</p>
            </div>
            <div className="border border-hive-border-default rounded-lg p-4">
              <h3 className="font-semibold text-hive-text-primary">Study Timer</h3>
              <p className="text-sm text-hive-text-mutedLight mt-1">89 active users</p>
              <p className="text-xs text-hive-text-mutedLight mt-2">⭐ 4.7 rating</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

// Mobile view
export const Mobile: Story = {
  args: {
    currentSection: 'dashboard',
    user: mockUser,
    notifications: mockNotifications.slice(0, 3),
    breadcrumbs: [{ label: 'Dashboard' }],
    sidebarCollapsed: true, // Always collapsed on mobile
    showNotifications: false,
    children: <DashboardContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
};

// Loading state
export const Loading: Story = {
  args: {
    currentSection: 'dashboard',
    user: null, // No user data loaded
    notifications: [],
    breadcrumbs: [{ label: 'Dashboard' }],
    sidebarCollapsed: false,
    showNotifications: false,
    children: (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-hive-background-overlay rounded-lg p-6">
                <div className="h-4 bg-hive-background-tertiary rounded mb-3"></div>
                <div className="h-3 bg-hive-background-tertiary rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-2 bg-hive-background-tertiary rounded"></div>
                  <div className="h-2 bg-hive-background-tertiary rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
};

// Deep navigation example
export const DeepNavigation: Story = {
  args: {
    currentSection: 'spaces',
    user: mockUser,
    notifications: mockNotifications,
    breadcrumbs: [
      { label: 'Dashboard', href: '/' },
      { label: 'Spaces', href: '/spaces' },
      { label: 'CS Study Group', href: '/spaces/cs-study-group' },
      { label: 'Settings' },
    ],
    sidebarCollapsed: false,
    showNotifications: false,
    children: (
      <div className="p-6">
        <div className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-6">
          <h2 className="text-xl font-bold text-hive-text-primary mb-4">CS Study Group Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-hive-text-primary mb-2">
                Space Name
              </label>
              <input
                type="text"
                value="CS Study Group"
                className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-md text-hive-text-primary"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-hive-text-primary mb-2">
                Description
              </label>
              <textarea
                value="Weekly study sessions for computer science courses. We cover algorithms, data structures, and exam prep."
                className="w-full px-3 py-2 bg-hive-background-tertiary border border-hive-border-default rounded-md text-hive-text-primary h-20"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    ),
  },
};

// All navigation sections showcase
export const NavigationShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-hive-background-primary">
      {[
        { section: 'dashboard', label: 'Dashboard' },
        { section: 'profile', label: 'Profile' },
        { section: 'spaces', label: 'Spaces' },
        { section: 'tools', label: 'Tools' },
        { section: 'calendar', label: 'Calendar' },
        { section: 'feed', label: 'Feed' },
        { section: 'settings', label: 'Settings' },
      ].map(({ section, label }) => (
        <div key={section} className="bg-hive-background-overlay border border-hive-border-default rounded-lg p-4">
          <div className="flex items-center space-x-3">
            {/* Navigation icon would go here */}
            <div className="w-8 h-8 bg-hive-gold rounded-md flex items-center justify-center">
              <span className="text-sm font-semibold text-hive-obsidian">
                {label.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-hive-text-primary">{label}</h3>
              <p className="text-xs text-hive-text-mutedLight">
                {section === 'dashboard' && 'Your personal command center'}
                {section === 'profile' && 'Manage your identity and stats'}
                {section === 'spaces' && 'Communities and collaborations'}
                {section === 'tools' && 'Productivity and utility apps'}
                {section === 'calendar' && 'Events and scheduling'}
                {section === 'feed' && 'Activity and updates'}
                {section === 'settings' && 'Preferences and configuration'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};