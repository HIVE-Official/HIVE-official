import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedNavigationBar } from '../../components/navigation/enhanced-navigation-bar';

const meta = {
  title: '11-Shell/Enhanced Navigation Bar',
  component: EnhancedNavigationBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Enhanced Navigation Bar

A sophisticated navigation bar with nested dropdowns, designed for the HIVE platform. Features:

## Key Features
- **Multi-level Dropdowns**: Support for nested navigation with smooth animations
- **Contextual Menus**: Rich descriptions and featured items
- **Global Search**: Integrated command palette trigger
- **User Menu**: Comprehensive account management
- **Builder Tools**: Quick access to HiveLab features
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Full keyboard navigation support

## Navigation Structure
- **Spaces**: Discover, create, and manage campus spaces
- **HiveLab**: Builder console and tool creation
- **Feed**: Activity streams and trending content  
- **Resources**: Help, community, and guides

## Dropdown Features
- **Featured Items**: Highlighted important actions
- **Descriptions**: Contextual help text
- **Icons**: Visual navigation cues
- **Badges**: Notification counts and status
- **Nested Menus**: Multi-level organization
- **Hover Interactions**: Smooth micro-animations
        `
      }
    }
  },
  argTypes: {
    showGlobalSearch: {
      control: 'boolean',
      description: 'Show the global search input'
    },
    showNotifications: {
      control: 'boolean', 
      description: 'Show notification bell'
    },
    unreadNotificationCount: {
      control: 'number',
      description: 'Number of unread notifications'
    }
  }
} satisfies Meta<typeof EnhancedNavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock user data
const mockUser = {
  id: 'user-1',
  name: 'Sarah Chen',
  handle: 'sarahc',
  builderStatus: 'active' as const,
  role: 'student' as const
};

const mockUserFaculty = {
  id: 'user-2', 
  name: 'Dr. Smith',
  handle: 'drsmith',
  builderStatus: 'none' as const,
  role: 'faculty' as const
};

export const Default: Story = {
  args: {
    user: mockUser,
    showGlobalSearch: true,
    showNotifications: true,
    unreadNotificationCount: 3
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-900">
      <EnhancedNavigationBar {...args} />
      <div className="pt-16 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">Enhanced Navigation Demo</h1>
          <div className="bg-[var(--hive-text-primary)]/5 rounded-xl p-6 space-y-4">
            <p className="text-[var(--hive-text-primary)]/80">
              This enhanced navigation bar features multi-level dropdowns with rich content and smooth animations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-[var(--hive-text-primary)]">Navigation Features:</h3>
                <ul className="text-[var(--hive-text-primary)]/70 space-y-1">
                  <li>• Nested dropdown menus</li>
                  <li>• Featured items highlighting</li>
                  <li>• Contextual descriptions</li>
                  <li>• Smooth hover animations</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-[var(--hive-text-primary)]">Interactions:</h3>
                <ul className="text-[var(--hive-text-primary)]/70 space-y-1">
                  <li>• Click main nav items to open dropdowns</li>
                  <li>• Hover over submenu items</li>
                  <li>• Try the global search (Cmd+K)</li>
                  <li>• Explore the user menu</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const StudentUser: Story = {
  args: {
    user: mockUser,
    showGlobalSearch: true,
    showNotifications: true,
    unreadNotificationCount: 5
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-900">
      <EnhancedNavigationBar {...args} />
      <div className="pt-16 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">Student Navigation</h1>
          <p className="text-[var(--hive-text-primary)]/70">Student view with builder access and full navigation</p>
        </div>
      </div>
    </div>
  )
};

export const FacultyUser: Story = {
  args: {
    user: mockUserFaculty,
    showGlobalSearch: true,
    showNotifications: true,
    unreadNotificationCount: 1
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-900">
      <EnhancedNavigationBar {...args} />
      <div className="pt-16 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">Faculty Navigation</h1>
          <p className="text-[var(--hive-text-primary)]/70">Faculty view with restricted builder access</p>
        </div>
      </div>
    </div>
  )
};

export const WithManyNotifications: Story = {
  args: {
    user: mockUser,
    showGlobalSearch: true,
    showNotifications: true,
    unreadNotificationCount: 15
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-900">
      <EnhancedNavigationBar {...args} />
      <div className="pt-16 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">High Activity</h1>
          <p className="text-[var(--hive-text-primary)]/70">Navigation with many unread notifications (shows 9+)</p>
        </div>
      </div>
    </div>
  )
};

export const NoSearchNoNotifications: Story = {
  args: {
    user: mockUser,
    showGlobalSearch: false,
    showNotifications: false,
    unreadNotificationCount: 0
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-900">
      <EnhancedNavigationBar {...args} />
      <div className="pt-16 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">Minimal Navigation</h1>
          <p className="text-[var(--hive-text-primary)]/70">Simplified navigation without search or notifications</p>
        </div>
      </div>
    </div>
  )
};

export const LoggedOut: Story = {
  args: {
    user: null,
    showGlobalSearch: true,
    showNotifications: false,
    unreadNotificationCount: 0
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-900">
      <EnhancedNavigationBar {...args} />
      <div className="pt-16 p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">Public Navigation</h1>
          <p className="text-[var(--hive-text-primary)]/70">Navigation for logged-out users</p>
        </div>
      </div>
    </div>
  )
};

export const InteractivePlayground: Story = {
  args: {
    user: mockUser,
    showGlobalSearch: true,
    showNotifications: true,
    unreadNotificationCount: 3
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-900">
      <EnhancedNavigationBar {...args} />
      <div className="pt-16 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-6">Interactive Navigation Playground</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[var(--hive-text-primary)]/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">Dropdown Features</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-[var(--hive-text-primary)]/80">Featured items (highlighted in gold)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-[var(--hive-text-primary)]/80">Nested submenu navigation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-[var(--hive-text-primary)]/80">Contextual descriptions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-[var(--hive-text-primary)]/80">Smooth hover animations</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[var(--hive-text-primary)]/5 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">Navigation Structure</h2>
              <div className="space-y-2 text-sm text-[var(--hive-text-primary)]/70">
                <div className="font-medium text-[var(--hive-text-primary)]">Spaces</div>
                <div className="ml-4">→ My Spaces, Discover, Create, Categories</div>
                <div className="font-medium text-[var(--hive-text-primary)]">HiveLab</div>
                <div className="ml-4">→ Console, Templates, Analytics, Builder Tools</div>
                <div className="font-medium text-[var(--hive-text-primary)]">Feed</div>
                <div className="ml-4">→ Home, Trending, Bookmarks, Discussions</div>
                <div className="font-medium text-[var(--hive-text-primary)]">Resources</div>
                <div className="ml-4">→ Help Center, Community, Campus Guide</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-400 mb-2">Try These Interactions</h3>
            <ul className="text-yellow-200 space-y-1 text-sm">
              <li>• Hover over "Spaces" → "Categories" to see the nested submenu</li>
              <li>• Click "HiveLab" to see builder tools and featured items</li>
              <li>• Try the global search bar or press Cmd+K</li>
              <li>• Click your user avatar to access account settings</li>
              <li>• Notice the builder status indicator (⚡) for active builders</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};