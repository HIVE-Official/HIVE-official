import type { Meta, StoryObj } from '@storybook/react'
import { Search, User, Mail, Lock, Heart, Star } from 'lucide-react'
import { Input } from '../components/input'

const meta: Meta<typeof Input> = {
  title: '2025 AI/Modern Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modern chip-style input components with floating labels, smart states, and 2025 AI feel.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['chip', 'floating', 'search', 'minimal', 'accent', 'surface'],
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'loading'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const ChipStyle: Story = {
  args: {
    placeholder: 'Enter your message...',
    variant: 'chip',
  },
}

export const FloatingLabel: Story = {
  args: {
    label: 'Email Address',
    variant: 'floating',
    type: 'email',
  },
}

export const SearchInput: Story = {
  args: {
    placeholder: 'Search everything...',
    variant: 'search',
    icon: <Search className="w-4 h-4" />,
  },
}

export const WithIcons: Story = {
  args: {
    placeholder: 'Enter username',
    variant: 'chip',
    icon: <User className="w-4 h-4" />,
    rightIcon: <Star className="w-4 h-4" />,
  },
}

export const PasswordInput: Story = {
  args: {
    placeholder: 'Enter password',
    type: 'password',
    variant: 'chip',
    icon: <Lock className="w-4 h-4" />,
    showPasswordToggle: true,
  },
}

export const WithStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input 
        placeholder="Default state" 
        variant="chip"
        icon={<Mail className="w-4 h-4" />}
      />
      <Input 
        placeholder="Success state" 
        variant="chip"
        state="success"
        success="Email is available!"
        icon={<Mail className="w-4 h-4" />}
      />
      <Input 
        placeholder="Error state" 
        variant="chip"
        state="error"
        error="This field is required"
        icon={<Mail className="w-4 h-4" />}
      />
      <Input 
        placeholder="Loading state" 
        variant="chip"
        state="loading"
        loading={true}
        icon={<Mail className="w-4 h-4" />}
      />
    </div>
  ),
}

export const AccentVariant: Story = {
  args: {
    placeholder: 'Special accent input',
    variant: 'accent',
    icon: <Heart className="w-4 h-4" />,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input placeholder="Small" variant="chip" inputSize="sm" />
      <Input placeholder="Default" variant="chip" inputSize="default" />
      <Input placeholder="Large" variant="chip" inputSize="lg" />
      <Input placeholder="Extra Large" variant="chip" inputSize="xl" />
    </div>
  ),
}

export const WithHints: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input 
        label="Username"
        variant="floating"
        hint="Must be at least 3 characters"
      />
      <Input 
        label="Email"
        variant="floating" 
        type="email"
        success="Valid email format!"
      />
      <Input 
        label="Password"
        variant="floating"
        type="password"
        showPasswordToggle
        error="Password must contain special characters"
      />
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input placeholder="Chip variant" variant="chip" />
      <Input label="Floating variant" variant="floating" />
      <Input placeholder="Search variant" variant="search" />
      <Input placeholder="Minimal variant" variant="minimal" />
      <Input placeholder="Accent variant" variant="accent" />
      <Input placeholder="Surface variant" variant="surface" />
    </div>
  ),
}