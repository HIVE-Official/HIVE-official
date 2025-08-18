'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Text } from '../../atomic/atoms/text';
import { Button } from '../button';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout';
// Intelligent feature prioritization based on user context
function prioritizeFeatures(context, failedFeatures) {
    const allFeatures = ['core', 'social', 'creation', 'analytics', 'advanced', 'experimental'];
    const stillWorking = allFeatures.filter(feature => !failedFeatures.includes(feature) &&
        context.criticalFeatures.includes(feature));
    const degraded = allFeatures.filter(feature => !failedFeatures.includes(feature) &&
        !context.criticalFeatures.includes(feature));
    const unavailable = failedFeatures;
    return { stillWorking, degraded, unavailable };
}
// Generate contextual messaging based on what's affected
function generateFallbackMessage(context, failedFeatures, severity) {
    const { area, user } = context;
    // Area-specific messaging
    const areaMessages = {
        profile: {
            title: "Your profile is running in safe mode",
            description: "Some advanced features are temporarily unavailable, but your core profile works perfectly.",
            encouragement: "Your data is safe and your essential tools are ready to go!"
        },
        spaces: {
            title: "Spaces are running with essential features",
            description: "Community features are working, but some advanced collaboration tools are temporarily down.",
            encouragement: "You can still connect with your campus communities!"
        },
        tools: {
            title: user?.isBuilder ? "Builder mode simplified" : "Tools in basic mode",
            description: user?.isBuilder
                ? "Advanced building features are down, but you can still use and share your existing tools."
                : "Tool creation is limited right now, but all your saved tools work perfectly.",
            encouragement: user?.isBuilder
                ? "Your creations are safe - just limited editing for now!"
                : "Perfect time to explore tools others have shared!"
        },
        feed: {
            title: "Feed showing cached content",
            description: "We're showing your recent activity while we restore live updates.",
            encouragement: "Stay connected with what you've already seen!"
        },
        global: {
            title: "HIVE is running in simplified mode",
            description: "Some features are temporarily limited while we resolve technical issues.",
            encouragement: "Core functionality is working great - you can still get things done!"
        }
    };
    const base = areaMessages[area] || areaMessages.global;
    // Generate alternatives based on what's still working
    const alternatives = [
        "Use offline features while connectivity improves",
        "Access your saved content and recently used tools",
        "Switch to simplified mode for better reliability"
    ];
    if (area === 'tools' && !failedFeatures.includes('core')) {
        alternatives.unshift("Your existing tools still work perfectly");
    }
    if (area === 'spaces' && !failedFeatures.includes('social')) {
        alternatives.unshift("Basic community features are still available");
    }
    return {
        ...base,
        alternatives: alternatives.slice(0, 3)
    };
}
// Feature status indicator component
function FeatureStatus({ category, status }) {
    const statusConfig = {
        working: {
            icon: '✅',
            color: 'text-hive-emerald',
            bgColor: 'bg-hive-emerald/10',
            label: 'Working'
        },
        degraded: {
            icon: '⚠️',
            color: 'text-hive-gold',
            bgColor: 'bg-hive-gold/10',
            label: 'Limited'
        },
        unavailable: {
            icon: '❌',
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            label: 'Down'
        }
    };
    const config = statusConfig[status];
    const categoryLabels = {
        core: 'Essential Features',
        social: 'Community Features',
        creation: 'Tool Building',
        analytics: 'Insights & Data',
        advanced: 'Power Features',
        experimental: 'Beta Features'
    };
    return (_jsxs("div", { className: cn('flex items-center justify-between p-3 rounded-lg border', config.bgColor, `border-current ${config.color.replace('text-', 'border-')}/20`), children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { role: "img", "aria-label": `${status} status`, children: config.icon }), _jsx(Text, { variant: "body-sm", color: "secondary", children: categoryLabels[category] })] }), _jsx("span", { className: cn('px-2 py-1 rounded-full text-xs font-medium', config.color, config.bgColor), children: config.label })] }));
}
export const FallbackUI = ({ reason, failedFeatures = [], severity = 'moderate', strategy = 'progressive-disclosure', context = {
    area: 'global',
    criticalFeatures: ['core'],
    availableOffline: []
}, workingFeatures = [], cachedData, offlineCapabilities = [], onRetry, onSwitchMode, onNavigateToWorking, title, description, encouragingMessage, showFeatureStatus = true, className, children }) => {
    const viewport = useAdvancedViewport();
    const [currentMode, setCurrentMode] = useState('normal');
    const [isRetrying, setIsRetrying] = useState(false);
    // Analyze feature impact
    const featureAnalysis = prioritizeFeatures(context, failedFeatures);
    const messaging = generateFallbackMessage(context, failedFeatures, severity);
    const handleModeSwitch = (mode) => {
        setCurrentMode(mode);
        if (onSwitchMode) {
            onSwitchMode(mode);
        }
    };
    const handleRetry = async () => {
        if (!onRetry)
            return;
        setIsRetrying(true);
        try {
            await onRetry();
        }
        catch (error) {
            console.error('Retry failed:', error);
        }
        finally {
            setIsRetrying(false);
        }
    };
    const severityStyles = {
        minor: {
            border: 'border-hive-gold/30',
            bg: 'bg-hive-gold/5',
            icon: '🟡',
            iconBg: 'bg-hive-gold/20'
        },
        moderate: {
            border: 'border-orange-500/30',
            bg: 'bg-orange-500/5',
            icon: '🟠',
            iconBg: 'bg-orange-500/20'
        },
        severe: {
            border: 'border-red-500/30',
            bg: 'bg-red-500/5',
            icon: '🔴',
            iconBg: 'bg-red-500/20'
        },
        critical: {
            border: 'border-red-600/40',
            bg: 'bg-red-600/10',
            icon: '⚠️',
            iconBg: 'bg-red-600/30'
        }
    };
    const style = severityStyles[severity];
    return (_jsxs("div", { className: cn('w-full max-w-4xl mx-auto p-6', 'border rounded-xl backdrop-blur-sm', style.border, style.bg, className), children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("div", { className: cn('w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4', style.iconBg), children: _jsx("span", { className: "text-2xl", role: "img", "aria-label": "Status icon", children: style.icon }) }), _jsx(Text, { variant: "heading-lg", color: "primary", className: "font-semibold mb-2", children: title || messaging.title }), _jsx(Text, { variant: "body-md", color: "secondary", className: "max-w-2xl mx-auto leading-relaxed", children: description || messaging.description }), (encouragingMessage || messaging.encouragement) && (_jsx(Text, { variant: "body-sm", color: "secondary", className: "mt-3 italic text-hive-gold", children: encouragingMessage || messaging.encouragement }))] }), showFeatureStatus && (_jsxs("div", { className: "mb-6", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "font-medium mb-3", children: "System Status:" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [featureAnalysis.stillWorking.map(feature => (_jsx(FeatureStatus, { category: feature, status: "working" }, feature))), featureAnalysis.degraded.map(feature => (_jsx(FeatureStatus, { category: feature, status: "degraded" }, feature))), featureAnalysis.unavailable.map(feature => (_jsx(FeatureStatus, { category: feature, status: "unavailable" }, feature)))] })] })), _jsxs("div", { className: "mb-6", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "font-medium mb-3", children: "Choose how to continue:" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [_jsx(Button, { variant: currentMode === 'simplified' ? 'primary' : 'secondary', onClick: () => handleModeSwitch('simplified'), className: "text-left justify-start h-auto p-4", children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "\uD83D\uDCF1 Simplified Mode" }), _jsx("div", { className: "text-xs text-current/70 mt-1", children: "Basic features only" })] }) }), offlineCapabilities.length > 0 && (_jsx(Button, { variant: currentMode === 'offline' ? 'primary' : 'secondary', onClick: () => handleModeSwitch('offline'), className: "text-left justify-start h-auto p-4", children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "\uD83D\uDCF4 Offline Mode" }), _jsx("div", { className: "text-xs text-current/70 mt-1", children: "Work without connection" })] }) })), _jsx(Button, { variant: currentMode === 'essential' ? 'primary' : 'secondary', onClick: () => handleModeSwitch('essential'), className: "text-left justify-start h-auto p-4", children: _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: "\u2699\uFE0F Essential Only" }), _jsx("div", { className: "text-xs text-current/70 mt-1", children: "Core features guaranteed" })] }) })] })] }), messaging.alternatives.length > 0 && (_jsxs("div", { className: "mb-6", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "font-medium mb-3", children: "\uD83D\uDCA1 What you can still do:" }), _jsx("ul", { className: "space-y-2", children: messaging.alternatives.map((alternative, index) => (_jsxs("li", { className: "flex items-start text-sm text-hive-text-secondary", children: [_jsx("span", { className: "mr-2 text-hive-gold mt-0.5", children: "\u2022" }), alternative] }, index))) })] })), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [onRetry && (_jsx(Button, { variant: "primary", onClick: handleRetry, disabled: isRetrying, className: viewport.isMobile ? 'w-full' : '', children: isRetrying ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), "Restoring..."] })) : ('🔄 Try to restore full features') })), onNavigateToWorking && (_jsx(Button, { variant: "secondary", onClick: () => onNavigateToWorking('profile'), className: viewport.isMobile ? 'w-full' : '', children: "\uD83C\uDFE0 Go to your profile" })), _jsx(Button, { variant: "ghost", onClick: () => window.location.href = '/', className: cn('text-hive-text-secondary', viewport.isMobile && 'w-full'), children: "\uD83D\uDCDD Take me to HIVE home" })] }), children && (_jsx("div", { className: "mt-6 pt-6 border-t border-hive-border-default/20", children: children })), cachedData && strategy === 'cached-content' && (_jsxs("div", { className: "mt-6 p-4 bg-hive-background-secondary/20 border border-hive-border-default/20 rounded-lg", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "font-medium mb-2", children: "\uD83D\uDCBE Recent data (offline):" }), _jsxs("div", { className: "text-xs text-hive-text-secondary font-mono", children: ["Last updated: ", new Date().toLocaleString()] })] })), process.env.NODE_ENV === 'development' && (_jsxs("details", { className: "mt-6 text-left", children: [_jsx("summary", { className: "cursor-pointer text-xs text-hive-text-secondary font-mono", children: "Fallback Debug Info" }), _jsxs("div", { className: "mt-2 p-3 bg-hive-background-secondary/30 rounded text-xs font-mono space-y-1", children: [_jsxs("div", { children: ["Reason: ", reason || 'Not specified'] }), _jsxs("div", { children: ["Strategy: ", strategy] }), _jsxs("div", { children: ["Severity: ", severity] }), _jsxs("div", { children: ["Context Area: ", context.area] }), _jsxs("div", { children: ["Failed Features: ", failedFeatures.join(', ') || 'None'] }), _jsxs("div", { children: ["Current Mode: ", currentMode] }), _jsxs("div", { children: ["Working Features: ", featureAnalysis.stillWorking.join(', ')] }), _jsxs("div", { children: ["Offline Capabilities: ", offlineCapabilities.join(', ') || 'None'] })] })] }))] }));
};
// Export utilities
export { prioritizeFeatures, generateFallbackMessage, FeatureStatus };
//# sourceMappingURL=FallbackUI.js.map