import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from '../../components/AppHeader';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Avatar } from '../../components/avatar';
import { Badge } from '../../components/badge';
import { Settings, User } from 'lucide-react';

const meta = {
  title: 'Components/AppHeader',
  component: AppHeader.Root,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE AppHeader System

Clean, modular header system for tech social platform with minimal gold usage.

## Design Principles:
- **Modular Composition**: Mix and match header components
- **Clean Social Feel**: Tech platform aesthetic with subtle interactions
- **Minimal Gold**: Gold only for accent states and notifications
- **Responsive**: Works seamlessly on mobile and desktop

## Components:
- **AppHeader.Root**: Main container with variant support
- **AppHeader.Content**: Content wrapper with container constraints
- **AppHeader.Logo**: Logo section with hover animations
- **AppHeader.Nav**: Navigation items container
- **AppHeader.Actions**: Action buttons container
- **AppHeader.Search**: Modern search component with command palette style
- **AppHeader.MenuButton**: Mobile menu toggle
- **AppHeader.Notifications**: Notification button with badge

## Variants:
- **Default**: Standard header with backdrop blur
- **Minimal**: Cleaner look with conditional backgrounds
- **Floating**: Floating pill header for special layouts
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'floating'],
    },
    transparent: {
      control: 'boolean',
    },
    hideOnScroll: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof AppHeader.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <AppHeader.Content>
        <AppHeader.Logo>
          <h1 className="text-xl font-bold text-white">HIVE</h1>
        </AppHeader.Logo>
        
        <AppHeader.Nav className="hidden md:flex">
          <Button variant="ghost" size="sm">Spaces</Button>
          <Button variant="ghost" size="sm">Feed</Button>
          <Button variant="ghost" size="sm">Tools</Button>
        </AppHeader.Nav>
        
        <AppHeader.Actions>
          <AppHeader.Search placeholder="Search campus..." />
          <AppHeader.Notifications count={3} />
          <Avatar className="w-8 h-8" />
          <AppHeader.MenuButton />
        </AppHeader.Actions>
      </AppHeader.Content>
    ),
  },
};

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    transparent: true,
    children: (
      <AppHeader.Content>
        <AppHeader.Logo>
          <h1 className="text-xl font-bold text-white">HIVE</h1>
        </AppHeader.Logo>
        
        <AppHeader.Actions>
          <AppHeader.Search variant="minimal" placeholder="Search..." />
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>
          <Avatar className="w-8 h-8" />
        </AppHeader.Actions>
      </AppHeader.Content>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black">
      <div className="space-y-8 pb-20">
        {/* Default Header */}
        <div className="space-y-4">
          <div className="px-6 pt-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Default Header</h2>
            <p className="text-white/60">Standard header with backdrop blur and border</p>
          </div>
          
          <AppHeader.Root variant="primary">
            <AppHeader.Content>
              <AppHeader.Logo>
                <h1 className="text-xl font-bold text-white">HIVE</h1>
              </AppHeader.Logo>
              
              <AppHeader.Nav className="hidden md:flex">
                <Button variant="ghost" size="sm">Dashboard</Button>
                <Button variant="ghost" size="sm">Spaces</Button>
                <Button variant="ghost" size="sm">Feed</Button>
                <Button variant="ghost" size="sm">Tools</Button>
              </AppHeader.Nav>
              
              <AppHeader.Actions>
                <AppHeader.Search placeholder="Search campus..." />
                <AppHeader.Notifications count={3} />
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                <Avatar className="w-8 h-8" />
                <AppHeader.MenuButton />
              </AppHeader.Actions>
            </AppHeader.Content>
          </AppHeader.Root>
          
          <div className="px-6 py-8">
            <div className="max-w-4xl space-y-4">
              <h3 className="text-lg font-semibold text-white">Campus Dashboard</h3>
              <p className="text-white/70">
                Welcome back! Your campus has 247 active students across 12 spaces today.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i: any) => (
                  <div key={i} className="border border-white/10 rounded-xl p-4">
                    <h4 className="font-medium text-white mb-2">Space {i}</h4>
                    <p className="text-sm text-white/60">Active community with great discussions</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Header */}
        <div className="space-y-4">
          <div className="px-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Minimal Header</h2>
            <p className="text-white/60">Clean look with conditional background</p>
          </div>
          
          <AppHeader.Root variant="minimal" transparent>
            <AppHeader.Content>
              <AppHeader.Logo>
                <h1 className="text-xl font-bold text-white">HIVE</h1>
              </AppHeader.Logo>
              
              <AppHeader.Actions>
                <AppHeader.Search variant="minimal" placeholder="Search..." />
                <AppHeader.Notifications showDot />
                <Avatar className="w-8 h-8" />
              </AppHeader.Actions>
            </AppHeader.Content>
          </AppHeader.Root>
          
          <div className="px-6 py-8">
            <div className="max-w-2xl space-y-4">
              <h3 className="text-lg font-semibold text-white">Clean Interface</h3>
              <p className="text-white/70">
                Perfect for content-focused layouts where the header should stay out of the way.
              </p>
            </div>
          </div>
        </div>

        {/* Floating Header */}
        <div className="space-y-4 relative">
          <div className="px-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Floating Header</h2>
            <p className="text-white/60">Floating pill design for special layouts</p>
          </div>
          
          <AppHeader.Root variant="floating">
            <AppHeader.Content className="px-6">
              <AppHeader.Logo>
                <h1 className="text-lg font-bold text-white">HIVE</h1>
              </AppHeader.Logo>
              
              <AppHeader.Nav className="hidden md:flex">
                <Button variant="ghost" size="sm">Home</Button>
                <Button variant="ghost" size="sm">Explore</Button>
              </AppHeader.Nav>
              
              <AppHeader.Actions>
                <AppHeader.Search variant="command" placeholder="Quick search..." />
                <Avatar className="w-8 h-8" />
              </AppHeader.Actions>
            </AppHeader.Content>
          </AppHeader.Root>
          
          <div className="px-6 py-8 pt-20">
            <div className="max-w-2xl space-y-4">
              <h3 className="text-lg font-semibold text-white">Floating Design</h3>
              <p className="text-white/70">
                Ideal for landing pages or special layouts where you want the header to feel more like a component than a fixed element.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SearchVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Search Component Variants</h1>
          <p className="text-white/60">Different styles for different header layouts</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Chip Style (Default)</h2>
            <div className="flex justify-center">
              <AppHeader.Search 
                variant="chip" 
                placeholder="Search spaces, people, events..." 
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Command Palette Style</h2>
            <div className="flex justify-center">
              <AppHeader.Search 
                variant="command" 
                placeholder="Quick search..." 
                shortcut="⌘K"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-white">Minimal Style</h2>
            <div className="flex justify-center">
              <AppHeader.Search 
                variant="minimal" 
                placeholder="Search..." 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const NotificationStates: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Notification States</h1>
          <p className="text-white/60">Different notification indicators</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-3 text-center">
            <AppHeader.Notifications count={0} />
            <p className="text-sm text-white/60">No notifications</p>
          </div>
          
          <div className="space-y-3 text-center">
            <AppHeader.Notifications showDot />
            <p className="text-sm text-white/60">Has updates</p>
          </div>
          
          <div className="space-y-3 text-center">
            <AppHeader.Notifications count={5} />
            <p className="text-sm text-white/60">5 notifications</p>
          </div>
          
          <div className="space-y-3 text-center">
            <AppHeader.Notifications count={99} />
            <p className="text-sm text-white/60">Many notifications</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Minimal Variant</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-3 text-center">
              <AppHeader.Notifications variant="minimal" count={0} />
              <p className="text-sm text-white/60">Minimal style</p>
            </div>
            
            <div className="space-y-3 text-center">
              <AppHeader.Notifications variant="minimal" showDot />
              <p className="text-sm text-white/60">With dot</p>
            </div>
            
            <div className="space-y-3 text-center">
              <AppHeader.Notifications variant="minimal" count={12} />
              <p className="text-sm text-white/60">With count</p>
            </div>
            
            <div className="space-y-3 text-center">
              <AppHeader.Notifications variant="minimal" count={150} />
              <p className="text-sm text-white/60">High count</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveHeader: Story = {
  render: () => (
    <div className="min-h-screen bg-black">
      <AppHeader.Root variant="primary">
        <AppHeader.Content>
          <AppHeader.Logo>
            <h1 className="text-xl font-bold text-white">HIVE</h1>
          </AppHeader.Logo>
          
          {/* Desktop Navigation */}
          <AppHeader.Nav className="hidden md:flex">
            <Button variant="ghost" size="sm">Dashboard</Button>
            <Button variant="secondary" size="sm">Spaces</Button>
            <Button variant="ghost" size="sm">Feed</Button>
            <Button variant="ghost" size="sm">Tools</Button>
          </AppHeader.Nav>
          
          <AppHeader.Actions>
            {/* Desktop Search */}
            <AppHeader.Search 
              className="hidden md:flex" 
              placeholder="Search campus..." 
            />
            
            {/* Always visible */}
            <AppHeader.Notifications count={3} />
            
            {/* Desktop Profile */}
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8" />
            </div>
            
            {/* Mobile Menu */}
            <AppHeader.MenuButton />
          </AppHeader.Actions>
        </AppHeader.Content>
      </AppHeader.Root>
      
      <div className="p-6">
        <div className="max-w-4xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Responsive Header Example</h1>
            <p className="text-white/70">
              Resize your browser to see how the header adapts to different screen sizes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-2">Desktop Features</h3>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Full navigation menu</li>
                <li>• Search bar always visible</li>
                <li>• Profile actions expanded</li>
                <li>• Settings button visible</li>
              </ul>
            </div>
            
            <div className="border border-white/10 rounded-xl p-4">
              <h3 className="font-semibold text-white mb-2">Mobile Features</h3>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• Compact layout</li>
                <li>• Hamburger menu button</li>
                <li>• Essential actions only</li>
                <li>• Notifications preserved</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};