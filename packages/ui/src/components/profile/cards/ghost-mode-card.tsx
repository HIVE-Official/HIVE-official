'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../framer-motion-proxy';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../atomic/ui/card';
import { Button } from '../../atomic/atoms/button-enhanced';
import { Badge } from '../../atomic/atoms/badge';
import { Switch } from '../../ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../dialog';
import { 
  Eye,
  EyeOff,
  Shield,
  Settings,
  Clock,
  Users,
  MapPin,
  MessageSquare,
  Bell,
  Calendar,
  Activity,
  Lock,
  Unlock,
  Timer,
  User,
  UserX,
  Globe,
  AlertTriangle,
  CheckCircle,
  Info,
  Moon,
  Sun,
  Zap,
  Power,
  PowerOff
} from 'lucide-react';

// Ghost Mode Types
export interface GhostModeSettings {
  isEnabled: boolean;
  level: 'light' | 'medium' | 'full';
  duration?: 'temporary' | 'session' | 'indefinite';
  expiresAt?: Date;
  
  // Specific privacy controls
  hideOnlineStatus: boolean;
  hideActivity: boolean;
  hideLocation: boolean;
  hideSpaces: boolean;
  hideTools: boolean;
  muteNotifications: boolean;
  
  // Quick presets
  presets: {
    studying: boolean;
    sleeping: boolean;
    busy: boolean;
    invisible: boolean;
  };
  
  // Auto settings
  autoEnabled: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // "22:00"
    end: string;   // "08:00"
  };
}

export interface GhostModeCardProps {
  settings: GhostModeSettings;
  isEditMode: boolean;
  onSettingsChange: (settings: Partial<GhostModeSettings>) => void;
  onToggleGhostMode: (enabled: boolean) => void;
  onQuickPreset: (preset: keyof GhostModeSettings['presets']) => void;
  onSettingsClick?: () => void;
  className?: string;
}

// Ghost Mode Level Configuration
const ghostModeConfig = {
  light: {
    icon: Eye,
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
    label: 'Light',
    description: 'Hide online status only'
  },
  medium: {
    icon: EyeOff,
    color: 'bg-yellow-500',
    textColor: 'text-yellow-700',
    bgColor: 'bg-yellow-50',
    label: 'Medium',
    description: 'Hide activity and location'
  },
  full: {
    icon: UserX,
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    label: 'Full',
    description: 'Complete invisibility'
  }
};

// Quick Preset Configuration
const presetConfig = {
  studying: {
    icon: BookOpen,
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    label: 'Studying',
    description: 'Focus mode with limited visibility'
  },
  sleeping: {
    icon: Moon,
    color: 'bg-indigo-500',
    textColor: 'text-indigo-700',
    label: 'Sleeping',
    description: 'Night mode with notifications off'
  },
  busy: {
    icon: Zap,
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    label: 'Busy',
    description: 'Working with minimal distractions'
  },
  invisible: {
    icon: UserX,
    color: 'bg-gray-500',
    textColor: 'text-gray-700',
    label: 'Invisible',
    description: 'Completely hidden from others'
  }
};

// Time formatting
function formatTimeRemaining(expiresAt: Date): string {
  const now = new Date();
  const diffMs = expiresAt.getTime() - now.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);

  if (diffMins < 0) return 'Expired';
  if (diffMins < 60) return `${diffMins}m left`;
  if (diffHours < 24) return `${diffHours}h left`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d left`;
}

// Quick Preset Component
function QuickPreset({ 
  preset, 
  isActive, 
  onClick 
}: { 
  preset: keyof typeof presetConfig;
  isActive: boolean;
  onClick: () => void;
}) {
  const config = presetConfig[preset];
  const Icon = config.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'p-2 rounded-lg border transition-all text-left',
        isActive 
          ? `${config.color} text-white border-transparent shadow-md`
          : 'bg-white border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <Icon className={cn('w-4 h-4', isActive ? 'text-white' : config.textColor)} />
        <span className={cn('text-sm font-medium', isActive ? 'text-white' : 'text-[var(--hive-text-primary)]')}>
          {config.label}
        </span>
      </div>
    </motion.button>
  );
}

// Privacy Status Indicator
function PrivacyStatusIndicator({ settings }: { settings: GhostModeSettings }) {
  const activeFeatures = useMemo(() => {
    const features = [];
    if (settings.hideOnlineStatus) features.push('Status');
    if (settings.hideActivity) features.push('Activity');
    if (settings.hideLocation) features.push('Location');
    if (settings.hideSpaces) features.push('Spaces');
    if (settings.muteNotifications) features.push('Notifications');
    return features;
  }, [settings]);

  const config = ghostModeConfig[settings.level];
  const Icon = config.icon;

  return (
    <div className={cn('p-2 rounded-lg', config.bgColor)}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn('w-4 h-4', config.textColor)} />
        <span className={cn('text-sm font-medium', config.textColor)}>
          {config.label} Ghost Mode
        </span>
      </div>
      
      {activeFeatures.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-[var(--hive-text-muted)]">Hidden:</p>
          <div className="flex flex-wrap gap-1">
            {activeFeatures.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="secondary" className="text-xs px-1.5 py-0.5">
                {feature}
              </Badge>
            ))}
            {activeFeatures.length > 3 && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                +{activeFeatures.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Ghost Mode Settings Dialog
function GhostModeSettingsDialog({
  settings,
  isOpen,
  onOpenChange,
  onSettingsChange
}: {
  settings: GhostModeSettings;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsChange: (settings: Partial<GhostModeSettings>) => void;
}) {
  const handleSettingChange = useCallback((key: string, value: any) => {
    if (key.includes('.')) {
      const [parent, child] = key.split('.');
      onSettingsChange({
        [parent]: {
          ...(settings as any)[parent],
          [child]: value
        }
      });
    } else {
      onSettingsChange({ [key]: value });
    }
  }, [settings, onSettingsChange]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ghost Mode Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Privacy Level */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Privacy Level</h4>
            <div className="space-y-2">
              {(Object.keys(ghostModeConfig) as Array<keyof typeof ghostModeConfig>).map((level) => {
                const config = ghostModeConfig[level];
                const Icon = config.icon;
                
                return (
                  <button
                    key={level}
                    className={cn(
                      'w-full p-3 rounded-lg border text-left transition-all',
                      settings.level === level 
                        ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-background-tertiary)]'
                        : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'
                    )}
                    onClick={() => handleSettingChange('level', level)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', config.color)}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-[var(--hive-text-primary)]">{config.label}</div>
                        <div className="text-sm text-[var(--hive-text-muted)]">{config.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Specific Controls */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">What to Hide</h4>
            <div className="space-y-2">
              {[
                { key: 'hideOnlineStatus', label: 'Online Status', icon: Activity },
                { key: 'hideActivity', label: 'Recent Activity', icon: Clock },
                { key: 'hideLocation', label: 'Location Info', icon: MapPin },
                { key: 'hideSpaces', label: 'Space Memberships', icon: Users },
                { key: 'muteNotifications', label: 'Mute Notifications', icon: Bell }
              ].map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[var(--hive-text-muted)]" />
                    <span className="text-sm">{label}</span>
                  </div>
                  <Switch 
                    checked={(settings as any)[key]}
                    onCheckedChange={(checked) => handleSettingChange(key, checked)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Duration</h4>
            <div className="space-y-2">
              {[
                { key: 'temporary', label: '1 Hour', description: 'Auto-disable after 1 hour' },
                { key: 'session', label: 'This Session', description: 'Until you log out' },
                { key: 'indefinite', label: 'Until Disabled', description: 'Stays on until manually turned off' }
              ].map(({ key, label, description }) => (
                <button
                  key={key}
                  className={cn(
                    'w-full p-2 rounded-lg border text-left transition-all',
                    settings.duration === key 
                      ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-background-tertiary)]'
                      : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]'
                  )}
                  onClick={() => handleSettingChange('duration', key)}
                >
                  <div className="font-medium text-sm text-[var(--hive-text-primary)]">{label}</div>
                  <div className="text-xs text-[var(--hive-text-muted)]">{description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Auto Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-[var(--hive-text-primary)]">Automation</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <div>
                    <span className="text-sm">Quiet Hours</span>
                    <p className="text-xs text-[var(--hive-text-muted)]">10 PM - 8 AM</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.quietHours.enabled}
                  onCheckedChange={(checked) => handleSettingChange('quietHours.enabled', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[var(--hive-text-muted)]" />
                  <span className="text-sm">Auto Ghost Mode</span>
                </div>
                <Switch 
                  checked={settings.autoEnabled}
                  onCheckedChange={(checked) => handleSettingChange('autoEnabled', checked)}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Main Ghost Mode Card Component
export function GhostModeCard({
  settings,
  isEditMode,
  onSettingsChange,
  onToggleGhostMode,
  onQuickPreset,
  onSettingsClick,
  className
}: GhostModeCardProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showPresets, setShowPresets] = useState(false);

  const activePresets = useMemo(() => 
    Object.entries(settings.presets).filter(([_, active]) => active).map(([preset]) => preset),
    [settings.presets]
  );

  const timeRemaining = useMemo(() => {
    if (settings.expiresAt && settings.duration === 'temporary') {
      return formatTimeRemaining(settings.expiresAt);
    }
    return null;
  }, [settings.expiresAt, settings.duration]);

  const handleToggle = useCallback(() => {
    onToggleGhostMode(!settings.isEnabled);
  }, [settings.isEnabled, onToggleGhostMode]);

  const handlePresetClick = useCallback((preset: keyof GhostModeSettings['presets']) => {
    onQuickPreset(preset);
  }, [onQuickPreset]);

  return (
    <>
      <Card className={cn('h-full overflow-hidden', className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  color: settings.isEnabled 
                    ? 'var(--hive-brand-primary)' 
                    : 'var(--hive-text-muted)'
                }}
              >
                {settings.isEnabled ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </motion.div>
              <h3 className="font-semibold text-[var(--hive-text-primary)] text-sm">
                Ghost Mode
              </h3>
            </div>
            
            {!isEditMode && (
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="w-3 h-3" />
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Main Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                {settings.isEnabled ? 'Enabled' : 'Disabled'}
              </span>
              {timeRemaining && (
                <p className="text-xs text-[var(--hive-text-muted)]">{timeRemaining}</p>
              )}
            </div>
            <motion.div
              whileTap={{ scale: 0.95 }}
            >
              <Switch
                checked={settings.isEnabled}
                onCheckedChange={handleToggle}
              />
            </motion.div>
          </div>

          {/* Status Display */}
          {settings.isEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <PrivacyStatusIndicator settings={settings} />
            </motion.div>
          )}

          {/* Quick Presets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[var(--hive-text-muted)]">Quick Presets</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0"
                onClick={() => setShowPresets(!showPresets)}
              >
                {showPresets ? (
                  <EyeOff className="w-3 h-3" />
                ) : (
                  <Eye className="w-3 h-3" />
                )}
              </Button>
            </div>

            <AnimatePresence>
              {showPresets && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-2 gap-2"
                >
                  {(Object.keys(presetConfig) as Array<keyof typeof presetConfig>).map((preset) => (
                    <QuickPreset
                      key={preset}
                      preset={preset}
                      isActive={settings.presets[preset]}
                      onClick={() => handlePresetClick(preset)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Presets Summary */}
            {!showPresets && activePresets.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {activePresets.slice(0, 2).map((preset) => (
                  <Badge key={preset} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {presetConfig[preset as keyof typeof presetConfig].label}
                  </Badge>
                ))}
                {activePresets.length > 2 && (
                  <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                    +{activePresets.length - 2}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Auto Settings Indicator */}
          {(settings.autoEnabled || settings.quietHours.enabled) && (
            <div className="flex items-center gap-2 p-2 bg-[var(--hive-background-tertiary)] rounded text-xs">
              <Timer className="w-3 h-3 text-[var(--hive-text-muted)]" />
              <span className="text-[var(--hive-text-muted)]">
                {settings.quietHours.enabled && settings.autoEnabled 
                  ? 'Auto & Quiet hours enabled'
                  : settings.quietHours.enabled 
                  ? 'Quiet hours enabled'
                  : 'Auto mode enabled'
                }
              </span>
            </div>
          )}

          {/* Help Text */}
          {!settings.isEnabled && (
            <div className="text-xs text-[var(--hive-text-muted)] text-center">
              <Info className="w-3 h-3 inline mr-1" />
              Hide your activity and status from others
            </div>
          )}
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <GhostModeSettingsDialog
        settings={settings}
        isOpen={settingsOpen}
        onOpenChange={setSettingsOpen}
        onSettingsChange={onSettingsChange}
      />
    </>
  );
}

// Default props for development
export const mockGhostModeSettings: GhostModeSettings = {
  isEnabled: false,
  level: 'medium',
  duration: 'session',
  
  hideOnlineStatus: true,
  hideActivity: true,
  hideLocation: false,
  hideSpaces: false,
  hideTools: false,
  muteNotifications: false,
  
  presets: {
    studying: false,
    sleeping: false,
    busy: false,
    invisible: false
  },
  
  autoEnabled: false,
  quietHours: {
    enabled: true,
    start: '22:00',
    end: '08:00'
  }
};