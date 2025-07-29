import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../../../atomic/atoms/checkbox';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';

const meta: Meta<typeof Checkbox> = {
  title: '02-atoms/Form Controls/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Checkbox Component** - A selection control for multiple choices

Part of the HIVE Atomic Design System with PRD-aligned styling and enhanced accessibility.

## Features
- **PRD-Aligned Colors**: Uses semantic blue-600 for checked states
- **Accessibility**: Full ARIA support with proper focus management
- **Indeterminate State**: Supports partial selection for groups
- **Responsive**: Touch-friendly targets for mobile
- **Consistent**: Follows HIVE design token system
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'The controlled checked state of the checkbox'
    },
    defaultChecked: {
      control: 'boolean', 
      description: 'The default checked state when uncontrolled'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size variant'
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when the checked state changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Checkbox
export const Default: Story = {
  args: {
    defaultChecked: false
  }
};

// Checked Checkbox
export const Checked: Story = {
  args: {
    defaultChecked: true
  }
};

// Indeterminate State
export const Indeterminate: Story = {
  args: {
    indeterminate: true
  }
};

// Disabled States
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false
  }
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true
  }
};

export const DisabledIndeterminate: Story = {
  args: {
    disabled: true,
    indeterminate: true
  }
};

// Size Variants
export const SmallSize: Story = {
  args: {
    size: 'sm',
    defaultChecked: true
  }
};

export const MediumSize: Story = {
  args: {
    size: 'md', 
    defaultChecked: true
  }
};

export const LargeSize: Story = {
  args: {
    size: 'lg',
    defaultChecked: true
  }
};

// With Labels (Common Usage Pattern)
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">I agree to the terms and conditions</Label>
    </div>
  )
};

// Checkbox Group Example
export const CheckboxGroup: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Select Interests</h3>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="tech" defaultChecked />
          <Label htmlFor="tech">Technology</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="design" defaultChecked />
          <Label htmlFor="design">Design</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="business" />
          <Label htmlFor="business">Business</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="art" />
          <Label htmlFor="art">Art & Creative</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="sports" />
          <Label htmlFor="sports">Sports</Label>
        </div>
      </div>
    </HiveCard>
  )
};

// Nested Checkbox Group (Parent-Child)
export const NestedCheckboxes: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Notification Preferences</h3>
      
      <div className="space-y-3">
        {/* Parent checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox id="all-notifications" indeterminate />
          <Label htmlFor="all-notifications" className="font-medium">All Notifications</Label>
        </div>
        
        {/* Child checkboxes */}
        <div className="ml-6 space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="email" defaultChecked />
            <Label htmlFor="email">Email updates</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="push" defaultChecked />
            <Label htmlFor="push">Push notifications</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="sms" />
            <Label htmlFor="sms">SMS alerts</Label>
          </div>
        </div>
      </div>
    </HiveCard>
  )
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Accessibility Features</h3>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-300">✅ Keyboard navigation (Tab, Space)</p>
        <p className="text-sm text-gray-300">✅ Screen reader support with ARIA labels</p>
        <p className="text-sm text-gray-300">✅ Focus indicators</p>
        <p className="text-sm text-gray-300">✅ Touch-friendly tap targets (44px minimum)</p>
        <p className="text-sm text-gray-300">✅ Indeterminate state support</p>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="a11y-demo-1"
            aria-describedby="a11y-help-1"
            defaultChecked
          />
          <Label htmlFor="a11y-demo-1">Accessible Checkbox</Label>
        </div>
        <p id="a11y-help-1" className="text-xs text-gray-400">
          Tab to focus, Space to toggle
        </p>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="a11y-demo-2"
            indeterminate
            aria-describedby="a11y-help-2"
          />
          <Label htmlFor="a11y-demo-2">Partially Selected</Label>
        </div>
        <p id="a11y-help-2" className="text-xs text-gray-400">
          Indeterminate state properly announced by screen readers
        </p>
      </div>
    </div>
  )
};