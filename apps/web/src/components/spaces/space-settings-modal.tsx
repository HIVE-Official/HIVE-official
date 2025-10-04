'use client';

import { useState } from 'react';
import {
  Settings,
  Users,
  Shield,
  Trash2,
  Image,
  Globe,
  Lock,
  UserPlus,
  Edit,
  Save,
  X,
  AlertTriangle,
  Crown,
  Archive,
  Download,
  Upload,
  Palette,
  Bell,
  Ban,
  MessageSquare
} from 'lucide-react';
import {
  Dialog,
  Button,
  Input,
  Card,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@hive/ui';
import type { Space } from '@hive/core';

interface SpaceSettingsModalProps {
  space: Space;
  isOpen: boolean;
  onClose: () => void;
}

interface SpaceSettings {
  name: string;
  description: string;
  isPrivate: boolean;
  allowInvites: boolean;
  requireApproval: boolean;
  allowGuestPosts: boolean;
  slowMode: number;
  defaultNotifications: boolean;
  customEmojis: boolean;
  bannerUrl?: string;
  primaryColor?: string;
  welcomeMessage?: string;
}

export function SpaceSettingsModal({ space, isOpen, onClose }: SpaceSettingsModalProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<SpaceSettings>({
    name: space.name,
    description: space.description,
    isPrivate: false, // Default to public
    allowInvites: true,
    requireApproval: false,
    allowGuestPosts: false,
    slowMode: 0,
    defaultNotifications: true,
    customEmojis: false,
    bannerUrl: space.bannerUrl,
    primaryColor: '#F59E0B', // hive-gold
    welcomeMessage: ''
  });

  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/spaces/${space.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        onClose();
        window.location.reload(); // Refresh to show changes
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSpace = async () => {
    if (deleteConfirm !== space.name) return;

    try {
      const response = await fetch(`/api/spaces/${space.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        window.location.href = '/spaces';
      }
    } catch (error) {
      console.error('Failed to delete space:', error);
    }
  };

  const updateSettings = (updates: Partial<SpaceSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="max-w-4xl max-h-[90vh]">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-[var(--hive-brand-primary)]" />
              <div>
                <h2 className="text-2xl font-bold text-white">Space Settings</h2>
                <p className="text-gray-400">Manage {space.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-800 bg-gray-950/50">
              <TabsList className="flex flex-col w-full h-full bg-transparent p-4 space-y-2">
                <TabsTrigger
                  value="general"
                  className="w-full justify-start data-[state=active]:bg-[var(--hive-brand-primary)]/10 data-[state=active]:text-[var(--hive-brand-primary)]"
                >
                  <Edit className="w-4 h-4 mr-3" />
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="w-full justify-start data-[state=active]:bg-[var(--hive-brand-primary)]/10 data-[state=active]:text-[var(--hive-brand-primary)]"
                >
                  <Lock className="w-4 h-4 mr-3" />
                  Privacy & Access
                </TabsTrigger>
                <TabsTrigger
                  value="moderation"
                  className="w-full justify-start data-[state=active]:bg-[var(--hive-brand-primary)]/10 data-[state=active]:text-[var(--hive-brand-primary)]"
                >
                  <Shield className="w-4 h-4 mr-3" />
                  Moderation
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="w-full justify-start data-[state=active]:bg-[var(--hive-brand-primary)]/10 data-[state=active]:text-[var(--hive-brand-primary)]"
                >
                  <Palette className="w-4 h-4 mr-3" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="w-full justify-start data-[state=active]:bg-[var(--hive-brand-primary)]/10 data-[state=active]:text-[var(--hive-brand-primary)]"
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value="danger"
                  className="w-full justify-start data-[state=active]:bg-red-500/10 data-[state=active]:text-red-400"
                >
                  <AlertTriangle className="w-4 h-4 mr-3" />
                  Danger Zone
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
              <TabsContent value="general" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Space Name</label>
                      <Input
                        value={settings.name}
                        onChange={(e: React.ChangeEvent) => updateSettings({ name: (e.target as HTMLInputElement).value })}
                        placeholder="Enter space name"
                        maxLength={50}
                      />
                      <p className="text-xs text-gray-400 mt-1">{settings.name.length}/50 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Description</label>
                      <textarea
                        value={settings.description}
                        onChange={(e: React.ChangeEvent) => updateSettings({ description: (e.target as HTMLInputElement).value })}
                        placeholder="Describe your space"
                        maxLength={500}
                        rows={4}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[var(--hive-brand-primary)] focus:outline-none resize-none"
                      />
                      <p className="text-xs text-gray-400 mt-1">{settings.description.length}/500 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Welcome Message</label>
                      <textarea
                        value={settings.welcomeMessage}
                        onChange={(e: React.ChangeEvent) => updateSettings({ welcomeMessage: (e.target as HTMLInputElement).value })}
                        placeholder="Message shown to new members (optional)"
                        maxLength={200}
                        rows={3}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[var(--hive-brand-primary)] focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Space Icon & Banner</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-gray-800/50 border-gray-700">
                      <div className="text-center">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h4 className="font-medium text-white mb-2">Space Icon</h4>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Icon
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gray-800/50 border-gray-700">
                      <div className="text-center">
                        <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <h4 className="font-medium text-white mb-2">Cover Banner</h4>
                        <Button variant="outline" size="sm">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Banner
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Privacy Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Private Space</div>
                        <div className="text-sm text-gray-400">Only members can see the space and its content</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.isPrivate}
                        onChange={(e: React.ChangeEvent) => updateSettings({ isPrivate: e.target.checked })}
                        className="w-4 h-4 text-[var(--hive-brand-primary)] bg-gray-700 border-gray-600 rounded focus:ring-[var(--hive-brand-primary)]"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Require Approval</div>
                        <div className="text-sm text-gray-400">New members must be approved by admins</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.requireApproval}
                        onChange={(e: React.ChangeEvent) => updateSettings({ requireApproval: e.target.checked })}
                        className="w-4 h-4 text-[var(--hive-brand-primary)] bg-gray-700 border-gray-600 rounded focus:ring-[var(--hive-brand-primary)]"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Member Invites</div>
                        <div className="text-sm text-gray-400">Allow members to invite others</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.allowInvites}
                        onChange={(e: React.ChangeEvent) => updateSettings({ allowInvites: e.target.checked })}
                        className="w-4 h-4 text-[var(--hive-brand-primary)] bg-gray-700 border-gray-600 rounded focus:ring-[var(--hive-brand-primary)]"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="moderation" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Moderation Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Slow Mode</div>
                        <div className="text-sm text-gray-400">Limit how often members can post</div>
                      </div>
                      <select
                        value={settings.slowMode}
                        onChange={(e: React.ChangeEvent) => updateSettings({ slowMode: Number((e.target as HTMLInputElement).value) })}
                        className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      >
                        <option value={0}>Off</option>
                        <option value={5}>5 seconds</option>
                        <option value={15}>15 seconds</option>
                        <option value={30}>30 seconds</option>
                        <option value={60}>1 minute</option>
                        <option value={300}>5 minutes</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Guest Posts</div>
                        <div className="text-sm text-gray-400">Allow non-members to post in public spaces</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.allowGuestPosts}
                        onChange={(e: React.ChangeEvent) => updateSettings({ allowGuestPosts: e.target.checked })}
                        className="w-4 h-4 text-[var(--hive-brand-primary)] bg-gray-700 border-gray-600 rounded focus:ring-[var(--hive-brand-primary)]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Content Filters</h3>
                  <Card className="p-4 bg-gray-800/50 border-gray-700">
                    <p className="text-gray-400 text-sm">
                      Automatic content filtering is enabled for all spaces.
                      Content that violates community guidelines will be automatically flagged for review.
                    </p>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Space Theme</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Primary Color</label>
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-lg border border-gray-600"
                          style={{ backgroundColor: settings.primaryColor }}
                        />
                        <Input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e: React.ChangeEvent) => updateSettings({ primaryColor: (e.target as HTMLInputElement).value })}
                          className="w-20"
                        />
                        <span className="text-gray-400">{settings.primaryColor}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">Custom Emojis</div>
                        <div className="text-sm text-gray-400">Allow space-specific emoji reactions</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.customEmojis}
                        onChange={(e: React.ChangeEvent) => updateSettings({ customEmojis: e.target.checked })}
                        className="w-4 h-4 text-[var(--hive-brand-primary)] bg-gray-700 border-gray-600 rounded focus:ring-[var(--hive-brand-primary)]"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Default Notification Settings</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium text-white">New Member Notifications</div>
                        <div className="text-sm text-gray-400">Members get notified by default for new posts</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.defaultNotifications}
                        onChange={(e: React.ChangeEvent) => updateSettings({ defaultNotifications: e.target.checked })}
                        className="w-4 h-4 text-[var(--hive-brand-primary)] bg-gray-700 border-gray-600 rounded focus:ring-[var(--hive-brand-primary)]"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="danger" className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>

                  <div className="space-y-4">
                    <Card className="p-4 border-red-500/20 bg-red-500/5">
                      <div className="flex items-start space-x-3">
                        <Archive className="w-5 h-5 text-red-400 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-2">Archive Space</h4>
                          <p className="text-sm text-gray-400 mb-3">
                            Archive this space. It will be hidden from discovery but data will be preserved.
                          </p>
                          <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                            Archive Space
                          </Button>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 border-red-500/20 bg-red-500/5">
                      <div className="flex items-start space-x-3">
                        <Trash2 className="w-5 h-5 text-red-400 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-2">Delete Space</h4>
                          <p className="text-sm text-gray-400 mb-3">
                            Permanently delete this space and all its content. This action cannot be undone.
                          </p>

                          {!showDeleteWarning ? (
                            <Button
                              variant="outline"
                              className="border-red-500 text-red-400 hover:bg-red-500/10"
                              onClick={() => setShowDeleteWarning(true)}
                            >
                              Delete Space
                            </Button>
                          ) : (
                            <div className="space-y-3">
                              <div className="p-3 border border-red-500/20 bg-red-500/10 rounded-lg flex items-start space-x-2">
                                <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-red-400">This action is irreversible!</p>
                                  <p className="text-sm text-red-300">
                                    Type <strong>{space.name}</strong> to confirm deletion.
                                  </p>
                                </div>
                              </div>

                              <Input
                                value={deleteConfirm}
                                onChange={(e: React.ChangeEvent) => setDeleteConfirm((e.target as HTMLInputElement).value)}
                                placeholder={`Type "${space.name}" to confirm`}
                                className="border-red-500/50"
                              />

                              <div className="flex space-x-2">
                                <Button
                                  onClick={handleDeleteSpace}
                                  disabled={deleteConfirm !== space.name}
                                  className="bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                                >
                                  Delete Forever
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setShowDeleteWarning(false);
                                    setDeleteConfirm('');
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800 bg-gray-950/50">
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}