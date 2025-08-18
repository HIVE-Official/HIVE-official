"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Tool Permissions Manager
 * Comprehensive interface for managing tool permissions and access control
 */
import { useState, useCallback, useMemo } from 'react';
import { HiveCard } from '../hive-card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Checkbox } from '../../ui/checkbox';
import { Badge } from '../../ui/badge';
import { Users, Lock, Globe, Eye, Settings, Shield, AlertCircle, CheckCircle, Crown, Star, UserCheck, UserX, Clock, Plus, Trash2, Edit, Save, X } from 'lucide-react';
export const ToolPermissionsManager = ({ tool, currentConfig, spaceMembers, onConfigChange, onSave, userRole, isLoading = false }) => {
    const [config, setConfig] = useState(currentConfig);
    const [activeTab, setActiveTab] = useState('general');
    const [showAddUser, setShowAddUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [saving, setSaving] = useState(false);
    // Permission action definitions
    const permissionActions = [
        { key: 'view', label: 'View Tool', description: 'See the tool in the space', icon: Eye },
        { key: 'use', label: 'Use Tool', description: 'Launch and interact with the tool', icon: Settings },
        { key: 'manage', label: 'Manage Tool', description: 'Configure tool settings', icon: Shield },
        { key: 'edit', label: 'Edit Tool', description: 'Modify tool structure and elements', icon: Edit },
        { key: 'delete', label: 'Delete Tool', description: 'Remove tool from space', icon: Trash2 },
        { key: 'share', label: 'Share Tool', description: 'Share tool with other spaces', icon: Globe }
    ];
    // Role definitions
    const roleDefinitions = [
        { key: 'admin', label: 'Admins', description: 'Space administrators', icon: Crown, color: 'text-red-500' },
        { key: 'moderator', label: 'Moderators', description: 'Space moderators', icon: Star, color: 'text-orange-500' },
        { key: 'member', label: 'Members', description: 'Regular space members', icon: Users, color: 'text-blue-500' }
    ];
    // Check if user can modify permissions
    const canModifyPermissions = userRole === 'admin' || (userRole === 'moderator' && !config.restrictions.requireApproval);
    // Update config
    const updateConfig = useCallback((updates) => {
        const newConfig = { ...config, ...updates };
        setConfig(newConfig);
        onConfigChange(newConfig);
    }, [config, onConfigChange]);
    // Update role permissions
    const updateRolePermissions = useCallback((role, permissions, restrictions) => {
        const newRolePermissions = config.rolePermissions.map(rp => rp.role === role ? { ...rp, permissions, restrictions: restrictions || rp.restrictions } : rp);
        if (!newRolePermissions.find(rp => rp.role === role)) {
            newRolePermissions.push({ role, permissions, restrictions });
        }
        updateConfig({ rolePermissions: newRolePermissions });
    }, [config.rolePermissions, updateConfig]);
    // Add user permission
    const addUserPermission = useCallback((userId, permissions) => {
        const user = spaceMembers.find(m => m.id === userId);
        if (!user)
            return;
        const newUserPermission = {
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
    const removeUserPermission = useCallback((userId) => {
        updateConfig({
            userPermissions: config.userPermissions.filter(up => up.userId !== userId)
        });
    }, [config.userPermissions, updateConfig]);
    // Handle save
    const handleSave = useCallback(async () => {
        setSaving(true);
        try {
            await onSave(config);
        }
        catch (error) {
            console.error('Failed to save permissions:', error);
        }
        finally {
            setSaving(false);
        }
    }, [config, onSave]);
    // Filter available users for adding
    const availableUsers = useMemo(() => {
        return spaceMembers.filter(member => !config.userPermissions.find(up => up.userId === member.id) &&
            (searchQuery === '' ||
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.handle.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [spaceMembers, config.userPermissions, searchQuery]);
    // Get role permissions
    const getRolePermissions = useCallback((role) => {
        return config.rolePermissions.find(rp => rp.role === role)?.permissions || [];
    }, [config.rolePermissions]);
    if (isLoading) {
        return (_jsx(HiveCard, { className: "p-6", children: _jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "w-8 h-8 bg-[var(--hive-primary)] rounded-lg animate-pulse" }) }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] flex items-center space-x-2", children: [_jsx(Shield, { className: "w-5 h-5 text-[var(--hive-primary)]" }), _jsx("span", { children: "Tool Permissions" })] }), _jsxs("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: ["Manage access control for \"", tool.name, "\""] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: config.isPublic ? 'default' : 'secondary', className: "text-xs", children: config.isPublic ? 'Public Tool' : 'Private Tool' }), _jsx(Button, { onClick: handleSave, disabled: saving || !canModifyPermissions, className: "bg-[var(--hive-primary)] text-white", children: saving ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 mr-2 animate-spin border-2 border-white/30 border-t-white rounded-full" }), "Saving"] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "w-4 h-4 mr-2" }), "Save Changes"] })) })] })] }), _jsx("div", { className: "border-b border-[var(--hive-border-default)]", children: _jsx("div", { className: "flex space-x-6", children: [
                        { id: 'general', label: 'General', icon: Settings },
                        { id: 'roles', label: 'Role Permissions', icon: Users },
                        { id: 'users', label: 'User Permissions', icon: UserCheck },
                        { id: 'restrictions', label: 'Restrictions', icon: Lock },
                        { id: 'schedule', label: 'Schedule', icon: Clock }
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]'
                                : 'border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: tab.label })] }, tab.id));
                    }) }) }), _jsxs("div", { className: "space-y-6", children: [activeTab === 'general' && (_jsxs("div", { className: "space-y-6", children: [_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "General Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Public Tool" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Allow everyone in the space to discover this tool" })] }), _jsx(Checkbox, { checked: config.isPublic, onCheckedChange: (checked) => updateConfig({ isPublic: !!checked }), disabled: !canModifyPermissions })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Track Usage" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Collect analytics and usage statistics" })] }), _jsx(Checkbox, { checked: config.restrictions.trackUsage, onCheckedChange: (checked) => updateConfig({
                                                            restrictions: { ...config.restrictions, trackUsage: !!checked }
                                                        }), disabled: !canModifyPermissions })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Allow Sharing" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Members can share this tool with other spaces" })] }), _jsx(Checkbox, { checked: config.restrictions.allowSharing, onCheckedChange: (checked) => updateConfig({
                                                            restrictions: { ...config.restrictions, allowSharing: !!checked }
                                                        }), disabled: !canModifyPermissions })] })] })] }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Default Permissions" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-4", children: "These permissions apply to all users unless overridden by role or user-specific permissions." }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: permissionActions.map(action => {
                                            const Icon = action.icon;
                                            const isGranted = config.defaultPermissions.includes(action.key);
                                            return (_jsx("div", { className: `p-4 rounded-lg border transition-all duration-200 ${isGranted
                                                    ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                                                    : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)]'}`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx(Icon, { className: `w-5 h-5 mt-0.5 ${isGranted ? 'text-[var(--hive-primary)]' : 'text-[var(--hive-text-secondary)]'}` }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: action.label }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: action.description })] })] }), _jsx(Checkbox, { checked: isGranted, onCheckedChange: (checked) => {
                                                                const newPermissions = checked
                                                                    ? [...config.defaultPermissions, action.key]
                                                                    : config.defaultPermissions.filter(p => p !== action.key);
                                                                updateConfig({ defaultPermissions: newPermissions });
                                                            }, disabled: !canModifyPermissions })] }) }, action.key));
                                        }) })] })] })), activeTab === 'roles' && (_jsx("div", { className: "space-y-6", children: roleDefinitions.map(role => {
                            const Icon = role.icon;
                            const permissions = getRolePermissions(role.key);
                            return (_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx(Icon, { className: `w-5 h-5 ${role.color}` }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: role.label }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: role.description })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: permissionActions.map(action => {
                                            const ActionIcon = action.icon;
                                            const isGranted = permissions.includes(action.key);
                                            return (_jsx("button", { onClick: () => {
                                                    if (!canModifyPermissions)
                                                        return;
                                                    const newPermissions = isGranted
                                                        ? permissions.filter(p => p !== action.key)
                                                        : [...permissions, action.key];
                                                    updateRolePermissions(role.key, newPermissions);
                                                }, disabled: !canModifyPermissions, className: `p-3 rounded-lg border transition-all duration-200 text-left ${isGranted
                                                    ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10 text-[var(--hive-primary)]'
                                                    : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'} ${!canModifyPermissions ? 'opacity-50 cursor-not-allowed' : ''}`, children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx(ActionIcon, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: action.label }), isGranted && _jsx(CheckCircle, { className: "w-4 h-4 ml-auto" })] }) }, action.key));
                                        }) })] }, role.key));
                        }) })), activeTab === 'users' && (_jsxs("div", { className: "space-y-6", children: [_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "User-Specific Permissions" }), _jsxs(Button, { size: "sm", onClick: () => setShowAddUser(true), disabled: !canModifyPermissions, children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add User"] })] }), config.userPermissions.length === 0 ? (_jsxs("div", { className: "text-center py-8", children: [_jsx(UserCheck, { className: "w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "No user-specific permissions set. All users inherit role-based permissions." })] })) : (_jsx("div", { className: "space-y-3", children: config.userPermissions.map(userPerm => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-[var(--hive-background-secondary)] rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center", children: _jsx(Users, { className: "w-5 h-5 text-[var(--hive-primary)]" }) }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: userPerm.userName }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["@", userPerm.userHandle] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "flex flex-wrap gap-1", children: userPerm.permissions.map(permission => (_jsx(Badge, { variant: "secondary", className: "text-xs", children: permission }, permission))) }), canModifyPermissions && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeUserPermission(userPerm.userId), className: "text-red-500 hover:text-red-400", children: _jsx(UserX, { className: "w-4 h-4" }) }))] })] }, userPerm.userId))) }))] }), showAddUser && (_jsx("div", { className: "fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4", children: _jsxs(HiveCard, { className: "w-full max-w-2xl max-h-[80vh] overflow-hidden", children: [_jsx("div", { className: "border-b border-[var(--hive-border-default)] p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Add User Permission" }), _jsx(Button, { variant: "ghost", onClick: () => {
                                                            setShowAddUser(false);
                                                            setSearchQuery('');
                                                        }, children: _jsx(X, { className: "w-4 h-4" }) })] }) }), _jsxs("div", { className: "p-6 space-y-4 overflow-y-auto max-h-[60vh]", children: [_jsxs("div", { children: [_jsx(Label, { children: "Search Users" }), _jsx(Input, { type: "text", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name or handle...", className: "mt-1" })] }), _jsx("div", { className: "space-y-2", children: availableUsers.map(user => (_jsxs("div", { className: "flex items-center justify-between p-3 rounded-lg border border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] transition-colors", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-primary)]/20 rounded-full flex items-center justify-center", children: _jsx(Users, { className: "w-4 h-4 text-[var(--hive-primary)]" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-[var(--hive-text-primary)]", children: user.name }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["@", user.handle, " \u2022 ", user.role] })] })] }), _jsx(Button, { size: "sm", onClick: () => addUserPermission(user.id, ['view', 'use']), children: "Add" })] }, user.id))) }), availableUsers.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(UserX, { className: "w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: searchQuery ? 'No users found matching your search.' : 'All users already have specific permissions set.' })] }))] })] }) }))] })), activeTab === 'restrictions' && (_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Usage Restrictions" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "maxUsers", children: "Maximum Concurrent Users" }), _jsx(Input, { id: "maxUsers", type: "number", value: config.restrictions.maxConcurrentUsers || '', onChange: (e) => updateConfig({
                                                    restrictions: {
                                                        ...config.restrictions,
                                                        maxConcurrentUsers: e.target.value ? parseInt(e.target.value) : undefined
                                                    }
                                                }), placeholder: "No limit", disabled: !canModifyPermissions, className: "mt-1" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: "Limit how many users can use the tool simultaneously" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Allow Anonymous Users" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Non-space members can use this tool if they have the link" })] }), _jsx(Checkbox, { checked: config.restrictions.allowAnonymous, onCheckedChange: (checked) => updateConfig({
                                                    restrictions: { ...config.restrictions, allowAnonymous: !!checked }
                                                }), disabled: !canModifyPermissions })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Require Approval" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Users must request permission before using this tool" })] }), _jsx(Checkbox, { checked: config.restrictions.requireApproval, onCheckedChange: (checked) => updateConfig({
                                                    restrictions: { ...config.restrictions, requireApproval: !!checked }
                                                }), disabled: !canModifyPermissions })] })] })] })), activeTab === 'schedule' && (_jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Access Schedule" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Enable Scheduled Access" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Restrict tool access to specific times and days" })] }), _jsx(Checkbox, { checked: config.schedule?.enabled || false, onCheckedChange: (checked) => updateConfig({
                                                    schedule: { ...config.schedule, enabled: !!checked }
                                                }), disabled: !canModifyPermissions })] }), config.schedule?.enabled && (_jsxs("div", { className: "space-y-4 pl-6 border-l-2 border-[var(--hive-border-default)]", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "startTime", children: "Start Time" }), _jsx(Input, { id: "startTime", type: "time", value: config.schedule?.allowedHours?.start || '', onChange: (e) => updateConfig({
                                                                    schedule: {
                                                                        ...config.schedule,
                                                                        allowedHours: {
                                                                            ...config.schedule?.allowedHours,
                                                                            start: e.target.value,
                                                                            end: config.schedule?.allowedHours?.end || '23:59'
                                                                        }
                                                                    }
                                                                }), disabled: !canModifyPermissions, className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "endTime", children: "End Time" }), _jsx(Input, { id: "endTime", type: "time", value: config.schedule?.allowedHours?.end || '', onChange: (e) => updateConfig({
                                                                    schedule: {
                                                                        ...config.schedule,
                                                                        allowedHours: {
                                                                            start: config.schedule?.allowedHours?.start || '00:00',
                                                                            end: e.target.value,
                                                                            ...config.schedule?.allowedHours
                                                                        }
                                                                    }
                                                                }), disabled: !canModifyPermissions, className: "mt-1" })] })] }), _jsxs("div", { children: [_jsx(Label, { children: "Allowed Days" }), _jsx("div", { className: "grid grid-cols-7 gap-2 mt-2", children: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                                                            const dayValue = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                                                            const isSelected = config.schedule?.allowedDays?.includes(dayValue) || false;
                                                            return (_jsx("button", { onClick: () => {
                                                                    if (!canModifyPermissions)
                                                                        return;
                                                                    const currentDays = config.schedule?.allowedDays || [];
                                                                    const newDays = isSelected
                                                                        ? currentDays.filter(d => d !== dayValue)
                                                                        : [...currentDays, dayValue];
                                                                    updateConfig({
                                                                        schedule: { ...config.schedule, allowedDays: newDays }
                                                                    });
                                                                }, disabled: !canModifyPermissions, className: `p-2 text-sm rounded-lg border transition-colors ${isSelected
                                                                    ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)] text-white'
                                                                    : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'} ${!canModifyPermissions ? 'opacity-50 cursor-not-allowed' : ''}`, children: day }, day));
                                                        }) })] })] }))] })] }))] }), !canModifyPermissions && (_jsxs("div", { className: "flex items-center space-x-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-orange-500" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Limited Permissions" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "You need admin permissions to modify tool access control settings." })] })] }))] }));
};
//# sourceMappingURL=tool-permissions-manager.js.map