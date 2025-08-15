import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/02-Atoms/Profile Core/Profile Connection Indicators',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tech-minimal connection type indicators for HIVE profiles - clean visual elements for relationship status and connection types.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Connection Type Indicator Component
const ConnectionTypeIndicator = ({ 
  type = 'mutual',
  size = 'md',
  variant = 'icon',
  className = ''
}: {
  type?: 'mutual' | 'following' | 'follower' | 'requested' | 'blocked';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'badge' | 'minimal';
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 text-xs',
    md: 'w-5 h-5 text-sm',
    lg: 'w-6 h-6 text-base'
  };

  const typeConfig = {
    mutual: {
      color: 'text-hive-brand-secondary',
      bg: 'bg-hive-brand-secondary/10',
      border: 'border-hive-brand-secondary/20',
      icon: '↔',
      label: 'Mutual'
    },
    following: {
      color: 'text-hive-status-info',
      bg: 'bg-hive-status-info/10',
      border: 'border-hive-status-info/20',
      icon: '→',
      label: 'Following'
    },
    follower: {
      color: 'text-hive-status-success',
      bg: 'bg-hive-status-success/10',
      border: 'border-hive-status-success/20',
      icon: '←',
      label: 'Follower'
    },
    requested: {
      color: 'text-hive-status-warning',
      bg: 'bg-hive-status-warning/10',
      border: 'border-hive-status-warning/20',
      icon: '⋯',
      label: 'Requested'
    },
    blocked: {
      color: 'text-hive-text-tertiary',
      bg: 'bg-hive-text-tertiary/10',
      border: 'border-hive-text-tertiary/20',
      icon: '⊘',
      label: 'Blocked'
    }
  };

  const config = typeConfig[type];

  if (variant === 'minimal') {
    return (
      <div className={`
        ${sizeClasses[size]}
        ${config.color}
        flex items-center justify-center font-bold
        ${className}
      `}>
        {config.icon}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`
        inline-flex items-center gap-1
        ${config.color} ${config.bg} ${config.border}
        px-2 py-1 text-xs border rounded-full font-medium
        ${className}
      `}>
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </div>
    );
  }

  return (
    <div className={`
      ${sizeClasses[size]}
      ${config.color} ${config.bg} ${config.border}
      border rounded-full flex items-center justify-center font-bold
      ${className}
    `}>
      {config.icon}
    </div>
  );
};

// Connection Strength Indicator
const ConnectionStrengthIndicator = ({ 
  strength = 50,
  size = 'md',
  showValue = false,
  className = ''
}: {
  strength?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2', 
    lg: 'h-3'
  };

  const getColor = (strength: number) => {
    if (strength >= 80) return 'bg-hive-status-success';
    if (strength >= 60) return 'bg-hive-brand-secondary';
    if (strength >= 40) return 'bg-hive-status-warning';
    return 'bg-hive-text-tertiary';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`
        w-12 ${sizeClasses[size]} bg-hive-background-secondary rounded-full overflow-hidden
      `}>
        <div 
          className={`h-full ${getColor(strength)} transition-all duration-300`}
          style={{ width: `${strength}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs text-hive-text-secondary font-medium">
          {strength}%
        </span>
      )}
    </div>
  );
};

export const ConnectionIndicators: Story = {
  name: '🔗 Connection Indicators',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Connection Indicators</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Tech-minimal connection type indicators for HIVE profiles - clean visual elements for relationship status.
          </p>
        </div>

        {/* Connection Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Connection Types</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {(['mutual', 'following', 'follower', 'requested', 'blocked'] as const).map(type => (
                <div key={type} className="text-center space-y-3">
                  <ConnectionTypeIndicator type={type} size="lg" />
                  <div>
                    <div className="text-sm font-semibold text-hive-text-primary capitalize">{type}</div>
                    <div className="text-xs text-hive-text-secondary">
                      {type === 'mutual' && 'Connected both ways'}
                      {type === 'following' && 'You follow them'}
                      {type === 'follower' && 'They follow you'}
                      {type === 'requested' && 'Pending approval'}
                      {type === 'blocked' && 'Access restricted'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicator Variants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Indicator Variants</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <ConnectionTypeIndicator type="mutual" variant="icon" size="xl" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Icon</div>
                  <div className="text-sm text-hive-text-secondary">Simple icon indicator</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ConnectionTypeIndicator type="mutual" variant="badge" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Badge</div>
                  <div className="text-sm text-hive-text-secondary">Icon with label</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ConnectionTypeIndicator type="mutual" variant="minimal" size="xl" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Minimal</div>
                  <div className="text-sm text-hive-text-secondary">Clean symbol only</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connection Strength */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Connection Strength</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="space-y-6">
              {[95, 75, 55, 30, 10].map(strength => (
                <div key={strength} className="flex items-center gap-4">
                  <div className="w-20 text-sm text-hive-text-secondary">
                    {strength >= 80 ? 'Strong' : strength >= 60 ? 'Good' : strength >= 40 ? 'Medium' : strength >= 20 ? 'Weak' : 'Minimal'}
                  </div>
                  <ConnectionStrengthIndicator strength={strength} showValue={true} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Usage Examples</h2>
          
          <div className="bg-white rounded-lg p-6 space-y-4">
            {[
              { name: 'Sarah Chen', type: 'mutual' as const, strength: 85 },
              { name: 'Marcus Williams', type: 'following' as const, strength: 45 },
              { name: 'Emma Rodriguez', type: 'follower' as const, strength: 60 },
              { name: 'Alex Rivera', type: 'requested' as const, strength: 0 }
            ].map(({ name, type, strength }) => (
              <div key={name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-hive-background-primary transition-colors">
                <div className="w-10 h-10 bg-hive-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-hive-text-primary">{name}</div>
                  {strength > 0 && (
                    <ConnectionStrengthIndicator strength={strength} size="sm" />
                  )}
                </div>
                <ConnectionTypeIndicator type={type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
};