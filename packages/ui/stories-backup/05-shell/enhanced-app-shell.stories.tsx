import type { Meta, StoryObj } from '@storybook/react';
import { EnhancedAppShell } from '../../components/shell/enhanced-app-shell';
import { ShellProvider } from '../../components/shell/shell-provider';
import { NotificationProvider } from '../../components/shell/notification-service';

const meta: Meta<typeof EnhancedAppShell> = {
  title: '05-Shell/Enhanced App Shell',
  component: EnhancedAppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Enhanced HIVE application shell with the new adaptive navigation system that implements the complete HIVE Shell Application specification.

## Features

- **Adaptive Navigation**: Automatically switches between sidebar, top bar, and bottom tabs based on screen size and user preference
- **User Preferences**: Users can choose between Tab Bar, Sidebar, or Auto modes
- **Responsive Design**: Mobile-first approach with breakpoints at 768px, 1200px, and 1440px
- **Four-Pillar Navigation**: Profile, Feed, Spaces, and HiveLAB sections
- **Command Palette**: Quick navigation and search (⌘K)
- **Notification System**: Real-time notifications with badges
- **Settings Integration**: Navigation preferences accessible in settings

## Navigation Modes

- **Mobile (<768px)**: Bottom tabs (enforced)
- **Tablet (768-1199px)**: Collapsible drawer
- **Desktop (1200-1440px)**: User preference applied
- **Wide (>1440px)**: Sidebar recommended
        `
      }
    }
  },
  decorators: [
    (Story) => (
      <NotificationProvider>
        <ShellProvider>
          <Story />
        </ShellProvider>
      </NotificationProvider>
    )
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock user data
const mockUser = {
  id: '1',
  name: 'Jacob Smith',
  handle: 'jacob_smith',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
  builderStatus: 'active' as const,
  role: 'student' as const,
};

export const Default: Story = {
  args: {
    user: mockUser,
    children: (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary mb-2">
            Welcome to HIVE
          </h1>
          <p className="text-hive-text-secondary">
            This is the enhanced app shell with navigation, command palette (⌘K), and notifications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">Adaptive Navigation</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              Four-pillar navigation: Profile, Feed, Spaces, HiveLAB - adapts to screen size and preferences
            </p>
          </div>
          <div className="bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">User Preferences</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              Choose between Tab Bar, Sidebar, or Auto modes - settings persist across sessions
            </p>
          </div>
          <div className="bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">Command Palette</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              Press ⌘K to open the enhanced command palette for quick navigation
            </p>
          </div>
          <div className="bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">Mobile Optimized</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              Bottom tabs on mobile, drawer on tablet, flexible desktop layouts
            </p>
          </div>
          <div className="bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">Status Indicators</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              Notification badges, builder status, and activity indicators throughout navigation
            </p>
          </div>
          <div className="bg-[var(--hive-bg-secondary)] border border-[var(--hive-border-default)] rounded-xl p-6">
            <h3 className="font-semibold text-[var(--hive-text-primary)] mb-2">Keyboard Shortcuts</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              ⌘K (palette), ⌘B (toggle sidebar), ⌘⇧N (notifications), Esc (close)
            </p>
          </div>
        </div>
      </div>
    ),
  },
};

export const WithCollapsedSidebar: Story = {
  args: {
    user: mockUser,
    initialSidebarCollapsed: false,
    children: (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-hive-text-primary mb-4">
          Expanded Sidebar
        </h1>
        <p className="text-hive-text-secondary">
          The sidebar is expanded by default in this story to show the full navigation.
        </p>
      </div>
    ),
  },
};

export const WithoutUser: Story = {
  args: {
    user: null,
    children: (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-hive-text-primary mb-4">
          No User State
        </h1>
        <p className="text-hive-text-secondary">
          Shell behavior when no user is authenticated.
        </p>
      </div>
    ),
  },
};

export const DifferentUserRoles: Story = {
  args: {
    user: {
      ...mockUser,
      name: 'Dr. Sarah Wilson',
      handle: 'prof_wilson',
      role: 'faculty' as const,
      builderStatus: 'pending' as const,
    },
    children: (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-hive-text-primary mb-4">
          Faculty User
        </h1>
        <p className="text-hive-text-secondary">
          Shell with faculty user showing different role-based features.
        </p>
      </div>
    ),
  },
};