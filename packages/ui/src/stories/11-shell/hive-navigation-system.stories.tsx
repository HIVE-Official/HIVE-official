import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveNavigationShell, 
  navigationPresets,
  type NavigationSection,
  type NavigationUser 
} from '../../components/navigation/hive-navigation-shell';
import { 
  Home, Users, Zap, Calendar, BookOpen, Settings, 
  User, Bell, Search, Plus, Hash, Star, TrendingUp,
  FileText, Camera, MessageSquare, Shield, Globe
} from 'lucide-react';

const meta: Meta<typeof HiveNavigationShell> = {
  title: '11-Shell/HIVE Navigation System',
  component: HiveNavigationShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Navigation System

A comprehensive, unified navigation system for the HIVE platform with multiple variants and full customization options.

## Features

- **Multiple Variants**: Sidebar, Topbar, Command, Minimal
- **Responsive Design**: Automatic mobile adaptation
- **Keyboard Shortcuts**: Full keyboard navigation support
- **Accessibility**: WCAG compliant with screen reader support
- **Design System Integration**: Uses HIVE design tokens
- **Customizable**: Extensive configuration options

## Navigation Variants

### Sidebar Navigation
Traditional left sidebar with collapsible sections. Perfect for desktop applications.

### Topbar Navigation  
Horizontal navigation bar with mobile-friendly dropdown. Great for content-heavy apps.

### Command Navigation
Minimal UI with command palette focus. Ideal for power users.

### Minimal Navigation
Floating navigation bar for immersive experiences.

## Usage

\`\`\`tsx
import { HiveNavigationShell } from '@hive/ui';

<HiveNavigationShell
  variant="sidebar"
  sections={navigationSections}
  user={currentUser}
  onNavigate={(item) => console.log('Navigating to:', item)}
>
  <YourAppContent />
</HiveNavigationShell>
\`\`\`
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['sidebar', 'topbar', 'command', 'minimal'],
      description: 'Navigation layout variant'
    },
    size: {
      control: 'select',
      options: ['compact', 'standard', 'expanded'],
      description: 'Navigation size'
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search functionality'
    },
    showNotifications: {
      control: 'boolean',
      description: 'Show notification bell'
    },
    showUserMenu: {
      control: 'boolean',
      description: 'Show user menu'
    },
    showBranding: {
      control: 'boolean',
      description: 'Show HIVE branding'
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow sidebar collapse'
    },
    defaultCollapsed: {
      control: 'boolean',
      description: 'Start collapsed'
    },
    keyboardShortcuts: {
      control: 'boolean',
      description: 'Enable keyboard shortcuts'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock user data
const mockUser: NavigationUser = {
  id: 'user-1',
  name: 'Alex Rivera',
  handle: 'alexr',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  role: 'Student',
  status: 'online'
};

// Mock navigation sections
const mockSections: NavigationSection[] = [
  {
    id: 'main',
    label: 'Main',
    items: [
      {
        id: 'feed',
        label: 'Feed',
        icon: Home,
        href: '/',
        isActive: true,
        description: 'Your personalized campus feed',
        keywords: ['home', 'dashboard', 'feed']
      },
      {
        id: 'spaces',
        label: 'Spaces',
        icon: Users,
        href: '/spaces',
        badge: { count: 5 },
        description: 'Campus communities and groups',
        keywords: ['spaces', 'communities', 'groups']
      },
      {
        id: 'build',
        label: 'Build',
        icon: Zap,
        href: '/build',
        description: 'Create tools with HiveLab',
        keywords: ['build', 'create', 'tools', 'hivelab']
      },
      {
        id: 'events',
        label: 'Events',
        icon: Calendar,
        href: '/events',
        badge: { count: 3, variant: 'warning' },
        description: 'Campus events and meetings',
        keywords: ['events', 'calendar', 'meetings']
      },
      {
        id: 'resources',
        label: 'Resources',
        icon: BookOpen,
        href: '/resources',
        description: 'Educational resources and docs',
        keywords: ['resources', 'docs', 'help']
      }
    ]
  },
  {
    id: 'tools',
    label: 'Popular Tools',
    items: [
      {
        id: 'gpa-calc',
        label: 'GPA Calculator',
        icon: Hash,
        href: '/tools/gpa-calculator',
        description: 'Calculate your semester GPA',
        keywords: ['gpa', 'calculator', 'grades']
      },
      {
        id: 'study-planner',
        label: 'Study Planner',
        icon: Calendar,
        href: '/tools/study-planner',
        badge: { count: 2 },
        description: 'Plan your study schedule',
        keywords: ['study', 'planning', 'schedule']
      },
      {
        id: 'grade-tracker',
        label: 'Grade Tracker',
        icon: TrendingUp,
        href: '/tools/grade-tracker',
        description: 'Track your academic progress',
        keywords: ['grades', 'tracking', 'progress']
      }
    ]
  },
  {
    id: 'personal',
    label: 'Personal',
    items: [
      {
        id: 'profile',
        label: 'Profile',
        icon: User,
        href: '/profile',
        description: 'Your personal profile',
        keywords: ['profile', 'account', 'user']
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/settings',
        description: 'App preferences and settings',
        keywords: ['settings', 'preferences', 'config']
      }
    ]
  }
];

// Sample content component
const SampleContent = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
        Welcome to HIVE
      </h1>
      <p className="text-lg mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
        Your campus platform for collaboration, learning, and building amazing tools.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      <h2 style={{ color: 'var(--hive-text-primary)' }}>Recent Activity</h2>
      <div className="space-y-4">
        {[
          'Built a new GPA calculator tool',
          'Joined Computer Science Study Group',
          'Completed Machine Learning assignment',
          'Scheduled study session for Friday'
        ].map((activity, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--hive-background-secondary)',
              borderColor: 'var(--hive-border-primary)'
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--hive-brand-primary)' }}
            />
            <span style={{ color: 'var(--hive-text-primary)' }}>{activity}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ============================================================================
// STORIES
// ============================================================================

export const SidebarNavigation: Story = {
  args: {
    variant: 'sidebar',
    size: 'standard',
    user: mockUser,
    sections: mockSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const TopbarNavigation: Story = {
  args: {
    variant: 'topbar',
    size: 'standard',
    user: mockUser,
    sections: mockSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const CommandNavigation: Story = {
  args: {
    variant: 'command',
    size: 'standard',
    user: mockUser,
    sections: mockSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const MinimalNavigation: Story = {
  args: {
    variant: 'minimal',
    size: 'compact',
    user: mockUser,
    sections: mockSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const CompactSidebar: Story = {
  args: {
    variant: 'sidebar',
    size: 'compact',
    user: mockUser,
    sections: mockSections,
    showSearch: false,
    showNotifications: false,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    defaultCollapsed: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const ExpandedSidebar: Story = {
  args: {
    variant: 'sidebar',
    size: 'expanded',
    user: mockUser,
    sections: mockSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const WithoutUser: Story = {
  args: {
    variant: 'sidebar',
    size: 'standard',
    user: null,
    sections: mockSections,
    showSearch: true,
    showNotifications: false,
    showUserMenu: false,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const NoSearch: Story = {
  args: {
    variant: 'topbar',
    size: 'standard',
    user: mockUser,
    sections: mockSections,
    showSearch: false,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    keyboardShortcuts: true,
    children: <SampleContent />
  }
};

export const AdminDashboard: Story = {
  args: {
    variant: 'sidebar',
    size: 'expanded',
    user: {
      ...mockUser,
      name: 'Jordan Admin',
      role: 'Administrator'
    },
    sections: [
      {
        id: 'admin',
        label: 'Administration',
        items: [
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: Home,
            href: '/admin/dashboard',
            isActive: true,
            description: 'Admin dashboard overview'
          },
          {
            id: 'users',
            label: 'User Management',
            icon: Users,
            href: '/admin/users',
            badge: { count: 1247 },
            description: 'Manage platform users'
          },
          {
            id: 'content',
            label: 'Content Moderation',
            icon: Shield,
            href: '/admin/content',
            badge: { count: 8, variant: 'warning' },
            description: 'Review flagged content'
          },
          {
            id: 'analytics',
            label: 'Analytics',
            icon: TrendingUp,
            href: '/admin/analytics',
            description: 'Platform analytics and metrics'
          }
        ]
      },
      {
        id: 'system',
        label: 'System',
        items: [
          {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            href: '/admin/settings',
            description: 'System configuration'
          },
          {
            id: 'logs',
            label: 'Activity Logs',
            icon: FileText,
            href: '/admin/logs',
            description: 'System activity logs'
          }
        ]
      }
    ],
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
    children: (
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
    )
  }
};

// ============================================================================
// PRESET STORIES
// ============================================================================

export const PresetSidebar: Story = {
  args: {
    ...navigationPresets.sidebar,
    user: mockUser,
    sections: mockSections,
    children: <SampleContent />
  }
};

export const PresetCompact: Story = {
  args: {
    ...navigationPresets.compact,
    user: mockUser,
    sections: mockSections,
    children: <SampleContent />
  }
};

export const PresetTopbar: Story = {
  args: {
    ...navigationPresets.topbar,
    user: mockUser,
    sections: mockSections,
    children: <SampleContent />
  }
};

export const PresetCommand: Story = {
  args: {
    ...navigationPresets.command,
    user: mockUser,
    sections: mockSections,
    children: <SampleContent />
  }
};

export const PresetMinimal: Story = {
  args: {
    ...navigationPresets.minimal,
    user: mockUser,
    sections: mockSections,
    children: <SampleContent />
  }
};

export const PresetAdmin: Story = {
  args: {
    ...navigationPresets.admin,
    user: { ...mockUser, role: 'Administrator' },
    sections: [
      {
        id: 'admin',
        label: 'Administration',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/admin', isActive: true },
          { id: 'users', label: 'Users', icon: Users, href: '/admin/users', badge: { count: 1247 } },
          { id: 'content', label: 'Content', icon: Shield, href: '/admin/content', badge: { count: 8, variant: 'warning' } },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/admin/analytics' }
        ]
      }
    ],
    children: <SampleContent />
  }
};

// ============================================================================
// INTERACTIVE DEMO
// ============================================================================

export const InteractiveDemo: Story = {
  args: {
    variant: 'sidebar',
    size: 'standard',
    user: mockUser,
    sections: mockSections,
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
    children: (
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
            Interactive Navigation Demo
          </h1>
          <p className="text-lg mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Try these keyboard shortcuts:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Cmd/Ctrl + K</kbd>
              <span className="ml-2" style={{ color: 'var(--hive-text-primary)' }}>Open search</span>
            </div>
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Cmd/Ctrl + B</kbd>
              <span className="ml-2" style={{ color: 'var(--hive-text-primary)' }}>Toggle sidebar</span>
            </div>
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">Escape</kbd>
              <span className="ml-2" style={{ color: 'var(--hive-text-primary)' }}>Close overlays</span>
            </div>
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <kbd className="px-2 py-1 bg-gray-700 rounded text-sm">↑↓</kbd>
              <span className="ml-2" style={{ color: 'var(--hive-text-primary)' }}>Navigate search</span>
            </div>
          </div>
        </div>
        
        <SampleContent />
      </div>
    )
  }
};