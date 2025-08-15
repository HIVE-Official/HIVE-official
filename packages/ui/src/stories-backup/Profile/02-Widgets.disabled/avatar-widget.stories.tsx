import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { User, Camera, Settings, X, ArrowLeft, Shield, Users, MapPin, Star, Hammer } from 'lucide-react';

const meta = {
  title: 'Profile/02-Widgets/Avatar Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Avatar Widget (1x1) - Social identity anchor with photo-first design, contextual status badges, and social presence indicators. Click to expand into Focus Mode.'
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
    icon: 'hammer' | 'star' | 'shield' | 'sparkles' | 'zap';
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

// Badge Icon Renderer
const renderBadgeIcon = (iconType: string, className: string = "w-4 h-4") => {
  switch (iconType) {
    case 'hammer':
      return <Hammer className={className} />;
    case 'star':
      return <Star className={className} />;
    case 'shield':
      return <Shield className={className} />;
    default:
      return <Star className={className} />;
  }
};

// Focus Mode Hook
const useFocusMode = () => {
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enterFocus = (widgetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(widgetId);
      setIsTransitioning(false);
    }, 200);
  };

  const exitFocus = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(null);
      setIsTransitioning(false);
    }, 200);
  };

  return { focusedWidget, isTransitioning, enterFocus, exitFocus };
};

// Focus Overlay Component
const FocusOverlay = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  isTransitioning 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isTransitioning: boolean;
}) => {
  if (!isOpen && !isTransitioning) return null;

  return (
    <div className={`
      fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4
      transition-all duration-200
      ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className={`
        bg-hive-background-secondary rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden
        transform transition-all duration-200
        ${isOpen && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Focus Header */}
        <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-hive-text-primary" />
            </button>
            <h2 className="text-xl font-bold text-hive-text-primary">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
              <Settings className="w-4 h-4 text-hive-text-primary" />
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-hive-text-primary" />
            </button>
          </div>
        </div>

        {/* Focus Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Avatar Widget Component with Focus
const AvatarWidget = ({ 
  data,
  size = 'default',
  isEditMode = false,
  state = 'loaded',
  onEditProfile,
  onPrivacyToggle,
  onPhotoUpload,
  onFocus,
  className = ''
}: {
  data?: AvatarWidgetData;
  size?: 'compact' | 'default' | 'expanded';
  isEditMode?: boolean;
  state?: 'loading' | 'error' | 'empty' | 'loaded';
  onEditProfile?: () => void;
  onPrivacyToggle?: () => void;
  onPhotoUpload?: () => void;
  onFocus?: () => void;
  className?: string;
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Demo data
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
      { type: 'builder', label: 'Builder', icon: 'hammer' },
      { type: 'leader', label: 'Space Leader', icon: 'star' }
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
              <div className="w-full h-full bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary flex items-center justify-center text-hive-text-primary font-bold">
                {widgetData.user.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          
          {/* Online Status */}
          {!widgetData.status.ghostMode && widgetData.privacy.showOnlineStatus && (
            <div className={`
              absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-hive-background-secondary
              ${widgetData.status.isOnline ? 'bg-hive-status-success' : 'bg-hive-text-tertiary'}
            `} />
          )}
          
          {/* Ghost Mode Indicator */}
          {widgetData.status.ghostMode && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-hive-text-tertiary rounded-full flex items-center justify-center">
              <Shield className="w-2.5 h-2.5 text-hive-text-primary" />
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
            >
              {renderBadgeIcon(badge.icon, "w-3 h-3")}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Social Context & Activity */}
      <div className="space-y-2">
        {/* Current Activity */}
        {widgetData.status.currentActivity && widgetData.privacy.showActivity && !widgetData.status.ghostMode && (
          <div className="flex items-center gap-1 text-xs text-hive-text-secondary">
            <MapPin className="w-3 h-3" />
            <span>{widgetData.status.currentActivity}</span>
          </div>
        )}

        {/* Social Stats */}
        <div className="flex items-center justify-between text-xs text-hive-text-tertiary">
          <span>{widgetData.socialContext.connectionCount} connections</span>
          <span>{widgetData.socialContext.spacesCount} spaces</span>
        </div>
      </div>

      {/* Focus Hint */}
      <div className="pt-2 border-t border-hive-border-default opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="text-xs text-hive-brand-secondary text-center">
          Click to expand & focus →
        </div>
      </div>
    </div>
  );

  return (
    <div 
      onClick={onFocus}
      className={`
        relative bg-hive-background-secondary border border-hive-border-default rounded-xl p-4 h-full group
        ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : 'cursor-pointer hover:border-hive-brand-secondary/50 hover:shadow-lg'}
        transition-all duration-200
        ${className}
      `}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded flex items-center justify-center">
            <User className="w-3 h-3 text-white" />
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">Avatar</span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPhotoUpload?.();
              }}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Upload Photo"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={`${isEditMode ? 'pointer-events-none opacity-75' : ''} group-hover:scale-[1.02] transition-transform duration-200`}>
        {renderLoadedState()}
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

// Avatar Focus Content
const AvatarFocusContent = ({ data }: { data: AvatarWidgetData }) => (
  <div className="space-y-8">
    <div className="text-center space-y-6">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-hive-brand-secondary mx-auto">
        {data.user.photoUrl ? (
          <img 
            src={data.user.photoUrl} 
            alt={`${data.user.name}'s avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary flex items-center justify-center text-hive-text-primary text-4xl font-bold">
            {data.user.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-hive-text-primary">{data.user.name}</h3>
        <div className="text-lg text-hive-text-secondary">@{data.user.handle} • {data.user.major} • {data.user.year}</div>
        <div className="text-hive-text-tertiary">{data.user.school}</div>
        {data.user.pronouns && (
          <div className="text-sm text-hive-text-tertiary mt-1">{data.user.pronouns}</div>
        )}
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 text-center">
      <div>
        <div className="text-2xl font-bold text-hive-text-primary">{data.socialContext.connectionCount}</div>
        <div className="text-sm text-hive-text-secondary">Connections</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-hive-text-primary">{data.socialContext.spacesCount}</div>
        <div className="text-sm text-hive-text-secondary">Active Spaces</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-hive-text-primary">{data.badges.length}</div>
        <div className="text-sm text-hive-text-secondary">Achievements</div>
      </div>
    </div>

    {/* Status Badges */}
    {data.badges.length > 0 && (
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-hive-text-primary">Achievements</h4>
        <div className="flex flex-wrap gap-3">
          {data.badges.map((badge, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-4 py-2 bg-hive-brand-secondary/10 text-hive-brand-secondary border border-hive-brand-secondary/20 rounded-full"
            >
              {renderBadgeIcon(badge.icon, "w-5 h-5")}
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-hive-text-primary">Recent Activity</h4>
      <div className="space-y-3">
        {[
          { action: 'Built a new study scheduler tool', time: '2 hours ago', space: 'CS Study Group' },
          { action: 'Joined Floor Pizza Night event', time: '4 hours ago', space: 'Floor 3 Community' },
          { action: 'Completed final exam study session', time: '6 hours ago', space: 'CS Study Group' },
          { action: 'Connected with 3 new classmates', time: '1 day ago', space: 'University Network' }
        ].map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-hive-background-primary rounded-lg">
            <div className="w-2 h-2 bg-hive-brand-secondary rounded-full mt-2"></div>
            <div>
              <div className="text-sm text-hive-text-primary">{activity.action}</div>
              <div className="text-xs text-hive-text-secondary">{activity.space} • {activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-lg font-semibold text-hive-text-primary">Privacy Settings</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-secondary">Profile Visibility</span>
            <span className="text-sm font-medium text-hive-text-primary capitalize">{data.privacy.profileVisibility}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-secondary">Show Online Status</span>
            <span className="text-sm font-medium text-hive-text-primary">{data.privacy.showOnlineStatus ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-secondary">Show Activity</span>
            <span className="text-sm font-medium text-hive-text-primary">{data.privacy.showActivity ? 'Yes' : 'No'}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-secondary">Ghost Mode</span>
            <span className={`text-sm font-medium ${data.status.ghostMode ? 'text-hive-text-tertiary' : 'text-hive-text-primary'}`}>
              {data.status.ghostMode ? 'Active 👻' : 'Inactive'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-hive-text-secondary">Current Activity</span>
            <span className="text-sm font-medium text-hive-text-primary">
              {data.status.currentActivity || 'Not sharing'}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const AvatarWidgetSystem: Story = {
  name: '👤 Avatar Widget with Focus',
  render: () => {
    const { focusedWidget, isTransitioning, enterFocus, exitFocus } = useFocusMode();

    const demoData: AvatarWidgetData = {
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
        { type: 'builder', label: 'Builder', icon: 'hammer' },
        { type: 'leader', label: 'Space Leader', icon: 'star' }
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

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Avatar Widget System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Social identity anchor with photo-first design and expandable Focus Mode experience
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-hive-text-primary">Interactive Demo</h2>
            <p className="text-hive-text-secondary">Click the widget below to experience the Expand & Focus interaction</p>
            
            <div className="flex justify-center">
              <div className="w-80 h-80">
                <AvatarWidget 
                  data={demoData}
                  onFocus={() => enterFocus('avatar')}
                />
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Social Identity</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Photo-First Design</strong>: Visual identity takes priority</div>
                  <div>• <strong>Status Badges</strong>: Contextual achievements and roles</div>
                  <div>• <strong>Online Presence</strong>: Real-time status with privacy controls</div>
                  <div>• <strong>Activity Context</strong>: Current location and engagement</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Privacy Features</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Ghost Mode</strong>: Complete invisibility toggle</div>
                  <div>• <strong>Granular Controls</strong>: Per-feature privacy settings</div>
                  <div>• <strong>Visibility Levels</strong>: Public, Connections, Private</div>
                  <div>• <strong>Activity Sharing</strong>: Control what others see</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Focus Mode</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Click to Expand</strong>: Full-screen detailed view</div>
                  <div>• <strong>Complete Profile</strong>: All information and settings</div>
                  <div>• <strong>Activity History</strong>: Recent actions and engagement</div>
                  <div>• <strong>Privacy Dashboard</strong>: Comprehensive privacy controls</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Overlay */}
        <FocusOverlay
          isOpen={focusedWidget === 'avatar'}
          onClose={exitFocus}
          title="Avatar - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <AvatarFocusContent data={demoData} />
        </FocusOverlay>
      </div>
    );
  }
};