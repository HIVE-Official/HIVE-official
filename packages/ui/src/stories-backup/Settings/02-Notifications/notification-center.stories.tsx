import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Settings/02-Notifications/NotificationCenter',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive notification preferences system with granular controls for push, email, and in-app notifications'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface NotificationSettings {
  push: {
    enabled: boolean;
    spaceActivity: boolean;
    directMessages: boolean;
    spaceInvites: boolean;
    eventReminders: boolean;
    toolUpdates: boolean;
    systemUpdates: boolean;
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  email: {
    enabled: boolean;
    digest: 'immediate' | 'hourly' | 'daily' | 'weekly' | 'never';
    spaceActivity: boolean;
    directMessages: boolean;
    spaceInvites: boolean;
    eventReminders: boolean;
    toolUpdates: boolean;
    systemUpdates: boolean;
    marketing: boolean;
  };
  browser: {
    enabled: boolean;
    spaceActivity: boolean;
    directMessages: boolean;
    spaceInvites: boolean;
    eventReminders: boolean;
    toolUpdates: boolean;
  };
  categories: {
    spaces: {
      newPosts: boolean;
      newMembers: boolean; 
      eventCreated: boolean;
      eventReminders: boolean;
      mentions: boolean;
    };
    social: {
      directMessages: boolean;
      connectionRequests: boolean;
      profileViews: boolean;
      spaceInvites: boolean;
    };
    tools: {
      toolShared: boolean;
      toolUpdated: boolean;
      collaborationRequests: boolean;
      usageStats: boolean;
    };
    system: {
      securityAlerts: boolean;
      maintenanceNotices: boolean;
      featureUpdates: boolean;
      policyChanges: boolean;
    };
  };
}

// Demo data
const INITIAL_SETTINGS: NotificationSettings = {
  push: {
    enabled: true,
    spaceActivity: true,
    directMessages: true,
    spaceInvites: true,
    eventReminders: true,
    toolUpdates: false,
    systemUpdates: true,
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '08:00'
    }
  },
  email: {
    enabled: true,
    digest: 'daily',
    spaceActivity: false,
    directMessages: true,
    spaceInvites: true,
    eventReminders: true,
    toolUpdates: true,
    systemUpdates: true,
    marketing: false
  },
  browser: {
    enabled: true,
    spaceActivity: true,
    directMessages: true,
    spaceInvites: true,
    eventReminders: true,
    toolUpdates: false
  },
  categories: {
    spaces: {
      newPosts: true,
      newMembers: true,
      eventCreated: true,
      eventReminders: true,
      mentions: true
    },
    social: {
      directMessages: true,
      connectionRequests: true,
      profileViews: false,
      spaceInvites: true
    },
    tools: {
      toolShared: true,
      toolUpdated: false,
      collaborationRequests: true,
      usageStats: false
    },
    system: {
      securityAlerts: true,
      maintenanceNotices: true,
      featureUpdates: true,
      policyChanges: true
    }
  }
};

// Notification Category Component
const NotificationCategory: React.FC<{
  title: string;
  description: string;
  icon: string;
  children: React.ReactNode;
  collapsible?: boolean;
}> = ({ title, description, icon, children, collapsible = false }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default overflow-hidden">
      <div 
        className={`p-6 border-b border-hive-border-default ${collapsible ? 'cursor-pointer hover:bg-hive-background-primary' : ''}`}
        onClick={collapsible ? () => setIsExpanded(!isExpanded) : undefined}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary rounded-xl flex items-center justify-center text-white text-xl">
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-hive-text-primary">{title}</h3>
              <p className="text-sm text-hive-text-secondary">{description}</p>
            </div>
          </div>
          {collapsible && (
            <svg 
              className={`w-5 h-5 text-hive-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      
      {(!collapsible || isExpanded) && (
        <div className="p-6">
          {children}
        </div>
      )}
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
  highlight?: boolean;
}> = ({ label, description, checked, onChange, disabled = false, highlight = false }) => {
  return (
    <div className={`flex items-start justify-between p-4 rounded-xl transition-colors ${
      highlight ? 'bg-blue-50 border border-blue-200' : 'bg-hive-background-primary'
    } ${disabled ? 'opacity-50' : ''}`}>
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

// Select Setting Component
const SelectSetting: React.FC<{
  label: string;
  description?: string;
  value: string;
  options: { value: string; label: string; description?: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
}> = ({ label, description, value, options, onChange, disabled = false }) => {
  return (
    <div className={`p-4 bg-hive-background-primary rounded-xl ${disabled ? 'opacity-50' : ''}`}>
      <div className="mb-3">
        <div className="font-medium text-hive-text-primary">{label}</div>
        {description && (
          <div className="text-sm text-hive-text-secondary mt-1">{description}</div>
        )}
      </div>
      
      <select
        value={value}
        onChange={(e) => !disabled && onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-3 border border-hive-border-default rounded-lg focus:border-hive-brand-primary focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20 disabled:cursor-not-allowed"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Show description for selected option */}
      {options.find(opt => opt.value === value)?.description && (
        <div className="text-sm text-hive-text-secondary mt-2">
          {options.find(opt => opt.value === value)?.description}
        </div>
      )}
    </div>
  );
};

// Time Range Setting Component
const TimeRangeSetting: React.FC<{
  label: string;
  description?: string;
  enabled: boolean;
  startTime: string;
  endTime: string;
  onEnabledChange: (enabled: boolean) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}> = ({ label, description, enabled, startTime, endTime, onEnabledChange, onStartTimeChange, onEndTimeChange }) => {
  return (
    <div className="p-4 bg-hive-background-primary rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-medium text-hive-text-primary">{label}</div>
          {description && (
            <div className="text-sm text-hive-text-secondary mt-1">{description}</div>
          )}
        </div>
        
        <button
          onClick={() => onEnabledChange(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-hive-brand-primary focus:ring-offset-2 ${
            enabled ? 'bg-hive-brand-primary' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
      
      {enabled && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-hive-text-primary mb-2">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
              className="w-full p-2 border border-hive-border-default rounded-lg focus:border-hive-brand-primary focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-hive-text-primary mb-2">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => onEndTimeChange(e.target.value)}
              className="w-full p-2 border border-hive-border-default rounded-lg focus:border-hive-brand-primary focus:outline-none focus:ring-2 focus:ring-hive-brand-primary/20"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Notification Preview Component
const NotificationPreview: React.FC<{
  type: 'push' | 'email' | 'browser';
  title: string;
  message: string;
  timestamp: string;
}> = ({ type, title, message, timestamp }) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'push': return '📱';
      case 'email': return '📧';
      case 'browser': return '🌐';
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'push': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'browser': return 'bg-purple-100 text-purple-800';
    }
  };

  return (
    <div className="p-4 bg-white border border-hive-border-default rounded-xl">
      <div className="flex items-start gap-3">
        <div className="text-xl">{getTypeIcon()}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-hive-text-primary">{title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
              {type}
            </span>
          </div>
          <p className="text-sm text-hive-text-secondary mb-2">{message}</p>
          <div className="text-xs text-hive-text-secondary">{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

// Main Notification Center Component
const NotificationCenter: React.FC = () => {
  const [settings, setSettings] = useState<NotificationSettings>(INITIAL_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSaving(false);
    setHasChanges(false);
    
    console.log('Notification settings saved:', settings);
  };

  const handleReset = () => {
    setSettings(INITIAL_SETTINGS);
    setHasChanges(false);
  };

  const emailDigestOptions = [
    { value: 'immediate', label: 'Immediate', description: 'Get notified right away' },
    { value: 'hourly', label: 'Hourly Digest', description: 'Summary of activity every hour' },
    { value: 'daily', label: 'Daily Digest', description: 'One email per day with all activity' },
    { value: 'weekly', label: 'Weekly Digest', description: 'Weekly summary every Monday' },
    { value: 'never', label: 'Never', description: 'No email notifications' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary">Notification Settings</h1>
          <p className="text-hive-text-secondary">Control when and how you receive notifications</p>
        </div>
        
        <div className="flex items-center gap-3">
          {hasChanges && (
            <div className="flex items-center gap-2 text-sm text-hive-status-warning">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Unsaved changes
            </div>
          )}
          
          <button
            onClick={handleReset}
            disabled={!hasChanges || isSaving}
            className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="px-4 py-2 bg-hive-brand-primary text-white rounded-lg hover:bg-hive-brand-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving && (
              <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            )}
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Notification Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Push Notifications */}
        <NotificationCategory
          title="Push Notifications"
          description="Mobile and desktop push notifications"
          icon="📱"
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Enable Push Notifications"
              description="Allow HIVE to send push notifications to your devices"
              checked={settings.push.enabled}
              onChange={(checked) => updateSetting('push.enabled', checked)}
              highlight
            />
            
            <ToggleSetting
              label="Space Activity"
              description="New posts, events, and member activity in your spaces"
              checked={settings.push.spaceActivity}
              onChange={(checked) => updateSetting('push.spaceActivity', checked)}
              disabled={!settings.push.enabled}
            />
            
            <ToggleSetting
              label="Direct Messages"
              description="When someone sends you a direct message"
              checked={settings.push.directMessages}
              onChange={(checked) => updateSetting('push.directMessages', checked)}
              disabled={!settings.push.enabled}
            />
            
            <ToggleSetting
              label="Space Invites"
              description="When you're invited to join a space"
              checked={settings.push.spaceInvites}
              onChange={(checked) => updateSetting('push.spaceInvites', checked)}
              disabled={!settings.push.enabled}
            />
            
            <ToggleSetting
              label="Event Reminders"
              description="Reminders for upcoming events you're attending"
              checked={settings.push.eventReminders}
              onChange={(checked) => updateSetting('push.eventReminders', checked)}
              disabled={!settings.push.enabled}
            />
            
            <TimeRangeSetting
              label="Quiet Hours"
              description="Don't send push notifications during these hours"
              enabled={settings.push.quietHours.enabled}
              startTime={settings.push.quietHours.start}
              endTime={settings.push.quietHours.end}
              onEnabledChange={(enabled) => updateSetting('push.quietHours.enabled', enabled)}
              onStartTimeChange={(time) => updateSetting('push.quietHours.start', time)}
              onEndTimeChange={(time) => updateSetting('push.quietHours.end', time)}
            />
          </div>
        </NotificationCategory>

        {/* Email Notifications */}
        <NotificationCategory
          title="Email Notifications"
          description="Email summaries and important updates"
          icon="📧"
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Enable Email Notifications"
              description="Allow HIVE to send emails to your inbox"
              checked={settings.email.enabled}
              onChange={(checked) => updateSetting('email.enabled', checked)}
              highlight
            />
            
            <SelectSetting
              label="Email Frequency"
              description="How often you'd like to receive email notifications"
              value={settings.email.digest}
              options={emailDigestOptions}
              onChange={(value) => updateSetting('email.digest', value)}
              disabled={!settings.email.enabled}
            />
            
            <ToggleSetting
              label="Direct Messages"
              description="Important messages from other users"
              checked={settings.email.directMessages}
              onChange={(checked) => updateSetting('email.directMessages', checked)}
              disabled={!settings.email.enabled}
            />
            
            <ToggleSetting
              label="Space Invites"
              description="When you're invited to join a space"
              checked={settings.email.spaceInvites}
              onChange={(checked) => updateSetting('email.spaceInvites', checked)}
              disabled={!settings.email.enabled}
            />
            
            <ToggleSetting
              label="Event Reminders"
              description="Reminders for important events"
              checked={settings.email.eventReminders}
              onChange={(checked) => updateSetting('email.eventReminders', checked)}
              disabled={!settings.email.enabled}
            />
            
            <ToggleSetting
              label="System Updates"
              description="Important platform updates and maintenance notices"
              checked={settings.email.systemUpdates}
              onChange={(checked) => updateSetting('email.systemUpdates', checked)}
              disabled={!settings.email.enabled}
            />
          </div>
        </NotificationCategory>

        {/* Browser Notifications */}
        <NotificationCategory
          title="Browser Notifications"
          description="In-browser notifications while using HIVE"
          icon="🌐"
        >
          <div className="space-y-4">
            <ToggleSetting
              label="Enable Browser Notifications"
              description="Show notifications in your browser while using HIVE"
              checked={settings.browser.enabled}
              onChange={(checked) => updateSetting('browser.enabled', checked)}
              highlight
            />
            
            <ToggleSetting
              label="Space Activity"
              description="Real-time activity in your spaces"
              checked={settings.browser.spaceActivity}
              onChange={(checked) => updateSetting('browser.spaceActivity', checked)}
              disabled={!settings.browser.enabled}
            />
            
            <ToggleSetting
              label="Direct Messages"
              description="Instant notification of new messages"
              checked={settings.browser.directMessages}
              onChange={(checked) => updateSetting('browser.directMessages', checked)}
              disabled={!settings.browser.enabled}
            />
            
            <ToggleSetting
              label="Event Reminders"
              description="Pop-up reminders for upcoming events"
              checked={settings.browser.eventReminders}
              onChange={(checked) => updateSetting('browser.eventReminders', checked)}
              disabled={!settings.browser.enabled}
            />
          </div>
        </NotificationCategory>
      </div>

      {/* Notification Categories */}
      <NotificationCategory
        title="Notification Categories"
        description="Fine-tune what types of activities trigger notifications"
        icon="🏷️"
        collapsible
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Spaces */}
          <div>
            <h4 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
              <span>🏠</span>
              Space Activity
            </h4>
            <div className="space-y-3">
              <ToggleSetting
                label="New Posts"
                description="When someone creates a new post in your spaces"
                checked={settings.categories.spaces.newPosts}
                onChange={(checked) => updateSetting('categories.spaces.newPosts', checked)}
              />
              <ToggleSetting
                label="New Members"
                description="When someone joins a space you're in"
                checked={settings.categories.spaces.newMembers}
                onChange={(checked) => updateSetting('categories.spaces.newMembers', checked)}
              />
              <ToggleSetting
                label="Events Created"
                description="When new events are created in your spaces"
                checked={settings.categories.spaces.eventCreated}
                onChange={(checked) => updateSetting('categories.spaces.eventCreated', checked)}
              />
              <ToggleSetting
                label="Mentions"
                description="When someone mentions you in a post or comment"
                checked={settings.categories.spaces.mentions}
                onChange={(checked) => updateSetting('categories.spaces.mentions', checked)}
              />
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
              <span>👥</span>
              Social Activity
            </h4>
            <div className="space-y-3">
              <ToggleSetting
                label="Direct Messages"
                description="Personal messages from other users"
                checked={settings.categories.social.directMessages}
                onChange={(checked) => updateSetting('categories.social.directMessages', checked)}
              />
              <ToggleSetting
                label="Connection Requests"
                description="When someone wants to connect with you"
                checked={settings.categories.social.connectionRequests}
                onChange={(checked) => updateSetting('categories.social.connectionRequests', checked)}
              />
              <ToggleSetting
                label="Profile Views"
                description="When someone views your profile (if visible)"
                checked={settings.categories.social.profileViews}
                onChange={(checked) => updateSetting('categories.social.profileViews', checked)}
              />
              <ToggleSetting
                label="Space Invites"
                description="Invitations to join new spaces"
                checked={settings.categories.social.spaceInvites}
                onChange={(checked) => updateSetting('categories.social.spaceInvites', checked)}
              />
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
              <span>🔧</span>
              Tool Activity
            </h4>
            <div className="space-y-3">
              <ToggleSetting
                label="Tool Shared"
                description="When someone shares a tool with you"
                checked={settings.categories.tools.toolShared}
                onChange={(checked) => updateSetting('categories.tools.toolShared', checked)}
              />
              <ToggleSetting
                label="Tool Updated"
                description="When tools you use are updated"
                checked={settings.categories.tools.toolUpdated}
                onChange={(checked) => updateSetting('categories.tools.toolUpdated', checked)}
              />
              <ToggleSetting
                label="Collaboration Requests"
                description="Invitations to collaborate on tools"
                checked={settings.categories.tools.collaborationRequests}
                onChange={(checked) => updateSetting('categories.tools.collaborationRequests', checked)}
              />
            </div>
          </div>

          {/* System */}
          <div>
            <h4 className="font-bold text-hive-text-primary mb-4 flex items-center gap-2">
              <span>⚙️</span>
              System Updates
            </h4>
            <div className="space-y-3">
              <ToggleSetting
                label="Security Alerts"
                description="Important security notifications (always enabled)"
                checked={settings.categories.system.securityAlerts}
                onChange={(checked) => updateSetting('categories.system.securityAlerts', checked)}
                disabled
              />
              <ToggleSetting
                label="Maintenance Notices"
                description="Scheduled maintenance and downtime alerts"
                checked={settings.categories.system.maintenanceNotices}
                onChange={(checked) => updateSetting('categories.system.maintenanceNotices', checked)}
              />
              <ToggleSetting
                label="Feature Updates"
                description="New features and platform improvements"
                checked={settings.categories.system.featureUpdates}
                onChange={(checked) => updateSetting('categories.system.featureUpdates', checked)}
              />
            </div>
          </div>
        </div>
      </NotificationCategory>

      {/* Preview Section */}
      <div className="bg-white rounded-2xl border border-hive-border-default p-6">
        <h3 className="text-xl font-bold text-hive-text-primary mb-6">Notification Previews</h3>
        <div className="space-y-4">
          <NotificationPreview
            type="push"
            title="New message from Alex Chen"
            message="Hey, are you free for the study session tomorrow?"
            timestamp="2 minutes ago"
          />
          <NotificationPreview
            type="email"
            title="Daily Digest - CS 220 Study Group"
            message="3 new posts, 1 upcoming event, 2 new members"
            timestamp="Today at 8:00 AM"
          />
          <NotificationPreview
            type="browser"
            title="Event Reminder"
            message="Algorithm workshop starts in 15 minutes"
            timestamp="Just now"
          />
        </div>
      </div>
    </div>
  );
};

export const BasicNotificationCenter: Story = {
  name: '🔔 Basic Notification Center',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto">
          <NotificationCenter />
        </div>
      </div>
    );
  }
};