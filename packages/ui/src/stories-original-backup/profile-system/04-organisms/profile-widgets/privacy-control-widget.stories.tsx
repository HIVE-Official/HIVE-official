import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile System/04-Organisms/Profile Widgets/Privacy Control Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Privacy Control Widget (1x1) - Granular privacy management with Ghost Mode, visibility controls, and data transparency. Privacy-first social control center.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Privacy Setting Interface
interface PrivacySetting {
  id: string;
  name: string;
  description: string;
  value: boolean | string;
  type: 'toggle' | 'select' | 'slider';
  options?: string[];
  sensitive?: boolean;
}

// Privacy Category Interface
interface PrivacyCategory {
  id: string;
  name: string;
  icon: string;
  settings: PrivacySetting[];
  priority: 'critical' | 'important' | 'standard';
}

// Widget Data Interface
interface PrivacyWidgetData {
  ghostMode: boolean;
  profileVisibility: 'public' | 'connections' | 'private';
  onlineStatus: boolean;
  activityTracking: boolean;
  dataSharing: boolean;
  categories: PrivacyCategory[];
  securityScore: number;
  recentActivity: {
    dataRequests: number;
    profileViews: number;
    privacyUpdates: number;
  };
}

// Widget State Types
type WidgetState = 'loading' | 'error' | 'empty' | 'loaded';

// Privacy Control Widget Component
const PrivacyControlWidget = ({ 
  data,
  size = '1x1',
  isEditMode = false,
  state = 'loaded',
  onToggleGhostMode,
  onVisibilityChange,
  onSettingChange,
  onPrivacySettings,
  className = ''
}: {
  data?: PrivacyWidgetData;
  size?: '1x1';
  isEditMode?: boolean;
  state?: WidgetState;
  onToggleGhostMode?: (enabled: boolean) => void;
  onVisibilityChange?: (level: string) => void;
  onSettingChange?: (settingId: string, value: any) => void;
  onPrivacySettings?: () => void;
  className?: string;
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Default data for demo
  const defaultData: PrivacyWidgetData = {
    ghostMode: false,
    profileVisibility: 'connections',
    onlineStatus: true,
    activityTracking: false,
    dataSharing: false,
    categories: [
      {
        id: 'visibility',
        name: 'Profile Visibility',
        icon: '👁️',
        priority: 'critical',
        settings: [
          {
            id: 'profile_public',
            name: 'Profile Visibility',
            description: 'Who can see your profile',
            value: 'connections',
            type: 'select',
            options: ['public', 'connections', 'private']
          },
          {
            id: 'online_status',
            name: 'Online Status',
            description: 'Show when you\'re online',
            value: true,
            type: 'toggle'
          }
        ]
      },
      {
        id: 'activity',
        name: 'Activity Tracking',
        icon: '📊',
        priority: 'important',
        settings: [
          {
            id: 'activity_feed',
            name: 'Activity in Spaces',
            description: 'Share your space activity',
            value: true,
            type: 'toggle'
          },
          {
            id: 'location_sharing',
            name: 'Location Context',
            description: 'Share general location (e.g., "In Library")',
            value: false,
            type: 'toggle',
            sensitive: true
          }
        ]
      },
      {
        id: 'data',
        name: 'Data & Analytics',
        icon: '🔒',
        priority: 'standard',
        settings: [
          {
            id: 'usage_analytics',
            name: 'Usage Analytics',
            description: 'Help improve HIVE with anonymous usage data',
            value: true,
            type: 'toggle'
          },
          {
            id: 'personalization',
            name: 'Personalization',
            description: 'Use your data to personalize your experience',
            value: true,
            type: 'toggle'
          }
        ]
      }
    ],
    securityScore: 85,
    recentActivity: {
      dataRequests: 0,
      profileViews: 12,
      privacyUpdates: 2
    }
  };

  const widgetData = data || defaultData;

  // Get visibility level styling
  const getVisibilityStyle = (level: string) => {
    switch (level) {
      case 'public':
        return { 
          color: 'text-hive-status-info', 
          bg: 'bg-hive-status-info/10',
          icon: '🌐',
          label: 'Public'
        };
      case 'connections':
        return { 
          color: 'text-hive-brand-secondary', 
          bg: 'bg-hive-brand-secondary/10',
          icon: '👥',
          label: 'Connections'
        };
      case 'private':
        return { 
          color: 'text-hive-status-warning', 
          bg: 'bg-hive-status-warning/10',
          icon: '🔒',
          label: 'Private'
        };
      default:
        return { 
          color: 'text-hive-text-secondary', 
          bg: 'bg-hive-background-secondary',
          icon: '⚙️',
          label: 'Unknown'
        };
    }
  };

  // Get security score color
  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return 'text-hive-status-success';
    if (score >= 60) return 'text-hive-status-warning';
    return 'text-hive-status-error';
  };

  // Render widget states
  const renderWidgetState = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="space-y-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-hive-background-secondary rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-hive-background-secondary rounded w-3/4"></div>
                <div className="h-2 bg-hive-background-secondary rounded w-1/2"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-hive-background-secondary rounded w-full"></div>
              <div className="h-2 bg-hive-background-secondary rounded w-2/3"></div>
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-status-error text-2xl">🚨</div>
            <div className="text-sm text-hive-text-secondary">Privacy sync failed</div>
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
            <div className="text-hive-text-tertiary text-2xl">🔒</div>
            <div className="text-sm text-hive-text-secondary">Privacy setup needed</div>
            <button 
              onClick={onPrivacySettings}
              className="px-3 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors"
            >
              Configure privacy
            </button>
          </div>
        );
      
      default:
        return renderLoadedState();
    }
  };

  // Render loaded state with full functionality
  const renderLoadedState = () => {
    const visibilityStyle = getVisibilityStyle(widgetData.profileVisibility);

    return (
      <div className="space-y-4">
        {/* Ghost Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`
              text-lg transition-all duration-200
              ${widgetData.ghostMode ? 'opacity-100' : 'opacity-60'}
            `}>
              👻
            </div>
            <div>
              <div className="text-sm font-medium text-hive-text-primary">
                Ghost Mode
              </div>
              <div className="text-xs text-hive-text-tertiary">
                {widgetData.ghostMode ? 'Invisible to others' : 'Visible to others'}
              </div>
            </div>
          </div>
          <button
            onClick={() => onToggleGhostMode?.(!widgetData.ghostMode)}
            className={`
              relative w-8 h-4 rounded-full transition-colors duration-200
              ${widgetData.ghostMode ? 'bg-hive-text-tertiary' : 'bg-hive-background-secondary'}
            `}
          >
            <div className={`
              absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200
              ${widgetData.ghostMode ? 'translate-x-4' : 'translate-x-0.5'}
            `} />
          </button>
        </div>

        {/* Profile Visibility */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-hive-text-secondary">Profile Visibility</div>
            {!widgetData.ghostMode && (
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                ${visibilityStyle.color} ${visibilityStyle.bg}
              `}>
                <span>{visibilityStyle.icon}</span>
                <span>{visibilityStyle.label}</span>
              </div>
            )}
          </div>
          
          {!widgetData.ghostMode && (
            <div className="grid grid-cols-3 gap-1">
              {['public', 'connections', 'private'].map((level) => {
                const style = getVisibilityStyle(level);
                const isActive = widgetData.profileVisibility === level;
                
                return (
                  <button
                    key={level}
                    onClick={() => onVisibilityChange?.(level)}
                    className={`
                      p-2 text-xs rounded transition-colors
                      ${isActive 
                        ? `${style.color} ${style.bg} border border-current` 
                        : 'text-hive-text-tertiary hover:text-hive-text-secondary hover:bg-hive-background-secondary'
                      }
                    `}
                  >
                    <div className="text-center">
                      <div className="text-sm">{style.icon}</div>
                      <div className="text-xs font-medium">{style.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Privacy Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-hive-text-secondary">Privacy Score</div>
            <div className={`text-xs font-bold ${getSecurityScoreColor(widgetData.securityScore)}`}>
              {widgetData.securityScore}/100
            </div>
          </div>
          <div className="w-full h-2 bg-hive-background-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${
                widgetData.securityScore >= 80 ? 'bg-hive-status-success' :
                widgetData.securityScore >= 60 ? 'bg-hive-status-warning' :
                'bg-hive-status-error'
              }`}
              style={{ width: `${widgetData.securityScore}%` }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-hive-text-secondary">Recent Activity</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-hive-text-tertiary">Profile views</span>
              <span className="text-hive-text-primary font-medium">{widgetData.recentActivity.profileViews}</span>
            </div>
            {widgetData.recentActivity.dataRequests > 0 && (
              <div className="flex items-center justify-between text-xs">
                <span className="text-hive-status-warning">Data requests</span>
                <span className="text-hive-status-warning font-medium">{widgetData.recentActivity.dataRequests}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-xs">
              <span className="text-hive-text-tertiary">Privacy updates</span>
              <span className="text-hive-text-primary font-medium">{widgetData.recentActivity.privacyUpdates}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {!isEditMode && (
          <div className="flex items-center justify-between pt-2 border-t border-hive-border-default">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-hive-text-secondary hover:text-hive-text-primary transition-colors"
            >
              {showDetails ? 'Hide details' : 'View details'}
            </button>
            
            <button
              onClick={onPrivacySettings}
              className="text-xs text-hive-brand-secondary hover:text-hive-brand-secondary/80 transition-colors flex items-center gap-1"
            >
              <span>⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        )}

        {/* Detailed Settings (Expandable) */}
        {showDetails && !isEditMode && (
          <div className="space-y-3 pt-3 border-t border-hive-border-default">
            <div className="text-xs font-medium text-hive-text-secondary">Quick Controls</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-hive-text-secondary">Online Status</div>
                <button
                  onClick={() => onSettingChange?.('online_status', !widgetData.onlineStatus)}
                  className={`
                    relative w-6 h-3 rounded-full transition-colors duration-200
                    ${widgetData.onlineStatus ? 'bg-hive-status-success' : 'bg-hive-background-secondary'}
                  `}
                >
                  <div className={`
                    absolute top-0.5 w-2 h-2 bg-white rounded-full shadow transition-transform duration-200
                    ${widgetData.onlineStatus ? 'translate-x-3' : 'translate-x-0.5'}
                  `} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-hive-text-secondary">Activity Tracking</div>
                <button
                  onClick={() => onSettingChange?.('activity_tracking', !widgetData.activityTracking)}
                  className={`
                    relative w-6 h-3 rounded-full transition-colors duration-200
                    ${widgetData.activityTracking ? 'bg-hive-status-success' : 'bg-hive-background-secondary'}
                  `}
                >
                  <div className={`
                    absolute top-0.5 w-2 h-2 bg-white rounded-full shadow transition-transform duration-200
                    ${widgetData.activityTracking ? 'translate-x-3' : 'translate-x-0.5'}
                  `} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-hive-text-secondary">Data Sharing</div>
                <button
                  onClick={() => onSettingChange?.('data_sharing', !widgetData.dataSharing)}
                  className={`
                    relative w-6 h-3 rounded-full transition-colors duration-200
                    ${widgetData.dataSharing ? 'bg-hive-status-success' : 'bg-hive-background-secondary'}
                  `}
                >
                  <div className={`
                    absolute top-0.5 w-2 h-2 bg-white rounded-full shadow transition-transform duration-200
                    ${widgetData.dataSharing ? 'translate-x-3' : 'translate-x-0.5'}
                  `} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`
      relative bg-white border border-hive-border-default rounded-xl p-4 h-full
      ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : ''}
      ${widgetData.ghostMode ? 'bg-hive-text-tertiary/5 border-hive-text-tertiary/20' : ''}
      transition-all duration-200 group
      ${className}
    `}>
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`
            w-4 h-4 rounded text-white text-xs flex items-center justify-center font-bold
            ${widgetData.ghostMode ? 'bg-hive-text-tertiary' : 'bg-hive-brand-secondary'}
          `}>
            🔒
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">
            Privacy
          </span>
        </div>
        
        {/* Privacy Status Indicator */}
        {!isEditMode && (
          <div className="flex items-center gap-1">
            {widgetData.ghostMode && (
              <div className="w-2 h-2 bg-hive-text-tertiary rounded-full animate-pulse"></div>
            )}
            <div className={`text-xs ${getSecurityScoreColor(widgetData.securityScore)}`}>
              {widgetData.securityScore}
            </div>
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
            Privacy Control Widget (1x1)
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// PRIVACY WIDGET STORIES
// =========================

export const PrivacyControlWidgetSystem: Story = {
  name: '🔒 Privacy Control Widget System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Privacy Control Widget System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Granular privacy management with Ghost Mode, visibility controls, and data transparency - your privacy-first social control center.
          </p>
        </div>

        {/* Widget States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Widget States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loading</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget state="loading" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Error</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget state="error" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Empty</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget state="empty" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loaded</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget state="loaded" />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Modes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Privacy Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Normal Mode</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget 
                  data={{
                    ...{
                      ghostMode: false,
                      profileVisibility: 'connections',
                      onlineStatus: true,
                      activityTracking: true,
                      dataSharing: true,
                      categories: [],
                      securityScore: 75,
                      recentActivity: {
                        dataRequests: 0,
                        profileViews: 18,
                        privacyUpdates: 1
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Ghost Mode Active</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget 
                  data={{
                    ...{
                      ghostMode: true,
                      profileVisibility: 'private',
                      onlineStatus: false,
                      activityTracking: false,
                      dataSharing: false,
                      categories: [],
                      securityScore: 95,
                      recentActivity: {
                        dataRequests: 0,
                        profileViews: 2,
                        privacyUpdates: 3
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Visibility Levels */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Profile Visibility Levels</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-hive-status-info/10 text-hive-status-info rounded-xl flex items-center justify-center text-2xl mx-auto">
                  🌐
                </div>
                <div>
                  <div className="text-lg font-bold text-hive-status-info">Public</div>
                  <div className="text-sm text-hive-text-secondary">Anyone can discover and view your profile</div>
                  <div className="text-xs text-hive-text-tertiary mt-2">Best for networking and meeting new people</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-hive-brand-secondary/10 text-hive-brand-secondary rounded-xl flex items-center justify-center text-2xl mx-auto">
                  👥
                </div>
                <div>
                  <div className="text-lg font-bold text-hive-brand-secondary">Connections</div>
                  <div className="text-sm text-hive-text-secondary">Only your connections can see your full profile</div>
                  <div className="text-xs text-hive-text-tertiary mt-2">Balanced privacy and social discovery</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-hive-status-warning/10 text-hive-status-warning rounded-xl flex items-center justify-center text-2xl mx-auto">
                  🔒
                </div>
                <div>
                  <div className="text-lg font-bold text-hive-status-warning">Private</div>
                  <div className="text-sm text-hive-text-secondary">Hidden from discovery, invitation-only</div>
                  <div className="text-xs text-hive-text-tertiary mt-2">Maximum privacy protection</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Score System */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Privacy Score System</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-hive-status-success">85-100</div>
                  <div className="text-sm font-medium text-hive-status-success">Excellent Privacy</div>
                  <div className="text-xs text-hive-text-secondary">Strong privacy controls active</div>
                </div>

                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-hive-status-warning">60-84</div>
                  <div className="text-sm font-medium text-hive-status-warning">Good Privacy</div>
                  <div className="text-xs text-hive-text-secondary">Some data sharing enabled</div>
                </div>

                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-hive-status-error">0-59</div>
                  <div className="text-sm font-medium text-hive-status-error">Needs Attention</div>
                  <div className="text-xs text-hive-text-secondary">Privacy settings need review</div>
                </div>
              </div>

              <div className="pt-6 border-t border-hive-border-default">
                <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Score Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-hive-text-secondary">
                  <div className="space-y-2">
                    <div>• <strong>Ghost Mode</strong>: +30 points when active</div>
                    <div>• <strong>Profile Visibility</strong>: Private (+20), Connections (+10), Public (+0)</div>
                    <div>• <strong>Online Status</strong>: Hidden (+15), Visible (+0)</div>
                  </div>
                  <div className="space-y-2">
                    <div>• <strong>Activity Tracking</strong>: Disabled (+15), Enabled (+0)</div>
                    <div>• <strong>Data Sharing</strong>: Minimal (+10), Full (+0)</div>
                    <div>• <strong>Location Sharing</strong>: Disabled (+10), Enabled (+0)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ghost Mode Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Ghost Mode Features</h2>
          <div className="bg-hive-text-tertiary/5 border border-hive-text-tertiary/20 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary flex items-center gap-2">
                  <span>👻</span>
                  <span>When Ghost Mode is Active</span>
                </h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Invisible Presence</strong>: You don't appear online to others</div>
                  <div>• <strong>No Activity Tracking</strong>: Your space activity isn't visible</div>
                  <div>• <strong>Hidden from Discovery</strong>: Profile hidden from search and suggestions</div>
                  <div>• <strong>Limited Profile Access</strong>: Only direct connections can find you</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">What Still Works</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Direct Messages</strong>: Existing connections can still message you</div>
                  <div>• <strong>Space Participation</strong>: You can still participate in your spaces</div>
                  <div>• <strong>Private Tools</strong>: Your HiveLAB tools continue to function</div>
                  <div>• <strong>Calendar Events</strong>: Scheduled events remain accessible</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode Demo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Edit Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Normal Mode</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Edit Mode Active</h3>
              <div className="w-full h-80">
                <PrivacyControlWidget isEditMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Business Logic Documentation */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Privacy Control Business Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Privacy-First Design</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Default Private</strong>: New users start with conservative privacy settings</div>
                <div>• <strong>Granular Control</strong>: Fine-grained control over every aspect of data sharing</div>
                <div>• <strong>Transparency</strong>: Clear visibility into who can see what and when</div>
                <div>• <strong>One-Click Ghost</strong>: Instant complete invisibility when needed</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Smart Privacy Features</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Context Awareness</strong>: Automatic privacy adjustments based on activity</div>
                <div>• <strong>Data Minimization</strong>: Only collect and share what's necessary for functionality</div>
                <div>• <strong>Consent Management</strong>: Clear opt-in/opt-out for all data uses</div>
                <div>• <strong>Regular Audits</strong>: Periodic privacy setting reviews and recommendations</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hive-border-default">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Widget Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Size: 1x1</div>
                <div>Compact control center with expandable detailed settings for comprehensive privacy management</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Position: Strategic</div>
                <div>Easily accessible position for quick privacy adjustments and Ghost Mode activation</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Interactions</div>
                <div>Ghost Mode toggle, visibility controls, privacy score monitoring, and detailed settings access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const PrivacyWidgetInGrid: Story = {
  name: '🎯 Privacy in Bento Grid',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Privacy Widget in Bento Grid</h1>
          <p className="text-lg text-hive-text-secondary">
            Demonstration of Privacy Control Widget (1x1) within the complete profile layout system
          </p>
        </div>

        {/* Full Grid Layout */}
        <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Top Row */}
          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">👤</div>
              <div className="text-sm font-medium">Avatar Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">📋</div>
              <div className="text-sm font-medium">Priority Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-sm font-medium">Social Calendar</div>
              <div className="text-xs">2x1 size</div>
            </div>
          </div>

          {/* Second Row */}
          <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-sm font-medium">Community Coordination</div>
              <div className="text-xs">2x1 size</div>
            </div>
          </div>

          {/* Privacy Control Widget 1x1 */}
          <div className="col-span-1 row-span-1">
            <PrivacyControlWidget />
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">Other Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          {/* Bottom Section */}
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

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-medium">Stats Widget</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>

          <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
            <div className="text-center text-hive-text-secondary">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-sm font-medium">Quick Actions</div>
              <div className="text-xs">1x1 size</div>
            </div>
          </div>
        </div>

        {/* Widget Analysis */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Privacy Widget Role in Profile System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Privacy Command Center</div>
              <div>Quick access to all privacy controls with Ghost Mode for instant invisibility and granular visibility settings</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Transparency Dashboard</div>
              <div>Clear visibility into privacy score, recent activity, and data requests to maintain user awareness and control</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Privacy-First Social</div>
              <div>Enables confident social participation by putting privacy controls front and center in the profile experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};