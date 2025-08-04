import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * TEMPLATE: Molecule Component Story
 * 
 * Copy this template to create stories for molecular components.
 * 
 * Molecules focus on:
 * - Composition patterns
 * - Form integration  
 * - Campus-specific usage
 * - Mobile-first responsive behavior
 * - Component combinations
 */

// REPLACE: Import your actual component
interface TemplateMoleculeProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'compact' | 'detailed';
  showImage?: boolean;
  interactive?: boolean;
  loading?: boolean;
}

const TemplateMolecule: React.FC<TemplateMoleculeProps> = ({
  title = 'Sample Molecule',
  description = 'This is a template molecule component',
  variant = 'default',
  showImage = true,
  interactive = true,
  loading = false
}) => (
  <div className={`
    bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)]
    rounded-lg p-4 space-y-3 transition-all duration-200
    ${interactive ? 'hover:border-[var(--hive-border-hover)] hover:shadow-md' : ''}
    ${variant === 'compact' ? 'p-3' : ''}
    ${variant === 'detailed' ? 'p-6' : ''}
    ${loading ? 'animate-pulse' : ''}
  `}>
    {showImage && (
      <div className="w-full h-24 bg-[var(--hive-background-tertiary)] rounded-md flex items-center justify-center">
        <span className="text-sm text-[var(--hive-text-muted)]">Image Placeholder</span>
      </div>
    )}
    
    <div className="space-y-2">
      <h3 className="font-semibold text-[var(--hive-text-primary)]">{title}</h3>
      {variant !== 'compact' && (
        <p className="text-sm text-[var(--hive-text-secondary)]">{description}</p>
      )}
    </div>
    
    {interactive && (
      <div className="flex gap-2 pt-2">
        <button className="px-3 py-1 bg-[var(--hive-brand-primary)] text-[var(--hive-text-inverse)] text-sm rounded">
          Action
        </button>
        <button className="px-3 py-1 bg-transparent text-[var(--hive-text-secondary)] text-sm rounded border border-[var(--hive-border-default)]">
          Secondary
        </button>
      </div>
    )}
  </div>
);

// REPLACE: Update component name and title path
const meta: Meta<typeof TemplateMolecule> = {
  title: '02-Molecules/Template Molecule',
  component: TemplateMolecule,
  parameters: {
    docs: {
      description: {
        component: `
# Template Molecule Component

**Replace this with your component description**

This is a template for creating comprehensive stories for molecular components in the HIVE Design System.

## Features
- Composition of multiple atoms
- Form integration patterns
- Campus-specific usage scenarios
- Mobile-first responsive design
- Interactive element combinations

## Molecule Characteristics
- Combines 2-5 atomic components
- Has a specific function or purpose
- Reusable across different contexts
- Maintains component composition integrity
        `
      }
    },
    layout: 'padded'
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the molecule'
    },
    description: {
      control: 'text',
      description: 'Description text'
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'detailed'],
      description: 'Visual variant'
    },
    showImage: {
      control: 'boolean',
      description: 'Show image placeholder'
    },
    interactive: {
      control: 'boolean',
      description: 'Include interactive elements'
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state'
    }
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-[var(--hive-background-primary)] min-h-[300px]">
        <div className="max-w-md mx-auto">
          <Story />
        </div>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. DEFAULT STORY - Basic usage
export const Default: Story = {
  args: {
    title: 'Study Group: Computer Science 101',
    description: 'Join fellow students for collaborative learning sessions every Tuesday and Thursday.'
  }
};

// 2. PLAYGROUND STORY - Interactive controls
export const Playground: Story = {
  args: {
    title: 'Interactive Molecule',
    description: 'Customize all properties using the controls panel',
    variant: 'default',
    showImage: true,
    interactive: true,
    loading: false
  }
};

// 3. ALL VARIANTS STORY - Show all variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          All Variants
        </h2>
      </div>
      
      <div className="grid gap-4">
        <div>
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2">Default</h3>
          <TemplateMolecule 
            title="Chemistry Lab Session"
            description="Hands-on experiments and group discussions"
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2">Compact</h3>
          <TemplateMolecule 
            variant="compact"
            title="Quick Study Session"
            showImage={false}
          />
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-[var(--hive-text-secondary)] mb-2">Detailed</h3>
          <TemplateMolecule 
            variant="detailed"
            title="Advanced Physics Workshop"
            description="In-depth exploration of quantum mechanics with practical applications and peer discussions. Perfect for preparing for final exams."
          />
        </div>
      </div>
    </div>
  )
};

// 4. COMPOSITION PATTERNS STORY - Show how atoms combine
export const CompositionPatterns: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Composition Patterns
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How atomic components combine to form this molecule
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium mb-3">With Image + Actions</h3>
          <TemplateMolecule 
            title="Biology Study Group"
            description="Weekly meetings to review lecture materials"
            showImage={true}
            interactive={true}
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Text Only + Actions</h3>
          <TemplateMolecule 
            title="Math Tutoring Session"
            description="One-on-one help with calculus problems"
            showImage={false}
            interactive={true}
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Display Only</h3>
          <TemplateMolecule 
            title="Course Announcement"
            description="New assignment posted for review"
            showImage={true}
            interactive={false}
          />
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Loading State</h3>
          <TemplateMolecule 
            title="Loading Content..."
            description="Please wait while we fetch the latest updates"
            loading={true}
          />
        </div>
      </div>
    </div>
  )
};

// 5. CAMPUS USAGE STORY - Real campus scenarios
export const CampusUsage: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Campus Usage Scenarios
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Real-world applications across campus life
        </p>
      </div>
      
      <div className="grid gap-6">
        <div>
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Academic Spaces</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateMolecule 
              title="Physics Lab - Section A"
              description="Equipment checkout and safety protocols"
              variant="detailed"
            />
            <TemplateMolecule 
              title="Library Study Room 204"
              description="Reserved for group project work"
              variant="default"
            />
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Social Spaces</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateMolecule 
              title="Student Union Game Night"
              description="Weekly social gathering with board games"
              variant="default"
            />
            <TemplateMolecule 
              title="Debate Club Meeting"
              description="Discussing current events and public speaking"
              variant="compact"
            />
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-3 text-[var(--hive-brand-primary)]">Support Spaces</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateMolecule 
              title="Academic Advising"
              description="Course planning and degree requirements"
              variant="detailed"
            />
            <TemplateMolecule 
              title="Career Services Workshop"
              description="Resume building and interview prep"
              variant="default"
            />
          </div>
        </div>
      </div>
    </div>
  )
};

// 6. FORM INTEGRATION STORY - How molecule works in forms
export const FormIntegration: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Form Integration
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          How this molecule integrates with form patterns
        </p>
      </div>
      
      <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
        <h3 className="font-medium mb-4">Course Registration Form</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Course:</label>
            <TemplateMolecule 
              title="Introduction to Computer Science"
              description="CS 101 - MWF 10:00-11:00 AM - Dr. Smith"
              variant="compact"
              interactive={true}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Alternative Options:</label>
            <div className="space-y-2">
              <TemplateMolecule 
                title="Advanced Programming"
                description="CS 201 - TTh 2:00-3:30 PM - Prof. Johnson"
                variant="compact"
                interactive={true}
              />
              <TemplateMolecule 
                title="Data Structures"
                description="CS 202 - MWF 1:00-2:00 PM - Dr. Williams"
                variant="compact"
                interactive={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// 7. RESPONSIVE STORY - Mobile-first behavior
export const Responsive: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Responsive Behavior
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          Mobile-first design across screen sizes
        </p>
      </div>
      
      <div className="space-y-4">
        {/* Mobile View */}
        <div className="block md:hidden">
          <h3 className="font-medium mb-2">Mobile (Current)</h3>
          <TemplateMolecule 
            title="Mobile Study Group"
            description="Optimized for touch interactions"
            variant="compact"
          />
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:block">
          <h3 className="font-medium mb-2">Desktop (Current)</h3>
          <div className="grid grid-cols-2 gap-4">
            <TemplateMolecule 
              title="Desktop Study Group A"
              description="Full feature set with detailed information"
              variant="detailed"
            />
            <TemplateMolecule 
              title="Desktop Study Group B"
              description="Side-by-side comparison view"
              variant="default"
            />
          </div>
        </div>
        
        {/* Responsive Behavior Demo */}
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Adaptive Layout</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            This molecule automatically adjusts its layout based on available space
          </p>
          <TemplateMolecule 
            title="Adaptive Component"
            description="Changes layout and information density based on screen size"
            variant="default"
          />
        </div>
      </div>
    </div>
  )
};

// 8. ACCESSIBILITY STORY - A11y compliance
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
          Accessibility Features
        </h2>
        <p className="text-sm text-[var(--hive-text-secondary)]">
          WCAG 2.1 AA compliant molecule patterns
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Keyboard Navigation</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Tab through interactive elements, Enter to activate
          </p>
          <TemplateMolecule 
            title="Keyboard Accessible Study Group"
            description="All interactive elements support keyboard navigation"
            interactive={true}
          />
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Screen Reader Support</h3>
          <div 
            role="article"
            aria-labelledby="study-group-title"
            aria-describedby="study-group-description"
          >
            <TemplateMolecule 
              title="Screen Reader Optimized"
              description="Properly structured with ARIA labels and semantic HTML"
              interactive={true}
            />
          </div>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
          <h3 className="font-medium mb-3">Color Contrast</h3>
          <p className="text-sm text-[var(--hive-text-secondary)] mb-3">
            Meets WCAG AA standards for color contrast ratios
          </p>
          <TemplateMolecule 
            title="High Contrast Design"
            description="Accessible color combinations for all users"
            interactive={true}
          />
        </div>
      </div>
    </div>
  )
};