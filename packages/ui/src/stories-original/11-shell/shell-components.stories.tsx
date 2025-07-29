import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// Use specific imports to avoid conflicts
import { 
  AppShell,
  EnhancedAppShell,
  NavigationHeader,
  NavigationSidebar,
  BreadcrumbNavigation,
  CommandPalette,
  NotificationCenter,
  UserMenu,
  ShellProvider 
} from '../../components/shell';
import { PageContainer } from '../../atomic/atoms/container';
import { Bell, Search, Settings, User, Home, Folder } from 'lucide-react';

const meta: Meta = {
  title: '11-Shell/Application Shell',
  parameters: {
    docs: {
      description: {
        component: 'HIVE Application Shell components for layout, navigation, and user interaction',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock data for stories
const mockUser = {
  name: 'Jacob Smith',
  email: 'jacob@hive.com',
  avatar: '/placeholder-avatar.jpg',
  role: 'Founder'
};

const mockNotifications = [
  { id: '1', title: 'New space created', message: 'Development team space is ready', time: '2m ago', unread: true },
  { id: '2', title: 'Tool published', message: 'Your design tool is now live', time: '1h ago', unread: true },
  { id: '3', title: 'Member joined', message: 'Sarah joined your space', time: '3h ago', unread: false },
];

const mockBreadcrumbs = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Spaces', href: '/spaces', icon: Folder },
  { label: 'Design Team', href: '/spaces/design' },
  { label: 'Tools', href: '/spaces/design/tools' },
];

// Basic App Shell
export const BasicAppShell: Story = {
  render: () => (
    <div className="h-screen bg-obsidian">
      <ShellProvider>
        <AppShell
          user={{
            id: '1',
            name: mockUser.name,
            handle: 'jacob_smith',
            avatar: mockUser.avatar,
            builderStatus: 'active'
          }}
          currentSection="spaces"
          layoutType="dashboard"
        >
          <div className="p-8">
            <h1 className="text-4xl font-bold text-platinum mb-4">Basic App Shell</h1>
            <p className="text-silver">
              This is the basic HIVE application shell with header, sidebar, and main content area.
            </p>
          </div>
        </AppShell>
      </ShellProvider>
    </div>
  ),
};

// Enhanced App Shell
export const EnhancedShell: Story = {
  render: () => (
    <div className="h-screen bg-obsidian">
      <ShellProvider>
        <EnhancedAppShell 
          user={{
            id: '1',
            name: mockUser.name,
            handle: 'jacob_smith',
            avatar: mockUser.avatar,
            builderStatus: 'active'
          }}
          notifications={mockNotifications}
          breadcrumbs={mockBreadcrumbs}
          searchEnabled
          commandPaletteEnabled
        >
          <div className="p-8">
            <h1 className="text-4xl font-bold text-platinum mb-4">Enhanced App Shell</h1>
            <p className="text-silver mb-6">
              Enhanced shell with command palette, breadcrumbs, and advanced features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-charcoal p-6 rounded-lg border border-steel">
                <h3 className="text-platinum font-semibold mb-2">Feature 1</h3>
                <p className="text-silver text-sm">Enhanced shell features and functionality</p>
              </div>
              <div className="bg-charcoal p-6 rounded-lg border border-steel">
                <h3 className="text-platinum font-semibold mb-2">Feature 2</h3>
                <p className="text-silver text-sm">Advanced navigation and user experience</p>
              </div>
              <div className="bg-charcoal p-6 rounded-lg border border-steel">
                <h3 className="text-platinum font-semibold mb-2">Feature 3</h3>
                <p className="text-silver text-sm">Seamless integration and performance</p>
              </div>
            </div>
          </div>
        </EnhancedAppShell>
      </ShellProvider>
    </div>
  ),
};

// Navigation Header
export const HeaderComponent: Story = {
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

    return (
      <div className="bg-obsidian min-h-screen">
        <div className="border-b border-steel">
          <NavigationHeader 
            user={{
              id: '1',
              name: mockUser.name,
              handle: 'jacob_smith',
              avatar: mockUser.avatar,
              builderStatus: 'active'
            }}
            currentSection="spaces"
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            sidebarCollapsed={sidebarCollapsed}
            showGlobalSearch={true}
            showNotifications={true}
            showBuilderAccess={true}
            onOpenNotifications={() => console.log('Open notifications')}
            onOpenCommandPalette={() => console.log('Open command palette')}
            unreadNotificationCount={3}
            height="standard"
          />
        </div>
        <div className="p-8 mt-16">
          <h1 className="text-4xl font-bold text-platinum mb-4">Navigation Header</h1>
          <p className="text-silver">
            HIVE navigation header with logo, search, notifications, and user menu.
          </p>
        </div>
      </div>
    );
  },
};

// Navigation Sidebar
export const SidebarComponent: Story = {
  render: () => (
    <div className="bg-obsidian min-h-screen flex">
      <div className="w-64 border-r border-steel">
        <NavigationSidebar 
          collapsed={false}
          user={{
            id: '1',
            name: mockUser.name,
            handle: 'jacob_smith',
            avatar: mockUser.avatar,
            builderStatus: 'active'
          }}
          currentSection="spaces"
        />
      </div>
      <div className="flex-1 p-8 mt-16">
        <h1 className="text-4xl font-bold text-platinum mb-4">Navigation Sidebar</h1>
        <p className="text-silver">
          HIVE navigation sidebar with collapsible menu items and active states.
        </p>
      </div>
    </div>
  ),
};

// Collapsed Sidebar
export const CollapsedSidebar: Story = {
  render: () => (
    <div className="bg-obsidian min-h-screen flex">
      <div className="w-16 border-r border-steel">
        <NavigationSidebar 
          collapsed={true}
          user={{
            id: '1',
            name: mockUser.name,
            handle: 'jacob_smith',
            avatar: mockUser.avatar,
            builderStatus: 'active'
          }}
          currentSection="spaces"
        />
      </div>
      <div className="flex-1 p-8 mt-16">
        <h1 className="text-4xl font-bold text-platinum mb-4">Collapsed Sidebar</h1>
        <p className="text-silver">
          HIVE navigation sidebar in collapsed state with icon-only display.
        </p>
      </div>
    </div>
  ),
};

// Breadcrumb Navigation
export const BreadcrumbComponent: Story = {
  render: () => (
    <div className="bg-obsidian min-h-screen">
      <div className="border-b border-steel p-4">
        <BreadcrumbNavigation items={mockBreadcrumbs} />
      </div>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-platinum mb-4">Breadcrumb Navigation</h1>
        <p className="text-silver mb-8">
          HIVE breadcrumb navigation for hierarchical navigation and context.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-platinum mb-3">Simple Breadcrumbs</h3>
            <div className="bg-charcoal p-4 rounded-lg border border-steel">
              <BreadcrumbNavigation 
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Spaces', href: '/spaces' },
                  { label: 'Current Page' },
                ]}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-platinum mb-3">With Icons</h3>
            <div className="bg-charcoal p-4 rounded-lg border border-steel">
              <BreadcrumbNavigation items={mockBreadcrumbs} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-platinum mb-3">Long Path</h3>
            <div className="bg-charcoal p-4 rounded-lg border border-steel">
              <BreadcrumbNavigation 
                items={[
                  { label: 'Home', href: '/' },
                  { label: 'Organization', href: '/org' },
                  { label: 'Team', href: '/org/team' },
                  { label: 'Projects', href: '/org/team/projects' },
                  { label: 'Design System', href: '/org/team/projects/design' },
                  { label: 'Components', href: '/org/team/projects/design/components' },
                  { label: 'Button Component' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Command Palette
export const CommandPaletteComponent: Story = {
  render: () => (
    <div className="bg-obsidian min-h-screen p-8">
      <h1 className="text-4xl font-bold text-platinum mb-4">Command Palette</h1>
      <p className="text-silver mb-8">
        HIVE command palette for quick navigation and actions. Press Cmd+K to open.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-platinum mb-3">Demo (Always Open)</h3>
          <div className="max-w-lg">
            <CommandPalette 
              isOpen={true}
              onClose={() => console.log('Close command palette')}
            />
          </div>
        </div>
        
        <div className="bg-charcoal p-6 rounded-lg border border-steel">
          <h3 className="text-lg font-medium text-platinum mb-3">Features</h3>
          <ul className="text-silver space-y-2">
            <li>• Fuzzy search for commands and navigation</li>
            <li>• Keyboard shortcuts (Cmd+K to open)</li>
            <li>• Categorized commands with icons</li>
            <li>• Recent actions and suggestions</li>
            <li>• Dark luxury theme with glass morphism</li>
          </ul>
        </div>
      </div>
    </div>
  ),
};

// Notification Center
export const NotificationComponent: Story = {
  render: () => (
    <div className="bg-obsidian min-h-screen p-8">
      <h1 className="text-4xl font-bold text-platinum mb-4">Notification Center</h1>
      <p className="text-silver mb-8">
        HIVE notification center for alerts, updates, and user messages.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-platinum mb-3">Notification Panel</h3>
          <div className="max-w-sm">
            <div className="bg-charcoal p-6 rounded-lg border border-steel">
              <h3 className="text-platinum font-semibold mb-4">Notification Center</h3>
              <p className="text-silver text-sm">Notifications would appear here in the actual implementation.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-charcoal p-6 rounded-lg border border-steel">
          <h3 className="text-lg font-medium text-platinum mb-3">Notification Types</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[var(--hive-status-info)] rounded-full"></div>
              <span className="text-silver">Info - General updates and information</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[var(--hive-status-success)] rounded-full"></div>
              <span className="text-silver">Success - Achievements and completions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[var(--hive-status-warning)] rounded-full"></div>
              <span className="text-silver">Warning - Important notices</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[var(--hive-status-error)] rounded-full"></div>
              <span className="text-silver">Error - Issues requiring attention</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// User Menu
export const UserMenuComponent: Story = {
  render: () => (
    <div className="bg-obsidian min-h-screen p-8">
      <h1 className="text-4xl font-bold text-platinum mb-4">User Menu</h1>
      <p className="text-silver mb-8">
        HIVE user menu with profile, settings, and account management.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-platinum mb-3">User Menu (Open)</h3>
          <div className="max-w-xs">
            <UserMenu 
              user={{
                id: '1',
                name: mockUser.name,
                handle: 'jacob_smith',
                avatar: mockUser.avatar
              }}
            />
          </div>
        </div>
        
        <div className="bg-charcoal p-6 rounded-lg border border-steel">
          <h3 className="text-lg font-medium text-platinum mb-3">User Info Display</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
              <span className="text-[var(--hive-background-primary)] font-semibold">JS</span>
            </div>
            <div>
              <div className="text-platinum font-medium">{mockUser.name}</div>
              <div className="text-mercury text-sm">{mockUser.email}</div>
              <div className="text-[var(--hive-brand-secondary)] text-xs">{mockUser.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Page Container
export const PageContainerComponent: Story = {
  render: () => (
    <div className="bg-obsidian min-h-screen">
      <PageContainer>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-platinum mb-4">Page Container</h1>
          <p className="text-silver mb-8">
            HIVE page container provides consistent layout and spacing for content.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-platinum mb-4">Standard Layout</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-charcoal p-6 rounded-lg border border-steel">
                  <h3 className="text-platinum font-semibold mb-2">Card 1</h3>
                  <p className="text-silver text-sm">Content within page container</p>
                </div>
                <div className="bg-charcoal p-6 rounded-lg border border-steel">
                  <h3 className="text-platinum font-semibold mb-2">Card 2</h3>
                  <p className="text-silver text-sm">Consistent spacing and layout</p>
                </div>
                <div className="bg-charcoal p-6 rounded-lg border border-steel">
                  <h3 className="text-platinum font-semibold mb-2">Card 3</h3>
                  <p className="text-silver text-sm">Professional presentation</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-platinum mb-4">Features</h2>
              <div className="bg-charcoal p-6 rounded-lg border border-steel">
                <ul className="text-silver space-y-2">
                  <li>• Responsive layout with max-width constraints</li>
                  <li>• Consistent padding and margins</li>
                  <li>• Mobile-first responsive design</li>
                  <li>• Integration with HIVE shell components</li>
                  <li>• Accessibility-focused structure</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </PageContainer>
    </div>
  ),
};