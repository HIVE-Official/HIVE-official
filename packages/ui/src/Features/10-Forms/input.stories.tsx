import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../atomic/atoms/input';
import { Label } from '../../atomic/atoms/label';
import { Button } from '../../atomic/atoms/button';
import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

/**
 * # Input (shadcn/ui)
 *
 * **Foundation Component** - Accessible form input built on native HTML input
 *
 * ## Features
 * - ✅ Full keyboard navigation and form integration
 * - ✅ All native HTML input types supported
 * - ✅ Pair with Label for accessibility
 * - ✅ Minimal styling, maximum flexibility
 * - ✅ WCAG contrast compliant
 *
 * ## Usage Guidelines
 * - Always pair with Label component
 * - Use appropriate type attribute
 * - Include placeholder for better UX
 * - Show error states with aria-invalid
 */
const meta = {
  title: '10-Forms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'shadcn/ui Input component - minimalist form input with focus states. Always pair with Label for accessibility. Supports all native HTML input types and attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'number', 'tel', 'url'],
      description: 'HTML input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic input with placeholder
 */
export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter your name...',
  },
};

/**
 * With label (proper accessibility pattern)
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="name@buffalo.edu" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Always pair Input with Label for accessibility. Use htmlFor to connect them.',
      },
    },
  },
};

/**
 * Different input types
 */
export const InputTypes: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="text">Text</Label>
        <Input id="text" type="text" placeholder="Enter text..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="name@buffalo.edu" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <Input id="search" type="search" placeholder="Search spaces..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="0" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input supports all native HTML types. Browser provides appropriate keyboard on mobile.',
      },
    },
  },
};

/**
 * With icon (manual composition)
 */
export const WithIcon: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search-icon">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="search-icon" placeholder="Search spaces..." className="pl-10" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-icon">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input id="email-icon" type="email" placeholder="name@buffalo.edu" className="pl-10" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icon composition using relative positioning. Add `pl-10` to Input for left icon spacing.',
      },
    },
  },
};

/**
 * Password toggle pattern
 */
export const PasswordToggle: Story = {
  render: function PasswordToggleComponent() {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-full max-w-sm space-y-2">
        <Label htmlFor="password-toggle">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="password-toggle"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Password toggle using state. Add `pl-10 pr-10` for left and right icons.',
      },
    },
  },
};

/**
 * States (default, focus, disabled)
 */
export const States: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label>Default</Label>
        <Input placeholder="Click to focus..." />
      </div>
      <div className="space-y-2">
        <Label>Disabled</Label>
        <Input disabled placeholder="Disabled input" />
      </div>
      <div className="space-y-2">
        <Label>Read-only</Label>
        <Input readOnly value="Read-only value" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input states. Focus shows gold ring. Disabled has 50% opacity.',
      },
    },
  },
};

/**
 * With helper text and error
 */
export const WithHelperText: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe" />
        <p className="text-xs text-muted-foreground">Choose a unique username for your profile</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email-error" className="text-destructive">
          Email
        </Label>
        <Input
          id="email-error"
          type="email"
          placeholder="name@buffalo.edu"
          className="border-destructive focus-visible:ring-destructive"
          aria-invalid="true"
        />
        <p className="text-xs text-destructive">Please use your @buffalo.edu email address</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Helper text below input for guidance. Error state with red border and text using `border-destructive` and `text-destructive`.',
      },
    },
  },
};

/**
 * Full form example
 */
export const FormExample: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-name">Full Name</Label>
          <Input id="form-name" placeholder="John Doe" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="form-email">Email</Label>
          <Input id="form-email" type="email" placeholder="name@buffalo.edu" required />
          <p className="text-xs text-muted-foreground">Use your university email</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="form-password">Password</Label>
          <Input id="form-password" type="password" placeholder="••••••••" required />
          <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
        </div>

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete form example with labels, helper text, and submit button.',
      },
    },
  },
};

/**
 * Responsive full-width
 */
export const Responsive: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-4">
      <div className="space-y-2">
        <Label htmlFor="search-mobile">Search Spaces</Label>
        <Input id="search-mobile" type="search" placeholder="ACM Club, Gaming..." />
      </div>
      <Button className="w-full">Search</Button>
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Full-width input for mobile. Input automatically fits container width.',
      },
    },
  },
};

/**
 * Dark theme (HIVE default)
 */
export const DarkTheme: Story = {
  render: () => (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="dark-input">Email Address</Label>
      <Input id="dark-input" type="email" placeholder="name@buffalo.edu" />
      <p className="text-xs text-muted-foreground">Minimal border (rgba 0.12) for subtle depth</p>
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
    docs: {
      description: {
        story: 'Input optimized for true black backgrounds. High contrast text (#FFF on #171717).',
      },
    },
  },
};
