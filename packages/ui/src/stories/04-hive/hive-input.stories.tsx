import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveInput, 
  HiveToolNameInput, 
  HiveSpaceNameInput, 
  HiveSearchInput, 
  HivePasswordInput 
} from '../../components/hive-input';
import { Search, User, Mail, Lock, Wrench, Building } from 'lucide-react';

const meta: Meta<typeof HiveInput> = {
  title: '04-HIVE/Input',
  component: HiveInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE Input system with floating labels, liquid metal motion, and premium glass morphism aesthetics. Includes specialized variants for common use cases.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'disabled', 'premium', 'minimal']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl']
    },
    radius: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl']
    },
    floatingLabel: {
      control: 'boolean'
    },
    showCharacterCount: {
      control: 'boolean'
    },
    loading: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email'
  }
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveInput
        label="Default Input"
        placeholder="Standard input field"
        variant="default"
      />
      
      <HiveInput
        label="Premium Input"
        placeholder="Gold accent styling"
        variant="premium"
      />
      
      <HiveInput
        label="Success State"
        placeholder="Validation passed"
        variant="success"
        successText="Email format is valid"
      />
      
      <HiveInput
        label="Error State"
        placeholder="Something went wrong"
        variant="error"
        errorText="This field is required"
      />
      
      <HiveInput
        label="Minimal Style"
        placeholder="Clean and simple"
        variant="minimal"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All input variants showcasing different states and styling approaches'
      }
    }
  }
};

export const InputSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveInput
        label="Small Size"
        placeholder="Compact input"
        size="sm"
      />
      
      <HiveInput
        label="Default Size"
        placeholder="Standard input"
        size="default"
      />
      
      <HiveInput
        label="Large Size"
        placeholder="Prominent input"
        size="lg"
      />
      
      <HiveInput
        label="Extra Large"
        placeholder="Hero input field"
        size="xl"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input size variants for different UI contexts'
      }
    }
  }
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveInput
        label="Search"
        placeholder="Search tools and spaces..."
        leftIcon={<Search size={16} />}
        variant="premium"
      />
      
      <HiveInput
        label="User Profile"
        placeholder="Enter username"
        leftIcon={<User size={16} />}
        rightIcon={<Building size={16} />}
      />
      
      <HiveInput
        label="Email Address"
        placeholder="your.email@university.edu"
        leftIcon={<Mail size={16} />}
        type="email"
      />
      
      <HiveInput
        label="Secure Password"
        placeholder="Create a strong password"
        leftIcon={<Lock size={16} />}
        type="password"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Input fields with left and right icons for enhanced UX'
      }
    }
  }
};

export const FloatingLabels: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Floating Labels</h3>
        
        <HiveInput
          label="Tool Name"
          placeholder="Enter tool name"
          floatingLabel={true}
          variant="premium"
        />
        
        <HiveInput
          label="Description"
          placeholder="Describe your tool"
          floatingLabel={true}
          leftIcon={<Wrench size={16} />}
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Static Labels</h3>
        
        <HiveInput
          label="Tool Name"
          placeholder="Enter tool name"
          floatingLabel={false}
          variant="premium"
        />
        
        <HiveInput
          label="Description"
          placeholder="Describe your tool"
          floatingLabel={false}
          leftIcon={<Wrench size={16} />}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between floating labels and static labels'
      }
    }
  }
};

export const CharacterCounting: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveInput
        label="Tool Name"
        placeholder="Name your creation"
        showCharacterCount={true}
        maxLength={30}
        variant="premium"
        helperText="Choose a memorable name for your tool"
      />
      
      <HiveInput
        label="Short Description"
        placeholder="Brief description..."
        showCharacterCount={true}
        maxLength={100}
        leftIcon={<Tool size={16} />}
      />
      
      <HiveInput
        label="Space Name"
        placeholder="Create your space"
        showCharacterCount={true}
        maxLength={50}
        variant="premium"
        defaultValue="CS Study Group - Advanced Algorithms"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Character counting with visual feedback and limit warnings'
      }
    }
  }
};

export const PasswordInput: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveInput
        label="Current Password"
        placeholder="Enter current password"
        type="password"
        leftIcon={<Lock size={16} />}
      />
      
      <HiveInput
        label="New Password"
        placeholder="Create a secure password"
        type="password"
        variant="premium"
        helperText="Password must be at least 8 characters"
        showCharacterCount={true}
        maxLength={128}
      />
      
      <HiveInput
        label="Confirm Password"
        placeholder="Confirm your password"
        type="password"
        variant="success"
        successText="Passwords match!"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Password inputs with toggle visibility and validation states'
      }
    }
  }
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveInput
        label="Checking Availability"
        placeholder="username"
        loading={true}
        leftIcon={<User size={16} />}
        helperText="Verifying username availability..."
      />
      
      <HiveInput
        label="Processing Payment"
        placeholder="Card number"
        loading={true}
        variant="premium"
      />
      
      <HiveInput
        label="Saving Changes"
        placeholder="Tool description"
        loading={true}
        value="Advanced GPA calculator with predictive analytics"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states for async validation and processing'
      }
    }
  }
};

export const SpecializedInputs: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Tool Creation</h3>
        <HiveToolNameInput
          placeholder="GPA Calculator Pro"
          helperText="This will be visible to all users"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Space Creation</h3>
        <HiveSpaceNameInput
          placeholder="CS Study Hub"
          helperText="Choose a name that represents your community"
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Search</h3>
        <HiveSearchInput
          leftIcon={<Search size={16} />}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Security</h3>
        <HivePasswordInput
          label="Account Password"
          placeholder="Enter your password"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Pre-built specialized input components for common HIVE use cases'
      }
    }
  }
};

export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl">
      <HiveInput
        label="Email Address"
        placeholder="your.email@university.edu"
        type="email"
        variant="error"
        errorText="Please enter a valid .edu email address"
        leftIcon={<Mail size={16} />}
      />
      
      <HiveInput
        label="Tool Name"
        placeholder="Name your creation"
        variant="success"
        successText="Great name! This is available."
        value="Study Schedule Optimizer"
        showCharacterCount={true}
        maxLength={50}
      />
      
      <HiveInput
        label="Space Description"
        placeholder="Describe your space"
        helperText="Help others understand what your space is about"
        maxLength={200}
        showCharacterCount={true}
      />
      
      <HiveInput
        label="Disabled Field"
        placeholder="This field is disabled"
        variant="disabled"
        disabled={true}
        value="Cannot edit this field"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different validation states with contextual messaging'
      }
    }
  }
};

export const InteractiveDemo: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-[var(--hive-background-primary)] rounded-2xl">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-white mb-2">HIVE Tool Builder Form</h3>
        <p className="text-[var(--hive-text-secondary)]">Create your custom campus tool</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <HiveToolNameInput
            placeholder="GPA Tracker Pro"
          />
          
          <HiveInput
            label="Category"
            placeholder="Academic Tools"
            leftIcon={<Building size={16} />}
          />
          
          <HiveInput
            label="Description"
            placeholder="Describe what your tool does..."
            showCharacterCount={true}
            maxLength={150}
            helperText="This will appear in search results"
          />
        </div>
        
        <div className="space-y-4">
          <HiveInput
            label="Tags"
            placeholder="gpa, calculator, academic"
            helperText="Comma-separated tags for discovery"
          />
          
          <HiveInput
            label="Version"
            placeholder="1.0.0"
            defaultValue="1.0.0"
            variant="success"
            successText="Valid semantic version"
          />
          
          <HivePasswordInput
            label="Admin Password"
            placeholder="Secure your tool"
            helperText="Required for tool management"
          />
        </div>
      </div>
      
      <div className="pt-4 border-t border-[var(--hive-border-subtle)]">
        <HiveSearchInput 
          placeholder="Search existing tools for inspiration..."
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing HIVE inputs in a realistic tool creation form'
      }
    }
  }
};