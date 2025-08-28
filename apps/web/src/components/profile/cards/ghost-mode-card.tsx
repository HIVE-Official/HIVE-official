"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Ghost,
  Eye,
  EyeOff,
  Settings,
  Clock,
  Users,
  MessageCircle,
  Search,
  Calendar,
  Shield,
  Info,
  Moon,
  Sun,
  Zap
} from 'lucide-react';

interface PrivacySettings {
  ghostMode: boolean;
  ghostModeSchedule?: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    days: string[];
  };
  profileVisibility: 'public' | 'connections' | 'private';
  showActivity: boolean;
  showConnections: boolean;
  socialDiscovery: boolean;
  studyPartnerMatching: boolean;
}

interface GhostModeCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function GhostModeCard({ settings, isEditMode, className }: GhostModeCardProps) {
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    ghostMode: false,
    profileVisibility: 'public',
    showActivity: true,
    showConnections: true,
    socialDiscovery: true,
    studyPartnerMatching: true
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchPrivacySettings();
  }, []);

  const fetchPrivacySettings = async () => {
    try {
      const response = await fetch('/api/profile/privacy');
      if (response.ok) {
        const data = await response.json();
        // Map API response to our expected interface
        const apiPrivacy = data.privacy || {};
        const mappedSettings: PrivacySettings = {
          ghostMode: apiPrivacy.ghostMode?.enabled || false,
          ghostModeSchedule: apiPrivacy.ghostMode?.enabled ? {
            enabled: true,
            startTime: '23:00',
            endTime: '07:00',
            days: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
          } : undefined,
          profileVisibility: apiPrivacy.isPublic ? 'public' : 'connections',
          showActivity: apiPrivacy.showActivity !== false,
          showConnections: apiPrivacy.showSpaces !== false,
          socialDiscovery: apiPrivacy.allowPersonalization !== false,
          studyPartnerMatching: apiPrivacy.allowEventInvites !== false
        };
        setPrivacySettings(mappedSettings);
      }
    } catch (error) {
      console.error('Error fetching privacy settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePrivacySetting = async (key: keyof PrivacySettings, value: any) => {
    setIsUpdating(true);
    try {
      // Map our interface to API format
      const updatePayload: any = {};
      
      if (key === 'ghostMode') {
        updatePayload.ghostMode = {
          enabled: value,
          level: value ? 'moderate' : 'minimal',
          hideActivity: value,
          hideOnlineStatus: value,
          hideMemberships: false
        };
      } else if (key === 'profileVisibility') {
        updatePayload.isPublic = value === 'public';
      } else if (key === 'showActivity') {
        updatePayload.showActivity = value;
      } else if (key === 'showConnections') {
        updatePayload.showSpaces = value;
      } else if (key === 'socialDiscovery') {
        updatePayload.allowPersonalization = value;
      } else if (key === 'studyPartnerMatching') {
        updatePayload.allowEventInvites = value;
      }

      const response = await fetch('/api/profile/privacy', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      });

      if (response.ok) {
        const updatedSettings = { ...privacySettings, [key]: value };
        setPrivacySettings(updatedSettings);
      }
    } catch (error) {
      console.error('Error updating privacy setting:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleGhostMode = () => {
    updatePrivacySetting('ghostMode', !privacySettings.ghostMode);
  };

  const getVisibilityDescription = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return 'Visible to all HIVE users';
      case 'connections':
        return 'Visible to your connections only';
      case 'private':
        return 'Hidden from others';
      default:
        return 'Unknown visibility level';
    }
  };

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return Users;
      case 'connections':
        return MessageCircle;
      case 'private':
        return EyeOff;
      default:
        return Eye;
    }
  };

  const isInGhostHours = () => {
    if (!privacySettings.ghostModeSchedule?.enabled) return false;
    
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const startTime = parseInt(privacySettings.ghostModeSchedule.startTime.split(':')[0]) * 60 + 
                     parseInt(privacySettings.ghostModeSchedule.startTime.split(':')[1]);
    const endTime = parseInt(privacySettings.ghostModeSchedule.endTime.split(':')[0]) * 60 + 
                   parseInt(privacySettings.ghostModeSchedule.endTime.split(':')[1]);
    
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    return privacySettings.ghostModeSchedule.days.includes(currentDay) &&
           currentTime >= startTime && currentTime <= endTime;
  };

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  const isGhostActive = privacySettings.ghostMode || isInGhostHours();

  return (
    <Card className={`p-6 relative ${className} ${isGhostActive ? 'bg-muted/30 border-muted' : ''}`}>
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute top-2 right-2 opacity-50">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Ghost className={`h-5 w-5 ${isGhostActive ? 'text-accent' : 'text-muted-foreground'}`} />
          <h3 className="font-semibold text-foreground">Ghost Mode</h3>
        </div>
        
        {isGhostActive && (
          <Badge className="bg-accent/20 text-accent border-accent/30">
            Active
          </Badge>
        )}
      </div>

      {/* Ghost Mode Status */}
      <div className="mb-4">
        <div className={`p-4 rounded-lg border-2 transition-all ${
          isGhostActive 
            ? 'border-accent/30 bg-accent/10' 
            : 'border-border/50 bg-muted/20'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-foreground">
              {isGhostActive ? 'Currently invisible' : 'Currently visible'}
            </span>
            <div className="flex items-center gap-1">
              {isInGhostHours() && <Clock className="h-4 w-4 text-accent" />}
              {isGhostActive ? (
                <EyeOff className="h-4 w-4 text-accent" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {isGhostActive 
              ? 'You\'re hidden from search, member lists, and friend suggestions'
              : 'You\'re discoverable by other students on campus'
            }
          </p>
        </div>
      </div>

      {/* Quick Toggle */}
      {!isEditMode && (
        <div className="mb-4">
          <Button
            onClick={toggleGhostMode}
            disabled={isUpdating}
            className={`w-full ${
              privacySettings.ghostMode 
                ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {isUpdating ? (
              <div className="animate-spin h-4 w-4 mr-2">⚡</div>
            ) : privacySettings.ghostMode ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {privacySettings.ghostMode ? 'Turn Off Ghost Mode' : 'Activate Ghost Mode'}
          </Button>
        </div>
      )}

      {/* Privacy Settings Overview */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground text-sm">Privacy Settings</h4>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <div className="flex items-center gap-2">
              {React.createElement(getVisibilityIcon(privacySettings.profileVisibility), {
                className: "h-4 w-4 text-muted-foreground"
              })}
              <span className="text-sm text-foreground">Profile</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {privacySettings.profileVisibility}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Activity</span>
            </div>
            <Badge variant={privacySettings.showActivity ? "default" : "secondary"} className="text-xs">
              {privacySettings.showActivity ? 'Visible' : 'Hidden'}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground">Discovery</span>
            </div>
            <Badge variant={privacySettings.socialDiscovery ? "default" : "secondary"} className="text-xs">
              {privacySettings.socialDiscovery ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Scheduled Ghost Mode */}
      {privacySettings.ghostModeSchedule?.enabled && (
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-accent" />
            <span className="font-medium text-foreground text-sm">Scheduled Privacy</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {privacySettings.ghostModeSchedule.startTime} - {privacySettings.ghostModeSchedule.endTime}
          </p>
          <p className="text-xs text-muted-foreground">
            {privacySettings.ghostModeSchedule.days.join(', ')}
          </p>
        </div>
      )}

      {/* Information */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-blue-300 font-medium mb-1">
              Ghost Mode Benefits
            </p>
            <ul className="text-xs text-blue-200/80 space-y-1">
              <li>• Focus on studies without social distractions</li>
              <li>• Maintain privacy during personal time</li>
              <li>• Existing connections still work normally</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Settings Link */}
      {!isEditMode && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
          >
            <Shield className="h-3 w-3 mr-2" />
            Advanced Privacy Settings
          </Button>
        </div>
      )}
    </Card>
  );
}