"use client";

/**
 * HIVE Space Tool Deployment
 * Deploy HiveLab tools to specific spaces with permissions and configuration
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Tool, ElementInstance } from '@hive/core';
import { HiveCard } from '../hive-card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { LiveToolRuntime } from '../live-tool-runtime';
import { apiClient, ToolDeploymentConfig, apiUtils, Space } from '../../lib/api-client';
import { 
  Users,
  Lock,
  Globe,
  Eye,
  Settings,
  Play,
  Share2,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  ArrowLeft,
  Copy,
  ExternalLink
} from 'lucide-react';

// Import Space type from API client
// ToolDeploymentConfig imported from API client

interface ComponentToolDeploymentConfig {
  spaceId: string;
  permissions: {
    view: ('all' | 'member' | 'moderator' | 'admin')[];
    use: ('all' | 'member' | 'moderator' | 'admin')[];
    manage: ('admin' | 'moderator')[];
  };
  settings: {
    isActive: boolean;
    requirePermission: boolean;
    autoLaunch: boolean;
    maxConcurrentUsers?: number;
    allowAnonymous?: boolean;
    trackUsage: boolean;
  };
  customization: {
    displayName?: string;
    description?: string;
    category: 'productivity' | 'collaboration' | 'communication' | 'organization' | 'engagement' | 'academic';
    icon?: string;
  };
}

interface SpaceToolDeploymentProps {
  tool: Tool;
  availableSpaces?: Space[]; // Made optional, will be fetched if not provided
  onDeploy: (config: ComponentToolDeploymentConfig) => Promise<void>;
  onCancel: () => void;
  isDeploying?: boolean;
}

export const SpaceToolDeployment: React.FC<SpaceToolDeploymentProps> = ({
  tool,
  availableSpaces: propAvailableSpaces,
  onDeploy,
  onCancel,
  isDeploying = false
}) => {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('');
  const [availableSpaces, setAvailableSpaces] = useState<Space[]>(propAvailableSpaces || []);
  const [loadingSpaces, setLoadingSpaces] = useState(!propAvailableSpaces);
  const [spacesError, setSpacesError] = useState<string | null>(null);
  const [deploymentConfig, setDeploymentConfig] = useState<ComponentToolDeploymentConfig>({
    spaceId: '',
    permissions: {
      view: ['all'],
      use: ['member', 'moderator', 'admin'],
      manage: ['admin']
    },
    settings: {
      isActive: true,
      requirePermission: false,
      autoLaunch: false,
      trackUsage: true,
      allowAnonymous: (tool.config as any).allowAnonymous || false
    },
    customization: {
      displayName: tool.name,
      description: tool.description,
      category: 'productivity',
      icon: '🛠️'
    }
  });
  const [activeTab, setActiveTab] = useState<'spaces' | 'permissions' | 'settings' | 'preview'>('spaces');

  // Fetch available spaces if not provided
  useEffect(() => {
    if (!propAvailableSpaces) {
      fetchAvailableSpaces();
    }
  }, [propAvailableSpaces]);

  const fetchAvailableSpaces = async () => {
    try {
      setLoadingSpaces(true);
      setSpacesError(null);
      
      const response = await apiClient.getSpaces();
      const spaces = apiUtils.convertApiSpacesToProps(response.spaces || []);
      
      // Filter spaces where user can deploy tools (admin/moderator)
      const deployableSpaces = spaces.filter(space => 
        space.userRole === 'admin' || space.userRole === 'moderator'
      );
      
      setAvailableSpaces(deployableSpaces);
    } catch (error: any) {
      setSpacesError(apiUtils.handleApiError(error));
    } finally {
      setLoadingSpaces(false);
    }
  };

  // Update config when space is selected
  const handleSpaceSelect = useCallback((spaceId: string) => {
    setSelectedSpaceId(spaceId);
    setDeploymentConfig(prev => ({ ...prev, spaceId }));
  }, []);

  // Update permissions
  const updatePermissions = useCallback((type: keyof ComponentToolDeploymentConfig['permissions'], values: string[]) => {
    setDeploymentConfig(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [type]: values
      }
    }));
  }, []);

  // Update settings
  const updateSettings = useCallback((key: string, value: any) => {
    setDeploymentConfig(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    }));
  }, []);

  // Update customization
  const updateCustomization = useCallback((key: string, value: any) => {
    setDeploymentConfig(prev => ({
      ...prev,
      customization: {
        ...prev.customization,
        [key]: value
      }
    }));
  }, []);

  // Get selected space
  const selectedSpace = useMemo(() => 
    availableSpaces.find(space => space.id === selectedSpaceId),
    [availableSpaces, selectedSpaceId]
  );

  // Check if user can deploy to selected space
  const canDeploy = useMemo(() => {
    if (!selectedSpace) return false;
    return selectedSpace.userRole === 'admin' || selectedSpace.userRole === 'moderator';
  }, [selectedSpace]);

  // Handle deployment with real API
  const handleDeploy = useCallback(async () => {
    if (!selectedSpaceId || !canDeploy) return;

    try {
      // Convert component config to API format
      const apiDeploymentConfig: ToolDeploymentConfig = {
        toolId: tool.id,
        deployTo: 'space',
        targetId: selectedSpaceId,
        surface: 'tools',
        permissions: {
          canView: deploymentConfig.permissions.view.includes('all'),
          canInteract: deploymentConfig.permissions.use.length > 0,
          canEdit: deploymentConfig.permissions.manage.length > 0,
          allowedRoles: deploymentConfig.permissions.use.filter(role => role !== 'all'),
        },
        settings: {
          showInDirectory: deploymentConfig.settings.isActive,
          allowSharing: true,
          collectAnalytics: deploymentConfig.settings.trackUsage,
          notifyOnInteraction: false,
        },
        config: {
          displayName: deploymentConfig.customization.displayName,
          description: deploymentConfig.customization.description,
          category: deploymentConfig.customization.category,
          icon: deploymentConfig.customization.icon,
          autoLaunch: deploymentConfig.settings.autoLaunch,
          requirePermission: deploymentConfig.settings.requirePermission,
          maxConcurrentUsers: deploymentConfig.settings.maxConcurrentUsers,
        },
      };

      await apiClient.deployTool(apiDeploymentConfig);
      
      // Call the original onDeploy callback for any additional handling
      await onDeploy(deploymentConfig);
    } catch (error: any) {
      console.error('Deployment failed:', error);
      throw new Error(apiUtils.handleApiError(error));
    }
  }, [tool.id, selectedSpaceId, canDeploy, deploymentConfig, onDeploy]);

  // Permission options
  const permissionLevels = [
    { value: 'all', label: 'Everyone', icon: Globe },
    { value: 'member', label: 'Members', icon: Users },
    { value: 'moderator', label: 'Moderators', icon: Settings },
    { value: 'admin', label: 'Admins', icon: Lock }
  ];

  // Category options
  const categoryOptions = [
    { value: 'productivity', label: 'Productivity', color: 'bg-blue-500' },
    { value: 'collaboration', label: 'Collaboration', color: 'bg-green-500' },
    { value: 'communication', label: 'Communication', color: 'bg-orange-500' },
    { value: 'organization', label: 'Organization', color: 'bg-purple-500' },
    { value: 'engagement', label: 'Engagement', color: 'bg-pink-500' },
    { value: 'academic', label: 'Academic', color: 'bg-indigo-500' }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-[var(--hive-border-default)] p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
                Deploy Tool to Community
              </h2>
              <p className="text-sm text-[var(--hive-text-secondary)]">
                Share "{tool.name}" with your spaces
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleDeploy}
              disabled={!canDeploy || isDeploying}
              className="bg-[var(--hive-primary)] text-white"
            >
              {isDeploying ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Deploy Tool
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[var(--hive-border-default)] px-6">
        <div className="flex space-x-6">
          {[
            { id: 'spaces', label: 'Select Space', icon: Users },
            { id: 'permissions', label: 'Permissions', icon: Lock },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'preview', label: 'Preview', icon: Eye }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]'
                    : 'border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab === 'spaces' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Choose a Space
              </h3>
              <p className="text-[var(--hive-text-secondary)] mb-6">
                Select which space you'd like to deploy this tool to. You can only deploy to spaces where you have admin or moderator permissions.
              </p>
            </div>

            {/* Loading State */}
            {loadingSpaces && (
              <div className="flex items-center justify-center py-8">
                <Clock className="w-6 h-6 animate-spin text-[var(--hive-primary)] mr-3" />
                <span className="text-[var(--hive-text-secondary)]">Loading your spaces...</span>
              </div>
            )}

            {/* Error State */}
            {spacesError && (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-[var(--hive-text-primary)] font-medium mb-2">Failed to load spaces</p>
                  <p className="text-[var(--hive-text-secondary)] mb-4">{spacesError}</p>
                  <Button variant="outline" onClick={fetchAvailableSpaces}>
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loadingSpaces && !spacesError && availableSpaces.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                <p className="text-[var(--hive-text-primary)] font-medium mb-2">No spaces available</p>
                <p className="text-[var(--hive-text-secondary)]">
                  You need admin or moderator permissions to deploy tools to spaces.
                </p>
              </div>
            )}

            {/* Spaces Grid */}
            {!loadingSpaces && !spacesError && availableSpaces.length > 0 && (
              <div className="grid gap-4">
                {availableSpaces.map(space => {
                const canDeployToSpace = space.userRole === 'admin' || space.userRole === 'moderator';
                const isSelected = selectedSpaceId === space.id;

                return (
                  <HiveCard
                    key={space.id}
                    className={`p-4 cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                        : canDeployToSpace 
                          ? 'hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-background-tertiary)]'
                          : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canDeployToSpace && handleSpaceSelect(space.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-[var(--hive-text-primary)]">
                            {space.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {space.type === 'public' ? (
                              <Globe className="w-4 h-4 text-green-500" />
                            ) : space.type === 'private' ? (
                              <Lock className="w-4 h-4 text-red-500" />
                            ) : (
                              <Eye className="w-4 h-4 text-orange-500" />
                            )}
                            <span className="text-xs px-2 py-1 rounded-full bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]">
                              {space.userRole}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-[var(--hive-text-secondary)] mb-2">
                          {space.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-[var(--hive-text-tertiary)]">
                          <span>{space.memberCount} members</span>
                          <span>#{space.category}</span>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <CheckCircle className="w-5 h-5 text-[var(--hive-primary)]" />
                      )}
                      
                      {!canDeployToSpace && (
                        <AlertCircle className="w-5 h-5 text-[var(--hive-text-tertiary)]" />
                      )}
                    </div>
                  </HiveCard>
                );
                })}
              </div>
            )}

            {availableSpaces.filter(s => s.userRole === 'admin' || s.userRole === 'moderator').length === 0 && (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                <h3 className="font-medium text-[var(--hive-text-primary)] mb-2">
                  No Available Spaces
                </h3>
                <p className="text-[var(--hive-text-secondary)]">
                  You need admin or moderator permissions to deploy tools to spaces.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                Tool Permissions
              </h3>
              <p className="text-[var(--hive-text-secondary)]">
                Configure who can view, use, and manage this tool in the selected space.
              </p>
            </div>

            {selectedSpace ? (
              <div className="space-y-6">
                {Object.entries(deploymentConfig.permissions).map(([type, selectedValues]) => (
                  <div key={type}>
                    <Label className="text-sm font-medium text-[var(--hive-text-primary)] mb-3 block">
                      Who can {type} this tool?
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {permissionLevels.map(level => {
                        const Icon = level.icon;
                        const isSelected = selectedValues.includes(level.value as any);
                        const isDisabled = type === 'manage' && (level.value === 'all' || level.value === 'member');
                        const isValidPermissionLevel = level.value === 'admin' || level.value === 'moderator';

                        return (
                          <button
                            key={level.value}
                            onClick={() => {
                              if (isDisabled) return;
                              const newValues = isSelected 
                                ? selectedValues.filter(v => v !== level.value)
                                : [...selectedValues, level.value];
                              updatePermissions(type as keyof ComponentToolDeploymentConfig['permissions'], newValues);
                            }}
                            disabled={isDisabled}
                            className={`p-3 rounded-lg border transition-all duration-200 flex items-center space-x-3 ${
                              isSelected
                                ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10 text-[var(--hive-primary)]'
                                : isDisabled
                                  ? 'border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] cursor-not-allowed opacity-50'
                                  : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="font-medium">{level.label}</span>
                            {isSelected && <CheckCircle className="w-4 h-4 ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                <p className="text-[var(--hive-text-secondary)]">
                  Please select a space first to configure permissions.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                Tool Settings
              </h3>
              <p className="text-[var(--hive-text-secondary)]">
                Configure how this tool behaves in the selected space.
              </p>
            </div>

            <div className="space-y-6">
              {/* Customization */}
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Customization</h4>
                
                <div>
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={deploymentConfig.customization.displayName || ''}
                    onChange={(e) => updateCustomization('displayName', e.target.value)}
                    placeholder={tool.name}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={deploymentConfig.customization.description || ''}
                    onChange={(e) => updateCustomization('description', e.target.value)}
                    placeholder={tool.description}
                    className="w-full p-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={deploymentConfig.customization.category}
                    onValueChange={(value) => updateCustomization('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${option.color}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Behavior Settings */}
              <div className="space-y-4">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Behavior</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Active by Default</Label>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Tool will be immediately available to space members
                      </p>
                    </div>
                    <Checkbox
                      checked={deploymentConfig.settings.isActive}
                      onCheckedChange={(checked) => updateSettings('isActive', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Require Permission</Label>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Members need approval before using this tool
                      </p>
                    </div>
                    <Checkbox
                      checked={deploymentConfig.settings.requirePermission}
                      onCheckedChange={(checked) => updateSettings('requirePermission', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Track Usage</Label>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        Collect analytics and usage statistics
                      </p>
                    </div>
                    <Checkbox
                      checked={deploymentConfig.settings.trackUsage}
                      onCheckedChange={(checked) => updateSettings('trackUsage', checked)}
                    />
                  </div>

                  {(tool.config as any).allowAnonymous && (
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Allow Anonymous Use</Label>
                        <p className="text-sm text-[var(--hive-text-secondary)]">
                          Non-members can use this tool
                        </p>
                      </div>
                      <Checkbox
                        checked={deploymentConfig.settings.allowAnonymous}
                        onCheckedChange={(checked) => updateSettings('allowAnonymous', checked)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">
                Tool Preview
              </h3>
              <p className="text-[var(--hive-text-secondary)]">
                Preview how this tool will appear and function in the selected space.
              </p>
            </div>

            {selectedSpace ? (
              <div className="space-y-6">
                {/* Tool Card Preview */}
                <div>
                  <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
                    Space Tools List Preview
                  </h4>
                  <HiveCard className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 ${categoryOptions.find(c => c.value === deploymentConfig.customization.category)?.color || 'bg-blue-500'} rounded-lg flex items-center justify-center text-2xl`}>
                          {deploymentConfig.customization.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-[var(--hive-text-primary)]">
                              {deploymentConfig.customization.displayName || tool.name}
                            </h3>
                            <span className="text-xs px-2 py-1 rounded-full bg-[var(--hive-primary)]/20 text-[var(--hive-primary)]">
                              custom
                            </span>
                          </div>
                          <p className="text-sm text-[var(--hive-text-secondary)] mb-2">
                            {deploymentConfig.customization.description || tool.description}
                          </p>
                          <span className="text-xs px-2 py-1 rounded bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] capitalize">
                            {deploymentConfig.customization.category}
                          </span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${deploymentConfig.settings.isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[var(--hive-border-default)]">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" className="bg-[var(--hive-primary)] text-white">
                          <Play className="w-4 h-4 mr-1" />
                          Launch
                        </Button>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </HiveCard>
                </div>

                {/* Live Tool Preview */}
                <div>
                  <h4 className="font-medium text-[var(--hive-text-primary)] mb-3">
                    Tool Functionality Preview
                  </h4>
                  <LiveToolRuntime
                    tool={tool}
                    readOnly={true}
                    className="border border-[var(--hive-border-default)]"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Eye className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                <p className="text-[var(--hive-text-secondary)]">
                  Select a space to preview the tool deployment.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};