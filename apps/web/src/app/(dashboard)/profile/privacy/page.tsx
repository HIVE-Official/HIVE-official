"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { 
  ArrowLeft,
  Shield,
  Globe,
  Eye,
  EyeOff,
  Ghost,
  MessageCircle,
  Save,
  UserX
} from 'lucide-react';

interface PrivacySettings {
  isPublic: boolean;
  showEmail: boolean;
  showActivity: boolean;
  showSpaces: boolean;
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
  allowSpaceInvites: boolean;
  allowEventInvites: boolean;
  allowAnalytics: boolean;
  allowPersonalization: boolean;
  ghostMode: {
    enabled: boolean;
    level: 'minimal' | 'moderate' | 'maximum';
    hideActivity: boolean;
    hideOnlineStatus: boolean;
    hideMemberships: boolean;
  };
}

export default function ProfilePrivacyPage() {
  const router = useRouter();
  // Future loading state for API integration
  // const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  // Mock privacy settings - would come from API
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    isPublic: true,
    showEmail: false,
    showActivity: true,
    showSpaces: true,
    showOnlineStatus: true,
    allowDirectMessages: true,
    allowSpaceInvites: true,
    allowEventInvites: true,
    allowAnalytics: true,
    allowPersonalization: true,
    ghostMode: {
      enabled: false,
      level: 'minimal',
      hideActivity: false,
      hideOnlineStatus: false,
      hideMemberships: false
    }
  });

  const handlePrivacyChange = (field: keyof PrivacySettings, value: boolean | PrivacySettings['ghostMode']) => {
    setPrivacySettings(prev => ({
      ...prev,
      [field]: value
    }));
    setHasChanges(true);
  };

  const handleGhostModeChange = (field: keyof PrivacySettings['ghostMode'], value: boolean | 'minimal' | 'moderate' | 'maximum') => {
    setPrivacySettings(prev => ({
      ...prev,
      ghostMode: {
        ...prev.ghostMode,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleGoPrivate = () => {
    setPrivacySettings(prev => ({
      ...prev,
      isPublic: false,
      showEmail: false,
      showActivity: false,
      showSpaces: false,
      showOnlineStatus: false,
      allowDirectMessages: false,
      ghostMode: {
        ...prev.ghostMode,
        enabled: true,
        level: 'maximum',
        hideActivity: true,
        hideOnlineStatus: true,
        hideMemberships: true
      }
    }));
    setHasChanges(true);
  };

  const handleGoPublic = () => {
    setPrivacySettings(prev => ({
      ...prev,
      isPublic: true,
      showActivity: true,
      showSpaces: true,
      showOnlineStatus: true,
      allowDirectMessages: true,
      allowSpaceInvites: true,
      allowEventInvites: true,
      ghostMode: {
        ...prev.ghostMode,
        enabled: false,
        hideActivity: false,
        hideOnlineStatus: false,
        hideMemberships: false
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasChanges(false);
    } catch (err) {
      console.error('Failed to save privacy settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const getPrivacyLevel = () => {
    if (privacySettings.ghostMode.enabled) return 'Ghost Mode';
    if (!privacySettings.isPublic) return 'Private';
    return 'Public';
  };

  const Switch = ({ checked, onChange, disabled = false }: { checked: boolean; onChange: (_checked: boolean) => void; disabled?: boolean }) => (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${checked ? 'bg-hive-brand-secondary' : 'bg-hive-background-tertiary'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-hive-background-primary">
        {/* Header */}
        <div className="border-b border-hive-border-default bg-hive-background-secondary">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => router.back()}
                  className="p-2 rounded-lg hover:bg-hive-interactive-hover transition-colors"
                >
                  <ArrowLeft size={20} className="text-hive-text-secondary" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-hive-brand-secondary/10 rounded-lg">
                    <Shield size={20} className="text-hive-brand-secondary" />
                  </div>
                  <div>
                    <h1 className="text-heading-lg font-semibold text-hive-text-primary">Privacy Settings</h1>
                    <p className="text-body-md text-hive-text-secondary">Control your profile visibility and data</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                  privacySettings.ghostMode.enabled 
                    ? 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                    : privacySettings.isPublic 
                      ? 'bg-green-500/10 border-green-500/20 text-green-400'
                      : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                }`}>
                  {getPrivacyLevel()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto p-6">
          {/* Quick Actions */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Go Private - Effortless */}
              <div className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-6 relative group hover:border-hive-brand-secondary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <EyeOff size={24} className="text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-hive-text-primary">Go Private</h3>
                      <p className="text-body-sm text-hive-text-secondary">Hide from everyone</p>
                    </div>
                  </div>
                </div>
                <p className="text-body-sm text-hive-text-secondary mb-4">
                  Instantly make your profile private, hide all activity, and enable ghost mode. Perfect for focus time or privacy.
                </p>
                <button
                  onClick={handleGoPrivate}
                  className="w-full px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <UserX size={16} />
                  Make Everything Private
                </button>
              </div>

              {/* Go Public */}
              <div className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-6 relative group hover:border-hive-brand-secondary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <Globe size={24} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-hive-text-primary">Go Public</h3>
                      <p className="text-body-sm text-hive-text-secondary">Connect with campus</p>
                    </div>
                  </div>
                </div>
                <p className="text-body-sm text-hive-text-secondary mb-4">
                  Make your profile visible, allow connections, and share your campus journey. Great for networking and collaboration.
                </p>
                <button
                  onClick={handleGoPublic}
                  className="w-full px-4 py-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg font-medium hover:bg-green-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Make Profile Public
                </button>
              </div>
            </div>
          </div>

          {/* Profile Visibility */}
          <div className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-6 mb-6">
            <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
              <Globe size={18} className="text-hive-brand-secondary" />
              Profile Visibility
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Public Profile</span>
                  <p className="text-body-sm text-hive-text-secondary">Others can find and view your profile</p>
                </div>
                <Switch
                  checked={privacySettings.isPublic}
                  onChange={(checked) => handlePrivacyChange('isPublic', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Show Email</span>
                  <p className="text-body-sm text-hive-text-secondary">Display email on your profile</p>
                </div>
                <Switch
                  checked={privacySettings.showEmail}
                  onChange={(checked) => handlePrivacyChange('showEmail', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Show Activity</span>
                  <p className="text-body-sm text-hive-text-secondary">Let others see your recent activity</p>
                </div>
                <Switch
                  checked={privacySettings.showActivity}
                  onChange={(checked) => handlePrivacyChange('showActivity', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Show Spaces</span>
                  <p className="text-body-sm text-hive-text-secondary">Display spaces you&apos;re a member of</p>
                </div>
                <Switch
                  checked={privacySettings.showSpaces}
                  onChange={(checked) => handlePrivacyChange('showSpaces', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Online Status</span>
                  <p className="text-body-sm text-hive-text-secondary">Show when you&apos;re currently online</p>
                </div>
                <Switch
                  checked={privacySettings.showOnlineStatus}
                  onChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                />
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-6 mb-6">
            <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
              <MessageCircle size={18} className="text-hive-brand-secondary" />
              Communication
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Direct Messages</span>
                  <p className="text-body-sm text-hive-text-secondary">Allow others to message you directly</p>
                </div>
                <Switch
                  checked={privacySettings.allowDirectMessages}
                  onChange={(checked) => handlePrivacyChange('allowDirectMessages', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Space Invites</span>
                  <p className="text-body-sm text-hive-text-secondary">Receive invitations to join spaces</p>
                </div>
                <Switch
                  checked={privacySettings.allowSpaceInvites}
                  onChange={(checked) => handlePrivacyChange('allowSpaceInvites', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Event Invites</span>
                  <p className="text-body-sm text-hive-text-secondary">Receive invitations to events</p>
                </div>
                <Switch
                  checked={privacySettings.allowEventInvites}
                  onChange={(checked) => handlePrivacyChange('allowEventInvites', checked)}
                />
              </div>
            </div>
          </div>

          {/* Ghost Mode */}
          <div className="bg-gradient-to-br from-purple-500/5 to-purple-600/5 rounded-xl border border-purple-500/20 p-6 mb-6">
            <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
              <Ghost size={18} className="text-purple-400" />
              Ghost Mode
              {privacySettings.ghostMode.enabled && (
                <div className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">ACTIVE</div>
              )}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Enable Ghost Mode</span>
                  <p className="text-body-sm text-hive-text-secondary">Hide your presence and activity completely</p>
                </div>
                <Switch
                  checked={privacySettings.ghostMode.enabled}
                  onChange={(checked) => handleGhostModeChange('enabled', checked)}
                />
              </div>
              
              {privacySettings.ghostMode.enabled && (
                <div className="space-y-3 pl-4 border-l-2 border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-hive-text-primary">Hide Activity</span>
                    <Switch
                      checked={privacySettings.ghostMode.hideActivity}
                      onChange={(checked) => handleGhostModeChange('hideActivity', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-hive-text-primary">Hide Online Status</span>
                    <Switch
                      checked={privacySettings.ghostMode.hideOnlineStatus}
                      onChange={(checked) => handleGhostModeChange('hideOnlineStatus', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-hive-text-primary">Hide Space Memberships</span>
                    <Switch
                      checked={privacySettings.ghostMode.hideMemberships}
                      onChange={(checked) => handleGhostModeChange('hideMemberships', checked)}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="bg-hive-background-elevated rounded-xl border border-hive-border-subtle p-6">
            <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
              <Shield size={18} className="text-hive-brand-secondary" />
              Data & Analytics
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Usage Analytics</span>
                  <p className="text-body-sm text-hive-text-secondary">Help improve HIVE with anonymous usage data</p>
                </div>
                <Switch
                  checked={privacySettings.allowAnalytics}
                  onChange={(checked) => handlePrivacyChange('allowAnalytics', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-hive-text-primary">Personalization</span>
                  <p className="text-body-sm text-hive-text-secondary">Personalize your HIVE experience</p>
                </div>
                <Switch
                  checked={privacySettings.allowPersonalization}
                  onChange={(checked) => handlePrivacyChange('allowPersonalization', checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 flex items-center gap-3">
            <button
              onClick={() => {
                setHasChanges(false);
                // Reset to original state
              }}
              className="px-4 py-2 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-medium hover:bg-hive-brand-hover disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}