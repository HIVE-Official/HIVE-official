import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Bell, Eye, EyeOff, Shield, Users, Calendar, MapPin, Smartphone, Mail, MessageSquare, Globe, Lock } from 'lucide-react';
import { Switch } from '../../../components/ui/switch';
import { Label } from '../../../components/ui/label';

// Create a component wrapper for the story
const SwitchToggleSystem = () => (
  <div className="p-6 space-y-8">
    <h2 className="text-2xl font-semibold">Switch & Toggle System</h2>
    <p className="text-muted-foreground">Campus preference and privacy control system</p>
  </div>
);

const meta: Meta<typeof SwitchToggleSystem> = {
  component: SwitchToggleSystem,
  title: '02-Atoms/Interactive-Elements/Switch & Toggle System',
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Switch & Toggle System

A comprehensive toggle control system designed for University at Buffalo students to manage preferences, privacy settings, and feature toggles across the HIVE platform. This system provides intuitive on/off controls for various campus-related settings.

## Campus Integration Features
- **Privacy Controls** - Manage visibility of profile information, activity, and social connections
- **Notification Management** - Control campus alerts, study group notifications, and social updates
- **Feature Toggles** - Enable/disable platform features based on academic and social preferences
- **Accessibility Options** - Toggle accessibility features and interface preferences

## Toggle Types
- **Privacy Switches** - Control information visibility and sharing preferences
- **Notification Switches** - Manage alert preferences and communication settings
- **Feature Switches** - Enable/disable platform functionality and integrations
- **Accessibility Switches** - Control screen reader, motion, and contrast preferences

## Interaction States
- **Active/Inactive** - Clear visual distinction between on and off states
- **Loading States** - Indicate when settings are being saved or processed
- **Disabled States** - Show when options are unavailable or restricted
- **Focus States** - Clear keyboard navigation and accessibility support

## Accessibility Standards
- **WCAG 2.1 AA Compliant** - Full keyboard navigation and screen reader support
- **Clear State Communication** - Visual and semantic indication of toggle states
- **Appropriate Labeling** - Descriptive labels that explain toggle functionality
- **Focus Management** - Proper focus indicators and tab order
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Toggle Settings Data
const campusToggleSettings = {
  privacy: [
    {
      id: 'profile-visibility',
      label: 'Public Profile',
      description: 'Allow other UB students to find and view your profile',
      icon: Eye,
      category: 'Profile Privacy',
      defaultOn: true,
      critical: false
    },
    {
      id: 'activity-sharing',
      label: 'Activity Sharing',
      description: 'Share your campus activity and space participation',
      icon: Users,
      category: 'Profile Privacy',
      defaultOn: false,
      critical: false
    },
    {
      id: 'location-sharing',
      label: 'Campus Location',
      description: 'Share your current campus location with friends',
      icon: MapPin,
      category: 'Profile Privacy',
      defaultOn: false,
      critical: true
    },
    {
      id: 'study-schedule',
      label: 'Study Schedule Visibility',
      description: 'Let study groups see your availability',
      icon: Calendar,
      category: 'Academic Privacy',
      defaultOn: true,
      critical: false
    }
  ],
  notifications: [
    {
      id: 'space-updates',
      label: 'Space Updates',
      description: 'New posts and activity in your joined spaces',
      icon: Bell,
      category: 'Social Notifications',
      defaultOn: true,
      critical: false
    },
    {
      id: 'study-reminders',
      label: 'Study Session Reminders',
      description: 'Notifications for upcoming study sessions',
      icon: Calendar,
      category: 'Academic Notifications',
      defaultOn: true,
      critical: false
    },
    {
      id: 'friend-requests',
      label: 'Connection Requests',
      description: 'When someone wants to connect with you',
      icon: Users,
      category: 'Social Notifications',
      defaultOn: true,
      critical: false
    },
    {
      id: 'mobile-push',
      label: 'Mobile Push Notifications',
      description: 'Send notifications to your mobile device',
      icon: Smartphone,
      category: 'Delivery Settings',
      defaultOn: false,
      critical: false
    },
    {
      id: 'email-digest',
      label: 'Daily Email Digest',
      description: 'Daily summary of campus activity to your UB email',
      icon: Mail,
      category: 'Delivery Settings',
      defaultOn: false,
      critical: false
    }
  ],
  features: [
    {
      id: 'smart-suggestions',
      label: 'Smart Suggestions',
      description: 'Get AI-powered suggestions for spaces and connections',
      icon: Globe,
      category: 'Intelligence Features',
      defaultOn: true,
      critical: false
    },
    {
      id: 'campus-integration',
      label: 'Campus System Integration',
      description: 'Sync with MyUB and other campus systems',
      icon: Shield,
      category: 'Platform Integration',
      defaultOn: false,
      critical: true
    },
    {
      id: 'real-time-chat',
      label: 'Real-time Chat',
      description: 'Enable instant messaging in spaces',
      icon: MessageSquare,
      category: 'Communication Features',
      defaultOn: true,
      critical: false
    },
    {
      id: 'advanced-search',
      label: 'Advanced Search',
      description: 'Enhanced search with filters and suggestions',
      icon: Users,
      category: 'Navigation Features',
      defaultOn: true,
      critical: false
    }
  ]
};

// Privacy Controls Story
export const PrivacyControls: Story = {
  render: () => {
    const [privacySettings, setPrivacySettings] = React.useState(
      campusToggleSettings.privacy.reduce((acc, setting) => ({
        ...acc,
        [setting.id]: setting.defaultOn
      }), {})
    );

    const handleToggle = (settingId: string) => {
      setPrivacySettings(prev => ({
        ...prev,
        [settingId]: !prev[settingId as keyof typeof prev]
      }));
    };

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Privacy Control System</h2>
          <p className="text-lg text-gray-600">Manage your privacy and visibility settings on campus</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {campusToggleSettings.privacy.map((setting: any) => {
            const IconComponent = setting.icon;
            const isEnabled = privacySettings[setting.id as keyof typeof privacySettings];
            
            return (
              <div key={setting.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      isEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <Label 
                        htmlFor={setting.id}
                        className="font-medium text-gray-900 cursor-pointer"
                      >
                        {setting.label}
                        {setting.critical && (
                          <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                            Sensitive
                          </span>
                        )}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                      <div className="text-xs text-gray-500 mt-2">
                        Category: {setting.category}
                      </div>
                    </div>
                  </div>
                  
                  <Switch
                    id={setting.id}
                    checked={isEnabled}
                    onCheckedChange={() => handleToggle(setting.id)}
                    className="shrink-0"
                  />
                </div>

                <div className={`text-xs px-3 py-2 rounded-lg ${
                  isEnabled 
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-gray-50 text-gray-600'
                }`}>
                  {isEnabled ? (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      Currently visible to other students
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <EyeOff className="h-3 w-3" />
                      Currently private
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

// Notification Settings Story
export const NotificationSettings: Story = {
  render: () => {
    const [notificationSettings, setNotificationSettings] = React.useState(
      campusToggleSettings.notifications.reduce((acc, setting) => ({
        ...acc,
        [setting.id]: setting.defaultOn
      }), {})
    );

    const handleToggle = (settingId: string) => {
      setNotificationSettings(prev => ({
        ...prev,
        [settingId]: !prev[settingId as keyof typeof prev]
      }));
    };

    const groupedSettings = campusToggleSettings.notifications.reduce((acc, setting) => {
      if (!acc[setting.category]) {
        acc[setting.category] = [];
      }
      acc[setting.category].push(setting);
      return acc;
    }, {} as Record<string, typeof campusToggleSettings.notifications>);

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notification Management</h2>
          <p className="text-lg text-gray-600">Control how and when you receive campus updates</p>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedSettings).map(([category, settings]) => (
            <div key={category} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                {category}
              </h3>
              
              <div className="space-y-4">
                {settings.map((setting: any) => {
                  const IconComponent = setting.icon;
                  const isEnabled = notificationSettings[setting.id as keyof typeof notificationSettings];
                  
                  return (
                    <div key={setting.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isEnabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <Label 
                            htmlFor={setting.id}
                            className="font-medium text-gray-900 cursor-pointer"
                          >
                            {setting.label}
                          </Label>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                      </div>
                      
                      <Switch
                        id={setting.id}
                        checked={isEnabled}
                        onCheckedChange={() => handleToggle(setting.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Notification Summary */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h4 className="font-semibold text-blue-900 mb-3">Notification Summary</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Enabled: </span>
              <span className="text-blue-700">
                {Object.values(notificationSettings).filter(Boolean).length} notifications
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-800">Disabled: </span>
              <span className="text-blue-700">
                {Object.values(notificationSettings).filter(v => !v).length} notifications
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

// Feature Toggles Story
export const FeatureToggles: Story = {
  render: () => {
    const [featureSettings, setFeatureSettings] = React.useState(
      campusToggleSettings.features.reduce((acc, setting) => ({
        ...acc,
        [setting.id]: setting.defaultOn
      }), {})
    );

    const handleToggle = (settingId: string) => {
      setFeatureSettings(prev => ({
        ...prev,
        [settingId]: !prev[settingId as keyof typeof prev]
      }));
    };

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Feature Toggles</h2>
          <p className="text-lg text-gray-600">Customize your HIVE experience with optional features</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {campusToggleSettings.features.map((setting: any) => {
            const IconComponent = setting.icon;
            const isEnabled = featureSettings[setting.id as keyof typeof featureSettings];
            
            return (
              <div key={setting.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${
                    isEnabled ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Label 
                        htmlFor={setting.id}
                        className="font-semibold text-gray-900 cursor-pointer"
                      >
                        {setting.label}
                        {setting.critical && (
                          <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                            Beta
                          </span>
                        )}
                      </Label>
                      <Switch
                        id={setting.id}
                        checked={isEnabled}
                        onCheckedChange={() => handleToggle(setting.id)}
                      />
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{setting.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        {setting.category}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        isEnabled 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {isEnabled ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                </div>

                {isEnabled && setting.critical && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-yellow-800 text-sm">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Beta Feature</span>
                    </div>
                    <p className="text-xs text-yellow-700 mt-1">
                      This feature is experimental and may impact performance or data privacy.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

// Switch States Showcase Story
export const SwitchStatesShowcase: Story = {
  render: () => {
    const [interactiveStates, setInteractiveStates] = React.useState({
      enabled: true,
      disabled: false,
      loading: true
    });

    const switchStates = [
      {
        state: 'Default Off',
        checked: false,
        disabled: false,
        description: 'Standard inactive switch state'
      },
      {
        state: 'Default On',
        checked: true,
        disabled: false,
        description: 'Standard active switch state'
      },
      {
        state: 'Disabled Off',
        checked: false,
        disabled: true,
        description: 'Inactive switch that cannot be toggled'
      },
      {
        state: 'Disabled On',
        checked: true,
        disabled: true,
        description: 'Active switch that cannot be toggled'
      }
    ];

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Switch States & Interactions</h2>
          <p className="text-lg text-gray-600">Complete overview of switch component states and behaviors</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Static States */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Switch States</h3>
            
            <div className="space-y-6">
              {switchStates.map((switchState, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{switchState.state}</div>
                    <div className="text-sm text-gray-600">{switchState.description}</div>
                  </div>
                  <Switch 
                    checked={switchState.checked}
                    disabled={switchState.disabled}
                    onCheckedChange={() => {}} // No-op for demo
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Interactive Demo</h3>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Label htmlFor="demo-enabled" className="font-medium text-gray-900">
                    Campus Notifications
                  </Label>
                  <Switch
                    id="demo-enabled"
                    checked={interactiveStates.enabled}
                    onCheckedChange={(checked: any) => setInteractiveStates(prev => ({ ...prev, enabled: checked }))}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Toggle to {interactiveStates.enabled ? 'disable' : 'enable'} campus activity notifications
                </p>
                <div className={`text-xs mt-2 px-2 py-1 rounded ${
                  interactiveStates.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  Status: {interactiveStates.enabled ? 'Receiving notifications' : 'Notifications disabled'}
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Label className="font-medium text-gray-900">
                    Beta Features
                  </Label>
                  <Switch
                    checked={interactiveStates.disabled}
                    disabled={true}
                    onCheckedChange={() => {}}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Beta features are currently unavailable during maintenance
                </p>
                <div className="text-xs mt-2 px-2 py-1 rounded bg-orange-100 text-orange-700">
                  Status: Temporarily disabled
                </div>
              </div>

              <div className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <Label className="font-medium text-gray-900">
                    Campus Integration
                  </Label>
                  <Switch
                    checked={interactiveStates.loading}
                    disabled={true}
                    onCheckedChange={() => {}}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Connecting to UB campus systems...
                </p>
                <div className="text-xs mt-2 px-2 py-1 rounded bg-blue-100 text-blue-700">
                  Status: Setting up connection
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-100">
          <h4 className="font-semibold text-teal-900 mb-2">Switch Component Features</h4>
          <ul className="text-sm text-teal-800 space-y-1">
            <li>• Clear visual distinction between on/off states with smooth animations</li>
            <li>• Full keyboard accessibility with proper focus indicators</li>
            <li>• Screen reader support with appropriate ARIA labels</li>
            <li>• Disabled states for settings that are temporarily unavailable</li>
          </ul>
        </div>
      </div>
    );
  }
};