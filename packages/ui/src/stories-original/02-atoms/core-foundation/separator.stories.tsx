import type { Meta, StoryObj } from '@storybook/react';
import { 
  Separator, 
  HorizontalSeparator, 
  VerticalSeparator, 
  GradientDivider 
} from '../../../atomic/atoms/separator';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Avatar } from '../../../atomic/atoms/avatar';

const meta: Meta<typeof Separator> = {
  title: '02-atoms/Core Foundation/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Separator Component** - Visual dividers for content organization and layout structure

Part of the HIVE Atomic Design System providing consistent content separation and visual hierarchy.

## Features
- **2 Orientations**: Horizontal (default) and vertical separators
- **4 Visual Variants**: Solid, dashed, dotted, gradient styles
- **3 Sizes**: sm (1px), md (0.5), lg (3px) thickness options
- **4 Spacing Options**: None, sm, md, lg margin control
- **Accessibility**: Proper ARIA roles and orientation attributes
- **Preset Components**: Convenient shortcuts for common patterns
- **Design Token Integration**: Uses HIVE border color tokens

## Use Cases
- **Content Sections**: Separate different content areas
- **Navigation Items**: Divide menu and navigation elements
- **Card Components**: Internal content organization
- **Toolbar Separators**: Group related actions
- **List Dividers**: Separate list items and categories

## Accessibility Notes
- Uses proper separator role for screen readers
- Includes aria-orientation for navigation context
- decorative prop for purely visual separators
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Separator orientation'
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'gradient'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Separator thickness'
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Margin spacing around separator'
    },
    decorative: {
      control: 'boolean',
      description: 'Whether separator is decorative (affects ARIA role)'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Separator
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Text>Content above separator</Text>
      <Separator />
      <Text>Content below separator</Text>
    </div>
  )
};

// All Orientations
export const AllOrientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-4">Horizontal Separator</h4>
        <div className="w-80">
          <Text>First section</Text>
          <Separator orientation="horizontal" />
          <Text>Second section</Text>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-4">Vertical Separator</h4>
        <div className="flex items-center h-20">
          <Text>Left</Text>
          <Separator orientation="vertical" className="mx-4" />
          <Text>Right</Text>
        </div>
      </div>
    </div>
  )
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">Solid</Text>
        <Separator variant="solid" />
      </div>
      
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">Dashed</Text>
        <Separator variant="dashed" />
      </div>
      
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">Dotted</Text>
        <Separator variant="dotted" />
      </div>
      
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">Gradient</Text>
        <Separator variant="gradient" />
      </div>
    </div>
  )
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">Small (1px)</Text>
        <Separator size="sm" />
      </div>
      
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">Medium (0.5)</Text>
        <Separator size="md" />
      </div>
      
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">Large (3px)</Text>
        <Separator size="lg" />
      </div>
    </div>
  )
};

// Spacing Options
export const SpacingOptions: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div className="bg-gray-800 p-4 rounded-lg">
        <Text variant="body-sm" color="secondary" className="mb-2">No Spacing</Text>
        <Text>Content above</Text>
        <Separator spacing="none" />
        <Text>Content below</Text>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <Text variant="body-sm" color="secondary" className="mb-2">Small Spacing</Text>
        <Text>Content above</Text>
        <Separator spacing="sm" />
        <Text>Content below</Text>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <Text variant="body-sm" color="secondary" className="mb-2">Medium Spacing (Default)</Text>
        <Text>Content above</Text>
        <Separator spacing="md" />
        <Text>Content below</Text>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <Text variant="body-sm" color="secondary" className="mb-2">Large Spacing</Text>
        <Text>Content above</Text>
        <Separator spacing="lg" />
        <Text>Content below</Text>
      </div>
    </div>
  )
};

// Vertical Separators
export const VerticalSeparators: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-4">Navigation Bar</h4>
        <div className="flex items-center h-12 bg-gray-800 px-4 rounded-lg">
          <Text>Home</Text>
          <VerticalSeparator spacing="sm" />
          <Text>About</Text>
          <VerticalSeparator spacing="sm" />
          <Text>Services</Text>
          <VerticalSeparator spacing="sm" />
          <Text>Contact</Text>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-4">Toolbar Actions</h4>
        <div className="flex items-center h-10 bg-gray-800 px-3 rounded-lg">
          <button className="px-2 py-1 text-sm text-[var(--hive-text-primary)] hover:bg-gray-700 rounded">
            Copy
          </button>
          <VerticalSeparator spacing="sm" />
          <button className="px-2 py-1 text-sm text-[var(--hive-text-primary)] hover:bg-gray-700 rounded">
            Paste
          </button>
          <VerticalSeparator spacing="sm" />
          <button className="px-2 py-1 text-sm text-[var(--hive-text-primary)] hover:bg-gray-700 rounded">
            Delete
          </button>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-4">Breadcrumb Navigation</h4>
        <div className="flex items-center h-8">
          <Text variant="body-sm">Dashboard</Text>
          <VerticalSeparator spacing="sm" size="sm" />
          <Text variant="body-sm">Projects</Text>
          <VerticalSeparator spacing="sm" size="sm" />
          <Text variant="body-sm" color="gold">Current Project</Text>
        </div>
      </div>
    </div>
  )
};

// Preset Components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">HorizontalSeparator</Text>
        <Text>Using preset component</Text>
        <HorizontalSeparator />
        <Text>Simplified API</Text>
      </div>
      
      <div>
        <Text variant="body-sm" color="secondary" className="mb-2">GradientDivider</Text>
        <Text>Beautiful gradient effect</Text>
        <GradientDivider />
        <Text>Smooth transition</Text>
      </div>
      
      <div className="flex items-center h-16">
        <Text variant="body-sm" color="secondary">VerticalSeparator:</Text>
        <VerticalSeparator spacing="md" />
        <Text>Clean separation</Text>
      </div>
    </div>
  )
};

// Card Content Separation
export const CardContentSeparation: Story = {
  render: () => (
    <HiveCard className="p-6 max-w-md">
      <div className="flex items-center gap-3 mb-4">
        <Avatar 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          size="lg"
        />
        <div>
          <Text variant="heading-sm">John Doe</Text>
          <Text variant="body-sm" color="secondary">Software Engineer</Text>
        </div>
      </div>
      
      <Separator />
      
      <div className="py-4">
        <Text variant="body-md">
          Passionate about building great user experiences and scalable applications. 
          Currently working on the HIVE platform to revolutionize collaborative development.
        </Text>
      </div>
      
      <Separator variant="dashed" />
      
      <div className="pt-4">
        <div className="flex items-center justify-between">
          <Text variant="body-sm" color="secondary">Skills</Text>
          <div className="flex gap-2">
            <Badge variant="primary" size="sm">React</Badge>
            <Badge variant="secondary" size="sm">TypeScript</Badge>
            <Badge variant="success" size="sm">Node.js</Badge>
          </div>
        </div>
      </div>
    </HiveCard>
  )
};

// List Separators
export const ListSeparators: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-4">Menu List</h4>
        <HiveCard className="p-4 max-w-xs">
          <div className="space-y-0">
            <div className="px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer">
              Profile Settings
            </div>
            <Separator spacing="none" />
            <div className="px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer">
              Notifications
            </div>
            <Separator spacing="none" />
            <div className="px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer">
              Privacy & Security
            </div>
            <Separator spacing="none" />
            <div className="px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer">
              Billing
            </div>
            <Separator spacing="none" />
            <div className="px-3 py-2 text-red-400 hover:bg-gray-800 rounded cursor-pointer">
              Sign Out
            </div>
          </div>
        </HiveCard>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-4">Content List</h4>
        <div className="max-w-md space-y-0">
          <div className="py-3">
            <Text variant="heading-sm">Project Alpha</Text>
            <Text variant="body-sm" color="secondary">React dashboard for analytics</Text>
          </div>
          <Separator />
          
          <div className="py-3">
            <Text variant="heading-sm">Project Beta</Text>
            <Text variant="body-sm" color="secondary">Mobile app for iOS and Android</Text>
          </div>
          <Separator />
          
          <div className="py-3">
            <Text variant="heading-sm">Project Gamma</Text>
            <Text variant="body-sm" color="secondary">API service for data processing</Text>
          </div>
        </div>
      </div>
    </div>
  )
};

// Complex Layout Example
export const ComplexLayoutExample: Story = {
  render: () => (
    <HiveCard className="p-6 max-w-2xl">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Text variant="display-sm" as="h1">Project Dashboard</Text>
          <Text variant="body-md" color="secondary">
            Manage your projects and team collaboration
          </Text>
        </div>
        
        <GradientDivider size="lg" />
        
        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <Text variant="display-md" color="gold">12</Text>
            <Text variant="body-sm" color="secondary">Active Projects</Text>
          </div>
          
          <div className="flex justify-center">
            <VerticalSeparator size="lg" />
          </div>
          
          <div className="text-center">
            <Text variant="display-md" color="emerald">45</Text>
            <Text variant="body-sm" color="secondary">Team Members</Text>
          </div>
          
          <div className="flex justify-center">
            <VerticalSeparator size="lg" />
          </div>
          
          <div className="text-center">
            <Text variant="display-md" color="ruby">3</Text>
            <Text variant="body-sm" color="secondary">Pending Tasks</Text>
          </div>
        </div>
        
        <Separator variant="dashed" />
        
        {/* Action Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg">
              New Project
            </button>
            <VerticalSeparator />
            <button className="px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg">
              Import
            </button>
            <VerticalSeparator />
            <button className="px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg">
              Export
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="success" dot>5 online</Badge>
            <Badge variant="warning" count={3} />
          </div>
        </div>
      </div>
    </HiveCard>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="w-80">
      <Text>Content above separator</Text>
      <Separator {...args} />
      <Text>Content below separator</Text>
      
      {args.orientation === 'vertical' && (
        <div className="mt-8">
          <Text variant="body-sm" color="secondary" className="mb-4">
            Vertical separator example:
          </Text>
          <div className="flex items-center h-16">
            <Text>Left content</Text>
            <Separator {...args} className="mx-4" />
            <Text>Right content</Text>
          </div>
        </div>
      )}
    </div>
  ),
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    size: 'md',
    spacing: 'md',
    decorative: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different separator configurations including orientation, variant, size, and spacing options.'
      }
    }
  }
};