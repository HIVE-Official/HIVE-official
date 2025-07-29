import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button, buttonVariants } from '../../atomic/atoms/button-enhanced';
import { Play, Download, Plus, Heart, Settings, Share2 } from 'lucide-react';

/**
 * # Enhanced Button Atom
 * 
 * The enhanced button is a foundational atomic component in the HIVE Design System.
 * It uses 100% semantic tokens with zero hardcoded values, ensuring perfect design
 * system compliance and theme consistency.
 * 
 * ## Features
 * - Complete semantic token usage (no hardcoded values)
 * - Multiple variants for different contexts
 * - Size variations from xs to xl
 * - Radius customization
 * - Loading and disabled states
 * - WCAG 2.1 AA accessibility compliance
 * - HIVE liquid metal motion integration
 * - Campus-optimized interaction patterns
 * 
 * ## Usage
 * Perfect for all campus interactions - from joining study groups to course
 * registration, tool activation, and social connections.
 */

const meta: Meta<typeof Button> = {
  title: '01-Atoms/Button Enhanced',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
# Enhanced Button Component

The enhanced button is the primary interactive element in the HIVE Design System, designed specifically for campus life interactions.

## Design Philosophy
- **Semantic First**: 100% semantic token usage
- **Student-Centered**: Optimized for campus interactions
- **Accessible**: WCAG 2.1 AA compliant
- **Motion-Integrated**: HIVE liquid metal interactions

## Technical Implementation
- Zero hardcoded values
- Class Variance Authority for type-safe variants
- Radix UI Slot for composition
- CSS custom properties for theming
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'destructive', 'success', 'warning', 'info', 'link'],
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon'],
      description: 'Size of the button'
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'default', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius variation'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button'
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (composition)'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] flex items-center justify-center">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic campus usage
export const Default: Story = {
  args: {
    children: 'Join Study Group'
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'default',
    radius: 'default',
    disabled: false,
    children: 'Interactive Button'
  }
};

// 3. ALL VARIANTS STORY - Complete variant showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Primary</h3>
        <Button variant="primary">Join Group</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Secondary</h3>
        <Button variant="secondary">Learn More</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Ghost</h3>
        <Button variant="ghost">Maybe Later</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Destructive</h3>
        <Button variant="destructive">Leave Group</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Success</h3>
        <Button variant="success">Completed</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Warning</h3>
        <Button variant="warning">Deadline Soon</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Info</h3>
        <Button variant="info">More Info</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Link</h3>
        <Button variant="link">View Details</Button>
      </div>
    </div>
  )
};

// 4. ALL SIZES STORY - Size variations
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Extra Small</p>
        <Button size="xs">Join</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Small</p>
        <Button size="sm">Join Group</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Default</p>
        <Button size="default">Join Study Group</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Large</p>
        <Button size="lg">Join Study Group</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Extra Large</p>
        <Button size="xl">Join Study Group</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Icon</p>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
};

// 5. RADIUS VARIATIONS STORY - Border radius options
export const RadiusVariations: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-4">
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">None</p>
        <Button radius="none">Sharp</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Small</p>
        <Button radius="sm">Subtle</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Default</p>
        <Button radius="default">Standard</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Medium</p>
        <Button radius="md">Medium</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Large</p>
        <Button radius="lg">Large</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Extra Large</p>
        <Button radius="xl">XL</Button>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xs text-[var(--hive-text-secondary)]">Full</p>
        <Button radius="full">Pill</Button>
      </div>
    </div>
  )
};

// 6. STATES STORY - Different interaction states
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Default</h3>
        <Button>Available</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Hover</h3>
        <Button className="hover:scale-105">Hover Me</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Active</h3>
        <Button className="active:scale-95">Press Me</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Disabled</h3>
        <Button disabled>Class Full</Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Loading</h3>
        <Button disabled>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Joining...
        </Button>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xs font-medium text-[var(--hive-text-secondary)]">Focus</h3>
        <Button className="ring-2 ring-[var(--hive-brand-primary)] ring-offset-2">
          Focused
        </Button>
      </div>
    </div>
  )
};

// 7. WITH ICONS STORY - Icon combinations
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Icon Combinations
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Common campus action patterns with icons
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button>
          <Play className="mr-2 h-4 w-4" />
          Start Session
        </Button>
        <Button variant="secondary">
          <Download className="mr-2 h-4 w-4" />
          Download Notes
        </Button>
        <Button variant="ghost">
          <Plus className="mr-2 h-4 w-4" />
          Add Tool
        </Button>
        <Button variant="destructive">
          <Heart className="mr-2 h-4 w-4" />
          Unlike
        </Button>
        <Button variant="secondary">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
      
      <div className="flex justify-center gap-2">
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="secondary">
          <Heart className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
};

// 8. CAMPUS USAGE STORY - Real campus scenarios
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world campus interactions where students use buttons
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Study Groups</h3>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Join Chemistry Study Group</Button>
            <Button variant="secondary" size="sm">Request to Join</Button>
            <Button variant="ghost" size="sm">Maybe Later</Button>
            <Button variant="destructive" size="sm">Leave Group</Button>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Course Registration</h3>
          <div className="flex flex-wrap gap-2">
            <Button>Register for CS 101</Button>
            <Button variant="warning">Waitlist Full</Button>
            <Button variant="secondary">Add to Wishlist</Button>
            <Button variant="destructive" disabled>Class Closed</Button>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Campus Tools</h3>
          <div className="flex flex-wrap gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Tool
            </Button>
            <Button variant="secondary">
              <Download className="mr-2 h-4 w-4" />
              Export Results
            </Button>
            <Button variant="ghost">
              <Share2 className="mr-2 h-4 w-4" />
              Share with Classmates
            </Button>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Social Interactions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="success">
              <Heart className="mr-2 h-4 w-4" />
              Like Post
            </Button>
            <Button variant="secondary">Follow Classmate</Button>
            <Button variant="ghost">Send Message</Button>
            <Button variant="link">View Profile</Button>
          </div>
        </div>
      </div>
    </div>
  )
};

// 9. RESPONSIVE STORY - Mobile-first behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Responsive Behavior
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Mobile-first button design for campus devices
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mobile (current on small screens) */}
        <div className="md:hidden">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Mobile (44px minimum touch target)</h3>
            <div className="space-y-2">
              <Button className="w-full min-h-[44px]">Join Study Group</Button>
              <Button variant="secondary" className="w-full min-h-[44px]">Learn More</Button>
            </div>
          </div>
        </div>
        
        {/* Desktop (current on larger screens) */}
        <div className="hidden md:block">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Desktop (Inline actions)</h3>
            <div className="flex gap-2">
              <Button>Join Study Group</Button>
              <Button variant="secondary">Learn More</Button>
              <Button variant="ghost">Maybe Later</Button>
            </div>
          </div>
        </div>
        
        {/* All sizes demonstration */}
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Responsive Size Adaptation</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button className="flex-1 sm:flex-none">Primary Action</Button>
            <Button variant="secondary" className="flex-1 sm:flex-none">Secondary</Button>
          </div>
        </div>
      </div>
    </div>
  )
};

// 10. ACCESSIBILITY STORY - A11y compliance
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant button implementations
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Keyboard Navigation</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Tab to navigate, Enter/Space to activate, Escape to blur
          </p>
          <div className="flex gap-2">
            <Button tabIndex={1}>First Button</Button>
            <Button tabIndex={2} variant="secondary">Second Button</Button>
            <Button tabIndex={3} variant="ghost">Third Button</Button>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Screen Reader Support</h3>
          <div className="space-y-2">
            <Button 
              aria-label="Join the Computer Science 101 study group with 12 current members"
              title="Join CS 101 Study Group - 12 members"
            >
              Join CS 101 Study Group
            </Button>
            <Button 
              variant="secondary"
              aria-describedby="button-help-text"
            >
              Need Help?
            </Button>
            <p id="button-help-text" className="text-xs text-[var(--hive-text-secondary)]">
              This button opens the campus support center
            </p>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Focus Management</h3>
          <div className="space-y-2">
            <Button className="focus:ring-2 focus:ring-[var(--hive-brand-primary)] focus:ring-offset-2">
              Custom Focus Ring
            </Button>
            <Button 
              disabled
              aria-label="This action is currently unavailable"
            >
              Disabled Button
            </Button>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">High Contrast Support</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            All button variants meet WCAG AA contrast requirements (4.5:1 minimum)
          </p>
          <div className="flex flex-wrap gap-2">
            <Button>Primary (AA)</Button>
            <Button variant="secondary">Secondary (AA)</Button>
            <Button variant="ghost">Ghost (AA)</Button>
            <Button variant="destructive">Destructive (AA)</Button>
          </div>
        </div>
      </div>
    </div>
  )
};

// 11. MOTION INTEGRATION STORY - HIVE liquid metal interactions
export const MotionIntegration: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          HIVE Motion System Integration  
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Liquid metal interactions and buttery animations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Magnetic Hover</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Subtle lift and scale on hover - like liquid mercury
          </p>
          <Button className="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg">
            Hover for Magic
          </Button>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Press Response</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Responsive press feedback with spring animation
          </p>
          <Button className="transition-all duration-100 active:scale-95">
            Press Me
          </Button>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Loading Animation</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Smooth state transitions with visual feedback
          </p>
          <Button disabled className="animate-pulse">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
            Processing...
          </Button>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Cascade Effect</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Sequential animation for multiple buttons
          </p>
          <div className="space-y-2">
            <Button 
              size="sm" 
              className="animate-in slide-in-from-left duration-300"
              style={{ animationDelay: '0ms' }}
            >
              First
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              className="animate-in slide-in-from-left duration-300"
              style={{ animationDelay: '100ms' }}
            >
              Second  
            </Button>
            <Button 
              size="sm"
              variant="ghost" 
              className="animate-in slide-in-from-left duration-300"
              style={{ animationDelay: '200ms' }}
            >
              Third
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};