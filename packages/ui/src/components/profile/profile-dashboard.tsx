'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../dialog';

// Import all card components
import { AvatarCard, mockUserProfile, type UserProfile } from './cards/avatar-card';
import { CalendarCard, mockCalendarEvents, type CalendarEvent } from './cards/calendar-card';
import { NotificationsCard, mockNotifications, type Notification } from './cards/notifications-card';
import { SpacesCard, mockSpaces, mockRecommendedSpaces, type Space } from './cards/spaces-card';
import { GhostModeCard, mockGhostModeSettings, type GhostModeSettings } from './cards/ghost-mode-card';
import { HiveLabCard, mockTools, mockBuilderStats, type Tool, type BuilderStats } from './cards/hive-lab-card';

// Import bento grid system
import { BentoGridLayout, useBentoGrid, type GridItem } from './bento-grid/bento-grid-layout';

import { 
  Edit,
  Save,
  X,
  Settings,
  Eye,
  EyeOff,
  Layout,
  Palette,
  Grid,
  Smartphone,
  Monitor,
  Tablet,
  RotateCcw,
  Download,
  Upload,
  Share,
  Crown,
  Bell,
  BellOff,
  Lock,
  Unlock,
  Plus,
  Info,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

// Profile Dashboard Types
export interface ProfileDashboardProps {
  userId: string;
  isOwnProfile: boolean;
  className?: string;
}

export interface ProfileData {
  user: UserProfile;
  events: CalendarEvent[];
  notifications: Notification[];
  spaces: Space[];
  recommendedSpaces: Space[];
  ghostModeSettings: GhostModeSettings;
  tools: Tool[];
  builderStats: BuilderStats;
  isBuilder: boolean;
}

// Default grid layout configuration
const defaultGridItems: GridItem[] = [
  {
    id: 'avatar',
    cardType: 'avatar',
    position: { x: 0, y: 0 },
    size: { width: 2, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'calendar',
    cardType: 'calendar',
    position: { x: 2, y: 0 },
    size: { width: 2, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'notifications',
    cardType: 'notifications',
    position: { x: 0, y: 1 },
    size: { width: 2, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'spaces',
    cardType: 'spaces',
    position: { x: 2, y: 1 },
    size: { width: 1, height: 2 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'ghost-mode',
    cardType: 'ghostMode',
    position: { x: 3, y: 1 },
    size: { width: 1, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'hive-lab',
    cardType: 'hiveLab',
    position: { x: 3, y: 2 },
    size: { width: 1, height: 1 },
    isVisible: true,
    settings: {}
  }
];

// Device Preview Component
function DevicePreview({ 
  device, 
  onDeviceChange 
}: { 
  device: 'mobile' | 'tablet' | 'desktop';
  onDeviceChange: (device: 'mobile' | 'tablet' | 'desktop') => void;
}) {
  const devices = [
    { key: 'mobile', label: 'Mobile', icon: Smartphone },
    { key: 'tablet', label: 'Tablet', icon: Tablet },
    { key: 'desktop', label: 'Desktop', icon: Monitor }
  ];

  return (
    <div className="flex gap-1">
      {devices.map(({ key, label, icon: Icon }) => (
        <Button
          key={key}
          size="sm"
          variant={device === key ? "default" : "outline"}
          className="h-8 px-3"
          onClick={() => onDeviceChange(key as any)}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </Button>
      ))}
    </div>
  );
}

// Card Visibility Settings
function CardVisibilitySettings({
  items,
  onItemToggle
}: {
  items: GridItem[];
  onItemToggle: (id: string, visible: boolean) => void;
}) {
  const cardLabels = {
    avatar: 'Avatar & Identity',
    calendar: 'Calendar & Events',
    notifications: 'Notifications',
    spaces: 'Spaces & Communities',
    ghostMode: 'Privacy Controls',
    hiveLab: 'Tool Builder'
  };

  return (
    <div className="space-y-3">
      <h4 className="font-medium text-[var(--hive-text-primary)]">Card Visibility</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <span className="text-sm text-[var(--hive-text-primary)]">
              {cardLabels[item.cardType as keyof typeof cardLabels]}
            </span>
            <Switch
              checked={item.isVisible}
              onCheckedChange={(checked) => onItemToggle(item.id, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Profile Settings Dialog
function ProfileSettingsDialog({
  isOpen,
  onOpenChange,
  items,
  onItemToggle,
  onResetLayout
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  items: GridItem[];
  onItemToggle: (id: string, visible: boolean) => void;
  onResetLayout: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Card Visibility */}
          <CardVisibilitySettings 
            items={items}
            onItemToggle={onItemToggle}
          />

          {/* Layout Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Layout</h4>
            <div className="space-y-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                onClick={onResetLayout}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Default Layout
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                disabled
              >
                <Download className="w-4 h-4 mr-2" />
                Export Layout
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
                disabled
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Layout
              </Button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Privacy</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm">Public Profile</span>
                  <p className="text-xs text-[var(--hive-text-muted)]">Allow others to view your profile</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm">Show Activity</span>
                  <p className="text-xs text-[var(--hive-text-muted)]">Display recent activity to others</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Profile Dashboard Component
export function ProfileDashboard({
  userId,
  isOwnProfile,
  className
}: ProfileDashboardProps) {
  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    user: mockUserProfile,
    events: mockCalendarEvents,
    notifications: mockNotifications,
    spaces: mockSpaces,
    recommendedSpaces: mockRecommendedSpaces,
    ghostModeSettings: mockGhostModeSettings,
    tools: mockTools,
    builderStats: mockBuilderStats,
    isBuilder: true
  });

  // Bento grid management
  const {
    items,
    isEditMode,
    updateItems,
    toggleEditMode,
    setIsEditMode
  } = useBentoGrid(defaultGridItems);

  // Handle profile updates
  const handleProfileUpdate = useCallback((updates: Partial<UserProfile>) => {
    setProfileData(prev => ({
      ...prev,
      user: { ...prev.user, ...updates }
    }));
  }, []);

  const handlePhotoUpload = useCallback(async (file: File): Promise<string> => {
    // Mock photo upload - in real app, this would upload to Firebase Storage
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(file);
        handleProfileUpdate({ profilePhotoURL: mockUrl });
        resolve(mockUrl);
      }, 1000);
    });
  }, [handleProfileUpdate]);

  // Handle ghost mode changes
  const handleGhostModeChange = useCallback((settings: Partial<GhostModeSettings>) => {
    setProfileData(prev => ({
      ...prev,
      ghostModeSettings: { ...prev.ghostModeSettings, ...settings }
    }));
  }, []);

  const handleToggleGhostMode = useCallback((enabled: boolean) => {
    handleGhostModeChange({ isEnabled: enabled });
  }, [handleGhostModeChange]);

  const handleGhostModePreset = useCallback((preset: keyof GhostModeSettings['presets']) => {
    const newPresets = { ...profileData.ghostModeSettings.presets };
    newPresets[preset] = !newPresets[preset];
    handleGhostModeChange({ presets: newPresets });
  }, [profileData.ghostModeSettings.presets, handleGhostModeChange]);

  // Handle card visibility
  const handleCardVisibilityToggle = useCallback((id: string, visible: boolean) => {
    const updatedItems = items.map(item => 
      item.id === id ? { ...item, isVisible: visible } : item
    );
    updateItems(updatedItems);
  }, [items, updateItems]);

  // Handle layout reset
  const handleResetLayout = useCallback(() => {
    updateItems(defaultGridItems);
    setSettingsOpen(false);
  }, [updateItems]);

  // Get responsive columns based on device
  const maxColumns = useMemo(() => {
    switch (device) {
      case 'mobile': return 1;
      case 'tablet': return 2;
      case 'desktop': return 4;
      default: return 4;
    }
  }, [device]);

  // Render card content based on type
  const renderCardContent = useCallback((item: GridItem) => {
    switch (item.cardType) {
      case 'avatar':
        return (
          <AvatarCard
            profile={profileData.user}
            isEditMode={isEditMode}
            onProfileUpdate={handleProfileUpdate}
            onPhotoUpload={handlePhotoUpload}
            onEditClick={() => console.log('Edit profile')}
            onSettingsClick={() => setSettingsOpen(true)}
          />
        );
      
      case 'calendar':
        return (
          <CalendarCard
            events={profileData.events}
            isEditMode={isEditMode}
            onEventCreate={(event) => console.log('Create event:', event)}
            onEventUpdate={(id, updates) => console.log('Update event:', id, updates)}
            onRSVP={(eventId, status) => console.log('RSVP:', eventId, status)}
            onSettingsClick={() => console.log('Calendar settings')}
          />
        );
      
      case 'notifications':
        return (
          <NotificationsCard
            notifications={profileData.notifications}
            unreadCount={profileData.notifications.filter(n => !n.isRead).length}
            isEditMode={isEditMode}
            onNotificationRead={(id) => console.log('Mark read:', id)}
            onNotificationArchive={(id) => console.log('Archive:', id)}
            onNotificationAction={(id, action, data) => console.log('Action:', id, action, data)}
            onMarkAllRead={() => console.log('Mark all read')}
            onSettingsClick={() => console.log('Notification settings')}
          />
        );
      
      case 'spaces':
        return (
          <SpacesCard
            spaces={profileData.spaces}
            recommendedSpaces={profileData.recommendedSpaces}
            isEditMode={isEditMode}
            onSpaceClick={(spaceId) => console.log('Open space:', spaceId)}
            onJoinSpace={(spaceId) => console.log('Join space:', spaceId)}
            onLeaveSpace={(spaceId) => console.log('Leave space:', spaceId)}
            onCreateSpace={() => console.log('Create space')}
            onSearchSpaces={(query) => console.log('Search spaces:', query)}
            onSettingsClick={() => console.log('Spaces settings')}
          />
        );
      
      case 'ghostMode':
        return (
          <GhostModeCard
            settings={profileData.ghostModeSettings}
            isEditMode={isEditMode}
            onSettingsChange={handleGhostModeChange}
            onToggleGhostMode={handleToggleGhostMode}
            onQuickPreset={handleGhostModePreset}
            onSettingsClick={() => console.log('Ghost mode settings')}
          />
        );
      
      case 'hiveLab':
        return (
          <HiveLabCard
            tools={profileData.tools}
            builderStats={profileData.builderStats}
            isBuilder={profileData.isBuilder}
            isEditMode={isEditMode}
            onCreateTool={() => console.log('Create tool')}
            onToolClick={(toolId) => console.log('Open tool:', toolId)}
            onSettingsClick={() => console.log('HiveLAB settings')}
          />
        );
      
      default:
        return (
          <Card className="h-full flex items-center justify-center">
            <p className="text-[var(--hive-text-muted)]">Unknown card type</p>
          </Card>
        );
    }
  }, [
    profileData,
    isEditMode,
    handleProfileUpdate,
    handlePhotoUpload,
    handleGhostModeChange,
    handleToggleGhostMode,
    handleGhostModePreset
  ]);

  // Stats for header
  const unreadNotifications = profileData.notifications.filter(n => !n.isRead).length;
  const activeSpaces = profileData.spaces.filter(s => s.membershipStatus === 'member' || s.membershipStatus === 'admin').length;

  return (
    <>
      <div className={cn('w-full max-w-7xl mx-auto space-y-6', className)}>
        {/* Profile Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
                {isOwnProfile ? 'Your Profile' : profileData.user.displayName}
              </h1>
              
              {profileData.user.builderStatus && (
                <Badge variant="primary" className="bg-[var(--hive-brand-gold)]">
                  <Crown className="w-4 h-4 mr-1" />
                  Builder
                </Badge>
              )}
              
              {profileData.ghostModeSettings.isEnabled && (
                <Badge variant="secondary">
                  <EyeOff className="w-4 h-4 mr-1" />
                  Ghost Mode
                </Badge>
              )}
            </div>

            {/* Quick Stats */}
            <div className="hidden md:flex items-center gap-4 text-sm text-[var(--hive-text-muted)]">
              <div className="flex items-center gap-1">
                <Bell className="w-4 h-4" />
                {unreadNotifications} unread
              </div>
              <div className="flex items-center gap-1">
                <Grid className="w-4 h-4" />
                {activeSpaces} spaces
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Preview (Edit Mode) */}
            {isEditMode && (
              <DevicePreview device={device} onDeviceChange={setDevice} />
            )}

            {/* Edit/Settings Actions */}
            {isOwnProfile && (
              <>
                <Button
                  variant={isEditMode ? "default" : "outline"}
                  size="sm"
                  onClick={toggleEditMode}
                >
                  {isEditMode ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Layout
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Customize
                    </>
                  )}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSettingsOpen(true)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Edit Mode Notice */}
        <AnimatePresence>
          {isEditMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-[var(--hive-brand-primary)]" />
                <div>
                  <h3 className="font-medium text-[var(--hive-text-primary)]">
                    Customization Mode Active
                  </h3>
                  <p className="text-sm text-[var(--hive-text-muted)]">
                    Drag cards to reorder, resize using the corner handles, or adjust settings.
                    Changes are saved automatically.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Dashboard Grid */}
        <div 
          className={cn(
            'transition-all duration-300',
            device === 'mobile' && 'max-w-sm mx-auto',
            device === 'tablet' && 'max-w-4xl mx-auto',
            device === 'desktop' && 'max-w-7xl mx-auto'
          )}
        >
          <BentoGridLayout
            items={items}
            isEditMode={isEditMode}
            onItemsChange={updateItems}
            onEditModeChange={setIsEditMode}
            maxColumns={maxColumns}
          >
            {/* Render cards dynamically */}
            {items
              .filter(item => item.isVisible)
              .map((item) => (
                <div key={item.id}>
                  {renderCardContent(item)}
                </div>
              ))}
          </BentoGridLayout>
        </div>

        {/* Mobile Stats */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
              {unreadNotifications}
            </div>
            <div className="text-sm text-[var(--hive-text-muted)]">Unread Notifications</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
              {activeSpaces}
            </div>
            <div className="text-sm text-[var(--hive-text-muted)]">Active Spaces</div>
          </Card>
        </div>
      </div>

      {/* Settings Dialog */}
      <ProfileSettingsDialog
        isOpen={settingsOpen}
        onOpenChange={setSettingsOpen}
        items={items}
        onItemToggle={handleCardVisibilityToggle}
        onResetLayout={handleResetLayout}
      />
    </>
  );
}

// Export default props for Storybook
export const defaultProfileDashboardProps: ProfileDashboardProps = {
  userId: 'user-1',
  isOwnProfile: true
};