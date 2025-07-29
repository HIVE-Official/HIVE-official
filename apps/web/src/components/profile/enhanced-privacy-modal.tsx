"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiveButton, HiveCard, HiveBadge } from '@hive/ui';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Users, 
  Globe, 
  X,
  Settings,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface PrivacySettings {
  ghostMode: {
    enabled: boolean;
    level: 'invisible' | 'minimal' | 'selective' | 'normal';
    scheduledEnd?: Date;
  };
  visibility: {
    profile: 'public' | 'members' | 'connections' | 'private';
    activity: 'public' | 'members' | 'connections' | 'private';
    spaces: 'public' | 'members' | 'connections' | 'private';
    tools: 'public' | 'members' | 'connections' | 'private';
  };
  discoverability: {
    searchable: boolean;
    showInDirectory: boolean;
    allowSpaceInvites: boolean;
    allowDirectMessages: boolean;
  };
  analytics: {
    trackActivity: boolean;
    shareUsageStats: boolean;
    allowTargetedSuggestions: boolean;
  };
}

interface EnhancedPrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSettings?: Partial<PrivacySettings>;
  onSave: (settings: PrivacySettings) => Promise<void>;
  isLoading?: boolean;
}

const privacyLevels = {
  invisible: {
    label: 'Invisible',
    description: 'Completely hidden from all discovery',
    icon: EyeOff,
    color: 'red',
    details: [
      'Hidden from directories and search',
      'No activity tracking or sharing',
      'Anonymous in all spaces',
      'No profile visibility to anyone',
      'Space leaders can still see for moderation'
    ]
  },
  minimal: {
    label: 'Minimal',
    description: 'Basic visibility to space members only',
    icon: Eye,
    color: 'yellow',
    details: [
      'Visible only to space members',
      'Limited activity sharing within spaces',
      'No public discovery or search results',
      'Private last seen and online status',
      'Can receive direct invitations'
    ]
  },
  selective: {
    label: 'Selective',
    description: 'Custom visibility rules you control',
    icon: Shield,
    color: 'blue',
    details: [
      'Custom visibility for each content type',
      'Choose who sees your activity',
      'Space-specific privacy settings',
      'Connection-based visibility controls',
      'Full control over discoverability'
    ]
  },
  normal: {
    label: 'Normal',
    description: 'Standard HIVE visibility and sharing',
    icon: Users,
    color: 'green',
    details: [
      'Full platform visibility and discovery',
      'Activity sharing with community',
      'Searchable in directories',
      'Public profile and achievements',
      'Optimal for community engagement'
    ]
  }
};

const visibilityOptions = {
  public: { label: 'Public', icon: Globe, description: 'Visible to everyone on HIVE' },
  members: { label: 'Members', icon: Users, description: 'Visible to space members only' },
  connections: { label: 'Connections', icon: Shield, description: 'Visible to your connections only' },
  private: { label: 'Private', icon: Lock, description: 'Visible only to you' }
};

export const EnhancedPrivacyModal: React.FC<EnhancedPrivacyModalProps> = ({
  isOpen,
  onClose,
  currentSettings,
  onSave,
  isLoading = false
}) => {
  const [settings, setSettings] = useState<PrivacySettings>({
    ghostMode: {
      enabled: false,
      level: 'selective',
      scheduledEnd: undefined
    },
    visibility: {
      profile: 'public',
      activity: 'members',
      spaces: 'public',
      tools: 'public'
    },
    discoverability: {
      searchable: true,
      showInDirectory: true,
      allowSpaceInvites: true,
      allowDirectMessages: true
    },
    analytics: {
      trackActivity: true,
      shareUsageStats: false,
      allowTargetedSuggestions: true
    },
    ...currentSettings
  });

  const [activeTab, setActiveTab] = useState<'ghost' | 'visibility' | 'discovery' | 'analytics'>('ghost');
  const [showGhostScheduler, setShowGhostScheduler] = useState(false);
  const [scheduleHours, setScheduleHours] = useState(1);

  useEffect(() => {
    if (currentSettings) {
      setSettings(prev => ({ ...prev, ...currentSettings }));
    }
  }, [currentSettings]);

  const handleSave = async () => {
    try {
      await onSave(settings);
      onClose();
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
    }
  };

  const toggleGhostMode = (enabled: boolean, level?: typeof settings.ghostMode.level) => {
    setSettings(prev => ({
      ...prev,
      ghostMode: {
        ...prev.ghostMode,
        enabled,
        level: level || prev.ghostMode.level,
        scheduledEnd: enabled && scheduleHours > 0 ? 
          new Date(Date.now() + scheduleHours * 60 * 60 * 1000) : 
          undefined
      }
    }));
  };

  const updateVisibility = (category: keyof typeof settings.visibility, value: typeof settings.visibility.profile) => {
    setSettings(prev => ({
      ...prev,
      visibility: {
        ...prev.visibility,
        [category]: value
      }
    }));
  };

  const updateDiscoverability = (setting: keyof typeof settings.discoverability, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      discoverability: {
        ...prev.discoverability,
        [setting]: value
      }
    }));
  };

  const updateAnalytics = (setting: keyof typeof settings.analytics, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      analytics: {
        ...prev.analytics,
        [setting]: value
      }
    }));
  };

  const currentGhostLevel = privacyLevels[settings.ghostMode.level];
  const GhostIcon = currentGhostLevel.icon;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[var(--hive-background-tertiary)] rounded-2xl border border-[var(--hive-border-default)] w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--hive-border-default)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">Privacy & Visibility</h2>
              <p className="text-sm text-gray-400">Control how you appear on HIVE</p>
            </div>
          </div>
          <HiveButton variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </HiveButton>
        </div>

        <div className="flex h-[600px]">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-[var(--hive-border-default)] p-4">
            <div className="space-y-2">
              {[
                { id: 'ghost', label: 'Ghost Mode', icon: EyeOff },
                { id: 'visibility', label: 'Content Visibility', icon: Eye },
                { id: 'discovery', label: 'Discoverability', icon: Globe },
                { id: 'analytics', label: 'Data & Analytics', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors',
                      activeTab === tab.id
                        ? 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]'
                        : 'text-gray-300 hover:bg-gray-800/50 hover:text-[var(--hive-text-primary)]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'ghost' && (
                <motion.div
                  key="ghost"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Ghost Mode</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Control your overall visibility and privacy level on HIVE
                    </p>
                  </div>

                  {/* Current Status */}
                  <HiveCard className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'p-2 rounded-lg',
                          settings.ghostMode.enabled ? 'bg-red-500/20' : 'bg-green-500/20'
                        )}>
                          <GhostIcon className={cn(
                            'h-5 w-5',
                            settings.ghostMode.enabled ? 'text-red-400' : 'text-green-400'
                          )} />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--hive-text-primary)]">
                            {settings.ghostMode.enabled ? 'Ghost Mode Active' : 'Fully Visible'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {settings.ghostMode.enabled ? 
                              `${currentGhostLevel.label} privacy level` :
                              'Normal HIVE visibility'
                            }
                          </p>
                        </div>
                      </div>
                      <HiveBadge 
                        variant={settings.ghostMode.enabled ? "tool-tag" : "active-tag"}
                        className={settings.ghostMode.enabled ? 
                          'bg-red-500/20 text-red-400 border-red-500/30' :
                          'bg-green-500/20 text-green-400 border-green-500/30'
                        }
                      >
                        {settings.ghostMode.enabled ? 'HIDDEN' : 'VISIBLE'}
                      </HiveBadge>
                    </div>
                  </HiveCard>

                  {/* Privacy Levels */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">Choose Your Privacy Level</h4>
                    {Object.entries(privacyLevels).map(([key, level]) => {
                      const Icon = level.icon;
                      const isSelected = settings.ghostMode.level === key;
                      
                      return (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => toggleGhostMode(key !== 'normal', key as any)}
                          className={cn(
                            'w-full p-4 rounded-lg border text-left transition-colors',
                            isSelected
                              ? 'bg-[var(--hive-brand-secondary)]/20 border-hive-gold/30'
                              : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className={cn(
                              'h-5 w-5 mt-0.5',
                              isSelected ? 'text-[var(--hive-brand-secondary)]' : 'text-gray-400'
                            )} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn(
                                  'font-medium',
                                  isSelected ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-primary)]'
                                )}>
                                  {level.label}
                                </span>
                                {isSelected && <CheckCircle className="h-4 w-4 text-[var(--hive-brand-secondary)]" />}
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{level.description}</p>
                              <div className="space-y-1">
                                {level.details.slice(0, 2).map((detail, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                                    <div className="w-1 h-1 rounded-full bg-gray-600" />
                                    <span>{detail}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Schedule Ghost Mode */}
                  {settings.ghostMode.enabled && (
                    <HiveCard className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                            Schedule Auto-Disable
                          </span>
                        </div>
                        <button
                          onClick={() => setShowGhostScheduler(!showGhostScheduler)}
                          className="text-xs text-blue-400 hover:underline"
                        >
                          {showGhostScheduler ? 'Hide' : 'Set Timer'}
                        </button>
                      </div>
                      
                      {showGhostScheduler && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min="1"
                              max="24"
                              value={scheduleHours}
                              onChange={(e) => setScheduleHours(parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-300 w-16">{scheduleHours}h</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            Ghost mode will automatically turn off in {scheduleHours} hour{scheduleHours !== 1 ? 's' : ''}
                          </p>
                        </div>
                      )}
                    </HiveCard>
                  )}
                </motion.div>
              )}

              {activeTab === 'visibility' && (
                <motion.div
                  key="visibility"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Content Visibility</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Control who can see different parts of your profile and activity
                    </p>
                  </div>

                  {Object.entries(settings.visibility).map(([category, currentLevel]) => (
                    <HiveCard key={category} className="p-4">
                      <div className="mb-3">
                        <h4 className="font-medium text-[var(--hive-text-primary)] capitalize mb-1">
                          {category} Visibility
                        </h4>
                        <p className="text-sm text-gray-400">
                          {category === 'profile' && 'Your basic profile information and stats'}
                          {category === 'activity' && 'Your recent activity and engagement'}
                          {category === 'spaces' && 'The spaces you\'re a member of'}
                          {category === 'tools' && 'Tools you\'ve created or use frequently'}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(visibilityOptions).map(([level, option]) => {
                          const Icon = option.icon;
                          const isSelected = currentLevel === level;
                          
                          return (
                            <button
                              key={level}
                              onClick={() => updateVisibility(category as any, level as any)}
                              className={cn(
                                'flex items-center gap-2 p-3 rounded-lg border text-left transition-colors',
                                isSelected
                                  ? 'bg-[var(--hive-brand-secondary)]/20 border-hive-gold/30 text-[var(--hive-brand-secondary)]'
                                  : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 text-gray-300'
                              )}
                            >
                              <Icon className="h-4 w-4" />
                              <div>
                                <div className="text-sm font-medium">{option.label}</div>
                                <div className="text-xs opacity-75">{option.description}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </HiveCard>
                  ))}
                </motion.div>
              )}

              {activeTab === 'discovery' && (
                <motion.div
                  key="discovery"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Discoverability</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Control how others can find and interact with you on HIVE
                    </p>
                  </div>

                  {Object.entries(settings.discoverability).map(([setting, enabled]) => (
                    <HiveCard key={setting} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">
                            {setting === 'searchable' && 'Searchable Profile'}
                            {setting === 'showInDirectory' && 'Show in Directory'}
                            {setting === 'allowSpaceInvites' && 'Allow Space Invites'}
                            {setting === 'allowDirectMessages' && 'Allow Direct Messages'}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {setting === 'searchable' && 'Allow others to find you through search'}
                            {setting === 'showInDirectory' && 'Appear in campus and space directories'}
                            {setting === 'allowSpaceInvites' && 'Let space leaders invite you to join'}
                            {setting === 'allowDirectMessages' && 'Allow other users to message you'}
                          </p>
                        </div>
                        <button
                          onClick={() => updateDiscoverability(setting as any, !enabled)}
                          className={cn(
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
                            enabled ? 'bg-[var(--hive-brand-secondary)]' : 'bg-gray-600'
                          )}
                        >
                          <span
                            className={cn(
                              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                              enabled ? 'translate-x-6' : 'translate-x-1'
                            )}
                          />
                        </button>
                      </div>
                    </HiveCard>
                  ))}
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">Data & Analytics</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Control how your data is used to improve your HIVE experience
                    </p>
                  </div>

                  {Object.entries(settings.analytics).map(([setting, enabled]) => (
                    <HiveCard key={setting} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-[var(--hive-text-primary)] mb-1">
                            {setting === 'trackActivity' && 'Activity Tracking'}
                            {setting === 'shareUsageStats' && 'Share Usage Statistics'}
                            {setting === 'allowTargetedSuggestions' && 'Targeted Suggestions'}
                          </h4>
                          <p className="text-sm text-gray-400 mb-2">
                            {setting === 'trackActivity' && 'Track your activity to provide insights and analytics'}
                            {setting === 'shareUsageStats' && 'Share anonymized usage data to help improve HIVE'}
                            {setting === 'allowTargetedSuggestions' && 'Use your activity to suggest relevant spaces and tools'}
                          </p>
                          {setting === 'shareUsageStats' && (
                            <div className="flex items-center gap-1 text-xs text-blue-400">
                              <Info className="h-3 w-3" />
                              <span>Data is always anonymized and never shared with third parties</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => updateAnalytics(setting as any, !enabled)}
                          className={cn(
                            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4',
                            enabled ? 'bg-[var(--hive-brand-secondary)]' : 'bg-gray-600'
                          )}
                        >
                          <span
                            className={cn(
                              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                              enabled ? 'translate-x-6' : 'translate-x-1'
                            )}
                          />
                        </button>
                      </div>
                    </HiveCard>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--hive-border-default)] p-6 flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Changes take effect immediately and sync across all your devices
          </div>
          <div className="flex gap-3">
            <HiveButton variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </HiveButton>
            <HiveButton onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </HiveButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedPrivacyModal;