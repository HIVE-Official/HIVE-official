import type { Meta, StoryObj } from '@storybook/react';
import { Separator, HorizontalSeparator, VerticalSeparator, GradientDivider } from '../../atomic/atoms/separator';
import { Card } from '../../atomic/molecules/card';

const meta: Meta<typeof Separator> = {
  title: '01-Atoms/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE separator component for dividing content sections with various styles and orientations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Separator orientation',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'gradient'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Separator thickness',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Margin spacing around separator',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether separator is decorative (affects accessibility)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="w-64">
      <p className="text-hive-text-primary">Content above</p>
      <Separator {...args} />
      <p className="text-hive-text-primary">Content below</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex items-center h-16">
      <span className="text-hive-text-primary">Left</span>
      <Separator {...args} />
      <span className="text-hive-text-primary">Right</span>
    </div>
  ),
};

// All orientations
export const AllOrientations: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Horizontal Separators</h3>
        <div className="w-80 space-y-4">
          <div>
            <p className="text-sm text-hive-text-secondary">Solid separator</p>
            <Separator variant="solid" />
            <p className="text-sm text-hive-text-secondary">Content continues</p>
          </div>
          
          <div>
            <p className="text-sm text-hive-text-secondary">Dashed separator</p>  
            <Separator variant="dashed" />
            <p className="text-sm text-hive-text-secondary">Content continues</p>
          </div>
          
          <div>
            <p className="text-sm text-hive-text-secondary">Dotted separator</p>
            <Separator variant="dotted" />
            <p className="text-sm text-hive-text-secondary">Content continues</p>
          </div>
          
          <div>
            <p className="text-sm text-hive-text-secondary">Gradient separator</p>
            <Separator variant="gradient" />
            <p className="text-sm text-hive-text-secondary">Content continues</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Vertical Separators</h3>
        <div className="flex items-center space-x-6 h-16">
          <span className="text-sm text-hive-text-secondary">Left</span>
          <Separator orientation="vertical" variant="solid" />
          <span className="text-sm text-hive-text-secondary">Center</span>
          <Separator orientation="vertical" variant="dashed" />
          <span className="text-sm text-hive-text-secondary">Right</span>
        </div>
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-6 w-96">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Solid</h3>
        <Separator variant="solid" />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Dashed</h3>
        <Separator variant="dashed" />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Dotted</h3>
        <Separator variant="dotted" />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Gradient</h3>
        <Separator variant="gradient" />
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-6 w-96">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Small (0.5px)</h3>
        <Separator size="sm" />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Medium (0.5px)</h3>
        <Separator size="md" />
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Large (0.75px)</h3>
        <Separator size="lg" />
      </div>
    </div>
  ),
};

// Spacing variations
export const SpacingVariations: Story = {
  render: () => (
    <div className="space-y-8 p-6 w-96">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Different Spacing Options</h3>
        
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <p className="text-sm text-hive-text-primary">Content with no spacing</p>
          <Separator spacing="none" />
          <p className="text-sm text-hive-text-primary">Immediately adjacent content</p>
          
          <p className="text-sm text-hive-text-primary mt-6">Content with small spacing</p>
          <Separator spacing="sm" />
          <p className="text-sm text-hive-text-primary">Small gap</p>
          
          <p className="text-sm text-hive-text-primary mt-6">Content with medium spacing</p>
          <Separator spacing="md" />
          <p className="text-sm text-hive-text-primary">Medium gap</p>
          
          <p className="text-sm text-hive-text-primary mt-6">Content with large spacing</p>
          <Separator spacing="lg" />
          <p className="text-sm text-hive-text-primary">Large gap</p>
        </div>
      </div>
    </div>
  ),
};

// Campus interface scenarios
export const CampusInterfaceScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Card</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary max-w-md">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
              <span className="text-hive-background-primary font-bold">AR</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-hive-text-primary">Alex Rodriguez</h3>
              <p className="text-hive-text-secondary">Computer Science Junior</p>
            </div>
          </div>
          
          <Separator spacing="md" />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-hive-text-secondary">Tools Built</span>
              <span className="text-sm font-medium text-hive-text-primary">7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-hive-text-secondary">Study Groups</span>
              <span className="text-sm font-medium text-hive-text-primary">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-hive-text-secondary">Campus Reputation</span>
              <span className="text-sm font-medium text-hive-gold">★ 4.8</span>
            </div>
          </div>
          
          <GradientDivider spacing="md" />
          
          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg text-sm hover:bg-hive-gold/90 transition-colors">
              Connect
            </button>
            <button className="flex-1 px-3 py-2 border border-hive-border-default text-hive-text-primary rounded-lg text-sm hover:bg-hive-interactive-hover transition-colors">
              Message
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Discovery Feed</h3>
        <div className="space-y-4 max-w-2xl">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-hive-emerald rounded-lg"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-hive-text-primary">GPA Calculator Pro</h4>
                    <span className="text-xs text-hive-text-mutedLight">2 hours ago</span>
                  </div>
                  <p className="text-sm text-hive-text-secondary mt-1">
                    Calculate your GPA with weighted courses and credit hours
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-hive-text-mutedLight">by Sarah Chen</span>
                    <VerticalSeparator spacing="none" />
                    <span className="text-xs text-hive-text-mutedLight">★ 4.7</span>
                    <VerticalSeparator spacing="none" />
                    <span className="text-xs text-hive-text-mutedLight">1.2k users</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Navigation Menu</h3>
        <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary p-4 max-w-xs">
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 text-sm text-hive-text-primary hover:bg-hive-interactive-hover rounded-lg transition-colors">
              Dashboard
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-hive-text-primary hover:bg-hive-interactive-hover rounded-lg transition-colors">
              My Spaces
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-hive-text-primary hover:bg-hive-interactive-hover rounded-lg transition-colors">
              Tools
            </a>
            
            <Separator variant="dashed" spacing="sm" />
            
            <a href="#" className="block px-3 py-2 text-sm text-hive-text-primary hover:bg-hive-interactive-hover rounded-lg transition-colors">
              Calendar
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-hive-text-primary hover:bg-hive-interactive-hover rounded-lg transition-colors">
              Messages
            </a>
            
            <Separator variant="gradient" spacing="sm" />
            
            <a href="#" className="block px-3 py-2 text-sm text-hive-text-secondary hover:bg-hive-interactive-hover rounded-lg transition-colors">
              Settings
            </a>
            <a href="#" className="block px-3 py-2 text-sm text-hive-text-secondary hover:bg-hive-interactive-hover rounded-lg transition-colors">
              Help
            </a>
          </nav>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Session Schedule</h3>
        <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary max-w-lg">
          <div className="p-4 border-b border-hive-border-subtle">
            <h4 className="font-semibold text-hive-text-primary">Today's Study Sessions</h4>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-hive-text-primary">CS 101 Review</p>
                <p className="text-sm text-hive-text-secondary">Library, Room 201</p>
              </div>
              <span className="text-sm text-hive-text-mutedLight">2:00 PM</span>
            </div>
            
            <HorizontalSeparator variant="dotted" spacing="none" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-hive-text-primary">Math Study Group</p>
                <p className="text-sm text-hive-text-secondary">Student Center, Room B</p>
              </div>
              <span className="text-sm text-hive-text-mutedLight">4:30 PM</span>
            </div>
            
            <HorizontalSeparator variant="dotted" spacing="none" />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-hive-text-primary">Physics Lab Prep</p>
                <p className="text-sm text-hive-text-secondary">Online via HIVE</p>
              </div>
              <span className="text-sm text-hive-text-mutedLight">7:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Layout and content organization
export const LayoutAndContentOrganization: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Dashboard Sections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-2">Quick Stats</h4>
            <Separator spacing="sm" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-hive-text-secondary">Active Tools</span>
                <span className="text-sm font-medium text-hive-text-primary">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-hive-text-secondary">Study Hours</span>
                <span className="text-sm font-medium text-hive-text-primary">12.5</span>
              </div>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-2">Recent Activity</h4>
            <Separator spacing="sm" />
            <div className="space-y-2">
              <p className="text-sm text-hive-text-secondary">Joined CS Study Group</p>
              <p className="text-sm text-hive-text-secondary">Built GPA Calculator</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Content Hierarchy</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <h4 className="text-xl font-bold text-hive-text-primary">Main Section</h4>
          <GradientDivider size="lg" spacing="lg" />
          
          <h5 className="text-lg font-semibold text-hive-text-primary">Subsection A</h5>
          <Separator variant="solid" spacing="md" />
          <p className="text-sm text-hive-text-secondary">Content for subsection A</p>
          
          <h5 className="text-lg font-semibold text-hive-text-primary mt-6">Subsection B</h5>
          <Separator variant="dashed" spacing="md" />
          <p className="text-sm text-hive-text-secondary">Content for subsection B</p>
          
          <div className="mt-6">
            <h6 className="font-medium text-hive-text-primary">Minor Section</h6>
            <Separator variant="dotted" spacing="sm" />
            <p className="text-xs text-hive-text-mutedLight">Minor details and information</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-md">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Preset Components</h3>
        
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary space-y-4">
          <p className="text-sm text-hive-text-primary">Content above horizontal separator</p>
          <HorizontalSeparator />
          <p className="text-sm text-hive-text-primary">Content below horizontal separator</p>
          
          <div className="flex items-center space-x-4 h-8">
            <span className="text-sm text-hive-text-primary">Left</span>
            <VerticalSeparator />
            <span className="text-sm text-hive-text-primary">Right</span>
          </div>
          
          <p className="text-sm text-hive-text-primary">Content above gradient divider</p>
          <GradientDivider />
          <p className="text-sm text-hive-text-primary">Content below gradient divider</p>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    variant: 'solid',
    orientation: 'horizontal',
    size: 'md',
    spacing: 'md',
  },
  render: (args) => (
    <div className="w-80">
      <p className="text-hive-text-primary">Content above separator</p>
      <Separator {...args} />
      <p className="text-hive-text-primary">Content below separator</p>
    </div>
  ),
};