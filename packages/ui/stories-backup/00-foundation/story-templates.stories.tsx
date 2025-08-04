import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * # HIVE Story Templates & Guidelines
 * 
 * This document defines the standardized templates and guidelines for creating
 * stories in the HIVE Design System. Every component should follow these patterns
 * to ensure consistency and comprehensive coverage.
 * 
 * ## Story Structure
 * 
 * Every component should have these core stories:
 * 1. **Default** - Basic usage with reasonable defaults
 * 2. **Playground** - Interactive controls for all props
 * 3. **All Variants** - Showcase all available variants
 * 4. **States** - Different interaction states (hover, active, disabled)
 * 5. **Responsive** - Mobile, tablet, desktop behaviors
 * 6. **Accessibility** - Screen reader, keyboard navigation
 * 7. **Dark Mode** - Theme variations (if applicable)
 * 
 * ## HIVE-Specific Requirements
 * 
 * - **Motion Integration**: Demonstrate liquid metal interactions
 * - **Token Usage**: Show semantic token implementation
 * - **Brand Consistency**: HIVE visual identity throughout
 * - **Student Context**: Real campus usage examples
 * - **Mobile-First**: Primary focus on mobile experience
 */

// Template component for demonstration
const TemplateExample = ({ children, ...props }: { children: React.ReactNode }) => (
  <div className="p-4 bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
    {children}
  </div>
);

const meta: Meta<typeof TemplateExample> = {
  title: '00-Foundation/Story Templates',
  component: TemplateExample,
  parameters: {
    docs: {
      description: {
        component: `
# Story Templates & Guidelines

This foundation document provides the standardized templates for creating HIVE component stories.

## Quick Reference

### Required Stories for Every Component:
- \`Default\` - Basic usage
- \`Playground\` - Interactive controls  
- \`All Variants\` - Complete variant showcase
- \`States\` - Interaction states
- \`Responsive\` - Cross-device behavior
- \`Accessibility\` - A11y features
- \`Motion\` - HIVE liquid metal interactions

### Story Template Structure:
\`\`\`typescript
// 1. Import the component and types
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../path/to/component';

// 2. Define the meta configuration
const meta: Meta<typeof ComponentName> = {
  title: 'XX-Level/ComponentName',
  component: ComponentName,
  parameters: {
    docs: { description: { component: 'Component description' } }
  },
  argTypes: {
    // Define interactive controls
  },
  decorators: [
    // HIVE theme provider, responsive wrapper
  ]
};

// 3. Export meta and create stories
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Reasonable defaults
  }
};

export const Playground: Story = {
  args: {
    // Interactive defaults
  }
};
\`\`\`

## Template Categories

Each atomic level has specific requirements:

### Atoms
- Focus on variants, states, and accessibility
- Demonstrate token usage
- Show motion integration

### Molecules  
- Show composition patterns
- Demonstrate form integration
- Mobile-first responsive behavior

### Organisms
- Real campus usage scenarios
- Complex state management
- Full responsive behavior

### Templates
- Complete page layouts
- Navigation integration
- Multi-device demonstrations

## Quality Standards

Every story must:
- ✅ Use semantic tokens (no hardcoded values)
- ✅ Include accessibility testing
- ✅ Demonstrate mobile-first responsive design
- ✅ Show HIVE motion system integration
- ✅ Provide meaningful, campus-relevant examples
- ✅ Include comprehensive variant coverage
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OverviewTemplate: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-[var(--hive-brand-primary)]">
          HIVE Story Templates
        </h1>
        <p className="text-[var(--hive-text-secondary)] max-w-2xl mx-auto">
          Standardized templates and guidelines for creating comprehensive, 
          consistent stories across the HIVE Design System.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg border border-[var(--hive-border-default)]">
          <h3 className="font-semibold mb-3 text-[var(--hive-text-primary)]">Required Stories</h3>
          <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
            <li>✓ Default - Basic usage</li>
            <li>✓ Playground - Interactive controls</li>
            <li>✓ All Variants - Complete showcase</li>
            <li>✓ States - Interaction states</li>
            <li>✓ Responsive - Cross-device</li>
            <li>✓ Accessibility - A11y features</li>
            <li>✓ Motion - Liquid metal interactions</li>
          </ul>
        </div>
        
        <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg border border-[var(--hive-border-default)]">
          <h3 className="font-semibold mb-3 text-[var(--hive-text-primary)]">Quality Standards</h3>
          <ul className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
            <li>✓ Semantic token usage</li>
            <li>✓ Campus-relevant examples</li>
            <li>✓ Mobile-first design</li>
            <li>✓ Brand consistency</li>
            <li>✓ Student-centered context</li>
            <li>✓ Accessibility compliance</li>
            <li>✓ Motion system integration</li>
          </ul>
        </div>
      </div>
    </div>
  )
};

// Template examples for each atomic level
export const AtomTemplate: Story = {
  render: () => (
    <TemplateExample>
      <h2 className="text-lg font-semibold mb-4">Atom Story Template</h2>
      <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
        Focus on variants, states, accessibility, and token usage.
      </p>
      <div className="bg-[var(--hive-background-secondary)] p-3 rounded text-xs font-mono">
        {`export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {variants.map(variant => (
        <AtomComponent key={variant} variant={variant} />
      ))}
    </div>
  )
};`}
      </div>
    </TemplateExample>
  )
};

export const MoleculeTemplate: Story = {
  render: () => (
    <TemplateExample>
      <h2 className="text-lg font-semibold mb-4">Molecule Story Template</h2>
      <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
        Show composition patterns and form integration.
      </p>
      <div className="bg-[var(--hive-background-secondary)] p-3 rounded text-xs font-mono">
        {`export const CampusUsage: Story = {
  args: {
    title: "Join Study Group",
    description: "Connect with classmates for CHEM 101"
  },
  decorators: [withMobileFirst]
};`}
      </div>
    </TemplateExample>
  )
};

export const OrganismTemplate: Story = {
  render: () => (
    <TemplateExample>
      <h2 className="text-lg font-semibold mb-4">Organism Story Template</h2>
      <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
        Real campus scenarios with complex state management.
      </p>
      <div className="bg-[var(--hive-background-secondary)] p-3 rounded text-xs font-mono">
        {`export const StudentProfile: Story = {
  args: {
    user: mockStudentData,
    spaces: mockCampusSpaces,
    tools: mockStudentTools
  },
  play: async ({ canvasElement }) => {
    // Interaction testing
  }
};`}
      </div>
    </TemplateExample>
  )
};