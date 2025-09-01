'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from '../framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
import { Settings, BarChart3, Shield, Wrench, Calendar, Bell } from 'lucide-react';
// Import the expand-focus system
import { ExpandFocus, useExpandFocus } from '../animations/expand-focus.js';
// Import profile widgets
import { ProfileSettingsWidget } from './widgets/profile-settings-widget.js';
import { ProfileAnalyticsWidget } from './widgets/profile-analytics-widget.js';
import { PrivacyControlWidget } from './widgets/privacy-control-widget.js';
// Import existing profile components
import { ProfileDashboard } from '../profile/profile-dashboard.js';
export const EnhancedProfileDashboard = ({ enableExpandFocus = true, ...profileDashboardProps }) => {
    // Expand-focus states for different widgets
    const settingsModal = useExpandFocus();
    const analyticsModal = useExpandFocus();
    const privacyModal = useExpandFocus();
    const toolsModal = useExpandFocus();
    // Profile action buttons that will expand-focus
    const profileActions = [
        {
            id: 'settings',
            name: 'Settings',
            description: 'Account & preferences',
            icon: Settings,
            color: 'blue',
            modal: settingsModal,
            widget: ProfileSettingsWidget
        },
        {
            id: 'analytics',
            name: 'Analytics',
            description: 'Usage insights',
            icon: BarChart3,
            color: 'purple',
            modal: analyticsModal,
            widget: ProfileAnalyticsWidget
        },
        {
            id: 'privacy',
            name: 'Privacy',
            description: 'Control visibility',
            icon: Shield,
            color: 'green',
            modal: privacyModal,
            widget: PrivacyControlWidget
        },
        {
            id: 'tools',
            name: 'Builder Tools',
            description: 'v1 release',
            icon: Wrench,
            color: 'yellow',
            modal: toolsModal,
            widget: null, // Will show coming soon
            locked: true
        }
    ];
    const getColorClasses = (color) => {
        switch (color) {
            case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20';
            case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20';
            case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20';
            case 'yellow': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20';
            default: return 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20 hover:bg-hive-brand-secondary/20';
        }
    };
    // Override the profile dashboard's navigation callbacks to use expand-focus
    const enhancedProps = {
        ...profileDashboardProps,
        onEditProfile: enableExpandFocus ? settingsModal.expand : profileDashboardProps.onEditProfile
    };
    return (_jsxs("div", { className: "relative", children: [_jsx(ProfileDashboard, { ...enhancedProps }), enableExpandFocus && (_jsx(motion.div, { className: "fixed bottom-6 right-6 z-50", initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { delay: 1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }, children: _jsx("div", { className: "bg-hive-background-elevated rounded-2xl border border-hive-border-subtle shadow-2xl p-4", children: _jsx("div", { className: "grid grid-cols-2 gap-3", children: profileActions.map((action) => {
                            const IconComponent = action.icon;
                            const WidgetComponent = action.widget;
                            return (_jsx("div", { children: _jsx(ExpandFocus, { isExpanded: action.modal.isExpanded, onExpand: action.modal.expand, onCollapse: action.modal.collapse, expandFrom: "bottom", animationDuration: 0.4, focusContent: WidgetComponent ? (_jsx(WidgetComponent, { onPrivacyClick: action.id === 'settings' ? privacyModal.expand : undefined })) : (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-hive-brand-secondary/10 rounded-xl mb-4", children: _jsx(IconComponent, { size: 28, className: "text-hive-brand-secondary" }) }), _jsx("h2", { className: "text-heading-lg font-semibold text-hive-text-primary mb-2", children: action.name }), _jsxs("p", { className: "text-body-md text-hive-text-secondary mb-6", children: [action.description, " coming in v1 release"] }), _jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-hive-brand-secondary/10 rounded-lg border border-hive-brand-secondary/20", children: [_jsx(Calendar, { size: 16, className: "text-hive-brand-secondary" }), _jsx("span", { className: "text-sm font-medium text-hive-brand-secondary", children: "v1 Launch" })] })] })), children: _jsxs(motion.button, { className: cn('w-16 h-16 rounded-xl border transition-all duration-200 flex items-center justify-center relative group', getColorClasses(action.color), action.locked && 'opacity-75'), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(IconComponent, { size: 20 }), action.locked && (_jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-hive-brand-secondary rounded-full border-2 border-hive-background-elevated" })), _jsx("div", { className: "absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none", children: _jsx("div", { className: "bg-hive-background-secondary text-hive-text-primary text-xs px-2 py-1 rounded whitespace-nowrap", children: action.name }) })] }) }) }, action.id));
                        }) }) }) })), enableExpandFocus && (_jsxs(motion.button, { className: "fixed top-6 right-6 z-40 w-12 h-12 bg-hive-background-elevated rounded-xl border border-hive-border-subtle shadow-lg flex items-center justify-center text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-all duration-200", initial: { opacity: 0, scale: 0.8, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { delay: 1.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [_jsx(Bell, { size: 18 }), _jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" })] }))] }));
};
export default EnhancedProfileDashboard;
//# sourceMappingURL=enhanced-profile-dashboard.js.map