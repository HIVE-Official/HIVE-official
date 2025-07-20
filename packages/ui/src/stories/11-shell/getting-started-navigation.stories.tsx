import type { Meta, StoryObj } from '@storybook/react';
import { HiveNavigationShell } from '../../components/navigation/hive-navigation-shell';
import { Home, Users, Zap, Settings, User } from 'lucide-react';

const meta: Meta<typeof HiveNavigationShell> = {
  title: '11-Shell/Getting Started with Navigation',
  component: HiveNavigationShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Getting Started with HIVE Navigation

This guide shows you how to quickly set up navigation in your HIVE application.

## 1. Basic Setup

The simplest way to add navigation to your app is with the \`HiveNavigationShell\` component:

\`\`\`tsx
import { HiveNavigationShell } from '@hive/ui';

const sections = [
  {
    id: 'main',
    label: 'Main',
    items: [
      { id: 'feed', label: 'Feed', icon: Home, href: '/', isActive: true },
      { id: 'spaces', label: 'Spaces', icon: Users, href: '/spaces' }
    ]
  }
];

function App() {
  return (
    <HiveNavigationShell sections={sections}>
      <YourAppContent />
    </HiveNavigationShell>
  );
}
\`\`\`

## 2. Add User Information

Include user information for a complete experience:

\`\`\`tsx
const user = {
  id: 'user-1',
  name: 'Alex Rivera',
  handle: 'alexr',
  avatar: '/path/to/avatar.jpg'
};

<HiveNavigationShell sections={sections} user={user}>
  <YourAppContent />
</HiveNavigationShell>
\`\`\`

## 3. Choose Your Variant

Select the navigation style that fits your app:

\`\`\`tsx
// Sidebar (default) - Traditional left sidebar
<HiveNavigationShell variant="sidebar" sections={sections} />

// Topbar - Horizontal navigation bar
<HiveNavigationShell variant="topbar" sections={sections} />

// Command - Minimal with command palette
<HiveNavigationShell variant="command" sections={sections} />

// Minimal - Floating navigation
<HiveNavigationShell variant="minimal" sections={sections} />
\`\`\`

## 4. Handle Navigation

Add navigation handling to respond to user clicks:

\`\`\`tsx
function App() {
  const handleNavigate = (item) => {
    console.log('Navigating to:', item.href);
    // Add your navigation logic here
  };

  return (
    <HiveNavigationShell 
      sections={sections} 
      onNavigate={handleNavigate}
    >
      <YourAppContent />
    </HiveNavigationShell>
  );
}
\`\`\`

## 5. Customize Features

Enable or disable features based on your needs:

\`\`\`tsx
<HiveNavigationShell
  sections={sections}
  showSearch={true}           // Enable search
  showNotifications={true}    // Enable notifications
  showUserMenu={true}         // Enable user menu
  keyboardShortcuts={true}    // Enable keyboard shortcuts
  collapsible={true}          // Enable sidebar collapse
>
  <YourAppContent />
</HiveNavigationShell>
\`\`\`

That's it! You now have a fully functional navigation system.
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Simple content component for examples
const ExampleContent = ({ title, description }: { title: string; description: string }) => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
      {title}
    </h1>
    <p className="text-lg mb-8" style={{ color: 'var(--hive-text-secondary)' }}>
      {description}
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        className="p-6 rounded-lg border"
        style={{ 
          backgroundColor: 'var(--hive-background-secondary)',
          borderColor: 'var(--hive-border-primary)'
        }}
      >
        <h3 className="font-semibold mb-3" style={{ color: 'var(--hive-text-primary)' }}>
          Quick Actions
        </h3>
        <div className="space-y-2">
          <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors">
            Create New Tool
          </button>
          <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors">
            Join Study Group
          </button>
          <button className="w-full text-left p-2 rounded hover:bg-gray-700 transition-colors">
            View Analytics
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
        <h3 className="font-semibold mb-3" style={{ color: 'var(--hive-text-primary)' }}>
          Recent Activity
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Built GPA calculator</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Joined CS Study Group</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Updated profile</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Basic navigation sections
const basicSections = [
  {
    id: 'main',
    label: 'Main',
    items: [
      {
        id: 'feed',
        label: 'Feed',
        icon: Home,
        href: '/',
        isActive: true
      },
      {
        id: 'spaces',
        label: 'Spaces',
        icon: Users,
        href: '/spaces'
      },
      {
        id: 'build',
        label: 'Build',
        icon: Zap,
        href: '/build'
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
        href: '/profile'
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: Settings,
        href: '/settings'
      }
    ]
  }
];

// ============================================================================
// GETTING STARTED STORIES
// ============================================================================

export const Step1_BasicSetup: Story = {
  name: '1. Basic Setup',
  args: {
    sections: basicSections,
    children: (
      <ExampleContent 
        title="Step 1: Basic Setup"
        description="This is the simplest navigation setup - just pass your navigation sections and you're ready to go!"
      />
    )
  }
};

export const Step2_AddUser: Story = {
  name: '2. Add User Information',
  args: {
    sections: basicSections,
    user: {
      id: 'user-1',
      name: 'Alex Rivera',
      handle: 'alexr',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    children: (
      <ExampleContent 
        title="Step 2: Add User Information"
        description="Add user information to enable the user menu and personalized experience."
      />
    )
  }
};

export const Step3_ChooseVariant: Story = {
  name: '3. Choose Your Variant',
  args: {
    variant: 'topbar',
    sections: basicSections,
    user: {
      id: 'user-1',
      name: 'Alex Rivera',
      handle: 'alexr',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    children: (
      <ExampleContent 
        title="Step 3: Choose Your Variant"
        description="This example shows the 'topbar' variant. Try changing the variant in the controls to see different navigation styles."
      />
    )
  }
};

export const Step4_HandleNavigation: Story = {
  name: '4. Handle Navigation',
  args: {
    sections: basicSections,
    user: {
      id: 'user-1',
      name: 'Alex Rivera',
      handle: 'alexr',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    onNavigate: (item) => {
      console.log('Navigating to:', item.href);
      alert(`Navigating to: ${item.label} (${item.href})`);
    },
    children: (
      <ExampleContent 
        title="Step 4: Handle Navigation"
        description="Click any navigation item to see the navigation handler in action. Check the console for logs."
      />
    )
  }
};

export const Step5_CustomizeFeatures: Story = {
  name: '5. Customize Features',
  args: {
    sections: basicSections,
    user: {
      id: 'user-1',
      name: 'Alex Rivera',
      handle: 'alexr',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    keyboardShortcuts: true,
    collapsible: true,
    children: (
      <ExampleContent 
        title="Step 5: Customize Features"
        description="Enable features like search, notifications, keyboard shortcuts, and more. Try pressing Cmd+K to open the search!"
      />
    )
  }
};

// ============================================================================
// COMPARISON EXAMPLES
// ============================================================================

export const AllVariantsComparison: Story = {
  name: 'All Variants Comparison',
  render: () => (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: 'var(--hive-text-primary)' }}>
        Navigation Variants Comparison
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--hive-text-primary)' }}>
            Sidebar Navigation
          </h2>
          <div className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
            Traditional left sidebar - perfect for desktop applications
          </div>
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--hive-border-primary)' }}>
            <div className="h-40 bg-gray-800 flex items-center justify-center">
              <span className="text-sm">Sidebar variant preview</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--hive-text-primary)' }}>
            Topbar Navigation
          </h2>
          <div className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
            Horizontal navigation bar - great for content-heavy apps
          </div>
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--hive-border-primary)' }}>
            <div className="h-40 bg-gray-800 flex items-center justify-center">
              <span className="text-sm">Topbar variant preview</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--hive-text-primary)' }}>
            Command Navigation
          </h2>
          <div className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
            Minimal UI with command palette - ideal for power users
          </div>
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--hive-border-primary)' }}>
            <div className="h-40 bg-gray-800 flex items-center justify-center">
              <span className="text-sm">Command variant preview</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--hive-text-primary)' }}>
            Minimal Navigation
          </h2>
          <div className="text-sm" style={{ color: 'var(--hive-text-secondary)' }}>
            Floating navigation - perfect for immersive experiences
          </div>
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--hive-border-primary)' }}>
            <div className="h-40 bg-gray-800 flex items-center justify-center">
              <span className="text-sm">Minimal variant preview</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const FullExampleApp: Story = {
  name: 'Complete Example App',
  args: {
    variant: 'sidebar',
    size: 'standard',
    sections: [
      {
        id: 'main',
        label: 'Main Navigation',
        items: [
          {
            id: 'feed',
            label: 'Feed',
            icon: Home,
            href: '/',
            isActive: true,
            description: 'Your personalized campus feed'
          },
          {
            id: 'spaces',
            label: 'Spaces',
            icon: Users,
            href: '/spaces',
            badge: { count: 5 },
            description: 'Campus communities and groups'
          },
          {
            id: 'build',
            label: 'Build',
            icon: Zap,
            href: '/build',
            description: 'Create tools with HiveLab'
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
            description: 'Your personal profile'
          },
          {
            id: 'settings',
            label: 'Settings',
            icon: Settings,
            href: '/settings',
            description: 'App preferences and settings'
          }
        ]
      }
    ],
    user: {
      id: 'user-1',
      name: 'Alex Rivera',
      handle: 'alexr',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      role: 'Student',
      status: 'online'
    },
    showSearch: true,
    showNotifications: true,
    showUserMenu: true,
    showBranding: true,
    collapsible: true,
    keyboardShortcuts: true,
    onNavigate: (item) => console.log('Navigating to:', item),
    children: (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--hive-text-primary)' }}>
            Complete Example App
          </h1>
          <p className="text-lg mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            This example shows all features enabled: search, notifications, user menu, keyboard shortcuts, and more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Active Spaces', value: '12', color: 'text-blue-400' },
            { title: 'Tools Built', value: '8', color: 'text-green-400' },
            { title: 'Events This Week', value: '5', color: 'text-yellow-400' }
          ].map((metric) => (
            <div 
              key={metric.title}
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <h3 className="font-semibold mb-2" style={{ color: 'var(--hive-text-secondary)' }}>
                {metric.title}
              </h3>
              <p className={`text-2xl font-bold ${metric.color}`}>
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 style={{ color: 'var(--hive-text-primary)' }}>Try These Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose">
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <h4 className="font-semibold mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                Keyboard Shortcuts
              </h4>
              <div className="space-y-1 text-sm">
                <div><kbd className="bg-gray-700 px-2 py-1 rounded">⌘K</kbd> Open search</div>
                <div><kbd className="bg-gray-700 px-2 py-1 rounded">⌘B</kbd> Toggle sidebar</div>
                <div><kbd className="bg-gray-700 px-2 py-1 rounded">ESC</kbd> Close overlays</div>
              </div>
            </div>
            
            <div 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)'
              }}
            >
              <h4 className="font-semibold mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                Interactive Elements
              </h4>
              <div className="space-y-1 text-sm">
                <div>• Click navigation items</div>
                <div>• Try the search bar</div>
                <div>• Check notifications</div>
                <div>• Collapse the sidebar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};