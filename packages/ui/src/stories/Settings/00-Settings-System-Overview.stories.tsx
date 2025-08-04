import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Settings/00-Settings System Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Settings & Configuration System Overview - Complete system for user preferences, privacy controls, and platform configuration.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SettingsSystemOverview: Story = {
  name: '⚙️ Settings System Overview',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="text-5xl font-bold bg-gradient-to-r from-hive-brand-primary to-hive-brand-secondary bg-clip-text text-transparent">
              Settings & Configuration System
            </div>
            <div className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
              Comprehensive user preferences, privacy controls, and platform configuration for personalized HIVE experience
            </div>
          </div>

          {/* System Architecture */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">System Architecture</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* User Settings */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    👤
                  </div>
                  <h3 className="text-xl font-bold text-hive-text-primary">User Settings</h3>
                  <p className="text-hive-text-secondary">Personal preferences and account configuration</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">👤 Profile Settings</div>
                    <div className="text-sm text-hive-text-secondary">Personal information, avatar, bio, academic details</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🔔 Notifications</div>
                    <div className="text-sm text-hive-text-secondary">Push, email, and in-app notification preferences</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🎨 Appearance</div>
                    <div className="text-sm text-hive-text-secondary">Theme, layout preferences, accessibility options</div>
                  </div>

                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🔗 Integrations</div>
                    <div className="text-sm text-hive-text-secondary">Calendar sync, external apps, data exports</div>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                    🔒
                  </div>
                  <h3 className="text-xl font-bold text-hive-text-primary">Privacy & Security</h3>
                  <p className="text-hive-text-secondary">Data protection and visibility controls</p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">👻 Ghost Mode</div>
                    <div className="text-sm text-hive-text-secondary">Complete privacy mode with selective visibility</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">📊 Data Controls</div>
                    <div className="text-sm text-hive-text-secondary">Data export, deletion, and usage transparency</div>
                  </div>
                  
                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">🛡️ Security</div>
                    <div className="text-sm text-hive-text-secondary">Password, 2FA, session management</div>
                  </div>

                  <div className="p-4 bg-hive-background-primary rounded-xl border border-hive-border-default">
                    <div className="font-semibold text-hive-text-primary mb-2">👥 Visibility</div>
                    <div className="text-sm text-hive-text-secondary">Profile visibility, space discovery, connection controls</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-800 mb-6">User Experience</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Personalized Interface</div>
                    <div className="text-sm text-blue-600">Custom themes, layouts, and accessibility preferences</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Smart Notifications</div>
                    <div className="text-sm text-blue-600">Granular control over when and how you're notified</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Integration Management</div>
                    <div className="text-sm text-blue-600">Connect external calendars, apps, and services</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-blue-800">Academic Configuration</div>
                    <div className="text-sm text-blue-600">Course schedules, major preferences, study settings</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Privacy & Security</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Ghost Mode Privacy</div>
                    <div className="text-sm text-green-600">Complete invisibility with selective sharing controls</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Data Transparency</div>
                    <div className="text-sm text-green-600">Full control over data usage, export, and deletion</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Advanced Security</div>
                    <div className="text-sm text-green-600">2FA, session management, security monitoring</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm mt-0.5">✓</div>
                  <div>
                    <div className="font-semibold text-green-800">Granular Visibility</div>
                    <div className="text-sm text-green-600">Fine-tuned control over profile and activity visibility</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Categories */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Settings Categories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  👤
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Profile & Identity</h4>
                <p className="text-sm text-hive-text-secondary">Personal information, academic details, profile customization</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🔔
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Notifications</h4>
                <p className="text-sm text-hive-text-secondary">Push, email, and in-app notification preferences</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  👻
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Privacy Controls</h4>
                <p className="text-sm text-hive-text-secondary">Ghost mode, visibility settings, data controls</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🔒
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Security</h4>
                <p className="text-sm text-hive-text-secondary">Password, 2FA, session management, security monitoring</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🎨
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Appearance</h4>
                <p className="text-sm text-hive-text-secondary">Themes, layout preferences, accessibility options</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  🔗
                </div>
                <h4 className="font-bold text-hive-text-primary mb-3">Integrations</h4>
                <p className="text-sm text-hive-text-secondary">Calendar sync, external apps, data exports</p>
              </div>
            </div>
          </div>

          {/* Component Structure */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Component Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">👤 Profile Settings</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• ProfileEditor - Personal information</li>
                  <li>• AvatarUploader - Profile picture management</li>
                  <li>• AcademicInfo - Major, year, courses</li>
                  <li>• BioEditor - Personal description</li>
                  <li>• ContactInfo - Email, phone preferences</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">🔔 Notification Settings</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• NotificationCenter - Main preferences</li>
                  <li>• PushSettings - Mobile notifications</li>
                  <li>• EmailPreferences - Email notifications</li>
                  <li>• QuietHours - Do not disturb settings</li>
                  <li>• CategoryFilters - Notification types</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">👻 Privacy Controls</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• GhostModeToggle - Privacy mode</li>
                  <li>• VisibilitySettings - Profile visibility</li>
                  <li>• DataControls - Data management</li>
                  <li>• BlockingControls - User blocking</li>
                  <li>• ActivityPrivacy - Activity visibility</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">🔒 Security Settings</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• PasswordManager - Password changes</li>
                  <li>• TwoFactorAuth - 2FA setup</li>
                  <li>• SessionManager - Active sessions</li>
                  <li>• SecurityAlerts - Security monitoring</li>
                  <li>• LoginHistory - Access history</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">🎨 Appearance Settings</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• ThemeSelector - Light/dark themes</li>
                  <li>• LayoutPreferences - Interface layout</li>
                  <li>• AccessibilityOptions - A11y features</li>
                  <li>• FontSettings - Typography preferences</li>
                  <li>• ColorCustomization - Brand colors</li>
                </ul>
              </div>

              <div className="p-6 bg-hive-background-primary rounded-xl border border-hive-border-default">
                <h4 className="font-bold text-hive-text-primary mb-3">🔗 Integration Settings</h4>
                <ul className="text-sm text-hive-text-secondary space-y-2">
                  <li>• CalendarSync - External calendars</li>
                  <li>• AppConnections - Third-party apps</li>
                  <li>• DataExport - Export utilities</li>
                  <li>• APIAccess - Developer settings</li>
                  <li>• WebhookManager - External webhooks</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Development Progress */}
          <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 rounded-2xl p-8 border border-hive-brand-secondary/20">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Development Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-hive-text-primary">✅ Completed</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">Settings system architecture</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">Privacy-first design principles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-success rounded-full flex items-center justify-center text-white text-sm">✓</div>
                    <span className="text-hive-text-secondary">Ghost mode feature specification</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-hive-text-primary">🚧 In Progress</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Profile and identity settings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Notification preferences system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Privacy and security controls</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-hive-status-warning rounded-full flex items-center justify-center text-white text-sm">○</div>
                    <span className="text-hive-text-secondary">Appearance and integration settings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Guide */}
          <div className="bg-white rounded-2xl p-8 border border-hive-border-default shadow-lg">
            <h2 className="text-3xl font-bold text-hive-text-primary mb-8 text-center">Storybook Navigation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200 text-center">
                <div className="text-3xl mb-4">👤</div>
                <h3 className="font-bold text-purple-800 mb-2">Profile Settings</h3>
                <p className="text-sm text-purple-600 mb-4">Personal information and identity management</p>
                <div className="text-xs text-purple-500">Settings → 01-Profile Settings</div>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200 text-center">
                <div className="text-3xl mb-4">🔔</div>
                <h3 className="font-bold text-blue-800 mb-2">Notifications</h3>
                <p className="text-sm text-blue-600 mb-4">Push, email, and in-app notification controls</p>
                <div className="text-xs text-blue-500">Settings → 02-Notifications</div>
              </div>

              <div className="p-6 bg-green-50 rounded-xl border border-green-200 text-center">
                <div className="text-3xl mb-4">👻</div>
                <h3 className="font-bold text-green-800 mb-2">Privacy Controls</h3>
                <p className="text-sm text-green-600 mb-4">Ghost mode and visibility settings</p>
                <div className="text-xs text-green-500">Settings → 03-Privacy</div>
              </div>

              <div className="p-6 bg-red-50 rounded-xl border border-red-200 text-center">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="font-bold text-red-800 mb-2">Security</h3>
                <p className="text-sm text-red-600 mb-4">Password, 2FA, and security monitoring</p>
                <div className="text-xs text-red-500">Settings → 04-Security</div>
              </div>

              <div className="p-6 bg-yellow-50 rounded-xl border border-yellow-200 text-center">
                <div className="text-3xl mb-4">🎨</div>
                <h3 className="font-bold text-yellow-800 mb-2">Appearance</h3>
                <p className="text-sm text-yellow-600 mb-4">Themes and accessibility preferences</p>
                <div className="text-xs text-yellow-500">Settings → 05-Appearance</div>
              </div>

              <div className="p-6 bg-cyan-50 rounded-xl border border-cyan-200 text-center">
                <div className="text-3xl mb-4">🔗</div>
                <h3 className="font-bold text-cyan-800 mb-2">Integrations</h3>
                <p className="text-sm text-cyan-600 mb-4">External apps and data management</p>
                <div className="text-xs text-cyan-500">Settings → 06-Integrations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};