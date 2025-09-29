"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Grid } from "@hive/ui";
import { Alert as _Alert } from "@/components/temp-stubs";
import { ArrowLeft, Settings as _Settings, Lock, Eye as _Eye, EyeOff as _EyeOff, Users, Globe, Shield as _Shield, Trash2, Copy, Download, Upload as _Upload, AlertTriangle, Save, Share2, Bell } from "lucide-react";
import { useFeatureFlags } from "@hive/hooks";

interface ToolSettings {
  id: string;
  name: string;
  description: string;
  privacy: 'personal' | 'space' | 'public';
  permissions: {
    allowInstall: boolean;
    allowFork: boolean;
    allowRating: boolean;
    requireAuth: boolean;
  };
  notifications: {
    onInstall: boolean;
    onRating: boolean;
    onComment: boolean;
    weeklyReport: boolean;
  };
  metadata: {
    category: string;
    tags: string[];
    version: string;
    lastUpdated: string;
  };
  usage: {
    installCount: number;
    activeSpaces: number;
    totalUsage: number;
  };
}

// Mock tool settings
const MOCK_SETTINGS: ToolSettings = {
  id: 'poll-maker',
  name: 'Poll Maker',
  description: 'Create interactive polls for spaces and events',
  privacy: 'space',
  permissions: {
    allowInstall: true,
    allowFork: true,
    allowRating: true,
    requireAuth: true
  },
  notifications: {
    onInstall: true,
    onRating: false,
    onComment: true,
    weeklyReport: true
  },
  metadata: {
    category: 'communication',
    tags: ['polling', 'engagement', 'voting'],
    version: '1.2.0',
    lastUpdated: '2024-01-20'
  },
  usage: {
    installCount: 892,
    activeSpaces: 45,
    totalUsage: 1247
  }
};

const SettingsSection = ({ title, description, children }: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="text-sm text-[#A1A1AA] mt-1">{description}</p>
      )}
    </div>
    {children}
  </Card>
);

const ToggleSwitch = ({ enabled, onToggle, label, description }: {
  enabled: boolean;
  onToggle: (_enabled: boolean) => void;
  label: string;
  description?: string;
}) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <div className="text-white font-medium text-sm">{label}</div>
      {description && (
        <div className="text-xs text-[#A1A1AA] mt-1">{description}</div>
      )}
    </div>
    <button
      onClick={() => onToggle(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-[#FFD700]' : 'bg-[rgba(255,255,255,0.2)]'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default function ToolSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const [settings, setSettings] = useState<ToolSettings>(MOCK_SETTINGS);
  const [hasChanges, setHasChanges] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const flags = useFeatureFlags();

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-settings', toolId: params.toolId });
  }, [flags, params.toolId]);

  const updateSettings = (newSettings: Partial<ToolSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    setHasChanges(true);
  };

  const handleSave = () => {
    flags.trackEvent('tools', 'interact', { action: 'save_settings', toolId: settings.id });
    setHasChanges(false);
    // API call to save settings
  };

  const handleDelete = () => {
    flags.trackEvent('tools', 'interact', { action: 'delete_tool', toolId: settings.id });
    // API call to delete tool
    router.push('/tools');
  };

  const handleDuplicate = () => {
    flags.trackEvent('tools', 'interact', { action: 'duplicate_tool', toolId: settings.id });
    // API call to duplicate tool
  };

  const handleExport = () => {
    flags.trackEvent('tools', 'interact', { action: 'export_tool', toolId: settings.id });
    // Generate and download tool configuration
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#0F0F0F] to-[#1A1A1A]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.back()}
                className="text-[#A1A1AA] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {settings.name} Settings
                </h1>
                <p className="text-sm text-[#A1A1AA]">
                  {hasChanges ? '• Unsaved changes' : '• All changes saved'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]"
                disabled={!hasChanges}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Basic Information */}
        <SettingsSection
          title="Basic Information"
          description="Configure your tool's name, description, and metadata"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Tool Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSettings({ name: e.target.value })}
                className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FFD700]/50 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Description</label>
              <textarea
                value={settings.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateSettings({ description: e.target.value })}
                rows={3}
                className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FFD700]/50 focus:outline-none resize-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Category</label>
                <select
                  value={settings.metadata.category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateSettings({
                    metadata: { ...settings.metadata, category: e.target.value }
                  })}
                  className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FFD700]/50 focus:outline-none"
                >
                  <option value="communication">Communication</option>
                  <option value="productivity">Productivity</option>
                  <option value="academic">Academic</option>
                  <option value="creative">Creative</option>
                  <option value="data">Data & Analytics</option>
                  <option value="social">Social</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Version</label>
                <input
                  type="text"
                  value={settings.metadata.version}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSettings({
                    metadata: { ...settings.metadata, version: e.target.value }
                  })}
                  className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FFD700]/50 focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Tags</label>
              <input
                type="text"
                value={settings.metadata.tags.join(', ')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateSettings({
                  metadata: { ...settings.metadata, tags: e.target.value.split(', ').filter(tag => tag.trim()) }
                })}
                placeholder="polling, engagement, voting"
                className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-white focus:border-[#FFD700]/50 focus:outline-none"
              />
              <p className="text-xs text-[#A1A1AA] mt-1">Separate tags with commas</p>
            </div>
          </div>
        </SettingsSection>

        {/* Privacy & Access */}
        <SettingsSection
          title="Privacy & Access"
          description="Control who can see and use your tool"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#A1A1AA] mb-2">Privacy Level</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { value: 'personal', icon: Lock, label: 'Personal', desc: 'Only you can use this tool' },
                  { value: 'space', icon: Users, label: 'Space', desc: 'Available to spaces you choose' },
                  { value: 'public', icon: Globe, label: 'Public', desc: 'Available to everyone on HIVE' }
                ].map(option => {
                  const IconComponent = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => updateSettings({ privacy: option.value as any })}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        settings.privacy === option.value
                          ? 'bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]'
                          : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] text-white hover:bg-[rgba(255,255,255,0.04)]'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="h-5 w-5" />
                        <span className="font-medium">{option.label}</span>
                      </div>
                      <p className="text-xs text-[#A1A1AA]">{option.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SettingsSection>

        {/* Permissions */}
        <SettingsSection
          title="Permissions"
          description="Configure what others can do with your tool"
        >
          <div className="space-y-1 divide-y divide-[rgba(255,255,255,0.06)]">
            <ToggleSwitch
              enabled={settings.permissions.allowInstall}
              onToggle={(enabled) => updateSettings({
                permissions: { ...settings.permissions, allowInstall: enabled }
              })}
              label="Allow Installation"
              description="Let others install and use your tool in their spaces"
            />
            
            <ToggleSwitch
              enabled={settings.permissions.allowFork}
              onToggle={(enabled) => updateSettings({
                permissions: { ...settings.permissions, allowFork: enabled }
              })}
              label="Allow Forking"
              description="Let others create their own version based on your tool"
            />
            
            <ToggleSwitch
              enabled={settings.permissions.allowRating}
              onToggle={(enabled) => updateSettings({
                permissions: { ...settings.permissions, allowRating: enabled }
              })}
              label="Allow Ratings & Reviews"
              description="Let users rate and comment on your tool"
            />
            
            <ToggleSwitch
              enabled={settings.permissions.requireAuth}
              onToggle={(enabled) => updateSettings({
                permissions: { ...settings.permissions, requireAuth: enabled }
              })}
              label="Require Authentication"
              description="Only authenticated users can use your tool"
            />
          </div>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection
          title="Notifications"
          description="Choose when to receive notifications about your tool"
        >
          <div className="space-y-1 divide-y divide-[rgba(255,255,255,0.06)]">
            <ToggleSwitch
              enabled={settings.notifications.onInstall}
              onToggle={(enabled) => updateSettings({
                notifications: { ...settings.notifications, onInstall: enabled }
              })}
              label="Installation Notifications"
              description="Get notified when someone installs your tool"
            />
            
            <ToggleSwitch
              enabled={settings.notifications.onRating}
              onToggle={(enabled) => updateSettings({
                notifications: { ...settings.notifications, onRating: enabled }
              })}
              label="Rating Notifications"
              description="Get notified when someone rates your tool"
            />
            
            <ToggleSwitch
              enabled={settings.notifications.onComment}
              onToggle={(enabled) => updateSettings({
                notifications: { ...settings.notifications, onComment: enabled }
              })}
              label="Comment Notifications"
              description="Get notified when someone comments on your tool"
            />
            
            <ToggleSwitch
              enabled={settings.notifications.weeklyReport}
              onToggle={(enabled) => updateSettings({
                notifications: { ...settings.notifications, weeklyReport: enabled }
              })}
              label="Weekly Usage Report"
              description="Receive weekly analytics summary via email"
            />
          </div>
        </SettingsSection>

        {/* Usage Statistics */}
        <SettingsSection
          title="Usage Statistics"
          description="Current usage metrics for your tool"
        >
          <Grid columns={3} gap={4}>
            <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
              <div className="text-2xl font-bold text-[#FFD700] mb-1">{settings.usage.installCount}</div>
              <div className="text-sm text-[#A1A1AA]">Total Installs</div>
            </div>
            <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
              <div className="text-2xl font-bold text-[#FFD700] mb-1">{settings.usage.activeSpaces}</div>
              <div className="text-sm text-[#A1A1AA]">Active Spaces</div>
            </div>
            <div className="text-center p-4 bg-[rgba(255,255,255,0.02)] rounded-lg">
              <div className="text-2xl font-bold text-[#FFD700] mb-1">{settings.usage.totalUsage}</div>
              <div className="text-sm text-[#A1A1AA]">Total Usage</div>
            </div>
          </Grid>
        </SettingsSection>

        {/* Tool Actions */}
        <SettingsSection
          title="Tool Actions"
          description="Additional actions you can take with your tool"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={handleDuplicate}
              className="bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
            >
              <Copy className="h-4 w-4 mr-3" />
              Duplicate Tool
            </Button>
            
            <Button
              onClick={handleExport}
              className="bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
            >
              <Download className="h-4 w-4 mr-3" />
              Export Configuration
            </Button>
            
            <Button
              onClick={() => router.push(`/tools/${settings.id}`)}
              className="bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
            >
              <Share2 className="h-4 w-4 mr-3" />
              View Public Page
            </Button>
            
            <Button
              onClick={() => router.push(`/tools/${settings.id}/analytics`)}
              className="bg-[rgba(255,255,255,0.05)] text-white hover:bg-[rgba(255,255,255,0.1)] justify-start"
            >
              <Bell className="h-4 w-4 mr-3" />
              View Analytics
            </Button>
          </div>
        </SettingsSection>

        {/* Danger Zone */}
        <SettingsSection
          title="Danger Zone"
          description="Irreversible actions"
        >
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="text-white font-semibold mb-2">Delete Tool</h4>
                <p className="text-sm text-[#A1A1AA] mb-4">
                  Once you delete this tool, there is no going back. This will permanently remove the tool from all spaces and users who have installed it.
                </p>
                {!showDeleteConfirm ? (
                  <Button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Tool
                  </Button>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Yes, Delete Forever
                    </Button>
                    <Button
                      onClick={() => setShowDeleteConfirm(false)}
                      variant="outline"
                      className="border-[rgba(255,255,255,0.2)] text-[#A1A1AA]"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SettingsSection>
      </div>
    </div>
  );
}