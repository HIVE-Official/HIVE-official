/**
 * HIVE Desktop Topbar - Storybook Stories
 * YC-Quality Documentation for Desktop Top Navigation
 * 
 * Complete documentation for the horizontal navigation bar with
 * integrated search, notifications, and user menu.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { DesktopTopbar } from './DesktopTopbar';
import { createNavigationItems } from '../core/data';
import { type NavigationUser } from '../core/types';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUser: NavigationUser = {
  id: 'user-123',
  name: 'Alex Thompson',
  handle: 'alexthompson',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  builderStatus: 'active',
  role: 'student',
  preferences: {
    layout: 'tabs',
    sidebarCollapsed: false,
    enableKeyboardShortcuts: true,
    enableAnimations: true,
    theme: 'system'
  }
};

const builderUser: NavigationUser = {
  ...mockUser,
  name: 'Sarah Chen',
  handle: 'sarahbuilds',
  builderStatus: 'active'
};

const facultyUser: NavigationUser = {
  ...mockUser,
  name: 'Dr. Michael Rodriguez',  
  handle: 'profrodriguez',
  role: 'faculty',
  builderStatus: 'none'
};

const createMockItems = (activeSection?: string) => {
  const items = createNavigationItems();
  return items.map(item => ({
    ...item,
    isActive: item.id === activeSection,
    badge: item.id === 'spaces' ? { type: 'notification' as const, count: 4 } : 
           item.id === 'feed' ? { type: 'status' as const, count: 18 } :
           item.id === 'hivelab' && activeSection !== 'hivelab' ? { type: 'feature' as const, label: 'BETA' } : undefined
  }))
};

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof DesktopTopbar> = {
  title: 'Navigation/DesktopTopbar',
  component: DesktopTopbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Desktop Topbar

Horizontal navigation bar optimized for wide desktop screens (≥ 1440px).

## Features

- **🎯 Horizontal Layout**: Optimized for wide screens and content consumption
- **🔍 Integrated Search**: Prominent search bar with ⌘+K shortcut
- **🔔 Notifications**: Bell icon with badge counts and dropdown
- **👤 User Menu**: Profile access with builder status indicator
- **🏷️ HIVE Branding**: Prominent logo and brand identity
- **✨ Smooth Animations**: Micro-interactions and hover states

## Design Philosophy

- **Content-First**: Maximizes vertical space for content
- **Professional**: Clean, minimal design for productivity
- **Search-Centric**: Prominent search for quick access
- **Brand Consistent**: Perfect HIVE visual identity integration

## Interactive Elements

- **Search Bar**: Click to open command palette (⌘+K)
- **Navigation Items**: Horizontal tabs with active indicators
- **Notifications**: Click to open notification center
- **User Menu**: Dropdown with profile options and sign out
- **Logo**: Interactive HIVE brand mark
        `
      }
    },
    viewport: {
      defaultViewport: 'desktop'
    }
  },
  argTypes: {
    items: {
      description: 'Navigation items array with active states and badges',
      control: { type: 'object' }
    },
    user: {
      description: 'Current user information',
      control: { type: 'object' }
    },
    onNavigate: {
      description: 'Callback when user clicks a navigation item',
      action: 'navigate'
    },
    onOpenCommandPalette: {
      description: 'Callback when user clicks search or presses ⌘+K',
      action: 'open-command-palette'
    },
    onOpenNotifications: {
      description: 'Callback when user clicks notification bell',
      action: 'open-notifications'
    },
    unreadNotificationCount: {
      description: 'Number of unread notifications',
      control: { type: 'number', min: 0, max: 99 }
    }
  }
};

export default meta;

type Story = StoryObj<typeof DesktopTopbar>;

// ============================================================================
// INTERACTIVE DEMO WRAPPER
// ============================================================================

const InteractiveTopbarDemo = ({ 
  items,
  user,
  unreadNotificationCount = 5,
  ...props 
}: any) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)'
    }}>
      <DesktopTopbar
        items={items}
        user={user}
        unreadNotificationCount={unreadNotificationCount}
        onNavigate={action('navigate')}
        onOpenCommandPalette={() => {
          setCommandPaletteOpen(true);
          action('open-command-palette')()
        }}
        onOpenNotifications={() => {
          setNotificationCenterOpen(true);
          action('open-notifications')()
        }}
        {...props}
      />
      
      {/* Main content area with top padding */}
      <div className="pt-16 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Desktop Topbar Demo</h1>
            <p className="text-[var(--hive-text-secondary)] text-lg">
              Experience the horizontal navigation optimized for wide desktop screens.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4">Current User</h2>
              <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {user.name}</div>
                <div><strong>Handle:</strong> @{user.handle}</div>
                <div><strong>Role:</strong> {user.role}</div>
                <div><strong>Builder:</strong> {user.builderStatus}</div>
              </div>
            </div>
            
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              <div className="space-y-2 text-sm">
                <div><strong>Unread:</strong> {unreadNotificationCount}</div>
                <div><strong>Display:</strong> {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}</div>
                <div><strong>Status:</strong> {unreadNotificationCount > 0 ? 'Active' : 'None'}</div>
              </div>
            </div>
            
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4">Shortcuts</h2>
              <div className="space-y-2 text-sm">
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">⌘ K</kbd> Command Palette</div>
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">Tab</kbd> Navigate Items</div>
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">Enter</kbd> Activate</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] mb-8">
            <h2 className="text-xl font-semibold mb-4">Interactive Features</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-[var(--hive-text-secondary)]">
              <li>• Click search bar to open command palette</li>
              <li>• Use ⌘+K keyboard shortcut for search</li>
              <li>• Click notification bell to open center</li>
              <li>• Try the user menu dropdown</li>
              <li>• Navigate between tabs and see indicators</li>
              <li>• Notice hover animations and feedback</li>
            </ul>
          </div>
          
          {/* Sample wide content */}
          <div className="grid lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div 
                key={i}
                className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]"
              >
                <h3 className="font-semibold mb-2">Content Section {i + 1}</h3>
                <p className="text-[var(--hive-text-secondary)] text-sm">
                  Wide layout optimized for desktop viewing. The top navigation maximizes 
                  vertical space while keeping all tools easily accessible.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mock Command Palette */}
      {commandPaletteOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div 
            className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Command Palette</h3>
            <div className="space-y-3">
              <input 
                type="text" 
                placeholder="Search spaces, people, tools..."
                className="w-full p-3 rounded-lg bg-[var(--hive-bg-tertiary)] border border-[var(--hive-border-subtle)] text-[var(--hive-text-primary)]"
                autoFocus
              />
              <p className="text-[var(--hive-text-secondary)] text-sm">
                Start typing to search across HIVE. Press Escape to close.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mock Notification Center */}
      {notificationCenterOpen && (
        <div 
          className="fixed top-16 right-4 w-80 bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] shadow-2xl z-50"
        >
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-3">
            {Array.from({ length: Math.min(unreadNotificationCount, 5) }, (_, i) => (
              <div key={i} className="p-3 bg-[var(--hive-bg-tertiary)] rounded-lg">
                <div className="font-medium text-sm">Sample Notification {i + 1}</div>
                <div className="text-xs text-[var(--hive-text-secondary)] mt-1">2 minutes ago</div>
              </div>
            ))}
            <button 
              className="w-full text-center text-sm text-[var(--hive-brand-secondary)] hover:underline mt-4"
              onClick={() => setNotificationCenterOpen(false)}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
      
      {/* Click outside overlay for notifications */}
      {notificationCenterOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setNotificationCenterOpen(false)}
        />
      )}
    </div>
  )
};

// ============================================================================
// STORIES
// ============================================================================

export const Default: Story = {
  args: {
    items: createMockItems('feed'),
    user: mockUser,
    unreadNotificationCount: 5
  },
  render: (args) => <InteractiveTopbarDemo {...args} />
};

export const ProfileActive: Story = {
  args: {
    items: createMockItems('profile'),
    user: mockUser,
    unreadNotificationCount: 0
  },
  render: (args) => <InteractiveTopbarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Profile section active with clean notification state.'
      }
    }
  }
};

export const WithBadges: Story = {
  args: {
    items: createMockItems('spaces'),
    user: mockUser,
    unreadNotificationCount: 12
  },
  render: (args) => <InteractiveTopbarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Topbar showing navigation badges and notification count.'
      }
    }
  }
};

export const BuilderUser: Story = {
  args: {
    items: createMockItems('hivelab'),
    user: builderUser,
    unreadNotificationCount: 3
  },
  render: (args) => <InteractiveTopbarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Active builder user with special builder status indicator in topbar.'
      }
    }
  }
};

export const FacultyUser: Story = {
  args: {
    items: createMockItems('spaces'),
    user: facultyUser,
    unreadNotificationCount: 25
  },
  render: (args) => <InteractiveTopbarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Faculty user with enhanced privileges and higher notification volume.'
      }
    }
  }
};

export const HighNotifications: Story = {
  args: {
    items: createMockItems('feed'),
    user: mockUser,
    unreadNotificationCount: 150
  },
  render: (args) => <InteractiveTopbarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'High notification count showing "99+" badge behavior.'
      }
    }
  }
};

export const CleanState: Story = {
  args: {
    items: createMockItems('profile').map(item => ({
      ...item,
      badge: undefined
    })}),
    user: mockUser,
    unreadNotificationCount: 0
  },
  render: (args) => <InteractiveTopbarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Clean topbar state without badges or notifications.'
      }
    }
  }
};

// ============================================================================
// SEARCH FOCUSED STORY
// ============================================================================

export const SearchFocused: Story = {
  args: {
    items: createMockItems('feed'),
    user: mockUser,
    unreadNotificationCount: 2
  },
  render: (args) => (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)'
    }}>
      <DesktopTopbar
        {...args}
        onNavigate={action('navigate')}
        onOpenCommandPalette={action('open-command-palette')}
        onOpenNotifications={action('open-notifications')}
      />
      
      <div className="pt-16 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Search-Centric Design</h1>
          <p className="text-[var(--hive-text-secondary)] mb-6">
            The search bar is prominently placed for quick access to HIVE's universal search.
          </p>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
            <h2 className="text-lg font-semibold mb-4">Search Features</h2>
            <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
              <li>• <strong>Universal Search:</strong> Find spaces, people, tools, and content</li>
              <li>• <strong>Keyboard Shortcut:</strong> ⌘+K from anywhere</li>
              <li>• <strong>Visual Prominence:</strong> Central position in navigation</li>
              <li>• <strong>Placeholder Text:</strong> Clear indication of search scope</li>
              <li>• <strong>Command Keys:</strong> Visual keyboard shortcut indicators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the search-centric design philosophy of the desktop topbar.'
      }
    }
  }
};