import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../atomic/atoms/input';
import { Icon, Search, Mail, Lock, User } from '../../atomic/atoms';

const meta: Meta<typeof Input> = {
  title: '02-Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Input Atom

Core input component using 100% semantic tokens (var(--hive-*)).

## Variants
- **Default**: Standard border with focus states
- **Ghost**: Minimal with transparent background
- **Filled**: Subtle background fill

## Features
- Password visibility toggle
- Left/right icon support
- Error states with validation
- Helper text support
- Full responsive sizing

## Design Principles
- Uses only semantic tokens (no hardcoded colors)
- Apple-inspired generous border radius
- Subtle focus and hover states
- Built-in accessibility features
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'filled'],
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export default meta;

export const AllVariants: StoryObj = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">Input Variants</h3>
        <div className="space-y-4">
          <Input variant="default" placeholder="Default input" />
          <Input variant="ghost" placeholder="Ghost input" />
          <Input variant="filled" placeholder="Filled input" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">Input Sizes</h3>
        <div className="space-y-4">
          <Input inputSize="sm" placeholder="Small input" />
          <Input inputSize="md" placeholder="Medium input" />
          <Input inputSize="lg" placeholder="Large input" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">With Icons</h3>
        <div className="space-y-4">
          <Input 
            leftIcon={<Icon icon={Search} />}
            placeholder="Search spaces..."
          />
          <Input 
            leftIcon={<Icon icon={Mail} />}
            type="email"
            placeholder="Enter your email"
          />
          <Input 
            leftIcon={<Icon icon={User} />}
            placeholder="Username"
            rightIcon={<Icon icon={Lock} />}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-[var(--hive-text-primary)]">States & Validation</h3>
        <div className="space-y-4">
          <Input 
            label="Email Address"
            type="email"
            placeholder="you@university.edu"
            helperText="Use your university email"
          />
          <Input 
            label="Password"
            type="password"
            placeholder="Enter password"
            error="Password must be at least 8 characters"
          />
          <Input 
            label="Disabled Input"
            placeholder="Cannot edit this"
            disabled
          />
        </div>
      </div>
    </div>
  ),
};

export const Default: StoryObj<typeof Input> = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
  },
};

export const SearchInput: StoryObj<typeof Input> = {
  args: {
    leftIcon: <Icon icon={Search} />,
    placeholder: 'Search HIVE spaces...',
    variant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story: 'Typical search input with icon using ghost variant for minimal design.',
      },
    },
  },
};

export const LoginForm: StoryObj = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Input 
        label="Email"
        type="email"
        leftIcon={<Icon icon={Mail} />}
        placeholder="you@university.edu"
        helperText="Use your university email address"
      />
      <Input 
        label="Password"
        type="password"
        leftIcon={<Icon icon={Lock} />}
        placeholder="Enter your password"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example login form using semantic tokens and university context.',
      },
    },
  },
};