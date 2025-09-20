'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, EyeOff, Users, Clock, Activity, Search, AlertTriangle, CheckCircle, Info, Database } from 'lucide-react';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { Badge } from '../../atomic/atoms/badge';
import { Switch } from '../../atomic/atoms/switch-enhanced';
import { cn } from '../../lib/utils';
export const PrivacyDashboard = ({ settings, onSettingsChange, className }) => {
    const [activeSection, setActiveSection] = useState('overview');
    const [expandedCard, setExpandedCard] = useState(null);
    const updateSettings = (path, value) => {
        const keys = path.split('.');
        const newSettings = { ...settings };
        let current = newSettings;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        onSettingsChange(newSettings);
    };
    const getPrivacyScore = () => {
        let score = 0;
        let maxScore = 0;
        // Ghost mode settings (30%)
        maxScore += 30;
        if (settings.ghostMode.enabled)
            score += 15;
        if (settings.ghostMode.partialVisibility.showInMemberLists === false)
            score += 5;
        if (settings.ghostMode.partialVisibility.showInSearchResults === false)
            score += 5;
        if (settings.ghostMode.partialVisibility.showActivityStatus === false)
            score += 3;
        if (settings.ghostMode.partialVisibility.showLastSeen === false)
            score += 2;
        // Social boundaries (30%)
        maxScore += 30;
        if (settings.socialBoundaries.studyMode)
            score += 10;
        if (settings.socialBoundaries.officeHours.length > 0)
            score += 10;
        if (settings.socialBoundaries.socialEnergyLevel === 'low')
            score += 5;
        if (settings.socialBoundaries.coordinationPreferences.responseTimeExpectation !== 'immediate')
            score += 5;
        // Data control (40%)
        maxScore += 40;
        if (!settings.dataControl.activitySharing.shareSpaceActivity)
            score += 10;
        if (!settings.dataControl.activitySharing.shareCalendarBusy)
            score += 8;
        if (!settings.dataControl.activitySharing.shareLocationStatus)
            score += 10;
        if (!settings.dataControl.activitySharing.shareToolUsage)
            score += 6;
        if (!settings.dataControl.crossCommunityVisibility)
            score += 3;
        if (!settings.dataControl.searchableProfile)
            score += 3;
        const percentage = Math.round((score / maxScore) * 100);
        let level = 'Open';
        let color = 'text-red-500';
        if (percentage >= 80) {
            level = 'Private';
            color = 'text-green-500';
        }
        else if (percentage >= 60) {
            level = 'Balanced';
            color = 'text-yellow-500';
        }
        else if (percentage >= 40) {
            level = 'Social';
            color = 'text-blue-500';
        }
        return { score: percentage, level, color };
    };
    const privacyScore = getPrivacyScore();
    const sections = [
        { id: 'overview', label: 'Overview', icon: Shield },
        { id: 'ghost-mode', label: 'Ghost Mode', icon: EyeOff },
        { id: 'social-boundaries', label: 'Social Boundaries', icon: Users },
        { id: 'data-control', label: 'Data Control', icon: Database },
        { id: 'emergency', label: 'Emergency Access', icon: AlertTriangle }
    ];
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-hive-text-primary", children: "Privacy Dashboard" }), _jsx("p", { className: "text-hive-text-secondary", children: "Control your data sharing and visibility preferences" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm text-hive-text-secondary", children: "Privacy Score" }), _jsxs("div", { className: cn("text-lg font-bold", privacyScore.color), children: [privacyScore.score, "% ", privacyScore.level] })] }), _jsx("div", { className: "w-12 h-12 rounded-full bg-hive-surface-elevated flex items-center justify-center", children: _jsx(Shield, { className: cn("h-6 w-6", privacyScore.color) }) })] })] }), _jsx("div", { className: "flex items-center gap-2 overflow-x-auto", children: sections.map((section) => (_jsxs("button", { onClick: () => setActiveSection(section.id), className: cn("flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap", activeSection === section.id
                        ? "bg-hive-gold text-hive-text-primary"
                        : "text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-surface-elevated"), children: [_jsx(section.icon, { className: "h-4 w-4" }), section.label] }, section.id))) }), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: [activeSection === 'overview' && (_jsx(OverviewSection, { settings: settings, privacyScore: privacyScore, onQuickToggle: (path, value) => updateSettings(path, value) })), activeSection === 'ghost-mode' && (_jsx(GhostModeSection, { settings: settings.ghostMode, onUpdate: (newSettings) => updateSettings('ghostMode', newSettings) })), activeSection === 'social-boundaries' && (_jsx(SocialBoundariesSection, { settings: settings.socialBoundaries, onUpdate: (newSettings) => updateSettings('socialBoundaries', newSettings) })), activeSection === 'data-control' && (_jsx(DataControlSection, { settings: settings.dataControl, onUpdate: (newSettings) => updateSettings('dataControl', newSettings) })), activeSection === 'emergency' && (_jsx(EmergencyAccessSection, { settings: settings, onUpdate: (path, value) => updateSettings(path, value) }))] }, activeSection) })] }));
};
// Overview Section Component
const OverviewSection = ({ settings, privacyScore, onQuickToggle }) => {
    const quickToggles = [
        {
            id: 'ghost-mode',
            label: 'Ghost Mode',
            description: 'Hide from member lists and search',
            path: 'ghostMode.enabled',
            value: settings.ghostMode.enabled,
            icon: EyeOff
        },
        {
            id: 'study-mode',
            label: 'Study Mode',
            description: 'Limit notifications and interruptions',
            path: 'socialBoundaries.studyMode',
            value: settings.socialBoundaries.studyMode,
            icon: Clock
        },
        {
            id: 'activity-sharing',
            label: 'Activity Sharing',
            description: 'Share space and tool activity',
            path: 'dataControl.activitySharing.shareSpaceActivity',
            value: settings.dataControl.activitySharing.shareSpaceActivity,
            icon: Activity
        },
        {
            id: 'searchable',
            label: 'Searchable Profile',
            description: 'Allow others to find your profile',
            path: 'dataControl.searchableProfile',
            value: settings.dataControl.searchableProfile,
            icon: Search
        }
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(HiveCard, { className: "p-6", children: _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-hive-surface-elevated flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: cn("text-2xl font-bold", privacyScore.color), children: privacyScore.score }), _jsx("div", { className: "text-xs text-hive-text-secondary", children: "Score" })] }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: ["Privacy Level: ", _jsx("span", { className: privacyScore.color, children: privacyScore.level })] }), _jsxs("p", { className: "text-hive-text-secondary mb-3", children: ["Your current privacy settings provide ", privacyScore.level.toLowerCase(), " protection of your personal information and activity."] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { variant: privacyScore.score >= 70 ? 'default' : 'secondary', children: privacyScore.score >= 70 ? 'Protected' : 'Consider Adjusting' }), _jsxs(HiveButton, { variant: "outline", size: "sm", children: [_jsx(Info, { className: "h-4 w-4 mr-2" }), "Privacy Tips"] })] })] })] }) }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "Quick Settings" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: quickToggles.map((toggle) => (_jsxs("div", { className: "flex items-center justify-between p-4 bg-hive-background-primary rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-hive-surface-elevated flex items-center justify-center", children: _jsx(toggle.icon, { className: "h-5 w-5 text-hive-text-secondary" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: toggle.label }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: toggle.description })] })] }), _jsx(Switch, { checked: toggle.value, onChange: (e) => { const checked = e.target.checked; onQuickToggle(toggle.path, checked); } })] }, toggle.id))) })] }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "Privacy Recommendations" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg", children: [_jsx(Info, { className: "h-5 w-5 text-blue-500 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Set Office Hours" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Define when you're available for collaboration to maintain work-life balance." })] })] }), _jsxs("div", { className: "flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-yellow-500 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Review Data Sharing" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Some activity data is being shared. Consider limiting for increased privacy." })] })] })] })] })] }));
};
// Ghost Mode Section Component  
const GhostModeSection = ({ settings, onUpdate }) => {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Ghost Mode" }), _jsx("p", { className: "text-hive-text-secondary", children: "Control your visibility across the HIVE platform" })] }), _jsx(Switch, { checked: settings.enabled, onCheckedChange: (enabled) => onUpdate({ ...settings, enabled }) })] }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "p-4 bg-hive-background-primary rounded-lg", children: [_jsx("h4", { className: "font-medium text-hive-text-primary mb-3", children: "Partial Visibility Options" }), _jsx("div", { className: "space-y-3", children: Object.entries(settings.partialVisibility).map(([key, value]) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-sm text-hive-text-secondary", children: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) }), _jsx(Switch, { checked: value, onChange: (e) => {
                                                const checked = e.target.checked;
                                                onUpdate({
                                                    ...settings,
                                                    partialVisibility: {
                                                        ...settings.partialVisibility,
                                                        [key]: checked
                                                    }
                                                });
                                            }, disabled: !settings.enabled })] }, key))) })] }) })] }) }));
};
// Social Boundaries Section Component
const SocialBoundariesSection = ({ settings, onUpdate }) => {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "Social Boundaries" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between p-4 bg-hive-background-primary rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Study Mode" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Minimize interruptions during focused work time" })] }), _jsx(Switch, { checked: settings.studyMode, onCheckedChange: (studyMode) => onUpdate({ ...settings, studyMode }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("label", { className: "text-sm font-medium text-hive-text-primary", children: "Social Energy Level" }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: ['low', 'medium', 'high'].map((level) => (_jsx("button", { onClick: () => onUpdate({ ...settings, socialEnergyLevel: level }), className: cn("p-3 rounded-lg border text-sm font-medium transition-colors", settings.socialEnergyLevel === level
                                            ? "border-hive-gold bg-hive-gold/10 text-hive-text-primary"
                                            : "border-hive-border-subtle text-hive-text-secondary hover:border-hive-gold/50"), children: level.charAt(0).toUpperCase() + level.slice(1) }, level))) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("label", { className: "text-sm font-medium text-hive-text-primary", children: "Response Time Expectation" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: ['immediate', 'hourly', 'daily', 'weekly'].map((time) => (_jsx("button", { onClick: () => onUpdate({
                                            ...settings,
                                            coordinationPreferences: {
                                                ...settings.coordinationPreferences,
                                                responseTimeExpectation: time
                                            }
                                        }), className: cn("p-3 rounded-lg border text-sm font-medium transition-colors", settings.coordinationPreferences.responseTimeExpectation === time
                                            ? "border-hive-gold bg-hive-gold/10 text-hive-text-primary"
                                            : "border-hive-border-subtle text-hive-text-secondary hover:border-hive-gold/50"), children: time.charAt(0).toUpperCase() + time.slice(1) }, time))) })] }), _jsxs("div", { className: "flex items-center justify-between p-4 bg-hive-background-primary rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Available for Emergencies" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Allow urgent contact even during private time" })] }), _jsx(Switch, { checked: settings.coordinationPreferences.availableForEmergencies, onCheckedChange: (availableForEmergencies) => onUpdate({
                                        ...settings,
                                        coordinationPreferences: {
                                            ...settings.coordinationPreferences,
                                            availableForEmergencies
                                        }
                                    }) })] })] })] }) }));
};
// Data Control Section Component
const DataControlSection = ({ settings, onUpdate }) => {
    const activitySharingOptions = [
        { key: 'shareSpaceActivity', label: 'Space Activity', description: 'Share when you join or leave spaces' },
        { key: 'shareCalendarBusy', label: 'Calendar Status', description: 'Show when you\'re busy or available' },
        { key: 'shareLocationStatus', label: 'Location Status', description: 'Share your campus location' },
        { key: 'shareToolUsage', label: 'Tool Usage', description: 'Share which tools you\'re using' }
    ];
    return (_jsx("div", { className: "space-y-6", children: _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-6", children: "Data Control Settings" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-hive-text-primary", children: "Activity Sharing" }), _jsx("div", { className: "space-y-3", children: activitySharingOptions.map((option) => (_jsxs("div", { className: "flex items-center justify-between p-3 bg-hive-background-primary rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: option.label }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: option.description })] }), _jsx(Switch, { checked: settings.activitySharing[option.key], onChange: (e) => {
                                                    const checked = e.target.checked;
                                                    onUpdate({
                                                        ...settings,
                                                        activitySharing: {
                                                            ...settings.activitySharing,
                                                            [option.key]: checked
                                                        }
                                                    });
                                                } })] }, option.key))) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium text-hive-text-primary", children: "Profile Visibility" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-hive-background-primary rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Cross-Community Visibility" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Allow users from other schools to see your profile" })] }), _jsx(Switch, { checked: settings.crossCommunityVisibility, onCheckedChange: (crossCommunityVisibility) => onUpdate({
                                                        ...settings,
                                                        crossCommunityVisibility
                                                    }) })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-hive-background-primary rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Searchable Profile" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Allow your profile to appear in search results" })] }), _jsx(Switch, { checked: settings.searchableProfile, onCheckedChange: (searchableProfile) => onUpdate({
                                                        ...settings,
                                                        searchableProfile
                                                    }) })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-hive-background-primary rounded-lg", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Analytics Opt-Out" }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Exclude your data from platform analytics" })] }), _jsx(Switch, { checked: settings.analyticsOptOut, onCheckedChange: (analyticsOptOut) => onUpdate({
                                                        ...settings,
                                                        analyticsOptOut
                                                    }) })] })] })] })] })] }) }));
};
// Emergency Access Section Component
const EmergencyAccessSection = ({ settings, onUpdate }) => {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-start gap-3 mb-6", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-yellow-500 mt-1" }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-2", children: "Emergency Access Settings" }), _jsx("p", { className: "text-hive-text-secondary", children: "Configure how others can reach you during emergencies, even when privacy settings are active." })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("p", { className: "font-medium text-hive-text-primary", children: "Emergency Override" }), _jsx(Switch, { checked: settings.socialBoundaries.coordinationPreferences.availableForEmergencies, onChange: (e) => {
                                                const checked = e.target.checked;
                                                onUpdate('socialBoundaries.coordinationPreferences.availableForEmergencies', checked);
                                            } })] }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Allow designated contacts to bypass privacy settings during emergencies. This ensures critical communication can reach you when needed." })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-hive-text-primary", children: "Emergency Contacts" }), _jsx("div", { className: "p-4 bg-hive-background-primary rounded-lg", children: _jsxs("div", { className: "text-center py-8", children: [_jsx(Users, { className: "h-12 w-12 text-hive-text-secondary mx-auto mb-3" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: "No emergency contacts configured" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Add Emergency Contact" })] }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-hive-text-primary", children: "Emergency Scenarios" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-500" }), _jsx("span", { className: "text-sm text-hive-text-primary", children: "Campus security override" })] }), _jsxs("div", { className: "flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-500" }), _jsx("span", { className: "text-sm text-hive-text-primary", children: "Academic emergency contact" })] }), _jsxs("div", { className: "flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-500" }), _jsx("span", { className: "text-sm text-hive-text-primary", children: "Medical emergency notification" })] })] })] })] })] }) }));
};
export default PrivacyDashboard;
//# sourceMappingURL=privacy-dashboard.js.map