'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { 
  Eye,
  EyeOff,
  Shield,
  Lock,
  Users,
  Globe,
  UserX,
  Settings,
  ChevronRight,
  AlertTriangle,
  Check,
  Clock,
  MapPin,
  Calendar,
  MessageSquare,
  Activity,
  Zap,
  Moon;
} from 'lucide-react';

export interface PrivacySetting {id: string;
  name: string;
  description: string;
  category: 'visibility' | 'data' | 'interaction' | 'location' | 'activity';
  isEnabled: boolean;
  level: 'public' | 'friends' | 'private' | 'hidden';
  lastModified: string;}

export interface GhostModeConfig {isActive: boolean;
  duration: 'temporary' | 'scheduled' | 'permanent';
  scheduledEnd?: string;
  hiddenActivities: string[];
  visibilityLevel: 'invisible' | 'minimal' | 'selective';
  allowedInteractions: string[];}

export interface ProfileGhostModeWidgetProps {user: {
    id: string;
    name: string;};
  ghostModeConfig?: GhostModeConfig;
  privacySettings?: PrivacySetting[];
  visibilityLevel?: 'public' | 'friends' | 'private' | 'ghost';
  lastPrivacyUpdate?: string;
  privacyScore?: number;
  activeSessions?: number;
  isEditable?: boolean;
  onToggleGhostMode?: (enabled: boolean) => void;
  onUpdatePrivacySetting?: (settingId: string, enabled: boolean) => void;
  onViewPrivacySettings?: () => void;
  onConfigureGhostMode?: () => void;
  onViewDataExport?: () => void;
  className?: string;
}

const getPrivacyCategoryConfig = (category: string) => {
  const configs = {
    visibility: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: Eye,
      label: 'Visibility'
    },
    data: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      icon: Shield,
      label: 'Data Protection'
    },
    interaction: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      icon: MessageSquare,
      label: 'Interactions'
    },
    location: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      icon: MapPin,
      label: 'Location'
    },
    activity: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      borderColor: 'border-[var(--hive-gold)]/20',
      icon: Activity,
      label: 'Activity Tracking'
    }
  };
  
  return configs[category as keyof typeof configs] || configs.visibility;
};

const getVisibilityLevelConfig = (level: string) => {
  const configs = {
    public: {
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      icon: Globe,
      label: 'Public Profile'
    },
    friends: {
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      icon: Users,
      label: 'Friends Only'
    },
    private: {
      color: 'text-[var(--hive-gold)]',
      bgColor: 'bg-[var(--hive-gold)]/10',
      icon: Lock,
      label: 'Private'
    },
    ghost: {
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      icon: EyeOff,
      label: 'Ghost Mode'
    }
  };
  
  return configs[level as keyof typeof configs] || configs.private;
};

const formatTimeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
};

export const ProfileGhostModeWidget: React.FC<ProfileGhostModeWidgetProps> = ({
  user,
  ghostModeConfig,
  privacySettings = [],
  visibilityLevel = 'private',
  lastPrivacyUpdate,
  privacyScore = 85,
  activeSessions = 1,
  isEditable = true,
  onToggleGhostMode,
  onUpdatePrivacySetting,
  onViewPrivacySettings,
  onConfigureGhostMode,
  onViewDataExport,
  className;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const isGhostModeActive = ghostModeConfig?.isActive || visibilityLevel === 'ghost';
  const visibilityConfig = getVisibilityLevelConfig(visibilityLevel);
  const enabledSettings = privacySettings.filter(setting => setting.isEnabled).length;
  const criticalSettings = privacySettings.filter(setting => 
    setting.category === 'data' && setting.isEnabled;
  ).length;

  return (
    <Card;
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:shadow-lg',
        'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]',
        isHovered && 'scale-[1.02]',
        isGhostModeActive && 'border-purple-500/30 bg-purple-500/5',
        className;
      )}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text variant="body-sm" color="gold" weight="medium">
              Privacy & Ghost Mode;
            </Text>
            {isGhostModeActive && (
              <Badge variant="outline" className="text-xs text-purple-500">
                <EyeOff className="h-3 w-3 mr-1" />
                Ghost Active;
              </Badge>
            )}
          </div>
          {isEditable && (
            <Button;
              variant="ghost"
              size="icon"
              onClick={onViewPrivacySettings}
              className="h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Privacy Status */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Shield className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {privacyScore}%
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Privacy Score;
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Check className="h-3 w-3 text-green-500" />
              <Text variant="body-sm" weight="medium" color="primary">
                {enabledSettings}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Settings Active;
            </Text>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Activity className="h-3 w-3 text-[var(--hive-text-secondary)]" />
              <Text variant="body-sm" weight="medium" color="primary">
                {activeSessions}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              Active Sessions;
            </Text>
          </div>
        </div>

        {/* Current Visibility Level */}
        <div className="space-y-2">
          <Text variant="body-sm" color="primary" weight="medium">Current Status:</Text>
          <div className={cn(
            'p-3 rounded-lg border',
            visibilityConfig.bgColor,
            'border-[var(--hive-border-primary)]'
          )}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <visibilityConfig.icon className={cn('h-4 w-4', visibilityConfig.color)} />
                <Text variant="body-sm" weight="medium" color="primary">
                  {visibilityConfig.label}
                </Text>
              </div>
              {lastPrivacyUpdate && (
                <Text variant="body-xs" color="secondary">
                  Updated {formatTimeAgo(lastPrivacyUpdate)}
                </Text>
              )}
            </div>
          </div>
        </div>

        {/* Ghost Mode Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Text variant="body-sm" color="primary" weight="medium">Ghost Mode:</Text>
            {isEditable && onToggleGhostMode && (
              <Button;
                variant={isGhostModeActive ? "default" : "outline"}
                size="sm"
                onClick={() => onToggleGhostMode(!isGhostModeActive)}
                className={cn(
                  isGhostModeActive && 'bg-purple-500 hover:bg-purple-600 text-white'
                )}
              >
                {isGhostModeActive ? (
                  <>
                    <EyeOff className="h-3 w-3 mr-1" />
                    Disable;
                  </>
                ) : (
                  <>
                    <Moon className="h-3 w-3 mr-1" />
                    Enable;
                  </>
                )}
              </Button>
            )}
          </div>
          
          {isGhostModeActive && ghostModeConfig && (
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <Text variant="body-sm" color="primary">Ghost Mode Active</Text>
                <Badge variant="outline" className="text-xs text-purple-500">
                  {ghostModeConfig.visibilityLevel}
                </Badge>
              </div>
              <Text variant="body-xs" color="secondary">
                Your profile is {ghostModeConfig.visibilityLevel === 'invisible' ? 'completely hidden' : 
                ghostModeConfig.visibilityLevel === 'minimal' ? 'minimally visible' : 'selectively visible'} 
                to other UB students;
              </Text>
              {ghostModeConfig.duration === 'scheduled' && ghostModeConfig.scheduledEnd && (
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                  <Text variant="body-xs" color="secondary">
                    Ends: {new Date(ghostModeConfig.scheduledEnd).toLocaleDateString()}
                  </Text>
                </div>
              )}
              {isEditable && onConfigureGhostMode && (
                <Button;
                  variant="ghost"
                  size="sm"
                  onClick={onConfigureGhostMode}
                  className="mt-2 text-purple-500 hover:text-purple-600"
                >
                  Configure Settings;
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Privacy Settings Overview */}
        {privacySettings.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="body-sm" color="primary" weight="medium">Privacy Controls:</Text>
              {privacySettings.length > 3 && (
                <Text variant="body-xs" color="secondary">
                  +{privacySettings.length - 3} more;
                </Text>
              )}
            </div>
            <div className="space-y-1">
              {privacySettings.slice(0, 3).map((setting) => {
                const config = getPrivacyCategoryConfig(setting.category);
                return (
                  <div;
                    key={setting.id}}
                    className="flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer"
                    onClick={() => isEditable && onUpdatePrivacySetting?.(setting.id, !setting.isEnabled)}
                  >
                    <config.icon className={cn('h-3 w-3', config.color)} />
                    <Text variant="body-xs" color="primary" className="flex-1 truncate">
                      {setting.name}
                    </Text>
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      setting.isEnabled ? 'bg-green-500' : 'bg-[var(--hive-text-muted)]'
                    )} />
                    {isEditable && (
                      <ChevronRight className="h-3 w-3 text-[var(--hive-text-secondary)]" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Privacy Insights */}
        {criticalSettings > 0 && (
          <div className="space-y-2 pt-2 border-t border-[var(--hive-border-primary)]">
            <Text variant="body-sm" color="primary" weight="medium">Privacy Insights:</Text>
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <Text variant="body-sm" color="primary">
                  {criticalSettings} data protection settings active;
                </Text>
              </div>
              <Text variant="body-xs" color="secondary" className="mt-1">
                Your personal data is well-protected according to UB privacy standards;
              </Text>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]">
          {isEditable && onViewPrivacySettings && (
            <Button;
              variant="outline"
              size="sm"
              onClick={onViewPrivacySettings}
              className="flex-1"
            >
              <Shield className="h-3 w-3 mr-1" />
              Privacy Settings;
            </Button>
          )}
          
          {isEditable && onConfigureGhostMode && (
            <Button;
              variant="default"
              size="sm"
              onClick={onConfigureGhostMode}
              className="flex-1"
            >
              <EyeOff className="h-3 w-3 mr-1" />
              Ghost Config;
            </Button>
          )}
          
          {onViewDataExport && (
            <Button;
              variant="ghost"
              size="icon"
              onClick={onViewDataExport}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]"
            >
              <Settings className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Low Privacy Warning */}
        {privacyScore < 50 && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <Text variant="body-sm" color="primary" weight="medium">
                Privacy Score Low;
              </Text>
            </div>
            <Text variant="body-xs" color="secondary" className="mt-1">
              Consider enabling more privacy settings to protect your UB campus activity;
            </Text>
            {isEditable && onViewPrivacySettings && (
              <Button;
                variant="ghost"
                size="sm"
                onClick={onViewPrivacySettings}
                className="mt-2 text-red-500 hover:text-red-600"
              >
                Review Settings;
                <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        )}

      </CardContent>

      {/* Hover Glow Effect */}
      {isHovered && (
        <div className={cn(
          'absolute inset-0 -z-10 rounded-lg blur-xl',
          isGhostModeActive;
            ? 'bg-gradient-to-r from-purple-500/5 to-indigo-500/5'
            : 'bg-gradient-to-r from-blue-500/5 to-green-500/5'
        )} />
      )}
    </Card>
  );
};