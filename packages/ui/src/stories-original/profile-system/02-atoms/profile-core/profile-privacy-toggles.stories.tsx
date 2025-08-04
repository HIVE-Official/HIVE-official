import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile System/02-Atoms/Profile Core/Profile Privacy Toggles',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tech-minimal privacy controls for HIVE profiles - clean, intuitive toggles for profile visibility and data sharing.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Privacy Toggle Component - Tech minimal
const PrivacyToggle = ({ 
  enabled = false,
  size = 'md',
  variant = 'switch',
  disabled = false,
  className = '',
  onChange 
}: {
  enabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'switch' | 'checkbox' | 'minimal';
  disabled?: boolean;
  className?: string;
  onChange?: (enabled: boolean) => void;
}) => {
  const sizeClasses = {
    sm: 'w-8 h-5',
    md: 'w-10 h-6',
    lg: 'w-12 h-7'
  };

  const thumbSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'checkbox') {
    return (
      <button
        className={`
          ${sizeClasses[size]}
          ${enabled ? 'bg-hive-brand-secondary' : 'bg-hive-background-secondary'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
          border border-hive-border-default rounded-md
          flex items-center justify-center transition-all duration-200
          ${className}
        `}
        onClick={() => !disabled && onChange?.(!enabled)}
        disabled={disabled}
      >
        {enabled && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    );
  }

  if (variant === 'minimal') {
    return (
      <button
        className={`
          w-6 h-6 rounded-full border-2
          ${enabled ? 'border-hive-brand-secondary bg-hive-brand-secondary' : 'border-hive-border-default bg-transparent'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
          transition-all duration-200
          ${className}
        `}
        onClick={() => !disabled && onChange?.(!enabled)}
        disabled={disabled}
      >
        {enabled && (
          <div className="w-full h-full rounded-full bg-white scale-50" />
        )}
      </button>
    );
  }

  return (
    <button
      className={`
        ${sizeClasses[size]}
        ${enabled ? 'bg-hive-brand-secondary' : 'bg-hive-background-secondary'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}
        border border-hive-border-default rounded-full
        flex items-center transition-all duration-200 p-0.5
        ${className}
      `}
      onClick={() => !disabled && onChange?.(!enabled)}
      disabled={disabled}
    >
      <div className={`
        ${thumbSizeClasses[size]}
        bg-white rounded-full shadow-sm
        transform transition-transform duration-200
        ${enabled ? 'translate-x-full' : 'translate-x-0'}
      `} />
    </button>
  );
};

// Privacy Level Selector - Clean level selection
const PrivacyLevelSelector = ({ 
  level = 'public',
  size = 'md',
  className = '',
  onChange 
}: {
  level?: 'public' | 'connections' | 'private';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onChange?: (level: 'public' | 'connections' | 'private') => void;
}) => {
  const levels = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'connections', label: 'Connections', description: 'Visible to connections only' },
    { value: 'private', label: 'Private', description: 'Visible to you only' }
  ];

  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4'
  };

  return (
    <div className={`inline-flex rounded-lg border border-hive-border-default bg-hive-background-secondary p-1 ${className}`}>
      {levels.map(({ value, label }) => (
        <button
          key={value}
          className={`
            ${sizeClasses[size]}
            ${level === value 
              ? 'bg-white text-hive-text-primary shadow-sm' 
              : 'text-hive-text-secondary hover:text-hive-text-primary'
            }
            rounded-md font-medium transition-all duration-200
          `}
          onClick={() => onChange?.(value as any)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

// Privacy Status Indicator - Shows current privacy level
const PrivacyStatusIndicator = ({ 
  level = 'public',
  size = 'md',
  showLabel = false,
  className = ''
}: {
  level?: 'public' | 'connections' | 'private';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}) => {
  const config = {
    public: {
      color: 'text-hive-status-info',
      bg: 'bg-hive-status-info/10',
      border: 'border-hive-status-info/20',
      icon: '🌐',
      label: 'Public'
    },
    connections: {
      color: 'text-hive-status-warning',
      bg: 'bg-hive-status-warning/10',
      border: 'border-hive-status-warning/20',
      icon: '👥',
      label: 'Connections'
    },
    private: {
      color: 'text-hive-text-secondary',
      bg: 'bg-hive-text-secondary/10',
      border: 'border-hive-text-secondary/20',
      icon: '🔒',
      label: 'Private'
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const levelConfig = config[level];

  return (
    <div className={`
      inline-flex items-center gap-1.5
      ${levelConfig.color} ${levelConfig.bg} ${levelConfig.border}
      ${sizeClasses[size]}
      border rounded-full font-medium
      ${className}
    `}>
      <span className="text-xs">{levelConfig.icon}</span>
      {showLabel && <span>{levelConfig.label}</span>}
    </div>
  );
};

// =========================
// PRIVACY TOGGLE STORIES
// =========================

export const PrivacyToggles: Story = {
  name: '🔒 Privacy Toggles',
  render: () => {
    const [toggleStates, setToggleStates] = useState({
      profile: true,
      activity: false,
      connections: true,
      calendar: false
    });

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Privacy Toggles</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Tech-minimal privacy controls for HIVE profiles - clean, intuitive toggles for visibility and data sharing.
            </p>
          </div>

          {/* Toggle Variants */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Toggle Variants</h2>
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <PrivacyToggle variant="switch" enabled={true} />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">Switch</div>
                    <div className="text-sm text-hive-text-secondary">Standard toggle switch</div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <PrivacyToggle variant="checkbox" enabled={true} />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">Checkbox</div>
                    <div className="text-sm text-hive-text-secondary">Simple checkbox style</div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <PrivacyToggle variant="minimal" enabled={true} />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">Minimal</div>
                    <div className="text-sm text-hive-text-secondary">Clean circle toggle</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Sizes */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Toggle Sizes</h2>
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(['sm', 'md', 'lg'] as const).map(size => (
                  <div key={size} className="text-center space-y-4">
                    <PrivacyToggle size={size} enabled={true} />
                    <div>
                      <div className="text-lg font-semibold text-hive-text-primary">{size.toUpperCase()}</div>
                      <div className="text-sm text-hive-text-secondary">{size} size toggle</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle States */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Toggle States</h2>
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <PrivacyToggle enabled={true} />
                  <div className="text-sm text-hive-text-secondary">Enabled</div>
                </div>

                <div className="text-center space-y-3">
                  <PrivacyToggle enabled={false} />
                  <div className="text-sm text-hive-text-secondary">Disabled</div>
                </div>

                <div className="text-center space-y-3">
                  <PrivacyToggle enabled={true} disabled={true} />
                  <div className="text-sm text-hive-text-secondary">Locked On</div>
                </div>

                <div className="text-center space-y-3">
                  <PrivacyToggle enabled={false} disabled={true} />
                  <div className="text-sm text-hive-text-secondary">Locked Off</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Privacy Settings */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Interactive Settings</h2>
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
              <div className="bg-white rounded-lg p-6 max-w-md mx-auto space-y-6">
                <h3 className="text-lg font-semibold text-hive-text-primary">Privacy Controls</h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'profile', label: 'Profile Visibility', description: 'Show profile to others' },
                    { key: 'activity', label: 'Activity Status', description: 'Show online/offline status' },
                    { key: 'connections', label: 'Connection List', description: 'Show your connections' },
                    { key: 'calendar', label: 'Calendar Events', description: 'Show your schedule' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-hive-text-primary">{label}</div>
                        <div className="text-xs text-hive-text-secondary">{description}</div>
                      </div>
                      <PrivacyToggle
                        enabled={toggleStates[key as keyof typeof toggleStates]}
                        onChange={(enabled) => setToggleStates(prev => ({ ...prev, [key]: enabled }))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const PrivacyLevels: Story = {
  name: '🛡️ Privacy Levels',
  render: () => {
    const [profileLevel, setProfileLevel] = useState<'public' | 'connections' | 'private'>('connections');
    const [activityLevel, setActivityLevel] = useState<'public' | 'connections' | 'private'>('public');

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-hive-text-primary">Privacy Levels</h1>
            <p className="text-lg text-hive-text-secondary">
              Granular privacy control with multiple visibility levels
            </p>
          </div>

          {/* Privacy Level Selectors */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Level Selectors</h2>
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
              <div className="space-y-6">
                {(['sm', 'md', 'lg'] as const).map(size => (
                  <div key={size} className="space-y-3">
                    <h3 className="text-lg font-semibold text-hive-text-primary">{size.toUpperCase()} Size</h3>
                    <PrivacyLevelSelector level="connections" size={size} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Status Indicators */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Status Indicators</h2>
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <PrivacyStatusIndicator level="public" showLabel={true} />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">Public</div>
                    <div className="text-sm text-hive-text-secondary">Visible to everyone</div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <PrivacyStatusIndicator level="connections" showLabel={true} />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">Connections</div>
                    <div className="text-sm text-hive-text-secondary">Connections only</div>
                  </div>
                </div>

                <div className="text-center space-y-4">
                  <PrivacyStatusIndicator level="private" showLabel={true} />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">Private</div>
                    <div className="text-sm text-hive-text-secondary">Only you can see</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Privacy Configuration */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Privacy Configuration</h2>
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
              <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto space-y-6">
                <h3 className="text-lg font-semibold text-hive-text-primary">Configure Privacy Levels</h3>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-hive-text-primary">Profile Information</div>
                        <div className="text-xs text-hive-text-secondary">Who can see your profile details</div>
                      </div>
                      <PrivacyStatusIndicator level={profileLevel} />
                    </div>
                    <PrivacyLevelSelector 
                      level={profileLevel} 
                      onChange={setProfileLevel}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-hive-text-primary">Activity Status</div>
                        <div className="text-xs text-hive-text-secondary">Who can see your online status</div>
                      </div>
                      <PrivacyStatusIndicator level={activityLevel} />
                    </div>
                    <PrivacyLevelSelector 
                      level={activityLevel} 
                      onChange={setActivityLevel}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const PrivacyUsageExamples: Story = {
  name: '🎯 Usage Examples',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Privacy Usage Examples</h1>
          <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Real-world implementation showing how privacy controls work in the HIVE profile system
          </p>
        </div>

        {/* Profile Settings Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Profile Settings Context</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-hive-border-default">
                <h3 className="text-lg font-semibold text-hive-text-primary">Privacy Settings</h3>
                <PrivacyStatusIndicator level="connections" showLabel={true} />
              </div>
              
              <div className="space-y-4">
                {[
                  { 
                    title: 'Profile Visibility', 
                    description: 'Control who can see your full profile',
                    current: 'connections' as const,
                    enabled: true 
                  },
                  { 
                    title: 'Activity Status', 
                    description: 'Show your online/offline status',
                    current: 'public' as const,
                    enabled: true 
                  },
                  { 
                    title: 'Connection List', 
                    description: 'Display your connections publicly',
                    current: 'private' as const,
                    enabled: false 
                  },
                  { 
                    title: 'Calendar Integration', 
                    description: 'Show availability from calendar',
                    current: 'connections' as const,
                    enabled: true 
                  }
                ].map(({ title, description, current, enabled }) => (
                  <div key={title} className="flex items-center justify-between p-4 rounded-lg hover:bg-hive-background-primary transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium text-hive-text-primary">{title}</span>
                        <PrivacyStatusIndicator level={current} size="sm" />
                      </div>
                      <div className="text-xs text-hive-text-secondary">{description}</div>
                    </div>
                    <PrivacyToggle enabled={enabled} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Widget Privacy Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Privacy Context</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Calendar Widget */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Calendar</h3>
                <div className="flex items-center gap-2">
                  <PrivacyStatusIndicator level="connections" size="sm" />
                  <PrivacyToggle enabled={true} size="sm" />
                </div>
              </div>
              <div className="space-y-2 text-sm text-hive-text-secondary">
                <div>• CS Final - Tomorrow 2PM</div>
                <div>• Study Group - Friday 4PM</div>
                <div>• Office Hours - Next Week</div>
              </div>
            </div>

            {/* Connections Widget */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Connections</h3>
                <div className="flex items-center gap-2">
                  <PrivacyStatusIndicator level="private" size="sm" />
                  <PrivacyToggle enabled={false} size="sm" />
                </div>
              </div>
              <div className="text-sm text-hive-text-secondary opacity-50">
                Connection list is private
              </div>
            </div>

            {/* Activity Widget */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Activity</h3>
                <div className="flex items-center gap-2">
                  <PrivacyStatusIndicator level="public" size="sm" />
                  <PrivacyToggle enabled={true} size="sm" />
                </div>
              </div>
              <div className="space-y-2 text-sm text-hive-text-secondary">
                <div>• Active in CS Study Group</div>
                <div>• Completed Java Assignment</div>
                <div>• Joined Physics Lab</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Privacy Modes */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Quick Privacy Modes</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  mode: 'Public Profile',
                  description: 'Open to everyone',
                  level: 'public' as const,
                  settings: ['Profile: Public', 'Activity: Public', 'Connections: Public']
                },
                {
                  mode: 'Connections Only',
                  description: 'Visible to connections',
                  level: 'connections' as const,
                  settings: ['Profile: Connections', 'Activity: Connections', 'Connections: Private']
                },
                {
                  mode: 'Private Mode',
                  description: 'Maximum privacy',
                  level: 'private' as const,
                  settings: ['Profile: Private', 'Activity: Private', 'Connections: Private']
                }
              ].map(({ mode, description, level, settings }) => (
                <div key={mode} className="text-center space-y-4 p-4 rounded-lg border border-hive-border-default hover:border-hive-brand-secondary transition-colors cursor-pointer">
                  <PrivacyStatusIndicator level={level} showLabel={true} size="lg" />
                  <div>
                    <div className="text-lg font-semibold text-hive-text-primary">{mode}</div>
                    <div className="text-sm text-hive-text-secondary mb-3">{description}</div>
                  </div>
                  <div className="space-y-1">
                    {settings.map((setting, index) => (
                      <div key={index} className="text-xs text-hive-text-tertiary">
                        {setting}
                      </div>
                    ))}
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