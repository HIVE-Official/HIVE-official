'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, Clock, FileText, Link, TrendingUp, Target, Plus, Settings, BarChart3, CheckSquare, Timer, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.js';
import { Button } from '../hive-button.js';
import { Badge } from '../ui/badge.js';
import { Progress } from '../hive-progress.js';
import { Input } from '../hive-input.js';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs.js';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};
const toolVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        y: -4,
        scale: 1.02,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};
export function PersonalTools({ data, isLoading = false, onToolAction, onAddTool, className = "" }) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [quickActionValues, setQuickActionValues] = useState({});
    // Handle quick action input
    const handleQuickAction = (toolId, value) => {
        setQuickActionValues(prev => ({ ...prev, [toolId]: value }));
    };
    // Execute quick action
    const executeQuickAction = (toolId, action) => {
        const value = quickActionValues[toolId];
        onToolAction?.(toolId, action, { value });
        setQuickActionValues(prev => ({ ...prev, [toolId]: '' }));
    };
    if (isLoading) {
        return _jsx(PersonalToolsSkeleton, {});
    }
    if (!data) {
        return (_jsx("div", { className: "flex items-center justify-center h-96", children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-lg text-gray-600 mb-4", children: "Unable to load personal tools" }), _jsx(Button, { onClick: () => window.location.reload(), children: "Try Again" })] }) }));
    }
    const categories = [
        { id: 'all', name: 'All Tools', count: data.tools.length },
        { id: 'academic', name: 'Academic', count: data.tools.filter(t => t.category === 'academic').length },
        { id: 'productivity', name: 'Productivity', count: data.tools.filter(t => t.category === 'productivity').length },
        { id: 'social', name: 'Social', count: data.tools.filter(t => t.category === 'social').length },
        { id: 'wellness', name: 'Wellness', count: data.tools.filter(t => t.category === 'wellness').length },
    ];
    const filteredTools = activeCategory === 'all'
        ? data.tools
        : data.tools.filter(tool => tool.category === activeCategory);
    return (_jsxs(motion.div, { className: `personal-tools-container space-y-6 ${className}`, variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: toolVariants, children: _jsxs(Card, { className: "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Brain, { className: "h-5 w-5 text-blue-600" }), _jsx("span", { children: "Personal Tools" })] }), _jsxs(Button, { variant: "outline", size: "sm", onClick: onAddTool, className: "bg-[var(--hive-text-primary)]", children: [_jsx(Plus, { className: "h-4 w-4 mr-2" }), "Add Tool"] })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(QuickStatCard, { label: "Current GPA", value: data.quickStats.gpa.toFixed(2), icon: _jsx(TrendingUp, { className: "h-4 w-4" }), color: "green" }), _jsx(QuickStatCard, { label: "Study Hours", value: `${data.quickStats.studyHours}h`, icon: _jsx(Clock, { className: "h-4 w-4" }), color: "blue" }), _jsx(QuickStatCard, { label: "Tasks Done", value: data.quickStats.tasksCompleted, icon: _jsx(CheckSquare, { className: "h-4 w-4" }), color: "purple" }), _jsx(QuickStatCard, { label: "Deadlines", value: data.quickStats.upcomingDeadlines, icon: _jsx(Calendar, { className: "h-4 w-4" }), color: "orange" })] }) })] }) }), _jsx(motion.div, { variants: toolVariants, children: _jsx(Tabs, { value: activeCategory, onValueChange: setActiveCategory, children: _jsx(TabsList, { className: "grid w-full grid-cols-5", children: categories.map((category) => (_jsxs(TabsTrigger, { value: category.id, className: "text-xs", children: [category.name, category.count > 0 && (_jsx(Badge, { variant: "secondary", className: "ml-1 text-xs", children: category.count }))] }, category.id))) }) }) }), _jsx(motion.div, { className: "tools-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", layout: true, children: _jsx(AnimatePresence, { mode: "popLayout", children: filteredTools.map((tool) => (_jsx(motion.div, { layout: true, variants: toolVariants, whileHover: "hover", initial: "hidden", animate: "visible", exit: "hidden", children: _jsx(PersonalToolCard, { tool: tool, quickActionValue: quickActionValues[tool.id] || '', onQuickActionChange: (value) => handleQuickAction(tool.id, value), onQuickActionExecute: (action) => executeQuickAction(tool.id, action), onToolAction: onToolAction }) }, tool.id))) }) }), _jsx(motion.div, { variants: toolVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(BarChart3, { className: "h-5 w-5 text-green-600" }), _jsx("span", { children: "Recent Tool Activity" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: data.recentActivities.slice(0, 5).map((activity, index) => (_jsxs("div", { className: "flex items-center justify-between p-2 rounded-lg bg-gray-50", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-sm", children: activity.toolName }), _jsxs("p", { className: "text-xs text-gray-500", children: [activity.action, " \u2022 ", formatTimeAgo(activity.timestamp)] })] })] }), activity.result && (_jsx(Badge, { variant: "outline", className: "text-xs", children: activity.result }))] }, index))) }) })] }) })] }));
}
function PersonalToolCard({ tool, quickActionValue, onQuickActionChange, onQuickActionExecute, onToolAction }) {
    const categoryColors = {
        academic: 'from-blue-50 to-blue-100 border-blue-200',
        productivity: 'from-green-50 to-green-100 border-green-200',
        social: 'from-purple-50 to-purple-100 border-purple-200',
        wellness: 'from-orange-50 to-orange-100 border-orange-200',
    };
    const iconColors = {
        academic: 'text-blue-600 bg-blue-100',
        productivity: 'text-green-600 bg-green-100',
        social: 'text-purple-600 bg-purple-100',
        wellness: 'text-orange-600 bg-orange-100',
    };
    return (_jsxs(Card, { className: `h-full bg-gradient-to-br ${categoryColors[tool.category]} transition-all duration-200`, children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: `inline-flex items-center justify-center w-10 h-10 rounded-lg ${iconColors[tool.category]}`, children: tool.icon }), _jsxs("div", { className: "flex items-center space-x-1", children: [tool.isActive && (_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" })), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => onToolAction?.(tool.id, 'configure'), children: _jsx(Settings, { className: "h-3 w-3" }) })] })] }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-sm font-semibold", children: tool.name }), _jsx("p", { className: "text-xs text-gray-600 mt-1", children: tool.description })] })] }), _jsxs(CardContent, { className: "pt-0 space-y-3", children: [tool.quickAction && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Input, { placeholder: tool.quickAction.label, value: quickActionValue, onChange: (e) => onQuickActionChange(e.target.value), className: "flex-1 h-8 text-xs" }), tool.quickAction.unit && (_jsx("span", { className: "text-xs text-gray-500", children: tool.quickAction.unit }))] }), _jsxs(Button, { size: "sm", className: "w-full h-7 text-xs", onClick: () => onQuickActionExecute('add'), disabled: !quickActionValue.trim(), children: ["Add ", tool.quickAction.label] })] })), tool.data && (_jsx("div", { className: "space-y-2", children: renderToolData(tool) })), tool.lastUsed && (_jsxs("p", { className: "text-xs text-gray-500", children: ["Last used ", formatTimeAgo(tool.lastUsed)] })), _jsx(Button, { variant: "outline", size: "sm", className: "w-full", onClick: () => onToolAction?.(tool.id, 'open'), children: "Open Tool" })] })] }));
}
// Render tool-specific data
function renderToolData(tool) {
    switch (tool.id) {
        case 'gpa_calculator':
            return (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-bold text-green-600", children: tool.data?.currentGPA?.toFixed(2) || 'N/A' }), _jsx("div", { className: "text-xs text-gray-500", children: "Current GPA" })] }));
        case 'study_timer':
            return (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { children: "Today" }), _jsxs("span", { children: [tool.data?.todayMinutes || 0, "m"] })] }), _jsx(Progress, { value: (tool.data?.todayMinutes || 0) / 4.8, className: "h-1" })] }));
        case 'task_manager':
            return (_jsxs("div", { className: "flex justify-between text-xs", children: [_jsx("span", { children: "Completed" }), _jsxs("span", { children: [tool.data?.completed || 0, "/", tool.data?.total || 0] })] }));
        default:
            return null;
    }
}
function QuickStatCard({ label, value, icon, color }) {
    const colorClasses = {
        blue: 'text-blue-600 bg-blue-100',
        green: 'text-green-600 bg-green-100',
        purple: 'text-purple-600 bg-purple-100',
        orange: 'text-orange-600 bg-orange-100',
    };
    return (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: `inline-flex items-center justify-center w-8 h-8 rounded-lg ${colorClasses[color]} mb-2`, children: icon }), _jsx("div", { className: "text-lg font-bold text-gray-900", children: value }), _jsx("div", { className: "text-xs text-gray-600", children: label })] }));
}
// Loading Skeleton
function PersonalToolsSkeleton() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "h-32 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "h-10 bg-gray-200 rounded-lg animate-pulse" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: Array.from({ length: 6 }).map((_, i) => (_jsx("div", { className: "h-48 bg-gray-200 rounded-lg animate-pulse" }, i))) })] }));
}
// Helper function
function formatTimeAgo(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0)
        return `${days}d ago`;
    if (hours > 0)
        return `${hours}h ago`;
    return 'Just now';
}
// Mock tools data for development
export const mockPersonalToolsData = {
    tools: [
        {
            id: 'gpa_calculator',
            name: 'GPA Calculator',
            description: 'Track and calculate your cumulative GPA',
            icon: _jsx(Calculator, { className: "h-4 w-4" }),
            category: 'academic',
            isActive: true,
            lastUsed: '2024-12-14T10:00:00Z',
            data: { currentGPA: 3.67, totalCredits: 45 },
            quickAction: { label: 'Grade', value: 'A', unit: 'grade' }
        },
        {
            id: 'study_timer',
            name: 'Study Timer',
            description: 'Track study sessions and breaks',
            icon: _jsx(Timer, { className: "h-4 w-4" }),
            category: 'productivity',
            isActive: true,
            lastUsed: '2024-12-14T09:30:00Z',
            data: { todayMinutes: 120, weekMinutes: 480 },
            quickAction: { label: 'Session', value: '25', unit: 'min' }
        },
        {
            id: 'task_manager',
            name: 'Task Manager',
            description: 'Organize assignments and deadlines',
            icon: _jsx(CheckSquare, { className: "h-4 w-4" }),
            category: 'productivity',
            isActive: true,
            lastUsed: '2024-12-14T08:15:00Z',
            data: { completed: 8, total: 12 },
            quickAction: { label: 'Task', value: '', unit: '' }
        },
        {
            id: 'citation_manager',
            name: 'Citation Manager',
            description: 'Organize research sources and citations',
            icon: _jsx(FileText, { className: "h-4 w-4" }),
            category: 'academic',
            isActive: false,
            lastUsed: '2024-12-12T14:20:00Z',
            quickAction: { label: 'Source', value: '', unit: 'URL' }
        },
        {
            id: 'link_vault',
            name: 'Link Vault',
            description: 'Save and organize useful links',
            icon: _jsx(Link, { className: "h-4 w-4" }),
            category: 'productivity',
            isActive: true,
            lastUsed: '2024-12-13T16:45:00Z',
            data: { totalLinks: 23, categories: 5 },
            quickAction: { label: 'Link', value: '', unit: 'URL' }
        },
        {
            id: 'goal_tracker',
            name: 'Goal Tracker',
            description: 'Set and track personal goals',
            icon: _jsx(Target, { className: "h-4 w-4" }),
            category: 'wellness',
            isActive: true,
            lastUsed: '2024-12-14T07:30:00Z',
            data: { activeGoals: 3, completedGoals: 7 },
            quickAction: { label: 'Goal', value: '', unit: '' }
        }
    ],
    quickStats: {
        gpa: 3.67,
        studyHours: 8,
        tasksCompleted: 8,
        upcomingDeadlines: 4
    },
    recentActivities: [
        {
            toolId: 'gpa_calculator',
            toolName: 'GPA Calculator',
            action: 'Added grade',
            timestamp: '2024-12-14T10:00:00Z',
            result: 'A- (3.7)'
        },
        {
            toolId: 'study_timer',
            toolName: 'Study Timer',
            action: 'Completed session',
            timestamp: '2024-12-14T09:30:00Z',
            result: '50 min'
        },
        {
            toolId: 'task_manager',
            toolName: 'Task Manager',
            action: 'Completed task',
            timestamp: '2024-12-14T08:15:00Z',
            result: 'Math homework'
        }
    ]
};
export default PersonalTools;
//# sourceMappingURL=personal-tools.js.map