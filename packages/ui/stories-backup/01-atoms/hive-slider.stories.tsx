import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveSlider } from '../../components/hive-slider';
import { Volume2, Sun, Wifi, Battery } from 'lucide-react';

/**
 * # HiveSlider - Campus Control Interface
 * 
 * The HiveSlider atom is the foundational range input component in the HIVE Design System.
 * It provides consistent, accessible sliders for all campus control interfaces with
 * premium liquid metal aesthetics and semantic token integration.
 * 
 * ## Features
 * - Premium liquid metal motion with magnetic snap
 * - Complete semantic token usage (no hardcoded values)
 * - Multiple variants and sizes
 * - Step and range controls
 * - Value display and formatting
 * - WCAG 2.1 AA accessibility compliance
 * - HIVE liquid metal motion integration
 * - Campus-optimized interaction patterns
 * 
 * ## Usage
 * Perfect for campus control interfaces - from volume controls and brightness settings
 * to tool configurations, preference adjustments, and academic metric displays.
 */

const meta: Meta<typeof HiveSlider> = {
  title: '01-Atoms/HiveSlider',
  component: HiveSlider,
  parameters: {
    docs: {
      description: {
        component: `
# HiveSlider Component

The foundational range input component for all HIVE campus controls, featuring premium liquid metal aesthetics.

## Design Philosophy
- **Liquid Metal**: Premium magnetic snap and fluid motion
- **Semantic First**: 100% semantic token usage
- **Campus-Centered**: Optimized for academic controls
- **Accessible**: WCAG 2.1 AA compliant
- **Versatile**: Multiple variants and value formats

## Technical Implementation
- Zero hardcoded values
- CSS custom properties for theming
- Magnetic snap interactions
- Value formatting system
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
      description: 'Size of the slider'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the slider'
    },
    min: {
      control: 'number',
      description: 'Minimum value'
    },
    max: {
      control: 'number',
      description: 'Maximum value'
    },
    step: {
      control: 'number',
      description: 'Step increment'
    },
    defaultValue: {
      control: 'number',
      description: 'Default value'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] flex items-center justify-center">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic campus slider
export const Default: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50
  }
};

// 3. ALL VARIANTS STORY - Complete variant showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Slider Variants
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different visual styles for various campus contexts
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Default</label>
          <HiveSlider variant="default" defaultValue={65} min={0} max={100} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Standard campus control slider</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Premium</label>
          <HiveSlider variant="premium" defaultValue={80} min={0} max={100} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Enhanced visual hierarchy with liquid metal</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Minimal</label>
          <HiveSlider variant="minimal" defaultValue={30} min={0} max={100} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Clean, subtle design</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Accent</label>
          <HiveSlider variant="accent" defaultValue={90} min={0} max={100} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Highlighted for important controls</p>
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
          Slider Sizes
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different sizes for various interface needs
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm text-[var(--hive-text-secondary)]">Small</label>
          <HiveSlider size="sm" defaultValue={40} min={0} max={100} />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm text-[var(--hive-text-secondary)]">Default</label>
          <HiveSlider size="default" defaultValue={60} min={0} max={100} />
        </div>
        
        <div className="space-y-3">
          <label className="text-sm text-[var(--hive-text-secondary)]">Large</label>
          <HiveSlider size="lg" defaultValue={75} min={0} max={100} />
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
          Common campus control patterns with icons
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)] flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Volume Control
          </label>
          <HiveSlider variant="default" defaultValue={75} min={0} max={100} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Audio level: 75%</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)] flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Brightness
          </label>
          <HiveSlider variant="premium" defaultValue={60} min={0} max={100} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Screen brightness: 60%</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)] flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Signal Strength
          </label>
          <HiveSlider variant="accent" defaultValue={85} min={0} max={100} disabled />
          <p className="text-xs text-[var(--hive-text-secondary)]">WiFi signal: 85% (read-only)</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)] flex items-center gap-2">
            <Battery className="h-4 w-4" />
            Battery Level
          </label>
          <HiveSlider variant="minimal" defaultValue={42} min={0} max={100} disabled />
          <p className="text-xs text-[var(--hive-text-secondary)]">Battery: 42% remaining</p>
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
          Real-world campus situations where sliders are used
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Study Session Settings</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Focus Timer (minutes)</label>
                <HiveSlider defaultValue={25} min={5} max={90} step={5} />
                <p className="text-xs text-[var(--hive-text-secondary)]">Pomodoro session: 25 minutes</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Break Duration (minutes)</label>
                <HiveSlider defaultValue={5} min={2} max={15} step={1} />
                <p className="text-xs text-[var(--hive-text-secondary)]">Short break: 5 minutes</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Background Noise Level</label>
                <HiveSlider variant="minimal" defaultValue={30} min={0} max={100} />
                <p className="text-xs text-[var(--hive-text-secondary)]">White noise: 30%</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Room Environment</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Lighting Level</label>
                <HiveSlider variant="premium" defaultValue={80} min={0} max={100} />
                <p className="text-xs text-[var(--hive-text-secondary)]">Room brightness: 80%</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Temperature Setting</label>
                <HiveSlider defaultValue={72} min={65} max={80} />
                <p className="text-xs text-[var(--hive-text-secondary)]">Target: 72°F</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Academic Tool Settings</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty Level</label>
                <HiveSlider variant="accent" defaultValue={7} min={1} max={10} />
                <p className="text-xs text-[var(--hive-text-secondary)]">Advanced (7/10)</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Study Pace</label>
                <HiveSlider defaultValue={60} min={20} max={100} />
                <p className="text-xs text-[var(--hive-text-secondary)]">Moderate pace: 60%</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Practice Problems per Session</label>
                <HiveSlider defaultValue={15} min={5} max={50} step={5} />
                <p className="text-xs text-[var(--hive-text-secondary)]">15 problems</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-[var(--hive-brand-primary)]">Social Preferences</h3>
            <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Group Size Preference</label>
                <HiveSlider defaultValue={4} min={2} max={8} />
                <p className="text-xs text-[var(--hive-text-secondary)]">Ideal group: 4 people</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Collaboration Level</label>
                <HiveSlider variant="premium" defaultValue={75} min={0} max={100} />
                <p className="text-xs text-[var(--hive-text-secondary)]">High collaboration: 75%</p>
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
          Slider States
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different interaction and validation states
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Normal State</label>
          <HiveSlider defaultValue={50} min={0} max={100} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Ready for interaction</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-secondary)]">Disabled State</label>
          <HiveSlider defaultValue={75} min={0} max={100} disabled />
          <p className="text-xs text-[var(--hive-text-secondary)]">Cannot be modified</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">High Precision</label>
          <HiveSlider defaultValue={3.7} min={0} max={4} step={0.1} />
          <p className="text-xs text-[var(--hive-text-secondary)]">GPA: 3.7 (precise control)</p>
        </div>
        
        <div className="space-y-3">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Stepped Values</label>
          <HiveSlider defaultValue={20} min={0} max={100} step={20} />
          <p className="text-xs text-[var(--hive-text-secondary)]">Increments of 20 (0, 20, 40, 60, 80, 100)</p>
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
          Mobile-first slider design for campus devices
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mobile (current on small screens) */}
        <div className="md:hidden">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Mobile (Touch-optimized)</h3>
            <div className="space-y-4">
              <HiveSlider size="lg" defaultValue={60} min={0} max={100} />
              <p className="text-xs text-[var(--hive-text-secondary)]">Larger touch targets for mobile</p>
            </div>
          </div>
        </div>
        
        {/* Desktop (current on larger screens) */}
        <div className="hidden md:block">
          <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
            <h3 className="font-medium mb-3">Desktop (Precise control)</h3>
            <div className="space-y-4">
              <HiveSlider size="default" defaultValue={60} min={0} max={100} />
              <p className="text-xs text-[var(--hive-text-secondary)]">Standard size for mouse interaction</p>
            </div>
          </div>
        </div>
        
        {/* Adaptive sizing */}
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Adaptive Sizing</h3>
          <div className="space-y-4">
            <HiveSlider 
              className="sm:h-2 h-3" 
              defaultValue={60} 
              min={0} 
              max={100} 
            />
            <p className="text-xs text-[var(--hive-text-secondary)]">
              Automatically adjusts size based on screen size
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};