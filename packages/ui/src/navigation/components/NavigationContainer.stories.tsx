/**
 * HIVE Navigation Container - Storybook Stories
 * YC-Quality Documentation with Interactive Examples
 * 
 * Complete documentation for the main navigation orchestrator
 * with examples for all responsive modes and states.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NavigationContainer } from './NavigationContainer';
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
    layout: 'auto',
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

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof NavigationContainer> = {
  title: 'Navigation/NavigationContainer',
  component: NavigationContainer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Navigation Container

The master navigation orchestrator that provides adaptive navigation across all device sizes and user preferences.

## Features

- **🎯 Responsive Design**: Automatically adapts to screen size
- **👤 User Preferences**: Respects individual layout preferences  
- **🎨 Brand Consistent**: Perfect HIVE design system integration
- **⚡ Performance Optimized**: Memoized calculations and smooth animations
- **♿ Accessible**: Full keyboard navigation and screen reader support
- **🔧 Developer Friendly**: Complete TypeScript support

## Navigation Modes

1. **Mobile Tabs** (< 768px): Bottom tab navigation
2. **Tablet Drawer** (768-1199px): Slide-out drawer
3. **Desktop Sidebar** (1200-1439px): Collapsible sidebar
4. **Desktop Tabs** (≥ 1440px): Top navigation bar

## User Types

- **Student**: Standard navigation access
- **Faculty**: Enhanced tools and administration
- **Builder**: Special builder status indicators
        `
      }
    }
  },
  argTypes: {
    user: {
      description: 'User information for navigation personalization',
      control: { type: 'object' }
    },
    onOpenCommandPalette: {
      description: 'Callback when command palette should open (⌘+K)',
      action: 'command-palette-opened'
    },
    onOpenNotifications: {
      description: 'Callback when notification center should open',
      action: 'notifications-opened'
    },
    unreadNotificationCount: {
      description: 'Number of unread notifications to display',
      control: { type: 'number', min: 0, max: 99 }
    }
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--hive-background-primary)',
        color: 'var(--hive-text-primary)'
      }}>
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof NavigationContainer>;

// ============================================================================
// INTERACTIVE WRAPPER
// ============================================================================

const InteractiveNavigationDemo = ({ user, ...props }: any) => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);

  return (
    <>
      <NavigationContainer
        user={user}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenNotifications={() => setNotificationCenterOpen(true)}
        {...props}
      >
        <div className="p-8 space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-[var(--hive-text-primary)]">
              HIVE Navigation Demo
            </h1>
            <p className="text-[var(--hive-text-secondary)] text-lg">
              Experience adaptive navigation across all device sizes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4 text-[var(--hive-text-primary)]">
                Current User
              </h2>
              <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {user.name}</div>
                <div><strong>Handle:</strong> @{user.handle}</div>
                <div><strong>Role:</strong> {user.role}</div>
                <div><strong>Builder Status:</strong> {user.builderStatus}</div>
              </div>
            </div>

            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4 text-[var(--hive-text-primary)]">
                Keyboard Shortcuts
              </h2>
              <div className="space-y-2 text-sm">
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">⌘ K</kbd> Command Palette</div>
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">⌘ B</kbd> Toggle Sidebar</div>
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">Esc</kbd> Close Overlays</div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
            <h2 className="text-xl font-semibold mb-4 text-[var(--hive-text-primary)]">
              Responsive Behavior
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-[var(--hive-bg-tertiary)] rounded-lg">
                <div className="font-medium">Mobile</div>
                <div className="text-[var(--hive-text-secondary)]">&lt; 768px</div>
                <div className="text-xs mt-1">Bottom Tabs</div>
              </div>
              <div className="text-center p-3 bg-[var(--hive-bg-tertiary)] rounded-lg">
                <div className="font-medium">Tablet</div>
                <div className="text-[var(--hive-text-secondary)]">768-1199px</div>
                <div className="text-xs mt-1">Drawer</div>
              </div>
              <div className="text-center p-3 bg-[var(--hive-bg-tertiary)] rounded-lg">
                <div className="font-medium">Desktop</div>
                <div className="text-[var(--hive-text-secondary)]">1200-1439px</div>
                <div className="text-xs mt-1">Sidebar</div>
              </div>
              <div className="text-center p-3 bg-[var(--hive-bg-tertiary)] rounded-lg">
                <div className="font-medium">Wide</div>
                <div className="text-[var(--hive-text-secondary)]">≥ 1440px</div>
                <div className="text-xs mt-1">Top Bar</div>
              </div>
            </div>
          </div>

          <div className="text-center text-[var(--hive-text-tertiary)] text-sm">
            Resize your browser window to see the navigation adapt in real-time
          </div>
        </div>
      </NavigationContainer>

      {/* Mock Command Palette */}
      {commandPaletteOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <div 
            className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Command Palette</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              This would open the HIVE command palette. Press Escape or click outside to close.
            </p>
          </div>
        </div>
      )}

      {/* Mock Notification Center */}
      {notificationCenterOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end pt-16 pr-4"
          onClick={() => setNotificationCenterOpen(false)}
        >
          <div 
            className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <p className="text-[var(--hive-text-secondary)] text-sm">
              This would show the notification center. Press Escape or click outside to close.
            </p>
          </div>
        </div>
      )}
    </>
  )
};

// ============================================================================
// STORIES
// ============================================================================

export const Default: Story = {
  args: {
    user: mockUser,
    unreadNotificationCount: 3
  },
  render: (args) => <InteractiveNavigationDemo {...args} />
};

export const StudentUser: Story = {
  args: {
    user: mockUser,
    unreadNotificationCount: 0
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Standard student user with basic navigation access. Shows the default navigation items:
- Profile (campus command center)
- Feed (activity updates)  
- Spaces (communities)
- HiveLAB (tool building)
        `
      }
    }
  }
};

export const BuilderUser: Story = {
  args: {
    user: builderUser,
    unreadNotificationCount: 5
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Active builder user showing special builder status indicators and enhanced tool access.
        `
      }
    }
  }
};

export const FacultyUser: Story = {
  args: {
    user: facultyUser,
    unreadNotificationCount: 12
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Faculty user with enhanced administrative access and different navigation priorities.
        `
      }
    }
  }
};

export const HighNotificationCount: Story = {
  args: {
    user: mockUser,
    unreadNotificationCount: 99
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Shows navigation behavior with high notification counts (99+ displays as "99+").
        `
      }
    }
  }
};

export const NoNotifications: Story = {
  args: {
    user: mockUser,
    unreadNotificationCount: 0
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Clean navigation state with no notification badges.
        `
      }
    }
  }
};

// ============================================================================
// RESPONSIVE PREVIEW STORIES
// ============================================================================

export const MobilePreview: Story = {
  args: {
    user: mockUser,
    unreadNotificationCount: 3
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: `
Mobile navigation with bottom tabs. Optimized for thumb navigation with 44px+ touch targets.
        `
      }
    }
  }
};

export const TabletPreview: Story = {
  args: {
    user: mockUser,
    unreadNotificationCount: 3
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    },
    docs: {
      description: {
        story: `
Tablet navigation with slide-out drawer. Features swipe gestures and touch-optimized interface.
        `
      }
    }
  }
};

export const DesktopPreview: Story = {
  args: {
    user: mockUser,
    unreadNotificationCount: 3
  },
  render: (args) => <InteractiveNavigationDemo {...args} />,
  parameters: {
    viewport: {
      defaultViewport: 'desktop'
    },
    docs: {
      description: {
        story: `
Desktop navigation with collapsible sidebar. Includes keyboard shortcuts and power user features.
        `
      }
    }
  }
};