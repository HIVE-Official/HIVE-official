import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, InfoTooltip, DarkTooltip, LightTooltip, ClickTooltip } from '../../atomic/atoms/tooltip';
import { HelpCircle, Info, Star, Settings, User, Calendar, BookOpen, Users, Zap, Shield } from 'lucide-react';

const meta: Meta<typeof Tooltip> = {
  title: '01-Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE tooltip component for providing contextual information and help text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: 'Trigger method',
    },
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
      description: 'Tooltip variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tooltip size',
    },
    delay: {
      control: { type: 'range', min: 0, max: 1000, step: 50 },
      description: 'Show delay in milliseconds',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointer',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable tooltip',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg">Hover me</button>,
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Click here to access your profile settings and preferences',
    children: (
      <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
        <HelpCircle className="w-5 h-5" />
      </button>
    ),
  },
};

// All placements
export const AllPlacements: Story = {
  render: () => (
    <div className="flex flex-col items-center justify-center space-y-8 p-12">
      <div className="flex items-center space-x-8">
        <Tooltip content="Left tooltip" placement="left">
          <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            Left
          </button>
        </Tooltip>
        
        <div className="flex flex-col space-y-4">
          <Tooltip content="Top tooltip" placement="top">
            <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Top
            </button>
          </Tooltip>
          
          <Tooltip content="Bottom tooltip" placement="bottom">
            <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Bottom
            </button>
          </Tooltip>
        </div>
        
        <Tooltip content="Right tooltip" placement="right">
          <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            Right
          </button>
        </Tooltip>
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center space-x-6 p-6">
      <Tooltip content="Default tooltip with standard styling" variant="default">
        <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Default
        </button>
      </Tooltip>
      
      <Tooltip content="Dark tooltip with high contrast" variant="dark">
        <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Dark
        </button>
      </Tooltip>
      
      <Tooltip content="Light tooltip with bright background" variant="light">
        <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Light
        </button>
      </Tooltip>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center space-x-6 p-6">
      <Tooltip content="Small tooltip" size="sm">
        <button className="px-3 py-1.5 text-sm bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Small
        </button>
      </Tooltip>
      
      <Tooltip content="Medium tooltip with more content space" size="md">
        <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Medium
        </button>
      </Tooltip>
      
      <Tooltip content="Large tooltip with even more content space for detailed explanations and longer text" size="lg">
        <button className="px-5 py-3 text-lg bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Large
        </button>
      </Tooltip>
    </div>
  ),
};

// Trigger methods
export const TriggerMethods: Story = {
  render: () => (
    <div className="flex items-center space-x-6 p-6">
      <Tooltip content="Appears on hover and focus" trigger="hover">
        <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
          Hover me
        </button>
      </Tooltip>
      
      <Tooltip content="Click to toggle visibility" trigger="click">
        <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
          Click me
        </button>
      </Tooltip>
      
      <Tooltip content="Focus to show tooltip" trigger="focus">
        <input 
          className="px-3 py-2 border border-hive-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold"
          placeholder="Focus me"
        />
      </Tooltip>
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Interface</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
              <span className="text-hive-background-primary font-bold">AR</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-hive-text-primary">Alex Rodriguez</h3>
                <Tooltip content="This user is a verified student at your university" size="sm">
                  <Shield className="w-4 h-4 text-hive-emerald" />
                </Tooltip>
                <Tooltip content="This student builds tools for the campus community" size="sm">
                  <Zap className="w-4 h-4 text-hive-gold" />
                </Tooltip>
              </div>
              <p className="text-hive-text-secondary">Computer Science Junior</p>
              <div className="flex items-center space-x-4 mt-2">
                <Tooltip content="View detailed academic information and course history" trigger="hover">
                  <button className="flex items-center space-x-1 text-sm text-hive-text-secondary hover:text-hive-text-primary">
                    <BookOpen className="w-4 h-4" />
                    <span>Academic Info</span>
                  </button>
                </Tooltip>
                <Tooltip content="See upcoming events and study sessions this user is attending" trigger="hover">
                  <button className="flex items-center space-x-1 text-sm text-hive-text-secondary hover:text-hive-text-primary">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule</span>
                  </button>
                </Tooltip>
                <Tooltip content="View shared spaces and communities" trigger="hover">
                  <button className="flex items-center space-x-1 text-sm text-hive-text-secondary hover:text-hive-text-primary">
                    <Users className="w-4 h-4" />
                    <span>Communities</span>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Interface</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium text-hive-text-primary">GPA Calculator Pro</h4>
            <div className="flex items-center space-x-2">
              <Tooltip content="This tool has been reviewed and approved by the HIVE team" size="sm" variant="dark">
                <div className="px-2 py-1 bg-hive-emerald text-white text-xs rounded">Verified</div>
              </Tooltip>
              <Tooltip content="Currently used by 1,247 students across campus" size="sm">
                <div className="px-2 py-1 bg-hive-surface-elevated text-hive-text-secondary text-xs rounded">Popular</div>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Tooltip 
              content={
                <div>
                  <p className="font-medium mb-1">Tool Settings</p>
                  <p className="text-xs opacity-90">Configure calculation methods, grading scales, and privacy settings</p>
                </div>
              }
              size="md"
              trigger="hover"
            >
              <button className="p-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </Tooltip>
            
            <Tooltip 
              content={
                <div>
                  <p className="font-medium mb-1">Rate this tool</p>
                  <p className="text-xs opacity-90">Help other students by rating this tool's usefulness and accuracy</p>
                </div>
              }
              size="md"
              trigger="hover"
            >
              <button className="flex items-center space-x-1 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <Star className="w-4 h-4" />
                <span className="text-sm">4.8</span>
              </button>
            </Tooltip>
            
            <Tooltip 
              content="Share this tool with your study group or save it to your personal toolkit"
              size="md"
              trigger="click"
              placement="bottom"
            >
              <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
                Add to Toolkit
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Space Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-hive-text-primary">CS 101 Study Group</h4>
              <Tooltip 
                content={
                  <div>
                    <p className="font-medium mb-1">Private Space</p>
                    <p className="text-xs opacity-90">Only invited members can access this study group</p>
                  </div>
                }
                size="sm"
                variant="dark"
              >
                <div className="w-2 h-2 bg-hive-ruby rounded-full"></div>
              </Tooltip>
            </div>
            <p className="text-sm text-hive-text-secondary mb-3">15 members • Next session: Tomorrow 3 PM</p>
            <Tooltip content="Join the upcoming study session" trigger="hover">
              <button className="w-full px-3 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors text-sm">
                Join Session
              </button>
            </Tooltip>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-hive-text-primary">Floor 3B Community</h4>
              <Tooltip 
                content={
                  <div>
                    <p className="font-medium mb-1">Open Community</p>
                    <p className="text-xs opacity-90">All floor residents can join and participate</p>
                  </div>
                }
                size="sm"
                variant="light"
              >
                <div className="w-2 h-2 bg-hive-emerald rounded-full"></div>
              </Tooltip>
            </div>
            <p className="text-sm text-hive-text-secondary mb-3">42 residents • Pizza night Friday!</p>
            <Tooltip content="RSVP for upcoming floor events" trigger="hover">
              <button className="w-full px-3 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors text-sm">
                View Events
              </button>
            </Tooltip>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-hive-text-primary">Tool Builders Hub</h4>
              <Tooltip 
                content={
                  <div>
                    <p className="font-medium mb-1">Invitation Only</p>
                    <p className="text-xs opacity-90">For students who create and maintain campus tools</p>
                  </div>
                }
                size="sm"
              >
                <div className="w-2 h-2 bg-hive-gold rounded-full"></div>
              </Tooltip>
            </div>
            <p className="text-sm text-hive-text-secondary mb-3">28 builders • 15 active projects</p>
            <Tooltip content="Browse tools in development and contribute to projects" trigger="hover">
              <button className="w-full px-3 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors text-sm">
                Explore Projects
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Help and information tooltips
export const HelpTooltips: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Form Help Text</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-hive-text-primary">Student ID</label>
            <Tooltip content="Your official university student identification number" size="sm">
              <HelpCircle className="w-4 h-4 text-hive-text-secondary" />
            </Tooltip>
          </div>
          <input 
            className="w-full px-3 py-2 border border-hive-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold"
            placeholder="Enter your student ID"
          />

          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-hive-text-primary">Privacy Level</label>
            <Tooltip 
              content={
                <div>
                  <p className="font-medium mb-2">Privacy Levels:</p>
                  <ul className="text-xs space-y-1 opacity-90">
                    <li>• <strong>Public:</strong> Visible to all students</li>
                    <li>• <strong>University:</strong> Only your university</li>
                    <li>• <strong>Connections:</strong> Only people you connect with</li>
                    <li>• <strong>Private:</strong> Hidden from search</li>
                  </ul>
                </div>
              }
              size="lg"
              trigger="click"
            >
              <Info className="w-4 h-4 text-hive-text-secondary cursor-pointer" />
            </Tooltip>
          </div>
          <select className="w-full px-3 py-2 border border-hive-border-default rounded-lg focus:outline-none focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold">
            <option>Public</option>
            <option>University Only</option>
            <option>Connections Only</option>
            <option>Private</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Feature Explanations</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-hive-border-subtle rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-hive-gold rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-hive-background-primary" />
              </div>
              <div>
                <p className="font-medium text-hive-text-primary">Ghost Mode</p>
                <p className="text-sm text-hive-text-secondary">Hide your activity</p>
              </div>
            </div>
            <Tooltip
              content={
                <div>
                  <p className="font-medium mb-2">Ghost Mode</p>
                  <p className="text-xs opacity-90 mb-2">When enabled, other students cannot see:</p>
                  <ul className="text-xs space-y-1 opacity-90">
                    <li>• Your online status</li>
                    <li>• When you were last active</li>
                    <li>• What tools you're currently using</li>
                    <li>• Your participation in study sessions</li>
                  </ul>
                  <p className="text-xs opacity-90 mt-2">Your profile and tools remain visible.</p>
                </div>
              }
              size="lg"
              placement="left"
              trigger="click"
            >
              <button className="p-1 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>

          <div className="flex items-center justify-between p-3 border border-hive-border-subtle rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-hive-emerald rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-hive-text-primary">Auto-join Spaces</p>
                <p className="text-sm text-hive-text-secondary">Join relevant communities</p>
              </div>
            </div>
            <Tooltip
              content={
                <div>
                  <p className="font-medium mb-2">Auto-join Spaces</p>
                  <p className="text-xs opacity-90 mb-2">Automatically join spaces for:</p>
                  <ul className="text-xs space-y-1 opacity-90">
                    <li>• Your residence hall floor</li>
                    <li>• Your academic major</li>
                    <li>• Your enrolled courses</li>
                    <li>• Campus clubs you're in</li>
                  </ul>
                  <p className="text-xs opacity-90 mt-2">You can always leave spaces later.</p>
                </div>
              }
              size="lg"
              placement="left"
              trigger="hover"
            >
              <button className="p-1 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="flex items-center space-x-6 p-6">
      <InfoTooltip content="Standard information tooltip">
        <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Info Tooltip
        </button>
      </InfoTooltip>
      
      <DarkTooltip content="Dark variant for high contrast">
        <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Dark Tooltip
        </button>
      </DarkTooltip>
      
      <LightTooltip content="Light variant for bright backgrounds">
        <button className="px-4 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
          Light Tooltip
        </button>
      </LightTooltip>
      
      <ClickTooltip content="Click to show/hide this tooltip">
        <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
          Click Tooltip
        </button>
      </ClickTooltip>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    content: 'Interactive tooltip - Use controls to customize →',
    children: (
      <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
        Hover me
      </button>
    ),
  },
};