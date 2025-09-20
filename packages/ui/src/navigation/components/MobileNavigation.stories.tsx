/**
 * HIVE Mobile Navigation - Storybook Stories
 * YC-Quality Documentation for Mobile Bottom Tabs
 * 
 * Complete documentation for the touch-optimized mobile navigation
 * with perfect thumb accessibility and smooth animations.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MobileNavigation } from './MobileNavigation';
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
    layout: 'auto',
    sidebarCollapsed: false,
    enableKeyboardShortcuts: true,
    enableAnimations: true,
    theme: 'system'
  }
};

const createMockItems = (activeSection?: string) => {
  const items = createNavigationItems();
  return items.map(item => ({
    ...item,
    isActive: item.id === activeSection,
    badge: item.id === 'spaces' ? { type: 'notification' as const, count: 3 } : 
           item.id === 'feed' ? { type: 'status' as const, count: 12 } : undefined
  }))
};

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof MobileNavigation> = {
  title: 'Navigation/MobileNavigation',
  component: MobileNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Mobile Navigation

Touch-optimized bottom tab navigation designed for mobile devices (< 768px).

## Features

- **👍 Touch Optimized**: 44px+ minimum touch targets for perfect thumb navigation
- **🎯 Active State**: Clear visual feedback for current section
- **🔔 Badge Support**: Notification and status indicators
- **📱 iOS Safe Area**: Proper spacing on devices with notches/home indicators
- **✨ Smooth Animations**: Fluid transitions and micro-interactions
- **♿ Accessible**: Full ARIA support and keyboard navigation

## Design Principles

- **Mobile-First**: Designed specifically for small screens and touch interaction
- **Thumb-Friendly**: All interactive elements easily reachable with thumb
- **Visual Hierarchy**: Clear distinction between active and inactive states
- **Performance**: Optimized animations that don't impact scroll performance

## Badge Types

- **Notification**: Red badges for urgent items (errors, mentions)
- **Status**: Blue badges for general updates
- **Feature**: Info badges for new features or beta indicators
        `
      }
    },
    viewport: {
      defaultViewport: 'mobile1'
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
      description: 'Callback when user taps a navigation item',
      action: 'navigate'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--hive-background-primary)',
        color: 'var(--hive-text-primary)',
        position: 'relative'
      }}>
        {/* Mock mobile content */}
        <div className="p-6 pb-20">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-2xl font-bold">Mobile Navigation Demo</h1>
            <p className="text-[var(--hive-text-secondary)]">
              Scroll down to see more content and experience the fixed bottom navigation
            </p>
          </div>
          
          {/* Mock content sections */}
          {Array.from({ length: 8 }, (_, i) => (
            <div 
              key={i}
              className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 mb-4 border border-[var(--hive-border-default)]"
            >
              <h3 className="font-semibold mb-2">Content Section {i + 1}</h3>
              <p className="text-[var(--hive-text-secondary)] text-sm">
                This is sample content to demonstrate how the navigation behaves with scrollable content.
                The bottom navigation remains fixed and accessible at all times.
              </p>
            </div>
          ))}
          
          <div className="text-center text-[var(--hive-text-tertiary)] text-sm">
            End of content - navigation stays fixed at bottom
          </div>
        </div>
        
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof MobileNavigation>;

// ============================================================================
// STORIES
// ============================================================================

export const Default: Story = {
  args: {
    items: createMockItems('feed'),
    user: mockUser,
    onNavigate: action('navigate')
  }
};

export const ProfileActive: Story = {
  args: {
    items: createMockItems('profile'),
    user: mockUser,
    onNavigate: action('navigate')
  },
  parameters: {
    docs: {
      description: {
        story: 'Profile section active - shows user\'s personal dashboard state.'
      }
    }
  }
};

export const SpacesActive: Story = {
  args: {
    items: createMockItems('spaces'),
    user: mockUser,
    onNavigate: action('navigate')
  },
  parameters: {
    docs: {
      description: {
        story: 'Spaces section active with notification badge showing 3 unread items.'
      }
    }
  }
};

export const HiveLabActive: Story = {
  args: {
    items: createMockItems('hivelab'),
    user: mockUser,
    onNavigate: action('navigate')
  },
  parameters: {
    docs: {
      description: {
        story: 'HiveLAB section active - builder tools and creation interface.'
      }
    }
  }
};

export const WithBadges: Story = {
  args: {
    items: createMockItems('profile').map(item => ({
      ...item,
      badge: item.id === 'feed' ? { type: 'notification' as const, count: 5 } :
             item.id === 'spaces' ? { type: 'status' as const, count: 12 } :
             item.id === 'hivelab' ? { type: 'feature' as const, label: 'NEW' } : undefined
    })),
    user: mockUser,
    onNavigate: action('navigate')
  },
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates all badge types:
- **Feed**: Notification badge (5 unread)
- **Spaces**: Status badge (12 updates)  
- **HiveLAB**: Feature badge (NEW)
        `
      }
    }
  }
};

export const HighBadgeCounts: Story = {
  args: {
    items: createMockItems('feed').map(item => ({
      ...item,
      badge: item.id === 'feed' ? { type: 'notification' as const, count: 99 } :
             item.id === 'spaces' ? { type: 'notification' as const, count: 150 } : undefined
    })),
    user: mockUser,
    onNavigate: action('navigate')
  },
  parameters: {
    docs: {
      description: {
        story: 'High badge counts display as "99+" to prevent layout issues on small screens.'
      }
    }
  }
};

export const BuilderUser: Story = {
  args: {
    items: createMockItems('hivelab'),
    user: {
      ...mockUser,
      builderStatus: 'active'
    },
    onNavigate: action('navigate')
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation for active builder users with enhanced HiveLAB access.'
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
    onNavigate: action('navigate')
  },
  parameters: {
    docs: {
      description: {
        story: 'Clean navigation state without any badges or notifications.'
      }
    }
  }
};

// ============================================================================
// ACCESSIBILITY STORY
// ============================================================================

export const AccessibilityDemo: Story = {
  args: {
    items: createMockItems('spaces'),
    user: mockUser,
    onNavigate: action('navigate')
  },
  render: (args) => (
    <div>
      <div className="p-6 pb-20 bg-[var(--hive-background-primary)]">
        <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] mb-6">
          <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
          <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
            <li>• <strong>Touch Targets:</strong> Minimum 44px height for easy thumb access</li>
            <li>• <strong>ARIA Labels:</strong> Descriptive labels for screen readers</li>
            <li>• <strong>Keyboard Navigation:</strong> Tab through items with Enter/Space to activate</li>
            <li>• <strong>Focus Indicators:</strong> Clear visual focus rings</li>
            <li>• <strong>Badge Announcements:</strong> Screen readers announce badge counts</li>
            <li>• <strong>Active State:</strong> Clearly indicated current page</li>
          </ul>
        </div>
        
        <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
          <h2 className="text-xl font-semibold mb-4">Test Instructions</h2>
          <ol className="space-y-2 text-sm text-[var(--hive-text-secondary)] list-decimal list-inside">
            <li>Use Tab key to navigate between tabs</li>
            <li>Press Enter or Space to activate a tab</li>
            <li>Use screen reader to hear announcements</li>
            <li>Test with various zoom levels (up to 200%)</li>
            <li>Verify touch targets work on actual mobile device</li>
          </ol>
        </div>
      </div>
      
      <MobileNavigation {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Accessibility testing story with detailed guidelines for manual testing.
        `
      }
    }
  }
};