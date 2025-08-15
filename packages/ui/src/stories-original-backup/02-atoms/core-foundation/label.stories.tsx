import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '../../../atomic/atoms/label';
import { Input } from '../../../atomic/atoms/input';
import { HiveCard } from '../../../components/hive-card';
import { Switch } from '../../../atomic/atoms/switch';
import { Checkbox } from '../../../atomic/atoms/checkbox';

const meta: Meta<typeof Label> = {
  title: '02-atoms/Core Foundation/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Label Component** - Accessible form labels with required indicators and flexible styling

Part of the HIVE Atomic Design System providing proper form field labeling and accessibility.

## Features
- **3 Variants**: Default block, inline flex, floating animation
- **3 Sizes**: sm, md, lg with appropriate text sizing  
- **Required Indicator**: Automatic asterisk with ARIA labeling
- **Accessibility**: Proper htmlFor association and screen reader support
- **Flexible Layout**: Block, inline, and floating positioning options
- **Disabled States**: Visual indication when form fields are disabled
- **Design Token Integration**: Uses HIVE semantic color tokens

## Use Cases
- **Form Fields**: Associate labels with input elements
- **Required Fields**: Indicate mandatory form fields with asterisk
- **Inline Elements**: Label checkboxes, switches, and radio buttons
- **Floating Labels**: Animated labels for modern input styling
- **Accessibility**: Ensure proper screen reader support

## Accessibility Notes
- Always use htmlFor to associate with form elements
- Required indicator includes aria-label for screen readers
- Supports disabled state for better UX clarity
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID of the form element this label is associated with'
    },
    required: {
      control: 'boolean',
      description: 'Show required asterisk indicator'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Label text size'
    },
    variant: {
      control: 'select',
      options: ['default', 'inline', 'floating'],
      description: 'Label layout variant'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state styling'
    },
    children: {
      control: 'text',
      description: 'Label text content'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Label
export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email'
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Default (Block)</h4>
        <Label htmlFor="default-input">Full Name</Label>
        <Input id="default-input" placeholder="Enter your full name" />
      </div>
      
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Inline</h4>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" variant="inline">
            I agree to the terms and conditions
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="notifications" />
          <Label htmlFor="notifications" variant="inline">
            Enable notifications
          </Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Floating (CSS-only)</h4>
        <div className="relative">
          <Input 
            id="floating-input" 
            placeholder=" " 
            className="peer"
          />
          <Label 
            htmlFor="floating-input" 
            variant="floating"
            className="bg-gray-900 px-1"
          >
            Floating Label
          </Label>
        </div>
      </div>
    </div>
  )
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label size="sm" htmlFor="small-input">Small Label</Label>
        <Input id="small-input" placeholder="Small input field" inputSize="sm" />
      </div>
      
      <div className="space-y-2">
        <Label size="md" htmlFor="medium-input">Medium Label</Label>
        <Input id="medium-input" placeholder="Medium input field" inputSize="md" />
      </div>
      
      <div className="space-y-2">
        <Label size="lg" htmlFor="large-input">Large Label</Label>
        <Input id="large-input" placeholder="Large input field" inputSize="lg" />
      </div>
    </div>
  )
};

// Required Labels
export const RequiredLabels: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="required-email" required>Email Address</Label>
        <Input 
          id="required-email" 
          type="email" 
          placeholder="your@email.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="required-password" required>Password</Label>
        <Input 
          id="required-password" 
          type="password" 
          placeholder="Create a strong password"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="optional-phone">Phone Number</Label>
        <Input 
          id="optional-phone" 
          type="tel" 
          placeholder="+1 (555) 000-0000"
        />
        <p className="text-xs text-gray-400">Optional field</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="required-terms" required />
        <Label htmlFor="required-terms" variant="inline" required>
          I agree to the privacy policy
        </Label>
      </div>
    </div>
  )
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="disabled-input" disabled>Disabled Field</Label>
        <Input 
          id="disabled-input" 
          placeholder="Cannot edit this field"
          disabled
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="disabled-required" disabled required>
          Disabled Required Field
        </Label>
        <Input 
          id="disabled-required" 
          placeholder="Disabled and required"
          disabled
          required
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checkbox" disabled />
        <Label htmlFor="disabled-checkbox" variant="inline" disabled>
          Disabled checkbox option
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch id="disabled-switch" disabled />
        <Label htmlFor="disabled-switch" variant="inline" disabled>
          Disabled switch option
        </Label>
      </div>
    </div>
  )
};

// Form Examples
export const FormExamples: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-lg">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Contact Information</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name" required>First Name</Label>
          <Input id="first-name" placeholder="John" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="last-name" required>Last Name</Label>
          <Input id="last-name" placeholder="Doe" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email-form" required>Email Address</Label>
        <Input 
          id="email-form" 
          type="email" 
          placeholder="john.doe@example.com"
        />
        <p className="text-xs text-gray-400">
          We'll use this for account verification
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone-form">Phone Number</Label>
        <Input 
          id="phone-form" 
          type="tel" 
          placeholder="+1 (555) 000-0000"
        />
        <p className="text-xs text-gray-400">
          Optional - for account recovery
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter" variant="inline">
            Subscribe to our newsletter
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="terms-form" required />
          <Label htmlFor="terms-form" variant="inline" required>
            I agree to the terms of service
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch id="marketing" />
          <Label htmlFor="marketing" variant="inline">
            Allow marketing communications
          </Label>
        </div>
      </div>
      
      <div className="flex gap-3 pt-4">
        <button className="px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg">
          Save Contact
        </button>
      </div>
    </HiveCard>
  )
};

// Floating Label Demo
export const FloatingLabelDemo: Story = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Floating Labels</h4>
        <p className="text-sm text-gray-400">
          Click in the fields to see the floating animation
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="relative">
          <Input 
            id="floating-email" 
            type="email"
            placeholder=" " 
            className="peer"
          />
          <Label 
            htmlFor="floating-email" 
            variant="floating"
            className="bg-gray-900 px-1"
          >
            Email Address
          </Label>
        </div>
        
        <div className="relative">
          <Input 
            id="floating-password" 
            type="password"
            placeholder=" " 
            className="peer"
          />
          <Label 
            htmlFor="floating-password" 
            variant="floating"
            className="bg-gray-900 px-1"
            required
          >
            Password
          </Label>
        </div>
        
        <div className="relative">
          <Input 
            id="floating-company" 
            placeholder=" " 
            className="peer"
            defaultValue="Acme Corp"
          />
          <Label 
            htmlFor="floating-company" 
            variant="floating"
            className="bg-gray-900 px-1"
          >
            Company Name
          </Label>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Floating labels require careful CSS setup with peer classes. 
          The input needs <code>placeholder=" "</code> (single space) to work with the 
          <code>peer-placeholder-shown</code> modifier.
        </p>
      </div>
    </div>
  )
};

// Label Hierarchy
export const LabelHierarchy: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div className="space-y-4">
        <Label size="lg" className="text-[var(--hive-text-primary)] font-semibold">
          Section Title (Large Label)
        </Label>
        <p className="text-gray-400">
          Large labels can be used for section headings and major form groups.
        </p>
      </div>
      
      <div className="space-y-4">
        <Label size="md" className="text-[var(--hive-text-primary)] font-medium">
          Subsection Title (Medium Label)
        </Label>
        <p className="text-gray-400">
          Medium labels are the default size for most form fields and content labels.
        </p>
      </div>
      
      <div className="space-y-4">
        <Label size="sm" className="text-gray-300">
          Detail Label (Small Label)
        </Label>
        <p className="text-gray-400">
          Small labels work well for secondary information, metadata, and compact forms.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-4">
          <Label size="lg">Personal Information</Label>
          
          <div className="space-y-2">
            <Label htmlFor="demo-name" required>Full Name</Label>
            <Input id="demo-name" placeholder="Enter your name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="demo-email" required>Email</Label>
            <Input id="demo-email" type="email" placeholder="your@email.com" />
          </div>
        </div>
        
        <div className="space-y-4">
          <Label size="lg">Preferences</Label>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch id="demo-notifications" />
              <Label htmlFor="demo-notifications" variant="inline">
                Email notifications
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="demo-newsletter" />
              <Label htmlFor="demo-newsletter" variant="inline">
                Newsletter subscription
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="space-y-4 max-w-md">
      <Label {...args} />
      {args.htmlFor && (
        <Input 
          id={args.htmlFor} 
          placeholder="Associated input field"
        />
      )}
    </div>
  ),
  args: {
    children: 'Interactive Label',
    htmlFor: 'interactive-input',
    required: false,
    size: 'md',
    variant: 'default',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different label configurations including size, variant, required state, and disabled styling.'
      }
    }
  }
};