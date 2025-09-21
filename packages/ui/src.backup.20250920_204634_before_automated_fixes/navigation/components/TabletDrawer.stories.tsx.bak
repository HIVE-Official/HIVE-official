/**
 * HIVE Tablet Drawer - Storybook Stories
 * YC-Quality Documentation for Tablet Navigation
 * 
 * Complete documentation for the slide-out drawer navigation
 * optimized for tablet devices with touch interactions.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { TabletDrawer, TabletDrawerTrigger } from './TabletDrawer';
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
    badge: item.id === 'spaces' ? { type: 'notification' as const, count: 6 } : 
           item.id === 'feed' ? { type: 'status' as const, count: 14 } :
           item.id === 'hivelab' && activeSection !== 'hivelab' ? { type: 'feature' as const, label: 'NEW' } : undefined
  }));
};

// ============================================================================
// STORYBOOK META
// ============================================================================

const meta: Meta<typeof TabletDrawer> = {
  title: 'Navigation/TabletDrawer',
  component: TabletDrawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Tablet Drawer

Slide-out navigation drawer optimized for tablet devices (768-1199px).

## Features

- **📱 Touch Optimized**: Larger touch targets (48px+) perfect for tablet interaction
- **👆 Swipe Gestures**: Swipe left to close, natural tablet behavior
- **🎨 Rich Content**: Full item descriptions and context information
- **✨ Smooth Animation**: Spring-powered slide animation with backdrop
- **🎯 Smart Positioning**: Slides from left edge, doesn't obstruct content
- **👤 User Integration**: Prominent user profile with builder status
- **⌨️ Keyboard Support**: Full keyboard navigation and Escape to close

## Design Philosophy

- **Tablet-First**: Designed specifically for tablet form factor and usage patterns
- **Content Rich**: More space allows for descriptive labels and context
- **Gesture Friendly**: Supports natural tablet gestures and interactions
- **Contextual**: Shows more information than mobile while staying focused

## Interaction Patterns

- **Trigger**: Hamburger menu button or swipe from left edge
- **Close**: Tap outside, swipe left, Escape key, or close button
- **Navigate**: Tap items with smooth close-on-navigate behavior
        `
      }
    },
    viewport: {
      defaultViewport: 'tablet'
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
    isOpen: {
      description: 'Whether drawer is currently open',
      control: { type: 'boolean' }
    },
    onNavigate: {
      description: 'Callback when user taps a navigation item',
      action: 'navigate'
    },
    onClose: {
      description: 'Callback when drawer should close',
      action: 'close'
    }
  }
};

export default meta;

type Story = StoryObj<typeof TabletDrawer>;

// ============================================================================
// INTERACTIVE DEMO WRAPPER
// ============================================================================

const InteractiveTabletDemo = ({ 
  items,
  user,
  initialOpen = false,
  ...props 
}: any) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleNavigate = (href: string) => {
    action('navigate')(href);
    setIsOpen(false); // Close drawer on navigation
  };

  const handleClose = () => {
    setIsOpen(false);
    action('close')();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)',
      position: 'relative'
    }}>
      {/* Drawer trigger button */}
      <div className="fixed top-4 left-4 z-30">
        <TabletDrawerTrigger onOpen={() => setIsOpen(true)} />
      </div>
      
      {/* Main content */}
      <div className="p-6 pl-16">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Tablet Drawer Demo</h1>
            <p className="text-[var(--hive-text-secondary)] text-lg">
              Experience the slide-out navigation optimized for tablet interaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4">Drawer State</h2>
              <div className="space-y-2 text-sm">
                <div><strong>Open:</strong> {isOpen ? 'Yes' : 'No'}</div>
                <div><strong>User:</strong> {user.name}</div>
                <div><strong>Builder Status:</strong> {user.builderStatus}</div>
                <div><strong>Animation:</strong> Spring transition</div>
              </div>
            </div>
            
            <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]">
              <h2 className="text-xl font-semibold mb-4">Interactions</h2>
              <div className="space-y-2 text-sm">
                <div>• Tap hamburger to open</div>
                <div>• Swipe left to close</div>
                <div>• Tap outside to close</div>
                <div>• Press Escape to close</div>
                <div>• Navigate closes automatically</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] mb-8">
            <h2 className="text-xl font-semibold mb-4">Touch Optimization</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-sm text-[var(--hive-text-secondary)]">
              <li>• 48px+ minimum touch targets</li>
              <li>• Larger icons for better visibility</li>
              <li>• Generous spacing between items</li>
              <li>• Rich descriptions for context</li>
              <li>• Prominent user profile section</li>
              <li>• Clear visual hierarchy</li>
            </ul>
          </div>
          
          {/* Sample tablet content */}
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 6 }, (_, i) => (
              <div 
                key={i}
                className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)]"
              >
                <h3 className="font-semibold mb-2">Content Section {i + 1}</h3>
                <p className="text-[var(--hive-text-secondary)] text-sm">
                  Tablet-optimized content layout. The drawer slides over content without
                  disrupting the reading experience. Perfect for hybrid touch/mouse usage.
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Open Navigation Drawer
            </button>
          </div>
        </div>
      </div>

      {/* Tablet Drawer */}
      <TabletDrawer
        items={items}
        user={user}
        isOpen={isOpen}
        onNavigate={handleNavigate}
        onClose={handleClose}
        {...props}
      />
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
    initialOpen: false
  },
  render: (args) => <InteractiveTabletDemo {...args} />
};

export const OpenByDefault: Story = {
  args: {
    items: createMockItems('spaces'),
    user: mockUser,
    initialOpen: true
  },
  render: (args) => <InteractiveTabletDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer shown in open state to demonstrate the full interface and animations.'
      }
    }
  }
};

export const WithBadges: Story = {
  args: {
    items: createMockItems('profile'),
    user: mockUser,
    initialOpen: true
  },
  render: (args) => <InteractiveTabletDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer showing notification badges and status indicators with enhanced visibility.'
      }
    }
  }
};

export const BuilderUser: Story = {
  args: {
    items: createMockItems('hivelab'),
    user: builderUser,
    initialOpen: true
  },
  render: (args) => <InteractiveTabletDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Drawer for active builder user showing special status indicators and enhanced profile.'
      }
    }
  }
};

export const ProfileActive: Story = {
  args: {
    items: createMockItems('profile'),
    user: mockUser,
    initialOpen: true
  },
  render: (args) => <InteractiveTabletDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Profile section active showing user dashboard state with rich content descriptions.'
      }
    }
  }
};

// ============================================================================
// TRIGGER BUTTON STORY
// ============================================================================

export const TriggerButton: Story = {
  render: () => (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)',
      padding: '2rem'
    }}>
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Tablet Drawer Trigger</h1>
        <p className="text-[var(--hive-text-secondary)] mb-6">
          The hamburger menu button that triggers the tablet drawer. Positioned for easy thumb access.
        </p>
        
        <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] mb-6">
          <h2 className="text-lg font-semibold mb-4">Trigger Features</h2>
          <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
            <li>• <strong>Positioning:</strong> Fixed top-left for consistent access</li>
            <li>• <strong>Size:</strong> 40x40px touch target with visual icon</li>
            <li>• <strong>Animation:</strong> Subtle hover and tap feedback</li>
            <li>• <strong>Accessibility:</strong> Proper ARIA labels and keyboard support</li>
            <li>• <strong>Visual:</strong> Three-line hamburger icon following conventions</li>
          </ul>
        </div>
        
        <div className="flex items-center gap-4">
          <TabletDrawerTrigger onOpen={action('trigger-open')} />
          <span className="text-sm text-[var(--hive-text-secondary)]">
            ← Click the hamburger menu
          </span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Isolated trigger button component showing design and interaction patterns.'
      }
    }
  }
};

// ============================================================================
// SWIPE GESTURE DEMO
// ============================================================================

export const SwipeGestureDemo: Story = {
  args: {
    items: createMockItems('spaces'),
    user: mockUser,
    initialOpen: true
  },
  render: (args) => (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: 'var(--hive-background-primary)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Swipe Gesture Demo</h1>
          <p className="text-[var(--hive-text-secondary)]">
            On touch devices, swipe left on the drawer to close it naturally.
          </p>
        </div>
        
        <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">Gesture Support</h2>
          <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
            <li>• <strong>Swipe Left:</strong> Close drawer (100px threshold)</li>
            <li>• <strong>Touch Start:</strong> Registers initial touch position</li>
            <li>• <strong>Touch Move:</strong> Tracks swipe distance and direction</li>
            <li>• <strong>Touch End:</strong> Evaluates gesture and triggers close</li>
            <li>• <strong>Fallback:</strong> Always works with tap outside or buttons</li>
          </ul>
        </div>
      </div>

      <InteractiveTabletDemo {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates swipe gesture functionality - test on touch devices for full experience.'
      }
    }
  }
};

// ============================================================================
// ANIMATION SHOWCASE
// ============================================================================

export const AnimationShowcase: Story = {
  args: {
    items: createMockItems('feed'),
    user: mockUser,
    initialOpen: false
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: 'var(--hive-background-primary)',
        color: 'var(--hive-text-primary)'
      }}>
        <div className="p-6">
          <div className="max-w-2xl mb-8">
            <h1 className="text-2xl font-bold mb-4">Animation Showcase</h1>
            <p className="text-[var(--hive-text-secondary)] mb-6">
              Watch the smooth spring animations and staggered item entrances.
            </p>
            
            <div className="flex gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-[var(--hive-brand-secondary)] text-[var(--hive-text-inverse)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Open Drawer
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[var(--hive-bg-tertiary)] text-[var(--hive-text-primary)] rounded-lg text-sm font-medium hover:bg-[var(--hive-interactive-hover)] transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
          
          <div className="bg-[var(--hive-bg-secondary)] rounded-xl p-6 border border-[var(--hive-border-default)] max-w-2xl">
            <h2 className="text-lg font-semibold mb-4">Animation Details</h2>
            <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
              <li>• <strong>Drawer Slide:</strong> Spring animation with damping: 30, stiffness: 300</li>
              <li>• <strong>Backdrop Fade:</strong> 150ms opacity transition</li>
              <li>• <strong>Item Stagger:</strong> 50ms delay between each navigation item</li>
              <li>• <strong>User Profile:</strong> 100ms delay for user section</li>
              <li>• <strong>Footer:</strong> 400ms delay for bottom content</li>
            </ul>
          </div>
        </div>

        <TabletDrawer
          items={args.items}
          user={args.user}
          isOpen={isOpen}
          onNavigate={action('navigate')}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Focused demonstration of the drawer animation system and timing.'
      }
    }
  }
};