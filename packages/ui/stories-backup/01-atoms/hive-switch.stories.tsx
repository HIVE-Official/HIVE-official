import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveSwitch } from '../../components/hive-switch';
import { Moon, Sun, Wifi, Bluetooth, Shield, Bell, Zap, Users } from 'lucide-react';

/**
 * # HiveSwitch - Campus Toggle Control
 * 
 * The HiveSwitch atom is the foundational toggle component in the HIVE Design System.
 * It provides consistent, accessible binary controls for all campus settings with
 * premium liquid metal aesthetics and semantic token integration.
 * 
 * ## Features
 * - Premium liquid metal toggle animation  
 * - Complete semantic token usage (no hardcoded values)
 * - Multiple variants and sizes
 * - Icon support for enhanced meaning
 * - Loading and disabled states
 * - WCAG 2.1 AA accessibility compliance
 * - HIVE liquid metal motion integration
 * - Campus-optimized interaction patterns
 * 
 * ## Usage
 * Perfect for campus toggle controls - from theme switches and notification settings
 * to privacy controls, feature toggles, and academic preference switches.
 */

const meta: Meta<typeof HiveSwitch> = {
  title: '01-Atoms/HiveSwitch',
  component: HiveSwitch,
  parameters: {
    docs: {
      description: {
        component: `
# HiveSwitch Component

The foundational toggle component for all HIVE campus binary controls, featuring premium liquid metal aesthetics.

## Design Philosophy
- **Liquid Metal**: Premium magnetic toggle animation
- **Semantic First**: 100% semantic token usage
- **Campus-Centered**: Optimized for academic settings
- **Accessible**: WCAG 2.1 AA compliant
- **Versatile**: Multiple variants and icon integration

## Technical Implementation
- Zero hardcoded values
- CSS custom properties for theming
- Smooth liquid metal transitions
- Keyboard navigation support
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'premium', 'minimal', 'accent'],
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size of the switch'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch'
    },
    checked: {
      control: 'boolean',
      description: 'Initial checked state'
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

// 1. DEFAULT STORY - Basic campus switch
export const Default: Story = {
  args: {
    checked: false
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    checked: false
  }
};

// 3. ALL VARIANTS STORY - Complete variant showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Switch Variants
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different visual styles for various campus contexts
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-[var(--hive-text-secondary)]">Unchecked States</h3>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Default</span>
            <HiveSwitch variant="default" checked={false} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Premium</span>
            <HiveSwitch variant="premium" checked={false} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Minimal</span>
            <HiveSwitch variant="minimal" checked={false} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Accent</span>
            <HiveSwitch variant="accent" checked={false} />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-[var(--hive-text-secondary)]">Checked States</h3>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Default</span>
            <HiveSwitch variant="default" checked={true} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Premium</span>
            <HiveSwitch variant="premium" checked={true} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Minimal</span>
            <HiveSwitch variant="minimal" checked={true} />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
            <span className="text-sm">Accent</span>
            <HiveSwitch variant="accent" checked={true} />
          </div>
        </div>
      </div>
    </div>
  )
};

// 4. ALL SIZES STORY - Size variations
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Switch Sizes
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different sizes for various interface needs
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div>
            <p className="text-sm font-medium">Small Switch</p>
            <p className="text-xs text-[var(--hive-text-secondary)]">Compact for dense layouts</p>
          </div>
          <HiveSwitch size="sm" checked={true} />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div>
            <p className="text-sm font-medium">Default Switch</p>
            <p className="text-xs text-[var(--hive-text-secondary)]">Standard size for most interfaces</p>
          </div>
          <HiveSwitch size="default" checked={true} />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div>
            <p className="text-sm font-medium">Large Switch</p>
            <p className="text-xs text-[var(--hive-text-secondary)]">Prominent for important settings</p>
          </div>
          <HiveSwitch size="lg" checked={true} />
        </div>
      </div>
    </div>
  )
};

// 5. WITH ICONS STORY - Icon integration
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Icon Integration
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Common campus toggle patterns with meaningful icons
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-medium">Light Mode</span>
          </div>
          <HiveSwitch variant="premium" checked={false} />
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium">Dark Mode</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">WiFi Connection</span>
          </div>
          <HiveSwitch variant="accent" checked={true} />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div className="flex items-center gap-2">
            <Bluetooth className="h-4 w-4" />
            <span className="text-sm font-medium">Bluetooth</span>
          </div>
          <HiveSwitch variant="default" checked={false} />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Privacy Mode</span>
          </div>
          <HiveSwitch variant="minimal" checked={true} />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="text-sm font-medium">Notifications</span>
          </div>
          <HiveSwitch variant="default" checked={true} />
        </div>
      </div>
    </div>
  )
};

// 6. CAMPUS USAGE STORY - Real campus scenarios
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world campus situations where switches are used
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Profile Privacy Settings</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Show Online Status</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Let others see when you're active</p>
                </div>
                <HiveSwitch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Public Profile</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Make profile visible to all students</p>
                </div>
                <HiveSwitch variant="premium" checked={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Show Study Schedule</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Display your study times to classmates</p>
                </div>
                <HiveSwitch variant="minimal" checked={true} />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Notification Preferences</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Assignment Reminders</p>
                    <p className="text-xs text-[var(--hive-text-secondary)]">Due date notifications</p>
                  </div>
                </div>
                <HiveSwitch variant="accent" checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Study Group Invites</p>
                    <p className="text-xs text-[var(--hive-text-secondary)]">New group notifications</p>
                  </div>
                </div>
                <HiveSwitch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <div>
                    <p className="text-sm font-medium">Tool Updates</p>
                    <p className="text-xs text-[var(--hive-text-secondary)]">New features and improvements</p>
                  </div>
                </div>
                <HiveSwitch variant="minimal" checked={false} />
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Study Mode Settings</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Do Not Disturb</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Block non-urgent notifications</p>
                </div>
                <HiveSwitch variant="premium" checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Focus Timer</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Auto-start pomodoro sessions</p>
                </div>
                <HiveSwitch checked={false} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Background Music</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Play focus music during study</p>
                </div>
                <HiveSwitch variant="accent" checked={true} />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Academic Tool Features</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Auto-Save Progress</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Automatically save work every 30 seconds</p>
                </div>
                <HiveSwitch checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Smart Suggestions</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">AI-powered study recommendations</p>
                </div>
                <HiveSwitch variant="premium" checked={true} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Collaborative Mode</p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">Allow real-time collaboration</p>
                </div>
                <HiveSwitch variant="minimal" checked={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 7. STATES STORY - Different interaction states
export const States: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Switch States
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different interaction and validation states
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div>
            <p className="text-sm font-medium">Normal (Off)</p>
            <p className="text-xs text-[var(--hive-text-secondary)]">Ready for interaction</p>
          </div>
          <HiveSwitch checked={false} />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div>
            <p className="text-sm font-medium">Normal (On)</p>
            <p className="text-xs text-[var(--hive-text-secondary)]">Active state</p>
          </div>
          <HiveSwitch checked={true} />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div>
            <p className="text-sm font-medium text-[var(--hive-text-secondary)]">Disabled (Off)</p>
            <p className="text-xs text-[var(--hive-text-secondary)]">Cannot be toggled</p>
          </div>
          <HiveSwitch checked={false} disabled />
        </div>
        
        <div className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg">
          <div>
            <p className="text-sm font-medium text-[var(--hive-text-secondary)]">Disabled (On)</p>
            <p className="text-xs text-[var(--hive-text-secondary)]">Locked in active state</p>
          </div>
          <HiveSwitch checked={true} disabled />
        </div>
      </div>
    </div>
  )
};

// 8. RESPONSIVE STORY - Mobile-first behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Responsive Behavior
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Mobile-first switch design for campus devices
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mobile (current on small screens) */}
        <div className="md:hidden">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Mobile (Touch-optimized)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Large touch targets</span>
                <HiveSwitch size="lg" checked={true} />
              </div>
              <p className="text-xs text-[var(--hive-text-secondary)]">Larger switches for easier mobile interaction</p>
            </div>
          </div>
        </div>
        
        {/* Desktop (current on larger screens) */}
        <div className="hidden md:block">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Desktop (Precise control)</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Standard size switches</span>
                <HiveSwitch size="default" checked={true} />
              </div>
              <p className="text-xs text-[var(--hive-text-secondary)]">Optimal for mouse and keyboard interaction</p>
            </div>
          </div>
        </div>
        
        {/* Adaptive behavior */}
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Adaptive Behavior</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Context-aware sizing</span>
              <HiveSwitch className="sm:scale-100 scale-125" checked={true} />
            </div>
            <p className="text-xs text-[var(--hive-text-secondary)]">
              Automatically scales based on device capabilities and screen size
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};