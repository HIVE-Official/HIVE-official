import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveNavigationShell, 
  navigationPresets,
  type NavigationSection,
  type NavigationUser 
} from '../../components/navigation/hive-navigation-shell';
import { 
  Home, Users, Zap, Calendar, BookOpen, Settings, 
  User, TrendingUp, Hash, Shield, FileText
} from 'lucide-react';

const meta: Meta = {
  title: '11-Shell/Navigation Variants Comparison',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Navigation Variants Comparison

This story showcases all navigation variants side by side to help you choose the best one for your use case.

## When to Use Each Variant

### Sidebar Navigation
**Best for:** Desktop applications, admin panels, complex workflows
- **Pros:** Space for many navigation items, clear hierarchy, familiar pattern
- **Cons:** Takes up horizontal space, may not work well on narrow screens

### Topbar Navigation
**Best for:** Content-heavy apps, marketing sites, simple workflows
- **Pros:** Maximizes content space, mobile-friendly, modern look
- **Cons:** Limited space for navigation items, may need dropdown menus

### Command Navigation
**Best for:** Power users, developer tools, productivity apps
- **Pros:** Keyboard-driven, minimal UI, very fast navigation
- **Cons:** Learning curve, not suitable for casual users

### Minimal Navigation
**Best for:** Immersive experiences, creative tools, focused work
- **Pros:** Maximum content space, beautiful aesthetic, non-intrusive
- **Cons:** Limited functionality, may hide important actions

## Design Considerations

- **Screen Size:** Sidebar works best on desktop, topbar on mobile
- **User Type:** Command palette for power users, topbar for casual users
- **Content Type:** Minimal for content consumption, sidebar for complex UIs
- **Brand:** All variants maintain HIVE design consistency
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data
const mockUser: NavigationUser = {
  id: 'user-1',
  name: 'Alex Rivera',
  handle: 'alexr',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'Student',
  status: 'online'
};

const mockSections: NavigationSection[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      { id: 'feed', label: 'Feed', icon: Home, href: '/', isActive: true },
      { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces', badge: { count: 5 } },
      { id: 'build', label: 'Build', icon: Zap, href: '/build' },
      { id: 'events', label: 'Events', icon: Calendar, href: '/events' },
      { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources' }
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    items: [
      { id: 'gpa-calc', label: 'GPA Calculator', icon: Hash, href: '/tools/gpa' },
      { id: 'grade-tracker', label: 'Grade Tracker', icon: TrendingUp, href: '/tools/grades' }
    ]
  },
  {
    id: 'personal',
    label: 'Personal',
    items: [
      { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
      { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' }
    ]
  }
];

const SampleContent = ({ variant }: { variant: string }) => (
  <div className="p-8 max-w-4xl mx-auto">
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
        {variant.charAt(0).toUpperCase() + variant.slice(1)} Navigation
      </h1>
      <p className="text-lg mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
        This demonstrates the {variant} navigation variant with sample content.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[
        { title: 'Active Spaces', value: '12', icon: Users },
        { title: 'Tools Built', value: '8', icon: Zap },
        { title: 'Events This Week', value: '5', icon: Calendar }
      ].map((metric) => (
        <div 
          key={metric.title}
          className="p-6 rounded-lg border"
          style={{ 
            backgroundColor: 'var(--hive-background-secondary)',
            borderColor: 'var(--hive-border-primary)'
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <metric.icon className="w-5 h-5" style={{ color: 'var(--hive-brand-primary)' }} />
            <h3 className="font-semibold" style={{ color: 'var(--hive-text-primary)' }}>
              {metric.title}
            </h3>
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--hive-text-primary)' }}>
            {metric.value}
          </p>
        </div>
      ))}
    </div>

    <div className="prose prose-invert max-w-none">
      <h2 style={{ color: 'var(--hive-text-primary)' }}>About {variant} Navigation</h2>
      <div className="space-y-4">
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: 'var(--hive-background-secondary)',
            borderColor: 'var(--hive-border-primary)'
          }}
        >
          <p style={{ color: 'var(--hive-text-primary)' }}>
            The {variant} navigation provides a {variant === 'sidebar' ? 'traditional left-side' : 
            variant === 'topbar' ? 'horizontal top-bar' : 
            variant === 'command' ? 'command palette-driven' : 'minimal floating'} approach to navigation.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================================
// COMPARISON STORIES
// ============================================================================

export const SidebarVariant: Story = {
  render: () => (
    <HiveNavigationShell
      variant="sidebar"
      user={mockUser}
      sections={mockSections}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      collapsible={true}
      keyboardShortcuts={true}
    >
      <SampleContent variant="sidebar" />
    </HiveNavigationShell>
  )
};

export const TopbarVariant: Story = {
  render: () => (
    <HiveNavigationShell
      variant="topbar"
      user={mockUser}
      sections={mockSections}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      keyboardShortcuts={true}
    >
      <SampleContent variant="topbar" />
    </HiveNavigationShell>
  )
};

export const CommandVariant: Story = {
  render: () => (
    <HiveNavigationShell
      variant="command"
      user={mockUser}
      sections={mockSections}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      keyboardShortcuts={true}
    >
      <SampleContent variant="command" />
    </HiveNavigationShell>
  )
};

export const MinimalVariant: Story = {
  render: () => (
    <HiveNavigationShell
      variant="minimal"
      user={mockUser}
      sections={mockSections}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      keyboardShortcuts={true}
    >
      <SampleContent variant="minimal" />
    </HiveNavigationShell>
  )
};

// ============================================================================
// USAGE SCENARIOS
// ============================================================================

export const StudentDashboard: Story = {
  render: () => (
    <HiveNavigationShell
      variant="sidebar"
      size="standard"
      user={mockUser}
      sections={mockSections}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      collapsible={true}
      keyboardShortcuts={true}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--hive-text-primary)' }}>
          Student Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--hive-background-secondary)',
              borderColor: 'var(--hive-border-primary)'
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors">
                Calculate GPA
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors">
                Join Study Group
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors">
                Create Tool
              </button>
            </div>
          </div>
          
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--hive-background-secondary)',
              borderColor: 'var(--hive-border-primary)'
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
              Recent Activity
            </h3>
            <div className="space-y-2 text-sm">
              <div>Built GPA calculator</div>
              <div>Joined CS Study Group</div>
              <div>Updated profile</div>
            </div>
          </div>
          
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--hive-background-secondary)',
              borderColor: 'var(--hive-border-primary)'
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
              Upcoming Events
            </h3>
            <div className="space-y-2 text-sm">
              <div>Study session - Tomorrow</div>
              <div>Project deadline - Friday</div>
              <div>Career fair - Next week</div>
            </div>
          </div>
        </div>
      </div>
    </HiveNavigationShell>
  )
};

export const AdminPanel: Story = {
  render: () => (
    <HiveNavigationShell
      variant="sidebar"
      size="expanded"
      user={{ ...mockUser, name: 'Jordan Admin', role: 'Administrator' }}
      sections={[
        {
          id: 'admin',
          label: 'Administration',
          items: [
            { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/admin', isActive: true },
            { id: 'users', label: 'User Management', icon: Users, href: '/admin/users', badge: { count: 1247 } },
            { id: 'content', label: 'Content Moderation', icon: Shield, href: '/admin/content', badge: { count: 8, variant: 'warning' } },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/admin/analytics' },
            { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
            { id: 'logs', label: 'Activity Logs', icon: FileText, href: '/admin/logs' }
          ]
        }
      ]}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      collapsible={true}
      keyboardShortcuts={true}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--hive-text-primary)' }}>
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Users', value: '1,247', change: '+12%' },
            { title: 'Active Spaces', value: '89', change: '+5%' },
            { title: 'Tools Created', value: '234', change: '+18%' },
            { title: 'Daily Active', value: '456', change: '+3%' }
          ].map((stat) => (
            <div 
              key={stat.title}
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--hive-text-secondary)' }}>
                {stat.title}
              </h3>
              <p className="text-2xl font-bold mb-1" style={{ color: 'var(--hive-text-primary)' }}>
                {stat.value}
              </p>
              <p className="text-sm" style={{ color: 'var(--hive-brand-primary)' }}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </HiveNavigationShell>
  )
};

export const MobileExperience: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => (
    <HiveNavigationShell
      variant="topbar"
      user={mockUser}
      sections={mockSections}
      showSearch={false}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      keyboardShortcuts={false}
      mobileBreakpoint={768}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
          Mobile Experience
        </h1>
        <div className="space-y-4">
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--hive-background-secondary)',
              borderColor: 'var(--hive-border-primary)'
            }}
          >
            <h3 className="font-semibold mb-2" style={{ color: 'var(--hive-text-primary)' }}>
              Today's Schedule
            </h3>
            <div className="space-y-2 text-sm">
              <div>9:00 AM - Calculus</div>
              <div>11:00 AM - Physics Lab</div>
              <div>2:00 PM - Study Group</div>
            </div>
          </div>
          
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--hive-background-secondary)',
              borderColor: 'var(--hive-border-primary)'
            }}
          >
            <h3 className="font-semibold mb-2" style={{ color: 'var(--hive-text-primary)' }}>
              Quick Tools
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="p-3 rounded-lg border text-center">
                GPA Calc
              </button>
              <button className="p-3 rounded-lg border text-center">
                Grades
              </button>
              <button className="p-3 rounded-lg border text-center">
                Schedule
              </button>
              <button className="p-3 rounded-lg border text-center">
                Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    </HiveNavigationShell>
  )
};

export const PowerUserWorkflow: Story = {
  render: () => (
    <HiveNavigationShell
      variant="command"
      user={mockUser}
      sections={mockSections}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      keyboardShortcuts={true}
    >
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--hive-text-primary)' }}>
          Power User Workflow
        </h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
            Keyboard Shortcuts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">⌘K</kbd>
                <span>Open command palette</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">⌘B</kbd>
                <span>Toggle sidebar</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">⌘/</kbd>
                <span>Search tools</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">⌘1</kbd>
                <span>Go to feed</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">⌘2</kbd>
                <span>Go to spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">⌘3</kbd>
                <span>Go to build</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--hive-text-secondary)' }}>
            Press <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">⌘K</kbd> to open the command palette
          </p>
          <p style={{ color: 'var(--hive-text-muted)' }}>
            Navigate entirely with your keyboard for maximum productivity
          </p>
        </div>
      </div>
    </HiveNavigationShell>
  )
};

export const ContentFocusedExperience: Story = {
  render: () => (
    <HiveNavigationShell
      variant="minimal"
      user={mockUser}
      sections={mockSections}
      showSearch={true}
      showNotifications={true}
      showUserMenu={true}
      showBranding={true}
      keyboardShortcuts={true}
    >
      <div className="p-8 max-w-4xl mx-auto">
        <article className="prose prose-invert max-w-none">
          <h1 style={{ color: 'var(--hive-text-primary)' }}>
            Content-Focused Experience
          </h1>
          <p style={{ color: 'var(--hive-text-secondary)' }}>
            The minimal navigation variant provides maximum space for content while keeping 
            essential navigation accessible when needed.
          </p>
          
          <h2 style={{ color: 'var(--hive-text-primary)' }}>
            Perfect for Reading
          </h2>
          <p style={{ color: 'var(--hive-text-secondary)' }}>
            This layout is ideal for documentation, articles, tutorials, and other content 
            that benefits from a distraction-free reading experience.
          </p>
          
          <h2 style={{ color: 'var(--hive-text-primary)' }}>
            Immersive Learning
          </h2>
          <p style={{ color: 'var(--hive-text-secondary)' }}>
            Students can focus on learning materials without visual clutter, while still 
            having quick access to tools and navigation when needed.
          </p>
          
          <div 
            className="not-prose p-6 rounded-lg border mt-8"
            style={{ 
              backgroundColor: 'var(--hive-background-secondary)',
              borderColor: 'var(--hive-border-primary)'
            }}
          >
            <h3 className="font-semibold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
              Key Benefits
            </h3>
            <ul className="space-y-2" style={{ color: 'var(--hive-text-secondary)' }}>
              <li>• Maximum content space</li>
              <li>• Minimal visual distraction</li>
              <li>• Beautiful, modern aesthetic</li>
              <li>• Quick access to navigation</li>
              <li>• Keyboard shortcuts available</li>
            </ul>
          </div>
        </article>
      </div>
    </HiveNavigationShell>
  )
};