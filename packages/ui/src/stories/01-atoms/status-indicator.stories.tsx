import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator, OnlineIndicator, OfflineIndicator, BusyIndicator, AwayIndicator, ErrorIndicator, SuccessIndicator, WarningIndicator, PulseIndicator, GlowIndicator, StatusBadge } from '../../atomic/atoms/status-indicator';
import { Avatar } from '../../atomic/atoms/avatar';
import { User, MessageCircle, Zap, Calendar, BookOpen, Users, Settings, Bell } from 'lucide-react';

const meta: Meta<typeof StatusIndicator> = {
  title: '01-Atoms/Status Indicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE status indicator component for showing user presence, system states, and activity status with various visual styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy', 'error', 'success', 'warning', 'pending'],
      description: 'Status type',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Indicator size',
    },
    variant: {
      control: 'select',
      options: ['dot', 'pulse', 'glow', 'ring'],
      description: 'Visual variant',
    },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position when used as overlay',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show status label text',
    },
    animate: {
      control: 'boolean',
      description: 'Enable animations',
    },
    label: {
      control: 'text',
      description: 'Custom label text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    status: 'online',
  },
};

export const WithLabel: Story = {
  args: {
    status: 'online',
    showLabel: true,
  },
};

export const CustomLabel: Story = {
  args: {
    status: 'busy',
    label: 'In a meeting',
    showLabel: true,
  },
};

// All statuses
export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">User Presence</h3>
        <div className="flex flex-wrap gap-4">
          <StatusIndicator status="online" showLabel />
          <StatusIndicator status="offline" showLabel />
          <StatusIndicator status="away" showLabel />
          <StatusIndicator status="busy" showLabel />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">System States</h3>
        <div className="flex flex-wrap gap-4">
          <StatusIndicator status="success" showLabel />
          <StatusIndicator status="warning" showLabel />
          <StatusIndicator status="error" showLabel />
          <StatusIndicator status="pending" showLabel />
        </div>
      </div>
    </div>
  ),
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6 p-4">
      <div className="text-center">
        <StatusIndicator status="online" size="xs" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XS</p>
      </div>
      <div className="text-center">
        <StatusIndicator status="online" size="sm" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">SM</p>
      </div>
      <div className="text-center">
        <StatusIndicator status="online" size="md" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">MD</p>
      </div>
      <div className="text-center">
        <StatusIndicator status="online" size="lg" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">LG</p>
      </div>
      <div className="text-center">
        <StatusIndicator status="online" size="xl" />
        <p className="mt-2 text-xs text-hive-text-mutedLight">XL</p>
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Dot Variant</h3>
        <div className="flex flex-wrap gap-4">
          <StatusIndicator status="online" variant="dot" size="lg" showLabel />
          <StatusIndicator status="busy" variant="dot" size="lg" showLabel />
          <StatusIndicator status="away" variant="dot" size="lg" showLabel />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Pulse Variant</h3>
        <div className="flex flex-wrap gap-4">
          <StatusIndicator status="online" variant="pulse" size="lg" showLabel />
          <StatusIndicator status="busy" variant="pulse" size="lg" showLabel />
          <StatusIndicator status="warning" variant="pulse" size="lg" showLabel />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Glow Variant</h3>
        <div className="flex flex-wrap gap-4">
          <StatusIndicator status="online" variant="glow" size="lg" showLabel />
          <StatusIndicator status="error" variant="glow" size="lg" showLabel />
          <StatusIndicator status="success" variant="glow" size="lg" showLabel />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-3">Ring Variant</h3>
        <div className="flex flex-wrap gap-4">
          <StatusIndicator status="online" variant="ring" size="lg" showLabel />
          <StatusIndicator status="pending" variant="ring" size="lg" showLabel />
          <StatusIndicator status="offline" variant="ring" size="lg" showLabel />
        </div>
      </div>
    </div>
  ),
};

// Campus user presence scenarios
export const CampusUserPresenceScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Student Directory</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Alex Rodriguez', major: 'Computer Science', status: 'online', activity: 'Building GPA Calculator' },
            { name: 'Sarah Chen', major: 'Engineering', status: 'busy', activity: 'In study session' },
            { name: 'Marcus Johnson', major: 'Mathematics', status: 'away', activity: 'Last seen 30m ago' },
            { name: 'Emma Williams', major: 'Physics', status: 'offline', activity: 'Offline since 2h ago' },
          ].map((student, index) => (
            <div key={index} className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center">
                    <span className="text-hive-background-primary font-bold">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <StatusIndicator 
                    status={student.status as any} 
                    position="bottom-right" 
                    size="sm" 
                    variant="glow"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-hive-text-primary">{student.name}</h4>
                    <StatusIndicator status={student.status as any} showLabel size="xs" />
                  </div>
                  <p className="text-sm text-hive-text-secondary">{student.major}</p>
                  <p className="text-xs text-hive-text-mutedLight">{student.activity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Members</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-hive-text-primary">CS 101 Final Prep</h4>
            <div className="flex items-center space-x-1">
              <StatusIndicator status="success" size="xs" />
              <span className="text-sm text-hive-text-secondary">7 online</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'You', status: 'online', role: 'Leader' },
              { name: 'Jessica Park', status: 'online', role: 'Member' },
              { name: 'David Kim', status: 'busy', role: 'Member' },
              { name: 'Lisa Zhang', status: 'away', role: 'Member' },
              { name: 'Ryan Murphy', status: 'online', role: 'Member' },
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-hive-emerald rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <StatusIndicator 
                      status={member.status as any} 
                      position="bottom-right" 
                      size="xs"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-hive-text-primary">{member.name}</p>
                    <p className="text-xs text-hive-text-mutedLight">{member.role}</p>
                  </div>
                </div>
                <StatusIndicator status={member.status as any} showLabel size="xs" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Activity</h3>
        <div className="space-y-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-hive-sapphire rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-hive-text-primary">GPA Calculator Pro</h4>
                  <StatusIndicator status="online" variant="pulse" size="sm" />
                  <span className="text-xs text-hive-text-mutedLight">Active</span>
                </div>
                <p className="text-sm text-hive-text-secondary">Currently being used by 47 students</p>
              </div>
            </div>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-hive-ruby rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-hive-text-primary">Study Session Planner</h4>
                  <StatusIndicator status="warning" variant="pulse" size="sm" />
                  <span className="text-xs text-hive-text-mutedLight">Maintenance</span>
                </div>
                <p className="text-sm text-hive-text-secondary">Scheduled maintenance in progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// System status and notifications
export const SystemStatusAndNotifications: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Services Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">Core Services</h4>
            <div className="space-y-3">
              {[
                { service: 'Student Portal', status: 'success', uptime: '99.9%' },
                { service: 'Course Registration', status: 'success', uptime: '99.8%' },
                { service: 'Grade System', status: 'warning', uptime: '98.5%' },
                { service: 'Library Services', status: 'error', uptime: '95.2%' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StatusIndicator status={item.status as any} variant="glow" size="sm" />
                    <span className="text-sm text-hive-text-primary">{item.service}</span>
                  </div>
                  <span className="text-xs text-hive-text-mutedLight">{item.uptime}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <h4 className="font-semibold text-hive-text-primary mb-3">HIVE Tools</h4>
            <div className="space-y-3">
              {[
                { tool: 'Tool Builder', status: 'online', users: '156 active' },
                { tool: 'Study Spaces', status: 'online', users: '89 active' },
                { tool: 'Campus Feed', status: 'busy', users: 'High load' },
                { tool: 'Message System', status: 'pending', users: 'Starting up' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StatusIndicator status={item.status as any} variant="pulse" size="sm" />
                    <span className="text-sm text-hive-text-primary">{item.tool}</span>
                  </div>
                  <span className="text-xs text-hive-text-mutedLight">{item.users}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Notification Center</h3>
        <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
          <div className="space-y-4">
            {[
              { 
                type: 'Assignment Due', 
                message: 'CS 101 Homework due in 2 hours', 
                status: 'error',
                time: '2h',
                icon: <BookOpen className="w-4 h-4" />
              },
              { 
                type: 'Study Session', 
                message: 'Math study group starting soon', 
                status: 'warning',
                time: '15m',
                icon: <Users className="w-4 h-4" />
              },
              { 
                type: 'Tool Update', 
                message: 'GPA Calculator has been updated', 
                status: 'success',
                time: '1h',
                icon: <Zap className="w-4 h-4" />
              },
              { 
                type: 'Message', 
                message: 'New message from Sarah Chen', 
                status: 'online',
                time: '5m',
                icon: <MessageCircle className="w-4 h-4" />
              },
            ].map((notification, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-hive-interactive-hover rounded-lg transition-colors">
                <div className="flex-shrink-0">
                  <div className="relative p-2 bg-hive-surface-elevated rounded-lg">
                    {notification.icon}
                    <StatusIndicator 
                      status={notification.status as any} 
                      position="top-right" 
                      size="xs"
                      variant="glow"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-hive-text-primary">{notification.type}</p>
                    <StatusIndicator status={notification.status as any} size="xs" />
                  </div>
                  <p className="text-sm text-hive-text-secondary">{notification.message}</p>
                </div>
                <span className="text-xs text-hive-text-mutedLight">{notification.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// Status badges and overlays
export const StatusBadgesAndOverlays: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Avatar Status Overlays</h3>
        <div className="flex flex-wrap gap-6">
          <div className="text-center">
            <StatusBadge status="online" position="bottom-right">
              <Avatar 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" 
                alt="Online User"
                size="lg"
              />
            </StatusBadge>
            <p className="mt-2 text-sm text-hive-text-secondary">Online</p>
          </div>
          
          <div className="text-center">
            <StatusBadge status="busy" position="bottom-right" variant="pulse">
              <Avatar 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b9ab?w=100&h=100&fit=crop&crop=face" 
                alt="Busy User"
                size="lg"
              />
            </StatusBadge>
            <p className="mt-2 text-sm text-hive-text-secondary">Busy</p>
          </div>
          
          <div className="text-center">
            <StatusBadge status="away" position="bottom-right">
              <Avatar 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                alt="Away User"
                size="lg"
              />
            </StatusBadge>
            <p className="mt-2 text-sm text-hive-text-secondary">Away</p>
          </div>
          
          <div className="text-center">
            <StatusBadge status="offline" position="bottom-right">
              <Avatar 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" 
                alt="Offline User"
                size="lg"
              />
            </StatusBadge>
            <p className="mt-2 text-sm text-hive-text-secondary">Offline</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Notification Badges</h3>
        <div className="flex flex-wrap gap-6">
          <StatusBadge status="error" count={3} position="top-right">
            <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
              <Bell className="w-6 h-6 text-hive-text-primary" />
            </div>
          </StatusBadge>
          
          <StatusBadge status="warning" count={12} position="top-right">
            <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
              <MessageCircle className="w-6 h-6 text-hive-text-primary" />
            </div>
          </StatusBadge>
          
          <StatusBadge status="success" count={99} max={99} position="top-right">
            <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
              <User className="w-6 h-6 text-hive-text-primary" />
            </div>
          </StatusBadge>
          
          <StatusBadge status="online" count={150} max={99} position="top-right">
            <div className="p-4 bg-hive-surface-elevated rounded-lg border border-hive-border-subtle">
              <Users className="w-6 h-6 text-hive-text-primary" />
            </div>
          </StatusBadge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Status Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <StatusIndicator status="success" position="top-right" variant="glow" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-hive-emerald rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">GPA Calc</h4>
                <p className="text-xs text-hive-text-secondary">Online</p>
              </div>
            </div>
          </div>

          <div className="relative border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <StatusIndicator status="warning" position="top-right" variant="pulse" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-hive-gold rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-hive-background-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Scheduler</h4>
                <p className="text-xs text-hive-text-secondary">Maintenance</p>
              </div>
            </div>
          </div>

          <div className="relative border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <StatusIndicator status="error" position="top-right" variant="glow" />
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-hive-ruby rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Grade Sync</h4>
                <p className="text-xs text-hive-text-secondary">Error</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Position variations
export const PositionVariations: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">All Position Options</h3>
        <div className="grid grid-cols-4 gap-6">
          {[
            'top', 'bottom', 'left', 'right',
            'top-left', 'top-right', 'bottom-left', 'bottom-right'
          ].map((position) => (
            <div key={position} className="text-center">
              <div className="relative inline-block p-4 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg">
                <User className="w-8 h-8 text-hive-text-primary" />
                <StatusIndicator 
                  status="online" 
                  position={position as any} 
                  size="md" 
                  variant="glow"
                />
              </div>
              <p className="mt-2 text-sm text-hive-text-secondary capitalize">
                {position.replace('-', ' ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Preset components
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Status Presets</h3>
        <div className="flex flex-wrap gap-4">
          <OnlineIndicator showLabel />
          <OfflineIndicator showLabel />
          <BusyIndicator showLabel />
          <AwayIndicator showLabel />
          <ErrorIndicator showLabel />
          <SuccessIndicator showLabel />
          <WarningIndicator showLabel />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Variant Presets</h3>
        <div className="flex flex-wrap gap-4">
          <PulseIndicator status="online" showLabel />
          <GlowIndicator status="success" showLabel />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Status Badges</h3>
        <div className="flex flex-wrap gap-6">
          <StatusBadge status="error" count={5}>
            <div className="w-12 h-12 bg-hive-surface-elevated rounded-lg flex items-center justify-center border border-hive-border-subtle">
              <Bell className="w-6 h-6 text-hive-text-primary" />
            </div>
          </StatusBadge>
          
          <StatusBadge status="online">
            <Avatar size="md" />
          </StatusBadge>
        </div>
      </div>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    status: 'online',
    size: 'md',
    variant: 'dot',
    showLabel: true,
    animate: true,
  },
};