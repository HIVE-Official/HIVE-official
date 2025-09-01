'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Shield, Users, Clock, Settings, 
  Moon, Sun, Coffee, BookOpen, AlertTriangle,
  MoreHorizontal, ExternalLink
} from 'lucide-react';
import { BaseWidget } from '../bento-grid/base-widget';
import { BaseWidgetProps } from '../bento-grid/types';
import { HiveButton } from '../../hive-button';
import { HiveSwitch } from '../../hive-switch';
import { cn } from '../../lib/utils';

interface PrivacySettings {
  ghostMode: {
    enabled: boolean;
    scheduledPrivacy: Array<{
      start: string; // HH:MM format
      end: string;
      days: string[]; // ['monday', 'tuesday', etc.]
    }>;
    exceptions: string[]; // User IDs who can still see you
    partialVisibility: {
      showInMemberLists: boolean;
      showInSearchResults: boolean;
      showActivityStatus: boolean;
      showLastSeen: boolean;
    };
  };
  socialBoundaries: {
    studyMode: boolean;
    officeHours: Array<{
      start: string;
      end: string;
      days: string[];
    }>;
    socialEnergyLevel: 'low' | 'medium' | 'high';
    coordinationPreferences: {
      preferredContactMethods: string[];
      responseTimeExpectation: 'immediate' | 'hourly' | 'daily';
      availableForEmergencies: boolean;
    };
  };
  dataControl: {
    activitySharing: {
      shareSpaceActivity: boolean;
      shareCalendarBusy: boolean;
      shareLocationStatus: boolean;
      shareToolUsage: boolean;
    };
    crossCommunityVisibility: boolean;
    searchableProfile: boolean;
    analyticsOptOut: boolean;
  };
}

interface PrivacyControlWidgetProps extends BaseWidgetProps {
  privacySettings: PrivacySettings;
  isLoading?: boolean;
  onPrivacyChange: (settings: PrivacySettings) => void;
  onOpenFullSettings: () => void;
}

export const PrivacyControlWidget: React.FC<PrivacyControlWidgetProps> = ({
  privacySettings,
  isLoading = false,
  onPrivacyChange,
  onOpenFullSettings,
  ...baseProps
}) => {
  const [activeTab, setActiveTab] = useState<'status' | 'boundaries' | 'data'>('status');

  const updatePrivacySetting = (path: string, value: any) => {
    const newSettings = { ...privacySettings };
    const keys = path.split('.');
    let current = newSettings as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    onPrivacyChange(newSettings);
  };

  const toggleGhostMode = () => {
    updatePrivacySetting('ghostMode.enabled', !privacySettings.ghostMode.enabled);
  };

  const getSocialEnergyColor = (level: string) => {
    const colorMap = {
      low: 'text-red-400 bg-red-400/10',
      medium: 'text-yellow-400 bg-yellow-400/10',
      high: 'text-green-400 bg-green-400/10'
    };
    return colorMap[level as keyof typeof colorMap] || 'text-gray-400 bg-gray-400/10';
  };

  const getSocialEnergyEmoji = (level: string) => {
    const emojiMap = {
      low: '🔋',
      medium: '⚡',
      high: '🚀'
    };
    return emojiMap[level as keyof typeof emojiMap] || '📊';
  };

  const renderStatusTab = () => (
    <div className="space-y-4">
      {/* Ghost Mode Toggle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'p-2 rounded-full',
              privacySettings.ghostMode.enabled 
                ? 'bg-purple-400/10 text-purple-400' 
                : 'bg-gray-400/10 text-gray-400'
            )}>
              {privacySettings.ghostMode.enabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </div>
            <div>
              <h3 className="font-medium text-hive-text-primary">Ghost Mode</h3>
              <p className="text-xs text-hive-text-secondary">Become invisible across HIVE</p>
            </div>
          </div>
          <Switch
            checked={privacySettings.ghostMode.enabled}
            onCheckedChange={toggleGhostMode}
          />
        </div>

        {privacySettings.ghostMode.enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pl-12 space-y-2"
          >
            <div className="p-3 bg-purple-400/5 border border-purple-400/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">You're invisible</span>
              </div>
              <ul className="text-xs text-hive-text-secondary space-y-1">
                <li>• Hidden from member lists</li>
                <li>• Not visible in search results</li>
                <li>• Activity status private</li>
                <li>• Leaders can still see you for moderation</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* Current Status */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-hive-text-primary">Current Status</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-hive-surface-elevated/30 rounded-lg border border-hive-border-subtle/30">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium text-hive-text-primary">Visibility</span>
            </div>
            <p className="text-xs text-hive-text-secondary">
              {privacySettings.ghostMode.enabled ? 'Invisible' : 'Visible'}
            </p>
          </div>
          
          <div className="p-3 bg-hive-surface-elevated/30 rounded-lg border border-hive-border-subtle/30">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs font-medium text-hive-text-primary">Profile</span>
            </div>
            <p className="text-xs text-hive-text-secondary">
              {privacySettings.dataControl.searchableProfile ? 'Searchable' : 'Private'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBoundariesTab = () => (
    <div className="space-y-4">
      {/* Study Mode */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-full',
            privacySettings.socialBoundaries.studyMode 
              ? 'bg-blue-400/10 text-blue-400' 
              : 'bg-gray-400/10 text-gray-400'
          )}>
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-medium text-hive-text-primary">Study Mode</h4>
            <p className="text-xs text-hive-text-secondary">Reduce social notifications</p>
          </div>
        </div>
        <Switch
          checked={privacySettings.socialBoundaries.studyMode}
          onCheckedChange={(checked) => updatePrivacySetting('socialBoundaries.studyMode', checked)}
        />
      </div>

      {/* Social Energy Level */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-hive-text-primary">Social Energy</h4>
        <div className="grid grid-cols-3 gap-2">
          {(['low', 'medium', 'high'] as const).map((level) => (
            <button
              key={level}
              onClick={() => updatePrivacySetting('socialBoundaries.socialEnergyLevel', level)}
              className={cn(
                'p-3 rounded-lg border text-center transition-all',
                privacySettings.socialBoundaries.socialEnergyLevel === level
                  ? 'border-hive-gold bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]'
                  : 'border-hive-border-subtle bg-hive-surface-elevated/30 text-hive-text-secondary hover:border-hive-border-subtle/60'
              )}
            >
              <div className="text-lg mb-1">{getSocialEnergyEmoji(level)}</div>
              <div className="text-xs font-medium capitalize">{level}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Office Hours */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-hive-text-primary">Office Hours</h4>
          <Button size="sm" variant="ghost" className="text-xs">
            Configure
          </Button>
        </div>
        {privacySettings.socialBoundaries.officeHours.length > 0 ? (
          <div className="space-y-1">
            {privacySettings.socialBoundaries.officeHours.map((hours, index) => (
              <div key={index} className="text-xs text-hive-text-secondary flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{hours.start} - {hours.end}</span>
                <span className="text-hive-text-tertiary">
                  {hours.days.join(', ')}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-hive-text-secondary">Available anytime for coordination</p>
        )}
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-hive-text-primary">Data Sharing</h4>
      
      <div className="space-y-3">
        {[
          { key: 'shareSpaceActivity', label: 'Space Activity', description: 'Show your community participation' },
          { key: 'shareCalendarBusy', label: 'Calendar Status', description: 'Share when you\'re busy' },
          { key: 'shareLocationStatus', label: 'Location Status', description: 'Show campus location' },
          { key: 'shareToolUsage', label: 'Tool Usage', description: 'Share tool activity' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-hive-text-primary">{item.label}</p>
              <p className="text-xs text-hive-text-secondary">{item.description}</p>
            </div>
            <Switch
              checked={privacySettings.dataControl.activitySharing[item.key as keyof typeof privacySettings.dataControl.activitySharing]}
              onCheckedChange={(checked) => 
                updatePrivacySetting(`dataControl.activitySharing.${item.key}`, checked)
              }
            />
          </div>
        ))}
      </div>

      <div className="pt-3 border-t border-hive-border-subtle/30">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-hive-text-primary">Analytics</p>
            <p className="text-xs text-hive-text-secondary">Anonymous usage data</p>
          </div>
          <Switch
            checked={!privacySettings.dataControl.analyticsOptOut}
            onCheckedChange={(checked) => 
              updatePrivacySetting('dataControl.analyticsOptOut', !checked)
            }
          />
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'status', label: 'Status', icon: Eye },
    { id: 'boundaries', label: 'Boundaries', icon: Shield },
    { id: 'data', label: 'Data', icon: Settings }
  ];

  const widgetContent = (
    <div className="h-full flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold mx-auto mb-2" />
            <p className="text-sm text-hive-text-secondary">Loading privacy settings...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Tab Navigation */}
          <div className="flex border-b border-hive-border-subtle/30 mb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative',
                    activeTab === tab.id
                      ? 'text-[var(--hive-brand-secondary)]'
                      : 'text-hive-text-secondary hover:text-hive-text-primary'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:block">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="privacy-tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--hive-brand-secondary)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'status' && renderStatusTab()}
                {activeTab === 'boundaries' && renderBoundariesTab()}
                {activeTab === 'data' && renderDataTab()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-hive-border-subtle/30">
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenFullSettings}
              className="w-full gap-2"
            >
              <span>Advanced Settings</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <BaseWidget {...baseProps}>
      {widgetContent}
    </BaseWidget>
  );
};