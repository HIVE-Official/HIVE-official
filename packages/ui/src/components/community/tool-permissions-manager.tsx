"use client";

/**
 * HIVE Tool Permissions Manager
 * Comprehensive interface for managing tool permissions and access control
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Tool } from '@hive/core';
import { HiveCard } from '../hive-card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { 
  Users,
  Lock,
  Globe,
  Eye,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle,
  Crown,
  Star,
  UserCheck,
  UserX,
  Clock,
  Activity,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  Save,
  X
} from 'lucide-react';

// Permission levels
type PermissionLevel = 'all' | 'member' | 'moderator' | 'admin' | 'custom';
type PermissionAction = 'view' | 'use' | 'manage' | 'edit' | 'delete' | 'share';

interface UserPermission {
  userId: string;
  userName: string;
  userHandle: string;
  avatar?: string;
  permissions: PermissionAction[];
  grantedBy: string;
  grantedAt: string;
  expiresAt?: string;
}

interface RolePermission {
  role: 'admin' | 'moderator' | 'member';
  permissions: PermissionAction[];
  restrictions?: {
    timeLimit?: number; // minutes
    usageLimit?: number; // uses per day/week
    requireApproval?: boolean;
  };
}

interface ToolPermissionConfig {
  toolId: string;
  spaceId: string;
  isPublic: boolean;
  defaultPermissions: PermissionAction[];
  rolePermissions: RolePermission[];
  userPermissions: UserPermission[];
  restrictions: {
    maxConcurrentUsers?: number;
    allowAnonymous?: boolean;
    requireApproval?: boolean;
    allowSharing?: boolean;
    trackUsage: boolean;
  };
  schedule?: {
    enabled: boolean;
    allowedHours?: { start: string; end: string };
    allowedDays?: string[];
    timezone?: string;
  };
}

interface ToolPermissionsManagerProps {
  tool: Tool;
  currentConfig: ToolPermissionConfig;
  spaceMembers: Array<{
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role: 'admin' | 'moderator' | 'member';
    joinedAt: string;
  }>;
  onConfigChange: (config: ToolPermissionConfig) => void;
  onSave: (config: ToolPermissionConfig) => Promise<void>;
  userRole: 'admin' | 'moderator' | 'member';
  isLoading?: boolean;
}

export const ToolPermissionsManager: React.FC<ToolPermissionsManagerProps> = ({
  tool,
  currentConfig,
  spaceMembers,
  onConfigChange,
  onSave,
  userRole,
  isLoading = false
}) => {
  const [config, setConfig] = useState<ToolPermissionConfig>(currentConfig);
  const [activeTab, setActiveTab] = useState<'general' | 'roles' | 'users' | 'restrictions' | 'schedule'>('general');
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  // Permission action definitions
  const permissionActions = [
    { key: 'view' as const, label: 'View Tool', description: 'See the tool in the space', icon: Eye },
    { key: 'use' as const, label: 'Use Tool', description: 'Launch and interact with the tool', icon: Settings },
    { key: 'manage' as const, label: 'Manage Tool', description: 'Configure tool settings', icon: Shield },
    { key: 'edit' as const, label: 'Edit Tool', description: 'Modify tool structure and elements', icon: Edit },
    { key: 'delete' as const, label: 'Delete Tool', description: 'Remove tool from space', icon: Trash2 },
    { key: 'share' as const, label: 'Share Tool', description: 'Share tool with other spaces', icon: Globe }
  ];

  // Role definitions
  const roleDefinitions = [
    { key: 'admin' as const, label: 'Admins', description: 'Space administrators', icon: Crown, color: 'text-red-500' },
    { key: 'moderator' as const, label: 'Moderators', description: 'Space moderators', icon: Star, color: 'text-orange-500' },
    { key: 'member' as const, label: 'Members', description: 'Regular space members', icon: Users, color: 'text-blue-500' }
  ];

  // Check if user can modify permissions
  const canModifyPermissions = userRole === 'admin' || (userRole === 'moderator' && !config.restrictions.requireApproval);

  // Update config
  const updateConfig = useCallback((updates: Partial<ToolPermissionConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange(newConfig);
  }, [config, onConfigChange]);

  // Update role permissions
  const updateRolePermissions = useCallback((role: 'admin' | 'moderator' | 'member', permissions: PermissionAction[], restrictions?: RolePermission['restrictions']) => {
    const newRolePermissions = config.rolePermissions.map(rp => 
      rp.role === role ? { ...rp, permissions, restrictions: restrictions || rp.restrictions } : rp
    );
    
    if (!newRolePermissions.find(rp => rp.role === role)) {
      newRolePermissions.push({ role, permissions, restrictions });
    }

    updateConfig({ rolePermissions: newRolePermissions });
  }, [config.rolePermissions, updateConfig]);

  // Add user permission
  const addUserPermission = useCallback((userId: string, permissions: PermissionAction[]) => {
    const user = spaceMembers.find(m => m.id === userId);
    if (!user) return;

    const newUserPermission: UserPermission = {
      userId,
      userName: user.name,
      userHandle: user.handle,
      avatar: user.avatar,
      permissions,
      grantedBy: 'current-user', // Should be actual current user ID
      grantedAt: new Date().toISOString()
    };

    updateConfig({ 
      userPermissions: [...config.userPermissions.filter(up => up.userId !== userId), newUserPermission] 
    });
    setShowAddUser(false);
  }, [spaceMembers, config.userPermissions, updateConfig]);

  // Remove user permission
  const removeUserPermission = useCallback((userId: string) => {
    updateConfig({ 
      userPermissions: config.userPermissions.filter(up => up.userId !== userId) 
    });
  }, [config.userPermissions, updateConfig]);

  // Handle save
  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await onSave(config);
    } catch (error) {
      console.error('Failed to save permissions:', error);
    } finally {
      setSaving(false);
    }
  }, [config, onSave]);

  // Filter available users for adding
  const availableUsers = useMemo(() => {
    return spaceMembers.filter(member => 
      !config.userPermissions.find(up => up.userId === member.id) &&
      (searchQuery === '' || 
       member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       member.handle.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [spaceMembers, config.userPermissions, searchQuery]);

  // Get role permissions
  const getRolePermissions = useCallback((role: 'admin' | 'moderator' | 'member') => {
    return config.rolePermissions.find(rp => rp.role === role)?.permissions || [];
  }, [config.rolePermissions]);

  if (isLoading) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="w-8 h-8 bg-[var(--hive-primary)] rounded-lg animate-pulse" />
        </div>
      </HiveCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[var(--hive-primary)]" />
            <span>Tool Permissions</span>
          </h2>
          <p className="text-[var(--hive-text-secondary)] mt-1">
            Manage access control for "{tool.name}"
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge 
            variant={config.isPublic ? 'default' : 'secondary'} 
            className="text-xs"
          >
            {config.isPublic ? 'Public Tool' : 'Private Tool'}
          </Badge>
          <Button 
            onClick={handleSave} 
            disabled={saving || !canModifyPermissions}
            className="bg-[var(--hive-primary)] text-white"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin border-2 border-white/30 border-t-white rounded-full" />
                Saving
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

      {/* Tab Navigation */}
      <div className="border-b border-[var(--hive-border-default)]">
        <div className="flex space-x-6">
          {[
            { id: 'general', label: 'General', icon: Settings },
            { id: 'roles', label: 'Role Permissions', icon: Users },
            { id: 'users', label: 'User Permissions', icon: UserCheck },
            { id: 'restrictions', label: 'Restrictions', icon: Lock },
            { id: 'schedule', label: 'Schedule', icon: Clock }
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
      <div className="space-y-6">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <HiveCard className="p-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                General Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Public Tool</Label>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Allow everyone in the space to discover this tool
                    </p>
                  </div>
                  <Checkbox
                    checked={config.isPublic}
                    onCheckedChange={(checked) => updateConfig({ isPublic: !!checked })}
                    disabled={!canModifyPermissions}
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
                    checked={config.restrictions.trackUsage}
                    onCheckedChange={(checked) => updateConfig({ 
                      restrictions: { ...config.restrictions, trackUsage: !!checked }
                    })}
                    disabled={!canModifyPermissions}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Allow Sharing</Label>
                    <p className="text-sm text-[var(--hive-text-secondary)]">
                      Members can share this tool with other spaces
                    </p>
                  </div>
                  <Checkbox
                    checked={config.restrictions.allowSharing}
                    onCheckedChange={(checked) => updateConfig({ 
                      restrictions: { ...config.restrictions, allowSharing: !!checked }
                    })}
                    disabled={!canModifyPermissions}
                  />
                </div>
              </div>
            </HiveCard>

            {/* Default Permissions */}
            <HiveCard className="p-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
                Default Permissions
              </h3>
              <p className="text-sm text-[var(--hive-text-secondary)] mb-4">
                These permissions apply to all users unless overridden by role or user-specific permissions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissionActions.map(action => {
                  const Icon = action.icon;
                  const isGranted = config.defaultPermissions.includes(action.key);
                  
                  return (
                    <div
                      key={action.key}
                      className={`p-4 rounded-lg border transition-all duration-200 ${
                        isGranted
                          ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                          : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)]'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Icon className={`w-5 h-5 mt-0.5 ${isGranted ? 'text-[var(--hive-primary)]' : 'text-[var(--hive-text-secondary)]'}`} />
                          <div>
                            <h4 className="font-medium text-[var(--hive-text-primary)]">
                              {action.label}
                            </h4>
                            <p className="text-sm text-[var(--hive-text-secondary)]">
                              {action.description}
                            </p>
                          </div>
                        </div>
                        <Checkbox
                          checked={isGranted}
                          onCheckedChange={(checked) => {
                            const newPermissions = checked
                              ? [...config.defaultPermissions, action.key]
                              : config.defaultPermissions.filter(p => p !== action.key);
                            updateConfig({ defaultPermissions: newPermissions });
                          }}
                          disabled={!canModifyPermissions}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </HiveCard>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-6">
            {roleDefinitions.map(role => {
              const Icon = role.icon;
              const permissions = getRolePermissions(role.key);
              
              return (
                <HiveCard key={role.key} className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className={`w-5 h-5 ${role.color}`} />
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                        {role.label}
                      </h3>
                      <p className="text-sm text-[var(--hive-text-secondary)]">
                        {role.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {permissionActions.map(action => {
                      const ActionIcon = action.icon;
                      const isGranted = permissions.includes(action.key);
                      
                      return (
                        <button
                          key={action.key}
                          onClick={() => {
                            if (!canModifyPermissions) return;
                            const newPermissions = isGranted
                              ? permissions.filter(p => p !== action.key)
                              : [...permissions, action.key];
                            updateRolePermissions(role.key, newPermissions);
                          }}
                          disabled={!canModifyPermissions}
                          className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                            isGranted
                              ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10 text-[var(--hive-primary)]'
                              : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'
                          } ${!canModifyPermissions ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <div className="flex items-center space-x-3">
                            <ActionIcon className="w-4 h-4" />
                            <span className="font-medium">{action.label}</span>
                            {isGranted && <CheckCircle className="w-4 h-4 ml-auto" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </HiveCard>
              );
            })}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Add User */}
            <HiveCard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                  User-Specific Permissions
                </h3>
                <Button 
                  size="sm" 
                  onClick={() => setShowAddUser(true)}
                  disabled={!canModifyPermissions}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
              
              {config.userPermissions.length === 0 ? (
                <div className="text-center py-8">
                  <UserCheck className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                  <p className="text-[var(--hive-text-secondary)]">
                    No user-specific permissions set. All users inherit role-based permissions.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {config.userPermissions.map(userPerm => (
                    <div
                      key={userPerm.userId}
                      className="flex items-center justify-between p-4 bg-[var(--hive-background-secondary)] rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-[var(--hive-primary)]" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[var(--hive-text-primary)]">
                            {userPerm.userName}
                          </h4>
                          <p className="text-sm text-[var(--hive-text-secondary)]">
                            @{userPerm.userHandle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-wrap gap-1">
                          {userPerm.permissions.map(permission => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                        
                        {canModifyPermissions && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUserPermission(userPerm.userId)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <UserX className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </HiveCard>

            {/* Add User Modal */}
            {showAddUser && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <HiveCard className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
                  <div className="border-b border-[var(--hive-border-default)] p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                        Add User Permission
                      </h3>
                      <Button variant="ghost" onClick={() => {
                        setShowAddUser(false);
                        setSearchQuery('');
                      }}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
                    <div>
                      <Label>Search Users</Label>
                      <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name or handle..."
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {availableUsers.map(user => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-3 rounded-lg border border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-[var(--hive-primary)]" />
                            </div>
                            <div>
                              <p className="font-medium text-[var(--hive-text-primary)]">
                                {user.name}
                              </p>
                              <p className="text-sm text-[var(--hive-text-secondary)]">
                                @{user.handle} • {user.role}
                              </p>
                            </div>
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => addUserPermission(user.id, ['view', 'use'])}
                          >
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    {availableUsers.length === 0 && (
                      <div className="text-center py-8">
                        <UserX className="w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" />
                        <p className="text-[var(--hive-text-secondary)]">
                          {searchQuery ? 'No users found matching your search.' : 'All users already have specific permissions set.'}
                        </p>
                      </div>
                    )}
                  </div>
                </HiveCard>
              </div>
            )}
          </div>
        )}

        {activeTab === 'restrictions' && (
          <HiveCard className="p-6">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
              Usage Restrictions
            </h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="maxUsers">Maximum Concurrent Users</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  value={config.restrictions.maxConcurrentUsers || ''}
                  onChange={(e) => updateConfig({
                    restrictions: {
                      ...config.restrictions,
                      maxConcurrentUsers: e.target.value ? parseInt(e.target.value) : undefined
                    }
                  })}
                  placeholder="No limit"
                  disabled={!canModifyPermissions}
                  className="mt-1"
                />
                <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
                  Limit how many users can use the tool simultaneously
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Allow Anonymous Users</Label>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    Non-space members can use this tool if they have the link
                  </p>
                </div>
                <Checkbox
                  checked={config.restrictions.allowAnonymous}
                  onCheckedChange={(checked) => updateConfig({
                    restrictions: { ...config.restrictions, allowAnonymous: !!checked }
                  })}
                  disabled={!canModifyPermissions}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Require Approval</Label>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    Users must request permission before using this tool
                  </p>
                </div>
                <Checkbox
                  checked={config.restrictions.requireApproval}
                  onCheckedChange={(checked) => updateConfig({
                    restrictions: { ...config.restrictions, requireApproval: !!checked }
                  })}
                  disabled={!canModifyPermissions}
                />
              </div>
            </div>
          </HiveCard>
        )}

        {activeTab === 'schedule' && (
          <HiveCard className="p-6">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">
              Access Schedule
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="font-medium">Enable Scheduled Access</Label>
                  <p className="text-sm text-[var(--hive-text-secondary)]">
                    Restrict tool access to specific times and days
                  </p>
                </div>
                <Checkbox
                  checked={config.schedule?.enabled || false}
                  onCheckedChange={(checked) => updateConfig({
                    schedule: { ...config.schedule, enabled: !!checked }
                  })}
                  disabled={!canModifyPermissions}
                />
              </div>

              {config.schedule?.enabled && (
                <div className="space-y-4 pl-6 border-l-2 border-[var(--hive-border-default)]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={config.schedule?.allowedHours?.start || ''}
                        onChange={(e) => updateConfig({
                          schedule: {
                            ...config.schedule,
                            allowedHours: {
                              ...config.schedule?.allowedHours,
                              start: e.target.value,
                              end: config.schedule?.allowedHours?.end || '23:59'
                            }
                          }
                        })}
                        disabled={!canModifyPermissions}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={config.schedule?.allowedHours?.end || ''}
                        onChange={(e) => updateConfig({
                          schedule: {
                            ...config.schedule,
                            allowedHours: {
                              start: config.schedule?.allowedHours?.start || '00:00',
                              end: e.target.value,
                              ...config.schedule?.allowedHours
                            }
                          }
                        })}
                        disabled={!canModifyPermissions}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Allowed Days</Label>
                    <div className="grid grid-cols-7 gap-2 mt-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                        const dayValue = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                        const isSelected = config.schedule?.allowedDays?.includes(dayValue) || false;
                        
                        return (
                          <button
                            key={day}
                            onClick={() => {
                              if (!canModifyPermissions) return;
                              const currentDays = config.schedule?.allowedDays || [];
                              const newDays = isSelected
                                ? currentDays.filter(d => d !== dayValue)
                                : [...currentDays, dayValue];
                              updateConfig({
                                schedule: { ...config.schedule, allowedDays: newDays }
                              });
                            }}
                            disabled={!canModifyPermissions}
                            className={`p-2 text-sm rounded-lg border transition-colors ${
                              isSelected
                                ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)] text-white'
                                : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'
                            } ${!canModifyPermissions ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </HiveCard>
        )}
      </div>

      {/* Insufficient Permissions Warning */}
      {!canModifyPermissions && (
        <div className="flex items-center space-x-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <div>
            <p className="text-sm font-medium text-[var(--hive-text-primary)]">
              Limited Permissions
            </p>
            <p className="text-sm text-[var(--hive-text-secondary)]">
              You need admin permissions to modify tool access control settings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};