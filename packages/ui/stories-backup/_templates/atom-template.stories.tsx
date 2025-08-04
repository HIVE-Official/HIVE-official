import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * TEMPLATE: Atom Component Story
 * 
 * Copy this template to create stories for atomic components.
 * 
 * 1. Replace `TemplateAtom` with your actual component
 * 2. Update the import path
 * 3. Customize the variants, states, and examples
 * 4. Update the meta title to match atomic hierarchy
 * 5. Add component-specific argTypes and decorators
 */

// REPLACE: Import your actual component
interface TemplateAtomProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
}

const TemplateAtom: React.FC<TemplateAtomProps> = ({ 
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  children = 'Template Atom'
}) => (
  <button 
    className={`
      px-4 py-2 rounded-lg font-medium transition-all
      ${variant === 'primary' ? 'bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)]' : ''}
      ${variant === 'secondary' ? 'bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]' : ''}
      ${variant === 'ghost' ? 'bg-transparent text-[var(--hive-text-primary)]' : ''}
      ${size === 'sm' ? 'text-sm px-3 py-1' : ''}
      ${size === 'lg' ? 'text-lg px-6 py-3' : ''}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      ${loading ? 'animate-pulse' : ''}
    `}
    disabled={disabled}
  >
    {loading ? 'Loading...' : children}
  </button>
);

// REPLACE: Update component name and title path
const meta: Meta<typeof TemplateAtom> = {
  title: '01-Atoms/Template Atom',
  component: TemplateAtom,
  parameters: {
    docs: {
      description: {
        component: `
# Template Atom Component

**Replace this with your component description**

This is a template for creating comprehensive stories for atomic components in the HIVE Design System.

## Features
- Semantic token usage
- Multiple variants and sizes  
- Interactive states (hover, active, disabled)
- Loading states
- Accessibility compliance
- HIVE motion integration

## Usage
Basic usage example for campus context.
        `
      }
    },
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual variant of the component'
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component'
    },
    loading: {
      control: 'boolean', 
      description: 'Show loading state'
    },
    children: {
      control: 'text',
      description: 'Content of the component'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-[var(--hive-background-primary)] min-h-[200px] flex items-center justify-center">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic usage with reasonable defaults
export const Default: Story = {
  args: {
    children: 'Join Study Group'
  }
};

// 2. PLAYGROUND STORY - Interactive controls for all props
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    children: 'Interactive Example'
  }
};

// 3. ALL VARIANTS STORY - Showcase all available variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Primary</h3>
        <TemplateAtom variant="primary">Primary Action</TemplateAtom>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Secondary</h3>
        <TemplateAtom variant="secondary">Secondary Action</TemplateAtom>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Ghost</h3>
        <TemplateAtom variant="ghost">Ghost Action</TemplateAtom>
      </div>
    </div>
  )
};

// 4. ALL SIZES STORY - Show size variations
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <TemplateAtom size="sm">Small</TemplateAtom>
      <TemplateAtom size="md">Medium</TemplateAtom>
      <TemplateAtom size="lg">Large</TemplateAtom>
    </div>
  )
};

// 5. STATES STORY - Different interaction states
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Default</h3>
        <TemplateAtom>Default</TemplateAtom>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Loading</h3>
        <TemplateAtom loading>Loading</TemplateAtom>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Disabled</h3>
        <TemplateAtom disabled>Disabled</TemplateAtom>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-sm font-medium text-[var(--hive-text-secondary)]">Focus</h3>
        <TemplateAtom style={{ outline: '2px solid var(--hive-brand-primary)' }}>
          Focused
        </TemplateAtom>
      </div>
    </div>
  )
};

// 6. CAMPUS CONTEXT STORY - Real campus usage examples
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Examples
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world examples of how students would use this component
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Study Group Actions</h3>
          <div className="space-y-2">
            <TemplateAtom variant="primary" size="sm">Join Group</TemplateAtom>
            <TemplateAtom variant="secondary" size="sm">Request Info</TemplateAtom>
            <TemplateAtom variant="ghost" size="sm">Maybe Later</TemplateAtom>
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Course Registration</h3>
          <div className="space-y-2">
            <TemplateAtom variant="primary">Register for Class</TemplateAtom>
            <TemplateAtom variant="secondary">Add to Wishlist</TemplateAtom>
            <TemplateAtom variant="secondary" disabled>Class Full</TemplateAtom>
          </div>
        </div>
      </div>
    </div>
  )
};

// 7. RESPONSIVE STORY - Mobile-first responsive behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Responsive Behavior
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Component behavior across different screen sizes
        </p>
      </div>
      
      {/* Mobile (default) */}
      <div className="block md:hidden">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Mobile (Current)</h3>
          <TemplateAtom size="sm" className="w-full">
            Full Width Action
          </TemplateAtom>
        </div>
      </div>
      
      {/* Tablet & Desktop */}
      <div className="hidden md:block">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Desktop (Current)</h3>
          <div className="flex gap-2">
            <TemplateAtom>Primary Action</TemplateAtom>
            <TemplateAtom variant="secondary">Secondary</TemplateAtom>
          </div>
        </div>
      </div>
    </div>
  )
};

// 8. ACCESSIBILITY STORY - A11y features demonstration
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Screen reader support, keyboard navigation, and WCAG compliance
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium mb-3">Keyboard Navigation</h3>
        <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
          Use Tab to navigate, Enter/Space to activate
        </p>
        <div className="flex gap-2">
          <TemplateAtom>First</TemplateAtom>
          <TemplateAtom>Second</TemplateAtom>
          <TemplateAtom>Third</TemplateAtom>
        </div>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
        <h3 className="font-medium mb-3">Screen Reader Support</h3>
        <TemplateAtom 
          aria-label="Join the Computer Science 101 study group - 5 members"
          title="Join study group with detailed information"
        >
          Join CS 101 Study Group
        </TemplateAtom>
      </div>
    </div>
  )
};

// 9. MOTION STORY - HIVE liquid metal interactions
export const Motion: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          HIVE Motion System
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Liquid metal interactions and buttery animations
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Hover Effects</h3>
          <TemplateAtom className="hover:scale-105 transition-transform duration-200">
            Hover to Scale
          </TemplateAtom>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Press Effects</h3>
          <TemplateAtom className="active:scale-95 transition-transform duration-100">
            Press to Compress
          </TemplateAtom>
        </div>
      </div>
    </div>
  )
};