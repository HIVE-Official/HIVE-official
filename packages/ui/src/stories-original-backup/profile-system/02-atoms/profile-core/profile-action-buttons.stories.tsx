import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/02-Atoms/Profile Core/Profile Action Buttons',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tech-minimal action buttons for HIVE profiles - clean, consistent interactive elements for profile actions.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Profile Action Button Component
const ProfileActionButton = ({ 
  action = 'connect',
  size = 'md',
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  onClick 
}: {
  action?: 'connect' | 'message' | 'follow' | 'unfollow' | 'block' | 'edit' | 'share';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: 'bg-hive-brand-secondary text-white hover:bg-hive-brand-secondary/90 border-hive-brand-secondary',
    secondary: 'bg-hive-background-secondary text-hive-text-primary hover:bg-hive-background-secondary/80 border-hive-border-default',
    ghost: 'bg-transparent text-hive-text-secondary hover:bg-hive-background-secondary hover:text-hive-text-primary border-transparent',
    destructive: 'bg-hive-status-error text-white hover:bg-hive-status-error/90 border-hive-status-error'
  };

  const actionConfig = {
    connect: { label: 'Connect', icon: '+' },
    message: { label: 'Message', icon: '💬' },
    follow: { label: 'Follow', icon: '→' },
    unfollow: { label: 'Unfollow', icon: '×' },
    block: { label: 'Block', icon: '⊘' },
    edit: { label: 'Edit', icon: '✏' },
    share: { label: 'Share', icon: '↗' }
  };

  const config = actionConfig[action];

  return (
    <button
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        border rounded-lg font-medium
        transition-all duration-200
        flex items-center gap-2
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <span className="text-xs">{config.icon}</span>
      )}
      <span>{config.label}</span>
    </button>
  );
};

// Quick Action Button - Icon only
const QuickActionButton = ({ 
  action = 'message',
  size = 'md',
  variant = 'ghost',
  className = '',
  onClick 
}: {
  action?: 'message' | 'share' | 'more' | 'edit' | 'settings';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'filled';
  className?: string;
  onClick?: () => void;
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  const variantClasses = {
    ghost: 'bg-transparent hover:bg-hive-background-secondary text-hive-text-secondary hover:text-hive-text-primary',
    filled: 'bg-hive-background-secondary hover:bg-hive-brand-secondary text-hive-text-primary hover:text-white'
  };

  const actionIcons = {
    message: '💬',
    share: '↗',
    more: '⋯',
    edit: '✏',
    settings: '⚙'
  };

  return (
    <button
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-lg flex items-center justify-center
        transition-all duration-200
        ${className}
      `}
      onClick={onClick}
    >
      {actionIcons[action]}
    </button>
  );
};

export const ProfileActionButtons: Story = {
  name: '🎯 Profile Action Buttons',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Profile Action Buttons</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Tech-minimal action buttons for HIVE profiles - clean, consistent interactive elements for all profile actions.
          </p>
        </div>

        {/* Action Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Action Types</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {(['connect', 'message', 'follow', 'unfollow', 'block', 'edit', 'share'] as const).map(action => (
                <div key={action} className="text-center space-y-3">
                  <ProfileActionButton action={action} />
                  <div className="text-xs text-hive-text-secondary capitalize">{action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button Variants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Button Variants</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <ProfileActionButton action="connect" variant="primary" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Primary</div>
                  <div className="text-sm text-hive-text-secondary">Main action</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ProfileActionButton action="message" variant="secondary" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Secondary</div>
                  <div className="text-sm text-hive-text-secondary">Alternative action</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ProfileActionButton action="share" variant="ghost" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Ghost</div>
                  <div className="text-sm text-hive-text-secondary">Subtle action</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ProfileActionButton action="block" variant="destructive" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Destructive</div>
                  <div className="text-sm text-hive-text-secondary">Dangerous action</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Button Sizes</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size} className="text-center space-y-4">
                  <ProfileActionButton action="connect" size={size} />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">{size.toUpperCase()}</div>
                    <div className="text-sm text-hive-text-secondary">{size} size button</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Button States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Button States</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <ProfileActionButton action="connect" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Default</div>
                  <div className="text-sm text-hive-text-secondary">Normal state</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ProfileActionButton action="connect" loading={true} />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Loading</div>
                  <div className="text-sm text-hive-text-secondary">Processing action</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ProfileActionButton action="connect" disabled={true} />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Disabled</div>
                  <div className="text-sm text-hive-text-secondary">Action unavailable</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Quick Actions</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {(['message', 'share', 'more', 'edit', 'settings'] as const).map(action => (
                <div key={action} className="text-center space-y-3">
                  <QuickActionButton action={action} variant="filled" />
                  <div className="text-xs text-hive-text-secondary capitalize">{action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const ActionButtonUsageExamples: Story = {
  name: '🎯 Usage Examples',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Action Button Usage Examples</h1>
          <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Real-world implementation showing how action buttons work in different profile contexts
          </p>
        </div>

        {/* Profile Header Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Profile Header Context</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                SC
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="text-2xl font-bold text-hive-text-primary">Sarah Chen</h3>
                <div className="text-hive-text-secondary">@sarahc • Computer Science • Class of 2025</div>
                <div className="flex items-center gap-3">
                  <ProfileActionButton action="connect" variant="primary" />
                  <ProfileActionButton action="message" variant="secondary" />
                  <QuickActionButton action="share" variant="ghost" />
                  <QuickActionButton action="more" variant="ghost" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection List Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Connection List Context</h2>
          
          <div className="bg-white rounded-lg p-6 space-y-4">
            {[
              { name: 'Marcus Williams', status: 'mutual', actions: ['message', 'unfollow'] },
              { name: 'Emma Rodriguez', status: 'following', actions: ['message', 'unfollow'] },
              { name: 'Alex Rivera', status: 'suggested', actions: ['connect', 'message'] },
              { name: 'Jordan Smith', status: 'requested', actions: ['follow'] }
            ].map(({ name, status, actions }) => (
              <div key={name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-hive-background-primary transition-colors">
                <div className="w-12 h-12 bg-hive-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-hive-text-primary">{name}</div>
                  <div className="text-xs text-hive-text-secondary capitalize">{status} connection</div>
                </div>
                <div className="flex items-center gap-2">
                  {actions.map(action => (
                    <ProfileActionButton 
                      key={action}
                      action={action as any} 
                      size="sm" 
                      variant={action === 'connect' ? 'primary' : 'ghost'}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Settings Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Profile Settings Context</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-hive-text-primary">My Profile</h3>
              <div className="flex items-center gap-2">
                <QuickActionButton action="settings" variant="ghost" />
                <ProfileActionButton action="edit" variant="secondary" size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-md font-medium text-hive-text-primary">Profile Actions</h4>
                <div className="space-y-3">
                  <ProfileActionButton action="edit" variant="secondary" className="w-full justify-center" />
                  <ProfileActionButton action="share" variant="ghost" className="w-full justify-center" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-md font-medium text-hive-text-primary">Privacy Actions</h4>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 text-sm bg-hive-background-secondary hover:bg-hive-background-secondary/80 border border-hive-border-default rounded-lg text-hive-text-primary transition-colors">
                    Download Data
                  </button>
                  <ProfileActionButton action="block" variant="destructive" className="w-full justify-center" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Mobile Context</h2>
          
          <div className="bg-white rounded-lg p-4 max-w-sm mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                SC
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-hive-text-primary truncate">Sarah Chen</h3>
                <div className="text-sm text-hive-text-secondary">Computer Science</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <ProfileActionButton action="connect" variant="primary" size="sm" className="justify-center" />
              <ProfileActionButton action="message" variant="secondary" size="sm" className="justify-center" />
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <QuickActionButton action="share" size="sm" />
              <QuickActionButton action="more" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};