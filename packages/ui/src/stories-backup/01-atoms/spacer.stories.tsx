import type { Meta, StoryObj } from '@storybook/react';
import { Spacer, VerticalSpacer, HorizontalSpacer, FlexibleSpacer, ResponsiveSpacer, TinySpacer, SmallSpacer, MediumSpacer, LargeSpacer, ExtraLargeSpacer, HugeSpacer, VerticalGap, HorizontalGap } from '../../atomic/atoms/spacer';

const meta: Meta<typeof Spacer> = {
  title: '01-Atoms/Spacer',
  component: Spacer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE spacer component for consistent spacing and layout control with fixed sizes, flexible behavior, and responsive options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Spacer size',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical', 'both'],
      description: 'Spacing direction',
    },
    responsive: {
      control: 'boolean',
      description: 'Enable responsive scaling',
    },
    flexible: {
      control: 'boolean',
      description: 'Use flex-grow instead of fixed size',
    },
    debug: {
      control: 'boolean',
      description: 'Show visual debug overlay',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    size: 'md',
    direction: 'vertical',
    debug: true,
  },
  render: (args) => (
    <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 max-w-sm">
      <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">
        Content Above
      </div>
      <Spacer {...args} />
      <div className="bg-hive-emerald text-white p-2 text-center text-sm">
        Content Below
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  args: {
    size: 'lg',
    direction: 'horizontal',
    debug: true,
  },
  render: (args) => (
    <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 flex items-center">
      <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">
        Left
      </div>
      <Spacer {...args} />
      <div className="bg-hive-emerald text-white p-2 text-center text-sm">
        Right
      </div>
    </div>
  ),
};

export const Flexible: Story = {
  args: {
    flexible: true,
    direction: 'horizontal',
    debug: true,
  },
  render: (args) => (
    <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 flex items-center w-96">
      <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">
        Left Content
      </div>
      <Spacer {...args} />
      <div className="bg-hive-emerald text-white p-2 text-center text-sm">
        Right Content
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-md">
      <h3 className="text-lg font-semibold text-hive-text-primary">Vertical Spacer Sizes</h3>
      
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
        <div key={size} className="border border-hive-border-subtle bg-hive-background-secondary p-2">
          <div className="bg-hive-surface-elevated p-2 text-center text-sm text-hive-text-primary">
            Size: {size}
          </div>
          <Spacer size={size} direction="vertical" debug />
          <div className="bg-hive-surface-elevated p-2 text-center text-sm text-hive-text-primary">
            Content Below
          </div>
        </div>
      ))}
    </div>
  ),
};

// All directions
export const AllDirections: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Vertical Spacing</h3>
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 max-w-sm">
          <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">
            First Block
          </div>
          <Spacer size="lg" direction="vertical" debug />
          <div className="bg-hive-emerald text-white p-2 text-center text-sm">
            Second Block
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Horizontal Spacing</h3>
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 flex items-center">
          <div className="bg-hive-sapphire text-white p-2 text-center text-sm">
            Left Block
          </div>
          <Spacer size="lg" direction="horizontal" debug />
          <div className="bg-hive-ruby text-white p-2 text-center text-sm">
            Right Block
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Both Directions</h3>
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 flex">
          <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">
            Corner Block
          </div>
          <Spacer size="xl" direction="both" debug />
          <div className="bg-hive-emerald text-white p-2 text-center text-sm">
            Opposite Corner
          </div>
        </div>
      </div>
    </div>
  ),
};

// Campus layout scenarios
export const CampusLayoutScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Card Layout</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary max-w-md">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
              <span className="text-hive-background-primary font-bold text-lg">AR</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-hive-text-primary">Alex Rodriguez</h3>
              <p className="text-hive-text-secondary">Computer Science Junior</p>
            </div>
          </div>
          
          <VerticalSpacer size="lg" />
          
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
              <span className="text-sm text-hive-text-secondary">Campus Rep</span>
              <span className="text-sm font-medium text-hive-gold">★ 4.8</span>
            </div>
          </div>
          
          <VerticalSpacer size="xl" />
          
          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Connect
            </button>
            <button className="flex-1 px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Message
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Dashboard Layout</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-hive-text-primary">My Tools</h4>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Create New Tool
            </button>
          </div>
          
          <VerticalSpacer size="lg" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-primary">
                <div className="w-12 h-12 bg-hive-sapphire rounded-lg mb-3"></div>
                <h5 className="font-semibold text-hive-text-primary mb-1">Tool {index + 1}</h5>
                <p className="text-sm text-hive-text-secondary mb-3">Description of the tool functionality</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-hive-text-mutedLight">★ 4.{index + 6}</span>
                  <span className="text-xs text-hive-text-mutedLight">{120 + index * 50} users</span>
                </div>
              </div>
            ))}
          </div>
          
          <VerticalSpacer size="2xl" />
          
          <div className="text-center">
            <h5 className="font-semibold text-hive-text-primary mb-2">Need help building tools?</h5>
            <p className="text-sm text-hive-text-secondary mb-4">
              Check out our comprehensive guide to get started with tool development
            </p>
            <button className="px-6 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              View Documentation
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Space Navigation</h3>
        <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <div className="p-6 border-b border-hive-border-subtle">
            <h4 className="text-lg font-semibold text-hive-text-primary">CS 101 Study Group</h4>
            <p className="text-hive-text-secondary">Final exam preparation session</p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-hive-emerald rounded-full"></div>
                <span className="text-sm text-hive-text-secondary">15 active members</span>
              </div>
              
              <HorizontalSpacer size="sm" />
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-hive-gold rounded-full"></div>
                <span className="text-sm text-hive-text-secondary">Next session: Tomorrow 3 PM</span>
              </div>
            </div>
            
            <VerticalSpacer size="md" />
            
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                Join Session
              </button>
              
              <HorizontalSpacer size="xs" />
              
              <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
                View Schedule
              </button>
              
              <FlexibleSpacer direction="horizontal" />
              
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Course Schedule Layout</h3>
        <div className="border border-hive-border-subtle rounded-lg bg-hive-background-secondary">
          <div className="p-4 border-b border-hive-border-subtle bg-hive-surface-elevated">
            <h4 className="font-semibold text-hive-text-primary">Today's Schedule</h4>
          </div>
          
          <div className="p-4 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <div className="flex items-center justify-between p-3 border border-hive-border-subtle rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-hive-text-primary">
                        {9 + index * 2}:00
                      </div>
                      <div className="text-xs text-hive-text-mutedLight">AM</div>
                    </div>
                    
                    <HorizontalSpacer size="md" />
                    
                    <div>
                      <h5 className="font-medium text-hive-text-primary">
                        CS {101 + index * 100}
                      </h5>
                      <p className="text-sm text-hive-text-secondary">
                        {['Intro to Programming', 'Data Structures', 'Algorithms', 'Software Engineering'][index]}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-hive-text-secondary">Room {201 + index}</div>
                    <div className="text-xs text-hive-text-mutedLight">Building A</div>
                  </div>
                </div>
                
                {index < 3 && <VerticalSpacer size="sm" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// Flexible spacer examples
export const FlexibleSpacerExamples: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Navigation Bar with Flexible Spacing</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="flex items-center">
            <div className="bg-hive-gold text-hive-background-primary px-3 py-2 rounded font-semibold">
              HIVE
            </div>
            
            <HorizontalSpacer size="lg" />
            
            <nav className="flex items-center space-x-4">
              <a href="#" className="text-hive-text-primary hover:text-hive-gold transition-colors">Dashboard</a>
              <a href="#" className="text-hive-text-primary hover:text-hive-gold transition-colors">Tools</a>
              <a href="#" className="text-hive-text-primary hover:text-hive-gold transition-colors">Spaces</a>
            </nav>
            
            <FlexibleSpacer direction="horizontal" debug />
            
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm border border-hive-border-default text-hive-text-primary rounded hover:bg-hive-interactive-hover transition-colors">
                Login
              </button>
              <button className="px-3 py-1 text-sm bg-hive-emerald text-white rounded hover:bg-hive-emerald/90 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Card Layout with Push-to-Bottom</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary h-80 flex flex-col">
          <h4 className="text-lg font-semibold text-hive-text-primary">Tool Statistics</h4>
          <p className="text-hive-text-secondary">Overview of your tool performance</p>
          
          <VerticalSpacer size="lg" />
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-gold">1.2k</div>
              <div className="text-sm text-hive-text-secondary">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-emerald">4.8</div>
              <div className="text-sm text-hive-text-secondary">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-hive-sapphire">95%</div>
              <div className="text-sm text-hive-text-secondary">Uptime</div>
            </div>
          </div>
          
          <FlexibleSpacer direction="vertical" debug />
          
          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              View Details
            </button>
            <button className="flex-1 px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Responsive spacing
export const ResponsiveSpacing: Story = {
  render: () => (
    <div className="space-y-6 p-4 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Responsive Vertical Spacing</h3>
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4">
          <div className="bg-hive-gold text-hive-background-primary p-4 text-center">
            Content Block 1
          </div>
          
          <ResponsiveSpacer size="md" direction="vertical" debug />
          
          <div className="bg-hive-emerald text-white p-4 text-center">
            Content Block 2
          </div>
          
          <p className="text-xs text-hive-text-mutedLight mt-4">
            Resize your browser to see responsive spacing changes
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Responsive Layout</h3>
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4">
          <div className="flex flex-col md:flex-row items-start">
            <div className="bg-hive-sapphire text-white p-4 text-center w-full md:w-48">
              Sidebar Content
            </div>
            
            <ResponsiveSpacer size="lg" direction="horizontal" debug />
            
            <div className="bg-hive-ruby text-white p-4 text-center flex-1">
              Main Content Area
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Debug visualization
export const DebugVisualization: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Debug Mode Visualization</h3>
        <p className="text-sm text-hive-text-secondary mb-4">
          Debug mode shows spacer boundaries and labels for development purposes
        </p>
        
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 max-w-md">
          <div className="bg-hive-surface-elevated p-3 text-center text-hive-text-primary">
            Header Content
          </div>
          
          <Spacer size="xs" debug />
          <Spacer size="sm" debug />
          <Spacer size="md" debug />
          <Spacer size="lg" debug />
          <Spacer size="xl" debug />
          
          <div className="bg-hive-surface-elevated p-3 text-center text-hive-text-primary">
            Footer Content
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Horizontal Debug Spacing</h3>
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 flex items-center">
          <div className="bg-hive-surface-elevated p-3 text-center text-hive-text-primary">
            Left
          </div>
          
          <Spacer size="xs" direction="horizontal" debug />
          <Spacer size="md" direction="horizontal" debug />
          <Spacer size="xl" direction="horizontal" debug />
          
          <div className="bg-hive-surface-elevated p-3 text-center text-hive-text-primary">
            Right
          </div>
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Direction Presets</h3>
        <div className="space-y-4">
          <div className="border border-hive-border-subtle bg-hive-background-secondary p-4">
            <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">Above</div>
            <VerticalSpacer size="lg" debug />
            <div className="bg-hive-emerald text-white p-2 text-center text-sm">Below</div>
          </div>
          
          <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 flex items-center">
            <div className="bg-hive-sapphire text-white p-2 text-center text-sm">Left</div>
            <HorizontalSpacer size="lg" debug />
            <div className="bg-hive-ruby text-white p-2 text-center text-sm">Right</div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Size Presets</h3>
        <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 space-y-2">
          <div className="bg-hive-surface-elevated p-2 text-center text-sm text-hive-text-primary">Content</div>
          <TinySpacer debug />
          <div className="bg-hive-surface-elevated p-2 text-center text-sm text-hive-text-primary">Tiny Gap</div>
          <SmallSpacer debug />
          <div className="bg-hive-surface-elevated p-2 text-center text-sm text-hive-text-primary">Small Gap</div>
          <MediumSpacer debug />
          <div className="bg-hive-surface-elevated p-2 text-center text-sm text-hive-text-primary">Medium Gap</div>
          <LargeSpacer debug />
          <div className="bg-hive-surface-elevated p-2 text-center text-sm text-hive-text-primary">Large Gap</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Convenience Presets</h3>
        <div className="space-y-4">
          <div className="border border-hive-border-subtle bg-hive-background-secondary p-4">
            <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">Above</div>
            <VerticalGap.lg />
            <div className="bg-hive-emerald text-white p-2 text-center text-sm">Below</div>
          </div>
          
          <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 flex items-center">
            <div className="bg-hive-sapphire text-white p-2 text-center text-sm">Left</div>
            <HorizontalGap.xl />
            <div className="bg-hive-ruby text-white p-2 text-center text-sm">Right</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    size: 'md',
    direction: 'vertical',
    responsive: false,
    flexible: false,
    debug: true,
  },
  render: (args) => (
    <div className="border border-hive-border-subtle bg-hive-background-secondary p-4 max-w-sm">
      <div className="bg-hive-gold text-hive-background-primary p-2 text-center text-sm">
        Content Above
      </div>
      <Spacer {...args} />
      <div className="bg-hive-emerald text-white p-2 text-center text-sm">
        Content Below
      </div>
    </div>
  ),
};