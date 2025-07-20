import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { 
  AppShell,
  EnhancedAppShell,
  NavigationHeader,
  NavigationSidebar,
  BreadcrumbNavigation,
  CommandPalette,
  NotificationCenter,
  UserMenu,
  PageContainer,
  ShellProvider 
} from '../../components';
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
    <div className="h-screen bg-[#0A0A0B]">
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
            <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Basic App Shell</h1>
            <p className="text-[#C1C1C4]">
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
    <div className="h-screen bg-[#0A0A0B]">
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
            <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Enhanced App Shell</h1>
            <p className="text-[#C1C1C4] mb-6">
              Enhanced shell with command palette, breadcrumbs, and advanced features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <h3 className="text-[#E5E5E7] font-semibold mb-2">Feature 1</h3>
                <p className="text-[#C1C1C4] text-sm">Enhanced shell features and functionality</p>
              </div>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <h3 className="text-[#E5E5E7] font-semibold mb-2">Feature 2</h3>
                <p className="text-[#C1C1C4] text-sm">Advanced navigation and user experience</p>
              </div>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <h3 className="text-[#E5E5E7] font-semibold mb-2">Feature 3</h3>
                <p className="text-[#C1C1C4] text-sm">Seamless integration and performance</p>
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
      <div className="bg-[#0A0A0B] min-h-screen">
        <div className="border-b border-[#2A2A2D]">
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
          <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Navigation Header</h1>
          <p className="text-[#C1C1C4]">
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
    <div className="bg-[#0A0A0B] min-h-screen flex">
      <div className="w-64 border-r border-[#2A2A2D]">
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
        <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Navigation Sidebar</h1>
        <p className="text-[#C1C1C4]">
          HIVE navigation sidebar with collapsible menu items and active states.
        </p>
      </div>
    </div>
  ),
};

// Collapsed Sidebar
export const CollapsedSidebar: Story = {
  render: () => (
    <div className="bg-[#0A0A0B] min-h-screen flex">
      <div className="w-16 border-r border-[#2A2A2D]">
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
        <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Collapsed Sidebar</h1>
        <p className="text-[#C1C1C4]">
          HIVE navigation sidebar in collapsed state with icon-only display.
        </p>
      </div>
    </div>
  ),
};

// Breadcrumb Navigation
export const BreadcrumbComponent: Story = {
  render: () => (
    <div className="bg-[#0A0A0B] min-h-screen">
      <div className="border-b border-[#2A2A2D] p-4">
        <BreadcrumbNavigation items={mockBreadcrumbs} />
      </div>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Breadcrumb Navigation</h1>
        <p className="text-[#C1C1C4] mb-8">
          HIVE breadcrumb navigation for hierarchical navigation and context.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Simple Breadcrumbs</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
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
            <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">With Icons</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
              <BreadcrumbNavigation items={mockBreadcrumbs} />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Long Path</h3>
            <div className="bg-[#111113] p-4 rounded-lg border border-[#2A2A2D]">
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
    <div className="bg-[#0A0A0B] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Command Palette</h1>
      <p className="text-[#C1C1C4] mb-8">
        HIVE command palette for quick navigation and actions. Press Cmd+K to open.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Demo (Always Open)</h3>
          <div className="max-w-lg">
            <CommandPalette 
              isOpen={true}
              onClose={() => console.log('Close command palette')}
            />
          </div>
        </div>
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Features</h3>
          <ul className="text-[#C1C1C4] space-y-2">
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
    <div className="bg-[#0A0A0B] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Notification Center</h1>
      <p className="text-[#C1C1C4] mb-8">
        HIVE notification center for alerts, updates, and user messages.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Notification Panel</h3>
          <div className="max-w-sm">
            <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
              <h3 className="text-[#E5E5E7] font-semibold mb-4">Notification Center</h3>
              <p className="text-[#C1C1C4] text-sm">Notifications would appear here in the actual implementation.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">Notification Types</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#3B82F6] rounded-full"></div>
              <span className="text-[#C1C1C4]">Info - General updates and information</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#10B981] rounded-full"></div>
              <span className="text-[#C1C1C4]">Success - Achievements and completions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#F59E0B] rounded-full"></div>
              <span className="text-[#C1C1C4]">Warning - Important notices</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
              <span className="text-[#C1C1C4]">Error - Issues requiring attention</span>
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
    <div className="bg-[#0A0A0B] min-h-screen p-8">
      <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">User Menu</h1>
      <p className="text-[#C1C1C4] mb-8">
        HIVE user menu with profile, settings, and account management.
      </p>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">User Menu (Open)</h3>
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
        
        <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
          <h3 className="text-lg font-medium text-[#E5E5E7] mb-3">User Info Display</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
              <span className="text-[#0A0A0B] font-semibold">JS</span>
            </div>
            <div>
              <div className="text-[#E5E5E7] font-medium">{mockUser.name}</div>
              <div className="text-[#9B9B9F] text-sm">{mockUser.email}</div>
              <div className="text-[#FFD700] text-xs">{mockUser.role}</div>
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
    <div className="bg-[#0A0A0B] min-h-screen">
      <PageContainer>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-[#E5E5E7] mb-4">Page Container</h1>
          <p className="text-[#C1C1C4] mb-8">
            HIVE page container provides consistent layout and spacing for content.
          </p>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-4">Standard Layout</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                  <h3 className="text-[#E5E5E7] font-semibold mb-2">Card 1</h3>
                  <p className="text-[#C1C1C4] text-sm">Content within page container</p>
                </div>
                <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                  <h3 className="text-[#E5E5E7] font-semibold mb-2">Card 2</h3>
                  <p className="text-[#C1C1C4] text-sm">Consistent spacing and layout</p>
                </div>
                <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                  <h3 className="text-[#E5E5E7] font-semibold mb-2">Card 3</h3>
                  <p className="text-[#C1C1C4] text-sm">Professional presentation</p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-[#E5E5E7] mb-4">Features</h2>
              <div className="bg-[#111113] p-6 rounded-lg border border-[#2A2A2D]">
                <ul className="text-[#C1C1C4] space-y-2">
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