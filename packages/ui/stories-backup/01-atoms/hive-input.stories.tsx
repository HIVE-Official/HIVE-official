import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { HiveInput } from '../../components/hive-input';
import { Search, User, Mail, Lock, Eye, EyeOff, Calendar, MapPin } from 'lucide-react';

/**
 * # HiveInput - Campus Form Foundation
 * 
 * The HiveInput atom is the foundational input component in the HIVE Design System.
 * It provides consistent, accessible form inputs for all campus interactions with
 * premium aesthetics and semantic token integration.
 * 
 * ## Features
 * - Premium glass morphism with backdrop blur
 * - Complete semantic token usage (no hardcoded values)
 * - Multiple variants and sizes
 * - Icon support (left and right)
 * - Validation states and error handling
 * - WCAG 2.1 AA accessibility compliance
 * - HIVE liquid metal motion integration
 * - Campus-optimized interaction patterns
 * 
 * ## Usage
 * Perfect for all campus form inputs - from search bars and login forms to
 * profile editing, tool creation, and academic data entry.
 */

const meta: Meta<typeof HiveInput> = {
  title: '01-Atoms/HiveInput',
  component: HiveInput,
  parameters: {
    docs: {
      description: {
        component: `
# HiveInput Component

The foundational input component for all HIVE campus forms, featuring premium glass morphism aesthetics.

## Design Philosophy
- **Glass Morphism**: Premium backdrop blur and transparency
- **Semantic First**: 100% semantic token usage
- **Campus-Centered**: Optimized for academic forms
- **Accessible**: WCAG 2.1 AA compliant
- **Versatile**: Multiple variants and validation states

## Technical Implementation
- Zero hardcoded values
- CSS custom properties for theming
- Built-in validation state handling
- Icon integration system
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'disabled', 'premium', 'minimal'],
      description: 'Visual style variant'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Size of the input'
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'success', 'error', 'warning'],
      description: 'Validation state'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-6 bg-[var(--hive-background-primary)] min-h-[200px] flex items-center justify-center">
        <div className="w-full max-w-md">
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic campus input
export const Default: Story = {
  args: {
    placeholder: 'Search campus...'
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default', 
    state: 'default',
    disabled: false,
    placeholder: 'Interactive input'
  }
};

// 3. ALL VARIANTS STORY - Complete variant showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Input Variants
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different visual styles for various campus contexts
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Default</label>
          <HiveInput variant="default" placeholder="Standard campus input" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Premium</label>
          <HiveInput variant="premium" placeholder="Enhanced visual hierarchy" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Glass</label>
          <HiveInput variant="glass" placeholder="Glass morphism effect" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Outlined</label>
          <HiveInput variant="outlined" placeholder="Clean border emphasis" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Minimal</label>
          <HiveInput variant="minimal" placeholder="Subtle, minimal design" />
        </div>
      </div>
    </div>
  )
};

// 4. ALL SIZES STORY - Size variations
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Input Sizes
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Different sizes for various interface needs
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs text-[var(--hive-text-secondary)]">Extra Small</label>
          <HiveInput size="xs" placeholder="Extra small input" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-[var(--hive-text-secondary)]">Small</label>
          <HiveInput size="sm" placeholder="Small input" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-[var(--hive-text-secondary)]">Default</label>
          <HiveInput size="default" placeholder="Default input" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-[var(--hive-text-secondary)]">Large</label>
          <HiveInput size="lg" placeholder="Large input" />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-[var(--hive-text-secondary)]">Extra Large</label>
          <HiveInput size="xl" placeholder="Extra large input" />
        </div>
      </div>
    </div>
  )
};

// 5. WITH ICONS STORY - Icon combinations
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Icon Integration
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Common campus form patterns with icons
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Search</label>
          <HiveInput 
            leftIcon={<Search className="h-4 w-4" />}
            placeholder="Search courses, students, spaces..." 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Username</label>
          <HiveInput 
            leftIcon={<User className="h-4 w-4" />}
            placeholder="Enter your username" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Email</label>
          <HiveInput 
            leftIcon={<Mail className="h-4 w-4" />}
            placeholder="student@university.edu"
            type="email" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Password</label>
          <HiveInput 
            leftIcon={<Lock className="h-4 w-4" />}
            rightIcon={<Eye className="h-4 w-4" />}
            placeholder="Enter password"
            type="password" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Event Date</label>
          <HiveInput 
            leftIcon={<Calendar className="h-4 w-4" />}
            placeholder="Select date"
            type="date" 
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Location</label>
          <HiveInput 
            leftIcon={<MapPin className="h-4 w-4" />}
            placeholder="Building name or room number" 
          />
        </div>
      </div>
    </div>
  )
};

// 6. VALIDATION STATES STORY - Different states
export const ValidationStates: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Validation States
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Visual feedback for form validation
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Default State</label>
          <HiveInput 
            state="default"
            placeholder="Normal input state" 
          />
          <p className="text-xs text-[var(--hive-text-secondary)]">Ready for input</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Success State</label>
          <HiveInput 
            state="success"
            placeholder="Valid input"
            defaultValue="john.doe@university.edu"
          />
          <p className="text-xs text-green-400">✓ Email format is valid</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Error State</label>
          <HiveInput 
            state="error"
            placeholder="Invalid input"
            defaultValue="invalid-email"
          />
          <p className="text-xs text-red-400">✗ Please enter a valid email address</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-primary)]">Warning State</label>
          <HiveInput 
            state="warning"
            placeholder="Needs attention"
            defaultValue="short"
          />
          <p className="text-xs text-yellow-400">⚠ Password should be at least 8 characters</p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--hive-text-secondary)]">Disabled State</label>
          <HiveInput 
            disabled
            placeholder="Cannot interact"
            defaultValue="Disabled input"
          />
          <p className="text-xs text-[var(--hive-text-secondary)]">Field is currently disabled</p>
        </div>
      </div>
    </div>
  )
};

// 7. CAMPUS USAGE STORY - Real campus scenarios  
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world campus forms where inputs are used
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Student Login</h3>
          <div className="space-y-3">
            <HiveInput 
              leftIcon={<User className="h-4 w-4" />}
              placeholder="Student ID or Username"
              variant="premium"
            />
            <HiveInput 
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={<Eye className="h-4 w-4" />}
              placeholder="Password"
              type="password"
              variant="premium"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Course Search</h3>
          <div className="space-y-3">
            <HiveInput 
              leftIcon={<Search className="h-4 w-4" />}
              placeholder="Search courses..."
              variant="glass"
              size="lg"
            />
            <div className="grid grid-cols-2 gap-2">
              <HiveInput placeholder="Department" size="sm" />
              <HiveInput placeholder="Level" size="sm" />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Profile Setup</h3>
          <div className="space-y-3">
            <HiveInput 
              placeholder="Full Name"
              defaultValue="Sarah Chen"
            />
            <HiveInput 
              leftIcon={<Mail className="h-4 w-4" />}
              placeholder="University Email"
              type="email"
            />
            <HiveInput 
              placeholder="Major"
              defaultValue="Computer Science"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--hive-brand-primary)]">Event Creation</h3>
          <div className="space-y-3">
            <HiveInput 
              placeholder="Event Title"
              variant="outlined"
            />
            <HiveInput 
              leftIcon={<Calendar className="h-4 w-4" />}
              type="datetime-local"
              variant="outlined"
            />
            <HiveInput 
              leftIcon={<MapPin className="h-4 w-4" />}
              placeholder="Location"
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  )
};