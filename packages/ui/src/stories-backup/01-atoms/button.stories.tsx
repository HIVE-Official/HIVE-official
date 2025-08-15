import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../atomic/atoms/button';
import { 
  Plus, 
  Download, 
  Share, 
  Settings, 
  User, 
  Calendar, 
  BookOpen, 
  Users, 
  Zap, 
  Heart, 
  Star, 
  ArrowRight, 
  Edit, 
  Trash2, 
  Check,
  X,
  Search,
  Filter,
  Upload,
  Save
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Button> = {
  title: '01-Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE button component with semantic tokens, motion effects, and campus-specific interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'destructive', 'outline', 'accent'],
      description: 'Button visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'Button size',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position relative to text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
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
    children: 'Destructive Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent Button',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Plus className="w-4 h-4" />,
    children: 'Add Item',
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Loading...',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="accent">Accent</Button>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  ),
};

// Button states
export const ButtonStates: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
      
      <div className="flex gap-4">
        <Button variant="secondary">Normal</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="secondary" loading>Loading</Button>
      </div>
      
      <div className="flex gap-4">
        <Button variant="ghost">Normal</Button>
        <Button variant="ghost" disabled>Disabled</Button>
        <Button variant="ghost" loading>Loading</Button>
      </div>
    </div>
  ),
};

// Campus button scenarios
export const CampusButtonScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Dashboard Actions</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-hive-emerald/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-8 h-8 text-hive-emerald" />
              </div>
              <h4 className="font-semibold text-hive-text-primary mb-2">Study Tools</h4>
              <p className="text-sm text-hive-text-secondary mb-4">Access your learning resources</p>
              <Button variant="primary" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
                Browse Tools
              </Button>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-hive-sapphire/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-hive-sapphire" />
              </div>
              <h4 className="font-semibold text-hive-text-primary mb-2">Study Groups</h4>
              <p className="text-sm text-hive-text-secondary mb-4">Join collaborative sessions</p>
              <Button variant="secondary" fullWidth icon={<Plus className="w-4 h-4" />}>
                Find Groups
              </Button>
            </div>
            
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-hive-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-hive-gold" />
              </div>
              <h4 className="font-semibold text-hive-text-primary mb-2">Schedule</h4>
              <p className="text-sm text-hive-text-secondary mb-4">Manage your time effectively</p>
              <Button variant="accent" fullWidth icon={<Calendar className="w-4 h-4" />}>
                View Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Interface</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-semibold text-hive-text-primary">GPA Calculator Pro</h4>
              <p className="text-hive-text-secondary">Build and customize your academic tool</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="aspect-video bg-hive-background-tertiary border-2 border-dashed border-hive-border-default rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-12 h-12 text-hive-text-mutedLight mx-auto mb-2" />
                <p className="text-hive-text-mutedLight">Tool Canvas</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Component Library</label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" size="sm" fullWidth>Input Field</Button>
                  <Button variant="ghost" size="sm" fullWidth>Calculator</Button>
                  <Button variant="ghost" size="sm" fullWidth>Chart</Button>
                  <Button variant="ghost" size="sm" fullWidth>Table</Button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-hive-text-primary mb-2">Actions</label>
                <div className="space-y-2">
                  <Button variant="secondary" fullWidth icon={<Save className="w-4 h-4" />}>
                    Save Draft
                  </Button>
                  <Button variant="primary" fullWidth icon={<Upload className="w-4 h-4" />}>
                    Publish Tool
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />}>
                Edit Details
              </Button>
              <Button variant="ghost" size="sm" icon={<Share className="w-4 h-4" />}>
                Share
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Preview</Button>
              <Button variant="destructive" size="sm" icon={<Trash2 className="w-4 h-4" />}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Management</h3>
        <div className="space-y-4">
          {[
            { name: 'CS 101 Study Group', members: 15, status: 'Active', nextSession: 'Today 3:00 PM' },
            { name: 'Calculus Tutoring', members: 8, status: 'Scheduled', nextSession: 'Tomorrow 2:00 PM' },
            { name: 'Physics Lab Prep', members: 12, status: 'Full', nextSession: 'Friday 1:00 PM' },
          ].map((group, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-hive-emerald rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-hive-text-primary">{group.name}</h4>
                    <p className="text-sm text-hive-text-secondary">{group.members} members • {group.status}</p>
                    <p className="text-xs text-hive-text-mutedLight">Next: {group.nextSession}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {group.status === 'Active' && (
                    <>
                      <Button variant="primary" size="sm">Join Session</Button>
                      <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />} />
                    </>
                  )}
                  {group.status === 'Scheduled' && (
                    <>
                      <Button variant="secondary" size="sm">Set Reminder</Button>
                      <Button variant="ghost" size="sm" icon={<Calendar className="w-4 h-4" />} />
                    </>
                  )}
                  {group.status === 'Full' && (
                    <>
                      <Button variant="outline" size="sm" disabled>Join Waitlist</Button>
                      <Button variant="ghost" size="sm" icon={<Heart className="w-4 h-4" />} />
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Assignment Interface</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">CS 101 - Final Project</h4>
            <p className="text-hive-text-secondary mb-4">Build a web application using React and Node.js</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-hive-text-mutedLight">Due: December 15, 2024</span>
              <span className="px-2 py-1 bg-hive-gold/20 text-hive-gold rounded-full text-xs">In Progress</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Project Files</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <span className="text-hive-text-primary">project-proposal.pdf</span>
                  <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
                </div>
                <div className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg">
                  <span className="text-hive-text-primary">source-code.zip</span>
                  <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />} />
                </div>
              </div>
              
              <Button variant="secondary" fullWidth icon={<Upload className="w-4 h-4" />} className="mt-4">
                Upload New File
              </Button>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-3">Submission Status</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-hive-text-secondary">Proposal</span>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-hive-emerald" />
                    <span className="text-sm text-hive-emerald">Complete</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-hive-text-secondary">Code Implementation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-hive-gold rounded-full"></div>
                    <span className="text-sm text-hive-gold">In Progress</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-hive-text-secondary">Documentation</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-hive-text-mutedLight rounded-full"></div>
                    <span className="text-sm text-hive-text-mutedLight">Not Started</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">View Instructions</Button>
              <Button variant="ghost" size="sm">Ask Question</Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">Save Draft</Button>
              <Button variant="primary" size="sm">Submit Project</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Icon button variations
export const IconButtonVariations: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Icon Buttons</h3>
        <div className="flex gap-2">
          <Button size="icon" variant="primary">
            <Plus className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="secondary">
            <Settings className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <User className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="outline">
            <Search className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Buttons with Left Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Button icon={<Plus className="w-4 h-4" />} iconPosition="left">
            Add New
          </Button>
          <Button variant="secondary" icon={<Download className="w-4 h-4" />} iconPosition="left">
            Download
          </Button>
          <Button variant="ghost" icon={<Share className="w-4 h-4" />} iconPosition="left">
            Share
          </Button>
          <Button variant="outline" icon={<Filter className="w-4 h-4" />} iconPosition="left">
            Filter
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Buttons with Right Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Button icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            Continue
          </Button>
          <Button variant="secondary" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            Next Step
          </Button>
          <Button variant="ghost" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Interactive loading states
export const InteractiveLoadingStates: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const handleClick = (buttonId: string) => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
      }, 2000);
    };

    return (
      <div className="space-y-6 p-4">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Loading Demo</h3>
          <p className="text-hive-text-secondary mb-4">Click buttons to see loading states</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              loading={loadingStates.save}
              onClick={() => handleClick('save')}
              icon={<Save className="w-4 h-4" />}
            >
              {loadingStates.save ? 'Saving...' : 'Save Changes'}
            </Button>
            
            <Button 
              variant="secondary"
              loading={loadingStates.upload}
              onClick={() => handleClick('upload')}
              icon={<Upload className="w-4 h-4" />}
            >
              {loadingStates.upload ? 'Uploading...' : 'Upload File'}
            </Button>
            
            <Button 
              variant="outline"
              loading={loadingStates.process}
              onClick={() => handleClick('process')}
              icon={<Zap className="w-4 h-4" />}
            >
              {loadingStates.process ? 'Processing...' : 'Process Data'}
            </Button>
            
            <Button 
              variant="accent"
              loading={loadingStates.submit}
              onClick={() => handleClick('submit')}
              icon={<Check className="w-4 h-4" />}
            >
              {loadingStates.submit ? 'Submitting...' : 'Submit Form'}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Campus action buttons
export const CampusActionButtons: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Academic Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="primary" size="sm" fullWidth icon={<BookOpen className="w-4 h-4" />}>
            Study
          </Button>
          <Button variant="secondary" size="sm" fullWidth icon={<Users className="w-4 h-4" />}>
            Groups
          </Button>
          <Button variant="ghost" size="sm" fullWidth icon={<Calendar className="w-4 h-4" />}>
            Schedule
          </Button>
          <Button variant="outline" size="sm" fullWidth icon={<Star className="w-4 h-4" />}>
            Favorites
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Tool Management</h3>
        <div className="space-y-2">
          <Button variant="primary" fullWidth icon={<Plus className="w-4 h-4" />}>
            Create New Tool
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" fullWidth icon={<Edit className="w-4 h-4" />}>
              Edit Tool
            </Button>
            <Button variant="outline" fullWidth icon={<Share className="w-4 h-4" />}>
              Share Tool
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" icon={<Heart className="w-4 h-4" />}>
            Like
          </Button>
          <Button variant="ghost" size="sm" icon={<Share className="w-4 h-4" />}>
            Share
          </Button>
          <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
            Download
          </Button>
          <Button variant="ghost" size="sm" icon={<Settings className="w-4 h-4" />}>
            Settings
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    children: 'Interactive Button - Use controls to customize →',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
    fullWidth: false,
  },
};