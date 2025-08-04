import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '../../atomic/atoms/link';
import { ExternalLink, ArrowRight, Download, Share, Calendar, BookOpen, Users, Settings, HelpCircle } from 'lucide-react';

const meta: Meta<typeof Link> = {
  title: '01-Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE link component for navigation with various styles, external link support, and campus-specific use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'underline', 'button'],
      description: 'Link visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Link size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'gold', 'muted'],
      description: 'Link color theme',
    },
    external: {
      control: 'boolean',
      description: 'External link (opens in new tab)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    href: {
      control: 'text',
      description: 'Link destination',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    href: '#',
    children: 'Default Link',
  },
};

export const Ghost: Story = {
  args: {
    href: '#',
    variant: 'ghost',
    children: 'Ghost Link',
  },
};

export const Underline: Story = {
  args: {
    href: '#',
    variant: 'underline',
    children: 'Underlined Link',
  },
};

export const Button: Story = {
  args: {
    href: '#',
    variant: 'button',
    children: 'Button Link',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    children: 'External Link',
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Link Variants</h3>
        <div className="flex flex-wrap gap-6">
          <Link href="#" variant="default">Default Link</Link>
          <Link href="#" variant="ghost">Ghost Link</Link>
          <Link href="#" variant="underline">Underlined Link</Link>
          <Link href="#" variant="button">Button Link</Link>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">External Links</h3>
        <div className="flex flex-wrap gap-6">
          <Link href="https://example.com" external>External Default</Link>
          <Link href="https://example.com" variant="ghost" external>External Ghost</Link>
          <Link href="https://example.com" variant="underline" external>External Underlined</Link>
          <Link href="https://example.com" variant="button" external>External Button</Link>
        </div>
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-6">
        <Link href="#" size="sm">Small Link</Link>
        <Link href="#" size="md">Medium Link</Link>
        <Link href="#" size="lg">Large Link</Link>
      </div>
      
      <div className="flex items-center gap-6">
        <Link href="#" variant="button" size="sm">Small Button</Link>
        <Link href="#" variant="button" size="md">Medium Button</Link>
        <Link href="#" variant="button" size="lg">Large Button</Link>
      </div>
    </div>
  ),
};

// All colors
export const AllColors: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap gap-6">
        <Link href="#" color="primary">Primary Color</Link>
        <Link href="#" color="secondary">Secondary Color</Link>
        <Link href="#" color="gold">Gold Color</Link>
        <Link href="#" color="muted">Muted Color</Link>
      </div>
    </div>
  ),
};

// Campus navigation scenarios
export const CampusNavigationScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Main Navigation</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <nav className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-hive-gold rounded-lg"></div>
              <span className="font-bold text-hive-text-primary">HIVE</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link href="/dashboard" variant="ghost">Dashboard</Link>
              <Link href="/tools" variant="ghost">Tools</Link>
              <Link href="/spaces" variant="ghost">Spaces</Link>
              <Link href="/calendar" variant="ghost">Calendar</Link>
            </div>
            
            <div className="flex-1"></div>
            
            <div className="flex items-center space-x-4">
              <Link href="/settings" variant="ghost" size="sm">Settings</Link>
              <Link href="/help" variant="ghost" size="sm">Help</Link>
              <Link href="/profile" variant="button" size="sm">Profile</Link>
            </div>
          </nav>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Profile Links</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary max-w-md">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-hive-gold rounded-full flex items-center justify-center">
              <span className="text-hive-background-primary font-bold text-lg">AR</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-hive-text-primary">Alex Rodriguez</h3>
              <p className="text-hive-text-secondary">Computer Science Junior</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-hive-text-secondary">Academic Profile</span>
              <Link href="/profile/academic" variant="ghost" size="sm">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-hive-text-secondary">Study Groups</span>
              <Link href="/profile/groups" variant="ghost" size="sm">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Manage Groups</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-hive-text-secondary">Built Tools</span>
              <Link href="/profile/tools" variant="ghost" size="sm">
                <div className="flex items-center space-x-1">
                  <Settings className="w-4 h-4" />
                  <span>View Tools</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-hive-border-subtle">
            <Link href="/profile/edit" variant="button" className="w-full justify-center">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Discovery</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'GPA Calculator Pro',
              description: 'Calculate your weighted GPA with ease',
              users: '1.2k users',
              rating: '4.8',
              category: 'Academic'
            },
            {
              name: 'Study Session Planner',
              description: 'Plan and coordinate group study sessions',
              users: '847 users', 
              rating: '4.7',
              category: 'Productivity'
            }
          ].map((tool, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-hive-emerald rounded-lg"></div>
                  <div>
                    <h4 className="font-semibold text-hive-text-primary">{tool.name}</h4>
                    <p className="text-sm text-hive-text-secondary">{tool.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-hive-text-mutedLight mb-4">
                <span>{tool.users}</span>
                <span>★ {tool.rating}</span>
                <span>{tool.category}</span>
              </div>
              
              <div className="flex space-x-2">
                <Link href={`/tools/${index + 1}/preview`} variant="button" size="sm" className="flex-1 justify-center">
                  Preview
                </Link>
                <Link href={`/tools/${index + 1}/use`} variant="ghost" size="sm" className="flex items-center space-x-1">
                  <span>Use Tool</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Space Links</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-hive-text-primary">CS 101 Study Group</h4>
              <p className="text-sm text-hive-text-secondary">Final exam preparation • 15 members</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/spaces/cs101/settings" variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Link>
              <Link href="/spaces/cs101/share" variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/spaces/cs101/chat" variant="ghost" size="sm" className="flex flex-col items-center p-3 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover">
              <Users className="w-5 h-5 mb-1" />
              <span>Chat</span>
            </Link>
            <Link href="/spaces/cs101/schedule" variant="ghost" size="sm" className="flex flex-col items-center p-3 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover">
              <Calendar className="w-5 h-5 mb-1" />
              <span>Schedule</span>
            </Link>
            <Link href="/spaces/cs101/resources" variant="ghost" size="sm" className="flex flex-col items-center p-3 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover">
              <BookOpen className="w-5 h-5 mb-1" />
              <span>Resources</span>
            </Link>
            <Link href="/spaces/cs101/tools" variant="ghost" size="sm" className="flex flex-col items-center p-3 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover">
              <Settings className="w-5 h-5 mb-1" />
              <span>Tools</span>
            </Link>
          </div>
          
          <div className="mt-4 pt-4 border-t border-hive-border-subtle flex space-x-3">
            <Link href="/spaces/cs101/join-session" variant="button" size="sm">
              Join Next Session
            </Link>
            <Link href="/spaces/cs101/leave" variant="ghost" size="sm" color="muted">
              Leave Group
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">External Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">Academic Resources</h4>
            <div className="space-y-2">
              <Link href="https://university.edu/library" external variant="ghost" size="sm">
                University Library
              </Link>
              <Link href="https://university.edu/registrar" external variant="ghost" size="sm">
                Registrar Office
              </Link>
              <Link href="https://university.edu/career-services" external variant="ghost" size="sm">
                Career Services
              </Link>
              <Link href="https://university.edu/tutoring" external variant="ghost" size="sm">
                Tutoring Center
              </Link>
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">Development Resources</h4>
            <div className="space-y-2">
              <Link href="https://github.com" external variant="ghost" size="sm">
                GitHub Repository
              </Link>
              <Link href="https://stackoverflow.com" external variant="ghost" size="sm">
                Stack Overflow
              </Link>
              <Link href="https://developer.mozilla.org" external variant="ghost" size="sm">
                MDN Web Docs
              </Link>
              <Link href="https://nodejs.org" external variant="ghost" size="sm">
                Node.js Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Action links with icons
export const ActionLinksWithIcons: Story = {
  render: () => (
    <div className="space-y-8 p-6 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Tool Actions</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-hive-text-primary">GPA Calculator Pro</h4>
              <p className="text-sm text-hive-text-secondary">Calculate your weighted GPA</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/gpa-calc/run" variant="button" size="sm">
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4" />
                <span>Use Tool</span>
              </div>
            </Link>
            
            <Link href="/tools/gpa-calc/download" variant="ghost" size="sm">
              <div className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </div>
            </Link>
            
            <Link href="/tools/gpa-calc/share" variant="ghost" size="sm">
              <div className="flex items-center space-x-2">
                <Share className="w-4 h-4" />
                <span>Share</span>
              </div>
            </Link>
            
            <Link href="https://github.com/user/gpa-calc" external variant="ghost" size="sm">
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>View Source</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/calendar" variant="ghost" className="flex flex-col items-center p-4 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            <Calendar className="w-8 h-8 mb-2 text-hive-gold" />
            <span className="text-sm font-medium">Calendar</span>
            <span className="text-xs text-hive-text-mutedLight">View schedule</span>
          </Link>
          
          <Link href="/tools" variant="ghost" className="flex flex-col items-center p-4 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            <Settings className="w-8 h-8 mb-2 text-hive-emerald" />
            <span className="text-sm font-medium">Tools</span>
            <span className="text-xs text-hive-text-mutedLight">Browse tools</span>
          </Link>
          
          <Link href="/spaces" variant="ghost" className="flex flex-col items-center p-4 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            <Users className="w-8 h-8 mb-2 text-hive-sapphire" />
            <span className="text-sm font-medium">Spaces</span>
            <span className="text-xs text-hive-text-mutedLight">Study groups</span>
          </Link>
          
          <Link href="/help" variant="ghost" className="flex flex-col items-center p-4 border border-hive-border-subtle rounded-lg hover:bg-hive-interactive-hover transition-colors">
            <HelpCircle className="w-8 h-8 mb-2 text-hive-ruby" />
            <span className="text-sm font-medium">Help</span>
            <span className="text-xs text-hive-text-mutedLight">Get support</span>
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Breadcrumb Navigation</h3>
        <nav className="flex items-center space-x-2 text-sm">
          <Link href="/" variant="ghost" size="sm" color="muted">Home</Link>
          <span className="text-hive-text-mutedLight">/</span>
          <Link href="/tools" variant="ghost" size="sm" color="muted">Tools</Link>
          <span className="text-hive-text-mutedLight">/</span>
          <Link href="/tools/academic" variant="ghost" size="sm" color="muted">Academic</Link>
          <span className="text-hive-text-mutedLight">/</span>
          <span className="text-hive-text-primary font-medium">GPA Calculator</span>
        </nav>
      </div>
    </div>
  ),
};

// Link states
export const LinkStates: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive States</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <Link href="#" variant="default">Normal State</Link>
            <Link href="#" variant="default" className="hover:text-blue-300">Hover State</Link>
            <Link href="#" variant="default" className="active:text-blue-500">Active State</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="#" variant="button">Normal Button</Link>
            <Link href="#" variant="button" className="hover:bg-blue-500">Hover Button</Link>
            <Link href="#" variant="button" className="active:bg-blue-700">Active Button</Link>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Disabled States</h3>
        <div className="flex flex-wrap gap-6">
          <Link disabled>Disabled Default</Link>
          <Link disabled variant="ghost">Disabled Ghost</Link>
          <Link disabled variant="underline">Disabled Underlined</Link>
          <Link disabled variant="button">Disabled Button</Link>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Focus States</h3>
        <p className="text-sm text-hive-text-secondary mb-3">
          Tab through these links to see focus indicators:
        </p>
        <div className="flex flex-wrap gap-6">
          <Link href="#" variant="default">Focusable Link 1</Link>
          <Link href="#" variant="ghost">Focusable Link 2</Link>
          <Link href="#" variant="underline">Focusable Link 3</Link>
          <Link href="#" variant="button">Focusable Link 4</Link>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    href: '#',
    children: 'Interactive Link - Use controls to customize →',
    variant: 'default',
    size: 'md',
    external: false,
    disabled: false,
  },
};