import type { Meta, StoryObj } from '@storybook/react';
import { Switch, SwitchGroup, SwitchCard, SwitchPresets } from '../../atomic/atoms/switch-enhanced';
import { useState } from 'react';
import { Bell, Shield, Eye, EyeOff, Wifi, Bluetooth, Volume2, VolumeX, Moon, Sun, Zap, Users, BookOpen, Calendar } from 'lucide-react';

const meta: Meta<typeof Switch> = {
  title: '01-Atoms/Switch Enhanced',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE enhanced switch component with labels, descriptions, validation states, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Switch size',
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'Switch variant',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Label position',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show icons in thumb',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Default switch',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Enable notifications',
    description: 'Receive updates about new tools and campus events',
  },
};

export const WithIcons: Story = {
  args: {
    label: 'Dark mode',
    description: 'Toggle between light and dark themes',
    showIcons: true,
  },
};

// Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch size="sm" label="Small switch" />
      <Switch size="default" label="Default switch" />
      <Switch size="lg" label="Large switch" />
      <Switch size="xl" label="Extra large switch" />
    </div>
  ),
};

// Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch variant="default" label="Default variant" checked />
      <Switch variant="success" label="Success variant" checked />
      <Switch variant="error" label="Error variant" checked />
      <Switch variant="warning" label="Warning variant" checked />
      <Switch variant="info" label="Info variant" checked />
    </div>
  ),
};

// States
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Unchecked" />
      <Switch label="Checked" checked />
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled checked />
      <Switch label="With error" error="This setting is required" />
    </div>
  ),
};

// Label positions
export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch 
        label="Label on right (default)" 
        description="This is the default label position"
        labelPosition="right"
      />
      <Switch 
        label="Label on left" 
        description="Label appears before the switch"
        labelPosition="left"
      />
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      ghostMode: false,
      autoJoinSpaces: true,
      shareSchedule: false,
      discoverableProfile: true,
      emailDigest: true,
      mobileNotifications: true,
      desktopNotifications: false,
      privateMessages: true,
      groupInvites: true,
    });

    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Privacy & Visibility</h3>
          <div className="space-y-4">
            <Switch
              label="Ghost Mode"
              description="Hide your online status and activity from other users"
              checked={settings.ghostMode}
              onCheckedChange={updateSetting('ghostMode')}
              variant={settings.ghostMode ? "warning" : "default"}
              showIcons
              checkedIcon={<EyeOff className="w-3 h-3" />}
              uncheckedIcon={<Eye className="w-3 h-3" />}
            />
            
            <Switch
              label="Discoverable Profile"
              description="Allow other students to find your profile in search results"
              checked={settings.discoverableProfile}
              onCheckedChange={updateSetting('discoverableProfile')}
              variant="success"
            />
            
            <Switch
              label="Share Class Schedule"
              description="Help classmates find study partners for shared courses"
              checked={settings.shareSchedule}
              onCheckedChange={updateSetting('shareSchedule')}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Campus Connections</h3>
          <div className="space-y-4">
            <Switch
              label="Auto-join Campus Spaces"
              description="Automatically join spaces for your dorm, major, and classes"
              checked={settings.autoJoinSpaces}
              onCheckedChange={updateSetting('autoJoinSpaces')}
              variant="success"
            />
            
            <Switch
              label="Accept Group Invitations"
              description="Allow other students to invite you to study groups"
              checked={settings.groupInvites}
              onCheckedChange={updateSetting('groupInvites')}
            />
            
            <Switch
              label="Private Message Requests"
              description="Allow students to send you direct messages"
              checked={settings.privateMessages}
              onCheckedChange={updateSetting('privateMessages')}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Notifications</h3>
          <div className="space-y-4">
            <Switch
              label="Push Notifications"
              description="Receive notifications on your devices"
              checked={settings.notifications}
              onCheckedChange={updateSetting('notifications')}
              showIcons
              checkedIcon={<Bell className="w-3 h-3" />}
              uncheckedIcon={<Bell className="w-3 h-3 opacity-50" />}
            />
            
            <Switch
              label="Email Digest"
              description="Weekly summary of campus activity and new tools"
              checked={settings.emailDigest}
              onCheckedChange={updateSetting('emailDigest')}
              disabled={!settings.notifications}
            />
            
            <Switch
              label="Mobile Notifications"
              description="Show notifications on your phone"
              checked={settings.mobileNotifications}
              onCheckedChange={updateSetting('mobileNotifications')}
              disabled={!settings.notifications}
            />
            
            <Switch
              label="Desktop Notifications"
              description="Show notifications on your computer"
              checked={settings.desktopNotifications}
              onCheckedChange={updateSetting('desktopNotifications')}
              disabled={!settings.notifications}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Switch groups
export const SwitchGroups: Story = {
  render: () => {
    const [privacy, setPrivacy] = useState({
      profileVisible: true,
      statusVisible: false,
      scheduleVisible: true,
    });

    const [features, setFeatures] = useState({
      autoSave: true,
      syncCalendar: false,
      betaFeatures: false,
    });

    return (
      <div className="space-y-8 p-6 bg-hive-background-primary max-w-2xl">
        <SwitchGroup
          label="Privacy Settings"
          description="Control what information is visible to other students"
          orientation="vertical"
          spacing="md"
        >
          <Switch
            label="Profile Visibility"
            description="Show your profile to other students"
            checked={privacy.profileVisible}
            onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, profileVisible: checked }))}
          />
          <Switch
            label="Online Status"
            description="Show when you're online"
            checked={privacy.statusVisible}
            onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, statusVisible: checked }))}
          />
          <Switch
            label="Schedule Sharing"
            description="Allow classmates to see your course schedule"
            checked={privacy.scheduleVisible}
            onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, scheduleVisible: checked }))}
          />
        </SwitchGroup>

        <SwitchGroup
          label="Feature Preferences"
          description="Customize your HIVE experience"
          orientation="vertical"
          spacing="md"
        >
          <Switch
            label="Auto-save Changes"
            description="Automatically save your work"
            checked={features.autoSave}
            onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, autoSave: checked }))}
            size="sm"
          />
          <Switch
            label="Calendar Sync"
            description="Sync with your university calendar"
            checked={features.syncCalendar}
            onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, syncCalendar: checked }))}
            size="sm"
          />
          <Switch
            label="Beta Features"
            description="Get early access to new features"
            checked={features.betaFeatures}
            onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, betaFeatures: checked }))}
            variant="info"
            size="sm"
          />
        </SwitchGroup>

        <SwitchGroup
          label="Quick Settings"
          description="Commonly used toggles"
          orientation="horizontal"
          spacing="lg"
        >
          <Switch label="WiFi" size="sm" showIcons checkedIcon={<Wifi className="w-2 h-2" />} />
          <Switch label="Bluetooth" size="sm" showIcons checkedIcon={<Bluetooth className="w-2 h-2" />} />
          <Switch label="Sound" size="sm" showIcons checkedIcon={<Volume2 className="w-2 h-2" />} uncheckedIcon={<VolumeX className="w-2 h-2" />} />
        </SwitchGroup>
      </div>
    );
  },
};

// Switch cards
export const SwitchCards: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      darkMode: false,
      notifications: true,
      privateProfile: false,
      autoJoin: true,
      syncCalendar: false,
      betaAccess: false,
    });

    const updatePreference = (key: keyof typeof preferences) => (checked: boolean) => {
      setPreferences(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="space-y-6 p-6 bg-hive-background-primary max-w-2xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Appearance & Interface</h3>
          <div className="space-y-3">
            <SwitchCard
              icon={preferences.darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              label="Dark Mode"
              description="Switch between light and dark themes for better comfort"
              checked={preferences.darkMode}
              onCheckedChange={updatePreference('darkMode')}
              showIcons
              badge={<span className="text-xs bg-hive-gold text-hive-background-primary px-2 py-1 rounded">New</span>}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Communication</h3>
          <div className="space-y-3">
            <SwitchCard
              icon={<Bell className="w-5 h-5" />}
              label="Push Notifications"
              description="Get notified about new messages, tool updates, and campus events"
              checked={preferences.notifications}
              onCheckedChange={updatePreference('notifications')}
            />
            
            <SwitchCard
              icon={<Shield className="w-5 h-5" />}
              label="Private Profile"
              description="Hide your profile from search results and public discovery"
              checked={preferences.privateProfile}
              onCheckedChange={updatePreference('privateProfile')}
              variant={preferences.privateProfile ? "warning" : "default"}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Campus Integration</h3>
          <div className="space-y-3">
            <SwitchCard
              icon={<Users className="w-5 h-5" />}
              label="Auto-join Campus Spaces"
              description="Automatically join spaces for your dorm, major, and enrolled courses"
              checked={preferences.autoJoin}
              onCheckedChange={updatePreference('autoJoin')}
              variant="success"
            />
            
            <SwitchCard
              icon={<Calendar className="w-5 h-5" />}
              label="Calendar Synchronization"
              description="Sync your class schedule with HIVE's calendar integration"
              checked={preferences.syncCalendar}
              onCheckedChange={updatePreference('syncCalendar')}
              badge={<span className="text-xs bg-hive-sapphire text-white px-2 py-1 rounded">Premium</span>}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Developer Features</h3>
          <div className="space-y-3">
            <SwitchCard
              icon={<Zap className="w-5 h-5" />}
              label="Beta Access"
              description="Get early access to experimental features and new tools"
              checked={preferences.betaAccess}
              onCheckedChange={updatePreference('betaAccess')}
              variant="info"
              badge={<span className="text-xs bg-hive-ruby text-white px-2 py-1 rounded">Beta</span>}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Preset components
export const PresetComponents: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: false,
      darkMode: true,
      privacy: false,
      autoSave: true,
    });

    return (
      <div className="space-y-6 p-6 bg-hive-background-primary max-w-md">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Common Patterns</h3>
          <div className="space-y-4">
            <SwitchPresets.Notifications
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
            />
            
            <SwitchPresets.DarkMode
              checked={settings.darkMode}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
            />
            
            <SwitchPresets.Privacy
              checked={settings.privacy}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, privacy: checked }))}
            />
            
            <SwitchPresets.AutoSave
              checked={settings.autoSave}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoSave: checked }))}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      masterToggle: false,
      notifications: false,
      emailDigest: false,
      mobileAlerts: false,
      desktopAlerts: false,
      privacy: false,
      ghostMode: false,
      profileVisible: true,
      scheduleSharing: false,
      features: false,
      autoSave: true,
      betaFeatures: false,
      syncCalendar: false,
    });

    const updateSetting = (key: keyof typeof settings) => (checked: boolean) => {
      if (key === 'masterToggle') {
        // Master toggle controls all sub-settings
        const newState = Object.keys(settings).reduce((acc, settingKey) => {
          acc[settingKey as keyof typeof settings] = checked;
          return acc;
        }, {} as typeof settings);
        setSettings(newState);
      } else {
        setSettings(prev => ({ ...prev, [key]: checked }));
      }
    };

    const activeCount = Object.values(settings).filter(Boolean).length;
    const totalCount = Object.keys(settings).length;

    return (
      <div className="p-6 bg-hive-background-primary max-w-2xl">
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-2">Campus Settings</h2>
            <p className="text-hive-text-secondary">Customize your HIVE experience</p>
            <div className="mt-4 p-4 bg-hive-surface-elevated rounded-lg">
              <p className="text-sm text-hive-text-secondary">
                {activeCount} of {totalCount} settings enabled
              </p>
              <div className="w-full bg-hive-background-tertiary rounded-full h-2 mt-2">
                <div 
                  className="bg-hive-gold h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(activeCount / totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <SwitchCard
            icon={<Zap className="w-6 h-6" />}
            label="Master Toggle"
            description="Enable or disable all HIVE features at once"
            checked={settings.masterToggle}
            onCheckedChange={updateSetting('masterToggle')}
            variant={settings.masterToggle ? "success" : "default"}
            size="lg"
            badge={<span className="text-xs bg-hive-gold text-hive-background-primary px-2 py-1 rounded font-medium">Master</span>}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Notifications</h3>
              <div className="space-y-3">
                <Switch
                  label="Push Notifications"
                  description="Receive real-time updates"
                  checked={settings.notifications}
                  onCheckedChange={updateSetting('notifications')}
                  showIcons
                  checkedIcon={<Bell className="w-3 h-3" />}
                />
                <Switch
                  label="Email Digest"
                  description="Weekly email summaries"
                  checked={settings.emailDigest}
                  onCheckedChange={updateSetting('emailDigest')}
                  disabled={!settings.notifications}
                  size="sm"
                />
                <Switch
                  label="Mobile Alerts"
                  description="Phone notifications"
                  checked={settings.mobileAlerts}
                  onCheckedChange={updateSetting('mobileAlerts')}
                  disabled={!settings.notifications}
                  size="sm"
                />
                <Switch
                  label="Desktop Alerts"
                  description="Computer notifications"
                  checked={settings.desktopAlerts}
                  onCheckedChange={updateSetting('desktopAlerts')}
                  disabled={!settings.notifications}
                  size="sm"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Privacy</h3>
              <div className="space-y-3">
                <Switch
                  label="Privacy Mode"
                  description="Enhanced privacy protection"
                  checked={settings.privacy}
                  onCheckedChange={updateSetting('privacy')}
                  variant={settings.privacy ? "warning" : "default"}
                />
                <Switch
                  label="Ghost Mode"
                  description="Hide online status"
                  checked={settings.ghostMode}
                  onCheckedChange={updateSetting('ghostMode')}
                  disabled={!settings.privacy}
                  showIcons
                  checkedIcon={<EyeOff className="w-3 h-3" />}
                  uncheckedIcon={<Eye className="w-3 h-3" />}
                  size="sm"
                />
                <Switch
                  label="Profile Visibility"
                  description="Show profile to others"
                  checked={settings.profileVisible}
                  onCheckedChange={updateSetting('profileVisible')}
                  disabled={settings.privacy}
                  size="sm"
                />
                <Switch
                  label="Schedule Sharing"
                  description="Share class schedule"
                  checked={settings.scheduleSharing}
                  onCheckedChange={updateSetting('scheduleSharing')}
                  disabled={settings.privacy}
                  size="sm"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Advanced Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Switch
                label="Auto-save"
                description="Save automatically"
                checked={settings.autoSave}
                onCheckedChange={updateSetting('autoSave')}
                size="sm"
                variant="success"
              />
              <Switch
                label="Beta Features"
                description="Experimental features"
                checked={settings.betaFeatures}
                onCheckedChange={updateSetting('betaFeatures')}
                size="sm"
                variant="info"
              />
              <Switch
                label="Calendar Sync"
                description="Sync with calendar"
                checked={settings.syncCalendar}
                onCheckedChange={updateSetting('syncCalendar')}
                size="sm"
                variant="brand"
              />
            </div>
          </div>

          <div className="text-center text-sm text-hive-text-mutedLight">
            Changes are saved automatically • Last updated just now
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Switch - Use controls to customize →',
    description: 'This switch responds to the controls panel',
    showIcons: true,
  },
};