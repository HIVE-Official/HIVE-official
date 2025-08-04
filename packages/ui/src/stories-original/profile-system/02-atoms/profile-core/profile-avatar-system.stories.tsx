import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/02-Atoms/Profile Core/Profile Avatar System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive avatar system for HIVE profiles, supporting multiple sizes, status indicators, customization options, and accessibility features.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Avatar Component (would be imported from actual component)
const ProfileAvatar = ({ 
  src, 
  name, 
  size = 'md', 
  status, 
  showStatus = true, 
  customizable = false,
  borderColor = 'hive-brand-primary',
  className = '',
  onClick 
}: {
  src?: string | null;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'away' | 'busy' | 'offline';
  showStatus?: boolean;
  customizable?: boolean;
  borderColor?: string;
  className?: string;
  onClick?: () => void;
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24'
  };

  const statusColors = {
    online: 'bg-hive-status-success',
    away: 'bg-hive-status-warning',
    busy: 'bg-hive-status-error',
    offline: 'bg-gray-400'
  };

  const statusSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-5 h-5',
    '2xl': 'w-6 h-6'
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          border-2 border-${borderColor} 
          rounded-full 
          overflow-hidden 
          ${onClick ? 'cursor-pointer hover:border-hive-brand-secondary transition-colors' : ''}
          ${customizable ? 'hover:ring-2 hover:ring-hive-brand-primary/30' : ''}
        `}
        onClick={onClick}
      >
        {src ? (
          <img 
            src={src} 
            alt={`${name}'s avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary flex items-center justify-center text-white font-bold">
            {initials}
          </div>
        )}
      </div>
      
      {showStatus && status && (
        <div className={`
          absolute -bottom-0.5 -right-0.5 
          ${statusSizes[size]} 
          ${statusColors[status]} 
          border-2 border-white 
          rounded-full
        `} />
      )}
      
      {customizable && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-hive-brand-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-hive-brand-secondary transition-colors">
          <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </div>
      )}
    </div>
  );
};

// =========================
// PROFILE AVATAR STORIES
// =========================

export const DefaultAvatars: Story = {
  name: '🎯 Default Avatar Sizes',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Profile Avatar System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Comprehensive avatar system supporting multiple sizes, status indicators, and customization options 
            for all profile contexts within the HIVE platform.
          </p>
        </div>

        {/* Size Variations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">📏 Size Variations</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="flex items-end gap-8 justify-center">
              {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map(size => (
                <div key={size} className="text-center space-y-3">
                  <ProfileAvatar
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face"
                    name="Sarah Chen"
                    size={size}
                    status="online"
                  />
                  <div className="text-sm text-hive-text-secondary">{size}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🟢 Status Indicators</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { status: 'online', label: 'Online', description: 'Available for connection' },
                { status: 'away', label: 'Away', description: 'Temporarily unavailable' },
                { status: 'busy', label: 'Busy', description: 'Do not disturb' },
                { status: 'offline', label: 'Offline', description: 'Not currently active' }
              ].map(({ status, label, description }) => (
                <div key={status} className="text-center space-y-3">
                  <ProfileAvatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    name="Marcus Williams"
                    size="lg"
                    status={status as any}
                  />
                  <div>
                    <div className="text-sm font-semibold text-hive-text-primary">{label}</div>
                    <div className="text-xs text-hive-text-secondary">{description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Without Photos */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">👤 Initials Fallback</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { name: 'Sarah Chen', status: 'online' },
                { name: 'Marcus Williams', status: 'busy' },
                { name: 'Emma Rodriguez', status: 'away' },
                { name: 'Alex Rivera', status: 'offline' }
              ].map(({ name, status }) => (
                <div key={name} className="text-center space-y-3">
                  <ProfileAvatar
                    src={null}
                    name={name}
                    size="lg"
                    status={status as any}
                  />
                  <div>
                    <div className="text-sm font-semibold text-hive-text-primary">{name}</div>
                    <div className="text-xs text-hive-text-secondary">No photo uploaded</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customizable Avatars */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">⚙️ Customizable Avatars</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <ProfileAvatar
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face"
                  name="Sarah Chen"
                  size="xl"
                  status="online"
                  customizable={true}
                  onClick={() => console.log('Avatar clicked - open edit modal')}
                />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Edit Mode</div>
                  <div className="text-sm text-hive-text-secondary">Click avatar to customize</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ProfileAvatar
                  src={null}
                  name="New User"
                  size="xl"
                  status="online"
                  customizable={true}
                  onClick={() => console.log('Upload photo clicked')}
                />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Upload Photo</div>
                  <div className="text-sm text-hive-text-secondary">Add your first photo</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <ProfileAvatar
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  name="Jordan Smith"
                  size="xl"
                  status="away"
                  customizable={true}
                  borderColor="hive-brand-secondary"
                  onClick={() => console.log('Custom border avatar clicked')}
                />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Custom Border</div>
                  <div className="text-sm text-hive-text-secondary">Personalized styling</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Contexts */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">🎯 Usage Contexts</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Header */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Profile Header</h3>
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <ProfileAvatar
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face"
                    name="Sarah Chen"
                    size="xl"
                    status="online"
                    customizable={true}
                  />
                  <div>
                    <div className="text-xl font-bold text-hive-text-primary">Sarah Chen</div>
                    <div className="text-sm text-hive-text-secondary">@sarahc</div>
                    <div className="text-xs text-hive-text-tertiary">Computer Science • Class of 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget Avatar */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Widget Context</h3>
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <ProfileAvatar
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    name="Marcus Williams"
                    size="md"
                    status="busy"
                  />
                  <div>
                    <div className="text-sm font-semibold text-hive-text-primary">Marcus Williams</div>
                    <div className="text-xs text-hive-text-secondary">Active in CS Study Group</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ProfileAvatar
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    name="Yuki Tanaka"
                    size="md"
                    status="online"
                  />
                  <div>
                    <div className="text-sm font-semibold text-hive-text-primary">Yuki Tanaka</div>
                    <div className="text-xs text-hive-text-secondary">Recently joined</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mini Avatars */}
            <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Mini Context</h3>
              <div className="bg-white rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-hive-text-secondary">
                  <span>Recent activity:</span>
                  <div className="flex -space-x-1">
                    <ProfileAvatar
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face"
                      name="Sarah Chen"
                      size="sm"
                      showStatus={false}
                    />
                    <ProfileAvatar
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                      name="Marcus Williams"
                      size="sm"
                      showStatus={false}
                    />
                    <ProfileAvatar
                      src={null}
                      name="Alex Rivera"
                      size="sm"
                      showStatus={false}
                    />
                    <div className="w-8 h-8 bg-hive-text-tertiary/20 rounded-full border-2 border-white flex items-center justify-center text-xs text-hive-text-tertiary">
                      +3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">♿ Accessibility Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">🎯 Screen Reader Support</h3>
              <ul className="space-y-2 text-hive-text-secondary">
                <li>• Descriptive alt text for all avatars</li>
                <li>• ARIA labels for status indicators</li>
                <li>• Semantic markup for interactive elements</li>
                <li>• Keyboard navigation support</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-hive-text-primary">🎨 Visual Accessibility</h3>
              <ul className="space-y-2 text-hive-text-secondary">
                <li>• High contrast borders and indicators</li>
                <li>• Color-blind friendly status colors</li>
                <li>• Clear focus states for interactions</li>
                <li>• Scalable design for vision impairments</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const InteractiveStates: Story = {
  name: '🎮 Interactive States',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Avatar Interactive States</h1>
          <p className="text-lg text-hive-text-secondary">
            All possible interactive states and hover effects for profile avatars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Default State */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Default</h3>
            <ProfileAvatar
              src="https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face"
              name="Sarah Chen"
              size="lg"
              status="online"
            />
            <p className="text-sm text-hive-text-secondary mt-2">Static display</p>
          </div>

          {/* Clickable State */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Clickable</h3>
            <ProfileAvatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              name="Marcus Williams"
              size="lg"
              status="busy"
              onClick={() => alert('Profile clicked!')}
            />
            <p className="text-sm text-hive-text-secondary mt-2">Hover & click enabled</p>
          </div>

          {/* Editable State */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Editable</h3>
            <ProfileAvatar
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
              name="Yuki Tanaka"
              size="lg"
              status="away"
              customizable={true}
              onClick={() => alert('Edit avatar clicked!')}
            />
            <p className="text-sm text-hive-text-secondary mt-2">Edit icon visible</p>
          </div>

          {/* No Photo - Editable */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Upload Photo</h3>
            <ProfileAvatar
              src={null}
              name="New User"
              size="lg"
              status="online"
              customizable={true}
              onClick={() => alert('Upload photo clicked!')}
            />
            <p className="text-sm text-hive-text-secondary mt-2">Initials + edit option</p>
          </div>

          {/* Custom Border */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Custom Border</h3>
            <ProfileAvatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              name="Jordan Smith"
              size="lg"
              status="offline"
              borderColor="hive-brand-secondary"
              onClick={() => alert('Custom styled avatar!')}
            />
            <p className="text-sm text-hive-text-secondary mt-2">Secondary brand color</p>
          </div>

          {/* No Status Indicator */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">No Status</h3>
            <ProfileAvatar
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
              name="Emma Rodriguez"
              size="lg"
              showStatus={false}
            />
            <p className="text-sm text-hive-text-secondary mt-2">Clean, minimal display</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export const ResponsiveDemo: Story = {
  name: '📱 Responsive Behavior',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-hive-text-primary">Responsive Avatar Behavior</h1>
          <p className="text-base md:text-lg text-hive-text-secondary">
            How avatars adapt across different screen sizes and contexts
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-4 md:p-6">
          <h2 className="text-xl font-semibold text-hive-text-primary mb-4">📱 Mobile Layout</h2>
          <div className="bg-white rounded-lg p-4 max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <ProfileAvatar
                src="https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face"
                name="Sarah Chen"
                size="md"
                status="online"
                customizable={true}
              />
              <div className="min-w-0 flex-1">
                <div className="text-base font-bold text-hive-text-primary truncate">Sarah Chen</div>
                <div className="text-sm text-hive-text-secondary">@sarahc</div>
              </div>
            </div>
            <div className="text-sm text-hive-text-secondary">
              Building the future of student collaboration...
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-4 md:p-6">
          <h2 className="text-xl font-semibold text-hive-text-primary mb-4">🖥️ Desktop Layout</h2>
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-6">
              <ProfileAvatar
                src="https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face"
                name="Sarah Chen"
                size="2xl"
                status="online"
                customizable={true}
                onClick={() => console.log('Large avatar clicked')}
              />
              <div className="space-y-2">
                <div className="text-3xl font-bold text-hive-text-primary">Sarah Chen</div>
                <div className="text-lg text-hive-text-secondary">@sarahc</div>
                <div className="text-base text-hive-text-tertiary">Computer Science • Class of 2025</div>
                <div className="text-base text-hive-text-secondary max-w-md">
                  Building the future of student collaboration. Love React, coffee, and late-night coding sessions. Always looking for new projects to work on!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-4 md:p-6">
          <h2 className="text-xl font-semibold text-hive-text-primary mb-4">📐 Responsive Grid</h2>
          <div className="bg-white rounded-lg p-4 md:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'Sarah C', src: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face', status: 'online' },
                { name: 'Marcus W', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', status: 'busy' },
                { name: 'Emma R', src: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face', status: 'away' },
                { name: 'Alex R', src: null, status: 'offline' },
                { name: 'Jordan S', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', status: 'online' },
                { name: 'Yuki T', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', status: 'away' }
              ].map(({ name, src, status }, index) => (
                <div key={index} className="text-center space-y-2">
                  <ProfileAvatar
                    src={src}
                    name={name}
                    size="md"
                    status={status as any}
                    className="mx-auto"
                  />
                  <div className="text-xs text-hive-text-secondary truncate">{name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};