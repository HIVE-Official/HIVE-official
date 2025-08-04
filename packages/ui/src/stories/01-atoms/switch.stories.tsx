import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../atomic/atoms/switch';
import { useState } from 'react';
import { Bell, Eye, Shield, Wifi, Bluetooth, Moon, Sun, Volume2, VolumeX, Smartphone } from 'lucide-react';

const meta: Meta<typeof Switch> = {
  title: '01-Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE base switch component with semantic tokens, variants, and campus-specific functionality.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Switch size',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost'],
      description: 'Switch visual variant',
    },
    checked: {
      control: 'boolean',
      description: 'Switch state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    label: {
      control: 'text',
      description: 'Switch label',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Dark mode',
    description: 'Switch to dark theme for better viewing at night',
  },
};

export const Checked: Story = {
  args: {
    label: 'Feature enabled',
    description: 'This feature is currently active',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    description: 'This option is not available',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked',
    description: 'This option is enabled but cannot be changed',
    checked: true,
    disabled: true,
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Ghost variant',
    description: 'Minimal styling with transparent background',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <Switch
        size="sm"
        label="Small switch"
        description="Compact size for tight layouts"
      />
      
      <Switch
        size="md"
        label="Medium switch (default)"
        description="Standard size for most use cases"
      />
      
      <Switch
        size="lg"
        label="Large switch"
        description="Prominent size for important toggles"
      />
    </div>
  ),
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4 p-4 max-w-md">
      <Switch
        label="Unchecked"
        description="Default off state"
      />
      
      <Switch
        label="Checked"
        description="Active on state"
        checked
      />
      
      <Switch
        label="Disabled unchecked"
        description="Cannot be toggled"
        disabled
      />
      
      <Switch
        label="Disabled checked"
        description="Active but cannot be changed"
        checked
        disabled
      />
      
      <Switch
        variant="ghost"
        label="Ghost variant"
        description="Minimal transparent styling"
      />
      
      <Switch
        variant="ghost"
        label="Ghost checked"
        description="Ghost variant in active state"
        checked
      />
    </div>
  ),
};

// Campus switch scenarios
export const CampusSwitchScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Notification Preferences</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-hive-gold" />
                Push Notifications
              </h4>
              <div className="space-y-4 ml-7">
                <Switch
                  label="Study group invitations"
                  description="Get notified when you're invited to join a study group"
                  checked
                />
                
                <Switch
                  label="Assignment reminders"
                  description="Receive alerts about upcoming assignment deadlines"
                  checked
                />
                
                <Switch
                  label="Tool updates"
                  description="Get notified when tools you use receive updates"
                />
                
                <Switch
                  label="Social activity"
                  description="Notifications for likes, comments, and mentions"
                />
                
                <Switch
                  label="Marketing communications"
                  description="Promotional emails and feature announcements"
                  disabled
                />
              </div>
            </div>
            
            <div className="border-t border-hive-border-subtle pt-4">
              <h4 className="font-semibold text-hive-text-primary mb-4">Notification Timing</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Switch
                  size="sm"
                  label="Quiet hours (10 PM - 8 AM)"
                  description="Pause non-urgent notifications overnight"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Weekend notifications"
                  description="Continue receiving notifications on weekends"
                />
                
                <Switch
                  size="sm"
                  label="Exam period mode"
                  description="Reduce notifications during exam weeks"
                />
                
                <Switch
                  size="sm"
                  label="Instant delivery"
                  description="Receive notifications immediately vs. batched"
                  checked
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Privacy & Security Settings</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-hive-sapphire" />
                Profile Visibility
              </h4>
              <div className="space-y-4 ml-7">
                <Switch
                  label="Public profile"
                  description="Allow other students to discover and view your profile"
                  checked
                />
                
                <Switch
                  label="Show online status"
                  description="Let others see when you're actively using HIVE"
                />
                
                <Switch
                  label="Display study schedule"
                  description="Show your study times to help others find study partners"
                  checked
                />
                
                <Switch
                  label="Show academic progress"
                  description="Display completed courses and current GPA"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-hive-emerald" />
                Security Features
              </h4>
              <div className="space-y-4 ml-7">
                <Switch
                  label="Two-factor authentication"
                  description="Add an extra layer of security to your account"
                  checked
                />
                
                <Switch
                  label="Login notifications"
                  description="Get alerted when someone signs into your account"
                  checked
                />
                
                <Switch
                  label="Session timeout"
                  description="Automatically sign out after 30 minutes of inactivity"
                />
                
                <Switch
                  label="Data encryption"
                  description="Encrypt sensitive personal data"
                  checked
                  disabled
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Update Security Settings
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Tool Builder Preferences</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="mb-4">
            <h4 className="text-xl font-semibold text-hive-text-primary mb-2">Development Environment</h4>
            <p className="text-hive-text-secondary">Configure your tool building experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Editor Settings</h5>
              <div className="space-y-3">
                <Switch
                  size="sm"
                  label="Auto-save"
                  description="Automatically save changes every 30 seconds"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Syntax highlighting"
                  description="Color-code different parts of your code"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Line numbers"
                  description="Show line numbers in the code editor"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Auto-complete"
                  description="Suggest code completions as you type"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Error highlighting"
                  description="Highlight syntax errors in real-time"
                  checked
                />
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold text-hive-text-primary mb-4">Collaboration</h5>
              <div className="space-y-3">
                <Switch
                  size="sm"
                  label="Real-time collaboration"
                  description="Allow others to edit your tools in real-time"
                />
                
                <Switch
                  size="sm"
                  label="Public tool gallery"
                  description="List your tools in the public gallery"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Anonymous usage analytics"
                  description="Help improve tools by sharing usage data"
                />
                
                <Switch
                  size="sm"
                  label="Community feedback"
                  description="Allow other students to suggest improvements"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Version history"
                  description="Keep track of changes to your tools"
                  checked
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h5 className="font-semibold text-hive-text-primary mb-4">Publishing Options</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Switch
                variant="ghost"
                size="sm"
                label="Auto-publish"
                description="Automatically publish stable versions"
              />
              
              <Switch
                variant="ghost"
                size="sm"
                label="Beta testing"
                description="Allow beta testers to try new features"
                checked
              />
              
              <Switch
                variant="ghost"
                size="sm"
                label="Open source"
                description="Make your tool's code publicly available"
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-sapphire text-white rounded-lg hover:bg-hive-sapphire/90 transition-colors">
              Save Development Settings
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Study Group Management</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Group Settings</h4>
              <div className="space-y-4">
                <Switch
                  label="Auto-accept invitations"
                  description="Automatically join study groups for your courses"
                />
                
                <Switch
                  label="Public group discovery"
                  description="Allow your groups to be found by other students"
                  checked
                />
                
                <Switch
                  label="Cross-course collaboration"
                  description="Enable collaboration with students from other courses"
                  checked
                />
                
                <Switch
                  label="Guest access"
                  description="Allow non-members to view group resources"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Communication Preferences</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Switch
                  size="sm"
                  label="Group chat notifications"
                  description="Get notified of new messages"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="Meeting reminders"
                  description="Receive alerts before scheduled meetings"
                  checked
                />
                
                <Switch
                  size="sm"
                  label="File sharing notifications"
                  description="Get notified when files are shared"
                />
                
                <Switch
                  size="sm"
                  label="Calendar integration"
                  description="Sync group events with your calendar"
                  checked
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
              Leave All Groups
            </button>
            <button className="px-4 py-2 bg-hive-emerald text-white rounded-lg hover:bg-hive-emerald/90 transition-colors">
              Update Group Settings
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Application Preferences</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Interface</h4>
              <div className="space-y-4">
                <Switch
                  label="Dark mode"
                  description="Use dark theme for better viewing at night"
                  checked
                />
                
                <Switch
                  label="Compact view"
                  description="Show more content in less space"
                />
                
                <Switch
                  label="Animations"
                  description="Enable smooth transitions and effects"
                  checked
                />
                
                <Switch
                  label="Sound effects"
                  description="Play audio feedback for interactions"
                />
                
                <Switch
                  label="High contrast mode"
                  description="Increase contrast for better accessibility"
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Performance</h4>
              <div className="space-y-4">
                <Switch
                  label="Hardware acceleration"
                  description="Use GPU for smoother performance"
                  checked
                />
                
                <Switch
                  label="Offline mode"
                  description="Cache content for offline access"
                  checked
                />
                
                <Switch
                  label="Auto-updates"
                  description="Automatically install app updates"
                  checked
                />
                
                <Switch
                  label="Data saving mode"
                  description="Reduce bandwidth usage on mobile"
                />
                
                <Switch
                  label="Background sync"
                  description="Keep data synchronized in the background"
                  checked
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-hive-border-subtle">
            <div className="flex justify-between items-center">
              <div className="text-sm text-hive-text-secondary">
                <p>Settings are automatically saved and synced across devices</p>
              </div>
              <button className="px-4 py-2 border border-hive-border-default text-hive-text-primary rounded-lg hover:bg-hive-interactive-hover transition-colors">
                Export Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Accessibility Options</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Visual Accessibility</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Switch
                  label="Large text"
                  description="Increase font size throughout the app"
                />
                
                <Switch
                  label="High contrast"
                  description="Enhance color contrast for better visibility"
                />
                
                <Switch
                  label="Reduce motion"
                  description="Minimize animations and transitions"
                />
                
                <Switch
                  label="Focus indicators"
                  description="Show clear focus outlines for keyboard navigation"
                  checked
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-hive-text-primary mb-4">Audio & Interaction</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Switch
                  label="Screen reader support"
                  description="Optimize for screen reading tools"
                  checked
                />
                
                <Switch
                  label="Keyboard navigation"
                  description="Enable full keyboard-only navigation"
                  checked
                />
                
                <Switch
                  label="Voice commands"
                  description="Control the app with voice input"
                />
                
                <Switch
                  label="Sticky hover states"
                  description="Keep hover effects active longer"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
              Save Accessibility Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive switch groups
export const InteractiveSwitchGroups: Story = {
  render: () => {
    const [notificationSettings, setNotificationSettings] = useState({
      email: true,
      push: false,
      sms: false,
      desktop: true,
    });

    const [privacySettings, setPrivacySettings] = useState({
      publicProfile: true,
      showOnlineStatus: false,
      allowMessages: true,
      shareProgress: false,
    });

    const [featureFlags, setFeatureFlags] = useState({
      darkMode: false,
      betaFeatures: false,
      analytics: true,
      autoSave: true,
    });

    const updateNotification = (key: string, value: boolean) => {
      setNotificationSettings(prev => ({ ...prev, [key]: value }));
    };

    const updatePrivacy = (key: string, value: boolean) => {
      setPrivacySettings(prev => ({ ...prev, [key]: value }));
    };

    const updateFeature = (key: string, value: boolean) => {
      setFeatureFlags(prev => ({ ...prev, [key]: value }));
    };

    const notificationCount = Object.values(notificationSettings).filter(Boolean).length;
    const privacyCount = Object.values(privacySettings).filter(Boolean).length;
    const featureCount = Object.values(featureFlags).filter(Boolean).length;

    return (
      <div className="space-y-8 p-6 max-w-3xl">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Notification Channels</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="space-y-4">
              <Switch
                label="Email Notifications"
                description="Receive updates via email"
                checked={notificationSettings.email}
                onChange={(e) => updateNotification('email', e.target.checked)}
              />
              
              <Switch
                label="Push Notifications"
                description="Browser and mobile push notifications"
                checked={notificationSettings.push}
                onChange={(e) => updateNotification('push', e.target.checked)}
              />
              
              <Switch
                label="SMS Notifications"
                description="Text message alerts for urgent items"
                checked={notificationSettings.sms}
                onChange={(e) => updateNotification('sms', e.target.checked)}
              />
              
              <Switch
                label="Desktop Notifications"
                description="System notifications on desktop"
                checked={notificationSettings.desktop}
                onChange={(e) => updateNotification('desktop', e.target.checked)}
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-hive-border-subtle">
              <p className="text-sm text-hive-text-secondary">
                {notificationCount} of 4 notification channels enabled
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Privacy Controls</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="space-y-4">
              <Switch
                label="Public Profile"
                description="Allow others to view your profile"
                checked={privacySettings.publicProfile}
                onChange={(e) => updatePrivacy('publicProfile', e.target.checked)}
              />
              
              <Switch
                label="Show Online Status"
                description="Display when you're active on HIVE"
                checked={privacySettings.showOnlineStatus}
                onChange={(e) => updatePrivacy('showOnlineStatus', e.target.checked)}
              />
              
              <Switch
                label="Allow Direct Messages"
                description="Let other students message you"
                checked={privacySettings.allowMessages}
                onChange={(e) => updatePrivacy('allowMessages', e.target.checked)}
              />
              
              <Switch
                label="Share Academic Progress"
                description="Show your courses and grades to study partners"
                checked={privacySettings.shareProgress}
                onChange={(e) => updatePrivacy('shareProgress', e.target.checked)}
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-hive-border-subtle">
              <p className="text-sm text-hive-text-secondary">
                Privacy level: {privacyCount < 2 ? 'High' : privacyCount < 3 ? 'Medium' : 'Open'} 
                ({privacyCount} of 4 sharing options enabled)
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Feature Preferences</h3>
          <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
            <div className="space-y-4">
              <Switch
                label="Dark Mode"
                description="Use dark theme for comfortable viewing"
                checked={featureFlags.darkMode}
                onChange={(e) => updateFeature('darkMode', e.target.checked)}
              />
              
              <Switch
                label="Beta Features"
                description="Access experimental features before they're released"
                checked={featureFlags.betaFeatures}
                onChange={(e) => updateFeature('betaFeatures', e.target.checked)}
              />
              
              <Switch
                label="Usage Analytics"
                description="Help improve HIVE by sharing anonymous usage data"
                checked={featureFlags.analytics}
                onChange={(e) => updateFeature('analytics', e.target.checked)}
              />
              
              <Switch
                label="Auto-save"
                description="Automatically save your work as you go"
                checked={featureFlags.autoSave}
                onChange={(e) => updateFeature('autoSave', e.target.checked)}
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-hive-border-subtle">
              <p className="text-sm text-hive-text-secondary">
                {featureCount} enhanced features enabled
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-2 bg-hive-gold text-hive-background-primary rounded-lg hover:bg-hive-gold/90 transition-colors">
            Save All Settings ({notificationCount + privacyCount + featureCount} total changes)
          </button>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    label: 'Interactive Switch - Use controls to customize →',
    description: 'Use the controls panel to test different configurations',
    size: 'md',
    variant: 'default',
    checked: false,
    disabled: false,
  },
};