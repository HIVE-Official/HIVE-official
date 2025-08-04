import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../../atomic/atoms/input';
import { useState } from 'react';
import { 
  Search, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Globe, 
  Calendar, 
  CreditCard,
  Hash,
  MapPin,
  Building,
  GraduationCap,
  BookOpen,
  Users,
  Star,
  Filter,
  Tag,
  Clock,
  DollarSign
} from 'lucide-react';

const meta: Meta<typeof Input> = {
  title: '01-Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE base input component with semantic tokens, variants, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'filled'],
      description: 'Input visual variant',
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width input',
    },
    label: {
      control: 'text',
      description: 'Field label',
    },
    helperText: {
      control: 'text',
      description: 'Helper text',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
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

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
    helperText: 'This will be displayed on your profile',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Search Tools',
    placeholder: 'Search for study tools...',
    leftIcon: <Search className="w-4 h-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Website',
    placeholder: 'https://example.com',
    rightIcon: <Globe className="w-4 h-4" />,
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-md">
      <Input
        variant="default"
        label="Default Variant"
        placeholder="Default input style"
        helperText="Standard border with focus states"
      />
      
      <Input
        variant="ghost"
        label="Ghost Variant"
        placeholder="Minimal input style"
        helperText="Transparent until focused"
      />
      
      <Input
        variant="filled"
        label="Filled Variant"
        placeholder="Filled background style"
        helperText="Subtle background for forms"
      />
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-md">
      <Input
        inputSize="sm"
        label="Small Size"
        placeholder="Compact input for tight spaces"
        helperText="Height: 40px"
      />
      
      <Input
        inputSize="md"
        label="Medium Size (Default)"
        placeholder="Standard input for most use cases"
        helperText="Height: 48px"
      />
      
      <Input
        inputSize="lg"
        label="Large Size"
        placeholder="Larger input for prominent fields"
        helperText="Height: 56px"
      />
    </div>
  ),
};

// Input types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-md">
      <Input
        type="text"
        label="Text Input"
        placeholder="Enter any text"
        leftIcon={<User className="w-4 h-4" />}
      />
      
      <Input
        type="email"
        label="Email Input"
        placeholder="user@example.com"
        leftIcon={<Mail className="w-4 h-4" />}
      />
      
      <Input
        type="password"
        label="Password Input"
        placeholder="Enter password"
        leftIcon={<Lock className="w-4 h-4" />}
      />
      
      <Input
        type="tel"
        label="Phone Input"
        placeholder="(555) 123-4567"
        leftIcon={<Phone className="w-4 h-4" />}
      />
      
      <Input
        type="url"
        label="URL Input"
        placeholder="https://example.com"
        leftIcon={<Globe className="w-4 h-4" />}
      />
      
      <Input
        type="number"
        label="Number Input"
        placeholder="123"
        leftIcon={<Hash className="w-4 h-4" />}
      />
      
      <Input
        type="search"
        label="Search Input"
        placeholder="Search..."
        leftIcon={<Search className="w-4 h-4" />}
      />
    </div>
  ),
};

// Campus input scenarios
export const CampusInputScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Registration Form</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="First Name"
              placeholder="Enter your first name"
              leftIcon={<User className="w-4 h-4" />}
              helperText="As it appears on your student ID"
            />
            
            <Input
              label="Last Name"
              placeholder="Enter your last name"
              leftIcon={<User className="w-4 h-4" />}
              helperText="Family name or surname"
            />
            
            <Input
              type="email"
              label="University Email"
              placeholder="student@university.edu"
              leftIcon={<Mail className="w-4 h-4" />}
              helperText="Use your official university email"
            />
            
            <Input
              label="Student ID"
              placeholder="123456789"
              leftIcon={<Hash className="w-4 h-4" />}
              helperText="Your unique student identifier"
            />
            
            <Input
              label="Major"
              placeholder="Computer Science"
              leftIcon={<GraduationCap className="w-4 h-4" />}
              helperText="Your primary field of study"
            />
            
            <Input
              type="number"
              label="Graduation Year"
              placeholder="2025"
              leftIcon={<Calendar className="w-4 h-4" />}
              helperText="Expected graduation year"
            />
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Complete Registration
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Creation</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-4">
            <Input
              label="Group Name"
              placeholder="CS 101 Study Group"
              leftIcon={<Users className="w-4 h-4" />}
              helperText="Choose a descriptive name for your study group"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Course Code"
                placeholder="CS 101"
                leftIcon={<BookOpen className="w-4 h-4" />}
                helperText="Course identifier"
              />
              
              <Input
                type="number"
                label="Max Members"
                placeholder="15"
                leftIcon={<Users className="w-4 h-4" />}
                helperText="Maximum group size"
              />
            </div>
            
            <Input
              label="Meeting Location"
              placeholder="Library Room 204"
              leftIcon={<MapPin className="w-4 h-4" />}
              helperText="Where will you meet?"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="time"
                label="Meeting Time"
                leftIcon={<Clock className="w-4 h-4" />}
                helperText="Regular meeting time"
              />
              
              <Input
                label="Meeting Days"
                placeholder="Tuesdays & Thursdays"
                leftIcon={<Calendar className="w-4 h-4" />}
                helperText="When do you meet?"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Save as Draft
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Create Group
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Configuration</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Tool Name"
                placeholder="GPA Calculator Pro"
                leftIcon={<Star className="w-4 h-4" />}
                helperText="What should students call your tool?"
              />
              
              <Input
                label="Category"
                placeholder="Academic Planning"
                leftIcon={<Tag className="w-4 h-4" />}
                helperText="Help students find your tool"
              />
              
              <Input
                type="url"
                label="Documentation URL"
                placeholder="https://docs.example.com"
                leftIcon={<Globe className="w-4 h-4" />}
                helperText="Link to usage instructions"
              />
            </div>
            
            <div className="space-y-4">
              <Input
                label="Version"
                placeholder="1.0.0"
                leftIcon={<Hash className="w-4 h-4" />}
                helperText="Semantic version number"
              />
              
              <Input
                type="email"
                label="Support Email"
                placeholder="support@example.com"
                leftIcon={<Mail className="w-4 h-4" />}
                helperText="Where students can get help"
              />
              
              <Input
                label="Keywords"
                placeholder="gpa, grades, calculator"
                leftIcon={<Search className="w-4 h-4" />}
                helperText="Comma-separated search terms"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Test Configuration
            </button>
            <div className="space-x-3">
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Save Settings
              </button>
              <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
                Deploy Tool
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Search & Filter</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-4">
            <Input
              type="search"
              label="Search Courses"
              placeholder="Search by course name, code, or instructor..."
              leftIcon={<Search className="w-4 h-4" />}
              variant="filled"
              inputSize="lg"
              helperText="Find courses across all departments"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Department"
                placeholder="Computer Science"
                leftIcon={<Building className="w-4 h-4" />}
                variant="ghost"
              />
              
              <Input
                label="Instructor"
                placeholder="Dr. Smith"
                leftIcon={<User className="w-4 h-4" />}
                variant="ghost"
              />
              
              <Input
                type="number"
                label="Credits"
                placeholder="3"
                leftIcon={<Hash className="w-4 h-4" />}
                variant="ghost"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Minimum Rating"
                placeholder="4.0"
                leftIcon={<Star className="w-4 h-4" />}
                rightIcon={<span className="text-xs text-hive-text-tertiary">stars</span>}
                variant="ghost"
              />
              
              <Input
                label="Days Available"
                placeholder="MWF"
                leftIcon={<Calendar className="w-4 h-4" />}
                helperText="M, T, W, R, F, S, U"
                variant="ghost"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <span className="text-sm text-hive-text-secondary">347 courses found</span>
            <div className="space-x-2">
              <button className="px-3 py-1.5 text-sm border border-hive-border-default text-hive-text-primary rounded hover:bg-hive-interactive-hover transition-colors">
                Clear Filters
              </button>
              <button className="px-3 py-1.5 text-sm bg-hive-gold text-hive-background-primary rounded hover:bg-hive-gold/90 transition-colors">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Profile Settings</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-hive-text-primary">Personal Information</h4>
              
              <Input
                label="Display Name"
                placeholder="Alex Rodriguez"
                leftIcon={<User className="w-4 h-4" />}
                helperText="How others will see your name"
              />
              
              <Input
                label="Bio"
                placeholder="CS student passionate about AI"
                helperText="Brief description for your profile"
              />
              
              <Input
                type="url"
                label="Portfolio Website"
                placeholder="https://alexrodriguez.dev"
                leftIcon={<Globe className="w-4 h-4" />}
                helperText="Optional: showcase your work"
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-hive-text-primary">Academic Details</h4>
              
              <Input
                label="University"
                placeholder="State University"
                leftIcon={<Building className="w-4 h-4" />}
                helperText="Your current institution"
              />
              
              <Input
                type="number"
                label="Current GPA"
                placeholder="3.85"
                leftIcon={<Star className="w-4 h-4" />}
                helperText="Optional: display on profile"
              />
              
              <Input
                label="Interests"
                placeholder="Machine Learning, Web Development"
                leftIcon={<Tag className="w-4 h-4" />}
                helperText="Comma-separated interests"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Cancel Changes
            </button>
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive input states
export const InteractiveInputStates: Story = {
  render: () => {
    const [values, setValues] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (key: string, value: string) => {
      setValues(prev => ({ ...prev, [key]: value }));
      
      // Simple validation examples
      if (key === 'email' && value) {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setErrors(prev => ({ 
          ...prev, 
          email: isValid ? '' : 'Please enter a valid email address' 
        }));
      }
      
      if (key === 'password' && value) {
        const isValid = value.length >= 8;
        setErrors(prev => ({ 
          ...prev, 
          password: isValid ? '' : 'Password must be at least 8 characters' 
        }));
      }
      
      if (key === 'confirm' && value) {
        const isValid = value === values.password;
        setErrors(prev => ({ 
          ...prev, 
          confirm: isValid ? '' : 'Passwords do not match' 
        }));
      }
    };

    return (
      <div className="space-y-6 p-4 max-w-md">
        <h3 className="text-lg font-semibold text-hive-text-primary">Interactive Form Validation</h3>
        
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          leftIcon={<Mail className="w-4 h-4" />}
          value={values.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
          helperText={!errors.email ? 'We\'ll use this for important updates' : undefined}
        />
        
        <Input
          type="password"
          label="Password"
          placeholder="Create a password"
          leftIcon={<Lock className="w-4 h-4" />}
          value={values.password || ''}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          helperText={!errors.password ? 'Must be at least 8 characters' : undefined}
        />
        
        <Input
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          leftIcon={<Lock className="w-4 h-4" />}
          value={values.confirm || ''}
          onChange={(e) => handleChange('confirm', e.target.value)}
          error={errors.confirm}
          helperText={!errors.confirm && values.confirm ? 'Passwords match!' : undefined}
        />
        
        <div className="mt-6">
          <button 
            className="w-full px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={Object.values(errors).some(error => error) || !values.email || !values.password || !values.confirm}
          >
            Create Account
          </button>
        </div>
      </div>
    );
  },
};

// Input combinations
export const InputCombinations: Story = {
  render: () => (
    <div className="space-y-8 p-4 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Payment Form</h3>
        <div className="space-y-4 p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            leftIcon={<CreditCard className="w-4 h-4" />}
            variant="filled"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              placeholder="MM/YY"
              variant="filled"
            />
            
            <Input
              label="CVV"
              placeholder="123"
              type="password"
              variant="filled"
            />
          </div>
          
          <Input
            label="Cardholder Name"
            placeholder="Alex Rodriguez"
            leftIcon={<User className="w-4 h-4" />}
            variant="filled"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Address Form</h3>
        <div className="space-y-4 p-4 border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <Input
            label="Street Address"
            placeholder="123 Main Street"
            leftIcon={<MapPin className="w-4 h-4" />}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              placeholder="Anytown"
            />
            
            <Input
              label="State"
              placeholder="CA"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              placeholder="12345"
            />
            
            <Input
              label="Country"
              placeholder="United States"
              leftIcon={<Globe className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Input - Use controls to customize →',
    placeholder: 'Type here to test different configurations...',
    variant: 'default',
    inputSize: 'md',
    type: 'text',
    disabled: false,
    fullWidth: true,
    helperText: 'Use the controls panel to customize this input',
  },
};