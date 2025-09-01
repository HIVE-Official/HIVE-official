"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, 
  Label,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger  } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { 
  User, 
  Bell,
  Eye,
  Shield,
  Smartphone,
  Globe,
  Lock,
  Save,
  X,
  AlertTriangle,
  Settings as SettingsIcon,
  Mail,
  Users,
  Moon,
  Trash2
} from 'lucide-react';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { profileAPI, PrivacySettings } from '../../../../lib/profile-api';
import { useSession } from '../../../../hooks/use-session';
import { 
  ConfirmationModal, 
  DeleteAccountModal, 
  EnableGhostModeModal 
} from '../../../../components/profile/confirmation-modal';

interface NotificationSettings {
  email: {
    spaceInvites: boolean;
    eventReminders: boolean;
    toolUpdates: boolean;
    weeklyDigest: boolean;
    securityAlerts: boolean;
  };
  push: {
    messageNotifications: boolean;
    eventReminders: boolean;
    spaceActivity: boolean;
    toolNotifications: boolean;
    systemUpdates: boolean;
  };
  inApp: {
    realTimeMessages: boolean;
    activityFeed: boolean;
    recommendations: boolean;
    achievements: boolean;
  };
}

interface AccountSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  soundEffects: boolean;
  reducedMotion: boolean;
  autoSave: boolean;
  dataExport: boolean;
}

export default function ProfileSettingsPage() {
  const router = useRouter();
  const { user } = useSession();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGhostModeModal, setShowGhostModeModal] = useState(false);
  const [showDataExportModal, setShowDataExportModal] = useState(false);
  
  // Settings state
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: {
      spaceInvites: true,
      eventReminders: true,
      toolUpdates: false,
      weeklyDigest: true,
      securityAlerts: true
    },
    push: {
      messageNotifications: true,
      eventReminders: true,
      spaceActivity: false,
      toolNotifications: true,
      systemUpdates: true
    },
    inApp: {
      realTimeMessages: true,
      activityFeed: true,
      recommendations: true,
      achievements: true
    }
  });
  const [accountSettings, setAccountSettings] = useState<AccountSettings>({
    theme: 'dark',
    language: 'en',
    timezone: 'America/New_York',
    soundEffects: true,
    reducedMotion: false,
    autoSave: true,
    dataExport: false
  });

  // Load settings
  useEffect(() => {
    const loadSettings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Load privacy settings from API
        const privacy = await profileAPI.getPrivacySettings();
        setPrivacySettings(privacy);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load settings:', err);
        setError(err instanceof Error ? err.message : 'Failed to load settings');
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  const handlePrivacyChange = (field: string, value: boolean | object) => {
    if (!privacySettings) return;
    
    setPrivacySettings(prev => ({
      ...prev!,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleNotificationChange = (category: keyof NotificationSettings, field: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleAccountChange = (field: keyof AccountSettings, value: string | boolean) => {
    setAccountSettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!privacySettings) return;
    
    try {
      setIsSaving(true);
      
      // Save privacy settings
      await profileAPI.updatePrivacySettings(privacySettings);
      
      // TODO: Save notification and account settings when APIs are available
      
      setHasChanges(false);
      // Show success toast or notification
    } catch (err) {
      console.error('Failed to save settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.back();
      }
    } else {
      router.back();
    }
  };

  if (error) {
    return (
      <PageContainer title="Settings Error" maxWidth="lg">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <SettingsIcon className="h-6 w-6 text-[var(--hive-text-inverse)]" />
            </div>
            <p className="text-[var(--hive-text-inverse)] mb-2">Failed to load settings</p>
            <p className="text-red-400 text-sm">{error}</p>
            <ButtonEnhanced 
              onClick={() => router.back()} 
              className="mt-4 bg-hive-gold text-hive-obsidian"
            >
              Go Back
            </ButtonEnhanced>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!privacySettings || isLoading) {
    return (
      <PageContainer title="Loading Settings..." maxWidth="lg">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4 flex items-center justify-center">
              <SettingsIcon className="h-6 w-6 text-hive-obsidian animate-pulse" />
            </div>
            <p className="text-[var(--hive-text-inverse)] mb-2">Loading your settings...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
        title="Profile Settings"
        subtitle="Manage your HIVE preferences and privacy"
        breadcrumbs={[
          { label: "Profile", icon: User, href: "/profile" },
          { label: "Settings" }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <ButtonEnhanced 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </ButtonEnhanced>
            <ButtonEnhanced 
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </ButtonEnhanced>
          </div>
        }
        maxWidth="lg"
      >
        <Tabs defaultValue="privacy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Profile Visibility
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Public Profile</Label>
                    <p className="text-sm text-hive-text-mutedLight">Allow others to find and view your profile</p>
                  </div>
                  <SwitchEnhanced
                    checked={privacySettings.isPublic}
                    onCheckedChange={(checked) => handlePrivacyChange('isPublic', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Show Email</Label>
                    <p className="text-sm text-hive-text-mutedLight">Display your email on your profile</p>
                  </div>
                  <SwitchEnhanced
                    checked={privacySettings.showEmail}
                    onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Show Academic Info</Label>
                    <p className="text-sm text-hive-text-mutedLight">Display your major and graduation year</p>
                  </div>
                  <SwitchEnhanced
                    checked={privacySettings.showMajor && privacySettings.showGraduationYear}
                    onCheckedChange={(checked) => {
                      handlePrivacyChange('showMajor', checked);
                      handlePrivacyChange('showGraduationYear', checked);
                    }}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Activity & Social
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Show Activity</Label>
                    <p className="text-sm text-hive-text-mutedLight">Let others see your recent activity</p>
                  </div>
                  <SwitchEnhanced
                    checked={privacySettings.showActivity}
                    onCheckedChange={(checked) => handlePrivacyChange('showActivity', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Show Online Status</Label>
                    <p className="text-sm text-hive-text-mutedLight">Display when you&apos;re online</p>
                  </div>
                  <SwitchEnhanced
                    checked={privacySettings.showOnlineStatus}
                    onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Show Spaces</Label>
                    <p className="text-sm text-hive-text-mutedLight">Display the spaces you&apos;re in</p>
                  </div>
                  <SwitchEnhanced
                    checked={privacySettings.showSpaces}
                    onCheckedChange={(checked) => handlePrivacyChange('showSpaces', checked)}
                  />
                </div>
              </div>
            </Card>

            {/* Ghost Mode */}
            <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <Moon className="h-5 w-5 mr-2 text-purple-400" />
                Ghost Mode
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Enable Ghost Mode</Label>
                    <p className="text-sm text-hive-text-mutedLight">Hide your presence and activity</p>
                  </div>
                  <SwitchEnhanced
                    checked={privacySettings.ghostMode.enabled}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setShowGhostModeModal(true);
                      } else {
                        handlePrivacyChange('ghostMode', {
                          ...privacySettings.ghostMode,
                          enabled: false
                        });
                      }
                    }}
                  />
                </div>
                
                {privacySettings.ghostMode.enabled && (
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Ghost Level</Label>
                    <SelectEnhanced
                      value={privacySettings.ghostMode.level}
                      onValueChange={(value) => handlePrivacyChange('ghostMode', {
                        ...privacySettings.ghostMode,
                        level: value
                      })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal - Hide online status</SelectItem>
                        <SelectItem value="moderate">Moderate - Hide activity too</SelectItem>
                        <SelectItem value="maximum">Maximum - Hide everything</SelectItem>
                      </SelectContent>
                    </SelectEnhanced>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Notifications
              </h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings.email).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="text-[var(--hive-text-inverse)] capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Label>
                    <SwitchEnhanced
                      checked={value}
                      onCheckedChange={(checked) => handleNotificationChange('email', key, checked)}
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                Push Notifications
              </h3>
              <div className="space-y-4">
                {Object.entries(notificationSettings.push).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="text-[var(--hive-text-inverse)] capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </Label>
                    <SwitchEnhanced
                      checked={value}
                      onCheckedChange={(checked) => handleNotificationChange('push', key, checked)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[var(--hive-text-inverse)]">Theme</Label>
                  <SelectEnhanced
                    value={accountSettings.theme}
                    onValueChange={(value) => handleAccountChange('theme', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </SelectEnhanced>
                </div>
                
                <div>
                  <Label className="text-[var(--hive-text-inverse)]">Language</Label>
                  <SelectEnhanced
                    value={accountSettings.language}
                    onValueChange={(value) => handleAccountChange('language', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </SelectEnhanced>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Sound Effects</Label>
                    <p className="text-sm text-hive-text-mutedLight">Play sounds for notifications and interactions</p>
                  </div>
                  <SwitchEnhanced
                    checked={accountSettings.soundEffects}
                    onCheckedChange={(checked) => handleAccountChange('soundEffects', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[var(--hive-text-inverse)]">Auto-save</Label>
                    <p className="text-sm text-hive-text-mutedLight">Automatically save your work</p>
                  </div>
                  <SwitchEnhanced
                    checked={accountSettings.autoSave}
                    onCheckedChange={(checked) => handleAccountChange('autoSave', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Account Security
              </h3>
              <div className="space-y-4">
                <ButtonEnhanced variant="outline" className="justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Change Password
                </ButtonEnhanced>
                
                <ButtonEnhanced variant="outline" className="justify-start">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Two-Factor Authentication
                </ButtonEnhanced>
                
                <ButtonEnhanced variant="outline" className="justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Active Sessions
                </ButtonEnhanced>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-400" />
                Danger Zone
              </h3>
              <div className="space-y-3">
                <ButtonEnhanced 
                  variant="outline" 
                  className="justify-start border-red-500 text-red-400 hover:bg-red-500/10"
                  onClick={() => setShowDataExportModal(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Export My Data
                </ButtonEnhanced>
                
                <ButtonEnhanced 
                  variant="outline" 
                  className="justify-start border-red-500 text-red-400 hover:bg-red-500/10"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Delete Account
                </ButtonEnhanced>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Changes indicator */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-hive-gold text-hive-obsidian px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">You have unsaved changes</span>
          </div>
        )}

        {/* Modals */}
        <EnableGhostModeModal
          isOpen={showGhostModeModal}
          onClose={() => setShowGhostModeModal(false)}
          onConfirm={() => {
            handlePrivacyChange('ghostMode', {
              ...privacySettings!.ghostMode,
              enabled: true
            });
            setShowGhostModeModal(false);
          }}
        />

        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            // TODO: Implement account deletion
            console.log('Delete account requested');
            setShowDeleteModal(false);
          }}
        />

        <ConfirmationModal
          isOpen={showDataExportModal}
          onClose={() => setShowDataExportModal(false)}
          onConfirm={async () => {
            // TODO: Implement data export
            console.log('Data export requested');
            setShowDataExportModal(false);
          }}
          title="Export Your Data"
          description="We'll compile all your HIVE data into a downloadable file. This may take a few minutes and you'll receive an email when it's ready."
          confirmText="Start Export"
        />
      </PageContainer>
    </ErrorBoundary>
  );
}