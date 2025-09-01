'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { cn } from '../../lib/utils.js';
import { Text } from '../../atomic/atoms/text.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { useAdvancedViewport } from '../Layout/ResponsiveLayout.js';
// Custom hook for network monitoring
function useNetworkMonitoring() {
    const [isOnline, setIsOnline] = useState(true);
    const [networkCondition, setNetworkCondition] = useState('unknown');
    const [connectionType, setConnectionType] = useState('unknown');
    const [downlink, setDownlink] = useState(0);
    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };
        const updateNetworkInfo = () => {
            // @ts-ignore - Network Information API
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            if (connection) {
                setConnectionType(connection.effectiveType || 'unknown');
                setDownlink(connection.downlink || 0);
                // Estimate network condition based on effective type and downlink
                if (connection.effectiveType === '4g' && connection.downlink > 10) {
                    setNetworkCondition('excellent');
                }
                else if (connection.effectiveType === '4g' || connection.downlink > 5) {
                    setNetworkCondition('good');
                }
                else if (connection.effectiveType === '3g' || connection.downlink > 1) {
                    setNetworkCondition('fair');
                }
                else if (connection.effectiveType === '2g' || connection.downlink > 0.1) {
                    setNetworkCondition('poor');
                }
                else {
                    setNetworkCondition('offline');
                }
            }
        };
        // Initial checks
        updateOnlineStatus();
        updateNetworkInfo();
        // Event listeners
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        // @ts-ignore
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            connection.addEventListener('change', updateNetworkInfo);
        }
        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            if (connection) {
                connection.removeEventListener('change', updateNetworkInfo);
            }
        };
    }, []);
    return { isOnline, networkCondition, connectionType, downlink };
}
// Campus network intelligence
function detectCampusNetwork() {
    // This would integrate with actual campus network detection
    // For now, we'll use some heuristics
    if (typeof navigator === 'undefined') {
        return { type: 'unknown' };
    }
    // Check for common campus network SSIDs or domains
    const hostname = window.location.hostname;
    const userAgent = navigator.userAgent;
    // Common campus network patterns
    if (hostname.includes('.edu') || hostname.includes('campus')) {
        return {
            type: 'campus-wifi',
            name: 'Campus Network',
            knownIssues: [
                'High usage during class hours',
                'Limited bandwidth in dorm areas',
                'Firewall restrictions on some apps'
            ],
            alternativeSuggestions: [
                'Try the library - usually faster there',
                'Mobile hotspot as backup',
                'Ethernet in your dorm room if available'
            ]
        };
    }
    return { type: 'unknown' };
}
// Generate campus-specific error messages
function generateCampusMessage(errorType, campusContext, networkCondition) {
    const baseMessages = {
        'connection-lost': {
            title: "Lost connection for a sec!",
            description: "Don't worry - this happens on campus networks sometimes.",
            encouragement: "Your work is auto-saved, so nothing's lost! 😊"
        },
        'timeout': {
            title: "Taking longer than usual...",
            description: "Campus Wi-Fi can get busy, especially during peak hours.",
            encouragement: "Hang tight - we're still trying to connect!"
        },
        'slow-connection': {
            title: "Running a bit slow today",
            description: "Looks like the campus network is under heavy load.",
            encouragement: "Perfect time for a coffee break? ☕"
        },
        'dns-failure': {
            title: "Can't find the server",
            description: "This usually happens with campus network configurations.",
            encouragement: "The IT team probably knows about this already!"
        },
        'server-unreachable': {
            title: "Can't reach HIVE servers",
            description: "This might be a temporary campus network issue.",
            encouragement: "Try switching between Wi-Fi and mobile data!"
        },
        'campus-maintenance': {
            title: "Campus systems getting some love",
            description: "Planned maintenance is happening on campus networks.",
            encouragement: "Great time to grab lunch with friends!"
        },
        'bandwidth-throttled': {
            title: "Network is prioritizing traffic",
            description: "Campus networks sometimes limit bandwidth during peak hours.",
            encouragement: "Try again in a bit - usually clears up quickly!"
        },
        'authentication-required': {
            title: "Network wants to verify you",
            description: "Campus Wi-Fi sometimes needs you to log in again.",
            encouragement: "Quick authentication and you'll be back online!"
        }
    };
    const base = baseMessages[errorType] || baseMessages['connection-lost'];
    // Campus-specific tips
    let tips = campusContext.alternativeSuggestions || [];
    // Add network condition specific tips
    if (networkCondition === 'poor') {
        tips = [
            'Move closer to a Wi-Fi access point',
            'Try a different location on campus',
            ...tips
        ];
    }
    else if (networkCondition === 'offline') {
        tips = [
            'Check if Wi-Fi is enabled on your device',
            'Try connecting to a different network',
            'Use mobile data if available'
        ];
    }
    return {
        ...base,
        tips: tips.slice(0, 4) // Limit to 4 tips
    };
}
export const NetworkError = ({ errorType = 'connection-lost', originalError, networkCondition: propNetworkCondition, campusContext: propCampusContext, onRetry, onOfflineMode, enableOfflineMode = true, showCampusStatus = true, enableNetworkTips = true, showAlternativeLocations = true, title, description, className, onErrorReport }) => {
    const viewport = useAdvancedViewport();
    const networkMonitoring = useNetworkMonitoring();
    const [isRetrying, setIsRetrying] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    // Use provided context or detect automatically
    const networkCondition = propNetworkCondition || networkMonitoring.networkCondition;
    const campusContext = propCampusContext || detectCampusNetwork();
    // Generate contextual messaging
    const messaging = generateCampusMessage(errorType, campusContext, networkCondition);
    const handleRetry = useCallback(async () => {
        if (!onRetry)
            return;
        setIsRetrying(true);
        setRetryCount(prev => prev + 1);
        try {
            await onRetry();
        }
        catch (error) {
            console.error('Retry failed:', error);
        }
        finally {
            setIsRetrying(false);
        }
    }, [onRetry]);
    const handleOfflineMode = useCallback(() => {
        if (onOfflineMode) {
            onOfflineMode();
        }
    }, [onOfflineMode]);
    // Report error for analytics
    useEffect(() => {
        if (onErrorReport) {
            onErrorReport({
                errorType,
                networkCondition,
                campusContext,
                userAgent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                retryCount
            });
        }
    }, [errorType, networkCondition, campusContext, retryCount, onErrorReport]);
    const getNetworkIcon = (condition) => {
        const icons = {
            excellent: '📶',
            good: '📶',
            fair: '📶',
            poor: '📶',
            offline: '🚫',
            unknown: '🤔'
        };
        return icons[condition];
    };
    const getConditionColor = (condition) => {
        const colors = {
            excellent: 'text-green-500',
            good: 'text-hive-emerald',
            fair: 'text-hive-gold',
            poor: 'text-orange-500',
            offline: 'text-red-500',
            unknown: 'text-hive-text-secondary'
        };
        return colors[condition];
    };
    return (_jsxs("div", { className: cn('flex flex-col items-center justify-center min-h-[50vh] p-6 text-center', 'bg-gradient-to-br from-hive-background-primary via-hive-background-secondary/20 to-hive-background-primary', className), children: [_jsx("div", { className: cn('w-24 h-24 rounded-full flex items-center justify-center mb-6', 'bg-hive-background-secondary/30 border-2 border-dashed', getConditionColor(networkCondition).replace('text-', 'border-')), children: _jsx("span", { className: "text-4xl", role: "img", "aria-label": "Network status", children: getNetworkIcon(networkCondition) }) }), _jsxs("div", { className: "max-w-md space-y-4", children: [_jsx(Text, { variant: "heading-lg", color: "primary", className: "font-semibold", children: title || messaging.title }), _jsx(Text, { variant: "body-md", color: "secondary", className: "leading-relaxed", children: description || messaging.description }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "italic text-hive-gold", children: messaging.encouragement })] }), showCampusStatus && (_jsx("div", { className: "mt-6 p-4 bg-hive-background-secondary/20 rounded-lg border border-hive-border-default/20", children: _jsxs("div", { className: "flex items-center justify-center space-x-4 text-sm", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: getConditionColor(networkCondition), children: getNetworkIcon(networkCondition) }), _jsx(Text, { variant: "body-sm", color: "secondary", children: networkCondition === 'offline' ? 'Offline' : `${networkCondition} connection` })] }), campusContext.name && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-hive-text-secondary", children: "\uD83C\uDFE2" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: campusContext.name })] })), networkMonitoring.downlink > 0 && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-hive-text-secondary", children: "\u26A1" }), _jsxs(Text, { variant: "body-sm", color: "secondary", children: [networkMonitoring.downlink.toFixed(1), " Mbps"] })] }))] }) })), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-8", children: [onRetry && (_jsx(Button, { variant: "primary", onClick: handleRetry, disabled: isRetrying, className: cn('min-w-[120px]', viewport.isMobile && 'w-full'), children: isRetrying ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" }), "Retrying..."] })) : (_jsxs(_Fragment, { children: ["Try Again ", retryCount > 0 && `(${retryCount + 1})`] })) })), enableOfflineMode && onOfflineMode && (_jsx(Button, { variant: "secondary", onClick: handleOfflineMode, className: cn('min-w-[120px]', viewport.isMobile && 'w-full'), children: "Continue Offline" })), _jsx(Button, { variant: "ghost", onClick: () => window.location.reload(), className: cn('text-hive-text-secondary', viewport.isMobile && 'w-full'), children: "\uD83D\uDD04 Refresh Page" })] }), enableNetworkTips && messaging.tips.length > 0 && (_jsxs("div", { className: "mt-8 max-w-md", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "font-medium mb-3", children: "\uD83D\uDCA1 Campus network tips:" }), _jsx("ul", { className: "text-left space-y-2", children: messaging.tips.map((tip, index) => (_jsxs("li", { className: "flex items-start text-sm text-hive-text-secondary", children: [_jsx("span", { className: "mr-2 text-hive-gold mt-0.5", children: "\u2022" }), tip] }, index))) })] })), showAlternativeLocations && campusContext.type === 'campus-wifi' && (_jsxs("div", { className: "mt-6 p-4 bg-hive-gold/5 border border-hive-gold/20 rounded-lg", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "font-medium mb-2", children: "\uD83D\uDCCD Better signal locations:" }), _jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: ['Library', 'Student Center', 'Academic Buildings', 'Outdoor Quads'].map((location) => (_jsx("span", { className: "px-3 py-1 bg-hive-gold/10 border border-hive-gold/30 rounded-full text-xs text-hive-text-secondary", children: location }, location))) })] })), process.env.NODE_ENV === 'development' && (_jsxs("details", { className: "mt-8 text-left max-w-md", children: [_jsx("summary", { className: "cursor-pointer text-xs text-hive-text-secondary font-mono", children: "Network Debug Info" }), _jsxs("div", { className: "mt-2 p-3 bg-hive-background-secondary/30 rounded text-xs font-mono space-y-1", children: [_jsxs("div", { children: ["Error Type: ", errorType] }), _jsxs("div", { children: ["Network Condition: ", networkCondition] }), _jsxs("div", { children: ["Connection Type: ", networkMonitoring.connectionType] }), _jsxs("div", { children: ["Downlink: ", networkMonitoring.downlink, " Mbps"] }), _jsxs("div", { children: ["Online: ", networkMonitoring.isOnline ? 'Yes' : 'No'] }), _jsxs("div", { children: ["Campus Type: ", campusContext.type] }), _jsxs("div", { children: ["Retry Count: ", retryCount] }), originalError && (_jsxs("div", { children: ["Original Error: ", originalError.message] }))] })] }))] }));
};
export { useNetworkMonitoring, detectCampusNetwork, generateCampusMessage };
//# sourceMappingURL=NetworkError.js.map