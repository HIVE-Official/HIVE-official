import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../../atomic/atoms/switch';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';

const meta: Meta<typeof Switch> = {
  title: '02-atoms/Form Controls/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Switch Component** - A toggle control for binary choices

Part of the HIVE Atomic Design System with PRD-aligned styling and enhanced accessibility.

## Features
- **PRD-Aligned Colors**: Uses semantic blue-600 for active states
- **Accessibility**: Full ARIA support with proper focus management
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
      description: 'The controlled checked state of the switch'
    },
    defaultChecked: {
      control: 'boolean', 
      description: 'The default checked state when uncontrolled'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size variant'
    },
    onCheckedChange: {
      action: 'checked changed',
      description: 'Callback when the checked state changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Switch
export const Default: Story = {
  args: {
    defaultChecked: false
  }
};

// Checked Switch
export const Checked: Story = {
  args: {
    defaultChecked: true
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
      <Switch id="notifications" defaultChecked />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  )
};

export const FormExample: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Privacy Settings</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="ghost-mode" className="text-sm font-medium">Ghost Mode</Label>
          <p className="text-xs text-gray-400">Hide your online status</p>
        </div>
        <Switch id="ghost-mode" />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="notifications" className="text-sm font-medium">Push Notifications</Label>
          <p className="text-xs text-gray-400">Get alerts for important updates</p>
        </div>
        <Switch id="notifications" defaultChecked />
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="analytics" className="text-sm font-medium">Analytics</Label>
          <p className="text-xs text-gray-400">Help improve HIVE with usage data</p>
        </div>
        <Switch id="analytics" defaultChecked />
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
        <p className="text-sm text-gray-300">✅ Keyboard navigation (Tab, Space, Enter)</p>
        <p className="text-sm text-gray-300">✅ Screen reader support with ARIA labels</p>
        <p className="text-sm text-gray-300">✅ Focus indicators</p>
        <p className="text-sm text-gray-300">✅ Touch-friendly tap targets (44px minimum)</p>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="a11y-demo">Accessible Switch</Label>
          <Switch 
            id="a11y-demo"
            aria-describedby="a11y-help"
            defaultChecked
          />
        </div>
        <p id="a11y-help" className="text-xs text-gray-400 mt-1">
          Tab to focus, Space to toggle
        </p>
      </div>
    </div>
  )
};