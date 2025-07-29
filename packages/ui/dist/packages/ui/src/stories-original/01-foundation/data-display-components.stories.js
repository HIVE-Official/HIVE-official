import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
const meta = {
    title: '01-Foundation/Data Display Components',
    parameters: {
        docs: {
            description: {
                component: 'HIVE Data Display Components - Activity Heatmap, Counter Badge, and Status Indicators with dark luxury aesthetic',
            },
        },
    },
};
export default meta;
// Activity Heatmap Component
const ActivityHeatmap = ({ data, weeks = 52, showTooltip = true }) => {
    const [hoveredData, setHoveredData] = React.useState(null);
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const getIntensityColor = (count) => {
        if (count === 0)
            return 'var(--hive-background-secondary)';
        if (count <= 2)
            return 'var(--hive-brand-secondary)/20';
        if (count <= 5)
            return 'var(--hive-brand-secondary)/40';
        if (count <= 8)
            return 'var(--hive-brand-secondary)/60';
        if (count <= 12)
            return 'var(--hive-brand-secondary)/80';
        return 'var(--hive-brand-secondary)';
    };
    const handleMouseEnter = (dataPoint, event) => {
        setHoveredData(dataPoint);
        setMousePos({ x: event.clientX, y: event.clientY });
    };
    const generateWeeks = () => {
        const today = new Date();
        const startDate = new Date(today.getTime() - (weeks * 7 * 24 * 60 * 60 * 1000));
        const weekData = [];
        for (let week = 0; week < weeks; week++) {
            const weekStart = new Date(startDate.getTime() + (week * 7 * 24 * 60 * 60 * 1000));
            const days = [];
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(weekStart.getTime() + (day * 24 * 60 * 60 * 1000));
                const dateString = currentDate.toISOString().split('T')[0];
                const dayData = data.find(d => d.date === dateString);
                days.push({
                    date: dateString,
                    count: dayData?.count || Math.floor(Math.random() * 15) // Fallback to random data
                });
            }
            weekData.push(days);
        }
        return weekData;
    };
    const weekData = generateWeeks();
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "flex space-x-1 overflow-x-auto pb-4", children: weekData.map((week, weekIndex) => (_jsx("div", { className: "flex flex-col space-y-1", children: week.map((day, dayIndex) => (_jsx(motion.div, { className: "w-3 h-3 rounded-sm border border-[var(--hive-border-default)] cursor-pointer", style: {
                            backgroundColor: getIntensityColor(day.count).replace('/', '/')
                        }, whileHover: {
                            scale: 1.2,
                            borderColor: 'var(--hive-brand-secondary)'
                        }, onMouseEnter: (e) => showTooltip && handleMouseEnter(day, e), onMouseLeave: () => setHoveredData(null), transition: { duration: 0.2 } }, day.date))) }, weekIndex))) }), showTooltip && hoveredData && (_jsxs(motion.div, { className: "fixed z-50 bg-[var(--hive-background-primary)] border border-[var(--hive-brand-secondary)]/20 rounded-lg p-3 pointer-events-none backdrop-blur-md", style: {
                    left: mousePos.x + 10,
                    top: mousePos.y - 50,
                }, initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, children: [_jsxs("div", { className: "text-[var(--hive-text-primary)] font-medium", children: [hoveredData.count, " activities"] }), _jsx("div", { className: "text-[var(--hive-text-tertiary)] text-sm", children: new Date(hoveredData.date).toLocaleDateString() })] })), _jsxs("div", { className: "flex items-center justify-between mt-4 text-sm text-[var(--hive-text-tertiary)]", children: [_jsx("span", { children: "Less" }), _jsx("div", { className: "flex space-x-1", children: [0, 2, 5, 8, 12, 15].map((count) => (_jsx("div", { className: "w-3 h-3 rounded-sm border border-[var(--hive-border-default)]", style: { backgroundColor: getIntensityColor(count).replace('/', '/') } }, count))) }), _jsx("span", { children: "More" })] })] }));
};
// Counter Badge Component
const CounterBadge = ({ count, max = 99, variant = 'default', size = 'md', showZero = false }) => {
    if (!showZero && count === 0)
        return null;
    const displayCount = count > max ? `${max}+` : count.toString();
    const variants = {
        default: 'bg-[#6366F1] border-[#6366F1]',
        success: 'bg-[var(--hive-status-success)] border-[var(--hive-status-success)]',
        warning: 'bg-[var(--hive-status-warning)] border-[var(--hive-status-warning)]',
        error: 'bg-[var(--hive-status-error)] border-[var(--hive-status-error)]',
        gold: 'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
    };
    const sizes = {
        sm: 'min-w-4 h-4 text-xs px-1',
        md: 'min-w-5 h-5 text-xs px-1.5',
        lg: 'min-w-6 h-6 text-sm px-2'
    };
    return (_jsx(motion.div, { className: `
        inline-flex items-center justify-center rounded-full border font-medium text-[var(--hive-text-primary)]
        ${variants[variant]} ${sizes[size]}
      `, initial: { scale: 0 }, animate: { scale: 1 }, transition: { type: "spring", bounce: 0.5 }, children: displayCount }));
};
// Status Indicator Component
const StatusIndicator = ({ status, label, showLabel = true, size = 'md', pulse = false }) => {
    const statusConfig = {
        online: { color: 'var(--hive-status-success)', bgColor: 'var(--hive-status-success)/20', label: 'Online' },
        offline: { color: '#6B7280', bgColor: '#6B7280/20', label: 'Offline' },
        away: { color: 'var(--hive-status-warning)', bgColor: 'var(--hive-status-warning)/20', label: 'Away' },
        busy: { color: 'var(--hive-status-error)', bgColor: 'var(--hive-status-error)/20', label: 'Busy' },
        active: { color: 'var(--hive-brand-secondary)', bgColor: 'var(--hive-brand-secondary)/20', label: 'Active' },
        inactive: { color: '#6B7280', bgColor: '#6B7280/20', label: 'Inactive' }
    };
    const sizes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };
    const config = statusConfig[status];
    const displayLabel = label || config.label;
    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs("div", { className: "relative", children: [_jsx(motion.div, { className: `${sizes[size]} rounded-full border border-[var(--hive-border-default)]`, style: {
                            backgroundColor: config.color,
                            boxShadow: `0 0 0 0.5 ${config.bgColor.replace('/', '/')}`
                        }, animate: pulse ? { scale: [1, 1.2, 1] } : {}, transition: pulse ? { repeat: Infinity, duration: 2 } : {} }), pulse && (_jsx(motion.div, { className: `absolute inset-0 ${sizes[size]} rounded-full opacity-30`, style: { backgroundColor: config.color }, animate: { scale: [1, 1.8], opacity: [0.3, 0] }, transition: { repeat: Infinity, duration: 2 } }))] }), showLabel && (_jsx("span", { className: "text-sm font-medium text-[var(--hive-text-secondary)]", children: displayLabel }))] }));
};
// Stories
export const ActivityHeatmapStory = {
    name: 'Activity Heatmap',
    render: () => {
        // Generate sample data
        const generateSampleData = () => {
            const data = [];
            const today = new Date();
            for (let i = 0; i < 365; i++) {
                const date = new Date(today.getTime() - (i * 24 * 60 * 60 * 1000));
                data.push({
                    date: date.toISOString().split('T')[0],
                    count: Math.floor(Math.random() * 15)
                });
            }
            return data;
        };
        const sampleData = generateSampleData();
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Activity Heatmap" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "GitHub-style activity heatmap showing user engagement patterns over time." }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "365 Days Activity" }), _jsx(ActivityHeatmap, { data: sampleData, weeks: 52 })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "3 Months Activity" }), _jsx(ActivityHeatmap, { data: sampleData, weeks: 12 })] })] }), _jsxs("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)] mb-2", children: "847" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Total Activities" })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-success)] mb-2", children: "23" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Active Days" })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-warning)] mb-2", children: "15" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] text-sm", children: "Max Daily" })] })] })] }));
    },
};
export const CounterBadgeStory = {
    name: 'Counter Badge',
    render: () => {
        const [notifications, setNotifications] = React.useState(12);
        const [messages, setMessages] = React.useState(3);
        const [alerts, setAlerts] = React.useState(0);
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Counter Badge" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "Notification badges with various styles, sizes, and color variants." }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Variants" }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Default" }), _jsx(CounterBadge, { count: 5, variant: "default" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Success" }), _jsx(CounterBadge, { count: 3, variant: "success" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Warning" }), _jsx(CounterBadge, { count: 8, variant: "warning" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Error" }), _jsx(CounterBadge, { count: 12, variant: "error" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Gold" }), _jsx(CounterBadge, { count: 99, variant: "gold" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Sizes" }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Small" }), _jsx(CounterBadge, { count: 5, size: "sm" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Medium" }), _jsx(CounterBadge, { count: 15, size: "md" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Large" }), _jsx(CounterBadge, { count: 25, size: "lg" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "High Numbers" }), _jsxs("div", { className: "flex items-center space-x-6", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "99+" }), _jsx(CounterBadge, { count: 150, max: 99, variant: "error" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "999+" }), _jsx(CounterBadge, { count: 1500, max: 999, variant: "gold" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Zero (hidden)" }), _jsx(CounterBadge, { count: 0, showZero: false }), _jsx("span", { className: "text-[var(--hive-text-tertiary)] text-sm", children: "\u2190 Hidden when zero" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Zero (shown)" }), _jsx(CounterBadge, { count: 0, showZero: true, variant: "default" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Interactive Demo" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)] font-medium", children: "Notifications" }), _jsx(CounterBadge, { count: notifications, variant: "gold" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(motion.button, { onClick: () => setNotifications(prev => Math.max(0, prev - 1)), className: "px-3 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg text-sm", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "-1" }), _jsx(motion.button, { onClick: () => setNotifications(prev => prev + 1), className: "px-3 py-2 bg-[var(--hive-status-success)] text-[var(--hive-text-primary)] rounded-lg text-sm", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "+1" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)] font-medium", children: "Messages" }), _jsx(CounterBadge, { count: messages, variant: "success" })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(motion.button, { onClick: () => setMessages(prev => Math.max(0, prev - 1)), className: "px-3 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg text-sm", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "-1" }), _jsx(motion.button, { onClick: () => setMessages(prev => prev + 1), className: "px-3 py-2 bg-[var(--hive-status-success)] text-[var(--hive-text-primary)] rounded-lg text-sm", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "+1" })] })] }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)] font-medium", children: "Alerts" }), _jsx(CounterBadge, { count: alerts, variant: "error", showZero: true })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(motion.button, { onClick: () => setAlerts(prev => Math.max(0, prev - 1)), className: "px-3 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg text-sm", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "-1" }), _jsx(motion.button, { onClick: () => setAlerts(prev => prev + 1), className: "px-3 py-2 bg-[var(--hive-status-success)] text-[var(--hive-text-primary)] rounded-lg text-sm", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: "+1" })] })] })] })] })] })] }));
    },
};
export const StatusIndicatorStory = {
    name: 'Status Indicator',
    render: () => {
        const [userStatus, setUserStatus] = React.useState('online');
        return (_jsxs("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-8", children: "Status Indicator" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-8", children: "User status indicators with various states, sizes, and animation options." }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Status Types" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [_jsx(StatusIndicator, { status: "online" }), _jsx(StatusIndicator, { status: "offline" }), _jsx(StatusIndicator, { status: "away" }), _jsx(StatusIndicator, { status: "busy" }), _jsx(StatusIndicator, { status: "active" }), _jsx(StatusIndicator, { status: "inactive" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Sizes" }), _jsxs("div", { className: "flex items-center space-x-8", children: [_jsx(StatusIndicator, { status: "online", size: "sm", label: "Small" }), _jsx(StatusIndicator, { status: "online", size: "md", label: "Medium" }), _jsx(StatusIndicator, { status: "online", size: "lg", label: "Large" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Pulse Animation" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [_jsx(StatusIndicator, { status: "online", pulse: true }), _jsx(StatusIndicator, { status: "active", pulse: true }), _jsx(StatusIndicator, { status: "busy", pulse: true })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Icon Only" }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(StatusIndicator, { status: "online", showLabel: false }), _jsx(StatusIndicator, { status: "away", showLabel: false }), _jsx(StatusIndicator, { status: "busy", showLabel: false }), _jsx(StatusIndicator, { status: "offline", showLabel: false })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Interactive Status Change" }), _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6", children: [_jsx("div", { className: "flex items-center justify-between mb-6", children: _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center text-[var(--hive-background-primary)] font-bold", children: "JD" }), _jsxs("div", { children: [_jsx("div", { className: "text-[var(--hive-text-primary)] font-medium", children: "Jacob Doe" }), _jsx(StatusIndicator, { status: userStatus, pulse: userStatus === 'online' })] })] }) }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: ['online', 'away', 'busy', 'offline'].map((status) => (_jsx(motion.button, { onClick: () => setUserStatus(status), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${userStatus === status
                                                    ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                                                    : 'bg-[var(--hive-background-tertiary)] text-[var(--hive-text-secondary)] hover:bg-[var(--hive-border-default)]'}`, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: status.charAt(0).toUpperCase() + status.slice(1) }, status))) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-secondary)] mb-4", children: "Usage Examples" }), _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsx("h4", { className: "text-[var(--hive-text-primary)] font-medium mb-3", children: "Space Members" }), _jsx("div", { className: "space-y-3", children: [
                                                    { name: 'Alex Johnson', status: 'online', avatar: 'AJ' },
                                                    { name: 'Sarah Chen', status: 'away', avatar: 'SC' },
                                                    { name: 'Mike Rodriguez', status: 'busy', avatar: 'MR' },
                                                    { name: 'Emma Thompson', status: 'offline', avatar: 'ET' },
                                                ].map((member, index) => (_jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-border-default)] rounded-full flex items-center justify-center text-[var(--hive-text-secondary)] text-sm font-medium", children: member.avatar }), _jsx("div", { className: "absolute -bottom-0.5 -right-0.5", children: _jsx(StatusIndicator, { status: member.status, showLabel: false, size: "sm" }) })] }), _jsx("span", { className: "text-[var(--hive-text-secondary)]", children: member.name })] }, index))) })] }) })] })] })] }));
    },
};
//# sourceMappingURL=data-display-components.stories.js.map