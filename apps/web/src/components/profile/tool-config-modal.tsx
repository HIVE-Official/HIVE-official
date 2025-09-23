"use client";

import { useState } from 'react';
import {
  HiveModal,
  HiveModalHeader,
  HiveModalTitle,
  HiveModalDescription,
  HiveModalContent,
  Button,
  Card,
  Switch,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@hive/ui';
import { 
  Settings, 
  Shield, 
  Bell, 
  Share2, 
  Trash2,
  Key,
  Activity,
  BarChart3,
  Check
} from 'lucide-react';

interface ToolPermission {
  id: string;
  name: string;
  description: string;
  required: boolean;
  granted: boolean;
}

interface ToolConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (_config: ToolConfiguration) => Promise<void>;
  onUninstall?: () => Promise<void>;
  tool: {
    id: string;
    name: string;
    description: string;
    icon: any;
    version: string;
    isCustom?: boolean;
    permissions: ToolPermission[];
    settings: Record<string, any>;
    usageStats?: {
      timesUsed: number;
      lastUsed: string;
      avgSessionLength: number;
    };
  };
}

interface ToolConfiguration {
  permissions: Record<string, boolean>;
  settings: Record<string, any>;
  notifications: {
    updates: boolean;
    usage: boolean;
    sharing: boolean;
  };
  sharing: {
    allowSpaceSharing: boolean;
    allowPublicSharing: boolean;
    shareUsageStats: boolean;
  };
}

export function ToolConfigModal({
  isOpen,
  onClose,
  onSave,
  onUninstall,
  tool
}: ToolConfigModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<ToolConfiguration>({
    permissions: tool.permissions.reduce((acc, perm) => ({
      ...acc,
      [perm.id]: perm.granted
    }), {}),
    settings: tool.settings,
    notifications: {
      updates: true,
      usage: false,
      sharing: true
    },
    sharing: {
      allowSpaceSharing: true,
      allowPublicSharing: false,
      shareUsageStats: false
    }
  });

  const IconComponent = tool.icon;

  const handlePermissionChange = (permId: string, granted: boolean) => {
    setConfig(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permId]: granted
      }
    }));
  };

  const handleNotificationChange = (key: keyof ToolConfiguration['notifications'], value: boolean) => {
    setConfig(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleSharingChange = (key: keyof ToolConfiguration['sharing'], value: boolean) => {
    setConfig(prev => ({
      ...prev,
      sharing: {
        ...prev.sharing,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(config);
      onClose();
    } catch (error) {
      console.error('Failed to save tool configuration:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const requiredPermissions = tool.permissions.filter(p => p.required);
  const optionalPermissions = tool.permissions.filter(p => !p.required);

  return (
    <HiveModal
      open={isOpen}
      onOpenChange={onClose}
    >
      <HiveModalHeader>
        <HiveModalTitle>Configure {tool.name}</HiveModalTitle>
        <HiveModalDescription>Version {tool.version} • {tool.isCustom ? 'Custom Tool' : 'Marketplace Tool'}</HiveModalDescription>
      </HiveModalHeader>
      <HiveModalContent>
        <div className="p-6">
          <Tabs defaultValue="permissions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="permissions" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Permissions</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="sharing" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Sharing</span>
              </TabsTrigger>
              <TabsTrigger value="usage" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Usage</span>
              </TabsTrigger>
            </TabsList>

            {/* Permissions Tab */}
            <TabsContent value="permissions" className="space-y-4">
              {requiredPermissions.length > 0 && (
                <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
                    <Key className="h-4 w-4" />
                    <span>Required Permissions</span>
                  </h3>
                  <div className="space-y-3">
                    {requiredPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{permission.name}</div>
                          <div className="text-sm text-hive-text-mutedLight">{permission.description}</div>
                        </div>
                        <Badge variant="sophomore" className="text-xs">
                          Required
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {optionalPermissions.length > 0 && (
                <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Optional Permissions</span>
                  </h3>
                  <div className="space-y-3">
                    {optionalPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{permission.name}</div>
                          <div className="text-sm text-hive-text-mutedLight">{permission.description}</div>
                        </div>
                        <Switch
                          checked={config.permissions[permission.id] || false}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked)}
                        />
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4">
              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Notification Preferences</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Tool Updates</div>
                      <div className="text-sm text-hive-text-mutedLight">Get notified when the tool is updated</div>
                    </div>
                    <Switch
                      checked={config.notifications.updates}
                      onCheckedChange={(checked) => handleNotificationChange('updates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Usage Reminders</div>
                      <div className="text-sm text-hive-text-mutedLight">Remind you to use this tool regularly</div>
                    </div>
                    <Switch
                      checked={config.notifications.usage}
                      onCheckedChange={(checked) => handleNotificationChange('usage', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Sharing Activity</div>
                      <div className="text-sm text-hive-text-mutedLight">Notify when others interact with your shared tools</div>
                    </div>
                    <Switch
                      checked={config.notifications.sharing}
                      onCheckedChange={(checked) => handleNotificationChange('sharing', checked)}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Sharing Tab */}
            <TabsContent value="sharing" className="space-y-4">
              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Sharing Settings</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Allow Space Sharing</div>
                      <div className="text-sm text-hive-text-mutedLight">Let others in your spaces use this tool</div>
                    </div>
                    <Switch
                      checked={config.sharing.allowSpaceSharing}
                      onCheckedChange={(checked) => handleSharingChange('allowSpaceSharing', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Public Sharing</div>
                      <div className="text-sm text-hive-text-mutedLight">Make this tool discoverable by all HIVE users</div>
                    </div>
                    <Switch
                      checked={config.sharing.allowPublicSharing}
                      onCheckedChange={(checked) => handleSharingChange('allowPublicSharing', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Share Usage Stats</div>
                      <div className="text-sm text-hive-text-mutedLight">Allow others to see how often you use this tool</div>
                    </div>
                    <Switch
                      checked={config.sharing.shareUsageStats}
                      onCheckedChange={(checked) => handleSharingChange('shareUsageStats', checked)}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Usage Stats Tab */}
            <TabsContent value="usage" className="space-y-4">
              {tool.usageStats ? (
                <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                  <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Usage Statistics</span>
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-hive-gold">{tool.usageStats.timesUsed}</div>
                      <div className="text-sm text-hive-text-mutedLight">Times Used</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{tool.usageStats.avgSessionLength}m</div>
                      <div className="text-sm text-hive-text-mutedLight">Avg Session</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {new Date(tool.usageStats.lastUsed).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-hive-text-mutedLight">Last Used</div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="text-center py-8 text-hive-text-mutedLight">
                  <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No usage data available yet</p>
                  <p className="text-sm">Use this tool to see your statistics</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex items-center justify-between w-full px-6 py-4 border-t border-white/10">
          <div>
            {onUninstall && !tool.isCustom && (
              <Button
                variant="secondary"
                onClick={onUninstall}
                className="border-red-500 text-red-400 hover:bg-red-500/10"
                disabled={isSaving}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Uninstall
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              {isSaving ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </HiveModalContent>
    </HiveModal>
  );
}