import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { Search, Mail, Lock, Eye, EyeOff, User, Phone, Calendar } from 'lucide-react';
import React, { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Design System/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE input component with gold focus states and comprehensive validation styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['chip', 'floating', 'search', 'minimal', 'accent', 'surface'],
      description: 'Input variant following HIVE design system',
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Input size variants',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'loading'],
      description: 'Input validation state',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time'],
      description: 'HTML input type',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

// Basic Input Variants
export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
    type: 'text',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    placeholder: 'Accent input with gold border',
  },
};

export const Outline: Story = {
  args: {
    variant: 'chip',
    placeholder: 'Outline input with enhanced border',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'minimal',
    placeholder: 'Ghost input with minimal styling',
  },
};

export const Surface: Story = {
  args: {
    variant: 'surface',
    placeholder: 'Surface input with elevated background',
  },
};

// Size Variations
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="default" placeholder="Default input" />
      <Input inputSize="lg" placeholder="Large input" />
      <Input inputSize="xl" placeholder="Extra large input" />
    </div>
  ),
};

// State Variations
export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="default-state">Default State</Label>
        <Input id="default-state" placeholder="Normal input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="error-state">Error State</Label>
        <Input id="error-state" state="error" placeholder="Error input" />
        <p className="text-sm text-red-500">This field is required</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="success-state">Success State</Label>
        <Input id="success-state" state="success" placeholder="Success input" />
        <p className="text-sm text-green-500">Looks good!</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="warning-state">Warning State</Label>
        <Input id="warning-state" state="error" placeholder="Warning input" />
        <p className="text-sm text-amber-500">Double check this field</p>
      </div>
    </div>
  ),
};

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="text-input">Text Input</Label>
        <Input id="text-input" type="text" placeholder="Enter text" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-input">Email Input</Label>
        <Input id="email-input" type="email" placeholder="Enter email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-input">Password Input</Label>
        <Input id="password-input" type="password" placeholder="Enter password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number-input">Number Input</Label>
        <Input id="number-input" type="number" placeholder="Enter number" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tel-input">Phone Input</Label>
        <Input id="tel-input" type="tel" placeholder="Enter phone" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="url-input">URL Input</Label>
        <Input id="url-input" type="url" placeholder="Enter URL" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search-input">Search Input</Label>
        <Input id="search-input" type="search" placeholder="Search..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date-input">Date Input</Label>
        <Input id="date-input" type="date" />
      </div>
    </div>
  ),
};

// Inputs with Icons (Custom Implementation)
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="search-with-icon">Search with Icon</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <Input id="search-with-icon" placeholder="Search..." className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-with-icon">Email with Icon</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <Input id="email-with-icon" type="email" placeholder="Enter email" className="pl-10" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-with-icon">Password with Icon</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <Input id="password-with-icon" type="password" placeholder="Enter password" className="pl-10" />
        </div>
      </div>
    </div>
  ),
};

// Campus Forms Examples
export const CampusFormExamples: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Student Registration</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student-name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <Input id="student-name" placeholder="Enter your full name" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-email">University Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <Input id="student-email" type="email" placeholder="your.email@university.edu" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="student-phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <Input id="student-phone" type="tel" placeholder="(555) 123-4567" className="pl-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">Event Registration</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-date">Event Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
              <Input id="event-date" type="date" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ticket-code">Ticket Code</Label>
            <Input id="ticket-code" placeholder="Enter ticket code" variant="accent" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive Password Input
export const InteractivePassword: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <div className="space-y-2 w-80">
        <Label htmlFor="interactive-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            id="interactive-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted hover:text-accent transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-sm text-muted">Must be at least 8 characters</p>
      </div>
    );
  },
};

// Disabled and ReadOnly States
export const SpecialStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="disabled-input">Disabled Input</Label>
        <Input id="disabled-input" disabled placeholder="This is disabled" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="readonly-input">Read-Only Input</Label>
        <Input id="readonly-input" readOnly value="This is read-only" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="required-input">Required Input</Label>
        <Input id="required-input" required placeholder="This field is required" />
      </div>
    </div>
  ),
};

// Grocery Store Showcase
export const GroceryShowcase: Story = {
  name: "🛒 Input Grocery Store",
  render: () => (
    <div className="space-y-8 p-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">HIVE Input Grocery Store</h2>
        <p className="text-gray-400">Pick your perfect input variant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Default Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Default</h3>
          <div className="space-y-2">
            <Input inputSize="sm" placeholder="Small default" />
            <Input placeholder="Default size" />
            <Input inputSize="lg" placeholder="Large default" />
          </div>
        </div>

        {/* Accent Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Accent (Gold)</h3>
          <div className="space-y-2">
            <Input variant="accent" inputSize="sm" placeholder="Small accent" />
            <Input variant="accent" placeholder="Default accent" />
            <Input variant="accent" inputSize="lg" placeholder="Large accent" />
          </div>
        </div>

        {/* Outline Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Outline</h3>
          <div className="space-y-2">
            <Input variant="chip" inputSize="sm" placeholder="Small outline" />
            <Input variant="chip" placeholder="Default outline" />
            <Input variant="chip" inputSize="lg" placeholder="Large outline" />
          </div>
        </div>

        {/* Ghost Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Ghost</h3>
          <div className="space-y-2">
            <Input variant="minimal" inputSize="sm" placeholder="Small ghost" />
            <Input variant="minimal" placeholder="Default ghost" />
            <Input variant="minimal" inputSize="lg" placeholder="Large ghost" />
          </div>
        </div>

        {/* Surface Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">Surface</h3>
          <div className="space-y-2">
            <Input variant="surface" inputSize="sm" placeholder="Small surface" />
            <Input variant="surface" placeholder="Default surface" />
            <Input variant="surface" inputSize="lg" placeholder="Large surface" />
          </div>
        </div>

        {/* States Section */}
        <div className="space-y-4 p-4 bg-gray-900 rounded-lg">
          <h3 className="text-lg font-semibold text-white">States</h3>
          <div className="space-y-2">
            <Input state="error" placeholder="Error state" />
            <Input state="success" placeholder="Success state" />
            <Input state="error" placeholder="Warning state" />
          </div>
        </div>
      </div>

      <div className="text-center pt-8 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          🎯 Following HIVE Design System - Gold focus states for clear user feedback
        </p>
      </div>
    </div>
  ),
};
