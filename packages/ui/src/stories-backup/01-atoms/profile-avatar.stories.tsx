import type { Meta, StoryObj } from '@storybook/react';
import { ProfileAvatar } from '../../atomic/atoms/profile-avatar';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof ProfileAvatar> = {
  title: '01-Atoms/Profile Avatar',
  component: ProfileAvatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE profile avatar component with status indicators, badges, and campus-specific features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      description: 'Avatar size',
    },
    shape: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
      description: 'Avatar shape',
    },
    border: {
      control: 'select',
      options: ['none', 'subtle', 'primary', 'builder', 'verified'],
      description: 'Border style',
    },
    status: {
      control: 'select',
      options: ['none', 'online', 'away', 'busy', 'offline'],
      description: 'Online status',
    },
    onlineStatus: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Online status (auto-applied to status)',
    },
    isBuilder: {
      control: 'boolean',
      description: 'Show builder badge and styling',
    },
    isVerified: {
      control: 'boolean',
      description: 'Show verified badge',
    },
    ghostMode: {
      control: 'boolean',
      description: 'Show ghost mode overlay',
    },
    showStatus: {
      control: 'boolean',
      description: 'Show status indicator',
    },
    showBadges: {
      control: 'boolean',
      description: 'Show role badges',
    },
    editable: {
      control: 'boolean',
      description: 'Enable edit functionality',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    name: 'John Doe',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
};

export const WithInitials: Story = {
  args: {
    name: 'Alex Rodriguez',
  },
};

export const Loading: Story = {
  args: {
    name: 'Loading User',
    loading: true,
  },
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-6">
      <div className="text-center">
        <ProfileAvatar
          name="Extra Small"
          size="xs"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XS</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          name="Small User"
          size="sm"
          src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-xs text-hive-text-mutedLight">SM</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          name="Medium User"
          size="md"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-xs text-hive-text-mutedLight">MD</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          name="Large User"
          size="lg"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-xs text-hive-text-mutedLight">LG</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          name="Extra Large"
          size="xl"
          src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XL</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          name="XX Large"
          size="xxl"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XXL</p>
      </div>
    </div>
  ),
};

// Shapes
export const AllShapes: Story = {
  render: () => (
    <div className="flex gap-6 p-6">
      <div className="text-center">
        <ProfileAvatar
          name="Circle User"
          shape="circle"
          size="lg"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-sm text-hive-text-mutedLight">Circle</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          name="Rounded User"
          shape="rounded"
          size="lg"
          src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-sm text-hive-text-mutedLight">Rounded</p>
      </div>
      <div className="text-center">
        <ProfileAvatar
          name="Square User"
          shape="square"
          size="lg"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        />
        <p className="mt-2 text-sm text-hive-text-mutedLight">Square</p>
      </div>
    </div>
  ),
};

// Campus roles
export const CampusRoles: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Campus User Types</h3>
        <div className="flex gap-6">
          <div className="text-center">
            <ProfileAvatar
              name="Marcus Builder"
              size="lg"
              isBuilder
              showBadges
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm font-medium text-hive-text-primary">Builder</p>
            <p className="text-xs text-hive-text-mutedLight">Creates tools</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Dr. Sarah Wilson"
              size="lg"
              isVerified
              showBadges
              src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm font-medium text-hive-text-primary">Faculty</p>
            <p className="text-xs text-hive-text-mutedLight">Verified educator</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Alex Student"
              size="lg"
              showBadges
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm font-medium text-hive-text-primary">Student</p>
            <p className="text-xs text-hive-text-mutedLight">Regular user</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Jamie Ghost"
              size="lg"
              ghostMode
              showBadges
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm font-medium text-hive-text-primary">Ghost Mode</p>
            <p className="text-xs text-hive-text-mutedLight">Privacy enabled</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Online status
export const OnlineStatus: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Online Status Indicators</h3>
        <div className="flex gap-6">
          <div className="text-center">
            <ProfileAvatar
              name="Online User"
              size="lg"
              onlineStatus="online"
              showStatus
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm text-hive-text-primary">Online</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Away User"
              size="lg"
              onlineStatus="away"
              showStatus
              src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm text-hive-text-primary">Away</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Busy User"
              size="lg"
              onlineStatus="busy"
              showStatus
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm text-hive-text-primary">Busy</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Offline User"
              size="lg"
              onlineStatus="offline"
              showStatus
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm text-hive-text-primary">Offline</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Editable avatars
export const EditableAvatars: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Editable Avatars</h3>
        <div className="flex gap-6">
          <div className="text-center">
            <ProfileAvatar
              name="Edit Me"
              size="lg"
              editable
              onEdit={action('edit-clicked')}
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm text-hive-text-primary">Hover to Edit</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Upload Photo"
              size="lg"
              editable
              onUpload={action('file-uploaded')}
            />
            <p className="mt-2 text-sm text-hive-text-primary">Upload Photo</p>
          </div>
          <div className="text-center">
            <ProfileAvatar
              name="Both Actions"
              size="lg"
              editable
              onEdit={action('edit-clicked')}
              onUpload={action('file-uploaded')}
              src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm text-hive-text-primary">Edit & Upload</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Study Group Members</h3>
        <div className="flex -space-x-2">
          <ProfileAvatar
            name="Alex Rodriguez"
            size="md"
            isBuilder
            showStatus
            onlineStatus="online"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          />
          <ProfileAvatar
            name="Sarah Chen"
            size="md"
            showStatus
            onlineStatus="online"
            src="https://images.unsplash.com/photo-1494790108755-2616b612b123?w=150&h=150&fit=crop&crop=face"
          />
          <ProfileAvatar
            name="Marcus Johnson"
            size="md"
            showStatus
            onlineStatus="away"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          />
          <ProfileAvatar
            name="Emily Davis"
            size="md"
            ghostMode
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
          />
          <div className="flex items-center justify-center w-12 h-12 bg-hive-surface-elevated border-2 border-hive-border-subtle rounded-full text-xs font-medium text-hive-text-mutedLight">
            +5
          </div>
        </div>
        <p className="text-sm text-hive-text-mutedLight mt-2">9 members in CS 101 Study Group</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Tool Contributors</h3>
        <div className="flex gap-4">
          <ProfileAvatar
            name="Lead Builder"
            size="lg"
            isBuilder
            showBadges
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          />
          <div className="flex flex-col justify-center">
            <p className="font-medium text-hive-text-primary">GPA Calculator Pro</p>
            <p className="text-sm text-hive-text-mutedLight">Built by Lead Builder</p>
            <p className="text-xs text-hive-text-mutedLight">2.1k users • Updated 3 days ago</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Profile Settings</h3>
        <div className="flex gap-6">
          <ProfileAvatar
            name="Your Profile"
            size="xl"
            editable
            isBuilder
            showStatus
            onlineStatus="online"
            onEdit={action('edit-profile')}
            onUpload={action('upload-photo')}
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          />
          <div className="flex flex-col justify-center space-y-2">
            <h4 className="text-lg font-semibold text-hive-text-primary">Your Profile</h4>
            <p className="text-sm text-hive-text-mutedLight">Builder • Online</p>
            <p className="text-xs text-hive-text-mutedLight">Hover to edit photo or profile</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  args: {
    name: 'Interactive User',
    size: 'lg',
    editable: true,
    showStatus: true,
    showBadges: true,
    isBuilder: true,
    onlineStatus: 'online',
    onEdit: action('edit-clicked'),
    onUpload: action('file-uploaded'),
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">All Avatar States</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <ProfileAvatar name="Loading" loading size="lg" />
            <p className="mt-2 text-sm text-hive-text-mutedLight">Loading</p>
          </div>
          <div className="text-center">
            <ProfileAvatar name="No Image" size="lg" />
            <p className="mt-2 text-sm text-hive-text-mutedLight">Initials</p>
          </div>
          <div className="text-center">
            <ProfileAvatar 
              name="With Image" 
              size="lg"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            />
            <p className="mt-2 text-sm text-hive-text-mutedLight">With Image</p>
          </div>
          <div className="text-center">
            <ProfileAvatar name="Ghost Mode" size="lg" ghostMode />
            <p className="mt-2 text-sm text-hive-text-mutedLight">Ghost Mode</p>
          </div>
        </div>
      </div>
    </div>
  ),
};