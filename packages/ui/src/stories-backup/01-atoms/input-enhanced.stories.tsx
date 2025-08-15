import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../atomic/atoms/input-enhanced';
import { Search, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: '01-Atoms/Input Enhanced',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE enhanced input component with validation, icons, and campus-specific styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'filled', 'underlined'],
      description: 'Input variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    state: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error'],
      description: 'Validation state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled input',
  },
};

export const Underlined: Story = {
  args: {
    variant: 'underlined',
    placeholder: 'Underlined input',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

// States
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input 
        state="default" 
        placeholder="Default state"
        helperText="Enter your information"
      />
      <Input 
        state="success" 
        placeholder="Success state"
        value="Valid input"
        helperText="Great! This looks good."
      />
      <Input 
        state="warning" 
        placeholder="Warning state"
        value="Questionable input"
        helperText="This might need attention"
      />
      <Input 
        state="error" 
        placeholder="Error state"
        value="Invalid input"
        helperText="This field is required"
      />
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input 
        leftIcon={<Search className="w-4 h-4" />}
        placeholder="Search students, spaces, tools..."
      />
      <Input 
        leftIcon={<User className="w-4 h-4" />}
        placeholder="Enter your handle"
      />
      <Input 
        leftIcon={<Mail className="w-4 h-4" />}
        placeholder="student@university.edu"
        type="email"
      />
      <Input 
        leftIcon={<Lock className="w-4 h-4" />}
        rightIcon={<Eye className="w-4 h-4" />}
        placeholder="Password"
        type="password"
      />
    </div>
  ),
};

// Password input with toggle
export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <div className="w-80">
        <Input
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 hover:bg-hive-background-tertiary rounded"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          helperText="Click the eye icon to toggle visibility"
        />
      </div>
    );
  },
};

// Campus form fields
export const CampusFields: Story = {
  render: () => (
    <div className="space-y-6 w-96 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Student Registration</h3>
        <div className="space-y-4">
          <Input
            label="University Email"
            leftIcon={<Mail className="w-4 h-4" />}
            placeholder="your.name@university.edu"
            type="email"
            required
            helperText="Use your official university email"
          />
          <Input
            label="Student Handle"
            leftIcon={<User className="w-4 h-4" />}
            placeholder="johndoe2024"
            helperText="This will be your unique identifier on HIVE"
          />
          <Input
            label="Major"
            placeholder="Computer Science"
            helperText="Your primary field of study"
          />
          <Input
            label="Graduation Year"
            placeholder="2025"
            type="number"
            min="2024"
            max="2030"
          />
        </div>
      </div>
    </div>
  ),
};

// Space creation form
export const SpaceCreation: Story = {
  render: () => (
    <div className="space-y-6 w-96 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Create Study Space</h3>
        <div className="space-y-4">
          <Input
            label="Space Name"
            placeholder="CS 101 Study Group"
            required
            helperText="Choose a descriptive name for your space"
          />
          <Input
            label="Meeting Location"
            placeholder="Library Room 205"
            helperText="Where do you usually meet?"
          />
          <Input
            label="Invite Code"
            placeholder="STUDY2024"
            helperText="Optional: Create a custom invite code"
          />
        </div>
      </div>
    </div>
  ),
};

// Tool builder inputs
export const ToolBuilder: Story = {
  render: () => (
    <div className="space-y-6 w-96 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Build Your Tool</h3>
        <div className="space-y-4">
          <Input
            label="Tool Name"
            placeholder="GPA Calculator Pro"
            required
            helperText="What should we call your tool?"
          />
          <Input
            label="Version"
            placeholder="1.0.0"
            helperText="Starting version for your tool"
          />
          <Input
            label="Tags"
            placeholder="academic, calculator, grades"
            helperText="Comma-separated tags to help others find your tool"
          />
        </div>
      </div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Input Variants</h3>
        <div className="grid gap-4 w-80">
          <Input variant="default" placeholder="Default variant" />
          <Input variant="filled" placeholder="Filled variant" />
          <Input variant="underlined" placeholder="Underlined variant" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Input Sizes</h3>
        <div className="space-y-3 w-80">
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input" />
          <Input size="lg" placeholder="Large input" />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">With Labels & Helper Text</h3>
        <div className="space-y-4 w-80">
          <Input
            label="Required Field"
            placeholder="This field is required"
            required
            helperText="Please fill out this field"
          />
          <Input
            label="Optional Field"
            placeholder="This field is optional"
            helperText="You can skip this if you want"
          />
        </div>
      </div>
    </div>
  ),
};

// Responsive showcase
export const Responsive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <div className="p-4 space-y-4">
      <Input
        leftIcon={<Search className="w-4 h-4" />}
        placeholder="Search campus..."
        className="w-full"
      />
      <Input
        label="Quick Join"
        placeholder="Enter space code"
        className="w-full"
      />
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setIsValid(newValue.length >= 3);
    };
    
    return (
      <div className="w-80">
        <Input
          label="Interactive Validation"
          value={value}
          onChange={handleChange}
          state={isValid ? 'success' : 'error'}
          placeholder="Type at least 3 characters"
          helperText={isValid ? 'Looking good!' : 'Needs at least 3 characters'}
        />
      </div>
    );
  },
};