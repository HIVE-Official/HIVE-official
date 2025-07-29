'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, Brain, BarChart3, Users, Zap, Target, Clock, TrendingUp } from 'lucide-react';
import { BentoGrid, createGridItem, defaultLayouts } from './bento-grid';
import { PersonalTools, mockPersonalToolsData } from './personal-tools';
import { CalendarWidget, mockCalendarData } from './calendar-widget';
import { ActivityTracker, mockActivityTrackerData } from './activity-tracker';
import { Button } from '../hive-button';
import { Badge } from '../ui/badge';
import { Progress } from '../hive-progress';
// Quick Stats Widget
function QuickStatsWidget() {
    const stats = [
        { label: 'GPA', value: '3.67', icon: _jsx(TrendingUp, { className: "h-4 w-4" }), color: 'text-green-600' },
        { label: 'Study Hours', value: '24h', icon: _jsx(Clock, { className: "h-4 w-4" }), color: 'text-blue-600' },
        { label: 'Active Spaces', value: '8', icon: _jsx(Users, { className: "h-4 w-4" }), color: 'text-purple-600' },
        { label: 'Tools Used', value: '15', icon: _jsx(Zap, { className: "h-4 w-4" }), color: 'text-orange-600' }
    ];
    return (_jsx("div", { className: "grid grid-cols-2 gap-4 h-full", children: stats.map((stat, index) => (_jsxs(motion.div, { className: "flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-lg", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: [_jsx("div", { className: `mb-2 ${stat.color}`, children: stat.icon }), _jsx("div", { className: "text-2xl font-bold text-gray-900", children: stat.value }), _jsx("div", { className: "text-xs text-gray-600", children: stat.label })] }, stat.label))) }));
}
// Mini Calendar Widget
function MiniCalendarWidget() {
    const today = new Date();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    return (_jsxs("div", { className: "p-4", children: [_jsx("div", { className: "text-center mb-4", children: _jsx("h3", { className: "font-semibold text-gray-900", children: today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) }) }), _jsxs("div", { className: "grid grid-cols-7 gap-1 text-xs", children: [['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (_jsx("div", { className: "text-center text-gray-500 font-medium p-2", children: day }, day))), Array.from({ length: firstDay }, (_, i) => (_jsx("div", { className: "p-2" }, `empty-${i}`))), Array.from({ length: daysInMonth }, (_, i) => {
                        const date = i + 1;
                        const isToday = date === today.getDate();
                        const hasEvent = [5, 12, 18, 25].includes(date);
                        return (_jsxs("div", { className: `
                p-2 text-center cursor-pointer rounded transition-colors relative
                ${isToday
                                ? 'bg-blue-600 text-[var(--hive-text-primary)]'
                                : hasEvent
                                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                                    : 'hover:bg-gray-100'}
              `, children: [date, hasEvent && !isToday && (_jsx("div", { className: "absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" }))] }, date));
                    })] })] }));
}
// Goals Progress Widget
function GoalsProgressWidget() {
    const goals = [
        { name: 'Weekly Study', current: 18, target: 25, unit: 'hours' },
        { name: 'GPA Target', current: 3.67, target: 3.8, unit: 'GPA' },
        { name: 'Space Exploration', current: 8, target: 10, unit: 'spaces' }
    ];
    return (_jsxs("div", { className: "space-y-4 p-4", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-sm", children: "Current Goals" }), goals.map((goal) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between text-sm", children: [_jsx("span", { className: "text-gray-700", children: goal.name }), _jsxs("span", { className: "text-gray-500", children: [goal.current, "/", goal.target, " ", goal.unit] })] }), _jsx(Progress, { value: (goal.current / goal.target) * 100, className: "h-2" })] }, goal.name)))] }));
}
// Recent Activity Widget
function RecentActivityWidget() {
    const activities = [
        { action: 'Joined Study Group', time: '2h ago', type: 'space' },
        { action: 'Used GPA Calculator', time: '4h ago', type: 'tool' },
        { action: 'Posted in CS Majors', time: '6h ago', type: 'social' },
        { action: 'Completed Math Quiz', time: '1d ago', type: 'academic' }
    ];
    const getActivityColor = (type) => {
        switch (type) {
            case 'space': return 'bg-purple-100 text-purple-700';
            case 'tool': return 'bg-blue-100 text-blue-700';
            case 'social': return 'bg-green-100 text-green-700';
            case 'academic': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };
    return (_jsxs("div", { className: "space-y-3 p-4", children: [_jsx("h3", { className: "font-semibold text-gray-900 text-sm", children: "Recent Activity" }), activities.map((activity, index) => (_jsxs(motion.div, { className: "flex items-center justify-between text-sm", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-blue-500 rounded-full" }), _jsx("span", { className: "text-gray-900", children: activity.action })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: "outline", className: `text-xs ${getActivityColor(activity.type)}`, children: activity.type }), _jsx("span", { className: "text-gray-500 text-xs", children: activity.time })] })] }, index)))] }));
}
export function DashboardDemo({ variant = 'academic', editable = true, showControls = true, className = "" }) {
    const [currentVariant, setCurrentVariant] = useState(variant);
    const [layout, setLayout] = useState(() => {
        const baseLayout = defaultLayouts[currentVariant];
        // Create grid items based on variant
        const items = [];
        if (currentVariant === 'academic') {
            items.push(createGridItem('quick-stats', 'Quick Stats', _jsx(QuickStatsWidget, {}), {
                size: 'medium',
                category: 'overview',
                icon: _jsx(BarChart3, { className: "h-4 w-4" }),
                description: 'Key academic metrics at a glance',
                priority: 10
            }), createGridItem('calendar', 'Calendar', _jsx(MiniCalendarWidget, {}), {
                size: 'small',
                category: 'schedule',
                icon: _jsx(Calendar, { className: "h-4 w-4" }),
                description: 'Monthly calendar view',
                priority: 8
            }), createGridItem('goals', 'Goals Progress', _jsx(GoalsProgressWidget, {}), {
                size: 'small',
                category: 'progress',
                icon: _jsx(Target, { className: "h-4 w-4" }),
                description: 'Track your academic goals',
                priority: 7
            }), createGridItem('activity', 'Recent Activity', _jsx(RecentActivityWidget, {}), {
                size: 'medium',
                category: 'activity',
                icon: _jsx(Activity, { className: "h-4 w-4" }),
                description: 'Your latest platform interactions',
                priority: 6
            }), createGridItem('personal-tools', 'Personal Tools', _jsx(PersonalTools, { data: mockPersonalToolsData }), {
                size: 'xl',
                category: 'tools',
                icon: _jsx(Brain, { className: "h-4 w-4" }),
                description: 'Your personalized productivity toolkit',
                priority: 9,
                minSize: 'large'
            }));
        }
        else if (currentVariant === 'productivity') {
            items.push(createGridItem('activity-tracker', 'Activity Tracker', _jsx(ActivityTracker, { data: mockActivityTrackerData }), {
                size: 'xl',
                category: 'analytics',
                icon: _jsx(Activity, { className: "h-4 w-4" }),
                description: 'Comprehensive productivity analytics',
                priority: 10,
                minSize: 'large'
            }), createGridItem('quick-stats', 'Quick Stats', _jsx(QuickStatsWidget, {}), {
                size: 'medium',
                category: 'overview',
                icon: _jsx(BarChart3, { className: "h-4 w-4" }),
                priority: 8
            }), createGridItem('goals', 'Goals Progress', _jsx(GoalsProgressWidget, {}), {
                size: 'small',
                category: 'progress',
                icon: _jsx(Target, { className: "h-4 w-4" }),
                priority: 7
            }));
        }
        else if (currentVariant === 'social') {
            items.push(createGridItem('calendar-widget', 'Calendar & Events', _jsx(CalendarWidget, { data: mockCalendarData }), {
                size: 'large',
                category: 'events',
                icon: _jsx(Calendar, { className: "h-4 w-4" }),
                description: 'Upcoming events and deadlines',
                priority: 10
            }), createGridItem('activity', 'Recent Activity', _jsx(RecentActivityWidget, {}), {
                size: 'medium',
                category: 'activity',
                icon: _jsx(Activity, { className: "h-4 w-4" }),
                priority: 8
            }), createGridItem('quick-stats', 'Community Stats', _jsx(QuickStatsWidget, {}), {
                size: 'small',
                category: 'social',
                icon: _jsx(Users, { className: "h-4 w-4" }),
                priority: 7
            }));
        }
        return {
            ...baseLayout,
            items
        };
    });
    const handleVariantChange = (newVariant) => {
        setCurrentVariant(newVariant);
        // Recreate layout for new variant
        const baseLayout = defaultLayouts[newVariant];
        // Add items logic here similar to useState initialization
    };
    return (_jsxs(motion.div, { className: `dashboard-demo space-y-6 ${className}`, initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.5 }, children: [showControls && (_jsxs(motion.div, { className: "flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200", initial: { y: -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.2 }, children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "HIVE Dashboard Demo" }), _jsx("p", { className: "text-sm text-gray-600", children: "Interactive dashboard components with customizable layouts" })] }), _jsx("div", { className: "flex items-center space-x-2", children: ['academic', 'productivity', 'social'].map((layoutVariant) => (_jsx(Button, { variant: currentVariant === layoutVariant ? "primary" : "outline", size: "sm", onClick: () => handleVariantChange(layoutVariant), className: "capitalize", children: layoutVariant }, layoutVariant))) })] })), _jsx(motion.div, { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.4 }, children: _jsx(BentoGrid, { layout: layout, onLayoutChange: setLayout, onItemResize: (itemId, newSize) => {
                        console.log(`Item ${itemId} resized to ${newSize}`);
                    }, onItemRemove: (itemId) => {
                        console.log(`Item ${itemId} removed`);
                    }, onItemAdd: () => {
                        console.log('Add new item requested');
                    }, onItemConfigure: (itemId) => {
                        console.log(`Configure item ${itemId}`);
                    }, editable: editable }) }), editable && showControls && (_jsxs(motion.div, { className: "p-4 bg-gray-50 rounded-lg", initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: { delay: 0.6 }, children: [_jsx("h3", { className: "font-medium text-gray-900 mb-2", children: "Interactive Features" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600", children: [_jsxs("div", { children: [_jsx("strong", { children: "Drag & Drop:" }), " Hover over widgets and use the grip handle to reorder"] }), _jsxs("div", { children: [_jsx("strong", { children: "Resize:" }), " Use the expand icon to change widget sizes"] }), _jsxs("div", { children: [_jsx("strong", { children: "Configure:" }), " Access widget settings and removal options"] })] })] }))] }));
}
export default DashboardDemo;
//# sourceMappingURL=dashboard-demo.js.map