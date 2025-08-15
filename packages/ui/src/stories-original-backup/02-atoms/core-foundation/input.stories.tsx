import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../../atomic/atoms/input';
import { HiveCard } from '../../../components/hive-card';
import { 
  Search, 
  Mail, 
  User, 
  Lock, 
  Phone, 
  CreditCard, 
  Calendar,
  MapPin,
  DollarSign,
  Globe
} from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: '02-atoms/Core Foundation/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Input Component** - A clean, PRD-aligned text input with Vercel-inspired styling

Part of the HIVE Atomic Design System with enhanced accessibility and consistent interactions.

## Features
- **3 Variants**: Default, ghost, filled with subtle styling differences
- **3 Sizes**: sm (32px), md (10), lg (48px) with proper touch targets
- **Icon Support**: Leading and trailing icon positions
- **Password Toggle**: Built-in show/hide functionality for password fields
- **Error States**: Visual error indicators with helper text
- **Helper Text**: Additional context and guidance
- **Full Accessibility**: WCAG 2.1 AA compliant with proper focus management
- **PRD-Aligned**: Clean, Vercel-inspired design with 16px radius

## Design Token Usage
Uses semantic color tokens with focus on blue-400 for interactions and proper contrast ratios.

## Input Types Supported
- **Text**: Standard text input
- **Email**: Email validation styling
- **Password**: Built-in toggle visibility
- **Number**: Numeric input with proper formatting
- **Tel**: Phone number input
- **URL**: Website address input
- **Search**: Search input with appropriate styling
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'filled'],
      description: 'Visual style variant'
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size (affects height and padding)'
    },
    label: {
      control: 'text',
      description: 'Label text above the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input'
    },
    error: {
      control: 'text',
      description: 'Error message (overrides helperText)'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expand to full container width'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Input
export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name'
  }
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Default Variant"
        placeholder="Clean border styling"
        variant="default"
        helperText="Standard input with border"
      />
      
      <Input
        label="Ghost Variant"
        placeholder="Minimal styling"
        variant="ghost"
        helperText="Borderless until focused"
      />
      
      <Input
        label="Filled Variant"
        placeholder="Background filled"
        variant="filled"
        helperText="Solid background styling"
      />
    </div>
  )
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Small (32px)"
        placeholder="Compact input"
        inputSize="sm"
        helperText="For dense layouts"
      />
      
      <Input
        label="Medium (10)"
        placeholder="Standard input"
        inputSize="md"
        helperText="Default size for most use cases"
      />
      
      <Input
        label="Large (48px)"
        placeholder="Spacious input"
        inputSize="lg"
        helperText="Enhanced touch targets"
      />
    </div>
  )
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Search"
        placeholder="Search anything..."
        leftIcon={<Search className="w-4 h-4" />}
        type="search"
      />
      
      <Input
        label="Email"
        placeholder="your@email.com"
        leftIcon={<Mail className="w-4 h-4" />}
        type="email"
      />
      
      <Input
        label="Profile"
        placeholder="Username"
        leftIcon={<User className="w-4 h-4" />}
        rightIcon={<Globe className="w-4 h-4" />}
      />
      
      <Input
        label="Amount"
        placeholder="0.00"
        leftIcon={<DollarSign className="w-4 h-4" />}
        type="number"
      />
    </div>
  )
};

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Text Input"
        placeholder="Enter text"
        type="text"
        helperText="Standard text input"
      />
      
      <Input
        label="Email Address"
        placeholder="user@example.com"
        type="email"
        leftIcon={<Mail className="w-4 h-4" />}
        helperText="Email validation styling"
      />
      
      <Input
        label="Password"
        placeholder="Enter password"
        type="password"
        leftIcon={<Lock className="w-4 h-4" />}
        helperText="Built-in show/hide toggle"
      />
      
      <Input
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        type="tel"
        leftIcon={<Phone className="w-4 h-4" />}
        helperText="Phone number input"
      />
      
      <Input
        label="Website URL"
        placeholder="https://example.com"
        type="url"
        leftIcon={<Globe className="w-4 h-4" />}
        helperText="URL validation styling"
      />
      
      <Input
        label="Credit Card"
        placeholder="1234 5678 9012 3456"
        type="text"
        leftIcon={<CreditCard className="w-4 h-4" />}
        helperText="Formatted number input"
      />
    </div>
  )
};

// Error States
export const ErrorStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Required Field"
        placeholder="This field is required"
        error="This field cannot be empty"
        value=""
      />
      
      <Input
        label="Invalid Email"
        placeholder="Enter valid email"
        type="email"
        leftIcon={<Mail className="w-4 h-4" />}
        error="Please enter a valid email address"
        value="invalid-email"
      />
      
      <Input
        label="Password Too Short"
        placeholder="Minimum 8 characters"
        type="password"
        leftIcon={<Lock className="w-4 h-4" />}
        error="Password must be at least 8 characters"
        value="123"
      />
      
      <Input
        label="Invalid Phone"
        placeholder="+1 (555) 000-0000"
        type="tel"
        leftIcon={<Phone className="w-4 h-4" />}
        error="Please enter a valid phone number"
        value="invalid"
      />
    </div>
  )
};

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Disabled Empty"
        placeholder="Cannot edit this field"
        disabled
        helperText="This field is read-only"
      />
      
      <Input
        label="Disabled with Value"
        value="Preset value"
        disabled
        leftIcon={<User className="w-4 h-4" />}
        helperText="Field contains preset data"
      />
      
      <Input
        label="Disabled Password"
        type="password"
        value="hiddenpassword"
        disabled
        leftIcon={<Lock className="w-4 h-4" />}
        helperText="Password field is locked"
      />
    </div>
  )
};

// Password Functionality
export const PasswordFunctionality: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        label="Current Password"
        placeholder="Enter current password"
        type="password"
        leftIcon={<Lock className="w-4 h-4" />}
        helperText="Click the eye icon to toggle visibility"
      />
      
      <Input
        label="New Password"
        placeholder="Create new password"
        type="password"
        leftIcon={<Lock className="w-4 h-4" />}
        helperText="Must be at least 8 characters with symbols"
      />
      
      <Input
        label="Confirm Password"
        placeholder="Confirm new password"
        type="password"
        leftIcon={<Lock className="w-4 h-4" />}
        helperText="Must match the password above"
      />
    </div>
  )
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-lg">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Create Account</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="John"
          leftIcon={<User className="w-4 h-4" />}
        />
        
        <Input
          label="Last Name"
          placeholder="Doe"
          leftIcon={<User className="w-4 h-4" />}
        />
      </div>
      
      <Input
        label="Email Address"
        placeholder="user@example.com"
        type="email"
        leftIcon={<Mail className="w-4 h-4" />}
        helperText="We'll use this for account verification"
      />
      
      <Input
        label="Phone Number"
        placeholder="+1 (555) 000-0000"
        type="tel"
        leftIcon={<Phone className="w-4 h-4" />}
        helperText="Optional - for account recovery"
      />
      
      <Input
        label="Password"
        placeholder="Create a strong password"
        type="password"
        leftIcon={<Lock className="w-4 h-4" />}
        helperText="At least 8 characters with symbols and numbers"
      />
      
      <Input
        label="Company (Optional)"
        placeholder="Acme Corporation"
        variant="ghost"
        helperText="Help us customize your experience"
      />
      
      <div className="flex gap-3 pt-4">
        <button className="px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg">
          Cancel
        </button>
        <button className="px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg">
          Create Account
        </button>
      </div>
    </HiveCard>
  )
};

// Search Variations
export const SearchVariations: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <Input
        placeholder="Search users, spaces, tools..."
        type="search"
        leftIcon={<Search className="w-4 h-4" />}
        variant="ghost"
        inputSize="lg"
      />
      
      <Input
        label="Filter by Location"
        placeholder="Enter city or region"
        leftIcon={<MapPin className="w-4 h-4" />}
        variant="filled"
      />
      
      <Input
        label="Date Range"
        placeholder="Select date"
        type="date"
        leftIcon={<Calendar className="w-4 h-4" />}
      />
    </div>
  )
};

// Width Variations
export const WidthVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Full Width (Default)</h4>
        <Input
          placeholder="Expands to container width"
          fullWidth={true}
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Natural Width</h4>
        <Input
          placeholder="Natural sizing"
          fullWidth={false}
        />
      </div>
    </div>
  )
};

// Accessibility Demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Accessibility Features</h3>
      
      <div className="space-y-2">
        <p className="text-sm text-gray-300">✅ Keyboard navigation (Tab, Shift+Tab)</p>
        <p className="text-sm text-gray-300">✅ Screen reader support with proper labels</p>
        <p className="text-sm text-gray-300">✅ Focus indicators with blue outline</p>
        <p className="text-sm text-gray-300">✅ Error announcements with aria-invalid</p>
        <p className="text-sm text-gray-300">✅ Helper text associations</p>
        <p className="text-sm text-gray-300">✅ Password toggle accessibility</p>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-[var(--hive-text-primary)]">Accessible Form</h4>
        
        <Input
          label="Username"
          placeholder="Enter username"
          leftIcon={<User className="w-4 h-4" />}
          helperText="Must be unique and at least 3 characters"
          aria-describedby="username-help"
        />
        
        <Input
          label="Email (Required)"
          placeholder="your@email.com"
          type="email"
          leftIcon={<Mail className="w-4 h-4" />}
          error="Please enter a valid email address"
          aria-invalid="true"
          aria-describedby="email-error"
        />
        
        <Input
          label="Password"
          placeholder="Create password"
          type="password"
          leftIcon={<Lock className="w-4 h-4" />}
          helperText="Password visibility can be toggled with the eye icon"
          aria-describedby="password-help"
        />
        
        <p className="text-xs text-gray-400">
          All fields support keyboard navigation and screen reader announcements
        </p>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-md">
      <Input {...args} />
    </div>
  ),
  args: {
    label: 'Interactive Demo',
    placeholder: 'Customize using controls below',
    variant: 'default',
    inputSize: 'md',
    type: 'text',
    fullWidth: true,
    disabled: false,
    helperText: 'Use the controls below to test different configurations'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different input configurations and see how they affect the behavior and appearance.'
      }
    }
  }
};