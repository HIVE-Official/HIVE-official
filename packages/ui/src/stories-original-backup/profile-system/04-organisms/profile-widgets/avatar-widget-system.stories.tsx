import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile System/04-Organisms/Profile Widgets/Avatar Widget System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Avatar Widget (1x1) - Social identity anchor with photo-first design, contextual status badges, and social presence indicators. The centerpiece widget of every profile.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Avatar Widget Data Interface
interface AvatarWidgetData {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    photoUrl?: string;
    year: string;
    major: string;
    school: string;
    pronouns?: string;
  };
  status: {
    isOnline: boolean;
    lastSeen?: string;
    currentActivity?: string;
    ghostMode: boolean;
  };
  badges: {
    type: 'builder' | 'leader' | 'verified' | 'new' | 'active';
    label: string;
    icon: string;
  }[];
  socialContext: {
    connectionCount: number;
    spacesCount: number;
    recentActivity: string;
  };
  privacy: {
    profileVisibility: 'public' | 'connections' | 'private';
    showOnlineStatus: boolean;
    showActivity: boolean;
  };
}

// Avatar Widget State Types
type AvatarWidgetState = 'loading' | 'error' | 'empty' | 'loaded';

// Avatar Widget Component
const AvatarWidget = ({ 
  data,
  size = 'default',
  isEditMode = false,
  state = 'loaded',
  onEditProfile,
  onPrivacyToggle,
  onPhotoUpload,
  className = ''
}: {
  data?: AvatarWidgetData;
  size?: 'compact' | 'default' | 'expanded';
  isEditMode?: boolean;
  state?: AvatarWidgetState;
  onEditProfile?: () => void;
  onPrivacyToggle?: () => void;
  onPhotoUpload?: () => void;
  className?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Default data for demo
  const defaultData: AvatarWidgetData = {
    user: {
      id: '1',
      name: 'Sarah Chen',
      handle: 'sarahc',
      email: 'sarah.chen@university.edu',
      photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b779?w=150&h=150&fit=crop&crop=face',
      year: 'Junior',
      major: 'Computer Science',
      school: 'University of Technology',
      pronouns: 'she/her'
    },
    status: {
      isOnline: true,
      lastSeen: '2 minutes ago',
      currentActivity: 'In CS Study Group',
      ghostMode: false
    },
    badges: [
      { type: 'builder', label: 'Builder', icon: '🏗️' },
      { type: 'leader', label: 'Space Leader', icon: '🌟' }
    ],
    socialContext: {
      connectionCount: 247,
      spacesCount: 12,
      recentActivity: 'Active in 3 spaces today'
    },
    privacy: {
      profileVisibility: 'connections',
      showOnlineStatus: true,
      showActivity: true
    }
  };

  const widgetData = data || defaultData;

  // Render widget states
  const renderWidgetState = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="space-y-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-hive-background-secondary rounded-full"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-hive-background-secondary rounded w-24"></div>
                <div className="h-3 bg-hive-background-secondary rounded w-16"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-hive-background-secondary rounded w-full"></div>
              <div className="h-3 bg-hive-background-secondary rounded w-3/4"></div>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-status-error text-2xl">⚠️</div>
            <div className="text-sm text-hive-text-secondary">Failed to load profile</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1 text-xs bg-hive-brand-secondary text-white rounded hover:bg-hive-brand-secondary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        );
      
      case 'empty':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-text-tertiary text-2xl">👤</div>
            <div className="text-sm text-hive-text-secondary">Complete your profile</div>
            <button 
              onClick={onEditProfile}
              className="px-3 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors"
            >
              Add photo & info
            </button>
          </div>
        );
      
      default:
        return renderLoadedState();
    }
  };

  // Render loaded state with full functionality
  const renderLoadedState = () => (
    <div className="space-y-4">
      {/* Header with Photo and Basic Info */}
      <div className="flex items-start gap-3">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-hive-brand-secondary">
            {widgetData.user.photoUrl ? (
              <img 
                src={widgetData.user.photoUrl} 
                alt={`${widgetData.user.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary flex items-center justify-center text-white font-bold">
                {widgetData.user.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          
          {/* Online Status */}
          {!widgetData.status.ghostMode && widgetData.privacy.showOnlineStatus && (
            <div className={`
              absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white
              ${widgetData.status.isOnline ? 'bg-hive-status-success' : 'bg-hive-text-tertiary'}
            `} />
          )}
          
          {/* Ghost Mode Indicator */}
          {widgetData.status.ghostMode && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-hive-text-tertiary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">👻</span>
            </div>
          )}
        </div>

        {/* Name and Basic Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-hive-text-primary truncate">
              {widgetData.user.name}
            </h3>
            {/* Privacy Indicator */}
            <div 
              className="text-xs text-hive-text-tertiary cursor-help"
              onMouseEnter={() => setShowTooltip('privacy')}
              onMouseLeave={() => setShowTooltip(null)}
            >
              {widgetData.privacy.profileVisibility === 'public' ? '🌐' :
               widgetData.privacy.profileVisibility === 'connections' ? '👥' : '🔒'}
            </div>
          </div>
          <div className="text-xs text-hive-text-secondary">
            @{widgetData.user.handle} • {widgetData.user.year}
          </div>
          <div className="text-xs text-hive-text-tertiary">
            {widgetData.user.major}
          </div>
        </div>
      </div>

      {/* Status Badges */}
      {widgetData.badges.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {widgetData.badges.slice(0, 2).map((badge, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-hive-brand-secondary/10 text-hive-brand-secondary border border-hive-brand-secondary/20 rounded-full text-xs font-medium"
              onMouseEnter={() => setShowTooltip(`badge-${index}`)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <span className="text-xs">{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
          {widgetData.badges.length > 2 && (
            <div className="inline-flex items-center px-2 py-0.5 bg-hive-text-tertiary/10 text-hive-text-tertiary border border-hive-text-tertiary/20 rounded-full text-xs">
              +{widgetData.badges.length - 2}
            </div>
          )}
        </div>
      )}

      {/* Social Context & Activity */}
      <div className="space-y-2">
        {/* Current Activity */}
        {widgetData.status.currentActivity && widgetData.privacy.showActivity && !widgetData.status.ghostMode && (
          <div className="text-xs text-hive-text-secondary">
            📍 {widgetData.status.currentActivity}
          </div>
        )}

        {/* Social Stats */}
        <div className="flex items-center justify-between text-xs text-hive-text-tertiary">
          <span>{widgetData.socialContext.connectionCount} connections</span>
          <span>{widgetData.socialContext.spacesCount} spaces</span>
        </div>

        {/* Recent Activity */}
        <div className="text-xs text-hive-text-tertiary">
          {widgetData.socialContext.recentActivity}
        </div>
      </div>

      {/* Quick Actions */}
      {!isEditMode && (
        <div className="flex items-center gap-2 pt-2 border-t border-hive-border-default">
          <button
            onClick={onEditProfile}
            className="flex-1 px-2 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors"
          >
            Edit Profile
          </button>
          <button
            onClick={onPrivacyToggle}
            className="px-2 py-1 text-xs bg-transparent text-hive-text-secondary hover:text-hive-text-primary transition-colors"
            title="Privacy Settings"
          >
            ⚙️
          </button>
        </div>
      )}

      {/* Tooltips */}
      {showTooltip === 'privacy' && (
        <div className="absolute z-10 top-full left-0 mt-2 px-2 py-1 bg-hive-text-primary text-white text-xs rounded shadow-lg">
          Profile visibility: {widgetData.privacy.profileVisibility}
        </div>
      )}
    </div>
  );

  return (
    <div className={`
      relative bg-white border border-hive-border-default rounded-xl p-4 h-full
      ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : ''}
      transition-all duration-200
      ${className}
    `}>
      {/* Widget Header - Always Visible */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            A
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">Avatar</span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={onPhotoUpload}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Upload Photo"
            >
              📷
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={isEditMode ? 'pointer-events-none opacity-75' : ''}>
        {renderWidgetState()}
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl flex items-center justify-center">
          <div className="text-xs text-hive-text-secondary font-medium">
            Avatar Widget (1x1)
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// AVATAR WIDGET STORIES
// =========================

export const AvatarWidgetSystem: Story = {
  name: '👤 Avatar Widget System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Avatar Widget System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Social identity anchor with photo-first design, contextual status badges, and social presence indicators.
          </p>
        </div>

        {/* Widget States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Widget States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loading</h3>
              <div className="w-full h-64">
                <AvatarWidget state="loading" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Error</h3>
              <div className="w-full h-64">
                <AvatarWidget state="error" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Empty</h3>
              <div className="w-full h-64">
                <AvatarWidget state="empty" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loaded</h3>
              <div className="w-full h-64">
                <AvatarWidget state="loaded" />
              </div>
            </div>
          </div>
        </div>

        {/* User Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">User Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* New Student */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">New Student</h3>
              <div className="w-full h-64">
                <AvatarWidget
                  data={{
                    user: {
                      id: '2',
                      name: 'Alex Rivera',
                      handle: 'alexr',
                      email: 'alex.rivera@university.edu',
                      year: 'Freshman',
                      major: 'Engineering',
                      school: 'University of Technology'
                    },
                    status: {
                      isOnline: true,
                      currentActivity: 'Exploring campus',
                      ghostMode: false
                    },
                    badges: [
                      { type: 'new', label: 'New Student', icon: '✨' }
                    ],
                    socialContext: {
                      connectionCount: 8,
                      spacesCount: 2,
                      recentActivity: 'Joined 2 spaces this week'
                    },
                    privacy: {
                      profileVisibility: 'public',
                      showOnlineStatus: true,
                      showActivity: true
                    }
                  }}
                />
              </div>
            </div>

            {/* Active Builder */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Active Builder</h3>
              <div className="w-full h-64">
                <AvatarWidget
                  data={{
                    user: {
                      id: '3',
                      name: 'Marcus Williams',
                      handle: 'marcusw',
                      email: 'marcus.williams@university.edu',
                      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                      year: 'Senior',
                      major: 'Computer Science',
                      school: 'University of Technology',
                      pronouns: 'he/him'
                    },
                    status: {
                      isOnline: true,
                      currentActivity: 'Building HiveLAB tools',
                      ghostMode: false
                    },
                    badges: [
                      { type: 'builder', label: 'Builder', icon: '🏗️' },
                      { type: 'active', label: 'Active', icon: '⚡' }
                    ],
                    socialContext: {
                      connectionCount: 384,
                      spacesCount: 18,
                      recentActivity: 'Built 3 tools this month'
                    },
                    privacy: {
                      profileVisibility: 'connections',
                      showOnlineStatus: true,
                      showActivity: true
                    }
                  }}
                />
              </div>
            </div>

            {/* Privacy-Focused */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Privacy-Focused</h3>
              <div className="w-full h-64">
                <AvatarWidget
                  data={{
                    user: {
                      id: '4',
                      name: 'Emma Rodriguez',
                      handle: 'emmar',
                      email: 'emma.rodriguez@university.edu',
                      photoUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
                      year: 'Sophomore',
                      major: 'Psychology',
                      school: 'University of Technology',
                      pronouns: 'she/her'
                    },
                    status: {
                      isOnline: false,
                      lastSeen: '3 hours ago',
                      ghostMode: true
                    },
                    badges: [],
                    socialContext: {
                      connectionCount: 67,
                      spacesCount: 5,
                      recentActivity: 'Limited activity visible'
                    },
                    privacy: {
                      profileVisibility: 'private',
                      showOnlineStatus: false,
                      showActivity: false
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode Demonstration */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Edit Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Normal Mode</h3>
              <div className="w-full h-64">
                <AvatarWidget />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Edit Mode Active</h3>
              <div className="w-full h-64">
                <AvatarWidget isEditMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Business Logic Documentation */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Avatar Widget Business Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Social Identity Features</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Photo-First Design</strong>: Visual identity takes priority</div>
                <div>• <strong>Status Badges</strong>: 🏗️ Builder, 🌟 Leader, ✨ New contextual roles</div>
                <div>• <strong>Activity Context</strong>: Current location and social engagement</div>
                <div>• <strong>Social Stats</strong>: Connection count and space participation</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Privacy & Control</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Ghost Mode</strong>: 👻 Complete platform invisibility</div>
                <div>• <strong>Granular Privacy</strong>: Per-widget visibility settings</div>
                <div>• <strong>Online Status</strong>: Optional real-time presence</div>
                <div>• <strong>Activity Sharing</strong>: Control over current activity display</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hive-border-default">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Widget Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Size: 1x1</div>
                <div>Compact social identity that fits in one grid cell while displaying essential information</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Position: Top-Left</div>
                <div>Anchor position in Bento Grid, typically the first widget users see</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Interactions</div>
                <div>Edit profile, upload photo, privacy settings, configuration panel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const AvatarWidgetInGrid: Story = {
  name: '🎯 Avatar in Bento Grid',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Avatar Widget in Bento Grid</h1>
          <p className="text-lg text-hive-text-secondary">
            Demonstration of the Avatar Widget as the social identity anchor in the profile layout
          </p>
        </div>

        {/* Simulated Bento Grid */}
        <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Avatar Widget (1x1) */}
          <div className="col-span-1 row-span-1">
            <AvatarWidget />
          </div>

          {/* Placeholder widgets to show grid context */}
          <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-sm font-medium">Priority Coordination Widget</div>
              <div className="text-xs">2x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-2 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-sm font-medium">Community Coordination</div>
              <div className="text-xs">1x2 size</div>
            </div>
          </div>

          <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium">Social Calendar Widget</div>
              <div className="text-xs">2x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm font-medium">Privacy Control</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          <div className="col-span-2 row-span-2 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🛠️</div>
              <div className="text-sm font-medium">Personal Tools (v1 Preview)</div>
              <div className="text-xs">2x2 size</div>
              <div className="mt-2 px-3 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-xs rounded-full">
                JOIN v1 WAITLIST →
              </div>
            </div>
          </div>
        </div>

        {/* Grid Analysis */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Avatar Widget Role</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Identity Anchor</div>
              <div>Provides immediate visual identification and social context for the entire profile</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Information Density</div>
              <div>Maximizes essential information in 1x1 grid space through careful hierarchy</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Action Gateway</div>
              <div>Entry point for profile editing, privacy settings, and photo management</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};