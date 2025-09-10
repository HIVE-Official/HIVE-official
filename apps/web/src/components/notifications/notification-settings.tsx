'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  BellOff, 
  Clock, 
  Mail, 
  Smartphone, 
  Monitor,
  Users,
  Activity,
  Settings,
  Award,
  AlertTriangle,
  Check,
  X
} from 'lucide-react';
import { usePushNotifications } from '@/hooks/use-push-notifications';
import { useAuth } from '@/hooks/use-auth';
import { logger } from '@/lib/logger';

interface NotificationPreferences {
  enableInApp: boolean;
  enablePush: boolean;
  enableEmail: boolean;
  enableDesktop: boolean;
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  categorySettings: {
    social: { enabled: boolean; channels: string[]; priority: string };
    activity: { enabled: boolean; channels: string[]; priority: string };
    system: { enabled: boolean; channels: string[]; priority: string };
    achievement: { enabled: boolean; channels: string[]; priority: string };
    reminder: { enabled: boolean; channels: string[]; priority: string };
  };
}

const CATEGORY_INFO = {
  social: {
    icon: Users,
    label: 'Social',
    description: 'Comments, likes, mentions, and follows'
  },
  activity: {
    icon: Activity,
    label: 'Activity',
    description: 'Posts, events, and space updates'
  },
  system: {
    icon: Settings,
    label: 'System',
    description: 'Platform updates and announcements'
  },
  achievement: {
    icon: Award,
    label: 'Achievements',
    description: 'Milestones, badges, and accomplishments'
  },
  reminder: {
    icon: Clock,
    label: 'Reminders',
    description: 'Event reminders and important deadlines'
  }
};

export function NotificationSettings() {
  const { user } = useAuth();
  const { 
    isSupported, 
    isEnabled, 
    isLoading: pushLoading, 
    error: pushError,
    requestPermission, 
    disableNotifications,
    sendTestNotification 
  } = usePushNotifications();

  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load user preferences
  useEffect(() => {
    const loadPreferences = async () => {
      if (!user) return;

      try {
        const response = await fetch('/api/notifications/preferences');
        if (!response.ok) throw new Error('Failed to load preferences');

        const data = await response.json();
        setPreferences(data.preferences);
      } catch (error) {
        logger.error('Failed to load notification preferences', { error });
        setError('Failed to load notification settings');
      } finally {
        setIsLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  // Save preferences
  const savePreferences = async (newPreferences: NotificationPreferences) => {
    if (!user) return;

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences: newPreferences })
      });

      if (!response.ok) throw new Error('Failed to save preferences');

      setPreferences(newPreferences);
      setSuccessMessage('Notification settings saved successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);

    } catch (error) {
      logger.error('Failed to save notification preferences', { error });
      setError('Failed to save notification settings');
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle channel for category
  const toggleCategoryChannel = (category: keyof NotificationPreferences['categorySettings'], channel: string) => {
    if (!preferences) return;

    const currentChannels = preferences.categorySettings[category].channels;
    const newChannels = currentChannels.includes(channel)
      ? currentChannels.filter(c => c !== channel)
      : [...currentChannels, channel];

    const newPreferences = {
      ...preferences,
      categorySettings: {
        ...preferences.categorySettings,
        [category]: {
          ...preferences.categorySettings[category],
          channels: newChannels
        }
      }
    };

    savePreferences(newPreferences);
  };

  // Toggle category enabled
  const toggleCategory = (category: keyof NotificationPreferences['categorySettings']) => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      categorySettings: {
        ...preferences.categorySettings,
        [category]: {
          ...preferences.categorySettings[category],
          enabled: !preferences.categorySettings[category].enabled
        }
      }
    };

    savePreferences(newPreferences);
  };

  // Toggle main notification types
  const toggleNotificationType = (type: keyof Pick<NotificationPreferences, 'enableInApp' | 'enablePush' | 'enableEmail' | 'enableDesktop'>) => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      [type]: !preferences[type]
    };

    savePreferences(newPreferences);
  };

  // Toggle quiet hours
  const toggleQuietHours = () => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      quietHours: {
        ...preferences.quietHours,
        enabled: !preferences.quietHours?.enabled
      } as any
    };

    savePreferences(newPreferences);
  };

  // Update quiet hours time
  const updateQuietHours = (field: 'start' | 'end', value: string) => {
    if (!preferences) return;

    const newPreferences = {
      ...preferences,
      quietHours: {
        ...preferences.quietHours,
        [field]: value
      } as any
    };

    savePreferences(newPreferences);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!preferences) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center text-red-600">
          <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
          <p>Failed to load notification settings</p>
          {error && <p className="text-sm text-gray-500 mt-1">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-800">{successMessage}</p>
        </div>
      )}

      {(error || pushError) && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
          <X className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-800">{error || pushError}</p>
        </div>
      )}

      {/* Push Notification Setup */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Push Notifications
          </h3>
          <div className="flex items-center gap-2">
            {pushLoading && <div className="w-4 h-4 border-2 border-hive-primary border-t-transparent rounded-full animate-spin"></div>}
            <button
              onClick={sendTestNotification}
              disabled={!isEnabled || pushLoading}
              className="px-3 py-1 text-xs bg-hive-primary text-white rounded-md hover:bg-hive-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test
            </button>
          </div>
        </div>

        {!isSupported ? (
          <div className="text-center text-gray-500 py-4">
            <BellOff className="h-8 w-8 mx-auto mb-2" />
            <p>Push notifications are not supported in this browser</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Browser Notifications</p>
                  <p className="text-sm text-gray-600">Receive notifications on this device</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {isEnabled ? (
                  <button
                    onClick={disableNotifications}
                    disabled={pushLoading}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 disabled:opacity-50"
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    onClick={requestPermission}
                    disabled={pushLoading}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 disabled:opacity-50"
                  >
                    Enable
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Channels */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">In-App Notifications</p>
                <p className="text-sm text-gray-600">Show notifications within the HIVE app</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.enableInApp}
                onChange={() => toggleNotificationType('enableInApp')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hive-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Desktop Notifications</p>
                <p className="text-sm text-gray-600">Show browser notifications on desktop</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.enableDesktop}
                onChange={() => toggleNotificationType('enableDesktop')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hive-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Send important notifications via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.enableEmail}
                onChange={() => toggleNotificationType('enableEmail')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hive-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Quiet Hours
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Quiet Hours</p>
              <p className="text-sm text-gray-600">Pause non-urgent notifications during set hours</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.quietHours?.enabled || false}
                onChange={toggleQuietHours}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hive-primary"></div>
            </label>
          </div>

          {preferences.quietHours?.enabled && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={preferences.quietHours.start}
                  onChange={(e) => updateQuietHours('start', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input
                  type="time"
                  value={preferences.quietHours.end}
                  onChange={(e) => updateQuietHours('end', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hive-primary focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Category Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Categories</h3>
        
        <div className="space-y-6">
          {Object.entries(CATEGORY_INFO).map(([key, info]) => {
            const categoryKey = key as keyof NotificationPreferences['categorySettings'];
            const settings = preferences.categorySettings[categoryKey];
            const Icon = info.icon;

            return (
              <div key={key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{info.label}</p>
                      <p className="text-sm text-gray-600">{info.description}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.enabled}
                      onChange={() => toggleCategory(categoryKey)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-hive-primary"></div>
                  </label>
                </div>

                {settings.enabled && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Delivery Channels:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: 'in_app', label: 'In-App', enabled: preferences.enableInApp },
                        { key: 'push', label: 'Push', enabled: isEnabled },
                        { key: 'desktop', label: 'Desktop', enabled: preferences.enableDesktop },
                        { key: 'email', label: 'Email', enabled: preferences.enableEmail }
                      ].map((channel) => (
                        <button
                          key={channel.key}
                          onClick={() => channel.enabled && toggleCategoryChannel(categoryKey, channel.key)}
                          disabled={!channel.enabled}
                          className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            settings.channels.includes(channel.key)
                              ? 'bg-hive-primary text-white border-hive-primary'
                              : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                          } ${
                            !channel.enabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                          }`}
                        >
                          {channel.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Status */}
      {isSaving && (
        <div className="text-center text-gray-600">
          <div className="inline-flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-hive-primary border-t-transparent rounded-full animate-spin"></div>
            Saving preferences...
          </div>
        </div>
      )}
    </div>
  );
}