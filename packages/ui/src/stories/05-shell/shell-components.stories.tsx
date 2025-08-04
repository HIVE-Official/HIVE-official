import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { 
  NavigationHeader,
  NavigationSidebar,
  UserMenu,
  CommandPalette,
  NotificationCenter,
  BreadcrumbNavigation,
  ShellProvider,
  ShellPageContainer as PageContainer
} from '../../components/shell';
import { Button } from '../../atomic/atoms/button-enhanced';

const meta: Meta = {
  title: '05-Shell/Shell Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Individual HIVE shell components for navigation, user interaction, and layout structure.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Mock data
const mockUser = {
  id: '1',
  name: 'Jacob Smith',
  handle: 'jacob_smith',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  builderStatus: 'active' as const,
  role: 'student' as const,
};

const mockNotifications = [
  { 
    id: '1', 
    title: 'New space created', 
    message: 'Development team space is ready', 
    timestamp: new Date(Date.now() - 2 * 60 * 1000), 
    type: 'info' as const,
    read: false 
  },
  { 
    id: '2', 
    title: 'Tool published', 
    message: 'Your design tool is now live', 
    timestamp: new Date(Date.now() - 60 * 60 * 1000), 
    type: 'success' as const,
    read: false 
  },
  { 
    id: '3', 
    title: 'Member joined', 
    message: 'Sarah joined your space', 
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), 
    type: 'info' as const,
    read: true 
  },
];

const mockBreadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'Spaces', href: '/spaces' },
  { label: 'Design Team', href: '/spaces/design' },
  { label: 'Tools' },
];

export const NavigationHeaderDemo: Story = {
  render: () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    
    return (
      <div className="bg-hive-background-primary min-h-screen">
        <NavigationHeader
          user={mockUser}
          currentSection="spaces"
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
          unreadNotificationCount={2}
          onOpenNotifications={() => {}}
          onOpenCommandPalette={() => {}}
        />
        <div className="p-6">
          <p className="text-hive-text-secondary">
            Navigation header with user menu, notifications, and sidebar toggle.
          </p>
        </div>
      </div>
    );
  },
};

export const NavigationSidebarDemo: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    
    return (
      <div className="bg-hive-background-primary min-h-screen flex">
        <NavigationSidebar
          collapsed={collapsed}
          user={mockUser}
          currentPath="/spaces"
          onToggle={() => setCollapsed(!collapsed)}
        />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-bold text-hive-text-primary mb-4">
            Navigation Sidebar
          </h2>
          <p className="text-hive-text-secondary mb-4">
            Responsive sidebar with platform navigation and user context.
          </p>
          <Button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? 'Expand' : 'Collapse'} Sidebar
          </Button>
        </div>
      </div>
    );
  },
};

export const UserMenuDemo: Story = {
  render: () => (
    <div className="bg-hive-background-primary min-h-screen p-6">
      <div className="max-w-md">
        <h2 className="text-xl font-bold text-hive-text-primary mb-4">User Menu</h2>
        <p className="text-hive-text-secondary mb-6">
          Click the user avatar to see the dropdown menu.
        </p>
        <UserMenu user={mockUser} />
      </div>
    </div>
  ),
};

export const CommandPaletteDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="bg-hive-background-primary min-h-screen p-6">
        <h2 className="text-xl font-bold text-hive-text-primary mb-4">
          Command Palette
        </h2>
        <p className="text-hive-text-secondary mb-6">
          Press ⌘K or click the button to open the command palette.
        </p>
        <Button onClick={() => setIsOpen(true)}>
          Open Command Palette
        </Button>
        <CommandPalette
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

export const NotificationCenterDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="bg-hive-background-primary min-h-screen p-6">
        <h2 className="text-xl font-bold text-hive-text-primary mb-4">
          Notification Center
        </h2>
        <p className="text-hive-text-secondary mb-6">
          Click to open the notification center with recent activity.
        </p>
        <Button onClick={() => setIsOpen(true)}>
          Open Notifications
        </Button>
        <NotificationCenter
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          notifications={mockNotifications}
        />
      </div>
    );
  },
};

export const BreadcrumbNavigationDemo: Story = {
  render: () => (
    <div className="bg-hive-background-primary min-h-screen p-6">
      <h2 className="text-xl font-bold text-hive-text-primary mb-4">
        Breadcrumb Navigation
      </h2>
      <p className="text-hive-text-secondary mb-6">
        Context-aware breadcrumb navigation showing current page hierarchy.
      </p>
      <BreadcrumbNavigation items={mockBreadcrumbs} />
    </div>
  ),
};

export const PageContainerDemo: Story = {
  render: () => (
    <div className="bg-hive-background-primary min-h-screen">
      <PageContainer
        title="Page Title"
        subtitle="This is a subtitle describing the page content"
        breadcrumbs={mockBreadcrumbs}
        actions={
          <div className="flex gap-2">
            <Button variant="outline">Secondary</Button>
            <Button>Primary Action</Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="bg-hive-background-secondary border border-hive-border-primary rounded-xl p-6">
            <h3 className="font-semibold text-hive-text-primary mb-2">
              Page Content
            </h3>
            <p className="text-hive-text-secondary">
              This is the main content area within the page container.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  ),
};