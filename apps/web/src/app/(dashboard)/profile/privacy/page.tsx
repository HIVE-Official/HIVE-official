"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, 
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge  } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { 
  User, 
  Eye,
  Shield,
  Globe,
  Users,
  Ghost,
  Save,
  X,
  AlertTriangle,
  Info,
  Zap,
  MessageCircle,
  Activity
} from 'lucide-react';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { profileAPI, PrivacySettings } from '../../../../lib/profile-api';
import { useSession } from '../../../../hooks/use-session';

export default function ProfilePrivacyPage() {
  const router = useRouter();
  const { user } = useSession();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings | null>(null);

  // Load privacy settings
  useEffect(() => {
    const loadPrivacySettings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        const settings = await profileAPI.getPrivacySettings();
        setPrivacySettings(settings);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load privacy settings:', err);
        setError(err instanceof Error ? err.message : 'Failed to load privacy settings');
        setIsLoading(false);
      }
    };

    loadPrivacySettings();
  }, [user]);

  const handlePrivacyChange = (field: keyof PrivacySettings, value: any) => {
    if (!privacySettings) return;
    
    setPrivacySettings(prev => ({
      ...prev!,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleGhostModeChange = (field: keyof PrivacySettings['ghostMode'], value: any) => {
    if (!privacySettings) return;
    
    setPrivacySettings(prev => ({
      ...prev!,
      ghostMode: {
        ...prev!.ghostMode,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!privacySettings) return;
    
    try {
      setIsSaving(true);
      
      await profileAPI.updatePrivacySettings(privacySettings);
      
      setHasChanges(false);
      // Show success notification
    } catch (err) {
      console.error('Failed to save privacy settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to save privacy settings');
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
      <PageContainer title="Privacy Settings Error" maxWidth="lg">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <p className="text-white mb-2">Failed to load privacy settings</p>
            <p className="text-red-400 text-sm">{error}</p>
            <Button 
              onClick={() => router.back()} 
              className="mt-4 bg-hive-gold text-hive-obsidian"
            >
              Go Back
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!privacySettings || isLoading) {
    return (
      <PageContainer title="Loading Privacy Settings..." maxWidth="lg">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4 flex items-center justify-center">
              <Shield className="h-6 w-6 text-hive-obsidian animate-pulse" />
            </div>
            <p className="text-white mb-2">Loading privacy settings...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <ErrorBoundary>
      <PageContainer
        title="Privacy Settings"
        subtitle="Control who can see your information and activity"
        breadcrumbs={[
          { label: "Profile", icon: User, href: "/profile" },
          { label: "Privacy" }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        }
        maxWidth="lg"
      >
        <div className="space-y-6">
          {/* Profile Visibility */}
          <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Profile Visibility
              </h3>
              <Badge variant={privacySettings.isPublic ? "success" : "secondary"}>
                {privacySettings.isPublic ? 'Public' : 'Private'}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-hive-text-mutedLight" />
                    <span className="text-white font-medium">Public Profile</span>
                  </div>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Allow others to find and view your profile
                  </p>
                </div>
                <Switch
                  checked={privacySettings.isPublic}
                  onCheckedChange={(checked) => handlePrivacyChange('isPublic', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-hive-text-mutedLight" />
                    <span className="text-white font-medium">Show Email</span>
                  </div>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Display your email address on your profile
                  </p>
                </div>
                <Switch
                  checked={privacySettings.showEmail}
                  onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-hive-text-mutedLight" />
                    <span className="text-white font-medium">Academic Information</span>
                  </div>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Show your school, major, and graduation year
                  </p>
                </div>
                <Switch
                  checked={privacySettings.showSchool && privacySettings.showMajor && privacySettings.showGraduationYear}
                  onCheckedChange={(checked) => {
                    handlePrivacyChange('showSchool', checked);
                    handlePrivacyChange('showMajor', checked);
                    handlePrivacyChange('showGraduationYear', checked);
                  }}
                />
              </div>
            </div>
          </Card>

          {/* Activity & Social */}
          <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Activity & Social
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-hive-text-mutedLight" />
                    <span className="text-white font-medium">Show Activity</span>
                  </div>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Let others see your recent activity and contributions
                  </p>
                </div>
                <Switch
                  checked={privacySettings.showActivity}
                  onCheckedChange={(checked) => handlePrivacyChange('showActivity', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-hive-text-mutedLight" />
                    <span className="text-white font-medium">Show Spaces</span>
                  </div>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Display the spaces you&apos;re a member of
                  </p>
                </div>
                <Switch
                  checked={privacySettings.showSpaces}
                  onCheckedChange={(checked) => handlePrivacyChange('showSpaces', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white font-medium">Online Status</span>
                  </div>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Show when you&apos;re currently online and active
                  </p>
                </div>
                <Switch
                  checked={privacySettings.showOnlineStatus}
                  onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Contact Preferences */}
          <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Preferences
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Direct Messages</span>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Allow other users to send you direct messages
                  </p>
                </div>
                <Switch
                  checked={privacySettings.allowDirectMessages}
                  onCheckedChange={(checked) => handlePrivacyChange('allowDirectMessages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Space Invites</span>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Receive invitations to join new spaces
                  </p>
                </div>
                <Switch
                  checked={privacySettings.allowSpaceInvites}
                  onCheckedChange={(checked) => handlePrivacyChange('allowSpaceInvites', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Event Invites</span>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Receive invitations to events and activities
                  </p>
                </div>
                <Switch
                  checked={privacySettings.allowEventInvites}
                  onCheckedChange={(checked) => handlePrivacyChange('allowEventInvites', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Data & Analytics */}
          <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Data & Analytics
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Usage Analytics</span>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Help improve HIVE by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={privacySettings.allowAnalytics}
                  onCheckedChange={(checked) => handlePrivacyChange('allowAnalytics', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Personalization</span>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Use your data to personalize your HIVE experience
                  </p>
                </div>
                <Switch
                  checked={privacySettings.allowPersonalization}
                  onCheckedChange={(checked) => handlePrivacyChange('allowPersonalization', checked)}
                />
              </div>
            </div>
          </Card>

          {/* Ghost Mode */}
          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Ghost className="h-5 w-5 mr-2 text-purple-400" />
                Ghost Mode
              </h3>
              <Badge variant={privacySettings.ghostMode.enabled ? "secondary" : "outline"}>
                {privacySettings.ghostMode.enabled ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Enable Ghost Mode</span>
                  <p className="text-sm text-hive-text-mutedLight mt-1">
                    Hide your presence and activity from other users
                  </p>
                </div>
                <Switch
                  checked={privacySettings.ghostMode.enabled}
                  onCheckedChange={(checked) => handleGhostModeChange('enabled', checked)}
                />
              </div>
              
              {privacySettings.ghostMode.enabled && (
                <>
                  <div>
                    <label className="text-white font-medium mb-2 block">Ghost Level</label>
                    <Select
                      value={privacySettings.ghostMode.level}
                      onValueChange={(value) => handleGhostModeChange('level', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">
                          <div>
                            <div className="font-medium">Minimal</div>
                            <div className="text-sm text-hive-text-mutedLight">Hide online status only</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="moderate">
                          <div>
                            <div className="font-medium">Moderate</div>
                            <div className="text-sm text-hive-text-mutedLight">Hide activity and status</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="maximum">
                          <div>
                            <div className="font-medium">Maximum</div>
                            <div className="text-sm text-hive-text-mutedLight">Hide everything possible</div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white">Hide Activity</span>
                      <Switch
                        checked={privacySettings.ghostMode.hideActivity}
                        onCheckedChange={(checked) => handleGhostModeChange('hideActivity', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white">Hide Online Status</span>
                      <Switch
                        checked={privacySettings.ghostMode.hideOnlineStatus}
                        onCheckedChange={(checked) => handleGhostModeChange('hideOnlineStatus', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white">Hide Space Memberships</span>
                      <Switch
                        checked={privacySettings.ghostMode.hideMemberships}
                        onCheckedChange={(checked) => handleGhostModeChange('hideMemberships', checked)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Privacy Level Summary */}
          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-400" />
              Privacy Summary
            </h3>
            
            <div className="text-sm text-hive-text-mutedLight space-y-2">
              <p>
                <strong className="text-white">Profile:</strong> {privacySettings.isPublic ? 'Public - Others can find and view your profile' : 'Private - Only you can see your full profile'}
              </p>
              <p>
                <strong className="text-white">Activity:</strong> {privacySettings.showActivity ? 'Visible - Others can see your recent activity' : 'Hidden - Your activity is private'}
              </p>
              <p>
                <strong className="text-white">Contact:</strong> {privacySettings.allowDirectMessages ? 'Open - Others can message you' : 'Restricted - Direct messages disabled'}
              </p>
              {privacySettings.ghostMode.enabled && (
                <p className="text-purple-400">
                  <strong>Ghost Mode:</strong> Active ({privacySettings.ghostMode.level}) - Your presence is minimized
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Changes indicator */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-hive-gold text-hive-obsidian px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">You have unsaved privacy changes</span>
          </div>
        )}
      </PageContainer>
    </ErrorBoundary>
  );
}