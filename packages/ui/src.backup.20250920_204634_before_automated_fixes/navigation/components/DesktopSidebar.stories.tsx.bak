/**
 * HIVE Desktop Sidebar - Storybook Stories
 * YC-Quality Documentation for Desktop Power User Navigation
 * 
 * Complete documentation for the collapsible sidebar with tooltips,
 * keyboard shortcuts, and power user features.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { DesktopSidebar } from './DesktopSidebar';
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
    layout: 'sidebar',
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

const createMockItems = (activeSection?: string) => {
  const items = createNavigationItems();
  return items.map(item => ({
    ...item,
    isActive: item.id === activeSection,
    badge: item.id === 'spaces' ? { type: 'notification' as const, count: 7 } : 
           item.id === 'feed' ? { type: 'status' as const, count: 23 } :
           item.id === 'hivelab' && activeSection !== 'hivelab' ? { type: 'feature' as const, label: 'NEW' } : undefined
  }));
};

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof DesktopSidebar> = {
  title: 'Navigation/DesktopSidebar',
  component: DesktopSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Desktop Sidebar

Professional sidebar navigation optimized for desktop power users (1200px+).

## Features

- **🔄 Collapsible**: Toggle between expanded (256px) and collapsed (64px) states
- **💡 Smart Tooltips**: Show item details when collapsed
- **⌨️ Keyboard Shortcuts**: Full keyboard navigation support (⌘+B to toggle)
- **🎯 Active Indicators**: Clear visual feedback with animated indicators
- **👤 User Profile**: Integrated user info with builder status
- **🔔 Badge System**: Notification, status, and feature badges
- **✨ Smooth Animations**: Framer Motion powered transitions

## Power User Features

- **Hover States**: Subtle animations and feedback
- **Keyboard Navigation**: Tab through items, Enter/Space to activate
- **Contextual Tooltips**: Rich information on hover when collapsed
- **Builder Integration**: Special indicators for active builders
- **Persistent State**: Remembers collapsed preference

## Layout Integration

The sidebar automatically adjusts page content margin to prevent overlap.
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
    collapsed: {
      description: 'Whether sidebar is in collapsed state',
      control: { type: 'boolean' }
    },
    onNavigate: {
      description: 'Callback when user clicks a navigation item',
      action: 'navigate'
    },
    onToggleCollapse: {
      description: 'Callback when user toggles sidebar collapse state',
      action: 'toggle-collapse'
    }
  }
};

export default meta;

type Story = StoryObj<typeof DesktopSidebar>;

// ============================================================================
// INTERACTIVE DEMO WRAPPER
// ============================================================================

const InteractiveSidebarDemo = ({ 
  initialCollapsed = false, 
  items, 
  user,
  ...props 
}: any) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)',
      display: 'flex'
    }}>
      <DesktopSidebar
        items={items}
        user={user}
        collapsed={collapsed}
        onNavigate={action('navigate')}
        onToggleCollapse={() => {
          setCollapsed(!collapsed);
          action('toggle-collapse')(!collapsed);
        }}
        {...props}
      />
      
      {/* Main content area */}
      <div 
        className="flex-1 p-8 transition-all duration-300"
        style={{ 
          marginLeft: collapsed ? '64px' : '256px'
        }}
      >
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Desktop Sidebar Demo</h1>
            <p className="text-[var(--hive-text-secondary)] text-lg">
              Experience the collapsible sidebar with hover tooltips and smooth animations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4">Sidebar State</h2>
              <div className="space-y-2 text-sm">
                <div><strong>Collapsed:</strong> {collapsed ? 'Yes' : 'No'}</div>
                <div><strong>Width:</strong> {collapsed ? '64px' : '256px'}</div>
                <div><strong>User:</strong> {user.name}</div>
                <div><strong>Builder Status:</strong> {user.builderStatus}</div>
              </div>
            </div>
            
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
              <div className="space-y-2 text-sm">
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">⌘ B</kbd> Toggle Sidebar</div>
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">Tab</kbd> Navigate Items</div>
                <div><kbd className="px-2 py-1 bg-[var(--hive-bg-tertiary)] rounded">Enter</kbd> Activate Item</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] mb-8">
            <h2 className="text-xl font-semibold mb-4">Interactive Features</h2>
            <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
              <li>• Click the collapse button to toggle sidebar width</li>
              <li>• Hover over items when collapsed to see tooltips</li>
              <li>• Notice how content area adjusts automatically</li>
              <li>• Try keyboard navigation with Tab key</li>
              <li>• Watch for smooth animations and micro-interactions</li>
            </ul>
          </div>
          
          {/* Sample content sections */}
          {Array.from({ length: 5 }, (_, i) => (
            <div 
              key={i}
              className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 mb-4 border border-[var(--hive-border-default)]"
            >
              <h3 className="font-semibold mb-2">Content Section {i + 1}</h3>
              <p className="text-[var(--hive-text-secondary)] text-sm">
                This content automatically adjusts its margin based on sidebar state. 
                The layout remains clean and functional in both expanded and collapsed modes.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// STORIES
// ============================================================================

export const Default: Story = {
  args: {
    items: createMockItems('feed'),
    user: mockUser,
    initialCollapsed: false
  },
  render: (args) => <InteractiveSidebarDemo {...args} />
};

export const Collapsed: Story = {
  args: {
    items: createMockItems('profile'),
    user: mockUser,
    initialCollapsed: true
  },
  render: (args) => <InteractiveSidebarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Collapsed sidebar showing icon-only navigation with tooltips on hover.
Perfect for maximizing content space while maintaining navigation access.
        `
      }
    }
  }
};

export const WithBadges: Story = {
  args: {
    items: createMockItems('spaces'),
    user: mockUser,
    initialCollapsed: false
  },
  render: (args) => <InteractiveSidebarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Sidebar with various badge types showing notifications, status updates, and new features.
        `
      }
    }
  }
};

export const BuilderUser: Story = {
  args: {
    items: createMockItems('hivelab'),
    user: builderUser,
    initialCollapsed: false
  },
  render: (args) => <InteractiveSidebarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Sidebar for active builder user showing special builder status indicators.
        `
      }
    }
  }
};

export const CollapsedWithBadges: Story = {
  args: {
    items: createMockItems('profile'),
    user: mockUser,
    initialCollapsed: true
  },
  render: (args) => <InteractiveSidebarDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: `
Collapsed sidebar showing how badges adapt to the compact layout with dot indicators.
        `
      }
    }
  }
};

// ============================================================================
// TOOLTIP DEMO STORY
// ============================================================================

export const TooltipDemo: Story = {
  args: {
    items: createMockItems('spaces'),
    user: mockUser,
    initialCollapsed: true
  },
  render: (args) => (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)',
      display: 'flex'
    }}>
      <DesktopSidebar
        {...args}
        onNavigate={action('navigate')}
        onToggleCollapse={action('toggle-collapse')}
      />
      
      <div className="flex-1 p-8 ml-16">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Tooltip Demo</h1>
          <p className="text-[var(--hive-text-secondary)] mb-6">
            Hover over the collapsed sidebar items to see rich tooltips with item descriptions.
          </p>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
            <h2 className="text-lg font-semibold mb-4">Tooltip Features</h2>
            <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
              <li>• <strong>Smart Positioning:</strong> Tooltips appear to the right of collapsed sidebar</li>
              <li>• <strong>Rich Content:</strong> Shows item name and description</li>
              <li>• <strong>Smooth Animation:</strong> Fade in/out with scale transition</li>
              <li>• <strong>Hover Delay:</strong> Brief delay prevents accidental triggers</li>
              <li>• <strong>Accessible:</strong> Works with keyboard focus and screen readers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Dedicated story for testing tooltip behavior and animations in collapsed sidebar mode.
        `
      }
    }
  }
};

// ============================================================================
// KEYBOARD NAVIGATION STORY
// ============================================================================

export const KeyboardNavigation: Story = {
  args: {
    items: createMockItems('feed'),
    user: mockUser,
    initialCollapsed: false
  },
  render: (args) => (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)',
      display: 'flex'
    }}>
      <DesktopSidebar
        {...args}
        onNavigate={action('navigate')}
        onToggleCollapse={action('toggle-collapse')}
      />
      
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">Keyboard Navigation Test</h1>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] mb-6">
            <h2 className="text-lg font-semibold mb-4">Test Instructions</h2>
            <ol className="space-y-2 text-sm text-[var(--hive-text-secondary)] list-decimal list-inside">
              <li>Press Tab to focus on the first sidebar item</li>
              <li>Use Tab/Shift+Tab to navigate between items</li>
              <li>Press Enter or Space to activate an item</li>
              <li>Use ⌘+B (Ctrl+B on Windows) to toggle collapse</li>
              <li>Notice focus ring visibility and smooth transitions</li>
            </ol>
          </div>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
            <h2 className="text-lg font-semibold mb-4">Accessibility Features</h2>
            <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
              <li>• Focus indicators with high contrast rings</li>
              <li>• ARIA labels for screen reader support</li>
              <li>• Proper tabindex management</li>
              <li>• Keyboard shortcut support</li>
              <li>• Current page indication with aria-current</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Test keyboard navigation and accessibility features of the desktop sidebar.
        `
      }
    }
  }
};