import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Settings/03-Privacy/GhostMode',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Ghost Mode privacy system allowing complete invisibility with selective sharing controls for focused work and mental health'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface GhostModeSettings {
  enabled: boolean;
  mode: 'complete' | 'selective' | 'study-focused' | 'emergency-only';
  duration: 'until-disabled' | '1-hour' | '4-hours' | '8-hours' | '24-hours' | 'weekend';
  autoEnableSchedule?: {
    enabled: boolean;
    days: string[];
    startTime: string;
    endTime: string;
  };
  exceptions: {
    allowedUsers: string[];
    allowedSpaces: string[];
    emergencyContacts: string[];
  };
  customizations: {
    showOnlineStatus: boolean;
    showLastSeen: boolean;
    showActivity: boolean;
    allowSpaceInvites: boolean;
    allowDirectMessages: boolean;
    showInSearch: boolean;
    shareLocation: boolean;
  };
  studyMode: {
    blockNonAcademic: boolean;
    allowStudySpaces: boolean;
    quietNotifications: boolean;
    focusTimer: boolean;
  };
}

interface GhostModePreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  settings: Partial<GhostModeSettings>;
}

// Demo data
const INITIAL_GHOST_SETTINGS: GhostModeSettings = {
  enabled: false,
  mode: 'complete',
  duration: 'until-disabled',
  autoEnableSchedule: {
    enabled: false,
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    startTime: '22:00',
    endTime: '08:00'
  },
  exceptions: {
    allowedUsers: [],
    allowedSpaces: [],
    emergencyContacts: ['sarah.mom@email.com', 'roommate.alex@university.edu']
  },
  customizations: {
    showOnlineStatus: false,
    showLastSeen: false,
    showActivity: false,
    allowSpaceInvites: false,
    allowDirectMessages: false,
    showInSearch: false,
    shareLocation: false
  },
  studyMode: {
    blockNonAcademic: true,
    allowStudySpaces: true,
    quietNotifications: true,
    focusTimer: true
  }
};

const GHOST_MODE_PRESETS: GhostModePreset[] = [
  {
    id: 'complete',
    name: 'Complete Invisibility',
    description: 'Completely invisible to everyone. No one can see your activity, status, or contact you.',
    icon: '👻',
    settings: {
      mode: 'complete',
      customizations: {
        showOnlineStatus: false,
        showLastSeen: false,
        showActivity: false,
        allowSpaceInvites: false,
        allowDirectMessages: false,
        showInSearch: false,
        shareLocation: false
      }
    }
  },
  {
    id: 'selective',
    name: 'Selective Visibility',
    description: 'Choose specific people and spaces that can still see and contact you.',
    icon: '🎭',
    settings: {
      mode: 'selective',
      customizations: {
        showOnlineStatus: false,
        showLastSeen: false,
        showActivity: false,
        allowSpaceInvites: false,
        allowDirectMessages: true,
        showInSearch: false,
        shareLocation: false
      }
    }
  },
  {
    id: 'study-focused',
    name: 'Study Focus Mode',
    description: 'Block distractions while staying connected to academic spaces and study groups.',
    icon: '📚',
    settings: {
      mode: 'study-focused',
      customizations: {
        showOnlineStatus: true,
        showLastSeen: false,
        showActivity: false,
        allowSpaceInvites: false,
        allowDirectMessages: false,
        showInSearch: true,
        shareLocation: false
      },
      studyMode: {
        blockNonAcademic: true,
        allowStudySpaces: true,
        quietNotifications: true,
        focusTimer: true
      }
    }
  },
  {
    id: 'emergency-only',
    name: 'Emergency Contacts Only',
    description: 'Only emergency contacts can reach you. Perfect for mental health breaks.',
    icon: '🆘',
    settings: {
      mode: 'emergency-only',
      customizations: {
        showOnlineStatus: false,
        showLastSeen: false,
        showActivity: false,
        allowSpaceInvites: false,
        allowDirectMessages: false,
        showInSearch: false,
        shareLocation: false
      }
    }
  }
];

const DURATION_OPTIONS = [
  { value: 'until-disabled', label: 'Until I turn it off', description: 'Manual control' },
  { value: '1-hour', label: '1 Hour', description: 'Auto-disable in 1 hour' },
  { value: '4-hours', label: '4 Hours', description: 'Auto-disable in 4 hours' },
  { value: '8-hours', label: '8 Hours', description: 'Auto-disable in 8 hours' },
  { value: '24-hours', label: '24 Hours', description: 'Auto-disable tomorrow' },
  { value: 'weekend', label: 'Until Monday', description: 'Weekend break mode' }
];

// Ghost Mode Status Component
const GhostModeStatus: React.FC<{
  enabled: boolean;
  mode: string;
  timeRemaining?: string;
}> = ({ enabled, mode, timeRemaining }) => {
  if (!enabled) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div>
          <div className="font-medium text-green-800">Visible</div>
          <div className="text-sm text-green-600">Your normal privacy settings are active</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl">
      <div className="text-2xl">👻</div>
      <div className="flex-1">
        <div className="font-medium text-purple-800">Ghost Mode Active</div>
        <div className="text-sm text-purple-600 capitalize">
          {mode.replace('-', ' ')} mode
          {timeRemaining && ` • ${timeRemaining}`}
        </div>
      </div>
      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
    </div>
  );
};

// Ghost Mode Preset Component
const GhostModePreset: React.FC<{
  preset: GhostModePreset;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ preset, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
        isSelected
          ? 'border-hive-brand-primary bg-hive-brand-primary/5'
          : 'border-hive-border-default hover:border-hive-brand-primary hover:bg-hive-background-primary'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{preset.icon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-hive-text-primary mb-2">{preset.name}</h3>
          <p className="text-sm text-hive-text-secondary leading-relaxed">
            {preset.description}
          </p>
        </div>
        {isSelected && (
          <div className="text-hive-brand-primary">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
};

// Exception Management Component
const ExceptionManager: React.FC<{
  title: string;
  description: string;
  items: string[];
  onAdd: (item: string) => void;
  onRemove: (item: string) => void;
  placeholder: string;
  icon: string;
}> = ({ title, description, items, onAdd, onRemove, placeholder, icon }) => {
  const [newItem, setNewItem] = useState('');

  const handleAdd = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      onAdd(newItem.trim());
      setNewItem('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-xl">{icon}</span>
        <div>
          <h4 className="font-medium text-hive-text-primary">{title}</h4>
          <p className="text-sm text-hive-text-secondary">{description}</p>
        </div>
      </div>

      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item} className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
              <span className="text-hive-text-primary">{item}</span>
              <button
                onClick={() => onRemove(item)}
                className="text-hive-status-error hover:bg-red-100 p-1 rounded"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 p-3 border border-hive-border-default rounded-lg focus:border-hive-brand-primary focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20"
        />
        <button
          onClick={handleAdd}
          disabled={!newItem.trim() || items.includes(newItem.trim())}
          className="px-4 py-3 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>
    </div>
  );
};

// Toggle Setting Component
const ToggleSetting: React.FC<{
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}> = ({ label, description, checked, onChange, disabled = false }) => {
  return (
    <div className={`flex items-start justify-between p-4 bg-hive-background-primary rounded-xl ${disabled ? 'opacity-50' : ''}`}>
      <div className="flex-1">
        <div className="font-medium text-hive-text-primary">{label}</div>
        {description && (
          <div className="text-sm text-hive-text-secondary mt-1">{description}</div>
        )}
      </div>
      
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-hive-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed ${
          checked ? 'bg-hive-brand-primary' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

// Main Ghost Mode Component
const GhostMode: React.FC = () => {
  const [settings, setSettings] = useState<GhostModeSettings>(INITIAL_GHOST_SETTINGS);
  const [selectedPreset, setSelectedPreset] = useState<string>('complete');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const updateSetting = (path: string, value: any) => {
    const keys = path.split('.');
    setSettings(prev => {
      const newSettings = { ...prev };
      let current: any = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
    setHasChanges(true);
  };

  const applyPreset = (presetId: string) => {
    const preset = GHOST_MODE_PRESETS.find(p => p.id === presetId);
    if (preset) {
      setSettings(prev => ({
        ...prev,
        ...preset.settings
      }));
      setSelectedPreset(presetId);
      setHasChanges(true);
    }
  };

  const handleToggleGhostMode = () => {
    updateSetting('enabled', !settings.enabled);
  };

  const handleSave = async () => {
    // In real app, save to backend
    console.log('Ghost mode settings saved:', settings);
    setHasChanges(false);
  };

  const getTimeRemaining = () => {
    if (settings.duration === 'until-disabled') return null;
    // In real app, calculate actual remaining time
    return '2h 30m remaining';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-6xl">👻</div>
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary mb-2">Ghost Mode</h1>
          <p className="text-hive-text-secondary max-w-2xl mx-auto">
            Take control of your privacy and digital wellbeing. Ghost Mode lets you become invisible 
            when you need space to focus, study, or take care of your mental health.
          </p>
        </div>
      </div>

      {/* Current Status */}
      <GhostModeStatus
        enabled={settings.enabled}
        mode={settings.mode}
        timeRemaining={getTimeRemaining()}
      />

      {/* Quick Toggle */}
      <div className="bg-white rounded-2xl border border-hive-border-default p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-hive-text-primary mb-2">Ghost Mode</h3>
            <p className="text-hive-text-secondary">
              {settings.enabled ? 'You are currently invisible' : 'Click to become invisible'}
            </p>
          </div>
          
          <button
            onClick={handleToggleGhostMode}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              settings.enabled ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                settings.enabled ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {settings.enabled && (
        <>
          {/* Ghost Mode Presets */}
          <div className="bg-white rounded-2xl border border-hive-border-default p-6">
            <h3 className="text-xl font-bold text-hive-text-primary mb-6">Choose Your Ghost Mode</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GHOST_MODE_PRESETS.map((preset) => (
                <GhostModePreset
                  key={preset.id}
                  preset={preset}
                  isSelected={selectedPreset === preset.id}
                  onSelect={() => applyPreset(preset.id)}
                />
              ))}
            </div>
          </div>

          {/* Duration Settings */}
          <div className="bg-white rounded-2xl border border-hive-border-default p-6">
            <h3 className="text-xl font-bold text-hive-text-primary mb-6">Duration</h3>
            
            <div className="space-y-3">
              {DURATION_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateSetting('duration', option.value)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                    settings.duration === option.value
                      ? 'border-hive-brand-primary bg-hive-brand-primary/5'
                      : 'border-hive-border-default hover:border-hive-brand-primary'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-medium text-hive-text-primary">{option.label}</div>
                    <div className="text-sm text-hive-text-secondary">{option.description}</div>
                  </div>
                  {settings.duration === option.value && (
                    <div className="text-hive-brand-primary">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="bg-white rounded-2xl border border-hive-border-default overflow-hidden">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-6 border-b border-hive-border-default hover:bg-hive-background-primary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-xl font-bold text-hive-text-primary">Advanced Settings</h3>
                  <p className="text-hive-text-secondary">Customize exceptions and detailed privacy controls</p>
                </div>
                <svg 
                  className={`w-5 h-5 text-hive-text-secondary transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </button>

            {showAdvanced && (
              <div className="p-6 space-y-8">
                {/* Exception Management */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-hive-text-primary">Exceptions</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ExceptionManager
                      title="Allowed Users"
                      description="These users can still see and contact you"
                      items={settings.exceptions.allowedUsers}
                      onAdd={(user) => updateSetting('exceptions.allowedUsers', [...settings.exceptions.allowedUsers, user])}
                      onRemove={(user) => updateSetting('exceptions.allowedUsers', settings.exceptions.allowedUsers.filter(u => u !== user))}
                      placeholder="Enter username or email"
                      icon="👤"
                    />
                    
                    <ExceptionManager
                      title="Allowed Spaces"
                      description="Spaces where you remain visible and active"
                      items={settings.exceptions.allowedSpaces}
                      onAdd={(space) => updateSetting('exceptions.allowedSpaces', [...settings.exceptions.allowedSpaces, space])}
                      onRemove={(space) => updateSetting('exceptions.allowedSpaces', settings.exceptions.allowedSpaces.filter(s => s !== space))}
                      placeholder="Enter space name"
                      icon="🏠"
                    />
                  </div>
                  
                  <ExceptionManager
                    title="Emergency Contacts"
                    description="These contacts can always reach you, even in complete ghost mode"
                    items={settings.exceptions.emergencyContacts}
                    onAdd={(contact) => updateSetting('exceptions.emergencyContacts', [...settings.exceptions.emergencyContacts, contact])}
                    onRemove={(contact) => updateSetting('exceptions.emergencyContacts', settings.exceptions.emergencyContacts.filter(c => c !== contact))}
                    placeholder="Enter email address"
                    icon="🆘"
                  />
                </div>

                {/* Custom Privacy Controls */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-hive-text-primary">Privacy Customizations</h4>
                  
                  <div className="space-y-4">
                    <ToggleSetting
                      label="Show Online Status"
                      description="Let others see when you're actively using HIVE"
                      checked={settings.customizations.showOnlineStatus}
                      onChange={(checked) => updateSetting('customizations.showOnlineStatus', checked)}
                    />
                    
                    <ToggleSetting
                      label="Show Last Seen"
                      description="Display when you were last active"
                      checked={settings.customizations.showLastSeen}
                      onChange={(checked) => updateSetting('customizations.showLastSeen', checked)}
                    />
                    
                    <ToggleSetting
                      label="Show Activity"
                      description="Let others see your posts, comments, and interactions"
                      checked={settings.customizations.showActivity}
                      onChange={(checked) => updateSetting('customizations.showActivity', checked)}
                    />
                    
                    <ToggleSetting
                      label="Allow Space Invites"
                      description="Let others invite you to join spaces"
                      checked={settings.customizations.allowSpaceInvites}
                      onChange={(checked) => updateSetting('customizations.allowSpaceInvites', checked)}
                    />
                    
                    <ToggleSetting
                      label="Allow Direct Messages"
                      description="Let others send you direct messages"
                      checked={settings.customizations.allowDirectMessages}
                      onChange={(checked) => updateSetting('customizations.allowDirectMessages', checked)}
                    />
                    
                    <ToggleSetting
                      label="Show in Search"
                      description="Appear in user search results"
                      checked={settings.customizations.showInSearch}
                      onChange={(checked) => updateSetting('customizations.showInSearch', checked)}
                    />
                  </div>
                </div>

                {/* Study Mode Settings */}
                {settings.mode === 'study-focused' && (
                  <div className="space-y-6">
                    <h4 className="text-lg font-bold text-hive-text-primary flex items-center gap-2">
                      <span>📚</span>
                      Study Focus Settings
                    </h4>
                    
                    <div className="space-y-4">
                      <ToggleSetting
                        label="Block Non-Academic Spaces"
                        description="Hide notifications from social and entertainment spaces"
                        checked={settings.studyMode.blockNonAcademic}
                        onChange={(checked) => updateSetting('studyMode.blockNonAcademic', checked)}
                      />
                      
                      <ToggleSetting
                        label="Allow Study Spaces"
                        description="Stay connected to study groups and academic spaces"
                        checked={settings.studyMode.allowStudySpaces}
                        onChange={(checked) => updateSetting('studyMode.allowStudySpaces', checked)}
                      />
                      
                      <ToggleSetting
                        label="Quiet Notifications"
                        description="Reduce notification frequency and intensity"
                        checked={settings.studyMode.quietNotifications}
                        onChange={(checked) => updateSetting('studyMode.quietNotifications', checked)}
                      />
                      
                      <ToggleSetting
                        label="Focus Timer"
                        description="Track study sessions and break reminders"
                        checked={settings.studyMode.focusTimer}
                        onChange={(checked) => updateSetting('studyMode.focusTimer', checked)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {hasChanges && (
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="flex items-center gap-2 text-yellow-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                You have unsaved changes to your Ghost Mode settings
              </div>
              
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </>
      )}

      {/* Info Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-bold text-blue-800 mb-2">About Ghost Mode</h4>
            <div className="text-sm text-blue-700 space-y-2">
              <p>Ghost Mode is designed to support your mental health and academic success by giving you control over your digital presence.</p>
              <p>When active, your profile becomes invisible according to your chosen settings. Emergency contacts can always reach you for safety.</p>
              <p>Your academic progress and tool usage data remain private and are never affected by Ghost Mode settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BasicGhostMode: Story = {
  name: '👻 Basic Ghost Mode',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-4xl mx-auto">
          <GhostMode />
        </div>
      </div>
    );
  }
};