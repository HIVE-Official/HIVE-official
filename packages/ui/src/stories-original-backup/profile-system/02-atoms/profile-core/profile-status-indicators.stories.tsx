import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/02-Atoms/Profile Core/Profile Status Indicators',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Minimal activity indicators for HIVE profiles - clean, tech-focused visual elements for connection states.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Activity Indicator Component - Clean and minimal
const ActivityIndicator = ({ 
  active = false,
  size = 'md', 
  variant = 'solid',
  className = '',
  onClick 
}: {
  active?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'solid' | 'ring' | 'pulse';
  className?: string;
  onClick?: () => void;
}) => {
  const sizeClasses = {
    xs: 'w-2 h-2',
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  const baseClasses = `
    rounded-full transition-all duration-200
    ${onClick ? 'cursor-pointer hover:scale-110' : ''}
    ${className}
  `;

  if (variant === 'ring') {
    return (
      <div 
        className={`
          ${sizeClasses[size]} 
          ${active ? 'border-2 border-hive-brand-secondary bg-hive-brand-secondary/20' : 'border border-hive-border-default'}
          ${baseClasses}
        `}
        onClick={onClick}
      />
    );
  }

  if (variant === 'pulse') {
    return (
      <div 
        className={`
          ${sizeClasses[size]} 
          ${active ? 'bg-hive-brand-secondary animate-pulse' : 'bg-hive-background-secondary'}
          ${baseClasses}
        `}
        onClick={onClick}
      />
    );
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${active ? 'bg-hive-brand-secondary' : 'bg-hive-background-secondary'}
        ${baseClasses}
      `}
      onClick={onClick}
    />
  );
};

// Connection State Component - Tech minimal
const ConnectionState = ({ 
  connected = false,
  size = 'md',
  showLabel = false,
  className = ''
}: {
  connected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-6 h-3',
    md: 'w-8 h-4', 
    lg: 'w-10 h-5'
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className={`
        ${sizeClasses[size]} 
        ${connected ? 'bg-hive-brand-secondary' : 'bg-hive-background-secondary'} 
        rounded-full border border-hive-border-default
        transition-colors duration-200
      `} />
      {showLabel && (
        <span className="text-sm font-medium text-hive-text-secondary">
          {connected ? 'Connected' : 'Offline'}
        </span>
      )}
    </div>
  );
};

// =========================
// ACTIVITY INDICATOR STORIES
// =========================

export const ActivityIndicators: Story = {
  name: '🎯 Activity Indicators',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Activity Indicators</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Minimal, tech-focused activity indicators for HIVE profiles - clean visual elements for connection states.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Variants</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <ActivityIndicator variant="solid" active={true} size="xl" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Solid</div>
                  <div className="text-sm text-hive-text-secondary">Clean filled indicator</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ActivityIndicator variant="ring" active={true} size="xl" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Ring</div>
                  <div className="text-sm text-hive-text-secondary">Outlined border</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ActivityIndicator variant="pulse" active={true} size="xl" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Pulse</div>
                  <div className="text-sm text-hive-text-secondary">Subtle animation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Sizes</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="space-y-6">
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <div key={size} className="flex items-center gap-8">
                  <div className="w-12 text-sm font-medium text-hive-text-secondary">{size}</div>
                  <div className="flex items-center gap-6">
                    <ActivityIndicator variant="solid" active={true} size={size} />
                    <ActivityIndicator variant="ring" active={true} size={size} />
                    <ActivityIndicator variant="pulse" active={true} size={size} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">States</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center space-y-4">
                <ActivityIndicator active={true} size="xl" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Active</div>
                  <div className="text-sm text-hive-text-secondary">Connected state</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ActivityIndicator active={false} size="xl" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Inactive</div>
                  <div className="text-sm text-hive-text-secondary">Disconnected state</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const ConnectionStates: Story = {
  name: '🔗 Connection States',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Connection States</h1>
          <p className="text-lg text-hive-text-secondary">
            Tech-minimal connection indicators for profile interactions
          </p>
        </div>

        {/* Basic States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Basic States</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center space-y-4">
                <ConnectionState connected={true} size="lg" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Connected</div>
                  <div className="text-sm text-hive-text-secondary">Active connection</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ConnectionState connected={false} size="lg" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Offline</div>
                  <div className="text-sm text-hive-text-secondary">No connection</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Usage Examples</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Context */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Profile Context</h3>
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    SC
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-hive-text-primary">Sarah Chen</h4>
                      <ActivityIndicator active={true} size="md" />
                    </div>
                    <div className="text-sm text-hive-text-secondary mb-2">@sarahc • Computer Science</div>
                    <ConnectionState connected={true} showLabel={true} />
                  </div>
                </div>
              </div>
            </div>

            {/* List Context */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">List Context</h3>
              <div className="bg-white rounded-lg p-4 space-y-3">
                {[
                  { name: 'Sarah Chen', connected: true },
                  { name: 'Marcus Williams', connected: true },
                  { name: 'Emma Rodriguez', connected: false },
                  { name: 'Alex Rivera', connected: false }
                ].map(({ name, connected }, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 hover:bg-hive-background-primary rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-hive-brand-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-hive-text-primary">{name}</div>
                    </div>
                    <ActivityIndicator active={connected} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};