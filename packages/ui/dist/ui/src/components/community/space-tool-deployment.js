"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * HIVE Space Tool Deployment
 * Deploy HiveLab tools to specific spaces with permissions and configuration
 */
import { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { LiveToolRuntime } from '../live-tool-runtime.js';
import { apiClient, apiUtils } from '../../lib/api-client.js';
import { Users, Lock, Globe, Eye, Settings, Play, Share2, AlertCircle, CheckCircle, Clock, Zap, ArrowLeft } from 'lucide-react';
export const SpaceToolDeployment = ({ tool, availableSpaces: propAvailableSpaces, onDeploy, onCancel, isDeploying = false }) => {
    const [selectedSpaceId, setSelectedSpaceId] = useState('');
    const [availableSpaces, setAvailableSpaces] = useState(propAvailableSpaces || []);
    const [loadingSpaces, setLoadingSpaces] = useState(!propAvailableSpaces);
    const [spacesError, setSpacesError] = useState(null);
    const [deploymentConfig, setDeploymentConfig] = useState({
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
            allowAnonymous: tool.config.allowAnonymous || false
        },
        customization: {
            displayName: tool.name,
            description: tool.description,
            category: 'productivity',
            icon: '🛠️'
        }
    });
    const [activeTab, setActiveTab] = useState('spaces');
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
            const deployableSpaces = spaces.filter(space => space.userRole === 'admin' || space.userRole === 'moderator');
            setAvailableSpaces(deployableSpaces);
        }
        catch (error) {
            setSpacesError(apiUtils.handleApiError(error));
        }
        finally {
            setLoadingSpaces(false);
        }
    };
    // Update config when space is selected
    const handleSpaceSelect = useCallback((spaceId) => {
        setSelectedSpaceId(spaceId);
        setDeploymentConfig(prev => ({ ...prev, spaceId }));
    }, []);
    // Update permissions
    const updatePermissions = useCallback((type, values) => {
        setDeploymentConfig(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [type]: values
            }
        }));
    }, []);
    // Update settings
    const updateSettings = useCallback((key, value) => {
        setDeploymentConfig(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                [key]: value
            }
        }));
    }, []);
    // Update customization
    const updateCustomization = useCallback((key, value) => {
        setDeploymentConfig(prev => ({
            ...prev,
            customization: {
                ...prev.customization,
                [key]: value
            }
        }));
    }, []);
    // Get selected space
    const selectedSpace = useMemo(() => availableSpaces.find(space => space.id === selectedSpaceId), [availableSpaces, selectedSpaceId]);
    // Check if user can deploy to selected space
    const canDeploy = useMemo(() => {
        if (!selectedSpace)
            return false;
        return selectedSpace.userRole === 'admin' || selectedSpace.userRole === 'moderator';
    }, [selectedSpace]);
    // Handle deployment with real API
    const handleDeploy = useCallback(async () => {
        if (!selectedSpaceId || !canDeploy)
            return;
        try {
            // Convert component config to API format
            const apiDeploymentConfig = {
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
        }
        catch (error) {
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
    return (_jsxs("div", { className: "h-full flex flex-col", children: [_jsx("div", { className: "border-b border-[var(--hive-border-default)] p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("button", { onClick: onCancel, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Deploy Tool to Community" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Share \"", tool.name, "\" with your spaces"] })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Button, { variant: "secondary", onClick: onCancel, children: "Cancel" }), _jsx(Button, { onClick: handleDeploy, disabled: !canDeploy || isDeploying, className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]", children: isDeploying ? (_jsxs(_Fragment, { children: [_jsx(Clock, { className: "w-4 h-4 mr-2 animate-spin" }), "Deploying..."] })) : (_jsxs(_Fragment, { children: [_jsx(Zap, { className: "w-4 h-4 mr-2" }), "Deploy Tool"] })) })] })] }) }), _jsx("div", { className: "border-b border-[var(--hive-border-default)] px-6", children: _jsx("div", { className: "flex space-x-6", children: [
                        { id: 'spaces', label: 'Select Space', icon: Users },
                        { id: 'permissions', label: 'Permissions', icon: Lock },
                        { id: 'settings', label: 'Settings', icon: Settings },
                        { id: 'preview', label: 'Preview', icon: Eye }
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: `flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-[var(--hive-primary)] text-[var(--hive-primary)]'
                                : 'border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: tab.label })] }, tab.id));
                    }) }) }), _jsxs("div", { className: "flex-1 p-6 overflow-y-auto", children: [activeTab === 'spaces' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Choose a Space" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-6", children: "Select which space you'd like to deploy this tool to. You can only deploy to spaces where you have admin or moderator permissions." })] }), loadingSpaces && (_jsxs("div", { className: "flex items-center justify-center py-8", children: [_jsx(Clock, { className: "w-6 h-6 animate-spin text-[var(--hive-primary)] mr-3" }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Loading your spaces..." })] })), spacesError && (_jsx("div", { className: "flex items-center justify-center py-8", children: _jsxs("div", { className: "text-center", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-primary)] font-medium mb-2", children: "Failed to load spaces" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-4", children: spacesError }), _jsx(Button, { variant: "secondary", onClick: fetchAvailableSpaces, children: "Retry" })] }) })), !loadingSpaces && !spacesError && availableSpaces.length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(Users, { className: "w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-primary)] font-medium mb-2", children: "No spaces available" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "You need admin or moderator permissions to deploy tools to spaces." })] })), !loadingSpaces && !spacesError && availableSpaces.length > 0 && (_jsx("div", { className: "grid gap-4", children: availableSpaces.map(space => {
                                    const canDeployToSpace = space.userRole === 'admin' || space.userRole === 'moderator';
                                    const isSelected = selectedSpaceId === space.id;
                                    return (_jsx(Card, { className: `p-4 cursor-pointer transition-all duration-200 ${isSelected
                                            ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10'
                                            : canDeployToSpace
                                                ? 'hover:border-[var(--hive-border-hover)] hover:bg-[var(--hive-background-tertiary)]'
                                                : 'opacity-50 cursor-not-allowed'}`, onClick: () => canDeployToSpace && handleSpaceSelect(space.id), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-3 mb-2", children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)]", children: space.name }), _jsxs("div", { className: "flex items-center space-x-2", children: [space.type === 'public' ? (_jsx(Globe, { className: "w-4 h-4 text-green-500" })) : space.type === 'private' ? (_jsx(Lock, { className: "w-4 h-4 text-red-500" })) : (_jsx(Eye, { className: "w-4 h-4 text-orange-500" })), _jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]", children: space.userRole })] })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-2", children: space.description }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-[var(--hive-text-tertiary)]", children: [_jsxs("span", { children: [space.memberCount, " members"] }), _jsxs("span", { children: ["#", space.category] })] })] }), isSelected && (_jsx(CheckCircle, { className: "w-5 h-5 text-[var(--hive-primary)]" })), !canDeployToSpace && (_jsx(AlertCircle, { className: "w-5 h-5 text-[var(--hive-text-tertiary)]" }))] }) }, space.id));
                                }) })), availableSpaces.filter(s => s.userRole === 'admin' || s.userRole === 'moderator').length === 0 && (_jsxs("div", { className: "text-center py-8", children: [_jsx(Lock, { className: "w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-2", children: "No Available Spaces" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "You need admin or moderator permissions to deploy tools to spaces." })] }))] })), activeTab === 'permissions' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Tool Permissions" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Configure who can view, use, and manage this tool in the selected space." })] }), selectedSpace ? (_jsx("div", { className: "space-y-6", children: Object.entries(deploymentConfig.permissions).map(([type, selectedValues]) => (_jsxs("div", { children: [_jsxs(Label, { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3 block", children: ["Who can ", type, " this tool?"] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: permissionLevels.map(level => {
                                                const Icon = level.icon;
                                                const isSelected = selectedValues.includes(level.value);
                                                const isDisabled = type === 'manage' && (level.value === 'all' || level.value === 'member');
                                                const isValidPermissionLevel = level.value === 'admin' || level.value === 'moderator';
                                                return (_jsxs("button", { onClick: () => {
                                                        if (isDisabled)
                                                            return;
                                                        const newValues = isSelected
                                                            ? selectedValues.filter(v => v !== level.value)
                                                            : [...selectedValues, level.value];
                                                        updatePermissions(type, newValues);
                                                    }, disabled: isDisabled, className: `p-3 rounded-lg border transition-all duration-200 flex items-center space-x-3 ${isSelected
                                                        ? 'border-[var(--hive-primary)] bg-[var(--hive-primary)]/10 text-[var(--hive-primary)]'
                                                        : isDisabled
                                                            ? 'border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] cursor-not-allowed opacity-50'
                                                            : 'border-[var(--hive-border-default)] hover:border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]'}`, children: [_jsx(Icon, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: level.label }), isSelected && _jsx(CheckCircle, { className: "w-4 h-4 ml-auto" })] }, level.value));
                                            }) })] }, type))) })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(AlertCircle, { className: "w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Please select a space first to configure permissions." })] }))] })), activeTab === 'settings' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Tool Settings" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Configure how this tool behaves in the selected space." })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Customization" }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "displayName", children: "Display Name" }), _jsx(Input, { id: "displayName", value: deploymentConfig.customization.displayName || '', onChange: (e) => updateCustomization('displayName', e.target.value), placeholder: tool.name })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx("textarea", { id: "description", value: deploymentConfig.customization.description || '', onChange: (e) => updateCustomization('description', e.target.value), placeholder: tool.description, className: "w-full p-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] resize-none", rows: 3 })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "category", children: "Category" }), _jsxs(Select, { value: deploymentConfig.customization.category, onValueChange: (value) => updateCustomization('category', value), children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: categoryOptions.map(option => (_jsx(SelectItem, { value: option.value, children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: `w-3 h-3 rounded-full ${option.color}` }), _jsx("span", { children: option.label })] }) }, option.value))) })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Behavior" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Active by Default" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Tool will be immediately available to space members" })] }), _jsx(CheckboxEnhanced, { checked: deploymentConfig.settings.isActive, onCheckedChange: (checked) => updateSettings('isActive', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Require Permission" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Members need approval before using this tool" })] }), _jsx(CheckboxEnhanced, { checked: deploymentConfig.settings.requirePermission, onCheckedChange: (checked) => updateSettings('requirePermission', checked) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Track Usage" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Collect analytics and usage statistics" })] }), _jsx(CheckboxEnhanced, { checked: deploymentConfig.settings.trackUsage, onCheckedChange: (checked) => updateSettings('trackUsage', checked) })] }), tool.config.allowAnonymous && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { className: "font-medium", children: "Allow Anonymous Use" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Non-members can use this tool" })] }), _jsx(CheckboxEnhanced, { checked: deploymentConfig.settings.allowAnonymous, onCheckedChange: (checked) => updateSettings('allowAnonymous', checked) })] }))] })] })] })] })), activeTab === 'preview' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Tool Preview" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Preview how this tool will appear and function in the selected space." })] }), selectedSpace ? (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Space Tools List Preview" }), _jsxs(Card, { className: "p-4", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `w-12 h-12 ${categoryOptions.find(c => c.value === deploymentConfig.customization.category)?.color || 'bg-blue-500'} rounded-lg flex items-center justify-center text-2xl`, children: deploymentConfig.customization.icon }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-[var(--hive-text-primary)]", children: deploymentConfig.customization.displayName || tool.name }), _jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-[var(--hive-primary)]/20 text-[var(--hive-primary)]", children: "custom" })] }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] mb-2", children: deploymentConfig.customization.description || tool.description }), _jsx("span", { className: "text-xs px-2 py-1 rounded bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] capitalize", children: deploymentConfig.customization.category })] })] }), _jsx("div", { className: `w-2 h-2 rounded-full ${deploymentConfig.settings.isActive ? 'bg-green-500' : 'bg-gray-500'}` })] }), _jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-[var(--hive-border-default)]", children: [_jsx("div", { className: "flex items-center space-x-2", children: _jsxs(Button, { size: "sm", className: "bg-[var(--hive-primary)] text-[var(--hive-text-inverse)]", children: [_jsx(Play, { className: "w-4 h-4 mr-1" }), "Launch"] }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Share2, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "w-4 h-4" }) })] })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "Tool Functionality Preview" }), _jsx(LiveToolRuntime, { tool: tool, readOnly: true, className: "border border-[var(--hive-border-default)]" })] })] })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(Eye, { className: "w-12 h-12 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Select a space to preview the tool deployment." })] }))] }))] })] }));
};
//# sourceMappingURL=space-tool-deployment.js.map