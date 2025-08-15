/**
 * Individual Profile Card Components in Storybook
 * Each card component showcased individually for design and development
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

// Import all profile card components
import { AvatarCard, mockUserProfile, type UserProfile } from '../../components/profile/cards/avatar-card';
import { CalendarCard, mockCalendarEvents, type CalendarEvent } from '../../components/profile/cards/calendar-card';
import { NotificationsCard, mockNotifications, type Notification } from '../../components/profile/cards/notifications-card';
import { SpacesCard, mockSpaces, mockRecommendedSpaces, type Space } from '../../components/profile/cards/spaces-card';
import { GhostModeCard, mockGhostModeSettings, type GhostModeSettings } from '../../components/profile/cards/ghost-mode-card';
import { HiveLabCard, mockTools, mockBuilderStats, type Tool, type BuilderStats } from '../../components/profile/cards/hive-lab-card';

import { 
  Users, 
  Calendar, 
  Bell, 
  Eye, 
  Crown, 
  Zap,
  User,
  Settings,
  Info
} from 'lucide-react';

const meta: Meta = {
  title: '98-Profile Components/Individual Profile Cards',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# Individual Profile Cards

Each HIVE profile card component showcased individually for design review and development. 
All cards are designed to work within the bento grid system and follow the atomic design principles.

## Card Specifications
- **Avatar Card (2x1)**: Social identity hub with photo upload and profile editing
- **Calendar Card (2x1)**: Temporal coordination with UB academic calendar integration  
- **Notifications Card (2x1)**: Communication hub with smart filtering and RSVP actions
- **Spaces Card (1x2)**: Community management hub in tall format for space discovery
- **Ghost Mode Card (1x1)**: Compact privacy control center with quick presets
- **HiveLAB Card (1x1)**: Tool builder ecosystem with level progression and stats

## Interactive Features
- All cards support edit mode for customization
- Real-time data updates through Firebase integration
- Responsive design adapting from desktop to mobile
- Touch-friendly interactions for mobile devices
- Accessibility support with keyboard navigation
        `
      }
    }
  }
};

export default meta;

// Card showcase with consistent sizing
function CardShowcase({ 
  title, 
  size, 
  description, 
  children,
  icon: Icon,
  color 
}: {
  title: string;
  size: string;
  description: string;
  children: React.ReactNode;
  icon: any;
  color: string;
}) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">{title}</h3>
          <Badge variant="outline">{size}</Badge>
        </div>
        <p className="text-sm text-[var(--hive-text-muted)] max-w-md mx-auto">{description}</p>
      </div>
      
      <div className={`mx-auto ${
        size === '1x1' ? 'max-w-sm' :
        size === '1x2' ? 'max-w-md' :
        'max-w-2xl'
      }`}>
        {children}
      </div>
    </div>
  );
}

// Avatar Card Story
export const AvatarCardShowcase: StoryObj = {
  render: () => {
    const [profile, setProfile] = useState<UserProfile>(mockUserProfile);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleProfileUpdate = (updates: Partial<UserProfile>) => {
      setProfile(prev => ({ ...prev, ...updates }));
    };

    const handlePhotoUpload = async (file: File): Promise<string> => {
      // Mock photo upload
      const mockUrl = URL.createObjectURL(file);
      handleProfileUpdate({ profilePhotoURL: mockUrl });
      return mockUrl;
    };

    return (
      <div className="space-y-6">
        <CardShowcase
          title="Avatar Card"
          size="2x1"
          description="Social identity hub with profile editing, photo upload, and builder status display"
          icon={User}
          color="text-blue-500"
        >
          <AvatarCard
            profile={profile}
            isEditMode={isEditMode}
            onProfileUpdate={handleProfileUpdate}
            onPhotoUpload={handlePhotoUpload}
            onEditClick={() => console.log('Edit profile')}
            onSettingsClick={() => console.log('Profile settings')}
          />
        </CardShowcase>

        <div className="text-center">
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          </Button>
        </div>
      </div>
    );
  }
};

// Calendar Card Story
export const CalendarCardShowcase: StoryObj = {
  render: () => {
    const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleRSVP = (eventId: string, status: 'going' | 'maybe' | 'not-going') => {
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, userRSVPStatus: status }
          : event
      ));
    };

    return (
      <div className="space-y-6">
        <CardShowcase
          title="Calendar Card"
          size="2x1"
          description="Temporal coordination hub with UB academic calendar integration and RSVP management"
          icon={Calendar}
          color="text-green-500"
        >
          <CalendarCard
            events={events}
            isEditMode={isEditMode}
            onEventCreate={(event) => console.log('Create event:', event)}
            onEventUpdate={(id, updates) => console.log('Update event:', id, updates)}
            onRSVP={handleRSVP}
            onSettingsClick={() => console.log('Calendar settings')}
          />
        </CardShowcase>

        <div className="text-center">
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          </Button>
        </div>
      </div>
    );
  }
};

// Notifications Card Story
export const NotificationsCardShowcase: StoryObj = {
  render: () => {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleMarkAsRead = (id: string) => {
      setNotifications(prev => prev.map(notification =>
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      ));
    };

    const handleMarkAllAsRead = () => {
      setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
      <div className="space-y-6">
        <CardShowcase
          title="Notifications Card"
          size="2x1"
          description="Communication hub with smart filtering, RSVP actions, and real-time campus updates"
          icon={Bell}
          color="text-orange-500"
        >
          <NotificationsCard
            notifications={notifications}
            unreadCount={unreadCount}
            isEditMode={isEditMode}
            onNotificationRead={handleMarkAsRead}
            onNotificationArchive={(id) => console.log('Archive:', id)}
            onNotificationAction={(id, action, data) => console.log('Action:', id, action, data)}
            onMarkAllRead={handleMarkAllAsRead}
            onSettingsClick={() => console.log('Notification settings')}
          />
        </CardShowcase>

        <div className="text-center space-y-2">
          <div className="text-sm text-[var(--hive-text-muted)]">
            {unreadCount} unread notifications
          </div>
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          </Button>
        </div>
      </div>
    );
  }
};

// Spaces Card Story
export const SpacesCardShowcase: StoryObj = {
  render: () => {
    const [spaces, setSpaces] = useState<Space[]>(mockSpaces);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleJoinSpace = (spaceId: string) => {
      setSpaces(prev => prev.map(space =>
        space.id === spaceId
          ? { ...space, membershipStatus: 'member' as const, memberCount: space.memberCount + 1 }
          : space
      ));
    };

    const handleLeaveSpace = (spaceId: string) => {
      setSpaces(prev => prev.map(space =>
        space.id === spaceId
          ? { ...space, membershipStatus: 'not-member' as const, memberCount: space.memberCount - 1 }
          : space
      ));
    };

    return (
      <div className="space-y-6">
        <CardShowcase
          title="Spaces Card"
          size="1x2"
          description="Community management hub in tall format for space discovery, joining, and coordination"
          icon={Users}
          color="text-purple-500"
        >
          <SpacesCard
            spaces={spaces}
            recommendedSpaces={mockRecommendedSpaces}
            isEditMode={isEditMode}
            onSpaceClick={(spaceId) => console.log('Open space:', spaceId)}
            onJoinSpace={handleJoinSpace}
            onLeaveSpace={handleLeaveSpace}
            onCreateSpace={() => console.log('Create space')}
            onSearchSpaces={(query) => console.log('Search spaces:', query)}
            onSettingsClick={() => console.log('Spaces settings')}
          />
        </CardShowcase>

        <div className="text-center">
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          </Button>
        </div>
      </div>
    );
  }
};

// Ghost Mode Card Story
export const GhostModeCardShowcase: StoryObj = {
  render: () => {
    const [settings, setSettings] = useState<GhostModeSettings>(mockGhostModeSettings);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleSettingsChange = (updates: Partial<GhostModeSettings>) => {
      setSettings(prev => ({ ...prev, ...updates }));
    };

    const handleToggleGhostMode = (enabled: boolean) => {
      setSettings(prev => ({ ...prev, isEnabled: enabled }));
    };

    const handleQuickPreset = (preset: keyof GhostModeSettings['presets']) => {
      const newPresets = { ...settings.presets };
      newPresets[preset] = !newPresets[preset];
      setSettings(prev => ({ ...prev, presets: newPresets }));
    };

    return (
      <div className="space-y-6">
        <CardShowcase
          title="Ghost Mode Card"
          size="1x1"
          description="Compact privacy control center with smart presets and automation settings"
          icon={Eye}
          color="text-gray-500"
        >
          <GhostModeCard
            settings={settings}
            isEditMode={isEditMode}
            onSettingsChange={handleSettingsChange}
            onToggleGhostMode={handleToggleGhostMode}
            onQuickPreset={handleQuickPreset}
            onSettingsClick={() => console.log('Ghost mode settings')}
          />
        </CardShowcase>

        <div className="text-center space-y-2">
          <div className="text-sm text-[var(--hive-text-muted)]">
            Ghost Mode: {settings.isEnabled ? 'Enabled' : 'Disabled'}
          </div>
          <Button
            variant={isEditMode ? "default" : "outline"}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
          </Button>
        </div>
      </div>
    );
  }
};

// HiveLAB Card Story
export const HiveLabCardShowcase: StoryObj = {
  render: () => {
    const [tools, setTools] = useState<Tool[]>(mockTools);
    const [builderStats, setBuilderStats] = useState<BuilderStats>(mockBuilderStats);
    const [isBuilder, setIsBuilder] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    return (
      <div className="space-y-6">
        <CardShowcase
          title="HiveLAB Card"
          size="1x1"
          description="Tool builder ecosystem with level progression, stats tracking, and quick creation tools"
          icon={Zap}
          color="text-yellow-600"
        >
          <HiveLabCard
            tools={tools}
            builderStats={builderStats}
            isBuilder={isBuilder}
            isEditMode={isEditMode}
            onCreateTool={() => console.log('Create tool')}
            onToolClick={(toolId) => console.log('Open tool:', toolId)}
            onSettingsClick={() => console.log('HiveLAB settings')}
          />
        </CardShowcase>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4 text-sm text-[var(--hive-text-muted)]">
            <span>Builder Status: {isBuilder ? 'Active' : 'Not Builder'}</span>
            <span>Tools: {tools.length}</span>
            <span>Level: {builderStats.level}</span>
          </div>
          <div className="flex gap-2 justify-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsBuilder(!isBuilder)}
            >
              Toggle Builder Status
            </Button>
            <Button
              size="sm"
              variant={isEditMode ? "default" : "outline"}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

// All Cards Overview
export const AllCardsOverview: StoryObj = {
  render: () => {
    const [activeCard, setActiveCard] = useState('avatar');

    const cards = [
      { 
        id: 'avatar', 
        name: 'Avatar Card', 
        size: '2x1', 
        icon: User,
        color: 'text-blue-500',
        component: () => (
          <AvatarCard
            profile={mockUserProfile}
            isEditMode={false}
            onProfileUpdate={() => {}}
            onPhotoUpload={async () => ''}
          />
        )
      },
      { 
        id: 'calendar', 
        name: 'Calendar Card', 
        size: '2x1', 
        icon: Calendar,
        color: 'text-green-500',
        component: () => (
          <CalendarCard
            events={mockCalendarEvents}
            isEditMode={false}
          />
        )
      },
      { 
        id: 'notifications', 
        name: 'Notifications Card', 
        size: '2x1', 
        icon: Bell,
        color: 'text-orange-500',
        component: () => (
          <NotificationsCard
            notifications={mockNotifications}
            unreadCount={5}
            isEditMode={false}
          />
        )
      },
      { 
        id: 'spaces', 
        name: 'Spaces Card', 
        size: '1x2', 
        icon: Users,
        color: 'text-purple-500',
        component: () => (
          <SpacesCard
            spaces={mockSpaces}
            recommendedSpaces={mockRecommendedSpaces}
            isEditMode={false}
          />
        )
      },
      { 
        id: 'ghost', 
        name: 'Ghost Mode Card', 
        size: '1x1', 
        icon: Eye,
        color: 'text-gray-500',
        component: () => (
          <GhostModeCard
            settings={mockGhostModeSettings}
            isEditMode={false}
            onSettingsChange={() => {}}
            onToggleGhostMode={() => {}}
            onQuickPreset={() => {}}
          />
        )
      },
      { 
        id: 'hivelab', 
        name: 'HiveLAB Card', 
        size: '1x1', 
        icon: Zap,
        color: 'text-yellow-600',
        component: () => (
          <HiveLabCard
            tools={mockTools}
            builderStats={mockBuilderStats}
            isBuilder={true}
            isEditMode={false}
          />
        )
      }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">
            All Profile Cards Overview
          </h2>
          <p className="text-[var(--hive-text-muted)]">
            Complete set of 6 profile cards in the HIVE system
          </p>
        </div>

        <Tabs value={activeCard} onValueChange={setActiveCard}>
          <TabsList className="grid w-full grid-cols-6">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <TabsTrigger key={card.id} value={card.id} className="text-xs">
                  <Icon className={`w-4 h-4 mr-1 ${card.color}`} />
                  {card.name.split(' ')[0]}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <TabsContent key={card.id} value={card.id} className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <Icon className={`w-5 h-5 ${card.color}`} />
                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                      {card.name}
                    </h3>
                    <Badge variant="outline">{card.size}</Badge>
                  </div>
                </div>
                
                <div className={`mx-auto ${
                  card.size === '1x1' ? 'max-w-sm' :
                  card.size === '1x2' ? 'max-w-md' :
                  'max-w-2xl'
                }`}>
                  {card.component()}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Card Grid Overview */}
        <Card className="p-6">
          <CardHeader>
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Bento Grid Layout Preview</h4>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className={cn(
                      'p-4 border rounded-lg flex flex-col items-center justify-center text-center',
                      card.size === '2x1' && 'col-span-2',
                      card.size === '1x2' && 'row-span-2',
                      'bg-[var(--hive-background-secondary)]'
                    )}
                  >
                    <Icon className={`w-6 h-6 ${card.color} mb-2`} />
                    <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                      {card.name}
                    </span>
                    <Badge variant="outline" className="text-xs mt-1">
                      {card.size}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}