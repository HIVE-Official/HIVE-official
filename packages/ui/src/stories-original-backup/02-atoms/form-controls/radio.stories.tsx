import type { Meta, StoryObj } from '@storybook/react';
import { Radio, SingleRadio } from '../../../atomic/atoms/radio';
import { HiveCard } from '../../../components/hive-card';

const meta: Meta<typeof Radio> = {
  title: '02-atoms/Form Controls/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Radio Component** - A selection control for mutually exclusive choices

Part of the HIVE Atomic Design System with PRD-aligned styling and enhanced accessibility.

## Features
- **PRD-Aligned Colors**: Uses semantic gold/ruby for checked/error states
- **Accessibility**: Full ARIA support with proper focus management
- **2 Variants**: Default and card layout options
- **3 Sizes**: sm, md, lg with proper touch targets
- **Dual API**: Single radio or radio group components
- **Responsive**: Touch-friendly targets for mobile
- **Consistent**: Follows HIVE design token system
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name attribute for the radio group'
    },
    options: {
      description: 'Array of radio options with value, label, and optional description'
    },
    value: {
      control: 'text',
      description: 'The controlled selected value'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Radio size variant'
    },
    variant: {
      control: 'select',
      options: ['default', 'card'],
      description: 'Visual style variant'
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the entire group is disabled'
    },
    error: {
      control: 'text',
      description: 'Error message to display'
    },
    onChange: {
      action: 'value changed',
      description: 'Callback when selection changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
];

const detailedOptions = [
  { 
    value: 'basic', 
    label: 'Basic Plan', 
    description: 'Perfect for individuals getting started'
  },
  { 
    value: 'pro', 
    label: 'Pro Plan', 
    description: 'For professionals and small teams'
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise Plan', 
    description: 'Advanced features for large organizations'
  }
];

// Default Radio Group
export const Default: Story = {
  args: {
    name: 'default-radio',
    options: basicOptions,
    value: 'option1'
  }
};

// With Descriptions
export const WithDescriptions: Story = {
  args: {
    name: 'plans-radio',
    options: detailedOptions,
    value: 'pro'
  }
};

// Card Variant
export const CardVariant: Story = {
  args: {
    name: 'card-radio',
    options: detailedOptions,
    variant: 'card',
    value: 'basic'
  }
};

// Size Variants
export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Small Size</h4>
        <Radio
          name="small-radio"
          options={basicOptions}
          size="sm"
          value="option1"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Medium Size</h4>
        <Radio
          name="medium-radio"
          options={basicOptions}
          size="md"
          value="option2"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Large Size</h4>
        <Radio
          name="large-radio"
          options={basicOptions}
          size="lg"
          value="option3"
        />
      </div>
    </div>
  )
};

// Orientation Options
export const OrientationOptions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Vertical (Default)</h4>
        <Radio
          name="vertical-radio"
          options={basicOptions}
          orientation="vertical"
          value="option1"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Horizontal</h4>
        <Radio
          name="horizontal-radio"
          options={basicOptions}
          orientation="horizontal"
          value="option2"
        />
      </div>
    </div>
  )
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Entire Group Disabled</h4>
        <Radio
          name="disabled-group"
          options={basicOptions}
          disabled
          value="option1"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Individual Options Disabled</h4>
        <Radio
          name="partial-disabled"
          options={[
            { value: 'enabled1', label: 'Enabled Option' },
            { value: 'disabled1', label: 'Disabled Option', disabled: true },
            { value: 'enabled2', label: 'Another Enabled Option' }
          ]}
          value="enabled1"
        />
      </div>
    </div>
  )
};

// Error State
export const ErrorState: Story = {
  args: {
    name: 'error-radio',
    options: basicOptions,
    error: 'Please select an option to continue'
  }
};

// Single Radio Component
export const SingleRadioComponent: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Basic Single Radio</h4>
        <SingleRadio
          name="single"
          value="basic"
          label="Basic Option"
          checked
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">With Description</h4>
        <SingleRadio
          name="single-desc"
          value="premium"
          label="Premium Option"
          description="Includes advanced features and priority support"
          checked
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-3">Card Variant</h4>
        <SingleRadio
          name="single-card"
          value="card"
          label="Card Style"
          description="Enhanced visual emphasis with card styling"
          variant="card"
          checked
        />
      </div>
    </div>
  )
};

// Real-world Example
export const RealWorldExample: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Choose Your Plan</h3>
      
      <Radio
        name="subscription-plans"
        options={[
          {
            value: 'free',
            label: 'Free',
            description: 'Basic features for personal projects'
          },
          {
            value: 'pro',
            label: 'Pro - $9/month',
            description: 'Advanced features and priority support'
          },
          {
            value: 'team',
            label: 'Team - $29/month',
            description: 'Collaboration tools and team management'
          },
          {
            value: 'enterprise',
            label: 'Enterprise',
            description: 'Custom solutions and dedicated support',
            disabled: true
          }
        ]}
        variant="card"
        value="pro"
      />
      
      <div className="pt-4 border-t border-[var(--hive-border-default)]">
        <p className="text-sm text-gray-400">
          You can change your plan anytime in settings
        </p>
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
        <p className="text-sm text-gray-300">✅ Keyboard navigation (Tab, Arrow keys, Space)</p>
        <p className="text-sm text-gray-300">✅ Screen reader support with proper labeling</p>
        <p className="text-sm text-gray-300">✅ Focus indicators</p>
        <p className="text-sm text-gray-300">✅ Touch-friendly tap targets (44px minimum)</p>
        <p className="text-sm text-gray-300">✅ Proper ARIA roles and states</p>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4 space-y-3">
        <h4 className="font-medium text-[var(--hive-text-primary)]">Try keyboard navigation:</h4>
        <Radio
          name="a11y-demo"
          options={[
            { 
              value: 'option1', 
              label: 'First Option',
              description: 'Tab to focus, use arrow keys to navigate, Space to select'
            },
            { 
              value: 'option2', 
              label: 'Second Option',
              description: 'Screen reader announces label and description'
            },
            { 
              value: 'option3', 
              label: 'Third Option',
              description: 'Focus indicators meet WCAG contrast requirements'
            }
          ]}
          value="option1"
        />
      </div>
    </div>
  )
};