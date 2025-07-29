import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../../../atomic/atoms/avatar';
import { HiveCard } from '../../../components/hive-card';
import { Badge } from '../../../atomic/atoms/badge';
import { 
  User, 
  Bot, 
  Crown, 
  Shield, 
  Star,
  Camera,
  Settings
} from 'lucide-react';

const meta: Meta<typeof Avatar> = {
  title: '02-atoms/Core Foundation/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Avatar Component** - User profile images with status indicators and fallbacks

Part of the HIVE Atomic Design System providing consistent user representation across the platform.

## Features
- **6 Sizes**: xs (24px), sm (32px), md (10), lg (48px), xl (64px), 2xl (80px)
- **5 Status Indicators**: Online, offline, away, busy, ghost with semantic colors
- **Fallback System**: Image → initials → custom placeholder → default icon
- **Interactive Mode**: Hover states and focus management for clickable avatars
- **Error Handling**: Graceful fallback when images fail to load
- **Accessibility**: Proper alt text and focus indicators
- **Design Token Integration**: Uses HIVE semantic color tokens

## Use Cases
- **User Profiles**: Personal avatars in navigation and profiles
- **Status Indication**: Show user availability and presence
- **Team Members**: Display team member photos and status
- **Comment Systems**: Author avatars in discussions
- **Contact Lists**: Visual identification in user lists
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Image URL for the avatar'
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size variant'
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', 'ghost'],
      description: 'Status indicator color'
    },
    initials: {
      control: 'text',
      description: 'Initials to display as fallback'
    },
    interactive: {
      control: 'boolean',
      description: 'Enable hover and focus states'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample avatar URLs for demos
const sampleAvatars = {
  user1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  user2: 'https://images.unsplash.com/photo-1494790108755-2616b2c0c3ee?w=150&h=150&fit=crop&crop=face',
  user3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  user4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
  user5: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
};

// Default Avatar
export const Default: Story = {
  args: {
    src: sampleAvatars.user1,
    alt: 'User avatar'
  }
};

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center space-y-2">
        <Avatar size="xs" src={sampleAvatars.user1} />
        <p className="text-xs text-gray-400">XS (24px)</p>
      </div>
      
      <div className="text-center space-y-2">
        <Avatar size="sm" src={sampleAvatars.user1} />
        <p className="text-xs text-gray-400">SM (32px)</p>
      </div>
      
      <div className="text-center space-y-2">
        <Avatar size="md" src={sampleAvatars.user1} />
        <p className="text-xs text-gray-400">MD (10)</p>
      </div>
      
      <div className="text-center space-y-2">
        <Avatar size="lg" src={sampleAvatars.user1} />
        <p className="text-xs text-gray-400">LG (48px)</p>
      </div>
      
      <div className="text-center space-y-2">
        <Avatar size="xl" src={sampleAvatars.user1} />
        <p className="text-xs text-gray-400">XL (64px)</p>
      </div>
      
      <div className="text-center space-y-2">
        <Avatar size="2xl" src={sampleAvatars.user1} />
        <p className="text-xs text-gray-400">2XL (80px)</p>
      </div>
    </div>
  )
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">All Status Types</h4>
        <div className="flex items-center gap-4">
          <div className="text-center space-y-2">
            <Avatar src={sampleAvatars.user1} status="online" />
            <p className="text-xs text-gray-400">Online</p>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar src={sampleAvatars.user2} status="away" />
            <p className="text-xs text-gray-400">Away</p>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar src={sampleAvatars.user3} status="busy" />
            <p className="text-xs text-gray-400">Busy</p>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar src={sampleAvatars.user4} status="offline" />
            <p className="text-xs text-gray-400">Offline</p>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar src={sampleAvatars.user5} status="ghost" />
            <p className="text-xs text-gray-400">Ghost</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Different Sizes with Status</h4>
        <div className="flex items-end gap-4">
          <Avatar size="sm" src={sampleAvatars.user1} status="online" />
          <Avatar size="md" src={sampleAvatars.user2} status="away" />
          <Avatar size="lg" src={sampleAvatars.user3} status="busy" />
          <Avatar size="xl" src={sampleAvatars.user4} status="offline" />
        </div>
      </div>
    </div>
  )
};

// Fallback System
export const FallbackSystem: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Image Avatar</h4>
        <Avatar src={sampleAvatars.user1} alt="John Doe" />
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Initials Fallback</h4>
        <div className="flex items-center gap-4">
          <Avatar initials="JD" />
          <Avatar initials="AS" size="lg" />
          <Avatar initials="MK" size="xl" status="online" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Custom Placeholder</h4>
        <div className="flex items-center gap-4">
          <Avatar 
            size="md"
            placeholder={<Bot className="w-5 h-5 text-blue-400" />}
          />
          <Avatar 
            size="lg"
            placeholder={<Crown className="w-6 h-6 text-yellow-400" />}
            status="online"
          />
          <Avatar 
            size="xl"
            placeholder={<Shield className="w-8 h-8 text-green-400" />}
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Default Fallback</h4>
        <div className="flex items-center gap-4">
          <Avatar size="sm" />
          <Avatar size="md" status="away" />
          <Avatar size="lg" status="offline" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Image Error Handling</h4>
        <div className="flex items-center gap-4">
          <Avatar 
            src="https://invalid-url.jpg" 
            initials="ER"
            alt="Error handling demo"
          />
          <Avatar 
            src="https://another-invalid-url.jpg"
            placeholder={<Camera className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </div>
    </div>
  )
};

// Interactive Mode
export const InteractiveMode: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Interactive Avatars</h4>
        <p className="text-sm text-gray-400">Hover to see interaction states</p>
        <div className="flex items-center gap-4">
          <Avatar 
            src={sampleAvatars.user1} 
            interactive 
            status="online"
          />
          <Avatar 
            initials="JD" 
            interactive 
            status="away"
            size="lg"
          />
          <Avatar 
            placeholder={<Bot className="w-6 h-6 text-blue-400" />}
            interactive 
            size="xl"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Non-Interactive (Default)</h4>
        <div className="flex items-center gap-4">
          <Avatar src={sampleAvatars.user2} status="online" />
          <Avatar initials="AS" status="busy" size="lg" />
          <Avatar placeholder={<Shield className="w-8 h-8 text-green-400" />} size="xl" />
        </div>
      </div>
    </div>
  )
};

// Team Avatar List
export const TeamAvatarList: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-md">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Team Members</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <Avatar 
              src={sampleAvatars.user1} 
              status="online"
              interactive
            />
            <div>
              <p className="text-[var(--hive-text-primary)] font-medium">John Doe</p>
              <p className="text-sm text-gray-400">Product Manager</p>
            </div>
          </div>
          <Badge variant="success" dot>Online</Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <Avatar 
              src={sampleAvatars.user2} 
              status="away"
              interactive
            />
            <div>
              <p className="text-[var(--hive-text-primary)] font-medium">Alice Smith</p>
              <p className="text-sm text-gray-400">Lead Designer</p>
            </div>
          </div>
          <Badge variant="warning" dot>Away</Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <Avatar 
              src={sampleAvatars.user3} 
              status="busy"
              interactive
            />
            <div>
              <p className="text-[var(--hive-text-primary)] font-medium">Bob Johnson</p>
              <p className="text-sm text-gray-400">Senior Developer</p>
            </div>
          </div>
          <Badge variant="error" dot>Busy</Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <Avatar 
              initials="MK" 
              status="offline"
              interactive
            />
            <div>
              <p className="text-[var(--hive-text-primary)] font-medium">Mike Kim</p>
              <p className="text-sm text-gray-400">Data Analyst</p>
            </div>
          </div>
          <Badge variant="secondary" dot>Offline</Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <Avatar 
              placeholder={<Bot className="w-5 h-5 text-blue-400" />}
              status="online"
              interactive
            />
            <div>
              <p className="text-[var(--hive-text-primary)] font-medium">HIVE Assistant</p>
              <p className="text-sm text-gray-400">AI Bot</p>
            </div>
          </div>
          <Badge variant="primary" size="sm">Bot</Badge>
        </div>
      </div>
      
      <div className="pt-4 border-t border-[var(--hive-border-default)]">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <Avatar size="sm" src={sampleAvatars.user1} />
            <Avatar size="sm" src={sampleAvatars.user2} />
            <Avatar size="sm" src={sampleAvatars.user3} />
            <Avatar size="sm" initials="+2" className="bg-gray-700 text-gray-300" />
          </div>
          <span className="text-sm text-gray-400 ml-2">5 members online</span>
        </div>
      </div>
    </HiveCard>
  )
};

// Avatar Stack
export const AvatarStack: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Small Stack</h4>
        <div className="flex -space-x-2">
          <Avatar size="sm" src={sampleAvatars.user1} className="ring-2 ring-gray-900" />
          <Avatar size="sm" src={sampleAvatars.user2} className="ring-2 ring-gray-900" />
          <Avatar size="sm" src={sampleAvatars.user3} className="ring-2 ring-gray-900" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Medium Stack with Count</h4>
        <div className="flex -space-x-3">
          <Avatar src={sampleAvatars.user1} className="ring-2 ring-gray-900" />
          <Avatar src={sampleAvatars.user2} className="ring-2 ring-gray-900" />
          <Avatar src={sampleAvatars.user3} className="ring-2 ring-gray-900" />
          <Avatar initials="+5" className="ring-2 ring-gray-900 bg-gray-700 text-gray-300" />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Large Stack with Status</h4>
        <div className="flex -space-x-4">
          <Avatar size="lg" src={sampleAvatars.user1} status="online" className="ring-2 ring-gray-900" />
          <Avatar size="lg" src={sampleAvatars.user2} status="away" className="ring-2 ring-gray-900" />
          <Avatar size="lg" initials="BJ" status="busy" className="ring-2 ring-gray-900" />
          <Avatar size="lg" initials="+3" className="ring-2 ring-gray-900 bg-gray-700 text-gray-300" />
        </div>
      </div>
    </div>
  )
};

// Special Avatars
export const SpecialAvatars: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Role-based Avatars</h4>
        <div className="flex items-center gap-4">
          <div className="text-center space-y-2">
            <Avatar 
              src={sampleAvatars.user1}
              size="lg"
              status="online"
              className="ring-2 ring-yellow-400"
            />
            <div className="flex items-center justify-center gap-1">
              <Crown className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">Admin</span>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar 
              src={sampleAvatars.user2}
              size="lg"
              status="online"
              className="ring-2 ring-blue-400"
            />
            <div className="flex items-center justify-center gap-1">
              <Shield className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-blue-400">Moderator</span>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar 
              src={sampleAvatars.user3}
              size="lg"
              status="online"
              className="ring-2 ring-green-400"
            />
            <div className="flex items-center justify-center gap-1">
              <Star className="w-3 h-3 text-green-400" />
              <span className="text-xs text-green-400">VIP</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">System Avatars</h4>
        <div className="flex items-center gap-4">
          <div className="text-center space-y-2">
            <Avatar 
              placeholder={<Bot className="w-6 h-6 text-blue-400" />}
              size="lg"
              status="online"
              className="bg-blue-500/10 border-blue-400"
            />
            <span className="text-xs text-blue-400">AI Assistant</span>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar 
              placeholder={<Settings className="w-6 h-6 text-gray-400" />}
              size="lg"
              className="bg-gray-500/10 border-gray-400"
            />
            <span className="text-xs text-gray-400">System</span>
          </div>
          
          <div className="text-center space-y-2">
            <Avatar 
              placeholder={<Shield className="w-6 h-6 text-green-400" />}
              size="lg"
              status="online"
              className="bg-green-500/10 border-green-400"
            />
            <span className="text-xs text-green-400">Security</span>
          </div>
        </div>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="p-8">
      <Avatar {...args} />
    </div>
  ),
  args: {
    src: sampleAvatars.user1,
    alt: 'Interactive avatar',
    size: 'lg',
    status: 'online',
    initials: 'JD',
    interactive: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different avatar configurations including size, status, fallbacks, and interaction states.'
      }
    }
  }
};