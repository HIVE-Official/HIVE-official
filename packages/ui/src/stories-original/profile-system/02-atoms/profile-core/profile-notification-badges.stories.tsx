import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/02-Atoms/Profile Core/Profile Notification Badges',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tech-minimal notification badges for HIVE profiles - clean, unobtrusive count indicators and system notifications.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Notification Badge Component - Tech minimal
const NotificationBadge = ({ 
  count = 0,
  max = 99,
  size = 'md',
  variant = 'default',
  position = 'top-right',
  className = ''
}: {
  count?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'dot';
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  className?: string;
}) => {
  if (count === 0 && variant !== 'dot') return null;

  const sizeClasses = {
    sm: 'min-w-[16px] h-4 text-xs',
    md: 'min-w-[20px] h-5 text-xs',
    lg: 'min-w-[24px] h-6 text-sm'
  };

  const positionClasses = {
    'top-right': '-top-1 -right-1',
    'top-left': '-top-1 -left-1',
    'bottom-right': '-bottom-1 -right-1',
    'bottom-left': '-bottom-1 -left-1'
  };

  if (variant === 'dot') {
    return (
      <div className={`
        absolute ${positionClasses[position]}
        w-2 h-2 bg-hive-brand-secondary rounded-full
        ${count === 0 ? 'opacity-0' : 'opacity-100'}
        transition-opacity duration-200
        ${className}
      `} />
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`
        absolute ${positionClasses[position]}
        ${sizeClasses[size]}
        bg-hive-text-secondary text-white
        rounded-full flex items-center justify-center font-medium
        px-1
        ${className}
      `}>
        {count > max ? `${max}+` : count}
      </div>
    );
  }

  return (
    <div className={`
      absolute ${positionClasses[position]}
      ${sizeClasses[size]}
      bg-hive-brand-secondary text-white
      rounded-full flex items-center justify-center font-medium
      px-1 border-2 border-white
      ${className}
    `}>
      {count > max ? `${max}+` : count}
    </div>
  );
};

// System Badge Component - Status indicators
const SystemBadge = ({ 
  type = 'info',
  size = 'md',
  children,
  className = ''
}: {
  type?: 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const typeClasses = {
    info: 'bg-hive-text-secondary/10 text-hive-text-secondary border-hive-text-secondary/20',
    success: 'bg-hive-status-success/10 text-hive-status-success border-hive-status-success/20',
    warning: 'bg-hive-status-warning/10 text-hive-status-warning border-hive-status-warning/20',
    error: 'bg-hive-status-error/10 text-hive-status-error border-hive-status-error/20'
  };

  return (
    <div className={`
      inline-flex items-center gap-1
      ${sizeClasses[size]}
      ${typeClasses[type]}
      border rounded-full font-medium
      ${className}
    `}>
      {children}
    </div>
  );
};

// Update Indicator Component - Subtle notification
const UpdateIndicator = ({ 
  hasUpdate = false,
  size = 'md',
  className = ''
}: {
  hasUpdate?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5'
  };

  if (!hasUpdate) return null;

  return (
    <div className={`
      ${sizeClasses[size]}
      bg-hive-brand-secondary rounded-full
      animate-pulse
      ${className}
    `} />
  );
};

// =========================
// NOTIFICATION BADGE STORIES
// =========================

export const NotificationBadges: Story = {
  name: '🔔 Notification Badges',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Notification Badges</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Tech-minimal notification indicators for HIVE profiles - unobtrusive count displays and system alerts.
          </p>
        </div>

        {/* Badge Variants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Badge Variants</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-12 h-12 bg-hive-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <NotificationBadge count={3} variant="default" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Default</div>
                  <div className="text-sm text-hive-text-secondary">Standard count badge</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-12 h-12 bg-hive-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
                    B
                  </div>
                  <NotificationBadge count={7} variant="minimal" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Minimal</div>
                  <div className="text-sm text-hive-text-secondary">Subtle count display</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-12 h-12 bg-hive-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
                    C
                  </div>
                  <NotificationBadge count={1} variant="dot" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Dot</div>
                  <div className="text-sm text-hive-text-secondary">Simple indicator</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Count Ranges */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Count Ranges</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[0, 1, 5, 12, 47, 99, 100, 999, 1000].map(count => (
                <div key={count} className="text-center space-y-3">
                  <div className="relative inline-block">
                    <div className="w-12 h-12 bg-hive-text-secondary rounded-lg flex items-center justify-center text-white font-bold">
                      {count === 0 ? '0' : 'N'}
                    </div>
                    <NotificationBadge count={count} />
                  </div>
                  <div className="text-sm text-hive-text-secondary">
                    {count === 0 ? 'None' : `${count}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badge Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Badge Sizes</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size} className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className={`
                      ${size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-12 h-12' : 'w-14 h-14'}
                      bg-hive-brand-primary rounded-lg flex items-center justify-center text-white font-bold
                    `}>
                      {size.toUpperCase()}
                    </div>
                    <NotificationBadge count={42} size={size} />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">{size.toUpperCase()}</div>
                    <div className="text-sm text-hive-text-secondary">{size} size badge</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Badge Positions */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Badge Positions</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {(['top-right', 'top-left', 'bottom-right', 'bottom-left'] as const).map(position => (
                <div key={position} className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-16 h-16 bg-hive-text-secondary rounded-lg flex items-center justify-center text-white font-bold">
                      POS
                    </div>
                    <NotificationBadge count={8} position={position} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-hive-text-primary">{position}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const SystemBadges: Story = {
  name: '🏷️ System Badges',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">System Badges</h1>
          <p className="text-lg text-hive-text-secondary">
            Status and information badges for profile system notifications
          </p>
        </div>

        {/* Badge Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Badge Types</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-4">
                <SystemBadge type="info">Info</SystemBadge>
                <div className="text-sm text-hive-text-secondary">General information</div>
              </div>

              <div className="text-center space-y-4">
                <SystemBadge type="success">Success</SystemBadge>
                <div className="text-sm text-hive-text-secondary">Positive feedback</div>
              </div>

              <div className="text-center space-y-4">
                <SystemBadge type="warning">Warning</SystemBadge>
                <div className="text-sm text-hive-text-secondary">Attention needed</div>
              </div>

              <div className="text-center space-y-4">
                <SystemBadge type="error">Error</SystemBadge>
                <div className="text-sm text-hive-text-secondary">Critical issue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Badge Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Badge Sizes</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="space-y-6">
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size} className="space-y-3">
                  <h3 className="text-lg font-semibold text-hive-text-primary">{size.toUpperCase()} Size</h3>
                  <div className="flex flex-wrap gap-3">
                    <SystemBadge type="info" size={size}>Information</SystemBadge>
                    <SystemBadge type="success" size={size}>Completed</SystemBadge>
                    <SystemBadge type="warning" size={size}>Pending</SystemBadge>
                    <SystemBadge type="error" size={size}>Failed</SystemBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Update Indicators */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Update Indicators</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(['sm', 'md', 'lg'] as const).map(size => (
                <div key={size} className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-hive-text-secondary">New updates</span>
                    <UpdateIndicator hasUpdate={true} size={size} />
                  </div>
                  <div className="text-sm text-hive-text-secondary">{size} indicator</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const BadgeUsageExamples: Story = {
  name: '🎯 Usage Examples',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Badge Usage Examples</h1>
          <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Real-world implementation showing how notification badges work in the HIVE profile system
          </p>
        </div>

        {/* Profile Header */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Profile Header Context</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  SC
                </div>
                <NotificationBadge count={3} size="lg" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-bold text-hive-text-primary">Sarah Chen</h3>
                  <SystemBadge type="success" size="sm">Verified</SystemBadge>
                </div>
                <div className="text-hive-text-secondary">@sarahc • Computer Science • Class of 2025</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-hive-text-secondary">Profile completion:</span>
                  <SystemBadge type="warning" size="sm">85%</SystemBadge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Navigation Context</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-8">
              {[
                { label: 'Messages', count: 12 },
                { label: 'Spaces', count: 0 },
                { label: 'Tools', count: 2 },
                { label: 'Calendar', count: 5 }
              ].map(({ label, count }) => (
                <div key={label} className="relative">
                  <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-hive-background-primary transition-colors">
                    <div className="w-8 h-8 bg-hive-text-secondary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                      {label[0]}
                    </div>
                    <span className="text-sm text-hive-text-secondary">{label}</span>
                  </button>
                  {count > 0 && <NotificationBadge count={count} position="top-right" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Widget Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Context</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Calendar Widget */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-hive-text-primary">Calendar</h3>
                  <UpdateIndicator hasUpdate={true} />
                </div>
                <NotificationBadge count={3} variant="minimal" />
              </div>
              <div className="space-y-2 text-sm text-hive-text-secondary">
                <div>• CS Final - Tomorrow 2PM</div>
                <div>• Study Group - Friday 4PM</div>
                <div>• Office Hours - Next Week</div>
              </div>
            </div>

            {/* Spaces Widget */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">My Spaces</h3>
                <div className="flex items-center gap-2">
                  <SystemBadge type="info" size="sm">5 Active</SystemBadge>
                  <NotificationBadge count={8} variant="dot" />
                </div>
              </div>
              <div className="space-y-2 text-sm text-hive-text-secondary">
                <div>• CS Study Group (3 new)</div>
                <div>• Dorm Floor Chat (2 new)</div>
                <div>• Project Team (3 new)</div>
              </div>
            </div>

            {/* Tools Widget */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">HiveLAB</h3>
                <div className="flex items-center gap-2">
                  <SystemBadge type="success" size="sm">2 Published</SystemBadge>
                </div>
              </div>
              <div className="space-y-2 text-sm text-hive-text-secondary">
                <div>• Grade Calculator</div>
                <div>• Study Timer</div>
                <div className="flex items-center gap-2">
                  <span>• Flashcard App</span>
                  <SystemBadge type="warning" size="sm">Draft</SystemBadge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Feed */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Notification Feed</h2>
          
          <div className="bg-white rounded-lg p-6 space-y-4">
            {[
              { type: 'info' as const, message: 'Profile viewed by 12 people this week', time: '2h ago' },
              { type: 'success' as const, message: 'Successfully joined CS Study Group', time: '4h ago' },
              { type: 'warning' as const, message: 'Complete your profile to unlock features', time: '1d ago' },
              { type: 'error' as const, message: 'Failed to sync calendar events', time: '2d ago' }
            ].map(({ type, message, time }, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-hive-background-primary transition-colors">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-hive-brand-secondary rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <span className="text-sm text-hive-text-primary">{message}</span>
                    <SystemBadge type={type} size="sm">{type}</SystemBadge>
                  </div>
                  <div className="text-xs text-hive-text-tertiary">{time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};