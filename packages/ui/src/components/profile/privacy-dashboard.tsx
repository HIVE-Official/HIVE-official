'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  Globe,
  Users,
  UserX,
  Clock,
  Bell,
  BellOff,
  MapPin,
  Calendar,
  Activity,
  MessageSquare,
  Search,
  Settings,
  AlertTriangle,
  CheckCircle,
  Info,
  ChevronRight,
  ChevronDown,
  ToggleLeft,
  ToggleRight,
  Smartphone,
  Monitor,
  Wifi,
  Database
} from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { Badge } from '../../ui/badge';
import { Switch } from '../../atomic/atoms/switch-enhanced';
import { cn } from '../lib/utils';

// Privacy Settings Types
export interface PrivacySettings {
  ghostMode: {
    enabled: boolean;
    scheduledPrivacy: ScheduledPrivacy[];
    exceptions: PrivacyException[];
    partialVisibility: {
      showInMemberLists: boolean;
      showInSearchResults: boolean;
      showActivityStatus: boolean;
      showLastSeen: boolean;
    };
  };
  socialBoundaries: {
    studyMode: boolean;
    officeHours: OfficeHours[];
    socialEnergyLevel: 'low' | 'medium' | 'high';
    coordinationPreferences: {
      preferredContactMethods: ContactMethod[];
      responseTimeExpectation: 'immediate' | 'hourly' | 'daily' | 'weekly';
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

interface ScheduledPrivacy {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  days: string[];
  privacyLevel: 'ghost' | 'minimal' | 'normal';
}

interface PrivacyException {
  id: string;
  type: 'space' | 'user' | 'emergency';
  target: string;
  permissions: string[];
}

interface OfficeHours {
  start: string;
  end: string;
  days: string[];
}

type ContactMethod = 'hive-message' | 'email' | 'phone' | 'in-person';

interface PrivacyDashboardProps {
  settings: PrivacySettings;
  onSettingsChange: (settings: PrivacySettings) => void;
  className?: string;
}

export const PrivacyDashboard: React.FC<PrivacyDashboardProps> = ({
  settings,
  onSettingsChange,
  className
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const updateSettings = (path: string, value: any) => {
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current: any = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    onSettingsChange(newSettings);
  };

  const getPrivacyScore = (): { score: number; level: string; color: string } => {
    let score = 0;
    let maxScore = 0;

    // Ghost mode settings (30%)
    maxScore += 30;
    if (settings.ghostMode.enabled) score += 15;
    if (settings.ghostMode.partialVisibility.showInMemberLists === false) score += 5;
    if (settings.ghostMode.partialVisibility.showInSearchResults === false) score += 5;
    if (settings.ghostMode.partialVisibility.showActivityStatus === false) score += 3;
    if (settings.ghostMode.partialVisibility.showLastSeen === false) score += 2;

    // Social boundaries (30%)
    maxScore += 30;
    if (settings.socialBoundaries.studyMode) score += 10;
    if (settings.socialBoundaries.officeHours.length > 0) score += 10;
    if (settings.socialBoundaries.socialEnergyLevel === 'low') score += 5;
    if (settings.socialBoundaries.coordinationPreferences.responseTimeExpectation !== 'immediate') score += 5;

    // Data control (40%)
    maxScore += 40;
    if (!settings.dataControl.activitySharing.shareSpaceActivity) score += 10;
    if (!settings.dataControl.activitySharing.shareCalendarBusy) score += 8;
    if (!settings.dataControl.activitySharing.shareLocationStatus) score += 10;
    if (!settings.dataControl.activitySharing.shareToolUsage) score += 6;
    if (!settings.dataControl.crossCommunityVisibility) score += 3;
    if (!settings.dataControl.searchableProfile) score += 3;

    const percentage = Math.round((score / maxScore) * 100);
    
    let level = 'Open';
    let color = 'text-red-500';
    
    if (percentage >= 80) {
      level = 'Private';
      color = 'text-green-500';
    } else if (percentage >= 60) {
      level = 'Balanced';
      color = 'text-yellow-500';
    } else if (percentage >= 40) {
      level = 'Social';
      color = 'text-blue-500';
    }

    return { score: percentage, level, color };
  };

  const privacyScore = getPrivacyScore();

  const sections = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'ghost-mode', label: 'Ghost Mode', icon: EyeOff },
    { id: 'social-boundaries', label: 'Social Boundaries', icon: Users },
    { id: 'data-control', label: 'Data Control', icon: Database },
    { id: 'emergency', label: 'Emergency Access', icon: AlertTriangle }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-hive-text-primary">Privacy Dashboard</h2>
          <p className="text-hive-text-secondary">
            Control your data sharing and visibility preferences
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-hive-text-secondary">Privacy Score</div>
            <div className={cn("text-lg font-bold", privacyScore.color)}>
              {privacyScore.score}% {privacyScore.level}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-hive-surface-elevated flex items-center justify-center">
            <Shield className={cn("h-6 w-6", privacyScore.color)} />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap",
              activeSection === section.id
                ? "bg-hive-gold text-hive-text-primary"
                : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"
            )}
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'overview' && (
            <OverviewSection 
              settings={settings} 
              privacyScore={privacyScore}
              onQuickToggle={(path, value) => updateSettings(path, value)}
            />
          )}
          
          {activeSection === 'ghost-mode' && (
            <GhostModeSection 
              settings={settings.ghostMode} 
              onUpdate={(newSettings) => updateSettings('ghostMode', newSettings)}
            />
          )}
          
          {activeSection === 'social-boundaries' && (
            <SocialBoundariesSection 
              settings={settings.socialBoundaries} 
              onUpdate={(newSettings) => updateSettings('socialBoundaries', newSettings)}
            />
          )}
          
          {activeSection === 'data-control' && (
            <DataControlSection 
              settings={settings.dataControl} 
              onUpdate={(newSettings) => updateSettings('dataControl', newSettings)}
            />
          )}
          
          {activeSection === 'emergency' && (
            <EmergencyAccessSection 
              settings={settings} 
              onUpdate={(path, value) => updateSettings(path, value)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Overview Section Component
const OverviewSection: React.FC<{
  settings: PrivacySettings;
  privacyScore: { score: number; level: string; color: string };
  onQuickToggle: (path: string, value: any) => void;
}> = ({ settings, privacyScore, onQuickToggle }) => {
  const quickToggles = [
    {
      id: 'ghost-mode',
      label: 'Ghost Mode',
      description: 'Hide from member lists and search',
      path: 'ghostMode.enabled',
      value: settings.ghostMode.enabled,
      icon: EyeOff
    },
    {
      id: 'study-mode',
      label: 'Study Mode',
      description: 'Limit notifications and interruptions',
      path: 'socialBoundaries.studyMode',
      value: settings.socialBoundaries.studyMode,
      icon: Clock
    },
    {
      id: 'activity-sharing',
      label: 'Activity Sharing',
      description: 'Share space and tool activity',
      path: 'dataControl.activitySharing.shareSpaceActivity',
      value: settings.dataControl.activitySharing.shareSpaceActivity,
      icon: Activity
    },
    {
      id: 'searchable',
      label: 'Searchable Profile',
      description: 'Allow others to find your profile',
      path: 'dataControl.searchableProfile',
      value: settings.dataControl.searchableProfile,
      icon: Search
    }
  ];

  return (
    <div className="space-y-6">
      {/* Privacy Score Card */}
      <HiveCard className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-hive-surface-elevated flex items-center justify-center">
            <div className="text-center">
              <div className={cn("text-2xl font-bold", privacyScore.color)}>
                {privacyScore.score}
              </div>
              <div className="text-xs text-hive-text-secondary">Score</div>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
              Privacy Level: <span className={privacyScore.color}>{privacyScore.level}</span>
            </h3>
            <p className="text-hive-text-secondary mb-3">
              Your current privacy settings provide {privacyScore.level.toLowerCase()} protection 
              of your personal information and activity.
            </p>
            <div className="flex items-center gap-4">
              <Badge variant={privacyScore.score >= 70 ? 'default' : 'secondary'}>
                {privacyScore.score >= 70 ? 'Protected' : 'Consider Adjusting'}
              </Badge>
              <HiveButton variant="outline" size="sm">
                <Info className="h-4 w-4 mr-2" />
                Privacy Tips
              </HiveButton>
            </div>
          </div>
        </div>
      </HiveCard>

      {/* Quick Toggles */}
      <HiveCard className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
          Quick Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickToggles.map((toggle) => (
            <div key={toggle.id} className="flex items-center justify-between p-4 bg-hive-background-primary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-hive-surface-elevated flex items-center justify-center">
                  <toggle.icon className="h-5 w-5 text-hive-text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-hive-text-primary">{toggle.label}</p>
                  <p className="text-sm text-hive-text-secondary">{toggle.description}</p>
                </div>
              </div>
              
              <Switch
                checked={toggle.value}
                onCheckedChange={(checked) => onQuickToggle(toggle.path, checked)}
              />
            </div>
          ))}
        </div>
      </HiveCard>

      {/* Privacy Recommendations */}
      <HiveCard className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
          Privacy Recommendations
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium text-hive-text-primary">Set Office Hours</p>
              <p className="text-sm text-hive-text-secondary">
                Define when you're available for collaboration to maintain work-life balance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium text-hive-text-primary">Review Data Sharing</p>
              <p className="text-sm text-hive-text-secondary">
                Some activity data is being shared. Consider limiting for increased privacy.
              </p>
            </div>
          </div>
        </div>
      </HiveCard>
    </div>
  );
};

// Ghost Mode Section Component  
const GhostModeSection: React.FC<{
  settings: PrivacySettings['ghostMode'];
  onUpdate: (settings: PrivacySettings['ghostMode']) => void;
}> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <HiveCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
              Ghost Mode
            </h3>
            <p className="text-hive-text-secondary">
              Control your visibility across the HIVE platform
            </p>
          </div>
          
          <Switch
            checked={settings.enabled}
            onCheckedChange={(enabled) => onUpdate({ ...settings, enabled })}
          />
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-hive-background-primary rounded-lg">
            <h4 className="font-medium text-hive-text-primary mb-3">Partial Visibility Options</h4>
            <div className="space-y-3">
              {Object.entries(settings.partialVisibility).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <label className="text-sm text-hive-text-secondary">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) => onUpdate({
                      ...settings,
                      partialVisibility: {
                        ...settings.partialVisibility,
                        [key]: checked
                      }
                    })}
                    disabled={!settings.enabled}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </HiveCard>
    </div>
  );
};

// Social Boundaries Section Component
const SocialBoundariesSection: React.FC<{
  settings: PrivacySettings['socialBoundaries'];
  onUpdate: (settings: PrivacySettings['socialBoundaries']) => void;
}> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <HiveCard className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
          Social Boundaries
        </h3>
        
        <div className="space-y-6">
          {/* Study Mode */}
          <div className="flex items-center justify-between p-4 bg-hive-background-primary rounded-lg">
            <div>
              <p className="font-medium text-hive-text-primary">Study Mode</p>
              <p className="text-sm text-hive-text-secondary">
                Minimize interruptions during focused work time
              </p>
            </div>
            <Switch
              checked={settings.studyMode}
              onCheckedChange={(studyMode) => onUpdate({ ...settings, studyMode })}
            />
          </div>

          {/* Social Energy Level */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-hive-text-primary">Social Energy Level</label>
            <div className="grid grid-cols-3 gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => onUpdate({ ...settings, socialEnergyLevel: level as any })}
                  className={cn(
                    "p-3 rounded-lg border text-sm font-medium transition-colors",
                    settings.socialEnergyLevel === level
                      ? "border-hive-gold bg-hive-gold/10 text-hive-text-primary"
                      : "border-hive-border-subtle text-hive-text-secondary hover:border-hive-gold/50"
                  )}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Response Time Expectation */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-hive-text-primary">Response Time Expectation</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {['immediate', 'hourly', 'daily', 'weekly'].map((time) => (
                <button
                  key={time}
                  onClick={() => onUpdate({ 
                    ...settings, 
                    coordinationPreferences: {
                      ...settings.coordinationPreferences,
                      responseTimeExpectation: time as any
                    }
                  })}
                  className={cn(
                    "p-3 rounded-lg border text-sm font-medium transition-colors",
                    settings.coordinationPreferences.responseTimeExpectation === time
                      ? "border-hive-gold bg-hive-gold/10 text-hive-text-primary"
                      : "border-hive-border-subtle text-hive-text-secondary hover:border-hive-gold/50"
                  )}
                >
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Availability */}
          <div className="flex items-center justify-between p-4 bg-hive-background-primary rounded-lg">
            <div>
              <p className="font-medium text-hive-text-primary">Available for Emergencies</p>
              <p className="text-sm text-hive-text-secondary">
                Allow urgent contact even during private time
              </p>
            </div>
            <Switch
              checked={settings.coordinationPreferences.availableForEmergencies}
              onCheckedChange={(availableForEmergencies) => onUpdate({ 
                ...settings,
                coordinationPreferences: {
                  ...settings.coordinationPreferences,
                  availableForEmergencies
                }
              })}
            />
          </div>
        </div>
      </HiveCard>
    </div>
  );
};

// Data Control Section Component
const DataControlSection: React.FC<{
  settings: PrivacySettings['dataControl'];
  onUpdate: (settings: PrivacySettings['dataControl']) => void;
}> = ({ settings, onUpdate }) => {
  const activitySharingOptions = [
    { key: 'shareSpaceActivity', label: 'Space Activity', description: 'Share when you join or leave spaces' },
    { key: 'shareCalendarBusy', label: 'Calendar Status', description: 'Show when you\'re busy or available' },
    { key: 'shareLocationStatus', label: 'Location Status', description: 'Share your campus location' },
    { key: 'shareToolUsage', label: 'Tool Usage', description: 'Share which tools you\'re using' }
  ];

  return (
    <div className="space-y-6">
      <HiveCard className="p-6">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">
          Data Control Settings
        </h3>
        
        <div className="space-y-6">
          {/* Activity Sharing */}
          <div className="space-y-4">
            <h4 className="font-medium text-hive-text-primary">Activity Sharing</h4>
            <div className="space-y-3">
              {activitySharingOptions.map((option) => (
                <div key={option.key} className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
                  <div>
                    <p className="font-medium text-hive-text-primary">{option.label}</p>
                    <p className="text-sm text-hive-text-secondary">{option.description}</p>
                  </div>
                  <Switch
                    checked={(settings.activitySharing as any)[option.key]}
                    onCheckedChange={(checked) => onUpdate({
                      ...settings,
                      activitySharing: {
                        ...settings.activitySharing,
                        [option.key]: checked
                      }
                    })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Profile Visibility */}
          <div className="space-y-4">
            <h4 className="font-medium text-hive-text-primary">Profile Visibility</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
                <div>
                  <p className="font-medium text-hive-text-primary">Cross-Community Visibility</p>
                  <p className="text-sm text-hive-text-secondary">
                    Allow users from other schools to see your profile
                  </p>
                </div>
                <Switch
                  checked={settings.crossCommunityVisibility}
                  onCheckedChange={(crossCommunityVisibility) => onUpdate({ 
                    ...settings, 
                    crossCommunityVisibility 
                  })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
                <div>
                  <p className="font-medium text-hive-text-primary">Searchable Profile</p>
                  <p className="text-sm text-hive-text-secondary">
                    Allow your profile to appear in search results
                  </p>
                </div>
                <Switch
                  checked={settings.searchableProfile}
                  onCheckedChange={(searchableProfile) => onUpdate({ 
                    ...settings, 
                    searchableProfile 
                  })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
                <div>
                  <p className="font-medium text-hive-text-primary">Analytics Opt-Out</p>
                  <p className="text-sm text-hive-text-secondary">
                    Exclude your data from platform analytics
                  </p>
                </div>
                <Switch
                  checked={settings.analyticsOptOut}
                  onCheckedChange={(analyticsOptOut) => onUpdate({ 
                    ...settings, 
                    analyticsOptOut 
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </HiveCard>
    </div>
  );
};

// Emergency Access Section Component
const EmergencyAccessSection: React.FC<{
  settings: PrivacySettings;
  onUpdate: (path: string, value: any) => void;
}> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <HiveCard className="p-6">
        <div className="flex items-start gap-3 mb-6">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
              Emergency Access Settings
            </h3>
            <p className="text-hive-text-secondary">
              Configure how others can reach you during emergencies, even when privacy settings are active.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <p className="font-medium text-hive-text-primary">Emergency Override</p>
              <Switch
                checked={settings.socialBoundaries.coordinationPreferences.availableForEmergencies}
                onCheckedChange={(checked) => 
                  onUpdate('socialBoundaries.coordinationPreferences.availableForEmergencies', checked)
                }
              />
            </div>
            <p className="text-sm text-hive-text-secondary">
              Allow designated contacts to bypass privacy settings during emergencies. 
              This ensures critical communication can reach you when needed.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-hive-text-primary">Emergency Contacts</h4>
            <div className="p-4 bg-hive-background-primary rounded-lg">
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-hive-text-secondary mx-auto mb-3" />
                <p className="text-hive-text-secondary mb-4">No emergency contacts configured</p>
                <HiveButton variant="outline" size="sm">
                  Add Emergency Contact
                </HiveButton>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-hive-text-primary">Emergency Scenarios</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-hive-text-primary">Campus security override</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-hive-text-primary">Academic emergency contact</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-hive-text-primary">Medical emergency notification</span>
              </div>
            </div>
          </div>
        </div>
      </HiveCard>
    </div>
  );
};

export default PrivacyDashboard;