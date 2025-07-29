import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { Badge } from '../../atomic/atoms/badge';
import { Input } from '../../atomic/atoms/input';
import { Avatar } from '../../atomic/atoms/avatar';
import { Settings, Shield, Lock, Globe, Edit3, Trash2, Save, X, Plus, Check, AlertTriangle, Upload, FileText, Image, Video, Link, Calendar, Hash, Star, UserPlus, Ban, Flag, Archive, Bell, MessageSquare, BarChart3, MoreVertical, RefreshCw, Download as DownloadIcon } from 'lucide-react';
const meta = {
    title: '07-Spaces/Administrative',
    parameters: {
        docs: {
            description: {
                component: 'Comprehensive administrative components for HIVE Spaces - Settings, privacy controls, content management, and moderation tools with kitchen sink variants',
            },
        },
    },
};
export default meta;
// Mock data for comprehensive testing
const mockSpaceSettings = {
    id: 'space123',
    name: 'Computer Science Study Group',
    handle: 'cs-study-group',
    description: 'A collaborative space for computer science students to share resources, discuss concepts, and work on projects together.',
    category: 'student_organizations',
    subcategory: 'academic',
    visibility: 'public',
    joinApproval: 'automatic',
    contentModeration: 'moderate',
    allowedContentTypes: ['text', 'image', 'video', 'link', 'event'],
    maxMembers: 500,
    tags: ['computer-science', 'study-group', 'collaboration', 'academic'],
    rules: [
        'Be respectful and constructive in all interactions',
        'Stay on topic - focus on computer science and academic discussions',
        'No spam or self-promotion without permission',
        'Help others and share knowledge freely',
        'Follow university guidelines and academic integrity policies'
    ],
    integrations: {
        calendar: true,
        github: false,
        discord: true,
        slack: false
    },
    notifications: {
        newPosts: true,
        newMembers: true,
        mentions: true,
        events: true,
        moderationAlerts: true
    },
    customization: {
        banner: '/space-banner.jpg',
        icon: '/space-icon.jpg',
        accentColor: 'var(--hive-brand-secondary)',
        theme: 'dark'
    }
};
const mockModerationQueue = [
    {
        id: 'mod1',
        type: 'post',
        content: 'Check out this amazing AI project I built for my machine learning class!',
        author: {
            name: 'Alex Chen',
            handle: '@alexc',
            avatar: '/placeholder-avatar.jpg'
        },
        reportedBy: {
            name: 'Sarah Johnson',
            handle: '@sarahj'
        },
        reportReason: 'spam',
        reportDetails: 'This looks like self-promotion and doesn\'t follow community guidelines',
        createdAt: '2023-10-20T14:30:00Z',
        reportedAt: '2023-10-20T15:45:00Z',
        status: 'pending',
        severity: 'medium',
        autoModFlags: ['external_link', 'promotional_content']
    },
    {
        id: 'mod2',
        type: 'comment',
        content: 'This is completely wrong and you obviously don\'t understand basic algorithms.',
        author: {
            name: 'Mike Rodriguez',
            handle: '@miker',
            avatar: '/placeholder-avatar-2.jpg'
        },
        reportedBy: {
            name: 'Elena Vasquez',
            handle: '@elenav'
        },
        reportReason: 'harassment',
        reportDetails: 'Hostile and unconstructive criticism that violates community guidelines',
        createdAt: '2023-10-20T12:15:00Z',
        reportedAt: '2023-10-20T12:30:00Z',
        status: 'under_review',
        severity: 'high',
        autoModFlags: ['hostile_language', 'personal_attack']
    }
];
const mockContentManagement = {
    totalPosts: 1247,
    totalComments: 3892,
    totalReports: 23,
    activeReports: 5,
    resolvedToday: 12,
    autoModActions: 8,
    pinnedPosts: [
        {
            id: 'pin1',
            title: 'Welcome to CS Study Group - Read This First!',
            author: 'Sarah Chen',
            createdAt: '2023-09-01T10:00:00Z',
            pinnedAt: '2023-09-01T10:00:00Z',
            pinnedBy: 'Sarah Chen'
        }
    ],
    featuredContent: [
        {
            id: 'feat1',
            title: 'Data Structures Cheat Sheet - Comprehensive Guide',
            author: 'Marcus Rodriguez',
            type: 'post',
            engagement: 145,
            featuredAt: '2023-10-15T14:00:00Z'
        }
    ]
};
const SpaceSettings = ({ settings: initialSettings, currentUserRole = 'admin', onSave, variant = 'full' }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [activeTab, setActiveTab] = useState('general');
    const [hasChanges, setHasChanges] = useState(false);
    const canEdit = ['owner', 'admin'].includes(currentUserRole);
    const canEditAdvanced = currentUserRole === 'owner';
    const updateSetting = (key, value) => {
        const newSettings = { ...settings };
        const keys = key.split('.');
        let current = newSettings;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setSettings(newSettings);
        setHasChanges(true);
    };
    const handleSave = () => {
        onSave?.(settings);
        setHasChanges(false);
    };
    const tabs = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'privacy', label: 'Privacy & Access', icon: Lock },
        { id: 'content', label: 'Content', icon: FileText },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'customization', label: 'Appearance', icon: Edit3 },
        { id: 'integrations', label: 'Integrations', icon: Link },
        { id: 'advanced', label: 'Advanced', icon: Shield }
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-xl", className: "text-[var(--hive-text-primary)] mb-2", children: "Space Settings" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Configure your space's behavior, appearance, and access controls" })] }), hasChanges && canEdit && (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", onClick: () => {
                                    setSettings(initialSettings);
                                    setHasChanges(false);
                                }, className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(X, { className: "h-4 w-4 mr-2" }), "Cancel"] }), _jsxs(Button, { onClick: handleSave, className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: [_jsx(Save, { className: "h-4 w-4 mr-2" }), "Save Changes"] })] }))] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsx("div", { className: "lg:col-span-1", children: _jsx(Card, { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsx("div", { className: "space-y-1", children: tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    const isAdvanced = tab.id === 'advanced';
                                    return (_jsxs("button", { onClick: () => setActiveTab(tab.id), disabled: isAdvanced && !canEditAdvanced, className: `
                      w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors
                      ${isActive
                                            ? 'bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30'
                                            : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]'}
                      ${isAdvanced && !canEditAdvanced ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `, children: [_jsx(Icon, { className: "h-4 w-4" }), _jsx("span", { className: "text-sm", children: tab.label }), isAdvanced && !canEditAdvanced && (_jsx(Lock, { className: "h-3 w-3 ml-auto" }))] }, tab.id));
                                }) }) }) }), _jsx("div", { className: "lg:col-span-3", children: _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [activeTab === 'general' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "General Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Space Name" }), _jsx(Input, { value: settings.name, onChange: (e) => updateSetting('name', e.target.value), disabled: !canEdit, className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Handle" }), _jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-[var(--hive-text-tertiary)] mr-2", children: "/spaces/" }), _jsx(Input, { value: settings.handle, onChange: (e) => updateSetting('handle', e.target.value), disabled: !canEditAdvanced, className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]" })] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Description" }), _jsx("textarea", { value: settings.description, onChange: (e) => updateSetting('description', e.target.value), disabled: !canEdit, rows: 4, className: "w-full p-3 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] placeholder-[var(--hive-text-tertiary)] resize-none" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Category" }), _jsxs("select", { value: settings.category, onChange: (e) => updateSetting('category', e.target.value), disabled: !canEdit, className: "w-full p-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "student_organizations", children: "Student Organizations" }), _jsx("option", { value: "university_organizations", children: "University Organizations" }), _jsx("option", { value: "greek_life", children: "Greek Life" }), _jsx("option", { value: "campus_living", children: "Campus Living" })] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] mb-2", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2 mb-2", children: settings.tags.map((tag, index) => (_jsxs(Badge, { variant: "secondary", className: "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)]", children: [tag, canEdit && (_jsx("button", { onClick: () => {
                                                                                const newTags = settings.tags.filter((_, i) => i !== index);
                                                                                updateSetting('tags', newTags);
                                                                            }, className: "ml-2 hover:text-red-400", children: "\u00D7" }))] }, index))) }), canEdit && (_jsx(Input, { placeholder: "Add tag and press Enter", onKeyDown: (e) => {
                                                                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                                        const newTag = e.currentTarget.value.trim();
                                                                        if (!settings.tags.includes(newTag)) {
                                                                            updateSetting('tags', [...settings.tags, newTag]);
                                                                        }
                                                                        e.currentTarget.value = '';
                                                                    }
                                                                }, className: "bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]" }))] })] })] }) })), activeTab === 'privacy' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Privacy & Access Controls" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Space Visibility" }), _jsx("div", { className: "space-y-3", children: [
                                                                    {
                                                                        value: 'public',
                                                                        label: 'Public',
                                                                        description: 'Anyone can find and view this space',
                                                                        icon: Globe
                                                                    },
                                                                    {
                                                                        value: 'private',
                                                                        label: 'Private',
                                                                        description: 'Only members can see this space',
                                                                        icon: Lock
                                                                    },
                                                                    {
                                                                        value: 'invite_only',
                                                                        label: 'Invite Only',
                                                                        description: 'Only invited users can find and join',
                                                                        icon: UserPlus
                                                                    }
                                                                ].map((option) => {
                                                                    const Icon = option.icon;
                                                                    return (_jsxs("label", { className: `
                                flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-colors
                                ${settings.visibility === option.value
                                                                            ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                                                            : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'}
                                ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                              `, children: [_jsx("input", { type: "radio", name: "visibility", value: option.value, checked: settings.visibility === option.value, onChange: (e) => updateSetting('visibility', e.target.value), disabled: !canEdit, className: "sr-only" }), _jsx(Icon, { className: `h-5 w-5 ${settings.visibility === option.value ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]'}` }), _jsxs("div", { className: "flex-1", children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)]", children: option.label }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: option.description })] })] }, option.value));
                                                                }) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Join Approval" }), _jsx("div", { className: "space-y-3", children: [
                                                                    {
                                                                        value: 'automatic',
                                                                        label: 'Automatic',
                                                                        description: 'Users can join immediately'
                                                                    },
                                                                    {
                                                                        value: 'manual',
                                                                        label: 'Manual Approval',
                                                                        description: 'Admins must approve new members'
                                                                    },
                                                                    {
                                                                        value: 'invite_only',
                                                                        label: 'Invite Only',
                                                                        description: 'Only invited users can join'
                                                                    }
                                                                ].map((option) => (_jsxs("label", { className: `
                              flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                              ${settings.joinApproval === option.value
                                                                        ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                                                        : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'}
                              ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                            `, children: [_jsx("input", { type: "radio", name: "joinApproval", value: option.value, checked: settings.joinApproval === option.value, onChange: (e) => updateSetting('joinApproval', e.target.value), disabled: !canEdit, className: "sr-only" }), _jsx("div", { className: `w-4 h-4 rounded-full border-2 ${settings.joinApproval === option.value ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]' : 'border-[var(--hive-text-tertiary)]'}`, children: settings.joinApproval === option.value && (_jsx("div", { className: "w-full h-full rounded-full bg-[var(--hive-text-primary)] scale-50" })) }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: option.label }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: option.description })] })] }, option.value))) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-2", children: "Member Limit" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Input, { type: "number", value: settings.maxMembers, onChange: (e) => updateSetting('maxMembers', parseInt(e.target.value) || 0), disabled: !canEdit, className: "w-32 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Maximum number of members (0 = unlimited)" })] })] })] })] }) })), activeTab === 'content' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Content Management" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Content Moderation Level" }), _jsx("div", { className: "space-y-3", children: [
                                                                    {
                                                                        value: 'none',
                                                                        label: 'None',
                                                                        description: 'No automatic moderation',
                                                                        color: 'text-gray-400'
                                                                    },
                                                                    {
                                                                        value: 'light',
                                                                        label: 'Light',
                                                                        description: 'Basic spam and abuse detection',
                                                                        color: 'text-green-400'
                                                                    },
                                                                    {
                                                                        value: 'moderate',
                                                                        label: 'Moderate',
                                                                        description: 'Standard content filtering and review',
                                                                        color: 'text-yellow-400'
                                                                    },
                                                                    {
                                                                        value: 'strict',
                                                                        label: 'Strict',
                                                                        description: 'Comprehensive moderation and approval',
                                                                        color: 'text-red-400'
                                                                    }
                                                                ].map((option) => (_jsxs("label", { className: `
                              flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                              ${settings.contentModeration === option.value
                                                                        ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                                                        : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'}
                              ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                            `, children: [_jsx("input", { type: "radio", name: "contentModeration", value: option.value, checked: settings.contentModeration === option.value, onChange: (e) => updateSetting('contentModeration', e.target.value), disabled: !canEdit, className: "sr-only" }), _jsx("div", { className: `w-4 h-4 rounded-full ${option.color} border-2 border-current`, children: settings.contentModeration === option.value && (_jsx("div", { className: "w-full h-full rounded-full bg-current scale-50" })) }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: option.label }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: option.description })] })] }, option.value))) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Allowed Content Types" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                                                                    { value: 'text', label: 'Text Posts', icon: FileText },
                                                                    { value: 'image', label: 'Images', icon: Image },
                                                                    { value: 'video', label: 'Videos', icon: Video },
                                                                    { value: 'link', label: 'Links', icon: Link },
                                                                    { value: 'event', label: 'Events', icon: Calendar },
                                                                    { value: 'poll', label: 'Polls', icon: BarChart3 }
                                                                ].map((contentType) => {
                                                                    const Icon = contentType.icon;
                                                                    const isEnabled = settings.allowedContentTypes.includes(contentType.value);
                                                                    return (_jsxs("label", { className: `
                                flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors
                                ${isEnabled
                                                                            ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                                                                            : 'border-[var(--hive-interactive-active)] hover:border-[var(--hive-border-hover)]'}
                                ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}
                              `, children: [_jsx("input", { type: "checkbox", checked: isEnabled, onChange: (e) => {
                                                                                    let newTypes = [...settings.allowedContentTypes];
                                                                                    if (e.target.checked) {
                                                                                        newTypes.push(contentType.value);
                                                                                    }
                                                                                    else {
                                                                                        newTypes = newTypes.filter(t => t !== contentType.value);
                                                                                    }
                                                                                    updateSetting('allowedContentTypes', newTypes);
                                                                                }, disabled: !canEdit, className: "sr-only" }), _jsx(Icon, { className: `h-5 w-5 ${isEnabled ? 'text-[var(--hive-brand-secondary)]' : 'text-[var(--hive-text-tertiary)]'}` }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: contentType.label })] }, contentType.value));
                                                                }) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Community Rules" }), _jsxs("div", { className: "space-y-3", children: [settings.rules.map((rule, index) => (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("span", { className: "text-[var(--hive-brand-secondary)] font-bold text-sm", children: [index + 1, "."] }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)] flex-1", children: rule }), canEdit && (_jsx(Button, { size: "sm", variant: "ghost", onClick: () => {
                                                                                    const newRules = settings.rules.filter((_, i) => i !== index);
                                                                                    updateSetting('rules', newRules);
                                                                                }, className: "text-red-400 hover:text-red-300", children: _jsx(Trash2, { className: "h-4 w-4" }) }))] }, index))), canEdit && (_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { placeholder: "Add a new rule...", onKeyDown: (e) => {
                                                                                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                                                                        const newRule = e.currentTarget.value.trim();
                                                                                        updateSetting('rules', [...settings.rules, newRule]);
                                                                                        e.currentTarget.value = '';
                                                                                    }
                                                                                }, className: "flex-1 bg-[var(--hive-interactive-hover)] border-[var(--hive-interactive-active)]" }), _jsx(Button, { size: "sm", className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: _jsx(Plus, { className: "h-4 w-4" }) })] }))] })] })] })] }) })), activeTab === 'notifications' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Notification Settings" }), _jsx("div", { className: "space-y-4", children: Object.entries(settings.notifications).map(([key, value]) => {
                                                    const labels = {
                                                        newPosts: 'New Posts',
                                                        newMembers: 'New Members',
                                                        mentions: 'Mentions',
                                                        events: 'Events',
                                                        moderationAlerts: 'Moderation Alerts'
                                                    };
                                                    return (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: labels[key] }), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: value, onChange: (e) => updateSetting(`notifications.${key}`, e.target.checked), disabled: !canEdit, className: "sr-only peer" }), _jsx("div", { className: "w-11 h-6 bg-[var(--hive-interactive-active)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[var(--hive-text-primary)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--hive-brand-secondary)]" })] })] }, key));
                                                }) })] }) })), activeTab === 'customization' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Appearance & Branding" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Space Banner" }), _jsx("div", { className: "border-2 border-dashed border-[var(--hive-border-hover)] rounded-lg p-8 text-center", children: settings.customization.banner ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "w-32 h-20 bg-[var(--hive-interactive-active)] rounded mx-auto" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: "Current banner image" }), canEdit && (_jsxs(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Change Banner"] }))] })) : (_jsxs("div", { className: "space-y-3", children: [_jsx(Upload, { className: "h-12 w-12 text-[var(--hive-text-tertiary)] mx-auto" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Upload a banner image (1200x300px recommended)" }), canEdit && (_jsx(Button, { size: "sm", className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: "Upload Banner" }))] })) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Space Icon" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-interactive-active)] rounded-lg flex items-center justify-center", children: settings.customization.icon ? (_jsx("div", { className: "w-full h-full bg-[var(--hive-brand-secondary)] rounded-lg" })) : (_jsx(Image, { className: "h-8 w-8 text-[var(--hive-text-tertiary)]" })) }), canEdit && (_jsxs(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Upload Icon"] }))] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Accent Color" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-lg border-2 border-[var(--hive-border-hover)]", style: { backgroundColor: settings.customization.accentColor } }), canEdit && (_jsx(Input, { type: "color", value: settings.customization.accentColor, onChange: (e) => updateSetting('customization.accentColor', e.target.value), className: "w-20 h-10 bg-transparent border-[var(--hive-interactive-active)]" })), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: settings.customization.accentColor })] })] })] })] }) })), activeTab === 'integrations' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "External Integrations" }), _jsx("div", { className: "space-y-4", children: Object.entries(settings.integrations).map(([key, enabled]) => {
                                                    const integrationData = {
                                                        calendar: {
                                                            label: 'Calendar Integration',
                                                            description: 'Sync events with external calendar services',
                                                            icon: Calendar
                                                        },
                                                        github: {
                                                            label: 'GitHub Integration',
                                                            description: 'Connect repositories and track commits',
                                                            icon: Link
                                                        },
                                                        discord: {
                                                            label: 'Discord Integration',
                                                            description: 'Bridge with Discord server channels',
                                                            icon: MessageSquare
                                                        },
                                                        slack: {
                                                            label: 'Slack Integration',
                                                            description: 'Connect with Slack workspace',
                                                            icon: Hash
                                                        }
                                                    };
                                                    const integration = integrationData[key];
                                                    const Icon = integration.icon;
                                                    return (_jsxs("div", { className: "flex items-center justify-between p-4 border border-[var(--hive-interactive-active)] rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { className: "h-5 w-5 text-[var(--hive-text-tertiary)]" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)]", children: integration.label }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: integration.description })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [enabled && (_jsx(Badge, { variant: "secondary", className: "text-green-400 bg-green-500/10", children: "Connected" })), _jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [_jsx("input", { type: "checkbox", checked: enabled, onChange: (e) => updateSetting(`integrations.${key}`, e.target.checked), disabled: !canEdit, className: "sr-only peer" }), _jsx("div", { className: "w-11 h-6 bg-[var(--hive-interactive-active)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-[var(--hive-text-primary)] after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--hive-brand-secondary)]" })] })] })] }, key));
                                                }) })] }) })), activeTab === 'advanced' && canEditAdvanced && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-400" }), _jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: "Advanced Settings" })] }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)] mb-6", children: "These settings can significantly impact your space's functionality. Please proceed with caution." }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-lg", children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Danger Zone" }), _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { variant: "outline", className: "border-red-500/50 text-red-400 hover:bg-red-500/10", children: [_jsx(Archive, { className: "h-4 w-4 mr-2" }), "Archive Space"] }), _jsxs(Button, { variant: "outline", className: "border-red-500/50 text-red-400 hover:bg-red-500/10", children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete Space"] })] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] mb-3", children: "Data Export" }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] w-full justify-start", children: [_jsx(DownloadIcon, { className: "h-4 w-4 mr-2" }), "Export Member Data"] }), _jsxs(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] w-full justify-start", children: [_jsx(DownloadIcon, { className: "h-4 w-4 mr-2" }), "Export Content Data"] }), _jsxs(Button, { variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] w-full justify-start", children: [_jsx(DownloadIcon, { className: "h-4 w-4 mr-2" }), "Export Analytics Data"] })] })] })] })] }) }))] }) })] })] }));
};
const ModerationQueue = ({ queue, onAction, currentUserRole = 'moderator' }) => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const canModerate = ['owner', 'admin', 'moderator'].includes(currentUserRole);
    const filteredQueue = queue.filter(item => {
        if (filter === 'all')
            return true;
        return item.status === filter;
    });
    const sortedQueue = [...filteredQueue].sort((a, b) => {
        if (sortBy === 'newest') {
            return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
        }
        if (sortBy === 'severity') {
            const severityOrder = { high: 3, medium: 2, low: 1 };
            return severityOrder[b.severity] - severityOrder[a.severity];
        }
        return 0;
    });
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'text-red-400 bg-red-500/10';
            case 'medium': return 'text-yellow-400 bg-yellow-500/10';
            case 'low': return 'text-green-400 bg-green-500/10';
            default: return 'text-gray-400 bg-gray-500/10';
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-xl", className: "text-[var(--hive-text-primary)] mb-2", children: "Moderation Queue" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Review and moderate reported content" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: "destructive", className: "text-red-400", children: [queue.filter(item => item.status === 'pending').length, " pending"] }), _jsxs(Button, { size: "sm", variant: "outline", className: "border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] })] })] }), _jsx(Card, { className: "p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: "px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "all", children: "All Reports" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "under_review", children: "Under Review" }), _jsx("option", { value: "resolved", children: "Resolved" })] }), _jsxs("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm", children: [_jsx("option", { value: "newest", children: "Newest First" }), _jsx("option", { value: "oldest", children: "Oldest First" }), _jsx("option", { value: "severity", children: "By Severity" })] })] }), _jsxs(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: [sortedQueue.length, " item", sortedQueue.length !== 1 ? 's' : ''] })] }) }), _jsx("div", { className: "space-y-4", children: sortedQueue.map((item) => (_jsx(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: _jsxs("div", { className: "flex gap-4", children: [_jsx(Avatar, { src: item.author.avatar, fallback: item.author.name.charAt(0), size: "md" }), _jsxs("div", { className: "flex-1 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)] font-medium", children: item.author.name }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: item.author.handle }), _jsx(Badge, { variant: "outline", className: "text-xs", children: item.type })] }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["Posted ", new Date(item.createdAt).toLocaleString(), " \u2022 Reported ", new Date(item.reportedAt).toLocaleString()] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { className: getSeverityColor(item.severity), children: [item.severity, " severity"] }), _jsx(Badge, { variant: "secondary", className: "capitalize", children: item.status.replace('_', ' ') })] })] }), _jsx("div", { className: "p-4 bg-[var(--hive-interactive-hover)] rounded-lg border-l-4 border-yellow-500", children: _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: item.content }) }), _jsxs("div", { className: "p-3 bg-red-500/5 border border-red-500/20 rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { children: [_jsxs(Text, { variant: "body-sm", className: "text-red-400 font-medium", children: ["Reported by ", item.reportedBy.name, " (", item.reportedBy.handle, ")"] }), _jsxs(Text, { variant: "body-xs", className: "text-red-300", children: ["Reason: ", item.reportReason.replace('_', ' ')] })] }), _jsx(Flag, { className: "h-4 w-4 text-red-400" })] }), _jsxs(Text, { variant: "body-xs", className: "text-red-300", children: ["\"", item.reportDetails, "\""] })] }), item.autoModFlags.length > 0 && (_jsxs("div", { className: "flex gap-2", children: [_jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: "Auto-detected:" }), item.autoModFlags.map((flag) => (_jsx(Badge, { variant: "outline", className: "text-xs text-orange-400 border-orange-500/30", children: flag.replace('_', ' ') }, flag)))] })), canModerate && item.status !== 'resolved' && (_jsxs("div", { className: "flex items-center gap-3 pt-4 border-t border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs(Button, { size: "sm", onClick: () => onAction?.(item.id, 'approve'), className: "bg-green-600 hover:bg-green-700 text-[var(--hive-text-primary)]", children: [_jsx(Check, { className: "h-4 w-4 mr-2" }), "Approve"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: () => onAction?.(item.id, 'reject'), className: "border-red-500/50 text-red-400 hover:bg-red-500/10", children: [_jsx(X, { className: "h-4 w-4 mr-2" }), "Remove Content"] }), _jsxs(Button, { size: "sm", variant: "outline", onClick: () => onAction?.(item.id, 'ban_user'), className: "border-red-500/50 text-red-400 hover:bg-red-500/10", children: [_jsx(Ban, { className: "h-4 w-4 mr-2" }), "Ban User"] }), currentUserRole !== 'owner' && (_jsxs(Button, { size: "sm", variant: "outline", onClick: () => onAction?.(item.id, 'escalate'), className: "border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10", children: [_jsx(AlertTriangle, { className: "h-4 w-4 mr-2" }), "Escalate"] })), _jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)] ml-auto", children: _jsx(MoreVertical, { className: "h-4 w-4" }) })] }))] })] }) }, item.id))) }), sortedQueue.length === 0 && (_jsxs(Card, { className: "p-12 text-center bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Shield, { className: "h-16 w-16 text-[var(--hive-text-tertiary)] mx-auto mb-4" }), _jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-2", children: "No items in moderation queue" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "All reported content has been reviewed" })] }))] }));
};
const ContentManagement = ({ data, onPin, onUnpin, onFeature, onUnfeature }) => {
    const [activeTab, setActiveTab] = useState('overview');
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "heading-xl", className: "text-[var(--hive-text-primary)] mb-2", children: "Content Management" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-tertiary)]", children: "Manage pinned posts, featured content, and content organization" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsx(Card, { className: "p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-xs", className: "text-blue-400 uppercase tracking-wide", children: "Total Posts" }), _jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: data.totalPosts.toLocaleString() })] }), _jsx(FileText, { className: "h-8 w-8 text-blue-400" })] }) }), _jsx(Card, { className: "p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-xs", className: "text-green-400 uppercase tracking-wide", children: "Comments" }), _jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: data.totalComments.toLocaleString() })] }), _jsx(MessageSquare, { className: "h-8 w-8 text-green-400" })] }) }), _jsx(Card, { className: "p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-xs", className: "text-yellow-400 uppercase tracking-wide", children: "Active Reports" }), _jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: data.activeReports })] }), _jsx(Flag, { className: "h-8 w-8 text-yellow-400" })] }) }), _jsx(Card, { className: "p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-xs", className: "text-purple-400 uppercase tracking-wide", children: "Resolved Today" }), _jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)]", children: data.resolvedToday })] }), _jsx(Check, { className: "h-8 w-8 text-purple-400" })] }) })] }), _jsx("div", { className: "flex border-b border-[var(--hive-interactive-active)]", children: [
                    { id: 'overview', label: 'Overview' },
                    { id: 'pinned', label: 'Pinned Posts' },
                    { id: 'featured', label: 'Featured Content' },
                    { id: 'bulk', label: 'Bulk Actions' }
                ].map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.id), className: `px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                        ? 'border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]'
                        : 'border-transparent text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]'}`, children: tab.label }, tab.id))) }), activeTab === 'overview' && (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-4", children: "Recent Activity" }), _jsx("div", { className: "space-y-3", children: [
                                    { action: 'Post pinned', user: 'Sarah Chen', time: '5 minutes ago' },
                                    { action: 'Content featured', user: 'Marcus Rodriguez', time: '1 hour ago' },
                                    { action: 'Report resolved', user: 'Elena Vasquez', time: '2 hours ago' },
                                    { action: 'User warned', user: 'System', time: '4 hours ago' }
                                ].map((activity, index) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: activity.action }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["by ", activity.user] })] }), _jsx(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: activity.time })] }, index))) })] }), _jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-4", children: "Auto-Moderation Summary" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-primary)]", children: "Actions taken today" }), _jsx(Text, { variant: "body-sm", className: "text-[var(--hive-brand-secondary)] font-bold", children: data.autoModActions })] }), _jsx("div", { className: "space-y-2", children: [
                                            { type: 'Spam filtered', count: 3 },
                                            { type: 'Links flagged', count: 2 },
                                            { type: 'Images reviewed', count: 2 },
                                            { type: 'Text analyzed', count: 1 }
                                        ].map((item) => (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-[var(--hive-text-tertiary)]", children: item.type }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: item.count })] }, item.type))) })] })] })] })), activeTab === 'pinned' && (_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)]", children: "Pinned Posts" }), _jsxs(Button, { size: "sm", className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Pin Post"] })] }), _jsx("div", { className: "space-y-4", children: data.pinnedPosts.map((post) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg border border-[var(--hive-brand-secondary)]/30", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)]", children: post.title }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["by ", post.author, " \u2022 Pinned ", new Date(post.pinnedAt).toLocaleDateString()] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { size: "sm", variant: "ghost", className: "text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Edit3, { className: "h-4 w-4" }) }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onUnpin?.(post.id), className: "text-red-400 hover:text-red-300", children: _jsx(X, { className: "h-4 w-4" }) })] })] }, post.id))) })] })), activeTab === 'featured' && (_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)]", children: "Featured Content" }), _jsxs(Button, { size: "sm", className: "bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", children: [_jsx(Star, { className: "h-4 w-4 mr-2" }), "Feature Content"] })] }), _jsx("div", { className: "space-y-4", children: data.featuredContent.map((content) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg border border-purple-500/30", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Star, { className: "h-4 w-4 text-purple-400" }), _jsxs("div", { children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)]", children: content.title }), _jsxs(Text, { variant: "body-xs", className: "text-[var(--hive-text-tertiary)]", children: ["by ", content.author, " \u2022 ", content.engagement, " interactions \u2022 Featured ", new Date(content.featuredAt).toLocaleDateString()] })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", className: "text-purple-400 border-purple-500/30", children: content.type }), _jsx(Button, { size: "sm", variant: "ghost", onClick: () => onUnfeature?.(content.id), className: "text-red-400 hover:text-red-300", children: _jsx(X, { className: "h-4 w-4" }) })] })] }, content.id))) })] })), activeTab === 'bulk' && (_jsxs(Card, { className: "p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]", children: [_jsx(Text, { variant: "heading-md", className: "text-[var(--hive-text-primary)] mb-6", children: "Bulk Content Actions" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)]", children: "Content Operations" }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "outline", className: "w-full justify-start border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(Archive, { className: "h-4 w-4 mr-2" }), "Archive Old Posts"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(DownloadIcon, { className: "h-4 w-4 mr-2" }), "Export Content"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Rebuild Search Index"] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "body-md", className: "text-[var(--hive-text-primary)]", children: "Cleanup Tools" }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "outline", className: "w-full justify-start border-yellow-500/50 text-yellow-400", children: [_jsx(AlertTriangle, { className: "h-4 w-4 mr-2" }), "Remove Duplicate Posts"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start border-red-500/50 text-red-400", children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Delete Flagged Content"] }), _jsxs(Button, { variant: "outline", className: "w-full justify-start border-red-500/50 text-red-400", children: [_jsx(Ban, { className: "h-4 w-4 mr-2" }), "Bulk User Actions"] })] })] })] })] }))] }));
};
// ============================================================================
// STORYBOOK STORIES
// ============================================================================
export const SpaceSettingsDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(SpaceSettings, { settings: mockSpaceSettings, currentUserRole: "admin", onSave: (settings) => console.log('Save settings:', settings) }) })),
};
export const SpaceSettingsOwner = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(SpaceSettings, { settings: mockSpaceSettings, currentUserRole: "owner", onSave: (settings) => console.log('Save settings:', settings) }) })),
};
export const ModerationQueueDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(ModerationQueue, { queue: mockModerationQueue, currentUserRole: "admin", onAction: (id, action) => console.log('Moderation action:', id, action) }) })),
};
export const ContentManagementDefault = {
    render: () => (_jsx("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen", children: _jsx(ContentManagement, { data: mockContentManagement, onPin: (id) => console.log('Pin:', id), onUnpin: (id) => console.log('Unpin:', id), onFeature: (id) => console.log('Feature:', id), onUnfeature: (id) => console.log('Unfeature:', id) }) })),
};
export const KitchenSinkAdministrative = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Administrative Tools - Kitchen Sink" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Space Settings (Basic)" }), _jsx(SpaceSettings, { settings: mockSpaceSettings, currentUserRole: "moderator", variant: "basic" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Moderation Queue" }), _jsx(ModerationQueue, { queue: mockModerationQueue.slice(0, 1), currentUserRole: "moderator" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Content Management" }), _jsx(ContentManagement, { data: mockContentManagement })] })] })),
};
export const EdgeCasesAdministrative = {
    render: () => (_jsxs("div", { className: "p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8", children: [_jsx(Text, { variant: "display-md", className: "text-[var(--hive-text-primary)] text-center", children: "Administrative Tools - Edge Cases" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Empty Moderation Queue" }), _jsx(ModerationQueue, { queue: [], currentUserRole: "moderator" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "Member View (Limited Access)" }), _jsx(SpaceSettings, { settings: mockSpaceSettings, currentUserRole: "member" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-lg", className: "text-[var(--hive-text-primary)] mb-4", children: "High Priority Reports Only" }), _jsx(ModerationQueue, { queue: mockModerationQueue.filter(item => item.severity === 'high'), currentUserRole: "admin" })] })] })),
};
//# sourceMappingURL=administrative.stories.js.map