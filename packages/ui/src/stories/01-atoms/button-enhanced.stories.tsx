import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonGroup, IconButton } from '../../atomic/atoms/button-enhanced';
import { User, Plus, Settings, Heart, Share, Download } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: '01-Atoms/Button Enhanced',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE enhanced button component with comprehensive variants, sizes, and campus-specific styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
      description: 'Button variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'Default Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Action',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Action',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Account',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-6">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

// States
export const Loading: Story = {
  args: {
    loading: true,
    children: 'Processing...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-6">
      <Button>
        <User className="w-4 h-4 mr-2" />
        Profile
      </Button>
      <Button variant="primary">
        <Plus className="w-4 h-4 mr-2" />
        Add Space
      </Button>
      <Button variant="outline">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </Button>
      <Button variant="ghost">
        <Heart className="w-4 h-4 mr-2" />
        Favorite
      </Button>
    </div>
  ),
};

// Icon buttons
export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-4 p-6">
      <IconButton>
        <Settings className="w-4 h-4" />
      </IconButton>
      <IconButton variant="primary">
        <Plus className="w-4 h-4" />
      </IconButton>
      <IconButton variant="outline">
        <Share className="w-4 h-4" />
      </IconButton>
      <IconButton variant="ghost">
        <Download className="w-4 h-4" />
      </IconButton>
    </div>
  ),
};

// Button groups
export const ButtonGroups: Story = {
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Basic Group</h3>
        <ButtonGroup>
          <Button variant="outline">Cancel</Button>
          <Button variant="primary">Save</Button>
        </ButtonGroup>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Three Button Group</h3>
        <ButtonGroup>
          <Button variant="outline">Back</Button>
          <Button variant="outline">Skip</Button>
          <Button variant="primary">Continue</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Student Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Join Space</Button>
          <Button variant="outline">View Schedule</Button>
          <Button variant="secondary">Start Study Session</Button>
          <Button variant="ghost">Save Tool</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Builder Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Tool
          </Button>
          <Button variant="outline">Publish Tool</Button>
          <Button variant="secondary">View Analytics</Button>
          <Button variant="ghost">Share Tool</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Space Management</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Create Space</Button>
          <Button variant="outline">Invite Members</Button>
          <Button variant="secondary">Schedule Event</Button>
          <Button variant="destructive" size="sm">Leave Space</Button>
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
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Button Variants</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="default">Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Button Sizes</h3>
        <div className="flex items-center gap-3">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
          <Button size="xl" variant="primary">Extra Large</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Button States</h3>
        <div className="flex gap-3">
          <Button variant="primary">Normal</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button variant="primary" disabled>Disabled</Button>
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
      <Button fullWidth variant="primary">
        Join Study Group
      </Button>
      <Button fullWidth variant="outline">
        View Campus Map
      </Button>
      <div className="flex gap-2">
        <Button size="sm" className="flex-1">Schedule</Button>
        <Button size="sm" className="flex-1">Events</Button>
        <Button size="sm" className="flex-1">Tools</Button>
      </div>
    </div>
  ),
};